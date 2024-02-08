import { contains, append, find, ofArray, minBy, empty, singleton, maxBy, isEmpty, sortWith, head, updateAt, collect, item, getSlice, pairwise, zip, length, initialize, filter, map } from "../fable_modules/fable-library.4.1.4/List.js";
import { map as map_1, defaultArgWith, orElse, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { compare, comparePrimitives, safeHash, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { BusWireT_Model, SymbolT_PortId, BusWireT_Wire, BusWireT_Segment, SymbolT_Annotation } from "../Model/DrawModelType.fs.js";
import { Rotation, BoundingBox, XYPos } from "../Common/CommonTypes.fs.js";
import { toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { toList as toList_1, ofList, FSharpMap__get_Item, values } from "../fable_modules/fable-library.4.1.4/Map.js";
import { moveWire, isWireInNet, getWireLength, getStartAndEndWirePos, Constants_intervalTolerance, segmentIntersectsBoundingBox, segmentsToIssieVertices } from "./BlockHelpers.fs.js";
import { Union, toString } from "../fable_modules/fable-library.4.1.4/Types.js";
import { Constants_maxCallsToShiftHorizontalSeg, swapXY, Constants_smallOffset, swapBB, updatePos, Constants_minWireSeparation } from "./BusWireRoutingHelpers.fs.js";
import { List_distinct } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { union_type, float64_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { Constants_nubLength } from "./BusWire.fs.js";
import { filterWiresByCompMoved, partialAutoroute, reverseWire, autoroute } from "./BusWireUpdateHelpers.fs.js";
import { getPortLocation } from "./Symbol.fs.js";

/**
 * Checks if a wire intersects any symbol within +/- minWireSeparation
 * Returns list of bounding boxes of symbols intersected by wire.
 */
export function findWireSymbolIntersections(model, wire) {
    const allSymbolsIntersected = map((s_1) => {
        let sym, patternInput, sym_1, comp, matchValue, vS, hS, matchValue_2, w, h, left, right;
        return [s_1.Component.Type, (sym = s_1, (patternInput = ((sym_1 = sym, (comp = sym_1.Component, (matchValue = defaultArg(sym_1.HScale, 1), (vS = defaultArg(sym_1.VScale, 1), (hS = matchValue, (matchValue_2 = sym_1.STransform.Rotation, (matchValue_2.tag === 2) ? [comp.H * vS, comp.W * hS] : ((matchValue_2.tag === 1) ? [comp.W * hS, comp.H * vS] : ((matchValue_2.tag === 3) ? [comp.W * hS, comp.H * vS] : [comp.H * vS, comp.W * hS]))))))))), (w = patternInput[1], (h = patternInput[0], equals(sym.Annotation, new SymbolT_Annotation(0, [])) ? (new BoundingBox((left = sym.Pos, (right = (new XYPos(9, 9)), new XYPos(left.X - right.X, left.Y - right.Y))), 17, 17)) : (new BoundingBox(sym.Pos, w, h))))))];
    }, filter((s) => equals(s.Annotation, void 0), toList(values(model.Symbol.Symbols))));
    const wireVertices = map((tupledArg) => {
        const x = tupledArg[0];
        const y = tupledArg[1];
        return new XYPos(x, y);
    }, segmentsToIssieVertices(wire.Segments, wire));
    const indexes = initialize(length(wireVertices) - 2, (i) => (i + 1));
    const segVertices = zip(indexes, pairwise(getSlice(1, length(wireVertices) - 2, wireVertices)));
    const inputCompId = FSharpMap__get_Item(model.Symbol.Ports, toString(wire.InputPort)).HostId;
    const outputCompId = FSharpMap__get_Item(model.Symbol.Ports, toString(wire.OutputPort)).HostId;
    const componentIsMux = (comp_1) => {
        const matchValue_3 = comp_1.Type;
        switch (matchValue_3.tag) {
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                return true;
            default:
                return false;
        }
    };
    let inputIsSelect;
    const inputSymbol = FSharpMap__get_Item(model.Symbol.Symbols, inputCompId);
    const inputCompInPorts = inputSymbol.Component.InputPorts;
    inputIsSelect = (componentIsMux(inputSymbol.Component) && (item(length(inputCompInPorts) - 1, inputCompInPorts).Id === toString(wire.InputPort)));
    const inputCompRotation = FSharpMap__get_Item(model.Symbol.Symbols, inputCompId).STransform.Rotation;
    const outputCompRotation = FSharpMap__get_Item(model.Symbol.Symbols, outputCompId).STransform.Rotation;
    const isConnectedToSelf = inputCompId === outputCompId;
    const boxesIntersectedBySegment = (lastSeg, startPos, endPos) => map((tupledArg_3) => {
        const compType_2 = tupledArg_3[0];
        const boundingBox_2 = tupledArg_3[1];
        return boundingBox_2;
    }, filter((tupledArg_2) => {
        const compType_1 = tupledArg_2[0];
        const boundingBox_1 = tupledArg_2[1];
        let matchResult;
        switch (compType_1.tag) {
            case 11: {
                if (lastSeg) {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case 12: {
                if (lastSeg) {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case 13: {
                if (lastSeg) {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case 14: {
                if (lastSeg) {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case 15: {
                if (lastSeg) {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case 16: {
                if (lastSeg) {
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
                return false;
            default: {
                const matchValue_5 = segmentIntersectsBoundingBox(boundingBox_1, startPos, endPos);
                if (matchValue_5 == null) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    }, map((tupledArg_1) => {
        let W, H_2;
        const compType = tupledArg_1[0];
        const boundingBox = tupledArg_1[1];
        return [compType, (W = (boundingBox.W + (Constants_minWireSeparation * 2)), (H_2 = (boundingBox.H + (Constants_minWireSeparation * 2)), new BoundingBox(updatePos("up_", Constants_minWireSeparation, updatePos("left_", Constants_minWireSeparation, boundingBox.TopLeft)), W, H_2)))];
    }, allSymbolsIntersected)));
    return List_distinct(collect((tupledArg_4) => {
        const i_1 = tupledArg_4[0] | 0;
        const _arg_1 = tupledArg_4[1];
        const startPos_1 = _arg_1[0];
        const endPos_1 = _arg_1[1];
        return boxesIntersectedBySegment((i_1 > (length(segVertices) - 2)) && inputIsSelect, startPos_1, endPos_1);
    }, segVertices), {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

export function changeSegment(segIndex, newLength, segments) {
    let inputRecord;
    return updateAt(segIndex, (inputRecord = item(segIndex, segments), new BusWireT_Segment(inputRecord.Index, newLength, inputRecord.WireId, inputRecord.IntersectOrJumpList, inputRecord.Draggable, inputRecord.Mode)), segments);
}

/**
 * Try shifting vertical seg to either - wireSeparationFromSymbol or + wireSeparationFromSymbol of intersected symbols.
 * Returns None if no route found.
 */
export function tryShiftVerticalSeg(model, intersectedBoxes, wire) {
    const wireVertices = map((tupledArg) => {
        const x = tupledArg[0];
        const y = tupledArg[1];
        return new XYPos(x, y);
    }, segmentsToIssieVertices(wire.Segments, wire));
    const shiftVerticalSeg = (amountToShift) => {
        let inputRecord, inputRecord_1;
        let newSegments;
        const source_1 = updateAt(2, (inputRecord = item(2, wire.Segments), new BusWireT_Segment(inputRecord.Index, item(2, wire.Segments).Length + amountToShift, inputRecord.WireId, inputRecord.IntersectOrJumpList, inputRecord.Draggable, inputRecord.Mode)), wire.Segments);
        newSegments = updateAt(4, (inputRecord_1 = item(4, wire.Segments), new BusWireT_Segment(inputRecord_1.Index, item(4, wire.Segments).Length - amountToShift, inputRecord_1.WireId, inputRecord_1.IntersectOrJumpList, inputRecord_1.Draggable, inputRecord_1.Mode)), source_1);
        return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, newSegments, wire.StartPos, wire.InitialOrientation);
    };
    const tryShiftWireVert = (dir) => {
        const boundBox = head(sortWith((box1, box2) => {
            const box1_1 = swapBB(box1, wire.InitialOrientation);
            const box2_1 = swapBB(box2, wire.InitialOrientation);
            switch (dir) {
                case "left_":
                    return comparePrimitives(box1_1.TopLeft.X, box2_1.TopLeft.X) | 0;
                case "right_":
                    return comparePrimitives(box2_1.TopLeft.X + box2_1.W, box1_1.TopLeft.X + box1_1.W) | 0;
                default:
                    throw new Error("Invalid direction to shift wire");
            }
        }, intersectedBoxes));
        let viablePos;
        const matchValue = wire.InitialOrientation;
        switch (dir) {
            case "left_": {
                if (matchValue === "vertical") {
                    const initialAttemptPos_2 = updatePos("up_", Constants_smallOffset, boundBox.TopLeft);
                    viablePos = initialAttemptPos_2;
                }
                else {
                    const initialAttemptPos = updatePos("left_", Constants_smallOffset, boundBox.TopLeft);
                    viablePos = initialAttemptPos;
                }
                break;
            }
            case "right_": {
                if (matchValue === "vertical") {
                    const initialAttemptPos_3 = updatePos("down_", boundBox.H + Constants_smallOffset, boundBox.TopLeft);
                    viablePos = initialAttemptPos_3;
                }
                else {
                    const initialAttemptPos_1 = updatePos("right_", boundBox.W + Constants_smallOffset, boundBox.TopLeft);
                    viablePos = initialAttemptPos_1;
                }
                break;
            }
            default:
                throw new Error("Invalid direction to shift wire");
        }
        const amountToShift_1 = swapXY(viablePos, wire.InitialOrientation).X - swapXY(item(4, wireVertices), wire.InitialOrientation).X;
        return shiftVerticalSeg(amountToShift_1);
    };
    const tryShiftLeftWire = tryShiftWireVert("left_");
    const tryShiftRightWire = tryShiftWireVert("right_");
    const leftShiftedWireIntersections = findWireSymbolIntersections(model, tryShiftLeftWire);
    const rightShiftedWireIntersections = findWireSymbolIntersections(model, tryShiftRightWire);
    if (isEmpty(leftShiftedWireIntersections)) {
        return tryShiftLeftWire;
    }
    else if (isEmpty(rightShiftedWireIntersections)) {
        return tryShiftRightWire;
    }
    else {
        return void 0;
    }
}

export class VertDistFromBoundingBox extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Above", "Below"];
    }
}

export function VertDistFromBoundingBox_$reflection() {
    return union_type("BusWireRoute.VertDistFromBoundingBox", [], VertDistFromBoundingBox, () => [[["Item", float64_type]], [["Item", float64_type]]]);
}

export function tryMaxDistance(distances) {
    if (isEmpty(distances)) {
        return void 0;
    }
    else {
        return maxBy((_arg) => {
            let d;
            return (_arg == null) ? -Number.POSITIVE_INFINITY : ((_arg.tag === 1) ? ((d = _arg.fields[0], d)) : ((d = _arg.fields[0], d)));
        }, distances, {
            Compare: comparePrimitives,
        });
    }
}

/**
 * returns the maximum vertical distance of pos from intersectedBoxes as a VertDistFromBoundingBox or None if there are no intersections
 */
export function maxVertDistanceFromBox(intersectedBoxes, wireOrientation, pos) {
    const isCloseToBoxHoriz = (box, pos_1) => {
        const x = pos_1.X;
        const e = Constants_intervalTolerance;
        if ((box.TopLeft.X - e) < x) {
            return x < ((box.TopLeft.X + box.W) + e);
        }
        else {
            return false;
        }
    };
    const getVertDistanceToBox = (pos_2, box_1) => {
        const pos_3 = swapXY(pos_2, wireOrientation);
        const box_2 = swapBB(box_1, wireOrientation);
        if (isCloseToBoxHoriz(box_2, pos_3)) {
            if (pos_3.Y > box_2.TopLeft.Y) {
                return singleton(new VertDistFromBoundingBox(0, [pos_3.Y - box_2.TopLeft.Y]));
            }
            else {
                return singleton(new VertDistFromBoundingBox(1, [(box_2.TopLeft.Y - pos_3.Y) + box_2.H]));
            }
        }
        else {
            return empty();
        }
    };
    return tryMaxDistance(collect((box_3) => getVertDistanceToBox(pos, box_3), intersectedBoxes));
}

/**
 * Recursively shift horizontal seg up/down until no symbol intersections.
 * Limit in recursion depth defined by argument callsLeft given to initial function call.
 * Limit needed to prevent Issie from breaking when there are physically
 * no possible routes that achieve 0 intersections.
 * Returns None if no route found
 */
export function tryShiftHorizontalSeg(callsLeft, model, intersectedBoxes, wire) {
    if (callsLeft === 0) {
        return void 0;
    }
    else {
        const n = callsLeft | 0;
        let tryShiftHorizontalSeg_1;
        const callsLeft_1 = (n - 1) | 0;
        tryShiftHorizontalSeg_1 = ((model_1) => ((intersectedBoxes_1) => ((wire_1) => tryShiftHorizontalSeg(callsLeft_1, model_1, intersectedBoxes_1, wire_1))));
        const patternInput = getStartAndEndWirePos(wire);
        const currentStartPos = patternInput[0];
        const currentEndPos = patternInput[1];
        const shiftWireHorizontally = (firstVerticalSegLength, secondVerticalSegLength) => {
            let inputRecord;
            const moveHorizSegment = (vertSegIndex) => {
                let f1;
                const segIndex = (vertSegIndex - 1) | 0;
                f1 = ((segments) => changeSegment(segIndex, firstVerticalSegLength, segments));
                let f2;
                const segIndex_1 = (vertSegIndex + 1) | 0;
                f2 = ((segments_1) => changeSegment(segIndex_1, secondVerticalSegLength, segments_1));
                return (arg) => f2(f1(arg));
            };
            let newSegments;
            const matchValue = length(wire.Segments) | 0;
            switch (matchValue) {
                case 5:
                case 6: {
                    newSegments = moveHorizSegment(2)(wire.Segments);
                    break;
                }
                case 7: {
                    let source;
                    const segments_2 = moveHorizSegment(2)(getSlice(void 0, 4, wire.Segments));
                    source = changeSegment(2, item(2, wire.Segments).Length + item(4, wire.Segments).Length, segments_2);
                    newSegments = updateAt(4, (inputRecord = item(6, wire.Segments), new BusWireT_Segment(4, inputRecord.Length, inputRecord.WireId, inputRecord.IntersectOrJumpList, inputRecord.Draggable, inputRecord.Mode)), source);
                    break;
                }
                case 9: {
                    newSegments = changeSegment(7, 0, moveHorizSegment(4)(changeSegment(1, 0, wire.Segments)));
                    break;
                }
                default:
                    newSegments = wire.Segments;
            }
            return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, newSegments, wire.StartPos, wire.InitialOrientation);
        };
        const shiftedWire = (direction) => {
            let clo;
            const orientation = wire.InitialOrientation;
            const getXOrY = (pos) => {
                if (orientation === "vertical") {
                    return pos.Y;
                }
                else {
                    return pos.X;
                }
            };
            const getOppositeXOrY = (pos_1) => {
                if (orientation === "vertical") {
                    return pos_1.X;
                }
                else {
                    return pos_1.Y;
                }
            };
            const getWOrH = (box) => {
                if (orientation === "vertical") {
                    return box.H;
                }
                else {
                    return box.W;
                }
            };
            const getOppositeWOrH = (box_1) => {
                if (orientation === "vertical") {
                    return box_1.W;
                }
                else {
                    return box_1.H;
                }
            };
            const patternInput_1 = (direction === "up_") ? [(_arg) => 0, "left_"] : ((direction === "down_") ? [getOppositeWOrH, "right_"] : toFail(printf("What? Can\'t happen")));
            const otherDir = patternInput_1[1];
            const offsetOfBox = patternInput_1[0];
            const boundBox = ((direction === "down_") ? ((list) => maxBy((box_3) => (getOppositeXOrY(box_3.TopLeft) + getOppositeWOrH(box_3)), list, {
                Compare: comparePrimitives,
            })) : ((direction === "up_") ? ((list_1) => minBy((box_4) => getOppositeXOrY(box_4.TopLeft), list_1, {
                Compare: comparePrimitives,
            })) : ((clo = toFail(printf("What? Can\'t happen")), clo))))(intersectedBoxes);
            let bound;
            const offset = Constants_smallOffset + offsetOfBox(boundBox);
            const otherOrientation = (orientation === "vertical") ? otherDir : direction;
            const initialAttemptPos = updatePos(otherOrientation, offset, boundBox.TopLeft);
            bound = getOppositeXOrY(initialAttemptPos);
            const matchValue_1 = bound - getOppositeXOrY(currentStartPos);
            const secondVerticalSegLength_1 = getOppositeXOrY(currentEndPos) - bound;
            const firstVerticalSegLength_1 = matchValue_1;
            return shiftWireHorizontally(firstVerticalSegLength_1, secondVerticalSegLength_1);
        };
        const goodWire = (dir) => {
            const shiftedWire_1 = shiftedWire(dir);
            const matchValue_3 = findWireSymbolIntersections(model, shiftedWire_1);
            if (isEmpty(matchValue_3)) {
                return new FSharpResult$2(0, [shiftedWire_1]);
            }
            else {
                const intersectedBoxes_2 = matchValue_3;
                return new FSharpResult$2(1, [[intersectedBoxes_2, shiftedWire_1]]);
            }
        };
        const matchValue_4 = goodWire("up_");
        const matchValue_5 = goodWire("down_");
        const copyOfStruct = matchValue_4;
        if (copyOfStruct.tag === 1) {
            const copyOfStruct_1 = matchValue_5;
            if (copyOfStruct_1.tag === 1) {
                const downIntersections = copyOfStruct_1.fields[0][0];
                const downShiftedWire = copyOfStruct_1.fields[0][1];
                const upIntersections = copyOfStruct.fields[0][0];
                const upShiftedWire = copyOfStruct.fields[0][1];
                const _arg_1 = tryMaxDistance(map((pos_2) => maxVertDistanceFromBox(intersectedBoxes, wire.InitialOrientation, pos_2), ofArray([currentStartPos, currentEndPos])));
                let matchResult;
                if (_arg_1 != null) {
                    if (_arg_1.tag === 1) {
                        matchResult = 1;
                    }
                    else {
                        matchResult = 0;
                    }
                }
                else {
                    matchResult = 0;
                }
                switch (matchResult) {
                    case 0:
                        return tryShiftHorizontalSeg_1(model)(downIntersections)(downShiftedWire);
                    default:
                        return tryShiftHorizontalSeg_1(model)(upIntersections)(upShiftedWire);
                }
            }
            else {
                const downWire_1 = copyOfStruct_1.fields[0];
                return downWire_1;
            }
        }
        else {
            const copyOfStruct_2 = matchValue_5;
            if (copyOfStruct_2.tag === 0) {
                const downWire = copyOfStruct_2.fields[0];
                const upWire = copyOfStruct.fields[0];
                if (getWireLength(upWire) < getWireLength(downWire)) {
                    return upWire;
                }
                else {
                    return downWire;
                }
            }
            else {
                const upWire_1 = copyOfStruct.fields[0];
                return upWire_1;
            }
        }
    }
}

export function getWireVertices(wire) {
    return map((tupledArg) => {
        const x = tupledArg[0];
        const y = tupledArg[1];
        return new XYPos(x, y);
    }, segmentsToIssieVertices(wire.Segments, wire));
}

export function copySegments(wire, refWire, numOfSegsToCopy) {
    return map((i) => {
        const inputRecord = item(i, wire.Segments);
        return new BusWireT_Segment(inputRecord.Index, item(i, refWire.Segments).Length, inputRecord.WireId, inputRecord.IntersectOrJumpList, inputRecord.Draggable, inputRecord.Mode);
    }, toList(rangeDouble(0, 1, numOfSegsToCopy - 1)));
}

export function generateEndSegments(startIndex, numOfSegs, wire) {
    let inputRecord_1;
    const source = map((i) => {
        const inputRecord = item(i % 2, wire.Segments);
        return new BusWireT_Segment(i, 0, inputRecord.WireId, inputRecord.IntersectOrJumpList, inputRecord.Draggable, inputRecord.Mode);
    }, toList(rangeDouble(startIndex, 1, (startIndex + numOfSegs) - 1)));
    return updateAt(numOfSegs - 1, (inputRecord_1 = item(numOfSegs - 1, wire.Segments), new BusWireT_Segment(inputRecord_1.Index, Constants_nubLength, inputRecord_1.WireId, inputRecord_1.IntersectOrJumpList, inputRecord_1.Draggable, inputRecord_1.Mode)), source);
}

/**
 * Finds the first reference wire in a net and keeps the same segment lengths
 * as much as possible based on a heuristic.
 * Snap to net only implemented for one orientation
 */
export function snapToNet(model, wireToRoute) {
    let n, orientation, inputRecord_4, inputRecord_5, inputRecord_6, inputRecord_2, inputRecord_3, inputRecord, inputRecord_1;
    const inputCompId = FSharpMap__get_Item(model.Symbol.Ports, toString(wireToRoute.InputPort)).HostId;
    const outputCompId = FSharpMap__get_Item(model.Symbol.Ports, toString(wireToRoute.OutputPort)).HostId;
    const isRotated = ((equals(FSharpMap__get_Item(model.Symbol.Symbols, inputCompId).STransform.Rotation, new Rotation(1, [])) ? true : equals(FSharpMap__get_Item(model.Symbol.Symbols, inputCompId).STransform.Rotation, new Rotation(3, []))) ? true : equals(FSharpMap__get_Item(model.Symbol.Symbols, outputCompId).STransform.Rotation, new Rotation(1, []))) ? true : equals(FSharpMap__get_Item(model.Symbol.Symbols, outputCompId).STransform.Rotation, new Rotation(3, []));
    const patternInput = getStartAndEndWirePos(wireToRoute);
    const wireToRouteStartPos = patternInput[0];
    const wireToRouteEndPos = patternInput[1];
    const matchValue = length(wireToRoute.Segments) | 0;
    const matchValue_1 = wireToRoute.InitialOrientation;
    const matchValue_2 = wireToRouteStartPos.X > wireToRouteEndPos.X;
    const matchValue_3 = isWireInNet(model, wireToRoute);
    if ((n = (matchValue | 0), (n !== 5) && (n !== 7))) {
        const n_1 = matchValue | 0;
        return wireToRoute;
    }
    else if (isRotated) {
        return wireToRoute;
    }
    else if ((orientation = matchValue_1, orientation !== "horizontal")) {
        const orientation_1 = matchValue_1;
        return wireToRoute;
    }
    else if (matchValue_2) {
        return wireToRoute;
    }
    else if (matchValue_3 != null) {
        const netlist = matchValue_3[1];
        const refWire = find((tupledArg) => {
            const w = tupledArg[1];
            return !equals(w.WId, wireToRoute.WId);
        }, netlist)[1];
        const refWireVertices = getWireVertices(refWire);
        const refEndPos = getStartAndEndWirePos(refWire)[1];
        const firstBendPos = item(3, refWireVertices);
        const horizontalSegLength = item(2, refWire.Segments).Length;
        const isHorizontalSegTooShort = (wireToRouteEndPos.X - wireToRouteStartPos.X) < (horizontalSegLength / 2);
        let numOfSegsToCopy;
        let simpleCase;
        const matchValue_5 = wireToRouteEndPos.X < firstBendPos.X;
        simpleCase = (matchValue_5 ? (isHorizontalSegTooShort ? 1 : 2) : 3);
        const matchValue_7 = length(refWire.Segments) | 0;
        switch (matchValue_7) {
            case 5: {
                const matchValue_8 = firstBendPos.Y < refEndPos.Y;
                const matchValue_9 = firstBendPos.Y > wireToRouteEndPos.Y;
                let matchResult;
                if (matchValue_8) {
                    if (matchValue_9) {
                        matchResult = 0;
                    }
                    else {
                        matchResult = 1;
                    }
                }
                else if (matchValue_9) {
                    matchResult = 1;
                }
                else {
                    matchResult = 0;
                }
                switch (matchResult) {
                    case 0: {
                        numOfSegsToCopy = ((wireToRouteEndPos.X < firstBendPos.X) ? 2 : 3);
                        break;
                    }
                    default:
                        numOfSegsToCopy = simpleCase;
                }
                break;
            }
            case 7: {
                numOfSegsToCopy = simpleCase;
                break;
            }
            default:
                numOfSegsToCopy = 0;
        }
        const newSegments = (numOfSegsToCopy === 0) ? wireToRoute.Segments : ((numOfSegsToCopy === 1) ? append(copySegments(wireToRoute, refWire, 1), append(singleton((inputRecord_4 = item(1, wireToRoute.Segments), new BusWireT_Segment(inputRecord_4.Index, wireToRouteEndPos.Y - wireToRouteStartPos.Y, inputRecord_4.WireId, inputRecord_4.IntersectOrJumpList, inputRecord_4.Draggable, inputRecord_4.Mode))), append(singleton((inputRecord_5 = item(2, wireToRoute.Segments), new BusWireT_Segment(inputRecord_5.Index, (wireToRouteEndPos.X - wireToRouteStartPos.X) - Constants_nubLength, inputRecord_5.WireId, inputRecord_5.IntersectOrJumpList, inputRecord_5.Draggable, inputRecord_5.Mode))), append(singleton((inputRecord_6 = item(3, wireToRoute.Segments), new BusWireT_Segment(inputRecord_6.Index, 0, inputRecord_6.WireId, inputRecord_6.IntersectOrJumpList, inputRecord_6.Draggable, inputRecord_6.Mode))), generateEndSegments(4, 3, wireToRoute))))) : ((numOfSegsToCopy === 2) ? append(copySegments(wireToRoute, refWire, 2), append(singleton((inputRecord_2 = item(2, wireToRoute.Segments), new BusWireT_Segment(inputRecord_2.Index, (wireToRouteEndPos.X - wireToRouteStartPos.X) - Constants_nubLength, inputRecord_2.WireId, inputRecord_2.IntersectOrJumpList, inputRecord_2.Draggable, inputRecord_2.Mode))), append(singleton((inputRecord_3 = item(3, wireToRoute.Segments), new BusWireT_Segment(inputRecord_3.Index, wireToRouteEndPos.Y - firstBendPos.Y, inputRecord_3.WireId, inputRecord_3.IntersectOrJumpList, inputRecord_3.Draggable, inputRecord_3.Mode))), generateEndSegments(4, 3, wireToRoute)))) : ((numOfSegsToCopy === 3) ? append(copySegments(wireToRoute, refWire, 3), append(singleton((inputRecord = item(3, wireToRoute.Segments), new BusWireT_Segment(inputRecord.Index, wireToRouteEndPos.Y - firstBendPos.Y, inputRecord.WireId, inputRecord.IntersectOrJumpList, inputRecord.Draggable, inputRecord.Mode))), append(singleton((inputRecord_1 = item(4, wireToRoute.Segments), new BusWireT_Segment(inputRecord_1.Index, wireToRouteEndPos.X - firstBendPos.X, inputRecord_1.WireId, inputRecord_1.IntersectOrJumpList, inputRecord_1.Draggable, inputRecord_1.Mode))), generateEndSegments(5, 2, wireToRoute)))) : toFail(printf("Shouldn\'t happen")))));
        return new BusWireT_Wire(wireToRoute.WId, wireToRoute.InputPort, wireToRoute.OutputPort, wireToRoute.Color, wireToRoute.Width, newSegments, wireToRoute.StartPos, wireToRoute.InitialOrientation);
    }
    else {
        return wireToRoute;
    }
}

/**
 * top-level function which replaces autoupdate and implements a smarter version of same
 * it is called every time a new wire is created, so is easily tested.
 */
export function smartAutoroute(model, wire) {
    const initialWire = autoroute(model, wire);
    const snappedToNetWire = initialWire;
    const intersectedBoxes = findWireSymbolIntersections(model, snappedToNetWire);
    if (length(intersectedBoxes) === 0) {
        return snappedToNetWire;
    }
    else {
        return defaultArg(orElse(tryShiftVerticalSeg(model, intersectedBoxes, snappedToNetWire), tryShiftHorizontalSeg(Constants_maxCallsToShiftHorizontalSeg, model, intersectedBoxes, snappedToNetWire)), snappedToNetWire);
    }
}

/**
 * Returns a single re-routed wire from the given model.
 * First attempts partial autorouting, and defaults to full autorouting if this is not possible.
 * Reverse indicates if the wire should be processed in reverse,
 * used when an input port (end of wire) is moved.
 */
export function updateWire(model, wire, reverse) {
    let newPort;
    if (reverse) {
        let id;
        const portId_1 = new SymbolT_PortId(0, [wire.InputPort]);
        if (portId_1.tag === 1) {
            const id_1_1 = portId_1.fields[0];
            id = id_1_1;
        }
        else {
            const id_1 = portId_1.fields[0];
            id = id_1;
        }
        newPort = getPortLocation(void 0, model.Symbol, id);
    }
    else {
        let id_2;
        const portId_3 = new SymbolT_PortId(1, [wire.OutputPort]);
        if (portId_3.tag === 1) {
            const id_1_2 = portId_3.fields[0];
            id_2 = id_1_2;
        }
        else {
            const id_3 = portId_3.fields[0];
            id_2 = id_3;
        }
        newPort = getPortLocation(void 0, model.Symbol, id_2);
    }
    return defaultArgWith(reverse ? map_1(reverseWire, partialAutoroute(model, reverseWire(wire), newPort, true)) : partialAutoroute(model, wire, newPort, false), () => smartAutoroute(model, wire));
}

/**
 * Re-routes the wires in the model based on a list of components that have been altered.
 * If the wire input and output ports are both in the list of moved components,
 * it does not re-route wire but instead translates it.
 * Keeps manual wires manual (up to a point).
 * Otherwise it will auto-route wires connected to components that have moved
 */
export function updateWires(model, compIdList, diff) {
    const wires = filterWiresByCompMoved(model, compIdList);
    const newWires = ofList(map((tupledArg) => {
        const cId = tupledArg[0];
        const wire = tupledArg[1];
        if (contains(cId, wires.Both, {
            Equals: equals,
            GetHashCode: safeHash,
        })) {
            return [cId, moveWire(wire, diff)];
        }
        else if (contains(cId, wires.Inputs, {
            Equals: equals,
            GetHashCode: safeHash,
        })) {
            return [cId, updateWire(model, wire, true)];
        }
        else if (contains(cId, wires.Outputs, {
            Equals: equals,
            GetHashCode: safeHash,
        })) {
            return [cId, updateWire(model, wire, false)];
        }
        else {
            return [cId, wire];
        }
    }, toList_1(model.Wires)), {
        Compare: compare,
    });
    return new BusWireT_Model(model.Symbol, newWires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
}

//# sourceMappingURL=BusWireRoute.fs.js.map
