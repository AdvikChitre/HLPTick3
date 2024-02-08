import * as electron from "electron";
import { sheet_, Msg, MenuCommand } from "./Model/ModelType.fs.js";
import { setDebugLevel, debugTraceUI, debugLevel } from "./Interface/JSHelpers.fs.js";
import { uncurry2, createAtom, comparePrimitives, jsOptions } from "./fable_modules/fable-library.4.1.4/Util.js";
import { Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Map, Optic_Map_op_HatPercent_Z1462312A } from "./Common/Optics.fs.js";
import { SheetT_Arrange, SheetT_WireTypeMsg, SymbolT_Msg, SymbolT_ThemeType, SheetT_KeyboardMsg, BusWireT_Msg, SheetT_Msg, SheetT_wire_ } from "./Model/DrawModelType.fs.js";
import { reRouteWiresFrom, reSeparateWiresFrom } from "./DrawBlock/BusWireSeparate.fs.js";
import { HLPTick3_Tests_testsToRunFromSheetMenu, HLPTick3_Tests_testMenuFunc } from "./TestDrawBlock.fs.js";
import { VersionString } from "./Interface/Version.fs.js";
import { viewInfoPopup } from "./UI/UIPopups.fs.js";
import { head, tail, isEmpty, empty, singleton, ofArray, truncate, mapIndexed } from "./fable_modules/fable-library.4.1.4/List.js";
import { contains, ofList } from "./fable_modules/fable-library.4.1.4/Set.js";
import { writeCanvasScroll } from "./DrawBlock/SheetDisplay.fs.js";
import { Rotation, XYPos } from "./Common/CommonTypes.fs.js";
import { instrumentInterval, getTimeMs, InstrumentationControl, instrumentation } from "./Common/TimeHelpers.fs.js";
import { WebWorker_Constants_workerTestConfig, WebWorker_testWorkers, Breadcrumbs_testAllHierarchiesBreadcrumbs, Breadcrumbs_testBreadcrumbs, MiscTests_testAssets, MiscTests_testMaps, TestFonts_makeTextPopup, Misc_highLightChangedConnections } from "./Playground.fs.js";
import { join, toConsole, printf, toFail } from "./fable_modules/fable-library.4.1.4/String.js";
import { icarusRunTestCases, icarusCompileTestCases, genDriverFiles, runPerformanceTests, runCompilerTests } from "./VerilogComponent/TestParser.fs.js";
import { moveCustomPortsPopup } from "./DrawBlock/SymbolPortHelpers.fs.js";
import { map as map_1 } from "./fable_modules/fable-library.4.1.4/Array.js";
import * as remote from "@electron/remote";
import { Cmd_batch, Cmd_none, Cmd_ofSub } from "./fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { displayView, init as init_2 } from "./UI/MainView.fs.js";
import { getMessageTraceString } from "./UI/UpdateHelpers.fs.js";
import { update as update_2 } from "./UI/Update.fs.js";
import { jsToBool } from "./Common/ElectronAPI.fs.js";
import { FSharpRef, toString } from "./fable_modules/fable-library.4.1.4/Types.js";
import { ProgramModule_mkProgram, ProgramModule_withSubscription } from "./fable_modules/Fable.Elmish.3.1.0/program.fs.js";
import { Program_Internal_withReactBatchedUsing } from "./fable_modules/Fable.Elmish.HMR.5.2.0/../Fable.Elmish.React.3.0.1/react.fs.js";
import { lazyView2With } from "./fable_modules/Fable.Elmish.HMR.5.2.0/./common.fs.js";
import { defaultOf } from "./fable_modules/Fable.Elmish.HMR.5.2.0/../.././fable_modules/fable-library.4.1.4/Util.js";
import { current as current_2 } from "./fable_modules/Fable.Elmish.HMR.5.2.0/./Bundler.fs.js";
import { Internal_saveState, Internal_tryRestoreState } from "./fable_modules/Fable.Elmish.HMR.5.2.0/./hmr.fs.js";
import { Cmd_batch as Cmd_batch_1, Cmd_none as Cmd_none_1, Cmd_map } from "./fable_modules/Fable.Elmish.HMR.5.2.0/../Fable.Elmish.3.1.0/cmd.fs.js";
import { Model$1, Msg$1 } from "./fable_modules/Fable.Elmish.HMR.5.2.0/hmr.fs.js";
import { ProgramModule_map, ProgramModule_runWith } from "./fable_modules/Fable.Elmish.HMR.5.2.0/../Fable.Elmish.3.1.0/program.fs.js";
import "./scss/main.css";


export const isMac = process.platform === "darwin";

export const menuSeparator = (() => {
    const sep = {};
    sep.type = "separator";
    return sep;
})();

export function attachExitHandler(dispatch) {
    electron.ipcRenderer.on("closingWindow", (event) => {
        dispatch(new Msg(73, [new MenuCommand(4, []), dispatch]));
    });
    electron.ipcRenderer.on("windowLostFocus", (event_1) => {
        dispatch(new Msg(73, [new MenuCommand(7, []), dispatch]));
    });
}

export function getUserAppDir() {
    return electron.ipcRenderer.sendSync("get-user-data", void 0);
}

/**
 * Make action menu item from name, opt key to trigger, and action.
 */
export function makeItem(label, accelerator, iAction) {
    const item = {};
    item.label = label;
    item.accelerator = accelerator;
    item.click = ((_arg, _arg_1, keyEvent) => {
        iAction(keyEvent);
    });
    return item;
}

/**
 * Make role menu from name, opt key to trigger, and action.
 */
export function makeRoleItem(label, accelerator, role) {
    const item = makeItem(label, accelerator, (_arg) => {
    });
    item.role = role;
    return item;
}

/**
 * make conditional menu item from condition, name, opt key to trigger, and role
 */
export function makeCondRoleItem(cond, label, accelerator, role) {
    const item = makeItem(label, accelerator, (_arg) => {
    });
    item.role = role;
    item.visible = cond;
    return item;
}

/**
 * make  a conditional menu item from a condition,
 * name, opt key to trigger, and action
 */
export function makeCondItem(cond, label, accelerator, action) {
    const item = makeItem(label, accelerator, action);
    item.visible = cond;
    return item;
}

/**
 * A menu item which is visible only if in debug mode
 * (run dev or command line -D on binaries) and on windows.
 */
export function makeDebugItem(label, accelerator, option) {
    return makeCondItem(debugLevel() !== 0, label, accelerator, option);
}

/**
 * A menu item which is visible only if in debug mode
 * (run dev or command line -D on binaries) and on windows.
 */
export function makeWinDebugItem(label, accelerator, option) {
    return makeCondItem((debugLevel() !== 0) && !isMac, label, accelerator, option);
}

/**
 * Make
 */
export function makeElmItem(label, accelerator, action) {
    return jsOptions((item) => {
        item.label = label;
        item.accelerator = accelerator;
        item.click = ((_arg, _arg_1, _arg_2) => {
            action();
        });
    });
}

/**
 * Make a new menu from a list of menu items
 */
export function makeMenuGen(visible, topLevel, name, table) {
    const subMenu = {};
    subMenu.type = (topLevel ? "normal" : "submenu");
    subMenu.label = name;
    subMenu.submenu = Array.from(table);
    subMenu.visible = visible;
    return subMenu;
}

/**
 * Make a new menu from a list of menu items
 */
export function makeMenu(topLevel, name, table) {
    return makeMenuGen(true, topLevel, name, table);
}

export function reSeparateWires(dispatch) {
    return dispatch(new Msg(36, [(model) => Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_wire_)(sheet_))((model_1) => reSeparateWiresFrom(model.Sheet.SelectedComponents, model_1))(model)]));
}

export function reRouteWires(dispatch) {
    return dispatch(new Msg(36, [(model) => Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_wire_)(sheet_))((model_1) => reRouteWiresFrom(model.Sheet.SelectedComponents, model_1))(model)]));
}

export function fileMenu(dispatch) {
    const makeTestItem = (name, accelNumber) => makeDebugItem(name, `CmdOrCtrl+${accelNumber + 1}`, (_arg) => {
        dispatch(new Msg(73, [new MenuCommand(8, [(testIndex, dispatch_1, model) => {
            HLPTick3_Tests_testMenuFunc(testIndex, dispatch_1, model);
        }, accelNumber]), dispatch]));
    });
    return makeMenu(false, "File", ofArray([makeItem("New Sheet", "CmdOrCtrl+N", (ev) => {
        dispatch(new Msg(73, [new MenuCommand(3, []), dispatch]));
    }), makeItem("Save Sheet", "CmdOrCtrl+S", (ev_1) => {
        dispatch(new Msg(73, [new MenuCommand(1, []), dispatch]));
    }), makeItem("Save Project in New Format", void 0, (ev_2) => {
        dispatch(new Msg(73, [new MenuCommand(2, []), dispatch]));
    }), makeItem("Write design as Verilog", void 0, (ev_3) => {
        dispatch(new Msg(73, [new MenuCommand(6, []), dispatch]));
    }), makeItem("Exit Issie", void 0, (ev_4) => {
        dispatch(new Msg(73, [new MenuCommand(4, []), dispatch]));
    }), makeItem("About Issie " + VersionString, void 0, (ev_5) => {
        viewInfoPopup(dispatch);
    }), makeCondRoleItem((debugLevel() !== 0) && !isMac, "Hard Restart app", void 0, "forceReload"), makeMenuGen(debugLevel() > 0, false, "Tick3 Tests", mapIndexed((n, tupledArg) => {
        const name_1 = tupledArg[0];
        return makeTestItem(name_1, n);
    }, truncate(10, HLPTick3_Tests_testsToRunFromSheetMenu))), makeWinDebugItem("Trace all", void 0, (_arg_2) => {
        debugTraceUI(ofList(ofArray(["update", "view"]), {
            Compare: comparePrimitives,
        }));
    }), makeWinDebugItem("Trace View function", void 0, (_arg_3) => {
        debugTraceUI(ofList(singleton("view"), {
            Compare: comparePrimitives,
        }));
    }), makeWinDebugItem("Trace Update function", void 0, (_arg_4) => {
        debugTraceUI(ofList(singleton("update"), {
            Compare: comparePrimitives,
        }));
    }), makeWinDebugItem("Trace off", void 0, (_arg_5) => {
        debugTraceUI(ofList(empty(), {
            Compare: comparePrimitives,
        }));
    }), makeMenuGen(debugLevel() > 0, false, "Play", ofArray([makeDebugItem("Set Scroll", void 0, (_arg_6) => {
        writeCanvasScroll(new XYPos(1000, 1000));
    }), makeDebugItem("Trace all times", void 0, (_arg_7) => {
        instrumentation(new InstrumentationControl(0, [0.1, 0.1]));
        if (debugTraceUI().Equals(ofList(empty(), {
            Compare: comparePrimitives,
        }))) {
            debugTraceUI(ofList(ofArray(["update", "view"]), {
                Compare: comparePrimitives,
            }));
        }
    }), makeDebugItem("Trace short, medium & long times", void 0, (_arg_8) => {
        instrumentation(new InstrumentationControl(0, [1.5, 1.5]));
        if (debugTraceUI().Equals(ofList(empty(), {
            Compare: comparePrimitives,
        }))) {
            debugTraceUI(ofList(ofArray(["update", "view"]), {
                Compare: comparePrimitives,
            }));
        }
    }), makeDebugItem("Trace medium & long times", void 0, (_arg_9) => {
        instrumentation(new InstrumentationControl(0, [3, 3]));
        if (debugTraceUI().Equals(ofList(empty(), {
            Compare: comparePrimitives,
        }))) {
            debugTraceUI(ofList(ofArray(["update", "view"]), {
                Compare: comparePrimitives,
            }));
        }
    }), makeDebugItem("Trace long times", void 0, (_arg_10) => {
        instrumentation(new InstrumentationControl(0, [20, 20]));
        if (debugTraceUI().Equals(ofList(empty(), {
            Compare: comparePrimitives,
        }))) {
            debugTraceUI(ofList(ofArray(["update", "view"]), {
                Compare: comparePrimitives,
            }));
        }
    }), makeDebugItem("Highlight debugChangedConnections", void 0, (_arg_11) => {
        Misc_highLightChangedConnections(dispatch);
    }), makeDebugItem("Test Fonts", void 0, (_arg_12) => {
        TestFonts_makeTextPopup(dispatch);
    }), makeWinDebugItem("Run performance check", void 0, (_arg_13) => {
        MiscTests_testMaps();
    }), makeWinDebugItem("Print names of static asset files", void 0, (_arg_14) => {
        MiscTests_testAssets();
    }), makeWinDebugItem("Test Breadcrumbs", void 0, (_arg_15) => {
        dispatch(new Msg(88, [(model_1, dispatch_2) => {
            Breadcrumbs_testBreadcrumbs(model_1, dispatch_2);
        }, dispatch]));
    }), makeWinDebugItem("Test All Hierarchies Breadcrumbs", void 0, (_arg_16) => {
        dispatch(new Msg(88, [(model_2, dispatch_3) => {
            Breadcrumbs_testAllHierarchiesBreadcrumbs(model_2, dispatch_3);
        }, dispatch]));
    }), makeDebugItem("Force Exception", void 0, (ev_6) => {
        toFail(printf("User exception from menus"));
    }), makeDebugItem("Web worker performance test", void 0, (_arg_17) => {
        WebWorker_testWorkers(WebWorker_Constants_workerTestConfig);
    })])), makeMenu(false, "Verilog", ofArray([makeDebugItem("Run Verilog tests", void 0, (_arg_18) => {
        runCompilerTests(void 0);
        toConsole(printf("Compiler tests done"));
    }), makeDebugItem("Run Verilog performance tests", void 0, (_arg_19) => {
        runPerformanceTests();
        toConsole(printf("Performance tests done"));
    }), makeDebugItem("Generate driver modules", void 0, (_arg_20) => {
        genDriverFiles();
    }), makeDebugItem("Icarus compile testcases", void 0, (_arg_21) => {
        icarusCompileTestCases();
    }), makeDebugItem("Icarus run testcases", void 0, (_arg_22) => {
        icarusRunTestCases();
    })]))]));
}

export function viewMenu(dispatch) {
    const maindispatch = dispatch;
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const dispatch_1 = (arg_1) => {
        sheetDispatch(new SheetT_Msg(2, [arg_1]));
    };
    const wireTypeDispatch = (arg_3) => {
        sheetDispatch(new SheetT_Msg(34, [arg_3]));
    };
    const interfaceDispatch = (arg_5) => {
        sheetDispatch(new SheetT_Msg(35, [arg_5]));
    };
    const busWireDispatch = (bMsg) => {
        sheetDispatch(new SheetT_Msg(0, [bMsg]));
    };
    const symbolDispatch = (msg) => {
        busWireDispatch(new BusWireT_Msg(0, [msg]));
    };
    const devToolsKey = isMac ? "Alt+Command+I" : "Ctrl+Shift+I";
    return makeMenu(false, "View", ofArray([makeRoleItem("Toggle Fullscreen", "F11", "togglefullscreen"), menuSeparator, makeRoleItem("Zoom In", "CmdOrCtrl+Shift+Plus", "zoomIn"), makeRoleItem("Zoom Out", "CmdOrCtrl+Shift+-", "zoomOut"), makeRoleItem("Reset Zoom", "CmdOrCtrl+0", "resetZoom"), menuSeparator, makeItem("Diagram Zoom In", "Alt+Up", (ev) => {
        dispatch_1(new SheetT_KeyboardMsg(11, []));
    }), makeItem("Diagram Zoom Out", "Alt+Down", (ev_1) => {
        dispatch_1(new SheetT_KeyboardMsg(12, []));
    }), makeItem("Diagram Zoom to Fit", "CmdOrCtrl+W", (ev_2) => {
        dispatch_1(new SheetT_KeyboardMsg(6, []));
    }), menuSeparator, makeItem("Toggle Grid", void 0, (ev_3) => {
        sheetDispatch(new SheetT_Msg(3, []));
    }), makeMenu(false, "Theme", ofArray([makeItem("Grayscale", void 0, (ev_4) => {
        maindispatch(new Msg(86, [new SymbolT_ThemeType(0, [])]));
        symbolDispatch(new SymbolT_Msg(41, [new SymbolT_ThemeType(0, [])]));
    }), makeItem("Light", void 0, (ev_5) => {
        maindispatch(new Msg(86, [new SymbolT_ThemeType(1, [])]));
        symbolDispatch(new SymbolT_Msg(41, [new SymbolT_ThemeType(1, [])]));
    }), makeItem("Colourful", void 0, (ev_6) => {
        maindispatch(new Msg(86, [new SymbolT_ThemeType(2, [])]));
        symbolDispatch(new SymbolT_Msg(41, [new SymbolT_ThemeType(2, [])]));
    })])), makeItem("Toggle Wire Arrows", void 0, (ev_7) => {
        busWireDispatch(new BusWireT_Msg(16, []));
    }), makeMenu(false, "Wire Type", ofArray([makeItem("Jump wires", void 0, (ev_8) => {
        wireTypeDispatch(new SheetT_WireTypeMsg(0, []));
    }), makeItem("Radiussed wires", void 0, (ev_9) => {
        wireTypeDispatch(new SheetT_WireTypeMsg(1, []));
    }), makeItem("Modern wires", void 0, (ev_10) => {
        wireTypeDispatch(new SheetT_WireTypeMsg(2, []));
    })])), menuSeparator, makeItem("Benchmark", "Ctrl+Shift+B", (ev_11) => {
        maindispatch(new Msg(7, []));
    }), makeItem("Show/Hide Build Tab", void 0, (ev_12) => {
        maindispatch(new Msg(71, []));
    }), menuSeparator, makeCondItem(debugLevel() !== 0, "Toggle Dev Tools", devToolsKey, (_arg) => {
        const value = electron.ipcRenderer.send("toggle-dev-tools");
    })]));
}

export function editMenu(dispatch$0027) {
    const sheetDispatch = (sMsg) => {
        dispatch$0027(new Msg(1, [sMsg]));
    };
    const dispatch = (arg_1) => {
        sheetDispatch(new SheetT_Msg(2, [arg_1]));
    };
    const rotateDispatch = (arg_3) => {
        sheetDispatch(new SheetT_Msg(30, [arg_3]));
    };
    const busWireDispatch = (bMsg) => {
        sheetDispatch(new SheetT_Msg(0, [bMsg]));
    };
    return jsOptions((invisibleMenu) => {
        let arg_4;
        invisibleMenu.type = "submenu";
        invisibleMenu.label = "Edit";
        invisibleMenu.visible = true;
        invisibleMenu.submenu = ((arg_4 = [makeElmItem("Copy", "CmdOrCtrl+C", () => {
            dispatch(new SheetT_KeyboardMsg(1, []));
        }), makeElmItem("Paste", "CmdOrCtrl+V", () => {
            dispatch(new SheetT_KeyboardMsg(2, []));
        }), menuSeparator, makeElmItem("Rotate Anticlockwise", "CmdOrCtrl+Left", () => {
            rotateDispatch(new Rotation(3, []));
        }), makeElmItem("Rotate Clockwise", "CmdOrCtrl+Right", () => {
            rotateDispatch(new Rotation(1, []));
        }), makeElmItem("Flip Vertically", "CmdOrCtrl+Up", () => {
            sheetDispatch(new SheetT_Msg(31, ["flipVertical"]));
        }), makeElmItem("Flip Horizontally", "CmdOrCtrl+Down", () => {
            sheetDispatch(new SheetT_Msg(31, ["flipHorizontal"]));
        }), makeItem("Move Component Ports", void 0, (_arg) => {
            dispatch$0027(new Msg(40, [["How to move component ports", moveCustomPortsPopup(), dispatch$0027]]));
        }), menuSeparator, makeElmItem("Align", "CmdOrCtrl+Shift+A", () => {
            sheetDispatch(new SheetT_Msg(32, [new SheetT_Arrange(0, [])]));
        }), makeElmItem("Distribute", "CmdOrCtrl+Shift+D", () => {
            sheetDispatch(new SheetT_Msg(32, [new SheetT_Arrange(1, [])]));
        }), makeElmItem("Rotate Label Clockwise", "CmdOrCtrl+Shift+Right", () => {
            sheetDispatch(new SheetT_Msg(33, []));
        }), menuSeparator, makeElmItem("Select All", "CmdOrCtrl+A", () => {
            dispatch(new SheetT_KeyboardMsg(5, []));
        }), makeElmItem("Delete", isMac ? "Backspace" : "delete", () => {
            dispatch(new SheetT_KeyboardMsg(13, []));
        }), makeElmItem("Undo", "CmdOrCtrl+Z", () => {
            dispatch(new SheetT_KeyboardMsg(3, []));
        }), makeElmItem("Redo", "CmdOrCtrl+Y", () => {
            dispatch(new SheetT_KeyboardMsg(4, []));
        }), makeElmItem("Cancel", "ESC", () => {
            dispatch(new SheetT_KeyboardMsg(14, []));
        }), menuSeparator, makeItem("Separate Wires from Selected Components", void 0, (_arg_1) => {
            reSeparateWires(dispatch$0027);
        }), makeItem("Reroute Wires from Selected Components", void 0, (_arg_2) => {
            reRouteWires(dispatch$0027);
        })], Array.from(arg_4)));
    });
}

export function attachMenusAndKeyShortcuts(dispatch) {
    const sub = (dispatch_1) => {
        let menu;
        const arg_1 = map_1((arg) => arg, [fileMenu(dispatch_1), editMenu(dispatch_1), viewMenu(dispatch_1)]);
        const objectArg = remote.Menu;
        menu = objectArg.buildFromTemplate(arg_1);
        menu.items[0].visible = true;
        dispatch_1(new Msg(88, [(_arg, _arg_1) => {
            remote.app.applicationMenu = menu;
        }, dispatch_1]));
        attachExitHandler(dispatch_1);
        const userAppDir = getUserAppDir();
        dispatch_1(new Msg(84, [userAppDir]));
    };
    return Cmd_ofSub(sub);
}

export function init() {
    setDebugLevel();
    return [init_2(), Cmd_none()];
}

export function addDebug(dispatch, msg) {
    const str = getMessageTraceString(msg);
    return dispatch(msg);
}

export function view(model, dispatch) {
    return displayView(model, (msg) => {
        addDebug(dispatch, msg);
    });
}

export function update(msg, model) {
    return update_2(msg, model);
}

toConsole(printf("Starting renderer..."));

export function view$0027(model, dispatch) {
    const start = getTimeMs();
    const view_1 = view(model, dispatch);
    if (contains("view", debugTraceUI())) {
        return instrumentInterval(">>>View", start, view_1);
    }
    else {
        return view_1;
    }
}

export let firstPress = createAtom(true);

/**
 * Used to listen for pressing down of Ctrl for selection toggle
 */
export function keyPressListener(initial) {
    const subDown = (dispatch) => {
        document.addEventListener("keydown", (e) => {
            const ke = e;
            if ((jsToBool(ke.ctrlKey) ? true : jsToBool(ke.metaKey)) && firstPress()) {
                firstPress(false);
                dispatch(new Msg(1, [new SheetT_Msg(24, [])]));
            }
        });
    };
    const subUp = (dispatch_1) => {
        document.addEventListener("keyup", (e_1) => {
            firstPress(true);
            dispatch_1(new Msg(1, [new SheetT_Msg(25, [])]));
        });
    };
    const subRightClick = (dispatch_2) => {
        document.addEventListener("contextmenu", (arg) => {
            ((e_2) => {
                e_2.preventDefault();
                return dispatch_2(new Msg(92, [e_2]));
            })(arg);
        });
    };
    const subContextMenuCommand = (dispatch_3) => {
        electron.ipcRenderer.on("context-menu-command", (ev, args) => {
            const arg_1 = join("", map_1(toString, args));
            toConsole(printf("%s"))(arg_1);
            const matchValue = ofArray(arg_1.split(","));
            let matchResult, item, menuType;
            if (!isEmpty(matchValue)) {
                if (!isEmpty(tail(matchValue))) {
                    if (isEmpty(tail(tail(matchValue)))) {
                        matchResult = 0;
                        item = head(tail(matchValue));
                        menuType = head(matchValue);
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
                    dispatch_3(new Msg(93, [menuType, item, dispatch_3]));
                    break;
                }
                case 1: {
                    toConsole(printf("Unexpected callback argument sent from main."));
                    break;
                }
            }
        });
    };
    return Cmd_batch(ofArray([Cmd_ofSub(subDown), Cmd_ofSub(subUp), Cmd_ofSub(subRightClick), Cmd_ofSub(subContextMenuCommand)]));
}

(function () {
    const program_4 = ProgramModule_withSubscription(keyPressListener, ProgramModule_withSubscription(attachMenusAndKeyShortcuts, Program_Internal_withReactBatchedUsing((equal, view_1, state, dispatch_1) => lazyView2With(uncurry2(equal), uncurry2(view_1), state, dispatch_1), "app", ProgramModule_mkProgram(init, update, view$0027))));
    const hmrState = new FSharpRef(defaultOf());
    if (current_2 == null) {
    }
    else {
        const current = current_2;
        window.Elmish_HMR_Count = ((window.Elmish_HMR_Count == null) ? 0 : (window.Elmish_HMR_Count + 1));
        let hmrDataObject;
        switch (current.tag) {
            case 1: {
                ((import.meta.webpackHot /* If error see https://github.com/elmish/hmr/issues/35 */)).accept();
                hmrDataObject = ((import.meta.webpackHot /* If error see https://github.com/elmish/hmr/issues/35 */)).data;
                break;
            }
            case 2: {
                (module.hot).accept();
                hmrDataObject = (module.hot).data;
                break;
            }
            default: {
                import.meta.hot.accept();
                hmrDataObject = (import.meta.hot.data);
            }
        }
        Internal_tryRestoreState(hmrState, hmrDataObject);
    }
    const map = (tupledArg) => {
        const model_2 = tupledArg[0];
        const cmd = tupledArg[1];
        return [model_2, Cmd_map((arg_1) => (new Msg$1(0, [arg_1])), cmd)];
    };
    const mapUpdate = (update_1, msg_1, model_1_1) => {
        if (msg_1.tag === 1) {
            return map([new Model$1(0, []), Cmd_none_1()]);
        }
        else {
            const msg_1_1 = msg_1.fields[0];
            if (model_1_1.tag === 1) {
                const userModel = model_1_1.fields[0];
                const patternInput = update_1(msg_1_1)(userModel);
                const newModel = patternInput[0];
                const cmd_2 = patternInput[1];
                const patternInput_1 = map([new Model$1(1, [newModel]), cmd_2]);
                const newModel_1 = patternInput_1[0];
                const cmd_3 = patternInput_1[1];
                hmrState.contents = newModel_1;
                return [newModel_1, cmd_3];
            }
            else {
                return map([model_1_1, Cmd_none_1()]);
            }
        }
    };
    const createModel = (tupledArg_1) => {
        const model_2_1 = tupledArg_1[0];
        const cmd_4 = tupledArg_1[1];
        return [new Model$1(1, [model_2_1]), cmd_4];
    };
    const mapInit = (init_1) => {
        if (hmrState.contents == null) {
            return (arg_3) => createModel(map(init_1(arg_3)));
        }
        else {
            return (_arg) => [hmrState.contents, Cmd_none_1()];
        }
    };
    const mapSetState = (setState, model_3, dispatch_3) => {
        if (model_3.tag === 1) {
            const userModel_1 = model_3.fields[0];
            setState(userModel_1)((arg_4) => dispatch_3(new Msg$1(0, [arg_4])));
        }
    };
    let hmrSubscription;
    const handler = (dispatch_1_1) => {
        if (current_2 == null) {
        }
        else {
            const current_1 = current_2;
            switch (current_1.tag) {
                case 1: {
                    ((import.meta.webpackHot /* If error see https://github.com/elmish/hmr/issues/35 */)).dispose((data_1) => {
                        Internal_saveState(data_1, hmrState.contents);
                        dispatch_1_1(new Msg$1(1, []));
                    });
                    break;
                }
                case 2: {
                    (module.hot).dispose((data_2) => {
                        Internal_saveState(data_2, hmrState.contents);
                        dispatch_1_1(new Msg$1(1, []));
                    });
                    break;
                }
                default:
                    import.meta.hot.dispose((data) => {
                        Internal_saveState(data, hmrState.contents);
                        dispatch_1_1(new Msg$1(1, []));
                    });
            }
        }
    };
    hmrSubscription = singleton(handler);
    const mapSubscribe = (subscribe_2, model_4) => {
        if (model_4.tag === 1) {
            const userModel_2 = model_4.fields[0];
            return Cmd_batch_1(ofArray([Cmd_map((arg_3_1) => (new Msg$1(0, [arg_3_1])), subscribe_2(userModel_2)), hmrSubscription]));
        }
        else {
            return Cmd_none_1();
        }
    };
    const mapView = (view_2, model_5, dispatch_2_1) => {
        if (model_5.tag === 1) {
            const userModel_3 = model_5.fields[0];
            return view_2(userModel_3)((arg_5) => dispatch_2_1(new Msg$1(0, [arg_5])));
        }
        else {
            const message = "\nYour are using HMR and this Elmish application has been marked as inactive.\n\nYou should not see this message\n                    ";
            throw new Error(message);
        }
    };
    ProgramModule_runWith(void 0, ProgramModule_map(uncurry2(mapInit), mapUpdate, mapView, mapSetState, mapSubscribe, program_4));
})();

//# sourceMappingURL=Renderer.fs.js.map
