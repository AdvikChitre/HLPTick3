import { tryFind as tryFind_1, unzip, mapIndexed, concat as concat_1, append, pairwise, indexed, map } from "../../fable_modules/fable-library.4.1.4/Array.js";
import { arrayHash, curry2, comparePrimitives, equalArrays, compareArrays, int32ToString, uncurry2, safeHash, equals } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { getWaveSimButtonOptions, endButtonAction, Constants_maxSimulationTimeWithoutSpinner, Constants_initSimulationTime, Constants_clkCycleNarrowThreshold, getWaveValue, selectedWaves as selectedWaves_2, connsOfWave, button, Constants_minCycleWidth, Constants_minVisibleCycles, Constants_zoomChangeFactor, endCycle, nonBinaryWavePoints, calculateNonBinaryTransitions, binaryWavePoints, calculateBinaryTransitionsUInt32, Constants_nonBinaryTransLen, singleWaveWidth, Constants_waveLegendMaxChars, Gap, NonBinaryTransition } from "./WaveSimHelpers.fs.js";
import { contains, sortBy, fold, head, tail, isEmpty, cons, sort, insertAt, length, pairwise as pairwise_1, item, exists, collect, insertManyAt, filter, singleton, append as append_1, ofArray, map as map_1, empty, concat } from "../../fable_modules/fable-library.4.1.4/List.js";
import { convertBigIntToUInt64, valToPaddedString, fastDataToPaddedString, BigIntToPaddedString, UInt32ToPaddedString } from "../../Simulator/NumberHelpers.fs.js";
import { getTextWidthInPixels } from "../../Common/DrawHelpers.fs.js";
import { viewWaveSimStyle, showWaveformsAndRamStyle, errorMessageStyle, topHalfStyle, topHalfButtonProps, Constants_valuesColWidth, Constants_scrollBarWidth, Constants_rightMargin, Constants_leftMargin, calcNamesColWidth, ramTablesLevelProps, centerAlignStyle, ramTableLevelProps, RamRowType, ramTableRowStyle, showWaveformsStyle, waveformColumnStyle, waveRowsStyle, clkCycleHighlightSVG, clkCycleNumberRowProps, clkCycleText, valuesColumnStyle, valueLabelStyle, valuesColumnSize, topRow, namesColumnProps, nameLabelStyle, Constants_labelPadding, nameRowLevelLeftProps, Constants_rowHeight, nameRowLevelStyle, radixTabsStyle, radixTabAStyle, radixTabProps, clkCycleInputProps, clkCycleInnerStyle, clkCycleButtonStyle, zoomInSVG, clkCycleRightStyle, zoomOutSVG, clkCycleLeftStyle, wavePolylineStyle, waveRowProps, valueOnWaveProps, Constants_valueOnWavePadding, Constants_valueOnWaveText } from "./WaveSimStyle.fs.js";
import { min, max } from "../../fable_modules/fable-library.4.1.4/Double.js";
import * as react from "react";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { empty as empty_1, singleton as singleton_1, append as append_2, delay, toArray, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../../fable_modules/fable-library.4.1.4/Range.js";
import { toConsole, printf, toFail } from "../../fable_modules/fable-library.4.1.4/String.js";
import { instrumentInterval, getInterval, getTimeMs } from "../../Common/TimeHelpers.fs.js";
import { List_except, Array_distinct } from "../../fable_modules/fable-library.4.1.4/Seq2.js";
import { SimSubTab, WaveSimState, Model, SpinPayload, Msg, WaveSimModel, Wave } from "../../Model/ModelType.fs.js";
import { updateWSModelOfSheet, Constants_maxStepsOverflow, removeAllSimulationsFromModel, getCurrFile, getWSModel, updateWSModel, Constants_maxLastClk } from "../ModelHelpers.fs.js";
import { list as list_5, Option } from "../../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { tryParse, op_UnaryNegation_Int32 } from "../../fable_modules/fable-library.4.1.4/Int32.js";
import { input } from "../../fable_modules/Fulma.2.16.0/Elements/Form/./Input.fs.js";
import { Option as Option_1, IInputType } from "../../fable_modules/Fulma.2.16.0/Elements/Form/Input.fs.js";
import { Browser_Types_Event__Event_get_Value } from "../../fable_modules/Fable.React.8.0.1/Fable.React.Extensions.fs.js";
import { FSharpRef } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { NumberBase } from "../../Common/CommonTypes.fs.js";
import { Option as Option_2, tabs, Tab_Option, tab } from "../../fable_modules/Fulma.2.16.0/Components/Tabs.fs.js";
import { CSSProp, HTMLAttr, DOMAttr } from "../../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { SheetT_Msg, BusWireT_Msg, SymbolT_Msg } from "../../Model/DrawModelType.fs.js";
import { Item_Option, item as item_1, right, left, Level_Option, level } from "../../fable_modules/Fulma.2.16.0/Layouts/Level.fs.js";
import { keys, filter as filter_1, change, map as map_2, add, FSharpMap__get_Item, toList as toList_1, tryFind } from "../../fable_modules/fable-library.4.1.4/Map.js";
import { value as value_3, map as map_3, defaultArg } from "../../fable_modules/fable-library.4.1.4/Option.js";
import { Screen, Color_IColor, Size_ISize, Common_GenericOption } from "../../fable_modules/Fulma.2.16.0/Common.fs.js";
import { Option as Option_3, delete$ } from "../../fable_modules/Fulma.2.16.0/Elements/Delete.fs.js";
import { extractFastSimulationState, runFastSimulation } from "../../Simulator/Fast/FastRun.fs.js";
import { fromUInt32, fromUInt64, compare, op_Division, equals as equals_1, op_Addition, fromInt32, op_LeftShift, op_Subtraction, op_BitwiseAnd, toInt64 } from "../../fable_modules/fable-library.4.1.4/BigInt.js";
import { h4, Option as Option_4, h6 } from "../../fable_modules/Fulma.2.16.0/Elements/Heading.fs.js";
import { TableOption, table as table_3 } from "../../fable_modules/Fulma.2.16.0/Elements/Table.fs.js";
import { Cmd_none } from "../../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { selectRamModal, selectRamButton, selectWavesModal, selectWavesButton, getWaves } from "./WaveSimSelect.fs.js";
import { refreshSvg, emptyRefreshSVG, Constants_dividerBarWidth } from "../Style.fs.js";
import { updateAllMemoryComps } from "../MemoryEditorView.fs.js";
import { viewSimulationError, setSimErrorFeedback, setFastSimInputsToDefault, simulateModel } from "../SimulationView.fs.js";
import { columns } from "../../fable_modules/Fulma.2.16.0/Layouts/Columns.fs.js";
import { ISize, Option as Option_5, column } from "../../fable_modules/Fulma.2.16.0/Layouts/Column.fs.js";

/**
 * Generates SVG to display values on non-binary waveforms when there is enough space.
 * TODO: Fix this so it does not generate all 500 cycles.
 */
export function displayUInt32OnWave(wsModel, width, waveValues, transitions) {
    let array_1;
    const changeTransitions = map((tupledArg_1) => {
        const i = tupledArg_1[0] | 0;
        return i | 0;
    }, (array_1 = indexed(transitions), array_1.filter((tupledArg) => {
        const x = tupledArg[1];
        return equals(x, new NonBinaryTransition(0, []));
    })), Int32Array);
    const gaps = map((tupledArg_2) => {
        const i1 = tupledArg_2[0] | 0;
        const i2 = tupledArg_2[1] | 0;
        return new Gap(i1, i2 - i1);
    }, pairwise(append(changeTransitions, new Int32Array([(wsModel.StartCycle + transitions.length) - 1]), Int32Array)));
    return concat(map((gap) => {
        let arg;
        const waveValue = UInt32ToPaddedString(Constants_waveLegendMaxChars, wsModel.Radix, width, waveValues[gap.Start]);
        const cycleWidth = singleWaveWidth(wsModel);
        const availableWidth = (gap.Length * cycleWidth) - (2 * Constants_nonBinaryTransLen);
        const requiredWidth = 1.1 * getTextWidthInPixels(Constants_valueOnWaveText, waveValue);
        const widthWithPadding = (2 * requiredWidth) + Constants_valueOnWavePadding;
        if (availableWidth < requiredWidth) {
            return empty();
        }
        else {
            const repeats = max(1, ~~((arg = (availableWidth / widthWithPadding), Math.floor(arg)))) | 0;
            const repeatSpace = (availableWidth - (repeats * requiredWidth)) / ((repeats + 1) * cycleWidth);
            const valueText = (i_1) => {
                const props = valueOnWaveProps(wsModel, i_1, gap.Start + repeatSpace, widthWithPadding);
                return react.createElement("text", keyValueList(props, 1), waveValue);
            };
            return map_1(valueText, toList(rangeDouble(0, 1, repeats - 1)));
        }
    }, gaps));
}

export function displayBigIntOnWave(wsModel, width, waveValues, transitions) {
    let array_1;
    const changeTransitions = map((tupledArg_1) => {
        const i = tupledArg_1[0] | 0;
        return i | 0;
    }, (array_1 = indexed(transitions), array_1.filter((tupledArg) => {
        const x = tupledArg[1];
        return equals(x, new NonBinaryTransition(0, []));
    })), Int32Array);
    const gaps = map((tupledArg_2) => {
        const i1 = tupledArg_2[0] | 0;
        const i2 = tupledArg_2[1] | 0;
        return new Gap(i1, i2 - i1);
    }, pairwise(append(changeTransitions, new Int32Array([(wsModel.StartCycle + transitions.length) - 1]), Int32Array)));
    return concat(map((gap) => {
        let arg;
        const waveValue = BigIntToPaddedString(Constants_waveLegendMaxChars, wsModel.Radix, width, waveValues[gap.Start]);
        const cycleWidth = singleWaveWidth(wsModel);
        const availableWidth = (gap.Length * cycleWidth) - (2 * Constants_nonBinaryTransLen);
        const requiredWidth = 1.1 * getTextWidthInPixels(Constants_valueOnWaveText, waveValue);
        const widthWithPadding = (2 * requiredWidth) + Constants_valueOnWavePadding;
        if (availableWidth < requiredWidth) {
            return empty();
        }
        else {
            const repeats = max(1, ~~((arg = (availableWidth / widthWithPadding), Math.floor(arg)))) | 0;
            const repeatSpace = (availableWidth - (repeats * requiredWidth)) / ((repeats + 1) * cycleWidth);
            const valueText = (i_1) => {
                const props = valueOnWaveProps(wsModel, i_1, gap.Start + repeatSpace, widthWithPadding);
                return react.createElement("text", keyValueList(props, 1), waveValue);
            };
            return map_1(valueText, toList(rangeDouble(0, 1, repeats - 1)));
        }
    }, gaps));
}

/**
 * Detects if SVG is correct, based on zoom & position & existence
 * The fast simulation data is assumed unchanged
 */
export function waveformIsUptodate(ws, wave) {
    if (((!equals(wave.SVG, void 0) && (wave.ShownCycles === ws.ShownCycles)) && (wave.StartCycle === ws.StartCycle)) && (wave.CycleWidth === singleWaveWidth(ws))) {
        return equals(wave.Radix, ws.Radix);
    }
    else {
        return false;
    }
}

/**
 * Called when InitiateWaveSimulation msg is dispatched
 * and when wave simulator is refreshed.
 * Generates or updates the SVG for a specific waveform whetehr needed or not.
 * The SVG depends on cycle width as well as start/stop clocks and design.
 * Assumes that the fast simulation data has not changed and has enough cycles
 */
export function generateWaveform(ws, index, wave) {
    let props, w, clkCycleWidth;
    let waveform;
    const matchValue = wave.Width | 0;
    switch (matchValue) {
        case 0: {
            waveform = toFail(printf("Cannot have wave of width 0"));
            break;
        }
        case 1: {
            const start = getTimeMs();
            const transitions = calculateBinaryTransitionsUInt32(wave.WaveValues.UInt32Step);
            const t1 = getTimeMs();
            let wavePoints;
            const waveWidth = singleWaveWidth(ws);
            wavePoints = Array_distinct(concat_1(mapIndexed((index_1, transition) => binaryWavePoints(waveWidth, 0, index_1, transition), transitions)), {
                Equals: equals,
                GetHashCode: safeHash,
            });
            const t2 = getTimeMs();
            const props_2 = waveRowProps(ws);
            const children_2 = [(props = wavePolylineStyle(wavePoints), react.createElement("polyline", keyValueList(props, 1)))];
            waveform = react.createElement("svg", keyValueList(props_2, 1), ...children_2);
            break;
        }
        default:
            if ((w = (matchValue | 0), w <= 32)) {
                const w_1 = matchValue | 0;
                const start_1 = getTimeMs();
                const transitions_1 = calculateNonBinaryTransitions(wave.WaveValues.UInt32Step);
                let patternInput;
                const waveWidth_1 = singleWaveWidth(ws);
                patternInput = unzip(mapIndexed((index_2, transition_1) => nonBinaryWavePoints(waveWidth_1, 0, index_2, transition_1), transitions_1));
                const sndPoints = patternInput[1];
                const fstPoints = patternInput[0];
                const t1_1 = getTimeMs();
                const makePolyline = (points) => {
                    const points_1 = Array_distinct(concat_1(points), {
                        Equals: equals,
                        GetHashCode: safeHash,
                    });
                    const props_4 = wavePolylineStyle(points_1);
                    return react.createElement("polyline", keyValueList(props_4, 1));
                };
                const valuesSVG = displayUInt32OnWave(ws, wave.Width, wave.WaveValues.UInt32Step, transitions_1);
                const t2_1 = getTimeMs();
                const polyLines = ofArray([makePolyline(fstPoints), makePolyline(sndPoints)]);
                const t3 = getTimeMs();
                let svg;
                const props_6 = waveRowProps(ws);
                const children_6 = append_1(polyLines, valuesSVG);
                svg = react.createElement("svg", keyValueList(props_6, 1), ...children_6);
                const arg_2 = fstPoints.length | 0;
                const arg_3 = t1_1 - start_1;
                const arg_4 = t2_1 - t1_1;
                const arg_5 = t3 - t2_1;
                const arg_6 = (getInterval(start_1) - t3) + start_1;
                toConsole(printf("**---NonBinaryTrans %d %.2f %.2f %.2f %.2f------"))(arg_2)(arg_3)(arg_4)(arg_5)(arg_6);
                waveform = svg;
            }
            else {
                const w_2 = matchValue | 0;
                const start_2 = getTimeMs();
                const transitions_2 = calculateNonBinaryTransitions(wave.WaveValues.UInt32Step);
                const patternInput_1 = unzip(mapIndexed(uncurry2((clkCycleWidth = singleWaveWidth(ws), (index_3) => ((transition_2) => nonBinaryWavePoints(clkCycleWidth, 0, index_3, transition_2)))), transitions_2));
                const sndPoints_1 = patternInput_1[1];
                const fstPoints_1 = patternInput_1[0];
                const makePolyline_1 = (points_2) => {
                    const points_3 = Array_distinct(concat_1(points_2), {
                        Equals: equals,
                        GetHashCode: safeHash,
                    });
                    const props_8 = wavePolylineStyle(points_3);
                    return react.createElement("polyline", keyValueList(props_8, 1));
                };
                const valuesSVG_1 = displayBigIntOnWave(ws, wave.Width, wave.WaveValues.BigIntStep, transitions_2);
                const props_10 = waveRowProps(ws);
                const children_10 = append_1(ofArray([makePolyline_1(fstPoints_1), makePolyline_1(sndPoints_1)]), valuesSVG_1);
                waveform = react.createElement("svg", keyValueList(props_10, 1), ...children_10);
            }
    }
    return new Wave(wave.WaveId, ws.StartCycle, ws.ShownCycles, singleWaveWidth(ws), ws.Radix, wave.SheetId, wave.SubSheet, wave.Conns, wave.DisplayName, wave.ViewerDisplayName, wave.CompLabel, wave.PortLabel, wave.Width, wave.WaveValues, waveform);
}

function setClkCycle(wsModel, dispatch, newClkCycle) {
    const start = getTimeMs();
    const newClkCycle_1 = max(0, min(Constants_maxLastClk, newClkCycle)) | 0;
    const output = (newClkCycle_1 <= endCycle(wsModel)) ? ((newClkCycle_1 < wsModel.StartCycle) ? dispatch(new Msg(13, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, newClkCycle_1, wsModel.ShownCycles, newClkCycle_1, false, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)])) : dispatch(new Msg(10, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, newClkCycle_1, false, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]))) : dispatch(new Msg(13, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, newClkCycle_1 - (wsModel.ShownCycles - 1), wsModel.ShownCycles, newClkCycle_1, false, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
    instrumentInterval("setClkCycle", start, void 0);
}

/**
 * If zoomIn, then increase width of clock cycles (i.e.reduce number of visible cycles).
 * otherwise reduce width. GenerateWaveforms message will reconstitute SVGs after the change.
 */
export function changeZoom(wsModel, zoomIn, dispatch) {
    let nc_2, sc_1;
    const start = getTimeMs();
    let shownCycles;
    const wantedCycles = ~~(wsModel.ShownCycles / Constants_zoomChangeFactor) | 0;
    if (zoomIn) {
        let nc_1;
        const nc = wantedCycles | 0;
        nc_1 = ((nc === wsModel.ShownCycles) ? (nc - 1) : nc);
        const minVis = min(wsModel.ShownCycles, Constants_minVisibleCycles) | 0;
        shownCycles = max(nc_1, minVis);
    }
    else {
        const wantedCycles_1 = ~~(wsModel.ShownCycles * Constants_zoomChangeFactor) | 0;
        const maxNc = ~~(wsModel.WaveformColumnWidth / Constants_minCycleWidth) | 0;
        shownCycles = max(wsModel.ShownCycles, min((nc_2 = (wantedCycles_1 | 0), (nc_2 === wsModel.ShownCycles) ? (nc_2 + 1) : nc_2), maxNc));
    }
    let startCycle;
    const sc = (wsModel.StartCycle - ~~((shownCycles - wsModel.ShownCycles) / 2)) | 0;
    const cOffset = (wsModel.CurrClkCycle - sc) | 0;
    startCycle = min(Constants_maxLastClk - shownCycles, max(0, (sc_1 = (sc | 0), (cOffset > (shownCycles - 1)) ? (((sc_1 + cOffset) - shownCycles) + 1) : ((cOffset < 0) ? (sc_1 + cOffset) : sc_1))));
    const output = dispatch(new Msg(13, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, startCycle, shownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
    instrumentInterval("changeZoom", start, void 0);
}

/**
 * Click on these buttons to change the number of visible clock cycles.
 */
export function zoomButtons(wsModel, dispatch) {
    const children = [button(singleton(new Option(17, [singleton(clkCycleLeftStyle)])), (_arg) => {
        changeZoom(wsModel, false, dispatch);
    }, zoomOutSVG), button(singleton(new Option(17, [singleton(clkCycleRightStyle)])), (_arg_1) => {
        changeZoom(wsModel, true, dispatch);
    }, zoomInSVG)];
    return react.createElement("div", keyValueList([clkCycleButtonStyle], 1), ...children);
}

/**
 * Click on these to change the highlighted clock cycle.
 */
export function clkCycleButtons(wsModel, dispatch) {
    const bigStepSize = max(2, ~~(wsModel.ShownCycles / 2)) | 0;
    const scrollWaveformsBy = (numCycles) => {
        setClkCycle(wsModel, dispatch, wsModel.CurrClkCycle + numCycles);
    };
    const children = [button(singleton(new Option(17, [singleton(clkCycleLeftStyle)])), (_arg) => {
        scrollWaveformsBy(op_UnaryNegation_Int32(bigStepSize));
    }, "◀◀"), button(singleton(new Option(17, [singleton(clkCycleInnerStyle)])), (_arg_1) => {
        scrollWaveformsBy(-1);
    }, "◀"), input(ofArray([new Option_1(1, [new IInputType(7, [])]), new Option_1(15, [clkCycleInputProps]), new Option_1(8, [wsModel.ClkCycleBoxIsEmpty ? "" : int32ToString(wsModel.CurrClkCycle)]), new Option_1(13, [(c) => {
        let matchValue_1;
        let outArg = 0;
        matchValue_1 = [tryParse(Browser_Types_Event__Event_get_Value(c), 511, false, 32, new FSharpRef(() => outArg, (v) => {
            outArg = (v | 0);
        })), outArg];
        if (matchValue_1[0]) {
            const n = matchValue_1[1] | 0;
            setClkCycle(wsModel, dispatch, n);
        }
        else if (Browser_Types_Event__Event_get_Value(c) === "") {
            dispatch(new Msg(10, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, true, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
        }
        else {
            dispatch(new Msg(10, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, false, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
        }
    }])])), button(singleton(new Option(17, [singleton(clkCycleInnerStyle)])), (_arg_2) => {
        scrollWaveformsBy(1);
    }, "▶"), button(singleton(new Option(17, [singleton(clkCycleRightStyle)])), (_arg_3) => {
        scrollWaveformsBy(bigStepSize);
    }, "▶▶")];
    return react.createElement("div", keyValueList([clkCycleButtonStyle], 1), ...children);
}

function radixButtons(wsModel, dispatch) {
    const radixString = ofArray([[new NumberBase(2, []), "Bin"], [new NumberBase(0, []), "Hex"], [new NumberBase(1, []), "uDec"], [new NumberBase(3, []), "sDec"]]);
    const radixTab = (tupledArg) => {
        const radix = tupledArg[0];
        const radixStr = tupledArg[1];
        return tab(ofArray([new Tab_Option(0, [equals(wsModel.Radix, radix)]), new Tab_Option(2, [radixTabProps])]), singleton(react.createElement("a", keyValueList([radixTabAStyle, new DOMAttr(40, [(_arg) => {
            dispatch(new Msg(13, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
        }])], 1), radixStr)));
    };
    return tabs(ofArray([new Option_2(4, []), new Option_2(8, [singleton(radixTabsStyle)])]), map_1(radixTab, radixString));
}

export function highlightCircuit(fs, comps, wave, dispatch) {
    dispatch(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(11, [comps])])])]));
    const conns = connsOfWave(fs, wave);
    dispatch(new Msg(1, [new SheetT_Msg(28, [conns])]));
}

/**
 * Create label of waveform name for each selected wave.
 * Note that this is generated after calling selectedWaves. Any changes to this function
 * must also be made to valueRows and waveRows, as the order of the waves matters here.
 * This is because the wave viewer is comprised of three columns of many rows, rather
 * than many rows of three columns.
 */
export function nameRows(model, wsModel, dispatch) {
    return map_1((wave) => {
        let props;
        const visibility = equals(wsModel.HoveredLabel, wave.WaveId) ? "visible" : "hidden";
        return level(singleton(new Level_Option(0, [ofArray([nameRowLevelStyle(equals(wsModel.HoveredLabel, wave.WaveId)), new DOMAttr(56, [(_arg) => {
            if (equals(wsModel.DraggedIndex, void 0)) {
                dispatch(new Msg(10, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wave.WaveId, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
                const symbols = model.Sheet.Wire.Symbol.Symbols;
                const matchValue = tryFind(wave.WaveId.Id[0], symbols);
                if (matchValue == null) {
                }
                else if (matchValue.Component.Type.tag === 3) {
                    const lab = matchValue.Component.Label;
                    const labelComps = map_1((comp) => comp.Id, filter((_arg_2) => {
                        let lab$0027;
                        let matchResult;
                        if (_arg_2.Type.tag === 3) {
                            if ((lab$0027 = _arg_2.Label, lab$0027 === lab)) {
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
                                const lab$0027_1 = _arg_2.Label;
                                return true;
                            }
                            default:
                                return false;
                        }
                    }, map_1((tupledArg) => {
                        const sym = tupledArg[1];
                        return sym.Component;
                    }, toList_1(symbols))));
                    highlightCircuit(wsModel.FastSim, labelComps, wave, dispatch);
                }
                else {
                    const sym_1 = matchValue;
                    highlightCircuit(wsModel.FastSim, singleton(wave.WaveId.Id[0]), wave, dispatch);
                }
            }
        }]), new DOMAttr(55, [(_arg_3) => {
            dispatch(new Msg(10, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, void 0, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
            dispatch(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(11, [empty()])])])]));
            dispatch(new Msg(1, [new SheetT_Msg(22, [connsOfWave(wsModel.FastSim, wave), false])]));
        }]), new HTMLAttr(81, [true]), new DOMAttr(49, [(ev) => {
            ev.dataTransfer.effectAllowed = "move";
            ev.dataTransfer.dropEffect = "move";
            dispatch(new Msg(10, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wave.WaveId, wsModel.SelectedWaves)]));
        }]), new DOMAttr(43, [(ev_1) => {
            ev_1.dataTransfer.dropEffect = "move";
            const nameColEl = document.getElementById("namesColumn");
            const bcr = nameColEl.getBoundingClientRect();
            if ((((ev_1.clientX < bcr.left) ? true : (ev_1.clientX > bcr.right)) ? true : (ev_1.clientY < bcr.top)) ? true : (ev_1.clientY > bcr.bottom)) {
                dispatch(new Msg(10, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, defaultArg(wsModel.PrevSelectedWaves, wsModel.SelectedWaves), wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wave.WaveId, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
            }
        }]), new DOMAttr(48, [(ev_2) => {
            ev_2.preventDefault();
        }]), new DOMAttr(45, [(ev_3) => {
            ev_3.preventDefault();
            ev_3.dataTransfer.dropEffect = "move";
            const nameColEl_1 = document.getElementById("namesColumn");
            const bcr_1 = nameColEl_1.getBoundingClientRect();
            const index = (~~(~~(ev_3.clientY - bcr_1.top) / Constants_rowHeight) - 1) | 0;
            let draggedWave;
            const matchValue_1 = wsModel.DraggedIndex;
            if (matchValue_1 == null) {
                draggedWave = empty();
            }
            else {
                const waveId = matchValue_1;
                draggedWave = singleton(waveId);
            }
            const selectedWaves = insertManyAt(index, draggedWave, List_except(draggedWave, wsModel.SelectedWaves, {
                Equals: equals,
                GetHashCode: safeHash,
            }));
            dispatch(new Msg(10, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, selectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
        }]), new DOMAttr(44, [(_arg_4) => {
            dispatch(new Msg(10, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, void 0, void 0)]));
        }])])])), ofArray([left(singleton(new Common_GenericOption(1, [nameRowLevelLeftProps(visibility)])), singleton(delete$(ofArray([new Option_3(0, [new Size_ISize(0, [])]), new Option_3(1, [singleton(new DOMAttr(40, [(_arg_5) => {
            const selectedWaves_1 = List_except([wave.WaveId], wsModel.SelectedWaves, {
                Equals: equals,
                GetHashCode: safeHash,
            });
            dispatch(new Msg(10, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, selectedWaves_1, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
        }]))])]), empty()))), right(singleton(new Common_GenericOption(1, [singleton(["style", {
            paddingRight: Constants_labelPadding,
        }])])), singleton((props = [nameLabelStyle(equals(wsModel.HoveredLabel, wave.WaveId))], react.createElement("label", keyValueList(props, 1), wave.ViewerDisplayName))))]));
    }, selectedWaves_2(wsModel));
}

/**
 * Create column of waveform names
 */
export function namesColumn(model, wsModel, dispatch) {
    let props, children;
    const start = getTimeMs();
    const rows = nameRows(model, wsModel, dispatch);
    return instrumentInterval("namesColumn", start, (props = namesColumnProps(wsModel), (children = concat([topRow, rows]), react.createElement("div", keyValueList(props, 1), ...children))));
}

/**
 * Create label of waveform value for each selected wave at a given clk cycle.
 * Note that this is generated after calling selectedWaves.
 * Any changes to this function must also be made to nameRows
 * and waveRows, as the order of the waves matters here. This is
 * because the wave viewer is comprised of three columns of many
 * rows, rather than many rows of three columns.
 * Return required width of values column in pixels, and list of cloumn react elements.
 */
export function valueRows(wsModel) {
    const patternInput = valuesColumnSize(wsModel);
    const valueColWidth = patternInput[0] | 0;
    const valueColNumChars = patternInput[1] | 0;
    return [valueColWidth, map_1((value) => react.createElement("label", keyValueList([valueLabelStyle], 1), value), map_1((fd) => {
        const matchValue_1 = fd.Dat;
        let matchResult;
        if (fd.Width === 1) {
            if (matchValue_1.tag === 0) {
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
                const b = matchValue_1.fields[0];
                return ` ${b}`;
            }
            default:
                return fastDataToPaddedString(valueColNumChars, wsModel.Radix, fd);
        }
    }, map_1((wave) => getWaveValue(wsModel.CurrClkCycle, wave, wave.Width), selectedWaves_2(wsModel))))];
}

function valuesColumn(wsModel) {
    let props, children;
    const start = getTimeMs();
    const patternInput = valueRows(wsModel);
    const width = patternInput[0] | 0;
    const rows = patternInput[1];
    return instrumentInterval("valuesColumn", start, (props = [valuesColumnStyle(width)], (children = concat([topRow, rows]), react.createElement("div", keyValueList(props, 1), ...children))));
}

/**
 * Generate a row of numbers in the waveforms column.
 * Numbers correspond to clock cycles.
 */
export function clkCycleNumberRow(wsModel) {
    const makeClkCycleLabel = (i) => {
        let width, props, children;
        const matchValue = singleWaveWidth(wsModel);
        if ((width = matchValue, (width < Constants_clkCycleNarrowThreshold) && ((i % 5) !== 0))) {
            const width_1 = matchValue;
            return empty();
        }
        else {
            return singleton((props = clkCycleText(wsModel, i), (children = [int32ToString(i)], react.createElement("text", keyValueList(props, 1), ...children))));
        }
    };
    const children_2 = collect(makeClkCycleLabel, toList(rangeDouble(wsModel.StartCycle, 1, endCycle(wsModel))));
    const props_2 = clkCycleNumberRowProps(wsModel);
    return react.createElement("svg", keyValueList(props_2, 1), ...children_2);
}

/**
 * Generate a column of waveforms corresponding to selected waves.
 */
export function waveformColumn(wsModel, dispatch) {
    let children_4, props_2, children_2;
    const start = getTimeMs();
    const waves = selectedWaves_2(wsModel);
    if (exists((wave) => equals(wave.SVG, void 0), waves)) {
        dispatch(new Msg(14, []));
    }
    const waveRows = map_1((wave_1) => {
        const matchValue = wave_1.SVG;
        if (matchValue == null) {
            return react.createElement("div", {});
        }
        else {
            const waveform = matchValue;
            return waveform;
        }
    }, waves);
    return instrumentInterval("waveformColumn", start, (children_4 = [clkCycleHighlightSVG(wsModel, dispatch), (props_2 = [waveRowsStyle(wsModel.WaveformColumnWidth)], (children_2 = append_1(singleton(clkCycleNumberRow(wsModel)), waveRows), react.createElement("div", keyValueList(props_2, 1), ...children_2)))], react.createElement("div", keyValueList([waveformColumnStyle], 1), ...children_4)));
}

/**
 * Display the names, waveforms, and values of selected waveforms
 */
export function showWaveforms(model, wsModel, dispatch) {
    const children = [namesColumn(model, wsModel, dispatch), waveformColumn(wsModel, dispatch), valuesColumn(wsModel)];
    return react.createElement("div", keyValueList([showWaveformsStyle], 1), ...children);
}

/**
 * Table row that shows the address and data of a RAM component.
 */
export function ramTableRow(_arg1_, _arg1__1, _arg1__2) {
    const _arg = [_arg1_, _arg1__1, _arg1__2];
    const rowType = _arg[2];
    const data = _arg[1];
    const addr = _arg[0];
    const props_4 = [["style", keyValueList(ramTableRowStyle(rowType), 1)]];
    const children_4 = [react.createElement("td", {}, addr), react.createElement("td", {}, data)];
    return react.createElement("tr", keyValueList(props_4, 1), ...children_4);
}

/**
 * Table showing contents of a RAM component.
 */
export function ramTable(wsModel, _arg1_, _arg1__1) {
    let props_12, children_12, children_8, children_6, children_4, props_2, children_2, children_10;
    const _arg = [_arg1_, _arg1__1];
    const ramLabel = _arg[1];
    const ramId = _arg[0];
    const fs = wsModel.FastSim;
    const fc = FSharpMap__get_Item(wsModel.FastSim.FComps, ramId);
    const step = wsModel.CurrClkCycle | 0;
    runFastSimulation(void 0, step, fs);
    let memData;
    const matchValue = fc.FType;
    let matchResult, mem, mem_1;
    switch (matchValue.tag) {
        case 40: {
            matchResult = 0;
            mem = matchValue.fields[0];
            break;
        }
        case 39: {
            matchResult = 0;
            mem = matchValue.fields[0];
            break;
        }
        case 41: {
            matchResult = 1;
            mem_1 = matchValue.fields[0];
            break;
        }
        case 42: {
            matchResult = 1;
            mem_1 = matchValue.fields[0];
            break;
        }
        default:
            matchResult = 2;
    }
    switch (matchResult) {
        case 0: {
            memData = mem;
            break;
        }
        case 1: {
            const matchValue_1 = extractFastSimulationState(fs, wsModel.CurrClkCycle, ramId[0], ramId[1]);
            if (matchValue_1.tag === 3) {
                const mem_2 = matchValue_1.fields[0];
                memData = mem_2;
            }
            else {
                const x = matchValue_1;
                memData = toFail(`What? Unexpected state ${x} from cycle ${wsModel.CurrClkCycle} in RAM component '${ramLabel}'. FastSim step = ${fs.ClockTick}`);
            }
            break;
        }
        default:
            memData = toFail(`Given a component ${fc.FType} which is not a vaild RAM`);
    }
    const dWidth = memData.WordWidth | 0;
    const aWidth = memData.AddressWidth | 0;
    const print = (w, a) => valToPaddedString(w, wsModel.Radix, toInt64(op_BitwiseAnd(toInt64(op_Subtraction(toInt64(op_LeftShift(1n, w)), 1n)), a)));
    const lastLocation = toInt64(fromInt32((2 << (memData.AddressWidth - 1)) - 1));
    const print1 = (tupledArg) => {
        const a_1 = tupledArg[0];
        const b = tupledArg[1];
        const rw = tupledArg[2];
        return [`${print(aWidth, a_1)}`, `${print(dWidth, b)}`, rw];
    };
    const print2 = (a1, a2, d) => [`${print(aWidth, toInt64(op_Addition(a1, 1n)))}..${print(aWidth, toInt64(op_Subtraction(a2, 1n)))}`, `${print(dWidth, d)}`, new RamRowType(2, [])];
    const printGap = (gStart, gEnd) => {
        let n;
        const matchValue_4 = toInt64(op_Subtraction(gEnd, gStart));
        if (equals_1(matchValue_4, 1n)) {
            return empty();
        }
        else if (equals_1(matchValue_4, 2n)) {
            return singleton(print1([toInt64(op_Division(toInt64(op_Addition(gEnd, gStart)), 2n)), 0n, new RamRowType(2, [])]));
        }
        else if ((n = matchValue_4, compare(n, 2n) > 0)) {
            const n_1 = matchValue_4;
            return singleton(print2(gStart, gEnd, 0n));
        }
        else {
            return toFail(`What? gEnd=${gEnd},gStart=${gStart}: negative or zero gaps are impossible...`);
        }
    };
    const addGapLines = (items) => {
        let startItem;
        const matchValue_5 = item(0, items);
        if (equals_1(matchValue_5[0], -1n)) {
            startItem = empty();
        }
        else {
            const rw_1 = matchValue_5[2];
            const gStart_1 = matchValue_5[0];
            const dStart = matchValue_5[1];
            startItem = singleton(print1([gStart_1, dStart, rw_1]));
        }
        return concat(collect((tupledArg_1) => {
            const _arg_2 = tupledArg_1[1];
            const gStart_2 = tupledArg_1[0][0];
            const rwe = _arg_2[2];
            const gEnd_1 = _arg_2[0];
            const dEnd = _arg_2[1];
            const thisItem = equals_1(gEnd_1, toInt64(op_Addition(lastLocation, 1n))) ? empty() : singleton(print1([gEnd_1, dEnd, rwe]));
            return ofArray([printGap(gStart_2, gEnd_1), thisItem]);
        }, pairwise_1(items)));
    };
    const addReadWrite = (fc_1, step_2, mem_3) => {
        const getInt64 = (a_2, step_3) => {
            let w_2;
            const w_1 = a_2.Width | 0;
            if ((w_2 = (w_1 | 0), w_2 > 32)) {
                const w_3 = w_1 | 0;
                return toInt64(fromUInt64(convertBigIntToUInt64(w_3, a_2.BigIntStep[step_3])));
            }
            else {
                return toInt64(fromUInt32(a_2.UInt32Step[step_3]));
            }
        };
        let readStep;
        const matchValue_6 = fc_1.FType;
        switch (matchValue_6.tag) {
            case 39:
            case 42: {
                readStep = step_2;
                break;
            }
            case 40:
            case 41: {
                readStep = (step_2 - 1);
                break;
            }
            default:
                readStep = toFail(`What? ${fc_1.FullName} should be a memory component`);
        }
        const addrSteps = (step_4) => getInt64(fc_1.InputLinks[0], step_4);
        let readOpt;
        const matchValue_7 = fc_1.FType;
        let matchResult_1;
        if (step_2 === 0) {
            switch (matchValue_7.tag) {
                case 40:
                case 41: {
                    matchResult_1 = 0;
                    break;
                }
                default:
                    matchResult_1 = 1;
            }
        }
        else {
            matchResult_1 = 1;
        }
        switch (matchResult_1) {
            case 0: {
                readOpt = void 0;
                break;
            }
            default:
                readOpt = addrSteps(readStep);
        }
        let writeOpt;
        const matchValue_9 = fc_1.FType;
        let matchResult_2;
        switch (matchValue_9.tag) {
            case 40:
            case 39: {
                matchResult_2 = 0;
                break;
            }
            case 41: {
                if (step_2 === 0) {
                    matchResult_2 = 0;
                }
                else if (equals_1(getInt64(fc_1.InputLinks[2], step_2 - 1), 1n)) {
                    matchResult_2 = 1;
                }
                else {
                    matchResult_2 = 2;
                }
                break;
            }
            case 42: {
                if (step_2 === 0) {
                    matchResult_2 = 0;
                }
                else if (equals_1(getInt64(fc_1.InputLinks[2], step_2 - 1), 1n)) {
                    matchResult_2 = 1;
                }
                else {
                    matchResult_2 = 2;
                }
                break;
            }
            default:
                if (step_2 === 0) {
                    matchResult_2 = 0;
                }
                else {
                    matchResult_2 = 2;
                }
        }
        switch (matchResult_2) {
            case 0: {
                writeOpt = void 0;
                break;
            }
            case 1: {
                writeOpt = addrSteps(step_2 - 1);
                break;
            }
            default:
                writeOpt = void 0;
        }
        const addToMap = (rType, addr, mem_4) => {
            const matchValue_11 = tryFind(addr, mem_4);
            if (matchValue_11 == null) {
                return add(addr, [0n, rType], mem_4);
            }
            else {
                const d_1 = matchValue_11[0];
                return add(addr, [d_1, rType], mem_4);
            }
        };
        const mem_5 = map_2((k, v) => [v, new RamRowType(2, [])], mem_3);
        let mem_6;
        if (readOpt == null) {
            mem_6 = mem_5;
        }
        else {
            const addr_1 = readOpt;
            mem_6 = addToMap(new RamRowType(1, []), addr_1, mem_5);
        }
        if (writeOpt == null) {
            return mem_6;
        }
        else {
            const addr_2 = writeOpt;
            return addToMap(new RamRowType(0, []), addr_2, mem_6);
        }
    };
    const addEndPoints = (items_1) => {
        const ad = (tupledArg_2) => {
            const a_3 = tupledArg_2[0];
            const d_2 = tupledArg_2[1];
            const rw_2 = tupledArg_2[2];
            return a_3;
        };
        if (length(items_1) === 0) {
            return ofArray([[-1n, 0n, new RamRowType(2, [])], [lastLocation, 0n, new RamRowType(2, [])]]);
        }
        else {
            const items_2 = (compare(ad(item(0, items_1)), 0n) < 0) ? items_1 : insertAt(0, [-1n, -1n, new RamRowType(2, [])], items_1);
            if (equals_1(ad(item(length(items_2) - 1, items_2)), lastLocation)) {
                return items_2;
            }
            else {
                return insertAt(length(items_2), [toInt64(op_Addition(lastLocation, 1n)), 0n, new RamRowType(2, [])], items_2);
            }
        }
    };
    const lineItems = addGapLines(addEndPoints(sort(filter((tupledArg_4) => {
        const a_5 = tupledArg_4[0];
        const d_4 = tupledArg_4[1];
        const rw_4 = tupledArg_4[2];
        if (!equals_1(d_4, 0n)) {
            return true;
        }
        else {
            return !equals(rw_4, new RamRowType(2, []));
        }
    }, map_1((tupledArg_3) => {
        const a_4 = tupledArg_3[0];
        const _arg_3 = tupledArg_3[1];
        const rw_3 = _arg_3[1];
        const d_3 = _arg_3[0];
        return [a_4, d_3, rw_3];
    }, toList_1(addReadWrite(fc, step, memData.Data)))), {
        Compare: compareArrays,
    })));
    return item_1(ofArray([new Item_Option(0, [ramTableLevelProps]), new Item_Option(1, [])]), ofArray([h6(singleton(new Option_4(9, [singleton(centerAlignStyle)])))(singleton(ramLabel)), (props_12 = [["style", {
        maxHeight: "600px",
        overflowY: "auto",
    }]], (children_12 = [table_3(ofArray([new TableOption(2, []), new TableOption(0, [])]), ofArray([(children_8 = [(children_6 = [react.createElement("th", keyValueList([centerAlignStyle], 1), "Address"), (children_4 = ["Data", (props_2 = [["style", {
        marginLeft: "2px",
        fontSize: "10px",
    }]], (children_2 = [int32ToString(wsModel.CurrClkCycle)], react.createElement("sub", keyValueList(props_2, 1), ...children_2)))], react.createElement("th", keyValueList([centerAlignStyle], 1), ...children_4))], react.createElement("tr", {}, ...children_6))], react.createElement("thead", {}, ...children_8)), (children_10 = map_1((tupledArg_5) => ramTableRow(tupledArg_5[0], tupledArg_5[1], tupledArg_5[2]), lineItems), react.createElement("tbody", {}, ...children_10))]))], react.createElement("div", keyValueList(props_12, 1), ...children_12))), react.createElement("br", {})]));
}

/**
 * Bulma Level component of tables showing RAM contents.
 */
export function ramTables(wsModel) {
    let headerRow, _arg, a, b, children_13, tables, children_11, children_7, props_5, children_5, props_9;
    const inlineStyle = (styles) => {
        const props = singleton(["style", keyValueList(cons(new CSSProp(125, ["inline"]), styles), 1)]);
        return (children) => react.createElement("div", keyValueList(props, 1), ...children);
    };
    const start = getTimeMs();
    const selectedRams = toList_1(wsModel.SelectedRams);
    return instrumentInterval("ramTables", start, (length(selectedRams) > 0) ? ((headerRow = ((_arg = map_1((tupledArg) => {
        const op = tupledArg[0];
        const opStyle = tupledArg[1];
        const arg_1 = singleton(inlineStyle(ramTableRowStyle(opStyle))([op]));
        return inlineStyle(empty())(arg_1);
    }, ofArray([["read", new RamRowType(1, [])], ["overwritten", new RamRowType(0, [])]])), !isEmpty(_arg) ? (!isEmpty(tail(_arg)) ? (isEmpty(tail(tail(_arg))) ? ((a = head(_arg), (b = head(tail(_arg)), ofArray(["Key: Memory location is ", a, ", or ", b, ". Click waveforms or use cursor control to change current cycle."])))) : toFail(printf("What? Can\'t happen!"))) : toFail(printf("What? Can\'t happen!"))) : toFail(printf("What? Can\'t happen!")))), (children_13 = ((tables = map_1((ram) => {
        const props_3 = [["style", {
            borderColor: "white",
        }]];
        const children_3 = [ramTable(wsModel, ram[0], ram[1])];
        return react.createElement("td", keyValueList(props_3, 1), ...children_3);
    }, selectedRams), singleton((children_11 = [(children_7 = [(props_5 = [new HTMLAttr(67, [length(selectedRams)])], (children_5 = [inlineStyle(empty())(headerRow)], react.createElement("th", keyValueList(props_5, 1), ...children_5)))], react.createElement("tr", {}, ...children_7)), (props_9 = [["style", {
        border: "10px",
    }]], react.createElement("tr", keyValueList(props_9, 1), ...tables))], react.createElement("tbody", {}, ...children_11))))), table_3(ofArray([new TableOption(6, [ramTablesLevelProps]), new TableOption(2, []), new TableOption(0, []), new TableOption(6, [singleton(["style", {
        height: "100%",
    }])])]), children_13)))) : react.createElement("div", {}));
}

/**
 * This function regenerates all the waveforms listed on wavesToBeMade.
 * Generation is subject to timeout, so may not complete.
 * Returns tuple:
 * allWaves (with new waveforms);
 * numberDone (no of waveforms made);
 * timeToDo; Some (time actually taken) (> timeout) or None if complete with no timeOut.
 */
export function makeWaveformsWithTimeOut(timeOut, ws, allWaves, wavesToBeMade) {
    const start = getTimeMs();
    const patternInput = fold((tupledArg, wi) => {
        let timeSoFar, timeOut_1;
        const all = tupledArg[0];
        const n = tupledArg[1] | 0;
        const matchValue = getTimeMs() - start;
        let matchResult, timeOut_2, timeSoFar_1;
        if (timeOut != null) {
            if ((timeSoFar = matchValue, (timeOut_1 = timeOut, timeOut_1 < timeSoFar))) {
                matchResult = 0;
                timeOut_2 = timeOut;
                timeSoFar_1 = matchValue;
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
                return [all, n, timeSoFar_1];
            default:
                return [change(wi, (option) => map_3((wave) => generateWaveform(ws, wi, wave), option), all), n + 1, void 0];
        }
    }, [allWaves, 0, void 0], wavesToBeMade);
    const timeToDo = patternInput[2];
    const numberDone = patternInput[1] | 0;
    const allWaves_1 = patternInput[0];
    return [allWaves_1, numberDone, timeToDo];
}

/**
 * Start or update a spinner popup
 */
export function updateSpinner(name, payload, numToDo, model) {
    let sp;
    const matchValue = model.SpinnerPayload;
    let matchResult, sp_1;
    if (matchValue != null) {
        if ((sp = matchValue, sp.Name === name)) {
            matchResult = 0;
            sp_1 = matchValue;
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
            return new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, new SpinPayload(payload, name, numToDo, sp_1.Total), model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
        default:
            return new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, new SpinPayload(payload, name, numToDo, numToDo + 1), model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
    }
}

/**
 * remove the spinner popup
 */
export function cancelSpinner(model) {
    return new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, void 0, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
}

/**
 * Major function called after changes to extend simulation and/or redo waveforms.
 * Note that after design change simulation muts be redonne externally, and function called with
 * newSimulation = true.
 * First extend simulation, if needed, with timeout and callback from Spinner if needed.
 * Then remake any waveforms which have changed and not yet been remade. Again if needed with
 * timeOut and callback from Spinner.
 * Spinner (in reality a progress bar) is used if the estimated time to completion is longer than
 * a constant. To get the estimate some initial execution must be completed (1 clock cycle and one waveform).
 */
export function refreshWaveSim(newSimulation, wsModel, model) {
    let t, numToDo_1, f1, wsModel_3, sp, speed;
    const isSameWave = (wi, wi$0027) => {
        if (equalArrays(wi.Id, wi$0027.Id) && (wi.PortNumber === wi$0027.PortNumber)) {
            return equals(wi.PortType, wi$0027.PortType);
        }
        else {
            return false;
        }
    };
    const model_1 = updateWSModel((_arg) => wsModel, model);
    const start = getTimeMs();
    const fs = wsModel.FastSim;
    if (fs.NumStepArrays === 0) {
        return [model_1, Cmd_none()];
    }
    else {
        const lastCycleNeeded = ((wsModel.StartCycle + wsModel.ShownCycles) + 1) | 0;
        const speedOpt = runFastSimulation(Constants_initSimulationTime, lastCycleNeeded, fs);
        const cyclesToDo = (lastCycleNeeded - wsModel.FastSim.ClockTick) | 0;
        let matchResult, speed_1;
        if (speedOpt != null) {
            if ((speed = speedOpt, (((cyclesToDo / speed) + Constants_initSimulationTime) > Constants_maxSimulationTimeWithoutSpinner) && (model_1.Spinner == null))) {
                matchResult = 0;
                speed_1 = speedOpt;
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
                const spinnerFunc = (model_2) => refreshWaveSim(newSimulation, wsModel, model_2)[0];
                const model_4 = updateSpinner("Waveforms simulation...", spinnerFunc, cyclesToDo, model_1);
                return [model_4, instrumentInterval("refreshWaveSim", start, Cmd_none())];
            }
            default: {
                if (!equals(speedOpt, void 0)) {
                    runFastSimulation(void 0, lastCycleNeeded, fs);
                }
                toConsole(`Ending refresh now at Tick ${fs.ClockTick}...`);
                const allWavesStart = getTimeMs();
                const allWaves = newSimulation ? getWaves(wsModel, fs) : wsModel.AllWaves;
                const model_5 = updateWSModel((ws) => (new WaveSimModel(ws.State, ws.TopSheet, ws.Sheets, allWaves, ws.SelectedWaves, ws.StartCycle, ws.ShownCycles, ws.CurrClkCycle, ws.ClkCycleBoxIsEmpty, ws.Radix, ws.WaveformColumnWidth, ws.WaveModalActive, ws.RamModalActive, ws.RamComps, ws.SelectedRams, ws.FastSim, ws.SearchString, ws.ShowSheetDetail, ws.ShowComponentDetail, ws.ShowGroupDetail, ws.HoveredLabel, ws.DraggedIndex, ws.PrevSelectedWaves)), model_1);
                let model_7;
                const w = model_5.WaveSimViewerWidth | 0;
                const model_6 = model_5;
                const wsModel_1 = getWSModel(model_6);
                const namesColWidth = calcNamesColWidth(wsModel_1) | 0;
                const otherDivWidths = ((((Constants_leftMargin + Constants_rightMargin) + Constants_dividerBarWidth) + Constants_scrollBarWidth) + 2) | 0;
                const valuesColumnWidth = valuesColumnSize(wsModel_1)[0] | 0;
                const waveColWidth = (((w - otherDivWidths) - namesColWidth) - valuesColumnWidth) | 0;
                const wholeCycles = max(1, ~~(waveColWidth / singleWaveWidth(wsModel_1))) | 0;
                const singleCycleWidth = waveColWidth / wholeCycles;
                const viewerWidth = (((namesColWidth + Constants_valuesColWidth) + ~~(singleCycleWidth * wholeCycles)) + otherDivWidths) | 0;
                const updateFn = (wsModel_1_1) => (new WaveSimModel(wsModel_1_1.State, wsModel_1_1.TopSheet, wsModel_1_1.Sheets, wsModel_1_1.AllWaves, wsModel_1_1.SelectedWaves, wsModel_1_1.StartCycle, wholeCycles, wsModel_1_1.CurrClkCycle, wsModel_1_1.ClkCycleBoxIsEmpty, wsModel_1_1.Radix, singleCycleWidth * wholeCycles, wsModel_1_1.WaveModalActive, wsModel_1_1.RamModalActive, wsModel_1_1.RamComps, wsModel_1_1.SelectedRams, wsModel_1_1.FastSim, wsModel_1_1.SearchString, wsModel_1_1.ShowSheetDetail, wsModel_1_1.ShowComponentDetail, wsModel_1_1.ShowGroupDetail, wsModel_1_1.HoveredLabel, wsModel_1_1.DraggedIndex, wsModel_1_1.PrevSelectedWaves));
                model_7 = updateWSModel(updateFn, new Model(model_6.UserData, model_6.WaveSim, model_6.WaveSimSheet, model_6.UISheetTrail, model_6.Spinner, model_6.Sheet, model_6.IsLoading, model_6.LastChangeCheckTime, model_6.LastSimulatedCanvasState, model_6.LastDetailedSavedState, model_6.CurrentSelected, model_6.LastSelectedIds, model_6.LastUsedDialogWidth, model_6.SelectedComponent, model_6.CurrentStepSimulationStep, model_6.CurrentTruthTable, model_6.TTConfig, model_6.RightPaneTabVisible, model_6.SimSubTabVisible, model_6.Hilighted, model_6.Clipboard, model_6.LastCreatedComponent, model_6.SavedSheetIsOutOfDate, model_6.CurrentProj, model_6.PopupViewFunc, model_6.SpinnerPayload, model_6.PopupDialogData, model_6.Notifications, model_6.TopMenuOpenState, model_6.DividerDragMode, w, model_6.ConnsOfSelectedWavesAreHighlighted, model_6.Pending, model_6.UIState, model_6.BuildVisible, model_6.DrawBlockTestState));
                const wsModel_2 = getWSModel(model_7);
                const simulationIsUptodate = wsModel_2.FastSim.ClockTick > (wsModel_2.ShownCycles + wsModel_2.StartCycle);
                const falae = simulationIsUptodate;
                toConsole(`Simulationuptodate: ${simulationIsUptodate}`);
                const wavesToBeMade = map_1((tuple) => tuple[0], toList_1(filter_1((wi_1, wave) => {
                    const hasChanged = !waveformIsUptodate(wsModel_2, wave);
                    if (exists((wi$0027_1) => isSameWave(wi_1, wi$0027_1), wsModel_2.SelectedWaves) && hasChanged) {
                        return simulationIsUptodate;
                    }
                    else {
                        return false;
                    }
                }, allWaves)));
                let patternInput_2;
                const numToDo = length(wavesToBeMade) | 0;
                const tupledArg = makeWaveformsWithTimeOut(Constants_initSimulationTime, wsModel_2, allWaves, wavesToBeMade);
                const allWaves_1 = tupledArg[0];
                const numDone = tupledArg[1] | 0;
                const timeOpt = tupledArg[2];
                const matchValue = (length(wavesToBeMade) - numDone) | 0;
                if (timeOpt != null) {
                    if (numDone === 0) {
                        patternInput_2 = toFail(printf("What? makewaveformsWithTimeOut must make at least one waveform"));
                    }
                    else if ((t = timeOpt, (numToDo_1 = (matchValue | 0), ((length(wavesToBeMade) * t) / numDone) < Constants_maxSimulationTimeWithoutSpinner))) {
                        const numToDo_2 = matchValue | 0;
                        const t_1 = timeOpt;
                        const patternInput_1 = makeWaveformsWithTimeOut(void 0, wsModel_2, allWaves_1, wavesToBeMade);
                        const timeOpt_1 = patternInput_1[2];
                        const numDone_1 = patternInput_1[1] | 0;
                        const allWaves_2 = patternInput_1[0];
                        patternInput_2 = [model_7, allWaves_2, void 0, numToDo_2 - numDone_1];
                    }
                    else {
                        const numToDo_3 = matchValue | 0;
                        const payload = ["Making waves", (f1 = ((wsModel_3 = (new WaveSimModel(wsModel_2.State, wsModel_2.TopSheet, wsModel_2.Sheets, allWaves_1, wsModel_2.SelectedWaves, wsModel_2.StartCycle, wsModel_2.ShownCycles, wsModel_2.CurrClkCycle, wsModel_2.ClkCycleBoxIsEmpty, wsModel_2.Radix, wsModel_2.WaveformColumnWidth, wsModel_2.WaveModalActive, wsModel_2.RamModalActive, wsModel_2.RamComps, wsModel_2.SelectedRams, wsModel_2.FastSim, wsModel_2.SearchString, wsModel_2.ShowSheetDetail, wsModel_2.ShowComponentDetail, wsModel_2.ShowGroupDetail, wsModel_2.HoveredLabel, wsModel_2.DraggedIndex, wsModel_2.PrevSelectedWaves)), (model_8) => refreshWaveSim(false, wsModel_3, model_8))), (arg) => f1(arg)[0])];
                        patternInput_2 = [model_7, allWaves_1, payload, numToDo_3];
                    }
                }
                else {
                    const n = matchValue | 0;
                    patternInput_2 = [model_7, allWaves_1, void 0, n];
                }
                const spinnerPayload = patternInput_2[2];
                const numToDo_4 = patternInput_2[3] | 0;
                const model_9 = patternInput_2[0];
                const allWaves_3 = patternInput_2[1];
                let ramComps;
                const isRAMOrROM = (fcid, fc) => {
                    const matchValue_2 = fc.FType;
                    switch (matchValue_2.tag) {
                        case 41:
                        case 40:
                        case 42:
                        case 39:
                            return true;
                        default:
                            return false;
                    }
                };
                ramComps = sortBy((fc_2) => fc_2.FullName, map_1((tupledArg_1) => {
                    const fcid_1 = tupledArg_1[0];
                    const fc_1 = tupledArg_1[1];
                    return fc_1;
                }, toList_1(filter_1(isRAMOrROM, fs.FComps))), {
                    Compare: comparePrimitives,
                });
                const ramCompIds = map_1((fc_3) => fc_3.fId, ramComps);
                const allWaveA = toArray(keys(allWaves_3));
                const selectedWaves = collect((wi_2) => {
                    const matchValue_3 = tryFind_1(curry2(isSameWave)(wi_2), allWaveA);
                    if (matchValue_3 == null) {
                        return empty();
                    }
                    else {
                        const w_1 = matchValue_3;
                        return singleton(w_1);
                    }
                }, wsModel_2.SelectedWaves);
                const selectedRams = filter_1((ramfId, _arg_1) => contains(ramfId, ramCompIds, {
                    Equals: equalArrays,
                    GetHashCode: arrayHash,
                }), wsModel_2.SelectedRams);
                const ws_1 = new WaveSimModel(new WaveSimState(5, []), wsModel_2.TopSheet, wsModel_2.Sheets, allWaves_3, selectedWaves, wsModel_2.StartCycle, wsModel_2.ShownCycles, wsModel_2.CurrClkCycle, wsModel_2.ClkCycleBoxIsEmpty, wsModel_2.Radix, wsModel_2.WaveformColumnWidth, wsModel_2.WaveModalActive, wsModel_2.RamModalActive, ramComps, selectedRams, fs, wsModel_2.SearchString, wsModel_2.ShowSheetDetail, wsModel_2.ShowComponentDetail, wsModel_2.ShowGroupDetail, wsModel_2.HoveredLabel, wsModel_2.DraggedIndex, wsModel_2.PrevSelectedWaves);
                const model_11 = updateWSModel((_arg_2) => ws_1, (spinnerPayload != null) ? ((sp = spinnerPayload, updateSpinner(sp[0], sp[1], numToDo_4, model_9))) : cancelSpinner(model_9));
                return [model_11, instrumentInterval("refreshWaveSim", start, Cmd_none())];
            }
        }
    }
}

/**
 * Refresh the state of the wave simulator according to the model and canvas state.
 * Redo a new simulation. Set inputs to default values. Then call refreshWaveSim via RefreshWaveSim message.
 * 1st parameter ofrefreshWaveSin will be set true which causes all waves to be necessarily regenerated.
 */
export function refreshButtonAction(canvasState_, canvasState__1, model, dispatch, _arg) {
    const canvasState = [canvasState_, canvasState__1];
    const model_1 = updateAllMemoryComps(model);
    let wsSheet;
    const matchValue = model_1.WaveSimSheet;
    if (matchValue != null) {
        const sheet = matchValue;
        toConsole(printf("sheet already existing"));
        wsSheet = sheet;
    }
    else {
        toConsole(printf("Sheet was none"));
        wsSheet = value_3(getCurrFile(model_1));
    }
    toConsole(`Refresh Button with width = ${model_1.WaveSimViewerWidth}`);
    let model_4;
    const model_3 = removeAllSimulationsFromModel(model_1);
    model_4 = (new Model(model_3.UserData, model_3.WaveSim, wsSheet, model_3.UISheetTrail, model_3.Spinner, model_3.Sheet, model_3.IsLoading, model_3.LastChangeCheckTime, model_3.LastSimulatedCanvasState, model_3.LastDetailedSavedState, model_3.CurrentSelected, model_3.LastSelectedIds, model_3.LastUsedDialogWidth, model_3.SelectedComponent, model_3.CurrentStepSimulationStep, model_3.CurrentTruthTable, model_3.TTConfig, model_3.RightPaneTabVisible, model_3.SimSubTabVisible, model_3.Hilighted, model_3.Clipboard, model_3.LastCreatedComponent, model_3.SavedSheetIsOutOfDate, model_3.CurrentProj, model_3.PopupViewFunc, model_3.SpinnerPayload, model_3.PopupDialogData, model_3.Notifications, model_3.TopMenuOpenState, model_3.DividerDragMode, model_3.WaveSimViewerWidth, model_3.ConnsOfSelectedWavesAreHighlighted, model_3.Pending, model_3.UIState, model_3.BuildVisible, model_3.DrawBlockTestState));
    const wsModel = getWSModel(model_4);
    const matchValue_1 = simulateModel(model_4.WaveSimSheet, Constants_maxLastClk + Constants_maxStepsOverflow, canvasState[0], canvasState[1], model_4);
    const copyOfStruct = matchValue_1[0];
    if (copyOfStruct.tag === 0) {
        const canvState = matchValue_1[1];
        const simData = copyOfStruct.fields[0];
        if (simData.IsSynchronous) {
            setFastSimInputsToDefault(simData.FastSim);
            const wsModel_1 = new WaveSimModel(new WaveSimState(4, []), wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, simData.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves);
            dispatch(new Msg(12, [wsModel_1, wsSheet]));
            dispatch(new Msg(15, [wsModel_1]));
        }
        else {
            dispatch(new Msg(12, [new WaveSimModel(new WaveSimState(3, []), wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves), wsSheet]));
        }
    }
    else {
        const e = copyOfStruct.fields[0];
        dispatch(new Msg(12, [new WaveSimModel(new WaveSimState(2, [e]), wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves), wsSheet]));
    }
}

/**
 * ReactElement showing instructions and wave sim buttons
 */
export function topHalf(canvasState_, canvasState__1, model, dispatch) {
    let props_4, props_6;
    const canvasState = [canvasState_, canvasState__1];
    let title;
    const matchValue = model.WaveSimSheet;
    if (matchValue != null) {
        const sheet = matchValue;
        title = (`Simulating '${sheet}'`);
    }
    else {
        title = "Waveform Viewer";
    }
    const wsModel = getWSModel(model);
    const loading = wsModel.State.tag === 4;
    const refreshButtonSvg = loading ? emptyRefreshSVG : refreshSvg("white", "20px");
    const children_6 = [columns(empty(), ofArray([column(singleton(new Option_5(3, [singleton(["style", {
        height: "100px",
        overflowY: "clip",
    }])])), toList(delay(() => {
        let props;
        return append_2(singleton_1(h4(empty())(singleton((props = [["style", {
            display: "inline",
            marginRight: "10px",
        }], new HTMLAttr(99, ["WaveSimHelp"])], react.createElement("div", keyValueList(props, 1), title))))), delay(() => {
            let props_2, children_2;
            const startOrRenew = (arg30$0040) => {
                refreshButtonAction(canvasState[0], canvasState[1], model, dispatch, arg30$0040);
            };
            const waveEnd = (ev) => {
                endButtonAction(canvasState, model, dispatch, ev);
            };
            const wbo = getWaveSimButtonOptions(canvasState[0], canvasState[1], model, wsModel);
            const startEndButton = button(topHalfButtonProps(wbo.StartEndColor, "startEndButton"), (ev_1) => {
                if (wbo.IsRunning) {
                    waveEnd(ev_1);
                }
                else {
                    startOrRenew(ev_1);
                }
            }, wbo.StartEndMsg);
            const needsRefresh = wbo.IsDirty && wbo.IsRunning;
            return singleton_1((props_2 = [["style", {
                marginBottom: "20px",
            }]], (children_2 = (!wbo.IsRunning ? singleton(startEndButton) : toList(delay(() => append_2(needsRefresh ? singleton_1(button(topHalfButtonProps(new Color_IColor(6, []), "RefreshButton"), startOrRenew, refreshButtonSvg)) : empty_1(), delay(() => singleton_1(startEndButton)))))), react.createElement("div", keyValueList(props_2, 1), ...children_2))));
        }));
    }))), column(singleton(new Option_5(0, [new Screen(0, []), new ISize(17, [])])), ofArray([(props_4 = [["style", {
        marginBottom: "50px",
    }]], react.createElement("div", keyValueList(props_4, 1))), level(empty(), singleton(item_1(empty(), singleton(list_5(empty(), ofArray([selectWavesButton(wsModel, dispatch), selectWavesModal(wsModel, dispatch), selectRamButton(wsModel, dispatch), selectRamModal(wsModel, dispatch)]))))))]))])), (props_6 = [["style", {
        marginBottom: "0px",
    }]], react.createElement("hr", keyValueList(props_6, 1))), react.createElement("br", {})];
    return react.createElement("div", keyValueList([topHalfStyle], 1), ...children_6);
}

/**
 * Entry point to the waveform simulator.
 */
export function viewWaveSim(canvasState_, canvasState__1, model, dispatch) {
    let children_12;
    const canvasState = [canvasState_, canvasState__1];
    const wsModel = getWSModel(model);
    const notRunning = react.createElement("div", keyValueList([errorMessageStyle], 1), "Start the waveform viewer by pressing the Start button.");
    const simError = (e) => {
        setSimErrorFeedback(e, model, dispatch);
        const children_2 = [viewSimulationError(canvasState[0], canvasState[1], e, model, new SimSubTab(2, []), dispatch)];
        return react.createElement("div", keyValueList([errorMessageStyle], 1), ...children_2);
    };
    const children_14 = [(children_12 = toList(delay(() => append_2(singleton_1(topHalf(canvasState[0], canvasState[1], model, dispatch)), delay(() => {
        let matchValue, matchValue_1, e_3, sheet, sheet_5, sheet_1, sheet_2, sheetOpt, sheet_3, e_1, e_2, sheet_4, sheetOpt_1, e_4;
        return append_2((matchValue = model.WaveSimSheet, (matchValue_1 = wsModel.State, (matchValue == null) ? ((matchValue_1.tag === 3) ? singleton_1(react.createElement("div", keyValueList([errorMessageStyle], 1), "There is no clocked logic in this circuit. Add clocked logic to simulate waveforms.")) : ((matchValue_1.tag === 0) ? singleton_1(notRunning) : ((matchValue_1.tag === 6) ? singleton_1(notRunning) : ((matchValue_1.tag === 1) ? singleton_1(notRunning) : ((matchValue_1.tag === 4) ? singleton_1(notRunning) : ((matchValue_1.tag === 5) ? singleton_1(notRunning) : ((e_3 = matchValue_1.fields[0], singleton_1(notRunning))))))))) : ((matchValue_1.tag === 3) ? singleton_1(react.createElement("div", keyValueList([errorMessageStyle], 1), "There is no clocked logic in this circuit. Add clocked logic to simulate waveforms.")) : ((matchValue_1.tag === 0) ? singleton_1(notRunning) : ((matchValue_1.tag === 6) ? singleton_1(notRunning) : ((matchValue_1.tag === 1) ? ((matchValue === "") ? singleton_1(notRunning) : (((sheet = matchValue, wsModel.FastSim.SimulatedTopSheet === "")) ? ((sheet_5 = matchValue, singleton_1(notRunning))) : singleton_1(react.createElement("div", keyValueList([errorMessageStyle], 1), "Please open a project to use the waveform viewer.")))) : ((matchValue_1.tag === 4) ? ((matchValue === "") ? singleton_1(notRunning) : (((sheet_1 = matchValue, wsModel.FastSim.SimulatedTopSheet === "")) ? ((sheet_5 = matchValue, singleton_1(notRunning))) : (isEmpty(wsModel.SelectedWaves) ? singleton_1(react.createElement("div", {
            id: "WaveSimHelp",
        }, "Use \'Select Waves\' to add waves for simulation. Right-click for help.")) : append_2(singleton_1(level(empty(), ofArray([left(singleton(new Common_GenericOption(1, [singleton(["style", {
            marginLeft: "5px",
        }])])), singleton(zoomButtons(wsModel, dispatch))), right(empty(), ofArray([left(singleton(new Common_GenericOption(1, [singleton(["style", {
            marginRight: "75px",
        }])])), singleton(radixButtons(wsModel, dispatch))), clkCycleButtons(wsModel, dispatch)]))]))), delay(() => {
            let children_10;
            return singleton_1((children_10 = [showWaveforms(model, wsModel, dispatch), react.createElement("hr", {}), ramTables(wsModel)], react.createElement("div", keyValueList([showWaveformsAndRamStyle], 1), ...children_10)));
        }))))) : ((matchValue_1.tag === 5) ? ((matchValue === "") ? singleton_1(notRunning) : (((sheet_2 = matchValue, wsModel.FastSim.SimulatedTopSheet === "")) ? ((sheet_5 = matchValue, singleton_1(notRunning))) : (isEmpty(wsModel.SelectedWaves) ? singleton_1(react.createElement("div", {
            id: "WaveSimHelp",
        }, "Use \'Select Waves\' to add waves for simulation. Right-click for help.")) : append_2(singleton_1(level(empty(), ofArray([left(singleton(new Common_GenericOption(1, [singleton(["style", {
            marginLeft: "5px",
        }])])), singleton(zoomButtons(wsModel, dispatch))), right(empty(), ofArray([left(singleton(new Common_GenericOption(1, [singleton(["style", {
            marginRight: "75px",
        }])])), singleton(radixButtons(wsModel, dispatch))), clkCycleButtons(wsModel, dispatch)]))]))), delay(() => {
            let children_10;
            return singleton_1((children_10 = [showWaveforms(model, wsModel, dispatch), react.createElement("hr", {}), ramTables(wsModel)], react.createElement("div", keyValueList([showWaveformsAndRamStyle], 1), ...children_10)));
        }))))) : (((sheetOpt = matchValue, (sheet_3 = matchValue, (e_1 = matchValue_1.fields[0], !equals(sheetOpt, getCurrFile(model)))))) ? ((e_2 = matchValue_1.fields[0], (sheet_4 = matchValue, (sheetOpt_1 = matchValue, (dispatch(new Msg(36, [(model_1) => (new Model(model_1.UserData, model_1.WaveSim, void 0, model_1.UISheetTrail, model_1.Spinner, model_1.Sheet, model_1.IsLoading, model_1.LastChangeCheckTime, model_1.LastSimulatedCanvasState, model_1.LastDetailedSavedState, model_1.CurrentSelected, model_1.LastSelectedIds, model_1.LastUsedDialogWidth, model_1.SelectedComponent, model_1.CurrentStepSimulationStep, model_1.CurrentTruthTable, model_1.TTConfig, model_1.RightPaneTabVisible, model_1.SimSubTabVisible, model_1.Hilighted, model_1.Clipboard, model_1.LastCreatedComponent, model_1.SavedSheetIsOutOfDate, model_1.CurrentProj, model_1.PopupViewFunc, model_1.SpinnerPayload, model_1.PopupDialogData, model_1.Notifications, model_1.TopMenuOpenState, model_1.DividerDragMode, model_1.WaveSimViewerWidth, model_1.ConnsOfSelectedWavesAreHighlighted, model_1.Pending, model_1.UIState, model_1.BuildVisible, model_1.DrawBlockTestState))])), (dispatch(new Msg(36, [(model_2) => updateWSModelOfSheet(sheet_4, (ws) => (new WaveSimModel(new WaveSimState(6, []), ws.TopSheet, ws.Sheets, ws.AllWaves, ws.SelectedWaves, ws.StartCycle, ws.ShownCycles, ws.CurrClkCycle, ws.ClkCycleBoxIsEmpty, ws.Radix, ws.WaveformColumnWidth, ws.WaveModalActive, ws.RamModalActive, ws.RamComps, ws.SelectedRams, ws.FastSim, ws.SearchString, ws.ShowSheetDetail, ws.ShowComponentDetail, ws.ShowGroupDetail, ws.HoveredLabel, ws.DraggedIndex, ws.PrevSelectedWaves)), model_2)])), singleton_1(notRunning))))))) : ((e_4 = matchValue_1.fields[0], singleton_1(simError(e_4))))))))))))), delay(() => singleton_1(react.createElement("hr", {}))));
    })))), react.createElement("div", keyValueList([viewWaveSimStyle], 1), ...children_12))];
    return react.createElement("div", {}, ...children_14);
}

//# sourceMappingURL=WaveSim.fs.js.map
