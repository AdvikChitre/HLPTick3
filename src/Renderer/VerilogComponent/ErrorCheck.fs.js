import { exists as exists_1, fold, isEmpty as isEmpty_1, filter as filter_1, contains, concat, map as map_2, append, empty, collect, length as length_1, map2, ofSeq, ofArray, singleton, item as item_2, findIndexBack, tryFind } from "../fable_modules/fable-library.4.1.4/List.js";
import { PortAssignmentError, ExtraErrorInfo, ReplaceType, ErrorInfo } from "./VerilogTypes.fs.js";
import { List_distinct, List_countBy, except, countBy, List_except, distinct } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { safeHash, compare, int32ToString, equals, comparePrimitives, stringHash } from "../fable_modules/fable-library.4.1.4/Util.js";
import { add, fold as fold_2, find, tryFind as tryFind_1, ofSeq as ofSeq_1, filter, toList, FSharpMap__get_Item, ofList } from "../fable_modules/fable-library.4.1.4/Map.js";
import { parse } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { map as map_3, toList as toList_1, isEmpty } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { toFail, join, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { getLHSWidth, getWidthOfExpr, getCondAndCaseExpressions, checkPrimariesWidths, checkExpr, findCloseVariable, getDeclarations, primariesUsedInAssignment, getModuleInstantiationStatements, getModuleInstantiationInputPrimaries } from "./ErrorCheckHelpers.fs.js";
import { getAssignments$0027, getAssignmentsWithLocations, getAlwaysBlocks, getAllExpressions$0027, ASTNode, foldAST } from "./VerilogAST.fs.js";
import { value as value_4 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { append as append_1, fold as fold_1 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { checkProceduralAssignments, checkVariablesDrivenSimultaneously, checkVariablesAlwaysAssigned, checkCasesStatements, checkExpressions, checkClk, checkClkNames, cycleCheck, checkVariablesUsed, checkAlwaysCombRHS, checkModuleInstantiations } from "./ErrorCheckProcedural.fs.js";

function getFileInProject(name, project) {
    return tryFind((comp) => (comp.Name.toLocaleUpperCase() === name.toLocaleUpperCase()), project.LoadedComponents);
}

function isFileInProject(name, project) {
    const _arg = getFileInProject(name, project);
    if (_arg != null) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Helper function to create an ErrorInfo-type Error Message
 * given the location, the variable name, and the message
 */
export function createErrorMessage(newLinesLocations, currLocation, message, extraMessages, name) {
    const prevIndex = findIndexBack((x) => (x <= currLocation), newLinesLocations) | 0;
    const line = (prevIndex + 1) | 0;
    const prevLineLocation = item_2(prevIndex, newLinesLocations) | 0;
    const length = name.length | 0;
    return singleton(new ErrorInfo(line, (currLocation - prevLineLocation) + 1, length, message, extraMessages));
}

/**
 * Checks whether all ports given in the beginning of the module are defined as input/output
 * Also if all ports have distinct names
 */
export function portCheck(ast, linesLocations, errorList) {
    const portList = ofArray(ast.Module.PortList);
    const distinctPortList = ofSeq(distinct(portList, {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    }));
    const locationList = ofArray(ast.Module.Locations);
    const locationMap = ofList(map2((p, i) => [p, parse(i, 511, false, 32)], portList, locationList), {
        Compare: comparePrimitives,
    });
    if (ast.Module.Type === "module_new") {
        return errorList;
    }
    else {
        const matchValue_1 = length_1(portList) === length_1(distinctPortList);
        if (matchValue_1) {
            const items = ofArray(ast.Module.ModuleItems.ItemList);
            const decls = collect((x_5) => {
                const matchValue_2 = x_5.IODecl == null;
                if (matchValue_2) {
                    return empty();
                }
                else {
                    const matchValue_3 = x_5.IODecl;
                    if (matchValue_3 == null) {
                        return empty();
                    }
                    else {
                        const d = matchValue_3;
                        return collect((x_6) => singleton(x_6.Name), ofArray(d.Variables));
                    }
                }
            }, items);
            const diff = List_except(decls, portList, {
                Equals: (x_7, y_4) => (x_7 === y_4),
                GetHashCode: stringHash,
            });
            const matchValue_4 = isEmpty(diff);
            if (matchValue_4) {
                return errorList;
            }
            else {
                return append(errorList, collect((name_3) => {
                    const message_1 = toText(printf("Port \'%s\' is not declared either as input or output"))(name_3);
                    const extraMessages_1 = [new ExtraErrorInfo(toText(printf("Port \'%s\' must be declared as input or output"))(name_3), false, new ReplaceType(3, [])), new ExtraErrorInfo(toText(printf("input bit %s;|output bit %s;"))(name_3)(name_3), true, new ReplaceType(0, []))];
                    return createErrorMessage(linesLocations, FSharpMap__get_Item(locationMap, name_3), message_1, extraMessages_1, name_3);
                }, diff));
            }
        }
        else {
            return append(errorList, collect((name_2) => {
                const message = "Ports must have different names";
                const extraMessages = [new ExtraErrorInfo(toText(printf("Name \'%s\' has already been used for a port \n Please use a different name"))(name_2), false, new ReplaceType(3, []))];
                return createErrorMessage(linesLocations, FSharpMap__get_Item(locationMap, name_2), message, extraMessages, name_2);
            }, map_2((tuple) => tuple[0], toList(filter((name_1, count) => (count > 1), ofSeq_1(countBy((x_2) => x_2, map_2((name) => name.toLocaleUpperCase(), portList), {
                Equals: (x_3, y_2) => (x_3 === y_2),
                GetHashCode: stringHash,
            }), {
                Compare: comparePrimitives,
            }))))));
        }
    }
}

/**
 * Checks whether all ports defined as input/output are declared as ports in the module header
 * Also checks for double definitions and for input ports not used in the assignments
 */
export function checkIODeclarations(ast, portWidthDeclarationMap, portLocationMap, linesLocations, nonUniquePortDeclarations, portMap, project, errorList) {
    const portList = ofArray(ast.Module.PortList);
    const moduleInstantiationsPrimaries = map_2((primary) => primary.Primary.Name, collect((modInst) => getModuleInstantiationInputPrimaries(modInst, project), foldAST(getModuleInstantiationStatements, empty(), new ASTNode(24, [ast]))));
    const PrimariesUsedExpr = append(moduleInstantiationsPrimaries, map_2((primary_1) => primary_1.Primary.Name, concat(map_2((expr) => primariesUsedInAssignment(empty(), expr), foldAST(getAllExpressions$0027, empty(), new ASTNode(24, [ast]))))));
    return append(errorList, collect((port) => {
        const matchValue = contains(port, PrimariesUsedExpr, {
            Equals: (x, y) => (x === y),
            GetHashCode: stringHash,
        });
        const matchValue_1 = tryFind_1(port, portMap);
        let matchResult;
        if (matchValue) {
            matchResult = 1;
        }
        else if (matchValue_1 != null) {
            if (matchValue_1 === "input") {
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
            case 0: {
                const alwaysFFs = filter_1((always) => (always.AlwaysType === "always_ff"), foldAST(getAlwaysBlocks, empty(), new ASTNode(24, [ast])));
                if ((port === "clk") && !equals(alwaysFFs, empty())) {
                    return errorList;
                }
                else {
                    const currLocation = find(port, portLocationMap) | 0;
                    const message = toText(printf("Variable \'%s\' is defined as an input port but is not used"))(port);
                    const extraMessages = [new ExtraErrorInfo(toText(printf("Variable \'%s\' is defined as an input port but is not used \n Please delete it if it is not needed"))(port), false, new ReplaceType(3, []))];
                    return createErrorMessage(linesLocations, currLocation, message, extraMessages, port);
                }
            }
            default: {
                const matchValue_3 = contains(port, portList, {
                    Equals: (x_1, y_1) => (x_1 === y_1),
                    GetHashCode: stringHash,
                });
                if (matchValue_3) {
                    if (contains(port, nonUniquePortDeclarations, {
                        Equals: (x_2, y_2) => (x_2 === y_2),
                        GetHashCode: stringHash,
                    })) {
                        const currLocation_2 = find(port, portLocationMap) | 0;
                        const message_2 = toText(printf("Port \'%s\' is already defined"))(port);
                        const extraMessages_2 = [new ExtraErrorInfo(toText(printf("Port \'%s\' is already defined"))(port), false, new ReplaceType(3, []))];
                        return createErrorMessage(linesLocations, currLocation_2, message_2, extraMessages_2, port);
                    }
                    else {
                        return empty();
                    }
                }
                else {
                    const currLocation_1 = find(port, portLocationMap) | 0;
                    const message_1 = toText(printf("Port \'%s\' is not defined as a port in the module declaration"))(port);
                    const extraMessages_1 = [new ExtraErrorInfo(toText(printf("Port \'%s\' is not defined as a port \n Please define it in the module declaration"))(port), false, new ReplaceType(3, []))];
                    return createErrorMessage(linesLocations, currLocation_1, message_1, extraMessages_1, port);
                }
            }
        }
    }, map_2((tuple) => tuple[0], toList(portWidthDeclarationMap))));
}

/**
 * Checks whether the IO declarations have correct width format (i.e. Little-endian)
 */
export function checkIOWidthDeclarations(ast, linesLocations, errorList) {
    return append(errorList, collect((ioDecl) => {
        if (ioDecl.Range == null) {
            return empty();
        }
        else {
            const range = value_4(ioDecl.Range);
            if ((range.End !== "0") ? true : (parse(range.Start, 511, false, 32) <= parse(range.End, 511, false, 32))) {
                const message = "Wrong width declaration";
                const temp = (parse(range.Start, 511, false, 32) <= parse(range.End, 511, false, 32)) ? "\nBig-Endian format is not allowed yet by ISSIE" : "";
                const extraMessages = [new ExtraErrorInfo(toText(printf("A port\'s width can\'t be \'[%s:%s]\'\nCorrect form: [X:0]"))(range.Start)(range.End) + temp, false, new ReplaceType(3, []))];
                return createErrorMessage(linesLocations, range.Location, message, extraMessages, range.Start + "[:0]");
            }
            else {
                return empty();
            }
        }
    }, map_2((item_1) => value_4(item_1.IODecl), ofArray(ast.Module.ModuleItems.ItemList.filter((item) => {
        if (item.ItemType === "output_decl") {
            return true;
        }
        else {
            return item.ItemType === "input_decl";
        }
    })))));
}

/**
 * Checks if the name of the module is valid (i.e. this sheet doesn't exist)
 */
export function nameCheck(ast, linesLocations, origin, project, errorList) {
    const moduleName = ast.Module.ModuleName.Name;
    let patternInput;
    if (origin.tag === 1) {
        const initialName = origin.fields[0];
        patternInput = [moduleName !== initialName, initialName];
    }
    else {
        patternInput = [isFileInProject(moduleName, project), ""];
    }
    const initialFileName = patternInput[1];
    const exists = patternInput[0];
    let localError;
    if (exists) {
        if (origin.tag === 1) {
            const message_1 = "Verilog component\'s name cannot be changed ";
            const extraMessages_1 = [new ExtraErrorInfo("Module Name of Verilog component cannot be changed", false, new ReplaceType(3, [])), new ExtraErrorInfo(toText(printf("%s"))(initialFileName), true, new ReplaceType(2, [moduleName]))];
            localError = createErrorMessage(linesLocations, ast.Module.ModuleName.Location, message_1, extraMessages_1, moduleName);
        }
        else {
            const message = "A sheet/component with that name already exists";
            const extraMessages = [new ExtraErrorInfo("Module Name must be different from existing Sheets/Components", false, new ReplaceType(3, []))];
            localError = createErrorMessage(linesLocations, ast.Module.ModuleName.Location, message, extraMessages, moduleName);
        }
    }
    else {
        localError = empty();
    }
    return append(localError, errorList);
}

/**
 * Checks if all declared output ports have a value assigned to them
 * The check is done bit-by-bit
 */
export function checkAllOutputsAssigned(ast, portMap, portSizeMap, linesLocations, errorList) {
    const outputPortListMap = collect((x) => {
        const size = find(x, portSizeMap) | 0;
        const names = map_2((y) => [x + int32ToString(y), x], toList_1(rangeDouble(0, 1, size - 1)));
        return names;
    }, map_2((tuple) => tuple[0], toList(filter((_arg, s) => (s === "output"), portMap))));
    const outputPortList = map_2((tuple_1) => tuple_1[0], outputPortListMap);
    const getVariablesAssigned = (vars, node) => {
        let contAssign;
        switch (node.tag) {
            case 2:
                if ((contAssign = node.fields[0], contAssign.Assignment.LHS.BitsStart == null)) {
                    const contAssign_1 = node.fields[0];
                    return append(vars, singleton([contAssign_1.Assignment.LHS.Primary.Name, -1, -1]));
                }
                else {
                    const contAssign_2 = node.fields[0];
                    return append(vars, singleton([contAssign_2.Assignment.LHS.Primary.Name, parse(value_4(contAssign_2.Assignment.LHS.BitsStart), 511, false, 32), parse(value_4(contAssign_2.Assignment.LHS.BitsEnd), 511, false, 32)]));
                }
            case 7: {
                const blocking = node.fields[0];
                return append(vars, singleton([blocking.Assignment.LHS.Primary.Name, -1, -1]));
            }
            case 6: {
                const nonblocking = node.fields[0];
                return append(vars, singleton([nonblocking.Assignment.LHS.Primary.Name, -1, -1]));
            }
            case 25: {
                const modInst = node.fields[0];
                return append(vars, map_2((connection) => {
                    let a;
                    const matchValue = connection.Primary;
                    if ((a = matchValue, a.BitsStart == null)) {
                        const a_1 = matchValue;
                        return [a_1.Primary.Name, -1, -1];
                    }
                    else {
                        const a_2 = matchValue;
                        return [a_2.Primary.Name, parse(value_4(a_2.BitsStart), 511, false, 32), parse(value_4(a_2.BitsEnd), 511, false, 32)];
                    }
                }, ofArray(modInst.Connections)));
            }
            default:
                return vars;
        }
    };
    const variablesAssigned = foldAST(getVariablesAssigned, empty(), new ASTNode(24, [ast]));
    const assignmentPortList = collect((x_1) => {
        let y_1, x_2, name, y_2, x_3, name_1;
        let matchResult, name_3, x_4, y_4, bEnd, bStart, name_4;
        if (x_1[1] === -1) {
            if (x_1[2] === -1) {
                matchResult = 0;
            }
            else if ((y_1 = (x_1[2] | 0), (x_2 = (x_1[1] | 0), (name = x_1[0], x_2 === y_1)))) {
                matchResult = 1;
                name_3 = x_1[0];
                x_4 = x_1[1];
                y_4 = x_1[2];
            }
            else {
                matchResult = 2;
                bEnd = x_1[2];
                bStart = x_1[1];
                name_4 = x_1[0];
            }
        }
        else if ((y_2 = (x_1[2] | 0), (x_3 = (x_1[1] | 0), (name_1 = x_1[0], x_3 === y_2)))) {
            matchResult = 1;
            name_3 = x_1[0];
            x_4 = x_1[1];
            y_4 = x_1[2];
        }
        else {
            matchResult = 2;
            bEnd = x_1[2];
            bStart = x_1[1];
            name_4 = x_1[0];
        }
        switch (matchResult) {
            case 0: {
                const name_2 = x_1[0];
                const matchValue_1 = tryFind_1(name_2, portSizeMap);
                if (matchValue_1 == null) {
                    return empty();
                }
                else {
                    const size_1 = matchValue_1 | 0;
                    const names_1 = map_2((y_3) => (name_2 + int32ToString(y_3)), toList_1(rangeDouble(0, 1, size_1 - 1)));
                    return names_1;
                }
            }
            case 1:
                return singleton(name_3 + int32ToString(x_4));
            default: {
                const names_2 = map_2((y_5) => (name_4 + int32ToString(y_5)), toList_1(rangeDouble(bEnd, 1, bStart)));
                return names_2;
            }
        }
    }, variablesAssigned);
    const genErrorMessage = (portList, mapping_7, errorType, mess) => {
        let arg_1;
        if (isEmpty_1(portList)) {
            return empty();
        }
        else {
            const fullNames = collect((x_5) => {
                const matchValue_3 = tryFind_1(x_5, ofList(mapping_7, {
                    Compare: compare,
                }));
                if (matchValue_3 == null) {
                    return empty();
                }
                else {
                    const name_5 = matchValue_3;
                    const length = join("", map_3((value) => value, except(name_5.split(""), x_5, {
                        Equals: (x_7, y_7) => (x_7 === y_7),
                        GetHashCode: stringHash,
                    })));
                    return singleton(((name_5 + "[") + length) + "]");
                }
            }, portList);
            const currLocation = ast.Module.EndLocation | 0;
            const message = mess;
            const extraMessages = (errorType.tag === 1) ? [] : [new ExtraErrorInfo(toText(printf("The following ports are declared but not assigned: %A"))(fullNames), false, new ReplaceType(3, [])), new ExtraErrorInfo((arg_1 = item_2(0, fullNames), toText(printf("assign %s = 1\'b0;"))(arg_1)), true, new ReplaceType(1, []))];
            if (errorType.tag === 0) {
                return createErrorMessage(linesLocations, currLocation, message, extraMessages, "endmodule");
            }
            else {
                return empty();
            }
        }
    };
    const countAssignments = List_countBy((x_8) => x_8, assignmentPortList, {
        Equals: (x_9, y_8) => (x_9 === y_8),
        GetHashCode: stringHash,
    });
    const notUnique = map_2((tuple_2) => tuple_2[0], filter_1((tupledArg) => {
        const y_9 = tupledArg[1] | 0;
        return y_9 > 1;
    }, countAssignments));
    const unassignedPorts = List_except(assignmentPortList, outputPortList, {
        Equals: (x_10, y_10) => (x_10 === y_10),
        GetHashCode: stringHash,
    });
    const localErrors = isEmpty_1(unassignedPorts) ? genErrorMessage(notUnique, outputPortListMap, new PortAssignmentError(1, []), "Some output ports have been assigned more than once") : genErrorMessage(unassignedPorts, outputPortListMap, new PortAssignmentError(0, []), "All output ports must be assigned");
    return append(errorList, localErrors);
}

/**
 * Helper recursive function to transform the produced OneUnary-type tree
 * by RHSUnaryAnalysis to a string which can be used for ErrorInfo
 */
export function unaryTreeToString(treeDepth, targetLength, unary) {
    let x;
    const targetLength$0027 = targetLength | 0;
    const depthToSpaces = fold((s, v) => (s + "   "), "", toList_1(rangeDouble(0, 1, treeDepth)));
    let sizeString;
    switch (targetLength$0027) {
        case -2: {
            sizeString = ((unary.ResultWidth !== 1) ? (int32ToString(unary.ResultWidth) + " -> ERROR! (Exp: 1, condition must be a single bit!)") : int32ToString(unary.ResultWidth));
            break;
        }
        case -1: {
            sizeString = int32ToString(unary.ResultWidth);
            break;
        }
        default:
            if ((x = (targetLength$0027 | 0), x === unary.ResultWidth)) {
                const x_1 = targetLength$0027 | 0;
                sizeString = int32ToString(unary.ResultWidth);
            }
            else {
                sizeString = (((int32ToString(unary.ResultWidth) + " -> ERROR! (Exp: ") + int32ToString(targetLength$0027)) + ")");
            }
    }
    let propagatedLength;
    const matchValue = unary.Name;
    propagatedLength = ((matchValue === "{...}") ? -1 : ((matchValue === "[condition]") ? targetLength : ((matchValue === "[reduction]") ? -1 : ((matchValue === "[logical_op]") ? -1 : unary.ResultWidth))));
    let elem;
    const matchValue_1 = unary.Name;
    let matchResult;
    switch (matchValue_1) {
        case "[bitwise_op]":
        case "[logical_op]": {
            matchResult = 0;
            break;
        }
        case "[conditional]": {
            matchResult = 1;
            break;
        }
        case "(...)": {
            matchResult = 3;
            break;
        }
        case "[shift]": {
            matchResult = 4;
            break;
        }
        case "{...}": {
            matchResult = 5;
            break;
        }
        case "[reduction]": {
            if (equals(unary.Elements, empty())) {
                matchResult = 2;
            }
            else {
                matchResult = 3;
            }
            break;
        }
        default:
            matchResult = 6;
    }
    switch (matchResult) {
        case 0: {
            const s1 = unaryTreeToString(treeDepth + 2, propagatedLength, value_4(unary.Head));
            const s2 = unaryTreeToString(treeDepth + 2, propagatedLength, value_4(unary.Tail));
            elem = (s1 + s2);
            break;
        }
        case 1: {
            const cond = unaryTreeToString(treeDepth + 2, -2, item_2(0, unary.Elements));
            const s1_1 = unaryTreeToString(treeDepth + 2, propagatedLength, value_4(unary.Head));
            const s2_1 = unaryTreeToString(treeDepth + 2, propagatedLength, value_4(unary.Tail));
            elem = ((cond + s1_1) + s2_1);
            break;
        }
        case 2: {
            elem = "";
            break;
        }
        case 3: {
            elem = unaryTreeToString(treeDepth + 2, propagatedLength, item_2(0, unary.Elements));
            break;
        }
        case 4: {
            elem = "";
            break;
        }
        case 5: {
            elem = fold((s_1, v_1) => (s_1 + unaryTreeToString(treeDepth + 2, propagatedLength, item_2(v_1, unary.Elements))), "", toList_1(rangeDouble(0, 1, length_1(unary.Elements) - 1)));
            break;
        }
        default:
            elem = "";
    }
    if (elem === "") {
        return ((((depthToSpaces + "-\'") + unary.Name) + "\' with Width: ") + sizeString) + "\n";
    }
    else {
        return ((((((((depthToSpaces + "-\'") + unary.Name) + "\' with Width: ") + sizeString) + "\n") + depthToSpaces) + "   ") + "Elements: \n") + elem;
    }
}

/**
 * Checks one-by-one all wire and output port assignments for:
 * 1) LHS Name and Width
 * 2) RHS Names
 * 3) RHS Width of inputs/wires
 * 4) Width LHS = Width RHS
 */
export function checkWiresAndAssignments(ast, portMap, portSizeMap, portWidthDeclarationMap, inputNameList, linesLocations, wireNameList, wireSizeMap, wireLocationMap, errorList) {
    const declarations_1 = foldAST(getDeclarations, empty(), new ASTNode(24, [ast]));
    const logicNameList = map_2((id) => id.Name, collect((decl) => ofArray(decl.Variables), declarations_1));
    const wireNameList$0027 = append(wireNameList, logicNameList);
    const portAndWireNames = append(wireNameList$0027, map_2((tuple) => tuple[0], toList(portMap)));
    const outputNameList = map_2((tuple_1) => tuple_1[0], toList(portMap));
    const getCurrentInputWireList = (location) => append(outputNameList, append(inputNameList, filter_1((x) => {
        const matchValue = tryFind_1(x, wireLocationMap);
        if (matchValue == null) {
            return false;
        }
        else {
            const wireLoc = matchValue | 0;
            return location > wireLoc;
        }
    }, wireNameList$0027)));
    const checkWireNameAndWidth = (wire, notUniqueNames, localErrors) => {
        const lhs = wire.LHS;
        const matchValue_1 = tryFind_1(lhs.Primary.Name, portMap);
        if (matchValue_1 != null) {
            const portType = matchValue_1;
            const message = toText(printf("Variable \'%s\' is already used by a port"))(lhs.Primary.Name);
            const extraMessages = [new ExtraErrorInfo(toText(printf("Variable \'%s\' is declared as an %s port\nPlease use a different name for this wire"))(lhs.Primary.Name)(portType), false, new ReplaceType(3, []))];
            return createErrorMessage(linesLocations, lhs.Primary.Location, message, extraMessages, lhs.Primary.Name);
        }
        else {
            const matchValue_2 = tryFind((x_1) => (x_1 === lhs.Primary.Name), notUniqueNames);
            if (matchValue_2 != null) {
                const found = matchValue_2;
                const message_1 = toText(printf("Identifier \'%s\' is already used by another variable"))(lhs.Primary.Name);
                const extraMessages_1 = [new ExtraErrorInfo(toText(printf("Identifier \'%s\' is already used by another variable\nPlease use a different name for this wire"))(lhs.Primary.Name), false, new ReplaceType(3, []))];
                return createErrorMessage(linesLocations, lhs.Primary.Location, message_1, extraMessages_1, lhs.Primary.Name);
            }
            else if (lhs.BitsStart == null) {
                return localErrors;
            }
            else {
                const bStart = parse(value_4(lhs.BitsStart), 511, false, 32) | 0;
                const bEnd = parse(value_4(lhs.BitsEnd), 511, false, 32) | 0;
                if ((bEnd !== 0) ? true : (bStart <= bEnd)) {
                    const message_2 = "Wrong width declaration";
                    const extraMessages_2 = [new ExtraErrorInfo(toText(printf("A port\'s width can\'t be \'[%i:%i]\'\nCorrect form: [X:0]"))(bStart)(bEnd), false, new ReplaceType(3, []))];
                    return createErrorMessage(linesLocations, lhs.Primary.Location, message_2, extraMessages_2, lhs.Primary.Name);
                }
                else {
                    return localErrors;
                }
            }
        }
    };
    const checkLogicName = (decl_1, notUniqueNames_1, localErrors_1) => {
        const variables = decl_1.Variables;
        return fold_1((errorList_1, lhs_1) => {
            const matchValue_4 = tryFind_1(lhs_1.Name, portMap);
            if (matchValue_4 != null) {
                const portType_1 = matchValue_4;
                const message_3 = toText(printf("Variable \'%s\' is already used by a port or variable"))(lhs_1.Name);
                const extraMessages_3 = [new ExtraErrorInfo(toText(printf("Variable \'%s\' is declared as an %s port\nPlease use a different name for this variable"))(lhs_1.Name)(portType_1), false, new ReplaceType(3, []))];
                return append(errorList_1, createErrorMessage(linesLocations, lhs_1.Location, message_3, extraMessages_3, lhs_1.Name));
            }
            else {
                const matchValue_5 = tryFind((x_2) => (x_2 === lhs_1.Name), notUniqueNames_1);
                if (matchValue_5 != null) {
                    const found_1 = matchValue_5;
                    const message_4 = toText(printf("Variable \'%s\' is already used by another wire"))(lhs_1.Name);
                    const extraMessages_4 = [new ExtraErrorInfo(toText(printf("Variable \'%s\' is already used by another wire\nPlease use a different name for this wire"))(lhs_1.Name), false, new ReplaceType(3, []))];
                    return createErrorMessage(linesLocations, lhs_1.Location, message_4, extraMessages_4, lhs_1.Name);
                }
                else if (decl_1.Range == null) {
                    return localErrors_1;
                }
                else {
                    const bStart_1 = parse(value_4(decl_1.Range).Start, 511, false, 32) | 0;
                    const bEnd_1 = parse(value_4(decl_1.Range).End, 511, false, 32) | 0;
                    if ((bEnd_1 !== 0) ? true : (bStart_1 <= bEnd_1)) {
                        const message_5 = "Wrong width declaration";
                        const extraMessages_5 = [new ExtraErrorInfo(toText(printf("A port\'s width can\'t be \'[%i:%i]\'\nCorrect form: [X:0]"))(bStart_1)(bEnd_1), false, new ReplaceType(3, []))];
                        return createErrorMessage(linesLocations, lhs_1.Location, message_5, extraMessages_5, lhs_1.Name);
                    }
                    else {
                        return localErrors_1;
                    }
                }
            }
        }, localErrors_1, variables);
    };
    const checkAssignmentNameAndWidth = (assignment, localErrors_2) => {
        let arg_17, arg_20, arg_21, found_2;
        const lhs_2 = assignment.LHS;
        const matchValue_7 = tryFind_1(lhs_2.Primary.Name, portMap);
        let matchResult, found_3;
        if (matchValue_7 != null) {
            if ((found_2 = matchValue_7, found_2 === "output")) {
                matchResult = 0;
                found_3 = matchValue_7;
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
                const matchValue_8 = tryFind_1(lhs_2.Primary.Name, portWidthDeclarationMap);
                if (matchValue_8 == null) {
                    return toFail(printf("Can\'t happen! PortMap and PortSizeMap should have the same keys"));
                }
                else {
                    const bStart_2 = matchValue_8[0] | 0;
                    const bEnd_2 = matchValue_8[1] | 0;
                    const matchValue_9 = lhs_2.BitsStart == null;
                    if (matchValue_9) {
                        return localErrors_2;
                    }
                    else if ((bStart_2 >= parse(value_4(lhs_2.BitsStart), 511, false, 32)) && (bEnd_2 <= parse(value_4(lhs_2.BitsEnd), 511, false, 32))) {
                        return localErrors_2;
                    }
                    else {
                        const name = lhs_2.Primary.Name;
                        const definition = (bStart_2 === bEnd_2) ? " a single bit " : toText(printf(" %s[%i:0] "))(name)(bStart_2);
                        const patternInput = equals(lhs_2.BitsStart, lhs_2.BitsEnd) ? [(arg_17 = value_4(lhs_2.BitsStart), toText(printf(" %s[%s] "))(name)(arg_17)), toText(printf("Out of bounds index for variable \'%s\'"))(name)] : [(arg_20 = value_4(lhs_2.BitsStart), (arg_21 = value_4(lhs_2.BitsEnd), toText(printf(" %s[%s:%s] "))(name)(arg_20)(arg_21))), toText(printf("Out of bounds range for variable \'%s\'"))(name)];
                        const usedWidth = patternInput[0];
                        const message_6 = patternInput[1];
                        const extraMessages_6 = [new ExtraErrorInfo((((toText(printf("Variable: \'%s\' is defined as"))(name) + definition) + "\nTherefore,") + usedWidth) + "is invalid", false, new ReplaceType(3, [])), new ExtraErrorInfo(toText(printf("assign %s = 0;"))(name), true, new ReplaceType(1, []))];
                        return append(localErrors_2, createErrorMessage(linesLocations, lhs_2.Primary.Location, message_6, extraMessages_6, lhs_2.Primary.Name));
                    }
                }
            }
            default: {
                const wiresDeclared = getCurrentInputWireList(lhs_2.Primary.Location);
                if (tryFind((wire_1) => (wire_1 === lhs_2.Primary.Name), wiresDeclared) != null) {
                    return errorList;
                }
                else {
                    const message_7 = toText(printf("Variable \'%s\' is not declared as an output port"))(lhs_2.Primary.Name);
                    const extraMessagesMain = [new ExtraErrorInfo(toText(printf("Variable \'%s\' is not declared as an output port"))(lhs_2.Primary.Name), false, new ReplaceType(3, []))];
                    const possibleAddition = (ast.Module.Type === "module_new") ? [] : [new ExtraErrorInfo(toText(printf("output bit %s;"))(lhs_2.Primary.Name), true, new ReplaceType(0, []))];
                    const extraMessages_7 = append_1(extraMessagesMain, possibleAddition);
                    return append(localErrors_2, createErrorMessage(linesLocations, lhs_2.Primary.Location, message_7, extraMessages_7, lhs_2.Primary.Name));
                }
            }
        }
    };
    const checkNamesInPrimaries = (primariesRHS, currentInputWireList, localErrors_3) => {
        const namesWithLocRHS = map_2((x_3) => [x_3.Primary.Name, x_3.Primary.Location], primariesRHS);
        const namesRHS = map_2((tuple_2) => tuple_2[0], namesWithLocRHS);
        const namesToLocMap = ofList(namesWithLocRHS, {
            Compare: comparePrimitives,
        });
        const diff = List_except(append(currentInputWireList, singleton("delete123")), namesRHS, {
            Equals: (x_5, y_1) => (x_5 === y_1),
            GetHashCode: stringHash,
        });
        if (isEmpty_1(diff)) {
            return localErrors_3;
        }
        else {
            return collect((name_1) => {
                let arg_37;
                const currLocation = find(name_1, namesToLocMap) | 0;
                if (exists_1((x_6) => (x_6 === name_1), wireNameList$0027)) {
                    const message_8 = toText(printf("Variable \'%s\' is defined after this assignment"))(name_1);
                    const extraMessages_8 = [new ExtraErrorInfo(toText(printf("Variable \'%s\' is defined after this assignment"))(name_1), false, new ReplaceType(3, [])), new ExtraErrorInfo(toText(printf("Move the definition of variable \'%s\' above this line"))(name_1), false, new ReplaceType(3, []))];
                    return createErrorMessage(linesLocations, currLocation, message_8, extraMessages_8, name_1);
                }
                else {
                    const closeVariables = findCloseVariable(name_1.split(""), portAndWireNames);
                    if (isEmpty_1(closeVariables)) {
                        const message_9 = toText(printf("Variable \'%s\' is not declared as input or variable"))(name_1);
                        const extraMessagesMain_1 = [new ExtraErrorInfo(toText(printf("Variable \'%s\' is not declared as input or variable"))(name_1), false, new ReplaceType(3, []))];
                        const possibleAddition_1 = (ast.Module.Type === "module_new") ? [] : [new ExtraErrorInfo(toText(printf("input bit %s;|bit %s = 1\'b0;"))(name_1)(name_1), true, new ReplaceType(0, []))];
                        const extraMessages_9 = append_1(extraMessagesMain_1, possibleAddition_1);
                        return createErrorMessage(linesLocations, currLocation, message_9, extraMessages_9, name_1);
                    }
                    else {
                        const message_10 = toText(printf("Variable \'%s\' is not declared as input or variable"))(name_1);
                        const extraMessages_10 = [new ExtraErrorInfo(toText(printf("Variable \'%s\' is not declared as input or variable"))(name_1), false, new ReplaceType(3, [])), new ExtraErrorInfo((arg_37 = item_2(0, closeVariables), toText(printf("%s"))(arg_37)), true, new ReplaceType(2, [name_1]))];
                        return createErrorMessage(linesLocations, currLocation, message_10, extraMessages_10, name_1);
                    }
                }
            }, diff);
        }
    };
    const checkNamesOnRHSOfAssignment = (expression, currentInputWireList_1, localErrors_4) => {
        const primariesRHS_1 = primariesUsedInAssignment(empty(), expression);
        return checkNamesInPrimaries(primariesRHS_1, currentInputWireList_1, localErrors_4);
    };
    const checkSizesOnRHSOfAssignment = (assignment_1, currentInputWireSizeMap, localErrors_5) => checkExpr(linesLocations, currentInputWireSizeMap, localErrors_5, assignment_1.RHS);
    const getCurrentInputWireSizeMap = (location_1) => {
        let list_12;
        return ofList((list_12 = toList(filter((wire_2, _arg) => {
            const matchValue_18 = tryFind_1(wire_2, wireLocationMap);
            if (matchValue_18 == null) {
                return false;
            }
            else {
                const wireLoc_1 = matchValue_18 | 0;
                return location_1 > wireLoc_1;
            }
        }, wireSizeMap)), append(toList(portSizeMap), list_12)), {
            Compare: comparePrimitives,
        });
    };
    const declarationsNames = map_2((var$) => var$.Name, collect((decl_2) => ofArray(decl_2.Variables), foldAST(getDeclarations, empty(), new ASTNode(24, [ast]))));
    const notUniqeWireNames = map_2((tuple_3) => tuple_3[0], filter_1((tupledArg) => {
        const name_2 = tupledArg[0];
        const count = tupledArg[1] | 0;
        return count > 1;
    }, List_countBy((x_8) => x_8, append(wireNameList, declarationsNames), {
        Equals: (x_9, y_3) => (x_9 === y_3),
        GetHashCode: stringHash,
    })));
    const assignmentsWithLocation = foldAST(getAssignmentsWithLocations, empty(), new ASTNode(24, [ast]));
    const moduleInstantiationPrimaries = map_2((conn) => conn.Primary, collect((modInst) => ofArray(modInst.Connections), foldAST(getModuleInstantiationStatements, empty(), new ASTNode(24, [ast]))));
    const moduleInstantiationErrors = collect((primary) => {
        const currentInputWireList_2 = getCurrentInputWireList(primary.Primary.Location);
        const currentInputWireSizeMap_1 = getCurrentInputWireSizeMap(primary.Primary.Location);
        const list_21 = checkNamesInPrimaries(singleton(primary), currentInputWireList_2, empty());
        return append(checkPrimariesWidths(linesLocations, currentInputWireSizeMap_1, empty(), singleton(primary)), list_21);
    }, moduleInstantiationPrimaries);
    const localErrors_6 = append(moduleInstantiationErrors, collect((tupledArg_1) => {
        let errlst, matchValue_20, expr;
        const assignment_2 = tupledArg_1[0];
        const location_2 = tupledArg_1[1] | 0;
        const currentInputWireList_3 = getCurrentInputWireList(location_2);
        const currentInputWireSizeMap_2 = getCurrentInputWireSizeMap(location_2);
        const errlst_1 = checkSizesOnRHSOfAssignment(assignment_2, currentInputWireSizeMap_2, (errlst = checkNamesOnRHSOfAssignment(assignment_2.RHS, currentInputWireList_3, (assignment_2.Type === "bit") ? checkWireNameAndWidth(assignment_2, notUniqeWireNames, empty()) : checkAssignmentNameAndWidth(assignment_2, empty())), (matchValue_20 = assignment_2.LHS.VariableBitSelect, (matchValue_20 != null) ? ((expr = matchValue_20, checkNamesOnRHSOfAssignment(expr, currentInputWireList_3, errlst))) : errlst)));
        const matchValue_21 = assignment_2.LHS.VariableBitSelect;
        if (matchValue_21 != null) {
            const expr_1 = matchValue_21;
            return checkExpr(linesLocations, currentInputWireSizeMap_2, errlst_1, expr_1);
        }
        else {
            return errlst_1;
        }
    }, assignmentsWithLocation));
    const expressions_1 = foldAST(getCondAndCaseExpressions, empty(), new ASTNode(24, [ast]));
    const exprErrors = collect((tupledArg_2) => {
        const expr_2 = tupledArg_2[0];
        const location_3 = tupledArg_2[1] | 0;
        return checkNamesOnRHSOfAssignment(expr_2, getCurrentInputWireList(location_3), empty());
    }, expressions_1);
    const declarations_4 = foldAST(getDeclarations, empty(), new ASTNode(24, [ast]));
    const localErrorsDecl = collect((decl_3) => checkLogicName(decl_3, notUniqeWireNames, empty()), declarations_4);
    return append(errorList, append(localErrors_6, append(localErrorsDecl, exprErrors)));
}

export function checkUnsupportedKeywords(ast, linesLocations, errorList) {
    const localErrors = collect((tupledArg) => {
        const tp = tupledArg[0];
        const keyW = tupledArg[1];
        const loc = tupledArg[2] | 0;
        const message = (tp === "NO-COMB") ? "Non-Combinational logic is not supported" : ((tp === "NO-CASE") ? "Case statement is not supported" : ((tp === "WIRE-DECL") ? "Assign directly a value to the wire \n \'wire {name} = {value};\'" : "Non-Combinational logic is not supported"));
        const extraMessages = [new ExtraErrorInfo(message, false, new ReplaceType(3, []))];
        return createErrorMessage(linesLocations, loc, message, extraMessages, keyW);
    }, map_2((item_1) => [item_1.Type, item_1.ItemType, item_1.Location], filter_1((item) => {
        if ((item.Type === "NO-COMB") ? true : (item.Type === "NO-CASE")) {
            return true;
        }
        else {
            return item.Type === "WIRE-DECL";
        }
    }, ofArray(ast.Module.ModuleItems.ItemList))));
    return append(errorList, localErrors);
}

/**
 * Checks if the RHS expression is wider than the LHS of an assignment.
 * Checks every assignment: continuous and combinational
 */
export function checkAssignmentWidths(ast, linesLocations, portSizeMap, wireSizeMap, errorList) {
    const wireAndPortSizeMap = fold_2((acc, key, value) => add(key, value, acc), wireSizeMap, portSizeMap);
    const assignments_1 = foldAST(getAssignmentsWithLocations, empty(), new ASTNode(24, [ast]));
    const localErrors = collect((tupledArg) => {
        const assign = tupledArg[0];
        const loc = tupledArg[1] | 0;
        const rhsW = getWidthOfExpr(assign.RHS, wireAndPortSizeMap) | 0;
        const lhsW = getLHSWidth(assign, wireAndPortSizeMap) | 0;
        if (rhsW > lhsW) {
            const message = toText(printf("The RHS expression (%A bits wide) doesn\'t fit in the variable on the LHS (%A bits wide)"))(rhsW)(lhsW);
            const extraMessages = [new ExtraErrorInfo(message, false, new ReplaceType(3, []))];
            return createErrorMessage(linesLocations, loc, message, extraMessages, assign.Type);
        }
        else {
            return empty();
        }
    }, assignments_1);
    return append(errorList, localErrors);
}

export function checkInputsAssigned(ast, linesLocations, portMap, errorInfoList) {
    const assignments_1 = foldAST(getAssignments$0027, empty(), new ASTNode(24, [ast]));
    return append(errorInfoList, collect((assign) => {
        const matchValue = tryFind_1(assign.LHS.Primary.Name, portMap);
        let matchResult;
        if (matchValue != null) {
            if (matchValue === "input") {
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
            case 0: {
                const message = toText(printf("Cannot assign to input port \'%s\'"))(assign.LHS.Primary.Name);
                const extraMessages = [new ExtraErrorInfo(message, false, new ReplaceType(3, []))];
                return createErrorMessage(linesLocations, assign.LHS.Primary.Location, message, extraMessages, assign.LHS.Primary.Name);
            }
            default:
                return empty();
        }
    }, assignments_1));
}

export function getNotUniquePortDeclarations(items) {
    return map_2((tuple) => tuple[0], filter_1((tupledArg) => {
        const name = tupledArg[0];
        const size = tupledArg[1] | 0;
        return size > 1;
    }, List_countBy((x_2) => x_2, collect((x) => {
        const matchValue = x.IODecl == null;
        if (matchValue) {
            return empty();
        }
        else {
            const matchValue_1 = x.IODecl;
            if (matchValue_1 == null) {
                return empty();
            }
            else {
                const decl = matchValue_1;
                return collect((x_1) => singleton(x_1.Name), ofArray(decl.Variables));
            }
        }
    }, items), {
        Equals: (x_3, y) => (x_3 === y),
        GetHashCode: stringHash,
    })));
}

/**
 * Returns the port-size map (e.g. (port "a" => 4 bits wide))
 */
export function getPortSizeAndLocationMap(items) {
    const portSizeLocation = collect((x) => {
        const matchValue = x.IODecl == null;
        if (matchValue) {
            return empty();
        }
        else {
            const matchValue_1 = x.IODecl;
            if (matchValue_1 == null) {
                return empty();
            }
            else {
                const d = matchValue_1;
                const size = ((d.Range == null) ? 1 : ((parse(value_4(d.Range).Start, 511, false, 32) - parse(value_4(d.Range).End, 511, false, 32)) + 1)) | 0;
                const location = x.Location | 0;
                return collect((identifier) => singleton([identifier.Name, size, identifier.Location]), ofArray(d.Variables));
            }
        }
    }, items);
    const ps = map_2((x_1) => {
        const s = x_1[1] | 0;
        const p = x_1[0];
        const l = x_1[2] | 0;
        return [p, s];
    }, portSizeLocation);
    const pl = map_2((x_2) => {
        const s_1 = x_2[1] | 0;
        const p_1 = x_2[0];
        const l_1 = x_2[2] | 0;
        return [p_1, l_1];
    }, portSizeLocation);
    return [ofList(ps, {
        Compare: comparePrimitives,
    }), ofList(pl, {
        Compare: comparePrimitives,
    })];
}

/**
 * Returns the port-width declaration map (e.g. (  port "a" => (4,0)  ))
 */
export function getPortWidthDeclarationMap(items) {
    return ofList(collect((x) => {
        const matchValue = x.IODecl == null;
        if (matchValue) {
            return empty();
        }
        else {
            const matchValue_1 = x.IODecl;
            if (matchValue_1 == null) {
                return empty();
            }
            else {
                const d = matchValue_1;
                const size = (d.Range == null) ? [0, 0] : [parse(value_4(d.Range).Start, 511, false, 32), parse(value_4(d.Range).End, 511, false, 32)];
                return collect((x_1) => singleton([x_1.Name, size]), ofArray(d.Variables));
            }
        }
    }, items), {
        Compare: comparePrimitives,
    });
}

/**
 * Returns the port-type map (e.g. (port "a" => INPUT))
 */
export function getPortMap(items) {
    return ofList(collect((x) => {
        const matchValue = x.IODecl == null;
        if (matchValue) {
            return empty();
        }
        else {
            const matchValue_1 = x.IODecl;
            if (matchValue_1 == null) {
                return empty();
            }
            else {
                const d = matchValue_1;
                return collect((x_1) => singleton([x_1.Name, d.DeclarationType]), ofArray(d.Variables));
            }
        }
    }, items), {
        Compare: comparePrimitives,
    });
}

export function getInputSizeMap(inputNameList, portSizeMap) {
    return filter((n, s) => exists_1((x) => equals(x, n), inputNameList), portSizeMap);
}

/**
 * Returns the names of the ports declared as INPUT
 */
export function getInputNames(portMap) {
    return map_2((tuple) => tuple[0], toList(filter((n, s) => (s === "input"), portMap)));
}

/**
 * Returns the names of the declared WIRES
 */
export function getWireSizeMap(items) {
    return ofList(collect((x) => {
        let statement;
        const matchValue = x.Statement == null;
        if (matchValue) {
            return empty();
        }
        else {
            const matchValue_1 = x.Statement;
            let matchResult, statement_1;
            if (matchValue_1 != null) {
                if ((statement = matchValue_1, statement.StatementType === "wire")) {
                    matchResult = 0;
                    statement_1 = matchValue_1;
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
                    const lhs = statement_1.Assignment.LHS;
                    if (lhs.BitsStart == null) {
                        return singleton([lhs.Primary.Name, 1]);
                    }
                    else {
                        const size = ((parse(value_4(lhs.BitsStart), 511, false, 32) - parse(value_4(lhs.BitsEnd), 511, false, 32)) + 1) | 0;
                        return singleton([lhs.Primary.Name, size]);
                    }
                }
                default:
                    return empty();
            }
        }
    }, items), {
        Compare: comparePrimitives,
    });
}

export function getWireNames(items) {
    return collect((x) => {
        let statement;
        const matchValue = x.Statement == null;
        if (matchValue) {
            return empty();
        }
        else {
            const matchValue_1 = x.Statement;
            let matchResult, statement_1;
            if (matchValue_1 != null) {
                if ((statement = matchValue_1, statement.StatementType === "wire")) {
                    matchResult = 0;
                    statement_1 = matchValue_1;
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
                    const lhs = statement_1.Assignment.LHS;
                    return singleton(lhs.Primary.Name);
                }
                default:
                    return empty();
            }
        }
    }, items);
}

export function getWireLocationMap(items) {
    return ofList(collect((x) => {
        let statement;
        const matchValue = x.Statement == null;
        if (matchValue) {
            return empty();
        }
        else {
            const matchValue_1 = x.Statement;
            let matchResult, statement_1;
            if (matchValue_1 != null) {
                if ((statement = matchValue_1, statement.StatementType === "wire")) {
                    matchResult = 0;
                    statement_1 = matchValue_1;
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
                    const lhs = statement_1.Assignment.LHS;
                    const loc = x.Location | 0;
                    return singleton([lhs.Primary.Name, loc]);
                }
                default:
                    return empty();
            }
        }
    }, items), {
        Compare: comparePrimitives,
    });
}

/**
 * Main error-finder function
 * Returns a list of errors (type ErrorInfo)
 */
export function getSemanticErrors(ast, linesLocations, origin, project) {
    const items = ofArray(ast.Module.ModuleItems.ItemList);
    const portMap = getPortMap(items);
    const patternInput = getPortSizeAndLocationMap(items);
    const portSizeMap = patternInput[0];
    const portLocationMap = patternInput[1];
    const portWidthDeclarationMap = getPortWidthDeclarationMap(items);
    const notUniquePortDeclarations = getNotUniquePortDeclarations(items);
    const inputNameList = getInputNames(portMap);
    const wireSizeMap = getWireSizeMap(items);
    const declarations_1 = foldAST(getDeclarations, empty(), new ASTNode(24, [ast]));
    const wireSizeMap_1 = fold((map, decl) => fold_1((map$0027, variable) => {
        if (decl.Range == null) {
            return add(variable.Name, 1, map$0027);
        }
        else {
            return add(variable.Name, (parse(value_4(decl.Range).Start, 511, false, 32) - parse(value_4(decl.Range).End, 511, false, 32)) + 1, map$0027);
        }
    }, map, decl.Variables), wireSizeMap, declarations_1);
    const wireNameList = getWireNames(items);
    const wireLocationMap = getWireLocationMap(items);
    const wireLocationMap_1 = fold((wireLocMap, decl_1) => fold_1((map_1, var$) => add(var$.Name, var$.Location, map_1), wireLocMap, decl_1.Variables), wireLocationMap, declarations_1);
    const errors = List_distinct(checkInputsAssigned(ast, linesLocations, portMap, checkModuleInstantiations(ast, linesLocations, portSizeMap, wireSizeMap_1, project, portMap, checkAssignmentWidths(ast, linesLocations, portSizeMap, wireSizeMap_1, checkAlwaysCombRHS(ast, linesLocations, portSizeMap, wireSizeMap_1, checkVariablesUsed(ast, linesLocations, portSizeMap, wireSizeMap_1, cycleCheck(ast, linesLocations, portSizeMap, wireSizeMap_1, checkClkNames(ast, linesLocations, portMap, portLocationMap, portSizeMap, checkClk(ast, linesLocations, portMap, checkExpressions(ast, linesLocations, wireSizeMap_1, checkCasesStatements(ast, linesLocations, portSizeMap, wireSizeMap_1, checkVariablesAlwaysAssigned(ast, linesLocations, portSizeMap, wireSizeMap_1, checkVariablesDrivenSimultaneously(ast, linesLocations, checkProceduralAssignments(ast, linesLocations, checkUnsupportedKeywords(ast, linesLocations, checkAllOutputsAssigned(ast, portMap, portSizeMap, linesLocations, checkWiresAndAssignments(ast, portMap, portSizeMap, portWidthDeclarationMap, inputNameList, linesLocations, wireNameList, wireSizeMap_1, wireLocationMap_1, checkIOWidthDeclarations(ast, linesLocations, checkIODeclarations(ast, portWidthDeclarationMap, portLocationMap, linesLocations, notUniquePortDeclarations, portMap, project, portCheck(ast, linesLocations, nameCheck(ast, linesLocations, origin, project, empty())))))))))))))))))))), {
        Equals: equals,
        GetHashCode: safeHash,
    });
    return errors;
}

//# sourceMappingURL=ErrorCheck.fs.js.map
