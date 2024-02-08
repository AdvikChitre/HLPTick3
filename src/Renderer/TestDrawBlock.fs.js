import { toConsole, printf, toFail } from "./fable_modules/fable-library.4.1.4/String.js";
import { Record, Union } from "./fable_modules/fable-library.4.1.4/Types.js";
import { list_type, tuple_type, record_type, lambda_type, option_type, int32_type, union_type, string_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { toArray as toArray_1, shuffleA, fromArray, filter, product, fromList, map as map_3, Gen$1_$reflection } from "./GenerateData.fs.js";
import { Result_Bind, FSharpChoice$2, FSharpResult$2 } from "./fable_modules/fable-library.4.1.4/Choice.js";
import { tryFindIndex, allPairs, ofArray, head, isEmpty, tryItem, exists, fold, mapIndexed, length, getSlice, append, item, map as map_1, empty, singleton, collect } from "./fable_modules/fable-library.4.1.4/List.js";
import { uncurry3, uncurry2, equals, curry2 } from "./fable_modules/fable-library.4.1.4/Util.js";
import { toList } from "./fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "./fable_modules/fable-library.4.1.4/Range.js";
import { init } from "./UI/MainView.fs.js";
import { TestState, Msg, sheet_ } from "./Model/ModelType.fs.js";
import { SheetT_Msg, SheetT_KeyboardMsg, BusWireT_wireOf_, SheetT_Model, SheetT_symbolOf_, SymbolT_Symbol__get_getScaledDiagonal, SheetT_symbol_, SheetT_wire_ } from "./Model/DrawModelType.fs.js";
import { DrawModelType_SheetT_Model__Model_GetCanvasState, Constants_defaultCanvasSize } from "./DrawBlock/Sheet.fs.js";
import { Rotation, PortType, CustomComponentType, ComponentType, XYPos } from "./Common/CommonTypes.fs.js";
import { StringModule_ToUpper } from "./Common/EEExtensions.fs.js";
import { FSharpMap__get_Keys, toArray, findKey, exists as exists_1, FSharpMap__get_Item } from "./fable_modules/fable-library.4.1.4/Map.js";
import { addSymbol } from "./DrawBlock/SymbolUpdate.fs.js";
import { updateBoundingBoxes } from "./DrawBlock/SheetUpdate.fs.js";
import { Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "./Common/Optics.fs.js";
import { getOrderedCompLabels } from "./Simulator/Extractor.fs.js";
import { updateWireSegmentJumpsAndSeparations, routeAndSeparateSymbolWires } from "./DrawBlock/BusWireSeparate.fs.js";
import { flipSymbol, rotateAntiClockByAng } from "./DrawBlock/SymbolResizeHelpers.fs.js";
import { map as map_2, tryFind } from "./fable_modules/fable-library.4.1.4/Array.js";
import { makeNewWire } from "./DrawBlock/BusWireUpdate.fs.js";
import { findWireSymbolIntersections } from "./DrawBlock/BusWireRoute.fs.js";
import { overlap2DBox } from "./DrawBlock/BlockHelpers.fs.js";
import { defaultArg } from "./fable_modules/fable-library.4.1.4/Option.js";

/**
 * convenience unsafe function to extract Ok part of Result or fail if value is Error
 */
export function TestLib_getOkOrFail(res) {
    if (res.tag === 1) {
        const mess = res.fields[0];
        return toFail(printf("%s"))(mess);
    }
    else {
        const x = res.fields[0];
        return x;
    }
}

export class TestLib_TestStatus extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Fail", "Exception"];
    }
}

export function TestLib_TestStatus_$reflection() {
    return union_type("TestDrawBlock.TestLib.TestStatus", [], TestLib_TestStatus, () => [[["Item", string_type]], [["Item", string_type]]]);
}

export class TestLib_Test$1 extends Record {
    constructor(Name, Samples, StartFrom, Assertion) {
        super();
        this.Name = Name;
        this.Samples = Samples;
        this.StartFrom = (StartFrom | 0);
        this.Assertion = Assertion;
    }
}

export function TestLib_Test$1_$reflection(gen0) {
    return record_type("TestDrawBlock.TestLib.Test`1", [gen0], TestLib_Test$1, () => [["Name", string_type], ["Samples", Gen$1_$reflection(gen0)], ["StartFrom", int32_type], ["Assertion", lambda_type(int32_type, lambda_type(gen0, option_type(string_type)))]]);
}

export class TestLib_TestResult$1 extends Record {
    constructor(TestName, TestData, FirstSampleTested, TestErrors) {
        super();
        this.TestName = TestName;
        this.TestData = TestData;
        this.FirstSampleTested = (FirstSampleTested | 0);
        this.TestErrors = TestErrors;
    }
}

export function TestLib_TestResult$1_$reflection(gen0) {
    return record_type("TestDrawBlock.TestLib.TestResult`1", [gen0], TestLib_TestResult$1, () => [["TestName", string_type], ["TestData", Gen$1_$reflection(gen0)], ["FirstSampleTested", int32_type], ["TestErrors", list_type(tuple_type(int32_type, TestLib_TestStatus_$reflection()))]]);
}

export function TestLib_catchException(name, func, arg) {
    try {
        return new FSharpResult$2(0, [func(arg)]);
    }
    catch (e) {
        return new FSharpResult$2(1, [(`Exception when running ${name}
`) + e.stack]);
    }
}

/**
 * Run the Test samples from 0 up to test.Size - 1.
 * The return list contains all failures or exceptions: empty list => everything has passed.
 * This will always run to completion: use truncate if text.Samples.Size is too large.
 */
export function TestLib_runTests(test) {
    return new TestLib_TestResult$1(test.Name, test.Samples, test.StartFrom, collect((_arg) => {
        const copyOfStruct = _arg[1];
        if (copyOfStruct.tag === 0) {
            const n_2 = _arg[0] | 0;
            const sample = copyOfStruct.fields[0];
            const matchValue = TestLib_catchException(`'test.Assertion' on test ${n_2} from 'runTests'`, curry2(test.Assertion)(n_2), sample);
            if (matchValue.tag === 1) {
                const mess_1 = matchValue.fields[0];
                return singleton([n_2, new TestLib_TestStatus(1, [mess_1])]);
            }
            else if (matchValue.fields[0] != null) {
                const failure = matchValue.fields[0];
                return singleton([n_2, new TestLib_TestStatus(0, [failure])]);
            }
            else {
                return empty();
            }
        }
        else {
            const mess = copyOfStruct.fields[0];
            const n_1 = _arg[0] | 0;
            return singleton([n_1, new TestLib_TestStatus(1, [mess])]);
        }
    }, map_1((n) => [n, TestLib_catchException(`generating test ${n} from ${test.Name}`, test.Samples.Data, n)], toList(rangeDouble(test.StartFrom, 1, test.Samples.Size - 1)))));
}

export const HLPTick3_initSheetModel = init().Sheet;

export const HLPTick3_sheetModel_ = sheet_;

export const HLPTick3_busWireModel_ = SheetT_wire_;

export const HLPTick3_symbolModel_ = SheetT_symbol_;

export const HLPTick3_maxSheetCoord = Constants_defaultCanvasSize;

export const HLPTick3_middleOfSheet = new XYPos(HLPTick3_maxSheetCoord / 2, HLPTick3_maxSheetCoord / 2);

/**
 * Used throughout to compare labels since these are case invariant "g1" = "G1"
 */
export function HLPTick3_caseInvariantEqual(str1, str2) {
    return StringModule_ToUpper(str1) === StringModule_ToUpper(str2);
}

export class HLPTick3_SymbolPort extends Record {
    constructor(Label, PortNumber) {
        super();
        this.Label = Label;
        this.PortNumber = (PortNumber | 0);
    }
}

export function HLPTick3_SymbolPort_$reflection() {
    return record_type("TestDrawBlock.HLPTick3.SymbolPort", [], HLPTick3_SymbolPort, () => [["Label", string_type], ["PortNumber", int32_type]]);
}

/**
 * convenience function to make SymbolPorts
 */
export function HLPTick3_portOf(label, number) {
    return new HLPTick3_SymbolPort(label, number);
}

/**
 * The visible segments of a wire, as a list of vectors, from source end to target end.
 * Note that in a wire with n segments a zero length (invisible) segment at any index [1..n-2] is allowed
 * which if present causes the two segments on either side of it to coalesce into a single visible segment.
 * A wire can have any number of visible segments - even 1.
 */
export function HLPTick3_visibleSegments(wId, model) {
    const wire = FSharpMap__get_Item(model.Wire.Wires, wId);
    const $007CIsEven$007CIsOdd$007C = (n) => {
        if ((n % 2) === 0) {
            return new FSharpChoice$2(0, [void 0]);
        }
        else {
            return new FSharpChoice$2(1, [void 0]);
        }
    };
    const getSegmentVector = (index, seg) => {
        const matchValue_1 = wire.InitialOrientation;
        let matchResult;
        if ($007CIsEven$007CIsOdd$007C(index).tag === 1) {
            if (matchValue_1 === "vertical") {
                matchResult = 1;
            }
            else {
                matchResult = 0;
            }
        }
        else if (matchValue_1 === "horizontal") {
            matchResult = 1;
        }
        else {
            matchResult = 0;
        }
        switch (matchResult) {
            case 0:
                return new XYPos(0, seg.Length);
            default:
                return new XYPos(seg.Length, 0);
        }
    };
    const tryCoalesceAboutIndex = (segVecs, index_1) => {
        let left, right, left_1, right_1;
        if ((left = item(index_1, segVecs), (right = (new XYPos(0, 0)), (Math.abs(left.X - right.X) <= 1E-07) && (Math.abs(left.Y - right.Y) <= 1E-07)))) {
            return append(getSlice(0, index_1 - 2, segVecs), append(singleton((left_1 = item(index_1 - 1, segVecs), (right_1 = item(index_1 + 1, segVecs), new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y)))), getSlice(index_1 + 2, length(segVecs) - 1, segVecs)));
        }
        else {
            return segVecs;
        }
    };
    const segVecs_1 = mapIndexed(getSegmentVector, wire.Segments);
    return fold(tryCoalesceAboutIndex, segVecs_1, toList(rangeDouble(1, 1, length(segVecs_1) - 2)));
}

/**
 * Place a new symbol with label symLabel onto the Sheet with given position.
 * Return error if symLabel is not unique on sheet, or if position is outside allowed sheet coordinates (0 - maxSheetCoord).
 * To be safe place components close to (maxSheetCoord/2.0, maxSheetCoord/2.0).
 * symLabel - the component label, will be uppercased to make a standard label name
 * compType - the type of the component
 * position - the top-left corner of the symbol outline.
 * model - the Sheet model into which the new symbol is added.
 */
export function HLPTick3_Builder_placeSymbol(symLabel, compType, position, model) {
    let y, x, left_1, right_1;
    const symLabel_1 = StringModule_ToUpper(symLabel);
    const patternInput = addSymbol(empty(), model.Wire.Symbol, position, compType, symLabel_1);
    const symModel = patternInput[0];
    const symId = patternInput[1];
    const sym = FSharpMap__get_Item(symModel.Symbols, symId);
    let matchValue;
    const left = position;
    const right = SymbolT_Symbol__get_getScaledDiagonal(sym);
    matchValue = (new XYPos(left.X + right.X, left.Y + right.Y));
    if ((y = matchValue.Y, (x = matchValue.X, (x > HLPTick3_maxSheetCoord) ? true : (y > HLPTick3_maxSheetCoord)))) {
        const y_1 = matchValue.Y;
        const x_1 = matchValue.X;
        return new FSharpResult$2(1, [`symbol '${symLabel_1}' position ${(left_1 = position, (right_1 = SymbolT_Symbol__get_getScaledDiagonal(sym), new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y)))} lies outside allowed coordinates`]);
    }
    else {
        return new FSharpResult$2(0, [updateBoundingBoxes(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), HLPTick3_symbolModel_)(symModel)(model))]);
    }
}

/**
 * Place a new symbol onto the Sheet with given position and scaling (use default scale if this is not specified).
 * The ports on the new symbol will be determined by the input and output components on some existing sheet in project.
 * Return error if symLabel is not unique on sheet, or ccSheetName is not the name of some other sheet in project.
 */
export function HLPTick3_Builder_placeCustomSymbol(symLabel, ccSheetName, project, scale, position, model) {
    const symbolMap = model.Wire.Symbol.Symbols;
    if (HLPTick3_caseInvariantEqual(ccSheetName, project.OpenFileName)) {
        return new FSharpResult$2(1, ["Can\'t create custom component with name same as current opened sheet"]);
    }
    else if (!exists((ldc) => HLPTick3_caseInvariantEqual(ldc.Name, ccSheetName), project.LoadedComponents)) {
        return new FSharpResult$2(1, ["Can\'t create custom component unless a sheet already exists with smae name as ccSheetName"]);
    }
    else if (exists_1((_arg, sym) => HLPTick3_caseInvariantEqual(sym.Component.Label, symLabel), symbolMap)) {
        return new FSharpResult$2(1, ["Can\'t create custom component with duplicate Label"]);
    }
    else {
        const canvas = DrawModelType_SheetT_Model__Model_GetCanvasState(model);
        const ccType = new CustomComponentType(ccSheetName, getOrderedCompLabels(new ComponentType(0, [0, void 0]), canvas[0], canvas[1]), getOrderedCompLabels(new ComponentType(1, [0]), canvas[0], canvas[1]), void 0, void 0);
        return HLPTick3_Builder_placeSymbol(symLabel, new ComponentType(26, [ccType]), position, model);
    }
}

/**
 * Finds the componentID of a symbol with symLabel
 * returns symbolMap and componentID
 */
export function HLPTick3_Builder_getSymbolMapCopmonentId(symLabel, model) {
    const symbolMap = model.Wire.Symbol.Symbols;
    const componentID = findKey((_arg, sym) => (sym.Component.Label === symLabel), symbolMap);
    return [symbolMap, componentID];
}

/**
 * updates model with symbol and reroutes wires
 */
export function HLPTick3_Builder_updatedModel(componentID, symModel, model) {
    const newModel = updateBoundingBoxes(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SheetT_symbolOf_(componentID))(symModel)(model));
    const reroutedWires = routeAndSeparateSymbolWires(newModel.Wire, componentID);
    return new SheetT_Model(reroutedWires, newModel.PopupViewFunc, newModel.PopupDialogData, newModel.BoundingBoxes, newModel.LastValidBoundingBoxes, newModel.SelectedLabel, newModel.SelectedComponents, newModel.SelectedWires, newModel.NearbyComponents, newModel.ErrorComponents, newModel.DragToSelectBox, newModel.ConnectPortsLine, newModel.TargetPortId, newModel.Action, newModel.ShowGrid, newModel.CursorType, newModel.LastValidPos, newModel.LastValidSymbol, newModel.SnapSymbols, newModel.SnapSegments, newModel.CurrentKeyPresses, newModel.Zoom, newModel.CanvasSize, newModel.TmpModel, newModel.ScalingTmpModel, newModel.UndoList, newModel.RedoList, newModel.AutomaticScrolling, newModel.ScreenScrollPos, newModel.LastMousePos, newModel.ScalingBoxCentrePos, newModel.InitMouseToScalingBoxCentre, newModel.ScrollingLastMousePos, newModel.LastMousePosForSnap, newModel.MouseCounter, newModel.CtrlKeyDown, newModel.PrevWireSelection, newModel.ScalingBox, newModel.Compiling, newModel.CompilationStatus, newModel.CompilationProcess, newModel.DebugState, newModel.DebugData, newModel.DebugMappings, newModel.DebugIsConnected, newModel.DebugDevice);
}

/**
 * Rotate a symbol given its label
 */
export function HLPTick3_Builder_rotateSymbol(symLabel, rotate, model) {
    const patternInput = HLPTick3_Builder_getSymbolMapCopmonentId(symLabel, model);
    const symbolMap = patternInput[0];
    const componentID = patternInput[1];
    const symModel = rotateAntiClockByAng(rotate, FSharpMap__get_Item(symbolMap, componentID));
    return HLPTick3_Builder_updatedModel(componentID, symModel, model);
}

/**
 * Flip a symbol given its label
 */
export function HLPTick3_Builder_flipSymbol(symLabel, flip, model) {
    const patternInput = HLPTick3_Builder_getSymbolMapCopmonentId(symLabel, model);
    const symbolMap = patternInput[0];
    const componentID = patternInput[1];
    const symModel = flipSymbol(flip, FSharpMap__get_Item(symbolMap, componentID));
    return HLPTick3_Builder_updatedModel(componentID, symModel, model);
}

/**
 * Add a (newly routed) wire, source specifies the Output port, target the Input port.
 * Return an error if either of the two ports specified is invalid, or if the wire duplicates and existing one.
 * The wire created will be smart routed but not separated from other wires: for a nice schematic
 * separateAllWires should be run after  all wires are added.
 * source, target: respectively the output port and input port to which the wire connects.
 */
export function HLPTick3_Builder_placeWire(source, target, model) {
    const symbols = model.Wire.Symbol.Symbols;
    const getPortId = (portType, symPort) => {
        let _arg, x;
        return Result_Bind((sym_1) => {
            const _arg_1 = (portType.tag === 1) ? tryItem(symPort.PortNumber, sym_1.Component.OutputPorts) : tryItem(symPort.PortNumber, sym_1.Component.InputPorts);
            if (_arg_1 == null) {
                return new FSharpResult$2(1, [`Can't find ${portType} port ${symPort.PortNumber} on component ${symPort.Label}`]);
            }
            else {
                const port = _arg_1;
                return new FSharpResult$2(0, [port.Id]);
            }
        }, (_arg = tryFind((sym) => HLPTick3_caseInvariantEqual(sym.Component.Label, symPort.Label), map_2((tuple) => tuple[1], toArray(symbols))), (_arg == null) ? (new FSharpResult$2(1, ["Can\'t find symbol with label \'{symPort.Label}\'"])) : ((x = _arg, new FSharpResult$2(0, [x])))));
    };
    const matchValue = getPortId(new PortType(0, []), target);
    const matchValue_1 = getPortId(new PortType(1, []), source);
    let matchResult, e, inPort, outPort;
    const copyOfStruct = matchValue;
    if (copyOfStruct.tag === 0) {
        const copyOfStruct_1 = matchValue_1;
        if (copyOfStruct_1.tag === 0) {
            matchResult = 1;
            inPort = copyOfStruct.fields[0];
            outPort = copyOfStruct_1.fields[0];
        }
        else {
            matchResult = 0;
            e = copyOfStruct_1.fields[0];
        }
    }
    else {
        matchResult = 0;
        e = copyOfStruct.fields[0];
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(1, [e]);
        default: {
            const newWire = makeNewWire(inPort, outPort, model.Wire);
            if (exists_1((wid, wire) => {
                if (equals(wire.InputPort, newWire.InputPort)) {
                    return equals(wire.OutputPort, newWire.OutputPort);
                }
                else {
                    return false;
                }
            }, model.Wire.Wires)) {
                return new FSharpResult$2(1, ["Can\'t create wire from {source} to {target} because a wire already exists between those ports"]);
            }
            else {
                return new FSharpResult$2(0, [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), BusWireT_wireOf_(newWire.WId))(HLPTick3_busWireModel_))(newWire)(model)]);
            }
        }
    }
}

/**
 * Run the global wire separation algorithm (should be after all wires have been placed and routed)
 */
export function HLPTick3_Builder_separateAllWires(model) {
    let f, wires;
    return ((f = ((wires = toList(FSharpMap__get_Keys(model.Wire.Wires)), (model_1) => updateWireSegmentJumpsAndSeparations(wires, model_1))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), HLPTick3_busWireModel_)(f)))(model);
}

/**
 * Copy testModel into the main Issie Sheet making its contents visible
 */
export function HLPTick3_Builder_showSheetInIssieSchematic(testModel, dispatch) {
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    dispatch(new Msg(36, [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), sheet_)(testModel)]));
    sheetDispatch(new SheetT_Msg(2, [new SheetT_KeyboardMsg(6, [])]));
}

/**
 * 1. Create a set of circuits from Gen<'a> samples by applying sheetMaker to each sample.
 * 2. Check each ciruit with sheetChecker.
 * 3. Return a TestResult record with errors those samples for which sheetChecker returns false,
 * or where there is an exception.
 * If there are any test errors display the first in Issie, and its error message on the console.
 * sheetMaker: generates a SheetT.model from the random sample
 * sheetChecker n model: n is sample number, model is the genrated model. Return false if test fails.
 */
export function HLPTick3_Builder_runTestOnSheets(name, sampleToStartFrom, samples, sheetMaker, sheetChecker, dispatch) {
    const generateAndCheckSheet = (n) => {
        const f2 = curry2(sheetChecker)(n);
        return (arg) => f2(sheetMaker(arg));
    };
    const result = TestLib_runTests(new TestLib_Test$1(name, samples, sampleToStartFrom, uncurry2(generateAndCheckSheet)));
    const matchValue = result.TestErrors;
    if (!isEmpty(matchValue)) {
        const n_1 = head(matchValue)[0] | 0;
        const first = head(matchValue)[1];
        toConsole(`Test ${result.TestName} has FAILED on sample ${n_1} with error message:
${first}`);
        const matchValue_1 = TestLib_catchException("", sheetMaker, samples.Data(n_1));
        if (matchValue_1.tag === 1) {
            const mess = matchValue_1.fields[0];
        }
        else {
            const sheet = matchValue_1.fields[0];
            HLPTick3_Builder_showSheetInIssieSchematic(sheet, dispatch);
        }
    }
    else {
        toConsole(`Test ${result.TestName} has PASSED.`);
    }
    return result;
}

export const HLPTick3_horizLinePositions = map_3((n) => {
    const left = HLPTick3_middleOfSheet;
    const right = new XYPos(n, 0);
    return new XYPos(left.X + right.X, left.Y + right.Y);
}, fromList(toList(rangeDouble(-100, 20, 100))));

export const HLPTick3_vertLinePositions = map_3((n) => {
    const left = HLPTick3_middleOfSheet;
    const right = new XYPos(0, n);
    return new XYPos(left.X + right.X, left.Y + right.Y);
}, fromList(toList(rangeDouble(-100, 20, 100))));

export const HLPTick3_rotationSamples = fromList(ofArray([new Rotation(0, []), new Rotation(1, []), new Rotation(2, []), new Rotation(3, [])]));

export const HLPTick3_flipSamples = fromList(ofArray(["flipHorizontal", void 0]));

export const HLPTick3_gridPositions = product((pos1, pos2) => (new XYPos(pos1.X, pos2.Y)), HLPTick3_horizLinePositions, HLPTick3_vertLinePositions);

/**
 * True if no overlap with square
 */
export function HLPTick3_isNoOverlap(radius, pos) {
    if (((pos.X < (HLPTick3_middleOfSheet.X - radius)) ? true : (pos.X > (HLPTick3_middleOfSheet.X + radius))) ? true : (pos.Y < (HLPTick3_middleOfSheet.Y - radius))) {
        return true;
    }
    else {
        return pos.Y > (HLPTick3_middleOfSheet.Y + radius);
    }
}

/**
 * Sample data of 2D grid with component-component overlap filtered out
 */
export function HLPTick3_gridPositionsNoOverlap(radius) {
    return filter((pos) => HLPTick3_isNoOverlap(radius, pos), HLPTick3_gridPositions);
}

export const HLPTick3_RandPosWithRotationFlip = fromArray(shuffleA(toArray_1(product((flip, tupledArg) => {
    const rot_1 = tupledArg[0];
    const pos_1 = tupledArg[1];
    return [flip, rot_1, pos_1];
}, HLPTick3_flipSamples, product((rot, pos) => [rot, pos], HLPTick3_rotationSamples, HLPTick3_gridPositionsNoOverlap(40))))));

/**
 * demo test circuit consisting of a DFF & And gate
 */
export function HLPTick3_makeTest1Circuit(andPos) {
    let result_2, result_1, source, target, source_1, target_1;
    return TestLib_getOkOrFail((result_2 = ((result_1 = Result_Bind((model_1) => HLPTick3_Builder_placeSymbol("FF1", new ComponentType(31, []), HLPTick3_middleOfSheet, model_1), HLPTick3_Builder_placeSymbol("G1", new ComponentType(10, ["and", 2]), andPos, HLPTick3_initSheetModel)), Result_Bind((source = HLPTick3_portOf("G1", 0), (target = HLPTick3_portOf("FF1", 0), (model_2) => HLPTick3_Builder_placeWire(source, target, model_2))), result_1))), Result_Bind((source_1 = HLPTick3_portOf("FF1", 0), (target_1 = HLPTick3_portOf("G1", 0), (model_3) => HLPTick3_Builder_placeWire(source_1, target_1, model_3))), result_2)));
}

/**
 * test circuit - DFF & And
 * With random flip, position, rotation of And
 */
export function HLPTick3_makeTest7Circuit(flip, rotation, andPos) {
    let direction, result_2, result_1, source, target, source_1, target_1;
    return HLPTick3_Builder_rotateSymbol("G1", rotation, ((flip == null) ? ((x) => x) : ((direction = flip, (model_4) => HLPTick3_Builder_flipSymbol("G1", direction, model_4))))(TestLib_getOkOrFail((result_2 = ((result_1 = Result_Bind((model_1) => HLPTick3_Builder_placeSymbol("FF1", new ComponentType(31, []), HLPTick3_middleOfSheet, model_1), HLPTick3_Builder_placeSymbol("G1", new ComponentType(10, ["and", 2]), andPos, HLPTick3_initSheetModel)), Result_Bind((source = HLPTick3_portOf("G1", 0), (target = HLPTick3_portOf("FF1", 0), (model_2) => HLPTick3_Builder_placeWire(source, target, model_2))), result_1))), Result_Bind((source_1 = HLPTick3_portOf("FF1", 0), (target_1 = HLPTick3_portOf("G1", 0), (model_3) => HLPTick3_Builder_placeWire(source_1, target_1, model_3))), result_2)))));
}

/**
 * Ignore sheet and fail on the specified sample, useful for displaying a given sample
 */
export function HLPTick3_Asserts_failOnSampleNumber(sampleToFail, sample, _sheet) {
    if (sampleToFail === sample) {
        return `Failing forced on Sample ${sampleToFail}.`;
    }
    else {
        return void 0;
    }
}

/**
 * Fails all tests: useful to show in sequence all the sheets generated in a test
 */
export function HLPTick3_Asserts_failOnAllTests(sample, _arg) {
    return `Sample ${sample}`;
}

/**
 * Fail when sheet contains a wire segment that overlaps (or goes too close to) a symbol outline
 */
export function HLPTick3_Asserts_failOnWireIntersectsSymbol(sample, sheet) {
    const wireModel = sheet.Wire;
    if (exists_1((_arg, wire) => !equals(findWireSymbolIntersections(wireModel, wire), empty()), wireModel.Wires)) {
        return `Wire intersects a symbol outline in Sample ${sample}`;
    }
    else {
        return void 0;
    }
}

/**
 * Fail when sheet contains two symbols which overlap
 */
export function HLPTick3_Asserts_failOnSymbolIntersectsSymbol(sample, sheet) {
    const wireModel = sheet.Wire;
    const boxes = mapIndexed((n, box) => [n, box], ofArray(map_2((tuple) => tuple[1], toArray(sheet.BoundingBoxes))));
    if (exists((tupledArg) => {
        const _arg = tupledArg[0];
        const _arg_1 = tupledArg[1];
        const n1 = _arg[0] | 0;
        const box1 = _arg[1];
        const n2 = _arg_1[0] | 0;
        const box2 = _arg_1[1];
        if (n1 !== n2) {
            return overlap2DBox(box1, box2);
        }
        else {
            return false;
        }
    }, allPairs(boxes, boxes))) {
        return `Symbol outline intersects another symbol outline in Sample ${sample}`;
    }
    else {
        return void 0;
    }
}

/**
 * Allow test errors to be viewed in sequence by recording the current error
 * in the Issie Model (field DrawblockTestState). This contains all Issie persistent state.
 */
export function HLPTick3_Tests_recordPositionInTest(testNumber, dispatch, result) {
    dispatch(new Msg(94, [(_arg) => {
        const matchValue = result.TestErrors;
        if (!isEmpty(matchValue)) {
            const numb = head(matchValue)[0] | 0;
            toConsole(`Sample ${numb}`);
            return new TestState(testNumber, numb);
        }
        else {
            toConsole(printf("Test finished"));
            return void 0;
        }
    }]));
}

/**
 * Example test: Horizontally positioned AND + DFF: fail on sample 0
 */
export function HLPTick3_Tests_test1(testNum, firstSample, dispatch) {
    HLPTick3_Tests_recordPositionInTest(testNum, dispatch, HLPTick3_Builder_runTestOnSheets("Horizontally positioned AND + DFF: fail on sample 0", firstSample, HLPTick3_horizLinePositions, HLPTick3_makeTest1Circuit, (sample, _sheet) => HLPTick3_Asserts_failOnSampleNumber(0, sample, _sheet), dispatch));
}

/**
 * Example test: Horizontally positioned AND + DFF: fail on sample 10
 */
export function HLPTick3_Tests_test2(testNum, firstSample, dispatch) {
    HLPTick3_Tests_recordPositionInTest(testNum, dispatch, HLPTick3_Builder_runTestOnSheets("Horizontally positioned AND + DFF: fail on sample 10", firstSample, HLPTick3_horizLinePositions, HLPTick3_makeTest1Circuit, (sample, _sheet) => HLPTick3_Asserts_failOnSampleNumber(10, sample, _sheet), dispatch));
}

/**
 * Example test: Horizontally positioned AND + DFF: fail on symbols intersect
 */
export function HLPTick3_Tests_test3(testNum, firstSample, dispatch) {
    HLPTick3_Tests_recordPositionInTest(testNum, dispatch, HLPTick3_Builder_runTestOnSheets("Horizontally positioned AND + DFF: fail on symbols intersect", firstSample, HLPTick3_horizLinePositions, HLPTick3_makeTest1Circuit, HLPTick3_Asserts_failOnSymbolIntersectsSymbol, dispatch));
}

/**
 * Example test: Horizontally positioned AND + DFF: fail all tests
 */
export function HLPTick3_Tests_test4(testNum, firstSample, dispatch) {
    HLPTick3_Tests_recordPositionInTest(testNum, dispatch, HLPTick3_Builder_runTestOnSheets("Horizontally positioned AND + DFF: fail all tests", firstSample, HLPTick3_horizLinePositions, HLPTick3_makeTest1Circuit, HLPTick3_Asserts_failOnAllTests, dispatch));
}

/**
 * Tick3 test: 2D rectangular grid
 */
export function HLPTick3_Tests_test5(testNum, firstSample, dispatch) {
    HLPTick3_Tests_recordPositionInTest(testNum, dispatch, HLPTick3_Builder_runTestOnSheets("2D-positioned AND + DFF: fail all tests", firstSample, HLPTick3_gridPositions, HLPTick3_makeTest1Circuit, HLPTick3_Asserts_failOnWireIntersectsSymbol, dispatch));
}

/**
 * Tick3 test: 2D rectangular grid with no overlapping components
 */
export function HLPTick3_Tests_test6(testNum, firstSample, dispatch) {
    HLPTick3_Tests_recordPositionInTest(testNum, dispatch, HLPTick3_Builder_runTestOnSheets("2D-positioned no-overlap AND + DFF: fail all tests", firstSample, HLPTick3_gridPositionsNoOverlap(40), HLPTick3_makeTest1Circuit, HLPTick3_Asserts_failOnWireIntersectsSymbol, dispatch));
}

/**
 * Tick3 test: 2D rectangular grid with no overlapping components, flip, and rotation
 */
export function HLPTick3_Tests_test7(testNum, firstSample, dispatch) {
    HLPTick3_Tests_recordPositionInTest(testNum, dispatch, HLPTick3_Builder_runTestOnSheets("2D-positioned no-overlap AND + DFF: fail all tests", firstSample, HLPTick3_RandPosWithRotationFlip, (tupledArg) => HLPTick3_makeTest7Circuit(tupledArg[0], tupledArg[1], tupledArg[2]), HLPTick3_Asserts_failOnWireIntersectsSymbol, dispatch));
}

export const HLPTick3_Tests_testsToRunFromSheetMenu = ofArray([["Test1", (testNum) => ((firstSample) => ((dispatch) => {
    HLPTick3_Tests_test1(testNum, firstSample, dispatch);
}))], ["Test2", (testNum_1) => ((firstSample_1) => ((dispatch_1) => {
    HLPTick3_Tests_test2(testNum_1, firstSample_1, dispatch_1);
}))], ["Test3", (testNum_2) => ((firstSample_2) => ((dispatch_2) => {
    HLPTick3_Tests_test3(testNum_2, firstSample_2, dispatch_2);
}))], ["Test4", (testNum_3) => ((firstSample_3) => ((dispatch_3) => {
    HLPTick3_Tests_test4(testNum_3, firstSample_3, dispatch_3);
}))], ["Test5", (testNum_4) => ((firstSample_4) => ((dispatch_4) => {
    HLPTick3_Tests_test5(testNum_4, firstSample_4, dispatch_4);
}))], ["Test6", (testNum_5) => ((firstSample_5) => ((dispatch_5) => {
    HLPTick3_Tests_test6(testNum_5, firstSample_5, dispatch_5);
}))], ["Test7", (testNum_6) => ((firstSample_6) => ((dispatch_6) => {
    HLPTick3_Tests_test7(testNum_6, firstSample_6, dispatch_6);
}))], ["Test8", (_arg) => ((_arg_1) => ((_arg_2) => {
    toConsole(printf("Test8"));
}))], ["Next Test Error", (_arg_3) => ((_arg_4) => ((_arg_5) => {
    toConsole(printf("Next Error:"));
}))]]);

/**
 * Display the next error in a previously started test
 */
export function HLPTick3_Tests_nextError(testName, testFunc, firstSampleToTest, dispatch) {
    const testNum = defaultArg(tryFindIndex((tupledArg) => {
        const name = tupledArg[0];
        return name === testName;
    }, HLPTick3_Tests_testsToRunFromSheetMenu), 0) | 0;
    return testFunc(testNum, firstSampleToTest, dispatch);
}

/**
 * common function to execute any test.
 * testIndex: index of test in testsToRunFromSheetMenu
 */
export function HLPTick3_Tests_testMenuFunc(testIndex, dispatch, model) {
    const patternInput = item(testIndex, HLPTick3_Tests_testsToRunFromSheetMenu);
    const name = patternInput[0];
    const func = patternInput[1];
    toConsole(printf("%s"))(name);
    const matchValue = model.DrawBlockTestState;
    if (name === "Next Test Error") {
        if (matchValue == null) {
            toConsole(printf("Test Finished"));
        }
        else {
            const state = matchValue;
            const tupledArg = item(state.LastTestNumber, HLPTick3_Tests_testsToRunFromSheetMenu);
            HLPTick3_Tests_nextError(tupledArg[0], uncurry3(tupledArg[1]), state.LastTestSampleIndex + 1, dispatch);
        }
    }
    else {
        func(testIndex)(0)(dispatch);
    }
}

//# sourceMappingURL=TestDrawBlock.fs.js.map
