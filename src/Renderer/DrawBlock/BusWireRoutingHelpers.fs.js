import { BoundingBox, XYPos } from "../Common/CommonTypes.fs.js";
import { Union, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { tuple_type, class_type, array_type, union_type, int32_type, list_type, option_type, string_type, record_type, float64_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { BusWireT_Wire, BusWireT_Segment, BusWireT_Wire_$reflection, BusWireT_ASegment_$reflection } from "../Model/DrawModelType.fs.js";
import { updateAt, map, length, item } from "../fable_modules/fable-library.4.1.4/List.js";
import { Constants_intervalTolerance, getAbsSegments } from "./BlockHelpers.fs.js";
import { join, interpolate, toText, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { map as map_2, value as value_2 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { map as map_1 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { max, min } from "../fable_modules/fable-library.4.1.4/Double.js";
import { change } from "../fable_modules/fable-library.4.1.4/Map.js";

export const Constants_wireSeparationFromSymbol = 7;

export const Constants_maxCallsToShiftHorizontalSeg = 100;

export const Constants_minWireSeparation = 2;

export const Constants_smallOffset = 0.0001;

export const Constants_maxSegmentSeparation = 30;

export const Constants_overlapTolerance = 2;

export const Constants_separateCaptureOverlap = 35;

export const Constants_minWireLengthToSeparate = 10;

export const Constants_maxCornerSize = 100;

export const Constants_extensionTolerance = 3;

/**
 * swap X and Y coordinates if orientation = Vertical
 */
export function swapXY(pos, orientation) {
    if (orientation === "vertical") {
        return new XYPos(pos.Y, pos.X);
    }
    else {
        return pos;
    }
}

/**
 * swap X & Y coordinats in BB if orientation is vertical
 */
export function swapBB(box, orientation) {
    if (orientation === "vertical") {
        return new BoundingBox(swapXY(box.TopLeft, orientation), box.H, box.W);
    }
    else {
        return box;
    }
}

/**
 * Return new poistion moved the the direction and amount shown.
 */
export function updatePos(direction, distanceToShift, pos) {
    switch (direction) {
        case "down_":
            return new XYPos(pos.X, pos.Y + distanceToShift);
        case "left_":
            return new XYPos(pos.X - distanceToShift, pos.Y);
        case "right_":
            return new XYPos(pos.X + distanceToShift, pos.Y);
        default:
            return new XYPos(pos.X, pos.Y - distanceToShift);
    }
}

export class Bound extends Record {
    constructor(MinB, MaxB) {
        super();
        this.MinB = MinB;
        this.MaxB = MaxB;
    }
}

export function Bound_$reflection() {
    return record_type("BusWireRoutingHelpers.Bound", [], Bound, () => [["MinB", float64_type], ["MaxB", float64_type]]);
}

export function LineId__get_Index(this$) {
    const i = this$;
    return i | 0;
}

export class Line extends Record {
    constructor(P, B, Orientation, Seg1, LType, SameNetLink, Wid, PortId, Lid) {
        super();
        this.P = P;
        this.B = B;
        this.Orientation = Orientation;
        this.Seg1 = Seg1;
        this.LType = LType;
        this.SameNetLink = SameNetLink;
        this.Wid = Wid;
        this.PortId = PortId;
        this.Lid = Lid;
    }
}

export function Line_$reflection() {
    return record_type("BusWireRoutingHelpers.Line", [], Line, () => [["P", float64_type], ["B", Bound_$reflection()], ["Orientation", string_type], ["Seg1", option_type(BusWireT_ASegment_$reflection())], ["LType", string_type], ["SameNetLink", list_type(Line_$reflection())], ["Wid", string_type], ["PortId", string_type], ["Lid", int32_type]]);
}

export class Cluster extends Record {
    constructor(UpperFix, LowerFix, Segments, Bound) {
        super();
        this.UpperFix = UpperFix;
        this.LowerFix = LowerFix;
        this.Segments = Segments;
        this.Bound = Bound;
    }
}

export function Cluster_$reflection() {
    return record_type("BusWireRoutingHelpers.Cluster", [], Cluster, () => [["UpperFix", option_type(float64_type)], ["LowerFix", option_type(float64_type)], ["Segments", list_type(int32_type)], ["Bound", Bound_$reflection()]]);
}

export const clusterSegments_ = [(c) => c.Segments, (n) => ((c_1) => (new Cluster(c_1.UpperFix, c_1.LowerFix, n, c_1.Bound)))];

export class LocSearchDir extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Upwards", "Downwards"];
    }
}

export function LocSearchDir_$reflection() {
    return union_type("BusWireRoutingHelpers.LocSearchDir", [], LocSearchDir, () => [[], [["Item", Cluster_$reflection()]]]);
}

export class Extension extends Record {
    constructor(ExtOri, ExtB, ExtP) {
        super();
        this.ExtOri = ExtOri;
        this.ExtB = ExtB;
        this.ExtP = ExtP;
    }
}

export function Extension_$reflection() {
    return record_type("BusWireRoutingHelpers.Extension", [], Extension, () => [["ExtOri", string_type], ["ExtB", Bound_$reflection()], ["ExtP", float64_type]]);
}

export class WireCorner extends Record {
    constructor(Wire, StartSeg, StartSegChange, EndSegChange, StartSegOrientation) {
        super();
        this.Wire = Wire;
        this.StartSeg = (StartSeg | 0);
        this.StartSegChange = StartSegChange;
        this.EndSegChange = EndSegChange;
        this.StartSegOrientation = StartSegOrientation;
    }
}

export function WireCorner_$reflection() {
    return record_type("BusWireRoutingHelpers.WireCorner", [], WireCorner, () => [["Wire", BusWireT_Wire_$reflection()], ["StartSeg", int32_type], ["StartSegChange", float64_type], ["EndSegChange", float64_type], ["StartSegOrientation", string_type]]);
}

export class LineInfo extends Record {
    constructor(VLines, HLines, WireMap, LineMap) {
        super();
        this.VLines = VLines;
        this.HLines = HLines;
        this.WireMap = WireMap;
        this.LineMap = LineMap;
    }
}

export function LineInfo_$reflection() {
    return record_type("BusWireRoutingHelpers.LineInfo", [], LineInfo, () => [["VLines", array_type(Line_$reflection())], ["HLines", array_type(Line_$reflection())], ["WireMap", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, BusWireT_Wire_$reflection()])], ["LineMap", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(int32_type, string_type), int32_type])]]);
}

/**
 * Get the horizontal length of the visible segment emerging from a port
 */
export function getVisibleNubLength(atEnd, wire) {
    const segs = wire.Segments;
    const getLength = (i) => item(atEnd ? ((length(segs) - 1) - i) : i, segs).Length;
    if (getLength(1) < Constants_smallOffset) {
        return getLength(2) + getLength(0);
    }
    else {
        return getLength(0);
    }
}

/**
 * Return true if the segment extends a wire parallel with a nub (wire end).
 */
export function segmentIsNubExtension(wire, segIndex) {
    let this$, this$_1, this$_2, this$_3;
    const segs = wire.Segments;
    const nSegs = length(segs) | 0;
    const lastSeg = (nSegs - 1) | 0;
    const revSeg = (n) => item(lastSeg - n, segs);
    const matchValue = (lastSeg - segIndex) | 0;
    let matchResult;
    switch (segIndex) {
        case 0: {
            matchResult = 0;
            break;
        }
        case 2: {
            switch (matchValue) {
                case 0: {
                    matchResult = 0;
                    break;
                }
                case 2: {
                    if ((this$ = item(1, segs), Math.abs(this$.Length) < 1E-07)) {
                        matchResult = 1;
                    }
                    else if ((this$_1 = revSeg(1), Math.abs(this$_1.Length) < 1E-07)) {
                        matchResult = 2;
                    }
                    else {
                        matchResult = 3;
                    }
                    break;
                }
                default:
                    if ((this$_2 = item(1, segs), Math.abs(this$_2.Length) < 1E-07)) {
                        matchResult = 1;
                    }
                    else {
                        matchResult = 3;
                    }
            }
            break;
        }
        default:
            switch (matchValue) {
                case 0: {
                    matchResult = 0;
                    break;
                }
                case 2: {
                    if ((this$_3 = revSeg(1), Math.abs(this$_3.Length) < 1E-07)) {
                        matchResult = 2;
                    }
                    else {
                        matchResult = 3;
                    }
                    break;
                }
                default:
                    matchResult = 3;
            }
    }
    switch (matchResult) {
        case 0:
            return true;
        case 1:
            return true;
        case 2:
            return true;
        default:
            return false;
    }
}

/**
 * Return string to display a wire
 */
export function pWire(wire) {
    const segs = wire.Segments;
    const nSegs = length(segs) | 0;
    const aSegs = getAbsSegments(wire);
    const pASeg = (aSeg) => {
        let matchValue_1, segStart, segEnd, matchValue_2;
        const isMan = (aSeg.Segment.Mode === "auto") ? "A" : "M";
        let vec;
        const left = aSeg.End;
        const right = aSeg.Start;
        vec = (new XYPos(left.X - right.X, left.Y - right.Y));
        if (Math.abs(aSeg.Segment.Length) < 1E-07) {
            return isMan + ".S0";
        }
        else {
            return ((isMan + ".") + ((matchValue_1 = ((segStart = aSeg.Start, (segEnd = aSeg.End, (Math.abs(segStart.X - segEnd.X) < 1E-07) ? "vertical" : ((Math.abs(segStart.Y - segEnd.Y) < 1E-07) ? "horizontal" : toFail(printf("ERROR: Diagonal wire")))))), (matchValue_2 = (aSeg.Segment.Length > 0), (matchValue_1 === "horizontal") ? (matchValue_2 ? "Rt" : "Lt") : (matchValue_2 ? "Dn" : "Up"))))) + toText(interpolate("%.0f%P()", [Math.abs(aSeg.Segment.Length)]));
        }
    };
    const pSegs = join("-", map(pASeg, aSegs));
    return toText(`W${nSegs}:${wire.InitialOrientation}->${pSegs}`);
}

/**
 * Return string to display an Option
 */
export function pOpt(x) {
    if (x != null) {
        const x_1 = value_2(x);
        return `^${x_1}^`;
    }
    else {
        return "None";
    }
}

/**
 * Return string to display the type of a Line
 */
export function pLineType(line) {
    return `${line.LType}`;
}

/**
 * Return string to display a Line
 */
export function pLine(line) {
    const ori = (line.Orientation === "vertical") ? "V" : "H";
    return toText(interpolate("|%P()L%P().P=%.0f%P().%P():B=%.0f%P()-%.0f%P(): (%P())|", [ori, LineId__get_Index(line.Lid), line.P, pLineType(line), line.B.MinB, line.B.MaxB, map((l) => LineId__get_Index(l.Lid), line.SameNetLink)]));
}

/**
 * Return string to display an array of Lines
 */
export function pLines(lineA) {
    return `${join("\n", map_1(pLine, lineA))}`;
}

/**
 * Return string to display a Cluster (compactly).
 * See also pAllCluster.
 */
export function pCluster(loc) {
    return `Cluster:<${pOpt(loc.LowerFix)}-${loc.Segments}-${pOpt(loc.UpperFix)}>`;
}

/**
 * Return string to display a Cluster (long form).
 * See also pCluster.
 */
export function pAllCluster(lines, loc) {
    let oris;
    const matchValue = lines[0].Orientation;
    oris = ((matchValue === "vertical") ? "Vert" : "Horiz");
    return `Cluster-${oris}:<L=${pOpt(loc.LowerFix)}-${join(",", map((n) => pLine(lines[n]), loc.Segments))}-U=${pOpt(loc.UpperFix)}>`;
}

/**
 * Linear search in an array from searchStart in a direction dir = +1/-1 from searchStart.
 * Give up and return None if giveUp is true.
 * Return first location for which predicate is true.
 */
export function tryFindIndexInArray(searchStart_mut, dir_mut, predicate_mut, giveUp_mut, arr_mut) {
    tryFindIndexInArray:
    while (true) {
        const searchStart = searchStart_mut, dir = dir_mut, predicate = predicate_mut, giveUp = giveUp_mut, arr = arr_mut;
        if ((LineId__get_Index(searchStart) < 0) ? true : (LineId__get_Index(searchStart) > (arr.length - 1))) {
            return void 0;
        }
        else {
            const matchValue = predicate(arr[LineId__get_Index(searchStart)]);
            const matchValue_1 = giveUp(arr[LineId__get_Index(searchStart)]);
            if (matchValue_1) {
                return void 0;
            }
            else if (matchValue) {
                return searchStart;
            }
            else {
                searchStart_mut = (LineId__get_Index(searchStart) + dir);
                dir_mut = dir;
                predicate_mut = predicate;
                giveUp_mut = giveUp;
                arr_mut = arr;
                continue tryFindIndexInArray;
            }
        }
        break;
    }
}

/**
 * True if bounds b1 and b2 overlap or are exactly adjacent
 */
export function hasOverlap(b1, b2) {
    let x, e, x_1, e_1;
    if (((x = b2.MinB, (e = Constants_intervalTolerance, ((b1.MinB - e) < x) && (x < (b1.MaxB + e))))) ? true : ((x_1 = b2.MaxB, (e_1 = Constants_intervalTolerance, ((b1.MinB - e_1) < x_1) && (x_1 < (b1.MinB + e_1)))))) {
        return true;
    }
    else {
        const x_2 = b1.MinB;
        const e_2 = Constants_intervalTolerance;
        if ((b2.MinB - e_2) < x_2) {
            return x_2 < (b2.MaxB + e_2);
        }
        else {
            return false;
        }
    }
}

/**
 * True if bounds b1 and b2 overlap or are exactly adjacent
 */
export function hasNearOverlap(tolerance, b1, b2) {
    let x, e, x_1, e_1;
    if (((x = b2.MinB, (e = Constants_intervalTolerance, (((b1.MinB - tolerance) + e) < x) && (x < ((b1.MaxB + tolerance) - e))))) ? true : ((x_1 = b2.MaxB, (e_1 = Constants_intervalTolerance, (((b1.MinB - tolerance) + e_1) < x_1) && (x_1 < ((b1.MinB + tolerance) - e_1)))))) {
        return true;
    }
    else {
        const x_2 = b1.MinB;
        const e_2 = Constants_intervalTolerance;
        if (((b2.MinB - tolerance) + e_2) < x_2) {
            return x_2 < ((b2.MaxB + tolerance) - e_2);
        }
        else {
            return false;
        }
    }
}

/**
 * Return union of two bounds b1 and b2. b1 & b2 must overlap or be adjacent.
 * Otherwise the inclusive interval containing b1 and b2 is returned.
 */
export function boundUnion(b1, b2) {
    return new Bound(min(b1.MinB, b2.MinB), max(b1.MaxB, b2.MaxB));
}

/**
 * Move segment by amount posDelta in direction perpendicular to segment - + => X or y increases.
 * Movement is by changing lengths of two segments on either side.
 * Will fail if called to change a nub at either end of a wire (nubs cannot move).
 */
export function moveSegment(index, posDelta, wire) {
    let source_1, inputRecord, inputRecord_1;
    const segs = wire.Segments;
    if ((index < 1) ? true : (index > (length(segs) - 2))) {
        toFail(`What? moveSegment is trying to move segment ${index} of a wire length ${length(segs)}`);
    }
    return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, (source_1 = updateAt(index - 1, (inputRecord = item(index - 1, segs), new BusWireT_Segment(inputRecord.Index, item(index - 1, segs).Length + posDelta, inputRecord.WireId, inputRecord.IntersectOrJumpList, inputRecord.Draggable, inputRecord.Mode)), segs), updateAt(index + 1, (inputRecord_1 = item(index + 1, segs), new BusWireT_Segment(inputRecord_1.Index, item(index + 1, segs).Length - posDelta, inputRecord_1.WireId, inputRecord_1.IntersectOrJumpList, inputRecord_1.Draggable, inputRecord_1.Mode)), source_1)), wire.StartPos, wire.InitialOrientation);
}

/**
 * Change wires to move a wire segment represented by line to the given new value of P coordinate.
 * P is X or Y according to ori.
 */
export function moveLine(ori, newP, line, wires) {
    const matchValue = line.Seg1;
    if (matchValue != null) {
        const seg = matchValue;
        const oldP = (ori === "vertical") ? seg.Start.X : seg.Start.Y;
        const segIndex = seg.Segment.Index | 0;
        const wid = seg.Segment.WireId;
        if (newP !== oldP) {
            let updateWire;
            let mapping;
            const posDelta = newP - oldP;
            mapping = ((wire) => moveSegment(segIndex, posDelta, wire));
            updateWire = ((option) => map_2(mapping, option));
            return change(seg.Segment.WireId, updateWire, wires);
        }
        else {
            return wires;
        }
    }
    else {
        return toFail(printf("Can\'t move Line {line} - it is not a segment"));
    }
}

//# sourceMappingURL=BusWireRoutingHelpers.fs.js.map
