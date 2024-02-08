import { concat, ofArray, exists, tryFind, sum, length as length_1, item, head, filter, ofSeq, empty, cons, reverse, scan, map as map_1, fold } from "../fable_modules/fable-library.4.1.4/List.js";
import { tryFind as tryFind_1, filter as filter_1, values, FSharpMap__get_Item, containsKey, find, toList, FSharpMap__get_Values, map, add } from "../fable_modules/fable-library.4.1.4/Map.js";
import { Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { BusWireT_Model, BusWireT_Wire, BusWireT_ASegment, SymbolT_Model, SymbolT_Symbol, BusWireT_wires_, BusWireT_symbol_, SymbolT_symbols_ } from "../Model/DrawModelType.fs.js";
import { XYPos_$reflection, Edge, BoundingBox, Component, XYPos } from "../Common/CommonTypes.fs.js";
import { max, min } from "../fable_modules/fable-library.4.1.4/Double.js";
import { List_distinct, List_distinctBy, List_groupBy } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { compare, safeHash, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { ofList } from "../fable_modules/fable-library.4.1.4/Set.js";
import { toList as toList_1 } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { record_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";

export const Constants_intervalTolerance = 0.0001;

/**
 * Update BusWire model with given symbols. Can also be used to add new symbols.
 * This uses a fold on the Map to add symbols which makes it fast in the case that the number
 * of symbols added is very small.
 */
export function updateModelSymbols(model, symbols) {
    const symbols$0027 = fold((symMap, symToAdd) => add(symToAdd.Id, symToAdd, symMap), model.Symbol.Symbols, symbols);
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_symbols_)(BusWireT_symbol_))(symbols$0027)(model);
}

/**
 * Update BusWire model with given wires. Can also be used to add new wires.
 * This uses a fold on the Map to add wires which makes it fast in the case that the number
 * of wires added is small.
 */
export function updateModelWires(model, wiresToAdd) {
    return Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), BusWireT_wires_)((wireMap) => fold((wireMap_1, wireToAdd) => add(wireToAdd.WId, wireToAdd, wireMap_1), wireMap, wiresToAdd))(model);
}

export function moveSymbol(offset, sym) {
    let inputRecord_1, left_1, right_1;
    let newPos;
    const left = sym.Pos;
    const right = offset;
    newPos = (new XYPos(left.X + right.X, left.Y + right.Y));
    let comp$0027;
    const inputRecord = sym.Component;
    comp$0027 = (new Component(inputRecord.Id, inputRecord.Type, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, newPos.X, newPos.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo));
    return new SymbolT_Symbol(newPos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, (inputRecord_1 = sym.LabelBoundingBox, new BoundingBox((left_1 = sym.LabelBoundingBox.TopLeft, (right_1 = offset, new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y))), inputRecord_1.W, inputRecord_1.H)), sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, comp$0027, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
}

export function moveSymbols(offset, model) {
    return new SymbolT_Model(map((_arg, symbol) => moveSymbol(offset, symbol), model.Symbols), model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
}

/**
 * Returns true if two 1D line segments intersect
 * HLP23: Derek Lai (ddl20)
 */
export function overlap1D(_arg2_, _arg2__1, _arg1_, _arg1__1) {
    const _arg = [_arg2_, _arg2__1];
    const _arg_1 = [_arg1_, _arg1__1];
    const a2 = _arg[1];
    const a1 = _arg[0];
    const b2 = _arg_1[1];
    const b1 = _arg_1[0];
    const a_min = min(a1, a2);
    const a_max = max(a1, a2);
    const b_min = min(b1, b2);
    const b_max = max(b1, b2);
    if (a_max >= b_min) {
        return b_max >= a_min;
    }
    else {
        return false;
    }
}

/**
 * Converts a segment list into a list of vertices to store inside Connection
 */
export function segmentsToIssieVertices(segList, wire) {
    return map_1((tupledArg_1) => {
        const pos = tupledArg_1[0];
        const manual_1 = tupledArg_1[2];
        return [pos.X, pos.Y, manual_1];
    }, scan((tupledArg, seg) => {
        const currPos = tupledArg[0];
        const currOrientation = tupledArg[1];
        const patternInput = (currOrientation === "vertical") ? [new XYPos(currPos.X, currPos.Y + seg.Length), "horizontal"] : [new XYPos(currPos.X + seg.Length, currPos.Y), "vertical"];
        const nextPos = patternInput[0];
        const nextOrientation = patternInput[1];
        const manual = seg.Mode === "manual";
        return [nextPos, nextOrientation, manual];
    }, [wire.StartPos, wire.InitialOrientation, false], segList));
}

/**
 * Returns true if two Boxes intersect, where each box is passed in as top right and bottom left XYPos tuples
 * HLP23: Derek Lai (ddl20)
 */
export function overlap2D(_arg2_, _arg2__1, _arg1_, _arg1__1) {
    const _arg = [_arg2_, _arg2__1];
    const _arg_1 = [_arg1_, _arg1__1];
    const a2 = _arg[1];
    const a1 = _arg[0];
    const b2 = _arg_1[1];
    const b1 = _arg_1[0];
    if (overlap1D(a1.X, a2.X, b1.X, b2.X)) {
        return overlap1D(a1.Y, a2.Y, b1.Y, b2.Y);
    }
    else {
        return false;
    }
}

/**
 * Returns true if two Boxes intersect, where each box is passed in as a BoundingBox
 * HLP23: Derek Lai (ddl20)
 */
export function overlap2DBox(bb1, bb2) {
    const bb1Coords = [new XYPos(bb1.TopLeft.X, bb1.TopLeft.Y), new XYPos(bb1.TopLeft.X + bb1.W, bb1.TopLeft.Y + bb1.H)];
    const bb2Coords = [new XYPos(bb2.TopLeft.X, bb2.TopLeft.Y), new XYPos(bb2.TopLeft.X + bb2.W, bb2.TopLeft.Y + bb2.H)];
    return overlap2D(bb1Coords[0], bb1Coords[1], bb2Coords[0], bb2Coords[1]);
}

/**
 * Return absolute segment list from a wire.
 * NB - it is often more efficient to use various fold functions (foldOverSegs etc)
 */
export function getAbsSegments(wire) {
    const convertToAbs = (_arg, seg) => {
        let position, length;
        const start = _arg[0];
        const dir = _arg[1];
        return new BusWireT_ASegment(start, (position = start, (length = seg.Length, (dir === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)))), seg);
    };
    return reverse(fold((tupledArg, seg_1) => {
        const posDir = tupledArg[0];
        const aSegL = tupledArg[1];
        const nextASeg = convertToAbs(posDir, seg_1);
        const posDir$0027 = [nextASeg.End, (posDir[1] === "vertical") ? "horizontal" : "vertical"];
        return [posDir$0027, cons(nextASeg, aSegL)];
    }, [[wire.StartPos, wire.InitialOrientation], empty()], wire.Segments)[1]);
}

/**
 * Return absolute segment list from a wire.
 * NB - it is often more efficient to use various fold functions (foldOverSegs etc)
 */
export function getNonZeroAbsSegments(wire) {
    const convertToAbs = (_arg, seg) => {
        let position, length;
        const start = _arg[0];
        const dir = _arg[1];
        return new BusWireT_ASegment(start, (position = start, (length = seg.Length, (dir === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)))), seg);
    };
    return reverse(fold((tupledArg, seg_1) => {
        const posDir = tupledArg[0];
        const aSegL = tupledArg[1];
        const nextASeg = convertToAbs(posDir, seg_1);
        const posDir$0027 = [nextASeg.End, (posDir[1] === "vertical") ? "horizontal" : "vertical"];
        if (!(Math.abs(seg_1.Length) < 1E-07)) {
            return [posDir$0027, cons(nextASeg, aSegL)];
        }
        else {
            return [posDir$0027, aSegL];
        }
    }, [[wire.StartPos, wire.InitialOrientation], empty()], wire.Segments)[1]);
}

/**
 * Return filtered absolute segment list from a wire.
 * includeSegment determines whether a given segment is included in the output list.
 * NB this is more efficient than generating the whole lits and then filtering.
 */
export function getFilteredAbsSegments(includeSegment, wire) {
    const convertToAbs = (_arg, seg) => {
        let position, length;
        const start = _arg[0];
        const dir = _arg[1];
        return new BusWireT_ASegment(start, (position = start, (length = seg.Length, (dir === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)))), seg);
    };
    return reverse(fold((tupledArg, seg_1) => {
        const _arg_1 = tupledArg[0];
        const aSegL = tupledArg[1];
        const pos = _arg_1[0];
        const ori = _arg_1[1];
        const nextASeg = convertToAbs([pos, ori], seg_1);
        const posDir$0027 = [nextASeg.End, (ori === "vertical") ? "horizontal" : "vertical"];
        if (includeSegment(ori, seg_1)) {
            return [posDir$0027, cons(nextASeg, aSegL)];
        }
        else {
            return [posDir$0027, aSegL];
        }
    }, [[wire.StartPos, wire.InitialOrientation], empty()], wire.Segments)[1]);
}

/**
 * Retrieves XYPos of every vertex in a wire
 * HLP23: Derek Lai (ddl20)
 */
export function getWireSegmentsXY(wire) {
    const tupToXY = (l) => (new XYPos(l[0], l[1]));
    return map_1(tupToXY, map_1((tupledArg) => {
        const x = tupledArg[0];
        const y = tupledArg[1];
        return [x, y];
    }, segmentsToIssieVertices(wire.Segments, wire)));
}

/**
 * Retrieves all wires which intersect an arbitrary bounding box & the index
 * of the segment which intersects the box
 * HLP23: Derek Lai (ddl20)
 */
export function getWiresInBox(box, model) {
    const wires = ofSeq(FSharpMap__get_Values(model.Wires));
    const bottomRight = new XYPos(box.TopLeft.X + box.W, box.TopLeft.Y + box.H);
    const checkOverlapFolder = (startPos, endPos, state, segment) => {
        const overlap = overlap2D(startPos, endPos, box.TopLeft, bottomRight);
        return [state[0] ? true : overlap, overlap ? segment.Index : state[1]];
    };
    return map_1((tupledArg_2) => {
        const w_1 = tupledArg_2[1];
        const index = tupledArg_2[0][1] | 0;
        return [w_1, index];
    }, filter((l) => l[0][0], map_1((w) => {
        let wire, initPos, initOrientation, state_2;
        return [(wire = w, (initPos = wire.StartPos, (initOrientation = wire.InitialOrientation, (state_2 = fold((tupledArg, seg) => {
            const currState = tupledArg[0];
            const currPos = tupledArg[1];
            const currOrientation = tupledArg[2];
            const nextOrientation = (currOrientation === "vertical") ? "horizontal" : "vertical";
            if (Math.abs(seg.Length) < 1E-07) {
                return [currState, currPos, nextOrientation];
            }
            else {
                let nextPos;
                const position = currPos;
                const length = seg.Length;
                nextPos = ((currOrientation === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)));
                const nextState = checkOverlapFolder(currPos, nextPos, currState, seg);
                return [nextState, nextPos, nextOrientation];
            }
        }, [[false, -1], initPos, initOrientation], wire.Segments)[0], state_2)))), w];
    }, wires)));
}

/**
 * Used to fix bounding box with negative width and heights
 * HLP23: Derek Lai (ddl20)
 */
export function fixBoundingBox(box) {
    const x = min(box.TopLeft.X + box.W, box.TopLeft.X);
    const y = min(box.TopLeft.Y + box.H, box.TopLeft.Y);
    return new BoundingBox(new XYPos(x, y), Math.abs(box.W), Math.abs(box.H));
}

export function partitionWiresIntoNets(model) {
    return List_groupBy((tupledArg) => {
        const wire = tupledArg[1];
        return wire.OutputPort;
    }, toList(model.Wires), {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

/**
 * Moves a wire by the XY amounts specified by displacement
 */
export function moveWire(wire, displacement) {
    let left, right;
    return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, wire.Color, wire.Width, wire.Segments, (left = wire.StartPos, (right = displacement, new XYPos(left.X + right.X, left.Y + right.Y))), wire.InitialOrientation);
}

export function moveWires(offset, model) {
    const wires$0027 = map((_arg, wire) => moveWire(wire, offset), model.Wires);
    return new BusWireT_Model(model.Symbol, wires$0027, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
}

/**
 * Returns the center coordinates of a Symbol
 */
export function getSymbolPos(symbolModel, compId) {
    const symbol = find(compId, symbolModel.Symbols);
    return symbol.Pos;
}

/**
 * Interface function to get componentIds of the copied symbols
 */
export function getCopiedSymbols(symModel) {
    return map_1((tuple) => tuple[0], toList(symModel.CopiedSymbols));
}

/**
 * Get the start and end positions of a wire.
 * HLP23: AUTHOR Jian Fu Eng (jfe20)
 */
export function getStartAndEndWirePos(wire) {
    const wireVertices = map_1((tupledArg) => {
        const x = tupledArg[0];
        const y = tupledArg[1];
        return new XYPos(x, y);
    }, segmentsToIssieVertices(wire.Segments, wire));
    const currentStartPos = head(wireVertices);
    const currentEndPos = item(length_1(wireVertices) - 2, wireVertices);
    return [currentStartPos, currentEndPos];
}

/**
 * Returns length of wire
 * HLP23: AUTHOR Jian Fu Eng (jfe20)
 */
export function getWireLength(wire) {
    return fold((acc, seg) => (acc + Math.abs(seg.Length)), 0, wire.Segments);
}

/**
 * Gets total length of a set of wires.
 * HLP23: AUTHOR dgs119
 */
export function totalLengthOfWires(conns) {
    return sum(map_1((tuple) => tuple[1], toList(map((_arg, wire) => getWireLength(wire), conns))), {
        GetZero: () => 0,
        Add: (x, y) => (x + y),
    });
}

/**
 * Checks if a wire is part of a net.
 * If yes, return the netlist. Otherwise, return None
 * HLP23: AUTHOR Jian Fu Eng (jfe20)
 */
export function isWireInNet(model, wire) {
    const nets = partitionWiresIntoNets(model);
    return tryFind((tupledArg) => {
        const outputPortID = tupledArg[0];
        const netlist = tupledArg[1];
        if (equals(wire.OutputPort, outputPortID)) {
            return exists((tupledArg_1) => {
                const connID = tupledArg_1[0];
                const w = tupledArg_1[1];
                return !equals(connID, wire.WId);
            }, netlist);
        }
        else {
            return false;
        }
    }, nets);
}

/**
 * Checks if a port is part of a Symbol.
 * HLP23: AUTHOR dgs119
 */
export function isPortInSymbol(portId, symbol) {
    return containsKey(portId, symbol.PortMaps.Orientation);
}

/**
 * Get pairs of unique symbols that are connected to each other.
 * HLP23: AUTHOR dgs119
 */
export function getConnSyms(wModel) {
    return List_distinctBy((tupledArg_1) => {
        const symA_1 = tupledArg_1[0];
        const symB_1 = tupledArg_1[1];
        return ofList(ofArray([symA_1, symB_1]), {
            Compare: compare,
        });
    }, filter((tupledArg) => {
        const symA = tupledArg[0];
        const symB = tupledArg[1];
        return !equals(symA.Id, symB.Id);
    }, map_1((wire) => {
        let model, portId, s, port, symbol, model_1, portId_1, s_1, port_1, symbol_1;
        return [(model = wModel, (portId = ((s = wire.OutputPort, s)), (port = FSharpMap__get_Item(model.Symbol.Ports, portId), (symbol = FSharpMap__get_Item(model.Symbol.Symbols, port.HostId), symbol)))), (model_1 = wModel, (portId_1 = ((s_1 = wire.InputPort, s_1)), (port_1 = FSharpMap__get_Item(model_1.Symbol.Ports, portId_1), (symbol_1 = FSharpMap__get_Item(model_1.Symbol.Symbols, port_1.HostId), symbol_1))))];
    }, toList_1(values(wModel.Wires)))), {
        Equals: (x_1, y_1) => x_1.Equals(y_1),
        GetHashCode: safeHash,
    });
}

/**
 * Checks if wire is connected to two given symbols.
 * Returns false if two Symbols are the same.
 * HLP23: AUTHOR dgs119
 */
export function isConnBtwnSyms(wire, symA, symB) {
    let outId;
    const s_1 = wire.OutputPort;
    outId = s_1;
    let inId;
    const s = wire.InputPort;
    inId = s;
    if (isPortInSymbol(inId, symA) && isPortInSymbol(outId, symB)) {
        return true;
    }
    else if (isPortInSymbol(inId, symB) && isPortInSymbol(outId, symA)) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Gets connections between symbols.
 * HLP23: AUTHOR dgs119
 */
export function connsBtwnSyms(wModel, symA, symB) {
    return filter_1((_arg, wire) => isConnBtwnSyms(wire, symA, symB), wModel.Wires);
}

/**
 * Gets Wires between symbols.
 * HLP23: AUTHOR dgs119
 */
export function wiresBtwnSyms(wModel, symA, symB) {
    return map_1((tuple) => tuple[1], toList(connsBtwnSyms(wModel, symA, symB)));
}

/**
 * Filters Ports by Symbol.
 * HLP23: AUTHOR dgs119
 */
export function filterPortBySym(ports, sym) {
    return filter((port) => (port.HostId === sym.Id), ports);
}

/**
 * Gets Ports From a List of Wires.
 * HLP23: AUTHOR dgs119
 */
export function portsOfWires(model, wires) {
    return List_distinct(concat(map_1((wire) => {
        let s, s_1;
        return ofArray([FSharpMap__get_Item(model.Symbol.Ports, (s = wire.InputPort, s)), FSharpMap__get_Item(model.Symbol.Ports, (s_1 = wire.OutputPort, s_1))]);
    }, wires)), {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

/**
 * Groups Wires by the net they belong to.
 * HLP23: AUTHOR dgs119
 */
export function groupWiresByNet(conns) {
    return map_1((arg) => map_1((tuple_1) => tuple_1[1], arg[1]), List_groupBy((tupledArg) => {
        const wire = tupledArg[1];
        return wire.OutputPort;
    }, toList(conns), {
        Equals: equals,
        GetHashCode: safeHash,
    }));
}

/**
 * Scales a symbol so it has the provided height and width.
 * HLP23: AUTHOR BRYAN TAN
 */
export function setCustomCompHW(h, w, sym) {
    const hScale = w / sym.Component.W;
    const vScale = h / sym.Component.H;
    return new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, hScale, vScale, sym.MovingPort, sym.MovingPortTarget);
}

/**
 * For a wire and a symbol, return the edge of the symbol that the wire is connected to.
 * /// HLP23: AUTHOR BRYAN TAN
 */
export function wireSymEdge(wModel, wire, sym) {
    let matchValue;
    let portId;
    const s = wire.OutputPort;
    portId = s;
    const port = FSharpMap__get_Item(wModel.Symbol.Ports, portId);
    matchValue = port;
    let tPort;
    let portId_1;
    const s_1 = wire.InputPort;
    portId_1 = s_1;
    const port_1 = FSharpMap__get_Item(wModel.Symbol.Ports, portId_1);
    tPort = port_1;
    const sPort = matchValue;
    const sEdge = tryFind_1(sPort.Id, sym.PortMaps.Orientation);
    const tEdge = tryFind_1(tPort.Id, sym.PortMaps.Orientation);
    let matchResult, e, e_1;
    if (sEdge == null) {
        if (tEdge != null) {
            matchResult = 1;
            e_1 = tEdge;
        }
        else {
            matchResult = 2;
        }
    }
    else if (tEdge == null) {
        matchResult = 0;
        e = sEdge;
    }
    else {
        matchResult = 2;
    }
    switch (matchResult) {
        case 0:
            return e;
        case 1:
            return e_1;
        default:
            return new Edge(0, []);
    }
}

export class Rectangle extends Record {
    constructor(TopLeft, BottomRight) {
        super();
        this.TopLeft = TopLeft;
        this.BottomRight = BottomRight;
    }
}

export function Rectangle_$reflection() {
    return record_type("BlockHelpers.Rectangle", [], Rectangle, () => [["TopLeft", XYPos_$reflection()], ["BottomRight", XYPos_$reflection()]]);
}

/**
 * Checks if 2 rectangles intersect
 */
export function rectanglesIntersect(rect1, rect2) {
    const intersect1D = (xOrY) => {
        const qHi = min(xOrY(rect1.BottomRight), xOrY(rect2.BottomRight));
        const qLo = max(xOrY(rect1.TopLeft), xOrY(rect2.TopLeft));
        return qLo <= qHi;
    };
    if (intersect1D((pos) => pos.X)) {
        return intersect1D((pos_2) => pos_2.Y);
    }
    else {
        return false;
    }
}

export function findPerpendicularDistance(segStart, segEnd, point) {
    if (Math.abs(segStart.X - segEnd.X) > Math.abs(segStart.Y - segEnd.Y)) {
        return Math.abs(segStart.Y - point.Y);
    }
    else {
        return Math.abs(segStart.X - point.X);
    }
}

/**
 * Checks if a segment intersects a bounding box using the segment's start and end XYPos
 * return how close teh segment runs to the box centre, if it intersects
 */
export function segmentIntersectsBoundingBox(box, segStart, segEnd) {
    let pos, left, right;
    const toRect = (p1, p2) => {
        let p1_1, p2_1;
        const patternInput = ((p1_1 = p1, (p2_1 = p2, (p1_1.X <= p2_1.X) && (p1_1.Y <= p2_1.Y)))) ? [p1, p2] : [p2, p1];
        const topLeft = patternInput[0];
        const bottomRight = patternInput[1];
        return new Rectangle(topLeft, bottomRight);
    };
    const bbBottomRight = new XYPos(box.TopLeft.X + box.W, box.TopLeft.Y + box.H);
    const bbRect = toRect(box.TopLeft, bbBottomRight);
    const segRect = toRect(segStart, segEnd);
    if (rectanglesIntersect(bbRect, segRect)) {
        return findPerpendicularDistance(segStart, segEnd, (pos = ((left = box.TopLeft, (right = bbBottomRight, new XYPos(left.X + right.X, left.Y + right.Y)))), new XYPos(pos.X * 0.5, pos.Y * 0.5)));
    }
    else {
        return void 0;
    }
}

//# sourceMappingURL=BlockHelpers.fs.js.map
