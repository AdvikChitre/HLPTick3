import { WaveSimModel, Model, DragMode, TopMenu, Notifications, PopupDialogData, SimSubTab, RightTab, UserData as UserData_1, Msg } from "../Model/ModelType.fs.js";
import { SheetT_CursorType__Text, SymbolT_ThemeType, BusWireT_WireType, SheetT_KeyboardMsg, SheetT_Msg } from "../Model/DrawModelType.fs.js";
import { empty as empty_2, singleton as singleton_1, append, delay, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { Option, button } from "../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { rightSectionStyle, canvasVisibleStyleList, minEditorWidth, minViewerWidth, getHeaderHeight, belowHeaderStyle, Constants_dividerBarWidth, rightSectionWidthViewerDefault, canvasSmallMenuStyle, canvasSmallButtonStyle } from "./Style.fs.js";
import { Prop, CSSProp, HTMLAttr, DOMAttr } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { append as append_1, empty as empty_1, singleton, ofArray } from "../fable_modules/fable-library.4.1.4/List.js";
import { Modifier_IModifier, Color_IColor } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import * as react from "react";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { init as init_1 } from "../DrawBlock/SheetUpdate.fs.js";
import { empty } from "../fable_modules/fable-library.4.1.4/Map.js";
import { createAtom, defaultOf, equals, comparePrimitives } from "../fable_modules/fable-library.4.1.4/Util.js";
import { tTTypeInit } from "./TruthTable/TruthTableUpdate.fs.js";
import { h4 } from "../fable_modules/Fulma.2.16.0/Elements/Heading.fs.js";
import { viewTruthTable } from "./TruthTable/TruthTableView.fs.js";
import { viewWaveSim } from "./WaveSim/WaveSim.fs.js";
import { viewSimulation } from "./SimulationView.fs.js";
import { viewSelectedComponent } from "./SelectedComponentView.fs.js";
import { Tab_Option, tab, Option as Option_1, tabs } from "../fable_modules/Fulma.2.16.0/Components/Tabs.fs.js";
import { viewBuild } from "./BuildView.fs.js";
import { viewCatalogue } from "./CatalogueView.fs.js";
import { getTimeMs } from "../Common/TimeHelpers.fs.js";
import { extractConnections } from "../DrawBlock/BusWire.fs.js";
import { extractComponents } from "../DrawBlock/SymbolUpdate.fs.js";
import { min, max } from "../fable_modules/fable-library.4.1.4/Double.js";
import { updateWSModel, getWSModel } from "./WaveSim/../ModelHelpers.fs.js";
import { Constants_valuesColWidth, valuesColumnSize, Constants_scrollBarWidth, Constants_rightMargin, Constants_leftMargin, calcNamesColWidth } from "./WaveSim/./WaveSimStyle.fs.js";
import { Constants_dividerBarWidth as Constants_dividerBarWidth_1 } from "./WaveSim/../Style.fs.js";
import { singleWaveWidth } from "./WaveSim/./WaveSimHelpers.fs.js";
import { printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { viewTopMenu, viewNoProjectMenu } from "./TopMenuView.fs.js";
import { viewPopup } from "./UIPopups.fs.js";
import { view } from "../DrawBlock/SheetDisplay.fs.js";
import { viewNotifications } from "./Notifications.fs.js";

export function viewOnDiagramButtons(model, dispatch) {
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const dispatch_1 = (arg_1) => {
        sheetDispatch(new SheetT_Msg(2, [arg_1]));
    };
    const children = toList(delay(() => {
        const canvasBut = (func, label) => button(ofArray([new Option(17, [ofArray([canvasSmallButtonStyle, new DOMAttr(40, [func])])]), new Option(20, [ofArray([new Modifier_IModifier(1, [new Color_IColor(2, [])]), new Modifier_IModifier(0, [new Color_IColor(6, [])])])])]), singleton(label));
        return append(singleton_1(canvasBut((_arg) => {
            dispatch_1(new SheetT_KeyboardMsg(3, []));
        }, "< undo")), delay(() => append(singleton_1(canvasBut((_arg_1) => {
            dispatch_1(new SheetT_KeyboardMsg(4, []));
        }, "redo >")), delay(() => append(singleton_1(canvasBut((_arg_2) => {
            dispatch_1(new SheetT_KeyboardMsg(1, []));
        }, "copy")), delay(() => singleton_1(canvasBut((_arg_3) => {
            dispatch_1(new SheetT_KeyboardMsg(2, []));
        }, "paste"))))))));
    }));
    return react.createElement("div", keyValueList([canvasSmallMenuStyle], 1), ...children);
}

export function init() {
    const UserData = new UserData_1(void 0, void 0, void 0, true, new BusWireT_WireType(0, []), new SymbolT_ThemeType(2, []));
    const Sheet = init_1()[0];
    return new Model(UserData, empty({
        Compare: comparePrimitives,
    }), void 0, empty_1(), void 0, Sheet, false, 0, void 0, [empty_1(), empty_1()], [empty_1(), empty_1()], [empty_1(), empty_1()], 1, void 0, void 0, void 0, tTTypeInit, new RightTab(1, []), new SimSubTab(0, []), [[empty_1(), empty_1()], empty_1()], [empty_1(), empty_1()], void 0, false, void 0, void 0, void 0, new PopupDialogData(void 0, void 0, empty({
        Compare: comparePrimitives,
    }), void 0, "", void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, empty_1(), false, void 0, void 0), new Notifications(void 0, void 0, void 0, void 0, void 0, void 0), new TopMenu(0, []), new DragMode(1, []), rightSectionWidthViewerDefault, false, empty_1(), void 0, false, void 0);
}

export function makeSelectionChangeMsg(model, dispatch, ev) {
    dispatch(new Msg(75, []));
}

export function viewSimSubTab(canvasState_, canvasState__1, model, dispatch) {
    const canvasState = [canvasState_, canvasState__1];
    const matchValue = model.SimSubTabVisible;
    switch (matchValue.tag) {
        case 1: {
            const props_2 = [["style", {
                width: "90%",
                marginLeft: "5%",
                marginTop: "15px",
            }]];
            const children_2 = [h4(empty_1())(singleton("Truth Tables")), viewTruthTable(canvasState[0], canvasState[1], model, dispatch)];
            return react.createElement("div", keyValueList(props_2, 1), ...children_2);
        }
        case 2: {
            const props_4 = [["style", {
                width: "100%",
                height: "calc(100% - 72px)",
                marginTop: "15px",
            }]];
            const children_4 = [viewWaveSim(canvasState[0], canvasState[1], model, dispatch)];
            return react.createElement("div", keyValueList(props_4, 1), ...children_4);
        }
        default: {
            const props = [["style", {
                width: "90%",
                marginLeft: "5%",
                marginTop: "15px",
            }]];
            const children = [h4(empty_1())(singleton("Step Simulation")), viewSimulation(canvasState[0], canvasState[1], model, dispatch)];
            return react.createElement("div", keyValueList(props, 1), ...children);
        }
    }
}

function viewRightTab(canvasState_, canvasState__1, model, dispatch) {
    let props_14, props;
    const canvasState = [canvasState_, canvasState__1];
    const pane = model.RightPaneTabVisible;
    switch (pane.tag) {
        case 0: {
            const props_4 = [["style", {
                width: "90%",
                marginLeft: "5%",
                marginTop: "15px",
            }]];
            const children_4 = [h4(empty_1())(singleton("Component properties")), viewSelectedComponent(model, dispatch)];
            return react.createElement("div", keyValueList(props_4, 1), ...children_4);
        }
        case 2: {
            const subtabs = tabs(ofArray([new Option_1(6, []), new Option_1(3, []), new Option_1(7, ["rightSectionTabs"]), new Option_1(8, [singleton(["style", {
                margin: 0,
            }])])]), [tab(singleton(new Tab_Option(0, [equals(model.SimSubTabVisible, new SimSubTab(0, []))])), singleton(react.createElement("a", {
                onClick: (_arg) => {
                    dispatch(new Msg(29, [new SimSubTab(0, [])]));
                },
            }, "Step Simulation"))), tab(singleton(new Tab_Option(0, [equals(model.SimSubTabVisible, new SimSubTab(1, []))])), singleton(react.createElement("a", {
                onClick: (_arg_1) => {
                    dispatch(new Msg(29, [new SimSubTab(1, [])]));
                },
            }, "Truth Tables"))), tab(singleton(new Tab_Option(0, [equals(model.SimSubTabVisible, new SimSubTab(2, []))])), singleton(react.createElement("a", {
                onClick: (_arg_2) => {
                    dispatch(new Msg(29, [new SimSubTab(2, [])]));
                },
            }, "Wave Simulation")))]);
            const props_12 = [new HTMLAttr(99, ["RightSelection2"]), ["style", {
                height: "100%",
            }]];
            const children_12 = [subtabs, viewSimSubTab(canvasState[0], canvasState[1], model, dispatch)];
            return react.createElement("div", keyValueList(props_12, 1), ...children_12);
        }
        case 3: {
            const props_16 = [["style", {
                width: "90%",
                marginLeft: "5%",
                marginTop: "15px",
            }]];
            const children_16 = [h4(empty_1())(singleton("Build")), (props_14 = [["style", {
                marginBottom: "15px",
            }]], react.createElement("div", keyValueList(props_14, 1), "Compile your design and upload it to one of the supported devices")), viewBuild(model, dispatch)];
            return react.createElement("div", keyValueList(props_16, 1), ...children_16);
        }
        default: {
            const props_2 = [["style", {
                width: "90%",
                marginLeft: "5%",
                marginTop: "15px",
                height: "calc(100%-100px)",
            }]];
            const children_2 = [h4(empty_1())(singleton("Catalogue")), (props = [["style", {
                marginBottom: "15px",
                height: "100%",
                overflowY: "auto",
            }]], react.createElement("div", keyValueList(props, 1), "Click on a component to add it to the diagram. Hover on components for details.")), viewCatalogue(model, dispatch)];
            return react.createElement("div", keyValueList(props_2, 1), ...children_2);
        }
    }
}

/**
 * Draggable vertivcal bar used to divide Wavesim window from Diagram window
 */
export function dividerbar(model, dispatch) {
    const isDraggable = equals(model.RightPaneTabVisible, new RightTab(2, [])) && (equals(model.SimSubTabVisible, new SimSubTab(2, [])) ? true : equals(model.SimSubTabVisible, new SimSubTab(1, [])));
    let heightAttr;
    const rightSection = document.getElementById("RightSection");
    heightAttr = ((rightSection == null) ? (new CSSProp(189, ["100%"])) : (new CSSProp(189, ["100%"])));
    const variableStyle = isDraggable ? ofArray([new CSSProp(21, ["grey"]), new CSSProp(123, ["ew-resize"]), new CSSProp(395, [Constants_dividerBarWidth])]) : ofArray([new CSSProp(21, ["lightgray"]), new CSSProp(395, ["2px"]), new CSSProp(189, ["100%"])]);
    const commonStyle = ofArray([heightAttr, new CSSProp(144, ["left"])]);
    const props = [["style", keyValueList(append_1(commonStyle, variableStyle), 1)], new DOMAttr(51, [(ev) => {
        const model_1 = model;
        const dispatch_1 = dispatch;
        const ev_1 = ev;
        makeSelectionChangeMsg(model_1, dispatch_1, ev_1);
        const matchValue = model_1.DividerDragMode;
        if (matchValue.tag === 1) {
            dispatch_1(new Msg(70, [new DragMode(0, [~~ev_1.clientX])]));
        }
    }])];
    return react.createElement("div", keyValueList(props, 1));
}

export function viewRightTabs(canvasState_, canvasState__1, model, dispatch) {
    let props_8, children_8;
    const canvasState = [canvasState_, canvasState__1];
    let scrollType;
    if (equals(model.RightPaneTabVisible, new RightTab(4, []))) {
        dispatch(new Msg(28, [new RightTab(1, [])]));
        scrollType = "clip";
    }
    else {
        scrollType = "auto";
    }
    const buildTab = model.BuildVisible ? tab(singleton(new Tab_Option(0, [equals(model.RightPaneTabVisible, new RightTab(3, []))])), singleton(react.createElement("a", {
        onClick: (_arg) => {
            if (!equals(model.RightPaneTabVisible, new RightTab(2, []))) {
                dispatch(new Msg(28, [new RightTab(3, [])]));
            }
        },
    }, "Build"))) : defaultOf();
    const props_10 = [new HTMLAttr(99, ["RightSelection"]), ["style", {
        height: "100%",
        overflowY: "auto",
    }]];
    const children_10 = [tabs(ofArray([new Option_1(6, []), new Option_1(3, []), new Option_1(7, ["rightSectionTabs"]), new Option_1(8, [singleton(["style", {
        margin: 0,
    }])])]), [tab(singleton(new Tab_Option(0, [equals(model.RightPaneTabVisible, new RightTab(1, []))])), singleton(react.createElement("a", {
        onClick: (_arg_1) => {
            const target = equals(model.RightPaneTabVisible, new RightTab(2, [])) ? (new RightTab(4, [])) : (new RightTab(1, []));
            dispatch(new Msg(28, [target]));
        },
    }, "Catalogue"))), tab(singleton(new Tab_Option(0, [equals(model.RightPaneTabVisible, new RightTab(0, []))])), singleton(react.createElement("a", {
        onClick: (_arg_2) => {
            dispatch(new Msg(28, [new RightTab(0, [])]));
        },
    }, "Properties"))), tab(singleton(new Tab_Option(0, [equals(model.RightPaneTabVisible, new RightTab(2, []))])), singleton(react.createElement("a", {
        onClick: (_arg_3) => {
            dispatch(new Msg(28, [new RightTab(2, [])]));
        },
    }, "Simulations"))), buildTab]), (props_8 = [new HTMLAttr(99, ["TabBody"]), belowHeaderStyle("36px"), ["style", {
        overflowY: scrollType,
    }]], (children_8 = [viewRightTab(canvasState[0], canvasState[1], model, dispatch)], react.createElement("div", keyValueList(props_8, 1), ...children_8)))];
    return react.createElement("div", keyValueList(props_10, 1), ...children_10);
}

export let testState = createAtom([empty_1(), empty_1()]);

export let lastDragModeOn = createAtom(false);

/**
 * Top-level application view: as react components that create a react virtual-DOM
 */
export function displayView(model, dispatch) {
    const time = (~~getTimeMs() % 10000) | 0;
    const matchValue = ~~self.innerWidth | 0;
    const windowY = ~~self.innerHeight | 0;
    const windowX = matchValue | 0;
    const headerHeight = getHeaderHeight;
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const cursorText = SheetT_CursorType__Text(model.Sheet.CursorType);
    const topCursorText = (model.Sheet.CursorType.tag === 3) ? "wait" : "";
    const conns = extractConnections(model.Sheet.Wire);
    const comps = extractComponents(model.Sheet.Wire.Symbol);
    const canvasState = [comps, conns];
    const matchValue_3 = model.Spinner;
    if (matchValue_3 == null) {
    }
    else {
        const fn = matchValue_3;
        dispatch(new Msg(36, [fn]));
    }
    const props_4 = [new HTMLAttr(99, ["WholeApp"]), new Prop(0, [cursorText]), new DOMAttr(54, [(ev) => {
        if (ev.buttons === 1) {
            dispatch(new Msg(75, []));
        }
        const matchValue_4 = model.DividerDragMode;
        const matchValue_5 = ev.buttons;
        let matchResult, pos, pos_1;
        if (matchValue_4.tag === 0) {
            if (matchValue_5 === 1) {
                matchResult = 0;
                pos = matchValue_4.fields[0];
            }
            else {
                matchResult = 2;
            }
        }
        else {
            matchResult = 2;
        }
        switch (matchResult) {
            case 0: {
                const newWidth = ((model.WaveSimViewerWidth - ~~ev.clientX) + pos) | 0;
                let w;
                const e_2 = max(minViewerWidth, newWidth) | 0;
                w = min(windowX - minEditorWidth(), e_2);
                dispatch(new Msg(70, [new DragMode(0, [(~~ev.clientX - w) + newWidth])]));
                dispatch(new Msg(72, [w]));
                break;
            }
            case 1: {
                const newWidth_1 = ((model.WaveSimViewerWidth - ~~ev.clientX) + pos_1) | 0;
                let w_1;
                const e_5 = max(minViewerWidth, newWidth_1) | 0;
                w_1 = min(windowX - minEditorWidth(), e_5);
                const dispatch_1 = dispatch;
                dispatch_1(new Msg(36, [(model_1_1) => {
                    const w_3 = w_1 | 0;
                    const model_2 = model_1_1;
                    const wsModel = getWSModel(model_2);
                    const namesColWidth = calcNamesColWidth(wsModel) | 0;
                    const otherDivWidths = ((((Constants_leftMargin + Constants_rightMargin) + Constants_dividerBarWidth_1) + Constants_scrollBarWidth) + 2) | 0;
                    const valuesColumnWidth = valuesColumnSize(wsModel)[0] | 0;
                    const waveColWidth = (((w_3 - otherDivWidths) - namesColWidth) - valuesColumnWidth) | 0;
                    const wholeCycles = max(1, ~~(waveColWidth / singleWaveWidth(wsModel))) | 0;
                    const singleCycleWidth = waveColWidth / wholeCycles;
                    const viewerWidth = (((namesColWidth + Constants_valuesColWidth) + ~~(singleCycleWidth * wholeCycles)) + otherDivWidths) | 0;
                    const updateFn = (wsModel_1) => (new WaveSimModel(wsModel_1.State, wsModel_1.TopSheet, wsModel_1.Sheets, wsModel_1.AllWaves, wsModel_1.SelectedWaves, wsModel_1.StartCycle, wholeCycles, wsModel_1.CurrClkCycle, wsModel_1.ClkCycleBoxIsEmpty, wsModel_1.Radix, singleCycleWidth * wholeCycles, wsModel_1.WaveModalActive, wsModel_1.RamModalActive, wsModel_1.RamComps, wsModel_1.SelectedRams, wsModel_1.FastSim, wsModel_1.SearchString, wsModel_1.ShowSheetDetail, wsModel_1.ShowComponentDetail, wsModel_1.ShowGroupDetail, wsModel_1.HoveredLabel, wsModel_1.DraggedIndex, wsModel_1.PrevSelectedWaves));
                    return updateWSModel(updateFn, new Model(model_2.UserData, model_2.WaveSim, model_2.WaveSimSheet, model_2.UISheetTrail, model_2.Spinner, model_2.Sheet, model_2.IsLoading, model_2.LastChangeCheckTime, model_2.LastSimulatedCanvasState, model_2.LastDetailedSavedState, model_2.CurrentSelected, model_2.LastSelectedIds, model_2.LastUsedDialogWidth, model_2.SelectedComponent, model_2.CurrentStepSimulationStep, model_2.CurrentTruthTable, model_2.TTConfig, model_2.RightPaneTabVisible, model_2.SimSubTabVisible, model_2.Hilighted, model_2.Clipboard, model_2.LastCreatedComponent, model_2.SavedSheetIsOutOfDate, model_2.CurrentProj, model_2.PopupViewFunc, model_2.SpinnerPayload, model_2.PopupDialogData, model_2.Notifications, model_2.TopMenuOpenState, model_2.DividerDragMode, w_3, model_2.ConnsOfSelectedWavesAreHighlighted, model_2.Pending, model_2.UIState, model_2.BuildVisible, model_2.DrawBlockTestState));
                }]));
                dispatch_1(new Msg(14, []));
                dispatch(new Msg(70, [new DragMode(1, [])]));
                dispatch(new Msg(72, [w_1]));
                break;
            }
            case 2: {
                break;
            }
        }
    }]), new DOMAttr(40, [(ev_1) => {
        if (equals(model.TopMenuOpenState, new TopMenu(1, []))) {
            toConsole(printf("Setting Top menu closed from processappclick"));
            dispatch(new Msg(68, [new TopMenu(0, [])]));
        }
    }]), new DOMAttr(57, [(ev_2) => {
        if (ev_2.buttons === 1) {
            dispatch(new Msg(75, []));
        }
        const matchValue_7 = model.DividerDragMode;
        const matchValue_8 = ev_2.buttons;
        let matchResult_1, pos_2, pos_3;
        if (matchValue_7.tag === 0) {
            if (matchValue_8 === 1) {
                matchResult_1 = 1;
                pos_3 = matchValue_7.fields[0];
            }
            else {
                matchResult_1 = 1;
                pos_3 = matchValue_7.fields[0];
            }
        }
        else {
            matchResult_1 = 2;
        }
        switch (matchResult_1) {
            case 0: {
                const newWidth_2 = ((model.WaveSimViewerWidth - ~~ev_2.clientX) + pos_2) | 0;
                let w_4;
                const e_8 = max(minViewerWidth, newWidth_2) | 0;
                w_4 = min(windowX - minEditorWidth(), e_8);
                dispatch(new Msg(70, [new DragMode(0, [(~~ev_2.clientX - w_4) + newWidth_2])]));
                dispatch(new Msg(72, [w_4]));
                break;
            }
            case 1: {
                const newWidth_3 = ((model.WaveSimViewerWidth - ~~ev_2.clientX) + pos_3) | 0;
                let w_5;
                const e_11 = max(minViewerWidth, newWidth_3) | 0;
                w_5 = min(windowX - minEditorWidth(), e_11);
                const dispatch_3 = dispatch;
                dispatch_3(new Msg(36, [(model_1_3) => {
                    const w_7 = w_5 | 0;
                    const model_4 = model_1_3;
                    const wsModel_2 = getWSModel(model_4);
                    const namesColWidth_1 = calcNamesColWidth(wsModel_2) | 0;
                    const otherDivWidths_1 = ((((Constants_leftMargin + Constants_rightMargin) + Constants_dividerBarWidth_1) + Constants_scrollBarWidth) + 2) | 0;
                    const valuesColumnWidth_1 = valuesColumnSize(wsModel_2)[0] | 0;
                    const waveColWidth_1 = (((w_7 - otherDivWidths_1) - namesColWidth_1) - valuesColumnWidth_1) | 0;
                    const wholeCycles_1 = max(1, ~~(waveColWidth_1 / singleWaveWidth(wsModel_2))) | 0;
                    const singleCycleWidth_1 = waveColWidth_1 / wholeCycles_1;
                    const viewerWidth_1 = (((namesColWidth_1 + Constants_valuesColWidth) + ~~(singleCycleWidth_1 * wholeCycles_1)) + otherDivWidths_1) | 0;
                    const updateFn_1 = (wsModel_1_1) => (new WaveSimModel(wsModel_1_1.State, wsModel_1_1.TopSheet, wsModel_1_1.Sheets, wsModel_1_1.AllWaves, wsModel_1_1.SelectedWaves, wsModel_1_1.StartCycle, wholeCycles_1, wsModel_1_1.CurrClkCycle, wsModel_1_1.ClkCycleBoxIsEmpty, wsModel_1_1.Radix, singleCycleWidth_1 * wholeCycles_1, wsModel_1_1.WaveModalActive, wsModel_1_1.RamModalActive, wsModel_1_1.RamComps, wsModel_1_1.SelectedRams, wsModel_1_1.FastSim, wsModel_1_1.SearchString, wsModel_1_1.ShowSheetDetail, wsModel_1_1.ShowComponentDetail, wsModel_1_1.ShowGroupDetail, wsModel_1_1.HoveredLabel, wsModel_1_1.DraggedIndex, wsModel_1_1.PrevSelectedWaves));
                    return updateWSModel(updateFn_1, new Model(model_4.UserData, model_4.WaveSim, model_4.WaveSimSheet, model_4.UISheetTrail, model_4.Spinner, model_4.Sheet, model_4.IsLoading, model_4.LastChangeCheckTime, model_4.LastSimulatedCanvasState, model_4.LastDetailedSavedState, model_4.CurrentSelected, model_4.LastSelectedIds, model_4.LastUsedDialogWidth, model_4.SelectedComponent, model_4.CurrentStepSimulationStep, model_4.CurrentTruthTable, model_4.TTConfig, model_4.RightPaneTabVisible, model_4.SimSubTabVisible, model_4.Hilighted, model_4.Clipboard, model_4.LastCreatedComponent, model_4.SavedSheetIsOutOfDate, model_4.CurrentProj, model_4.PopupViewFunc, model_4.SpinnerPayload, model_4.PopupDialogData, model_4.Notifications, model_4.TopMenuOpenState, model_4.DividerDragMode, w_7, model_4.ConnsOfSelectedWavesAreHighlighted, model_4.Pending, model_4.UIState, model_4.BuildVisible, model_4.DrawBlockTestState));
                }]));
                dispatch_3(new Msg(14, []));
                dispatch(new Msg(70, [new DragMode(1, [])]));
                dispatch(new Msg(72, [w_5]));
                break;
            }
            case 2: {
                break;
            }
        }
    }]), ["style", {
        userSelect: "none",
        borderTop: "2px solid lightgray",
        borderBottom: "2px solid lightgray",
        overflowX: "auto",
        height: "calc(100%-4px)",
        cursor: topCursorText,
    }]];
    const children_4 = toList(delay(() => append(singleton_1(viewNoProjectMenu(model, dispatch)), delay(() => append(singleton_1(viewPopup(model, dispatch)), delay(() => append(singleton_1(viewTopMenu(model, dispatch)), delay(() => append(equals(model.PopupDialogData.Progress, void 0) ? singleton_1(view(model.Sheet, headerHeight, canvasVisibleStyleList(model), sheetDispatch)) : empty_2(), delay(() => append(singleton_1(viewNotifications(model, dispatch)), delay(() => (!equals(model.PopupDialogData.Progress, void 0) ? singleton_1(react.createElement("div", {})) : append(singleton_1(viewOnDiagramButtons(model, dispatch)), delay(() => {
        let props_2, children_2;
        return singleton_1((props_2 = [new HTMLAttr(99, ["RightSection"]), rightSectionStyle(model)], (children_2 = [dividerbar(model, dispatch), viewRightTabs(canvasState[0], canvasState[1], model, dispatch)], react.createElement("div", keyValueList(props_2, 1), ...children_2))));
    })))))))))))))));
    return react.createElement("div", keyValueList(props_4, 1), ...children_4);
}

//# sourceMappingURL=MainView.fs.js.map
