import * as verilogGrammar from "../VerilogComponent/VerilogGrammar.js";
import nearley from "nearley";
import { parseFromFile, fix } from "../VerilogComponent/parser.js";
import { menu, list as list_4, Item_Option, Item_li } from "../fable_modules/Fulma.2.16.0/Components/Menu.fs.js";
import { HTMLAttr, CSSProp, DOMAttr } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { length as length_1, item as item_2, fold, findIndexBack, cons, isEmpty, append, find, empty, filter, map, singleton, ofArray } from "../fable_modules/fable-library.4.1.4/List.js";
import { reduceApprox, tryGetLoadedComponents } from "./ModelHelpers.fs.js";
import { SheetT_Msg } from "../Model/DrawModelType.fs.js";
import { PopupDialogData, UICommandType, Model, Msg } from "../Model/ModelType.fs.js";
import { getOrderedCompLabels } from "../Simulator/Extractor.fs.js";
import { SheetInfo, Memory1, HighLightColor, Project, Component, LoadedComponent, CCForm, CustomComponentType, ComponentType } from "../Common/CommonTypes.fs.js";
import { debugLevel } from "../Interface/JSHelpers.fs.js";
import { createAtom, compare as compare_1, defaultOf, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { split, toConsole, interpolate, toFail, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { dialogVerilogPopup, dialogVerilogCompBody, getCode, getMemorySetup, dialogPopupBodyMemorySetup, dialogPopupBodyTwoInts, dialogPopupBodyIntAndText, getIntList2, getIntList, dialogPopupBodyNInts, dialogPopupBodyOnlyBoundedInt, dialogPopupBodyOnlyInt, dialogPopupBodyOnlyTextWithDefaultValue, dialogPopupBodyOnlyText, dialogPopupBodyTextAndInt, dialogPopup, getInt2, getInt, getText, dialogPopupBodyTextAndTwoInts } from "../DrawBlock/PopupHelpers.fs.js";
import { toUInt32, compare, fromUInt64, op_RightShift, fromInt64, op_BitwiseAnd, op_LeftShift, op_Subtraction, toUInt64, toInt32, fromInt32, toInt64 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { openFileInProject, saveOpenFileActionWithModelUpdate, formatLabelFromType } from "./MenuHelpers.fs.js";
import { StringModule_StartsWithLetter } from "../Common/EEExtensions.fs.js";
import * as react_1 from "react";
import { strToIntCheckWidth, hex, fillHex64 } from "../Simulator/NumberHelpers.fs.js";
import { value as value_1, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { empty as empty_1 } from "../fable_modules/fable-library.4.1.4/Map.js";
import { tryLoadComponentFromPath, writeFile, pathJoin, initialiseMem } from "../Interface/FilesIO.fs.js";
import { getSyntaxErrorInfo, getErrorDiv } from "../VerilogComponent/CodeEditorHelpers.fs.js";
import { SimpleJson_tryParse } from "../fable_modules/Fable.SimpleJson.3.24.0/./SimpleJson.fs.js";
import { createTypeInfo } from "../fable_modules/Fable.SimpleJson.3.24.0/./TypeInfo.Converter.fs.js";
import { CodeEditorOpen, VerilogInput_$reflection, ParserOutput_$reflection } from "../VerilogComponent/VerilogTypes.fs.js";
import { Convert_fromJson } from "../fable_modules/Fable.SimpleJson.3.24.0/./Json.Converter.fs.js";
import { createSheet } from "../VerilogComponent/SheetCreator.fs.js";
import { JsonHelpers_stateToJsonString } from "../Common/Helpers.fs.js";
import { updateVerilogFileActionWithModelUpdate } from "./TopMenuView.fs.js";
import { getSemanticErrors } from "../VerilogComponent/ErrorCheck.fs.js";
import { tryLast } from "../fable_modules/fable-library.4.1.4/Array.js";
import { toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { menuLabelStyle } from "./Style.fs.js";
import { dataTooltip } from "../fable_modules/Fulma.Extensions.Wikiki.Tooltip.3.0.0/Tooltip.fs.js";
import { Common_GenericOption } from "../fable_modules/Fulma.2.16.0/Common.fs.js";




export const Constants_maxGateInputs = 19;

export const Constants_maxSplitMergeBranches = 19;

export function menuItem(styles, label, onClick) {
    return Item_li(ofArray([new Item_Option(0, [false]), new Item_Option(1, [ofArray([new DOMAttr(40, [onClick]), ["style", keyValueList(styles, 1)]])])]), singleton(label));
}

function createComponent(compType, label, model, dispatch) {
    return dispatch(new Msg(1, [new SheetT_Msg(19, [tryGetLoadedComponents(model), compType, label])]));
}

export function createCompStdLabel(comp, model, dispatch) {
    return createComponent(comp, "", model, dispatch);
}

function makeCustom(styles, model, dispatch, loadedComponent) {
    const canvas = loadedComponent.CanvasState;
    return menuItem(styles, loadedComponent.Name, (_arg) => {
        const custom = new ComponentType(26, [new CustomComponentType(loadedComponent.Name, getOrderedCompLabels(new ComponentType(0, [0, void 0]), canvas[0], canvas[1]), getOrderedCompLabels(new ComponentType(1, [0]), canvas[0], canvas[1]), loadedComponent.Form, loadedComponent.Description)]);
        dispatch(new Msg(1, [new SheetT_Msg(19, [tryGetLoadedComponents(model), custom, ""])]));
    });
}

function makeCustomList(styles, model, dispatch) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        return map((loadedComponent) => makeCustom(styles, model, dispatch, loadedComponent), filter((comp_1) => {
            if (debugLevel() !== 0) {
                if (equals(comp_1.Form, new CCForm(0, [])) ? true : equals(comp_1.Form, new CCForm(2, []))) {
                    return true;
                }
                else {
                    return equals(comp_1.Form, new CCForm(3, []));
                }
            }
            else if (equals(comp_1.Form, new CCForm(0, []))) {
                return true;
            }
            else {
                return equals(comp_1.Form, new CCForm(2, []));
            }
        }, filter((comp) => (comp.Name !== project.OpenFileName), project.LoadedComponents)));
    }
    else {
        return empty();
    }
}

function makeVerilog(styles, model, dispatch, loadedComponent) {
    const canvas = loadedComponent.CanvasState;
    return menuItem(styles, loadedComponent.Name, (_arg) => {
        const verilog = new ComponentType(26, [new CustomComponentType(loadedComponent.Name, getOrderedCompLabels(new ComponentType(0, [0, void 0]), canvas[0], canvas[1]), getOrderedCompLabels(new ComponentType(1, [0]), canvas[0], canvas[1]), loadedComponent.Form, loadedComponent.Description)]);
        dispatch(new Msg(1, [new SheetT_Msg(19, [tryGetLoadedComponents(model), verilog, ""])]));
    });
}

function makeVerilogList(styles, model, dispatch) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        return map((loadedComponent) => makeVerilog(styles, model, dispatch, loadedComponent), filter((comp_1) => {
            const matchValue_1 = comp_1.Form;
            let matchResult;
            if (matchValue_1 != null) {
                if (matchValue_1.tag === 4) {
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
                    return true;
                default:
                    return false;
            }
        }, filter((comp) => (comp.Name !== project.OpenFileName), project.LoadedComponents)));
    }
    else {
        return empty();
    }
}

function createInputPopup(typeStr, compType, model, dispatch) {
    const title = toText(printf("Add %s node"))(typeStr);
    const beforeText = (_arg) => toText(printf("How do you want to name your %s?"))(typeStr);
    const placeholder = "Component name";
    const beforeInt = (_arg_1) => toText(printf("How many bits should the %s node have?"))(typeStr);
    const beforeDefaultValue = (_arg_2) => toText(printf("If the input is undriven, what should the default value be?"));
    const intDefault = model.LastUsedDialogWidth | 0;
    const body = dialogPopupBodyTextAndTwoInts(1, beforeText, placeholder, beforeInt, beforeDefaultValue, intDefault, toInt64(fromInt32(0)), dispatch);
    const buttonText = "Add";
    const buttonAction = (model_1) => {
        const dialogData = model_1.PopupDialogData;
        const inputText = getText(dialogData);
        const widthInt = getInt(dialogData) | 0;
        const defaultValueInt = ~~toInt32(getInt2(dialogData)) | 0;
        createComponent(compType([widthInt, defaultValueInt]), formatLabelFromType(compType([widthInt, defaultValueInt]), inputText), model_1, dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027) => {
        const dialogData_1 = model$0027.PopupDialogData;
        let notGoodLabel;
        const s_6 = getText(dialogData_1);
        notGoodLabel = ((s_6 === "") ? true : !StringModule_StartsWithLetter(s_6));
        if (getInt(dialogData_1) < 1) {
            return true;
        }
        else {
            return notGoodLabel;
        }
    };
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createIOPopup(hasInt, typeStr, compType, model, dispatch) {
    const title = toText(printf("Add %s node"))(typeStr);
    const beforeText = (_arg) => toText(printf("How do you want to name your %s?"))(typeStr);
    const placeholder = "Component name";
    const beforeInt = (_arg_1) => toText(printf("How many bits should the %s node have?"))(typeStr);
    const intDefault = model.LastUsedDialogWidth | 0;
    const body = hasInt ? dialogPopupBodyTextAndInt(beforeText, placeholder, beforeInt, intDefault, dispatch) : ((model_1) => dialogPopupBodyOnlyText(beforeText, placeholder, dispatch, model_1));
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputText = getText(dialogData);
        const inputInt = getInt(dialogData) | 0;
        createComponent(compType(inputInt), formatLabelFromType(compType(inputInt), inputText), model, dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => {
        const dialogData_1 = model$0027_1.PopupDialogData;
        let notGoodLabel;
        const s_4 = getText(dialogData_1);
        notGoodLabel = ((s_4 === "") ? true : !StringModule_StartsWithLetter(s_4));
        if (getInt(dialogData_1) < 1) {
            return true;
        }
        else {
            return notGoodLabel;
        }
    };
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

export function createSheetDescriptionPopup(model, previousDescr, sheetName, dispatch) {
    const title = toText(printf("Sheet Description"));
    const beforeText = (_arg) => toText(printf("Add description for sheet \'%s\'"))(sheetName);
    const body = (model_1) => dialogPopupBodyOnlyTextWithDefaultValue(beforeText, "Description", previousDescr, dispatch, model_1);
    const buttonText = "Save";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const descr = getText(dialogData);
        const descrToSave = (descr === "") ? void 0 : descr;
        const matchValue = model.CurrentProj;
        if (matchValue != null) {
            const p = matchValue;
            const target_ldc = find((x) => (x.Name === sheetName), p.LoadedComponents);
            const other_ldc = filter((x_1) => (x_1.Name !== sheetName), p.LoadedComponents);
            const target_ldc$0027 = new LoadedComponent(target_ldc.Name, target_ldc.TimeStamp, target_ldc.FilePath, target_ldc.WaveInfo, target_ldc.CanvasState, target_ldc.InputLabels, target_ldc.OutputLabels, target_ldc.Form, descrToSave);
            const other_ldc$0027 = map((ldc) => {
                const newComps = map((comp) => {
                    let x_2;
                    const matchValue_1 = comp.Type;
                    let matchResult, x_3;
                    if (matchValue_1.tag === 26) {
                        if ((x_2 = matchValue_1.fields[0], x_2.Name === sheetName)) {
                            matchResult = 0;
                            x_3 = matchValue_1.fields[0];
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
                            const newCompType = new ComponentType(26, [new CustomComponentType(x_3.Name, x_3.InputLabels, x_3.OutputLabels, x_3.Form, descrToSave)]);
                            return new Component(comp.Id, newCompType, comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo);
                        }
                        default:
                            return comp;
                    }
                }, ldc.CanvasState[0]);
                const newCS = [newComps, ldc.CanvasState[1]];
                return new LoadedComponent(ldc.Name, ldc.TimeStamp, ldc.FilePath, ldc.WaveInfo, newCS, ldc.InputLabels, ldc.OutputLabels, ldc.Form, ldc.Description);
            }, other_ldc);
            const fixed_ldcs = append(other_ldc$0027, singleton(target_ldc$0027));
            const p$0027 = new Project(p.ProjectPath, p.OpenFileName, p.WorkingFileName, fixed_ldcs);
            const model$0027_1 = new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, p$0027, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
            dispatch(new Msg(34, [p$0027]));
            saveOpenFileActionWithModelUpdate(model$0027_1, dispatch);
        }
        else {
            toFail(printf("Can\'t happen"));
        }
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model_2) => false;
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createGateNPopup(gateType, model, dispatch) {
    const title = `Add N input ${gateType} gate`;
    const beforeInt = (_arg) => "How many inputs should the gate have?";
    const intDefault = 2;
    const body = dialogPopupBodyOnlyInt(beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputInt = getInt(dialogData) | 0;
        createCompStdLabel(new ComponentType(10, [gateType, inputInt]), model, dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => {
        const intIn = getInt(model$0027_1.PopupDialogData) | 0;
        if (intIn < 2) {
            return true;
        }
        else {
            return intIn > Constants_maxGateInputs;
        }
    };
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createMergeNPopup(model, dispatch) {
    const title = "Add N input merge";
    const beforeInt = (_arg) => "How many inputs should the merge component have?";
    const intDefault = 2;
    const body = dialogPopupBodyOnlyBoundedInt(beforeInt, intDefault, 2, Constants_maxSplitMergeBranches, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputInt = getInt(dialogData) | 0;
        createCompStdLabel(new ComponentType(29, [inputInt]), model, dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => {
        const intIn = getInt(model$0027_1.PopupDialogData) | 0;
        if (intIn < 2) {
            return true;
        }
        else {
            return intIn > Constants_maxSplitMergeBranches;
        }
    };
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createSplitNPopup(model, dispatch) {
    const title = "Add N output split";
    const beforeInt = (_arg) => "How many outputs should the split component have?";
    const numInputsDefault = 2;
    const body = dialogPopupBodyNInts(beforeInt, numInputsDefault, 1, Constants_maxSplitMergeBranches, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const outputInt = getInt(dialogData) | 0;
        const outputWidthList = getIntList(dialogData, numInputsDefault, 1);
        const outputLSBList = getIntList2(dialogData, numInputsDefault, 0);
        createCompStdLabel(new ComponentType(30, [outputInt, outputWidthList, outputLSBList]), model, dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => {
        const intIn = getInt(model$0027_1.PopupDialogData) | 0;
        if (intIn < 2) {
            return true;
        }
        else {
            return intIn > Constants_maxSplitMergeBranches;
        }
    };
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createNbitsAdderPopup(model, dispatch) {
    const title = toText(printf("Add N bits adder"));
    const beforeInt = (_arg) => "How many bits should each operand have?";
    const intDefault = model.LastUsedDialogWidth | 0;
    const body = dialogPopupBodyOnlyInt(beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputInt = getInt(dialogData) | 0;
        createCompStdLabel(new ComponentType(17, [inputInt]), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, inputInt, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState), dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => (getInt(model$0027_1.PopupDialogData) < 1);
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createNbitsXorPopup(model, dispatch) {
    const title = toText(printf("Add N bits XOR gates"));
    const beforeInt = (_arg) => "How many bits should each operand have?";
    const intDefault = model.LastUsedDialogWidth | 0;
    const body = dialogPopupBodyOnlyInt(beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputInt = getInt(dialogData) | 0;
        createCompStdLabel(new ComponentType(21, [inputInt, void 0]), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, inputInt, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState), dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model_1) => (getInt(model_1.PopupDialogData) < 1);
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createNbitsAndPopup(model, dispatch) {
    const title = toText(printf("Add N bits AND gates"));
    const beforeInt = (_arg) => "How many bits should each operand have?";
    const intDefault = model.LastUsedDialogWidth | 0;
    const body = dialogPopupBodyOnlyInt(beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputInt = getInt(dialogData) | 0;
        createCompStdLabel(new ComponentType(22, [inputInt]), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, inputInt, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState), dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => (getInt(model$0027_1.PopupDialogData) < 1);
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createNbitsOrPopup(model, dispatch) {
    const title = toText(printf("Add N bits OR gates"));
    const beforeInt = (_arg) => "How many bits should each operand have?";
    const intDefault = model.LastUsedDialogWidth | 0;
    const body = dialogPopupBodyOnlyInt(beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputInt = getInt(dialogData) | 0;
        createCompStdLabel(new ComponentType(24, [inputInt]), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, inputInt, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState), dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => (getInt(model$0027_1.PopupDialogData) < 1);
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createNbitsNotPopup(model, dispatch) {
    const title = toText(printf("Add N bits NOT gates"));
    const beforeInt = (_arg) => "How many bits should the input/output have?";
    const intDefault = model.LastUsedDialogWidth | 0;
    const body = dialogPopupBodyOnlyInt(beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputInt = getInt(dialogData) | 0;
        createCompStdLabel(new ComponentType(23, [inputInt]), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, inputInt, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState), dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => (getInt(model$0027_1.PopupDialogData) < 1);
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createNbitSpreaderPopup(model, dispatch) {
    const title = toText(printf("Add 1-to-N bit spreader"));
    const beforeInt = (_arg) => "How many bits should the output bus contain?";
    const intDefault = model.LastUsedDialogWidth | 0;
    const body = dialogPopupBodyOnlyInt(beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputInt = getInt(dialogData) | 0;
        createCompStdLabel(new ComponentType(25, [inputInt]), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, inputInt, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState), dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => (getInt(model.PopupDialogData) < 1);
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createSplitWirePopup(model, dispatch) {
    const title = toText(printf("Add SplitWire node"));
    const beforeInt = (_arg) => {
        const s = "How many bits should go to the top (LSB) wire? The remaining bits will go to the bottom (MSB) wire. Use Edit -> Flip Vertically after placing component to swap top and bottom";
        return s;
    };
    const intDefault = 1;
    const body = dialogPopupBodyOnlyInt(beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputInt = getInt(dialogData) | 0;
        createCompStdLabel(new ComponentType(28, [inputInt]), model, dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => (getInt(model$0027_1.PopupDialogData) < 1);
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function twoErrorLines(errMsg1, errMsg2) {
    const props_4 = [["style", {
        color: new HighLightColor(0, []),
    }]];
    const children = [errMsg1, react_1.createElement("br", {}), errMsg2, react_1.createElement("br", {})];
    return react_1.createElement("span", keyValueList(props_4, 1), ...children);
}

function constantValueMessage(w, cVal) {
    const mask = (w === 64) ? (18446744073709551615n) : toUInt64(op_Subtraction(toUInt64(op_LeftShift(1n, w)), 1n));
    const uVal = toUInt64(op_BitwiseAnd(toUInt64(fromInt64(cVal)), mask));
    const sVal = toInt64(op_RightShift(toInt64(op_LeftShift(toInt64(fromUInt64(uVal)), 64 - w)), 64 - w));
    const hVal = fillHex64(w)(toInt64(fromUInt64(uVal)));
    const line1 = toText(interpolate("Decimal value: %d%P() (%d%P() signed)", [uVal, sVal]));
    const line2 = `Hex value: ${hVal}`;
    const children = [line1, react_1.createElement("br", {}), line2, react_1.createElement("br", {})];
    return react_1.createElement("span", {}, ...children);
}

function busCompareValueMessage(w, cVal) {
    const mask = (w === 32) ? 4294967295 : (((1 << w) >>> 0) - 1);
    const uVal = (cVal & mask) >>> 0;
    const sVal = ((~~uVal << (32 - w)) >> (32 - w)) | 0;
    const hVal = hex(~~uVal);
    const line1 = toText(interpolate("Decimal value: %d%P() (%d%P() signed)", [uVal, sVal]));
    const line2 = `Hex value: ${hVal}`;
    const children = [line1, react_1.createElement("br", {}), line2, react_1.createElement("br", {})];
    return react_1.createElement("span", {}, ...children);
}

/**
 * check constant parameters and return two react lines with
 * error message or value details
 */
export function parseConstant(wMax, w, cText) {
    if ((w < 1) ? true : (w > wMax)) {
        return [twoErrorLines(`Constant width must be in the range 1..${wMax}`, ""), void 0];
    }
    else {
        const matchValue = strToIntCheckWidth(w, cText);
        if (matchValue.tag === 1) {
            const msg = matchValue.fields[0];
            return [twoErrorLines(msg, ""), void 0];
        }
        else {
            const n = matchValue.fields[0];
            return [constantValueMessage(w, n), new ComponentType(7, [w, n, cText])];
        }
    }
}

export function parseBusCompareValue(wMax, w, cText) {
    if ((w < 1) ? true : (w > wMax)) {
        return [twoErrorLines(`Bus Compare width must be in the range 1..${wMax}`, ""), void 0];
    }
    else {
        const matchValue = strToIntCheckWidth(w, cText);
        if (matchValue.tag === 1) {
            const msg = matchValue.fields[0];
            return [twoErrorLines(msg, ""), void 0];
        }
        else {
            const n = matchValue.fields[0];
            let n$0027;
            if (compare(n, toInt64(fromInt32(0))) >= 0) {
                n$0027 = (toUInt32(n) >>> 0);
            }
            else {
                const mask = (w === 32) ? 4294967295 : (((1 << w) >>> 0) - 1);
                const uVal = ((toUInt32(n) >>> 0) & mask) >>> 0;
                n$0027 = uVal;
            }
            return [busCompareValueMessage(w, toUInt32(n) >>> 0), new ComponentType(5, [w, n$0027, cText])];
        }
    }
}

function createConstantPopup(model, dispatch) {
    const title = toText(printf("Add Constant"));
    const beforeInt = (_arg) => "How many bits has the wire carrying the constant?";
    const intDefault = 1;
    const parseConstantDialog = (model$0027) => {
        const dialog = model$0027.PopupDialogData;
        return parseConstant(64, defaultArg(dialog.Int, intDefault), defaultArg(dialog.Text, ""));
    };
    const beforeText = (d) => {
        const children = [parseConstantDialog(d)[0], react_1.createElement("br", {})];
        return react_1.createElement("div", {}, ...children);
    };
    const placeholder = "Value: decimal, 0x... hex, 0b... binary";
    const body = dialogPopupBodyIntAndText(beforeText, placeholder, beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model_1) => {
        const dialogData = model_1.PopupDialogData;
        const width = getInt(dialogData) | 0;
        const text = defaultArg(dialogData.Text, "");
        let constant;
        const matchValue = strToIntCheckWidth(width, text);
        if (matchValue.tag === 1) {
            constant = (0n);
        }
        else {
            const n = matchValue.fields[0];
            constant = n;
        }
        const text$0027 = (text === "") ? "0" : text;
        createCompStdLabel(new ComponentType(7, [width, constant, text$0027]), model_1, dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (arg_1) => (parseConstantDialog(arg_1)[1] == null);
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createBusSelectPopup(model, dispatch) {
    const title = toText(printf("Add Bus Selection node"));
    const beforeInt2 = (_arg) => "Which input bit is the least significant output bit?";
    const beforeInt = (_arg_1) => "How many bits width is the output bus?";
    const intDefault = 1;
    const intDefault2 = 0n;
    const body = dialogPopupBodyTwoInts(beforeInt, beforeInt2, intDefault, toInt64(fromInt64(intDefault2)), "60px", dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const width = getInt(dialogData) | 0;
        const lsb = ~~toInt32(getInt2(dialogData)) | 0;
        createCompStdLabel(new ComponentType(6, [width, lsb]), model, dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => {
        if (getInt(model$0027_1.PopupDialogData) < 1) {
            return true;
        }
        else {
            return compare(getInt2(model$0027_1.PopupDialogData), 0n) < 0;
        }
    };
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createBusComparePopup(model, dispatch) {
    const title = toText(printf("Add Bus Compare node"));
    const beforeInt = (_arg) => "How many bits width is the input bus?";
    const intDefault = 1;
    const parseBusCompDialog = (model$0027) => {
        const dialog = model$0027.PopupDialogData;
        return parseBusCompareValue(32, defaultArg(dialog.Int, intDefault), defaultArg(dialog.Text, ""));
    };
    const beforeText = (d) => {
        const children = [parseBusCompDialog(d)[0], react_1.createElement("br", {})];
        return react_1.createElement("div", {}, ...children);
    };
    const placeholder = "Value: decimal, 0x... hex, 0b... binary";
    const body = dialogPopupBodyIntAndText(beforeText, placeholder, beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027_1) => {
        const dialogData = model$0027_1.PopupDialogData;
        const width = getInt(dialogData) | 0;
        const text = defaultArg(dialogData.Text, "");
        let constant;
        const matchValue = strToIntCheckWidth(width, text);
        if (matchValue.tag === 1) {
            constant = 0;
        }
        else {
            const n = matchValue.fields[0];
            if (compare(n, toInt64(fromInt32(0))) >= 0) {
                constant = (toUInt32(n) >>> 0);
            }
            else {
                const mask = (width === 32) ? 4294967295 : (((1 << width) >>> 0) - 1);
                const uVal = ((toUInt32(n) >>> 0) & mask) >>> 0;
                constant = uVal;
            }
        }
        const text$0027 = (text === "") ? "0" : text;
        createCompStdLabel(new ComponentType(5, [width, constant, text$0027]), model, dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (arg_1) => (parseBusCompDialog(arg_1)[1] == null);
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createRegisterPopup(regType, model, dispatch) {
    const title = toText(printf("Add Register"));
    const beforeInt = (_arg) => "How wide should the register be (in bits)?";
    const intDefault = model.LastUsedDialogWidth | 0;
    const body = dialogPopupBodyOnlyInt(beforeInt, intDefault, dispatch);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const inputInt = getInt(dialogData) | 0;
        createCompStdLabel(regType(inputInt), model, dispatch);
        dispatch(new Msg(41, []));
    };
    const isDisabled = (model$0027_1) => (getInt(model$0027_1.PopupDialogData) < 1);
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

function createMemoryPopup(memType, model, dispatch) {
    const title = "Create memory";
    const intDefault = model.LastUsedDialogWidth | 0;
    const addError = (errorOpt, memSetup) => {
        if (memSetup != null) {
            const n2 = memSetup[1] | 0;
            const n1 = memSetup[0] | 0;
            const mem = memSetup[2];
            return [n1, n2, mem, errorOpt];
        }
        else {
            return void 0;
        }
    };
    const body = (model_1) => dialogPopupBodyMemorySetup(intDefault, dispatch, model_1);
    const buttonText = "Add";
    const buttonAction = (model$0027) => {
        const dialogData = model$0027.PopupDialogData;
        const patternInput = getMemorySetup(dialogData, intDefault);
        const wordWidth = patternInput[1] | 0;
        const source = patternInput[2];
        const msgOpt = patternInput[3];
        const addressWidth = patternInput[0] | 0;
        const initMem = new Memory1(source, addressWidth, wordWidth, empty_1({
            Compare: compare,
        }));
        const memory = initialiseMem(initMem, dialogData.ProjectPath);
        if (memory.tag === 1) {
            const mess = memory.fields[0];
            dispatch(new Msg(52, [addError(mess, dialogData.MemorySetup)]));
        }
        else {
            const mem_1 = memory.fields[0];
            createCompStdLabel(memType(mem_1), model, dispatch);
            dispatch(new Msg(41, []));
        }
    };
    const isDisabled = (model$0027_1) => {
        let e, msg;
        const dialogData_1 = model$0027_1.PopupDialogData;
        const patternInput_1 = getMemorySetup(dialogData_1, 1);
        const wordWidth_1 = patternInput_1[1] | 0;
        const source_1 = patternInput_1[2];
        const addressWidth_1 = patternInput_1[0] | 0;
        let error;
        const matchValue = dialogData_1.MemorySetup;
        let matchResult;
        if (matchValue == null) {
            matchResult = 1;
        }
        else {
            switch (matchValue[2].tag) {
                case 3: {
                    matchResult = 0;
                    break;
                }
                case 5:
                case 4: {
                    matchResult = 2;
                    break;
                }
                default:
                    matchResult = 3;
            }
        }
        switch (matchResult) {
            case 0: {
                error = "File name must be alphanumeric without prefix";
                break;
            }
            case 1: {
                error = "";
                break;
            }
            case 2: {
                error = (((addressWidth_1 % 2) !== 0) ? "The address width must be even for a multiplier" : ((addressWidth_1 > 16) ? "The maximum multiplier size is 8X8 - 16 address bits" : void 0));
                break;
            }
            default:
                error = void 0;
        }
        let matchResult_1, msg_1;
        if (error != null) {
            if ((msg = error, msg !== "")) {
                matchResult_1 = 0;
                msg_1 = error;
            }
            else {
                matchResult_1 = 1;
            }
        }
        else {
            matchResult_1 = 1;
        }
        switch (matchResult_1) {
            case 0: {
                const matchValue_1 = dialogData_1.MemorySetup;
                let matchResult_2, e_1;
                if (matchValue_1 != null) {
                    if ((e = matchValue_1[3], equals(e, msg_1))) {
                        matchResult_2 = 0;
                        e_1 = matchValue_1[3];
                    }
                    else {
                        matchResult_2 = 1;
                    }
                }
                else {
                    matchResult_2 = 1;
                }
                switch (matchResult_2) {
                    case 1: {
                        dispatch(new Msg(52, [addError(msg_1, dialogData_1.MemorySetup)]));
                        break;
                    }
                }
                break;
            }
        }
        if ((addressWidth_1 < 1) ? true : (wordWidth_1 < 1)) {
            return true;
        }
        else {
            return !equals(error, void 0);
        }
    };
    dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
}

export function createVerilogPopup(model, showExtraErrors, correctedCode, moduleName, origin, dispatch) {
    const title = toText(printf("Create Combinational Logic Components using Verilog"));
    const beforeText = (_arg) => toText(printf("ISSIE Component Name"));
    const noErrors = isEmpty(model.PopupDialogData.VerilogErrors);
    const errorDiv = noErrors ? defaultOf() : getErrorDiv(model.PopupDialogData.VerilogErrors);
    const errorList = showExtraErrors ? model.PopupDialogData.VerilogErrors : empty();
    const saveButtonAction = (dialogData) => {
        const matchValue = model.CurrentProj;
        if (matchValue != null) {
            const project = matchValue;
            const name = value_1(moduleName);
            const folderPath = project.ProjectPath;
            const path = pathJoin([folderPath, name + ".v"]);
            const path2 = pathJoin([folderPath, name + ".dgm"]);
            const code = getCode(dialogData);
            const matchValue_1 = writeFile(path, code);
            if (matchValue_1.tag === 1) {
                toFail(printf("Writing verilog file FAILED"));
            }
            const parsedCodeNearley = parseFromFile(code);
            toConsole(`${parsedCodeNearley}`);
            let output;
            const matchValue_2 = SimpleJson_tryParse(parsedCodeNearley);
            if (matchValue_2 != null) {
                const inputJson = matchValue_2;
                const typeInfo = createTypeInfo(ParserOutput_$reflection());
                output = Convert_fromJson(inputJson, typeInfo);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            const result = value_1(output.Result);
            const fixedAST = fix(result);
            toConsole(printf("fixed %A"))(fixedAST);
            let parsedAST;
            const matchValue_3 = SimpleJson_tryParse(fixedAST);
            if (matchValue_3 != null) {
                const inputJson_1 = matchValue_3;
                const typeInfo_1 = createTypeInfo(VerilogInput_$reflection());
                parsedAST = Convert_fromJson(inputJson_1, typeInfo_1);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            const cs = createSheet(parsedAST, project);
            const toSaveCanvasState = JsonHelpers_stateToJsonString(cs, void 0, new SheetInfo(new CCForm(4, [name]), void 0));
            const matchValue_4 = writeFile(path2, toSaveCanvasState);
            if (matchValue_4.tag === 1) {
                toFail(printf("Writing .dgm file FAILED"));
            }
            else {
                let newComponent;
                const matchValue_5 = tryLoadComponentFromPath(path2);
                if (matchValue_5.tag === 1) {
                    newComponent = toFail(printf("failed to load the created Verilog file"));
                }
                else {
                    const comp = matchValue_5.fields[0];
                    newComponent = comp;
                }
                const updatedProject = new Project(project.ProjectPath, project.OpenFileName, project.WorkingFileName, cons(newComponent, project.LoadedComponents));
                openFileInProject(project.OpenFileName, updatedProject, model, dispatch);
            }
        }
        else {
            toFail(printf("What? current project cannot be None at this point in writing Verilog Component"));
        }
        dispatch(new Msg(41, []));
    };
    const updateButton = (dialogData_1) => {
        const matchValue_6 = model.CurrentProj;
        if (matchValue_6 != null) {
            const project_1 = matchValue_6;
            const name_1 = value_1(moduleName);
            const folderPath_1 = project_1.ProjectPath;
            const path_1 = pathJoin([folderPath_1, name_1 + ".v"]);
            const code_1 = getCode(dialogData_1);
            const matchValue_7 = writeFile(path_1, code_1);
            if (matchValue_7.tag === 1) {
                toFail(printf("Writing verilog file FAILED"));
            }
            const parsedCodeNearley_1 = parseFromFile(code_1);
            let output_1;
            const matchValue_8 = SimpleJson_tryParse(parsedCodeNearley_1);
            if (matchValue_8 != null) {
                const inputJson_2 = matchValue_8;
                const typeInfo_2 = createTypeInfo(ParserOutput_$reflection());
                output_1 = Convert_fromJson(inputJson_2, typeInfo_2);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            const result_1 = value_1(output_1.Result);
            const fixedAST_1 = fix(result_1);
            let parsedAST_1;
            const matchValue_9 = SimpleJson_tryParse(fixedAST_1);
            if (matchValue_9 != null) {
                const inputJson_3 = matchValue_9;
                const typeInfo_3 = createTypeInfo(VerilogInput_$reflection());
                parsedAST_1 = Convert_fromJson(inputJson_3, typeInfo_3);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            const newCS = createSheet(parsedAST_1, project_1);
            dispatch(new Msg(82, [new UICommandType(6, [])]));
            updateVerilogFileActionWithModelUpdate(newCS[0], newCS[1], name_1, model, dispatch);
            dispatch(new Msg(1, [new SheetT_Msg(14, [])]));
        }
        else {
            toFail(printf("What? current project cannot be None at this point in writing Verilog Component"));
        }
    };
    const compile = (dialogData_2) => {
        const matchValue_10 = model.CurrentProj;
        if (matchValue_10 != null) {
            const project_2 = matchValue_10;
            const code_2 = getCode(dialogData_2);
            const parsedCodeNearley_2 = parseFromFile(code_2);
            let output_2;
            const matchValue_11 = SimpleJson_tryParse(parsedCodeNearley_2);
            if (matchValue_11 != null) {
                const inputJson_4 = matchValue_11;
                const typeInfo_4 = createTypeInfo(ParserOutput_$reflection());
                output_2 = Convert_fromJson(inputJson_4, typeInfo_4);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            if (output_2.Error == null) {
                if (output_2.Result == null) {
                }
                else {
                    const result_2 = value_1(output_2.Result);
                    const fixedAST_2 = fix(result_2);
                    const linesIndex = ofArray(value_1(output_2.NewLinesIndex));
                    let parsedAST_2;
                    const matchValue_13 = SimpleJson_tryParse(fixedAST_2);
                    if (matchValue_13 != null) {
                        const inputJson_5 = matchValue_13;
                        const typeInfo_5 = createTypeInfo(VerilogInput_$reflection());
                        parsedAST_2 = Convert_fromJson(inputJson_5, typeInfo_5);
                    }
                    else {
                        throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
                    }
                    const moduleName_1 = parsedAST_2.Module.ModuleName.Name;
                    const errorList_1 = getSemanticErrors(parsedAST_2, linesIndex, origin, project_2);
                    const dataUpdated = new PopupDialogData(dialogData_2.Text, dialogData_2.Int, dialogData_2.ImportDecisions, dialogData_2.Int2, dialogData_2.ProjectPath, dialogData_2.MemorySetup, dialogData_2.MemoryEditorData, dialogData_2.Progress, dialogData_2.ConstraintTypeSel, dialogData_2.ConstraintIOSel, dialogData_2.ConstraintErrorMsg, dialogData_2.NewConstraint, dialogData_2.AlgebraInputs, dialogData_2.AlgebraError, code_2, errorList_1, dialogData_2.BadLabel, dialogData_2.IntList, dialogData_2.IntList2);
                    const showErrors$0027 = isEmpty(errorList_1) ? showExtraErrors : showExtraErrors;
                    createVerilogPopup(new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, dataUpdated, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState), showErrors$0027, void 0, moduleName_1, origin, dispatch);
                }
            }
            else {
                const error = value_1(output_2.Error);
                const error$0027 = getSyntaxErrorInfo(error);
                const dataUpdated_1 = new PopupDialogData(dialogData_2.Text, dialogData_2.Int, dialogData_2.ImportDecisions, dialogData_2.Int2, dialogData_2.ProjectPath, dialogData_2.MemorySetup, dialogData_2.MemoryEditorData, dialogData_2.Progress, dialogData_2.ConstraintTypeSel, dialogData_2.ConstraintIOSel, dialogData_2.ConstraintErrorMsg, dialogData_2.NewConstraint, dialogData_2.AlgebraInputs, dialogData_2.AlgebraError, dialogData_2.VerilogCode, singleton(error$0027), dialogData_2.BadLabel, dialogData_2.IntList, dialogData_2.IntList2);
                createVerilogPopup(new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, dataUpdated_1, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState), showExtraErrors, void 0, moduleName, origin, dispatch);
            }
        }
        else {
            toFail(printf("What? current project cannot be None at this point in compiling Verilog Component"));
        }
    };
    const addButton = (dialogData_3, tupledArg) => {
        const suggestion = tupledArg[0];
        const replaceType = tupledArg[1];
        const line = tupledArg[2] | 0;
        const col = tupledArg[3] | 0;
        const findLastIOAndAssignment = (oldCode) => {
            const isSmallerThan = (x, y) => (compare_1(y, x) <= 0);
            const parsedCodeNearley_3 = parseFromFile(oldCode);
            let output_3;
            const matchValue_15 = SimpleJson_tryParse(parsedCodeNearley_3);
            if (matchValue_15 != null) {
                const inputJson_6 = matchValue_15;
                const typeInfo_6 = createTypeInfo(ParserOutput_$reflection());
                output_3 = Convert_fromJson(inputJson_6, typeInfo_6);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            const result_3 = value_1(output_3.Result);
            const fixedAST_3 = fix(result_3);
            const linesIndex_1 = ofArray(value_1(output_3.NewLinesIndex));
            let parsedAST_3;
            const matchValue_16 = SimpleJson_tryParse(fixedAST_3);
            if (matchValue_16 != null) {
                const inputJson_7 = matchValue_16;
                const typeInfo_7 = createTypeInfo(VerilogInput_$reflection());
                parsedAST_3 = Convert_fromJson(inputJson_7, typeInfo_7);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            const ioDecls = parsedAST_3.Module.ModuleItems.ItemList.filter((item) => (item.IODecl != null));
            const lastIODecl = tryLast(ioDecls);
            let lastIOLocation;
            if (lastIODecl == null) {
                lastIOLocation = 1;
            }
            else {
                const d = lastIODecl;
                lastIOLocation = d.Location;
            }
            const prevIndexIO = findIndexBack((x_1) => isSmallerThan(lastIOLocation, x_1), linesIndex_1) | 0;
            const assignments = parsedAST_3.Module.ModuleItems.ItemList.filter((item_1) => (item_1.Statement != null));
            const lastAssignment = tryLast(assignments);
            let lastAssignmentLocation;
            if (lastAssignment == null) {
                lastAssignmentLocation = lastIOLocation;
            }
            else {
                const d_1 = lastAssignment;
                lastAssignmentLocation = d_1.Location;
            }
            const prevIndexA = findIndexBack((x_2) => isSmallerThan(lastAssignmentLocation, x_2), linesIndex_1) | 0;
            return [prevIndexIO, prevIndexA];
        };
        const replaceSubstringAtLocation = (originalString, replacement, startIndex, length) => {
            const prefix = originalString.slice(void 0, (startIndex - 1) + 1);
            const suffix = originalString.slice(startIndex + length, originalString.length);
            return (prefix + replacement) + suffix;
        };
        const putToCorrectPlace = (oldCode_1, suggestion_1, replaceType_1, line_1) => {
            const sepCode = split(oldCode_1, ["\n"], void 0, 1);
            const linesList = toList(sepCode);
            switch (replaceType_1.tag) {
                case 2: {
                    const error_1 = replaceType_1.fields[0];
                    const untilError_1 = fold((s_4, v_2) => {
                        if (v_2 === 1) {
                            return item_2(v_2 - 1, linesList);
                        }
                        else {
                            return (s_4 + "\n") + item_2(v_2 - 1, linesList);
                        }
                    }, "", toList(rangeDouble(1, 1, line_1 - 1)));
                    const fixedLine = replaceSubstringAtLocation(item_2(line_1 - 1, linesList), suggestion_1, col - 1, error_1.length);
                    toConsole(`fixed: ${fixedLine}`);
                    const fixedError_1 = (line_1 === 1) ? fixedLine : ((untilError_1 + "\n") + fixedLine);
                    return fold((s_5, v_3) => ((s_5 + "\n") + item_2(v_3, linesList)), fixedError_1, toList(rangeDouble(line_1, 1, length_1(linesList) - 1)));
                }
                case 3:
                    return oldCode_1;
                default: {
                    const untilError = fold((s_2, v) => ((s_2 + "\n") + item_2(v - 1, linesList)), item_2(0, linesList), toList(rangeDouble(2, 1, line_1 + 1)));
                    const fixedError = (untilError + "\n  ") + suggestion_1;
                    return fold((s_3, v_1) => ((s_3 + "\n") + item_2(v_1, linesList)), fixedError, toList(rangeDouble(line_1 + 1, 1, length_1(linesList) - 1)));
                }
            }
        };
        const lineToPut = ((replaceType.tag === 0) ? findLastIOAndAssignment(defaultArg(dialogData_3.VerilogCode, ""))[0] : ((replaceType.tag === 1) ? findLastIOAndAssignment(defaultArg(dialogData_3.VerilogCode, ""))[1] : line)) | 0;
        const replacedCode = putToCorrectPlace(defaultArg(dialogData_3.VerilogCode, ""), suggestion, replaceType, lineToPut);
        createVerilogPopup(model, showExtraErrors, replacedCode, moduleName, origin, dispatch);
    };
    const moreInfoButton = (dialogData_4) => {
        const matchValue_17 = model.CurrentProj;
        if (matchValue_17 != null) {
            const project_3 = matchValue_17;
            const errors = dialogData_4.VerilogErrors;
            createVerilogPopup(model, !showExtraErrors, void 0, moduleName, origin, dispatch);
        }
        else {
            toFail(printf("What? current project cannot be None at this point in compiling Verilog Component"));
        }
    };
    const body = (model_1) => dialogVerilogCompBody(beforeText, moduleName, errorDiv, errorList, showExtraErrors, correctedCode, compile, addButton, dispatch, model_1);
    const isDisabled = (dialogData_5) => !noErrors;
    const extra = showExtraErrors ? ofArray([new CSSProp(395, ["80%"]), new CSSProp(189, ["75%"]), new CSSProp(271, ["hidden"]), new CSSProp(291, ["fixed"])]) : ofArray([new CSSProp(395, ["50%"]), new CSSProp(189, ["75%"]), new CSSProp(271, ["hidden"]), new CSSProp(291, ["fixed"])]);
    const saveUpdateText = (origin.tag === 1) ? "Update" : "Save";
    const saveUpdateButton = (origin.tag === 1) ? updateButton : saveButtonAction;
    dialogVerilogPopup(title, body, saveUpdateText, noErrors, showExtraErrors, saveUpdateButton, moreInfoButton, isDisabled, extra, dispatch);
}

function makeMenuGroup(title, menuList) {
    const children_2 = [react_1.createElement("summary", keyValueList([menuLabelStyle], 1), title), list_4(empty(), menuList)];
    return react_1.createElement("details", {
        open: false,
    }, ...children_2);
}

export let firstTip = createAtom(true);

export let tippyNodes = createAtom(empty());

function makeMenuGroupWithTip(styles, title, tip, menuList) {
    const props_2 = [new HTMLAttr(125, [false]), new HTMLAttr(64, [`${"tooltip"} ${"has-tooltip-multiline"}`]), dataTooltip(tip), ["style", keyValueList(styles, 1)]];
    const children_2 = [react_1.createElement("summary", keyValueList([menuLabelStyle], 1), title), list_4(empty(), menuList)];
    return react_1.createElement("details", keyValueList(props_2, 1), ...children_2);
}

export function compareModelsApprox(m1, m2) {
    const m1r = reduceApprox(m1);
    const m2r = reduceApprox(m2);
    const b = equals(m1r, m2r);
    return b;
}

export function viewCatalogue(model, dispatch) {
    const muxTipMessage = (numBusses) => (`Selects the one of its ${numBusses} input busses numbered by the value of the select input 
                                to be the output. Adjusts bus width to match`);
    const deMuxTipMessage = (numBits) => (`The output numbered by the binary value 
        of the ${numBits} sel inputs is equal to Data, the others are 0`);
    const viewCatOfModel = (model_1) => {
        const styles = (model_1.Sheet.Action.tag === 13) ? singleton(new CSSProp(123, ["grabbing"])) : empty();
        const catTip1 = (name, func, tip) => {
            const react = menuItem(styles, name, func);
            const props = [new HTMLAttr(64, [`${"tooltip"} ${"has-tooltip-multiline"}`]), dataTooltip(tip), ["style", keyValueList(styles, 1)]];
            return react_1.createElement("div", keyValueList(props, 1), react);
        };
        return menu(singleton(new Common_GenericOption(1, [ofArray([new HTMLAttr(65, ["py-1"]), ["style", keyValueList(styles, 1)]])])), ofArray([makeMenuGroup("Input / Output", ofArray([catTip1("Input", (_arg) => {
            createInputPopup("input", (tupledArg) => (new ComponentType(0, [tupledArg[0], tupledArg[1]])), model_1, dispatch);
        }, "Input connection to current sheet: one or more bits"), catTip1("Output", (_arg_1) => {
            createIOPopup(true, "output", (arg_2) => (new ComponentType(1, [arg_2])), model_1, dispatch);
        }, "Output connection from current sheet: one or more bits"), catTip1("Viewer", (_arg_2) => {
            createIOPopup(true, "viewer", (arg_3) => (new ComponentType(2, [arg_3])), model_1, dispatch);
        }, "Viewer to expose value in step simulation: works in subsheets. Can also be used to terminate an unused output."), catTip1("Constant", (_arg_3) => {
            createConstantPopup(model_1, dispatch);
        }, "Define a one or more bit constant value of specified width, e.g. 0 or 1, to drive an input. Values can be written in hex, decimal, or binary."), catTip1("Wire Label", (_arg_4) => {
            createIOPopup(false, "label", (_arg_5) => (new ComponentType(3, [])), model_1, dispatch);
        }, "Labels with the same name connect together wires within a sheet. Each set of labels muts have exactly one driving input. A label can also be used to terminate an unused output"), catTip1("Not Connected", (_arg_6) => {
            createComponent(new ComponentType(4, []), "", model_1, dispatch);
        }, "Not connected component to terminate unused output.")])), makeMenuGroup("Buses", ofArray([catTip1("MergeWires", (_arg_7) => {
            createComponent(new ComponentType(27, []), "", model_1, dispatch);
        }, "Use Mergewires when you want to join the bits of a two busses to make a wider bus. Default has LS bits connected to top arm. Use Edit -> Flip Vertically after placing component to change this."), catTip1("MergeN", (_arg_8) => {
            createMergeNPopup(model_1, dispatch);
        }, `Use MergeN when you want to join the bits of between 2 and ${Constants_maxSplitMergeBranches} busses to make a wider bus.`), catTip1("SplitWire", (_arg_9) => {
            createSplitWirePopup(model_1, dispatch);
        }, "Use Splitwire when you want to split the bits of a bus into two sets. Default has LS bits connected to top arm. Use Edit -> Flip Vertically after placing component to change this."), catTip1("SplitN", (_arg_10) => {
            createSplitNPopup(model_1, dispatch);
        }, `Use SplitN when you want to split between 2 and ${Constants_maxSplitMergeBranches} separate fields from a bus.`), catTip1("Bus Select", (_arg_11) => {
            createBusSelectPopup(model_1, dispatch);
        }, "Bus Select output connects to one or more selected bits of its input"), catTip1("Bus Compare", (_arg_12) => {
            createBusComparePopup(model_1, dispatch);
        }, "Bus compare outputs 1 if the input bus matches a constant value as written in decimal, hex, or binary."), catTip1("N bits spreader", (_arg_13) => {
            createNbitSpreaderPopup(model_1, dispatch);
        }, "Replicates a 1 bit input onto all N bits of an output bus")])), makeMenuGroup("Gates", ofArray([catTip1("Not", (_arg_14) => {
            createCompStdLabel(new ComponentType(8, []), model_1, dispatch);
        }, "Invertor: output is negation of input"), catTip1("And", (_arg_15) => {
            createCompStdLabel(new ComponentType(10, ["and", 2]), model_1, dispatch);
        }, "Output is 1 if all the inputs are 1. Use Properties to add more inputs"), catTip1("Or", (_arg_16) => {
            createCompStdLabel(new ComponentType(10, ["or", 2]), model_1, dispatch);
        }, "Output is 1 if any of the inputs are 1. Use Properties to add more inputs"), catTip1("Xor", (_arg_17) => {
            createCompStdLabel(new ComponentType(10, ["xor", 2]), model_1, dispatch);
        }, "Output is 1 if an odd number of inputs are 1. Use Properties to add more inputs"), catTip1("Nand", (_arg_18) => {
            createCompStdLabel(new ComponentType(10, ["nand", 2]), model_1, dispatch);
        }, "Output is 0 if all the inputs are 1. Use Properties to add more inputs"), catTip1("Nor", (_arg_19) => {
            createCompStdLabel(new ComponentType(10, ["nor", 2]), model_1, dispatch);
        }, "Output is 0 if any of the inputs are 1. Use Properties to add more inputs"), catTip1("Xnor", (_arg_20) => {
            createCompStdLabel(new ComponentType(10, ["xnor", 2]), model_1, dispatch);
        }, "Output is 1 if an even number of inputs are 1. Use Properties to add more inputs")])), makeMenuGroup("Mux / Demux", ofArray([catTip1("2-Mux", (_arg_21) => {
            createCompStdLabel(new ComponentType(11, []), model_1, dispatch);
        }, muxTipMessage("two")), catTip1("4-Mux", (_arg_22) => {
            createCompStdLabel(new ComponentType(12, []), model_1, dispatch);
        }, muxTipMessage("four")), catTip1("8-Mux", (_arg_23) => {
            createCompStdLabel(new ComponentType(13, []), model_1, dispatch);
        }, muxTipMessage("eight")), catTip1("2-Demux", (_arg_24) => {
            createCompStdLabel(new ComponentType(14, []), model_1, dispatch);
        }, deMuxTipMessage("two")), catTip1("4-Demux", (_arg_25) => {
            createCompStdLabel(new ComponentType(15, []), model_1, dispatch);
        }, deMuxTipMessage("four")), catTip1("8-Demux", (_arg_26) => {
            createCompStdLabel(new ComponentType(16, []), model_1, dispatch);
        }, deMuxTipMessage("eight"))])), makeMenuGroup("Arithmetic", ofArray([catTip1("N bits adder", (_arg_27) => {
            createNbitsAdderPopup(model_1, dispatch);
        }, "N bit Binary adder with carry in to bit 0 and carry out from bit N-1"), catTip1("N bits XOR", (_arg_28) => {
            createNbitsXorPopup(model_1, dispatch);
        }, "N bit XOR gates - use to make subtractor or comparator"), catTip1("N bits AND", (_arg_29) => {
            createNbitsAndPopup(model_1, dispatch);
        }, "N bit AND gates"), catTip1("N bits OR", (_arg_30) => {
            createNbitsOrPopup(model_1, dispatch);
        }, "N bit OR gates"), catTip1("N bits NOT", (_arg_31) => {
            createNbitsNotPopup(model_1, dispatch);
        }, "N bit NOT gates")])), makeMenuGroup("Flip Flops and Registers", ofArray([catTip1("D-flip-flop", (_arg_32) => {
            createCompStdLabel(new ComponentType(31, []), model_1, dispatch);
        }, "D flip-flop - note that clock is assumed always connected to a global clock, so ripple counters cannot be implemented in Issie"), catTip1("D-flip-flop with enable", (_arg_33) => {
            createCompStdLabel(new ComponentType(32, []), model_1, dispatch);
        }, "D flip-flop: output will remain unchanged when En is 0"), catTip1("Register", (_arg_34) => {
            createRegisterPopup((arg_4) => (new ComponentType(33, [arg_4])), model_1, dispatch);
        }, "N D flip-flops with inputs and outputs combined into single N bit busses"), catTip1("Register with enable", (_arg_35) => {
            createRegisterPopup((arg_5) => (new ComponentType(34, [arg_5])), model_1, dispatch);
        }, "As register but outputs stay the same if En is 0"), catTip1("Counter", (_arg_36) => {
            createRegisterPopup((arg_6) => (new ComponentType(35, [arg_6])), model_1, dispatch);
        }, "N-bits counter with customisable enable and load inputs")])), makeMenuGroup("Memories", ofArray([catTip1("ROM (asynchronous)", (_arg_37) => {
            createMemoryPopup((arg_7) => (new ComponentType(39, [arg_7])), model_1, dispatch);
        }, "This is combinational: the output is available in the same clock cycle that the address is presented"), catTip1("ROM (synchronous)", (_arg_38) => {
            createMemoryPopup((arg_8) => (new ComponentType(40, [arg_8])), model_1, dispatch);
        }, "A ROM whose output contains the addressed data in the clock cycle after the address is presented"), catTip1("RAM (synchronous)", (_arg_39) => {
            createMemoryPopup((arg_9) => (new ComponentType(41, [arg_9])), model_1, dispatch);
        }, "A RAM whose output contains the addressed data in the clock cycle after the address is presented"), catTip1("RAM (async read)", (_arg_40) => {
            createMemoryPopup((arg_10) => (new ComponentType(42, [arg_10])), model_1, dispatch);
        }, "A RAM whose output contains the addressed data in the same clock cycle as address is presented")])), makeMenuGroupWithTip(styles, "This project", "Every design sheet is available for use in other sheets as a custom component: it can be added any number of times, each instance replicating the sheet logic", makeCustomList(styles, model_1, dispatch)), makeMenuGroupWithTip(styles, "Verilog", "Write combinational logic in Verilog and use it as a Custom Component. \r\n                         To edit/delete a verilog component add it in a sheet and click on \'properties\'", append(singleton(menuItem(styles, "New Verilog Component", (_arg_41) => {
            createVerilogPopup(model_1, true, void 0, void 0, new CodeEditorOpen(0, []), dispatch);
        })), makeVerilogList(styles, model_1, dispatch)))]));
    };
    return viewCatOfModel(model);
}

//# sourceMappingURL=CatalogueView.fs.js.map
