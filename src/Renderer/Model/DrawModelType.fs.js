import { Union, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { unit_type, lambda_type, uint32_type, int64_type, tuple_type, anonRecord_type, int32_type, bool_type, class_type, list_type, union_type, string_type, option_type, array_type, record_type, float64_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { Connection_$reflection, Memory1_$reflection, HighLightColor_$reflection, ComponentType_$reflection, LoadedComponent_$reflection, XYPos, STransform_$reflection, Component_$reflection, BoundingBox_$reflection, XYPos_$reflection, Rotation_$reflection, Port_$reflection, Edge_$reflection } from "../Common/CommonTypes.fs.js";
import { defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { MouseT_$reflection } from "../Common/DrawHelpers.fs.js";
import { Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89 } from "../Common/Optics.fs.js";
import { add, tryFind } from "../fable_modules/fable-library.4.1.4/Map.js";
import { printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { CompilationProfile_$reflection } from "../Simulator/Verilog.fs.js";

export class SnapData extends Record {
    constructor(UpperLimit, LowerLimit, Snap, IndicatorPos) {
        super();
        this.UpperLimit = UpperLimit;
        this.LowerLimit = LowerLimit;
        this.Snap = Snap;
        this.IndicatorPos = IndicatorPos;
    }
}

export function SnapData_$reflection() {
    return record_type("DrawModelType.SnapData", [], SnapData, () => [["UpperLimit", float64_type], ["LowerLimit", float64_type], ["Snap", float64_type], ["IndicatorPos", float64_type]]);
}

export class Snap extends Record {
    constructor(UnSnapPosition, SnapPosition, SnapIndicatorPos) {
        super();
        this.UnSnapPosition = UnSnapPosition;
        this.SnapPosition = SnapPosition;
        this.SnapIndicatorPos = SnapIndicatorPos;
    }
}

export function Snap_$reflection() {
    return record_type("DrawModelType.Snap", [], Snap, () => [["UnSnapPosition", float64_type], ["SnapPosition", float64_type], ["SnapIndicatorPos", float64_type]]);
}

export const unSnapPositon_ = [(s) => s.UnSnapPosition, (u) => ((s_1) => (new Snap(u, s_1.SnapPosition, s_1.SnapIndicatorPos)))];

export const snapPosition_ = [(s) => s.SnapPosition, (u) => ((s_1) => (new Snap(s_1.UnSnapPosition, u, s_1.SnapIndicatorPos)))];

export const snapIndicatorPos_ = [(s) => s.SnapIndicatorPos, (u) => ((s_1) => (new Snap(s_1.UnSnapPosition, s_1.SnapPosition, u)))];

export class SnapInfo extends Record {
    constructor(SnapData, SnapOpt) {
        super();
        this.SnapData = SnapData;
        this.SnapOpt = SnapOpt;
    }
}

export function SnapInfo_$reflection() {
    return record_type("DrawModelType.SnapInfo", [], SnapInfo, () => [["SnapData", array_type(SnapData_$reflection())], ["SnapOpt", option_type(Snap_$reflection())]]);
}

export const snapData_ = [(inf) => inf.SnapData, (s) => ((inf_1) => (new SnapInfo(s, inf_1.SnapOpt)))];

export const snapOpt_ = [(inf) => inf.SnapOpt, (s) => ((inf_1) => (new SnapInfo(inf_1.SnapData, s)))];

export class SnapXY extends Record {
    constructor(SnapX, SnapY) {
        super();
        this.SnapX = SnapX;
        this.SnapY = SnapY;
    }
}

export function SnapXY_$reflection() {
    return record_type("DrawModelType.SnapXY", [], SnapXY, () => [["SnapX", SnapInfo_$reflection()], ["SnapY", SnapInfo_$reflection()]]);
}

export const snapX_ = [(xy) => xy.SnapX, (s) => ((xy_1) => (new SnapXY(s, xy_1.SnapY)))];

export const snapY_ = [(xy) => xy.SnapY, (s) => ((xy_1) => (new SnapXY(xy_1.SnapX, s)))];

export class SymbolT_PortId extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["InputId", "OutputId"];
    }
}

export function SymbolT_PortId_$reflection() {
    return union_type("DrawModelType.SymbolT.PortId", [], SymbolT_PortId, () => [[["Item", string_type]], [["Item", string_type]]]);
}

export class SymbolT_PortMaps extends Record {
    constructor(Order, Orientation) {
        super();
        this.Order = Order;
        this.Orientation = Orientation;
    }
}

export function SymbolT_PortMaps_$reflection() {
    return record_type("DrawModelType.SymbolT.PortMaps", [], SymbolT_PortMaps, () => [["Order", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [Edge_$reflection(), list_type(string_type)])], ["Orientation", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, Edge_$reflection()])]]);
}

export const SymbolT_order_ = [(a) => a.Order, (s) => ((a_1) => (new SymbolT_PortMaps(s, a_1.Orientation)))];

export const SymbolT_orientation_ = [(a) => a.Orientation, (s) => ((a_1) => (new SymbolT_PortMaps(a_1.Order, s)))];

export class SymbolT_ShowPorts extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ShowInput", "ShowOutput", "ShowBoth", "ShowBothForPortMovement", "ShowNone", "ShowOneTouching", "ShowOneNotTouching", "ShowTarget"];
    }
}

export function SymbolT_ShowPorts_$reflection() {
    return union_type("DrawModelType.SymbolT.ShowPorts", [], SymbolT_ShowPorts, () => [[], [], [], [], [], [["Item", Port_$reflection()]], [["Item", Port_$reflection()]], []]);
}

export class SymbolT_ShowCorners extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ShowAll", "DontShow"];
    }
}

export function SymbolT_ShowCorners_$reflection() {
    return union_type("DrawModelType.SymbolT.ShowCorners", [], SymbolT_ShowCorners, () => [[], []]);
}

export class SymbolT_Annotation extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ScaleButton", "RotateButton"];
    }
}

export function SymbolT_Annotation_$reflection() {
    return union_type("DrawModelType.SymbolT.Annotation", [], SymbolT_Annotation, () => [[], [["Item", Rotation_$reflection()]]]);
}

export class SymbolT_AppearanceT extends Record {
    constructor(ShowPorts, ShowCorners, HighlightLabel, Colour, Opacity) {
        super();
        this.ShowPorts = ShowPorts;
        this.ShowCorners = ShowCorners;
        this.HighlightLabel = HighlightLabel;
        this.Colour = Colour;
        this.Opacity = Opacity;
    }
}

export function SymbolT_AppearanceT_$reflection() {
    return record_type("DrawModelType.SymbolT.AppearanceT", [], SymbolT_AppearanceT, () => [["ShowPorts", SymbolT_ShowPorts_$reflection()], ["ShowCorners", SymbolT_ShowCorners_$reflection()], ["HighlightLabel", bool_type], ["Colour", string_type], ["Opacity", float64_type]]);
}

export class SymbolT_ThemeType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["White", "Light", "Colourful"];
    }
}

export function SymbolT_ThemeType_$reflection() {
    return union_type("DrawModelType.SymbolT.ThemeType", [], SymbolT_ThemeType, () => [[], [], []]);
}

export const SymbolT_showPorts_ = [(a) => a.ShowPorts, (s) => ((a_1) => (new SymbolT_AppearanceT(s, a_1.ShowCorners, a_1.HighlightLabel, a_1.Colour, a_1.Opacity)))];

export const SymbolT_showCorners_ = [(a) => a.ShowCorners, (s) => ((a_1) => (new SymbolT_AppearanceT(a_1.ShowPorts, s, a_1.HighlightLabel, a_1.Colour, a_1.Opacity)))];

export const SymbolT_highlightLabel_ = [(a) => a.HighlightLabel, (s) => ((a_1) => (new SymbolT_AppearanceT(a_1.ShowPorts, a_1.ShowCorners, s, a_1.Colour, a_1.Opacity)))];

export const SymbolT_colour_ = [(a) => a.Colour, (s) => ((a_1) => (new SymbolT_AppearanceT(a_1.ShowPorts, a_1.ShowCorners, a_1.HighlightLabel, s, a_1.Opacity)))];

export const SymbolT_opacity_ = [(a) => a.Opacity, (s) => ((a_1) => (new SymbolT_AppearanceT(a_1.ShowPorts, a_1.ShowCorners, a_1.HighlightLabel, a_1.Colour, s)))];

export class SymbolT_Symbol extends Record {
    constructor(Pos, CentrePos, OffsetFromBBCentre, InWidth0, InWidth1, InWidths, LabelBoundingBox, LabelHasDefaultPos, LabelRotation, Appearance, Id, Component, Annotation, Moving, IsClocked, STransform, ReversedInputPorts, PortMaps, HScale, VScale, MovingPort, MovingPortTarget) {
        super();
        this.Pos = Pos;
        this.CentrePos = CentrePos;
        this.OffsetFromBBCentre = OffsetFromBBCentre;
        this.InWidth0 = InWidth0;
        this.InWidth1 = InWidth1;
        this.InWidths = InWidths;
        this.LabelBoundingBox = LabelBoundingBox;
        this.LabelHasDefaultPos = LabelHasDefaultPos;
        this.LabelRotation = LabelRotation;
        this.Appearance = Appearance;
        this.Id = Id;
        this.Component = Component;
        this.Annotation = Annotation;
        this.Moving = Moving;
        this.IsClocked = IsClocked;
        this.STransform = STransform;
        this.ReversedInputPorts = ReversedInputPorts;
        this.PortMaps = PortMaps;
        this.HScale = HScale;
        this.VScale = VScale;
        this.MovingPort = MovingPort;
        this.MovingPortTarget = MovingPortTarget;
    }
}

export function SymbolT_Symbol_$reflection() {
    return record_type("DrawModelType.SymbolT.Symbol", [], SymbolT_Symbol, () => [["Pos", XYPos_$reflection()], ["CentrePos", XYPos_$reflection()], ["OffsetFromBBCentre", XYPos_$reflection()], ["InWidth0", option_type(int32_type)], ["InWidth1", option_type(int32_type)], ["InWidths", option_type(list_type(option_type(int32_type)))], ["LabelBoundingBox", BoundingBox_$reflection()], ["LabelHasDefaultPos", bool_type], ["LabelRotation", option_type(Rotation_$reflection())], ["Appearance", SymbolT_AppearanceT_$reflection()], ["Id", string_type], ["Component", Component_$reflection()], ["Annotation", option_type(SymbolT_Annotation_$reflection())], ["Moving", bool_type], ["IsClocked", bool_type], ["STransform", STransform_$reflection()], ["ReversedInputPorts", option_type(bool_type)], ["PortMaps", SymbolT_PortMaps_$reflection()], ["HScale", option_type(float64_type)], ["VScale", option_type(float64_type)], ["MovingPort", option_type(anonRecord_type(["CurrPos", XYPos_$reflection()], ["PortId", string_type]))], ["MovingPortTarget", option_type(tuple_type(XYPos_$reflection(), XYPos_$reflection()))]]);
}

export function SymbolT_Symbol__get_getScaledDiagonal(this$) {
    return new XYPos(defaultArg(this$.HScale, 1) * this$.Component.W, defaultArg(this$.VScale, 1) * this$.Component.H);
}

export const SymbolT_appearance_ = [(a) => a.Appearance, (s) => ((a_1) => (new SymbolT_Symbol(a_1.Pos, a_1.CentrePos, a_1.OffsetFromBBCentre, a_1.InWidth0, a_1.InWidth1, a_1.InWidths, a_1.LabelBoundingBox, a_1.LabelHasDefaultPos, a_1.LabelRotation, s, a_1.Id, a_1.Component, a_1.Annotation, a_1.Moving, a_1.IsClocked, a_1.STransform, a_1.ReversedInputPorts, a_1.PortMaps, a_1.HScale, a_1.VScale, a_1.MovingPort, a_1.MovingPortTarget)))];

export const SymbolT_moving_ = [(a) => a.Moving, (s) => ((a_1) => (new SymbolT_Symbol(a_1.Pos, a_1.CentrePos, a_1.OffsetFromBBCentre, a_1.InWidth0, a_1.InWidth1, a_1.InWidths, a_1.LabelBoundingBox, a_1.LabelHasDefaultPos, a_1.LabelRotation, a_1.Appearance, a_1.Id, a_1.Component, a_1.Annotation, s, a_1.IsClocked, a_1.STransform, a_1.ReversedInputPorts, a_1.PortMaps, a_1.HScale, a_1.VScale, a_1.MovingPort, a_1.MovingPortTarget)))];

export const SymbolT_labelBoundingBox_ = [(a) => a.LabelBoundingBox, (s) => ((a_1) => (new SymbolT_Symbol(a_1.Pos, a_1.CentrePos, a_1.OffsetFromBBCentre, a_1.InWidth0, a_1.InWidth1, a_1.InWidths, s, a_1.LabelHasDefaultPos, a_1.LabelRotation, a_1.Appearance, a_1.Id, a_1.Component, a_1.Annotation, a_1.Moving, a_1.IsClocked, a_1.STransform, a_1.ReversedInputPorts, a_1.PortMaps, a_1.HScale, a_1.VScale, a_1.MovingPort, a_1.MovingPortTarget)))];

export const SymbolT_portMaps_ = [(a) => a.PortMaps, (s) => ((a_1) => (new SymbolT_Symbol(a_1.Pos, a_1.CentrePos, a_1.OffsetFromBBCentre, a_1.InWidth0, a_1.InWidth1, a_1.InWidths, a_1.LabelBoundingBox, a_1.LabelHasDefaultPos, a_1.LabelRotation, a_1.Appearance, a_1.Id, a_1.Component, a_1.Annotation, a_1.Moving, a_1.IsClocked, a_1.STransform, a_1.ReversedInputPorts, s, a_1.HScale, a_1.VScale, a_1.MovingPort, a_1.MovingPortTarget)))];

export const SymbolT_movingPort_ = [(a) => a.MovingPort, (s) => ((a_1) => (new SymbolT_Symbol(a_1.Pos, a_1.CentrePos, a_1.OffsetFromBBCentre, a_1.InWidth0, a_1.InWidth1, a_1.InWidths, a_1.LabelBoundingBox, a_1.LabelHasDefaultPos, a_1.LabelRotation, a_1.Appearance, a_1.Id, a_1.Component, a_1.Annotation, a_1.Moving, a_1.IsClocked, a_1.STransform, a_1.ReversedInputPorts, a_1.PortMaps, a_1.HScale, a_1.VScale, s, a_1.MovingPortTarget)))];

export const SymbolT_movingPortTarget_ = [(a) => a.MovingPortTarget, (s) => ((a_1) => (new SymbolT_Symbol(a_1.Pos, a_1.CentrePos, a_1.OffsetFromBBCentre, a_1.InWidth0, a_1.InWidth1, a_1.InWidths, a_1.LabelBoundingBox, a_1.LabelHasDefaultPos, a_1.LabelRotation, a_1.Appearance, a_1.Id, a_1.Component, a_1.Annotation, a_1.Moving, a_1.IsClocked, a_1.STransform, a_1.ReversedInputPorts, a_1.PortMaps, a_1.HScale, a_1.VScale, a_1.MovingPort, s)))];

export const SymbolT_component_ = [(a) => a.Component, (s) => ((a_1) => (new SymbolT_Symbol(a_1.Pos, a_1.CentrePos, a_1.OffsetFromBBCentre, a_1.InWidth0, a_1.InWidth1, a_1.InWidths, a_1.LabelBoundingBox, a_1.LabelHasDefaultPos, a_1.LabelRotation, a_1.Appearance, a_1.Id, s, a_1.Annotation, a_1.Moving, a_1.IsClocked, a_1.STransform, a_1.ReversedInputPorts, a_1.PortMaps, a_1.HScale, a_1.VScale, a_1.MovingPort, a_1.MovingPortTarget)))];

export const SymbolT_posOfSym_ = [(a) => a.Pos, (s) => ((a_1) => (new SymbolT_Symbol(s, a_1.CentrePos, a_1.OffsetFromBBCentre, a_1.InWidth0, a_1.InWidth1, a_1.InWidths, a_1.LabelBoundingBox, a_1.LabelHasDefaultPos, a_1.LabelRotation, a_1.Appearance, a_1.Id, a_1.Component, a_1.Annotation, a_1.Moving, a_1.IsClocked, a_1.STransform, a_1.ReversedInputPorts, a_1.PortMaps, a_1.HScale, a_1.VScale, a_1.MovingPort, a_1.MovingPortTarget)))];

export const SymbolT_getScaleF = (option) => defaultArg(option, 1);

export const SymbolT_scaleF_ = [(sym) => (new XYPos(SymbolT_getScaleF(sym.HScale), SymbolT_getScaleF(sym.VScale))), (sf) => ((sym_1) => (new SymbolT_Symbol(sym_1.Pos, sym_1.CentrePos, sym_1.OffsetFromBBCentre, sym_1.InWidth0, sym_1.InWidth1, sym_1.InWidths, sym_1.LabelBoundingBox, sym_1.LabelHasDefaultPos, sym_1.LabelRotation, sym_1.Appearance, sym_1.Id, sym_1.Component, sym_1.Annotation, sym_1.Moving, sym_1.IsClocked, sym_1.STransform, sym_1.ReversedInputPorts, sym_1.PortMaps, sf.X, sf.Y, sym_1.MovingPort, sym_1.MovingPortTarget)))];

export class SymbolT_Model extends Record {
    constructor(Symbols, CopiedSymbols, Ports, InputPortsConnected, OutputPortsConnected, Theme, HintPane) {
        super();
        this.Symbols = Symbols;
        this.CopiedSymbols = CopiedSymbols;
        this.Ports = Ports;
        this.InputPortsConnected = InputPortsConnected;
        this.OutputPortsConnected = OutputPortsConnected;
        this.Theme = Theme;
        this.HintPane = HintPane;
    }
}

export function SymbolT_Model_$reflection() {
    return record_type("DrawModelType.SymbolT.Model", [], SymbolT_Model, () => [["Symbols", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, SymbolT_Symbol_$reflection()])], ["CopiedSymbols", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, SymbolT_Symbol_$reflection()])], ["Ports", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, Port_$reflection()])], ["InputPortsConnected", class_type("Microsoft.FSharp.Collections.FSharpSet`1", [string_type])], ["OutputPortsConnected", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, int32_type])], ["Theme", SymbolT_ThemeType_$reflection()], ["HintPane", option_type(class_type("Fable.React.ReactElement"))]]);
}

export class SymbolT_Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["MouseMsg", "AddSymbol", "CopySymbols", "DeleteSymbols", "ShowAllInputPorts", "ShowAllOutputPorts", "DeleteAllPorts", "MoveSymbols", "MoveLabel", "ShowPorts", "ShowCustomOnlyPorts", "SelectSymbols", "SymbolsHaveError", "ChangeLabel", "PasteSymbols", "ColorSymbols", "ErrorSymbols", "ChangeNumberOfBits", "ChangeLsb", "ChangeInputValue", "ChangeScale", "ChangeConstant", "ChangeBusCompare", "ChangeReversedInputs", "ChangeAdderComponent", "ChangeCounterComponent", "ResetModel", "LoadComponents", "WriteMemoryLine", "WriteMemoryType", "UpdateMemory", "RotateLeft", "RotateAntiClockAng", "Flip", "MovePort", "MovePortDone", "ShowCustomCorners", "HideCustomCorners", "ResizeSymbol", "ResizeSymbolDone", "SaveSymbols", "SetTheme", "UpdateBoundingBoxes"];
    }
}

export function SymbolT_Msg_$reflection() {
    return union_type("DrawModelType.SymbolT.Msg", [], SymbolT_Msg, () => [[["Item", MouseT_$reflection()]], [["Item1", list_type(LoadedComponent_$reflection())], ["pos", XYPos_$reflection()], ["compType", ComponentType_$reflection()], ["lbl", string_type]], [["Item", list_type(string_type)]], [["sIds", list_type(string_type)]], [], [], [], [["compList", list_type(string_type)], ["move", XYPos_$reflection()]], [["compId", string_type], ["move", XYPos_$reflection()]], [["Item", list_type(string_type)]], [["Item", list_type(string_type)]], [["Item", list_type(string_type)]], [["sIds", list_type(string_type)]], [["sId", string_type], ["newLabel", string_type]], [["sIds", list_type(string_type)]], [["compList", list_type(string_type)], ["colour", HighLightColor_$reflection()]], [["errorIds", list_type(string_type)], ["selectIds", list_type(string_type)], ["isDragAndDrop", bool_type]], [["compId", string_type], ["NewBits", int32_type]], [["compId", string_type], ["NewBits", int64_type]], [["compId", string_type], ["newVal", int32_type]], [["compId", string_type], ["newScale", float64_type], ["whichScale", string_type]], [["compId", string_type], ["NewBits", int64_type], ["NewText", string_type]], [["compId", string_type], ["NewBits", uint32_type], ["NewText", string_type]], [["compId", string_type]], [["compId", string_type], ["oldComp", Component_$reflection()], ["newComp", ComponentType_$reflection()]], [["compId", string_type], ["oldComp", Component_$reflection()], ["newComp", ComponentType_$reflection()]], [], [["Item1", list_type(LoadedComponent_$reflection())], ["Item2", list_type(Component_$reflection())]], [["Item1", string_type], ["Item2", int64_type], ["Item3", int64_type]], [["Item1", string_type], ["Item2", ComponentType_$reflection()]], [["Item1", string_type], ["Item2", lambda_type(Memory1_$reflection(), Memory1_$reflection())]], [["compList", list_type(string_type)], ["Item2", Rotation_$reflection()]], [["compList", list_type(string_type)], ["Item2", Rotation_$reflection()]], [["compList", list_type(string_type)], ["orientation", string_type]], [["portId", string_type], ["move", XYPos_$reflection()]], [["portId", string_type], ["move", XYPos_$reflection()]], [["compList", list_type(string_type)]], [["compList", list_type(string_type)]], [["compId", string_type], ["corner", XYPos_$reflection()], ["move", XYPos_$reflection()]], [["compId", string_type], ["resetSymbol", option_type(SymbolT_Symbol_$reflection())], ["corner", XYPos_$reflection()], ["move", XYPos_$reflection()]], [], [["Item", SymbolT_ThemeType_$reflection()]], []]);
}

export const SymbolT_symbols_ = [(m) => m.Symbols, (s) => ((m_1) => (new SymbolT_Model(s, m_1.CopiedSymbols, m_1.Ports, m_1.InputPortsConnected, m_1.OutputPortsConnected, m_1.Theme, m_1.HintPane)))];

export const SymbolT_ports_ = [(m) => m.Ports, (w) => ((m_1) => (new SymbolT_Model(m_1.Symbols, m_1.CopiedSymbols, w, m_1.InputPortsConnected, m_1.OutputPortsConnected, m_1.Theme, m_1.HintPane)))];

export function SymbolT_symbolOf_(k) {
    let k_1;
    return Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), (k_1 = k, [(arg_1) => {
        const _arg = tryFind(k_1, arg_1);
        if (_arg == null) {
            return toFail(printf("%s"))("What? Symbol id lookup in model failed");
        }
        else {
            const v = _arg;
            return v;
        }
    }, (v_1) => ((x) => add(k_1, v_1, x))]))(SymbolT_symbols_);
}

export const SymbolT_hintPane_ = [(m) => m.HintPane, (s) => ((m_1) => (new SymbolT_Model(m_1.Symbols, m_1.CopiedSymbols, m_1.Ports, m_1.InputPortsConnected, m_1.OutputPortsConnected, m_1.Theme, s)))];

export class BusWireT_SnapPosition extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["High", "Mid", "Low"];
    }
}

export function BusWireT_SnapPosition_$reflection() {
    return union_type("DrawModelType.BusWireT.SnapPosition", [], BusWireT_SnapPosition, () => [[], [], []]);
}

export class BusWireT_WireType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Radial", "Modern", "Jump"];
    }
}

export function BusWireT_WireType_$reflection() {
    return union_type("DrawModelType.BusWireT.WireType", [], BusWireT_WireType, () => [[], [], []]);
}

export class BusWireT_Segment extends Record {
    constructor(Index, Length, WireId, IntersectOrJumpList, Draggable, Mode) {
        super();
        this.Index = (Index | 0);
        this.Length = Length;
        this.WireId = WireId;
        this.IntersectOrJumpList = IntersectOrJumpList;
        this.Draggable = Draggable;
        this.Mode = Mode;
    }
}

export function BusWireT_Segment_$reflection() {
    return record_type("DrawModelType.BusWireT.Segment", [], BusWireT_Segment, () => [["Index", int32_type], ["Length", float64_type], ["WireId", string_type], ["IntersectOrJumpList", list_type(float64_type)], ["Draggable", bool_type], ["Mode", string_type]]);
}

export class BusWireT_ASegment extends Record {
    constructor(Start, End, Segment) {
        super();
        this.Start = Start;
        this.End = End;
        this.Segment = Segment;
    }
}

export function BusWireT_ASegment_$reflection() {
    return record_type("DrawModelType.BusWireT.ASegment", [], BusWireT_ASegment, () => [["Start", XYPos_$reflection()], ["End", XYPos_$reflection()], ["Segment", BusWireT_Segment_$reflection()]]);
}

export class BusWireT_Wire extends Record {
    constructor(WId, InputPort, OutputPort, Color, Width, Segments, StartPos, InitialOrientation) {
        super();
        this.WId = WId;
        this.InputPort = InputPort;
        this.OutputPort = OutputPort;
        this.Color = Color;
        this.Width = (Width | 0);
        this.Segments = Segments;
        this.StartPos = StartPos;
        this.InitialOrientation = InitialOrientation;
    }
}

export function BusWireT_Wire_$reflection() {
    return record_type("DrawModelType.BusWireT.Wire", [], BusWireT_Wire, () => [["WId", string_type], ["InputPort", string_type], ["OutputPort", string_type], ["Color", HighLightColor_$reflection()], ["Width", int32_type], ["Segments", list_type(BusWireT_Segment_$reflection())], ["StartPos", XYPos_$reflection()], ["InitialOrientation", string_type]]);
}

export const BusWireT_segments_ = [(m) => m.Segments, (s) => ((m_1) => (new BusWireT_Wire(m_1.WId, m_1.InputPort, m_1.OutputPort, m_1.Color, m_1.Width, s, m_1.StartPos, m_1.InitialOrientation)))];

export const BusWireT_mode_ = [(m) => m.Mode, (s) => ((m_1) => (new BusWireT_Segment(m_1.Index, m_1.Length, m_1.WireId, m_1.IntersectOrJumpList, m_1.Draggable, s)))];

export class BusWireT_TextOffset {
    constructor() {
    }
}

export function BusWireT_TextOffset_$reflection() {
    return class_type("DrawModelType.BusWireT.TextOffset", void 0, BusWireT_TextOffset);
}

export function BusWireT_TextOffset_get_yOffset() {
    return 7;
}

export function BusWireT_TextOffset_get_xOffset() {
    return 1;
}

export function BusWireT_TextOffset_get_xLeftOffset() {
    return 20;
}

export class BusWireT_Model extends Record {
    constructor(Symbol$, Wires, CopiedWires, SelectedSegment, LastMousePos, ErrorWires, Notifications, Type, ArrowDisplay, SnapToNet) {
        super();
        this.Symbol = Symbol$;
        this.Wires = Wires;
        this.CopiedWires = CopiedWires;
        this.SelectedSegment = SelectedSegment;
        this.LastMousePos = LastMousePos;
        this.ErrorWires = ErrorWires;
        this.Notifications = Notifications;
        this.Type = Type;
        this.ArrowDisplay = ArrowDisplay;
        this.SnapToNet = SnapToNet;
    }
}

export function BusWireT_Model_$reflection() {
    return record_type("DrawModelType.BusWireT.Model", [], BusWireT_Model, () => [["Symbol", SymbolT_Model_$reflection()], ["Wires", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, BusWireT_Wire_$reflection()])], ["CopiedWires", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, BusWireT_Wire_$reflection()])], ["SelectedSegment", list_type(tuple_type(int32_type, string_type))], ["LastMousePos", XYPos_$reflection()], ["ErrorWires", list_type(string_type)], ["Notifications", option_type(string_type)], ["Type", BusWireT_WireType_$reflection()], ["ArrowDisplay", bool_type], ["SnapToNet", bool_type]]);
}

export class BusWireT_Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Symbol", "AddWire", "BusWidths", "CopyWires", "DeleteWires", "DeleteWiresWithPort", "SelectWires", "UpdateWires", "UpdateSymbolWires", "DragSegment", "CoalesceWire", "ColorWires", "ErrorWires", "ResetJumps", "MakeJumps", "UpdateWireDisplayType", "ToggleArrowDisplay", "ResetModel", "LoadConnections", "UpdateConnectedWires", "RerouteWire", "ToggleSnapToNet"];
    }
}

export function BusWireT_Msg_$reflection() {
    return union_type("DrawModelType.BusWireT.Msg", [], BusWireT_Msg, () => [[["Item", SymbolT_Msg_$reflection()]], [["Item", tuple_type(string_type, string_type)]], [], [["Item", list_type(string_type)]], [["Item", list_type(string_type)]], [["Item", list_type(option_type(Port_$reflection()))]], [["Item", list_type(string_type)]], [["Item1", list_type(string_type)], ["Item2", XYPos_$reflection()]], [["Item", string_type]], [["Item1", list_type(tuple_type(int32_type, string_type))], ["Item2", MouseT_$reflection()]], [["Item", string_type]], [["Item1", list_type(string_type)], ["Item2", HighLightColor_$reflection()]], [["Item", list_type(string_type)]], [["Item", list_type(string_type)]], [["separate", bool_type], ["conns", list_type(string_type)]], [["Item", BusWireT_WireType_$reflection()]], [], [], [["Item", list_type(Connection_$reflection())]], [["Item", list_type(string_type)]], [["Item", string_type]], []]);
}

export const BusWireT_symbol_ = [(m) => m.Symbol, (w) => ((m_1) => (new BusWireT_Model(w, m_1.Wires, m_1.CopiedWires, m_1.SelectedSegment, m_1.LastMousePos, m_1.ErrorWires, m_1.Notifications, m_1.Type, m_1.ArrowDisplay, m_1.SnapToNet)))];

export const BusWireT_wires_ = [(m) => m.Wires, (w) => ((m_1) => (new BusWireT_Model(m_1.Symbol, w, m_1.CopiedWires, m_1.SelectedSegment, m_1.LastMousePos, m_1.ErrorWires, m_1.Notifications, m_1.Type, m_1.ArrowDisplay, m_1.SnapToNet)))];

export function BusWireT_wireOf_(k) {
    let k_1;
    return Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), (k_1 = k, [(arg_1) => {
        const _arg = tryFind(k_1, arg_1);
        if (_arg == null) {
            return toFail(printf("%s"))("What? Symbol id lookup in model failed");
        }
        else {
            const v = _arg;
            return v;
        }
    }, (v_1) => ((x) => add(k_1, v_1, x))]))(BusWireT_wires_);
}

export function BusWireT_symbolOf_(k) {
    return Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_symbolOf_(k))(BusWireT_symbol_);
}

export class SheetT_ScalingBox extends Record {
    constructor(ScaleButton, RotateDeg90Button, RotateDeg270Button, ScalingBoxBound, ButtonList) {
        super();
        this.ScaleButton = ScaleButton;
        this.RotateDeg90Button = RotateDeg90Button;
        this.RotateDeg270Button = RotateDeg270Button;
        this.ScalingBoxBound = ScalingBoxBound;
        this.ButtonList = ButtonList;
    }
}

export function SheetT_ScalingBox_$reflection() {
    return record_type("DrawModelType.SheetT.ScalingBox", [], SheetT_ScalingBox, () => [["ScaleButton", SymbolT_Symbol_$reflection()], ["RotateDeg90Button", SymbolT_Symbol_$reflection()], ["RotateDeg270Button", SymbolT_Symbol_$reflection()], ["ScalingBoxBound", BoundingBox_$reflection()], ["ButtonList", list_type(string_type)]]);
}

export class SheetT_XYPosMov extends Record {
    constructor(Pos, Move) {
        super();
        this.Pos = Pos;
        this.Move = Move;
    }
}

export function SheetT_XYPosMov_$reflection() {
    return record_type("DrawModelType.SheetT.XYPosMov", [], SheetT_XYPosMov, () => [["Pos", XYPos_$reflection()], ["Move", XYPos_$reflection()]]);
}

export const SheetT_move_ = [(m) => m.Move, (w) => ((m_1) => (new SheetT_XYPosMov(m_1.Pos, w)))];

export const SheetT_pos_ = [(m) => m.Pos, (w) => ((m_1) => (new SheetT_XYPosMov(w, m_1.Move)))];

export class SheetT_MouseOn extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Label", "InputPort", "OutputPort", "Component", "Connection", "ComponentCorner", "Canvas"];
    }
}

export function SheetT_MouseOn_$reflection() {
    return union_type("DrawModelType.SheetT.MouseOn", [], SheetT_MouseOn, () => [[["Item", string_type]], [["Item1", string_type], ["Item2", XYPos_$reflection()]], [["Item1", string_type], ["Item2", XYPos_$reflection()]], [["Item", string_type]], [["Item", string_type]], [["Item1", string_type], ["Item2", XYPos_$reflection()], ["Item3", int32_type]], []]);
}

export class SheetT_CurrentAction extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Selecting", "InitialiseMoving", "InitialiseMovingLabel", "MovingSymbols", "MovingLabel", "DragAndDrop", "Panning", "MovingWire", "ConnectingInput", "ConnectingOutput", "Scrolling", "Idle", "Scaling", "InitialisedCreateComponent", "MovingPort", "ResizingSymbol"];
    }
}

export function SheetT_CurrentAction_$reflection() {
    return union_type("DrawModelType.SheetT.CurrentAction", [], SheetT_CurrentAction, () => [[], [["Item", string_type]], [["Item", string_type]], [], [], [], [["offset", XYPos_$reflection()]], [["Item", list_type(tuple_type(int32_type, string_type))]], [["Item", string_type]], [["Item", string_type]], [], [], [], [["Item1", list_type(LoadedComponent_$reflection())], ["Item2", ComponentType_$reflection()], ["Item3", string_type]], [["portId", string_type]], [["Item1", string_type], ["Item2", XYPos_$reflection()]]]);
}

export class SheetT_UndoAction extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["MoveBackSymbol", "UndoPaste"];
    }
}

export function SheetT_UndoAction_$reflection() {
    return union_type("DrawModelType.SheetT.UndoAction", [], SheetT_UndoAction, () => [[["Item1", list_type(string_type)], ["Item2", XYPos_$reflection()]], [["Item", list_type(string_type)]]]);
}

export class SheetT_CursorType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Default", "ClickablePort", "NoCursor", "Spinner", "GrabWire", "GrabLabel", "GrabSymbol", "Grabbing", "ResizeNESW", "ResizeNWSE"];
    }
}

export function SheetT_CursorType_$reflection() {
    return union_type("DrawModelType.SheetT.CursorType", [], SheetT_CursorType, () => [[], [], [], [], [], [], [], [], [], []]);
}

export function SheetT_CursorType__Text(this$) {
    switch (this$.tag) {
        case 1:
            return "move";
        case 2:
            return "none";
        case 3:
            return "wait";
        case 4:
            return "crosshair";
        case 6:
            return "cell";
        case 5:
            return "grab";
        case 7:
            return "grabbing";
        case 8:
            return "nesw-resize";
        case 9:
            return "nwse-resize";
        default:
            return "default";
    }
}

export class SheetT_KeyboardMsg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["CtrlS", "CtrlC", "CtrlV", "CtrlZ", "CtrlY", "CtrlA", "CtrlW", "AltC", "AltV", "AltZ", "AltShiftZ", "ZoomIn", "ZoomOut", "DEL", "ESC"];
    }
}

export function SheetT_KeyboardMsg_$reflection() {
    return union_type("DrawModelType.SheetT.KeyboardMsg", [], SheetT_KeyboardMsg, () => [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
}

export class SheetT_WireTypeMsg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Jump", "Radiussed", "Modern"];
    }
}

export function SheetT_WireTypeMsg_$reflection() {
    return union_type("DrawModelType.SheetT.WireTypeMsg", [], SheetT_WireTypeMsg, () => [[], [], []]);
}

export class SheetT_IssieInterfaceMsg extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["ToggleArrows"];
    }
}

export function SheetT_IssieInterfaceMsg_$reflection() {
    return union_type("DrawModelType.SheetT.IssieInterfaceMsg", [], SheetT_IssieInterfaceMsg, () => [[]]);
}

export class SheetT_PopupDialogData extends Record {
    constructor(Text$, Int, Int2) {
        super();
        this.Text = Text$;
        this.Int = Int;
        this.Int2 = Int2;
    }
}

export function SheetT_PopupDialogData_$reflection() {
    return record_type("DrawModelType.SheetT.PopupDialogData", [], SheetT_PopupDialogData, () => [["Text", option_type(string_type)], ["Int", option_type(int32_type)], ["Int2", option_type(int64_type)]]);
}

export class SheetT_Arrange extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["AlignSymbols", "DistributeSymbols"];
    }
}

export function SheetT_Arrange_$reflection() {
    return union_type("DrawModelType.SheetT.Arrange", [], SheetT_Arrange, () => [[], []]);
}

export class SheetT_CompilationStage extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Completed", "InProgress", "Failed", "Queued"];
    }
}

export function SheetT_CompilationStage_$reflection() {
    return union_type("DrawModelType.SheetT.CompilationStage", [], SheetT_CompilationStage, () => [[["Item", int32_type]], [["Item", int32_type]], [], []]);
}

export class SheetT_CompilationStageLabel extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Synthesis", "PlaceAndRoute", "Generate", "Upload"];
    }
}

export function SheetT_CompilationStageLabel_$reflection() {
    return union_type("DrawModelType.SheetT.CompilationStageLabel", [], SheetT_CompilationStageLabel, () => [[], [], [], []]);
}

export class SheetT_CompileStatus extends Record {
    constructor(Synthesis, PlaceAndRoute, Generate, Upload) {
        super();
        this.Synthesis = Synthesis;
        this.PlaceAndRoute = PlaceAndRoute;
        this.Generate = Generate;
        this.Upload = Upload;
    }
}

export function SheetT_CompileStatus_$reflection() {
    return record_type("DrawModelType.SheetT.CompileStatus", [], SheetT_CompileStatus, () => [["Synthesis", SheetT_CompilationStage_$reflection()], ["PlaceAndRoute", SheetT_CompilationStage_$reflection()], ["Generate", SheetT_CompilationStage_$reflection()], ["Upload", SheetT_CompilationStage_$reflection()]]);
}

export class SheetT_Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Wire", "SetWireModel", "KeyPress", "ToggleGrid", "KeepZoomCentered", "MouseMsg", "UpdateBoundingBoxes", "UpdateSingleBoundingBox", "UpdateScrollPos", "UpdateScrollPosFromCanvas", "AddNotConnected", "ManualKeyUp", "ManualKeyDown", "CheckAutomaticScrolling", "DoNothing", "ShowPopup", "ClosePopup", "SetPopupDialogText", "SetPopupDialogInt", "InitialiseCreateComponent", "FlushCommandStack", "ResetModel", "UpdateSelectedWires", "ColourSelection", "PortMovementStart", "PortMovementEnd", "ResetSelection", "ToggleNet", "SelectWires", "SetSpinner", "Rotate", "Flip", "Arrangement", "RotateLabels", "WireType", "IssieInterface", "MovePort", "SaveSymbols", "StartCompiling", "StartCompilationStage", "StopCompilation", "TickCompilation", "FinishedCompilationStage", "DebugSingleStep", "DebugStepAndRead", "DebugRead", "OnDebugRead", "DebugConnect", "DebugDisconnect", "DebugUpdateMapping", "DebugContinue", "DebugPause", "SetDebugDevice", "ReorderPorts", "TestSmartChannel", "TestPortPosition", "ToggleSnapToNet", "BeautifySheet", "SheetBatch"];
    }
}

export function SheetT_Msg_$reflection() {
    return union_type("DrawModelType.SheetT.Msg", [], SheetT_Msg, () => [[["Item", BusWireT_Msg_$reflection()]], [["Item", BusWireT_Model_$reflection()]], [["Item", SheetT_KeyboardMsg_$reflection()]], [], [["Item", XYPos_$reflection()]], [["Item", MouseT_$reflection()]], [], [["Item", string_type]], [["Item", XYPos_$reflection()]], [["sequence", int32_type], ["pos", XYPos_$reflection()], ["dispatch", lambda_type(SheetT_Msg_$reflection(), unit_type)]], [["Item1", list_type(LoadedComponent_$reflection())], ["port", Port_$reflection()], ["pos", XYPos_$reflection()], ["rotation", Rotation_$reflection()]], [["Item", string_type]], [["Item", string_type]], [], [], [["Item", lambda_type(lambda_type(SheetT_Msg_$reflection(), unit_type), lambda_type(SheetT_PopupDialogData_$reflection(), class_type("Fable.React.ReactElement")))]], [], [["Item", option_type(string_type)]], [["Item", option_type(int32_type)]], [["Item1", list_type(LoadedComponent_$reflection())], ["Item2", ComponentType_$reflection()], ["Item3", string_type]], [], [], [["Item1", list_type(string_type)], ["Item2", bool_type]], [["compIds", list_type(string_type)], ["connIds", list_type(string_type)], ["colour", HighLightColor_$reflection()]], [], [], [], [["Item", tuple_type(list_type(Component_$reflection()), list_type(Connection_$reflection()))]], [["Item", list_type(string_type)]], [["Item", bool_type]], [["Item", Rotation_$reflection()]], [["Item", string_type]], [["Item", SheetT_Arrange_$reflection()]], [], [["Item", SheetT_WireTypeMsg_$reflection()]], [["Item", SheetT_IssieInterfaceMsg_$reflection()]], [["Item", MouseT_$reflection()]], [], [["path", string_type], ["name", string_type], ["profile", CompilationProfile_$reflection()]], [["Item1", SheetT_CompilationStageLabel_$reflection()], ["path", string_type], ["name", string_type], ["profile", CompilationProfile_$reflection()]], [], [["Item", float64_type]], [], [], [["parts", int32_type]], [["parts", int32_type]], [["data", int32_type], ["viewer", int32_type]], [], [], [["Item", array_type(string_type)]], [], [], [["Item", string_type]], [], [], [], [], [], [["Item", list_type(SheetT_Msg_$reflection())]]]);
}

export class SheetT_ReadLog extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["ReadLog"];
    }
}

export function SheetT_ReadLog_$reflection() {
    return union_type("DrawModelType.SheetT.ReadLog", [], SheetT_ReadLog, () => [[["Item", int32_type]]]);
}

export class SheetT_DebugState extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NotDebugging", "Paused", "Running"];
    }
}

export function SheetT_DebugState_$reflection() {
    return union_type("DrawModelType.SheetT.DebugState", [], SheetT_DebugState, () => [[], [], []]);
}

export class SheetT_ScalingDirection extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ScaleUp", "ScaleDown"];
    }
}

export function SheetT_ScalingDirection_$reflection() {
    return union_type("DrawModelType.SheetT.ScalingDirection", [], SheetT_ScalingDirection, () => [[], []]);
}

export class SheetT_Model extends Record {
    constructor(Wire, PopupViewFunc, PopupDialogData, BoundingBoxes, LastValidBoundingBoxes, SelectedLabel, SelectedComponents, SelectedWires, NearbyComponents, ErrorComponents, DragToSelectBox, ConnectPortsLine, TargetPortId, Action, ShowGrid, CursorType, LastValidPos, LastValidSymbol, SnapSymbols, SnapSegments, CurrentKeyPresses, Zoom, CanvasSize, TmpModel, ScalingTmpModel, UndoList, RedoList, AutomaticScrolling, ScreenScrollPos, LastMousePos, ScalingBoxCentrePos, InitMouseToScalingBoxCentre, ScrollingLastMousePos, LastMousePosForSnap, MouseCounter, CtrlKeyDown, PrevWireSelection, ScalingBox, Compiling, CompilationStatus, CompilationProcess, DebugState, DebugData, DebugMappings, DebugIsConnected, DebugDevice) {
        super();
        this.Wire = Wire;
        this.PopupViewFunc = PopupViewFunc;
        this.PopupDialogData = PopupDialogData;
        this.BoundingBoxes = BoundingBoxes;
        this.LastValidBoundingBoxes = LastValidBoundingBoxes;
        this.SelectedLabel = SelectedLabel;
        this.SelectedComponents = SelectedComponents;
        this.SelectedWires = SelectedWires;
        this.NearbyComponents = NearbyComponents;
        this.ErrorComponents = ErrorComponents;
        this.DragToSelectBox = DragToSelectBox;
        this.ConnectPortsLine = ConnectPortsLine;
        this.TargetPortId = TargetPortId;
        this.Action = Action;
        this.ShowGrid = ShowGrid;
        this.CursorType = CursorType;
        this.LastValidPos = LastValidPos;
        this.LastValidSymbol = LastValidSymbol;
        this.SnapSymbols = SnapSymbols;
        this.SnapSegments = SnapSegments;
        this.CurrentKeyPresses = CurrentKeyPresses;
        this.Zoom = Zoom;
        this.CanvasSize = CanvasSize;
        this.TmpModel = TmpModel;
        this.ScalingTmpModel = ScalingTmpModel;
        this.UndoList = UndoList;
        this.RedoList = RedoList;
        this.AutomaticScrolling = AutomaticScrolling;
        this.ScreenScrollPos = ScreenScrollPos;
        this.LastMousePos = LastMousePos;
        this.ScalingBoxCentrePos = ScalingBoxCentrePos;
        this.InitMouseToScalingBoxCentre = InitMouseToScalingBoxCentre;
        this.ScrollingLastMousePos = ScrollingLastMousePos;
        this.LastMousePosForSnap = LastMousePosForSnap;
        this.MouseCounter = (MouseCounter | 0);
        this.CtrlKeyDown = CtrlKeyDown;
        this.PrevWireSelection = PrevWireSelection;
        this.ScalingBox = ScalingBox;
        this.Compiling = Compiling;
        this.CompilationStatus = CompilationStatus;
        this.CompilationProcess = CompilationProcess;
        this.DebugState = DebugState;
        this.DebugData = DebugData;
        this.DebugMappings = DebugMappings;
        this.DebugIsConnected = DebugIsConnected;
        this.DebugDevice = DebugDevice;
    }
}

export function SheetT_Model_$reflection() {
    return record_type("DrawModelType.SheetT.Model", [], SheetT_Model, () => [["Wire", BusWireT_Model_$reflection()], ["PopupViewFunc", option_type(lambda_type(lambda_type(SheetT_Msg_$reflection(), unit_type), lambda_type(SheetT_PopupDialogData_$reflection(), class_type("Fable.React.ReactElement"))))], ["PopupDialogData", SheetT_PopupDialogData_$reflection()], ["BoundingBoxes", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, BoundingBox_$reflection()])], ["LastValidBoundingBoxes", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, BoundingBox_$reflection()])], ["SelectedLabel", option_type(string_type)], ["SelectedComponents", list_type(string_type)], ["SelectedWires", list_type(string_type)], ["NearbyComponents", list_type(string_type)], ["ErrorComponents", list_type(string_type)], ["DragToSelectBox", BoundingBox_$reflection()], ["ConnectPortsLine", tuple_type(XYPos_$reflection(), XYPos_$reflection())], ["TargetPortId", string_type], ["Action", SheetT_CurrentAction_$reflection()], ["ShowGrid", bool_type], ["CursorType", SheetT_CursorType_$reflection()], ["LastValidPos", XYPos_$reflection()], ["LastValidSymbol", option_type(SymbolT_Symbol_$reflection())], ["SnapSymbols", SnapXY_$reflection()], ["SnapSegments", SnapXY_$reflection()], ["CurrentKeyPresses", list_type(tuple_type(string_type, float64_type))], ["Zoom", float64_type], ["CanvasSize", float64_type], ["TmpModel", option_type(SheetT_Model_$reflection())], ["ScalingTmpModel", option_type(SheetT_Model_$reflection())], ["UndoList", list_type(SheetT_Model_$reflection())], ["RedoList", list_type(SheetT_Model_$reflection())], ["AutomaticScrolling", bool_type], ["ScreenScrollPos", XYPos_$reflection()], ["LastMousePos", XYPos_$reflection()], ["ScalingBoxCentrePos", XYPos_$reflection()], ["InitMouseToScalingBoxCentre", XYPos_$reflection()], ["ScrollingLastMousePos", SheetT_XYPosMov_$reflection()], ["LastMousePosForSnap", XYPos_$reflection()], ["MouseCounter", int32_type], ["CtrlKeyDown", bool_type], ["PrevWireSelection", list_type(string_type)], ["ScalingBox", option_type(SheetT_ScalingBox_$reflection())], ["Compiling", bool_type], ["CompilationStatus", SheetT_CompileStatus_$reflection()], ["CompilationProcess", option_type(class_type("Node.ChildProcess.ChildProcess"))], ["DebugState", SheetT_DebugState_$reflection()], ["DebugData", list_type(int32_type)], ["DebugMappings", array_type(string_type)], ["DebugIsConnected", bool_type], ["DebugDevice", option_type(string_type)]]);
}

export const SheetT_wire_ = [(m) => m.Wire, (w) => ((m_1) => (new SheetT_Model(w, m_1.PopupViewFunc, m_1.PopupDialogData, m_1.BoundingBoxes, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, m_1.SelectedComponents, m_1.SelectedWires, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, m_1.Zoom, m_1.CanvasSize, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, m_1.ScreenScrollPos, m_1.LastMousePos, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, m_1.ScrollingLastMousePos, m_1.LastMousePosForSnap, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, m_1.ScalingBox, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

export const SheetT_selectedComponents_ = [(m) => m.SelectedComponents, (sc) => ((m_1) => (new SheetT_Model(m_1.Wire, m_1.PopupViewFunc, m_1.PopupDialogData, m_1.BoundingBoxes, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, sc, m_1.SelectedWires, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, m_1.Zoom, m_1.CanvasSize, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, m_1.ScreenScrollPos, m_1.LastMousePos, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, m_1.ScrollingLastMousePos, m_1.LastMousePosForSnap, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, m_1.ScalingBox, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

export const SheetT_selectedWires_ = [(m) => m.SelectedWires, (sw) => ((m_1) => (new SheetT_Model(m_1.Wire, m_1.PopupViewFunc, m_1.PopupDialogData, m_1.BoundingBoxes, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, m_1.SelectedComponents, sw, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, m_1.Zoom, m_1.CanvasSize, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, m_1.ScreenScrollPos, m_1.LastMousePos, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, m_1.ScrollingLastMousePos, m_1.LastMousePosForSnap, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, m_1.ScalingBox, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

export const SheetT_boundingBoxes_ = [(m) => m.BoundingBoxes, (bb) => ((m_1) => (new SheetT_Model(m_1.Wire, m_1.PopupViewFunc, m_1.PopupDialogData, bb, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, m_1.SelectedComponents, m_1.SelectedWires, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, m_1.Zoom, m_1.CanvasSize, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, m_1.ScreenScrollPos, m_1.LastMousePos, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, m_1.ScrollingLastMousePos, m_1.LastMousePosForSnap, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, m_1.ScalingBox, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

export const SheetT_wires_ = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), BusWireT_wires_)(SheetT_wire_);

export function SheetT_wireOf_(k) {
    let k_1;
    return Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), (k_1 = k, [(arg_1) => {
        const _arg = tryFind(k_1, arg_1);
        if (_arg == null) {
            return toFail(printf("%s"))("What? Wire id lookup in model failed");
        }
        else {
            const v = _arg;
            return v;
        }
    }, (v_1) => ((x) => add(k_1, v_1, x))]))(SheetT_wires_);
}

export const SheetT_symbol_ = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), BusWireT_symbol_)(SheetT_wire_);

export const SheetT_symbols_ = (() => {
    const l_2 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), BusWireT_symbol_)(SheetT_wire_);
    return Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_symbols_)(l_2);
})();

export function SheetT_symbolOf_(k) {
    return Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_symbolOf_(k))(SheetT_symbol_);
}

export const SheetT_scrollingLastMousePos_ = [(m) => m.ScrollingLastMousePos, (w) => ((m_1) => (new SheetT_Model(m_1.Wire, m_1.PopupViewFunc, m_1.PopupDialogData, m_1.BoundingBoxes, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, m_1.SelectedComponents, m_1.SelectedWires, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, m_1.Zoom, m_1.CanvasSize, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, m_1.ScreenScrollPos, m_1.LastMousePos, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, w, m_1.LastMousePosForSnap, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, m_1.ScalingBox, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

export const SheetT_lastMousePos_ = [(m) => m.LastMousePos, (w) => ((m_1) => (new SheetT_Model(m_1.Wire, m_1.PopupViewFunc, m_1.PopupDialogData, m_1.BoundingBoxes, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, m_1.SelectedComponents, m_1.SelectedWires, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, m_1.Zoom, m_1.CanvasSize, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, m_1.ScreenScrollPos, w, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, m_1.ScrollingLastMousePos, m_1.LastMousePosForSnap, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, m_1.ScalingBox, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

export const SheetT_screenScrollPos_ = [(m) => m.ScreenScrollPos, (w) => ((m_1) => (new SheetT_Model(m_1.Wire, m_1.PopupViewFunc, m_1.PopupDialogData, m_1.BoundingBoxes, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, m_1.SelectedComponents, m_1.SelectedWires, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, m_1.Zoom, m_1.CanvasSize, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, w, m_1.LastMousePos, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, m_1.ScrollingLastMousePos, m_1.LastMousePosForSnap, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, m_1.ScalingBox, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

export const SheetT_lastMousePosForSnap_ = [(m) => m.LastMousePosForSnap, (w) => ((m_1) => (new SheetT_Model(m_1.Wire, m_1.PopupViewFunc, m_1.PopupDialogData, m_1.BoundingBoxes, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, m_1.SelectedComponents, m_1.SelectedWires, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, m_1.Zoom, m_1.CanvasSize, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, m_1.ScreenScrollPos, m_1.LastMousePos, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, m_1.ScrollingLastMousePos, w, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, m_1.ScalingBox, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

export const SheetT_canvasSize_ = [(m) => m.CanvasSize, (w) => ((m_1) => (new SheetT_Model(m_1.Wire, m_1.PopupViewFunc, m_1.PopupDialogData, m_1.BoundingBoxes, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, m_1.SelectedComponents, m_1.SelectedWires, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, m_1.Zoom, w, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, m_1.ScreenScrollPos, m_1.LastMousePos, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, m_1.ScrollingLastMousePos, m_1.LastMousePosForSnap, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, m_1.ScalingBox, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

export const SheetT_zoom_ = [(m) => m.Zoom, (w) => ((m_1) => (new SheetT_Model(m_1.Wire, m_1.PopupViewFunc, m_1.PopupDialogData, m_1.BoundingBoxes, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, m_1.SelectedComponents, m_1.SelectedWires, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, w, m_1.CanvasSize, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, m_1.ScreenScrollPos, m_1.LastMousePos, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, m_1.ScrollingLastMousePos, m_1.LastMousePosForSnap, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, m_1.ScalingBox, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

export const SheetT_scalingBox_ = [(m) => m.ScalingBox, (w) => ((m_1) => (new SheetT_Model(m_1.Wire, m_1.PopupViewFunc, m_1.PopupDialogData, m_1.BoundingBoxes, m_1.LastValidBoundingBoxes, m_1.SelectedLabel, m_1.SelectedComponents, m_1.SelectedWires, m_1.NearbyComponents, m_1.ErrorComponents, m_1.DragToSelectBox, m_1.ConnectPortsLine, m_1.TargetPortId, m_1.Action, m_1.ShowGrid, m_1.CursorType, m_1.LastValidPos, m_1.LastValidSymbol, m_1.SnapSymbols, m_1.SnapSegments, m_1.CurrentKeyPresses, m_1.Zoom, m_1.CanvasSize, m_1.TmpModel, m_1.ScalingTmpModel, m_1.UndoList, m_1.RedoList, m_1.AutomaticScrolling, m_1.ScreenScrollPos, m_1.LastMousePos, m_1.ScalingBoxCentrePos, m_1.InitMouseToScalingBoxCentre, m_1.ScrollingLastMousePos, m_1.LastMousePosForSnap, m_1.MouseCounter, m_1.CtrlKeyDown, m_1.PrevWireSelection, w, m_1.Compiling, m_1.CompilationStatus, m_1.CompilationProcess, m_1.DebugState, m_1.DebugData, m_1.DebugMappings, m_1.DebugIsConnected, m_1.DebugDevice)))];

//# sourceMappingURL=DrawModelType.fs.js.map
