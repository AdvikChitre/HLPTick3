import { stringHash, comparePrimitives, int64ToString, int32ToString, compare } from "../fable_modules/fable-library.4.1.4/Util.js";
import { filter, tryFind as tryFind_1, sortBy, ofArray, collect, sum, fold, map, empty, append, singleton, item as item_1, findIndexBack } from "../fable_modules/fable-library.4.1.4/List.js";
import { PrimaryT_$reflection, NumberT_$reflection, UnaryT_$reflection, ExpressionT_$reflection, ExtraErrorInfo, ReplaceType, OneUnary, PrimaryT, IdentifierT, ErrorInfo } from "./VerilogTypes.fs.js";
import { defaultArg, value as value_4 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { parse } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { tryFind } from "../fable_modules/fable-library.4.1.4/Map.js";
import { length as length_1, mapIndexed, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { toText, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { getItem, getAlwaysStatement } from "./VerilogAST.fs.js";
import { max } from "../fable_modules/fable-library.4.1.4/Double.js";
import { toDecimal, strToIntCheckWidth } from "../Simulator/NumberHelpers.fs.js";
import { Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { union_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { contains, union, ofList, empty as empty_1 } from "../fable_modules/fable-library.4.1.4/Set.js";
import { except } from "../fable_modules/fable-library.4.1.4/Seq2.js";

/**
 * Helper function to create an ErrorInfo-type Error Message
 * given the location, the variable name, and the message
 */
export function createErrorMessage(newLinesLocations, currLocation, message, extraMessages, name) {
    const isSmallerThan = (x, y) => (compare(y, x) <= 0);
    const prevIndex = findIndexBack((x_1) => isSmallerThan(currLocation, x_1), newLinesLocations) | 0;
    const line = (prevIndex + 1) | 0;
    const prevLineLocation = item_1(prevIndex, newLinesLocations) | 0;
    const length = name.length | 0;
    return singleton(new ErrorInfo(line, (currLocation - prevLineLocation) + 1, length, message, extraMessages));
}

/**
 * return line number based on location
 */
export function getLineNumber(linesLocations, location) {
    return findIndexBack((x) => (x <= location), linesLocations) + 1;
}

/**
 * Recursive function to get all the primaries used in the RHS of an assignment
 * Used by checkNamesOnRHSOfAssignment and checkSizesOnRHSOfAssignment
 */
export function primariesUsedInAssignment(inLst_mut, tree_mut) {
    primariesUsedInAssignment:
    while (true) {
        const inLst = inLst_mut, tree = tree_mut;
        const matchValue = tree.Type;
        let matchResult;
        switch (matchValue) {
            case "unary": {
                if (value_4(tree.Unary).Type === "primary") {
                    matchResult = 0;
                }
                else if (value_4(tree.Unary).Type === "parenthesis") {
                    matchResult = 1;
                }
                else if (value_4(tree.Unary).Type === "concat") {
                    matchResult = 2;
                }
                else {
                    matchResult = 4;
                }
                break;
            }
            case "negation": {
                if (value_4(tree.Unary).Type === "primary") {
                    matchResult = 3;
                }
                else {
                    matchResult = 4;
                }
                break;
            }
            case "reduction": {
                if (value_4(tree.Unary).Type === "primary") {
                    matchResult = 3;
                }
                else {
                    matchResult = 4;
                }
                break;
            }
            default:
                matchResult = 4;
        }
        switch (matchResult) {
            case 0: {
                const matchValue_1 = value_4(tree.Unary).Expression;
                if (matchValue_1 != null) {
                    const expr = matchValue_1;
                    return append(inLst, append(singleton(value_4(value_4(tree.Unary).Primary)), primariesUsedInAssignment(empty(), expr)));
                }
                else {
                    return append(inLst, singleton(value_4(value_4(tree.Unary).Primary)));
                }
            }
            case 1: {
                inLst_mut = inLst;
                tree_mut = value_4(value_4(tree.Unary).Expression);
                continue primariesUsedInAssignment;
            }
            case 2: {
                inLst_mut = inLst;
                tree_mut = value_4(value_4(tree.Unary).Expression);
                continue primariesUsedInAssignment;
            }
            case 3:
                return append(inLst, singleton(value_4(value_4(tree.Unary).Primary)));
            default: {
                let matchResult_1;
                switch (matchValue) {
                    case "negation": {
                        if (value_4(tree.Unary).Type === "parenthesis") {
                            matchResult_1 = 0;
                        }
                        else {
                            matchResult_1 = 1;
                        }
                        break;
                    }
                    case "reduction": {
                        if (value_4(tree.Unary).Type === "parenthesis") {
                            matchResult_1 = 0;
                        }
                        else {
                            matchResult_1 = 1;
                        }
                        break;
                    }
                    default:
                        matchResult_1 = 1;
                }
                switch (matchResult_1) {
                    case 0: {
                        inLst_mut = inLst;
                        tree_mut = value_4(value_4(tree.Unary).Expression);
                        continue primariesUsedInAssignment;
                    }
                    default: {
                        let matchResult_2;
                        switch (matchValue) {
                            case "bitwise_OR":
                            case "bitwise_XOR":
                            case "bitwise_AND":
                            case "additive":
                            case "SHIFT":
                            case "logical_AND":
                            case "logical_OR":
                            case "unary_list":
                            case "equality":
                            case "comparison":
                            case "multiplicative":
                            case "conditional_cond":
                            case "conditional_result": {
                                matchResult_2 = 1;
                                break;
                            }
                            case "unary": {
                                if (value_4(tree.Unary).Type === "number") {
                                    matchResult_2 = 0;
                                }
                                else {
                                    matchResult_2 = 2;
                                }
                                break;
                            }
                            default:
                                matchResult_2 = 2;
                        }
                        switch (matchResult_2) {
                            case 0:
                                if (value_4(value_4(tree.Unary).Number).NumberType === "all") {
                                    const afterBitsSection = value_4(value_4(value_4(tree.Unary).Number).Base)[1] + value_4(value_4(value_4(tree.Unary).Number).AllNumber);
                                    return append(inLst, singleton(new PrimaryT("primary", afterBitsSection, "-3", value_4(value_4(value_4(tree.Unary).Number).Bits), new IdentifierT("delete123", value_4(value_4(tree.Unary).Number).Location), void 0)));
                                }
                                else {
                                    return inLst;
                                }
                            case 1:
                                return append(primariesUsedInAssignment(inLst, value_4(tree.Head)), (tree.Tail == null) ? inLst : primariesUsedInAssignment(inLst, value_4(tree.Tail)));
                            default:
                                return inLst;
                        }
                    }
                }
            }
        }
        break;
    }
}

/**
 * replace this later with getLHSBits'!
 */
export function getLHSBits(portSizeMap, assignment) {
    let a, y, x, name, y_1, x_1, name_1;
    let assignmentWithRange;
    const matchValue = assignment.LHS;
    if ((a = matchValue, assignment.LHS.BitsStart == null)) {
        const a_1 = matchValue;
        assignmentWithRange = [a_1.Primary.Name, -1, -1];
    }
    else {
        const a_2 = matchValue;
        assignmentWithRange = [a_2.Primary.Name, parse(value_4(a_2.BitsStart), 511, false, 32), parse(value_4(a_2.BitsEnd), 511, false, 32)];
    }
    let portListMap;
    let matchResult, name_3, x_2, y_3, bEnd, bStart, name_4;
    if (assignmentWithRange[1] === -1) {
        if (assignmentWithRange[2] === -1) {
            matchResult = 0;
        }
        else if ((y = (assignmentWithRange[2] | 0), (x = (assignmentWithRange[1] | 0), (name = assignmentWithRange[0], x === y)))) {
            matchResult = 1;
            name_3 = assignmentWithRange[0];
            x_2 = assignmentWithRange[1];
            y_3 = assignmentWithRange[2];
        }
        else {
            matchResult = 2;
            bEnd = assignmentWithRange[2];
            bStart = assignmentWithRange[1];
            name_4 = assignmentWithRange[0];
        }
    }
    else if ((y_1 = (assignmentWithRange[2] | 0), (x_1 = (assignmentWithRange[1] | 0), (name_1 = assignmentWithRange[0], x_1 === y_1)))) {
        matchResult = 1;
        name_3 = assignmentWithRange[0];
        x_2 = assignmentWithRange[1];
        y_3 = assignmentWithRange[2];
    }
    else {
        matchResult = 2;
        bEnd = assignmentWithRange[2];
        bStart = assignmentWithRange[1];
        name_4 = assignmentWithRange[0];
    }
    switch (matchResult) {
        case 0: {
            const name_2 = assignmentWithRange[0];
            const matchValue_1 = tryFind(name_2, portSizeMap);
            if (matchValue_1 == null) {
                portListMap = empty();
            }
            else {
                const size = matchValue_1 | 0;
                const names = map((y_2) => [name_2 + int32ToString(y_2), name_2], toList(rangeDouble(0, 1, size - 1)));
                portListMap = names;
            }
            break;
        }
        case 1: {
            portListMap = singleton([name_3 + int32ToString(x_2), name_3]);
            break;
        }
        default: {
            const names_1 = map((y_4) => [name_4 + int32ToString(y_4), name_4], toList(rangeDouble(bEnd, 1, bStart)));
            portListMap = names_1;
        }
    }
    return portListMap;
}

/**
 * returns all the bits of the lhs of an assignment
 * the strings returned are unique, index surrounded by "[]" is appended to the name of the variable
 */
export function getLHSBits$0027(portSizeMap, assignment) {
    let a, y, x, name, y_1, x_1, name_1;
    let assignmentWithRange;
    const matchValue = assignment.LHS;
    if ((a = matchValue, assignment.LHS.BitsStart == null)) {
        const a_1 = matchValue;
        assignmentWithRange = [a_1.Primary.Name, -1, -1];
    }
    else {
        const a_2 = matchValue;
        assignmentWithRange = [a_2.Primary.Name, parse(value_4(a_2.BitsStart), 511, false, 32), parse(value_4(a_2.BitsEnd), 511, false, 32)];
    }
    let portListMap;
    let matchResult, name_3, x_2, y_3, bEnd, bStart, name_4;
    if (assignmentWithRange[1] === -1) {
        if (assignmentWithRange[2] === -1) {
            matchResult = 0;
        }
        else if ((y = (assignmentWithRange[2] | 0), (x = (assignmentWithRange[1] | 0), (name = assignmentWithRange[0], x === y)))) {
            matchResult = 1;
            name_3 = assignmentWithRange[0];
            x_2 = assignmentWithRange[1];
            y_3 = assignmentWithRange[2];
        }
        else {
            matchResult = 2;
            bEnd = assignmentWithRange[2];
            bStart = assignmentWithRange[1];
            name_4 = assignmentWithRange[0];
        }
    }
    else if ((y_1 = (assignmentWithRange[2] | 0), (x_1 = (assignmentWithRange[1] | 0), (name_1 = assignmentWithRange[0], x_1 === y_1)))) {
        matchResult = 1;
        name_3 = assignmentWithRange[0];
        x_2 = assignmentWithRange[1];
        y_3 = assignmentWithRange[2];
    }
    else {
        matchResult = 2;
        bEnd = assignmentWithRange[2];
        bStart = assignmentWithRange[1];
        name_4 = assignmentWithRange[0];
    }
    switch (matchResult) {
        case 0: {
            const name_2 = assignmentWithRange[0];
            const matchValue_1 = tryFind(name_2, portSizeMap);
            if (matchValue_1 == null) {
                portListMap = empty();
            }
            else {
                const size = matchValue_1 | 0;
                const names = map((y_2) => (((name_2 + "[") + int32ToString(y_2)) + "]"), toList(rangeDouble(0, 1, size - 1)));
                portListMap = names;
            }
            break;
        }
        case 1: {
            portListMap = singleton(((name_3 + "[") + int32ToString(x_2)) + "]");
            break;
        }
        default: {
            const names_1 = map((y_4) => (((name_4 + "[") + int32ToString(y_4)) + "]"), toList(rangeDouble(bEnd, 1, bStart)));
            portListMap = names_1;
        }
    }
    return portListMap;
}

/**
 * returns each bit of an assignment LHS. In the case of variable indexing, no bits are returned
 */
export function getLHSBitsAssignedCertainly(portSizeMap, assignment) {
    const matchValue = assignment.LHS.BitsStart;
    const matchValue_1 = assignment.LHS.BitsEnd;
    const matchValue_2 = assignment.LHS.VariableBitSelect;
    let matchResult, e, s;
    if (matchValue != null) {
        if (matchValue_1 != null) {
            if (matchValue_2 == null) {
                matchResult = 1;
                e = matchValue_1;
                s = matchValue;
            }
            else {
                matchResult = 3;
            }
        }
        else {
            matchResult = 3;
        }
    }
    else if (matchValue_1 == null) {
        if (matchValue_2 != null) {
            matchResult = 2;
        }
        else {
            matchResult = 0;
        }
    }
    else {
        matchResult = 3;
    }
    switch (matchResult) {
        case 0: {
            const matchValue_4 = tryFind(assignment.LHS.Primary.Name, portSizeMap);
            if (matchValue_4 == null) {
                return empty();
            }
            else {
                const size = matchValue_4 | 0;
                const names = map((y) => (((assignment.LHS.Primary.Name + "[") + int32ToString(y)) + "]"), toList(rangeDouble(0, 1, size - 1)));
                return names;
            }
        }
        case 1: {
            const names_1 = map((y_1) => (((assignment.LHS.Primary.Name + "[") + int32ToString(y_1)) + "]"), toList(rangeDouble(parse(e, 511, false, 32), 1, parse(s, 511, false, 32))));
            return names_1;
        }
        case 2:
            return empty();
        default:
            return toFail(printf("Wrong combination of bitstart, bitsend and variable bitselect"));
    }
}

export function getPrimaryBits(portSizeMap, primary) {
    let a, y, x, name, y_1, x_1, name_1;
    let primaryWithRange;
    if ((a = primary, primary.BitsStart == null)) {
        const a_1 = primary;
        primaryWithRange = [a_1.Primary.Name, -1, -1];
    }
    else {
        const a_2 = primary;
        primaryWithRange = [a_2.Primary.Name, parse(value_4(a_2.BitsStart), 511, false, 32), parse(value_4(a_2.BitsEnd), 511, false, 32)];
    }
    let portListMap;
    let matchResult, name_3, x_2, y_3, bEnd, bStart, name_4;
    if (primaryWithRange[1] === -1) {
        if (primaryWithRange[2] === -1) {
            matchResult = 0;
        }
        else if ((y = (primaryWithRange[2] | 0), (x = (primaryWithRange[1] | 0), (name = primaryWithRange[0], x === y)))) {
            matchResult = 1;
            name_3 = primaryWithRange[0];
            x_2 = primaryWithRange[1];
            y_3 = primaryWithRange[2];
        }
        else {
            matchResult = 2;
            bEnd = primaryWithRange[2];
            bStart = primaryWithRange[1];
            name_4 = primaryWithRange[0];
        }
    }
    else if ((y_1 = (primaryWithRange[2] | 0), (x_1 = (primaryWithRange[1] | 0), (name_1 = primaryWithRange[0], x_1 === y_1)))) {
        matchResult = 1;
        name_3 = primaryWithRange[0];
        x_2 = primaryWithRange[1];
        y_3 = primaryWithRange[2];
    }
    else {
        matchResult = 2;
        bEnd = primaryWithRange[2];
        bStart = primaryWithRange[1];
        name_4 = primaryWithRange[0];
    }
    switch (matchResult) {
        case 0: {
            const name_2 = primaryWithRange[0];
            const matchValue = tryFind(name_2, portSizeMap);
            if (matchValue == null) {
                portListMap = empty();
            }
            else {
                const size = matchValue | 0;
                const names = map((y_2) => (((name_2 + "[") + int32ToString(y_2)) + "]"), toList(rangeDouble(0, 1, size - 1)));
                portListMap = names;
            }
            break;
        }
        case 1: {
            portListMap = singleton(((name_3 + "[") + int32ToString(x_2)) + "]");
            break;
        }
        default: {
            const names_1 = map((y_4) => (((name_4 + "[") + int32ToString(y_4)) + "]"), toList(rangeDouble(bEnd, 1, bStart)));
            portListMap = names_1;
        }
    }
    return portListMap;
}

export function getDeclarations(declarations, node) {
    if (node.tag === 3) {
        const decl = node.fields[0];
        return append(declarations, singleton(decl));
    }
    else {
        return declarations;
    }
}

export function getCaseStatements(caseStatements, node) {
    if (node.tag === 9) {
        const case$ = node.fields[0];
        return append(caseStatements, singleton(case$));
    }
    else {
        return caseStatements;
    }
}

export function getCaseStatementsWithLoc(caseStatements, node) {
    if (node.tag === 5) {
        const statement = node.fields[0];
        const stmt = getAlwaysStatement(statement);
        if (stmt.tag === 3) {
            const case$ = stmt.fields[0];
            return append(caseStatements, singleton([case$, statement.Location]));
        }
        else {
            return caseStatements;
        }
    }
    else {
        return caseStatements;
    }
}

export function getAlwaysBlocksWithLocations(alwaysBlocks, node) {
    if (node.tag === 21) {
        const item = node.fields[0];
        const matchValue = getItem(item);
        if (matchValue.tag === 4) {
            const always = matchValue.fields[0];
            return append(alwaysBlocks, singleton([always, item.Location]));
        }
        else {
            return alwaysBlocks;
        }
    }
    else {
        return alwaysBlocks;
    }
}

export function getCaseItemNums(nums, node) {
    if (node.tag === 20) {
        const num = node.fields[0];
        return append(nums, singleton(num));
    }
    else {
        return nums;
    }
}

/**
 * Helper function used by checkWidthOfAssignment
 * with 3 recursive subfunctions
 * Returns the RHS Unary Size tree of type OneUnary
 * where OneUnary = {Name:string;ResultWidth:int;Head:OneUnary option;Tail:OneUnary option;Elements:OneUnary list}
 */
export function RHSUnaryAnalysis(assignmentRHS, inputWireSizeMap) {
    const findSizeOfExpression = (tree) => {
        const matchValue = tree.Type;
        let matchResult;
        switch (matchValue) {
            case "unary": {
                if (value_4(tree.Unary).Type === "primary") {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case "negation": {
                if (value_4(tree.Unary).Type === "primary") {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            default:
                matchResult = 1;
        }
        switch (matchResult) {
            case 0: {
                const primary = value_4(value_4(tree.Unary).Primary);
                if (primary.BitsStart == null) {
                    const matchValue_2 = tryFind(primary.Primary.Name, inputWireSizeMap);
                    if (matchValue_2 == null) {
                        return new OneUnary("undefined", 0, void 0, void 0, empty());
                    }
                    else {
                        const num = matchValue_2 | 0;
                        return new OneUnary(primary.Primary.Name, num, void 0, void 0, empty());
                    }
                }
                else {
                    return new OneUnary(primary.Primary.Name, (parse(value_4(primary.BitsStart), 511, false, 32) - parse(value_4(primary.BitsEnd), 511, false, 32)) + 1, void 0, void 0, empty());
                }
            }
            default: {
                let matchResult_1;
                switch (matchValue) {
                    case "unary": {
                        if (value_4(tree.Unary).Type === "number") {
                            matchResult_1 = 0;
                        }
                        else if (value_4(tree.Unary).Type === "concat") {
                            matchResult_1 = 1;
                        }
                        else if (value_4(tree.Unary).Type === "parenthesis") {
                            matchResult_1 = 2;
                        }
                        else {
                            matchResult_1 = 3;
                        }
                        break;
                    }
                    case "negation": {
                        if (value_4(tree.Unary).Type === "parenthesis") {
                            matchResult_1 = 2;
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
                        return new OneUnary("[number]", parse(value_4(value_4(value_4(tree.Unary).Number).Bits), 511, false, 32), void 0, void 0, empty());
                    case 1: {
                        const unariesList = findSizeOfConcat(value_4(value_4(tree.Unary).Expression))(empty());
                        const length = fold((s, unary) => (s + unary.ResultWidth), 0, unariesList) | 0;
                        return new OneUnary("{...}", length, void 0, void 0, unariesList);
                    }
                    case 2: {
                        const elements = findSizeOfExpression(value_4(value_4(tree.Unary).Expression));
                        return new OneUnary("(...)", elements.ResultWidth, void 0, void 0, singleton(elements));
                    }
                    default: {
                        let matchResult_2;
                        switch (matchValue) {
                            case "bitwise_OR":
                            case "bitwise_XOR":
                            case "bitwise_AND":
                            case "additive": {
                                matchResult_2 = 0;
                                break;
                            }
                            case "conditional_cond": {
                                matchResult_2 = 1;
                                break;
                            }
                            case "SHIFT": {
                                matchResult_2 = 2;
                                break;
                            }
                            case "logical_OR":
                            case "logical_AND": {
                                matchResult_2 = 5;
                                break;
                            }
                            case "reduction": {
                                if (value_4(tree.Unary).Type === "parenthesis") {
                                    matchResult_2 = 3;
                                }
                                else {
                                    matchResult_2 = 4;
                                }
                                break;
                            }
                            default:
                                matchResult_2 = 6;
                        }
                        switch (matchResult_2) {
                            case 0: {
                                const u1 = findSizeOfExpression(value_4(tree.Head));
                                const u2 = findSizeOfExpression(value_4(tree.Tail));
                                return new OneUnary("[bitwise_op]", u1.ResultWidth, u1, u2, empty());
                            }
                            case 1: {
                                const result = findSizeOfExpression(value_4(tree.Head));
                                const u1_1 = findSizeOfExpression(value_4(value_4(tree.Tail).Head));
                                const u2_1 = findSizeOfExpression(value_4(value_4(tree.Tail).Tail));
                                return new OneUnary("[conditional]", u1_1.ResultWidth, u1_1, u2_1, singleton(result));
                            }
                            case 2:
                                if (value_4(tree.Tail).Type === "unary_unsigned") {
                                    const u1_2 = findSizeOfExpression(value_4(tree.Head));
                                    return new OneUnary("[shift]", u1_2.ResultWidth, u1_2, void 0, empty());
                                }
                                else {
                                    const u1_3 = findSizeOfExpression(value_4(tree.Head));
                                    const u2_2 = findSizeOfExpression(value_4(tree.Tail));
                                    return new OneUnary("[shift]", u1_3.ResultWidth, u1_3, u2_2, empty());
                                }
                            case 3: {
                                const result_1 = findSizeOfExpression(value_4(value_4(tree.Unary).Expression));
                                return new OneUnary("[reduction]", 1, void 0, void 0, singleton(result_1));
                            }
                            case 4:
                                return new OneUnary("[reduction]", 1, void 0, void 0, empty());
                            case 5: {
                                const u1_4 = findSizeOfExpression(value_4(tree.Head));
                                const u2_3 = findSizeOfExpression(value_4(tree.Tail));
                                return new OneUnary("[logical_op]", 1, u1_4, u2_3, empty());
                            }
                            default:
                                return toFail(printf("Case not covered!"));
                        }
                    }
                }
            }
        }
    };
    const findSizeOfConcat = (tree_1) => ((concatList) => {
        if (tree_1.Tail == null) {
            return append(concatList, singleton(findSizeOfExpression(value_4(tree_1.Head))));
        }
        else {
            const updated = append(concatList, singleton(findSizeOfExpression(value_4(tree_1.Head))));
            return findSizeOfConcat(value_4(tree_1.Tail))(updated);
        }
    });
    return findSizeOfExpression(assignmentRHS);
}

export function getWidthOfExpr(assignmentRHS, inputWireSizeMap) {
    const findSizeOfExpression = (tree) => {
        const matchValue = tree.Type;
        let matchResult;
        switch (matchValue) {
            case "unary": {
                if (value_4(tree.Unary).Type === "primary") {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case "negation": {
                if (value_4(tree.Unary).Type === "primary") {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            default:
                matchResult = 1;
        }
        switch (matchResult) {
            case 0: {
                const primary = value_4(value_4(tree.Unary).Primary);
                const matchValue_1 = primary.BitsStart == null;
                const matchValue_2 = value_4(tree.Unary).Expression;
                if (matchValue_1) {
                    if (matchValue_2 != null) {
                        const expr = matchValue_2;
                        return 1;
                    }
                    else {
                        const matchValue_4 = tryFind(primary.Primary.Name, inputWireSizeMap);
                        if (matchValue_4 == null) {
                            return 0;
                        }
                        else {
                            const num = matchValue_4 | 0;
                            return num | 0;
                        }
                    }
                }
                else {
                    return ((parse(value_4(primary.BitsStart), 511, false, 32) - parse(value_4(primary.BitsEnd), 511, false, 32)) + 1) | 0;
                }
            }
            default: {
                let matchResult_1;
                switch (matchValue) {
                    case "unary": {
                        if (value_4(tree.Unary).Type === "number") {
                            matchResult_1 = 0;
                        }
                        else if (value_4(tree.Unary).Type === "concat") {
                            matchResult_1 = 1;
                        }
                        else if (value_4(tree.Unary).Type === "parenthesis") {
                            matchResult_1 = 2;
                        }
                        else {
                            matchResult_1 = 3;
                        }
                        break;
                    }
                    case "negation": {
                        if (value_4(tree.Unary).Type === "parenthesis") {
                            matchResult_1 = 2;
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
                        return parse(value_4(value_4(value_4(tree.Unary).Number).Bits), 511, false, 32) | 0;
                    case 1: {
                        const unariesList = findSizeOfConcat(value_4(value_4(tree.Unary).Expression))(empty());
                        const length = sum(unariesList, {
                            GetZero: () => 0,
                            Add: (x, y) => (x + y),
                        }) | 0;
                        return length | 0;
                    }
                    case 2: {
                        const elements = findSizeOfExpression(value_4(value_4(tree.Unary).Expression)) | 0;
                        return elements | 0;
                    }
                    default: {
                        let matchResult_2;
                        switch (matchValue) {
                            case "bitwise_OR":
                            case "bitwise_XOR":
                            case "bitwise_AND":
                            case "additive": {
                                matchResult_2 = 0;
                                break;
                            }
                            case "conditional_cond": {
                                matchResult_2 = 1;
                                break;
                            }
                            case "SHIFT": {
                                matchResult_2 = 2;
                                break;
                            }
                            case "logical_OR":
                            case "logical_AND": {
                                matchResult_2 = 5;
                                break;
                            }
                            case "equality": {
                                matchResult_2 = 6;
                                break;
                            }
                            case "comparison": {
                                matchResult_2 = 7;
                                break;
                            }
                            case "multiplicative": {
                                matchResult_2 = 8;
                                break;
                            }
                            case "reduction": {
                                if (value_4(tree.Unary).Type === "parenthesis") {
                                    matchResult_2 = 3;
                                }
                                else {
                                    matchResult_2 = 4;
                                }
                                break;
                            }
                            default:
                                matchResult_2 = 9;
                        }
                        switch (matchResult_2) {
                            case 0: {
                                const u1 = findSizeOfExpression(value_4(tree.Head)) | 0;
                                const u2 = findSizeOfExpression(value_4(tree.Tail)) | 0;
                                return max(u1, u2) | 0;
                            }
                            case 1: {
                                const u1_1 = findSizeOfExpression(value_4(value_4(tree.Tail).Head)) | 0;
                                const u2_1 = findSizeOfExpression(value_4(value_4(tree.Tail).Tail)) | 0;
                                return max(u1_1, u2_1) | 0;
                            }
                            case 2:
                                if (value_4(tree.Tail).Type === "unary_unsigned") {
                                    const u1_2 = findSizeOfExpression(value_4(tree.Head)) | 0;
                                    return u1_2 | 0;
                                }
                                else {
                                    const u1_3 = findSizeOfExpression(value_4(tree.Head)) | 0;
                                    const u2_2 = findSizeOfExpression(value_4(tree.Tail)) | 0;
                                    return u1_3 | 0;
                                }
                            case 3: {
                                const result = findSizeOfExpression(value_4(value_4(tree.Unary).Expression)) | 0;
                                return 1;
                            }
                            case 4:
                                return 1;
                            case 5: {
                                const u1_4 = findSizeOfExpression(value_4(tree.Head)) | 0;
                                const u2_3 = findSizeOfExpression(value_4(tree.Tail)) | 0;
                                return 1;
                            }
                            case 6:
                                return 1;
                            case 7:
                                return 1;
                            case 8: {
                                const w1 = findSizeOfExpression(value_4(tree.Head)) | 0;
                                const w2 = findSizeOfExpression(value_4(tree.Tail)) | 0;
                                return (w1 + w2) | 0;
                            }
                            default:
                                return toFail(printf("Case not covered!")) | 0;
                        }
                    }
                }
            }
        }
    };
    const findSizeOfConcat = (tree_1) => ((concatList) => {
        if (tree_1.Tail == null) {
            return append(concatList, singleton(findSizeOfExpression(value_4(tree_1.Head))));
        }
        else {
            const updated = append(concatList, singleton(findSizeOfExpression(value_4(tree_1.Head))));
            return findSizeOfConcat(value_4(tree_1.Tail))(updated);
        }
    });
    return findSizeOfExpression(assignmentRHS) | 0;
}

/**
 * Check if the width of each wire/input used
 * is within the correct range (defined range)
 */
export function checkPrimariesWidths(linesLocations, currentInputWireSizeMap, localErrors, primariesRHS) {
    return collect((x) => {
        const matchValue = x.BitsStart == null;
        if (matchValue) {
            return localErrors;
        }
        else {
            const name = x.Primary.Name;
            const bStart = parse(value_4(x.BitsStart), 511, false, 32) | 0;
            const bEnd = parse(value_4(x.BitsEnd), 511, false, 32) | 0;
            if (bStart === -3) {
                if (bEnd === 0) {
                    const message = "Number can\'t be 0 bits wide";
                    const extraMessages = [new ExtraErrorInfo("Number can\'t be 0 bits wide", false, new ReplaceType(3, [])), new ExtraErrorInfo("The integer before \'h/\'b represents the width of the number\n e.g. 12\'hc7 -> 000011000111", false, new ReplaceType(3, []))];
                    return append(localErrors, createErrorMessage(linesLocations, x.Primary.Location, message, extraMessages, "0\'b"));
                }
                else {
                    let no;
                    const matchValue_1 = x.PrimaryType[0];
                    switch (matchValue_1) {
                        case "b": {
                            no = ("0" + x.PrimaryType);
                            break;
                        }
                        case "h": {
                            const withoutH = Array.from(mapIndexed((index, char) => ((index === 0) ? "0" : char), x.PrimaryType.split(""))).join('');
                            no = ("0x" + withoutH);
                            break;
                        }
                        default:
                            no = (Array.from(mapIndexed((index_1, char_1) => ((index_1 === 0) ? "0" : char_1), x.PrimaryType.split(""))).join(''));
                    }
                    const matchValue_2 = strToIntCheckWidth(bEnd, no);
                    if (matchValue_2.tag === 1) {
                        const message_1 = toText(printf("Number can\'t fit in %i bits"))(bEnd);
                        const extraMessages_1 = [new ExtraErrorInfo(toText(printf("Number can\'t fit in %i bits"))(bEnd), false, new ReplaceType(3, [])), new ExtraErrorInfo("The integer before \'h/\'b represents the width of the number\n e.g. 12\'hc7 -> 000011000111", false, new ReplaceType(3, []))];
                        return append(localErrors, createErrorMessage(linesLocations, x.Primary.Location, message_1, extraMessages_1, "0\'b"));
                    }
                    else {
                        const n = matchValue_2.fields[0];
                        return localErrors;
                    }
                }
            }
            else {
                const matchValue_3 = tryFind(name, currentInputWireSizeMap);
                if (matchValue_3 == null) {
                    return localErrors;
                }
                else {
                    const size = matchValue_3 | 0;
                    if (((bStart < size) && (bEnd >= 0)) && (bStart >= bEnd)) {
                        return localErrors;
                    }
                    else {
                        let definition;
                        if (size === 1) {
                            definition = " a single bit ";
                        }
                        else {
                            const arg_3 = (size - 1) | 0;
                            definition = toText(printf(" %s[%i:0] "))(name)(arg_3);
                        }
                        const usedWidth = (bStart === bEnd) ? toText(printf(" %s[%i] "))(name)(bStart) : toText(printf(" %s[%i:%i] "))(name)(bStart)(bEnd);
                        const message_2 = toText(printf("Wrong width of variable: \'%s\'"))(name);
                        const extraMessages_2 = [new ExtraErrorInfo((((toText(printf("Variable: \'%s\' is defined as"))(name) + definition) + "\nTherefore,") + usedWidth) + "is invalid", false, new ReplaceType(3, []))];
                        return append(localErrors, createErrorMessage(linesLocations, x.Primary.Location, message_2, extraMessages_2, name));
                    }
                }
            }
        }
    }, primariesRHS);
}

export function checkExpr(linesLocations, currentInputWireSizeMap, localErrors, expr) {
    const primariesRHS = primariesUsedInAssignment(empty(), expr);
    return checkPrimariesWidths(linesLocations, currentInputWireSizeMap, localErrors, primariesRHS);
}

export function checkNumber(linesLocations, num) {
    const matchValue = value_4(num.Base);
    const matchValue_1 = value_4(num.AllNumber);
    const width = value_4(num.Bits);
    const numBase = matchValue;
    const allNum = matchValue_1;
    if (parse(width, 511, false, 32) === 0) {
        const message = "Number can\'t be 0 bits wide";
        const extraMessages = [new ExtraErrorInfo("Number can\'t be 0 bits wide", false, new ReplaceType(3, [])), new ExtraErrorInfo("The integer before \'h/\'b represents the width of the number\n e.g. 12\'hc7 -> 000011000111", false, new ReplaceType(3, []))];
        return createErrorMessage(linesLocations, num.Location, message, extraMessages, "0\'b");
    }
    else {
        const no = (numBase === "\'b") ? ("0" + allNum) : ((numBase === "\'h") ? ("0x" + allNum) : allNum);
        const no_1 = toDecimal(allNum, numBase, "64");
        const matchValue_3 = strToIntCheckWidth(parse(width, 511, false, 32), int64ToString(no_1));
        if (matchValue_3.tag === 1) {
            const message_1 = toText(printf("Number can\'t fit in %A bits"))(width);
            const extraMessages_1 = [new ExtraErrorInfo(toText(printf("Number can\'t fit in %A bits"))(width), false, new ReplaceType(3, [])), new ExtraErrorInfo("The integer before \'h/\'b represents the width of the number\n e.g. 12\'hc7 -> 000011000111", false, new ReplaceType(3, []))];
            return createErrorMessage(linesLocations, num.Location, message_1, extraMessages_1, "0\'b");
        }
        else {
            const n = matchValue_3.fields[0];
            return empty();
        }
    }
}

export class ExpressionNode extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Expression", "Unary", "Number", "Primary"];
    }
}

export function ExpressionNode_$reflection() {
    return union_type("ErrorCheckHelpers.ExpressionNode", [], ExpressionNode, () => [[["Item", ExpressionT_$reflection()]], [["Item", UnaryT_$reflection()]], [["Item", NumberT_$reflection()]], [["Item", PrimaryT_$reflection()]]]);
}

/**
 * make sure to include variables AND ports in portSizeMap
 */
export function getRHSBits(portSizeMap, expression) {
    const getExprBits = (expr) => {
        let leftBits;
        const matchValue = expr.Head;
        if (matchValue != null) {
            const head = matchValue;
            leftBits = getExprBits(head);
        }
        else {
            leftBits = empty_1({
                Compare: comparePrimitives,
            });
        }
        let rightBits;
        const matchValue_1 = expr.Tail;
        if (matchValue_1 != null) {
            const tail = matchValue_1;
            rightBits = getExprBits(tail);
        }
        else {
            rightBits = empty_1({
                Compare: comparePrimitives,
            });
        }
        let unaryBits;
        const matchValue_2 = expr.Unary;
        if (matchValue_2 != null) {
            const unary = matchValue_2;
            const matchValue_3 = unary.Expression;
            const matchValue_4 = unary.Number;
            const matchValue_5 = unary.Primary;
            let matchResult, expr_1, primary, expr_2, primary_1;
            if (matchValue_3 == null) {
                if (matchValue_4 == null) {
                    if (matchValue_5 != null) {
                        matchResult = 2;
                        primary = matchValue_5;
                    }
                    else {
                        matchResult = 4;
                    }
                }
                else if (matchValue_5 == null) {
                    matchResult = 1;
                }
                else {
                    matchResult = 4;
                }
            }
            else if (matchValue_4 == null) {
                if (matchValue_5 != null) {
                    matchResult = 3;
                    expr_2 = matchValue_3;
                    primary_1 = matchValue_5;
                }
                else {
                    matchResult = 0;
                    expr_1 = matchValue_3;
                }
            }
            else {
                matchResult = 4;
            }
            switch (matchResult) {
                case 0: {
                    unaryBits = getExprBits(expr_1);
                    break;
                }
                case 1: {
                    unaryBits = empty_1({
                        Compare: comparePrimitives,
                    });
                    break;
                }
                case 2: {
                    const var$ = primary.Primary.Name;
                    let bitsStart;
                    const matchValue_7 = primary.BitsStart;
                    if (matchValue_7 != null) {
                        const bitstart = matchValue_7;
                        bitsStart = parse(bitstart, 511, false, 32);
                    }
                    else {
                        bitsStart = (defaultArg(tryFind(var$, portSizeMap), 1) - 1);
                    }
                    let bitsEnd;
                    const matchValue_8 = primary.BitsEnd;
                    if (matchValue_8 != null) {
                        const bitsend = matchValue_8;
                        bitsEnd = parse(bitsend, 511, false, 32);
                    }
                    else {
                        bitsEnd = 0;
                    }
                    unaryBits = ofList(map((idx) => (((var$ + "[") + int32ToString(idx)) + "]"), toList(rangeDouble(bitsEnd, 1, bitsStart))), {
                        Compare: comparePrimitives,
                    });
                    break;
                }
                case 3: {
                    const bitSelectBits = getExprBits(expr_2);
                    const var$_1 = primary_1.Primary.Name;
                    let bitsStart_1;
                    const matchValue_9 = primary_1.BitsStart;
                    if (matchValue_9 != null) {
                        const bitstart_1 = matchValue_9;
                        bitsStart_1 = parse(bitstart_1, 511, false, 32);
                    }
                    else {
                        bitsStart_1 = (defaultArg(tryFind(var$_1, portSizeMap), 1) - 1);
                    }
                    let bitsEnd_1;
                    const matchValue_10 = primary_1.BitsEnd;
                    if (matchValue_10 != null) {
                        const bitsend_1 = matchValue_10;
                        bitsEnd_1 = parse(bitsend_1, 511, false, 32);
                    }
                    else {
                        bitsEnd_1 = 0;
                    }
                    unaryBits = union(bitSelectBits, ofList(map((idx_1) => (((var$_1 + "[") + int32ToString(idx_1)) + "]"), toList(rangeDouble(bitsEnd_1, 1, bitsStart_1))), {
                        Compare: comparePrimitives,
                    }));
                    break;
                }
                default:
                    unaryBits = toFail(printf("Invalid expression, should not happen!!!"));
            }
        }
        else {
            unaryBits = empty_1({
                Compare: comparePrimitives,
            });
        }
        return fold(union, empty_1({
            Compare: comparePrimitives,
        }), ofArray([leftBits, rightBits, unaryBits]));
    };
    return getExprBits(expression);
}

export function getLHSWidth(assign, varSizeMap) {
    const matchValue = assign.LHS.BitsStart;
    const matchValue_1 = assign.LHS.BitsEnd;
    const matchValue_3 = assign.LHS.Width;
    let matchResult, e, s, w;
    if (matchValue == null) {
        if (matchValue_1 == null) {
            if (assign.LHS.VariableBitSelect != null) {
                if (matchValue_3 != null) {
                    matchResult = 2;
                    w = matchValue_3;
                }
                else {
                    matchResult = 3;
                }
            }
            else {
                matchResult = 1;
            }
        }
        else {
            matchResult = 3;
        }
    }
    else if (matchValue_1 != null) {
        matchResult = 0;
        e = matchValue_1;
        s = matchValue;
    }
    else {
        matchResult = 3;
    }
    switch (matchResult) {
        case 0:
            return ((parse(s, 511, false, 32) - parse(e, 511, false, 32)) + 1) | 0;
        case 1: {
            const matchValue_5 = tryFind(assign.LHS.Primary.Name, varSizeMap);
            if (matchValue_5 != null) {
                const size = matchValue_5 | 0;
                return size | 0;
            }
            else {
                return 0;
            }
        }
        case 2:
            return w | 0;
        default:
            return toFail(printf("Only one of bitsStart and bitsEnd present")) | 0;
    }
}

export function getCondAndCaseExpressions(expressions, node) {
    switch (node.tag) {
        case 9: {
            const case$ = node.fields[0];
            return append(expressions, singleton([case$.Expression, case$.Location]));
        }
        case 12: {
            const cond = node.fields[0];
            return append(expressions, singleton([cond.Condition, cond.Location]));
        }
        default:
            return expressions;
    }
}

export function getModuleInstantiationStatements(moduleInstantiations, node) {
    if (node.tag === 25) {
        const modInst = node.fields[0];
        return append(moduleInstantiations, singleton(modInst));
    }
    else {
        return moduleInstantiations;
    }
}

/**
 * Helper function to find the closest port or wire name
 * Used by checkNamesOnRHSOfAssignment
 * Gives an appropriate suggestion if the wrong name is close to a name in the list
 */
export function findCloseVariable(variable, portAndWireNames) {
    return sortBy((str) => str.length, collect((name) => {
        const one = except(name.split(""), variable, {
            Equals: (x, y) => (x === y),
            GetHashCode: stringHash,
        });
        const two = except(variable, name.split(""), {
            Equals: (x_1, y_1) => (x_1 === y_1),
            GetHashCode: stringHash,
        });
        if ((length_1(one) === 0) && (length_1(two) <= 2)) {
            return singleton(name);
        }
        else if ((length_1(two) === 0) && (length_1(one) <= 2)) {
            return singleton(name);
        }
        else {
            return empty();
        }
    }, portAndWireNames), {
        Compare: comparePrimitives,
    });
}

/**
 * Output primaries
 */
export function getModuleInstantiationOutputPrimaries(modInst, project) {
    const matchValue = tryFind_1((c) => (c.Name === modInst.Module.Name), project.LoadedComponents);
    if (matchValue == null) {
        return map((conn_2) => conn_2.Primary, ofArray(modInst.Connections));
    }
    else {
        const comp = matchValue;
        const outputs = ofList(map((tuple) => tuple[0], comp.OutputLabels), {
            Compare: comparePrimitives,
        });
        const outputPrimaries = map((conn_1) => conn_1.Primary, filter((conn) => contains(conn.PortId.Name.toLocaleUpperCase(), outputs), ofArray(modInst.Connections)));
        return outputPrimaries;
    }
}

/**
 * Input primaries
 */
export function getModuleInstantiationInputPrimaries(modInst, project) {
    const matchValue = tryFind_1((c) => (c.Name === modInst.Module.Name), project.LoadedComponents);
    if (matchValue == null) {
        return map((conn_2) => conn_2.Primary, ofArray(modInst.Connections));
    }
    else {
        const comp = matchValue;
        const inputs = ofList(map((tuple) => tuple[0], comp.InputLabels), {
            Compare: comparePrimitives,
        });
        const inputPrimaries = map((conn_1) => conn_1.Primary, filter((conn) => contains(conn.PortId.Name.toLocaleUpperCase(), inputs), ofArray(modInst.Connections)));
        return inputPrimaries;
    }
}

//# sourceMappingURL=ErrorCheckHelpers.fs.js.map
