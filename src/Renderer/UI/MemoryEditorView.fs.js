import { Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8, Optic_Map_op_HatPercent_Z32F545AB, Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Optics_Option_value_, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z335E5A0C } from "../Common/Optics.fs.js";
import { MemoryEditorData, Msg, sheet_, currentProj_ } from "../Model/ModelType.fs.js";
import { NumberBase, Memory1, InitMemData, loadedComponents_, componentsState_, $007CMemoryAndType$007C_$007C, type_, $007CMemory$007C_$007C } from "../Common/CommonTypes.fs.js";
import { append, empty as empty_1, singleton, ofArray, map } from "../fable_modules/fable-library.4.1.4/List.js";
import { initialiseMem } from "../Interface/FilesIO.fs.js";
import { SymbolT_symbols_, BusWireT_symbol_, SheetT_wire_, SymbolT_component_ } from "../Model/DrawModelType.fs.js";
import { add, tryFind, empty, map as map_1 } from "../fable_modules/fable-library.4.1.4/Map.js";
import { curry3, equals as equals_1, createAtom, int32ToString, uncurry2 } from "../fable_modules/fable-library.4.1.4/Util.js";
import { Prop, DOMAttr, HTMLAttr, CSSProp } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { op_UnaryNegation_Int32 } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { errorNotification } from "./Notifications.fs.js";
import { min, op_Addition, op_Subtraction, fromUInt64, op_LeftShift, fromInt64, toUInt64, fromInt32, toInt64, compare, equals } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { strToIntCheckWidth, strToInt, fillHex64, fillBin64, hex64, sDec64, bin64, dec64 } from "../Simulator/NumberHelpers.fs.js";
import { right, left, Level_Option, level, Item_Option, item } from "../fable_modules/Fulma.2.16.0/Layouts/Level.fs.js";
import { Option, div } from "../fable_modules/Fulma.2.16.0/Elements/Form/Field.fs.js";
import { div as div_1 } from "../fable_modules/Fulma.2.16.0/Elements/Form/Control.fs.js";
import { Option as Option_1, button } from "../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { Common_GenericOption, Color_IColor } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import { input } from "../fable_modules/Fulma.2.16.0/Elements/Form/./Input.fs.js";
import { Option as Option_2, IInputType } from "../fable_modules/Fulma.2.16.0/Elements/Form/Input.fs.js";
import { getTextEventValue } from "../Interface/JSHelpers.fs.js";
import { pow2int64 } from "../Common/Helpers.fs.js";
import { toConsole, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import * as react from "react";
import { input as input_1, checkbox } from "../fable_modules/Fulma.2.16.0/Elements/Form/Checkbox.fs.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { singleton as singleton_1, delay, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { DrawModelType_SheetT_Model__Model_WriteMemoryLine, DrawModelType_SheetT_Model__Model_GetComponentById_687F574F } from "../DrawBlock/Sheet.fs.js";
import { toString } from "../fable_modules/fable-library.4.1.4/Types.js";
import { TableOption, table as table_1 } from "../fable_modules/Fulma.2.16.0/Elements/Table.fs.js";
import { rangeInt64, rangeUInt64 } from "../fable_modules/fable-library.4.1.4/Range.js";
import { showMemoryEditorPopup } from "../DrawBlock/PopupHelpers.fs.js";

export const project_ = Compose_Lens_op_GreaterMinusGreater_Z335E5A0C(new Compose_Lens(), Optics_Option_value_())(currentProj_);

export const memory1_ = [(a) => {
    const activePatternResult = $007CMemory$007C_$007C(a.Type);
    if (activePatternResult != null) {
        const mem = activePatternResult;
        return mem;
    }
    else {
        return void 0;
    }
}, (mem_1) => Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), type_)((typ) => {
    const activePatternResult_1 = $007CMemoryAndType$007C_$007C(typ);
    if (activePatternResult_1 != null) {
        const typ_1 = activePatternResult_1[0];
        return typ_1(mem_1);
    }
    else {
        const typ_2 = typ;
        return typ_2;
    }
})];

/**
 * Updates FromData memories from linked files in all LoadedComponents INCLUDING that of the open sheet
 * For the open sheet the update must also be made be on the draw blok component
 */
export function updateLoadedComponentMemory(memUpdate) {
    const compUpdate = Optic_Map_op_HatPercent_Z32F545AB(new Optic_Map(), memory1_)(memUpdate);
    const updateProject = (p) => {
        const updateSheetComponents = (f_1) => Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), componentsState_)((list) => map(f_1, list));
        const ldcs = map(updateSheetComponents(compUpdate), p.LoadedComponents);
        return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), loadedComponents_)(ldcs)(p);
    };
    return Optic_Map_op_HatPercent_Z32F545AB(new Optic_Map(), project_)(updateProject);
}

/**
 * Update one FromData Memory1 in project to equal its linked file memory file contents.
 * Silently do not update components where the file reading fails
 */
export function updateMemory(p, mem) {
    const matchValue = mem.Init;
    if (matchValue.tag === 1) {
        const fName = matchValue.fields[0];
        const _arg = initialiseMem(mem, p.ProjectPath);
        if (_arg.tag === 1) {
            const e = _arg.fields[0];
            return mem;
        }
        else {
            const mem_1 = _arg.fields[0];
            return mem_1;
        }
    }
    else {
        return mem;
    }
}

/**
 * Update all file-linked memory components in Draw Block (attached to symbols) and relevant loadedcomponent
 */
export function updateDrawBlockMemoryComps(memUpdate, p) {
    let l_6, l_4;
    const updateSymbol = Optic_Map_op_HatPercent_Z32F545AB(new Optic_Map(), Compose_Lens_op_GreaterMinusGreater_Z335E5A0C(new Compose_Lens(), memory1_)(SymbolT_component_))((mem) => updateMemory(p, mem));
    return Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), (l_6 = ((l_4 = Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SheetT_wire_)(sheet_), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), BusWireT_symbol_)(l_4))), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_symbols_)(l_6)))((table) => map_1(uncurry2((_arg) => updateSymbol), table));
}

/**
 * Update all file-linked memory components in Draw Block and LoadedComponents
 */
export function updateAllMemoryComps(model) {
    const matchValue = model.CurrentProj;
    if (matchValue != null) {
        const p = matchValue;
        return updateLoadedComponentMemory((mem_1) => updateMemory(p, mem_1))(updateDrawBlockMemoryComps((mem) => updateMemory(p, mem), p)(model));
    }
    else {
        return model;
    }
}

const popupExtraStyle = ofArray([new CSSProp(395, ["65%"]), new CSSProp(189, ["80%"])]);

const headerHeight = 60;

const headerStyle = ["style", {
    position: "fixed",
    marginTop: int32ToString(op_UnaryNegation_Int32(headerHeight) - 20) + "px",
    paddingTop: "20px",
    paddingBottom: "60px",
    backgroundColor: "white",
    width: "61%",
    height: headerHeight,
    zIndex: 32,
}];

const bodyStyle = ["style", {
    marginTop: int32ToString(headerHeight) + "px",
}];

function showError(msg, dispatch) {
    dispatch(new Msg(64, [(dispatch_1) => errorNotification(msg, new Msg(65, []), dispatch_1)]));
}

function closeError(dispatch) {
    dispatch(new Msg(65, []));
}

function showRowWithAdrr(memoryEditorData, addr) {
    let a;
    const matchValue = memoryEditorData.Address;
    if (matchValue != null) {
        if ((a = matchValue, equals(a, addr))) {
            const a_1 = matchValue;
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
}

export function viewNum(numBase) {
    switch (numBase.tag) {
        case 1:
            return dec64;
        case 2:
            return bin64;
        case 3:
            return sDec64;
        default:
            return hex64;
    }
}

export function viewFilledNum(width, numBase) {
    switch (numBase.tag) {
        case 1:
            return dec64;
        case 2:
            return fillBin64(width);
        case 3:
            return sDec64;
        default:
            return fillHex64(width);
    }
}

export let dynamicMem = createAtom(new Memory1(new InitMemData(0, []), 0, 0, empty({
    Compare: compare,
})));

export function baseSelector(numBase, changeBase_1) {
    return item(singleton(new Item_Option(1, [])), singleton(div(singleton(new Option(1, [])), ofArray([div_1(empty_1(), singleton(button(ofArray([new Option_1(0, [equals_1(numBase, new NumberBase(0, [])) ? (new Color_IColor(4, [])) : (new Color_IColor(20, []))]), new Option_1(18, [(_arg) => {
        changeBase_1(new NumberBase(0, []));
    }])]), singleton("hex")))), div_1(empty_1(), singleton(button(ofArray([new Option_1(0, [equals_1(numBase, new NumberBase(1, [])) ? (new Color_IColor(4, [])) : (new Color_IColor(20, []))]), new Option_1(18, [(_arg_1) => {
        changeBase_1(new NumberBase(1, []));
    }])]), singleton("dec")))), div_1(empty_1(), singleton(button(ofArray([new Option_1(0, [equals_1(numBase, new NumberBase(2, [])) ? (new Color_IColor(4, [])) : (new Color_IColor(20, []))]), new Option_1(18, [(_arg_2) => {
        changeBase_1(new NumberBase(2, []));
    }])]), singleton("bin"))))]))));
}

export function changeBase(memoryEditorData, dispatch, numBase) {
    return dispatch(new Msg(53, [new MemoryEditorData(memoryEditorData.OnlyDiff, memoryEditorData.Address, memoryEditorData.Start, numBase)]));
}

/**
 * Function creating react input box for memory address for use in WaveSim code (could also be used here).
 * setMemoryAddress dispatches a message to set the memory address to that typed in the input box.
 * numberBase, addressWidth configure the view.
 * TODO: make box width variable according to memory width?
 */
export function reactMemoryAddressInputBox(numberBase, addressWidth, setMemoryAddress, dispatch) {
    return input(ofArray([new Option_2(1, [new IInputType(0, [])]), new Option_2(15, [singleton(["style", {
        marginLeft: "10px",
        width: "80px",
    }])]), new Option_2(10, [""]), new Option_2(12, [viewNum(numberBase)(toInt64(fromInt32(0)))]), new Option_2(13, [(arg_1) => {
        const text = getTextEventValue(arg_1);
        if (text === "") {
            closeError(dispatch);
            dispatch(setMemoryAddress(void 0));
        }
        else {
            const t = text;
            const matchValue = strToInt(t);
            if (matchValue.tag === 0) {
                const addr = matchValue.fields[0];
                const addr_1 = toUInt64(fromInt64(addr));
                const w = addressWidth | 0;
                if ((w < 64) && (compare(addr_1, toUInt64(op_LeftShift(1n, w))) >= 0)) {
                    showError("Address out of bounds.", dispatch);
                }
                else {
                    closeError(dispatch);
                    dispatch(setMemoryAddress(toInt64(fromUInt64(addr_1))));
                }
            }
            else {
                const err = matchValue.fields[0];
                showError(err, dispatch);
            }
        }
    }])]));
}

function makeEditorHeader(memory, isDiff, memoryEditorData, dispatch) {
    let arg;
    const children = [level(empty_1(), append(ofArray([item(singleton(new Item_Option(1, [])), ofArray([(arg = pow2int64(memory.AddressWidth), toText(printf("Number of elements: %d"))(arg)), react.createElement("br", {}), toText(printf("Word width: %d bit(s)"))(memory.WordWidth)])), item(singleton(new Item_Option(1, [])), ofArray(["First Location To View or Change", input(ofArray([new Option_2(1, [new IInputType(0, [])]), new Option_2(15, [singleton(["style", {
        marginLeft: "10px",
        width: "80px",
    }])]), new Option_2(10, [""]), new Option_2(12, [viewNum(memoryEditorData.NumberBase)(toInt64(fromInt32(0)))]), new Option_2(13, [(arg_7) => {
        const text = getTextEventValue(arg_7);
        if (text === "") {
            closeError(dispatch);
            dispatch(new Msg(53, [new MemoryEditorData(memoryEditorData.OnlyDiff, void 0, memoryEditorData.Start, memoryEditorData.NumberBase)]));
        }
        else {
            const t = text;
            const matchValue = strToInt(t);
            if (matchValue.tag === 0) {
                const addr = matchValue.fields[0];
                const addr_1 = toUInt64(fromInt64(addr));
                const w = memory.AddressWidth | 0;
                if ((w < 64) && (compare(addr_1, toUInt64(op_LeftShift(1n, w))) >= 0)) {
                    showError("Address out of bounds.", dispatch);
                }
                else {
                    closeError(dispatch);
                    dispatch(new Msg(53, [new MemoryEditorData(memoryEditorData.OnlyDiff, toInt64(fromUInt64(addr_1)), memoryEditorData.Start, memoryEditorData.NumberBase)]));
                }
            }
            else {
                const err = matchValue.fields[0];
                showError(err, dispatch);
            }
        }
    }])]))])), baseSelector(memoryEditorData.NumberBase, (numBase) => {
        changeBase(memoryEditorData, dispatch, numBase);
    })]), isDiff ? singleton(item(singleton(new Item_Option(1, [])), singleton(checkbox(empty_1(), ofArray([input_1(singleton(new Common_GenericOption(1, [ofArray([["style", {
        marginRight: "5px",
    }], new HTMLAttr(62, [memoryEditorData.OnlyDiff]), new DOMAttr(9, [(_arg) => {
        dispatch(new Msg(53, [new MemoryEditorData(!memoryEditorData.OnlyDiff, memoryEditorData.Address, memoryEditorData.Start, memoryEditorData.NumberBase)]));
    }])])]))), "Show only if changed"]))))) : empty_1()))];
    return react.createElement("div", keyValueList([headerStyle, new HTMLAttr(148, [false])], 1), ...children);
}

function makeEditorBody(memory, compId, memoryEditorData, model, dispatch) {
    let children_12, children_10, children_14, list;
    const sheetDispatch = (sMsg) => {
        dispatch(new Msg(1, [sMsg]));
    };
    const source = memory.Init;
    let isReadOnly;
    switch (source.tag) {
        case 5:
        case 4: {
            isReadOnly = "Fixed multiplier blocks cannot have initial value edited";
            break;
        }
        case 1: {
            const fName = source.fields[0];
            isReadOnly = (`This memory takes initial values from ${fName}.ram, edit the file to change them`);
            break;
        }
        case 2: {
            const fName_1 = source.fields[0];
            isReadOnly = (`This memory is linked to File ${fName_1}.ram, changes made here will be save dto that file`);
            break;
        }
        default:
            isReadOnly = "";
    }
    const showRow = (addr) => showRowWithAdrr(memoryEditorData, addr);
    const viewNumD = viewFilledNum(memory.WordWidth, memoryEditorData.NumberBase);
    const viewNumA = viewFilledNum(memory.AddressWidth, memoryEditorData.NumberBase);
    const numLocsToDisplay = 16n;
    const maxLocAddr = toUInt64(op_Subtraction(toUInt64(op_LeftShift(1n, memory.AddressWidth)), 1n));
    let patternInput;
    const matchValue = memoryEditorData.Address;
    if (matchValue != null) {
        const a = matchValue;
        const a_1 = toUInt64(fromInt64(a));
        const maxDispLocWrapped = toUInt64(op_Subtraction(toUInt64(op_Addition(a_1, numLocsToDisplay)), 1n));
        const maxDispLoc = (compare(maxDispLocWrapped, a_1) > 0) ? maxDispLocWrapped : toUInt64(fromInt64(-1n));
        patternInput = [a_1, min(maxDispLoc, maxLocAddr)];
    }
    else {
        patternInput = [0n, min(maxLocAddr, numLocsToDisplay)];
    }
    const startLoc = patternInput[0];
    const endLoc = patternInput[1];
    const makeRow = (isReadOnly_1, memData, addr_1) => {
        let children, children_2;
        const addr_2 = toInt64(fromUInt64(addr_1));
        const content = defaultArg(tryFind(toInt64(fromInt64(addr_2)), memData), 0n);
        const props_4 = [new HTMLAttr(148, [false]), ["style", {
            display: "table-row",
        }]];
        const children_4 = [(children = [viewNumA(toInt64(fromInt64(addr_2)))], react.createElement("td", {}, ...children)), (children_2 = toList(delay(() => {
            const handleInput = (ev) => {
                let Data;
                const text = getTextEventValue(ev);
                const matchValue_1 = strToIntCheckWidth(memory.WordWidth, text);
                if (matchValue_1.tag === 1) {
                    const err = matchValue_1.fields[0];
                    showError(err, dispatch);
                }
                else {
                    const value_1 = matchValue_1.fields[0];
                    closeError(dispatch);
                    let oldData;
                    const comp = DrawModelType_SheetT_Model__Model_GetComponentById_687F574F(model.Sheet, compId);
                    const _arg = comp.Type;
                    let matchResult, d;
                    switch (_arg.tag) {
                        case 41: {
                            matchResult = 0;
                            d = _arg.fields[0];
                            break;
                        }
                        case 40: {
                            matchResult = 0;
                            d = _arg.fields[0];
                            break;
                        }
                        case 39: {
                            matchResult = 0;
                            d = _arg.fields[0];
                            break;
                        }
                        case 42: {
                            matchResult = 0;
                            d = _arg.fields[0];
                            break;
                        }
                        default:
                            matchResult = 1;
                    }
                    switch (matchResult) {
                        case 0: {
                            oldData = d;
                            break;
                        }
                        default: {
                            toConsole(printf("Should not be here"));
                            oldData = memory;
                        }
                    }
                    dynamicMem((Data = add(addr_2, value_1, dynamicMem().Data), new Memory1(dynamicMem().Init, dynamicMem().AddressWidth, dynamicMem().WordWidth, Data)));
                    DrawModelType_SheetT_Model__Model_WriteMemoryLine(model.Sheet, sheetDispatch, compId, addr_2, value_1);
                    dispatch(new Msg(69, [model.LastUsedDialogWidth]));
                }
            };
            return singleton_1(input(ofArray([new Option_2(1, [new IInputType(0, [])]), new Option_2(15, [ofArray([new DOMAttr(8, [handleInput]), new Prop(0, [toString(memoryEditorData.NumberBase) + toString([addr_2, content])])])]), new Option_2(4, [isReadOnly_1]), new Option_2(10, [viewNumD(content)]), new Option_2(13, [(arg_7) => {
                const matchValue_2 = strToIntCheckWidth(memory.WordWidth, getTextEventValue(arg_7));
                if (matchValue_2.tag === 0) {
                    closeError(dispatch);
                }
                else {
                    const err_1 = matchValue_2.fields[0];
                    showError(err_1, dispatch);
                }
            }])])));
        })), react.createElement("td", {}, ...children_2))];
        return react.createElement("tr", keyValueList(props_4, 1), ...children_4);
    };
    const children_16 = [isReadOnly, react.createElement("br", {}), table_1(singleton(new TableOption(2, [])), ofArray([(children_12 = [(children_10 = [react.createElement("th", {}, "Address"), react.createElement("th", {}, "Content")], react.createElement("tr", {}, ...children_10))], react.createElement("thead", {}, ...children_12)), (children_14 = ((list = toList(rangeUInt64(startLoc, 1n, endLoc)), map(curry3(makeRow)(isReadOnly !== "")(memory.Data), list))), react.createElement("tbody", {}, ...children_14))]))];
    return react.createElement("div", keyValueList([bodyStyle], 1), ...children_16);
}

function makeFoot(editMode, dispatch, model) {
    const action = (_arg) => {
        dispatch(new Msg(65, []));
        dispatch(new Msg(41, []));
        let matchResult;
        if (editMode != null) {
            if (editMode.tag === 0) {
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
                dispatch(new Msg(69, [model.LastUsedDialogWidth]));
                break;
            }
            case 1: {
                break;
            }
        }
    };
    return level(singleton(new Level_Option(0, [singleton(["style", {
        width: "100%",
    }])])), ofArray([left(empty_1(), empty_1()), right(empty_1(), singleton(item(empty_1(), singleton(button(ofArray([new Option_1(0, [new Color_IColor(4, [])]), new Option_1(18, [action])]), singleton("Done"))))))]));
}

function makeEditor(memory, compId, model, dispatch) {
    let matchValue, mem;
    dynamicMem((matchValue = model.SelectedComponent, (matchValue != null) ? ((matchValue.Type.tag === 41) ? ((mem = matchValue.Type.fields[0], mem)) : ((matchValue.Type.tag === 40) ? ((mem = matchValue.Type.fields[0], mem)) : ((matchValue.Type.tag === 39) ? ((mem = matchValue.Type.fields[0], mem)) : ((matchValue.Type.tag === 42) ? ((mem = matchValue.Type.fields[0], mem)) : memory)))) : memory));
    return (memoryEditorData) => {
        const children = [makeEditorHeader(dynamicMem(), false, memoryEditorData, dispatch), makeEditorBody(dynamicMem(), compId, memoryEditorData, model, dispatch)];
        return react.createElement("div", {}, ...children);
    };
}

/**
 * Open a popup to view and edit the content of a memory.
 */
export function openMemoryEditor(memory, compId, model, dispatch) {
    const model_1 = updateAllMemoryComps(model);
    const title = "Memory editor";
    const body = makeEditor(memory, compId, model_1, dispatch);
    const foot = makeFoot(memory.Init, dispatch, model_1);
    showMemoryEditorPopup(title, body, foot, popupExtraStyle, dispatch);
}

function makeDiffViewerBody(memory1, memory2, memoryEditorData) {
    let children_16, children_14, children_18;
    const getData = (addr, memData) => defaultArg(tryFind(addr, memData), 0n);
    const viewNum_1 = viewNum(memoryEditorData.NumberBase);
    const makeRow = (content1, content2, addr_1) => {
        let children, props_2, children_2, props_4, children_4;
        const hasChanged = !equals(content1, content2);
        const showRow = (addr_2) => {
            if (showRowWithAdrr(memoryEditorData, addr_2)) {
                if (!memoryEditorData.OnlyDiff) {
                    return true;
                }
                else if (memoryEditorData.OnlyDiff) {
                    return hasChanged;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        const props_6 = [["style", {
            display: showRow(addr_1) ? "table-row" : "none",
        }]];
        const children_6 = [(children = [viewNum_1(toInt64(fromInt64(addr_1)))], react.createElement("td", {}, ...children)), (props_2 = [["style", {
            backgroundColor: hasChanged ? "#ffc6d3" : "auto",
        }]], (children_2 = [viewNum_1(content1)], react.createElement("td", keyValueList(props_2, 1), ...children_2))), (props_4 = [["style", {
            backgroundColor: hasChanged ? "#baffd3" : "auto",
        }]], (children_4 = [viewNum_1(content2)], react.createElement("td", keyValueList(props_4, 1), ...children_4)))];
        return react.createElement("tr", keyValueList(props_6, 1), ...children_6);
    };
    const addr_3 = defaultArg(memoryEditorData.Address, 0n);
    const addr2 = toInt64(op_Addition(addr_3, 15n));
    const children_20 = [table_1(singleton(new TableOption(2, [])), ofArray([(children_16 = [(children_14 = [react.createElement("th", {}, "Address"), react.createElement("th", {}, "Initial content"), react.createElement("th", {}, "Current content")], react.createElement("tr", {}, ...children_14))], react.createElement("thead", {}, ...children_16)), (children_18 = map((a) => makeRow(getData(a, memory1.Data), getData(a, memory2.Data), a), toList(rangeInt64(addr_3, 1n, addr2))), react.createElement("tbody", {}, ...children_18))]))];
    return react.createElement("div", keyValueList([bodyStyle], 1), ...children_20);
}

function makeDiffViewer(memory1, memory2, dispatch, memoryEditorData) {
    const children = [makeEditorHeader(memory1, true, memoryEditorData, dispatch), makeDiffViewerBody(memory1, memory2, memoryEditorData)];
    return react.createElement("div", {}, ...children);
}

export function openMemoryDiffViewer(memory1, memory2, model, dispatch) {
    const title = "Memory diff viewer";
    const body = (memoryEditorData) => makeDiffViewer(memory1, memory2, dispatch, memoryEditorData);
    const foot = makeFoot(void 0, dispatch, model);
    showMemoryEditorPopup(title, body, foot, popupExtraStyle, dispatch);
}

//# sourceMappingURL=MemoryEditorView.fs.js.map
