import { boxUnion, symDiff, findIntersectingComponents, mouseOnPort, findNearbyPorts, findNearbyComponents, notIntersectingSelectedComponents, mouseOn, wireCmd, symbolCmd, notIntersectingComponents, symbolBBUnion, Constants_boxAspectRatio, sheetCmd, fitCircuitToWindowParas } from "./Sheet.fs.js";
import { Cmd_none, Cmd_batch } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { empty, singleton, append, delay, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { BusWireT_Model, SheetT_CursorType, SheetT_wire_, BusWireT_ASegment, SheetT_XYPosMov, SheetT_CurrentAction, SheetT_Model, SheetT_selectedComponents_, BusWireT_Msg, SymbolT_Msg, SheetT_symbols_, SymbolT_Symbol, SheetT_KeyboardMsg, SheetT_Msg } from "../Model/DrawModelType.fs.js";
import { BoundingBox, BoundingBox__Centre, XYPos, Rotation } from "../Common/CommonTypes.fs.js";
import { bind, value as value_2, map as map_1, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { exists, contains, cons, truncate, head, tail, append as append_1, sortBy, mapIndexed, concat, min, max, zip, ofArray, singleton as singleton_1, collect, sum, filter, sortByDescending, tryHead, length as length_1, isEmpty, empty as empty_1, fold, map } from "../fable_modules/fable-library.4.1.4/List.js";
import { tryFind, add, FSharpMap__get_Item } from "../fable_modules/fable-library.4.1.4/Map.js";
import { getBoundingBoxes, calcLabelBoundingBox } from "./Symbol.fs.js";
import { Optic_Get, Optic_Get_op_HatDot_Z146BA564, Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { comparePrimitives, compareArrays, safeHash, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { List_groupBy } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { getNewSegmentSnapInfo, getNewSymbolSnapInfo, emptySnap, snap2DSegment, snap2DSymbol, symbolMatch } from "./SheetSnap.fs.js";
import { toConsole, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { MouseT } from "../Common/DrawHelpers.fs.js";
import { parse } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { min as min_1, max as max_1 } from "../fable_modules/fable-library.4.1.4/Double.js";
import { updateWireSegmentJumpsAndSeparations } from "./BusWireSeparate.fs.js";
import { getConnectedWireIds, getClickedSegment } from "./BusWireUpdateHelpers.fs.js";
import { oneCompBoundsBothEdges as oneCompBoundsBothEdges_1, groupNewSelectedSymsModel, scaleSymbol, getScalingFactorAndOffsetCentreGroup, findSelectedSymbols } from "./RotateScale.fs.js";
import { getIntersectingWires } from "./BusWireUpdate.fs.js";
import { addSymbol, generateLabel, generateIOLabel } from "./SymbolUpdate.fs.js";
import { getActivePressedKeys } from "./SheetDisplay.fs.js";
import { overlap2DBox } from "./BlockHelpers.fs.js";

export function fitCircuitToScreenUpdate(model) {
    const patternInput = fitCircuitToWindowParas(model);
    const paras = patternInput[1];
    const model$0027 = patternInput[0];
    return [model$0027, Cmd_batch(toList(delay(() => append(singleton(sheetCmd(new SheetT_Msg(8, [paras.Scroll]))), delay(() => append(singleton(sheetCmd(new SheetT_Msg(6, []))), delay(() => ((Math.abs(model.Zoom - model$0027.Zoom) > 0.001) ? singleton(sheetCmd(new SheetT_Msg(2, [new SheetT_KeyboardMsg(6, [])]))) : empty()))))))))];
}

export function rotateLabel(sym) {
    let r1, r2, rot90, rot180;
    const newRot = (r1 = (new Rotation(3, [])), (r2 = defaultArg(sym.LabelRotation, new Rotation(0, [])), (rot90 = ((rot) => {
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
    }), (rot180 = ((rot_1) => {
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
    }), (r1.tag === 1) ? rot90(r2) : ((r1.tag === 2) ? rot180(r2) : ((r1.tag === 3) ? rot180(rot90(r2)) : r2))))));
    return new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, true, newRot, sym.Appearance, sym.Id, sym.Component, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
}

export function rotateSelectedLabelsClockwise(model) {
    const symMap = model.Wire.Symbol.Symbols;
    const syms = map((compId) => FSharpMap__get_Item(symMap, compId), model.SelectedComponents);
    const sMap_1 = fold((sMap, sym) => add(sym.Id, calcLabelBoundingBox(rotateLabel(sym)), sMap), symMap, syms);
    return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SheetT_symbols_)(sMap_1)(model), Cmd_none()];
}

export function bbOrientation(bb) {
    const ratio = Constants_boxAspectRatio;
    const matchValue = Math.abs(bb.W) > (ratio * Math.abs(bb.H));
    const matchValue_1 = Math.abs(bb.H) > (ratio * Math.abs(bb.W));
    let matchResult;
    if (matchValue) {
        if (matchValue_1) {
            matchResult = 2;
        }
        else if (Math.abs(bb.W) > 10) {
            matchResult = 0;
        }
        else {
            matchResult = 2;
        }
    }
    else if (matchValue_1) {
        if (Math.abs(bb.H) > 10) {
            matchResult = 1;
        }
        else {
            matchResult = 2;
        }
    }
    else {
        matchResult = 2;
    }
    switch (matchResult) {
        case 0:
            return ["horizontal", Math.abs(bb.W) / (Math.abs(bb.H) + 0.1)];
        case 1:
            return ["vertical", Math.abs(bb.H) / (Math.abs(bb.W) + 0.1)];
        default:
            return void 0;
    }
}

export function workOutArrangement(arrange, syms) {
    return defaultArg(map_1((tupledArg_3) => {
        let syms_4, orient;
        const syms_3 = tupledArg_3[0];
        const bbData_1 = tupledArg_3[1];
        let matchResult, orient_1, syms_5, orient_2, syms_6, syms_7;
        if (isEmpty(syms_3)) {
            matchResult = 0;
        }
        else if (bbData_1 != null) {
            if (arrange.tag === 1) {
                if ((syms_4 = syms_3, (orient = bbData_1[0], length_1(syms_4) < 3))) {
                    matchResult = 1;
                    orient_1 = bbData_1[0];
                    syms_5 = syms_3;
                }
                else {
                    matchResult = 2;
                    orient_2 = bbData_1[0];
                    syms_6 = syms_3;
                }
            }
            else {
                matchResult = 2;
                orient_2 = bbData_1[0];
                syms_6 = syms_3;
            }
        }
        else {
            matchResult = 3;
            syms_7 = syms_3;
        }
        switch (matchResult) {
            case 0:
                return [empty_1(), new FSharpResult$2(1, ["No alignable symbols found"])];
            case 1:
                return [syms_5, new FSharpResult$2(1, ["3 or more symbols of the same type are needed to distribute"])];
            case 2:
                return [syms_6, new FSharpResult$2(0, [orient_2])];
            default:
                return [syms_7, new FSharpResult$2(1, ["alignment failed"])];
        }
    }, tryHead(sortByDescending((tupledArg_2) => {
        const syms_2 = tupledArg_2[0];
        const bbData = tupledArg_2[1];
        return [length_1(syms_2), value_2(bbData)[1]];
    }, filter((tupledArg_1) => {
        const x_1 = tupledArg_1[1];
        return !equals(x_1, void 0);
    }, map((tupledArg) => {
        const sTyp = tupledArg[0];
        const syms_1 = tupledArg[1];
        return [syms_1, bind(bbOrientation, symbolBBUnion(true, syms_1))];
    }, List_groupBy(symbolMatch, syms, {
        Equals: equals,
        GetHashCode: safeHash,
    }))), {
        Compare: compareArrays,
    }))), [empty_1(), new FSharpResult$2(1, ["No alignable symnbols found"])]);
}

export function projectXY(isX, pos) {
    if (isX) {
        return pos.X;
    }
    else {
        return pos.Y;
    }
}

export function injectXY(isX, f, pos) {
    if (isX) {
        return new XYPos(f, pos.Y);
    }
    else {
        return new XYPos(pos.X, f);
    }
}

export function alignPosition(symbols, isX) {
    const lst = map((arg) => {
        let symbol_1, comp, patternInput, comp_1, matchValue, vS, hS, matchValue_2, w, h, centreX, centreY;
        return projectXY(isX, (symbol_1 = arg, (comp = symbol_1.Component, (patternInput = ((comp_1 = comp, (matchValue = defaultArg(symbol_1.HScale, 1), (vS = defaultArg(symbol_1.VScale, 1), (hS = matchValue, (matchValue_2 = symbol_1.STransform.Rotation, (matchValue_2.tag === 2) ? [comp_1.H * vS, comp_1.W * hS] : ((matchValue_2.tag === 1) ? [comp_1.W * hS, comp_1.H * vS] : ((matchValue_2.tag === 3) ? [comp_1.W * hS, comp_1.H * vS] : [comp_1.H * vS, comp_1.W * hS])))))))), (w = patternInput[1], (h = patternInput[0], (centreX = (comp.X + (w / 2)), (centreY = (comp.Y + (h / 2)), new XYPos(centreX, centreY)))))))));
    }, symbols);
    const av = sum(lst, {
        GetZero: () => 0,
        Add: (x, y) => (x + y),
    }) / length_1(lst);
    return collect((tupledArg) => {
        const c = tupledArg[0];
        const sym = tupledArg[1];
        const offset = av - c;
        return ofArray([new BusWireT_Msg(0, [new SymbolT_Msg(7, [singleton_1(sym.Id), injectXY(isX, offset, new XYPos(0, 0))])]), new BusWireT_Msg(8, [sym.Id])]);
    }, zip(lst, symbols));
}

export function distributePosition(symbols, isX) {
    const lst = map((arg) => {
        let symbol_1, comp, patternInput, comp_1, matchValue, vS, hS, matchValue_2, w, h, centreX, centreY;
        return projectXY(isX, (symbol_1 = arg, (comp = symbol_1.Component, (patternInput = ((comp_1 = comp, (matchValue = defaultArg(symbol_1.HScale, 1), (vS = defaultArg(symbol_1.VScale, 1), (hS = matchValue, (matchValue_2 = symbol_1.STransform.Rotation, (matchValue_2.tag === 2) ? [comp_1.H * vS, comp_1.W * hS] : ((matchValue_2.tag === 1) ? [comp_1.W * hS, comp_1.H * vS] : ((matchValue_2.tag === 3) ? [comp_1.W * hS, comp_1.H * vS] : [comp_1.H * vS, comp_1.W * hS])))))))), (w = patternInput[1], (h = patternInput[0], (centreX = (comp.X + (w / 2)), (centreY = (comp.Y + (h / 2)), new XYPos(centreX, centreY)))))))));
    }, symbols);
    const matchValue_3 = max(lst, {
        Compare: comparePrimitives,
    });
    const minF = min(lst, {
        Compare: comparePrimitives,
    });
    const maxF = matchValue_3;
    const incr = (maxF - minF) / (length_1(lst) - 1);
    return concat(mapIndexed((i, tupledArg) => {
        const f = tupledArg[0];
        const sym = tupledArg[1];
        const offset = injectXY(isX, (minF + (i * incr)) - f, new XYPos(0, 0));
        return ofArray([new BusWireT_Msg(0, [new SymbolT_Msg(7, [singleton_1(sym.Id), offset])]), new BusWireT_Msg(8, [sym.Id])]);
    }, sortBy((tuple) => tuple[0], zip(lst, symbols), {
        Compare: comparePrimitives,
    })));
}

export function arrangeSymbols(arrange, model) {
    const patternInput = workOutArrangement(arrange, map((sId) => FSharpMap__get_Item(model.Wire.Symbol.Symbols, sId), model.SelectedComponents));
    const syms_1 = patternInput[0];
    const result = patternInput[1];
    const newSelected = map((sym) => sym.Component.Id, syms_1);
    if (result.tag === 0) {
        const orientation = result.fields[0];
        const postludeCmds = singleton_1(sheetCmd(new SheetT_Msg(6, [])));
        const cmds = map((arg_1) => sheetCmd(new SheetT_Msg(0, [arg_1])), (arrange.tag === 1) ? distributePosition(syms_1, orientation === "horizontal") : alignPosition(syms_1, orientation === "vertical"));
        return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SheetT_selectedComponents_)(newSelected)(model), Cmd_batch(append_1(cmds, postludeCmds))];
    }
    else {
        const _mess = result.fields[0];
        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, newSelected, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, model.Action, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_none()];
    }
}

/**
 * Update function to move symbols in model.SelectedComponents
 */
export function moveSymbols(model, mMsg) {
    let left, right, left_1, right_1;
    const patternInput = (model.Action.tag === 5) ? [new SheetT_CurrentAction(5, []), true] : [new SheetT_CurrentAction(3, []), false];
    const nextAction = patternInput[0];
    const isDragAndDrop = patternInput[1];
    const matchValue_1 = model.SelectedComponents;
    if (!isEmpty(matchValue_1)) {
        if (isEmpty(tail(matchValue_1))) {
            const symId = head(matchValue_1);
            let symbol_1;
            const matchValue_2 = tryFind(symId, model.Wire.Symbol.Symbols);
            if (matchValue_2 == null) {
                symbol_1 = toFail(printf("What? can\'t move a symbol which does not exist in the model!"));
            }
            else {
                const symbol = matchValue_2;
                symbol_1 = symbol;
            }
            const compId = head(model.SelectedComponents);
            const bBox = FSharpMap__get_Item(model.BoundingBoxes, compId);
            const patternInput_1 = snap2DSymbol(model.AutomaticScrolling, mMsg.Pos, symbol_1, model);
            const snapXY = patternInput_1[0];
            const moveDelta = patternInput_1[1];
            const errorComponents = notIntersectingComponents(model, bBox, compId) ? empty_1() : singleton_1(compId);
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, errorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, nextAction, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, snapXY, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(7, [model.SelectedComponents, moveDelta])), sheetCmd(new SheetT_Msg(7, [head(model.SelectedComponents)])), symbolCmd(new SymbolT_Msg(16, [errorComponents, model.SelectedComponents, isDragAndDrop])), sheetCmd(new SheetT_Msg(13, [])), wireCmd(new BusWireT_Msg(7, [model.SelectedComponents, moveDelta]))]))];
        }
        else {
            const errorComponents_1 = filter((sId) => !notIntersectingComponents(model, FSharpMap__get_Item(model.BoundingBoxes, sId), sId), model.SelectedComponents);
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, errorComponents_1, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, nextAction, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(7, [model.SelectedComponents, (left = mMsg.Pos, (right = model.LastMousePos, new XYPos(left.X - right.X, left.Y - right.Y)))])), symbolCmd(new SymbolT_Msg(16, [errorComponents_1, model.SelectedComponents, isDragAndDrop])), sheetCmd(new SheetT_Msg(6, [])), sheetCmd(new SheetT_Msg(13, [])), wireCmd(new BusWireT_Msg(7, [model.SelectedComponents, (left_1 = mMsg.Pos, (right_1 = model.LastMousePos, new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y)))]))]))];
        }
    }
    else {
        return [model, Cmd_none()];
    }
}

/**
 * Inputs are segment ID being dragged and new mouse position.
 * Performs the Segment Drag operation implementing snaps.
 * This function must be in update and creates additional commands
 * to implement the drag oeporation.
 */
export function snapWire(model, mMsg, segIdL) {
    let wire, initPos, initOrientation, state_2;
    let patternInput;
    const matchValue = model.Action;
    if (matchValue.tag === 7) {
        const segId = matchValue.fields[0];
        patternInput = [new SheetT_CurrentAction(7, [segId]), true];
    }
    else {
        patternInput = [new SheetT_CurrentAction(11, []), false];
    }
    const nextAction = patternInput[0];
    const isMovingWire = patternInput[1];
    if (!isEmpty(segIdL)) {
        const segId_1 = head(segIdL);
        const index = segId_1[0] | 0;
        const connId = segId_1[1];
        let aSegment;
        const segId_2 = [segId_1[0], segId_1[1]];
        const index_1 = segId_2[0] | 0;
        const Wid = segId_2[1];
        const getASeg = (startPos, endPos, state, seg) => {
            if (seg.Index === index_1) {
                return new BusWireT_ASegment(startPos, endPos, seg);
            }
            else {
                return state;
            }
        };
        aSegment = value_2((wire = FSharpMap__get_Item(model.Wire.Wires, Wid), (initPos = wire.StartPos, (initOrientation = wire.InitialOrientation, (state_2 = fold((tupledArg, seg_1) => {
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
                const nextState = getASeg(currPos, nextPos, currState, seg_1);
                return [nextState, nextPos, nextOrientation];
            }
        }, [void 0, initPos, initOrientation], wire.Segments)[0], state_2)))));
        const patternInput_1 = snap2DSegment(model.AutomaticScrolling, mMsg.Pos, aSegment, model);
        const snapXY = patternInput_1[0];
        const delta = patternInput_1[1];
        let newPos;
        const left = aSegment.Start;
        const right = delta;
        newPos = (new XYPos(left.X + right.X, left.Y + right.Y));
        const newmMsg = new MouseT(newPos, mMsg.ScreenMovement, mMsg.ScreenPage, mMsg.ShiftKeyDown, mMsg.Op);
        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, empty_1(), model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, nextAction, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, snapXY, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([wireCmd(new BusWireT_Msg(9, [segIdL, newmMsg])), sheetCmd(new SheetT_Msg(13, []))]))];
    }
    else {
        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, empty_1(), model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, nextAction, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, emptySnap, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_none()];
    }
}

export function hextoInt(s) {
    let s0;
    let copyOfStruct = s[0];
    s0 = copyOfStruct;
    let s1;
    let copyOfStruct_1 = s[1];
    s1 = copyOfStruct_1;
    const i0 = ((s0 === "a") ? 10 : ((s0 === "b") ? 11 : ((s0 === "c") ? 12 : ((s0 === "d") ? 13 : ((s0 === "e") ? 14 : ((s0 === "f") ? 15 : parse(s0, 511, false, 32))))))) | 0;
    const i1 = ((s1 === "a") ? 10 : ((s1 === "b") ? 11 : ((s1 === "c") ? 12 : ((s1 === "d") ? 13 : ((s1 === "e") ? 14 : ((s1 === "f") ? 15 : parse(s1, 511, false, 32))))))) | 0;
    return ((i0 * 16) + i1) | 0;
}

export function appendUndoList(undoList, model_in) {
    let n;
    const removeLast = (inputLst) => truncate(max_1(0, length_1(inputLst) - 1), inputLst);
    const matchValue = length_1(undoList) | 0;
    if ((n = (matchValue | 0), n < 500)) {
        const n_1 = matchValue | 0;
        return cons(model_in, undoList);
    }
    else {
        return cons(model_in, removeLast(undoList));
    }
}

/**
 * Mouse Down Update, Can have clicked on: Label, InputPort / OutputPort / Component / Wire / Canvas. Do correct action for each.
 */
export function mDownUpdate(model, mMsg) {
    let compId_3, left, right;
    let newModel_1;
    const matchValue = model.TmpModel;
    if (matchValue != null) {
        const newModel = matchValue;
        newModel_1 = newModel;
    }
    else {
        newModel_1 = model;
    }
    if (model.Action.tag === 5) {
        const errorComponents = filter((sId) => !notIntersectingComponents(model, FSharpMap__get_Item(model.BoundingBoxes, sId), sId), model.SelectedComponents);
        const matchValue_2 = isEmpty(errorComponents);
        if (matchValue_2) {
            const model_2 = Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SheetT_wire_)((model_1) => updateWireSegmentJumpsAndSeparations(model.SelectedWires, model_1))(new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, getBoundingBoxes(model.Wire.Symbol), model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, emptySnap, emptySnap, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, false, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice));
            return [model_2, Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(11, [model_2.SelectedComponents])), wireCmd(new BusWireT_Msg(6, [model_2.SelectedWires])), wireCmd(new BusWireT_Msg(13, [empty_1()]))]))];
        }
        else {
            return [model, Cmd_none()];
        }
    }
    else {
        const matchValue_3 = mouseOn(model, mMsg.Pos);
        switch (matchValue_3.tag) {
            case 0: {
                const compId = matchValue_3.fields[0];
                return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(2, [compId]), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), sheetCmd(new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(11, [singleton_1(compId)])])]))];
            }
            case 1: {
                const portLoc = matchValue_3.fields[1];
                const portId = matchValue_3.fields[0];
                if (!model.CtrlKeyDown) {
                    return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, [portLoc, mMsg.Pos], model.TargetPortId, new SheetT_CurrentAction(8, [portId]), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), symbolCmd(new SymbolT_Msg(5, []))];
                }
                else {
                    let portIdstr;
                    const x = portId;
                    portIdstr = x;
                    return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(14, [portIdstr]), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), symbolCmd(new SymbolT_Msg(34, [portIdstr, mMsg.Pos]))];
                }
            }
            case 2: {
                const portLoc_1 = matchValue_3.fields[1];
                const portId_1 = matchValue_3.fields[0];
                if (!model.CtrlKeyDown) {
                    return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, [portLoc_1, mMsg.Pos], model.TargetPortId, new SheetT_CurrentAction(9, [portId_1]), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), symbolCmd(new SymbolT_Msg(4, []))];
                }
                else {
                    let portIdstr_1;
                    const x_1 = portId_1;
                    portIdstr_1 = x_1;
                    return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(14, [portIdstr_1]), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), symbolCmd(new SymbolT_Msg(34, [portIdstr_1, mMsg.Pos]))];
                }
            }
            case 5: {
                const fixedCornerLoc = matchValue_3.fields[1];
                const compId_1 = matchValue_3.fields[0];
                if (!model.CtrlKeyDown) {
                    return [model, Cmd_none()];
                }
                else {
                    const symbolMap = Optic_Get_op_HatDot_Z146BA564(new Optic_Get(), SheetT_symbols_)(model);
                    const symbol = FSharpMap__get_Item(symbolMap, compId_1);
                    return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(15, [compId_1, fixedCornerLoc]), model.ShowGrid, model.CursorType, model.LastValidPos, symbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), symbolCmd(new SymbolT_Msg(38, [compId_1, fixedCornerLoc, mMsg.Pos]))];
                }
            }
            case 3: {
                const compId_2 = matchValue_3.fields[0];
                const matchValue_4 = FSharpMap__get_Item(model.Wire.Symbol.Symbols, compId_2).Annotation;
                if (matchValue_4 != null) {
                    if (matchValue_4.tag === 1) {
                        const rotation = matchValue_4.fields[0];
                        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([sheetCmd(new SheetT_Msg(30, [rotation])), wireCmd(new BusWireT_Msg(19, [model.SelectedComponents]))]))];
                    }
                    else {
                        const scalingBoxCentre = BoundingBox__Centre(value_2(model.ScalingBox).ScalingBoxBound);
                        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(12, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model, void 0, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, scalingBoxCentre, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_none()];
                    }
                }
                else {
                    const msg = new SheetT_Msg(14, []);
                    const action = new SheetT_CurrentAction(1, [compId_2]);
                    if (model.CtrlKeyDown ? true : mMsg.ShiftKeyDown) {
                        const newComponents = contains(compId_2, model.SelectedComponents, {
                            Equals: equals,
                            GetHashCode: safeHash,
                        }) ? filter((cId) => !equals(cId, compId_2), model.SelectedComponents) : cons(compId_2, model.SelectedComponents);
                        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.BoundingBoxes, model.SelectedLabel, newComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, action, model.ShowGrid, model.CursorType, mMsg.Pos, model.LastValidSymbol, emptySnap, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.SelectedWires, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(11, [newComponents])), sheetCmd(msg)]))];
                    }
                    else {
                        const patternInput_1 = contains(compId_2, model.SelectedComponents, {
                            Equals: equals,
                            GetHashCode: safeHash,
                        }) ? [model.SelectedComponents, model.SelectedWires] : [singleton_1(compId_2), empty_1()];
                        const newWires = patternInput_1[1];
                        const newComponents_1 = patternInput_1[0];
                        const snapXY = !isEmpty(newComponents_1) ? (isEmpty(tail(newComponents_1)) ? ((compId_3 = head(newComponents_1), getNewSymbolSnapInfo(model, FSharpMap__get_Item(model.Wire.Symbol.Symbols, compId_3)))) : emptySnap) : emptySnap;
                        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.BoundingBoxes, model.SelectedLabel, newComponents_1, newWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, action, model.ShowGrid, model.CursorType, mMsg.Pos, model.LastValidSymbol, snapXY, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(11, [newComponents_1])), wireCmd(new BusWireT_Msg(6, [newWires])), sheetCmd(msg)]))];
                    }
                }
            }
            case 4: {
                const connId = matchValue_3.fields[0];
                const aSegL = getClickedSegment(model.Wire, connId, mMsg.Pos);
                const segIdL = map((aSeg) => {
                    const this$ = aSeg.Segment;
                    return [this$.Index, this$.WireId];
                }, aSegL);
                const connIdL = map((tuple) => tuple[1], segIdL);
                const msg_1 = new SheetT_Msg(14, []);
                if (model.CtrlKeyDown) {
                    const newWires_1 = contains(connId, model.SelectedWires, {
                        Equals: equals,
                        GetHashCode: safeHash,
                    }) ? filter((cId_1) => !equals(cId_1, connId), model.SelectedWires) : cons(connId, model.SelectedWires);
                    if (isEmpty(model.ErrorComponents)) {
                        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, newWires_1, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.SelectedWires, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([wireCmd(new BusWireT_Msg(6, [newWires_1])), sheetCmd(msg_1)]))];
                    }
                    else {
                        toConsole(printf("Error components (Right)"));
                        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(5, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(singleton_1(sheetCmd(new SheetT_Msg(14, []))))];
                    }
                }
                else {
                    const snapXY_1 = getNewSegmentSnapInfo(model, aSegL);
                    return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, empty_1(), singleton_1(connId), model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(7, [segIdL]), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, snapXY_1, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(11, [empty_1()])), wireCmd(new BusWireT_Msg(6, [singleton_1(connId)])), wireCmd(new BusWireT_Msg(9, [segIdL, mMsg])), wireCmd(new BusWireT_Msg(13, [connIdL])), sheetCmd(msg_1)]))];
                }
            }
            default:
                if (mMsg.ShiftKeyDown) {
                    return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(6, [(left = model.ScreenScrollPos, (right = mMsg.ScreenPage, new XYPos(left.X + right.X, left.Y + right.Y)))]), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_none()];
                }
                else {
                    const patternInput_2 = model.CtrlKeyDown ? [model.SelectedComponents, model.SelectedWires] : [empty_1(), empty_1()];
                    const newWires_2 = patternInput_2[1];
                    const newComponents_2 = patternInput_2[0];
                    let initialiseSelection;
                    const inputRecord = model.DragToSelectBox;
                    initialiseSelection = (new BoundingBox(new XYPos(mMsg.Pos.X, mMsg.Pos.Y), inputRecord.W, inputRecord.H));
                    if (model.CtrlKeyDown) {
                        if (isEmpty(model.ErrorComponents)) {
                            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, newComponents_2, newWires_2, model.NearbyComponents, model.ErrorComponents, initialiseSelection, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(0, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(11, [newComponents_2])), wireCmd(new BusWireT_Msg(6, [newWires_2]))]))];
                        }
                        else {
                            toConsole(printf("Error components (Right)"));
                            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(5, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_none()];
                        }
                    }
                    else if (model.ScalingBox == null) {
                        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, newComponents_2, newWires_2, model.NearbyComponents, model.ErrorComponents, initialiseSelection, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(0, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(11, [newComponents_2])), wireCmd(new BusWireT_Msg(6, [newWires_2]))]))];
                    }
                    else if (isEmpty(model.ErrorComponents)) {
                        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, newComponents_2, newWires_2, model.NearbyComponents, model.ErrorComponents, initialiseSelection, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(0, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(11, [newComponents_2])), wireCmd(new BusWireT_Msg(6, [newWires_2]))]))];
                    }
                    else {
                        return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(5, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(singleton_1(sheetCmd(new SheetT_Msg(14, []))))];
                    }
                }
        }
    }
}

/**
 * Mouse Drag Update, can be: drag-to-selecting, moving symbols, connecting wire between ports.
 */
export function mDragUpdate(model, mMsg) {
    let matchValue_1, modelBeforeUpdate, scalingBoxCentre, newScalingBoxOppositeMouse, newBBMin, newBBMax, selectedSymbols, xYSC, scaleSymFunc, newSymModel, newModel, inputRecord_1, inputRecord, inputRecord_2, newSelectedSymbols, oneCompBoundsBothEdges, errorComponents, errorSelectedComponents, staySameModel, scalingTmpModel, matchValue_2, matchValue_3, inputRecord_3, initialX, initialY, newDragToSelectBox, compId, patternInput, newModel_1, cmd_1, movingCompId, matchValue_5, compid, left, right, nearbyComponents, nearbyOutputPorts, patternInput_2, matchValue_6, portLoc, portId, targetPort, drawLineTarget, nearbyComponents_1, nearbyInputPorts, patternInput_4, matchValue_7, portLoc_1, portId_1, targetPort_1, drawLineTarget_1, portId_2, fixedCornerLoc, compId_1, bBox, errorComponents_1, initPos, sPos, left_1, right_1, segIdL;
    const setDragCursor = (tupledArg) => {
        const model_1 = tupledArg[0];
        const cmd = tupledArg[1];
        let dragCursor;
        const matchValue = model_1.Action;
        dragCursor = ((matchValue.tag === 4) ? (new SheetT_CursorType(7, [])) : ((matchValue.tag === 3) ? (new SheetT_CursorType(1, [])) : model_1.CursorType));
        return [new SheetT_Model(model_1.Wire, model_1.PopupViewFunc, model_1.PopupDialogData, model_1.BoundingBoxes, model_1.LastValidBoundingBoxes, model_1.SelectedLabel, model_1.SelectedComponents, model_1.SelectedWires, model_1.NearbyComponents, model_1.ErrorComponents, model_1.DragToSelectBox, model_1.ConnectPortsLine, model_1.TargetPortId, model_1.Action, model_1.ShowGrid, dragCursor, model_1.LastValidPos, model_1.LastValidSymbol, model_1.SnapSymbols, model_1.SnapSegments, model_1.CurrentKeyPresses, model_1.Zoom, model_1.CanvasSize, model_1.TmpModel, model_1.ScalingTmpModel, model_1.UndoList, model_1.RedoList, model_1.AutomaticScrolling, model_1.ScreenScrollPos, model_1.LastMousePos, model_1.ScalingBoxCentrePos, model_1.InitMouseToScalingBoxCentre, model_1.ScrollingLastMousePos, model_1.LastMousePosForSnap, model_1.MouseCounter, model_1.CtrlKeyDown, model_1.PrevWireSelection, model_1.ScalingBox, model_1.Compiling, model_1.CompilationStatus, model_1.CompilationProcess, model_1.DebugState, model_1.DebugData, model_1.DebugMappings, model_1.DebugIsConnected, model_1.DebugDevice), cmd];
    };
    return setDragCursor((matchValue_1 = model.Action, (matchValue_1.tag === 12) ? ((modelBeforeUpdate = model, (scalingBoxCentre = model.ScalingBoxCentrePos, (newScalingBoxOppositeMouse = (new XYPos(scalingBoxCentre.X - (mMsg.Pos.X - scalingBoxCentre.X), scalingBoxCentre.Y - (mMsg.Pos.Y - scalingBoxCentre.Y))), (newBBMin = (new XYPos(min_1(newScalingBoxOppositeMouse.X, mMsg.Pos.X) + 50, min_1(newScalingBoxOppositeMouse.Y, mMsg.Pos.Y) + 50)), (newBBMax = (new XYPos(max_1(newScalingBoxOppositeMouse.X, mMsg.Pos.X) - 50, max_1(newScalingBoxOppositeMouse.Y, mMsg.Pos.Y) - 50)), (selectedSymbols = findSelectedSymbols(modelBeforeUpdate.SelectedComponents, modelBeforeUpdate.Wire.Symbol), (xYSC = getScalingFactorAndOffsetCentreGroup(newBBMin, newBBMax, selectedSymbols), (scaleSymFunc = ((sym) => scaleSymbol(xYSC[0], xYSC[1], sym)), (newSymModel = groupNewSelectedSymsModel(modelBeforeUpdate.SelectedComponents, modelBeforeUpdate.Wire.Symbol, selectedSymbols, scaleSymFunc), (newModel = ((inputRecord_1 = (new SheetT_Model((inputRecord = model.Wire, new BusWireT_Model(newSymModel, inputRecord.Wires, inputRecord.CopiedWires, inputRecord.SelectedSegment, inputRecord.LastMousePos, inputRecord.ErrorWires, inputRecord.Notifications, inputRecord.Type, inputRecord.ArrowDisplay, inputRecord.SnapToNet)), model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, model.Action, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice)), new SheetT_Model(inputRecord_1.Wire, inputRecord_1.PopupViewFunc, inputRecord_1.PopupDialogData, getBoundingBoxes((new SheetT_Model((inputRecord_2 = model.Wire, new BusWireT_Model(newSymModel, inputRecord_2.Wires, inputRecord_2.CopiedWires, inputRecord_2.SelectedSegment, inputRecord_2.LastMousePos, inputRecord_2.ErrorWires, inputRecord_2.Notifications, inputRecord_2.Type, inputRecord_2.ArrowDisplay, inputRecord_2.SnapToNet)), model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, model.Action, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice)).Wire.Symbol), inputRecord_1.LastValidBoundingBoxes, inputRecord_1.SelectedLabel, inputRecord_1.SelectedComponents, inputRecord_1.SelectedWires, inputRecord_1.NearbyComponents, inputRecord_1.ErrorComponents, inputRecord_1.DragToSelectBox, inputRecord_1.ConnectPortsLine, inputRecord_1.TargetPortId, inputRecord_1.Action, inputRecord_1.ShowGrid, inputRecord_1.CursorType, inputRecord_1.LastValidPos, inputRecord_1.LastValidSymbol, inputRecord_1.SnapSymbols, inputRecord_1.SnapSegments, inputRecord_1.CurrentKeyPresses, inputRecord_1.Zoom, inputRecord_1.CanvasSize, inputRecord_1.TmpModel, inputRecord_1.ScalingTmpModel, inputRecord_1.UndoList, inputRecord_1.RedoList, inputRecord_1.AutomaticScrolling, inputRecord_1.ScreenScrollPos, inputRecord_1.LastMousePos, inputRecord_1.ScalingBoxCentrePos, inputRecord_1.InitMouseToScalingBoxCentre, inputRecord_1.ScrollingLastMousePos, inputRecord_1.LastMousePosForSnap, inputRecord_1.MouseCounter, inputRecord_1.CtrlKeyDown, inputRecord_1.PrevWireSelection, inputRecord_1.ScalingBox, inputRecord_1.Compiling, inputRecord_1.CompilationStatus, inputRecord_1.CompilationProcess, inputRecord_1.DebugState, inputRecord_1.DebugData, inputRecord_1.DebugMappings, inputRecord_1.DebugIsConnected, inputRecord_1.DebugDevice))), (newSelectedSymbols = findSelectedSymbols(newModel.SelectedComponents, newModel.Wire.Symbol), (oneCompBoundsBothEdges = oneCompBoundsBothEdges_1(newSelectedSymbols), (errorComponents = filter((sId) => !notIntersectingComponents(newModel, FSharpMap__get_Item(newModel.BoundingBoxes, sId), sId), modelBeforeUpdate.SelectedComponents), (errorSelectedComponents = filter((sId_1) => !notIntersectingSelectedComponents(newModel, FSharpMap__get_Item(newModel.BoundingBoxes, sId_1), sId_1), modelBeforeUpdate.SelectedComponents), (staySameModel = (!equals(errorSelectedComponents, empty_1()) ? modelBeforeUpdate : ((oneCompBoundsBothEdges && (model.ScalingTmpModel != null)) ? modelBeforeUpdate.ScalingTmpModel : void 0)), (scalingTmpModel = ((matchValue_2 = (modelBeforeUpdate.ScalingTmpModel == null), (matchValue_3 = !equals(errorSelectedComponents, empty_1()), oneCompBoundsBothEdges ? (matchValue_2 ? void 0 : modelBeforeUpdate.ScalingTmpModel) : (matchValue_3 ? modelBeforeUpdate.ScalingTmpModel : newModel)))), (staySameModel != null) ? [(inputRecord_3 = value_2(staySameModel), new SheetT_Model(inputRecord_3.Wire, inputRecord_3.PopupViewFunc, inputRecord_3.PopupDialogData, inputRecord_3.BoundingBoxes, inputRecord_3.LastValidBoundingBoxes, inputRecord_3.SelectedLabel, inputRecord_3.SelectedComponents, inputRecord_3.SelectedWires, inputRecord_3.NearbyComponents, inputRecord_3.ErrorComponents, inputRecord_3.DragToSelectBox, inputRecord_3.ConnectPortsLine, inputRecord_3.TargetPortId, inputRecord_3.Action, inputRecord_3.ShowGrid, inputRecord_3.CursorType, inputRecord_3.LastValidPos, inputRecord_3.LastValidSymbol, inputRecord_3.SnapSymbols, inputRecord_3.SnapSegments, inputRecord_3.CurrentKeyPresses, inputRecord_3.Zoom, inputRecord_3.CanvasSize, inputRecord_3.TmpModel, scalingTmpModel, inputRecord_3.UndoList, inputRecord_3.RedoList, inputRecord_3.AutomaticScrolling, inputRecord_3.ScreenScrollPos, inputRecord_3.LastMousePos, inputRecord_3.ScalingBoxCentrePos, inputRecord_3.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), inputRecord_3.LastMousePosForSnap, inputRecord_3.MouseCounter, inputRecord_3.CtrlKeyDown, inputRecord_3.PrevWireSelection, inputRecord_3.ScalingBox, inputRecord_3.Compiling, inputRecord_3.CompilationStatus, inputRecord_3.CompilationProcess, inputRecord_3.DebugState, inputRecord_3.DebugData, inputRecord_3.DebugMappings, inputRecord_3.DebugIsConnected, inputRecord_3.DebugDevice)), Cmd_batch(ofArray([sheetCmd(new SheetT_Msg(13, [])), wireCmd(new BusWireT_Msg(19, [value_2(staySameModel).SelectedComponents])), sheetCmd(new SheetT_Msg(6, []))]))] : [new SheetT_Model(newModel.Wire, newModel.PopupViewFunc, newModel.PopupDialogData, newModel.BoundingBoxes, newModel.LastValidBoundingBoxes, newModel.SelectedLabel, newModel.SelectedComponents, newModel.SelectedWires, newModel.NearbyComponents, errorComponents, newModel.DragToSelectBox, newModel.ConnectPortsLine, newModel.TargetPortId, newModel.Action, newModel.ShowGrid, newModel.CursorType, newModel.LastValidPos, newModel.LastValidSymbol, newModel.SnapSymbols, newModel.SnapSegments, newModel.CurrentKeyPresses, newModel.Zoom, newModel.CanvasSize, newModel.TmpModel, scalingTmpModel, newModel.UndoList, newModel.RedoList, newModel.AutomaticScrolling, newModel.ScreenScrollPos, newModel.LastMousePos, newModel.ScalingBoxCentrePos, newModel.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), newModel.LastMousePosForSnap, newModel.MouseCounter, newModel.CtrlKeyDown, newModel.PrevWireSelection, newModel.ScalingBox, newModel.Compiling, newModel.CompilationStatus, newModel.CompilationProcess, newModel.DebugState, newModel.DebugData, newModel.DebugMappings, newModel.DebugIsConnected, newModel.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(16, [errorComponents, newModel.SelectedComponents, false])), sheetCmd(new SheetT_Msg(13, [])), wireCmd(new BusWireT_Msg(19, [model.SelectedComponents])), sheetCmd(new SheetT_Msg(6, []))]))]))))))))))))))))) : ((matchValue_1.tag === 0) ? ((initialX = model.DragToSelectBox.TopLeft.X, (initialY = model.DragToSelectBox.TopLeft.Y, (newDragToSelectBox = (new BoundingBox(model.DragToSelectBox.TopLeft, mMsg.Pos.X - initialX, mMsg.Pos.Y - initialY)), [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, newDragToSelectBox, model.ConnectPortsLine, model.TargetPortId, model.Action, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), sheetCmd(new SheetT_Msg(13, []))])))) : ((matchValue_1.tag === 2) ? ((compId = matchValue_1.fields[0], [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, compId, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(4, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), sheetCmd(new SheetT_Msg(14, []))])) : ((matchValue_1.tag === 1) ? ((patternInput = moveSymbols(model, mMsg), (newModel_1 = patternInput[0], (cmd_1 = patternInput[1], [new SheetT_Model(newModel_1.Wire, newModel_1.PopupViewFunc, newModel_1.PopupDialogData, newModel_1.BoundingBoxes, newModel_1.LastValidBoundingBoxes, newModel_1.SelectedLabel, newModel_1.SelectedComponents, newModel_1.SelectedWires, newModel_1.NearbyComponents, newModel_1.ErrorComponents, newModel_1.DragToSelectBox, newModel_1.ConnectPortsLine, newModel_1.TargetPortId, newModel_1.Action, newModel_1.ShowGrid, newModel_1.CursorType, newModel_1.LastValidPos, newModel_1.LastValidSymbol, newModel_1.SnapSymbols, newModel_1.SnapSegments, newModel_1.CurrentKeyPresses, newModel_1.Zoom, newModel_1.CanvasSize, newModel_1, newModel_1.ScalingTmpModel, newModel_1.UndoList, newModel_1.RedoList, newModel_1.AutomaticScrolling, newModel_1.ScreenScrollPos, newModel_1.LastMousePos, newModel_1.ScalingBoxCentrePos, newModel_1.InitMouseToScalingBoxCentre, newModel_1.ScrollingLastMousePos, newModel_1.LastMousePosForSnap, newModel_1.MouseCounter, newModel_1.CtrlKeyDown, newModel_1.PrevWireSelection, newModel_1.ScalingBox, newModel_1.Compiling, newModel_1.CompilationStatus, newModel_1.CompilationProcess, newModel_1.DebugState, newModel_1.DebugData, newModel_1.DebugMappings, newModel_1.DebugIsConnected, newModel_1.DebugDevice), Cmd_batch(singleton_1(cmd_1))])))) : ((matchValue_1.tag === 3) ? moveSymbols(model, mMsg) : ((matchValue_1.tag === 5) ? moveSymbols(model, mMsg) : ((matchValue_1.tag === 4) ? ((movingCompId = ((matchValue_5 = model.SelectedLabel, (matchValue_5 == null) ? toFail(printf("What? no component found for moving label operation")) : ((compid = matchValue_5, compid)))), [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(4, []), model.ShowGrid, new SheetT_CursorType(7, []), model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), symbolCmd(new SymbolT_Msg(8, [movingCompId, (left = mMsg.Pos, (right = model.LastMousePos, new XYPos(left.X - right.X, left.Y - right.Y)))]))])) : ((matchValue_1.tag === 8) ? ((nearbyComponents = findNearbyComponents(model, mMsg.Pos, 50), (nearbyOutputPorts = findNearbyPorts(model)[1], (patternInput_2 = ((matchValue_6 = mouseOnPort(nearbyOutputPorts, mMsg.Pos, 12.5), (matchValue_6 == null) ? ["", mMsg.Pos] : ((portLoc = matchValue_6[1], (portId = matchValue_6[0], [portId, portLoc]))))), (targetPort = patternInput_2[0], (drawLineTarget = patternInput_2[1], [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, nearbyComponents, model.ErrorComponents, model.DragToSelectBox, [model.ConnectPortsLine[0], drawLineTarget], targetPort, model.Action, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), sheetCmd(new SheetT_Msg(13, []))])))))) : ((matchValue_1.tag === 9) ? ((nearbyComponents_1 = findNearbyComponents(model, mMsg.Pos, 50), (nearbyInputPorts = findNearbyPorts(model)[0], (patternInput_4 = ((matchValue_7 = mouseOnPort(nearbyInputPorts, mMsg.Pos, 12.5), (matchValue_7 == null) ? ["", mMsg.Pos] : ((portLoc_1 = matchValue_7[1], (portId_1 = matchValue_7[0], [portId_1, portLoc_1]))))), (targetPort_1 = patternInput_4[0], (drawLineTarget_1 = patternInput_4[1], [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, nearbyComponents_1, model.ErrorComponents, model.DragToSelectBox, [model.ConnectPortsLine[0], drawLineTarget_1], targetPort_1, model.Action, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), sheetCmd(new SheetT_Msg(13, []))])))))) : ((matchValue_1.tag === 14) ? ((portId_2 = matchValue_1.fields[0], [model, symbolCmd(new SymbolT_Msg(34, [portId_2, mMsg.Pos]))])) : ((matchValue_1.tag === 15) ? ((fixedCornerLoc = matchValue_1.fields[1], (compId_1 = matchValue_1.fields[0], (bBox = FSharpMap__get_Item(model.BoundingBoxes, compId_1), (errorComponents_1 = (notIntersectingComponents(model, bBox, compId_1) ? empty_1() : singleton_1(compId_1)), [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, errorComponents_1, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, model.Action, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(38, [compId_1, fixedCornerLoc, mMsg.Pos])), sheetCmd(new SheetT_Msg(7, [compId_1])), symbolCmd(new SymbolT_Msg(16, [errorComponents_1, singleton_1(compId_1), false])), wireCmd(new BusWireT_Msg(8, [compId_1]))]))]))))) : ((matchValue_1.tag === 6) ? ((initPos = matchValue_1.fields[0], (sPos = ((left_1 = initPos, (right_1 = mMsg.ScreenPage, new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y)))), [model, sheetCmd(new SheetT_Msg(8, [sPos]))]))) : ((matchValue_1.tag === 11) ? [model, Cmd_none()] : ((matchValue_1.tag === 13) ? [model, Cmd_none()] : ((matchValue_1.tag === 10) ? [model, Cmd_none()] : ((segIdL = matchValue_1.fields[0], snapWire(model, mMsg, segIdL)))))))))))))))))));
}

/**
 * Mouse Up Update, can have: finished drag-to-select, pressed on a component, finished symbol movement, connected a wire between ports
 */
export function mUpUpdate(model, mMsg) {
    let s, left, right, left_1, right_1;
    let newModel_1;
    const matchValue = model.TmpModel;
    if (matchValue != null) {
        const newModel = matchValue;
        newModel_1 = (new SheetT_Model(newModel.Wire, newModel.PopupViewFunc, newModel.PopupDialogData, newModel.BoundingBoxes, newModel.LastValidBoundingBoxes, newModel.SelectedLabel, model.SelectedComponents, newModel.SelectedWires, newModel.NearbyComponents, newModel.ErrorComponents, newModel.DragToSelectBox, newModel.ConnectPortsLine, newModel.TargetPortId, newModel.Action, newModel.ShowGrid, newModel.CursorType, newModel.LastValidPos, newModel.LastValidSymbol, newModel.SnapSymbols, newModel.SnapSegments, newModel.CurrentKeyPresses, newModel.Zoom, newModel.CanvasSize, newModel.TmpModel, newModel.ScalingTmpModel, newModel.UndoList, newModel.RedoList, newModel.AutomaticScrolling, newModel.ScreenScrollPos, newModel.LastMousePos, newModel.ScalingBoxCentrePos, newModel.InitMouseToScalingBoxCentre, newModel.ScrollingLastMousePos, newModel.LastMousePosForSnap, newModel.MouseCounter, newModel.CtrlKeyDown, newModel.PrevWireSelection, newModel.ScalingBox, newModel.Compiling, newModel.CompilationStatus, newModel.CompilationProcess, newModel.DebugState, newModel.DebugData, newModel.DebugMappings, newModel.DebugIsConnected, newModel.DebugDevice));
    }
    else {
        newModel_1 = model;
    }
    const matchValue_1 = model.Action;
    switch (matchValue_1.tag) {
        case 7: {
            const segIdL = matchValue_1.fields[0];
            const connIdL = map((tuple) => tuple[1], segIdL);
            const coalesceCmds = map((conn) => wireCmd(new BusWireT_Msg(10, [conn])), connIdL);
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, appendUndoList(model.UndoList, newModel_1), model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(append_1(ofArray([wireCmd(new BusWireT_Msg(9, [segIdL, mMsg])), wireCmd(new BusWireT_Msg(14, [true, connIdL]))]), coalesceCmds))];
        }
        case 0: {
            const newComponents = findIntersectingComponents(model, model.DragToSelectBox);
            const newWires = map((tuple_1) => tuple_1[0], getIntersectingWires(model.Wire, model.DragToSelectBox));
            const resetDragToSelectBox = new BoundingBox(model.DragToSelectBox.TopLeft, 0, 0);
            const patternInput = mMsg.ShiftKeyDown ? [model.SelectedComponents, model.SelectedWires] : (model.CtrlKeyDown ? [symDiff(newComponents, model.SelectedComponents), symDiff(newWires, model.SelectedWires)] : [newComponents, newWires]);
            const selectWires = patternInput[1];
            const selectComps = patternInput[0];
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, selectComps, selectWires, model.NearbyComponents, model.ErrorComponents, resetDragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, false, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(11, [selectComps])), sheetCmd(new SheetT_Msg(14, [])), wireCmd(new BusWireT_Msg(6, [selectWires]))]))];
        }
        case 1: {
            const compId = matchValue_1.fields[0];
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), wireCmd(new BusWireT_Msg(6, [empty_1()]))];
        }
        case 2: {
            const compId_1 = matchValue_1.fields[0];
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, compId_1, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), sheetCmd(new SheetT_Msg(14, []))];
        }
        case 4:
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, appendUndoList(model.UndoList, newModel_1), model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), sheetCmd(new SheetT_Msg(14, []))];
        case 12: {
            const outputModel = isEmpty(model.ErrorComponents) ? model : newModel_1;
            return [new SheetT_Model(outputModel.Wire, outputModel.PopupViewFunc, outputModel.PopupDialogData, outputModel.BoundingBoxes, outputModel.LastValidBoundingBoxes, outputModel.SelectedLabel, outputModel.SelectedComponents, outputModel.SelectedWires, outputModel.NearbyComponents, outputModel.ErrorComponents, outputModel.DragToSelectBox, outputModel.ConnectPortsLine, outputModel.TargetPortId, new SheetT_CurrentAction(11, []), outputModel.ShowGrid, outputModel.CursorType, outputModel.LastValidPos, outputModel.LastValidSymbol, outputModel.SnapSymbols, outputModel.SnapSegments, outputModel.CurrentKeyPresses, outputModel.Zoom, outputModel.CanvasSize, outputModel.TmpModel, outputModel.ScalingTmpModel, appendUndoList(model.UndoList, newModel_1), outputModel.RedoList, outputModel.AutomaticScrolling, outputModel.ScreenScrollPos, outputModel.LastMousePos, outputModel.ScalingBoxCentrePos, outputModel.InitMouseToScalingBoxCentre, outputModel.ScrollingLastMousePos, outputModel.LastMousePosForSnap, outputModel.MouseCounter, outputModel.CtrlKeyDown, outputModel.PrevWireSelection, outputModel.ScalingBox, outputModel.Compiling, outputModel.CompilationStatus, outputModel.CompilationProcess, outputModel.DebugState, outputModel.DebugData, outputModel.DebugMappings, outputModel.DebugIsConnected, outputModel.DebugDevice), sheetCmd(new SheetT_Msg(14, []))];
        }
        case 3:
            if (isEmpty(model.ErrorComponents)) {
                const movingWires = getConnectedWireIds(model.Wire, model.SelectedComponents);
                const matchValue_4 = length_1(model.SelectedComponents) | 0;
                if ((s = (matchValue_4 | 0), s < 2)) {
                    const s_1 = matchValue_4 | 0;
                    return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.LastValidBoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, emptySnap, emptySnap, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, appendUndoList(model.UndoList, newModel_1), model.RedoList, false, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), wireCmd(new BusWireT_Msg(14, [true, movingWires]))];
                }
                else {
                    return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.LastValidBoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, empty_1(), model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, emptySnap, emptySnap, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, appendUndoList(model.UndoList, newModel_1), model.RedoList, false, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(11, [model.SelectedComponents])), wireCmd(new BusWireT_Msg(14, [true, movingWires])), sheetCmd(new SheetT_Msg(14, []))]))];
                }
            }
            else {
                const movingWires_1 = getConnectedWireIds(model.Wire, model.SelectedComponents);
                return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.LastValidBoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, emptySnap, emptySnap, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, false, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(7, [model.SelectedComponents, (left = model.LastValidPos, (right = mMsg.Pos, new XYPos(left.X - right.X, left.Y - right.Y)))])), sheetCmd(new SheetT_Msg(6, [])), symbolCmd(new SymbolT_Msg(11, [model.SelectedComponents])), wireCmd(new BusWireT_Msg(7, [model.SelectedComponents, (left_1 = model.LastValidPos, (right_1 = mMsg.Pos, new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y)))])), wireCmd(new BusWireT_Msg(14, [true, movingWires_1]))]))];
            }
        case 8: {
            const inputPortId = matchValue_1.fields[0];
            const patternInput_1 = (model.TargetPortId !== "") ? [wireCmd(new BusWireT_Msg(1, [[inputPortId, model.TargetPortId]])), appendUndoList(model.UndoList, newModel_1), newModel_1.RedoList] : [Cmd_none(), newModel_1.UndoList, newModel_1.RedoList];
            const undoList = patternInput_1[1];
            const redoList = patternInput_1[2];
            const cmd = patternInput_1[0];
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, "", new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, undoList, redoList, false, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), cmd];
        }
        case 9: {
            const outputPortId = matchValue_1.fields[0];
            const patternInput_2 = (model.TargetPortId !== "") ? [wireCmd(new BusWireT_Msg(1, [[model.TargetPortId, outputPortId]])), appendUndoList(model.UndoList, newModel_1), newModel_1.RedoList] : [Cmd_none(), newModel_1.UndoList, newModel_1.RedoList];
            const undoList_1 = patternInput_2[1];
            const redoList_1 = patternInput_2[2];
            const cmd_1 = patternInput_2[0];
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, "", new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, undoList_1, redoList_1, false, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), cmd_1];
        }
        case 14: {
            const portId = matchValue_1.fields[0];
            let symbol_1;
            let symbol;
            const model_2 = model.Wire.Symbol;
            const port = FSharpMap__get_Item(model_2.Ports, portId);
            symbol = FSharpMap__get_Item(model_2.Symbols, port.HostId);
            symbol_1 = symbol.Id;
            return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(35, [portId, mMsg.Pos])), wireCmd(new BusWireT_Msg(8, [symbol_1])), wireCmd(new BusWireT_Msg(20, [portId]))]))];
        }
        case 15: {
            const fixedCornerLoc = matchValue_1.fields[1];
            const compId_2 = matchValue_1.fields[0];
            if (isEmpty(model.ErrorComponents)) {
                return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, void 0, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, appendUndoList(model.UndoList, newModel_1), model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(39, [compId_2, void 0, fixedCornerLoc, mMsg.Pos])), sheetCmd(new SheetT_Msg(6, [])), wireCmd(new BusWireT_Msg(8, [compId_2]))]))];
            }
            else {
                return [new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.LastValidBoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(11, []), model.ShowGrid, model.CursorType, model.LastValidPos, void 0, emptySnap, emptySnap, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, false, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(39, [compId_2, model.LastValidSymbol, fixedCornerLoc, mMsg.Pos])), sheetCmd(new SheetT_Msg(6, [])), symbolCmd(new SymbolT_Msg(11, [model.SelectedComponents])), wireCmd(new BusWireT_Msg(8, [compId_2]))]))];
            }
        }
        default:
            return [model, Cmd_batch(singleton_1(sheetCmd(new SheetT_Msg(14, []))))];
    }
}

/**
 * Mouse Move Update, looks for nearby components and looks if mouse is on a port
 */
export function mMoveUpdate(model, mMsg) {
    let inputRecord, idx;
    const matchValue = model.Action;
    switch (matchValue.tag) {
        case 5:
            return moveSymbols(model, mMsg);
        case 13: {
            const ldcs = matchValue.fields[0];
            const lbl = matchValue.fields[2];
            const compType = matchValue.fields[1];
            const labelTest = (compType.tag === 48) ? generateIOLabel(model.Wire.Symbol, compType, lbl) : ((compType.tag === 0) ? generateIOLabel(model.Wire.Symbol, compType, lbl) : ((compType.tag === 1) ? generateIOLabel(model.Wire.Symbol, compType, lbl) : ((compType.tag === 2) ? generateIOLabel(model.Wire.Symbol, compType, lbl) : ((compType.tag === 3) ? generateIOLabel(model.Wire.Symbol, compType, lbl) : ((lbl === "") ? generateLabel(model.Wire.Symbol, compType) : lbl)))));
            const patternInput = addSymbol(ldcs, model.Wire.Symbol, mMsg.Pos, compType, labelTest);
            const newSymbolModel = patternInput[0];
            const newCompId = patternInput[1];
            return [new SheetT_Model((inputRecord = model.Wire, new BusWireT_Model(newSymbolModel, inputRecord.Wires, inputRecord.CopiedWires, inputRecord.SelectedSegment, inputRecord.LastMousePos, inputRecord.ErrorWires, inputRecord.Notifications, inputRecord.Type, inputRecord.ArrowDisplay, inputRecord.SnapToNet)), model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, singleton_1(newCompId), empty_1(), model.NearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, new SheetT_CurrentAction(5, []), model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), Cmd_batch(ofArray([sheetCmd(new SheetT_Msg(6, [])), symbolCmd(new SymbolT_Msg(11, [empty_1()])), symbolCmd(new SymbolT_Msg(14, [singleton_1(newCompId)]))]))];
        }
        default: {
            const nearbyComponents = findNearbyComponents(model, mMsg.Pos, 50);
            const ctrlPressed = exists((tupledArg) => {
                const k = tupledArg[0];
                return k === "CONTROL";
            }, getActivePressedKeys(model));
            let newCursor;
            if (model.CursorType.tag === 3) {
                newCursor = (new SheetT_CursorType(3, []));
            }
            else {
                const matchValue_4 = mouseOn(new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, nearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, model.Action, model.ShowGrid, model.CursorType, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, model.LastMousePos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, model.ScrollingLastMousePos, model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice), mMsg.Pos);
                let matchResult, p, compId, idx_1;
                switch (matchValue_4.tag) {
                    case 1: {
                        matchResult = 0;
                        p = matchValue_4.fields[1];
                        break;
                    }
                    case 2: {
                        matchResult = 0;
                        p = matchValue_4.fields[1];
                        break;
                    }
                    case 0: {
                        matchResult = 1;
                        break;
                    }
                    case 4: {
                        matchResult = 2;
                        break;
                    }
                    case 3: {
                        matchResult = 3;
                        compId = matchValue_4.fields[0];
                        break;
                    }
                    case 5: {
                        if ((idx = (matchValue_4.fields[2] | 0), ctrlPressed)) {
                            matchResult = 4;
                            idx_1 = matchValue_4.fields[2];
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
                    case 0: {
                        newCursor = (new SheetT_CursorType(1, []));
                        break;
                    }
                    case 1: {
                        newCursor = (new SheetT_CursorType(5, []));
                        break;
                    }
                    case 2: {
                        newCursor = (new SheetT_CursorType(4, []));
                        break;
                    }
                    case 3: {
                        const matchValue_5 = FSharpMap__get_Item(model.Wire.Symbol.Symbols, compId).Annotation;
                        let matchResult_1;
                        if (matchValue_5 != null) {
                            if (matchValue_5.tag === 0) {
                                matchResult_1 = 0;
                            }
                            else {
                                matchResult_1 = 1;
                            }
                        }
                        else {
                            matchResult_1 = 1;
                        }
                        switch (matchResult_1) {
                            case 0: {
                                newCursor = (new SheetT_CursorType(8, []));
                                break;
                            }
                            default:
                                newCursor = (new SheetT_CursorType(6, []));
                        }
                        break;
                    }
                    case 4: {
                        newCursor = (((idx_1 % 2) === 0) ? (new SheetT_CursorType(9, [])) : (new SheetT_CursorType(8, [])));
                        break;
                    }
                    default:
                        newCursor = (new SheetT_CursorType(0, []));
                }
            }
            const newModel = new SheetT_Model(model.Wire, model.PopupViewFunc, model.PopupDialogData, model.BoundingBoxes, model.LastValidBoundingBoxes, model.SelectedLabel, model.SelectedComponents, model.SelectedWires, nearbyComponents, model.ErrorComponents, model.DragToSelectBox, model.ConnectPortsLine, model.TargetPortId, model.Action, model.ShowGrid, newCursor, model.LastValidPos, model.LastValidSymbol, model.SnapSymbols, model.SnapSegments, model.CurrentKeyPresses, model.Zoom, model.CanvasSize, model.TmpModel, model.ScalingTmpModel, model.UndoList, model.RedoList, model.AutomaticScrolling, model.ScreenScrollPos, mMsg.Pos, model.ScalingBoxCentrePos, model.InitMouseToScalingBoxCentre, new SheetT_XYPosMov(mMsg.Pos, mMsg.ScreenMovement), model.LastMousePosForSnap, model.MouseCounter, model.CtrlKeyDown, model.PrevWireSelection, model.ScalingBox, model.Compiling, model.CompilationStatus, model.CompilationProcess, model.DebugState, model.DebugData, model.DebugMappings, model.DebugIsConnected, model.DebugDevice);
            if (ctrlPressed) {
                return [newModel, Cmd_batch(ofArray([symbolCmd(new SymbolT_Msg(10, [nearbyComponents])), symbolCmd(new SymbolT_Msg(36, [nearbyComponents]))]))];
            }
            else {
                return [newModel, symbolCmd(new SymbolT_Msg(9, [nearbyComponents]))];
            }
        }
    }
}

export function getVisibleScreenCentre(model) {
    const canvas = document.getElementById("Canvas");
    return new XYPos((canvas.scrollLeft + (canvas.clientWidth / 2)) / model.Zoom, (canvas.scrollTop + (canvas.clientHeight / 2)) / model.Zoom);
}

export function validateTwoSelectedSymbols(model) {
    const matchValue = model.SelectedComponents;
    let matchResult, s1, s2, syms, syms_1;
    if (!isEmpty(matchValue)) {
        if (!isEmpty(tail(matchValue))) {
            if (isEmpty(tail(tail(matchValue)))) {
                matchResult = 0;
                s1 = head(matchValue);
                s2 = head(tail(matchValue));
                syms = matchValue;
            }
            else {
                matchResult = 1;
                syms_1 = matchValue;
            }
        }
        else {
            matchResult = 1;
            syms_1 = matchValue;
        }
    }
    else {
        matchResult = 1;
        syms_1 = matchValue;
    }
    switch (matchResult) {
        case 0: {
            const symbols = model.Wire.Symbol.Symbols;
            const getSym = (sId) => tryFind(sId, symbols);
            const matchValue_1 = getSym(s1);
            const matchValue_2 = getSym(s2);
            let matchResult_1, s1_1, s2_1;
            if (matchValue_1 != null) {
                if (matchValue_2 != null) {
                    matchResult_1 = 0;
                    s1_1 = matchValue_1;
                    s2_1 = matchValue_2;
                }
                else {
                    matchResult_1 = 1;
                }
            }
            else {
                matchResult_1 = 1;
            }
            switch (matchResult_1) {
                case 0: {
                    toConsole(`Testing with
s1= ${s1_1.Component.Type}
 s2=${s2_1.Component.Type}`);
                    return [s1_1, s2_1];
                }
                default: {
                    toConsole(printf("Error: can\'t validate the two symbols selected to reorder ports"));
                    return void 0;
                }
            }
        }
        default: {
            toConsole(`Can't test because number of selected symbols (${length_1(syms_1)}) is not 2`);
            return void 0;
        }
    }
}

/**
 * Geometric helper used for testing. Probably needs a better name, and to be collected with other
 * This should perhaps be generalised for all orientations and made a helper function.
 * However different testing may be needed, so who knows?
 * Return the vertical channel between two bounding boxes, if they do not intersect and
 * their vertical coordinates overlap.
 */
export function getChannel(bb1_mut, bb2_mut) {
    getChannel:
    while (true) {
        const bb1 = bb1_mut, bb2 = bb2_mut;
        if (bb1.TopLeft.X > bb2.TopLeft.X) {
            bb1_mut = bb2;
            bb2_mut = bb1;
            continue getChannel;
        }
        else if (overlap2DBox(bb1, bb2)) {
            return void 0;
        }
        else if (((bb1.TopLeft.Y > (bb2.TopLeft.Y + bb2.H)) ? true : ((bb1.TopLeft.Y + bb1.H) < bb2.TopLeft.Y)) && (bb2.TopLeft.X > (bb1.TopLeft.X + bb1.W))) {
            return void 0;
        }
        else if (bb2.TopLeft.X > (bb1.TopLeft.X + bb1.W)) {
            const x2 = bb2.TopLeft.X;
            const x1 = bb1.TopLeft.X + bb1.W;
            const union = boxUnion(bb1, bb2);
            const topLeft = new XYPos(x1, union.TopLeft.Y);
            return [new BoundingBox(topLeft, x2 - x1, union.H), "vertical"];
        }
        else {
            const union_1 = boxUnion(bb1, bb2);
            if ((bb1.TopLeft.Y + bb1.H) < bb2.TopLeft.Y) {
                const y2 = bb2.TopLeft.Y;
                const y1 = bb1.TopLeft.Y + bb1.H;
                const topLeft_1 = new XYPos(bb1.TopLeft.X, bb1.TopLeft.Y + bb1.H);
                return [new BoundingBox(topLeft_1, union_1.W, y2 - y1), "horizontal"];
            }
            else {
                const y2_1 = bb2.TopLeft.Y + bb2.H;
                const y1_1 = bb1.TopLeft.Y;
                const topLeft_2 = new XYPos(union_1.TopLeft.X, bb2.TopLeft.Y + bb2.H);
                return [new BoundingBox(topLeft_2, union_1.W, y1_1 - y2_1), "horizontal"];
            }
        }
        break;
    }
}

//# sourceMappingURL=SheetUpdateHelpers.fs.js.map
