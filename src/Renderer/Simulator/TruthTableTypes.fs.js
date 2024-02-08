import { Record, toString, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { SimulationData_$reflection, Bit_$reflection } from "./SimulatorTypes.fs.js";
import { bool_type, option_type, class_type, record_type, tuple_type, int32_type, union_type, string_type, list_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { contains, filter, sortByDescending, empty, isEmpty, exists, head, map } from "../fable_modules/fable-library.4.1.4/List.js";
import { toList } from "../fable_modules/fable-library.4.1.4/Map.js";
import { arrayHash, equalArrays, equals, comparePrimitives } from "../fable_modules/fable-library.4.1.4/Util.js";

export class CellData extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Bits", "Algebra", "DC"];
    }
}

export function CellData_$reflection() {
    return union_type("TruthTableTypes.CellData", [], CellData, () => [[["wd", list_type(Bit_$reflection())]], [["var", string_type]], []]);
}

export class CellIO extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SimIO", "Viewer"];
    }
}

export function CellIO_$reflection() {
    return union_type("TruthTableTypes.CellIO", [], CellIO, () => [[["Item", tuple_type(string_type, string_type, int32_type)]], [["Item1", tuple_type(string_type, string_type)], ["Item2", int32_type]]]);
}

export function CellIO__get_getLabel(this$) {
    if (this$.tag === 1) {
        const l_1 = this$.fields[0][0];
        return l_1;
    }
    else {
        const l = this$.fields[0][1];
        return toString(l);
    }
}

export function CellIO__get_getWidth(this$) {
    if (this$.tag === 1) {
        const w_1 = this$.fields[1] | 0;
        return w_1 | 0;
    }
    else {
        const w = this$.fields[0][2] | 0;
        return w | 0;
    }
}

export class TruthTableCell extends Record {
    constructor(IO, Data) {
        super();
        this.IO = IO;
        this.Data = Data;
    }
}

export function TruthTableCell_$reflection() {
    return record_type("TruthTableTypes.TruthTableCell", [], TruthTableCell, () => [["IO", CellIO_$reflection()], ["Data", CellData_$reflection()]]);
}

export function TruthTableCell__get_IsBits(this$) {
    if (this$.Data.tag === 0) {
        return true;
    }
    else {
        return false;
    }
}

export function TruthTableCell__get_IsDC(this$) {
    if (this$.Data.tag === 2) {
        return true;
    }
    else {
        return false;
    }
}

export function TruthTableCell__get_IsAlgebra(this$) {
    if (this$.Data.tag === 1) {
        return true;
    }
    else {
        return false;
    }
}

export class MapToUse extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Table", "HiddenCol", "Filtered", "DCReduced"];
    }
}

export function MapToUse_$reflection() {
    return union_type("TruthTableTypes.MapToUse", [], MapToUse, () => [[], [], [], []]);
}

export class SortType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Ascending", "Descending"];
    }
}

export function SortType_$reflection() {
    return union_type("TruthTableTypes.SortType", [], SortType, () => [[], []]);
}

export class MoveDirection extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["MLeft", "MRight"];
    }
}

export function MoveDirection_$reflection() {
    return union_type("TruthTableTypes.MoveDirection", [], MoveDirection, () => [[], []]);
}

export class TruthTable extends Record {
    constructor(TableMap, FilteredMap, DCMap, SortedListRep, IsTruncated, MaxRowsWithConstraints, HasRedundancies, TableSimData, IOOrder) {
        super();
        this.TableMap = TableMap;
        this.FilteredMap = FilteredMap;
        this.DCMap = DCMap;
        this.SortedListRep = SortedListRep;
        this.IsTruncated = IsTruncated;
        this.MaxRowsWithConstraints = (MaxRowsWithConstraints | 0);
        this.HasRedundancies = HasRedundancies;
        this.TableSimData = TableSimData;
        this.IOOrder = IOOrder;
    }
}

export function TruthTable_$reflection() {
    return record_type("TruthTableTypes.TruthTable", [], TruthTable, () => [["TableMap", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [list_type(TruthTableCell_$reflection()), list_type(TruthTableCell_$reflection())])], ["FilteredMap", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [list_type(TruthTableCell_$reflection()), list_type(TruthTableCell_$reflection())])], ["DCMap", option_type(class_type("Microsoft.FSharp.Collections.FSharpMap`2", [list_type(TruthTableCell_$reflection()), list_type(TruthTableCell_$reflection())]))], ["SortedListRep", list_type(list_type(TruthTableCell_$reflection()))], ["IsTruncated", bool_type], ["MaxRowsWithConstraints", int32_type], ["HasRedundancies", bool_type], ["TableSimData", SimulationData_$reflection()], ["IOOrder", list_type(CellIO_$reflection())]]);
}

export function TruthTable__get_Inputs(this$) {
    return map((cell) => cell.IO, head(toList(this$.TableMap))[0]);
}

/**
 * Returns true if a row contains a Don't Care (X)
 */
export function rowContainsDC(row) {
    return exists(TruthTableCell__get_IsDC, row);
}

/**
 * Returns true if a row contains algebra
 */
export function rowContainsAlgebra(row) {
    return exists(TruthTableCell__get_IsAlgebra, row);
}

export class ConstraintSet extends Record {
    constructor(Equalities, Inequalities) {
        super();
        this.Equalities = Equalities;
        this.Inequalities = Inequalities;
    }
}

export function ConstraintSet_$reflection() {
    return record_type("TruthTableTypes.ConstraintSet", [], ConstraintSet, () => [["Equalities", list_type(EqualityConstraint_$reflection())], ["Inequalities", list_type(InequalityConstraint_$reflection())]]);
}

export class EqualityConstraint extends Record {
    constructor(IO, Value) {
        super();
        this.IO = IO;
        this.Value = (Value | 0);
    }
}

export function EqualityConstraint_$reflection() {
    return record_type("TruthTableTypes.EqualityConstraint", [], EqualityConstraint, () => [["IO", CellIO_$reflection()], ["Value", int32_type]]);
}

export class InequalityConstraint extends Record {
    constructor(LowerBound, IO, UpperBound, Range$) {
        super();
        this.LowerBound = (LowerBound | 0);
        this.IO = IO;
        this.UpperBound = (UpperBound | 0);
        this.Range = (Range$ | 0);
    }
}

export function InequalityConstraint_$reflection() {
    return record_type("TruthTableTypes.InequalityConstraint", [], InequalityConstraint, () => [["LowerBound", int32_type], ["IO", CellIO_$reflection()], ["UpperBound", int32_type], ["Range", int32_type]]);
}

export function ConstraintSet__get_isEmpty(this$) {
    let matchResult;
    if (isEmpty(this$.Equalities)) {
        if (isEmpty(this$.Inequalities)) {
            matchResult = 0;
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
}

export const equalities_ = [(a) => a.Equalities, (s) => ((a_1) => (new ConstraintSet(s, a_1.Inequalities)))];

export const inequalities_ = [(a) => a.Inequalities, (s) => ((a_1) => (new ConstraintSet(a_1.Equalities, s)))];

export class Constraint extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Equality", "Inequality"];
    }
}

export function Constraint_$reflection() {
    return union_type("TruthTableTypes.Constraint", [], Constraint, () => [[["Item", EqualityConstraint_$reflection()]], [["Item", InequalityConstraint_$reflection()]]]);
}

export class ConstraintType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Equ", "Ineq"];
    }
}

export function ConstraintType_$reflection() {
    return union_type("TruthTableTypes.ConstraintType", [], ConstraintType, () => [[], []]);
}

export function isEqu(c) {
    if (c.tag === 0) {
        return true;
    }
    else {
        return false;
    }
}

export const emptyConstraintSet = new ConstraintSet(empty(), empty());

export function makeInequalityConstraint(lower, io, upper) {
    const range = ((upper - lower) + 1) | 0;
    return new InequalityConstraint(lower, io, upper, range);
}

export function orderConstraints(set$) {
    const ordered = sortByDescending((c) => c.Range, set$.Inequalities, {
        Compare: comparePrimitives,
    });
    return new ConstraintSet(set$.Equalities, ordered);
}

export class TableInput extends Record {
    constructor(IO, IsAlgebra, MaxRowCount, ConstrainedRowCount, AllowedRowCount, Constraints) {
        super();
        this.IO = IO;
        this.IsAlgebra = IsAlgebra;
        this.MaxRowCount = (MaxRowCount | 0);
        this.ConstrainedRowCount = (ConstrainedRowCount | 0);
        this.AllowedRowCount = (AllowedRowCount | 0);
        this.Constraints = Constraints;
    }
}

export function TableInput_$reflection() {
    return record_type("TruthTableTypes.TableInput", [], TableInput, () => [["IO", tuple_type(string_type, string_type, int32_type)], ["IsAlgebra", bool_type], ["MaxRowCount", int32_type], ["ConstrainedRowCount", int32_type], ["AllowedRowCount", int32_type], ["Constraints", ConstraintSet_$reflection()]]);
}

/**
 * Create a TableInput data structure from a SimulationIO using application state
 */
export function initTableInput(simIO_, simIO__1, simIO__2, allConstraints, algebraIOs) {
    const simIO = [simIO_, simIO__1, simIO__2];
    const w = simIO[2] | 0;
    const specificEqualities = filter((con) => equals(con.IO, new CellIO(0, [simIO])), allConstraints.Equalities);
    const specificInequalities = filter((con_1) => equals(con_1.IO, new CellIO(0, [simIO])), allConstraints.Inequalities);
    const isAlg = contains(simIO, algebraIOs, {
        Equals: equalArrays,
        GetHashCode: arrayHash,
    });
    return new TableInput(simIO, isAlg, ~~Math.pow(2, w), 0, 0, new ConstraintSet(specificEqualities, specificInequalities));
}

//# sourceMappingURL=TruthTableTypes.fs.js.map
