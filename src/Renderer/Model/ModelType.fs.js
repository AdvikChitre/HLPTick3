import { Record, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { array_type, lambda_type, unit_type, float64_type, tuple_type, class_type, int32_type, record_type, option_type, int64_type, bool_type, list_type, union_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { SimulationComponent_$reflection, SimulationData_$reflection, FastSimulation_$reflection, IOArray_$reflection, SimulationError_$reflection, FastComponent_$reflection } from "../Simulator/SimulatorTypes.fs.js";
import { openFileName_, loadedComponents_, openLoadedComponent_, Project_$reflection, JSDiagramMsg_$reflection, Connection_$reflection, Component_$reflection, WaveIndexT_$reflection, InitMemData_$reflection, NumberBase_$reflection } from "../Common/CommonTypes.fs.js";
import { TruthTable_$reflection, ConstraintSet_$reflection, MoveDirection_$reflection, SortType_$reflection, Constraint_$reflection, CellIO_$reflection, ConstraintType_$reflection } from "../Simulator/TruthTableTypes.fs.js";
import { ErrorInfo_$reflection } from "../VerilogComponent/VerilogTypes.fs.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { SheetT_Model_$reflection, BusWireT_WireType_$reflection, SymbolT_ThemeType_$reflection, SheetT_Msg_$reflection } from "./DrawModelType.fs.js";
import { CSSProp_$reflection } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { value, map } from "../fable_modules/fable-library.4.1.4/Option.js";
import { uncurry2, curry2 } from "../fable_modules/fable-library.4.1.4/Util.js";
import { Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Compose_Prism, Compose_Prism_op_GreaterQmarkGreater_507FA136, Optics_Option_value_, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z335E5A0C } from "../Common/Optics.fs.js";

export class ComponentGroup extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["WireLabel", "InputOutput", "Viewers", "Buses", "Gates", "MuxDemux", "Arithmetic", "CustomComp", "FFRegister", "Memories", "Component"];
    }
}

export function ComponentGroup_$reflection() {
    return union_type("ModelType.ComponentGroup", [], ComponentGroup, () => [[], [], [], [], [], [], [], [], [], [], [["Item", string_type]]]);
}

export class CheckBoxStyle extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["PortItem", "ComponentItem", "GroupItem", "SheetItem"];
    }
}

export function CheckBoxStyle_$reflection() {
    return union_type("ModelType.CheckBoxStyle", [], CheckBoxStyle, () => [[["Item1", Wave_$reflection()], ["Item2", string_type]], [["Item", FastComponent_$reflection()]], [["Item1", ComponentGroup_$reflection()], ["Item2", list_type(string_type)]], [["Item", list_type(string_type)]]]);
}

export class RightTab extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Properties", "Catalogue", "Simulation", "Build", "Transition"];
    }
}

export function RightTab_$reflection() {
    return union_type("ModelType.RightTab", [], RightTab, () => [[], [], [], [], []]);
}

export class SimSubTab extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["StepSim", "TruthTable", "WaveSim"];
    }
}

export function SimSubTab_$reflection() {
    return union_type("ModelType.SimSubTab", [], SimSubTab, () => [[], [], []]);
}

export class MemoryEditorData extends Record {
    constructor(OnlyDiff, Address, Start, NumberBase) {
        super();
        this.OnlyDiff = OnlyDiff;
        this.Address = Address;
        this.Start = Start;
        this.NumberBase = NumberBase;
    }
}

export function MemoryEditorData_$reflection() {
    return record_type("ModelType.MemoryEditorData", [], MemoryEditorData, () => [["OnlyDiff", bool_type], ["Address", option_type(int64_type)], ["Start", int64_type], ["NumberBase", NumberBase_$reflection()]]);
}

export class ImportDecision extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Overwrite", "Rename"];
    }
}

export function ImportDecision_$reflection() {
    return union_type("ModelType.ImportDecision", [], ImportDecision, () => [[], []]);
}

export class PopupDialogData extends Record {
    constructor(Text$, Int, ImportDecisions, Int2, ProjectPath, MemorySetup, MemoryEditorData, Progress, ConstraintTypeSel, ConstraintIOSel, ConstraintErrorMsg, NewConstraint, AlgebraInputs, AlgebraError, VerilogCode, VerilogErrors, BadLabel, IntList, IntList2) {
        super();
        this.Text = Text$;
        this.Int = Int;
        this.ImportDecisions = ImportDecisions;
        this.Int2 = Int2;
        this.ProjectPath = ProjectPath;
        this.MemorySetup = MemorySetup;
        this.MemoryEditorData = MemoryEditorData;
        this.Progress = Progress;
        this.ConstraintTypeSel = ConstraintTypeSel;
        this.ConstraintIOSel = ConstraintIOSel;
        this.ConstraintErrorMsg = ConstraintErrorMsg;
        this.NewConstraint = NewConstraint;
        this.AlgebraInputs = AlgebraInputs;
        this.AlgebraError = AlgebraError;
        this.VerilogCode = VerilogCode;
        this.VerilogErrors = VerilogErrors;
        this.BadLabel = BadLabel;
        this.IntList = IntList;
        this.IntList2 = IntList2;
    }
}

export function PopupDialogData_$reflection() {
    return record_type("ModelType.PopupDialogData", [], PopupDialogData, () => [["Text", option_type(string_type)], ["Int", option_type(int32_type)], ["ImportDecisions", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, option_type(ImportDecision_$reflection())])], ["Int2", option_type(int64_type)], ["ProjectPath", string_type], ["MemorySetup", option_type(tuple_type(int32_type, int32_type, InitMemData_$reflection(), option_type(string_type)))], ["MemoryEditorData", option_type(MemoryEditorData_$reflection())], ["Progress", option_type(PopupProgress_$reflection())], ["ConstraintTypeSel", option_type(ConstraintType_$reflection())], ["ConstraintIOSel", option_type(CellIO_$reflection())], ["ConstraintErrorMsg", option_type(string_type)], ["NewConstraint", option_type(Constraint_$reflection())], ["AlgebraInputs", option_type(list_type(tuple_type(string_type, string_type, int32_type)))], ["AlgebraError", option_type(SimulationError_$reflection())], ["VerilogCode", option_type(string_type)], ["VerilogErrors", list_type(ErrorInfo_$reflection())], ["BadLabel", bool_type], ["IntList", option_type(list_type(int32_type))], ["IntList2", option_type(list_type(int32_type))]]);
}

export class TopMenu extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Closed", "Project", "Files"];
    }
}

export function TopMenu_$reflection() {
    return union_type("ModelType.TopMenu", [], TopMenu, () => [[], [], []]);
}

export class KeyboardShortcutMsg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["CtrlS", "AltC", "AltV", "AltZ", "AltShiftZ", "DEL"];
    }
}

export function KeyboardShortcutMsg_$reflection() {
    return union_type("ModelType.KeyboardShortcutMsg", [], KeyboardShortcutMsg, () => [[], [], [], [], [], []]);
}

export class UICommandType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["CloseProject", "ChangeSheet", "RenameSheet", "ImportSheet", "DeleteSheet", "AddSheet", "SaveSheet", "StartWaveSim", "ViewWaveSim", "CloseWaveSim"];
    }
}

export function UICommandType_$reflection() {
    return union_type("ModelType.UICommandType", [], UICommandType, () => [[], [], [], [], [], [], [], [], [], []]);
}

export class TestState extends Record {
    constructor(LastTestNumber, LastTestSampleIndex) {
        super();
        this.LastTestNumber = (LastTestNumber | 0);
        this.LastTestSampleIndex = (LastTestSampleIndex | 0);
    }
}

export function TestState_$reflection() {
    return record_type("ModelType.TestState", [], TestState, () => [["LastTestNumber", int32_type], ["LastTestSampleIndex", int32_type]]);
}

export class WaveSimState extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Empty", "NoProject", "SimError", "NonSequential", "Loading", "Success", "Ended"];
    }
}

export function WaveSimState_$reflection() {
    return union_type("ModelType.WaveSimState", [], WaveSimState, () => [[], [], [["Item", SimulationError_$reflection()]], [], [], [], []]);
}

export class DriverT extends Record {
    constructor(DriverId, Port) {
        super();
        this.DriverId = DriverId;
        this.Port = Port;
    }
}

export function DriverT_$reflection() {
    return record_type("ModelType.DriverT", [], DriverT, () => [["DriverId", tuple_type(string_type, list_type(string_type))], ["Port", int32_type]]);
}

export class Wave extends Record {
    constructor(WaveId, StartCycle, ShownCycles, CycleWidth, Radix, SheetId, SubSheet, Conns, DisplayName, ViewerDisplayName, CompLabel, PortLabel, Width, WaveValues, SVG) {
        super();
        this.WaveId = WaveId;
        this.StartCycle = (StartCycle | 0);
        this.ShownCycles = (ShownCycles | 0);
        this.CycleWidth = CycleWidth;
        this.Radix = Radix;
        this.SheetId = SheetId;
        this.SubSheet = SubSheet;
        this.Conns = Conns;
        this.DisplayName = DisplayName;
        this.ViewerDisplayName = ViewerDisplayName;
        this.CompLabel = CompLabel;
        this.PortLabel = PortLabel;
        this.Width = (Width | 0);
        this.WaveValues = WaveValues;
        this.SVG = SVG;
    }
}

export function Wave_$reflection() {
    return record_type("ModelType.Wave", [], Wave, () => [["WaveId", WaveIndexT_$reflection()], ["StartCycle", int32_type], ["ShownCycles", int32_type], ["CycleWidth", float64_type], ["Radix", NumberBase_$reflection()], ["SheetId", list_type(string_type)], ["SubSheet", list_type(string_type)], ["Conns", list_type(string_type)], ["DisplayName", string_type], ["ViewerDisplayName", string_type], ["CompLabel", string_type], ["PortLabel", string_type], ["Width", int32_type], ["WaveValues", IOArray_$reflection()], ["SVG", option_type(class_type("Fable.React.ReactElement"))]]);
}

export class WaveSimModel extends Record {
    constructor(State, TopSheet, Sheets, AllWaves, SelectedWaves, StartCycle, ShownCycles, CurrClkCycle, ClkCycleBoxIsEmpty, Radix, WaveformColumnWidth, WaveModalActive, RamModalActive, RamComps, SelectedRams, FastSim, SearchString, ShowSheetDetail, ShowComponentDetail, ShowGroupDetail, HoveredLabel, DraggedIndex, PrevSelectedWaves) {
        super();
        this.State = State;
        this.TopSheet = TopSheet;
        this.Sheets = Sheets;
        this.AllWaves = AllWaves;
        this.SelectedWaves = SelectedWaves;
        this.StartCycle = (StartCycle | 0);
        this.ShownCycles = (ShownCycles | 0);
        this.CurrClkCycle = (CurrClkCycle | 0);
        this.ClkCycleBoxIsEmpty = ClkCycleBoxIsEmpty;
        this.Radix = Radix;
        this.WaveformColumnWidth = WaveformColumnWidth;
        this.WaveModalActive = WaveModalActive;
        this.RamModalActive = RamModalActive;
        this.RamComps = RamComps;
        this.SelectedRams = SelectedRams;
        this.FastSim = FastSim;
        this.SearchString = SearchString;
        this.ShowSheetDetail = ShowSheetDetail;
        this.ShowComponentDetail = ShowComponentDetail;
        this.ShowGroupDetail = ShowGroupDetail;
        this.HoveredLabel = HoveredLabel;
        this.DraggedIndex = DraggedIndex;
        this.PrevSelectedWaves = PrevSelectedWaves;
    }
}

export function WaveSimModel_$reflection() {
    return record_type("ModelType.WaveSimModel", [], WaveSimModel, () => [["State", WaveSimState_$reflection()], ["TopSheet", string_type], ["Sheets", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))])], ["AllWaves", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [WaveIndexT_$reflection(), Wave_$reflection()])], ["SelectedWaves", list_type(WaveIndexT_$reflection())], ["StartCycle", int32_type], ["ShownCycles", int32_type], ["CurrClkCycle", int32_type], ["ClkCycleBoxIsEmpty", bool_type], ["Radix", NumberBase_$reflection()], ["WaveformColumnWidth", float64_type], ["WaveModalActive", bool_type], ["RamModalActive", bool_type], ["RamComps", list_type(FastComponent_$reflection())], ["SelectedRams", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(string_type, list_type(string_type)), string_type])], ["FastSim", FastSimulation_$reflection()], ["SearchString", string_type], ["ShowSheetDetail", class_type("Microsoft.FSharp.Collections.FSharpSet`1", [list_type(string_type)])], ["ShowComponentDetail", class_type("Microsoft.FSharp.Collections.FSharpSet`1", [tuple_type(string_type, list_type(string_type))])], ["ShowGroupDetail", class_type("Microsoft.FSharp.Collections.FSharpSet`1", [tuple_type(ComponentGroup_$reflection(), list_type(string_type))])], ["HoveredLabel", option_type(WaveIndexT_$reflection())], ["DraggedIndex", option_type(WaveIndexT_$reflection())], ["PrevSelectedWaves", option_type(list_type(WaveIndexT_$reflection()))]]);
}

export class DiagEl extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Comp", "Conn"];
    }
}

export function DiagEl_$reflection() {
    return union_type("ModelType.DiagEl", [], DiagEl, () => [[["Item", Component_$reflection()]], [["Item", Connection_$reflection()]]]);
}

export class DragMode extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["DragModeOn", "DragModeOff"];
    }
}

export function DragMode_$reflection() {
    return union_type("ModelType.DragMode", [], DragMode, () => [[["Item", int32_type]], []]);
}

export class IntMode extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["FirstInt", "SecondInt"];
    }
}

export function IntMode_$reflection() {
    return union_type("ModelType.IntMode", [], IntMode, () => [[], []]);
}

export class MenuCommand extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["MenuPrint", "MenuSaveFile", "MenuSaveProjectInNewFormat", "MenuNewFile", "MenuExit", "MenuZoom", "MenuVerilogOutput", "MenuLostFocus", "MenuDrawBlockTest"];
    }
}

export function MenuCommand_$reflection() {
    return union_type("ModelType.MenuCommand", [], MenuCommand, () => [[], [], [], [], [], [["Item", float64_type]], [], [], [["Item1", lambda_type(int32_type, lambda_type(lambda_type(Msg_$reflection(), unit_type), lambda_type(Model_$reflection(), unit_type)))], ["Item2", int32_type]]]);
}

export class SimulationProgress extends Record {
    constructor(InitialClock, FinalClock, ClocksPerChunk) {
        super();
        this.InitialClock = (InitialClock | 0);
        this.FinalClock = (FinalClock | 0);
        this.ClocksPerChunk = (ClocksPerChunk | 0);
    }
}

export function SimulationProgress_$reflection() {
    return record_type("ModelType.SimulationProgress", [], SimulationProgress, () => [["InitialClock", int32_type], ["FinalClock", int32_type], ["ClocksPerChunk", int32_type]]);
}

export class PopupProgress extends Record {
    constructor(Value, Max, Title, Speed) {
        super();
        this.Value = (Value | 0);
        this.Max = (Max | 0);
        this.Title = Title;
        this.Speed = Speed;
    }
}

export function PopupProgress_$reflection() {
    return record_type("ModelType.PopupProgress", [], PopupProgress, () => [["Value", int32_type], ["Max", int32_type], ["Title", string_type], ["Speed", float64_type]]);
}

export class TTMsg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["GenerateTruthTable", "RegenerateTruthTable", "FilterTruthTable", "SortTruthTable", "DCReduceTruthTable", "HideTTColumns", "CloseTruthTable", "ClearInputConstraints", "ClearOutputConstraints", "AddInputConstraint", "AddOutputConstraint", "DeleteInputConstraint", "DeleteOutputConstraint", "ToggleHideTTColumn", "ClearHiddenTTColumns", "ClearDCMap", "SetTTSortType", "MoveColumn", "SetIOOrder", "SetTTAlgebraInputs", "SetTTBase", "SetTTGridCache", "TogglePopupAlgebraInput", "SetPopupInputConstraints", "SetPopupOutputConstraints", "SetPopupConstraintTypeSel", "SetPopupConstraintIOSel", "SetPopupConstraintErrorMsg", "SetPopupNewConstraint", "SetPopupAlgebraInputs", "SetPopupAlgebraError"];
    }
}

export function TTMsg_$reflection() {
    return union_type("ModelType.TTMsg", [], TTMsg, () => [[["Item", option_type(tuple_type(union_type("Microsoft.FSharp.Core.FSharpResult`2", [SimulationData_$reflection(), SimulationError_$reflection()], FSharpResult$2, () => [[["ResultValue", SimulationData_$reflection()]], [["ErrorValue", SimulationError_$reflection()]]]), tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))))]], [], [], [], [], [], [], [], [], [["Item", Constraint_$reflection()]], [["Item", Constraint_$reflection()]], [["Item", Constraint_$reflection()]], [["Item", Constraint_$reflection()]], [["Item", CellIO_$reflection()]], [], [], [["Item", option_type(tuple_type(CellIO_$reflection(), SortType_$reflection()))]], [["Item", tuple_type(CellIO_$reflection(), MoveDirection_$reflection())]], [["Item", array_type(CellIO_$reflection())]], [["Item", list_type(tuple_type(string_type, string_type, int32_type))]], [["Item", NumberBase_$reflection()]], [["Item", option_type(class_type("Fable.React.ReactElement"))]], [["Item", tuple_type(tuple_type(string_type, string_type, int32_type), SimulationData_$reflection())]], [["Item", option_type(ConstraintSet_$reflection())]], [["Item", option_type(ConstraintSet_$reflection())]], [["Item", option_type(ConstraintType_$reflection())]], [["Item", option_type(CellIO_$reflection())]], [["Item", option_type(string_type)]], [["Item", option_type(Constraint_$reflection())]], [["Item", option_type(list_type(tuple_type(string_type, string_type, int32_type)))]], [["Item", option_type(SimulationError_$reflection())]]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ShowExitDialog", "Sheet", "UpdateUISheetTrail", "SheetBackAction", "SynchroniseCanvas", "JSDiagramMsg", "KeyboardShortcutMsg", "Benchmark", "StartSimulation", "AddWSModel", "SetWSModel", "UpdateWSModel", "SetWSModelAndSheet", "GenerateWaveforms", "GenerateCurrentWaveforms", "RefreshWaveSim", "SetWaveSheetSelectionOpen", "SetWaveComponentSelectionOpen", "SetWaveGroupSelectionOpen", "LockTabsToWaveSim", "UnlockTabsFromWaveSim", "TryStartSimulationAfterErrorFix", "SetSimulationGraph", "SetSimulationBase", "IncrementSimulationClockTick", "EndSimulation", "EndWaveSim", "TruthTableMsg", "ChangeRightTab", "ChangeSimSubTab", "SetHighlighted", "SetSelWavesHighlighted", "SetClipboard", "SetCreateComponent", "SetProject", "UpdateProject", "UpdateModel", "UpdateImportDecisions", "UpdateProjectWithoutSyncing", "ShowPopup", "ShowStaticInfoPopup", "ClosePopup", "SetPopupDialogText", "SetPopupDialogBadLabel", "SetPopupDialogCode", "SetPopupDialogVerilogErrors", "SetPopupDialogInt", "SetPopupDialogInt2", "SetPopupDialogTwoInts", "SetPopupDialogIntList", "SetPopupDialogIntList2", "SetPropertiesExtraDialogText", "SetPopupDialogMemorySetup", "SetPopupMemoryEditorData", "SetPopupProgress", "UpdatePopupProgress", "SimulateWithProgressBar", "SetSelectedComponentMemoryLocation", "CloseDiagramNotification", "SetSimulationNotification", "CloseSimulationNotification", "CloseWaveSimNotification", "SetFilesNotification", "CloseFilesNotification", "SetMemoryEditorNotification", "CloseMemoryEditorNotification", "SetPropertiesNotification", "ClosePropertiesNotification", "SetTopMenu", "ReloadSelectedComponent", "SetDragMode", "ChangeBuildTabVisibility", "SetViewerWidth", "MenuAction", "DiagramMouseEvent", "SelectionHasChanged", "SetIsLoading", "SetRouterInteractive", "CloseApp", "SetExitDialog", "ExecutePendingMessages", "DoNothing", "StartUICmd", "FinishUICmd", "ReadUserData", "SetUserData", "SetThemeUserData", "ExecCmd", "ExecFuncInMessage", "ExecFuncAsynch", "ExecCmdAsynch", "SendSeqMsgAsynch", "ContextMenuAction", "ContextMenuItemClick", "UpdateDrawBlockTestState"];
    }
}

export function Msg_$reflection() {
    return union_type("ModelType.Msg", [], Msg, () => [[], [["Item", SheetT_Msg_$reflection()]], [["Item", lambda_type(list_type(string_type), list_type(string_type))]], [["Item", lambda_type(Msg_$reflection(), unit_type)]], [], [["Item", JSDiagramMsg_$reflection()]], [["Item", KeyboardShortcutMsg_$reflection()]], [], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [SimulationData_$reflection(), SimulationError_$reflection()], FSharpResult$2, () => [[["ResultValue", SimulationData_$reflection()]], [["ErrorValue", SimulationError_$reflection()]]])]], [["Item", tuple_type(string_type, WaveSimModel_$reflection())]], [["Item", WaveSimModel_$reflection()]], [["Item", lambda_type(WaveSimModel_$reflection(), WaveSimModel_$reflection())]], [["Item1", WaveSimModel_$reflection()], ["Item2", string_type]], [["Item", WaveSimModel_$reflection()]], [], [["Item", WaveSimModel_$reflection()]], [["Item", tuple_type(list_type(list_type(string_type)), bool_type)]], [["Item", tuple_type(list_type(tuple_type(string_type, list_type(string_type))), bool_type)]], [["Item", tuple_type(list_type(tuple_type(ComponentGroup_$reflection(), list_type(string_type))), bool_type)]], [], [], [["Item", SimSubTab_$reflection()]], [["Item1", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, SimulationComponent_$reflection()])], ["Item2", FastSimulation_$reflection()]], [["Item", NumberBase_$reflection()]], [["Item", int32_type]], [], [], [["Item", TTMsg_$reflection()]], [["Item", RightTab_$reflection()]], [["Item", SimSubTab_$reflection()]], [["Item1", list_type(string_type)], ["Item2", list_type(string_type)]], [["Item", array_type(string_type)]], [["Item", tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))]], [["Item", Component_$reflection()]], [["Item", Project_$reflection()]], [["Item", lambda_type(Project_$reflection(), Project_$reflection())]], [["Item", lambda_type(Model_$reflection(), Model_$reflection())]], [["Item", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, option_type(ImportDecision_$reflection())])]], [["Item", lambda_type(Project_$reflection(), Project_$reflection())]], [["Item", lambda_type(lambda_type(Msg_$reflection(), unit_type), lambda_type(Model_$reflection(), class_type("Fable.React.ReactElement")))]], [["Item", tuple_type(string_type, class_type("Fable.React.ReactElement"), lambda_type(Msg_$reflection(), unit_type))]], [], [["Item", option_type(string_type)]], [["Item", bool_type]], [["Item", option_type(string_type)]], [["Item", list_type(ErrorInfo_$reflection())]], [["Item", option_type(int32_type)]], [["Item", option_type(int64_type)]], [["Item", tuple_type(option_type(int64_type), IntMode_$reflection(), option_type(string_type))]], [["Item", option_type(list_type(int32_type))]], [["Item", option_type(list_type(int32_type))]], [["Item", option_type(string_type)]], [["Item", option_type(tuple_type(int32_type, int32_type, InitMemData_$reflection(), option_type(string_type)))]], [["Item", option_type(MemoryEditorData_$reflection())]], [["Item", option_type(PopupProgress_$reflection())]], [["Item", lambda_type(PopupProgress_$reflection(), PopupProgress_$reflection())]], [["Item", SimulationProgress_$reflection()]], [["Item1", int64_type], ["Item2", int64_type]], [], [["Item", lambda_type(lambda_type(Msg_$reflection(), unit_type), class_type("Fable.React.ReactElement"))]], [], [], [["Item", lambda_type(lambda_type(Msg_$reflection(), unit_type), class_type("Fable.React.ReactElement"))]], [], [["Item", lambda_type(lambda_type(Msg_$reflection(), unit_type), class_type("Fable.React.ReactElement"))]], [], [["Item", lambda_type(lambda_type(Msg_$reflection(), unit_type), class_type("Fable.React.ReactElement"))]], [], [["Item", TopMenu_$reflection()]], [["Item", int32_type]], [["Item", DragMode_$reflection()]], [], [["Item", int32_type]], [["Item1", MenuCommand_$reflection()], ["Item2", lambda_type(Msg_$reflection(), unit_type)]], [], [], [["Item", bool_type]], [["Item", bool_type]], [], [["Item", bool_type]], [["Item", int32_type]], [], [["Item", UICommandType_$reflection()]], [], [["Item", string_type]], [["Item", UserData_$reflection()]], [["Item", SymbolT_ThemeType_$reflection()]], [["Item", list_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), unit_type))]], [["Item1", lambda_type(Model_$reflection(), lambda_type(lambda_type(Msg_$reflection(), unit_type), unit_type))], ["Item2", lambda_type(Msg_$reflection(), unit_type)]], [["Item", lambda_type(unit_type, list_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), unit_type)))]], [["Item", list_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), unit_type))]], [["Item", class_type("System.Collections.Generic.IEnumerable`1", [Msg_$reflection()])]], [["e", class_type("Browser.Types.MouseEvent", void 0)]], [["menuType", string_type], ["item", string_type], ["dispatch", lambda_type(Msg_$reflection(), unit_type)]], [["Item", lambda_type(option_type(TestState_$reflection()), option_type(TestState_$reflection()))]]]);
}

export class Notifications extends Record {
    constructor(FromDiagram, FromSimulation, FromWaveSim, FromFiles, FromMemoryEditor, FromProperties) {
        super();
        this.FromDiagram = FromDiagram;
        this.FromSimulation = FromSimulation;
        this.FromWaveSim = FromWaveSim;
        this.FromFiles = FromFiles;
        this.FromMemoryEditor = FromMemoryEditor;
        this.FromProperties = FromProperties;
    }
}

export function Notifications_$reflection() {
    return record_type("ModelType.Notifications", [], Notifications, () => [["FromDiagram", option_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), class_type("Fable.React.ReactElement")))], ["FromSimulation", option_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), class_type("Fable.React.ReactElement")))], ["FromWaveSim", option_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), class_type("Fable.React.ReactElement")))], ["FromFiles", option_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), class_type("Fable.React.ReactElement")))], ["FromMemoryEditor", option_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), class_type("Fable.React.ReactElement")))], ["FromProperties", option_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), class_type("Fable.React.ReactElement")))]]);
}

export class UserData extends Record {
    constructor(UserAppDir, LastUsedDirectory, RecentProjects, ArrowDisplay, WireType, Theme) {
        super();
        this.UserAppDir = UserAppDir;
        this.LastUsedDirectory = LastUsedDirectory;
        this.RecentProjects = RecentProjects;
        this.ArrowDisplay = ArrowDisplay;
        this.WireType = WireType;
        this.Theme = Theme;
    }
}

export function UserData_$reflection() {
    return record_type("ModelType.UserData", [], UserData, () => [["UserAppDir", option_type(string_type)], ["LastUsedDirectory", option_type(string_type)], ["RecentProjects", option_type(list_type(string_type))], ["ArrowDisplay", bool_type], ["WireType", BusWireT_WireType_$reflection()], ["Theme", SymbolT_ThemeType_$reflection()]]);
}

export class SpinnerState extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["WaveSimSpinner"];
    }
}

export function SpinnerState_$reflection() {
    return union_type("ModelType.SpinnerState", [], SpinnerState, () => [[]]);
}

export class SpinPayload extends Record {
    constructor(Payload, Name, ToDo, Total) {
        super();
        this.Payload = Payload;
        this.Name = Name;
        this.ToDo = (ToDo | 0);
        this.Total = (Total | 0);
    }
}

export function SpinPayload_$reflection() {
    return record_type("ModelType.SpinPayload", [], SpinPayload, () => [["Payload", lambda_type(Model_$reflection(), Model_$reflection())], ["Name", string_type], ["ToDo", int32_type], ["Total", int32_type]]);
}

export class TTType extends Record {
    constructor(BitLimit, InputConstraints, OutputConstraints, HiddenColumns, SortType, IOOrder, GridStyles, GridCache, AlgebraIns) {
        super();
        this.BitLimit = (BitLimit | 0);
        this.InputConstraints = InputConstraints;
        this.OutputConstraints = OutputConstraints;
        this.HiddenColumns = HiddenColumns;
        this.SortType = SortType;
        this.IOOrder = IOOrder;
        this.GridStyles = GridStyles;
        this.GridCache = GridCache;
        this.AlgebraIns = AlgebraIns;
    }
}

export function TTType_$reflection() {
    return record_type("ModelType.TTType", [], TTType, () => [["BitLimit", int32_type], ["InputConstraints", ConstraintSet_$reflection()], ["OutputConstraints", ConstraintSet_$reflection()], ["HiddenColumns", list_type(CellIO_$reflection())], ["SortType", option_type(tuple_type(CellIO_$reflection(), SortType_$reflection()))], ["IOOrder", array_type(CellIO_$reflection())], ["GridStyles", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [CellIO_$reflection(), list_type(CSSProp_$reflection())])], ["GridCache", option_type(class_type("Fable.React.ReactElement"))], ["AlgebraIns", list_type(tuple_type(string_type, string_type, int32_type))]]);
}

export class Model extends Record {
    constructor(UserData, WaveSim, WaveSimSheet, UISheetTrail, Spinner, Sheet, IsLoading, LastChangeCheckTime, LastSimulatedCanvasState, LastDetailedSavedState, CurrentSelected, LastSelectedIds, LastUsedDialogWidth, SelectedComponent, CurrentStepSimulationStep, CurrentTruthTable, TTConfig, RightPaneTabVisible, SimSubTabVisible, Hilighted, Clipboard, LastCreatedComponent, SavedSheetIsOutOfDate, CurrentProj, PopupViewFunc, SpinnerPayload, PopupDialogData, Notifications, TopMenuOpenState, DividerDragMode, WaveSimViewerWidth, ConnsOfSelectedWavesAreHighlighted, Pending, UIState, BuildVisible, DrawBlockTestState) {
        super();
        this.UserData = UserData;
        this.WaveSim = WaveSim;
        this.WaveSimSheet = WaveSimSheet;
        this.UISheetTrail = UISheetTrail;
        this.Spinner = Spinner;
        this.Sheet = Sheet;
        this.IsLoading = IsLoading;
        this.LastChangeCheckTime = LastChangeCheckTime;
        this.LastSimulatedCanvasState = LastSimulatedCanvasState;
        this.LastDetailedSavedState = LastDetailedSavedState;
        this.CurrentSelected = CurrentSelected;
        this.LastSelectedIds = LastSelectedIds;
        this.LastUsedDialogWidth = (LastUsedDialogWidth | 0);
        this.SelectedComponent = SelectedComponent;
        this.CurrentStepSimulationStep = CurrentStepSimulationStep;
        this.CurrentTruthTable = CurrentTruthTable;
        this.TTConfig = TTConfig;
        this.RightPaneTabVisible = RightPaneTabVisible;
        this.SimSubTabVisible = SimSubTabVisible;
        this.Hilighted = Hilighted;
        this.Clipboard = Clipboard;
        this.LastCreatedComponent = LastCreatedComponent;
        this.SavedSheetIsOutOfDate = SavedSheetIsOutOfDate;
        this.CurrentProj = CurrentProj;
        this.PopupViewFunc = PopupViewFunc;
        this.SpinnerPayload = SpinnerPayload;
        this.PopupDialogData = PopupDialogData;
        this.Notifications = Notifications;
        this.TopMenuOpenState = TopMenuOpenState;
        this.DividerDragMode = DividerDragMode;
        this.WaveSimViewerWidth = (WaveSimViewerWidth | 0);
        this.ConnsOfSelectedWavesAreHighlighted = ConnsOfSelectedWavesAreHighlighted;
        this.Pending = Pending;
        this.UIState = UIState;
        this.BuildVisible = BuildVisible;
        this.DrawBlockTestState = DrawBlockTestState;
    }
}

export function Model_$reflection() {
    return record_type("ModelType.Model", [], Model, () => [["UserData", UserData_$reflection()], ["WaveSim", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, WaveSimModel_$reflection()])], ["WaveSimSheet", option_type(string_type)], ["UISheetTrail", list_type(string_type)], ["Spinner", option_type(lambda_type(Model_$reflection(), Model_$reflection()))], ["Sheet", SheetT_Model_$reflection()], ["IsLoading", bool_type], ["LastChangeCheckTime", float64_type], ["LastSimulatedCanvasState", option_type(tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection())))], ["LastDetailedSavedState", tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))], ["CurrentSelected", tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))], ["LastSelectedIds", tuple_type(list_type(string_type), list_type(string_type))], ["LastUsedDialogWidth", int32_type], ["SelectedComponent", option_type(Component_$reflection())], ["CurrentStepSimulationStep", option_type(union_type("Microsoft.FSharp.Core.FSharpResult`2", [SimulationData_$reflection(), SimulationError_$reflection()], FSharpResult$2, () => [[["ResultValue", SimulationData_$reflection()]], [["ErrorValue", SimulationError_$reflection()]]]))], ["CurrentTruthTable", option_type(union_type("Microsoft.FSharp.Core.FSharpResult`2", [TruthTable_$reflection(), SimulationError_$reflection()], FSharpResult$2, () => [[["ResultValue", TruthTable_$reflection()]], [["ErrorValue", SimulationError_$reflection()]]]))], ["TTConfig", TTType_$reflection()], ["RightPaneTabVisible", RightTab_$reflection()], ["SimSubTabVisible", SimSubTab_$reflection()], ["Hilighted", tuple_type(tuple_type(list_type(string_type), list_type(string_type)), list_type(string_type))], ["Clipboard", tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))], ["LastCreatedComponent", option_type(Component_$reflection())], ["SavedSheetIsOutOfDate", bool_type], ["CurrentProj", option_type(Project_$reflection())], ["PopupViewFunc", option_type(lambda_type(lambda_type(Msg_$reflection(), unit_type), lambda_type(Model_$reflection(), class_type("Fable.React.ReactElement"))))], ["SpinnerPayload", option_type(SpinPayload_$reflection())], ["PopupDialogData", PopupDialogData_$reflection()], ["Notifications", Notifications_$reflection()], ["TopMenuOpenState", TopMenu_$reflection()], ["DividerDragMode", DragMode_$reflection()], ["WaveSimViewerWidth", int32_type], ["ConnsOfSelectedWavesAreHighlighted", bool_type], ["Pending", list_type(Msg_$reflection())], ["UIState", option_type(UICommandType_$reflection())], ["BuildVisible", bool_type], ["DrawBlockTestState", option_type(TestState_$reflection())]]);
}

export const Constants_initialWaveformColWidth = ((((650 - 20) - 20) - 20) - 130) - 100;

export const text_ = [(a) => a.Text, (s) => ((a_1) => (new PopupDialogData(s, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const int_ = [(a) => a.Int, (s) => ((a_1) => (new PopupDialogData(a_1.Text, s, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const importDecisions_ = [(a) => a.ImportDecisions, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, s, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const int2_ = [(a) => a.Int2, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, s, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const projectPath_ = [(a) => a.ProjectPath, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, s, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const memorySetup_ = [(a) => a.MemorySetup, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, s, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const memoryEditorData_ = [(a) => a.MemoryEditorData, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, s, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const progress_ = [(a) => a.Progress, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, s, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const constraintTypeSel_ = [(a) => a.ConstraintTypeSel, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, s, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const constraintIOSel_ = [(a) => a.ConstraintIOSel, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, s, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const constraintErrorMsg_ = [(a) => a.ConstraintErrorMsg, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, s, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const newConstraint_ = [(a) => a.NewConstraint, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, s, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const algebraInputs_ = [(a) => a.AlgebraInputs, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, s, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const algebraError_ = [(a) => a.AlgebraError, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, s, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const verilogCode_ = [(a) => a.VerilogCode, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, s, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const verilogErrors_ = [(a) => a.VerilogErrors, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, s, a_1.BadLabel, a_1.IntList, a_1.IntList2)))];

export const badLabel_ = [(a) => a.BadLabel, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, s, a_1.IntList, a_1.IntList2)))];

export const intlist_ = [(a) => a.IntList, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, s, a_1.IntList2)))];

export const intlist2_ = [(a) => a.IntList2, (s) => ((a_1) => (new PopupDialogData(a_1.Text, a_1.Int, a_1.ImportDecisions, a_1.Int2, a_1.ProjectPath, a_1.MemorySetup, a_1.MemoryEditorData, a_1.Progress, a_1.ConstraintTypeSel, a_1.ConstraintIOSel, a_1.ConstraintErrorMsg, a_1.NewConstraint, a_1.AlgebraInputs, a_1.AlgebraError, a_1.VerilogCode, a_1.VerilogErrors, a_1.BadLabel, a_1.IntList, s)))];

export const fromDiagram_ = [(n) => n.FromDiagram, (s) => ((n_1) => (new Notifications(s, n_1.FromSimulation, n_1.FromWaveSim, n_1.FromFiles, n_1.FromMemoryEditor, n_1.FromProperties)))];

export const fromSimulation_ = [(n) => n.FromSimulation, (s) => ((n_1) => (new Notifications(n_1.FromDiagram, s, n_1.FromWaveSim, n_1.FromFiles, n_1.FromMemoryEditor, n_1.FromProperties)))];

export const fromWaveSim_ = [(n) => n.FromWaveSim, (s) => ((n_1) => (new Notifications(n_1.FromDiagram, n_1.FromSimulation, s, n_1.FromFiles, n_1.FromMemoryEditor, n_1.FromProperties)))];

export const fromFiles_ = [(n) => n.FromFiles, (s) => ((n_1) => (new Notifications(n_1.FromDiagram, n_1.FromSimulation, n_1.FromWaveSim, s, n_1.FromMemoryEditor, n_1.FromProperties)))];

export const fromMemoryEditor_ = [(n) => n.FromMemoryEditor, (s) => ((n_1) => (new Notifications(n_1.FromDiagram, n_1.FromSimulation, n_1.FromWaveSim, n_1.FromFiles, s, n_1.FromProperties)))];

export const fromProperties_ = [(n) => n.FromProperties, (s) => ((n_1) => (new Notifications(n_1.FromDiagram, n_1.FromSimulation, n_1.FromWaveSim, n_1.FromFiles, n_1.FromMemoryEditor, s)))];

export const gridStyles_ = [(a) => a.GridStyles, (s) => ((a_1) => (new TTType(a_1.BitLimit, a_1.InputConstraints, a_1.OutputConstraints, a_1.HiddenColumns, a_1.SortType, a_1.IOOrder, s, a_1.GridCache, a_1.AlgebraIns)))];

export const ioOrder_ = [(a) => a.IOOrder, (s) => ((a_1) => (new TTType(a_1.BitLimit, a_1.InputConstraints, a_1.OutputConstraints, a_1.HiddenColumns, a_1.SortType, s, a_1.GridStyles, a_1.GridCache, a_1.AlgebraIns)))];

export const inputConstraints_ = [(a) => a.InputConstraints, (s) => ((a_1) => (new TTType(a_1.BitLimit, s, a_1.OutputConstraints, a_1.HiddenColumns, a_1.SortType, a_1.IOOrder, a_1.GridStyles, a_1.GridCache, a_1.AlgebraIns)))];

export const outputConstraints_ = [(a) => a.OutputConstraints, (s) => ((a_1) => (new TTType(a_1.BitLimit, a_1.InputConstraints, s, a_1.HiddenColumns, a_1.SortType, a_1.IOOrder, a_1.GridStyles, a_1.GridCache, a_1.AlgebraIns)))];

export const hiddenColumns_ = [(a) => a.HiddenColumns, (s) => ((a_1) => (new TTType(a_1.BitLimit, a_1.InputConstraints, a_1.OutputConstraints, s, a_1.SortType, a_1.IOOrder, a_1.GridStyles, a_1.GridCache, a_1.AlgebraIns)))];

export const sortType_ = [(a) => a.SortType, (s) => ((a_1) => (new TTType(a_1.BitLimit, a_1.InputConstraints, a_1.OutputConstraints, a_1.HiddenColumns, s, a_1.IOOrder, a_1.GridStyles, a_1.GridCache, a_1.AlgebraIns)))];

export const algebraIns_ = [(a) => a.AlgebraIns, (s) => ((a_1) => (new TTType(a_1.BitLimit, a_1.InputConstraints, a_1.OutputConstraints, a_1.HiddenColumns, a_1.SortType, a_1.IOOrder, a_1.GridStyles, a_1.GridCache, s)))];

export const gridCache_ = [(a) => a.GridCache, (s) => ((a_1) => (new TTType(a_1.BitLimit, a_1.InputConstraints, a_1.OutputConstraints, a_1.HiddenColumns, a_1.SortType, a_1.IOOrder, a_1.GridStyles, s, a_1.AlgebraIns)))];

export function Model__get_WaveSimOrCurrentSheet(this$) {
    const matchValue = this$.WaveSimSheet;
    const matchValue_1 = this$.CurrentProj;
    if (matchValue != null) {
        const name_1 = matchValue;
        return name_1;
    }
    else if (matchValue_1 == null) {
        return toFail(printf("What? Project is not open cannot guess sheet!"));
    }
    else {
        const name = matchValue_1.OpenFileName;
        return name;
    }
}

export const waveSimSheet_ = [(a) => a.WaveSimSheet, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, s, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const waveSim_ = [(a) => a.WaveSim, (s) => ((a_1) => (new Model(a_1.UserData, s, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const rightPaneTabVisible_ = [(a) => a.RightPaneTabVisible, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, s, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const simSubTabVisible_ = [(a) => a.SimSubTabVisible, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, s, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const buildVisible_ = [(a) => a.BuildVisible, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, s, a_1.DrawBlockTestState)))];

export const popupViewFunc_ = [(a) => map(curry2, a.PopupViewFunc), (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, map(uncurry2, s), a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const sheet_ = [(a) => a.Sheet, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, s, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const tTType_ = [(a) => a.TTConfig, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, s, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const currentStepSimulationStep_ = [(a) => a.CurrentStepSimulationStep, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, s, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const currentTruthTable_ = [(a) => a.CurrentTruthTable, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, s, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const popupDialogData_ = [(a) => a.PopupDialogData, (p) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, p, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const selectedComponent_ = [(a) => a.SelectedComponent, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, s, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const userData_ = [(a) => a.UserData, (s) => ((a_1) => (new Model(s, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const uISheetTrail_ = [(a) => a.UISheetTrail, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, s, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const drawBlockTestState_ = [(a) => a.DrawBlockTestState, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, s)))];

export const currentProj_ = [(a) => a.CurrentProj, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, s, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const openLoadedComponentOfModel_ = (() => {
    const p = Compose_Lens_op_GreaterMinusGreater_Z335E5A0C(new Compose_Lens(), Optics_Option_value_())(currentProj_);
    return Compose_Prism_op_GreaterQmarkGreater_507FA136(new Compose_Prism(), openLoadedComponent_)(p);
})();

export const notifications_ = [(a) => a.Notifications, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, a_1.CurrentProj, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, s, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const project_ = [(a) => value(a.CurrentProj), (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, s, a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const projectOpt_ = [(a) => a.CurrentProj, (s) => ((a_1) => (new Model(a_1.UserData, a_1.WaveSim, a_1.WaveSimSheet, a_1.UISheetTrail, a_1.Spinner, a_1.Sheet, a_1.IsLoading, a_1.LastChangeCheckTime, a_1.LastSimulatedCanvasState, a_1.LastDetailedSavedState, a_1.CurrentSelected, a_1.LastSelectedIds, a_1.LastUsedDialogWidth, a_1.SelectedComponent, a_1.CurrentStepSimulationStep, a_1.CurrentTruthTable, a_1.TTConfig, a_1.RightPaneTabVisible, a_1.SimSubTabVisible, a_1.Hilighted, a_1.Clipboard, a_1.LastCreatedComponent, a_1.SavedSheetIsOutOfDate, map((_arg) => s, a_1.CurrentProj), a_1.PopupViewFunc, a_1.SpinnerPayload, a_1.PopupDialogData, a_1.Notifications, a_1.TopMenuOpenState, a_1.DividerDragMode, a_1.WaveSimViewerWidth, a_1.ConnsOfSelectedWavesAreHighlighted, a_1.Pending, a_1.UIState, a_1.BuildVisible, a_1.DrawBlockTestState)))];

export const ldcM = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), loadedComponents_)(project_);

export const ldcOptM = Compose_Prism_op_GreaterQmarkGreater_507FA136(new Compose_Prism(), loadedComponents_)(projectOpt_);

export const nameM = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), openFileName_)(project_);

export const nameOptM = Compose_Prism_op_GreaterQmarkGreater_507FA136(new Compose_Prism(), openFileName_)(projectOpt_);

//# sourceMappingURL=ModelType.fs.js.map
