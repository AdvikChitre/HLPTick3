import { CSSProp } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { displayAlertOnError, errorFilesNotification } from "./Notifications.fs.js";
import { UICommandType, Model, UserData, TTMsg, sheet_, Msg } from "../Model/ModelType.fs.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import * as react_1 from "react";
import { find, mapIndexed, item, tryFindIndex, truncate, insertAt, tail, head, maxBy, filter as filter_1, isEmpty, tryFind as tryFind_1, sumBy, max, contains, append, last, sortBy, tryPick, cons, length, empty as empty_1, map as map_3, exists, fold, ofArray, collect, singleton } from "../fable_modules/fable-library.4.1.4/List.js";
import { confirmationPopup, choicePopup, getMemorySetup, dynamicConfirmationPopup } from "../DrawBlock/PopupHelpers.fs.js";
import { StringModule_ReplaceChar, StringModule_StartsWithLetter, StringModule_Concat } from "../Common/EEExtensions.fs.js";
import { singleton as singleton_1, append as append_1, delay, toList, collect as collect_1, forAll, takeWhile, filter, map as map_2 } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { isLetterOrDigit } from "../fable_modules/fable-library.4.1.4/Char.js";
import { toFail, toConsole, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { DrawModelType_SheetT_Model__Model_GetCanvasState, DrawModelType_SheetT_Model__Model_ChangeLabel } from "../DrawBlock/Sheet.fs.js";
import { SheetT_KeyboardMsg, SymbolT_Msg, SheetT_symbol_, BusWireT_Msg, SheetT_Msg } from "../Model/DrawModelType.fs.js";
import { toArray, tryFind, ofList, empty, FSharpMap__get_Item, containsKey } from "../fable_modules/fable-library.4.1.4/Map.js";
import { JSDiagramMsg, CCForm, Project, LoadedComponent, Connection, Memory1, InitMemData, SheetInfo as SheetInfo_1, Component } from "../Common/CommonTypes.fs.js";
import { Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set_op_HatEquals_Z147477F8 } from "../DrawBlock/../Common/Optics.fs.js";
import { Optic_Set_op_HatEquals_Z147477F8 as Optic_Set_op_HatEquals_Z147477F8_1, Compose_Lens_op_GreaterMinusGreater_Z15C92E89 as Compose_Lens_op_GreaterMinusGreater_Z15C92E89_1, Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Compose_Lens, Optic_Set } from "../Common/Optics.fs.js";
import { SymbolT_component_, SymbolT_symbolOf_ } from "../DrawBlock/../Model/DrawModelType.fs.js";
import { removeFile, saveStateToFileNew, removeFileWithExtn, saveStateToFile, loadAllComponentFiles, createEmptyDgmFile, ensureDirectory, tryLoadComponentFromPath, latestBackupFileData, dirName, pathJoin, baseName as baseName_1, pathWithoutExtension, writeFile, readFilesFromDirectoryWithExtn, removeExtn, initialiseMem, makeLoadedComponentFromCanvasData } from "../Interface/FilesIO.fs.js";
import { compare as compare_2, minute, hour, toShortDateString, op_Subtraction, now } from "../fable_modules/fable-library.4.1.4/Date.js";
import { input } from "../fable_modules/Fulma.2.16.0/Elements/Form/./Input.fs.js";
import { Option, IInputType } from "../fable_modules/Fulma.2.16.0/Elements/Form/Input.fs.js";
import { Color_IColor } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import { traceIf, getTextEventValue } from "../Interface/JSHelpers.fs.js";
import { compare } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { defaultArg, map as map_5, value as value_3 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { list as list_6, menu as menu_1, Item_Option, Item_li } from "../fable_modules/Fulma.2.16.0/Components/Menu.fs.js";
import { compare as compare_1, curry2, stringHash, comparePrimitives, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { label as label_1 } from "../fable_modules/Fulma.2.16.0/Elements/Form/Label.fs.js";
import { Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { record_type, option_type, int32_type, list_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { updateLdCompsWithCompOpt, getSavedWaveInfo, getCurrFile, initWSModel, loadWSModelFromSavedWaveInfo, tryGetLoadedComponents, CSSGridPos_$reflection } from "./ModelHelpers.fs.js";
import { List_distinct, List_distinctBy } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { union, count, difference, ofSeq } from "../fable_modules/fable-library.4.1.4/Set.js";
import { map as map_4 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { JsonHelpers_stateToJsonString } from "../Common/Helpers.fs.js";
import { parseDiagramSignature, compareCanvas, compareIOs } from "../Simulator/Extractor.fs.js";
import { totalHours } from "../fable_modules/fable-library.4.1.4/TimeSpan.js";
import * as fs from "fs";
import { Cmd_none } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";

export const Constants_minGoodAppWidth = 1250;

export const Constants_minAppWidth = 1060;

export const Constants_typicalAppWidth = 1600;

export const Constants_numberOfRecentProjects = 5;

export const Constants_maxDisplayedPathLengthInRecentProjects = 60;

export const Constants_largeScreenCanvasWidth = 1000;

export const Constants_maxNumPathChars = 25;

export const Constants_minNumPathChars = 7;

export const Constants_numCharsHidePath = 10;

export const Constants_boldStyle = new CSSProp(165, ["bold"]);

export const Constants_redColor = new CSSProp(103, ["red"]);

export const Constants_blueColor = new CSSProp(103, ["blue"]);

export const Constants_greenColor = new CSSProp(103, ["green"]);

export function displayFileErrorNotification(err, dispatch) {
    const note = errorFilesNotification(err);
    return dispatch(new Msg(62, [note]));
}

export function warnAppWidth(dispatch, afterFun) {
    const appWidth = self.innerWidth;
    const styledSpan = (styles, txt) => {
        const props = [["style", keyValueList(styles, 1)]];
        return react_1.createElement("span", keyValueList(props, 1), txt);
    };
    const bSpan = (txt_1) => styledSpan(singleton(new CSSProp(165, ["bold"])), txt_1);
    const tSpan = (txt_2) => react_1.createElement("span", {}, txt_2);
    if (appWidth < Constants_minGoodAppWidth) {
        dynamicConfirmationPopup("Issie Window Size Warning", "Continue", (model) => {
            let children_6, children_10, children_12, children_14;
            const appWidth_1 = self.innerWidth;
            const keyOf3 = (s1, s2, s3) => {
                const children_4 = [bSpan(s1), tSpan(" + "), bSpan(s2), tSpan(" + "), bSpan(s3)];
                return react_1.createElement("span", {}, ...children_4);
            };
            const children_16 = collect((s_14) => ofArray([s_14, react_1.createElement("br", {})]), ofArray([(children_6 = ["The issie app window is currently ", bSpan(`${appWidth_1} pixels`), " in width."], react_1.createElement("div", {}, ...children_6)), react_1.createElement("div", {}, "Issie works best with a width of > 1250 pixels, and typically 1600 pixels."), (children_10 = ["Issie UI will be ", bSpan("slightly degraded"), " when width < 1150 pixels."], react_1.createElement("div", {}, ...children_10)), (children_12 = ["Issie UI will be ", bSpan("severely degraded"), " when width < 1050 pixels."], react_1.createElement("div", {}, ...children_12)), (children_14 = ["Web Zoom Out (", keyOf3("Ctrl", "Shift", "-"), ") or In (", keyOf3("Ctrl", "Shift", "+"), ") will increase or decrease window width"], react_1.createElement("div", {}, ...children_14)), (appWidth_1 < 1250) ? bSpan("You are advised to Zoom Out now.") : ""]));
            return react_1.createElement("div", {}, ...children_16);
        }, afterFun, dispatch);
    }
    else {
        afterFun();
    }
}

export function extractLabelBase(text) {
    return StringModule_Concat("", map_2((ch_3) => ch_3, filter((ch_1) => {
        const ch_2 = ch_1;
        return isLetterOrDigit(ch_2) ? true : (ch_2 === "_");
    }, takeWhile((ch) => (ch !== "("), text.toLocaleUpperCase().split("")))));
}

export function formatLabelAsBus(width, text) {
    const text$0027 = extractLabelBase(text);
    if (width === 1) {
        return text$0027;
    }
    else {
        const arg = text$0027.toLocaleUpperCase();
        const arg_1 = (width - 1) | 0;
        return toText(printf("%s(%d:%d)"))(arg)(arg_1)(0);
    }
}

export function formatLabelFromType(compType, text) {
    const text$0027 = extractLabelBase(text);
    let matchResult;
    switch (compType.tag) {
        case 0: {
            if (compType.fields[0] === 1) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
            break;
        }
        case 1: {
            if (compType.fields[0] === 1) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
            break;
        }
        default:
            matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return text$0027;
        default:
            return text$0027;
    }
}

export function formatLabel(comp, text) {
    return formatLabelFromType(comp.Type, text);
}

export function setComponentLabel(model, sheetDispatch, comp, text) {
    const label = text.toLocaleUpperCase();
    DrawModelType_SheetT_Model__Model_ChangeLabel(model.Sheet, sheetDispatch, comp.Id, label);
    if (comp.Type.tag === 3) {
        const busWireDispatch = (bMsg) => {
            sheetDispatch(new SheetT_Msg(0, [bMsg]));
        };
        busWireDispatch(new BusWireT_Msg(2, []));
    }
}

export function updateSymbolRAMs(ramCheck, sModel) {
    return fold((sModel_1, comp) => {
        let l;
        const cId = comp.Id;
        if (containsKey(cId, sModel_1.Symbols)) {
            const model = sModel_1;
            const compId = cId;
            const symbol = FSharpMap__get_Item(model.Symbols, compId);
            const comp_1 = symbol.Component;
            let newCompType;
            const matchValue = comp_1.Type;
            switch (matchValue.tag) {
                case 41:
                case 42:
                case 40:
                case 39: {
                    newCompType = comp.Type;
                    break;
                }
                default: {
                    toConsole(`Warning: improper use of WriteMemoryType on ${comp_1} ignored`);
                    newCompType = comp_1.Type;
                }
            }
            const newComp = new Component(comp_1.Id, newCompType, comp_1.Label, comp_1.InputPorts, comp_1.OutputPorts, comp_1.X, comp_1.Y, comp_1.H, comp_1.W, comp_1.SymbolInfo);
            return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), (l = SymbolT_symbolOf_(compId), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_component_)(l)))(newComp)(model);
        }
        else {
            return sModel_1;
        }
    }, sModel, ramCheck);
}

export function loadComponentWithRAMChanges(newCS_, newCS__1, savedWaveSim, ldc, model) {
    const newCS = [newCS_, newCS__1];
    const sheetInfo = new SheetInfo_1(ldc.Form, ldc.Description);
    const filePath = ldc.FilePath;
    const patternInput = makeLoadedComponentFromCanvasData(newCS[0], newCS[1], filePath, now(), savedWaveSim, sheetInfo);
    const ramCheck = patternInput[1];
    const newLdc = patternInput[0];
    return Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89_1(new Compose_Lens(), SheetT_symbol_)(sheet_))((sModel) => updateSymbolRAMs(ramCheck, sModel))(model);
}

/**
 * temporary shim for compatibility while dispatch is still being used.
 */
export function raiseFileNotification(dispatch, msg) {
    if (msg == null) {
    }
    else {
        const err = msg;
        dispatch(new Msg(62, [errorFilesNotification(err)]));
    }
}

/**
 * maybe no longer needed...
 */
export function fileEntryBox(files, fName, dialog, dispatch) {
    const inputValidate = (text) => !((((text === "") ? true : exists((y) => (text === y), files)) ? true : !forAll((ch) => {
        const ch_1 = ch;
        return isLetterOrDigit(ch_1) ? true : (ch_1 === "_");
    }, text.split(""))) ? true : !StringModule_StartsWithLetter(text));
    const patternInput = getMemorySetup(dialog, 1);
    const n2 = patternInput[1] | 0;
    const n1 = patternInput[0] | 0;
    return input(ofArray([new Option(1, [new IInputType(0, [])]), new Option(15, [singleton(["style", {
        marginLeft: "2em",
    }])]), new Option(10, [fName]), new Option(12, ["Enter file name"]), new Option(2, [inputValidate(fName) ? (new Color_IColor(6, [])) : (new Color_IColor(8, []))]), new Option(13, [(arg) => {
        const newName = getTextEventValue(arg);
        const newKey = inputValidate(newName) ? (new InitMemData(2, [newName])) : (new InitMemData(3, [newName]));
        dispatch(new Msg(52, [[n1, n2, newKey, void 0]]));
    }])]));
}

/**
 * Make a poup with menu to view and select a memory data source
 */
export function makeSourceMenu(model, updateMem, cid, dispatch, modelCurrent) {
    const dialog = modelCurrent.PopupDialogData;
    const projOpt = model.CurrentProj;
    const matchValue = dialog.MemorySetup;
    if (matchValue != null) {
        const nameOpt = matchValue[3];
        const n2 = matchValue[1] | 0;
        const n1 = matchValue[0] | 0;
        const mem = matchValue[2];
        const popupKey = (mSetup) => {
            if (mSetup == null) {
                return new InitMemData(0, []);
            }
            else {
                const key = mSetup[2];
                return key;
            }
        };
        const onSelect = (key_1) => {
            let name;
            const patternInput = getMemorySetup(dialog, 1);
            const n2_1 = patternInput[1] | 0;
            const n1_1 = patternInput[0] | 0;
            const mem_1 = patternInput[2];
            toConsole(`Select ${key_1}`);
            dispatch(new Msg(52, [[n1_1, n2_1, key_1, (key_1.tag === 1) ? ((name = key_1.fields[0], name)) : void 0]]));
            let matchResult, p, s;
            if (key_1.tag === 1) {
                if (projOpt != null) {
                    matchResult = 0;
                    p = projOpt;
                    s = key_1.fields[0];
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
                    const mem1 = new Memory1(new InitMemData(1, [s]), n1_1, n2_1, empty({
                        Compare: compare,
                    }));
                    const sheetDispatch = (sMsg) => {
                        dispatch(new Msg(1, [sMsg]));
                    };
                    const mem_2 = initialiseMem(mem1, p.ProjectPath);
                    if (mem_2.tag === 1) {
                        const msg = mem_2.fields[0];
                        dispatch(new Msg(62, [errorFilesNotification(msg)]));
                    }
                    else {
                        const mem$0027 = mem_2.fields[0];
                        updateMem(cid, (_arg) => mem$0027);
                    }
                    break;
                }
                case 1: {
                    updateMem(cid, (mem_3) => (new Memory1(new InitMemData(0, []), mem_3.AddressWidth, mem_3.WordWidth, mem_3.Data)));
                    break;
                }
            }
        };
        const files = map_3((arg) => value_3(removeExtn(".ram", arg)), readFilesFromDirectoryWithExtn(dialog.ProjectPath, ".ram"));
        const existingFiles = map_3((arg_1) => (new InitMemData(1, [arg_1])), files);
        const printSource = (inList, key_2) => {
            switch (key_2.tag) {
                case 0:
                    return singleton("Unlink and use data from memory viewer/editor");
                case 1: {
                    const s_2 = key_2.fields[0];
                    return singleton(`Link memory to file ${s_2}.ram`);
                }
                default:
                    return empty_1();
            }
        };
        const menuItem = (key_3) => {
            const react = printSource(true, key_3);
            return Item_li(ofArray([new Item_Option(0, [equals(key_3, popupKey(dialog.MemorySetup))]), new Item_Option(3, [(_arg_1) => {
                onSelect(key_3);
            }])]), react);
        };
        const noFileItem = Item_li(ofArray([new Item_Option(0, [equals(mem, new InitMemData(0, []))]), new Item_Option(3, [(_arg_2) => {
            onSelect(new InitMemData(0, []));
        }])]), printSource(true, new InitMemData(0, [])));
        const modalMessageWithRamFiles = "Use this menu to change how the memory initial data is sourced. You can link data to the contents of an external file in your project folder, or unlink it. Unlinked data can be edited from the properties panel.";
        const modalMessageNoRamFiles = "You cannot now link this file because your project directory has no .ram files. Add a .ram file (with data in the format you can see if you write a memory) to your project directory, then return to this menu to link it.";
        const modalMessageBadFileLink = (s_4) => "You have linked this component to file \'{s}\' which does not exist or is badly formatted. Please either correct the file or remove the link.";
        let patternInput_1;
        if (length(existingFiles) > 0) {
            patternInput_1 = [modalMessageWithRamFiles, cons(noFileItem, map_3(menuItem, existingFiles))];
        }
        else if (mem.tag === 1) {
            const s_5 = mem.fields[0];
            patternInput_1 = [modalMessageBadFileLink(s_5), singleton(noFileItem)];
        }
        else {
            patternInput_1 = [modalMessageNoRamFiles, singleton(noFileItem)];
        }
        const msg_1 = patternInput_1[0];
        const menu = patternInput_1[1];
        const children_2 = [label_1(empty_1(), singleton(msg_1)), react_1.createElement("br", {}), react_1.createElement("br", {}), menu_1(empty_1(), singleton(list_6(empty_1(), menu)))];
        return react_1.createElement("div", {}, ...children_2);
    }
    else {
        toConsole(printf("Error: can\'t find memory setup in dialog data"));
        return react_1.createElement("div", {});
    }
}

export class SheetTree extends Record {
    constructor(LabelPath, SheetName, SheetNamePath, BreadcrumbName, Size, Depth, SubSheets, GridArea) {
        super();
        this.LabelPath = LabelPath;
        this.SheetName = SheetName;
        this.SheetNamePath = SheetNamePath;
        this.BreadcrumbName = BreadcrumbName;
        this.Size = (Size | 0);
        this.Depth = (Depth | 0);
        this.SubSheets = SubSheets;
        this.GridArea = GridArea;
    }
}

export function SheetTree_$reflection() {
    return record_type("MenuHelpers.SheetTree", [], SheetTree, () => [["LabelPath", list_type(string_type)], ["SheetName", string_type], ["SheetNamePath", list_type(string_type)], ["BreadcrumbName", string_type], ["Size", int32_type], ["Depth", int32_type], ["SubSheets", list_type(SheetTree_$reflection())], ["GridArea", option_type(CSSGridPos_$reflection())]]);
}

export function SheetTree__lookupPath_7F866359(this$, path) {
    const lookup = (sheet) => {
        if (equals(sheet.LabelPath, path)) {
            return sheet;
        }
        else {
            return tryPick(lookup, sheet.SubSheets);
        }
    };
    return lookup(this$);
}

export const subSheets_ = [(a) => a.SubSheets, (s) => ((a_1) => (new SheetTree(a_1.LabelPath, a_1.SheetName, a_1.SheetNamePath, a_1.BreadcrumbName, a_1.Size, a_1.Depth, s, a_1.GridArea)))];

export const breadcrumbName_ = [(a) => a.BreadcrumbName, (s) => ((a_1) => (new SheetTree(a_1.LabelPath, a_1.SheetName, a_1.SheetNamePath, s, a_1.Size, a_1.Depth, a_1.SubSheets, a_1.GridArea)))];

/**
 * Throughout the tree of sheets adjust breadcrumbName so it is unique within the children of each sheet
 */
export function makeBreadcrumbNamesUnique(tree) {
    return new SheetTree(tree.LabelPath, tree.SheetName, tree.SheetNamePath, tree.BreadcrumbName, tree.Size, tree.Depth, sortBy((subs) => subs.BreadcrumbName, map_3((subsheet) => {
        let value;
        const nameNotUnique = exists((subs$0027) => {
            if (subsheet.SheetName === subs$0027.SheetName) {
                return !equals(subsheet.LabelPath, subs$0027.LabelPath);
            }
            else {
                return false;
            }
        }, tree.SubSheets);
        return makeBreadcrumbNamesUnique((nameNotUnique ? ((value = (`${subsheet.SheetName}:${last(subsheet.LabelPath)}`), Optic_Set_op_HatEquals_Z147477F8_1(new Optic_Set(), breadcrumbName_)(value))) : ((x) => x))(subsheet));
    }, tree.SubSheets), {
        Compare: comparePrimitives,
    }), tree.GridArea);
}

export function foldOverTree(isSubSheet, folder, tree, model) {
    toConsole(printf("traversing %A"))(tree.SheetName);
    return fold((model_2, tree_1) => foldOverTree(false, folder, tree_1, model_2), folder(isSubSheet, tree, model), tree.SubSheets);
}

/**
 * Get the subsheet tree for all sheets in the current project.
 * Returns a map from sheet name to tree of SheetTree nodes
 */
export function getSheetTrees(allowAllInstances, p) {
    const ldcMap = ofList(map_3((ldc) => [ldc.Name, ldc], p.LoadedComponents), {
        Compare: comparePrimitives,
    });
    const subSheets = (path, sheet, labelPath, sheetPath) => {
        let ldc_2, comps, subs, Depth_1;
        const ldc_1 = tryFind(sheet, ldcMap);
        return makeBreadcrumbNamesUnique((ldc_1 != null) ? ((ldc_2 = ldc_1, (comps = ldc_2.CanvasState[0], (subs = collect((comp) => {
            let ct;
            const matchValue = comp.Type;
            let matchResult, ct_1;
            if (matchValue.tag === 26) {
                if ((ct = matchValue.fields[0], !contains(ct.Name, path, {
                    Equals: (x_1, y_1) => (x_1 === y_1),
                    GetHashCode: stringHash,
                }))) {
                    matchResult = 0;
                    ct_1 = matchValue.fields[0];
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
                    return singleton(subSheets(cons(ct_1.Name, path), ct_1.Name, append(labelPath, singleton(comp.Label)), append(sheetPath, singleton(sheet))));
                default:
                    return empty_1();
            }
        }, comps), (Depth_1 = (max(cons(0, map_3((s) => s.Depth, subs)), {
            Compare: comparePrimitives,
        }) | 0), new SheetTree(labelPath, sheet, sheetPath, sheet, sumBy((sub) => sub.Size, subs, {
            GetZero: () => 0,
            Add: (x_3, y_3) => (x_3 + y_3),
        }) + 1, Depth_1, allowAllInstances ? subs : List_distinctBy((sh) => sh.SheetName, subs, {
            Equals: (x_4, y_4) => (x_4 === y_4),
            GetHashCode: stringHash,
        }), void 0)))))) : (new SheetTree(empty_1(), sheet, empty_1(), "", 1, 0, empty_1(), void 0)));
    };
    return ofList(map_3((ldc_3) => [ldc_3.Name, subSheets(empty_1(), ldc_3.Name, empty_1(), empty_1())], p.LoadedComponents), {
        Compare: comparePrimitives,
    });
}

export function allRootSheets(sTrees) {
    let source;
    const subSheetsOf = (path, sh) => {
        let matchValue, tree;
        return List_distinct(collect((ssh) => {
            if (contains(ssh.SheetName, path, {
                Equals: (x, y) => (x === y),
                GetHashCode: stringHash,
            })) {
                return empty_1();
            }
            else {
                return cons(ssh.SheetName, subSheetsOf(cons(ssh.SheetName, path), ssh.SheetName));
            }
        }, (matchValue = tryFind(sh, sTrees), (matchValue == null) ? empty_1() : ((tree = matchValue, tree.SubSheets)))), {
            Equals: (x_1, y_1) => (x_1 === y_1),
            GetHashCode: stringHash,
        });
    };
    const set$_1 = ofSeq((source = map_4((tuple) => tuple[0], toArray(sTrees)), collect_1(curry2(subSheetsOf)(empty_1()), source)), {
        Compare: comparePrimitives,
    });
    return difference(ofSeq(map_4((tuple_1) => tuple_1[0], toArray(sTrees)), {
        Compare: comparePrimitives,
    }), set$_1);
}

/**
 * Works out number of components and connections changed between two LoadedComponent circuits
 * a new ID => a change even if the circuit topology is identical. Layout differences do not
 * mean changes, as is implemented in the reduce functions which remove layout.
 */
export function quantifyChanges(ldc1, ldc2) {
    const patternInput = ldc1.CanvasState;
    const conns1 = patternInput[1];
    const comps1 = patternInput[0];
    const patternInput_1 = ldc2.CanvasState;
    const conns2 = patternInput_1[1];
    const comps2 = patternInput_1[0];
    const reduceComp = (comp1) => (new Component(comp1.Id, comp1.Type, comp1.Label, comp1.InputPorts, comp1.OutputPorts, 0, 0, comp1.H, comp1.W, comp1.SymbolInfo));
    const reduceConn = (conn1) => (new Connection(conn1.Id, conn1.Source, conn1.Target, empty_1()));
    const unmatched = (reduce, lst1, lst2) => {
        const mapToSet = (arg_1) => ofSeq(map_3(reduce, arg_1), {
            Compare: compare_1,
        });
        const matchValue = mapToSet(lst1);
        const rL2 = mapToSet(lst2);
        const rL1 = matchValue;
        return count(union(difference(rL1, rL2), difference(rL2, rL1))) | 0;
    };
    return [unmatched(reduceComp, comps1, comps2), unmatched(reduceConn, conns1, conns2)];
}

export function writeComponentToFile(comp) {
    const data = JsonHelpers_stateToJsonString(comp.CanvasState, comp.WaveInfo, new SheetInfo_1(comp.Form, comp.Description));
    return writeFile(comp.FilePath, data);
}

/**
 * return an option containing sequence data and file name and directory of the latest
 * backup file for given component, if it exists.
 */
export function readLastBackup(comp) {
    const path = pathWithoutExtension(comp.FilePath);
    const baseN = baseName_1(path);
    const backupDir = pathJoin([dirName(path), "backup"]);
    return map_5((tupledArg) => {
        const seq = tupledArg[0] | 0;
        const fName = tupledArg[1];
        return [seq, fName, backupDir];
    }, latestBackupFileData(backupDir, baseN));
}

/**
 * Write Loadedcomponent comp to a backup file if there has been any change.
 * Overwrite the existing backup file only if it is a small, and recent, change.
 * Parameters determine thresholds of smallness and recency
 * return () - display an error if the write goes wrong.
 */
export function writeComponentToBackupFile(numCircuitChanges, numHours, comp, dispatch) {
    let tupledArg, tupledArg_1, arg_2, arg_3, oldPath;
    let patternInput;
    const matchValue = readLastBackup(comp);
    if (matchValue == null) {
        patternInput = [0, "", pathJoin([comp.FilePath, "backup"])];
    }
    else {
        const path = matchValue[2];
        const n = matchValue[0] | 0;
        const fp = matchValue[1];
        patternInput = [n + 1, fp, path];
    }
    const nSeq = patternInput[0] | 0;
    const backupFileName = patternInput[1];
    const backFilePath = patternInput[2];
    let patternInput_2;
    if (backupFileName === "") {
        patternInput_2 = [true, void 0];
    }
    else {
        const oldBackupFile = pathJoin([backFilePath, backupFileName]);
        const matchValue_1 = tryLoadComponentFromPath(oldBackupFile);
        if (matchValue_1.tag === 0) {
            const comp$0027 = matchValue_1.fields[0];
            if (!compareIOs(comp, comp$0027)) {
                patternInput_2 = [true, void 0];
            }
            else if ((tupledArg = comp.CanvasState, (tupledArg_1 = comp$0027.CanvasState, compareCanvas(10000, tupledArg[0], tupledArg[1], tupledArg_1[0], tupledArg_1[1])))) {
                patternInput_2 = [false, void 0];
            }
            else {
                const patternInput_1 = quantifyChanges(comp$0027, comp);
                const nConns = patternInput_1[1] | 0;
                const nComps = patternInput_1[0] | 0;
                const interval = op_Subtraction(comp.TimeStamp, comp$0027.TimeStamp);
                patternInput_2 = (((totalHours(interval) > numHours) ? true : ((nComps + nConns) > numCircuitChanges)) ? [true, void 0] : [true, oldBackupFile]);
            }
        }
        else {
            const err = matchValue_1;
            toConsole(printf("Error: writeComponentToBackup\n%A"))(err);
            patternInput_2 = [true, void 0];
        }
    }
    const wantToWrite = patternInput_2[0];
    const oldFile = patternInput_2[1];
    if (wantToWrite) {
        const timestamp = now();
        let backupPath;
        const path_1 = pathWithoutExtension(comp.FilePath);
        const baseN = baseName_1(path_1);
        const ds = StringModule_ReplaceChar("/", "-", toShortDateString(timestamp));
        const suffix = StringModule_ReplaceChar(" ", "-", (arg_2 = (hour(timestamp) | 0), (arg_3 = (minute(timestamp) | 0), toText(printf("%s-%02dh-%02dm"))(ds)(arg_2)(arg_3))));
        const backupDir = pathJoin([dirName(path_1), "backup"]);
        ensureDirectory(pathJoin([dirName(path_1), "backup"]));
        backupPath = pathJoin([dirName(path_1), "backup", toText(printf("%s-%03d-%s.dgm"))(baseN)(nSeq)(suffix)]);
        displayAlertOnError(dispatch, writeComponentToFile(new LoadedComponent(comp.Name, timestamp, backupPath, comp.WaveInfo, comp.CanvasState, comp.InputLabels, comp.OutputLabels, comp.Form, comp.Description)));
        let matchResult, oldPath_1;
        if (oldFile != null) {
            if ((oldPath = oldFile, oldPath !== backupPath)) {
                matchResult = 0;
                oldPath_1 = oldFile;
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
                if (fs.existsSync(oldPath_1)) {
                    fs.unlink(oldPath_1, (value) => {
                    });
                }
                break;
            }
            case 1: {
                break;
            }
        }
    }
}

export function getFileInProject(name, project) {
    return tryFind_1((comp) => (comp.Name === name), project.LoadedComponents);
}

export function isFileInProject(name, project) {
    const _arg = getFileInProject(name, project);
    if (_arg != null) {
        return true;
    }
    else {
        return false;
    }
}

function loadStateIntoModel(finishUI, compToSetup, waveSim, ldComps, model, dispatch) {
    const ldcs = tryGetLoadedComponents(model);
    const name = compToSetup.Name;
    const patternInput = compToSetup.CanvasState;
    const connections = patternInput[1];
    const components = patternInput[0];
    const msgs = toList(delay(() => append_1(singleton_1(new Msg(30, [empty_1(), empty_1()])), delay(() => append_1(singleton_1(new Msg(1, [new SheetT_Msg(21, [])])), delay(() => append_1(singleton_1(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(17, [])])])), delay(() => append_1(singleton_1(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(26, [])])])])), delay(() => append_1(singleton_1(new Msg(76, [true])), delay(() => append_1(singleton_1(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(0, [new SymbolT_Msg(27, [ldcs, components])])])])), delay(() => append_1(singleton_1(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(18, [connections])])])), delay(() => append_1(singleton_1(new Msg(1, [new SheetT_Msg(20, [])])), delay(() => append_1(singleton_1(new Msg(1, [new SheetT_Msg(0, [new BusWireT_Msg(2, [])])])), delay(() => append_1(singleton_1(new Msg(1, [new SheetT_Msg(6, [])])), delay(() => append_1(singleton_1(new Msg(9, [[name, waveSim]])), delay(() => append_1(singleton_1(new Msg(34, [new Project(dirName(compToSetup.FilePath), compToSetup.Name, compToSetup.Name, ldComps)])), delay(() => append_1(singleton_1(new Msg(1, [new SheetT_Msg(2, [new SheetT_KeyboardMsg(6, [])])])), delay(() => append_1(singleton_1(new Msg(4, [])), delay(() => append_1(singleton_1(new Msg(76, [false])), delay(() => (finishUI ? singleton_1(new Msg(83, [])) : singleton_1(new Msg(81, [])))))))))))))))))))))))))))))))))));
    dispatch(new Msg(1, [new SheetT_Msg(29, [true])]));
    dispatch(new Msg(91, [msgs]));
    dispatch(new Msg(1, [new SheetT_Msg(2, [new SheetT_KeyboardMsg(6, [])])]));
    dispatch(new Msg(4, []));
}

/**
 * Load a new project as defined by parameters.
 * Ends any existing simulation
 * Closes WaveSim if this is being used
 */
export function setupProjectFromComponents(finishUI, sheetName, ldComps, model, dispatch) {
    let compToSetup;
    if (isEmpty(ldComps)) {
        compToSetup = toFail(printf("setupProjectComponents must be called with at least one LoadedComponent"));
    }
    else {
        const comps = ldComps;
        const matchValue = tryFind_1((comp) => (comp.Name === sheetName), comps);
        if (matchValue != null) {
            const comp_1 = matchValue;
            compToSetup = comp_1;
        }
        else {
            const arg_1 = map_3((c) => c.Name, comps);
            compToSetup = toFail(printf("What? can\'t find sheet %s in loaded sheets %A"))(sheetName)(arg_1);
        }
    }
    const matchValue_1 = model.CurrentProj;
    if (matchValue_1 != null) {
        const p = matchValue_1;
        dispatch(new Msg(25, []));
        dispatch(new Msg(27, [new TTMsg(6, [])]));
    }
    const savedWaveSim = defaultArg(map_5(loadWSModelFromSavedWaveInfo, compToSetup.WaveInfo), initWSModel);
    const waveSim = defaultArg(defaultArg(map_5((sheet) => tryFind(sheet, model.WaveSim), model.WaveSimSheet), void 0), savedWaveSim);
    loadStateIntoModel(finishUI, compToSetup, waveSim, ldComps, model, dispatch);
    dispatch(new Msg(34, [new Project(dirName(compToSetup.FilePath), compToSetup.Name, compToSetup.Name, ldComps)]));
    dispatch(new Msg(4, []));
}

function createEmptyDiagramFile(projectPath, name) {
    createEmptyDgmFile(projectPath, name);
    return new LoadedComponent(name, now(), pathJoin([projectPath, name + ".dgm"]), void 0, [empty_1(), empty_1()], empty_1(), empty_1(), new CCForm(0, []), void 0);
}

/**
 * work out what to do opening a file
 */
export function resolveComponentOpenPopup(pPath_mut, components_mut, resolves_mut, model_mut, dispatch_mut) {
    let n;
    resolveComponentOpenPopup:
    while (true) {
        const pPath = pPath_mut, components = components_mut, resolves = resolves_mut, model = model_mut, dispatch = dispatch_mut;
        const chooseWhichToOpen = (comps) => {
            const onlyUserCreated = filter_1((comp) => {
                const matchValue = comp.Form;
                let matchResult;
                if (matchValue == null) {
                    matchResult = 0;
                }
                else if (matchValue.tag === 0) {
                    matchResult = 0;
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
            }, comps);
            return maxBy((comp_1) => comp_1.TimeStamp, onlyUserCreated, {
                Compare: compare_2,
            }).Name;
        };
        dispatch(new Msg(41, []));
        if (!isEmpty(resolves)) {
            switch (head(resolves).tag) {
                case 2: {
                    const autoComp_1 = head(resolves).fields[0];
                    const rLst_1 = tail(resolves);
                    const errMsg = "Could not load saved project file \'%s\' - using autosave file instead";
                    displayFileErrorNotification(errMsg, dispatch);
                    pPath_mut = pPath;
                    components_mut = cons(autoComp_1, components);
                    resolves_mut = rLst_1;
                    model_mut = model;
                    dispatch_mut = dispatch;
                    continue resolveComponentOpenPopup;
                    break;
                }
                case 1: {
                    const comp_3 = head(resolves).fields[0];
                    const rLst_2 = tail(resolves);
                    pPath_mut = pPath;
                    components_mut = cons(comp_3, components);
                    resolves_mut = rLst_2;
                    model_mut = model;
                    dispatch_mut = dispatch;
                    continue resolveComponentOpenPopup;
                    break;
                }
                default: {
                    const autoComp = head(resolves).fields[1];
                    const ldComp = head(resolves).fields[0];
                    const rLst = tail(resolves);
                    const patternInput = quantifyChanges(ldComp, autoComp);
                    const connChanges = patternInput[1] | 0;
                    const compChanges = patternInput[0] | 0;
                    const buttonAction = (autoSave, _arg) => {
                        let comp_2;
                        const inputRecord = autoSave ? autoComp : ldComp;
                        comp_2 = (new LoadedComponent(inputRecord.Name, now(), inputRecord.FilePath, inputRecord.WaveInfo, inputRecord.CanvasState, inputRecord.InputLabels, inputRecord.OutputLabels, inputRecord.Form, inputRecord.Description));
                        displayAlertOnError(dispatch, writeComponentToFile(comp_2));
                        if ((compChanges + connChanges) > 0) {
                            writeComponentToBackupFile(0, 1, comp_2, dispatch);
                        }
                        resolveComponentOpenPopup(pPath, cons(comp_2, components), rLst, model, dispatch);
                    };
                    const title = "Warning!";
                    let patternInput_1;
                    const matchValue_1 = (compChanges + connChanges) | 0;
                    if (matchValue_1 === 0) {
                        patternInput_1 = [toText(printf("There were layout but no circuit changes made in sheet %s after your last save. There is an automatically saved version which is more uptodate. Do you want to keep the newer AutoSaved version or the older Saved version?"))(ldComp.Name), "green"];
                    }
                    else if ((n = (matchValue_1 | 0), n < 3)) {
                        const n_1 = matchValue_1 | 0;
                        patternInput_1 = [toText(printf("Warning: %d component and %d connection changes were made to sheet \'%s\' after your last Save. There is an automatically saved version which is more uptodate. Do you want to keep the newer AutoSaved version or the older saved version?"))(compChanges)(connChanges)(ldComp.Name), "orange"];
                    }
                    else {
                        const n_2 = matchValue_1 | 0;
                        patternInput_1 = [toText(printf("Warning: %d component and %d connection changes were made to sheet \'%s\' after your last Save. There is an automatically saved version which is more uptodate. Do you want to keep the newer AutoSaved version or the older saved version? This is a large change so the option you do not choose will be saved as file \'backup/%s.dgm\'"))(compChanges)(connChanges)(ldComp.Name)(ldComp.Name), "red"];
                    }
                    const message = patternInput_1[0];
                    const color = patternInput_1[1];
                    let body;
                    const props = [["style", {
                        color: color,
                    }]];
                    body = react_1.createElement("div", keyValueList(props, 1), message);
                    choicePopup(title, body, "Newer AutoSaved file", "Older Saved file", buttonAction, dispatch);
                }
            }
        }
        else {
            setupProjectFromComponents(false, chooseWhichToOpen(components), components, model, dispatch);
        }
        break;
    }
}

export function addToRecents(path, recents) {
    return insertAt(0, path, truncate(Constants_numberOfRecentProjects, filter_1((y) => !equals(path, y), defaultArg(recents, empty_1()))));
}

/**
 * open an existing demo project from its path
 */
export function openDemoProjectFromPath(path, model, dispatch) {
    warnAppWidth(dispatch, () => {
        traceIf("project", () => "loading files");
        const matchValue = loadAllComponentFiles(path);
        if (matchValue.tag === 0) {
            const componentsToResolve = matchValue.fields[0];
            traceIf("project", () => "resolving popups...");
            resolveComponentOpenPopup(path, empty_1(), componentsToResolve, model, dispatch);
            traceIf("project", () => "project successfully opened.");
        }
        else {
            const err = matchValue.fields[0];
            console.log(err);
            displayFileErrorNotification(err, dispatch);
        }
    });
}

/**
 * open an existing project from its path
 */
export function openProjectFromPath(path, model, dispatch) {
    warnAppWidth(dispatch, () => {
        dispatch(new Msg(89, [() => {
            let inputRecord, matchValue, componentsToResolve, err;
            traceIf("project", () => "loading files");
            dispatch(new Msg(85, [(inputRecord = model.UserData, new UserData(inputRecord.UserAppDir, path, (matchValue = loadAllComponentFiles(path), (matchValue.tag === 0) ? ((componentsToResolve = matchValue.fields[0], (traceIf("project", () => "resolving popups..."), (resolveComponentOpenPopup(path, empty_1(), componentsToResolve, model, dispatch), (traceIf("project", () => "project successfully opened."), addToRecents(path, model.UserData.RecentProjects)))))) : ((err = matchValue.fields[0], (console.log(err), (displayFileErrorNotification(err, dispatch), map_5((list) => filter_1((y) => (path !== y), list), model.UserData.RecentProjects)))))), inputRecord.ArrowDisplay, inputRecord.WireType, inputRecord.Theme))]));
            return Cmd_none();
        }]));
    });
}

/**
 * returns a WaveSimModel option if a file is loaded, otherwise None
 */
export function currWaveSimModel(model) {
    const matchValue = getCurrFile(model);
    if (matchValue != null) {
        const fileName = matchValue;
        return tryFind(fileName, model.WaveSim);
    }
    else {
        return void 0;
    }
}

/**
 * Return LoadedComponents with sheet name updated according to setFun.
 * Do not update model.
 */
export function updateLoadedComponents(name, setFun, lcLst, dispatch) {
    const n = tryFindIndex((lc) => (lc.Name === name), lcLst);
    if (n != null) {
        const n_1 = n | 0;
        const oldLc = item(n_1, lcLst);
        const newLc = setFun(oldLc);
        writeComponentToBackupFile(0, 1, oldLc, dispatch);
        return mapIndexed((i, x) => ((i === n_1) ? newLc : x), lcLst);
    }
    else {
        toConsole(printf("In updateLoadedcomponents can\'t find name=\'%s\' in components:%A"))(name)(lcLst);
        return lcLst;
    }
}

/**
 * return current project with current sheet updated from canvas if needed.
 * Do not update model.
 */
export function updateProjectFromCanvas(model, dispatch) {
    const matchValue = DrawModelType_SheetT_Model__Model_GetCanvasState(model.Sheet);
    let matchResult, canvasState;
    if (isEmpty(matchValue[0])) {
        if (isEmpty(matchValue[1])) {
            matchResult = 0;
        }
        else {
            matchResult = 1;
            canvasState = matchValue;
        }
    }
    else {
        matchResult = 1;
        canvasState = matchValue;
    }
    switch (matchResult) {
        case 0:
            return model.CurrentProj;
        default: {
            const canvas = canvasState;
            const patternInput = parseDiagramSignature(canvas[0], canvas[1]);
            const outputs = patternInput[1];
            const inputs = patternInput[0];
            const setLc = (lc) => (new LoadedComponent(lc.Name, lc.TimeStamp, lc.FilePath, lc.WaveInfo, canvas, inputs, outputs, lc.Form, lc.Description));
            return map_5((p) => (new Project(p.ProjectPath, p.OpenFileName, p.WorkingFileName, updateLoadedComponents(p.OpenFileName, setLc, p.LoadedComponents, dispatch))), model.CurrentProj);
        }
    }
}

/**
 * extract SavedWaveInfo from model to be saved
 */
export function getSavedWave(model) {
    const matchValue = currWaveSimModel(model);
    if (matchValue == null) {
        return void 0;
    }
    else {
        const wsModel = matchValue;
        return getSavedWaveInfo(wsModel);
    }
}

/**
 * Save the sheet currently open, return  the new sheet's Loadedcomponent if this has changed.
 * Do not change model.
 * update Symbol model with new RAM contents.
 */
export function saveOpenFileAction(isAuto, model, dispatch) {
    const matchValue = DrawModelType_SheetT_Model__Model_GetCanvasState(model.Sheet);
    const matchValue_1 = model.CurrentProj;
    if (matchValue_1 != null) {
        const project = matchValue_1;
        const canvasState = matchValue;
        const ldc = find((lc) => (lc.Name === project.OpenFileName), project.LoadedComponents);
        const sheetInfo = new SheetInfo_1(ldc.Form, ldc.Description);
        const savedState = [canvasState, getSavedWave(model), sheetInfo];
        if (isAuto) {
            toFail(printf("Auto saving is no longer used"));
            return void 0;
        }
        else {
            displayAlertOnError(dispatch, saveStateToFile(project.ProjectPath, project.OpenFileName, savedState[0], savedState[1], savedState[2]));
            removeFileWithExtn(".dgmauto", project.ProjectPath, project.OpenFileName);
            const origLdComp = find((lc_1) => (lc_1.Name === project.OpenFileName), project.LoadedComponents);
            const savedWaveSim = map_5(getSavedWaveInfo, tryFind(project.OpenFileName, model.WaveSim));
            let SheetInfo;
            const matchValue_3 = origLdComp.Form;
            if (matchValue_3 != null) {
                const form = matchValue_3;
                SheetInfo = (new SheetInfo_1(form, origLdComp.Description));
            }
            else {
                SheetInfo = void 0;
            }
            const patternInput = makeLoadedComponentFromCanvasData(canvasState[0], canvasState[1], origLdComp.FilePath, now(), savedWaveSim, SheetInfo);
            const ramCheck = patternInput[1];
            const newLdc = patternInput[0];
            let newState;
            const tupledArg = canvasState;
            const comps = tupledArg[0];
            const conns = tupledArg[1];
            newState = [map_3((comp) => {
                const matchValue_4 = tryFind_1((c) => (c.Id === comp.Id), ramCheck);
                if (matchValue_4 != null) {
                    const newRam = matchValue_4;
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
    }
    else {
        return void 0;
    }
}

export function saveOpenProjectInNewFormat(model) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        const _arg = map_3((comp) => {
            const sheetInfo = new SheetInfo_1(comp.Form, comp.Description);
            const savedState = [comp.CanvasState, void 0, sheetInfo];
            const matchValue_1 = saveStateToFileNew(project.ProjectPath, comp.Name, savedState[0], savedState[1], savedState[2]);
            if (matchValue_1.tag === 1) {
                const errr = matchValue_1.fields[0];
                toConsole(printf("Error on saving %s: %s"))(comp.Name)(errr);
            }
            else {
                toConsole(printf("Successfully saved %s"))(comp.Name);
            }
        }, project.LoadedComponents);
        toConsole(printf("Done"));
    }
    else {
        throw new Error("No opened project");
    }
}

/**
 * save current open file, updating model etc, and returning the loaded component and the saved (unreduced) canvas state
 */
export function saveOpenFileActionWithModelUpdate(model, dispatch) {
    const opt = saveOpenFileAction(false, model, dispatch);
    const ldcOpt = map_5((tuple) => tuple[0], opt);
    const state = defaultArg(map_5((tuple_1) => tuple_1[1], opt), [empty_1(), empty_1()]);
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const p = matchValue;
        dispatch(new Msg(34, [new Project(p.ProjectPath, p.OpenFileName, p.WorkingFileName, updateLdCompsWithCompOpt(ldcOpt, p.LoadedComponents))]));
    }
    else {
        toFail(printf("What? Should never be able to save sheet when project=None"));
    }
    dispatch(new Msg(5, [new JSDiagramMsg(4, [false])]));
    dispatch(new Msg(83, []));
    return opt;
}

/**
 * Open the specified file, saving the current file if needed.
 * Creates messages sufficient to do all necessary model and diagram change
 * Terminates a simulation if one is running
 * Closes waveadder if it is open
 */
export function openFileInProject$0027(saveCurrent, name, project, model, dispatch) {
    const newModel = new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, project, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
    const matchValue = getFileInProject(name, project);
    if (matchValue != null) {
        const lc = matchValue;
        const matchValue_1 = updateProjectFromCanvas(model, dispatch);
        if (matchValue_1 != null) {
            const p = matchValue_1;
            const updatedModel = new Model(newModel.UserData, newModel.WaveSim, newModel.WaveSimSheet, newModel.UISheetTrail, newModel.Spinner, newModel.Sheet, newModel.IsLoading, newModel.LastChangeCheckTime, newModel.LastSimulatedCanvasState, newModel.LastDetailedSavedState, newModel.CurrentSelected, newModel.LastSelectedIds, newModel.LastUsedDialogWidth, newModel.SelectedComponent, newModel.CurrentStepSimulationStep, newModel.CurrentTruthTable, newModel.TTConfig, newModel.RightPaneTabVisible, newModel.SimSubTabVisible, newModel.Hilighted, newModel.Clipboard, newModel.LastCreatedComponent, newModel.SavedSheetIsOutOfDate, p, newModel.PopupViewFunc, newModel.SpinnerPayload, newModel.PopupDialogData, newModel.Notifications, newModel.TopMenuOpenState, newModel.DividerDragMode, newModel.WaveSimViewerWidth, newModel.ConnsOfSelectedWavesAreHighlighted, newModel.Pending, newModel.UIState, newModel.BuildVisible, newModel.DrawBlockTestState);
            let ldcs;
            if (saveCurrent) {
                const opt = saveOpenFileAction(false, updatedModel, dispatch);
                const ldcOpt = map_5((tuple) => tuple[0], opt);
                const ldComps = updateLdCompsWithCompOpt(ldcOpt, project.LoadedComponents);
                ldcs = ldComps;
            }
            else {
                ldcs = project.LoadedComponents;
            }
            setupProjectFromComponents(true, name, ldcs, updatedModel, dispatch);
        }
        else {
            toFail(printf("What? current project cannot be None at this point in openFileInProject"));
        }
    }
    else {
        toConsole(printf("%s"))(`Anomalous project: sheet ${name}.dgm not found`);
        dispatch(new Msg(62, [errorFilesNotification(`Warning: Issie could not find the file '${name}.dgm' in the project. Did you delete a file manually?`)]));
        dispatch(new Msg(83, []));
    }
}

export function openFileInProject(name, project, model, dispatch) {
    openFileInProject$0027(model.SavedSheetIsOutOfDate, name, project, model, dispatch);
}

export function removeAllCustomComps(name, project) {
    const ldcs = project.LoadedComponents;
    return map_3((lc) => {
        const patternInput = lc.CanvasState;
        const conns = patternInput[1];
        const comps = patternInput[0];
        const idsToBeDeleted = map_3((comp_1) => comp_1.Id, filter_1((comp) => {
            let c;
            const matchValue = comp.Type;
            let matchResult, c_1;
            if (matchValue.tag === 26) {
                if ((c = matchValue.fields[0], c.Name === name)) {
                    matchResult = 0;
                    c_1 = matchValue.fields[0];
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
        }, comps));
        const newComps = filter_1((comp_2) => {
            let c_2;
            const matchValue_1 = comp_2.Type;
            let matchResult_1, c_3;
            if (matchValue_1.tag === 26) {
                if ((c_2 = matchValue_1.fields[0], c_2.Name === name)) {
                    matchResult_1 = 0;
                    c_3 = matchValue_1.fields[0];
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
                    toConsole(printf("custom %A"))(c_3);
                    return false;
                }
                default:
                    return true;
            }
        }, comps);
        toConsole(printf("todeleteids %A"))(idsToBeDeleted);
        const newConns = filter_1((conn) => {
            let hostId, targetId;
            const matchValue_2 = conn.Source.HostId;
            const matchValue_3 = conn.Target.HostId;
            if ((hostId = matchValue_2, exists((id) => (id === hostId), idsToBeDeleted))) {
                const hostId_1 = matchValue_2;
                return false;
            }
            else if ((targetId = matchValue_3, exists((id_1) => (id_1 === targetId), idsToBeDeleted))) {
                const targetId_1 = matchValue_3;
                return false;
            }
            else {
                return true;
            }
        }, conns);
        return new LoadedComponent(lc.Name, lc.TimeStamp, lc.FilePath, lc.WaveInfo, [newComps, newConns], lc.InputLabels, lc.OutputLabels, lc.Form, lc.Description);
    }, ldcs);
}

/**
 * Remove file.
 */
export function removeFileInProject(name, project, model, dispatch) {
    removeFile(project.ProjectPath, name);
    const newComponents = filter_1((lc) => (lc.Name.toLocaleLowerCase() !== name.toLocaleLowerCase()), project.LoadedComponents);
    const project$0027 = new Project(project.ProjectPath, project.OpenFileName, project.WorkingFileName, newComponents);
    const newComponents$0027 = removeAllCustomComps(name, project$0027);
    const project$0027_1 = new Project(project$0027.ProjectPath, project$0027.OpenFileName, project$0027.WorkingFileName, newComponents$0027);
    const matchValue = name === project.OpenFileName;
    if (isEmpty(newComponents)) {
        if (matchValue) {
            const newComponents_1 = singleton(createEmptyDiagramFile(project.ProjectPath, "main"));
            const project$0027_2 = new Project(project$0027_1.ProjectPath, "main", "main", newComponents_1);
            openFileInProject$0027(false, item(0, newComponents_1).Name, project$0027_2, model, dispatch);
        }
        else {
            toFail(printf("What? - this cannot happen"));
        }
    }
    else if (matchValue) {
        const nc = newComponents;
        openFileInProject$0027(false, item(0, project$0027_1.LoadedComponents).Name, project$0027_1, model, dispatch);
    }
    else {
        const nc_1 = newComponents;
        openFileInProject$0027(false, project$0027_1.OpenFileName, project$0027_1, model, dispatch);
    }
    dispatch(new Msg(83, []));
}

export function deleteFileConfirmationPopup(sheetName, model, dispatch) {
    const title = "Delete sheet";
    const project = value_3(model.CurrentProj);
    let body;
    const children = ["Are you sure you want to delete the following design sheet?", react_1.createElement("br", {}), pathJoin([project.ProjectPath, sheetName + ".dgm"]), react_1.createElement("br", {}), "This action is irreversible."];
    body = react_1.createElement("div", {}, ...children);
    const buttonText = "Delete";
    const buttonAction = (_arg) => {
        dispatch(new Msg(82, [new UICommandType(4, [])]));
        dispatch(new Msg(88, [(model_1, dispatch_1) => {
            removeFileInProject(sheetName, project, model_1, dispatch_1);
        }, dispatch]));
        dispatch(new Msg(41, []));
    };
    confirmationPopup(title, buttonText, body, buttonAction, dispatch);
}

export function getHintPaneElement(model) {
    const matchValue = model.Sheet.Wire.Symbol.HintPane;
    if (model.TopMenuOpenState.tag === 2) {
        const props_2 = [["style", {
            fontSize: "90%",
        }]];
        const children = ["Click -> Open Sheet", react_1.createElement("br", {}), "Left-click -> Rename or Delete"];
        return react_1.createElement("div", keyValueList(props_2, 1), ...children);
    }
    else if (matchValue != null) {
        const hint = matchValue;
        return hint;
    }
    else {
        return "";
    }
}

//# sourceMappingURL=MenuHelpers.fs.js.map
