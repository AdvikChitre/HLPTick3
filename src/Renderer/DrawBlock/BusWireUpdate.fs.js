import { init as init_1 } from "./SymbolView.fs.js";
import { toList as toList_1, FSharpMap__get_Keys, ofList, tryFind, map as map_1, filter, fold, FSharpMap__Add, FSharpMap__get_Item, exists, add, empty } from "../fable_modules/fable-library.4.1.4/Map.js";
import { comparePrimitives, safeHash, curry2, equals, compare } from "../fable_modules/fable-library.4.1.4/Util.js";
import { collect, sortBy, append, tryHead, tryLast, fold as fold_1, isEmpty, filter as filter_1, contains, map, initialize, mapIndexed, singleton, length as length_1, tryItem, empty as empty_1 } from "../fable_modules/fable-library.4.1.4/List.js";
import { BoundingBox, HighLightColor, XYPos } from "../Common/CommonTypes.fs.js";
import { makeInitialSegmentsList, issieVerticesToSegments, Constants_vertexLoadMatchTolerance, extractConnections, Constants_initialArrowDisplay, Constants_initialWireType } from "./BusWire.fs.js";
import { SymbolT_PortId, SheetT_wire_, SheetT_Msg, SheetT_Model, SymbolT_Model, SymbolT_Symbol, BusWireT_Msg, BusWireT_wireOf_, BusWireT_Wire, BusWireT_Model } from "../Model/DrawModelType.fs.js";
import { Cmd_map, Cmd_batch, Cmd_none } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { toFail, printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { makeEndsDraggable, updateWireSegmentJumps, resetWireSegmentJumps, coalesceInWire, deleteWiresWithPort, moveSegment, getAbsoluteSegmentPos } from "./BusWireUpdateHelpers.fs.js";
import { uuid } from "../Interface/JSHelpers.fs.js";
import { updateWire, updateWires, smartAutoroute } from "./BusWireRoute.fs.js";
import { routeAndSeparateSymbolWires, updateWireSegmentJumpsAndSeparations } from "./BusWireSeparate.fs.js";
import { Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { getEquivalentCopiedPorts, update as update_1, extractComponents } from "./SymbolUpdate.fs.js";
import { inferConnectionsWidth } from "../Common/WidthInferer.fs.js";
import { sheet_, Msg, Model } from "../Model/ModelType.fs.js";
import { Cmd_OfFunc_result } from "../fable_modules/Fable.Elmish.3.1.0/./cmd.fs.js";
import { map as map_2, value as value_1 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { getPortLocations, getPortLocation } from "./Symbol.fs.js";
import { ofList as ofList_1, toList, map as map_3 } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { getCopiedSymbols, segmentIntersectsBoundingBox } from "./BlockHelpers.fs.js";

/**
 * Initialises an empty BusWire Model
 */
export function init() {
    const symbols = init_1()[0];
    return [new BusWireT_Model(symbols, empty({
        Compare: compare,
    }), empty({
        Compare: compare,
    }), empty_1(), new XYPos(0, 0), empty_1(), void 0, Constants_initialWireType, Constants_initialArrowDisplay, true), Cmd_none()];
}

export function dragSegment(wire, index, mMsg, model) {
    let seg;
    const matchValue = tryItem(index, wire.Segments);
    if (matchValue != null) {
        if ((seg = matchValue, (index < 1) ? true : (index > (length_1(wire.Segments) - 2)))) {
            const seg_1 = matchValue;
            toConsole(printf("Bad index - can\'t move that segment"));
            return model;
        }
        else {
            const seg_2 = matchValue;
            const patternInput = getAbsoluteSegmentPos(wire, index);
            const startPos = patternInput[0];
            const endPos = patternInput[1];
            if (seg_2.Draggable) {
                let distanceToMove;
                let matchValue_1;
                const segStart = startPos;
                const segEnd = endPos;
                matchValue_1 = ((Math.abs(segStart.X - segEnd.X) < 1E-07) ? "vertical" : ((Math.abs(segStart.Y - segEnd.Y) < 1E-07) ? "horizontal" : toFail(printf("ERROR: Diagonal wire"))));
                distanceToMove = ((matchValue_1 === "vertical") ? (mMsg.Pos.X - startPos.X) : (mMsg.Pos.Y - startPos.Y));
                const newWire_1 = moveSegment(model, seg_2, distanceToMove);
                const newWires = add(seg_2.WireId, newWire_1, model.Wires);
                return new BusWireT_Model(model.Symbol, newWires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
            }
            else {
                toConsole(printf("Can\'t move undraggable"));
                return model;
            }
        }
    }
    else {
        toConsole(printf("Bad segment in Dragsegment... ignoring drag"));
        return model;
    }
}

export function makeNewWire(inputId, outputId, model) {
    const wireId = uuid();
    return smartAutoroute(model, new BusWireT_Wire(wireId, inputId, outputId, new HighLightColor(8, []), 1, empty_1(), new XYPos(0, 0), "horizontal"));
}

export function newWire(inputId, outputId, model) {
    const nWire = makeNewWire(inputId, outputId, model);
    if (exists((wid, wire) => (equals(wire.InputPort, nWire.InputPort) && equals(wire.OutputPort, nWire.OutputPort)), model.Wires)) {
        return [model, void 0];
    }
    else {
        toConsole(printf("Separating new wire"));
        const newModel = updateWireSegmentJumpsAndSeparations(singleton(nWire.WId), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), BusWireT_wireOf_(nWire.WId))(nWire)(model));
        return [newModel, new BusWireT_Msg(2, [])];
    }
}

export function calculateBusWidths(model) {
    const processConWidths = (connWidths) => {
        let inputRecord;
        const addWireWidthFolder = (wireMap, _arg, wire) => {
            let width;
            const matchValue = FSharpMap__get_Item(connWidths, wire.WId);
            if (matchValue == null) {
                width = wire.Width;
            }
            else {
                const a = matchValue | 0;
                width = a;
            }
            const newColor = (equals(wire.Color, new HighLightColor(7, [])) ? true : equals(wire.Color, new HighLightColor(10, []))) ? (new HighLightColor(7, [])) : (new HighLightColor(8, []));
            return FSharpMap__Add(wireMap, wire.WId, new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, newColor, width, wire.Segments, wire.StartPos, wire.InitialOrientation));
        };
        const addSymbolWidthFolder = (m, _arg_1, wire_1) => {
            let ip, matchValue_3, x, matchValue_4, x_1, len, n_1;
            const inPort = FSharpMap__get_Item(model.Symbol.Ports, (ip = wire_1.InputPort, ip));
            const symId = inPort.HostId;
            const symbol = FSharpMap__get_Item(m, symId);
            const matchValue_2 = symbol.Component.Type;
            switch (matchValue_2.tag) {
                case 28: {
                    const n = matchValue_2.fields[0] | 0;
                    return add(symId, (matchValue_3 = inPort.PortNumber, (matchValue_3 != null) ? ((matchValue_3 === 0) ? (new SymbolT_Symbol(symbol.Pos, symbol.CentrePos, symbol.OffsetFromBBCentre, wire_1.Width, symbol.InWidth1, symbol.InWidths, symbol.LabelBoundingBox, symbol.LabelHasDefaultPos, symbol.LabelRotation, symbol.Appearance, symbol.Id, symbol.Component, symbol.Annotation, symbol.Moving, symbol.IsClocked, symbol.STransform, symbol.ReversedInputPorts, symbol.PortMaps, symbol.HScale, symbol.VScale, symbol.MovingPort, symbol.MovingPortTarget)) : ((x = matchValue_3, toFail(`What? wire found with input port ${x} other than 0 connecting to SplitWire`)))) : ((x = matchValue_3, toFail(`What? wire found with input port ${x} other than 0 connecting to SplitWire`)))), m);
                }
                case 30:
                    return add(symId, (matchValue_4 = inPort.PortNumber, (matchValue_4 != null) ? ((matchValue_4 === 0) ? (new SymbolT_Symbol(symbol.Pos, symbol.CentrePos, symbol.OffsetFromBBCentre, wire_1.Width, symbol.InWidth1, symbol.InWidths, symbol.LabelBoundingBox, symbol.LabelHasDefaultPos, symbol.LabelRotation, symbol.Appearance, symbol.Id, symbol.Component, symbol.Annotation, symbol.Moving, symbol.IsClocked, symbol.STransform, symbol.ReversedInputPorts, symbol.PortMaps, symbol.HScale, symbol.VScale, symbol.MovingPort, symbol.MovingPortTarget)) : ((x_1 = matchValue_4, toFail(`What? wire found with input port ${x_1} other than 0 connecting to SplitN`)))) : ((x_1 = matchValue_4, toFail(`What? wire found with input port ${x_1} other than 0 connecting to SplitN`)))), m);
                case 27: {
                    const matchValue_5 = inPort.PortNumber;
                    let matchResult, x_2;
                    if (matchValue_5 != null) {
                        switch (matchValue_5) {
                            case 0: {
                                matchResult = 0;
                                break;
                            }
                            case 1: {
                                matchResult = 1;
                                break;
                            }
                            default: {
                                matchResult = 2;
                                x_2 = matchValue_5;
                            }
                        }
                    }
                    else {
                        matchResult = 2;
                        x_2 = matchValue_5;
                    }
                    switch (matchResult) {
                        case 0:
                            return add(symId, new SymbolT_Symbol(symbol.Pos, symbol.CentrePos, symbol.OffsetFromBBCentre, wire_1.Width, symbol.InWidth1, symbol.InWidths, symbol.LabelBoundingBox, symbol.LabelHasDefaultPos, symbol.LabelRotation, symbol.Appearance, symbol.Id, symbol.Component, symbol.Annotation, symbol.Moving, symbol.IsClocked, symbol.STransform, symbol.ReversedInputPorts, symbol.PortMaps, symbol.HScale, symbol.VScale, symbol.MovingPort, symbol.MovingPortTarget), m);
                        case 1:
                            return add(symId, new SymbolT_Symbol(symbol.Pos, symbol.CentrePos, symbol.OffsetFromBBCentre, symbol.InWidth0, wire_1.Width, symbol.InWidths, symbol.LabelBoundingBox, symbol.LabelHasDefaultPos, symbol.LabelRotation, symbol.Appearance, symbol.Id, symbol.Component, symbol.Annotation, symbol.Moving, symbol.IsClocked, symbol.STransform, symbol.ReversedInputPorts, symbol.PortMaps, symbol.HScale, symbol.VScale, symbol.MovingPort, symbol.MovingPortTarget), m);
                        default:
                            return toFail(`What? wire found with input port ${x_2} other than 0 or 1 connecting to MergeWires`);
                    }
                }
                case 29: {
                    const nInps = matchValue_2.fields[0] | 0;
                    const matchValue_6 = inPort.PortNumber;
                    let matchResult_1, n_2, x_4;
                    if (matchValue_6 != null) {
                        if ((n_1 = (matchValue_6 | 0), (n_1 < nInps) && (n_1 >= 0))) {
                            matchResult_1 = 0;
                            n_2 = matchValue_6;
                        }
                        else {
                            matchResult_1 = 1;
                            x_4 = matchValue_6;
                        }
                    }
                    else {
                        matchResult_1 = 1;
                        x_4 = matchValue_6;
                    }
                    switch (matchResult_1) {
                        case 0: {
                            let newInWidths;
                            const matchValue_7 = symbol.InWidths;
                            if (matchValue_7 != null) {
                                const list = matchValue_7;
                                const matchValue_8 = length_1(list) | 0;
                                if ((len = (matchValue_8 | 0), len === nInps)) {
                                    const len_1 = matchValue_8 | 0;
                                    newInWidths = mapIndexed((i_1, x_3) => ((i_1 === n_2) ? wire_1.Width : x_3), list);
                                }
                                else {
                                    newInWidths = initialize(nInps, (i_2) => ((i_2 === n_2) ? wire_1.Width : void 0));
                                }
                            }
                            else {
                                newInWidths = initialize(nInps, (i) => ((i === n_2) ? wire_1.Width : void 0));
                            }
                            return add(symId, new SymbolT_Symbol(symbol.Pos, symbol.CentrePos, symbol.OffsetFromBBCentre, symbol.InWidth0, symbol.InWidth1, newInWidths, symbol.LabelBoundingBox, symbol.LabelHasDefaultPos, symbol.LabelRotation, symbol.Appearance, symbol.Id, symbol.Component, symbol.Annotation, symbol.Moving, symbol.IsClocked, symbol.STransform, symbol.ReversedInputPorts, symbol.PortMaps, symbol.HScale, symbol.VScale, symbol.MovingPort, symbol.MovingPortTarget), m);
                        }
                        default:
                            return toFail(`What? wire found with input port ${x_4} other than [0..${nInps - 1}] connecting to MergeN`);
                    }
                }
                default:
                    return m;
            }
        };
        const newWires = fold(addWireWidthFolder, empty({
            Compare: compare,
        }), model.Wires);
        const symbolsWithWidths = fold(addSymbolWidthFolder, model.Symbol.Symbols, newWires);
        return new BusWireT_Model((inputRecord = model.Symbol, new SymbolT_Model(symbolsWithWidths, inputRecord.CopiedSymbols, inputRecord.Ports, inputRecord.InputPortsConnected, inputRecord.OutputPortsConnected, inputRecord.Theme, inputRecord.HintPane)), newWires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, empty_1(), void 0, model.Type, model.ArrowDisplay, model.SnapToNet);
    };
    const canvasState = [extractComponents(model.Symbol), extractConnections(model)];
    const matchValue_9 = inferConnectionsWidth(canvasState[0], canvasState[1]);
    if (matchValue_9.tag === 1) {
        const e = matchValue_9.fields[0];
        return [new BusWireT_Model(model.Symbol, model.Wires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, e.Msg, model.Type, model.ArrowDisplay, model.SnapToNet), new BusWireT_Msg(12, [e.ConnectionsAffected])];
    }
    else {
        const connWidths_1 = matchValue_9.fields[0];
        return [processConWidths(connWidths_1), void 0];
    }
}

/**
 * Handles messages
 */
export function update(msg, issieModel) {
    let inputRecord_2, inputRecord_3, inputRecord_4, inputRecord_5, inputRecord_6, inputRecord_7, inputRecord_8, optic, value, inputRecord_9, inputRecord_10, inputRecord_11, inputRecord_12, inputRecord_13, inputRecord_14, inputRecord_15, inputRecord_16, inputRecord_17, inputRecord_18, tupledArg_1, m1, m2, inputPorts, outputPorts, inputRecord_19, inputRecord_20, inputRecord_1;
    const model = issieModel.Sheet.Wire;
    const toIssieModel = (wireModel) => {
        let inputRecord;
        return new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord = issieModel.Sheet, new SheetT_Model(wireModel, inputRecord.PopupViewFunc, inputRecord.PopupDialogData, inputRecord.BoundingBoxes, inputRecord.LastValidBoundingBoxes, inputRecord.SelectedLabel, inputRecord.SelectedComponents, inputRecord.SelectedWires, inputRecord.NearbyComponents, inputRecord.ErrorComponents, inputRecord.DragToSelectBox, inputRecord.ConnectPortsLine, inputRecord.TargetPortId, inputRecord.Action, inputRecord.ShowGrid, inputRecord.CursorType, inputRecord.LastValidPos, inputRecord.LastValidSymbol, inputRecord.SnapSymbols, inputRecord.SnapSegments, inputRecord.CurrentKeyPresses, inputRecord.Zoom, inputRecord.CanvasSize, inputRecord.TmpModel, inputRecord.ScalingTmpModel, inputRecord.UndoList, inputRecord.RedoList, inputRecord.AutomaticScrolling, inputRecord.ScreenScrollPos, inputRecord.LastMousePos, inputRecord.ScalingBoxCentrePos, inputRecord.InitMouseToScalingBoxCentre, inputRecord.ScrollingLastMousePos, inputRecord.LastMousePosForSnap, inputRecord.MouseCounter, inputRecord.CtrlKeyDown, inputRecord.PrevWireSelection, inputRecord.ScalingBox, inputRecord.Compiling, inputRecord.CompilationStatus, inputRecord.CompilationProcess, inputRecord.DebugState, inputRecord.DebugData, inputRecord.DebugMappings, inputRecord.DebugIsConnected, inputRecord.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState);
    };
    const withNoMsg = (model_1) => [model_1, Cmd_none()];
    const withIssieMsg = (msg_1, model_2) => [model_2, Cmd_OfFunc_result(msg_1)];
    const withSheetMsg = (msg_3, model_3) => [model_3, Cmd_OfFunc_result(new Msg(1, [msg_3]))];
    const withMsg = (msg_5, model_4) => [model_4, Cmd_OfFunc_result(new Msg(1, [new SheetT_Msg(0, [msg_5])]))];
    const withSymbolMsg = (msg_7, model_5) => [model_5, Cmd_OfFunc_result(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(0, [msg_7])])]))];
    const withOptMsg = (msgOpt) => {
        if (msgOpt != null) {
            return curry2(withMsg)(value_1(msgOpt));
        }
        else {
            return withNoMsg;
        }
    };
    const withMsgs = (msgs, model_6) => {
        const wireMsg = (msg_9) => Cmd_OfFunc_result(new Msg(1, [new SheetT_Msg(0, [msg_9])]));
        return [model_6, Cmd_batch(map(wireMsg, msgs))];
    };
    switch (msg.tag) {
        case 7: {
            const diff = msg.fields[1];
            const componentIdList = msg.fields[0];
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_2 = issieModel.Sheet, new SheetT_Model(updateWires(model, componentIdList, diff), inputRecord_2.PopupViewFunc, inputRecord_2.PopupDialogData, inputRecord_2.BoundingBoxes, inputRecord_2.LastValidBoundingBoxes, inputRecord_2.SelectedLabel, inputRecord_2.SelectedComponents, inputRecord_2.SelectedWires, inputRecord_2.NearbyComponents, inputRecord_2.ErrorComponents, inputRecord_2.DragToSelectBox, inputRecord_2.ConnectPortsLine, inputRecord_2.TargetPortId, inputRecord_2.Action, inputRecord_2.ShowGrid, inputRecord_2.CursorType, inputRecord_2.LastValidPos, inputRecord_2.LastValidSymbol, inputRecord_2.SnapSymbols, inputRecord_2.SnapSegments, inputRecord_2.CurrentKeyPresses, inputRecord_2.Zoom, inputRecord_2.CanvasSize, inputRecord_2.TmpModel, inputRecord_2.ScalingTmpModel, inputRecord_2.UndoList, inputRecord_2.RedoList, inputRecord_2.AutomaticScrolling, inputRecord_2.ScreenScrollPos, inputRecord_2.LastMousePos, inputRecord_2.ScalingBoxCentrePos, inputRecord_2.InitMouseToScalingBoxCentre, inputRecord_2.ScrollingLastMousePos, inputRecord_2.LastMousePosForSnap, inputRecord_2.MouseCounter, inputRecord_2.CtrlKeyDown, inputRecord_2.PrevWireSelection, inputRecord_2.ScalingBox, inputRecord_2.Compiling, inputRecord_2.CompilationStatus, inputRecord_2.CompilationProcess, inputRecord_2.DebugState, inputRecord_2.DebugData, inputRecord_2.DebugMappings, inputRecord_2.DebugIsConnected, inputRecord_2.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 8: {
            const compId = msg.fields[0];
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_3 = issieModel.Sheet, new SheetT_Model(routeAndSeparateSymbolWires(model, compId), inputRecord_3.PopupViewFunc, inputRecord_3.PopupDialogData, inputRecord_3.BoundingBoxes, inputRecord_3.LastValidBoundingBoxes, inputRecord_3.SelectedLabel, inputRecord_3.SelectedComponents, inputRecord_3.SelectedWires, inputRecord_3.NearbyComponents, inputRecord_3.ErrorComponents, inputRecord_3.DragToSelectBox, inputRecord_3.ConnectPortsLine, inputRecord_3.TargetPortId, inputRecord_3.Action, inputRecord_3.ShowGrid, inputRecord_3.CursorType, inputRecord_3.LastValidPos, inputRecord_3.LastValidSymbol, inputRecord_3.SnapSymbols, inputRecord_3.SnapSegments, inputRecord_3.CurrentKeyPresses, inputRecord_3.Zoom, inputRecord_3.CanvasSize, inputRecord_3.TmpModel, inputRecord_3.ScalingTmpModel, inputRecord_3.UndoList, inputRecord_3.RedoList, inputRecord_3.AutomaticScrolling, inputRecord_3.ScreenScrollPos, inputRecord_3.LastMousePos, inputRecord_3.ScalingBoxCentrePos, inputRecord_3.InitMouseToScalingBoxCentre, inputRecord_3.ScrollingLastMousePos, inputRecord_3.LastMousePosForSnap, inputRecord_3.MouseCounter, inputRecord_3.CtrlKeyDown, inputRecord_3.PrevWireSelection, inputRecord_3.ScalingBox, inputRecord_3.Compiling, inputRecord_3.CompilationStatus, inputRecord_3.CompilationProcess, inputRecord_3.DebugState, inputRecord_3.DebugData, inputRecord_3.DebugMappings, inputRecord_3.DebugIsConnected, inputRecord_3.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 1: {
            const outputId = msg.fields[0][1];
            const inputId = msg.fields[0][0];
            const patternInput_1 = newWire(inputId, outputId, model);
            const newModel = patternInput_1[0];
            const msgOpt_1 = patternInput_1[1];
            return ((msgOpt_1 != null) ? curry2(withMsg)(value_1(msgOpt_1)) : withNoMsg)(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_4 = issieModel.Sheet, new SheetT_Model(newModel, inputRecord_4.PopupViewFunc, inputRecord_4.PopupDialogData, inputRecord_4.BoundingBoxes, inputRecord_4.LastValidBoundingBoxes, inputRecord_4.SelectedLabel, inputRecord_4.SelectedComponents, inputRecord_4.SelectedWires, inputRecord_4.NearbyComponents, inputRecord_4.ErrorComponents, inputRecord_4.DragToSelectBox, inputRecord_4.ConnectPortsLine, inputRecord_4.TargetPortId, inputRecord_4.Action, inputRecord_4.ShowGrid, inputRecord_4.CursorType, inputRecord_4.LastValidPos, inputRecord_4.LastValidSymbol, inputRecord_4.SnapSymbols, inputRecord_4.SnapSegments, inputRecord_4.CurrentKeyPresses, inputRecord_4.Zoom, inputRecord_4.CanvasSize, inputRecord_4.TmpModel, inputRecord_4.ScalingTmpModel, inputRecord_4.UndoList, inputRecord_4.RedoList, inputRecord_4.AutomaticScrolling, inputRecord_4.ScreenScrollPos, inputRecord_4.LastMousePos, inputRecord_4.ScalingBoxCentrePos, inputRecord_4.InitMouseToScalingBoxCentre, inputRecord_4.ScrollingLastMousePos, inputRecord_4.LastMousePosForSnap, inputRecord_4.MouseCounter, inputRecord_4.CtrlKeyDown, inputRecord_4.PrevWireSelection, inputRecord_4.ScalingBox, inputRecord_4.Compiling, inputRecord_4.CompilationStatus, inputRecord_4.CompilationProcess, inputRecord_4.DebugState, inputRecord_4.DebugData, inputRecord_4.DebugMappings, inputRecord_4.DebugIsConnected, inputRecord_4.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 2: {
            const patternInput_2 = calculateBusWidths(model);
            const newModel_1 = patternInput_2[0];
            const msgOpt_2 = patternInput_2[1];
            return withOptMsg(msgOpt_2)(toIssieModel(newModel_1));
        }
        case 3: {
            const connIds = msg.fields[0];
            const copiedWires = filter((connId, _arg) => contains(connId, connIds, {
                Equals: equals,
                GetHashCode: safeHash,
            }), model.Wires);
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_5 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model.Symbol, model.Wires, copiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet), inputRecord_5.PopupViewFunc, inputRecord_5.PopupDialogData, inputRecord_5.BoundingBoxes, inputRecord_5.LastValidBoundingBoxes, inputRecord_5.SelectedLabel, inputRecord_5.SelectedComponents, inputRecord_5.SelectedWires, inputRecord_5.NearbyComponents, inputRecord_5.ErrorComponents, inputRecord_5.DragToSelectBox, inputRecord_5.ConnectPortsLine, inputRecord_5.TargetPortId, inputRecord_5.Action, inputRecord_5.ShowGrid, inputRecord_5.CursorType, inputRecord_5.LastValidPos, inputRecord_5.LastValidSymbol, inputRecord_5.SnapSymbols, inputRecord_5.SnapSegments, inputRecord_5.CurrentKeyPresses, inputRecord_5.Zoom, inputRecord_5.CanvasSize, inputRecord_5.TmpModel, inputRecord_5.ScalingTmpModel, inputRecord_5.UndoList, inputRecord_5.RedoList, inputRecord_5.AutomaticScrolling, inputRecord_5.ScreenScrollPos, inputRecord_5.LastMousePos, inputRecord_5.ScalingBoxCentrePos, inputRecord_5.InitMouseToScalingBoxCentre, inputRecord_5.ScrollingLastMousePos, inputRecord_5.LastMousePosForSnap, inputRecord_5.MouseCounter, inputRecord_5.CtrlKeyDown, inputRecord_5.PrevWireSelection, inputRecord_5.ScalingBox, inputRecord_5.Compiling, inputRecord_5.CompilationStatus, inputRecord_5.CompilationProcess, inputRecord_5.DebugState, inputRecord_5.DebugData, inputRecord_5.DebugMappings, inputRecord_5.DebugIsConnected, inputRecord_5.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 12: {
            const connectionIds = msg.fields[0];
            const newWires = map_1((id, wire) => {
                if (contains(id, connectionIds, {
                    Equals: equals,
                    GetHashCode: safeHash,
                })) {
                    return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, new HighLightColor(0, []), wire.Width, wire.Segments, wire.StartPos, wire.InitialOrientation);
                }
                else if (contains(id, model.ErrorWires, {
                    Equals: equals,
                    GetHashCode: safeHash,
                })) {
                    return new BusWireT_Wire(wire.WId, wire.InputPort, wire.OutputPort, new HighLightColor(8, []), wire.Width, wire.Segments, wire.StartPos, wire.InitialOrientation);
                }
                else {
                    return wire;
                }
            }, model.Wires);
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_6 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model.Symbol, newWires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, connectionIds, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet), inputRecord_6.PopupViewFunc, inputRecord_6.PopupDialogData, inputRecord_6.BoundingBoxes, inputRecord_6.LastValidBoundingBoxes, inputRecord_6.SelectedLabel, inputRecord_6.SelectedComponents, inputRecord_6.SelectedWires, inputRecord_6.NearbyComponents, inputRecord_6.ErrorComponents, inputRecord_6.DragToSelectBox, inputRecord_6.ConnectPortsLine, inputRecord_6.TargetPortId, inputRecord_6.Action, inputRecord_6.ShowGrid, inputRecord_6.CursorType, inputRecord_6.LastValidPos, inputRecord_6.LastValidSymbol, inputRecord_6.SnapSymbols, inputRecord_6.SnapSegments, inputRecord_6.CurrentKeyPresses, inputRecord_6.Zoom, inputRecord_6.CanvasSize, inputRecord_6.TmpModel, inputRecord_6.ScalingTmpModel, inputRecord_6.UndoList, inputRecord_6.RedoList, inputRecord_6.AutomaticScrolling, inputRecord_6.ScreenScrollPos, inputRecord_6.LastMousePos, inputRecord_6.ScalingBoxCentrePos, inputRecord_6.InitMouseToScalingBoxCentre, inputRecord_6.ScrollingLastMousePos, inputRecord_6.LastMousePosForSnap, inputRecord_6.MouseCounter, inputRecord_6.CtrlKeyDown, inputRecord_6.PrevWireSelection, inputRecord_6.ScalingBox, inputRecord_6.Compiling, inputRecord_6.CompilationStatus, inputRecord_6.CompilationProcess, inputRecord_6.DebugState, inputRecord_6.DebugData, inputRecord_6.DebugMappings, inputRecord_6.DebugIsConnected, inputRecord_6.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 6: {
            const connectionIds_1 = msg.fields[0];
            const newWires_1 = map_1((id_1, wire_1) => {
                if (contains(id_1, model.ErrorWires, {
                    Equals: equals,
                    GetHashCode: safeHash,
                })) {
                    if (contains(id_1, connectionIds_1, {
                        Equals: equals,
                        GetHashCode: safeHash,
                    })) {
                        return new BusWireT_Wire(wire_1.WId, wire_1.InputPort, wire_1.OutputPort, new HighLightColor(10, []), wire_1.Width, wire_1.Segments, wire_1.StartPos, wire_1.InitialOrientation);
                    }
                    else {
                        return new BusWireT_Wire(wire_1.WId, wire_1.InputPort, wire_1.OutputPort, new HighLightColor(0, []), wire_1.Width, wire_1.Segments, wire_1.StartPos, wire_1.InitialOrientation);
                    }
                }
                else if (contains(id_1, connectionIds_1, {
                    Equals: equals,
                    GetHashCode: safeHash,
                })) {
                    return new BusWireT_Wire(wire_1.WId, wire_1.InputPort, wire_1.OutputPort, new HighLightColor(7, []), wire_1.Width, wire_1.Segments, wire_1.StartPos, wire_1.InitialOrientation);
                }
                else {
                    return new BusWireT_Wire(wire_1.WId, wire_1.InputPort, wire_1.OutputPort, new HighLightColor(8, []), wire_1.Width, wire_1.Segments, wire_1.StartPos, wire_1.InitialOrientation);
                }
            }, model.Wires);
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_7 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model.Symbol, newWires_1, model.CopiedWires, model.SelectedSegment, model.LastMousePos, empty_1(), model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet), inputRecord_7.PopupViewFunc, inputRecord_7.PopupDialogData, inputRecord_7.BoundingBoxes, inputRecord_7.LastValidBoundingBoxes, inputRecord_7.SelectedLabel, inputRecord_7.SelectedComponents, inputRecord_7.SelectedWires, inputRecord_7.NearbyComponents, inputRecord_7.ErrorComponents, inputRecord_7.DragToSelectBox, inputRecord_7.ConnectPortsLine, inputRecord_7.TargetPortId, inputRecord_7.Action, inputRecord_7.ShowGrid, inputRecord_7.CursorType, inputRecord_7.LastValidPos, inputRecord_7.LastValidSymbol, inputRecord_7.SnapSymbols, inputRecord_7.SnapSegments, inputRecord_7.CurrentKeyPresses, inputRecord_7.Zoom, inputRecord_7.CanvasSize, inputRecord_7.TmpModel, inputRecord_7.ScalingTmpModel, inputRecord_7.UndoList, inputRecord_7.RedoList, inputRecord_7.AutomaticScrolling, inputRecord_7.ScreenScrollPos, inputRecord_7.LastMousePos, inputRecord_7.ScalingBoxCentrePos, inputRecord_7.InitMouseToScalingBoxCentre, inputRecord_7.ScrollingLastMousePos, inputRecord_7.LastMousePosForSnap, inputRecord_7.MouseCounter, inputRecord_7.CtrlKeyDown, inputRecord_7.PrevWireSelection, inputRecord_7.ScalingBox, inputRecord_7.Compiling, inputRecord_7.CompilationStatus, inputRecord_7.CompilationProcess, inputRecord_7.DebugState, inputRecord_7.DebugData, inputRecord_7.DebugMappings, inputRecord_7.DebugIsConnected, inputRecord_7.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 4: {
            const connectionIds_2 = msg.fields[0];
            const newWires_2 = filter((id_2, wire_2) => !contains(id_2, connectionIds_2, {
                Equals: equals,
                GetHashCode: safeHash,
            }), model.Wires);
            const model_7 = new BusWireT_Model(model.Symbol, newWires_2, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet);
            return withMsg(new BusWireT_Msg(2, []), new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_8 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model_7.Symbol, newWires_2, model_7.CopiedWires, model_7.SelectedSegment, model_7.LastMousePos, connectionIds_2, model_7.Notifications, model_7.Type, model_7.ArrowDisplay, model_7.SnapToNet), inputRecord_8.PopupViewFunc, inputRecord_8.PopupDialogData, inputRecord_8.BoundingBoxes, inputRecord_8.LastValidBoundingBoxes, inputRecord_8.SelectedLabel, inputRecord_8.SelectedComponents, inputRecord_8.SelectedWires, inputRecord_8.NearbyComponents, inputRecord_8.ErrorComponents, inputRecord_8.DragToSelectBox, inputRecord_8.ConnectPortsLine, inputRecord_8.TargetPortId, inputRecord_8.Action, inputRecord_8.ShowGrid, inputRecord_8.CursorType, inputRecord_8.LastValidPos, inputRecord_8.LastValidSymbol, inputRecord_8.SnapSymbols, inputRecord_8.SnapSegments, inputRecord_8.CurrentKeyPresses, inputRecord_8.Zoom, inputRecord_8.CanvasSize, inputRecord_8.TmpModel, inputRecord_8.ScalingTmpModel, inputRecord_8.UndoList, inputRecord_8.RedoList, inputRecord_8.AutomaticScrolling, inputRecord_8.ScreenScrollPos, inputRecord_8.LastMousePos, inputRecord_8.ScalingBoxCentrePos, inputRecord_8.InitMouseToScalingBoxCentre, inputRecord_8.ScrollingLastMousePos, inputRecord_8.LastMousePosForSnap, inputRecord_8.MouseCounter, inputRecord_8.CtrlKeyDown, inputRecord_8.PrevWireSelection, inputRecord_8.ScalingBox, inputRecord_8.Compiling, inputRecord_8.CompilationStatus, inputRecord_8.CompilationProcess, inputRecord_8.DebugState, inputRecord_8.DebugData, inputRecord_8.DebugMappings, inputRecord_8.DebugIsConnected, inputRecord_8.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 5: {
            const delPorts = msg.fields[0];
            return withNoMsg(((optic = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_wire_)(sheet_), (value = deleteWiresWithPort(delPorts, model), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), optic)(value))))(issieModel));
        }
        case 9: {
            const segIdL = msg.fields[0];
            const mMsg = msg.fields[1];
            const checkSegmentOK = (segId) => {
                const index = segId[0] | 0;
                const connId_1 = segId[1];
                const wire_3 = FSharpMap__get_Item(model.Wires, connId_1);
                if (0 <= index) {
                    return index < length_1(wire_3.Segments);
                }
                else {
                    return false;
                }
            };
            const _arg_1 = filter_1(checkSegmentOK, segIdL);
            if (isEmpty(_arg_1)) {
                return withNoMsg(issieModel);
            }
            else {
                const segIdL_1 = _arg_1;
                const matchValue = mMsg.Op;
                switch (matchValue.tag) {
                    case 1:
                        return withMsg(new BusWireT_Msg(13, [empty_1()]), new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_9 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model.Symbol, model.Wires, model.CopiedWires, segIdL_1, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet), inputRecord_9.PopupViewFunc, inputRecord_9.PopupDialogData, inputRecord_9.BoundingBoxes, inputRecord_9.LastValidBoundingBoxes, inputRecord_9.SelectedLabel, inputRecord_9.SelectedComponents, inputRecord_9.SelectedWires, inputRecord_9.NearbyComponents, inputRecord_9.ErrorComponents, inputRecord_9.DragToSelectBox, inputRecord_9.ConnectPortsLine, inputRecord_9.TargetPortId, inputRecord_9.Action, inputRecord_9.ShowGrid, inputRecord_9.CursorType, inputRecord_9.LastValidPos, inputRecord_9.LastValidSymbol, inputRecord_9.SnapSymbols, inputRecord_9.SnapSegments, inputRecord_9.CurrentKeyPresses, inputRecord_9.Zoom, inputRecord_9.CanvasSize, inputRecord_9.TmpModel, inputRecord_9.ScalingTmpModel, inputRecord_9.UndoList, inputRecord_9.RedoList, inputRecord_9.AutomaticScrolling, inputRecord_9.ScreenScrollPos, inputRecord_9.LastMousePos, inputRecord_9.ScalingBoxCentrePos, inputRecord_9.InitMouseToScalingBoxCentre, inputRecord_9.ScrollingLastMousePos, inputRecord_9.LastMousePosForSnap, inputRecord_9.MouseCounter, inputRecord_9.CtrlKeyDown, inputRecord_9.PrevWireSelection, inputRecord_9.ScalingBox, inputRecord_9.Compiling, inputRecord_9.CompilationStatus, inputRecord_9.CompilationProcess, inputRecord_9.DebugState, inputRecord_9.DebugData, inputRecord_9.DebugMappings, inputRecord_9.DebugIsConnected, inputRecord_9.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
                    case 3:
                        return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_10 = issieModel.Sheet, new SheetT_Model(fold_1((model_8, segId_1) => {
                            const index_1 = segId_1[0] | 0;
                            const connId_2 = segId_1[1];
                            const wire_4 = FSharpMap__get_Item(model_8.Wires, connId_2);
                            return dragSegment(wire_4, index_1, mMsg, model_8);
                        }, model, segIdL_1), inputRecord_10.PopupViewFunc, inputRecord_10.PopupDialogData, inputRecord_10.BoundingBoxes, inputRecord_10.LastValidBoundingBoxes, inputRecord_10.SelectedLabel, inputRecord_10.SelectedComponents, inputRecord_10.SelectedWires, inputRecord_10.NearbyComponents, inputRecord_10.ErrorComponents, inputRecord_10.DragToSelectBox, inputRecord_10.ConnectPortsLine, inputRecord_10.TargetPortId, inputRecord_10.Action, inputRecord_10.ShowGrid, inputRecord_10.CursorType, inputRecord_10.LastValidPos, inputRecord_10.LastValidSymbol, inputRecord_10.SnapSymbols, inputRecord_10.SnapSegments, inputRecord_10.CurrentKeyPresses, inputRecord_10.Zoom, inputRecord_10.CanvasSize, inputRecord_10.TmpModel, inputRecord_10.ScalingTmpModel, inputRecord_10.UndoList, inputRecord_10.RedoList, inputRecord_10.AutomaticScrolling, inputRecord_10.ScreenScrollPos, inputRecord_10.LastMousePos, inputRecord_10.ScalingBoxCentrePos, inputRecord_10.InitMouseToScalingBoxCentre, inputRecord_10.ScrollingLastMousePos, inputRecord_10.LastMousePosForSnap, inputRecord_10.MouseCounter, inputRecord_10.CtrlKeyDown, inputRecord_10.PrevWireSelection, inputRecord_10.ScalingBox, inputRecord_10.Compiling, inputRecord_10.CompilationStatus, inputRecord_10.CompilationProcess, inputRecord_10.DebugState, inputRecord_10.DebugData, inputRecord_10.DebugMappings, inputRecord_10.DebugIsConnected, inputRecord_10.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
                    default:
                        return withNoMsg(issieModel);
                }
            }
        }
        case 10: {
            const wId = msg.fields[0];
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_11 = issieModel.Sheet, new SheetT_Model(coalesceInWire(wId, model), inputRecord_11.PopupViewFunc, inputRecord_11.PopupDialogData, inputRecord_11.BoundingBoxes, inputRecord_11.LastValidBoundingBoxes, inputRecord_11.SelectedLabel, inputRecord_11.SelectedComponents, inputRecord_11.SelectedWires, inputRecord_11.NearbyComponents, inputRecord_11.ErrorComponents, inputRecord_11.DragToSelectBox, inputRecord_11.ConnectPortsLine, inputRecord_11.TargetPortId, inputRecord_11.Action, inputRecord_11.ShowGrid, inputRecord_11.CursorType, inputRecord_11.LastValidPos, inputRecord_11.LastValidSymbol, inputRecord_11.SnapSymbols, inputRecord_11.SnapSegments, inputRecord_11.CurrentKeyPresses, inputRecord_11.Zoom, inputRecord_11.CanvasSize, inputRecord_11.TmpModel, inputRecord_11.ScalingTmpModel, inputRecord_11.UndoList, inputRecord_11.RedoList, inputRecord_11.AutomaticScrolling, inputRecord_11.ScreenScrollPos, inputRecord_11.LastMousePos, inputRecord_11.ScalingBoxCentrePos, inputRecord_11.InitMouseToScalingBoxCentre, inputRecord_11.ScrollingLastMousePos, inputRecord_11.LastMousePosForSnap, inputRecord_11.MouseCounter, inputRecord_11.CtrlKeyDown, inputRecord_11.PrevWireSelection, inputRecord_11.ScalingBox, inputRecord_11.Compiling, inputRecord_11.CompilationStatus, inputRecord_11.CompilationProcess, inputRecord_11.DebugState, inputRecord_11.DebugData, inputRecord_11.DebugMappings, inputRecord_11.DebugIsConnected, inputRecord_11.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 11: {
            const connIds_1 = msg.fields[0];
            const color = msg.fields[1];
            const newWires_3 = fold_1((prevWires, cId) => {
                const oldWireOpt = tryFind(cId, model.Wires);
                if (oldWireOpt != null) {
                    const oldWire = oldWireOpt;
                    return add(cId, new BusWireT_Wire(oldWire.WId, oldWire.InputPort, oldWire.OutputPort, color, oldWire.Width, oldWire.Segments, oldWire.StartPos, oldWire.InitialOrientation), prevWires);
                }
                else {
                    return prevWires;
                }
            }, model.Wires, connIds_1);
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_12 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model.Symbol, newWires_3, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet), inputRecord_12.PopupViewFunc, inputRecord_12.PopupDialogData, inputRecord_12.BoundingBoxes, inputRecord_12.LastValidBoundingBoxes, inputRecord_12.SelectedLabel, inputRecord_12.SelectedComponents, inputRecord_12.SelectedWires, inputRecord_12.NearbyComponents, inputRecord_12.ErrorComponents, inputRecord_12.DragToSelectBox, inputRecord_12.ConnectPortsLine, inputRecord_12.TargetPortId, inputRecord_12.Action, inputRecord_12.ShowGrid, inputRecord_12.CursorType, inputRecord_12.LastValidPos, inputRecord_12.LastValidSymbol, inputRecord_12.SnapSymbols, inputRecord_12.SnapSegments, inputRecord_12.CurrentKeyPresses, inputRecord_12.Zoom, inputRecord_12.CanvasSize, inputRecord_12.TmpModel, inputRecord_12.ScalingTmpModel, inputRecord_12.UndoList, inputRecord_12.RedoList, inputRecord_12.AutomaticScrolling, inputRecord_12.ScreenScrollPos, inputRecord_12.LastMousePos, inputRecord_12.ScalingBoxCentrePos, inputRecord_12.InitMouseToScalingBoxCentre, inputRecord_12.ScrollingLastMousePos, inputRecord_12.LastMousePosForSnap, inputRecord_12.MouseCounter, inputRecord_12.CtrlKeyDown, inputRecord_12.PrevWireSelection, inputRecord_12.ScalingBox, inputRecord_12.Compiling, inputRecord_12.CompilationStatus, inputRecord_12.CompilationProcess, inputRecord_12.DebugState, inputRecord_12.DebugData, inputRecord_12.DebugMappings, inputRecord_12.DebugIsConnected, inputRecord_12.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 13: {
            const connIds_2 = msg.fields[0];
            const newModel_2 = resetWireSegmentJumps(connIds_2, model);
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_13 = issieModel.Sheet, new SheetT_Model(newModel_2, inputRecord_13.PopupViewFunc, inputRecord_13.PopupDialogData, inputRecord_13.BoundingBoxes, inputRecord_13.LastValidBoundingBoxes, inputRecord_13.SelectedLabel, inputRecord_13.SelectedComponents, inputRecord_13.SelectedWires, inputRecord_13.NearbyComponents, inputRecord_13.ErrorComponents, inputRecord_13.DragToSelectBox, inputRecord_13.ConnectPortsLine, inputRecord_13.TargetPortId, inputRecord_13.Action, inputRecord_13.ShowGrid, inputRecord_13.CursorType, inputRecord_13.LastValidPos, inputRecord_13.LastValidSymbol, inputRecord_13.SnapSymbols, inputRecord_13.SnapSegments, inputRecord_13.CurrentKeyPresses, inputRecord_13.Zoom, inputRecord_13.CanvasSize, inputRecord_13.TmpModel, inputRecord_13.ScalingTmpModel, inputRecord_13.UndoList, inputRecord_13.RedoList, inputRecord_13.AutomaticScrolling, inputRecord_13.ScreenScrollPos, inputRecord_13.LastMousePos, inputRecord_13.ScalingBoxCentrePos, inputRecord_13.InitMouseToScalingBoxCentre, inputRecord_13.ScrollingLastMousePos, inputRecord_13.LastMousePosForSnap, inputRecord_13.MouseCounter, inputRecord_13.CtrlKeyDown, inputRecord_13.PrevWireSelection, inputRecord_13.ScalingBox, inputRecord_13.Compiling, inputRecord_13.CompilationStatus, inputRecord_13.CompilationProcess, inputRecord_13.DebugState, inputRecord_13.DebugData, inputRecord_13.DebugMappings, inputRecord_13.DebugIsConnected, inputRecord_13.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 14: {
            const separate = msg.fields[0];
            const connIds_3 = msg.fields[1];
            const newModel_3 = separate ? updateWireSegmentJumpsAndSeparations(connIds_3, model) : updateWireSegmentJumps(connIds_3, model);
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_14 = issieModel.Sheet, new SheetT_Model(newModel_3, inputRecord_14.PopupViewFunc, inputRecord_14.PopupDialogData, inputRecord_14.BoundingBoxes, inputRecord_14.LastValidBoundingBoxes, inputRecord_14.SelectedLabel, inputRecord_14.SelectedComponents, inputRecord_14.SelectedWires, inputRecord_14.NearbyComponents, inputRecord_14.ErrorComponents, inputRecord_14.DragToSelectBox, inputRecord_14.ConnectPortsLine, inputRecord_14.TargetPortId, inputRecord_14.Action, inputRecord_14.ShowGrid, inputRecord_14.CursorType, inputRecord_14.LastValidPos, inputRecord_14.LastValidSymbol, inputRecord_14.SnapSymbols, inputRecord_14.SnapSegments, inputRecord_14.CurrentKeyPresses, inputRecord_14.Zoom, inputRecord_14.CanvasSize, inputRecord_14.TmpModel, inputRecord_14.ScalingTmpModel, inputRecord_14.UndoList, inputRecord_14.RedoList, inputRecord_14.AutomaticScrolling, inputRecord_14.ScreenScrollPos, inputRecord_14.LastMousePos, inputRecord_14.ScalingBoxCentrePos, inputRecord_14.InitMouseToScalingBoxCentre, inputRecord_14.ScrollingLastMousePos, inputRecord_14.LastMousePosForSnap, inputRecord_14.MouseCounter, inputRecord_14.CtrlKeyDown, inputRecord_14.PrevWireSelection, inputRecord_14.ScalingBox, inputRecord_14.Compiling, inputRecord_14.CompilationStatus, inputRecord_14.CompilationProcess, inputRecord_14.DebugState, inputRecord_14.DebugData, inputRecord_14.DebugMappings, inputRecord_14.DebugIsConnected, inputRecord_14.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 17:
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_15 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model.Symbol, empty({
                Compare: compare,
            }), model.CopiedWires, model.SelectedSegment, model.LastMousePos, empty_1(), void 0, model.Type, model.ArrowDisplay, model.SnapToNet), inputRecord_15.PopupViewFunc, inputRecord_15.PopupDialogData, inputRecord_15.BoundingBoxes, inputRecord_15.LastValidBoundingBoxes, inputRecord_15.SelectedLabel, inputRecord_15.SelectedComponents, inputRecord_15.SelectedWires, inputRecord_15.NearbyComponents, inputRecord_15.ErrorComponents, inputRecord_15.DragToSelectBox, inputRecord_15.ConnectPortsLine, inputRecord_15.TargetPortId, inputRecord_15.Action, inputRecord_15.ShowGrid, inputRecord_15.CursorType, inputRecord_15.LastValidPos, inputRecord_15.LastValidSymbol, inputRecord_15.SnapSymbols, inputRecord_15.SnapSegments, inputRecord_15.CurrentKeyPresses, inputRecord_15.Zoom, inputRecord_15.CanvasSize, inputRecord_15.TmpModel, inputRecord_15.ScalingTmpModel, inputRecord_15.UndoList, inputRecord_15.RedoList, inputRecord_15.AutomaticScrolling, inputRecord_15.ScreenScrollPos, inputRecord_15.LastMousePos, inputRecord_15.ScalingBoxCentrePos, inputRecord_15.InitMouseToScalingBoxCentre, inputRecord_15.ScrollingLastMousePos, inputRecord_15.LastMousePosForSnap, inputRecord_15.MouseCounter, inputRecord_15.CtrlKeyDown, inputRecord_15.PrevWireSelection, inputRecord_15.ScalingBox, inputRecord_15.Compiling, inputRecord_15.CompilationStatus, inputRecord_15.CompilationProcess, inputRecord_15.DebugState, inputRecord_15.DebugData, inputRecord_15.DebugMappings, inputRecord_15.DebugIsConnected, inputRecord_15.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        case 18: {
            const conns = msg.fields[0];
            const posMatchesVertex = (pos, vertexOpt) => {
                if (vertexOpt != null) {
                    const vertex = vertexOpt;
                    const epsilon = Constants_vertexLoadMatchTolerance;
                    if (Math.abs(pos.X - vertex[0]) < epsilon) {
                        return Math.abs(pos.Y - vertex[1]) < epsilon;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            };
            const newWires_4 = ofList(map((conn) => {
                let wire_6, id_7, portId_5, id_1_3, id_8, edge_1, portIdStr, portId_8, id_1_4, id_9, model_16, portIdStr_1, port, sId;
                const inputId_1 = conn.Target.Id;
                const outputId_1 = conn.Source.Id;
                const connId_3 = conn.Id;
                const getVertex = (tupledArg) => {
                    const x_8 = tupledArg[0];
                    const y_8 = tupledArg[1];
                    return [x_8, y_8];
                };
                const segments = issieVerticesToSegments(connId_3, conn.Vertices);
                const makeWirePosMatchSymbol = (inOut, wire_5) => {
                    let id_3, portId_1, id_1_1, id_4, id_5, portId_3, id_1_2, id_6;
                    if (inOut ? posMatchesVertex((id_3 = ((portId_1 = (new SymbolT_PortId(0, [inputId_1])), (portId_1.tag === 1) ? ((id_1_1 = portId_1.fields[0], id_1_1)) : ((id_4 = portId_1.fields[0], id_4)))), getPortLocation(void 0, model.Symbol, id_3)), map_2(getVertex, tryLast(conn.Vertices))) : posMatchesVertex((id_5 = ((portId_3 = (new SymbolT_PortId(1, [outputId_1])), (portId_3.tag === 1) ? ((id_1_2 = portId_3.fields[0], id_1_2)) : ((id_6 = portId_3.fields[0], id_6)))), getPortLocation(void 0, model.Symbol, id_5)), map_2(getVertex, tryHead(conn.Vertices)))) {
                        return wire_5;
                    }
                    else {
                        return updateWire(model, wire_5, inOut);
                    }
                };
                return [connId_3, (wire_6 = makeWirePosMatchSymbol(true, makeWirePosMatchSymbol(false, new BusWireT_Wire(conn.Id, inputId_1, outputId_1, new HighLightColor(8, []), 1, segments, (id_7 = ((portId_5 = (new SymbolT_PortId(1, [outputId_1])), (portId_5.tag === 1) ? ((id_1_3 = portId_5.fields[0], id_1_3)) : ((id_8 = portId_5.fields[0], id_8)))), getPortLocation(void 0, model.Symbol, id_7)), (edge_1 = ((portIdStr = ((portId_8 = (new SymbolT_PortId(1, [outputId_1])), (portId_8.tag === 1) ? ((id_1_4 = portId_8.fields[0], id_1_4)) : ((id_9 = portId_8.fields[0], id_9)))), (model_16 = model.Symbol, (portIdStr_1 = portIdStr, (port = FSharpMap__get_Item(model_16.Ports, portIdStr_1), (sId = port.HostId, FSharpMap__get_Item(FSharpMap__get_Item(model_16.Symbols, sId).PortMaps.Orientation, portIdStr_1))))))), (edge_1.tag === 1) ? "vertical" : ((edge_1.tag === 2) ? "horizontal" : ((edge_1.tag === 3) ? "horizontal" : "vertical")))))), new BusWireT_Wire(wire_6.WId, wire_6.InputPort, wire_6.OutputPort, wire_6.Color, wire_6.Width, makeEndsDraggable(wire_6.Segments), wire_6.StartPos, wire_6.InitialOrientation))];
            }, conns), {
                Compare: compare,
            });
            const connIds_4 = map((conn_1) => conn_1.Id, conns);
            return withMsg(new BusWireT_Msg(14, [false, connIds_4]), new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_16 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model.Symbol, newWires_4, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet), inputRecord_16.PopupViewFunc, inputRecord_16.PopupDialogData, inputRecord_16.BoundingBoxes, inputRecord_16.LastValidBoundingBoxes, inputRecord_16.SelectedLabel, inputRecord_16.SelectedComponents, inputRecord_16.SelectedWires, inputRecord_16.NearbyComponents, inputRecord_16.ErrorComponents, inputRecord_16.DragToSelectBox, inputRecord_16.ConnectPortsLine, inputRecord_16.TargetPortId, inputRecord_16.Action, inputRecord_16.ShowGrid, inputRecord_16.CursorType, inputRecord_16.LastValidPos, inputRecord_16.LastValidSymbol, inputRecord_16.SnapSymbols, inputRecord_16.SnapSegments, inputRecord_16.CurrentKeyPresses, inputRecord_16.Zoom, inputRecord_16.CanvasSize, inputRecord_16.TmpModel, inputRecord_16.ScalingTmpModel, inputRecord_16.UndoList, inputRecord_16.RedoList, inputRecord_16.AutomaticScrolling, inputRecord_16.ScreenScrollPos, inputRecord_16.LastMousePos, inputRecord_16.ScalingBoxCentrePos, inputRecord_16.InitMouseToScalingBoxCentre, inputRecord_16.ScrollingLastMousePos, inputRecord_16.LastMousePosForSnap, inputRecord_16.MouseCounter, inputRecord_16.CtrlKeyDown, inputRecord_16.PrevWireSelection, inputRecord_16.ScalingBox, inputRecord_16.Compiling, inputRecord_16.CompilationStatus, inputRecord_16.CompilationProcess, inputRecord_16.DebugState, inputRecord_16.DebugData, inputRecord_16.DebugMappings, inputRecord_16.DebugIsConnected, inputRecord_16.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 15: {
            const style = msg.fields[0];
            toConsole(printf("Updating wire display type (=> reseparation of wires)"));
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_17 = issieModel.Sheet, new SheetT_Model(updateWireSegmentJumpsAndSeparations(empty_1(), new BusWireT_Model(model.Symbol, model.Wires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, style, model.ArrowDisplay, model.SnapToNet)), inputRecord_17.PopupViewFunc, inputRecord_17.PopupDialogData, inputRecord_17.BoundingBoxes, inputRecord_17.LastValidBoundingBoxes, inputRecord_17.SelectedLabel, inputRecord_17.SelectedComponents, inputRecord_17.SelectedWires, inputRecord_17.NearbyComponents, inputRecord_17.ErrorComponents, inputRecord_17.DragToSelectBox, inputRecord_17.ConnectPortsLine, inputRecord_17.TargetPortId, inputRecord_17.Action, inputRecord_17.ShowGrid, inputRecord_17.CursorType, inputRecord_17.LastValidPos, inputRecord_17.LastValidSymbol, inputRecord_17.SnapSymbols, inputRecord_17.SnapSegments, inputRecord_17.CurrentKeyPresses, inputRecord_17.Zoom, inputRecord_17.CanvasSize, inputRecord_17.TmpModel, inputRecord_17.ScalingTmpModel, inputRecord_17.UndoList, inputRecord_17.RedoList, inputRecord_17.AutomaticScrolling, inputRecord_17.ScreenScrollPos, inputRecord_17.LastMousePos, inputRecord_17.ScalingBoxCentrePos, inputRecord_17.InitMouseToScalingBoxCentre, inputRecord_17.ScrollingLastMousePos, inputRecord_17.LastMousePosForSnap, inputRecord_17.MouseCounter, inputRecord_17.CtrlKeyDown, inputRecord_17.PrevWireSelection, inputRecord_17.ScalingBox, inputRecord_17.Compiling, inputRecord_17.CompilationStatus, inputRecord_17.CompilationProcess, inputRecord_17.DebugState, inputRecord_17.DebugData, inputRecord_17.DebugMappings, inputRecord_17.DebugIsConnected, inputRecord_17.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 16:
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_18 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model.Symbol, model.Wires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, !model.ArrowDisplay, model.SnapToNet), inputRecord_18.PopupViewFunc, inputRecord_18.PopupDialogData, inputRecord_18.BoundingBoxes, inputRecord_18.LastValidBoundingBoxes, inputRecord_18.SelectedLabel, inputRecord_18.SelectedComponents, inputRecord_18.SelectedWires, inputRecord_18.NearbyComponents, inputRecord_18.ErrorComponents, inputRecord_18.DragToSelectBox, inputRecord_18.ConnectPortsLine, inputRecord_18.TargetPortId, inputRecord_18.Action, inputRecord_18.ShowGrid, inputRecord_18.CursorType, inputRecord_18.LastValidPos, inputRecord_18.LastValidSymbol, inputRecord_18.SnapSymbols, inputRecord_18.SnapSegments, inputRecord_18.CurrentKeyPresses, inputRecord_18.Zoom, inputRecord_18.CanvasSize, inputRecord_18.TmpModel, inputRecord_18.ScalingTmpModel, inputRecord_18.UndoList, inputRecord_18.RedoList, inputRecord_18.AutomaticScrolling, inputRecord_18.ScreenScrollPos, inputRecord_18.LastMousePos, inputRecord_18.ScalingBoxCentrePos, inputRecord_18.InitMouseToScalingBoxCentre, inputRecord_18.ScrollingLastMousePos, inputRecord_18.LastMousePosForSnap, inputRecord_18.MouseCounter, inputRecord_18.CtrlKeyDown, inputRecord_18.PrevWireSelection, inputRecord_18.ScalingBox, inputRecord_18.Compiling, inputRecord_18.CompilationStatus, inputRecord_18.CompilationProcess, inputRecord_18.DebugState, inputRecord_18.DebugData, inputRecord_18.DebugMappings, inputRecord_18.DebugIsConnected, inputRecord_18.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        case 19: {
            const componentIds = msg.fields[0];
            toConsole(printf("Updating connected wires"));
            const updatePortIdMessages = map_3((cmd_1) => Cmd_map((cmd) => (new Msg(1, [new SheetT_Msg(0, [cmd])])), cmd_1), (tupledArg_1 = getPortLocations(model.Symbol, componentIds), (m1 = tupledArg_1[0], (m2 = tupledArg_1[1], (inputPorts = toList(map_3((_arg_3) => {
                const portId_9 = _arg_3;
                return portId_9;
            }, FSharpMap__get_Keys(m1))), (outputPorts = toList(map_3((_arg_4) => {
                const portId_10 = _arg_4;
                return portId_10;
            }, FSharpMap__get_Keys(m2))), ofList_1(map((arg_4) => Cmd_OfFunc_result(new BusWireT_Msg(20, [arg_4])), append(inputPorts, outputPorts)))))))));
            return [issieModel, Cmd_batch(updatePortIdMessages)];
        }
        case 20: {
            const portId_11 = msg.fields[0];
            const portOpt = tryFind(portId_11, model.Symbol.Ports);
            const rerouteInputEnd = (wire_7) => equals(wire_7.InputPort, portId_11);
            const wiresToReroute = toList_1(filter((_id, wire_8) => {
                if (equals(wire_8.InputPort, portId_11)) {
                    return true;
                }
                else {
                    return equals(wire_8.OutputPort, portId_11);
                }
            }, model.Wires));
            const newWires_5 = fold_1((wires_1, tupledArg_2) => {
                const wid = tupledArg_2[0];
                const wire_9 = tupledArg_2[1];
                const wire$0027 = updateWire(model, wire_9, rerouteInputEnd(wire_9));
                return add(wid, wire$0027, wires_1);
            }, model.Wires, wiresToReroute);
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_19 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model.Symbol, newWires_5, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet), inputRecord_19.PopupViewFunc, inputRecord_19.PopupDialogData, inputRecord_19.BoundingBoxes, inputRecord_19.LastValidBoundingBoxes, inputRecord_19.SelectedLabel, inputRecord_19.SelectedComponents, inputRecord_19.SelectedWires, inputRecord_19.NearbyComponents, inputRecord_19.ErrorComponents, inputRecord_19.DragToSelectBox, inputRecord_19.ConnectPortsLine, inputRecord_19.TargetPortId, inputRecord_19.Action, inputRecord_19.ShowGrid, inputRecord_19.CursorType, inputRecord_19.LastValidPos, inputRecord_19.LastValidSymbol, inputRecord_19.SnapSymbols, inputRecord_19.SnapSegments, inputRecord_19.CurrentKeyPresses, inputRecord_19.Zoom, inputRecord_19.CanvasSize, inputRecord_19.TmpModel, inputRecord_19.ScalingTmpModel, inputRecord_19.UndoList, inputRecord_19.RedoList, inputRecord_19.AutomaticScrolling, inputRecord_19.ScreenScrollPos, inputRecord_19.LastMousePos, inputRecord_19.ScalingBoxCentrePos, inputRecord_19.InitMouseToScalingBoxCentre, inputRecord_19.ScrollingLastMousePos, inputRecord_19.LastMousePosForSnap, inputRecord_19.MouseCounter, inputRecord_19.CtrlKeyDown, inputRecord_19.PrevWireSelection, inputRecord_19.ScalingBox, inputRecord_19.Compiling, inputRecord_19.CompilationStatus, inputRecord_19.CompilationProcess, inputRecord_19.DebugState, inputRecord_19.DebugData, inputRecord_19.DebugMappings, inputRecord_19.DebugIsConnected, inputRecord_19.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        }
        case 21:
            return withNoMsg(new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_20 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(model.Symbol, model.Wires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, !model.SnapToNet), inputRecord_20.PopupViewFunc, inputRecord_20.PopupDialogData, inputRecord_20.BoundingBoxes, inputRecord_20.LastValidBoundingBoxes, inputRecord_20.SelectedLabel, inputRecord_20.SelectedComponents, inputRecord_20.SelectedWires, inputRecord_20.NearbyComponents, inputRecord_20.ErrorComponents, inputRecord_20.DragToSelectBox, inputRecord_20.ConnectPortsLine, inputRecord_20.TargetPortId, inputRecord_20.Action, inputRecord_20.ShowGrid, inputRecord_20.CursorType, inputRecord_20.LastValidPos, inputRecord_20.LastValidSymbol, inputRecord_20.SnapSymbols, inputRecord_20.SnapSegments, inputRecord_20.CurrentKeyPresses, inputRecord_20.Zoom, inputRecord_20.CanvasSize, inputRecord_20.TmpModel, inputRecord_20.ScalingTmpModel, inputRecord_20.UndoList, inputRecord_20.RedoList, inputRecord_20.AutomaticScrolling, inputRecord_20.ScreenScrollPos, inputRecord_20.LastMousePos, inputRecord_20.ScalingBoxCentrePos, inputRecord_20.InitMouseToScalingBoxCentre, inputRecord_20.ScrollingLastMousePos, inputRecord_20.LastMousePosForSnap, inputRecord_20.MouseCounter, inputRecord_20.CtrlKeyDown, inputRecord_20.PrevWireSelection, inputRecord_20.ScalingBox, inputRecord_20.Compiling, inputRecord_20.CompilationStatus, inputRecord_20.CompilationProcess, inputRecord_20.DebugState, inputRecord_20.DebugData, inputRecord_20.DebugMappings, inputRecord_20.DebugIsConnected, inputRecord_20.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState));
        default: {
            const sMsg = msg.fields[0];
            const patternInput = update_1(sMsg, model.Symbol);
            const sm = patternInput[0];
            const sCmd = patternInput[1];
            return [new Model(issieModel.UserData, issieModel.WaveSim, issieModel.WaveSimSheet, issieModel.UISheetTrail, issieModel.Spinner, (inputRecord_1 = issieModel.Sheet, new SheetT_Model(new BusWireT_Model(sm, model.Wires, model.CopiedWires, model.SelectedSegment, model.LastMousePos, model.ErrorWires, model.Notifications, model.Type, model.ArrowDisplay, model.SnapToNet), inputRecord_1.PopupViewFunc, inputRecord_1.PopupDialogData, inputRecord_1.BoundingBoxes, inputRecord_1.LastValidBoundingBoxes, inputRecord_1.SelectedLabel, inputRecord_1.SelectedComponents, inputRecord_1.SelectedWires, inputRecord_1.NearbyComponents, inputRecord_1.ErrorComponents, inputRecord_1.DragToSelectBox, inputRecord_1.ConnectPortsLine, inputRecord_1.TargetPortId, inputRecord_1.Action, inputRecord_1.ShowGrid, inputRecord_1.CursorType, inputRecord_1.LastValidPos, inputRecord_1.LastValidSymbol, inputRecord_1.SnapSymbols, inputRecord_1.SnapSegments, inputRecord_1.CurrentKeyPresses, inputRecord_1.Zoom, inputRecord_1.CanvasSize, inputRecord_1.TmpModel, inputRecord_1.ScalingTmpModel, inputRecord_1.UndoList, inputRecord_1.RedoList, inputRecord_1.AutomaticScrolling, inputRecord_1.ScreenScrollPos, inputRecord_1.LastMousePos, inputRecord_1.ScalingBoxCentrePos, inputRecord_1.InitMouseToScalingBoxCentre, inputRecord_1.ScrollingLastMousePos, inputRecord_1.LastMousePosForSnap, inputRecord_1.MouseCounter, inputRecord_1.CtrlKeyDown, inputRecord_1.PrevWireSelection, inputRecord_1.ScalingBox, inputRecord_1.Compiling, inputRecord_1.CompilationStatus, inputRecord_1.CompilationProcess, inputRecord_1.DebugState, inputRecord_1.DebugData, inputRecord_1.DebugMappings, inputRecord_1.DebugIsConnected, inputRecord_1.DebugDevice)), issieModel.IsLoading, issieModel.LastChangeCheckTime, issieModel.LastSimulatedCanvasState, issieModel.LastDetailedSavedState, issieModel.CurrentSelected, issieModel.LastSelectedIds, issieModel.LastUsedDialogWidth, issieModel.SelectedComponent, issieModel.CurrentStepSimulationStep, issieModel.CurrentTruthTable, issieModel.TTConfig, issieModel.RightPaneTabVisible, issieModel.SimSubTabVisible, issieModel.Hilighted, issieModel.Clipboard, issieModel.LastCreatedComponent, issieModel.SavedSheetIsOutOfDate, issieModel.CurrentProj, issieModel.PopupViewFunc, issieModel.SpinnerPayload, issieModel.PopupDialogData, issieModel.Notifications, issieModel.TopMenuOpenState, issieModel.DividerDragMode, issieModel.WaveSimViewerWidth, issieModel.ConnsOfSelectedWavesAreHighlighted, issieModel.Pending, issieModel.UIState, issieModel.BuildVisible, issieModel.DrawBlockTestState), Cmd_map((msg_11) => (new Msg(1, [new SheetT_Msg(0, [msg_11])])), sCmd)];
        }
    }
}

/**
 * Checks if a wire intersects a bounding box by checking if any of its segments intersect
 * returns some of distance to wire, if wire does intersect
 */
export function wireIntersectsBoundingBox(wire, box) {
    const segmentIntersectsBox = (segStart, segEnd, state, seg) => {
        if (state == null) {
            return segmentIntersectsBoundingBox(box, segStart, segEnd);
        }
        else {
            const x = state;
            return x;
        }
    };
    const wire_1 = wire;
    const initPos = wire_1.StartPos;
    const initOrientation = wire_1.InitialOrientation;
    const state_2 = fold_1((tupledArg, seg_1) => {
        const currState = tupledArg[0];
        const currPos = tupledArg[1];
        const currOrientation = tupledArg[2];
        let nextPos;
        const position = currPos;
        const length = seg_1.Length;
        nextPos = ((currOrientation === "vertical") ? (new XYPos(position.X, position.Y + length)) : (new XYPos(position.X + length, position.Y)));
        const nextOrientation = (currOrientation === "vertical") ? "horizontal" : "vertical";
        const nextState = segmentIntersectsBox(currPos, nextPos, currState, seg_1);
        return [nextState, nextPos, nextOrientation];
    }, [void 0, initPos, initOrientation], wire_1.Segments)[0];
    return state_2;
}

/**
 * Returns a list of wire IDs in the model that intersect the given selectBox
 * the wires are sorted by closeness to the centre of the box.
 */
export function getIntersectingWires(wModel, selectBox) {
    return sortBy((tuple) => tuple[1], collect((_arg) => {
        if (_arg[1] == null) {
            return empty_1();
        }
        else {
            const id = _arg[0];
            const dist = _arg[1];
            return singleton([id, dist]);
        }
    }, toList_1(filter((_id_1, optDist) => !equals(optDist, void 0), map_1((_id, wire) => wireIntersectsBoundingBox(wire, selectBox), wModel.Wires)))), {
        Compare: comparePrimitives,
    });
}

/**
 * Searches if the position of the cursor is on a wire in a model,
 * where n is 5 pixels adjusted for top level zoom.
 * If there are multiple hits retrn the closest.
 */
export function getClickedWire(wModel, pos, n) {
    const boundingBox = new BoundingBox(new XYPos(pos.X - n, pos.Y - n), n * 2, n * 2);
    const intersectingWires = getIntersectingWires(wModel, boundingBox);
    return map_2((tuple) => tuple[0], tryHead(intersectingWires));
}

/**
 * Updates the model to have new wires between pasted components
 */
export function pasteWires(wModel, newCompIds) {
    const oldCompIds = getCopiedSymbols(wModel.Symbol);
    let pastedWires;
    const createNewWire = (oldWire) => {
        let id, portId_1, id_1_1, id_1, id_2, portId_3, id_1_2, id_3;
        const newId = uuid();
        const oldPorts = [oldWire.InputPort, oldWire.OutputPort];
        const matchValue = getEquivalentCopiedPorts(wModel.Symbol, oldCompIds, newCompIds, oldPorts[0], oldPorts[1]);
        if (matchValue == null) {
            return empty_1();
        }
        else {
            const newOutputPort = matchValue[1];
            const newInputPort = matchValue[0];
            let patternInput;
            const model_1 = wModel.Symbol;
            patternInput = [(id = ((portId_1 = (new SymbolT_PortId(0, [newInputPort])), (portId_1.tag === 1) ? ((id_1_1 = portId_1.fields[0], id_1_1)) : ((id_1 = portId_1.fields[0], id_1)))), getPortLocation(void 0, model_1, id)), (id_2 = ((portId_3 = (new SymbolT_PortId(1, [newOutputPort])), (portId_3.tag === 1) ? ((id_1_2 = portId_3.fields[0], id_1_2)) : ((id_3 = portId_3.fields[0], id_3)))), getPortLocation(void 0, model_1, id_2))];
            const portTwoPos = patternInput[1];
            const portOnePos = patternInput[0];
            let outputPortOrientation;
            let portIdStr;
            const portId_6 = new SymbolT_PortId(1, [newOutputPort]);
            if (portId_6.tag === 1) {
                const id_1_3 = portId_6.fields[0];
                portIdStr = id_1_3;
            }
            else {
                const id_4 = portId_6.fields[0];
                portIdStr = id_4;
            }
            const model_6 = wModel.Symbol;
            const portIdStr_1 = portIdStr;
            const port = FSharpMap__get_Item(model_6.Ports, portIdStr_1);
            const sId = port.HostId;
            outputPortOrientation = FSharpMap__get_Item(FSharpMap__get_Item(model_6.Symbols, sId).PortMaps.Orientation, portIdStr_1);
            const segmentList = makeInitialSegmentsList(newId, portOnePos, portTwoPos, outputPortOrientation);
            return singleton(smartAutoroute(wModel, new BusWireT_Wire(newId, newInputPort, newOutputPort, oldWire.Color, oldWire.Width, segmentList, portOnePos, oldWire.InitialOrientation)));
        }
    };
    pastedWires = ofList(map((wire_1) => [wire_1.WId, wire_1], collect(createNewWire, map((tuple) => tuple[1], toList_1(wModel.CopiedWires)))), {
        Compare: compare,
    });
    const newWireMap = fold((acc, newKey, newVal) => add(newKey, newVal, acc), pastedWires, wModel.Wires);
    const pastedConnIds = map((tuple_1) => tuple_1[0], toList_1(pastedWires));
    return [new BusWireT_Model(wModel.Symbol, newWireMap, wModel.CopiedWires, wModel.SelectedSegment, wModel.LastMousePos, wModel.ErrorWires, wModel.Notifications, wModel.Type, wModel.ArrowDisplay, wModel.SnapToNet), pastedConnIds];
}

//# sourceMappingURL=BusWireUpdate.fs.js.map
