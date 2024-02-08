import { toConsole, printf, toFail, interpolate, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { getTextWidthInPixels, Text$, defaultText } from "../Common/DrawHelpers.fs.js";
import { $007CIsBinaryGate$007CNotBinaryGate$007C, isClocked, SymbolInfo, PortType, STransform, Component as Component_2, Port, Rotation, Edge, BoundingBox, XYPos } from "../Common/CommonTypes.fs.js";
import * as react from "react";
import { bind, map as map_2, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { safeHash, compare, comparePrimitives, int32ToString, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { SymbolT_AppearanceT, SymbolT_ShowCorners, SymbolT_ShowPorts, SymbolT_Symbol, SymbolT_PortMaps, SymbolT_Annotation } from "../Model/DrawModelType.fs.js";
import { filter as filter_1, toList as toList_1, ofList, tryFind, fold as fold_2, keys, empty as empty_1, remove, add, FSharpMap__get_Item, find, map } from "../fable_modules/fable-library.4.1.4/Map.js";
import { contains, findIndex, length, exists, zip, ofArray, fold, filter, append, max, isEmpty, map as map_1, collect, empty, reverse, removeAt, singleton, item } from "../fable_modules/fable-library.4.1.4/List.js";
import { isDigit } from "../fable_modules/fable-library.4.1.4/Char.js";
import { toList, last } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { uuid } from "../Interface/JSHelpers.fs.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { fold as fold_1, FSharpSet_op_Subtraction, ofSeq } from "../fable_modules/fable-library.4.1.4/Set.js";
import { max as max_1 } from "../fable_modules/fable-library.4.1.4/Double.js";

export const Constants_mergeSplitTextSize = "10px";

export const Constants_busSelectTextSize = "12px";

export const Constants_customPortSpacing = 40;

export const Constants_portPosEdgeGap = 0.7;

export const Constants_gatePortPosEdgeGap = 0.3;

export const Constants_legendVertOffset = 5;

export const Constants_legendLineSpacingInPixels = 16;

export const Constants_testShowLabelBoundingBoxes = false;

export const Constants_portFontSizeInPixels = 12;

export const Constants_labelFontSizeInPixels = 16;

export const Constants_customLegendFontSizeInPixels = 16;

export const Constants_otherLegendFontSizeInPixels = 14;

export const Constants_bitIndicationFontWeight = "400";

export const Constants_componentLabelStyle = new Text$("start", toText(interpolate("%.0f%P()px", [Constants_labelFontSizeInPixels])), "500", "Verdana", defaultText.Fill, defaultText.UserSelect, defaultText.DominantBaseline);

export const Constants_componentPortStyle = new Text$("start", toText(interpolate("%.0f%P()px", [Constants_portFontSizeInPixels])), "500", "Verdana", defaultText.Fill, defaultText.UserSelect, defaultText.DominantBaseline);

export const Constants_busSelectStyle = new Text$("start", "12px", "600", "helvetica", defaultText.Fill, defaultText.UserSelect, defaultText.DominantBaseline);

export const Constants_componentLabelOffsetDistance = Constants_testShowLabelBoundingBoxes ? 0 : 7;

export const Constants_thinComponentLabelOffsetDistance = Constants_testShowLabelBoundingBoxes ? 0 : 3;

export const Constants_componentLabelHeight = Constants_labelFontSizeInPixels;

export const Constants_labelCorrection = new XYPos(0, 0);

export const Constants_customComponentHint = (() => {
    const children = ["Press Ctrl and drag to", react.createElement("br", {}), "move ports or resize symbol"];
    return react.createElement("div", {}, ...children);
})();

export function DrawModelType_SymbolT_Symbol__Symbol_get_SymbolBoundingBox(this$) {
    let left, right;
    const sym = this$;
    let patternInput;
    const sym_1 = sym;
    const comp = sym_1.Component;
    const matchValue = defaultArg(sym_1.HScale, 1);
    const vS = defaultArg(sym_1.VScale, 1);
    const hS = matchValue;
    const matchValue_2 = sym_1.STransform.Rotation;
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
    if (equals(sym.Annotation, new SymbolT_Annotation(0, []))) {
        return new BoundingBox((left = sym.Pos, (right = (new XYPos(9, 9)), new XYPos(left.X - right.X, left.Y - right.Y))), 17, 17);
    }
    else {
        return new BoundingBox(sym.Pos, w, h);
    }
}

/**
 * Returns all the bounding boxes of all components in the model
 */
export function getBoundingBoxes(symModel) {
    return map((sId, sym) => {
        let left, right;
        const sym_1 = sym;
        let patternInput;
        const sym_2 = sym_1;
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
        return equals(sym_1.Annotation, new SymbolT_Annotation(0, [])) ? (new BoundingBox((left = sym_1.Pos, (right = (new XYPos(9, 9)), new XYPos(left.X - right.X, left.Y - right.Y))), 17, 17)) : (new BoundingBox(sym_1.Pos, w, h));
    }, symModel.Symbols);
}

/**
 * Returns the bounding boxes of all symbol labels in the model
 */
export function getLabelBoundingBoxes(model) {
    return map((_arg, sym) => sym.LabelBoundingBox, model.Symbols);
}

/**
 * Returns the bounding box of the symbol associated with compId
 */
export function getLabelBoundingBox(model, compId) {
    return find(compId, model.Symbols).LabelBoundingBox;
}

/**
 * Returns color for the fill of a symbol (when not selected)
 * Depends on theme and whether symbol is closed or not.
 */
export function getSymbolColour(compType, clocked, theme) {
    switch (theme.tag) {
        case 2: {
            let matchResult;
            switch (compType.tag) {
                case 33:
                case 34:
                case 40:
                case 31:
                case 32:
                case 41:
                case 42:
                case 35:
                case 37:
                case 36:
                case 38: {
                    matchResult = 0;
                    break;
                }
                case 48:
                case 0:
                case 1:
                case 2:
                case 49:
                case 7: {
                    matchResult = 2;
                    break;
                }
                case 28:
                case 27:
                case 6:
                case 25:
                case 3:
                case 4: {
                    matchResult = 3;
                    break;
                }
                case 29:
                case 30: {
                    matchResult = 4;
                    break;
                }
                case 26: {
                    if (clocked) {
                        matchResult = 1;
                    }
                    else {
                        matchResult = 5;
                    }
                    break;
                }
                default:
                    matchResult = 5;
            }
            switch (matchResult) {
                case 0:
                    return "lightblue";
                case 1:
                    return "lightblue";
                case 2:
                    return "#E8D0A9";
                case 3:
                    return "rgb(120,120,120)";
                case 4:
                    return "lightgray";
                default:
                    return "rgba(255,255,217,1)";
            }
        }
        default:
            return "lightgray";
    }
}

/**
 * Modify port position maps to move an existing Lefthand port (index in the list) to the bottom edge
 */
export function movePortToBottom(portMaps, index) {
    const leftPorts = FSharpMap__get_Item(portMaps.Order, new Edge(2, []));
    const portId = item(index, leftPorts);
    const newBottomPorts = singleton(portId);
    const newLeftPorts = removeAt(index, FSharpMap__get_Item(portMaps.Order, new Edge(2, [])));
    const newPortOrder = add(new Edge(2, []), newLeftPorts, add(new Edge(1, []), newBottomPorts, portMaps.Order));
    const newPortOrientation = add(portId, new Edge(1, []), portMaps.Orientation);
    return new SymbolT_PortMaps(newPortOrder, newPortOrientation);
}

/**
 * Work out a label bounding box from symbol, return symbol with box added.
 * The box has a margin Constants. componentLabelOffsetDistance around the label text outline.
 * This function should be included at the end of any function that changes component
 * or label position or orientation or shape.
 */
export function calcLabelBoundingBox(sym) {
    const textStyle = Constants_componentLabelStyle;
    const transform = sym.STransform;
    const comp = sym.Component;
    let labelRotation;
    let r_1;
    if (transform.flipped) {
        const matchValue_1 = transform.Rotation;
        r_1 = ((matchValue_1.tag === 1) ? (new Rotation(3, [])) : ((matchValue_1.tag === 3) ? (new Rotation(1, [])) : transform.Rotation));
    }
    else {
        r_1 = transform.Rotation;
    }
    const r1 = defaultArg(sym.LabelRotation, new Rotation(0, []));
    const r2 = r_1;
    const rot90 = (rot) => {
        switch (rot.tag) {
            case 1:
                return new Rotation(2, []);
            case 2:
                return new Rotation(3, []);
            case 3:
                return new Rotation(0, []);
            default:
                return new Rotation(1, []);
        }
    };
    const rot180 = (rot_1) => {
        switch (rot_1.tag) {
            case 1:
                return new Rotation(3, []);
            case 2:
                return new Rotation(0, []);
            case 3:
                return new Rotation(1, []);
            default:
                return new Rotation(2, []);
        }
    };
    labelRotation = ((r1.tag === 1) ? rot90(r2) : ((r1.tag === 2) ? rot180(r2) : ((r1.tag === 3) ? rot180(rot90(r2)) : r2)));
    let patternInput_1;
    const sym_1 = sym;
    const comp_1 = sym_1.Component;
    const matchValue_2 = defaultArg(sym_1.HScale, 1);
    const vS = defaultArg(sym_1.VScale, 1);
    const hS = matchValue_2;
    const matchValue_2_1 = sym_1.STransform.Rotation;
    switch (matchValue_2_1.tag) {
        case 1:
        case 3: {
            patternInput_1 = [comp_1.W * hS, comp_1.H * vS];
            break;
        }
        default:
            patternInput_1 = [comp_1.H * vS, comp_1.W * hS];
    }
    const w = patternInput_1[1];
    const h = patternInput_1[0];
    let centre;
    const symbol = sym;
    const comp_2 = symbol.Component;
    let patternInput_2;
    const comp_3 = comp_2;
    const matchValue_3 = defaultArg(symbol.HScale, 1);
    const vS_1 = defaultArg(symbol.VScale, 1);
    const hS_1 = matchValue_3;
    const matchValue_2_2 = symbol.STransform.Rotation;
    switch (matchValue_2_2.tag) {
        case 1:
        case 3: {
            patternInput_2 = [comp_3.W * hS_1, comp_3.H * vS_1];
            break;
        }
        default:
            patternInput_2 = [comp_3.H * vS_1, comp_3.W * hS_1];
    }
    const w_1 = patternInput_2[1];
    const h_1 = patternInput_2[0];
    const centreX = comp_2.X + (w_1 / 2);
    const centreY = comp_2.Y + (h_1 / 2);
    centre = (new XYPos(centreX, centreY));
    let margin;
    const matchValue_4 = sym.Component.Type;
    switch (matchValue_4.tag) {
        case 3:
        case 6:
        case 4: {
            margin = Constants_thinComponentLabelOffsetDistance;
            break;
        }
        default:
            margin = Constants_componentLabelOffsetDistance;
    }
    const labH = Constants_componentLabelHeight;
    const labW = getTextWidthInPixels(textStyle, comp.Label);
    const boxTopLeft = (labelRotation.tag === 3) ? (new XYPos(comp.X + w, (centre.Y - (labH / 2)) - margin)) : ((labelRotation.tag === 1) ? (new XYPos((comp.X - (2 * margin)) - labW, (centre.Y - (labH / 2)) - margin)) : ((labelRotation.tag === 2) ? (new XYPos((centre.X - (labW / 2)) - margin, comp.Y + h)) : (new XYPos((centre.X - (labW / 2)) - margin, (comp.Y - labH) - (2 * margin)))));
    const box = (comp.Label === "") ? (new BoundingBox(boxTopLeft, 0, 0)) : (sym.LabelHasDefaultPos ? (new BoundingBox(boxTopLeft, labW + (2 * margin), labH + (2 * margin))) : sym.LabelBoundingBox);
    return new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, box, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
}

/**
 * Insert titles compatible with greater than 1 buswidth
 */
export function busTitleAndBits(t, n) {
    if (n === 1) {
        return t;
    }
    else if ((t === "") && (n > 1)) {
        return `${t}(${n - 1}:${0})`;
    }
    else if (n > 1) {
        return `${t}.(${n - 1}:${0})`;
    }
    else {
        throw new Error("non positive bus width");
    }
}

export function nBitsGateTitle(gateType, n) {
    if (n === 1) {
        return gateType;
    }
    else {
        return ((int32ToString(n) + "-bit.") + gateType) + "-N";
    }
}

/**
 * Insert titles for bus select
 * used once
 */
export function busSelectTitle(wob, lsb) {
    if (wob === 1) {
        return `${lsb}`;
    }
    else if (wob > 1) {
        return `(${(wob + lsb) - 1}:${lsb})`;
    }
    else {
        throw new Error("non positive bus width in bustitle");
    }
}

/**
 * Decodes the component type into component labels
 */
export function getPrefix(compType) {
    switch (compType.tag) {
        case 8:
        case 10:
            return "G";
        case 11:
            return "MUX";
        case 12:
            return "MUX";
        case 13:
            return "MUX";
        case 14:
            return "DM";
        case 15:
            return "DM";
        case 16:
            return "DM";
        case 46:
            return "SHIFT";
        case 17:
        case 18:
        case 19:
        case 20:
            return "ADD";
        case 21:
            return "NXOR";
        case 22:
            return "AND";
        case 24:
            return "OR";
        case 23:
            return "NOT";
        case 25:
            return "S";
        case 31:
        case 32:
            return "FF";
        case 33:
        case 34:
            return "REG";
        case 39:
            return "AROM";
        case 40:
            return "ROM";
        case 41:
            return "RAM";
        case 42:
            return "ARAM";
        case 26: {
            const c = compType.fields[0];
            return c.Name.toLocaleUpperCase() + (isDigit(last(c.Name.split(""))) ? "." : "");
        }
        case 7:
            return "C";
        case 47:
        case 5:
            return "EQ";
        case 9:
            return "DEC";
        case 35:
        case 37:
        case 36:
        case 38:
            return "CNT";
        case 27:
            return "MW";
        case 29:
            return "MN";
        case 28:
            return "SW";
        case 30:
            return "SN";
        default:
            return "";
    }
}

export function getGateComponentLegend(gType) {
    switch (gType) {
        case "or":
        case "nor":
            return "≥1";
        case "xor":
        case "xnor":
            return "=1";
        default:
            return "&";
    }
}

export function getTextGateComponentLegend(gType) {
    switch (gType) {
        case "or":
            return "Or";
        case "xor":
            return "Xor";
        case "nand":
            return "Nand";
        case "nor":
            return "Nor";
        case "xnor":
            return "Xnor";
        default:
            return "And";
    }
}

export function getGateNComponentLegend(numInputs, gType) {
    return nBitsGateTitle(getTextGateComponentLegend(gType), numInputs);
}

export function getComponentLegend(componentType, rotation) {
    let matchResult, gateType, numInputs, n, n_1, n_2, x, x_1, x_2, x_3, x_4, n_3, x_5;
    switch (componentType.tag) {
        case 10: {
            matchResult = 0;
            gateType = componentType.fields[0];
            numInputs = componentType.fields[1];
            break;
        }
        case 8: {
            matchResult = 1;
            break;
        }
        case 9: {
            matchResult = 2;
            break;
        }
        case 17: {
            matchResult = 3;
            n = componentType.fields[0];
            break;
        }
        case 18: {
            matchResult = 3;
            n = componentType.fields[0];
            break;
        }
        case 20: {
            matchResult = 3;
            n = componentType.fields[0];
            break;
        }
        case 19: {
            matchResult = 3;
            n = componentType.fields[0];
            break;
        }
        case 33: {
            matchResult = 4;
            n_1 = componentType.fields[0];
            break;
        }
        case 34: {
            matchResult = 4;
            n_1 = componentType.fields[0];
            break;
        }
        case 39: {
            matchResult = 5;
            break;
        }
        case 40: {
            matchResult = 6;
            break;
        }
        case 41: {
            matchResult = 7;
            break;
        }
        case 42: {
            matchResult = 8;
            break;
        }
        case 31: {
            matchResult = 9;
            break;
        }
        case 32: {
            matchResult = 10;
            break;
        }
        case 35: {
            matchResult = 11;
            n_2 = componentType.fields[0];
            break;
        }
        case 37: {
            matchResult = 11;
            n_2 = componentType.fields[0];
            break;
        }
        case 36: {
            matchResult = 11;
            n_2 = componentType.fields[0];
            break;
        }
        case 38: {
            matchResult = 11;
            n_2 = componentType.fields[0];
            break;
        }
        case 21: {
            if (componentType.fields[1] != null) {
                matchResult = 13;
                x_1 = componentType.fields[0];
            }
            else {
                matchResult = 12;
                x = componentType.fields[0];
            }
            break;
        }
        case 24: {
            matchResult = 14;
            x_2 = componentType.fields[0];
            break;
        }
        case 22: {
            matchResult = 15;
            x_3 = componentType.fields[0];
            break;
        }
        case 23: {
            matchResult = 16;
            x_4 = componentType.fields[0];
            break;
        }
        case 46: {
            matchResult = 17;
            n_3 = componentType.fields[0];
            break;
        }
        case 26: {
            matchResult = 18;
            x_5 = componentType.fields[0];
            break;
        }
        case 29: {
            matchResult = 19;
            break;
        }
        case 30: {
            matchResult = 20;
            break;
        }
        default:
            matchResult = 21;
    }
    switch (matchResult) {
        case 0:
            return getGateComponentLegend(gateType);
        case 1:
            return "1";
        case 2:
            return "Decode";
        case 3:
            return busTitleAndBits("Adder", n);
        case 4:
            switch (rotation.tag) {
                case 1:
                case 3:
                    return busTitleAndBits("Reg", n_1);
                default:
                    return busTitleAndBits("Register", n_1);
            }
        case 5:
            return "Async.ROM";
        case 6:
            return "Sync.ROM";
        case 7:
            return "Sync.RAM";
        case 8:
            return "Async.RAM";
        case 9:
            return "DFF";
        case 10:
            return "DFFE";
        case 11:
            return busTitleAndBits("Counter", n_2);
        case 12:
            return nBitsGateTitle("Xor", x);
        case 13:
            return nBitsGateTitle("Multiply", x_1);
        case 14:
            return nBitsGateTitle("Or", x_2);
        case 15:
            return nBitsGateTitle("And", x_3);
        case 16:
            return nBitsGateTitle("Not", x_4);
        case 17:
            return busTitleAndBits("Shift", n_3);
        case 18:
            return x_5.Name.toLocaleUpperCase();
        case 19:
            return "Merge";
        case 20:
            return "Split";
        default:
            return "";
    }
}

/**
 * By default all output ports are on the right, input ports on lefty, (of a normal orientation symbol).
 * A few symbols have ports on top or bottom as defined here.
 * Note that custom components can have ports positioned by user.
 */
export function movePortsToCorrectEdgeForComponentType(ct, portMaps) {
    switch (ct.tag) {
        case 11:
            return movePortToBottom(portMaps, 2);
        case 12:
            return movePortToBottom(portMaps, 4);
        case 13:
            return movePortToBottom(portMaps, 8);
        case 17:
        case 19: {
            const rightSide = FSharpMap__get_Item(portMaps.Order, new Edge(3, []));
            const newRightSide = reverse(rightSide);
            const newPortOrder = add(new Edge(3, []), newRightSide, portMaps.Order);
            const portMaps$0027 = new SymbolT_PortMaps(newPortOrder, portMaps.Orientation);
            return movePortToBottom(portMaps$0027, 0);
        }
        case 32:
            return movePortToBottom(portMaps, 1);
        case 34:
            return movePortToBottom(portMaps, 1);
        case 14:
        case 15:
        case 16:
            return movePortToBottom(portMaps, 1);
        default:
            return portMaps;
    }
}

/**
 * Generates a new list of ports of specified type
 */
export function portLists(numOfPorts, hostID, portType) {
    if (numOfPorts < 1) {
        return empty();
    }
    else {
        return collect((x) => singleton(new Port(uuid(), x, portType, hostID)), toList(rangeDouble(0, 1, numOfPorts - 1)));
    }
}

export function customToLength(lst) {
    const labelList = map_1((arg) => arg[0].length, lst);
    if (isEmpty(labelList)) {
        return 0;
    }
    else {
        return max(labelList, {
            Compare: comparePrimitives,
        }) | 0;
    }
}

/**
 * get the max length (in pixels) of any of the Text strings in a list
 * Hack - for now assume text char width is constant
 */
export function customStringToLength(lst) {
    const getPortTextWidth = (portLab) => getTextWidthInPixels(Constants_componentPortStyle, portLab);
    if (isEmpty(lst)) {
        return 0;
    }
    else {
        const portStrL = lst;
        return max(map_1(getPortTextWidth, portStrL), {
            Compare: comparePrimitives,
        });
    }
}

export function addPortToMaps(edge, portMaps, portId) {
    return new SymbolT_PortMaps(add(edge, append(FSharpMap__get_Item(portMaps.Order, edge), singleton(portId)), portMaps.Order), add(portId, edge, portMaps.Orientation));
}

export function deletePortFromMaps(port, portMaps) {
    const deletePort = (ports) => filter((y) => (port !== y), ports);
    return new SymbolT_PortMaps(map((edge, pL) => deletePort(pL), portMaps.Order), remove(port, portMaps.Orientation));
}

/**
 * work out the initial (default) port placing for a componenent.
 * also used for legacy circuits loaded without port layoiut info.
 */
export function initPortOrientation(comp) {
    const defaultportOrder = fold((currMap, edge) => add(edge, empty(), currMap), empty_1({
        Compare: compare,
    }), ofArray([new Edge(2, []), new Edge(3, []), new Edge(0, []), new Edge(1, [])]));
    const inputMaps = fold((maps, port) => addPortToMaps(new Edge(2, []), maps, port.Id), new SymbolT_PortMaps(defaultportOrder, empty_1({
        Compare: comparePrimitives,
    })), comp.InputPorts);
    const res = fold((maps_1, port_1) => addPortToMaps(new Edge(3, []), maps_1, port_1.Id), inputMaps, reverse(comp.OutputPorts));
    return movePortsToCorrectEdgeForComponentType(comp.Type, res);
}

/**
 * obtain map from port IDs to port names for Custom Component.
 * for other components types this returns empty map
 */
export function getCustomPortIdMap(comp) {
    const label = comp.Label;
    const matchValue = comp.Type;
    if (matchValue.tag === 26) {
        const customType = matchValue.fields[0];
        const inputPorts = comp.InputPorts;
        const outputPorts = comp.OutputPorts;
        const inputPortIdLabels = zip(inputPorts, customType.InputLabels);
        const outputPortIdLabels = zip(outputPorts, customType.OutputLabels);
        const inputMap = fold((currMap, tupledArg) => {
            const port = tupledArg[0];
            const label_1 = tupledArg[1];
            return add(port.Id, label_1[0], currMap);
        }, empty_1({
            Compare: comparePrimitives,
        }), inputPortIdLabels);
        const finalMap = fold((currMap_1, tupledArg_1) => {
            const port_1 = tupledArg_1[0];
            const label_2 = tupledArg_1[1];
            return add(port_1.Id, label_2[0], currMap_1);
        }, inputMap, outputPortIdLabels);
        return finalMap;
    }
    else {
        return empty_1({
            Compare: comparePrimitives,
        });
    }
}

/**
 * Needed because the I/Os of a custom component can be changed on anotehr sheet.
 * When the component is reloaded its port maps will be inconsistent.
 * This function keeps existing layout, and adds new I/Os or deletes old ones.
 */
export function makeMapsConsistent(portIdMap, sym) {
    const newPortIds = ofSeq(keys(portIdMap), {
        Compare: comparePrimitives,
    });
    const currentPortIds = ofSeq(keys(sym.PortMaps.Orientation), {
        Compare: comparePrimitives,
    });
    const addedPortIds = FSharpSet_op_Subtraction(newPortIds, currentPortIds);
    const deletedPortIds = FSharpSet_op_Subtraction(currentPortIds, newPortIds);
    const maps = sym.PortMaps;
    const tupledArg = [fold_1((maps_1, port) => {
        const edgeToAddTo = exists((p) => (p.Id === port), sym.Component.InputPorts) ? (new Edge(2, [])) : (new Edge(3, []));
        return addPortToMaps(edgeToAddTo, maps_1, port);
    }, maps, addedPortIds), deletedPortIds];
    return fold_1((maps_3, port_1) => deletePortFromMaps(port_1, maps_3), tupledArg[0], tupledArg[1]);
}

/**
 * adjust symbol (and component) dimensions based on current ports and labels of a custom component.
 * leaves other symbols unchanged
 */
export function autoScaleHAndW(sym) {
    let matchValue, ct, portIdMap, portMaps, convertIdsToLbls, portLabels, h, getHorizontalSpace, leftSpace, rightSpace, topLength, bottomLength, labelLength, maxW, w, scaledW, scaledH, inputRecord, comp;
    return calcLabelBoundingBox((matchValue = sym.Component.Type, (matchValue.tag === 26) ? ((ct = matchValue.fields[0], (portIdMap = getCustomPortIdMap(sym.Component), (portMaps = makeMapsConsistent(portIdMap, sym), (convertIdsToLbls = ((currMap, edge, idList) => {
        const lblLst = map_1((id) => FSharpMap__get_Item(portIdMap, id), idList);
        return add(edge, lblLst, currMap);
    }), (portLabels = fold_2(convertIdsToLbls, empty_1({
        Compare: compare,
    }), portMaps.Order), (h = (30 + (Constants_customPortSpacing * max_1(length(FSharpMap__get_Item(portLabels, new Edge(2, []))), length(FSharpMap__get_Item(portLabels, new Edge(3, [])))))), (getHorizontalSpace = ((side) => {
        const labs = FSharpMap__get_Item(portLabels, side);
        if ((length(labs) % 2) === 0) {
            return 0;
        }
        else {
            return customStringToLength(singleton(item(~~(length(labs) / 2), labs)));
        }
    }), (leftSpace = getHorizontalSpace(new Edge(2, [])), (rightSpace = getHorizontalSpace(new Edge(3, [])), (topLength = customStringToLength(FSharpMap__get_Item(portLabels, new Edge(0, []))), (bottomLength = customStringToLength(FSharpMap__get_Item(portLabels, new Edge(1, []))), (labelLength = ((Constants_customLegendFontSizeInPixels / Constants_portFontSizeInPixels) * customStringToLength(singleton(ct.Name))), (maxW = (1.1 * max(ofArray([((2 * max_1(leftSpace, rightSpace)) + (labelLength * 1.333)) + 10, (length(FSharpMap__get_Item(portLabels, new Edge(0, []))) + 1) * topLength, (length(FSharpMap__get_Item(portLabels, new Edge(1, []))) + 1) * bottomLength]), {
        Compare: comparePrimitives,
    })), (w = maxW, (scaledW = max_1(w, 30 * 4), (scaledH = max_1(h, 30 * 2), new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, (inputRecord = sym.Component, new Component_2(inputRecord.Id, inputRecord.Type, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, sym.Pos.X, sym.Pos.Y, scaledH, scaledW, inputRecord.SymbolInfo)), sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, portMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget)))))))))))))))))) : ((comp = sym.Component, new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, new Component_2(comp.Id, comp.Type, comp.Label, comp.InputPorts, comp.OutputPorts, sym.Pos.X, sym.Pos.Y, comp.H, comp.W, comp.SymbolInfo), sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget)))));
}

/**
 * return (num inputs, num outputs, height, width)
 */
export function getComponentProperties(compType, label) {
    const gS = 30;
    let matchResult, a_2, b, a_13, n_3;
    switch (compType.tag) {
        case 48: {
            matchResult = 1;
            break;
        }
        case 10: {
            matchResult = 2;
            break;
        }
        case 29: {
            matchResult = 3;
            break;
        }
        case 30: {
            matchResult = 4;
            break;
        }
        case 8: {
            matchResult = 5;
            break;
        }
        case 0: {
            matchResult = 6;
            break;
        }
        case 1: {
            matchResult = 7;
            break;
        }
        case 2: {
            matchResult = 8;
            break;
        }
        case 3: {
            matchResult = 9;
            break;
        }
        case 4: {
            matchResult = 10;
            break;
        }
        case 9: {
            matchResult = 11;
            break;
        }
        case 27: {
            matchResult = 13;
            break;
        }
        case 28: {
            matchResult = 14;
            break;
        }
        case 11: {
            matchResult = 15;
            break;
        }
        case 12: {
            matchResult = 16;
            break;
        }
        case 13: {
            matchResult = 17;
            break;
        }
        case 14: {
            matchResult = 18;
            break;
        }
        case 15: {
            matchResult = 19;
            break;
        }
        case 16: {
            matchResult = 20;
            break;
        }
        case 6: {
            matchResult = 21;
            break;
        }
        case 47:
        case 5: {
            matchResult = 22;
            break;
        }
        case 31: {
            matchResult = 23;
            break;
        }
        case 32: {
            matchResult = 24;
            break;
        }
        case 33: {
            matchResult = 25;
            break;
        }
        case 34: {
            matchResult = 26;
            break;
        }
        case 35: {
            matchResult = 27;
            break;
        }
        case 37: {
            matchResult = 28;
            break;
        }
        case 36: {
            matchResult = 29;
            break;
        }
        case 38: {
            matchResult = 30;
            break;
        }
        case 39: {
            matchResult = 31;
            break;
        }
        case 40: {
            matchResult = 32;
            break;
        }
        case 23: {
            matchResult = 35;
            break;
        }
        case 25: {
            matchResult = 36;
            break;
        }
        case 17: {
            matchResult = 37;
            break;
        }
        case 18: {
            matchResult = 38;
            break;
        }
        case 19: {
            matchResult = 39;
            break;
        }
        case 20: {
            matchResult = 40;
            break;
        }
        case 46: {
            matchResult = 41;
            break;
        }
        case 26: {
            matchResult = 42;
            break;
        }
        case 7: {
            matchResult = 12;
            a_2 = compType.fields[0];
            b = compType.fields[1];
            break;
        }
        case 49: {
            matchResult = 12;
            a_2 = compType.fields[0];
            b = compType.fields[1];
            break;
        }
        case 41: {
            matchResult = 33;
            a_13 = compType.fields[0];
            break;
        }
        case 42: {
            matchResult = 33;
            a_13 = compType.fields[0];
            break;
        }
        case 21: {
            matchResult = 34;
            n_3 = compType.fields[0];
            break;
        }
        case 24: {
            matchResult = 34;
            n_3 = compType.fields[0];
            break;
        }
        case 22: {
            matchResult = 34;
            n_3 = compType.fields[0];
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
        case 2: {
            const n = compType.fields[1] | 0;
            return [n, 1, ((1.5 * gS) * n) / 2, 1.5 * gS];
        }
        case 3: {
            const n_1 = compType.fields[0] | 0;
            const k = ((n_1 < 3) ? 3 : n_1) | 0;
            return [n_1, 1, ((2 * gS) * k) / 2, 3 * gS];
        }
        case 4: {
            const n_2 = compType.fields[0] | 0;
            const k_1 = ((n_2 < 3) ? 3 : n_2) | 0;
            return [1, n_2, ((2 * gS) * k_1) / 2, 3 * gS];
        }
        case 5:
            return [1, 1, 1 * gS, 1 * gS];
        case 6:
            return [0, 1, gS, 2 * gS];
        case 7: {
            const a = compType.fields[0] | 0;
            return [1, 0, gS, 2 * gS];
        }
        case 8: {
            const a_1 = compType.fields[0] | 0;
            return [1, 0, gS, gS];
        }
        case 9:
            return [1, 1, gS / 2, gS];
        case 10:
            return [1, 0, gS, gS];
        case 11:
            return [2, 4, 8 * gS, 3 * gS];
        case 12:
            return [0, 1, gS, 2 * gS];
        case 13:
            return [2, 1, 2 * gS, 2 * gS];
        case 14: {
            const a_3 = compType.fields[0] | 0;
            return [1, 2, 2 * gS, 2 * gS];
        }
        case 15:
            return [3, 1, 3 * gS, 2 * gS];
        case 16:
            return [5, 1, 8 * gS, 2 * gS];
        case 17:
            return [9, 1, 16 * gS, 2 * gS];
        case 18:
            return [2, 2, 3 * gS, 2 * gS];
        case 19:
            return [2, 4, 8 * gS, 2 * gS];
        case 20:
            return [2, 8, 16 * gS, 2 * gS];
        case 21: {
            const b_1 = compType.fields[1] | 0;
            const a_4 = compType.fields[0] | 0;
            return [1, 1, gS / 2, 2 * gS];
        }
        case 22:
            return [1, 1, gS, 2 * gS];
        case 23:
            return [1, 1, 2.5 * gS, 2.5 * gS];
        case 24:
            return [2, 1, 2.5 * gS, 2.5 * gS];
        case 25: {
            const a_5 = compType.fields[0] | 0;
            return [1, 1, 2 * gS, 4 * gS];
        }
        case 26: {
            const a_6 = compType.fields[0] | 0;
            return [2, 1, 2 * gS, 4 * gS];
        }
        case 27: {
            const a_7 = compType.fields[0] | 0;
            return [3, 1, 4 * gS, 5 * gS];
        }
        case 28: {
            const a_8 = compType.fields[0] | 0;
            return [2, 1, 3 * gS, 5 * gS];
        }
        case 29: {
            const a_9 = compType.fields[0] | 0;
            return [1, 1, 2 * gS, 5 * gS];
        }
        case 30: {
            const a_10 = compType.fields[0] | 0;
            return [0, 1, 2 * gS, 3.5 * gS];
        }
        case 31: {
            const a_11 = compType.fields[0];
            return [1, 1, 4 * gS, 5 * gS];
        }
        case 32: {
            const a_12 = compType.fields[0];
            return [1, 1, 4 * gS, 5 * gS];
        }
        case 33:
            return [3, 1, 4 * gS, 5 * gS];
        case 34:
            return [2, 1, 4 * gS, 4 * gS];
        case 35: {
            const n_4 = compType.fields[0] | 0;
            return [1, 1, 3 * gS, 4 * gS];
        }
        case 36: {
            const n_5 = compType.fields[0] | 0;
            return [1, 1, 2 * gS, 2 * gS];
        }
        case 37: {
            const n_6 = compType.fields[0] | 0;
            return [3, 2, 3 * gS, 4 * gS];
        }
        case 38: {
            const n_7 = compType.fields[0] | 0;
            return [2, 2, 3 * gS, 4 * gS];
        }
        case 39: {
            const n_8 = compType.fields[0] | 0;
            return [3, 1, 3 * gS, 4 * gS];
        }
        case 40: {
            const n_9 = compType.fields[0] | 0;
            return [2, 1, 3 * gS, 4 * gS];
        }
        case 41:
            return [2, 1, 3 * gS, 4 * gS];
        default: {
            const cct = compType.fields[0];
            return [length(cct.InputLabels), length(cct.OutputLabels), 0, 0];
        }
    }
}

/**
 * make a completely new component
 */
export function makeComponent(pos, compType, id, label) {
    const defaultSTransform = new STransform(new Rotation(0, []), false);
    const makeComponent$0027 = (tupledArg, label_1) => {
        let PortOrder;
        const n = tupledArg[0] | 0;
        const nout = tupledArg[1] | 0;
        const h = tupledArg[2];
        const w = tupledArg[3];
        const inputPorts = portLists(n, id, new PortType(0, []));
        const outputPorts = portLists(nout, id, new PortType(1, []));
        return new Component_2(id, compType, label_1, inputPorts, outputPorts, pos.X - (w / 2), pos.Y - (h / 2), h, w, (PortOrder = empty_1({
            Compare: compare,
        }), new SymbolInfo(void 0, void 0, defaultSTransform, void 0, empty_1({
            Compare: comparePrimitives,
        }), PortOrder, void 0, void 0)));
    };
    const props = getComponentProperties(compType, label);
    return makeComponent$0027(props, label);
}

/**
 * Function to generate a new symbol
 * ldcs is only used to determine if custom components are clocked by traversing all components on
 * the custom component sheet recursively. If ldcs = [] custom components will displayed as
 * unclocked (clor and clock symbol) but everything else will work fine.
 */
export function createNewSymbol(ldcs, pos, comptype, label, theme) {
    const id = uuid();
    const style = Constants_componentLabelStyle;
    const comp = makeComponent(pos, comptype, id, label);
    const transform = new STransform(new Rotation(0, []), false);
    const symbolIsClocked = isClocked(empty(), ldcs, comp);
    return calcLabelBoundingBox(autoScaleHAndW(new SymbolT_Symbol(new XYPos(pos.X - (comp.W / 2), pos.Y - (comp.H / 2)), new XYPos(0, 0), new XYPos(0, 0), void 0, void 0, void 0, new BoundingBox(pos, 0, 0), true, void 0, new SymbolT_AppearanceT(new SymbolT_ShowPorts(4, []), new SymbolT_ShowCorners(1, []), false, getSymbolColour(comptype, symbolIsClocked, theme), 1), id, comp, void 0, false, symbolIsClocked, transform, false, initPortOrientation(comp), void 0, void 0, void 0, void 0)));
}

export function addToPortModel(model, sym) {
    const addOnePort = (currentPorts, port) => add(port.Id, port, currentPorts);
    const addedInputPorts = fold(addOnePort, model.Ports, sym.Component.InputPorts);
    return fold(addOnePort, addedInputPorts, sym.Component.OutputPorts);
}

/**
 * Returns true if an edge has the select port of a mux
 */
export function isMuxSel(sym, side) {
    const matchValue = sym.Component.Type;
    switch (matchValue.tag) {
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16: {
            const matchValue_1 = sym.STransform.Rotation;
            let matchResult;
            switch (matchValue_1.tag) {
                case 1: {
                    switch (side.tag) {
                        case 2:
                        case 3: {
                            matchResult = 0;
                            break;
                        }
                        default:
                            matchResult = 1;
                    }
                    break;
                }
                case 2: {
                    switch (side.tag) {
                        case 1:
                        case 0: {
                            matchResult = 0;
                            break;
                        }
                        default:
                            matchResult = 1;
                    }
                    break;
                }
                case 3: {
                    switch (side.tag) {
                        case 2:
                        case 3: {
                            matchResult = 0;
                            break;
                        }
                        default:
                            matchResult = 1;
                    }
                    break;
                }
                default:
                    switch (side.tag) {
                        case 1:
                        case 0: {
                            matchResult = 0;
                            break;
                        }
                        default:
                            matchResult = 1;
                    }
            }
            switch (matchResult) {
                case 0:
                    return true;
                default:
                    return false;
            }
        }
        default:
            return false;
    }
}

/**
 * Based on a symbol and an edge, if the port is a mux select, return an extra offset required for the port (because of the weird shape of the mux)
 */
export function getMuxSelOffset(sym, side) {
    const sideOffset = (offset) => {
        switch (side.tag) {
            case 1:
                return new XYPos(0, -offset);
            case 2:
                return new XYPos(offset, 0);
            case 3:
                return new XYPos(-offset, 0);
            default:
                return new XYPos(0, offset);
        }
    };
    const compType = sym.Component.Type;
    if (isMuxSel(sym, side)) {
        switch (compType.tag) {
            case 11:
            case 14:
                return sideOffset(9);
            case 12:
            case 15:
                return sideOffset(9.5);
            case 13:
            case 16:
                return sideOffset(9.5);
            default:
                return new XYPos(0, 0);
        }
    }
    else {
        return new XYPos(0, 0);
    }
}

/**
 * Given a symbol and a port, it returns the offset of the port from the top left corner of the symbol
 */
export function getPortPos(sym, port) {
    let side;
    const portId = port.Id;
    side = FSharpMap__get_Item(sym.PortMaps.Orientation, portId);
    const ports = FSharpMap__get_Item(sym.PortMaps.Order, side);
    const numberOnSide = length(ports) | 0;
    const index = findIndex((p) => (p === port.Id), ports) | 0;
    let index$0027;
    const matchValue = sym.ReversedInputPorts;
    let matchResult;
    if (matchValue != null) {
        if (matchValue) {
            matchResult = 0;
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0: {
            index$0027 = ((numberOnSide - 1) - index);
            break;
        }
        default:
            index$0027 = index;
    }
    let gap;
    const ct = sym.Component.Type;
    let matchResult_1;
    switch (ct.tag) {
        case 27:
        case 28: {
            matchResult_1 = 0;
            break;
        }
        case 11: {
            if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                matchResult_1 = 1;
            }
            else {
                matchResult_1 = 1;
            }
            break;
        }
        case 29: {
            if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                matchResult_1 = 1;
            }
            else {
                matchResult_1 = 1;
            }
            break;
        }
        case 30: {
            if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                matchResult_1 = 1;
            }
            else {
                matchResult_1 = 1;
            }
            break;
        }
        default:
            if ($007CIsBinaryGate$007CNotBinaryGate$007C(ct).tag === 0) {
                matchResult_1 = 1;
            }
            else {
                matchResult_1 = 2;
            }
    }
    switch (matchResult_1) {
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
    const sym_3 = sym;
    const comp = sym_3.Component;
    const matchValue_1 = defaultArg(sym_3.HScale, 1);
    const vS = defaultArg(sym_3.VScale, 1);
    const hS = matchValue_1;
    const matchValue_2 = sym_3.STransform.Rotation;
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
    const portDimension = length(ports) - 1;
    let patternInput_3;
    const sym_4 = sym;
    const comp_1 = sym_4.Component;
    const matchValue_3 = defaultArg(sym_4.HScale, 1);
    const vS_1 = defaultArg(sym_4.VScale, 1);
    const hS_1 = matchValue_3;
    const matchValue_2_1 = sym_4.STransform.Rotation;
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
            const yOffset_1 = (h_1 * ((portDimension - index$0027) + gap)) / (portDimension + (2 * gap));
            const left_2 = baseOffset$0027;
            const right_2 = new XYPos(0, yOffset_1);
            return new XYPos(left_2.X + right_2.X, left_2.Y + right_2.Y);
        }
        case 1: {
            const xOffset = (w_1 * (index$0027 + topBottomGap)) / (portDimension + (2 * topBottomGap));
            const left_3 = baseOffset$0027;
            const right_3 = new XYPos(xOffset, 0);
            return new XYPos(left_3.X + right_3.X, left_3.Y + right_3.Y);
        }
        case 0: {
            const xOffset_1 = (w_1 * ((portDimension - index$0027) + topBottomGap)) / (portDimension + (2 * topBottomGap));
            const left_4 = baseOffset$0027;
            const right_4 = new XYPos(xOffset_1, 0);
            return new XYPos(left_4.X + right_4.X, left_4.Y + right_4.Y);
        }
        default: {
            const yOffset = (h_1 * (index$0027 + gap)) / (portDimension + (2 * gap));
            const left_1 = baseOffset$0027;
            const right_1 = new XYPos(0, yOffset);
            return new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y);
        }
    }
}

/**
 * Returns the location of a given portId, with good efficiency
 */
export function getPortLocation(defPos, model, portId) {
    const portOpt = tryFind(portId, model.Ports);
    const symbolIdOpt = map_2((port) => port.HostId, portOpt);
    const symOpt = bind((symbolId) => tryFind(symbolId, model.Symbols), symbolIdOpt);
    let matchResult, port_1, sym, pos;
    if (symOpt != null) {
        if (portOpt != null) {
            matchResult = 0;
            port_1 = portOpt;
            sym = symOpt;
        }
        else if (defPos != null) {
            matchResult = 1;
            pos = defPos;
        }
        else {
            matchResult = 2;
        }
    }
    else if (defPos != null) {
        matchResult = 1;
        pos = defPos;
    }
    else {
        matchResult = 2;
    }
    switch (matchResult) {
        case 0: {
            const left = getPortPos(sym, port_1);
            const right = sym.Pos;
            return new XYPos(left.X + right.X, left.Y + right.Y);
        }
        case 1: {
            toConsole(`Can't find port or symbol: Port='${portOpt}', Symbol='${symOpt}`);
            return pos;
        }
        default:
            return toFail(`Can't find port or symbol: Port='${portOpt}', Symbol='${symOpt}`);
    }
}

/**
 * Returns the input port positions of the specified symbols in model
 */
export function getInputPortsLocationMap(model, symbols) {
    const getSymbolInputPortsLoc = (sym) => map_1((port) => {
        let left, right;
        return [port.Id, (left = getPortPos(sym, port), (right = sym.Pos, new XYPos(left.X + right.X, left.Y + right.Y)))];
    }, sym.Component.InputPorts);
    return ofList(collect(getSymbolInputPortsLoc, symbols), {
        Compare: compare,
    });
}

/**
 * Returns the output port positions of the specified symbols in model
 */
export function getOutputPortsLocationMap(model, symbols) {
    const getSymbolOutputPortsLoc = (sym) => map_1((port) => {
        let left, right;
        return [port.Id, (left = getPortPos(sym, port), (right = sym.Pos, new XYPos(left.X + right.X, left.Y + right.Y)))];
    }, sym.Component.OutputPorts);
    return ofList(collect(getSymbolOutputPortsLoc, symbols), {
        Compare: compare,
    });
}

/**
 * Returns all the port locations of the given components
 */
export function getPortLocations(model, symbolIds) {
    const symbols = map_1((tuple) => tuple[1], toList_1(filter_1((symbolId, _arg) => contains(symbolId, symbolIds, {
        Equals: equals,
        GetHashCode: safeHash,
    }), model.Symbols)));
    const getInputPortMap = getInputPortsLocationMap(model, symbols);
    const getOutputPortMap = getOutputPortsLocationMap(model, symbols);
    return [getInputPortMap, getOutputPortMap];
}

//# sourceMappingURL=Symbol.fs.js.map
