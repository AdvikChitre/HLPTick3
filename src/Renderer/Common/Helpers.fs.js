import { Record, seqToString, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { loadedComponents_, LoadedComponent, Connection, Port, Component, portOrder_, portOrientation_, NLSource, NLTarget, NetListComponent, convertToJSONComponent, componentIdDecoder, componentIdEncoder, legacyTypesConvert, SavedWaveInfo_$reflection, LegacyCanvas_LegacyConnection_$reflection, LegacyCanvas_LegacyComponent_$reflection, SheetInfo_$reflection, Connection_$reflection, JSONComponent_Component_$reflection } from "./CommonTypes.fs.js";
import { record_type, string_type, int32_type, obj_type, union_type, class_type, option_type, tuple_type, list_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { now, minValue } from "../fable_modules/fable-library.4.1.4/Date.js";
import { newGuid } from "../fable_modules/fable-library.4.1.4/Guid.js";
import { map as map_2, toList as toList_1, empty as empty_2, FSharpMap__get_Item, ofList, tryFind as tryFind_1, add } from "../fable_modules/fable-library.4.1.4/Map.js";
import { toString, Auto_generateBoxedEncoder_437914C6, bigint, uint64, int64 } from "../fable_modules/Thoth.Json.7.0.0/./Encode.fs.js";
import { bigint as bigint_1, uint64 as uint64_1, int64 as int64_1 } from "../fable_modules/Thoth.Json.7.0.0/./Decode.fs.js";
import { empty } from "../fable_modules/Thoth.Json.7.0.0/Extra.fs.js";
import { ExtraCoders } from "../fable_modules/Thoth.Json.7.0.0/Types.fs.js";
import { item as item_1, updateAt, findIndex, iterate, tail, head, isEmpty, ofArray, fold, cons, find, empty as empty_1, singleton, append, splitAt, tryFind, map } from "../fable_modules/fable-library.4.1.4/List.js";
import { toFail, join, toText, replace as replace_1, printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { replace } from "../fable_modules/fable-library.4.1.4/RegExp.js";
import { createTypeInfo } from "../fable_modules/Fable.SimpleJson.3.24.0/./TypeInfo.Converter.fs.js";
import { Convert_fromJson, Convert_serialize } from "../fable_modules/Fable.SimpleJson.3.24.0/./Json.Converter.fs.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { SimpleJson_tryParse } from "../fable_modules/Fable.SimpleJson.3.24.0/./SimpleJson.fs.js";
import { map as map_3, defaultArg, value as value_7, some } from "../fable_modules/fable-library.4.1.4/Option.js";
import { comparePrimitives, curry3, compare, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { toList, truncate, map as map_1 } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { op_LeftShift, toInt64 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { mapIndexed } from "../fable_modules/fable-library.4.1.4/Array.js";
import { max } from "../fable_modules/fable-library.4.1.4/Double.js";
import { Optic_Map, Optic_Map_op_HatPercent_Z1462312A } from "./Optics.fs.js";

export class JsonHelpers_SavedCanvasUnknownWaveInfo$1 extends Union {
    constructor(Item1, Item2, Item3, Item4) {
        super();
        this.tag = 0;
        this.fields = [Item1, Item2, Item3, Item4];
    }
    cases() {
        return ["NewCanvasWithFileWaveSheetInfoAndNewConns"];
    }
}

export function JsonHelpers_SavedCanvasUnknownWaveInfo$1_$reflection(gen0) {
    return union_type("Helpers.JsonHelpers.SavedCanvasUnknownWaveInfo`1", [gen0], JsonHelpers_SavedCanvasUnknownWaveInfo$1, () => [[["Item1", tuple_type(list_type(JSONComponent_Component_$reflection()), list_type(Connection_$reflection()))], ["Item2", option_type(gen0)], ["Item3", option_type(SheetInfo_$reflection())], ["Item4", class_type("System.DateTime")]]]);
}

export class JsonHelpers_SavedInfo extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["CanvasOnly", "CanvasWithFileWaveInfo", "CanvasWithFileWaveInfoAndNewConns", "NewCanvasWithFileWaveInfoAndNewConns", "NewCanvasWithFileWaveSheetInfoAndNewConns"];
    }
}

export function JsonHelpers_SavedInfo_$reflection() {
    return union_type("Helpers.JsonHelpers.SavedInfo", [], JsonHelpers_SavedInfo, () => [[["Item", tuple_type(list_type(LegacyCanvas_LegacyComponent_$reflection()), list_type(LegacyCanvas_LegacyConnection_$reflection()))]], [["Item1", tuple_type(list_type(LegacyCanvas_LegacyComponent_$reflection()), list_type(LegacyCanvas_LegacyConnection_$reflection()))], ["Item2", option_type(SavedWaveInfo_$reflection())], ["Item3", class_type("System.DateTime")]], [["Item1", tuple_type(list_type(LegacyCanvas_LegacyComponent_$reflection()), list_type(LegacyCanvas_LegacyConnection_$reflection()))], ["Item2", option_type(SavedWaveInfo_$reflection())], ["Item3", class_type("System.DateTime")]], [["Item1", tuple_type(list_type(JSONComponent_Component_$reflection()), list_type(Connection_$reflection()))], ["Item2", option_type(SavedWaveInfo_$reflection())], ["Item3", class_type("System.DateTime")]], [["Item1", tuple_type(list_type(JSONComponent_Component_$reflection()), list_type(Connection_$reflection()))], ["Item2", option_type(SavedWaveInfo_$reflection())], ["Item3", option_type(SheetInfo_$reflection())], ["Item4", class_type("System.DateTime")]]]);
}

export function JsonHelpers_SavedInfo__get_getCanvas(self) {
    switch (self.tag) {
        case 1: {
            const c_1 = self.fields[0];
            return legacyTypesConvert(c_1[0], c_1[1]);
        }
        case 2: {
            const c_2 = self.fields[0];
            return legacyTypesConvert(c_2[0], c_2[1]);
        }
        case 3: {
            const c_3 = self.fields[0];
            return c_3;
        }
        case 4: {
            const c_4 = self.fields[0];
            return c_4;
        }
        default: {
            const c = self.fields[0];
            return legacyTypesConvert(c[0], c[1]);
        }
    }
}

export function JsonHelpers_SavedInfo__get_getTimeStamp(self) {
    switch (self.tag) {
        case 1: {
            const ts = self.fields[2];
            return ts;
        }
        case 2: {
            const ts_1 = self.fields[2];
            return ts_1;
        }
        case 3: {
            const ts_2 = self.fields[2];
            return ts_2;
        }
        case 4: {
            const ts_3 = self.fields[3];
            return ts_3;
        }
        default:
            return minValue();
    }
}

export function JsonHelpers_SavedInfo__get_getWaveInfo(self) {
    switch (self.tag) {
        case 1: {
            const waveInfo = self.fields[1];
            return waveInfo;
        }
        case 2: {
            const waveInfo_1 = self.fields[1];
            return waveInfo_1;
        }
        case 3: {
            const waveInfo_2 = self.fields[1];
            return waveInfo_2;
        }
        case 4: {
            const waveInfo_3 = self.fields[1];
            return waveInfo_3;
        }
        default:
            return void 0;
    }
}

export function JsonHelpers_SavedInfo__get_getSheetInfo(self) {
    switch (self.tag) {
        case 1: {
            const waveInfo = self.fields[1];
            return void 0;
        }
        case 2: {
            const waveInfo_1 = self.fields[1];
            return void 0;
        }
        case 3: {
            const ts = self.fields[2];
            return void 0;
        }
        case 4: {
            const sheetInfo = self.fields[2];
            return sheetInfo;
        }
        default:
            return void 0;
    }
}

export const JsonHelpers_extraCoder = (() => {
    let copyOfStruct, copyOfStruct_1, copyOfStruct_2, copyOfStruct_3;
    let extra_9;
    let extra_6;
    const extra_3 = new ExtraCoders((copyOfStruct = newGuid(), copyOfStruct), add("System.Int64", [int64, int64_1], empty.Coders));
    extra_6 = (new ExtraCoders((copyOfStruct_1 = newGuid(), copyOfStruct_1), add("System.UInt64", [uint64, uint64_1], extra_3.Coders)));
    extra_9 = (new ExtraCoders((copyOfStruct_2 = newGuid(), copyOfStruct_2), add("System.Numerics.BigInteger", [bigint, (path) => ((value_1_1) => bigint_1(path, value_1_1))], extra_6.Coders)));
    return new ExtraCoders((copyOfStruct_3 = newGuid(), copyOfStruct_3), add("CommonTypes.ComponentId", [componentIdEncoder, componentIdDecoder], extra_9.Coders));
})();

/**
 * converts Component to JSONComponent.Component for saving as JSON.
 * this conversion does not affect the JSON generated.
 */
export function JsonHelpers_convStateToJC(compL, connL) {
    return [map(convertToJSONComponent, compL), connL];
}

export function JsonHelpers_stateToJsonString(cState, waveInfo, sheetInfo) {
    let value, typeInfo;
    const time = now();
    try {
        return replace((value = (new JsonHelpers_SavedInfo(4, [JsonHelpers_convStateToJC(cState[0], cState[1]), waveInfo, sheetInfo, time])), (typeInfo = createTypeInfo(JsonHelpers_SavedInfo_$reflection()), Convert_serialize(value, typeInfo))), "(\\d+\\.\\d\\d)\\d+", "$1");
    }
    catch (e) {
        toConsole(printf("HELP: exception in SimpleJson.stringify %A"))(e);
        return "Error in stringify";
    }
}

export function JsonHelpers_stateToJsonStringNew(cState, waveInfo, sheetInfo) {
    const time = now();
    try {
        const value = new JsonHelpers_SavedInfo(4, [JsonHelpers_convStateToJC(cState[0], cState[1]), waveInfo, sheetInfo, time]);
        const encoder = Auto_generateBoxedEncoder_437914C6(JsonHelpers_SavedInfo_$reflection(), void 0, JsonHelpers_extraCoder, void 0);
        return toString(0, encoder(value));
    }
    catch (e) {
        toConsole(printf("HELP: exception in Thoth.Json.Encode.Auto.toString %A"))(e);
        return "Error in stringify";
    }
}

export function JsonHelpers_jsonStringToState(jsonString) {
    let matchValue, inputJson, typeInfo, matchValue_1, inputJson_1, typeInfo_1, matchValue_3, inputJson_2, typeInfo_2;
    let _arg;
    try {
        _arg = (new FSharpResult$2(0, [(matchValue = SimpleJson_tryParse(jsonString), (matchValue != null) ? ((inputJson = matchValue, (typeInfo = createTypeInfo(tuple_type(list_type(LegacyCanvas_LegacyComponent_$reflection()), list_type(LegacyCanvas_LegacyConnection_$reflection()))), Convert_fromJson(inputJson, typeInfo)))) : (() => {
            throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
        })())]));
    }
    catch (ex) {
        _arg = (new FSharpResult$2(1, [ex.message]));
    }
    if (_arg.tag === 1) {
        let matchValue_2;
        try {
            matchValue_2 = (new FSharpResult$2(0, [(matchValue_1 = SimpleJson_tryParse(jsonString), (matchValue_1 != null) ? ((inputJson_1 = matchValue_1, (typeInfo_1 = createTypeInfo(JsonHelpers_SavedInfo_$reflection()), Convert_fromJson(inputJson_1, typeInfo_1)))) : (() => {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            })())]));
        }
        catch (ex_1) {
            matchValue_2 = (new FSharpResult$2(1, [ex_1.message]));
        }
        if (matchValue_2.tag === 1) {
            const str = matchValue_2.fields[0];
            let matchValue_4;
            try {
                matchValue_4 = (new FSharpResult$2(0, [(matchValue_3 = SimpleJson_tryParse(jsonString), (matchValue_3 != null) ? ((inputJson_2 = matchValue_3, (typeInfo_2 = createTypeInfo(JsonHelpers_SavedCanvasUnknownWaveInfo$1_$reflection(obj_type)), Convert_fromJson(inputJson_2, typeInfo_2)))) : (() => {
                    throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
                })())]));
            }
            catch (ex_2) {
                matchValue_4 = (new FSharpResult$2(1, [ex_2.message]));
            }
            if (matchValue_4.tag === 1) {
                const str_1 = matchValue_4.fields[0];
                toConsole(printf("Error in Json parse of %s : %s"))(jsonString)(str_1);
                return new FSharpResult$2(1, [str_1]);
            }
            else {
                const time = matchValue_4.fields[0].fields[3];
                const sheetInfo = matchValue_4.fields[0].fields[2];
                const cState = matchValue_4.fields[0].fields[0];
                return new FSharpResult$2(0, [new JsonHelpers_SavedInfo(4, [cState, void 0, sheetInfo, time])]);
            }
        }
        else {
            const state_1 = matchValue_2.fields[0];
            return new FSharpResult$2(0, [state_1]);
        }
    }
    else {
        const state = _arg.fields[0];
        return new FSharpResult$2(0, [new JsonHelpers_SavedInfo(0, [state])]);
    }
}

/**
 * Return a memoized version of funcToMemoize where.
 * Repeated calls with equivalent inputs return a stored result.
 * Inputs a, a' are deemed equivalent if keyFunc a = keyFunc a'.
 * Use this as well as LazyView etc, it has a different usage since it need not
 * have React output and comparison is via a key function.
 */
export function memoizeBy(keyFunc, funcToMemoize) {
    let lastKey = void 0;
    let lastValue = void 0;
    return (a) => {
        const newKey = some(keyFunc(a));
        if (equals(newKey, lastKey)) {
            return value_7(lastValue);
        }
        else {
            lastKey = newKey;
            const v = funcToMemoize(a);
            lastValue = some(v);
            return v;
        }
    };
}

/**
 * replace new lines in a string by ';' for easier debug printing of records using %A
 */
export function nocr(s) {
    return replace_1(s, "\n", ";");
}

export function shortPComp(comp) {
    const matchValue = comp.Type;
    if (matchValue.tag === 26) {
        const sc = matchValue.fields[0];
        return toText(printf("%s:Custom.%s.%A->%A"))(comp.Label)(sc.Name)(sc.InputLabels)(sc.OutputLabels);
    }
    else {
        return toText(printf("%s:%A"))(comp.Label)(comp.Type);
    }
}

/**
 * return initial n characters of a string
 */
export function sprintInitial(n, s) {
    return join("", map_1((value) => value, truncate(n, s.split(""))));
}

export function assertThat(cond, msg) {
    if (!cond) {
        toFail(printf("what? assert failed: %s"))(msg);
    }
}

/**
 * Return the first error found in a list of results, or the list of Oks if
 * there are none.
 */
export function tryFindError(lst) {
    const isError = (el) => {
        if (el.tag === 0) {
            return false;
        }
        else {
            return true;
        }
    };
    const extractOk = (el_1) => {
        if (el_1.tag === 1) {
            throw new Error("what? Impossible case in tryFindError");
        }
        else {
            const ok = el_1.fields[0];
            return ok;
        }
    };
    const matchValue = tryFind(isError, lst);
    if (matchValue == null) {
        return new FSharpResult$2(0, [map(extractOk, lst)]);
    }
    else {
        const copyOfStruct = matchValue;
        if (copyOfStruct.tag === 1) {
            const err = copyOfStruct.fields[0];
            return new FSharpResult$2(1, [err]);
        }
        else {
            throw new Error("what? Impossible case in tryFindError");
        }
    }
}

/**
 * Return 2^exponent.
 */
export function pow2(exponent) {
    return 1 << exponent;
}

/**
 * Return 2^exponent, packed into an int64.
 */
export function pow2int64(exponent) {
    return toInt64(op_LeftShift(1n, exponent));
}

/**
 * Set an element of the list at the specified position.
 * This function is slow: O(n). Do not use unless necessary.
 */
export function listSet(lst, item, idx) {
    const patternInput = splitAt(idx, lst);
    const p2 = patternInput[1];
    const p1 = patternInput[0];
    const p2_1 = splitAt(1, p2)[1];
    return append(p1, append(singleton(item), p2_1));
}

/**
 * Crop a string to the specified length.
 * fromStart indicates whether you want the first <len> characters or the last
 * <len> characters.
 */
export function cropToLength(len, fromStart, str) {
    const matchValue = str.length <= len;
    if (matchValue) {
        return str;
    }
    else if (fromStart) {
        return str.slice(void 0, (len - 1) + 1) + "...";
    }
    else {
        return "..." + str.slice(str.length - len, str.length);
    }
}

export function getMemData(address, memData) {
    return defaultArg(tryFind_1(address, memData.Data), 0n);
}

/**
 * Returns a new array with the elements at index i1 and index i2 swapped
 */
export function swapArrayEls(i1, i2, arr) {
    return mapIndexed((i, x) => {
        if (i === i1) {
            return arr[i2];
        }
        else if (i === i2) {
            return arr[i1];
        }
        else {
            return x;
        }
    }, arr);
}

export function getNetList(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const conns = _arg[1];
    const comps = _arg[0];
    const id2X = (f) => ofList(map(f, comps), {
        Compare: compare,
    });
    const id2Outs = id2X((c) => [c.Id, c.OutputPorts]);
    const id2Ins = id2X((c_1) => [c_1.Id, c_1.InputPorts]);
    const id2Comp = id2X((c_2) => [c_2.Id, c_2]);
    const getPortInts = (sel, initV, ports) => ofList(map((port) => {
        const matchValue = port.PortNumber;
        if (matchValue != null) {
            const pn = matchValue | 0;
            return [sel(pn), initV];
        }
        else {
            return toFail(printf("Missing port in list %A"))(ports);
        }
    }, ports), {
        Compare: compare,
    });
    const initNets = ofList(map((comp_1) => [comp_1.NLId, comp_1], map((comp) => (new NetListComponent(comp.Id, comp.Type, comp.Label, getPortInts((arg_1) => arg_1, void 0, comp.InputPorts), getPortInts((arg_2) => arg_2, empty_1(), comp.OutputPorts))), comps)), {
        Compare: compare,
    });
    const getOutputPortNumber = (p) => {
        const p_1 = find((p1) => (p1.Id === p.Id), FSharpMap__get_Item(id2Outs, p.HostId));
        const matchValue_1 = p_1.PortNumber;
        if (matchValue_1 == null) {
            return toFail(printf("Missing input port number on %A"))(p_1.HostId) | 0;
        }
        else {
            const n = matchValue_1 | 0;
            return n | 0;
        }
    };
    const getInputPortNumber = (p_2) => {
        const p_3 = find((p1_1) => (p1_1.Id === p_2.Id), FSharpMap__get_Item(id2Ins, p_2.HostId));
        const matchValue_2 = p_3.PortNumber;
        if (matchValue_2 == null) {
            return toFail(printf("Missing input port number on %A"))(p_3.HostId) | 0;
        }
        else {
            const n_1 = matchValue_2 | 0;
            return n_1 | 0;
        }
    };
    const updateNComp = (compId, updateFn, nets) => add(compId, updateFn(FSharpMap__get_Item(nets, compId)), nets);
    const updateInputPorts = (pNum, src, comp_2) => (new NetListComponent(comp_2.NLId, comp_2.Type, comp_2.NLLabel, add(pNum, src, comp_2.NLInputs), comp_2.NLOutputs));
    const updateInputsComp = (compId_1, pNum_1, src_1, nets_1) => {
        const uFn = curry3(updateInputPorts)(pNum_1)(src_1);
        return updateNComp(compId_1, uFn, nets_1);
    };
    const updateOutputPorts = (pNum_2, tgt, comp_3) => (new NetListComponent(comp_3.NLId, comp_3.Type, comp_3.NLLabel, comp_3.NLInputs, add(pNum_2, cons(tgt, FSharpMap__get_Item(comp_3.NLOutputs, pNum_2)), comp_3.NLOutputs)));
    const updateOutputsComp = (compId_2, pNum_3, tgt_1, nets_2) => {
        const uFn_1 = curry3(updateOutputPorts)(pNum_3)(tgt_1);
        return updateNComp(compId_2, uFn_1, nets_2);
    };
    const target = (conn) => (new NLTarget(conn.Target.HostId, getInputPortNumber(conn.Target), conn.Id));
    const source = (conn_1) => (new NLSource(conn_1.Source.HostId, getOutputPortNumber(conn_1.Source), conn_1.Id));
    const addConnectionsToNets = (nets_3, conn_2) => {
        const tgt_2 = target(conn_2);
        const src_2 = source(conn_2);
        const tComp = FSharpMap__get_Item(id2Comp, tgt_2.TargetCompId);
        const sComp = FSharpMap__get_Item(id2Comp, src_2.SourceCompId);
        return updateInputsComp(tComp.Id, tgt_2.TargetInputPort, src_2, updateOutputsComp(sComp.Id, src_2.TargetOutputPort, tgt_2, nets_3));
    };
    return fold(addConnectionsToNets, initNets, conns);
}

export function testMatch(diffX, diffY, normRot) {
    const s = 1;
    const lengthList = () => {
        let matchResult;
        switch (normRot) {
            case 0: {
                if (diffX >= 0) {
                    matchResult = 0;
                }
                else if (diffX < 0) {
                    matchResult = 1;
                }
                else {
                    matchResult = 12;
                }
                break;
            }
            case 90: {
                if ((diffX >= 0) && (diffY >= 0)) {
                    matchResult = 4;
                }
                else if ((diffX >= 0) && (diffY < 0)) {
                    matchResult = 5;
                }
                else if ((diffX < 0) && (diffY >= 0)) {
                    matchResult = 6;
                }
                else if ((diffX < 0) && (diffY < 0)) {
                    matchResult = 7;
                }
                else {
                    matchResult = 12;
                }
                break;
            }
            case 180: {
                if (diffX >= 0) {
                    matchResult = 2;
                }
                else if (diffX < 0) {
                    matchResult = 3;
                }
                else {
                    matchResult = 12;
                }
                break;
            }
            case 270: {
                if ((diffX >= 0) && (diffY >= 0)) {
                    matchResult = 8;
                }
                else if ((diffX >= 0) && (diffY < 0)) {
                    matchResult = 9;
                }
                else if ((diffX < 0) && (diffY >= 0)) {
                    matchResult = 10;
                }
                else if ((diffX < 0) && (diffY < 0)) {
                    matchResult = 11;
                }
                else {
                    matchResult = 12;
                }
                break;
            }
            default:
                matchResult = 12;
        }
        switch (matchResult) {
            case 0:
                return ofArray([s, 0, diffX, diffY, 0, 0, -s]);
            case 1:
                return ofArray([s, 0, 0, diffY, diffX, 0, -s]);
            case 2:
                return ofArray([s, 0, (diffX - (2 * s)) / 2, diffY, (diffX - (2 * s)) / 2, 0, s]);
            case 3:
                return ofArray([s, diffY / 2, diffX - (2 * s), diffY / 2, 0, 0, s]);
            case 4:
                return ofArray([s, 0, (diffX - s) / 2, diffY + s, (diffX - s) / 2, 0, 0, -s]);
            case 5:
                return ofArray([s, 0, diffX - s, diffY + s, 0, 0, 0, -s]);
            case 6:
                return ofArray([s, 0, 0, diffY + s, diffX - s, 0, 0, -s]);
            case 7:
                return ofArray([s, 0, 0, (diffY + s) / 2, diffX - s, (diffY + s) / 2, 0, -s]);
            case 8:
                return ofArray([s, 0, diffX - s, diffY - s, 0, 0, 0, s]);
            case 9:
                return ofArray([s, 0, (diffX - s) / 2, diffY - s, (diffX - s) / 2, 0, 0, s]);
            case 10:
                return ofArray([s, 0, 0, (diffY - s) / 2, diffX - s, (diffY - s) / 2, 0, s]);
            case 11:
                return ofArray([s, 0, 0, diffY - s, diffX - s, 0, 0, s]);
            default:
                return ofArray([s, 0, 0, 0, 0, 0, s]);
        }
    };
    return lengthList();
}

/**
 * Crop a string to first n chars
 */
export function PrintSimple_crop(s) {
    return sprintInitial(3, s);
}

/**
 * print a component simply
 */
export function PrintSimple_pComponent(comp) {
    const inPorts = map((p) => PrintSimple_crop(p.Id), comp.InputPorts);
    const outPorts = map((p_1) => PrintSimple_crop(p_1.Id), comp.OutputPorts);
    return `|${comp.Label}:${comp.Type} PIN=${inPorts} POut=${outPorts}|`;
}

/**
 * Print a connection simply
 */
export function PrintSimple_pConnection(conn) {
    return `${PrintSimple_crop(conn.Source.Id)}->${PrintSimple_crop(conn.Target.Id)}`;
}

/**
 * human-readable print of CanvasState.
 */
export function PrintSimple_pState(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const conns = _arg[1];
    const comps = _arg[0];
    return ((("\n-----COMPS-----\n" + join("\n", map(PrintSimple_pComponent, comps))) + "\n\n-----CONNS----\n") + join("\n", map(PrintSimple_pConnection, conns))) + "\n";
}

/**
 * make ComponentID, PortID, ConnectionID keys all short:
 * ComponentID -> Cxxx
 * PortID -> Pxxx
 * ConnectionId -> Wxxx
 * xxx = base 36 alphanumeric number
 */
export function ReduceKeys_a36ToD(ch) {
    return ch.charCodeAt(0) - 97;
}

export function ReduceKeys_dToA36(d) {
    return String.fromCharCode(d);
}

export function ReduceKeys_toA36(n) {
    const toA36$0027 = (alphas_mut, _arg_mut) => {
        toA36$0027:
        while (true) {
            const alphas = alphas_mut, _arg = _arg_mut;
            if (_arg === 0) {
                if (equals(alphas, empty_1())) {
                    return singleton(ReduceKeys_dToA36(0));
                }
                else {
                    return alphas;
                }
            }
            else {
                const n_1 = _arg | 0;
                alphas_mut = cons(ReduceKeys_dToA36(n_1 % 36), alphas);
                _arg_mut = ~~(n_1 / 36);
                continue toA36$0027;
            }
            break;
        }
    };
    return seqToString(toA36$0027(empty_1(), n));
}

export function ReduceKeys_toD(alphas) {
    const toD$0027 = (res_mut, _arg_mut) => {
        toD$0027:
        while (true) {
            const res = res_mut, _arg = _arg_mut;
            if (!isEmpty(_arg)) {
                const x = head(_arg);
                const chs = tail(_arg);
                res_mut = (ReduceKeys_a36ToD(x) + (res * 36));
                _arg_mut = chs;
                continue toD$0027;
            }
            else {
                return res | 0;
            }
            break;
        }
    };
    return toD$0027(0, toList(alphas)) | 0;
}

export function ReduceKeys_getIndexFromReduced(s) {
    const matchValue = s.length | 0;
    switch (matchValue) {
        case 0:
        case 1:
            return toFail(printf("Can\'t convert A36 string ids of less than 2 chars to decimal (first char muts be C|W|P)")) | 0;
        default: {
            const n = matchValue | 0;
            const matchValue_1 = s[0];
            switch (matchValue_1) {
                case "C":
                case "P":
                case "W":
                    return ReduceKeys_toD(s.slice(1, (n - 1) + 1).split("")) | 0;
                default: {
                    const x = matchValue_1;
                    return toFail(`${s} does not start with C|P|W and so is not an A36 ID for Component, Wire, or Port`) | 0;
                }
            }
        }
    }
}

export function ReduceKeys_getReducedFromIndex(typ, index) {
    switch (typ) {
        case "W":
        case "C":
        case "P":
            return typ + ReduceKeys_toA36(index);
        default: {
            const s = typ;
            return toFail(`Can't recognise ${s} as W or P or C.`);
        }
    }
}

export class ReduceKeys_Reducer extends Record {
    constructor(NextID, KeyMap) {
        super();
        this.NextID = (NextID | 0);
        this.KeyMap = KeyMap;
    }
}

export function ReduceKeys_Reducer_$reflection() {
    return record_type("Helpers.ReduceKeys.Reducer", [], ReduceKeys_Reducer, () => [["NextID", int32_type], ["KeyMap", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, int32_type])]]);
}

export function ReduceKeys_Reducer_Init() {
    return new ReduceKeys_Reducer(0, empty_2({
        Compare: comparePrimitives,
    }));
}

export function ReduceKeys_Reducer__Scan_Z721C83C5(this$, id) {
    if (id.length < 10) {
        this$.NextID = (max(this$.NextID, ReduceKeys_getIndexFromReduced(id) + 1) | 0);
    }
}

export function ReduceKeys_Reducer__ScanPort_Z27905B8C(this$, p) {
    ReduceKeys_Reducer__Scan_Z721C83C5(this$, p.Id);
}

export function ReduceKeys_Reducer__ScanComp_596CF542(this$, comp) {
    ReduceKeys_Reducer__Scan_Z721C83C5(this$, comp.Id);
    iterate((arg) => {
        ReduceKeys_Reducer__ScanPort_Z27905B8C(this$, arg);
    }, comp.InputPorts);
    iterate((arg_1) => {
        ReduceKeys_Reducer__ScanPort_Z27905B8C(this$, arg_1);
    }, comp.OutputPorts);
}

export function ReduceKeys_Reducer__ScanConn_7AAACC1B(this$, conn) {
    ReduceKeys_Reducer__Scan_Z721C83C5(this$, conn.Id);
}

export function ReduceKeys_Reducer__ScanCanvas_6523B576(this$, _arg) {
    const connL = _arg[1];
    const compL = _arg[0];
    iterate((arg) => {
        ReduceKeys_Reducer__ScanComp_596CF542(this$, arg);
    }, compL);
    iterate((arg_1) => {
        ReduceKeys_Reducer__ScanConn_7AAACC1B(this$, arg_1);
    }, connL);
}

export function ReduceKeys_Reducer__ScanProject_1696C498(this$, p) {
    iterate((ldc) => {
        ReduceKeys_Reducer__ScanCanvas_6523B576(this$, ldc.CanvasState);
    }, p.LoadedComponents);
}

export function ReduceKeys_Reducer__ReduceID(this$, typ, longId) {
    let matchValue, index_1, index;
    let matchResult;
    switch (typ) {
        case "C": {
            if (longId.length > 10) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
            break;
        }
        case "W": {
            if (longId.length > 10) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
            break;
        }
        case "P": {
            if (longId.length > 10) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
            break;
        }
        default:
            matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return ReduceKeys_getReducedFromIndex(typ, (matchValue = tryFind_1(longId, this$.KeyMap), (matchValue == null) ? ((index_1 = (this$.NextID | 0), (this$.NextID = ((index_1 + 1) | 0), (this$.KeyMap = add(longId, index_1, this$.KeyMap), index_1)))) : ((index = (matchValue | 0), index))));
        default: {
            let matchResult_1;
            switch (typ) {
                case "C": {
                    if (longId[0] === typ[0]) {
                        matchResult_1 = 0;
                    }
                    else {
                        matchResult_1 = 1;
                    }
                    break;
                }
                case "W": {
                    if (longId[0] === typ[0]) {
                        matchResult_1 = 0;
                    }
                    else {
                        matchResult_1 = 1;
                    }
                    break;
                }
                case "P": {
                    if (longId[0] === typ[0]) {
                        matchResult_1 = 0;
                    }
                    else {
                        matchResult_1 = 1;
                    }
                    break;
                }
                default:
                    matchResult_1 = 1;
            }
            switch (matchResult_1) {
                case 0:
                    return void 0;
                default: {
                    const s = typ;
                    return toFail(printf("{s} is not a valid key type: \'C\',\'W\',\'P\' are required for Component, Wire, or Port"));
                }
            }
        }
    }
}

export function ReduceKeys_Reducer__Reduce(this$, typ, longId) {
    return defaultArg(ReduceKeys_Reducer__ReduceID(this$, typ, longId), longId);
}

export function ReduceKeys_Reducer__ReduceSymInfo_60D84205(this$, si) {
    return Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), portOrientation_)((arg_6) => ofList(map((tupledArg) => {
        const s = tupledArg[0];
        const e = tupledArg[1];
        return [ReduceKeys_Reducer__Reduce(this$, "P", s), e];
    }, toList_1(arg_6)), {
        Compare: comparePrimitives,
    }))(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), portOrder_)((table) => map_2((_arg, lis) => map((arg_1) => ReduceKeys_Reducer__Reduce(this$, "P", arg_1), lis), table))(si));
}

export function ReduceKeys_Reducer__ReduceComp_596CF542(this$, comp) {
    const rId = ReduceKeys_Reducer__ReduceID(this$, "C", comp.Id);
    const patternInput = ReduceKeys_Reducer__ReducePortL_101A7E36(this$, comp.InputPorts);
    const iPortL = patternInput[1];
    const iPOK = patternInput[0];
    const patternInput_1 = ReduceKeys_Reducer__ReducePortL_101A7E36(this$, comp.OutputPorts);
    const oPortL = patternInput_1[1];
    const oPOK = patternInput_1[0];
    const symInfo = map_3((arg_2) => ReduceKeys_Reducer__ReduceSymInfo_60D84205(this$, arg_2), comp.SymbolInfo);
    let matchResult;
    if (rId == null) {
        if (iPOK) {
            if (oPOK) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return comp;
        default:
            return new Component(defaultArg(rId, comp.Id), comp.Type, comp.Label, iPortL, oPortL, comp.X, comp.Y, comp.H, comp.W, symInfo);
    }
}

export function ReduceKeys_Reducer__ReducePortOpt_Z27905B8C(this$, port) {
    const pId = ReduceKeys_Reducer__ReduceID(this$, "P", port.Id);
    const hId = ReduceKeys_Reducer__ReduceID(this$, "C", port.HostId);
    if (pId != null) {
        if (hId != null) {
            const h_1 = hId;
            const p_1 = pId;
            return new Port(p_1, port.PortNumber, port.PortType, h_1);
        }
        else {
            const p = pId;
            return new Port(p, port.PortNumber, port.PortType, port.HostId);
        }
    }
    else if (hId != null) {
        const h = hId;
        return new Port(port.Id, port.PortNumber, port.PortType, h);
    }
    else {
        return void 0;
    }
}

export function ReduceKeys_Reducer__ReducePort_Z27905B8C(this$, port) {
    return defaultArg(ReduceKeys_Reducer__ReducePortOpt_Z27905B8C(this$, port), port);
}

export function ReduceKeys_Reducer__ReducePortL_101A7E36(this$, portL) {
    return fold((tupledArg, port) => {
        const noChange = tupledArg[0];
        const rPortL = tupledArg[1];
        const matchValue = ReduceKeys_Reducer__ReducePortOpt_Z27905B8C(this$, port);
        if (matchValue != null) {
            const port_1 = matchValue;
            return [false, cons(port_1, portL)];
        }
        else {
            return [noChange, cons(port, portL)];
        }
    }, [true, empty_1()], portL);
}

export function ReduceKeys_Reducer__ReduceConn_7AAACC1B(this$, conn) {
    const wId = ReduceKeys_Reducer__ReduceID(this$, "W", conn.Id);
    const sPort = ReduceKeys_Reducer__ReducePortOpt_Z27905B8C(this$, conn.Source);
    const tPort = ReduceKeys_Reducer__ReducePortOpt_Z27905B8C(this$, conn.Target);
    let matchResult;
    if (wId == null) {
        if (sPort == null) {
            if (tPort == null) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return conn;
        default: {
            const wId$0027 = defaultArg(wId, conn.Id);
            const sPort$0027 = defaultArg(sPort, conn.Source);
            const tPort$0027 = defaultArg(tPort, conn.Target);
            return new Connection(wId$0027, sPort$0027, tPort$0027, conn.Vertices);
        }
    }
}

export function ReduceKeys_Reducer__ReduceCanvasState_6523B576(this$, _arg) {
    const conns = _arg[1];
    const comps = _arg[0];
    return [map((arg) => ReduceKeys_Reducer__ReduceComp_596CF542(this$, arg), comps), map((arg_1) => ReduceKeys_Reducer__ReduceConn_7AAACC1B(this$, arg_1), conns)];
}

export function ReduceKeys_Reducer__ReduceLDC_Z4F4EE17B(this$, ldc) {
    return new LoadedComponent(ldc.Name, ldc.TimeStamp, ldc.FilePath, ldc.WaveInfo, ReduceKeys_Reducer__ReduceCanvasState_6523B576(this$, ldc.CanvasState), ldc.InputLabels, ldc.OutputLabels, ldc.Form, ldc.Description);
}

export function ReduceKeys_compressLDC(name, p) {
    const r = ReduceKeys_Reducer_Init();
    const updateLdc = (ldcs) => {
        const n = findIndex((ldc) => (ldc.Name === name), ldcs) | 0;
        return updateAt(n, ReduceKeys_Reducer__ReduceLDC_Z4F4EE17B(r, item_1(n, ldcs)), ldcs);
    };
    ReduceKeys_Reducer__ScanProject_1696C498(r, p);
    return Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), loadedComponents_)(updateLdc)(p);
}

export function isInput(_arg) {
    if (_arg.tag === 0) {
        return true;
    }
    else {
        return false;
    }
}

export function isOutput(_arg) {
    if (_arg.tag === 1) {
        return true;
    }
    else {
        return false;
    }
}

export function isViewer(_arg) {
    if (_arg.tag === 2) {
        return true;
    }
    else {
        return false;
    }
}

export function isCustom(_arg) {
    if (_arg.tag === 26) {
        return true;
    }
    else {
        return false;
    }
}

export function isIOLabel(_arg) {
    if (_arg.tag === 3) {
        return true;
    }
    else {
        return false;
    }
}

export function getCustomName(_arg) {
    if (_arg.tag === 26) {
        const custom = _arg.fields[0];
        return custom.Name;
    }
    else {
        return toFail(printf("what? getCustomName should only be called with custom components"));
    }
}

export function getCustomComponentType(_arg) {
    if (_arg.tag === 26) {
        const custom = _arg.fields[0];
        return custom;
    }
    else {
        return toFail(printf("what? getCustomComponentType should only be called with custom components"));
    }
}

//# sourceMappingURL=Helpers.fs.js.map
