import { Record, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { record_type, string_type, bool_type, tuple_type, list_type, lambda_type, unit_type, union_type, int32_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { tryFind as tryFind_1, fold, add, FSharpMap__get_Item, empty } from "../fable_modules/fable-library.4.1.4/Map.js";
import { createAtom, stringHash, compareArrays, compare, comparePrimitives } from "../fable_modules/fable-library.4.1.4/Util.js";
import { toFail, join, toText, printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { emptyFastSimulation, simulationPlaceholder } from "../Simulator/Fast/FastCreate.fs.js";
import { ofList, empty as empty_1 } from "../fable_modules/fable-library.4.1.4/Set.js";
import { Msg, Msg_$reflection, Model_$reflection, Model__get_WaveSimOrCurrentSheet, Model, UserData, WaveSimModel, Constants_initialWaveformColWidth, WaveSimState } from "../Model/ModelType.fs.js";
import { ofArray, head, isEmpty, filter, length, singleton, append, contains, cons, tryFind, map, empty as empty_2 } from "../fable_modules/fable-library.4.1.4/List.js";
import { canvasState_, loadedComponentOf_, SavedWaveInfo, NumberBase } from "../Common/CommonTypes.fs.js";
import { SheetT_Model, BusWireT_Model, SymbolT_Model } from "../Model/DrawModelType.fs.js";
import { value as value_1, defaultArg, unwrap } from "../fable_modules/fable-library.4.1.4/Option.js";
import { DrawModelType_SheetT_Model__Model_GetCanvasState } from "../DrawBlock/Sheet.fs.js";
import { Cmd_batch } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { Optic_Set, Optic_Set_op_HatEquals_Z147477F8, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89 } from "../Common/Optics.fs.js";

export const Constants_maxLastClk = 1000;

export const Constants_maxStepsOverflow = 3;

export class CSSGridPos extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["PosElement", "PosAreaSpan", "PosAreaAbsolute"];
    }
}

export function CSSGridPos_$reflection() {
    return union_type("ModelHelpers.CSSGridPos", [], CSSGridPos, () => [[["Item1", int32_type], ["Item2", int32_type]], [["startX", int32_type], ["startY", int32_type], ["spanX", int32_type], ["spanY", int32_type]], [["startX", int32_type], ["startY", int32_type], ["spanX", int32_type], ["spanY", int32_type]]]);
}

export const initWSModel = (() => {
    const Sheets = empty({
        Compare: comparePrimitives,
    });
    const AllWaves = empty({
        Compare: compare,
    });
    const SelectedRams = empty({
        Compare: compareArrays,
    });
    let FastSim;
    toConsole(printf("Creating initWSModel"));
    FastSim = simulationPlaceholder;
    const ShowComponentDetail = empty_1({
        Compare: compareArrays,
    });
    return new WaveSimModel(new WaveSimState(0, []), "", Sheets, AllWaves, empty_2(), 0, 5, 0, false, new NumberBase(0, []), Constants_initialWaveformColWidth, false, false, empty_2(), SelectedRams, FastSim, "", empty_1({
        Compare: compare,
    }), ShowComponentDetail, empty_1({
        Compare: compareArrays,
    }), void 0, void 0, void 0);
})();

/**
 * This is needed because DrawBlock cannot directly access Issie Model.
 * can be replaced when all Model is placed at start of compile order and DB
 * model is refactored
 */
export function drawBlockModelToUserData(model, userData) {
    const bwModel = model.Sheet.Wire;
    return new UserData(userData.UserAppDir, userData.LastUsedDirectory, userData.RecentProjects, bwModel.ArrowDisplay, bwModel.Type, userData.Theme);
}

/**
 * This is needed because DrawBlock cannot directly access Issie Model.
 * can be replaced when all Model is placed at start of compile order and DB
 * model is refactored
 */
export function userDataToDrawBlockModel(model) {
    let inputRecord, inputRecord_1, inputRecord_2;
    const userData = model.UserData;
    return new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, (inputRecord = model.Sheet, new SheetT_Model((inputRecord_1 = model.Sheet.Wire, new BusWireT_Model((inputRecord_2 = model.Sheet.Wire.Symbol, new SymbolT_Model(inputRecord_2.Symbols, inputRecord_2.CopiedSymbols, inputRecord_2.Ports, inputRecord_2.InputPortsConnected, inputRecord_2.OutputPortsConnected, userData.Theme, inputRecord_2.HintPane)), inputRecord_1.Wires, inputRecord_1.CopiedWires, inputRecord_1.SelectedSegment, inputRecord_1.LastMousePos, inputRecord_1.ErrorWires, inputRecord_1.Notifications, userData.WireType, userData.ArrowDisplay, inputRecord_1.SnapToNet)), inputRecord.PopupViewFunc, inputRecord.PopupDialogData, inputRecord.BoundingBoxes, inputRecord.LastValidBoundingBoxes, inputRecord.SelectedLabel, inputRecord.SelectedComponents, inputRecord.SelectedWires, inputRecord.NearbyComponents, inputRecord.ErrorComponents, inputRecord.DragToSelectBox, inputRecord.ConnectPortsLine, inputRecord.TargetPortId, inputRecord.Action, inputRecord.ShowGrid, inputRecord.CursorType, inputRecord.LastValidPos, inputRecord.LastValidSymbol, inputRecord.SnapSymbols, inputRecord.SnapSegments, inputRecord.CurrentKeyPresses, inputRecord.Zoom, inputRecord.CanvasSize, inputRecord.TmpModel, inputRecord.ScalingTmpModel, inputRecord.UndoList, inputRecord.RedoList, inputRecord.AutomaticScrolling, inputRecord.ScreenScrollPos, inputRecord.LastMousePos, inputRecord.ScalingBoxCentrePos, inputRecord.InitMouseToScalingBoxCentre, inputRecord.ScrollingLastMousePos, inputRecord.LastMousePosForSnap, inputRecord.MouseCounter, inputRecord.CtrlKeyDown, inputRecord.PrevWireSelection, inputRecord.ScalingBox, inputRecord.Compiling, inputRecord.CompilationStatus, inputRecord.CompilationProcess, inputRecord.DebugState, inputRecord.DebugData, inputRecord.DebugMappings, inputRecord.DebugIsConnected, inputRecord.DebugDevice)), model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
}

export function reduce(this$) {
    return {
        Clipboard: this$.Clipboard,
        ConnsToBeHighlighted: this$.ConnsOfSelectedWavesAreHighlighted,
        CreateComponent: unwrap(this$.LastCreatedComponent),
        CurrProject: !(this$.PopupViewFunc == null),
        CurrentSelected: this$.CurrentSelected,
        DragMode: this$.DividerDragMode,
        HasUnsavedChanges: false,
        Hilighted: this$.Hilighted,
        LastSelectedIds: this$.LastSelectedIds,
        LastSimulatedCanvasState: unwrap(this$.LastSimulatedCanvasState),
        LastUsedDialogWidth: this$.LastUsedDialogWidth,
        PopupDialogData: this$.PopupDialogData,
        RightTab: this$.RightPaneTabVisible,
        SelectedComponent: unwrap(this$.SelectedComponent),
        TopMenu: this$.TopMenuOpenState,
        ViewerWidth: this$.WaveSimViewerWidth,
    };
}

export function reduceApprox(this$) {
    return {
        Clipboard: this$.Clipboard,
        CreateComponent: unwrap(this$.LastCreatedComponent),
        CurrProject: !(this$.PopupViewFunc == null),
        DragMode: this$.DividerDragMode,
        HasUnsavedChanges: false,
        LastUsedDialogWidth: this$.LastUsedDialogWidth,
        PopupDialogData: this$.PopupDialogData,
        RightTab: this$.RightPaneTabVisible,
        ViewerWidth: this$.WaveSimViewerWidth,
    };
}

export function mapFst(mapFn, model, cmd) {
    return [mapFn(model), cmd];
}

export function mapOverProject(defaultValue, model, transform) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const p = matchValue;
        return transform(p);
    }
    else {
        return defaultValue;
    }
}

export function getComponentIds(model) {
    const extractIds = (_arg) => {
        const conns = _arg[1];
        const comps = _arg[0];
        return map((comp) => comp.Id, conns);
    };
    return ofList(extractIds(DrawModelType_SheetT_Model__Model_GetCanvasState(model.Sheet)), {
        Compare: compare,
    });
}

/**
 * Get saveable record of WaveSimModel
 */
export function getSavedWaveInfo(wsModel) {
    return new SavedWaveInfo(wsModel.SelectedWaves, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.ShownCycles, void 0, wsModel.SelectedRams, void 0, void 0, void 0, void 0);
}

/**
 * Setup current WaveSimModel from saved record
 * NB: note that SavedWaveInfo can only be changed if code is added to make loading backwards compatible with
 * old designs
 */
export function loadWSModelFromSavedWaveInfo(swInfo) {
    const SelectedWaves = defaultArg(swInfo.SelectedWaves, initWSModel.SelectedWaves);
    const Radix = defaultArg(swInfo.Radix, initWSModel.Radix);
    const WaveformColumnWidth = defaultArg(swInfo.WaveformColumnWidth, initWSModel.WaveformColumnWidth);
    return new WaveSimModel(initWSModel.State, initWSModel.TopSheet, initWSModel.Sheets, initWSModel.AllWaves, SelectedWaves, initWSModel.StartCycle, defaultArg(swInfo.ShownCycles, initWSModel.ShownCycles), initWSModel.CurrClkCycle, initWSModel.ClkCycleBoxIsEmpty, Radix, WaveformColumnWidth, initWSModel.WaveModalActive, initWSModel.RamModalActive, initWSModel.RamComps, defaultArg(swInfo.SelectedFRams, initWSModel.SelectedRams), initWSModel.FastSim, initWSModel.SearchString, initWSModel.ShowSheetDetail, initWSModel.ShowComponentDetail, initWSModel.ShowGroupDetail, initWSModel.HoveredLabel, initWSModel.DraggedIndex, initWSModel.PrevSelectedWaves);
}

export function spComp(comp) {
    const matchValue = comp.Type;
    if (matchValue.tag === 26) {
        const ol = matchValue.fields[0].OutputLabels;
        const name = matchValue.fields[0].Name;
        const il = matchValue.fields[0].InputLabels;
        return toText(printf("Custom:%s(ins=%A:outs=%A)"))(name)(il)(il);
    }
    else {
        const x = matchValue;
        return toText(printf("%A"))(x);
    }
}

export function spConn(conn) {
    return toText(printf("Conn:%A"))(conn.Vertices);
}

export function spState(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const conns = _arg[1];
    const comps = _arg[0];
    const arg = map(spComp, comps);
    const arg_1 = map(spConn, conns);
    return toText(printf("Canvas<%A,%A>"))(arg)(arg_1);
}

export function spCanvas(model) {
    const tupledArg = DrawModelType_SheetT_Model__Model_GetCanvasState(model.Sheet);
    return spState(tupledArg[0], tupledArg[1]);
}

export function spComps(comps) {
    const arg = map(spComp, comps);
    return toText(printf("Comps%A"))(arg);
}

export function spOpt(f, thingOpt) {
    if (thingOpt != null) {
        const x = value_1(thingOpt);
        const arg = f(x);
        return toText(printf("Some %s"))(arg);
    }
    else {
        return "None";
    }
}

export function spLdComp(ldc) {
    const arg_2 = spComps(ldc.CanvasState[0]);
    return toText(printf("LDC<%s:%A:%s>"))(ldc.Name)(ldc.TimeStamp)(arg_2);
}

export function spProj(p) {
    const arg_1 = join("\n", map(spLdComp, p.LoadedComponents));
    return toText(printf("PROJ||Sheet=%s\n%s||ENDP\n"))(p.OpenFileName)(arg_1);
}

export function pp(model) {
    const arg = spCanvas(model);
    const arg_1 = spOpt(spProj, model.CurrentProj);
    toConsole(printf("\n%s\n%s"))(arg)(arg_1);
}

export function spMess(msg) {
    const x = msg;
    return toText(printf("MSG<<%20A>>ENDM"))(x);
}

export function tryGetLoadedComponents(model) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const p = matchValue;
        return p.LoadedComponents;
    }
    else {
        return empty_2();
    }
}

export function updateLdComps(name, changeFun, ldComps) {
    return map((ldc) => {
        if (ldc.Name === name) {
            return changeFun(ldc);
        }
        else {
            return ldc;
        }
    }, ldComps);
}

export function updateLdCompsWithCompOpt(newCompOpt, ldComps) {
    if (newCompOpt != null) {
        const newComp = newCompOpt;
        const matchValue = tryFind((ldc) => (ldc.Name === newComp.Name), ldComps);
        if (matchValue != null) {
            return updateLdComps(newComp.Name, (_arg) => newComp, ldComps);
        }
        else {
            return cons(newComp, ldComps);
        }
    }
    else {
        return ldComps;
    }
}

/**
 * returns a string option representing the current file name if file is loaded, otherwise None
 */
export function getCurrFile(model) {
    const matchValue = model.CurrentProj;
    if (matchValue == null) {
        return void 0;
    }
    else {
        const proj = matchValue;
        return proj.OpenFileName;
    }
}

export function getCurrSheets(model) {
    const matchValue = model.CurrentProj;
    if (matchValue == null) {
        return void 0;
    }
    else {
        const proj = matchValue;
        return map((lc) => lc.Name, proj.LoadedComponents);
    }
}

/**
 * For reasons of space efficiency, ensure that no non-empty unused FastSimulation records are kept
 * FastSimulation records can be very large and at most one should exist, it must be for the sheet referenced by
 * model.WaveSimSheet
 */
export function removeAllSimulationsFromModel(model) {
    const removeFastSimFromWaveSimMap = (sheet, wsM) => {
        const ws = FSharpMap__get_Item(wsM, sheet);
        if (ws.FastSim.SimulatedTopSheet === "") {
            return wsM;
        }
        else {
            return add(sheet, new WaveSimModel(ws.State, ws.TopSheet, ws.Sheets, ws.AllWaves, ws.SelectedWaves, ws.StartCycle, ws.ShownCycles, ws.CurrClkCycle, ws.ClkCycleBoxIsEmpty, ws.Radix, ws.WaveformColumnWidth, ws.WaveModalActive, ws.RamModalActive, ws.RamComps, ws.SelectedRams, emptyFastSimulation(""), ws.SearchString, ws.ShowSheetDetail, ws.ShowComponentDetail, ws.ShowGroupDetail, ws.HoveredLabel, ws.DraggedIndex, ws.PrevSelectedWaves), wsM);
        }
    };
    return new Model(model.UserData, fold((wsM_1, sheet_1, ws_1) => removeFastSimFromWaveSimMap(sheet_1, wsM_1), model.WaveSim, model.WaveSim), model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
}

/**
 * Get the current WaveSimModel used by the Model (index the map using the current wavesim sheet).
 * If no WaveSimModel for that sheet, return an empty wave sim model.
 */
export function getWSModel(model_mut) {
    getWSModel:
    while (true) {
        const model = model_mut;
        const matchValue = model.WaveSimSheet;
        if (matchValue == null) {
            const matchValue_1 = getCurrFile(model);
            if (matchValue_1 != null) {
                const sheet_1 = matchValue_1;
                model_mut = (new Model(model.UserData, model.WaveSim, sheet_1, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState));
                continue getWSModel;
            }
            else {
                return initWSModel;
            }
        }
        else {
            const sheet = matchValue;
            const _arg = tryFind_1(sheet, model.WaveSim);
            if (_arg == null) {
                return initWSModel;
            }
            else {
                const wsModel = _arg;
                return wsModel;
            }
        }
        break;
    }
}

/**
 * Set WaveSimModel of current sheet.
 */
export function setWSModel(wsModel, model) {
    let wsSheet, sheets;
    const matchValue = getCurrSheets(model);
    const matchValue_1 = Model__get_WaveSimOrCurrentSheet(model);
    if (matchValue == null) {
        toConsole(printf("\n\n******* What? trying to set wsmod when WaveSimSheet \'%A\' is not valid, project is closed"))(model.WaveSimSheet);
        return model;
    }
    else if ((wsSheet = matchValue_1, (sheets = matchValue, contains(wsSheet, sheets, {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    })))) {
        const sheets_1 = matchValue;
        const wsSheet_1 = matchValue_1;
        return new Model(model.UserData, add(wsSheet_1, wsModel, model.WaveSim), model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
    }
    else {
        const sheets_2 = matchValue;
        const wsSheet_2 = matchValue_1;
        return toFail(`What? can't find ${wsSheet_2} in ${sheets_2} to set WSModel`);
    }
}

/**
 * Update WaveSimModel of current sheet.
 */
export function updateWSModel(updateFn, model) {
    let wsSheet, sheets;
    const matchValue = getCurrSheets(model);
    const matchValue_1 = Model__get_WaveSimOrCurrentSheet(model);
    if (matchValue == null) {
        toConsole(printf("\n\n******* What? trying to set wsmod when WaveSimSheet \'%A\' is not valid, project is closed"))(model.WaveSimSheet);
        return model;
    }
    else if ((wsSheet = matchValue_1, (sheets = matchValue, contains(wsSheet, sheets, {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    })))) {
        const sheets_1 = matchValue;
        const wsSheet_1 = matchValue_1;
        const ws = FSharpMap__get_Item(model.WaveSim, wsSheet_1);
        return new Model(model.UserData, add(wsSheet_1, updateFn(ws), model.WaveSim), model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
    }
    else {
        const sheets_2 = matchValue;
        const wsSheet_2 = matchValue_1;
        return toFail(`What? can't find ${wsSheet_2} in ${sheets_2} to set WSModel`);
    }
}

/**
 * Update WaveSimModel of given sheet - if it does not exist do nothing
 */
export function updateWSModelOfSheet(sheet, updateFn, model) {
    let wsSheet, sheets;
    const matchValue = getCurrSheets(model);
    if (matchValue == null) {
        toConsole(printf("\n\n******* What? trying to set wsmod when WaveSimSheet \'%A\' is not valid, project is closed"))(model.WaveSimSheet);
        return model;
    }
    else if ((wsSheet = sheet, (sheets = matchValue, contains(wsSheet, sheets, {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    })))) {
        const sheets_1 = matchValue;
        const wsSheet_1 = sheet;
        const ws = FSharpMap__get_Item(model.WaveSim, wsSheet_1);
        return new Model(model.UserData, add(wsSheet_1, updateFn(ws), model.WaveSim), model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
    }
    else {
        const sheets_2 = matchValue;
        const wsSheet_2 = sheet;
        toConsole(printf("\n\n******* What? trying to set wsmod when WaveSimSheet \'%A\' is not valid, sheets=%A"))(wsSheet_2)(sheets_2);
        return model;
    }
}

export class ViewableJob extends Record {
    constructor(JobWork, ViewHasExecuted, JobName) {
        super();
        this.JobWork = JobWork;
        this.ViewHasExecuted = ViewHasExecuted;
        this.JobName = JobName;
    }
}

export function ViewableJob_$reflection() {
    return record_type("ModelHelpers.ViewableJob", [], ViewableJob, () => [["JobWork", lambda_type(Model_$reflection(), tuple_type(Model_$reflection(), list_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), unit_type))))], ["ViewHasExecuted", bool_type], ["JobName", string_type]]);
}

export let asyncJobs = createAtom(empty_2());

export function runAfterView(jobName, workFn) {
    const job = new ViewableJob(workFn, false, jobName);
    toConsole(`scheduling ${jobName}`);
    asyncJobs(append(asyncJobs(), singleton(job)));
}

export function setAsyncJobsRunnable(dispatch) {
    dispatch(new Msg(81, []));
    if (length(asyncJobs()) > 0) {
        toConsole(printf("setting asynch jobs to vieHasExecuted"));
    }
    asyncJobs(map((job) => (new ViewableJob(job.JobWork, true, job.JobName)), asyncJobs()));
}

/**
 * called from update function, it will execute outstanding async jobs.
 * each job modifies model.
 */
export function execOneAsyncJobIfPossible(model, cmd) {
    const _arg = filter((job) => job.ViewHasExecuted, asyncJobs());
    if (!isEmpty(_arg)) {
        const job_1 = head(_arg);
        asyncJobs(filter((job$0027) => (job$0027.JobName !== job_1.JobName), asyncJobs()));
        toConsole(`Executing async '${job_1.JobName}.`);
        const tupledArg = job_1.JobWork(model);
        const model$0027 = tupledArg[0];
        const cmd$0027 = tupledArg[1];
        return [model$0027, Cmd_batch(ofArray([cmd, cmd$0027]))];
    }
    else {
        return [model, cmd];
    }
}

/**
 * Return the project with with open file contents in loadedcomponents updated according to
 * current Draw Block contents.
 */
export function getUpdatedLoadedComponents(project, model) {
    return mapOverProject(project, model, (p) => {
        let optic, l, value;
        return ((optic = ((l = loadedComponentOf_(p.OpenFileName), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), canvasState_)(l))), (value = DrawModelType_SheetT_Model__Model_GetCanvasState(model.Sheet), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), optic)(value))))(p);
    });
}

//# sourceMappingURL=ModelHelpers.fs.js.map
