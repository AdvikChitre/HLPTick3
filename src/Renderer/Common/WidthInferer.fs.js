import { concat, fold2, map2, max as max_1, sumBy, exists, mapIndexed, mapIndexed2, length, fold, ofArray, tryFindIndex, initialize, singleton, tryPick, collect, map as map_3, filter, item, empty, cons, head, tail, isEmpty, tryFind, ofSeq } from "../fable_modules/fable-library.4.1.4/List.js";
import { toList, ofList, append, map as map_2 } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { fold as fold_1, add, FSharpMap__get_Item, empty as empty_1, FSharpMap__Add, ofList as ofList_1, ofSeq as ofSeq_1, tryFind as tryFind_1, FSharpMap__TryFind, toSeq } from "../fable_modules/fable-library.4.1.4/Map.js";
import { toText, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { map as map_4, defaultArg, value as value_1 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { ComponentType, WidthInferError } from "./CommonTypes.fs.js";
import { Result_Map, Result_Bind, FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { List_groupBy } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { safeHash, comparePrimitives, compare, curry2, stringHash, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { tryFindError } from "./Helpers.fs.js";
import { instrumentInterval, getTimeMs } from "./TimeHelpers.fs.js";

export function mapKeys(map) {
    return ofSeq(map_2((tuple) => tuple[0], toSeq(map)));
}

export function mapValues(map) {
    return ofSeq(map_2((tuple) => tuple[1], toSeq(map)));
}

export function mapItems(map) {
    return ofSeq(toSeq(map));
}

function extractComponentPortNumber(port) {
    const matchValue = port.PortNumber;
    if (matchValue != null) {
        const pNumber = matchValue | 0;
        return pNumber | 0;
    }
    else {
        return toFail(printf("what? extractComponentPortNumber should always be called with component ports: %A"))(port) | 0;
    }
}

function assertInputsSize(inputs, expected, comp) {
}

function getOutputPortId(comp, idx) {
    const matchValue = tryFind((p) => (extractComponentPortNumber(p) === idx), comp.OutputPorts);
    if (matchValue != null) {
        const port = matchValue;
        return port.Id;
    }
    else {
        return toFail(printf("what? getOutputPortId called with inexistent port idx (%d): %A "))(idx)(comp);
    }
}

function getWidthsForPorts(inputs, portNumbers) {
    if (!isEmpty(portNumbers)) {
        const portNumbers$0027 = tail(portNumbers);
        const portNumber = head(portNumbers);
        const matchValue = FSharpMap__TryFind(inputs, portNumber);
        if (matchValue != null) {
            if (value_1(matchValue) == null) {
                return cons(void 0, getWidthsForPorts(inputs, portNumbers$0027));
            }
            else {
                const width = value_1(matchValue)[0];
                return cons(width, getWidthsForPorts(inputs, portNumbers$0027));
            }
        }
        else {
            return toFail(printf("what? getWidthForPorts received a not extistent port: %A %A"))(portNumber)(inputs);
        }
    }
    else {
        return empty();
    }
}

function getConnectionIdForPort(inputs, portNumber) {
    const matchValue = FSharpMap__TryFind(inputs, portNumber);
    if (matchValue != null) {
        if (value_1(matchValue) != null) {
            const connId = value_1(matchValue)[1];
            return connId;
        }
        else {
            return toFail(printf("what? getConnectionIdForPort called with an unconnected port: %A %A"))(portNumber)(inputs);
        }
    }
    else {
        return toFail(printf("what? getConnectionIdForPort received a not extistent port: %A %A"))(portNumber)(inputs);
    }
}

function makeWidthInferErrorEqual(expected, actual, connectionsAffected) {
    return new FSharpResult$2(1, [new WidthInferError(toText(printf("Wrong wire width. Target port expects a %d-bit signal, but source port produces a %d-bit signal."))(expected)(actual), connectionsAffected)]);
}

function makeWidthInferErrorAtLeast(atLeast, actual, connectionsAffected) {
    return new FSharpResult$2(1, [new WidthInferError(toText(printf("Wrong wire width. Target port expects a signal with at least %d bits, but source port produces a %d-bit signal."))(atLeast)(actual), connectionsAffected)]);
}

function makeWidthInferErrorMax(max, actual, connectionsAffected) {
    return new FSharpResult$2(1, [new WidthInferError(toText(printf("Wrong wire width. Target port expects a signal with maximum %d bits, but source port produces a %d-bit signal."))(max)(actual), connectionsAffected)]);
}

/**
 * Add to the map the extra (virtual) connections formed from each set of similarlky named bus labels.
 * each unconnected bus label input is virtually connected to the (single) connection
 * that drives the set
 */
export function addVirtualBusLabelConnections(compIdToComp, inputPortsToConnectionIds) {
    let source_2;
    const comps = mapValues(compIdToComp);
    const inputPort0Id = (comp) => item(0, comp.InputPorts).Id;
    const labelGroups = List_groupBy((comp_2) => comp_2.Label, filter((comp_1) => equals(comp_1.Type, new ComponentType(3, [])), comps), {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    });
    const createVirtualMappings = (compLst, connId) => map_3((comp_3) => [inputPort0Id(comp_3), connId], compLst);
    const extraLabelConns = collect((tupledArg) => {
        let option;
        const name = tupledArg[0];
        const labComps = tupledArg[1];
        return defaultArg((option = tryPick((comp_4) => tryFind_1(inputPort0Id(comp_4), inputPortsToConnectionIds), labComps), map_4(curry2(createVirtualMappings)(labComps), option)), empty());
    }, labelGroups);
    return ofSeq_1((source_2 = toSeq(inputPortsToConnectionIds), append(ofList(extraLabelConns), source_2)), {
        Compare: compare,
    });
}

function makeOutputPortsOfLabels(components) {
    return ofList_1(map_3((tupledArg) => {
        const label = tupledArg[0];
        const lst = tupledArg[1];
        return [label, map_3((comp) => getOutputPortId(comp, 0), lst)];
    }, List_groupBy((c) => c.Label, filter((_arg) => {
        if (_arg.Type.tag === 3) {
            return true;
        }
        else {
            return false;
        }
    }, components), {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    })), {
        Compare: comparePrimitives,
    });
}

function calculateOutputPortsWidth(comp, outputPortsOfBusLabels, inputConnectionsWidth) {
    let n_2, n_4, n_6, n_11, n_12, n_13, m, n_14, m_1, n_15, n_16, m_2, n_17, n_18, m_3, n_23, n_24, n_25, n_26, n_27, m_6, b, a, n_28, m_7, b_1, a_1, n_29, n_30, m_8, b_2, a_2, n_31, n_32, m_9, b_3, a_3, n_37, n_38, n_39, n_40, n_41, n_42, n_43, n_44, n_45, m_13, f, e, d, c, b_6, a_7, n_46, m_14, f_1, e_1, d_1, c_1, b_7, a_8, n_47, n_48, m_15, f_2, e_2, d_2, c_2, b_8, a_9, n_49, n_50, m_16, f_3, e_3, d_3, c_3, b_9, a_10, n_55, n_56, n_59, n_60, n_63, n_64, n_67, n_68, n_69, n_70, n_71, n_75, n_76, n_77, n_78, n_79, n_80, n_81, n_85, n_86, n_87, n_88, n_89, n_90, n_91, n_95, n_96, n_97, n_100, n_101, n_102, n_105, n_106, n_107, n_110, n_112, n_115, n_116, n_117, n_118, n_119, n_120, m_20, n_123, m_21, n_127, n_131, n_135, n_136, n_137, n_138, n_139, n_142, n_143, n_146, n_147, n_148, n_149, n_150, n_151, n_152, n_156, n_157, n_158, n_159, n_160, n_161, n_162, n_163, n_164, n_165, n_166, n_167, n_168, n_169, n_170, n_171, n_172, n_177, n_178, n_179, n_180, n_181, n_182, n_183, n_187, aw, aw_1, write, datain, addr, addr_1, datain_1, write_1, addr_2, datain_2, addr_3, write_2, datain_3, write_3, write_4;
    const getConnectionIdForPort_1 = (arg_1) => getConnectionIdForPort(inputConnectionsWidth, arg_1);
    const matchValue = comp.Type;
    let matchResult, width, width_1, numberOfBits_4, mem, mem_1;
    switch (matchValue.tag) {
        case 48: {
            matchResult = 1;
            break;
        }
        case 4: {
            matchResult = 4;
            break;
        }
        case 3: {
            matchResult = 5;
            break;
        }
        case 6: {
            matchResult = 6;
            break;
        }
        case 47: {
            matchResult = 7;
            break;
        }
        case 5: {
            matchResult = 8;
            break;
        }
        case 8: {
            matchResult = 9;
            break;
        }
        case 10: {
            matchResult = 10;
            break;
        }
        case 11: {
            matchResult = 11;
            break;
        }
        case 12: {
            matchResult = 12;
            break;
        }
        case 13: {
            matchResult = 13;
            break;
        }
        case 14: {
            matchResult = 14;
            break;
        }
        case 15: {
            matchResult = 15;
            break;
        }
        case 16: {
            matchResult = 16;
            break;
        }
        case 46: {
            matchResult = 17;
            break;
        }
        case 17: {
            matchResult = 18;
            break;
        }
        case 19: {
            matchResult = 19;
            break;
        }
        case 18: {
            matchResult = 20;
            break;
        }
        case 20: {
            matchResult = 21;
            break;
        }
        case 23: {
            matchResult = 23;
            break;
        }
        case 25: {
            matchResult = 24;
            break;
        }
        case 9: {
            matchResult = 25;
            break;
        }
        case 26: {
            matchResult = 26;
            break;
        }
        case 27: {
            matchResult = 27;
            break;
        }
        case 29: {
            matchResult = 28;
            break;
        }
        case 28: {
            matchResult = 29;
            break;
        }
        case 30: {
            matchResult = 30;
            break;
        }
        case 31: {
            matchResult = 31;
            break;
        }
        case 32: {
            matchResult = 32;
            break;
        }
        case 33: {
            matchResult = 33;
            break;
        }
        case 34: {
            matchResult = 34;
            break;
        }
        case 35: {
            matchResult = 35;
            break;
        }
        case 37: {
            matchResult = 36;
            break;
        }
        case 36: {
            matchResult = 37;
            break;
        }
        case 38: {
            matchResult = 38;
            break;
        }
        case 0: {
            matchResult = 2;
            width = matchValue.fields[0];
            break;
        }
        case 7: {
            matchResult = 2;
            width = matchValue.fields[0];
            break;
        }
        case 49: {
            matchResult = 2;
            width = matchValue.fields[0];
            break;
        }
        case 1: {
            matchResult = 3;
            width_1 = matchValue.fields[0];
            break;
        }
        case 2: {
            matchResult = 3;
            width_1 = matchValue.fields[0];
            break;
        }
        case 21: {
            matchResult = 22;
            numberOfBits_4 = matchValue.fields[0];
            break;
        }
        case 22: {
            matchResult = 22;
            numberOfBits_4 = matchValue.fields[0];
            break;
        }
        case 24: {
            matchResult = 22;
            numberOfBits_4 = matchValue.fields[0];
            break;
        }
        case 39: {
            matchResult = 39;
            mem = matchValue.fields[0];
            break;
        }
        case 40: {
            matchResult = 39;
            mem = matchValue.fields[0];
            break;
        }
        case 41: {
            matchResult = 40;
            mem_1 = matchValue.fields[0];
            break;
        }
        case 42: {
            matchResult = 40;
            mem_1 = matchValue.fields[0];
            break;
        }
        default:
            matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return toFail(printf("What? Legacy RAM component types should never occur"));
        case 1:
            return toFail(printf("Legacy Input components should never occur"));
        case 2: {
            assertInputsSize(inputConnectionsWidth, 0, comp);
            return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                Compare: compare,
            }), getOutputPortId(comp, 0), width)]);
        }
        case 3: {
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const matchValue_1 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_1, n;
            if (!isEmpty(matchValue_1)) {
                if (head(matchValue_1) != null) {
                    if (isEmpty(tail(matchValue_1))) {
                        matchResult_1 = 1;
                        n = head(matchValue_1);
                    }
                    else {
                        matchResult_1 = 2;
                    }
                }
                else if (isEmpty(tail(matchValue_1))) {
                    matchResult_1 = 0;
                }
                else {
                    matchResult_1 = 2;
                }
            }
            else {
                matchResult_1 = 2;
            }
            switch (matchResult_1) {
                case 0:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                case 1:
                    if (n === width_1) {
                        return new FSharpResult$2(0, [empty_1({
                            Compare: compare,
                        })]);
                    }
                    else {
                        return makeWidthInferErrorEqual(width_1, n, singleton(getConnectionIdForPort_1(0)));
                    }
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 4: {
            assertInputsSize(inputConnectionsWidth, 1, comp);
            return new FSharpResult$2(0, [empty_1({
                Compare: compare,
            })]);
        }
        case 5: {
            const matchValue_2 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_2, n_1;
            if (!isEmpty(matchValue_2)) {
                if (head(matchValue_2) != null) {
                    if (isEmpty(tail(matchValue_2))) {
                        matchResult_2 = 1;
                        n_1 = head(matchValue_2);
                    }
                    else {
                        matchResult_2 = 2;
                    }
                }
                else if (isEmpty(tail(matchValue_2))) {
                    matchResult_2 = 0;
                }
                else {
                    matchResult_2 = 2;
                }
            }
            else {
                matchResult_2 = 2;
            }
            switch (matchResult_2) {
                case 0:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                case 1: {
                    const outs = FSharpMap__get_Item(outputPortsOfBusLabels, comp.Label);
                    return new FSharpResult$2(0, [ofList_1(map_3((out) => [out, n_1], outs), {
                        Compare: compare,
                    })]);
                }
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 6: {
            const width_2 = matchValue.fields[0] | 0;
            const lsBitNum = matchValue.fields[1] | 0;
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const matchValue_3 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_3, n_3;
            if (!isEmpty(matchValue_3)) {
                if (head(matchValue_3) == null) {
                    if (isEmpty(tail(matchValue_3))) {
                        matchResult_3 = 1;
                    }
                    else {
                        matchResult_3 = 2;
                    }
                }
                else if (isEmpty(tail(matchValue_3))) {
                    if ((n_2 = (head(matchValue_3) | 0), n_2 < (width_2 + lsBitNum))) {
                        matchResult_3 = 0;
                        n_3 = head(matchValue_3);
                    }
                    else {
                        matchResult_3 = 1;
                    }
                }
                else {
                    matchResult_3 = 2;
                }
            }
            else {
                matchResult_3 = 2;
            }
            switch (matchResult_3) {
                case 0:
                    return makeWidthInferErrorAtLeast(lsBitNum + n_3, n_3, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_2)]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 7: {
            const width_3 = matchValue.fields[0] | 0;
            const compareVal = matchValue.fields[1];
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const matchValue_4 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_4, n_5;
            if (!isEmpty(matchValue_4)) {
                if (head(matchValue_4) == null) {
                    if (isEmpty(tail(matchValue_4))) {
                        matchResult_4 = 1;
                    }
                    else {
                        matchResult_4 = 2;
                    }
                }
                else if (isEmpty(tail(matchValue_4))) {
                    if ((n_4 = (head(matchValue_4) | 0), n_4 !== width_3)) {
                        matchResult_4 = 0;
                        n_5 = head(matchValue_4);
                    }
                    else {
                        matchResult_4 = 1;
                    }
                }
                else {
                    matchResult_4 = 2;
                }
            }
            else {
                matchResult_4 = 2;
            }
            switch (matchResult_4) {
                case 0:
                    return makeWidthInferErrorEqual(width_3, n_5, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), 1)]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 8: {
            const width_4 = matchValue.fields[0] | 0;
            const dialogTextValue = matchValue.fields[2];
            const compareVal_1 = matchValue.fields[1];
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const matchValue_5 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_5, n_7;
            if (!isEmpty(matchValue_5)) {
                if (head(matchValue_5) == null) {
                    if (isEmpty(tail(matchValue_5))) {
                        matchResult_5 = 1;
                    }
                    else {
                        matchResult_5 = 2;
                    }
                }
                else if (isEmpty(tail(matchValue_5))) {
                    if ((n_6 = (head(matchValue_5) | 0), n_6 !== width_4)) {
                        matchResult_5 = 0;
                        n_7 = head(matchValue_5);
                    }
                    else {
                        matchResult_5 = 1;
                    }
                }
                else {
                    matchResult_5 = 2;
                }
            }
            else {
                matchResult_5 = 2;
            }
            switch (matchResult_5) {
                case 0:
                    return makeWidthInferErrorEqual(width_4, n_7, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), 1)]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 9: {
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const matchValue_6 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_6, n_8;
            if (!isEmpty(matchValue_6)) {
                if (head(matchValue_6) != null) {
                    if (head(matchValue_6) === 1) {
                        if (isEmpty(tail(matchValue_6))) {
                            matchResult_6 = 0;
                        }
                        else {
                            matchResult_6 = 2;
                        }
                    }
                    else if (isEmpty(tail(matchValue_6))) {
                        matchResult_6 = 1;
                        n_8 = head(matchValue_6);
                    }
                    else {
                        matchResult_6 = 2;
                    }
                }
                else if (isEmpty(tail(matchValue_6))) {
                    matchResult_6 = 0;
                }
                else {
                    matchResult_6 = 2;
                }
            }
            else {
                matchResult_6 = 2;
            }
            switch (matchResult_6) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), 1)]);
                case 1:
                    return makeWidthInferErrorEqual(1, n_8, singleton(getConnectionIdForPort_1(0)));
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 10: {
            const n_9 = matchValue.fields[1] | 0;
            assertInputsSize(inputConnectionsWidth, n_9, comp);
            const portWidths = getWidthsForPorts(inputConnectionsWidth, initialize(n_9, (i) => i));
            const _arg_1 = tryFindIndex((_arg) => {
                if (_arg == null) {
                    return false;
                }
                else {
                    const n_10 = _arg | 0;
                    return n_10 !== 1;
                }
            }, portWidths);
            if (_arg_1 == null) {
                return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                    Compare: compare,
                }), getOutputPortId(comp, 0), 1)]);
            }
            else {
                const idx = _arg_1 | 0;
                return makeWidthInferErrorEqual(1, value_1(item(idx, portWidths)), singleton(getConnectionIdForPort_1(idx)));
            }
        }
        case 11: {
            assertInputsSize(inputConnectionsWidth, 3, comp);
            const matchValue_7 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1, 2]));
            let matchResult_7, m_4, n_19, m_5, n_20, n_21, n_22;
            if (!isEmpty(matchValue_7)) {
                if (head(matchValue_7) == null) {
                    if (!isEmpty(tail(matchValue_7))) {
                        if (!isEmpty(tail(tail(matchValue_7)))) {
                            if (head(tail(tail(matchValue_7))) != null) {
                                if (isEmpty(tail(tail(tail(matchValue_7))))) {
                                    if ((n_11 = (head(tail(tail(matchValue_7))) | 0), n_11 !== 1)) {
                                        matchResult_7 = 2;
                                        n_21 = head(tail(tail(matchValue_7)));
                                    }
                                    else if (head(tail(matchValue_7)) != null) {
                                        matchResult_7 = 3;
                                        n_22 = head(tail(matchValue_7));
                                    }
                                    else {
                                        matchResult_7 = 4;
                                    }
                                }
                                else {
                                    matchResult_7 = 5;
                                }
                            }
                            else if (isEmpty(tail(tail(tail(matchValue_7))))) {
                                if (head(tail(matchValue_7)) != null) {
                                    matchResult_7 = 3;
                                    n_22 = head(tail(matchValue_7));
                                }
                                else {
                                    matchResult_7 = 4;
                                }
                            }
                            else {
                                matchResult_7 = 5;
                            }
                        }
                        else {
                            matchResult_7 = 5;
                        }
                    }
                    else {
                        matchResult_7 = 5;
                    }
                }
                else if (!isEmpty(tail(matchValue_7))) {
                    if (head(tail(matchValue_7)) == null) {
                        if (!isEmpty(tail(tail(matchValue_7)))) {
                            if (head(tail(tail(matchValue_7))) != null) {
                                if (isEmpty(tail(tail(tail(matchValue_7))))) {
                                    if ((n_12 = (head(tail(tail(matchValue_7))) | 0), n_12 !== 1)) {
                                        matchResult_7 = 2;
                                        n_21 = head(tail(tail(matchValue_7)));
                                    }
                                    else {
                                        matchResult_7 = 3;
                                        n_22 = head(matchValue_7);
                                    }
                                }
                                else {
                                    matchResult_7 = 5;
                                }
                            }
                            else if (isEmpty(tail(tail(tail(matchValue_7))))) {
                                matchResult_7 = 3;
                                n_22 = head(matchValue_7);
                            }
                            else {
                                matchResult_7 = 5;
                            }
                        }
                        else {
                            matchResult_7 = 5;
                        }
                    }
                    else if (!isEmpty(tail(tail(matchValue_7)))) {
                        if (head(tail(tail(matchValue_7))) != null) {
                            if (head(tail(tail(matchValue_7))) === 1) {
                                if (isEmpty(tail(tail(tail(matchValue_7))))) {
                                    if ((n_13 = (head(matchValue_7) | 0), (m = (head(tail(matchValue_7)) | 0), n_13 === m))) {
                                        matchResult_7 = 0;
                                        m_4 = head(tail(matchValue_7));
                                        n_19 = head(matchValue_7);
                                    }
                                    else if ((n_14 = (head(matchValue_7) | 0), (m_1 = (head(tail(matchValue_7)) | 0), n_14 !== m_1))) {
                                        matchResult_7 = 1;
                                        m_5 = head(tail(matchValue_7));
                                        n_20 = head(matchValue_7);
                                    }
                                    else if ((n_15 = (head(tail(tail(matchValue_7))) | 0), n_15 !== 1)) {
                                        matchResult_7 = 2;
                                        n_21 = head(tail(tail(matchValue_7)));
                                    }
                                    else {
                                        matchResult_7 = 4;
                                    }
                                }
                                else {
                                    matchResult_7 = 5;
                                }
                            }
                            else if (isEmpty(tail(tail(tail(matchValue_7))))) {
                                if ((n_16 = (head(matchValue_7) | 0), (m_2 = (head(tail(matchValue_7)) | 0), n_16 !== m_2))) {
                                    matchResult_7 = 1;
                                    m_5 = head(tail(matchValue_7));
                                    n_20 = head(matchValue_7);
                                }
                                else if ((n_17 = (head(tail(tail(matchValue_7))) | 0), n_17 !== 1)) {
                                    matchResult_7 = 2;
                                    n_21 = head(tail(tail(matchValue_7)));
                                }
                                else {
                                    matchResult_7 = 4;
                                }
                            }
                            else {
                                matchResult_7 = 5;
                            }
                        }
                        else if (isEmpty(tail(tail(tail(matchValue_7))))) {
                            if ((n_18 = (head(matchValue_7) | 0), (m_3 = (head(tail(matchValue_7)) | 0), n_18 !== m_3))) {
                                matchResult_7 = 1;
                                m_5 = head(tail(matchValue_7));
                                n_20 = head(matchValue_7);
                            }
                            else {
                                matchResult_7 = 4;
                            }
                        }
                        else {
                            matchResult_7 = 5;
                        }
                    }
                    else {
                        matchResult_7 = 5;
                    }
                }
                else {
                    matchResult_7 = 5;
                }
            }
            else {
                matchResult_7 = 5;
            }
            switch (matchResult_7) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), n_19)]);
                case 1:
                    return new FSharpResult$2(1, [new WidthInferError(toText(printf("Wrong wire width. The two inputs to a multiplexer are expected to have the same width, but top input has %d bits and bottom input has %d bits."))(n_20)(m_5), ofArray([getConnectionIdForPort_1(0), getConnectionIdForPort_1(1)]))]);
                case 2:
                    return makeWidthInferErrorEqual(1, n_21, singleton(getConnectionIdForPort_1(2)));
                case 3:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), n_22)]);
                case 4:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 12: {
            assertInputsSize(inputConnectionsWidth, 5, comp);
            const matchValue_8 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1, 2, 3, 4]));
            let matchResult_8, a_4, b_4, m_10, n_33, a_5, b_5, m_11, n_34, n_35, a_6, m_12, n_36;
            if (!isEmpty(matchValue_8)) {
                if (head(matchValue_8) == null) {
                    if (!isEmpty(tail(matchValue_8))) {
                        if (!isEmpty(tail(tail(matchValue_8)))) {
                            if (!isEmpty(tail(tail(tail(matchValue_8))))) {
                                if (!isEmpty(tail(tail(tail(tail(matchValue_8)))))) {
                                    if (head(tail(tail(tail(tail(matchValue_8))))) != null) {
                                        if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                            if ((n_23 = (head(tail(tail(tail(tail(matchValue_8))))) | 0), n_23 !== 2)) {
                                                matchResult_8 = 2;
                                                n_35 = head(tail(tail(tail(tail(matchValue_8)))));
                                            }
                                            else if (head(tail(tail(tail(matchValue_8)))) != null) {
                                                if (head(tail(tail(matchValue_8))) != null) {
                                                    if (head(tail(matchValue_8)) != null) {
                                                        matchResult_8 = 3;
                                                        a_6 = head(tail(tail(tail(matchValue_8))));
                                                        m_12 = head(tail(tail(matchValue_8)));
                                                        n_36 = head(tail(matchValue_8));
                                                    }
                                                    else {
                                                        matchResult_8 = 4;
                                                    }
                                                }
                                                else {
                                                    matchResult_8 = 4;
                                                }
                                            }
                                            else {
                                                matchResult_8 = 4;
                                            }
                                        }
                                        else {
                                            matchResult_8 = 5;
                                        }
                                    }
                                    else if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                        if (head(tail(tail(tail(matchValue_8)))) != null) {
                                            if (head(tail(tail(matchValue_8))) != null) {
                                                if (head(tail(matchValue_8)) != null) {
                                                    matchResult_8 = 3;
                                                    a_6 = head(tail(tail(tail(matchValue_8))));
                                                    m_12 = head(tail(tail(matchValue_8)));
                                                    n_36 = head(tail(matchValue_8));
                                                }
                                                else {
                                                    matchResult_8 = 4;
                                                }
                                            }
                                            else {
                                                matchResult_8 = 4;
                                            }
                                        }
                                        else {
                                            matchResult_8 = 4;
                                        }
                                    }
                                    else {
                                        matchResult_8 = 5;
                                    }
                                }
                                else {
                                    matchResult_8 = 5;
                                }
                            }
                            else {
                                matchResult_8 = 5;
                            }
                        }
                        else {
                            matchResult_8 = 5;
                        }
                    }
                    else {
                        matchResult_8 = 5;
                    }
                }
                else if (!isEmpty(tail(matchValue_8))) {
                    if (head(tail(matchValue_8)) == null) {
                        if (!isEmpty(tail(tail(matchValue_8)))) {
                            if (!isEmpty(tail(tail(tail(matchValue_8))))) {
                                if (!isEmpty(tail(tail(tail(tail(matchValue_8)))))) {
                                    if (head(tail(tail(tail(tail(matchValue_8))))) != null) {
                                        if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                            if ((n_24 = (head(tail(tail(tail(tail(matchValue_8))))) | 0), n_24 !== 2)) {
                                                matchResult_8 = 2;
                                                n_35 = head(tail(tail(tail(tail(matchValue_8)))));
                                            }
                                            else if (head(tail(tail(tail(matchValue_8)))) != null) {
                                                if (head(tail(tail(matchValue_8))) != null) {
                                                    matchResult_8 = 3;
                                                    a_6 = head(tail(tail(tail(matchValue_8))));
                                                    m_12 = head(tail(tail(matchValue_8)));
                                                    n_36 = head(matchValue_8);
                                                }
                                                else {
                                                    matchResult_8 = 4;
                                                }
                                            }
                                            else {
                                                matchResult_8 = 4;
                                            }
                                        }
                                        else {
                                            matchResult_8 = 5;
                                        }
                                    }
                                    else if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                        if (head(tail(tail(tail(matchValue_8)))) != null) {
                                            if (head(tail(tail(matchValue_8))) != null) {
                                                matchResult_8 = 3;
                                                a_6 = head(tail(tail(tail(matchValue_8))));
                                                m_12 = head(tail(tail(matchValue_8)));
                                                n_36 = head(matchValue_8);
                                            }
                                            else {
                                                matchResult_8 = 4;
                                            }
                                        }
                                        else {
                                            matchResult_8 = 4;
                                        }
                                    }
                                    else {
                                        matchResult_8 = 5;
                                    }
                                }
                                else {
                                    matchResult_8 = 5;
                                }
                            }
                            else {
                                matchResult_8 = 5;
                            }
                        }
                        else {
                            matchResult_8 = 5;
                        }
                    }
                    else if (!isEmpty(tail(tail(matchValue_8)))) {
                        if (head(tail(tail(matchValue_8))) == null) {
                            if (!isEmpty(tail(tail(tail(matchValue_8))))) {
                                if (!isEmpty(tail(tail(tail(tail(matchValue_8)))))) {
                                    if (head(tail(tail(tail(tail(matchValue_8))))) != null) {
                                        if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                            if ((n_25 = (head(tail(tail(tail(tail(matchValue_8))))) | 0), n_25 !== 2)) {
                                                matchResult_8 = 2;
                                                n_35 = head(tail(tail(tail(tail(matchValue_8)))));
                                            }
                                            else if (head(tail(tail(tail(matchValue_8)))) != null) {
                                                matchResult_8 = 3;
                                                a_6 = head(tail(tail(tail(matchValue_8))));
                                                m_12 = head(tail(matchValue_8));
                                                n_36 = head(matchValue_8);
                                            }
                                            else {
                                                matchResult_8 = 4;
                                            }
                                        }
                                        else {
                                            matchResult_8 = 5;
                                        }
                                    }
                                    else if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                        if (head(tail(tail(tail(matchValue_8)))) != null) {
                                            matchResult_8 = 3;
                                            a_6 = head(tail(tail(tail(matchValue_8))));
                                            m_12 = head(tail(matchValue_8));
                                            n_36 = head(matchValue_8);
                                        }
                                        else {
                                            matchResult_8 = 4;
                                        }
                                    }
                                    else {
                                        matchResult_8 = 5;
                                    }
                                }
                                else {
                                    matchResult_8 = 5;
                                }
                            }
                            else {
                                matchResult_8 = 5;
                            }
                        }
                        else if (!isEmpty(tail(tail(tail(matchValue_8))))) {
                            if (head(tail(tail(tail(matchValue_8)))) == null) {
                                if (!isEmpty(tail(tail(tail(tail(matchValue_8)))))) {
                                    if (head(tail(tail(tail(tail(matchValue_8))))) != null) {
                                        if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                            if ((n_26 = (head(tail(tail(tail(tail(matchValue_8))))) | 0), n_26 !== 2)) {
                                                matchResult_8 = 2;
                                                n_35 = head(tail(tail(tail(tail(matchValue_8)))));
                                            }
                                            else {
                                                matchResult_8 = 3;
                                                a_6 = head(tail(tail(matchValue_8)));
                                                m_12 = head(tail(matchValue_8));
                                                n_36 = head(matchValue_8);
                                            }
                                        }
                                        else {
                                            matchResult_8 = 5;
                                        }
                                    }
                                    else if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                        matchResult_8 = 3;
                                        a_6 = head(tail(tail(matchValue_8)));
                                        m_12 = head(tail(matchValue_8));
                                        n_36 = head(matchValue_8);
                                    }
                                    else {
                                        matchResult_8 = 5;
                                    }
                                }
                                else {
                                    matchResult_8 = 5;
                                }
                            }
                            else if (!isEmpty(tail(tail(tail(tail(matchValue_8)))))) {
                                if (head(tail(tail(tail(tail(matchValue_8))))) != null) {
                                    if (head(tail(tail(tail(tail(matchValue_8))))) === 2) {
                                        if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                            if ((n_27 = (head(matchValue_8) | 0), (m_6 = (head(tail(matchValue_8)) | 0), (b = (head(tail(tail(tail(matchValue_8)))) | 0), (a = (head(tail(tail(matchValue_8))) | 0), ((n_27 === m_6) && (n_27 === a)) && (n_27 === b)))))) {
                                                matchResult_8 = 0;
                                                a_4 = head(tail(tail(matchValue_8)));
                                                b_4 = head(tail(tail(tail(matchValue_8))));
                                                m_10 = head(tail(matchValue_8));
                                                n_33 = head(matchValue_8);
                                            }
                                            else if ((n_28 = (head(matchValue_8) | 0), (m_7 = (head(tail(matchValue_8)) | 0), (b_1 = (head(tail(tail(tail(matchValue_8)))) | 0), (a_1 = (head(tail(tail(matchValue_8))) | 0), ((n_28 !== m_7) ? true : (n_28 !== a_1)) ? true : (n_28 !== b_1)))))) {
                                                matchResult_8 = 1;
                                                a_5 = head(tail(tail(matchValue_8)));
                                                b_5 = head(tail(tail(tail(matchValue_8))));
                                                m_11 = head(tail(matchValue_8));
                                                n_34 = head(matchValue_8);
                                            }
                                            else if ((n_29 = (head(tail(tail(tail(tail(matchValue_8))))) | 0), n_29 !== 2)) {
                                                matchResult_8 = 2;
                                                n_35 = head(tail(tail(tail(tail(matchValue_8)))));
                                            }
                                            else {
                                                matchResult_8 = 4;
                                            }
                                        }
                                        else {
                                            matchResult_8 = 5;
                                        }
                                    }
                                    else if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                        if ((n_30 = (head(matchValue_8) | 0), (m_8 = (head(tail(matchValue_8)) | 0), (b_2 = (head(tail(tail(tail(matchValue_8)))) | 0), (a_2 = (head(tail(tail(matchValue_8))) | 0), ((n_30 !== m_8) ? true : (n_30 !== a_2)) ? true : (n_30 !== b_2)))))) {
                                            matchResult_8 = 1;
                                            a_5 = head(tail(tail(matchValue_8)));
                                            b_5 = head(tail(tail(tail(matchValue_8))));
                                            m_11 = head(tail(matchValue_8));
                                            n_34 = head(matchValue_8);
                                        }
                                        else if ((n_31 = (head(tail(tail(tail(tail(matchValue_8))))) | 0), n_31 !== 2)) {
                                            matchResult_8 = 2;
                                            n_35 = head(tail(tail(tail(tail(matchValue_8)))));
                                        }
                                        else {
                                            matchResult_8 = 4;
                                        }
                                    }
                                    else {
                                        matchResult_8 = 5;
                                    }
                                }
                                else if (isEmpty(tail(tail(tail(tail(tail(matchValue_8))))))) {
                                    if ((n_32 = (head(matchValue_8) | 0), (m_9 = (head(tail(matchValue_8)) | 0), (b_3 = (head(tail(tail(tail(matchValue_8)))) | 0), (a_3 = (head(tail(tail(matchValue_8))) | 0), ((n_32 !== m_9) ? true : (n_32 !== a_3)) ? true : (n_32 !== b_3)))))) {
                                        matchResult_8 = 1;
                                        a_5 = head(tail(tail(matchValue_8)));
                                        b_5 = head(tail(tail(tail(matchValue_8))));
                                        m_11 = head(tail(matchValue_8));
                                        n_34 = head(matchValue_8);
                                    }
                                    else {
                                        matchResult_8 = 4;
                                    }
                                }
                                else {
                                    matchResult_8 = 5;
                                }
                            }
                            else {
                                matchResult_8 = 5;
                            }
                        }
                        else {
                            matchResult_8 = 5;
                        }
                    }
                    else {
                        matchResult_8 = 5;
                    }
                }
                else {
                    matchResult_8 = 5;
                }
            }
            else {
                matchResult_8 = 5;
            }
            switch (matchResult_8) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), n_33)]);
                case 1:
                    return new FSharpResult$2(1, [new WidthInferError(toText(printf("Wrong wire width. The four inputs to a multiplexer are expected to have the same width, but 1st input has %d bits, 2nd input has %d bits, 3rd input has %d bits, 4th input has %d bits."))(n_34)(m_11)(a_5)(b_5), ofArray([getConnectionIdForPort_1(0), getConnectionIdForPort_1(1), getConnectionIdForPort_1(2), getConnectionIdForPort_1(3)]))]);
                case 2:
                    return makeWidthInferErrorEqual(2, n_35, singleton(getConnectionIdForPort_1(4)));
                case 3:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), n_36)]);
                case 4:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 13: {
            assertInputsSize(inputConnectionsWidth, 9, comp);
            const matchValue_9 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1, 2, 3, 4, 5, 6, 7, 8]));
            let matchResult_9, a_11, b_10, c_4, d_4, e_4, f_4, m_17, n_51, a_12, b_11, c_5, d_5, e_5, f_5, m_18, n_52, n_53, a_13, b_12, c_6, d_6, e_6, m_19, n_54;
            if (!isEmpty(matchValue_9)) {
                if (head(matchValue_9) == null) {
                    if (!isEmpty(tail(matchValue_9))) {
                        if (!isEmpty(tail(tail(matchValue_9)))) {
                            if (!isEmpty(tail(tail(tail(matchValue_9))))) {
                                if (!isEmpty(tail(tail(tail(tail(matchValue_9)))))) {
                                    if (!isEmpty(tail(tail(tail(tail(tail(matchValue_9))))))) {
                                        if (!isEmpty(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) {
                                            if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) {
                                                if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))))) {
                                                    if (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) != null) {
                                                        if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                            if ((n_37 = (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) | 0), n_37 !== 3)) {
                                                                matchResult_9 = 2;
                                                                n_53 = head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))));
                                                            }
                                                            else if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                    if (head(tail(tail(tail(tail(tail(matchValue_9)))))) != null) {
                                                                        if (head(tail(tail(tail(tail(matchValue_9))))) != null) {
                                                                            if (head(tail(tail(tail(matchValue_9)))) != null) {
                                                                                if (head(tail(tail(matchValue_9))) != null) {
                                                                                    if (head(tail(matchValue_9)) != null) {
                                                                                        matchResult_9 = 3;
                                                                                        a_13 = head(tail(tail(tail(matchValue_9))));
                                                                                        b_12 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                                        c_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                                        d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                                        e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                                        m_19 = head(tail(tail(matchValue_9)));
                                                                                        n_54 = head(tail(matchValue_9));
                                                                                    }
                                                                                    else {
                                                                                        matchResult_9 = 4;
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    matchResult_9 = 4;
                                                                                }
                                                                            }
                                                                            else {
                                                                                matchResult_9 = 4;
                                                                            }
                                                                        }
                                                                        else {
                                                                            matchResult_9 = 4;
                                                                        }
                                                                    }
                                                                    else {
                                                                        matchResult_9 = 4;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 5;
                                                        }
                                                    }
                                                    else if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                        if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                            if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(matchValue_9)))))) != null) {
                                                                    if (head(tail(tail(tail(tail(matchValue_9))))) != null) {
                                                                        if (head(tail(tail(tail(matchValue_9)))) != null) {
                                                                            if (head(tail(tail(matchValue_9))) != null) {
                                                                                if (head(tail(matchValue_9)) != null) {
                                                                                    matchResult_9 = 3;
                                                                                    a_13 = head(tail(tail(tail(matchValue_9))));
                                                                                    b_12 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                                    c_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                                    d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                                    e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                                    m_19 = head(tail(tail(matchValue_9)));
                                                                                    n_54 = head(tail(matchValue_9));
                                                                                }
                                                                                else {
                                                                                    matchResult_9 = 4;
                                                                                }
                                                                            }
                                                                            else {
                                                                                matchResult_9 = 4;
                                                                            }
                                                                        }
                                                                        else {
                                                                            matchResult_9 = 4;
                                                                        }
                                                                    }
                                                                    else {
                                                                        matchResult_9 = 4;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 4;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_9 = 5;
                                                    }
                                                }
                                                else {
                                                    matchResult_9 = 5;
                                                }
                                            }
                                            else {
                                                matchResult_9 = 5;
                                            }
                                        }
                                        else {
                                            matchResult_9 = 5;
                                        }
                                    }
                                    else {
                                        matchResult_9 = 5;
                                    }
                                }
                                else {
                                    matchResult_9 = 5;
                                }
                            }
                            else {
                                matchResult_9 = 5;
                            }
                        }
                        else {
                            matchResult_9 = 5;
                        }
                    }
                    else {
                        matchResult_9 = 5;
                    }
                }
                else if (!isEmpty(tail(matchValue_9))) {
                    if (head(tail(matchValue_9)) == null) {
                        if (!isEmpty(tail(tail(matchValue_9)))) {
                            if (!isEmpty(tail(tail(tail(matchValue_9))))) {
                                if (!isEmpty(tail(tail(tail(tail(matchValue_9)))))) {
                                    if (!isEmpty(tail(tail(tail(tail(tail(matchValue_9))))))) {
                                        if (!isEmpty(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) {
                                            if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) {
                                                if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))))) {
                                                    if (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) != null) {
                                                        if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                            if ((n_38 = (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) | 0), n_38 !== 3)) {
                                                                matchResult_9 = 2;
                                                                n_53 = head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))));
                                                            }
                                                            else if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                    if (head(tail(tail(tail(tail(tail(matchValue_9)))))) != null) {
                                                                        if (head(tail(tail(tail(tail(matchValue_9))))) != null) {
                                                                            if (head(tail(tail(tail(matchValue_9)))) != null) {
                                                                                if (head(tail(tail(matchValue_9))) != null) {
                                                                                    matchResult_9 = 3;
                                                                                    a_13 = head(tail(tail(tail(matchValue_9))));
                                                                                    b_12 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                                    c_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                                    d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                                    e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                                    m_19 = head(tail(tail(matchValue_9)));
                                                                                    n_54 = head(matchValue_9);
                                                                                }
                                                                                else {
                                                                                    matchResult_9 = 4;
                                                                                }
                                                                            }
                                                                            else {
                                                                                matchResult_9 = 4;
                                                                            }
                                                                        }
                                                                        else {
                                                                            matchResult_9 = 4;
                                                                        }
                                                                    }
                                                                    else {
                                                                        matchResult_9 = 4;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 5;
                                                        }
                                                    }
                                                    else if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                        if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                            if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(matchValue_9)))))) != null) {
                                                                    if (head(tail(tail(tail(tail(matchValue_9))))) != null) {
                                                                        if (head(tail(tail(tail(matchValue_9)))) != null) {
                                                                            if (head(tail(tail(matchValue_9))) != null) {
                                                                                matchResult_9 = 3;
                                                                                a_13 = head(tail(tail(tail(matchValue_9))));
                                                                                b_12 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                                c_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                                d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                                e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                                m_19 = head(tail(tail(matchValue_9)));
                                                                                n_54 = head(matchValue_9);
                                                                            }
                                                                            else {
                                                                                matchResult_9 = 4;
                                                                            }
                                                                        }
                                                                        else {
                                                                            matchResult_9 = 4;
                                                                        }
                                                                    }
                                                                    else {
                                                                        matchResult_9 = 4;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 4;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_9 = 5;
                                                    }
                                                }
                                                else {
                                                    matchResult_9 = 5;
                                                }
                                            }
                                            else {
                                                matchResult_9 = 5;
                                            }
                                        }
                                        else {
                                            matchResult_9 = 5;
                                        }
                                    }
                                    else {
                                        matchResult_9 = 5;
                                    }
                                }
                                else {
                                    matchResult_9 = 5;
                                }
                            }
                            else {
                                matchResult_9 = 5;
                            }
                        }
                        else {
                            matchResult_9 = 5;
                        }
                    }
                    else if (!isEmpty(tail(tail(matchValue_9)))) {
                        if (head(tail(tail(matchValue_9))) == null) {
                            if (!isEmpty(tail(tail(tail(matchValue_9))))) {
                                if (!isEmpty(tail(tail(tail(tail(matchValue_9)))))) {
                                    if (!isEmpty(tail(tail(tail(tail(tail(matchValue_9))))))) {
                                        if (!isEmpty(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) {
                                            if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) {
                                                if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))))) {
                                                    if (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) != null) {
                                                        if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                            if ((n_39 = (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) | 0), n_39 !== 3)) {
                                                                matchResult_9 = 2;
                                                                n_53 = head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))));
                                                            }
                                                            else if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                    if (head(tail(tail(tail(tail(tail(matchValue_9)))))) != null) {
                                                                        if (head(tail(tail(tail(tail(matchValue_9))))) != null) {
                                                                            if (head(tail(tail(tail(matchValue_9)))) != null) {
                                                                                matchResult_9 = 3;
                                                                                a_13 = head(tail(tail(tail(matchValue_9))));
                                                                                b_12 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                                c_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                                d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                                e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                                m_19 = head(tail(matchValue_9));
                                                                                n_54 = head(matchValue_9);
                                                                            }
                                                                            else {
                                                                                matchResult_9 = 4;
                                                                            }
                                                                        }
                                                                        else {
                                                                            matchResult_9 = 4;
                                                                        }
                                                                    }
                                                                    else {
                                                                        matchResult_9 = 4;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 5;
                                                        }
                                                    }
                                                    else if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                        if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                            if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(matchValue_9)))))) != null) {
                                                                    if (head(tail(tail(tail(tail(matchValue_9))))) != null) {
                                                                        if (head(tail(tail(tail(matchValue_9)))) != null) {
                                                                            matchResult_9 = 3;
                                                                            a_13 = head(tail(tail(tail(matchValue_9))));
                                                                            b_12 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                            c_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                            d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                            e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                            m_19 = head(tail(matchValue_9));
                                                                            n_54 = head(matchValue_9);
                                                                        }
                                                                        else {
                                                                            matchResult_9 = 4;
                                                                        }
                                                                    }
                                                                    else {
                                                                        matchResult_9 = 4;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 4;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_9 = 5;
                                                    }
                                                }
                                                else {
                                                    matchResult_9 = 5;
                                                }
                                            }
                                            else {
                                                matchResult_9 = 5;
                                            }
                                        }
                                        else {
                                            matchResult_9 = 5;
                                        }
                                    }
                                    else {
                                        matchResult_9 = 5;
                                    }
                                }
                                else {
                                    matchResult_9 = 5;
                                }
                            }
                            else {
                                matchResult_9 = 5;
                            }
                        }
                        else if (!isEmpty(tail(tail(tail(matchValue_9))))) {
                            if (head(tail(tail(tail(matchValue_9)))) == null) {
                                if (!isEmpty(tail(tail(tail(tail(matchValue_9)))))) {
                                    if (!isEmpty(tail(tail(tail(tail(tail(matchValue_9))))))) {
                                        if (!isEmpty(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) {
                                            if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) {
                                                if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))))) {
                                                    if (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) != null) {
                                                        if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                            if ((n_40 = (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) | 0), n_40 !== 3)) {
                                                                matchResult_9 = 2;
                                                                n_53 = head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))));
                                                            }
                                                            else if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                    if (head(tail(tail(tail(tail(tail(matchValue_9)))))) != null) {
                                                                        if (head(tail(tail(tail(tail(matchValue_9))))) != null) {
                                                                            matchResult_9 = 3;
                                                                            a_13 = head(tail(tail(matchValue_9)));
                                                                            b_12 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                            c_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                            d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                            e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                            m_19 = head(tail(matchValue_9));
                                                                            n_54 = head(matchValue_9);
                                                                        }
                                                                        else {
                                                                            matchResult_9 = 4;
                                                                        }
                                                                    }
                                                                    else {
                                                                        matchResult_9 = 4;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 5;
                                                        }
                                                    }
                                                    else if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                        if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                            if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(matchValue_9)))))) != null) {
                                                                    if (head(tail(tail(tail(tail(matchValue_9))))) != null) {
                                                                        matchResult_9 = 3;
                                                                        a_13 = head(tail(tail(matchValue_9)));
                                                                        b_12 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                        c_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                        d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                        e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                        m_19 = head(tail(matchValue_9));
                                                                        n_54 = head(matchValue_9);
                                                                    }
                                                                    else {
                                                                        matchResult_9 = 4;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 4;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_9 = 5;
                                                    }
                                                }
                                                else {
                                                    matchResult_9 = 5;
                                                }
                                            }
                                            else {
                                                matchResult_9 = 5;
                                            }
                                        }
                                        else {
                                            matchResult_9 = 5;
                                        }
                                    }
                                    else {
                                        matchResult_9 = 5;
                                    }
                                }
                                else {
                                    matchResult_9 = 5;
                                }
                            }
                            else if (!isEmpty(tail(tail(tail(tail(matchValue_9)))))) {
                                if (head(tail(tail(tail(tail(matchValue_9))))) == null) {
                                    if (!isEmpty(tail(tail(tail(tail(tail(matchValue_9))))))) {
                                        if (!isEmpty(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) {
                                            if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) {
                                                if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))))) {
                                                    if (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) != null) {
                                                        if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                            if ((n_41 = (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) | 0), n_41 !== 3)) {
                                                                matchResult_9 = 2;
                                                                n_53 = head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))));
                                                            }
                                                            else if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                    if (head(tail(tail(tail(tail(tail(matchValue_9)))))) != null) {
                                                                        matchResult_9 = 3;
                                                                        a_13 = head(tail(tail(matchValue_9)));
                                                                        b_12 = head(tail(tail(tail(matchValue_9))));
                                                                        c_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                        d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                        e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                        m_19 = head(tail(matchValue_9));
                                                                        n_54 = head(matchValue_9);
                                                                    }
                                                                    else {
                                                                        matchResult_9 = 4;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 5;
                                                        }
                                                    }
                                                    else if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                        if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                            if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(matchValue_9)))))) != null) {
                                                                    matchResult_9 = 3;
                                                                    a_13 = head(tail(tail(matchValue_9)));
                                                                    b_12 = head(tail(tail(tail(matchValue_9))));
                                                                    c_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                    d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                    e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                    m_19 = head(tail(matchValue_9));
                                                                    n_54 = head(matchValue_9);
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 4;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_9 = 5;
                                                    }
                                                }
                                                else {
                                                    matchResult_9 = 5;
                                                }
                                            }
                                            else {
                                                matchResult_9 = 5;
                                            }
                                        }
                                        else {
                                            matchResult_9 = 5;
                                        }
                                    }
                                    else {
                                        matchResult_9 = 5;
                                    }
                                }
                                else if (!isEmpty(tail(tail(tail(tail(tail(matchValue_9))))))) {
                                    if (head(tail(tail(tail(tail(tail(matchValue_9)))))) == null) {
                                        if (!isEmpty(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) {
                                            if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) {
                                                if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))))) {
                                                    if (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) != null) {
                                                        if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                            if ((n_42 = (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) | 0), n_42 !== 3)) {
                                                                matchResult_9 = 2;
                                                                n_53 = head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))));
                                                            }
                                                            else if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                                if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                    matchResult_9 = 3;
                                                                    a_13 = head(tail(tail(matchValue_9)));
                                                                    b_12 = head(tail(tail(tail(matchValue_9))));
                                                                    c_6 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                    d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                    e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                    m_19 = head(tail(matchValue_9));
                                                                    n_54 = head(matchValue_9);
                                                                }
                                                                else {
                                                                    matchResult_9 = 4;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 5;
                                                        }
                                                    }
                                                    else if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                        if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                            if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) != null) {
                                                                matchResult_9 = 3;
                                                                a_13 = head(tail(tail(matchValue_9)));
                                                                b_12 = head(tail(tail(tail(matchValue_9))));
                                                                c_6 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                d_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                m_19 = head(tail(matchValue_9));
                                                                n_54 = head(matchValue_9);
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 4;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_9 = 5;
                                                    }
                                                }
                                                else {
                                                    matchResult_9 = 5;
                                                }
                                            }
                                            else {
                                                matchResult_9 = 5;
                                            }
                                        }
                                        else {
                                            matchResult_9 = 5;
                                        }
                                    }
                                    else if (!isEmpty(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) {
                                        if (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) == null) {
                                            if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) {
                                                if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))))) {
                                                    if (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) != null) {
                                                        if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                            if ((n_43 = (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) | 0), n_43 !== 3)) {
                                                                matchResult_9 = 2;
                                                                n_53 = head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))));
                                                            }
                                                            else if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                                matchResult_9 = 3;
                                                                a_13 = head(tail(tail(matchValue_9)));
                                                                b_12 = head(tail(tail(tail(matchValue_9))));
                                                                c_6 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                d_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                m_19 = head(tail(matchValue_9));
                                                                n_54 = head(matchValue_9);
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 5;
                                                        }
                                                    }
                                                    else if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                        if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) != null) {
                                                            matchResult_9 = 3;
                                                            a_13 = head(tail(tail(matchValue_9)));
                                                            b_12 = head(tail(tail(tail(matchValue_9))));
                                                            c_6 = head(tail(tail(tail(tail(matchValue_9)))));
                                                            d_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                            e_6 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                            m_19 = head(tail(matchValue_9));
                                                            n_54 = head(matchValue_9);
                                                        }
                                                        else {
                                                            matchResult_9 = 4;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_9 = 5;
                                                    }
                                                }
                                                else {
                                                    matchResult_9 = 5;
                                                }
                                            }
                                            else {
                                                matchResult_9 = 5;
                                            }
                                        }
                                        else if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) {
                                            if (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) == null) {
                                                if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))))) {
                                                    if (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) != null) {
                                                        if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                            if ((n_44 = (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) | 0), n_44 !== 3)) {
                                                                matchResult_9 = 2;
                                                                n_53 = head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))));
                                                            }
                                                            else {
                                                                matchResult_9 = 3;
                                                                a_13 = head(tail(tail(matchValue_9)));
                                                                b_12 = head(tail(tail(tail(matchValue_9))));
                                                                c_6 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                d_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                e_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                m_19 = head(tail(matchValue_9));
                                                                n_54 = head(matchValue_9);
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 5;
                                                        }
                                                    }
                                                    else if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                        matchResult_9 = 3;
                                                        a_13 = head(tail(tail(matchValue_9)));
                                                        b_12 = head(tail(tail(tail(matchValue_9))));
                                                        c_6 = head(tail(tail(tail(tail(matchValue_9)))));
                                                        d_6 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                        e_6 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                        m_19 = head(tail(matchValue_9));
                                                        n_54 = head(matchValue_9);
                                                    }
                                                    else {
                                                        matchResult_9 = 5;
                                                    }
                                                }
                                                else {
                                                    matchResult_9 = 5;
                                                }
                                            }
                                            else if (!isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))))) {
                                                if (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) != null) {
                                                    if (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) === 3) {
                                                        if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                            if ((n_45 = (head(matchValue_9) | 0), (m_13 = (head(tail(matchValue_9)) | 0), (f = (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) | 0), (e = (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) | 0), (d = (head(tail(tail(tail(tail(tail(matchValue_9)))))) | 0), (c = (head(tail(tail(tail(tail(matchValue_9))))) | 0), (b_6 = (head(tail(tail(tail(matchValue_9)))) | 0), (a_7 = (head(tail(tail(matchValue_9))) | 0), ((((((n_45 === m_13) && (n_45 === a_7)) && (n_45 === b_6)) && (n_45 === c)) && (n_45 === d)) && (n_45 === e)) && (n_45 === f)))))))))) {
                                                                matchResult_9 = 0;
                                                                a_11 = head(tail(tail(matchValue_9)));
                                                                b_10 = head(tail(tail(tail(matchValue_9))));
                                                                c_4 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                d_4 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                e_4 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                f_4 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                m_17 = head(tail(matchValue_9));
                                                                n_51 = head(matchValue_9);
                                                            }
                                                            else if ((n_46 = (head(matchValue_9) | 0), (m_14 = (head(tail(matchValue_9)) | 0), (f_1 = (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) | 0), (e_1 = (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) | 0), (d_1 = (head(tail(tail(tail(tail(tail(matchValue_9)))))) | 0), (c_1 = (head(tail(tail(tail(tail(matchValue_9))))) | 0), (b_7 = (head(tail(tail(tail(matchValue_9)))) | 0), (a_8 = (head(tail(tail(matchValue_9))) | 0), ((((((n_46 !== m_14) ? true : (n_46 !== a_8)) ? true : (n_46 !== b_7)) ? true : (n_46 !== c_1)) ? true : (n_46 !== d_1)) ? true : (n_46 !== e_1)) ? true : (n_46 !== f_1)))))))))) {
                                                                matchResult_9 = 1;
                                                                a_12 = head(tail(tail(matchValue_9)));
                                                                b_11 = head(tail(tail(tail(matchValue_9))));
                                                                c_5 = head(tail(tail(tail(tail(matchValue_9)))));
                                                                d_5 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                                e_5 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                                f_5 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                                m_18 = head(tail(matchValue_9));
                                                                n_52 = head(matchValue_9);
                                                            }
                                                            else if ((n_47 = (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) | 0), n_47 !== 3)) {
                                                                matchResult_9 = 2;
                                                                n_53 = head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))));
                                                            }
                                                            else {
                                                                matchResult_9 = 4;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_9 = 5;
                                                        }
                                                    }
                                                    else if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                        if ((n_48 = (head(matchValue_9) | 0), (m_15 = (head(tail(matchValue_9)) | 0), (f_2 = (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) | 0), (e_2 = (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) | 0), (d_2 = (head(tail(tail(tail(tail(tail(matchValue_9)))))) | 0), (c_2 = (head(tail(tail(tail(tail(matchValue_9))))) | 0), (b_8 = (head(tail(tail(tail(matchValue_9)))) | 0), (a_9 = (head(tail(tail(matchValue_9))) | 0), ((((((n_48 !== m_15) ? true : (n_48 !== a_9)) ? true : (n_48 !== b_8)) ? true : (n_48 !== c_2)) ? true : (n_48 !== d_2)) ? true : (n_48 !== e_2)) ? true : (n_48 !== f_2)))))))))) {
                                                            matchResult_9 = 1;
                                                            a_12 = head(tail(tail(matchValue_9)));
                                                            b_11 = head(tail(tail(tail(matchValue_9))));
                                                            c_5 = head(tail(tail(tail(tail(matchValue_9)))));
                                                            d_5 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                            e_5 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                            f_5 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                            m_18 = head(tail(matchValue_9));
                                                            n_52 = head(matchValue_9);
                                                        }
                                                        else if ((n_49 = (head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))) | 0), n_49 !== 3)) {
                                                            matchResult_9 = 2;
                                                            n_53 = head(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))));
                                                        }
                                                        else {
                                                            matchResult_9 = 4;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_9 = 5;
                                                    }
                                                }
                                                else if (isEmpty(tail(tail(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))))))) {
                                                    if ((n_50 = (head(matchValue_9) | 0), (m_16 = (head(tail(matchValue_9)) | 0), (f_3 = (head(tail(tail(tail(tail(tail(tail(tail(matchValue_9)))))))) | 0), (e_3 = (head(tail(tail(tail(tail(tail(tail(matchValue_9))))))) | 0), (d_3 = (head(tail(tail(tail(tail(tail(matchValue_9)))))) | 0), (c_3 = (head(tail(tail(tail(tail(matchValue_9))))) | 0), (b_9 = (head(tail(tail(tail(matchValue_9)))) | 0), (a_10 = (head(tail(tail(matchValue_9))) | 0), ((((((n_50 !== m_16) ? true : (n_50 !== a_10)) ? true : (n_50 !== b_9)) ? true : (n_50 !== c_3)) ? true : (n_50 !== d_3)) ? true : (n_50 !== e_3)) ? true : (n_50 !== f_3)))))))))) {
                                                        matchResult_9 = 1;
                                                        a_12 = head(tail(tail(matchValue_9)));
                                                        b_11 = head(tail(tail(tail(matchValue_9))));
                                                        c_5 = head(tail(tail(tail(tail(matchValue_9)))));
                                                        d_5 = head(tail(tail(tail(tail(tail(matchValue_9))))));
                                                        e_5 = head(tail(tail(tail(tail(tail(tail(matchValue_9)))))));
                                                        f_5 = head(tail(tail(tail(tail(tail(tail(tail(matchValue_9))))))));
                                                        m_18 = head(tail(matchValue_9));
                                                        n_52 = head(matchValue_9);
                                                    }
                                                    else {
                                                        matchResult_9 = 4;
                                                    }
                                                }
                                                else {
                                                    matchResult_9 = 5;
                                                }
                                            }
                                            else {
                                                matchResult_9 = 5;
                                            }
                                        }
                                        else {
                                            matchResult_9 = 5;
                                        }
                                    }
                                    else {
                                        matchResult_9 = 5;
                                    }
                                }
                                else {
                                    matchResult_9 = 5;
                                }
                            }
                            else {
                                matchResult_9 = 5;
                            }
                        }
                        else {
                            matchResult_9 = 5;
                        }
                    }
                    else {
                        matchResult_9 = 5;
                    }
                }
                else {
                    matchResult_9 = 5;
                }
            }
            else {
                matchResult_9 = 5;
            }
            switch (matchResult_9) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), n_51)]);
                case 1:
                    return new FSharpResult$2(1, [new WidthInferError(toText(printf("Wrong wire width. The eight inputs to a multiplexer are expected to have the same width, but 1st input has %d bits, 2nd input has %d bits, 3rd input has %d bits, 4th input has %d bits, 5th input has %d bits, 6th input has %d bits, 7th input has %d bits, 8th input has %d bits."))(n_52)(m_18)(a_12)(b_11)(c_5)(d_5)(e_5)(f_5), ofArray([getConnectionIdForPort_1(0), getConnectionIdForPort_1(1), getConnectionIdForPort_1(2), getConnectionIdForPort_1(3), getConnectionIdForPort_1(4), getConnectionIdForPort_1(5), getConnectionIdForPort_1(6), getConnectionIdForPort_1(7)]))]);
                case 2:
                    return makeWidthInferErrorEqual(3, n_53, singleton(getConnectionIdForPort_1(8)));
                case 3:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), n_54)]);
                case 4:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 14: {
            assertInputsSize(inputConnectionsWidth, 2, comp);
            const matchValue_10 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_10, n_57, n_58;
            if (!isEmpty(matchValue_10)) {
                if (head(matchValue_10) != null) {
                    if (!isEmpty(tail(matchValue_10))) {
                        if (head(tail(matchValue_10)) == null) {
                            if (isEmpty(tail(tail(matchValue_10)))) {
                                matchResult_10 = 0;
                                n_57 = head(matchValue_10);
                            }
                            else {
                                matchResult_10 = 3;
                            }
                        }
                        else if (head(tail(matchValue_10)) === 1) {
                            if (isEmpty(tail(tail(matchValue_10)))) {
                                matchResult_10 = 0;
                                n_57 = head(matchValue_10);
                            }
                            else {
                                matchResult_10 = 3;
                            }
                        }
                        else if (isEmpty(tail(tail(matchValue_10)))) {
                            if ((n_55 = (head(tail(matchValue_10)) | 0), n_55 !== 1)) {
                                matchResult_10 = 1;
                                n_58 = head(tail(matchValue_10));
                            }
                            else {
                                matchResult_10 = 2;
                            }
                        }
                        else {
                            matchResult_10 = 3;
                        }
                    }
                    else {
                        matchResult_10 = 3;
                    }
                }
                else if (!isEmpty(tail(matchValue_10))) {
                    if (head(tail(matchValue_10)) != null) {
                        if (isEmpty(tail(tail(matchValue_10)))) {
                            if ((n_56 = (head(tail(matchValue_10)) | 0), n_56 !== 1)) {
                                matchResult_10 = 1;
                                n_58 = head(tail(matchValue_10));
                            }
                            else {
                                matchResult_10 = 2;
                            }
                        }
                        else {
                            matchResult_10 = 3;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_10)))) {
                        matchResult_10 = 2;
                    }
                    else {
                        matchResult_10 = 3;
                    }
                }
                else {
                    matchResult_10 = 3;
                }
            }
            else {
                matchResult_10 = 3;
            }
            switch (matchResult_10) {
                case 0: {
                    const out_1 = FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), n_57);
                    const out_2 = FSharpMap__Add(out_1, getOutputPortId(comp, 1), n_57);
                    return new FSharpResult$2(0, [out_2]);
                }
                case 1:
                    return makeWidthInferErrorEqual(1, n_58, singleton(getConnectionIdForPort_1(1)));
                case 2:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 15: {
            assertInputsSize(inputConnectionsWidth, 2, comp);
            const matchValue_11 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_11, n_61, n_62;
            if (!isEmpty(matchValue_11)) {
                if (head(matchValue_11) != null) {
                    if (!isEmpty(tail(matchValue_11))) {
                        if (head(tail(matchValue_11)) == null) {
                            if (isEmpty(tail(tail(matchValue_11)))) {
                                matchResult_11 = 0;
                                n_61 = head(matchValue_11);
                            }
                            else {
                                matchResult_11 = 3;
                            }
                        }
                        else if (head(tail(matchValue_11)) === 2) {
                            if (isEmpty(tail(tail(matchValue_11)))) {
                                matchResult_11 = 0;
                                n_61 = head(matchValue_11);
                            }
                            else {
                                matchResult_11 = 3;
                            }
                        }
                        else if (isEmpty(tail(tail(matchValue_11)))) {
                            if ((n_59 = (head(tail(matchValue_11)) | 0), n_59 !== 2)) {
                                matchResult_11 = 1;
                                n_62 = head(tail(matchValue_11));
                            }
                            else {
                                matchResult_11 = 2;
                            }
                        }
                        else {
                            matchResult_11 = 3;
                        }
                    }
                    else {
                        matchResult_11 = 3;
                    }
                }
                else if (!isEmpty(tail(matchValue_11))) {
                    if (head(tail(matchValue_11)) != null) {
                        if (isEmpty(tail(tail(matchValue_11)))) {
                            if ((n_60 = (head(tail(matchValue_11)) | 0), n_60 !== 2)) {
                                matchResult_11 = 1;
                                n_62 = head(tail(matchValue_11));
                            }
                            else {
                                matchResult_11 = 2;
                            }
                        }
                        else {
                            matchResult_11 = 3;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_11)))) {
                        matchResult_11 = 2;
                    }
                    else {
                        matchResult_11 = 3;
                    }
                }
                else {
                    matchResult_11 = 3;
                }
            }
            else {
                matchResult_11 = 3;
            }
            switch (matchResult_11) {
                case 0: {
                    const map = FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), n_61);
                    const out_3 = fold((s, v) => add(getOutputPortId(comp, v), n_61, s), map, toList(rangeDouble(1, 1, 3)));
                    return new FSharpResult$2(0, [out_3]);
                }
                case 1:
                    return makeWidthInferErrorEqual(2, n_62, singleton(getConnectionIdForPort_1(1)));
                case 2:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 16: {
            assertInputsSize(inputConnectionsWidth, 2, comp);
            const matchValue_12 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_12, n_65, n_66;
            if (!isEmpty(matchValue_12)) {
                if (head(matchValue_12) != null) {
                    if (!isEmpty(tail(matchValue_12))) {
                        if (head(tail(matchValue_12)) == null) {
                            if (isEmpty(tail(tail(matchValue_12)))) {
                                matchResult_12 = 0;
                                n_65 = head(matchValue_12);
                            }
                            else {
                                matchResult_12 = 3;
                            }
                        }
                        else if (head(tail(matchValue_12)) === 3) {
                            if (isEmpty(tail(tail(matchValue_12)))) {
                                matchResult_12 = 0;
                                n_65 = head(matchValue_12);
                            }
                            else {
                                matchResult_12 = 3;
                            }
                        }
                        else if (isEmpty(tail(tail(matchValue_12)))) {
                            if ((n_63 = (head(tail(matchValue_12)) | 0), n_63 !== 3)) {
                                matchResult_12 = 1;
                                n_66 = head(tail(matchValue_12));
                            }
                            else {
                                matchResult_12 = 2;
                            }
                        }
                        else {
                            matchResult_12 = 3;
                        }
                    }
                    else {
                        matchResult_12 = 3;
                    }
                }
                else if (!isEmpty(tail(matchValue_12))) {
                    if (head(tail(matchValue_12)) != null) {
                        if (isEmpty(tail(tail(matchValue_12)))) {
                            if ((n_64 = (head(tail(matchValue_12)) | 0), n_64 !== 3)) {
                                matchResult_12 = 1;
                                n_66 = head(tail(matchValue_12));
                            }
                            else {
                                matchResult_12 = 2;
                            }
                        }
                        else {
                            matchResult_12 = 3;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_12)))) {
                        matchResult_12 = 2;
                    }
                    else {
                        matchResult_12 = 3;
                    }
                }
                else {
                    matchResult_12 = 3;
                }
            }
            else {
                matchResult_12 = 3;
            }
            switch (matchResult_12) {
                case 0: {
                    const map_1 = FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), n_65);
                    const out_4 = fold((s_1, v_1) => add(getOutputPortId(comp, v_1), n_65, s_1), map_1, toList(rangeDouble(1, 1, 7)));
                    return new FSharpResult$2(0, [out_4]);
                }
                case 1:
                    return makeWidthInferErrorEqual(3, n_66, singleton(getConnectionIdForPort_1(1)));
                case 2:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 17: {
            const shifterWidth = matchValue.fields[1] | 0;
            const shiftType = matchValue.fields[2];
            const inputWidth = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 2, comp);
            let okOutMap;
            const out_5 = FSharpMap__Add(empty_1({
                Compare: compare,
            }), getOutputPortId(comp, 0), inputWidth);
            okOutMap = (new FSharpResult$2(0, [out_5]));
            const matchValue_13 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_13, n_72, n_73, n_74, x_27;
            if (!isEmpty(matchValue_13)) {
                if (head(matchValue_13) != null) {
                    if (!isEmpty(tail(matchValue_13))) {
                        if (isEmpty(tail(tail(matchValue_13)))) {
                            if ((n_67 = (head(matchValue_13) | 0), n_67 !== inputWidth)) {
                                matchResult_13 = 0;
                                n_72 = head(matchValue_13);
                            }
                            else if (head(tail(matchValue_13)) != null) {
                                if ((n_68 = (head(tail(matchValue_13)) | 0), n_68 !== shifterWidth)) {
                                    matchResult_13 = 1;
                                    n_73 = head(tail(matchValue_13));
                                }
                                else if ((n_69 = (head(tail(matchValue_13)) | 0), n_69 > 32)) {
                                    matchResult_13 = 2;
                                    n_74 = head(tail(matchValue_13));
                                }
                                else {
                                    matchResult_13 = 3;
                                }
                            }
                            else {
                                matchResult_13 = 3;
                            }
                        }
                        else {
                            matchResult_13 = 4;
                            x_27 = matchValue_13;
                        }
                    }
                    else {
                        matchResult_13 = 4;
                        x_27 = matchValue_13;
                    }
                }
                else if (!isEmpty(tail(matchValue_13))) {
                    if (head(tail(matchValue_13)) != null) {
                        if (isEmpty(tail(tail(matchValue_13)))) {
                            if ((n_70 = (head(tail(matchValue_13)) | 0), n_70 !== shifterWidth)) {
                                matchResult_13 = 1;
                                n_73 = head(tail(matchValue_13));
                            }
                            else if ((n_71 = (head(tail(matchValue_13)) | 0), n_71 > 32)) {
                                matchResult_13 = 2;
                                n_74 = head(tail(matchValue_13));
                            }
                            else {
                                matchResult_13 = 3;
                            }
                        }
                        else {
                            matchResult_13 = 4;
                            x_27 = matchValue_13;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_13)))) {
                        matchResult_13 = 3;
                    }
                    else {
                        matchResult_13 = 4;
                        x_27 = matchValue_13;
                    }
                }
                else {
                    matchResult_13 = 4;
                    x_27 = matchValue_13;
                }
            }
            else {
                matchResult_13 = 4;
                x_27 = matchValue_13;
            }
            switch (matchResult_13) {
                case 0:
                    return makeWidthInferErrorEqual(inputWidth, n_72, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return makeWidthInferErrorEqual(shifterWidth, n_73, singleton(getConnectionIdForPort_1(1)));
                case 2:
                    return makeWidthInferErrorMax(32, n_74, singleton(getConnectionIdForPort_1(1)));
                case 3:
                    return okOutMap;
                default:
                    return toFail(printf("what? Impossible case (%A) in calculateOutputPortsWidth for: %A"))(x_27)(comp.Type);
            }
        }
        case 18: {
            const numberOfBits = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 3, comp);
            let okOutMap_1;
            const out_6 = FSharpMap__Add(empty_1({
                Compare: compare,
            }), getOutputPortId(comp, 0), numberOfBits);
            const out_7 = FSharpMap__Add(out_6, getOutputPortId(comp, 1), 1);
            okOutMap_1 = (new FSharpResult$2(0, [out_7]));
            const matchValue_14 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1, 2]));
            let matchResult_14, n_82, n_83, n_84, x_29;
            if (!isEmpty(matchValue_14)) {
                if (head(matchValue_14) != null) {
                    if (!isEmpty(tail(matchValue_14))) {
                        if (!isEmpty(tail(tail(matchValue_14)))) {
                            if (isEmpty(tail(tail(tail(matchValue_14))))) {
                                if ((n_75 = (head(matchValue_14) | 0), n_75 !== 1)) {
                                    matchResult_14 = 0;
                                    n_82 = head(matchValue_14);
                                }
                                else if (head(tail(matchValue_14)) != null) {
                                    if ((n_76 = (head(tail(matchValue_14)) | 0), n_76 !== numberOfBits)) {
                                        matchResult_14 = 1;
                                        n_83 = head(tail(matchValue_14));
                                    }
                                    else if (head(tail(tail(matchValue_14))) != null) {
                                        if ((n_77 = (head(tail(tail(matchValue_14))) | 0), n_77 !== numberOfBits)) {
                                            matchResult_14 = 2;
                                            n_84 = head(tail(tail(matchValue_14)));
                                        }
                                        else {
                                            matchResult_14 = 3;
                                        }
                                    }
                                    else {
                                        matchResult_14 = 3;
                                    }
                                }
                                else if (head(tail(tail(matchValue_14))) != null) {
                                    if ((n_78 = (head(tail(tail(matchValue_14))) | 0), n_78 !== numberOfBits)) {
                                        matchResult_14 = 2;
                                        n_84 = head(tail(tail(matchValue_14)));
                                    }
                                    else {
                                        matchResult_14 = 3;
                                    }
                                }
                                else {
                                    matchResult_14 = 3;
                                }
                            }
                            else {
                                matchResult_14 = 4;
                                x_29 = matchValue_14;
                            }
                        }
                        else {
                            matchResult_14 = 4;
                            x_29 = matchValue_14;
                        }
                    }
                    else {
                        matchResult_14 = 4;
                        x_29 = matchValue_14;
                    }
                }
                else if (!isEmpty(tail(matchValue_14))) {
                    if (head(tail(matchValue_14)) != null) {
                        if (!isEmpty(tail(tail(matchValue_14)))) {
                            if (isEmpty(tail(tail(tail(matchValue_14))))) {
                                if ((n_79 = (head(tail(matchValue_14)) | 0), n_79 !== numberOfBits)) {
                                    matchResult_14 = 1;
                                    n_83 = head(tail(matchValue_14));
                                }
                                else if (head(tail(tail(matchValue_14))) != null) {
                                    if ((n_80 = (head(tail(tail(matchValue_14))) | 0), n_80 !== numberOfBits)) {
                                        matchResult_14 = 2;
                                        n_84 = head(tail(tail(matchValue_14)));
                                    }
                                    else {
                                        matchResult_14 = 3;
                                    }
                                }
                                else {
                                    matchResult_14 = 3;
                                }
                            }
                            else {
                                matchResult_14 = 4;
                                x_29 = matchValue_14;
                            }
                        }
                        else {
                            matchResult_14 = 4;
                            x_29 = matchValue_14;
                        }
                    }
                    else if (!isEmpty(tail(tail(matchValue_14)))) {
                        if (head(tail(tail(matchValue_14))) != null) {
                            if (isEmpty(tail(tail(tail(matchValue_14))))) {
                                if ((n_81 = (head(tail(tail(matchValue_14))) | 0), n_81 !== numberOfBits)) {
                                    matchResult_14 = 2;
                                    n_84 = head(tail(tail(matchValue_14)));
                                }
                                else {
                                    matchResult_14 = 3;
                                }
                            }
                            else {
                                matchResult_14 = 4;
                                x_29 = matchValue_14;
                            }
                        }
                        else if (isEmpty(tail(tail(tail(matchValue_14))))) {
                            matchResult_14 = 3;
                        }
                        else {
                            matchResult_14 = 4;
                            x_29 = matchValue_14;
                        }
                    }
                    else {
                        matchResult_14 = 4;
                        x_29 = matchValue_14;
                    }
                }
                else {
                    matchResult_14 = 4;
                    x_29 = matchValue_14;
                }
            }
            else {
                matchResult_14 = 4;
                x_29 = matchValue_14;
            }
            switch (matchResult_14) {
                case 0:
                    return makeWidthInferErrorEqual(1, n_82, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return makeWidthInferErrorEqual(numberOfBits, n_83, singleton(getConnectionIdForPort_1(1)));
                case 2:
                    return makeWidthInferErrorEqual(numberOfBits, n_84, singleton(getConnectionIdForPort_1(2)));
                case 3:
                    return okOutMap_1;
                default:
                    return toFail(printf("what? Impossible case (%A) in calculateOutputPortsWidth for: %A"))(x_29)(comp.Type);
            }
        }
        case 19: {
            const numberOfBits_1 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 3, comp);
            let okOutMap_2;
            const out_8 = FSharpMap__Add(empty_1({
                Compare: compare,
            }), getOutputPortId(comp, 0), numberOfBits_1);
            okOutMap_2 = (new FSharpResult$2(0, [out_8]));
            const matchValue_15 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1, 2]));
            let matchResult_15, n_92, n_93, n_94, x_31;
            if (!isEmpty(matchValue_15)) {
                if (head(matchValue_15) != null) {
                    if (!isEmpty(tail(matchValue_15))) {
                        if (!isEmpty(tail(tail(matchValue_15)))) {
                            if (isEmpty(tail(tail(tail(matchValue_15))))) {
                                if ((n_85 = (head(matchValue_15) | 0), n_85 !== 1)) {
                                    matchResult_15 = 0;
                                    n_92 = head(matchValue_15);
                                }
                                else if (head(tail(matchValue_15)) != null) {
                                    if ((n_86 = (head(tail(matchValue_15)) | 0), n_86 !== numberOfBits_1)) {
                                        matchResult_15 = 1;
                                        n_93 = head(tail(matchValue_15));
                                    }
                                    else if (head(tail(tail(matchValue_15))) != null) {
                                        if ((n_87 = (head(tail(tail(matchValue_15))) | 0), n_87 !== numberOfBits_1)) {
                                            matchResult_15 = 2;
                                            n_94 = head(tail(tail(matchValue_15)));
                                        }
                                        else {
                                            matchResult_15 = 3;
                                        }
                                    }
                                    else {
                                        matchResult_15 = 3;
                                    }
                                }
                                else if (head(tail(tail(matchValue_15))) != null) {
                                    if ((n_88 = (head(tail(tail(matchValue_15))) | 0), n_88 !== numberOfBits_1)) {
                                        matchResult_15 = 2;
                                        n_94 = head(tail(tail(matchValue_15)));
                                    }
                                    else {
                                        matchResult_15 = 3;
                                    }
                                }
                                else {
                                    matchResult_15 = 3;
                                }
                            }
                            else {
                                matchResult_15 = 4;
                                x_31 = matchValue_15;
                            }
                        }
                        else {
                            matchResult_15 = 4;
                            x_31 = matchValue_15;
                        }
                    }
                    else {
                        matchResult_15 = 4;
                        x_31 = matchValue_15;
                    }
                }
                else if (!isEmpty(tail(matchValue_15))) {
                    if (head(tail(matchValue_15)) != null) {
                        if (!isEmpty(tail(tail(matchValue_15)))) {
                            if (isEmpty(tail(tail(tail(matchValue_15))))) {
                                if ((n_89 = (head(tail(matchValue_15)) | 0), n_89 !== numberOfBits_1)) {
                                    matchResult_15 = 1;
                                    n_93 = head(tail(matchValue_15));
                                }
                                else if (head(tail(tail(matchValue_15))) != null) {
                                    if ((n_90 = (head(tail(tail(matchValue_15))) | 0), n_90 !== numberOfBits_1)) {
                                        matchResult_15 = 2;
                                        n_94 = head(tail(tail(matchValue_15)));
                                    }
                                    else {
                                        matchResult_15 = 3;
                                    }
                                }
                                else {
                                    matchResult_15 = 3;
                                }
                            }
                            else {
                                matchResult_15 = 4;
                                x_31 = matchValue_15;
                            }
                        }
                        else {
                            matchResult_15 = 4;
                            x_31 = matchValue_15;
                        }
                    }
                    else if (!isEmpty(tail(tail(matchValue_15)))) {
                        if (head(tail(tail(matchValue_15))) != null) {
                            if (isEmpty(tail(tail(tail(matchValue_15))))) {
                                if ((n_91 = (head(tail(tail(matchValue_15))) | 0), n_91 !== numberOfBits_1)) {
                                    matchResult_15 = 2;
                                    n_94 = head(tail(tail(matchValue_15)));
                                }
                                else {
                                    matchResult_15 = 3;
                                }
                            }
                            else {
                                matchResult_15 = 4;
                                x_31 = matchValue_15;
                            }
                        }
                        else if (isEmpty(tail(tail(tail(matchValue_15))))) {
                            matchResult_15 = 3;
                        }
                        else {
                            matchResult_15 = 4;
                            x_31 = matchValue_15;
                        }
                    }
                    else {
                        matchResult_15 = 4;
                        x_31 = matchValue_15;
                    }
                }
                else {
                    matchResult_15 = 4;
                    x_31 = matchValue_15;
                }
            }
            else {
                matchResult_15 = 4;
                x_31 = matchValue_15;
            }
            switch (matchResult_15) {
                case 0:
                    return makeWidthInferErrorEqual(1, n_92, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return makeWidthInferErrorEqual(numberOfBits_1, n_93, singleton(getConnectionIdForPort_1(1)));
                case 2:
                    return makeWidthInferErrorEqual(numberOfBits_1, n_94, singleton(getConnectionIdForPort_1(2)));
                case 3:
                    return okOutMap_2;
                default:
                    return toFail(printf("what? Impossible case (%A) in calculateOutputPortsWidth for: %A"))(x_31)(comp.Type);
            }
        }
        case 20: {
            const numberOfBits_2 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 2, comp);
            let okOutMap_3;
            const out_9 = FSharpMap__Add(empty_1({
                Compare: compare,
            }), getOutputPortId(comp, 0), numberOfBits_2);
            const out_10 = FSharpMap__Add(out_9, getOutputPortId(comp, 1), 1);
            okOutMap_3 = (new FSharpResult$2(0, [out_10]));
            const matchValue_16 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_16, n_98, n_99, x_33;
            if (!isEmpty(matchValue_16)) {
                if (head(matchValue_16) != null) {
                    if (!isEmpty(tail(matchValue_16))) {
                        if (isEmpty(tail(tail(matchValue_16)))) {
                            if ((n_95 = (head(matchValue_16) | 0), n_95 !== numberOfBits_2)) {
                                matchResult_16 = 0;
                                n_98 = head(matchValue_16);
                            }
                            else if (head(tail(matchValue_16)) != null) {
                                if ((n_96 = (head(tail(matchValue_16)) | 0), n_96 !== numberOfBits_2)) {
                                    matchResult_16 = 1;
                                    n_99 = head(tail(matchValue_16));
                                }
                                else {
                                    matchResult_16 = 2;
                                }
                            }
                            else {
                                matchResult_16 = 2;
                            }
                        }
                        else {
                            matchResult_16 = 3;
                            x_33 = matchValue_16;
                        }
                    }
                    else {
                        matchResult_16 = 3;
                        x_33 = matchValue_16;
                    }
                }
                else if (!isEmpty(tail(matchValue_16))) {
                    if (head(tail(matchValue_16)) != null) {
                        if (isEmpty(tail(tail(matchValue_16)))) {
                            if ((n_97 = (head(tail(matchValue_16)) | 0), n_97 !== numberOfBits_2)) {
                                matchResult_16 = 1;
                                n_99 = head(tail(matchValue_16));
                            }
                            else {
                                matchResult_16 = 2;
                            }
                        }
                        else {
                            matchResult_16 = 3;
                            x_33 = matchValue_16;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_16)))) {
                        matchResult_16 = 2;
                    }
                    else {
                        matchResult_16 = 3;
                        x_33 = matchValue_16;
                    }
                }
                else {
                    matchResult_16 = 3;
                    x_33 = matchValue_16;
                }
            }
            else {
                matchResult_16 = 3;
                x_33 = matchValue_16;
            }
            switch (matchResult_16) {
                case 0:
                    return makeWidthInferErrorEqual(numberOfBits_2, n_98, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return makeWidthInferErrorEqual(numberOfBits_2, n_99, singleton(getConnectionIdForPort_1(1)));
                case 2:
                    return okOutMap_3;
                default:
                    return toFail(printf("what? Impossible case (%A) in calculateOutputPortsWidth for: %A"))(x_33)(comp.Type);
            }
        }
        case 21: {
            const numberOfBits_3 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 2, comp);
            let okOutMap_4;
            const out_11 = FSharpMap__Add(empty_1({
                Compare: compare,
            }), getOutputPortId(comp, 0), numberOfBits_3);
            okOutMap_4 = (new FSharpResult$2(0, [out_11]));
            const matchValue_17 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_17, n_103, n_104, x_35;
            if (!isEmpty(matchValue_17)) {
                if (head(matchValue_17) != null) {
                    if (!isEmpty(tail(matchValue_17))) {
                        if (isEmpty(tail(tail(matchValue_17)))) {
                            if ((n_100 = (head(matchValue_17) | 0), n_100 !== numberOfBits_3)) {
                                matchResult_17 = 0;
                                n_103 = head(matchValue_17);
                            }
                            else if (head(tail(matchValue_17)) != null) {
                                if ((n_101 = (head(tail(matchValue_17)) | 0), n_101 !== numberOfBits_3)) {
                                    matchResult_17 = 1;
                                    n_104 = head(tail(matchValue_17));
                                }
                                else {
                                    matchResult_17 = 2;
                                }
                            }
                            else {
                                matchResult_17 = 2;
                            }
                        }
                        else {
                            matchResult_17 = 3;
                            x_35 = matchValue_17;
                        }
                    }
                    else {
                        matchResult_17 = 3;
                        x_35 = matchValue_17;
                    }
                }
                else if (!isEmpty(tail(matchValue_17))) {
                    if (head(tail(matchValue_17)) != null) {
                        if (isEmpty(tail(tail(matchValue_17)))) {
                            if ((n_102 = (head(tail(matchValue_17)) | 0), n_102 !== numberOfBits_3)) {
                                matchResult_17 = 1;
                                n_104 = head(tail(matchValue_17));
                            }
                            else {
                                matchResult_17 = 2;
                            }
                        }
                        else {
                            matchResult_17 = 3;
                            x_35 = matchValue_17;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_17)))) {
                        matchResult_17 = 2;
                    }
                    else {
                        matchResult_17 = 3;
                        x_35 = matchValue_17;
                    }
                }
                else {
                    matchResult_17 = 3;
                    x_35 = matchValue_17;
                }
            }
            else {
                matchResult_17 = 3;
                x_35 = matchValue_17;
            }
            switch (matchResult_17) {
                case 0:
                    return makeWidthInferErrorEqual(numberOfBits_3, n_103, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return makeWidthInferErrorEqual(numberOfBits_3, n_104, singleton(getConnectionIdForPort_1(1)));
                case 2:
                    return okOutMap_4;
                default:
                    return toFail(printf("what? Impossible case (%A) in calculateOutputPortsWidth for: %A"))(x_35)(comp.Type);
            }
        }
        case 22: {
            assertInputsSize(inputConnectionsWidth, 2, comp);
            let okOutMap_5;
            const out_12 = FSharpMap__Add(empty_1({
                Compare: compare,
            }), getOutputPortId(comp, 0), numberOfBits_4);
            okOutMap_5 = (new FSharpResult$2(0, [out_12]));
            const matchValue_18 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_18, n_108, n_109, x_37;
            if (!isEmpty(matchValue_18)) {
                if (head(matchValue_18) != null) {
                    if (!isEmpty(tail(matchValue_18))) {
                        if (isEmpty(tail(tail(matchValue_18)))) {
                            if ((n_105 = (head(matchValue_18) | 0), n_105 !== numberOfBits_4)) {
                                matchResult_18 = 0;
                                n_108 = head(matchValue_18);
                            }
                            else if (head(tail(matchValue_18)) != null) {
                                if ((n_106 = (head(tail(matchValue_18)) | 0), n_106 !== numberOfBits_4)) {
                                    matchResult_18 = 1;
                                    n_109 = head(tail(matchValue_18));
                                }
                                else {
                                    matchResult_18 = 2;
                                }
                            }
                            else {
                                matchResult_18 = 2;
                            }
                        }
                        else {
                            matchResult_18 = 3;
                            x_37 = matchValue_18;
                        }
                    }
                    else {
                        matchResult_18 = 3;
                        x_37 = matchValue_18;
                    }
                }
                else if (!isEmpty(tail(matchValue_18))) {
                    if (head(tail(matchValue_18)) != null) {
                        if (isEmpty(tail(tail(matchValue_18)))) {
                            if ((n_107 = (head(tail(matchValue_18)) | 0), n_107 !== numberOfBits_4)) {
                                matchResult_18 = 1;
                                n_109 = head(tail(matchValue_18));
                            }
                            else {
                                matchResult_18 = 2;
                            }
                        }
                        else {
                            matchResult_18 = 3;
                            x_37 = matchValue_18;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_18)))) {
                        matchResult_18 = 2;
                    }
                    else {
                        matchResult_18 = 3;
                        x_37 = matchValue_18;
                    }
                }
                else {
                    matchResult_18 = 3;
                    x_37 = matchValue_18;
                }
            }
            else {
                matchResult_18 = 3;
                x_37 = matchValue_18;
            }
            switch (matchResult_18) {
                case 0:
                    return makeWidthInferErrorEqual(1, n_108, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return makeWidthInferErrorEqual(numberOfBits_4, n_109, singleton(getConnectionIdForPort_1(1)));
                case 2:
                    return okOutMap_5;
                default:
                    return toFail(printf("what? Impossible case (%A) in calculateOutputPortsWidth for: %A"))(x_37)(comp.Type);
            }
        }
        case 23: {
            const numberOfBits_5 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 1, comp);
            let okOutMap_6;
            const out_13 = FSharpMap__Add(empty_1({
                Compare: compare,
            }), getOutputPortId(comp, 0), numberOfBits_5);
            okOutMap_6 = (new FSharpResult$2(0, [out_13]));
            const matchValue_19 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_19, n_111, x_39;
            if (!isEmpty(matchValue_19)) {
                if (head(matchValue_19) != null) {
                    if (isEmpty(tail(matchValue_19))) {
                        if ((n_110 = (head(matchValue_19) | 0), n_110 !== numberOfBits_5)) {
                            matchResult_19 = 0;
                            n_111 = head(matchValue_19);
                        }
                        else {
                            matchResult_19 = 1;
                        }
                    }
                    else {
                        matchResult_19 = 2;
                        x_39 = matchValue_19;
                    }
                }
                else if (isEmpty(tail(matchValue_19))) {
                    matchResult_19 = 1;
                }
                else {
                    matchResult_19 = 2;
                    x_39 = matchValue_19;
                }
            }
            else {
                matchResult_19 = 2;
                x_39 = matchValue_19;
            }
            switch (matchResult_19) {
                case 0:
                    return makeWidthInferErrorEqual(numberOfBits_5, n_111, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return okOutMap_6;
                default:
                    return toFail(printf("what? Impossible case (%A) in calculateOutputPortsWidth for: %A"))(x_39)(comp.Type);
            }
        }
        case 24: {
            const numberOfBits_6 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 1, comp);
            let okOutMap_7;
            const out_14 = FSharpMap__Add(empty_1({
                Compare: compare,
            }), getOutputPortId(comp, 0), numberOfBits_6);
            okOutMap_7 = (new FSharpResult$2(0, [out_14]));
            const matchValue_20 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_20, n_113, x_41;
            if (!isEmpty(matchValue_20)) {
                if (head(matchValue_20) != null) {
                    if (isEmpty(tail(matchValue_20))) {
                        if ((n_112 = (head(matchValue_20) | 0), n_112 !== 1)) {
                            matchResult_20 = 0;
                            n_113 = head(matchValue_20);
                        }
                        else {
                            matchResult_20 = 1;
                        }
                    }
                    else {
                        matchResult_20 = 2;
                        x_41 = matchValue_20;
                    }
                }
                else if (isEmpty(tail(matchValue_20))) {
                    matchResult_20 = 1;
                }
                else {
                    matchResult_20 = 2;
                    x_41 = matchValue_20;
                }
            }
            else {
                matchResult_20 = 2;
                x_41 = matchValue_20;
            }
            switch (matchResult_20) {
                case 0:
                    return makeWidthInferErrorEqual(1, n_113, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return okOutMap_7;
                default:
                    return toFail(printf("what? Impossible case (%A) in calculateOutputPortsWidth for: %A"))(x_41)(comp.Type);
            }
        }
        case 25: {
            assertInputsSize(inputConnectionsWidth, 2, comp);
            const okOutMap_8 = new FSharpResult$2(0, [ofList_1(map_3((n_114) => [getOutputPortId(comp, n_114), 1], toList(rangeDouble(0, 1, 3))), {
                Compare: compare,
            })]);
            const matchValue_21 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_21, n_121, n_122, x_43;
            if (!isEmpty(matchValue_21)) {
                if (head(matchValue_21) != null) {
                    if (head(matchValue_21) === 2) {
                        if (!isEmpty(tail(matchValue_21))) {
                            if (head(tail(matchValue_21)) != null) {
                                if (head(tail(matchValue_21)) === 1) {
                                    if (isEmpty(tail(tail(matchValue_21)))) {
                                        matchResult_21 = 0;
                                    }
                                    else {
                                        matchResult_21 = 4;
                                        x_43 = matchValue_21;
                                    }
                                }
                                else if (isEmpty(tail(tail(matchValue_21)))) {
                                    if ((n_115 = (head(matchValue_21) | 0), n_115 !== 2)) {
                                        matchResult_21 = 1;
                                        n_121 = head(matchValue_21);
                                    }
                                    else if ((n_116 = (head(tail(matchValue_21)) | 0), n_116 !== 1)) {
                                        matchResult_21 = 2;
                                        n_122 = head(tail(matchValue_21));
                                    }
                                    else {
                                        matchResult_21 = 3;
                                    }
                                }
                                else {
                                    matchResult_21 = 4;
                                    x_43 = matchValue_21;
                                }
                            }
                            else if (isEmpty(tail(tail(matchValue_21)))) {
                                if ((n_117 = (head(matchValue_21) | 0), n_117 !== 2)) {
                                    matchResult_21 = 1;
                                    n_121 = head(matchValue_21);
                                }
                                else {
                                    matchResult_21 = 3;
                                }
                            }
                            else {
                                matchResult_21 = 4;
                                x_43 = matchValue_21;
                            }
                        }
                        else {
                            matchResult_21 = 4;
                            x_43 = matchValue_21;
                        }
                    }
                    else if (!isEmpty(tail(matchValue_21))) {
                        if (isEmpty(tail(tail(matchValue_21)))) {
                            if ((n_118 = (head(matchValue_21) | 0), n_118 !== 2)) {
                                matchResult_21 = 1;
                                n_121 = head(matchValue_21);
                            }
                            else if (head(tail(matchValue_21)) != null) {
                                if ((n_119 = (head(tail(matchValue_21)) | 0), n_119 !== 1)) {
                                    matchResult_21 = 2;
                                    n_122 = head(tail(matchValue_21));
                                }
                                else {
                                    matchResult_21 = 3;
                                }
                            }
                            else {
                                matchResult_21 = 3;
                            }
                        }
                        else {
                            matchResult_21 = 4;
                            x_43 = matchValue_21;
                        }
                    }
                    else {
                        matchResult_21 = 4;
                        x_43 = matchValue_21;
                    }
                }
                else if (!isEmpty(tail(matchValue_21))) {
                    if (head(tail(matchValue_21)) != null) {
                        if (isEmpty(tail(tail(matchValue_21)))) {
                            if ((n_120 = (head(tail(matchValue_21)) | 0), n_120 !== 1)) {
                                matchResult_21 = 2;
                                n_122 = head(tail(matchValue_21));
                            }
                            else {
                                matchResult_21 = 3;
                            }
                        }
                        else {
                            matchResult_21 = 4;
                            x_43 = matchValue_21;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_21)))) {
                        matchResult_21 = 3;
                    }
                    else {
                        matchResult_21 = 4;
                        x_43 = matchValue_21;
                    }
                }
                else {
                    matchResult_21 = 4;
                    x_43 = matchValue_21;
                }
            }
            else {
                matchResult_21 = 4;
                x_43 = matchValue_21;
            }
            switch (matchResult_21) {
                case 0:
                    return okOutMap_8;
                case 1:
                    return makeWidthInferErrorEqual(2, n_121, singleton(getConnectionIdForPort_1(0)));
                case 2:
                    return makeWidthInferErrorEqual(1, n_122, singleton(getConnectionIdForPort_1(1)));
                case 3:
                    return okOutMap_8;
                default:
                    return toFail(printf("what? Impossible case (%A) in calculateOutputPortsWidth for: %A"))(x_43)(comp.Type);
            }
        }
        case 26: {
            const custom = matchValue.fields[0];
            assertInputsSize(inputConnectionsWidth, length(custom.InputLabels), comp);
            const inputWidths = getWidthsForPorts(inputConnectionsWidth, map_3((arg_61) => arg_61, toList(rangeDouble(0, 1, length(custom.InputLabels) - 1))));
            const maybeError = mapIndexed2((idx_1, actual, tupledArg) => {
                let w;
                const expected = tupledArg[1] | 0;
                if (actual != null) {
                    if ((w = (actual | 0), w === expected)) {
                        const w_1 = actual | 0;
                        return void 0;
                    }
                    else {
                        const w_2 = actual | 0;
                        return makeWidthInferErrorEqual(expected, w_2, singleton(getConnectionIdForPort_1(idx_1)));
                    }
                }
                else {
                    return void 0;
                }
            }, inputWidths, custom.InputLabels);
            const matchValue_22 = tryFind((el) => !equals(el, void 0), maybeError);
            if (matchValue_22 == null) {
                return new FSharpResult$2(0, [ofList_1(mapIndexed((idx_2, tupledArg_1) => {
                    const w_3 = tupledArg_1[1] | 0;
                    return [getOutputPortId(comp, idx_2), w_3];
                }, custom.OutputLabels), {
                    Compare: compare,
                })]);
            }
            else if (value_1(matchValue_22) != null) {
                const err = value_1(matchValue_22);
                return err;
            }
            else {
                return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 27: {
            assertInputsSize(inputConnectionsWidth, 2, comp);
            const matchValue_23 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_22, n_124, m_22, m_23, n_125;
            if (!isEmpty(matchValue_23)) {
                if (head(matchValue_23) == null) {
                    if (!isEmpty(tail(matchValue_23))) {
                        if (head(tail(matchValue_23)) == null) {
                            if (isEmpty(tail(tail(matchValue_23)))) {
                                matchResult_22 = 2;
                            }
                            else {
                                matchResult_22 = 4;
                            }
                        }
                        else if (isEmpty(tail(tail(matchValue_23)))) {
                            if ((m_20 = (head(tail(matchValue_23)) | 0), m_20 < 1)) {
                                matchResult_22 = 1;
                                m_22 = head(tail(matchValue_23));
                            }
                            else {
                                matchResult_22 = 2;
                            }
                        }
                        else {
                            matchResult_22 = 4;
                        }
                    }
                    else {
                        matchResult_22 = 4;
                    }
                }
                else if (!isEmpty(tail(matchValue_23))) {
                    if (isEmpty(tail(tail(matchValue_23)))) {
                        if ((n_123 = (head(matchValue_23) | 0), n_123 < 1)) {
                            matchResult_22 = 0;
                            n_124 = head(matchValue_23);
                        }
                        else if (head(tail(matchValue_23)) == null) {
                            matchResult_22 = 2;
                        }
                        else if ((m_21 = (head(tail(matchValue_23)) | 0), m_21 < 1)) {
                            matchResult_22 = 1;
                            m_22 = head(tail(matchValue_23));
                        }
                        else {
                            matchResult_22 = 3;
                            m_23 = head(tail(matchValue_23));
                            n_125 = head(matchValue_23);
                        }
                    }
                    else {
                        matchResult_22 = 4;
                    }
                }
                else {
                    matchResult_22 = 4;
                }
            }
            else {
                matchResult_22 = 4;
            }
            switch (matchResult_22) {
                case 0:
                    return makeWidthInferErrorAtLeast(1, n_124, singleton(getConnectionIdForPort_1(0)));
                case 1:
                    return makeWidthInferErrorAtLeast(1, m_22, singleton(getConnectionIdForPort_1(1)));
                case 2:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                case 3:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), n_125 + m_23)]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 28: {
            const n_126 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, n_126, comp);
            const portWidths_1 = getWidthsForPorts(inputConnectionsWidth, initialize(n_126, (i_1) => i_1));
            const maybeError_1 = mapIndexed((idx_3, width_5) => {
                let w_4;
                let matchResult_23, w_5;
                if (width_5 != null) {
                    if ((w_4 = (width_5 | 0), w_4 < 1)) {
                        matchResult_23 = 0;
                        w_5 = width_5;
                    }
                    else {
                        matchResult_23 = 1;
                    }
                }
                else {
                    matchResult_23 = 1;
                }
                switch (matchResult_23) {
                    case 0:
                        return makeWidthInferErrorAtLeast(1, w_5, singleton(getConnectionIdForPort_1(idx_3)));
                    default:
                        return void 0;
                }
            }, portWidths_1);
            const matchValue_24 = tryFind((el_1) => !equals(el_1, void 0), maybeError_1);
            if (matchValue_24 == null) {
                if (exists((el_2) => equals(el_2, void 0), portWidths_1)) {
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                }
                else {
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), sumBy((x_48) => {
                        if (x_48 == null) {
                            return 0;
                        }
                        else {
                            const x_49 = x_48 | 0;
                            return x_49 | 0;
                        }
                    }, portWidths_1, {
                        GetZero: () => 0,
                        Add: (x_50, y_39) => (x_50 + y_39),
                    }))]);
                }
            }
            else if (value_1(matchValue_24) != null) {
                const err_1 = value_1(matchValue_24);
                return err_1;
            }
            else {
                return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 29: {
            const topWireWidth = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const matchValue_26 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_24, n_128, n_129;
            if (!isEmpty(matchValue_26)) {
                if (head(matchValue_26) != null) {
                    if (isEmpty(tail(matchValue_26))) {
                        if ((n_127 = (head(matchValue_26) | 0), n_127 < (topWireWidth + 1))) {
                            matchResult_24 = 1;
                            n_128 = head(matchValue_26);
                        }
                        else {
                            matchResult_24 = 2;
                            n_129 = head(matchValue_26);
                        }
                    }
                    else {
                        matchResult_24 = 3;
                    }
                }
                else if (isEmpty(tail(matchValue_26))) {
                    matchResult_24 = 0;
                }
                else {
                    matchResult_24 = 3;
                }
            }
            else {
                matchResult_24 = 3;
            }
            switch (matchResult_24) {
                case 0:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                case 1:
                    return makeWidthInferErrorAtLeast(topWireWidth + 1, n_128, singleton(getConnectionIdForPort_1(0)));
                case 2: {
                    const out_15 = FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), topWireWidth);
                    const out_16 = FSharpMap__Add(out_15, getOutputPortId(comp, 1), n_129 - topWireWidth);
                    return new FSharpResult$2(0, [out_16]);
                }
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 30: {
            const outputWidths = matchValue.fields[1];
            const n_130 = matchValue.fields[0] | 0;
            const lsBits = matchValue.fields[2];
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const msb = max_1(map2((width_6, lsb) => ((lsb + width_6) - 1), outputWidths, lsBits), {
                Compare: comparePrimitives,
            }) | 0;
            const matchValue_27 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_25, n_132, n_133;
            if (!isEmpty(matchValue_27)) {
                if (head(matchValue_27) != null) {
                    if (isEmpty(tail(matchValue_27))) {
                        if ((n_131 = (head(matchValue_27) | 0), n_131 < (msb + 1))) {
                            matchResult_25 = 1;
                            n_132 = head(matchValue_27);
                        }
                        else {
                            matchResult_25 = 2;
                            n_133 = head(matchValue_27);
                        }
                    }
                    else {
                        matchResult_25 = 3;
                    }
                }
                else if (isEmpty(tail(matchValue_27))) {
                    matchResult_25 = 0;
                }
                else {
                    matchResult_25 = 3;
                }
            }
            else {
                matchResult_25 = 3;
            }
            switch (matchResult_25) {
                case 0:
                    return new FSharpResult$2(0, [empty_1({
                        Compare: compare,
                    })]);
                case 1:
                    return makeWidthInferErrorAtLeast(msb + 1, n_132, singleton(getConnectionIdForPort_1(0)));
                case 2: {
                    const out_17 = empty_1({
                        Compare: compare,
                    });
                    return new FSharpResult$2(0, [fold2((acc, index, width_7) => FSharpMap__Add(acc, getOutputPortId(comp, index), width_7), out_17, toList(rangeDouble(0, 1, n_133 - 1)), outputWidths)]);
                }
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 31: {
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const matchValue_28 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_26, n_134;
            if (!isEmpty(matchValue_28)) {
                if (head(matchValue_28) != null) {
                    if (head(matchValue_28) === 1) {
                        if (isEmpty(tail(matchValue_28))) {
                            matchResult_26 = 0;
                        }
                        else {
                            matchResult_26 = 2;
                        }
                    }
                    else if (isEmpty(tail(matchValue_28))) {
                        matchResult_26 = 1;
                        n_134 = head(matchValue_28);
                    }
                    else {
                        matchResult_26 = 2;
                    }
                }
                else if (isEmpty(tail(matchValue_28))) {
                    matchResult_26 = 0;
                }
                else {
                    matchResult_26 = 2;
                }
            }
            else {
                matchResult_26 = 2;
            }
            switch (matchResult_26) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), 1)]);
                case 1:
                    return makeWidthInferErrorEqual(1, n_134, singleton(getConnectionIdForPort_1(0)));
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 32: {
            assertInputsSize(inputConnectionsWidth, 2, comp);
            const matchValue_29 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_27, n_140, n_141;
            if (!isEmpty(matchValue_29)) {
                if (head(matchValue_29) != null) {
                    if (head(matchValue_29) === 1) {
                        if (!isEmpty(tail(matchValue_29))) {
                            if (head(tail(matchValue_29)) != null) {
                                if (head(tail(matchValue_29)) === 1) {
                                    if (isEmpty(tail(tail(matchValue_29)))) {
                                        matchResult_27 = 0;
                                    }
                                    else {
                                        matchResult_27 = 3;
                                    }
                                }
                                else if (isEmpty(tail(tail(matchValue_29)))) {
                                    if ((n_135 = (head(matchValue_29) | 0), n_135 !== 1)) {
                                        matchResult_27 = 1;
                                        n_140 = head(matchValue_29);
                                    }
                                    else if ((n_136 = (head(tail(matchValue_29)) | 0), n_136 !== 1)) {
                                        matchResult_27 = 2;
                                        n_141 = head(tail(matchValue_29));
                                    }
                                    else {
                                        matchResult_27 = 3;
                                    }
                                }
                                else {
                                    matchResult_27 = 3;
                                }
                            }
                            else if (isEmpty(tail(tail(matchValue_29)))) {
                                matchResult_27 = 0;
                            }
                            else {
                                matchResult_27 = 3;
                            }
                        }
                        else {
                            matchResult_27 = 3;
                        }
                    }
                    else if (!isEmpty(tail(matchValue_29))) {
                        if (isEmpty(tail(tail(matchValue_29)))) {
                            if ((n_137 = (head(matchValue_29) | 0), n_137 !== 1)) {
                                matchResult_27 = 1;
                                n_140 = head(matchValue_29);
                            }
                            else if (head(tail(matchValue_29)) != null) {
                                if ((n_138 = (head(tail(matchValue_29)) | 0), n_138 !== 1)) {
                                    matchResult_27 = 2;
                                    n_141 = head(tail(matchValue_29));
                                }
                                else {
                                    matchResult_27 = 3;
                                }
                            }
                            else {
                                matchResult_27 = 3;
                            }
                        }
                        else {
                            matchResult_27 = 3;
                        }
                    }
                    else {
                        matchResult_27 = 3;
                    }
                }
                else if (!isEmpty(tail(matchValue_29))) {
                    if (head(tail(matchValue_29)) != null) {
                        if (head(tail(matchValue_29)) === 1) {
                            if (isEmpty(tail(tail(matchValue_29)))) {
                                matchResult_27 = 0;
                            }
                            else {
                                matchResult_27 = 3;
                            }
                        }
                        else if (isEmpty(tail(tail(matchValue_29)))) {
                            if ((n_139 = (head(tail(matchValue_29)) | 0), n_139 !== 1)) {
                                matchResult_27 = 2;
                                n_141 = head(tail(matchValue_29));
                            }
                            else {
                                matchResult_27 = 3;
                            }
                        }
                        else {
                            matchResult_27 = 3;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_29)))) {
                        matchResult_27 = 0;
                    }
                    else {
                        matchResult_27 = 3;
                    }
                }
                else {
                    matchResult_27 = 3;
                }
            }
            else {
                matchResult_27 = 3;
            }
            switch (matchResult_27) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), 1)]);
                case 1:
                    return makeWidthInferErrorEqual(1, n_140, singleton(getConnectionIdForPort_1(0)));
                case 2:
                    return makeWidthInferErrorEqual(1, n_141, singleton(getConnectionIdForPort_1(1)));
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 33: {
            const width_8 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const matchValue_30 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_28, n_144, n_145;
            if (!isEmpty(matchValue_30)) {
                if (head(matchValue_30) != null) {
                    if (isEmpty(tail(matchValue_30))) {
                        if ((n_142 = (head(matchValue_30) | 0), n_142 === width_8)) {
                            matchResult_28 = 1;
                            n_144 = head(matchValue_30);
                        }
                        else if ((n_143 = (head(matchValue_30) | 0), n_143 !== width_8)) {
                            matchResult_28 = 2;
                            n_145 = head(matchValue_30);
                        }
                        else {
                            matchResult_28 = 3;
                        }
                    }
                    else {
                        matchResult_28 = 3;
                    }
                }
                else if (isEmpty(tail(matchValue_30))) {
                    matchResult_28 = 0;
                }
                else {
                    matchResult_28 = 3;
                }
            }
            else {
                matchResult_28 = 3;
            }
            switch (matchResult_28) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_8)]);
                case 1:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_8)]);
                case 2:
                    return makeWidthInferErrorEqual(width_8, n_145, singleton(getConnectionIdForPort_1(0)));
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 34: {
            const width_9 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 2, comp);
            const matchValue_31 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_29, n_153, n_154, n_155;
            if (!isEmpty(matchValue_31)) {
                if (head(matchValue_31) != null) {
                    if (!isEmpty(tail(matchValue_31))) {
                        if (head(tail(matchValue_31)) != null) {
                            if (head(tail(matchValue_31)) === 1) {
                                if (isEmpty(tail(tail(matchValue_31)))) {
                                    if ((n_146 = (head(matchValue_31) | 0), n_146 === width_9)) {
                                        matchResult_29 = 0;
                                        n_153 = head(matchValue_31);
                                    }
                                    else if ((n_147 = (head(matchValue_31) | 0), n_147 !== width_9)) {
                                        matchResult_29 = 1;
                                        n_154 = head(matchValue_31);
                                    }
                                    else if ((n_148 = (head(tail(matchValue_31)) | 0), n_148 !== 1)) {
                                        matchResult_29 = 2;
                                        n_155 = head(tail(matchValue_31));
                                    }
                                    else {
                                        matchResult_29 = 3;
                                    }
                                }
                                else {
                                    matchResult_29 = 4;
                                }
                            }
                            else if (isEmpty(tail(tail(matchValue_31)))) {
                                if ((n_149 = (head(matchValue_31) | 0), n_149 !== width_9)) {
                                    matchResult_29 = 1;
                                    n_154 = head(matchValue_31);
                                }
                                else if ((n_150 = (head(tail(matchValue_31)) | 0), n_150 !== 1)) {
                                    matchResult_29 = 2;
                                    n_155 = head(tail(matchValue_31));
                                }
                                else {
                                    matchResult_29 = 3;
                                }
                            }
                            else {
                                matchResult_29 = 4;
                            }
                        }
                        else if (isEmpty(tail(tail(matchValue_31)))) {
                            if ((n_151 = (head(matchValue_31) | 0), n_151 !== width_9)) {
                                matchResult_29 = 1;
                                n_154 = head(matchValue_31);
                            }
                            else {
                                matchResult_29 = 3;
                            }
                        }
                        else {
                            matchResult_29 = 4;
                        }
                    }
                    else {
                        matchResult_29 = 4;
                    }
                }
                else if (!isEmpty(tail(matchValue_31))) {
                    if (head(tail(matchValue_31)) != null) {
                        if (isEmpty(tail(tail(matchValue_31)))) {
                            if ((n_152 = (head(tail(matchValue_31)) | 0), n_152 !== 1)) {
                                matchResult_29 = 2;
                                n_155 = head(tail(matchValue_31));
                            }
                            else {
                                matchResult_29 = 3;
                            }
                        }
                        else {
                            matchResult_29 = 4;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_31)))) {
                        matchResult_29 = 3;
                    }
                    else {
                        matchResult_29 = 4;
                    }
                }
                else {
                    matchResult_29 = 4;
                }
            }
            else {
                matchResult_29 = 4;
            }
            switch (matchResult_29) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_9)]);
                case 1:
                    return makeWidthInferErrorEqual(width_9, n_154, singleton(getConnectionIdForPort_1(0)));
                case 2:
                    return makeWidthInferErrorEqual(1, n_155, singleton(getConnectionIdForPort_1(1)));
                case 3:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_9)]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 35: {
            const width_10 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 3, comp);
            const matchValue_32 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1, 2]));
            let matchResult_30, n_173, n_174, n_175, n_176;
            if (!isEmpty(matchValue_32)) {
                if (head(matchValue_32) != null) {
                    if (!isEmpty(tail(matchValue_32))) {
                        if (head(tail(matchValue_32)) != null) {
                            if (head(tail(matchValue_32)) === 1) {
                                if (!isEmpty(tail(tail(matchValue_32)))) {
                                    if (head(tail(tail(matchValue_32))) != null) {
                                        if (head(tail(tail(matchValue_32))) === 1) {
                                            if (isEmpty(tail(tail(tail(matchValue_32))))) {
                                                if ((n_156 = (head(matchValue_32) | 0), n_156 === width_10)) {
                                                    matchResult_30 = 0;
                                                    n_173 = head(matchValue_32);
                                                }
                                                else if ((n_157 = (head(matchValue_32) | 0), n_157 !== width_10)) {
                                                    matchResult_30 = 1;
                                                    n_174 = head(matchValue_32);
                                                }
                                                else if ((n_158 = (head(tail(matchValue_32)) | 0), n_158 !== 1)) {
                                                    matchResult_30 = 2;
                                                    n_175 = head(tail(matchValue_32));
                                                }
                                                else if ((n_159 = (head(tail(tail(matchValue_32))) | 0), n_159 !== 1)) {
                                                    matchResult_30 = 3;
                                                    n_176 = head(tail(tail(matchValue_32)));
                                                }
                                                else {
                                                    matchResult_30 = 4;
                                                }
                                            }
                                            else {
                                                matchResult_30 = 5;
                                            }
                                        }
                                        else if (isEmpty(tail(tail(tail(matchValue_32))))) {
                                            if ((n_160 = (head(matchValue_32) | 0), n_160 !== width_10)) {
                                                matchResult_30 = 1;
                                                n_174 = head(matchValue_32);
                                            }
                                            else if ((n_161 = (head(tail(matchValue_32)) | 0), n_161 !== 1)) {
                                                matchResult_30 = 2;
                                                n_175 = head(tail(matchValue_32));
                                            }
                                            else if ((n_162 = (head(tail(tail(matchValue_32))) | 0), n_162 !== 1)) {
                                                matchResult_30 = 3;
                                                n_176 = head(tail(tail(matchValue_32)));
                                            }
                                            else {
                                                matchResult_30 = 4;
                                            }
                                        }
                                        else {
                                            matchResult_30 = 5;
                                        }
                                    }
                                    else if (isEmpty(tail(tail(tail(matchValue_32))))) {
                                        if ((n_163 = (head(matchValue_32) | 0), n_163 !== width_10)) {
                                            matchResult_30 = 1;
                                            n_174 = head(matchValue_32);
                                        }
                                        else if ((n_164 = (head(tail(matchValue_32)) | 0), n_164 !== 1)) {
                                            matchResult_30 = 2;
                                            n_175 = head(tail(matchValue_32));
                                        }
                                        else {
                                            matchResult_30 = 4;
                                        }
                                    }
                                    else {
                                        matchResult_30 = 5;
                                    }
                                }
                                else {
                                    matchResult_30 = 5;
                                }
                            }
                            else if (!isEmpty(tail(tail(matchValue_32)))) {
                                if (isEmpty(tail(tail(tail(matchValue_32))))) {
                                    if ((n_165 = (head(matchValue_32) | 0), n_165 !== width_10)) {
                                        matchResult_30 = 1;
                                        n_174 = head(matchValue_32);
                                    }
                                    else if ((n_166 = (head(tail(matchValue_32)) | 0), n_166 !== 1)) {
                                        matchResult_30 = 2;
                                        n_175 = head(tail(matchValue_32));
                                    }
                                    else if (head(tail(tail(matchValue_32))) != null) {
                                        if ((n_167 = (head(tail(tail(matchValue_32))) | 0), n_167 !== 1)) {
                                            matchResult_30 = 3;
                                            n_176 = head(tail(tail(matchValue_32)));
                                        }
                                        else {
                                            matchResult_30 = 4;
                                        }
                                    }
                                    else {
                                        matchResult_30 = 4;
                                    }
                                }
                                else {
                                    matchResult_30 = 5;
                                }
                            }
                            else {
                                matchResult_30 = 5;
                            }
                        }
                        else if (!isEmpty(tail(tail(matchValue_32)))) {
                            if (isEmpty(tail(tail(tail(matchValue_32))))) {
                                if ((n_168 = (head(matchValue_32) | 0), n_168 !== width_10)) {
                                    matchResult_30 = 1;
                                    n_174 = head(matchValue_32);
                                }
                                else if (head(tail(tail(matchValue_32))) != null) {
                                    if ((n_169 = (head(tail(tail(matchValue_32))) | 0), n_169 !== 1)) {
                                        matchResult_30 = 3;
                                        n_176 = head(tail(tail(matchValue_32)));
                                    }
                                    else {
                                        matchResult_30 = 4;
                                    }
                                }
                                else {
                                    matchResult_30 = 4;
                                }
                            }
                            else {
                                matchResult_30 = 5;
                            }
                        }
                        else {
                            matchResult_30 = 5;
                        }
                    }
                    else {
                        matchResult_30 = 5;
                    }
                }
                else if (!isEmpty(tail(matchValue_32))) {
                    if (head(tail(matchValue_32)) != null) {
                        if (!isEmpty(tail(tail(matchValue_32)))) {
                            if (isEmpty(tail(tail(tail(matchValue_32))))) {
                                if ((n_170 = (head(tail(matchValue_32)) | 0), n_170 !== 1)) {
                                    matchResult_30 = 2;
                                    n_175 = head(tail(matchValue_32));
                                }
                                else if (head(tail(tail(matchValue_32))) != null) {
                                    if ((n_171 = (head(tail(tail(matchValue_32))) | 0), n_171 !== 1)) {
                                        matchResult_30 = 3;
                                        n_176 = head(tail(tail(matchValue_32)));
                                    }
                                    else {
                                        matchResult_30 = 4;
                                    }
                                }
                                else {
                                    matchResult_30 = 4;
                                }
                            }
                            else {
                                matchResult_30 = 5;
                            }
                        }
                        else {
                            matchResult_30 = 5;
                        }
                    }
                    else if (!isEmpty(tail(tail(matchValue_32)))) {
                        if (head(tail(tail(matchValue_32))) != null) {
                            if (isEmpty(tail(tail(tail(matchValue_32))))) {
                                if ((n_172 = (head(tail(tail(matchValue_32))) | 0), n_172 !== 1)) {
                                    matchResult_30 = 3;
                                    n_176 = head(tail(tail(matchValue_32)));
                                }
                                else {
                                    matchResult_30 = 4;
                                }
                            }
                            else {
                                matchResult_30 = 5;
                            }
                        }
                        else if (isEmpty(tail(tail(tail(matchValue_32))))) {
                            matchResult_30 = 4;
                        }
                        else {
                            matchResult_30 = 5;
                        }
                    }
                    else {
                        matchResult_30 = 5;
                    }
                }
                else {
                    matchResult_30 = 5;
                }
            }
            else {
                matchResult_30 = 5;
            }
            switch (matchResult_30) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_10)]);
                case 1:
                    return makeWidthInferErrorEqual(width_10, n_174, singleton(getConnectionIdForPort_1(0)));
                case 2:
                    return makeWidthInferErrorEqual(1, n_175, singleton(getConnectionIdForPort_1(1)));
                case 3:
                    return makeWidthInferErrorEqual(1, n_176, singleton(getConnectionIdForPort_1(2)));
                case 4:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_10)]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 36: {
            const width_11 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 2, comp);
            const matchValue_33 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1]));
            let matchResult_31, n_184, n_185, n_186;
            if (!isEmpty(matchValue_33)) {
                if (head(matchValue_33) != null) {
                    if (!isEmpty(tail(matchValue_33))) {
                        if (head(tail(matchValue_33)) != null) {
                            if (head(tail(matchValue_33)) === 1) {
                                if (isEmpty(tail(tail(matchValue_33)))) {
                                    if ((n_177 = (head(matchValue_33) | 0), n_177 === width_11)) {
                                        matchResult_31 = 0;
                                        n_184 = head(matchValue_33);
                                    }
                                    else if ((n_178 = (head(matchValue_33) | 0), n_178 !== width_11)) {
                                        matchResult_31 = 1;
                                        n_185 = head(matchValue_33);
                                    }
                                    else if ((n_179 = (head(tail(matchValue_33)) | 0), n_179 !== 1)) {
                                        matchResult_31 = 2;
                                        n_186 = head(tail(matchValue_33));
                                    }
                                    else {
                                        matchResult_31 = 3;
                                    }
                                }
                                else {
                                    matchResult_31 = 4;
                                }
                            }
                            else if (isEmpty(tail(tail(matchValue_33)))) {
                                if ((n_180 = (head(matchValue_33) | 0), n_180 !== width_11)) {
                                    matchResult_31 = 1;
                                    n_185 = head(matchValue_33);
                                }
                                else if ((n_181 = (head(tail(matchValue_33)) | 0), n_181 !== 1)) {
                                    matchResult_31 = 2;
                                    n_186 = head(tail(matchValue_33));
                                }
                                else {
                                    matchResult_31 = 3;
                                }
                            }
                            else {
                                matchResult_31 = 4;
                            }
                        }
                        else if (isEmpty(tail(tail(matchValue_33)))) {
                            if ((n_182 = (head(matchValue_33) | 0), n_182 !== width_11)) {
                                matchResult_31 = 1;
                                n_185 = head(matchValue_33);
                            }
                            else {
                                matchResult_31 = 3;
                            }
                        }
                        else {
                            matchResult_31 = 4;
                        }
                    }
                    else {
                        matchResult_31 = 4;
                    }
                }
                else if (!isEmpty(tail(matchValue_33))) {
                    if (head(tail(matchValue_33)) != null) {
                        if (isEmpty(tail(tail(matchValue_33)))) {
                            if ((n_183 = (head(tail(matchValue_33)) | 0), n_183 !== 1)) {
                                matchResult_31 = 2;
                                n_186 = head(tail(matchValue_33));
                            }
                            else {
                                matchResult_31 = 3;
                            }
                        }
                        else {
                            matchResult_31 = 4;
                        }
                    }
                    else if (isEmpty(tail(tail(matchValue_33)))) {
                        matchResult_31 = 3;
                    }
                    else {
                        matchResult_31 = 4;
                    }
                }
                else {
                    matchResult_31 = 4;
                }
            }
            else {
                matchResult_31 = 4;
            }
            switch (matchResult_31) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_11)]);
                case 1:
                    return makeWidthInferErrorEqual(width_11, n_185, singleton(getConnectionIdForPort_1(0)));
                case 2:
                    return makeWidthInferErrorEqual(1, n_186, singleton(getConnectionIdForPort_1(1)));
                case 3:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_11)]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 37: {
            const width_12 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const matchValue_34 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_32, n_188;
            if (!isEmpty(matchValue_34)) {
                if (head(matchValue_34) != null) {
                    if (head(matchValue_34) === 1) {
                        if (isEmpty(tail(matchValue_34))) {
                            matchResult_32 = 0;
                        }
                        else {
                            matchResult_32 = 3;
                        }
                    }
                    else if (isEmpty(tail(matchValue_34))) {
                        if ((n_187 = (head(matchValue_34) | 0), n_187 !== 1)) {
                            matchResult_32 = 1;
                            n_188 = head(matchValue_34);
                        }
                        else {
                            matchResult_32 = 2;
                        }
                    }
                    else {
                        matchResult_32 = 3;
                    }
                }
                else if (isEmpty(tail(matchValue_34))) {
                    matchResult_32 = 2;
                }
                else {
                    matchResult_32 = 3;
                }
            }
            else {
                matchResult_32 = 3;
            }
            switch (matchResult_32) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_12)]);
                case 1:
                    return makeWidthInferErrorEqual(1, n_188, singleton(getConnectionIdForPort_1(0)));
                case 2:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), width_12)]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        case 38: {
            const width_13 = matchValue.fields[0] | 0;
            assertInputsSize(inputConnectionsWidth, 0, comp);
            return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                Compare: compare,
            }), getOutputPortId(comp, 0), width_13)]);
        }
        case 39: {
            assertInputsSize(inputConnectionsWidth, 1, comp);
            const matchValue_35 = getWidthsForPorts(inputConnectionsWidth, singleton(0));
            let matchResult_33, aw_2, aw_3;
            if (!isEmpty(matchValue_35)) {
                if (head(matchValue_35) != null) {
                    if (isEmpty(tail(matchValue_35))) {
                        if ((aw = (head(matchValue_35) | 0), aw === mem.AddressWidth)) {
                            matchResult_33 = 1;
                            aw_2 = head(matchValue_35);
                        }
                        else if ((aw_1 = (head(matchValue_35) | 0), aw_1 !== mem.AddressWidth)) {
                            matchResult_33 = 2;
                            aw_3 = head(matchValue_35);
                        }
                        else {
                            matchResult_33 = 3;
                        }
                    }
                    else {
                        matchResult_33 = 3;
                    }
                }
                else if (isEmpty(tail(matchValue_35))) {
                    matchResult_33 = 0;
                }
                else {
                    matchResult_33 = 3;
                }
            }
            else {
                matchResult_33 = 3;
            }
            switch (matchResult_33) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), mem.WordWidth)]);
                case 1:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), mem.WordWidth)]);
                case 2:
                    return makeWidthInferErrorEqual(mem.AddressWidth, aw_3, singleton(getConnectionIdForPort_1(0)));
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
        default: {
            assertInputsSize(inputConnectionsWidth, 3, comp);
            const matchValue_36 = getWidthsForPorts(inputConnectionsWidth, ofArray([0, 1, 2]));
            let matchResult_34, addr_4, datain_4, write_5, addr_5, datain_5, write_6;
            if (!isEmpty(matchValue_36)) {
                if (head(matchValue_36) != null) {
                    if (!isEmpty(tail(matchValue_36))) {
                        if (head(tail(matchValue_36)) != null) {
                            if (!isEmpty(tail(tail(matchValue_36)))) {
                                if (head(tail(tail(matchValue_36))) != null) {
                                    if (isEmpty(tail(tail(tail(matchValue_36))))) {
                                        if ((write = (head(tail(tail(matchValue_36))) | 0), (datain = (head(tail(matchValue_36)) | 0), (addr = (head(matchValue_36) | 0), ((addr === mem_1.AddressWidth) && (datain === mem_1.WordWidth)) && (write === 1))))) {
                                            matchResult_34 = 0;
                                            addr_4 = head(matchValue_36);
                                            datain_4 = head(tail(matchValue_36));
                                            write_5 = head(tail(tail(matchValue_36)));
                                        }
                                        else if ((addr_1 = (head(matchValue_36) | 0), addr_1 !== mem_1.AddressWidth)) {
                                            matchResult_34 = 1;
                                            addr_5 = head(matchValue_36);
                                        }
                                        else if ((datain_1 = (head(tail(matchValue_36)) | 0), datain_1 !== mem_1.WordWidth)) {
                                            matchResult_34 = 2;
                                            datain_5 = head(tail(matchValue_36));
                                        }
                                        else if ((write_1 = (head(tail(tail(matchValue_36))) | 0), write_1 !== 1)) {
                                            matchResult_34 = 3;
                                            write_6 = head(tail(tail(matchValue_36)));
                                        }
                                        else {
                                            matchResult_34 = 4;
                                        }
                                    }
                                    else {
                                        matchResult_34 = 5;
                                    }
                                }
                                else if (isEmpty(tail(tail(tail(matchValue_36))))) {
                                    if ((addr_2 = (head(matchValue_36) | 0), addr_2 !== mem_1.AddressWidth)) {
                                        matchResult_34 = 1;
                                        addr_5 = head(matchValue_36);
                                    }
                                    else if ((datain_2 = (head(tail(matchValue_36)) | 0), datain_2 !== mem_1.WordWidth)) {
                                        matchResult_34 = 2;
                                        datain_5 = head(tail(matchValue_36));
                                    }
                                    else {
                                        matchResult_34 = 4;
                                    }
                                }
                                else {
                                    matchResult_34 = 5;
                                }
                            }
                            else {
                                matchResult_34 = 5;
                            }
                        }
                        else if (!isEmpty(tail(tail(matchValue_36)))) {
                            if (isEmpty(tail(tail(tail(matchValue_36))))) {
                                if ((addr_3 = (head(matchValue_36) | 0), addr_3 !== mem_1.AddressWidth)) {
                                    matchResult_34 = 1;
                                    addr_5 = head(matchValue_36);
                                }
                                else if (head(tail(tail(matchValue_36))) != null) {
                                    if ((write_2 = (head(tail(tail(matchValue_36))) | 0), write_2 !== 1)) {
                                        matchResult_34 = 3;
                                        write_6 = head(tail(tail(matchValue_36)));
                                    }
                                    else {
                                        matchResult_34 = 4;
                                    }
                                }
                                else {
                                    matchResult_34 = 4;
                                }
                            }
                            else {
                                matchResult_34 = 5;
                            }
                        }
                        else {
                            matchResult_34 = 5;
                        }
                    }
                    else {
                        matchResult_34 = 5;
                    }
                }
                else if (!isEmpty(tail(matchValue_36))) {
                    if (head(tail(matchValue_36)) != null) {
                        if (!isEmpty(tail(tail(matchValue_36)))) {
                            if (isEmpty(tail(tail(tail(matchValue_36))))) {
                                if ((datain_3 = (head(tail(matchValue_36)) | 0), datain_3 !== mem_1.WordWidth)) {
                                    matchResult_34 = 2;
                                    datain_5 = head(tail(matchValue_36));
                                }
                                else if (head(tail(tail(matchValue_36))) != null) {
                                    if ((write_3 = (head(tail(tail(matchValue_36))) | 0), write_3 !== 1)) {
                                        matchResult_34 = 3;
                                        write_6 = head(tail(tail(matchValue_36)));
                                    }
                                    else {
                                        matchResult_34 = 4;
                                    }
                                }
                                else {
                                    matchResult_34 = 4;
                                }
                            }
                            else {
                                matchResult_34 = 5;
                            }
                        }
                        else {
                            matchResult_34 = 5;
                        }
                    }
                    else if (!isEmpty(tail(tail(matchValue_36)))) {
                        if (head(tail(tail(matchValue_36))) != null) {
                            if (isEmpty(tail(tail(tail(matchValue_36))))) {
                                if ((write_4 = (head(tail(tail(matchValue_36))) | 0), write_4 !== 1)) {
                                    matchResult_34 = 3;
                                    write_6 = head(tail(tail(matchValue_36)));
                                }
                                else {
                                    matchResult_34 = 4;
                                }
                            }
                            else {
                                matchResult_34 = 5;
                            }
                        }
                        else if (isEmpty(tail(tail(tail(matchValue_36))))) {
                            matchResult_34 = 4;
                        }
                        else {
                            matchResult_34 = 5;
                        }
                    }
                    else {
                        matchResult_34 = 5;
                    }
                }
                else {
                    matchResult_34 = 5;
                }
            }
            else {
                matchResult_34 = 5;
            }
            switch (matchResult_34) {
                case 0:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), mem_1.WordWidth)]);
                case 1:
                    return makeWidthInferErrorEqual(mem_1.AddressWidth, addr_5, singleton(getConnectionIdForPort_1(0)));
                case 2:
                    return makeWidthInferErrorEqual(mem_1.WordWidth, datain_5, singleton(getConnectionIdForPort_1(1)));
                case 3:
                    return makeWidthInferErrorEqual(1, write_6, singleton(getConnectionIdForPort_1(2)));
                case 4:
                    return new FSharpResult$2(0, [FSharpMap__Add(empty_1({
                        Compare: compare,
                    }), getOutputPortId(comp, 0), mem_1.WordWidth)]);
                default:
                    return toFail(printf("what? Impossible case in calculateOutputPortsWidth for: %A"))(comp.Type);
            }
        }
    }
}

function findConnectionToInputPort(inputPortIdsToConnectionIds, portId) {
    return FSharpMap__TryFind(inputPortIdsToConnectionIds, portId);
}

function findConnectionsFromOutputPort(outputPortIdsToConnections, portId) {
    return FSharpMap__TryFind(outputPortIdsToConnections, portId);
}

/**
 * Lookup the width of a connection in the connectionsWidth map or fail.
 */
export function getConnectionWidth(connectionsWidth, connId) {
    const matchValue = FSharpMap__TryFind(connectionsWidth, connId);
    if (matchValue != null) {
        const width = value_1(matchValue);
        return width;
    }
    else {
        return toFail(printf("what? getConnectionWidth received inexistent connectionId: %A"))(connId);
    }
}

function getInputPortsConnectionsWidth(connectionsWidth, currNode, inputPortIdsToConnectionIds) {
    return ofList_1(map_3((inputPort) => {
        const _arg = findConnectionToInputPort(inputPortIdsToConnectionIds, inputPort.Id);
        if (_arg == null) {
            return [extractComponentPortNumber(inputPort), void 0];
        }
        else {
            const connId = _arg;
            return [extractComponentPortNumber(inputPort), [getConnectionWidth(connectionsWidth, connId), connId]];
        }
    }, currNode.InputPorts), {
        Compare: compare,
    });
}

function setConnectionWidth(connectionId, connectionWidth, connectionsWidth) {
    return FSharpMap__Add(connectionsWidth, connectionId, connectionWidth);
}

function setConnectionsWidth(connections, connWidth, connectionsWidth) {
    return fold((res, conn) => Result_Bind((tupledArg) => {
        let oldWidth, oldWidth_1;
        const connectionsWidth_1 = tupledArg[0];
        const connectionsToReturn = tupledArg[1];
        const connId = conn.Id;
        const matchValue = getConnectionWidth(connectionsWidth_1, connId);
        if (matchValue != null) {
            if ((oldWidth = (matchValue | 0), oldWidth === connWidth)) {
                const oldWidth_2 = matchValue | 0;
                return new FSharpResult$2(0, [[connectionsWidth_1, connectionsToReturn]]);
            }
            else if ((oldWidth_1 = (matchValue | 0), oldWidth_1 !== connWidth)) {
                const oldWidth_3 = matchValue | 0;
                return new FSharpResult$2(1, [new WidthInferError(toText(printf("Wire has been inferred to have two different widths: %d and %d. This is probably due to an error such as a combinatorial loop."))(oldWidth_3)(connWidth), singleton(connId))]);
            }
            else {
                return toFail(printf("what? Impossible case in setConnectionsWidth."));
            }
        }
        else {
            return new FSharpResult$2(0, [[setConnectionWidth(connId, connWidth, connectionsWidth_1), cons(conn, connectionsToReturn)]]);
        }
    }, res), new FSharpResult$2(0, [[connectionsWidth, empty()]]), connections);
}

function getComponentFromId(compId, compIdsToComps) {
    const matchValue = FSharpMap__TryFind(compIdsToComps, compId);
    if (matchValue != null) {
        const comp = matchValue;
        return comp;
    }
    else {
        return toFail(printf("what? getComponentFromId called with invalid componentId: %A"))(compId);
    }
}

function infer(staticMaps_, staticMaps__1, staticMaps__2, staticMaps__3, currNode, connectionsWidth) {
    const staticMaps = [staticMaps_, staticMaps__1, staticMaps__2, staticMaps__3];
    const staticMaps_1 = staticMaps;
    const outputPortsOfBusLabels = staticMaps_1[3];
    const outputPortIdsToConnections = staticMaps_1[1];
    const inputPortIdsToConnectionIds = staticMaps_1[0];
    const compIdsToComps = staticMaps_1[2];
    const iterateChildren = (outgoingConnections, connectionsWidth_1) => {
        const children = map_3((conn) => getComponentFromId(conn.Target.HostId, compIdsToComps), outgoingConnections);
        return fold((connectionsWidthRes, child) => Result_Bind((connectionsWidth_2) => infer(staticMaps_1[0], staticMaps_1[1], staticMaps_1[2], staticMaps_1[3], child, connectionsWidth_2), connectionsWidthRes), new FSharpResult$2(0, [connectionsWidth_1]), children);
    };
    return Result_Bind((outputPortsWidths) => fold_1((connectionsWidthRes_1, outPortId, connWidth) => Result_Bind((connectionsWidth_3) => {
        const matchValue = findConnectionsFromOutputPort(outputPortIdsToConnections, outPortId);
        if (matchValue != null) {
            const outgoingConnections_1 = matchValue;
            return Result_Bind((tupledArg) => {
                const connectionsWidth_4 = tupledArg[0];
                const updatedConnections = tupledArg[1];
                return iterateChildren(updatedConnections, connectionsWidth_4);
            }, setConnectionsWidth(outgoingConnections_1, connWidth, connectionsWidth_3));
        }
        else {
            return new FSharpResult$2(0, [connectionsWidth_3]);
        }
    }, connectionsWidthRes_1), new FSharpResult$2(0, [connectionsWidth]), outputPortsWidths), calculateOutputPortsWidth(currNode, outputPortsOfBusLabels, getInputPortsConnectionsWidth(connectionsWidth, currNode, inputPortIdsToConnectionIds)));
}

function initialiseConnectionsWidth(connections) {
    return ofList_1(map_3((conn) => [conn.Id, void 0], connections), {
        Compare: compare,
    });
}

function getAllInputNodes(components) {
    return filter((comp) => {
        if (comp.Type.tag === 0) {
            return true;
        }
        else {
            return false;
        }
    }, components);
}

function mapInputPortIdsToConnectionIds(connections) {
    return fold((mapRes, conn) => Result_Bind((map) => {
        const inputPortId = conn.Target.Id;
        const connId = conn.Id;
        const matchValue = FSharpMap__TryFind(map, inputPortId);
        if (matchValue != null) {
            const otherConnId = matchValue;
            return new FSharpResult$2(1, [new WidthInferError("A wire must have precisely one driving component. If you want to merge two wires together, use a MergeWires component.", ofArray([connId, otherConnId]))]);
        }
        else {
            return new FSharpResult$2(0, [FSharpMap__Add(map, inputPortId, connId)]);
        }
    }, mapRes), new FSharpResult$2(0, [empty_1({
        Compare: compare,
    })]), connections);
}

function mapComponentIdsToComponents(components) {
    return ofList_1(map_3((comp) => [comp.Id, comp], components), {
        Compare: compare,
    });
}

function mapOutputPortIdsToConnections(connections) {
    return ofList_1(List_groupBy((conn) => conn.Source.Id, connections, {
        Equals: equals,
        GetHashCode: safeHash,
    }), {
        Compare: compare,
    });
}

function mapInputPortIdsToVirtualConnectionIds(conns, comps) {
    const mapPortIdToConnId = mapInputPortIdsToConnectionIds(conns);
    const filteredComps = filter((comp) => equals(comp.Type, new ComponentType(3, [])), comps);
    const targetPortIdToConId = ofList_1(map_3((conn) => [conn.Target.Id, conn.Id], conns), {
        Compare: compare,
    });
    const getBusLabelConns = (compLst) => collect((comp_1) => {
        const _arg = tryFind_1(item(0, comp_1.InputPorts).Id, targetPortIdToConId);
        if (_arg != null) {
            const cId = _arg;
            return singleton(cId);
        }
        else {
            return empty();
        }
    }, compLst);
    const mapLabels = Result_Map((arg_3) => ofList_1(concat(arg_3), {
        Compare: compare,
    }), tryFindError(map_3((tupledArg) => {
        let arg_2, h, h_1;
        const lab = tupledArg[0];
        const compLst_1 = tupledArg[1];
        const matchValue = getBusLabelConns(compLst_1);
        let matchResult, cId_1, h_2;
        if (!isEmpty(matchValue)) {
            if (isEmpty(tail(matchValue))) {
                matchResult = 0;
                cId_1 = head(matchValue);
            }
            else if ((h = matchValue, length(h) !== 1)) {
                matchResult = 1;
                h_2 = matchValue;
            }
            else {
                matchResult = 2;
            }
        }
        else if ((h_1 = matchValue, length(h_1) !== 1)) {
            matchResult = 1;
            h_2 = matchValue;
        }
        else {
            matchResult = 2;
        }
        switch (matchResult) {
            case 0:
                return new FSharpResult$2(0, [map_3((comp_3) => [item(0, comp_3.InputPorts).Id, cId_1], compLst_1)]);
            case 1:
                return new FSharpResult$2(1, [new WidthInferError((arg_2 = (length(h_2) | 0), toText(printf("A wire label must have exactly one driving component but the label \'%s\' has %d"))(lab)(arg_2)), h_2)]);
            default:
                return new FSharpResult$2(0, [empty()]);
        }
    }, List_groupBy((comp_2) => comp_2.Label, filteredComps, {
        Equals: (x_1, y_1) => (x_1 === y_1),
        GetHashCode: stringHash,
    }))));
    let matchResult_1, e, map, mapL;
    const copyOfStruct = mapPortIdToConnId;
    if (copyOfStruct.tag === 0) {
        const copyOfStruct_1 = mapLabels;
        if (copyOfStruct_1.tag === 0) {
            matchResult_1 = 1;
            map = copyOfStruct.fields[0];
            mapL = copyOfStruct_1.fields[0];
        }
        else {
            matchResult_1 = 0;
            e = copyOfStruct_1.fields[0];
        }
    }
    else {
        matchResult_1 = 0;
        e = copyOfStruct.fields[0];
    }
    switch (matchResult_1) {
        case 0:
            return new FSharpResult$2(1, [e]);
        default:
            return new FSharpResult$2(0, [ofList_1(collect((pId) => {
                const matchValue_2 = tryFind_1(pId, map);
                const matchValue_3 = tryFind_1(pId, mapL);
                let matchResult_2, conn_1;
                if (matchValue_2 != null) {
                    if (matchValue_3 == null) {
                        matchResult_2 = 1;
                        conn_1 = matchValue_2;
                    }
                    else {
                        matchResult_2 = 1;
                        conn_1 = matchValue_3;
                    }
                }
                else if (matchValue_3 != null) {
                    matchResult_2 = 1;
                    conn_1 = matchValue_3;
                }
                else {
                    matchResult_2 = 0;
                }
                switch (matchResult_2) {
                    case 0:
                        return empty();
                    default:
                        return singleton([pId, conn_1]);
                }
            }, map_3((p) => p.Id, collect((comp_4) => comp_4.InputPorts, comps))), {
                Compare: compare,
            })]);
    }
}

/**
 * Return Inferred width of all connections or an error.
 * Width inference is done without mutable state.
 * It is to be run when component widths or circuit is changed,
 * Note that it does not matter (except for performance) if it is run too many times.
 */
export function inferConnectionsWidth(_arg1_, _arg1__1) {
    let matchValue, inputPortIdsToVirtualConnectionIds$0027, staticMapComponentIdsToComponents, staticMaps, e;
    const _arg = [_arg1_, _arg1__1];
    const conns = _arg[1];
    const comps = _arg[0];
    const start = getTimeMs();
    const connectionsWidth = initialiseConnectionsWidth(conns);
    return instrumentInterval("widthInference", start, (matchValue = mapInputPortIdsToVirtualConnectionIds(conns, comps), (matchValue.tag === 0) ? ((inputPortIdsToVirtualConnectionIds$0027 = matchValue.fields[0], (staticMapComponentIdsToComponents = mapComponentIdsToComponents(comps), (staticMaps = [inputPortIdsToVirtualConnectionIds$0027, mapOutputPortIdsToConnections(conns), staticMapComponentIdsToComponents, makeOutputPortsOfLabels(comps)], fold((connectionsWidthRes, inputNode) => Result_Bind((connectionsWidth_1) => infer(staticMaps[0], staticMaps[1], staticMaps[2], staticMaps[3], inputNode, connectionsWidth_1), connectionsWidthRes), new FSharpResult$2(0, [connectionsWidth]), comps))))) : ((e = matchValue.fields[0], new FSharpResult$2(1, [e])))));
}

//# sourceMappingURL=WidthInferer.fs.js.map
