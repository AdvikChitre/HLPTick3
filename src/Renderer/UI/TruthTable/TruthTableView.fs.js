import { generateLabel } from "../../DrawBlock/SymbolUpdate.fs.js";
import { NumberBase, Connection_$reflection, Component_$reflection, Component, Connection, Port, PortType, ComponentType } from "../../Common/CommonTypes.fs.js";
import { SimSubTab, TTMsg, Msg } from "../../Model/ModelType.fs.js";
import { mapIndexed, concat, mapFold, zip, cons, exists, length, item, tryFindIndex, filter as filter_1, collect, singleton, tail, head, isEmpty, contains, map, empty, ofArray, append, fold, iterate } from "../../fable_modules/fable-library.4.1.4/List.js";
import { toConsole, toFail, printf, toText } from "../../fable_modules/fable-library.4.1.4/String.js";
import { setComponentLabel } from "../MenuHelpers.fs.js";
import { DrawModelType_SheetT_Model__Model_get_GetSelectedCanvasState, DrawModelType_SheetT_Model__Model_GetCanvasState } from "../../DrawBlock/Sheet.fs.js";
import { Record, toString } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { createAtom, compare, int32ToString, comparePrimitives, safeHash, equals, stringHash } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { inferConnectionsWidth } from "../../Common/WidthInferer.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";
import { FSharpMap__get_IsEmpty, empty as empty_1, FSharpMap__get_Item, tryFind, toList, ofList } from "../../fable_modules/fable-library.4.1.4/Map.js";
import { value as value_2 } from "../../fable_modules/fable-library.4.1.4/Option.js";
import { analyseState, portNames } from "../../Simulator/CanvasStateAnalyser.fs.js";
import { uuid } from "../../Interface/JSHelpers.fs.js";
import { List_distinct } from "../../fable_modules/fable-library.4.1.4/Seq2.js";
import { errMsg, SimulationData, SimulationError_$reflection, SimulationData_$reflection, SimulationError, SimulationErrorType } from "../../Simulator/SimulatorTypes.fs.js";
import { record_type, union_type, tuple_type, list_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { simulationPlaceholder } from "../../Simulator/Fast/FastCreate.fs.js";
import { stateIsEqual } from "../../Simulator/Extractor.fs.js";
import { startCircuitSimulationFData } from "../../Simulator/Simulator.fs.js";
import { Option, button } from "../../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { empty as empty_2, singleton as singleton_1, append as append_1, delay, toList as toList_1 } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { ttGridContainerStyle, menuLabelStyle, colMoveArrowStyle, sortArrowStyle } from "../Style.fs.js";
import { Color_IColor } from "../../fable_modules/Fulma.2.16.0/Common.fs.js";
import { CellIO__get_getLabel, MoveDirection, SortType } from "../../Simulator/TruthTableTypes.fs.js";
import * as react from "react";
import { viewConstraints, viewReductions, addToolTipTop, makeOnOffToggle, makeElementLine } from "./ConstraintReduceView.fs.js";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { menu as menu_1, list as list_17 } from "../../fable_modules/Fulma.2.16.0/Components/Menu.fs.js";
import { CSSProp } from "../../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { convertWireDataToInt, bitToString } from "../../Simulator/NumberHelpers.fs.js";
import { viewFilledNum } from "../MemoryEditorView.fs.js";
import { Option as Option_1, h5 } from "../../fable_modules/Fulma.2.16.0/Elements/Heading.fs.js";
import { viewSimulationError, setSimErrorFeedback, simulateModel } from "../SimulationView.fs.js";
import { SheetT_Msg } from "../../Model/DrawModelType.fs.js";
import { Option as Option_2, notification } from "../../fable_modules/Fulma.2.16.0/Elements/Notification.fs.js";
import { errorPropsNotification } from "../Notifications.fs.js";

/**
 * Updates MergeWires and SplitWire Component labels to MWx/SWx.
 * Previous Issie versions had empty labels for these components.
 */
export function updateMergeSplitWireLabels(model, dispatch) {
    let value, value_1;
    const symModel = model.Sheet.Wire.Symbol;
    const mwStartLabel = generateLabel(symModel, new ComponentType(27, []));
    let mwIdx = ((value = mwStartLabel[mwStartLabel.length - 1], value.charCodeAt(0))) - 48;
    const swStartLabel = generateLabel(symModel, new ComponentType(28, [1]));
    let swIdx = ((value_1 = swStartLabel[swStartLabel.length - 1], value_1.charCodeAt(0))) - 48;
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    iterate((c) => {
        const matchValue = c.Type;
        const matchValue_1 = c.Label;
        let matchResult;
        switch (matchValue.tag) {
            case 27: {
                switch (matchValue_1) {
                    case "":
                    case "L": {
                        matchResult = 0;
                        break;
                    }
                    default:
                        matchResult = 2;
                }
                break;
            }
            case 28: {
                switch (matchValue_1) {
                    case "":
                    case "L": {
                        matchResult = 1;
                        break;
                    }
                    default:
                        matchResult = 2;
                }
                break;
            }
            default:
                matchResult = 2;
        }
        switch (matchResult) {
            case 0: {
                let newLabel;
                const arg = mwIdx | 0;
                newLabel = toText(printf("MW%i"))(arg);
                mwIdx = ((mwIdx + 1) | 0);
                setComponentLabel(model, sheetDispatch, c, newLabel);
                break;
            }
            case 1: {
                let newLabel_1;
                const arg_1 = swIdx | 0;
                newLabel_1 = toText(printf("SW%i"))(arg_1);
                swIdx = ((swIdx + 1) | 0);
                setComponentLabel(model, sheetDispatch, c, newLabel_1);
                break;
            }
            case 2: {
                break;
            }
        }
    }, DrawModelType_SheetT_Model__Model_GetCanvasState(model.Sheet)[0]);
}

/**
 * From a Connection Id and a list of all Connections, return the Ids for the source
 * and target ports of Connection described by the Connection Id.
 */
export function getPortIdsfromConnectionId(cid, conns) {
    return fold((pIds, c) => {
        if (c.Id === toString(cid)) {
            return append(pIds, ofArray([c.Source.Id, c.Target.Id]));
        }
        else {
            return pIds;
        }
    }, empty(), conns);
}

/**
 * Returns true if the provided port is present in any of the connections in the
 * Connection list.
 */
export function isPortInConnections(port, conns) {
    return fold((b, c) => {
        if ((port.Id === c.Source.Id) ? true : (port.Id === c.Target.Id)) {
            return true;
        }
        else {
            return b;
        }
    }, false, conns);
}

/**
 * Returns true if the provided port is present in any of the components in the
 * Component list.
 */
export function isPortInComponents(port, comps) {
    return fold((b, c) => {
        const compPortIds = map((p) => p.Id, append(c.InputPorts, c.OutputPorts));
        if (contains(port.Id, compPortIds, {
            Equals: (x, y) => (x === y),
            GetHashCode: stringHash,
        })) {
            return true;
        }
        else {
            return b;
        }
    }, false, comps);
}

/**
 * Partitions a list of results into a list of Ok and list of Error
 */
export function partitionResults(results) {
    const filter = (lst_mut, success_mut, error_mut) => {
        filter:
        while (true) {
            const lst = lst_mut, success = success_mut, error = error_mut;
            if (!isEmpty(lst)) {
                const copyOfStruct = head(lst);
                if (copyOfStruct.tag === 1) {
                    const e = copyOfStruct.fields[0];
                    const tl_1 = tail(lst);
                    lst_mut = tl_1;
                    success_mut = success;
                    error_mut = append(error, singleton(e));
                    continue filter;
                }
                else {
                    const c = copyOfStruct.fields[0];
                    const tl = tail(lst);
                    lst_mut = tl;
                    success_mut = append(success, singleton(c));
                    error_mut = error;
                    continue filter;
                }
            }
            else {
                return [success, error];
            }
            break;
        }
    };
    return filter(results, empty(), empty());
}

/**
 * Fills in internal connections between any two selected components.
 * This makes a contiguous circuit. This allows truth tables to be selected via comnponents only.
 */
export function addInternalConnections(_arg2_, _arg2__1, _arg1_, _arg1__1) {
    const _arg = [_arg2_, _arg2__1];
    const _arg_1 = [_arg1_, _arg1__1];
    const conns = _arg[1];
    const comps = _arg[0];
    const wholeCanvasConns = _arg_1[1];
    const wholeCanvasComps = _arg_1[0];
    const circuitPorts = map((port) => port.Id, collect((comp) => append(comp.InputPorts, comp.OutputPorts), comps));
    const shouldAdd = (conn) => {
        if (!contains(conn, conns, {
            Equals: equals,
            GetHashCode: safeHash,
        }) && contains(conn.Source.Id, circuitPorts, {
            Equals: (x_1, y_1) => (x_1 === y_1),
            GetHashCode: stringHash,
        })) {
            return contains(conn.Target.Id, circuitPorts, {
                Equals: (x_2, y_2) => (x_2 === y_2),
                GetHashCode: stringHash,
            });
        }
        else {
            return false;
        }
    };
    const addedConns = filter_1(shouldAdd, wholeCanvasConns);
    return [comps, append(addedConns, conns)];
}

/**
 * Corrects the Selected Canvas State by adding extra connections and IOs to components
 * not connected to anything. On success returns a new, corrected CanvasState compatible
 * with Step Simulator. On failure returns SimulationError.
 */
export function correctCanvasState(selectedCanvasState_, selectedCanvasState__1, wholeCanvasState_, wholeCanvasState__1) {
    const selectedCanvasState = [selectedCanvasState_, selectedCanvasState__1];
    const wholeCanvasState = [wholeCanvasState_, wholeCanvasState__1];
    const patternInput = addInternalConnections(selectedCanvasState[0], selectedCanvasState[1], wholeCanvasState[0], wholeCanvasState[1]);
    const connections = patternInput[1];
    const components = patternInput[0];
    const dummyInputPort = new Port("DummyIn", void 0, new PortType(0, []), "DummyIn_Host");
    const dummyOutputPort = new Port("DummyOut", void 0, new PortType(1, []), "DummyOut_Host");
    let portWidths;
    const matchValue = inferConnectionsWidth(wholeCanvasState[0], wholeCanvasState[1]);
    if (matchValue.tag === 1) {
        const e = matchValue.fields[0];
        portWidths = (new FSharpResult$2(1, [e]));
    }
    else {
        const cw = matchValue.fields[0];
        portWidths = (new FSharpResult$2(0, [ofList(fold((acc, tupledArg) => {
            const cid = tupledArg[0];
            const widthopt = tupledArg[1];
            const pIdEntries = map((pId) => [pId, widthopt], getPortIdsfromConnectionId(cid, wholeCanvasState[1]));
            return append(acc, pIdEntries);
        }, empty(), toList(cw)), {
            Compare: comparePrimitives,
        })]));
    }
    const getPortWidth$0027 = (port) => ((pw) => ((run) => {
        let w;
        const pId_1 = port.Id;
        const matchValue_1 = tryFind(pId_1, pw);
        return (matchValue_1 == null) ? getPortWidthFromComponent(port)(pw)(run) : ((value_2(matchValue_1) == null) ? toFail(printf("what? WidthInferrer did not infer a width for a port")) : ((w = (value_2(matchValue_1) | 0), w)));
    }));
    const getPortWidthFromComponent = (port_1) => ((pw_1) => ((run_1) => {
        let comp;
        let hostComponent;
        const _arg = filter_1((c) => (port_1.HostId === c.Id), components);
        hostComponent = (isEmpty(_arg) ? toFail(printf("what? Port HostId does not match any ComponentIds in model")) : (isEmpty(tail(_arg)) ? ((comp = head(_arg), comp)) : toFail(printf("what? Port HostId matches multiple ComponentIds in model"))));
        const matchValue_2 = hostComponent.Type;
        let matchResult, w_1;
        switch (matchValue_2.tag) {
            case 8:
            case 10: {
                matchResult = 0;
                break;
            }
            case 3: {
                matchResult = 2;
                break;
            }
            case 26: {
                matchResult = 3;
                break;
            }
            case 48: {
                matchResult = 1;
                w_1 = matchValue_2.fields[0];
                break;
            }
            case 1: {
                matchResult = 1;
                w_1 = matchValue_2.fields[0];
                break;
            }
            case 49: {
                matchResult = 1;
                w_1 = matchValue_2.fields[0];
                break;
            }
            case 47: {
                matchResult = 1;
                w_1 = matchValue_2.fields[0];
                break;
            }
            case 6: {
                matchResult = 1;
                w_1 = matchValue_2.fields[0];
                break;
            }
            case 17: {
                matchResult = 1;
                w_1 = matchValue_2.fields[0];
                break;
            }
            case 21: {
                matchResult = 1;
                w_1 = matchValue_2.fields[0];
                break;
            }
            default:
                matchResult = 4;
        }
        switch (matchResult) {
            case 0:
                return 1;
            case 1:
                return w_1;
            case 2:
                if (run_1 > 0) {
                    return void 0;
                }
                else {
                    const otherPort = equals(port_1.PortType, new PortType(0, [])) ? head(hostComponent.OutputPorts) : head(hostComponent.InputPorts);
                    return getPortWidth$0027(otherPort)(pw_1)(run_1 + 1);
                }
            case 3: {
                const c_1 = matchValue_2.fields[0];
                const indexInput = tryFindIndex((p) => (p.Id === port_1.Id), hostComponent.InputPorts);
                const indexOutput = tryFindIndex((p_1) => (p_1.Id === port_1.Id), hostComponent.OutputPorts);
                let matchResult_1, i, o;
                if (indexInput == null) {
                    if (indexOutput != null) {
                        matchResult_1 = 1;
                        o = indexOutput;
                    }
                    else {
                        matchResult_1 = 2;
                    }
                }
                else if (indexOutput == null) {
                    matchResult_1 = 0;
                    i = indexInput;
                }
                else {
                    matchResult_1 = 2;
                }
                switch (matchResult_1) {
                    case 0:
                        return item(i, c_1.InputLabels)[1];
                    case 1:
                        return item(o, c_1.OutputLabels)[1];
                    default:
                        return void 0;
                }
            }
            default:
                return void 0;
        }
    }));
    const getPortWidth = (port_2) => {
        if (portWidths.tag === 0) {
            const pw_2 = portWidths.fields[0];
            return new FSharpResult$2(0, [getPortWidth$0027(port_2)(pw_2)(0)]);
        }
        else {
            const e_1 = portWidths.fields[0];
            return new FSharpResult$2(1, [e_1]);
        }
    };
    const inferIOLabel = (port_3) => {
        let comp_1;
        let hostComponent_1;
        const _arg_1 = filter_1((c_2) => (port_3.HostId === c_2.Id), components);
        hostComponent_1 = (isEmpty(_arg_1) ? toFail(printf("what? Port HostId does not match any ComponentIds in model")) : (isEmpty(tail(_arg_1)) ? ((comp_1 = head(_arg_1), comp_1)) : toFail(printf("what? Port HostId matches multiple ComponentIds in model"))));
        let portOnComponent;
        const matchValue_4 = port_3.PortNumber;
        if (matchValue_4 == null) {
            const _arg_2 = filter_1((cp) => (port_3.Id === cp.Id), collect((c_3) => append(c_3.InputPorts, c_3.OutputPorts), components));
            let matchResult_2, p_2;
            if (!isEmpty(_arg_2)) {
                if (isEmpty(tail(_arg_2))) {
                    matchResult_2 = 0;
                    p_2 = head(_arg_2);
                }
                else {
                    matchResult_2 = 1;
                }
            }
            else {
                matchResult_2 = 1;
            }
            switch (matchResult_2) {
                case 0: {
                    portOnComponent = p_2;
                    break;
                }
                default:
                    portOnComponent = toFail(printf("what? connection port does not map to a component port"));
            }
        }
        else {
            const n = matchValue_4 | 0;
            portOnComponent = port_3;
        }
        const matchValue_5 = portOnComponent.PortNumber;
        if (matchValue_5 != null) {
            if (port_3.PortType.tag === 1) {
                const pn_1 = matchValue_5 | 0;
                const matchValue_9 = portNames(hostComponent_1.Type);
                if (isEmpty(matchValue_9[1])) {
                    if (length(hostComponent_1.OutputPorts) > 1) {
                        return (hostComponent_1.Label + "_OUT") + int32ToString(pn_1);
                    }
                    else {
                        return hostComponent_1.Label + "_OUT";
                    }
                }
                else {
                    const lst_1 = matchValue_9[1];
                    if (pn_1 >= length(lst_1)) {
                        return toFail(printf("what? output PortNumber is greater than number of output port names on component"));
                    }
                    else {
                        const offset = length(hostComponent_1.InputPorts) | 0;
                        return item(pn_1, lst_1);
                    }
                }
            }
            else {
                const pn = matchValue_5 | 0;
                const matchValue_8 = portNames(hostComponent_1.Type);
                if (isEmpty(matchValue_8[0])) {
                    if (length(hostComponent_1.InputPorts) > 1) {
                        return (hostComponent_1.Label + "_IN") + int32ToString(pn);
                    }
                    else {
                        return hostComponent_1.Label + ".IN";
                    }
                }
                else {
                    const lst = matchValue_8[0];
                    if (pn >= length(lst)) {
                        return toFail(printf("what? input PortNumber is greater than number of input port names on component"));
                    }
                    else {
                        return item(pn, lst);
                    }
                }
            }
        }
        else {
            return toFail(printf("what? no PortNumber. A connection port was probably passed to inferIOLabel"));
        }
    };
    const removeDuplicateConnections = (tupledArg_1) => {
        const comps = tupledArg_1[0];
        const conns = tupledArg_1[1];
        const checkDuplicate = (con, lst_2) => exists((c_4) => {
            if (equals(c_4.Source, con.Source) && !isPortInComponents(c_4.Target, comps)) {
                return !isPortInComponents(con.Target, comps);
            }
            else {
                return false;
            }
        }, lst_2);
        return [comps, fold((acc_1, con_1) => {
            if (isEmpty(acc_1)) {
                return singleton(con_1);
            }
            else {
                const lst_3 = acc_1;
                if (checkDuplicate(con_1, lst_3)) {
                    return lst_3;
                }
                else {
                    return cons(con_1, lst_3);
                }
            }
        }, empty(), conns)];
    };
    const addExtraConnections = (tupledArg_2) => {
        const comps_1 = tupledArg_2[0];
        const conns_1 = tupledArg_2[1];
        return [comps_1, fold((acc_2, comp_2) => {
            const extraInputConns = map((p_4) => (new Connection(uuid(), dummyOutputPort, new Port(p_4.Id, void 0, p_4.PortType, p_4.HostId), singleton([0, 0, false]))), filter_1((p_3) => !isPortInConnections(p_3, conns_1), comp_2.InputPorts));
            const extraOutputConns = map((p_6) => (new Connection(uuid(), new Port(p_6.Id, void 0, p_6.PortType, p_6.HostId), dummyInputPort, singleton([0, 0, false]))), filter_1((p_5) => !isPortInConnections(p_5, conns_1), comp_2.OutputPorts));
            return append(acc_2, append(extraInputConns, extraOutputConns));
        }, conns_1, comps_1)];
    };
    const getUniqueNamesMap = (acc_3) => {
        const allLabels = collect((res) => {
            if (res.tag === 1) {
                const e_2 = res.fields[0];
                return empty();
            }
            else {
                const comp_3 = res.fields[0];
                return singleton(comp_3.Label);
            }
        }, acc_3);
        const shortLabels = map((s) => {
            const index = s.indexOf(".") | 0;
            const len = s.length | 0;
            if (index === -1) {
                return s;
            }
            else {
                return s.slice(index + 1, (len - 1) + 1);
            }
        }, allLabels);
        if (length(shortLabels) === length(List_distinct(shortLabels, {
            Equals: (x_1, y_1) => (x_1 === y_1),
            GetHashCode: stringHash,
        }))) {
            return ofList(zip(allLabels, shortLabels), {
                Compare: comparePrimitives,
            });
        }
        else {
            return ofList(zip(allLabels, allLabels), {
                Compare: comparePrimitives,
            });
        }
    };
    const addExtraIOs = (tupledArg_3) => {
        const comps_2 = tupledArg_3[0];
        const conns_2 = tupledArg_3[1];
        const compsOk = map((c_5) => (new FSharpResult$2(0, [c_5])), comps_2);
        let result;
        const tupledArg_4 = mapFold((acc_4, con_2) => {
            if (!isPortInComponents(con_2.Source, comps_2) && !isPortInComponents(con_2.Target, comps_2)) {
                const error = new SimulationError(new SimulationErrorType(17, ["Selected logic includes a wire connected to no components."]), void 0, empty(), singleton(con_2.Id));
                return [new FSharpResult$2(1, [error]), acc_4];
            }
            else if (!isPortInComponents(con_2.Source, comps_2)) {
                const matchValue_10 = getPortWidth(con_2.Target);
                if (matchValue_10.tag === 1) {
                    const e_3 = matchValue_10.fields[0];
                    const error_2 = new SimulationError(new SimulationErrorType(6, [e_3.Msg]), void 0, empty(), e_3.ConnectionsAffected);
                    return [new FSharpResult$2(0, [con_2]), append(acc_4, singleton(new FSharpResult$2(1, [error_2])))];
                }
                else if (matchValue_10.fields[0] == null) {
                    const error_1 = new SimulationError(new SimulationErrorType(6, ["Could not infer the width for an input into the selected logic."]), void 0, singleton(con_2.Target.HostId), empty());
                    return [new FSharpResult$2(0, [con_2]), append(acc_4, singleton(new FSharpResult$2(1, [error_1])))];
                }
                else {
                    const pw_3 = matchValue_10.fields[0] | 0;
                    const newId = uuid();
                    const newLabel = inferIOLabel(con_2.Target);
                    const newPort = new Port(uuid(), 0, new PortType(1, []), newId);
                    const extraInput = new Component(newId, new ComponentType(0, [pw_3, void 0]), newLabel, empty(), singleton(newPort), 0, 0, 0, 0, void 0);
                    return [new FSharpResult$2(0, [new Connection(con_2.Id, new Port(newPort.Id, void 0, newPort.PortType, newPort.HostId), con_2.Target, con_2.Vertices)]), append(acc_4, singleton(new FSharpResult$2(0, [extraInput])))];
                }
            }
            else if (!isPortInComponents(con_2.Target, comps_2)) {
                const matchValue_11 = getPortWidth(con_2.Source);
                if (matchValue_11.tag === 1) {
                    const e_4 = matchValue_11.fields[0];
                    const error_4 = new SimulationError(new SimulationErrorType(6, [e_4.Msg]), void 0, empty(), e_4.ConnectionsAffected);
                    return [new FSharpResult$2(0, [con_2]), append(acc_4, singleton(new FSharpResult$2(1, [error_4])))];
                }
                else if (matchValue_11.fields[0] == null) {
                    const error_3 = new SimulationError(new SimulationErrorType(6, ["Could not infer the width for an output produced by the selected logic."]), void 0, singleton(con_2.Source.HostId), empty());
                    return [new FSharpResult$2(0, [con_2]), append(acc_4, singleton(new FSharpResult$2(1, [error_3])))];
                }
                else {
                    const pw_4 = matchValue_11.fields[0] | 0;
                    const newId_1 = uuid();
                    const newLabel_1 = inferIOLabel(con_2.Source);
                    const newPort_1 = new Port(uuid(), 0, new PortType(0, []), newId_1);
                    const extraOutput = new Component(newId_1, new ComponentType(1, [pw_4]), newLabel_1, singleton(newPort_1), empty(), 0, 0, 0, 0, void 0);
                    return [new FSharpResult$2(0, [new Connection(con_2.Id, con_2.Source, new Port(newPort_1.Id, void 0, newPort_1.PortType, newPort_1.HostId), con_2.Vertices)]), append(acc_4, singleton(new FSharpResult$2(0, [extraOutput])))];
                }
            }
            else {
                return [new FSharpResult$2(0, [con_2]), acc_4];
            }
        }, compsOk, conns_2);
        const a = tupledArg_4[0];
        const b = tupledArg_4[1];
        result = [b, a];
        const resComps = result[0];
        const resConns = result[1];
        const uniqueNamesMap = getUniqueNamesMap(result[0]);
        const resCompsFixedNames = map((res_1) => {
            if (res_1.tag === 1) {
                const e_5 = res_1.fields[0];
                return new FSharpResult$2(1, [e_5]);
            }
            else {
                const comp_4 = res_1.fields[0];
                return new FSharpResult$2(0, [new Component(comp_4.Id, comp_4.Type, FSharpMap__get_Item(uniqueNamesMap, comp_4.Label), comp_4.InputPorts, comp_4.OutputPorts, comp_4.X, comp_4.Y, comp_4.H, comp_4.W, comp_4.SymbolInfo)]);
            }
        }, resComps);
        return [resCompsFixedNames, resConns];
    };
    const checkCanvasWasCorrected = (tupledArg_5) => {
        const compsRes = tupledArg_5[0];
        const connsRes = tupledArg_5[1];
        const patternInput_1 = partitionResults(compsRes);
        const comps_3 = patternInput_1[0];
        const compErrors = patternInput_1[1];
        const patternInput_2 = partitionResults(connsRes);
        const conns_3 = patternInput_2[0];
        const connErrors = patternInput_2[1];
        if (!isEmpty(compErrors)) {
            const tl = tail(compErrors);
            const e_6 = head(compErrors);
            return new FSharpResult$2(1, [e_6]);
        }
        else if (!isEmpty(connErrors)) {
            const tl_1 = tail(connErrors);
            const e_7 = head(connErrors);
            return new FSharpResult$2(1, [e_7]);
        }
        else {
            return new FSharpResult$2(0, [[comps_3, conns_3]]);
        }
    };
    return checkCanvasWasCorrected(addExtraIOs(addExtraConnections(removeDuplicateConnections([components, connections]))));
}

export class SelectionCache extends Record {
    constructor(UncorrectedCanvas, CorrectedCanvas, StoredResult) {
        super();
        this.UncorrectedCanvas = UncorrectedCanvas;
        this.CorrectedCanvas = CorrectedCanvas;
        this.StoredResult = StoredResult;
    }
}

export function SelectionCache_$reflection() {
    return record_type("TruthTableView.SelectionCache", [], SelectionCache, () => [["UncorrectedCanvas", tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))], ["CorrectedCanvas", tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))], ["StoredResult", union_type("Microsoft.FSharp.Core.FSharpResult`2", [SimulationData_$reflection(), SimulationError_$reflection()], FSharpResult$2, () => [[["ResultValue", SimulationData_$reflection()]], [["ErrorValue", SimulationError_$reflection()]]])]]);
}

export const emptySelCache = new SelectionCache([empty(), empty()], [empty(), empty()], new FSharpResult$2(0, [new SimulationData((toConsole(printf("creating empty selcache")), simulationPlaceholder), empty_1({
    Compare: compare,
}), empty(), empty(), false, new NumberBase(0, []), 0)]));

export let selCache = createAtom(emptySelCache);

/**
 * Make and return Simulation Data (or Simulation Error) for the model for selected components.
 * Identical functionality to SimulationView.makeSimData, but only considers selected components.
 * Includes memoization: if the selected components have not changed then the cached corrected
 * canvas and simulation are returned.
 */
export function makeSimDataSelected(model) {
    let tupledArg;
    const patternInput = DrawModelType_SheetT_Model__Model_get_GetSelectedCanvasState(model.Sheet);
    const selConnections = patternInput[1];
    const selComponents = patternInput[0];
    const wholeCanvas = DrawModelType_SheetT_Model__Model_GetCanvasState(model.Sheet);
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        if (isEmpty(selComponents)) {
            if (isEmpty(selConnections)) {
                return void 0;
            }
            else {
                const affected = map((c) => c.Id, selConnections);
                return [new FSharpResult$2(1, [new SimulationError(new SimulationErrorType(17, ["Only connections selected. Please select a combination of connections and components."]), void 0, empty(), affected)]), [selComponents, selConnections]];
            }
        }
        else {
            const project = matchValue;
            const selComps = selComponents;
            const selConns = selConnections;
            const state = [selComponents, selConnections];
            if ((tupledArg = selCache().UncorrectedCanvas, stateIsEqual(state[0], state[1], tupledArg[0], tupledArg[1]))) {
                return [selCache().StoredResult, selCache().CorrectedCanvas];
            }
            else {
                const selLoadedComponents = filter_1((comp) => (comp.Name !== project.OpenFileName), project.LoadedComponents);
                const matchValue_2 = correctCanvasState(selComps, selConns, wholeCanvas[0], wholeCanvas[1]);
                if (matchValue_2.tag === 0) {
                    const correctConns = matchValue_2.fields[0][1];
                    const correctComps = matchValue_2.fields[0][0];
                    const matchValue_3 = analyseState(correctComps, correctConns, selLoadedComponents);
                    if (matchValue_3[0] == null) {
                        const sim = startCircuitSimulationFData(2, project.OpenFileName, correctComps, correctConns, selLoadedComponents);
                        const newState = [correctComps, correctConns];
                        selCache(new SelectionCache(state, newState, sim));
                        return [sim, newState];
                    }
                    else {
                        const e_1 = matchValue_3[0];
                        return [new FSharpResult$2(1, [e_1]), [correctComps, correctConns]];
                    }
                }
                else {
                    const e = matchValue_2.fields[0];
                    selCache(new SelectionCache(state, [selComponents, selConnections], new FSharpResult$2(1, [e])));
                    return [new FSharpResult$2(1, [e]), [selComps, selConns]];
                }
            }
        }
    }
    else {
        return void 0;
    }
}

export function makeSortingArrows(io, sortInfo, dispatch) {
    let cio_1, cio;
    const patternInput = (sortInfo != null) ? ((sortInfo[1].tag === 1) ? ((cio_1 = sortInfo[0], [false, equals(cio_1, io)])) : ((cio = sortInfo[0], [equals(cio, io), false]))) : [false, false];
    const upSel = patternInput[0];
    const downSel = patternInput[1];
    const upArrow = button(toList_1(delay(() => append_1(singleton_1(new Option(17, [singleton(sortArrowStyle)])), delay(() => append_1(upSel ? singleton_1(new Option(0, [new Color_IColor(5, [])])) : empty_2(), delay(() => singleton_1(new Option(18, [(_arg) => {
        dispatch(new TTMsg(16, [[io, new SortType(0, [])]]));
    }])))))))), singleton("▲"));
    const downArrow = button(toList_1(delay(() => append_1(singleton_1(new Option(17, [singleton(sortArrowStyle)])), delay(() => append_1(downSel ? singleton_1(new Option(0, [new Color_IColor(5, [])])) : empty_2(), delay(() => singleton_1(new Option(18, [(_arg_1) => {
        dispatch(new TTMsg(16, [[io, new SortType(1, [])]]));
    }])))))))), singleton("▼"));
    return react.createElement("div", {}, upArrow, downArrow);
}

export function makeColumnMoveArrows(io, headingEl, dispatch) {
    const leftArrow = button(ofArray([new Option(17, [singleton(colMoveArrowStyle)]), new Option(18, [(_arg) => {
        dispatch(new TTMsg(17, [[io, new MoveDirection(0, [])]]));
    }])]), singleton("<"));
    const rightArrow = button(ofArray([new Option(17, [singleton(colMoveArrowStyle)]), new Option(18, [(_arg_1) => {
        dispatch(new TTMsg(17, [[io, new MoveDirection(1, [])]]));
    }])]), singleton(">"));
    const children = [makeElementLine(singleton(leftArrow), singleton(rightArrow)), headingEl];
    return react.createElement("div", {}, ...children);
}

function makeMenuGroup(openDefault, title, menuList) {
    const children_2 = [react.createElement("summary", keyValueList([menuLabelStyle], 1), title), list_17(empty(), menuList)];
    return react.createElement("details", {
        open: openDefault,
    }, ...children_2);
}

export function viewOutputHider(table, hidden, dispatch) {
    const makeToggleRow = (io) => {
        const isChecked = !contains(io, hidden, {
            Equals: equals,
            GetHashCode: safeHash,
        });
        const changeAction = (_arg) => {
            dispatch(new TTMsg(13, [io]));
        };
        const toggle = makeOnOffToggle(isChecked, changeAction, "Visible", "Hidden");
        const ioLabel = CellIO__get_getLabel(io);
        return (elsRightAlign) => makeElementLine(ofArray([ioLabel, toggle]), elsRightAlign);
    };
    if (FSharpMap__get_IsEmpty(table.FilteredMap)) {
        return react.createElement("div", {}, "No Rows in Truth Table");
    }
    else {
        let preamble;
        const children_2 = ["Hide or Un-hide Output or Viewer columns in the Truth Table.", react.createElement("br", {}), react.createElement("br", {})];
        preamble = react.createElement("div", {}, ...children_2);
        const toggleRows = map((cell) => makeToggleRow(cell.IO)(empty()), head(toList(table.TableMap))[1]);
        return react.createElement("div", {}, ...cons(preamble, toggleRows));
    }
}

export function viewCellAsHeading(dispatch, sortInfo, styleInfo, cell) {
    const addMoveArrows = (el) => makeColumnMoveArrows(cell.IO, el, dispatch);
    let cellStyle;
    const matchValue = tryFind(cell.IO, styleInfo);
    if (matchValue != null) {
        const s = matchValue;
        cellStyle = ["style", keyValueList(cons(new CSSProp(165, ["bold"]), append(s, singleton(new CSSProp(42, ["3px solid black"])))), 1)];
    }
    else {
        cellStyle = toFail(printf("what? IO %A not found in Grid Styles"))(cell.IO);
    }
    const matchValue_1 = cell.IO;
    if (matchValue_1.tag === 1) {
        const width = matchValue_1.fields[1] | 0;
        const label_1 = matchValue_1.fields[0][0];
        const fullName = matchValue_1.fields[0][1];
        let headingEl;
        const r = label_1;
        headingEl = ((fullName !== "") ? addToolTipTop(fullName, r) : r);
        const children_2 = [addMoveArrows(makeElementLine(singleton(headingEl), singleton(makeSortingArrows(cell.IO, sortInfo, dispatch))))];
        return react.createElement("div", keyValueList([cellStyle], 1), ...children_2);
    }
    else {
        const label = matchValue_1.fields[0][1];
        const headingText = toString(label);
        const children = [addMoveArrows(makeElementLine(singleton(headingText), singleton(makeSortingArrows(cell.IO, sortInfo, dispatch))))];
        return react.createElement("div", keyValueList([cellStyle], 1), ...children);
    }
}

export function viewRowAsData(numBase, styleInfo, i, row) {
    const viewCellAsData = (cell) => {
        let s, s_1;
        let cellStyle;
        const matchValue = tryFind(cell.IO, styleInfo);
        const matchValue_1 = (i % 2) | 0;
        cellStyle = ((matchValue != null) ? ((matchValue_1 === 1) ? ((s = matchValue, ["style", keyValueList(cons(new CSSProp(21, ["whitesmoke"]), s), 1)])) : ((s_1 = matchValue, ["style", keyValueList(s_1, 1)]))) : toFail(printf("what? IO %A not found in Grid Styles"))(cell.IO));
        const matchValue_3 = cell.Data;
        switch (matchValue_3.tag) {
            case 1: {
                const a = matchValue_3.fields[0];
                return react.createElement("div", keyValueList([cellStyle], 1), a);
            }
            case 2:
                return react.createElement("div", keyValueList([cellStyle], 1), "X");
            default:
                if (!isEmpty(matchValue_3.fields[0])) {
                    if (isEmpty(tail(matchValue_3.fields[0]))) {
                        const bit = head(matchValue_3.fields[0]);
                        const children = [bitToString(bit)];
                        return react.createElement("div", keyValueList([cellStyle], 1), ...children);
                    }
                    else {
                        const bits = matchValue_3.fields[0];
                        const width = length(bits) | 0;
                        const value = viewFilledNum(width, numBase)(convertWireDataToInt(bits));
                        return react.createElement("div", keyValueList([cellStyle], 1), value);
                    }
                }
                else {
                    return toFail(printf("what? Empty WireData in TruthTable"));
                }
        }
    };
    const cells = map(viewCellAsData, row);
    return cells;
}

export function viewTruthTableError(simError) {
    let error;
    const matchValue = simError.InDependency;
    if (matchValue != null) {
        const dep = matchValue;
        const children_2 = [("Error found in dependency \"" + dep) + "\":", react.createElement("br", {}), errMsg(simError.ErrType), react.createElement("br", {}), "Please fix the error in the dependency and retry."];
        error = react.createElement("div", {}, ...children_2);
    }
    else {
        const children = [errMsg(simError.ErrType), react.createElement("br", {}), "Please fix the error and retry."];
        error = react.createElement("div", {}, ...children);
    }
    const children_4 = [h5(singleton(new Option_1(9, [singleton(["style", {
        marginTop: "15px",
    }])])))(singleton("Errors")), error];
    return react.createElement("div", {}, ...children_4);
}

export function viewTruthTableData(table, model, dispatch) {
    const matchValue = model.TTConfig.GridCache;
    if (matchValue == null) {
        const tLst = table.SortedListRep;
        const sortInfo = model.TTConfig.SortType;
        const styleInfo = model.TTConfig.GridStyles;
        if (isEmpty(tLst)) {
            return react.createElement("div", {}, "No Rows in Truth Table");
        }
        else {
            const headings = map((cell) => viewCellAsHeading(dispatch, sortInfo, styleInfo, cell), head(tLst));
            const body = concat(mapIndexed((i, row) => viewRowAsData(table.TableSimData.NumberBase, styleInfo, i, row), tLst));
            const all = append(headings, body);
            let grid_1;
            const props_2 = [ttGridContainerStyle(model)];
            grid_1 = react.createElement("div", keyValueList(props_2, 1), ...all);
            dispatch(new TTMsg(21, [grid_1]));
            return grid_1;
        }
    }
    else {
        const grid = matchValue;
        return grid;
    }
}

export function restartTruthTable(canvasState_, canvasState__1, model, dispatch, _arg) {
    const canvasState = [canvasState_, canvasState__1];
    const ttDispatch = (ttMsg) => {
        dispatch(new Msg(27, [ttMsg]));
    };
    const wholeSimRes = simulateModel(void 0, 2, canvasState[0], canvasState[1], model);
    const copyOfStruct = wholeSimRes[0];
    if (copyOfStruct.tag === 0) {
    }
    else {
        const simError = copyOfStruct.fields[0];
        setSimErrorFeedback(simError, model, dispatch);
    }
    ttDispatch(new TTMsg(0, [wholeSimRes]));
}

export function viewTruthTable(canvasState_, canvasState__1, model, dispatch) {
    let s_9, s_11, copyOfStruct, sd, simError, copyOfStruct_1, sd_1, simError_1;
    const canvasState = [canvasState_, canvasState__1];
    const ttDispatch = (ttMsg) => {
        dispatch(new Msg(27, [ttMsg]));
    };
    updateMergeSplitWireLabels(model, dispatch);
    const matchValue = model.CurrentTruthTable;
    if (matchValue != null) {
        const tableopt = matchValue;
        const closeTruthTable = (_arg_6) => {
            dispatch(new Msg(1, [new SheetT_Msg(26, [])]));
            dispatch(new Msg(67, []));
            ttDispatch(new TTMsg(6, []));
        };
        let body;
        if (tableopt.tag === 0) {
            const table = tableopt.fields[0];
            const truncation = notification(ofArray([new Option_2(0, [new Color_IColor(7, [])]), new Option_2(1, [])]), singleton((s_9 = "Due to a large number of input combinations, caused by inputs that are\n                            too wide or too numerous, the truth table has been truncated. Please use\n                            more restrictive input constraints, or set wider inputs as algebraic variables.", s_9)));
            const children_4 = toList_1(delay(() => append_1(table.IsTruncated ? singleton_1(truncation) : empty_2(), delay(() => append_1(singleton_1(viewReductions(table, model, dispatch)), delay(() => append_1(singleton_1(react.createElement("br", {})), delay(() => append_1(singleton_1(react.createElement("br", {})), delay(() => singleton_1(viewTruthTableData(table, model, ttDispatch))))))))))));
            body = react.createElement("div", {}, ...children_4);
        }
        else {
            const e = tableopt.fields[0];
            body = viewSimulationError(canvasState[0], canvasState[1], e, model, new SimSubTab(1, []), dispatch);
        }
        let constraints;
        if (tableopt.tag === 0) {
            const children_8 = [viewConstraints(model, dispatch)];
            constraints = react.createElement("div", {}, ...children_8);
        }
        else {
            constraints = react.createElement("div", {});
        }
        let hidden;
        if (tableopt.tag === 0) {
            const table_1 = tableopt.fields[0];
            const children_12 = [viewOutputHider(table_1, model.TTConfig.HiddenColumns, ttDispatch)];
            hidden = react.createElement("div", {}, ...children_12);
        }
        else {
            hidden = react.createElement("div", {});
        }
        const menu = menu_1(empty(), ofArray([makeMenuGroup(false, "Filter", ofArray([constraints, react.createElement("br", {}), react.createElement("hr", {})])), makeMenuGroup(false, "Hide/Un-hide Columns", ofArray([hidden, react.createElement("br", {}), react.createElement("hr", {})])), makeMenuGroup(true, "Truth Table", ofArray([body, react.createElement("br", {}), react.createElement("hr", {})]))]));
        const children_14 = [button(ofArray([new Option(0, [new Color_IColor(8, [])]), new Option(18, [closeTruthTable])]), singleton("Close Truth Table")), react.createElement("br", {}), react.createElement("br", {}), (s_11 = "The Truth Table generator uses the diagram as it was at the moment of\n                 pressing the \"Generate Truth Table\" button.", s_11), menu];
        return react.createElement("div", {}, ...children_14);
    }
    else {
        const wholeSimRes = simulateModel(void 0, 2, canvasState[0], canvasState[1], model);
        const wholeButton = (copyOfStruct = wholeSimRes[0], (copyOfStruct.tag === 0) ? ((sd = copyOfStruct.fields[0], (sd.IsSynchronous === false) ? button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_1) => {
            ttDispatch(new TTMsg(0, [wholeSimRes]));
        }])]), singleton("Generate Truth Table")) : button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(15, []), new Option(18, [(_arg_2) => {
            const popup = errorPropsNotification("Truth Table generation only supported for Combinational Logic");
            dispatch(new Msg(66, [popup]));
        }])]), singleton("Generate Truth Table")))) : ((simError = copyOfStruct.fields[0], button(ofArray([new Option(0, [new Color_IColor(7, [])]), new Option(18, [(_arg) => {
            setSimErrorFeedback(simError, model, dispatch);
            ttDispatch(new TTMsg(0, [wholeSimRes]));
        }])]), singleton("See Problems")))));
        const selSimRes = makeSimDataSelected(model);
        const selButton = (selSimRes != null) ? ((copyOfStruct_1 = selSimRes[0], (copyOfStruct_1.tag === 0) ? ((sd_1 = copyOfStruct_1.fields[0], (sd_1.IsSynchronous === false) ? button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_4) => {
            ttDispatch(new TTMsg(0, [selSimRes]));
        }])]), singleton("Generate Truth Table")) : button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(15, []), new Option(18, [(_arg_5) => {
            const popup_1 = errorPropsNotification("Truth Table generation only supported for Combinational Logic");
            dispatch(new Msg(66, [popup_1]));
        }])]), singleton("Generate Truth Table")))) : ((simError_1 = copyOfStruct_1.fields[0], button(ofArray([new Option(0, [new Color_IColor(7, [])]), new Option(18, [(_arg_3) => {
            setSimErrorFeedback(simError_1, model, dispatch);
            ttDispatch(new TTMsg(0, [selSimRes]));
        }])]), singleton("See Problems")))))) : react.createElement("div", {});
        const children_2 = ["Generate Truth Tables for combinational logic using this tab.", react.createElement("br", {}), react.createElement("hr", {}), h5(empty())(singleton("Truth Table for whole sheet")), react.createElement("br", {}), wholeButton, react.createElement("hr", {}), h5(empty())(singleton("Truth Table for selected logic")), react.createElement("br", {}), react.createElement("br", {}), selButton, react.createElement("hr", {})];
        return react.createElement("div", {}, ...children_2);
    }
}

//# sourceMappingURL=TruthTableView.fs.js.map
