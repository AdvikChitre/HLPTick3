import { defaultArg, value as value_2, map as map_4 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { join, printf, toFail, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { fold as fold_2, cons, item as item_1, sortBy, mapIndexed, findIndex, toArray as toArray_2, filter, find, sort, length, sortByDescending, choose, concat, ofArray, unzip, head, tail, isEmpty, empty, singleton, collect, tryFind, append, map as map_5 } from "../fable_modules/fable-library.4.1.4/List.js";
import { parseDiagramSignature, compareCanvas } from "../Simulator/Extractor.fs.js";
import { safeHash, arrayHash, equalArrays, compare, numberHash, compareArrays, comparePrimitives, curry2, stringHash, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { Project, LoadedComponent, Port, PortType, Component, ComponentType, CustomComponentType, CustomComponentType_$reflection, SheetInfo } from "../Common/CommonTypes.fs.js";
import { saveAllProjectFilesFromLoadedComponentsToDisk, removeFileWithExtn, saveStateToFile } from "../Interface/FilesIO.fs.js";
import { List_except, List_groupBy, List_distinct } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { FSharpMap__get_Item, tryFind as tryFind_1, toArray, add, fold, iterate, ofList } from "../fable_modules/fable-library.4.1.4/Map.js";
import { Msg, Model } from "../Model/ModelType.fs.js";
import { Record, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { list_type, option_type, tuple_type, record_type, int32_type, string_type, union_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { contains, union, toArray as toArray_1, toList as toList_1, FSharpSet_op_Subtraction, intersect, ofSeq } from "../fable_modules/fable-library.4.1.4/Set.js";
import { fold as fold_1, append as append_1, collect as collect_1, map as map_6 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { toList, map as map_7 } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { mapOverProject } from "./ModelHelpers.fs.js";
import { uuid } from "../Interface/JSHelpers.fs.js";
import * as react from "react";
import { Option, h5 } from "../fable_modules/Fulma.2.16.0/Elements/Heading.fs.js";
import { TableOption, table as table_4 } from "../fable_modules/Fulma.2.16.0/Elements/Table.fs.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { openFileInProject$0027 } from "./MenuHelpers.fs.js";
import { choicePopupFunc } from "../DrawBlock/PopupHelpers.fs.js";

export function printSheetNames(model) {
    map_4((p) => {
        toConsole(`SHEETS:${map_5((ldc) => ldc.Name, p.LoadedComponents)}--->${p.OpenFileName}`);
    }, model.CurrentProj);
}

export function getCorrectFileName(project) {
    const matchValue = project.WorkingFileName;
    if (matchValue == null) {
        return project.OpenFileName;
    }
    else {
        const name = matchValue;
        return name;
    }
}

/**
 * Save any changed sheets to disk in the project directory
 */
export function syncLoadedComponentsToDisk(newProj, oldProj) {
    const needToSave = (ldc$0027, ldc) => {
        let tupledArg, tupledArg_1;
        if (!((tupledArg = ldc$0027.CanvasState, (tupledArg_1 = ldc.CanvasState, compareCanvas(10, tupledArg[0], tupledArg[1], tupledArg_1[0], tupledArg_1[1]))))) {
            return true;
        }
        else {
            return !equals(ldc$0027.WaveInfo, ldc.WaveInfo);
        }
    };
    const saveToDisk = (ldc_1) => {
        const state = ldc_1.CanvasState;
        const waveInfo = ldc_1.WaveInfo;
        const sheetInfo = new SheetInfo(ldc_1.Form, ldc_1.Description);
        saveStateToFile(newProj.ProjectPath, ldc_1.Name, state, waveInfo, sheetInfo);
    };
    const nameOf = (sheet, ldc_2) => (ldc_2.Name === sheet);
    const oldLDCs = oldProj.LoadedComponents;
    const newLDCs = newProj.LoadedComponents;
    const sheets = List_distinct(map_5((ldc_3) => ldc_3.Name, append(oldLDCs, newLDCs)), {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    });
    const sheetMap = ofList(map_5((sheet_1) => [sheet_1, [tryFind(curry2(nameOf)(sheet_1), newLDCs), tryFind(curry2(nameOf)(sheet_1), oldLDCs)]], sheets), {
        Compare: comparePrimitives,
    });
    iterate((name, tupledArg_2) => {
        let ldcOld, ldcNew;
        const optLdcNew = tupledArg_2[0];
        const optLdcOld = tupledArg_2[1];
        if (optLdcNew == null) {
            if (optLdcOld == null) {
                toFail(printf("What? Can\'t happen"));
            }
            else {
                const ldcOld_2 = optLdcOld;
                removeFileWithExtn(".dgm", oldProj.ProjectPath, ldcOld_2.Name);
            }
        }
        else if (optLdcOld == null) {
            const ldcNew_2 = optLdcNew;
            saveToDisk(ldcNew_2);
        }
        else if ((ldcOld = optLdcOld, (ldcNew = optLdcNew, needToSave(ldcNew, ldcOld)))) {
            const ldcNew_1 = optLdcNew;
            const ldcOld_1 = optLdcOld;
            saveToDisk(ldcOld_1);
        }
    }, sheetMap);
}

/**
 * Return new model with project updated as per update function.
 * If p.LoadedComponents data is changed, for each sheet that is different
 * the sheet will be saved to disk.
 * This function should be used consistently to keep disk and project data
 * correct.
 */
export function updateProjectFiles(saveToDisk, update, model) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const p = matchValue;
        const p$0027 = update(p);
        if (saveToDisk) {
            syncLoadedComponentsToDisk(p$0027, p);
        }
        return new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, p$0027, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
    }
    else {
        return model;
    }
}

export class IODirection extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["InputIO", "OutputIO"];
    }
}

export function IODirection_$reflection() {
    return union_type("CustomCompPorts.IODirection", [], IODirection, () => [[], []]);
}

export class Match extends Record {
    constructor(MLabel, MWidth, MDir) {
        super();
        this.MLabel = MLabel;
        this.MWidth = (MWidth | 0);
        this.MDir = MDir;
    }
}

export function Match_$reflection() {
    return record_type("CustomCompPorts.Match", [], Match, () => [["MLabel", string_type], ["MWidth", int32_type], ["MDir", IODirection_$reflection()]]);
}

export class PortChange extends Record {
    constructor(Direction, Old, New, Message) {
        super();
        this.Direction = Direction;
        this.Old = Old;
        this.New = New;
        this.Message = Message;
    }
}

export function PortChange_$reflection() {
    return record_type("CustomCompPorts.PortChange", [], PortChange, () => [["Direction", IODirection_$reflection()], ["Old", option_type(tuple_type(string_type, int32_type))], ["New", option_type(tuple_type(string_type, int32_type))], ["Message", string_type]]);
}

export function getIOMatchFromSig(inputs, outputs) {
    const makeSig = (dir, ios) => map_5((tupledArg) => {
        const name = tupledArg[0];
        const num = tupledArg[1] | 0;
        return new Match(name, num, dir);
    }, ios);
    return append(makeSig(new IODirection(0, []), inputs), makeSig(new IODirection(1, []), outputs));
}

/**
 * compare two I/O signature lists
 */
export function ioCompareSigs(sig1_, sig1__1, sig2_, sig2__1) {
    const sig1 = [sig1_, sig1__1];
    const sig2 = [sig2_, sig2__1];
    const map = (sg) => ofList(map_5((m) => [[m.MDir, m.MLabel], m], getIOMatchFromSig(sg[0], sg[1])), {
        Compare: compareArrays,
    });
    const ioMap1 = map(sig1);
    const ioMap2 = map(sig2);
    const ioMap = fold((m_1, key, value) => add(key, value, m_1), ioMap2, ioMap1);
    const matchValue = ofSeq(map_6((tuple) => tuple[0], toArray(ioMap1)), {
        Compare: compareArrays,
    });
    const set2 = ofSeq(map_6((tuple_1) => tuple_1[0], toArray(ioMap2)), {
        Compare: compareArrays,
    });
    const set1 = matchValue;
    const common = intersect(set1, set2);
    const diff1 = FSharpSet_op_Subtraction(set1, set2);
    const diff2 = FSharpSet_op_Subtraction(set2, set1);
    return map_7((m_2) => {
        let w2, w1, l2, l1, l1_2, l2_2, w1_1, w2_1, l2_1, l1_1, l1_3, l2_3;
        const getDetails = (m_3, ioMap_1) => {
            const ma = tryFind_1(m_3, ioMap_1);
            const labWidth = map_4((m_4) => [m_4.MLabel, m_4.MWidth], ma);
            return labWidth;
        };
        const newLW = getDetails(m_2, ioMap1);
        const oldLW = getDetails(m_2, ioMap2);
        const message = (newLW == null) ? ((oldLW != null) ? "Port and old connections deleted" : toFail(`What? never happens: ${newLW} ${oldLW}`)) : ((oldLW == null) ? "New Port will be added" : (((w2 = (oldLW[1] | 0), (w1 = (newLW[1] | 0), (l2 = oldLW[0], (l1 = newLW[0], (l1 === l2) && (w1 === w2)))))) ? ((l1_2 = newLW[0], (l2_2 = oldLW[0], (w1_1 = (newLW[1] | 0), (w2_1 = (oldLW[1] | 0), "No Change"))))) : (((l2_1 = oldLW[0], (l1_1 = newLW[0], l1_1 === l2_1))) ? ((l1_3 = newLW[0], (l2_3 = oldLW[0], "Port width changed"))) : toFail(`What? never happens: ${newLW} ${oldLW}`))));
        return new PortChange(m_2[0], oldLW, newLW, message);
    }, map_6((tuple_2) => tuple_2[0], toArray(ioMap)));
}

export function guessAtRenamedPorts(matches) {
    let set$_2;
    const matches_1 = toList(matches);
    const portsByWidthFiltered = (ports) => ofList(collect((_arg) => {
        let matchResult, item, width;
        if (!isEmpty(_arg[1])) {
            if (isEmpty(tail(_arg[1]))) {
                matchResult = 0;
                item = head(_arg[1]);
                width = _arg[0];
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
                return singleton([width, item]);
            default:
                return empty();
        }
    }, List_groupBy((arg) => arg[0][1], ports, {
        Equals: (x, y) => (x === y),
        GetHashCode: numberHash,
    })), {
        Compare: comparePrimitives,
    });
    const additions = portsByWidthFiltered(collect((_arg_1) => {
        let matchResult_1;
        if (_arg_1.Old == null) {
            if (_arg_1.New != null) {
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
                const width_1 = _arg_1.New[1] | 0;
                const name = _arg_1.New[0];
                const m = _arg_1;
                const dir = _arg_1.Direction;
                return singleton([[name, width_1], m]);
            }
            default:
                return empty();
        }
    }, matches_1));
    const deletions = portsByWidthFiltered(collect((_arg_2) => {
        let matchResult_2, dir_1, m_1, name_1, width_2;
        if (_arg_2.Old != null) {
            if (_arg_2.New == null) {
                matchResult_2 = 0;
                dir_1 = _arg_2.Direction;
                m_1 = _arg_2;
                name_1 = _arg_2.Old[0];
                width_2 = _arg_2.Old[1];
            }
            else {
                matchResult_2 = 1;
            }
        }
        else {
            matchResult_2 = 1;
        }
        switch (matchResult_2) {
            case 0:
                return singleton([[name_1, width_2], m_1]);
            default:
                return empty();
        }
    }, matches_1));
    const patternInput = unzip(map_5((n) => {
        let New, Old;
        return [(New = FSharpMap__get_Item(additions, n)[0], (Old = FSharpMap__get_Item(deletions, n)[0], new PortChange(FSharpMap__get_Item(additions, n)[1].Direction, Old, New, "This appears to be a renamed port, connections will be kept"))), ofArray([FSharpMap__get_Item(additions, n)[1], FSharpMap__get_Item(deletions, n)[1]])];
    }, toList_1(intersect(ofSeq(map_6((tuple_2) => tuple_2[0], toArray(additions), Int32Array), {
        Compare: comparePrimitives,
    }), ofSeq(map_6((tuple_3) => tuple_3[0], toArray(deletions), Int32Array), {
        Compare: comparePrimitives,
    })))));
    const guessedRenames = patternInput[0];
    const deletedMatches = patternInput[1];
    const deletedMatches_1 = concat(deletedMatches);
    return toArray_1((set$_2 = FSharpSet_op_Subtraction(ofSeq(matches_1, {
        Compare: compare,
    }), ofSeq(deletedMatches_1, {
        Compare: compare,
    })), union(ofSeq(guessedRenames, {
        Compare: compare,
    }), set$_2)));
}

export function findInstancesOfCurrentSheet(project) {
    const thisSheet = getCorrectFileName(project);
    const ldcs = project.LoadedComponents;
    const getInstance = (comp) => {
        const matchValue = comp.Type;
        if (matchValue.tag === 26) {
            const thisSheet_1 = matchValue.fields[0].Name;
            const cType = matchValue.fields[0];
            return [comp.Id, cType];
        }
        else {
            return void 0;
        }
    };
    const getSheetInstances = (ldc) => choose(getInstance, ldc.CanvasState[0]);
    return collect((ldc_1) => map_5((ins) => [ldc_1.Name, ins], getSheetInstances(ldc_1)), ldcs);
}

export class Deps extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NoDependents", "OneSig", "Mixed"];
    }
}

export function Deps_$reflection() {
    return union_type("CustomCompPorts.Deps", [], Deps, () => [[], [["Item1", tuple_type(list_type(tuple_type(string_type, int32_type)), list_type(tuple_type(string_type, int32_type)))], ["Item2", list_type(tuple_type(string_type, tuple_type(string_type, CustomComponentType_$reflection())))]], [["Item", list_type(tuple_type(string_type, int32_type))]]]);
}

export function getDependentsInfo(p) {
    const instances = findInstancesOfCurrentSheet(p);
    const gps = sortByDescending((tupledArg_1) => {
        const tag = tupledArg_1[0];
        const items = tupledArg_1[1];
        return length(items) | 0;
    }, List_groupBy((tupledArg) => {
        const _arg_1 = tupledArg[1];
        const ops = _arg_1[1].OutputLabels;
        const ips = _arg_1[1].InputLabels;
        return [sort(ips, {
            Compare: compareArrays,
        }), sort(ops, {
            Compare: compareArrays,
        })];
    }, instances, {
        Equals: equalArrays,
        GetHashCode: arrayHash,
    }), {
        Compare: comparePrimitives,
    });
    if (!isEmpty(gps)) {
        if (isEmpty(tail(gps))) {
            const items_1 = head(gps)[1];
            const sg = head(gps)[0];
            return new Deps(1, [sg, items_1]);
        }
        else {
            return new Deps(2, [map_5((tupledArg_2) => {
                const tag_1 = tupledArg_2[0];
                const lst = tupledArg_2[1];
                return [tag_1, length(lst)];
            }, List_groupBy((tuple) => tuple[0], instances, {
                Equals: (x_4, y_4) => (x_4 === y_4),
                GetHashCode: stringHash,
            }))]);
        }
    }
    else {
        return new Deps(0, []);
    }
}

export function makePortName(nameWidth) {
    let w, name;
    return (nameWidth != null) ? ((w = (nameWidth[1] | 0), (name = nameWidth[0], `${name}(${w - 1}:${0})`))) : "";
}

/**
 * returns IO signature of current sheet, and all its instances in other sheets
 */
export function getDependents(model) {
    return mapOverProject(void 0, model, (p) => {
        const sheetName = getCorrectFileName(p);
        let newSig;
        const tupledArg = find((ldc) => (ldc.Name === sheetName), p.LoadedComponents).CanvasState;
        newSig = parseDiagramSignature(tupledArg[0], tupledArg[1]);
        const instances = collect((ldc_3) => collect((_arg) => {
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
                    return singleton([ldc_3.Name, cid_1, [ins_1, outs_1]]);
                default:
                    return empty();
            }
        }, ldc_3.CanvasState[0]), filter((ldc_2) => (ldc_2.Name !== sheetName), p.LoadedComponents));
        return [newSig, instances];
    });
}

export function dependencyDoesNotMatchSignature(newSig_, newSig__1, oldSig_, oldSig__1) {
    const newSig = [newSig_, newSig__1];
    const oldSig = [oldSig_, oldSig__1];
    const sortLists = (tupledArg) => {
        const a = tupledArg[0];
        const b = tupledArg[1];
        return [a, b];
    };
    return !equalArrays(sortLists(newSig), sortLists(oldSig));
}

/**
 * check whether any instance dependent on current sheet has different signature from current
 */
export function getOutOfDateDependents(model) {
    let sg, newSig, deps, _otherInstances;
    const matchValue = getDependents(model);
    let matchResult, _otherInstances_1, deps_1, newSig_1, sg_1;
    if (matchValue != null) {
        if (!isEmpty(matchValue[1])) {
            if ((sg = head(matchValue[1])[2], (newSig = matchValue[0], (deps = matchValue, (_otherInstances = tail(matchValue[1]), dependencyDoesNotMatchSignature(newSig[0], newSig[1], sg[0], sg[1])))))) {
                matchResult = 1;
                _otherInstances_1 = tail(matchValue[1]);
                deps_1 = matchValue;
                newSig_1 = matchValue[0];
                sg_1 = head(matchValue[1])[2];
            }
            else {
                matchResult = 2;
            }
        }
        else {
            matchResult = 0;
        }
    }
    else {
        matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return void 0;
        case 1:
            return deps_1;
        default:
            return void 0;
    }
}

/**
 * Return canvasState updated with bad connections that have lost either of their connecting components deleted
 */
export function deleteIncompleteConnections(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const conns = _arg[1];
    const comps = _arg[0];
    const arrayOfIds = (pL) => map_6((p) => p.Id, toArray_2(pL));
    const okPorts = ofSeq(collect_1((comp) => append_1(arrayOfIds(comp.InputPorts), arrayOfIds(comp.OutputPorts)), toArray_2(comps)), {
        Compare: comparePrimitives,
    });
    const conns$0027 = filter((conn) => (contains(conn.Source.Id, okPorts) && contains(conn.Target.Id, okPorts)), conns);
    if (!equals(conns, conns$0027)) {
        const arg_1 = (length(conns) - length(conns$0027)) | 0;
        toConsole(printf("%d Connections deleted"))(arg_1);
    }
    return [comps, conns$0027];
}

/**
 * Change the items x in lst where uPred x with x -> uFunc x.
 * Useful to replace one item of a list
 */
export function listUpdate(uPred, uFunc, lst) {
    return map_5((item) => {
        if (uPred(item)) {
            return uFunc(item);
        }
        else {
            return item;
        }
    }, lst);
}

/**
 * Return updated custom component with ports changed as per change
 * If a port is deleted any corresponding connections must be deleted
 * to keep the CanvasState consistent. That is done elsewhere, since
 * deleting not fully connected connections is a straightforward operation
 * on CanvasState, as done by deleteIncompleteConnections
 */
export function changeInstance(comp, change) {
    let y_1, x_1, width$0027, width_1, oldName_1, newName_1, oldWidth, newWidth_1, name$0027, name_3;
    const updateInfo = (dir, f, comp_1) => {
        if (dir.tag === 1) {
            let patternInput_2;
            const matchValue_1 = comp_1.Type;
            if (matchValue_1.tag === 26) {
                const ct_2 = matchValue_1.fields[0];
                patternInput_2 = [ct_2.OutputLabels, ct_2];
            }
            else {
                const cType_1 = matchValue_1;
                patternInput_2 = toFail(`What? '${cType_1}' not allowed`);
            }
            const labels_2 = patternInput_2[0];
            const ct_3 = patternInput_2[1];
            const ports_2 = comp_1.OutputPorts;
            const patternInput_3 = f([labels_2, ports_2]);
            const ports_3 = patternInput_3[1];
            const labels_3 = patternInput_3[0];
            return new Component(comp_1.Id, new ComponentType(26, [new CustomComponentType(ct_3.Name, ct_3.InputLabels, labels_3, ct_3.Form, ct_3.Description)]), comp_1.Label, comp_1.InputPorts, ports_3, comp_1.X, comp_1.Y, comp_1.H, comp_1.W, comp_1.SymbolInfo);
        }
        else {
            let patternInput;
            const matchValue = comp_1.Type;
            if (matchValue.tag === 26) {
                const ct = matchValue.fields[0];
                patternInput = [ct.InputLabels, ct];
            }
            else {
                const cType = matchValue;
                patternInput = toFail(`What? '${cType}' not allowed`);
            }
            const labels = patternInput[0];
            const ct_1 = patternInput[1];
            const ports = comp_1.InputPorts;
            const patternInput_1 = f([labels, ports]);
            const ports_1 = patternInput_1[1];
            const labels_1 = patternInput_1[0];
            return new Component(comp_1.Id, new ComponentType(26, [new CustomComponentType(ct_1.Name, labels_1, ct_1.OutputLabels, ct_1.Form, ct_1.Description)]), comp_1.Label, ports_1, comp_1.OutputPorts, comp_1.X, comp_1.Y, comp_1.H, comp_1.W, comp_1.SymbolInfo);
        }
    };
    const changePortWidth = (dir_1, name, newWidth, comp_2) => {
        const upf = (tupledArg) => {
            const labels_4 = tupledArg[0];
            const ports_4 = tupledArg[1];
            return [listUpdate((tupledArg_1) => {
                const s = tupledArg_1[0];
                return s === name;
            }, (tupledArg_2) => {
                const s_1 = tupledArg_2[0];
                return [s_1, newWidth];
            }, labels_4), ports_4];
        };
        return updateInfo(dir_1, upf, comp_2);
    };
    const changePortName = (dir_2, newName, oldName, comp_3) => {
        const upf_1 = (tupledArg_3) => {
            const labels_5 = tupledArg_3[0];
            const ports_5 = tupledArg_3[1];
            return [listUpdate((tupledArg_4) => {
                const s_2 = tupledArg_4[0];
                return s_2 === oldName;
            }, (tupledArg_5) => {
                const w = tupledArg_5[1];
                return [newName, w];
            }, labels_5), ports_5];
        };
        return updateInfo(dir_2, upf_1, comp_3);
    };
    const addPort = (dir_3, name_1, width, comp_4) => {
        const upf_2 = (_arg_4) => {
            const ports_6 = _arg_4[1];
            const labels_6 = _arg_4[0];
            const labels_7 = append(labels_6, singleton([name_1, width]));
            const newPort = new Port(uuid(), length(ports_6), (dir_3.tag === 1) ? (new PortType(1, [])) : (new PortType(0, [])), comp_4.Id);
            const ports_7 = append(ports_6, singleton(newPort));
            return [labels_7, ports_7];
        };
        return updateInfo(dir_3, upf_2, comp_4);
    };
    const deletePort = (dir_4, name_2, comp_5) => {
        const upf_3 = (_arg_5) => {
            const ports_8 = _arg_5[1];
            const labels_8 = _arg_5[0];
            const portNum = findIndex((tupledArg_6) => {
                const s_3 = tupledArg_6[0];
                return s_3 === name_2;
            }, labels_8) | 0;
            const labels_9 = filter((tupledArg_7) => {
                const s_4 = tupledArg_7[0];
                return s_4 !== name_2;
            }, labels_8);
            const ports_9 = mapIndexed((i, port_2) => (new Port(port_2.Id, i, port_2.PortType, port_2.HostId)), sortBy((port_1) => port_1.PortNumber, filter((port) => !equals(port.PortNumber, portNum), ports_8), {
                Compare: compare,
            }));
            toConsole(`deleteport:${length(labels_9)},${length(ports_9)}`);
            return [labels_9, ports_9];
        };
        return updateInfo(dir_4, upf_3, comp_5);
    };
    const dir_5 = change.Direction;
    const matchValue_2 = change.New;
    const matchValue_3 = change.Old;
    if ((y_1 = matchValue_3, (x_1 = matchValue_2, equals(x_1, y_1)))) {
        const x_2 = matchValue_2;
        const y_2 = matchValue_3;
        return comp;
    }
    else if (matchValue_2 == null) {
        if (matchValue_3 != null) {
            const name_6 = matchValue_3[0];
            const width_4 = matchValue_3[1] | 0;
            return deletePort(dir_5, name_6, comp);
        }
        else {
            const newC_1 = matchValue_2;
            const oldC_1 = matchValue_3;
            return toFail(`What? Change with new=${newC_1} and old = ${oldC_1} should not be possible`);
        }
    }
    else if (matchValue_3 == null) {
        const name_5 = matchValue_2[0];
        const width_3 = matchValue_2[1] | 0;
        return addPort(dir_5, name_5, width_3, comp);
    }
    else if ((width$0027 = (matchValue_2[1] | 0), (width_1 = (matchValue_3[1] | 0), (oldName_1 = matchValue_3[0], (newName_1 = matchValue_2[0], width$0027 === width_1))))) {
        const newName_2 = matchValue_2[0];
        const oldName_2 = matchValue_3[0];
        const width_2 = matchValue_3[1] | 0;
        const width$0027_1 = matchValue_2[1] | 0;
        return changePortName(dir_5, newName_2, oldName_2, comp);
    }
    else if ((oldWidth = (matchValue_3[1] | 0), (newWidth_1 = (matchValue_2[1] | 0), (name$0027 = matchValue_2[0], (name_3 = matchValue_3[0], name_3 === name$0027))))) {
        const name_4 = matchValue_3[0];
        const name$0027_1 = matchValue_2[0];
        const newWidth_2 = matchValue_2[1] | 0;
        const oldWidth_1 = matchValue_3[1] | 0;
        return changePortWidth(dir_5, name_4, newWidth_2, comp);
    }
    else {
        const newC = matchValue_2;
        const oldC = matchValue_3;
        return toFail(`What? Change with new=${newC} and old = ${oldC} should not be possible`);
    }
}

/**
 * Make changes to ccomponent cid on sheet converting old ports oldSig to new ports newSig
 */
export function updateInstance(newSig_, newSig__1, sheet, cid, oldSig, p) {
    const newSig = [newSig_, newSig__1];
    const reorderInstancePorts = (newSig_1, comp) => {
        let f_1, _arg_2, p2, p1, f_3, _arg_3, p2_1, p1_1;
        const reorderPorts = (newNames, oldNames, oldPorts) => mapIndexed((i, p_1) => (new Port(p_1.Id, i, p_1.PortType, p_1.HostId)), map_5((n) => item_1(n, oldPorts), map_5((tupledArg) => {
            const name = tupledArg[0];
            return findIndex((tupledArg_1) => {
                const name$0027 = tupledArg_1[0];
                return equals(name$0027, name);
            }, oldNames) | 0;
        }, newNames)));
        const matchValue = comp.Type;
        if (matchValue.tag === 26) {
            const ct = matchValue.fields[0];
            if (equalArrays(oldSig, newSig_1)) {
                toConsole(printf("Order matches!"));
                return comp;
            }
            else if (equalArrays((f_1 = ((list_3) => sort(list_3, {
                Compare: compareArrays,
            })), (_arg_2 = [newSig_1[0], newSig_1[1]], (p2 = _arg_2[1], (p1 = _arg_2[0], [f_1(p1), f_1(p2)])))), (f_3 = ((list_4) => sort(list_4, {
                Compare: compareArrays,
            })), (_arg_3 = [oldSig[0], oldSig[1]], (p2_1 = _arg_3[1], (p1_1 = _arg_3[0], [f_3(p1_1), f_3(p2_1)])))))) {
                toConsole(`Reordering ${comp.Label}`);
                const oldSig_1 = [ct.InputLabels, ct.OutputLabels];
                const newOut = newSig_1[1];
                const newIn = newSig_1[0];
                const oldOut = oldSig_1[1];
                const oldIn = oldSig_1[0];
                const newInPorts = reorderPorts(newIn, oldIn, comp.InputPorts);
                const newOutPorts = reorderPorts(newOut, oldOut, comp.OutputPorts);
                const ct$0027 = new CustomComponentType(ct.Name, newSig_1[0], newSig_1[1], ct.Form, ct.Description);
                return new Component(comp.Id, new ComponentType(26, [ct$0027]), comp.Label, newInPorts, newOutPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo);
            }
            else {
                toConsole(printf("What? Signatures do not match after changes are made"));
                return comp;
            }
        }
        else {
            return comp;
        }
    };
    const ldc_1 = find((ldc) => (ldc.Name === sheet), p.LoadedComponents);
    const patternInput = ldc_1.CanvasState;
    const conns = patternInput[1];
    const comps = patternInput[0];
    const comp_2 = find((comp_1) => (comp_1.Id === cid), comps);
    const changes = guessAtRenamedPorts(ioCompareSigs(newSig[0], newSig[1], oldSig[0], oldSig[1]));
    const comp$0027 = reorderInstancePorts(newSig, fold_1((comp_3, change) => {
        const comp$0027$0027 = changeInstance(comp_3, change);
        return comp$0027$0027;
    }, comp_2, changes));
    const comps$0027 = map_5((comp_4) => {
        if (comp_4.Id === cid) {
            return comp$0027;
        }
        else {
            return comp_4;
        }
    }, comps);
    const ldc$0027 = new LoadedComponent(ldc_1.Name, ldc_1.TimeStamp, ldc_1.FilePath, ldc_1.WaveInfo, deleteIncompleteConnections(comps$0027, conns), ldc_1.InputLabels, ldc_1.OutputLabels, ldc_1.Form, ldc_1.Description);
    const ldcLst = cons(ldc$0027, List_except([ldc_1], p.LoadedComponents, {
        Equals: equals,
        GetHashCode: safeHash,
    }));
    return new Project(p.ProjectPath, p.OpenFileName, p.WorkingFileName, ldcLst);
}

/**
 * dispatch message to change project in model, returning project
 */
export function updateDependents(newSig_, newSig__1, instances, model, dispatch) {
    const newSig = [newSig_, newSig__1];
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const p = matchValue;
        const p_2 = fold_2((p_1, instance) => updateInstance(newSig[0], newSig[1], instance[0], instance[1], instance[2], p_1), p, instances);
        dispatch(new Msg(34, [p_2]));
        return p_2;
    }
    else {
        return void 0;
    }
}

export function checkCanvasStateIsOk(model) {
    return mapOverProject(false, model, (p) => {
        const ldc_1 = find((ldc) => (ldc.Name === getCorrectFileName(p)), p.LoadedComponents);
        const patternInput = ldc_1.CanvasState;
        const conns = patternInput[1];
        const comps = patternInput[0];
        const ioNames = map_5((comp_1) => comp_1.Label, filter((comp) => {
            const matchValue = comp.Type;
            switch (matchValue.tag) {
                case 0:
                case 1:
                    return true;
                default:
                    return false;
            }
        }, comps));
        return length(ioNames) === length(List_distinct(ioNames, {
            Equals: (x, y) => (x === y),
            GetHashCode: stringHash,
        }));
    });
}

/**
 * returns a popup function to show the dependents update dialog if this is needed
 * this dialog drives all subsequent work changing custom component instances
 */
export function optCurrentSheetDependentsPopup(model) {
    let s_8, children_14, children_12, children_16;
    const sheet = map_4((p) => {
        const matchValue = p.WorkingFileName;
        if (matchValue == null) {
            return p.OpenFileName;
        }
        else {
            const z = matchValue;
            return value_2(p.WorkingFileName);
        }
    }, model.CurrentProj);
    if (!checkCanvasStateIsOk(model)) {
        return void 0;
    }
    else {
        const matchValue_1 = getOutOfDateDependents(model);
        if (matchValue_1 != null) {
            if (!isEmpty(matchValue_1[1])) {
                const firstCid = head(matchValue_1[1])[1];
                const firstSheet = head(matchValue_1[1])[0];
                const firstSig = head(matchValue_1[1])[2];
                const instances = matchValue_1[1];
                const newSig = matchValue_1[0];
                const rest = tail(matchValue_1[1]);
                const depSheets = join(",", List_distinct(map_5((tupledArg) => {
                    const sheet_1 = tupledArg[0];
                    return sheet_1;
                }, instances), {
                    Equals: (x, y) => (x === y),
                    GetHashCode: stringHash,
                }));
                const changes = guessAtRenamedPorts(ioCompareSigs(newSig[0], newSig[1], firstSig[0], firstSig[1]));
                const matchValue_2 = changes.some((ch) => !equals(ch.Old, ch.New));
                if (matchValue_2) {
                    const whatChanged = "the inputs or outputs";
                    const headCell = (heading) => react.createElement("th", {}, heading);
                    const makeRow = (change) => {
                        let children_2, children_4, children_6;
                        const children_10 = [(children_2 = [equals(change.Direction, new IODirection(0, [])) ? "Input" : "Output"], react.createElement("td", {}, ...children_2)), (children_4 = [makePortName(change.New)], react.createElement("td", {}, ...children_4)), (children_6 = [makePortName(change.Old)], react.createElement("td", {}, ...children_6)), react.createElement("td", {}, change.Message)];
                        return react.createElement("tr", {}, ...children_10);
                    };
                    let body;
                    const props_26 = [["style", {
                        marginTop: "15px",
                    }]];
                    const children_18 = [h5(singleton(new Option(9, [singleton(["style", {
                        marginTop: "15px",
                    }])])))(singleton(`${sheet}`)), `You have changed the ${whatChanged} of the current '${sheet}' sheet. `, react.createElement("br", {}), "This dialog will automatically update all dependent sheets to match this. ", react.createElement("br", {}), `The '${sheet}' sheet is instantiated as a symbol ${length(instances)} times in dependent sheets: '${depSheets}'. `, "If you do not automatically update the symbols you will need to delete and recreate each one.", react.createElement("br", {}), (s_8 = "If you automatically update symbols wires that no longer match will be autorouted correctly when you next load each sheet", s_8), react.createElement("br", {}), table_4(ofArray([new TableOption(4, []), new TableOption(0, []), new TableOption(3, []), new TableOption(6, [singleton(["style", {
                        marginTop: "15px",
                    }])])]), ofArray([(children_14 = [(children_12 = map_5(headCell, ofArray(["Type", "New port", "Old port", "Change"])), react.createElement("tr", {}, ...children_12))], react.createElement("thead", {}, ...children_14)), (children_16 = map_6(makeRow, changes), react.createElement("tbody", {}, ...children_16))]))];
                    body = react.createElement("div", keyValueList(props_26, 1), ...children_18);
                    const buttonAction = (isUpdate, dispatch, _arg_2) => {
                        if (isUpdate) {
                            const newp = updateDependents(newSig[0], newSig[1], instances, model, dispatch);
                            map_4((proj) => {
                                saveAllProjectFilesFromLoadedComponentsToDisk(proj);
                            }, newp);
                            const proj_1 = value_2(newp);
                            if (proj_1.OpenFileName !== defaultArg(proj_1.WorkingFileName, proj_1.OpenFileName)) {
                                const model$0027 = new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, model.CurrentTruthTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, proj_1, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState);
                                openFileInProject$0027(false, proj_1.OpenFileName, proj_1, model$0027, dispatch);
                            }
                        }
                        dispatch(new Msg(41, []));
                    };
                    return choicePopupFunc("Update All Sheet Instances", (_arg_3) => body, "Update all instances", "Save the sheet without updating instances", buttonAction);
                }
                else {
                    return void 0;
                }
            }
            else {
                return toFail(printf("What? Impossible"));
            }
        }
        else {
            return void 0;
        }
    }
}

//# sourceMappingURL=CustomCompPorts.fs.js.map
