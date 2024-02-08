import { Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { class_type, record_type, lambda_type, unit_type, option_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { IntMode, MemoryEditorData, PopupDialogData, Msg, PopupDialogData_$reflection, Msg_$reflection } from "../Model/ModelType.fs.js";
import { uncurry3, curry3, comparePrimitives, int32ToString, uncurry2, curry2, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { map, defaultArg, value as value_5 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { filter, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import * as prism from "../VerilogComponent/../VerilogComponent/prism.js";
import { Component } from "react";
import * as react_1 from "react";
import react_simple_code_editor from "react-simple-code-editor";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import * as electron from "electron";
import { append as append_1, map as map_1, empty as empty_1, singleton, collect, delay, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { HighLightColor, NumberBase as NumberBase_1, InitMemData } from "../Common/CommonTypes.fs.js";
import { HTMLAttr, DOMAttr, CSSProp } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { mapIndexed, mapIndexed2, max, map2, initialize, getSlice, length, append, ofArray, empty, singleton as singleton_1, cons } from "../fable_modules/fable-library.4.1.4/List.js";
import { FlexDirection_Option, Color_IColor, Common_GenericOption } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import { Card_body, Card_card, background, Option, modal, Card_foot, Card_title, Card_head } from "../fable_modules/Fulma.2.16.0/Components/Modal.fs.js";
import { Option as Option_1, delete$ } from "../fable_modules/Fulma.2.16.0/Elements/Delete.fs.js";
import { Option as Option_2, progress } from "../fable_modules/Fulma.2.16.0/Elements/Progress.fs.js";
import { fromInt32, toInt64, toInt32 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { item, right, left, Level_Option, level } from "../fable_modules/Fulma.2.16.0/Layouts/Level.fs.js";
import { Option as Option_3, button } from "../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { StringModule_Length, StringModule_StartsWithLetter } from "../Common/EEExtensions.fs.js";
import { input } from "../fable_modules/Fulma.2.16.0/Elements/Form/./Input.fs.js";
import { Option as Option_4, IInputType } from "../fable_modules/Fulma.2.16.0/Elements/Form/Input.fs.js";
import { getInt64EventValue, getIntEventValue, getTextEventValue } from "../Interface/JSHelpers.fs.js";
import { getErrorTable, getLineCounterDiv, infoHoverableElement } from "../VerilogComponent/CodeEditorHelpers.fs.js";
import { Option as Option_5, label } from "../fable_modules/Fulma.2.16.0/Elements/Form/Label.fs.js";
import { pow2int64 } from "../Common/Helpers.fs.js";
import "../VerilogComponent/prism.css";
import "prismjs/components/prism-clike";

export const Constants_infoSignUnicode = "🛈";



export class CERSCProps extends Record {
    constructor(CurrentCode, ReplaceCode, Dispatch, DialogData, Compile) {
        super();
        this.CurrentCode = CurrentCode;
        this.ReplaceCode = ReplaceCode;
        this.Dispatch = Dispatch;
        this.DialogData = DialogData;
        this.Compile = Compile;
    }
}

export function CERSCProps_$reflection() {
    return record_type("PopupHelpers.CERSCProps", [], CERSCProps, () => [["CurrentCode", string_type], ["ReplaceCode", option_type(string_type)], ["Dispatch", lambda_type(Msg_$reflection(), unit_type)], ["DialogData", PopupDialogData_$reflection()], ["Compile", lambda_type(PopupDialogData_$reflection(), unit_type)]]);
}

export class CERSCState extends Record {
    constructor(code) {
        super();
        this.code = code;
    }
}

export function CERSCState_$reflection() {
    return record_type("PopupHelpers.CERSCState", [], CERSCState, () => [["code", string_type]]);
}

export class CodeEditorReactStatefulComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = (new CERSCState("module NAME(\n  // Write your IO Port Declarations here\n  \n);  \n  // Write your Assignments here\n  \n  \n  \nendmodule"));
    }
    componentDidUpdate(prevProps, prevState) {
        let inputRecord;
        const this$ = this;
        if (!equals(this$.props.ReplaceCode, void 0) && equals(prevProps.ReplaceCode, void 0)) {
            this$.setState((s, _arg) => (new CERSCState(value_5(this$.props.ReplaceCode))));
            this$.props.Dispatch(new Msg(44, [this$.props.ReplaceCode]));
            this$.props.Compile((inputRecord = this$.props.DialogData, new PopupDialogData(inputRecord.Text, inputRecord.Int, inputRecord.ImportDecisions, inputRecord.Int2, inputRecord.ProjectPath, inputRecord.MemorySetup, inputRecord.MemoryEditorData, inputRecord.Progress, inputRecord.ConstraintTypeSel, inputRecord.ConstraintIOSel, inputRecord.ConstraintErrorMsg, inputRecord.NewConstraint, inputRecord.AlgebraInputs, inputRecord.AlgebraError, this$.props.ReplaceCode, inputRecord.VerilogErrors, inputRecord.BadLabel, inputRecord.IntList, inputRecord.IntList2)));
        }
    }
    componentDidMount() {
        const this$ = this;
        if (!equals(this$.props.ReplaceCode, void 0)) {
            this$.setState((s, _arg) => (new CERSCState(value_5(this$.props.ReplaceCode))));
        }
    }
    render() {
        let props_1, arg;
        const this$ = this;
        const props_2 = [["style", {
            position: "relative",
            left: "35px",
            height: "100%",
        }]];
        const children_1 = [(props_1 = {
            placeholder: "Start Writing your Verilog Code here...",
            value: (arg = (this$.state).code, toText(printf("%s"))(arg)),
            padding: 5,
            onValueChange: (txt) => {
                let inputRecord;
                this$.setState((s, p) => (new CERSCState(txt)));
                this$.props.Dispatch(new Msg(44, [txt]));
                this$.props.Compile((inputRecord = this$.props.DialogData, new PopupDialogData(inputRecord.Text, inputRecord.Int, inputRecord.ImportDecisions, inputRecord.Int2, inputRecord.ProjectPath, inputRecord.MemorySetup, inputRecord.MemoryEditorData, inputRecord.Progress, inputRecord.ConstraintTypeSel, inputRecord.ConstraintIOSel, inputRecord.ConstraintErrorMsg, inputRecord.NewConstraint, inputRecord.AlgebraInputs, inputRecord.AlgebraError, txt, inputRecord.VerilogErrors, inputRecord.BadLabel, inputRecord.IntList, inputRecord.IntList2)));
            },
            highlight: (code) => prism.highlight(code, Prism.languages.verilog),
        }, react_1.createElement(react_simple_code_editor, props_1))];
        return react_1.createElement("div", keyValueList(props_2, 1), ...children_1);
    }
}

export function CodeEditorReactStatefulComponent_$reflection() {
    return class_type("PopupHelpers.CodeEditorReactStatefulComponent", void 0, CodeEditorReactStatefulComponent, class_type("Fable.React.Component`2", [CERSCProps_$reflection(), CERSCState_$reflection()], Component));
}

export function CodeEditorReactStatefulComponent_$ctor_3A406D1E(props) {
    return new CodeEditorReactStatefulComponent(props);
}

export function openInBrowser(url, _arg) {
    electron.shell.openExternal(url);
}

export function preventDefault(e) {
    e.preventDefault();
}

export function getText(dialogData) {
    return defaultArg(dialogData.Text, "");
}

export function getImportDecisions(dialogData) {
    return dialogData.ImportDecisions;
}

export function getCode(dialogData) {
    return defaultArg(dialogData.VerilogCode, "");
}

export function getErrorList(dialogData) {
    return dialogData.VerilogErrors;
}

export function getInt(dialogData) {
    return defaultArg(dialogData.Int, 1);
}

export function getInt2(dialogData) {
    return defaultArg(dialogData.Int2, 0n);
}

export function getIntList(dialogData, numInputsDefault, widthDefault) {
    return defaultArg(dialogData.IntList, toList(delay(() => collect((matchValue) => singleton(widthDefault), rangeDouble(1, 1, numInputsDefault)))));
}

export function getIntList2(dialogData, numInputsDefault, lsbDefault) {
    return defaultArg(dialogData.IntList2, toList(delay(() => collect((matchValue) => singleton(lsbDefault), rangeDouble(1, 1, numInputsDefault)))));
}

export function getMemorySetup(dialogData, wordWidthDefault) {
    return defaultArg(dialogData.MemorySetup, [4, wordWidthDefault, new InitMemData(0, []), void 0]);
}

export function getMemoryEditor(model) {
    return defaultArg(model.PopupDialogData.MemoryEditorData, new MemoryEditorData(false, void 0, 0n, new NumberBase_1(0, [])));
}

/**
 * Unclosable popup.
 */
export function unclosablePopup(maybeTitle, body, maybeFoot, extraStyle, dispatch) {
    const propStyle = (extraStyle_1) => (new Common_GenericOption(1, [singleton_1(["style", keyValueList(cons(new CSSProp(381, ["none"]), extraStyle_1), 1)])]));
    let head;
    if (maybeTitle != null) {
        const title = maybeTitle;
        head = Card_head(singleton_1(propStyle(empty())), singleton_1(Card_title(empty(), singleton_1(title))));
    }
    else {
        head = react_1.createElement("div", {});
    }
    let foot_1;
    if (maybeFoot != null) {
        const foot = maybeFoot;
        foot_1 = Card_foot(empty(), singleton_1(foot));
    }
    else {
        foot_1 = react_1.createElement("div", {});
    }
    return modal(singleton_1(new Option(1, [true])), ofArray([background(empty(), empty()), Card_card(singleton_1(new Common_GenericOption(1, [singleton_1(["style", keyValueList(extraStyle, 1)])])), ofArray([head, Card_body(singleton_1(new Common_GenericOption(1, [singleton_1(["style", {
        userSelect: "none",
    }])])), singleton_1(body)), foot_1]))]));
}

export function noDispatch(react, _dispatch) {
    return react;
}

export function mapNoDispatch(optReact) {
    return map((react) => ((_dispatch) => noDispatch(react, _dispatch)), optReact);
}

export function showMemoryEditorPopup(maybeTitle, body, maybeFoot, extraStyle, dispatch) {
    return dispatch(new Msg(39, [(_arg, model) => {
        const memoryEditorData = getMemoryEditor(model);
        return unclosablePopup(maybeTitle, body(memoryEditorData), maybeFoot, extraStyle, dispatch);
    }]));
}

/**
 * Base popup builder function, used by other popup generators
 */
export function buildPopup(title, body, foot, close, extraStyle, dispatch, model) {
    return modal(ofArray([new Option(1, [true]), new Option(2, ["modal1"]), new Option(0, [singleton_1(["style", {
        zIndex: 20000,
    }])])]), ofArray([background(singleton_1(new Common_GenericOption(1, [singleton_1(new DOMAttr(40, [curry2(close)(dispatch)]))])), empty()), Card_card(singleton_1(new Common_GenericOption(1, [singleton_1(["style", keyValueList(append(ofArray([new CSSProp(272, ["auto"]), new CSSProp(271, ["visible"]), new CSSProp(381, ["none"])]), extraStyle), 1)])])), ofArray([Card_head(empty(), ofArray([Card_title(empty(), singleton_1(title)), delete$(singleton_1(new Option_1(3, [curry2(close)(dispatch)])), empty())])), Card_body(singleton_1(new Common_GenericOption(1, [singleton_1(["style", {
        overflowY: "visible",
        overflowX: "visible",
    }])])), singleton_1(body(dispatch, model))), Card_foot(empty(), singleton_1(foot(dispatch, model)))]))]));
}

/**
 * Body and foot are functions that take a string of text and produce a
 * reactElement. The meaning of the input string to those functions is the
 * content of PopupDialogText (i.e. in a dialog popup, the string is the
 * current value of the input box.).
 */
export function dynamicClosablePopup(title, body, foot, extraStyle, dispatch) {
    dispatch(new Msg(39, [(dispatch_2, model) => buildPopup(title, uncurry2((_arg) => body), uncurry2((_arg_1) => foot), (dispatch_1, _arg_2) => {
        dispatch_1(new Msg(41, []));
    }, extraStyle, dispatch_2, model)]));
}

/**
 * As dynamicClosablePopup but accept functions of dispatch and return the popup function
 */
export function dynamicClosablePopupFunc(title, body, foot, extraStyle) {
    return (dispatch_1) => ((model) => buildPopup(title, body, foot, (dispatch, _arg) => {
        dispatch(new Msg(41, []));
    }, extraStyle, dispatch_1, model));
}

/**
 * Popup to track progress of some long operation. Progress is captured via two dialog integers, current and max number.
 * Typically the number is number of steps.
 * The popup display is controlled by model.PopupDialog integers. Progress model updates must change these.
 */
export function dynamicProgressPopupFunc(title, cancel) {
    const body = (dispatch, model) => {
        const dialog = model.PopupDialogData;
        const n = defaultArg(dialog.Int, 0) | 0;
        return progress(ofArray([new Option_2(1, [new Color_IColor(6, [])]), new Option_2(3, [n]), new Option_2(4, [~~toInt32(defaultArg(dialog.Int2, 100n))])]), singleton_1(`${n}`));
    };
    const foot = (dispatch_1, model_1) => {
        const dialog_1 = model_1.PopupDialogData;
        return level(singleton_1(new Level_Option(0, [singleton_1(["style", {
            width: "100%",
        }])])), ofArray([left(empty(), empty()), right(empty(), singleton_1(item(empty(), singleton_1(button(ofArray([new Option_3(0, [new Color_IColor(2, [])]), new Option_3(18, [(_arg) => {
            cancel(dispatch_1);
            dispatch_1(new Msg(41, []));
        }])]), singleton_1("Cancel"))))))]));
    };
    return (dispatch_3) => ((model_2) => buildPopup(title, body, foot, (dispatch_2, _arg_1) => {
        dispatch_2(new Msg(41, []));
    }, empty(), dispatch_3, model_2));
}

/**
 * Create a popup and add it to the page. Body and foot are static content.
 * Can be closed by the ClosePopup message.
 */
export function closablePopup(title, body, foot, extraStyle, dispatch) {
    dynamicClosablePopup(title, (_arg) => body, (_arg_1) => foot, extraStyle, dispatch);
}

/**
 * As closablePopup but accept functions and return the popup function
 * Can be closed by the ClosePopup message.
 */
export function closablePopupFunc(title, body, foot, extraStyle) {
    return dynamicClosablePopupFunc(title, (dispatch, _arg) => body(dispatch), (dispatch_1, _arg_1) => foot(dispatch_1), extraStyle);
}

/**
 * Create the body of a dialog Popup with only text.
 */
export function dialogPopupBodyOnlyText(before, placeholder, dispatch, model) {
    let props;
    const dialogData = model.PopupDialogData;
    let goodLabel;
    const s = getText(dialogData);
    goodLabel = (StringModule_StartsWithLetter(s) ? true : (s === ""));
    const children_2 = [before(dialogData), input(ofArray([new Option_4(1, [new IInputType(0, [])]), new Option_4(15, [ofArray([new HTMLAttr(55, [true]), new HTMLAttr(148, [false])])]), new Option_4(12, [placeholder]), new Option_4(13, [(arg_4) => {
        dispatch(new Msg(42, [getTextEventValue(arg_4)]));
    }])])), (props = [["style", {
        fontStyle: "Italic",
        color: "Red",
    }], new HTMLAttr(92, [goodLabel])], react_1.createElement("span", keyValueList(props, 1), "Name must start with a letter"))];
    return react_1.createElement("div", {}, ...children_2);
}

/**
 * Create the body of a dialog Popup with only text for sheet description (can have an initial value + allow empty).
 */
export function dialogPopupBodyOnlyTextWithDefaultValue(before, placeholder, currDescr, dispatch, model) {
    const dialogData = model.PopupDialogData;
    const defaultValue = defaultArg(currDescr, "");
    const children = [before(dialogData), input(ofArray([new Option_4(1, [new IInputType(0, [])]), new Option_4(10, [defaultValue]), new Option_4(15, [ofArray([new HTMLAttr(55, [true]), new HTMLAttr(148, [false])])]), new Option_4(12, [placeholder]), new Option_4(13, [(arg_4) => {
        dispatch(new Msg(42, [getTextEventValue(arg_4)]));
    }])]))];
    return react_1.createElement("div", {}, ...children);
}

/**
 * Create the body of a Verilog Editor Popup.
 */
export function dialogVerilogCompBody(before, moduleName, errorDiv, errorList, showExtraErrors, codeToAdd, compileButton, addButton, dispatch, model) {
    let props_3, props_23, children_15, props_5, props_17, children_11, children_9, props_21, children_13, props_25, props_27, props_29, children_21;
    const dialogData = model.PopupDialogData;
    const code = getCode(dialogData);
    let linesNo;
    let matchResult;
    if (code === "") {
        if (codeToAdd != null) {
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
            const c = codeToAdd;
            linesNo = StringModule_Length(filter((ch) => (ch === "\n"), c));
            break;
        }
        default:
            linesNo = StringModule_Length(filter((ch_1) => (ch_1 === "\n"), code));
    }
    let goodLabel;
    const s = defaultArg(moduleName, "");
    goodLabel = (StringModule_StartsWithLetter(s) ? true : (s === ""));
    let renderCERSC;
    const props = new CERSCProps(code, codeToAdd, dispatch, dialogData, compileButton);
    renderCERSC = ((children) => react_1.createElement(CodeEditorReactStatefulComponent, props, ...children));
    const patternInput = showExtraErrors ? ["56%", "38%", false] : ["96%", "0%", true];
    const hide = patternInput[2];
    const errorWidth = patternInput[1];
    const codeEditorWidth = patternInput[0];
    const i = (window.innerHeight) | 0;
    const editorheigth = int32ToString(~~(i / 2.9)) + "px";
    const tableHeigth = int32ToString(~~(i / 1.9)) + "px";
    const props_31 = [["style", {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: new FlexDirection_Option(0, []),
        justifyContent: "flex-start",
    }]];
    const children_23 = [(props_3 = [["style", {
        flex: "2%",
        height: "100%",
    }]], react_1.createElement("div", keyValueList(props_3, 1))), (props_23 = [["style", {
        flex: codeEditorWidth,
        height: "100%",
    }]], (children_15 = [before(dialogData), input(ofArray([new Option_4(1, [new IInputType(0, [])]), new Option_4(15, [ofArray([new HTMLAttr(55, [true]), new HTMLAttr(148, [false])])]), new Option_4(12, ["Component name (equal to module name)"]), new Option_4(8, [defaultArg(moduleName, "")]), new Option_4(4, [true]), new Option_4(13, [(arg_4) => {
        dispatch(new Msg(42, [getTextEventValue(arg_4)]));
    }])])), (props_5 = [["style", {
        fontStyle: "Italic",
        color: "Red",
    }], new HTMLAttr(92, [goodLabel])], react_1.createElement("span", keyValueList(props_5, 1), "Name must start with a letter")), react_1.createElement("br", {}), react_1.createElement("br", {}), react_1.createElement("br", {}), (props_17 = [["style", {
        position: "relative",
    }]], (children_11 = [(children_9 = [react_1.createElement("b", {}, "Verilog Code:")], react_1.createElement("p", {}, ...children_9)), infoHoverableElement], react_1.createElement("div", keyValueList(props_17, 1), ...children_11))), react_1.createElement("br", {}), (props_21 = [["style", {
        position: "relative",
        minHeight: "0px",
        maxHeight: editorheigth,
        fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        fontSize: 16,
        backgroundColor: "#f5f5f5",
        outlineStyle: "solid",
        outlineColor: "Blue",
        overflowY: "auto",
        overflowX: "hidden",
    }]], (children_13 = [getLineCounterDiv(linesNo), errorDiv, renderCERSC(empty_1())], react_1.createElement("div", keyValueList(props_21, 1), ...children_13)))], react_1.createElement("div", keyValueList(props_23, 1), ...children_15))), (props_25 = [["style", {
        flex: "2%",
    }]], react_1.createElement("div", keyValueList(props_25, 1))), (props_27 = [["style", {
        flex: "2%",
    }], new HTMLAttr(92, [hide])], react_1.createElement("div", keyValueList(props_27, 1))), (props_29 = [["style", {
        position: "relative",
        flex: errorWidth,
        minHeight: "0px",
        maxHeight: tableHeigth,
        overflowY: "auto",
        overflowX: "hidden",
    }], new HTMLAttr(92, [hide])], (children_21 = [getErrorTable(errorList, curry2(addButton)(dialogData))], react_1.createElement("div", keyValueList(props_29, 1), ...children_21)))];
    return react_1.createElement("div", keyValueList(props_31, 1), ...children_23);
}

/**
 * Create the body of a dialog Popup with only an int.
 */
export function dialogPopupBodyOnlyInt(beforeInt, intDefault, dispatch) {
    dispatch(new Msg(46, [intDefault]));
    return (model) => {
        const dialogData = model.PopupDialogData;
        const children = [beforeInt(dialogData), react_1.createElement("br", {}), input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e) => {
            preventDefault(e);
        }]), ["style", {
            width: "60px",
        }], new HTMLAttr(55, [true])])]), new Option_4(10, [toText(printf("%d"))(intDefault)]), new Option_4(13, [(arg_8) => {
            dispatch(new Msg(46, [getIntEventValue(arg_8)]));
        }])]))];
        return react_1.createElement("div", {}, ...children);
    };
}

/**
 * Create the body of a dialog Popup with only an int whose value is bounded
 */
export function dialogPopupBodyOnlyBoundedInt(beforeInt, intDefault, minBound, maxBound, dispatch) {
    dispatch(new Msg(46, [intDefault]));
    return (model) => {
        let props_2;
        const dialogData = model.PopupDialogData;
        const errText = defaultArg(map((i) => {
            if ((i < minBound) ? true : (i > maxBound)) {
                return toText(`Must have between ${minBound} and ${maxBound} outputs`);
            }
            else {
                return "";
            }
        }, model.PopupDialogData.Int), "");
        const children_2 = [beforeInt(dialogData), react_1.createElement("br", {}), (props_2 = [["style", {
            color: new HighLightColor(0, []),
        }]], react_1.createElement("span", keyValueList(props_2, 1), errText)), react_1.createElement("br", {}), input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e) => {
            preventDefault(e);
        }]), ["style", {
            width: "60px",
        }], new HTMLAttr(55, [true])])]), new Option_4(10, [toText(printf("%d"))(intDefault)]), new Option_4(13, [(arg_8) => {
            dispatch(new Msg(46, [getIntEventValue(arg_8)]));
        }])]))];
        return react_1.createElement("div", {}, ...children_2);
    };
}

export function dialogPopupBodyNInts(beforeInt, numOutputsDefault, intDefault, maxNumOutputs, dispatch) {
    dispatch(new Msg(46, [numOutputsDefault]));
    dispatch(new Msg(49, [toList(delay(() => collect((matchValue) => singleton(intDefault), rangeDouble(1, 1, numOutputsDefault))))]));
    dispatch(new Msg(50, [toList(delay(() => map_1((x) => (x - 1), rangeDouble(1, 1, numOutputsDefault))))]));
    return (model) => {
        let n, n_3, n_4, n_7, n_8, props_2, props_14, children_2, children_8;
        const dialogData = model.PopupDialogData;
        const errText = defaultArg(map((i) => {
            if ((i < 2) ? true : (i > maxNumOutputs)) {
                return toText(`Must have between 2 and ${maxNumOutputs} outputs`);
            }
            else {
                return "";
            }
        }, model.PopupDialogData.Int), "");
        let newInt;
        const matchValue_1 = getInt(dialogData) | 0;
        if ((n = (matchValue_1 | 0), n < 2)) {
            const n_1 = matchValue_1 | 0;
            const matchValue_2 = dialogData.IntList;
            if (matchValue_2 != null) {
                const widthList = matchValue_2;
                newInt = length(widthList);
            }
            else {
                newInt = numOutputsDefault;
            }
        }
        else {
            const n_2 = matchValue_1 | 0;
            newInt = n_2;
        }
        let setupWidthList;
        const matchValue_3 = dialogData.IntList;
        if (matchValue_3 != null) {
            const outputWidthList = matchValue_3;
            const newNumInputs = newInt | 0;
            const matchValue_4 = length(outputWidthList) | 0;
            if ((n_3 = (matchValue_4 | 0), n_3 > newNumInputs)) {
                const n_5 = matchValue_4 | 0;
                setupWidthList = getSlice(void 0, newNumInputs - 1, outputWidthList);
            }
            else if ((n_4 = (matchValue_4 | 0), n_4 < newNumInputs)) {
                const n_6 = matchValue_4 | 0;
                setupWidthList = append(outputWidthList, initialize(newNumInputs - n_6, (_arg) => 1));
            }
            else {
                setupWidthList = outputWidthList;
            }
        }
        else {
            const setup = getIntList(dialogData, numOutputsDefault, intDefault);
            dispatch(new Msg(49, [setup]));
            setupWidthList = setup;
        }
        let setupLSBList;
        const matchValue_5 = dialogData.IntList2;
        if (matchValue_5 != null) {
            const lsbList = matchValue_5;
            const newNumInputs_1 = newInt | 0;
            const matchValue_6 = length(lsbList) | 0;
            if ((n_7 = (matchValue_6 | 0), n_7 > newNumInputs_1)) {
                const n_9 = matchValue_6 | 0;
                setupLSBList = getSlice(void 0, newNumInputs_1 - 1, lsbList);
            }
            else if ((n_8 = (matchValue_6 | 0), n_8 < newNumInputs_1)) {
                const n_10 = matchValue_6 | 0;
                const matchValue_7 = dialogData.IntList;
                if (matchValue_7 != null) {
                    const widths = matchValue_7;
                    const msbs = map2((lsb, width) => ((lsb + width) - 1), lsbList, widths);
                    setupLSBList = append(lsbList, initialize(newNumInputs_1 - n_10, (x_1) => ((x_1 + max(msbs, {
                        Compare: comparePrimitives,
                    })) + 1)));
                }
                else {
                    throw new Error("No width list in dialogData");
                }
            }
            else {
                setupLSBList = lsbList;
            }
        }
        else {
            const setup_1 = getIntList2(dialogData, numOutputsDefault, 0);
            dispatch(new Msg(50, [setup_1]));
            setupLSBList = setup_1;
        }
        if (!equals(dialogData.IntList, setupWidthList)) {
            dispatch(new Msg(49, [setupWidthList]));
        }
        if (!equals(dialogData.IntList2, setupLSBList)) {
            dispatch(new Msg(50, [setupLSBList]));
        }
        const children_11 = [beforeInt(dialogData), react_1.createElement("br", {}), (props_2 = [["style", {
            color: new HighLightColor(0, []),
        }]], react_1.createElement("span", keyValueList(props_2, 1), errText)), react_1.createElement("br", {}), input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e) => {
            preventDefault(e);
        }]), ["style", {
            width: "60px",
        }], new HTMLAttr(55, [true])])]), new Option_4(10, [toText(printf("%d"))(numOutputsDefault)]), new Option_4(13, [(arg_12) => {
            dispatch(new Msg(46, [getIntEventValue(arg_12)]));
        }])])), react_1.createElement("br", {}), react_1.createElement("br", {}), "What is the width and least significant bit (LSB) number of each output?", react_1.createElement("br", {}), react_1.createElement("br", {}), (props_14 = [["style", {
            display: "flex",
        }]], (children_2 = [label(singleton_1(new Option_5(3, [singleton_1(["style", {
            marginLeft: "120px",
            marginRight: "15px",
        }])])), singleton_1("Width")), label(singleton_1(new Option_5(3, [singleton_1(["style", {
            marginLeft: "15px",
        }])])), singleton_1("LSB"))], react_1.createElement("div", keyValueList(props_14, 1), ...children_2))), (children_8 = mapIndexed2((index, defaultWidthValue, defaultLSBValue) => {
            let props_16, children_4, setWidth, setLSB;
            const props_24 = [["style", {
                display: "flex",
                alignItems: "center",
            }]];
            const children_6 = [(props_16 = [["style", {
                width: "105px",
                marginRight: "10px",
            }]], (children_4 = [toText(printf("Output Port %d:"))(index)], react_1.createElement("label", keyValueList(props_16, 1), ...children_4))), input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e_1) => {
                preventDefault(e_1);
            }]), ["style", {
                width: "60px",
            }]])]), new Option_4(10, [toText(printf("%d"))(defaultWidthValue)]), new Option_4(13, [(setWidth = ((newWidth) => mapIndexed((i_1, x_3) => {
                if (i_1 === index) {
                    return newWidth | 0;
                }
                else {
                    return x_3 | 0;
                }
            }, setupWidthList)), (arg_21) => {
                dispatch(new Msg(49, [setWidth(getIntEventValue(arg_21))]));
            })])])), input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e_2) => {
                preventDefault(e_2);
            }]), ["style", {
                width: "60px",
                marginLeft: "10px",
            }]])]), new Option_4(10, [toText(printf("%d"))(defaultLSBValue)]), new Option_4(13, [(setLSB = ((newLSB) => mapIndexed((i_2, x_4) => {
                if (i_2 === index) {
                    return newLSB | 0;
                }
                else {
                    return x_4 | 0;
                }
            }, setupLSBList)), (arg_29) => {
                dispatch(new Msg(50, [setLSB(getIntEventValue(arg_29))]));
            })])])), react_1.createElement("br", {}), react_1.createElement("hr", {}), react_1.createElement("br", {})];
            return react_1.createElement("div", keyValueList(props_24, 1), ...children_6);
        }, setupWidthList, setupLSBList), react_1.createElement("div", {}, ...children_8)), react_1.createElement("br", {}), react_1.createElement("br", {})];
        return react_1.createElement("div", {}, ...children_11);
    };
}

/**
 * Create the body of a dialog Popup with two ints.
 */
export function dialogPopupBodyTwoInts(beforeInt1, beforeInt2, intDefault1, intDefault2, width2, dispatch) {
    const setPopupTwoInts = (tupledArg, n) => {
        const whichInt = tupledArg[0];
        const optText = tupledArg[1];
        dispatch(new Msg(48, [[n, whichInt, optText]]));
    };
    setPopupTwoInts([new IntMode(0, []), void 0], toInt64(fromInt32(intDefault1)));
    setPopupTwoInts([new IntMode(1, []), void 0], intDefault2);
    return (model) => {
        let f2_1;
        const dialogData = model.PopupDialogData;
        const children = [beforeInt1(dialogData), react_1.createElement("br", {}), input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e) => {
            preventDefault(e);
        }]), ["style", {
            width: "60px",
        }], new HTMLAttr(55, [true])])]), new Option_4(10, [toText(printf("%d"))(intDefault1)]), new Option_4(13, [(f2_1 = curry2(setPopupTwoInts)([new IntMode(0, []), void 0]), (arg_4) => {
            f2_1(toInt64(fromInt32(getIntEventValue(arg_4))));
        })])])), react_1.createElement("br", {}), beforeInt2(dialogData), react_1.createElement("br", {}), input(ofArray([new Option_4(1, [new IInputType(0, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e_1) => {
            preventDefault(e_1);
        }]), ["style", {
            width: width2,
        }], new HTMLAttr(55, [true])])]), new Option_4(10, [toText(printf("%d"))(intDefault2)]), new Option_4(13, [(ev) => {
            const text = getTextEventValue(ev);
            const n_1 = getInt64EventValue(ev);
            setPopupTwoInts([new IntMode(1, []), text], n_1);
        }])]))];
        return react_1.createElement("div", {}, ...children);
    };
}

/**
 * Create the body of a dialog Popup with text and two ints.
 * focus: which of the boxes has initial focus (= 1,2,3)
 */
export function dialogPopupBodyTextAndTwoInts(focus, beforeText, textPlaceholder, beforeInt1, beforeInt2, intDefault1, intDefault2, dispatch) {
    const setPopupTwoInts = (tupledArg, n) => {
        const whichInt = tupledArg[0];
        const optText = tupledArg[1];
        dispatch(new Msg(48, [[n, whichInt, optText]]));
    };
    setPopupTwoInts([new IntMode(0, []), void 0], toInt64(fromInt32(intDefault1)));
    setPopupTwoInts([new IntMode(1, []), void 0], intDefault2);
    return (model) => {
        let f2_4;
        const dialogData = model.PopupDialogData;
        const children = [beforeText(dialogData), react_1.createElement("br", {}), input(ofArray([new Option_4(1, [new IInputType(0, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e) => {
            preventDefault(e);
        }]), new HTMLAttr(55, [focus === 1]), new HTMLAttr(148, [false])])]), new Option_4(12, [textPlaceholder]), new Option_4(13, [(arg_5) => {
            dispatch(new Msg(42, [getTextEventValue(arg_5)]));
        }])])), beforeInt1(dialogData), react_1.createElement("br", {}), input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e_1) => {
            preventDefault(e_1);
        }]), ["style", {
            width: "60px",
        }], new HTMLAttr(55, [focus === 2])])]), new Option_4(10, [toText(printf("%d"))(intDefault1)]), new Option_4(13, [(f2_4 = curry2(setPopupTwoInts)([new IntMode(0, []), void 0]), (arg_9) => {
            f2_4(toInt64(fromInt32(getIntEventValue(arg_9))));
        })])])), react_1.createElement("br", {}), beforeInt2(dialogData), react_1.createElement("br", {}), input(ofArray([new Option_4(1, [new IInputType(0, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e_2) => {
            preventDefault(e_2);
        }]), ["style", {
            width: "60px",
        }], new HTMLAttr(55, [focus === 3])])]), new Option_4(10, [toText(printf("%d"))(intDefault2)]), new Option_4(13, [(ev) => {
            const text = getTextEventValue(ev);
            const n_1 = getInt64EventValue(ev);
            setPopupTwoInts([new IntMode(1, []), text], n_1);
        }])]))];
        return react_1.createElement("div", {}, ...children);
    };
}

/**
 * Create the body of a dialog Popup with both text and int.
 */
export function dialogPopupBodyTextAndInt(beforeText, placeholder, beforeInt, intDefault, dispatch) {
    dispatch(new Msg(46, [intDefault]));
    return (model) => {
        let props;
        const dialogData = model.PopupDialogData;
        let goodLabel;
        const s = getText(dialogData);
        goodLabel = (StringModule_StartsWithLetter(s) ? true : (s === ""));
        const children_2 = [beforeText(dialogData), input(ofArray([new Option_4(1, [new IInputType(0, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e) => {
            preventDefault(e);
        }]), new HTMLAttr(55, [true]), new HTMLAttr(148, [false])])]), new Option_4(12, [placeholder]), new Option_4(13, [(arg_6) => {
            dispatch(new Msg(42, [getTextEventValue(arg_6)]));
        }])])), (props = [["style", {
            fontStyle: "Italic",
            color: "Red",
        }], new HTMLAttr(92, [goodLabel])], react_1.createElement("span", keyValueList(props, 1), "Name must start with a letter")), react_1.createElement("br", {}), react_1.createElement("br", {}), beforeInt(dialogData), react_1.createElement("br", {}), input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e_1) => {
            preventDefault(e_1);
        }]), ["style", {
            width: "60px",
        }]])]), new Option_4(10, [toText(printf("%d"))(intDefault)]), new Option_4(13, [(arg_13) => {
            dispatch(new Msg(46, [getIntEventValue(arg_13)]));
        }])]))];
        return react_1.createElement("div", {}, ...children_2);
    };
}

/**
 * Create the body of a dialog Popup with both text and int.
 */
export function dialogPopupBodyIntAndText(beforeText, placeholder, beforeInt, intDefault, dispatch) {
    dispatch(new Msg(46, [intDefault]));
    return (model) => {
        const dialogData = model.PopupDialogData;
        const children = [beforeInt(dialogData), react_1.createElement("br", {}), input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e) => {
            preventDefault(e);
        }]), ["style", {
            width: "60px",
        }]])]), new Option_4(10, [toText(printf("%d"))(intDefault)]), new Option_4(13, [(arg_8) => {
            dispatch(new Msg(46, [getIntEventValue(arg_8)]));
        }])])), react_1.createElement("br", {}), react_1.createElement("br", {}), beforeText(model), input(ofArray([new Option_4(1, [new IInputType(0, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e_1) => {
            preventDefault(e_1);
        }]), new HTMLAttr(55, [true]), new HTMLAttr(148, [false])])]), new Option_4(12, [placeholder]), new Option_4(13, [(arg_13) => {
            dispatch(new Msg(42, [getTextEventValue(arg_13)]));
        }])]))];
        return react_1.createElement("div", {}, ...children);
    };
}

/**
 * Create the body of a memory dialog popup: asks for AddressWidth and
 * WordWidth, two integers.
 */
export function dialogPopupBodyMemorySetup(intDefault, dispatch, model) {
    const dialogData = model.PopupDialogData;
    let setup_1;
    const matchValue = dialogData.MemorySetup;
    if (matchValue != null) {
        const nameOpt = matchValue[3];
        const n2 = matchValue[1] | 0;
        const n1 = matchValue[0] | 0;
        const init = matchValue[2];
        setup_1 = [n1, n2, new InitMemData(0, []), void 0];
    }
    else {
        const setup = getMemorySetup(dialogData, intDefault);
        dispatch(new Msg(52, [setup]));
        setup_1 = setup;
    }
    if (!equals(dialogData.MemorySetup, setup_1)) {
        dispatch(new Msg(52, [setup_1]));
    }
    const wordWidth = setup_1[1] | 0;
    const source = setup_1[2];
    const errorOpt = setup_1[3];
    const addressWidth = setup_1[0] | 0;
    let dataSetupMess;
    switch (source.tag) {
        case 0: {
            dataSetupMess = "You will be able to set up memory content later from the component Properties menu";
            break;
        }
        case 1: {
            const x = source.fields[0];
            dataSetupMess = (`Memory content is fixed by the '${x}.ram' file in the project directory`);
            break;
        }
        case 2: {
            const x_1 = source.fields[0];
            dataSetupMess = (`You will be able to set up memory content later from the component Properties menu, it will be written to the '${x_1}.ram file in the project directory`);
            break;
        }
        case 3: {
            const x_2 = source.fields[0];
            dataSetupMess = "";
            break;
        }
        default:
            dataSetupMess = "Memory initial data is determined by the requested multiplication";
    }
    const children_2 = toList(delay(() => append_1(singleton("How many bits should be used to address the data in memory?"), delay(() => append_1(singleton(react_1.createElement("br", {})), delay(() => {
        let arg_1;
        return append_1(singleton((arg_1 = pow2int64(addressWidth), toText(printf("%d bits yield %d memory locations."))(addressWidth)(arg_1))), delay(() => append_1(singleton(react_1.createElement("br", {})), delay(() => append_1(singleton(react_1.createElement("br", {})), delay(() => append_1(singleton(input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e) => {
            preventDefault(e);
        }]), ["style", {
            width: "60px",
        }], new HTMLAttr(55, [true])])]), new Option_4(10, [toText(printf("%d"))(addressWidth)]), new Option_4(13, [(arg_4) => {
            dispatch(new Msg(52, [[getIntEventValue(arg_4), wordWidth, source, void 0]]));
        }])]))), delay(() => append_1(singleton(react_1.createElement("br", {})), delay(() => append_1(singleton(react_1.createElement("br", {})), delay(() => append_1(singleton("How many bits should each memory word contain?"), delay(() => append_1(singleton(react_1.createElement("br", {})), delay(() => append_1(singleton(react_1.createElement("br", {})), delay(() => append_1(singleton(input(ofArray([new Option_4(1, [new IInputType(7, [])]), new Option_4(15, [ofArray([new DOMAttr(2, [(e_1) => {
            preventDefault(e_1);
        }]), ["style", {
            width: "60px",
        }]])]), new Option_4(10, [toText(printf("%d"))(wordWidth)]), new Option_4(13, [(arg_7) => {
            dispatch(new Msg(52, [[addressWidth, getIntEventValue(arg_7), source, void 0]]));
        }])]))), delay(() => append_1(singleton(react_1.createElement("br", {})), delay(() => append_1(singleton(react_1.createElement("br", {})), delay(() => append_1(singleton(dataSetupMess), delay(() => append_1(singleton(react_1.createElement("br", {})), delay(() => {
            let props_20;
            const matchValue_1 = errorOpt;
            if (matchValue_1 != null) {
                const msg = matchValue_1;
                return singleton((props_20 = [["style", {
                    color: "red",
                }]], react_1.createElement("div", keyValueList(props_20, 1), msg)));
            }
            else {
                return singleton(react_1.createElement("br", {}));
            }
        }))))))))))))))))))))))))))));
    }))))));
    return react_1.createElement("div", {}, ...children_2);
}

/**
 * Popup with an input textbox and two buttons.
 * The text is reflected in Model.PopupDialogText.
 */
export function dialogPopup(title, body, buttonText, buttonAction, isDisabled, extraStyle, dispatch) {
    const foot = (model) => {
        const dialogData = model.PopupDialogData;
        return level(singleton_1(new Level_Option(0, [singleton_1(["style", {
            width: "100%",
        }])])), ofArray([left(empty(), empty()), right(empty(), ofArray([item(empty(), singleton_1(button(ofArray([new Option_3(0, [new Color_IColor(2, [])]), new Option_3(18, [(_arg) => {
            dispatch(new Msg(41, []));
            dispatch(new Msg(83, []));
        }])]), singleton_1("Cancel")))), item(empty(), singleton_1(button(ofArray([new Option_3(16, [isDisabled(model)]), new Option_3(0, [new Color_IColor(4, [])]), new Option_3(18, [(_arg_1) => {
            buttonAction(model);
        }])]), singleton_1(buttonText))))]))]));
    };
    dynamicClosablePopup(title, body, foot, extraStyle, dispatch);
}

export function dialogPopupRefresh(title, body, extraStyle, dispatch) {
    const foot = (model) => {
        const dialogData = model.PopupDialogData;
        return level(singleton_1(new Level_Option(0, [singleton_1(["style", {
            width: "100%",
        }])])), ofArray([left(empty(), empty()), right(empty(), singleton_1(item(empty(), singleton_1(button(ofArray([new Option_3(0, [new Color_IColor(2, [])]), new Option_3(18, [(_arg) => {
            dispatch(new Msg(41, []));
            dispatch(new Msg(83, []));
        }])]), singleton_1("Cancel"))))))]));
    };
    dynamicClosablePopup(title, body, foot, extraStyle, dispatch);
}

/**
 * Popup with an input textbox and two buttons.
 * The text is reflected in Model.PopupDialogText.
 */
export function dialogVerilogPopup(title, body, saveUpdateText, noErrors, showingExtraInfo, saveButtonAction, moreInfoButton, isDisabled, extraStyle, dispatch) {
    const foot = (model) => {
        const dialogData = model.PopupDialogData;
        const compileButtonText = noErrors ? "Compiled" : (showingExtraInfo ? "Hide Info" : "More Info");
        const compileButtonColor = noErrors ? (new Color_IColor(5, [])) : (new Color_IColor(8, []));
        return level(singleton_1(new Level_Option(0, [singleton_1(["style", {
            width: "100%",
        }])])), ofArray([left(empty(), empty()), right(empty(), ofArray([item(empty(), singleton_1(button(ofArray([new Option_3(0, [new Color_IColor(2, [])]), new Option_3(18, [(_arg) => {
            dispatch(new Msg(41, []));
            dispatch(new Msg(83, []));
        }])]), singleton_1("Cancel")))), item(empty(), singleton_1(button(ofArray([new Option_3(16, [noErrors]), new Option_3(0, [compileButtonColor]), new Option_3(18, [(_arg_1) => {
            moreInfoButton(dialogData);
        }])]), singleton_1(compileButtonText)))), item(empty(), singleton_1(button(ofArray([new Option_3(16, [isDisabled(dialogData)]), new Option_3(0, [new Color_IColor(4, [])]), new Option_3(18, [(_arg_2) => {
            saveButtonAction(dialogData);
        }])]), singleton_1(saveUpdateText))))]))]));
    };
    dynamicClosablePopup(title, body, foot, extraStyle, dispatch);
}

export function staticButtonFoot(buttonAction, buttonText, dispatch) {
    return level(singleton_1(new Level_Option(0, [singleton_1(["style", {
        width: "100%",
    }])])), ofArray([left(empty(), empty()), right(empty(), ofArray([item(empty(), singleton_1(button(ofArray([new Option_3(0, [new Color_IColor(2, [])]), new Option_3(18, [(_arg) => {
        dispatch(new Msg(41, []));
    }])]), singleton_1("Cancel")))), item(empty(), singleton_1(button(ofArray([new Option_3(0, [new Color_IColor(4, [])]), new Option_3(18, [buttonAction])]), singleton_1(buttonText))))]))]));
}

/**
 * A static confirmation popup.
 */
export function confirmationPopup(title, buttonText, body, buttonAction, dispatch) {
    const foot = staticButtonFoot((_arg) => {
        buttonAction();
    }, buttonText, dispatch);
    closablePopup(title, body, foot, empty(), dispatch);
}

export function dynamicConfirmationPopup(title, buttonText, body, buttonActionOpt, dispatch) {
    const buttonAction = defaultArg(buttonActionOpt, () => {
        dispatch(new Msg(41, []));
    });
    const foot = staticButtonFoot((_arg_1) => {
        buttonAction();
    }, buttonText, dispatch);
    dynamicClosablePopup(title, body, (_arg_2) => foot, empty(), dispatch);
}

/**
 * A static choice dialog popup returning the popup function
 */
export function choicePopupFunc(title, body, buttonTrueText, buttonFalseText, buttonAction) {
    const foot = (dispatch) => level(singleton_1(new Level_Option(0, [singleton_1(["style", {
        width: "100%",
    }])])), ofArray([left(empty(), empty()), right(empty(), ofArray([item(empty(), singleton_1(button(ofArray([new Option_3(0, [new Color_IColor(2, [])]), new Option_3(18, [curry3(buttonAction)(false)(dispatch)])]), singleton_1(buttonFalseText)))), item(empty(), singleton_1(button(ofArray([new Option_3(0, [new Color_IColor(4, [])]), new Option_3(18, [curry3(buttonAction)(true)(dispatch)])]), singleton_1(buttonTrueText))))]))]));
    return closablePopupFunc(title, body, foot, empty());
}

/**
 * A static choice dialog popup.
 */
export function choicePopup(title, body, buttonTrueText, buttonFalseText, buttonAction, dispatch) {
    const popup = choicePopupFunc(title, (_arg) => body, buttonTrueText, buttonFalseText, uncurry3((bool) => ((dispatch_1) => curry2(buttonAction)(bool))));
    return dispatch(new Msg(39, [uncurry2(popup)]));
}

//# sourceMappingURL=PopupHelpers.fs.js.map
