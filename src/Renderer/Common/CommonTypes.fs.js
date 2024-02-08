import { Union, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { unit_type, array_type, bool_type, uint32_type, class_type, int64_type, list_type, tuple_type, option_type, int32_type, string_type, union_type, record_type, float64_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { max } from "../fable_modules/fable-library.4.1.4/Double.js";
import { printf, toFail, interpolate, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { FSharpChoice$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { find, cons, exists, contains, map, append, tryFind } from "../fable_modules/fable-library.4.1.4/List.js";
import { fail, string, index, succeed, andThen } from "../fable_modules/Thoth.Json.7.0.0/Decode.fs.js";
import { stringHash, uncurry3 } from "../fable_modules/fable-library.4.1.4/Util.js";
import { Optics_fst_, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89 } from "./Optics.fs.js";

export class XYPos extends Record {
    constructor(X, Y) {
        super();
        this.X = X;
        this.Y = Y;
    }
}

export function XYPos_$reflection() {
    return record_type("CommonTypes.XYPos", [], XYPos, () => [["X", float64_type], ["Y", float64_type]]);
}

function testXYPosComparison(a, b) {
    const left = a;
    const right = b;
    if (Math.abs(left.X - right.X) <= 1E-07) {
        return Math.abs(left.Y - right.Y) <= 1E-07;
    }
    else {
        return false;
    }
}

/**
 * display XYPos as string nicely for debugging
 */
export function pXY(_arg) {
    const y = _arg.Y;
    const x = _arg.X;
    if (max(Math.abs(x), Math.abs(y)) > 20) {
        return toText(interpolate("(%.0f%P(),%.0f%P())", [x, y]));
    }
    else {
        return toText(interpolate("(%.2f%P(),%.2f%P())", [x, y]));
    }
}

export class PortType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Input", "Output"];
    }
}

export function PortType_$reflection() {
    return union_type("CommonTypes.PortType", [], PortType, () => [[], []]);
}

export class Port extends Record {
    constructor(Id, PortNumber, PortType, HostId) {
        super();
        this.Id = Id;
        this.PortNumber = PortNumber;
        this.PortType = PortType;
        this.HostId = HostId;
    }
}

export function Port_$reflection() {
    return record_type("CommonTypes.Port", [], Port, () => [["Id", string_type], ["PortNumber", option_type(int32_type)], ["PortType", PortType_$reflection()], ["HostId", string_type]]);
}

export class PortId extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["PortId"];
    }
}

export function PortId_$reflection() {
    return union_type("CommonTypes.PortId", [], PortId, () => [[["Item", string_type]]]);
}

export class Width extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];
    }
}

export function Width_$reflection() {
    return union_type("CommonTypes.Width", [], Width, () => [[], [], [], [], [], [], [], []]);
}

export function Width__Text(this$) {
    switch (this$.tag) {
        case 1:
            return "2px";
        case 2:
            return "3px";
        case 3:
            return "4px";
        case 4:
            return "5px";
        case 5:
            return "6px";
        case 6:
            return "7px";
        case 7:
            return "8px";
        default:
            return "1px";
    }
}

export class CCForm extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["User", "Library", "ProtectedTopLevel", "ProtectedSubSheet", "Verilog"];
    }
}

export function CCForm_$reflection() {
    return union_type("CommonTypes.CCForm", [], CCForm, () => [[], [], [], [], [["Item", string_type]]]);
}

export class CustomComponentType extends Record {
    constructor(Name, InputLabels, OutputLabels, Form, Description) {
        super();
        this.Name = Name;
        this.InputLabels = InputLabels;
        this.OutputLabels = OutputLabels;
        this.Form = Form;
        this.Description = Description;
    }
}

export function CustomComponentType_$reflection() {
    return record_type("CommonTypes.CustomComponentType", [], CustomComponentType, () => [["Name", string_type], ["InputLabels", list_type(tuple_type(string_type, int32_type))], ["OutputLabels", list_type(tuple_type(string_type, int32_type))], ["Form", option_type(CCForm_$reflection())], ["Description", option_type(string_type)]]);
}

export class Memory extends Record {
    constructor(AddressWidth, WordWidth, Data) {
        super();
        this.AddressWidth = (AddressWidth | 0);
        this.WordWidth = (WordWidth | 0);
        this.Data = Data;
    }
}

export function Memory_$reflection() {
    return record_type("CommonTypes.Memory", [], Memory, () => [["AddressWidth", int32_type], ["WordWidth", int32_type], ["Data", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [int64_type, int64_type])]]);
}

export class InitMemData extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["FromData", "FromFile", "ToFile", "ToFileBadName", "UnsignedMultiplier", "SignedMultiplier"];
    }
}

export function InitMemData_$reflection() {
    return union_type("CommonTypes.InitMemData", [], InitMemData, () => [[], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [], []]);
}

export class Memory1 extends Record {
    constructor(Init, AddressWidth, WordWidth, Data) {
        super();
        this.Init = Init;
        this.AddressWidth = (AddressWidth | 0);
        this.WordWidth = (WordWidth | 0);
        this.Data = Data;
    }
}

export function Memory1_$reflection() {
    return record_type("CommonTypes.Memory1", [], Memory1, () => [["Init", InitMemData_$reflection()], ["AddressWidth", int32_type], ["WordWidth", int32_type], ["Data", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [int64_type, int64_type])]]);
}

export class ShiftComponentType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LSL", "LSR", "ASR"];
    }
}

export function ShiftComponentType_$reflection() {
    return union_type("CommonTypes.ShiftComponentType", [], ShiftComponentType, () => [[], [], []]);
}

export class NBitsArithmetic extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["Multiply"];
    }
}

export function NBitsArithmetic_$reflection() {
    return union_type("CommonTypes.NBitsArithmetic", [], NBitsArithmetic, () => [[]]);
}

export class ComponentType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Input1", "Output", "Viewer", "IOLabel", "NotConnected", "BusCompare1", "BusSelection", "Constant1", "Not", "Decode4", "GateN", "Mux2", "Mux4", "Mux8", "Demux2", "Demux4", "Demux8", "NbitsAdder", "NbitsAdderNoCin", "NbitsAdderNoCout", "NbitsAdderNoCinCout", "NbitsXor", "NbitsAnd", "NbitsNot", "NbitsOr", "NbitSpreader", "Custom", "MergeWires", "SplitWire", "MergeN", "SplitN", "DFF", "DFFE", "Register", "RegisterE", "Counter", "CounterNoLoad", "CounterNoEnable", "CounterNoEnableLoad", "AsyncROM1", "ROM1", "RAM1", "AsyncRAM1", "AsyncROM", "ROM", "RAM", "Shift", "BusCompare", "Input", "Constant"];
    }
}

export function ComponentType_$reflection() {
    return union_type("CommonTypes.ComponentType", [], ComponentType, () => [[["BusWidth", int32_type], ["DefaultValue", option_type(int32_type)]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [], [], [["BusWidth", int32_type], ["CompareValue", uint32_type], ["DialogTextValue", string_type]], [["OutputWidth", int32_type], ["OutputLSBit", int32_type]], [["Width", int32_type], ["ConstValue", int64_type], ["DialogTextValue", string_type]], [], [], [["GateType", string_type], ["NumInputs", int32_type]], [], [], [], [], [], [], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type], ["ArithmeticOp", option_type(NBitsArithmetic_$reflection())]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["Item", CustomComponentType_$reflection()]], [], [["BusWidth", int32_type]], [["NumInputs", int32_type]], [["NumInputs", int32_type], ["OutputWdiths", list_type(int32_type)], ["OutputLSBits", list_type(int32_type)]], [], [], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["Item", Memory1_$reflection()]], [["Item", Memory1_$reflection()]], [["Item", Memory1_$reflection()]], [["Item", Memory1_$reflection()]], [["Item", Memory_$reflection()]], [["Item", Memory_$reflection()]], [["Item", Memory_$reflection()]], [["BusWidth", int32_type], ["ShifterWidth", int32_type], ["ShiftType", ShiftComponentType_$reflection()]], [["BusWidth", int32_type], ["CompareValue", uint32_type]], [["BusWidth", int32_type]], [["Width", int32_type], ["ConstValue", int64_type]]]);
}

/**
 * Active pattern which matches 2-input gate component types.
 * NB - NOT gates are not included here.
 */
export function $007CIsBinaryGate$007CNotBinaryGate$007C(cType) {
    let n;
    let matchResult, n_1;
    if (cType.tag === 10) {
        if ((n = (cType.fields[1] | 0), n === 2)) {
            matchResult = 0;
            n_1 = cType.fields[1];
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
            return new FSharpChoice$2(0, [void 0]);
        default:
            return new FSharpChoice$2(1, [void 0]);
    }
}

export function $007CIsGate$007CNoGate$007C(cType) {
    if (cType.tag === 10) {
        return new FSharpChoice$2(0, [void 0]);
    }
    else {
        return new FSharpChoice$2(1, [void 0]);
    }
}

/**
 * get memory component type constructor
 * NB only works with new-style memory components
 */
export function getMemType(cType) {
    switch (cType.tag) {
        case 41:
            return (arg) => (new ComponentType(41, [arg]));
        case 42:
            return (arg_1) => (new ComponentType(42, [arg_1]));
        case 40:
            return (arg_2) => (new ComponentType(40, [arg_2]));
        case 39:
            return (arg_3) => (new ComponentType(39, [arg_3]));
        default: {
            const clo = toFail(`Can't get memory type from ${cType}`);
            return clo;
        }
    }
}

export function $007CMemory$007C_$007C(typ) {
    let matchResult, mem;
    switch (typ.tag) {
        case 41: {
            matchResult = 0;
            mem = typ.fields[0];
            break;
        }
        case 42: {
            matchResult = 0;
            mem = typ.fields[0];
            break;
        }
        case 40: {
            matchResult = 0;
            mem = typ.fields[0];
            break;
        }
        case 39: {
            matchResult = 0;
            mem = typ.fields[0];
            break;
        }
        default:
            matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return mem;
        default:
            return void 0;
    }
}

export function $007CMemoryAndType$007C_$007C(typ) {
    switch (typ.tag) {
        case 41: {
            const mem = typ.fields[0];
            return [(arg) => (new ComponentType(41, [arg])), mem];
        }
        case 42: {
            const mem_1 = typ.fields[0];
            return [(arg_1) => (new ComponentType(42, [arg_1])), mem_1];
        }
        case 40: {
            const mem_2 = typ.fields[0];
            return [(arg_2) => (new ComponentType(40, [arg_2])), mem_2];
        }
        case 39: {
            const mem_3 = typ.fields[0];
            return [(arg_3) => (new ComponentType(39, [arg_3])), mem_3];
        }
        default:
            return void 0;
    }
}

export class Rotation extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Degree0", "Degree90", "Degree180", "Degree270"];
    }
}

export function Rotation_$reflection() {
    return union_type("CommonTypes.Rotation", [], Rotation, () => [[], [], [], []]);
}

export class STransform extends Record {
    constructor(Rotation, flipped) {
        super();
        this.Rotation = Rotation;
        this.flipped = flipped;
    }
}

export function STransform_$reflection() {
    return record_type("CommonTypes.STransform", [], STransform, () => [["Rotation", Rotation_$reflection()], ["flipped", bool_type]]);
}

export class Edge extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Top", "Bottom", "Left", "Right"];
    }
}

export function Edge_$reflection() {
    return union_type("CommonTypes.Edge", [], Edge, () => [[], [], [], []]);
}

/**
 * HLP23: AUTHOR dgs119
 */
export function Edge__get_Opposite(this$) {
    switch (this$.tag) {
        case 0:
            return new Edge(1, []);
        case 1:
            return new Edge(0, []);
        case 2:
            return new Edge(3, []);
        default:
            return new Edge(2, []);
    }
}

export class Direction extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Clockwise", "AntiClockwise"];
    }
}

export function Direction_$reflection() {
    return union_type("CommonTypes.Direction", [], Direction, () => [[], []]);
}

export function Direction__get_Opposite(this$) {
    if (this$.tag === 0) {
        return new Direction(1, []);
    }
    else {
        return new Direction(0, []);
    }
}

export class BoundingBox extends Record {
    constructor(TopLeft, W, H) {
        super();
        this.TopLeft = TopLeft;
        this.W = W;
        this.H = H;
    }
}

export function BoundingBox_$reflection() {
    return record_type("CommonTypes.BoundingBox", [], BoundingBox, () => [["TopLeft", XYPos_$reflection()], ["W", float64_type], ["H", float64_type]]);
}

export function BoundingBox__Centre(this$) {
    const left = this$.TopLeft;
    const right = new XYPos(this$.W / 2, this$.H / 2);
    return new XYPos(left.X + right.X, left.Y + right.Y);
}

export const topLeft_ = [(a) => a.TopLeft, (s) => ((a_1) => (new BoundingBox(s, a_1.W, a_1.H)))];

export class SymbolInfo extends Record {
    constructor(LabelBoundingBox, LabelRotation, STransform, ReversedInputPorts, PortOrientation, PortOrder, HScale, VScale) {
        super();
        this.LabelBoundingBox = LabelBoundingBox;
        this.LabelRotation = LabelRotation;
        this.STransform = STransform;
        this.ReversedInputPorts = ReversedInputPorts;
        this.PortOrientation = PortOrientation;
        this.PortOrder = PortOrder;
        this.HScale = HScale;
        this.VScale = VScale;
    }
}

export function SymbolInfo_$reflection() {
    return record_type("CommonTypes.SymbolInfo", [], SymbolInfo, () => [["LabelBoundingBox", option_type(BoundingBox_$reflection())], ["LabelRotation", option_type(Rotation_$reflection())], ["STransform", STransform_$reflection()], ["ReversedInputPorts", option_type(bool_type)], ["PortOrientation", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, Edge_$reflection()])], ["PortOrder", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [Edge_$reflection(), list_type(string_type)])], ["HScale", option_type(float64_type)], ["VScale", option_type(float64_type)]]);
}

export const portOrder_ = [(c) => c.PortOrder, (n) => ((c_1) => (new SymbolInfo(c_1.LabelBoundingBox, c_1.LabelRotation, c_1.STransform, c_1.ReversedInputPorts, c_1.PortOrientation, n, c_1.HScale, c_1.VScale)))];

export const portOrientation_ = [(c) => c.PortOrientation, (n) => ((c_1) => (new SymbolInfo(c_1.LabelBoundingBox, c_1.LabelRotation, c_1.STransform, c_1.ReversedInputPorts, n, c_1.PortOrder, c_1.HScale, c_1.VScale)))];

export function getSTransformWithDefault(infoOpt) {
    if (infoOpt != null) {
        const inf = infoOpt;
        return inf.STransform;
    }
    else {
        return new STransform(new Rotation(0, []), false);
    }
}

export class Component extends Record {
    constructor(Id, Type, Label, InputPorts, OutputPorts, X, Y, H, W, SymbolInfo) {
        super();
        this.Id = Id;
        this.Type = Type;
        this.Label = Label;
        this.InputPorts = InputPorts;
        this.OutputPorts = OutputPorts;
        this.X = X;
        this.Y = Y;
        this.H = H;
        this.W = W;
        this.SymbolInfo = SymbolInfo;
    }
}

export function Component_$reflection() {
    return record_type("CommonTypes.Component", [], Component, () => [["Id", string_type], ["Type", ComponentType_$reflection()], ["Label", string_type], ["InputPorts", list_type(Port_$reflection())], ["OutputPorts", list_type(Port_$reflection())], ["X", float64_type], ["Y", float64_type], ["H", float64_type], ["W", float64_type], ["SymbolInfo", option_type(SymbolInfo_$reflection())]]);
}

export function Component__getPort_Z4D1575C7(this$, _arg) {
    const portId = _arg.fields[0];
    return tryFind((port) => (port.Id === portId), append(this$.InputPorts, this$.OutputPorts));
}

export const type_ = [(c) => c.Type, (n) => ((c_1) => (new Component(c_1.Id, n, c_1.Label, c_1.InputPorts, c_1.OutputPorts, c_1.X, c_1.Y, c_1.H, c_1.W, c_1.SymbolInfo)))];

export const inputPorts_ = [(c) => c.InputPorts, (n) => ((c_1) => (new Component(c_1.Id, c_1.Type, c_1.Label, n, c_1.OutputPorts, c_1.X, c_1.Y, c_1.H, c_1.W, c_1.SymbolInfo)))];

export const outputPorts_ = [(c) => c.OutputPorts, (n) => ((c_1) => (new Component(c_1.Id, c_1.Type, c_1.Label, c_1.InputPorts, n, c_1.X, c_1.Y, c_1.H, c_1.W, c_1.SymbolInfo)))];

export const h_ = [(c) => c.H, (n) => ((c_1) => (new Component(c_1.Id, c_1.Type, c_1.Label, c_1.InputPorts, c_1.OutputPorts, c_1.X, c_1.Y, n, c_1.W, c_1.SymbolInfo)))];

export const w_ = [(c) => c.W, (n) => ((c_1) => (new Component(c_1.Id, c_1.Type, c_1.Label, c_1.InputPorts, c_1.OutputPorts, c_1.X, c_1.Y, c_1.H, n, c_1.SymbolInfo)))];

export class Connection extends Record {
    constructor(Id, Source, Target, Vertices) {
        super();
        this.Id = Id;
        this.Source = Source;
        this.Target = Target;
        this.Vertices = Vertices;
    }
}

export function Connection_$reflection() {
    return record_type("CommonTypes.Connection", [], Connection, () => [["Id", string_type], ["Source", Port_$reflection()], ["Target", Port_$reflection()], ["Vertices", list_type(tuple_type(float64_type, float64_type, bool_type))]]);
}

export class ReducedCanvasState extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["ReducedCanvasState"];
    }
}

export function ReducedCanvasState_$reflection() {
    return union_type("CommonTypes.ReducedCanvasState", [], ReducedCanvasState, () => [[["Item", tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))]]]);
}

export function unreduced(_arg) {
    const rConns = _arg.fields[0][1];
    const rComps = _arg.fields[0][0];
    return [rComps, rConns];
}

export class JSONComponent_ComponentType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Input1", "Output", "Viewer", "IOLabel", "NotConnected", "BusCompare1", "BusSelection", "Constant1", "Not", "And", "Or", "Xor", "Nand", "Nor", "Xnor", "Decode4", "GateN", "Mux2", "Mux4", "Mux8", "Demux2", "Demux4", "Demux8", "NbitsAdder", "NbitsAdderNoCin", "NbitsAdderNoCout", "NbitsAdderNoCinCout", "NbitsXor", "NbitsAnd", "NbitsNot", "NbitsOr", "NbitSpreader", "Custom", "MergeWires", "SplitWire", "MergeN", "SplitN", "DFF", "DFFE", "Register", "RegisterE", "Counter", "CounterNoLoad", "CounterNoEnable", "CounterNoEnableLoad", "AsyncROM1", "ROM1", "RAM1", "AsyncRAM1", "AsyncROM", "ROM", "RAM", "Shift", "BusCompare", "Input", "Constant"];
    }
}

export function JSONComponent_ComponentType_$reflection() {
    return union_type("CommonTypes.JSONComponent.ComponentType", [], JSONComponent_ComponentType, () => [[["BusWidth", int32_type], ["DefaultValue", option_type(int32_type)]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [], [], [["BusWidth", int32_type], ["CompareValue", uint32_type], ["DialogTextValue", string_type]], [["OutputWidth", int32_type], ["OutputLSBit", int32_type]], [["Width", int32_type], ["ConstValue", int64_type], ["DialogTextValue", string_type]], [], [], [], [], [], [], [], [], [["GateType", string_type], ["NumInputs", int32_type]], [], [], [], [], [], [], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type], ["ArithmeticOp", option_type(NBitsArithmetic_$reflection())]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["Item", CustomComponentType_$reflection()]], [], [["BusWidth", int32_type]], [["NumInputs", int32_type]], [["NumInputs", int32_type], ["OutputWdiths", list_type(int32_type)], ["OutputLSBits", list_type(int32_type)]], [], [], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["Item", Memory1_$reflection()]], [["Item", Memory1_$reflection()]], [["Item", Memory1_$reflection()]], [["Item", Memory1_$reflection()]], [["Item", Memory_$reflection()]], [["Item", Memory_$reflection()]], [["Item", Memory_$reflection()]], [["BusWidth", int32_type], ["ShifterWidth", int32_type], ["ShiftType", ShiftComponentType_$reflection()]], [["BusWidth", int32_type], ["CompareValue", uint32_type]], [["BusWidth", int32_type]], [["Width", int32_type], ["ConstValue", int64_type]]]);
}

export class JSONComponent_Component extends Record {
    constructor(Id, Type, Label, InputPorts, OutputPorts, X, Y, H, W, SymbolInfo) {
        super();
        this.Id = Id;
        this.Type = Type;
        this.Label = Label;
        this.InputPorts = InputPorts;
        this.OutputPorts = OutputPorts;
        this.X = X;
        this.Y = Y;
        this.H = H;
        this.W = W;
        this.SymbolInfo = SymbolInfo;
    }
}

export function JSONComponent_Component_$reflection() {
    return record_type("CommonTypes.JSONComponent.Component", [], JSONComponent_Component, () => [["Id", string_type], ["Type", JSONComponent_ComponentType_$reflection()], ["Label", string_type], ["InputPorts", list_type(Port_$reflection())], ["OutputPorts", list_type(Port_$reflection())], ["X", float64_type], ["Y", float64_type], ["H", float64_type], ["W", float64_type], ["SymbolInfo", option_type(SymbolInfo_$reflection())]]);
}

/**
 * Transforms JSON components (parsed from JSON)  to current components
 * Normally this means converting legacy JSON component types into new ones.
 * However it could in principle be more radical.
 * The default transform unboxes the value which works when there is no chnage in the JS value
 * representation
 */
export function convertFromJSONComponent(comp) {
    const newType = (ct) => {
        switch (ct.tag) {
            case 1: {
                const x = ct.fields[0] | 0;
                return new ComponentType(1, [x]);
            }
            case 2: {
                const x_1 = ct.fields[0] | 0;
                return new ComponentType(2, [x_1]);
            }
            case 3:
                return new ComponentType(3, []);
            case 4:
                return new ComponentType(4, []);
            case 5: {
                const c = ct.fields[2];
                const b_1 = ct.fields[1];
                const a_1 = ct.fields[0] | 0;
                return new ComponentType(5, [a_1, b_1, c]);
            }
            case 6: {
                const b_2 = ct.fields[1] | 0;
                const a_2 = ct.fields[0] | 0;
                return new ComponentType(6, [a_2, b_2]);
            }
            case 7: {
                const c_1 = ct.fields[2];
                const b_3 = ct.fields[1];
                const a_3 = ct.fields[0] | 0;
                return new ComponentType(7, [a_3, b_3, c_1]);
            }
            case 8:
                return new ComponentType(8, []);
            case 9:
                return new ComponentType(10, ["and", 2]);
            case 10:
                return new ComponentType(10, ["or", 2]);
            case 11:
                return new ComponentType(10, ["xor", 2]);
            case 12:
                return new ComponentType(10, ["nand", 2]);
            case 13:
                return new ComponentType(10, ["nor", 2]);
            case 14:
                return new ComponentType(10, ["xnor", 2]);
            case 16: {
                const n = ct.fields[1] | 0;
                const gateType = ct.fields[0];
                return new ComponentType(10, [gateType, n]);
            }
            case 15:
                return new ComponentType(9, []);
            case 17:
                return new ComponentType(11, []);
            case 18:
                return new ComponentType(12, []);
            case 19:
                return new ComponentType(13, []);
            case 20:
                return new ComponentType(14, []);
            case 21:
                return new ComponentType(15, []);
            case 22:
                return new ComponentType(16, []);
            case 23: {
                const x_2 = ct.fields[0] | 0;
                return new ComponentType(17, [x_2]);
            }
            case 24: {
                const x_3 = ct.fields[0] | 0;
                return new ComponentType(18, [x_3]);
            }
            case 25: {
                const x_4 = ct.fields[0] | 0;
                return new ComponentType(19, [x_4]);
            }
            case 26: {
                const x_5 = ct.fields[0] | 0;
                return new ComponentType(20, [x_5]);
            }
            case 27: {
                const b_4 = ct.fields[1];
                const a_4 = ct.fields[0] | 0;
                return new ComponentType(21, [a_4, b_4]);
            }
            case 28: {
                const x_6 = ct.fields[0] | 0;
                return new ComponentType(22, [x_6]);
            }
            case 29: {
                const x_7 = ct.fields[0] | 0;
                return new ComponentType(23, [x_7]);
            }
            case 30: {
                const x_8 = ct.fields[0] | 0;
                return new ComponentType(24, [x_8]);
            }
            case 31: {
                const x_9 = ct.fields[0] | 0;
                return new ComponentType(25, [x_9]);
            }
            case 32: {
                const x_10 = ct.fields[0];
                return new ComponentType(26, [x_10]);
            }
            case 33:
                return new ComponentType(27, []);
            case 35: {
                const x_11 = ct.fields[0] | 0;
                return new ComponentType(29, [x_11]);
            }
            case 34: {
                const x_12 = ct.fields[0] | 0;
                return new ComponentType(28, [x_12]);
            }
            case 36: {
                const c_2 = ct.fields[2];
                const b_5 = ct.fields[1];
                const a_5 = ct.fields[0] | 0;
                return new ComponentType(30, [a_5, b_5, c_2]);
            }
            case 37:
                return new ComponentType(31, []);
            case 38:
                return new ComponentType(32, []);
            case 39: {
                const x_13 = ct.fields[0] | 0;
                return new ComponentType(33, [x_13]);
            }
            case 40: {
                const x_14 = ct.fields[0] | 0;
                return new ComponentType(34, [x_14]);
            }
            case 41: {
                const x_15 = ct.fields[0] | 0;
                return new ComponentType(35, [x_15]);
            }
            case 42: {
                const x_16 = ct.fields[0] | 0;
                return new ComponentType(36, [x_16]);
            }
            case 43: {
                const x_17 = ct.fields[0] | 0;
                return new ComponentType(37, [x_17]);
            }
            case 44: {
                const x_18 = ct.fields[0] | 0;
                return new ComponentType(38, [x_18]);
            }
            case 45: {
                const x_19 = ct.fields[0];
                return new ComponentType(39, [x_19]);
            }
            case 46: {
                const x_20 = ct.fields[0];
                return new ComponentType(40, [x_20]);
            }
            case 47: {
                const x_21 = ct.fields[0];
                return new ComponentType(41, [x_21]);
            }
            case 48: {
                const x_22 = ct.fields[0];
                return new ComponentType(42, [x_22]);
            }
            case 49: {
                const x_23 = ct.fields[0];
                return new ComponentType(43, [x_23]);
            }
            case 50: {
                const x_24 = ct.fields[0];
                return new ComponentType(44, [x_24]);
            }
            case 51: {
                const x_25 = ct.fields[0];
                return new ComponentType(45, [x_25]);
            }
            case 52: {
                const c_3 = ct.fields[2];
                const b_6 = ct.fields[1] | 0;
                const a_6 = ct.fields[0] | 0;
                return new ComponentType(46, [a_6, b_6, c_3]);
            }
            case 55: {
                const w = ct.fields[0] | 0;
                const v = ct.fields[1];
                return new ComponentType(7, [w, v, toText(printf("%d"))(v)]);
            }
            case 54: {
                const n_1 = ct.fields[0] | 0;
                return new ComponentType(0, [n_1, void 0]);
            }
            case 53: {
                const w_1 = ct.fields[0] | 0;
                const v_1 = ct.fields[1];
                return new ComponentType(5, [w_1, v_1, toText(printf("%x"))(v_1)]);
            }
            default: {
                const b = ct.fields[1];
                const a = ct.fields[0] | 0;
                return new ComponentType(0, [a, b]);
            }
        }
    };
    const inputRecord = comp;
    return new Component(inputRecord.Id, newType(comp.Type), inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, inputRecord.X, inputRecord.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo);
}

/**
 * Transforms normal Components into JSON Components which can be saved.
 * This is always an identity transformation since the normal ComponentType
 * muts be strict subset of teh JSON ComponentType.
 * unboxing is ok here because we do not use equality in the conversion to JSON.
 */
export function convertToJSONComponent(comp) {
    let newType;
    const matchValue = comp.Type;
    switch (matchValue.tag) {
        case 1: {
            const w = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(1, [w]));
            break;
        }
        case 2: {
            const w_1 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(2, [w_1]));
            break;
        }
        case 3: {
            newType = (new JSONComponent_ComponentType(3, []));
            break;
        }
        case 4: {
            newType = (new JSONComponent_ComponentType(4, []));
            break;
        }
        case 5: {
            const w_2 = matchValue.fields[0] | 0;
            const v = matchValue.fields[1];
            const d = matchValue.fields[2];
            newType = (new JSONComponent_ComponentType(5, [w_2, v, d]));
            break;
        }
        case 6: {
            const w_3 = matchValue.fields[0] | 0;
            const b_1 = matchValue.fields[1] | 0;
            newType = (new JSONComponent_ComponentType(6, [w_3, b_1]));
            break;
        }
        case 7: {
            const w_4 = matchValue.fields[0] | 0;
            const v_1 = matchValue.fields[1];
            const d_1 = matchValue.fields[2];
            newType = (new JSONComponent_ComponentType(7, [w_4, v_1, d_1]));
            break;
        }
        case 8: {
            newType = (new JSONComponent_ComponentType(8, []));
            break;
        }
        case 9: {
            newType = (new JSONComponent_ComponentType(15, []));
            break;
        }
        case 10: {
            const t = matchValue.fields[0];
            const n = matchValue.fields[1] | 0;
            newType = (new JSONComponent_ComponentType(16, [t, n]));
            break;
        }
        case 11: {
            newType = (new JSONComponent_ComponentType(17, []));
            break;
        }
        case 12: {
            newType = (new JSONComponent_ComponentType(18, []));
            break;
        }
        case 13: {
            newType = (new JSONComponent_ComponentType(19, []));
            break;
        }
        case 14: {
            newType = (new JSONComponent_ComponentType(20, []));
            break;
        }
        case 15: {
            newType = (new JSONComponent_ComponentType(21, []));
            break;
        }
        case 16: {
            newType = (new JSONComponent_ComponentType(22, []));
            break;
        }
        case 17: {
            const w_5 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(23, [w_5]));
            break;
        }
        case 18: {
            const w_6 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(24, [w_6]));
            break;
        }
        case 19: {
            const w_7 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(25, [w_7]));
            break;
        }
        case 20: {
            const w_8 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(26, [w_8]));
            break;
        }
        case 21: {
            const w_9 = matchValue.fields[0] | 0;
            const op = matchValue.fields[1];
            newType = (new JSONComponent_ComponentType(27, [w_9, op]));
            break;
        }
        case 22: {
            const w_10 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(28, [w_10]));
            break;
        }
        case 23: {
            const w_11 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(29, [w_11]));
            break;
        }
        case 24: {
            const w_12 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(30, [w_12]));
            break;
        }
        case 25: {
            const w_13 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(31, [w_13]));
            break;
        }
        case 26: {
            const t_1 = matchValue.fields[0];
            newType = (new JSONComponent_ComponentType(32, [t_1]));
            break;
        }
        case 27: {
            newType = (new JSONComponent_ComponentType(33, []));
            break;
        }
        case 29: {
            const x = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(35, [x]));
            break;
        }
        case 28: {
            const w_14 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(34, [w_14]));
            break;
        }
        case 30: {
            const c = matchValue.fields[2];
            const b_2 = matchValue.fields[1];
            const a_1 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(36, [a_1, b_2, c]));
            break;
        }
        case 31: {
            newType = (new JSONComponent_ComponentType(37, []));
            break;
        }
        case 32: {
            newType = (new JSONComponent_ComponentType(38, []));
            break;
        }
        case 33: {
            const w_15 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(39, [w_15]));
            break;
        }
        case 34: {
            const w_16 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(40, [w_16]));
            break;
        }
        case 35: {
            const w_17 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(41, [w_17]));
            break;
        }
        case 36: {
            const w_18 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(42, [w_18]));
            break;
        }
        case 37: {
            const w_19 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(43, [w_19]));
            break;
        }
        case 38: {
            const w_20 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(44, [w_20]));
            break;
        }
        case 39: {
            const m = matchValue.fields[0];
            newType = (new JSONComponent_ComponentType(45, [m]));
            break;
        }
        case 40: {
            const m_1 = matchValue.fields[0];
            newType = (new JSONComponent_ComponentType(46, [m_1]));
            break;
        }
        case 41: {
            const m_2 = matchValue.fields[0];
            newType = (new JSONComponent_ComponentType(47, [m_2]));
            break;
        }
        case 42: {
            const m_3 = matchValue.fields[0];
            newType = (new JSONComponent_ComponentType(48, [m_3]));
            break;
        }
        case 43: {
            const m_4 = matchValue.fields[0];
            newType = (new JSONComponent_ComponentType(49, [m_4]));
            break;
        }
        case 44: {
            const m_5 = matchValue.fields[0];
            newType = (new JSONComponent_ComponentType(50, [m_5]));
            break;
        }
        case 45: {
            const m_6 = matchValue.fields[0];
            newType = (new JSONComponent_ComponentType(51, [m_6]));
            break;
        }
        case 46: {
            const w2 = matchValue.fields[1] | 0;
            const w1 = matchValue.fields[0] | 0;
            const t_2 = matchValue.fields[2];
            newType = (new JSONComponent_ComponentType(52, [w1, w2, t_2]));
            break;
        }
        case 47: {
            const w_21 = matchValue.fields[0] | 0;
            const v_2 = matchValue.fields[1];
            newType = (new JSONComponent_ComponentType(53, [w_21, v_2]));
            break;
        }
        case 48: {
            const w_22 = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(54, [w_22]));
            break;
        }
        case 49: {
            const w_23 = matchValue.fields[0] | 0;
            const v_3 = matchValue.fields[1];
            newType = (new JSONComponent_ComponentType(55, [w_23, v_3]));
            break;
        }
        default: {
            const b = matchValue.fields[1];
            const a = matchValue.fields[0] | 0;
            newType = (new JSONComponent_ComponentType(0, [a, b]));
        }
    }
    const inputRecord = comp;
    return new JSONComponent_Component(inputRecord.Id, newType, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, inputRecord.X, inputRecord.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo);
}

export class LegacyCanvas_LegacyComponent extends Record {
    constructor(Id, Type, Label, InputPorts, OutputPorts, X, Y, H, W) {
        super();
        this.Id = Id;
        this.Type = Type;
        this.Label = Label;
        this.InputPorts = InputPorts;
        this.OutputPorts = OutputPorts;
        this.X = X;
        this.Y = Y;
        this.H = H;
        this.W = W;
    }
}

export function LegacyCanvas_LegacyComponent_$reflection() {
    return record_type("CommonTypes.LegacyCanvas.LegacyComponent", [], LegacyCanvas_LegacyComponent, () => [["Id", string_type], ["Type", JSONComponent_ComponentType_$reflection()], ["Label", string_type], ["InputPorts", list_type(Port_$reflection())], ["OutputPorts", list_type(Port_$reflection())], ["X", float64_type], ["Y", float64_type], ["H", float64_type], ["W", float64_type]]);
}

export class LegacyCanvas_LegacyConnection extends Record {
    constructor(Id, Source, Target, Vertices) {
        super();
        this.Id = Id;
        this.Source = Source;
        this.Target = Target;
        this.Vertices = Vertices;
    }
}

export function LegacyCanvas_LegacyConnection_$reflection() {
    return record_type("CommonTypes.LegacyCanvas.LegacyConnection", [], LegacyCanvas_LegacyConnection, () => [["Id", string_type], ["Source", Port_$reflection()], ["Target", Port_$reflection()], ["Vertices", list_type(tuple_type(float64_type, float64_type))]]);
}

export function legacyTypesConvert(lComps, lConns) {
    const convertConnection = (c) => (new Connection(c.Id, c.Source, c.Target, map((_arg) => {
        let y, x;
        if ((y = _arg[1], (x = _arg[0], (x >= 0) && (y >= 0)))) {
            const y_1 = _arg[1];
            const x_1 = _arg[0];
            return [x_1, y_1, false];
        }
        else {
            const y_2 = _arg[1];
            const x_2 = _arg[0];
            return [Math.abs(x_2), Math.abs(y_2), true];
        }
    }, c.Vertices)));
    const convertComponent = (comp) => (new JSONComponent_Component(comp.Id, comp.Type, comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, void 0));
    const comps = map(convertComponent, lComps);
    const conns = map(convertConnection, lConns);
    return [comps, conns];
}

export class WireWidth extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Configured", "Unconfigured", "ErrorWidth"];
    }
}

export function WireWidth_$reflection() {
    return union_type("CommonTypes.WireWidth", [], WireWidth, () => [[["Item", int32_type]], [], []]);
}

export class NumberBase extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Hex", "Dec", "Bin", "SDec"];
    }
}

export function NumberBase_$reflection() {
    return union_type("CommonTypes.NumberBase", [], NumberBase, () => [[], [], [], []]);
}

export class HighLightColor extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Red", "Blue", "Yellow", "Green", "Orange", "Grey", "White", "Purple", "DarkSlateGrey", "Thistle", "Brown", "SkyBlue"];
    }
}

export function HighLightColor_$reflection() {
    return union_type("CommonTypes.HighLightColor", [], HighLightColor, () => [[], [], [], [], [], [], [], [], [], [], [], []]);
}

export function HighLightColor__Text(this$) {
    switch (this$.tag) {
        case 0:
            return "Red";
        case 1:
            return "Blue";
        case 11:
            return "Skyblue";
        case 2:
            return "Yellow";
        case 3:
            return "Green";
        case 5:
            return "Grey";
        case 7:
            return "Purple";
        case 8:
            return "darkslategrey";
        case 9:
            return "thistle";
        default: {
            const c = this$;
            return toText(printf("%A"))(c);
        }
    }
}

export function componentIdEncoder(cid) {
    const s = cid;
    return s;
}

export const componentIdDecoder = (path_6) => ((value_5) => andThen(uncurry3((caseName) => {
    if (caseName === "ComponentId") {
        return (path_4) => ((value_4) => andThen(succeed, (path_3, value_3) => index(1, string, path_3, value_3), path_4, value_4));
    }
    else {
        const invalid = caseName;
        const msg = toText(printf("Invalid case name: %s"))(invalid);
        return (path_5) => ((arg20$0040_1) => fail(msg, path_5, arg20$0040_1));
    }
}), (path_1, value_1) => index(0, string, path_1, value_1), path_6, value_5));

export class NLTarget extends Record {
    constructor(TargetCompId, TargetInputPort, TargetConnId) {
        super();
        this.TargetCompId = TargetCompId;
        this.TargetInputPort = TargetInputPort;
        this.TargetConnId = TargetConnId;
    }
}

export function NLTarget_$reflection() {
    return record_type("CommonTypes.NLTarget", [], NLTarget, () => [["TargetCompId", string_type], ["TargetInputPort", int32_type], ["TargetConnId", string_type]]);
}

export class NLSource extends Record {
    constructor(SourceCompId, TargetOutputPort, SourceConnId) {
        super();
        this.SourceCompId = SourceCompId;
        this.TargetOutputPort = TargetOutputPort;
        this.SourceConnId = SourceConnId;
    }
}

export function NLSource_$reflection() {
    return record_type("CommonTypes.NLSource", [], NLSource, () => [["SourceCompId", string_type], ["TargetOutputPort", int32_type], ["SourceConnId", string_type]]);
}

export class NetListComponent extends Record {
    constructor(NLId, Type, NLLabel, NLInputs, NLOutputs) {
        super();
        this.NLId = NLId;
        this.Type = Type;
        this.NLLabel = NLLabel;
        this.NLInputs = NLInputs;
        this.NLOutputs = NLOutputs;
    }
}

export function NetListComponent_$reflection() {
    return record_type("CommonTypes.NetListComponent", [], NetListComponent, () => [["NLId", string_type], ["Type", ComponentType_$reflection()], ["NLLabel", string_type], ["NLInputs", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [int32_type, option_type(NLSource_$reflection())])], ["NLOutputs", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [int32_type, list_type(NLTarget_$reflection())])]]);
}

export class WaveIndexT extends Record {
    constructor(SimArrayIndex, Id, PortType, PortNumber) {
        super();
        this.SimArrayIndex = (SimArrayIndex | 0);
        this.Id = Id;
        this.PortType = PortType;
        this.PortNumber = (PortNumber | 0);
    }
}

export function WaveIndexT_$reflection() {
    return record_type("CommonTypes.WaveIndexT", [], WaveIndexT, () => [["SimArrayIndex", int32_type], ["Id", tuple_type(string_type, list_type(string_type))], ["PortType", PortType_$reflection()], ["PortNumber", int32_type]]);
}

export class SavedWaveInfo extends Record {
    constructor(SelectedWaves, Radix, WaveformColumnWidth, ShownCycles, SelectedRams, SelectedFRams, ClkWidth, Cursor, LastClk, DisplayedPortIds) {
        super();
        this.SelectedWaves = SelectedWaves;
        this.Radix = Radix;
        this.WaveformColumnWidth = WaveformColumnWidth;
        this.ShownCycles = ShownCycles;
        this.SelectedRams = SelectedRams;
        this.SelectedFRams = SelectedFRams;
        this.ClkWidth = ClkWidth;
        this.Cursor = Cursor;
        this.LastClk = LastClk;
        this.DisplayedPortIds = DisplayedPortIds;
    }
}

export function SavedWaveInfo_$reflection() {
    return record_type("CommonTypes.SavedWaveInfo", [], SavedWaveInfo, () => [["SelectedWaves", option_type(list_type(WaveIndexT_$reflection()))], ["Radix", option_type(NumberBase_$reflection())], ["WaveformColumnWidth", option_type(float64_type)], ["ShownCycles", option_type(int32_type)], ["SelectedRams", option_type(class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, string_type]))], ["SelectedFRams", option_type(class_type("Microsoft.FSharp.Collections.FSharpMap`2", [tuple_type(string_type, list_type(string_type)), string_type]))], ["ClkWidth", option_type(float64_type)], ["Cursor", option_type(uint32_type)], ["LastClk", option_type(uint32_type)], ["DisplayedPortIds", option_type(array_type(string_type))]]);
}

export class SheetInfo extends Record {
    constructor(Form, Description) {
        super();
        this.Form = Form;
        this.Description = Description;
    }
}

export function SheetInfo_$reflection() {
    return record_type("CommonTypes.SheetInfo", [], SheetInfo, () => [["Form", option_type(CCForm_$reflection())], ["Description", option_type(string_type)]]);
}

export class LoadedComponent extends Record {
    constructor(Name, TimeStamp, FilePath, WaveInfo, CanvasState, InputLabels, OutputLabels, Form, Description) {
        super();
        this.Name = Name;
        this.TimeStamp = TimeStamp;
        this.FilePath = FilePath;
        this.WaveInfo = WaveInfo;
        this.CanvasState = CanvasState;
        this.InputLabels = InputLabels;
        this.OutputLabels = OutputLabels;
        this.Form = Form;
        this.Description = Description;
    }
}

export function LoadedComponent_$reflection() {
    return record_type("CommonTypes.LoadedComponent", [], LoadedComponent, () => [["Name", string_type], ["TimeStamp", class_type("System.DateTime")], ["FilePath", string_type], ["WaveInfo", option_type(SavedWaveInfo_$reflection())], ["CanvasState", tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))], ["InputLabels", list_type(tuple_type(string_type, int32_type))], ["OutputLabels", list_type(tuple_type(string_type, int32_type))], ["Form", option_type(CCForm_$reflection())], ["Description", option_type(string_type)]]);
}

export const formOpt_ = [(a) => a.Form, (s) => ((a_1) => {
    if (s != null) {
        const s_1 = s;
        return new LoadedComponent(a_1.Name, a_1.TimeStamp, a_1.FilePath, a_1.WaveInfo, a_1.CanvasState, a_1.InputLabels, a_1.OutputLabels, s_1, a_1.Description);
    }
    else {
        return a_1;
    }
})];

export const canvasState_ = [(a) => a.CanvasState, (s) => ((a_1) => (new LoadedComponent(a_1.Name, a_1.TimeStamp, a_1.FilePath, a_1.WaveInfo, s, a_1.InputLabels, a_1.OutputLabels, a_1.Form, a_1.Description)))];

export const componentsState_ = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), Optics_fst_())(canvasState_);

/**
 * Returns true if a component is clocked
 */
export function isClocked(visitedSheets, ldcs, comp) {
    const matchValue = comp.Type;
    switch (matchValue.tag) {
        case 26: {
            const ct = matchValue.fields[0];
            const ldcOpt = tryFind((ldc) => (ldc.Name === ct.Name), ldcs);
            const matchValue_1 = contains(ct.Name, visitedSheets, {
                Equals: (x, y) => (x === y),
                GetHashCode: stringHash,
            });
            if (matchValue_1) {
                return false;
            }
            else if (ldcOpt != null) {
                const ldc_1 = ldcOpt;
                const comps = ldc_1.CanvasState[0];
                return exists((comp_1) => isClocked(cons(ct.Name, visitedSheets), ldcs, comp_1), comps);
            }
            else {
                return false;
            }
        }
        case 31:
        case 32:
        case 33:
        case 34:
        case 45:
        case 44:
        case 35:
        case 37:
        case 36:
        case 38:
            return true;
        default:
            return false;
    }
}

export class Project extends Record {
    constructor(ProjectPath, OpenFileName, WorkingFileName, LoadedComponents) {
        super();
        this.ProjectPath = ProjectPath;
        this.OpenFileName = OpenFileName;
        this.WorkingFileName = WorkingFileName;
        this.LoadedComponents = LoadedComponents;
    }
}

export function Project_$reflection() {
    return record_type("CommonTypes.Project", [], Project, () => [["ProjectPath", string_type], ["OpenFileName", string_type], ["WorkingFileName", option_type(string_type)], ["LoadedComponents", list_type(LoadedComponent_$reflection())]]);
}

export const loadedComponents_ = [(a) => a.LoadedComponents, (s) => ((a_1) => (new Project(a_1.ProjectPath, a_1.OpenFileName, a_1.WorkingFileName, s)))];

export const openLoadedComponent_ = [(a) => find((lc) => (lc.Name === a.OpenFileName), a.LoadedComponents), (lc$0027) => ((a_1) => (new Project(a_1.ProjectPath, a_1.OpenFileName, a_1.WorkingFileName, map((lc_1) => ((lc_1.Name === a_1.OpenFileName) ? lc$0027 : lc_1), a_1.LoadedComponents))))];

export const openFileName_ = [(a) => a.OpenFileName, (s) => ((a_1) => (new Project(a_1.ProjectPath, s, a_1.WorkingFileName, a_1.LoadedComponents)))];

export function loadedComponentOf_(name) {
    return [(a) => find((lc) => (lc.Name === name), a.LoadedComponents), (lc$0027) => ((a_1) => (new Project(a_1.ProjectPath, a_1.OpenFileName, a_1.WorkingFileName, map((lc_1) => ((lc_1.Name === name) ? lc$0027 : lc_1), a_1.LoadedComponents))))];
}

export class WidthInferError extends Record {
    constructor(Msg, ConnectionsAffected) {
        super();
        this.Msg = Msg;
        this.ConnectionsAffected = ConnectionsAffected;
    }
}

export function WidthInferError_$reflection() {
    return record_type("CommonTypes.WidthInferError", [], WidthInferError, () => [["Msg", string_type], ["ConnectionsAffected", list_type(string_type)]]);
}

export class JSDiagramMsg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["InitCanvas", "SelectComponent", "UnselectComponent", "InferWidths", "SetHasUnsavedChanges"];
    }
}

export function JSDiagramMsg_$reflection() {
    return union_type("CommonTypes.JSDiagramMsg", [], JSDiagramMsg, () => [[["Item", tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))]], [["Item", Component_$reflection()]], [["Item", unit_type]], [["Item", unit_type]], [["Item", bool_type]]]);
}

//# sourceMappingURL=CommonTypes.fs.js.map
