import { Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { BoundingBox__Centre, STransform as STransform_1, Component as Component_1, Rotation, Edge, BoundingBox, XYPos, Edge__get_Opposite, $007CIsBinaryGate$007CNotBinaryGate$007C, Edge_$reflection, Port_$reflection } from "../Common/CommonTypes.fs.js";
import { SheetT_scalingBox_, SheetT_symbols_, SheetT_ScalingBox, SymbolT_ThemeType, SymbolT_Msg, SheetT_Model, SheetT_Msg, BusWireT_Msg, SymbolT_Model, SymbolT_PortMaps, SymbolT_Symbol, SymbolT_Annotation, BusWireT_symbolOf_, BusWireT_Wire_$reflection, SymbolT_Symbol_$reflection } from "../Model/DrawModelType.fs.js";
import { class_type, int32_type, tuple_type, record_type, float64_type, list_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { ofList, find, map, toArray, empty, fold, filter, isEmpty, add, tryFind, FSharpMap__get_Item } from "../fable_modules/fable-library.4.1.4/Map.js";
import { calcLabelBoundingBox, getPortPos, Constants_portPosEdgeGap, Constants_gatePortPosEdgeGap } from "./Symbol.fs.js";
import { append, map2, contains, map as map_1, ofArray, fold as fold_2, reverse, minBy, maxBy, item, tryPick, head, singleton, length } from "../fable_modules/fable-library.4.1.4/List.js";
import { value as value_4, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { wireSymEdge, setCustomCompHW, moveSymbol, wiresBtwnSyms, filterPortBySym, portsOfWires } from "./BlockHelpers.fs.js";
import { safeHash, compare, comparePrimitives, compareArrays, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { Optic_Get, Optic_Get_op_HatDot_Z146BA564, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { routeAndSeparateSymbolWires } from "./BusWireSeparate.fs.js";
import { printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { boxesIntersect as boxesIntersect_1 } from "../Common/DrawHelpers.fs.js";
import { sortByDescending, fold as fold_1 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { flipSideHorizontal, rotatePortInfo } from "./SymbolResizeHelpers.fs.js";
import { Cmd_OfFunc_result } from "../fable_modules/Fable.Elmish.3.1.0/./cmd.fs.js";
import { Msg } from "../Model/ModelType.fs.js";
import { Cmd_batch } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { createAnnotation } from "./SymbolUpdate.fs.js";

export class PortInfo extends Record {
    constructor(port, sym, side, ports, gap, topBottomGap, portDimension, h, w, portGap) {
        super();
        this.port = port;
        this.sym = sym;
        this.side = side;
        this.ports = ports;
        this.gap = gap;
        this.topBottomGap = topBottomGap;
        this.portDimension = portDimension;
        this.h = h;
        this.w = w;
        this.portGap = portGap;
    }
}

export function PortInfo_$reflection() {
    return record_type("RotateScale.PortInfo", [], PortInfo, () => [["port", Port_$reflection()], ["sym", SymbolT_Symbol_$reflection()], ["side", Edge_$reflection()], ["ports", list_type(string_type)], ["gap", float64_type], ["topBottomGap", float64_type], ["portDimension", float64_type], ["h", float64_type], ["w", float64_type], ["portGap", float64_type]]);
}

/**
 * TODO: this is mostly copy pasted code from Symbol.getPortPos, perhaps abstract out the existing code there to use makePortInfo.
 * Could not simply use getPortPos because more data (side, topBottomGap, etc.) is needed to caclulate the new dimensions of the resized symbol.
 */
export function makePortInfo(sym, port) {
    let side;
    const portId = port.Id;
    side = FSharpMap__get_Item(sym.PortMaps.Orientation, portId);
    const ports = FSharpMap__get_Item(sym.PortMaps.Order, side);
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
    const portDimension = length(ports) - 1;
    let patternInput_1;
    const sym_2 = sym;
    const comp = sym_2.Component;
    const matchValue = defaultArg(sym_2.HScale, 1);
    const vS = defaultArg(sym_2.VScale, 1);
    const hS = matchValue;
    const matchValue_2 = sym_2.STransform.Rotation;
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
    const portGap = (side.tag === 3) ? (h / (portDimension + (2 * gap))) : ((side.tag === 1) ? (w / (portDimension + (2 * topBottomGap))) : ((side.tag === 0) ? (w / (portDimension + (2 * topBottomGap))) : (h / (portDimension + (2 * gap)))));
    return new PortInfo(port, sym, side, ports, gap, topBottomGap, portDimension, h, w, portGap);
}

export class wireSymbols extends Record {
    constructor(symA, symB, wire) {
        super();
        this.symA = symA;
        this.symB = symB;
        this.wire = wire;
    }
}

export function wireSymbols_$reflection() {
    return record_type("RotateScale.wireSymbols", [], wireSymbols, () => [["symA", SymbolT_Symbol_$reflection()], ["symB", SymbolT_Symbol_$reflection()], ["wire", BusWireT_Wire_$reflection()]]);
}

export function getPortAB(wModel, wireSyms) {
    const ports = portsOfWires(wModel, singleton(wireSyms.wire));
    const portA = head(filterPortBySym(ports, wireSyms.symA));
    const portB = head(filterPortBySym(ports, wireSyms.symB));
    return [portA, portB];
}

/**
 * Try to get two ports that are on opposite edges.
 */
export function getOppEdgePortInfo(wModel, symbolToSize, otherSymbol) {
    const wires = wiresBtwnSyms(wModel, symbolToSize, otherSymbol);
    const tryGetOppEdgePorts = (wireSyms) => {
        const patternInput = getPortAB(wModel, wireSyms);
        const portB = patternInput[1];
        const portA = patternInput[0];
        let edgeA;
        const portId = portA.Id;
        edgeA = FSharpMap__get_Item(wireSyms.symA.PortMaps.Orientation, portId);
        let edgeB;
        const portId_1 = portB.Id;
        edgeB = FSharpMap__get_Item(wireSyms.symB.PortMaps.Orientation, portId_1);
        if (equals(edgeA, Edge__get_Opposite(edgeB))) {
            return [makePortInfo(wireSyms.symA, portA), makePortInfo(wireSyms.symB, portB)];
        }
        else {
            return void 0;
        }
    };
    return tryPick((w) => tryGetOppEdgePorts(new wireSymbols(symbolToSize, otherSymbol, w)), wires);
}

export function alignPortsOffset(movePInfo, otherPInfo) {
    const getPortRealPos = (pInfo) => {
        const left = getPortPos(pInfo.sym, pInfo.port);
        const right = pInfo.sym.Pos;
        return new XYPos(left.X + right.X, left.Y + right.Y);
    };
    const movePortPos = getPortRealPos(movePInfo);
    const otherPortPos = getPortRealPos(otherPInfo);
    let posDiff;
    const left_1 = otherPortPos;
    const right_1 = movePortPos;
    posDiff = (new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y));
    const matchValue = movePInfo.side;
    switch (matchValue.tag) {
        case 2:
        case 3:
            return new XYPos(0, posDiff.Y);
        default:
            return new XYPos(posDiff.X, 0);
    }
}

export function alignSymbols(wModel, symbolToSize, otherSymbol) {
    const matchValue = getOppEdgePortInfo(wModel, symbolToSize, otherSymbol);
    if (matchValue != null) {
        const otherPortInfo = matchValue[1];
        const movePortInfo = matchValue[0];
        const offset = alignPortsOffset(movePortInfo, otherPortInfo);
        const symbol$0027 = moveSymbol(offset, symbolToSize);
        const model$0027 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), BusWireT_symbolOf_(symbolToSize.Id))(symbol$0027)(wModel);
        return routeAndSeparateSymbolWires(model$0027, symbolToSize.Id);
    }
    else {
        return wModel;
    }
}

/**
 * HLP23: To test this, it must be given two symbols interconnected by wires. It then resizes symbolToSize
 * so that the connecting wires are exactly straight
 * HLP23: It should work out the interconnecting wires (wires) from
 * the two symbols, wModel.Wires and sModel.Ports
 * It will do nothing if symbolToOrder is not a Custom component (which has adjustable size).
 */
export function reSizeSymbol(wModel, symbolToSize, otherSymbol) {
    const wires = wiresBtwnSyms(wModel, symbolToSize, otherSymbol);
    let patternInput_1;
    const matchValue = getOppEdgePortInfo(wModel, symbolToSize, otherSymbol);
    if (matchValue != null) {
        const pIB = matchValue[1];
        const pIA = matchValue[0];
        patternInput_1 = [pIA, pIB];
    }
    else {
        const patternInput = getPortAB(wModel, new wireSymbols(symbolToSize, otherSymbol, item(0, wires)));
        const pB = patternInput[1];
        const pA = patternInput[0];
        patternInput_1 = [makePortInfo(symbolToSize, pA), makePortInfo(symbolToSize, pB)];
    }
    const resizePortInfo = patternInput_1[0];
    const otherPortInfo = patternInput_1[1];
    let patternInput_2;
    const matchValue_1 = resizePortInfo.side;
    switch (matchValue_1.tag) {
        case 0:
        case 1: {
            patternInput_2 = [resizePortInfo.h, otherPortInfo.portGap * (resizePortInfo.portDimension + (2 * resizePortInfo.topBottomGap))];
            break;
        }
        default:
            patternInput_2 = [otherPortInfo.portGap * (resizePortInfo.portDimension + (2 * resizePortInfo.gap)), resizePortInfo.w];
    }
    const w = patternInput_2[1];
    const h = patternInput_2[0];
    if (symbolToSize.Component.Type.tag === 26) {
        const scaledSymbol = setCustomCompHW(h, w, symbolToSize);
        const scaledInfo = makePortInfo(scaledSymbol, resizePortInfo.port);
        const offset = alignPortsOffset(scaledInfo, otherPortInfo);
        return moveSymbol(offset, scaledSymbol);
    }
    else {
        return symbolToSize;
    }
}

/**
 * For UI to call ResizeSymbol.
 */
export function reSizeSymbolTopLevel(wModel, symbolToSize, otherSymbol) {
    toConsole(`ReSizeSymbol: ToResize:${symbolToSize.Component.Label}, Other:${otherSymbol.Component.Label}`);
    const scaledSymbol = reSizeSymbol(wModel, symbolToSize, otherSymbol);
    const model$0027 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), BusWireT_symbolOf_(symbolToSize.Id))(scaledSymbol)(wModel);
    return routeAndSeparateSymbolWires(model$0027, symbolToSize.Id);
}

export class SymConnDataT extends Record {
    constructor(ConnMap) {
        super();
        this.ConnMap = ConnMap;
    }
}

export function SymConnDataT_$reflection() {
    return record_type("RotateScale.SymConnDataT", [], SymConnDataT, () => [["ConnMap", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(string_type, Edge_$reflection()), int32_type])]]);
}

/**
 * If a wire between a target symbol and another symbol connects opposite edges, return the edge that the wire is connected to on the target symbol
 */
export function tryWireSymOppEdge(wModel, wire, sym, otherSym) {
    const symEdge = wireSymEdge(wModel, wire, sym);
    const otherSymEdge = wireSymEdge(wModel, wire, otherSym);
    if (equals(symEdge, Edge__get_Opposite(otherSymEdge))) {
        return symEdge;
    }
    else {
        return void 0;
    }
}

export function updateOrInsert(symConnData, edge, cid) {
    const m = symConnData.ConnMap;
    const count = (1 + defaultArg(tryFind([cid, edge], m), 0)) | 0;
    return new SymConnDataT(add([cid, edge], count, m));
}

export function noSymbolOverlap(boxesIntersect, boundingBoxes, sym) {
    let left, right;
    let symBB;
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
    symBB = (equals(sym_1.Annotation, new SymbolT_Annotation(0, [])) ? (new BoundingBox((left = sym_1.Pos, (right = (new XYPos(9, 9)), new XYPos(left.X - right.X, left.Y - right.Y))), 17, 17)) : (new BoundingBox(sym_1.Pos, w, h)));
    return isEmpty(filter((sId, boundingBox) => {
        if (boxesIntersect(boundingBox, symBB)) {
            return !equals(sym.Id, sId);
        }
        else {
            return false;
        }
    }, boundingBoxes));
}

/**
 * Finds the optimal size and position for the selected symbol w.r.t. to its surrounding symbols.
 */
export function optimiseSymbol(wModel, symbol, boundingBoxes) {
    let array_1;
    const updateData = (symConnData, _arg, wire) => {
        let matchValue;
        const model = wModel;
        let portId;
        const s = wire.OutputPort;
        portId = s;
        const port = FSharpMap__get_Item(model.Symbol.Ports, portId);
        const symbol_1 = FSharpMap__get_Item(model.Symbol.Symbols, port.HostId);
        matchValue = symbol_1;
        let symT;
        const model_1 = wModel;
        let portId_1;
        const s_1 = wire.InputPort;
        portId_1 = s_1;
        const port_1 = FSharpMap__get_Item(model_1.Symbol.Ports, portId_1);
        const symbol_2 = FSharpMap__get_Item(model_1.Symbol.Symbols, port_1.HostId);
        symT = symbol_2;
        const symS = matchValue;
        const otherSymbol = (!equals(symS.Id, symbol.Id) && equals(symT.Id, symbol.Id)) ? symS : ((equals(symS, symbol) && !equals(symT, symbol)) ? symT : void 0);
        if (otherSymbol == null) {
            return symConnData;
        }
        else {
            const otherSym = otherSymbol;
            const edge = tryWireSymOppEdge(wModel, wire, symbol, otherSym);
            if (edge == null) {
                return symConnData;
            }
            else {
                const e = edge;
                return updateOrInsert(symConnData, e, otherSym.Id);
            }
        }
    };
    const symConnData_1 = fold(updateData, new SymConnDataT(empty({
        Compare: compareArrays,
    })), wModel.Wires);
    const tryResize = (symCount, sym) => {
        const alignSym = (sym_1, otherSym_1) => {
            const resizedSym = reSizeSymbol(wModel, sym_1, otherSym_1);
            const noOverlap = noSymbolOverlap(boxesIntersect_1, boundingBoxes, resizedSym);
            if (noOverlap) {
                return [true, resizedSym];
            }
            else {
                return [false, sym_1];
            }
        };
        const folder_1 = (tupledArg, tupledArg_1) => {
            const hAligned = tupledArg[0];
            const vAligned = tupledArg[1];
            const sym_2 = tupledArg[2];
            const _arg_3 = tupledArg_1[0];
            const edge_1 = _arg_3[1];
            const cid = _arg_3[0];
            const otherSym_2 = Optic_Get_op_HatDot_Z146BA564(new Optic_Get(), BusWireT_symbolOf_(cid))(wModel);
            let matchResult;
            if (hAligned) {
                if (vAligned) {
                    matchResult = 2;
                }
                else if (equals(edge_1, new Edge(2, [])) ? true : equals(edge_1, new Edge(3, []))) {
                    matchResult = 1;
                }
                else {
                    matchResult = 2;
                }
            }
            else if (equals(edge_1, new Edge(0, [])) ? true : equals(edge_1, new Edge(1, []))) {
                matchResult = 0;
            }
            else if (vAligned) {
                matchResult = 2;
            }
            else if (equals(edge_1, new Edge(2, [])) ? true : equals(edge_1, new Edge(3, []))) {
                matchResult = 1;
            }
            else {
                matchResult = 2;
            }
            switch (matchResult) {
                case 0: {
                    const patternInput_1 = alignSym(sym_2, otherSym_2);
                    const resizedSym_1 = patternInput_1[1];
                    const hAligned$0027 = patternInput_1[0];
                    return [hAligned$0027, vAligned, resizedSym_1];
                }
                case 1: {
                    const patternInput_2 = alignSym(sym_2, otherSym_2);
                    const vAligned$0027 = patternInput_2[0];
                    const resizedSym_2 = patternInput_2[1];
                    return [hAligned, vAligned$0027, resizedSym_2];
                }
                default:
                    return [hAligned, vAligned, sym_2];
            }
        };
        const sym$0027 = fold_1(folder_1, [false, false, sym], symCount)[2];
        return sym$0027;
    };
    let scaledSymbol;
    const symCount_1 = sortByDescending((tuple) => tuple[1], (array_1 = toArray(symConnData_1.ConnMap), array_1.filter((tupledArg_2) => {
        const count = tupledArg_2[1] | 0;
        return count > 1;
    })), {
        Compare: comparePrimitives,
    });
    scaledSymbol = tryResize(symCount_1, symbol);
    const model$0027 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), BusWireT_symbolOf_(symbol.Id))(scaledSymbol)(wModel);
    return routeAndSeparateSymbolWires(model$0027, symbol.Id);
}

/**
 * HLP 23: AUTHOR Ismagilov - Get the bounding box of multiple selected symbols
 */
export function getBlock(symbols) {
    let sym_1, comp_1, matchValue_3, vS_1, hS_1, matchValue_2_1, sym_3, comp_3, matchValue_5, vS_3, hS_3, matchValue_2_3;
    const maxXsym = maxBy((x) => {
        let sym, comp, matchValue, vS, hS, matchValue_2;
        return x.Pos.X + ((sym = x, (comp = sym.Component, (matchValue = defaultArg(sym.HScale, 1), (vS = defaultArg(sym.VScale, 1), (hS = matchValue, (matchValue_2 = sym.STransform.Rotation, (matchValue_2.tag === 2) ? [comp.H * vS, comp.W * hS] : ((matchValue_2.tag === 1) ? [comp.W * hS, comp.H * vS] : ((matchValue_2.tag === 3) ? [comp.W * hS, comp.H * vS] : [comp.H * vS, comp.W * hS])))))))))[1];
    }, symbols, {
        Compare: comparePrimitives,
    });
    const maxX = maxXsym.Pos.X + ((sym_1 = maxXsym, (comp_1 = sym_1.Component, (matchValue_3 = defaultArg(sym_1.HScale, 1), (vS_1 = defaultArg(sym_1.VScale, 1), (hS_1 = matchValue_3, (matchValue_2_1 = sym_1.STransform.Rotation, (matchValue_2_1.tag === 2) ? [comp_1.H * vS_1, comp_1.W * hS_1] : ((matchValue_2_1.tag === 1) ? [comp_1.W * hS_1, comp_1.H * vS_1] : ((matchValue_2_1.tag === 3) ? [comp_1.W * hS_1, comp_1.H * vS_1] : [comp_1.H * vS_1, comp_1.W * hS_1])))))))))[1];
    const minX = minBy((x_2) => x_2.Pos.X, symbols, {
        Compare: comparePrimitives,
    }).Pos.X;
    const maxYsym = maxBy((x_4) => {
        let sym_2, comp_2, matchValue_4, vS_2, hS_2, matchValue_2_2;
        return x_4.Pos.Y + ((sym_2 = x_4, (comp_2 = sym_2.Component, (matchValue_4 = defaultArg(sym_2.HScale, 1), (vS_2 = defaultArg(sym_2.VScale, 1), (hS_2 = matchValue_4, (matchValue_2_2 = sym_2.STransform.Rotation, (matchValue_2_2.tag === 2) ? [comp_2.H * vS_2, comp_2.W * hS_2] : ((matchValue_2_2.tag === 1) ? [comp_2.W * hS_2, comp_2.H * vS_2] : ((matchValue_2_2.tag === 3) ? [comp_2.W * hS_2, comp_2.H * vS_2] : [comp_2.H * vS_2, comp_2.W * hS_2])))))))))[0];
    }, symbols, {
        Compare: comparePrimitives,
    });
    const maxY = maxYsym.Pos.Y + ((sym_3 = maxYsym, (comp_3 = sym_3.Component, (matchValue_5 = defaultArg(sym_3.HScale, 1), (vS_3 = defaultArg(sym_3.VScale, 1), (hS_3 = matchValue_5, (matchValue_2_3 = sym_3.STransform.Rotation, (matchValue_2_3.tag === 2) ? [comp_3.H * vS_3, comp_3.W * hS_3] : ((matchValue_2_3.tag === 1) ? [comp_3.W * hS_3, comp_3.H * vS_3] : ((matchValue_2_3.tag === 3) ? [comp_3.W * hS_3, comp_3.H * vS_3] : [comp_3.H * vS_3, comp_3.W * hS_3])))))))))[0];
    const minY = minBy((x_6) => x_6.Pos.Y, symbols, {
        Compare: comparePrimitives,
    }).Pos.Y;
    return new BoundingBox(new XYPos(minX, minY), maxX - minX, maxY - minY);
}

/**
 * HLP 23: AUTHOR Ismagilov - Takes a point Pos, a centre Pos, and a rotation type and returns the point flipped about the centre
 */
export function rotatePointAboutBlockCentre(point, centre, rotation) {
    const relativeToCentre = (x) => {
        const left = x;
        const right = centre;
        return new XYPos(left.X - right.X, left.Y - right.Y);
    };
    const rotateAboutCentre = (pointIn) => {
        switch (rotation.tag) {
            case 1:
                return new XYPos(pointIn.Y, -pointIn.X);
            case 2:
                return new XYPos(-pointIn.X, -pointIn.Y);
            case 3:
                return new XYPos(-pointIn.Y, pointIn.X);
            default:
                return pointIn;
        }
    };
    const relativeToTopLeft = (x_1) => {
        const left_1 = centre;
        const right_1 = x_1;
        return new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y);
    };
    return relativeToTopLeft(rotateAboutCentre(relativeToCentre(point)));
}

/**
 * HLP 23: AUTHOR Ismagilov - Takes a point Pos, a centre Pos, and a flip type and returns the point flipped about the centre
 */
export function flipPointAboutBlockCentre(point, center, flip) {
    if (flip === "flipVertical") {
        return new XYPos(point.X, center.Y - (point.Y - center.Y));
    }
    else {
        return new XYPos(center.X - (point.X - center.X), point.Y);
    }
}

/**
 * HLP 23: AUTHOR Ismagilov - Get the new top left of a symbol after it has been rotated
 */
export function adjustPosForBlockRotation(rotation, h, w, pos) {
    const posOffset = (rotation.tag === 1) ? (new XYPos(h, 0)) : ((rotation.tag === 2) ? (new XYPos(w, -h)) : ((rotation.tag === 3) ? (new XYPos(0, w)) : (new XYPos(0, 0))));
    const left = pos;
    const right = posOffset;
    return new XYPos(left.X - right.X, left.Y - right.Y);
}

/**
 * HLP 23: AUTHOR Ismagilov - Get the new top left of a symbol after it has been flipped
 */
export function adjustPosForBlockFlip(flip, h, w, pos) {
    const posOffset = (flip === "flipVertical") ? (new XYPos(0, h)) : (new XYPos(w, 0));
    const left = pos;
    const right = posOffset;
    return new XYPos(left.X - right.X, left.Y - right.Y);
}

/**
 * HLP 23: AUTHOR Ismagilov - Rotate a symbol in its block.
 */
export function rotateSymbolInBlock(rotation, blockCentre, sym) {
    let rot, rot_1, r1, rot_2, r2, rot90, rot180, r1_1, r2_1, rot90_1, rot180_1;
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
    let newTopLeft;
    const pos = rotatePointAboutBlockCentre(sym.Pos, blockCentre, (rot = rotation, (rot.tag === 2) ? (new Rotation(0, [])) : ((rot.tag === 1) ? (new Rotation(3, [])) : ((rot.tag === 3) ? (new Rotation(1, [])) : (new Rotation(2, []))))));
    newTopLeft = adjustPosForBlockRotation((rot_1 = rotation, (rot_1.tag === 2) ? (new Rotation(0, [])) : ((rot_1.tag === 1) ? (new Rotation(3, [])) : ((rot_1.tag === 3) ? (new Rotation(1, [])) : (new Rotation(2, []))))), h, w, pos);
    let newComponent;
    const inputRecord = sym.Component;
    newComponent = (new Component_1(inputRecord.Id, inputRecord.Type, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, newTopLeft.X, newTopLeft.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo));
    const newSTransform = sym.STransform.flipped ? (new STransform_1((r1 = ((rot_2 = rotation, (rot_2.tag === 2) ? (new Rotation(0, [])) : ((rot_2.tag === 1) ? (new Rotation(3, [])) : ((rot_2.tag === 3) ? (new Rotation(1, [])) : (new Rotation(2, [])))))), (r2 = sym.STransform.Rotation, (rot90 = ((rot_3) => {
        switch (rot_3.tag) {
            case 1:
                return new Rotation(2, []);
            case 2:
                return new Rotation(3, []);
            case 3:
                return new Rotation(0, []);
            default:
                return new Rotation(1, []);
        }
    }), (rot180 = ((rot_1_1) => {
        switch (rot_1_1.tag) {
            case 1:
                return new Rotation(3, []);
            case 2:
                return new Rotation(0, []);
            case 3:
                return new Rotation(1, []);
            default:
                return new Rotation(2, []);
        }
    }), (r1.tag === 1) ? rot90(r2) : ((r1.tag === 2) ? rot180(r2) : ((r1.tag === 3) ? rot180(rot90(r2)) : r2)))))), sym.STransform.flipped)) : (new STransform_1((r1_1 = rotation, (r2_1 = sym.STransform.Rotation, (rot90_1 = ((rot_4) => {
        switch (rot_4.tag) {
            case 1:
                return new Rotation(2, []);
            case 2:
                return new Rotation(3, []);
            case 3:
                return new Rotation(0, []);
            default:
                return new Rotation(1, []);
        }
    }), (rot180_1 = ((rot_1_2) => {
        switch (rot_1_2.tag) {
            case 1:
                return new Rotation(3, []);
            case 2:
                return new Rotation(0, []);
            case 3:
                return new Rotation(1, []);
            default:
                return new Rotation(2, []);
        }
    }), (r1_1.tag === 1) ? rot90_1(r2_1) : ((r1_1.tag === 2) ? rot180_1(r2_1) : ((r1_1.tag === 3) ? rot180_1(rot90_1(r2_1)) : r2_1)))))), sym.STransform.flipped));
    return calcLabelBoundingBox(new SymbolT_Symbol(newTopLeft, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, true, sym.LabelRotation, sym.Appearance, sym.Id, newComponent, sym.Annotation, sym.Moving, sym.IsClocked, newSTransform, sym.ReversedInputPorts, rotatePortInfo(rotation, sym.PortMaps), sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget));
}

/**
 * HLP 23: AUTHOR Ismagilov - Flip a symbol horizontally or vertically in its block.
 */
export function flipSymbolInBlock(flip, blockCentre, sym) {
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
    const newTopLeft = adjustPosForBlockFlip(flip, h, w, flipPointAboutBlockCentre(sym.Pos, blockCentre, flip));
    const portOrientation = map((id, side) => flipSideHorizontal(side), sym.PortMaps.Orientation);
    const flipPortList = (currPortOrder, side_1) => add(flipSideHorizontal(side_1), FSharpMap__get_Item(sym.PortMaps.Order, side_1), currPortOrder);
    const portOrder = map((edge, order) => reverse(order), fold_2(flipPortList, empty({
        Compare: compare,
    }), ofArray([new Edge(0, []), new Edge(2, []), new Edge(1, []), new Edge(3, [])])));
    const newSTransform = new STransform_1(sym.STransform.Rotation, !sym.STransform.flipped);
    let newcomponent;
    const inputRecord = sym.Component;
    newcomponent = (new Component_1(inputRecord.Id, inputRecord.Type, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, newTopLeft.X, newTopLeft.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo));
    const sym_3 = calcLabelBoundingBox(new SymbolT_Symbol(newTopLeft, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, true, sym.LabelRotation, sym.Appearance, sym.Id, newcomponent, sym.Annotation, sym.Moving, sym.IsClocked, newSTransform, sym.ReversedInputPorts, new SymbolT_PortMaps(portOrder, portOrientation), sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget));
    if (flip === "flipVertical") {
        const newblock = getBlock(singleton(sym_3));
        const newblockCenter = BoundingBox__Centre(newblock);
        return rotateSymbolInBlock(new Rotation(3, []), newblockCenter, rotateSymbolInBlock(new Rotation(3, []), newblockCenter, sym_3));
    }
    else {
        return sym_3;
    }
}

/**
 * HLP 23: AUTHOR Ismagilov - Scales selected symbol up or down.
 */
export function scaleSymbolInBlock(scaleType, block, sym) {
    let symCenter;
    const symbol = sym;
    const comp = symbol.Component;
    let patternInput;
    const comp_1 = comp;
    const matchValue = defaultArg(symbol.HScale, 1);
    const vS = defaultArg(symbol.VScale, 1);
    const hS = matchValue;
    const matchValue_2 = symbol.STransform.Rotation;
    switch (matchValue_2.tag) {
        case 1:
        case 3: {
            patternInput = [comp_1.W * hS, comp_1.H * vS];
            break;
        }
        default:
            patternInput = [comp_1.H * vS, comp_1.W * hS];
    }
    const w = patternInput[1];
    const h = patternInput[0];
    const centreX = comp.X + (w / 2);
    const centreY = comp.Y + (h / 2);
    symCenter = (new XYPos(centreX, centreY));
    const yProp = (symCenter.Y - block.TopLeft.Y) / block.H;
    const xProp = (symCenter.X - block.TopLeft.X) / block.W;
    const newCenter = (scaleType === "scaleDown") ? (new XYPos((block.TopLeft.X + 5) + ((block.W - 10) * xProp), (block.TopLeft.Y + 5) + ((block.H - 10) * yProp))) : (new XYPos((block.TopLeft.X - 5) + ((block.W + 10) * xProp), (block.TopLeft.Y - 5) + ((block.H + 10) * yProp)));
    let patternInput_4;
    const sym_1 = sym;
    const comp_2 = sym_1.Component;
    const matchValue_5 = defaultArg(sym_1.HScale, 1);
    const vS_1 = defaultArg(sym_1.VScale, 1);
    const hS_1 = matchValue_5;
    const matchValue_2_1 = sym_1.STransform.Rotation;
    switch (matchValue_2_1.tag) {
        case 1:
        case 3: {
            patternInput_4 = [comp_2.W * hS_1, comp_2.H * vS_1];
            break;
        }
        default:
            patternInput_4 = [comp_2.H * vS_1, comp_2.W * hS_1];
    }
    const w_1 = patternInput_4[1];
    const h_1 = patternInput_4[0];
    const newPos = new XYPos(newCenter.X - (w_1 / 2), newCenter.Y - (h_1 / 2));
    let newComponent;
    const inputRecord = sym.Component;
    newComponent = (new Component_1(inputRecord.Id, inputRecord.Type, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, newPos.X, newPos.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo));
    return new SymbolT_Symbol(newPos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, true, sym.LabelRotation, sym.Appearance, sym.Id, newComponent, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
}

/**
 * HLP 23: AUTHOR Klapper - Rotates a symbol based on a degree, including: ports and component parameters.
 */
export function rotateSymbolByDegree(degree, sym) {
    const pos = new XYPos(sym.Component.X + (sym.Component.W / 2), sym.Component.Y + (sym.Component.H / 2));
    if (degree.tag === 0) {
        return sym;
    }
    else {
        return rotateSymbolInBlock(degree, pos, sym);
    }
}

/**
 * HLP 23: AUTHOR Ismagilov - Rotates a block of symbols, returning the new symbol model
 */
export function rotateBlock(compList, model, rotation) {
    toConsole(printf("running rotateBlock"));
    const SelectedSymbols = map_1((x) => find(x, model.Symbols), compList);
    const UnselectedSymbols = filter((x_1, _arg) => !contains(x_1, compList, {
        Equals: equals,
        GetHashCode: safeHash,
    }), model.Symbols);
    const block = getBlock(SelectedSymbols);
    const newSymbols = map_1((x_3) => {
        let rot;
        return rotateSymbolInBlock((rot = rotation, (rot.tag === 2) ? (new Rotation(0, [])) : ((rot.tag === 1) ? (new Rotation(3, [])) : ((rot.tag === 3) ? (new Rotation(1, [])) : (new Rotation(2, []))))), BoundingBox__Centre(block), x_3);
    }, SelectedSymbols);
    return new SymbolT_Model(fold((acc, k, v) => add(k, v, acc), UnselectedSymbols, ofList(map2((x_4, y_1) => [x_4, y_1], compList, newSymbols), {
        Compare: compare,
    })), model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
}

export function oneCompBoundsBothEdges(selectedSymbols) {
    let maxXSymCentre;
    const symbol_1 = maxBy((x) => {
        let sym, comp, matchValue, vS, hS, matchValue_2;
        return x.Pos.X + ((sym = x, (comp = sym.Component, (matchValue = defaultArg(sym.HScale, 1), (vS = defaultArg(sym.VScale, 1), (hS = matchValue, (matchValue_2 = sym.STransform.Rotation, (matchValue_2.tag === 2) ? [comp.H * vS, comp.W * hS] : ((matchValue_2.tag === 1) ? [comp.W * hS, comp.H * vS] : ((matchValue_2.tag === 3) ? [comp.W * hS, comp.H * vS] : [comp.H * vS, comp.W * hS])))))))))[1];
    }, selectedSymbols, {
        Compare: comparePrimitives,
    });
    const comp_1 = symbol_1.Component;
    let patternInput_1;
    const comp_2 = comp_1;
    const matchValue_3 = defaultArg(symbol_1.HScale, 1);
    const vS_1 = defaultArg(symbol_1.VScale, 1);
    const hS_1 = matchValue_3;
    const matchValue_2_1 = symbol_1.STransform.Rotation;
    switch (matchValue_2_1.tag) {
        case 1:
        case 3: {
            patternInput_1 = [comp_2.W * hS_1, comp_2.H * vS_1];
            break;
        }
        default:
            patternInput_1 = [comp_2.H * vS_1, comp_2.W * hS_1];
    }
    const w = patternInput_1[1];
    const h = patternInput_1[0];
    const centreX = comp_1.X + (w / 2);
    const centreY = comp_1.Y + (h / 2);
    maxXSymCentre = (new XYPos(centreX, centreY));
    let minXSymCentre;
    const symbol_3 = minBy((x_2) => x_2.Pos.X, selectedSymbols, {
        Compare: comparePrimitives,
    });
    const comp_3 = symbol_3.Component;
    let patternInput_3;
    const comp_4 = comp_3;
    const matchValue_4 = defaultArg(symbol_3.HScale, 1);
    const vS_2 = defaultArg(symbol_3.VScale, 1);
    const hS_2 = matchValue_4;
    const matchValue_2_2 = symbol_3.STransform.Rotation;
    switch (matchValue_2_2.tag) {
        case 1:
        case 3: {
            patternInput_3 = [comp_4.W * hS_2, comp_4.H * vS_2];
            break;
        }
        default:
            patternInput_3 = [comp_4.H * vS_2, comp_4.W * hS_2];
    }
    const w_1 = patternInput_3[1];
    const h_1 = patternInput_3[0];
    const centreX_1 = comp_3.X + (w_1 / 2);
    const centreY_1 = comp_3.Y + (h_1 / 2);
    minXSymCentre = (new XYPos(centreX_1, centreY_1));
    let maxYSymCentre;
    const symbol_5 = maxBy((y_2) => {
        let sym_1, comp_5, matchValue_5, vS_3, hS_3, matchValue_2_3;
        return y_2.Pos.Y + ((sym_1 = y_2, (comp_5 = sym_1.Component, (matchValue_5 = defaultArg(sym_1.HScale, 1), (vS_3 = defaultArg(sym_1.VScale, 1), (hS_3 = matchValue_5, (matchValue_2_3 = sym_1.STransform.Rotation, (matchValue_2_3.tag === 2) ? [comp_5.H * vS_3, comp_5.W * hS_3] : ((matchValue_2_3.tag === 1) ? [comp_5.W * hS_3, comp_5.H * vS_3] : ((matchValue_2_3.tag === 3) ? [comp_5.W * hS_3, comp_5.H * vS_3] : [comp_5.H * vS_3, comp_5.W * hS_3])))))))))[0];
    }, selectedSymbols, {
        Compare: comparePrimitives,
    });
    const comp_6 = symbol_5.Component;
    let patternInput_6;
    const comp_7 = comp_6;
    const matchValue_6 = defaultArg(symbol_5.HScale, 1);
    const vS_4 = defaultArg(symbol_5.VScale, 1);
    const hS_4 = matchValue_6;
    const matchValue_2_4 = symbol_5.STransform.Rotation;
    switch (matchValue_2_4.tag) {
        case 1:
        case 3: {
            patternInput_6 = [comp_7.W * hS_4, comp_7.H * vS_4];
            break;
        }
        default:
            patternInput_6 = [comp_7.H * vS_4, comp_7.W * hS_4];
    }
    const w_2 = patternInput_6[1];
    const h_2 = patternInput_6[0];
    const centreX_2 = comp_6.X + (w_2 / 2);
    const centreY_2 = comp_6.Y + (h_2 / 2);
    maxYSymCentre = (new XYPos(centreX_2, centreY_2));
    let minYSymCentre;
    const symbol_7 = minBy((y_4) => y_4.Pos.Y, selectedSymbols, {
        Compare: comparePrimitives,
    });
    const comp_8 = symbol_7.Component;
    let patternInput_8;
    const comp_9 = comp_8;
    const matchValue_7 = defaultArg(symbol_7.HScale, 1);
    const vS_5 = defaultArg(symbol_7.VScale, 1);
    const hS_5 = matchValue_7;
    const matchValue_2_5 = symbol_7.STransform.Rotation;
    switch (matchValue_2_5.tag) {
        case 1:
        case 3: {
            patternInput_8 = [comp_9.W * hS_5, comp_9.H * vS_5];
            break;
        }
        default:
            patternInput_8 = [comp_9.H * vS_5, comp_9.W * hS_5];
    }
    const w_3 = patternInput_8[1];
    const h_3 = patternInput_8[0];
    const centreX_3 = comp_8.X + (w_3 / 2);
    const centreY_3 = comp_8.Y + (h_3 / 2);
    minYSymCentre = (new XYPos(centreX_3, centreY_3));
    if (maxXSymCentre.X === minXSymCentre.X) {
        return true;
    }
    else {
        return maxYSymCentre.Y === minYSymCentre.Y;
    }
}

export function findSelectedSymbols(compList, model) {
    return map_1((x) => find(x, model.Symbols), compList);
}

export function getScalingFactorAndOffsetCentre(min, matchMin, max, matchMax) {
    const scaleFact = ((min === max) ? true : (matchMax <= matchMin)) ? 1 : ((matchMin - matchMax) / (min - max));
    const offsetC = (scaleFact === 1) ? 0 : ((matchMin - (min * scaleFact)) / (1 - scaleFact));
    return [scaleFact, offsetC];
}

export function getScalingFactorAndOffsetCentreGroup(matchBBMin, matchBBMax, selectedSymbols) {
    let symbol_1, comp_1, patternInput_1, comp_2, matchValue_3, vS_1, hS_1, matchValue_2_1, w, h, centreX, centreY, sym_1, comp_3, matchValue_4, vS_2, hS_2, matchValue_2_2, symbol_3, comp_4, patternInput_4, comp_5, matchValue_5, vS_3, hS_3, matchValue_2_3, w_1, h_1, centreX_1, centreY_1, sym_2, comp_6, matchValue_6, vS_4, hS_4, matchValue_2_4, symbol_5, comp_8, patternInput_8, comp_9, matchValue_8, vS_6, hS_6, matchValue_2_6, w_2, h_2, centreX_2, centreY_2, sym_4, comp_10, matchValue_9, vS_7, hS_7, matchValue_2_7, symbol_7, comp_11, patternInput_11, comp_12, matchValue_10, vS_8, hS_8, matchValue_2_8, w_3, h_3, centreX_3, centreY_3, sym_5, comp_13, matchValue_11, vS_9, hS_9, matchValue_2_9;
    const maxXSym = maxBy((x) => {
        let sym, comp, matchValue, vS, hS, matchValue_2;
        return x.Pos.X + ((sym = x, (comp = sym.Component, (matchValue = defaultArg(sym.HScale, 1), (vS = defaultArg(sym.VScale, 1), (hS = matchValue, (matchValue_2 = sym.STransform.Rotation, (matchValue_2.tag === 2) ? [comp.H * vS, comp.W * hS] : ((matchValue_2.tag === 1) ? [comp.W * hS, comp.H * vS] : ((matchValue_2.tag === 3) ? [comp.W * hS, comp.H * vS] : [comp.H * vS, comp.W * hS])))))))))[1];
    }, selectedSymbols, {
        Compare: comparePrimitives,
    });
    const oldMaxX = ((symbol_1 = maxXSym, (comp_1 = symbol_1.Component, (patternInput_1 = ((comp_2 = comp_1, (matchValue_3 = defaultArg(symbol_1.HScale, 1), (vS_1 = defaultArg(symbol_1.VScale, 1), (hS_1 = matchValue_3, (matchValue_2_1 = symbol_1.STransform.Rotation, (matchValue_2_1.tag === 2) ? [comp_2.H * vS_1, comp_2.W * hS_1] : ((matchValue_2_1.tag === 1) ? [comp_2.W * hS_1, comp_2.H * vS_1] : ((matchValue_2_1.tag === 3) ? [comp_2.W * hS_1, comp_2.H * vS_1] : [comp_2.H * vS_1, comp_2.W * hS_1])))))))), (w = patternInput_1[1], (h = patternInput_1[0], (centreX = (comp_1.X + (w / 2)), (centreY = (comp_1.Y + (h / 2)), new XYPos(centreX, centreY))))))))).X;
    const newMaxX = matchBBMax.X - (((sym_1 = maxXSym, (comp_3 = sym_1.Component, (matchValue_4 = defaultArg(sym_1.HScale, 1), (vS_2 = defaultArg(sym_1.VScale, 1), (hS_2 = matchValue_4, (matchValue_2_2 = sym_1.STransform.Rotation, (matchValue_2_2.tag === 2) ? [comp_3.H * vS_2, comp_3.W * hS_2] : ((matchValue_2_2.tag === 1) ? [comp_3.W * hS_2, comp_3.H * vS_2] : ((matchValue_2_2.tag === 3) ? [comp_3.W * hS_2, comp_3.H * vS_2] : [comp_3.H * vS_2, comp_3.W * hS_2])))))))))[1] / 2);
    const minXSym = minBy((x_2) => x_2.Pos.X, selectedSymbols, {
        Compare: comparePrimitives,
    });
    const oldMinX = ((symbol_3 = minXSym, (comp_4 = symbol_3.Component, (patternInput_4 = ((comp_5 = comp_4, (matchValue_5 = defaultArg(symbol_3.HScale, 1), (vS_3 = defaultArg(symbol_3.VScale, 1), (hS_3 = matchValue_5, (matchValue_2_3 = symbol_3.STransform.Rotation, (matchValue_2_3.tag === 2) ? [comp_5.H * vS_3, comp_5.W * hS_3] : ((matchValue_2_3.tag === 1) ? [comp_5.W * hS_3, comp_5.H * vS_3] : ((matchValue_2_3.tag === 3) ? [comp_5.W * hS_3, comp_5.H * vS_3] : [comp_5.H * vS_3, comp_5.W * hS_3])))))))), (w_1 = patternInput_4[1], (h_1 = patternInput_4[0], (centreX_1 = (comp_4.X + (w_1 / 2)), (centreY_1 = (comp_4.Y + (h_1 / 2)), new XYPos(centreX_1, centreY_1))))))))).X;
    const newMinX = matchBBMin.X + (((sym_2 = minXSym, (comp_6 = sym_2.Component, (matchValue_6 = defaultArg(sym_2.HScale, 1), (vS_4 = defaultArg(sym_2.VScale, 1), (hS_4 = matchValue_6, (matchValue_2_4 = sym_2.STransform.Rotation, (matchValue_2_4.tag === 2) ? [comp_6.H * vS_4, comp_6.W * hS_4] : ((matchValue_2_4.tag === 1) ? [comp_6.W * hS_4, comp_6.H * vS_4] : ((matchValue_2_4.tag === 3) ? [comp_6.W * hS_4, comp_6.H * vS_4] : [comp_6.H * vS_4, comp_6.W * hS_4])))))))))[1] / 2);
    const maxYSym = maxBy((y_2) => {
        let sym_3, comp_7, matchValue_7, vS_5, hS_5, matchValue_2_5;
        return y_2.Pos.Y + ((sym_3 = y_2, (comp_7 = sym_3.Component, (matchValue_7 = defaultArg(sym_3.HScale, 1), (vS_5 = defaultArg(sym_3.VScale, 1), (hS_5 = matchValue_7, (matchValue_2_5 = sym_3.STransform.Rotation, (matchValue_2_5.tag === 2) ? [comp_7.H * vS_5, comp_7.W * hS_5] : ((matchValue_2_5.tag === 1) ? [comp_7.W * hS_5, comp_7.H * vS_5] : ((matchValue_2_5.tag === 3) ? [comp_7.W * hS_5, comp_7.H * vS_5] : [comp_7.H * vS_5, comp_7.W * hS_5])))))))))[0];
    }, selectedSymbols, {
        Compare: comparePrimitives,
    });
    const oldMaxY = ((symbol_5 = maxYSym, (comp_8 = symbol_5.Component, (patternInput_8 = ((comp_9 = comp_8, (matchValue_8 = defaultArg(symbol_5.HScale, 1), (vS_6 = defaultArg(symbol_5.VScale, 1), (hS_6 = matchValue_8, (matchValue_2_6 = symbol_5.STransform.Rotation, (matchValue_2_6.tag === 2) ? [comp_9.H * vS_6, comp_9.W * hS_6] : ((matchValue_2_6.tag === 1) ? [comp_9.W * hS_6, comp_9.H * vS_6] : ((matchValue_2_6.tag === 3) ? [comp_9.W * hS_6, comp_9.H * vS_6] : [comp_9.H * vS_6, comp_9.W * hS_6])))))))), (w_2 = patternInput_8[1], (h_2 = patternInput_8[0], (centreX_2 = (comp_8.X + (w_2 / 2)), (centreY_2 = (comp_8.Y + (h_2 / 2)), new XYPos(centreX_2, centreY_2))))))))).Y;
    const newMaxY = matchBBMax.Y - (((sym_4 = maxYSym, (comp_10 = sym_4.Component, (matchValue_9 = defaultArg(sym_4.HScale, 1), (vS_7 = defaultArg(sym_4.VScale, 1), (hS_7 = matchValue_9, (matchValue_2_7 = sym_4.STransform.Rotation, (matchValue_2_7.tag === 2) ? [comp_10.H * vS_7, comp_10.W * hS_7] : ((matchValue_2_7.tag === 1) ? [comp_10.W * hS_7, comp_10.H * vS_7] : ((matchValue_2_7.tag === 3) ? [comp_10.W * hS_7, comp_10.H * vS_7] : [comp_10.H * vS_7, comp_10.W * hS_7])))))))))[0] / 2);
    const minYSym = minBy((y_4) => y_4.Pos.Y, selectedSymbols, {
        Compare: comparePrimitives,
    });
    const oldMinY = ((symbol_7 = minYSym, (comp_11 = symbol_7.Component, (patternInput_11 = ((comp_12 = comp_11, (matchValue_10 = defaultArg(symbol_7.HScale, 1), (vS_8 = defaultArg(symbol_7.VScale, 1), (hS_8 = matchValue_10, (matchValue_2_8 = symbol_7.STransform.Rotation, (matchValue_2_8.tag === 2) ? [comp_12.H * vS_8, comp_12.W * hS_8] : ((matchValue_2_8.tag === 1) ? [comp_12.W * hS_8, comp_12.H * vS_8] : ((matchValue_2_8.tag === 3) ? [comp_12.W * hS_8, comp_12.H * vS_8] : [comp_12.H * vS_8, comp_12.W * hS_8])))))))), (w_3 = patternInput_11[1], (h_3 = patternInput_11[0], (centreX_3 = (comp_11.X + (w_3 / 2)), (centreY_3 = (comp_11.Y + (h_3 / 2)), new XYPos(centreX_3, centreY_3))))))))).Y;
    const newMinY = matchBBMin.Y + (((sym_5 = minYSym, (comp_13 = sym_5.Component, (matchValue_11 = defaultArg(sym_5.HScale, 1), (vS_9 = defaultArg(sym_5.VScale, 1), (hS_9 = matchValue_11, (matchValue_2_9 = sym_5.STransform.Rotation, (matchValue_2_9.tag === 2) ? [comp_13.H * vS_9, comp_13.W * hS_9] : ((matchValue_2_9.tag === 1) ? [comp_13.W * hS_9, comp_13.H * vS_9] : ((matchValue_2_9.tag === 3) ? [comp_13.W * hS_9, comp_13.H * vS_9] : [comp_13.H * vS_9, comp_13.W * hS_9])))))))))[0] / 2);
    const xSC = getScalingFactorAndOffsetCentre(oldMinX, newMinX, oldMaxX, newMaxX);
    const ySC = getScalingFactorAndOffsetCentre(oldMinY, newMinY, oldMaxY, newMaxY);
    return [xSC, ySC];
}

export function scaleSymbol(xYSC_, xYSC__1, sym) {
    let sym_1, comp_2, matchValue_3, vS_1, hS_1, matchValue_2_1, sym_2, comp_3, matchValue_4, vS_2, hS_2, matchValue_2_2;
    const xYSC = [xYSC_, xYSC__1];
    let symCentre;
    const symbol = sym;
    const comp = symbol.Component;
    let patternInput;
    const comp_1 = comp;
    const matchValue = defaultArg(symbol.HScale, 1);
    const vS = defaultArg(symbol.VScale, 1);
    const hS = matchValue;
    const matchValue_2 = symbol.STransform.Rotation;
    switch (matchValue_2.tag) {
        case 1:
        case 3: {
            patternInput = [comp_1.W * hS, comp_1.H * vS];
            break;
        }
        default:
            patternInput = [comp_1.H * vS, comp_1.W * hS];
    }
    const w = patternInput[1];
    const h = patternInput[0];
    const centreX = comp.X + (w / 2);
    const centreY = comp.Y + (h / 2);
    symCentre = (new XYPos(centreX, centreY));
    const translateFunc = (scaleFact, offsetC, coordinate) => (((coordinate - offsetC) * scaleFact) + offsetC);
    const xSC = xYSC[0];
    const ySC = xYSC[1];
    const newX = translateFunc(xSC[0], xSC[1], symCentre.X);
    const newY = translateFunc(ySC[0], ySC[1], symCentre.Y);
    const symCentreOffsetFromTopLeft = new XYPos(((sym_1 = sym, (comp_2 = sym_1.Component, (matchValue_3 = defaultArg(sym_1.HScale, 1), (vS_1 = defaultArg(sym_1.VScale, 1), (hS_1 = matchValue_3, (matchValue_2_1 = sym_1.STransform.Rotation, (matchValue_2_1.tag === 2) ? [comp_2.H * vS_1, comp_2.W * hS_1] : ((matchValue_2_1.tag === 1) ? [comp_2.W * hS_1, comp_2.H * vS_1] : ((matchValue_2_1.tag === 3) ? [comp_2.W * hS_1, comp_2.H * vS_1] : [comp_2.H * vS_1, comp_2.W * hS_1])))))))))[1] / 2, ((sym_2 = sym, (comp_3 = sym_2.Component, (matchValue_4 = defaultArg(sym_2.HScale, 1), (vS_2 = defaultArg(sym_2.VScale, 1), (hS_2 = matchValue_4, (matchValue_2_2 = sym_2.STransform.Rotation, (matchValue_2_2.tag === 2) ? [comp_3.H * vS_2, comp_3.W * hS_2] : ((matchValue_2_2.tag === 1) ? [comp_3.W * hS_2, comp_3.H * vS_2] : ((matchValue_2_2.tag === 3) ? [comp_3.W * hS_2, comp_3.H * vS_2] : [comp_3.H * vS_2, comp_3.W * hS_2])))))))))[0] / 2);
    let newTopLeftPos;
    const left = new XYPos(newX, newY);
    const right = symCentreOffsetFromTopLeft;
    newTopLeftPos = (new XYPos(left.X - right.X, left.Y - right.Y));
    let newComp;
    const inputRecord = sym.Component;
    newComp = (new Component_1(inputRecord.Id, inputRecord.Type, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, newTopLeftPos.X, newTopLeftPos.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo));
    return new SymbolT_Symbol(newTopLeftPos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, true, sym.LabelRotation, sym.Appearance, sym.Id, newComp, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
}

export function groupNewSelectedSymsModel(compList, model, selectedSymbols, modifySymbolFunc) {
    const UnselectedSymbols = filter((x, _arg) => !contains(x, compList, {
        Equals: equals,
        GetHashCode: safeHash,
    }), model.Symbols);
    const newSymbols = map_1(modifySymbolFunc, selectedSymbols);
    return new SymbolT_Model(fold((acc, k, v) => add(k, v, acc), UnselectedSymbols, ofList(map2((x_2, y_1) => [x_2, y_1], compList, newSymbols), {
        Compare: compare,
    })), model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
}

/**
 * HLP 23: AUTHOR Ismagilov - Flips a block of symbols, returning the new symbol model
 */
export function flipBlock(compList, model, flip) {
    const SelectedSymbols = map_1((x) => find(x, model.Symbols), compList);
    const UnselectedSymbols = filter((x_1, _arg) => !contains(x_1, compList, {
        Equals: equals,
        GetHashCode: safeHash,
    }), model.Symbols);
    const block = getBlock(SelectedSymbols);
    const newSymbols = map_1((x_3) => flipSymbolInBlock(flip, BoundingBox__Centre(block), x_3), SelectedSymbols);
    return new SymbolT_Model(fold((acc, k, v) => add(k, v, acc), UnselectedSymbols, ofList(map2((x_4, y_1) => [x_4, y_1], compList, newSymbols), {
        Compare: compare,
    })), model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
}

export function postUpdateScalingBox(model, cmd) {
    let left_1, right_1, left_2, right_2, inputRecord_2, left_3, right_3, value;
    const symbolCmd = (msg) => Cmd_OfFunc_result(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(0, [msg])])]));
    const sheetCmd = (msg_2) => Cmd_OfFunc_result(new Msg(1, [msg_2]));
    if (length(model.SelectedComponents) < 2) {
        if (model.ScalingBox == null) {
            return [model, cmd];
        }
        else {
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, model.Action, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, void 0, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(append(singleton(cmd), ofArray([symbolCmd(new SymbolT_Msg(3, [value_4(model.ScalingBox).ButtonList])), sheetCmd(new SheetT_Msg(6, []))])))];
        }
    }
    else {
        const newBoxBound = getBlock(map_1((id) => find(id, model.Wire.Symbol.Symbols), model.SelectedComponents));
        const matchValue_1 = model.ScalingBox;
        let matchResult, value_1;
        if (matchValue_1 != null) {
            if ((value = matchValue_1, equals(value.ScalingBoxBound, newBoxBound))) {
                matchResult = 0;
                value_1 = matchValue_1;
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
                return [model, cmd];
            default: {
                const topleft = newBoxBound.TopLeft;
                const rotateDeg90OffSet = new XYPos(newBoxBound.W + 57, (newBoxBound.H / 2) - 12.5);
                const rotateDeg270OffSet = new XYPos(-69.5, (newBoxBound.H / 2) - 12.5);
                const buttonOffSet = new XYPos(newBoxBound.W + 47.5, -47.5);
                let dummyPos;
                const left = topleft;
                const right = buttonOffSet;
                dummyPos = (new XYPos(left.X + right.X, left.Y + right.Y));
                const makeButton = (a, pos) => createAnnotation(new SymbolT_ThemeType(2, []), a, pos);
                let buttonSym;
                const inputRecord = makeButton(new SymbolT_Annotation(0, []), dummyPos);
                buttonSym = (new SymbolT_Symbol((left_1 = topleft, (right_1 = buttonOffSet, new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y))), inputRecord.CentrePos, inputRecord.OffsetFromBBCentre, inputRecord.InWidth0, inputRecord.InWidth1, inputRecord.InWidths, inputRecord.LabelBoundingBox, inputRecord.LabelHasDefaultPos, inputRecord.LabelRotation, inputRecord.Appearance, inputRecord.Id, inputRecord.Component, inputRecord.Annotation, inputRecord.Moving, inputRecord.IsClocked, inputRecord.STransform, inputRecord.ReversedInputPorts, inputRecord.PortMaps, inputRecord.HScale, inputRecord.VScale, inputRecord.MovingPort, inputRecord.MovingPortTarget));
                const makeRotateSym = (sym) => {
                    let inputRecord_1;
                    return new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, (inputRecord_1 = sym.Component, new Component_1(inputRecord_1.Id, inputRecord_1.Type, inputRecord_1.Label, inputRecord_1.InputPorts, inputRecord_1.OutputPorts, inputRecord_1.X, inputRecord_1.Y, 25, 25, inputRecord_1.SymbolInfo)), sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
                };
                const rotateDeg90Sym = makeRotateSym(makeButton(new SymbolT_Annotation(1, [new Rotation(1, [])]), (left_2 = topleft, (right_2 = rotateDeg90OffSet, new XYPos(left_2.X + right_2.X, left_2.Y + right_2.Y)))));
                const rotateDeg270Sym = makeRotateSym((inputRecord_2 = makeButton(new SymbolT_Annotation(1, [new Rotation(3, [])]), (left_3 = topleft, (right_3 = rotateDeg270OffSet, new XYPos(left_3.X + right_3.X, left_3.Y + right_3.Y)))), new SymbolT_Symbol(inputRecord_2.Pos, inputRecord_2.CentrePos, inputRecord_2.OffsetFromBBCentre, inputRecord_2.InWidth0, inputRecord_2.InWidth1, inputRecord_2.InWidths, inputRecord_2.LabelBoundingBox, inputRecord_2.LabelHasDefaultPos, inputRecord_2.LabelRotation, inputRecord_2.Appearance, inputRecord_2.Id, inputRecord_2.Component, inputRecord_2.Annotation, inputRecord_2.Moving, inputRecord_2.IsClocked, new STransform_1(new Rotation(1, []), false), inputRecord_2.ReversedInputPorts, inputRecord_2.PortMaps, inputRecord_2.HScale, inputRecord_2.VScale, inputRecord_2.MovingPort, inputRecord_2.MovingPortTarget)));
                const newSymbolMap = add(rotateDeg90Sym.Id, rotateDeg90Sym, add(rotateDeg270Sym.Id, rotateDeg270Sym, add(buttonSym.Id, buttonSym, model.Wire.Symbol.Symbols)));
                const initScalingBox = new SheetT_ScalingBox(buttonSym, rotateDeg90Sym, rotateDeg270Sym, newBoxBound, ofArray([buttonSym.Id, rotateDeg270Sym.Id, rotateDeg90Sym.Id]));
                const newCmd = (model.ScalingBox == null) ? cmd : Cmd_batch(append(singleton(cmd), ofArray([symbolCmd(new SymbolT_Msg(3, [value_4(model.ScalingBox).ButtonList])), sheetCmd(new SheetT_Msg(6, []))])));
                return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SheetT_symbols_)(newSymbolMap)(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SheetT_scalingBox_)(initScalingBox)(model)), newCmd];
            }
        }
    }
}

//# sourceMappingURL=RotateScale.fs.js.map
