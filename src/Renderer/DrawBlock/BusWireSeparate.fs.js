import { ofList, keys, values, add, ofArray as ofArray_1, toList as toList_1, fold as fold_1, FSharpMap__get_Item } from "../fable_modules/fable-library.4.1.4/Map.js";
import { Constants_maxCornerSize, WireCorner, Constants_extensionTolerance, Extension, LineInfo, Constants_overlapTolerance, tryFindIndexInArray, moveLine, LocSearchDir, LineId__get_Index, hasOverlap, Constants_maxSegmentSeparation, Cluster, Constants_minWireLengthToSeparate, boundUnion, Constants_separateCaptureOverlap, hasNearOverlap, Constants_smallOffset, Line, Bound as Bound_2 } from "./BusWireRoutingHelpers.fs.js";
import { concat, getSlice, updateAt, removeManyAt, tryPick, exists, iterateIndexed, head, isEmpty, iterate, filter, sortDescending, min, singleton, max, item, contains, mapIndexed, fold, length as length_1, collect, cons, append, toArray, ofArray, map, empty } from "../fable_modules/fable-library.4.1.4/List.js";
import { compareArrays, compare, numberHash, sign, comparePrimitives, curry3, uncurry2, safeHash, disposeSafe, getEnumerator, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { filter as filter_1, iterate as iterate_1, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { List_distinct, List_except, List_groupBy } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { BoundingBox, XYPos } from "../Common/CommonTypes.fs.js";
import { Constants_modernCirclePositionTolerance } from "./BusWire.fs.js";
import { getFilteredAbsSegments } from "./BlockHelpers.fs.js";
import { toArray as toArray_1, map as map_1, value as value_3, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { BusWireT_wireOf_, BusWireT_Model, BusWireT_Wire, BusWireT_Segment, BusWireT_wires_, SymbolT_Annotation } from "../Model/DrawModelType.fs.js";
import { append as append_1, collect as collect_1, tryFindIndex, initialize, findIndex, sortBy, mapIndexed as mapIndexed_1 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { toConsole, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { op_UnaryNegation_Int32 } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { getConnectedWires, resetWireToAutoKeepingPositionOpt, filterWiresByCompMoved, updateWireSegmentJumps, getAbsoluteSegmentPos } from "./BusWireUpdateHelpers.fs.js";
import { max as max_1, min as min_1 } from "../fable_modules/fable-library.4.1.4/Double.js";
import { smartAutoroute, updateWire } from "./BusWireRoute.fs.js";

/**
 * return wire and segment index of line, if line a segment, otehrwise return None.
 */
export function lineToWire(model, line) {
    const matchValue = line.Seg1;
    if (matchValue == null) {
        return void 0;
    }
    else {
        const seg = matchValue;
        let patternInput;
        const this$ = seg.Segment;
        patternInput = [this$.Index, this$.WireId];
        const wid = patternInput[1];
        const int = patternInput[0] | 0;
        const wire = FSharpMap__get_Item(model.Wires, wid);
        return [wire, int];
    }
}

/**
 * Convert a segment into a fixed or movable line (of given orientation).
 * seg: ASegment of given segment to convert.
 * wire: wire of given segment to convert.
 * ori: orientation of segment (for reasons of efficiecny - it could be calculated from seg).
 * lType: type of line generated.
 */
export function segmentToLine(lType, ori, wire, seg) {
    const order = (a, b) => {
        if (a < b) {
            return new Bound_2(a, b);
        }
        else {
            return new Bound_2(b, a);
        }
    };
    const line = new Line(seg.Start.Y, order(seg.Start.X, seg.End.X), ori, seg, lType, empty(), wire.WId, wire.OutputPort, 0);
    if (ori === "vertical") {
        return new Line(seg.Start.X, order(seg.Start.Y, seg.End.Y), line.Orientation, line.Seg1, line.LType, line.SameNetLink, line.Wid, line.PortId, line.Lid);
    }
    else {
        return line;
    }
}

/**
 * Convert a symbol BoundingBox into two fixed lines (of given orientation).
 * The lines correspond to the two box edges of the specified orientation.
 */
export function bBoxToLines(ori, box) {
    const tl = box.TopLeft;
    return map((tupledArg) => {
        const p = tupledArg[0];
        const minB = tupledArg[1];
        const maxB = tupledArg[2];
        return new Line(p, new Bound_2(minB + Constants_smallOffset, maxB - Constants_smallOffset), ori, void 0, "bARRIER", empty(), "", "", 0);
    }, (ori === "vertical") ? ofArray([[tl.X, tl.Y, tl.Y + box.H], [tl.X + box.W, tl.Y, tl.Y + box.H]]) : ofArray([[tl.Y, tl.X, tl.X + box.W], [tl.Y + box.H, tl.X, tl.X + box.W]]));
}

/**
 * Where two segments in lines are on the same Net and on top of each other we must NEVER separate them.
 * This function links such segments, and marks all except the head one as a LINKEDSEG
 * so that the clustering algorithm will ignore them.
 * sameNetCapture specified how close segments muts be to be linked.
 */
export function linkSameNetLines(sameNetCapture, lines) {
    const overlaps = (b, b_1) => hasNearOverlap(Constants_separateCaptureOverlap, b, b_1);
    const linkSameNetGroup = (lines_1) => {
        const lines_2 = toArray(lines_1);
        const hasLinkedOverlap = (la, lb) => overlaps(la.B, lb.B);
        const tryToLink = (a, b_2) => {
            let a_1, b_3;
            const matchValue = lines_2[a];
            const lb_1 = lines_2[b_2];
            const la_1 = matchValue;
            if (((((((((la_1.LType === "nORMSEG") ? true : (la_1.LType === "fIXEDMANUALSEG")) ? true : (la_1.LType === "fIXEDSEG")) && (lb_1.LType !== "fIXEDMANUALSEG")) && (lb_1.LType !== "fIXEDSEG")) && (lb_1.LType !== "lINKEDSEG")) && !equals(la_1.Wid, lb_1.Wid)) && ((a_1 = la_1.P, (b_3 = lb_1.P, Math.abs(a_1 - b_3) < sameNetCapture)))) && hasLinkedOverlap(la_1, lb_1)) {
                lines_2[b_2].LType = "lINKEDSEG";
                lines_2[a].B = boundUnion(la_1.B, lb_1.B);
                lines_2[a].SameNetLink = append(cons(lines_2[b_2], lines_2[b_2].SameNetLink), lines_2[a].SameNetLink);
                lines_2[b_2].SameNetLink = empty();
            }
        };
        const enumerator = getEnumerator(toList(rangeDouble(0, 1, lines_2.length - 1)));
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                const a_2 = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]() | 0;
                const enumerator_1 = getEnumerator(toList(rangeDouble(0, 1, lines_2.length - 1)));
                try {
                    while (enumerator_1["System.Collections.IEnumerator.MoveNext"]()) {
                        const b_4 = enumerator_1["System.Collections.Generic.IEnumerator`1.get_Current"]() | 0;
                        tryToLink(a_2, b_4);
                    }
                }
                finally {
                    disposeSafe(enumerator_1);
                }
            }
        }
        finally {
            disposeSafe(enumerator);
        }
        return ofArray(lines_2);
    };
    return collect((tupledArg) => {
        const port = tupledArg[0];
        const lines_3 = tupledArg[1];
        return linkSameNetGroup(lines_3);
    }, List_groupBy((line) => line.PortId, lines, {
        Equals: equals,
        GetHashCode: safeHash,
    }));
}

/**
 * Make all lines, fixed and movable, of given orientation from wires and symbols in Model
 * ori - orientation of Lines (P coord is reverse of this)
 */
export function makeLines(wiresToRoute, ori, model) {
    const selectSegments = (wire, orient, seg) => {
        const numSegs = length_1(wire.Segments) | 0;
        let wireLength;
        let vec;
        const left = wire.StartPos;
        let right;
        const this$ = wire;
        const wire_2 = this$;
        const initPos = wire_2.StartPos;
        const initOrientation = wire_2.InitialOrientation;
        const state_2 = fold((tupledArg, seg_1) => {
            const currState = tupledArg[0];
            const currPos = tupledArg[1];
            const currOrientation = tupledArg[2];
            let nextPos;
            const position = currPos;
            const length = seg_1.Length;
            nextPos = ((currOrientation === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)));
            const nextOrientation = (currOrientation === "vertical") ? "horizontal" : "vertical";
            const nextState = nextPos;
            return [nextState, nextPos, nextOrientation];
        }, [this$.StartPos, initPos, initOrientation], wire_2.Segments)[0];
        right = state_2;
        vec = (new XYPos(left.X - right.X, left.Y - right.Y));
        wireLength = Math.sqrt(Math.pow(vec.X, 2) + Math.pow(vec.Y, 2));
        if ((((ori === orient) && (seg.Index !== 0)) && (seg.Index !== (numSegs - 1))) && !(Math.abs(seg.Length) < 1E-07)) {
            return wireLength > Constants_minWireLengthToSeparate;
        }
        else {
            return false;
        }
    };
    const segLines = linkSameNetLines(Constants_modernCirclePositionTolerance, mapIndexed((i, line) => {
        line.Lid = i;
        return line;
    }, fold_1((lines, _arg_3, wire_3) => {
        const wireIsRoutable = contains(wire_3.WId, wiresToRoute, {
            Equals: equals,
            GetHashCode: safeHash,
        });
        return append(map((aSeg) => {
            let this$_2, this$_3, this$_4;
            const segs = wire_3.Segments;
            const seg_2 = aSeg.Segment;
            let lType;
            const matchValue_1 = seg_2.Index === 2;
            const matchValue_2 = seg_2.Index === (length_1(segs) - 3);
            let matchResult;
            if (seg_2.Mode === "manual") {
                matchResult = 0;
            }
            else if (wireIsRoutable) {
                if (matchValue_1) {
                    if ((this$_2 = item(1, segs), Math.abs(this$_2.Length) < 1E-07)) {
                        matchResult = 1;
                    }
                    else if (matchValue_2) {
                        if ((this$_3 = item(length_1(segs) - 2, segs), Math.abs(this$_3.Length) < 1E-07)) {
                            matchResult = 2;
                        }
                        else {
                            matchResult = 3;
                        }
                    }
                    else {
                        matchResult = 3;
                    }
                }
                else if (matchValue_2) {
                    if ((this$_4 = item(length_1(segs) - 2, segs), Math.abs(this$_4.Length) < 1E-07)) {
                        matchResult = 2;
                    }
                    else {
                        matchResult = 3;
                    }
                }
                else {
                    matchResult = 3;
                }
            }
            else {
                matchResult = 0;
            }
            switch (matchResult) {
                case 0: {
                    lType = "fIXEDMANUALSEG";
                    break;
                }
                case 1: {
                    lType = "fIXEDSEG";
                    break;
                }
                case 2: {
                    lType = "fIXEDSEG";
                    break;
                }
                default:
                    lType = "nORMSEG";
            }
            return segmentToLine(lType, ori, wire_3, aSeg);
        }, getFilteredAbsSegments(uncurry2(curry3(selectSegments)(wire_3)), wire_3)), lines);
    }, empty(), model.Wires)));
    const symLines = collect((tupledArg_2) => {
        let sym_1, patternInput, sym_2, comp, matchValue_4, vS, hS, matchValue_2_1, w, h, left_1, right_1;
        const sym = tupledArg_2[1];
        if (equals(sym.Annotation, void 0)) {
            return bBoxToLines(ori, (sym_1 = sym, (patternInput = ((sym_2 = sym_1, (comp = sym_2.Component, (matchValue_4 = defaultArg(sym_2.HScale, 1), (vS = defaultArg(sym_2.VScale, 1), (hS = matchValue_4, (matchValue_2_1 = sym_2.STransform.Rotation, (matchValue_2_1.tag === 2) ? [comp.H * vS, comp.W * hS] : ((matchValue_2_1.tag === 1) ? [comp.W * hS, comp.H * vS] : ((matchValue_2_1.tag === 3) ? [comp.W * hS, comp.H * vS] : [comp.H * vS, comp.W * hS]))))))))), (w = patternInput[1], (h = patternInput[0], equals(sym_1.Annotation, new SymbolT_Annotation(0, [])) ? (new BoundingBox((left_1 = sym_1.Pos, (right_1 = (new XYPos(9, 9)), new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y))), 17, 17)) : (new BoundingBox(sym_1.Pos, w, h)))))));
        }
        else {
            return empty();
        }
    }, toList_1(model.Symbol.Symbols));
    return mapIndexed_1((i_1, line_2) => {
        line_2.Lid = i_1;
        return line_2;
    }, sortBy((line_1) => line_1.P, toArray(append(symLines, segLines)), {
        Compare: comparePrimitives,
    }));
}

/**
 * Returns integers +/- 1 indicating direction of wire leaving ends of line segment.
 * Pair returned is MaxB, MinB end of line
 */
export function turnDirs(line, wires) {
    const matchValue = line.Seg1;
    if (matchValue != null) {
        const aSeg = matchValue;
        const seg = aSeg.Segment;
        const wSegs = FSharpMap__get_Item(wires, seg.WireId).Segments;
        const segLength = (segIndex) => item(segIndex, wSegs).Length;
        const patternInput = (seg.Length > 0) ? [segLength(seg.Index + 1), -segLength(seg.Index - 1)] : [-segLength(seg.Index - 1), segLength(seg.Index + 1)];
        const len2 = patternInput[1];
        const len1 = patternInput[0];
        return [sign(len1), sign(len2)];
    }
    else {
        return toFail(printf("What? Expected Some segment - not None"));
    }
}

/**
 * +1 if line1.P > line2.P for zero crossings.
 * -1 if line1.P < line2.P for zero crossings.
 * 0 if line1.P and line2.P have one crossing.
 */
export function numCrossingsSign(model, line1, line2, wires) {
    const matchValue = turnDirs(line1, wires);
    const matchValue_1 = turnDirs(line2, wires);
    const min2 = matchValue_1[1] | 0;
    const min1 = matchValue[1] | 0;
    const max2 = matchValue_1[0] | 0;
    const max1 = matchValue[0] | 0;
    const endSegOpt = (line) => {
        let segs, index;
        const matchValue_2 = lineToWire(model, line);
        let matchResult, index_1, segs_1;
        if (matchValue_2 != null) {
            if ((segs = matchValue_2[0].Segments, (index = (matchValue_2[1] | 0), (length_1(segs) === 9) && ((index === 3) ? true : (index === 5))))) {
                matchResult = 0;
                index_1 = matchValue_2[1];
                segs_1 = matchValue_2[0].Segments;
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
                return item(index_1, segs_1);
            default:
                return void 0;
        }
    };
    let patternInput_1;
    const matchValue_3 = endSegOpt(line1);
    const matchValue_4 = endSegOpt(line2);
    let matchResult_1, seg;
    if (matchValue_3 == null) {
        if (matchValue_4 == null) {
            matchResult_1 = 1;
        }
        else {
            matchResult_1 = 0;
            seg = matchValue_4;
        }
    }
    else {
        matchResult_1 = 0;
        seg = matchValue_3;
    }
    switch (matchResult_1) {
        case 0: {
            patternInput_1 = (((seg.Length > 0) && (seg.Index === 3)) ? [1, 0] : [0, 1]);
            break;
        }
        default:
            patternInput_1 = [1, 1];
    }
    const checkMinCross = patternInput_1[0] | 0;
    const checkMaxCross = patternInput_1[1] | 0;
    let tupledArg;
    const matchValue_6 = line1.B.MinB > line2.B.MinB;
    const matchValue_7 = line1.B.MaxB < line2.B.MaxB;
    tupledArg = (matchValue_6 ? (matchValue_7 ? [min1, max1] : [min1, op_UnaryNegation_Int32(max2)]) : (matchValue_7 ? [op_UnaryNegation_Int32(min2), max1] : [op_UnaryNegation_Int32(min2), op_UnaryNegation_Int32(max2)]));
    const minC = tupledArg[0] | 0;
    const maxC = tupledArg[1] | 0;
    return ((checkMinCross * minC) + (checkMaxCross * maxC)) | 0;
}

/**
 * segL is a list of lines array indexes representing segments found close together.
 * Return the list ordered in such a way that wire crossings are minimised if the
 * segments are placed as ordered. The return list is placed with required P value increasing
 * along the list.
 */
export function orderPairwiseToMinimiseCrossings(model, lines, segL) {
    const wires = model.Wires;
    const numCrossingsSign$0027 = (l0, l1) => numCrossingsSign(model, l0, l1, wires);
    const matchValue = length_1(segL) | 0;
    switch (matchValue) {
        case 1:
            return segL;
        case 2: {
            const matchValue_1 = lines[item(0, segL)];
            const l1_1 = lines[item(1, segL)];
            const l0_1 = matchValue_1;
            if (numCrossingsSign$0027(l0_1, l1_1) > 0) {
                return ofArray([item(1, segL), item(0, segL)]);
            }
            else {
                return segL;
            }
        }
        default: {
            const numSegments = matchValue | 0;
            const wires_1 = model.Wires;
            const segA = toArray(segL);
            const indexOf = (seg) => findIndex((y) => (seg === y), segA);
            const swapSegs = (a, b) => {
                const tmp = segA[b] | 0;
                segA[b] = (segA[a] | 0);
                segA[a] = (tmp | 0);
            };
            const orderPair = (n) => {
                if (numCrossingsSign$0027(lines[segA[n]], lines[segA[n + 1]]) > 0) {
                    swapSegs(n, n + 1);
                }
            };
            for (let i = 0; i <= numSegments; i++) {
                for (let j = 0; j <= (numSegments - 2); j++) {
                    orderPair(j);
                }
            }
            return map((index) => {
                const n_1 = lines[index].Lid;
                return n_1 | 0;
            }, ofArray(segA));
        }
    }
}

/**
 * When given a segment index search for nearby segments to be considered with it as a single cluster
 * for spreading out. To be included segments must be close enough and overlapping. Search
 * terminates given large gap or a fixed boundary segments are not allowed to move across.
 */
export function expandCluster(index, searchDir, lines) {
    const nextIndex = (i) => {
        if (searchDir.tag === 0) {
            return (i + 1) | 0;
        }
        else {
            return (i - 1) | 0;
        }
    };
    const searchStart = lines[index].P;
    let patternInput;
    if (searchDir.tag === 1) {
        const loc = searchDir.fields[0];
        const index_1 = max(loc.Segments, {
            Compare: comparePrimitives,
        }) | 0;
        patternInput = [new Cluster(loc.UpperFix, loc.LowerFix, singleton(index_1), loc.Bound), min(loc.Segments, {
            Compare: comparePrimitives,
        })];
    }
    else {
        patternInput = [new Cluster(void 0, void 0, singleton(index), lines[index].B), void 0];
    }
    const lowestDownwardsIndex = patternInput[1];
    const initLoc = patternInput[0];
    const expand = (i_1_mut, loc_1_mut) => {
        expand:
        while (true) {
            const i_1 = i_1_mut, loc_1 = loc_1_mut;
            const nSegs = length_1(loc_1.Segments);
            if (((i_1 < 0) ? true : (i_1 >= lines.length)) ? true : (Math.abs(lines[i_1].P - searchStart) > ((Constants_maxSegmentSeparation * (nSegs + 2)) + Constants_smallOffset))) {
                return new Cluster(loc_1.UpperFix, loc_1.LowerFix, sortDescending(loc_1.Segments, {
                    Compare: comparePrimitives,
                }), loc_1.Bound);
            }
            else if (!hasOverlap(loc_1.Bound, lines[i_1].B)) {
                i_1_mut = nextIndex(i_1);
                loc_1_mut = loc_1;
                continue expand;
            }
            else {
                const p = lines[i_1].P;
                const matchValue = lines[i_1].LType;
                switch (matchValue) {
                    case "lINKEDSEG": {
                        i_1_mut = nextIndex(i_1);
                        loc_1_mut = loc_1;
                        continue expand;
                    }
                    case "nORMSEG": {
                        i_1_mut = nextIndex(i_1);
                        loc_1_mut = (new Cluster(loc_1.UpperFix, loc_1.LowerFix, cons(i_1, loc_1.Segments), boundUnion(loc_1.Bound, lines[i_1].B)));
                        continue expand;
                    }
                    default: {
                        const p_1 = lines[i_1].P;
                        const loc_2 = (searchDir.tag === 0) ? (new Cluster(p_1, loc_1.LowerFix, loc_1.Segments, loc_1.Bound)) : (new Cluster(loc_1.UpperFix, p_1, loc_1.Segments, loc_1.Bound));
                        return new Cluster(loc_2.UpperFix, loc_2.LowerFix, sortDescending(loc_2.Segments, {
                            Compare: comparePrimitives,
                        }), loc_2.Bound);
                    }
                }
            }
            break;
        }
    };
    return expand(nextIndex(index), initLoc);
}

/**
 * Check a cluster for same net segments within separateCaptureOverlap
 * Remove from cluster and all except one in every such same net group
 * The removed segments are marked LINKEDSEG and linked for later processing
 */
export function linkAndRemoveSameNetSegments(lines, cluster) {
    return new Cluster(cluster.UpperFix, cluster.LowerFix, map((line_1) => LineId__get_Index(line_1.Lid), filter((line) => (line.LType !== "lINKEDSEG"), linkSameNetLines(Constants_separateCaptureOverlap, map((seg) => lines[seg], cluster.Segments)))), cluster.Bound);
}

/**
 * print diagnostics in rare case that a segment gets "orphaned"
 * this should probably never happened and be fixed if anything is printed.
 */
export function printLostSegmentInCluster(msg, lines, lostIndex, loc) {
    toConsole(printf("%s"))(msg);
}

/**
 * Scan through segments in P order creating a list of local Clusters.
 * Within one cluster segments are adjacent and overlapping. Note that
 * different clusters may occupy the same P values if their segments do
 * not overlap.
 * Segments within each cluster will be repositioned and reordered after
 * clusters are identified.
 * Every segment must be part of a unique cluster.
 */
export function makeClusters(lines) {
    const groupableA = initialize(lines.length, (i) => (lines[i].LType === "nORMSEG"));
    const groupable = (seg) => groupableA[seg];
    const keepOnlyGroupableSegments = (loc) => (new Cluster(loc.UpperFix, loc.LowerFix, filter(groupable, loc.Segments), loc.Bound));
    const markSegmentsAsGroupable = (loc_1) => {
        iterate((seg_1) => {
            groupableA[seg_1] = false;
        }, loc_1.Segments);
    };
    const getClusters = (lines_1) => {
        let lowestLoc2Index, lowerFix, lowerFix_1, lowestLoc2Index_1, loc1LostSegs, loc_3;
        const matchValue = tryFindIndex((y) => (true === y), groupableA);
        if (matchValue != null) {
            const nextIndex = matchValue | 0;
            const handleLostNextIndex = (msg, loc_2) => {
                if (!contains(nextIndex, loc_2.Segments, {
                    Equals: (x_1, y_1) => (x_1 === y_1),
                    GetHashCode: numberHash,
                })) {
                    printLostSegmentInCluster(msg, lines_1, nextIndex, loc_2);
                    const orphanLoc = new Cluster(void 0, void 0, singleton(nextIndex), loc_2.Bound);
                    return ofArray([orphanLoc, loc_2]);
                }
                else {
                    return singleton(loc_2);
                }
            };
            const loc1 = expandCluster(nextIndex, new LocSearchDir(0, []), lines_1);
            const loc2 = expandCluster(max(loc1.Segments, {
                Compare: comparePrimitives,
            }), new LocSearchDir(1, [loc1]), lines_1);
            const newLocs = filter((loc_4) => !equals(loc_4.Segments, empty()), map(keepOnlyGroupableSegments, !isEmpty(loc2.Segments) ? (((lowestLoc2Index = (head(loc2.Segments) | 0), (lowerFix = loc2.LowerFix, lines_1[lowestLoc2Index].P > lines_1[nextIndex].P))) ? ((lowerFix_1 = loc2.LowerFix, (lowestLoc2Index_1 = (head(loc2.Segments) | 0), (loc1LostSegs = List_except(loc2.Segments, loc1.Segments, {
                Equals: (x_3, y_3) => (x_3 === y_3),
                GetHashCode: numberHash,
            }), equals(loc1LostSegs, empty()) ? singleton(loc2) : ((!contains(nextIndex, loc1LostSegs, {
                Equals: (x_4, y_4) => (x_4 === y_4),
                GetHashCode: numberHash,
            }) ? toConsole(printf("What? nextIndex has got lost from loc1! Trying to repair...")) : void 0, append(singleton(loc2), handleLostNextIndex("What? nextIndex has got lost from loc1 after expansion!", (loc_3 = (new Cluster(lowerFix_1, loc1.LowerFix, loc1LostSegs, loc1.Bound)), expandCluster(max(loc_3.Segments, {
                Compare: comparePrimitives,
            }), new LocSearchDir(1, [loc_3]), lines_1)))))))))) : (!contains(nextIndex, loc2.Segments, {
                Equals: (x_6, y_6) => (x_6 === y_6),
                GetHashCode: numberHash,
            }) ? handleLostNextIndex("What? nextIndex has got lost from loc2!", loc2) : singleton(loc2))) : (!contains(nextIndex, loc2.Segments, {
                Equals: (x_6, y_6) => (x_6 === y_6),
                GetHashCode: numberHash,
            }) ? handleLostNextIndex("What? nextIndex has got lost from loc2!", loc2) : singleton(loc2))));
            iterate(markSegmentsAsGroupable, newLocs);
            if (groupable(nextIndex)) {
                toFail(printf("Error: infinite loop detected in cluster find code"));
            }
            return append(newLocs, getClusters(lines_1));
        }
        else {
            return empty();
        }
    };
    return map((cluster) => linkAndRemoveSameNetSegments(lines, cluster), getClusters(lines));
}

/**
 * Function which given a cluster (loc) works out how to
 * spread out the contained segments optimally, spacing them from other segments and symbols.
 * Return value is a list of segments, represented as Lines, paired with where they move.
 * lines is the source list of lines (vertical or horizontal according to which is being processed).
 * model is the Buswire model needed to access wires.
 */
export function calcSegPositions(model, lines, loc) {
    let n, bMin, bMax, bMin_1, n_1, bMax_1, n_2, bMax_2, bMin_2;
    const segs = orderPairwiseToMinimiseCrossings(model, lines, List_distinct(loc.Segments, {
        Equals: (x, y) => (x === y),
        GetHashCode: numberHash,
    }));
    const pts = map((i) => lines[i].P, segs);
    const nSeg = length_1(loc.Segments) | 0;
    const spreadFromStart = (start, sep) => {
        iterateIndexed((i_1, seg) => {
            lines[seg].P = (start + (sep * i_1));
        }, segs);
    };
    const spreadFromMiddle = (mid, sep_1) => {
        iterateIndexed((i_2, seg_1) => {
            lines[seg_1].P = ((mid + (sep_1 * i_2)) - (((nSeg - 1) * sep_1) / 2));
        }, segs);
    };
    const spreadFromEnd = (endP, sep_2) => {
        iterateIndexed((i_3, seg_2) => {
            lines[seg_2].P = (endP + (sep_2 * (i_3 - (nSeg - 1))));
        }, segs);
    };
    const maxSep = Constants_maxSegmentSeparation;
    const halfMaxSep = Constants_maxSegmentSeparation / 2;
    const idealMidpoint = (min(pts, {
        Compare: comparePrimitives,
    }) + max(pts, {
        Compare: comparePrimitives,
    })) / 2;
    const halfIdealWidth = (nSeg - 1) * halfMaxSep;
    const idealStart = idealMidpoint - halfIdealWidth;
    const idealEnd = idealMidpoint + halfIdealWidth;
    const matchValue_2 = loc.UpperFix;
    const matchValue_3 = loc.LowerFix;
    let matchResult, bMax_3, bMin_3, n_3, bMin_4, bMax_4, n_4, bMax_5, bMin_5, n_5;
    if (matchValue_2 != null) {
        if (matchValue_3 != null) {
            if ((n = (nSeg | 0), (bMin = matchValue_3, (bMax = matchValue_2, ((bMax - bMin) / (n + 1)) < maxSep)))) {
                matchResult = 1;
                bMax_3 = matchValue_2;
                bMin_3 = matchValue_3;
                n_3 = nSeg;
            }
            else if ((bMin_1 = matchValue_3, (bMin_1 + maxSep) > idealStart)) {
                matchResult = 2;
                bMin_4 = matchValue_3;
            }
            else if ((n_1 = (nSeg | 0), (bMax_1 = matchValue_2, (bMax_1 - maxSep) < idealEnd))) {
                matchResult = 3;
                bMax_4 = matchValue_2;
                n_4 = nSeg;
            }
            else {
                matchResult = 4;
                bMax_5 = matchValue_2;
                bMin_5 = matchValue_3;
                n_5 = nSeg;
            }
        }
        else if ((n_2 = (nSeg | 0), (bMax_2 = matchValue_2, (bMax_2 - maxSep) < idealEnd))) {
            matchResult = 3;
            bMax_4 = matchValue_2;
            n_4 = nSeg;
        }
        else {
            matchResult = 4;
            bMax_5 = matchValue_2;
            bMin_5 = matchValue_3;
            n_5 = nSeg;
        }
    }
    else if (matchValue_3 != null) {
        if ((bMin_2 = matchValue_3, (bMin_2 + maxSep) > idealStart)) {
            matchResult = 2;
            bMin_4 = matchValue_3;
        }
        else {
            matchResult = 4;
            bMax_5 = matchValue_2;
            bMin_5 = matchValue_3;
            n_5 = nSeg;
        }
    }
    else if (nSeg === 1) {
        matchResult = 0;
    }
    else {
        matchResult = 4;
        bMax_5 = matchValue_2;
        bMin_5 = matchValue_3;
        n_5 = nSeg;
    }
    switch (matchResult) {
        case 0: {
            break;
        }
        case 1: {
            spreadFromMiddle((bMax_3 + bMin_3) / 2, (bMax_3 - bMin_3) / (n_3 + 1));
            break;
        }
        case 2: {
            spreadFromStart(bMin_4 + maxSep, maxSep);
            break;
        }
        case 3: {
            spreadFromEnd(bMax_4 - maxSep, maxSep);
            break;
        }
        case 4: {
            spreadFromMiddle(idealMidpoint, maxSep);
            break;
        }
    }
}

/**
 * Given a list of segment changes of given orientation apply them to the model
 */
export function adjustSegmentsInModel(ori, model, lines) {
    iterate((line) => {
        iterate((line2) => {
            line2.P = line.P;
        }, line.SameNetLink);
    }, lines);
    const lines_1 = filter((line_1) => (line_1.LType !== "bARRIER"), lines);
    const wires_1 = fold((wires, line_2) => {
        const seg = value_3(line_2.Seg1);
        return moveLine(ori, line_2.P, line_2, wires);
    }, model.Wires, lines_1);
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), BusWireT_wires_)(wires_1)(model);
}

/**
 * Segments which could be moved, but would make an extra segment if moved, are marked Fixed
 * and not moved by the normal cluster-based separation functions.
 * This function looks at these segments and moves them a little in the special case that they
 * overlap. It is called after the main segment separation is complete.
 */
export function separateFixedSegments(wiresToRoute, ori, model) {
    const getSpacefromLine = (lines, line, excludeLine, maxOffset) => {
        const p = line.P;
        const find = (offset, dir) => tryFindIndexInArray(LineId__get_Index(line.Lid) + dir, dir, (line2) => (hasOverlap(line2.B, line.B) && !equals(line2.Lid, excludeLine.Lid)), (l1) => (Math.abs(l1.P - p) > (2 * offset)), lines);
        const matchValue = find(maxOffset, 1);
        const matchValue_1 = find(maxOffset, -1);
        if (matchValue != null) {
            if (matchValue_1 != null) {
                const a = matchValue;
                const b = matchValue_1;
                if (Math.abs(lines[LineId__get_Index(a)].P - p) > Math.abs(lines[LineId__get_Index(b)].P - p)) {
                    return lines[LineId__get_Index(a)].P - p;
                }
                else {
                    return lines[LineId__get_Index(b)].P - p;
                }
            }
            else {
                return -maxOffset;
            }
        }
        else {
            return maxOffset;
        }
    };
    const allLines = makeLines(wiresToRoute, ori, model);
    const checkedLines = allLines.filter((line_1) => (line_1.LType === "fIXEDSEG"));
    iterate_1((line1) => {
        iterate_1((line2_2) => {
            const space1 = getSpacefromLine(allLines, line1, line2_2, 2) * Constants_maxSegmentSeparation;
            const space2 = getSpacefromLine(allLines, line2_2, line1, 2) * Constants_maxSegmentSeparation;
            if ((space1 < Constants_overlapTolerance) && (space2 < Constants_overlapTolerance)) {
                toConsole(printf("WARNING: No space for fixed segment shifting overlap"));
            }
            if (Math.abs(space1) > Math.abs(space2)) {
                line1.P = (line1.P + (space1 * 0.5));
            }
            else {
                line2_2.P = (line1.P + (space2 * 0.5));
            }
        }, filter_1((line2_1) => {
            if (((compare(line1.Lid, line2_1.Lid) < 0) && (Math.abs(line1.P - line2_1.P) < Constants_overlapTolerance)) && !equals(line1.PortId, line2_1.PortId)) {
                return hasOverlap(line1.B, line2_1.B);
            }
            else {
                return false;
            }
        }, checkedLines));
    }, checkedLines);
    return adjustSegmentsInModel(ori, model, ofArray(allLines));
}

/**
 * Return the index of the Line with the smallest value of P > p
 * Use binary earch for speed.
 */
export function findInterval(lines, p) {
    const find = (above_mut, below_mut) => {
        find:
        while (true) {
            const above = above_mut, below = below_mut;
            if ((above - below) < 2) {
                return above | 0;
            }
            else {
                const mid = ~~((above + below) / 2) | 0;
                if (lines[mid].P < p) {
                    above_mut = above;
                    below_mut = mid;
                    continue find;
                }
                else {
                    above_mut = mid;
                    below_mut = below;
                    continue find;
                }
            }
            break;
        }
    };
    return find(lines.length - 1, 0) | 0;
}

/**
 * Return true if there is no overlap between line and lines array (with exception of excludedLine).
 * All lines are the same type (parallel)
 */
export function checkExtensionNoOverlap(overlap, ext, excludedWire, info) {
    const lines = (ext.ExtOri === "vertical") ? info.VLines : info.HLines;
    const b = ext.ExtB;
    const p = ext.ExtP;
    const iMin = findInterval(lines, p - overlap) | 0;
    const check = (i_mut) => {
        check:
        while (true) {
            const i = i_mut;
            if (((i >= lines.length) ? true : (i < 0)) ? true : (lines[i].P > (p + overlap))) {
                return true;
            }
            else if (equals(lines[i].Wid, excludedWire) ? true : !hasNearOverlap(overlap, b, lines[i].B)) {
                i_mut = (i + 1);
                continue check;
            }
            else {
                return false;
            }
            break;
        }
    };
    return check(iMin);
}

/**
 * Return true if there is no crossing symbol boundary between line
 * and lines array (with exception of excludedLine).
 * Lines and excludedLine or opposite orientation from line
 */
export function checkExtensionNoCrossings(overlap, ext, excludedWire, info) {
    const lines = (ext.ExtOri === "vertical") ? info.HLines : info.VLines;
    const b = ext.ExtB;
    const p = ext.ExtP;
    const iMin = findInterval(lines, b.MinB - overlap) | 0;
    const check = (i_mut) => {
        check:
        while (true) {
            const i = i_mut;
            const otherLine = lines[i];
            if (((i >= lines.length) ? true : (i < 0)) ? true : (otherLine.P > (otherLine.B.MaxB + overlap))) {
                return true;
            }
            else {
                const b_1 = otherLine.B;
                if (((equals(lines[i].Wid, excludedWire) ? true : (b_1.MinB > p)) ? true : (b_1.MaxB < p)) ? true : !(lines[i].LType === "bARRIER")) {
                    i_mut = (i + 1);
                    continue check;
                }
                else {
                    return false;
                }
            }
            break;
        }
    };
    return check(iMin);
}

/**
 * Process the symbols and wires in Model generating arrays of Horizontal and Vertical lines.
 * In addition the inverse map is generated which can map each segmnet to the corresponding Line if that
 * exists.
 * Note that Lines reference segments, which contain wire Id and segment Index and can therefore be used to
 * reference the corresponding wire via the model.Wires map.
 */
export function makeLineInfo(wiresToRoute, model) {
    const hLines = makeLines(wiresToRoute, "horizontal", model);
    const vLines = makeLines(wiresToRoute, "vertical", model);
    const wireMap = model.Wires;
    const lineMap = ofArray_1(collect_1((line) => {
        let this$;
        const matchValue = line.Seg1;
        if (matchValue != null) {
            const aSeg = matchValue;
            return [[(this$ = aSeg.Segment, [this$.Index, this$.WireId]), line.Lid]];
        }
        else {
            return [];
        }
    }, append_1(hLines, vLines)), {
        Compare: compareArrays,
    });
    return new LineInfo(vLines, hLines, wireMap, lineMap);
}

/**
 * Return true if the given segment length change is allowed.
 * If the new segment creates a part line segment
 * that did not previouly exist this is checked for overlap
 * with symbols and other wires.
 */
export function isSegmentExtensionOk(info, wire, segNum, ori, newLength) {
    let this$, this$_1;
    const segs = wire.Segments;
    const seg = item(segNum, wire.Segments);
    const len = seg.Length;
    const aSegStart = getAbsoluteSegmentPos(wire, segNum)[0];
    const patternInput_1 = (ori === "horizontal") ? [aSegStart.Y, aSegStart.X] : [aSegStart.X, aSegStart.Y];
    const startC = patternInput_1[1];
    const p = patternInput_1[0];
    const extension = new Extension(ori, new Bound_2(min_1(startC, startC) + newLength, max_1(startC, startC) + newLength), p);
    if ((((segNum === 2) && ((this$ = item(1, segs), Math.abs(this$.Length) < 1E-07))) && (sign(item(0, segs).Length) !== sign(newLength))) ? true : (((segNum === (length_1(segs) - 3)) && ((this$_1 = item(length_1(segs) - 2, segs), Math.abs(this$_1.Length) < 1E-07))) && (sign(item(length_1(segs) - 1, segs).Length) !== sign(newLength)))) {
        return false;
    }
    else if (checkExtensionNoOverlap(Constants_extensionTolerance, extension, wire.WId, info)) {
        return checkExtensionNoCrossings(Constants_extensionTolerance, extension, wire.WId, info);
    }
    else {
        return false;
    }
}

/**
 * Return the list of wire corners found in given wire with all corner
 * edges smaller than cornerSizeLimit. A wire can have at most one corner.
 */
export function findWireCorner(info, cornerSizeLimit, wire) {
    const segs = wire.Segments;
    const nSegs = length_1(wire.Segments) | 0;
    const pickStartOfCorner = (start) => {
        let this$, this$_1;
        const seg = item(start, segs);
        if (((this$ = item(start, segs), Math.abs(this$.Length) < 1E-07)) ? true : ((this$_1 = item(start + 3, segs), Math.abs(this$_1.Length) < 1E-07))) {
            return void 0;
        }
        else {
            const matchValue = item(start + 1, segs);
            const deletedSeg2 = item(start + 2, segs);
            const deletedSeg1 = matchValue;
            const hasManualSegment = exists((i) => (item(i, segs).Mode === "manual"), toList(rangeDouble(start, 1, start + 3)));
            const hasLongSegment = max_1(Math.abs(deletedSeg1.Length), Math.abs(deletedSeg2.Length)) > cornerSizeLimit;
            if (((hasManualSegment ? true : hasLongSegment) ? true : (Math.abs(deletedSeg1.Length) < 1E-07)) ? true : (Math.abs(deletedSeg2.Length) < 1E-07)) {
                return void 0;
            }
            else {
                const ori = wire.InitialOrientation;
                const startSegOrientation = ((seg.Index % 2) === 0) ? ori : ((ori === "vertical") ? "horizontal" : "vertical");
                const newLength1 = seg.Length + deletedSeg2.Length;
                const newLength2 = deletedSeg1.Length - item(start + 3, segs).Length;
                if (isSegmentExtensionOk(info, wire, start, startSegOrientation, newLength1) && isSegmentExtensionOk(info, wire, start + 3, (startSegOrientation === "vertical") ? "horizontal" : "vertical", newLength2)) {
                    return new WireCorner(wire, start, deletedSeg2.Length, deletedSeg1.Length, startSegOrientation);
                }
                else {
                    return void 0;
                }
            }
        }
    };
    const _arg = tryPick(pickStartOfCorner, toList(rangeDouble(0, 1, nSegs - 5)));
    if (_arg != null) {
        const x = _arg;
        return singleton(x);
    }
    else {
        return empty();
    }
}

/**
 * Change LineInfo removing a corner from a wire.
 * TODO: currently only WireMap changes
 */
export function removeCorner(info, wc) {
    let source_2;
    const removeSegments = (start, num, segments) => mapIndexed((i, seg) => {
        if (i > (start - 1)) {
            return new BusWireT_Segment(i, seg.Length, seg.WireId, seg.IntersectOrJumpList, seg.Draggable, seg.Mode);
        }
        else {
            return seg;
        }
    }, removeManyAt(start, num, segments));
    const addLengthToSegment = (delta, seg_1) => (new BusWireT_Segment(seg_1.Index, seg_1.Length + delta, seg_1.WireId, seg_1.IntersectOrJumpList, seg_1.Draggable, seg_1.Mode));
    let wire$0027;
    const inputRecord = wc.Wire;
    wire$0027 = (new BusWireT_Wire(inputRecord.WId, inputRecord.InputPort, inputRecord.OutputPort, inputRecord.Color, inputRecord.Width, removeSegments(wc.StartSeg + 1, 2, (source_2 = updateAt(wc.StartSeg, addLengthToSegment(wc.StartSegChange, item(wc.StartSeg, wc.Wire.Segments)), wc.Wire.Segments), updateAt(wc.StartSeg + 3, addLengthToSegment(wc.EndSegChange, item(wc.StartSeg + 3, wc.Wire.Segments)), source_2))), inputRecord.StartPos, inputRecord.InitialOrientation));
    return new LineInfo(info.VLines, info.HLines, add(wire$0027.WId, wire$0027, info.WireMap), info.LineMap);
}

/**
 * Return model with corners identified and removed where possible.
 * Corners are artifacts - usually small - which give wires more visible segments than is needed.
 */
export function removeModelCorners(wires, model) {
    const info = makeLineInfo(wires, model);
    const wires_1 = model.Wires;
    const corners = collect((wire) => findWireCorner(info, Constants_maxCornerSize, wire), toList(values(wires_1)));
    const info$0027 = fold(removeCorner, info, corners);
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), BusWireT_wires_)(info$0027.WireMap)(model);
}

/**
 * Return None, or Some wire' where wire' is wire with spikes removed.
 * Spikes segments that turn back on previous ones (with a zero-length segment in between).
 * Optimised for the case that there are no spikes and None is returned.
 */
export function removeWireSpikes(wire) {
    const segs = wire.Segments;
    return map_1((segs_2) => (new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, segs_2, wire.StartPos, wire.InitialOrientation)), fold((segsOpt, seg) => {
        let this$;
        const n = seg.Index | 0;
        const segs_1 = defaultArg(segsOpt, segs);
        const nSeg = length_1(segs_1) | 0;
        if (((n > (nSeg - 3)) ? true : !((this$ = item(n + 1, segs_1), Math.abs(this$.Length) < 1E-07))) ? true : (sign(item(n, segs_1).Length) === sign(item(n + 2, segs_1).Length))) {
            return segsOpt;
        }
        else {
            let newSegN;
            const inputRecord = item(n, segs_1);
            newSegN = (new BusWireT_Segment(inputRecord.Index, item(n, segs_1).Length + item(n + 2, segs_1).Length, inputRecord.WireId, inputRecord.IntersectOrJumpList, inputRecord.Draggable, inputRecord.Mode));
            const lastSegs = getSlice(n + 3, nSeg - 1, segs_1);
            return concat([getSlice(0, n - 1, segs_1), singleton(newSegN), mapIndexed((i, seg_1) => (new BusWireT_Segment((i + n) + 1, seg_1.Length, seg_1.WireId, seg_1.IntersectOrJumpList, seg_1.Draggable, seg_1.Mode)), lastSegs)]);
        }
    }, void 0, segs));
}

/**
 * return model with all wire spikes removed
 */
export function removeModelSpikes(model) {
    return new BusWireT_Model(model.Symbol, fold_1((wires, wid, wire) => {
        const matchValue = removeWireSpikes(wire);
        if (matchValue != null) {
            const wire$0027 = matchValue;
            return add(wid, wire$0027, wires);
        }
        else {
            return wires;
        }
    }, model.Wires, model.Wires), model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
}

/**
 * Perform complete segment ordering and separation for segments of given orientation.
 * wiresToRoute: set of wires allowed to be moved.
 * ori: orientation
 */
export function separateModelSegmentsOneOrientation(wiresToRoute, ori, model) {
    const allWires = toList(keys(model.Wires));
    const excludeClustersWithoutWiresToRoute = (lines) => {
        const routedLines = lines.filter((line) => contains(line.Wid, wiresToRoute, {
            Equals: equals,
            GetHashCode: safeHash,
        }));
        return (list_1) => filter((cluster) => exists((seg) => routedLines.some((line_1) => (LineId__get_Index(line_1.Lid) === seg)), cluster.Segments), list_1);
    };
    const lines_1 = makeLines(allWires, ori, model);
    iterate((loc) => {
        calcSegPositions(model, lines_1, loc);
    }, excludeClustersWithoutWiresToRoute(lines_1)(makeClusters(lines_1)));
    return adjustSegmentsInModel(ori, model, ofArray(lines_1));
}

/**
 * Perform complete wire segment separation and ordering for all orientations.
 * wiresToRoute: set of wires to have segments separated and ordered
 */
export function separateAndOrderModelSegments(wiresToRoute, model) {
    if (equals(wiresToRoute, empty())) {
        return model;
    }
    else {
        toConsole(printf("Separating all segments!"));
        const separate = (ori, model_1) => separateModelSegmentsOneOrientation(wiresToRoute, ori, model_1);
        return removeModelCorners(wiresToRoute, separateFixedSegments(wiresToRoute, "vertical", separateFixedSegments(wiresToRoute, "horizontal", separate("horizontal", separate("vertical", separate("horizontal", separate("vertical", separate("horizontal", model))))))));
    }
}

/**
 * Top-level function to replace updateWireSegmentJumps
 * and call the Segment separate code as well. This should
 * run when significant circuit wiring changes have been made
 * e.g. at the end of symbol drags.
 */
export function updateWireSegmentJumpsAndSeparations(wires, model) {
    return updateWireSegmentJumps(empty(), separateAndOrderModelSegments(wires, model));
}

/**
 * Top-level function does routing and then separation of set of wires.
 * Uses partial routing if possible.
 */
export function routeAndSeparateSymbolWires(model, compId) {
    const wires = filterWiresByCompMoved(model, singleton(compId));
    const arg = length_1(wires.Inputs) | 0;
    const arg_1 = length_1(wires.Outputs) | 0;
    const arg_2 = length_1(wires.Both) | 0;
    toConsole(printf("Routing and separating symbol wires:\n%d inputs, %d outputs, %d both"))(arg)(arg_1)(arg_2);
    const newWires = ofList(map((tupledArg) => {
        const cId = tupledArg[0];
        const wire = tupledArg[1];
        if (contains(cId, wires.Both, {
            Equals: equals,
            GetHashCode: safeHash,
        })) {
            return [cId, updateWire(model, updateWire(model, wire, true), false)];
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
    const model_1 = new BusWireT_Model(model.Symbol, newWires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
    return updateWireSegmentJumpsAndSeparations(toList(keys(newWires)), model_1);
}

/**
 * all wires from comps have all segments made auto.
 * then the separation logic is rerun on these wires
 */
export function reSeparateWiresFrom(comps, model) {
    toConsole(printf("reseparating wires"));
    let wires$0027;
    const tupledArg = [model.Wires, collect((w) => ofArray(toArray_1(resetWireToAutoKeepingPositionOpt(w))), getConnectedWires(model, comps))];
    wires$0027 = fold((wMap, wire) => add(wire.WId, wire, wMap), tupledArg[0], tupledArg[1]);
    return updateWireSegmentJumpsAndSeparations(map((tupledArg_1) => {
        const wId = tupledArg_1[0];
        const wire_1 = tupledArg_1[1];
        return wId;
    }, toList_1(wires$0027)), new BusWireT_Model(model.Symbol, wires$0027, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet));
}

/**
 * all wires from comps are autorouted from scratch
 * then the separation logic is rerun on these wires
 */
export function reRouteWiresFrom(comps, model) {
    toConsole(printf("reroute wires"));
    let wires$0027;
    const tupledArg = [model.Wires, collect((w) => ofArray(toArray_1(resetWireToAutoKeepingPositionOpt(w))), getConnectedWires(model, comps))];
    wires$0027 = fold((wMap, wire) => add(wire.WId, wire, wMap), tupledArg[0], tupledArg[1]);
    const model_1 = new BusWireT_Model(model.Symbol, wires$0027, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
    const model_3 = fold_1((model_2, wid, wire_1) => Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), BusWireT_wireOf_(wid))((wire_2) => smartAutoroute(model_2, wire_2))(model_2), model_1, wires$0027);
    return updateWireSegmentJumpsAndSeparations(toList(keys(wires$0027)), model_3);
}

//# sourceMappingURL=BusWireSeparate.fs.js.map
