import { remove, add, find } from "../fable_modules/fable-library.4.1.4/Map.js";
import { printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { w_, h_, PortType, Edge, outputPorts_, inputPorts_, Port, Component, SymbolInfo, type_, ComponentType } from "../Common/CommonTypes.fs.js";
import { Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { SymbolT_PortMaps, SymbolT_portMaps_, SymbolT_Symbol, SymbolT_component_ } from "../Model/DrawModelType.fs.js";
import { toUInt32, toInt32 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { uuid } from "../Interface/JSHelpers.fs.js";
import { defaultArgWith, map as map_1, defaultArg, value as value_3 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { ofArray, item, empty, reverse, fold, filter, tryItem, insertAt, length, map, singleton, getSlice, append } from "../fable_modules/fable-library.4.1.4/List.js";
import { toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { getComponentProperties } from "./Symbol.fs.js";

/**
 * Helper function to change the number of bits expected in a port of each component type.
 */
export function changeNumberOfBitsf(symModel, compId, newBits) {
    const symbol = find(compId, symModel.Symbols);
    let newcompotype;
    const matchValue = symbol.Component.Type;
    switch (matchValue.tag) {
        case 48: {
            newcompotype = toFail(printf("Legacy Input component types should never occur"));
            break;
        }
        case 0: {
            const defaultVal = matchValue.fields[1];
            newcompotype = (new ComponentType(0, [newBits, defaultVal]));
            break;
        }
        case 1: {
            newcompotype = (new ComponentType(1, [newBits]));
            break;
        }
        case 2: {
            newcompotype = (new ComponentType(2, [newBits]));
            break;
        }
        case 17: {
            newcompotype = (new ComponentType(17, [newBits]));
            break;
        }
        case 18: {
            newcompotype = (new ComponentType(18, [newBits]));
            break;
        }
        case 20: {
            newcompotype = (new ComponentType(20, [newBits]));
            break;
        }
        case 19: {
            newcompotype = (new ComponentType(20, [newBits]));
            break;
        }
        case 21: {
            const typ = matchValue.fields[1];
            newcompotype = (new ComponentType(21, [newBits, typ]));
            break;
        }
        case 22: {
            newcompotype = (new ComponentType(22, [newBits]));
            break;
        }
        case 24: {
            newcompotype = (new ComponentType(24, [newBits]));
            break;
        }
        case 23: {
            newcompotype = (new ComponentType(23, [newBits]));
            break;
        }
        case 25: {
            newcompotype = (new ComponentType(25, [newBits]));
            break;
        }
        case 33: {
            newcompotype = (new ComponentType(33, [newBits]));
            break;
        }
        case 34: {
            newcompotype = (new ComponentType(34, [newBits]));
            break;
        }
        case 35: {
            newcompotype = (new ComponentType(35, [newBits]));
            break;
        }
        case 37: {
            newcompotype = (new ComponentType(37, [newBits]));
            break;
        }
        case 36: {
            newcompotype = (new ComponentType(36, [newBits]));
            break;
        }
        case 38: {
            newcompotype = (new ComponentType(38, [newBits]));
            break;
        }
        case 28: {
            newcompotype = (new ComponentType(28, [newBits]));
            break;
        }
        case 6: {
            const b = matchValue.fields[1] | 0;
            newcompotype = (new ComponentType(6, [newBits, b]));
            break;
        }
        case 47: {
            const b_1 = matchValue.fields[1];
            newcompotype = (new ComponentType(47, [newBits, b_1]));
            break;
        }
        case 5: {
            const v = matchValue.fields[1];
            const t = matchValue.fields[2];
            newcompotype = (new ComponentType(5, [newBits, v, t]));
            break;
        }
        case 7: {
            const txt = matchValue.fields[2];
            const b_2 = matchValue.fields[1];
            newcompotype = (new ComponentType(7, [newBits, b_2, txt]));
            break;
        }
        default: {
            const c = matchValue;
            newcompotype = c;
        }
    }
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), type_)(SymbolT_component_))(newcompotype)(symbol);
}

/**
 * Helper function to change the number of bits expected in the LSB port of BusSelection and BusCompare
 */
export function changeLsbf(symModel, compId, newLsb) {
    const symbol = find(compId, symModel.Symbols);
    let newcompotype;
    const matchValue = symbol.Component.Type;
    switch (matchValue.tag) {
        case 6: {
            const w = matchValue.fields[0] | 0;
            newcompotype = (new ComponentType(6, [w, ~~toInt32(newLsb)]));
            break;
        }
        case 47: {
            const w_1 = matchValue.fields[0] | 0;
            newcompotype = (new ComponentType(47, [w_1, toUInt32(newLsb) >>> 0]));
            break;
        }
        case 7: {
            const w_2 = matchValue.fields[0] | 0;
            const txt = matchValue.fields[2];
            newcompotype = (new ComponentType(7, [w_2, newLsb, txt]));
            break;
        }
        default:
            newcompotype = toFail(printf("this shouldnt happen, incorrect call of message changeLsb"));
    }
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), type_)(SymbolT_component_))(newcompotype)(symbol);
}

/**
 * This function should be called for Input1 components only. Sets the default
 * value to be used in simulations for an Input1 component if it is not driven.
 */
export function changeInputValue(symModel, compId, newVal) {
    const symbol = find(compId, symModel.Symbols);
    let width_1;
    const matchValue = symbol.Component.Type;
    if (matchValue.tag === 0) {
        const width = matchValue.fields[0] | 0;
        width_1 = width;
    }
    else {
        width_1 = toFail(printf("changeInputValue should only be called for Input components"));
    }
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), type_)(SymbolT_component_))(new ComponentType(0, [width_1, newVal]))(symbol);
}

/**
 * Updates the value of a constant1 component and returns the updated symbol
 */
export function changeConstantf(symModel, compId, constantVal, constantText) {
    const symbol = find(compId, symModel.Symbols);
    let newcompotype;
    const matchValue = symbol.Component.Type;
    if (matchValue.tag === 7) {
        const w = matchValue.fields[0] | 0;
        newcompotype = (new ComponentType(7, [w, constantVal, constantText]));
    }
    else {
        newcompotype = toFail(printf("this shouldnt happen, incorrect call of message changeLsb"));
    }
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), type_)(SymbolT_component_))(newcompotype)(symbol);
}

/**
 * Updates the value of a busCompare1 component and returns the updated symbol
 */
export function changeBusComparef(symModel, compId, constantVal, constantText) {
    const symbol = find(compId, symModel.Symbols);
    let newcompotype;
    const matchValue = symbol.Component.Type;
    if (matchValue.tag === 5) {
        const w = matchValue.fields[0] | 0;
        newcompotype = (new ComponentType(5, [w, constantVal, constantText]));
    }
    else {
        newcompotype = toFail(printf("this shouldnt happen, incorrect call of message changeLsb"));
    }
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), type_)(SymbolT_component_))(newcompotype)(symbol);
}

export function changeReversedInputs(symModel, compId) {
    const symbol = find(compId, symModel.Symbols);
    let newValue;
    const matchValue = symbol.ReversedInputPorts;
    newValue = ((matchValue == null) ? true : (!matchValue));
    let newSymbolInfo;
    const matchValue_1 = symbol.Component.SymbolInfo;
    if (matchValue_1 == null) {
        newSymbolInfo = void 0;
    }
    else {
        const si = matchValue_1;
        newSymbolInfo = (new SymbolInfo(si.LabelBoundingBox, si.LabelRotation, si.STransform, newValue, si.PortOrientation, si.PortOrder, si.HScale, si.VScale));
    }
    let newcompo;
    const inputRecord = symbol.Component;
    newcompo = (new Component(inputRecord.Id, inputRecord.Type, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, inputRecord.X, inputRecord.Y, inputRecord.H, inputRecord.W, newSymbolInfo));
    return new SymbolT_Symbol(symbol.Pos, symbol.CentrePos, symbol.OffsetFromBBCentre, symbol.InWidth0, symbol.InWidth1, symbol.InWidths, symbol.LabelBoundingBox, symbol.LabelHasDefaultPos, symbol.LabelRotation, symbol.Appearance, symbol.Id, newcompo, symbol.Annotation, symbol.Moving, symbol.IsClocked, symbol.STransform, newValue, symbol.PortMaps, symbol.HScale, symbol.VScale, symbol.MovingPort, symbol.MovingPortTarget);
}

export function createNewPort(no, hostID, portType) {
    return new Port(uuid(), no, portType, hostID);
}

export function updateSymPortMaps(newPortMaps, newInputPorts, newOutputPorts, sym) {
    let f, f1, f2;
    return ((f = ((f1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), inputPorts_)(newInputPorts), (f2 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), outputPorts_)(newOutputPorts), (arg_4) => f2(f1(arg_4))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SymbolT_component_)(f)))(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_portMaps_)(newPortMaps)(sym));
}

export function portNoDown(port) {
    const no = value_3(port.PortNumber) | 0;
    return new Port(port.Id, no - 1, port.PortType, port.HostId);
}

export function portNoUp(port) {
    const no = value_3(port.PortNumber) | 0;
    return new Port(port.Id, no + 1, port.PortType, port.HostId);
}

/**
 * add the port specified by its type and number to the given symbol
 * if edgeOpt is None the port will be added on the same edge as the port
 * with the highest number
 */
export function addNumberPort(pType, pNum, sym, edgeOpt) {
    const newPort = createNewPort(pNum, sym.Component.Id, pType);
    const patternInput = (pType.tag === 1) ? [sym.Component.InputPorts, append(getSlice(void 0, pNum - 1, sym.Component.OutputPorts), append(singleton(newPort), map(portNoUp, getSlice(pNum, void 0, sym.Component.OutputPorts))))] : [append(getSlice(void 0, pNum - 1, sym.Component.InputPorts), append(singleton(newPort), map(portNoUp, getSlice(pNum, void 0, sym.Component.InputPorts)))), sym.Component.OutputPorts];
    const newOutputPorts = patternInput[1];
    const newInputPorts = patternInput[0];
    const insertIndex = (sym.STransform.flipped ? ((pType.tag === 1) ? ((length(sym.Component.OutputPorts) - 1) - pNum) : ((length(sym.Component.InputPorts) - 1) - pNum)) : ((pType.tag === 1) ? 0 : pNum)) | 0;
    const addToPortMaps = (port_2, edge, sym_1) => {
        const orientation = sym_1.PortMaps.Orientation;
        const order = sym_1.PortMaps.Order;
        const newOrientation = add(newPort.Id, edge, orientation);
        const edgeOrder = find(edge, order);
        const newOrder = add(edge, insertAt(insertIndex, port_2.Id, edgeOrder), order);
        return new SymbolT_PortMaps(newOrder, newOrientation);
    };
    const getDefaultEdge = (pType_1) => {
        const tupledArg = (pType_1.tag === 1) ? [tryItem(length(sym.Component.OutputPorts) - 1, sym.Component.OutputPorts), new Edge(3, [])] : [tryItem(length(sym.Component.InputPorts) - 1, sym.Component.InputPorts), new Edge(2, [])];
        return defaultArg(map_1((id) => find(id, sym.PortMaps.Orientation), map_1((port_3) => port_3.Id, tupledArg[0])), tupledArg[1]);
    };
    const newPortMaps = addToPortMaps(newPort, defaultArgWith(edgeOpt, () => getDefaultEdge(pType)), sym);
    return updateSymPortMaps(newPortMaps, newInputPorts, newOutputPorts, sym);
}

/**
 * remove the port specified by its type and number from the given symbol
 */
export function deleteNumberPort(pType, pNum, sym) {
    const patternInput = (pType.tag === 1) ? [map_1((port_2) => port_2.Id, tryItem(pNum, sym.Component.OutputPorts)), sym.Component.InputPorts, append(getSlice(void 0, pNum - 1, sym.Component.OutputPorts), map(portNoDown, getSlice(pNum + 1, void 0, sym.Component.OutputPorts)))] : [map_1((port) => port.Id, tryItem(pNum, sym.Component.InputPorts)), append(getSlice(void 0, pNum - 1, sym.Component.InputPorts), map(portNoDown, getSlice(pNum + 1, void 0, sym.Component.InputPorts))), sym.Component.OutputPorts];
    const pIdOpt = patternInput[0];
    const newOutputPorts = patternInput[2];
    const newInputPorts = patternInput[1];
    const removeFromPortMaps = (pId, sym_1) => {
        const orientation = sym_1.PortMaps.Orientation;
        const order = sym_1.PortMaps.Order;
        const edge = find(pId, orientation);
        const newOrientation = remove(pId, orientation);
        const edgeOrder = find(edge, order);
        const newEdgeOrder = filter((id) => (id !== pId), edgeOrder);
        const newOrder = add(edge, newEdgeOrder, order);
        return new SymbolT_PortMaps(newOrder, newOrientation);
    };
    const newPortMaps = defaultArg(map_1((id_1) => removeFromPortMaps(id_1, sym), pIdOpt), sym.PortMaps);
    return updateSymPortMaps(newPortMaps, newInputPorts, newOutputPorts, sym);
}

/**
 * add the ports specified by the type and the list of port numbers
 * if edgeOpt is None they will be added on the same edge as the port
 * with the highest number
 */
export function addPorts(pType, pNumList, edgeOpt, sym) {
    return fold((sym_1, pNum) => addNumberPort(pType, pNum, sym_1, edgeOpt), sym, pNumList);
}

/**
 * delete ports specified by the list of port numbers
 * must be in ascending order because otherwise wrong ports will be deleted
 */
export function deletePorts(pType, pNumList, sym) {
    return fold((sym_1, pNum) => deleteNumberPort(pType, pNum, sym_1), sym, reverse(pNumList));
}

/**
 * add and remove ports to obtain the given number of input and output ports
 * the ports will be added at the highest index, as well as removed from the end
 * of the port list
 */
export function varyNumberOfPorts(pType, numInPorts, numOutPorts, sym) {
    let oldNOut, oldNIn, newNOut, newNIn, oldNOut_1, oldNIn_1, newNOut_1, newNIn_1, oldNOut_2, oldNIn_2, newNOut_2, newNIn_2, oldNOut_3, oldNIn_3, newNOut_3, newNIn_3;
    const comp = sym.Component;
    const matchValue = length(comp.InputPorts) | 0;
    const matchValue_1 = length(comp.OutputPorts) | 0;
    if ((oldNOut = (matchValue_1 | 0), (oldNIn = (matchValue | 0), (newNOut = (numOutPorts | 0), (newNIn = (numInPorts | 0), (newNIn >= oldNIn) && (newNOut >= oldNOut)))))) {
        const oldNOut_4 = matchValue_1 | 0;
        const oldNIn_4 = matchValue | 0;
        const newNOut_4 = numOutPorts | 0;
        const newNIn_4 = numInPorts | 0;
        const sym_2 = addPorts(new PortType(0, []), toList(rangeDouble(oldNIn_4, 1, newNIn_4 - 1)), void 0, sym);
        return addPorts(new PortType(1, []), toList(rangeDouble(oldNOut_4, 1, newNOut_4 - 1)), void 0, sym_2);
    }
    else if ((oldNOut_1 = (matchValue_1 | 0), (oldNIn_1 = (matchValue | 0), (newNOut_1 = (numOutPorts | 0), (newNIn_1 = (numInPorts | 0), (newNIn_1 >= oldNIn_1) && (newNOut_1 < oldNOut_1)))))) {
        const oldNOut_5 = matchValue_1 | 0;
        const oldNIn_5 = matchValue | 0;
        const newNOut_5 = numOutPorts | 0;
        const newNIn_5 = numInPorts | 0;
        const sym_4 = addPorts(new PortType(0, []), toList(rangeDouble(oldNIn_5, 1, newNIn_5 - 1)), void 0, sym);
        return deletePorts(new PortType(1, []), toList(rangeDouble(newNOut_5, 1, oldNOut_5 - 1)), sym_4);
    }
    else if ((oldNOut_2 = (matchValue_1 | 0), (oldNIn_2 = (matchValue | 0), (newNOut_2 = (numOutPorts | 0), (newNIn_2 = (numInPorts | 0), (newNIn_2 < oldNIn_2) && (newNOut_2 >= oldNOut_2)))))) {
        const oldNOut_6 = matchValue_1 | 0;
        const oldNIn_6 = matchValue | 0;
        const newNOut_6 = numOutPorts | 0;
        const newNIn_6 = numInPorts | 0;
        const sym_6 = deletePorts(new PortType(0, []), toList(rangeDouble(newNIn_6, 1, oldNIn_6 - 1)), sym);
        return addPorts(new PortType(1, []), toList(rangeDouble(oldNOut_6, 1, newNOut_6 - 1)), void 0, sym_6);
    }
    else if ((oldNOut_3 = (matchValue_1 | 0), (oldNIn_3 = (matchValue | 0), (newNOut_3 = (numOutPorts | 0), (newNIn_3 = (numInPorts | 0), (newNIn_3 < oldNIn_3) && (newNOut_3 < oldNOut_3)))))) {
        const oldNOut_7 = matchValue_1 | 0;
        const oldNIn_7 = matchValue | 0;
        const newNOut_7 = numOutPorts | 0;
        const newNIn_7 = numInPorts | 0;
        const sym_8 = deletePorts(new PortType(0, []), toList(rangeDouble(newNIn_7, 1, oldNIn_7 - 1)), sym);
        return deletePorts(new PortType(1, []), toList(rangeDouble(newNOut_7, 1, oldNOut_7 - 1)), sym_8);
    }
    else {
        return toFail(printf("new port counts can\'t be obtained"));
    }
}

export function changeAdderComponent(symModel, compId, oldComp, newCompType) {
    let f;
    const oldCompType = oldComp.Type;
    const inputEdge = (rotation, flipped) => {
        let matchResult;
        switch (rotation.tag) {
            case 1: {
                if (flipped) {
                    matchResult = 3;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case 3: {
                if (flipped) {
                    matchResult = 1;
                }
                else {
                    matchResult = 3;
                }
                break;
            }
            case 2: {
                if (flipped) {
                    matchResult = 2;
                }
                else {
                    matchResult = 2;
                }
                break;
            }
            default:
                if (flipped) {
                    matchResult = 0;
                }
                else {
                    matchResult = 0;
                }
        }
        switch (matchResult) {
            case 0:
                return new Edge(1, []);
            case 1:
                return new Edge(3, []);
            case 2:
                return new Edge(0, []);
            default:
                return new Edge(2, []);
        }
    };
    const symbol = find(compId, symModel.Symbols);
    const patternInput = (oldCompType.tag === 17) ? ((newCompType.tag === 18) ? [singleton(0), new PortType(0, [])] : ((newCompType.tag === 19) ? [singleton(1), new PortType(1, [])] : [empty(), new PortType(0, [])])) : ((oldCompType.tag === 19) ? ((newCompType.tag === 20) ? [singleton(0), new PortType(0, [])] : [empty(), new PortType(0, [])]) : ((oldCompType.tag === 18) ? ((newCompType.tag === 20) ? [singleton(1), new PortType(1, [])] : [empty(), new PortType(0, [])]) : [empty(), new PortType(0, [])]));
    const removePType = patternInput[1];
    const removeL = patternInput[0];
    const patternInput_1 = (oldCompType.tag === 18) ? ((newCompType.tag === 17) ? [singleton(0), new PortType(0, [])] : [empty(), new PortType(0, [])]) : ((oldCompType.tag === 20) ? ((newCompType.tag === 19) ? [singleton(0), new PortType(0, [])] : ((newCompType.tag === 18) ? [singleton(1), new PortType(1, [])] : [empty(), new PortType(0, [])])) : ((oldCompType.tag === 19) ? ((newCompType.tag === 17) ? [singleton(1), new PortType(1, [])] : [empty(), new PortType(0, [])]) : [empty(), new PortType(0, [])]));
    const addPType = patternInput_1[1];
    const addL = patternInput_1[0];
    const getEdge = () => {
        if (!equals(addL, empty())) {
            let matchResult_1;
            switch (oldCompType.tag) {
                case 18: {
                    if (newCompType.tag === 17) {
                        matchResult_1 = 0;
                    }
                    else {
                        matchResult_1 = 2;
                    }
                    break;
                }
                case 20: {
                    switch (newCompType.tag) {
                        case 19: {
                            matchResult_1 = 0;
                            break;
                        }
                        case 18: {
                            matchResult_1 = 1;
                            break;
                        }
                        default:
                            matchResult_1 = 2;
                    }
                    break;
                }
                case 19: {
                    if (newCompType.tag === 17) {
                        matchResult_1 = 1;
                    }
                    else {
                        matchResult_1 = 2;
                    }
                    break;
                }
                default:
                    matchResult_1 = 2;
            }
            switch (matchResult_1) {
                case 0:
                    return inputEdge(symbol.STransform.Rotation, symbol.STransform.flipped);
                case 1:
                    return find(item(0, oldComp.OutputPorts).Id, symbol.PortMaps.Orientation);
                default:
                    return toFail(printf("Can\'t happen"));
            }
        }
        else {
            return void 0;
        }
    };
    return ((f = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), type_)(newCompType), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SymbolT_component_)(f)))(deletePorts(removePType, removeL, addPorts(addPType, addL, getEdge(), symbol)));
}

export function changeCounterComponent(symModel, compId, oldComp, newCompType) {
    let f, f1_1, f1, f2, f2_1;
    const oldCompType = oldComp.Type;
    const symbol = find(compId, symModel.Symbols);
    const findOpposite = (edge) => {
        switch (edge.tag) {
            case 0:
                return new Edge(1, []);
            case 2:
                return new Edge(3, []);
            case 1:
                return new Edge(0, []);
            default:
                return new Edge(2, []);
        }
    };
    const edge_1 = findOpposite(find(item(0, oldComp.OutputPorts).Id, symbol.PortMaps.Orientation));
    const removeL = (oldCompType.tag === 35) ? ((newCompType.tag === 36) ? ofArray([0, 1]) : ((newCompType.tag === 37) ? singleton(2) : empty())) : ((oldCompType.tag === 37) ? ((newCompType.tag === 38) ? ofArray([0, 1]) : empty()) : ((oldCompType.tag === 36) ? ((newCompType.tag === 38) ? singleton(0) : empty()) : empty()));
    const addL = (oldCompType.tag === 36) ? ((newCompType.tag === 35) ? ofArray([0, 1]) : empty()) : ((oldCompType.tag === 38) ? ((newCompType.tag === 37) ? ofArray([0, 1]) : ((newCompType.tag === 36) ? singleton(0) : empty())) : ((oldCompType.tag === 37) ? ((newCompType.tag === 35) ? singleton(2) : empty()) : empty()));
    let patternInput;
    const matchValue_2 = getComponentProperties(newCompType, "");
    const w = matchValue_2[3];
    const h = matchValue_2[2];
    patternInput = [h, w];
    const w$0027 = patternInput[1];
    const h$0027 = patternInput[0];
    return ((f = ((f1_1 = ((f1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), type_)(newCompType), (f2 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), h_)(h$0027), (arg_3) => f2(f1(arg_3))))), (f2_1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), w_)(w$0027), (arg_5) => f2_1(f1_1(arg_5))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SymbolT_component_)(f)))(deletePorts(new PortType(0, []), removeL, addPorts(new PortType(0, []), addL, edge_1, symbol)));
}

export function changeGateComponent(symModel, compId, gateType, n) {
    let f, f1, f2, value_1;
    return ((f = ((f1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), type_)(new ComponentType(10, [gateType, n])), (f2 = ((value_1 = (((1.5 * 30) * n) / 2), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), h_)(value_1))), (arg_3) => f2(f1(arg_3))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SymbolT_component_)(f)))(varyNumberOfPorts(new PortType(0, []), n, 1, find(compId, symModel.Symbols)));
}

export function changeMergeNComponent(symModel, compId, numInputs) {
    let f, f1, f2, value_1;
    const numInputsEdit = ((numInputs > 2) ? numInputs : 3) | 0;
    return ((f = ((f1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), type_)(new ComponentType(29, [numInputs])), (f2 = ((value_1 = (((2 * 30) * numInputsEdit) / 2), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), h_)(value_1))), (arg_3) => f2(f1(arg_3))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SymbolT_component_)(f)))(varyNumberOfPorts(new PortType(0, []), numInputs, 1, find(compId, symModel.Symbols)));
}

export function changeSplitNComponent(symModel, compId, numOutputs, widths, lsbs) {
    let f, f1, f2, value_1;
    const numOutputsEdit = ((numOutputs > 2) ? numOutputs : 3) | 0;
    return ((f = ((f1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), type_)(new ComponentType(30, [numOutputs, widths, lsbs])), (f2 = ((value_1 = (((2 * 30) * numOutputsEdit) / 2), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), h_)(value_1))), (arg_3) => f2(f1(arg_3))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SymbolT_component_)(f)))(varyNumberOfPorts(new PortType(1, []), 1, numOutputs, find(compId, symModel.Symbols)));
}

//# sourceMappingURL=SymbolReplaceHelpers.fs.js.map
