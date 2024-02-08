import { Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, list_type, class_type, tuple_type, option_type, int32_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { empty as empty_1, map, item, mapIndexed, length, collect, singleton, cons, head, tail, isEmpty } from "../fable_modules/fable-library.4.1.4/List.js";
import { comparePrimitives, compare, compareArrays, curry2, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { getCombinatorialOutputs, calculateCustomComponentsCombinatorialPaths, getNodeOrFail } from "./SynchronousUtils.fs.js";
import { empty, FSharpSet__Add, FSharpSet__Contains } from "../fable_modules/fable-library.4.1.4/Set.js";
import { printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { filter, toList } from "../fable_modules/fable-library.4.1.4/Map.js";
import { SimulationError, SimulationErrorType } from "./SimulatorTypes.fs.js";
import { value } from "../fable_modules/fable-library.4.1.4/Option.js";
import { isCustom, getCustomName } from "../Common/Helpers.fs.js";
import { FSharpResult$2, Result_Bind } from "../fable_modules/fable-library.4.1.4/Choice.js";

class DfsType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NoCycle", "Backtracking", "Cycle"];
    }
}

function DfsType_$reflection() {
    return union_type("SimulationGraphAnalyser.DfsType", [], DfsType, () => [[["Item", class_type("Microsoft.FSharp.Collections.FSharpSet`1", [tuple_type(string_type, option_type(int32_type))])]], [["Item1", list_type(string_type)], ["Item2", string_type]], [["Item", list_type(string_type)]]]);
}

function dfs(currNodeId, inputPortNumber, graph, visited, currStack, getCombOuts) {
    const exploreChildren = (visited_1_mut, currStack_1_mut, children_mut) => {
        exploreChildren:
        while (true) {
            const visited_1 = visited_1_mut, currStack_1 = currStack_1_mut, children = children_mut;
            if (!isEmpty(children)) {
                const children$0027 = tail(children);
                const childPNum = head(children)[1];
                const childId = head(children)[0];
                const matchValue = dfs(childId, childPNum, graph, visited_1, currStack_1, getCombOuts);
                switch (matchValue.tag) {
                    case 1: {
                        const cycleEnd = matchValue.fields[1];
                        const cycle = matchValue.fields[0];
                        if (equals(cycleEnd, currNodeId)) {
                            return new DfsType(2, [cycle]);
                        }
                        else {
                            return new DfsType(1, [cons(currNodeId, cycle), cycleEnd]);
                        }
                    }
                    case 2: {
                        const cycle_1 = matchValue.fields[0];
                        return new DfsType(2, [cycle_1]);
                    }
                    default: {
                        const visited_2 = matchValue.fields[0];
                        visited_1_mut = visited_2;
                        currStack_1_mut = currStack_1;
                        children_mut = children$0027;
                        continue exploreChildren;
                    }
                }
            }
            else {
                return new DfsType(0, [visited_1]);
            }
            break;
        }
    };
    const currNode = getNodeOrFail(graph, currNodeId);
    const inputPortNumber_1 = (currNode.Type.tag === 26) ? inputPortNumber : void 0;
    const curr = [currNodeId, inputPortNumber_1];
    const matchValue_3 = FSharpSet__Contains(currStack, curr);
    const matchValue_4 = FSharpSet__Contains(visited, curr);
    if (matchValue_3) {
        if (matchValue_4) {
            return new DfsType(1, [singleton(currNodeId), currNodeId]);
        }
        else {
            return toFail(printf("what? Node never visited but in the stack, while detecting cycle: %A"))(currNodeId);
        }
    }
    else if (matchValue_4) {
        return new DfsType(0, [visited]);
    }
    else {
        const visited_3 = FSharpSet__Add(visited, curr);
        const currStack_2 = FSharpSet__Add(currStack, curr);
        return exploreChildren(visited_3, currStack_2, collect((tupledArg) => {
            const portChildren = tupledArg[1];
            return portChildren;
        }, toList(getCombOuts(currNode, inputPortNumber_1))));
    }
}

function calculateConnectionsAffected(connections, cycle) {
    const findConnection = (connections_1_mut, tupledArg_mut) => {
        findConnection:
        while (true) {
            const connections_1 = connections_1_mut, tupledArg = tupledArg_mut;
            const compIdFrom = tupledArg[0];
            const compIdTo = tupledArg[1];
            if (!isEmpty(connections_1)) {
                const connections$0027 = tail(connections_1);
                const conn = head(connections_1);
                const matchValue = conn.Source.HostId === compIdFrom;
                const matchValue_1 = conn.Target.HostId === compIdTo;
                let matchResult;
                if (matchValue) {
                    if (matchValue_1) {
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
                        return conn.Id;
                    default: {
                        connections_1_mut = connections$0027;
                        tupledArg_mut = [compIdFrom, compIdTo];
                        continue findConnection;
                    }
                }
            }
            else {
                return toFail(printf("what? Could not find connection among %A and %A"))(compIdFrom)(compIdTo);
            }
            break;
        }
    };
    if (length(cycle) < 2) {
        toFail(printf("what? Cycle with length less than 2: %A"))(cycle);
    }
    const list_1 = mapIndexed((i, compId) => [compId, item((i + 1) % length(cycle), cycle)], cycle);
    return map(curry2(findConnection)(connections), list_1);
}

function checkCombinatorialCycle(graph, connectionsOpt, inDependency, getCombOuts) {
    const checkGraphForest = (nodeIdsAndPNums_mut, visited_mut) => {
        checkGraphForest:
        while (true) {
            const nodeIdsAndPNums = nodeIdsAndPNums_mut, visited = visited_mut;
            if (!isEmpty(nodeIdsAndPNums)) {
                const pNum = head(nodeIdsAndPNums)[1];
                const nodeIdsAndPNums$0027 = tail(nodeIdsAndPNums);
                const nodeId = head(nodeIdsAndPNums)[0];
                const matchValue = dfs(nodeId, pNum, graph, visited, empty({
                    Compare: compareArrays,
                }), getCombOuts);
                switch (matchValue.tag) {
                    case 2: {
                        const cycle = matchValue.fields[0];
                        let connectionsAffected;
                        if (connectionsOpt != null) {
                            const conns = connectionsOpt;
                            try {
                                connectionsAffected = calculateConnectionsAffected(conns, cycle);
                            }
                            catch (e) {
                                connectionsAffected = empty_1();
                            }
                        }
                        else {
                            connectionsAffected = empty_1();
                        }
                        return new SimulationError(new SimulationErrorType(14, ["Cycle detected in combinatorial logic."]), inDependency, cycle, connectionsAffected);
                    }
                    case 1: {
                        const ce = matchValue.fields[1];
                        const c = matchValue.fields[0];
                        const tupledArg = [c, ce];
                        return toFail(printf("what? Dfs should never terminate while backtracking: %A"))([tupledArg[0], tupledArg[1]]);
                    }
                    default: {
                        const visited_1 = matchValue.fields[0];
                        nodeIdsAndPNums_mut = nodeIdsAndPNums$0027;
                        visited_mut = visited_1;
                        continue checkGraphForest;
                    }
                }
            }
            else {
                return void 0;
            }
            break;
        }
    };
    const visited_2 = empty({
        Compare: compare,
    });
    const allIdsAndPNums = collect((tupledArg_1) => {
        const id = tupledArg_1[0];
        const comp = tupledArg_1[1];
        const matchValue_1 = comp.Type;
        if (matchValue_1.tag === 26) {
            const custom = matchValue_1.fields[0];
            return mapIndexed((i, _arg) => [id, i], custom.InputLabels);
        }
        else {
            return singleton([id, 0]);
        }
    }, toList(graph));
    return checkGraphForest(allIdsAndPNums, visited_2);
}

function recursivelyCheckCombinatorialCycles(currGraph, connectionsOpt, dependencyName, alreadyChecked, getCombOuts) {
    const iterateChildren = (alreadyChecked_1, children) => {
        if (!isEmpty(children)) {
            const children$0027 = tail(children);
            const child = head(children)[1];
            const childGraph = value(child.CustomSimulationGraph);
            const childName = getCustomName(child.Type);
            return Result_Bind((alreadyChecked_2) => iterateChildren(alreadyChecked_2, children$0027), recursivelyCheckCombinatorialCycles(childGraph, void 0, childName, alreadyChecked_1, getCombOuts));
        }
        else {
            return new FSharpResult$2(0, [alreadyChecked_1]);
        }
    };
    if (FSharpSet__Contains(alreadyChecked, dependencyName)) {
        return new FSharpResult$2(0, [alreadyChecked]);
    }
    else {
        const alreadyChecked_3 = FSharpSet__Add(alreadyChecked, dependencyName);
        return Result_Bind((alreadyChecked_4) => {
            const inDependency = (connectionsOpt != null) ? void 0 : dependencyName;
            const _arg = checkCombinatorialCycle(currGraph, connectionsOpt, inDependency, getCombOuts);
            if (_arg != null) {
                const err = _arg;
                return new FSharpResult$2(1, [err]);
            }
            else {
                return new FSharpResult$2(0, [alreadyChecked_4]);
            }
        }, iterateChildren(alreadyChecked_3, toList(filter((compId, comp) => isCustom(comp.Type), currGraph))));
    }
}

/**
 * Analyse a SimulationGraph and return any error (or None).
 * The SimulationGraph should be fully merged with its dependency, so this
 * function has to be called after the dependency merger has finished.
 * This function assumes that there are no cyclic dependencies.
 */
export function analyseSimulationGraph(diagramName, graph, connections) {
    const matchValue = calculateCustomComponentsCombinatorialPaths(diagramName, graph);
    if (matchValue != null) {
        const cccp = matchValue;
        const getCombOuts = (node, inputPortNumberOpt) => getCombinatorialOutputs(cccp, node, inputPortNumberOpt);
        const _arg = recursivelyCheckCombinatorialCycles(graph, connections, diagramName, empty({
            Compare: comparePrimitives,
        }), getCombOuts);
        if (_arg.tag === 1) {
            const err = _arg.fields[0];
            return err;
        }
        else {
            return void 0;
        }
    }
    else {
        return toFail(printf("what? calculateCustomComponentsCombinatorialPaths returned None whithin analyseSimulationGraph. This should never happen"));
    }
}

//# sourceMappingURL=SimulationGraphAnalyser.fs.js.map
