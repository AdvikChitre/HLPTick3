import { tryFind as tryFind_2, item as item_4, unzip, singleton as singleton_1, ofArray, cons, toArray, allPairs, indexed, map as map_1, collect, append, fold, filter, empty, head, tail, isEmpty } from "../fable_modules/fable-library.4.1.4/List.js";
import { getAllExpressions$0027, getAlwaysStatement, statementToNode, getItem, getAssignments$0027, getContAssignments, getNonBlockingAssignmentsWithLocation, getBlockingAssignmentsWithLocation, ASTNode, getAlwaysBlocks, foldAST } from "./VerilogAST.fs.js";
import { toFail, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { ExtraErrorInfo, ReplaceType } from "./VerilogTypes.fs.js";
import { findCloseVariable, getModuleInstantiationStatements, getPrimaryBits, getRHSBits, primariesUsedInAssignment, checkNumber, checkExpr, getCaseItemNums, getLHSBits$0027, getAlwaysBlocksWithLocations, getLHSBitsAssignedCertainly, getLineNumber, getWidthOfExpr, getCaseStatementsWithLoc, getDeclarations, createErrorMessage } from "./ErrorCheckHelpers.fs.js";
import { ofArray as ofArray_1, contains, FSharpSet__Add, FSharpSet__Contains, union, count, map as map_2, difference, empty as empty_2, add as add_1, intersect, toList, ofList, singleton } from "../fable_modules/fable-library.4.1.4/Set.js";
import { int32ToString, equals, stringHash, comparePrimitives } from "../fable_modules/fable-library.4.1.4/Util.js";
import { List_distinct } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { tryFind as tryFind_1, append as append_1, map as map_3, collect as collect_1, fold as fold_1 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { filter as filter_1, map as map_4, keys, tryFind, empty as empty_1, find, containsKey, fold as fold_2, add } from "../fable_modules/fable-library.4.1.4/Map.js";
import { parse } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { defaultArg, value as value_4 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { toDecimal } from "../Simulator/NumberHelpers.fs.js";
import { toInt32, compare } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { pow2int64 } from "../Common/Helpers.fs.js";
import { toArray as toArray_1, tryPick, toList as toList_1 } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";

function convert(lst_mut, acc_mut) {
    convert:
    while (true) {
        const lst = lst_mut, acc = acc_mut;
        if (!isEmpty(lst)) {
            if (isEmpty(tail(lst))) {
                const hd = head(lst);
                lst_mut = empty();
                acc_mut = (acc + hd);
                continue convert;
            }
            else {
                const hd_1 = head(lst);
                const tl = tail(lst);
                lst_mut = tl;
                acc_mut = ((acc + hd_1) + ", ");
                continue convert;
            }
        }
        else {
            return acc;
        }
        break;
    }
}

/**
 * Checks if always_comb only contains blocking assignments and always_ff only contains nonblocking assignments
 */
export function checkProceduralAssignments(ast, linesLocations, errorList) {
    const alwaysBlocks_1 = foldAST(getAlwaysBlocks, empty(), new ASTNode(24, [ast]));
    const clockedAlwaysBlocks = filter((always) => (always.AlwaysType === "always_ff"), alwaysBlocks_1);
    const combAlwaysBlocks = filter((always_1) => (always_1.AlwaysType === "always_comb"), alwaysBlocks_1);
    const checkClockedAlwaysBlock = (alwaysBlock) => {
        const blockingAssigns = foldAST(getBlockingAssignmentsWithLocation, empty(), new ASTNode(4, [alwaysBlock]));
        const localErrors = fold((errors, blocking) => {
            const message = toText(printf("Blocking assignment in always_ff block"));
            const extraMessages = [new ExtraErrorInfo(toText(printf("Blocking assignment in a clocked always block is not supported.\nPlease use nonblocking assignments in clocked always blocks")), false, new ReplaceType(3, [])), new ExtraErrorInfo(toText(printf("<=")), true, new ReplaceType(2, ["="]))];
            const currError = createErrorMessage(linesLocations, blocking[1], message, extraMessages, blocking[0].Assignment.Type);
            return append(errors, currError);
        }, empty(), blockingAssigns);
        return localErrors;
    };
    const checkCombAlwaysBlock = (alwaysBlock_1) => {
        const nonBlockingAssigns = foldAST(getNonBlockingAssignmentsWithLocation, empty(), new ASTNode(4, [alwaysBlock_1]));
        const localErrors_1 = fold((errors_1, nonblocking) => {
            const message_1 = toText(printf("Nonblocking assignment in always_comb block"));
            const extraMessages_1 = [new ExtraErrorInfo(toText(printf("Nonblocking assignment in a combinational always block is not supported.\nPlease use blocking assignments in combinational always blocks")), false, new ReplaceType(3, [])), new ExtraErrorInfo(toText(printf("=")), true, new ReplaceType(2, ["<="]))];
            const currError_1 = createErrorMessage(linesLocations, nonblocking[1], message_1, extraMessages_1, nonblocking[0].Assignment.Type);
            return append(errors_1, currError_1);
        }, empty(), nonBlockingAssigns);
        return localErrors_1;
    };
    const clockedErrors = collect(checkClockedAlwaysBlock, clockedAlwaysBlocks);
    const combErrors = collect(checkCombAlwaysBlock, combAlwaysBlocks);
    return append(errorList, append(clockedErrors, combErrors));
}

/**
 * Checks if a variable is driven by multiple always blocks or continuous assignments
 * Could be improved if it printed out the variables / marked the error at the location of the variables
 */
export function checkVariablesDrivenSimultaneously(ast, linesLocations, errorList) {
    let arg;
    const alwaysBlocks_1 = foldAST(getAlwaysBlocks, empty(), new ASTNode(24, [ast]));
    const continuousAssignBits = map_1((assign) => singleton(assign.LHS.Primary.Name, {
        Compare: comparePrimitives,
    }), foldAST(getContAssignments, empty(), new ASTNode(24, [ast])));
    const getAlwaysAssignmentBits = (alwaysBlock) => {
        const assignments_2 = foldAST(getAssignments$0027, empty(), new ASTNode(4, [alwaysBlock]));
        return ofList(List_distinct(map_1((assign_1) => assign_1.LHS.Primary.Name, assignments_2), {
            Equals: (x_1, y_1) => (x_1 === y_1),
            GetHashCode: stringHash,
        }), {
            Compare: comparePrimitives,
        });
    };
    const alwaysAssignmentBits = append(continuousAssignBits, map_1(getAlwaysAssignmentBits, alwaysBlocks_1));
    const getDuplicates = (tupledArg) => {
        const _arg = tupledArg[0];
        const _arg_1 = tupledArg[1];
        const index1 = _arg[0];
        const assignmentBits1 = _arg[1];
        const index2 = _arg_1[0];
        const assignmentBits2 = _arg_1[1];
        if (equals(index1, index2)) {
            return empty();
        }
        else {
            return toList(intersect(assignmentBits1, assignmentBits2));
        }
    };
    const indexedAssignmentBits = indexed(alwaysAssignmentBits);
    const duplicates = List_distinct(collect(getDuplicates, allPairs(indexedAssignmentBits, indexedAssignmentBits)), {
        Equals: (x_3, y_3) => (x_3 === y_3),
        GetHashCode: stringHash,
    });
    if (isEmpty(duplicates)) {
        return errorList;
    }
    else {
        const currLocation = ast.Module.EndLocation | 0;
        const extraMessages = [new ExtraErrorInfo((arg = convert(duplicates, ""), toText(printf("The following variables are driven by multiple always blocks or continuous assignments: %A.  Please make sure that every port is driven by at most one always block or continuous assignment."))(arg)), false, new ReplaceType(3, []))];
        const message = "Some ports or variables are driven by multiple always blocks or continuous assignments.";
        return append(errorList, createErrorMessage(linesLocations, currLocation, message, extraMessages, "endmodule"));
    }
}

/**
 * Checks the case items of the case statements:
 * - Repeated cases
 * - Wrong width
 */
export function checkCasesStatements(ast, linesLocations, portSizeMap, wireSizeMap, errorList) {
    const declarations_1 = foldAST(getDeclarations, empty(), new ASTNode(24, [ast]));
    const wireSizeMap_1 = fold((map, decl) => fold_1((map$0027, variable) => {
        if (decl.Range == null) {
            return add(variable.Name, 0, map$0027);
        }
        else {
            return add(variable.Name, (parse(value_4(decl.Range).Start, 511, false, 32) - parse(value_4(decl.Range).End, 511, false, 32)) + 1, map$0027);
        }
    }, map, decl.Variables), wireSizeMap, declarations_1);
    const portSizeMap_1 = fold_2((acc, key, value_2) => add(key, value_2, acc), portSizeMap, wireSizeMap_1);
    const caseStatementsWithLoc = foldAST(getCaseStatementsWithLoc, empty(), new ASTNode(24, [ast]));
    const checkCaseStatement = (tupledArg) => {
        const caseStmt = tupledArg[0];
        const location = tupledArg[1];
        const condWidth = getWidthOfExpr(caseStmt.Expression, portSizeMap_1) | 0;
        if (condWidth === 0) {
            return empty();
        }
        else {
            const caseNumbers = collect_1((caseItem) => caseItem.Expressions, caseStmt.CaseItems);
            const repeatedErrors = fold_1((tupledArg_1, caseNumber) => {
                let arg;
                const casesCovered = tupledArg_1[0];
                const errors = tupledArg_1[1];
                const matchValue = value_4(caseNumber.Base);
                const width = value_4(caseNumber.Bits);
                const numBase = matchValue;
                const num = value_4(caseNumber.AllNumber);
                const caseNumberDec = toDecimal(value_4(caseNumber.AllNumber), value_4(caseNumber.Base), value_4(caseNumber.Bits));
                const repeated = containsKey(caseNumberDec, casesCovered);
                let repeatedError;
                if (repeated) {
                    const firstLine = getLineNumber(linesLocations, find(caseNumberDec, casesCovered)) | 0;
                    const extraMessages = [new ExtraErrorInfo((arg = ((width + numBase) + num), toText(printf("The following case value is duplicated: %A, see line %A. Please make sure there are no repeated case values."))(arg)(firstLine)), false, new ReplaceType(3, []))];
                    const message = "Duplicate case value";
                    repeatedError = createErrorMessage(linesLocations, caseNumber.Location, message, extraMessages, (width + numBase) + num);
                }
                else {
                    repeatedError = empty();
                }
                let widthError;
                if (parse(width, 511, false, 32) !== condWidth) {
                    const extraMessages_1 = [new ExtraErrorInfo(toText(printf("Width of case expression (%A bits wide) does not match width of this case item (%A bits wide)."))(condWidth)(width), false, new ReplaceType(3, [])), new ExtraErrorInfo((int32ToString(condWidth) + numBase) + num, true, new ReplaceType(2, [(width + numBase) + num]))];
                    const message_1 = "Width of case value does not match \n the given case expression";
                    widthError = createErrorMessage(linesLocations, caseNumber.Location, message_1, extraMessages_1, (width + numBase) + num);
                }
                else {
                    widthError = empty();
                }
                return [add(caseNumberDec, caseNumber.Location, casesCovered), append(errors, append(repeatedError, widthError))];
            }, [empty_1({
                Compare: compare,
            }), empty()], caseNumbers)[1];
            if (caseStmt.Default == null) {
                return repeatedErrors;
            }
            else {
                return repeatedErrors;
            }
        }
    };
    const localErrors = collect(checkCaseStatement, caseStatementsWithLoc);
    return append(errorList, localErrors);
}

/**
 * Used for checking if a variable is assigned in every branch, see checkVariablesAlwaysAssigned
 */
export function allCasesCovered(caseStmt, portSizeMap, wireSizeMap) {
    if (caseStmt.Default != null) {
        return true;
    }
    else {
        const portSizeMap_1 = fold_2((acc, key, value) => add(key, value, acc), portSizeMap, wireSizeMap);
        const condWidth = getWidthOfExpr(caseStmt.Expression, portSizeMap_1) | 0;
        if (condWidth === 0) {
            return true;
        }
        else {
            const expNrOfCases = pow2int64(condWidth);
            const caseNumbers = collect_1((caseItem) => caseItem.Expressions, caseStmt.CaseItems);
            const caseNumsUnique = fold_1((casesCovered, caseNumber) => {
                const matchValue_1 = value_4(caseNumber.Base);
                const width = value_4(caseNumber.Bits);
                const numBase = matchValue_1;
                const num = value_4(caseNumber.AllNumber);
                const caseNumberDec = toDecimal(num, numBase, width);
                return add_1(caseNumberDec, casesCovered);
            }, empty_2({
                Compare: compare,
            }), caseNumbers);
            const expCaseVals = ofList(toList_1(rangeDouble(0, 1, ~~toInt32(expNrOfCases) - 1)), {
                Compare: comparePrimitives,
            });
            const missingVars = difference(expCaseVals, map_2((value_1) => ~~toInt32(value_1), caseNumsUnique, {
                Compare: comparePrimitives,
            }));
            return count(missingVars) === 0;
        }
    }
}

export function checkVariablesAlwaysAssigned(ast, linesLocations, portSizeMap, wireSizeMap, errorList) {
    const declarations_1 = foldAST(getDeclarations, empty(), new ASTNode(24, [ast]));
    const wireSizeMap_1 = fold((map, decl) => fold_1((map$0027, variable) => {
        if (decl.Range == null) {
            return add(variable.Name, 1, map$0027);
        }
        else {
            return add(variable.Name, (parse(value_4(decl.Range).Start, 511, false, 32) - parse(value_4(decl.Range).End, 511, false, 32)) + 1, map$0027);
        }
    }, map, decl.Variables), wireSizeMap, declarations_1);
    const portSizeMap_1 = fold_2((acc, key, value_2) => add(key, value_2, acc), portSizeMap, wireSizeMap_1);
    const getVariablesAlwaysAssigned = (node_1_mut) => {
        getVariablesAlwaysAssigned:
        while (true) {
            const node_1 = node_1_mut;
            switch (node_1.tag) {
                case 24: {
                    const verilogInput = node_1.fields[0];
                    const itemsCompleteVariables = map_3((item) => getVariablesAlwaysAssigned(new ASTNode(21, [item])), verilogInput.Module.ModuleItems.ItemList);
                    return fold_1(union, empty_2({
                        Compare: comparePrimitives,
                    }), itemsCompleteVariables);
                }
                case 11: {
                    const ifstmt = node_1.fields[0];
                    if (ifstmt.ElseStatement == null) {
                        return empty_2({
                            Compare: comparePrimitives,
                        });
                    }
                    else {
                        const ifVariables = getVariablesAlwaysAssigned(new ASTNode(5, [ifstmt.IfStatement.Statement]));
                        const elseVariables = getVariablesAlwaysAssigned(new ASTNode(5, [value_4(ifstmt.ElseStatement)]));
                        return intersect(ifVariables, elseVariables);
                    }
                }
                case 7: {
                    const blocking = node_1.fields[0];
                    return ofList(getLHSBitsAssignedCertainly(portSizeMap_1, blocking.Assignment), {
                        Compare: comparePrimitives,
                    });
                }
                case 6: {
                    const nonBlocking = node_1.fields[0];
                    return ofList(getLHSBitsAssignedCertainly(portSizeMap_1, nonBlocking.Assignment), {
                        Compare: comparePrimitives,
                    });
                }
                case 21: {
                    const item_1 = node_1.fields[0];
                    node_1_mut = getItem(item_1);
                    continue getVariablesAlwaysAssigned;
                }
                case 4: {
                    const always = node_1.fields[0];
                    node_1_mut = (new ASTNode(5, [always.Statement]));
                    continue getVariablesAlwaysAssigned;
                }
                case 5: {
                    const statement = node_1.fields[0];
                    node_1_mut = statementToNode(getAlwaysStatement(statement));
                    continue getVariablesAlwaysAssigned;
                }
                case 8: {
                    const seqBlock = node_1.fields[0];
                    const completeVariables = map_3((s_1) => getVariablesAlwaysAssigned(new ASTNode(5, [s_1])), seqBlock.Statements);
                    return fold_1(union, empty_2({
                        Compare: comparePrimitives,
                    }), completeVariables);
                }
                case 9: {
                    const case$ = node_1.fields[0];
                    if (allCasesCovered(case$, portSizeMap_1, wireSizeMap_1)) {
                        const complCaseVars = map_3((caseItem) => getVariablesAlwaysAssigned(new ASTNode(5, [caseItem.Statement])), case$.CaseItems);
                        const caseItemVars = fold_1(intersect, complCaseVars[0], complCaseVars);
                        const matchValue = case$.Default;
                        if (matchValue == null) {
                            return caseItemVars;
                        }
                        else {
                            const dflt = matchValue;
                            return intersect(getVariablesAlwaysAssigned(new ASTNode(5, [dflt])), caseItemVars);
                        }
                    }
                    else {
                        return empty_2({
                            Compare: comparePrimitives,
                        });
                    }
                }
                default:
                    return empty_2({
                        Compare: comparePrimitives,
                    });
            }
            break;
        }
    };
    const alwaysCombBlocksWithLoc = filter((tupledArg) => {
        const alwaysBlock = tupledArg[0];
        return alwaysBlock.AlwaysType === "always_comb";
    }, foldAST(getAlwaysBlocksWithLocations, empty(), new ASTNode(24, [ast])));
    const variablesNotAssigned = filter((tupledArg_2) => {
        const undefVars_1 = tupledArg_2[0];
        return !equals(undefVars_1, empty());
    }, map_1((tupledArg_1) => {
        const always_1 = tupledArg_1[0];
        const loc = tupledArg_1[1] | 0;
        const allLHSVariables = ofList(collect((assignment) => getLHSBits$0027(portSizeMap_1, assignment), foldAST(getAssignments$0027, empty(), new ASTNode(4, [always_1]))), {
            Compare: comparePrimitives,
        });
        const variablesNotAssignedInAllBranches = getVariablesAlwaysAssigned(new ASTNode(4, [always_1]));
        const undefVars = toList(map_2((varBit) => varBit.split("[")[0], difference(allLHSVariables, variablesNotAssignedInAllBranches), {
            Compare: comparePrimitives,
        }));
        return [undefVars, loc];
    }, alwaysCombBlocksWithLoc));
    return fold((errors, variables) => {
        const currLocation = variables[1] | 0;
        const extraMessages = [new ExtraErrorInfo(toText(printf("The following variables might be undefined as they are not assigned to in every branch of conditional statements or case statements in the always_comb block: ")) + convert(variables[0], ""), false, new ReplaceType(3, []))];
        const message = "Some ports or variables might not always be assigned to";
        return append(errors, createErrorMessage(linesLocations, currLocation, message, extraMessages, "always_comb"));
    }, errorList, variablesNotAssigned);
}

/**
 * Check if expressions are correct
 * - Indexes within range
 * - Numbers are correctly formatted
 */
export function checkExpressions(ast, linesLocations, wireSizeMap, errorList) {
    const declarations_1 = foldAST(getDeclarations, empty(), new ASTNode(24, [ast]));
    const wireSizeMap_1 = fold((map, decl) => fold_1((map$0027, variable) => {
        if (decl.Range == null) {
            return add(variable.Name, 0, map$0027);
        }
        else {
            return add(variable.Name, (parse(value_4(decl.Range).Start, 511, false, 32) - parse(value_4(decl.Range).End, 511, false, 32)) + 1, map$0027);
        }
    }, map, decl.Variables), wireSizeMap, declarations_1);
    const expressions_1 = foldAST(getAllExpressions$0027, empty(), new ASTNode(24, [ast]));
    const caseItemNums = foldAST(getCaseItemNums, empty(), new ASTNode(24, [ast]));
    const localErrors_1 = collect((expr) => checkExpr(linesLocations, wireSizeMap_1, empty(), expr), expressions_1);
    const caseItemErrors = collect((num) => checkNumber(linesLocations, num), caseItemNums);
    return append(errorList, append(localErrors_1, caseItemErrors));
}

/**
 * Checks that clk is an input port when there are always_ff blocks
 */
export function checkClk(ast, linesLocations, portMap, errorList) {
    const alwaysFFsWithLoc = filter((always) => (always.AlwaysType === "always_ff"), foldAST(getAlwaysBlocks, empty(), new ASTNode(24, [ast])));
    const matchValue = tryFind("clk", portMap);
    let matchResult;
    if (matchValue != null) {
        if (matchValue === "output") {
            matchResult = 0;
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return fold((errors, always_1) => {
                const extraMessages = [new ExtraErrorInfo(toText(printf("To use always_ff blocks, please make sure to include \'clk\' in the port list.")), false, new ReplaceType(3, []))];
                const message = "Variable \'clk\' is not defined as an input port.";
                const extraMessages$0027 = append_1(extraMessages, (ast.Module.Type === "module_new") ? [] : [new ExtraErrorInfo("input bit clk;", true, new ReplaceType(0, []))]);
                return append(errors, createErrorMessage(linesLocations, always_1.ClkLoc, message, extraMessages$0027, "clk"));
            }, errorList, alwaysFFsWithLoc);
        default:
            return errorList;
    }
}

/**
 * Checks if:
 * - no output ports are called clk
 * - clk has width 1
 * - any of the expressions use clk
 */
export function checkClkNames(ast, linesLocations, portMap, portLocationMap, portSizeMap, errorList) {
    let location_1, l;
    const declarations_1 = collect_1((decl) => decl.Variables, toArray(foldAST(getDeclarations, empty(), new ASTNode(24, [ast]))));
    const contAssigns = map_3((assign) => assign.LHS.Primary, toArray(foldAST(getContAssignments, empty(), new ASTNode(24, [ast]))));
    let portErrors;
    const matchValue = tryFind("clk", portMap);
    const matchValue_1 = tryFind("clk", portLocationMap);
    let matchResult, location;
    if (matchValue != null) {
        if (matchValue === "output") {
            if (matchValue_1 != null) {
                matchResult = 0;
                location = matchValue_1;
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
        case 0: {
            const extraMessages = [new ExtraErrorInfo(toText(printf("\'clk\' represents the clock signal, which must be an input port")), false, new ReplaceType(3, []))];
            const message = "\'clk\' must be an input port";
            portErrors = createErrorMessage(linesLocations, location, message, extraMessages, "clk");
            break;
        }
        default:
            portErrors = empty();
    }
    let logicErrors;
    const matchValue_3 = tryFind_1((id) => (id.Name === "clk"), append_1(declarations_1, contAssigns));
    if (matchValue_3 != null) {
        const primary = matchValue_3;
        const extraMessages_1 = [new ExtraErrorInfo(toText(printf("\'clk\' is reserved for the clock signal, please rename the variable")), false, new ReplaceType(3, []))];
        const message_1 = "Variable cannot be called \'clk\'";
        logicErrors = createErrorMessage(linesLocations, primary.Location, message_1, extraMessages_1, "clk");
    }
    else {
        logicErrors = empty();
    }
    let clkWidthErrors;
    const matchValue_4 = tryFind("clk", portSizeMap);
    const matchValue_5 = tryFind("clk", portLocationMap);
    let matchResult_1, l_1, location_2;
    if (matchValue_4 != null) {
        if (matchValue_5 != null) {
            if ((location_1 = (matchValue_5 | 0), (l = (matchValue_4 | 0), l > 1))) {
                matchResult_1 = 0;
                l_1 = matchValue_4;
                location_2 = matchValue_5;
            }
            else {
                matchResult_1 = 1;
            }
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
            const extraMessages_2 = [new ExtraErrorInfo(toText(printf("\'clk\' represents the clock signal, which must have width 1, here it has width %A"))(l_1), false, new ReplaceType(3, []))];
            const message_2 = "\'clk\' must have width 1";
            clkWidthErrors = createErrorMessage(linesLocations, location_2, message_2, extraMessages_2, "clk");
            break;
        }
        default:
            clkWidthErrors = empty();
    }
    const clkPrimaries = filter((prim) => (prim.Primary.Name === "clk"), fold(primariesUsedInAssignment, empty(), foldAST(getAllExpressions$0027, empty(), new ASTNode(24, [ast]))));
    const expressionErrors = fold((errors, primary_1) => {
        const extraMessages_3 = [new ExtraErrorInfo(toText(printf("\'clk\' represents the clock signal, make sure to only use it as \'always_ff @(posedge clk)\'")), false, new ReplaceType(3, []))];
        const message_3 = "Illegal use of \'clk\'";
        const localErrors = createErrorMessage(linesLocations, primary_1.Primary.Location, message_3, extraMessages_3, primary_1.Primary.Name);
        return append(errors, localErrors);
    }, empty(), clkPrimaries);
    return append(errorList, append(portErrors, append(logicErrors, append(clkWidthErrors, expressionErrors))));
}

/**
 * Looks for cycles in the general dependency graph using depth first search
 */
export function findCycleDFS(graph) {
    const dfs = (node, visited, recStack, path) => {
        if (FSharpSet__Contains(recStack, node)) {
            return cons(node, path);
        }
        else if (FSharpSet__Contains(visited, node)) {
            return void 0;
        }
        else {
            const visited$0027 = FSharpSet__Add(visited, node);
            const recStack$0027 = FSharpSet__Add(recStack, node);
            const neighbors = defaultArg(tryFind(node, graph), empty());
            const findCycle = fold((acc, neighbor) => {
                const matchValue = dfs(neighbor, visited$0027, recStack$0027, cons(node, path));
                if (matchValue == null) {
                    return acc;
                }
                else {
                    const cyclePath = matchValue;
                    return cyclePath;
                }
            }, void 0, neighbors);
            return findCycle;
        }
    };
    return tryPick((node_1) => dfs(node_1, empty_2({
        Compare: comparePrimitives,
    }), empty_2({
        Compare: comparePrimitives,
    }), empty()), keys(graph));
}

function getDependencies(ast, variableSizeMap) {
    const getDependencyFold = (graph_mut, astNode_mut, cond_mut) => {
        getDependencyFold:
        while (true) {
            const graph = graph_mut, astNode = astNode_mut, cond = cond_mut;
            switch (astNode.tag) {
                case 24: {
                    const verilogInput = astNode.fields[0];
                    graph_mut = graph;
                    astNode_mut = (new ASTNode(22, [verilogInput.Module.ModuleItems]));
                    cond_mut = cond;
                    continue getDependencyFold;
                }
                case 22: {
                    const items = astNode.fields[0];
                    return fold_1((acc, item) => getDependencyFold(acc, new ASTNode(21, [item]), cond), graph, items.ItemList);
                }
                case 21: {
                    const item_1 = astNode.fields[0];
                    graph_mut = graph;
                    astNode_mut = getItem(item_1);
                    cond_mut = cond;
                    continue getDependencyFold;
                }
                case 2: {
                    const contAssign = astNode.fields[0];
                    graph_mut = graph;
                    astNode_mut = (new ASTNode(13, [contAssign.Assignment]));
                    cond_mut = cond;
                    continue getDependencyFold;
                }
                case 13: {
                    const assign = astNode.fields[0];
                    const lhsBits = getLHSBits$0027(variableSizeMap, assign);
                    let rhsBits;
                    const matchValue = assign.LHS.VariableBitSelect;
                    if (matchValue != null) {
                        const expr = matchValue;
                        rhsBits = union(getRHSBits(variableSizeMap, assign.RHS), getRHSBits(variableSizeMap, expr));
                    }
                    else {
                        rhsBits = getRHSBits(variableSizeMap, assign.RHS);
                    }
                    return fold((graph$0027, lhs) => add(lhs, union(rhsBits, cond), graph$0027), graph, lhsBits);
                }
                case 4: {
                    const always = astNode.fields[0];
                    if (always.AlwaysType === "always_comb") {
                        graph_mut = graph;
                        astNode_mut = (new ASTNode(5, [always.Statement]));
                        cond_mut = cond;
                        continue getDependencyFold;
                    }
                    else {
                        return graph;
                    }
                }
                case 5: {
                    const statement = astNode.fields[0];
                    const statement$0027 = statementToNode(getAlwaysStatement(statement));
                    graph_mut = graph;
                    astNode_mut = statement$0027;
                    cond_mut = cond;
                    continue getDependencyFold;
                }
                case 6: {
                    const nonblocking = astNode.fields[0];
                    graph_mut = graph;
                    astNode_mut = (new ASTNode(13, [nonblocking.Assignment]));
                    cond_mut = cond;
                    continue getDependencyFold;
                }
                case 7: {
                    const blocking = astNode.fields[0];
                    graph_mut = graph;
                    astNode_mut = (new ASTNode(13, [blocking.Assignment]));
                    cond_mut = cond;
                    continue getDependencyFold;
                }
                case 8: {
                    const seq = astNode.fields[0];
                    return fold_1((acc_1, statement_2) => getDependencyFold(acc_1, new ASTNode(5, [statement_2]), cond), graph, seq.Statements);
                }
                case 9: {
                    const case$ = astNode.fields[0];
                    const condDependencies = getRHSBits(variableSizeMap, case$.Expression);
                    const caseItemDeps = ofArray(map_3((item_2) => getDependencyFold(graph, new ASTNode(10, [item_2]), union(condDependencies, cond)), case$.CaseItems));
                    let defaultDeps;
                    const matchValue_1 = case$.Default;
                    if (matchValue_1 != null) {
                        const stmt = matchValue_1;
                        defaultDeps = getDependencyFold(graph, new ASTNode(5, [stmt]), union(cond, condDependencies));
                    }
                    else {
                        defaultDeps = empty_1({
                            Compare: comparePrimitives,
                        });
                    }
                    const allDeps = append(caseItemDeps, singleton_1(defaultDeps));
                    return fold((acc_2, branch) => fold_2((acc$0027, key, value_1) => {
                        const matchValue_2 = tryFind(key, acc$0027);
                        if (matchValue_2 == null) {
                            return add(key, value_1, acc$0027);
                        }
                        else {
                            const dep = matchValue_2;
                            return add(key, union(dep, value_1), acc$0027);
                        }
                    }, acc_2, branch), empty_1({
                        Compare: comparePrimitives,
                    }), allDeps);
                }
                case 10: {
                    const item_3 = astNode.fields[0];
                    graph_mut = graph;
                    astNode_mut = (new ASTNode(5, [item_3.Statement]));
                    cond_mut = cond;
                    continue getDependencyFold;
                }
                case 11: {
                    const conditional = astNode.fields[0];
                    const condDep = getRHSBits(variableSizeMap, conditional.IfStatement.Condition);
                    const ifDep = getDependencyFold(graph, new ASTNode(5, [conditional.IfStatement.Statement]), union(cond, condDep));
                    let elseDep;
                    const matchValue_3 = conditional.ElseStatement;
                    if (matchValue_3 != null) {
                        const stmt_1 = matchValue_3;
                        elseDep = getDependencyFold(graph, new ASTNode(5, [stmt_1]), union(cond, condDep));
                    }
                    else {
                        elseDep = empty_1({
                            Compare: comparePrimitives,
                        });
                    }
                    return fold_2((acc$0027_1, key_1, value_2) => {
                        const matchValue_4 = tryFind(key_1, acc$0027_1);
                        if (matchValue_4 == null) {
                            return add(key_1, value_2, acc$0027_1);
                        }
                        else {
                            const dep_1 = matchValue_4;
                            return add(key_1, union(dep_1, value_2), acc$0027_1);
                        }
                    }, ifDep, elseDep);
                }
                default:
                    return graph;
            }
            break;
        }
    };
    return map_4((_arg, value_3) => toList(value_3), getDependencyFold(empty_1({
        Compare: comparePrimitives,
    }), ast, empty_2({
        Compare: comparePrimitives,
    })));
}

/**
 * Check for dependency cycles in always_comb blocks and continuous assignments
 */
export function cycleCheck(ast, linesLocations, portSizeMap, wireSizeMap, errorList) {
    const wireAndPortSizeMap = fold_2((acc, key, value) => add(key, value, acc), wireSizeMap, portSizeMap);
    const dependencyGraph = getDependencies(new ASTNode(24, [ast]), wireAndPortSizeMap);
    const cycle = findCycleDFS(dependencyGraph);
    if (cycle != null) {
        const path = cycle;
        const location = ast.Module.EndLocation | 0;
        const extraMessages = [new ExtraErrorInfo(toText(printf("The following variables form a cycle: %A"))(path), false, new ReplaceType(3, []))];
        const message = toText(printf("The following variables form a dependency cycle: %A"))(path);
        return append(errorList, createErrorMessage(linesLocations, location, message, extraMessages, "endmodule"));
    }
    else {
        return errorList;
    }
}

/**
 * Look for unassigned variables (not outputs, just variables)
 */
export function checkVariablesUsed(ast, linesLocations, portSizeMap, wireSizeMap, errorList) {
    const wireAndPortSizeMap = fold_2((acc, key, value) => add(key, value, acc), wireSizeMap, portSizeMap);
    const moduleInstantiationPorts = ofList(collect((conn) => getPrimaryBits(wireAndPortSizeMap, conn.Primary), collect((modInst) => ofArray(modInst.Connections), foldAST(getModuleInstantiationStatements, empty(), new ASTNode(24, [ast])))), {
        Compare: comparePrimitives,
    });
    const assignmentsLHS = union(moduleInstantiationPorts, ofList(collect((assign) => getLHSBits$0027(wireAndPortSizeMap, assign), foldAST(getAssignments$0027, empty(), new ASTNode(24, [ast]))), {
        Compare: comparePrimitives,
    }));
    const variables = collect((decl) => {
        const matchValue = decl.Range;
        if (matchValue != null) {
            const range = matchValue;
            const bits = toArray_1(rangeDouble(parse(range.End, 511, false, 32), 1, parse(range.Start, 511, false, 32)));
            const res_1 = ofArray(collect_1((var$_1) => {
                const varBits = map_3((bit) => (((var$_1.Name + "[") + int32ToString(bit)) + "]"), bits);
                return varBits;
            }, decl.Variables));
            return res_1;
        }
        else {
            const res = ofArray(map_3((var$) => (var$.Name + "[0]"), decl.Variables));
            return res;
        }
    }, foldAST(getDeclarations, empty(), new ASTNode(24, [ast])));
    const checkVariable = (errorBits, variable) => {
        if (contains(variable, assignmentsLHS)) {
            return errorBits;
        }
        else {
            return append(errorBits, singleton_1(variable));
        }
    };
    const varsNotAssigned = fold(checkVariable, empty(), variables);
    if (isEmpty(varsNotAssigned)) {
        return errorList;
    }
    else {
        const location = ast.Module.EndLocation | 0;
        const extraMessages = [new ExtraErrorInfo(toText(printf("The following variables have not been assigned %A"))(varsNotAssigned), false, new ReplaceType(3, []))];
        const message = toText(printf("The following variables have not been assigned %A"))(varsNotAssigned);
        return append(errorList, createErrorMessage(linesLocations, location, message, extraMessages, "endmodule"));
    }
}

/**
 * Helper function for checking if any variable or port being written to after it is read in always_comb blocks.
 */
export function getVariablesWrittenAfterRead(wireAndPortSizeMap_mut, linesLocations_mut, rhsVars_mut, errors_mut, node_mut) {
    let arg;
    getVariablesWrittenAfterRead:
    while (true) {
        const wireAndPortSizeMap = wireAndPortSizeMap_mut, linesLocations = linesLocations_mut, rhsVars = rhsVars_mut, errors = errors_mut, node = node_mut;
        switch (node.tag) {
            case 13: {
                const assign = node.fields[0];
                const lhsBits = ofList(getLHSBits$0027(wireAndPortSizeMap, assign), {
                    Compare: comparePrimitives,
                });
                const rhsBits = getRHSBits(wireAndPortSizeMap, assign.RHS);
                const assignedAfterRHS = intersect(lhsBits, rhsVars);
                const rhsVars$0027 = union(rhsVars, rhsBits);
                if (count(assignedAfterRHS) === 0) {
                    return [rhsVars$0027, errors];
                }
                else {
                    const location = assign.LHS.Primary.Location | 0;
                    const variables = toList(map_2((var$) => var$.split("[")[0], assignedAfterRHS, {
                        Compare: comparePrimitives,
                    }));
                    const extraMessages = [new ExtraErrorInfo((arg = convert(variables, ""), toText(printf("The following variables are read and then updated: %A This creates undefined behaviour in an always_comb block, please make sure to not update a variable after it is read."))(arg)), false, new ReplaceType(3, []))];
                    const message = toText(printf("Variable written to after it is read"));
                    const errors$0027 = append(errors, createErrorMessage(linesLocations, location, message, extraMessages, assign.LHS.Primary.Name));
                    return [rhsVars$0027, errors$0027];
                }
            }
            case 11: {
                const cond = node.fields[0];
                const patternInput = getVariablesWrittenAfterRead(wireAndPortSizeMap, linesLocations, rhsVars, empty(), new ASTNode(12, [cond.IfStatement]));
                const ifVars = patternInput[0];
                const ifErrors = patternInput[1];
                let patternInput_1;
                const matchValue = cond.ElseStatement;
                if (matchValue != null) {
                    const stmt = matchValue;
                    patternInput_1 = getVariablesWrittenAfterRead(wireAndPortSizeMap, linesLocations, rhsVars, empty(), new ASTNode(5, [stmt]));
                }
                else {
                    patternInput_1 = [empty_2({
                        Compare: comparePrimitives,
                    }), empty()];
                }
                const elseVars = patternInput_1[0];
                const elseErrors = patternInput_1[1];
                return [union(ifVars, elseVars), append(errors, append(ifErrors, elseErrors))];
            }
            case 12: {
                const ifstmt = node.fields[0];
                const rhsVars$0027_1 = union(rhsVars, getRHSBits(wireAndPortSizeMap, ifstmt.Condition));
                wireAndPortSizeMap_mut = wireAndPortSizeMap;
                linesLocations_mut = linesLocations;
                rhsVars_mut = rhsVars$0027_1;
                errors_mut = errors;
                node_mut = (new ASTNode(5, [ifstmt.Statement]));
                continue getVariablesWrittenAfterRead;
            }
            case 9: {
                const case$ = node.fields[0];
                const patternInput_2 = unzip(ofArray(map_3((item) => getVariablesWrittenAfterRead(wireAndPortSizeMap, linesLocations, rhsVars, empty(), new ASTNode(5, [item.Statement])), case$.CaseItems)));
                const caseVars = patternInput_2[0];
                const caseErrors = patternInput_2[1];
                let patternInput_3;
                const matchValue_1 = case$.Default;
                if (matchValue_1 != null) {
                    const stmt_1 = matchValue_1;
                    patternInput_3 = getVariablesWrittenAfterRead(wireAndPortSizeMap, linesLocations, rhsVars, empty(), new ASTNode(5, [stmt_1]));
                }
                else {
                    patternInput_3 = [empty_2({
                        Compare: comparePrimitives,
                    }), empty()];
                }
                const defaultVars = patternInput_3[0];
                const defaultErrors = patternInput_3[1];
                const rhsVars$0027_2 = fold(union, empty_2({
                    Compare: comparePrimitives,
                }), append(caseVars, singleton_1(defaultVars)));
                const errors$0027_1 = append(fold(append, empty(), caseErrors), defaultErrors);
                return [rhsVars$0027_2, errors$0027_1];
            }
            case 8: {
                const seq = node.fields[0];
                return fold_1((tupledArg, node_1) => getVariablesWrittenAfterRead(wireAndPortSizeMap, linesLocations, tupledArg[0], tupledArg[1], node_1), [rhsVars, errors], map_3((stmt_2) => (new ASTNode(5, [stmt_2])), seq.Statements));
            }
            case 5: {
                const stmt_3 = node.fields[0];
                wireAndPortSizeMap_mut = wireAndPortSizeMap;
                linesLocations_mut = linesLocations;
                rhsVars_mut = rhsVars;
                errors_mut = errors;
                node_mut = statementToNode(getAlwaysStatement(stmt_3));
                continue getVariablesWrittenAfterRead;
            }
            case 7: {
                const blocking = node.fields[0];
                wireAndPortSizeMap_mut = wireAndPortSizeMap;
                linesLocations_mut = linesLocations;
                rhsVars_mut = rhsVars;
                errors_mut = errors;
                node_mut = (new ASTNode(13, [blocking.Assignment]));
                continue getVariablesWrittenAfterRead;
            }
            case 6: {
                const nonblocking = node.fields[0];
                wireAndPortSizeMap_mut = wireAndPortSizeMap;
                linesLocations_mut = linesLocations;
                rhsVars_mut = rhsVars;
                errors_mut = errors;
                node_mut = (new ASTNode(13, [nonblocking.Assignment]));
                continue getVariablesWrittenAfterRead;
            }
            case 4: {
                const always = node.fields[0];
                wireAndPortSizeMap_mut = wireAndPortSizeMap;
                linesLocations_mut = linesLocations;
                rhsVars_mut = rhsVars;
                errors_mut = errors;
                node_mut = (new ASTNode(5, [always.Statement]));
                continue getVariablesWrittenAfterRead;
            }
            default:
                return [rhsVars, errors];
        }
        break;
    }
}

/**
 * check that if an always block writes to and reads from the same variable, variable is assigned first and written later
 * a=1; b=a; a=0; -> this shouldn't be allowed
 */
export function checkAlwaysCombRHS(ast, linesLocations, portSizeMap, wireSizeMap, errorList) {
    const wireAndPortSizeMap = fold_2((acc, key, value) => add(key, value, acc), wireSizeMap, portSizeMap);
    const alwaysCombs = filter((always) => (always.AlwaysType === "always_comb"), foldAST(getAlwaysBlocks, empty(), new ASTNode(24, [ast])));
    const checkAlwaysComb = (always_1) => getVariablesWrittenAfterRead(wireAndPortSizeMap, linesLocations, empty_2({
        Compare: comparePrimitives,
    }), empty(), new ASTNode(4, [always_1]))[1];
    const localErrors = collect(checkAlwaysComb, alwaysCombs);
    return append(errorList, localErrors);
}

export function getPrimaryWidth(portSizeMap, primary) {
    const matchValue = primary.BitsStart;
    const matchValue_1 = primary.BitsEnd;
    let matchResult, e, s;
    if (matchValue != null) {
        if (matchValue_1 != null) {
            matchResult = 0;
            e = matchValue_1;
            s = matchValue;
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
            return ((parse(s, 511, false, 32) - parse(e, 511, false, 32)) + 1) | 0;
        default: {
            const matchValue_3 = tryFind(primary.Primary.Name, portSizeMap);
            if (matchValue_3 != null) {
                const w = matchValue_3 | 0;
                return w | 0;
            }
            else {
                return 1;
            }
        }
    }
}

/**
 * Checks if module instantiation statements are correct:
 * - Does a loaded component exist with the given name?
 * - Are the inputs and outputs the correct width?
 * - Are the portIds correct?
 * - Are all the ports connected?
 * - Are there any duplicate ports?
 * - Make sure inputs are inputs (they have been assigned something), outputs are not driven by anything
 */
export function checkModuleInstantiations(ast, linesLocations, portSizeMap, wireSizeMap, project, portMap, errorList) {
    const wireAndPortSizeMap = fold_2((acc, key, value) => add(key, value, acc), wireSizeMap, portSizeMap);
    const moduleInstantiations_1 = foldAST(getModuleInstantiationStatements, empty(), new ASTNode(24, [ast]));
    const loadedComponentNames = map_1((comp) => comp.Name, project.LoadedComponents);
    const loadedComponentNamesSet = ofList(loadedComponentNames, {
        Compare: comparePrimitives,
    });
    const moduleTypeErrors = collect((modInst) => {
        let arg_2;
        if (contains(modInst.Module.Name, loadedComponentNamesSet)) {
            return empty();
        }
        else {
            const message = toText(printf("Component %s does not exist"))(modInst.Module.Name);
            const closeVariables = findCloseVariable(modInst.Module.Name.split(""), loadedComponentNames);
            const extraMessages = [new ExtraErrorInfo(toText(printf("Component \'%s\' does not exist - there is no custom component or Verilog component with this name"))(modInst.Module.Name), false, new ReplaceType(3, []))];
            let replaceMsg;
            const matchValue_1 = isEmpty(closeVariables);
            replaceMsg = (matchValue_1 ? [] : [new ExtraErrorInfo((arg_2 = item_4(0, closeVariables), toText(printf("%s"))(arg_2)), true, new ReplaceType(2, [modInst.Module.Name]))]);
            return createErrorMessage(linesLocations, modInst.Module.Location, message, append_1(extraMessages, replaceMsg), modInst.Module.Name);
        }
    }, moduleInstantiations_1);
    const getMissingPortErrors = (modInst_1, comp_1) => {
        const givenPortNames = ofArray_1(map_3((conn) => conn.PortId.Name.toLocaleUpperCase(), modInst_1.Connections), {
            Compare: comparePrimitives,
        });
        const expectedPortNames = ofList(map_1((tuple) => tuple[0], append(comp_1.InputLabels, comp_1.OutputLabels)), {
            Compare: comparePrimitives,
        });
        const extraPortNames = difference(givenPortNames, expectedPortNames);
        const missingPortNames = difference(expectedPortNames, givenPortNames);
        const extraPortErrors = collect((conn_1) => {
            if (contains(conn_1.PortId.Name.toLocaleUpperCase(), extraPortNames)) {
                const extraMessages_1 = [new ExtraErrorInfo(toText(printf("The port %A does not exist for component %A"))(conn_1.PortId.Name)(modInst_1.Module.Name), false, new ReplaceType(3, []))];
                const message_1 = toText(printf("No such port for the given component"));
                return createErrorMessage(linesLocations, conn_1.PortId.Location, message_1, extraMessages_1, conn_1.PortId.Name);
            }
            else {
                return empty();
            }
        }, ofArray(modInst_1.Connections));
        const missingPortErrors = collect((portName) => {
            if (contains(portName, missingPortNames)) {
                const extraMessages_2 = [new ExtraErrorInfo(toText(printf("The port %A missing for component %A"))(portName)(modInst_1.Module.Name), false, new ReplaceType(3, []))];
                const message_2 = toText(printf("Missing port(s) for component"));
                return createErrorMessage(linesLocations, modInst_1.Module.Location, message_2, extraMessages_2, modInst_1.Module.Name);
            }
            else {
                return empty();
            }
        }, toList(expectedPortNames));
        return append(extraPortErrors, missingPortErrors);
    };
    const inputPorts = toList_1(keys(filter_1((k, v) => (v === "input"), portMap)));
    const lhsVariables = ofList(append(inputPorts, map_1((assign) => assign.LHS.Primary.Name, foldAST(getAssignments$0027, empty(), new ASTNode(24, [ast])))), {
        Compare: comparePrimitives,
    });
    const getInputOutputPortErrors = (modInst_2, comp_2) => {
        const inputPorts_1 = ofList(map_1((tuple_1) => tuple_1[0], comp_2.InputLabels), {
            Compare: comparePrimitives,
        });
        const outputPorts = ofList(map_1((tuple_2) => tuple_2[0], comp_2.OutputLabels), {
            Compare: comparePrimitives,
        });
        return collect((conn_2) => {
            const matchValue_2 = contains(conn_2.PortId.Name.toLocaleUpperCase(), inputPorts_1);
            const matchValue_3 = contains(conn_2.PortId.Name.toLocaleUpperCase(), outputPorts);
            const matchValue_4 = contains(conn_2.Primary.Primary.Name, lhsVariables);
            let matchResult;
            if (matchValue_2) {
                if (matchValue_4) {
                    if (matchValue_3) {
                        matchResult = 1;
                    }
                    else {
                        matchResult = 2;
                    }
                }
                else {
                    matchResult = 0;
                }
            }
            else if (matchValue_3) {
                if (matchValue_4) {
                    matchResult = 1;
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
                    return empty();
                case 1: {
                    const extraMessages_3 = [new ExtraErrorInfo(toText(printf("Output port %A in module %A is already driven by continuous or procedural assignments"))(conn_2.Primary.Primary.Name)(modInst_2.Module.Name), false, new ReplaceType(3, []))];
                    const message_3 = toText(printf("Output port already driven"));
                    return createErrorMessage(linesLocations, conn_2.Primary.Primary.Location, message_3, extraMessages_3, conn_2.Primary.Primary.Name);
                }
                default:
                    return empty();
            }
        }, ofArray(modInst_2.Connections));
    };
    const portWidthErrors = collect((modInst_3) => {
        const matchValue_6 = filter((comp_3) => (comp_3.Name === modInst_3.Module.Name), project.LoadedComponents);
        if (!isEmpty(matchValue_6)) {
            if (isEmpty(tail(matchValue_6))) {
                const comp_4 = head(matchValue_6);
                let list_14;
                const list_12 = collect((conn_3) => {
                    const matchValue_7 = tryFind_2((port$0027) => (port$0027[0] === conn_3.PortId.Name.toLocaleUpperCase()), append(comp_4.InputLabels, comp_4.OutputLabels));
                    if (matchValue_7 != null) {
                        const port = matchValue_7;
                        const w = getPrimaryWidth(wireAndPortSizeMap, conn_3.Primary) | 0;
                        if (port[1] !== w) {
                            const extraMessages_4 = [new ExtraErrorInfo(toText(printf("Wrong port width for port %A in module %A: %A bits wide but expected %A bits"))(conn_3.PortId.Name)(modInst_3.Module.Name)(w)(port[1]), false, new ReplaceType(3, []))];
                            const message_4 = toText(printf("Wrong port width"));
                            return createErrorMessage(linesLocations, conn_3.Primary.Primary.Location, message_4, extraMessages_4, conn_3.Primary.Primary.Name);
                        }
                        else {
                            return empty();
                        }
                    }
                    else {
                        return empty();
                    }
                }, ofArray(modInst_3.Connections));
                list_14 = append(getMissingPortErrors(modInst_3, comp_4), list_12);
                return append(getInputOutputPortErrors(modInst_3, comp_4), list_14);
            }
            else {
                return toFail(printf("There are multiple custom components with this name!"));
            }
        }
        else {
            return empty();
        }
    }, moduleInstantiations_1);
    const duplicatePortErrors = collect((modInst_4) => fold_1((tupledArg, conn_4) => {
        const errors = tupledArg[0];
        const ports = tupledArg[1];
        let error;
        if (contains(conn_4.PortId.Name, ports)) {
            const extraMessages_5 = [new ExtraErrorInfo(toText(printf("Duplicate port name \'%s\' for module %s"))(conn_4.PortId.Name)(modInst_4.Module.Name), false, new ReplaceType(3, []))];
            const message_5 = toText(printf("Duplicate port"));
            error = createErrorMessage(linesLocations, conn_4.PortId.Location, message_5, extraMessages_5, conn_4.PortId.Name);
        }
        else {
            error = empty();
        }
        return [append(errors, error), add_1(conn_4.PortId.Name, ports)];
    }, [empty(), empty_2({
        Compare: comparePrimitives,
    })], modInst_4.Connections)[0], moduleInstantiations_1);
    return append(errorList, append(moduleTypeErrors, append(portWidthErrors, duplicatePortErrors)));
}

//# sourceMappingURL=ErrorCheckProcedural.fs.js.map
