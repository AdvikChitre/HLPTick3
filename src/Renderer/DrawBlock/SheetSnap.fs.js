import { makeLine, Line } from "../Common/DrawHelpers.fs.js";
import { toArray as toArray_2, head, isEmpty, empty, singleton } from "../fable_modules/fable-library.4.1.4/List.js";
import { tryPick, append, partition, collect, map as map_1, tryItem, mapIndexed, sortBy } from "../fable_modules/fable-library.4.1.4/Array.js";
import { curry2, equalArrays, equals, comparePrimitives } from "../fable_modules/fable-library.4.1.4/Util.js";
import { map, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { min, max } from "../fable_modules/fable-library.4.1.4/Double.js";
import { Snap, SnapXY, SnapInfo, SnapData } from "../Model/DrawModelType.fs.js";
import { XYPos, Memory1, ComponentType } from "../Common/CommonTypes.fs.js";
import { filter as filter_1, toArray as toArray_1, FSharpMap__get_Item, values, empty as empty_1 } from "../fable_modules/fable-library.4.1.4/Map.js";
import { compare } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { filter, toArray } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { getPortLocation } from "./Symbol.fs.js";
import { Constants_segmentSnapLimit, Constants_symbolSnapLimit } from "./Sheet.fs.js";
import { printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { getNonZeroAbsSegments } from "./BlockHelpers.fs.js";

export const snapIndicatorLine = new Line("Red", "1px", "5, 5");

export function snapLineHorizontal(wholeCanvas, y) {
    return makeLine(0, y, wholeCanvas, y, snapIndicatorLine);
}

export function snapLineVertical(wholeCanvas, x) {
    return makeLine(x, 0, x, wholeCanvas, snapIndicatorLine);
}

/**
 * a vertical line marking the position of the current symbol or segment snap, if one exists
 */
export function snapIndicatorLineX(model, wholeCanvas) {
    const matchValue = model.SnapSymbols.SnapX.SnapOpt;
    const matchValue_1 = model.SnapSegments.SnapX.SnapOpt;
    let matchResult, snap;
    if (matchValue == null) {
        if (matchValue_1 == null) {
            matchResult = 1;
        }
        else {
            matchResult = 0;
            snap = matchValue_1;
        }
    }
    else {
        matchResult = 0;
        snap = matchValue;
    }
    switch (matchResult) {
        case 0:
            return singleton(makeLine(snap.SnapIndicatorPos, 0, snap.SnapIndicatorPos, wholeCanvas, snapIndicatorLine));
        default:
            return empty();
    }
}

/**
 * a horizontal line marking the position of the current symbol or segment snap, if one exists
 */
export function snapIndicatorLineY(model, wholeCanvas) {
    const matchValue = model.SnapSymbols.SnapY.SnapOpt;
    const matchValue_1 = model.SnapSegments.SnapY.SnapOpt;
    let matchResult, snap;
    if (matchValue == null) {
        if (matchValue_1 == null) {
            matchResult = 1;
        }
        else {
            matchResult = 0;
            snap = matchValue_1;
        }
    }
    else {
        matchResult = 0;
        snap = matchValue;
    }
    switch (matchResult) {
        case 0:
            return singleton(makeLine(0, snap.SnapIndicatorPos, wholeCanvas, snap.SnapIndicatorPos, snapIndicatorLine));
        default:
            return empty();
    }
}

/**
 * select X coordinate
 */
export function posToX(p) {
    return p.X;
}

/**
 * select Y coordinate
 */
export function posToY(p) {
    return p.Y;
}

/**
 * Helper function to create 1D static data for use by snapping functions based on
 * a single coordinate array of snap points.
 * points: array of points to snap to.
 * limit: max distance from a snap point at which snap will happen.
 */
export function makeSnapBounds(limit, points) {
    const points_1 = sortBy((pt) => pt.Pos, points, {
        Compare: comparePrimitives,
    });
    return mapIndexed((i, point) => {
        const xBefore = tryItem(i - 1, points_1);
        const xAfter = tryItem(i + 1, points_1);
        let lower;
        const value = point.Pos - limit;
        lower = defaultArg(map((xb) => max((point.Pos + xb.Pos) / 2, point.Pos - limit), xBefore), value);
        let upper;
        const value_1 = point.Pos + limit;
        upper = defaultArg(map((xa) => min((point.Pos + xa.Pos) / 2, point.Pos + limit), xAfter), value_1);
        return new SnapData(upper, lower, point.Pos, point.IndicatorPos);
    }, points_1);
}

export const emptySnap = (() => {
    const emptyInfo = new SnapInfo([], void 0);
    return new SnapXY(emptyInfo, emptyInfo);
})();

/**
 * Map Component types to values which partition them into
 * sets of components which should be treated as same type
 * in snap operations. e.g. Input, Output, IOLabel are all
 * treated as same.
 * Usage: symbolMatch s1 = symbolMatch s2 // true if s1 and s2
 * snap to each other.
 */
export function symbolMatch(symbol) {
    const matchValue = symbol.Component.Type;
    let matchResult, x, x_1;
    switch (matchValue.tag) {
        case 48:
        case 0:
        case 1:
        case 3: {
            matchResult = 0;
            break;
        }
        case 47:
        case 6: {
            matchResult = 1;
            break;
        }
        case 49:
        case 7: {
            matchResult = 2;
            break;
        }
        case 17:
        case 21: {
            matchResult = 3;
            break;
        }
        case 27:
        case 28: {
            matchResult = 4;
            break;
        }
        case 31:
        case 32:
        case 33:
        case 34: {
            matchResult = 5;
            break;
        }
        case 43: {
            matchResult = 6;
            x = matchValue.fields[0];
            break;
        }
        case 44: {
            matchResult = 6;
            x = matchValue.fields[0];
            break;
        }
        case 45: {
            matchResult = 6;
            x = matchValue.fields[0];
            break;
        }
        case 39: {
            matchResult = 7;
            x_1 = matchValue.fields[0];
            break;
        }
        case 40: {
            matchResult = 7;
            x_1 = matchValue.fields[0];
            break;
        }
        case 41: {
            matchResult = 7;
            x_1 = matchValue.fields[0];
            break;
        }
        case 42: {
            matchResult = 7;
            x_1 = matchValue.fields[0];
            break;
        }
        default:
            matchResult = 8;
    }
    switch (matchResult) {
        case 0:
            return new ComponentType(0, [0, void 0]);
        case 1:
            return new ComponentType(47, [0, 0]);
        case 2:
            return new ComponentType(49, [0, 0n]);
        case 3:
            return new ComponentType(17, [0]);
        case 4:
            return new ComponentType(27, []);
        case 5:
            return new ComponentType(31, []);
        case 6:
            return new ComponentType(45, [x]);
        case 7:
            return new ComponentType(40, [new Memory1(x_1.Init, x_1.AddressWidth, x_1.WordWidth, empty_1({
                Compare: compare,
            }))]);
        default: {
            const otherCompType = matchValue;
            return otherCompType;
        }
    }
}

/**
 * Extracts static snap data used to control a symbol snapping when being moved.
 * Called at start of a symbol drag.
 * model: schematic positions are extracted from here.
 * movingSymbol: the symbol which moved.
 */
export function getNewSymbolSnapInfo(model, movingSymbol) {
    const otherSimilarSymbolData = (xOrY) => {
        const movingSymbolMatch = symbolMatch(movingSymbol);
        return map_1((x) => ({
            IndicatorPos: x,
            Pos: x,
        }), map_1((sym_1) => {
            let symbol, comp, patternInput, comp_1, matchValue, vS, hS, matchValue_2, w, h, centreX, centreY;
            return xOrY((symbol = sym_1, (comp = symbol.Component, (patternInput = ((comp_1 = comp, (matchValue = defaultArg(symbol.HScale, 1), (vS = defaultArg(symbol.VScale, 1), (hS = matchValue, (matchValue_2 = symbol.STransform.Rotation, (matchValue_2.tag === 2) ? [comp_1.H * vS, comp_1.W * hS] : ((matchValue_2.tag === 1) ? [comp_1.W * hS, comp_1.H * vS] : ((matchValue_2.tag === 3) ? [comp_1.W * hS, comp_1.H * vS] : [comp_1.H * vS, comp_1.W * hS])))))))), (w = patternInput[1], (h = patternInput[0], (centreX = (comp.X + (w / 2)), (centreY = (comp.Y + (h / 2)), new XYPos(centreX, centreY)))))))));
        }, toArray(filter((sym) => {
            if (!equals(sym.Id, movingSymbol.Id)) {
                return equals(symbolMatch(sym), movingSymbolMatch);
            }
            else {
                return false;
            }
        }, values(model.Wire.Symbol.Symbols))), Float64Array));
    };
    let movingSymbolCentre;
    const symbol_1 = movingSymbol;
    const comp_2 = symbol_1.Component;
    let patternInput_2;
    const comp_3 = comp_2;
    const matchValue_3 = defaultArg(symbol_1.HScale, 1);
    const vS_1 = defaultArg(symbol_1.VScale, 1);
    const hS_1 = matchValue_3;
    const matchValue_2_1 = symbol_1.STransform.Rotation;
    switch (matchValue_2_1.tag) {
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
    const centreX_1 = comp_2.X + (w_1 / 2);
    const centreY_1 = comp_2.Y + (h_1 / 2);
    movingSymbolCentre = (new XYPos(centreX_1, centreY_1));
    let portSnapData;
    const ports = movingSymbol.PortMaps.Orientation;
    const wires = model.Wire.Wires;
    const portMap = model.Wire.Symbol.Ports;
    const symbolMap = model.Wire.Symbol.Symbols;
    const getAllConnectedPorts = (pId) => collect((tupledArg) => {
        const wire = tupledArg[1];
        if (equals(wire.OutputPort, pId)) {
            const pId$0027 = wire.InputPort;
            return [FSharpMap__get_Item(portMap, pId$0027)];
        }
        else if (equals(wire.InputPort, pId)) {
            const pId$0027_1 = wire.OutputPort;
            return [FSharpMap__get_Item(portMap, pId$0027_1)];
        }
        else {
            return [];
        }
    }, toArray_1(wires));
    const tupledArg_3 = partition((tupledArg_2) => {
        const ori = tupledArg_2[0];
        return ori === "horizontal";
    }, collect((tupledArg_1) => {
        const pId_1 = tupledArg_1[0];
        const edge = tupledArg_1[1];
        let portLocOffset;
        const left = getPortLocation(void 0, model.Wire.Symbol, pId_1);
        const right = movingSymbolCentre;
        portLocOffset = (new XYPos(left.X - right.X, left.Y - right.Y));
        return collect((port) => {
            const symbol_2 = FSharpMap__get_Item(symbolMap, port.HostId);
            const otherPortLoc = getPortLocation(void 0, model.Wire.Symbol, port.Id);
            const matchValue_6 = FSharpMap__get_Item(symbol_2.PortMaps.Orientation, port.Id);
            let matchResult;
            switch (matchValue_6.tag) {
                case 3: {
                    if (edge.tag === 2) {
                        matchResult = 0;
                    }
                    else {
                        matchResult = 2;
                    }
                    break;
                }
                case 0: {
                    if (edge.tag === 1) {
                        matchResult = 1;
                    }
                    else {
                        matchResult = 2;
                    }
                    break;
                }
                case 1: {
                    if (edge.tag === 0) {
                        matchResult = 1;
                    }
                    else {
                        matchResult = 2;
                    }
                    break;
                }
                default:
                    if (edge.tag === 3) {
                        matchResult = 0;
                    }
                    else {
                        matchResult = 2;
                    }
            }
            switch (matchResult) {
                case 0: {
                    const locDataY = {
                        IndicatorPos: otherPortLoc.Y,
                        Pos: otherPortLoc.Y - portLocOffset.Y,
                    };
                    return [["horizontal", locDataY]];
                }
                case 1: {
                    const locDataX = {
                        IndicatorPos: otherPortLoc.X,
                        Pos: otherPortLoc.X - portLocOffset.X,
                    };
                    return [["vertical", locDataX]];
                }
                default:
                    return [];
            }
        }, getAllConnectedPorts(pId_1));
    }, toArray_1(ports)));
    const horizL = tupledArg_3[0];
    const vertL = tupledArg_3[1];
    const makeSnap = (array_6) => map_1((tuple) => tuple[1], array_6);
    const YSnaps = makeSnap(horizL);
    portSnapData = {
        XSnaps: makeSnap(vertL),
        YSnaps: YSnaps,
    };
    return new SnapXY(new SnapInfo(makeSnapBounds(Constants_symbolSnapLimit, append(otherSimilarSymbolData(posToX), portSnapData.XSnaps)), void 0), new SnapInfo(makeSnapBounds(Constants_symbolSnapLimit, append(otherSimilarSymbolData(posToY), portSnapData.YSnaps)), void 0));
}

/**
 * Extracts static snap data used to control a segment snapping when being dragged.
 * Called at start of a segment drag.
 * xOrY: which coordinate is processed.
 * model: segment positions are extracted from here.
 * movingSegment: the segment which moved.
 * See SnapXY definition for output.
 */
export function getNewSegmentSnapInfo(model, movingSegmentL) {
    if (!isEmpty(movingSegmentL)) {
        const movingSegment = head(movingSegmentL);
        const getDir = (seg) => {
            const segStart = seg.Start;
            const segEnd = seg.End;
            if (Math.abs(segStart.X - segEnd.X) < 1E-07) {
                return "vertical";
            }
            else if (Math.abs(segStart.Y - segEnd.Y) < 1E-07) {
                return "horizontal";
            }
            else {
                return void 0;
            }
        };
        const thisWire = FSharpMap__get_Item(model.Wire.Wires, movingSegment.Segment.WireId);
        let thisSegId;
        const this$ = movingSegment.Segment;
        thisSegId = [this$.Index, this$.WireId];
        const orientation = getDir(movingSegment);
        let snapBounds;
        if (orientation != null) {
            const ori = orientation;
            snapBounds = makeSnapBounds(Constants_segmentSnapLimit, map_1((x) => ({
                IndicatorPos: x,
                Pos: x,
            }), collect((_arg) => {
                let aSeg, this$_1, aSeg_2, ori_1, segStart_1, segEnd_1;
                if ((aSeg = _arg, equals(getDir(aSeg), ori) && !equalArrays((this$_1 = aSeg.Segment, [this$_1.Index, this$_1.WireId]), thisSegId))) {
                    const aSeg_1 = _arg;
                    return new Float64Array([(aSeg_2 = aSeg_1, (ori_1 = ((segStart_1 = aSeg_2.Start, (segEnd_1 = aSeg_2.End, (Math.abs(segStart_1.X - segEnd_1.X) < 1E-07) ? "vertical" : ((Math.abs(segStart_1.Y - segEnd_1.Y) < 1E-07) ? "horizontal" : toFail(printf("ERROR: Diagonal wire")))))), (ori_1 === "horizontal") ? aSeg_2.Start.Y : aSeg_2.Start.X))]);
                }
                else {
                    return new Float64Array([]);
                }
            }, collect((arg) => toArray_2(getNonZeroAbsSegments(arg)), map_1((tuple) => tuple[1], toArray_1(filter_1((wid, otherWire) => equals(otherWire.OutputPort, thisWire.OutputPort), model.Wire.Wires)))), Float64Array)));
        }
        else {
            snapBounds = [];
        }
        const snapInDirection = (snapOrientation) => (new SnapInfo(equals(orientation, snapOrientation) ? snapBounds : [], void 0));
        return new SnapXY(snapInDirection("vertical"), snapInDirection("horizontal"));
    }
    else {
        return emptySnap;
    }
}

/**
 * The main snap function which is called every update that drags a symbol or segment.
 * This function porocesses one coordinate (X or Y) and therefore is called twice.
 * autoscrolling: if true switch off snapping (and unsnap if needed).
 * pos.ActualPosition: input the actual position on schematic of the thing being dragged.
 * pos.MouseDelta: mouse position change between this update and the last one.
 * snapI: static (where can it snap) and dynamic (if it is snapped) info controlling the snapping process.
 */
export function snap1D(autoScrolling, pos, snapI) {
    const mustSnap = (pos_1, d) => {
        if ((!autoScrolling && (pos_1 > d.LowerLimit)) && (pos_1 < d.UpperLimit)) {
            return new Snap(pos_1, d.Snap, d.IndicatorPos);
        }
        else {
            return void 0;
        }
    };
    const unSnapPosition = defaultArg(map((snap) => snap.UnSnapPosition, snapI.SnapOpt), pos.ActualPosition);
    const data = snapI.SnapData;
    const newUnSnapPosition = unSnapPosition + pos.MouseDelta;
    let patternInput;
    const matchValue = tryPick(curry2(mustSnap)(newUnSnapPosition), data);
    if (matchValue == null) {
        patternInput = [void 0, newUnSnapPosition];
    }
    else {
        const snapPos = matchValue;
        patternInput = [snapPos, snapPos.SnapPosition];
    }
    const newSnap = patternInput[0];
    const newPosition = patternInput[1];
    return [new SnapInfo(snapI.SnapData, newSnap), newPosition - pos.ActualPosition];
}

/**
 * Determine how a dragged symbol snaps. Returns updated snap info and offset to add to symbol position.
 * Symbol position is not updated here, the offset is given to a MoveSymbol message.
 * Called every mouse movement update in a symbol drag.
 */
export function snap2DSymbol(autoScrolling, mousePos, symbol, model) {
    let centrePos;
    const symbol_1 = symbol;
    const comp = symbol_1.Component;
    let patternInput;
    const comp_1 = comp;
    const matchValue = defaultArg(symbol_1.HScale, 1);
    const vS = defaultArg(symbol_1.VScale, 1);
    const hS = matchValue;
    const matchValue_2 = symbol_1.STransform.Rotation;
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
    centrePos = (new XYPos(centreX, centreY));
    const patternInput_2 = snap1D(autoScrolling, {
        ActualPosition: centrePos.X,
        MouseDelta: mousePos.X - model.LastMousePos.X,
    }, model.SnapSymbols.SnapX);
    const snapIX = patternInput_2[0];
    const deltaX = patternInput_2[1];
    const patternInput_3 = snap1D(autoScrolling, {
        ActualPosition: centrePos.Y,
        MouseDelta: mousePos.Y - model.LastMousePos.Y,
    }, model.SnapSymbols.SnapY);
    const snapIY = patternInput_3[0];
    const deltaY = patternInput_3[1];
    const snapXY = new SnapXY(snapIX, snapIY);
    return [snapXY, new XYPos(deltaX, deltaY)];
}

/**
 * Determine how a dragged segment snaps. Returns updated snap info and offset to add to ssegment position.
 * Segment position is not updated here, the offset is given to a MoveSegment message.
 * NB every segment can only be dragged in one cordinate - perpendicular to its orientation.
 * Called every mouse movement update in a segment drag.
 */
export function snap2DSegment(autoScrolling, mousePos, aSegment, model) {
    let ori;
    const segStart = aSegment.Start;
    const segEnd = aSegment.End;
    ori = ((Math.abs(segStart.X - segEnd.X) < 1E-07) ? "vertical" : ((Math.abs(segStart.Y - segEnd.Y) < 1E-07) ? "horizontal" : toFail(printf("ERROR: Diagonal wire"))));
    let fixedCoord;
    const aSeg = aSegment;
    let ori_1;
    const segStart_1 = aSeg.Start;
    const segEnd_1 = aSeg.End;
    ori_1 = ((Math.abs(segStart_1.X - segEnd_1.X) < 1E-07) ? "vertical" : ((Math.abs(segStart_1.Y - segEnd_1.Y) < 1E-07) ? "horizontal" : toFail(printf("ERROR: Diagonal wire"))));
    fixedCoord = ((ori_1 === "horizontal") ? aSeg.Start.Y : aSeg.Start.X);
    let deltaXY;
    const left = mousePos;
    const right = model.LastMousePos;
    deltaXY = (new XYPos(left.X - right.X, left.Y - right.Y));
    const snapXY = model.SnapSegments;
    let patternInput_2;
    if (ori === "vertical") {
        const patternInput_1 = snap1D(autoScrolling, {
            ActualPosition: fixedCoord,
            MouseDelta: deltaXY.X,
        }, snapXY.SnapX);
        const snapX = patternInput_1[0];
        const delta_1 = patternInput_1[1];
        patternInput_2 = [new SnapXY(snapX, snapXY.SnapY), new XYPos(delta_1, deltaXY.Y)];
    }
    else {
        const patternInput = snap1D(autoScrolling, {
            ActualPosition: fixedCoord,
            MouseDelta: deltaXY.Y,
        }, snapXY.SnapY);
        const snapY = patternInput[0];
        const delta = patternInput[1];
        patternInput_2 = [new SnapXY(snapXY.SnapX, snapY), new XYPos(deltaXY.X, delta)];
    }
    const newSnapXY = patternInput_2[0];
    const newDeltaXY = patternInput_2[1];
    return [newSnapXY, newDeltaXY];
}

//# sourceMappingURL=SheetSnap.fs.js.map
