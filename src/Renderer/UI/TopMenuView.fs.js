import { formOpt_, loadedComponentOf_, Component, ComponentType, CustomComponentType, LoadedComponent, JSDiagramMsg, Project, SheetInfo as SheetInfo_1, CCForm } from "../Common/CommonTypes.fs.js";
import { getHintPaneElement, saveOpenFileActionWithModelUpdate, Constants_numCharsHidePath, openFileInProject, allRootSheets, getSheetTrees, Constants_minNumPathChars, Constants_maxNumPathChars, Constants_largeScreenCanvasWidth, foldOverTree, Constants_maxDisplayedPathLengthInRecentProjects, openDemoProjectFromPath, openProjectFromPath, displayFileErrorNotification, warnAppWidth, openFileInProject$0027, isFileInProject, setupProjectFromComponents, saveOpenFileAction, updateProjectFromCanvas, writeComponentToBackupFile, getSavedWave } from "./MenuHelpers.fs.js";
import { displayAlertOnError } from "./Notifications.fs.js";
import { copyFile, hasExtn, unlink, ensureDirectory, staticDir, askForExistingProjectPath, readFilesFromDirectory, writeFile, baseName, tryCreateFolder, askForNewProjectPath, saveAllProjectFilesFromLoadedComponentsToDisk, renameFile, dirName as dirName_1, pathJoin, createEmptyDgmFile, makeLoadedComponentFromCanvasData, removeFileWithExtn, saveStateToFile } from "../Interface/FilesIO.fs.js";
import { append as append_1, ofArray, filter, isEmpty, cons, singleton, iterate, empty, tryFind as tryFind_1, map as map_1, find } from "../fable_modules/fable-library.4.1.4/List.js";
import { value as value_2, defaultArg, map } from "../fable_modules/fable-library.4.1.4/Option.js";
import { getUpdatedLoadedComponents, getComponentIds, updateLdCompsWithCompOpt, getSavedWaveInfo } from "./ModelHelpers.fs.js";
import { tryFind } from "../fable_modules/fable-library.4.1.4/Map.js";
import { now } from "../fable_modules/fable-library.4.1.4/Date.js";
import { SheetT_Msg, BusWireT_Msg, SymbolT_Msg } from "../Model/DrawModelType.fs.js";
import { TopMenu, projectOpt_, UserData, TTMsg, UICommandType, Model, Msg } from "../Model/ModelType.fs.js";
import { toConsole, toText, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { unclosablePopup, dynamicClosablePopup, choicePopup, dialogPopup, dialogPopupBodyOnlyText, getText } from "../DrawBlock/PopupHelpers.fs.js";
import * as react from "react";
import { importSheet, allRootHierarchiesFromProjectBreadcrumbs, BreadcrumbConfig, Constants_defaultConfig, maybeWarning } from "./MiscMenuView.fs.js";
import { uncurry3, defaultOf, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { DrawModelType_SheetT_Model__Model_ClearCanvas_7D5C5FDA } from "../DrawBlock/Sheet.fs.js";
import { StringModule_Length } from "../Common/EEExtensions.fs.js";
import { list as list_3, menu, Item_Option, Item_li } from "../fable_modules/Fulma.2.16.0/Components/Menu.fs.js";
import { singleton as singleton_1, append, delay, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { cropToLength } from "../Common/Helpers.fs.js";
import { DOMAttr, HTMLAttr } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { dataTooltip } from "../fable_modules/Fulma.Extensions.Wikiki.Tooltip.3.0.0/Tooltip.fs.js";
import { Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { union_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { Compose_Prism, Compose_Prism_op_GreaterQmarkGreater_507FA136, Optic_Map, Optic_Map_op_HatPercent_Z32F545AB } from "../Common/Optics.fs.js";
import { contains } from "../fable_modules/fable-library.4.1.4/Set.js";
import { Text_div, Common_GenericOption, Color_IColor } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import { End_div, Brand_div, Option, navbar, divider, Item_a, Dropdown_Option, Dropdown_div, Link_a, Item_Option as Item_Option_1, Item_div } from "../fable_modules/Fulma.2.16.0/Components/Navbar.fs.js";
import { leftSectionWidth } from "./Style.fs.js";
import { Option as Option_1, breadcrumb, item } from "../fable_modules/Fulma.2.16.0/Components/Breadcrumb.fs.js";
import { Option as Option_2, button } from "../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { viewInfoPopup } from "./UIPopups.fs.js";

/**
 * Save the Verilog file currently open, return the new sheet's Loadedcomponent if this has changed.
 * Do not change model.
 */
export function updateVerilogFileAction(newCS_, newCS__1, name, model, dispatch) {
    const newCS = [newCS_, newCS__1];
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        const sheetInfo = new SheetInfo_1(new CCForm(4, [name]), void 0);
        const savedState = [newCS, getSavedWave(model), sheetInfo];
        displayAlertOnError(dispatch, saveStateToFile(project.ProjectPath, name, savedState[0], savedState[1], savedState[2]));
        removeFileWithExtn(".dgmauto", project.ProjectPath, name);
        const origLdComp = find((lc) => (lc.Name === name), project.LoadedComponents);
        const savedWaveSim = map(getSavedWaveInfo, tryFind(name, model.WaveSim));
        let SheetInfo;
        const matchValue_1 = origLdComp.Form;
        if (matchValue_1 != null) {
            const form = matchValue_1;
            SheetInfo = (new SheetInfo_1(form, origLdComp.Description));
        }
        else {
            SheetInfo = void 0;
        }
        const patternInput = makeLoadedComponentFromCanvasData(newCS[0], newCS[1], origLdComp.FilePath, now(), savedWaveSim, SheetInfo);
        const ramCheck = patternInput[1];
        const newLdc = patternInput[0];
        let newState;
        const tupledArg = newCS;
        const comps = tupledArg[0];
        const conns = tupledArg[1];
        newState = [map_1((comp) => {
            const matchValue_2 = tryFind_1((c) => (c.Id === comp.Id), ramCheck);
            if (matchValue_2 != null) {
                const newRam = matchValue_2;
                dispatch(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(29, [comp.Id, newRam.Type])])])]));
                return newRam;
            }
            else {
                return comp;
            }
        }, comps), conns];
        writeComponentToBackupFile(4, 1, newLdc, dispatch);
        return [newLdc, newState];
    }
    else {
        return toFail(printf("No project"));
    }
}

/**
 * save current open Verilog file, updating model etc, and returning the loaded component and the saved (unreduced) canvas state
 */
export function updateVerilogFileActionWithModelUpdate(newCS_, newCS__1, name, model, dispatch) {
    const newCS = [newCS_, newCS__1];
    let p$0027;
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const p = matchValue;
        p$0027 = (new Project(p.ProjectPath, p.OpenFileName, name, p.LoadedComponents));
    }
    else {
        p$0027 = toFail(printf("What? Should never be able to save sheet when project=None"));
    }
    const model$0027 = new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, p$0027, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
    const opt = updateVerilogFileAction(newCS[0], newCS[1], name, model$0027, dispatch);
    const ldcOpt = map((tuple) => tuple[0], opt);
    const state = defaultArg(map((tuple_1) => tuple_1[1], opt), [empty(), empty()]);
    const matchValue_1 = model$0027.CurrentProj;
    if (matchValue_1 != null) {
        const p_1 = matchValue_1;
        dispatch(new Msg(34, [new Project(p_1.ProjectPath, p_1.OpenFileName, p_1.WorkingFileName, updateLdCompsWithCompOpt(ldcOpt, p_1.LoadedComponents))]));
    }
    else {
        toFail(printf("What? Should never be able to save sheet when project=None"));
    }
    let p$0027$0027;
    const matchValue_2 = model$0027.CurrentProj;
    if (matchValue_2 != null) {
        const p_2 = matchValue_2;
        p$0027$0027 = (new Project(p_2.ProjectPath, p_2.OpenFileName, p_2.WorkingFileName, updateLdCompsWithCompOpt(ldcOpt, p_2.LoadedComponents)));
    }
    else {
        p$0027$0027 = toFail(printf("What? Should never be able to save sheet when project=None"));
    }
    dispatch(new Msg(5, [new JSDiagramMsg(4, [false])]));
    dispatch(new Msg(83, []));
    return p$0027$0027;
}

export function createEmptyComponentAndFile(pPath, sheetName) {
    createEmptyDgmFile(pPath, sheetName);
    return new LoadedComponent(sheetName, now(), pathJoin([pPath, toText(printf("%s.dgm"))(sheetName)]), void 0, [empty(), empty()], empty(), empty(), new CCForm(0, []), void 0);
}

/**
 * rename a sheet
 */
export function renameSheet(oldName, newName, model, dispatch) {
    const renameComps = (oldName_1, newName_1, comps) => map_1((comp) => {
        let customType, compName;
        let matchResult, compName_1, customType_1, c;
        if (comp.Type.tag === 26) {
            if ((customType = comp.Type.fields[0], (compName = comp.Type.fields[0].Name, compName === oldName_1))) {
                matchResult = 0;
                compName_1 = comp.Type.fields[0].Name;
                customType_1 = comp.Type.fields[0];
            }
            else {
                matchResult = 1;
                c = comp;
            }
        }
        else {
            matchResult = 1;
            c = comp;
        }
        switch (matchResult) {
            case 0:
                return new Component(comp.Id, new ComponentType(26, [new CustomComponentType(newName_1, customType_1.InputLabels, customType_1.OutputLabels, customType_1.Form, customType_1.Description)]), comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo);
            default:
                return c;
        }
    }, comps);
    const renameCustomComponents = (newName_2, ldComp) => {
        const state = ldComp.CanvasState;
        return new LoadedComponent(ldComp.Name, ldComp.TimeStamp, ldComp.FilePath, ldComp.WaveInfo, [renameComps(oldName, newName_2, state[0]), state[1]], ldComp.InputLabels, ldComp.OutputLabels, ldComp.Form, ldComp.Description);
    };
    const renameSheetsInProject = (oldName_2, newName_3, proj) => (new Project(proj.ProjectPath, (proj.OpenFileName === oldName_2) ? newName_3 : proj.OpenFileName, (proj.OpenFileName === oldName_2) ? newName_3 : proj.WorkingFileName, map_1((ldComp_1) => {
        let lcName;
        if ((lcName = ldComp_1.Name, lcName === oldName_2)) {
            const lcName_1 = ldComp_1.Name;
            return new LoadedComponent(newName_3, ldComp_1.TimeStamp, pathJoin([dirName_1(ldComp_1.FilePath), newName_3 + ".dgm"]), ldComp_1.WaveInfo, ldComp_1.CanvasState, ldComp_1.InputLabels, ldComp_1.OutputLabels, ldComp_1.Form, ldComp_1.Description);
        }
        else {
            return renameCustomComponents(newName_3, ldComp_1);
        }
    }, proj.LoadedComponents)));
    const matchValue = updateProjectFromCanvas(model, dispatch);
    if (matchValue != null) {
        const p = matchValue;
        const updatedModel = new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, p, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
        const opt = saveOpenFileAction(false, updatedModel, dispatch);
        const ldcOpt = map((tuple) => tuple[0], opt);
        const ldComps = updateLdCompsWithCompOpt(ldcOpt, p.LoadedComponents);
        const reducedState = defaultArg(map((tuple_1) => tuple_1[1], opt), [empty(), empty()]);
        iterate((extn) => {
            displayAlertOnError(dispatch, renameFile(extn, p.ProjectPath, oldName, newName));
        }, singleton(".dgm"));
        const proj$0027 = renameSheetsInProject(oldName, newName, p);
        setupProjectFromComponents(false, proj$0027.OpenFileName, proj$0027.LoadedComponents, model, dispatch);
        saveAllProjectFilesFromLoadedComponentsToDisk(proj$0027);
        dispatch(new Msg(83, []));
    }
    else {
        toFail(printf("What? current project cannot be None at this point in renamesheet"));
    }
}

/**
 * rename file
 */
export function renameFileInProject(name, project, model, dispatch) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project_1 = matchValue;
        const title = "Rename sheet in project";
        const before = (dialogData) => {
            let s_2;
            const dialogText = getText(dialogData);
            const children_2 = ["Warning: the current sheet will be saved during this operation.", react.createElement("br", {}), (s_2 = "Names of existing components in other sheets that use the renamed sheet will still reflect the old sheet name.", s_2), " You may change names manually if you wish, operation does not depend on the name.", react.createElement("br", {}), react.createElement("br", {}), toText(printf("Sheet %s will be renamed as %s:"))(name)(dialogText), react.createElement("br", {}), react.createElement("br", {}), defaultArg(maybeWarning(dialogText, project_1), react.createElement("div", {}))];
            return react.createElement("div", {}, ...children_2);
        };
        const placeholder = "New name for design sheet";
        const body = (model_1) => dialogPopupBodyOnlyText(before, placeholder, dispatch, model_1);
        const buttonText = "Rename";
        const buttonAction = (model_2) => {
            const newName = getText(model_2.PopupDialogData).toLocaleLowerCase();
            dispatch(new Msg(88, [(model_3, dispatch_1) => {
                renameSheet(name, newName, model_3, dispatch_1);
            }, dispatch]));
            dispatch(new Msg(41, []));
        };
        const isDisabled = (model_4) => {
            const dialogData_1 = model_4.PopupDialogData;
            const dialogText_1 = getText(dialogData_1);
            if (isFileInProject(dialogText_1, project_1)) {
                return true;
            }
            else {
                return dialogText_1 === "";
            }
        };
        dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
    }
    else {
        console.log("Warning: renameFileInProject called when no project is currently open");
    }
}

/**
 * Create a new file in this project and open it automatically.
 */
export function addFileToProject(model, dispatch) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        const title = "Add sheet to project";
        const before = (dialogData) => {
            const dialogText = getText(dialogData);
            const warn = maybeWarning(dialogText, project);
            const children_2 = ["A new sheet will be created at:", react.createElement("br", {}), pathJoin([project.ProjectPath, dialogText + ".dgm"]), defaultArg(warn, react.createElement("div", {}))];
            return react.createElement("div", {}, ...children_2);
        };
        const placeholder = "Insert design sheet name";
        const body = (model_1) => dialogPopupBodyOnlyText(before, placeholder, dispatch, model_1);
        const buttonText = "Add";
        const buttonAction = (model$0027) => {
            const dialogData_1 = model$0027.PopupDialogData;
            const name = getText(dialogData_1).toLocaleLowerCase();
            displayAlertOnError(dispatch, createEmptyDgmFile(project.ProjectPath, name));
            const newComponent = new LoadedComponent(name, now(), pathJoin([project.ProjectPath, name + ".dgm"]), void 0, [empty(), empty()], empty(), empty(), new CCForm(0, []), void 0);
            const updatedProject = new Project(project.ProjectPath, name, name, cons(newComponent, project.LoadedComponents));
            openFileInProject$0027(true, name, updatedProject, model, dispatch);
            dispatch(new Msg(41, []));
            dispatch(new Msg(83, []));
        };
        const isDisabled = (model$0027_1) => {
            const dialogData_2 = model$0027_1.PopupDialogData;
            const dialogText_1 = getText(dialogData_2);
            if (isFileInProject(dialogText_1, project) ? true : (dialogText_1 === "")) {
                return true;
            }
            else {
                return !equals(maybeWarning(dialogText_1, project), void 0);
            }
        };
        dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
    }
    else {
        console.log("Warning: addFileToProject called when no project is currently open");
    }
}

/**
 * Close current project, if any.
 */
export function forceCloseProject(model, dispatch) {
    dispatch(new Msg(82, [new UICommandType(0, [])]));
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    dispatch(new Msg(25, []));
    dispatch(new Msg(27, [new TTMsg(6, [])]));
    dispatch(new Msg(25, []));
    dispatch(new Msg(26, []));
    DrawModelType_SheetT_Model__Model_ClearCanvas_7D5C5FDA(model.Sheet, sheetDispatch);
    dispatch(new Msg(83, []));
}

/**
 * force either save of current file before action, or abort (closeProject is special case of this)
 */
export function doActionWithSaveFileDialog(name, nextAction, model, dispatch, _arg) {
    const closeDialogButtons = (keepOpen, _arg_1) => {
        if (keepOpen) {
            dispatch(new Msg(41, []));
        }
        else {
            dispatch(nextAction);
        }
    };
    if (model.SavedSheetIsOutOfDate) {
        choicePopup(`${name}?`, react.createElement("div", {}, "The current sheet has unsaved changes."), "Go back to sheet", `${name} without saving changes`, closeDialogButtons, dispatch);
    }
    else {
        dispatch(nextAction);
    }
}

function newProject(model, dispatch) {
    warnAppWidth(dispatch, () => {
        let inputRecord;
        const matchValue = askForNewProjectPath(model.UserData.LastUsedDirectory);
        if (matchValue != null) {
            const path = matchValue;
            const matchValue_1 = tryCreateFolder(path);
            if (matchValue_1.tag === 0) {
                dispatch(new Msg(25, []));
                dispatch(new Msg(27, [new TTMsg(6, [])]));
                dispatch(new Msg(26, []));
                const projectFile = baseName(path) + ".dprj";
                displayAlertOnError(dispatch, writeFile(pathJoin([path, projectFile]), ""));
                const initialComponent = createEmptyComponentAndFile(path, "main");
                dispatch(new Msg(85, [(inputRecord = model.UserData, new UserData(inputRecord.UserAppDir, path, inputRecord.RecentProjects, inputRecord.ArrowDisplay, inputRecord.WireType, inputRecord.Theme))]));
                setupProjectFromComponents(false, "main", singleton(initialComponent), model, dispatch);
            }
            else {
                const err = matchValue_1.fields[0];
                console.log(err);
                displayFileErrorNotification(err, dispatch);
            }
        }
    });
}

function openProject(model, dispatch) {
    warnAppWidth(dispatch, () => {
        dispatch(new Msg(1, [new SheetT_Msg(29, [true])]));
        let dirName;
        const matchValue = map(readFilesFromDirectory, model.UserData.LastUsedDirectory);
        let matchResult;
        if (matchValue == null) {
            matchResult = 0;
        }
        else if (isEmpty(matchValue)) {
            matchResult = 0;
        }
        else {
            matchResult = 1;
        }
        switch (matchResult) {
            case 0: {
                dirName = void 0;
                break;
            }
            default:
                dirName = model.UserData.LastUsedDirectory;
        }
        const matchValue_1 = askForExistingProjectPath(dirName);
        if (matchValue_1 != null) {
            const path_1 = matchValue_1;
            openProjectFromPath(path_1, model, dispatch);
        }
    });
}

/**
 * load demo project into Issie executables
 */
export function loadDemoProject(model, dispatch, basename) {
    warnAppWidth(dispatch, () => {
        const newDir = "./demos/" + basename;
        const sourceDir = (staticDir() + "/demos/") + basename;
        toConsole(printf("%s"))(`loading demo ${sourceDir} into ${newDir}`);
        ensureDirectory("./demos/");
        ensureDirectory(newDir);
        iterate((path) => {
            unlink(pathJoin([newDir, path]));
        }, readFilesFromDirectory(newDir));
        dispatch(new Msg(25, []));
        dispatch(new Msg(27, [new TTMsg(6, [])]));
        dispatch(new Msg(26, []));
        const files = readFilesFromDirectory(sourceDir);
        const isNotDir = (path_1) => {
            if (hasExtn(".dgm", path_1) ? true : hasExtn(".txt", path_1)) {
                return true;
            }
            else {
                return hasExtn(".ram", path_1);
            }
        };
        iterate((basename_1) => {
            const newPath = pathJoin([newDir, basename_1]);
            copyFile(pathJoin([sourceDir, basename_1]), newPath);
        }, filter(isNotDir, files));
        openDemoProjectFromPath(newDir, model, dispatch);
    });
}

/**
 * show menu for choosing demo project
 */
export function showDemoProjects(model, dispatch, demosInfo) {
    const matchValue = model.CurrentProj;
    if (matchValue == null) {
        const menuItem = (demoInfo, action) => {
            let children_10;
            let basename_1;
            const basename = demoInfo[0];
            const basenameL = StringModule_Length(basename) | 0;
            basename_1 = basename.slice(1, (basenameL - 1) + 1);
            return Item_li(ofArray([new Item_Option(0, [false]), new Item_Option(3, [action])]), singleton((children_10 = toList(delay(() => {
                let props;
                return append(singleton_1((props = [["style", {
                    fontWeight: "bold",
                }]], react.createElement("p", keyValueList(props, 1), basename_1))), delay(() => append(singleton_1(react.createElement("br", {})), delay(() => {
                    const matchValue_1 = basename_1;
                    return (matchValue_1 === "cpu") ? singleton_1(react.createElement("div", {}, "The EEP1 architecture designed in Year 1 labs")) : ((matchValue_1 === "fulladder") ? singleton_1(react.createElement("div", {}, "Full adder circuit built from 2 half adders")) : ((matchValue_1 === "registerFile") ? singleton_1(react.createElement("div", {}, "regx16x8 file from EEP1 demo using wire labels to simplify wiring")) : ((matchValue_1 === "adder (4-bit)") ? singleton_1(react.createElement("div", {}, "Cascading full adders to create 4-bit adder")) : singleton_1("Information about other design"))));
                }))));
            })), react.createElement("div", {}, ...children_10))));
        };
        const demosContent = (model$0027) => {
            if (isEmpty(demosInfo)) {
                return singleton(react.createElement("div", {}, "The directory that is supposed to contain the demos doesn\'t exist!"));
            }
            else {
                return map_1((tupledArg) => {
                    const path = tupledArg[0];
                    const componentsCount = tupledArg[1] | 0;
                    const sheetsCount = tupledArg[2] | 0;
                    return menuItem([path, componentsCount, sheetsCount], (_arg) => {
                        loadDemoProject(model$0027, dispatch, path);
                    });
                }, demosInfo);
            }
        };
        const demosList = (model$0027_1) => {
            let props_16;
            const children_16 = [(props_16 = [["style", {
                fontWeight: "bold",
            }]], react.createElement("p", keyValueList(props_16, 1), "Note: Reloading the demo deletes all changes made to it.")), react.createElement("br", {}), menu(empty(), singleton(list_3(empty(), demosContent(model))))];
            return react.createElement("div", {}, ...children_16);
        };
        const foot = (model$0027_2) => react.createElement("div", {});
        dynamicClosablePopup("Choose Demo Project", demosList, foot, empty(), dispatch);
    }
    else {
        const proj = matchValue;
    }
}

/**
 * Display the initial Open/Create Project menu at the beginning if no project
 * is open.
 */
export function viewNoProjectMenu(model, dispatch) {
    const menuItem = (label, action) => Item_li(ofArray([new Item_Option(0, [false]), new Item_Option(3, [action])]), singleton(label));
    const demos = staticDir();
    const demos_1 = demos + "/demos";
    const demoProjects = readFilesFromDirectory(demos_1);
    const demosInfo = map_1((basename) => [basename, 0, 0], demoProjects);
    const recentsList = map_1((path) => menuItem(cropToLength(Constants_maxDisplayedPathLengthInRecentProjects, false, path), (_arg) => {
        openProjectFromPath(path, model, dispatch);
    }), defaultArg(model.UserData.RecentProjects, empty()));
    const initialMenu = menu(empty(), singleton(list_3(empty(), append_1(ofArray([menuItem("New project", (_arg_1) => {
        newProject(model, dispatch);
    }), menuItem("Open project", (_arg_2) => {
        openProject(model, dispatch);
    }), menuItem("Open demo project", (_arg_3) => {
        showDemoProjects(model, dispatch, demosInfo);
    })]), append_1(!equals(recentsList, empty()) ? singleton(react.createElement("hr", {})) : empty(), recentsList)))));
    if (model.CurrentProj == null) {
        return unclosablePopup(void 0, initialMenu, void 0, empty(), dispatch);
    }
    else {
        return react.createElement("div", {});
    }
}

export function goBackToProject(model, dispatch, _arg) {
    return dispatch(new Msg(79, [false]));
}

export function closeApp(model, dispatch, _arg) {
    return dispatch(new Msg(78, []));
}

/**
 * Display top menu.
 */
export function getInfoButton(name, project) {
    const comp = find((ldc) => (ldc.Name === name), project.LoadedComponents);
    const matchValue = comp.Description;
    if (matchValue == null) {
        return defaultOf();
    }
    else {
        const discr = matchValue;
        const props = [new HTMLAttr(64, [`${"tooltip"} ${"has-tooltip-multiline"} ${"has-tooltip-info"} ${"has-tooltip-right"}`]), dataTooltip(discr), ["style", {
            fontSize: "20px",
            marginTop: "0px",
            marginRight: "10px",
            float: "left",
        }]];
        return react.createElement("div", keyValueList(props, 1), "🛈");
    }
}

export class LockState extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Locked", "Unlocked"];
    }
}

export function LockState_$reflection() {
    return union_type("TopMenuView.LockState", [], LockState, () => [[], []]);
}

export function invertSheetLockState(_arg) {
    if (_arg.tag === 1) {
        return new LockState(0, []);
    }
    else {
        return new LockState(1, []);
    }
}

export function sheetIsLocked(sheet, model) {
    const project = value_2(model.CurrentProj);
    const ldcOp = tryFind_1((ldc) => (ldc.Name === sheet), project.LoadedComponents);
    const ldc_2 = defaultArg(ldcOp, find((ldc_1) => (ldc_1.Name === project.OpenFileName), project.LoadedComponents));
    const matchValue = ldc_2.Form;
    let matchResult;
    if (matchValue != null) {
        switch (matchValue.tag) {
            case 2:
            case 3: {
                matchResult = 0;
                break;
            }
            default:
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
}

/**
 * Change model to alter lock of sheet as determined by updateLock.
 * Unlockable sheets are kept the same.
 * isSubSheet must be true only if sheet is a root of the design hierarchy.
 */
export function changeLockState(isSubSheet, sheet, updateLock) {
    let p_2;
    const lockState = (_arg) => {
        switch (_arg.tag) {
            case 2:
            case 3:
                return new LockState(0, []);
            case 0:
                return new LockState(1, []);
            default:
                return void 0;
        }
    };
    const formUpdate = (form) => {
        const matchValue = map(updateLock, lockState(form));
        if (matchValue == null) {
            return form;
        }
        else if (matchValue.tag === 0) {
            if (isSubSheet) {
                return new CCForm(3, []);
            }
            else {
                return new CCForm(2, []);
            }
        }
        else {
            return new CCForm(0, []);
        }
    };
    return Optic_Map_op_HatPercent_Z32F545AB(new Optic_Map(), (p_2 = Compose_Prism_op_GreaterQmarkGreater_507FA136(new Compose_Prism(), loadedComponentOf_(sheet.SheetName))(projectOpt_), Compose_Prism_op_GreaterQmarkGreater_507FA136(new Compose_Prism(), formOpt_)(p_2)))((option) => map(formUpdate, option));
}

/**
 * Change model to alter lock of tree with root sheet as determined by updateLock.
 * Unlockable sheets are kept the same.
 * isSubSheet must be true only if sheet is a root of the design hierarchy.
 */
export function changeSubtreeLockState(isSubSheet, sheet, updateLock) {
    return (model) => foldOverTree(isSubSheet, uncurry3((b) => ((sheet_1) => changeLockState(b, sheet_1, updateLock))), sheet, model);
}

export function addVerticalScrollBars(el, r) {
    let props;
    if (el != null) {
        const el_1 = el;
        const height = el_1.offsetHeight - 50;
        const width = el_1.offsetWidth - 50;
        return singleton((props = [["style", {
            maxHeight: height,
            maxWidth: width,
            overflowY: "auto",
            overflowX: "auto",
        }]], react.createElement("div", keyValueList(props, 1), ...r)));
    }
    else {
        return r;
    }
}

export function viewTopMenu(model, dispatch) {
    const compIds = getComponentIds(model);
    const el = document.getElementById("Canvas");
    let numPathChars;
    if (el != null) {
        const el_1 = el;
        numPathChars = ((el_1.offsetWidth > Constants_largeScreenCanvasWidth) ? Constants_maxNumPathChars : Constants_minNumPathChars);
    }
    else {
        numPathChars = Constants_maxNumPathChars;
    }
    const style = ["style", {
        width: "100%",
        borderBottom: "2px solid lightgray",
    }];
    const styleNoBorder = ["style", {
        width: "100%",
    }];
    let patternInput;
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        patternInput = [project.ProjectPath, project.OpenFileName];
    }
    else {
        patternInput = ["no open project", "no open sheet"];
    }
    const projectPath = patternInput[0];
    const fileName = patternInput[1];
    const fileTab = (model_1) => {
        let props, b;
        const matchValue_1 = model_1.CurrentProj;
        if (matchValue_1 != null) {
            const project_1 = matchValue_1;
            const updatedProject = getUpdatedLoadedComponents(project_1, model_1);
            const updatedModel = new Model(model_1.UserData, model_1.WaveSim, model_1.WaveSimSheet, model_1.UISheetTrail, model_1.Spinner, model_1.Sheet, model_1.IsLoading, model_1.LastChangeCheckTime, model_1.LastSimulatedCanvasState, model_1.LastDetailedSavedState, model_1.CurrentSelected, model_1.LastSelectedIds, model_1.LastUsedDialogWidth, model_1.SelectedComponent, model_1.CurrentStepSimulationStep, model_1.CurrentTruthTable, model_1.TTConfig, model_1.RightPaneTabVisible, model_1.SimSubTabVisible, model_1.Hilighted, model_1.Clipboard, model_1.LastCreatedComponent, model_1.SavedSheetIsOutOfDate, updatedProject, model_1.PopupViewFunc, model_1.SpinnerPayload, model_1.PopupDialogData, model_1.Notifications, model_1.TopMenuOpenState, model_1.DividerDragMode, model_1.WaveSimViewerWidth, model_1.ConnsOfSelectedWavesAreHighlighted, model_1.Pending, model_1.UIState, model_1.BuildVisible, model_1.DrawBlockTestState);
            const sTrees = getSheetTrees(false, updatedProject);
            const allRoots = allRootSheets(sTrees);
            const isSubSheet = (sh) => !contains(sh, allRoots);
            const openSheetAction = (sheet, dispatch_1) => {
                dispatch_1(new Msg(82, [new UICommandType(1, [])]));
                dispatch_1(new Msg(88, [(model_2, dispatch_2) => {
                    const p = value_2(model_2.CurrentProj);
                    openFileInProject(sheet.SheetName, p, model_2, dispatch_2);
                }, dispatch_1]));
            };
            const sheetColor = (sheet_1) => {
                const matchValue_2 = sheet_1.SheetName === project_1.OpenFileName;
                const matchValue_3 = sheetIsLocked(sheet_1.SheetName, updatedModel);
                if (matchValue_2) {
                    if (matchValue_3) {
                        return new Color_IColor(19, ["pink"]);
                    }
                    else {
                        return new Color_IColor(19, ["lightslategrey"]);
                    }
                }
                else if (matchValue_3) {
                    return new Color_IColor(8, []);
                }
                else {
                    return new Color_IColor(19, ["darkslategrey"]);
                }
            };
            const breadcrumbConfig = new BreadcrumbConfig(Constants_defaultConfig.AllowDuplicateSheets, "SheetMenuBreadcrumb", sheetColor, openSheetAction, Constants_defaultConfig.ElementProps, Constants_defaultConfig.ElementStyleProps, Constants_defaultConfig.ButtonOptions);
            const breadcrumbs = ofArray([(props = [["style", {
                textAlign: "center",
                fontSize: "15px",
            }]], react.createElement("div", keyValueList(props, 1), "Sheets with Design Hierarchy")), allRootHierarchiesFromProjectBreadcrumbs(breadcrumbConfig, dispatch, updatedModel)]);
            return Item_div(ofArray([new Item_Option_1(3, []), new Item_Option_1(5, [singleton(new DOMAttr(40, [(_arg) => {
                dispatch(new Msg(68, [equals(model_1.TopMenuOpenState, new TopMenu(2, [])) ? (new TopMenu(0, [])) : (new TopMenu(2, []))]));
            }]))])]), ofArray([Link_a(empty(), singleton("Sheets")), Dropdown_div(singleton(new Dropdown_Option(3, [singleton(["style", {
                display: ((b = equals(model_1.TopMenuOpenState, new TopMenu(2, [])), b)) ? "block" : "none",
            }])])), addVerticalScrollBars(el, append_1(ofArray([Item_a(singleton(new Item_Option_1(5, [singleton(new DOMAttr(40, [(_arg_1) => {
                dispatch(new Msg(82, [new UICommandType(5, [])]));
                addFileToProject(model_1, dispatch);
            }]))])), singleton("New Sheet")), divider(empty(), empty()), Item_a(singleton(new Item_Option_1(5, [singleton(new DOMAttr(40, [(_arg_2) => {
                dispatch(new Msg(82, [new UICommandType(3, [])]));
                importSheet(model_1, dispatch);
            }]))])), singleton("Import Sheet")), divider(empty(), empty())]), breadcrumbs)))]));
        }
        else {
            return Item_div(empty(), empty());
        }
    };
    const props_8 = [new HTMLAttr(99, ["TopMenu"]), leftSectionWidth(model), ["style", {
        position: "absolute",
        userSelect: "none",
    }]];
    const children_8 = [navbar(singleton(new Option(6, [singleton(["style", {
        height: "100%",
        width: "100%",
        borderBottom: "2px solid lightgray",
    }])])), singleton(Brand_div(singleton(new Common_GenericOption(1, [singleton(["style", {
        height: "100%",
        width: "100%",
    }])])), toList(delay(() => append(singleton_1(fileTab(model)), delay(() => append(singleton_1(Item_div(ofArray([new Item_Option_1(3, []), new Item_Option_1(5, [singleton(new DOMAttr(40, [(_arg_3) => {
        dispatch(new Msg(68, [equals(model.TopMenuOpenState, new TopMenu(1, [])) ? (new TopMenu(0, [])) : (new TopMenu(1, []))]));
    }]))])]), ofArray([Link_a(empty(), singleton("Project")), Dropdown_div(singleton(new Dropdown_Option(3, [singleton(["style", {
        display: equals(model.TopMenuOpenState, new TopMenu(1, [])) ? "block" : "none",
    }])])), ofArray([Item_a(singleton(new Item_Option_1(5, [singleton(new DOMAttr(40, [(arg40$0040) => {
        doActionWithSaveFileDialog("New project", new Msg(88, [(model_3, dispatch_3) => {
            newProject(model_3, dispatch_3);
        }, dispatch]), model, dispatch, arg40$0040);
    }]))])), singleton("New project")), Item_a(singleton(new Item_Option_1(5, [singleton(new DOMAttr(40, [(arg40$0040_1) => {
        doActionWithSaveFileDialog("Open project", new Msg(88, [(model_4, dispatch_4) => {
            openProject(model_4, dispatch_4);
        }, dispatch]), model, dispatch, arg40$0040_1);
    }]))])), singleton("Open project")), Item_a(singleton(new Item_Option_1(5, [singleton(new DOMAttr(40, [(arg40$0040_2) => {
        doActionWithSaveFileDialog("Close project", new Msg(88, [(model_5, dispatch_5) => {
            forceCloseProject(model_5, dispatch_5);
        }, dispatch]), model, dispatch, arg40$0040_2);
    }]))])), singleton("Close project"))]))]))), delay(() => {
        let props_2, props_4, children_4;
        const hidePath = numPathChars < Constants_numCharsHidePath;
        const pathItem = item(empty(), singleton(hidePath ? "" : cropToLength(numPathChars, false, projectPath)));
        const nameItem = item(empty(), singleton((props_2 = [["style", {
            fontWeight: "bold",
        }]], react.createElement("span", keyValueList(props_2, 1), fileName))));
        const tip = `${projectPath}:${fileName}`;
        return append(singleton_1(Item_div(empty(), singleton(Item_div(empty(), singleton((props_4 = [new HTMLAttr(64, [`${"tooltip"} ${"has-tooltip-multiline"} ${"has-tooltip-bottom"}`]), dataTooltip(tip)], (children_4 = [breadcrumb(singleton(new Option_1(2, [])), hidePath ? singleton(nameItem) : ofArray([pathItem, nameItem]))], react.createElement("div", keyValueList(props_4, 1), ...children_4)))))))), delay(() => append(singleton_1(Item_div(empty(), singleton(Item_div(empty(), singleton(button(append_1(model.SavedSheetIsOutOfDate ? empty() : singleton(new Option_2(0, [new Color_IColor(2, [])])), ofArray([new Option_2(0, [new Color_IColor(6, [])]), new Option_2(18, [(_arg_4) => {
            dispatch(new Msg(82, [new UICommandType(6, [])]));
            saveOpenFileActionWithModelUpdate(model, dispatch);
            dispatch(new Msg(1, [new SheetT_Msg(14, [])]));
        }])])), singleton("Save"))))))), delay(() => append(singleton_1(Item_div(empty(), singleton(Item_div(empty(), singleton(button(ofArray([new Option_2(18, [(_arg_5) => {
            viewInfoPopup(dispatch);
        }]), new Option_2(0, [new Color_IColor(5, [])])]), singleton("Info"))))))), delay(() => append(singleton_1(Item_div(empty(), equals(model.UISheetTrail, empty()) ? empty() : singleton(Item_div(empty(), singleton(button(ofArray([new Option_2(18, [(_arg_6) => {
            dispatch(new Msg(3, [dispatch]));
        }]), new Option_2(0, [new Color_IColor(6, [])])]), singleton("Back"))))))), delay(() => {
            let props_6, children_6;
            return singleton_1(End_div(empty(), ofArray([(props_6 = [["style", {
                color: "#5282d1",
                display: "flex",
                width: "200px",
                alignItems: "center",
                textAlign: "center",
            }]], (children_6 = [getHintPaneElement(model)], react.createElement("div", keyValueList(props_6, 1), ...children_6))), Text_div(singleton(new Common_GenericOption(1, [singleton(["style", {
                paddingRight: "7000px",
            }])])), singleton(""))])));
        }))))))));
    })))))))))];
    return react.createElement("div", keyValueList(props_8, 1), ...children_8);
}

//# sourceMappingURL=TopMenuView.fs.js.map
