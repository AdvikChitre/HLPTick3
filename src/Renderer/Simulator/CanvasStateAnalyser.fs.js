import { Union, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { PortType, Port, ComponentType, Port_$reflection, Component_$reflection, Connection_$reflection } from "../Common/CommonTypes.fs.js";
import { union_type, tuple_type, int32_type, record_type, class_type, string_type, list_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { append as append_1, tryHead, length, exists, tryPick, contains, forAll, tryFind as tryFind_1, tail, head, isEmpty, cons, fold, filter, collect, tryItem, tryFindIndex, map as map_1, initialize, empty, singleton, ofArray } from "../fable_modules/fable-library.4.1.4/List.js";
import { curry3, curry2, comparePrimitives, stringHash, compare as compare_1, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { FSharpMap__get_IsEmpty, filter as filter_1, FSharpMap__TryFind, FSharpMap__Add, tryFind, toList, FSharpMap__get_Item, ofList } from "../fable_modules/fable-library.4.1.4/Map.js";
import { List_groupBy } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { PortRmInfo, SimulationError, SimulationErrorType } from "./SimulatorTypes.fs.js";
import { toText, join, toConsole, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { flatten, value, map as map_2 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { singleton as singleton_1, append, delay, toList as toList_1 } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { ofSeq } from "../fable_modules/fable-library.4.1.4/Set.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { tryFindError } from "../Common/Helpers.fs.js";
import { inferConnectionsWidth } from "../Common/WidthInferer.fs.js";

export class MapData extends Record {
    constructor(Connections, Components, LabComp, LabGroup, LabInputPorts, LabOutputPorts, LabTargetConns, OtherTargetConns, LabSourceConns, OtherSourceConns, OtherInputPorts, OtherOutputPorts, ToComp, ToInputPort, ToOutputPort) {
        super();
        this.Connections = Connections;
        this.Components = Components;
        this.LabComp = LabComp;
        this.LabGroup = LabGroup;
        this.LabInputPorts = LabInputPorts;
        this.LabOutputPorts = LabOutputPorts;
        this.LabTargetConns = LabTargetConns;
        this.OtherTargetConns = OtherTargetConns;
        this.LabSourceConns = LabSourceConns;
        this.OtherSourceConns = OtherSourceConns;
        this.OtherInputPorts = OtherInputPorts;
        this.OtherOutputPorts = OtherOutputPorts;
        this.ToComp = ToComp;
        this.ToInputPort = ToInputPort;
        this.ToOutputPort = ToOutputPort;
    }
}

export function MapData_$reflection() {
    return record_type("CanvasStateAnalyser.MapData", [], MapData, () => [["Connections", list_type(Connection_$reflection())], ["Components", list_type(Component_$reflection())], ["LabComp", list_type(Component_$reflection())], ["LabGroup", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, list_type(Component_$reflection())])], ["LabInputPorts", list_type(Port_$reflection())], ["LabOutputPorts", list_type(Port_$reflection())], ["LabTargetConns", list_type(Connection_$reflection())], ["OtherTargetConns", list_type(Connection_$reflection())], ["LabSourceConns", list_type(Connection_$reflection())], ["OtherSourceConns", list_type(Connection_$reflection())], ["OtherInputPorts", list_type(Port_$reflection())], ["OtherOutputPorts", list_type(Port_$reflection())], ["ToComp", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, Component_$reflection()])], ["ToInputPort", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, Port_$reflection()])], ["ToOutputPort", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, Port_$reflection()])]]);
}

/**
 * Input and Output names of the ports depending on their ComponentType
 */
export function portNames(componentType) {
    switch (componentType.tag) {
        case 9:
            return [ofArray(["SEL", "DATA"]), ofArray(["0", "1", "2", "3"])];
        case 17:
            return [ofArray(["CIN", "P", "Q"]), ofArray(["SUM ", "COUT"])];
        case 18:
            return [ofArray(["P", "Q"]), ofArray(["SUM ", "COUT"])];
        case 20:
            return [ofArray(["P", "Q"]), singleton("SUM ")];
        case 19:
            return [ofArray(["CIN", "P", "Q"]), singleton("SUM ")];
        case 33:
            return [singleton("D"), singleton("Q")];
        case 34:
            return [ofArray(["D", "EN"]), singleton("Q")];
        case 35:
            return [ofArray(["D", "LOAD", "EN"]), singleton("Q")];
        case 37:
            return [ofArray(["D", "LOAD"]), singleton("Q")];
        case 36:
            return [singleton("EN"), singleton("Q")];
        case 38:
            return [empty(), singleton("Q")];
        case 40:
        case 39:
            return [singleton("ADDR"), singleton("DOUT")];
        case 41:
            return [ofArray(["ADDR", "DIN", "WEN"]), singleton("DOUT")];
        case 42:
            return [ofArray(["ADDR", "DIN", "WEN"]), singleton("DOUT")];
        case 31:
            return [singleton("D"), singleton("Q")];
        case 32:
            return [ofArray(["D", "EN"]), singleton("Q")];
        case 11:
            return [ofArray(["0", "1", "SEL"]), singleton("OUT")];
        case 29: {
            const nInp = componentType.fields[0] | 0;
            return [initialize(nInp, (i) => {
                let n, n_1;
                if ((n = (i | 0), n === 0)) {
                    const n_2 = i | 0;
                    return "LSB";
                }
                else if ((n_1 = (i | 0), n_1 === (nInp - 1))) {
                    const n_3 = i | 0;
                    return "MSB";
                }
                else {
                    return "";
                }
            }), singleton("OUT")];
        }
        case 30: {
            const n_4 = componentType.fields[0] | 0;
            return [singleton("IN"), empty()];
        }
        case 12:
            return [ofArray(["0", "1", "2", "3", "SEL"]), singleton("OUT")];
        case 13:
            return [ofArray(["0", "1", "2", "3", "4", "5", "6", "7", "SEL"]), singleton("OUT")];
        case 14:
            return [ofArray(["DATA", "SEL"]), ofArray(["0", "1"])];
        case 15:
            return [ofArray(["DATA", "SEL"]), ofArray(["0", "1", "2", "3"])];
        case 16:
            return [ofArray(["DATA", "SEL"]), ofArray(["0", "1", "2", "3", "4", "5", "6", "7"])];
        case 21:
        case 22:
        case 24:
            return [ofArray(["P", "Q"]), singleton("OUT")];
        case 23:
            return [singleton("IN"), singleton("OUT")];
        case 46:
            return [ofArray(["IN", "SHIFTER"]), singleton("OUT")];
        case 26: {
            const x = componentType.fields[0];
            return [map_1((tuple) => tuple[0], x.InputLabels), map_1((tuple_1) => tuple_1[0], x.OutputLabels)];
        }
        default:
            return [empty(), empty()];
    }
}

export function getPortName(comp, port) {
    const pNames = portNames(comp.Type);
    const getIdx = (pList) => {
        const _arg = tryFindIndex((po) => (po.Id === port.Id), pList);
        if (_arg == null) {
            throw new Error("getPortName: Port not contained in given list");
        }
        else {
            const i = _arg | 0;
            return i | 0;
        }
    };
    let _arg_1;
    if (port.PortType.tag === 1) {
        const idx = tryFindIndex((po_1) => (po_1.Id === port.Id), comp.OutputPorts);
        _arg_1 = tryItem(getIdx(comp.OutputPorts), pNames[1]);
    }
    else {
        _arg_1 = tryItem(getIdx(comp.InputPorts), pNames[0]);
    }
    if (_arg_1 == null) {
        return "";
    }
    else {
        const name = _arg_1;
        return name;
    }
}

function getAllInputPortIds(components) {
    return collect((comp) => map_1((port) => [port.Id, comp.Id], comp.InputPorts), components);
}

function getAllOutputPortIds(components) {
    return collect((comp) => map_1((port) => [port.Id, comp.Id], comp.OutputPorts), components);
}

function genMaps(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const conns = _arg[1];
    const comps = _arg[0];
    const labComps = filter((co) => equals(co.Type, new ComponentType(3, [])), comps);
    const idToComp = ofList(map_1((co_1) => [co_1.Id, co_1], comps), {
        Compare: compare_1,
    });
    const targetIsLabel = (c) => equals(FSharpMap__get_Item(idToComp, c.Target.HostId).Type, new ComponentType(3, []));
    const sourceIsLabel = (c_1) => equals(FSharpMap__get_Item(idToComp, c_1.Source.HostId).Type, new ComponentType(3, []));
    const splitBy = (pred, lst) => fold((tupledArg, x_1) => {
        const is = tupledArg[0];
        const isNot = tupledArg[1];
        if (pred(x_1)) {
            return [cons(x_1, is), isNot];
        }
        else {
            return [is, cons(x_1, isNot)];
        }
    }, [empty(), empty()], lst);
    const patternInput = splitBy(targetIsLabel, conns);
    const otherTargetConns = patternInput[1];
    const labTargetConns = patternInput[0];
    const patternInput_1 = splitBy(sourceIsLabel, conns);
    const otherSourceConns = patternInput_1[1];
    const labSourceConns = patternInput_1[0];
    const normalise = (p) => (new Port(p.Id, void 0, p.PortType, p.HostId));
    const normaliseL = (pL) => map_1(normalise, pL);
    const idToInputPort = ofList(map_1((po) => [po.Id, normalise(po)], collect((co_2) => co_2.InputPorts, comps)), {
        Compare: compare_1,
    });
    const idToOutputPort = ofList(map_1((po_1) => [po_1.Id, normalise(po_1)], collect((co_3) => co_3.OutputPorts, comps)), {
        Compare: compare_1,
    });
    const otherInputPorts = collect((co_5) => normaliseL(co_5.InputPorts), filter((co_4) => !equals(co_4.Type, new ComponentType(3, [])), comps));
    const otherOutputPorts = collect((co_7) => normaliseL(co_7.OutputPorts), filter((co_6) => !equals(co_6.Type, new ComponentType(3, [])), comps));
    const labGroup = ofList(List_groupBy((co_8) => co_8.Label, labComps, {
        Equals: (x_4, y_3) => (x_4 === y_3),
        GetHashCode: stringHash,
    }), {
        Compare: comparePrimitives,
    });
    const labInputPorts = collect((co_9) => normaliseL(co_9.InputPorts), labComps);
    const labOutputPorts = collect((co_10) => normaliseL(co_10.OutputPorts), labComps);
    return new MapData(conns, comps, labComps, labGroup, labInputPorts, labOutputPorts, labTargetConns, otherTargetConns, labSourceConns, otherSourceConns, otherInputPorts, otherOutputPorts, idToComp, idToInputPort, idToOutputPort);
}

function checkPortTypesAreConsistent(canvasState_, canvasState__1) {
    const canvasState = [canvasState_, canvasState__1];
    const checkComponentPorts = (ports_mut, correctType_mut) => {
        let port, port_1;
        checkComponentPorts:
        while (true) {
            const ports = ports_mut, correctType = correctType_mut;
            if (!isEmpty(ports)) {
                if ((port = head(ports), equals(port.PortNumber, void 0))) {
                    const port_2 = head(ports);
                    return new SimulationError(new SimulationErrorType(0, [correctType]), void 0, singleton(port_2.HostId), empty());
                }
                else if ((port_1 = head(ports), !equals(port_1.PortType, correctType))) {
                    const port_3 = head(ports);
                    return new SimulationError(new SimulationErrorType(1, [correctType, port_3]), void 0, singleton(port_3.HostId), empty());
                }
                else {
                    const ports$0027 = tail(ports);
                    ports_mut = ports$0027;
                    correctType_mut = correctType;
                    continue checkComponentPorts;
                }
            }
            else {
                return void 0;
            }
            break;
        }
    };
    const checkComponentsPorts = (components_mut) => {
        checkComponentsPorts:
        while (true) {
            const components = components_mut;
            if (!isEmpty(components)) {
                const components$0027 = tail(components);
                const comp = head(components);
                const matchValue = checkComponentPorts(comp.InputPorts, new PortType(0, []));
                const matchValue_1 = checkComponentPorts(comp.OutputPorts, new PortType(1, []));
                let matchResult, err;
                if (matchValue == null) {
                    if (matchValue_1 == null) {
                        matchResult = 1;
                    }
                    else {
                        matchResult = 0;
                        err = matchValue_1;
                    }
                }
                else {
                    matchResult = 0;
                    err = matchValue;
                }
                switch (matchResult) {
                    case 0:
                        return err;
                    default: {
                        components_mut = components$0027;
                        continue checkComponentsPorts;
                    }
                }
            }
            else {
                return void 0;
            }
            break;
        }
    };
    const checkConnectionPort = (port_4, correctType_1, connId) => {
        const matchValue_3 = equals(port_4.PortType, correctType_1);
        const matchValue_4 = port_4.PortNumber;
        if (matchValue_3) {
            if (matchValue_4 == null) {
                return void 0;
            }
            else {
                const portNumber = matchValue_4 | 0;
                return new SimulationError(new SimulationErrorType(2, [correctType_1, portNumber]), void 0, singleton(port_4.HostId), singleton(connId));
            }
        }
        else {
            return new SimulationError(new SimulationErrorType(1, [correctType_1, port_4]), void 0, singleton(port_4.HostId), singleton(connId));
        }
    };
    const checkConnectionsPorts = (connections_mut) => {
        checkConnectionsPorts:
        while (true) {
            const connections = connections_mut;
            if (!isEmpty(connections)) {
                const connections$0027 = tail(connections);
                const conn = head(connections);
                const matchValue_6 = checkConnectionPort(conn.Source, new PortType(1, []), conn.Id);
                const matchValue_7 = checkConnectionPort(conn.Target, new PortType(0, []), conn.Id);
                let matchResult_1, err_1;
                if (matchValue_6 == null) {
                    if (matchValue_7 == null) {
                        matchResult_1 = 1;
                    }
                    else {
                        matchResult_1 = 0;
                        err_1 = matchValue_7;
                    }
                }
                else {
                    matchResult_1 = 0;
                    err_1 = matchValue_6;
                }
                switch (matchResult_1) {
                    case 0:
                        return err_1;
                    default: {
                        connections_mut = connections$0027;
                        continue checkConnectionsPorts;
                    }
                }
            }
            else {
                return void 0;
            }
            break;
        }
    };
    const connections_1 = canvasState[1];
    const components_1 = canvasState[0];
    const matchValue_9 = checkComponentsPorts(components_1);
    const matchValue_10 = checkConnectionsPorts(connections_1);
    let matchResult_2, err_2;
    if (matchValue_9 == null) {
        if (matchValue_10 == null) {
            matchResult_2 = 1;
        }
        else {
            matchResult_2 = 0;
            err_2 = matchValue_10;
        }
    }
    else {
        matchResult_2 = 0;
        err_2 = matchValue_9;
    }
    switch (matchResult_2) {
        case 0:
            return err_2;
        default:
            return void 0;
    }
}

function checkEvery(counts, cond) {
    return fold((maybeErr, tupledArg) => {
        const idStr = tupledArg[0];
        const _arg = tupledArg[1];
        const count = _arg[1] | 0;
        const conns = _arg[0];
        if (maybeErr == null) {
            if (cond(count)) {
                return void 0;
            }
            else {
                return [idStr, map_1((conn) => conn.Id, conns), count];
            }
        }
        else {
            const err = maybeErr;
            return err;
        }
    }, void 0, toList(counts));
}

function countPortsConnections(conns, connMap, bins) {
    const countPortsConnections$0027 = (conns_1_mut, counts_mut) => {
        countPortsConnections$0027:
        while (true) {
            const conns_1 = conns_1_mut, counts = counts_mut;
            if (!isEmpty(conns_1)) {
                const conns$0027 = tail(conns_1);
                const conn = head(conns_1);
                let countsRes;
                const key_1 = connMap(conn);
                const matchValue = tryFind(key_1, counts);
                if (matchValue == null) {
                    countsRes = counts;
                }
                else {
                    const binCount = matchValue[0] | 0;
                    const binConns = matchValue[1];
                    countsRes = FSharpMap__Add(counts, key_1, [binCount + 1, cons(conn, binConns)]);
                }
                conns_1_mut = conns$0027;
                counts_mut = countsRes;
                continue countPortsConnections$0027;
            }
            else {
                return ofList(map_1((tupledArg) => {
                    const key = tupledArg[0];
                    const _arg = tupledArg[1];
                    const count = _arg[0] | 0;
                    const conns_2 = _arg[1];
                    return [key, [conns_2, count]];
                }, toList(counts)), {
                    Compare: compare_1,
                });
            }
            break;
        }
    };
    return countPortsConnections$0027(conns, ofList(map_1((b) => [b, [0, empty()]], bins), {
        Compare: compare_1,
    }));
}

function checkCounts(conns, connMap, bins, binMap, cond) {
    const totals = countPortsConnections(conns, connMap, bins);
    return checkEvery(totals, cond);
}

export function getPortNum(pList, port) {
    const _arg = tryFind_1((po) => (po.Id === port.Id), pList);
    if (_arg == null) {
        return toFail(printf("port should be in given port list"));
    }
    else {
        const po_1 = _arg;
        return po_1.PortNumber;
    }
}

export function getRmInfoData(m, port) {
    const parentComp = FSharpMap__get_Item(m.ToComp, port.HostId);
    const portNum = getPortNum(equals(port.PortType, new PortType(0, [])) ? parentComp.InputPorts : parentComp.OutputPorts, port);
    const portName = getPortName(parentComp, new Port(port.Id, portNum, port.PortType, port.HostId));
    return [parentComp, portName];
}

function getInPortRmInfo(m, counts, port) {
    const patternInput = getRmInfoData(m, port);
    const portName = patternInput[1];
    const parentComp = patternInput[0];
    const checkAllPorts = (cond, ports) => forAll((port_1) => cond(FSharpMap__get_Item(counts, port_1.Id)[1])(port_1), ports);
    const condDisconnected = (count, port_2) => {
        if (count === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    const condSelDisconnected = (portNumSelection, count_1, port_3) => {
        if (contains(portName, portNumSelection, {
            Equals: (x, y) => (x === y),
            GetHashCode: stringHash,
        })) {
            return condDisconnected(count_1, port_3);
        }
        else {
            return true;
        }
    };
    const matchValue_1 = parentComp.Type;
    switch (matchValue_1.tag) {
        case 17: {
            const w = matchValue_1.fields[0] | 0;
            if (portName === "CIN") {
                return new PortRmInfo(1, [new ComponentType(18, [w])]);
            }
            else {
                return new PortRmInfo(0, []);
            }
        }
        case 19: {
            const w_1 = matchValue_1.fields[0] | 0;
            if (portName === "CIN") {
                return new PortRmInfo(1, [new ComponentType(20, [w_1])]);
            }
            else {
                return new PortRmInfo(0, []);
            }
        }
        case 36: {
            const w_2 = matchValue_1.fields[0] | 0;
            return new PortRmInfo(1, [new ComponentType(38, [w_2])]);
        }
        case 37: {
            const w_3 = matchValue_1.fields[0] | 0;
            if (checkAllPorts(curry2(condDisconnected), parentComp.InputPorts)) {
                return new PortRmInfo(1, [new ComponentType(38, [w_3])]);
            }
            else {
                return new PortRmInfo(0, []);
            }
        }
        case 35: {
            const w_4 = matchValue_1.fields[0] | 0;
            const isDAndLoadDisconnected = checkAllPorts(curry3(condSelDisconnected)(ofArray(["D", "LOAD"])), parentComp.InputPorts);
            const isEnDisconnected = checkAllPorts(curry3(condSelDisconnected)(singleton("EN")), parentComp.InputPorts);
            toConsole(printf("isDandLoaddisconnected: %A"))(isDAndLoadDisconnected);
            toConsole(printf("isEndisconnected: %A"))(isEnDisconnected);
            let matchResult;
            switch (portName) {
                case "D": {
                    if (isDAndLoadDisconnected) {
                        matchResult = 0;
                    }
                    else {
                        matchResult = 1;
                    }
                    break;
                }
                case "LOAD": {
                    if (isDAndLoadDisconnected) {
                        matchResult = 0;
                    }
                    else {
                        matchResult = 1;
                    }
                    break;
                }
                case "EN": {
                    if (isEnDisconnected) {
                        matchResult = 2;
                    }
                    else {
                        matchResult = 3;
                    }
                    break;
                }
                default:
                    if (isDAndLoadDisconnected) {
                        matchResult = 5;
                    }
                    else if (isEnDisconnected) {
                        matchResult = 5;
                    }
                    else {
                        matchResult = 4;
                    }
            }
            switch (matchResult) {
                case 0:
                    return new PortRmInfo(1, [new ComponentType(36, [w_4])]);
                case 1:
                    return new PortRmInfo(0, []);
                case 2:
                    return new PortRmInfo(1, [new ComponentType(37, [w_4])]);
                case 3:
                    return new PortRmInfo(0, []);
                case 4:
                    return new PortRmInfo(0, []);
                default:
                    throw new Error("Ports can never be connected like this");
            }
        }
        default:
            return new PortRmInfo(0, []);
    }
}

function getOutPortRmInfo(m, counts, port) {
    const patternInput = getRmInfoData(m, port);
    const portName = patternInput[1];
    const parentComp = patternInput[0];
    const matchValue = parentComp.Type;
    switch (matchValue.tag) {
        case 17: {
            const w = matchValue.fields[0] | 0;
            if (portName === "COUT") {
                return new PortRmInfo(1, [new ComponentType(19, [w])]);
            }
            else {
                return new PortRmInfo(0, []);
            }
        }
        case 18: {
            const w_1 = matchValue.fields[0] | 0;
            if (portName === "COUT") {
                return new PortRmInfo(1, [new ComponentType(20, [w_1])]);
            }
            else {
                return new PortRmInfo(0, []);
            }
        }
        default:
            return new PortRmInfo(0, []);
    }
}

function getInErrType(count, port, rmInfo) {
    return new SimulationErrorType(11, [count, port, rmInfo]);
}

export function getOutErrType(count, port, rmInfo) {
    return new SimulationErrorType(12, [count, port, rmInfo]);
}

function checkPortConnections(m, connMap, bins, cond, pidMap, rmInfoGen, errTypeGen) {
    const counts = countPortsConnections(m.Connections, connMap, map_1((port) => port.Id, bins));
    const matchValue = checkEvery(counts, cond);
    if (matchValue == null) {
        return void 0;
    }
    else {
        const portId = matchValue[0];
        const count = matchValue[2] | 0;
        const connsAffected = matchValue[1];
        const port_1 = pidMap(portId);
        const rmInfo = rmInfoGen(m, counts, port_1);
        return new SimulationError(errTypeGen(count, port_1, rmInfo), void 0, singleton(port_1.HostId), connsAffected);
    }
}

function checkConns(conns, m) {
    const compOfPort = (p) => FSharpMap__get_Item(m.ToComp, p.HostId);
    return map_2((tupledArg) => {
        const s_1 = tupledArg[0];
        const t_1 = tupledArg[1];
        const conn_1 = tupledArg[2];
        return new SimulationError(new SimulationErrorType(3, []), void 0, ofArray([s_1.Id, t_1.Id]), singleton(conn_1.Id));
    }, tryPick((conn) => {
        const s = compOfPort(conn.Source);
        const t = compOfPort(conn.Target);
        if (equals(s.Type, new ComponentType(3, [])) && equals(t.Type, new ComponentType(3, []))) {
            return [s, t, conn];
        }
        else {
            return void 0;
        }
    }, conns));
}

function checkPortsAreConnectedProperly(canvasState_, canvasState__1) {
    const canvasState = [canvasState_, canvasState__1];
    const m = genMaps(canvasState[0], canvasState[1]);
    const conns = m.Connections;
    const labMap = (lab) => FSharpMap__get_Item(m.LabGroup, lab);
    return tryPick((x_3) => x_3, toList_1(delay(() => append(singleton_1(checkPortConnections(m, (conn) => conn.Target.Id, m.OtherInputPorts, (y) => (1 === y), (pid) => FSharpMap__get_Item(m.ToInputPort, pid), getInPortRmInfo, getInErrType)), delay(() => {
        let matchValue, labelId, count_1, connsAffected;
        return append((matchValue = checkCounts(m.LabTargetConns, (conn_1) => FSharpMap__get_Item(m.ToComp, conn_1.Target.HostId).Label, map_1((tuple) => tuple[0], toList(m.LabGroup)), labMap, (y_1) => (1 === y_1)), (matchValue == null) ? singleton_1(void 0) : ((labelId = matchValue[0], (count_1 = (matchValue[2] | 0), (connsAffected = matchValue[1], singleton_1(new SimulationError(new SimulationErrorType(13, [count_1]), void 0, map_1((comp) => comp.Id, labMap(labelId)), connsAffected))))))), delay(() => append(singleton_1(checkPortConnections(m, (conn_2) => conn_2.Source.Id, m.OtherOutputPorts, (y_2) => (0 < y_2), (pid_1) => FSharpMap__get_Item(m.ToOutputPort, pid_1), getOutPortRmInfo, getOutErrType)), delay(() => singleton_1(checkConns(conns, m))))));
    })))));
}

function checkIOLabels(canvasState_, canvasState__1) {
    const canvasState = [canvasState_, canvasState__1];
    const checkDuplicate = (comps_mut, map_mut, ioType_mut) => {
        let compId;
        checkDuplicate:
        while (true) {
            const comps = comps_mut, map = map_mut, ioType = ioType_mut;
            if (!isEmpty(comps)) {
                const comps$0027 = tail(comps);
                const comp = head(comps);
                const matchValue = FSharpMap__TryFind(map, comp.Label);
                if (matchValue != null) {
                    if ((compId = matchValue, compId === comp.Id)) {
                        const compId_1 = matchValue;
                        comps_mut = comps$0027;
                        map_mut = map;
                        ioType_mut = ioType;
                        continue checkDuplicate;
                    }
                    else {
                        const compId_2 = matchValue;
                        return new SimulationError(new SimulationErrorType(4, [ioType, comp.Label]), void 0, map_1((arg) => arg, ofArray([comp.Id, compId_2])), empty());
                    }
                }
                else {
                    comps_mut = comps$0027;
                    map_mut = map;
                    ioType_mut = ioType;
                    continue checkDuplicate;
                }
            }
            else {
                return void 0;
            }
            break;
        }
    };
    const toMap = (comps_1) => ofList(map_1((comp_1) => [comp_1.Label, comp_1.Id], comps_1), {
        Compare: comparePrimitives,
    });
    const components = canvasState[0];
    const inputs = filter((comp_2) => {
        if (comp_2.Type.tag === 0) {
            return true;
        }
        else {
            return false;
        }
    }, components);
    const outputs = filter((comp_3) => {
        if (comp_3.Type.tag === 1) {
            return true;
        }
        else {
            return false;
        }
    }, components);
    const labels = filter((comp_4) => {
        if (comp_4.Type.tag === 3) {
            return true;
        }
        else {
            return false;
        }
    }, components);
    const matchValue_4 = checkDuplicate(inputs, toMap(inputs), "Input");
    const matchValue_5 = checkDuplicate(outputs, toMap(outputs), "Output");
    let matchResult, err;
    if (matchValue_4 == null) {
        if (matchValue_5 == null) {
            matchResult = 1;
        }
        else {
            matchResult = 0;
            err = matchValue_5;
        }
    }
    else {
        matchResult = 0;
        err = matchValue_4;
    }
    switch (matchResult) {
        case 0:
            return err;
        default:
            return void 0;
    }
}

export class CustomComponentError extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NoSheet", "BadInputs", "BadOutputs"];
    }
}

export function CustomComponentError_$reflection() {
    return union_type("CanvasStateAnalyser.CustomComponentError", [], CustomComponentError, () => [[["Item", string_type]], [["ComponentSheet", string_type], ["InstLists", list_type(tuple_type(string_type, int32_type))], ["CompLists", list_type(tuple_type(string_type, int32_type))]], [["ComponentSheet", string_type], ["InstLists", list_type(tuple_type(string_type, int32_type))], ["CompLists", list_type(tuple_type(string_type, int32_type))]]]);
}

/**
 * Check a single custom component for correct I/Os
 */
export function checkCustomComponentForOkIOs(c, args, sheets) {
    const inouts = [args.InputLabels, args.OutputLabels];
    const name = args.Name;
    const compare = (labs1, labs2) => ofSeq(labs1, {
        Compare: compare_1,
    }).Equals(ofSeq(labs2, {
        Compare: compare_1,
    }));
    const _arg = map_2((sheet_1) => [sheet_1, compare(sheet_1.InputLabels, args.InputLabels), compare(sheet_1.OutputLabels, args.OutputLabels)], tryFind_1((sheet) => (sheet.Name === name), sheets));
    if (_arg != null) {
        if (_arg[1]) {
            if (_arg[2]) {
                return new FSharpResult$2(0, [void 0]);
            }
            else {
                const sheet_3 = _arg[0];
                return new FSharpResult$2(1, [[c, new CustomComponentError(2, [name, sheet_3.OutputLabels, args.OutputLabels])]]);
            }
        }
        else {
            const sheet_2 = _arg[0];
            return new FSharpResult$2(1, [[c, new CustomComponentError(1, [name, sheet_2.InputLabels, args.InputLabels])]]);
        }
    }
    else {
        return new FSharpResult$2(1, [[c, new CustomComponentError(0, [name])]]);
    }
}

/**
 * Custom components have I/Os which are the same (names) as the I/Os in the corresponding sheet
 * This can change if a sheet made into a custom component is edited
 * We do this check whenever a new sheet is opened
 */
export function checkCustomComponentsOk(_arg1_, _arg1__1, sheets) {
    const comps = _arg1_;
    const error = (c, t) => (new SimulationError(t, void 0, singleton(c.Id), empty()));
    const disp = (portL) => {
        const arg = join(" , ", map_1((tuple) => tuple[0], portL));
        return toText(printf("%s"))(arg);
    };
    const _arg_2 = tryFindError(collect((_arg_1) => {
        if (_arg_1.Type.tag === 26) {
            const c_1 = _arg_1;
            const args = _arg_1.Type.fields[0];
            return singleton(checkCustomComponentForOkIOs(c_1, args, sheets));
        }
        else {
            return empty();
        }
    }, comps));
    if (_arg_2.tag === 1) {
        switch (_arg_2.fields[0][1].tag) {
            case 1: {
                const instIns = _arg_2.fields[0][1].fields[1];
                const compIns = _arg_2.fields[0][1].fields[2];
                const cName_1 = _arg_2.fields[0][1].fields[0];
                const c_3 = _arg_2.fields[0][0];
                const instIns_1 = disp(instIns);
                const compIns_1 = disp(compIns);
                return error(c_3, new SimulationErrorType(9, [cName_1, instIns_1, compIns_1]));
            }
            case 2: {
                const instOuts = _arg_2.fields[0][1].fields[1];
                const compOuts = _arg_2.fields[0][1].fields[2];
                const cName_2 = _arg_2.fields[0][1].fields[0];
                const c_4 = _arg_2.fields[0][0];
                const instOuts_1 = disp(instOuts);
                const compOuts_1 = disp(compOuts);
                return error(c_4, new SimulationErrorType(10, [cName_2, instOuts_1, compOuts_1]));
            }
            default: {
                const cName = _arg_2.fields[0][1].fields[0];
                const c_2 = _arg_2.fields[0][0];
                return error(c_2, new SimulationErrorType(8, [cName]));
            }
        }
    }
    else {
        return void 0;
    }
}

/**
 * Check whether Adders have a NotConnected component connected to their COUT
 * this is unnecessary since it can be disabled via its options
 */
export function checkAdderUnnecessaryNC(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const conns = _arg[1];
    const comps = _arg[0];
    const isNotConnected = (id) => exists((comp) => {
        if (comp.Id === id) {
            return equals(comp.Type, new ComponentType(4, []));
        }
        else {
            return false;
        }
    }, comps);
    const getNCConnectedOutPorts = (outPortsList) => filter((port) => exists((conn) => {
        if (conn.Source.Id === port.Id) {
            return isNotConnected(conn.Target.HostId);
        }
        else {
            return false;
        }
    }, conns), outPortsList);
    const affectedPorts = filter((port_1) => (value(port_1.PortNumber) !== 0), collect((comp_2) => getNCConnectedOutPorts(comp_2.OutputPorts), filter((_arg_1) => {
        const comp_1 = _arg_1;
        const matchValue = comp_1.Type;
        switch (matchValue.tag) {
            case 17:
            case 18:
                return true;
            default:
                return false;
        }
    }, comps)));
    if (isEmpty(affectedPorts)) {
        return void 0;
    }
    else {
        const affPorts = affectedPorts;
        const affectedComps = map_1((port_2) => port_2.HostId, affPorts);
        const affectedConns = map_1((conn_2) => conn_2.Id, filter((conn_1) => exists((port_3) => (port_3.Id === conn_1.Source.Id), affPorts), conns));
        return new SimulationError(new SimulationErrorType(18, []), void 0, affectedComps, affectedConns);
    }
}

function checkConnectionsWidths(canvasState_, canvasState__1) {
    const canvasState = [canvasState_, canvasState__1];
    const convertConnId = (_arg) => {
        const cId = _arg;
        return cId;
    };
    const convertError = (err) => (new SimulationError(new SimulationErrorType(5, [err]), void 0, empty(), map_1(convertConnId, err.ConnectionsAffected)));
    const matchValue = inferConnectionsWidth(canvasState[0], canvasState[1]);
    if (matchValue.tag === 0) {
        const connWidths = matchValue.fields[0];
        const faulty = filter_1((_arg_1, width) => (width == null), connWidths);
        if (FSharpMap__get_IsEmpty(faulty)) {
            return [void 0, connWidths];
        }
        else {
            return [new SimulationError(new SimulationErrorType(6, ["Could not infer all connections widths."]), void 0, empty(), map_1((tupledArg) => {
                const cId_1 = tupledArg[0];
                return convertConnId(cId_1);
            }, toList(faulty))), void 0];
        }
    }
    else {
        const err_1 = matchValue.fields[0];
        return [convertError(err_1), void 0];
    }
}

/**
 * check component labels are all unique and do not include protected values (CLK)
 */
export function checkComponentNamesAreOk(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const conns = _arg[1];
    const comps = _arg[0];
    const badNameErrors = map_1((tupledArg) => {
        const msg = tupledArg[0];
        const eLst = tupledArg[1];
        return [map_1((tuple_1) => tuple_1[0], eLst), msg];
    }, List_groupBy((tuple) => tuple[1], collect((comp) => {
        const label = comp.Label.toLocaleUpperCase();
        switch (label) {
            case "CLK":
                return singleton([comp, "Clk is not allowed as a name for a component or a Net. Use the properties tab to give a different name to the highlighted component(s)."]);
            case "":
                return singleton([comp, "All components must have a unique alphanumeric name (e.g. \'G1\'). An empty name is not allowed except for split and join and bus select.Use the properties tab to give a non-empty name to the highlighted component(s)."]);
            default:
                return empty();
        }
    }, filter((_arg_1) => {
        switch (_arg_1.Type.tag) {
            case 27:
            case 28:
            case 6:
            case 4:
                return false;
            default:
                return true;
        }
    }, comps)), {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    }));
    const duplicateNameErrors = map_1((tupledArg_2) => {
        const compL_1 = tupledArg_2[1];
        return [compL_1, "Component names must be distinct. Use the properties tab to give different names to the highlighted components"];
    }, filter((tupledArg_1) => {
        const compL = tupledArg_1[1];
        return length(compL) > 1;
    }, List_groupBy((comp_1) => comp_1.Label, filter((_arg_2) => {
        switch (_arg_2.Type.tag) {
            case 3:
            case 27:
            case 28:
            case 6:
            case 4:
                return false;
            default:
                return true;
        }
    }, comps), {
        Equals: (x_1, y_1) => (x_1 === y_1),
        GetHashCode: stringHash,
    })));
    return map_2((tupledArg_3) => {
        const comps_1 = tupledArg_3[0];
        const msg_1 = tupledArg_3[1];
        return new SimulationError(new SimulationErrorType(7, [msg_1]), void 0, map_1((comp_2) => comp_2.Id, comps_1), empty());
    }, tryHead(append_1(badNameErrors, duplicateNameErrors)));
}

/**
 * Analyse a CanvasState and return any error (or None).
 */
export function analyseState(state_, state__1, ldComps) {
    const state = [state_, state__1];
    const patternInput = checkConnectionsWidths(state[0], state[1]);
    const widthErr = patternInput[0];
    const connectionsWidth = patternInput[1];
    return [flatten(tryFind_1((option) => (option != null), ofArray([checkPortTypesAreConsistent(state[0], state[1]), checkPortsAreConnectedProperly(state[0], state[1]), checkIOLabels(state[0], state[1]), checkCustomComponentsOk(state[0], state[1], ldComps), widthErr, checkComponentNamesAreOk(state[0], state[1]), checkAdderUnnecessaryNC(state[0], state[1])]))), connectionsWidth];
}

//# sourceMappingURL=CanvasStateAnalyser.fs.js.map
