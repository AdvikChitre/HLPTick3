import { toText, toFail, printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { updateProjectFromCanvas } from "./MenuHelpers.fs.js";
import { DrawModelType_SheetT_Model__Model_ChangeCounterComp, DrawModelType_SheetT_Model__Model_ChangeAdderComp, isAllVisible, DrawModelType_SheetT_Model__Model_GetCanvasState } from "../DrawBlock/Sheet.fs.js";
import { startCircuitSimulation } from "../Simulator/Simulator.fs.js";
import { fastDataZero, Bit, FastData, FastBits, SimulationError, SimulationErrorType, SimulationData, SimulationError_$reflection, SimulationData_$reflection, FSInterface, errMsg } from "../Simulator/SimulatorTypes.fs.js";
import { WaveSimModel, WaveSimState, Model, currentStepSimulationStep_, TTMsg, SimSubTab, SimulationProgress, PopupProgress, sheet_, Msg, RightTab } from "../Model/ModelType.fs.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { writeFile, pathJoin } from "../Interface/FilesIO.fs.js";
import { errorPropsNotification, successSimulationNotification, displayAlertOnError } from "./Notifications.fs.js";
import { CompilationProfile, getVerilog } from "../Simulator/Verilog.fs.js";
import { sort, head, tail, exists, append, collect, ofArray, singleton, filter as filter_1, isEmpty, tryFind, forAll as forAll_1, empty, map, iterate } from "../fable_modules/fable-library.4.1.4/List.js";
import { extractFastSimulationIOs, extractStatefulComponents, extractViewers, runFastSimulation, changeInput } from "../Simulator/Fast/FastRun.fs.js";
import { strToIntCheckWidth, fastDataToPaddedString, bitToString, convertBigIntToInt32, convertInt64ToFastData, convertIntToFastData } from "../Simulator/NumberHelpers.fs.js";
import { fromInt32, toInt64 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { FSharpMap__get_Count, empty as empty_1, FSharpMap__get_Item, FSharpMap__Add, containsKey, values, filter, map as map_1, toList } from "../fable_modules/fable-library.4.1.4/Map.js";
import { curry4, compareArrays, createAtom, compare, curry2, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { map as map_4, empty as empty_2, singleton as singleton_1, append as append_1, delay, toList as toList_1, forAll } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { Optic_Set, Optic_Set_op_HatEquals_Z147477F8, Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Optic_Get, Optic_Get_op_HatDot_Z146BA564 } from "../Common/Optics.fs.js";
import { SymbolT_Msg, BusWireT_Msg, SymbolT_Annotation, SheetT_KeyboardMsg, SheetT_Msg, SheetT_symbol_, SymbolT_Model, SymbolT_Symbol, SheetT_symbolOf_, SheetT_symbols_ } from "../Model/DrawModelType.fs.js";
import { getSubArray, map as map_2 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { BoundingBox, Rotation, XYPos, JSDiagramMsg, NumberBase, LoadedComponent_$reflection, Component, ComponentType } from "../Common/CommonTypes.fs.js";
import { toString, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { record_type, union_type, list_type, bool_type, int32_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { simulationPlaceholder } from "../Simulator/Fast/FastCreate.fs.js";
import { value as value_7, defaultArgWith, defaultArg, map as map_3 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { getStateAndDependencies, addStateToLoadedComponents, loadedComponentIsEqualExInputDefault, loadedComponentIsEqual } from "../Simulator/Extractor.fs.js";
import { instrumentInterval, getTimeMs } from "../Common/TimeHelpers.fs.js";
import { right as right_1, item, left as left_1, Level_Option, level } from "../fable_modules/Fulma.2.16.0/Layouts/Level.fs.js";
import { cropToLength } from "../Common/Helpers.fs.js";
import { Option, button } from "../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { emptyRefreshSVG, refreshSvg, simulationNumberStyle, simulationBitStyle } from "./Style.fs.js";
import { Text_span, Common_GenericOption, Modifier_IModifier, TextWeight_Option, Text_p, Color_IColor } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import { input } from "../fable_modules/Fulma.2.16.0/Elements/Form/./Input.fs.js";
import { Option as Option_1, IInputType } from "../fable_modules/Fulma.2.16.0/Elements/Form/Input.fs.js";
import { getIntEventValue, getTextEventValue } from "../Interface/JSHelpers.fs.js";
import { HTMLAttr, DOMAttr } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import * as react_1 from "react";
import { dataTooltip } from "../fable_modules/Fulma.Extensions.Wikiki.Tooltip.3.0.0/Tooltip.fs.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { updateAllMemoryComps, baseSelector, openMemoryDiffViewer } from "./MemoryEditorView.fs.js";
import { getPortPos } from "../DrawBlock/Symbol.fs.js";
import { getPortName } from "../Simulator/CanvasStateAnalyser.fs.js";
import { Constants_maxStepsOverflow, Constants_maxLastClk, getWSModel, removeAllSimulationsFromModel, getCurrFile, tryGetLoadedComponents } from "./ModelHelpers.fs.js";
import { Option as Option_2, h5 } from "../fable_modules/Fulma.2.16.0/Elements/Heading.fs.js";
import { Cmd_batch, Cmd_OfAsyncWith_perform } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { Cmd_OfFunc_result } from "../fable_modules/Fable.Elmish.3.1.0/./cmd.fs.js";
import { min } from "../fable_modules/fable-library.4.1.4/Double.js";
import { op_UnaryNegation_Int32 } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { simTrace } from "../Simulator/Runner.fs.js";
import { dialogPopupRefresh, dialogPopup } from "../DrawBlock/PopupHelpers.fs.js";
import { extractConnections } from "../DrawBlock/BusWire.fs.js";
import { extractComponents } from "../DrawBlock/SymbolUpdate.fs.js";

export const Constants_maxArraySize = 550;

export const Constants_boxMaxChars = 34;

export const Constants_ncPortDist = 30;

/**
 * save verilog file
 * TODO: the simulation error display here is shared with step simulation and also waveform simulation -
 * maybe it should be a subfunction.
 */
export function verilogOutput(vType, model, dispatch) {
    let tupledArg;
    toConsole(printf("Verilog output"));
    const matchValue = updateProjectFromCanvas(model, dispatch);
    if (matchValue != null) {
        const state = DrawModelType_SheetT_Model__Model_GetCanvasState(model.Sheet);
        const proj = matchValue;
        if (model.UIState == null) {
            const _arg = startCircuitSimulation(2, proj.OpenFileName, state[0], state[1], proj.LoadedComponents);
            if (_arg.tag === 1) {
                const simError = _arg.fields[0];
                toConsole(`Error in simulation prevents verilog output ${errMsg(simError.ErrType)}`);
                dispatch(new Msg(28, [new RightTab(2, [])]));
                if (simError.InDependency == null) {
                    dispatch((tupledArg = [simError.ComponentsAffected, simError.ConnectionsAffected], new Msg(30, [tupledArg[0], tupledArg[1]])));
                }
                dispatch(new Msg(8, [new FSharpResult$2(1, [simError])]));
            }
            else {
                const sim = _arg.fields[0];
                const path = pathJoin([proj.ProjectPath, proj.OpenFileName + ".v"]);
                toConsole(printf("writing %s"))(proj.ProjectPath);
                displayAlertOnError(dispatch, (() => {
                    try {
                        const code = getVerilog(vType, sim.FastSim, new CompilationProfile(0, []));
                        return writeFile(path, code);
                    }
                    catch (e) {
                        toConsole(`Error in Verilog output: ${e.message}`);
                        return new FSharpResult$2(1, [e.message]);
                    }
                })());
                dispatch(new Msg(28, [new RightTab(2, [])]));
                const note = successSimulationNotification(`verilog output written to file ${path}`);
                dispatch(new Msg(59, [note]));
            }
        }
    }
}

export function setFastSimInputsToDefault(fs) {
    iterate((tupledArg_1) => {
        const cid_3 = tupledArg_1[0];
        const wire = tupledArg_1[1];
        changeInput(cid_3, new FSInterface(0, [wire]), 0, fs);
    }, map((tupledArg) => {
        const _arg_1 = tupledArg[1];
        const w_1 = _arg_1[1][0] | 0;
        const defaultVal = _arg_1[1][1];
        const cid_2 = _arg_1[0];
        if (defaultVal == null) {
            return [cid_2, convertIntToFastData(w_1, 0)];
        }
        else {
            const defaultVal_1 = defaultVal | 0;
            return [cid_2, convertInt64ToFastData(w_1, toInt64(fromInt32(defaultVal_1)))];
        }
    }, toList(map_1((cid_1, fc_1) => {
        let matchValue_1, w, defVal;
        return [cid_1[0], (matchValue_1 = fc_1.FType, (matchValue_1.tag === 0) ? ((w = (matchValue_1.fields[0] | 0), (defVal = matchValue_1.fields[1], [w, defVal]))) : toFail(printf("What? Impossible")))];
    }, filter((cid, fc) => {
        if (equals(fc.AccessPath, empty())) {
            if (fc.FType.tag === 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }, fs.FComps)))));
}

export function InputDefaultsEqualInputs(fs, model, clocktick) {
    const tick = clocktick | 0;
    return forAll((x) => x, values(map_1((fid, fc_1) => {
        const cid_1 = fid[0];
        if (containsKey(cid_1, Optic_Get_op_HatDot_Z146BA564(new Optic_Get(), SheetT_symbols_)(model.Sheet))) {
            const newDefault = ((fc_1.Outputs[0].Width > 32) ? convertBigIntToInt32(fc_1.Outputs[0].BigIntStep[tick % fs.MaxArraySize]) : ~~fc_1.Outputs[0].UInt32Step[tick % fs.MaxArraySize]) | 0;
            const typ = Optic_Get_op_HatDot_Z146BA564(new Optic_Get(), SheetT_symbolOf_(cid_1))(model.Sheet).Component.Type;
            let matchResult, d;
            if (typ.tag === 0) {
                if (typ.fields[1] != null) {
                    matchResult = 0;
                    d = typ.fields[1];
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
                    return d === newDefault;
                default:
                    return newDefault === 0;
            }
        }
        else {
            return true;
        }
    }, filter((cid, fc) => {
        if (equals(fc.AccessPath, empty())) {
            if (fc.FType.tag === 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }, fs.FComps))));
}

export function InputDefaultsEqualInputsRefresh(fs, model) {
    const tick = fs.ClockTick | 0;
    return forAll((x_2) => x_2, values(map_1((fid, fc_1) => {
        let d;
        const cid_1 = fid[0];
        if (containsKey(cid_1, Optic_Get_op_HatDot_Z146BA564(new Optic_Get(), SheetT_symbols_)(model.Sheet))) {
            const typ = Optic_Get_op_HatDot_Z146BA564(new Optic_Get(), SheetT_symbolOf_(cid_1))(model.Sheet).Component.Type;
            const currdefault = ((typ.tag === 0) ? ((typ.fields[1] != null) ? ((d = (typ.fields[1] | 0), d)) : 0) : 0) | 0;
            const outputarray = (fc_1.Outputs[0].Width > 32) ? map_2(convertBigIntToInt32, fc_1.Outputs[0].BigIntStep, Int32Array) : map_2((x_1) => ~~x_1, fc_1.Outputs[0].UInt32Step, Int32Array);
            const slicedArray = getSubArray(outputarray, 0, (tick + 1) % fs.MaxArraySize);
            const areAllElementsSame = (arr) => {
                let n_1;
                if ((n_1 = (tick | 0), n_1 < 2)) {
                    const n_2 = tick | 0;
                    return true;
                }
                else {
                    return arr.every((elem) => (elem === currdefault));
                }
            };
            return areAllElementsSame(slicedArray);
        }
        else {
            return true;
        }
    }, filter((cid, fc) => {
        if (equals(fc.AccessPath, empty())) {
            if (fc.FType.tag === 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }, fs.FComps))));
}

export function setInputDefaultsFromInputs(fs, dispatch, clocktick) {
    const setInputDefault = (newDefault, sym) => {
        const comp = sym.Component;
        let comp$0027;
        let ct;
        const matchValue = comp.Type;
        if (matchValue.tag === 0) {
            const w = matchValue.fields[0] | 0;
            const defVal = matchValue.fields[1];
            ct = (new ComponentType(0, [w, newDefault]));
        }
        else {
            const x = matchValue;
            ct = x;
        }
        comp$0027 = (new Component(comp.Id, ct, comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo));
        return new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, comp$0027, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
    };
    const tick = clocktick | 0;
    map_1((fid, fc_1) => {
        let f_2, f, updateFn;
        const cid_1 = fid[0];
        const newDefault_1 = ((fc_1.Outputs[0].Width > 32) ? convertBigIntToInt32(fc_1.Outputs[0].BigIntStep[tick % fs.MaxArraySize]) : ~~fc_1.Outputs[0].UInt32Step[tick % fs.MaxArraySize]) | 0;
        dispatch(new Msg(36, [(f_2 = ((f = ((updateFn = curry2(setInputDefault)(newDefault_1), (model) => {
            const compId = cid_1;
            const model_1 = model;
            return new SymbolT_Model(FSharpMap__Add(model_1.Symbols, compId, updateFn(FSharpMap__get_Item(model_1.Symbols, compId))), model_1.CopiedSymbols, model_1.Ports, model_1.InputPortsConnected, model_1.OutputPortsConnected, model_1.Theme, model_1.HintPane);
        })), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SheetT_symbol_)(f))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), sheet_)(f_2))]));
    }, filter((cid, fc) => {
        if (equals(fc.AccessPath, empty())) {
            if (fc.FType.tag === 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }, fs.FComps));
}

export class SimCache extends Record {
    constructor(Name, ClockTickRefresh, RestartSim, StoredState, StoredResult) {
        super();
        this.Name = Name;
        this.ClockTickRefresh = (ClockTickRefresh | 0);
        this.RestartSim = RestartSim;
        this.StoredState = StoredState;
        this.StoredResult = StoredResult;
    }
}

export function SimCache_$reflection() {
    return record_type("SimulationView.SimCache", [], SimCache, () => [["Name", string_type], ["ClockTickRefresh", int32_type], ["RestartSim", bool_type], ["StoredState", list_type(LoadedComponent_$reflection())], ["StoredResult", union_type("Microsoft.FSharp.Core.FSharpResult`2", [SimulationData_$reflection(), SimulationError_$reflection()], FSharpResult$2, () => [[["ResultValue", SimulationData_$reflection()]], [["ErrorValue", SimulationError_$reflection()]]])]]);
}

export function simCacheInit() {
    return new SimCache("", 0, false, empty(), new FSharpResult$2(0, [new SimulationData((toConsole(printf("Creating cache")), simulationPlaceholder), empty_1({
        Compare: compare,
    }), empty(), empty(), false, new NumberBase(0, []), 0)]));
}

export let simCache = createAtom(simCacheInit());

export function cacheIsEqual(cache, ldcs) {
    const matchValue = cache.StoredResult;
    if (matchValue.tag === 0) {
        const fs = matchValue.fields[0].FastSim;
        return forAll_1((ldc$0027) => equals(true, map_3((ldc) => loadedComponentIsEqual(ldc$0027, ldc), tryFind((ldc$0027$0027) => (ldc$0027$0027.Name === ldc$0027.Name), ldcs))), fs.SimulatedCanvasState);
    }
    else {
        return false;
    }
}

export function storedstateisEqual(cache, ldcs) {
    const matchValue = cache.StoredState;
    if (isEmpty(matchValue)) {
        return false;
    }
    else {
        const ldcsstate = matchValue;
        return forAll_1((ldc$0027) => equals(true, map_3((ldc) => loadedComponentIsEqualExInputDefault(ldc$0027, ldc), tryFind((ldc$0027$0027) => (ldc$0027$0027.Name === ldc$0027.Name), ldcs))), ldcsstate);
    }
}

/**
 * Start up a simulation, doing all necessary checks and generating simulation errors
 * if necesary. The code to do this is quite long so results are memoized.
 */
export function prepareSimulationMemoized(simulationArraySize, openFileName, diagramName, canvasState_, canvasState__1, loadedDependencies) {
    const canvasState = [canvasState_, canvasState__1];
    let storedArraySize;
    const matchValue = simCache().StoredResult;
    if (matchValue.tag === 0) {
        const sd = matchValue.fields[0];
        storedArraySize = sd.FastSim.MaxArraySize;
    }
    else {
        storedArraySize = 0;
    }
    const ldcs = addStateToLoadedComponents(openFileName, canvasState[0], canvasState[1], loadedDependencies);
    const isSame = ((storedArraySize === simulationArraySize) && (diagramName === simCache().Name)) && cacheIsEqual(simCache(), ldcs);
    if (isSame) {
        return [simCache().StoredResult, canvasState];
    }
    else {
        toConsole(printf("New simulation"));
        const patternInput = getStateAndDependencies(diagramName, ldcs);
        const state = patternInput[1];
        const name = patternInput[0];
        const ldcs_1 = patternInput[2];
        const simResult = startCircuitSimulation(simulationArraySize, diagramName, state[0], state[1], ldcs_1);
        simCache(new SimCache(diagramName, simCache().ClockTickRefresh, simCache().RestartSim, simCache().StoredState, simCache().StoredResult));
        simCache(new SimCache(simCache().Name, simCache().ClockTickRefresh, simCache().RestartSim, simCache().StoredState, simResult));
        return [simResult, canvasState];
    }
}

export function makeDummySimulationError(msg) {
    return new SimulationError(new SimulationErrorType(20, [msg]), void 0, empty(), empty());
}

export function simReset(dispatch) {
    dispatch(new Msg(60, []));
    dispatch(new Msg(67, []));
    dispatch(new Msg(1, [new SheetT_Msg(26, [])]));
    dispatch(new Msg(5, [new JSDiagramMsg(3, [void 0])]));
}

/**
 * Start simulating the current Diagram.
 * Return SimulationData that can be used to extend the simulation
 * as needed, or error if simulation fails.
 * Note that simulation is only redone if current canvas changes.
 */
export function simulateModel(simulatedSheet, simulationArraySize, openSheetCanvasState_, openSheetCanvasState__1, model) {
    let tupledArg;
    const openSheetCanvasState = [openSheetCanvasState_, openSheetCanvasState__1];
    const start = getTimeMs();
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        const canvasState = openSheetCanvasState;
        const simSheet = defaultArg(simulatedSheet, project.OpenFileName);
        const otherComponents = filter_1((comp) => (comp.Name !== project.OpenFileName), project.LoadedComponents);
        return instrumentInterval("MakeSimData", start, (tupledArg = canvasState, prepareSimulationMemoized(simulationArraySize, project.OpenFileName, simSheet, tupledArg[0], tupledArg[1], otherComponents)));
    }
    else {
        return [new FSharpResult$2(1, [makeDummySimulationError("What - Internal Simulation Error starting simulation - I don\'t think this can happen!")]), openSheetCanvasState];
    }
}

export function changeBase(dispatch, numBase) {
    return dispatch(new Msg(23, [numBase]));
}

function splittedLine(leftContent, rightConent) {
    return level(singleton(new Level_Option(0, [singleton(["style", {
        marginBottom: "10px",
    }])])), ofArray([left_1(empty(), singleton(item(empty(), singleton(leftContent)))), right_1(empty(), singleton(item(empty(), singleton(rightConent))))]));
}

/**
 * Pretty print a label with its width.
 */
export function makeIOLabel(label, width) {
    const label_1 = cropToLength(15, true, label);
    if (width === 1) {
        return label_1;
    }
    else {
        const w = width | 0;
        return toText(printf("%s (%d bits)"))(label_1)(w);
    }
}

function viewSimulationInputs(numberBase, simulationData, inputs, dispatch) {
    const simulationGraph = simulationData.Graph;
    const makeInputLine = (tupledArg) => {
        const _arg = tupledArg[0];
        const inputVals = tupledArg[1];
        const width = _arg[2] | 0;
        const inputLabel = _arg[1];
        const inputId = _arg[0];
        let valueHandle;
        let matchResult, bit, bits;
        if (inputVals.tag === 1) {
            matchResult = 2;
        }
        else if (inputVals.fields[0].Dat.tag === 0) {
            if (inputVals.fields[0].Width === 1) {
                matchResult = 0;
                bit = inputVals.fields[0].Dat.fields[0];
            }
            else {
                matchResult = 1;
                bits = inputVals.fields[0];
            }
        }
        else {
            matchResult = 1;
            bits = inputVals.fields[0];
        }
        switch (matchResult) {
            case 0: {
                valueHandle = button(ofArray([new Option(17, [singleton(simulationBitStyle)]), (bit === 0) ? (new Option(0, [new Color_IColor(16, [])])) : (new Option(0, [new Color_IColor(4, [])])), new Option(10, [false]), new Option(18, [(_arg_1) => {
                    const newBit = 1 - bit;
                    const graph = simulationGraph;
                    changeInput(inputId, new FSInterface(0, [new FastData(new FastBits(0, [newBit]), 1)]), simulationData.ClockTickNumber, simulationData.FastSim);
                    dispatch(new Msg(22, [graph, simulationData.FastSim]));
                }])]), singleton(bitToString((bit === 0) ? (new Bit(0, [])) : (new Bit(1, [])))));
                break;
            }
            case 1: {
                const defValue = fastDataToPaddedString(Constants_boxMaxChars, numberBase, bits);
                valueHandle = input(ofArray([new Option_1(1, [new IInputType(0, [])]), new Option_1(9, [toString(numberBase)]), new Option_1(10, [defValue]), new Option_1(15, [ofArray([simulationNumberStyle, new DOMAttr(9, [(arg) => {
                    const matchValue = strToIntCheckWidth(width, getTextEventValue(arg));
                    if (matchValue.tag === 0) {
                        const num = matchValue.fields[0];
                        const bits_1 = convertInt64ToFastData(width, num);
                        dispatch(new Msg(60, []));
                        const graph_1 = simulationGraph;
                        changeInput(inputId, new FSInterface(0, [bits_1]), simulationData.ClockTickNumber, simulationData.FastSim);
                        dispatch(new Msg(22, [graph_1, simulationData.FastSim]));
                    }
                    else {
                        const err = matchValue.fields[0];
                        const note = errorPropsNotification(err);
                        dispatch(new Msg(59, [note]));
                    }
                }])])])]));
                break;
            }
            default:
                valueHandle = toFail(printf("what? Algebra in Step Simulation (not yet implemented)"));
        }
        return splittedLine(makeIOLabel(inputLabel, width), valueHandle);
    };
    const children = map(makeInputLine, inputs);
    return react_1.createElement("div", {}, ...children);
}

function staticBitButton(bit) {
    return button(ofArray([new Option(17, [singleton(simulationBitStyle)]), (bit.tag === 1) ? (new Option(0, [new Color_IColor(4, [])])) : (new Option(0, [new Color_IColor(16, [])])), new Option(10, [false]), new Option(16, [true])]), singleton(bitToString(bit)));
}

function staticNumberBox(maxChars, numBase, bits) {
    const value = fastDataToPaddedString(maxChars, numBase, bits);
    return input(ofArray([new Option_1(1, [new IInputType(0, [])]), new Option_1(5, [true]), new Option_1(8, [value]), new Option_1(15, [singleton(simulationNumberStyle)])]));
}

function viewSimulationOutputs(numBase, simOutputs) {
    const makeOutputLine = (tupledArg) => {
        let b, bits;
        const _arg = tupledArg[0];
        const inputVals = tupledArg[1];
        const width = _arg[2] | 0;
        const outputLabel = _arg[1];
        const valueHandle = (inputVals.tag === 1) ? toFail(printf("what? Algebra in Step Simulation (not yet implemented)")) : ((inputVals.fields[0].Dat.tag === 0) ? ((inputVals.fields[0].Width === 1) ? ((b = inputVals.fields[0].Dat.fields[0], staticBitButton((b === 0) ? (new Bit(0, [])) : (new Bit(1, []))))) : ((bits = inputVals.fields[0], staticNumberBox(Constants_boxMaxChars, numBase, bits)))) : ((bits = inputVals.fields[0], staticNumberBox(Constants_boxMaxChars, numBase, bits))));
        return splittedLine(makeIOLabel(outputLabel, width), valueHandle);
    };
    const children = map(makeOutputLine, simOutputs);
    return react_1.createElement("div", {}, ...children);
}

function viewViewers(numBase, simViewers) {
    const makeViewerOutputLine = (tupledArg) => {
        let b, bits;
        const _arg = tupledArg[0];
        const width = tupledArg[1] | 0;
        const inputVals = tupledArg[2];
        const label = _arg[0];
        const fullName = _arg[1];
        const valueHandle = (inputVals.tag === 1) ? toFail(printf("what? Algebra in Step Simulation (not yet implemented)")) : ((inputVals.fields[0].Dat.tag === 0) ? ((inputVals.fields[0].Width === 1) ? ((b = inputVals.fields[0].Dat.fields[0], staticBitButton((b === 0) ? (new Bit(0, [])) : (new Bit(1, []))))) : ((bits = inputVals.fields[0], staticNumberBox(Constants_boxMaxChars, numBase, bits)))) : ((bits = inputVals.fields[0], staticNumberBox(Constants_boxMaxChars, numBase, bits))));
        const addToolTip = (tip, react) => {
            const props = [new HTMLAttr(64, [`${"tooltip"} has-tooltip-right`]), dataTooltip(tip)];
            return react_1.createElement("div", keyValueList(props, 1), react);
        };
        let line;
        const r = makeIOLabel(label, width);
        line = ((fullName !== "") ? addToolTip(fullName, r) : r);
        return splittedLine(line, valueHandle);
    };
    const children_2 = map(makeViewerOutputLine, simViewers);
    return react_1.createElement("div", {}, ...children_2);
}

function viewStatefulComponents(step, comps, numBase, model, dispatch) {
    const getWithDefault = (lab) => {
        if (lab === "") {
            return "no-label";
        }
        else {
            return lab;
        }
    };
    const makeStateLine = (_arg) => {
        let fd;
        const state = _arg[1];
        const fc = _arg[0];
        const label = getWithDefault(fc.FullName);
        switch (state.tag) {
            case 2:
                if ((fd = state.fields[0], fd.Width === 1)) {
                    const fd_1 = state.fields[0];
                    const bit = equals(fd_1, fastDataZero) ? (new Bit(0, [])) : (new Bit(1, []));
                    const label_1 = toText(printf("DFF: %s"))(label);
                    return singleton(splittedLine(label_1, staticBitButton(bit)));
                }
                else {
                    const bits = state.fields[0];
                    const label_2 = toText(printf("Register: %s (%d bits)"))(label)(bits.Width);
                    return singleton(splittedLine(label_2, staticNumberBox(Constants_boxMaxChars, numBase, bits)));
                }
            case 3: {
                const mem = state.fields[0];
                const label_3 = toText(printf("RAM: %s"))(label);
                const initialMem = (compType) => {
                    let matchResult, m;
                    switch (compType.tag) {
                        case 41: {
                            matchResult = 0;
                            m = compType.fields[0];
                            break;
                        }
                        case 42: {
                            matchResult = 0;
                            m = compType.fields[0];
                            break;
                        }
                        default:
                            matchResult = 1;
                    }
                    switch (matchResult) {
                        case 0:
                            return m;
                        default:
                            return toFail(printf("what? viewStatefulComponents expected RAM component but got: %A"))(compType);
                    }
                };
                const viewDiffBtn = button(ofArray([new Option(17, [singleton(simulationBitStyle)]), new Option(0, [new Color_IColor(4, [])]), new Option(18, [(_arg_1) => {
                    openMemoryDiffViewer(initialMem(fc.FType), mem, model, dispatch);
                }])]), singleton("View"));
                return singleton(splittedLine(label_3, viewDiffBtn));
            }
            default:
                return empty();
        }
    };
    const children = collect(makeStateLine, comps);
    return react_1.createElement("div", {}, ...children);
}

export function getSimErrFeedbackMessages(simError, model) {
    if (simError.InDependency == null) {
        const badConns = simError.ConnectionsAffected;
        const badComps = simError.ComponentsAffected;
        const msgs = singleton(new Msg(30, [badComps, badConns]));
        if (!isAllVisible(model.Sheet, badConns, badComps)) {
            return append(msgs, singleton(new Msg(1, [new SheetT_Msg(2, [new SheetT_KeyboardMsg(6, [])])])));
        }
        else {
            return msgs;
        }
    }
    else {
        return empty();
    }
}

export function setSimErrorFeedback(simError, model, dispatch) {
    iterate(dispatch, getSimErrFeedbackMessages(simError, model));
}

/**
 * get the position and rotation for inserting a new component next to the given port
 * at a given distance
 * the rotation is such that the original left side of the component (input side)
 * faces the given port
 * returns None if another symbol is in the way
 */
export function getPosRotNextToPort(port, model, dist) {
    let list_2;
    const isPosInBoundingBox = (pos, boundingBox) => {
        if (((pos.X > boundingBox.TopLeft.X) && (pos.X < (boundingBox.TopLeft.X + boundingBox.W))) && (pos.Y > boundingBox.TopLeft.Y)) {
            return pos.Y < (boundingBox.TopLeft.Y + boundingBox.H);
        }
        else {
            return false;
        }
    };
    let sym_2;
    const _arg_1 = tryFind((tupledArg) => {
        const sym = tupledArg[1];
        return sym.Component.Id === port.HostId;
    }, toList(model.Symbols));
    if (_arg_1 == null) {
        sym_2 = toFail(printf("The given component should be in the list of symbols"));
    }
    else {
        const sym_1 = _arg_1[1];
        sym_2 = sym_1;
    }
    const edge = FSharpMap__get_Item(sym_2.PortMaps.Orientation, port.Id);
    const portPos = getPortPos(sym_2, port);
    const patternInput = (edge.tag === 0) ? [new XYPos(sym_2.Pos.X + portPos.X, (sym_2.Pos.Y + portPos.Y) - dist), new Rotation(1, [])] : ((edge.tag === 2) ? [new XYPos((sym_2.Pos.X + portPos.X) - dist, sym_2.Pos.Y + portPos.Y), new Rotation(2, [])] : ((edge.tag === 1) ? [new XYPos(sym_2.Pos.X + portPos.X, (sym_2.Pos.Y + portPos.Y) + dist), new Rotation(3, [])] : [new XYPos((sym_2.Pos.X + portPos.X) + dist, sym_2.Pos.Y + portPos.Y), new Rotation(0, [])]));
    const rot = patternInput[1];
    const pos_1 = patternInput[0];
    if ((list_2 = map((tupledArg_1) => {
        let left, right;
        const sym_3 = tupledArg_1[1];
        const sym_4 = sym_3;
        let patternInput_1;
        const sym_5 = sym_4;
        const comp = sym_5.Component;
        const matchValue = defaultArg(sym_5.HScale, 1);
        const vS = defaultArg(sym_5.VScale, 1);
        const hS = matchValue;
        const matchValue_2 = sym_5.STransform.Rotation;
        switch (matchValue_2.tag) {
            case 1:
            case 3: {
                patternInput_1 = [comp.W * hS, comp.H * vS];
                break;
            }
            default:
                patternInput_1 = [comp.H * vS, comp.W * hS];
        }
        const w = patternInput_1[1];
        const h = patternInput_1[0];
        if (equals(sym_4.Annotation, new SymbolT_Annotation(0, []))) {
            return new BoundingBox((left = sym_4.Pos, (right = (new XYPos(9, 9)), new XYPos(left.X - right.X, left.Y - right.Y))), 17, 17);
        }
        else {
            return new BoundingBox(sym_4.Pos, w, h);
        }
    }, toList(model.Symbols)), exists(curry2(isPosInBoundingBox)(pos_1), list_2))) {
        return void 0;
    }
    else {
        return [pos_1, rot];
    }
}

export function viewSimulationError(comps, conns, simError, model, simType, dispatch) {
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const busWireDispatch = (bMsg) => {
        sheetDispatch(new SheetT_Msg(0, [bMsg]));
    };
    const symbolDispatch = (symMsg) => {
        busWireDispatch(new BusWireT_Msg(0, [symMsg]));
    };
    const changeAdderType = (compId, targetType) => {
        DrawModelType_SheetT_Model__Model_ChangeAdderComp(model.Sheet, sheetDispatch, compId, targetType);
    };
    const changeCounterType = (compId_1, targetType_1) => {
        DrawModelType_SheetT_Model__Model_ChangeCounterComp(model.Sheet, sheetDispatch, compId_1, targetType_1);
    };
    const getComponentById = (compId_2) => defaultArgWith(tryFind((comp) => (comp.Id === compId_2), comps), () => {
        throw new Error("viewSimulationError: given component ID does not exist");
    });
    const getComponentByIdListOpt = (compId_3) => {
        const _arg_1 = tryFind((comp_1) => (comp_1.Id === compId_3), comps);
        if (_arg_1 == null) {
            toConsole(printf("Warning: errored component from simulation is missing - it will be ignored"));
            return empty();
        }
        else {
            const comp_2 = _arg_1;
            return singleton(comp_2);
        }
    };
    const getConnectionById = (connId) => defaultArgWith(tryFind((conn) => (conn.Id === connId), conns), () => {
        throw new Error("viewSimulationError: given connection ID does not exist");
    });
    const getConnectionByIdLstOpt = (connId_1) => {
        const _arg_3 = tryFind((conn_1) => (conn_1.Id === connId_1), conns);
        if (_arg_3 == null) {
            toConsole(printf("Warning: errored connection from simulation is missing - it will be ignored"));
            return empty();
        }
        else {
            const comp_3 = _arg_3;
            return singleton(comp_3);
        }
    };
    const reacListOfCompsAffected = map((comp_4) => react_1.createElement("li", {}, comp_4.Label), collect(getComponentByIdListOpt, simError.ComponentsAffected));
    const getCompAndPortAffectedMsg = (comp_5, port) => ((comp_5.Label + ".") + getPortName(comp_5, port));
    const cleanup = () => {
        simReset(dispatch);
        dispatch(new Msg(21, [simType]));
    };
    let error;
    const comps_1 = collect(getComponentByIdListOpt, simError.ComponentsAffected);
    const matchValue = simError.ErrType;
    let matchResult, comp_6, port_1, rmInfo, comp_7, port_2, rmInfo_1;
    if (!isEmpty(comps_1)) {
        if (isEmpty(tail(comps_1))) {
            switch (matchValue.tag) {
                case 12: {
                    if (matchValue.fields[0] === 0) {
                        matchResult = 0;
                        comp_6 = head(comps_1);
                        port_1 = matchValue.fields[1];
                        rmInfo = matchValue.fields[2];
                    }
                    else {
                        matchResult = 3;
                    }
                    break;
                }
                case 11: {
                    if (matchValue.fields[0] === 0) {
                        matchResult = 1;
                        comp_7 = head(comps_1);
                        port_2 = matchValue.fields[1];
                        rmInfo_1 = matchValue.fields[2];
                    }
                    else {
                        matchResult = 3;
                    }
                    break;
                }
                case 18: {
                    matchResult = 2;
                    break;
                }
                default:
                    matchResult = 3;
            }
        }
        else if (matchValue.tag === 18) {
            matchResult = 2;
        }
        else {
            matchResult = 3;
        }
    }
    else if (matchValue.tag === 18) {
        matchResult = 2;
    }
    else {
        matchResult = 3;
    }
    switch (matchResult) {
        case 0: {
            let buttonOrText;
            if (rmInfo.tag === 0) {
                const _arg_5 = getPosRotNextToPort(port_1, model.Sheet.Wire.Symbol, Constants_ncPortDist);
                if (_arg_5 == null) {
                    buttonOrText = "Please insert a \'Not Connected\' component manually";
                }
                else {
                    const rot = _arg_5[1];
                    const pos = _arg_5[0];
                    const addNCComp = () => {
                        sheetDispatch(new SheetT_Msg(10, [tryGetLoadedComponents(model), port_1, pos, rot]));
                        cleanup();
                    };
                    buttonOrText = button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_6) => {
                        addNCComp();
                    }])]), singleton("Fix by adding \'Not Connected\' component"));
                }
            }
            else {
                const targetType_2 = rmInfo.fields[0];
                const deletePort = () => {
                    changeAdderType(comp_6.Id, targetType_2);
                    cleanup();
                };
                buttonOrText = button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_4) => {
                    deletePort();
                }])]), singleton("Fix by deleting the port on the component"));
            }
            const children_2 = [errMsg(simError.ErrType), react_1.createElement("br", {}), react_1.createElement("br", {}), getCompAndPortAffectedMsg(comp_6, port_1), react_1.createElement("br", {}), buttonOrText];
            error = react_1.createElement("div", {}, ...children_2);
            break;
        }
        case 1: {
            const compAndPortAffectedMsg = (comp_7.Label + ".") + getPortName(comp_7, port_2);
            const compId_4 = comp_7.Id;
            const removeInPorts = () => {
                if (rmInfo_1.tag === 0) {
                    toFail(printf("This function should never be called if not input ports can be removed"));
                }
                else {
                    const targetType_3 = rmInfo_1.fields[0];
                    switch (targetType_3.tag) {
                        case 17:
                        case 18:
                        case 19:
                        case 20: {
                            changeAdderType(compId_4, targetType_3);
                            break;
                        }
                        case 35:
                        case 37:
                        case 36:
                        case 38: {
                            changeCounterType(compId_4, targetType_3);
                            break;
                        }
                        default:
                            0;
                    }
                }
                simReset(dispatch);
                dispatch(new Msg(21, [simType]));
            };
            const showButton = !(rmInfo_1.tag === 0);
            const children_4 = toList_1(delay(() => append_1(singleton_1(errMsg(simError.ErrType)), delay(() => append_1(singleton_1(react_1.createElement("br", {})), delay(() => append_1(singleton_1(react_1.createElement("br", {})), delay(() => append_1(singleton_1(getCompAndPortAffectedMsg(comp_7, port_2)), delay(() => append_1(singleton_1(react_1.createElement("br", {})), delay(() => (showButton ? singleton_1(button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_7) => {
                removeInPorts();
            }])]), singleton("Fix by deleting input port"))) : empty_2())))))))))))));
            error = react_1.createElement("div", {}, ...children_4);
            break;
        }
        case 2: {
            const removeNCAndChangeAdderType = () => {
                const NCsToDelete = map((conn_2) => conn_2.Target.HostId, collect((_arg_8) => {
                    const cid = _arg_8;
                    return getConnectionByIdLstOpt(cid);
                }, simError.ConnectionsAffected));
                symbolDispatch(new SymbolT_Msg(3, [NCsToDelete]));
                busWireDispatch(new BusWireT_Msg(4, [simError.ConnectionsAffected]));
                iterate((comp_8) => {
                    const matchValue_2 = comp_8.Type;
                    switch (matchValue_2.tag) {
                        case 17: {
                            const w = matchValue_2.fields[0] | 0;
                            changeAdderType(comp_8.Id, new ComponentType(19, [w]));
                            break;
                        }
                        case 18: {
                            const w_1 = matchValue_2.fields[0] | 0;
                            changeAdderType(comp_8.Id, new ComponentType(20, [w_1]));
                            break;
                        }
                        default:
                            toFail(printf("Unexpected adder type. Should only encounter these 2 types with this error message"));
                    }
                }, collect(getComponentByIdListOpt, simError.ComponentsAffected));
                simReset(dispatch);
                dispatch(new Msg(21, [simType]));
            };
            const children_8 = [errMsg(simError.ErrType), react_1.createElement("br", {}), react_1.createElement("br", {}), react_1.createElement("ul", {}, ...reacListOfCompsAffected), react_1.createElement("br", {}), button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_9) => {
                removeNCAndChangeAdderType();
            }])]), singleton("Fix by deleting unnecessary \'Not Connected\' components"))];
            error = react_1.createElement("div", {}, ...children_8);
            break;
        }
        default: {
            const matchValue_3 = simError.InDependency;
            if (matchValue_3 != null) {
                const dep = matchValue_3;
                const children_12 = [("Error found in sheet \'" + dep) + "\' which is a dependency:", react_1.createElement("br", {}), errMsg(simError.ErrType), react_1.createElement("br", {}), "Please fix the error in this sheet and retry."];
                error = react_1.createElement("div", {}, ...children_12);
            }
            else {
                const children_10 = [errMsg(simError.ErrType), react_1.createElement("br", {}), "Please fix the error and retry."];
                error = react_1.createElement("div", {}, ...children_10);
            }
        }
    }
    const children_14 = [h5(singleton(new Option_2(9, [singleton(["style", {
        marginTop: "15px",
    }])])))(singleton("Errors")), error];
    return react_1.createElement("div", {}, ...children_14);
}

function simulationClockChangePopup(simData, dispatch, model$0027) {
    let children, matchValue, n, n_1;
    const dialog = model$0027.PopupDialogData;
    const step = simData.ClockTickNumber | 0;
    const restartsimrequired = (lastStepNeeded) => ((simData.FastSim.ClockTick - lastStepNeeded) >= simData.FastSim.MaxArraySize);
    const children_2 = [(children = [`This simulation contains ${FSharpMap__get_Count(simData.FastSim.FComps)} components`], react_1.createElement("h6", {}, ...children)), (matchValue = dialog.Int, (matchValue != null) ? (((n = (matchValue | 0), restartsimrequired(n))) ? ((n_1 = (matchValue | 0), Text_p(singleton(new Common_GenericOption(2, [ofArray([new Modifier_IModifier(2, [new TextWeight_Option(3, [])]), new Modifier_IModifier(1, [new Color_IColor(8, [])])])])), singleton(`To generate data for time step ${n_1}, 
                          the hardware will be resimulated using default inputs. `)))) : Text_p(singleton(new Common_GenericOption(2, [singleton(new Modifier_IModifier(2, [new TextWeight_Option(3, [])]))])), singleton("Go to Tick:"))) : Text_p(singleton(new Common_GenericOption(2, [singleton(new Modifier_IModifier(2, [new TextWeight_Option(3, [])]))])), singleton("Go to Tick:"))), react_1.createElement("br", {}), input(ofArray([new Option_1(1, [new IInputType(7, [])]), new Option_1(15, [ofArray([new HTMLAttr(55, [true]), ["style", {
        width: "100px",
    }]])]), new Option_1(10, [toText(printf("%d"))(step)]), new Option_1(13, [(arg_6) => {
        dispatch(new Msg(46, [getIntEventValue(arg_6)]));
    }])]))];
    return react_1.createElement("div", {}, ...children_2);
}

export function simulateWithTime(timeOut, steps, simData) {
    const startTime = getTimeMs();
    runFastSimulation(void 0, steps, simData.FastSim);
    return getTimeMs() - startTime;
}

export function cmd(block) {
    return (task) => ((arg) => ((ofSuccess) => Cmd_OfAsyncWith_perform(block, task, arg, ofSuccess)));
}

export function doBatchOfMsgsAsynch(msgs) {
    return Cmd_OfFunc_result(new Msg(90, [Cmd_batch(map_4(Cmd_OfFunc_result, msgs))]));
}

export function simulateWithProgressBar(simProg, model) {
    const matchValue = model.CurrentStepSimulationStep;
    const matchValue_1 = model.PopupDialogData.Progress;
    let matchResult, barData, simData;
    if (matchValue != null) {
        const copyOfStruct = matchValue;
        if (copyOfStruct.tag === 0) {
            if (matchValue_1 != null) {
                matchResult = 0;
                barData = matchValue_1;
                simData = copyOfStruct.fields[0];
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
            const nComps = FSharpMap__get_Count(simData.FastSim.FComps);
            const oldClock = simData.FastSim.ClockTick | 0;
            const clock = min(simProg.FinalClock, simProg.ClocksPerChunk + oldClock) | 0;
            const t1 = getTimeMs();
            runFastSimulation(void 0, clock, simData.FastSim);
            toConsole(`clokctick after runFastSim ${clock} from ${oldClock} is ${simData.FastSim.ClockTick}`);
            const t2 = getTimeMs();
            const speed = (t2 === t1) ? 0 : (((clock - oldClock) * nComps) / (t2 - t1));
            const messages = ((clock - oldClock) < simProg.ClocksPerChunk) ? ofArray([new Msg(22, [simData.Graph, simData.FastSim]), new Msg(24, [clock - oldClock]), new Msg(54, [void 0])]) : ofArray([new Msg(22, [simData.Graph, simData.FastSim]), new Msg(24, [simProg.ClocksPerChunk]), new Msg(55, [(barData_1) => (new PopupProgress(clock - simProg.InitialClock, barData_1.Max, barData_1.Title, speed))]), new Msg(56, [simProg])]);
            return [model, doBatchOfMsgsAsynch(messages)];
        }
        default:
            return [model, Cmd_OfFunc_result(new Msg(54, [void 0]))];
    }
}

export function simulationClockChangeAction(dispatch, simData, model$0027) {
    let n, n_1;
    const dialog = model$0027.PopupDialogData;
    let clock_1;
    const matchValue = dialog.Int;
    if (matchValue != null) {
        const clock = matchValue | 0;
        clock_1 = clock;
    }
    else {
        clock_1 = toFail(printf("What - must have some number from dialog"));
    }
    const initClock = ((clock_1 > simData.ClockTickNumber) ? simData.ClockTickNumber : 0) | 0;
    const steps = ((clock_1 > simData.ClockTickNumber) ? (clock_1 - simData.ClockTickNumber) : clock_1) | 0;
    const numComps = FSharpMap__get_Count(simData.FastSim.FComps) | 0;
    const initChunk = min(steps, ~~(20000 / (numComps + 1))) | 0;
    const initTime = getTimeMs();
    let estimatedTime;
    const matchValue_1 = (clock_1 - simData.FastSim.ClockTick) | 0;
    if ((n = (matchValue_1 | 0), n > 0)) {
        const n_2 = matchValue_1 | 0;
        estimatedTime = ((steps / initChunk) * (simulateWithTime(void 0, initChunk + initClock, simData) + 1E-07));
    }
    else if ((n_1 = (matchValue_1 | 0), n_1 <= op_UnaryNegation_Int32(simData.FastSim.MaxArraySize))) {
        const n_3 = matchValue_1 | 0;
        estimatedTime = ((steps / initChunk) * (simulateWithTime(void 0, initChunk, simData) + 1E-07));
    }
    else {
        estimatedTime = ((steps / initChunk) * (simulateWithTime(void 0, steps, simData) + 1E-07));
    }
    const chunkTime = min(2000, estimatedTime / 5);
    const chunk = ~~((steps * chunkTime) / estimatedTime) | 0;
    if ((steps > (2 * initChunk)) && (estimatedTime > 500)) {
        toConsole(printf("test1"));
        dispatch(new Msg(54, [new PopupProgress(initChunk, steps, "running simulation...", (numComps * steps) / estimatedTime)]));
        dispatch(new Msg(90, [Cmd_batch(map_4(Cmd_OfFunc_result, [new Msg(22, [simData.Graph, simData.FastSim]), new Msg(24, [(initChunk - simData.ClockTickNumber) + initClock]), new Msg(41, []), new Msg(56, [new SimulationProgress(initChunk + initClock, clock_1, chunk)])]))]));
    }
    else {
        runFastSimulation(void 0, clock_1, simData.FastSim);
        toConsole(`test2 clock=${clock_1}, clockticknumber= ${simData.ClockTickNumber}, ${simData.FastSim.ClockTick}`);
        dispatch(new Msg(90, [Cmd_batch(map_4(Cmd_OfFunc_result, [new Msg(22, [simData.Graph, simData.FastSim]), new Msg(24, [clock_1 - simData.ClockTickNumber]), new Msg(41, [])]))]));
    }
}

function viewSimulationData(step, simData, model, dispatch) {
    const viewerWidthList = map((tupledArg) => {
        const width = tupledArg[1] | 0;
        return width | 0;
    }, extractViewers(simData));
    const outputWidthList = map((tupledArg_1) => {
        const w = tupledArg_1[2] | 0;
        return w | 0;
    }, simData.Outputs);
    const hasMultiBitOutputs = !isEmpty(map((y) => (1 > y), append(outputWidthList, viewerWidthList)));
    const maybeBaseSelector = hasMultiBitOutputs ? baseSelector(simData.NumberBase, (numBase) => {
        changeBase(dispatch, numBase);
    }) : react_1.createElement("div", {});
    let maybeClockTickBtn;
    const step_1 = simData.ClockTickNumber | 0;
    if (simData.IsSynchronous) {
        const children_4 = [button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(16, [simData.ClockTickNumber === 0]), new Option(18, [(_arg_4) => {
            if (!equals(simTrace(), void 0)) {
                toConsole(printf("*********************Incrementing clock from simulator button******************************"));
                toConsole(printf("-------------------------------------------------------------------------------------------"));
            }
            toConsole(printf("clock %d "))(simData.ClockTickNumber);
            runFastSimulation(void 0, simData.ClockTickNumber - 1, simData.FastSim);
            dispatch(new Msg(22, [simData.Graph, simData.FastSim]));
            if (!equals(simTrace(), void 0)) {
                toConsole(printf("-------------------------------------------------------------------------------------------"));
                toConsole(printf("*******************************************************************************************"));
            }
            dispatch(new Msg(24, [-1]));
        }])]), singleton("◀")), " ", " ", button(ofArray([new Option(17, [singleton(dataTooltip("Click to goto"))]), new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_5) => {
            const isDisabled = (model$0027) => {
                const dialogData = model$0027.PopupDialogData;
                const matchValue_1 = dialogData.Int;
                if (matchValue_1 == null) {
                    return true;
                }
                else {
                    const n = matchValue_1 | 0;
                    return n < 0;
                }
            };
            dialogPopup("Advance Simulation", (model$0027_1) => simulationClockChangePopup(simData, dispatch, model$0027_1), "Goto Tick", (model$0027_2) => {
                simulationClockChangeAction(dispatch, simData, model$0027_2);
            }, isDisabled, empty(), dispatch);
        }])]), singleton(toText(printf("Clock Tick %d"))(simData.ClockTickNumber))), " ", " ", button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_6) => {
            if (!equals(simTrace(), void 0)) {
                toConsole(printf("*********************Incrementing clock from simulator button******************************"));
                toConsole(printf("-------------------------------------------------------------------------------------------"));
            }
            runFastSimulation(void 0, simData.ClockTickNumber + 1, simData.FastSim);
            dispatch(new Msg(22, [simData.Graph, simData.FastSim]));
            if (!equals(simTrace(), void 0)) {
                toConsole(printf("-------------------------------------------------------------------------------------------"));
                toConsole(printf("*******************************************************************************************"));
            }
            dispatch(new Msg(24, [1]));
        }])]), singleton("▶"))];
        maybeClockTickBtn = react_1.createElement("div", {}, ...children_4);
    }
    else {
        maybeClockTickBtn = react_1.createElement("div", {});
    }
    const maybeStatefulComponents = () => {
        const stateful = ofArray(extractStatefulComponents(simData.ClockTickNumber, simData.FastSim));
        if (isEmpty(stateful)) {
            return react_1.createElement("div", {});
        }
        else {
            const children_8 = [h5(singleton(new Option_2(9, [singleton(["style", {
                marginTop: "15px",
            }])])))(singleton("Stateful components")), viewStatefulComponents(step, stateful, simData.NumberBase, model, dispatch)];
            return react_1.createElement("div", {}, ...children_8);
        }
    };
    const questionIcon = "?";
    const tip = (tipTxt, txt) => {
        const props_10 = [new HTMLAttr(64, [`${"tooltip"} ${"has-tooltip-multiline"}`]), dataTooltip(tipTxt)];
        const children_10 = [Text_span(ofArray([new Common_GenericOption(2, [singleton(new Modifier_IModifier(1, [new Color_IColor(4, [])]))]), new Common_GenericOption(1, [singleton(["style", {
            display: "inline-block",
            width: "80px",
            textAlign: "center",
        }])])]), singleton(txt))];
        return react_1.createElement("span", keyValueList(props_10, 1), ...children_10);
    };
    const children_12 = [splittedLine(maybeBaseSelector, maybeClockTickBtn), h5(singleton(new Option_2(9, [singleton(["style", {
        marginTop: "15px",
    }])])))(singleton("Inputs")), viewSimulationInputs(simData.NumberBase, simData, extractFastSimulationIOs(simData.Inputs, simData), dispatch), h5(singleton(new Option_2(9, [singleton(["style", {
        marginTop: "15px",
    }])])))(ofArray(["Outputs &", tip("Add Viewer components to any sheet in the simulation", "Viewers")])), viewViewers(simData.NumberBase, sort(extractViewers(simData), {
        Compare: compareArrays,
    })), viewSimulationOutputs(simData.NumberBase, extractFastSimulationIOs(simData.Outputs, simData)), maybeStatefulComponents()];
    return react_1.createElement("div", {}, ...children_12);
}

export function tryGetSimData(canvasState_, canvasState__1, model) {
    const canvasState = [canvasState_, canvasState__1];
    const model_1 = updateAllMemoryComps(model);
    simCache(simCacheInit());
    const _arg = simulateModel(void 0, Constants_maxArraySize, canvasState[0], canvasState[1], model_1);
    const copyOfStruct = _arg[0];
    if (copyOfStruct.tag === 1) {
        const simError = copyOfStruct.fields[0];
        const state_1 = _arg[1];
        toConsole(`ERROR:${simError}`);
        return new FSharpResult$2(1, [simError]);
    }
    else {
        const simData = copyOfStruct.fields[0];
        const state = _arg[1];
        if (simData.FastSim.ClockTick === 0) {
            setFastSimInputsToDefault(simData.FastSim);
        }
        return new FSharpResult$2(0, [simData]);
    }
}

export function viewSimulation(canvasState_, canvasState__1, model, dispatch) {
    let props_22, children_14, props_26, s_10, copyOfStruct;
    const canvasState = [canvasState_, canvasState__1];
    const startSimulation = () => {
        let _arg, simError, simData;
        dispatch(new Msg(8, [(_arg = tryGetSimData(canvasState[0], canvasState[1], model), (_arg.tag === 1) ? ((simError = _arg.fields[0], (setSimErrorFeedback(simError, model, dispatch), new FSharpResult$2(1, [simError])))) : ((simData = _arg.fields[0], new FSharpResult$2(0, [simData]))))]));
        const matchValue = model.CurrentProj;
        if (matchValue == null) {
        }
        else {
            const project = matchValue;
            const loadedDependencies = filter_1((comp) => (comp.Name !== project.OpenFileName), project.LoadedComponents);
            const ldcs = addStateToLoadedComponents(simCache().Name, canvasState[0], canvasState[1], loadedDependencies);
            simCache(new SimCache(simCache().Name, simCache().ClockTickRefresh, simCache().RestartSim, ldcs, simCache().StoredResult));
        }
    };
    const hasCanvasChanged = (currentCanvasState, simCache_1, model_1) => {
        const matchValue_1 = model_1.CurrentProj;
        if (matchValue_1 != null) {
            const project_1 = matchValue_1;
            const loadedDependencies_1 = filter_1((comp_1) => (comp_1.Name !== project_1.OpenFileName), project_1.LoadedComponents);
            const ldcs_1 = addStateToLoadedComponents(simCache_1.Name, currentCanvasState[0], currentCanvasState[1], loadedDependencies_1);
            const isSame = storedstateisEqual(simCache_1, ldcs_1);
            return !isSame;
        }
        else {
            return false;
        }
    };
    const simRes = simulateModel(void 0, Constants_maxArraySize, canvasState[0], canvasState[1], model);
    const matchValue_2 = model.CurrentStepSimulationStep;
    if (matchValue_2 != null) {
        const sim = matchValue_2;
        const canvasStateChange = hasCanvasChanged(canvasState, simCache(), model);
        let body;
        if (sim.tag === 0) {
            const simData_1 = sim.fields[0];
            if (simCache().RestartSim) {
                const clock = simData_1.ClockTickNumber | 0;
                startSimulation();
                simCache(new SimCache(simCache().Name, simCache().ClockTickRefresh, false, simCache().StoredState, simCache().StoredResult));
                simCache(new SimCache(simCache().Name, clock, simCache().RestartSim, simCache().StoredState, simCache().StoredResult));
            }
            if ((simData_1.ClockTickNumber === 0) && !(simCache().ClockTickRefresh === 0)) {
                dispatch(new Msg(24, [simCache().ClockTickRefresh]));
                runFastSimulation(void 0, simCache().ClockTickRefresh, simData_1.FastSim);
                simCache(new SimCache(simCache().Name, 0, simCache().RestartSim, simCache().StoredState, simCache().StoredResult));
            }
            body = viewSimulationData(simData_1.ClockTickNumber, simData_1, model, dispatch);
        }
        else {
            const simError_1 = sim.fields[0];
            body = viewSimulationError(canvasState[0], canvasState[1], simError_1, model, new SimSubTab(0, []), dispatch);
        }
        let setDefaultButton;
        if (sim.tag === 0) {
            const simData_2 = sim.fields[0];
            setDefaultButton = button(ofArray([new Option(0, [new Color_IColor(5, [])]), new Option(16, [InputDefaultsEqualInputs(simData_2.FastSim, model, simData_2.ClockTickNumber)]), new Option(18, [(_arg_2) => {
                setInputDefaultsFromInputs(simData_2.FastSim, dispatch, simData_2.ClockTickNumber);
            }]), new Option(17, [singleton(["style", {
                display: "inline",
                float: "right",
            }])])]), singleton("Save current input values as default"));
        }
        else {
            setDefaultButton = react_1.createElement("div", {});
        }
        const confirmRefreshPopup = (model_2, dispatch_1, simData_3, model_3) => {
            let props_12, children_6, props_10, children_4, s_4, props_14, props_18, children_10, props_16;
            const children_12 = [(props_12 = [["style", {
                height: "60px",
                display: "block",
                marginBottom: "5px",
            }]], (children_6 = [(props_10 = [["style", {
                width: "80%",
                float: "left",
            }]], (children_4 = [(s_4 = "Refresh the simulation using current values of the inputs and the latest design? \n                    The current values will be used as default for future simulations.", s_4)], react_1.createElement("h6", keyValueList(props_10, 1), ...children_4))), button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_3) => {
                toConsole(printf("did a refresh with ok"));
                setInputDefaultsFromInputs(simData_3.FastSim, dispatch_1, simData_3.ClockTickNumber);
                simCache(new SimCache(simCache().Name, simCache().ClockTickRefresh, true, simCache().StoredState, simCache().StoredResult));
                dispatch_1(new Msg(41, []));
            }]), new Option(17, [singleton(["style", {
                display: "inline",
                float: "right",
                marginTop: "10px",
            }])])]), singleton("Ok"))], react_1.createElement("div", keyValueList(props_12, 1), ...children_6))), (props_14 = [["style", {
                width: "100%",
                float: "left",
            }]], react_1.createElement("hr", keyValueList(props_14, 1))), (props_18 = [["style", {
                height: "50px",
                display: "block",
            }]], (children_10 = [(props_16 = [["style", {
                width: "80%",
                float: "left",
            }]], react_1.createElement("h6", keyValueList(props_16, 1), "Refresh the simulation using default values of inputs, current values will be lost.")), button(ofArray([new Option(0, [new Color_IColor(5, [])]), new Option(18, [(_arg_4) => {
                const clock_1 = simData_3.ClockTickNumber | 0;
                startSimulation();
                simCache(new SimCache(simCache().Name, clock_1, simCache().RestartSim, simCache().StoredState, simCache().StoredResult));
                dispatch_1(new Msg(41, []));
            }]), new Option(17, [singleton(["style", {
                display: "inline",
                float: "right",
            }])])]), singleton("Reset"))], react_1.createElement("div", keyValueList(props_18, 1), ...children_10)))];
            return react_1.createElement("div", {}, ...children_12);
        };
        const patternInput_1 = (simRes[0].tag === 1) ? [new Color_IColor(7, []), "See Problems"] : [new Color_IColor(6, []), refreshSvg("white", "20px")];
        const buttonIcon = patternInput_1[1];
        const buttonColor_1 = patternInput_1[0];
        const createRefreshButton = (buttonColor_2, buttonIcon_1, onClick) => button(ofArray([new Option(0, [buttonColor_2]), new Option(18, [onClick]), new Option(17, [singleton(["style", {
            display: "inline",
            float: "none",
            marginLeft: "5px",
        }])])]), singleton(buttonIcon_1));
        const startSimulationUpdateCache = (clock_2) => {
            startSimulation();
            simCache(new SimCache(simCache().Name, clock_2, simCache().RestartSim, simCache().StoredState, simCache().StoredResult));
        };
        const createRefreshButtonForSimData = (sim_1, model_4, dispatch_2) => {
            if (sim_1.tag === 0) {
                const simData_4 = sim_1.fields[0];
                if (InputDefaultsEqualInputsRefresh(simData_4.FastSim, model_4)) {
                    return createRefreshButton(buttonColor_1, buttonIcon, (_arg_5) => {
                        const clock_3 = simData_4.ClockTickNumber | 0;
                        startSimulationUpdateCache(clock_3);
                    });
                }
                else {
                    return createRefreshButton(buttonColor_1, buttonIcon, (_arg_6) => {
                        if (simRes[0].tag === 1) {
                            startSimulationUpdateCache(simData_4.ClockTickNumber);
                        }
                        else {
                            dialogPopupRefresh("Refresh", curry4(confirmRefreshPopup)(model_4)(dispatch_2)(simData_4), empty(), dispatch_2);
                        }
                    });
                }
            }
            else {
                return emptyRefreshSVG;
            }
        };
        const createRefreshButtonError = createRefreshButton(buttonColor_1, buttonIcon, (_arg_7) => {
            const clock_4 = simCache().ClockTickRefresh | 0;
            startSimulationUpdateCache(clock_4);
        });
        const refreshButton = canvasStateChange ? ((sim.tag === 1) ? createRefreshButtonError : createRefreshButtonForSimData(sim, model, dispatch)) : emptyRefreshSVG;
        const props_30 = [["style", {
            height: "100%",
        }]];
        const children_18 = [(props_22 = [["style", {
            height: "40px",
        }]], (children_14 = [button(ofArray([new Option(0, [new Color_IColor(8, [])]), new Option(18, [(_arg_8) => {
            simReset(dispatch);
            dispatch(new Msg(25, []));
        }]), new Option(17, [singleton(["style", {
            display: "inline",
            float: "left",
        }])])]), singleton("End simulation")), refreshButton, setDefaultButton], react_1.createElement("div", keyValueList(props_22, 1), ...children_14))), react_1.createElement("br", {}), (props_26 = [["style", {
            display: "block",
        }]], react_1.createElement("div", keyValueList(props_26, 1))), (s_10 = "The simulation uses the diagram as it was at the moment of\n                 pressing the \"Start simulation\" or \"Refresh\" button using default input values.", s_10), react_1.createElement("hr", {}), body];
        return react_1.createElement("div", keyValueList(props_30, 1), ...children_18);
    }
    else {
        const isSync = (copyOfStruct = simRes[0], (copyOfStruct.tag === 0) && (copyOfStruct.fields[0].IsSynchronous));
        const patternInput = (simRes[0].tag === 1) ? [new Color_IColor(7, []), "See Problems"] : [new Color_IColor(6, []), "Start Simulation"];
        const buttonText = patternInput[1];
        const buttonColor = patternInput[0];
        const children = ["Simulate simple logic using this tab.", react_1.createElement("br", {}), isSync ? "You can also use the Wave Simulation tab to view waveforms" : "", react_1.createElement("br", {}), react_1.createElement("br", {}), button(ofArray([new Option(0, [buttonColor]), new Option(18, [(_arg_1) => {
            startSimulation();
        }])]), singleton(buttonText))];
        return react_1.createElement("div", {}, ...children);
    }
}

export function tryStartSimulationAfterErrorFix(simType, model) {
    const withMsg = (msg, model_1) => [model_1, Cmd_OfFunc_result(msg)];
    const withMsgs = (msgs, model_2) => [model_2, Cmd_batch(map(Cmd_OfFunc_result, msgs))];
    const withCmdTTMsg = (ttMsg, model_3) => [model_3, Cmd_OfFunc_result(new Msg(27, [ttMsg]))];
    const conns = extractConnections(model.Sheet.Wire);
    const comps = extractComponents(model.Sheet.Wire.Symbol);
    const canvasState = [comps, conns];
    const simErrFeedback = (simErr, otherMsg) => append(getSimErrFeedbackMessages(simErr, model), singleton(otherMsg));
    switch (simType.tag) {
        case 1: {
            const _arg_1 = simulateModel(void 0, 2, canvasState[0], canvasState[1], model);
            const copyOfStruct = _arg_1[0];
            if (copyOfStruct.tag === 1) {
                const simError_1 = copyOfStruct.fields[0];
                const state_1 = _arg_1[1];
                const feedbackMsg = new Msg(27, [new TTMsg(0, [[new FSharpResult$2(1, [simError_1]), state_1]])]);
                return withMsgs(simErrFeedback(simError_1, feedbackMsg), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), currentStepSimulationStep_)(new FSharpResult$2(1, [simError_1]))(model));
            }
            else {
                const simData_1 = copyOfStruct.fields[0];
                const state = _arg_1[1];
                if (simData_1.IsSynchronous === false) {
                    return withCmdTTMsg(new TTMsg(0, [[new FSharpResult$2(0, [simData_1]), state]]), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), currentStepSimulationStep_)(new FSharpResult$2(0, [simData_1]))(model));
                }
                else {
                    return withCmdTTMsg(new TTMsg(6, []), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, void 0, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState));
                }
            }
        }
        case 2: {
            const model_4 = updateAllMemoryComps(model);
            let wsSheet;
            const matchValue = model_4.WaveSimSheet;
            if (matchValue != null) {
                const sheet = matchValue;
                wsSheet = sheet;
            }
            else {
                wsSheet = value_7(getCurrFile(model_4));
            }
            let model_7;
            const model_6 = removeAllSimulationsFromModel(model_4);
            model_7 = (new Model(model_6.UserData, model_6.WaveSim, wsSheet, model_6.UISheetTrail, model_6.Spinner, model_6.Sheet, model_6.IsLoading, model_6.LastChangeCheckTime, model_6.LastSimulatedCanvasState, model_6.LastDetailedSavedState, model_6.CurrentSelected, model_6.LastSelectedIds, model_6.LastUsedDialogWidth, model_6.SelectedComponent, model_6.CurrentStepSimulationStep, model_6.CurrentTruthTable, model_6.TTConfig, model_6.RightPaneTabVisible, model_6.SimSubTabVisible, model_6.Hilighted, model_6.Clipboard, model_6.LastCreatedComponent, model_6.SavedSheetIsOutOfDate, model_6.CurrentProj, model_6.PopupViewFunc, model_6.SpinnerPayload, model_6.PopupDialogData, model_6.Notifications, model_6.TopMenuOpenState, model_6.DividerDragMode, model_6.WaveSimViewerWidth, model_6.ConnsOfSelectedWavesAreHighlighted, model_6.Pending, model_6.UIState, model_6.BuildVisible, model_6.DrawBlockTestState));
            const wsModel = getWSModel(model_7);
            const matchValue_1 = simulateModel(model_7.WaveSimSheet, Constants_maxLastClk + Constants_maxStepsOverflow, canvasState[0], canvasState[1], model_7);
            const copyOfStruct_1 = matchValue_1[0];
            if (copyOfStruct_1.tag === 0) {
                const canvState = matchValue_1[1];
                const simData_2 = copyOfStruct_1.fields[0];
                if (simData_2.IsSynchronous) {
                    setFastSimInputsToDefault(simData_2.FastSim);
                    const wsModel_1 = new WaveSimModel(new WaveSimState(4, []), wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, simData_2.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves);
                    return withMsgs(ofArray([new Msg(12, [wsModel_1, wsSheet]), new Msg(15, [wsModel_1])]), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), currentStepSimulationStep_)(new FSharpResult$2(0, [simData_2]))(model_7));
                }
                else {
                    return withMsg(new Msg(12, [new WaveSimModel(new WaveSimState(3, []), wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves), wsSheet]), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), currentStepSimulationStep_)(new FSharpResult$2(0, [simData_2]))(model_7));
                }
            }
            else {
                const simError_2 = copyOfStruct_1.fields[0];
                return withMsgs(simErrFeedback(simError_2, new Msg(12, [new WaveSimModel(new WaveSimState(2, [simError_2]), wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves), wsSheet])), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), currentStepSimulationStep_)(new FSharpResult$2(1, [simError_2]))(model_7));
            }
        }
        default: {
            const _arg = tryGetSimData(canvasState[0], canvasState[1], model);
            if (_arg.tag === 1) {
                const simError = _arg.fields[0];
                return withMsgs(simErrFeedback(simError, new Msg(8, [new FSharpResult$2(1, [simError])])), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), currentStepSimulationStep_)(new FSharpResult$2(1, [simError]))(model));
            }
            else {
                const simData = _arg.fields[0];
                return withMsg(new Msg(8, [new FSharpResult$2(0, [simData])]), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), currentStepSimulationStep_)(new FSharpResult$2(0, [simData]))(model));
            }
        }
    }
}

//# sourceMappingURL=SimulationView.fs.js.map
