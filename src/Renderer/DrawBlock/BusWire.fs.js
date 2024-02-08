import { BusWireT_Msg, SymbolT_PortId, BusWireT_TextOffset_get_xLeftOffset, BusWireT_TextOffset_get_xOffset, BusWireT_TextOffset_get_yOffset, BusWireT_WireType_$reflection, BusWireT_Wire_$reflection, BusWireT_Segment, BusWireT_WireType } from "../Model/DrawModelType.fs.js";
import { makePolygon, Polygon, defaultPolygon, makePathFromAttr, makeLineAttr, makePartArcAttr, makeAnyPath, makeCircle, Circle, defaultCircle, Path, defaultPath, makeText, Text$ } from "../Common/DrawHelpers.fs.js";
import { interpolate, toFail, printf, toText, join, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { last, sort, singleton, item, cons, head, tail, isEmpty, reverse, pairwise, length as length_1, empty, mapIndexed, append, ofArray, fold, collect, map } from "../fable_modules/fable-library.4.1.4/List.js";
import { FSharpMap__get_Item, toList } from "../fable_modules/fable-library.4.1.4/Map.js";
import { HighLightColor__Text, XYPos_$reflection, Edge_$reflection, HighLightColor_$reflection, Connection, Port, XYPos } from "../Common/CommonTypes.fs.js";
import { max, min } from "../fable_modules/fable-library.4.1.4/Double.js";
import { comparePrimitives, int32ToString, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { getAbsSegments, segmentsToIssieVertices } from "./BlockHelpers.fs.js";
import { FSharpRef, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { record_type, bool_type, float64_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import * as react from "react";
import { StringModule_TryParseWith } from "../Common/EEExtensions.fs.js";
import { tryParse } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { instrumentTime, getTimeMs } from "../Common/TimeHelpers.fs.js";
import { getPortLocation } from "./Symbol.fs.js";
import { FunctionComponent_Of_60E46241 } from "../fable_modules/Fable.React.8.0.1/Fable.React.FunctionComponent.fs.js";
import { Helpers_equalsButFunctions } from "../fable_modules/Fable.React.8.0.1/Fable.React.Helpers.fs.js";
import { view as view_1 } from "./SymbolView.fs.js";

export const Constants_initialWireType = new BusWireT_WireType(0, []);

export const Constants_initialArrowDisplay = true;

export const Constants_jumpRadius = 5;

export const Constants_nubLength = 10;

export const Constants_cornerRadius = 7;

export const Constants_modernCircleRadius = 3;

export const Constants_modernCirclePositionTolerance = 2;

export const Constants_vertexLoadMatchTolerance = 0.01;

export const Constants_busWidthTextStyle = new Text$("left", "12px", "Bold", "Verdana, Arial, Helvetica, sans-serif", "", "none", "middle");

/**
 * Formats a SegmentId for logging purposes.
 */
export function formatSegmentId(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const wid = _arg[1];
    const index = _arg[0] | 0;
    const str = wid;
    return `${index}:${str.slice(0, 2 + 1)}`;
}

/**
 * Formats a WireId for logging purposes
 */
export function formatWireId(id) {
    let str_1;
    const str = id;
    str_1 = str;
    return str_1.slice(0, 2 + 1);
}

export function logSegmentId(seg) {
    const wIdStr = seg.WireId;
    return `${wIdStr.slice(0, 3 + 1)}:${seg.Index}`;
}

/**
 * Logs the given Segment and returns it unchanged. Used for debugging.
 */
export function logSegment(seg) {
    toConsole(`|${logSegmentId(seg)}|-Length: ${seg.Length}`);
    return seg;
}

/**
 * Logs the given ConnectionId and returns it unchanged. Used for debugging.
 */
export function logConnectionId(id) {
    let str_1;
    const str = id;
    str_1 = str;
    toConsole(`${str_1.slice(0, 2 + 1)}`);
    return id;
}

/**
 * Formats an intersection map for logging purposes.
 */
export function formatIntersectionMap(m) {
    return join(";\n", map((tupledArg) => {
        const segId = tupledArg[0];
        const lst = tupledArg[1];
        const segs = map((arg) => {
            const tupledArg_1 = arg[1];
            return formatSegmentId(tupledArg_1[0], tupledArg_1[1]);
        }, lst);
        return toText(`<${formatSegmentId(segId[0], segId[1])}->[${join(";", segs)}]`);
    }, toList(m)));
}

/**
 * Logs the intersection maps of a given model and returns it unchanged. Used for debugging
 */
export function logIntersectionMaps(model) {
    let intersections;
    const formatSegmentIntersections = (segments) => collect((segment) => map((_arg) => logSegmentId(segment), segment.IntersectOrJumpList), segments);
    intersections = map((tupledArg) => {
        const wId = tupledArg[0];
        const wire = tupledArg[1];
        return toText(`Wire ${formatWireId(wId)}: ${formatSegmentIntersections(wire.Segments)}`);
    }, toList(model.Wires));
    toConsole(printf("Intersections"));
    toConsole(`${intersections}`);
    toConsole(printf("---- --------------"));
    return model;
}

/**
 * Formats an XYPos for logging purposes.
 */
export function formatXY(xy) {
    return toText(`${[~~xy.X, ~~xy.Y]}`);
}

/**
 * Logs the given wire and returns it unchanged. Used for debugging.
 */
export function logWire(wire) {
    let wire_1, initPos, initOrientation, state_2;
    const formatSegments = (startPos, endPos, state, seg) => {
        const entry = toText(`|${seg.Index}:${logSegmentId(seg)}| Start: ${formatXY(startPos)}, End: ${formatXY(endPos)}`);
        return join("\n", [state, entry]);
    };
    const start = toText(`Wire: ${formatWireId(wire.WId)}`);
    toConsole(`${(wire_1 = wire, (initPos = wire_1.StartPos, (initOrientation = wire_1.InitialOrientation, (state_2 = fold((tupledArg, seg_1) => {
        const currState = tupledArg[0];
        const currPos = tupledArg[1];
        const currOrientation = tupledArg[2];
        let nextPos;
        const position = currPos;
        const length = seg_1.Length;
        nextPos = ((currOrientation === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)));
        const nextOrientation = (currOrientation === "vertical") ? "horizontal" : "vertical";
        const nextState = formatSegments(currPos, nextPos, currState, seg_1);
        return [nextState, nextPos, nextOrientation];
    }, [start, initPos, initOrientation], wire_1.Segments)[0], state_2))))}`);
    return wire;
}

/**
 * Tries to find and log a segment identified by index in a wire identified by wireId in the current model.
 * Assumes wireId can be found in the current model. Returns unit, used for debugging.
 */
export function logSegmentInModel(model, wireId, index) {
    const wire = FSharpMap__get_Item(model.Wires, wireId);
    const findAndFormatSeg = (segStart, segEnd, _state, seg) => {
        if (seg.Index === index) {
            let orientation;
            let matchValue;
            const segStart_1 = segStart;
            const segEnd_1 = segEnd;
            matchValue = ((Math.abs(segStart_1.X - segEnd_1.X) < 1E-07) ? "vertical" : ((Math.abs(segStart_1.Y - segEnd_1.Y) < 1E-07) ? "horizontal" : toFail(printf("ERROR: Diagonal wire"))));
            orientation = ((matchValue === "horizontal") ? "H" : "V");
            return toText(`[${logSegmentId(seg)}: ${formatXY(segStart)}->${formatXY(segEnd)}]-${orientation}-${seg.Index}`);
        }
        else {
            return void 0;
        }
    };
    let matchValue_1;
    const wire_1 = wire;
    const initPos = wire_1.StartPos;
    const initOrientation = wire_1.InitialOrientation;
    const state_2 = fold((tupledArg, seg_1) => {
        const currState = tupledArg[0];
        const currPos = tupledArg[1];
        const currOrientation = tupledArg[2];
        let nextPos;
        const position = currPos;
        const length = seg_1.Length;
        nextPos = ((currOrientation === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)));
        const nextOrientation = (currOrientation === "vertical") ? "horizontal" : "vertical";
        const nextState = findAndFormatSeg(currPos, nextPos, currState, seg_1);
        return [nextState, nextPos, nextOrientation];
    }, [void 0, initPos, initOrientation], wire_1.Segments)[0];
    matchValue_1 = state_2;
    if (matchValue_1 != null) {
        const str = matchValue_1;
        toConsole(`${str}`);
    }
    else {
        toConsole(`ERROR: Could not find segment ${index} in wire ${formatWireId(wireId)}`);
    }
}

/**
 * Tries to find and log each segment to its corresponding wire identified in wireSegmentIdPairs in the current model.
 * Returns the model unchanged. Used for debugging.
 */
export function logSegmentsInModel(model, wireSegmentIdPairs) {
    map((tupledArg) => ((index_1) => {
        const index = tupledArg[0] | 0;
        const wireId = tupledArg[1];
        logSegmentInModel(model, wireId, index_1);
    }), wireSegmentIdPairs);
    return model;
}

/**
 * Given the coordinates of two port locations that correspond
 * to the endpoints of a wire, as well as the final port orientation
 * this function returns a list of wire vertices.
 * The starting segment will always be from a Right Edge (and so in increasing X direction)
 */
export function makeInitialWireVerticesList(wireStartPos, wireEndPos, portOrientation) {
    const yStart = wireStartPos.Y;
    const yEnd = wireEndPos.Y;
    const xStart = wireStartPos.X;
    const xEnd = wireEndPos.X;
    let nubLength;
    const xDelta = xEnd - xStart;
    const yDelta = Math.abs(yEnd - yStart);
    let matchResult;
    switch (portOrientation.tag) {
        case 2: {
            if (xDelta > 0) {
                matchResult = 0;
            }
            else {
                matchResult = 2;
            }
            break;
        }
        case 0: {
            if (xDelta > 0) {
                matchResult = 1;
            }
            else {
                matchResult = 2;
            }
            break;
        }
        case 1: {
            if (xDelta > 0) {
                matchResult = 1;
            }
            else {
                matchResult = 2;
            }
            break;
        }
        default:
            matchResult = 2;
    }
    switch (matchResult) {
        case 0: {
            nubLength = min(Constants_nubLength, xDelta / 2);
            break;
        }
        case 1: {
            nubLength = min(Constants_nubLength, xDelta);
            break;
        }
        default:
            nubLength = Constants_nubLength;
    }
    const rightNub = ofArray([new XYPos(xStart, yStart), new XYPos(xStart + nubLength, yStart), new XYPos(xStart + nubLength, yStart)]);
    const rightwards = (xStart - xEnd) < 0;
    const downwards = (yStart - yEnd) < 0;
    if (rightwards) {
        if (downwards) {
            switch (portOrientation.tag) {
                case 3:
                    return append(rightNub, ofArray([new XYPos(xEnd + 10, yStart), new XYPos(xEnd + 10, yEnd), new XYPos(xEnd + nubLength, yEnd), new XYPos(xEnd + nubLength, yEnd), new XYPos(xEnd, yEnd)]));
                case 1:
                    return append(rightNub, ofArray([new XYPos((xEnd + xStart) / 2, yStart), new XYPos((xEnd + xStart) / 2, yEnd + 10), new XYPos(xEnd, yEnd + 10), new XYPos(xEnd, yEnd + nubLength), new XYPos(xEnd, yEnd + nubLength), new XYPos(xEnd, yEnd)]));
                case 2:
                    return append(rightNub, ofArray([new XYPos((xEnd + xStart) / 2, yStart), new XYPos((xEnd + xStart) / 2, yEnd), new XYPos(xEnd - nubLength, yEnd), new XYPos(xEnd - nubLength, yEnd), new XYPos(xEnd, yEnd)]));
                default:
                    return append(rightNub, ofArray([new XYPos(xEnd, yStart), new XYPos(xEnd, yEnd - nubLength), new XYPos(xEnd, yEnd - nubLength), new XYPos(xEnd, yEnd)]));
            }
        }
        else {
            switch (portOrientation.tag) {
                case 3:
                    return append(rightNub, ofArray([new XYPos(xEnd + 10, yStart), new XYPos(xEnd + 10, yEnd), new XYPos(xEnd + nubLength, yEnd), new XYPos(xEnd + nubLength, yEnd), new XYPos(xEnd, yEnd)]));
                case 0:
                    return append(rightNub, ofArray([new XYPos((xEnd + xStart) / 2, yStart), new XYPos((xEnd + xStart) / 2, yEnd - 10), new XYPos(xEnd, yEnd - 10), new XYPos(xEnd, yEnd - nubLength), new XYPos(xEnd, yEnd - nubLength), new XYPos(xEnd, yEnd)]));
                case 2:
                    return append(rightNub, ofArray([new XYPos((xEnd + xStart) / 2, yStart), new XYPos((xEnd + xStart) / 2, yEnd), new XYPos(xEnd - nubLength, yEnd), new XYPos(xEnd - nubLength, yEnd), new XYPos(xEnd, yEnd)]));
                default:
                    return append(rightNub, ofArray([new XYPos(xEnd, yStart), new XYPos(xEnd, yEnd + nubLength), new XYPos(xEnd, yEnd + nubLength), new XYPos(xEnd, yEnd)]));
            }
        }
    }
    else if (downwards) {
        switch (portOrientation.tag) {
            case 3:
                return append(rightNub, ofArray([new XYPos((xStart + nubLength) + 10, yStart), new XYPos((xStart + nubLength) + 10, yEnd), new XYPos(xEnd + nubLength, yEnd), new XYPos(xEnd + nubLength, yEnd), new XYPos(xEnd, yEnd)]));
            case 0:
                return ofArray([new XYPos(xStart, yStart), new XYPos(xStart + nubLength, yStart), new XYPos(xStart + nubLength, (yStart + yEnd) / 2), new XYPos(xEnd, (yStart + yEnd) / 2), new XYPos(xEnd, yEnd - nubLength), new XYPos(xEnd, yEnd - nubLength), new XYPos(xEnd, yEnd)]);
            case 2:
                return append(rightNub, ofArray([new XYPos((xStart + nubLength) + 10, yStart), new XYPos((xStart + nubLength) + 10, (yStart + yEnd) / 2), new XYPos(xEnd - 10, (yStart + yEnd) / 2), new XYPos(xEnd - 10, yEnd), new XYPos(xEnd - nubLength, yEnd), new XYPos(xEnd - nubLength, yEnd), new XYPos(xEnd, yEnd)]));
            default:
                return append(rightNub, ofArray([new XYPos((xStart + nubLength) + 10, yStart), new XYPos((xStart + nubLength) + 10, yEnd + 10), new XYPos(xEnd, yEnd + 10), new XYPos(xEnd, yEnd + nubLength), new XYPos(xEnd, yEnd + nubLength), new XYPos(xEnd, yEnd)]));
        }
    }
    else {
        switch (portOrientation.tag) {
            case 3:
                return append(rightNub, ofArray([new XYPos((xStart + nubLength) + 10, yStart), new XYPos((xStart + nubLength) + 10, yEnd), new XYPos(xEnd + nubLength, yEnd), new XYPos(xEnd + nubLength, yEnd), new XYPos(xEnd, yEnd)]));
            case 1:
                return ofArray([new XYPos(xStart, yStart), new XYPos(xStart + nubLength, yStart), new XYPos(xStart + nubLength, (yStart + yEnd) / 2), new XYPos(xEnd, (yStart + yEnd) / 2), new XYPos(xEnd, yEnd + nubLength), new XYPos(xEnd, yEnd + nubLength), new XYPos(xEnd, yEnd)]);
            case 2:
                return append(rightNub, ofArray([new XYPos((xStart + nubLength) + 10, yStart), new XYPos((xStart + nubLength) + 10, (yStart + yEnd) / 2), new XYPos(xEnd - 10, (yStart + yEnd) / 2), new XYPos(xEnd - 10, yEnd), new XYPos(xEnd - nubLength, yEnd), new XYPos(xEnd - nubLength, yEnd), new XYPos(xEnd, yEnd)]));
            default:
                return ofArray([new XYPos(xStart, yStart), new XYPos(xStart + nubLength, yStart), new XYPos(xStart + nubLength, yEnd - 10), new XYPos(xEnd, yEnd - 10), new XYPos(xEnd, yEnd - nubLength), new XYPos(xEnd, yEnd - nubLength), new XYPos(xEnd, yEnd)]);
        }
    }
}

/**
 * Converts a list of vertices into a list of segments
 */
export function xyVerticesToSegments(connId, xyVerticesList) {
    return mapIndexed((i, tupledArg) => {
        const _arg = tupledArg[0];
        const _arg_1 = tupledArg[1];
        const yStart = _arg.Y;
        const xStart = _arg.X;
        const yEnd = _arg_1.Y;
        const xEnd = _arg_1.X;
        return new BusWireT_Segment(i, ((xEnd - xStart) + yEnd) - yStart, connId, empty(), !((i === 0) ? true : (i === (length_1(xyVerticesList) - 2))), "auto");
    }, pairwise(xyVerticesList));
}

/**
 * Given the coordinates of two port locations that correspond
 * to the endpoints of a wire, as well as the orientation of the final port
 * this function returns a list of Segment(s).
 * The starting segment will always be from a Right Edge (and so in increasing X direction)
 */
export function makeInitialSegmentsList(hostId, startPos, endPos, portOrientation) {
    return xyVerticesToSegments(hostId, makeInitialWireVerticesList(startPos, endPos, portOrientation));
}

/**
 * Convert a (possibly legacy) issie Connection stored as a list of vertices to a list of segments
 */
export function issieVerticesToSegments(connId, verticesList) {
    const verticesList$0027 = map((tupledArg) => {
        const x = tupledArg[0];
        const y = tupledArg[1];
        const m = tupledArg[2];
        const mode = m ? "manual" : "auto";
        return {
            Mode: mode,
            Pos: new XYPos(x, y),
        };
    }, verticesList);
    const verticesToSegments = (connId_1, xyVerticesList) => {
        const segT = (v1, v2) => {
            let delta;
            const left = v1;
            const right = v2;
            delta = (new XYPos(left.X - right.X, left.Y - right.Y));
            if ((Math.abs(delta.X) + Math.abs(delta.Y)) < 1E-07) {
                return void 0;
            }
            else if (Math.abs(delta.Y) < 1E-07) {
                return "horizontal";
            }
            else if (Math.abs(delta.X) < 1E-07) {
                return "vertical";
            }
            else {
                return toFail(printf("Diagonal vertices read in Wire"));
            }
        };
        const makeCorrectOrientationPairs = (verts) => {
            let lst, v1_1, v2_1, tupledArg_2, _arg_1, vL_1, v2_3, v1_3;
            return reverse(!isEmpty(verts) ? (!isEmpty(tail(verts)) ? ((lst = tail(tail(verts)), (v1_1 = head(verts), (v2_1 = head(tail(verts)), (tupledArg_2 = fold((tupledArg_1, v3) => {
                let d2, d1;
                const _arg = tupledArg_1[0];
                const vL = tupledArg_1[1];
                const v2_2 = _arg[0];
                const v1_2 = _arg[1];
                const matchValue = segT(v1_2.Pos, v2_2.Pos);
                const matchValue_1 = segT(v2_2.Pos, v3.Pos);
                if (matchValue != null) {
                    if (matchValue_1 != null) {
                        if ((d2 = matchValue_1, (d1 = matchValue, d1 === d2))) {
                            const d1_1 = matchValue;
                            const d2_1 = matchValue_1;
                            return [[v3, v1_2], vL];
                        }
                        else {
                            return [[v3, v2_2], cons([v2_2, v1_2], vL)];
                        }
                    }
                    else {
                        return [[v2_2, v1_2], vL];
                    }
                }
                else {
                    return [[v3, v2_2], vL];
                }
            }, [[v2_1, v1_1], empty()], lst), (_arg_1 = tupledArg_2[0], (vL_1 = tupledArg_2[1], (v2_3 = _arg_1[0], (v1_3 = _arg_1[1], equals(segT(v2_3.Pos, v1_3.Pos), void 0) ? vL_1 : cons([v2_3, v1_3], vL_1)))))))))) : empty()) : empty());
        };
        return mapIndexed((i, tupledArg_3) => {
            const endVertex = tupledArg_3[0];
            const startVertex = tupledArg_3[1];
            return new BusWireT_Segment(i, ((endVertex.Pos.X - startVertex.Pos.X) + endVertex.Pos.Y) - startVertex.Pos.Y, connId_1, empty(), !((i === 0) ? true : (i === (length_1(xyVerticesList) - 2))), endVertex.Mode);
        }, makeCorrectOrientationPairs(xyVerticesList));
    };
    return verticesToSegments(connId, verticesList$0027);
}

/**
 * This function is given a ConnectionId and it
 * converts the corresponding BusWire.Wire type to a
 * Connection type, offering an interface
 * between our implementation and Issie.
 */
export function extractConnection(wModel, cId) {
    let inputRecord, inputRecord_1;
    const conn = FSharpMap__get_Item(wModel.Wires, cId);
    const strOutputPort = conn.OutputPort;
    const strInputPort = conn.InputPort;
    const strId = conn.WId;
    return new Connection(strId, (inputRecord = FSharpMap__get_Item(wModel.Symbol.Ports, strOutputPort), new Port(inputRecord.Id, void 0, inputRecord.PortType, inputRecord.HostId)), (inputRecord_1 = FSharpMap__get_Item(wModel.Symbol.Ports, strInputPort), new Port(inputRecord_1.Id, void 0, inputRecord_1.PortType, inputRecord_1.HostId)), segmentsToIssieVertices(conn.Segments, conn));
}

/**
 * This function is given a list of ConnectionId and it
 * converts the corresponding BusWire.Wire(s) to a
 * list of Connections, offering an interface
 * between our implementation and Issie.
 */
export function extractConnections(wModel) {
    return map((tupledArg) => {
        const key = tupledArg[0];
        return extractConnection(wModel, key);
    }, toList(wModel.Wires));
}

export class WireRenderProps extends Record {
    constructor(key, Wire, ColorP, StrokeWidthP, OutputPortEdge, OutputPortLocation, DisplayType, ArrowDisplay, TriangleEdge, InputPortLocation) {
        super();
        this.key = key;
        this.Wire = Wire;
        this.ColorP = ColorP;
        this.StrokeWidthP = StrokeWidthP;
        this.OutputPortEdge = OutputPortEdge;
        this.OutputPortLocation = OutputPortLocation;
        this.DisplayType = DisplayType;
        this.ArrowDisplay = ArrowDisplay;
        this.TriangleEdge = TriangleEdge;
        this.InputPortLocation = InputPortLocation;
    }
}

export function WireRenderProps_$reflection() {
    return record_type("BusWire.WireRenderProps", [], WireRenderProps, () => [["key", string_type], ["Wire", BusWireT_Wire_$reflection()], ["ColorP", HighLightColor_$reflection()], ["StrokeWidthP", float64_type], ["OutputPortEdge", Edge_$reflection()], ["OutputPortLocation", XYPos_$reflection()], ["DisplayType", BusWireT_WireType_$reflection()], ["ArrowDisplay", bool_type], ["TriangleEdge", Edge_$reflection()], ["InputPortLocation", XYPos_$reflection()]]);
}

export function renderWireWidthText(props) {
    const textStyle = new Text$(Constants_busWidthTextStyle.TextAnchor, Constants_busWidthTextStyle.FontSize, Constants_busWidthTextStyle.FontWeight, Constants_busWidthTextStyle.FontFamily, HighLightColor__Text(props.ColorP), Constants_busWidthTextStyle.UserSelect, Constants_busWidthTextStyle.DominantBaseline);
    const text = (props.Wire.Width === 1) ? "" : int32ToString(props.Wire.Width);
    const outPos = props.OutputPortLocation;
    const yOffset = BusWireT_TextOffset_get_yOffset();
    const xOffset = BusWireT_TextOffset_get_xOffset();
    const xLeftOffset = BusWireT_TextOffset_get_xLeftOffset();
    const matchValue = props.OutputPortEdge;
    switch (matchValue.tag) {
        case 1:
            return makeText(outPos.X + xOffset, outPos.Y + yOffset, text, textStyle);
        case 3:
            return makeText(outPos.X + xOffset, outPos.Y - yOffset, text, textStyle);
        case 2:
            return makeText(outPos.X - xLeftOffset, outPos.Y - yOffset, text, textStyle);
        default:
            return makeText(outPos.X + xOffset, outPos.Y - yOffset, text, textStyle);
    }
}

/**
 * Creates the SVG command string required to render the wire
 * (apart from the final "nub") with a radial display type
 */
export function renderRadialWireSVG(state_, state__1, segmentpair) {
    const state = [state_, state__1];
    const seg1Start = segmentpair.First.Start;
    const seg1End = segmentpair.First.End;
    const seg2Start = segmentpair.Second.Start;
    const seg2End = segmentpair.Second.End;
    let dist1;
    let vec;
    const left = seg1Start;
    const right = seg1End;
    vec = (new XYPos(left.X - right.X, left.Y - right.Y));
    dist1 = Math.sqrt(Math.pow(vec.X, 2) + Math.pow(vec.Y, 2));
    let dist2;
    let vec_1;
    const left_1 = seg2Start;
    const right_1 = seg2End;
    vec_1 = (new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y));
    dist2 = Math.sqrt(Math.pow(vec_1.X, 2) + Math.pow(vec_1.Y, 2));
    const rad = Math.floor(min(Constants_cornerRadius, max(0, min(dist1 / 2, dist2 / 2))));
    const makeCommandString = (xStart, yStart, rad_1, sweepflag, xEnd, yEnd) => (`L ${xStart} ${yStart} A ${rad_1} ${rad_1}, 45, 0, ${sweepflag}, ${xEnd} ${yEnd}`);
    if (((seg1Start.X === seg1End.X) && (seg1Start.X === seg2Start.X)) && (seg1Start.X === seg2End.X)) {
        const current = toText(printf("L %f %f"))(seg1End.X)(seg1End.Y);
        if (state[1] === "horizontal") {
            return [state[0] + current, "vertical"];
        }
        else {
            return [state[0] + current, "horizontal"];
        }
    }
    else if (((seg1Start.Y === seg1End.Y) && (seg1Start.Y === seg2Start.Y)) && (seg1Start.Y === seg2End.Y)) {
        const current_1 = toText(printf("L %f %f"))(seg1End.X)(seg1End.Y);
        if (state[1] === "horizontal") {
            return [state[0] + current_1, "vertical"];
        }
        else {
            return [state[0] + current_1, "horizontal"];
        }
    }
    else if (state[1] === "horizontal") {
        if ((seg1Start.X - seg1End.X) > 0) {
            if ((seg2Start.Y - seg2End.Y) > 0) {
                const current_2 = makeCommandString(seg1End.X + rad, seg1End.Y, rad, 1, seg2Start.X, seg2Start.Y - rad);
                return [state[0] + current_2, "vertical"];
            }
            else {
                const current_3 = makeCommandString(seg1End.X + rad, seg1End.Y, rad, 0, seg2Start.X, seg2Start.Y + rad);
                return [state[0] + current_3, "vertical"];
            }
        }
        else if ((seg2Start.Y - seg2End.Y) > 0) {
            const current_4 = makeCommandString(seg1End.X - rad, seg1End.Y, rad, 0, seg2Start.X, seg2Start.Y - rad);
            return [state[0] + current_4, "vertical"];
        }
        else {
            const current_5 = makeCommandString(seg1End.X - rad, seg1End.Y, rad, 1, seg2Start.X, seg2Start.Y + rad);
            return [state[0] + current_5, "vertical"];
        }
    }
    else if ((seg1Start.Y - seg1End.Y) > 0) {
        if ((seg2Start.X - seg2End.X) > 0) {
            const current_6 = makeCommandString(seg1End.X, seg1End.Y + rad, rad, 0, seg2Start.X - rad, seg2Start.Y);
            return [state[0] + current_6, "horizontal"];
        }
        else {
            const current_7 = makeCommandString(seg1End.X, seg1End.Y + rad, rad, 1, seg2Start.X + rad, seg2Start.Y);
            return [state[0] + current_7, "horizontal"];
        }
    }
    else if ((seg2Start.X - seg2End.X) > 0) {
        const current_8 = makeCommandString(seg1End.X, seg1End.Y - rad, rad, 1, seg2Start.X - rad, seg2Start.Y);
        return [state[0] + current_8, "horizontal"];
    }
    else {
        const current_9 = makeCommandString(seg1End.X, seg1End.Y - rad, rad, 0, seg2Start.X + rad, seg2Start.Y);
        return [state[0] + current_9, "horizontal"];
    }
}

export function renderModernWire(props) {
    const colour = HighLightColor__Text(props.ColorP);
    const segments = getAbsSegments(props.Wire);
    const lineAttr = join(" ", map((seg) => toText(interpolate("L %.2f%P() %.2f%P()", [seg.End.X, seg.End.Y])), segments));
    const pathPars = new Path(colour, props.StrokeWidthP.toString(), defaultPath.StrokeDashArray, defaultPath.StrokeLinecap, defaultPath.Fill);
    const circleParameters = new Circle(Constants_modernCircleRadius, colour, defaultCircle.StrokeWidth, defaultCircle.FillOpacity, colour);
    const circles = (segments_1) => collect((aseg) => {
        const seg_1 = aseg.Segment;
        return map((x) => makeCircle(x, aseg.Start.Y, circleParameters), seg_1.IntersectOrJumpList);
    }, segments_1);
    const children = cons(makeAnyPath(item(0, segments).Start, lineAttr, pathPars), circles(segments));
    return react.createElement("g", {}, ...children);
}

export function renderJumpSegment(a) {
    let matchValue, jL, jL_1;
    const sPos = a.Start;
    const ePos = a.End;
    const jR = Constants_jumpRadius;
    const rightTravel = ePos.X > sPos.X;
    const dir = rightTravel ? 1 : -1;
    const makePartArc = (d1, d2) => {
        if ((Math.abs(d1) > jR) ? true : (Math.abs(d2) > jR)) {
            toFail(printf("d1={d1}, d2={d2}, jR={jR}"));
        }
        const h1 = Math.sqrt(max(0, (jR * jR) - (d1 * d1)));
        const h2 = Math.sqrt(max(0, (jR * jR) - (d2 * d2)));
        return makePartArcAttr(jR, h1, d1, h2, d2);
    };
    const makeJumpPathAttr = (jLst, xPos) => {
        let xJ, yJ, xJ_1, jLst$0027, xJ_2;
        if (!isEmpty(jLst)) {
            if ((xJ = head(jLst), Math.abs(xJ - xPos) > jR)) {
                const xJ_3 = head(jLst);
                return cons(makeLineAttr((xJ_3 - xPos) - (dir * jR), 0), makeJumpPathAttr(jLst, xJ_3 - (dir * (jR - 1E-07))));
            }
            else if (!isEmpty(tail(jLst))) {
                if ((yJ = head(tail(jLst)), (xJ_1 = head(jLst), (jLst$0027 = tail(jLst), Math.abs(yJ - xJ_1) > (2 * jR))))) {
                    const jLst$0027_1 = tail(jLst);
                    const xJ_6 = head(jLst);
                    const yJ_1 = head(tail(jLst));
                    return cons(makePartArc(xJ_6 - xPos, dir * jR), makeJumpPathAttr(jLst$0027_1, xJ_6 + (dir * jR)));
                }
                else {
                    const jLst$0027_2 = tail(jLst);
                    const xJ_7 = head(jLst);
                    const yJ_2 = head(tail(jLst));
                    return cons(makePartArc(xJ_7 - xPos, (yJ_2 - xJ_7) / 2), makeJumpPathAttr(jLst$0027_2, (yJ_2 + xJ_7) / 2));
                }
            }
            else if ((xJ_2 = head(jLst), Math.abs(ePos.X - xJ_2) < jR)) {
                const xJ_4 = head(jLst);
                return singleton(makePartArc(xJ_4 - xPos, ePos.X - xJ_4));
            }
            else {
                const xJ_5 = head(jLst);
                return cons(makePartArc(xJ_5 - xPos, dir * jR), makeJumpPathAttr(empty(), xJ_5 + (dir * jR)));
            }
        }
        else {
            return singleton(makeLineAttr(ePos.X - xPos, 0));
        }
    };
    const jLst_1 = map((f) => ((f * dir) + sPos.X), (matchValue = a.Segment.IntersectOrJumpList, rightTravel ? ((jL = matchValue, sort(jL, {
        Compare: comparePrimitives,
    }))) : ((jL_1 = matchValue, sort(jL_1, {
        Compare: comparePrimitives,
    })))));
    const matchValue_2 = Math.abs(sPos.X - ePos.X) < 1E-07;
    let matchResult;
    if (matchValue_2) {
        matchResult = 0;
    }
    else if (isEmpty(jLst_1)) {
        matchResult = 0;
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return singleton(`L ${ePos.X} ${ePos.Y}`);
        default: {
            const jLst_2 = jLst_1;
            return makeJumpPathAttr(jLst_2, sPos.X);
        }
    }
}

/**
 * Function used to render a single wire if the display type is jump
 */
export function renderJumpWire(props) {
    const absSegments = getAbsSegments(props.Wire);
    const firstVertex = head(absSegments).Start;
    const colour = HighLightColor__Text(props.ColorP);
    let renderedSegmentList;
    const pathPars = new Path(colour, props.StrokeWidthP.toString(), defaultPath.StrokeDashArray, defaultPath.StrokeLinecap, defaultPath.Fill);
    renderedSegmentList = singleton(makeAnyPath(firstVertex, join(" ", collect(renderJumpSegment, absSegments)), pathPars));
    const children = append(singleton(renderWireWidthText(props)), renderedSegmentList);
    return react.createElement("g", {}, ...children);
}

/**
 * Function used to render a single wire if the display type is radial
 */
export function renderRadialWire(props) {
    let segStart, segEnd;
    const absSegments = getAbsSegments(props.Wire);
    const firstVertex = head(absSegments).Start;
    const secondVertex = head(absSegments).End;
    const lastVertex = last(absSegments).End;
    const width = props.StrokeWidthP.toString();
    const widthOpt = StringModule_TryParseWith((arg) => {
        let outArg = 0;
        return [tryParse(arg, 511, false, 32, new FSharpRef(() => outArg, (v) => {
            outArg = (v | 0);
        })), outArg];
    })(width);
    const pathParameters = new Path(HighLightColor__Text(props.ColorP), width, defaultPath.StrokeDashArray, defaultPath.StrokeLinecap, defaultPath.Fill);
    const initialMoveCommand = toText(printf("M %f %f "))(firstVertex.X)(firstVertex.Y);
    const initialState = [initialMoveCommand, (segStart = firstVertex, (segEnd = secondVertex, (Math.abs(segStart.X - segEnd.X) < 1E-07) ? "vertical" : ((Math.abs(segStart.Y - segEnd.Y) < 1E-07) ? "horizontal" : toFail(printf("ERROR: Diagonal wire")))))];
    const radialPathCommands = fold((tupledArg, segmentpair) => renderRadialWireSVG(tupledArg[0], tupledArg[1], segmentpair), initialState, map((x) => ({
        First: x[0],
        Second: x[1],
    }), pairwise(absSegments)))[0];
    const finalLineCommand = toText(printf("L %f %f"))(lastVertex.X)(lastVertex.Y);
    const fullPathCommand = radialPathCommands + finalLineCommand;
    const renderedSVGPath = makePathFromAttr(fullPathCommand, pathParameters);
    const children = append(singleton(renderWireWidthText(props)), singleton(renderedSVGPath));
    return react.createElement("g", {}, ...children);
}

/**
 * Function that will render all of the wires within the model, with the display type being set in Model.Type
 */
export function view(model, dispatch) {
    const start = getTimeMs();
    instrumentTime("WirePropsSort", start);
    const rStart = getTimeMs();
    const wireProps = (wire) => {
        let n, s_2, portIdStr_2, portId_7, id_1_1, id_2, model_6, portIdStr_3, port_1, sId_1;
        let outPortId;
        const s = wire.OutputPort;
        outPortId = s;
        const outputPortLocation = getPortLocation(void 0, model.Symbol, outPortId);
        let outputPortEdge;
        let portIdStr;
        const portId_3 = new SymbolT_PortId(1, [wire.OutputPort]);
        if (portId_3.tag === 1) {
            const id_1 = portId_3.fields[0];
            portIdStr = id_1;
        }
        else {
            const id = portId_3.fields[0];
            portIdStr = id;
        }
        const model_3 = model.Symbol;
        const portIdStr_1 = portIdStr;
        const port = FSharpMap__get_Item(model_3.Ports, portIdStr_1);
        const sId = port.HostId;
        outputPortEdge = FSharpMap__get_Item(FSharpMap__get_Item(model_3.Symbols, sId).PortMaps.Orientation, portIdStr_1);
        let stringInId;
        const s_1 = wire.InputPort;
        stringInId = s_1;
        const inputPortLocation = getPortLocation(void 0, model.Symbol, stringInId);
        let strokeWidthP;
        const matchValue = wire.Width | 0;
        if (matchValue === 1) {
            strokeWidthP = 1.5;
        }
        else if ((n = (matchValue | 0), n < 8)) {
            const n_1 = matchValue | 0;
            strokeWidthP = 2.5;
        }
        else {
            strokeWidthP = 3;
        }
        return new WireRenderProps((s_2 = wire.WId, s_2), wire, wire.Color, strokeWidthP, outputPortEdge, outputPortLocation, model.Type, model.ArrowDisplay, (portIdStr_2 = ((portId_7 = (new SymbolT_PortId(0, [wire.InputPort])), (portId_7.tag === 1) ? ((id_1_1 = portId_7.fields[0], id_1_1)) : ((id_2 = portId_7.fields[0], id_2)))), (model_6 = model.Symbol, (portIdStr_3 = portIdStr_2, (port_1 = FSharpMap__get_Item(model_6.Ports, portIdStr_3), (sId_1 = port_1.HostId, FSharpMap__get_Item(FSharpMap__get_Item(model_6.Symbols, sId_1).PortMaps.Orientation, portIdStr_3)))))), inputPortLocation);
    };
    const renderWire = FunctionComponent_Of_60E46241((props) => {
        let wireReact;
        const matchValue_2 = props.DisplayType;
        wireReact = ((matchValue_2.tag === 2) ? renderJumpWire(props) : ((matchValue_2.tag === 1) ? renderModernWire(props) : renderRadialWire(props)));
        const polygon = new Polygon(defaultPolygon.Stroke, defaultPolygon.StrokeWidth, defaultPolygon.FillOpacity, "black");
        const y = props.InputPortLocation.Y;
        const x = props.InputPortLocation.X;
        const ws = min(2.5, props.StrokeWidthP);
        let str;
        const matchValue_5 = props.TriangleEdge;
        str = ((matchValue_5.tag === 1) ? (`${x},${y},${x + ws},${y + (2 * ws)},${x - ws},${y + (2 * ws)}`) : ((matchValue_5.tag === 3) ? (`${x},${y},${x + (2 * ws)},${y + ws},${x + (2 * ws)},${y - ws}`) : ((matchValue_5.tag === 2) ? (`${x},${y},${x - (2 * ws)},${y + ws},${x - (2 * ws)},${y - ws}`) : (`${x},${y},${x + ws},${y - (2 * ws)},${x - ws},${y - (2 * ws)}`))));
        const arrows = props.ArrowDisplay ? singleton(makePolygon(str, polygon)) : empty();
        const children = append(arrows, singleton(wireReact));
        return react.createElement("g", {}, ...children);
    }, "Wire", Helpers_equalsButFunctions, void 0, "view", "/Users/advik/Documents/imperial/HLP/issie/src/Renderer/DrawBlock/BusWire.fs", 711);
    const symbols = view_1(model.Symbol, (arg_1) => {
        dispatch(new BusWireT_Msg(0, [arg_1]));
    });
    const wires = map((tupledArg) => {
        const wire_1 = tupledArg[1];
        return renderWire(wireProps(wire_1));
    }, toList(model.Wires));
    return react.createElement("g", {}, ...cons(symbols, wires));
}

//# sourceMappingURL=BusWire.fs.js.map
