import { collect, append, filter, updateAt, item, tryFindIndex, head, forAll, singleton, isEmpty, empty, cons, fold, forAll2, length } from "../../fable_modules/fable-library.4.1.4/List.js";
import { compare, equals } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { printf, toFail } from "../../fable_modules/fable-library.4.1.4/String.js";
import { ofList, toList, tryFind } from "../../fable_modules/fable-library.4.1.4/Map.js";
import { TruthTable, TruthTableCell, CellData, TruthTable__get_Inputs, rowContainsDC } from "../../Simulator/TruthTableTypes.fs.js";

/**
 * Returns true if two rows are equal, supporting Don't Care terms
 */
export function rowEquals(row1, row2) {
    if (length(row1) !== length(row2)) {
        return false;
    }
    else {
        return forAll2((c1, c2) => {
            const matchValue = c1.Data;
            const matchValue_1 = c2.Data;
            let matchResult, a, b;
            switch (matchValue.tag) {
                case 0: {
                    switch (matchValue_1.tag) {
                        case 0: {
                            matchResult = 0;
                            a = matchValue.fields[0];
                            b = matchValue_1.fields[0];
                            break;
                        }
                        case 2: {
                            matchResult = 2;
                            break;
                        }
                        default:
                            matchResult = 3;
                    }
                    break;
                }
                case 2: {
                    matchResult = 1;
                    break;
                }
                default:
                    if (matchValue_1.tag === 2) {
                        matchResult = 2;
                    }
                    else {
                        matchResult = 3;
                    }
            }
            switch (matchResult) {
                case 0:
                    return equals(a, b);
                case 1:
                    return true;
                case 2:
                    return true;
                default:
                    return toFail(printf("what? Rows containing algebraic cells passed to rowEquals"));
            }
        }, row1, row2);
    }
}

/**
 * Alternative to Map.tryFind for Table Maps which supports Don't Care terms.
 * If a row maps to multiple rows (happens with Don't Care Rows), all rows are returned.
 */
export function tableTryFind(row, tMap) {
    const matchValue = tryFind(row, tMap);
    const matchValue_1 = rowContainsDC(row);
    if (matchValue == null) {
        if (matchValue_1) {
            const _arg = fold((acc, tupledArg) => {
                const lhs = tupledArg[0];
                const rhs_1 = tupledArg[1];
                if (rowEquals(row, lhs)) {
                    return cons(rhs_1, acc);
                }
                else {
                    return acc;
                }
            }, empty(), toList(tMap));
            if (isEmpty(_arg)) {
                return void 0;
            }
            else {
                const lst = _arg;
                return lst;
            }
        }
        else {
            return void 0;
        }
    }
    else {
        const rhs = matchValue;
        return singleton(rhs);
    }
}

/**
 * Given a row containing Don't Care terms, validate it against the Truth Table to check
 * if the relationship it describes is correct.
 */
export function isValidDCRow(row, table) {
    const matchValue = tableTryFind(row, table.FilteredMap);
    if (matchValue != null) {
        const outputs = matchValue;
        const _arg = forAll((r) => equals(r, head(outputs)), outputs);
        if (_arg) {
            return head(outputs);
        }
        else {
            return void 0;
        }
    }
    else {
        return void 0;
    }
}

/**
 * Finds all rows where a given input is Don't Care (X)
 */
export function inputDCRows(input, table) {
    const allInputs = TruthTable__get_Inputs(table);
    let tMap;
    const matchValue = table.DCMap;
    if (matchValue != null) {
        const m = matchValue;
        tMap = m;
    }
    else {
        tMap = table.FilteredMap;
    }
    if (length(allInputs) === 1) {
        return empty();
    }
    else {
        const allInputs_1 = TruthTable__get_Inputs(table);
        let inputIdx;
        const matchValue_1 = tryFindIndex((c) => equals(c, input), allInputs_1);
        if (matchValue_1 != null) {
            const idx = matchValue_1 | 0;
            inputIdx = idx;
        }
        else {
            inputIdx = toFail(printf("what? Trying to DC Reduce a table over an input not present in the table"));
        }
        const tableLst = toList(tMap);
        return fold((acc, tupledArg) => {
            const lhs = tupledArg[0];
            const rhs = tupledArg[1];
            const alreadyDC = item(inputIdx, lhs).Data.tag === 2;
            const possible = updateAt(inputIdx, new TruthTableCell(input, new CellData(2, [])), lhs);
            const matchValue_3 = isValidDCRow(possible, table);
            let matchResult;
            if (alreadyDC) {
                matchResult = 0;
            }
            else if (matchValue_3 != null) {
                matchResult = 1;
            }
            else {
                matchResult = 0;
            }
            switch (matchResult) {
                case 0:
                    return acc;
                default:
                    return cons([possible, rhs], acc);
            }
        }, empty(), tableLst);
    }
}

/**
 * Reduce the Truth Table by removing rows covered by Don't Care Rows.
 */
export function reduceWithDCRow(regularRows, dcLeft, dcRight) {
    return filter((tupledArg) => {
        const regLeft = tupledArg[0];
        const regRight = tupledArg[1];
        return !rowEquals(append(dcLeft, dcRight), append(regLeft, regRight));
    }, regularRows);
}

/**
 * Recursive function for Don't Care reduction of a Truth Table.
 * Table is repeatedly reduced until running the reduction logic does not change
 * the returned table.
 */
export function reduceTruthTable$0027(table_mut, depth_mut, maxDepth_mut) {
    let md, md_1;
    reduceTruthTable$0027:
    while (true) {
        const table = table_mut, depth = depth_mut, maxDepth = maxDepth_mut;
        let tMap;
        const matchValue = table.DCMap;
        if (matchValue != null) {
            const m = matchValue;
            tMap = m;
        }
        else {
            tMap = table.TableMap;
        }
        const allDCRows = collect((input) => inputDCRows(input, table), TruthTable__get_Inputs(table));
        const remainingRegularRows = fold((regularRows, tupledArg) => reduceWithDCRow(regularRows, tupledArg[0], tupledArg[1]), toList(tMap), allDCRows);
        const newMap = ofList(append(allDCRows, remainingRegularRows), {
            Compare: compare,
        });
        let matchResult, md_2, md_3;
        if (maxDepth != null) {
            if ((md = (maxDepth | 0), md < 1)) {
                matchResult = 0;
                md_2 = maxDepth;
            }
            else if ((md_1 = (maxDepth | 0), md_1 === depth)) {
                matchResult = 1;
                md_3 = maxDepth;
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
                return toFail(`DC Reduction with maximum depth of recursion ${md_2} called.
                Maximum Depth must at least 1.`);
            case 1:
                return new TruthTable(table.TableMap, table.FilteredMap, newMap, table.SortedListRep, table.IsTruncated, table.MaxRowsWithConstraints, table.HasRedundancies, table.TableSimData, table.IOOrder);
            default:
                if (tMap.Equals(newMap)) {
                    return new TruthTable(table.TableMap, table.FilteredMap, newMap, table.SortedListRep, table.IsTruncated, table.MaxRowsWithConstraints, table.HasRedundancies, table.TableSimData, table.IOOrder);
                }
                else {
                    table_mut = (new TruthTable(table.TableMap, table.FilteredMap, newMap, table.SortedListRep, table.IsTruncated, table.MaxRowsWithConstraints, table.HasRedundancies, table.TableSimData, table.IOOrder));
                    depth_mut = (depth + 1);
                    maxDepth_mut = maxDepth;
                    continue reduceTruthTable$0027;
                }
        }
        break;
    }
}

/**
 * Returns true if a truth table has redundancies
 */
export function hasRedundancies(table) {
    const onceReduced = reduceTruthTable$0027(table, 1, 1);
    const matchValue = onceReduced.DCMap;
    if (matchValue != null) {
        const dcMap = matchValue;
        return !dcMap.Equals(table.TableMap);
    }
    else {
        return toFail(printf("what? reduceTruthTable\' should never return with DCMap = None"));
    }
}

/**
 * Top-level function for DC reduction of truth tables
 */
export function reduceTruthTable(table, maxDepth) {
    return reduceTruthTable$0027(table, 1, maxDepth);
}

//# sourceMappingURL=TruthTableReduce.fs.js.map
