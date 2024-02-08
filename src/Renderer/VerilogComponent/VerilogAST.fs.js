import { Record, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { ModuleInstantiationT_$reflection, VerilogInput_$reflection, ModuleT_$reflection, ModuleItemsT_$reflection, ItemT_$reflection, NumberT_$reflection, RangeT_$reflection, ParameterT_$reflection, PrimaryT_$reflection, ExpressionT_$reflection, AssignmentLHST_$reflection, AssignmentT_$reflection, IfStatementT_$reflection, CaseItemT_$reflection, StatementT_$reflection, DeclarationT_$reflection, ConditionalT_$reflection, CaseStatementT_$reflection, SeqBlockT_$reflection, BlockingAssignT_$reflection, NonBlockingAssignT_$reflection, AlwaysConstructT_$reflection, ContinuousAssignT_$reflection, ParameterItemT_$reflection, IOItemT_$reflection } from "./VerilogTypes.fs.js";
import { record_type, union_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { toConsole, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { map, fold } from "../fable_modules/fable-library.4.1.4/Array.js";
import { ofArray, filter, map as map_1, append, singleton, fold as fold_1 } from "../fable_modules/fable-library.4.1.4/List.js";
import { value } from "../fable_modules/fable-library.4.1.4/Option.js";

export class ItemDU extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["IOItem", "ParamDecl", "ContinuousAssign", "AlwaysConstruct"];
    }
}

export function ItemDU_$reflection() {
    return union_type("VerilogAST.ItemDU", [], ItemDU, () => [[["Item", IOItemT_$reflection()]], [["Item", ParameterItemT_$reflection()]], [["Item", ContinuousAssignT_$reflection()]], [["Item", AlwaysConstructT_$reflection()]]]);
}

export class StatementDU extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NonBlockingAssign", "BlockingAssign", "SeqBlock", "Case", "Conditional"];
    }
}

export function StatementDU_$reflection() {
    return union_type("VerilogAST.StatementDU", [], StatementDU, () => [[["Item", NonBlockingAssignT_$reflection()]], [["Item", BlockingAssignT_$reflection()]], [["Item", SeqBlockT_$reflection()]], [["Item", CaseStatementT_$reflection()]], [["Item", ConditionalT_$reflection()]]]);
}

export class ASTNode extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["IOItem", "ParamDecl", "ContinuousAssign", "Declaration", "AlwaysConstruct", "Statement", "NonBlockingAssign", "BlockingAssign", "SeqBlock", "Case", "CaseItem", "Conditional", "IfStatement", "Assignment", "AssignmentLHS", "Expression", "Primary", "ParameterItem", "Parameter", "Range", "Number", "Item", "ModuleItems", "Module", "VerilogInput", "ModuleInstantiation"];
    }
}

export function ASTNode_$reflection() {
    return union_type("VerilogAST.ASTNode", [], ASTNode, () => [[["Item", IOItemT_$reflection()]], [["Item", ParameterItemT_$reflection()]], [["Item", ContinuousAssignT_$reflection()]], [["Item", DeclarationT_$reflection()]], [["Item", AlwaysConstructT_$reflection()]], [["Item", StatementT_$reflection()]], [["Item", NonBlockingAssignT_$reflection()]], [["Item", BlockingAssignT_$reflection()]], [["Item", SeqBlockT_$reflection()]], [["Item", CaseStatementT_$reflection()]], [["Item", CaseItemT_$reflection()]], [["Item", ConditionalT_$reflection()]], [["Item", IfStatementT_$reflection()]], [["Item", AssignmentT_$reflection()]], [["Item", AssignmentLHST_$reflection()]], [["Item", ExpressionT_$reflection()]], [["Item", PrimaryT_$reflection()]], [["Item", ParameterItemT_$reflection()]], [["Item", ParameterT_$reflection()]], [["Item", RangeT_$reflection()]], [["Item", NumberT_$reflection()]], [["Item", ItemT_$reflection()]], [["Item", ModuleItemsT_$reflection()]], [["Item", ModuleT_$reflection()]], [["Item", VerilogInput_$reflection()]], [["Item", ModuleInstantiationT_$reflection()]]]);
}

export class Module extends Record {
    constructor(AST) {
        super();
        this.AST = AST;
    }
}

export function Module_$reflection() {
    return record_type("VerilogAST.Module", [], Module, () => [["AST", ASTNode_$reflection()]]);
}

/**
 * converts StatementT into StatementDU
 */
export function getAlwaysStatement(s) {
    const matchValue = s.BlockingAssign;
    const matchValue_1 = s.NonBlockingAssign;
    const matchValue_2 = s.CaseStatement;
    const matchValue_3 = s.Conditional;
    const matchValue_4 = s.SeqBlock;
    let matchResult, blocking, nonblocking, case$, cond, seqBlock;
    if (matchValue == null) {
        if (matchValue_1 == null) {
            if (matchValue_2 == null) {
                if (matchValue_3 == null) {
                    if (matchValue_4 != null) {
                        matchResult = 4;
                        seqBlock = matchValue_4;
                    }
                    else {
                        matchResult = 5;
                    }
                }
                else if (matchValue_4 == null) {
                    matchResult = 3;
                    cond = matchValue_3;
                }
                else {
                    matchResult = 5;
                }
            }
            else if (matchValue_3 == null) {
                if (matchValue_4 == null) {
                    matchResult = 2;
                    case$ = matchValue_2;
                }
                else {
                    matchResult = 5;
                }
            }
            else {
                matchResult = 5;
            }
        }
        else if (matchValue_2 == null) {
            if (matchValue_3 == null) {
                if (matchValue_4 == null) {
                    matchResult = 1;
                    nonblocking = matchValue_1;
                }
                else {
                    matchResult = 5;
                }
            }
            else {
                matchResult = 5;
            }
        }
        else {
            matchResult = 5;
        }
    }
    else if (matchValue_1 == null) {
        if (matchValue_2 == null) {
            if (matchValue_3 == null) {
                if (matchValue_4 == null) {
                    matchResult = 0;
                    blocking = matchValue;
                }
                else {
                    matchResult = 5;
                }
            }
            else {
                matchResult = 5;
            }
        }
        else {
            matchResult = 5;
        }
    }
    else {
        matchResult = 5;
    }
    switch (matchResult) {
        case 0:
            return new StatementDU(1, [blocking]);
        case 1:
            return new StatementDU(0, [nonblocking]);
        case 2:
            return new StatementDU(3, [case$]);
        case 3:
            return new StatementDU(4, [cond]);
        case 4:
            return new StatementDU(2, [seqBlock]);
        default:
            return toFail(printf("Should not happen!"));
    }
}

export function statementToNode(statement) {
    switch (statement.tag) {
        case 0: {
            const nonblocking = statement.fields[0];
            return new ASTNode(6, [nonblocking]);
        }
        case 3: {
            const case$ = statement.fields[0];
            return new ASTNode(9, [case$]);
        }
        case 4: {
            const cond = statement.fields[0];
            return new ASTNode(11, [cond]);
        }
        case 2: {
            const seqBlock = statement.fields[0];
            return new ASTNode(8, [seqBlock]);
        }
        default: {
            const blocking = statement.fields[0];
            return new ASTNode(7, [blocking]);
        }
    }
}

export function getItem(item) {
    const matchValue = item.IODecl;
    const matchValue_1 = item.ParamDecl;
    const matchValue_2 = item.Decl;
    const matchValue_3 = item.Statement;
    const matchValue_4 = item.AlwaysConstruct;
    const matchValue_5 = item.ModuleInstantiation;
    const matchValue_6 = [matchValue, matchValue_1, matchValue_2, matchValue_3, matchValue_4, matchValue_5];
    let matchResult, ioDecl, paramDecl, decl, contAssign, always, moduleInst, anything;
    if (matchValue == null) {
        if (matchValue_1 == null) {
            if (matchValue_2 == null) {
                if (matchValue_3 == null) {
                    if (matchValue_4 == null) {
                        if (matchValue_5 != null) {
                            matchResult = 5;
                            moduleInst = matchValue_5;
                        }
                        else {
                            matchResult = 6;
                            anything = matchValue_6;
                        }
                    }
                    else if (matchValue_5 == null) {
                        matchResult = 4;
                        always = matchValue_4;
                    }
                    else {
                        matchResult = 6;
                        anything = matchValue_6;
                    }
                }
                else if (matchValue_4 == null) {
                    if (matchValue_5 == null) {
                        matchResult = 3;
                        contAssign = matchValue_3;
                    }
                    else {
                        matchResult = 6;
                        anything = matchValue_6;
                    }
                }
                else {
                    matchResult = 6;
                    anything = matchValue_6;
                }
            }
            else if (matchValue_3 == null) {
                if (matchValue_4 == null) {
                    if (matchValue_5 == null) {
                        matchResult = 2;
                        decl = matchValue_2;
                    }
                    else {
                        matchResult = 6;
                        anything = matchValue_6;
                    }
                }
                else {
                    matchResult = 6;
                    anything = matchValue_6;
                }
            }
            else {
                matchResult = 6;
                anything = matchValue_6;
            }
        }
        else if (matchValue_2 == null) {
            if (matchValue_3 == null) {
                if (matchValue_4 == null) {
                    if (matchValue_5 == null) {
                        matchResult = 1;
                        paramDecl = matchValue_1;
                    }
                    else {
                        matchResult = 6;
                        anything = matchValue_6;
                    }
                }
                else {
                    matchResult = 6;
                    anything = matchValue_6;
                }
            }
            else {
                matchResult = 6;
                anything = matchValue_6;
            }
        }
        else {
            matchResult = 6;
            anything = matchValue_6;
        }
    }
    else if (matchValue_1 == null) {
        if (matchValue_2 == null) {
            if (matchValue_3 == null) {
                if (matchValue_4 == null) {
                    if (matchValue_5 == null) {
                        matchResult = 0;
                        ioDecl = matchValue;
                    }
                    else {
                        matchResult = 6;
                        anything = matchValue_6;
                    }
                }
                else {
                    matchResult = 6;
                    anything = matchValue_6;
                }
            }
            else {
                matchResult = 6;
                anything = matchValue_6;
            }
        }
        else {
            matchResult = 6;
            anything = matchValue_6;
        }
    }
    else {
        matchResult = 6;
        anything = matchValue_6;
    }
    switch (matchResult) {
        case 0:
            return new ASTNode(0, [ioDecl]);
        case 1:
            return new ASTNode(1, [paramDecl]);
        case 2:
            return new ASTNode(3, [decl]);
        case 3:
            return new ASTNode(2, [contAssign]);
        case 4:
            return new ASTNode(4, [always]);
        case 5:
            return new ASTNode(25, [moduleInst]);
        default: {
            toConsole(`${anything}`);
            return toFail(printf("Should not happen"));
        }
    }
}

/**
 * Recursively folds over an ASTNode, calling folder at every level. Only explores parts where there are multiple possibilities within a Node
 */
export function foldAST(folder_mut, state_mut, node_mut) {
    foldAST:
    while (true) {
        const folder = folder_mut, state = state_mut, node = node_mut;
        const state$0027 = folder(state, node);
        switch (node.tag) {
            case 24: {
                const input = node.fields[0];
                folder_mut = folder;
                state_mut = state$0027;
                node_mut = (new ASTNode(23, [input.Module]));
                continue foldAST;
            }
            case 23: {
                const m = node.fields[0];
                folder_mut = folder;
                state_mut = state$0027;
                node_mut = (new ASTNode(22, [m.ModuleItems]));
                continue foldAST;
            }
            case 22: {
                const items = node.fields[0];
                return fold((state_1, node_1) => foldAST(folder, state_1, node_1), state$0027, map((item) => (new ASTNode(21, [item])), items.ItemList));
            }
            case 21: {
                const item_1 = node.fields[0];
                folder_mut = folder;
                state_mut = state$0027;
                node_mut = getItem(item_1);
                continue foldAST;
            }
            case 4: {
                const always = node.fields[0];
                folder_mut = folder;
                state_mut = state$0027;
                node_mut = (new ASTNode(5, [always.Statement]));
                continue foldAST;
            }
            case 5: {
                const statement = node.fields[0];
                folder_mut = folder;
                state_mut = state$0027;
                node_mut = statementToNode(getAlwaysStatement(statement));
                continue foldAST;
            }
            case 8: {
                const seqBlock = node.fields[0];
                return fold((state_2, node_3) => foldAST(folder, state_2, node_3), state$0027, map((s_1) => (new ASTNode(5, [s_1])), seqBlock.Statements));
            }
            case 9: {
                const case$ = node.fields[0];
                const newState = foldAST(folder, state$0027, new ASTNode(15, [case$.Expression]));
                const newState$0027 = fold((state_3, node_4) => foldAST(folder, state_3, node_4), newState, map((item_2) => (new ASTNode(10, [item_2])), case$.CaseItems));
                const matchValue = case$.Default;
                if (matchValue != null) {
                    const stmt = matchValue;
                    folder_mut = folder;
                    state_mut = newState$0027;
                    node_mut = (new ASTNode(5, [stmt]));
                    continue foldAST;
                }
                else {
                    return newState$0027;
                }
            }
            case 10: {
                const caseItem = node.fields[0];
                const newstate = fold((state_4, node_5) => foldAST(folder, state_4, node_5), state$0027, map((expr) => (new ASTNode(20, [expr])), caseItem.Expressions));
                folder_mut = folder;
                state_mut = newstate;
                node_mut = (new ASTNode(5, [caseItem.Statement]));
                continue foldAST;
            }
            case 11: {
                const cond = node.fields[0];
                const tmpState = foldAST(folder, state$0027, new ASTNode(12, [cond.IfStatement]));
                const matchValue_1 = cond.ElseStatement;
                if (matchValue_1 != null) {
                    const elseStmt = matchValue_1;
                    return fold_1((state_5, node_7) => foldAST(folder, state_5, node_7), tmpState, singleton(new ASTNode(5, [elseStmt])));
                }
                else {
                    return tmpState;
                }
            }
            case 2: {
                const assign = node.fields[0];
                folder_mut = folder;
                state_mut = state$0027;
                node_mut = (new ASTNode(13, [assign.Assignment]));
                continue foldAST;
            }
            case 13: {
                const assign_1 = node.fields[0];
                folder_mut = folder;
                state_mut = foldAST(folder, state$0027, new ASTNode(14, [assign_1.LHS]));
                node_mut = (new ASTNode(15, [assign_1.RHS]));
                continue foldAST;
            }
            case 6: {
                const nonblocking = node.fields[0];
                folder_mut = folder;
                state_mut = state$0027;
                node_mut = (new ASTNode(13, [nonblocking.Assignment]));
                continue foldAST;
            }
            case 7: {
                const blocking = node.fields[0];
                folder_mut = folder;
                state_mut = state$0027;
                node_mut = (new ASTNode(13, [blocking.Assignment]));
                continue foldAST;
            }
            case 12: {
                const ifstmt = node.fields[0];
                folder_mut = folder;
                state_mut = foldAST(folder, state$0027, new ASTNode(15, [ifstmt.Condition]));
                node_mut = (new ASTNode(5, [ifstmt.Statement]));
                continue foldAST;
            }
            case 14: {
                const lhs = node.fields[0];
                const matchValue_2 = lhs.VariableBitSelect;
                if (matchValue_2 != null) {
                    const expr_1 = matchValue_2;
                    folder_mut = folder;
                    state_mut = state$0027;
                    node_mut = (new ASTNode(15, [expr_1]));
                    continue foldAST;
                }
                else {
                    return state$0027;
                }
            }
            default:
                return state$0027;
        }
        break;
    }
}

/**
 * get rhs expressions from always, continuous assign, case stmt... (all of them)
 */
export function getAllExpressions$0027(expressions, node) {
    if (node.tag === 15) {
        const expr = node.fields[0];
        return append(expressions, singleton(expr));
    }
    else {
        return expressions;
    }
}

export function getNumbers(numbers, node) {
    if (node.tag === 20) {
        const num = node.fields[0];
        return append(numbers, singleton(num));
    }
    else {
        return numbers;
    }
}

export function getAssignments$0027(assignments, node) {
    if (node.tag === 13) {
        const assign = node.fields[0];
        return append(assignments, singleton(assign));
    }
    else {
        return assignments;
    }
}

export function getContAssignments(assignments, node) {
    if (node.tag === 2) {
        const contAssign = node.fields[0];
        return append(assignments, singleton(contAssign.Assignment));
    }
    else {
        return assignments;
    }
}

export function getAlwaysAssignments(assignments, node) {
    switch (node.tag) {
        case 7: {
            const blocking = node.fields[0];
            return append(assignments, singleton(blocking.Assignment));
        }
        case 6: {
            const nonblocking = node.fields[0];
            return append(assignments, singleton(nonblocking.Assignment));
        }
        default:
            return assignments;
    }
}

export function getAssignmentsWithLocations(assignments, node) {
    switch (node.tag) {
        case 22: {
            const items = node.fields[0];
            const contAssigns = map_1((tupledArg) => {
                const statement = tupledArg[0];
                const loc = tupledArg[1] | 0;
                return [statement.Assignment, loc];
            }, map_1((item_1) => [value(item_1.Statement), item_1.Location], filter((item) => (item.ItemType === "statement"), ofArray(items.ItemList))));
            return append(assignments, contAssigns);
        }
        case 5: {
            const stmt = node.fields[0];
            const matchValue = statementToNode(getAlwaysStatement(stmt));
            switch (matchValue.tag) {
                case 7: {
                    const blocking = matchValue.fields[0];
                    return append(assignments, singleton([blocking.Assignment, stmt.Location]));
                }
                case 6: {
                    const nonblocking = matchValue.fields[0];
                    return append(assignments, singleton([nonblocking.Assignment, stmt.Location]));
                }
                default:
                    return assignments;
            }
        }
        default:
            return assignments;
    }
}

export function getAlwaysBlocks(alwaysBlocks, node) {
    if (node.tag === 4) {
        const alwaysBlock = node.fields[0];
        return append(alwaysBlocks, singleton(alwaysBlock));
    }
    else {
        return alwaysBlocks;
    }
}

export function getBlockingAssignmentsWithLocation(assignments, node) {
    if (node.tag === 5) {
        const stmt = node.fields[0];
        const matchValue = statementToNode(getAlwaysStatement(stmt));
        if (matchValue.tag === 7) {
            const blocking = matchValue.fields[0];
            return append(assignments, singleton([blocking, stmt.Location]));
        }
        else {
            return assignments;
        }
    }
    else {
        return assignments;
    }
}

export function getNonBlockingAssignmentsWithLocation(assignments, node) {
    if (node.tag === 5) {
        const stmt = node.fields[0];
        const matchValue = statementToNode(getAlwaysStatement(stmt));
        if (matchValue.tag === 6) {
            const nonblocking = matchValue.fields[0];
            return append(assignments, singleton([nonblocking, stmt.Location]));
        }
        else {
            return assignments;
        }
    }
    else {
        return assignments;
    }
}

export function getBlockingAssignments(assignments, node) {
    if (node.tag === 7) {
        const blocking = node.fields[0];
        return append(assignments, singleton(blocking));
    }
    else {
        return assignments;
    }
}

export function getNonBlockingAssignments(assignments, node) {
    if (node.tag === 6) {
        const nonblocking = node.fields[0];
        return append(assignments, singleton(nonblocking));
    }
    else {
        return assignments;
    }
}

//# sourceMappingURL=VerilogAST.fs.js.map
