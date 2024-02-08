import { filter, fold, unzip, forAll, cons, exists, concat, append, empty, singleton, collect, map, tryFind } from "../fable_modules/fable-library.4.1.4/List.js";
import { printf, toConsole, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { List_distinct } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { equals, comparePrimitives, compare, stringHash } from "../fable_modules/fable-library.4.1.4/Util.js";
import { loadedComponentIsEqual, stateIsEqual, extractLoadedSimulatorComponent } from "./Extractor.fs.js";
import { SimulationComponentState, AlgebraNotImplemented, SimulationData, SimulationError, SimulationErrorType, FastSimulation, SheetPort, SimulationRunStatus } from "./SimulatorTypes.fs.js";
import { empty as empty_1, toList, change, ofList, FSharpMap__get_Item } from "../fable_modules/fable-library.4.1.4/Map.js";
import { NumberBase, PortId, Component__getPort_Z4D1575C7 } from "../Common/CommonTypes.fs.js";
import { runCanvasStateChecksAndBuildGraph } from "./Builder.fs.js";
import { mergeDependencies } from "./DependencyMerger.fs.js";
import { extractSimulationIOs as extractSimulationIOs_1, getSimulationIOs } from "./Runner.fs.js";
import { analyseSimulationGraph } from "./SimulationGraphAnalyser.fs.js";
import { FSharpResult$2, Result_Map } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { buildFastSimulationFData, buildFastSimulation } from "./Fast/FastRun.fs.js";
import { hasSynchronousComponents } from "./SynchronousUtils.fs.js";

/**
 * Builds the graph and simulates it with all inputs zeroed.
 * upper case a string
 */
export function cap(sheet) {
    return sheet.toLocaleUpperCase();
}

/**
 * look up a sheet in a set of loaded components
 */
export function getSheet(ldcs, openSheet) {
    const matchValue = tryFind((ldc) => (cap(ldc.Name) === cap(openSheet)), ldcs);
    if (matchValue != null) {
        const name = matchValue;
        return name;
    }
    else {
        return toFail(`getSheet failed to look up '${openSheet}' in ${map((ldc_1) => ldc_1.Name, ldcs)}`);
    }
}

/**
 * look up a sheet in a set of loaded components, return [] or a list of the matching LoadedComponent
 */
export function getLdcList(ldcs, openSheet) {
    const matchValue = tryFind((ldc) => (cap(ldc.Name) === cap(openSheet)), ldcs);
    if (matchValue != null) {
        const name = matchValue;
        return name;
    }
    else {
        return toFail(`getSheet failed to look up '${openSheet}' in ${map((ldc_1) => ldc_1.Name, ldcs)}`);
    }
}

export function getDirectDependencies(cs_, cs__1) {
    const cs = [cs_, cs__1];
    return collect((comp) => {
        const matchValue = comp.Type;
        if (matchValue.tag === 26) {
            const ct = matchValue.fields[0];
            return singleton([comp.Label, ct.Name]);
        }
        else {
            return empty();
        }
    }, cs[0]);
}

export function childrenOf(ldcs, sheet) {
    const tupledArg = getSheet(ldcs, sheet).CanvasState;
    return getDirectDependencies(tupledArg[0], tupledArg[1]);
}

/**
 * Sheets needed to simulate sheet with name sheet.
 * Sheets form a dependency tree.
 * ldcs is a list of loaded components which must include sheet
 */
export function sheetsNeeded(ldcs, sheet) {
    const children = map((tuple) => tuple[1], childrenOf(ldcs, sheet));
    return List_distinct(append(singleton(sheet), append(children, concat(map((sheet_1) => sheetsNeeded(ldcs, sheet_1), children)))), {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    });
}

/**
 * canvasState: extracted canvasState from draw block.
 * projLdcs: ldcs from project (current sheet ldc may be outofdate)
 * diagramName: name of current open sheet.
 * return updated list of all LDCs
 */
export function getUpdatedLoadedComponentState(diagramName, canvasState_, canvasState__1, projLdcs) {
    const canvasState = [canvasState_, canvasState__1];
    const ldc$0027 = extractLoadedSimulatorComponent(canvasState[0], canvasState[1], diagramName);
    let ldcs_1;
    const ldcIsOpen = (ldc) => (ldc.Name === diagramName);
    const ldcs = map((ldc_1) => {
        if (ldcIsOpen(ldc_1)) {
            return ldc$0027;
        }
        else {
            return ldc_1;
        }
    }, projLdcs);
    ldcs_1 = (!exists(ldcIsOpen, ldcs) ? cons(ldc$0027, ldcs) : ldcs);
    return ldcs_1;
}

/**
 * gets the status of the simulation given current canvasState and project
 */
export function getCurrentSimulationState(canvState_, canvState__1, project, fs) {
    const canvState = [canvState_, canvState__1];
    if (project != null) {
        if (fs.SimulatedTopSheet === "") {
            return new SimulationRunStatus(0, []);
        }
        else {
            const p = project;
            const simIsUpToDate = forAll((ldc) => {
                const matchValue = p.OpenFileName === ldc.Name;
                const matchValue_1 = tryFind((ldc$0027) => (ldc$0027.Name === ldc.Name), p.LoadedComponents);
                if (matchValue_1 != null) {
                    if (matchValue) {
                        const tupledArg = ldc.CanvasState;
                        return stateIsEqual(tupledArg[0], tupledArg[1], canvState[0], canvState[1]);
                    }
                    else {
                        const ldc$0027_1 = matchValue_1;
                        return loadedComponentIsEqual(ldc, ldc$0027_1);
                    }
                }
                else {
                    return false;
                }
            }, fs.SimulatedCanvasState);
            const matchValue_3 = p.OpenFileName === fs.SimulatedTopSheet;
            if (simIsUpToDate) {
                if (matchValue_3) {
                    return new SimulationRunStatus(2, []);
                }
                else {
                    return new SimulationRunStatus(3, []);
                }
            }
            else {
                return new SimulationRunStatus(1, []);
            }
        }
    }
    else {
        return new SimulationRunStatus(4, []);
    }
}

/**
 * Helper used convert port into SheetPort for use by wave simulator determining connectivity
 * within a design sheet.
 * name is the name of the containing sheet.
 */
export function portSheetPort(compsWithIds, name, port) {
    const comp = FSharpMap__get_Item(compsWithIds, port.HostId);
    const compPort = Component__getPort_Z4D1575C7(comp, new PortId(port.Id));
    if (compPort != null) {
        const cPort = compPort;
        return new SheetPort(name, cPort);
    }
    else {
        return void 0;
    }
}

/**
 * canvasState: extracted canvasState from draw block.
 * loadedComponents: from project
 * diagramName: name of current open sheet.
 * save all needed by simulation ldcs in the FastSimulation record.
 * The top sheet name must be saved separately - since if a simulation is being refreshed it must not change
 */
export function saveStateInSimulation(canvasState_, canvasState__1, openFileName, loadedComponents, fs) {
    const canvasState = [canvasState_, canvasState__1];
    const diagramName = openFileName;
    const ldcs = getUpdatedLoadedComponentState(diagramName, canvasState[0], canvasState[1], loadedComponents);
    const updatedLdcs = map((openSheet) => getSheet(ldcs, openSheet), sheetsNeeded(ldcs, diagramName));
    const patternInput_1 = unzip(map((ldc) => {
        const patternInput = ldc.CanvasState;
        const conns = patternInput[1];
        const comps = patternInput[0];
        const compsWithIds = ofList(map((comp) => [comp.Id, comp], comps), {
            Compare: compare,
        });
        const portSheetPort_1 = (port) => portSheetPort(compsWithIds, ldc.Name, port);
        const addConnToPort = (portOpt, conn, pMap) => {
            if (portOpt != null) {
                const port_1 = portOpt;
                return change(port_1, (_arg) => {
                    if (_arg == null) {
                        return singleton(conn);
                    }
                    else {
                        const conns_1 = _arg;
                        return cons(conn, conns_1);
                    }
                }, pMap);
            }
            else {
                return pMap;
            }
        };
        const portsToConnections = toList(fold((pMap_1, conn_1) => addConnToPort(portSheetPort_1(conn_1.Target), conn_1, addConnToPort(portSheetPort_1(conn_1.Source), conn_1, pMap_1)), empty_1({
            Compare: compare,
        }), conns));
        return [[ldc.Name, compsWithIds], portsToConnections];
    }, updatedLdcs));
    const portMap = patternInput_1[1];
    const compMap = patternInput_1[0];
    const compMap_1 = ofList(compMap, {
        Compare: comparePrimitives,
    });
    const portMap_1 = ofList(concat(portMap), {
        Compare: compare,
    });
    return new FastSimulation(fs.ClockTick, fs.MaxArraySize, fs.FGlobalInputComps, fs.FConstantComps, fs.FClockedComps, fs.FOrderedComps, fs.FIOActive, fs.FIOLinks, fs.FComps, fs.FCustomComps, fs.WaveComps, fs.FSComps, fs.FCustomOutputCompLookup, fs.G, fs.NumStepArrays, fs.Drivers, fs.WaveIndex, portMap_1, compMap_1, updatedLdcs, fs.SimulatedTopSheet);
}

/**
 * Extract circuit data from inputs and return a checked SimulationData object or an error
 * SimulationData has some technical debt, it wraps FastSimulation adding some redundant data
 */
export function startCircuitSimulation(simulationArraySize, diagramName, canvasState_, canvasState__1, loadedDependencies) {
    const canvasState = [canvasState_, canvasState__1];
    const matchValue = runCanvasStateChecksAndBuildGraph(canvasState[0], canvasState[1], loadedDependencies);
    if (matchValue.tag === 0) {
        const graph = matchValue.fields[0];
        const matchValue_1 = mergeDependencies(diagramName, graph, canvasState[0], canvasState[1], loadedDependencies);
        if (matchValue_1.tag === 0) {
            const graph_1 = matchValue_1.fields[0];
            const connections = canvasState[1];
            const components = canvasState[0];
            const patternInput = getSimulationIOs(components);
            const outputs = patternInput[1];
            const inputs = patternInput[0];
            const matchValue_2 = analyseSimulationGraph(diagramName, graph_1, connections);
            if (matchValue_2 == null) {
                return Result_Map((sd) => sd, (() => {
                    try {
                        const matchValue_3 = buildFastSimulation(simulationArraySize, diagramName, graph_1);
                        if (matchValue_3.tag === 1) {
                            const e = matchValue_3.fields[0];
                            return new FSharpResult$2(1, [e]);
                        }
                        else {
                            const fs = matchValue_3.fields[0];
                            const fs_1 = saveStateInSimulation(canvasState[0], canvasState[1], diagramName, loadedDependencies, fs);
                            return new FSharpResult$2(0, [new SimulationData(fs_1, graph_1, inputs, outputs, hasSynchronousComponents(graph_1), new NumberBase(0, []), 0)]);
                        }
                    }
                    catch (e_1) {
                        const arg = e_1.message;
                        const arg_1 = e_1.stack;
                        toConsole(printf("\nEXCEPTION:\n\n%A\n%A\n\n"))(arg)(arg_1);
                        return new FSharpResult$2(1, [new SimulationError(new SimulationErrorType(19, [e_1]), void 0, empty(), empty())]);
                    }
                })());
            }
            else {
                const err_2 = matchValue_2;
                return new FSharpResult$2(1, [err_2]);
            }
        }
        else {
            const err_1 = matchValue_1.fields[0];
            return new FSharpResult$2(1, [err_1]);
        }
    }
    else {
        const err = matchValue.fields[0];
        return new FSharpResult$2(1, [err]);
    }
}

export function startCircuitSimulationFData(simulationArraySize, diagramName, canvasState_, canvasState__1, loadedDependencies) {
    const canvasState = [canvasState_, canvasState__1];
    const matchValue = runCanvasStateChecksAndBuildGraph(canvasState[0], canvasState[1], loadedDependencies);
    if (matchValue.tag === 0) {
        const graph = matchValue.fields[0];
        const matchValue_1 = mergeDependencies(diagramName, graph, canvasState[0], canvasState[1], loadedDependencies);
        if (matchValue_1.tag === 0) {
            const graph_1 = matchValue_1.fields[0];
            const connections = canvasState[1];
            const components = canvasState[0];
            const patternInput = getSimulationIOs(components);
            const outputs = patternInput[1];
            const inputs = patternInput[0];
            const matchValue_2 = analyseSimulationGraph(diagramName, graph_1, connections);
            if (matchValue_2 == null) {
                return Result_Map((sd) => sd, (() => {
                    try {
                        const matchValue_3 = buildFastSimulationFData(simulationArraySize, diagramName, graph_1);
                        if (matchValue_3.tag === 1) {
                            const e = matchValue_3.fields[0];
                            return new FSharpResult$2(1, [e]);
                        }
                        else {
                            const fs = matchValue_3.fields[0];
                            const fs_1 = saveStateInSimulation(canvasState[0], canvasState[1], diagramName, loadedDependencies, fs);
                            return new FSharpResult$2(0, [new SimulationData(fs_1, graph_1, inputs, outputs, hasSynchronousComponents(graph_1), new NumberBase(0, []), 0)]);
                        }
                    }
                    catch (matchValue_4) {
                        if (matchValue_4 instanceof AlgebraNotImplemented) {
                            const e_1 = matchValue_4.Data0;
                            return new FSharpResult$2(1, [e_1]);
                        }
                        else {
                            const e_2 = matchValue_4;
                            const arg = e_2.message;
                            const arg_1 = e_2.stack;
                            toConsole(printf("\nEXCEPTION:\n\n%A\n%A\n\n"))(arg)(arg_1);
                            return new FSharpResult$2(1, [new SimulationError(new SimulationErrorType(19, [e_2]), void 0, empty(), empty())]);
                        }
                    }
                })());
            }
            else {
                const err_2 = matchValue_2;
                return new FSharpResult$2(1, [err_2]);
            }
        }
        else {
            const err_1 = matchValue_1.fields[0];
            return new FSharpResult$2(1, [err_1]);
        }
    }
    else {
        const err = matchValue.fields[0];
        return new FSharpResult$2(1, [err]);
    }
}

export const extractSimulationIOs = (simulationIOs) => ((graph) => extractSimulationIOs_1(simulationIOs, graph));

/**
 * Get some info and the state of all stateful components in a graph.
 */
export function extractStatefulComponents(graph) {
    return filter((comp) => !equals(comp.State, new SimulationComponentState(0, [])), map((tuple) => tuple[1], toList(graph)));
}

//# sourceMappingURL=Simulator.fs.js.map
