import { isNumber } from "../fable_modules/fable-library.4.1.4/Char.js";
import { printf, toFail, toConsole, remove } from "../fable_modules/fable-library.4.1.4/String.js";
import { contains, tryFindIndex, tryItem, indexed, tryExactlyOne, minBy, tryFind, item, ofArray, zip, filter, tail, head, isEmpty, exists, max as max_1, collect, empty, map, fold, length, singleton, append } from "../fable_modules/fable-library.4.1.4/List.js";
import { parse } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { find, tryFind as tryFind_1, containsKey, remove as remove_1, map as map_1, filter as filter_1, FSharpMap__Add, empty as empty_1, FSharpMap__get_Item, add, fold as fold_1, ofList, toList } from "../fable_modules/fable-library.4.1.4/Map.js";
import { safeHash, curry3, uncurry2, compare, curry2, defaultOf, equals, int32ToString, comparePrimitives } from "../fable_modules/fable-library.4.1.4/Util.js";
import { match } from "../fable_modules/fable-library.4.1.4/RegExp.js";
import { Constants_customComponentHint, getSymbolColour, calcLabelBoundingBox, getComponentProperties, initPortOrientation, createNewSymbol, addToPortModel, autoScaleHAndW, makeComponent, getPrefix } from "./Symbol.fs.js";
import { type_, Memory1, SymbolInfo as SymbolInfo_1, XYPos_$reflection, ComponentType, getSTransformWithDefault, isClocked, Component as Component_1, BoundingBox, XYPos, Edge } from "../Common/CommonTypes.fs.js";
import { SymbolT_showCorners_, SymbolT_Msg, SymbolT_symbols_, SymbolT_component_, SymbolT_opacity_, SymbolT_moving_, SymbolT_appearance_, SymbolT_colour_, SymbolT_symbolOf_, SymbolT_ShowCorners, SymbolT_Symbol, SymbolT_AppearanceT, SymbolT_ShowPorts, SymbolT_Model, SymbolT_PortMaps } from "../Model/DrawModelType.fs.js";
import { uuid } from "../Interface/JSHelpers.fs.js";
import { bind, value as value_40 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { uuid as uuid_1 } from "../Common/DrawHelpers.fs.js";
import { toString, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { record_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { max as max_2, min } from "../fable_modules/fable-library.4.1.4/Double.js";
import { changeBusComparef, changeConstantf, changeCounterComponent, changeAdderComponent, changeReversedInputs, changeInputValue, changeLsbf, changeNumberOfBitsf, changeSplitNComponent, changeMergeNComponent, changeGateComponent } from "./SymbolReplaceHelpers.fs.js";
import { Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { Cmd_none } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { updatePortPos, movePortUpdate, showSymbolBothForPortMovementPorts, showSymbolPorts, hideSymbolPorts, showSymbolOutPorts, showSymbolInPorts } from "./SymbolPortHelpers.fs.js";
import { isCustom } from "../Common/Helpers.fs.js";
import { manualSymbolResize, hideCompCorners, showCompCorners, flipSymbol, rotateAntiClockByAng, rotateSymbol } from "./SymbolResizeHelpers.fs.js";
import { Cmd_OfFunc_result } from "../fable_modules/Fable.Elmish.3.1.0/./cmd.fs.js";

export function extractIOPrefix(str_mut, charLst_mut) {
    let c;
    extractIOPrefix:
    while (true) {
        const str = str_mut, charLst = charLst_mut;
        const len = str.length | 0;
        if (len === 0) {
            return ["", -1];
        }
        else {
            const matchValue = str[len - 1];
            if ((c = matchValue, isNumber(c))) {
                const c_1 = matchValue;
                const newstr = remove(str, len - 1);
                str_mut = newstr;
                charLst_mut = append(singleton(str[len - 1]), charLst);
                continue extractIOPrefix;
            }
            else {
                const strNo = (length(charLst) === 0) ? "" : fold((s, v) => (s + v), "", charLst);
                const no = ((strNo === "") ? -1 : parse(strNo, 511, false, 32)) | 0;
                return [str, no];
            }
        }
        break;
    }
}

export function generateIOLabel(model, compType, name) {
    const listSymbols = map((tuple) => tuple[1], toList(model.Symbols));
    const patternInput = extractIOPrefix(name, empty());
    const newCompNo = patternInput[1] | 0;
    const newCompBaseName = patternInput[0];
    const existingNumbers = collect((sym) => {
        const matchValue = sym.Component.Type;
        switch (matchValue.tag) {
            case 3:
            case 4:
                return empty();
            default: {
                const patternInput_1 = extractIOPrefix(sym.Component.Label, empty());
                const no = patternInput_1[1] | 0;
                const baseName = patternInput_1[0];
                if (baseName === newCompBaseName) {
                    return singleton(no);
                }
                else {
                    return empty();
                }
            }
        }
    }, listSymbols);
    let matchResult, lst;
    if (!isEmpty(existingNumbers)) {
        if (head(existingNumbers) === -1) {
            if (isEmpty(tail(existingNumbers))) {
                matchResult = 1;
            }
            else {
                matchResult = 2;
                lst = existingNumbers;
            }
        }
        else {
            matchResult = 2;
            lst = existingNumbers;
        }
    }
    else {
        matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return name;
        case 1:
            if (newCompNo === -1) {
                return name + "1";
            }
            else {
                return name;
            }
        default: {
            const max = max_1(existingNumbers, {
                Compare: comparePrimitives,
            }) | 0;
            if (exists((x_1) => (x_1 === newCompNo), lst)) {
                return newCompBaseName + int32ToString(max + 1);
            }
            else {
                return name;
            }
        }
    }
}

/**
 * Returns the number of the component label (i.e. the number 1 from IN1 or ADDER16.1)
 */
export function getLabelNumber(str) {
    const index = match(/\d+$/gu, str);
    if (equals(index, defaultOf())) {
        return 0;
    }
    else {
        return parse(index[0], 511, false, 32) | 0;
    }
}

/**
 * Generates the label number for compType (i.e. the number 1 in IN1 or ADDER16.1) in a string format
 */
export function generateLabelNumber(listSymbols, compType) {
    const samePrefix = (target, symbol) => {
        const compType_1 = symbol.Component.Type;
        return getPrefix(target) === getPrefix(compType_1);
    };
    const samePrefixLst = filter(curry2(samePrefix)(compType), listSymbols);
    return int32ToString(isEmpty(samePrefixLst) ? 1 : (1 + max_1(map((sym) => getLabelNumber(sym.Component.Label), samePrefixLst), {
        Compare: comparePrimitives,
    })));
}

/**
 * Generates the label for a component type
 */
export function generateLabel(model, compType) {
    const listSymbols = map((tuple) => tuple[1], toList(model.Symbols));
    const prefix = getPrefix(compType);
    switch (compType.tag) {
        case 3:
        case 6:
        case 4:
            return prefix;
        default:
            return prefix + generateLabelNumber(listSymbols, compType);
    }
}

export function generateCopiedLabel(model, oldSymbol, compType) {
    const listSymbols = map((tuple) => tuple[1], toList(model.Symbols));
    const prefix = getPrefix(compType);
    switch (compType.tag) {
        case 3:
        case 4:
            return oldSymbol.Component.Label;
        case 6:
            return prefix;
        case 48:
        case 0:
        case 1:
        case 2:
            return generateIOLabel(model, compType, oldSymbol.Component.Label);
        default:
            return prefix + generateLabelNumber(listSymbols, compType);
    }
}

/**
 * Initialises and returns the PortMaps of a pasted symbol
 */
export function initCopiedPorts(oldSymbol, newComp) {
    const inPortIds = map((p) => p.Id, newComp.InputPorts);
    const outPortIds = map((p_1) => p_1.Id, newComp.OutputPorts);
    const oldInPortIds = map((p_2) => p_2.Id, oldSymbol.Component.InputPorts);
    const oldOutPortIds = map((p_3) => p_3.Id, oldSymbol.Component.OutputPorts);
    const equivPortIds = ofList(append(zip(oldInPortIds, inPortIds), zip(oldOutPortIds, outPortIds)), {
        Compare: comparePrimitives,
    });
    const portOrientation = fold_1((currMap, oldPortId, edge) => add(FSharpMap__get_Item(equivPortIds, oldPortId), edge, currMap), empty_1({
        Compare: comparePrimitives,
    }), oldSymbol.PortMaps.Orientation);
    const emptyPortOrder = fold((currMap_1, edge_1) => add(edge_1, empty(), currMap_1), empty_1({
        Compare: compare,
    }), ofArray([new Edge(0, []), new Edge(1, []), new Edge(2, []), new Edge(3, [])]));
    const portOrder = fold_1((currMap_2, side, oldList) => {
        const newList = fold((currList, oldPortId_1) => append(currList, singleton(FSharpMap__get_Item(equivPortIds, oldPortId_1))), empty(), oldList);
        return add(side, newList, currMap_2);
    }, emptyPortOrder, oldSymbol.PortMaps.Order);
    return new SymbolT_PortMaps(portOrder, portOrientation);
}

/**
 * Interface function to paste symbols. Is a function instead of a message because we want an output.
 * Currently drag-and-drop.
 * Pastes a list of symbols into the model and returns the new model and the id of the pasted modules.
 */
export function pasteSymbols(model, wireMap, newBasePos) {
    const oldSymbolsList = map((tuple) => tuple[1], toList(model.CopiedSymbols));
    const addNewSymbol = (basePos, _arg, oldSymbol) => {
        let inputRecord;
        const pastedIdsList = _arg[1];
        const currSymbolModel = _arg[0];
        const newId = uuid();
        let newPos;
        let left_1;
        const left = oldSymbol.Pos;
        const right = basePos;
        left_1 = (new XYPos(left.X - right.X, left.Y - right.Y));
        const right_1 = newBasePos;
        newPos = (new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y));
        const compType = oldSymbol.Component.Type;
        let newLabel;
        if (compType.tag === 3) {
            const inPortId = item(0, oldSymbol.Component.InputPorts).Id;
            const wires = map((tuple_1) => tuple_1[1], toList(wireMap));
            const targetWire = tryFind((w) => equals(w.InputPort, inPortId), wires);
            if (targetWire == null) {
                newLabel = generateCopiedLabel(new SymbolT_Model(currSymbolModel.Symbols, model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane), oldSymbol, compType);
            }
            else {
                const w_1 = targetWire;
                let origSymPortId;
                const id = w_1.OutputPort;
                origSymPortId = id;
                const origSym = tryFind((s) => exists((p) => (p.Id === origSymPortId), s.Component.OutputPorts), oldSymbolsList);
                if (origSym == null) {
                    newLabel = generateCopiedLabel(new SymbolT_Model(currSymbolModel.Symbols, model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane), oldSymbol, compType);
                }
                else {
                    const s_1 = origSym;
                    newLabel = generateIOLabel(new SymbolT_Model(currSymbolModel.Symbols, model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane), compType, oldSymbol.Component.Label);
                }
            }
        }
        else {
            newLabel = generateCopiedLabel(new SymbolT_Model(currSymbolModel.Symbols, model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane), oldSymbol, compType);
        }
        const newComp = makeComponent(newPos, compType, newId, newLabel);
        const newSymbol = autoScaleHAndW(new SymbolT_Symbol(newPos, oldSymbol.CentrePos, oldSymbol.OffsetFromBBCentre, oldSymbol.InWidth0, oldSymbol.InWidth1, oldSymbol.InWidths, oldSymbol.LabelBoundingBox, true, oldSymbol.LabelRotation, (inputRecord = oldSymbol.Appearance, new SymbolT_AppearanceT(new SymbolT_ShowPorts(4, []), inputRecord.ShowCorners, inputRecord.HighlightLabel, inputRecord.Colour, inputRecord.Opacity)), newId, newComp, oldSymbol.Annotation, oldSymbol.Moving, oldSymbol.IsClocked, oldSymbol.STransform, oldSymbol.ReversedInputPorts, initCopiedPorts(oldSymbol, newComp), oldSymbol.HScale, oldSymbol.VScale, oldSymbol.MovingPort, oldSymbol.MovingPortTarget));
        const newSymbolMap = FSharpMap__Add(currSymbolModel.Symbols, newId, newSymbol);
        const newPorts = addToPortModel(currSymbolModel, newSymbol);
        const newModel = new SymbolT_Model(newSymbolMap, currSymbolModel.CopiedSymbols, newPorts, currSymbolModel.InputPortsConnected, currSymbolModel.OutputPortsConnected, currSymbolModel.Theme, currSymbolModel.HintPane);
        const newPastedIdsList = append(pastedIdsList, singleton(newSymbol.Id));
        return [newModel, newPastedIdsList];
    };
    if (isEmpty(oldSymbolsList)) {
        return [model, empty()];
    }
    else {
        const baseSymbol = minBy((sym_1) => sym_1.Pos.X, oldSymbolsList, {
            Compare: comparePrimitives,
        });
        let basePos_1;
        const left_2 = baseSymbol.Pos;
        const right_2 = new XYPos(baseSymbol.Component.W / 2, baseSymbol.Component.H / 2);
        basePos_1 = (new XYPos(left_2.X + right_2.X, left_2.Y + right_2.Y));
        return fold(uncurry2(curry3(addNewSymbol)(basePos_1)), [model, empty()], oldSymbolsList);
    }
}

/**
 * Returns the hostId of the port in model
 */
export function getPortHostId(model, portId) {
    return FSharpMap__get_Item(model.Ports, portId).HostId;
}

/**
 * Tries to find the target in copiedIds, and tries to return the item at the same index in pastedIds.
 * Returns Some if there is exactly one element in copiedIds matching the target AND if there is an element in pastedIds at that same index, None otherwise.
 */
export function tryGetPastedEl(copiedIds, pastedIds, target) {
    const indexedTarget = tryExactlyOne(filter((tupledArg) => {
        const id = tupledArg[1];
        return equals(id, target);
    }, indexed(copiedIds)));
    if (indexedTarget != null) {
        const index = indexedTarget[0] | 0;
        return tryItem(index, pastedIds);
    }
    else {
        return void 0;
    }
}

/**
 * Returns a tuple of the list of input ports of a given input symbol, and list of output ports of a given output symbol
 */
export function getPortIds(input, output) {
    const inPortIds = map((port) => port.Id, input.Component.InputPorts);
    const outPortIds = map((port_1) => port_1.Id, output.Component.OutputPorts);
    return [inPortIds, outPortIds];
}

/**
 * Given a tuple of options, returns an Some (v1, v2) if both tuple elements are some, else None
 */
export function mergeOptions(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    let matchResult, v1, v2;
    if (_arg[0] != null) {
        if (_arg[1] != null) {
            matchResult = 0;
            v1 = value_40(_arg[0]);
            v2 = value_40(_arg[1]);
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
            return [v1, v2];
        default:
            return void 0;
    }
}

/**
 * Returns the symbol containing the given portId in the model's CopiedSymbols map
 */
export function getCopiedSymbol(model, portId) {
    const symbolId = getPortHostId(model, portId);
    return FSharpMap__get_Item(model.CopiedSymbols, symbolId);
}

/**
 * Given two componentId list of same length and input / output ports that are in list 1, return the equivalent ports in list 2.
 * ComponentIds at same index in both list 1 and list 2 need to be of the same ComponentType.
 * CompIds1 need to be in model.CopiedSymbols.
 * Assumes ports are in the same order in equivalent symbols
 */
export function getEquivalentCopiedPorts(model, copiedIds, pastedIds, _arg, _arg_1) {
    const copiedInputPort = _arg;
    const copiedOutputPort = _arg_1;
    const findEquivalentPorts = (compId1, compId2) => {
        const copiedComponent = FSharpMap__get_Item(model.CopiedSymbols, compId1).Component;
        const pastedComponent = FSharpMap__get_Item(model.Symbols, compId2).Component;
        const tryFindEquivalentPort = (copiedPorts, pastedPorts, targetPort) => {
            if ((length(copiedPorts) === 0) ? true : (length(pastedPorts) === 0)) {
                return void 0;
            }
            else {
                const matchValue = tryFindIndex((port) => (port.Id === targetPort), copiedPorts);
                if (matchValue != null) {
                    const portIndex = matchValue | 0;
                    return item(portIndex, pastedPorts).Id;
                }
                else {
                    return void 0;
                }
            }
        };
        const pastedInputPortId = tryFindEquivalentPort(copiedComponent.InputPorts, pastedComponent.InputPorts, copiedInputPort);
        const pastedOutputPortId = tryFindEquivalentPort(copiedComponent.OutputPorts, pastedComponent.OutputPorts, copiedOutputPort);
        return [pastedInputPortId, pastedOutputPortId];
    };
    const foundPastedPorts = map((tupledArg) => {
        const compId1_1 = tupledArg[0];
        const compId2_1 = tupledArg[1];
        return findEquivalentPorts(compId1_1, compId2_1);
    }, zip(copiedIds, pastedIds));
    const foundPastedInputPort = collect((_arg_2) => {
        if (_arg_2[0] != null) {
            const a = _arg_2[0];
            return singleton(a);
        }
        else {
            return empty();
        }
    }, foundPastedPorts);
    const foundPastedOutputPort = collect((_arg_3) => {
        if (_arg_3[1] != null) {
            const b = _arg_3[1];
            return singleton(b);
        }
        else {
            return empty();
        }
    }, foundPastedPorts);
    let matchResult, pastedInputPort, pastedOutputPort;
    if (!isEmpty(foundPastedInputPort)) {
        if (isEmpty(tail(foundPastedInputPort))) {
            if (!isEmpty(foundPastedOutputPort)) {
                if (isEmpty(tail(foundPastedOutputPort))) {
                    matchResult = 0;
                    pastedInputPort = head(foundPastedInputPort);
                    pastedOutputPort = head(foundPastedOutputPort);
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
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return [pastedInputPort, pastedOutputPort];
        default:
            return void 0;
    }
}

/**
 * Creates and adds a symbol into model, returns the updated model and the component id
 */
export function addSymbol(ldcs, model, pos, compType, lbl) {
    const newSym = createNewSymbol(ldcs, pos, compType, lbl, model.Theme);
    const newPorts = addToPortModel(model, newSym);
    const newSymModel = add(newSym.Id, newSym, model.Symbols);
    return [new SymbolT_Model(newSymModel, model.CopiedSymbols, newPorts, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane), newSym.Id];
}

/**
 * Given a model and a list of component ids copies the specified components and returns the updated model
 */
export function copySymbols(model, compIds) {
    const copiedSymbols = filter_1((compId, _arg) => contains(compId, compIds, {
        Equals: equals,
        GetHashCode: safeHash,
    }), model.Symbols);
    return new SymbolT_Model(model.Symbols, copiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
}

function moveSymbol(move, sym) {
    let left, right, inputRecord_1, left_1, right_1, inputRecord;
    return new SymbolT_Symbol((left = sym.Pos, (right = move, new XYPos(left.X + right.X, left.Y + right.Y))), sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, (inputRecord_1 = sym.LabelBoundingBox, new BoundingBox((left_1 = sym.LabelBoundingBox.TopLeft, (right_1 = move, new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y))), inputRecord_1.W, inputRecord_1.H)), sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, (inputRecord = sym.Component, new Component_1(inputRecord.Id, inputRecord.Type, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, sym.Component.X + move.X, sym.Component.Y + move.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo)), sym.Annotation, true, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
}

/**
 * Given a model, a component id list and an offset, moves the components by offset and returns the updated model
 */
export function moveSymbols(model, compList, offset) {
    const resetSymbols = map_1((_arg, sym) => (new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, sym.Annotation, false, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget)), model.Symbols);
    const moveSymbolInMap = (prevSymbols, sId) => add(sId, moveSymbol(offset, FSharpMap__get_Item(model.Symbols, sId)), prevSymbols);
    const newSymbols = fold(moveSymbolInMap, resetSymbols, compList);
    return new SymbolT_Model(newSymbols, model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
}

/**
 * Initialises a symbol containing the component and returns the updated symbol map containing the new symbol
 */
export function createSymbolRecord(ldcs, theme, comp) {
    let matchValue_2, si, matchValue_3, si_1, matchValue_4, si_2;
    const clocked = isClocked(empty(), ldcs, comp);
    let portMaps;
    const matchValue = comp.SymbolInfo;
    if (matchValue != null) {
        const info = matchValue;
        portMaps = (new SymbolT_PortMaps(info.PortOrder, info.PortOrientation));
    }
    else {
        portMaps = initPortOrientation(comp);
    }
    const xyPos = new XYPos(comp.X, comp.Y);
    let patternInput_1;
    if ((comp.H === -1) && (comp.W === -1)) {
        toConsole(`Weird component ${comp.Label}`);
        const comp$0027 = makeComponent(xyPos, comp.Type, comp.Id, comp.Label);
        patternInput_1 = [comp$0027.H, comp$0027.W];
    }
    else {
        const patternInput = getComponentProperties(comp.Type, comp.Label);
        const width = patternInput[3];
        const height = patternInput[2];
        patternInput_1 = [height, width];
    }
    const w = patternInput_1[1];
    const h = patternInput_1[0];
    let patternInput_2;
    const matchValue_1 = comp.SymbolInfo;
    let matchResult, info_1;
    if (matchValue_1 != null) {
        if (matchValue_1.LabelBoundingBox != null) {
            matchResult = 0;
            info_1 = matchValue_1.LabelBoundingBox;
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
            patternInput_2 = [false, info_1];
            break;
        }
        default:
            patternInput_2 = [true, new BoundingBox(xyPos, 0, 0)];
    }
    const labelBoundingBox = patternInput_2[1];
    const hasDefault = patternInput_2[0];
    return calcLabelBoundingBox(autoScaleHAndW(new SymbolT_Symbol(xyPos, new XYPos(0, 0), new XYPos(0, 0), void 0, void 0, void 0, labelBoundingBox, hasDefault, bind((info_2) => info_2.LabelRotation, comp.SymbolInfo), new SymbolT_AppearanceT(new SymbolT_ShowPorts(4, []), new SymbolT_ShowCorners(1, []), false, getSymbolColour(comp.Type, clocked, theme), 1), comp.Id, new Component_1(comp.Id, comp.Type, comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, h, w, comp.SymbolInfo), void 0, false, clocked, getSTransformWithDefault(comp.SymbolInfo), (matchValue_2 = comp.SymbolInfo, (matchValue_2 != null) ? ((si = matchValue_2, si.ReversedInputPorts)) : void 0), portMaps, (matchValue_3 = comp.SymbolInfo, (matchValue_3 != null) ? ((si_1 = matchValue_3, si_1.HScale)) : void 0), (matchValue_4 = comp.SymbolInfo, (matchValue_4 != null) ? ((si_2 = matchValue_4, si_2.VScale)) : void 0), void 0, void 0)));
}

/**
 * Given a map of current symbols and a component, initialises a symbol containing the component and returns the updated symbol map containing the new symbol
 */
export function createSymbol(ldcs, theme, prevSymbols, comp) {
    const newSymbol = createSymbolRecord(ldcs, theme, comp);
    return add(newSymbol.Id, newSymbol, prevSymbols);
}

/**
 * Create a new dummy component which can be used in an annotation.
 * pos: for RotateButtons: position of annotation on screen - middle of box (NOT top-left)
 * pos: for ScaleButton: top-right of the box
 */
export function createDummyComponent(pos, h, w) {
    const X = pos.X - (w / 2);
    const Y = pos.Y - (h / 2);
    return new Component_1(uuid_1(), new ComponentType(10, ["and", 2]), "", empty(), empty(), X, Y, h, w, void 0);
}

/**
 * Create a new annotation symbol and add it to the map of symbols.
 * pos: for RotateButtons: position of annotation on screen - middle of box (NOT top-left)
 * pos: for ScaleButton: top-right of the box
 * annotation always has moving true because we want the symbol to be drawn last
 * so it is always on top of other not moving symbols
 */
export function createAnnotation(theme, a, pos) {
    const sym = createSymbolRecord(empty(), theme, createDummyComponent(pos, 14, 14));
    return new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, a, true, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
}

/**
 * Given a model and a list of components, it creates and adds the symbols containing
 * the specified components and returns the updated model.
 */
export function loadComponents(loadedComponents, model, comps) {
    const symbolMap = fold((prevSymbols, comp) => createSymbol(loadedComponents, model.Theme, prevSymbols, comp), model.Symbols, comps);
    const addPortsToModel = (currModel, _arg, sym) => (new SymbolT_Model(currModel.Symbols, currModel.CopiedSymbols, addToPortModel(currModel, sym), currModel.InputPortsConnected, currModel.OutputPortsConnected, currModel.Theme, currModel.HintPane));
    const newModel = fold_1(addPortsToModel, model, symbolMap);
    return new SymbolT_Model(symbolMap, newModel.CopiedSymbols, newModel.Ports, newModel.InputPortsConnected, newModel.OutputPortsConnected, newModel.Theme, newModel.HintPane);
}

export class Rectangle extends Record {
    constructor(TopLeft, BottomRight) {
        super();
        this.TopLeft = TopLeft;
        this.BottomRight = BottomRight;
    }
}

export function Rectangle_$reflection() {
    return record_type("SymbolUpdate.Rectangle", [], Rectangle, () => [["TopLeft", XYPos_$reflection()], ["BottomRight", XYPos_$reflection()]]);
}

/**
 * Checks if 2 rectangles intersect
 */
export function rectanglesIntersect(rect1, rect2) {
    const intersect1D = (xOrY) => {
        const qHi = min(xOrY(rect1.BottomRight), xOrY(rect2.BottomRight));
        const qLo = max_2(xOrY(rect1.TopLeft), xOrY(rect2.TopLeft));
        return qLo <= qHi;
    };
    if (intersect1D((pos) => pos.X)) {
        return intersect1D((pos_2) => pos_2.Y);
    }
    else {
        return false;
    }
}

function moveLabel(move, sym) {
    let inputRecord, left, right;
    return new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, (inputRecord = sym.LabelBoundingBox, new BoundingBox((left = sym.LabelBoundingBox.TopLeft, (right = move, new XYPos(left.X + right.X, left.Y + right.Y))), inputRecord.W, inputRecord.H)), false, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, sym.PortMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget);
}

function modifySymbolsByCompIds(modifier, syms, compIds) {
    return fold((syms_1, id) => {
        const newSym = modifier(FSharpMap__get_Item(syms_1, id));
        return add(id, newSym, syms_1);
    }, syms, compIds);
}

/**
 * Obtain all layout info on symbol that needs to be saved.
 * It is saved in extra SymbolInfo type and corresp field in Component.
 */
export function getLayoutInfoFromSymbol(symbol) {
    return new SymbolInfo_1(symbol.LabelHasDefaultPos ? void 0 : symbol.LabelBoundingBox, symbol.LabelRotation, symbol.STransform, symbol.ReversedInputPorts, symbol.PortMaps.Orientation, symbol.PortMaps.Order, symbol.HScale, symbol.VScale);
}

/**
 * Return a symbol with its embedded component correctly updated with symbol layout info.
 * Should be called just before saving a component.
 */
export function storeLayoutInfoInComponent(_arg, symbol) {
    let inputRecord;
    return new SymbolT_Symbol(symbol.Pos, symbol.CentrePos, symbol.OffsetFromBBCentre, symbol.InWidth0, symbol.InWidth1, symbol.InWidths, symbol.LabelBoundingBox, symbol.LabelHasDefaultPos, symbol.LabelRotation, symbol.Appearance, symbol.Id, (inputRecord = symbol.Component, new Component_1(inputRecord.Id, inputRecord.Type, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, symbol.Pos.X, symbol.Pos.Y, inputRecord.H, inputRecord.W, getLayoutInfoFromSymbol(symbol))), symbol.Annotation, symbol.Moving, symbol.IsClocked, symbol.STransform, symbol.ReversedInputPorts, symbol.PortMaps, symbol.HScale, symbol.VScale, symbol.MovingPort, symbol.MovingPortTarget);
}

export function checkSymbolIntegrity(sym) {
    return toFail(printf(""));
}

export function ChangeGate(compId, gateType, numInputs, model) {
    const newSymbol = changeGateComponent(model, compId, gateType, numInputs);
    const newPorts = addToPortModel(model, newSymbol);
    const newModel = new SymbolT_Model(model.Symbols, model.CopiedSymbols, newPorts, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId))(newSymbol)(newModel);
}

export function ChangeMergeN(compId, numInputs, model) {
    const newSymbol = changeMergeNComponent(model, compId, numInputs);
    const newPorts = addToPortModel(model, newSymbol);
    const newModel = new SymbolT_Model(model.Symbols, model.CopiedSymbols, newPorts, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId))(newSymbol)(newModel);
}

export function ChangeSplitN(compId, numInputs, widths, lsbs, model) {
    const newSymbol = changeSplitNComponent(model, compId, numInputs, widths, lsbs);
    const newPorts = addToPortModel(model, newSymbol);
    const newModel = new SymbolT_Model(model.Symbols, model.CopiedSymbols, newPorts, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId))(newSymbol)(newModel);
}

/**
 * Update function which displays symbols
 */
export function update(msg, model) {
    let model_1, newSymbols, model_2, newSymbols_1, model_3, newSymbols_2, model_4, updatedSymbols, model_5, compList_1, resetSymbols, addUpdatedSymbol, customHint, newSymbols_3, model_6, resetSymbols_1, addUpdatedSymbol_1, newSymbols_4, model_7, resetSymbols_2, setSymColorToRed, newSymbols_5, model_8, resetSymbols_3, updateSymbolColour, newSymbols_6, model_9, resetSymbols_4, updateSymbolStyle, selectSymbols, setSymColourToRed, newSymbols_7, model_10, sId_7, matchValue_3, oldSym, newComp, inputRecord, newSym, model_11, changeSymColour, newSymbols_9, model_21, compId_20, addr_1, value_27, symbol_1, comp, newCompType, matchValue_4, mem, mem_1, mem_2, mem_3, newSym_1, model_22, compId_22, symbol_2, comp_1, newCompType_1, matchValue_5, newComp_3, l_18, model_23, compId_24, updateFn_1, symbol_3, comp_2, newCompType_2, matchValue_6, m, m_1, m_2, m_3, newComp_4, l_20, model_24, transformedSymbols, newSymbolMap, model_25, transformedSymbols_1, newSymbolMap_1, model_26, transformedSymbols_2, newSymbolMap_2, inputRecord_1;
    switch (msg.tag) {
        case 3: {
            const compIds = msg.fields[0];
            return [(model_1 = model, (newSymbols = fold((prevModel, sId) => remove_1(sId, prevModel), model_1.Symbols, compIds), new SymbolT_Model(newSymbols, model_1.CopiedSymbols, model_1.Ports, model_1.InputPortsConnected, model_1.OutputPortsConnected, model_1.Theme, model_1.HintPane))), Cmd_none()];
        }
        case 1: {
            const pos = msg.fields[1];
            const ldcs = msg.fields[0];
            const lbl = msg.fields[3];
            const compType = msg.fields[2];
            const newModel = addSymbol(ldcs, model, pos, compType, lbl)[0];
            return [newModel, Cmd_none()];
        }
        case 2: {
            const compIds_2 = msg.fields[0];
            return [copySymbols(model, compIds_2), Cmd_none()];
        }
        case 4:
            return [(model_2 = model, (newSymbols_1 = map_1(showSymbolInPorts, model_2.Symbols), new SymbolT_Model(newSymbols_1, model_2.CopiedSymbols, model_2.Ports, model_2.InputPortsConnected, model_2.OutputPortsConnected, model_2.Theme, model_2.HintPane))), Cmd_none()];
        case 5:
            return [(model_3 = model, (newSymbols_2 = map_1(showSymbolOutPorts, model_3.Symbols), new SymbolT_Model(newSymbols_2, model_3.CopiedSymbols, model_3.Ports, model_3.InputPortsConnected, model_3.OutputPortsConnected, model_3.Theme, model_3.HintPane))), Cmd_none()];
        case 6:
            return [(model_4 = model, (updatedSymbols = map_1(hideSymbolPorts, model_4.Symbols), new SymbolT_Model(updatedSymbols, model_4.CopiedSymbols, model_4.Ports, model_4.InputPortsConnected, model_4.OutputPortsConnected, model_4.Theme, void 0))), Cmd_none()];
        case 9: {
            const compList = msg.fields[0];
            return [(model_5 = model, (compList_1 = compList, (resetSymbols = map_1(hideSymbolPorts, model_5.Symbols), (addUpdatedSymbol = ((prevSymbols, sId_1) => {
                const matchValue = containsKey(sId_1, resetSymbols);
                if (matchValue) {
                    return add(sId_1, showSymbolPorts(FSharpMap__get_Item(resetSymbols, sId_1)), prevSymbols);
                }
                else {
                    return prevSymbols;
                }
            }), (customHint = (exists((cId) => (containsKey(cId, model_5.Symbols) && isCustom(FSharpMap__get_Item(model_5.Symbols, cId).Component.Type)), compList_1) ? Constants_customComponentHint : void 0), (newSymbols_3 = fold(addUpdatedSymbol, resetSymbols, compList_1), new SymbolT_Model(newSymbols_3, model_5.CopiedSymbols, model_5.Ports, model_5.InputPortsConnected, model_5.OutputPortsConnected, model_5.Theme, customHint))))))), Cmd_none()];
        }
        case 10: {
            const compList_2 = msg.fields[0];
            return [(model_6 = model, (resetSymbols_1 = map_1(hideSymbolPorts, model_6.Symbols), (addUpdatedSymbol_1 = ((prevSymbols_1, sId_2) => {
                if (FSharpMap__get_Item(resetSymbols_1, sId_2).Component.Type.tag === 26) {
                    return add(sId_2, showSymbolBothForPortMovementPorts(sId_2, FSharpMap__get_Item(resetSymbols_1, sId_2)), prevSymbols_1);
                }
                else {
                    return prevSymbols_1;
                }
            }), (newSymbols_4 = fold(addUpdatedSymbol_1, resetSymbols_1, compList_2), new SymbolT_Model(newSymbols_4, model_6.CopiedSymbols, model_6.Ports, model_6.InputPortsConnected, model_6.OutputPortsConnected, model_6.Theme, model_6.HintPane))))), Cmd_none()];
        }
        case 7: {
            const move = msg.fields[1];
            const compList_4 = msg.fields[0];
            return [moveSymbols(model, compList_4, move), Cmd_none()];
        }
        case 8: {
            const move_1 = msg.fields[1];
            const compId = msg.fields[0];
            return [Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SymbolT_symbolOf_(compId))((sym_5) => moveLabel(move_1, sym_5))(model), Cmd_none()];
        }
        case 12: {
            const compList_5 = msg.fields[0];
            return [(model_7 = model, (resetSymbols_2 = map_1((_arg, sym_6) => {
                let optic_1, value_2;
                return ((optic_1 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_colour_)(SymbolT_appearance_), (value_2 = getSymbolColour(sym_6.Component.Type, sym_6.IsClocked, model_7.Theme), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), optic_1)(value_2))))(sym_6);
            }, model_7.Symbols), (setSymColorToRed = ((prevSymbols_2, sId_3) => add(sId_3, Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_colour_)(SymbolT_appearance_))("Red")(FSharpMap__get_Item(resetSymbols_2, sId_3)), prevSymbols_2)), (newSymbols_5 = fold(setSymColorToRed, resetSymbols_2, compList_5), new SymbolT_Model(newSymbols_5, model_7.CopiedSymbols, model_7.Ports, model_7.InputPortsConnected, model_7.OutputPortsConnected, model_7.Theme, model_7.HintPane))))), Cmd_none()];
        }
        case 11: {
            const compList_7 = msg.fields[0];
            return [(model_8 = model, (resetSymbols_3 = map_1((_arg_1, sym_7) => {
                let f_1, f1, value_4, f2;
                return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_moving_)(false)(((f_1 = ((f1 = ((value_4 = getSymbolColour(sym_7.Component.Type, sym_7.IsClocked, model_8.Theme), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_colour_)(value_4))), (f2 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_opacity_)(1), (arg_8) => f2(f1(arg_8))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SymbolT_appearance_)(f_1)))(sym_7));
            }, model_8.Symbols), (updateSymbolColour = ((prevSymbols_3, sId_4) => add(sId_4, Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_colour_)(SymbolT_appearance_))("lightgreen")(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_moving_)(true)(FSharpMap__get_Item(resetSymbols_3, sId_4))), prevSymbols_3)), (newSymbols_6 = fold(updateSymbolColour, resetSymbols_3, compList_7), new SymbolT_Model(newSymbols_6, model_8.CopiedSymbols, model_8.Ports, model_8.InputPortsConnected, model_8.OutputPortsConnected, model_8.Theme, model_8.HintPane))))), Cmd_none()];
        }
        case 16: {
            const selectCompList = msg.fields[1];
            const isDragAndDrop = msg.fields[2];
            const errorCompList = msg.fields[0];
            return [(model_9 = model, (resetSymbols_4 = map_1((_arg_2, sym_8) => {
                let f_2, f1_1, value_9, f2_1;
                return ((f_2 = ((f1_1 = ((value_9 = getSymbolColour(sym_8.Component.Type, sym_8.IsClocked, model_9.Theme), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_colour_)(value_9))), (f2_1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_opacity_)(1), (arg_16) => f2_1(f1_1(arg_16))))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SymbolT_appearance_)(f_2)))(sym_8);
            }, model_9.Symbols), (updateSymbolStyle = ((prevSymbols_4, sId_5) => {
                if (!isDragAndDrop) {
                    return add(sId_5, Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_colour_)(SymbolT_appearance_))("lightgreen")(FSharpMap__get_Item(resetSymbols_4, sId_5)), prevSymbols_4);
                }
                else {
                    return add(sId_5, Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_opacity_)(SymbolT_appearance_))(0.2)(FSharpMap__get_Item(resetSymbols_4, sId_5)), prevSymbols_4);
                }
            }), (selectSymbols = fold(updateSymbolStyle, resetSymbols_4, selectCompList), (setSymColourToRed = ((prevSymbols_1_1, sId_1_1) => add(sId_1_1, Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_colour_)(SymbolT_appearance_))("Red")(FSharpMap__get_Item(resetSymbols_4, sId_1_1)), prevSymbols_1_1)), (newSymbols_7 = fold(setSymColourToRed, selectSymbols, errorCompList), new SymbolT_Model(newSymbols_7, model_9.CopiedSymbols, model_9.Ports, model_9.InputPortsConnected, model_9.OutputPortsConnected, model_9.Theme, model_9.HintPane))))))), Cmd_none()];
        }
        case 0:
            return [model, Cmd_none()];
        case 13: {
            const sId_6 = msg.fields[0];
            const newLabel = msg.fields[1];
            return [(model_10 = model, (sId_7 = sId_6, (matchValue_3 = tryFind_1(sId_7, model_10.Symbols), (matchValue_3 != null) ? ((oldSym = matchValue_3, (newComp = ((inputRecord = oldSym.Component, new Component_1(inputRecord.Id, inputRecord.Type, newLabel, inputRecord.InputPorts, inputRecord.OutputPorts, inputRecord.X, inputRecord.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo))), (newSym = calcLabelBoundingBox(new SymbolT_Symbol(oldSym.Pos, oldSym.CentrePos, oldSym.OffsetFromBBCentre, oldSym.InWidth0, oldSym.InWidth1, oldSym.InWidths, oldSym.LabelBoundingBox, true, oldSym.LabelRotation, oldSym.Appearance, oldSym.Id, newComp, oldSym.Annotation, oldSym.Moving, oldSym.IsClocked, oldSym.STransform, oldSym.ReversedInputPorts, oldSym.PortMaps, oldSym.HScale, oldSym.VScale, oldSym.MovingPort, oldSym.MovingPortTarget)), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(sId_7))(newSym)(model_10))))) : model_10))), Cmd_none()];
        }
        case 14: {
            const compList_9 = msg.fields[0];
            const newSymbols_8 = fold((prevSymbols_5, sId_8) => add(sId_8, Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_opacity_)(SymbolT_appearance_))(0.4)(FSharpMap__get_Item(model.Symbols, sId_8)), prevSymbols_5), model.Symbols, compList_9);
            return [new SymbolT_Model(newSymbols_8, model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane), Cmd_none()];
        }
        case 15: {
            const compList_10 = msg.fields[0];
            const colour = msg.fields[1];
            return [(model_11 = model, (changeSymColour = ((prevSymbols_6, sId_9) => {
                let optic_17, value_16;
                const newSymbol = ((optic_17 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_colour_)(SymbolT_appearance_), (value_16 = toString(colour), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), optic_17)(value_16))))(FSharpMap__get_Item(prevSymbols_6, sId_9));
                return add(sId_9, newSymbol, prevSymbols_6);
            }), (newSymbols_9 = fold(changeSymColour, model_11.Symbols, compList_10), new SymbolT_Model(newSymbols_9, model_11.CopiedSymbols, model_11.Ports, model_11.InputPortsConnected, model_11.OutputPortsConnected, model_11.Theme, model_11.HintPane)))), Cmd_none()];
        }
        case 17: {
            const newBits = msg.fields[1] | 0;
            const compId_1 = msg.fields[0];
            const newsymbol = changeNumberOfBitsf(model, compId_1, newBits);
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_1))(newsymbol)(model), Cmd_none()];
        }
        case 20: {
            const whichScale = msg.fields[2];
            const newScale = msg.fields[1];
            const compId_3 = msg.fields[0];
            const symbol = find(compId_3, model.Symbols);
            const newSymbol_2 = (whichScale === "scaleVertical") ? (new SymbolT_Symbol(symbol.Pos, symbol.CentrePos, symbol.OffsetFromBBCentre, symbol.InWidth0, symbol.InWidth1, symbol.InWidths, symbol.LabelBoundingBox, symbol.LabelHasDefaultPos, symbol.LabelRotation, symbol.Appearance, symbol.Id, symbol.Component, symbol.Annotation, symbol.Moving, symbol.IsClocked, symbol.STransform, symbol.ReversedInputPorts, symbol.PortMaps, symbol.HScale, newScale, symbol.MovingPort, symbol.MovingPortTarget)) : (new SymbolT_Symbol(symbol.Pos, symbol.CentrePos, symbol.OffsetFromBBCentre, symbol.InWidth0, symbol.InWidth1, symbol.InWidths, symbol.LabelBoundingBox, symbol.LabelHasDefaultPos, symbol.LabelRotation, symbol.Appearance, symbol.Id, symbol.Component, symbol.Annotation, symbol.Moving, symbol.IsClocked, symbol.STransform, symbol.ReversedInputPorts, symbol.PortMaps, newScale, symbol.VScale, symbol.MovingPort, symbol.MovingPortTarget));
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_3))(newSymbol_2)(model), Cmd_none()];
        }
        case 18: {
            const newLsb = msg.fields[1];
            const compId_5 = msg.fields[0];
            const newsymbol_1 = changeLsbf(model, compId_5, newLsb);
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_5))(newsymbol_1)(model), Cmd_none()];
        }
        case 19: {
            const newVal = msg.fields[1] | 0;
            const compId_7 = msg.fields[0];
            const newSymbol_5 = changeInputValue(model, compId_7, newVal);
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_7))(newSymbol_5)(model), Cmd_none()];
        }
        case 23: {
            const compId_9 = msg.fields[0];
            const newSymbol_7 = changeReversedInputs(model, compId_9);
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_9))(newSymbol_7)(model), Cmd_none()];
        }
        case 24: {
            const oldComp = msg.fields[1];
            const newComp_1 = msg.fields[2];
            const compId_11 = msg.fields[0];
            const newSymbol_9 = changeAdderComponent(model, compId_11, oldComp, newComp_1);
            const newPorts = addToPortModel(model, newSymbol_9);
            const newModel_1 = new SymbolT_Model(model.Symbols, model.CopiedSymbols, newPorts, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_11))(newSymbol_9)(newModel_1), Cmd_none()];
        }
        case 25: {
            const oldComp_1 = msg.fields[1];
            const newComp_2 = msg.fields[2];
            const compId_13 = msg.fields[0];
            const newSymbol_11 = changeCounterComponent(model, compId_13, oldComp_1, newComp_2);
            const newPorts_1 = addToPortModel(model, newSymbol_11);
            const newModel_2 = new SymbolT_Model(model.Symbols, model.CopiedSymbols, newPorts_1, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_13))(newSymbol_11)(newModel_2), Cmd_none()];
        }
        case 21: {
            const newVal_1 = msg.fields[1];
            const newText = msg.fields[2];
            const compId_15 = msg.fields[0];
            const newsymbol_2 = changeConstantf(model, compId_15, newVal_1, newText);
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_15))(newsymbol_2)(model), Cmd_none()];
        }
        case 22: {
            const newVal_2 = msg.fields[1];
            const newText_1 = msg.fields[2];
            const compId_17 = msg.fields[0];
            const newsymbol_3 = changeBusComparef(model, compId_17, newVal_2, newText_1);
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_17))(newsymbol_3)(model), Cmd_none()];
        }
        case 26:
            return [new SymbolT_Model(empty_1({
                Compare: compare,
            }), model.CopiedSymbols, empty_1({
                Compare: comparePrimitives,
            }), model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane), Cmd_none()];
        case 27: {
            const ldcs_1 = msg.fields[0];
            const comps = msg.fields[1];
            return [loadComponents(ldcs_1, model, comps), Cmd_none()];
        }
        case 28: {
            const value_26 = msg.fields[2];
            const compId_19 = msg.fields[0];
            const addr = msg.fields[1];
            return [(model_21 = model, (compId_20 = compId_19, (addr_1 = addr, (value_27 = value_26, (symbol_1 = FSharpMap__get_Item(model_21.Symbols, compId_20), (comp = symbol_1.Component, (newCompType = ((matchValue_4 = comp.Type, (matchValue_4.tag === 41) ? ((mem = matchValue_4.fields[0], new ComponentType(41, [new Memory1(mem.Init, mem.AddressWidth, mem.WordWidth, add(addr_1, value_27, mem.Data))]))) : ((matchValue_4.tag === 42) ? ((mem_1 = matchValue_4.fields[0], new ComponentType(42, [new Memory1(mem_1.Init, mem_1.AddressWidth, mem_1.WordWidth, add(addr_1, value_27, mem_1.Data))]))) : ((matchValue_4.tag === 40) ? ((mem_2 = matchValue_4.fields[0], new ComponentType(40, [new Memory1(mem_2.Init, mem_2.AddressWidth, mem_2.WordWidth, add(addr_1, value_27, mem_2.Data))]))) : ((matchValue_4.tag === 39) ? ((mem_3 = matchValue_4.fields[0], new ComponentType(39, [new Memory1(mem_3.Init, mem_3.AddressWidth, mem_3.WordWidth, add(addr_1, value_27, mem_3.Data))]))) : comp.Type))))), (newSym_1 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), type_)(SymbolT_component_))(newCompType)(symbol_1), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_20))(newSym_1)(model_21))))))))), Cmd_none()];
        }
        case 29: {
            const memory = msg.fields[1];
            const compId_21 = msg.fields[0];
            return [(model_22 = model, (compId_22 = compId_21, (symbol_2 = FSharpMap__get_Item(model_22.Symbols, compId_22), (comp_1 = symbol_2.Component, (newCompType_1 = ((matchValue_5 = comp_1.Type, (matchValue_5.tag === 41) ? memory : ((matchValue_5.tag === 42) ? memory : ((matchValue_5.tag === 40) ? memory : ((matchValue_5.tag === 39) ? memory : ((toConsole(`Warning: improper use of WriteMemoryType on ${comp_1} ignored`), comp_1.Type))))))), (newComp_3 = (new Component_1(comp_1.Id, newCompType_1, comp_1.Label, comp_1.InputPorts, comp_1.OutputPorts, comp_1.X, comp_1.Y, comp_1.H, comp_1.W, comp_1.SymbolInfo)), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), (l_18 = SymbolT_symbolOf_(compId_22), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_component_)(l_18)))(newComp_3)(model_22))))))), Cmd_none()];
        }
        case 30: {
            const updateFn = msg.fields[1];
            const compId_23 = msg.fields[0];
            return [(model_23 = model, (compId_24 = compId_23, (updateFn_1 = updateFn, (symbol_3 = FSharpMap__get_Item(model_23.Symbols, compId_24), (comp_2 = symbol_3.Component, (newCompType_2 = ((matchValue_6 = comp_2.Type, (matchValue_6.tag === 41) ? ((m = matchValue_6.fields[0], new ComponentType(41, [updateFn_1(m)]))) : ((matchValue_6.tag === 40) ? ((m_1 = matchValue_6.fields[0], new ComponentType(40, [updateFn_1(m_1)]))) : ((matchValue_6.tag === 39) ? ((m_2 = matchValue_6.fields[0], new ComponentType(39, [updateFn_1(m_2)]))) : ((matchValue_6.tag === 42) ? ((m_3 = matchValue_6.fields[0], new ComponentType(42, [updateFn_1(m_3)]))) : ((toConsole(`Warning: improper use of WriteMemoryType on ${comp_2} ignored`), comp_2.Type))))))), (newComp_4 = (new Component_1(comp_2.Id, newCompType_2, comp_2.Label, comp_2.InputPorts, comp_2.OutputPorts, comp_2.X, comp_2.Y, comp_2.H, comp_2.W, comp_2.SymbolInfo)), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), (l_20 = SymbolT_symbolOf_(compId_24), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_component_)(l_20)))(newComp_4)(model_23)))))))), Cmd_none()];
        }
        case 31: {
            const rotation = msg.fields[1];
            const compList_12 = msg.fields[0];
            return [(model_24 = model, (transformedSymbols = map((id) => rotateSymbol(rotation, FSharpMap__get_Item(model_24.Symbols, id)), compList_12), (newSymbolMap = fold((currSymMap, sym_11) => add(sym_11.Id, sym_11, currSymMap), model_24.Symbols, transformedSymbols), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbols_)(newSymbolMap)(model_24)))), Cmd_none()];
        }
        case 32: {
            const rotationDeg = msg.fields[1];
            const compList_14 = msg.fields[0];
            return [(model_25 = model, (transformedSymbols_1 = map((id_1) => rotateAntiClockByAng(rotationDeg, FSharpMap__get_Item(model_25.Symbols, id_1)), compList_14), (newSymbolMap_1 = fold((currSymMap_1, sym_13) => add(sym_13.Id, sym_13, currSymMap_1), model_25.Symbols, transformedSymbols_1), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbols_)(newSymbolMap_1)(model_25)))), Cmd_none()];
        }
        case 33: {
            const orientation = msg.fields[1];
            const compList_16 = msg.fields[0];
            return [(model_26 = model, (transformedSymbols_2 = map((id_2) => flipSymbol(orientation, FSharpMap__get_Item(model_26.Symbols, id_2)), compList_16), (newSymbolMap_2 = fold((currSymMap_2, sym_15) => add(sym_15.Id, sym_15, currSymMap_2), model_26.Symbols, transformedSymbols_2), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbols_)(newSymbolMap_2)(model_26)))), Cmd_none()];
        }
        case 34: {
            const pos_1 = msg.fields[1];
            const portId = msg.fields[0];
            return movePortUpdate(model, portId, pos_1);
        }
        case 35: {
            const pos_2 = msg.fields[1];
            const portId_1 = msg.fields[0];
            const port = FSharpMap__get_Item(model.Ports, portId_1);
            const symId = port.HostId;
            const oldSymbol = FSharpMap__get_Item(model.Symbols, symId);
            const newSymbol_15 = autoScaleHAndW((inputRecord_1 = updatePortPos(oldSymbol, pos_2, portId_1), new SymbolT_Symbol(inputRecord_1.Pos, inputRecord_1.CentrePos, inputRecord_1.OffsetFromBBCentre, inputRecord_1.InWidth0, inputRecord_1.InWidth1, inputRecord_1.InWidths, inputRecord_1.LabelBoundingBox, inputRecord_1.LabelHasDefaultPos, inputRecord_1.LabelRotation, inputRecord_1.Appearance, inputRecord_1.Id, inputRecord_1.Component, inputRecord_1.Annotation, inputRecord_1.Moving, inputRecord_1.IsClocked, inputRecord_1.STransform, inputRecord_1.ReversedInputPorts, inputRecord_1.PortMaps, inputRecord_1.HScale, inputRecord_1.VScale, inputRecord_1.MovingPort, void 0)));
            return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(symId))(newSymbol_15)(model), Cmd_OfFunc_result(new SymbolT_Msg(42, []))];
        }
        case 36: {
            const compId_25 = msg.fields[0];
            return [showCompCorners(model, new SymbolT_ShowCorners(0, []), compId_25), Cmd_none()];
        }
        case 37: {
            const compId_26 = msg.fields[0];
            return [hideCompCorners(model), Cmd_none()];
        }
        case 38: {
            const pos_3 = msg.fields[2];
            const fixedCornerLoc = msg.fields[1];
            const compId_27 = msg.fields[0];
            return manualSymbolResize(hideCompCorners(model), compId_27, fixedCornerLoc, pos_3);
        }
        case 39: {
            const resetSymbol = msg.fields[1];
            const pos_4 = msg.fields[3];
            const fixedCornerLoc_1 = msg.fields[2];
            const compId_28 = msg.fields[0];
            if (resetSymbol == null) {
                const newSymbol_16 = Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_showCorners_)(SymbolT_appearance_))(new SymbolT_ShowCorners(1, []))(FSharpMap__get_Item(model.Symbols, compId_28));
                return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_28))(newSymbol_16)(model), Cmd_none()];
            }
            else {
                const sym_17 = resetSymbol;
                return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId_28))(sym_17)(model), Cmd_none()];
            }
        }
        case 40: {
            const newSymbols_10 = map_1(storeLayoutInfoInComponent, model.Symbols);
            return [new SymbolT_Model(newSymbols_10, model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane), Cmd_none()];
        }
        case 41: {
            const theme = msg.fields[0];
            const resetSymbols_5 = map_1((_arg_3, sym_18) => {
                let f_3, value_39;
                return ((f_3 = ((value_39 = getSymbolColour(sym_18.Component.Type, sym_18.IsClocked, theme), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_colour_)(value_39))), Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), SymbolT_appearance_)(f_3)))(sym_18);
            }, model.Symbols);
            return [new SymbolT_Model(resetSymbols_5, model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, theme, model.HintPane), Cmd_none()];
        }
        default:
            return toFail(printf("What? This message is intercepted by Sheet update function and never found here"));
    }
}

export function extractComponent(symModel, sId) {
    const symbol = FSharpMap__get_Item(symModel.Symbols, sId);
    const symWithInfo = storeLayoutInfoInComponent(void 0, symbol);
    return symWithInfo.Component;
}

export function extractComponents(symModel) {
    return map((tupledArg_1) => {
        const key = tupledArg_1[0];
        return extractComponent(symModel, key);
    }, filter((tupledArg) => {
        const sid = tupledArg[0];
        const sym = tupledArg[1];
        return sym.Annotation == null;
    }, toList(symModel.Symbols)));
}

//# sourceMappingURL=SymbolUpdate.fs.js.map
