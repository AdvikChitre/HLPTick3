import { arrayHash, equalArrays, compareArrays, numberHash, safeHash, compare, equals } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { toString } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { filter, collect, truncate, map as map_1, exists, sort, contains, singleton, ofArray as ofArray_1, append, empty, head, tail, isEmpty, length, getSlice, item } from "../../fable_modules/fable-library.4.1.4/List.js";
import { isRamSelected, button, getCompGroup, summaryName, wavesToIds, subSheetsToNameReact, Constants_infoSignUnicode, Constants_infoMessage, isWaveSelected, singleWaveWidth, camelCaseDottedWords, getOutputPortNumber, bitLimsString, getInputPortNumber } from "./WaveSimHelpers.fs.js";
import { toConsole, join, printf, toFail } from "../../fable_modules/fable-library.4.1.4/String.js";
import { add, remove, count, FSharpMap__get_Count, values, containsKey, forAll, keys, ofArray, FSharpMap__get_Item } from "../../fable_modules/fable-library.4.1.4/Map.js";
import { extractFastSimulationWidth } from "../../Simulator/Fast/FastRun.fs.js";
import { WaveSimState, CheckBoxStyle, Msg, WaveSimModel, Wave } from "../../Model/ModelType.fs.js";
import { instrumentInterval, getTimeMs } from "../../Common/TimeHelpers.fs.js";
import { map } from "../../fable_modules/fable-library.4.1.4/Array.js";
import { toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { ramRowStyle, selectRamButtonPropsLight, selectRamButtonProps, selectWavesButtonPropsLight, selectWavesButtonProps, detailsProps, noBorderStyle, normalFontStyle, boldFontStyle, checkboxInputProps, summaryProps } from "./WaveSimStyle.fs.js";
import { input, checkbox } from "../../fable_modules/Fulma.2.16.0/Elements/Form/Checkbox.fs.js";
import { DOMAttr, HTMLAttr } from "../../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { Color_IColor, Size_ISize, Common_GenericOption } from "../../fable_modules/Fulma.2.16.0/Common.fs.js";
import * as react from "react";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { List_groupBy, List_except } from "../../fable_modules/fable-library.4.1.4/Seq2.js";
import { dataTooltip } from "../../fable_modules/Fulma.Extensions.Wikiki.Tooltip.3.0.0/Tooltip.fs.js";
import { input as input_1 } from "../../fable_modules/Fulma.2.16.0/Elements/Form/./Input.fs.js";
import { Option, IInputType } from "../../fable_modules/Fulma.2.16.0/Elements/Form/Input.fs.js";
import { Browser_Types_Event__Event_get_Value } from "../../fable_modules/Fable.React.8.0.1/Fable.React.Extensions.fs.js";
import { TableOption, table } from "../../fable_modules/Fulma.2.16.0/Elements/Table.fs.js";
import { FSharpSet__get_Count, toList as toList_1 } from "../../fable_modules/fable-library.4.1.4/Set.js";
import { Card_foot, Card_body, Card_title, Card_head, Card_card, background, Option as Option_1, modal } from "../../fable_modules/Fulma.2.16.0/Components/Modal.fs.js";
import { right, left, level } from "../../fable_modules/Fulma.2.16.0/Layouts/Level.fs.js";
import { Option as Option_2, delete$ } from "../../fable_modules/Fulma.2.16.0/Elements/Delete.fs.js";
import { viewWaveSelectConfirmationPopup } from "../UIPopups.fs.js";
import { Option as Option_3, button as button_1 } from "../../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";

export function cap(sheet) {
    return sheet.toLocaleUpperCase();
}

/**
 * Get port names for waves that are from Input ports.
 * Appended to comp.Label
 */
export function getInputPortName(compType, port) {
    const muxPortName = (size) => {
        if (equals(port, size)) {
            return ".SEL";
        }
        else {
            return "." + toString(port);
        }
    };
    switch (compType.tag) {
        case 10:
        case 23:
        case 25:
            return ".IN" + toString(port);
        case 11:
            return muxPortName(2);
        case 12:
            return muxPortName(4);
        case 13:
            return muxPortName(8);
        case 9:
            if (equals(port, 0)) {
                return ".SEL";
            }
            else {
                return ".DATA";
            }
        case 0:
        case 1:
        case 7:
        case 49:
        case 2:
        case 38:
        case 4:
            return "";
        case 31:
        case 33:
            return ".D";
        case 40:
        case 39:
            return ".ADDR";
        case 14:
        case 15:
        case 16:
            if (equals(port, 0)) {
                return ".DATA";
            }
            else {
                return ".SEL";
            }
        case 21:
        case 22:
        case 24:
            if (equals(port, 0)) {
                return ".P";
            }
            else {
                return ".Q";
            }
        case 17:
        case 19:
            if (equals(port, 0)) {
                return ".CIN";
            }
            else if (equals(port, 1)) {
                return ".P";
            }
            else {
                return ".Q";
            }
        case 18:
        case 20:
            if (equals(port, 0)) {
                return ".P";
            }
            else {
                return ".Q";
            }
        case 46:
            if (equals(port, 0)) {
                return ".IN";
            }
            else {
                return ".Shifter";
            }
        case 32:
        case 34:
            if (equals(port, 0)) {
                return ".D";
            }
            else {
                return ".EN";
            }
        case 35:
            if (equals(port, 0)) {
                return ".D";
            }
            else if (equals(port, 1)) {
                return ".LOAD";
            }
            else {
                return ".EN";
            }
        case 37:
            if (equals(port, 0)) {
                return ".D";
            }
            else {
                return ".LOAD";
            }
        case 36:
            return ".EN";
        case 41:
        case 42:
            if (equals(port, 0)) {
                return ".ADDR";
            }
            else if (equals(port, 1)) {
                return ".DIN";
            }
            else {
                return ".WEN";
            }
        case 26: {
            const c = compType.fields[0];
            return "." + item(getInputPortNumber(port), c.InputLabels)[0];
        }
        case 44:
        case 45:
        case 43:
            return toFail(printf("What? Legacy RAM component types should never occur"));
        case 48:
            return toFail(printf("Legacy Input component types should never occur"));
        case 3:
            return toFail(printf("IOLabel should not occur in getInputPortName"));
        case 27:
            return toFail(printf("MergeWires should not occur in getInputPortName"));
        case 29:
            return toFail(printf("MergeN should not occur in getInputPortName"));
        case 28:
            return toFail(printf("SplitWire should not occur in getInputPortName"));
        case 30:
            return toFail(printf("SplitN should not occur in getInputPortName"));
        case 6:
            return toFail(printf("BusSelection should not occur in getInputPortName"));
        default:
            return ".IN";
    }
}

/**
 * Get names for waves that are from Input ports
 */
export function getInputName(withComp, comp, port) {
    const portName = getInputPortName(comp.FType, port);
    let bitLims;
    const matchValue = comp.FType;
    let matchResult, w;
    switch (matchValue.tag) {
        case 46: {
            matchResult = 2;
            break;
        }
        case 40:
        case 39:
        case 41:
        case 42: {
            matchResult = 3;
            break;
        }
        case 26: {
            matchResult = 4;
            break;
        }
        case 44:
        case 45:
        case 43: {
            matchResult = 5;
            break;
        }
        case 48: {
            matchResult = 6;
            break;
        }
        case 4: {
            matchResult = 7;
            break;
        }
        case 3: {
            matchResult = 8;
            break;
        }
        case 27: {
            matchResult = 9;
            break;
        }
        case 29: {
            matchResult = 10;
            break;
        }
        case 28: {
            matchResult = 11;
            break;
        }
        case 30: {
            matchResult = 12;
            break;
        }
        case 6: {
            matchResult = 13;
            break;
        }
        case 0: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 1: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 7: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 49: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 2: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 21: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 23: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 22: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 17: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 24: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 18: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 19: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 20: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        default:
            matchResult = 0;
    }
    switch (matchResult) {
        case 0: {
            bitLims = bitLimsString(0, 0);
            break;
        }
        case 1: {
            bitLims = bitLimsString(w - 1, 0);
            break;
        }
        case 2: {
            const w_1 = matchValue.fields[0] | 0;
            const tp = matchValue.fields[2];
            const m = matchValue.fields[1] | 0;
            bitLims = bitLimsString(w_1 - 1, 0);
            break;
        }
        case 3: {
            bitLims = "";
            break;
        }
        case 4: {
            const c = matchValue.fields[0];
            bitLims = bitLimsString(item(getInputPortNumber(port), c.InputLabels)[1] - 1, 0);
            break;
        }
        case 5: {
            bitLims = toFail(printf("What? Legacy RAM component types should never occur"));
            break;
        }
        case 6: {
            bitLims = toFail(printf("Legacy Input component types should never occur"));
            break;
        }
        case 7: {
            bitLims = toFail(printf("NotConnected should not occur in getInputName"));
            break;
        }
        case 8: {
            bitLims = toFail(printf("IOLabel should not occur in getInputName"));
            break;
        }
        case 9: {
            bitLims = toFail(printf("MergeWires should not occur in getInputName"));
            break;
        }
        case 10: {
            bitLims = toFail(printf("MergeN should not occur in getInputName"));
            break;
        }
        case 11: {
            bitLims = toFail(printf("SplitWire should not occur in getInputName"));
            break;
        }
        case 12: {
            bitLims = toFail(printf("SplitN should not occur in getInputName"));
            break;
        }
        default:
            bitLims = toFail(printf("BusSeleciton should not occur in getInputName"));
    }
    if (withComp) {
        return (comp.FLabel + portName) + bitLims;
    }
    else {
        return portName.slice(1, (portName.length - 1) + 1) + bitLims;
    }
}

/**
 * Get port names for waves that are from Output ports
 * Appended to comp.Label
 */
export function getOutputPortName(compType, port) {
    switch (compType.tag) {
        case 0:
        case 1:
        case 7:
        case 49:
        case 2:
        case 3:
        case 4:
            return "";
        case 14:
        case 15:
        case 16:
            return "." + toString(port);
        case 17:
        case 18:
            if (equals(port, 0)) {
                return ".SUM";
            }
            else {
                return ".COUT";
            }
        case 19:
        case 20:
            return ".SUM";
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 37:
        case 36:
        case 38:
            return ".Q";
        case 41:
        case 42:
        case 39:
        case 40:
            return ".DOUT";
        case 26: {
            const c = compType.fields[0];
            return "." + item(getOutputPortNumber(port), c.OutputLabels)[0];
        }
        case 44:
        case 45:
        case 43:
            return toFail(printf("What? Legacy RAM component types should never occur"));
        case 48:
            return toFail(printf("Legacy Input component types should never occur"));
        case 27:
            return toFail(printf("MergeWires should not occur in getOutputName"));
        case 29:
            return toFail(printf("MergeN should not occur in getOutputName"));
        case 28:
            return toFail(printf("SplitWire should not occur in getOutputName"));
        case 30:
            return toFail(printf("SplitN should not occur in getOutputName"));
        case 6:
            return toFail(printf("BusSeleciton should not occur in getOutputName"));
        default:
            return ".OUT";
    }
}

/**
 * Get names for waves that are from Output ports
 */
export function getOutputName(withComp, comp, port, fastSim) {
    const portName = getOutputPortName(comp.FType, port);
    let bitLims;
    const matchValue = comp.FType;
    let matchResult, w, mem;
    switch (matchValue.tag) {
        case 46: {
            matchResult = 2;
            break;
        }
        case 26: {
            matchResult = 4;
            break;
        }
        case 3: {
            matchResult = 5;
            break;
        }
        case 44:
        case 45:
        case 43: {
            matchResult = 6;
            break;
        }
        case 48: {
            matchResult = 7;
            break;
        }
        case 4: {
            matchResult = 8;
            break;
        }
        case 27: {
            matchResult = 9;
            break;
        }
        case 29: {
            matchResult = 10;
            break;
        }
        case 28: {
            matchResult = 11;
            break;
        }
        case 30: {
            matchResult = 12;
            break;
        }
        case 6: {
            matchResult = 13;
            break;
        }
        case 0: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 1: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 7: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 49: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 2: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 21: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 22: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 24: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 23: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 25: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 17: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 33: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 34: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 18: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 19: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 20: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 35: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 37: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 36: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 38: {
            matchResult = 1;
            w = matchValue.fields[0];
            break;
        }
        case 41: {
            matchResult = 3;
            mem = matchValue.fields[0];
            break;
        }
        case 42: {
            matchResult = 3;
            mem = matchValue.fields[0];
            break;
        }
        case 39: {
            matchResult = 3;
            mem = matchValue.fields[0];
            break;
        }
        case 40: {
            matchResult = 3;
            mem = matchValue.fields[0];
            break;
        }
        default:
            matchResult = 0;
    }
    switch (matchResult) {
        case 0: {
            bitLims = bitLimsString(0, 0);
            break;
        }
        case 1: {
            bitLims = bitLimsString(w - 1, 0);
            break;
        }
        case 2: {
            const w_1 = matchValue.fields[0] | 0;
            const tp = matchValue.fields[2];
            const m = matchValue.fields[1] | 0;
            bitLims = bitLimsString(w_1 - 1, 0);
            break;
        }
        case 3: {
            bitLims = bitLimsString(mem.WordWidth - 1, 0);
            break;
        }
        case 4: {
            const c = matchValue.fields[0];
            bitLims = bitLimsString(item(getOutputPortNumber(port), c.OutputLabels)[1] - 1, 0);
            break;
        }
        case 5: {
            const drivingComp = FSharpMap__get_Item(fastSim.FIOActive, [comp.FLabel, comp.fId[1]]);
            const labelWidth = extractFastSimulationWidth(fastSim, drivingComp.SimComponent.Id, drivingComp.fId[1], 0) | 0;
            if (labelWidth === 0) {
                bitLims = toFail(`What? Can't find width for IOLabel ${comp.FLabel}$ `);
            }
            else {
                const width = labelWidth | 0;
                bitLims = bitLimsString(width - 1, 0);
            }
            break;
        }
        case 6: {
            bitLims = toFail(printf("What? Legacy RAM component types should never occur"));
            break;
        }
        case 7: {
            bitLims = toFail(printf("Legacy Input component types should never occur"));
            break;
        }
        case 8: {
            bitLims = toFail(printf("NotConnected should not occur in getOutputName"));
            break;
        }
        case 9: {
            bitLims = toFail(printf("MergeWires should not occur in getOutputName"));
            break;
        }
        case 10: {
            bitLims = toFail(printf("MergeN should not occur in getOutputName"));
            break;
        }
        case 11: {
            bitLims = toFail(printf("SplitWire should not occur in getOutputName"));
            break;
        }
        case 12: {
            bitLims = toFail(printf("SplitN should not occur in getOutputName"));
            break;
        }
        default:
            bitLims = toFail(printf("BusSelection should not occur in getOutputName"));
    }
    if (withComp) {
        return (comp.FLabel + portName) + bitLims;
    }
    else {
        return portName.slice(1, (portName.length - 1) + 1) + bitLims;
    }
}

export function caseCompAndPortName(name) {
    const parts = name.split(".");
    const matchValue = parts.length | 0;
    switch (matchValue) {
        case 0:
        case 1:
            return name.toLocaleUpperCase();
        default: {
            const n = matchValue | 0;
            return (join(".", parts.slice(0, (n - 2) + 1)).toLocaleUpperCase() + ".") + camelCaseDottedWords(parts[n - 1]);
        }
    }
}

/**
 * Get name for a wave. Names are generated from component label, port name, and bit width of wave.
 */
export function getName(index, fastSim) {
    const fc = FSharpMap__get_Item(fastSim.WaveComps, index.Id);
    return caseCompAndPortName((index.PortType.tag === 1) ? getOutputName(true, fc, index.PortNumber, fastSim) : getInputName(true, fc, index.PortNumber));
}

export function nameWithSheet(fastSim, dispName, waveIndex) {
    const fc = FSharpMap__get_Item(fastSim.WaveComps, waveIndex.Id);
    let matchValue;
    const this$ = fc;
    matchValue = getSlice(0, length(this$.SheetName) - 2, this$.SheetName);
    if (!isEmpty(matchValue)) {
        if (isEmpty(tail(matchValue))) {
            const sheet = head(matchValue);
            return (sheet + ".") + dispName;
        }
        else {
            const path = matchValue;
            return (camelCaseDottedWords(item(length(path) - 2, path)) + ".") + dispName;
        }
    }
    else {
        return (fastSim.SimulatedTopSheet + ".") + dispName;
    }
}

/**
 * Make Wave for each component and port on sheet
 */
export function makeWave(ws, fastSim, wi) {
    let this$, this$_1;
    const fc = FSharpMap__get_Item(fastSim.WaveComps, wi.Id);
    let driver;
    const matchValue = fastSim.Drivers[wi.SimArrayIndex];
    if (matchValue == null) {
        toConsole(printf("What? No driver!"));
        toConsole(`ERROR Making wave for ${fc.FullName}, portType=${wi.PortType}, portNumber=${wi.PortNumber}, SubSheet=${(this$ = fc, getSlice(0, length(this$.SheetName) - 2, this$.SheetName))}, SheetName=${fc.SheetName}`);
        toConsole(`Can't find simulation waveform driver for ${fc.FullName}.${wi.PortType}[${wi.PortNumber}]`);
        driver = toFail(printf("Aborting..."));
    }
    else {
        const d = matchValue;
        driver = d;
    }
    if (driver.DriverWidth === 0) {
        toConsole(`Warning! 0 width driver for ${fc.FullName}.${wi.PortType}[${wi.PortNumber}]`);
    }
    const dispName = getName(wi, fastSim);
    const portLabel = (wi.PortType.tag === 1) ? getOutputName(false, fc, wi.PortNumber, fastSim) : getInputName(false, fc, wi.PortNumber);
    return new Wave(wi, ws.StartCycle, ws.ShownCycles, singleWaveWidth(ws), ws.Radix, empty(), (this$_1 = fc, getSlice(0, length(this$_1.SheetName) - 2, this$_1.SheetName)), empty(), dispName, nameWithSheet(fastSim, dispName, wi), fc.FLabel, portLabel, driver.DriverWidth, driver.DriverData, void 0);
}

/**
 * Get all simulatable waves from CanvasState. Includes top-level Input and Output ports.
 * Waves contain info which will be used later to create the SVGs for those waves actually
 * selected. Init value of these from this function is None.
 */
export function getWaves(ws, fs) {
    const start = getTimeMs();
    toConsole(`${fs.WaveIndex.length} possible waves`);
    return instrumentInterval("makeWavePipeline", start, ofArray(map((wi) => [wi, makeWave(ws, fs, wi)], instrumentInterval("getAllPorts", start, fs.WaveIndex)), {
        Compare: compare,
    }));
}

/**
 * Sets all waves as selected or not selected depending on value of selected
 */
export function toggleSelectAll(selected, wsModel, dispatch) {
    const start = getTimeMs();
    const selectedWaves = selected ? toList(keys(wsModel.AllWaves)) : empty();
    const output = dispatch(new Msg(13, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, selectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
    instrumentInterval("toggleSelectAll", start, void 0);
}

/**
 * Row in wave selection table that selects all values in wsModel.AllWaves
 */
export function selectAll(wsModel, dispatch) {
    let children;
    const allWavesSelected = forAll((index, _arg) => isWaveSelected(wsModel, index), wsModel.AllWaves);
    const props_4 = summaryProps(false, new CheckBoxStyle(3, [empty()]), wsModel, dispatch);
    const children_4 = [(children = [checkbox(empty(), singleton(input(singleton(new Common_GenericOption(1, [append(checkboxInputProps, ofArray_1([new HTMLAttr(62, [allWavesSelected]), new DOMAttr(9, [(_arg_1) => {
        toggleSelectAll(!allWavesSelected, wsModel, dispatch);
    }])]))])))))], react.createElement("th", {}, ...children)), react.createElement("th", {}, "Select All")];
    return react.createElement("tr", keyValueList(props_4, 1), ...children_4);
}

/**
 * Toggle selection for a single wave.
 */
export function toggleWaveSelection(index, wsModel, dispatch) {
    toConsole(`toggling ${index}`);
    const selectedWaves = contains(index, wsModel.SelectedWaves, {
        Equals: equals,
        GetHashCode: safeHash,
    }) ? List_except([index], wsModel.SelectedWaves, {
        Equals: equals,
        GetHashCode: safeHash,
    }) : append(singleton(index), wsModel.SelectedWaves);
    const wsModel_1 = new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, selectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves);
    dispatch(new Msg(13, [wsModel_1]));
}

/**
 * Toggle selection of a list of waves.
 */
export function toggleSelectSubGroup(wsModel, dispatch, selected, waves) {
    const comps = wsModel.FastSim.WaveComps;
    let selectedWaves;
    if (selected) {
        const wavesWithMinDepth = equals(waves, empty()) ? empty() : head(sort(List_groupBy((waves_1) => length(FSharpMap__get_Item(comps, waves_1.Id).AccessPath), waves, {
            Equals: (x, y) => (x === y),
            GetHashCode: numberHash,
        }), {
            Compare: compareArrays,
        }))[1];
        selectedWaves = append(wsModel.SelectedWaves, wavesWithMinDepth);
    }
    else {
        selectedWaves = List_except(waves, wsModel.SelectedWaves, {
            Equals: equals,
            GetHashCode: safeHash,
        });
    }
    return dispatch(new Msg(13, [new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, selectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves)]));
}

/**
 * Table row of a checkbox and name of a wave.
 */
export function checkboxRow(wsModel, dispatch, index) {
    let children;
    const fontStyle = isWaveSelected(wsModel, index) ? boldFontStyle : normalFontStyle;
    const wave = FSharpMap__get_Item(wsModel.AllWaves, index);
    const children_4 = [(children = [checkbox(empty(), singleton(input(singleton(new Common_GenericOption(1, [append(checkboxInputProps, ofArray_1([new DOMAttr(9, [(_arg) => {
        toggleWaveSelection(index, wsModel, dispatch);
    }]), new HTMLAttr(62, [isWaveSelected(wsModel, index)])]))])))))], react.createElement("td", keyValueList([noBorderStyle], 1), ...children)), react.createElement("td", keyValueList([noBorderStyle], 1), wave.DisplayName)];
    return react.createElement("tr", keyValueList([fontStyle], 1), ...children_4);
}

export const infoButton = (() => {
    const props = [new HTMLAttr(64, [`${"tooltip"} ${"has-tooltip-multiline"} ${"has-tooltip-info"} ${"has-tooltip-right"}`]), dataTooltip(Constants_infoMessage), ["style", {
        fontSize: "25px",
        marginTop: "0px",
        marginLeft: "10px",
        float: "left",
    }]];
    return react.createElement("div", keyValueList(props, 1), Constants_infoSignUnicode);
})();

/**
 * Search bar to allow users to filter out waves by DisplayName
 * some special cases '-', '*' collapse or expand (for selected waves)
 * the wave select window.
 */
export function searchBar(wsModel, dispatch) {
    let props, children;
    const children_2 = [input_1(ofArray_1([new Option(1, [new IInputType(0, [])]), new Option(15, [singleton(["style", {
        marginBottom: "1rem",
        width: "30%",
        float: "left",
    }])]), new Option(12, ["Search string"]), new Option(13, [(c) => {
        dispatch(new Msg(11, [(ws) => (new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, Browser_Types_Event__Event_get_Value(c).toLocaleUpperCase(), wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves))]));
    }])])), infoButton, (props = [["style", {
        float: "right",
        fontSize: "24px",
    }]], (children = [`${length(wsModel.SelectedWaves)} waves selected.`], react.createElement("label", keyValueList(props, 1), ...children)))];
    return react.createElement("div", {}, ...children_2);
}

/**
 * Implemements a checkbox, with toggle state stored in WaveSimModel under ShowDetailMap
 * using  waveIds as key.
 */
export function checkBoxItem(wsModel, isChecked, waveIds, dispatch) {
    return checkbox(empty(), singleton(input(singleton(new Common_GenericOption(1, [ofArray_1([new HTMLAttr(62, [isChecked]), new DOMAttr(9, [(_arg) => {
        toggleSelectSubGroup(wsModel, dispatch, !isChecked, waveIds);
    }])])])))));
}

/**
 * Implemements a checkbox, with toggle state determined by SelectedWaves.
 */
export function waveCheckBoxItem(wsModel, waveIds, dispatch) {
    const comps = wsModel.FastSim.WaveComps;
    const minDepthSelectedWaves = equals(waveIds, empty()) ? empty() : head(sort(List_groupBy((waveId) => length(FSharpMap__get_Item(comps, waveId.Id).AccessPath), waveIds, {
        Equals: (x, y) => (x === y),
        GetHashCode: numberHash,
    }), {
        Compare: compareArrays,
    }))[1];
    const checkBoxState = exists((w) => contains(w, wsModel.SelectedWaves, {
        Equals: equals,
        GetHashCode: safeHash,
    }), minDepthSelectedWaves);
    return checkbox(empty(), singleton(input(singleton(new Common_GenericOption(1, [ofArray_1([new HTMLAttr(62, [checkBoxState]), new DOMAttr(9, [(_arg) => {
        toggleSelectSubGroup(wsModel, dispatch, !checkBoxState, waveIds);
    }])])])))));
}

/**
 * implements one row (with one port)
 */
export function makePortRow(ws, dispatch, waves) {
    let waves_1, children, children_4;
    const wave = !isEmpty(waves) ? (isEmpty(tail(waves)) ? ((waves_1 = head(waves), waves_1)) : toFail(printf("What? {waves.Length} waves passed to portRow"))) : toFail(printf("What? {waves.Length} waves passed to portRow"));
    const subSheet = isEmpty(wave.SubSheet) ? ws.FastSim.SimulatedTopSheet : subSheetsToNameReact(wave.SubSheet);
    const children_6 = [(children = [waveCheckBoxItem(ws, singleton(wave.WaveId), dispatch)], react.createElement("td", {}, ...children)), react.createElement("td", {}, wave.PortLabel), (children_4 = [(wave.WaveId.PortType.tag === 0) ? "Input" : "Output"], react.createElement("td", {}, ...children_4))];
    return react.createElement("tr", {}, ...children_6);
}

/**
 * returns a tr react element representing a thing with a checkbox with summary name and details beneath
 */
export function makeSelectionGroup(showDetails, ws, dispatch, summaryItem, rowItems, cBox, waves) {
    let children, children_8, props_6, children_6, props_2;
    const wi = wavesToIds(waves);
    const props_10 = summaryProps(false, cBox, ws, dispatch);
    const children_10 = [(children = [waveCheckBoxItem(ws, wi, dispatch)], react.createElement("th", {}, ...children)), (children_8 = [(props_6 = detailsProps(showDetails, cBox, ws, dispatch), (children_6 = [(props_2 = summaryProps(true, cBox, ws, dispatch), react.createElement("summary", keyValueList(props_2, 1), summaryItem)), table(empty(), singleton(react.createElement("tbody", {}, ...rowItems)))], react.createElement("details", keyValueList(props_6, 1), ...children_6)))], react.createElement("th", {}, ...children_8))];
    return react.createElement("tr", keyValueList(props_10, 1), ...children_10);
}

/**
 * Returns a tr react element representing a component with ports detailed beneath
 */
export function makeComponentRow(showDetails, ws, dispatch, fc, waves) {
    let this$;
    const cBox = new CheckBoxStyle(1, [fc]);
    const summaryReact = summaryName(ws, cBox, (this$ = fc, getSlice(0, length(this$.SheetName) - 2, this$.SheetName)), waves);
    const rows = map_1((wave) => makePortRow(ws, dispatch, singleton(wave)), waves);
    return makeSelectionGroup(showDetails, ws, dispatch, summaryReact, rows, cBox, waves);
}

/**
 * Returns a tr react element representing a component with ports detailed beneath
 */
export function makeComponentGroup(showDetails, ws, dispatch, subSheet, cGroup, waves) {
    const compWaves = List_groupBy((wave) => wave.WaveId.Id, waves, {
        Equals: equalArrays,
        GetHashCode: arrayHash,
    });
    if (length(compWaves) === 1) {
        const fc = FSharpMap__get_Item(ws.FastSim.WaveComps, head(waves).WaveId.Id);
        return makeComponentRow(showDetails, ws, dispatch, fc, waves);
    }
    else {
        const cBox = new CheckBoxStyle(2, [cGroup, subSheet]);
        const summaryReact = summaryName(ws, cBox, subSheet, waves);
        const compRows = map_1((tupledArg) => {
            const fId = tupledArg[0];
            const compWaves_1 = tupledArg[1];
            return makeComponentRow(showDetails, ws, dispatch, FSharpMap__get_Item(ws.FastSim.WaveComps, fId), compWaves_1);
        }, compWaves);
        return makeSelectionGroup(showDetails, ws, dispatch, summaryReact, compRows, cBox, waves);
    }
}

export function makeSheetRow(showDetails, ws, dispatch, subSheet, waves) {
    const cBox = new CheckBoxStyle(3, [subSheet]);
    const fs = ws.FastSim;
    const wavesBySheet = List_groupBy((w) => truncate(length(subSheet) + 1, w.SubSheet), waves, {
        Equals: equals,
        GetHashCode: safeHash,
    });
    const componentRows = map_1((tupledArg_1) => {
        const grp = tupledArg_1[0];
        const groupWaves = tupledArg_1[1];
        return makeComponentGroup(showDetails, ws, dispatch, subSheet, grp, groupWaves);
    }, List_groupBy((wave) => getCompGroup(fs, wave), collect((tuple) => tuple[1], filter((tupledArg) => {
        const g = tupledArg[0];
        const wLst = tupledArg[1];
        return equals(g, subSheet);
    }, wavesBySheet)), {
        Equals: equals,
        GetHashCode: safeHash,
    }));
    const subSheetRows = map_1((tupledArg_3) => {
        const subSheet$0027 = tupledArg_3[0];
        const waves$0027 = tupledArg_3[1];
        return makeSheetRow(showDetails, ws, dispatch, subSheet$0027, waves$0027);
    }, filter((tupledArg_2) => {
        const g_1 = tupledArg_2[0];
        return !equals(g_1, subSheet);
    }, wavesBySheet));
    const rows = append(subSheetRows, componentRows);
    if (equals(subSheet, empty())) {
        return table(ofArray_1([new TableOption(0, []), new TableOption(2, []), new TableOption(6, [singleton(["style", {
            borderWidth: 0,
        }])])]), singleton(react.createElement("tbody", {}, ...rows)));
    }
    else {
        return makeSelectionGroup(showDetails, ws, dispatch, summaryName(ws, cBox, subSheet, waves), rows, cBox, waves);
    }
}

/**
 * This is a workaropund for a potential data inconsistency in the waves and selected waves of a FastSimulation
 * it ensure that the selector only lists valid waves by filyering all waves against valid components
 * It would be better to understand the (occasional) bug taht leads to this inconsistency.
 */
export function ensureWaveConsistency(ws) {
    const fs = ws.FastSim;
    const okWaves = filter((wave) => containsKey(wave.WaveId.Id, fs.WaveComps), toList(values(ws.AllWaves)));
    if (length(okWaves) !== FSharpMap__get_Count(ws.AllWaves)) {
        toConsole(`EnsureWaveConsistency: waves,Length=${length(okWaves)}, ws.Allwaves.Count=${FSharpMap__get_Count(ws.AllWaves)}`);
    }
    const okSelectedWaves = filter((selW) => containsKey(selW, ws.AllWaves), ws.SelectedWaves);
    if (length(okSelectedWaves) !== length(ws.SelectedWaves)) {
        toConsole(`ok selected waves length = ${length(okSelectedWaves)} <> selectedwaves length = ${length(ws.SelectedWaves)}`);
    }
    return [okWaves, okSelectedWaves];
}

export function selectWaves(ws, subSheet, dispatch) {
    if (!ws.WaveModalActive) {
        return react.createElement("div", {});
    }
    else {
        const patternInput = ensureWaveConsistency(ws);
        const okWaves = patternInput[0];
        const okSelectedWaves = patternInput[1];
        const searchText = ws.SearchString;
        let wavesToDisplay;
        let matchResult;
        switch (searchText) {
            case "-": {
                if (((FSharpSet__get_Count(ws.ShowSheetDetail) !== 0) ? true : (FSharpSet__get_Count(ws.ShowComponentDetail) !== 0)) ? true : (FSharpSet__get_Count(ws.ShowGroupDetail) !== 0)) {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case "": {
                matchResult = 1;
                break;
            }
            case "*": {
                matchResult = 2;
                break;
            }
            default:
                matchResult = 3;
        }
        switch (matchResult) {
            case 0: {
                dispatch(new Msg(16, [[toList_1(ws.ShowSheetDetail), false]]));
                dispatch(new Msg(18, [[toList_1(ws.ShowGroupDetail), false]]));
                dispatch(new Msg(17, [[toList_1(ws.ShowComponentDetail), false]]));
                wavesToDisplay = empty();
                break;
            }
            case 1: {
                wavesToDisplay = okWaves;
                break;
            }
            case 2: {
                wavesToDisplay = map_1((wi) => FSharpMap__get_Item(ws.AllWaves, wi), okSelectedWaves);
                break;
            }
            default:
                wavesToDisplay = filter((x) => (x.ViewerDisplayName.toLocaleUpperCase().indexOf(searchText) >= 0), okWaves);
        }
        const showDetails = ((length(wavesToDisplay) < 10) ? true : (searchText.length > 0)) && (searchText !== "-");
        return makeSheetRow(showDetails, ws, dispatch, empty(), wavesToDisplay);
    }
}

/**
 * Button to activate wave selection modal
 */
export function selectWavesButton(wsModel, dispatch) {
    const waveCount = count(wsModel.AllWaves) | 0;
    const patternInput = ((waveCount > 0) && equals(wsModel.State, new WaveSimState(5, []))) ? [selectWavesButtonProps("selectButton"), (_arg) => {
        dispatch(new Msg(11, [(ws) => (new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, true, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves))]));
    }] : [selectWavesButtonPropsLight("selectButton"), (_arg_1) => {
    }];
    const props = patternInput[0];
    const buttonFunc = patternInput[1];
    return button(props, buttonFunc, "Select Waves");
}

/**
 * Modal that, when active, allows users to select waves to be viewed.
 */
export function selectWavesModal(wsModel, dispatch) {
    const endModal = (_arg) => {
        dispatch(new Msg(11, [(ws) => (new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, false, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, "", wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves))]));
    };
    return modal(singleton(new Option_1(1, [wsModel.WaveModalActive])), ofArray_1([background(singleton(new Common_GenericOption(1, [singleton(new DOMAttr(40, [(_arg_1) => {
        dispatch(new Msg(11, [(ws_1) => (new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, false, wsModel.RamModalActive, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves))]));
    }]))])), empty()), Card_card(singleton(new Common_GenericOption(1, [singleton(["style", {
        minWidth: "900px",
    }])])), ofArray_1([Card_head(empty(), singleton(Card_title(empty(), singleton(level(empty(), ofArray_1([left(empty(), singleton("Select Waves")), right(empty(), singleton(delete$(ofArray_1([new Option_2(0, [new Size_ISize(1, [])]), new Option_2(3, [(_arg_2) => {
        const numWaves = length(wsModel.SelectedWaves) | 0;
        if (numWaves > 20) {
            viewWaveSelectConfirmationPopup(numWaves, (finish, _arg_3) => {
                dispatch(new Msg(41, []));
                if (finish) {
                    endModal();
                }
            }, dispatch);
        }
        else {
            endModal();
        }
    }])]), empty())))])))))), Card_body(singleton(new Common_GenericOption(1, [singleton(["style", {
        overflowY: "visible",
    }])])), ofArray_1([searchBar(wsModel, dispatch), selectWaves(wsModel, empty(), dispatch)])), Card_foot(singleton(new Common_GenericOption(1, [singleton(["style", {
        display: "inline-block",
        float: "right",
    }])])), singleton(button_1(ofArray_1([new Option_3(18, [endModal]), new Option_3(0, [new Color_IColor(6, [])]), new Option_3(17, [singleton(["style", {
        display: "inline-block",
        float: "right",
    }])])]), singleton("Done"))))]))]));
}

/**
 * Button to activate RAM selection modal.
 */
export function selectRamButton(wsModel, dispatch) {
    const ramCount = length(wsModel.RamComps) | 0;
    const patternInput = ((ramCount > 0) && equals(wsModel.State, new WaveSimState(5, []))) ? [selectRamButtonProps("selectRamButton"), (_arg) => {
        dispatch(new Msg(11, [(ws) => (new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, true, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves))]));
    }] : [selectRamButtonPropsLight("selectRamButton"), (_arg_1) => {
    }];
    const props = patternInput[0];
    const buttonFunc = patternInput[1];
    return button(props, buttonFunc, "Select RAM");
}

/**
 * Toggle if a RAM's contents is selected for viewing.
 */
export function toggleRamSelection(ramId_, ramId__1, ramLabel, wsModel, dispatch) {
    const ramId = [ramId_, ramId__1];
    const selectedRams = isRamSelected(ramId[0], ramId[1], wsModel) ? remove(ramId, wsModel.SelectedRams) : add(ramId, ramLabel, wsModel.SelectedRams);
    return dispatch(new Msg(11, [(ws) => (new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, wsModel.RamModalActive, wsModel.RamComps, selectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves))]));
}

/**
 * Modal that, when active, allows users to select RAMs to view their contents.
 */
export function selectRamModal(wsModel, dispatch) {
    let children_8;
    const ramRows = (ram) => {
        let children, tupledArg, children_4;
        const children_6 = [(children = [checkbox(empty(), singleton(input(singleton(new Common_GenericOption(1, [append(checkboxInputProps, ofArray_1([new HTMLAttr(62, [(tupledArg = ram.fId, isRamSelected(tupledArg[0], tupledArg[1], wsModel))]), new DOMAttr(9, [(_arg) => {
            const tupledArg_1 = ram.fId;
            toggleRamSelection(tupledArg_1[0], tupledArg_1[1], ram.FullName, wsModel, dispatch);
        }])]))])))))], react.createElement("td", {}, ...children)), (children_4 = [react.createElement("label", keyValueList([ramRowStyle], 1), ram.FullName)], react.createElement("td", {}, ...children_4))];
        return react.createElement("tr", {}, ...children_6);
    };
    return modal(singleton(new Option_1(1, [wsModel.RamModalActive])), ofArray_1([background(singleton(new Common_GenericOption(1, [singleton(new DOMAttr(40, [(_arg_1) => {
        dispatch(new Msg(11, [(ws) => (new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, false, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves))]));
    }]))])), empty()), Card_card(empty(), ofArray_1([Card_head(empty(), singleton(Card_title(empty(), singleton(level(empty(), ofArray_1([left(empty(), singleton("Select RAM")), right(empty(), singleton(delete$(ofArray_1([new Option_2(0, [new Size_ISize(1, [])]), new Option_2(3, [(_arg_2) => {
        dispatch(new Msg(11, [(ws_1) => (new WaveSimModel(wsModel.State, wsModel.TopSheet, wsModel.Sheets, wsModel.AllWaves, wsModel.SelectedWaves, wsModel.StartCycle, wsModel.ShownCycles, wsModel.CurrClkCycle, wsModel.ClkCycleBoxIsEmpty, wsModel.Radix, wsModel.WaveformColumnWidth, wsModel.WaveModalActive, false, wsModel.RamComps, wsModel.SelectedRams, wsModel.FastSim, wsModel.SearchString, wsModel.ShowSheetDetail, wsModel.ShowComponentDetail, wsModel.ShowGroupDetail, wsModel.HoveredLabel, wsModel.DraggedIndex, wsModel.PrevSelectedWaves))]));
    }])]), empty())))])))))), Card_body(empty(), ofArray_1(["Select synchronous RAM components to view their contents. ", "Note that asynchronous RAM components cannot be viewed in the waveform simulator. ", react.createElement("br", {}), react.createElement("br", {}), "On a write, the corresponding row will be highlighted in red. ", "On a read, the corresponding row will be highlighted in blue. ", "Any memory address which has not been initialised with a value will not be shown in the table. ", react.createElement("hr", {}), table(empty(), singleton((children_8 = map_1(ramRows, wsModel.RamComps), react.createElement("tbody", {}, ...children_8))))])), Card_foot(empty(), empty())]))]));
}

//# sourceMappingURL=WaveSimSelect.fs.js.map
