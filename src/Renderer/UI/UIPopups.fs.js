import { map, singleton, ofArray, empty } from "../fable_modules/fable-library.4.1.4/List.js";
import { map as map_1, value } from "../fable_modules/fable-library.4.1.4/Option.js";
import { Option, progress } from "../fable_modules/Fulma.2.16.0/Elements/Progress.fs.js";
import { Size_ISize, Common_GenericOption, TextWeight_Option, Modifier_IModifier, TextSize_Option, Screen, Text_span, Color_IColor } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import * as react from "react";
import { Msg } from "../Model/ModelType.fs.js";
import { choicePopup, openInBrowser, Constants_infoSignUnicode, dynamicClosablePopup, buildPopup } from "../DrawBlock/PopupHelpers.fs.js";
import { interpolate, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { item, right, left, Level_Option, level } from "../fable_modules/Fulma.2.16.0/Layouts/Level.fs.js";
import { Option as Option_1, button } from "../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { CSSProp } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { VersionString } from "../Interface/Version.fs.js";
import { table } from "../fable_modules/Fulma.2.16.0/Elements/Table.fs.js";
import { Ol_ol, content } from "../fable_modules/Fulma.2.16.0/Elements/Content.fs.js";
import { empty as empty_1, singleton as singleton_1, append, delay, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { Tab_Option, tab as tab_1, Option as Option_2, tabs } from "../fable_modules/Fulma.2.16.0/Components/Tabs.fs.js";
import { curry2, equals } from "../fable_modules/fable-library.4.1.4/Util.js";

/**
 * A popup displaying a progress bar
 */
export function progressPopup(legend, model, dispatch) {
    const extraStyle = empty();
    const pp = value(model.PopupDialogData.Progress);
    const body = (_arg, _arg_1) => {
        const children = [legend(model, pp), progress(ofArray([new Option(3, [pp.Value]), new Option(4, [pp.Max]), new Option(1, [new Color_IColor(4, [])])]), empty())];
        return react.createElement("div", {}, ...children);
    };
    const foot = (_arg_2, _arg_3) => react.createElement("div", {});
    const close = (dispatch_1, _arg_4) => dispatch_1(new Msg(54, [void 0]));
    return buildPopup(pp.Title, body, foot, close, extraStyle, dispatch, model);
}

/**
 * A legend with speed info for the progress bar popup
 */
export function simulationLegend(model, pp) {
    const matchValue = model.CurrentStepSimulationStep;
    let matchResult, simData;
    if (matchValue != null) {
        const copyOfStruct = matchValue;
        if (copyOfStruct.tag === 0) {
            matchResult = 0;
            simData = copyOfStruct.fields[0];
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
            const speed = pp.Speed;
            return toText(interpolate("simulation speed: %6.0f%P() component-clocks / ms", [speed]));
        }
        default:
            return react.createElement("div", {});
    }
}

/**
 * Popup to implement spinner for long operations
 */
export function viewSpinnerPopup(spinPayload, model, dispatch) {
    dispatch(new Msg(36, [spinPayload.Payload]));
    const body = (dispatch_1, model_1) => progress(ofArray([new Option(1, [new Color_IColor(6, [])]), new Option(3, [spinPayload.Total - spinPayload.ToDo]), new Option(4, [spinPayload.Total])]), singleton(`${spinPayload.Total - spinPayload.ToDo}`));
    const foot = (dispatch_2, model_2) => level(singleton(new Level_Option(0, [singleton(["style", {
        width: "100%",
    }])])), ofArray([left(empty(), empty()), right(empty(), singleton(item(empty(), singleton(button(ofArray([new Option_1(0, [new Color_IColor(2, [])]), new Option_1(18, [(_arg) => {
        dispatch_2(new Msg(41, []));
    }])]), singleton("Cancel"))))))]));
    return buildPopup(spinPayload.Name, body, foot, (dispatch_3, _arg_1) => {
        dispatch_3(new Msg(41, []));
    }, empty(), dispatch, model);
}

/**
 * helper to make heading text
 */
export function makeH(h) {
    return Text_span(singleton(new Common_GenericOption(2, [ofArray([new Modifier_IModifier(3, [new Screen(1, []), new TextSize_Option(5, [])]), new Modifier_IModifier(2, [new TextWeight_Option(3, [])])])])), ofArray([h, react.createElement("br", {})]));
}

export function styledSpan(styles, txt) {
    const props = [["style", keyValueList(styles, 1)]];
    return react.createElement("span", keyValueList(props, 1), txt);
}

export function bSpan(txt) {
    return styledSpan(singleton(new CSSProp(165, ["bold"])), txt);
}

export function iSpan(txt) {
    return styledSpan(singleton(new CSSProp(156, ["italic"])), txt);
}

export function tSpan(txt) {
    return react.createElement("span", {}, txt);
}

/**
 * top-level tabbed info popup
 */
export function makeInfoPopupButton(title, info, dispatch) {
    const foot = (_arg) => react.createElement("div", {});
    const popup = (dispatch_1) => {
        dynamicClosablePopup(title, (_arg_1) => info, foot, singleton(new CSSProp(395, [1000])), dispatch_1);
    };
    return button(ofArray([new Option_1(18, [(_arg_2) => {
        popup(dispatch);
    }]), new Option_1(1, [new Size_ISize(0, [])]), new Option_1(8, []), new Option_1(0, [new Color_IColor(5, [])]), new Option_1(17, [singleton(["style", {
        height: "32px",
        fontSize: "24px",
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "3px",
        marginBottom: "0px",
        padding: "5px",
        paddingTop: "5px",
        paddingBottom: "8px",
    }])])]), singleton(Constants_infoSignUnicode));
}

export function viewInfoPopup(dispatch) {
    let s_1, s_9, s_10, s_11, children_84, children_16, children_22, children_28, children_34, children_32, s_20, children_40, children_46, children_44, s_24, children_52, children_58, children_64, children_62, s_30, children_70, children_76, children_74, s_34, children_82, children_80, s_36, s_38, props_122, children_138, children_98, children_100, children_102, children_104, children_106, children_108, children_110, children_112, children_114, children_116, children_118, children_120, children_122, children_124, children_126, children_128, children_130, children_132, children_134, children_136;
    const title = "ISSIE: Interactive Schematic Simulator and Integrated Editor";
    let about;
    const children_6 = [makeH("Version"), VersionString, react.createElement("br", {}), react.createElement("br", {}), makeH("Acknowledgments"), (s_1 = "ISSIE was created by Marco Selvatici (EIE 3rd year) as his BEng final year project. The waveform viewer was created by Edoardo Santi (EEE 3rd year) during Summer UROP work. The new F# schematic editor was written as 2021 coursework by HLP students in EEE, and particularly Team 4. The new editor was integrated by Jo Merrick (EIE 3rd year) for her BEng final year project. In Spring 2022 the HLP class implemented a draw block with component rotation and much better routing. In Summer 2022 Jason Zheng rewrote the waveform simulator, Aditya Despande wrote the truth table generator, and Archontis Pantelopoulos spent all Summer on a UROP writing the Verilog entry block and making many improvements. In 2023 HLP students implemented intelligent routing, Yujie Wang made the simulator faster, and Petra Ratkai implemented a much better Verilog compiler.", s_1), react.createElement("br", {}), react.createElement("br", {}), makeH("Technology"), Text_span(empty(), ofArray(["ISSIE is written in ", react.createElement("a", {
        onClick: (_arg) => {
            openInBrowser("https://fsharp.org/", _arg);
        },
    }, "F#"), " compiled to Javascript by ", react.createElement("a", {
        onClick: (_arg_1) => {
            openInBrowser("https://fable.io/", _arg_1);
        },
    }, "FABLE"), " and running under the ", react.createElement("a", {
        onClick: (_arg_2) => {
            openInBrowser("https://www.electronjs.org/", _arg_2);
        },
    }, "Electron"), " framework"]))];
    about = react.createElement("div", {}, ...children_6);
    let intro;
    const children_10 = [(s_9 = "Issie designs are hierarchical, made of one main sheet and optional subsheets. Include the hardware defined on one sheet in another by adding any number of  \'custom components\' from the \'My Project\' section of the Catalog. The Sheet menu shows the hierarchy.", s_9), react.createElement("br", {}), react.createElement("br", {}), (s_10 = "Issie supports step simulation for all circuits, and waveform simulation to view the waveforms of clocked circuits. Use whichever works for you.", s_10), react.createElement("br", {}), react.createElement("br", {}), (s_11 = "In Issie all clocked components (blue fill) use the same clock signal Clk. Clk connections are not shown: all Clk ports are automatically connected together. In the waveform display active clock edges, 1 per clock cycle, are indicated by vertical lines through the waveforms.", s_11), react.createElement("br", {}), react.createElement("br", {}), react.createElement("button", {
        onClick: (_arg_3) => {
            openInBrowser("https://github.com/tomcl/ISSIE", _arg_3);
        },
    }, "See the Issie Github Repo for more information"), react.createElement("br", {}), react.createElement("br", {})];
    intro = react.createElement("div", {}, ...children_10);
    let tips;
    const children_86 = [table(empty(), singleton((children_84 = [(children_16 = [react.createElement("td", {}, "Right-Click Menus"), react.createElement("td", {}, "Explore the Right-Click Menus to find context-dependent operations")], react.createElement("tr", {}, ...children_16)), (children_22 = [react.createElement("td", {}, "Ctrl-W"), react.createElement("td", {}, "Use Ctrl-W to fit the current sheet to the window so you can see all the components")], react.createElement("tr", {}, ...children_22)), (children_28 = [react.createElement("td", {}, "Sheet descriptions"), react.createElement("td", {}, "Add short descriptions to your design sheets")], react.createElement("tr", {}, ...children_28)), (children_34 = [react.createElement("td", {}, "Copy, Paste"), (children_32 = [(s_20 = "Use copy and one or more Pastes (keys or on-screen buttons) to make duplicate components with the same name and increasing numbers. Copy multiple items onto the same sheet or a new sheet", s_20)], react.createElement("td", {}, ...children_32))], react.createElement("tr", {}, ...children_34)), (children_40 = [react.createElement("td", {}, "Undo, Redo"), react.createElement("td", {}, "From onscreen buttons or keys - use them, they work well!")], react.createElement("tr", {}, ...children_40)), (children_46 = [react.createElement("td", {}, "Ctrl-drag"), (children_44 = [(s_24 = "Ctrl-drag ports on custom components to a new position on any side. Change the component height, width in properties if it is the wrong size.", s_24)], react.createElement("td", {}, ...children_44))], react.createElement("tr", {}, ...children_46)), (children_52 = [react.createElement("td", {}, "2-MUX properties"), react.createElement("td", {}, "Swap 0/1 inputs in properties if this makes a neater diagram")], react.createElement("tr", {}, ...children_52)), (children_58 = [react.createElement("td", {}, "Counters, Adders"), react.createElement("td", {}, "Hide inputs/outputs you do not need from properties")], react.createElement("tr", {}, ...children_58)), (children_64 = [react.createElement("td", {}, "Set Default input values"), (children_62 = [(s_30 = "Set the input values you want in the step simulator and \'click set default inputs\', or set individually in input properties. This will remember the values for both step simulator and waveform viewer", s_30)], react.createElement("td", {}, ...children_62))], react.createElement("tr", {}, ...children_64)), (children_70 = [react.createElement("td", {}, "Use properties"), react.createElement("td", {}, "Use properties to change labels, bus widths, etc of all components.")], react.createElement("tr", {}, ...children_70)), (children_76 = [react.createElement("td", {}, "Use radix for constant values"), (children_74 = [(s_34 = "Enter constant values for constants and bus comparators in the radix which makes most sense - they will dispaly as you have entered it.", s_34)], react.createElement("td", {}, ...children_74))], react.createElement("tr", {}, ...children_76)), (children_82 = [react.createElement("td", {}, "Position labels, rotate and flip components"), (children_80 = [(s_36 = "Drag or rotate (key) labels, reposition, rotate or flip components, drag wires, as needed to get a neat schematic. You can select and reposition multiple components", s_36)], react.createElement("td", {}, ...children_80))], react.createElement("tr", {}, ...children_82))], react.createElement("tbody", {}, ...children_84))))];
    tips = react.createElement("div", {}, ...children_86);
    let bugReport;
    const oTextList = (txtL) => content(empty(), singleton(Ol_ol(empty(), map((txt) => react.createElement("li", {}, txt), txtL))));
    const children_90 = [(s_38 = "If you think Issie is not working it is very helpful if you can give us details: we usually answer and fix bugs, if they exist, very quickly. Before you contact us, look at the list below and answer as much as possible to make your Bug Report (sometimes it is not all possible, send what you can).", s_38), oTextList(ofArray(["Which version of Issie (Info tab, About Issie)", "Which platform (Windows, Macos)", "What did you do that led to unexpected behaviour?", "What result did you expect?", "What result did you get?", "What project files caused this, the top-level sheet? Enclose project as zipped file deleting the maybe large backup directory when you zip.", "If you can reproduce the bug yourself, try opening dev tools (Ctrl-Shift-I). You can do this after the bug happens. 2/3 of problems result in error messages displayed there. Screenshot the error and its backtrace and send it.", "What precise actions (if you know them) led to the bug after loading this project"]))];
    bugReport = react.createElement("div", {}, ...children_90);
    const keyOf2 = (s1, s2) => {
        const children_92 = [bSpan(s1), tSpan(" + "), bSpan(s2)];
        return react.createElement("span", {}, ...children_92);
    };
    const keyOf3 = (s1_1, s2_1, s3) => {
        const children_94 = [bSpan(s1_1), tSpan(" + "), bSpan(s2_1), tSpan(" + "), bSpan(s3)];
        return react.createElement("span", {}, ...children_94);
    };
    let rule;
    const props_120 = [["style", {
        marginTop: "0.5em",
        marginBottom: "0.5em",
    }]];
    rule = react.createElement("hr", keyValueList(props_120, 1));
    let keys;
    const children_140 = [makeH("Keyboard & mouse gesture shortcuts - also available on top menus and right-click context menus"), (props_122 = [["style", {
        fontStyle: "Italic",
    }]], react.createElement("span", keyValueList(props_122, 1), "On Mac use Cmd instead of Ctrl.")), (children_138 = [(children_98 = [rule, tSpan("Save: "), keyOf2("Ctrl", "S"), rule], react.createElement("li", {}, ...children_98)), (children_100 = [tSpan("Select all: "), keyOf2("Ctrl", "A")], react.createElement("li", {}, ...children_100)), (children_102 = [tSpan("Copy selected diagram items: "), keyOf2("Ctrl", "C")], react.createElement("li", {}, ...children_102)), (children_104 = [tSpan("Paste diagram items: "), keyOf2("Ctrl", "V"), rule], react.createElement("li", {}, ...children_104)), (children_106 = [tSpan("Undo last diagram action: "), keyOf2("Ctrl", "Z")], react.createElement("li", {}, ...children_106)), (children_108 = [tSpan("Redo last diagram action: "), keyOf2("Ctrl", "Y"), rule], react.createElement("li", {}, ...children_108)), (children_110 = [tSpan("Zoom application in: "), keyOf3("Ctrl", "Shift", "+")], react.createElement("li", {}, ...children_110)), (children_112 = [tSpan("Zoom application out: "), keyOf3("Ctrl", "Shift", "-"), rule], react.createElement("li", {}, ...children_112)), (children_114 = [tSpan("Zoom canvas in/out: "), keyOf2("Ctrl", "MouseWheel")], react.createElement("li", {}, ...children_114)), (children_116 = [tSpan("Zoom canvas in: "), keyOf2("Alt", "Up")], react.createElement("li", {}, ...children_116)), (children_118 = [tSpan("Zoom canvas out: "), keyOf2("Alt", "Down"), rule], react.createElement("li", {}, ...children_118)), (children_120 = [tSpan("Zoom circuit to fit screen: "), keyOf2("Ctrl", "W")], react.createElement("li", {}, ...children_120)), (children_122 = [tSpan("Scroll (mouse): "), keyOf2("Shift", "Left-Click"), bSpan(" on canvas and drag")], react.createElement("li", {}, ...children_122)), (children_124 = [tSpan("Scroll (touch-pad): "), bSpan("Two-finger scrolling on touchpad")], react.createElement("li", {}, ...children_124)), (children_126 = [tSpan("Scroll (touch-screen): "), bSpan("One-finger drag on screen"), rule], react.createElement("li", {}, ...children_126)), (children_128 = [tSpan("Rotate symbol (clockwise/anticlockwise): "), keyOf2("Ctrl", "Right/Left Arrow")], react.createElement("li", {}, ...children_128)), (children_130 = [tSpan("Flip symbol (vertical/horizontal): "), keyOf2("Ctrl", "Up/Down Arrow"), rule], react.createElement("li", {}, ...children_130)), (children_132 = [tSpan("Align symbols: "), keyOf3("Ctrl", "Shift", "A")], react.createElement("li", {}, ...children_132)), (children_134 = [tSpan("Distribute symbols: "), keyOf3("Ctrl", "Shift", "D")], react.createElement("li", {}, ...children_134)), (children_136 = [tSpan("Rotate label: "), keyOf3("Ctrl", "Shift", "Right arrow")], react.createElement("li", {}, ...children_136))], react.createElement("ul", {}, ...children_138))];
    keys = react.createElement("div", {}, ...children_140);
    const body = (model) => {
        const dialogData = model.PopupDialogData;
        const tab = dialogData.Int;
        const children_152 = toList(delay(() => append(singleton_1(tabs(ofArray([new Option_2(6, []), new Option_2(3, [])]), [tab_1(singleton(new Tab_Option(0, [equals(tab, 0)])), singleton(react.createElement("a", {
            onClick: (_arg_4) => {
                dispatch(new Msg(46, [0]));
            },
        }, "About Issie"))), tab_1(singleton(new Tab_Option(0, [equals(tab, 1)])), singleton(react.createElement("a", {
            onClick: (_arg_5) => {
                dispatch(new Msg(46, [1]));
            },
        }, "Introduction"))), tab_1(singleton(new Tab_Option(0, [equals(tab, 2)])), singleton(react.createElement("a", {
            onClick: (_arg_6) => {
                dispatch(new Msg(46, [2]));
            },
        }, "Tips & Features"))), tab_1(singleton(new Tab_Option(0, [equals(tab, 3)])), singleton(react.createElement("a", {
            onClick: (_arg_7) => {
                dispatch(new Msg(46, [3]));
            },
        }, "Keyboard Shortcuts"))), tab_1(singleton(new Tab_Option(0, [equals(tab, 4)])), singleton(react.createElement("a", {
            onClick: (_arg_8) => {
                dispatch(new Msg(46, [4]));
            },
        }, "Bug Reports")))])), delay(() => {
            const matchValue = tab;
            let matchResult;
            if (matchValue != null) {
                switch (matchValue) {
                    case 0: {
                        matchResult = 0;
                        break;
                    }
                    case 1: {
                        matchResult = 1;
                        break;
                    }
                    case 2: {
                        matchResult = 2;
                        break;
                    }
                    case 3: {
                        matchResult = 3;
                        break;
                    }
                    case 4: {
                        matchResult = 4;
                        break;
                    }
                    default:
                        matchResult = 5;
                }
            }
            else {
                matchResult = 5;
            }
            switch (matchResult) {
                case 0:
                    return singleton_1(about);
                case 1:
                    return singleton_1(intro);
                case 2:
                    return singleton_1(tips);
                case 3:
                    return singleton_1(keys);
                case 4:
                    return singleton_1(bugReport);
                default: {
                    dispatch(new Msg(46, [0]));
                    return empty_1();
                }
            }
        }))));
        return react.createElement("div", {}, ...children_152);
    };
    const foot = (_arg_9) => react.createElement("div", {});
    dynamicClosablePopup(title, body, foot, singleton(new CSSProp(395, [900])), dispatch);
}

export function viewWaveInfoPopup(dispatch, feature) {
    const makeH_1 = (h) => Text_span(singleton(new Common_GenericOption(2, [ofArray([new Modifier_IModifier(3, [new Screen(1, []), new TextSize_Option(5, [])]), new Modifier_IModifier(2, [new TextWeight_Option(3, [])])])])), ofArray([h, react.createElement("br", {})]));
    const styledSpan_1 = (styles, txt) => {
        const props_2 = [["style", keyValueList(styles, 1)]];
        return react.createElement("span", keyValueList(props_2, 1), txt);
    };
    const bSpan_1 = (txt_1) => styledSpan_1(singleton(new CSSProp(165, ["bold"])), txt_1);
    const iSpan_1 = (txt_2) => styledSpan_1(singleton(new CSSProp(156, ["italic"])), txt_2);
    const tSpan_1 = (txt_3) => react.createElement("span", {}, txt_3);
    const title = feature;
    let waveInfo;
    const children_40 = toList(delay(() => {
        let props_16, children_14, children_4, children_6, s_6, children_8, s_7, children_10, s_8, props_30, children_28, children_24, s_14, props_38, children_36, children_30, s_16, children_32, s_17, children_34, s_18;
        return (feature === "Waveform and RAM selection") ? singleton_1((props_16 = [["style", {
            listStyle: "disc",
            marginLeft: "30px",
        }]], (children_14 = [(children_4 = ["The waveform viewer can view signals on", bSpan_1(" any sheet"), " in the design being simulated."], react.createElement("li", {}, ...children_4)), (children_6 = [(s_6 = "Use \'select waves\' window to select which waveforms are viewed. The search box allows them to be selected by part of name. Alternatively, expand groups to explore design and find components and ports.", s_6)], react.createElement("li", {}, ...children_6)), (children_8 = [(s_7 = "The waveforms you view can be changed whenever the simulation is running. It is good practice to delete waveforms you are not using, and order waveforms logically.", s_7)], react.createElement("li", {}, ...children_8)), (children_10 = [(s_8 = "Use \'select RAM\' to view RAMs showing contents, read and write location, in the current (cursor) cycle.", s_8)], react.createElement("li", {}, ...children_10)), react.createElement("li", {}, "Selected waveforms are preserved from one simulation to the next.")], react.createElement("ul", keyValueList(props_16, 1), ...children_14)))) : ((feature === "Waveform Operations") ? singleton_1((props_30 = [["style", {
            listStyle: "disc",
            marginLeft: "30px",
        }]], (children_28 = [react.createElement("li", {}, "Hover mouse over a waveform name in the viewer to see it highlighted if it is on the current sheet."), react.createElement("li", {}, "Change sheet to view or alter components on subsheets."), react.createElement("li", {}, "Drag names to reorder waveforms, use delete icon to delete, use \'select waves\' to add."), react.createElement("li", {}, "Use cursor and zoom controls at any time to show which cycles to display."), (children_24 = [(s_14 = "The cursor current cycle is greyed and can be moved by clicking the the waveforms, altering the number in the cursor box, or clicking arrows.", s_14)], react.createElement("li", {}, ...children_24)), react.createElement("li", {}, "Drag the grey divider to alter space used by waveforms")], react.createElement("ul", keyValueList(props_30, 1), ...children_28)))) : ((feature === "Miscellaneous") ? singleton_1((props_38 = [["style", {
            listStyle: "disc",
            marginLeft: "30px",
        }]], (children_36 = [(children_30 = [(s_16 = "During a simulation you can move to any sheet and view or edit the design. When any part of the design, or linked memory contents files, changes the green update button will be enabled allowing update to the newer design.", s_16)], react.createElement("li", {}, ...children_30)), (children_32 = [(s_17 = "You can change default values for sheet inputs in Input component property boxes. The top sheet inputs of the simulation are given these values throughout the simulation. Adjustable values anywhere else in the design can be implemented using constants.", s_17)], react.createElement("li", {}, ...children_32)), (children_34 = [(s_18 = "The waveform radix can be changed. When waveforms are too small to fit binary this will be changed to hex. Numeric values not displayed on the waveform can be viewed using the cursor and the righthand panel.", s_18)], react.createElement("li", {}, ...children_34))], react.createElement("ul", keyValueList(props_38, 1), ...children_36)))) : singleton_1(react.createElement("p", {}, "Feature not explained"))));
    }));
    waveInfo = react.createElement("div", {}, ...children_40);
    const body = (model) => waveInfo;
    const foot = (_arg) => react.createElement("div", {});
    dynamicClosablePopup(title, body, foot, singleton(new CSSProp(395, [1000])), dispatch);
}

/**
 * Waveform Selection confirmation popup
 */
export function viewWaveSelectConfirmationPopup(numWaves, action, dispatch) {
    let s_5;
    const makeH_1 = (h) => Text_span(singleton(new Common_GenericOption(2, [ofArray([new Modifier_IModifier(3, [new Screen(1, []), new TextSize_Option(5, [])]), new Modifier_IModifier(2, [new TextWeight_Option(3, [])])])])), ofArray([h, react.createElement("br", {})]));
    const styledSpan_1 = (styles, txt) => {
        const props_2 = [["style", keyValueList(styles, 1)]];
        return react.createElement("span", keyValueList(props_2, 1), txt);
    };
    const bSpan_1 = (txt_1) => styledSpan_1(singleton(new CSSProp(165, ["bold"])), txt_1);
    const iSpan_1 = (txt_2) => styledSpan_1(singleton(new CSSProp(156, ["italic"])), txt_2);
    const tSpan_1 = (txt_3) => react.createElement("span", {}, txt_3);
    const title = "Warning";
    let warning;
    const children_4 = [`You have selected ${numWaves} waveforms. `, (s_5 = "Consider reducing this number to less than 20. Too many waveforms selected in the viewer may impact viewer reponsiveness. Best practice is to select only the waveforms you need to view.", s_5)];
    warning = react.createElement("div", {}, ...children_4);
    const body = (dialogData) => warning;
    const foot = (_arg) => react.createElement("div", {});
    return choicePopup(title, warning, "Select waveforms", "Change selection", action, dispatch);
}

/**
 * Memory Properties Info Button Popup
 */
export function memPropsInfoButton(dispatch) {
    const title = "Issie Memories: how RAM and ROM data works";
    const bullet = (s) => react.createElement("li", {}, s);
    let info;
    const props_2 = [["style", {
        listStyle: "disc",
        marginLeft: "30px",
    }]];
    const children_2 = [bullet("RAMs and ROMs need to have initial data contents defined. For RAMs the fixed initial data is reset for clock cycle 0 whenever a simulation is started, the RAM data can change during simulation."), bullet("The default initial data is all 0s. Initial data is stored with the design sheet and  may be viewed or modified with the memory editor from properties. The editor can change locations numbered higher than 15 by entering a number in the \'first location displayed\' box."), bullet("During the Step or Waveform Viewer simulation RAM data can be viewed, but not manually changed. RAM data may change as the result of writes. These changes don\'t affect the initial data."), bullet("When using external tools like an assembler it is useful to enter RAM or ROM initial data from a text file. Memory data can be written to a file with extension \'.ram\'. If a \'.ram\' file is placed in the project directory a RAM or ROM component can be linked to the file, or unlinked, by selecting it from the properties page."), bullet("Linked memories will have initial data updated to latest file contents, if they change. Update is automatic\n                    when a new simulation is started and otherwise will happen if needed when the Issie screen refreshes.")];
    info = react.createElement("ul", keyValueList(props_2, 1), ...children_2);
    return makeInfoPopupButton(title, info, dispatch);
}

/**
 * make a popup button with the given popup
 */
export function makePopupButton(title, menu, buttonLegend, dispatch) {
    const foot = (_arg) => react.createElement("div", {});
    const popup = (dispatch_1) => {
        dynamicClosablePopup(title, menu, foot, singleton(new CSSProp(395, [600])), dispatch_1);
    };
    return button(ofArray([new Option_1(18, [(_arg_1) => {
        popup(dispatch);
    }]), new Option_1(0, [new Color_IColor(4, [])])]), singleton(buttonLegend));
}

/**
 * Display popup, if any is present.
 * A progress popup, if present, overrides any display popup.
 * A spinner popup, if present, overrides all other popups.
 * Called from the view function
 */
export function viewPopup(model, dispatch) {
    const matchValue = model.PopupDialogData.Progress;
    const matchValue_1 = model.PopupViewFunc;
    const matchValue_2 = model.SpinnerPayload;
    let matchResult, payload, amount, popup;
    if (matchValue != null) {
        if (matchValue_2 != null) {
            matchResult = 1;
            payload = matchValue_2;
        }
        else {
            matchResult = 2;
            amount = matchValue;
        }
    }
    else if (matchValue_1 != null) {
        if (matchValue_2 != null) {
            matchResult = 1;
            payload = matchValue_2;
        }
        else {
            matchResult = 3;
            popup = map_1(curry2, matchValue_1);
        }
    }
    else if (matchValue_2 != null) {
        matchResult = 1;
        payload = matchValue_2;
    }
    else {
        matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return react.createElement("div", {});
        case 1:
            return viewSpinnerPopup(payload, model, dispatch);
        case 2:
            return progressPopup(simulationLegend, model, dispatch);
        default:
            return popup(dispatch)(model);
    }
}

//# sourceMappingURL=UIPopups.fs.js.map
