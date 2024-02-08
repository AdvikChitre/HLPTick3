import { Record, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { array_type, option_type, record_type, list_type, bool_type, int32_type, obj_type, lambda_type, unit_type, union_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { CSSProp_$reflection } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";

export class State extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["Code"];
    }
}

export function State_$reflection() {
    return union_type("VerilogTypes.State", [], State, () => [[["Item", string_type]]]);
}

export class CodeEditorProps extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Placeholder", "Value", "OnValueChange", "Highlight", "TabSize", "InsertSpaces", "IgnoreTabKey", "Padding", "TextAreaId", "TextAreaClassName", "PreClassName", "Style"];
    }
}

export function CodeEditorProps_$reflection() {
    return union_type("VerilogTypes.CodeEditorProps", [], CodeEditorProps, () => [[["Item", string_type]], [["Item", string_type]], [["Item", lambda_type(string_type, unit_type)]], [["Item", lambda_type(string_type, obj_type)]], [["Item", int32_type]], [["Item", bool_type]], [["Item", bool_type]], [["Item", int32_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", list_type(CSSProp_$reflection())]]]);
}

export class CodeEditorOpen extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NewVerilogFile", "UpdateVerilogFile"];
    }
}

export function CodeEditorOpen_$reflection() {
    return union_type("VerilogTypes.CodeEditorOpen", [], CodeEditorOpen, () => [[], [["Item", string_type]]]);
}

export class IdentifierT extends Record {
    constructor(Name, Location) {
        super();
        this.Name = Name;
        this.Location = (Location | 0);
    }
}

export function IdentifierT_$reflection() {
    return record_type("VerilogTypes.IdentifierT", [], IdentifierT, () => [["Name", string_type], ["Location", int32_type]]);
}

export class ModuleNameT extends Record {
    constructor(Type, Name) {
        super();
        this.Type = Type;
        this.Name = Name;
    }
}

export function ModuleNameT_$reflection() {
    return record_type("VerilogTypes.ModuleNameT", [], ModuleNameT, () => [["Type", string_type], ["Name", IdentifierT_$reflection()]]);
}

export class NumberT extends Record {
    constructor(Type, NumberType, Bits, Base, UnsignedNumber, AllNumber, Location) {
        super();
        this.Type = Type;
        this.NumberType = NumberType;
        this.Bits = Bits;
        this.Base = Base;
        this.UnsignedNumber = UnsignedNumber;
        this.AllNumber = AllNumber;
        this.Location = (Location | 0);
    }
}

export function NumberT_$reflection() {
    return record_type("VerilogTypes.NumberT", [], NumberT, () => [["Type", string_type], ["NumberType", string_type], ["Bits", option_type(string_type)], ["Base", option_type(string_type)], ["UnsignedNumber", option_type(string_type)], ["AllNumber", option_type(string_type)], ["Location", int32_type]]);
}

export class RangeT extends Record {
    constructor(Type, Start, End, Location) {
        super();
        this.Type = Type;
        this.Start = Start;
        this.End = End;
        this.Location = (Location | 0);
    }
}

export function RangeT_$reflection() {
    return record_type("VerilogTypes.RangeT", [], RangeT, () => [["Type", string_type], ["Start", string_type], ["End", string_type], ["Location", int32_type]]);
}

export class IOItemT extends Record {
    constructor(Type, DeclarationType, Range$, Variables, Location) {
        super();
        this.Type = Type;
        this.DeclarationType = DeclarationType;
        this.Range = Range$;
        this.Variables = Variables;
        this.Location = (Location | 0);
    }
}

export function IOItemT_$reflection() {
    return record_type("VerilogTypes.IOItemT", [], IOItemT, () => [["Type", string_type], ["DeclarationType", string_type], ["Range", option_type(RangeT_$reflection())], ["Variables", array_type(IdentifierT_$reflection())], ["Location", int32_type]]);
}

export class ParameterT extends Record {
    constructor(Type, Identifier, RHS) {
        super();
        this.Type = Type;
        this.Identifier = Identifier;
        this.RHS = RHS;
    }
}

export function ParameterT_$reflection() {
    return record_type("VerilogTypes.ParameterT", [], ParameterT, () => [["Type", string_type], ["Identifier", IdentifierT_$reflection()], ["RHS", NumberT_$reflection()]]);
}

export class ParameterItemT extends Record {
    constructor(Type, DeclarationType, Parameter) {
        super();
        this.Type = Type;
        this.DeclarationType = DeclarationType;
        this.Parameter = Parameter;
    }
}

export function ParameterItemT_$reflection() {
    return record_type("VerilogTypes.ParameterItemT", [], ParameterItemT, () => [["Type", string_type], ["DeclarationType", string_type], ["Parameter", ParameterT_$reflection()]]);
}

export class PrimaryT extends Record {
    constructor(Type, PrimaryType, BitsStart, BitsEnd, Primary, Width) {
        super();
        this.Type = Type;
        this.PrimaryType = PrimaryType;
        this.BitsStart = BitsStart;
        this.BitsEnd = BitsEnd;
        this.Primary = Primary;
        this.Width = Width;
    }
}

export function PrimaryT_$reflection() {
    return record_type("VerilogTypes.PrimaryT", [], PrimaryT, () => [["Type", string_type], ["PrimaryType", string_type], ["BitsStart", option_type(string_type)], ["BitsEnd", option_type(string_type)], ["Primary", IdentifierT_$reflection()], ["Width", option_type(int32_type)]]);
}

export class ExpressionT extends Record {
    constructor(Type, Operator, Head, Tail, Unary) {
        super();
        this.Type = Type;
        this.Operator = Operator;
        this.Head = Head;
        this.Tail = Tail;
        this.Unary = Unary;
    }
}

export function ExpressionT_$reflection() {
    return record_type("VerilogTypes.ExpressionT", [], ExpressionT, () => [["Type", string_type], ["Operator", option_type(string_type)], ["Head", option_type(ExpressionT_$reflection())], ["Tail", option_type(ExpressionT_$reflection())], ["Unary", option_type(UnaryT_$reflection())]]);
}

export class UnaryT extends Record {
    constructor(Type, Primary, Number$, Expression) {
        super();
        this.Type = Type;
        this.Primary = Primary;
        this.Number = Number$;
        this.Expression = Expression;
    }
}

export function UnaryT_$reflection() {
    return record_type("VerilogTypes.UnaryT", [], UnaryT, () => [["Type", string_type], ["Primary", option_type(PrimaryT_$reflection())], ["Number", option_type(NumberT_$reflection())], ["Expression", option_type(ExpressionT_$reflection())]]);
}

export class AssignmentLHST extends Record {
    constructor(Type, PrimaryType, BitsStart, BitsEnd, Primary, VariableBitSelect, Width) {
        super();
        this.Type = Type;
        this.PrimaryType = PrimaryType;
        this.BitsStart = BitsStart;
        this.BitsEnd = BitsEnd;
        this.Primary = Primary;
        this.VariableBitSelect = VariableBitSelect;
        this.Width = Width;
    }
}

export function AssignmentLHST_$reflection() {
    return record_type("VerilogTypes.AssignmentLHST", [], AssignmentLHST, () => [["Type", string_type], ["PrimaryType", string_type], ["BitsStart", option_type(string_type)], ["BitsEnd", option_type(string_type)], ["Primary", IdentifierT_$reflection()], ["VariableBitSelect", option_type(ExpressionT_$reflection())], ["Width", option_type(int32_type)]]);
}

export class AssignmentT extends Record {
    constructor(Type, LHS, RHS) {
        super();
        this.Type = Type;
        this.LHS = LHS;
        this.RHS = RHS;
    }
}

export function AssignmentT_$reflection() {
    return record_type("VerilogTypes.AssignmentT", [], AssignmentT, () => [["Type", string_type], ["LHS", AssignmentLHST_$reflection()], ["RHS", ExpressionT_$reflection()]]);
}

export class ContinuousAssignT extends Record {
    constructor(Type, StatementType, Assignment, Location) {
        super();
        this.Type = Type;
        this.StatementType = StatementType;
        this.Assignment = Assignment;
        this.Location = (Location | 0);
    }
}

export function ContinuousAssignT_$reflection() {
    return record_type("VerilogTypes.ContinuousAssignT", [], ContinuousAssignT, () => [["Type", string_type], ["StatementType", string_type], ["Assignment", AssignmentT_$reflection()], ["Location", int32_type]]);
}

export class DeclarationT extends Record {
    constructor(Type, DeclarationType, Range$, Variables, Location) {
        super();
        this.Type = Type;
        this.DeclarationType = DeclarationType;
        this.Range = Range$;
        this.Variables = Variables;
        this.Location = (Location | 0);
    }
}

export function DeclarationT_$reflection() {
    return record_type("VerilogTypes.DeclarationT", [], DeclarationT, () => [["Type", string_type], ["DeclarationType", string_type], ["Range", option_type(RangeT_$reflection())], ["Variables", array_type(IdentifierT_$reflection())], ["Location", int32_type]]);
}

export class NonBlockingAssignT extends Record {
    constructor(Assignment) {
        super();
        this.Assignment = Assignment;
    }
}

export function NonBlockingAssignT_$reflection() {
    return record_type("VerilogTypes.NonBlockingAssignT", [], NonBlockingAssignT, () => [["Assignment", AssignmentT_$reflection()]]);
}

export class BlockingAssignT extends Record {
    constructor(Operator, Assignment) {
        super();
        this.Operator = Operator;
        this.Assignment = Assignment;
    }
}

export function BlockingAssignT_$reflection() {
    return record_type("VerilogTypes.BlockingAssignT", [], BlockingAssignT, () => [["Operator", string_type], ["Assignment", AssignmentT_$reflection()]]);
}

export class SeqBlockT extends Record {
    constructor(Type, Statements, Location) {
        super();
        this.Type = Type;
        this.Statements = Statements;
        this.Location = (Location | 0);
    }
}

export function SeqBlockT_$reflection() {
    return record_type("VerilogTypes.SeqBlockT", [], SeqBlockT, () => [["Type", string_type], ["Statements", array_type(StatementT_$reflection())], ["Location", int32_type]]);
}

export class StatementT extends Record {
    constructor(Type, StatementType, NonBlockingAssign, BlockingAssign, SeqBlock, Conditional, CaseStatement, Location) {
        super();
        this.Type = Type;
        this.StatementType = StatementType;
        this.NonBlockingAssign = NonBlockingAssign;
        this.BlockingAssign = BlockingAssign;
        this.SeqBlock = SeqBlock;
        this.Conditional = Conditional;
        this.CaseStatement = CaseStatement;
        this.Location = (Location | 0);
    }
}

export function StatementT_$reflection() {
    return record_type("VerilogTypes.StatementT", [], StatementT, () => [["Type", string_type], ["StatementType", string_type], ["NonBlockingAssign", option_type(NonBlockingAssignT_$reflection())], ["BlockingAssign", option_type(BlockingAssignT_$reflection())], ["SeqBlock", option_type(SeqBlockT_$reflection())], ["Conditional", option_type(ConditionalT_$reflection())], ["CaseStatement", option_type(CaseStatementT_$reflection())], ["Location", int32_type]]);
}

export class IfStatementT extends Record {
    constructor(Type, Condition, Statement, Location) {
        super();
        this.Type = Type;
        this.Condition = Condition;
        this.Statement = Statement;
        this.Location = (Location | 0);
    }
}

export function IfStatementT_$reflection() {
    return record_type("VerilogTypes.IfStatementT", [], IfStatementT, () => [["Type", string_type], ["Condition", ExpressionT_$reflection()], ["Statement", StatementT_$reflection()], ["Location", int32_type]]);
}

export class ConditionalT extends Record {
    constructor(Type, IfStatement, ElseStatement, Location) {
        super();
        this.Type = Type;
        this.IfStatement = IfStatement;
        this.ElseStatement = ElseStatement;
        this.Location = (Location | 0);
    }
}

export function ConditionalT_$reflection() {
    return record_type("VerilogTypes.ConditionalT", [], ConditionalT, () => [["Type", string_type], ["IfStatement", IfStatementT_$reflection()], ["ElseStatement", option_type(StatementT_$reflection())], ["Location", int32_type]]);
}

export class CaseItemT extends Record {
    constructor(Type, Expressions, Statement) {
        super();
        this.Type = Type;
        this.Expressions = Expressions;
        this.Statement = Statement;
    }
}

export function CaseItemT_$reflection() {
    return record_type("VerilogTypes.CaseItemT", [], CaseItemT, () => [["Type", string_type], ["Expressions", array_type(NumberT_$reflection())], ["Statement", StatementT_$reflection()]]);
}

export class CaseStatementT extends Record {
    constructor(Type, Expression, CaseItems, Default, Location) {
        super();
        this.Type = Type;
        this.Expression = Expression;
        this.CaseItems = CaseItems;
        this.Default = Default;
        this.Location = (Location | 0);
    }
}

export function CaseStatementT_$reflection() {
    return record_type("VerilogTypes.CaseStatementT", [], CaseStatementT, () => [["Type", string_type], ["Expression", ExpressionT_$reflection()], ["CaseItems", array_type(CaseItemT_$reflection())], ["Default", option_type(StatementT_$reflection())], ["Location", int32_type]]);
}

export class AlwaysConstructT extends Record {
    constructor(Type, AlwaysType, Statement, ClkLoc, Location) {
        super();
        this.Type = Type;
        this.AlwaysType = AlwaysType;
        this.Statement = Statement;
        this.ClkLoc = (ClkLoc | 0);
        this.Location = (Location | 0);
    }
}

export function AlwaysConstructT_$reflection() {
    return record_type("VerilogTypes.AlwaysConstructT", [], AlwaysConstructT, () => [["Type", string_type], ["AlwaysType", string_type], ["Statement", StatementT_$reflection()], ["ClkLoc", int32_type], ["Location", int32_type]]);
}

export class NamedPortConnectionT extends Record {
    constructor(Type, PortId, Primary) {
        super();
        this.Type = Type;
        this.PortId = PortId;
        this.Primary = Primary;
    }
}

export function NamedPortConnectionT_$reflection() {
    return record_type("VerilogTypes.NamedPortConnectionT", [], NamedPortConnectionT, () => [["Type", string_type], ["PortId", IdentifierT_$reflection()], ["Primary", PrimaryT_$reflection()]]);
}

export class ModuleInstantiationT extends Record {
    constructor(Type, Module, Identifier, Connections) {
        super();
        this.Type = Type;
        this.Module = Module;
        this.Identifier = Identifier;
        this.Connections = Connections;
    }
}

export function ModuleInstantiationT_$reflection() {
    return record_type("VerilogTypes.ModuleInstantiationT", [], ModuleInstantiationT, () => [["Type", string_type], ["Module", IdentifierT_$reflection()], ["Identifier", IdentifierT_$reflection()], ["Connections", array_type(NamedPortConnectionT_$reflection())]]);
}

export class ItemT extends Record {
    constructor(Type, ItemType, IODecl, Decl, ParamDecl, Statement, AlwaysConstruct, ModuleInstantiation, Location) {
        super();
        this.Type = Type;
        this.ItemType = ItemType;
        this.IODecl = IODecl;
        this.Decl = Decl;
        this.ParamDecl = ParamDecl;
        this.Statement = Statement;
        this.AlwaysConstruct = AlwaysConstruct;
        this.ModuleInstantiation = ModuleInstantiation;
        this.Location = (Location | 0);
    }
}

export function ItemT_$reflection() {
    return record_type("VerilogTypes.ItemT", [], ItemT, () => [["Type", string_type], ["ItemType", string_type], ["IODecl", option_type(IOItemT_$reflection())], ["Decl", option_type(DeclarationT_$reflection())], ["ParamDecl", option_type(ParameterItemT_$reflection())], ["Statement", option_type(ContinuousAssignT_$reflection())], ["AlwaysConstruct", option_type(AlwaysConstructT_$reflection())], ["ModuleInstantiation", option_type(ModuleInstantiationT_$reflection())], ["Location", int32_type]]);
}

export class ModuleItemsT extends Record {
    constructor(Type, ItemList) {
        super();
        this.Type = Type;
        this.ItemList = ItemList;
    }
}

export function ModuleItemsT_$reflection() {
    return record_type("VerilogTypes.ModuleItemsT", [], ModuleItemsT, () => [["Type", string_type], ["ItemList", array_type(ItemT_$reflection())]]);
}

export class ModuleT extends Record {
    constructor(Type, ModuleName, PortList, Locations, ModuleItems, EndLocation) {
        super();
        this.Type = Type;
        this.ModuleName = ModuleName;
        this.PortList = PortList;
        this.Locations = Locations;
        this.ModuleItems = ModuleItems;
        this.EndLocation = (EndLocation | 0);
    }
}

export function ModuleT_$reflection() {
    return record_type("VerilogTypes.ModuleT", [], ModuleT, () => [["Type", string_type], ["ModuleName", IdentifierT_$reflection()], ["PortList", array_type(string_type)], ["Locations", array_type(string_type)], ["ModuleItems", ModuleItemsT_$reflection()], ["EndLocation", int32_type]]);
}

export class VerilogInput extends Record {
    constructor(Type, Module) {
        super();
        this.Type = Type;
        this.Module = Module;
    }
}

export function VerilogInput_$reflection() {
    return record_type("VerilogTypes.VerilogInput", [], VerilogInput, () => [["Type", string_type], ["Module", ModuleT_$reflection()]]);
}

export class PortAssignmentError extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Unassigned", "DoubleAssignment"];
    }
}

export function PortAssignmentError_$reflection() {
    return union_type("VerilogTypes.PortAssignmentError", [], PortAssignmentError, () => [[], []]);
}

export class ReplaceType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["IODeclaration", "Assignment", "Variable", "NoReplace"];
    }
}

export function ReplaceType_$reflection() {
    return union_type("VerilogTypes.ReplaceType", [], ReplaceType, () => [[], [], [["Item", string_type]], []]);
}

export class OneUnary extends Record {
    constructor(Name, ResultWidth, Head, Tail, Elements) {
        super();
        this.Name = Name;
        this.ResultWidth = (ResultWidth | 0);
        this.Head = Head;
        this.Tail = Tail;
        this.Elements = Elements;
    }
}

export function OneUnary_$reflection() {
    return record_type("VerilogTypes.OneUnary", [], OneUnary, () => [["Name", string_type], ["ResultWidth", int32_type], ["Head", option_type(OneUnary_$reflection())], ["Tail", option_type(OneUnary_$reflection())], ["Elements", list_type(OneUnary_$reflection())]]);
}

export class ExtraErrorInfo extends Record {
    constructor(Text$, Copy, Replace) {
        super();
        this.Text = Text$;
        this.Copy = Copy;
        this.Replace = Replace;
    }
}

export function ExtraErrorInfo_$reflection() {
    return record_type("VerilogTypes.ExtraErrorInfo", [], ExtraErrorInfo, () => [["Text", string_type], ["Copy", bool_type], ["Replace", ReplaceType_$reflection()]]);
}

export class ErrorInfo extends Record {
    constructor(Line, Col, Length, Message, ExtraErrors) {
        super();
        this.Line = (Line | 0);
        this.Col = (Col | 0);
        this.Length = (Length | 0);
        this.Message = Message;
        this.ExtraErrors = ExtraErrors;
    }
}

export function ErrorInfo_$reflection() {
    return record_type("VerilogTypes.ErrorInfo", [], ErrorInfo, () => [["Line", int32_type], ["Col", int32_type], ["Length", int32_type], ["Message", string_type], ["ExtraErrors", option_type(array_type(ExtraErrorInfo_$reflection()))]]);
}

export class ParserOutput extends Record {
    constructor(Result, Error$, NewLinesIndex) {
        super();
        this.Result = Result;
        this.Error = Error$;
        this.NewLinesIndex = NewLinesIndex;
    }
}

export function ParserOutput_$reflection() {
    return record_type("VerilogTypes.ParserOutput", [], ParserOutput, () => [["Result", option_type(string_type)], ["Error", option_type(ErrorInfo_$reflection())], ["NewLinesIndex", option_type(array_type(int32_type))]]);
}

//# sourceMappingURL=VerilogTypes.fs.js.map
