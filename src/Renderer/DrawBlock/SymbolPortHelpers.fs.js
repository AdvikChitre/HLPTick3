import { add, FSharpMap__get_Item, tryFind, find } from "../fable_modules/fable-library.4.1.4/Map.js";
import { insertAt, filter, findIndex, length, getSlice, map, ofArray, empty, singleton, item } from "../fable_modules/fable-library.4.1.4/List.js";
import { Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { SymbolT_symbolOf_, SymbolT_movingPort_, SymbolT_movingPortTarget_, SymbolT_Symbol, SymbolT_PortMaps, SymbolT_ShowPorts, SymbolT_appearance_, SymbolT_showPorts_ } from "../Model/DrawModelType.fs.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import * as react from "react";
import { CSSProp } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { $007CIsBinaryGate$007CNotBinaryGate$007C, Edge, XYPos } from "../Common/CommonTypes.fs.js";
import { min } from "../fable_modules/fable-library.4.1.4/Double.js";
import { getPortPos, getMuxSelOffset, autoScaleHAndW, Constants_portPosEdgeGap, Constants_gatePortPosEdgeGap } from "./Symbol.fs.js";
import { printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { Cmd_none } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";

/**
 * Helper function to find which ports were deleted when changing Adder & Counter component type via properties
 */
export function findDeletedPorts(symModel, compId, oldComp, newComp) {
    let n2, n1, n1_2, n2_2, n2_1, n1_1, n1_3, n2_3, numInNew, numIn, numIn_1, numInNew_1;
    const symbol = find(compId, symModel.Symbols);
    const oldCompType = oldComp.Type;
    const removedIds = (oldCompType.tag === 17) ? ((newComp.tag === 18) ? singleton(item(0, symbol.Component.InputPorts).Id) : ((newComp.tag === 19) ? singleton(item(1, symbol.Component.OutputPorts).Id) : empty())) : ((oldCompType.tag === 19) ? ((newComp.tag === 20) ? singleton(item(0, symbol.Component.InputPorts).Id) : empty()) : ((oldCompType.tag === 18) ? ((newComp.tag === 20) ? singleton(item(1, symbol.Component.OutputPorts).Id) : empty()) : ((oldCompType.tag === 35) ? ((newComp.tag === 36) ? ofArray([item(0, symbol.Component.InputPorts).Id, item(1, symbol.Component.InputPorts).Id]) : ((newComp.tag === 37) ? singleton(item(2, symbol.Component.InputPorts).Id) : empty())) : ((oldCompType.tag === 37) ? ((newComp.tag === 38) ? ofArray([item(0, symbol.Component.InputPorts).Id, item(1, symbol.Component.InputPorts).Id]) : empty()) : ((oldCompType.tag === 36) ? ((newComp.tag === 38) ? singleton(item(0, symbol.Component.InputPorts).Id) : empty()) : ((oldCompType.tag === 10) ? ((newComp.tag === 10) ? (((n2 = (newComp.fields[1] | 0), (n1 = (oldCompType.fields[1] | 0), n2 < n1))) ? ((n1_2 = (oldCompType.fields[1] | 0), (n2_2 = (newComp.fields[1] | 0), map((x) => x.Id, getSlice(n2_2, void 0, symbol.Component.InputPorts))))) : empty()) : empty()) : ((oldCompType.tag === 29) ? ((newComp.tag === 29) ? (((n2_1 = (newComp.fields[0] | 0), (n1_1 = (oldCompType.fields[0] | 0), n2_1 < n1_1))) ? ((n1_3 = (oldCompType.fields[0] | 0), (n2_3 = (newComp.fields[0] | 0), map((x_1) => x_1.Id, getSlice(n2_3, void 0, symbol.Component.InputPorts))))) : empty()) : empty()) : ((oldCompType.tag === 30) ? ((newComp.tag === 30) ? (((numInNew = (newComp.fields[0] | 0), (numIn = (oldCompType.fields[0] | 0), numInNew < numIn))) ? ((numIn_1 = (oldCompType.fields[0] | 0), (numInNew_1 = (newComp.fields[0] | 0), map((x_2) => x_2.Id, getSlice(numInNew_1, void 0, symbol.Component.OutputPorts))))) : empty()) : empty()) : empty()))))))));
    return map((x_3) => tryFind(x_3, symModel.Ports), removedIds);
}

export function showSymbolInPorts(_arg, sym) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_showPorts_)(SymbolT_appearance_))(new SymbolT_ShowPorts(0, []))(sym);
}

export function showSymbolOutPorts(_arg, sym) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_showPorts_)(SymbolT_appearance_))(new SymbolT_ShowPorts(1, []))(sym);
}

export function showSymbolBothForPortMovementPorts(_arg, sym) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_showPorts_)(SymbolT_appearance_))(new SymbolT_ShowPorts(3, []))(sym);
}

export function hideSymbolPorts(_arg, sym) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_showPorts_)(SymbolT_appearance_))(new SymbolT_ShowPorts(4, []))(sym);
}

export function showSymbolPorts(sym) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_showPorts_)(SymbolT_appearance_))(new SymbolT_ShowPorts(2, []))(sym);
}

export function moveCustomPortsPopup() {
    let props_26, children_22, children_4, s_3, children_8, s_5, children_20, props_22, children_18, children_16, s_10;
    const styledSpan = (styles, txt) => {
        const props = [["style", keyValueList(styles, 1)]];
        return react.createElement("span", keyValueList(props, 1), txt);
    };
    const bSpan = (txt_1) => styledSpan(singleton(new CSSProp(165, ["bold"])), txt_1);
    const iSpan = (txt_2) => styledSpan(singleton(new CSSProp(156, ["italic"])), txt_2);
    const tSpan = (txt_3) => react.createElement("span", {}, txt_3);
    const children_24 = [bSpan("Ports"), tSpan(" are the inputs and outputs of a component symbol."), react.createElement("br", {}), react.createElement("br", {}), (props_26 = [["style", {
        listStyle: "disc",
        marginLeft: "30px",
    }]], (children_22 = [(children_4 = [(s_3 = "Normal components can be rotated and flipped to change port orientation, however port positions cannot be changed.", s_3)], react.createElement("li", {}, ...children_4)), react.createElement("li", {}, "2-input MUX components can have 0 & 1 inputs swapped using properties."), (children_8 = [(s_5 = "Custom components (sheets inserted as components) can have ports moved to any side of the symbol and reordered.", s_5)], react.createElement("li", {}, ...children_8)), (children_20 = ["To move custom component ports:", (props_22 = [["style", {
        listStyle: "circle",
        marginLeft: "30px",
    }]], (children_18 = [react.createElement("li", {}, "Press CTRL and use a mouse to drag a port to another position on the outline of the symbol."), react.createElement("li", {}, "You can reorder ports and place them on any symbol edge including top and bottom."), react.createElement("li", {}, "The symbol will resize itself if you change the edge of a port."), (children_16 = [(s_10 = "If default sizing makes port legends overlap you can scale the custom component dragging its corners", s_10)], react.createElement("li", {}, ...children_16))], react.createElement("ul", keyValueList(props_22, 1), ...children_18)))], react.createElement("li", {}, ...children_20))], react.createElement("ul", keyValueList(props_26, 1), ...children_22)))];
    return react.createElement("div", {}, ...children_24);
}

/**
 * Returns an Option Edge. Returns Some edge if position is on edge of Symbol, and None if it was not on an edge
 * Separates the symbol as shown below where the two triangles have height = 0.3*symbolHeight
 */
export function getCloseByEdge(sym, mousePos) {
    let patternInput_1;
    const sym_1 = sym;
    const comp = sym_1.Component;
    const matchValue = defaultArg(sym_1.HScale, 1);
    const vS = defaultArg(sym_1.VScale, 1);
    const hS = matchValue;
    const matchValue_2 = sym_1.STransform.Rotation;
    switch (matchValue_2.tag) {
        case 1:
        case 3: {
            patternInput_1 = [comp.W * hS, comp.H * vS];
            break;
        }
        default:
            patternInput_1 = [comp.H * vS, comp.W * hS];
    }
    const w = patternInput_1[1];
    const h = patternInput_1[0];
    const triangleCorner = new XYPos(w / 2, h * 0.3);
    const tanTheta = triangleCorner.Y / triangleCorner.X;
    let mouseOffset;
    const left = mousePos;
    const right = sym.Pos;
    mouseOffset = (new XYPos(left.X - right.X, left.Y - right.Y));
    const minX = min(Math.abs(mouseOffset.X), Math.abs(w) - mouseOffset.X);
    const outMargin = 60;
    if ((((-outMargin <= mouseOffset.Y) && (mouseOffset.Y <= (minX * tanTheta))) && (-outMargin <= mouseOffset.X)) && ((w + outMargin) >= mouseOffset.X)) {
        return new Edge(0, []);
    }
    else if (((((h + outMargin) >= mouseOffset.Y) && (mouseOffset.Y >= (h - (minX * tanTheta)))) && (-outMargin <= mouseOffset.X)) && ((w + outMargin) >= mouseOffset.X)) {
        return new Edge(1, []);
    }
    else if ((((-outMargin >= mouseOffset.Y) ? true : ((h + outMargin) <= mouseOffset.Y)) ? true : (-outMargin >= mouseOffset.X)) ? true : ((w + outMargin) <= mouseOffset.X)) {
        return void 0;
    }
    else if ((-outMargin <= mouseOffset.X) && (mouseOffset.X <= (w / 2))) {
        return new Edge(2, []);
    }
    else if (((w + outMargin) >= mouseOffset.X) && (mouseOffset.X > (w / 2))) {
        return new Edge(3, []);
    }
    else {
        return void 0;
    }
}

/**
 * Given a symbol and a port, it returns the offset of the port from the top left corner of the symbol
 */
export function getPosIndex(sym, pos, edge) {
    const ports = FSharpMap__get_Item(sym.PortMaps.Order, edge);
    let gap;
    const ct = sym.Component.Type;
    let matchResult;
    switch (ct.tag) {
        case 27:
        case 28: {
            matchResult = 0;
            break;
        }
        case 11: {
            if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                matchResult = 1;
            }
            else {
                matchResult = 1;
            }
            break;
        }
        case 29: {
            if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                matchResult = 1;
            }
            else {
                matchResult = 1;
            }
            break;
        }
        case 30: {
            if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                matchResult = 1;
            }
            else {
                matchResult = 1;
            }
            break;
        }
        default:
            if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                matchResult = 1;
            }
            else {
                matchResult = 2;
            }
    }
    switch (matchResult) {
        case 0: {
            gap = 0.25;
            break;
        }
        case 1: {
            gap = Constants_gatePortPosEdgeGap;
            break;
        }
        default:
            gap = Constants_portPosEdgeGap;
    }
    let baseOffset;
    const side = edge;
    let patternInput;
    const sym_2 = sym;
    const comp = sym_2.Component;
    const matchValue = defaultArg(sym_2.HScale, 1);
    const vS = defaultArg(sym_2.VScale, 1);
    const hS = matchValue;
    const matchValue_2 = sym_2.STransform.Rotation;
    switch (matchValue_2.tag) {
        case 1:
        case 3: {
            patternInput = [comp.W * hS, comp.H * vS];
            break;
        }
        default:
            patternInput = [comp.H * vS, comp.W * hS];
    }
    const w = patternInput[1];
    const h = patternInput[0];
    baseOffset = ((side.tag === 2) ? (new XYPos(0, 0)) : ((side.tag === 0) ? (new XYPos(0, 0)) : ((side.tag === 1) ? (new XYPos(0, h)) : (new XYPos(w, 0)))));
    let pos$0027;
    let left_1;
    const left = pos;
    const right = sym.Pos;
    left_1 = (new XYPos(left.X - right.X, left.Y - right.Y));
    const right_1 = baseOffset;
    pos$0027 = (new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y));
    let patternInput_3;
    const sym_3 = sym;
    const comp_1 = sym_3.Component;
    const matchValue_3 = defaultArg(sym_3.HScale, 1);
    const vS_1 = defaultArg(sym_3.VScale, 1);
    const hS_1 = matchValue_3;
    const matchValue_2_1 = sym_3.STransform.Rotation;
    switch (matchValue_2_1.tag) {
        case 1:
        case 3: {
            patternInput_3 = [comp_1.W * hS_1, comp_1.H * vS_1];
            break;
        }
        default:
            patternInput_3 = [comp_1.H * vS_1, comp_1.W * hS_1];
    }
    const w_1 = patternInput_3[1];
    const h_1 = patternInput_3[0];
    const matchValue_4 = length(ports) | 0;
    if (matchValue_4 === 0) {
        return 0;
    }
    else {
        switch (edge.tag) {
            case 3:
                return (-1 * ~~((((((pos$0027.Y * (((length(ports) + 1) + (2 * gap)) - 1)) / h_1) + 1) - gap) - (length(ports) + 1)) - 0.5)) | 0;
            case 1:
                return ~~((((pos$0027.X * (((length(ports) + 1) + (2 * gap)) - 1)) / w_1) - gap) + 0.5) | 0;
            case 0:
                return (-1 * ~~((((((pos$0027.X * (((length(ports) + 1) + (2 * gap)) - 1)) / w_1) - (length(ports) + 1)) + 1) - gap) - 0.5)) | 0;
            default:
                return ~~((((pos$0027.Y * (((length(ports) + 1) + (2 * gap)) - 1)) / h_1) - gap) + 0.5) | 0;
        }
    }
}

export function updatePortPos(sym, pos, portId) {
    const matchValue = sym.Component.Type;
    if (matchValue.tag === 26) {
        const x = matchValue.fields[0];
        const oldMaps = sym.PortMaps;
        const matchValue_1 = getCloseByEdge(sym, pos);
        if (matchValue_1 != null) {
            const edge = matchValue_1;
            toConsole(`${edge}`);
            const newPortOrientation = add(portId, edge, oldMaps.Orientation);
            const oldEdge = FSharpMap__get_Item(oldMaps.Orientation, portId);
            const newPortIdx = getPosIndex(sym, pos, edge) | 0;
            const oldIdx = findIndex((el) => (el === portId), FSharpMap__get_Item(oldMaps.Order, oldEdge)) | 0;
            const oldPortOrder$0027 = add(oldEdge, filter((el_1) => (el_1 !== portId), FSharpMap__get_Item(oldMaps.Order, oldEdge)), oldMaps.Order);
            const newPortIdx$0027 = ((newPortIdx > length(FSharpMap__get_Item(oldPortOrder$0027, edge))) ? length(FSharpMap__get_Item(oldPortOrder$0027, edge)) : ((equals(edge, oldEdge) && (oldIdx < newPortIdx)) ? (newPortIdx - 1) : newPortIdx)) | 0;
            toConsole(`${[newPortIdx, newPortIdx$0027]}`);
            const newPortOrder = add(edge, insertAt(newPortIdx$0027, portId, FSharpMap__get_Item(oldPortOrder$0027, edge)), oldPortOrder$0027);
            const newSym = new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, new SymbolT_PortMaps(newPortOrder, newPortOrientation), sym.HScale, sym.VScale, void 0, sym.MovingPortTarget);
            return autoScaleHAndW(newSym);
        }
        else {
            toConsole(printf("not on edge"));
            return new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, void 0, sym.MovingPortTarget);
        }
    }
    else {
        return new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, void 0, sym.MovingPortTarget);
    }
}

/**
 * Contains the code for the MovePort update msg
 */
export function movePortUpdate(model, portId, pos) {
    const getPortPosWithIndex = (sym, portsNumber, side, portIndex) => {
        const index = portIndex;
        let gap;
        const ct = sym.Component.Type;
        let matchResult;
        switch (ct.tag) {
            case 27:
            case 28: {
                matchResult = 0;
                break;
            }
            case 11: {
                if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                    matchResult = 1;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case 29: {
                if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                    matchResult = 1;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case 30: {
                if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                    matchResult = 1;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            default:
                if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                    matchResult = 1;
                }
                else {
                    matchResult = 2;
                }
        }
        switch (matchResult) {
            case 0: {
                gap = 0.25;
                break;
            }
            case 1: {
                gap = Constants_gatePortPosEdgeGap;
                break;
            }
            default:
                gap = Constants_portPosEdgeGap;
        }
        const topBottomGap = gap + 0.3;
        let baseOffset;
        const side_1 = side;
        let patternInput;
        const sym_2 = sym;
        const comp = sym_2.Component;
        const matchValue = defaultArg(sym_2.HScale, 1);
        const vS = defaultArg(sym_2.VScale, 1);
        const hS = matchValue;
        const matchValue_2 = sym_2.STransform.Rotation;
        switch (matchValue_2.tag) {
            case 1:
            case 3: {
                patternInput = [comp.W * hS, comp.H * vS];
                break;
            }
            default:
                patternInput = [comp.H * vS, comp.W * hS];
        }
        const w = patternInput[1];
        const h = patternInput[0];
        baseOffset = ((side_1.tag === 2) ? (new XYPos(0, 0)) : ((side_1.tag === 0) ? (new XYPos(0, 0)) : ((side_1.tag === 1) ? (new XYPos(0, h)) : (new XYPos(w, 0)))));
        let baseOffset$0027;
        const left = baseOffset;
        const right = getMuxSelOffset(sym, side);
        baseOffset$0027 = (new XYPos(left.X + right.X, left.Y + right.Y));
        const portDimension = portsNumber - 1;
        let patternInput_3;
        const sym_3 = sym;
        const comp_1 = sym_3.Component;
        const matchValue_3 = defaultArg(sym_3.HScale, 1);
        const vS_1 = defaultArg(sym_3.VScale, 1);
        const hS_1 = matchValue_3;
        const matchValue_2_1 = sym_3.STransform.Rotation;
        switch (matchValue_2_1.tag) {
            case 1:
            case 3: {
                patternInput_3 = [comp_1.W * hS_1, comp_1.H * vS_1];
                break;
            }
            default:
                patternInput_3 = [comp_1.H * vS_1, comp_1.W * hS_1];
        }
        const w_1 = patternInput_3[1];
        const h_1 = patternInput_3[0];
        switch (side.tag) {
            case 3: {
                const yOffset_1 = (h_1 * ((portDimension - index) + gap)) / (portDimension + (2 * gap));
                const left_2 = baseOffset$0027;
                const right_2 = new XYPos(0, yOffset_1);
                return new XYPos(left_2.X + right_2.X, left_2.Y + right_2.Y);
            }
            case 1: {
                const xOffset = (w_1 * (index + topBottomGap)) / (portDimension + (2 * topBottomGap));
                const left_3 = baseOffset$0027;
                const right_3 = new XYPos(xOffset, 0);
                return new XYPos(left_3.X + right_3.X, left_3.Y + right_3.Y);
            }
            case 0: {
                const xOffset_1 = (w_1 * ((portDimension - index) + topBottomGap)) / (portDimension + (2 * topBottomGap));
                const left_4 = baseOffset$0027;
                const right_4 = new XYPos(xOffset_1, 0);
                return new XYPos(left_4.X + right_4.X, left_4.Y + right_4.Y);
            }
            default: {
                const yOffset = (h_1 * (index + gap)) / (portDimension + (2 * gap));
                const left_1 = baseOffset$0027;
                const right_1 = new XYPos(0, yOffset);
                return new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y);
            }
        }
    };
    const findOffsetSameEdge = (symbol, edge) => {
        const portsOnEdge = length(FSharpMap__get_Item(symbol.PortMaps.Order, edge)) | 0;
        switch (portsOnEdge) {
            case 1:
                return 0;
            case 2:
                switch (edge.tag) {
                    case 0:
                        return -getPortPosWithIndex(symbol, 2, edge, 1).X / 2;
                    case 2:
                        return getPortPosWithIndex(symbol, 2, edge, 0).Y / 2;
                    case 3:
                        return -getPortPosWithIndex(symbol, 2, edge, 1).Y / 2;
                    default:
                        return getPortPosWithIndex(symbol, 2, edge, 0).X / 2;
                }
            default:
                if (portsOnEdge > 2) {
                    switch (edge.tag) {
                        case 1:
                        case 0:
                            return (getPortPosWithIndex(symbol, portsOnEdge, edge, 1).X - getPortPosWithIndex(symbol, portsOnEdge, edge, 0).X) / 2;
                        default:
                            return (getPortPosWithIndex(symbol, portsOnEdge, edge, 1).Y - getPortPosWithIndex(symbol, portsOnEdge, edge, 0).Y) / 2;
                    }
                }
                else {
                    return 0;
                }
        }
    };
    const findOffsetDifferentEdge = (symbol_1, edge_1, order) => {
        let sym_4, comp_2, matchValue_4, vS_2, hS_2, matchValue_2_2, sym_5, comp_3, matchValue_5, vS_3, hS_3, matchValue_2_3;
        const portsOnEdge_1 = length(FSharpMap__get_Item(symbol_1.PortMaps.Order, edge_1)) | 0;
        if (portsOnEdge_1 === 0) {
            switch (edge_1.tag) {
                case 0:
                case 1:
                    return ((sym_4 = symbol_1, (comp_2 = sym_4.Component, (matchValue_4 = defaultArg(sym_4.HScale, 1), (vS_2 = defaultArg(sym_4.VScale, 1), (hS_2 = matchValue_4, (matchValue_2_2 = sym_4.STransform.Rotation, (matchValue_2_2.tag === 2) ? [comp_2.H * vS_2, comp_2.W * hS_2] : ((matchValue_2_2.tag === 1) ? [comp_2.W * hS_2, comp_2.H * vS_2] : ((matchValue_2_2.tag === 3) ? [comp_2.W * hS_2, comp_2.H * vS_2] : [comp_2.H * vS_2, comp_2.W * hS_2])))))))))[1] / 2;
                default:
                    return ((sym_5 = symbol_1, (comp_3 = sym_5.Component, (matchValue_5 = defaultArg(sym_5.HScale, 1), (vS_3 = defaultArg(sym_5.VScale, 1), (hS_3 = matchValue_5, (matchValue_2_3 = sym_5.STransform.Rotation, (matchValue_2_3.tag === 2) ? [comp_3.H * vS_3, comp_3.W * hS_3] : ((matchValue_2_3.tag === 1) ? [comp_3.W * hS_3, comp_3.H * vS_3] : ((matchValue_2_3.tag === 3) ? [comp_3.W * hS_3, comp_3.H * vS_3] : [comp_3.H * vS_3, comp_3.W * hS_3])))))))))[0] / 2;
            }
        }
        else if ((portsOnEdge_1 >= 1) && ((order === 0) ? true : (order === portsOnEdge_1))) {
            let patternInput_7;
            const sym_6 = symbol_1;
            const comp_4 = sym_6.Component;
            const matchValue_6 = defaultArg(sym_6.HScale, 1);
            const vS_4 = defaultArg(sym_6.VScale, 1);
            const hS_4 = matchValue_6;
            const matchValue_2_4 = sym_6.STransform.Rotation;
            switch (matchValue_2_4.tag) {
                case 1:
                case 3: {
                    patternInput_7 = [comp_4.W * hS_4, comp_4.H * vS_4];
                    break;
                }
                default:
                    patternInput_7 = [comp_4.H * vS_4, comp_4.W * hS_4];
            }
            const w_2 = patternInput_7[1];
            const h_2 = patternInput_7[0];
            const firstPortPos = getPortPosWithIndex(symbol_1, portsOnEdge_1, edge_1, 0);
            const lastPortPos = getPortPosWithIndex(symbol_1, portsOnEdge_1, edge_1, portsOnEdge_1 - 1);
            const firstPortXorY = (edge_1.tag === 0) ? firstPortPos.X : ((edge_1.tag === 1) ? firstPortPos.X : firstPortPos.Y);
            const lastPortXorY = (edge_1.tag === 0) ? lastPortPos.X : ((edge_1.tag === 1) ? lastPortPos.X : lastPortPos.Y);
            const hORw = (edge_1.tag === 0) ? w_2 : ((edge_1.tag === 1) ? w_2 : h_2);
            let matchResult_1;
            if (order === 0) {
                switch (edge_1.tag) {
                    case 1:
                    case 2: {
                        matchResult_1 = 0;
                        break;
                    }
                    default:
                        matchResult_1 = 1;
                }
            }
            else {
                switch (edge_1.tag) {
                    case 1:
                    case 2: {
                        matchResult_1 = 2;
                        break;
                    }
                    default:
                        matchResult_1 = 3;
                }
            }
            switch (matchResult_1) {
                case 0:
                    return (firstPortXorY / 2) - 2.5;
                case 1:
                    return ((hORw + firstPortXorY) / 2) + 2.5;
                case 2:
                    return ((hORw + lastPortXorY) / 2) + 2.5;
                default:
                    return (lastPortXorY / 2) - 2.5;
            }
        }
        else {
            switch (edge_1.tag) {
                case 0:
                case 1:
                    return (getPortPosWithIndex(symbol_1, portsOnEdge_1, edge_1, order - 1).X + getPortPosWithIndex(symbol_1, portsOnEdge_1, edge_1, order).X) / 2;
                default:
                    return (getPortPosWithIndex(symbol_1, portsOnEdge_1, edge_1, order - 1).Y + getPortPosWithIndex(symbol_1, portsOnEdge_1, edge_1, order).Y) / 2;
            }
        }
    };
    const findTargetPos = (port, symbol_2) => {
        let sym_7, comp_5, matchValue_8, vS_5, hS_5, matchValue_2_5, sym_8, comp_6, matchValue_9, vS_6, hS_6, matchValue_2_6;
        const tempSymbol = updatePortPos(symbol_2, pos, port.Id);
        const oldEdge = FSharpMap__get_Item(symbol_2.PortMaps.Orientation, port.Id);
        const oldOrder = findIndex((elem) => (elem === port.Id), FSharpMap__get_Item(symbol_2.PortMaps.Order, oldEdge)) | 0;
        const newEdge = FSharpMap__get_Item(tempSymbol.PortMaps.Orientation, port.Id);
        const newOrder = findIndex((elem_1) => (elem_1 === port.Id), FSharpMap__get_Item(tempSymbol.PortMaps.Order, newEdge)) | 0;
        const newPortPos = getPortPos(tempSymbol, port);
        const x = (newEdge.tag === 3) ? ((sym_7 = symbol_2, (comp_5 = sym_7.Component, (matchValue_8 = defaultArg(sym_7.HScale, 1), (vS_5 = defaultArg(sym_7.VScale, 1), (hS_5 = matchValue_8, (matchValue_2_5 = sym_7.STransform.Rotation, (matchValue_2_5.tag === 2) ? [comp_5.H * vS_5, comp_5.W * hS_5] : ((matchValue_2_5.tag === 1) ? [comp_5.W * hS_5, comp_5.H * vS_5] : ((matchValue_2_5.tag === 3) ? [comp_5.W * hS_5, comp_5.H * vS_5] : [comp_5.H * vS_5, comp_5.W * hS_5])))))))))[1] : newPortPos.X;
        const y = (newEdge.tag === 1) ? ((sym_8 = symbol_2, (comp_6 = sym_8.Component, (matchValue_9 = defaultArg(sym_8.HScale, 1), (vS_6 = defaultArg(sym_8.VScale, 1), (hS_6 = matchValue_9, (matchValue_2_6 = sym_8.STransform.Rotation, (matchValue_2_6.tag === 2) ? [comp_6.H * vS_6, comp_6.W * hS_6] : ((matchValue_2_6.tag === 1) ? [comp_6.W * hS_6, comp_6.H * vS_6] : ((matchValue_2_6.tag === 3) ? [comp_6.W * hS_6, comp_6.H * vS_6] : [comp_6.H * vS_6, comp_6.W * hS_6])))))))))[0] : newPortPos.Y;
        if (equals(newEdge, oldEdge)) {
            const diff = findOffsetSameEdge(symbol_2, newEdge);
            if (equals(newEdge, new Edge(0, [])) ? true : equals(newEdge, new Edge(1, []))) {
                if (oldOrder < newOrder) {
                    return [new XYPos(x + diff, y), pos];
                }
                else if (oldOrder === newOrder) {
                    return [new XYPos(x, y), pos];
                }
                else {
                    return [new XYPos(x - diff, y), pos];
                }
            }
            else if (oldOrder < newOrder) {
                return [new XYPos(x, y + diff), pos];
            }
            else if (oldOrder === newOrder) {
                return [new XYPos(x, y), pos];
            }
            else {
                return [new XYPos(x, y - diff), pos];
            }
        }
        else {
            const offset = findOffsetDifferentEdge(symbol_2, newEdge, newOrder);
            if (equals(newEdge, new Edge(0, [])) ? true : equals(newEdge, new Edge(1, []))) {
                return [new XYPos(offset, y), pos];
            }
            else {
                return [new XYPos(x, offset), pos];
            }
        }
    };
    const isTouchingEdge = (port_1, symId, oldSymbol) => {
        let value_4, value;
        const matchValue_10 = getCloseByEdge(oldSymbol, pos);
        if (matchValue_10 != null) {
            const target = findTargetPos(port_1, oldSymbol);
            const newSymbol_1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_showPorts_)(SymbolT_appearance_))(new SymbolT_ShowPorts(5, [port_1]))(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_movingPortTarget_)(target)(((value_4 = {
                CurrPos: pos,
                PortId: portId,
            }, Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_movingPort_)(value_4)))(oldSymbol)));
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(symId))(newSymbol_1)(model), Cmd_none()];
        }
        else {
            const newSymbol = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_showPorts_)(SymbolT_appearance_))(new SymbolT_ShowPorts(6, [port_1]))(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_movingPortTarget_)(void 0)(((value = {
                CurrPos: pos,
                PortId: portId,
            }, Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_movingPort_)(value)))(oldSymbol)));
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(symId))(newSymbol)(model), Cmd_none()];
        }
    };
    const port_2 = FSharpMap__get_Item(model.Ports, portId);
    const symId_1 = port_2.HostId;
    const oldSymbol_1 = FSharpMap__get_Item(model.Symbols, symId_1);
    if (oldSymbol_1.Component.Type.tag === 26) {
        return isTouchingEdge(port_2, symId_1, oldSymbol_1);
    }
    else {
        return [model, Cmd_none()];
    }
}

//# sourceMappingURL=SymbolPortHelpers.fs.js.map
