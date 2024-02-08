import { value } from "../fable_modules/fable-library.4.1.4/Option.js";
import { toConsole, toText, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { ofArray, append, indexed, tryFind, item, filter, replicate, collect, map as map_2, singleton, fold, empty, cons, head, tail, isEmpty } from "../fable_modules/fable-library.4.1.4/List.js";
import { toArray, toList, tryFind as tryFind_1, FSharpMap__get_Item, ofList, empty as empty_1, FSharpMap__Add, FSharpMap__TryFind } from "../fable_modules/fable-library.4.1.4/Map.js";
import { compareArrays, stringHash, equals, compare } from "../fable_modules/fable-library.4.1.4/Util.js";
import { SimulationComponent, Bit, SimulationComponentState } from "./SimulatorTypes.fs.js";
import { convertIntToFastData } from "./NumberHelpers.fs.js";
import { toString } from "../fable_modules/fable-library.4.1.4/Types.js";
import { Connection, ComponentType } from "../Common/CommonTypes.fs.js";
import { List_groupBy } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { sortBy, map as map_3 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { analyseState } from "./CanvasStateAnalyser.fs.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";

function getPortNumberOrFail(port) {
    if (port != null) {
        const p = value(port);
        return p;
    }
    else {
        return toFail(printf("what? Component ports should always have a portNumber"));
    }
}

function getValuesForPorts(inputs, portNumbers) {
    if (!isEmpty(portNumbers)) {
        const portNumbers$0027 = tail(portNumbers);
        const portNumber = head(portNumbers);
        const matchValue = FSharpMap__TryFind(inputs, portNumber);
        if (matchValue != null) {
            const wireData = matchValue;
            const matchValue_1 = getValuesForPorts(inputs, portNumbers$0027);
            if (matchValue_1 != null) {
                const values = matchValue_1;
                return cons(wireData, values);
            }
            else {
                return void 0;
            }
        }
        else {
            return void 0;
        }
    }
    else {
        return empty();
    }
}

function getReducer(componentType, _arg) {
    return toFail(printf("Reducer function is legacy code and should never be called!"));
}

function buildSourceToTargetPortMap(connections) {
    return fold((map, conn) => {
        const key = conn.Source.Id;
        const target = [conn.Target.HostId, conn.Target.Id];
        let newValue;
        const matchValue = FSharpMap__TryFind(map, key);
        if (matchValue != null) {
            const oldValue = matchValue;
            newValue = cons(target, oldValue);
        }
        else {
            newValue = singleton(target);
        }
        return FSharpMap__Add(map, key, newValue);
    }, empty_1({
        Compare: compare,
    }), connections);
}

function mapInputPortIdToPortNumber(components) {
    return fold((map, comp) => fold((map_1, port) => FSharpMap__Add(map_1, port.Id, getPortNumberOrFail(port.PortNumber)), map, comp.InputPorts), empty_1({
        Compare: compare,
    }), components);
}

function getDefaultState(compType_1) {
    let matchResult, w, memory;
    switch (compType_1.tag) {
        case 48: {
            matchResult = 1;
            break;
        }
        case 0:
        case 1:
        case 3:
        case 4:
        case 6:
        case 47:
        case 5:
        case 8:
        case 10:
        case 11:
        case 12:
        case 13:
        case 9:
        case 25:
        case 14:
        case 15:
        case 16:
        case 17:
        case 24:
        case 21:
        case 22:
        case 23:
        case 26:
        case 27:
        case 29:
        case 28:
        case 30:
        case 40:
        case 2:
        case 18:
        case 19:
        case 20:
        case 46: {
            matchResult = 2;
            break;
        }
        case 7:
        case 49: {
            matchResult = 3;
            break;
        }
        case 39: {
            matchResult = 4;
            break;
        }
        case 31:
        case 32: {
            matchResult = 5;
            break;
        }
        case 33: {
            matchResult = 6;
            w = compType_1.fields[0];
            break;
        }
        case 34: {
            matchResult = 6;
            w = compType_1.fields[0];
            break;
        }
        case 35: {
            matchResult = 6;
            w = compType_1.fields[0];
            break;
        }
        case 37: {
            matchResult = 6;
            w = compType_1.fields[0];
            break;
        }
        case 36: {
            matchResult = 6;
            w = compType_1.fields[0];
            break;
        }
        case 38: {
            matchResult = 6;
            w = compType_1.fields[0];
            break;
        }
        case 41: {
            matchResult = 7;
            memory = compType_1.fields[0];
            break;
        }
        case 42: {
            matchResult = 7;
            memory = compType_1.fields[0];
            break;
        }
        default:
            matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return toFail(printf("What? Legacy RAM component types should never occur"));
        case 1:
            return toFail(printf("Legacy Input component types should never occur"));
        case 2:
            return new SimulationComponentState(0, []);
        case 3:
            return new SimulationComponentState(0, []);
        case 4:
            return new SimulationComponentState(0, []);
        case 5:
            return new SimulationComponentState(1, [0]);
        case 6:
            return new SimulationComponentState(2, [convertIntToFastData(w, 0)]);
        default:
            return new SimulationComponentState(3, [memory]);
    }
}

export function compType(t) {
    if (t.tag === 26) {
        const c = t.fields[0];
        return c.Name;
    }
    else {
        return toString(t);
    }
}

function buildSimulationComponent(sourceToTargetPort, portIdToPortNumber, comp, outputWidths) {
    const mapPortIdsToPortNumbers = (targets) => map_2((tupledArg) => {
        const compId = tupledArg[0];
        const portId = tupledArg[1];
        const matchValue = FSharpMap__TryFind(portIdToPortNumber, portId);
        if (matchValue != null) {
            const portNumber = matchValue;
            return [compId, portNumber];
        }
        else {
            return toFail(printf("what? Input port with portId %A has no portNumber associated"))(portId);
        }
    }, targets);
    const outputs = ofList(collect((port) => {
        const matchValue_1 = FSharpMap__TryFind(sourceToTargetPort, port.Id);
        if (matchValue_1 != null) {
            const targets_1 = matchValue_1;
            return singleton([getPortNumberOrFail(port.PortNumber), mapPortIdsToPortNumbers(targets_1)]);
        }
        else if (equals(comp.Type, new ComponentType(3, []))) {
            return empty();
        }
        else {
            return toFail(printf("what? Unconnected output port %s in comp %s"))(port.Id)(comp.Id);
        }
    }, comp.OutputPorts), {
        Compare: compare,
    });
    let inputs;
    const matchValue_2 = comp.Type;
    if (matchValue_2.tag === 1) {
        const width = matchValue_2.fields[0] | 0;
        inputs = FSharpMap__Add(empty_1({
            Compare: compare,
        }), 0, replicate(width, new Bit(0, [])));
    }
    else {
        inputs = empty_1({
            Compare: compare,
        });
    }
    let outputWidths_1;
    const matchValue_3 = comp.Type;
    let matchResult, width_1;
    switch (matchValue_3.tag) {
        case 1: {
            matchResult = 0;
            width_1 = matchValue_3.fields[0];
            break;
        }
        case 2: {
            matchResult = 0;
            width_1 = matchValue_3.fields[0];
            break;
        }
        default:
            matchResult = 1;
    }
    switch (matchResult) {
        case 0: {
            outputWidths_1 = (new Int32Array([width_1]));
            break;
        }
        default:
            outputWidths_1 = outputWidths;
    }
    return new SimulationComponent(comp.Id, comp.Type, comp.Label, inputs, outputs, outputWidths_1, void 0, getDefaultState(comp.Type));
}

export function getLabelConnections(comps, conns) {
    const labels = filter((co) => equals(co.Type, new ComponentType(3, [])), comps);
    const compIdMap = ofList(map_2((co_1) => [co_1.Id, co_1], labels), {
        Compare: compare,
    });
    const getComp = (n) => FSharpMap__get_Item(compIdMap, n);
    const targetMap = ofList(map_2((conn) => [conn.Target.HostId, conn], conns), {
        Compare: compare,
    });
    const getConnection = (compTarget) => FSharpMap__get_Item(targetMap, compTarget.Id);
    const copyConnection = (conn_1, compTarget_1, tagNum) => {
        const Target = item(0, compTarget_1.InputPorts);
        return new Connection(toText(printf("iolab%d"))(tagNum) + conn_1.Id, conn_1.Source, Target, conn_1.Vertices);
    };
    const getDriverConnection = (comps_1) => {
        const _arg = tryFind((co_2) => !equals(tryFind_1(co_2.Id, targetMap), void 0), comps_1);
        if (_arg != null) {
            const comp = _arg;
            return FSharpMap__get_Item(targetMap, comp.Id);
        }
        else {
            return toFail(printf("What? component cannot be found in %A"))(targetMap);
        }
    };
    return collect((tupledArg) => {
        const lab = tupledArg[0];
        const lst = tupledArg[1];
        const dConn = getDriverConnection(lst);
        return map_2((tupledArg_1) => {
            const i = tupledArg_1[0] | 0;
            const co_5 = tupledArg_1[1];
            return copyConnection(dConn, co_5, i);
        }, indexed(filter((co_4) => (co_4.Id !== dConn.Target.HostId), lst)));
    }, List_groupBy((co_3) => co_3.Label, labels, {
        Equals: (x_2, y_2) => (x_2 === y_2),
        GetHashCode: stringHash,
    }));
}

function buildSimulationGraph(canvasState_, canvasState__1, outputWidths) {
    const canvasState = [canvasState_, canvasState__1];
    const connections$0027 = canvasState[1];
    const components = canvasState[0];
    const labConns = getLabelConnections(components, connections$0027);
    const connections = append(labConns, connections$0027);
    const sourceToTargetPort = buildSourceToTargetPortMap(connections);
    const portIdToPortNumber = mapInputPortIdToPortNumber(components);
    const mapper = (comp, outputWidths_1) => buildSimulationComponent(sourceToTargetPort, portIdToPortNumber, comp, outputWidths_1);
    const debugPrint = () => {
        toConsole(printf("Building Simulation Graph for Debug"));
        return (list) => map_2((tupledArg) => {
            const id = tupledArg[0];
            const comp_1 = tupledArg[1];
            let arg_1;
            const matchValue = comp_1.Type;
            if (matchValue.tag === 26) {
                const c = matchValue.fields[0];
                arg_1 = c.Name;
            }
            else {
                const t = matchValue;
                arg_1 = toText(printf("%A"))(t);
            }
            const arg_3 = ofArray(comp_1.OutputWidths);
            toConsole(printf("Built sComp %A │ %-30A │ %-25A │ %A"))(comp_1.Id)(arg_1)(comp_1.Label)(arg_3);
            return [id, comp_1];
        }, list);
    };
    return ofList(map_2((comp_2) => {
        const ws = map_3((tuple_1) => tuple_1[1], sortBy((tuple) => tuple[0], map_3((tupledArg_2) => {
            const w_1 = tupledArg_2[1] | 0;
            const pn = tupledArg_2[0][1];
            return [pn, w_1];
        }, outputWidths.filter((tupledArg_1) => {
            const w = tupledArg_1[1] | 0;
            const id_1 = tupledArg_1[0][0];
            return id_1 === comp_2.Id;
        })), {
            Compare: compare,
        }), Int32Array);
        return [comp_2.Id, mapper(comp_2, ws)];
    }, components), {
        Compare: compare,
    });
}

function findOutputWidths(canvasState_, canvasState__1, connsWidth) {
    const canvasState = [canvasState_, canvasState__1];
    const conns = canvasState[1];
    const comps = canvasState[0];
    const connsWidth_1 = map_2((tupledArg) => {
        const w = tupledArg[1];
        const k = tupledArg[0];
        return [k, value(w)];
    }, toList(connsWidth));
    const IOLabelsAsOutput = map_2((tupledArg_2) => {
        const connId_1 = tupledArg_2[0];
        const compId_1 = tupledArg_2[1];
        const _arg_1 = tryFind((tupledArg_3) => {
            const id_1 = tupledArg_3[0];
            const w_1 = tupledArg_3[1] | 0;
            return connId_1 === id_1;
        }, connsWidth_1);
        if (_arg_1 == null) {
            return toFail(printf("what? connection %A not found"))(connId_1);
        }
        else {
            const w_2 = _arg_1[1] | 0;
            return [[compId_1, 0], w_2];
        }
    }, filter((tupledArg_1) => {
        const connId = tupledArg_1[0];
        const compId = tupledArg_1[1];
        const comp = value(tryFind((c) => (c.Id === compId), comps));
        if (comp.Type.tag === 3) {
            return true;
        }
        else {
            return false;
        }
    }, map_2((conn) => [conn.Id, conn.Target.HostId], conns)));
    return toArray(ofList(append(IOLabelsAsOutput, map_2((tupledArg_5) => {
        const conn_3 = tupledArg_5[0];
        const w_4 = tupledArg_5[1] | 0;
        const matchValue_2 = conn_3.Source.PortNumber;
        if (matchValue_2 == null) {
            const comp_1 = value(tryFind((c_1) => (c_1.Id === conn_3.Source.HostId), comps));
            const pn_1 = value(value(tryFind((p) => (p.Id === conn_3.Source.Id), comp_1.OutputPorts)).PortNumber) | 0;
            return [[conn_3.Source.HostId, pn_1], w_4];
        }
        else {
            const pn = matchValue_2 | 0;
            return [[conn_3.Source.HostId, pn], w_4];
        }
    }, map_2((tupledArg_4) => {
        const id_2 = tupledArg_4[0];
        const w_3 = tupledArg_4[1] | 0;
        const matchValue_1 = tryFind((conn_1) => (conn_1.Id === id_2), conns);
        if (matchValue_1 != null) {
            const conn_2 = matchValue_1;
            return [conn_2, w_3];
        }
        else {
            return toFail(printf("what? connection %A not found"))(id_2);
        }
    }, connsWidth_1))), {
        Compare: compareArrays,
    }));
}

/**
 * Validate a diagram and generate its simulation graph.
 */
export function runCanvasStateChecksAndBuildGraph(canvasState_, canvasState__1, loadedComponents) {
    const canvasState = [canvasState_, canvasState__1];
    const matchValue = analyseState(canvasState[0], canvasState[1], loadedComponents);
    if (matchValue[0] == null) {
        if (matchValue[1] == null) {
            throw new Error("This should not happen, connections width should be available if no error was found.");
        }
        else {
            const connectionsWidth = matchValue[1];
            const outputsWidth = findOutputWidths(canvasState[0], canvasState[1], connectionsWidth);
            return new FSharpResult$2(0, [buildSimulationGraph(canvasState[0], canvasState[1], outputsWidth)]);
        }
    }
    else {
        const err = matchValue[0];
        return new FSharpResult$2(1, [err]);
    }
}

//# sourceMappingURL=Builder.fs.js.map
