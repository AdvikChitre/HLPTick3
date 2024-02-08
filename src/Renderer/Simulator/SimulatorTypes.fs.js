import { toString as toString_1, FSharpException, Record, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { bigint_type, bool_type, record_type, option_type, array_type, tuple_type, class_type, list_type, int32_type, string_type, uint32_type, union_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { LoadedComponent_$reflection, Component_$reflection, Connection_$reflection, WaveIndexT_$reflection, WidthInferError_$reflection, Port_$reflection, PortType_$reflection, NumberBase_$reflection, ComponentType_$reflection, Memory1_$reflection } from "../Common/CommonTypes.fs.js";
import { map as map_4, defaultArg, value as value_3 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { interpolate, toConsole, endsWith, join, toFail, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { length, collect, mapIndexed, empty, cons, reverse, head, tail, singleton, map as map_1, append, fold, isEmpty } from "../fable_modules/fable-library.4.1.4/List.js";
import { compare, numberHash, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { List_except } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { toArray, initialize as initialize_1, reduce, map as map_2, delay, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { fromUInt32, fromBigInt, toUInt64, fromUInt64, toInt64, fromZero, compare as compare_1, op_RightShift, toUInt32, op_BitwiseAnd, equals as equals_1, op_Addition, fromInt32, fromOne, op_LeftShift, op_Subtraction, toString } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { toArray as toArray_1, values, keys, tryPick, toList as toList_1, empty as empty_1, add, tryFind } from "../fable_modules/fable-library.4.1.4/Map.js";
import { map as map_3, copy, append as append_1, initialize } from "../fable_modules/fable-library.4.1.4/Array.js";
import { StringModule_SubstringLength } from "../Common/EEExtensions.fs.js";
import { sprintInitial } from "../Common/Helpers.fs.js";

export class SimulationRunStatus extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SimEmpty", "SimOutOfDate", "SimValidSameSheet", "SimValidDifferentSheet", "SimNoProject"];
    }
}

export function SimulationRunStatus_$reflection() {
    return union_type("SimulatorTypes.SimulationRunStatus", [], SimulationRunStatus, () => [[], [], [], [], []]);
}

export class Bit extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Zero", "One"];
    }
}

export function Bit_$reflection() {
    return union_type("SimulatorTypes.Bit", [], Bit, () => [[], []]);
}

export class SimulationComponentState extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NoState", "DffState", "RegisterState", "RamState"];
    }
}

export function SimulationComponentState_$reflection() {
    return union_type("SimulatorTypes.SimulationComponentState", [], SimulationComponentState, () => [[], [["Item", uint32_type]], [["Item", FastData_$reflection()]], [["Item", Memory1_$reflection()]]]);
}

export class IsClockTick extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["No", "Yes"];
    }
}

export function IsClockTick_$reflection() {
    return union_type("SimulatorTypes.IsClockTick", [], IsClockTick, () => [[], [["Item", SimulationComponentState_$reflection()]]]);
}

export class SimulationComponent extends Record {
    constructor(Id, Type, Label, Inputs, Outputs, OutputWidths, CustomSimulationGraph, State) {
        super();
        this.Id = Id;
        this.Type = Type;
        this.Label = Label;
        this.Inputs = Inputs;
        this.Outputs = Outputs;
        this.OutputWidths = OutputWidths;
        this.CustomSimulationGraph = CustomSimulationGraph;
        this.State = State;
    }
}

export function SimulationComponent_$reflection() {
    return record_type("SimulatorTypes.SimulationComponent", [], SimulationComponent, () => [["Id", string_type], ["Type", ComponentType_$reflection()], ["Label", string_type], ["Inputs", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [int32_type, list_type(Bit_$reflection())])], ["Outputs", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [int32_type, list_type(tuple_type(string_type, int32_type))])], ["OutputWidths", array_type(int32_type)], ["CustomSimulationGraph", option_type(class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, SimulationComponent_$reflection()]))], ["State", SimulationComponentState_$reflection()]]);
}

export class ReducerInput extends Record {
    constructor(Inputs, CustomSimulationGraph, IsClockTick) {
        super();
        this.Inputs = Inputs;
        this.CustomSimulationGraph = CustomSimulationGraph;
        this.IsClockTick = IsClockTick;
    }
}

export function ReducerInput_$reflection() {
    return record_type("SimulatorTypes.ReducerInput", [], ReducerInput, () => [["Inputs", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [int32_type, list_type(Bit_$reflection())])], ["CustomSimulationGraph", option_type(class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, SimulationComponent_$reflection()]))], ["IsClockTick", IsClockTick_$reflection()]]);
}

export class ReducerOutput extends Record {
    constructor(Outputs, NewCustomSimulationGraph, NewState) {
        super();
        this.Outputs = Outputs;
        this.NewCustomSimulationGraph = NewCustomSimulationGraph;
        this.NewState = NewState;
    }
}

export function ReducerOutput_$reflection() {
    return record_type("SimulatorTypes.ReducerOutput", [], ReducerOutput, () => [["Outputs", option_type(class_type("Microsoft.FSharp.Collections.FSharpMap`2", [int32_type, list_type(Bit_$reflection())]))], ["NewCustomSimulationGraph", option_type(class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, SimulationComponent_$reflection()]))], ["NewState", SimulationComponentState_$reflection()]]);
}

export class OutputChange extends Record {
    constructor(CComp, COutputs) {
        super();
        this.CComp = CComp;
        this.COutputs = COutputs;
    }
}

export function OutputChange_$reflection() {
    return record_type("SimulatorTypes.OutputChange", [], OutputChange, () => [["CComp", SimulationComponent_$reflection()], ["COutputs", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [int32_type, list_type(Bit_$reflection())])]]);
}

export class SimulationData extends Record {
    constructor(FastSim, Graph, Inputs, Outputs, IsSynchronous, NumberBase, ClockTickNumber) {
        super();
        this.FastSim = FastSim;
        this.Graph = Graph;
        this.Inputs = Inputs;
        this.Outputs = Outputs;
        this.IsSynchronous = IsSynchronous;
        this.NumberBase = NumberBase;
        this.ClockTickNumber = (ClockTickNumber | 0);
    }
}

export function SimulationData_$reflection() {
    return record_type("SimulatorTypes.SimulationData", [], SimulationData, () => [["FastSim", FastSimulation_$reflection()], ["Graph", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, SimulationComponent_$reflection()])], ["Inputs", list_type(tuple_type(string_type, string_type, int32_type))], ["Outputs", list_type(tuple_type(string_type, string_type, int32_type))], ["IsSynchronous", bool_type], ["NumberBase", NumberBase_$reflection()], ["ClockTickNumber", int32_type]]);
}

export class SimulationErrorType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["PortNumMissing", "WrongPortType", "ConnTypeHasNum", "LabelConnect", "LabelDuplicate", "WidthMismatch", "InferConnWidths", "BadName", "MissingSheet", "InPortMismatch", "OutPortMismatch", "InputConnError", "OutputConnError", "LabelConnError", "CycleDetected", "AlgInpNotAllowed", "DependencyNotFound", "WrongSelection", "UnnecessaryNC", "InternalError", "GenericSimError"];
    }
}

export function SimulationErrorType_$reflection() {
    return union_type("SimulatorTypes.SimulationErrorType", [], SimulationErrorType, () => [[["Item", PortType_$reflection()]], [["Item1", PortType_$reflection()], ["Item2", Port_$reflection()]], [["Item1", PortType_$reflection()], ["Item2", int32_type]], [], [["Item1", string_type], ["Item2", string_type]], [["Item", WidthInferError_$reflection()]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item1", string_type], ["Item2", string_type], ["Item3", string_type]], [["Item1", string_type], ["Item2", string_type], ["Item3", string_type]], [["Item1", int32_type], ["Item2", Port_$reflection()], ["Item3", PortRmInfo_$reflection()]], [["Item1", int32_type], ["Item2", Port_$reflection()], ["Item3", PortRmInfo_$reflection()]], [["Item", int32_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [], [["Item", class_type("System.Exception")]], [["Item", string_type]]]);
}

export class SimulationError extends Record {
    constructor(ErrType, InDependency, ComponentsAffected, ConnectionsAffected) {
        super();
        this.ErrType = ErrType;
        this.InDependency = InDependency;
        this.ComponentsAffected = ComponentsAffected;
        this.ConnectionsAffected = ConnectionsAffected;
    }
}

export function SimulationError_$reflection() {
    return record_type("SimulatorTypes.SimulationError", [], SimulationError, () => [["ErrType", SimulationErrorType_$reflection()], ["InDependency", option_type(string_type)], ["ComponentsAffected", list_type(string_type)], ["ConnectionsAffected", list_type(string_type)]]);
}

export class PortRmInfo extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Unremovable", "Removable"];
    }
}

export function PortRmInfo_$reflection() {
    return union_type("SimulatorTypes.PortRmInfo", [], PortRmInfo, () => [[], [["Item", ComponentType_$reflection()]]]);
}

export class FastBits extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Word", "BigWord"];
    }
}

export function FastBits_$reflection() {
    return union_type("SimulatorTypes.FastBits", [], FastBits, () => [[["dat", uint32_type]], [["dat", bigint_type]]]);
}

export class FastData extends Record {
    constructor(Dat, Width) {
        super();
        this.Dat = Dat;
        this.Width = (Width | 0);
    }
}

export function FastData_$reflection() {
    return record_type("SimulatorTypes.FastData", [], FastData, () => [["Dat", FastBits_$reflection()], ["Width", int32_type]]);
}

export class BinaryOp extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["AddOp", "SubOp", "BitAndOp", "BitOrOp", "BitXorOp"];
    }
}

export function BinaryOp_$reflection() {
    return union_type("SimulatorTypes.BinaryOp", [], BinaryOp, () => [[], [], [], [], []]);
}

export class UnaryOp extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NegOp", "NotOp", "BitRangeOp", "CarryOfOp"];
    }
}

export function UnaryOp_$reflection() {
    return union_type("SimulatorTypes.UnaryOp", [], UnaryOp, () => [[], [], [["Lower", int32_type], ["Upper", int32_type]], []]);
}

export class ComparisonOp extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["Equals"];
    }
}

export function ComparisonOp_$reflection() {
    return union_type("SimulatorTypes.ComparisonOp", [], ComparisonOp, () => [[]]);
}

export class FastAlgExp extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SingleTerm", "DataLiteral", "UnaryExp", "BinaryExp", "ComparisonExp", "AppendExp"];
    }
}

export function FastAlgExp_$reflection() {
    return union_type("SimulatorTypes.FastAlgExp", [], FastAlgExp, () => [[["Item", tuple_type(string_type, string_type, int32_type)]], [["Item", FastData_$reflection()]], [["Op", UnaryOp_$reflection()], ["Exp", FastAlgExp_$reflection()]], [["Exp1", FastAlgExp_$reflection()], ["Op", BinaryOp_$reflection()], ["Exp2", FastAlgExp_$reflection()]], [["Exp", FastAlgExp_$reflection()], ["Op", ComparisonOp_$reflection()], ["Item3", uint32_type]], [["Item", list_type(FastAlgExp_$reflection())]]]);
}

export class AlgebraNotImplemented extends FSharpException {
    constructor(Data0) {
        super();
        this.Data0 = Data0;
    }
}

export function AlgebraNotImplemented_$reflection() {
    return class_type("SimulatorTypes.AlgebraNotImplemented", void 0, AlgebraNotImplemented, class_type("System.Exception"));
}

export class FSInterface extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["IData", "IAlg"];
    }
}

export function FSInterface_$reflection() {
    return union_type("SimulatorTypes.FSInterface", [], FSInterface, () => [[["Item", FastData_$reflection()]], [["Item", FastAlgExp_$reflection()]]]);
}

export class FData extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Data", "Alg"];
    }
}

export function FData_$reflection() {
    return union_type("SimulatorTypes.FData", [], FData, () => [[["Item", FastData_$reflection()]], [["Item", FastAlgExp_$reflection()]]]);
}

export class StepArray$1 extends Record {
    constructor(Step, Index) {
        super();
        this.Step = Step;
        this.Index = (Index | 0);
    }
}

export function StepArray$1_$reflection(gen0) {
    return record_type("SimulatorTypes.StepArray`1", [gen0], StepArray$1, () => [["Step", array_type(gen0)], ["Index", int32_type]]);
}

export class IOArray extends Record {
    constructor(FDataStep, UInt32Step, BigIntStep, Width, Index) {
        super();
        this.FDataStep = FDataStep;
        this.UInt32Step = UInt32Step;
        this.BigIntStep = BigIntStep;
        this.Width = (Width | 0);
        this.Index = (Index | 0);
    }
}

export function IOArray_$reflection() {
    return record_type("SimulatorTypes.IOArray", [], IOArray, () => [["FDataStep", array_type(FData_$reflection())], ["UInt32Step", array_type(uint32_type)], ["BigIntStep", array_type(bigint_type)], ["Width", int32_type], ["Index", int32_type]]);
}

export class BigIntState extends Record {
    constructor(InputIsBigInt, OutputIsBigInt) {
        super();
        this.InputIsBigInt = InputIsBigInt;
        this.OutputIsBigInt = OutputIsBigInt;
    }
}

export function BigIntState_$reflection() {
    return record_type("SimulatorTypes.BigIntState", [], BigIntState, () => [["InputIsBigInt", array_type(bool_type)], ["OutputIsBigInt", array_type(bool_type)]]);
}

export class FastComponent extends Record {
    constructor(fId, cId, FType, State, Active, UseBigInt, BigIntState, InputLinks, InputDrivers, Outputs, SimComponent, AccessPath, FullName, FLabel, SheetName, Touched, DrivenComponents, NumMissingInputValues, VerilogOutputName, VerilogComponentName) {
        super();
        this.fId = fId;
        this.cId = cId;
        this.FType = FType;
        this.State = State;
        this.Active = Active;
        this.UseBigInt = UseBigInt;
        this.BigIntState = BigIntState;
        this.InputLinks = InputLinks;
        this.InputDrivers = InputDrivers;
        this.Outputs = Outputs;
        this.SimComponent = SimComponent;
        this.AccessPath = AccessPath;
        this.FullName = FullName;
        this.FLabel = FLabel;
        this.SheetName = SheetName;
        this.Touched = Touched;
        this.DrivenComponents = DrivenComponents;
        this.NumMissingInputValues = (NumMissingInputValues | 0);
        this.VerilogOutputName = VerilogOutputName;
        this.VerilogComponentName = VerilogComponentName;
    }
}

export function FastComponent_$reflection() {
    return record_type("SimulatorTypes.FastComponent", [], FastComponent, () => [["fId", tuple_type(string_type, list_type(string_type))], ["cId", string_type], ["FType", ComponentType_$reflection()], ["State", option_type(StepArray$1_$reflection(SimulationComponentState_$reflection()))], ["Active", bool_type], ["UseBigInt", bool_type], ["BigIntState", option_type(BigIntState_$reflection())], ["InputLinks", array_type(IOArray_$reflection())], ["InputDrivers", array_type(option_type(tuple_type(tuple_type(string_type, list_type(string_type)), int32_type)))], ["Outputs", array_type(IOArray_$reflection())], ["SimComponent", SimulationComponent_$reflection()], ["AccessPath", list_type(string_type)], ["FullName", string_type], ["FLabel", string_type], ["SheetName", list_type(string_type)], ["Touched", bool_type], ["DrivenComponents", list_type(FastComponent_$reflection())], ["NumMissingInputValues", int32_type], ["VerilogOutputName", array_type(string_type)], ["VerilogComponentName", string_type]]);
}

export class Driver extends Record {
    constructor(Index, DriverWidth, DriverData) {
        super();
        this.Index = (Index | 0);
        this.DriverWidth = (DriverWidth | 0);
        this.DriverData = DriverData;
    }
}

export function Driver_$reflection() {
    return record_type("SimulatorTypes.Driver", [], Driver, () => [["Index", int32_type], ["DriverWidth", int32_type], ["DriverData", IOArray_$reflection()]]);
}

export class SheetPort extends Record {
    constructor(Sheet, PortOnComp) {
        super();
        this.Sheet = Sheet;
        this.PortOnComp = PortOnComp;
    }
}

export function SheetPort_$reflection() {
    return record_type("SimulatorTypes.SheetPort", [], SheetPort, () => [["Sheet", string_type], ["PortOnComp", Port_$reflection()]]);
}

export class FastSimulation extends Record {
    constructor(ClockTick, MaxArraySize, FGlobalInputComps, FConstantComps, FClockedComps, FOrderedComps, FIOActive, FIOLinks, FComps, FCustomComps, WaveComps, FSComps, FCustomOutputCompLookup, G, NumStepArrays, Drivers, WaveIndex, ConnectionsByPort, ComponentsById, SimulatedCanvasState, SimulatedTopSheet) {
        super();
        this.ClockTick = (ClockTick | 0);
        this.MaxArraySize = (MaxArraySize | 0);
        this.FGlobalInputComps = FGlobalInputComps;
        this.FConstantComps = FConstantComps;
        this.FClockedComps = FClockedComps;
        this.FOrderedComps = FOrderedComps;
        this.FIOActive = FIOActive;
        this.FIOLinks = FIOLinks;
        this.FComps = FComps;
        this.FCustomComps = FCustomComps;
        this.WaveComps = WaveComps;
        this.FSComps = FSComps;
        this.FCustomOutputCompLookup = FCustomOutputCompLookup;
        this.G = G;
        this.NumStepArrays = (NumStepArrays | 0);
        this.Drivers = Drivers;
        this.WaveIndex = WaveIndex;
        this.ConnectionsByPort = ConnectionsByPort;
        this.ComponentsById = ComponentsById;
        this.SimulatedCanvasState = SimulatedCanvasState;
        this.SimulatedTopSheet = SimulatedTopSheet;
    }
}

export function FastSimulation_$reflection() {
    return record_type("SimulatorTypes.FastSimulation", [], FastSimulation, () => [["ClockTick", int32_type], ["MaxArraySize", int32_type], ["FGlobalInputComps", array_type(FastComponent_$reflection())], ["FConstantComps", array_type(FastComponent_$reflection())], ["FClockedComps", array_type(FastComponent_$reflection())], ["FOrderedComps", array_type(FastComponent_$reflection())], ["FIOActive", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(string_type, list_type(string_type)), FastComponent_$reflection()])], ["FIOLinks", list_type(tuple_type(tuple_type(FastComponent_$reflection(), int32_type), FastComponent_$reflection()))], ["FComps", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(string_type, list_type(string_type)), FastComponent_$reflection()])], ["FCustomComps", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(string_type, list_type(string_type)), FastComponent_$reflection()])], ["WaveComps", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(string_type, list_type(string_type)), FastComponent_$reflection()])], ["FSComps", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(string_type, list_type(string_type)), tuple_type(SimulationComponent_$reflection(), list_type(string_type))])], ["FCustomOutputCompLookup", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(tuple_type(string_type, list_type(string_type)), int32_type), tuple_type(string_type, list_type(string_type))])], ["G", GatherData_$reflection()], ["NumStepArrays", int32_type], ["Drivers", array_type(option_type(Driver_$reflection()))], ["WaveIndex", array_type(WaveIndexT_$reflection())], ["ConnectionsByPort", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [SheetPort_$reflection(), list_type(Connection_$reflection())])], ["ComponentsById", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, Component_$reflection()])])], ["SimulatedCanvasState", list_type(LoadedComponent_$reflection())], ["SimulatedTopSheet", string_type]]);
}

export class GatherTemp extends Record {
    constructor(CustomInputCompLinksT, CustomOutputCompLinksT, Labels, AllCompsT) {
        super();
        this.CustomInputCompLinksT = CustomInputCompLinksT;
        this.CustomOutputCompLinksT = CustomOutputCompLinksT;
        this.Labels = Labels;
        this.AllCompsT = AllCompsT;
    }
}

export function GatherTemp_$reflection() {
    return record_type("SimulatorTypes.GatherTemp", [], GatherTemp, () => [["CustomInputCompLinksT", list_type(tuple_type(tuple_type(tuple_type(string_type, list_type(string_type)), int32_type), tuple_type(string_type, list_type(string_type))))], ["CustomOutputCompLinksT", list_type(tuple_type(tuple_type(string_type, list_type(string_type)), tuple_type(tuple_type(string_type, list_type(string_type)), int32_type)))], ["Labels", list_type(tuple_type(string_type, string_type))], ["AllCompsT", list_type(tuple_type(tuple_type(string_type, list_type(string_type)), tuple_type(SimulationComponent_$reflection(), list_type(string_type))))]]);
}

export class GatherData extends Record {
    constructor(Simulation, CustomInputCompLinks, CustomOutputCompLinks, CustomOutputLookup, Labels, AllComps) {
        super();
        this.Simulation = Simulation;
        this.CustomInputCompLinks = CustomInputCompLinks;
        this.CustomOutputCompLinks = CustomOutputCompLinks;
        this.CustomOutputLookup = CustomOutputLookup;
        this.Labels = Labels;
        this.AllComps = AllComps;
    }
}

export function GatherData_$reflection() {
    return record_type("SimulatorTypes.GatherData", [], GatherData, () => [["Simulation", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, SimulationComponent_$reflection()])], ["CustomInputCompLinks", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(tuple_type(string_type, list_type(string_type)), int32_type), tuple_type(string_type, list_type(string_type))])], ["CustomOutputCompLinks", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(string_type, list_type(string_type)), tuple_type(tuple_type(string_type, list_type(string_type)), int32_type)])], ["CustomOutputLookup", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(tuple_type(string_type, list_type(string_type)), int32_type), tuple_type(string_type, list_type(string_type))])], ["Labels", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, string_type])], ["AllComps", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(string_type, list_type(string_type)), tuple_type(SimulationComponent_$reflection(), list_type(string_type))])]]);
}

export const graph_ = [(a) => a.Graph, (s) => ((a_1) => (new SimulationData(a_1.FastSim, s, a_1.Inputs, a_1.Outputs, a_1.IsSynchronous, a_1.NumberBase, a_1.ClockTickNumber)))];

export const fastSim_ = [(a) => a.FastSim, (s) => ((a_1) => (new SimulationData(s, a_1.Graph, a_1.Inputs, a_1.Outputs, a_1.IsSynchronous, a_1.NumberBase, a_1.ClockTickNumber)))];

export const numberBase_ = [(a) => a.NumberBase, (s) => ((a_1) => (new SimulationData(a_1.FastSim, a_1.Graph, a_1.Inputs, a_1.Outputs, a_1.IsSynchronous, s, a_1.ClockTickNumber)))];

export const clockTickNumber_ = [(a) => a.ClockTickNumber, (s) => ((a_1) => (new SimulationData(a_1.FastSim, a_1.Graph, a_1.Inputs, a_1.Outputs, a_1.IsSynchronous, a_1.NumberBase, s)))];

export function errMsg(errType) {
    switch (errType.tag) {
        case 1: {
            const port = errType.fields[1];
            const correctType_1 = errType.fields[0];
            const arg_2 = value_3(port.PortNumber) | 0;
            return toText(printf("%A port %d appears to be an %A port"))(correctType_1)(arg_2)(port.PortType);
        }
        case 2: {
            const portNum = errType.fields[1] | 0;
            const correctType_2 = errType.fields[0];
            return toText(printf("%A port appears to have a port number: %d"))(correctType_2)(portNum);
        }
        case 3:
            return toText(printf("You can\'t connect two Wire Labels with a wire. Delete the connecting wire. If you want to join two bus labels you need only give them the same name - then they will form a single net."));
        case 4: {
            const ioType = errType.fields[0];
            const compLabel = errType.fields[1];
            return toText(printf("Two %s components cannot have the same label: %s."))(ioType)(compLabel);
        }
        case 5: {
            const err = errType.fields[0];
            return err.Msg;
        }
        case 6: {
            const msg = errType.fields[0];
            return msg;
        }
        case 7: {
            const msg_1 = errType.fields[0];
            return msg_1;
        }
        case 8: {
            const compName = errType.fields[0];
            return toText(printf("Can\'t find a design sheet named %s for the custom component of this name"))(compName);
        }
        case 9: {
            const instIns = errType.fields[1];
            const compName_1 = errType.fields[0];
            const compIns = errType.fields[2];
            return toText(printf("Sheet %s is used as a custom component. Instance In ports: %A are different from Component In ports: %A."))(compName_1)(instIns)(compIns);
        }
        case 10: {
            const instOuts = errType.fields[1];
            const compOuts = errType.fields[2];
            const compName_2 = errType.fields[0];
            return toText(printf("Sheet %s is used as a custom component. Instance Out ports: %A are different from Component Out ports: %A."))(compName_2)(instOuts)(compOuts);
        }
        case 11: {
            const rmInfo = errType.fields[2];
            const count = errType.fields[0] | 0;
            if (count === 0) {
                if (rmInfo.tag === 0) {
                    return "Every component input port must be connected: but no connection was found Please connect this input port to the output of another component or an input component.";
                }
                else {
                    return "Every component input port must be connected: but no connection was found";
                }
            }
            else {
                return toText(printf("A component input port must have precisely one driving component, but %d were found. If you want to merge wires together use a MergeWires component, not direct connection."))(count);
            }
        }
        case 12: {
            const count_1 = errType.fields[0] | 0;
            if (count_1 === 0) {
                return "A component output port must have at least one connection. If the component output is meant to be disconnected you can add a \"Not Connected\" component to stop this error";
            }
            else {
                return toText(printf("%d"))(count_1);
            }
        }
        case 13: {
            const count_2 = errType.fields[0] | 0;
            if (count_2 === 0) {
                return "A set of labelled wires must be driven (on the input of one of the labels): but no such driver was found";
            }
            else {
                return toText(printf("A set of labelled wires must have precisely one driving component, but %d were found. If you are driving two labels from the same component delete one of them: a set of labels with the same name are all connected together and only one label in each same-name set must be driven."))(count_2);
            }
        }
        case 14: {
            const msg_2 = errType.fields[0];
            return msg_2;
        }
        case 15: {
            const msg_3 = errType.fields[0];
            return msg_3;
        }
        case 16: {
            const depName = errType.fields[0];
            return toText(printf("Could not resolve dependency: \"%s\". Make sure a dependency with such name exists in the current project."))(depName);
        }
        case 17: {
            const msg_4 = errType.fields[0];
            return msg_4;
        }
        case 18:
            return "Unnecessary \'Not Connected\' components at adder COUTs";
        case 19: {
            const e = errType.fields[0];
            const arg_19 = e.message;
            const arg_20 = e.stack;
            return toText(printf("\nInternal ERROR in Issie fast simulation: %A\n\n%A\n"))(arg_19)(arg_20);
        }
        case 20: {
            const msg_5 = errType.fields[0];
            return msg_5;
        }
        default: {
            const correctType = errType.fields[0];
            return toText(printf("%A port appears to have no port number"))(correctType);
        }
    }
}

/**
 * Calculates and returns the expected width of an Algebraic Expression
 */
export function getAlgExpWidth(exp_mut) {
    getAlgExpWidth:
    while (true) {
        const exp = exp_mut;
        switch (exp.tag) {
            case 1: {
                const d = exp.fields[0];
                return d.Width | 0;
            }
            case 2:
                switch (exp.fields[0].tag) {
                    case 2: {
                        const l = exp.fields[0].fields[0] | 0;
                        const u = exp.fields[0].fields[1] | 0;
                        return ((u - l) + 1) | 0;
                    }
                    case 3:
                        return 1;
                    default: {
                        const exp_1 = exp.fields[1];
                        exp_mut = exp_1;
                        continue getAlgExpWidth;
                    }
                }
            case 3: {
                const exp1 = exp.fields[0];
                const exp2 = exp.fields[2];
                const w1 = getAlgExpWidth(exp1) | 0;
                const w2 = getAlgExpWidth(exp2) | 0;
                if (w1 > w2) {
                    return w1 | 0;
                }
                else {
                    return w2 | 0;
                }
            }
            case 4:
                return 1;
            case 5: {
                const exps = exp.fields[0];
                if (isEmpty(exps)) {
                    return toFail(printf("what? List in AppendExp is empty")) | 0;
                }
                else {
                    return fold((w_1, exp_2) => (w_1 + getAlgExpWidth(exp_2)), 0, exps) | 0;
                }
            }
            default: {
                const w = exp.fields[0][2] | 0;
                return w | 0;
            }
        }
        break;
    }
}

export function flattenNestedArithmetic(exp_mut) {
    flattenNestedArithmetic:
    while (true) {
        const exp = exp_mut;
        const multiplyByMinusOne = (exp_1) => {
            let matchResult, e, e_1;
            if (exp_1.tag === 2) {
                if (exp_1.fields[0].tag === 0) {
                    matchResult = 0;
                    e = exp_1.fields[1];
                }
                else {
                    matchResult = 1;
                    e_1 = exp_1;
                }
            }
            else {
                matchResult = 1;
                e_1 = exp_1;
            }
            switch (matchResult) {
                case 0:
                    return e;
                default:
                    return new FastAlgExp(2, [new UnaryOp(0, []), e_1]);
            }
        };
        let matchResult_1, left, right, left_1, right_1, e_2;
        switch (exp.tag) {
            case 3: {
                switch (exp.fields[1].tag) {
                    case 0: {
                        matchResult_1 = 0;
                        left = exp.fields[0];
                        right = exp.fields[2];
                        break;
                    }
                    case 1: {
                        matchResult_1 = 1;
                        left_1 = exp.fields[0];
                        right_1 = exp.fields[2];
                        break;
                    }
                    default:
                        matchResult_1 = 3;
                }
                break;
            }
            case 2: {
                if (exp.fields[0].tag === 1) {
                    matchResult_1 = 2;
                    e_2 = exp.fields[1];
                }
                else {
                    matchResult_1 = 3;
                }
                break;
            }
            default:
                matchResult_1 = 3;
        }
        switch (matchResult_1) {
            case 0:
                return append(flattenNestedArithmetic(left), flattenNestedArithmetic(right));
            case 1: {
                const rhs = map_1(multiplyByMinusOne, flattenNestedArithmetic(right_1));
                return append(flattenNestedArithmetic(left_1), rhs);
            }
            case 2: {
                const w = getAlgExpWidth(e_2) | 0;
                const minusOne = new FastAlgExp(2, [new UnaryOp(0, []), new FastAlgExp(1, [new FastData(new FastBits(0, [1]), w)])]);
                exp_mut = (new FastAlgExp(3, [minusOne, new BinaryOp(1, []), e_2]));
                continue flattenNestedArithmetic;
            }
            default:
                return singleton(exp);
        }
        break;
    }
}

export function assembleArithmetic(width, expLst) {
    const assemble = (stateExp, currentExp) => {
        let matchResult, e;
        if (currentExp.tag === 2) {
            if (currentExp.fields[0].tag === 0) {
                matchResult = 0;
                e = currentExp.fields[1];
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
                return new FastAlgExp(3, [stateExp, new BinaryOp(1, []), e]);
            default:
                return new FastAlgExp(3, [stateExp, new BinaryOp(0, []), currentExp]);
        }
    };
    let matchResult_1, exp, exp_1, expN, exp1, exp2, exp_2, expN_1, tl, exp1_1, exp2_1, tl_1;
    if (!isEmpty(expLst)) {
        if (!isEmpty(tail(expLst))) {
            if (isEmpty(tail(tail(expLst)))) {
                if (head(expLst).tag === 2) {
                    if (head(expLst).fields[0].tag === 0) {
                        matchResult_1 = 2;
                        exp_1 = head(tail(expLst));
                        expN = head(expLst).fields[1];
                    }
                    else if (head(tail(expLst)).tag === 2) {
                        if (head(tail(expLst)).fields[0].tag === 0) {
                            matchResult_1 = 2;
                            exp_1 = head(expLst);
                            expN = head(tail(expLst)).fields[1];
                        }
                        else {
                            matchResult_1 = 3;
                            exp1 = head(expLst);
                            exp2 = head(tail(expLst));
                        }
                    }
                    else {
                        matchResult_1 = 3;
                        exp1 = head(expLst);
                        exp2 = head(tail(expLst));
                    }
                }
                else if (head(tail(expLst)).tag === 2) {
                    if (head(tail(expLst)).fields[0].tag === 0) {
                        matchResult_1 = 2;
                        exp_1 = head(expLst);
                        expN = head(tail(expLst)).fields[1];
                    }
                    else {
                        matchResult_1 = 3;
                        exp1 = head(expLst);
                        exp2 = head(tail(expLst));
                    }
                }
                else {
                    matchResult_1 = 3;
                    exp1 = head(expLst);
                    exp2 = head(tail(expLst));
                }
            }
            else if (head(expLst).tag === 2) {
                if (head(expLst).fields[0].tag === 0) {
                    matchResult_1 = 4;
                    exp_2 = head(tail(expLst));
                    expN_1 = head(expLst).fields[1];
                    tl = tail(tail(expLst));
                }
                else if (head(tail(expLst)).tag === 2) {
                    if (head(tail(expLst)).fields[0].tag === 0) {
                        matchResult_1 = 4;
                        exp_2 = head(expLst);
                        expN_1 = head(tail(expLst)).fields[1];
                        tl = tail(tail(expLst));
                    }
                    else {
                        matchResult_1 = 5;
                        exp1_1 = head(expLst);
                        exp2_1 = head(tail(expLst));
                        tl_1 = tail(tail(expLst));
                    }
                }
                else {
                    matchResult_1 = 5;
                    exp1_1 = head(expLst);
                    exp2_1 = head(tail(expLst));
                    tl_1 = tail(tail(expLst));
                }
            }
            else if (head(tail(expLst)).tag === 2) {
                if (head(tail(expLst)).fields[0].tag === 0) {
                    matchResult_1 = 4;
                    exp_2 = head(expLst);
                    expN_1 = head(tail(expLst)).fields[1];
                    tl = tail(tail(expLst));
                }
                else {
                    matchResult_1 = 5;
                    exp1_1 = head(expLst);
                    exp2_1 = head(tail(expLst));
                    tl_1 = tail(tail(expLst));
                }
            }
            else {
                matchResult_1 = 5;
                exp1_1 = head(expLst);
                exp2_1 = head(tail(expLst));
                tl_1 = tail(tail(expLst));
            }
        }
        else {
            matchResult_1 = 1;
            exp = head(expLst);
        }
    }
    else {
        matchResult_1 = 0;
    }
    switch (matchResult_1) {
        case 0:
            return new FastAlgExp(1, [new FastData(new FastBits(0, [0]), width)]);
        case 1:
            return exp;
        case 2:
            return new FastAlgExp(3, [exp_1, new BinaryOp(1, []), expN]);
        case 3:
            return new FastAlgExp(3, [exp1, new BinaryOp(0, []), exp2]);
        case 4:
            return fold(assemble, new FastAlgExp(3, [exp_2, new BinaryOp(1, []), expN_1]), tl);
        default:
            return fold(assemble, new FastAlgExp(3, [exp1_1, new BinaryOp(0, []), exp2_1]), tl_1);
    }
}

export function tryBitwiseOperation(expressions) {
    let matchResult, tl, bop, left, right, tl_1;
    if (!isEmpty(expressions)) {
        if (head(expressions).tag === 3) {
            switch (head(expressions).fields[1].tag) {
                case 0: {
                    matchResult = 1;
                    tl = tail(expressions);
                    break;
                }
                case 1: {
                    matchResult = 1;
                    tl = tail(expressions);
                    break;
                }
                default:
                    if (head(expressions).fields[0].tag === 2) {
                        if (head(expressions).fields[0].fields[0].tag === 2) {
                            if (head(expressions).fields[2].tag === 2) {
                                if (head(expressions).fields[2].fields[0].tag === 2) {
                                    matchResult = 2;
                                    bop = head(expressions).fields[1];
                                    left = head(expressions).fields[0].fields[1];
                                    right = head(expressions).fields[2].fields[1];
                                    tl_1 = tail(expressions);
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
                            matchResult = 3;
                        }
                    }
                    else {
                        matchResult = 3;
                    }
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
        case 0:
            return toFail(printf("what? Expressions List should never be empty"));
        case 1:
            return void 0;
        case 2: {
            const checkList = (exps_mut, state_mut, remBits_mut) => {
                checkList:
                while (true) {
                    const exps = exps_mut, state = state_mut, remBits = remBits_mut;
                    let matchResult_1, s, hd, tl_2, l, ll, lu, op, r, rl, ru, tl_3, s_1, tl_4;
                    if (!isEmpty(exps)) {
                        if (state) {
                            if (head(exps).tag === 3) {
                                if (head(exps).fields[0].tag === 2) {
                                    if (head(exps).fields[0].fields[0].tag === 2) {
                                        if (head(exps).fields[2].tag === 2) {
                                            if (head(exps).fields[2].fields[0].tag === 2) {
                                                matchResult_1 = 2;
                                                l = head(exps).fields[0].fields[1];
                                                ll = head(exps).fields[0].fields[0].fields[0];
                                                lu = head(exps).fields[0].fields[0].fields[1];
                                                op = head(exps).fields[1];
                                                r = head(exps).fields[2].fields[1];
                                                rl = head(exps).fields[2].fields[0].fields[0];
                                                ru = head(exps).fields[2].fields[0].fields[1];
                                                tl_3 = tail(exps);
                                            }
                                            else {
                                                matchResult_1 = 3;
                                                s_1 = state;
                                                tl_4 = tail(exps);
                                            }
                                        }
                                        else {
                                            matchResult_1 = 3;
                                            s_1 = state;
                                            tl_4 = tail(exps);
                                        }
                                    }
                                    else {
                                        matchResult_1 = 3;
                                        s_1 = state;
                                        tl_4 = tail(exps);
                                    }
                                }
                                else {
                                    matchResult_1 = 3;
                                    s_1 = state;
                                    tl_4 = tail(exps);
                                }
                            }
                            else {
                                matchResult_1 = 3;
                                s_1 = state;
                                tl_4 = tail(exps);
                            }
                        }
                        else {
                            matchResult_1 = 1;
                            hd = head(exps);
                            tl_2 = tail(exps);
                        }
                    }
                    else {
                        matchResult_1 = 0;
                        s = state;
                    }
                    switch (matchResult_1) {
                        case 0:
                            return [s, remBits];
                        case 1: {
                            exps_mut = tl_2;
                            state_mut = false;
                            remBits_mut = remBits;
                            continue checkList;
                        }
                        case 2:
                            if ((((((ll === lu) && (ll === rl)) && (rl === ru)) && equals(l, left)) && equals(r, right)) && equals(op, bop)) {
                                const newRemBits = List_except([ll], remBits, {
                                    Equals: (x, y) => (x === y),
                                    GetHashCode: numberHash,
                                });
                                exps_mut = tl_3;
                                state_mut = true;
                                remBits_mut = newRemBits;
                                continue checkList;
                            }
                            else {
                                exps_mut = tl_3;
                                state_mut = false;
                                remBits_mut = remBits;
                                continue checkList;
                            }
                        default: {
                            exps_mut = tl_4;
                            state_mut = false;
                            remBits_mut = remBits;
                            continue checkList;
                        }
                    }
                    break;
                }
            };
            const matchValue_1 = getAlgExpWidth(left) | 0;
            const widthR = getAlgExpWidth(right) | 0;
            const widthL = matchValue_1 | 0;
            if (widthL !== widthR) {
                return void 0;
            }
            else {
                const remBits_1 = toList(rangeDouble(0, 1, widthL - 1));
                const matchValue_3 = checkList(expressions, true, remBits_1);
                let matchResult_2;
                if (matchValue_3[0]) {
                    if (isEmpty(matchValue_3[1])) {
                        matchResult_2 = 0;
                    }
                    else {
                        matchResult_2 = 1;
                    }
                }
                else {
                    matchResult_2 = 1;
                }
                switch (matchResult_2) {
                    case 0:
                        return new FastAlgExp(3, [left, bop, right]);
                    default:
                        return void 0;
                }
            }
        }
        default:
            return void 0;
    }
}

/**
 * Check the Bit Ranges for two expressions, and check if they can be merged.
 * If they can, return the merged expression, otherwise return None.
 */
export function tryMergeBitRanges(l1, u1, exp1, l2, u2, exp2) {
    const patternInput = (l1 > l2) ? [l1, l2] : [l2, l1];
    const lLow = patternInput[1] | 0;
    const lHigh = patternInput[0] | 0;
    const patternInput_1 = (u1 > u2) ? [u1, u2] : [u2, u1];
    const uLow = patternInput_1[1] | 0;
    const uHigh = patternInput_1[0] | 0;
    if (equals(exp1, exp2) && (lHigh === (uLow + 1))) {
        return new FastAlgExp(2, [new UnaryOp(2, [lLow, uHigh]), exp1]);
    }
    else {
        return void 0;
    }
}

export function foldAppends(expressions) {
    return reverse(fold((acc, exp) => {
        let matchResult, e, exp0, exp1, l1, l2, tl, u1, u2;
        if (!isEmpty(acc)) {
            if (head(acc).tag === 2) {
                if (head(acc).fields[0].tag === 2) {
                    if (exp.tag === 2) {
                        if (exp.fields[0].tag === 2) {
                            matchResult = 1;
                            exp0 = head(acc).fields[1];
                            exp1 = exp.fields[1];
                            l1 = head(acc).fields[0].fields[0];
                            l2 = exp.fields[0].fields[0];
                            tl = tail(acc);
                            u1 = head(acc).fields[0].fields[1];
                            u2 = exp.fields[0].fields[1];
                        }
                        else {
                            matchResult = 2;
                        }
                    }
                    else {
                        matchResult = 2;
                    }
                }
                else {
                    matchResult = 2;
                }
            }
            else {
                matchResult = 2;
            }
        }
        else {
            matchResult = 0;
            e = exp;
        }
        switch (matchResult) {
            case 0:
                return cons(exp, acc);
            case 1: {
                const matchValue_1 = tryMergeBitRanges(l1, u1, exp0, l2, u2, exp1);
                if (matchValue_1 == null) {
                    return cons(exp, acc);
                }
                else {
                    const newExp = matchValue_1;
                    return cons(newExp, tl);
                }
            }
            default:
                return cons(exp, acc);
        }
    }, empty(), expressions));
}

/**
 * Converts an Algebraic Expression to a string for pretty printing
 */
export function expToString(exp) {
    const expToString$0027 = (exp_1) => {
        switch (exp_1.tag) {
            case 1:
                if (exp_1.fields[0].Dat.tag === 1) {
                    const w_1 = exp_1.fields[0].Dat.fields[0];
                    return toString(w_1);
                }
                else {
                    const w = exp_1.fields[0].Dat.fields[0];
                    return w.toString();
                }
            case 2:
                switch (exp_1.fields[0].tag) {
                    case 1: {
                        const exp_3 = exp_1.fields[1];
                        const expStr_1 = expToString$0027(exp_3);
                        return `(~${expStr_1})`;
                    }
                    case 2: {
                        const exp_4 = exp_1.fields[1];
                        const low = exp_1.fields[0].fields[0] | 0;
                        const up = exp_1.fields[0].fields[1] | 0;
                        const expStr_2 = expToString$0027(exp_4);
                        if (low === up) {
                            return `${expStr_2}[${up}]`;
                        }
                        else if (getAlgExpWidth(exp_4) === ((up - low) + 1)) {
                            return expStr_2;
                        }
                        else {
                            return `${expStr_2}[${up}:${low}]`;
                        }
                    }
                    case 3: {
                        const exp_5 = exp_1.fields[1];
                        const expStr_3 = expToString$0027(exp_5);
                        return `carry(${expStr_3})`;
                    }
                    default: {
                        const exp_2 = exp_1.fields[1];
                        const expStr = expToString$0027(exp_2);
                        return `(-${expStr})`;
                    }
                }
            case 3:
                switch (exp_1.fields[1].tag) {
                    case 1: {
                        const exp1_1 = exp_1.fields[0];
                        const exp2_1 = exp_1.fields[2];
                        return `(${arithmeticToString(exp_1)})`;
                    }
                    case 2: {
                        const exp1_2 = exp_1.fields[0];
                        const exp2_2 = exp_1.fields[2];
                        const expStr1 = expToString$0027(exp1_2);
                        const expStr2 = expToString$0027(exp2_2);
                        return `(${expStr1}&${expStr2})`;
                    }
                    case 3: {
                        const exp1_3 = exp_1.fields[0];
                        const exp2_3 = exp_1.fields[2];
                        const expStr1_1 = expToString$0027(exp1_3);
                        const expStr2_1 = expToString$0027(exp2_3);
                        return `(${expStr1_1}|${expStr2_1})`;
                    }
                    case 4: {
                        const exp1_4 = exp_1.fields[0];
                        const exp2_4 = exp_1.fields[2];
                        const expStr1_2 = expToString$0027(exp1_4);
                        const expStr2_2 = expToString$0027(exp2_4);
                        return `(${expStr1_2}⊕${expStr2_2})`;
                    }
                    default: {
                        const exp1 = exp_1.fields[0];
                        const exp2 = exp_1.fields[2];
                        return `(${arithmeticToString(exp_1)})`;
                    }
                }
            case 4: {
                const exp_6 = exp_1.fields[0];
                const x = exp_1.fields[2];
                const expStr_4 = expToString$0027(exp_6);
                return `(${expStr_4} == ${x.toString()})`;
            }
            case 5: {
                const exps = exp_1.fields[0];
                return `(${join("::", map_1(expToString$0027, exps))})`;
            }
            default: {
                const label = exp_1.fields[0][1];
                return toString_1(label);
            }
        }
    };
    const arithmeticToString = (exp_7) => join(" ", mapIndexed((i, expr) => {
        let matchResult, e, e_1, e_2;
        if (i === 0) {
            matchResult = 0;
            e = expr;
        }
        else if (expr.tag === 2) {
            if (expr.fields[0].tag === 0) {
                matchResult = 1;
                e_1 = expr.fields[1];
            }
            else {
                matchResult = 2;
                e_2 = expr;
            }
        }
        else {
            matchResult = 2;
            e_2 = expr;
        }
        switch (matchResult) {
            case 0:
                return expToString$0027(e);
            case 1:
                return `- ${expToString$0027(e_1)}`;
            default:
                return `+ ${expToString$0027(e_2)}`;
        }
    }, flattenNestedArithmetic(exp_7)));
    const expS = expToString$0027(exp);
    if ((expS.indexOf("(") === 0) && endsWith(expS, ")")) {
        return expS.slice(1, (expS.length - 2) + 1);
    }
    else {
        return expS;
    }
}

/**
 * Recursively evaluates an expression to reduce it to its simplest form
 */
export function evalExp(exp_mut) {
    evalExp:
    while (true) {
        const exp = exp_mut;
        let matchResult, exp_1, exp_2, exp_3, op, exp1, exp2, exp1_1, exp2_1, exp1_2, exp2_2, exp_10, x, exps;
        switch (exp.tag) {
            case 1: {
                matchResult = 1;
                break;
            }
            case 2: {
                switch (exp.fields[0].tag) {
                    case 1: {
                        matchResult = 2;
                        exp_1 = exp.fields[1];
                        break;
                    }
                    case 0: {
                        if (exp.fields[1].tag === 2) {
                            if (exp.fields[1].fields[0].tag === 0) {
                                matchResult = 3;
                                exp_2 = exp.fields[1].fields[1];
                            }
                            else {
                                matchResult = 4;
                                exp_3 = exp.fields[1];
                                op = exp.fields[0];
                            }
                        }
                        else {
                            matchResult = 4;
                            exp_3 = exp.fields[1];
                            op = exp.fields[0];
                        }
                        break;
                    }
                    default: {
                        matchResult = 4;
                        exp_3 = exp.fields[1];
                        op = exp.fields[0];
                    }
                }
                break;
            }
            case 3: {
                switch (exp.fields[1].tag) {
                    case 0:
                    case 1: {
                        matchResult = 8;
                        break;
                    }
                    case 3: {
                        matchResult = 6;
                        exp1_1 = exp.fields[0];
                        exp2_1 = exp.fields[2];
                        break;
                    }
                    case 4: {
                        matchResult = 7;
                        exp1_2 = exp.fields[0];
                        exp2_2 = exp.fields[2];
                        break;
                    }
                    default: {
                        matchResult = 5;
                        exp1 = exp.fields[0];
                        exp2 = exp.fields[2];
                    }
                }
                break;
            }
            case 4: {
                matchResult = 9;
                exp_10 = exp.fields[0];
                x = exp.fields[2];
                break;
            }
            case 5: {
                matchResult = 10;
                exps = exp.fields[0];
                break;
            }
            default:
                matchResult = 0;
        }
        switch (matchResult) {
            case 0:
                return exp;
            case 1:
                return exp;
            case 2: {
                const matchValue = evalExp(exp_1);
                let matchResult_1, inner;
                if (matchValue.tag === 2) {
                    if (matchValue.fields[0].tag === 1) {
                        matchResult_1 = 0;
                        inner = matchValue.fields[1];
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
                        exp_mut = inner;
                        continue evalExp;
                    }
                    default: {
                        const evaluated = evalExp(exp_1);
                        return new FastAlgExp(2, [new UnaryOp(1, []), evaluated]);
                    }
                }
            }
            case 3: {
                const matchValue_1 = evalExp(exp_2);
                let matchResult_2, inner_1;
                if (matchValue_1.tag === 2) {
                    if (matchValue_1.fields[0].tag === 0) {
                        matchResult_2 = 0;
                        inner_1 = matchValue_1.fields[1];
                    }
                    else {
                        matchResult_2 = 1;
                    }
                }
                else {
                    matchResult_2 = 1;
                }
                switch (matchResult_2) {
                    case 0: {
                        exp_mut = inner_1;
                        continue evalExp;
                    }
                    default: {
                        const evaluated_1 = evalExp(exp_2);
                        return new FastAlgExp(2, [new UnaryOp(0, []), evaluated_1]);
                    }
                }
            }
            case 4: {
                const evaluated_2 = evalExp(exp_3);
                return new FastAlgExp(2, [op, evaluated_2]);
            }
            case 5: {
                const left = evalExp(exp1);
                const right = evalExp(exp2);
                let matchResult_3, exp_4, w, exp_5, n, w_1, e1, e2, e1_1, e2_1, e3, e4, l, r;
                switch (right.tag) {
                    case 1: {
                        if (right.fields[0].Dat.tag === 0) {
                            if (right.fields[0].Dat.fields[0] === 0) {
                                matchResult_3 = 0;
                                exp_4 = left;
                                w = right.fields[0].Width;
                            }
                            else if (left.tag === 1) {
                                if (left.fields[0].Dat.tag === 0) {
                                    if (left.fields[0].Dat.fields[0] === 0) {
                                        matchResult_3 = 0;
                                        exp_4 = right;
                                        w = left.fields[0].Width;
                                    }
                                    else {
                                        matchResult_3 = 1;
                                        exp_5 = left;
                                        n = right.fields[0].Dat.fields[0];
                                        w_1 = right.fields[0].Width;
                                    }
                                }
                                else {
                                    matchResult_3 = 1;
                                    exp_5 = left;
                                    n = right.fields[0].Dat.fields[0];
                                    w_1 = right.fields[0].Width;
                                }
                            }
                            else {
                                matchResult_3 = 1;
                                exp_5 = left;
                                n = right.fields[0].Dat.fields[0];
                                w_1 = right.fields[0].Width;
                            }
                        }
                        else if (left.tag === 1) {
                            if (left.fields[0].Dat.tag === 0) {
                                if (left.fields[0].Dat.fields[0] === 0) {
                                    matchResult_3 = 0;
                                    exp_4 = right;
                                    w = left.fields[0].Width;
                                }
                                else {
                                    matchResult_3 = 1;
                                    exp_5 = right;
                                    n = left.fields[0].Dat.fields[0];
                                    w_1 = left.fields[0].Width;
                                }
                            }
                            else {
                                matchResult_3 = 4;
                                l = left;
                                r = right;
                            }
                        }
                        else {
                            matchResult_3 = 4;
                            l = left;
                            r = right;
                        }
                        break;
                    }
                    case 2: {
                        if (left.tag === 1) {
                            if (left.fields[0].Dat.tag === 0) {
                                if (left.fields[0].Dat.fields[0] === 0) {
                                    matchResult_3 = 0;
                                    exp_4 = right;
                                    w = left.fields[0].Width;
                                }
                                else {
                                    matchResult_3 = 1;
                                    exp_5 = right;
                                    n = left.fields[0].Dat.fields[0];
                                    w_1 = left.fields[0].Width;
                                }
                            }
                            else if (right.fields[0].tag === 1) {
                                matchResult_3 = 2;
                                e1 = left;
                                e2 = right.fields[1];
                            }
                            else {
                                matchResult_3 = 4;
                                l = left;
                                r = right;
                            }
                        }
                        else if (right.fields[0].tag === 1) {
                            matchResult_3 = 2;
                            e1 = left;
                            e2 = right.fields[1];
                        }
                        else {
                            matchResult_3 = 4;
                            l = left;
                            r = right;
                        }
                        break;
                    }
                    case 3: {
                        switch (left.tag) {
                            case 1: {
                                if (left.fields[0].Dat.tag === 0) {
                                    if (left.fields[0].Dat.fields[0] === 0) {
                                        matchResult_3 = 0;
                                        exp_4 = right;
                                        w = left.fields[0].Width;
                                    }
                                    else {
                                        matchResult_3 = 1;
                                        exp_5 = right;
                                        n = left.fields[0].Dat.fields[0];
                                        w_1 = left.fields[0].Width;
                                    }
                                }
                                else {
                                    matchResult_3 = 4;
                                    l = left;
                                    r = right;
                                }
                                break;
                            }
                            case 3: {
                                if (left.fields[1].tag === 3) {
                                    if (right.fields[1].tag === 3) {
                                        matchResult_3 = 3;
                                        e1_1 = left.fields[0];
                                        e2_1 = left.fields[2];
                                        e3 = right.fields[0];
                                        e4 = right.fields[2];
                                    }
                                    else {
                                        matchResult_3 = 4;
                                        l = left;
                                        r = right;
                                    }
                                }
                                else {
                                    matchResult_3 = 4;
                                    l = left;
                                    r = right;
                                }
                                break;
                            }
                            default: {
                                matchResult_3 = 4;
                                l = left;
                                r = right;
                            }
                        }
                        break;
                    }
                    default:
                        if (left.tag === 1) {
                            if (left.fields[0].Dat.tag === 0) {
                                if (left.fields[0].Dat.fields[0] === 0) {
                                    matchResult_3 = 0;
                                    exp_4 = right;
                                    w = left.fields[0].Width;
                                }
                                else {
                                    matchResult_3 = 1;
                                    exp_5 = right;
                                    n = left.fields[0].Dat.fields[0];
                                    w_1 = left.fields[0].Width;
                                }
                            }
                            else {
                                matchResult_3 = 4;
                                l = left;
                                r = right;
                            }
                        }
                        else {
                            matchResult_3 = 4;
                            l = left;
                            r = right;
                        }
                }
                switch (matchResult_3) {
                    case 0:
                        return new FastAlgExp(1, [new FastData(new FastBits(0, [0]), w)]);
                    case 1: {
                        let one;
                        const value = Math.pow(2, w_1) - 1;
                        one = (value >>> 0);
                        if (n === one) {
                            return exp_5;
                        }
                        else {
                            return new FastAlgExp(3, [left, new BinaryOp(2, []), right]);
                        }
                    }
                    case 2:
                        if (equals(e1, e2)) {
                            const w_2 = getAlgExpWidth(e1) | 0;
                            return new FastAlgExp(1, [new FastData(new FastBits(0, [0]), w_2)]);
                        }
                        else {
                            return new FastAlgExp(3, [left, new BinaryOp(2, []), right]);
                        }
                    case 3:
                        if (equals(e1_1, e3)) {
                            return new FastAlgExp(3, [e1_1, new BinaryOp(3, []), new FastAlgExp(3, [e2_1, new BinaryOp(2, []), e4])]);
                        }
                        else if (equals(e1_1, e4)) {
                            return new FastAlgExp(3, [e1_1, new BinaryOp(3, []), new FastAlgExp(3, [e2_1, new BinaryOp(2, []), e3])]);
                        }
                        else if (equals(e2_1, e3)) {
                            return new FastAlgExp(3, [e2_1, new BinaryOp(3, []), new FastAlgExp(3, [e1_1, new BinaryOp(2, []), e4])]);
                        }
                        else if (equals(e2_1, e4)) {
                            return new FastAlgExp(3, [e2_1, new BinaryOp(3, []), new FastAlgExp(3, [e1_1, new BinaryOp(2, []), e3])]);
                        }
                        else {
                            return new FastAlgExp(3, [left, new BinaryOp(2, []), right]);
                        }
                    default:
                        if (equals(l, r)) {
                            return l;
                        }
                        else {
                            return new FastAlgExp(3, [l, new BinaryOp(2, []), r]);
                        }
                }
            }
            case 6: {
                toConsole(printf("Or Case Matched"));
                const left_1 = evalExp(exp1_1);
                const right_1 = evalExp(exp2_1);
                let matchResult_4, exp_6, exp_7, n_1, w_3, e1_2, e2_2, a1, a2, b1, b2, c1, e1_3, e2_3, e3_1, l_1, r_1;
                switch (right_1.tag) {
                    case 1: {
                        if (right_1.fields[0].Dat.tag === 0) {
                            if (right_1.fields[0].Dat.fields[0] === 0) {
                                matchResult_4 = 0;
                                exp_6 = left_1;
                            }
                            else {
                                switch (left_1.tag) {
                                    case 1: {
                                        if (left_1.fields[0].Dat.tag === 0) {
                                            if (left_1.fields[0].Dat.fields[0] === 0) {
                                                matchResult_4 = 0;
                                                exp_6 = right_1;
                                            }
                                            else {
                                                matchResult_4 = 1;
                                                exp_7 = left_1;
                                                n_1 = right_1.fields[0].Dat.fields[0];
                                                w_3 = right_1.fields[0].Width;
                                            }
                                        }
                                        else {
                                            matchResult_4 = 1;
                                            exp_7 = left_1;
                                            n_1 = right_1.fields[0].Dat.fields[0];
                                            w_3 = right_1.fields[0].Width;
                                        }
                                        break;
                                    }
                                    case 3: {
                                        matchResult_4 = 1;
                                        exp_7 = left_1;
                                        n_1 = right_1.fields[0].Dat.fields[0];
                                        w_3 = right_1.fields[0].Width;
                                        break;
                                    }
                                    default: {
                                        matchResult_4 = 1;
                                        exp_7 = left_1;
                                        n_1 = right_1.fields[0].Dat.fields[0];
                                        w_3 = right_1.fields[0].Width;
                                    }
                                }
                            }
                        }
                        else {
                            switch (left_1.tag) {
                                case 1: {
                                    if (left_1.fields[0].Dat.tag === 0) {
                                        if (left_1.fields[0].Dat.fields[0] === 0) {
                                            matchResult_4 = 0;
                                            exp_6 = right_1;
                                        }
                                        else {
                                            matchResult_4 = 1;
                                            exp_7 = right_1;
                                            n_1 = left_1.fields[0].Dat.fields[0];
                                            w_3 = left_1.fields[0].Width;
                                        }
                                    }
                                    else {
                                        matchResult_4 = 5;
                                        l_1 = left_1;
                                        r_1 = right_1;
                                    }
                                    break;
                                }
                                case 3: {
                                    if (left_1.fields[1].tag === 2) {
                                        matchResult_4 = 4;
                                        e1_3 = right_1;
                                        e2_3 = left_1.fields[0];
                                        e3_1 = left_1.fields[2];
                                    }
                                    else {
                                        matchResult_4 = 5;
                                        l_1 = left_1;
                                        r_1 = right_1;
                                    }
                                    break;
                                }
                                default: {
                                    matchResult_4 = 5;
                                    l_1 = left_1;
                                    r_1 = right_1;
                                }
                            }
                        }
                        break;
                    }
                    case 2: {
                        switch (left_1.tag) {
                            case 1: {
                                if (left_1.fields[0].Dat.tag === 0) {
                                    if (left_1.fields[0].Dat.fields[0] === 0) {
                                        matchResult_4 = 0;
                                        exp_6 = right_1;
                                    }
                                    else {
                                        matchResult_4 = 1;
                                        exp_7 = right_1;
                                        n_1 = left_1.fields[0].Dat.fields[0];
                                        w_3 = left_1.fields[0].Width;
                                    }
                                }
                                else if (right_1.fields[0].tag === 1) {
                                    matchResult_4 = 2;
                                    e1_2 = left_1;
                                    e2_2 = right_1.fields[1];
                                }
                                else {
                                    matchResult_4 = 5;
                                    l_1 = left_1;
                                    r_1 = right_1;
                                }
                                break;
                            }
                            case 3: {
                                if (right_1.fields[0].tag === 1) {
                                    matchResult_4 = 2;
                                    e1_2 = left_1;
                                    e2_2 = right_1.fields[1];
                                }
                                else if (left_1.fields[1].tag === 2) {
                                    matchResult_4 = 4;
                                    e1_3 = right_1;
                                    e2_3 = left_1.fields[0];
                                    e3_1 = left_1.fields[2];
                                }
                                else {
                                    matchResult_4 = 5;
                                    l_1 = left_1;
                                    r_1 = right_1;
                                }
                                break;
                            }
                            default:
                                if (right_1.fields[0].tag === 1) {
                                    matchResult_4 = 2;
                                    e1_2 = left_1;
                                    e2_2 = right_1.fields[1];
                                }
                                else {
                                    matchResult_4 = 5;
                                    l_1 = left_1;
                                    r_1 = right_1;
                                }
                        }
                        break;
                    }
                    case 3: {
                        switch (left_1.tag) {
                            case 1: {
                                if (left_1.fields[0].Dat.tag === 0) {
                                    if (left_1.fields[0].Dat.fields[0] === 0) {
                                        matchResult_4 = 0;
                                        exp_6 = right_1;
                                    }
                                    else {
                                        matchResult_4 = 1;
                                        exp_7 = right_1;
                                        n_1 = left_1.fields[0].Dat.fields[0];
                                        w_3 = left_1.fields[0].Width;
                                    }
                                }
                                else if (right_1.fields[1].tag === 2) {
                                    matchResult_4 = 4;
                                    e1_3 = left_1;
                                    e2_3 = right_1.fields[0];
                                    e3_1 = right_1.fields[2];
                                }
                                else {
                                    matchResult_4 = 5;
                                    l_1 = left_1;
                                    r_1 = right_1;
                                }
                                break;
                            }
                            case 3: {
                                if (left_1.fields[1].tag === 2) {
                                    if (left_1.fields[2].tag === 3) {
                                        if (left_1.fields[2].fields[1].tag === 0) {
                                            if (right_1.fields[1].tag === 2) {
                                                matchResult_4 = 3;
                                                a1 = left_1.fields[2].fields[0];
                                                a2 = right_1.fields[0];
                                                b1 = left_1.fields[2].fields[2];
                                                b2 = right_1.fields[2];
                                                c1 = left_1.fields[0];
                                            }
                                            else {
                                                matchResult_4 = 4;
                                                e1_3 = right_1;
                                                e2_3 = left_1.fields[0];
                                                e3_1 = left_1.fields[2];
                                            }
                                        }
                                        else if (right_1.fields[1].tag === 2) {
                                            if (right_1.fields[2].tag === 3) {
                                                if (right_1.fields[2].fields[1].tag === 0) {
                                                    matchResult_4 = 3;
                                                    a1 = right_1.fields[2].fields[0];
                                                    a2 = left_1.fields[0];
                                                    b1 = right_1.fields[2].fields[2];
                                                    b2 = left_1.fields[2];
                                                    c1 = right_1.fields[0];
                                                }
                                                else if (left_1.fields[0].tag === 3) {
                                                    if (left_1.fields[0].fields[1].tag === 0) {
                                                        matchResult_4 = 3;
                                                        a1 = left_1.fields[0].fields[0];
                                                        a2 = right_1.fields[0];
                                                        b1 = left_1.fields[0].fields[2];
                                                        b2 = right_1.fields[2];
                                                        c1 = left_1.fields[2];
                                                    }
                                                    else if (right_1.fields[0].tag === 3) {
                                                        if (right_1.fields[0].fields[1].tag === 0) {
                                                            matchResult_4 = 3;
                                                            a1 = right_1.fields[0].fields[0];
                                                            a2 = left_1.fields[0];
                                                            b1 = right_1.fields[0].fields[2];
                                                            b2 = left_1.fields[2];
                                                            c1 = right_1.fields[2];
                                                        }
                                                        else {
                                                            matchResult_4 = 4;
                                                            e1_3 = left_1;
                                                            e2_3 = right_1.fields[0];
                                                            e3_1 = right_1.fields[2];
                                                        }
                                                    }
                                                    else {
                                                        matchResult_4 = 4;
                                                        e1_3 = left_1;
                                                        e2_3 = right_1.fields[0];
                                                        e3_1 = right_1.fields[2];
                                                    }
                                                }
                                                else if (right_1.fields[0].tag === 3) {
                                                    if (right_1.fields[0].fields[1].tag === 0) {
                                                        matchResult_4 = 3;
                                                        a1 = right_1.fields[0].fields[0];
                                                        a2 = left_1.fields[0];
                                                        b1 = right_1.fields[0].fields[2];
                                                        b2 = left_1.fields[2];
                                                        c1 = right_1.fields[2];
                                                    }
                                                    else {
                                                        matchResult_4 = 4;
                                                        e1_3 = left_1;
                                                        e2_3 = right_1.fields[0];
                                                        e3_1 = right_1.fields[2];
                                                    }
                                                }
                                                else {
                                                    matchResult_4 = 4;
                                                    e1_3 = left_1;
                                                    e2_3 = right_1.fields[0];
                                                    e3_1 = right_1.fields[2];
                                                }
                                            }
                                            else if (left_1.fields[0].tag === 3) {
                                                if (left_1.fields[0].fields[1].tag === 0) {
                                                    matchResult_4 = 3;
                                                    a1 = left_1.fields[0].fields[0];
                                                    a2 = right_1.fields[0];
                                                    b1 = left_1.fields[0].fields[2];
                                                    b2 = right_1.fields[2];
                                                    c1 = left_1.fields[2];
                                                }
                                                else if (right_1.fields[0].tag === 3) {
                                                    if (right_1.fields[0].fields[1].tag === 0) {
                                                        matchResult_4 = 3;
                                                        a1 = right_1.fields[0].fields[0];
                                                        a2 = left_1.fields[0];
                                                        b1 = right_1.fields[0].fields[2];
                                                        b2 = left_1.fields[2];
                                                        c1 = right_1.fields[2];
                                                    }
                                                    else {
                                                        matchResult_4 = 4;
                                                        e1_3 = left_1;
                                                        e2_3 = right_1.fields[0];
                                                        e3_1 = right_1.fields[2];
                                                    }
                                                }
                                                else {
                                                    matchResult_4 = 4;
                                                    e1_3 = left_1;
                                                    e2_3 = right_1.fields[0];
                                                    e3_1 = right_1.fields[2];
                                                }
                                            }
                                            else if (right_1.fields[0].tag === 3) {
                                                if (right_1.fields[0].fields[1].tag === 0) {
                                                    matchResult_4 = 3;
                                                    a1 = right_1.fields[0].fields[0];
                                                    a2 = left_1.fields[0];
                                                    b1 = right_1.fields[0].fields[2];
                                                    b2 = left_1.fields[2];
                                                    c1 = right_1.fields[2];
                                                }
                                                else {
                                                    matchResult_4 = 4;
                                                    e1_3 = left_1;
                                                    e2_3 = right_1.fields[0];
                                                    e3_1 = right_1.fields[2];
                                                }
                                            }
                                            else {
                                                matchResult_4 = 4;
                                                e1_3 = left_1;
                                                e2_3 = right_1.fields[0];
                                                e3_1 = right_1.fields[2];
                                            }
                                        }
                                        else {
                                            matchResult_4 = 4;
                                            e1_3 = right_1;
                                            e2_3 = left_1.fields[0];
                                            e3_1 = left_1.fields[2];
                                        }
                                    }
                                    else if (right_1.fields[1].tag === 2) {
                                        if (right_1.fields[2].tag === 3) {
                                            if (right_1.fields[2].fields[1].tag === 0) {
                                                matchResult_4 = 3;
                                                a1 = right_1.fields[2].fields[0];
                                                a2 = left_1.fields[0];
                                                b1 = right_1.fields[2].fields[2];
                                                b2 = left_1.fields[2];
                                                c1 = right_1.fields[0];
                                            }
                                            else if (left_1.fields[0].tag === 3) {
                                                if (left_1.fields[0].fields[1].tag === 0) {
                                                    matchResult_4 = 3;
                                                    a1 = left_1.fields[0].fields[0];
                                                    a2 = right_1.fields[0];
                                                    b1 = left_1.fields[0].fields[2];
                                                    b2 = right_1.fields[2];
                                                    c1 = left_1.fields[2];
                                                }
                                                else if (right_1.fields[0].tag === 3) {
                                                    if (right_1.fields[0].fields[1].tag === 0) {
                                                        matchResult_4 = 3;
                                                        a1 = right_1.fields[0].fields[0];
                                                        a2 = left_1.fields[0];
                                                        b1 = right_1.fields[0].fields[2];
                                                        b2 = left_1.fields[2];
                                                        c1 = right_1.fields[2];
                                                    }
                                                    else {
                                                        matchResult_4 = 4;
                                                        e1_3 = left_1;
                                                        e2_3 = right_1.fields[0];
                                                        e3_1 = right_1.fields[2];
                                                    }
                                                }
                                                else {
                                                    matchResult_4 = 4;
                                                    e1_3 = left_1;
                                                    e2_3 = right_1.fields[0];
                                                    e3_1 = right_1.fields[2];
                                                }
                                            }
                                            else if (right_1.fields[0].tag === 3) {
                                                if (right_1.fields[0].fields[1].tag === 0) {
                                                    matchResult_4 = 3;
                                                    a1 = right_1.fields[0].fields[0];
                                                    a2 = left_1.fields[0];
                                                    b1 = right_1.fields[0].fields[2];
                                                    b2 = left_1.fields[2];
                                                    c1 = right_1.fields[2];
                                                }
                                                else {
                                                    matchResult_4 = 4;
                                                    e1_3 = left_1;
                                                    e2_3 = right_1.fields[0];
                                                    e3_1 = right_1.fields[2];
                                                }
                                            }
                                            else {
                                                matchResult_4 = 4;
                                                e1_3 = left_1;
                                                e2_3 = right_1.fields[0];
                                                e3_1 = right_1.fields[2];
                                            }
                                        }
                                        else if (left_1.fields[0].tag === 3) {
                                            if (left_1.fields[0].fields[1].tag === 0) {
                                                matchResult_4 = 3;
                                                a1 = left_1.fields[0].fields[0];
                                                a2 = right_1.fields[0];
                                                b1 = left_1.fields[0].fields[2];
                                                b2 = right_1.fields[2];
                                                c1 = left_1.fields[2];
                                            }
                                            else if (right_1.fields[0].tag === 3) {
                                                if (right_1.fields[0].fields[1].tag === 0) {
                                                    matchResult_4 = 3;
                                                    a1 = right_1.fields[0].fields[0];
                                                    a2 = left_1.fields[0];
                                                    b1 = right_1.fields[0].fields[2];
                                                    b2 = left_1.fields[2];
                                                    c1 = right_1.fields[2];
                                                }
                                                else {
                                                    matchResult_4 = 4;
                                                    e1_3 = left_1;
                                                    e2_3 = right_1.fields[0];
                                                    e3_1 = right_1.fields[2];
                                                }
                                            }
                                            else {
                                                matchResult_4 = 4;
                                                e1_3 = left_1;
                                                e2_3 = right_1.fields[0];
                                                e3_1 = right_1.fields[2];
                                            }
                                        }
                                        else if (right_1.fields[0].tag === 3) {
                                            if (right_1.fields[0].fields[1].tag === 0) {
                                                matchResult_4 = 3;
                                                a1 = right_1.fields[0].fields[0];
                                                a2 = left_1.fields[0];
                                                b1 = right_1.fields[0].fields[2];
                                                b2 = left_1.fields[2];
                                                c1 = right_1.fields[2];
                                            }
                                            else {
                                                matchResult_4 = 4;
                                                e1_3 = left_1;
                                                e2_3 = right_1.fields[0];
                                                e3_1 = right_1.fields[2];
                                            }
                                        }
                                        else {
                                            matchResult_4 = 4;
                                            e1_3 = left_1;
                                            e2_3 = right_1.fields[0];
                                            e3_1 = right_1.fields[2];
                                        }
                                    }
                                    else {
                                        matchResult_4 = 4;
                                        e1_3 = right_1;
                                        e2_3 = left_1.fields[0];
                                        e3_1 = left_1.fields[2];
                                    }
                                }
                                else if (right_1.fields[1].tag === 2) {
                                    matchResult_4 = 4;
                                    e1_3 = left_1;
                                    e2_3 = right_1.fields[0];
                                    e3_1 = right_1.fields[2];
                                }
                                else {
                                    matchResult_4 = 5;
                                    l_1 = left_1;
                                    r_1 = right_1;
                                }
                                break;
                            }
                            default:
                                if (right_1.fields[1].tag === 2) {
                                    matchResult_4 = 4;
                                    e1_3 = left_1;
                                    e2_3 = right_1.fields[0];
                                    e3_1 = right_1.fields[2];
                                }
                                else {
                                    matchResult_4 = 5;
                                    l_1 = left_1;
                                    r_1 = right_1;
                                }
                        }
                        break;
                    }
                    default:
                        switch (left_1.tag) {
                            case 1: {
                                if (left_1.fields[0].Dat.tag === 0) {
                                    if (left_1.fields[0].Dat.fields[0] === 0) {
                                        matchResult_4 = 0;
                                        exp_6 = right_1;
                                    }
                                    else {
                                        matchResult_4 = 1;
                                        exp_7 = right_1;
                                        n_1 = left_1.fields[0].Dat.fields[0];
                                        w_3 = left_1.fields[0].Width;
                                    }
                                }
                                else {
                                    matchResult_4 = 5;
                                    l_1 = left_1;
                                    r_1 = right_1;
                                }
                                break;
                            }
                            case 3: {
                                if (left_1.fields[1].tag === 2) {
                                    matchResult_4 = 4;
                                    e1_3 = right_1;
                                    e2_3 = left_1.fields[0];
                                    e3_1 = left_1.fields[2];
                                }
                                else {
                                    matchResult_4 = 5;
                                    l_1 = left_1;
                                    r_1 = right_1;
                                }
                                break;
                            }
                            default: {
                                matchResult_4 = 5;
                                l_1 = left_1;
                                r_1 = right_1;
                            }
                        }
                }
                switch (matchResult_4) {
                    case 0:
                        return exp_6;
                    case 1: {
                        let one_1;
                        const value_1 = Math.pow(2, w_3) - 1;
                        one_1 = (value_1 >>> 0);
                        if (n_1 === one_1) {
                            return new FastAlgExp(1, [new FastData(new FastBits(0, [one_1]), w_3)]);
                        }
                        else {
                            return new FastAlgExp(3, [left_1, new BinaryOp(2, []), right_1]);
                        }
                    }
                    case 2:
                        if (equals(e1_2, e2_2)) {
                            const w_4 = getAlgExpWidth(e1_2) | 0;
                            return new FastAlgExp(1, [new FastData(new FastBits(0, [1]), w_4)]);
                        }
                        else {
                            return new FastAlgExp(3, [left_1, new BinaryOp(3, []), right_1]);
                        }
                    case 3: {
                        const matchValue_4 = evalExp(a1);
                        const matchValue_5 = evalExp(a2);
                        const matchValue_6 = evalExp(b1);
                        const matchValue_7 = evalExp(b2);
                        const c1Eval = evalExp(c1);
                        const b2Eval = matchValue_7;
                        const b1Eval = matchValue_6;
                        const a2Eval = matchValue_5;
                        const a1Eval = matchValue_4;
                        if ((equals(a1Eval, a2Eval) && equals(b1Eval, b2Eval)) ? true : (equals(a1Eval, b2Eval) && equals(a2Eval, b1Eval))) {
                            const addition = new FastAlgExp(3, [c1Eval, new BinaryOp(0, []), new FastAlgExp(3, [a1Eval, new BinaryOp(0, []), b1Eval])]);
                            return new FastAlgExp(2, [new UnaryOp(3, []), addition]);
                        }
                        else {
                            return new FastAlgExp(3, [left_1, new BinaryOp(3, []), right_1]);
                        }
                    }
                    case 4:
                        if (equals(e1_3, e2_3) ? true : equals(e1_3, e3_1)) {
                            return e1_3;
                        }
                        else if (equals(e1_3, new FastAlgExp(2, [new UnaryOp(1, []), e2_3]))) {
                            return new FastAlgExp(3, [e1_3, new BinaryOp(3, []), e3_1]);
                        }
                        else if (equals(e1_3, new FastAlgExp(2, [new UnaryOp(1, []), e3_1]))) {
                            return new FastAlgExp(3, [e1_3, new BinaryOp(3, []), e2_3]);
                        }
                        else {
                            return new FastAlgExp(3, [left_1, new BinaryOp(3, []), right_1]);
                        }
                    default:
                        if (equals(l_1, r_1)) {
                            return l_1;
                        }
                        else {
                            return new FastAlgExp(3, [l_1, new BinaryOp(3, []), r_1]);
                        }
                }
            }
            case 7: {
                const left_2 = evalExp(exp1_2);
                const right_2 = evalExp(exp2_2);
                let matchResult_5, exp_8, exp_9, n_2, w_5, l_2, r_2;
                if (right_2.tag === 1) {
                    if (right_2.fields[0].Dat.tag === 0) {
                        if (right_2.fields[0].Dat.fields[0] === 0) {
                            matchResult_5 = 0;
                            exp_8 = left_2;
                        }
                        else if (left_2.tag === 1) {
                            if (left_2.fields[0].Dat.tag === 0) {
                                if (left_2.fields[0].Dat.fields[0] === 0) {
                                    matchResult_5 = 0;
                                    exp_8 = right_2;
                                }
                                else {
                                    matchResult_5 = 1;
                                    exp_9 = left_2;
                                    n_2 = right_2.fields[0].Dat.fields[0];
                                    w_5 = right_2.fields[0].Width;
                                }
                            }
                            else {
                                matchResult_5 = 1;
                                exp_9 = left_2;
                                n_2 = right_2.fields[0].Dat.fields[0];
                                w_5 = right_2.fields[0].Width;
                            }
                        }
                        else {
                            matchResult_5 = 1;
                            exp_9 = left_2;
                            n_2 = right_2.fields[0].Dat.fields[0];
                            w_5 = right_2.fields[0].Width;
                        }
                    }
                    else if (left_2.tag === 1) {
                        if (left_2.fields[0].Dat.tag === 0) {
                            if (left_2.fields[0].Dat.fields[0] === 0) {
                                matchResult_5 = 0;
                                exp_8 = right_2;
                            }
                            else {
                                matchResult_5 = 1;
                                exp_9 = right_2;
                                n_2 = left_2.fields[0].Dat.fields[0];
                                w_5 = left_2.fields[0].Width;
                            }
                        }
                        else {
                            matchResult_5 = 2;
                            l_2 = left_2;
                            r_2 = right_2;
                        }
                    }
                    else {
                        matchResult_5 = 2;
                        l_2 = left_2;
                        r_2 = right_2;
                    }
                }
                else if (left_2.tag === 1) {
                    if (left_2.fields[0].Dat.tag === 0) {
                        if (left_2.fields[0].Dat.fields[0] === 0) {
                            matchResult_5 = 0;
                            exp_8 = right_2;
                        }
                        else {
                            matchResult_5 = 1;
                            exp_9 = right_2;
                            n_2 = left_2.fields[0].Dat.fields[0];
                            w_5 = left_2.fields[0].Width;
                        }
                    }
                    else {
                        matchResult_5 = 2;
                        l_2 = left_2;
                        r_2 = right_2;
                    }
                }
                else {
                    matchResult_5 = 2;
                    l_2 = left_2;
                    r_2 = right_2;
                }
                switch (matchResult_5) {
                    case 0:
                        return exp_8;
                    case 1: {
                        let one_2;
                        const value_2 = Math.pow(2, w_5) - 1;
                        one_2 = (value_2 >>> 0);
                        if (n_2 === one_2) {
                            return new FastAlgExp(2, [new UnaryOp(1, []), exp_9]);
                        }
                        else {
                            return reduceArithmetic(new FastAlgExp(3, [exp_9, new BinaryOp(0, []), new FastAlgExp(1, [new FastData(new FastBits(0, [n_2]), w_5)])]));
                        }
                    }
                    default:
                        if ((getAlgExpWidth(l_2) === 1) && (getAlgExpWidth(r_2) === 1)) {
                            return reduceArithmetic(new FastAlgExp(3, [l_2, new BinaryOp(0, []), r_2]));
                        }
                        else {
                            return new FastAlgExp(3, [l_2, new BinaryOp(4, []), r_2]);
                        }
                }
            }
            case 8:
                return reduceArithmetic(exp);
            case 9: {
                const evaluated_3 = evalExp(exp_10);
                return new FastAlgExp(4, [evaluated_3, new ComparisonOp(), x]);
            }
            default: {
                const evaluated_4 = map_1(evalExp, exps);
                const _arg = tryBitwiseOperation(evaluated_4);
                if (_arg == null) {
                    return new FastAlgExp(5, [foldAppends(evaluated_4)]);
                }
                else {
                    const e = _arg;
                    return e;
                }
            }
        }
        break;
    }
}

export function reduceArithmetic(expression) {
    let value;
    const increment = (x) => (x + 1);
    const decrement = (x_1) => (x_1 - 1);
    const updateExpCount = (exp, trackMap, action) => {
        const matchValue = tryFind(exp, trackMap);
        if (matchValue == null) {
            const newCount_1 = action(0) | 0;
            return add(exp, newCount_1, trackMap);
        }
        else {
            const count = matchValue | 0;
            const newCount = action(count) | 0;
            return add(exp, newCount, trackMap);
        }
    };
    const width = getAlgExpWidth(expression) | 0;
    const flatLst = map_1(evalExp, flattenNestedArithmetic(expression));
    const patternInput = fold((tupledArg, expr) => {
        const numTrack = tupledArg[0] | 0;
        const expTrack = tupledArg[1];
        let matchResult, w, w_1, e;
        switch (expr.tag) {
            case 1: {
                if (expr.fields[0].Dat.tag === 0) {
                    matchResult = 0;
                    w = expr.fields[0].Dat.fields[0];
                }
                else {
                    matchResult = 3;
                }
                break;
            }
            case 2: {
                if (expr.fields[0].tag === 0) {
                    if (expr.fields[1].tag === 1) {
                        if (expr.fields[1].fields[0].Dat.tag === 0) {
                            matchResult = 1;
                            w_1 = expr.fields[1].fields[0].Dat.fields[0];
                        }
                        else {
                            matchResult = 2;
                            e = expr.fields[1];
                        }
                    }
                    else {
                        matchResult = 2;
                        e = expr.fields[1];
                    }
                }
                else {
                    matchResult = 3;
                }
                break;
            }
            default:
                matchResult = 3;
        }
        switch (matchResult) {
            case 0:
                return [numTrack + ~~w, expTrack];
            case 1:
                return [numTrack - ~~w_1, expTrack];
            case 2: {
                const newExpTrack = updateExpCount(e, expTrack, decrement);
                return [numTrack, newExpTrack];
            }
            default: {
                const newExpTrack_1 = updateExpCount(expr, expTrack, increment);
                return [numTrack, newExpTrack_1];
            }
        }
    }, [0, empty_1({
        Compare: compare,
    })], flatLst);
    const numVal = patternInput[0] | 0;
    const expCounts = patternInput[1];
    let numDataExp;
    const n = (numVal % ~~Math.pow(2, width)) | 0;
    numDataExp = ((n > 0) ? (new FastAlgExp(1, [new FastData(new FastBits(0, [n >>> 0]), width)])) : (new FastAlgExp(2, [new UnaryOp(0, []), new FastAlgExp(1, [new FastData(new FastBits(0, [(value = (Math.abs(n) | 0), value >>> 0)]), width)])])));
    let expressionsToAssemble;
    const l = collect((tupledArg_1) => {
        const exp_2 = tupledArg_1[0];
        const count_1 = tupledArg_1[1] | 0;
        if (count_1 === 0) {
            return empty();
        }
        else if (count_1 > 0) {
            return toList(delay(() => map_2((i) => exp_2, rangeDouble(1, 1, count_1))));
        }
        else {
            return toList(delay(() => map_2((i_1) => (new FastAlgExp(2, [new UnaryOp(0, []), exp_2])), rangeDouble(1, 1, Math.abs(count_1)))));
        }
    }, toList_1(expCounts));
    expressionsToAssemble = ((numVal === 0) ? l : append(l, singleton(numDataExp)));
    const arg = map_1(expToString, expressionsToAssemble);
    toConsole(printf("To Assemble: %A"))(arg);
    return assembleArithmetic(width, expressionsToAssemble);
}

export function getBIBit(bits, pos) {
    return bits[~~(pos / 32)] >>> (pos % 32);
}

export function getBIBitsInt(bits, msb, lsb) {
    const width = ((msb - lsb) + 1) | 0;
    if (width < 32) {
        const lowerWord = bits[~~(lsb / 32)];
        const offset = (lsb % 32) | 0;
        const lowerChunk = lowerWord >>> offset;
        if ((offset + width) <= 32) {
            return lowerChunk;
        }
        else {
            const upperChunk = (((bits[~~(lsb / 32) + 1] & (((1 << ((width - offset) - 32)) >>> 0) - 1)) >>> 0) << offset) >>> 0;
            return (lowerChunk | upperChunk) >>> 0;
        }
    }
    else {
        return toFail(printf("Cannot extract bits {msb}..{lsb} as a single 32 bit word"));
    }
}

export function getBIBits(bits, msb, lsb) {
    const lsw = ~~(lsb / 32) | 0;
    const outWidth = ((msb - lsb) + 1) | 0;
    const msw = ~~(msb / 32) | 0;
    const offset = (lsb % 32) | 0;
    if (offset === 0) {
        return bits.slice(msw, lsw + 1);
    }
    else {
        const outWords = (~~(outWidth / 32) + 1) | 0;
        return initialize(outWords, (n) => {
            let n_1;
            if ((n_1 = (n | 0), (n_1 + lsw) === msw)) {
                const n_2 = n | 0;
                return (((bits[msw] & (((1 << (outWidth - (offset % 32))) >>> 0) - 1)) >>> 0) << offset) >>> 0;
            }
            else {
                const n_3 = n | 0;
                return (((((bits[(n_3 + lsw) + 1] & (((1 << (32 - offset)) >>> 0) - 1)) >>> 0) << offset) >>> 0) | (((bits[n_3 + lsw] >>> offset) & (((1 << offset) >>> 0) - 1)) >>> 0)) >>> 0;
            }
        }, Uint32Array);
    }
}

export const floatCarryBit = reduce((x, y) => (x * y), initialize_1(32, (_arg) => 2));

export function addBIBits(bits1, bits2, cin) {
    let tempCarry = (cin === 1) ? floatCarryBit : 0;
    const outs = initialize(bits1.length, (n) => {
        tempCarry = ((bits1[n] + bits2[n]) + ((tempCarry >= floatCarryBit) ? 1 : 0));
        return tempCarry >>> 0;
    }, Uint32Array);
    return [outs, (tempCarry >= floatCarryBit) ? 1 : 0];
}

export function binopBIBits(op, bits1, bits2) {
    return initialize(bits1.length, (n) => op(bits1[n], bits2[n]), Uint32Array);
}

/**
 * invert bits1: assuming that width is the bit width of bits1
 * MS bits not used by bits1 are not inverted.
 */
export function invertBIBits(bits, width) {
    const msw = ~~(width / 32) | 0;
    return initialize(bits.length, (n) => {
        const x = bits[n];
        return (n === msw) ? ((x & (((1 << (width % 32)) >>> 0) - 1)) >>> 0) : ((x ^ 4294967295) >>> 0);
    }, Uint32Array);
}

/**
 * append bits2 on MSB side of bits1
 */
export function appendBIBits(_arg2_, _arg2__1, _arg1_, _arg1__1) {
    const _arg = [_arg2_, _arg2__1];
    const _arg_1 = [_arg1_, _arg1__1];
    const width1 = _arg[1] | 0;
    const bits1 = _arg[0];
    const width2 = _arg_1[1] | 0;
    const bits2 = _arg_1[0];
    const outWidth = (width1 + width2) | 0;
    const outMSW = ~~(outWidth / 32) | 0;
    const offset = (width1 % 32) | 0;
    const msw1 = ~~(width1 / 32) | 0;
    if (offset === 0) {
        return append_1(bits1, bits2, Uint32Array);
    }
    else if (outMSW === ~~(width1 / 32)) {
        const out = copy(bits1);
        out[outMSW] = ((out[outMSW] | ((((bits2[0] & (((1 << width2) >>> 0) - 1)) >>> 0) << offset) >>> 0)) >>> 0);
        return out;
    }
    else {
        return initialize(outMSW + 1, (n) => ((n === outMSW) ? ((((((bits2[n - msw1] & (((1 << (32 - offset)) >>> 0) - 1)) >>> 0) << offset) >>> 0) | (((bits2[(n - msw1) + 1] >>> offset) & (((1 << ((offset + outWidth) - 32)) >>> 0) - 1)) >>> 0)) >>> 0) : ((n === ~~(width1 / 32)) ? ((((((bits1[n - (width1 % 32)] & (((1 << (32 - offset)) >>> 0) - 1)) >>> 0) << offset) >>> 0) | (((bits2[(n - ~~(width1 / 32)) + 1] >>> offset) & (((1 << offset) >>> 0) - 1)) >>> 0)) >>> 0) : ((n >= ~~(width1 / 32)) ? ((((((bits2[n - ~~(width1 / 32)] & (((1 << (32 - offset)) >>> 0) - 1)) >>> 0) << offset) >>> 0) | (((bits2[(n - ~~(width1 / 32)) + 1] >>> offset) & (((1 << offset) >>> 0) - 1)) >>> 0)) >>> 0) : bits1[n]))), Uint32Array);
    }
}

export const bigIntMaskA = map_3((width) => op_Subtraction(op_LeftShift(fromOne(), width), fromOne()), toArray(rangeDouble(0, 1, 128)));

export const bigIntBitMaskA = map_3((width) => op_LeftShift(fromInt32(1), width), toArray(rangeDouble(0, 1, 128)));

/**
 * all bits with numbers < width = 1
 */
export function bigIntMask(width) {
    if (width <= 128) {
        return bigIntMaskA[width];
    }
    else {
        return op_Subtraction(op_LeftShift(fromOne(), width), fromOne());
    }
}

/**
 * single bit 1 (2 ** pos)
 */
export function bigIntBitMask(pos) {
    if (pos <= 128) {
        return bigIntBitMaskA[pos];
    }
    else {
        return op_LeftShift(fromOne(), pos);
    }
}

export function fastBit(n) {
    return new FastData(new FastBits(0, [n]), 1);
}

export function bitsToInt(lst) {
    if (!isEmpty(lst)) {
        const x = head(lst);
        const rest = tail(lst);
        return (equals(x, new Bit(0, [])) ? 0 : 1) + (bitsToInt(rest) * 2);
    }
    else {
        return 0;
    }
}

export function bitsToBig(lst) {
    if (!isEmpty(lst)) {
        const x = head(lst);
        const rest = tail(lst);
        return op_Addition(equals(x, new Bit(0, [])) ? fromInt32(0) : fromInt32(1), op_LeftShift(bitsToBig(rest), 1));
    }
    else {
        return fromInt32(0);
    }
}

/**
 * convert Wiredata to FastData equivalent
 */
export function wireToFast(wd) {
    const n = length(wd) | 0;
    const dat = (n <= 32) ? (new FastBits(0, [bitsToInt(wd)])) : (new FastBits(1, [bitsToBig(wd)]));
    return new FastData(dat, n);
}

/**
 * convert FastData to WireData equivalent
 */
export function fastToWire(f) {
    const matchValue = f.Dat;
    if (matchValue.tag === 1) {
        const x_1 = matchValue.fields[0];
        return map_1((n_1) => {
            if (equals_1(op_BitwiseAnd(x_1, bigIntBitMask(n_1)), fromInt32(0))) {
                return new Bit(0, []);
            }
            else {
                return new Bit(1, []);
            }
        }, toList(rangeDouble(0, 1, f.Width - 1)));
    }
    else {
        const x = matchValue.fields[0];
        return map_1((n) => {
            if (((x & ((1 << n) >>> 0)) >>> 0) === 0) {
                return new Bit(0, []);
            }
            else {
                return new Bit(1, []);
            }
        }, toList(rangeDouble(0, 1, f.Width - 1)));
    }
}

export const fastDataZero = new FastData(new FastBits(0, [0]), 1);

export const fastDataOne = new FastData(new FastBits(0, [1]), 1);

export function b2s(b) {
    const lsw = op_BitwiseAnd(b, op_Subtraction(op_LeftShift(fromInt32(1), 32), fromInt32(1)));
    const hex = toText(interpolate("%08x%P()", [toUInt32(lsw) >>> 0]));
    const msws = op_RightShift(b, 32);
    if (!equals_1(msws, fromInt32(0))) {
        return b2s(msws) + hex;
    }
    else {
        return hex;
    }
}

/**
 * Extract bit field (msb:lsb) from f. Bits are numbered little-endian from 0.
 * Note that for a single bit result the un-normalised version is used, so it will
 * be compatible with fast implementation of boolean logic.
 */
export function getBits(msb, lsb, f) {
    const outW = ((msb - lsb) + 1) | 0;
    const outWMask32 = (outW === 32) ? 4294967295 : (((1 << outW) >>> 0) - 1);
    const matchValue = f.Dat;
    if (matchValue.tag === 1) {
        const x_1 = matchValue.fields[0];
        const mask = bigIntMask(outW);
        const bits_1 = op_BitwiseAnd(op_RightShift(x_1, lsb), mask);
        let dat;
        if (outW <= 32) {
            if ((compare_1(bits_1, fromZero()) < 0) ? true : (compare_1(bits_1, op_LeftShift(fromOne(), 32)) >= 0)) {
                toConsole(`HELP! weird bits = ${toString(bits_1, "X")} mask = ${mask} msb,lsb = (${msb},${lsb})`);
            }
            dat = (new FastBits(0, [((toUInt32(bits_1) >>> 0) & outWMask32) >>> 0]));
        }
        else {
            dat = (new FastBits(1, [op_BitwiseAnd(bits_1, bigIntMask(outW))]));
        }
        return new FastData(dat, outW);
    }
    else {
        const x = matchValue.fields[0];
        const bits = ((x >>> lsb) & outWMask32) >>> 0;
        return new FastData(new FastBits(0, [bits]), outW);
    }
}

export function getBitsFromUInt32(msb, lsb, x) {
    const outW = ((msb - lsb) + 1) | 0;
    const outWMask32 = (outW === 32) ? 4294967295 : (((1 << outW) >>> 0) - 1);
    const bits = ((x >>> lsb) & outWMask32) >>> 0;
    return bits;
}

export function getBitsFromBigInt(msb, lsb, x) {
    const outW = ((msb - lsb) + 1) | 0;
    const mask = bigIntMask(outW);
    const bits = op_BitwiseAnd(op_RightShift(x, lsb), mask);
    return op_BitwiseAnd(bits, bigIntMask(outW));
}

export function getBitsFromBigIntToUInt32(msb, lsb, x) {
    const outW = ((msb - lsb) + 1) | 0;
    const outWMask32 = (outW === 32) ? 4294967295 : (((1 << outW) >>> 0) - 1);
    const mask = bigIntMask(outW);
    const bits = op_BitwiseAnd(op_RightShift(x, lsb), mask);
    if ((compare_1(bits, fromZero()) < 0) ? true : (compare_1(bits, op_LeftShift(fromOne(), 32)) >= 0)) {
        toConsole(`HELP! weird bits = ${toString(bits, "X")} mask = ${mask} msb,lsb = (${msb},${lsb})`);
    }
    return ((toUInt32(bits) >>> 0) & outWMask32) >>> 0;
}

export function FData__get_Width(this$) {
    if (this$.tag === 1) {
        const exp = this$.fields[0];
        return getAlgExpWidth(exp) | 0;
    }
    else {
        const d = this$.fields[0];
        return d.Width | 0;
    }
}

export function FData__get_fdToString(this$) {
    if (this$.tag === 1) {
        const exp = this$.fields[0];
        return expToString(exp);
    }
    else if (this$.fields[0].Dat.tag === 1) {
        const w_1 = this$.fields[0].Dat.fields[0];
        return toString(w_1);
    }
    else {
        const w = this$.fields[0].Dat.fields[0];
        return w.toString();
    }
}

export function FData__get_toExp(this$) {
    if (this$.tag === 0) {
        const fd = this$.fields[0];
        return new FastAlgExp(1, [fd]);
    }
    else {
        const exp = this$.fields[0];
        return exp;
    }
}

export function FData__get_toFastData(this$) {
    if (this$.tag === 0) {
        const fd = this$.fields[0];
        return fd;
    }
    else {
        return toFail(printf("Expected data, found Alg FData"));
    }
}

export function FData__get_toInt64(this$) {
    let w;
    if (this$.tag === 0) {
        if ((w = (this$.fields[0].Width | 0), w > 64)) {
            const w_1 = this$.fields[0].Width | 0;
            return toFail(printf("Help! Can\'t convert numbers wider than 64 bits to int64."));
        }
        else if (this$.fields[0].Dat.tag === 1) {
            const w_3 = this$.fields[0].Dat.fields[0];
            return toInt64(fromUInt64(toUInt64(fromBigInt(w_3))));
        }
        else {
            const w_2 = this$.fields[0].Dat.fields[0];
            return toInt64(fromUInt64(toUInt64(fromUInt32(w_2))));
        }
    }
    else {
        return toFail(printf("Can\'t convert Alg style FData to int64"));
    }
}

/**
 * for debugging - get a short usually unique truncation of the fId
 */
export function FastComponent__get_ShortId(this$) {
    const patternInput = this$.fId;
    const sid = patternInput[0];
    const ap = patternInput[1];
    return StringModule_SubstringLength(0, 5, sid);
}

export function GatherData__getFullName_4E1F3B82(this$, cid, ap) {
    return join(".", map_1((cid_1) => {
        const matchValue = tryFind(cid_1, this$.Labels);
        if (matchValue == null) {
            return "*";
        }
        else {
            const lab = matchValue;
            return lab;
        }
    }, append(ap, singleton(cid))));
}

export function GatherData__getSheetName_4E1F3B82(this$, cid, ap) {
    return map_1((cid_1) => {
        const matchValue = tryFind(cid_1, this$.Labels);
        if (matchValue == null) {
            return "*";
        }
        else {
            const lab = matchValue;
            return lab.toLocaleUpperCase();
        }
    }, append(ap, singleton(cid)));
}

export function sprintSimComponent(sComp) {
    const arg_1 = sprintInitial(20, toString_1(sComp.Type));
    return toText(printf("\'%A\': %20s"))(sComp.Label)(arg_1);
}

export function shortPSComp(comp) {
    let lab;
    const lab$0027 = comp.Label;
    lab = lab$0027;
    const matchValue_1 = comp.Type;
    if (matchValue_1.tag === 26) {
        const sc = matchValue_1.fields[0];
        return toText(printf("%s:Custom.(%s.%A->%A)"))(lab)(sc.Name)(sc.InputLabels)(sc.OutputLabels);
    }
    else {
        return toText(printf("%s:%A.{%A}"))(lab)(comp.Type)(comp.State);
    }
}

export function printSimGraph(sg) {
    const arg = join("\n", map_1((tupledArg) => {
        const comp = tupledArg[1];
        const id = tupledArg[0];
        return sprintSimComponent(comp) + id;
    }, toList_1(sg)));
    toConsole(printf("%s"))(arg);
}

export function tryGetCompLabel(compId, sg) {
    return defaultArg(map_4((_arg) => {
        const s = _arg;
        return s;
    }, map_4((comp) => comp.Label, tryPick((k, v) => (equals(k, compId) ? v : void 0), sg))), "\'Not in SimGraph\'");
}

export function extractLabel(label) {
    const name = label;
    return name;
}

export function mapKeys(map) {
    return Array.from(keys(map));
}

export function mapValues(map) {
    return Array.from(values(map));
}

export function mapItems(map) {
    return toArray_1(map);
}

//# sourceMappingURL=SimulatorTypes.fs.js.map
