import { equalities_, inequalities_, TruthTable, Constraint, CellIO__get_getLabel, emptyConstraintSet } from "../../Simulator/TruthTableTypes.fs.js";
import { toArray, mapIndexed as mapIndexed_1, ofArray, cons, contains, tail, reverse, isEmpty, fold, append as append_1, map, item, sortWith, head, tryFindIndex, exists, empty } from "../../fable_modules/fable-library.4.1.4/List.js";
import { ofArray as ofArray_1, ofList, filter, FSharpMap__get_Count, empty as empty_1 } from "../../fable_modules/fable-library.4.1.4/Map.js";
import { arrayHash, equalArrays, safeHash, comparePrimitives, equals, compare } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { currentTruthTable_, newConstraint_, constraintErrorMsg_, constraintIOSel_, constraintTypeSel_, popupDialogData_, algebraError_, algebraInputs_, gridCache_, algebraIns_, ioOrder_, sortType_, hiddenColumns_, outputConstraints_, inputConstraints_, PopupDialogData, tTType_, gridStyles_, Model, TTMsg, Msg, TTType } from "../../Model/ModelType.fs.js";
import { printf, toFail } from "../../fable_modules/fable-library.4.1.4/String.js";
import { convertIntToFastData, convertWireDataToInt } from "../../Simulator/NumberHelpers.fs.js";
import { equals as equals_1, fromInt32, toInt64, compare as compare_1, toInt32 } from "../../fable_modules/fable-library.4.1.4/BigInt.js";
import { Cmd_OfFunc_result } from "../../fable_modules/Fable.Elmish.3.1.0/./cmd.fs.js";
import { Cmd_batch, Cmd_none } from "../../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { FastAlgExp, FSInterface, SimulationData, AlgebraNotImplemented } from "../../Simulator/SimulatorTypes.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.4.1.4/Choice.js";
import { tableAsList, truthTable } from "./TruthTableCreate.fs.js";
import { empty as empty_2, singleton, append, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { warningPropsNotification } from "../Notifications.fs.js";
import { instrumentInterval, getTimeMs } from "../../Common/TimeHelpers.fs.js";
import { reduceTruthTable } from "./TruthTableReduce.fs.js";
import { ttGridColumnProps, ttGridHiddenColumnProps } from "../Style.fs.js";
import { Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../../Common/Optics.fs.js";
import { List_except } from "../../fable_modules/fable-library.4.1.4/Seq2.js";
import { mapIndexed, tryFindIndex as tryFindIndex_1 } from "../../fable_modules/fable-library.4.1.4/Array.js";
import { swapArrayEls } from "../../Common/Helpers.fs.js";
import { validateAlgebraInput } from "./ConstraintReduceView.fs.js";
import { removeAllSimulationsFromModel } from "../ModelHelpers.fs.js";

export const tTTypeInit = new TTType(10, emptyConstraintSet, emptyConstraintSet, empty(), void 0, [], empty_1({
    Compare: compare,
}), void 0, empty());

export function getTruthTableOrFail(model, msg) {
    const matchValue = model.CurrentTruthTable;
    if (matchValue != null) {
        const res = matchValue;
        if (res.tag === 0) {
            const tt = res.fields[0];
            return tt;
        }
        else {
            return toFail(printf("what? Getting truth table when there is error in generation: %s"))(msg);
        }
    }
    else {
        return toFail(printf("what? Getting truth table when no table has been generated: %s"))(msg);
    }
}

export function truncationWarning(table) {
    return `The Truth Table has been truncated to ${FSharpMap__get_Count(table.TableMap)} input combinations.
    Not all rows may be shown.`;
}

/**
 * Apply a single numerical output constraint to a Truth Table Map
 */
export function applyNumericalOutputConstraint(table, con) {
    return filter((_arg, right) => exists((cell) => {
        if (con.tag === 1) {
            const i = con.fields[0];
            if (!equals(i.IO, cell.IO)) {
                return false;
            }
            else {
                const matchValue_1 = cell.Data;
                switch (matchValue_1.tag) {
                    case 2:
                        return true;
                    case 0: {
                        const wd_1 = matchValue_1.fields[0];
                        const cellVal_1 = convertWireDataToInt(wd_1);
                        if (i.LowerBound <= ~~toInt32(cellVal_1)) {
                            return compare_1(cellVal_1, toInt64(fromInt32(i.UpperBound))) <= 0;
                        }
                        else {
                            return false;
                        }
                    }
                    default:
                        return false;
                }
            }
        }
        else {
            const e = con.fields[0];
            if (!equals(e.IO, cell.IO)) {
                return false;
            }
            else {
                const matchValue = cell.Data;
                switch (matchValue.tag) {
                    case 2:
                        return true;
                    case 0: {
                        const wd = matchValue.fields[0];
                        const cellVal = convertWireDataToInt(wd);
                        return equals_1(cellVal, toInt64(fromInt32(e.Value)));
                    }
                    default:
                        return false;
                }
            }
        }
    }, right), table);
}

/**
 * Comparison function for CellData values
 */
export function compareCellData(cd1, cd2) {
    let matchResult, a1, a2, wd1, wd2;
    switch (cd1.tag) {
        case 1: {
            switch (cd2.tag) {
                case 0: {
                    matchResult = 3;
                    break;
                }
                case 1: {
                    matchResult = 5;
                    a1 = cd1.fields[0];
                    a2 = cd2.fields[0];
                    break;
                }
                default:
                    matchResult = 2;
            }
            break;
        }
        case 0: {
            switch (cd2.tag) {
                case 1: {
                    matchResult = 4;
                    break;
                }
                case 0: {
                    matchResult = 6;
                    wd1 = cd1.fields[0];
                    wd2 = cd2.fields[0];
                    break;
                }
                default:
                    matchResult = 2;
            }
            break;
        }
        default:
            if (cd2.tag === 2) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
    }
    switch (matchResult) {
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return -1;
        case 3:
            return 1;
        case 4:
            return -1;
        case 5:
            return comparePrimitives(a1, a2) | 0;
        default:
            return compare_1(convertWireDataToInt(wd1), convertWireDataToInt(wd2)) | 0;
    }
}

export function sortByIO(io, lst) {
    let idx;
    const _arg = tryFindIndex((c) => equals(c.IO, io), head(lst));
    if (_arg == null) {
        const arg = CellIO__get_getLabel(io);
        idx = toFail(printf("what? Failed to find IO: %s while sorting TT"))(arg);
    }
    else {
        const i = _arg | 0;
        idx = i;
    }
    return sortWith((r1, r2) => {
        const cd1 = item(idx, r1).Data;
        const cd2 = item(idx, r2).Data;
        return compareCellData(cd1, cd2) | 0;
    }, lst);
}

/**
 * Elmish Update function for Truth Table messages (TTMsg)
 */
export function truthTableUpdate(model, msg) {
    let matchValue_2, matchValue_3, io_2, lst_2, sortedLst_1, io_1, lst_1, sortedLst, lst, l_16, l_12, l_24, l_20, i_3, l_32, e_3, l_28, i_4, l_40, e_4, l_36, newSort, matchValue_5, st, cIO, inputRecord_1, f_11, f1_1, f2_1, f_10, f1, f2, f_13, f1_3, f2_3, f_12, f1_2, f2_2, optic_3, value_3;
    const withMsg = (m, model_1) => [model_1, Cmd_OfFunc_result(m)];
    const withTTMsg = (m_1, model_2) => [model_2, Cmd_OfFunc_result(new Msg(27, [m_1]))];
    const withCmdNone = (model_3) => [model_3, Cmd_none()];
    const withCommands = (commands, model_4) => [model_4, Cmd_batch(commands)];
    switch (msg.tag) {
        case 1: {
            const table = getTruthTableOrFail(model, "Regeneration");
            let patternInput;
            try {
                const tt_1 = truthTable(table.TableSimData, model.TTConfig, true);
                const comms = map(Cmd_OfFunc_result, toList(delay(() => append(tt_1.IsTruncated ? singleton(new Msg(66, [warningPropsNotification(truncationWarning(tt_1))])) : singleton(new Msg(67, [])), delay(() => singleton(new Msg(27, [new TTMsg(2, [])])))))));
                patternInput = [new FSharpResult$2(0, [tt_1]), comms];
            }
            catch (matchValue) {
                if (matchValue instanceof AlgebraNotImplemented) {
                    const err = matchValue.Data0;
                    patternInput = [new FSharpResult$2(1, [err]), empty()];
                }
                else {
                    throw matchValue;
                }
            }
            const ttRes = patternInput[0];
            const commands_2 = patternInput[1];
            return withCommands(commands_2, new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, ttRes, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState));
        }
        case 2: {
            const table_1 = getTruthTableOrFail(model, "Refilter");
            let tMap;
            const matchValue_1 = table_1.DCMap;
            if (matchValue_1 == null) {
                tMap = table_1.TableMap;
            }
            else {
                const m_2 = matchValue_1;
                tMap = m_2;
            }
            const allOutputConstraints = append_1(map((arg_12) => (new Constraint(0, [arg_12])), model.TTConfig.OutputConstraints.Equalities), map((arg_13) => (new Constraint(1, [arg_13])), model.TTConfig.OutputConstraints.Inequalities));
            const filteredMap = fold(applyNumericalOutputConstraint, tMap, allOutputConstraints);
            const newTable = new FSharpResult$2(0, [new TruthTable(table_1.TableMap, filteredMap, table_1.DCMap, table_1.SortedListRep, table_1.IsTruncated, table_1.MaxRowsWithConstraints, table_1.HasRedundancies, table_1.TableSimData, table_1.IOOrder)]);
            return withTTMsg(new TTMsg(3, []), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, newTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState));
        }
        case 3: {
            const start = getTimeMs();
            const table_3 = getTruthTableOrFail(model, "Sorting");
            const sortedTable = new FSharpResult$2(0, [instrumentInterval("Sorting Truth Table", start, (matchValue_2 = model.TTConfig.SortType, (matchValue_3 = tableAsList(table_3.FilteredMap), isEmpty(matchValue_3) ? (new TruthTable(table_3.TableMap, table_3.FilteredMap, table_3.DCMap, empty(), table_3.IsTruncated, table_3.MaxRowsWithConstraints, table_3.HasRedundancies, table_3.TableSimData, table_3.IOOrder)) : ((matchValue_2 != null) ? ((matchValue_2[1].tag === 1) ? ((io_2 = matchValue_2[0], (lst_2 = matchValue_3, (sortedLst_1 = reverse(sortByIO(io_2, lst_2)), new TruthTable(table_3.TableMap, table_3.FilteredMap, table_3.DCMap, sortedLst_1, table_3.IsTruncated, table_3.MaxRowsWithConstraints, table_3.HasRedundancies, table_3.TableSimData, table_3.IOOrder))))) : ((io_1 = matchValue_2[0], (lst_1 = matchValue_3, (sortedLst = sortByIO(io_1, lst_1), new TruthTable(table_3.TableMap, table_3.FilteredMap, table_3.DCMap, sortedLst, table_3.IsTruncated, table_3.MaxRowsWithConstraints, table_3.HasRedundancies, table_3.TableSimData, table_3.IOOrder)))))) : ((lst = matchValue_3, new TruthTable(table_3.TableMap, table_3.FilteredMap, table_3.DCMap, lst, table_3.IsTruncated, table_3.MaxRowsWithConstraints, table_3.HasRedundancies, table_3.TableSimData, table_3.IOOrder)))))))]);
            return withTTMsg(new TTMsg(5, []), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, sortedTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState));
        }
        case 4: {
            const table_4 = getTruthTableOrFail(model, "DC Reduction");
            const start_1 = getTimeMs();
            const reducedTable = new FSharpResult$2(0, [instrumentInterval("DC Reduction", start_1, reduceTruthTable(table_4, void 0))]);
            return withTTMsg(new TTMsg(2, []), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, reducedTable, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState));
        }
        case 5: {
            const start_2 = getTimeMs();
            const correctProps = (index_mut, acc_mut, lst_3_mut) => {
                correctProps:
                while (true) {
                    const index = index_mut, acc = acc_mut, lst_3 = lst_3_mut;
                    const hiddenProps = ttGridHiddenColumnProps(model.TTConfig.IOOrder.length);
                    if (!isEmpty(lst_3)) {
                        const tl = tail(lst_3);
                        const io_3 = head(lst_3);
                        if (contains(io_3, model.TTConfig.HiddenColumns, {
                            Equals: equals,
                            GetHashCode: safeHash,
                        })) {
                            index_mut = index;
                            acc_mut = cons([io_3, hiddenProps], acc);
                            lst_3_mut = tl;
                            continue correctProps;
                        }
                        else {
                            index_mut = (index + 1);
                            acc_mut = cons([io_3, ttGridColumnProps(index)], acc);
                            lst_3_mut = tl;
                            continue correctProps;
                        }
                    }
                    else {
                        return acc;
                    }
                    break;
                }
            };
            const newStyles = instrumentInterval("Hiding Columns", start_2, ofList(correctProps(0, empty(), ofArray(model.TTConfig.IOOrder)), {
                Compare: compare,
            }));
            return withTTMsg(new TTMsg(21, [void 0]), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), gridStyles_)(tTType_))(newStyles)(model));
        }
        case 6: {
            let newPopupData;
            const inputRecord = model.PopupDialogData;
            newPopupData = (new PopupDialogData(inputRecord.Text, inputRecord.Int, inputRecord.ImportDecisions, inputRecord.Int2, inputRecord.ProjectPath, inputRecord.MemorySetup, inputRecord.MemoryEditorData, inputRecord.Progress, inputRecord.ConstraintTypeSel, inputRecord.ConstraintIOSel, void 0, inputRecord.NewConstraint, void 0, void 0, inputRecord.VerilogCode, inputRecord.VerilogErrors, inputRecord.BadLabel, inputRecord.IntList, inputRecord.IntList2));
            return withCmdNone(new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, void 0, tTTypeInit, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, newPopupData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState));
        }
        case 7:
            return withTTMsg(new TTMsg(1, []), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), inputConstraints_)(tTType_))(emptyConstraintSet)(model));
        case 8:
            return withTTMsg(new TTMsg(1, []), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), outputConstraints_)(tTType_))(emptyConstraintSet)(model));
        case 9: {
            const con_1 = msg.fields[0];
            if (con_1.tag === 1) {
                const i_1 = con_1.fields[0];
                return withTTMsg(new TTMsg(1, []), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_16 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), inputConstraints_)(tTType_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), inequalities_)(l_16)))((inEqs) => cons(i_1, inEqs))(model));
            }
            else {
                const e_1 = con_1.fields[0];
                return withTTMsg(new TTMsg(1, []), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_12 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), inputConstraints_)(tTType_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), equalities_)(l_12)))((eqs) => cons(e_1, eqs))(model));
            }
        }
        case 11: {
            const con_2 = msg.fields[0];
            if (con_2.tag === 1) {
                const i_2 = con_2.fields[0];
                return withTTMsg(new TTMsg(1, []), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_24 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), inputConstraints_)(tTType_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), inequalities_)(l_24)))((list_9) => List_except([i_2], list_9, {
                    Equals: equals,
                    GetHashCode: safeHash,
                }))(model));
            }
            else {
                const e_2 = con_2.fields[0];
                return withTTMsg(new TTMsg(1, []), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_20 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), inputConstraints_)(tTType_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), equalities_)(l_20)))((list_8) => List_except([e_2], list_8, {
                    Equals: equals,
                    GetHashCode: safeHash,
                }))(model));
            }
        }
        case 10: {
            const con_3 = msg.fields[0];
            return withTTMsg(new TTMsg(2, []), (con_3.tag === 1) ? ((i_3 = con_3.fields[0], Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_32 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), outputConstraints_)(tTType_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), inequalities_)(l_32)))((inEqs_1) => cons(i_3, inEqs_1))(model))) : ((e_3 = con_3.fields[0], Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_28 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), outputConstraints_)(tTType_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), equalities_)(l_28)))((eqs_1) => cons(e_3, eqs_1))(model))));
        }
        case 12: {
            const con_4 = msg.fields[0];
            return withTTMsg(new TTMsg(2, []), (con_4.tag === 1) ? ((i_4 = con_4.fields[0], Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_40 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), outputConstraints_)(tTType_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), inequalities_)(l_40)))((list_11) => List_except([i_4], list_11, {
                Equals: equals,
                GetHashCode: safeHash,
            }))(model))) : ((e_4 = con_4.fields[0], Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_36 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), outputConstraints_)(tTType_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), equalities_)(l_36)))((list_10) => List_except([e_4], list_10, {
                Equals: equals,
                GetHashCode: safeHash,
            }))(model))));
        }
        case 13: {
            const io_4 = msg.fields[0];
            return withTTMsg(new TTMsg(5, []), contains(io_4, model.TTConfig.HiddenColumns, {
                Equals: equals,
                GetHashCode: safeHash,
            }) ? Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), hiddenColumns_)(tTType_))((list_12) => List_except([io_4], list_12, {
                Equals: equals,
                GetHashCode: safeHash,
            }))(model) : ((newSort = ((matchValue_5 = model.TTConfig.SortType, (matchValue_5 != null) ? ((st = matchValue_5[1], (cIO = matchValue_5[0], equals(cIO, io_4) ? void 0 : [cIO, st]))) : void 0)), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), sortType_)(tTType_))(newSort)(Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), hiddenColumns_)(tTType_))((cols) => cons(io_4, cols))(model)))));
        }
        case 14:
            return withTTMsg(new TTMsg(5, []), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), hiddenColumns_)(tTType_))(empty())(model));
        case 15: {
            let newTT;
            const matchValue_6 = model.CurrentTruthTable;
            if (matchValue_6 != null) {
                const tableopt = matchValue_6;
                if (tableopt.tag === 0) {
                    const table_5 = tableopt.fields[0];
                    newTT = (new FSharpResult$2(0, [new TruthTable(table_5.TableMap, table_5.FilteredMap, void 0, table_5.SortedListRep, table_5.IsTruncated, table_5.MaxRowsWithConstraints, table_5.HasRedundancies, table_5.TableSimData, table_5.IOOrder)]));
                }
                else {
                    newTT = toFail(printf("what? Trying to clear DC Map in TT with error"));
                }
            }
            else {
                newTT = void 0;
            }
            return withTTMsg(new TTMsg(2, []), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, newTT, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState));
        }
        case 16: {
            const stOpt = msg.fields[0];
            return withTTMsg(new TTMsg(3, []), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), sortType_)(tTType_))(stOpt)(model));
        }
        case 17: {
            const io_5 = msg.fields[0][0];
            const dir = msg.fields[0][1];
            const oldOrder = model.TTConfig.IOOrder;
            let idx;
            const _arg = tryFindIndex_1((cIO_1) => equals(cIO_1, io_5), oldOrder);
            if (_arg == null) {
                idx = toFail(printf("what? IO: %A not found in TTIOOrder"))(io_5);
            }
            else {
                const i_5 = _arg | 0;
                idx = i_5;
            }
            let newOrder;
            if (dir.tag === 1) {
                const i_7 = idx | 0;
                newOrder = ((i_7 === (oldOrder.length - 1)) ? oldOrder : swapArrayEls(idx, idx + 1, oldOrder));
            }
            else if (idx === 0) {
                newOrder = oldOrder;
            }
            else {
                const i_6 = idx | 0;
                newOrder = swapArrayEls(i_6, i_6 - 1, oldOrder);
            }
            const newStyles_1 = ofArray_1(mapIndexed((i_8, io_6) => [io_6, ttGridColumnProps(i_8)], newOrder), {
                Compare: compare,
            });
            return withTTMsg(new TTMsg(21, [void 0]), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), gridStyles_)(tTType_))(newStyles_1)(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), ioOrder_)(tTType_))(newOrder)(model)));
        }
        case 18: {
            const x_11 = msg.fields[0];
            return withCmdNone(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), ioOrder_)(tTType_))(x_11)(model));
        }
        case 19: {
            const lst_4 = msg.fields[0];
            return withTTMsg(new TTMsg(1, []), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), algebraIns_)(tTType_))(lst_4)(model));
        }
        case 20: {
            const numBase = msg.fields[0];
            const table_6 = getTruthTableOrFail(model, "SetTTBase");
            const updatedTT = new FSharpResult$2(0, [new TruthTable(table_6.TableMap, table_6.FilteredMap, table_6.DCMap, table_6.SortedListRep, table_6.IsTruncated, table_6.MaxRowsWithConstraints, table_6.HasRedundancies, (inputRecord_1 = table_6.TableSimData, new SimulationData(inputRecord_1.FastSim, inputRecord_1.Graph, inputRecord_1.Inputs, inputRecord_1.Outputs, inputRecord_1.IsSynchronous, numBase, inputRecord_1.ClockTickNumber)), table_6.IOOrder)]);
            return withTTMsg(new TTMsg(21, [void 0]), new Model(model.UserData, model.WaveSim, model.WaveSimSheet, model.UISheetTrail, model.Spinner, model.Sheet, model.IsLoading, model.LastChangeCheckTime, model.LastSimulatedCanvasState, model.LastDetailedSavedState, model.CurrentSelected, model.LastSelectedIds, model.LastUsedDialogWidth, model.SelectedComponent, model.CurrentStepSimulationStep, updatedTT, model.TTConfig, model.RightPaneTabVisible, model.SimSubTabVisible, model.Hilighted, model.Clipboard, model.LastCreatedComponent, model.SavedSheetIsOutOfDate, model.CurrentProj, model.PopupViewFunc, model.SpinnerPayload, model.PopupDialogData, model.Notifications, model.TopMenuOpenState, model.DividerDragMode, model.WaveSimViewerWidth, model.ConnsOfSelectedWavesAreHighlighted, model.Pending, model.UIState, model.BuildVisible, model.DrawBlockTestState));
        }
        case 21: {
            const gridopt = msg.fields[0];
            return withCmdNone(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), gridCache_)(tTType_))(gridopt)(model));
        }
        case 22: {
            const sd_1 = msg.fields[0][1];
            const io_7 = msg.fields[0][0];
            const w = io_7[2] | 0;
            let oldLst;
            const matchValue_8 = model.PopupDialogData.AlgebraInputs;
            if (matchValue_8 == null) {
                oldLst = toFail(printf("what? PopupDialogData.AlgebraInputs is None when trying to toggle"));
            }
            else {
                const l_62 = matchValue_8;
                oldLst = l_62;
            }
            if (contains(io_7, oldLst, {
                Equals: equalArrays,
                GetHashCode: arrayHash,
            })) {
                const zero = new FSInterface(0, [convertIntToFastData(w, 0)]);
                const matchValue_9 = validateAlgebraInput(io_7[0], io_7[1], io_7[2], zero, sd_1);
                if (matchValue_9.tag === 1) {
                    const err_1 = matchValue_9.fields[0];
                    const newLst_1 = List_except([io_7], oldLst, {
                        Equals: equalArrays,
                        GetHashCode: arrayHash,
                    });
                    return [((f_11 = ((f1_1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), algebraInputs_)(newLst_1), (f2_1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), algebraError_)(err_1), (arg_82) => f2_1(f1_1(arg_82))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), popupDialogData_)(f_11)))(model), Cmd_none()];
                }
                else {
                    const newLst = List_except([io_7], oldLst, {
                        Equals: equalArrays,
                        GetHashCode: arrayHash,
                    });
                    return [((f_10 = ((f1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), algebraInputs_)(newLst), (f2 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), algebraError_)(void 0), (arg_78) => f2(f1(arg_78))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), popupDialogData_)(f_10)))(model), Cmd_none()];
                }
            }
            else {
                const alg = new FSInterface(1, [new FastAlgExp(0, [io_7])]);
                const matchValue_10 = validateAlgebraInput(io_7[0], io_7[1], io_7[2], alg, sd_1);
                if (matchValue_10.tag === 1) {
                    const err_2 = matchValue_10.fields[0];
                    const newLst_3 = cons(io_7, oldLst);
                    return [((f_13 = ((f1_3 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), algebraInputs_)(newLst_3), (f2_3 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), algebraError_)(err_2), (arg_91) => f2_3(f1_3(arg_91))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), popupDialogData_)(f_13)))(model), Cmd_none()];
                }
                else {
                    const newLst_2 = cons(io_7, oldLst);
                    return [((f_12 = ((f1_2 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), algebraInputs_)(newLst_2), (f2_2 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), algebraError_)(void 0), (arg_87) => f2_2(f1_2(arg_87))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), popupDialogData_)(f_12)))(model), Cmd_none()];
                }
            }
        }
        case 25: {
            const ct = msg.fields[0];
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), constraintTypeSel_)(popupDialogData_))(ct)(model), Cmd_none()];
        }
        case 26: {
            const io_8 = msg.fields[0];
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), constraintIOSel_)(popupDialogData_))(io_8)(model), Cmd_none()];
        }
        case 27: {
            const msg_7 = msg.fields[0];
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), constraintErrorMsg_)(popupDialogData_))(msg_7)(model), Cmd_none()];
        }
        case 28: {
            const con_5 = msg.fields[0];
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), newConstraint_)(popupDialogData_))(con_5)(model), Cmd_none()];
        }
        case 29: {
            const opt = msg.fields[0];
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), algebraInputs_)(popupDialogData_))(opt)(model), Cmd_none()];
        }
        case 30: {
            const opt_1 = msg.fields[0];
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), algebraError_)(popupDialogData_))(opt_1)(model), Cmd_none()];
        }
        case 23:
        case 24:
            return [model, Cmd_none()];
        default: {
            const simRes = msg.fields[0];
            if (simRes == null) {
                return [model, Cmd_none()];
            }
            else {
                const copyOfStruct = simRes[0];
                if (copyOfStruct.tag === 1) {
                    const e = copyOfStruct.fields[0];
                    return [((optic_3 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), gridStyles_)(tTType_), (value_3 = empty_1({
                        Compare: compare,
                    }), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), optic_3)(value_3))))(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), currentTruthTable_)(new FSharpResult$2(1, [e]))(model)), Cmd_none()];
                }
                else {
                    const sd = copyOfStruct.fields[0];
                    const model_5 = removeAllSimulationsFromModel(model);
                    const tt = truthTable(sd, model_5.TTConfig, false);
                    const colStyles = ofList(mapIndexed_1((i, io) => [io, ttGridColumnProps(i)], tt.IOOrder), {
                        Compare: compare,
                    });
                    const commands_1 = map(Cmd_OfFunc_result, toList(delay(() => append(singleton(new Msg(27, [new TTMsg(18, [toArray(tt.IOOrder)])])), delay(() => append(singleton(new Msg(27, [new TTMsg(29, [empty()])])), delay(() => (tt.IsTruncated ? singleton(new Msg(66, [warningPropsNotification(truncationWarning(tt))])) : empty_2()))))))));
                    return withCommands(commands_1, Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), gridStyles_)(tTType_))(colStyles)(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), currentTruthTable_)(new FSharpResult$2(0, [tt]))(model_5)));
                }
            }
        }
    }
}

//# sourceMappingURL=TruthTableUpdate.fs.js.map
