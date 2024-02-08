import { printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { comparePrimitives, compareArrays, compare, safeHash, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { map as map_1, collect, cons, head, tail, isEmpty, contains, tryFindIndex, empty, singleton } from "../fable_modules/fable-library.4.1.4/List.js";
import { FSharpMap__ContainsKey, FSharpMap__Add, toList, empty as empty_1, filter, FSharpMap__TryFind, map, tryPick } from "../fable_modules/fable-library.4.1.4/Map.js";
import { value, some } from "../fable_modules/fable-library.4.1.4/Option.js";
import { isCustom, getCustomComponentType, isInput, getCustomName } from "../Common/Helpers.fs.js";
import { empty as empty_2, FSharpSet__Add, FSharpSet__Contains } from "../fable_modules/fable-library.4.1.4/Set.js";

/**
 * Tells wether a component is clocked or not. Note that Custom components may
 * be clocked (cannot tell without recursively analysing them), so they are
 * considered synchronous.
 */
export function couldBeSynchronousComponent(compType) {
    switch (compType.tag) {
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 37:
        case 38:
        case 36:
        case 40:
        case 41:
        case 42:
        case 26:
            return true;
        case 0:
        case 1:
        case 3:
        case 4:
        case 7:
        case 6:
        case 47:
        case 5:
        case 27:
        case 29:
        case 30:
        case 28:
        case 8:
        case 46:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 24:
        case 21:
        case 23:
        case 25:
        case 22:
        case 9:
        case 39:
        case 2:
            return false;
        default:
            return toFail(`Legacy components ${compType} should never be read!`);
    }
}

/**
 * used to do asynchronous cycle checking on atomic components with non-trivial asynch paths.
 * should this, or something like it, also be used for in dependency cycle checking?
 * returns Some (async outputPortNumbers from inputPortNumber) if component is hybrid, otherwise None.
 */
export function getHybridComponentAsyncOuts(compType, inputPortNumber) {
    if (compType.tag === 42) {
        if (equals(inputPortNumber, 0)) {
            return singleton(0);
        }
        else {
            return empty();
        }
    }
    else {
        return void 0;
    }
}

export function isHybridComponent(compType) {
    return getHybridComponentAsyncOuts(compType, 0) != null;
}

/**
 * Find out whether a simulation graph has some synchronous components.
 */
export function hasSynchronousComponents(graph) {
    const _arg = tryPick((compId_1, isSync) => {
        if (isSync) {
            return some(void 0);
        }
        else {
            return void 0;
        }
    }, map((compId, comp) => {
        const matchValue = comp.Type;
        switch (matchValue.tag) {
            case 31:
            case 32:
            case 33:
            case 34:
            case 35:
            case 37:
            case 38:
            case 36:
            case 40:
            case 41:
            case 42:
                return true;
            case 26:
                return hasSynchronousComponents(value(comp.CustomSimulationGraph));
            case 0:
            case 1:
            case 3:
            case 4:
            case 6:
            case 47:
            case 5:
            case 27:
            case 29:
            case 28:
            case 30:
            case 8:
            case 46:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 25:
            case 21:
            case 24:
            case 23:
            case 22:
            case 9:
            case 39:
            case 7:
            case 2:
                return false;
            default:
                return toFail(`legacy components should never be read ${comp.Type}`);
        }
    }, graph));
    if (_arg == null) {
        return false;
    }
    else {
        return true;
    }
}

export function getNodeOrFail(graph, id) {
    const matchValue = FSharpMap__TryFind(graph, id);
    if (matchValue != null) {
        const comp = matchValue;
        return comp;
    }
    else {
        return toFail(printf("what? getNodeOrFail received invalid component id: %A"))(id);
    }
}

function labelToPortNumber(label, labels) {
    const matchValue = tryFindIndex((y) => (label === y), labels);
    if (matchValue != null) {
        const pNumber = matchValue | 0;
        return pNumber | 0;
    }
    else {
        return toFail(printf("what? Label %s not present in %A"))(label)(labels) | 0;
    }
}

function getCustomCombinatorialOutputs(combRoutes, customNode, inputPortNumber) {
    let combOutputs;
    const matchValue = FSharpMap__TryFind(combRoutes, getCustomName(customNode.Type));
    if (matchValue != null) {
        const routes = matchValue;
        const matchValue_1 = FSharpMap__TryFind(routes, inputPortNumber);
        if (matchValue_1 != null) {
            const outputs = matchValue_1;
            combOutputs = outputs;
        }
        else {
            combOutputs = toFail(printf("what? getCustomCombinatorialOutputs 2"));
        }
    }
    else {
        combOutputs = toFail(printf("what? getCustomCombinatorialOutputs 1"));
    }
    return filter((outputPortNumber, _arg) => contains(outputPortNumber, combOutputs, {
        Equals: equals,
        GetHashCode: safeHash,
    }), customNode.Outputs);
}

/**
 * Given a map of combinatorial routes from inputs to outputs for every
 * simulation graph, perform a lookup to find the combinatorial routes from a
 * given input to the outputs. Then filter the outputs of the custom node to
 * only point to the combinatorial children (i.e. the ones connected to the
 * combinatorial outptus).
 */
export function getCombinatorialOutputs(combRoutes, node, inputPortNumberOpt) {
    let comp, comp_1;
    const matchValue = node.Type;
    let matchResult, comp_2, comp_3;
    switch (matchValue.tag) {
        case 26: {
            matchResult = 0;
            break;
        }
        case 42: {
            if (equals(inputPortNumberOpt, 0)) {
                matchResult = 1;
            }
            else if ((comp = matchValue, couldBeSynchronousComponent(comp))) {
                matchResult = 2;
                comp_2 = matchValue;
            }
            else {
                matchResult = 3;
                comp_3 = matchValue;
            }
            break;
        }
        default:
            if ((comp_1 = matchValue, couldBeSynchronousComponent(comp_1))) {
                matchResult = 2;
                comp_2 = matchValue;
            }
            else {
                matchResult = 3;
                comp_3 = matchValue;
            }
    }
    switch (matchResult) {
        case 0:
            return getCustomCombinatorialOutputs(combRoutes, node, value(inputPortNumberOpt));
        case 1:
            return node.Outputs;
        case 2:
            return empty_1({
                Compare: compare,
            });
        default:
            return node.Outputs;
    }
}

function dfs(graph, combPaths, currId, inputPortNumber, visited, outputsReached) {
    const exploreChildren = (visited_1_mut, outputsReached_1_mut, children_mut) => {
        exploreChildren:
        while (true) {
            const visited_1 = visited_1_mut, outputsReached_1 = outputsReached_1_mut, children = children_mut;
            if (!isEmpty(children)) {
                const children$0027 = tail(children);
                const childInpPNum = head(children)[1];
                const childId = head(children)[0];
                const patternInput = dfs(graph, combPaths, childId, childInpPNum, visited_1, outputsReached_1);
                const visited_2 = patternInput[0];
                const outputsReached_2 = patternInput[1];
                visited_1_mut = visited_2;
                outputsReached_1_mut = outputsReached_2;
                children_mut = children$0027;
                continue exploreChildren;
            }
            else {
                return [visited_1, outputsReached_1];
            }
            break;
        }
    };
    const currNode = getNodeOrFail(graph, currId);
    let inputPortNumber_1;
    const matchValue = currNode.Type;
    switch (matchValue.tag) {
        case 26:
        case 42: {
            inputPortNumber_1 = inputPortNumber;
            break;
        }
        default:
            inputPortNumber_1 = void 0;
    }
    if (FSharpSet__Contains(visited, [currId, inputPortNumber_1])) {
        return [visited, outputsReached];
    }
    else {
        const visited_3 = FSharpSet__Add(visited, [currId, inputPortNumber_1]);
        if (currNode.Type.tag === 1) {
            return [visited_3, cons(currNode.Label, outputsReached)];
        }
        else {
            return exploreChildren(visited_3, outputsReached, collect((tupledArg) => {
                const portChildren = tupledArg[1];
                return portChildren;
            }, toList(getCombinatorialOutputs(combPaths, currNode, inputPortNumber_1))));
        }
    }
}

function findCombinatorialPaths(customComp, currGraph, combPaths) {
    const labelToString = (_arg) => {
        const label = _arg;
        return label;
    };
    const labelsToStrings = (labels) => map_1((tuple) => tuple[0], labels);
    const runDfs = (inputs) => {
        if (!isEmpty(inputs)) {
            const inputs$0027 = tail(inputs);
            const input = head(inputs)[1];
            const outputsReached = dfs(currGraph, combPaths, input.Id, 0, empty_2({
                Compare: compareArrays,
            }), empty())[1];
            const res = runDfs(inputs$0027);
            const outputsPNums = map_1((arg) => labelToPortNumber(labelToString(arg), labelsToStrings(customComp.OutputLabels)), outputsReached);
            return FSharpMap__Add(res, labelToPortNumber(labelToString(input.Label), labelsToStrings(customComp.InputLabels)), map_1((arg_2) => arg_2, outputsPNums));
        }
        else {
            return empty_1({
                Compare: compare,
            });
        }
    };
    return runDfs(toList(filter((compId, comp) => isInput(comp.Type), currGraph)));
}

function exploreNestedComponents(currGraph, currName, currStack, result) {
    const currStack_1 = FSharpSet__Add(currStack, currName);
    const iterateNestedComponents = (res_mut, nested_mut) => {
        let nextGraph, nested$0027, customNode, nextGraph_1, nested$0027_1, customNode_1;
        iterateNestedComponents:
        while (true) {
            const res = res_mut, nested = nested_mut;
            if (!isEmpty(nested)) {
                if ((nextGraph = head(nested)[1][0], (nested$0027 = tail(nested), (customNode = head(nested)[1][1], res == null)))) {
                    const customNode_2 = head(nested)[1][1];
                    const nested$0027_2 = tail(nested);
                    const nextGraph_2 = head(nested)[1][0];
                    return void 0;
                }
                else if ((nextGraph_1 = head(nested)[1][0], (nested$0027_1 = tail(nested), (customNode_1 = head(nested)[1][1], res != null)))) {
                    const customNode_3 = head(nested)[1][1];
                    const nested$0027_3 = tail(nested);
                    const nextGraph_3 = head(nested)[1][0];
                    const result_1 = value(res);
                    const matchValue = calculateCustomCompCombPaths(nextGraph_3, getCustomName(customNode_3), getCustomComponentType(customNode_3), currStack_1, result_1);
                    if (matchValue != null) {
                        const result_2 = matchValue;
                        res_mut = result_2;
                        nested_mut = nested$0027_3;
                        continue iterateNestedComponents;
                    }
                    else {
                        return void 0;
                    }
                }
                else {
                    return toFail(printf("what? Impossible case in iterateNestedComponents"));
                }
            }
            else {
                return res;
            }
            break;
        }
    };
    return iterateNestedComponents(result, toList(map((compId_1, comp_1) => [value(comp_1.CustomSimulationGraph), comp_1.Type], filter((compId, comp) => isCustom(comp.Type), currGraph))));
}

function calculateCustomCompCombPaths(currGraph, currName, customComp, currStack, result) {
    const matchValue = FSharpSet__Contains(currStack, currName);
    const matchValue_1 = FSharpMap__ContainsKey(result, currName);
    if (matchValue) {
        return void 0;
    }
    else if (matchValue_1) {
        return result;
    }
    else {
        const matchValue_3 = exploreNestedComponents(currGraph, currName, currStack, result);
        if (matchValue_3 != null) {
            const result_1 = matchValue_3;
            return FSharpMap__Add(result_1, currName, findCombinatorialPaths(customComp, currGraph, result_1));
        }
        else {
            return void 0;
        }
    }
}

/**
 * For each dependecy in a simulation graph, create a map containing:
 * - key: name of the custom component.
 * - value: a map with:
 * - key: each InputPortNumber
 * - value: a list of OutputPortNumber combinatorially connected to the
 * input.
 * An input is considered combinatorially connected to an output if there is at
 * least one logic path connecting an input directly with the output. In other
 * words, there must be at least one route from the input to output that does
 * not encounter any synchronous component.
 * Return None if such information cannot be inferred, for example if there is
 * a circular dependency.
 */
export function calculateCustomComponentsCombinatorialPaths(diagramName, graph) {
    return exploreNestedComponents(graph, diagramName, empty_2({
        Compare: comparePrimitives,
    }), empty_1({
        Compare: comparePrimitives,
    }));
}

//# sourceMappingURL=SynchronousUtils.fs.js.map
