import { getSlice, isEmpty, length, item, contains, ofArray, map, concat, append, singleton, empty, collect, cons, max } from "../../fable_modules/fable-library.4.1.4/List.js";
import { compareArrays, safeHash, equals, compare } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { flatten, map as map_2, defaultArg, toArray, value as value_1 } from "../../fable_modules/fable-library.4.1.4/Option.js";
import { Record, Union } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { string_type, bool_type, record_type, int32_type, union_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { max as max_1 } from "../../fable_modules/fable-library.4.1.4/Double.js";
import { Option, button as button_1 } from "../../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { exists, filter, values, FSharpMap__get_Item, containsKey, tryFind } from "../../fable_modules/fable-library.4.1.4/Map.js";
import { append as append_1, pairwise, map as map_1, tryItem, fold } from "../../fable_modules/fable-library.4.1.4/Array.js";
import { join, toFail, printf, toConsole, interpolate, toText } from "../../fable_modules/fable-library.4.1.4/String.js";
import { SheetPort, FastData, FastBits } from "../../Simulator/SimulatorTypes.fs.js";
import { $007CMemory$007C_$007C, ComponentType, PortType, XYPos } from "../../Common/CommonTypes.fs.js";
import { toInt32 } from "../../fable_modules/fable-library.4.1.4/BigInt.js";
import { WaveSimState, Msg, WaveSimModel, ComponentGroup } from "../../Model/ModelType.fs.js";
import { toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../../fable_modules/fable-library.4.1.4/Range.js";
import * as react_1 from "react";
import { difference, union, ofList } from "../../fable_modules/fable-library.4.1.4/Set.js";
import { portSheetPort } from "../../Simulator/Simulator.fs.js";
import { List_distinct } from "../../fable_modules/fable-library.4.1.4/Seq2.js";
import { CSSProp, HTMLAttr } from "../../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { dataTooltip } from "../../fable_modules/Fulma.Extensions.Wikiki.Tooltip.3.0.0/Tooltip.fs.js";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { SheetT_Msg } from "../../Model/DrawModelType.fs.js";
import { Color_IColor, Color_IColor_$reflection } from "../../fable_modules/Fulma.2.16.0/Common.fs.js";
import { simulateModel } from "../SimulationView.fs.js";
import { Constants_maxStepsOverflow, Constants_maxLastClk } from "../ModelHelpers.fs.js";
import { runFastSimulation, compareLoadedStates } from "../../Simulator/Fast/FastRun.fs.js";
import { initialiseMem } from "../../Interface/FilesIO.fs.js";

export const Constants_initSimulationTime = 100;

export const Constants_maxSimulationTimeWithoutSpinner = 200;

export const Constants_nonBinaryTransLen = 2;

export const Constants_viewBoxHeight = 30;

export const Constants_waveHeight = 0.8 * Constants_viewBoxHeight;

export const Constants_spacing = (Constants_viewBoxHeight - Constants_waveHeight) / 2;

export const Constants_yTop = Constants_spacing;

export const Constants_yBot = Constants_waveHeight + Constants_spacing;

export const Constants_minVisibleCycles = 3;

export const Constants_minCycleWidth = 5;

export const Constants_zoomChangeFactor = 1.5;

export const Constants_clkCycleNarrowThreshold = 20;

export const Constants_extraSimulatedSteps = 5;

export const Constants_infoMessage = "Find ports by any part of their name. \'.\' = show all. \'*\' = show selected. \'-\' = collapse all";

export const Constants_outOfDateMessage = "Use refresh button to update waveforms. \'End\' and then \'Start\' to simulate a different sheet";

export const Constants_infoSignUnicode = "🛈";

export const Constants_waveLegendMaxChars = 35;

export const Constants_valueColumnMaxChars = 35;

export function listMaxWithDef(defaultValue, lst) {
    return max(cons(defaultValue, lst), {
        Compare: compare,
    });
}

export function listCollectSomes(mapFn, lst) {
    return collect((x) => {
        const matchValue = mapFn(x);
        if (matchValue == null) {
            return empty();
        }
        else {
            const r = value_1(matchValue);
            return singleton(r);
        }
    }, lst);
}

export class BinaryTransition extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ZeroToZero", "ZeroToOne", "OneToZero", "OneToOne"];
    }
}

export function BinaryTransition_$reflection() {
    return union_type("WaveSimHelpers.BinaryTransition", [], BinaryTransition, () => [[], [], [], []]);
}

export class NonBinaryTransition extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Change", "Const"];
    }
}

export function NonBinaryTransition_$reflection() {
    return union_type("WaveSimHelpers.NonBinaryTransition", [], NonBinaryTransition, () => [[], []]);
}

export class Transition extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["BinaryTransition", "NonBinaryTransition"];
    }
}

export function Transition_$reflection() {
    return union_type("WaveSimHelpers.Transition", [], Transition, () => [[["Item", BinaryTransition_$reflection()]], [["Item", NonBinaryTransition_$reflection()]]]);
}

export class Gap extends Record {
    constructor(Start, Length) {
        super();
        this.Start = (Start | 0);
        this.Length = (Length | 0);
    }
}

export function Gap_$reflection() {
    return record_type("WaveSimHelpers.Gap", [], Gap, () => [["Start", int32_type], ["Length", int32_type]]);
}

/**
 * If true, then show cross-hatch only for non-binary waves when wave is changing value very fast.
 */
export function highZoom(clkCycleWidth) {
    return clkCycleWidth < (2 * Constants_nonBinaryTransLen);
}

/**
 * Left-shift non-binary waveforms by this much.
 */
export function xShift(clkCycleWidth) {
    if (highZoom(clkCycleWidth)) {
        return clkCycleWidth / 2;
    }
    else {
        return Constants_nonBinaryTransLen;
    }
}

/**
 * Width of one clock cycle.
 */
export function singleWaveWidth(m) {
    return max_1(5, m.WaveformColumnWidth / m.ShownCycles);
}

/**
 * Left-most coordinate of the SVG viewbox.
 */
export function viewBoxMinX(m) {
    return (m.StartCycle * singleWaveWidth(m)).toString();
}

/**
 * Total width of the SVG viewbox.
 */
export function viewBoxWidth(m) {
    return max_1(5, m.WaveformColumnWidth).toString();
}

/**
 * Right-most visible clock cycle.
 */
export function endCycle(wsModel) {
    return (wsModel.StartCycle + wsModel.ShownCycles) - 1;
}

/**
 * Helper function to create Bulma buttons
 */
export function button(options, func, label) {
    return button_1(append(options, singleton(new Option(18, [func]))), singleton(label));
}

/**
 * List of selected waves (of type Wave)
 */
export function selectedWaves(wsModel) {
    return concat(map((wi) => ofArray(toArray(tryFind(wi, wsModel.AllWaves))), wsModel.SelectedWaves));
}

/**
 * Convert XYPos list to string
 */
export function pointsToString(points) {
    return fold((str, point) => toText(interpolate("%P() %.1f%P(),%.1f%P() ", [str, point.X, point.Y])), "", points);
}

/**
 * Retrieve value of wave at given clock cycle as an int.
 */
export function getWaveValue(currClkCycle, wave, width) {
    let w;
    if ((w = (width | 0), w > 32)) {
        const w_1 = width | 0;
        const _arg = tryItem(currClkCycle, wave.WaveValues.BigIntStep);
        if (_arg != null) {
            const fData = _arg;
            return new FastData(new FastBits(1, [fData]), width);
        }
        else {
            toConsole(printf("Trying to access index %A in wave %A. Default to 0."))(currClkCycle)(wave.DisplayName);
            return new FastData(new FastBits(0, [0]), width);
        }
    }
    else {
        const _arg_1 = tryItem(currClkCycle, wave.WaveValues.UInt32Step);
        if (_arg_1 != null) {
            const fData_1 = _arg_1;
            return new FastData(new FastBits(0, [fData_1]), width);
        }
        else {
            toConsole(printf("Trying to access index %A in wave %A. Default to 0."))(currClkCycle)(wave.DisplayName);
            return new FastData(new FastBits(0, [0]), width);
        }
    }
}

/**
 * Make left and right x-coordinates for a clock cycle.
 */
export function makeXCoords(clkCycleWidth, clkCycle, transition) {
    if (transition.tag === 1) {
        return [(clkCycle * clkCycleWidth) - xShift(clkCycleWidth), ((clkCycle + 1) * clkCycleWidth) - xShift(clkCycleWidth)];
    }
    else {
        return [clkCycle * clkCycleWidth, (clkCycle + 1) * clkCycleWidth];
    }
}

/**
 * Make top-left, top-right, bottom-left, bottom-right coordinates for a clock cycle.
 */
export function makeCoords(clkCycleWidth, clkCycle, transition) {
    const patternInput = makeXCoords(clkCycleWidth, clkCycle, transition);
    const xRight = patternInput[1];
    const xLeft = patternInput[0];
    const topL = new XYPos(xLeft, Constants_yTop);
    const topR = new XYPos(xRight, Constants_yTop);
    const botL = new XYPos(xLeft, Constants_yBot);
    const botR = new XYPos(xRight, Constants_yBot);
    return [topL, topR, botL, botR];
}

/**
 * Generate points for a binary waveform
 */
export function binaryWavePoints(clkCycleWidth, startCycle, index, transition) {
    const patternInput = makeCoords(clkCycleWidth, startCycle + index, new Transition(0, [transition]));
    const topR = patternInput[1];
    const topL = patternInput[0];
    const botR = patternInput[3];
    const botL = patternInput[2];
    switch (transition.tag) {
        case 1:
        case 3:
            return [topL, topR];
        default:
            return [botL, botR];
    }
}

/**
 * Generate points for a non-binary waveform.
 */
export function nonBinaryWavePoints(clkCycleWidth, startCycle, index, transition) {
    const xLeft = makeXCoords(clkCycleWidth, startCycle + index, new Transition(1, [transition]))[0];
    const patternInput_1 = makeCoords(clkCycleWidth, startCycle + index, new Transition(1, [transition]));
    const topR = patternInput_1[1];
    const botR = patternInput_1[3];
    const matchValue = new XYPos(xLeft + xShift(clkCycleWidth), 0.5 * Constants_viewBoxHeight);
    const crossHatchTop = new XYPos(xLeft + (2 * xShift(clkCycleWidth)), Constants_yTop);
    const crossHatchMid = matchValue;
    const crossHatchBot = new XYPos(xLeft + (2 * xShift(clkCycleWidth)), Constants_yBot);
    if (transition.tag === 1) {
        return [[topR], [botR]];
    }
    else if (highZoom(clkCycleWidth)) {
        return [[crossHatchMid, crossHatchTop], [crossHatchMid, crossHatchBot]];
    }
    else {
        return [[crossHatchMid, crossHatchTop, topR], [crossHatchMid, crossHatchBot, botR]];
    }
}

/**
 * Determine transitions for each clock cycle of a binary waveform.
 * Assumes that waveValues starts at clock cycle 0.
 */
export function calculateBinaryTransitions(waveValues) {
    const getBit = (_arg) => {
        if (_arg.tag === 0) {
            if (_arg.fields[0].Dat.tag === 1) {
                const bit_1 = _arg.fields[0].Dat.fields[0];
                return ~~toInt32(bit_1) | 0;
            }
            else {
                const bit = _arg.fields[0].Dat.fields[0];
                return ~~bit | 0;
            }
        }
        else {
            const x = _arg;
            return toFail(`Malformed data: expecting single bit, not ${x}`) | 0;
        }
    };
    return map_1((tupledArg) => {
        const x_1 = tupledArg[0];
        const y = tupledArg[1];
        const matchValue = getBit(x_1) | 0;
        const matchValue_1 = getBit(y) | 0;
        let matchResult;
        switch (matchValue) {
            case 0: {
                switch (matchValue_1) {
                    case 0: {
                        matchResult = 0;
                        break;
                    }
                    case 1: {
                        matchResult = 1;
                        break;
                    }
                    default:
                        matchResult = 4;
                }
                break;
            }
            case 1: {
                switch (matchValue_1) {
                    case 0: {
                        matchResult = 2;
                        break;
                    }
                    case 1: {
                        matchResult = 3;
                        break;
                    }
                    default:
                        matchResult = 4;
                }
                break;
            }
            default:
                matchResult = 4;
        }
        switch (matchResult) {
            case 0:
                return new BinaryTransition(0, []);
            case 1:
                return new BinaryTransition(1, []);
            case 2:
                return new BinaryTransition(2, []);
            case 3:
                return new BinaryTransition(3, []);
            default:
                return toFail(`Unrecognised transition ${getBit(x_1)}, ${getBit(y)}`);
        }
    }, pairwise(append_1([waveValues[0]], waveValues)));
}

export function calculateBinaryTransitionsUInt32(waveValues) {
    const getBit = (bit) => ~~bit;
    return map_1((tupledArg) => {
        const x = tupledArg[0];
        const y = tupledArg[1];
        const matchValue = getBit(x) | 0;
        const matchValue_1 = getBit(y) | 0;
        let matchResult;
        switch (matchValue) {
            case 0: {
                switch (matchValue_1) {
                    case 0: {
                        matchResult = 0;
                        break;
                    }
                    case 1: {
                        matchResult = 1;
                        break;
                    }
                    default:
                        matchResult = 4;
                }
                break;
            }
            case 1: {
                switch (matchValue_1) {
                    case 0: {
                        matchResult = 2;
                        break;
                    }
                    case 1: {
                        matchResult = 3;
                        break;
                    }
                    default:
                        matchResult = 4;
                }
                break;
            }
            default:
                matchResult = 4;
        }
        switch (matchResult) {
            case 0:
                return new BinaryTransition(0, []);
            case 1:
                return new BinaryTransition(1, []);
            case 2:
                return new BinaryTransition(2, []);
            case 3:
                return new BinaryTransition(3, []);
            default:
                return toFail(`Unrecognised transition ${getBit(x)}, ${getBit(y)}`);
        }
    }, pairwise(append_1(new Uint32Array([waveValues[0]]), waveValues, Uint32Array)));
}

export function calculateBinaryTransitionsBigInt(waveValues) {
    const getBit = (bit) => ~~toInt32(bit);
    return map_1((tupledArg) => {
        const x = tupledArg[0];
        const y = tupledArg[1];
        const matchValue = getBit(x) | 0;
        const matchValue_1 = getBit(y) | 0;
        let matchResult;
        switch (matchValue) {
            case 0: {
                switch (matchValue_1) {
                    case 0: {
                        matchResult = 0;
                        break;
                    }
                    case 1: {
                        matchResult = 1;
                        break;
                    }
                    default:
                        matchResult = 4;
                }
                break;
            }
            case 1: {
                switch (matchValue_1) {
                    case 0: {
                        matchResult = 2;
                        break;
                    }
                    case 1: {
                        matchResult = 3;
                        break;
                    }
                    default:
                        matchResult = 4;
                }
                break;
            }
            default:
                matchResult = 4;
        }
        switch (matchResult) {
            case 0:
                return new BinaryTransition(0, []);
            case 1:
                return new BinaryTransition(1, []);
            case 2:
                return new BinaryTransition(2, []);
            case 3:
                return new BinaryTransition(3, []);
            default:
                return toFail(`Unrecognised transition ${getBit(x)}, ${getBit(y)}`);
        }
    }, pairwise(append_1([waveValues[0]], waveValues)));
}

/**
 * Determine transitions for each clock cycle of a non-binary waveform.
 * Assumes that waveValues starts at clock cycle 0.
 */
export function calculateNonBinaryTransitions(waveValues) {
    const transitions = map_1((tupledArg) => {
        const x = tupledArg[0];
        const y = tupledArg[1];
        if (equals(x, y)) {
            return new NonBinaryTransition(1, []);
        }
        else {
            return new NonBinaryTransition(0, []);
        }
    }, pairwise(waveValues));
    return append_1([new NonBinaryTransition(0, [])], transitions);
}

export function isWaveSelected(wsModel, index) {
    return contains(index, wsModel.SelectedWaves, {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

export function isRamSelected(ramId_, ramId__1, wsModel) {
    const ramId = [ramId_, ramId__1];
    return containsKey(ramId, wsModel.SelectedRams);
}

/**
 * get integer from OutputPortNumber
 */
export function getInputPortNumber(ipn) {
    const pn = ipn;
    return pn | 0;
}

/**
 * get integer from OutputPortNumber
 */
export function getOutputPortNumber(opn) {
    const pn = opn;
    return pn | 0;
}

/**
 * convert a string to CamelCase:
 */
export function camelCaseDottedWords(text) {
    const camelWord = (s) => {
        const matchValue = s.length | 0;
        switch (matchValue) {
            case 0:
                return "";
            case 1:
                return s.toLocaleUpperCase();
            default:
                return s.slice(0, 0 + 1).toLocaleUpperCase() + s.slice(1, (s.length - 1) + 1).toLocaleLowerCase();
        }
    };
    return join(".", map_1(camelWord, text.split(".")));
}

/**
 * get string in the [x:x] format given the bit limits
 * output representation of bus width
 */
export function bitLimsString(a, b) {
    let msb, lsb, msb_1, lsb_1;
    let matchResult, lsb_2, msb_2, lsb_3, msb_3;
    if (a === 0) {
        if (b === 0) {
            matchResult = 0;
        }
        else if ((msb = (a | 0), (lsb = (b | 0), msb === lsb))) {
            matchResult = 1;
            lsb_2 = b;
            msb_2 = a;
        }
        else {
            matchResult = 2;
            lsb_3 = b;
            msb_3 = a;
        }
    }
    else if ((msb_1 = (a | 0), (lsb_1 = (b | 0), msb_1 === lsb_1))) {
        matchResult = 1;
        lsb_2 = b;
        msb_2 = a;
    }
    else {
        matchResult = 2;
        lsb_3 = b;
        msb_3 = a;
    }
    switch (matchResult) {
        case 0:
            return "";
        case 1:
            return toText(printf("(%d)"))(msb_2);
        default:
            return toText(printf("(%d:%d)"))(msb_3)(lsb_3);
    }
}

export function portBits(n) {
    if (n < 2) {
        return "";
    }
    else {
        return `(${n - 1}:0)`;
    }
}

/**
 * determines how components are dispalyed in waveform selector
 */
export function getCompDetails(fs, wave) {
    const fc = FSharpMap__get_Item(fs.WaveComps, wave.WaveId.Id);
    const label = fc.FLabel;
    let patternInput;
    const matchValue = fc.FType;
    let matchResult, gateType_1, n, v, width, s, v_1, width_1, n_1, n_2, n_3, n_4, n_5, n_6, n_7, x, n_8, n_9, n_10, n_11, n_12, n_13, mem, mem_1, mem_2, mem_3;
    switch (matchValue.tag) {
        case 1: {
            matchResult = 1;
            break;
        }
        case 7: {
            matchResult = 2;
            break;
        }
        case 2: {
            matchResult = 3;
            break;
        }
        case 3: {
            matchResult = 4;
            break;
        }
        case 4: {
            matchResult = 5;
            break;
        }
        case 8: {
            matchResult = 6;
            break;
        }
        case 11: {
            matchResult = 10;
            break;
        }
        case 12: {
            matchResult = 11;
            break;
        }
        case 13: {
            matchResult = 12;
            break;
        }
        case 14: {
            matchResult = 13;
            break;
        }
        case 15: {
            matchResult = 14;
            break;
        }
        case 16: {
            matchResult = 15;
            break;
        }
        case 9: {
            matchResult = 16;
            break;
        }
        case 31: {
            matchResult = 25;
            break;
        }
        case 32: {
            matchResult = 26;
            break;
        }
        case 6:
        case 27:
        case 29:
        case 28:
        case 30: {
            matchResult = 37;
            break;
        }
        case 48:
        case 49:
        case 43:
        case 44:
        case 45: {
            matchResult = 38;
            break;
        }
        case 46: {
            matchResult = 39;
            break;
        }
        case 10: {
            matchResult = 7;
            gateType_1 = matchValue.fields[0];
            n = matchValue.fields[1];
            break;
        }
        case 47: {
            matchResult = 8;
            v = matchValue.fields[1];
            width = matchValue.fields[0];
            break;
        }
        case 5: {
            matchResult = 9;
            s = matchValue.fields[2];
            v_1 = matchValue.fields[1];
            width_1 = matchValue.fields[0];
            break;
        }
        case 17: {
            matchResult = 17;
            n_1 = matchValue.fields[0];
            break;
        }
        case 18: {
            matchResult = 17;
            n_1 = matchValue.fields[0];
            break;
        }
        case 19: {
            matchResult = 17;
            n_1 = matchValue.fields[0];
            break;
        }
        case 20: {
            matchResult = 17;
            n_1 = matchValue.fields[0];
            break;
        }
        case 21: {
            if (matchValue.fields[1] != null) {
                matchResult = 19;
                n_3 = matchValue.fields[0];
            }
            else {
                matchResult = 18;
                n_2 = matchValue.fields[0];
            }
            break;
        }
        case 22: {
            matchResult = 20;
            n_4 = matchValue.fields[0];
            break;
        }
        case 23: {
            matchResult = 21;
            n_5 = matchValue.fields[0];
            break;
        }
        case 25: {
            matchResult = 22;
            n_6 = matchValue.fields[0];
            break;
        }
        case 24: {
            matchResult = 23;
            n_7 = matchValue.fields[0];
            break;
        }
        case 26: {
            matchResult = 24;
            x = matchValue.fields[0];
            break;
        }
        case 33: {
            matchResult = 27;
            n_8 = matchValue.fields[0];
            break;
        }
        case 34: {
            matchResult = 28;
            n_9 = matchValue.fields[0];
            break;
        }
        case 35: {
            matchResult = 29;
            n_10 = matchValue.fields[0];
            break;
        }
        case 36: {
            matchResult = 30;
            n_11 = matchValue.fields[0];
            break;
        }
        case 37: {
            matchResult = 31;
            n_12 = matchValue.fields[0];
            break;
        }
        case 38: {
            matchResult = 32;
            n_13 = matchValue.fields[0];
            break;
        }
        case 39: {
            matchResult = 33;
            mem = matchValue.fields[0];
            break;
        }
        case 40: {
            matchResult = 34;
            mem_1 = matchValue.fields[0];
            break;
        }
        case 41: {
            matchResult = 35;
            mem_2 = matchValue.fields[0];
            break;
        }
        case 42: {
            matchResult = 36;
            mem_3 = matchValue.fields[0];
            break;
        }
        default:
            matchResult = 0;
    }
    switch (matchResult) {
        case 0: {
            patternInput = ["Input", true];
            break;
        }
        case 1: {
            patternInput = ["Output", true];
            break;
        }
        case 2: {
            patternInput = ["What? can\'t happen", true];
            break;
        }
        case 3: {
            patternInput = ["Viewer", true];
            break;
        }
        case 4: {
            patternInput = ["Wire Label", true];
            break;
        }
        case 5: {
            patternInput = ["What? can\'t happen", true];
            break;
        }
        case 6: {
            const gateType = (`${fc.FType}`).toLocaleUpperCase();
            patternInput = [`${gateType} gate`, false];
            break;
        }
        case 7: {
            patternInput = [`${n} input ${gateType_1} gate`, false];
            break;
        }
        case 8: {
            patternInput = [`Bus Compare ='${v}'`, false];
            break;
        }
        case 9: {
            patternInput = [`Bus Compare ='${s}'`, false];
            break;
        }
        case 10: {
            patternInput = ["2 input multiplexer", false];
            break;
        }
        case 11: {
            patternInput = ["4 input multiplexer", false];
            break;
        }
        case 12: {
            patternInput = ["8 input multiplexer", false];
            break;
        }
        case 13: {
            patternInput = ["2 input demultiplexer", false];
            break;
        }
        case 14: {
            patternInput = ["4 input demultiplexer", false];
            break;
        }
        case 15: {
            patternInput = ["8 input demultiplexer", false];
            break;
        }
        case 16: {
            patternInput = ["2 line decoder", false];
            break;
        }
        case 17: {
            patternInput = [`${n_1} bit adder`, false];
            break;
        }
        case 18: {
            patternInput = [`${n_2} XOR gates`, false];
            break;
        }
        case 19: {
            patternInput = [`${n_3} bit multiply`, false];
            break;
        }
        case 20: {
            patternInput = [`${n_4} AND gates`, false];
            break;
        }
        case 21: {
            patternInput = [`${n_5} Not gates`, false];
            break;
        }
        case 22: {
            patternInput = [`1 -> ${n_6} bits spreader`, false];
            break;
        }
        case 23: {
            patternInput = [`${n_7} OR gates`, false];
            break;
        }
        case 24: {
            patternInput = [`(${x.Name} instance)`, false];
            break;
        }
        case 25: {
            patternInput = ["D flipflip", false];
            break;
        }
        case 26: {
            patternInput = ["D flipflop with enable", false];
            break;
        }
        case 27: {
            patternInput = [`${n_8} bit D register`, false];
            break;
        }
        case 28: {
            patternInput = [`${n_9} bit D register with enable`, false];
            break;
        }
        case 29: {
            patternInput = [`${n_10} bit Counter with enable and load`, false];
            break;
        }
        case 30: {
            patternInput = [`${n_11} bit Counter with enable`, false];
            break;
        }
        case 31: {
            patternInput = [`${n_12} bit Counter with load`, false];
            break;
        }
        case 32: {
            patternInput = [`${n_13} bit Counter`, false];
            break;
        }
        case 33: {
            patternInput = [`ROM  (${1 << mem.AddressWidth} word X ${mem.WordWidth} bit) asynchronous read`, false];
            break;
        }
        case 34: {
            patternInput = [`ROM  (${1 << mem_1.AddressWidth} word X ${mem_1.WordWidth} bit) synchronous read`, false];
            break;
        }
        case 35: {
            patternInput = [`RAM  (${1 << mem_2.AddressWidth} word X ${mem_2.WordWidth} bit) synchronous read`, false];
            break;
        }
        case 36: {
            patternInput = [`RAM  (${1 << mem_3.AddressWidth} word X ${mem_3.WordWidth} bit) asynchronous read`, false];
            break;
        }
        case 37: {
            patternInput = toFail(printf("Bus select, MergeWires, MergeN, SplitWire, SplitN should not appear"));
            break;
        }
        case 38: {
            patternInput = toFail(printf("Legacy component types should not appear"));
            break;
        }
        default:
            patternInput = ["Error: Shift is an internal component that should not appear", false];
    }
    const oneLine = patternInput[1];
    const descr = patternInput[0];
    if (oneLine) {
        return `${label}${portBits(wave.Width)} ${descr}`;
    }
    else {
        return `${label} ${descr}`;
    }
}

/**
 * Which group (for selector classification) is a component in?
 */
export function getCompGroup(fs, wave) {
    const matchValue = FSharpMap__get_Item(fs.WaveComps, wave.WaveId.Id).FType;
    switch (matchValue.tag) {
        case 8:
        case 10:
            return new ComponentGroup(4, []);
        case 47:
        case 5:
            return new ComponentGroup(3, []);
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 9:
            return new ComponentGroup(5, []);
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 25:
        case 24:
            return new ComponentGroup(6, []);
        case 26:
            return new ComponentGroup(7, []);
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 37:
        case 36:
        case 38:
            return new ComponentGroup(8, []);
        case 39:
        case 40:
        case 41:
        case 42:
            return new ComponentGroup(9, []);
        case 6:
        case 27:
        case 29:
        case 28:
        case 30:
            return toFail(printf("Bus select, MergeWires, MergeN, SplitWire should not appear"));
        case 48:
        case 49:
        case 43:
        case 44:
        case 45:
            return toFail(printf("Legacy component types should not appear"));
        case 46:
            return toFail(printf("Shift is an internal-only component which should never appear on the canvas"));
        default:
            return new ComponentGroup(1, []);
    }
}

/**
 * Name for summary field in details element.
 * NB: There are fields which are commented out: these can be added back in
 * later on if we want to group those components together by type rather than
 * separately by name.
 */
export function summaryName(ws, cBox, subSheet, waves) {
    switch (cBox.tag) {
        case 1: {
            const fc = cBox.fields[0];
            const descr = getCompDetails(ws.FastSim, item(0, waves));
            return descr;
        }
        case 2: {
            const compGroup = cBox.fields[0];
            let name_1;
            switch (compGroup.tag) {
                case 1: {
                    name_1 = "Inputs / Outputs / Labels / Viewers";
                    break;
                }
                case 3: {
                    name_1 = "Buses";
                    break;
                }
                case 4: {
                    name_1 = "Logic Gates";
                    break;
                }
                case 5: {
                    name_1 = "Multiplexers";
                    break;
                }
                case 6: {
                    name_1 = "Arithmetic";
                    break;
                }
                case 8: {
                    name_1 = "Flip Flops and Registers";
                    break;
                }
                case 9: {
                    name_1 = "RAMs and ROMs";
                    break;
                }
                case 10: {
                    const compLabel = compGroup.fields[0];
                    name_1 = compLabel;
                    break;
                }
                case 7: {
                    name_1 = "Custom Components";
                    break;
                }
                default:
                    name_1 = "What? Not used!";
            }
            return `${name_1.toLocaleUpperCase()}`;
        }
        case 3: {
            const subSheet_1 = cBox.fields[0];
            return `Subsheet ${camelCaseDottedWords(item(length(subSheet_1) - 1, subSheet_1))}`;
        }
        default: {
            const name = cBox.fields[1];
            return camelCaseDottedWords(name);
        }
    }
}

export function path2fId(fastSim, path) {
    if (isEmpty(path)) {
        return void 0;
    }
    else {
        const p = path;
        return [item(length(p) - 1, p), getSlice(0, length(p) - 2, p)];
    }
}

export function sheetIdToName(fastSim, sheetId) {
    const _arg = path2fId(fastSim, sheetId);
    if (_arg != null) {
        const fId = _arg;
        return singleton(FSharpMap__get_Item(fastSim.WaveComps, fId).FLabel);
    }
    else {
        return empty();
    }
}

export function sheetIdToSubsheets(fastSim, sheetId) {
    const matchValue = length(sheetId) | 0;
    if (matchValue === 0) {
        return empty();
    }
    else {
        const n = matchValue | 0;
        return collect((i) => sheetIdToName(fastSim, getSlice(0, i - 1, sheetId)), toList(rangeDouble(1, 1, n)));
    }
}

/**
 * get react element to display a subsheet indication as a dotted string
 */
export function subSheetsToNameReact(subSheets) {
    return camelCaseDottedWords(join(".", subSheets));
}

/**
 * Check if one list is an initial sublist of another
 */
export function prefixOf(pre, whole) {
    if (length(whole) >= length(pre)) {
        return equals(getSlice(0, length(pre) - 1, whole), pre);
    }
    else {
        return false;
    }
}

/**
 * Convert Wave list to list of WaveIndexT
 */
export function wavesToIds(waves) {
    return map((wave) => wave.WaveId, waves);
}

export function tr1(react) {
    return react_1.createElement("tr", {}, react);
}

export function td1(react) {
    return react_1.createElement("td", {}, react);
}

/**
 * Sets or clears a subset of ShowSheetDetail
 */
export function setWaveSheetSelectionOpen(wsModel, subSheets, show) {
    const setChange = ofList(subSheets, {
        Compare: compare,
    });
    const newSelect = show ? union(setChange, wsModel.ShowSheetDetail) : difference(wsModel.ShowSheetDetail, setChange);
    return new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, newSelect, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves);
}

/**
 * Sets or clears a subset of ShowComponentDetail
 */
export function setWaveComponentSelectionOpen(wsModel, fIds, show) {
    const fIdSet = ofList(fIds, {
        Compare: compareArrays,
    });
    const newSelect = show ? union(fIdSet, wsModel.ShowComponentDetail) : difference(wsModel.ShowComponentDetail, fIdSet);
    return new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, newSelect, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves);
}

/**
 * Sets or clears a subset of ShowGroupDetail
 */
export function setWaveGroupSelectionOpen(wsModel, grps, show) {
    const grpSet = ofList(grps, {
        Compare: compareArrays,
    });
    const newSelect = show ? union(grpSet, wsModel.ShowGroupDetail) : difference(wsModel.ShowGroupDetail, grpSet);
    return new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, newSelect, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves);
}

export function setSelectionOpen(wsModel, cBox, show) {
    switch (cBox.tag) {
        case 1: {
            const fc = cBox.fields[0];
            return setWaveComponentSelectionOpen(wsModel, singleton(fc.fId), show);
        }
        case 2: {
            const subSheet = cBox.fields[1];
            const grp = cBox.fields[0];
            return setWaveGroupSelectionOpen(wsModel, singleton([grp, subSheet]), show);
        }
        case 3: {
            const subSheet_1 = cBox.fields[0];
            return setWaveSheetSelectionOpen(wsModel, singleton(subSheet_1), show);
        }
        default:
            return toFail(printf("What? setselectionopen cannot be called from a Port"));
    }
}

/**
 * get all waves electrically connected to a given wave
 */
export function getConnectedWaves(ws, wave) {
    return toList(values(filter((wi, _arg) => (wi.SimArrayIndex === wave.WaveId.SimArrayIndex), ws.AllWaves)));
}

export function getFastSimualationLinkedPorts(fs, _arg1_, _arg1__1, _arg1__2) {
    const _arg = [_arg1_, _arg1__1, _arg1__2];
    const pType = _arg[2];
    const pNum = _arg[1];
    const fc = _arg[0];
    return fs.FSComps;
}

/**
 * Some components have input and output connected - return both ports in that case
 */
export function getConnectedComponentPorts(ws, port_, port__1, port__2) {
    const port = [port_, port__1, port__2];
    const port_1 = port;
    const portType = port_1[2];
    const portNum = port_1[1] | 0;
    const fc = port_1[0];
    const fs = ws.FastSim;
    const portIO = ofArray([[fc, portNum, new PortType(0, [])], [fc, portNum, new PortType(1, [])]]);
    const matchValue = fc.FType;
    let matchResult;
    switch (matchValue.tag) {
        case 1: {
            matchResult = 0;
            break;
        }
        case 3: {
            if (containsKey([fc.FLabel, fc.fId[1]], fs.FIOActive)) {
                matchResult = 1;
            }
            else {
                matchResult = 2;
            }
            break;
        }
        default:
            matchResult = 2;
    }
    switch (matchResult) {
        case 0:
            return portIO;
        case 1:
            return portIO;
        default:
            return singleton(port_1);
    }
}

/**
 * Get the name of a subsheet from its subsheet (string) path list to root of simulation.
 */
export function nameOfSubsheet(fs, subSheet) {
    if (isEmpty(subSheet)) {
        return fs.SimulatedTopSheet;
    }
    else {
        const sheets = subSheet;
        return item(length(sheets) - 1, sheets);
    }
}

/**
 * Work out a SheetPort from a wave, if one exists
 * SheetPorts may not exist in some corner cases when simulation is ending etc.
 */
export function waveToSheetPort(fs, wave) {
    const sheet = nameOfSubsheet(fs, wave.SubSheet);
    const wi = wave.WaveId;
    return defaultArg(map_2((comp) => {
        let port;
        const matchValue_1 = length(comp.InputPorts) > 0;
        const matchValue_2 = length(comp.OutputPorts) > 0;
        let matchResult;
        if (wi.PortType.tag === 1) {
            if (matchValue_1) {
                if (matchValue_2) {
                    matchResult = 1;
                }
                else {
                    matchResult = 0;
                }
            }
            else if (matchValue_2) {
                matchResult = 1;
            }
            else {
                matchResult = 2;
            }
        }
        else if (matchValue_1) {
            matchResult = 0;
        }
        else if (matchValue_2) {
            matchResult = 1;
        }
        else {
            matchResult = 2;
        }
        switch (matchResult) {
            case 0: {
                port = item(wi.PortNumber, comp.InputPorts);
                break;
            }
            case 1: {
                port = item(wi.PortNumber, comp.OutputPorts);
                break;
            }
            default:
                port = toFail(printf("What? no parts found in waveToSheetPort"));
        }
        return singleton(new SheetPort(sheet.toLocaleLowerCase(), port));
    }, flatten(map_2((table_1) => tryFind(wi.Id[0], table_1), tryFind(sheet.toLocaleLowerCase(), fs.ComponentsById)))), empty());
}

/**
 * function to print a lits of SheetPort for debugging IOLabels
 */
export function printSPL(tp, fs, spL) {
    const comps = fs.ComponentsById;
    const printSP = (sp) => {
        const comp = FSharpMap__get_Item(FSharpMap__get_Item(comps, sp.Sheet), sp.PortOnComp.HostId);
        return toText(`IsIOLabel=${equals(comp.Type, new ComponentType(3, []))}, lab=${comp.Label}`);
    };
    const arg_1 = join(",", map(printSP, spL));
    toConsole(printf("%s:[%s]"))(tp)(arg_1);
    return spL;
}

/**
 * given a SheetPort, get all directly connected SheetPorts
 */
export function connectedPorts(fs, sheetPort) {
    const compMap = fs.ComponentsById;
    const portMap = fs.ConnectionsByPort;
    const name = sheetPort.Sheet;
    return collect((conn) => {
        let compsWithIds;
        return collect((_arg) => {
            if (_arg != null) {
                const sheetPort_1 = _arg;
                return singleton(sheetPort_1);
            }
            else {
                return empty();
            }
        }, map((compsWithIds = FSharpMap__get_Item(compMap, name), (port) => portSheetPort(compsWithIds, name, port)), ofArray([conn.Source, conn.Target])));
    }, defaultArg(tryFind(sheetPort, portMap), empty()));
}

/**
 * given an IOlabel port, get all same-name IOLabels on the same sheet
 */
export function connectedIOs(fs, sp) {
    const comps = FSharpMap__get_Item(fs.ComponentsById, sp.Sheet);
    const matchValue = FSharpMap__get_Item(comps, sp.PortOnComp.HostId);
    if (matchValue.Type.tag === 3) {
        const comp = matchValue;
        const sheet = sp.Sheet;
        return collect((_arg) => {
            let label, comp1;
            let matchResult;
            if (_arg.Type.tag === 3) {
                if ((label = _arg.Label, (comp1 = _arg, label === comp.Label))) {
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
                    const label_1 = _arg.Label;
                    const comp1_1 = _arg;
                    return append((length(comp1_1.OutputPorts) > 0) ? singleton(new SheetPort(sheet, item(0, comp1_1.OutputPorts))) : empty(), append((length(comp1_1.InputPorts) > 0) ? singleton(new SheetPort(sheet, item(0, comp1_1.InputPorts))) : empty(), singleton(sp)));
                }
                default:
                    return empty();
            }
        }, toList(values(comps)));
    }
    else {
        return singleton(sp);
    }
}

/**
 * Given a list of ports, get all ports connected to any port in it.
 * used by connsOfWave
 */
export function allConnectedPorts(fs_mut, sp_mut) {
    let n;
    allConnectedPorts:
    while (true) {
        const fs = fs_mut, sp = sp_mut;
        const newSP = List_distinct(collect((sheetPort) => connectedPorts(fs, sheetPort), List_distinct(collect((sp_1) => connectedIOs(fs, sp_1), sp), {
            Equals: equals,
            GetHashCode: safeHash,
        })), {
            Equals: equals,
            GetHashCode: safeHash,
        });
        const matchValue = (length(newSP) - length(sp)) | 0;
        if (matchValue === 0) {
            return newSP;
        }
        else if ((n = (matchValue | 0), n >= 0)) {
            const n_1 = matchValue | 0;
            fs_mut = fs;
            sp_mut = newSP;
            continue allConnectedPorts;
        }
        else {
            return newSP;
        }
        break;
    }
}

/**
 * Get all the connections of a given wave signal
 */
export function connsOfWave(fs, wave) {
    return List_distinct(map((conn) => conn.Id, collect((sp_1) => {
        const matchValue = tryFind(sp_1, fs.ConnectionsByPort);
        if (matchValue != null) {
            const conns = matchValue;
            return conns;
        }
        else {
            return empty();
        }
    }, allConnectedPorts(fs, waveToSheetPort(fs, wave)))), {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

/**
 * info button generation function
 */
export function infoButton(tooltipMessage, style, tooltipPosition) {
    const props = [new HTMLAttr(64, [`${"tooltip"} ${"has-tooltip-multiline"} ${"has-tooltip-info"} ${tooltipPosition}`]), dataTooltip(tooltipMessage), ["style", keyValueList(style, 1)]];
    return react_1.createElement("div", keyValueList(props, 1), Constants_infoSignUnicode);
}

/**
 * button driving a popup with a page of info about waveform simulator
 */
export function waveInfoButton(dispatch) {
    return button(singleton(new Option(17, [singleton(["style", {
        fontSize: "25px",
        marginTop: "0px",
        marginLeft: "10px",
        float: "left",
    }])])), (_arg) => {
    }, Constants_infoSignUnicode);
}

export const selectionInfoButton = infoButton(Constants_infoMessage, ofArray([new CSSProp(153, ["25px"]), new CSSProp(226, ["0px"]), new CSSProp(224, ["10px"]), new CSSProp(144, ["left"])]), "has-tooltip-right");

/**
 * remove highlights on components generated by hovering on waveform labels
 */
export function removeHighlights(model, dispatch) {
    if ((length(model.Sheet.SelectedWires) > 0) ? true : (length(model.Sheet.SelectedComponents) > 0)) {
        dispatch(new Msg(1, [new SheetT_Msg(26, [])]));
    }
}

export class WaveSimButtonOptions extends Record {
    constructor(IsDirty, IsRunning, IsErrored, StartEndMsg, StartEndColor) {
        super();
        this.IsDirty = IsDirty;
        this.IsRunning = IsRunning;
        this.IsErrored = IsErrored;
        this.StartEndMsg = StartEndMsg;
        this.StartEndColor = StartEndColor;
    }
}

export function WaveSimButtonOptions_$reflection() {
    return record_type("WaveSimHelpers.WaveSimButtonOptions", [], WaveSimButtonOptions, () => [["IsDirty", bool_type], ["IsRunning", bool_type], ["IsErrored", bool_type], ["StartEndMsg", string_type], ["StartEndColor", Color_IColor_$reflection()]]);
}

/**
 * end the current simulation
 */
export function endButtonAction(canvasState, model, dispatch, ev) {
    toConsole(printf("endbuttonaction"));
    removeHighlights(model, dispatch);
    dispatch(new Msg(26, []));
}

/**
 * Return info about current state of waveform simulator
 * which is used to switch buttons on/off etc.
 */
export function getWaveSimButtonOptions(canv_, canv__1, model, ws) {
    let canvState, simData, e;
    const canv = [canv_, canv__1];
    const fs = ws.FastSim;
    const simExists = !equals(model.WaveSimSheet, "") && !equals(model.WaveSimSheet, void 0);
    const success = equals(ws.State, new WaveSimState(5, [])) ? true : equals(ws.State, new WaveSimState(4, []));
    let hasSimErr;
    const matchValue = simulateModel(model.WaveSimSheet, Constants_maxLastClk + Constants_maxStepsOverflow, canv[0], canv[1], model);
    const copyOfStruct = matchValue[0];
    hasSimErr = ((copyOfStruct.tag === 0) ? ((canvState = matchValue[1], (simData = copyOfStruct.fields[0], false))) : ((e = copyOfStruct.fields[0], true)));
    const errored = hasSimErr ? true : (ws.State.tag === 3);
    const running = (success ? true : errored) && simExists;
    const isDirty = (((simExists && running) && !compareLoadedStates(fs, canv[0], canv[1], model.CurrentProj)) && equals(model.UIState, void 0)) && !model.IsLoading;
    const patternInput = running ? ["EndSimulation", new Color_IColor(8, [])] : (errored ? ["View Problems", new Color_IColor(7, [])] : ["Start Simulation", new Color_IColor(6, [])]);
    const startEndMsg = patternInput[0];
    const startEndColor = patternInput[1];
    return new WaveSimButtonOptions(isDirty, running, errored, startEndMsg, startEndColor);
}

/**
 * Run ws.FastSim if necessary to ensure simulation has number of steps needed to
 * display all cycles on screen. TimeOut is an optional time out used to implement
 * a progress bar.
 */
export function extendSimulation(timeOut, ws) {
    const stepsNeeded = (ws.ShownCycles + ws.StartCycle) | 0;
    toConsole(`Extending simulation to ${stepsNeeded} cycles`);
    return runFastSimulation(timeOut, stepsNeeded + Constants_extraSimulatedSteps, ws.FastSim);
}

/**
 * returns true if any memory component in fs linked to a .ram file is outofdate because of the .ram file changing
 */
export function checkIfMemoryCompsOutOfDate(p, fs) {
    return exists((sheet, m) => exists((cid, comp) => {
        let matchResult, fName, mem;
        const activePatternResult = $007CMemory$007C_$007C(comp.Type);
        if (activePatternResult != null) {
            if (activePatternResult.Init.tag === 1) {
                matchResult = 0;
                fName = activePatternResult.Init.fields[0];
                mem = activePatternResult;
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
                const matchValue_1 = initialiseMem(mem, p.ProjectPath);
                if (matchValue_1.tag === 1) {
                    return false;
                }
                else {
                    const mem$0027 = matchValue_1.fields[0];
                    return !equals(mem$0027, mem);
                }
            }
            default:
                return true;
        }
    }, m), fs.ComponentsById);
}

//# sourceMappingURL=WaveSimHelpers.fs.js.map
