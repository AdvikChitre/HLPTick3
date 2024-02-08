import { toFail, toConsole, printf, split, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { FSharpMap__get_Keys, add, map as map_2, FSharpMap__get_Item, tryFind, FSharpMap__get_Count } from "../fable_modules/fable-library.4.1.4/Map.js";
import { find, tryFind as tryFind_1, ofArray, tail, head, filter, forAll, fold, empty, singleton, cons, map as map_1, isEmpty, length } from "../fable_modules/fable-library.4.1.4/List.js";
import { equalArrays, curry2, createAtom, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { MouseOp } from "../Common/DrawHelpers.fs.js";
import { debugTraceUI, debugLevel } from "../Interface/JSHelpers.fs.js";
import { contains } from "../fable_modules/fable-library.4.1.4/Set.js";
import { cropToLength, sprintInitial } from "../Common/Helpers.fs.js";
import { getTimeMs, instrumentInterval } from "../Common/TimeHelpers.fs.js";
import { mapOverProject, drawBlockModelToUserData, userDataToDrawBlockModel, getWSModel } from "./ModelHelpers.fs.js";
import { popupDialogData_, int_, text_, UserData_$reflection, Model, UserData, selectedComponent_, RightTab, rightPaneTabVisible_, sheet_, uISheetTrail_, Msg, WaveSimState } from "../Model/ModelType.fs.js";
import { updateAllMemoryComps } from "./MemoryEditorView.fs.js";
import { toString, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { SheetT_zoom_, BusWireT_segments_, SheetT_wireOf_, BusWireT_mode_, SymbolT_Model, BusWireT_symbol_, SheetT_wire_, SheetT_KeyboardMsg, SheetT_selectedWires_, BusWireT_Msg, SymbolT_Msg, SheetT_selectedComponents_, SheetT_Msg, BusWireT_ASegment_$reflection, BusWireT_Wire_$reflection, SymbolT_Symbol_$reflection } from "../Model/DrawModelType.fs.js";
import { Component, Memory1, ComponentType, Project, LoadedComponent, JSDiagramMsg, Rotation, XYPos_$reflection, CustomComponentType_$reflection } from "../Common/CommonTypes.fs.js";
import { union_type, bool_type, list_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { saveOpenProjectInNewFormat, saveOpenFileActionWithModelUpdate, openFileInProject, deleteFileConfirmationPopup, getSheetTrees, SheetTree_$reflection } from "./MenuHelpers.fs.js";
import { getDrawBlockPos } from "../DrawBlock/SheetDisplay.fs.js";
import { getHeaderHeight } from "./Style.fs.js";
import { DrawModelType_SheetT_Model__Model_GetCanvasState, Constants_zoomIncrement, Constants_maxMagnification, mouseOn } from "../DrawBlock/Sheet.fs.js";
import { StringModule_StartsWith } from "../Common/EEExtensions.fs.js";
import { value as value_18, map, flatten, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { getClickedSegment } from "../DrawBlock/BusWireUpdateHelpers.fs.js";
import { Cmd_batch, Cmd_none } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { Cmd_OfFunc_result } from "../fable_modules/Fable.Elmish.3.1.0/./cmd.fs.js";
import { doActionWithSaveFileDialog, addFileToProject, changeSubtreeLockState, LockState, changeLockState, renameFileInProject } from "./TopMenuView.fs.js";
import * as react from "react";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8, Optic_Map, Optic_Map_op_HatPercent_Z1462312A } from "../Common/Optics.fs.js";
import { Compose_Lens_op_GreaterMinusGreater_Z15C92E89 as Compose_Lens_op_GreaterMinusGreater_Z15C92E89_1, Optic_Map_op_HatPercent_Z1462312A as Optic_Map_op_HatPercent_Z1462312A_1, Optic_Set_op_HatEquals_Z147477F8 as Optic_Set_op_HatEquals_Z147477F8_1 } from "../DrawBlock/../Common/Optics.fs.js";
import { SymbolT_appearance_, SymbolT_opacity_, SymbolT_colour_, SymbolT_moving_ } from "../DrawBlock/../Model/DrawModelType.fs.js";
import { getSymbolColour } from "../DrawBlock/./Symbol.fs.js";
import { updateWireSegmentJumpsAndSeparations, separateAndOrderModelSegments } from "../DrawBlock/BusWireSeparate.fs.js";
import { min } from "../fable_modules/fable-library.4.1.4/Double.js";
import { toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { viewWaveInfoPopup } from "./UIPopups.fs.js";
import { writeFile, pathJoin, tryReadFileSync } from "../Interface/FilesIO.fs.js";
import { Result_MapError, FSharpResult$2, Result_Bind } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { SimpleJson_tryParse } from "../fable_modules/Fable.SimpleJson.3.24.0/./SimpleJson.fs.js";
import { createTypeInfo } from "../fable_modules/Fable.SimpleJson.3.24.0/./TypeInfo.Converter.fs.js";
import { Convert_serialize, Convert_fromJson } from "../fable_modules/Fable.SimpleJson.3.24.0/./Json.Converter.fs.js";
import { Color_IColor, Common_GenericOption, Modifier_IModifier, TextWeight_Option, Text_div } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import { columns } from "../fable_modules/Fulma.2.16.0/Layouts/Columns.fs.js";
import { column } from "../fable_modules/Fulma.2.16.0/Layouts/Column.fs.js";
import { Block_div, heading, Option, panel } from "../fable_modules/Fulma.2.16.0/Components/Panel.fs.js";
import { Option as Option_1, button } from "../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { choicePopup, openInBrowser } from "../DrawBlock/PopupHelpers.fs.js";
import { verilogOutput } from "./SimulationView.fs.js";
import { VMode } from "../Simulator/Verilog.fs.js";
import { now, minValue } from "../fable_modules/fable-library.4.1.4/Date.js";
import { compareCanvas } from "../Simulator/Extractor.fs.js";
import * as electron from "electron";
import { update as update_1 } from "../DrawBlock/SheetUpdate.fs.js";

export const Constants_memoryUpdateCheckTime = 300;

/**
 * Used to filter specific mouse messages based on mouse data.
 */
export function matchMouseMsg(msgSelect, msg) {
    if (msg.tag === 1) {
        const sMsg = msg.fields[0];
        if (sMsg.tag === 5) {
            const mMsg = sMsg.fields[0];
            return msgSelect(mMsg);
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

/**
 * short summary used where Sheet messages are too complex to print
 */
export function shortDSheetMsg(msg) {
    return "Sheet message";
}

/**
 * short summary of wavesim message which has a lot of data
 */
export function shortDWSM(ws) {
    return toText(`WS<${ws.FastSim.SimulatedTopSheet}->${ws.StartCycle}-${ws.CurrClkCycle}-${ws.ShownCycles} Waves:${FSharpMap__get_Count(ws.AllWaves)} (${length(ws.SelectedWaves)})>`);
}

/**
 * Function returning a short but usually informative display of message
 * used when message tracing (see Sheet menu to which on or off).
 * Parameters that might be very large (like fastsimulation, or Model, or Symbols) should not be
 * displayed using printf "%A".
 */
export function shortDisplayMsg(msg) {
    let x_1;
    let matchResult, sheetMsg_1, x, s, ws, ws_1, s_1, ws_2, ws_3, ws_4, ttMsg, comps, conns, x_2;
    switch (msg.tag) {
        case 2:
        case 0:
        case 4: {
            matchResult = 1;
            break;
        }
        case 6: {
            matchResult = 5;
            break;
        }
        case 11: {
            matchResult = 9;
            break;
        }
        case 14: {
            matchResult = 12;
            break;
        }
        case 16:
        case 17: {
            matchResult = 14;
            break;
        }
        case 18:
        case 19:
        case 20: {
            matchResult = 15;
            break;
        }
        case 21: {
            matchResult = 16;
            break;
        }
        case 22: {
            matchResult = 17;
            break;
        }
        case 23:
        case 24:
        case 25:
        case 26: {
            matchResult = 18;
            break;
        }
        case 28: {
            matchResult = 20;
            break;
        }
        case 29: {
            matchResult = 21;
            break;
        }
        case 32: {
            matchResult = 24;
            break;
        }
        case 33: {
            matchResult = 25;
            break;
        }
        case 34: {
            matchResult = 26;
            break;
        }
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 43:
        case 42:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56: {
            matchResult = 27;
            break;
        }
        case 57: {
            matchResult = 28;
            break;
        }
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 72:
        case 73:
        case 74:
        case 92: {
            matchResult = 29;
            break;
        }
        case 93:
        case 75: {
            matchResult = 30;
            break;
        }
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 71:
        case 84:
        case 85:
        case 7:
        case 86: {
            matchResult = 31;
            break;
        }
        case 87: {
            matchResult = 32;
            break;
        }
        case 88: {
            matchResult = 33;
            break;
        }
        case 89: {
            matchResult = 34;
            break;
        }
        case 90: {
            matchResult = 35;
            break;
        }
        case 91: {
            matchResult = 36;
            break;
        }
        case 94: {
            matchResult = 37;
            break;
        }
        case 1: {
            matchResult = 2;
            sheetMsg_1 = msg.fields[0];
            break;
        }
        case 5: {
            if (msg.fields[0].tag === 0) {
                matchResult = 3;
            }
            else {
                matchResult = 4;
            }
            break;
        }
        case 8: {
            matchResult = 6;
            x = msg.fields[0];
            break;
        }
        case 9: {
            matchResult = 7;
            s = msg.fields[0][0];
            ws = msg.fields[0][1];
            break;
        }
        case 10: {
            matchResult = 8;
            ws_1 = msg.fields[0];
            break;
        }
        case 12: {
            matchResult = 10;
            s_1 = msg.fields[1];
            ws_2 = msg.fields[0];
            break;
        }
        case 13: {
            matchResult = 11;
            ws_3 = msg.fields[0];
            break;
        }
        case 15: {
            matchResult = 13;
            ws_4 = msg.fields[0];
            break;
        }
        case 27: {
            matchResult = 19;
            ttMsg = msg.fields[0];
            break;
        }
        case 30: {
            matchResult = 22;
            comps = msg.fields[0];
            conns = msg.fields[1];
            break;
        }
        case 31: {
            matchResult = 23;
            x_2 = msg.fields[0];
            break;
        }
        default:
            matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return "SheetBackAction";
        case 1:
            return void 0;
        case 2:
            return shortDSheetMsg(sheetMsg_1);
        case 3:
            return "JSDiagramMsg.InitCanvas";
        case 4:
            return void 0;
        case 5:
            return void 0;
        case 6:
            return `StartSimulation(${(x.tag === 1) ? ((x_1 = x.fields[0], "Error")) : "OK"})`;
        case 7:
            return `AddWSModel:${s}->${shortDWSM(ws)}`;
        case 8:
            return `SetWSModel:${ws_1.FastSim.SimulatedTopSheet}->${shortDWSM(ws_1)}`;
        case 9:
            return "Updating WS model";
        case 10:
            return `SetWSModelAndSheet:${s_1}->${shortDWSM(ws_2)}`;
        case 11:
            return `GenerateWaveforms:${shortDWSM(ws_3)}`;
        case 12:
            return "Generate Current Waveforms";
        case 13:
            return "RefreshWaveSim";
        case 14:
            return "SetWaveComponentSelectionOpen";
        case 15:
            return void 0;
        case 16:
            return "TryStartSimulationAfterErrorFix";
        case 17:
            return "SetSimulationGraph";
        case 18:
            return void 0;
        case 19:
            switch (ttMsg.tag) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                    return void 0;
                case 18:
                    return "SetIOOrder";
                case 19:
                    return void 0;
                case 20:
                    return void 0;
                case 21:
                    return "SetTTGridCache";
                case 22:
                    return "TogglePopupAlgebraInput";
                case 23:
                case 24:
                case 25:
                case 26:
                case 27:
                case 28:
                case 29:
                case 30:
                    return void 0;
                default:
                    return "GenerateTruthTable";
            }
        case 20:
            return void 0;
        case 21:
            return void 0;
        case 22:
            return `SetHighlighted: ${length(comps)} comps, ${length(conns)} conns`;
        case 23:
            return `SetSelWavesHighlighted${x_2.length}`;
        case 24:
            return "SetClipboard";
        case 25:
            return "SetCreateComponent";
        case 26:
            return "SetProject";
        case 27:
            return void 0;
        case 28:
            return "SetSelectedComponentMemoryLocation";
        case 29:
            return void 0;
        case 30:
            return "Selection has changed";
        case 31:
            return void 0;
        case 32:
            return "ExecCmd";
        case 33:
            return "ExecFuncInMessage";
        case 34:
            return "ExecFuncAsync";
        case 35:
            return "ExecCmdAsynch";
        case 36:
            return "SendSeqMsgAsynch";
        default:
            return void 0;
    }
}

/**
 * If debugTrace is on print out human readable info on message.
 * Be careful not to do this on mouse moves (there are too many).
 * be careful not to try to ptint simulation result arrays (that would crash the renderer!).
 * optimise for very quick return in the case that debugLevel = 0 (production version)
 * optimise for quick return if nothing is printed.
 */
export function getMessageTraceString(msg) {
    const noDisplayMouseOp = (mMsg) => {
        if (equals(mMsg.Op, new MouseOp(3, []))) {
            return true;
        }
        else {
            return equals(mMsg.Op, new MouseOp(2, []));
        }
    };
    const noDisplayMessage = (_arg) => {
        let matchResult;
        if (_arg.tag === 1) {
            if (_arg.fields[0].tag === 0) {
                if (_arg.fields[0].fields[0].tag === 0) {
                    switch (_arg.fields[0].fields[0].fields[0].tag) {
                        case 0:
                        case 9: {
                            matchResult = 0;
                            break;
                        }
                        default:
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
        }
        else {
            matchResult = 1;
        }
        switch (matchResult) {
            case 0:
                return true;
            default:
                return false;
        }
    };
    if ((((debugLevel() === 0) ? true : !contains("update", debugTraceUI())) ? true : matchMouseMsg(noDisplayMouseOp, msg)) ? true : noDisplayMessage(msg)) {
        return "";
    }
    else {
        const matchValue = shortDisplayMsg(msg);
        if (matchValue == null) {
            return sprintInitial(70, `${msg}`);
        }
        else {
            const shortName = matchValue;
            return shortName;
        }
    }
}

export let updateTimeTotal = createAtom(0);

export function traceMessage(startOfUpdateTime, msg, _arg1_, _arg1__1) {
    let ss;
    const _arg = [_arg1_, _arg1__1];
    const model = _arg[0];
    const cmdL = _arg[1];
    if (debugLevel() > 0) {
        const str = getMessageTraceString(msg);
        let rootOfMsg;
        const matchValue = split(str, [" ", "("]);
        if ((ss = matchValue, ss.length > 0)) {
            const ss_1 = matchValue;
            rootOfMsg = ss_1[0];
        }
        else {
            rootOfMsg = "";
        }
        (output) => instrumentInterval(rootOfMsg, startOfUpdateTime, output);
        const updateTime = getTimeMs() - startOfUpdateTime;
        updateTimeTotal((updateTimeTotal() > 1000) ? 0 : (updateTimeTotal() + updateTime));
        if (contains("update", debugTraceUI())) {
            let logMsg;
            const arg = updateTimeTotal();
            const arg_1 = getMessageTraceString(msg);
            logMsg = toText(printf(">>Cmd:%.0f %s"))(arg)(arg_1);
            instrumentInterval(logMsg, startOfUpdateTime, msg);
        }
    }
    return [model, cmdL];
}

export let lastMemoryUpdateCheck = createAtom(0);

export function updateAllMemoryCompsIfNeeded(model) {
    const time = getTimeMs();
    if (((time - lastMemoryUpdateCheck()) > Constants_memoryUpdateCheckTime) && equals(getWSModel(model).State, new WaveSimState(5, []))) {
        toConsole(printf("checking update of memories"));
        lastMemoryUpdateCheck(time);
        return updateAllMemoryComps(model);
    }
    else {
        return model;
    }
}

export class RightClickElement extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["DBCustomComp", "DBScalingBox", "DBComp", "DBWire", "DBCanvas", "DBInputPort", "DBOutputPort", "IssieElement", "SheetMenuBreadcrumb", "WaveSimHelp", "NoMenu"];
    }
}

export function RightClickElement_$reflection() {
    return union_type("UpdateHelpers.RightClickElement", [], RightClickElement, () => [[["Item1", SymbolT_Symbol_$reflection()], ["Item2", CustomComponentType_$reflection()]], [["Item", list_type(string_type)]], [["Item", SymbolT_Symbol_$reflection()]], [["Wire", BusWireT_Wire_$reflection()], ["ASeg", list_type(BusWireT_ASegment_$reflection())]], [["Item", XYPos_$reflection()]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Sheet", SheetTree_$reflection()], ["IsSubSheet", bool_type]], [], []]);
}

export let rightClickElement = createAtom(new RightClickElement(10, []));

/**
 * Function that works out from the right-click event and model
 * what the current context menu should be.
 * output should be a menu name as defined in ContextMenus.contextMenus, or "" for no menu.
 */
export function getContextMenu(e, model) {
    let elId, elId_3, nameParts, elId_1, compId, matchValue_2, ct, sym, sym_1, connId, _arg, wire, segs, segs_1, s, s_1, elId_2, x;
    const symbols = model.Sheet.Wire.Symbol.Symbols;
    const bwModel = model.Sheet.Wire;
    const sheetXYPos = getDrawBlockPos(e, getHeaderHeight, model.Sheet);
    const element = e.target;
    let htmlId;
    try {
        htmlId = element.id;
    }
    catch (e_1) {
        htmlId = "invalid";
    }
    let elType;
    try {
        elType = element.nodeName;
    }
    catch (e_2) {
        elType = "invalid";
    }
    const drawOn = mouseOn(model.Sheet, sheetXYPos);
    let mouseInScalingBox;
    const insideBox = (pos, boundingBox) => {
        const yBox = boundingBox.TopLeft.Y;
        const xBox = boundingBox.TopLeft.X;
        const wBox = boundingBox.W;
        const hBox = boundingBox.H;
        if (((pos.X >= (xBox - 50)) && (pos.X <= ((xBox + wBox) + 50))) && (pos.Y >= (yBox - 50))) {
            return pos.Y <= ((yBox + hBox) + 50);
        }
        else {
            return false;
        }
    };
    const matchValue = model.Sheet.ScalingBox;
    if (matchValue != null) {
        const b = matchValue;
        mouseInScalingBox = insideBox(sheetXYPos, b.ScalingBoxBound);
    }
    else {
        mouseInScalingBox = false;
    }
    rightClickElement((htmlId === "refreshButton") ? (new RightClickElement(9, [])) : ((htmlId === "selectButton") ? (new RightClickElement(9, [])) : ((htmlId === "selectRamButton") ? (new RightClickElement(9, [])) : ((htmlId === "startEndButton") ? (new RightClickElement(9, [])) : ((htmlId === "WaveSimHelp") ? (((elId = htmlId, StringModule_StartsWith("SheetMenuBreadcrumb:", elId))) ? ((elId_3 = htmlId, (nameParts = split(elId_3, [":"], void 0, 1), defaultArg(flatten(map((p) => map((sheet) => (new RightClickElement(8, [sheet, nameParts.length > 2])), tryFind(nameParts[1], getSheetTrees(false, p))), model.CurrentProj)), new RightClickElement(10, []))))) : ((drawOn.tag === 6) ? ((elType === "path") ? (new RightClickElement(9, [])) : (new RightClickElement(9, []))) : ((drawOn.tag === 3) ? (new RightClickElement(9, [])) : ((drawOn.tag === 4) ? (new RightClickElement(9, [])) : ((drawOn.tag === 1) ? (new RightClickElement(9, [])) : ((drawOn.tag === 2) ? (new RightClickElement(9, [])) : (new RightClickElement(9, [])))))))) : ((htmlId === "DrawBlockSVGTop") ? (((elId_1 = htmlId, StringModule_StartsWith("SheetMenuBreadcrumb:", elId_1))) ? ((elId_3 = htmlId, (nameParts = split(elId_3, [":"], void 0, 1), defaultArg(flatten(map((p) => map((sheet) => (new RightClickElement(8, [sheet, nameParts.length > 2])), tryFind(nameParts[1], getSheetTrees(false, p))), model.CurrentProj)), new RightClickElement(10, []))))) : ((drawOn.tag === 6) ? ((elType === "path") ? (new RightClickElement(9, [])) : ((toConsole(printf("Draw block sheet \'canvas\'")), mouseInScalingBox ? (new RightClickElement(1, [model.Sheet.SelectedComponents])) : (new RightClickElement(4, [sheetXYPos]))))) : ((drawOn.tag === 3) ? ((compId = drawOn.fields[0], mouseInScalingBox ? (new RightClickElement(1, [model.Sheet.SelectedComponents])) : ((matchValue_2 = tryFind(compId, symbols), (matchValue_2 != null) ? ((matchValue_2.Component.Type.tag === 26) ? ((ct = matchValue_2.Component.Type.fields[0], new RightClickElement(0, [FSharpMap__get_Item(symbols, compId), ct]))) : (((sym = matchValue_2, equals(sym.Annotation, void 0))) ? ((sym_1 = matchValue_2, new RightClickElement(2, [sym_1]))) : (new RightClickElement(10, [])))) : (new RightClickElement(10, [])))))) : ((drawOn.tag === 4) ? ((connId = drawOn.fields[0], (_arg = tryFind(connId, bwModel.Wires), (_arg != null) ? ((wire = _arg, (segs = getClickedSegment(bwModel, connId, sheetXYPos), isEmpty(segs) ? (new RightClickElement(10, [])) : ((segs_1 = segs, new RightClickElement(3, [wire, segs_1])))))) : (new RightClickElement(10, []))))) : ((drawOn.tag === 1) ? ((s = drawOn.fields[0], new RightClickElement(5, [s]))) : ((drawOn.tag === 2) ? ((s_1 = drawOn.fields[0], new RightClickElement(6, [s_1]))) : (new RightClickElement(10, [])))))))) : (((elId_2 = htmlId, StringModule_StartsWith("SheetMenuBreadcrumb:", elId_2))) ? ((elId_3 = htmlId, (nameParts = split(elId_3, [":"], void 0, 1), defaultArg(flatten(map((p) => map((sheet) => (new RightClickElement(8, [sheet, nameParts.length > 2])), tryFind(nameParts[1], getSheetTrees(false, p))), model.CurrentProj)), new RightClickElement(10, []))))) : ((drawOn.tag === 6) ? ((elType === "path") ? (new RightClickElement(9, [])) : ((x = htmlId, (toConsole(printf("Other issie element: type:\'%A\'-> id:\'%A\'"))(elType)(x), new RightClickElement(7, [toString(element)]))))) : ((drawOn.tag === 3) ? ((compId = drawOn.fields[0], mouseInScalingBox ? (new RightClickElement(1, [model.Sheet.SelectedComponents])) : ((matchValue_2 = tryFind(compId, symbols), (matchValue_2 != null) ? ((matchValue_2.Component.Type.tag === 26) ? ((ct = matchValue_2.Component.Type.fields[0], new RightClickElement(0, [FSharpMap__get_Item(symbols, compId), ct]))) : (((sym = matchValue_2, equals(sym.Annotation, void 0))) ? ((sym_1 = matchValue_2, new RightClickElement(2, [sym_1]))) : (new RightClickElement(10, [])))) : (new RightClickElement(10, [])))))) : ((drawOn.tag === 4) ? ((connId = drawOn.fields[0], (_arg = tryFind(connId, bwModel.Wires), (_arg != null) ? ((wire = _arg, (segs = getClickedSegment(bwModel, connId, sheetXYPos), isEmpty(segs) ? (new RightClickElement(10, [])) : ((segs_1 = segs, new RightClickElement(3, [wire, segs_1])))))) : (new RightClickElement(10, []))))) : ((drawOn.tag === 1) ? ((s = drawOn.fields[0], new RightClickElement(5, [s]))) : ((drawOn.tag === 2) ? ((s_1 = drawOn.fields[0], new RightClickElement(6, [s_1]))) : (new RightClickElement(10, []))))))))))))));
    if (rightClickElement().tag === 8) {
        if (debugLevel() > 0) {
            return "SheetMenuBreadcrumbDev";
        }
        else {
            return "SheetMenuBreadcrumbDev";
        }
    }
    else if (rightClickElement().tag === 1) {
        return "ScalingBox";
    }
    else if (rightClickElement().tag === 0) {
        return "CustomComponent";
    }
    else if (rightClickElement().tag === 2) {
        return "Component";
    }
    else if (rightClickElement().tag === 4) {
        return "Canvas";
    }
    else if (rightClickElement().tag === 3) {
        return "Wire";
    }
    else if (rightClickElement().tag === 9) {
        return "WaveSimHelp";
    }
    else {
        toConsole(`Clicked on '${toString(drawOn)}'`);
        return "";
    }
}

/**
 * Function that implement action based on context menu item click.
 * menuType is the menu from chooseContextMenu.
 * item will be one of the possible items in this menu.
 */
export function processContextMenuClick(menuType, item, dispatch, model) {
    let l_14, l_22, optic_21, f_7, wires;
    const withNoCmd = (model_1) => [model_1, Cmd_none()];
    const withMsg = (msg, model_2) => [model_2, Cmd_OfFunc_result(msg)];
    const withMsgs = (msgs, model_3) => [model_3, Cmd_batch(map_1(Cmd_OfFunc_result, msgs))];
    const withWireMsg = (msg_4) => curry2(withMsg)(new Msg(1, [new SheetT_Msg(0, [msg_4])]));
    const sheetDispatch = (arg_1) => {
        dispatch(new Msg(1, [arg_1]));
    };
    const keyDispatch = (arg_3) => {
        sheetDispatch(new SheetT_Msg(2, [arg_3]));
    };
    const rotateDispatch = (arg_5) => {
        sheetDispatch(new SheetT_Msg(30, [arg_5]));
    };
    const flipDispatch = (arg_7) => {
        sheetDispatch(new SheetT_Msg(31, [arg_7]));
    };
    const busWireDispatch = (bMsg) => {
        sheetDispatch(new SheetT_Msg(0, [bMsg]));
    };
    const matchValue = rightClickElement();
    let matchResult, sheet, sheet_1, isSubSheet, sheet_2, isSubSheet_1, sheet_3, isSubSheet_2, sheet_4, isSubSheet_3, sheet_5, ct, sym, sym_1, sym_2, sym_3, sym_4, sym_5, aSeg, wire, selectedcomps, selectedcomps_1, selectedcomps_2, selectedcomps_3, pos, pos_1, pos_2, feature;
    switch (matchValue.tag) {
        case 8: {
            switch (item) {
                case "Rename": {
                    matchResult = 0;
                    sheet = matchValue.fields[0];
                    break;
                }
                case "Delete": {
                    matchResult = 1;
                    sheet_1 = matchValue.fields[0];
                    break;
                }
                case "Lock": {
                    matchResult = 2;
                    isSubSheet = matchValue.fields[1];
                    sheet_2 = matchValue.fields[0];
                    break;
                }
                case "Unlock": {
                    matchResult = 3;
                    isSubSheet_1 = matchValue.fields[1];
                    sheet_3 = matchValue.fields[0];
                    break;
                }
                case "Lock Subtree": {
                    matchResult = 4;
                    isSubSheet_2 = matchValue.fields[1];
                    sheet_4 = matchValue.fields[0];
                    break;
                }
                case "Unlock Subtree": {
                    matchResult = 5;
                    isSubSheet_3 = matchValue.fields[1];
                    sheet_5 = matchValue.fields[0];
                    break;
                }
                default:
                    matchResult = 28;
            }
            break;
        }
        case 0: {
            switch (item) {
                case "Go to sheet": {
                    matchResult = 6;
                    ct = matchValue.fields[1];
                    break;
                }
                case "Properties": {
                    matchResult = 11;
                    sym_4 = matchValue.fields[0];
                    break;
                }
                default:
                    matchResult = 28;
            }
            break;
        }
        case 2: {
            switch (item) {
                case "Rotate Clockwise (Ctrl+Right)": {
                    matchResult = 7;
                    sym = matchValue.fields[0];
                    break;
                }
                case "Rotate AntiClockwise (Ctrl+Left)": {
                    matchResult = 8;
                    sym_1 = matchValue.fields[0];
                    break;
                }
                case "Flip Vertical (Ctrl+Up)": {
                    matchResult = 9;
                    sym_2 = matchValue.fields[0];
                    break;
                }
                case "Flip Horizontal (Ctrl+Down)": {
                    matchResult = 10;
                    sym_3 = matchValue.fields[0];
                    break;
                }
                case "Properties": {
                    matchResult = 11;
                    sym_4 = matchValue.fields[0];
                    break;
                }
                case "Delete (DEL)": {
                    matchResult = 12;
                    break;
                }
                case "Copy (Ctrl+C)": {
                    matchResult = 13;
                    sym_5 = matchValue.fields[0];
                    break;
                }
                default:
                    matchResult = 28;
            }
            break;
        }
        case 3: {
            if (item === "Unfix Wire") {
                matchResult = 14;
                aSeg = matchValue.fields[1];
                wire = matchValue.fields[0];
            }
            else {
                matchResult = 28;
            }
            break;
        }
        case 1: {
            switch (item) {
                case "Rotate Clockwise (Ctrl+Right)": {
                    matchResult = 15;
                    selectedcomps = matchValue.fields[0];
                    break;
                }
                case "Rotate AntiClockwise (Ctrl+Left)": {
                    matchResult = 16;
                    selectedcomps_1 = matchValue.fields[0];
                    break;
                }
                case "Flip Vertical (Ctrl+Up)": {
                    matchResult = 17;
                    selectedcomps_2 = matchValue.fields[0];
                    break;
                }
                case "Flip Horizontal (Ctrl+Down)": {
                    matchResult = 18;
                    selectedcomps_3 = matchValue.fields[0];
                    break;
                }
                case "Delete Box (DEL)": {
                    matchResult = 19;
                    break;
                }
                case "Copy Box (Ctrl+C)": {
                    matchResult = 20;
                    break;
                }
                default:
                    matchResult = 28;
            }
            break;
        }
        case 4: {
            switch (item) {
                case "Zoom-in (Alt+Up) and centre": {
                    matchResult = 21;
                    pos = matchValue.fields[0];
                    break;
                }
                case "Zoom-out (Alt+Down)": {
                    matchResult = 22;
                    pos_1 = matchValue.fields[0];
                    break;
                }
                case "Fit to window (Ctrl+W)": {
                    matchResult = 23;
                    break;
                }
                case "Paste (Ctrl+V)": {
                    matchResult = 24;
                    pos_2 = matchValue.fields[0];
                    break;
                }
                case "Reroute all wires": {
                    matchResult = 25;
                    break;
                }
                case "Properties": {
                    matchResult = 27;
                    break;
                }
                default:
                    matchResult = 28;
            }
            break;
        }
        case 9: {
            matchResult = 26;
            feature = item;
            break;
        }
        default:
            matchResult = 28;
    }
    switch (matchResult) {
        case 0: {
            renameFileInProject(sheet.SheetName, (props) => ((children) => react.createElement("p", keyValueList(props, 1), ...children)), model, dispatch);
            return withNoCmd(model);
        }
        case 1: {
            deleteFileConfirmationPopup(sheet_1.SheetName, model, dispatch);
            return withNoCmd(model);
        }
        case 2: {
            toConsole(printf("locking %s"))(sheet_2.SheetName);
            return withNoCmd(changeLockState(isSubSheet, sheet_2, (_arg) => (new LockState(0, [])))(model));
        }
        case 3: {
            toConsole(printf("Unlocking %s"))(sheet_3.SheetName);
            return withNoCmd(changeLockState(isSubSheet_1, sheet_3, (_arg_1) => (new LockState(1, [])))(model));
        }
        case 4: {
            toConsole(printf("locking subtree %s"))(sheet_4.SheetName);
            return withNoCmd(changeSubtreeLockState(isSubSheet_2, sheet_4, (_arg_2) => (new LockState(0, [])))(model));
        }
        case 5: {
            toConsole(printf("Unlocking subtree %s"))(sheet_5.SheetName);
            return withNoCmd(changeSubtreeLockState(isSubSheet_3, sheet_5, (_arg_3) => (new LockState(1, [])))(model));
        }
        case 6: {
            const p = value_18(model.CurrentProj);
            openFileInProject(ct.Name, p, model, dispatch);
            return withNoCmd(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), uISheetTrail_)((trail) => cons(p.OpenFileName, trail))(model));
        }
        case 7: {
            rotateDispatch(new Rotation(1, []));
            return withNoCmd(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_selectedComponents_)(sheet_))(singleton(sym.Id))(model));
        }
        case 8: {
            rotateDispatch(new Rotation(3, []));
            return withNoCmd(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_selectedComponents_)(sheet_))(singleton(sym_1.Id))(model));
        }
        case 9: {
            flipDispatch("flipVertical");
            return withNoCmd(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_selectedComponents_)(sheet_))(singleton(sym_2.Id))(model));
        }
        case 10: {
            flipDispatch("flipHorizontal");
            return withNoCmd(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_selectedComponents_)(sheet_))(singleton(sym_3.Id))(model));
        }
        case 11:
            return withWireMsg(new BusWireT_Msg(0, [new SymbolT_Msg(11, [singleton(sym_4.Id)])]))(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), rightPaneTabVisible_)(new RightTab(0, []))(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_selectedComponents_)(sheet_))(singleton(sym_4.Id))(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_selectedWires_)(sheet_))(empty())(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), selectedComponent_)(sym_4.Component)(model)))));
        case 12: {
            keyDispatch(new SheetT_KeyboardMsg(13, []));
            return withNoCmd(model);
        }
        case 13: {
            const model_6 = equals(model.Sheet.SelectedComponents, empty()) ? Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_selectedComponents_)(sheet_))(singleton(sym_5.Id))(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_14 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_wire_)(sheet_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), BusWireT_symbol_)(l_14)))((model_4) => {
                const model_5 = model_4;
                const resetSymbols = map_2((_arg_4, sym_6) => {
                    let f_1, f1_4, value_8, f2_4;
                    return Optic_Set_op_HatEquals_Z147477F8_1(new Optic_Set(), SymbolT_moving_)(false)(((f_1 = ((f1_4 = ((value_8 = getSymbolColour(sym_6.Component.Type, sym_6.IsClocked, model_5.Theme), Optic_Set_op_HatEquals_Z147477F8_1(new Optic_Set(), SymbolT_colour_)(value_8))), (f2_4 = Optic_Set_op_HatEquals_Z147477F8_1(new Optic_Set(), SymbolT_opacity_)(1), (arg_31) => f2_4(f1_4(arg_31))))), Optic_Map_op_HatPercent_Z1462312A_1(new Optic_Map(), SymbolT_appearance_)(f_1)))(sym_6));
                }, model_5.Symbols);
                const updateSymbolColour = (prevSymbols, sId) => add(sId, Optic_Set_op_HatEquals_Z147477F8_1(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89_1(new Compose_Lens(), SymbolT_colour_)(SymbolT_appearance_))("lightgreen")(Optic_Set_op_HatEquals_Z147477F8_1(new Optic_Set(), SymbolT_moving_)(true)(FSharpMap__get_Item(resetSymbols, sId))), prevSymbols);
                const newSymbols = fold(updateSymbolColour, resetSymbols, singleton(sym_5.Id));
                return new SymbolT_Model(newSymbols, model_5.CopiedSymbols, model_5.Ports, model_5.InputPortsConnected, model_5.OutputPortsConnected, model_5.Theme, model_5.HintPane);
            })(model)) : model;
            return withMsg(new Msg(1, [new SheetT_Msg(2, [new SheetT_KeyboardMsg(1, [])])]), model_6);
        }
        case 14: {
            const changeManualSegToAuto = Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), BusWireT_mode_)((_arg_5) => {
                if (_arg_5 === "manual") {
                    return "auto";
                }
                else {
                    const m = _arg_5;
                    return m;
                }
            });
            return withNoCmd(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_wire_)(sheet_))((model_7) => separateAndOrderModelSegments(singleton(wire.WId), model_7))(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_22 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_wireOf_(wire.WId))(sheet_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), BusWireT_segments_)(l_22)))((list_2) => map_1(changeManualSegToAuto, list_2))(model)));
        }
        case 15: {
            rotateDispatch(new Rotation(1, []));
            return withWireMsg(new BusWireT_Msg(19, [selectedcomps]))(model);
        }
        case 16: {
            rotateDispatch(new Rotation(3, []));
            return withWireMsg(new BusWireT_Msg(19, [selectedcomps_1]))(model);
        }
        case 17: {
            flipDispatch("flipVertical");
            return withWireMsg(new BusWireT_Msg(19, [selectedcomps_2]))(model);
        }
        case 18: {
            flipDispatch("flipHorizontal");
            return withWireMsg(new BusWireT_Msg(19, [selectedcomps_3]))(model);
        }
        case 19: {
            keyDispatch(new SheetT_KeyboardMsg(13, []));
            return withNoCmd(model);
        }
        case 20: {
            keyDispatch(new SheetT_KeyboardMsg(1, []));
            return withNoCmd(model);
        }
        case 21: {
            toConsole(printf("Zoom-in!!"));
            return withMsg(new Msg(1, [new SheetT_Msg(4, [pos])]), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_zoom_)(sheet_))((zoom) => min(Constants_maxMagnification, zoom * Constants_zoomIncrement))(model));
        }
        case 22: {
            keyDispatch(new SheetT_KeyboardMsg(12, []));
            return withNoCmd(model);
        }
        case 23: {
            keyDispatch(new SheetT_KeyboardMsg(6, []));
            return withNoCmd(model);
        }
        case 24: {
            keyDispatch(new SheetT_KeyboardMsg(2, []));
            return withNoCmd(model);
        }
        case 25: {
            keyDispatch(new SheetT_KeyboardMsg(6, []));
            return withNoCmd(((optic_21 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_wire_)(sheet_), (f_7 = ((wires = toList(FSharpMap__get_Keys(model.Sheet.Wire.Wires)), (model_8) => updateWireSegmentJumpsAndSeparations(wires, model_8))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), optic_21)(f_7))))(model));
        }
        case 26: {
            viewWaveInfoPopup(dispatch, feature);
            return withNoCmd(model);
        }
        case 27:
            return withNoCmd(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), rightPaneTabVisible_)(new RightTab(0, []))(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_selectedWires_)(sheet_))(empty())(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_selectedComponents_)(sheet_))(empty())(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), selectedComponent_)(void 0)(model)))));
        default: {
            const arg_56 = `Context menu item not implemented: ${rightClickElement()} -> ${item}`;
            toConsole(printf("%s"))(arg_56);
            return withNoCmd(model);
        }
    }
}

export function filterByOKSheets(model, sheet) {
    let p, p_1;
    const matchValue = model.CurrentProj;
    let matchResult, p_2, p_3;
    if (matchValue != null) {
        if ((p = matchValue, p.OpenFileName === sheet)) {
            matchResult = 0;
            p_2 = matchValue;
        }
        else if ((p_1 = matchValue, forAll((ldc) => (ldc.Name !== sheet), p_1.LoadedComponents))) {
            matchResult = 1;
            p_3 = matchValue;
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
            return false;
        case 1:
            return false;
        default:
            return true;
    }
}

/**
 * Adapter function to pipeline adding a default "Cmd.none" command to a model as returned
 * in update function.
 */
export function withNoMsg(model) {
    return [model, Cmd_none()];
}

/**
 * Implement action of top bar 'Back' button using the UISheetTrail
 */
export function processSheetBackAction(dispatch, model) {
    const goodSheets = filter((sheet) => filterByOKSheets(model, sheet), model.UISheetTrail);
    let trail;
    if (!isEmpty(goodSheets)) {
        const sheet_1 = head(goodSheets);
        const others = tail(goodSheets);
        const p = value_18(model.CurrentProj);
        openFileInProject(sheet_1, p, model, dispatch);
        trail = others;
    }
    else {
        trail = empty();
    }
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), uISheetTrail_)(trail)(model);
}

/**
 * Read persistent user data from file in userAppDir.
 * Store in Model UserData.
 */
export function readUserData(userAppDir, model) {
    let _arg, model_2;
    const addAppDirToUserData = (model_1) => {
        let inputRecord;
        return new Model((inputRecord = model_1.UserData, new UserData(userAppDir, inputRecord.LastUsedDirectory, inputRecord.RecentProjects, inputRecord.ArrowDisplay, inputRecord.WireType, inputRecord.Theme)), model_1.WaveSim, model_1.WaveSimSheet, model_1.UISheetTrail, model_1.Spinner, model_1.Sheet, model_1.IsLoading, model_1.LastChangeCheckTime, model_1.LastSimulatedCanvasState, model_1.LastDetailedSavedState, model_1.CurrentSelected, model_1.LastSelectedIds, model_1.LastUsedDialogWidth, model_1.SelectedComponent, model_1.CurrentStepSimulationStep, model_1.CurrentTruthTable, model_1.TTConfig, model_1.RightPaneTabVisible, model_1.SimSubTabVisible, model_1.Hilighted, model_1.Clipboard, model_1.LastCreatedComponent, model_1.SavedSheetIsOutOfDate, model_1.CurrentProj, model_1.PopupViewFunc, model_1.SpinnerPayload, model_1.PopupDialogData, model_1.Notifications, model_1.TopMenuOpenState, model_1.DividerDragMode, model_1.WaveSimViewerWidth, model_1.ConnsOfSelectedWavesAreHighlighted, model_1.Pending, model_1.UIState, model_1.BuildVisible, model_1.DrawBlockTestState);
    };
    let modelOpt;
    try {
        const jsonRes = tryReadFileSync(pathJoin([userAppDir, "IssieSettings.json"]));
        modelOpt = userDataToDrawBlockModel(addAppDirToUserData((_arg = Result_Bind((data) => (new FSharpResult$2(0, [new Model(data, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState)])), Result_Bind((json) => {
            let matchValue, inputJson, typeInfo;
            try {
                return new FSharpResult$2(0, [(matchValue = SimpleJson_tryParse(json), (matchValue != null) ? ((inputJson = matchValue, (typeInfo = createTypeInfo(UserData_$reflection()), Convert_fromJson(inputJson, typeInfo)))) : (() => {
                    throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
                })())]);
            }
            catch (ex) {
                return new FSharpResult$2(1, [ex.message]);
            }
        }, jsonRes)), (_arg.tag === 1) ? ((toConsole(printf("Error reading user data")), model)) : ((model_2 = _arg.fields[0], model_2)))));
    }
    catch (e) {
        modelOpt = void 0;
    }
    if (modelOpt == null) {
        return [addAppDirToUserData(model), Cmd_none()];
    }
    else {
        const model_4 = modelOpt;
        return [model_4, Cmd_none()];
    }
}

export function writeUserData(model) {
    map((userAppDir) => {
        const _arg = Result_MapError((mess) => (`Write error on directory ${userAppDir}: ${mess}`), Result_Bind((json) => writeFile(pathJoin([userAppDir, "IssieSettings.json"]), json), (() => {
            let typeInfo;
            try {
                const data = drawBlockModelToUserData(model, model.UserData);
                return new FSharpResult$2(0, [(typeInfo = createTypeInfo(UserData_$reflection()), Convert_serialize(data, typeInfo))]);
            }
            catch (e) {
                return new FSharpResult$2(1, ["Can\'t write settings on this PC because userAppDir does not exist"]);
            }
        })()));
        if (_arg.tag === 1) {
            const mess_1 = _arg.fields[0];
            toConsole(printf("%s"))(mess_1);
        }
    }, model.UserData.UserAppDir);
    return model;
}

/**
 * subfunction used in model update function
 */
export function getSimulationDataOrFail(model, msg) {
    const matchValue = model.CurrentStepSimulationStep;
    if (matchValue != null) {
        const sim = matchValue;
        if (sim.tag === 0) {
            const simData = sim.fields[0];
            return simData;
        }
        else {
            return toFail(printf("what? Getting simulation data when could not start because of error: %s"))(msg);
        }
    }
    else {
        return toFail(printf("what? Getting simulation data when no simulation is running: %s"))(msg);
    }
}

export function verilogOutputPage(sheet, fPath) {
    let s_3;
    const children = [`You can write sheet '${sheet}' (and its subsheets) in either simulation or synthesis format. The output will be written to:`, Text_div(ofArray([new Common_GenericOption(2, [singleton(new Modifier_IModifier(2, [new TextWeight_Option(3, [])]))]), new Common_GenericOption(1, [singleton(["style", {
        textAlign: "center",
        padding: "10px",
        fontFamily: "monospace",
        fontSize: "15px",
    }])])]), singleton(`${cropToLength(55, false, fPath)}.v`)), columns(empty(), ofArray([column(empty(), singleton(panel(singleton(new Option(0, [new Color_IColor(5, [])])), ofArray([heading(empty(), singleton("Simulation output")), Block_div(empty(), singleton((s_3 = "Simulation output will run on an online synthesis tool such as Icarus v10 to check that Issie\'s Verilog output is working", s_3))), Block_div(empty(), singleton(button(ofArray([new Option_1(0, [new Color_IColor(6, [])]), new Option_1(2, []), new Option_1(18, [(_arg) => {
        openInBrowser("https://www.tutorialspoint.com/compile_verilog_online.php", _arg);
    }])]), singleton("Icarus v10 Verilog simulator"))))])))), column(empty(), singleton(panel(singleton(new Option(0, [new Color_IColor(5, [])])), ofArray([heading(empty(), singleton("Synthesis output")), Block_div(empty(), singleton("Synthesis output can be used as input to FPGA synthesis tools.")), Block_div(empty(), singleton(button(ofArray([new Option_1(0, [new Color_IColor(6, [])]), new Option_1(2, []), new Option_1(18, [(_arg_1) => {
        openInBrowser("https://github.com/edstott/issie-synth", _arg_1);
    }])]), singleton("Instructions for synthesis work-flow"))))]))))]))];
    return react.createElement("div", {}, ...children);
}

/**
 * handle Menu actions that may need Model data
 */
export function getMenuView(act, model, dispatch) {
    switch (act.tag) {
        case 1: {
            saveOpenFileActionWithModelUpdate(model, dispatch);
            dispatch(new Msg(5, [new JSDiagramMsg(4, [false])]));
            break;
        }
        case 2: {
            const value_1 = saveOpenProjectInNewFormat(model);
            break;
        }
        case 3: {
            addFileToProject(model, dispatch);
            break;
        }
        case 7: {
            toConsole(printf("Lost focus!"));
            break;
        }
        case 4: {
            doActionWithSaveFileDialog("Exit ISSIE", new Msg(78, []), model, dispatch, void 0);
            break;
        }
        case 6: {
            mapOverProject(void 0, model, (p) => {
                const sheet = p.OpenFileName;
                const fPath = pathJoin([p.ProjectPath, sheet]);
                choicePopup("Verilog Output", verilogOutputPage(sheet, fPath), "Write Synthesis Verilog", "Write Simulation Verilog", (forSim, _arg) => {
                    if (forSim) {
                        verilogOutput(new VMode(0, []), model, dispatch);
                    }
                    else {
                        verilogOutput(new VMode(1, []), model, dispatch);
                    }
                    dispatch(new Msg(41, []));
                }, dispatch);
            });
            break;
        }
        default:
            0;
    }
    return model;
}

/**
 * get timestamp of current loaded component.
 * is this ever used? No.
 */
export function getCurrentTimeStamp(model) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const p = matchValue;
        const _arg = tryFind_1((lc) => (lc.Name === p.OpenFileName), p.LoadedComponents);
        if (_arg == null) {
            const arg_1 = map_1((lc_2) => lc_2.Name, p.LoadedComponents);
            return toFail(printf("Project inconsistency: can\'t find component %s in %A"))(p.OpenFileName)(arg_1);
        }
        else {
            const lc_1 = _arg;
            return lc_1.TimeStamp;
        }
    }
    else {
        return minValue();
    }
}

/**
 * Replace timestamp of current loaded component in model project by current time
 * Used in update function
 */
export function updateTimeStamp(model) {
    const setTimeStamp = (lc) => (new LoadedComponent(lc.Name, now(), lc.FilePath, lc.WaveInfo, lc.CanvasState, lc.InputLabels, lc.OutputLabels, lc.Form, lc.Description));
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const p = matchValue;
        return new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, new Project(p.ProjectPath, p.OpenFileName, p.WorkingFileName, map_1((lc_1) => {
            if (lc_1.Name === p.OpenFileName) {
                return setTimeStamp(lc_1);
            }
            else {
                return lc_1;
            }
        }, p.LoadedComponents)), model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
    }
    else {
        return model;
    }
}

export function findChange(model) {
    const last = model.LastChangeCheckTime;
    const start = getTimeMs();
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const prj = matchValue;
        const savedComponent = find((lc) => (lc.Name === prj.OpenFileName), prj.LoadedComponents);
        const canv = savedComponent.CanvasState;
        const canv$0027 = DrawModelType_SheetT_Model__Model_GetCanvasState(model.Sheet);
        if (!equalArrays(canv, canv$0027)) {
            return instrumentInterval("findChange", start, !compareCanvas(100, canv[0], canv[1], canv$0027[0], canv$0027[1]));
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

/**
 * Needed so that constant properties selection will work
 * Maybe good idea for other things too?
 */
export function resetDialogIfSelectionHasChanged(newModel, oldModel) {
    let f, f1, f2;
    const newSelected = newModel.Sheet.SelectedComponents;
    if ((length(newSelected) === 1) && !equals(newSelected, oldModel.Sheet.SelectedComponents)) {
        return ((f = ((f1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), text_)(void 0), (f2 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), int_)(void 0), (arg_3) => f2(f1(arg_3))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), popupDialogData_)(f)))(newModel);
    }
    else {
        return newModel;
    }
}

export function updateComponentMemory(addr, data, compOpt) {
    let matchResult, comp, ct, mem;
    if (compOpt != null) {
        switch (compOpt.Type.tag) {
            case 39: {
                matchResult = 1;
                comp = compOpt;
                ct = compOpt.Type;
                mem = compOpt.Type.fields[0];
                break;
            }
            case 40: {
                matchResult = 1;
                comp = compOpt;
                ct = compOpt.Type;
                mem = compOpt.Type.fields[0];
                break;
            }
            case 42: {
                matchResult = 1;
                comp = compOpt;
                ct = compOpt.Type;
                mem = compOpt.Type.fields[0];
                break;
            }
            case 41: {
                matchResult = 1;
                comp = compOpt;
                ct = compOpt.Type;
                mem = compOpt.Type.fields[0];
                break;
            }
            default:
                matchResult = 2;
        }
    }
    else {
        matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return void 0;
        case 1: {
            const update = (mem_1, ct_1) => {
                switch (ct_1.tag) {
                    case 39:
                        return new ComponentType(39, [mem_1]);
                    case 40:
                        return new ComponentType(40, [mem_1]);
                    case 41:
                        return new ComponentType(41, [mem_1]);
                    case 42:
                        return new ComponentType(42, [mem_1]);
                    default:
                        return ct_1;
                }
            };
            const mem$0027 = new Memory1(mem.Init, mem.AddressWidth, mem.WordWidth, add(addr, data, mem.Data));
            return new Component(comp.Id, update(mem$0027, ct), comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo);
        }
        default:
            return compOpt;
    }
}

export function exitApp(model) {
    writeUserData(model);
    electron.ipcRenderer.send("exit-the-app");
}

/**
 * Tests physical equality on two objects.
 * Used because Msg type does not support structural equality.
 * **DANGER** will only work for messages which are physically the the same.
 * In this use case that is fine.
 */
export function isSameMsg() {
    return (e) => ((e_1) => (e === e_1));
}

/**
 * Returns None if no mouse drag message found, returns Some (lastMouseMsg, msgQueueWithoutMouseMsgs) if a drag message was found
 */
export function getLastMouseMsg(msgQueue) {
    const _arg = filter((msg) => matchMouseMsg((mMsg) => equals(mMsg.Op, new MouseOp(3, [])), msg), msgQueue);
    if (isEmpty(_arg)) {
        return void 0;
    }
    else {
        const lst = _arg;
        return head(lst);
    }
}

export function sheetMsg(sMsg, model) {
    const patternInput = update_1(sMsg, model);
    const sModel = patternInput[0];
    const sCmd = patternInput[1];
    return [new Model(sModel.UserData, sModel.WaveSim, sModel.WaveSimSheet, sModel.UISheetTrail, sModel.Spinner, sModel.Sheet, sModel.IsLoading, sModel.LastChangeCheckTime, sModel.LastSimulatedCanvasState, sModel.LastDetailedSavedState, sModel.CurrentSelected, sModel.LastSelectedIds, sModel.LastUsedDialogWidth, sModel.SelectedComponent, sModel.CurrentStepSimulationStep, sModel.CurrentTruthTable, sModel.TTConfig, sModel.RightPaneTabVisible, sModel.SimSubTabVisible, sModel.Hilighted, sModel.Clipboard, sModel.LastCreatedComponent, findChange(sModel), sModel.CurrentProj, sModel.PopupViewFunc, sModel.SpinnerPayload, sModel.PopupDialogData, sModel.Notifications, sModel.TopMenuOpenState, sModel.DividerDragMode, sModel.WaveSimViewerWidth, sModel.ConnsOfSelectedWavesAreHighlighted, sModel.Pending, sModel.UIState, sModel.BuildVisible, sModel.DrawBlockTestState), sCmd];
}

export function executePendingMessagesF(n, model) {
    if (n === length(model.Pending)) {
        const _arg = getLastMouseMsg(model.Pending);
        if (_arg != null) {
            const mMsg = _arg;
            if (mMsg.tag === 1) {
                const sMsg = mMsg.fields[0];
                return sheetMsg(sMsg, model);
            }
            else {
                return toFail(printf("shouldn\'t happen "));
            }
        }
        else {
            return toFail(printf("shouldn\'t happen"));
        }
    }
    else {
        return [model, Cmd_none()];
    }
}

//# sourceMappingURL=UpdateHelpers.fs.js.map
