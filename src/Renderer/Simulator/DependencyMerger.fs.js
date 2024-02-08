import { item, tryFindIndex, singleton, cons, head, tail, isEmpty, empty, tryFind, filter, map } from "../fable_modules/fable-library.4.1.4/List.js";
import { SimulationComponent, SimulationError, SimulationErrorType } from "./SimulatorTypes.fs.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { fold, empty as empty_1, ofList, FSharpMap__Add, FSharpMap__TryFind } from "../fable_modules/fable-library.4.1.4/Map.js";
import { Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, list_type, class_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { empty as empty_2, FSharpSet__Add, FSharpSet__Contains } from "../fable_modules/fable-library.4.1.4/Set.js";
import { toText, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { runCanvasStateChecksAndBuildGraph } from "./Builder.fs.js";
import { compare, comparePrimitives } from "../fable_modules/fable-library.4.1.4/Util.js";
import { getSimulationIOsFromGraph, extractSimulationIOs, extractIncompleteSimulationIOs } from "./Runner.fs.js";

function getComponentDependencies(state_, state__1) {
    const state = [state_, state__1];
    const components = state[0];
    return map((comp_1) => {
        const matchValue_1 = comp_1.Type;
        if (matchValue_1.tag === 26) {
            const c = matchValue_1.fields[0];
            return c.Name;
        }
        else {
            throw new Error("what? Impossible, getComponentDependency");
        }
    }, filter((comp) => {
        if (comp.Type.tag === 26) {
            return true;
        }
        else {
            return false;
        }
    }, components));
}

function getDependencyState(name, dependencies) {
    const _arg = tryFind((dep) => (dep.Name === name), dependencies);
    if (_arg == null) {
        return new FSharpResult$2(1, [new SimulationError(new SimulationErrorType(16, [name]), void 0, empty(), empty())]);
    }
    else {
        const dep_1 = _arg;
        return new FSharpResult$2(0, [dep_1.CanvasState]);
    }
}

function buildDependencyGraph(componentName, state_, state__1, dependencies, dependencyGraph) {
    const state = [state_, state__1];
    const iterateChildren = (children_mut, dependencyGraph_1_mut) => {
        iterateChildren:
        while (true) {
            const children = children_mut, dependencyGraph_1 = dependencyGraph_1_mut;
            if (!isEmpty(children)) {
                const children$0027 = tail(children);
                const child = head(children);
                const matchValue = FSharpMap__TryFind(dependencyGraph_1, child);
                if (matchValue == null) {
                    const matchValue_1 = getDependencyState(child, dependencies);
                    if (matchValue_1.tag === 0) {
                        const childState = matchValue_1.fields[0];
                        const matchValue_2 = buildDependencyGraph(child, childState[0], childState[1], dependencies, dependencyGraph_1);
                        if (matchValue_2.tag === 0) {
                            const dependencyGraph_2 = matchValue_2.fields[0];
                            children_mut = children$0027;
                            dependencyGraph_1_mut = dependencyGraph_2;
                            continue iterateChildren;
                        }
                        else {
                            const err_1 = matchValue_2.fields[0];
                            return new FSharpResult$2(1, [err_1]);
                        }
                    }
                    else {
                        const err = matchValue_1.fields[0];
                        return new FSharpResult$2(1, [new SimulationError(err.ErrType, componentName, err.ComponentsAffected, err.ConnectionsAffected)]);
                    }
                }
                else {
                    children_mut = children$0027;
                    dependencyGraph_1_mut = dependencyGraph_1;
                    continue iterateChildren;
                }
            }
            else {
                return new FSharpResult$2(0, [dependencyGraph_1]);
            }
            break;
        }
    };
    const children_1 = getComponentDependencies(state[0], state[1]);
    const dependencyGraph_3 = FSharpMap__Add(dependencyGraph, componentName, children_1);
    return iterateChildren(children_1, dependencyGraph_3);
}

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
    return union_type("DependencyMerger.DfsType", [], DfsType, () => [[["Item", class_type("Microsoft.FSharp.Collections.FSharpSet`1", [string_type])]], [["Item1", list_type(string_type)], ["Item2", string_type]], [["Item", list_type(string_type)]]]);
}

function checkDependencyCycle(currNode, depGraph, visited, currStack) {
    let matchValue_5, children_1;
    const exploreChildren = (visited_1_mut, currStack_1_mut, children_mut) => {
        exploreChildren:
        while (true) {
            const visited_1 = visited_1_mut, currStack_1 = currStack_1_mut, children = children_mut;
            if (!isEmpty(children)) {
                const children$0027 = tail(children);
                const child = head(children);
                const matchValue = checkDependencyCycle(child, depGraph, visited_1, currStack_1);
                switch (matchValue.tag) {
                    case 1: {
                        const cycleEnd = matchValue.fields[1];
                        const cycle = matchValue.fields[0];
                        if (cycleEnd === currNode) {
                            return new DfsType(2, [cons(currNode, cycle)]);
                        }
                        else {
                            return new DfsType(1, [cons(currNode, cycle), cycleEnd]);
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
    const matchValue_2 = FSharpSet__Contains(currStack, currNode);
    const matchValue_3 = FSharpSet__Contains(visited, currNode);
    if (matchValue_2) {
        if (matchValue_3) {
            return new DfsType(1, [singleton(currNode), currNode]);
        }
        else {
            return toFail(printf("what? Node never visited but in the stack, while detecting cycle: %s"))(currNode);
        }
    }
    else if (matchValue_3) {
        return new DfsType(0, [visited]);
    }
    else {
        const visited_3 = FSharpSet__Add(visited, currNode);
        const currStack_2 = FSharpSet__Add(currStack, currNode);
        return exploreChildren(visited_3, currStack_2, (matchValue_5 = FSharpMap__TryFind(depGraph, currNode), (matchValue_5 != null) ? ((children_1 = matchValue_5, children_1)) : toFail(printf("what? Could not find dependency %s in cycle detection"))(currNode)));
    }
}

function buildDependencyMap(loadedDependencies) {
    const dependenciesRes = map((dep) => {
        let tupledArg;
        return [dep.Name, (tupledArg = dep.CanvasState, runCanvasStateChecksAndBuildGraph(tupledArg[0], tupledArg[1], loadedDependencies))];
    }, loadedDependencies);
    const hasError = (tupledArg_1) => {
        const name = tupledArg_1[0];
        const res = tupledArg_1[1];
        if (res.tag === 0) {
            return false;
        }
        else {
            return true;
        }
    };
    const extractOk = (tupledArg_2) => {
        const name_1 = tupledArg_2[0];
        const res_1 = tupledArg_2[1];
        if (res_1.tag === 1) {
            const e = res_1.fields[0];
            return toFail(printf("what? Dependency %s expected to be Ok, but has error %A"))(name_1)(e);
        }
        else {
            const d = res_1.fields[0];
            return [name_1, d];
        }
    };
    const matchValue = tryFind(hasError, dependenciesRes);
    if (matchValue == null) {
        return new FSharpResult$2(0, [ofList(map(extractOk, dependenciesRes), {
            Compare: comparePrimitives,
        })]);
    }
    else {
        const copyOfStruct = matchValue[1];
        if (copyOfStruct.tag === 1) {
            const err = copyOfStruct.fields[0];
            const name_2 = matchValue[0];
            return new FSharpResult$2(1, [new SimulationError(err.ErrType, name_2, empty(), empty())]);
        }
        else {
            throw new Error("what? Impossible case in buildDependencyMap");
        }
    }
}

function checkDependenciesAndBuildMap(currDiagramName, state_, state__1, dependencies) {
    let arg;
    const state = [state_, state__1];
    const prettyPrintCycle = (cycle) => {
        if (!isEmpty(cycle)) {
            if (isEmpty(tail(cycle))) {
                const name = head(cycle);
                return ("\"" + name) + "\"";
            }
            else {
                const cycle$0027 = tail(cycle);
                const name_1 = head(cycle);
                return (("\"" + name_1) + "\" --> ") + prettyPrintCycle(cycle$0027);
            }
        }
        else {
            return "";
        }
    };
    const matchValue = buildDependencyGraph(currDiagramName, state[0], state[1], dependencies, empty_1({
        Compare: comparePrimitives,
    }));
    if (matchValue.tag === 0) {
        const dependencyGraph_1 = matchValue.fields[0];
        const matchValue_1 = checkDependencyCycle(currDiagramName, dependencyGraph_1, empty_2({
            Compare: comparePrimitives,
        }), empty_2({
            Compare: comparePrimitives,
        }));
        switch (matchValue_1.tag) {
            case 2: {
                const cycle_1 = matchValue_1.fields[0];
                return new FSharpResult$2(1, [new SimulationError(new SimulationErrorType(14, [(arg = prettyPrintCycle(cycle_1), toText(printf("Found a cycle in dependencies: %s."))(arg))]), void 0, empty(), empty())]);
            }
            case 0: {
                const depsUsed = matchValue_1.fields[0];
                return buildDependencyMap(filter((dep) => FSharpSet__Contains(depsUsed, dep.Name), dependencies));
            }
            default:
                throw new Error("what? checkDependencyCycle finished while Backtracking");
        }
    }
    else {
        const err = matchValue.fields[0];
        return new FSharpResult$2(1, [err]);
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

function portNumberToLabel(_arg, inputLabels) {
    const pNumber = _arg;
    return item(pNumber, inputLabels);
}

function extractInputValuesAsMap(graph, graphInputs, inputLabels) {
    return ofList(map((tupledArg) => {
        const wireData = tupledArg[1];
        const compLabel = tupledArg[0][1];
        return [labelToPortNumber(compLabel, inputLabels), wireData];
    }, extractIncompleteSimulationIOs(graphInputs, graph)), {
        Compare: compare,
    });
}

function extractOutputValuesAsMap(graph, graphOutputs, outputLabels) {
    return ofList(map((tupledArg) => {
        const wireData = tupledArg[1];
        const label = tupledArg[0][1];
        return [labelToPortNumber(label, outputLabels), wireData];
    }, extractSimulationIOs(graphOutputs, graph)), {
        Compare: compare,
    });
}

function assertConsistentCustomOutputs(outputs, oldOutputs) {
}

function makeCustomReducer(custom, graphInputs, graphOutputs) {
    const clo = toFail(printf("Custom rducer should never be called"));
    return clo;
}

function merger(currGraph, dependencyMap) {
    const currGraphCopy = currGraph;
    return fold((currGraph_1, compId, comp) => {
        const matchValue = comp.Type;
        if (matchValue.tag === 26) {
            const custom = matchValue.fields[0];
            let dependencyGraph_1;
            const matchValue_1 = FSharpMap__TryFind(dependencyMap, custom.Name);
            if (matchValue_1 != null) {
                const dependencyGraph = matchValue_1;
                dependencyGraph_1 = dependencyGraph;
            }
            else {
                dependencyGraph_1 = toFail(printf("what? Could not find dependency %s in dependencyMap"))(custom.Name);
            }
            const dependencyGraph_2 = merger(dependencyGraph_1, dependencyMap);
            const patternInput = getSimulationIOsFromGraph(dependencyGraph_2);
            const graphOutputs = patternInput[1];
            const graphInputs = patternInput[0];
            const newComp = new SimulationComponent(comp.Id, comp.Type, comp.Label, comp.Inputs, comp.Outputs, comp.OutputWidths, dependencyGraph_2, comp.State);
            return FSharpMap__Add(currGraph_1, compId, newComp);
        }
        else {
            return currGraph_1;
        }
    }, currGraph, currGraphCopy);
}

/**
 * Try to resolve all the dependencies in a graph, and replace the reducer
 * of the custom components with a simulationgraph.
 * Return an error if there are problems with the dependencies.
 * For example, if the graph of an ALU refers to custom component such as
 * adders, replace them with the actual simulation graph for the adders.
 */
export function mergeDependencies(currDiagramName, graph, state_, state__1, loadedDependencies) {
    const state = [state_, state__1];
    const matchValue = checkDependenciesAndBuildMap(currDiagramName, state[0], state[1], loadedDependencies);
    if (matchValue.tag === 0) {
        const dependencyMap = matchValue.fields[0];
        return new FSharpResult$2(0, [merger(graph, dependencyMap)]);
    }
    else {
        const e = matchValue.fields[0];
        return new FSharpResult$2(1, [e]);
    }
}

//# sourceMappingURL=DependencyMerger.fs.js.map
