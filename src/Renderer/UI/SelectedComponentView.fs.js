import { Option as Option_1, div } from "../fable_modules/Fulma.2.16.0/Elements/Form/Field.fs.js";
import { find, filter, head, tail, isEmpty, exists, map as map_1, mapIndexed, mapIndexed2, max, map2, initialize, append, getSlice, length as length_1, ofArray, singleton, empty } from "../fable_modules/fable-library.4.1.4/List.js";
import { Option as Option_2, label as label_1 } from "../fable_modules/Fulma.2.16.0/Elements/Form/Label.fs.js";
import { input } from "../fable_modules/Fulma.2.16.0/Elements/Form/./Input.fs.js";
import { Option, IInputType } from "../fable_modules/Fulma.2.16.0/Elements/Form/Input.fs.js";
import { CSSProp, DOMAttr, HTMLAttr } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { confirmationPopup, preventDefault } from "../DrawBlock/PopupHelpers.fs.js";
import { getInt64EventValue, getFloatEventValue, getIntEventValue, getTextEventValue } from "../Interface/JSHelpers.fs.js";
import * as react from "react";
import { comparePrimitives, defaultOf, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { map, value as value_1, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { toConsole, toFail, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { removeFileWithExtn, tryReadFileSync, pathJoin, openWriteDialogAndWriteMemory, initialiseMem, fileExistsWithExtn } from "../Interface/FilesIO.fs.js";
import { UICommandType, Model, Msg } from "../Model/ModelType.fs.js";
import { HighLightColor, ComponentType, Project, $007CMemory$007C_$007C } from "../Common/CommonTypes.fs.js";
import { Common_GenericOption, Modifier_IModifier, Color_IColor, Size_ISize } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import { makePopupButton, memPropsInfoButton, bSpan } from "./UIPopups.fs.js";
import { fromInt32, toInt64, op_LeftShift, toUInt64 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { Option as Option_3, button } from "../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { openMemoryEditor } from "./MemoryEditorView.fs.js";
import { errorPropsNotification, successPropertiesNotification } from "./Notifications.fs.js";
import { setComponentLabel, formatLabelAsBus, removeFileInProject, saveOpenFileActionWithModelUpdate, makeSourceMenu } from "./MenuHelpers.fs.js";
import { DrawModelType_SheetT_Model__Model_ChangeReversedInputs, DrawModelType_SheetT_Model__Model_ChangeLSB, DrawModelType_SheetT_Model__Model_ChangeInputValue, DrawModelType_SheetT_Model__Model_ChangeSplitN, DrawModelType_SheetT_Model__Model_ChangeMergeN, DrawModelType_SheetT_Model__Model_ChangeGate, DrawModelType_SheetT_Model__Model_ChangeWidth, DrawModelType_SheetT_Model__Model_ChangeScale, DrawModelType_SheetT_Model__Model_ChangeCounterComp, DrawModelType_SheetT_Model__Model_ChangeAdderComp, DrawModelType_SheetT_Model__Model_UpdateMemory } from "../DrawBlock/Sheet.fs.js";
import { createSheetDescriptionPopup, parseBusCompareValue, parseConstant, Constants_maxSplitMergeBranches, Constants_maxGateInputs, createVerilogPopup } from "./CatalogueView.fs.js";
import { CodeEditorOpen } from "../VerilogComponent/VerilogTypes.fs.js";
import { SheetT_KeyboardMsg, SymbolT_Msg, BusWireT_Msg, SheetT_Msg } from "../Model/DrawModelType.fs.js";
import { table as table_1 } from "../fable_modules/Fulma.2.16.0/Elements/Table.fs.js";
import { input as input_1 } from "../fable_modules/Fulma.2.16.0/Elements/Form/Checkbox.fs.js";
import { checkWidth } from "../Simulator/NumberHelpers.fs.js";
import { FSharpMap__get_Item, toList, tryFind } from "../fable_modules/fable-library.4.1.4/Map.js";
import { extractComponent } from "../DrawBlock/SymbolUpdate.fs.js";
import { StringModule_StartsWithLetter, StringModule_Length, StringModule_Concat } from "../Common/EEExtensions.fs.js";
import { singleton as singleton_1, append as append_1, delay, toList as toList_1, indexed, filter as filter_1, map as map_2 } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { isLetterOrDigit } from "../fable_modules/fable-library.4.1.4/Char.js";

export const Constants_labelUniqueMess = "Components must have a unique label within one sheet";

export const Constants_dropDownHeightFraction = 2.5;

function readOnlyFormField(name, body) {
    return div(empty(), ofArray([label_1(empty(), singleton(name)), body]));
}

function textFormField(isRequired, name, defaultValue, isBad, onChange, onDeleteAtEnd) {
    let props_2, children;
    const onDelete = (ev) => {
        if (ev.key === "Delete") {
            const textEl = document.getElementById("labelInputElement");
            const length = textEl.value.length | 0;
            const start = textEl.selectionStart | 0;
            if (length === start) {
                onDeleteAtEnd();
            }
        }
    };
    return div(empty(), ofArray([label_1(empty(), singleton(name)), input(ofArray([new Option(1, [new IInputType(0, [])]), new Option(15, [ofArray([new HTMLAttr(99, ["labelInputElement"]), new DOMAttr(2, [(e) => {
        preventDefault(e);
    }]), new HTMLAttr(148, [false]), new HTMLAttr(123, [name]), ["style", {
        width: "200px",
    }], new DOMAttr(15, [onDelete])])]), new Option(10, [defaultValue]), new Option(16, ["www"]), new Option(12, [isRequired ? "Name (required)" : "Name (optional)"]), new Option(13, [(arg) => {
        onChange(getTextEventValue(arg));
    }])])), react.createElement("br", {}), (props_2 = [["style", {
        fontStyle: "Italic",
        color: "Red",
    }], new HTMLAttr(92, [equals(isBad, void 0)])], (children = [defaultArg(isBad, "")], react.createElement("span", keyValueList(props_2, 1), ...children)))]));
}

function textFormFieldSimple(name, defaultValue, onChange) {
    return div(empty(), ofArray([label_1(empty(), singleton(name)), input(ofArray([new Option(1, [new IInputType(0, [])]), new Option(15, [ofArray([new DOMAttr(2, [(e) => {
        preventDefault(e);
    }]), new HTMLAttr(148, [false]), new HTMLAttr(123, [name]), new HTMLAttr(55, [true]), ["style", {
        width: "200px",
    }]])]), new Option(10, [defaultValue]), new Option(1, [new IInputType(0, [])]), new Option(13, [(arg) => {
        onChange(getTextEventValue(arg));
    }])]))]));
}

function intFormField(name, width, defaultValue, minValue, onChange) {
    return div(empty(), ofArray([label_1(empty(), singleton(name)), input(ofArray([new Option(1, [new IInputType(7, [])]), new Option(15, [ofArray([["style", {
        width: width,
    }], new HTMLAttr(119, [minValue])])]), new Option(10, [toText(printf("%d"))(defaultValue)]), new Option(13, [(arg_2) => {
        onChange(getIntEventValue(arg_2));
    }])]))]));
}

function intFormField2(name, bits, width, defaultValue1, defaultValue2, minValue1, minValue2, onChange1, onChange2) {
    return div(singleton(new Option_1(11, [singleton(["style", {
        display: "flex",
        alignItems: "center",
    }])])), ofArray([label_1(singleton(new Option_2(3, [singleton(["style", {
        width: "115px",
        flex: "0 0 auto",
    }])])), singleton(name)), label_1(singleton(new Option_2(3, [singleton(["style", {
        textAlign: "center",
        width: "50px",
        marginRight: "8px",
    }])])), singleton(bits)), input(ofArray([new Option(1, [new IInputType(7, [])]), new Option(15, [ofArray([["style", {
        width: width,
    }], new HTMLAttr(119, [minValue1])])]), new Option(10, [toText(printf("%d"))(defaultValue1)]), new Option(13, [(arg_2) => {
        onChange1(getIntEventValue(arg_2));
    }])])), input(ofArray([new Option(1, [new IInputType(7, [])]), new Option(15, [ofArray([["style", {
        width: width,
        marginLeft: "15px",
    }], new HTMLAttr(119, [minValue2])])]), new Option(10, [toText(printf("%d"))(defaultValue2)]), new Option(13, [(arg_5) => {
        onChange2(getIntEventValue(arg_5));
    }])])), react.createElement("hr", {})]));
}

function floatFormField(name, width, defaultValue, minValue, onChange) {
    return div(empty(), ofArray([label_1(empty(), singleton(name)), input(ofArray([new Option(1, [new IInputType(7, [])]), new Option(15, [ofArray([["style", {
        width: width,
    }], new HTMLAttr(119, [minValue])])]), new Option(10, [toText(printf("%A"))(defaultValue)]), new Option(13, [(arg_2) => {
        onChange(getFloatEventValue(arg_2));
    }])]))]));
}

function int64FormField(name, width, defaultValue, minValue, onChange) {
    return div(empty(), ofArray([label_1(empty(), singleton(name)), input(ofArray([new Option(1, [new IInputType(7, [])]), new Option(15, [ofArray([["style", {
        width: width,
    }], new HTMLAttr(119, [minValue])])]), new Option(10, [toText(printf("%d"))(defaultValue)]), new Option(13, [(arg_2) => {
        onChange(getInt64EventValue(arg_2));
    }])]))]));
}

function intFormFieldNoMin(name, defaultValue, onChange) {
    return div(empty(), ofArray([label_1(empty(), singleton(name)), input(ofArray([new Option(1, [new IInputType(7, [])]), new Option(15, [singleton(["style", {
        width: "60px",
    }])]), new Option(10, [toText(printf("%d"))(defaultValue)]), new Option(13, [(arg_2) => {
        onChange(getIntEventValue(arg_2));
    }])]))]));
}

function int64FormFieldNoMin(name, defaultValue, currentText, onChange) {
    return div(empty(), ofArray([label_1(empty(), singleton(name)), input(ofArray([new Option(1, [new IInputType(0, [])]), new Option(15, [singleton(["style", {
        width: "180px",
    }])]), new Option(10, [defaultArg(currentText, `${defaultValue}`)]), new Option(13, [(arg_1) => {
        onChange(getTextEventValue(arg_1));
    }])]))]));
}

const gateTypeDropdown = void 0;

export function getInitSource(mem, model) {
    const a = mem.AddressWidth | 0;
    let path;
    const matchValue = model.CurrentProj;
    if (matchValue == null) {
        path = "";
    }
    else {
        const p = matchValue;
        path = p.ProjectPath;
    }
    const matchValue_1 = mem.Init;
    let matchResult, name;
    switch (matchValue_1.tag) {
        case 4: {
            matchResult = 1;
            break;
        }
        case 0: {
            matchResult = 2;
            break;
        }
        case 1: {
            matchResult = 3;
            name = matchValue_1.fields[0];
            break;
        }
        case 2: {
            matchResult = 3;
            name = matchValue_1.fields[0];
            break;
        }
        case 3: {
            matchResult = 3;
            name = matchValue_1.fields[0];
            break;
        }
        default:
            matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(0, [`Dout = (signed) addr(${a - 1}:${~~(a / 2)}) * addr(${~~(a / 2) - 1}:0)`]);
        case 1:
            return new FSharpResult$2(0, [`Dout = (unsigned) addr(${a - 1}:${~~(a / 2)}) * addr(${~~(a / 2) - 1}:0)`]);
        case 2:
            return new FSharpResult$2(0, ["Memory Viewer/Editor"]);
        default:
            if (fileExistsWithExtn(".ram", path, name)) {
                const matchValue_2 = initialiseMem(mem, path);
                if (matchValue_2.tag === 1) {
                    const s = matchValue_2.fields[0];
                    return new FSharpResult$2(1, [`From '${name}.ram' file. WARNING - this file exists but has a read error: 's'`]);
                }
                else {
                    return new FSharpResult$2(0, [`From '${name}.ram' file`]);
                }
            }
            else {
                return new FSharpResult$2(1, [`From '${name}.ram' file in folder '${path}'. WARNING - this file does not exist`]);
            }
    }
}

export function getDialogMemorySetup(mem) {
    let matchValue, n;
    return [mem.AddressWidth, mem.WordWidth, mem.Init, (matchValue = mem.Init, (matchValue.tag === 1) ? ((n = matchValue.fields[0], n)) : void 0)];
}

function makeMemoryInfo(descr, mem, compId, cType, model, dispatch) {
    let activePatternResult, mem_1, children;
    const setup = getDialogMemorySetup(mem);
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const mem1 = (activePatternResult = $007CMemory$007C_$007C(cType), (activePatternResult != null) ? ((mem_1 = activePatternResult, mem_1)) : toFail(printf("What? makememoryinfo called with non-memory")));
    const reloadMemoryContent = (mem_2, compId_1, model_1, dispatch_1) => {
    };
    const printMemorySource = () => {
        let patternInput;
        const matchValue = getInitSource(mem1, model);
        if (matchValue.tag === 0) {
            const txt_1 = matchValue.fields[0];
            patternInput = [false, txt_1];
        }
        else {
            const txt = matchValue.fields[0];
            patternInput = [true, txt];
        }
        const msgEnd = patternInput[1];
        const isError = patternInput[0];
        const msgStart = (cType.tag === 41) ? "Initial " : ((cType.tag === 42) ? "Initial " : ((cType.tag === 40) ? "" : ((cType.tag === 39) ? "" : toFail(`What - wrong component type (${cType}) here`))));
        const msg = toText(`${msgStart}Data Source: ${msgEnd}`);
        if (isError) {
            return label_1(ofArray([new Option_2(0, [new Size_ISize(0, [])]), new Option_2(4, [singleton(new Modifier_IModifier(1, [new Color_IColor(8, [])]))])]), singleton(msg));
        }
        else {
            return label_1(empty(), singleton(msg));
        }
    };
    dispatch(new Msg(52, [setup]));
    const projectPath = value_1(model.CurrentProj).ProjectPath;
    const mem_3 = setup[2];
    const children_2 = [descr, react.createElement("br", {}), react.createElement("br", {}), bSpan(`Address width: ${mem1.AddressWidth} bit(s)`), react.createElement("br", {}), bSpan(`Number of elements: ${toUInt64(op_LeftShift(1n, mem1.AddressWidth))}`), react.createElement("br", {}), bSpan(`Word width: ${mem1.WordWidth}bit(s)`), react.createElement("br", {}), react.createElement("br", {}), (children = [button(ofArray([new Option_3(0, [new Color_IColor(4, [])]), new Option_3(18, [(_arg) => {
        openMemoryEditor(mem1, compId, model, dispatch);
    }])]), singleton("View/Edit memory content")), memPropsInfoButton(dispatch), react.createElement("br", {}), react.createElement("hr", {}), button(ofArray([new Option_3(0, [new Color_IColor(4, [])]), new Option_3(18, [(_arg_1) => {
        const _arg_2 = openWriteDialogAndWriteMemory(mem1, projectPath);
        if (_arg_2 != null) {
            const path = _arg_2;
            const note = successPropertiesNotification(`Memory content written to '${path}'`);
            dispatch(new Msg(66, [note]));
        }
    }])]), singleton("Export memory initial data to file")), react.createElement("br", {}), react.createElement("br", {}), printMemorySource(), makePopupButton("Memory Initial Data Source", (modelCurrent) => makeSourceMenu(model, (arg_1, arg_2) => {
        DrawModelType_SheetT_Model__Model_UpdateMemory(model.Sheet, sheetDispatch, arg_1, arg_2);
    }, compId, dispatch, modelCurrent), "Change Memory Data Source", dispatch), react.createElement("hr", {})], react.createElement("div", {}, ...children))];
    return react.createElement("div", {}, ...children_2);
}

export function makeVerilogEditButton(model, custom, dispatch) {
    const openCodeEditor = (code) => ((name) => {
        let project$0027;
        const matchValue = model.CurrentProj;
        if (matchValue == null) {
            project$0027 = toFail(printf("Can\'t happen!"));
        }
        else {
            const proj = matchValue;
            project$0027 = (new Project(proj.ProjectPath, proj.OpenFileName, custom.Name, proj.LoadedComponents));
        }
        const model$0027 = new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, project$0027, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
        return (dispatch_1) => {
            createVerilogPopup(model, true, code, name, new CodeEditorOpen(1, [name]), dispatch_1);
        };
    });
    const matchValue_1 = model.CurrentProj;
    if (matchValue_1 != null) {
        const project = matchValue_1;
        const matchValue_2 = custom.Form;
        let matchResult, name_1;
        if (matchValue_2 != null) {
            if (matchValue_2.tag === 4) {
                matchResult = 0;
                name_1 = matchValue_2.fields[0];
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
                const folderPath = project.ProjectPath;
                const path = pathJoin([folderPath, name_1 + ".v"]);
                let code_1;
                const matchValue_3 = tryReadFileSync(path);
                if (matchValue_3.tag === 1) {
                    code_1 = toText(printf("Error: file {%s.v} has been deleted from the project directory"))(name_1);
                }
                else {
                    const text = matchValue_3.fields[0];
                    code_1 = text;
                }
                const children = [react.createElement("br", {}), button(ofArray([new Option_3(0, [new Color_IColor(4, [])]), new Option_3(18, [(_arg) => {
                    dispatch(new Msg(82, [new UICommandType(6, [])]));
                    saveOpenFileActionWithModelUpdate(model, dispatch);
                    dispatch(new Msg(1, [new SheetT_Msg(14, [])]));
                    openCodeEditor(code_1)(name_1)(dispatch);
                }])]), singleton("View/Edit Verilog code")), react.createElement("br", {})];
                return react.createElement("div", {}, ...children);
            }
            default:
                return defaultOf();
        }
    }
    else {
        return toFail(printf("What? current project cannot be None at this point in writing Verilog Component"));
    }
}

export function makeVerilogDeleteButton(model, custom, dispatch) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        const matchValue_1 = custom.Form;
        let matchResult, name;
        if (matchValue_1 != null) {
            if (matchValue_1.tag === 4) {
                matchResult = 0;
                name = matchValue_1.fields[0];
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
                const title = "Delete sheet";
                let body;
                const children = ["Are you sure you want to delete the following Verilog component?", react.createElement("br", {}), pathJoin([project.ProjectPath, name + ".v"]), react.createElement("br", {}), "This action is irreversible."];
                body = react.createElement("div", {}, ...children);
                const buttonText = "Delete";
                const buttonAction = (_arg) => {
                    dispatch(new Msg(82, [new UICommandType(4, [])]));
                    dispatch(new Msg(88, [(model_1, dispatch_1) => {
                        removeFileInProject(name, project, model_1, dispatch_1);
                    }, dispatch]));
                    removeFileWithExtn(".v", project.ProjectPath, name);
                    dispatch(new Msg(41, []));
                };
                const children_2 = [react.createElement("br", {}), button(ofArray([new Option_3(4, []), new Option_3(0, [new Color_IColor(8, [])]), new Option_3(18, [(_arg_1) => {
                    confirmationPopup(title, buttonText, body, buttonAction, dispatch);
                }])]), singleton("Delete")), react.createElement("br", {})];
                return react.createElement("div", {}, ...children_2);
            }
            default:
                return defaultOf();
        }
    }
    else {
        return toFail(printf("What? current project cannot be None at this point in writing Verilog Component"));
    }
}

function changeAdderType(model, comp, dispatch) {
    let children_4, props, props_2, children_2, children_10, props_6, props_8, children_8;
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        const sheetDispatch = (sMsg) => {
            dispatch(new Msg(1, [sMsg]));
        };
        let patternInput;
        const matchValue_1 = comp.Type;
        switch (matchValue_1.tag) {
            case 17: {
                const w = matchValue_1.fields[0] | 0;
                patternInput = [new HTMLAttr(62, [true]), new HTMLAttr(62, [true])];
                break;
            }
            case 19: {
                const w_1 = matchValue_1.fields[0] | 0;
                patternInput = [new HTMLAttr(62, [true]), new HTMLAttr(62, [false])];
                break;
            }
            case 18: {
                const w_2 = matchValue_1.fields[0] | 0;
                patternInput = [new HTMLAttr(62, [false]), new HTMLAttr(62, [true])];
                break;
            }
            case 20: {
                const w_3 = matchValue_1.fields[0] | 0;
                patternInput = [new HTMLAttr(62, [false]), new HTMLAttr(62, [false])];
                break;
            }
            default:
                patternInput = toFail(printf("Cannot change adder type from non-adder component"));
        }
        const checkedCout = patternInput[1];
        const checkedCin = patternInput[0];
        const buttonActionCin = (_arg) => {
            const matchValue_2 = comp.Type;
            switch (matchValue_2.tag) {
                case 17: {
                    const w_4 = matchValue_2.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeAdderComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(18, [w_4]));
                    break;
                }
                case 19: {
                    const w_5 = matchValue_2.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeAdderComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(20, [w_5]));
                    break;
                }
                case 18: {
                    const w_6 = matchValue_2.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeAdderComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(17, [w_6]));
                    break;
                }
                case 20: {
                    const w_7 = matchValue_2.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeAdderComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(19, [w_7]));
                    break;
                }
                default:
                    toFail(printf("Cannot change adder type from non-adder component"));
            }
        };
        const buttonActionCout = (_arg_1) => {
            const matchValue_3 = comp.Type;
            switch (matchValue_3.tag) {
                case 17: {
                    const w_8 = matchValue_3.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeAdderComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(19, [w_8]));
                    break;
                }
                case 18: {
                    const w_9 = matchValue_3.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeAdderComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(20, [w_9]));
                    break;
                }
                case 19: {
                    const w_10 = matchValue_3.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeAdderComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(17, [w_10]));
                    break;
                }
                case 20: {
                    const w_11 = matchValue_3.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeAdderComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(18, [w_11]));
                    break;
                }
                default:
                    toFail(printf("Cannot change adder type from non-adder component"));
            }
        };
        const children_12 = [label_1(empty(), singleton("Optional Ports")), table_1(empty(), ofArray([(children_4 = [(props = [["style", {
            borderStyle: "solid",
        }]], react.createElement("td", keyValueList(props, 1), "Cin")), (props_2 = [["style", {
            borderStyle: "solid",
        }]], (children_2 = [input_1(singleton(new Common_GenericOption(1, [ofArray([new DOMAttr(9, [buttonActionCin]), new HTMLAttr(161, ["Cin"]), new HTMLAttr(99, ["Cin-button"]), new HTMLAttr(123, ["Cin-button"]), checkedCin, ["style", {
            height: "15px",
            width: "15px",
        }]])])))], react.createElement("td", keyValueList(props_2, 1), ...children_2)))], react.createElement("tr", {}, ...children_4)), (children_10 = [(props_6 = [["style", {
            borderStyle: "solid",
        }]], react.createElement("td", keyValueList(props_6, 1), "Cout")), (props_8 = [["style", {
            borderStyle: "solid",
        }]], (children_8 = [input_1(singleton(new Common_GenericOption(1, [ofArray([new DOMAttr(9, [buttonActionCout]), new HTMLAttr(161, ["Cout"]), new HTMLAttr(99, ["Cout-button"]), new HTMLAttr(123, ["Cout-button"]), checkedCout, ["style", {
            height: "15px",
            width: "15px",
        }]])])))], react.createElement("td", keyValueList(props_8, 1), ...children_8)))], react.createElement("tr", {}, ...children_10))])), react.createElement("br", {})];
        return react.createElement("div", {}, ...children_12);
    }
    else {
        return toFail(printf("What? current project cannot be None at this point in writing Verilog Component"));
    }
}

function changeCounterType(model, comp, dispatch) {
    let children_4, props, props_2, children_2, children_10, props_6, props_8, children_8;
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        const sheetDispatch = (sMsg) => {
            dispatch(new Msg(1, [sMsg]));
        };
        let patternInput;
        const matchValue_1 = comp.Type;
        patternInput = ((matchValue_1.tag === 35) ? [new HTMLAttr(62, [true]), new HTMLAttr(62, [true])] : ((matchValue_1.tag === 37) ? [new HTMLAttr(62, [true]), new HTMLAttr(62, [false])] : ((matchValue_1.tag === 36) ? [new HTMLAttr(62, [false]), new HTMLAttr(62, [true])] : ((matchValue_1.tag === 38) ? [new HTMLAttr(62, [false]), new HTMLAttr(62, [false])] : toFail(printf("Cannot change counter type from non-counter component"))))));
        const checkedLoad = patternInput[0];
        const checkedEnable = patternInput[1];
        const buttonActionLoad = (_arg) => {
            const matchValue_2 = comp.Type;
            switch (matchValue_2.tag) {
                case 35: {
                    const w = matchValue_2.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeCounterComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(36, [w]));
                    break;
                }
                case 37: {
                    const w_1 = matchValue_2.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeCounterComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(38, [w_1]));
                    break;
                }
                case 36: {
                    const w_2 = matchValue_2.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeCounterComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(35, [w_2]));
                    break;
                }
                case 38: {
                    const w_3 = matchValue_2.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeCounterComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(37, [w_3]));
                    break;
                }
                default:
                    toFail(printf("Cannot change adder type from non-adder component"));
            }
        };
        const buttonActionEnable = (_arg_1) => {
            const matchValue_3 = comp.Type;
            switch (matchValue_3.tag) {
                case 35: {
                    const w_4 = matchValue_3.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeCounterComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(37, [w_4]));
                    break;
                }
                case 36: {
                    const w_5 = matchValue_3.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeCounterComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(38, [w_5]));
                    break;
                }
                case 37: {
                    const w_6 = matchValue_3.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeCounterComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(35, [w_6]));
                    break;
                }
                case 38: {
                    const w_7 = matchValue_3.fields[0] | 0;
                    DrawModelType_SheetT_Model__Model_ChangeCounterComp(model.Sheet, sheetDispatch, comp.Id, new ComponentType(36, [w_7]));
                    break;
                }
                default:
                    toFail(printf("Cannot change adder type from non-adder component"));
            }
        };
        const children_12 = [label_1(empty(), singleton("Optional Inputs")), table_1(empty(), ofArray([(children_4 = [(props = [["style", {
            borderStyle: "solid",
        }]], react.createElement("td", keyValueList(props, 1), "Load")), (props_2 = [["style", {
            borderStyle: "solid",
        }]], (children_2 = [input_1(singleton(new Common_GenericOption(1, [ofArray([new DOMAttr(9, [buttonActionLoad]), new HTMLAttr(161, ["Load"]), new HTMLAttr(99, ["Load-button"]), new HTMLAttr(123, ["Load-button"]), checkedLoad, ["style", {
            height: "15px",
            width: "15px",
        }]])])))], react.createElement("td", keyValueList(props_2, 1), ...children_2)))], react.createElement("tr", {}, ...children_4)), (children_10 = [(props_6 = [["style", {
            borderStyle: "solid",
        }]], react.createElement("td", keyValueList(props_6, 1), "Enable")), (props_8 = [["style", {
            borderStyle: "solid",
        }]], (children_8 = [input_1(singleton(new Common_GenericOption(1, [ofArray([new DOMAttr(9, [buttonActionEnable]), new HTMLAttr(161, ["Enable"]), new HTMLAttr(99, ["Enable-button"]), new HTMLAttr(123, ["Enable-button"]), checkedEnable, ["style", {
            height: "15px",
            width: "15px",
        }]])])))], react.createElement("td", keyValueList(props_8, 1), ...children_8)))], react.createElement("tr", {}, ...children_10))])), react.createElement("br", {})];
        return react.createElement("div", {}, ...children_12);
    }
    else {
        return toFail(printf("What? current project cannot be None at this point in writing Verilog Component"));
    }
}

function makeScaleAdjustmentField(model, comp, dispatch) {
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    let textw;
    const matchValue = comp.SymbolInfo;
    if (matchValue == null) {
        textw = 1;
    }
    else {
        const si = matchValue;
        const matchValue_1 = si.HScale;
        if (matchValue_1 == null) {
            textw = 1;
        }
        else {
            const no = matchValue_1;
            textw = no;
        }
    }
    let texth;
    const matchValue_2 = comp.SymbolInfo;
    if (matchValue_2 == null) {
        texth = 1;
    }
    else {
        const si_1 = matchValue_2;
        const matchValue_3 = si_1.VScale;
        if (matchValue_3 == null) {
            texth = 1;
        }
        else {
            const no_1 = matchValue_3;
            texth = no_1;
        }
    }
    const children = [floatFormField("Width Scale", "60px", textw, 0, (newWidth) => {
        if (newWidth < 0) {
            const props = errorPropsNotification("Invalid number of bits.");
            dispatch(new Msg(66, [props]));
        }
        else {
            DrawModelType_SheetT_Model__Model_ChangeScale(model.Sheet, sheetDispatch, comp.Id, newWidth, "scaleHorizontal");
            dispatch(new Msg(67, []));
        }
    }), floatFormField("Height Scale", "60px", texth, 0, (newWidth_1) => {
        if (newWidth_1 < 0) {
            const props_1 = errorPropsNotification("Invalid number of bits.");
            dispatch(new Msg(66, [props_1]));
        }
        else {
            DrawModelType_SheetT_Model__Model_ChangeScale(model.Sheet, sheetDispatch, comp.Id, newWidth_1, "scaleVertical");
            dispatch(new Msg(67, []));
        }
    })];
    return react.createElement("div", {}, ...children);
}

function makeNumberOfBitsField(model, comp, text, dispatch) {
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    let patternInput;
    const matchValue = comp.Type;
    let matchResult, w;
    switch (matchValue.tag) {
        case 0: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 1: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 17: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 18: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 19: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 20: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 21: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 22: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 24: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 23: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 33: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 34: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 35: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 37: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 38: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 36: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 2: {
            matchResult = 0;
            w = matchValue.fields[0];
            break;
        }
        case 25: {
            matchResult = 1;
            break;
        }
        case 28: {
            matchResult = 2;
            break;
        }
        case 6: {
            matchResult = 3;
            break;
        }
        case 47: {
            matchResult = 4;
            break;
        }
        case 5: {
            matchResult = 5;
            break;
        }
        case 7: {
            matchResult = 6;
            break;
        }
        default:
            matchResult = 7;
    }
    switch (matchResult) {
        case 0: {
            patternInput = ["Number of bits", w];
            break;
        }
        case 1: {
            const w_1 = matchValue.fields[0] | 0;
            patternInput = ["Width of output bus", w_1];
            break;
        }
        case 2: {
            const w_2 = matchValue.fields[0] | 0;
            patternInput = ["Number of bits in the top (LSB) wire", w_2];
            break;
        }
        case 3: {
            const w_3 = matchValue.fields[0] | 0;
            patternInput = ["Number of bits selected: width", w_3];
            break;
        }
        case 4: {
            const w_4 = matchValue.fields[0] | 0;
            patternInput = ["Bus width", w_4];
            break;
        }
        case 5: {
            const w_5 = matchValue.fields[0] | 0;
            patternInput = ["Bus width", w_5];
            break;
        }
        case 6: {
            const w_6 = matchValue.fields[0] | 0;
            patternInput = ["Number of bits in the wire", w_6];
            break;
        }
        default: {
            const c = matchValue;
            patternInput = toFail(printf("makeNumberOfBitsField called with invalid component: %A"))(c);
        }
    }
    const width = patternInput[1] | 0;
    const title = patternInput[0];
    return intFormField(title, "60px", width, 1, (newWidth) => {
        if (newWidth < 1) {
            const props = errorPropsNotification("Invalid number of bits.");
            dispatch(new Msg(66, [props]));
        }
        else {
            DrawModelType_SheetT_Model__Model_ChangeWidth(model.Sheet, sheetDispatch, comp.Id, newWidth);
            const text$0027 = (comp.Type.tag === 6) ? text : formatLabelAsBus(newWidth, text);
            let lastUsedWidth;
            const matchValue_2 = comp.Type;
            switch (matchValue_2.tag) {
                case 28:
                case 6:
                case 7: {
                    lastUsedWidth = model.LastUsedDialogWidth;
                    break;
                }
                default:
                    lastUsedWidth = newWidth;
            }
            dispatch(new Msg(69, [lastUsedWidth]));
            dispatch(new Msg(46, [newWidth]));
            dispatch(new Msg(67, []));
        }
    });
}

function makeNumberOfInputsField(model, comp, dispatch) {
    let props;
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const errText = defaultArg(map((i) => {
        if ((i < 2) ? true : (i > Constants_maxGateInputs)) {
            return toText(printf("Must have between %d and %d inputs"))(2)(Constants_maxGateInputs);
        }
        else {
            return "";
        }
    }, model.PopupDialogData.Int), "");
    let patternInput;
    const matchValue = comp.Type;
    if (matchValue.tag === 10) {
        const n = matchValue.fields[1] | 0;
        const gType = matchValue.fields[0];
        patternInput = ["Number of inputs", gType, n];
    }
    else {
        const c = matchValue;
        patternInput = toFail(printf("makeNumberOfInputsField called with invalid component: %A"))(c);
    }
    const title = patternInput[0];
    const oldType = patternInput[1];
    const nInp = patternInput[2] | 0;
    const children_2 = [(props = [["style", {
        color: new HighLightColor(0, []),
    }]], react.createElement("span", keyValueList(props, 1), errText)), intFormField(title, "60px", nInp, 2, (newInpNum) => {
        if ((newInpNum >= 2) && (newInpNum <= Constants_maxGateInputs)) {
            DrawModelType_SheetT_Model__Model_ChangeGate(model.Sheet, sheetDispatch, comp.Id, oldType, newInpNum);
            dispatch(new Msg(46, [newInpNum]));
        }
        else {
            dispatch(new Msg(46, [newInpNum]));
        }
    })];
    return react.createElement("div", {}, ...children_2);
}

function changeMergeN(model, comp, dispatch) {
    let props;
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const errText = defaultArg(map((i) => {
        if ((i < 2) ? true : (i > Constants_maxSplitMergeBranches)) {
            return toText(`Must have between 2 and ${Constants_maxSplitMergeBranches} inputs`);
        }
        else {
            return "";
        }
    }, model.PopupDialogData.Int), "");
    let patternInput;
    const matchValue = comp.Type;
    if (matchValue.tag === 29) {
        const n = matchValue.fields[0] | 0;
        patternInput = ["Number of inputs", n];
    }
    else {
        const c = matchValue;
        patternInput = toFail(printf("changeMergeN called with invalid component: %A"))(c);
    }
    const title = patternInput[0];
    const nInp = patternInput[1] | 0;
    const children_2 = [(props = [["style", {
        color: new HighLightColor(0, []),
    }]], react.createElement("span", keyValueList(props, 1), errText)), intFormField(title, "60px", nInp, 2, (newInpNum) => {
        if ((newInpNum >= 2) && (newInpNum <= Constants_maxSplitMergeBranches)) {
            DrawModelType_SheetT_Model__Model_ChangeMergeN(model.Sheet, sheetDispatch, comp.Id, newInpNum);
            dispatch(new Msg(46, [newInpNum]));
        }
        else {
            dispatch(new Msg(46, [newInpNum]));
        }
    })];
    return react.createElement("div", {}, ...children_2);
}

function changeSplitN(model, comp, dispatch) {
    let props, props_2, children_2, children_4, props_4;
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const errText = defaultArg(map((i) => {
        if ((i < 2) ? true : (i > Constants_maxSplitMergeBranches)) {
            return toText(`Must have between 2 and ${Constants_maxSplitMergeBranches} outputs`);
        }
        else {
            return "";
        }
    }, model.PopupDialogData.Int), "");
    let patternInput;
    const matchValue = comp.Type;
    if (matchValue.tag === 30) {
        const widths = matchValue.fields[1];
        const nInputs = matchValue.fields[0] | 0;
        const lsblist = matchValue.fields[2];
        patternInput = ["Number of outputs", nInputs, widths, lsblist];
    }
    else {
        const c = matchValue;
        patternInput = toFail(printf("changeSplitN called with invalid component: %A"))(c);
    }
    const widths_1 = patternInput[2];
    const title = patternInput[0];
    const nInp = patternInput[1] | 0;
    const lsbs = patternInput[3];
    const changeWidths = (widths_2, newNumInputs, defaultVal) => {
        let n, n_1;
        const matchValue_1 = length_1(widths_2) | 0;
        if ((n = (matchValue_1 | 0), n > newNumInputs)) {
            const n_2 = matchValue_1 | 0;
            return getSlice(void 0, newNumInputs - 1, widths_2);
        }
        else if ((n_1 = (matchValue_1 | 0), n_1 < newNumInputs)) {
            const n_3 = matchValue_1 | 0;
            return append(widths_2, initialize(newNumInputs - n_3, (_arg) => defaultVal));
        }
        else {
            return widths_2;
        }
    };
    const changeLsbs = (lsbs_1, widths_3, newNumInputs_1) => {
        let n_4, n_5;
        const matchValue_2 = length_1(lsbs_1) | 0;
        if ((n_4 = (matchValue_2 | 0), n_4 > newNumInputs_1)) {
            const n_6 = matchValue_2 | 0;
            return getSlice(void 0, newNumInputs_1 - 1, lsbs_1);
        }
        else if ((n_5 = (matchValue_2 | 0), n_5 < newNumInputs_1)) {
            const n_7 = matchValue_2 | 0;
            const msbs = map2((lsb, width) => ((lsb + width) - 1), lsbs_1, widths_3);
            return append(lsbs_1, initialize(newNumInputs_1 - n_7, (x) => ((x + max(msbs, {
                Compare: comparePrimitives,
            })) + 1)));
        }
        else {
            return lsbs_1;
        }
    };
    const children_7 = [(props = [["style", {
        color: new HighLightColor(0, []),
    }]], react.createElement("span", keyValueList(props, 1), errText)), intFormField(title, "60px", nInp, 2, (newInpNum) => {
        if ((newInpNum >= 2) && (newInpNum <= Constants_maxSplitMergeBranches)) {
            const newWidths = changeWidths(widths_1, newInpNum, 1);
            const newLsbs = changeLsbs(lsbs, widths_1, newInpNum);
            DrawModelType_SheetT_Model__Model_ChangeSplitN(model.Sheet, sheetDispatch, comp.Id, newInpNum, newWidths, newLsbs);
            dispatch(new Msg(46, [newInpNum]));
        }
        else {
            dispatch(new Msg(46, [newInpNum]));
        }
    }), (props_2 = [["style", {
        display: "flex",
        marginLeft: "180px",
    }]], (children_2 = [label_1(singleton(new Option_2(3, [singleton(["style", {
        textAlign: "center",
        marginRight: "20px",
    }])])), singleton("Width")), label_1(singleton(new Option_2(3, [singleton(["style", {
        textAlign: "center",
        marginLeft: "20px",
    }])])), singleton("LSB"))], react.createElement("div", keyValueList(props_2, 1), ...children_2))), (children_4 = mapIndexed2((index, defaultWidth, defaultLsb) => {
        let n_8, n_10;
        let portTitle;
        if ((n_8 = (defaultWidth | 0), n_8 > 1)) {
            const n_9 = defaultWidth | 0;
            portTitle = toText(printf("Output Port %d"))(index);
        }
        else {
            portTitle = toText(printf("Output Port %d"))(index);
        }
        let bits;
        if ((n_10 = (defaultWidth | 0), n_10 > 1)) {
            const n_11 = defaultWidth | 0;
            const arg_8 = ((n_11 + defaultLsb) - 1) | 0;
            bits = toText(printf("(%d:%d)"))(arg_8)(defaultLsb);
        }
        else {
            bits = toText(printf("(%d)"))(defaultLsb);
        }
        return intFormField2(portTitle, bits, "60px", defaultWidth, defaultLsb, 1, 0, (newWidth) => {
            const neWidths = mapIndexed((i_1, x_2) => {
                if (i_1 === index) {
                    return newWidth | 0;
                }
                else {
                    return x_2 | 0;
                }
            }, widths_1);
            DrawModelType_SheetT_Model__Model_ChangeSplitN(model.Sheet, sheetDispatch, comp.Id, nInp, neWidths, lsbs);
        }, (lsb_1) => {
            const newLsbs_1 = mapIndexed((i_2, x_3) => {
                if (i_2 === index) {
                    return lsb_1 | 0;
                }
                else {
                    return x_3 | 0;
                }
            }, lsbs);
            DrawModelType_SheetT_Model__Model_ChangeSplitN(model.Sheet, sheetDispatch, comp.Id, nInp, widths_1, newLsbs_1);
        });
    }, widths_1, lsbs), (props_4 = singleton(["style", {
        marginBottom: "20px",
    }]), react.createElement("div", keyValueList(props_4, 1), ...children_4)))];
    return react.createElement("div", {}, ...children_7);
}

/**
 * Used for Input1 Component types. Make field for users to enter a default value for
 * Input1 Components when they are undriven.
 */
export function makeDefaultValueField(model, comp, dispatch) {
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const title = "Default value if input is undriven";
    let patternInput;
    const matchValue = comp.Type;
    if (matchValue.tag === 0) {
        const w = matchValue.fields[0] | 0;
        const defValue = matchValue.fields[1];
        if (defValue == null) {
            patternInput = [w, 0];
        }
        else {
            const defValue_1 = defValue | 0;
            patternInput = [w, defValue_1];
        }
    }
    else {
        patternInput = toFail(printf("Other component types should not call this function."));
    }
    const width = patternInput[0] | 0;
    const defValue_2 = patternInput[1] | 0;
    return intFormField(title, "60px", defValue_2, 0, (newValue) => {
        const matchValue_1 = checkWidth(width, toInt64(fromInt32(newValue)));
        if (matchValue_1 == null) {
            DrawModelType_SheetT_Model__Model_ChangeInputValue(model.Sheet, sheetDispatch, comp.Id, newValue);
            dispatch(new Msg(69, [model.LastUsedDialogWidth]));
            dispatch(new Msg(46, [newValue]));
            dispatch(new Msg(67, []));
        }
        else {
            const msg = matchValue_1;
            const props = errorPropsNotification(msg);
            dispatch(new Msg(66, [props]));
        }
    });
}

export function mockDispatchS(msgFun, msg) {
    let matchResult, sMsg;
    if (msg.tag === 1) {
        if (msg.fields[0].tag === 0) {
            if (msg.fields[0].fields[0].tag === 0) {
                matchResult = 0;
                sMsg = msg.fields[0].fields[0].fields[0];
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
            msgFun(msg);
            break;
        }
        case 1: {
            break;
        }
    }
}

export const msgToS = (arg_4) => (new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(0, [arg_4])])]));

/**
 * Return dialog fileds used by constant, or default values
 */
export function constantDialogWithDefault(w, cText, dialog) {
    const w_1 = defaultArg(dialog.Int, w) | 0;
    const cText_1 = defaultArg(dialog.Text, cText);
    return [w_1, cText_1];
}

/**
 * Create react to chnage constant properties
 */
export function makeConstantDialog(model, comp, text, dispatch) {
    const symbolDispatch = (msg) => {
        dispatch(msgToS(msg));
    };
    let patternInput;
    const matchValue = comp.Type;
    if (matchValue.tag === 7) {
        const w = matchValue.fields[0] | 0;
        const txt = matchValue.fields[2];
        patternInput = [w, txt];
    }
    else {
        patternInput = toFail(printf("What? impossible"));
    }
    const wComp = patternInput[0] | 0;
    const txtComp = patternInput[1];
    const w_1 = defaultArg(model.PopupDialogData.Int, wComp) | 0;
    const cText = defaultArg(model.PopupDialogData.Text, txtComp);
    const patternInput_1 = parseConstant(64, w_1, cText);
    const reactMsg = patternInput_1[0];
    const compTOpt = patternInput_1[1];
    if (compTOpt != null) {
        if (compTOpt.tag === 7) {
            const cText_1 = compTOpt.fields[2];
            const cVal = compTOpt.fields[1];
            const compT = compTOpt;
            const w_2 = compTOpt.fields[0] | 0;
            if (!equals(compT, comp.Type)) {
                DrawModelType_SheetT_Model__Model_ChangeWidth(model.Sheet, (arg_4) => {
                    dispatch(new Msg(1, [arg_4]));
                }, comp.Id, w_2);
                symbolDispatch(new SymbolT_Msg(21, [comp.Id, cVal, cText_1]));
                dispatch(new Msg(69, [w_2]));
                dispatch(new Msg(67, []));
            }
        }
        else {
            toFail(printf("What? impossible"));
        }
    }
    const children = [makeNumberOfBitsField(model, comp, text, dispatch), react.createElement("br", {}), reactMsg, react.createElement("br", {}), textFormFieldSimple("Enter constant value in decimal, hex, or binary:", cText, (txt_1) => {
        toConsole(`Setting ${txt_1}`);
        dispatch(new Msg(42, [txt_1]));
    })];
    return react.createElement("div", {}, ...children);
}

/**
 * Create react to chnage constant properties
 */
export function makeBusCompareDialog(model, comp, text, dispatch) {
    const symbolDispatch = (msg) => {
        dispatch(msgToS(msg));
    };
    let patternInput;
    const matchValue = comp.Type;
    if (matchValue.tag === 5) {
        const w = matchValue.fields[0] | 0;
        const txt = matchValue.fields[2];
        patternInput = [w, txt];
    }
    else {
        patternInput = toFail(printf("What? impossible1"));
    }
    const wComp = patternInput[0] | 0;
    const txtComp = patternInput[1];
    const w_1 = defaultArg(model.PopupDialogData.Int, wComp) | 0;
    const cText = defaultArg(model.PopupDialogData.Text, txtComp);
    const patternInput_1 = parseBusCompareValue(32, w_1, cText);
    const reactMsg = patternInput_1[0];
    const compTOpt = patternInput_1[1];
    if (compTOpt != null) {
        if (compTOpt.tag === 5) {
            const cText_1 = compTOpt.fields[2];
            const cVal = compTOpt.fields[1];
            const compT = compTOpt;
            const w_2 = compTOpt.fields[0] | 0;
            if (!equals(compT, comp.Type)) {
                DrawModelType_SheetT_Model__Model_ChangeWidth(model.Sheet, (arg_4) => {
                    dispatch(new Msg(1, [arg_4]));
                }, comp.Id, w_2);
                symbolDispatch(new SymbolT_Msg(22, [comp.Id, cVal, cText_1]));
                dispatch(new Msg(69, [w_2]));
                dispatch(new Msg(67, []));
            }
        }
        else {
            toFail(printf("What? impossible"));
        }
    }
    const children = [makeNumberOfBitsField(model, comp, text, dispatch), react.createElement("br", {}), reactMsg, react.createElement("br", {}), textFormFieldSimple("Enter bus compare value in decimal, hex, or binary:", cText, (txt_1) => {
        toConsole(`Setting ${txt_1}`);
        dispatch(new Msg(42, [txt_1]));
    })];
    return react.createElement("div", {}, ...children);
}

function makeLsbBitNumberField(model, comp, dispatch) {
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    let patternInput;
    const matchValue = comp.Type;
    switch (matchValue.tag) {
        case 6: {
            const width = matchValue.fields[0] | 0;
            const lsb = matchValue.fields[1] | 0;
            patternInput = [lsb >>> 0, "Least Significant Bit number selected: lsb"];
            break;
        }
        case 47: {
            const width_1 = matchValue.fields[0] | 0;
            const cVal = matchValue.fields[1];
            patternInput = [cVal, "Compare with"];
            break;
        }
        case 5: {
            const width_2 = matchValue.fields[0] | 0;
            const text = matchValue.fields[2];
            const cVal_1 = matchValue.fields[1];
            patternInput = [cVal_1, "Compare with"];
            break;
        }
        default:
            patternInput = toFail(printf("makeLsbBitNumberfield called from %A"))(comp.Type);
    }
    const lsbPos = patternInput[0];
    const infoText = patternInput[1];
    const matchValue_1 = comp.Type;
    switch (matchValue_1.tag) {
        case 47: {
            const width_3 = matchValue_1.fields[0] | 0;
            return intFormField(infoText, "120px", ~~lsbPos, 1, (cVal_2) => {
                if ((cVal_2 < 0) ? true : ((cVal_2 >>> 0) > (((1 << width_3) - 1) >>> 0))) {
                    const note = errorPropsNotification(toText(printf("Invalid Comparison Value for bus of width %d"))(width_3));
                    dispatch(new Msg(66, [note]));
                }
                else {
                    DrawModelType_SheetT_Model__Model_ChangeLSB(model.Sheet, sheetDispatch, comp.Id, toInt64(fromInt32(cVal_2)));
                    dispatch(new Msg(69, [width_3]));
                    dispatch(new Msg(67, []));
                }
            });
        }
        case 6: {
            const width_4 = matchValue_1.fields[0] | 0;
            return intFormField(infoText, "60px", ~~lsbPos, 1, (newLsb) => {
                if (newLsb < 0) {
                    const note_1 = errorPropsNotification("Invalid LSB bit position");
                    dispatch(new Msg(66, [note_1]));
                }
                else {
                    DrawModelType_SheetT_Model__Model_ChangeLSB(model.Sheet, sheetDispatch, comp.Id, toInt64(fromInt32(newLsb)));
                    dispatch(new Msg(69, [width_4]));
                    dispatch(new Msg(67, []));
                }
            });
        }
        default:
            return toFail(printf("What? invalid component for lsbpos in properties"));
    }
}

function makeDescription(comp, model, dispatch) {
    let s_7, s_8, s_9, s_24, s_25, s_26, s_27, props_76, props_80, children_60, props_86, children_64, s_58, s_60, s_61, s_62;
    const gateDescription = (numInputs, gateType) => {
        const gType = `${gateType}`;
        const gTypeName = gType.slice(0, 0 + 1).toLocaleUpperCase() + gType.slice(1, (gType.length - 1) + 1);
        return `${numInputs} input ${gTypeName} gate.`;
    };
    const gateNDescription = (numInputs_1, gateType_1) => {
        const gType_1 = `${gateType_1}`;
        const gTypeName_1 = gType_1.slice(0, 0 + 1).toLocaleUpperCase() + gType_1.slice(1, (gType_1.length - 1) + 1);
        return `${gTypeName_1}-N block. ${numInputs_1} ${gTypeName_1} gates used one for each bit of the ${numInputs_1}-bit input and output busses.`;
    };
    const matchValue = comp.Type;
    let matchResult, numberOfBits;
    switch (matchValue.tag) {
        case 48: {
            matchResult = 1;
            break;
        }
        case 0: {
            matchResult = 2;
            break;
        }
        case 7:
        case 49: {
            matchResult = 3;
            break;
        }
        case 1: {
            matchResult = 4;
            break;
        }
        case 2: {
            matchResult = 5;
            break;
        }
        case 4: {
            matchResult = 6;
            break;
        }
        case 47:
        case 5: {
            matchResult = 7;
            break;
        }
        case 6: {
            matchResult = 8;
            break;
        }
        case 3: {
            matchResult = 9;
            break;
        }
        case 8: {
            matchResult = 10;
            break;
        }
        case 10: {
            matchResult = 11;
            break;
        }
        case 11: {
            matchResult = 12;
            break;
        }
        case 12: {
            matchResult = 13;
            break;
        }
        case 13: {
            matchResult = 14;
            break;
        }
        case 14: {
            matchResult = 15;
            break;
        }
        case 15: {
            matchResult = 16;
            break;
        }
        case 16: {
            matchResult = 17;
            break;
        }
        case 27: {
            matchResult = 18;
            break;
        }
        case 29: {
            matchResult = 19;
            break;
        }
        case 28: {
            matchResult = 20;
            break;
        }
        case 30: {
            matchResult = 21;
            break;
        }
        case 21: {
            matchResult = 23;
            break;
        }
        case 22: {
            matchResult = 24;
            break;
        }
        case 24: {
            matchResult = 25;
            break;
        }
        case 23: {
            matchResult = 26;
            break;
        }
        case 25: {
            matchResult = 27;
            break;
        }
        case 9: {
            matchResult = 28;
            break;
        }
        case 26: {
            matchResult = 29;
            break;
        }
        case 31: {
            matchResult = 30;
            break;
        }
        case 32: {
            matchResult = 31;
            break;
        }
        case 33: {
            matchResult = 32;
            break;
        }
        case 34: {
            matchResult = 33;
            break;
        }
        case 35:
        case 37:
        case 38:
        case 36: {
            matchResult = 34;
            break;
        }
        case 39: {
            matchResult = 35;
            break;
        }
        case 40: {
            matchResult = 36;
            break;
        }
        case 41: {
            matchResult = 37;
            break;
        }
        case 42: {
            matchResult = 38;
            break;
        }
        case 46: {
            matchResult = 39;
            break;
        }
        case 17: {
            matchResult = 22;
            numberOfBits = matchValue.fields[0];
            break;
        }
        case 18: {
            matchResult = 22;
            numberOfBits = matchValue.fields[0];
            break;
        }
        case 19: {
            matchResult = 22;
            numberOfBits = matchValue.fields[0];
            break;
        }
        case 20: {
            matchResult = 22;
            numberOfBits = matchValue.fields[0];
            break;
        }
        default:
            matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return toFail(printf("What? Legacy RAM component types should never occur"));
        case 1:
            return toFail(printf("Legacy Input component types should never occur"));
        case 2:
            return "Input.";
        case 3:
            return "Constant Wire.";
        case 4:
            return "Output.";
        case 5:
            return "Viewer.";
        case 6:
            return "Not connected.";
        case 7: {
            const s_5 = "The output is one if the bus unsigned binary value is equal to the integer specified. This will display in hex on the design sheet. Busses of greater than 32 bits are not supported";
            return s_5;
        }
        case 8: {
            const children = ["Bus Selection.", react.createElement("br", {}), (s_7 = "The output is the subrange [width+lsb-1..lsb] of the input bits. If width = 1 this selects one bit. Error if the input has less than width + lsb bits.", s_7), react.createElement("br", {}), react.createElement("br", {}), (s_8 = "Note that the output bit(s) are numbered from 0 even if the input range has LS bit number > 0. The input range selected for output is displayed in brackets on the symbol.", s_8)];
            return react.createElement("div", {}, ...children);
        }
        case 9: {
            const children_2 = [(s_9 = "Label on Wire or Bus. Labels with the same name connect wires. Each label has input on left and output on right. No output connection is required from a set of labels. Since a set represents one wire of bus, exactly one input connection is required. Labels can be used:", s_9), react.createElement("br", {}), "To name wires and document designs.", react.createElement("br", {}), "To join inputs and outputs without wires.", react.createElement("br", {}), "To prevent an unused output from giving an error."];
            return react.createElement("div", {}, ...children_2);
        }
        case 10: {
            const children_4 = [toText(printf("%A gate."))(comp.Type)];
            return react.createElement("div", {}, ...children_4);
        }
        case 11: {
            const n = matchValue.fields[1] | 0;
            const gateType_2 = matchValue.fields[0];
            const children_6 = [gateDescription(n, gateType_2)];
            return react.createElement("div", {}, ...children_6);
        }
        case 12: {
            const children_8 = ["Multiplexer with two inputs and one output.", react.createElement("br", {}), react.createElement("br", {}), button(ofArray([new Option_3(0, [new Color_IColor(4, [])]), new Option_3(18, [(_arg) => {
                DrawModelType_SheetT_Model__Model_ChangeReversedInputs(model.Sheet, (arg_4) => {
                    dispatch(new Msg(1, [arg_4]));
                }, comp.Id);
            }])]), singleton("Reverse Inputs"))];
            return react.createElement("div", {}, ...children_8);
        }
        case 13:
            return react.createElement("div", {}, "Multiplexer with four inputs and one output.");
        case 14:
            return react.createElement("div", {}, "Multiplexer with eight inputs and one output.");
        case 15:
            return react.createElement("div", {}, "Demultiplexer with one input and two outputs.");
        case 16:
            return react.createElement("div", {}, "Demultiplexer with one input and four outputs.");
        case 17:
            return react.createElement("div", {}, "Demultiplexer with one input and eight outputs.");
        case 18: {
            const children_20 = [(s_24 = "Merge two busses of width n and m into a single bus of width n+m. The bit numbers of the whole and each branch are shown when the component is connected.", s_24)];
            return react.createElement("div", {}, ...children_20);
        }
        case 19: {
            const children_22 = [(s_25 = "Merge N busses of various widths into a single bus. The bit numbers of the whole and each branch are shown when the component is connected.", s_25)];
            return react.createElement("div", {}, ...children_22);
        }
        case 20: {
            const children_24 = [(s_26 = "Split a bus of width n+m exactly into two non-overlapping busses of width n and m. The bit numbers of the whole and each branch are shown when the component is connected.", s_26)];
            return react.createElement("div", {}, ...children_24);
        }
        case 21: {
            const children_26 = [(s_27 = "Split a bus into N output busses of various widths. The output busses may overlap. The output busses need not include all of the input bits", s_27)];
            return react.createElement("div", {}, ...children_26);
        }
        case 22: {
            const children_28 = [toText(printf("%d bit(s) adder."))(numberOfBits)];
            return react.createElement("div", {}, ...children_28);
        }
        case 23: {
            const typ = matchValue.fields[1];
            const numberOfBits_1 = matchValue.fields[0] | 0;
            const children_30 = [(typ != null) ? (`${numberOfBits_1}X${numberOfBits_1}->${numberOfBits_1} Multiply block. This returns bits (${numberOfBits_1}:0) of the result. For these bits, signed and unsigned multiplication are identical`) : gateNDescription(numberOfBits_1, "xor")];
            return react.createElement("div", {}, ...children_30);
        }
        case 24: {
            const numberOfBits_2 = matchValue.fields[0] | 0;
            const children_32 = [gateNDescription(numberOfBits_2, "and")];
            return react.createElement("div", {}, ...children_32);
        }
        case 25: {
            const numberOfBits_3 = matchValue.fields[0] | 0;
            const children_34 = [gateNDescription(numberOfBits_3, "or")];
            return react.createElement("div", {}, ...children_34);
        }
        case 26: {
            const numberOfBits_4 = matchValue.fields[0] | 0;
            return react.createElement("div", {}, `Not-N block. ${numberOfBits_4} Not gates used one for each bit of the ${numberOfBits_4}-bit input and output busses.`);
        }
        case 27: {
            const numberOfBits_5 = matchValue.fields[0] | 0;
            const children_38 = [toText(printf("Bus Spreader: every bit in the %d-bit output wire is the same as the 1-bit input. Used to implement sign extension and shift operations."))(numberOfBits_5)];
            return react.createElement("div", {}, ...children_38);
        }
        case 28:
            return react.createElement("div", {}, "4 bit decoder: Data is output on the Sel output, all other outputs are 0.");
        case 29: {
            const custom = matchValue.fields[0];
            const styledSpan = (styles, txt) => {
                const props_58 = [["style", keyValueList(styles, 1)]];
                return react.createElement("span", keyValueList(props_58, 1), txt);
            };
            const boldSpan = (txt_1) => styledSpan(singleton(new CSSProp(165, ["bold"])), txt_1);
            const italicSpan = (txt_2) => styledSpan(singleton(new CSSProp(156, ["italic"])), txt_2);
            const toHTMLList = (list) => map_1((tupledArg) => {
                const label = tupledArg[0];
                const width = tupledArg[1] | 0;
                const children_44 = [toText(printf("%s: %d bit(s)"))(label)(width)];
                return react.createElement("li", {}, ...children_44);
            }, list);
            let symbolExplanation;
            const matchValue_1 = custom.Form;
            let matchResult_1;
            if (matchValue_1 != null) {
                if (matchValue_1.tag === 4) {
                    matchResult_1 = 0;
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
                    symbolExplanation = ": Verilog Component.";
                    break;
                }
                default:
                    symbolExplanation = ": user defined (custom) component.";
            }
            let sheetDescription_1;
            const matchValue_2 = custom.Description;
            if (matchValue_2 == null) {
                sheetDescription_1 = react.createElement("br", {});
            }
            else {
                const sheetDescription = matchValue_2;
                const children_52 = [react.createElement("p", {}, "----------------"), react.createElement("p", {}, sheetDescription), react.createElement("p", {}, "----------------")];
                sheetDescription_1 = react.createElement("div", {}, ...children_52);
            }
            let portOrderExplanation;
            const matchValue_3 = custom.Form;
            let matchResult_2;
            if (matchValue_3 != null) {
                if (matchValue_3.tag === 4) {
                    matchResult_2 = 0;
                }
                else {
                    matchResult_2 = 1;
                }
            }
            else {
                matchResult_2 = 1;
            }
            switch (matchResult_2) {
                case 0: {
                    portOrderExplanation = (`Input or Output ports are displayed on the '${custom.Name}' symbol sorted by the port definition order in the original Verilog file.`);
                    break;
                }
                default:
                    portOrderExplanation = (`Input or Output ports are displayed on the '${custom.Name}' symbol sorted by the vertical position on the design sheet of the Input or Output components at the time the symbol is added.`);
            }
            const children_66 = [boldSpan(`${custom.Name}`), react.createElement("span", {}, symbolExplanation), sheetDescription_1, makeVerilogEditButton(model, custom, dispatch), makeVerilogDeleteButton(model, custom, dispatch), react.createElement("br", {}), (props_76 = [["style", {
                fontStyle: "italic",
                fontSize: "12px",
                lineHeight: "1.1",
            }]], react.createElement("p", keyValueList(props_76, 1), portOrderExplanation)), react.createElement("br", {}), (props_80 = [["style", {
                fontWeight: "bold",
                fontSize: "15px",
            }]], react.createElement("span", keyValueList(props_80, 1), "Inputs")), (children_60 = toHTMLList(custom.InputLabels), react.createElement("ul", {}, ...children_60)), react.createElement("br", {}), (props_86 = [["style", {
                fontWeight: "bold",
                fontSize: "15px",
            }]], react.createElement("span", keyValueList(props_86, 1), "Outputs")), (children_64 = toHTMLList(custom.OutputLabels), react.createElement("ul", {}, ...children_64)), react.createElement("br", {}), makeScaleAdjustmentField(model, comp, dispatch)];
            return react.createElement("div", {}, ...children_66);
        }
        case 30:
            return react.createElement("div", {}, "D-flip-flop. The component is implicitly connected to the global clock.");
        case 31: {
            const children_70 = [(s_58 = "D-flip-flop with enable. If the enable signal is high the state of\n             the D-flip-flop will be updated at the next clock cycle.\n             The component is implicitly connected to the global clock.", s_58)];
            return react.createElement("div", {}, ...children_70);
        }
        case 32:
            return react.createElement("div", {}, "Register. The component is implicitly connected to the global clock.");
        case 33: {
            const children_74 = [(s_60 = "Register with enable. If the enable signal is high the\n                      state of the Register will be updated at the next clock\n                      cycle. The component is implicitly connected to the global\n                      clock.", s_60)];
            return react.createElement("div", {}, ...children_74);
        }
        case 34: {
            const children_76 = [(s_61 = "Counter with enable and load options. If the enable signal is high the\n                      state of the counter will be updated at the next clock\n                      cycle taking either the value of input d (when load is enabled)\n                      or the value of out+1 (if load is disabled). \n                      The component is implicitly connected to the global clock.", s_61)];
            return react.createElement("div", {}, ...children_76);
        }
        case 35: {
            const mem = matchValue.fields[0];
            const descr = "Asynchronous ROM: the output is updated as soon as the address changes.";
            return makeMemoryInfo(descr, mem, comp.Id, comp.Type, model, dispatch);
        }
        case 36: {
            const mem_1 = matchValue.fields[0];
            const descr_1 = "Synchronous ROM: the output is updated only after a clock tick. The component is implicitly connected to the global clock.";
            return makeMemoryInfo(descr_1, mem_1, comp.Id, comp.Type, model, dispatch);
        }
        case 37: {
            const mem_2 = matchValue.fields[0];
            const descr_2 = "synchronous read and write RAM memory. \n            At every clock tick, the RAM can read and optionally write\n            the content of the memory location selected by the address. If the\n            write signal is high, the content of the selected memory location\n            is set to the value of data-in. In cycle 0 data-out is 0, otherwise\n            data-out is the contents of the memory location addressed in the\n            previous cycle, before any optional write.\n            The component is implicitly connected to the global clock.";
            return makeMemoryInfo(descr_2, mem_2, comp.Id, comp.Type, model, dispatch);
        }
        case 38: {
            const mem_3 = matchValue.fields[0];
            const descr_3 = "Asynchronous read, synchronous write RAM memory. \n            At every clock tick, optionally write\n            the content of the memory location selected by the address. If the\n            write signal is high, the content of the selected memory location\n            is set to the value of data-in. data-out is the contents of the memory \n            location addressed by the current cycle addres.\n            The component is implicitly connected to the global clock.";
            return makeMemoryInfo(descr_3, mem_3, comp.Id, comp.Type, model, dispatch);
        }
        default: {
            const children_78 = [(s_62 = "Issie Internal Error: This is an internal component and should never appear selected to view properties", s_62)];
            return react.createElement("div", {}, ...children_78);
        }
    }
}

function makeExtraInfo(model, comp, text, dispatch) {
    const matchValue = comp.Type;
    switch (matchValue.tag) {
        case 0: {
            const children = [makeNumberOfBitsField(model, comp, text, dispatch), makeDefaultValueField(model, comp, dispatch)];
            return react.createElement("div", {}, ...children);
        }
        case 10: {
            const children_2 = [makeNumberOfInputsField(model, comp, dispatch)];
            return react.createElement("div", {}, ...children_2);
        }
        case 29: {
            const children_4 = [changeMergeN(model, comp, dispatch)];
            return react.createElement("div", {}, ...children_4);
        }
        case 1:
        case 22:
        case 24:
        case 23:
        case 25:
        case 21:
        case 2:
            return makeNumberOfBitsField(model, comp, text, dispatch);
        case 17:
        case 18:
        case 19:
        case 20: {
            const children_6 = [makeNumberOfBitsField(model, comp, text, dispatch), changeAdderType(model, comp, dispatch)];
            return react.createElement("div", {}, ...children_6);
        }
        case 28:
            return makeNumberOfBitsField(model, comp, text, dispatch);
        case 30: {
            const children_8 = [changeSplitN(model, comp, dispatch)];
            return react.createElement("div", {}, ...children_8);
        }
        case 33:
        case 34:
            return makeNumberOfBitsField(model, comp, text, dispatch);
        case 35:
        case 37:
        case 38:
        case 36: {
            const children_10 = [makeNumberOfBitsField(model, comp, text, dispatch), changeCounterType(model, comp, dispatch)];
            return react.createElement("div", {}, ...children_10);
        }
        case 6: {
            const children_12 = [makeNumberOfBitsField(model, comp, text, dispatch), makeLsbBitNumberField(model, comp, dispatch)];
            return react.createElement("div", {}, ...children_12);
        }
        case 47: {
            const children_14 = [makeNumberOfBitsField(model, comp, text, dispatch), makeLsbBitNumberField(model, comp, dispatch)];
            return react.createElement("div", {}, ...children_14);
        }
        case 5:
            return makeBusCompareDialog(model, comp, text, dispatch);
        case 7:
            return makeConstantDialog(model, comp, text, dispatch);
        default:
            return react.createElement("div", {});
    }
}

export function viewSelectedComponent(model, dispatch) {
    const checkIfLabelIsUnique = (chars, symbols) => {
        if (exists((s) => (s.Component.Label === chars), symbols)) {
            return new FSharpResult$2(1, [Constants_labelUniqueMess]);
        }
        else {
            return new FSharpResult$2(0, [chars]);
        }
    };
    let allowNoLabel;
    const symbols_1 = model.Sheet.Wire.Symbol.Symbols;
    const matchValue_1 = model.Sheet.SelectedComponents;
    let matchResult, cid;
    if (!isEmpty(matchValue_1)) {
        if (isEmpty(tail(matchValue_1))) {
            matchResult = 0;
            cid = head(matchValue_1);
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
            const matchValue_2 = tryFind(cid, symbols_1);
            let matchResult_1;
            if (matchValue_2 != null) {
                switch (matchValue_2.Component.Type.tag) {
                    case 27:
                    case 28:
                    case 6:
                    case 4: {
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
                    allowNoLabel = true;
                    break;
                }
                default:
                    allowNoLabel = false;
            }
            break;
        }
        default:
            allowNoLabel = false;
    }
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const formatLabelText = (txt, compId) => {
        const comp = extractComponent(model.Sheet.Wire.Symbol, compId);
        let allowedDotPos;
        const matchValue_3 = comp.Type;
        if (matchValue_3.tag === 26) {
            const name = matchValue_3.fields[0].Name;
            allowedDotPos = name.length;
        }
        else {
            allowedDotPos = -1;
        }
        const chars_1 = txt.toLocaleUpperCase();
        const symbols_2 = map_1((tuple) => tuple[1], filter((tupledArg) => {
            const i = tupledArg[0];
            const s_1 = tupledArg[1];
            return !equals(i, compId);
        }, toList(model.Sheet.Wire.Symbol.Symbols)));
        const badChars = StringModule_Concat("", map_2((value) => value, map_2((tuple_1) => tuple_1[1], filter_1((tupledArg_1) => {
            let ch_1;
            const i_1 = tupledArg_1[0] | 0;
            const ch = tupledArg_1[1];
            if (!((ch_1 = ch, isLetterOrDigit(ch_1) ? true : (ch_1 === "_")))) {
                if (ch !== ".") {
                    return true;
                }
                else {
                    return i_1 !== allowedDotPos;
                }
            }
            else {
                return false;
            }
        }, indexed(chars_1.split(""))))));
        const matchValue_4 = StringModule_Length(chars_1) | 0;
        if (matchValue_4 === 0) {
            if (allowNoLabel) {
                return new FSharpResult$2(0, [""]);
            }
            else {
                return new FSharpResult$2(1, ["Empty label is not allowed for this component"]);
            }
        }
        else if (!StringModule_StartsWithLetter(chars_1)) {
            return new FSharpResult$2(1, ["Labels must start with a character"]);
        }
        else if ((badChars.indexOf(".") >= 0) && (allowedDotPos > 0)) {
            return new FSharpResult$2(1, ["Custom Component labels can only contain a \'.\' immediately after the name"]);
        }
        else if (badChars.indexOf(".") >= 0) {
            return new FSharpResult$2(1, ["Labels of normal components can only contain letters and digits and underscores, not \'.\'"]);
        }
        else if (badChars !== "") {
            return new FSharpResult$2(1, [`Labels can only contain letters and digits, not '${badChars}'`]);
        }
        else {
            const currSymbol = FSharpMap__get_Item(model.Sheet.Wire.Symbol.Symbols, compId);
            if (currSymbol.Component.Type.tag === 3) {
                const allSymbolsNotWireLabel = filter((s_2) => !equals(s_2.Component.Type, new ComponentType(3, [])), symbols_2);
                return checkIfLabelIsUnique(chars_1, allSymbolsNotWireLabel);
            }
            else {
                return checkIfLabelIsUnique(chars_1, symbols_2);
            }
        }
    };
    const matchValue_6 = model.Sheet.SelectedComponents;
    let matchResult_2, compId_1;
    if (!isEmpty(matchValue_6)) {
        if (isEmpty(tail(matchValue_6))) {
            matchResult_2 = 0;
            compId_1 = head(matchValue_6);
        }
        else {
            matchResult_2 = 1;
        }
    }
    else {
        matchResult_2 = 1;
    }
    switch (matchResult_2) {
        case 0: {
            const comp_1 = extractComponent(model.Sheet.Wire.Symbol, compId_1);
            const children = toList_1(delay(() => {
                let defaultText;
                const matchValue_7 = model.PopupDialogData.Text;
                if (matchValue_7 != null) {
                    const text = matchValue_7;
                    defaultText = text;
                }
                else {
                    defaultText = comp_1.Label;
                }
                const label$0027 = formatLabelText(defaultText, compId_1);
                let labelText;
                if (label$0027.tag === 1) {
                    const e = label$0027.fields[0];
                    labelText = defaultText;
                }
                else {
                    const s_3 = label$0027.fields[0];
                    labelText = s_3;
                }
                return append_1(singleton_1(readOnlyFormField("Description", makeDescription(comp_1, model, dispatch))), delay(() => append_1(singleton_1(makeExtraInfo(model, comp_1, labelText, dispatch)), delay(() => {
                    let required;
                    const matchValue_8 = comp_1.Type;
                    switch (matchValue_8.tag) {
                        case 28:
                        case 27:
                        case 6:
                        case 4: {
                            required = false;
                            break;
                        }
                        default:
                            required = true;
                    }
                    let isBad;
                    if (model.PopupDialogData.BadLabel) {
                        if (label$0027.tag === 1) {
                            const msg = label$0027.fields[0];
                            isBad = msg;
                        }
                        else {
                            isBad = void 0;
                        }
                    }
                    else {
                        isBad = void 0;
                    }
                    return singleton_1(textFormField(required, "Component Name", defaultText, isBad, (text_1) => {
                        const matchValue_9 = formatLabelText(text_1, compId_1);
                        if (matchValue_9.tag === 0) {
                            const label = matchValue_9.fields[0];
                            setComponentLabel(model, sheetDispatch, comp_1, label);
                            dispatch(new Msg(42, [label]));
                            dispatch(new Msg(43, [false]));
                        }
                        else {
                            const errorMess = matchValue_9.fields[0];
                            dispatch(new Msg(43, [true]));
                            dispatch(new Msg(42, [text_1]));
                        }
                        dispatch(new Msg(69, [model.LastUsedDialogWidth]));
                    }, () => {
                        const sheetDispatch_1 = (sMsg_1) => {
                            dispatch(new Msg(1, [sMsg_1]));
                        };
                        const dispatchKey = (arg_1) => {
                            sheetDispatch_1(new SheetT_Msg(2, [arg_1]));
                        };
                        dispatchKey(new SheetT_KeyboardMsg(13, []));
                    }));
                }))));
            }));
            return react.createElement("div", {
                key: comp_1.Id,
            }, ...children);
        }
        default: {
            const matchValue_10 = model.CurrentProj;
            if (matchValue_10 == null) {
                return defaultOf();
            }
            else {
                const proj = matchValue_10;
                const sheetName = proj.OpenFileName;
                const sheetLdc = find((ldc) => (ldc.Name === sheetName), proj.LoadedComponents);
                const sheetDescription = sheetLdc.Description;
                if (sheetDescription != null) {
                    const descr = sheetDescription;
                    const children_10 = [react.createElement("p", {}, "Select a component in the diagram to view or change its properties, for example number of bits."), react.createElement("br", {}), label_1(empty(), singleton("Sheet Description")), react.createElement("p", {}, descr), react.createElement("br", {}), button(ofArray([new Option_3(0, [new Color_IColor(6, [])]), new Option_3(18, [(_arg_1) => {
                        createSheetDescriptionPopup(model, sheetDescription, sheetName, dispatch);
                    }])]), singleton("Edit Description"))];
                    return react.createElement("div", {}, ...children_10);
                }
                else {
                    const children_4 = [react.createElement("p", {}, "Select a component in the diagram to view or change its properties, for example number of bits."), react.createElement("br", {}), label_1(empty(), singleton("Sheet Description")), button(ofArray([new Option_3(0, [new Color_IColor(6, [])]), new Option_3(18, [(_arg) => {
                        createSheetDescriptionPopup(model, void 0, sheetName, dispatch);
                    }])]), singleton("Add Description"))];
                    return react.createElement("div", {}, ...children_4);
                }
            }
        }
    }
}

//# sourceMappingURL=SelectedComponentView.fs.js.map
