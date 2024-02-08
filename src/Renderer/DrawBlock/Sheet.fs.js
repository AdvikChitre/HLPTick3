import { safeHash, comparePrimitives, defaultOf, equals, compare, createAtom } from "../fable_modules/fable-library.4.1.4/Util.js";
import { contains, tryFind as tryFind_1, allPairs, max as max_1, reduce, map as map_5, ofArray, tail, head, isEmpty, fold, singleton, collect, length as length_1, empty } from "../fable_modules/fable-library.4.1.4/List.js";
import { BoundingBox__Centre, BoundingBox, ComponentType, XYPos } from "../Common/CommonTypes.fs.js";
import { Cmd_OfFunc_result } from "../fable_modules/Fable.Elmish.3.1.0/./cmd.fs.js";
import { SheetT_MouseOn, SheetT_symbols_, SymbolT_Annotation, SheetT_Model, SheetT_canvasSize_, SheetT_screenScrollPos_, SheetT_lastMousePos_, SheetT_lastMousePosForSnap_, SheetT_scrollingLastMousePos_, SheetT_pos_, SheetT_symbol_, SheetT_wire_, SymbolT_Msg, BusWireT_Model, SheetT_Msg, BusWireT_Msg } from "../Model/DrawModelType.fs.js";
import { Msg } from "../Model/ModelType.fs.js";
import { printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { findDeletedPorts } from "./SymbolPortHelpers.fs.js";
import { getClickedWire, calculateBusWidths } from "./BusWireUpdate.fs.js";
import { updateWireSegmentJumpsAndSeparations, routeAndSeparateSymbolWires } from "./BusWireSeparate.fs.js";
import { deleteWiresWithPort } from "./BusWireUpdateHelpers.fs.js";
import { toList as toList_2, iterate } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { map as map_6, defaultArg, toArray } from "../fable_modules/fable-library.4.1.4/Option.js";
import { extractComponents, ChangeSplitN, ChangeMergeN, ChangeGate, extractComponent, generateLabel } from "./SymbolUpdate.fs.js";
import { extractConnection, extractConnections } from "./BusWire.fs.js";
import { isEmpty as isEmpty_1, tryPick, tryFindKey, filter, toList as toList_1, find, tryFind, toArray as toArray_1, containsKey } from "../fable_modules/fable-library.4.1.4/Map.js";
import { FSharpSet_op_Subtraction, FSharpSet_op_Addition, toList, ofList } from "../fable_modules/fable-library.4.1.4/Set.js";
import { max, min } from "../fable_modules/fable-library.4.1.4/Double.js";
import { tryFindIndex, equalsWith, map as map_4 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { getPortLocations, calcLabelBoundingBox } from "./Symbol.fs.js";
import { Optic_Get, Optic_Get_op_HatDot_Z146BA564, Optic_Set, Optic_Set_op_HatEquals_Z147477F8, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Map, Optic_Map_op_HatPercent_Z1462312A } from "../Common/Optics.fs.js";
import { moveSymbols, moveWires } from "./BlockHelpers.fs.js";
import { boxesIntersect } from "../Common/DrawHelpers.fs.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { getCustomSymCorners, translatePoints } from "./SymbolHelpers.fs.js";

export let canvasDiv = createAtom(void 0);

export let recentProgrammaticScrollPos = createAtom(empty());

export let scrollSequence = createAtom(0);

export let viewIsAfterUpdateScroll = createAtom(false);

export const Constants_symbolSnapLimit = 7;

export const Constants_segmentSnapLimit = 7;

export const Constants_gridSize = 30;

export const Constants_defaultCanvasSize = 3500;

export const Constants_wireBoundingBoxSize = 2;

export const Constants_maxMagnification = 2;

export const Constants_minMagnification = 0.1;

export const Constants_zoomIncrement = 1.2;

export const Constants_boxAspectRatio = 2;

export const Constants_boxParameters = {
    BoxMarginFraction: 0.1,
    BoxMin: 30,
    BoxOfEmptyCircuit: new XYPos(100, 100),
    CanvasBorder: 0.5,
    CanvasExtensionFraction: 0.1,
};

export function centreOfCanvas(model) {
    const dim = model.CanvasSize / 2;
    return new XYPos(dim, dim);
}

/**
 * Creates a command to Symbol
 */
export function symbolCmd(msg) {
    return Cmd_OfFunc_result(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(0, [msg])])]));
}

/**
 * Creates a command to BusWire
 */
export function wireCmd(msg) {
    return Cmd_OfFunc_result(new Msg(1, [new SheetT_Msg(0, [msg])]));
}

export function sheetCmd(msg) {
    return Cmd_OfFunc_result(new Msg(1, [msg]));
}

export function DrawModelType_SheetT_Model__Model_ChangeComponent(this$, dispatch, symModel, compId, compType) {
    let inputRecord;
    toConsole(printf("Change component"));
    const delPorts = findDeletedPorts(this$.Wire.Symbol, compId, DrawModelType_SheetT_Model__Model_GetComponentById_687F574F(this$, compId), compType);
    toConsole(`${length_1(delPorts)} deleted ports: compType=${compType}`);
    const patternInput = calculateBusWidths(routeAndSeparateSymbolWires(deleteWiresWithPort(delPorts, (inputRecord = this$.Wire, new BusWireT_Model(symModel, inputRecord.Wires, inputRecord.CopiedWires, inputRecord.SelectedSegment, inputRecord.LastMousePos, inputRecord.ErrorWires, inputRecord.Notifications, inputRecord.Type, inputRecord.ArrowDisplay, inputRecord.SnapToNet))), compId));
    const wireMsgOpt = patternInput[1];
    const wireModel = patternInput[0];
    toConsole(printf("change complete"));
    dispatch(new SheetT_Msg(1, [wireModel]));
    toConsole(printf("model changed"));
    iterate((msg) => {
        dispatch(new SheetT_Msg(0, [msg]));
    }, toArray(wireMsgOpt));
}

/**
 * Given a compType, return a label
 */
export function DrawModelType_SheetT_Model__Model_GenerateLabel_Z7A46B106(this$, compType) {
    return generateLabel(this$.Wire.Symbol, compType);
}

/**
 * Given a compId, return the corresponding component
 */
export function DrawModelType_SheetT_Model__Model_GetComponentById_687F574F(this$, compId) {
    return extractComponent(this$.Wire.Symbol, compId);
}

/**
 * Change the label of Component specified by compId to lbl
 */
export function DrawModelType_SheetT_Model__Model_ChangeLabel(this$, dispatch, compId, lbl) {
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(13, [compId, lbl])])]));
}

/**
 * Run Bus Width Inference check
 */
export function DrawModelType_SheetT_Model__Model_DoBusWidthInference_Z1E9EDA9D(this$, dispatch) {
    return dispatch(new SheetT_Msg(0, [new BusWireT_Msg(2, [])]));
}

/**
 * Given a compId and a width, update the width of the Component specified by compId
 */
export function DrawModelType_SheetT_Model__Model_ChangeWidth(this$, dispatch, compId, width) {
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(17, [compId, width])])]));
    DrawModelType_SheetT_Model__Model_DoBusWidthInference_Z1E9EDA9D(this$, dispatch);
}

/**
 * Given a compId and a width, update the width of the Component specified by compId
 */
export function DrawModelType_SheetT_Model__Model_ChangeScale(this$, dispatch, compId, newScale, whichScale) {
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(20, [compId, newScale, whichScale])])]));
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(8, [compId])]));
}

export function DrawModelType_SheetT_Model__Model_ChangeAdderComp(this$, dispatch, compId, newComp) {
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(24, [compId, DrawModelType_SheetT_Model__Model_GetComponentById_687F574F(this$, compId), newComp])])]));
    const delPorts = findDeletedPorts(this$.Wire.Symbol, compId, DrawModelType_SheetT_Model__Model_GetComponentById_687F574F(this$, compId), newComp);
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(5, [delPorts])]));
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(8, [compId])]));
}

export function DrawModelType_SheetT_Model__Model_ChangeCounterComp(this$, dispatch, compId, newComp) {
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(25, [compId, DrawModelType_SheetT_Model__Model_GetComponentById_687F574F(this$, compId), newComp])])]));
    const delPorts = findDeletedPorts(this$.Wire.Symbol, compId, DrawModelType_SheetT_Model__Model_GetComponentById_687F574F(this$, compId), newComp);
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(5, [delPorts])]));
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(8, [compId])]));
}

/**
 * Given a compId, update the ReversedInputs property of the Component specified by compId
 */
export function DrawModelType_SheetT_Model__Model_ChangeReversedInputs(this$, dispatch, compId) {
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(23, [compId])])]));
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(8, [compId])]));
    DrawModelType_SheetT_Model__Model_DoBusWidthInference_Z1E9EDA9D(this$, dispatch);
}

/**
 * Given a compId and the number in inputs, set the number of inputs for a gate
 */
export function DrawModelType_SheetT_Model__Model_ChangeGate(this$, dispatch, compId, gateType, n) {
    const symModel = ChangeGate(compId, gateType, n, this$.Wire.Symbol);
    DrawModelType_SheetT_Model__Model_ChangeComponent(this$, dispatch, symModel, compId, new ComponentType(10, [gateType, n]));
}

/**
 * Given a compId, number of inputs
 */
export function DrawModelType_SheetT_Model__Model_ChangeMergeN(this$, dispatch, compId, numInputs) {
    const symModel = ChangeMergeN(compId, numInputs, this$.Wire.Symbol);
    DrawModelType_SheetT_Model__Model_ChangeComponent(this$, dispatch, symModel, compId, new ComponentType(29, [numInputs]));
}

/**
 * Given comId, number of inputs, widths and LSBs
 */
export function DrawModelType_SheetT_Model__Model_ChangeSplitN(this$, dispatch, compId, numInputs, widths, lsbs) {
    const symModel = ChangeSplitN(compId, numInputs, widths, lsbs, this$.Wire.Symbol);
    DrawModelType_SheetT_Model__Model_ChangeComponent(this$, dispatch, symModel, compId, new ComponentType(30, [numInputs, widths, lsbs]));
}

/**
 * Given a compId and a LSB, update the LSB of the Component specified by compId
 */
export function DrawModelType_SheetT_Model__Model_ChangeLSB(this$, dispatch, compId, lsb) {
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(18, [compId, lsb])])]));
}

export function DrawModelType_SheetT_Model__Model_ChangeInputValue(this$, dispatch, compId, newVal) {
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(19, [compId, newVal])])]));
}

/**
 * Return Some string if Sheet / BusWire / Symbol has a notification, if there is none then return None
 */
export function DrawModelType_SheetT_Model__Model_get_GetNotifications(this$) {
    return this$.Wire.Notifications;
}

/**
 * Get the current canvas state in the form of (Component list * Connection list)
 */
export function DrawModelType_SheetT_Model__Model_GetCanvasState(this$) {
    const compList = extractComponents(this$.Wire.Symbol);
    const connList = extractConnections(this$.Wire);
    return [compList, connList];
}

/**
 * Clears the Undo and Redo stack of Sheet
 */
export function DrawModelType_SheetT_Model__Model_FlushCommandStack_Z1E9EDA9D(this$, dispatch) {
    return dispatch(new SheetT_Msg(20, []));
}

/**
 * Clears the canvas, removes all components and connections
 */
export function DrawModelType_SheetT_Model__Model_ClearCanvas_7D5C5FDA(this$, dispatch) {
    dispatch(new SheetT_Msg(21, []));
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(17, [])]));
    dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(26, [])])]));
}

/**
 * Returns a list of selected components
 */
export function DrawModelType_SheetT_Model__Model_get_GetSelectedComponents(this$) {
    return collect((compId) => {
        if (containsKey(compId, this$.Wire.Symbol.Symbols)) {
            return singleton(extractComponent(this$.Wire.Symbol, compId));
        }
        else {
            return empty();
        }
    }, this$.SelectedComponents);
}

/**
 * Returns a list of selected connections
 */
export function DrawModelType_SheetT_Model__Model_get_GetSelectedConnections(this$) {
    return collect((connId) => {
        if (containsKey(connId, this$.Wire.Wires)) {
            return singleton(extractConnection(this$.Wire, connId));
        }
        else {
            return empty();
        }
    }, this$.SelectedWires);
}

/**
 * Returns a list of selected components and connections in the form of (Component list * Connection list)
 */
export function DrawModelType_SheetT_Model__Model_get_GetSelectedCanvasState(this$) {
    return [DrawModelType_SheetT_Model__Model_get_GetSelectedComponents(this$), DrawModelType_SheetT_Model__Model_get_GetSelectedConnections(this$)];
}

/**
 * Given a list of connIds, select those connections
 */
export function DrawModelType_SheetT_Model__Model_SelectConnections(this$, dispatch, on, connIds) {
    return dispatch(new SheetT_Msg(22, [connIds, on]));
}

/**
 * Update the memory of component
 */
export function DrawModelType_SheetT_Model__Model_WriteMemoryType(this$, dispatch, compId, mem) {
    return dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(29, [compId, mem])])]));
}

/**
 * Update the memory of component
 */
export function DrawModelType_SheetT_Model__Model_UpdateMemory(this$, dispatch, compId, mem) {
    return dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(30, [compId, mem])])]));
}

/**
 * Update the memory of component specified by connId at location addr with data value
 */
export function DrawModelType_SheetT_Model__Model_WriteMemoryLine(this$, dispatch, connId, addr, value) {
    return dispatch(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(28, [connId, addr, value])])]));
}

export function symDiff(lst1, lst2) {
    const a = ofList(lst1, {
        Compare: compare,
    });
    const b = ofList(lst2, {
        Compare: compare,
    });
    return toList(FSharpSet_op_Addition(FSharpSet_op_Subtraction(a, b), FSharpSet_op_Subtraction(b, a)));
}

/**
 * return screen edge coords
 */
export function getScreenEdgeCoords(model) {
    const canvas = document.getElementById("Canvas");
    const wholeApp = document.getElementById("WholeApp");
    const rightSelection = document.getElementById("RightSelection");
    const topMenu = document.getElementById("TopMenu");
    let scrollDeviation;
    const left = model.ScreenScrollPos;
    const right = new XYPos(canvas.scrollLeft, canvas.scrollTop);
    scrollDeviation = (new XYPos(left.X - right.X, left.Y - right.Y));
    const leftScreenEdge = canvas.scrollLeft;
    const rightScreenEdge = (leftScreenEdge + wholeApp.clientWidth) - rightSelection.offsetWidth;
    const topScreenEdge = canvas.scrollTop;
    const bottomScreenEdge = (topScreenEdge + rightSelection.offsetHeight) - topMenu.clientHeight;
    return {
        Bottom: bottomScreenEdge,
        Left: leftScreenEdge,
        Right: rightScreenEdge,
        Top: topScreenEdge,
    };
}

export function centreOfScreen(model) {
    const edge = getScreenEdgeCoords(model);
    return new XYPos((edge.Left + edge.Right) / (2 * model.Zoom), (edge.Top + edge.Bottom) / (2 * model.Zoom));
}

/**
 * helper used inside Map.tryFind hence the unused parameter
 * returns true if pos is insoie boundingbox
 */
export function insideBox(pos, boundingBox) {
    const yBox = boundingBox.TopLeft.Y;
    const xBox = boundingBox.TopLeft.X;
    const wBox = boundingBox.W;
    const hBox = boundingBox.H;
    if (((pos.X >= xBox) && (pos.X <= (xBox + wBox))) && (pos.Y >= yBox)) {
        return pos.Y <= (yBox + hBox);
    }
    else {
        return false;
    }
}

/**
 * return a BB equivalent to input but with (X,Y) = LH Top coord, (X+W,Y+H) = RH bottom coord
 * note that LH Top is lower end of the two screen coordinates
 */
export function standardiseBox(box) {
    const x = min(box.TopLeft.X, box.TopLeft.X + box.W);
    const y = min(box.TopLeft.Y, box.TopLeft.Y + box.H);
    const w = Math.abs(box.W);
    const h = Math.abs(box.H);
    return new BoundingBox(new XYPos(x, y), w, h);
}

export function transformScreenToPos(screenPos, scrollPos, mag) {
    return new XYPos((screenPos.X + scrollPos.X) / mag, (screenPos.Y + scrollPos.Y) / mag);
}

/**
 * calculates the smallest bounding box that contains two BBs, in form with W,H > 0
 */
export function boxUnion(box, box$0027) {
    const maxX = max(box.TopLeft.X + box.W, box$0027.TopLeft.X + box$0027.W);
    const maxY = max(box.TopLeft.Y + box.H, box$0027.TopLeft.Y + box$0027.H);
    const minX = min(box.TopLeft.X, box$0027.TopLeft.X);
    const minY = min(box.TopLeft.Y, box$0027.TopLeft.Y);
    return new BoundingBox(new XYPos(minX, minY), maxX - minX, maxY - minY);
}

/**
 * Returns the smallest BB containing box and point.
 * Could be made more efficient
 */
export function boxPointUnion(box, point) {
    const pBox = new BoundingBox(point, 0, 0);
    return boxUnion(box, pBox);
}

export function symbolToBB(centresOnly, symbol) {
    let left, right;
    const co = symbol.Component;
    let patternInput_1;
    const sym = symbol;
    const comp = sym.Component;
    const matchValue = defaultArg(sym.HScale, 1);
    const vS = defaultArg(sym.VScale, 1);
    const hS = matchValue;
    const matchValue_2 = sym.STransform.Rotation;
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
    if (centresOnly) {
        return new BoundingBox((left = symbol.Pos, (right = (new XYPos(w / 2, h / 2)), new XYPos(left.X + right.X, left.Y + right.Y))), 0, 0);
    }
    else {
        return new BoundingBox(symbol.Pos, w, h);
    }
}

export function symbolToCentre(symbol) {
    let left, right;
    let patternInput_1;
    const sym = symbol;
    const comp = sym.Component;
    const matchValue = defaultArg(sym.HScale, 1);
    const vS = defaultArg(sym.VScale, 1);
    const hS = matchValue;
    const matchValue_2 = sym.STransform.Rotation;
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
    return new BoundingBox((left = symbol.Pos, (right = (new XYPos(w / 2, h / 2)), new XYPos(left.X + right.X, left.Y + right.Y))), 0.1, 0.1);
}

/**
 * Returns the smallest BB that contains all segments
 * of wire.
 */
export function wireToBB(wire) {
    const initBox = new BoundingBox(wire.StartPos, 0, 0);
    const wire_2 = wire;
    const initPos = wire_2.StartPos;
    const initOrientation = wire_2.InitialOrientation;
    const state_2 = fold((tupledArg, seg) => {
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
            const nextState = boxPointUnion(currState, nextPos);
            return [nextState, nextPos, nextOrientation];
        }
    }, [initBox, initPos, initOrientation], wire_2.Segments)[0];
    return state_2;
}

export function symbolBBUnion(centresOnly, symbols) {
    if (!isEmpty(symbols)) {
        const sym = head(symbols);
        const rest = tail(symbols);
        return fold((box, sym_1) => {
            if (centresOnly) {
                return boxUnion(symbolToBB(centresOnly, sym_1), box);
            }
            else {
                return boxUnion(box, boxUnion(symbolToBB(centresOnly, sym_1), sym_1.LabelBoundingBox));
            }
        }, symbolToBB(centresOnly, sym), rest);
    }
    else {
        return void 0;
    }
}

/**
 * Returns the smallest BB that contains all symbols, labels, and wire segments.
 * For empty circuit a BB is returned in middle of viewable screen.
 */
export function symbolWireBBUnion(model) {
    const symbols = ofArray(map_4((tuple) => tuple[1], toArray_1(model.Wire.Symbol.Symbols)));
    const symbolBB = symbolBBUnion(false, symbols);
    const labelsBB = map_5((sym) => calcLabelBoundingBox(sym).LabelBoundingBox, symbols);
    const labelBB = isEmpty(labelsBB) ? void 0 : reduce(boxUnion, labelsBB);
    let wireBB;
    const wiresBBA = map_4(wireToBB, map_4((tuple_1) => tuple_1[1], toArray_1(model.Wire.Wires)));
    wireBB = ((!equalsWith(equals, wiresBBA, defaultOf()) && (wiresBBA.length === 0)) ? void 0 : wiresBBA.reduce(boxUnion));
    const _arg_1 = collect((_arg) => {
        if (_arg != null) {
            const bb = _arg;
            return singleton(bb);
        }
        else {
            return empty();
        }
    }, ofArray([symbolBB, labelBB, wireBB]));
    if (!isEmpty(_arg_1)) {
        if (isEmpty(tail(_arg_1))) {
            const bb_1 = head(_arg_1);
            return bb_1;
        }
        else {
            const bbL = _arg_1;
            return reduce(boxUnion, bbL);
        }
    }
    else {
        return new BoundingBox(centreOfScreen(model), 0, 0);
    }
}

export function moveCircuit(moveDelta, model) {
    return Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SheetT_wire_)((model_3) => updateWireSegmentJumpsAndSeparations(empty(), model_3))(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SheetT_wire_)((model_2) => moveWires(moveDelta, model_2))(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SheetT_symbol_)((model_1) => moveSymbols(moveDelta, model_1))(model)));
}

/**
 * get scroll and zoom paras to fit box all on screen centred and occupying as much of screen as possible
 */
export function getWindowParasToFitBox(model, box) {
    const edge = getScreenEdgeCoords(model);
    const top = edge.Top;
    const rh = edge.Right;
    const lh = edge.Left;
    const bottom = edge.Bottom;
    const wantedMag = min((rh - lh) / box.W, (bottom - top) / box.H);
    const magToUse = min(wantedMag, Constants_maxMagnification);
    const xMiddle = (box.TopLeft.X + (box.W / 2)) * magToUse;
    const xScroll = xMiddle - ((rh - lh) / 2);
    const yMiddle = (box.TopLeft.Y + (box.H / 2)) * magToUse;
    const yScroll = yMiddle - ((bottom - top) / 2);
    return {
        MagToUse: magToUse,
        Scroll: new XYPos(xScroll, yScroll),
    };
}

export function addBoxMargin(fractionalMargin, absoluteMargin, box) {
    let left, right;
    const boxMargin = max(absoluteMargin, max(box.W, box.H) * fractionalMargin);
    return new BoundingBox((left = box.TopLeft, (right = (new XYPos(boxMargin, boxMargin)), new XYPos(left.X - right.X, left.Y - right.Y))), box.W + (boxMargin * 2), box.H + (boxMargin * 2));
}

/**
 * Check that canvas is large enough to have space all round the visible area.
 * If not, then change model by moving circuit on canvas and/or extending canvas.
 * Keep components in same visible position during this process.
 * returns new model with all positions updated if need be.
 */
export function ensureCanvasExtendsBeyondScreen(model) {
    const boxParas = Constants_boxParameters;
    const edge = getScreenEdgeCoords(model);
    const box_1 = addBoxMargin(boxParas.CanvasExtensionFraction, boxParas.BoxMin, symbolWireBBUnion(model));
    const quant = boxParas.CanvasExtensionFraction * min(box_1.H, box_1.W);
    const newSize = max(model.CanvasSize, max_1(map_5((x) => (x + (4 * quant)), ofArray([box_1.H, box_1.W])), {
        Compare: comparePrimitives,
    }));
    let bottomRight;
    const left = box_1.TopLeft;
    const right = new XYPos(box_1.W, box_1.H);
    bottomRight = (new XYPos(left.X + right.X, left.Y + right.Y));
    const size = model.CanvasSize;
    const xIsOk = (box_1.TopLeft.X > 0) && (bottomRight.X < size);
    const yIsOk = (box_1.TopLeft.Y > 0) && (bottomRight.Y < size);
    if (xIsOk && yIsOk) {
        return model;
    }
    else {
        let circuitMove;
        const centre = BoundingBox__Centre(box_1);
        circuitMove = (new XYPos(xIsOk ? 0 : ((newSize / 2) - centre.X), yIsOk ? 0 : ((newSize / 2) - centre.Y)));
        scrollSequence(scrollSequence() + 1);
        const matchValue = canvasDiv();
        let matchValue_1;
        const left_1 = model.ScreenScrollPos;
        let right_1;
        const pos = circuitMove;
        const scaleFactor = model.Zoom;
        right_1 = (new XYPos(pos.X * scaleFactor, pos.Y * scaleFactor));
        matchValue_1 = (new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y));
        if (matchValue == null) {
        }
        else {
            const pos_1 = matchValue_1;
            const el = matchValue;
            el.scrollLeft = pos_1.X;
            el.scrollTop = pos_1.Y;
        }
        const posDelta = (y_1) => {
            const left_2 = circuitMove;
            const right_2 = y_1;
            return new XYPos(left_2.X + right_2.X, left_2.Y + right_2.Y);
        };
        let posScreenDelta;
        let x_2;
        const pos_2 = circuitMove;
        const scaleFactor_1 = model.Zoom;
        x_2 = (new XYPos(pos_2.X * scaleFactor_1, pos_2.Y * scaleFactor_1));
        posScreenDelta = ((y_2) => {
            const left_3 = x_2;
            const right_3 = y_2;
            return new XYPos(left_3.X + right_3.X, left_3.Y + right_3.Y);
        });
        return Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_pos_)(SheetT_scrollingLastMousePos_))(posDelta)(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SheetT_lastMousePosForSnap_)(posDelta)(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SheetT_lastMousePos_)(posDelta)(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SheetT_screenScrollPos_)(posScreenDelta)(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SheetT_canvasSize_)(newSize)(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SheetT_screenScrollPos_)(posDelta)(moveCircuit(circuitMove, model)))))));
    }
}

/**
 * shift circuit to middle of canvas, resizing canvas to allow enough border if needed.
 * return scroll and zoom paras to display all of circuit in middle of window
 */
export function fitCircuitToWindowParas(model) {
    let left_1, right_1;
    const boxParas = Constants_boxParameters;
    const minBox = new BoundingBox(new XYPos(100, 100), 100, 100);
    const sBox = addBoxMargin(boxParas.BoxMarginFraction, boxParas.BoxMin, symbolWireBBUnion(model));
    const newCanvasSize = max(Constants_defaultCanvasSize, (1 + (2 * boxParas.CanvasBorder)) * max(sBox.W, sBox.H));
    let offsetToCentreCircuit;
    const left = new XYPos(newCanvasSize / 2, newCanvasSize / 2);
    const right = BoundingBox__Centre(sBox);
    offsetToCentreCircuit = (new XYPos(left.X - right.X, left.Y - right.Y));
    const modelWithMovedCircuit = moveCircuit(offsetToCentreCircuit, new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, model.Action, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, newCanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice));
    const sBox_1 = new BoundingBox((left_1 = sBox.TopLeft, (right_1 = offsetToCentreCircuit, new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y))), sBox.W, sBox.H);
    const paras = getWindowParasToFitBox(model, sBox_1);
    return [new SheetT_Model(modelWithMovedCircuit.Wire, modelWithMovedCircuit.PopupViewFunc, modelWithMovedCircuit.PopupDialogData, modelWithMovedCircuit.BoundingBoxes, modelWithMovedCircuit.LastValidBoundingBoxes, modelWithMovedCircuit.SelectedLabel, modelWithMovedCircuit.SelectedComponents, modelWithMovedCircuit.SelectedWires, modelWithMovedCircuit.NearbyComponents, modelWithMovedCircuit.ErrorComponents, modelWithMovedCircuit.DragToSelectBox, modelWithMovedCircuit.ConnectPortsLine, modelWithMovedCircuit.TargetPortId, modelWithMovedCircuit.Action, modelWithMovedCircuit.ShowGrid, modelWithMovedCircuit.CursorType, modelWithMovedCircuit.LastValidPos, modelWithMovedCircuit.LastValidSymbol, modelWithMovedCircuit.SnapSymbols, modelWithMovedCircuit.SnapSegments, modelWithMovedCircuit.CurrentKeyPresses, paras.MagToUse, modelWithMovedCircuit.CanvasSize, modelWithMovedCircuit.TmpModel, modelWithMovedCircuit.ScalingTmpModel, modelWithMovedCircuit.UndoList, modelWithMovedCircuit.RedoList, modelWithMovedCircuit.AutomaticScrolling, paras.Scroll, modelWithMovedCircuit.LastMousePos, modelWithMovedCircuit.ScalingBoxCentrePos, modelWithMovedCircuit.InitMouseToScalingBoxCentre, modelWithMovedCircuit.ScrollingLastMousePos, modelWithMovedCircuit.LastMousePosForSnap, modelWithMovedCircuit.MouseCounter, modelWithMovedCircuit.CtrlKeyDown, modelWithMovedCircuit.PrevWireSelection, modelWithMovedCircuit.ScalingBox, modelWithMovedCircuit.Compiling, modelWithMovedCircuit.CompilationStatus, modelWithMovedCircuit.CompilationProcess, modelWithMovedCircuit.DebugState, modelWithMovedCircuit.DebugData, modelWithMovedCircuit.DebugMappings, modelWithMovedCircuit.DebugIsConnected, modelWithMovedCircuit.DebugDevice), paras];
}

export function isBBoxAllVisible(model, bb) {
    const edge = getScreenEdgeCoords(model);
    const z = model.Zoom;
    const top = edge.Top / z;
    const rh = edge.Right / z;
    const lh = edge.Left / z;
    const bottom = edge.Bottom / z;
    const bbs = standardiseBox(bb);
    if (((lh < bb.TopLeft.Y) && (top < bb.TopLeft.X)) && ((bb.TopLeft.Y + bb.H) < bottom)) {
        return (bb.TopLeft.X + bb.W) < rh;
    }
    else {
        return false;
    }
}

/**
 * could be made more efficient, since segments contain redundant info
 */
export function getWireBBox(wire) {
    const updateBoundingBox = (segStart, segEnd, state, seg) => {
        const newTop = min(state.TopLeft.Y, segEnd.Y);
        const newBottom = max(state.TopLeft.Y + state.H, segEnd.Y);
        const newRight = max(state.TopLeft.X + state.W, segEnd.X);
        const newLeft = min(state.TopLeft.X, segEnd.X);
        return new BoundingBox(new XYPos(newTop, newLeft), newRight - newLeft, newBottom - newTop);
    };
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
        const nextState = updateBoundingBox(currPos, nextPos, currState, seg_1);
        return [nextState, nextPos, nextOrientation];
    }, [new BoundingBox(wire.StartPos, 0, 0), initPos, initOrientation], wire_1.Segments)[0];
    return state_2;
}

export function isAllVisible(model, conns, comps) {
    const wVisible = fold((e, e_1) => (e && e_1), true, map_5((option_2) => defaultArg(option_2, true), map_5((option_1) => map_6((bb) => isBBoxAllVisible(model, bb), option_1), map_5((option) => map_6(getWireBBox, option), map_5((cid) => tryFind(cid, model.Wire.Wires), conns)))));
    const cVisible = fold((e_2, e_3) => (e_2 && e_3), true, map_5((bb_1) => isBBoxAllVisible(model, bb_1), collect((comp) => {
        let symb, sym, patternInput, sym_1, comp_1, matchValue, vS, hS, matchValue_2, w, h, left, right;
        if (containsKey(comp, model.Wire.Symbol.Symbols)) {
            return singleton((symb = find(comp, model.Wire.Symbol.Symbols), (sym = symb, (patternInput = ((sym_1 = sym, (comp_1 = sym_1.Component, (matchValue = defaultArg(sym_1.HScale, 1), (vS = defaultArg(sym_1.VScale, 1), (hS = matchValue, (matchValue_2 = sym_1.STransform.Rotation, (matchValue_2.tag === 2) ? [comp_1.H * vS, comp_1.W * hS] : ((matchValue_2.tag === 1) ? [comp_1.W * hS, comp_1.H * vS] : ((matchValue_2.tag === 3) ? [comp_1.W * hS, comp_1.H * vS] : [comp_1.H * vS, comp_1.W * hS]))))))))), (w = patternInput[1], (h = patternInput[0], equals(sym.Annotation, new SymbolT_Annotation(0, [])) ? (new BoundingBox((left = sym.Pos, (right = (new XYPos(9, 9)), new XYPos(left.X - right.X, left.Y - right.Y))), 17, 17)) : (new BoundingBox(sym.Pos, w, h))))))));
        }
        else {
            return empty();
        }
    }, comps)));
    if (wVisible) {
        return cVisible;
    }
    else {
        return false;
    }
}

/**
 * Finds all components that touch a bounding box (which is usually the drag-to-select box)
 */
export function findIntersectingComponents(model, box1) {
    return map_5((tuple) => tuple[0], toList_1(filter((id, boundingBox) => {
        if (equals(find(id, model.Wire.Symbol.Symbols).Annotation, void 0)) {
            return boxesIntersect(boundingBox, box1);
        }
        else {
            return false;
        }
    }, model.BoundingBoxes)));
}

export function posAdd(pos, a, b) {
    return new XYPos(pos.X + a, pos.Y + b);
}

/**
 * Finds all components (that are stored in the Sheet model) near pos
 */
export function findNearbyComponents(model, pos, range) {
    return collect((_arg) => {
        if (_arg != null) {
            const x_1 = _arg;
            return singleton(x_1);
        }
        else {
            return empty();
        }
    }, map_5((arg) => {
        let pos_1;
        const x = arg;
        pos_1 = posAdd(pos, x[0], x[1]);
        return tryFindKey((k, box) => insideBox(pos_1, box), model.BoundingBoxes);
    }, allPairs(toList_2(rangeDouble(-range, 10, range)), toList_2(rangeDouble(-range, 10, range)))));
}

/**
 * Checks if pos is inside any of the ports in portList
 */
export function mouseOnPort(portList, pos, margin) {
    const radius = 5;
    const insidePortCircle = (pos_1, portLocation) => {
        let arg0__1, arg0__3;
        let distance;
        const arg0__5 = ((arg0__1 = (pos_1.X - portLocation.X), Math.pow(arg0__1, 2))) + ((arg0__3 = (pos_1.Y - portLocation.Y), Math.pow(arg0__3, 2)));
        distance = Math.pow(arg0__5, 0.5);
        return distance <= (radius + margin);
    };
    const matchValue = tryFind_1((tupledArg) => {
        const portLocation_1 = tupledArg[1];
        return insidePortCircle(pos, portLocation_1);
    }, portList);
    if (matchValue == null) {
        return void 0;
    }
    else {
        const portLocation_2 = matchValue[1];
        const portId = matchValue[0];
        return [portId, portLocation_2];
    }
}

/**
 * Returns the ports of all model.NearbyComponents
 */
export function findNearbyPorts(model) {
    const patternInput = getPortLocations(model.Wire.Symbol, model.NearbyComponents);
    const outputPortsMap = patternInput[1];
    const inputPortsMap = patternInput[0];
    return [toList_1(inputPortsMap), toList_1(outputPortsMap)];
}

/**
 * Returns what is located at pos.
 * Priority Order: InputPort -> OutputPort -> Label -> Wire -> Component -> Canvas
 */
export function mouseOn(model, pos) {
    const patternInput = findNearbyPorts(model);
    const outputPorts = patternInput[1];
    const inputPorts = patternInput[0];
    const matchValue = mouseOnPort(inputPorts, pos, 2.5);
    if (matchValue == null) {
        const matchValue_1 = mouseOnPort(outputPorts, pos, 2.5);
        if (matchValue_1 == null) {
            let matchValue_3;
            const radius = 5;
            const margin = 2.5;
            const insideCircle = (pos_1_1, circleLocation, radius_1, margin_1) => {
                const distance = Math.pow(Math.pow(pos_1_1.X - circleLocation.X, 2) + Math.pow(pos_1_1.Y - circleLocation.Y, 2), 0.5);
                return distance <= (radius_1 + margin_1);
            };
            const tryGetOppositeCorners = (corners) => {
                if (!equalsWith(equals, corners, defaultOf()) && (corners.length === 0)) {
                    return void 0;
                }
                else {
                    const _arg = tryFindIndex((c) => insideCircle(pos, c, radius, margin), corners);
                    if (_arg == null) {
                        return void 0;
                    }
                    else {
                        const idx = _arg | 0;
                        return [corners[(idx + 2) % 4], idx];
                    }
                }
            };
            matchValue_3 = tryPick((sId, sym) => {
                if (sym.Component.Type.tag === 26) {
                    const _arg_1 = tryGetOppositeCorners(translatePoints(sym.Pos, getCustomSymCorners(sym)));
                    if (_arg_1 != null) {
                        const p = _arg_1[1] | 0;
                        const fp = _arg_1[0];
                        return [sym, fp, p];
                    }
                    else {
                        return void 0;
                    }
                }
                else {
                    return void 0;
                }
            }, Optic_Get_op_HatDot_Z146BA564(new Optic_Get(), SheetT_symbols_)(model));
            if (matchValue_3 == null) {
                const matchValue_4 = tryPick((sId_1, sym_2) => {
                    if (insideBox(pos, sym_2.LabelBoundingBox)) {
                        return sym_2;
                    }
                    else {
                        return void 0;
                    }
                }, Optic_Get_op_HatDot_Z146BA564(new Optic_Get(), SheetT_symbols_)(model));
                if (matchValue_4 == null) {
                    const matchValue_5 = getClickedWire(model.Wire, pos, Constants_wireBoundingBoxSize / model.Zoom);
                    if (matchValue_5 == null) {
                        const matchValue_6 = tryFindKey((k, box) => insideBox(pos, box), model.BoundingBoxes);
                        if (matchValue_6 == null) {
                            return new SheetT_MouseOn(6, []);
                        }
                        else {
                            const compId = matchValue_6;
                            return new SheetT_MouseOn(3, [compId]);
                        }
                    }
                    else {
                        const connId = matchValue_5;
                        return new SheetT_MouseOn(4, [connId]);
                    }
                }
                else {
                    const sym_3 = matchValue_4;
                    return new SheetT_MouseOn(0, [sym_3.Id]);
                }
            }
            else {
                const sym_1 = matchValue_3[0];
                const mCorner = matchValue_3[2] | 0;
                const fixedCorner = matchValue_3[1];
                return new SheetT_MouseOn(5, [sym_1.Id, fixedCorner, mCorner]);
            }
        }
        else {
            const portLoc_1 = matchValue_1[1];
            const portId_1 = matchValue_1[0];
            return new SheetT_MouseOn(2, [portId_1, portLoc_1]);
        }
    }
    else {
        const portLoc = matchValue[1];
        const portId = matchValue[0];
        return new SheetT_MouseOn(1, [portId, portLoc]);
    }
}

export function notIntersectingComponents(model, box1, inputId) {
    return isEmpty_1(filter((sId, boundingBox) => {
        if (boxesIntersect(boundingBox, box1)) {
            return !equals(inputId, sId);
        }
        else {
            return false;
        }
    }, model.BoundingBoxes));
}

export function notIntersectingSelectedComponents(model, box1, inputId) {
    return isEmpty_1(filter((sId_1, boundingBox) => {
        if (boxesIntersect(boundingBox, box1)) {
            return !equals(inputId, sId_1);
        }
        else {
            return false;
        }
    }, filter((sId, _arg) => contains(sId, model.SelectedComponents, {
        Equals: equals,
        GetHashCode: safeHash,
    }), model.BoundingBoxes)));
}

//# sourceMappingURL=Sheet.fs.js.map
