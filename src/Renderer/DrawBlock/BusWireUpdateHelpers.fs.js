import { Edge, XYPos_$reflection, Edge_$reflection, XYPos } from "../Common/CommonTypes.fs.js";
import { min, max } from "../fable_modules/fable-library.4.1.4/Double.js";
import { defaultArg, map as map_2, bind, value as value_2 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { SymbolT_symbols_, BusWireT_symbol_, SymbolT_ports_, BusWireT_wires_, SymbolT_Symbol, BusWireT_WireType, BusWireT_Model, BusWireT_Wire_$reflection, SymbolT_PortId, BusWireT_Wire, BusWireT_mode_, BusWireT_segments_, BusWireT_wireOf_, BusWireT_Segment, BusWireT_ASegment } from "../Model/DrawModelType.fs.js";
import { FSharpMap__get_Count, remove, tryFind as tryFind_1, fold as fold_2, toArray, map as map_3, add, containsKey, toList, filter as filter_1, values, FSharpMap__get_Item } from "../fable_modules/fable-library.4.1.4/Map.js";
import { isEmpty, tryPick, allPairs, singleton, concat, unzip, cons, partition, splitAt, tryFind, ofArray, append, exists, indexed, sortDescending, mapIndexed, ofArrayWithTail, getSlice, empty, updateAt, removeManyAt, item, reverse, length as length_2, takeWhile, map as map_1, fold, ofSeq, collect, filter } from "../fable_modules/fable-library.4.1.4/List.js";
import { makeInitialSegmentsList, logSegmentId, Constants_nubLength, Constants_modernCirclePositionTolerance } from "./BusWire.fs.js";
import { partitionWiresIntoNets, Constants_intervalTolerance, getAbsSegments } from "./BlockHelpers.fs.js";
import { comparePrimitives, sign, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { toConsole, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { deletePortFromMaps, getPortLocation, getPortLocations } from "./Symbol.fs.js";
import { Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { toString, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { int32_type, float64_type, record_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { toList as toList_1 } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { fold as fold_1, map as map_4 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { instrumentInterval, instrumentTime, getTimeMs } from "../Common/TimeHelpers.fs.js";

/**
 * Returns Some distance between a point and a segment defined by a start and end XYPos,
 * and None if the segment is of 0 length (can't be clicked)
 */
export function distanceBetweenPointAndSegment(segStart, segEnd, point) {
    let p1_2, left_1, right_1, p2_2, left_2, right_2, diff_1, left_5, right_5, p1_4, p2_4;
    let matchValue;
    let diff;
    const left = segStart;
    const right = segEnd;
    diff = (new XYPos(left.X - right.X, left.Y - right.Y));
    const p1_1 = diff;
    const p2_1 = diff;
    matchValue = ((p1_1.X * p2_1.X) + (p1_1.Y * p2_1.Y));
    if (matchValue === 0) {
        return void 0;
    }
    else {
        const l2 = matchValue;
        const tProjection = ((p1_2 = ((left_1 = point, (right_1 = segStart, new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y)))), (p2_2 = ((left_2 = segEnd, (right_2 = segStart, new XYPos(left_2.X - right_2.X, left_2.Y - right_2.Y)))), (p1_2.X * p2_2.X) + (p1_2.Y * p2_2.Y)))) / l2;
        const tBounded = max(0, min(1, tProjection));
        let boundedProjection;
        const left_4 = segStart;
        let right_4;
        const factor = tBounded;
        let pos_1;
        const left_3 = segEnd;
        const right_3 = segStart;
        pos_1 = (new XYPos(left_3.X - right_3.X, left_3.Y - right_3.Y));
        right_4 = (new XYPos(factor * pos_1.X, factor * pos_1.Y));
        boundedProjection = (new XYPos(left_4.X + right_4.X, left_4.Y + right_4.Y));
        return Math.sqrt((diff_1 = ((left_5 = point, (right_5 = boundedProjection, new XYPos(left_5.X - right_5.X, left_5.Y - right_5.Y)))), (p1_4 = diff_1, (p2_4 = diff_1, (p1_4.X * p2_4.X) + (p1_4.Y * p2_4.Y)))));
    }
}

/**
 * Finds the closest non-zero-length segment in a wire to a mouse click using euclidean distance.
 * Return it and all overlapping same-direction same-net segments
 */
export function getClickedSegment(model, wireId, mouse) {
    const closestSegment = (segStart, segEnd, state, seg) => {
        const currDist = value_2(distanceBetweenPointAndSegment(segStart, segEnd, mouse));
        const aSeg = new BusWireT_ASegment(segStart, segEnd, seg);
        if (state == null) {
            return [aSeg, currDist];
        }
        else {
            const minDist = state[1];
            const minASeg = state[0];
            if (currDist < minDist) {
                return [aSeg, currDist];
            }
            else {
                return [minASeg, minDist];
            }
        }
    };
    const getAllSameNetASegments = (model_1, mouse_1, segment) => {
        let this$;
        const wid = ((this$ = segment, [this$.Segment.Index, this$.Segment.WireId]))[1];
        const wire = FSharpMap__get_Item(model_1.Wires, wid);
        return filter((aSeg_1) => {
            let this$_2, delta, left, right, this$_3, delta_1, left_1, right_1;
            const d = distanceBetweenPointAndSegment(aSeg_1.Start, aSeg_1.End, mouse_1);
            const matchValue = Math.abs(aSeg_1.Segment.Length) < 1E-07;
            const matchValue_2 = ((this$_2 = segment, (delta = ((left = this$_2.Start, (right = this$_2.End, new XYPos(left.X - right.X, left.Y - right.Y)))), (Math.abs(delta.X) > Math.abs(delta.Y)) ? "horizontal" : "vertical"))) === ((this$_3 = aSeg_1, (delta_1 = ((left_1 = this$_3.Start, (right_1 = this$_3.End, new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y)))), (Math.abs(delta_1.X) > Math.abs(delta_1.Y)) ? "horizontal" : "vertical")));
            let matchResult, d_1;
            if (d != null) {
                if (matchValue) {
                    matchResult = 1;
                }
                else if (aSeg_1.Segment.Draggable) {
                    if (matchValue_2) {
                        matchResult = 0;
                        d_1 = d;
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
                    return d_1 < Constants_modernCirclePositionTolerance;
                default:
                    return false;
            }
        }, collect(getAbsSegments, ofSeq(values(filter_1((wid_1, wire$0027) => equals(wire$0027.OutputPort, wire.OutputPort), model_1.Wires)))));
    };
    let matchValue_4;
    const wire_2 = FSharpMap__get_Item(model.Wires, wireId);
    const initPos = wire_2.StartPos;
    const initOrientation = wire_2.InitialOrientation;
    const state_2 = fold((tupledArg, seg_1) => {
        const currState = tupledArg[0];
        const currPos = tupledArg[1];
        const currOrientation = tupledArg[2];
        const nextOrientation = (currOrientation === "vertical") ? "horizontal" : "vertical";
        if (Math.abs(seg_1.Length) < 1E-07) {
            return [currState, currPos, nextOrientation];
        }
        else {
            let nextPos;
            const position = currPos;
            const length = seg_1.Length;
            nextPos = ((currOrientation === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)));
            const nextState = closestSegment(currPos, nextPos, currState, seg_1);
            return [nextState, nextPos, nextOrientation];
        }
    }, [void 0, initPos, initOrientation], wire_2.Segments)[0];
    matchValue_4 = state_2;
    if (matchValue_4 == null) {
        return toFail(printf("getClosestSegment was given a wire with no segments"));
    }
    else {
        const segment_1 = matchValue_4[0];
        const _dist = matchValue_4[1];
        return getAllSameNetASegments(model, mouse, segment_1);
    }
}

/**
 * Returns a list of all the wires in the given model
 */
export function getWireList(model) {
    return map_1((tuple) => tuple[1], toList(model.Wires));
}

/**
 * Returns the IDs of the wires in the model connected to a list of components given by compIds
 */
export function getConnectedWires(model, compIds) {
    const containsPorts = (wire) => {
        const patternInput = getPortLocations(model.Symbol, compIds);
        const outputPorts = patternInput[1];
        const inputPorts = patternInput[0];
        if (containsKey(wire.InputPort, inputPorts)) {
            return true;
        }
        else {
            return containsKey(wire.OutputPort, outputPorts);
        }
    };
    return filter(containsPorts, getWireList(model));
}

/**
 * Returns the IDs of the wires in the model connected to a list of components given by compIds
 */
export function getConnectedWireIds(model, compIds) {
    return map_1((wire) => wire.WId, getConnectedWires(model, compIds));
}

/**
 * Returns a list of wire IDs that meet the given condition
 */
export function getFilteredIdList(condition, wireLst) {
    return map_1((wire) => wire.WId, filter(condition, wireLst));
}

/**
 * Given a model and a list of component Ids, returns an anonymous record
 * containing the id of wires connected to input ports, output ports or both
 */
export function filterWiresByCompMoved(model, compIds) {
    const wireList = getWireList(model);
    const patternInput = getPortLocations(model.Symbol, compIds);
    const outputPorts = patternInput[1];
    const inputPorts = patternInput[0];
    const containsInputPort = (wire) => containsKey(wire.InputPort, inputPorts);
    const containsOutputPort = (wire_1) => containsKey(wire_1.OutputPort, outputPorts);
    const containsBothPort = (wire_2) => {
        if (containsInputPort(wire_2)) {
            return containsOutputPort(wire_2);
        }
        else {
            return false;
        }
    };
    const inputWires = getFilteredIdList(containsInputPort, wireList);
    const outputWires = getFilteredIdList(containsOutputPort, wireList);
    const fullyConnected = getFilteredIdList(containsBothPort, wireList);
    return {
        Both: fullyConnected,
        Inputs: inputWires,
        Outputs: outputWires,
    };
}

/**
 * Returns a distance for a wire move that has been reduced if needed to enforce minimum first/last segment lengths.
 * These prevent the first non-zero segment perpendicular to the nubs
 * to be dragged closer than Constants.nubLength
 * TODO - this can maybe be simplified given we now coalesce segments
 */
export function getSafeDistanceForMove(segments, index, distance) {
    const findBindingSegments = (portIndex, segList) => takeWhile((seg) => {
        if ((seg.Index % 2) === (portIndex % 2)) {
            return true;
        }
        else {
            return seg.Length === 0;
        }
    }, segList);
    const findDistanceFromPort = (boundSegList) => fold((dist, seg_1) => (dist + seg_1.Length), 0, boundSegList);
    const reduceDistance = (bindingSegs, findBindingIndex, distance_1) => {
        if (findBindingIndex(bindingSegs) !== index) {
            return distance_1;
        }
        else {
            const dist_1 = findDistanceFromPort(bindingSegs);
            if (sign(dist_1) === -1) {
                return max(distance_1, dist_1 + Constants_nubLength);
            }
            else {
                return min(distance_1, dist_1 - Constants_nubLength);
            }
        }
    };
    const bindingInputSegs = map_1((seg_2) => (new BusWireT_Segment(seg_2.Index, -seg_2.Length, seg_2.WireId, seg_2.IntersectOrJumpList, seg_2.Draggable, seg_2.Mode)), findBindingSegments(0, segments));
    const bindingOutputSegs = findBindingSegments(length_2(segments) - 1, reverse(segments));
    const findInputBindingIndex = length_2;
    let findOutputBindingIndex;
    let f2;
    const x = (length_2(segments) - 1) | 0;
    f2 = ((y) => (x - y));
    findOutputBindingIndex = ((arg) => f2(findInputBindingIndex(arg)));
    return reduceDistance(bindingOutputSegs, findOutputBindingIndex, reduceDistance(bindingInputSegs, findInputBindingIndex, distance));
}

/**
 * Used when two segments can be coalesced by removing a zero segment separating
 * them
 */
export function removeZeroSegment(segs, indexToRemove) {
    let inputRecord;
    const index = indexToRemove | 0;
    const newLength = item(index + 1, segs).Length + item(index - 1, segs).Length;
    const source = removeManyAt(index, 2, segs);
    return updateAt(index - 1, (inputRecord = item(index - 1, segs), new BusWireT_Segment(inputRecord.Index, newLength, inputRecord.WireId, inputRecord.IntersectOrJumpList, inputRecord.Draggable, inputRecord.Mode)), source);
}

/**
 * After coalescing a wire the wire ends may no longer be draggable.
 * This function checks this and adds two segments to correct the problem
 * if necessary. The added segments will not alter wire appearance.
 * The transformation is:
 * BEFORE: 1st seg length x. AFTER: 1st segment length nubLength -> zero-length seg
 * -> segment length x - nubLength
 */
export function makeEndsDraggable(segments) {
    const addNubIfPossible = (segments_1) => {
        let this$;
        const seg0 = item(0, segments_1);
        if ((Math.abs(item(0, segments_1).Length) > (Constants_nubLength + 1E-07)) && ((length_2(segments_1) === 1) ? true : !((this$ = item(1, segments_1), Math.abs(this$.Length) < 1E-07)))) {
            const delta = sign(item(0, segments_1).Length) * Constants_nubLength;
            const newSeg0 = new BusWireT_Segment(seg0.Index, delta, seg0.WireId, seg0.IntersectOrJumpList, seg0.Draggable, seg0.Mode);
            const newSeg1 = new BusWireT_Segment(seg0.Index, 0, seg0.WireId, empty(), true, "auto");
            const newSeg2 = new BusWireT_Segment(newSeg1.Index, seg0.Length - delta, newSeg1.WireId, newSeg1.IntersectOrJumpList, newSeg1.Draggable, newSeg1.Mode);
            return ofArrayWithTail([newSeg0, newSeg1, newSeg2], getSlice(1, void 0, segments_1));
        }
        else {
            return segments_1;
        }
    };
    return mapIndexed((i, seg) => (new BusWireT_Segment(i, seg.Length, seg.WireId, seg.IntersectOrJumpList, seg.Draggable, seg.Mode)), reverse(addNubIfPossible(reverse(addNubIfPossible(segments)))));
}

/**
 * If as the result of a drag a zero length segment separates two other draggable segments
 * the wire should be simplified by removing the zero-length segment and joining together the
 * draggables.
 */
export function coalesceInWire(wId, model) {
    let segments$0027, l;
    const wire = FSharpMap__get_Item(model.Wires, wId);
    const segments = wire.Segments;
    const segmentsToRemove = sortDescending(map_1((tupledArg_1) => {
        const index = tupledArg_1[0] | 0;
        return index | 0;
    }, filter((tupledArg) => {
        let this$;
        const i = tupledArg[0] | 0;
        const seg = tupledArg[1];
        if (((((this$ = item(i, segments), Math.abs(this$.Length) < 1E-07)) && (i > 1)) && (i < (length_2(segments) - 2))) && item(i - 1, segments).Draggable) {
            return item(i + 1, segments).Draggable;
        }
        else {
            return false;
        }
    }, indexed(segments))), {
        Compare: comparePrimitives,
    });
    let newSegments;
    const opposite = (seg1, seg2) => {
        const matchValue = sign(seg1.Length) | 0;
        const matchValue_1 = sign(seg2.Length) | 0;
        let matchResult;
        switch (matchValue) {
            case -1: {
                if (matchValue_1 === 1) {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case 1: {
                if (matchValue_1 === -1) {
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
                return true;
            default:
                return false;
        }
    };
    newSegments = makeEndsDraggable((segments$0027 = fold(removeZeroSegment, segments, segmentsToRemove), (opposite(item(0, segments), item(0, segments$0027)) ? true : opposite(item(length_2(segments) - 1, segments), item(length_2(segments$0027) - 1, segments$0027))) ? segments : segments$0027));
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), (l = BusWireT_wireOf_(wId), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), BusWireT_segments_)(l)))(newSegments)(model);
}

/**
 * If wire contains one or more manally routed segments return Some wire'
 * where wire' has all manual segments chnaged to auto.
 * Return None if no chnage is required (the normal case).
 */
export function resetWireToAutoKeepingPositionOpt(wire) {
    let f_1, mapping;
    const hasManualSegs = exists((seg) => (seg.Mode === "manual"), wire.Segments);
    if (hasManualSegs) {
        return ((f_1 = ((mapping = Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), BusWireT_mode_)((_arg) => {
            if (_arg === "manual") {
                return "auto";
            }
            else {
                const m = _arg;
                return m;
            }
        }), (list_1) => map_1(mapping, list_1))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), BusWireT_segments_)(f_1)))(wire);
    }
    else {
        return void 0;
    }
}

/**
 * Returns a wwireOf_aining the updated list of segments after a segment is moved by
 * a specified distance. The moved segment is tagged as manual so that it is no longer auto-routed.
 * Throws an error if the index of the segment being moved is not a valid movable segment index.
 */
export function moveSegment(model, seg, distance) {
    const wire = FSharpMap__get_Item(model.Wires, seg.WireId);
    const segments = wire.Segments;
    const idx = seg.Index | 0;
    if ((idx <= 0) ? true : (idx >= (length_2(segments) - 1))) {
        toConsole(`Trying to move wire segment ${seg.Index}:${logSegmentId(seg)}, out of range in wire length ${length_2(segments)}`);
        return wire;
    }
    else {
        const safeDistance = getSafeDistanceForMove(segments, idx, distance);
        const prevSeg = item(idx - 1, segments);
        const nextSeg = item(idx + 1, segments);
        const movedSeg = item(idx, segments);
        const newPrevSeg = new BusWireT_Segment(prevSeg.Index, prevSeg.Length + safeDistance, prevSeg.WireId, prevSeg.IntersectOrJumpList, prevSeg.Draggable, prevSeg.Mode);
        const newNextSeg = new BusWireT_Segment(nextSeg.Index, nextSeg.Length - safeDistance, nextSeg.WireId, nextSeg.IntersectOrJumpList, nextSeg.Draggable, nextSeg.Mode);
        const newMovedSeg = new BusWireT_Segment(movedSeg.Index, movedSeg.Length, movedSeg.WireId, movedSeg.IntersectOrJumpList, movedSeg.Draggable, "manual");
        const newSegments = append(getSlice(void 0, idx - 2, segments), append(ofArray([newPrevSeg, newMovedSeg, newNextSeg]), getSlice(idx + 2, void 0, segments)));
        return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, newSegments, wire.StartPos, wire.InitialOrientation);
    }
}

export class PortInfo extends Record {
    constructor(Edge, Position) {
        super();
        this.Edge = Edge;
        this.Position = Position;
    }
}

export function PortInfo_$reflection() {
    return record_type("BusWireUpdateHelpers.PortInfo", [], PortInfo, () => [["Edge", Edge_$reflection()], ["Position", XYPos_$reflection()]]);
}

/**
 * Returns a function to rotate a segment list 90 degrees about the origin,
 * depending on its initial orientation
 */
export function rotateSegments90(initialOrientation) {
    const horizontal = (i) => {
        if (initialOrientation === "vertical") {
            return (i % 2) === 1;
        }
        else {
            return (i % 2) === 0;
        }
    };
    const rotateSegment = (tupledArg) => {
        const i_1 = tupledArg[0] | 0;
        const seg = tupledArg[1];
        if (horizontal(i_1)) {
            return new BusWireT_Segment(seg.Index, -seg.Length, seg.WireId, seg.IntersectOrJumpList, seg.Draggable, seg.Mode);
        }
        else {
            return seg;
        }
    };
    return (arg) => map_1(rotateSegment, indexed(arg));
}

/**
 * Returns a version of the start and destination ports rotated until the start edge matches the target edge.
 */
export function rotateStartDest(target_mut, _arg1__mut, _arg1__1_mut) {
    let port, newEdge, edge, newPos, port_1, newEdge_1, edge_2, newPos_1;
    rotateStartDest:
    while (true) {
        const target = target_mut, _arg1_ = _arg1__mut, _arg1__1 = _arg1__1_mut;
        const _arg = [_arg1_, _arg1__1];
        const start = _arg[0];
        const dest = _arg[1];
        if (equals(start.Edge, target)) {
            return [start, dest];
        }
        else {
            target_mut = target;
            _arg1__mut = ((port = start, (newEdge = ((edge = port.Edge, (edge.tag === 2) ? (new Edge(1, [])) : ((edge.tag === 1) ? (new Edge(3, [])) : ((edge.tag === 3) ? (new Edge(0, [])) : (new Edge(2, [])))))), (newPos = (new XYPos(port.Position.Y, -port.Position.X)), new PortInfo(newEdge, newPos)))));
            _arg1__1_mut = ((port_1 = dest, (newEdge_1 = ((edge_2 = port_1.Edge, (edge_2.tag === 2) ? (new Edge(1, [])) : ((edge_2.tag === 1) ? (new Edge(3, [])) : ((edge_2.tag === 3) ? (new Edge(0, [])) : (new Edge(2, [])))))), (newPos_1 = (new XYPos(port_1.Position.Y, -port_1.Position.X)), new PortInfo(newEdge_1, newPos_1)))));
            continue rotateStartDest;
        }
        break;
    }
}

/**
 * Returns an anonymous record containing the starting symbol edge of a wire and its segment list that has been
 * rotated to a target symbol edge.
 */
export function rotateSegments(target_mut, wire_mut) {
    let edge, edge_1;
    rotateSegments:
    while (true) {
        const target = target_mut, wire = wire_mut;
        if (equals(wire.edge, target)) {
            return {
                edge: wire.edge,
                segments: wire.segments,
            };
        }
        else {
            const rotatedSegs = rotateSegments90((edge = wire.edge, (edge.tag === 1) ? "vertical" : ((edge.tag === 2) ? "horizontal" : ((edge.tag === 3) ? "horizontal" : "vertical"))))(wire.segments);
            target_mut = target;
            wire_mut = {
                edge: (edge_1 = wire.edge, (edge_1.tag === 2) ? (new Edge(1, [])) : ((edge_1.tag === 1) ? (new Edge(3, [])) : ((edge_1.tag === 3) ? (new Edge(0, [])) : (new Edge(2, []))))),
                segments: rotatedSegs,
            };
            continue rotateSegments;
        }
        break;
    }
}

/**
 * Returns a newly autorouted version of a wire for the given model
 */
export function autoroute(model, wire) {
    let id, portId_1, id_1_1, id_1, id_2, portId_3, id_1_2, id_3, edge_2;
    let patternInput;
    const model_1 = model.Symbol;
    patternInput = [(id = ((portId_1 = (new SymbolT_PortId(0, [wire.InputPort])), (portId_1.tag === 1) ? ((id_1_1 = portId_1.fields[0], id_1_1)) : ((id_1 = portId_1.fields[0], id_1)))), getPortLocation(void 0, model_1, id)), (id_2 = ((portId_3 = (new SymbolT_PortId(1, [wire.OutputPort])), (portId_3.tag === 1) ? ((id_1_2 = portId_3.fields[0], id_1_2)) : ((id_3 = portId_3.fields[0], id_3)))), getPortLocation(void 0, model_1, id_2))];
    const startPos = patternInput[1];
    const destPos = patternInput[0];
    let destEdge;
    let portIdStr;
    const portId_6 = new SymbolT_PortId(0, [wire.InputPort]);
    if (portId_6.tag === 1) {
        const id_1_3 = portId_6.fields[0];
        portIdStr = id_1_3;
    }
    else {
        const id_4 = portId_6.fields[0];
        portIdStr = id_4;
    }
    const model_6 = model.Symbol;
    const portIdStr_1 = portIdStr;
    const port = FSharpMap__get_Item(model_6.Ports, portIdStr_1);
    const sId = port.HostId;
    destEdge = FSharpMap__get_Item(FSharpMap__get_Item(model_6.Symbols, sId).PortMaps.Orientation, portIdStr_1);
    let startEdge;
    let portIdStr_2;
    const portId_9 = new SymbolT_PortId(1, [wire.OutputPort]);
    if (portId_9.tag === 1) {
        const id_1_4 = portId_9.fields[0];
        portIdStr_2 = id_1_4;
    }
    else {
        const id_5 = portId_9.fields[0];
        portIdStr_2 = id_5;
    }
    const model_9 = model.Symbol;
    const portIdStr_3 = portIdStr_2;
    const port_1 = FSharpMap__get_Item(model_9.Ports, portIdStr_3);
    const sId_1 = port_1.HostId;
    startEdge = FSharpMap__get_Item(FSharpMap__get_Item(model_9.Symbols, sId_1).PortMaps.Orientation, portIdStr_3);
    const startPort = new PortInfo(startEdge, startPos);
    const destPort = new PortInfo(destEdge, destPos);
    const patternInput_1 = rotateStartDest(new Edge(3, []), startPort, destPort);
    const normStart = patternInput_1[0];
    const normEnd = patternInput_1[1];
    const initialSegments = makeInitialSegmentsList(wire.WId, normStart.Position, normEnd.Position, normEnd.Edge);
    const segments = rotateSegments(startEdge, {
        edge: new Edge(3, []),
        segments: initialSegments,
    }).segments;
    return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, segments, startPos, (edge_2 = startEdge, (edge_2.tag === 1) ? "vertical" : ((edge_2.tag === 2) ? "horizontal" : ((edge_2.tag === 3) ? "horizontal" : "vertical"))));
}

/**
 * Returns an anonymous record indicating the position of pos relative to origin.
 * The isAbove field indicates whether pos is above (true) or below (false) origin.
 * The isLeft field indicates whether pos is to the left (true) or to the right (false) of origin.
 */
export function relativePosition(origin, pos) {
    return {
        isAbove: origin.Y > pos.Y,
        isLeft: origin.X > pos.X,
    };
}

/**
 * Returns the tuple (startPos, endPos) of the segment at the target index in the given wire.
 * Throws an error if the target index isn't found.
 */
export function getAbsoluteSegmentPos(wire, target) {
    let _arg_2;
    const wire_2 = wire;
    const initPos = wire_2.StartPos;
    const initOrientation = wire_2.InitialOrientation;
    const state_2_1 = fold((tupledArg, seg_1) => {
        const currState = tupledArg[0];
        const currPos = tupledArg[1];
        const currOrientation = tupledArg[2];
        let nextPos;
        const position = currPos;
        const length = seg_1.Length;
        nextPos = ((currOrientation === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)));
        const nextOrientation = (currOrientation === "vertical") ? "horizontal" : "vertical";
        const nextState = (seg_1.Index === target) ? [currPos, nextPos] : currState;
        return [nextState, nextPos, nextOrientation];
    }, [void 0, initPos, initOrientation], wire_2.Segments)[0];
    _arg_2 = state_2_1;
    if (_arg_2 != null) {
        const pos = _arg_2;
        return pos;
    }
    else {
        return toFail(`Couldn't find index ${target} in wire`);
    }
}

/**
 * Returns the length to change a segment represented by startPos -> endPos
 * in the appropriate dimension of the difference vector.
 */
export function getLengthDiff(difference, startPos, endPos) {
    let matchValue;
    const segStart = startPos;
    const segEnd = endPos;
    matchValue = ((Math.abs(segStart.X - segEnd.X) < 1E-07) ? "vertical" : ((Math.abs(segStart.Y - segEnd.Y) < 1E-07) ? "horizontal" : toFail(printf("ERROR: Diagonal wire"))));
    if (matchValue === "vertical") {
        return difference.Y;
    }
    else {
        return difference.X;
    }
}

/**
 * Given a segment list, returns the first manual segment index
 */
export function getManualIndex(segList) {
    return bind((index) => {
        if ((index < 1) ? true : (index >= (length_2(segList) - 1))) {
            return void 0;
        }
        else {
            return index;
        }
    }, map_2((seg_1) => seg_1.Index, tryFind((seg) => (seg.Mode === "manual"), segList)));
}

/**
 * Gets the start position for partial routing.
 */
export function getPartialRouteStart(wire, manualIndex) {
    return defaultArg(map_2((arg) => getAbsoluteSegmentPos(wire, arg)[0], map_2((seg_1) => seg_1.Index, tryFind((seg) => (seg.Index === (manualIndex - 1)), wire.Segments))), wire.StartPos);
}

/**
 * Partitions a segment list into sections 3 sections for partial autorouting
 */
export function partitionSegments(segs, manualIdx) {
    const patternInput = (manualIdx === 1) ? [empty(), segs] : splitAt(manualIdx - 1, segs);
    const tmp = patternInput[1];
    const start = patternInput[0];
    const patternInput_1 = splitAt(2, tmp);
    const remaining = patternInput_1[1];
    const changed = patternInput_1[0];
    if (length_2(append(start, append(changed, remaining))) !== length_2(segs)) {
        toConsole(`Bad partial routing partition: index=${manualIdx}:${length_2(start)},${length_2(changed)},${length_2(remaining)} (${length_2(segs)})`);
    }
    return [start, changed, remaining];
}

/**
 * Returns None if full autoroute is required or applies partial autorouting
 * from the start of the wire at newPortPos to the first manually routed segment
 * and returns Some wire with the new segments.
 */
export function partialAutoroute(model, wire, newPortPos, reversed) {
    const segs = wire.Segments;
    const newWire = new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, wire.Segments, newPortPos, wire.InitialOrientation);
    const eligibleForPartialRouting = (manualIdx) => {
        let wire_1, matchValue_1, left, right;
        const oldStartPos = getPartialRouteStart(wire, manualIdx);
        const newStartPos = getPartialRouteStart(newWire, manualIdx);
        const fixedPoint = getAbsoluteSegmentPos(wire, manualIdx)[1];
        const relativeToFixed = (pos) => relativePosition(fixedPoint, pos);
        const portId = reversed ? (new SymbolT_PortId(0, [wire.InputPort])) : (new SymbolT_PortId(1, [wire.OutputPort]));
        let portOrientation;
        let portIdStr;
        const portId_2 = portId;
        if (portId_2.tag === 1) {
            const id_1 = portId_2.fields[0];
            portIdStr = id_1;
        }
        else {
            const id = portId_2.fields[0];
            portIdStr = id;
        }
        const model_2 = model.Symbol;
        const portIdStr_1 = portIdStr;
        const port = FSharpMap__get_Item(model_2.Ports, portIdStr_1);
        const sId = port.HostId;
        portOrientation = FSharpMap__get_Item(FSharpMap__get_Item(model_2.Symbols, sId).PortMaps.Orientation, portIdStr_1);
        if (equals((wire_1 = wire, (matchValue_1 = (item(0, wire_1.Segments).Length > 0), (wire_1.InitialOrientation === "vertical") ? (matchValue_1 ? (new Edge(1, [])) : (new Edge(0, []))) : (matchValue_1 ? (new Edge(3, [])) : (new Edge(2, []))))), portOrientation) && equals(relativeToFixed(newStartPos), relativeToFixed(oldStartPos))) {
            return [manualIdx, (left = newStartPos, (right = oldStartPos, new XYPos(left.X - right.X, left.Y - right.Y))), portOrientation];
        }
        else {
            return void 0;
        }
    };
    const updateSegments = (tupledArg) => {
        let wire_2, matchValue_1_1;
        const manualIdx_1 = tupledArg[0] | 0;
        const diff = tupledArg[1];
        const portOrientation_1 = tupledArg[2];
        const segsRetracePath = (segs_1) => exists((i) => {
            let this$, this$_1, this$_2;
            if ((((this$ = item(i, segs_1), Math.abs(this$.Length) < 1E-07)) && (sign(item(i - 1, segs_1).Length) !== sign(item(i + 1, segs_1).Length))) && !((this$_1 = item(i - 1, segs_1), Math.abs(this$_1.Length) < 1E-07))) {
                return !((this$_2 = item(i + 1, segs_1), Math.abs(this$_2.Length) < 1E-07));
            }
            else {
                return false;
            }
        }, toList_1(rangeDouble(1, 1, length_2(segs_1) - 2)));
        const patternInput = partitionSegments(segs, manualIdx_1);
        const start = patternInput[0];
        const remaining = patternInput[2];
        const changed = patternInput[1];
        const changed$0027 = map_1((seg) => {
            const patternInput_1 = getAbsoluteSegmentPos(wire, seg.Index);
            const startPos = patternInput_1[0];
            const endPos = patternInput_1[1];
            return new BusWireT_Segment(seg.Index, seg.Length - getLengthDiff(diff, startPos, endPos), seg.WireId, seg.IntersectOrJumpList, seg.Draggable, seg.Mode);
        }, changed);
        const wire$0027 = new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, append(start, append(changed$0027, remaining)), newPortPos, wire.InitialOrientation);
        if (equals((wire_2 = wire$0027, (matchValue_1_1 = (item(0, wire_2.Segments).Length > 0), (wire_2.InitialOrientation === "vertical") ? (matchValue_1_1 ? (new Edge(1, [])) : (new Edge(0, []))) : (matchValue_1_1 ? (new Edge(3, [])) : (new Edge(2, []))))), portOrientation_1)) {
            return wire$0027;
        }
        else {
            return void 0;
        }
    };
    return map_2((wire_3) => (new BusWireT_Wire(wire_3.WId, wire_3.InputPort, wire_3.OutputPort, wire_3.Color, wire_3.Width, makeEndsDraggable(wire_3.Segments), wire_3.StartPos, wire_3.InitialOrientation)), bind(updateSegments, bind(eligibleForPartialRouting, getManualIndex(segs))));
}

/**
 * Reverses a wire so that it may be processed in the opposite direction. This function is self-inverse.
 */
export function reverseWire(wire) {
    let this$, wire_2, initPos, initOrientation, state_2, this$_1, matchValue;
    const newSegs = map_1((tupledArg) => {
        const i = tupledArg[0] | 0;
        const seg = tupledArg[1];
        return new BusWireT_Segment(i, -seg.Length, seg.WireId, seg.IntersectOrJumpList, seg.Draggable, seg.Mode);
    }, indexed(reverse(wire.Segments)));
    return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, newSegs, (this$ = wire, (wire_2 = this$, (initPos = wire_2.StartPos, (initOrientation = wire_2.InitialOrientation, (state_2 = fold((tupledArg_1, seg_1) => {
        const currState = tupledArg_1[0];
        const currPos = tupledArg_1[1];
        const currOrientation = tupledArg_1[2];
        let nextPos;
        const position = currPos;
        const length = seg_1.Length;
        nextPos = ((currOrientation === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)));
        const nextOrientation = (currOrientation === "vertical") ? "horizontal" : "vertical";
        const nextState = nextPos;
        return [nextState, nextPos, nextOrientation];
    }, [this$.StartPos, initPos, initOrientation], wire_2.Segments)[0], state_2))))), (this$_1 = wire, (matchValue = ((length_2(this$_1.Segments) % 2) | 0), (matchValue === 1) ? this$_1.InitialOrientation : ((this$_1.InitialOrientation === "horizontal") ? "vertical" : "horizontal"))));
}

/**
 * Returns an updated wireMap with the IntersectOrJumpList of targetSeg
 * replaced by jumps or modern intersections.
 */
export function updateSegmentJumpsOrIntersections(targetSeg, intersectOrJump, wireMap) {
    let inputRecord;
    const wId = targetSeg.WireId;
    const target = targetSeg.Index | 0;
    const changeSegment = (segs) => updateAt(target, new BusWireT_Segment(targetSeg.Index, targetSeg.Length, targetSeg.WireId, intersectOrJump, targetSeg.Draggable, targetSeg.Mode), segs);
    return add(wId, (inputRecord = FSharpMap__get_Item(wireMap, wId), new BusWireT_Wire(inputRecord.WId, inputRecord.InputPort, inputRecord.OutputPort, inputRecord.Color, inputRecord.Width, changeSegment(FSharpMap__get_Item(wireMap, wId).Segments), inputRecord.StartPos, inputRecord.InitialOrientation)), wireMap);
}

export class SegInfo extends Record {
    constructor(P, Qmin, Qmax, Index, OfWire) {
        super();
        this.P = P;
        this.Qmin = Qmin;
        this.Qmax = Qmax;
        this.Index = (Index | 0);
        this.OfWire = OfWire;
    }
}

export function SegInfo_$reflection() {
    return record_type("BusWireUpdateHelpers.SegInfo", [], SegInfo, () => [["P", float64_type], ["Qmin", float64_type], ["Qmax", float64_type], ["Index", int32_type], ["OfWire", BusWireT_Wire_$reflection()]]);
}

/**
 * get segments on wire partitioned horizontal and vertical.
 * small length segments are not included, since this is to determine modern circle placement
 */
export function getHVSegs(wire) {
    const isHorizontal = (seg) => {
        const index = seg.Segment.Index | 0;
        if (wire.InitialOrientation === "vertical") {
            return (index % 2) === 1;
        }
        else {
            return (index % 2) === 0;
        }
    };
    const makeInfo = (p, q1, q2, i, seg_1) => {
        const qMin = min(q1, q2);
        const qMax = max(q1, q2);
        return new SegInfo(p, qMin, qMax, seg_1.Segment.Index, wire);
    };
    const tupledArg = partition(isHorizontal, filter((seg_2) => (Math.abs(seg_2.Segment.Length) > Constants_modernCirclePositionTolerance), getAbsSegments(wire)));
    const hSegs = tupledArg[0];
    const vSegs = tupledArg[1];
    const hInfo = map_1((seg_3) => makeInfo(seg_3.Start.Y, seg_3.Start.X, seg_3.End.X, seg_3.Segment.Index, seg_3), hSegs);
    const vInfo = map_1((seg_4) => makeInfo(seg_4.Start.X, seg_4.Start.Y, seg_4.End.Y, seg_4.Segment.Index, seg_4), vSegs);
    return [hInfo, vInfo];
}

export function resetWireJumpsOrIntersections(wire) {
    const newSegments = map_1((seg) => (new BusWireT_Segment(seg.Index, seg.Length, seg.WireId, empty(), seg.Draggable, seg.Mode)), wire.Segments);
    return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, newSegments, wire.StartPos, wire.InitialOrientation);
}

export function resetModelJumpsOrIntersections(model) {
    const newWires = map_3((_arg, w) => resetWireJumpsOrIntersections(w), model.Wires);
    return new BusWireT_Model(model.Symbol, newWires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
}

export function updateCirclesOnSegments(wiresToUpdate, circles, model) {
    return new BusWireT_Model(model.Symbol, fold((wires, wire) => {
        const wire_1 = FSharpMap__get_Item(wires, wire.WId);
        const findAllCirclesOnWire = (circles_1) => filter((_arg) => {
            const wire$0027 = _arg[2];
            return equals(wire$0027.WId, wire_1.WId);
        }, circles_1);
        const newWire = fold((wire_2, tupledArg) => {
            const cPos = tupledArg[0];
            const cIndex = tupledArg[1] | 0;
            const seg = item(cIndex, wire_2.Segments);
            const seg$0027 = new BusWireT_Segment(seg.Index, seg.Length, seg.WireId, cons(cPos, seg.IntersectOrJumpList), seg.Draggable, seg.Mode);
            return new BusWireT_Wire(wire_2.WId, wire_2.InputPort, wire_2.OutputPort, wire_2.Color, wire_2.Width, updateAt(cIndex, seg$0027, wire_2.Segments), wire_2.StartPos, wire_2.InitialOrientation);
        }, wire_1, findAllCirclesOnWire(circles));
        return add(wire_1.WId, newWire, wires);
    }, model.Wires, wiresToUpdate), model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
}

/**
 * Update all the modern routing circles on the net of wires: wiresInNet
 */
export function updateCirclesOnNet(model, wiresInNet) {
    let patternInput;
    const tupledArg = unzip(map_1(getHVSegs, wiresInNet));
    const a = tupledArg[0];
    const b = tupledArg[1];
    patternInput = [concat(a), concat(b)];
    const vsL = patternInput[1];
    const hsL = patternInput[0];
    const e = Constants_modernCirclePositionTolerance;
    const getIntersection = (tupledArg_1) => {
        let x, e_1, x_1, e_2, x_2, e_3, x_3, e_4;
        const h = tupledArg_1[0];
        const v = tupledArg_1[1];
        if ((((x = h.P, (e_1 = Constants_intervalTolerance, ((v.Qmin + e_1) < x) && (x < (v.Qmax - e_1))))) && ((x_1 = v.P, (e_2 = Constants_intervalTolerance, ((h.Qmin - e_2) < x_1) && (x_1 < (h.Qmax + e_2)))))) ? true : (((x_2 = h.P, (e_3 = Constants_intervalTolerance, ((v.Qmin - e_3) < x_2) && (x_2 < (v.Qmax + e_3))))) && ((x_3 = v.P, (e_4 = Constants_intervalTolerance, ((h.Qmin + e_4) < x_3) && (x_3 < (h.Qmax - e_4))))))) {
            return singleton([v.P, h.Index, h.OfWire]);
        }
        else {
            return empty();
        }
    };
    const getJoins = (segs) => collect((tupledArg_2) => {
        const s1 = tupledArg_2[0];
        const s2 = tupledArg_2[1];
        if ((Math.abs(s1.P - s2.P) < Constants_modernCirclePositionTolerance) && (Math.abs(s1.Qmax - s2.Qmin) < Constants_modernCirclePositionTolerance)) {
            return singleton({
                Index: s2.Index,
                P: (s1.P + s2.P) / 2,
                Q: (s1.Qmax + s2.Qmin) / 2,
                Wire: s2.OfWire,
            });
        }
        else {
            return empty();
        }
    }, allPairs(segs, segs));
    const intersectCircles = collect(getIntersection, allPairs(hsL, vsL));
    const hJoinCircles = collect((join) => {
        if (exists((vs) => ((Math.abs(vs.P - join.Q) < Constants_modernCirclePositionTolerance) && ((Math.abs(vs.Qmin - join.P) < Constants_modernCirclePositionTolerance) ? true : (Math.abs(vs.Qmax - join.P) < Constants_modernCirclePositionTolerance))), vsL)) {
            return singleton([join.Q, join.Index, join.Wire]);
        }
        else {
            return empty();
        }
    }, getJoins(hsL));
    const vJoinCircles = collect((join_1) => defaultArg(tryPick((hs) => {
        if ((Math.abs(hs.P - join_1.Q) < Constants_modernCirclePositionTolerance) && ((Math.abs(hs.Qmin - join_1.P) < Constants_modernCirclePositionTolerance) ? true : (Math.abs(hs.Qmax - join_1.P) < Constants_modernCirclePositionTolerance))) {
            return singleton([join_1.P, hs.Index, hs.OfWire]);
        }
        else {
            return void 0;
        }
    }, hsL), empty()), getJoins(vsL));
    const circles = append(intersectCircles, append(vJoinCircles, hJoinCircles));
    return updateCirclesOnSegments(wiresInNet, circles, model);
}

/**
 * Update all the modern routing circles in the model
 */
export function updateCirclesOnAllNets(model) {
    const cleanModel = resetModelJumpsOrIntersections(model);
    const nets = map_1((list_1) => map_1((tuple_1) => tuple_1[1], list_1), map_1((tuple) => tuple[1], partitionWiresIntoNets(cleanModel)));
    return fold(updateCirclesOnNet, cleanModel, nets);
}

/**
 * Returns a model with all the jumps updated
 */
export function makeAllJumps(wiresWithNoJumps, model) {
    const wires = map_4((tuple) => tuple[1], toArray(model.Wires));
    const updateJumpsInWire = (segStart, segEnd, wireMap, seg) => {
        let segStart_1, segEnd_1;
        if (((segStart_1 = segStart, (segEnd_1 = segEnd, (Math.abs(segStart_1.X - segEnd_1.X) < 1E-07) ? "vertical" : ((Math.abs(segStart_1.Y - segEnd_1.Y) < 1E-07) ? "horizontal" : toFail(printf("ERROR: Diagonal wire")))))) === "horizontal") {
            const jumpsOrIntersections_1 = fold_1((jumpsOrIntersections, wire) => {
                let wire_1, initPos, initOrientation, state_2_1;
                if (equals(model.Type, new BusWireT_WireType(2, []))) {
                    return append(jumpsOrIntersections, ((wire_1 = wire, (initPos = wire_1.StartPos, (initOrientation = wire_1.InitialOrientation, (state_2_1 = fold((tupledArg, seg_3) => {
                        let segStart_4, segEnd_4;
                        const currState = tupledArg[0];
                        const currPos = tupledArg[1];
                        const currOrientation = tupledArg[2];
                        let nextPos;
                        const position = currPos;
                        const length = seg_3.Length;
                        nextPos = ((currOrientation === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)));
                        const nextOrientation = (currOrientation === "vertical") ? "horizontal" : "vertical";
                        let nextState;
                        const segStart_3 = currPos;
                        const segEnd_3 = nextPos;
                        const state_1 = currState;
                        if (((segStart_4 = segStart_3, (segEnd_4 = segEnd_3, (Math.abs(segStart_4.X - segEnd_4.X) < 1E-07) ? "vertical" : ((Math.abs(segStart_4.Y - segEnd_4.Y) < 1E-07) ? "horizontal" : toFail(printf("ERROR: Diagonal wire")))))) === "vertical") {
                            const xVStart = segStart_3.X;
                            const xHStart = state_1.Start.X;
                            const xHEnd = state_1.End.X;
                            const yVStart = segStart_3.Y;
                            const yVEnd = segEnd_3.Y;
                            const yHEnd = state_1.End.Y;
                            const matchValue_6 = max(xHStart, xHEnd);
                            const xlo = min(xHStart, xHEnd);
                            const xhi = matchValue_6;
                            const matchValue_8 = max(yVStart, yVEnd);
                            const ylo = min(yVStart, yVEnd);
                            const yhi = matchValue_8;
                            nextState = (((((xVStart < xhi) && (xVStart > xlo)) && (yHEnd < yhi)) && (yHEnd > ylo)) ? {
                                End: state_1.End,
                                JumpsOrIntersections: cons(Math.abs(xVStart - xHStart), state_1.JumpsOrIntersections),
                                Start: state_1.Start,
                            } : state_1);
                        }
                        else {
                            nextState = state_1;
                        }
                        return [nextState, nextPos, nextOrientation];
                    }, [{
                        End: segEnd,
                        JumpsOrIntersections: empty(),
                        Start: segStart,
                    }, initPos, initOrientation], wire_1.Segments)[0], state_2_1))))).JumpsOrIntersections);
                }
                else {
                    return jumpsOrIntersections;
                }
            }, empty(), wires);
            if (!equals(jumpsOrIntersections_1, seg.IntersectOrJumpList)) {
                return updateSegmentJumpsOrIntersections(seg, jumpsOrIntersections_1, wireMap);
            }
            else {
                return wireMap;
            }
        }
        else {
            return wireMap;
        }
    };
    const matchValue_10 = model.Type;
    switch (matchValue_10.tag) {
        case 1: {
            toConsole(printf("Updating modern circles"));
            return updateCirclesOnAllNets(model);
        }
        case 0:
            return model;
        default: {
            const wiresWithJumps = fold_1((map, wire_2) => {
                const wire_3 = wire_2;
                const initPos_1 = wire_3.StartPos;
                const initOrientation_1 = wire_3.InitialOrientation;
                const state_2_2 = fold((tupledArg_2, seg_4) => {
                    const currState_1 = tupledArg_2[0];
                    const currPos_1 = tupledArg_2[1];
                    const currOrientation_1 = tupledArg_2[2];
                    let nextPos_1;
                    const position_1 = currPos_1;
                    const length_1 = seg_4.Length;
                    nextPos_1 = ((currOrientation_1 === "vertical") ? (new XYPos(position_1.X, position_1.Y + length_1)) : (new XYPos(position_1.X + length_1, position_1.Y)));
                    const nextOrientation_1 = (currOrientation_1 === "vertical") ? "horizontal" : "vertical";
                    const nextState_1 = updateJumpsInWire(currPos_1, nextPos_1, currState_1, seg_4);
                    return [nextState_1, nextPos_1, nextOrientation_1];
                }, [map, initPos_1, initOrientation_1], wire_3.Segments)[0];
                return state_2_2;
            }, model.Wires, wires);
            return new BusWireT_Model(model.Symbol, wiresWithJumps, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
        }
    }
}

export function updateWireSegmentJumps(wireList, model) {
    const startT = getTimeMs();
    const model_1 = makeAllJumps(empty(), model);
    instrumentTime("UpdateJumps", startT);
    return model_1;
}

export function resetJumpsOrIntersections(wire) {
    const newSegs = map_1((seg) => (new BusWireT_Segment(seg.Index, seg.Length, seg.WireId, empty(), seg.Draggable, seg.Mode)), wire.Segments);
    return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, newSegs, wire.StartPos, wire.InitialOrientation);
}

export function resetJumps(model) {
    toConsole(printf("Reseting jumps or intersections..."));
    return new BusWireT_Model(model.Symbol, fold_2((wires, wid, wire) => add(wid, resetJumpsOrIntersections(wire), wires), model.Wires, model.Wires), model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
}

/**
 * This function updates the wire model by removing from the stored lists of intersections
 * all those generated by wireList wires.
 * intersetcions are stored in maps on the model and on the horizontal segments containing the jumps
 */
export function resetWireSegmentJumps(wireList, model) {
    const startT = getTimeMs();
    return instrumentInterval("ResetJumps", startT, resetJumps(model));
}

export function deleteWiresWithPort(delPorts, model) {
    if (isEmpty(delPorts)) {
        return model;
    }
    else {
        const wires = toList(model.Wires);
        const patternInput = fold((tupledArg, p) => {
            const ports = tupledArg[0];
            const symbols = tupledArg[1];
            const conns = tupledArg[2];
            if (p == null) {
                return [ports, symbols, conns];
            }
            else {
                const port = p;
                const localConns = map_1((tuple) => tuple[0], filter((tupledArg_1) => {
                    const connId = tupledArg_1[0];
                    const wire = tupledArg_1[1];
                    if (toString(wire.InputPort) === port.Id) {
                        return true;
                    }
                    else {
                        return toString(wire.OutputPort) === port.Id;
                    }
                }, wires));
                const symbols_1 = defaultArg(map_2((sym) => {
                    const sym$0027 = new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, deletePortFromMaps(port.HostId, sym.PortMaps), sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
                    return add(port.HostId, sym$0027, symbols);
                }, tryFind_1(port.HostId, symbols)), symbols);
                const ports_1 = remove(port.Id, ports);
                return [ports_1, symbols_1, append(conns, localConns)];
            }
        }, [model.Symbol.Ports, model.Symbol.Symbols, empty()], delPorts);
        const symbols_2 = patternInput[1];
        const ports_2 = patternInput[0];
        const connIds = patternInput[2];
        return Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), BusWireT_wires_)((wires_1) => {
            toConsole(`${FSharpMap__get_Count(wires_1)} wires before deletion`);
            const wires_3 = fold((wires_2, connId_1) => remove(connId_1, wires_2), wires_1, connIds);
            toConsole(`${FSharpMap__get_Count(wires_3)} wires after deletion`);
            return wires_3;
        })(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_ports_)(BusWireT_symbol_))(ports_2)(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_symbols_)(BusWireT_symbol_))(symbols_2)(model)));
    }
}

//# sourceMappingURL=BusWireUpdateHelpers.fs.js.map
