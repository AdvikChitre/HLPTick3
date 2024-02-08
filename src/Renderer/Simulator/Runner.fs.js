import { uncurry3, comparePrimitives, stringHash, compare, equals, createAtom } from "../fable_modules/fable-library.4.1.4/Util.js";
import { toArray, empty, FSharpMap__Add, FSharpMap__TryFind, fold } from "../fable_modules/fable-library.4.1.4/Map.js";
import { empty as empty_1, cons, fold as fold_1, contains } from "../fable_modules/fable-library.4.1.4/List.js";
import { shortPSComp } from "./SimulatorTypes.fs.js";
import { toFail, printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { sortBy } from "../fable_modules/fable-library.4.1.4/Array.js";
import { couldBeSynchronousComponent } from "./SynchronousUtils.fs.js";

export let simTrace = createAtom(void 0);

/**
 * Function to determine what reducer inputs or outputs have changed.
 */
export function diffReducerInputsOrOutputs(newIO, oldIO) {
    return fold((diff, portNumber, wireData) => {
        let oldData, oldData_1;
        const matchValue = FSharpMap__TryFind(oldIO, portNumber);
        if (matchValue != null) {
            if ((oldData = matchValue, !equals(oldData, wireData))) {
                const oldData_2 = matchValue;
                return FSharpMap__Add(diff, portNumber, wireData);
            }
            else if ((oldData_1 = matchValue, equals(oldData_1, wireData))) {
                const oldData_3 = matchValue;
                return diff;
            }
            else {
                throw new Error("what? Impossible case in diffReducerInputsOrOutputs");
            }
        }
        else {
            return FSharpMap__Add(diff, portNumber, wireData);
        }
    }, empty({
        Compare: compare,
    }), newIO);
}

export function traceReduction(action, comp, reducerInput, reducerOutput) {
    let traceLabs, lab;
    const matchValue = simTrace();
    if (matchValue != null) {
        if ((traceLabs = matchValue, (lab = comp.Label, contains(lab, traceLabs, {
            Equals: (x, y) => (x === y),
            GetHashCode: stringHash,
        })))) {
            const lab_1 = comp.Label;
            const traceLabs_1 = matchValue;
            const arg_1 = shortPSComp(comp);
            toConsole(printf("\n%s>>>>> %A \n\toutputs: %A \n\tinputs=%A \n\tnewState=%A"))(action)(arg_1)(reducerOutput.Outputs)(reducerInput.Inputs)(reducerOutput.NewState);
        }
    }
}

export function clockedComps(graph) {
    let array;
    return sortBy((tupledArg_1) => {
        const cid = tupledArg_1[0];
        const comp_1 = tupledArg_1[1];
        if (comp_1.Type.tag === 26) {
            return 0;
        }
        else {
            return 1;
        }
    }, (array = toArray(graph), array.filter((tupledArg) => {
        const comp = tupledArg[1];
        return couldBeSynchronousComponent(comp.Type);
    })), {
        Compare: comparePrimitives,
    });
}

/**
 * Given a list of IO nodes (i.e. Inputs or outputs) extract their value.
 * If they dont all have a value, an error is thrown.
 */
export function extractSimulationIOs(simulationIOs, graph) {
    const extractWireData = (inputs) => {
        const matchValue = FSharpMap__TryFind(inputs, 0);
        if (matchValue != null) {
            const bit = matchValue;
            return bit;
        }
        else {
            throw new Error("what? IO bit not set");
        }
    };
    return fold_1((result, tupledArg) => {
        const ioId = tupledArg[0];
        const ioLabel = tupledArg[1];
        const width = tupledArg[2] | 0;
        const matchValue_1 = FSharpMap__TryFind(graph, ioId);
        if (matchValue_1 != null) {
            const comp = matchValue_1;
            return cons([[ioId, ioLabel, width], extractWireData(comp.Inputs)], result);
        }
        else {
            const tupledArg_1 = [ioId, ioLabel];
            return toFail(printf("what? Could not find io node: %A"))([tupledArg_1[0], tupledArg_1[1]]);
        }
    }, empty_1(), simulationIOs);
}

/**
 * Simlar to extractSimulationIOs, but do not fail if a bit is not set, just
 * ignore it.
 */
export function extractIncompleteSimulationIOs(simulationIOs, graph) {
    const extractWireData = (inputs) => FSharpMap__TryFind(inputs, 0);
    return fold_1((result, tupledArg) => {
        const ioId = tupledArg[0];
        const ioLabel = tupledArg[1];
        const width = tupledArg[2] | 0;
        const matchValue = FSharpMap__TryFind(graph, ioId);
        if (matchValue != null) {
            const comp = matchValue;
            const matchValue_1 = extractWireData(comp.Inputs);
            if (matchValue_1 != null) {
                const wireData = matchValue_1;
                return cons([[ioId, ioLabel, width], wireData], result);
            }
            else {
                return result;
            }
        }
        else {
            const tupledArg_1 = [ioId, ioLabel, width];
            return toFail(printf("what? Could not find io node: %A"))([tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]]);
        }
    }, empty_1(), simulationIOs);
}

/**
 * Get ComponentIds, ComponentLabels and wire widths of all input and output
 * nodes.
 */
export function getSimulationIOs(components) {
    return fold_1((tupledArg, comp) => {
        const inputs = tupledArg[0];
        const outputs = tupledArg[1];
        const matchValue = comp.Type;
        switch (matchValue.tag) {
            case 0: {
                const w = matchValue.fields[0] | 0;
                return [cons([comp.Id, comp.Label, w], inputs), outputs];
            }
            case 1: {
                const w_1 = matchValue.fields[0] | 0;
                return [inputs, cons([comp.Id, comp.Label, w_1], outputs)];
            }
            default:
                return [inputs, outputs];
        }
    }, [empty_1(), empty_1()], components);
}

/**
 * Get ComponentIds, ComponentLabels and wire widths of all input and output
 * nodes in a simulationGraph.
 */
export function getSimulationIOsFromGraph(graph) {
    return fold(uncurry3((tupledArg) => ((compId) => {
        const inputs = tupledArg[0];
        const outputs = tupledArg[1];
        return (comp) => {
            const matchValue = comp.Type;
            switch (matchValue.tag) {
                case 0: {
                    const w = matchValue.fields[0] | 0;
                    return [cons([comp.Id, comp.Label, w], inputs), outputs];
                }
                case 1: {
                    const w_1 = matchValue.fields[0] | 0;
                    return [inputs, cons([comp.Id, comp.Label, w_1], outputs)];
                }
                default:
                    return [inputs, outputs];
            }
        };
    })), [empty_1(), empty_1()], graph);
}

//# sourceMappingURL=Runner.fs.js.map
