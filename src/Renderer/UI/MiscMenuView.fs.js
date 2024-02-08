import { Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { record_type, list_type, class_type, unit_type, lambda_type, string_type, bool_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { openDemoProjectFromPath, openProjectFromPath, Constants_greenColor, Constants_boldStyle, Constants_blueColor, Constants_redColor, isFileInProject, allRootSheets, getSheetTrees, SheetTree__lookupPath_7F866359, SheetTree_$reflection } from "./MenuHelpers.fs.js";
import { Modifier_IModifier, Size_ISize, Color_IColor, Color_IColor_$reflection } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import { ImportDecision, Msg, Msg_$reflection } from "../Model/ModelType.fs.js";
import { HTMLAttr, CSSProp, CSSProp_$reflection } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { button, Option, Option_$reflection } from "../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { item as item_1, iterate, toArray as toArray_1, forAll as forAll_1, cons, contains, find, filter, collect, exists, mapIndexed, last, sortBy, length, getSlice, map, fold, singleton, sumBy, isEmpty, append, ofArray, empty } from "../fable_modules/fable-library.4.1.4/List.js";
import * as react from "react";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { tryGetLoadedComponents, mapOverProject, CSSGridPos } from "./ModelHelpers.fs.js";
import { containsKey, add, tryFind, toList as toList_2, FSharpMap__get_Item } from "../fable_modules/fable-library.4.1.4/Map.js";
import { map as map_1, defaultArg, value as value_2 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { singleton as singleton_1, append as append_1, delay, tryItem, forAll, exists as exists_1, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { equalArrays, equals, stringHash, comparePrimitives } from "../fable_modules/fable-library.4.1.4/Util.js";
import { StringModule_Concat } from "../Common/EEExtensions.fs.js";
import { ofList, toArray, count, toList as toList_1 } from "../fable_modules/fable-library.4.1.4/Set.js";
import { List_distinct } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { printf, toText, endsWith } from "../fable_modules/fable-library.4.1.4/String.js";
import { isDigit, isLetterOrDigit } from "../fable_modules/fable-library.4.1.4/Char.js";
import { askForExistingSheetPaths, copyFile, pathWithoutExtension, fileNameIsBad, tryLoadComponentFromPath, dirName, baseName, pathJoin, hasExtn, baseNameWithoutExtension, exists as exists_2 } from "../Interface/FilesIO.fs.js";
import { dialogPopup, dialogPopupBodyOnlyText, getText, getImportDecisions } from "../DrawBlock/PopupHelpers.fs.js";
import { item, level } from "../fable_modules/Fulma.2.16.0/Layouts/Level.fs.js";
import { parseDiagramSignature } from "../Simulator/Extractor.fs.js";
import { concat, append as append_2, map as map_2 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { table as table_1 } from "../fable_modules/Fulma.2.16.0/Elements/Table.fs.js";
import { SheetT_Msg } from "../Model/DrawModelType.fs.js";

export class BreadcrumbConfig extends Record {
    constructor(AllowDuplicateSheets, BreadcrumbIdPrefix, ColorFun, ClickAction, ElementProps, ElementStyleProps, ButtonOptions) {
        super();
        this.AllowDuplicateSheets = AllowDuplicateSheets;
        this.BreadcrumbIdPrefix = BreadcrumbIdPrefix;
        this.ColorFun = ColorFun;
        this.ClickAction = ClickAction;
        this.ElementProps = ElementProps;
        this.ElementStyleProps = ElementStyleProps;
        this.ButtonOptions = ButtonOptions;
    }
}

export function BreadcrumbConfig_$reflection() {
    return record_type("MiscMenuView.BreadcrumbConfig", [], BreadcrumbConfig, () => [["AllowDuplicateSheets", bool_type], ["BreadcrumbIdPrefix", string_type], ["ColorFun", lambda_type(SheetTree_$reflection(), Color_IColor_$reflection())], ["ClickAction", lambda_type(SheetTree_$reflection(), lambda_type(lambda_type(Msg_$reflection(), unit_type), unit_type))], ["ElementProps", list_type(class_type("Fable.React.Props.IHTMLProp"))], ["ElementStyleProps", list_type(CSSProp_$reflection())], ["ButtonOptions", list_type(Option_$reflection())]]);
}

export const Constants_gridBoxSeparation = "5px";

export const Constants_colArrayStyle = ["style", {
    borderColor: "white",
    borderWidth: "10px",
    borderStyle: "solid",
    padding: "50px",
}];

export const Constants_defaultConfig = new BreadcrumbConfig(false, "BreadcrumbDefault", (_arg) => (new Color_IColor(13, [])), (_arg_1, _arg_2) => {
}, empty(), ofArray([new CSSProp(33, ["2px"]), new CSSProp(49, ["LightGrey"]), new CSSProp(71, ["DarkGrey"]), new CSSProp(75, ["Solid"]), new CSSProp(17, ["LightGrey"]), new CSSProp(273, ["5px"])]), ofArray([new Option(1, [new Size_ISize(0, [])]), new Option(4, []), new Option(9, []), new Option(11, [true]), new Option(16, [false])]));

export function gridBox(gap, s) {
    const props = [["style", {
        display: "inline-grid",
        gridGap: gap,
        justifyContent: "Start",
    }]];
    return react.createElement("div", keyValueList(props, 1), ...s);
}

export function gridArea(gridPos_mut) {
    gridArea:
    while (true) {
        const gridPos = gridPos_mut;
        switch (gridPos.tag) {
            case 2: {
                const yStart = gridPos.fields[1] | 0;
                const yEnd = gridPos.fields[3] | 0;
                const xStart = gridPos.fields[0] | 0;
                const xEnd = gridPos.fields[2] | 0;
                gridPos_mut = (new CSSGridPos(1, [xStart, yStart, (xEnd - xStart) + 1, (yEnd - yStart) + 1]));
                continue gridArea;
            }
            case 1: {
                const startY = gridPos.fields[1] | 0;
                const startX = gridPos.fields[0] | 0;
                const spanY = gridPos.fields[3] | 0;
                const spanX = gridPos.fields[2] | 0;
                return `${startY} / ${startX} / span ${spanY} / span ${spanX}`;
            }
            default: {
                const b = gridPos.fields[1] | 0;
                const a = gridPos.fields[0] | 0;
                gridPos_mut = (new CSSGridPos(1, [a, b, 1, 1]));
                continue gridArea;
            }
        }
        break;
    }
}

/**
 * a Grid item centre justified and occupying given area
 */
export function gridElement(reactElementId, props, styleProps, pos, x) {
    const props_1 = append(props, ofArray([new HTMLAttr(99, [reactElementId]), ["style", keyValueList(append(styleProps, ofArray([new CSSProp(125, ["flex"]), new CSSProp(136, ["column"]), new CSSProp(325, ["center"]), new CSSProp(201, ["center"]), new CSSProp(200, ["center"]), new CSSProp(395, ["100%"]), new CSSProp(189, ["100%"]), new CSSProp(169, [gridArea(pos)])])), 1)]]));
    return react.createElement("div", keyValueList(props_1, 1), x);
}

export function positionDesignHierarchyInGrid(rootSheet, trees) {
    const tree = FSharpMap__get_Item(trees, rootSheet);
    const maxDepth = FSharpMap__get_Item(trees, rootSheet).Depth | 0;
    const getTreeHeight = (tree_1) => {
        const matchValue = tree_1.SubSheets;
        if (isEmpty(matchValue)) {
            return 1;
        }
        else {
            const subs = matchValue;
            return sumBy(getTreeHeight, subs, {
                GetZero: () => 0,
                Add: (x, y) => (x + y),
            }) | 0;
        }
    };
    const getSheetPositions = (startX, startY, tree_2) => {
        const height = getTreeHeight(tree_2) | 0;
        const matchValue_1 = tree_2.SubSheets;
        if (isEmpty(matchValue_1)) {
            return singleton([new CSSGridPos(1, [startX, startY, 1, height]), tree_2]);
        }
        else {
            const others = matchValue_1;
            return append(singleton([new CSSGridPos(1, [startX, startY, 1, height]), tree_2]), fold((tupledArg, subSheet) => {
                const offset = tupledArg[0] | 0;
                const posL$0027 = tupledArg[1];
                const offset$0027 = (offset + getTreeHeight(subSheet)) | 0;
                const posL$0027$0027 = append(posL$0027, getSheetPositions(startX + 1, startY + offset, subSheet));
                return [offset$0027, posL$0027$0027];
            }, [0, empty()], others)[1]);
        }
    };
    return getSheetPositions(1, 1, tree);
}

export function positionRootAndFocusChildrenInGrid(root, pathToFocus, trees) {
    const tree = FSharpMap__get_Item(trees, root);
    const sheetsInPath = map((path) => value_2(SheetTree__lookupPath_7F866359(tree, path)), map((i) => getSlice(0, i, pathToFocus), toList(rangeDouble(0, 1, length(pathToFocus) - 1))));
    const children = sortBy((sheet) => sheet.BreadcrumbName, last(sheetsInPath).SubSheets, {
        Compare: comparePrimitives,
    });
    return mapIndexed((i_1, sheet_1) => [new CSSGridPos(1, [length(sheetsInPath) + 1, 1, 1, length(children)]), sheet_1], children);
}

export function makeGridFromSheetsWithPositions(cfg, dispatch, posL) {
    return gridBox(Constants_gridBoxSeparation, map((tupledArg) => {
        const pos = tupledArg[0];
        const sheet = tupledArg[1];
        const crumbId = (((cfg.BreadcrumbIdPrefix + ":") + sheet.SheetName) + ":") + StringModule_Concat(":", sheet.LabelPath);
        const extraStyle = isEmpty(sheet.SubSheets) ? ofArray([new CSSProp(21, ["white"]), new CSSProp(82, ["0px"])]) : cfg.ElementStyleProps;
        return gridElement(crumbId, cfg.ElementProps, extraStyle, pos, button(ofArray([new Option(17, [singleton(new HTMLAttr(99, [crumbId]))]), new Option(0, [cfg.ColorFun(sheet)]), new Option(20, [singleton(new Modifier_IModifier(1, [new Color_IColor(2, [])]))]), new Option(18, [(ev) => {
            cfg.ClickAction(sheet, dispatch);
        }])]), singleton(`${sheet.SheetName}`)));
    }, posL));
}

/**
 * display as a ReactElement the breadcrumbs.
 * clickAction - what happens when a given breadcrumb is clicked.
 * project - the model project.
 */
export function makeBreadcrumbsFromPositions(sheetTreeMap, cfg, positionSheetsInGrid, dispatch) {
    return makeGridFromSheetsWithPositions(cfg, dispatch, positionSheetsInGrid(sheetTreeMap));
}

/**
 * Breadcrumbs of entire simulated design hierarchy.
 * Display as a ReactElement the breadcrumbs.
 * ClickAction - what happens when a given breadcrumb (labelled by its path to root) is clicked.
 */
export function hierarchyBreadcrumbs(cfg, dispatch, model) {
    return mapOverProject(react.createElement("div", {}), model, (p) => {
        const root = defaultArg(model.WaveSimSheet, p.OpenFileName);
        const sheetTreeMap = getSheetTrees(cfg.AllowDuplicateSheets, p);
        return makeBreadcrumbsFromPositions(sheetTreeMap, cfg, (trees) => positionDesignHierarchyInGrid(root, trees), dispatch);
    });
}

/**
 * Breadcrumbs of entire design hierarchy from given sheet
 * Display as a ReactElement the breadcrumbs.
 * rootSheet - root of hierrarchy displayed
 * clickAction - what happens when a given breadcrumb (labelled by its path to root) is clicked.
 */
export function hierarchyFromSheetBreadcrumbs(rootSheet, cfg, dispatch, model) {
    return mapOverProject(react.createElement("div", {}), model, (p) => {
        const sheetTreeMap = getSheetTrees(cfg.AllowDuplicateSheets, p);
        return makeBreadcrumbsFromPositions(sheetTreeMap, cfg, (trees) => positionDesignHierarchyInGrid(rootSheet, trees), dispatch);
    });
}

/**
 * Breadcrumbs of entire design hierarchy of every root sheet in project
 * Display as a ReactElement the breadcrumbs.
 * rootSheet - root of hierrarchy displayed
 * clickAction - what happens when a given breadcrumb (labelled by its path to root) is clicked.
 */
export function allRootHierarchiesFromProjectBreadcrumbs(cfg, dispatch, model) {
    const rows = mapIndexed((i, el) => {
        const children_4 = [react.createElement("td", {
            cellSpacing: "50px",
        }, el)];
        return react.createElement("tr", keyValueList([Constants_colArrayStyle], 1), ...children_4);
    }, mapOverProject(singleton(react.createElement("div", {})), model, (p) => {
        const sheetTreeMap = getSheetTrees(cfg.AllowDuplicateSheets, p);
        return map((root) => makeBreadcrumbsFromPositions(sheetTreeMap, cfg, (trees) => positionDesignHierarchyInGrid(root, trees), dispatch), toList_1(allRootSheets(sheetTreeMap)));
    }));
    const children_8 = [react.createElement("tbody", {}, ...rows)];
    return react.createElement("table", {}, ...children_8);
}

/**
 * is there a duplicate sheet name anywhere in hierarchy?
 */
export function hierarchiesHaveDuplicates(model) {
    return mapOverProject(false, model, (p) => exists((x_1) => x_1, map((tupledArg) => {
        const sheet = tupledArg[1];
        const sheetNames = map((sheet_1) => sheet_1.SheetName, sheet.SubSheets);
        return length(sheetNames) === length(List_distinct(sheetNames, {
            Equals: (x, y) => (x === y),
            GetHashCode: stringHash,
        }));
    }, toList_2(getSheetTrees(true, p)))));
}

/**
 * Breadcrumbs of the focus sheet, with sheets on its path to root, and its children.
 * Provides navigation while occupying small vertical area. Untested.
 * *** TODO: hookthis function to simulation and test ***
 * Should be called extracting inputs from waveform simulation.
 * Display as a ReactElement the breadcrumbs.
 * clickAction - what happens when a given breadcrumb (labelled by its path to root) is clicked.
 * project - the model project
 */
export function smallSimulationBreadcrumbs(rootName, pathToFocus, cfg, dispatch, model) {
    return mapOverProject(react.createElement("div", {}), model, (p) => makeBreadcrumbsFromPositions(getSheetTrees(cfg.AllowDuplicateSheets, p), cfg, (trees) => positionRootAndFocusChildrenInGrid(rootName, pathToFocus, trees), dispatch));
}

/**
 * return a react warning message if name if not valid for a sheet Add or Rename, or else None
 */
export function maybeWarning(dialogText, project) {
    const redText = (txt) => {
        let props;
        return (props = [["style", {
            color: "red",
        }]], react.createElement("div", keyValueList(props, 1), txt));
    };
    if (isFileInProject(dialogText, project)) {
        return redText("This sheet already exists.");
    }
    else if ((dialogText.indexOf(" ") === 0) ? true : endsWith(dialogText, " ")) {
        return redText("The sheet name cannot start or end with a space.");
    }
    else if (exists_1((y) => ("." === y), dialogText.split(""))) {
        return redText("The sheet name cannot contain a file suffix.");
    }
    else if (!forAll((c) => {
        let ch;
        return ((ch = c, isLetterOrDigit(ch) ? true : (ch === "_"))) ? true : (c === " ");
    }, dialogText.split(""))) {
        return redText("The sheet name must contain only letters, digits, spaces or underscores");
    }
    else if (equals(map_1(isDigit, tryItem(0, dialogText.split(""))), true)) {
        return redText("The name must not start with a digit");
    }
    else {
        return void 0;
    }
}

/**
 * Find all sheets that depend on the given sheet in the current project
 */
export function getDependentsFromSheet(model, sheetName) {
    return mapOverProject(void 0, model, (p) => {
        const instances = collect((ldc_1) => collect((_arg) => {
            let outs, name, ins, cid;
            let matchResult, cid_1, ins_1, name_1, outs_1;
            if (_arg.Type.tag === 26) {
                if ((outs = _arg.Type.fields[0].OutputLabels, (name = _arg.Type.fields[0].Name, (ins = _arg.Type.fields[0].InputLabels, (cid = _arg.Id, name === sheetName))))) {
                    matchResult = 0;
                    cid_1 = _arg.Id;
                    ins_1 = _arg.Type.fields[0].InputLabels;
                    name_1 = _arg.Type.fields[0].Name;
                    outs_1 = _arg.Type.fields[0].OutputLabels;
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
                    return singleton([ldc_1.Name, cid_1, [ins_1, outs_1]]);
                default:
                    return empty();
            }
        }, ldc_1.CanvasState[0]), filter((ldc) => (ldc.Name !== sheetName), p.LoadedComponents));
        return instances;
    });
}

/**
 * given paths from source directory and destination directory of a sheet that needs importing, if it exists in destination directory,
 * return its dependents wrapped in 'Some'. Otherwise return 'None'
 */
export function getDependents(model, oldSheetPath, newSheetPath) {
    if (exists_2(newSheetPath)) {
        const sheetName = baseNameWithoutExtension(oldSheetPath);
        const matchValue = getDependentsFromSheet(model, sheetName);
        if (matchValue != null) {
            const instances = matchValue;
            return StringModule_Concat(",", List_distinct(map((tupledArg) => {
                const sheet = tupledArg[0];
                return sheet;
            }, instances), {
                Equals: (x, y) => (x === y),
                GetHashCode: stringHash,
            }));
        }
        else {
            return "";
        }
    }
    else {
        return void 0;
    }
}

export function Button(sheetPath, buttonDecision, label, isDisabled, model, dispatch) {
    const hasBeenPressed = (model_1) => {
        const valueOption = tryFind(sheetPath, getImportDecisions(model_1.PopupDialogData));
        if (valueOption == null) {
            return false;
        }
        else {
            const decision$0027 = value_2(valueOption);
            return equals(decision$0027, buttonDecision);
        }
    };
    const updateDecisions = (sheetPath_1, decisionOption, model$0027) => {
        const updatedDecisions = add(sheetPath_1, decisionOption, getImportDecisions(model$0027.PopupDialogData));
        dispatch(new Msg(37, [updatedDecisions]));
    };
    return singleton(button(ofArray([new Option(1, [new Size_ISize(0, [])]), new Option(4, []), new Option(0, [new Color_IColor(4, [])]), new Option(16, [isDisabled]), new Option(11, [hasBeenPressed(model)]), new Option(18, [(_arg) => {
        updateDecisions(sheetPath, buttonDecision, model);
    }])]), singleton(label)));
}

/**
 * return text that should display in 'Action' column of import sheets popup
 */
export function getDecisionText(path, model, sheetIsDependency, decisionNeeded) {
    const getDecision = (model_1) => tryFind(path, getImportDecisions(model_1.PopupDialogData));
    const matchValue = getDecision(model);
    if (matchValue == null) {
        if (sheetIsDependency ? true : decisionNeeded) {
            const props_8 = [["style", keyValueList([Constants_redColor], 1)]];
            return react.createElement("p", keyValueList(props_8, 1), "Ignore");
        }
        else {
            return react.createElement("p", {}, "Import");
        }
    }
    else {
        const decision = value_2(matchValue);
        if (decision == null) {
            const props_6 = [["style", keyValueList([Constants_redColor], 1)]];
            return react.createElement("p", keyValueList(props_6, 1), "Ignore");
        }
        else if (decision.tag === 1) {
            const props_4 = [["style", keyValueList([Constants_blueColor], 1)]];
            return react.createElement("p", keyValueList(props_4, 1), "Rename");
        }
        else if (sheetIsDependency) {
            return react.createElement("p", {}, "Import");
        }
        else {
            const props_2 = [["style", keyValueList([Constants_blueColor], 1)]];
            return react.createElement("p", keyValueList(props_2, 1), "Overwrite");
        }
    }
}

/**
 * return react element for 2 buttons that are side by side
 */
export function twoButtons(leftButton, rightButton) {
    return level(empty(), ofArray([item(empty(), leftButton), item(empty(), rightButton)]));
}

/**
 * prepare information that should display on a row for a dependency of a sheet
 */
export function dependencyRow(sheetPath, model, dispatch, dependencyPath) {
    let props, children, children_4, children_2, children_6, rightButton, children_8, props_12, children_12, children_18, children_14, props_16, children_24, props_22;
    if (hasExtn(".dgm", dependencyPath)) {
        const children_10 = [(props = [["style", keyValueList([Constants_boldStyle], 1)]], (children = [baseNameWithoutExtension(dependencyPath)], react.createElement("td", keyValueList(props, 1), ...children))), (children_4 = ["Dependency of ", (children_2 = [baseNameWithoutExtension(sheetPath)], react.createElement("strong", {}, ...children_2)), "."], react.createElement("td", {}, ...children_4)), (children_6 = [(rightButton = Button(dependencyPath, void 0, "Ignore", false, model, dispatch), twoButtons(Button(dependencyPath, new ImportDecision(0, []), "Import", false, model, dispatch), rightButton))], react.createElement("td", {}, ...children_6)), (children_8 = [getDecisionText(dependencyPath, model, true, false)], react.createElement("td", {}, ...children_8))];
        return react.createElement("tr", {}, ...children_10);
    }
    else {
        const children_26 = [(props_12 = [["style", keyValueList([Constants_boldStyle], 1)]], (children_12 = [baseNameWithoutExtension(dependencyPath)], react.createElement("td", keyValueList(props_12, 1), ...children_12))), (children_18 = ["Dependency of ", (children_14 = [baseNameWithoutExtension(sheetPath)], react.createElement("strong", {}, ...children_14)), ".", (props_16 = [["style", keyValueList([Constants_redColor], 1)]], react.createElement("p", keyValueList(props_16, 1), "Doesn\'t exist in source and destination directories."))], react.createElement("td", {}, ...children_18)), react.createElement("td", {}, "N/A"), (children_24 = [(props_22 = [["style", keyValueList([Constants_redColor], 1)]], react.createElement("p", keyValueList(props_22, 1), "Ignore"))], react.createElement("td", {}, ...children_24))];
        return react.createElement("tr", {}, ...children_26);
    }
}

/**
 * for each imported sheet, create layout for its row in the popup table, as well as rows for all its dependencies.
 */
export function createSheetInfo(model, projectDir, dispatch, _arg1_, _arg1__1) {
    let children_8, props, children, children_32, props_20, children_20, children_26, children_28, rightButton, children_30, children_18, props_10, children_10, children_42, props_38, children_34, children_52, props_48, children_44, children_46, children_50;
    const _arg = [_arg1_, _arg1__1];
    const sheetPath = _arg[0];
    const dependencies = _arg[1];
    const newSheetPath = pathJoin([projectDir, baseName(sheetPath)]);
    const hasDependencies = count(dependencies) !== 0;
    let patternInput;
    const matchValue = getDependents(model, sheetPath, newSheetPath);
    if (matchValue == null) {
        patternInput = [false, ""];
    }
    else {
        const depSheets = matchValue;
        patternInput = [true, depSheets];
    }
    const sheetExists = patternInput[0];
    const depSheets_1 = patternInput[1];
    if (projectDir === dirName(sheetPath)) {
        return [(children_8 = [(props = [["style", keyValueList([Constants_boldStyle], 1)]], (children = [baseNameWithoutExtension(sheetPath)], react.createElement("td", keyValueList(props, 1), ...children))), react.createElement("td", {}, "Cannot be imported as it is from the current directory"), react.createElement("td", {}, "N/A"), react.createElement("td", {}, "N/A")], react.createElement("tr", {}, ...children_8))];
    }
    else if (sheetExists) {
        const matchValue_1 = tryLoadComponentFromPath(sheetPath);
        if (matchValue_1.tag === 0) {
            const ldcSource = matchValue_1.fields[0];
            let sourceSig;
            const tupledArg = ldcSource.CanvasState;
            sourceSig = parseDiagramSignature(tupledArg[0], tupledArg[1]);
            let destSig;
            const tupledArg_1 = find((ldc) => (ldc.Name === baseNameWithoutExtension(sheetPath)), tryGetLoadedComponents(model)).CanvasState;
            destSig = parseDiagramSignature(tupledArg_1[0], tupledArg_1[1]);
            const overwriteDisabled = !equalArrays(sourceSig, destSig) && (depSheets_1 !== "");
            const sheetRow = [(children_32 = [(props_20 = [["style", keyValueList([Constants_boldStyle], 1)]], (children_20 = [baseNameWithoutExtension(sheetPath)], react.createElement("td", keyValueList(props_20, 1), ...children_20))), (children_26 = toList(delay(() => append_1(singleton_1("Sheet already exists in destination directory. "), delay(() => append_1(singleton_1(react.createElement("br", {})), delay(() => append_1(hasDependencies ? singleton_1("Sheet has dependencies.") : singleton_1(""), delay(() => append_1(singleton_1(react.createElement("br", {})), delay(() => {
                let props_26, props_28;
                return !equalArrays(sourceSig, destSig) ? ((depSheets_1 !== "") ? singleton_1((props_26 = [["style", keyValueList([Constants_redColor], 1)]], react.createElement("p", keyValueList(props_26, 1), "Overwrite disabled because sheets contain different hardware. Danger of conflicts in dependents."))) : singleton_1((props_28 = [["style", keyValueList([Constants_greenColor], 1)]], react.createElement("p", keyValueList(props_28, 1), "Sheets contain different hardware, but overwrite allowed as there are no dependents.")))) : singleton_1("");
            })))))))))), react.createElement("td", {}, ...children_26)), (children_28 = [(rightButton = Button(sheetPath, new ImportDecision(1, []), "Rename", false, model, dispatch), twoButtons(Button(sheetPath, new ImportDecision(0, []), "Overwrite", overwriteDisabled, model, dispatch), rightButton))], react.createElement("td", {}, ...children_28)), (children_30 = [getDecisionText(sheetPath, model, false, true)], react.createElement("td", {}, ...children_30))], react.createElement("tr", {}, ...children_32))];
            const dependencyRows = map_2((dependency) => dependencyRow(sheetPath, model, dispatch, dependency), toArray(dependencies));
            return append_2(sheetRow, dependencyRows);
        }
        else {
            const err = matchValue_1.fields[0];
            return [(children_18 = [(props_10 = [["style", keyValueList([Constants_boldStyle], 1)]], (children_10 = [baseNameWithoutExtension(sheetPath)], react.createElement("td", keyValueList(props_10, 1), ...children_10))), react.createElement("td", {}, err), react.createElement("td", {}), react.createElement("td", {}, "Ignore")], react.createElement("tr", {}, ...children_18))];
        }
    }
    else if (fileNameIsBad(pathWithoutExtension(baseName(sheetPath)).split(""))) {
        return [(children_42 = [(props_38 = [["style", keyValueList([Constants_boldStyle], 1)]], (children_34 = [baseNameWithoutExtension(sheetPath)], react.createElement("td", keyValueList(props_38, 1), ...children_34))), react.createElement("td", {}, "Cannot be imported because it contains incorrect characters. "), react.createElement("td", {}), react.createElement("td", {}, "Ignore")], react.createElement("tr", {}, ...children_42))];
    }
    else {
        const sheetRow_1 = [(children_52 = [(props_48 = [["style", keyValueList([Constants_boldStyle], 1)]], (children_44 = [baseNameWithoutExtension(sheetPath)], react.createElement("td", keyValueList(props_48, 1), ...children_44))), (children_46 = toList(delay(() => (hasDependencies ? singleton_1("Sheet will be imported, but has dependencies.") : singleton_1("Sheet will be imported without conflicts")))), react.createElement("td", {}, ...children_46)), react.createElement("td", {}), (children_50 = [getDecisionText(sheetPath, model, false, false)], react.createElement("td", {}, ...children_50))], react.createElement("tr", {}, ...children_52))];
        const dependencyRows_1 = map_2((dependency_1) => dependencyRow(sheetPath, model, dispatch, dependency_1), toArray(dependencies));
        return append_2(sheetRow_1, dependencyRows_1);
    }
}

/**
 * Returns with a list of each path with its dependencies. This includes dependencies of dependencies
 */
export function pathsWithDependencies(destProjectDir, paths, sourceProjectDir) {
    return map((path) => {
        const search = (path_1, deps) => {
            const matchValue = tryLoadComponentFromPath(path_1);
            if (matchValue.tag === 0) {
                const ldc = matchValue.fields[0];
                const comps = ldc.CanvasState[0];
                const customCompsPaths = filter((s) => (s !== ""), List_distinct(map((comp_1) => {
                    const matchValue_3 = comp_1.Type;
                    if (matchValue_3.tag === 26) {
                        const ct = matchValue_3.fields[0];
                        const dependencyPath = pathJoin([sourceProjectDir, ct.Name + ".dgm"]);
                        return dependencyPath;
                    }
                    else {
                        return "";
                    }
                }, filter((comp) => {
                    if (comp.Type.tag === 26) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }, comps)), {
                    Equals: (x, y) => (x === y),
                    GetHashCode: stringHash,
                }));
                if (length(customCompsPaths) === 0) {
                    return deps;
                }
                else {
                    return collect((dependencyPath_1) => {
                        if (exists_2(pathJoin([destProjectDir, baseName(dependencyPath_1)])) ? true : contains(dependencyPath_1, paths, {
                            Equals: (x_1, y_1) => (x_1 === y_1),
                            GetHashCode: stringHash,
                        })) {
                            return search(dependencyPath_1, deps);
                        }
                        else if (exists_2(dependencyPath_1)) {
                            return search(dependencyPath_1, cons(dependencyPath_1, deps));
                        }
                        else {
                            return search(dependencyPath_1, cons(baseNameWithoutExtension(dependencyPath_1), deps));
                        }
                    }, customCompsPaths);
                }
            }
            else {
                const err = matchValue.fields[0];
                if (exists_2(pathJoin([destProjectDir, baseName(path_1)]))) {
                    return deps;
                }
                else {
                    return cons(baseNameWithoutExtension(path_1), deps);
                }
            }
        };
        const dependencies = ofList(search(path, empty()), {
            Compare: comparePrimitives,
        });
        return [path, dependencies];
    }, paths);
}

/**
 * when sheet selected for import is from current directory, show popup asking user to rename the file
 */
export function renameSheetBeforeImportPopup(oldPath, model, dispatch) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        const title = "Duplicate sheet ";
        const sheetName = baseName(oldPath);
        const before = (dialogData) => {
            let arg_1;
            const dialogText = getText(dialogData);
            const children_2 = [toText(printf("Warning: Sheet %s is from current directory."))(sheetName), react.createElement("br", {}), react.createElement("br", {}), (arg_1 = ((dialogText + "_") + baseNameWithoutExtension(oldPath)), toText(printf("New name: %s"))(arg_1)), defaultArg(maybeWarning((dialogText + "_") + baseNameWithoutExtension(oldPath), project), react.createElement("div", {}))];
            return react.createElement("div", {}, ...children_2);
        };
        const placeholder = "Prefix for design sheet";
        const body = (model_1) => dialogPopupBodyOnlyText(before, placeholder, dispatch, model_1);
        const buttonText = "Rename";
        const buttonAction = (model$0027) => {
            const newName = (getText(model$0027.PopupDialogData).toLocaleLowerCase() + "_") + sheetName;
            const newPath = pathJoin([dirName(oldPath), newName]);
            copyFile(oldPath, newPath);
            openProjectFromPath(project.ProjectPath, model$0027, dispatch);
            dispatch(new Msg(41, []));
        };
        const isDisabled = (model$0027_1) => {
            const dialogData_1 = model$0027_1.PopupDialogData;
            const dialogText_1 = getText(dialogData_1);
            if (isFileInProject((dialogText_1 + "_") + baseNameWithoutExtension(oldPath), project) ? true : (dialogText_1 === "")) {
                return true;
            }
            else {
                return fileNameIsBad(((dialogText_1 + "_") + baseNameWithoutExtension(oldPath)).split(""));
            }
        };
        dialogPopup(title, body, buttonText, buttonAction, isDisabled, empty(), dispatch);
    }
    else {
        console.log("Warning: renameSheetBeforeImport called when no project is currently open");
    }
}

export function importSheetPopup(destProjectDir, paths, sourceProjectDir, dispatch) {
    const filterSheets = (existing) => filter((sheetPath) => {
        const newSheetPath = pathJoin([destProjectDir, baseName(sheetPath)]);
        if (!fileNameIsBad(baseNameWithoutExtension(baseName(sheetPath)).split(""))) {
            if (existing) {
                return exists_2(newSheetPath);
            }
            else {
                return !exists_2(newSheetPath);
            }
        }
        else {
            return false;
        }
    }, paths);
    const allDecisionsMade = (allSheets, model) => {
        const matchValue = filterSheets(true);
        if (isEmpty(matchValue)) {
            return true;
        }
        else {
            const sheets = matchValue;
            return forAll_1((sheetPath_1) => containsKey(sheetPath_1, getImportDecisions(model.PopupDialogData)), sheets);
        }
    };
    const headCell = (heading) => react.createElement("th", {}, heading);
    const popupBody = (model$0027) => {
        let children_4, children_2, children_6;
        const content = toArray_1(map((tupledArg) => createSheetInfo(model$0027, destProjectDir, dispatch, tupledArg[0], tupledArg[1]), pathsWithDependencies(destProjectDir, paths, sourceProjectDir)));
        const children_8 = [table_1(empty(), ofArray([(children_4 = [(children_2 = map(headCell, ofArray(["Sheet", "Information", "Decision", "Action"])), react.createElement("tr", {}, ...children_2))], react.createElement("thead", {}, ...children_4)), (children_6 = concat(content), react.createElement("tbody", {}, ...children_6))]))];
        return react.createElement("div", {}, ...children_8);
    };
    const buttonAction = (model$0027_1) => {
        const newSheetPaths = map((tupledArg_1) => {
            const sheetPath_2 = tupledArg_1[0];
            const decision = tupledArg_1[1];
            if (decision == null) {
                return [sheetPath_2, ""];
            }
            else if (decision.tag === 1) {
                return [sheetPath_2, pathJoin([destProjectDir, (baseNameWithoutExtension(sheetPath_2) + "_Copy") + ".dgm"])];
            }
            else {
                return [sheetPath_2, pathJoin([destProjectDir, baseName(sheetPath_2)])];
            }
        }, toList_2(getImportDecisions(model$0027_1.PopupDialogData)));
        iterate((oldSheetPath) => {
            const newSheetPath_1 = pathJoin([destProjectDir, baseName(oldSheetPath)]);
            copyFile(oldSheetPath, newSheetPath_1);
        }, filterSheets(false));
        iterate((tupledArg_2) => {
            const oldSheetPath_1 = tupledArg_2[0];
            const newSheetPath_2 = tupledArg_2[1];
            if (newSheetPath_2 === "") {
            }
            else {
                const path = newSheetPath_2;
                copyFile(oldSheetPath_1, path);
            }
        }, newSheetPaths);
        console.log(destProjectDir);
        if (dirName(destProjectDir) === "demos") {
            openDemoProjectFromPath(destProjectDir, model$0027_1, dispatch);
        }
        else {
            openProjectFromPath(destProjectDir, model$0027_1, dispatch);
        }
        dispatch(new Msg(41, []));
        dispatch(new Msg(83, []));
    };
    const isDisabled = (model$0027_2) => !allDecisionsMade(paths, model$0027_2);
    dialogPopup("Resolve import conflicts", popupBody, "OK", buttonAction, isDisabled, empty(), dispatch);
}

/**
 * Import sheet from directory, ask user to sort out dependency issues
 */
export function importSheet(model, dispatch) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const project = matchValue;
        const projectDir = project.ProjectPath;
        dispatch(new Msg(1, [new SheetT_Msg(29, [false])]));
        const matchValue_1 = askForExistingSheetPaths(model.UserData.LastUsedDirectory);
        if (matchValue_1 != null) {
            const paths = matchValue_1;
            const sourceProjectDir = dirName(item_1(0, paths));
            iterate((path) => {
                if (projectDir === sourceProjectDir) {
                    renameSheetBeforeImportPopup(path, model, dispatch);
                }
                else {
                    importSheetPopup(projectDir, paths, sourceProjectDir, dispatch);
                }
            }, paths);
        }
    }
    else {
        console.log("Current project must be open for sheet to be imported to it");
    }
}

//# sourceMappingURL=MiscMenuView.fs.js.map
