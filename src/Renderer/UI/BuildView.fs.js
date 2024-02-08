import { menu, Item_Option, Item_li } from "../fable_modules/Fulma.2.16.0/Components/Menu.fs.js";
import { HTMLAttr, CSSProp, DOMAttr } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { length, zip, tail, cons, tryHead, fold, reverse, map as map_1, collect as collect_1, append as append_1, empty, singleton, ofArray } from "../fable_modules/fable-library.4.1.4/List.js";
import { map as map_3, empty as empty_1, singleton as singleton_1, append, delay, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import * as react_1 from "react";
import { updateProjectFromCanvas } from "./MenuHelpers.fs.js";
import { DrawModelType_SheetT_Model__Model_GetCanvasState } from "../DrawBlock/Sheet.fs.js";
import { startCircuitSimulation } from "../Simulator/Simulator.fs.js";
import { join, printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { errMsg } from "../Simulator/SimulatorTypes.fs.js";
import { writeFile, tryCreateFolder, pathJoin } from "../Interface/FilesIO.fs.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { CompilationProfile, VMode, getVerilog } from "../Simulator/Verilog.fs.js";
import { map, collect } from "../fable_modules/fable-library.4.1.4/Array.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { SheetT_DebugState, SheetT_Msg } from "../Model/DrawModelType.fs.js";
import { Msg } from "../Model/ModelType.fs.js";
import { dataTooltip } from "../fable_modules/Fulma.Extensions.Wikiki.Tooltip.3.0.0/Tooltip.fs.js";
import { Color_IColor, Common_GenericOption } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import { Option, button } from "../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { label as label_1 } from "../fable_modules/Fulma.2.16.0/Elements/Form/Label.fs.js";
import { select } from "../fable_modules/Fulma.2.16.0/Elements/Form/Select.fs.js";
import { Browser_Types_Event__Event_get_Value } from "../fable_modules/Fable.React.8.0.1/Fable.React.Extensions.fs.js";
import { TableOption, table } from "../fable_modules/Fulma.2.16.0/Elements/Table.fs.js";
import { equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { map as map_2, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { toString } from "../fable_modules/fable-library.4.1.4/Types.js";

function menuItem(styles, label, onClick) {
    return Item_li(ofArray([new Item_Option(0, [false]), new Item_Option(1, [ofArray([new DOMAttr(40, [onClick]), ["style", keyValueList(styles, 1)]])])]), singleton(label));
}

function makeRowForCompilationStage(name, stage) {
    const minutesSeconds = (t) => {
        const minutes = ~~(t / 60) | 0;
        const seconds = (t % 60) | 0;
        const zeroPadding = (seconds < 10) ? "0" : "";
        return `${minutes}:${zeroPadding}${seconds}`;
    };
    const children_10 = toList(delay(() => append(singleton_1(react_1.createElement("th", {}, name)), delay(() => {
        let props_4, children_4, props_6, props_8, props_2, children_2;
        const matchValue = stage;
        switch (matchValue.tag) {
            case 1: {
                const t_2 = matchValue.fields[0] | 0;
                return singleton_1((props_4 = [["style", {
                    backgroundColor: "yellow",
                }]], (children_4 = [minutesSeconds(t_2)], react_1.createElement("th", keyValueList(props_4, 1), ...children_4))));
            }
            case 2:
                return singleton_1((props_6 = [["style", {
                    backgroundColor: "red",
                }]], react_1.createElement("th", keyValueList(props_6, 1), "XX")));
            case 3:
                return singleton_1((props_8 = [["style", {
                    backgroundColor: "gray",
                }]], react_1.createElement("th", keyValueList(props_8, 1), "--")));
            default: {
                const t_1 = matchValue.fields[0] | 0;
                return singleton_1((props_2 = [["style", {
                    backgroundColor: "green",
                }]], (children_2 = [minutesSeconds(t_1)], react_1.createElement("th", keyValueList(props_2, 1), ...children_2))));
            }
        }
    }))));
    return react_1.createElement("tr", {}, ...children_10);
}

export function verilogOutput(vType, model, profile, dispatch) {
    const matchValue = updateProjectFromCanvas(model, dispatch);
    if (matchValue != null) {
        const state = DrawModelType_SheetT_Model__Model_GetCanvasState(model.Sheet);
        const proj = matchValue;
        if (model.UIState == null) {
            const matchValue_4 = startCircuitSimulation(2, proj.OpenFileName, state[0], state[1], proj.LoadedComponents);
            if (matchValue_4.tag === 1) {
                const simError = matchValue_4.fields[0];
                toConsole(`Error in simulation prevents verilog output ${errMsg(simError.ErrType)}`);
            }
            else {
                const sim = matchValue_4.fields[0];
                const path = pathJoin([proj.ProjectPath, proj.OpenFileName + ".v"]);
                toConsole(printf("should be compiling %s :: %s"))(proj.ProjectPath)(proj.OpenFileName);
                const matchValue_5 = tryCreateFolder(pathJoin([proj.ProjectPath, "/build"]));
                let _arg_1;
                try {
                    const verilog = getVerilog(vType, sim.FastSim, profile);
                    const mappings = collect((_arg) => {
                        if (_arg[1] === 0) {
                            return [];
                        }
                        else {
                            const width = _arg[1] | 0;
                            const name = _arg[0];
                            return map((i) => (`${name}`), Int32Array.from(rangeDouble(0, 1, width - 1)));
                        }
                    }, map((fc_1) => [fc_1.FullName, fc_1.Outputs[0].Width], sim.FastSim.FOrderedComps.filter((fc) => {
                        if (fc.FType.tag === 2) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    })));
                    dispatch(new Msg(1, [new SheetT_Msg(49, [mappings])]));
                    toConsole(printf("%s"))(verilog);
                    _arg_1 = writeFile(path, verilog);
                }
                catch (e) {
                    toConsole(`Error in Verilog output: ${e.message}`);
                    _arg_1 = (new FSharpResult$2(1, [e.message]));
                }
                if (_arg_1.tag === 1) {
                    const e_1 = _arg_1.fields[0];
                }
                else {
                    dispatch(new Msg(1, [new SheetT_Msg(38, [proj.ProjectPath, proj.OpenFileName, profile])]));
                }
            }
        }
    }
}

export function viewBuild(model, dispatch) {
    const viewCatOfModel = (model_1) => {
        const styles = (model_1.Sheet.Action.tag === 13) ? singleton(new CSSProp(123, ["grabbing"])) : empty();
        const catTip1 = (name, func, tip) => {
            const react = menuItem(styles, name, func);
            const props = [new HTMLAttr(64, [`${"tooltip"} ${"has-tooltip-multiline"}`]), dataTooltip(tip), ["style", keyValueList(styles, 1)]];
            return react_1.createElement("div", keyValueList(props, 1), react);
        };
        return menu(singleton(new Common_GenericOption(1, [ofArray([new HTMLAttr(65, ["py-1"]), ["style", keyValueList(styles, 1)]])])), toList(delay(() => append(model_1.Sheet.Compiling ? singleton_1(button(ofArray([new Option(0, [new Color_IColor(8, [])]), new Option(18, [(_arg) => {
            dispatch(new Msg(1, [new SheetT_Msg(40, [])]));
        }])]), singleton("Stop building"))) : append(singleton_1(label_1(empty(), singleton("Device Selection"))), delay(() => {
            let children_10;
            return append(singleton_1(label_1(empty(), singleton(select(empty(), singleton((children_10 = append_1(singleton(react_1.createElement("option", {
                value: "",
                selected: true,
                disabled: true,
            }, "Select Device")), append_1(singleton(react_1.createElement("option", {
                value: "IceStick",
            }, "IceStick")), append_1(singleton(react_1.createElement("option", {
                value: "IssieStick-v0.1",
            }, "IssieStick v0.1")), singleton(react_1.createElement("option", {
                value: "IssieStick-v1.0",
            }, "IssieStick v1.0"))))), react_1.createElement("select", {
                onChange: (option) => {
                    const arg = Browser_Types_Event__Event_get_Value(option);
                    toConsole(printf("Value is: %s"))(arg);
                    dispatch(new Msg(1, [new SheetT_Msg(52, [Browser_Types_Event__Event_get_Value(option)])]));
                },
            }, ...children_10))))))), delay(() => append(singleton_1(react_1.createElement("br", {})), delay(() => {
                const isDisabled = model_1.Sheet.DebugDevice == null;
                return append(singleton_1(button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(16, [isDisabled]), new Option(18, [(_arg_1) => {
                    verilogOutput(new VMode(0, []), model_1, new CompilationProfile(0, []), dispatch);
                }])]), singleton("Build and upload"))), delay(() => singleton_1(button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(16, [isDisabled]), new Option(18, [(_arg_2) => {
                    verilogOutput(new VMode(0, []), model_1, new CompilationProfile(1, []), dispatch);
                }])]), singleton("Build and Debug")))));
            }))));
        })), delay(() => append(singleton_1(react_1.createElement("br", {})), delay(() => append(singleton_1(react_1.createElement("br", {})), delay(() => {
            let children_18, children_16, children_20;
            return append(singleton_1(table(ofArray([new TableOption(2, []), new TableOption(0, [])]), ofArray([(children_18 = [(children_16 = [react_1.createElement("th", {}, "Stage"), react_1.createElement("th", {}, "Progress")], react_1.createElement("tr", {}, ...children_16))], react_1.createElement("thead", {}, ...children_18)), (children_20 = [makeRowForCompilationStage("Synthesis", model_1.Sheet.CompilationStatus.Synthesis), makeRowForCompilationStage("Place And Route", model_1.Sheet.CompilationStatus.PlaceAndRoute), makeRowForCompilationStage("Generate", model_1.Sheet.CompilationStatus.Generate), makeRowForCompilationStage("Upload", model_1.Sheet.CompilationStatus.Upload)], react_1.createElement("tbody", {}, ...children_20))]))), delay(() => append(equals(model_1.Sheet.DebugState, new SheetT_DebugState(1, [])) ? append(singleton_1(button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_3) => {
                dispatch(new Msg(1, [new SheetT_Msg(43, [])]));
            }])]), singleton("Step"))), delay(() => singleton_1(button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_4) => {
                dispatch(new Msg(1, [new SheetT_Msg(50, [])]));
            }])]), singleton("Continue"))))) : (equals(model_1.Sheet.DebugState, new SheetT_DebugState(2, [])) ? singleton_1(button(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(18, [(_arg_5) => {
                dispatch(new Msg(1, [new SheetT_Msg(51, [])]));
            }])]), singleton("Pause"))) : empty_1()), delay(() => (!equals(model_1.Sheet.DebugState, new SheetT_DebugState(0, [])) ? append(singleton_1(react_1.createElement("br", {})), delay(() => append(singleton_1(react_1.createElement("br", {})), delay(() => {
                let children_28, children_26, props_32, props_34, children_36, mappings, bits, bits_1, values, numOrX;
                return singleton_1(table(ofArray([new TableOption(2, []), new TableOption(0, [])]), ofArray([(children_28 = [(children_26 = [(props_32 = [["style", {
                    backgroundColor: "lightgray",
                }]], react_1.createElement("th", keyValueList(props_32, 1), "Viewer")), (props_34 = [["style", {
                    backgroundColor: "lightgray",
                }]], react_1.createElement("th", keyValueList(props_34, 1), "Value"))], react_1.createElement("tr", {}, ...children_26))], react_1.createElement("thead", {}, ...children_28)), (children_36 = ((mappings = ofArray(model_1.Sheet.DebugMappings), (bits = collect_1((byte) => map_1((i) => (~~(byte / Math.pow(2, i)) % 2), reverse(toList(rangeDouble(0, 1, 7)))), model_1.Sheet.DebugData), (bits_1 = append_1(bits, map_1((_arg_6) => void 0, toList(rangeDouble(1, 1, 256)))), (values = fold((s_15, tupledArg) => {
                    let n, bits_2;
                    const name_1 = tupledArg[0];
                    const bit = tupledArg[1];
                    const matchValue_2 = tryHead(s_15);
                    let matchResult, bits_3, n_1;
                    if (matchValue_2 != null) {
                        if ((n = matchValue_2[0], (bits_2 = matchValue_2[1], n === name_1))) {
                            matchResult = 0;
                            bits_3 = matchValue_2[1];
                            n_1 = matchValue_2[0];
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
                            return cons([n_1, cons(bit, bits_3)], tail(s_15));
                        default:
                            return cons([name_1, singleton(bit)], s_15);
                    }
                }, empty(), zip(mappings, bits_1)), (numOrX = ((nOpt) => {
                    const str = defaultArg(map_2((b) => {
                        let copyOfStruct = b;
                        return toString(copyOfStruct);
                    }, nOpt), "x");
                    return Array.from(map_3((ch) => {
                        if (model_1.Sheet.DebugIsConnected) {
                            return ch;
                        }
                        else {
                            return "X";
                        }
                    }, str.split(""))).join('');
                }), map_1((tupledArg_1) => {
                    let children_30, children_32;
                    const name_2 = tupledArg_1[0];
                    const bits_4 = tupledArg_1[1];
                    const children_34 = [(children_30 = [name_2 + ((length(bits_4) === 1) ? "" : (`[${length(bits_4) - 1}:0]`))], react_1.createElement("th", {}, ...children_30)), (children_32 = ["0b" + join("", map_1(numOrX, bits_4))], react_1.createElement("th", {}, ...children_32))];
                    return react_1.createElement("tr", {}, ...children_34);
                }, values))))))), react_1.createElement("tbody", {}, ...children_36))])));
            })))) : empty_1())))));
        })))))))));
    };
    return viewCatOfModel(model);
}

//# sourceMappingURL=BuildView.fs.js.map
