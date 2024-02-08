import { getTextWidthInPixels, canvasWidthContext, Text$, defaultText } from "../../Common/DrawHelpers.fs.js";
import * as react from "react";
import { keyValueList } from "../../fable_modules/fable-library.4.1.4/MapUtil.js";
import { length, unzip, cons, map, max, empty, append, ofArray, singleton } from "../../fable_modules/fable-library.4.1.4/List.js";
import { DOMAttr, SVGAttr, CSSProp, HTMLAttr } from "../../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { Option } from "../../fable_modules/Fulma.2.16.0/Elements/Button.fs.js";
import { Color_IColor, Size_ISize } from "../../fable_modules/Fulma.2.16.0/Common.fs.js";
import { Union } from "../../fable_modules/fable-library.4.1.4/Types.js";
import { union_type } from "../../fable_modules/fable-library.4.1.4/Reflection.js";
import { setSelectionOpen, pointsToString, endCycle, viewBoxMinX, viewBoxWidth, Constants_valueColumnMaxChars, selectedWaves, listCollectSomes, Constants_viewBoxHeight, Constants_nonBinaryTransLen, singleWaveWidth } from "./WaveSimHelpers.fs.js";
import { empty as empty_1, singleton as singleton_1, append as append_1, delay, toList } from "../../fable_modules/fable-library.4.1.4/Seq.js";
import { replace, join } from "../../fable_modules/fable-library.4.1.4/String.js";
import { min, parse } from "../../fable_modules/fable-library.4.1.4/Double.js";
import { map as map_1 } from "../../fable_modules/fable-library.4.1.4/Option.js";
import { tryFind } from "../../fable_modules/fable-library.4.1.4/Map.js";
import { int32ToString, comparePrimitives } from "../../fable_modules/fable-library.4.1.4/Util.js";
import { FastData, FastBits, bigIntMask } from "../../Simulator/SimulatorTypes.fs.js";
import { fromZero } from "../../fable_modules/fable-library.4.1.4/BigInt.js";
import { Constants_maxBinaryDisplayWidth, fastDataToPaddedString } from "../../Simulator/NumberHelpers.fs.js";
import { rangeDouble } from "../../fable_modules/fable-library.4.1.4/Range.js";
import { Msg, WaveSimModel } from "../../Model/ModelType.fs.js";
import { contains } from "../../fable_modules/fable-library.4.1.4/Set.js";

export const Constants_valuesColWidth = 100;

export const Constants_deleteSymbolWidth = 20;

export const Constants_scrollBarWidth = 15;

export const Constants_leftMargin = 30;

export const Constants_rightMargin = 30;

export const Constants_rowHeight = 30;

export const Constants_colWidth = 120;

export const Constants_clkLineWidth = 0.8;

export const Constants_lineThickness = 0.8;

export const Constants_columnFontSize = "12px";

export const Constants_columnFontFamily = "Helvetica";

export const Constants_valueColumnFontSize = "12px";

export const Constants_valueColumnFontFamily = "Helvetica";

export const Constants_valueColumnText = new Text$(defaultText.TextAnchor, Constants_valueColumnFontSize, defaultText.FontWeight, Constants_valueColumnFontFamily, defaultText.Fill, defaultText.UserSelect, defaultText.DominantBaseline);

export const Constants_fontSizeValueOnWave = "10px";

export const Constants_valueOnWaveText = new Text$(defaultText.TextAnchor, Constants_fontSizeValueOnWave, defaultText.FontWeight, defaultText.FontFamily, defaultText.Fill, defaultText.UserSelect, defaultText.DominantBaseline);

export const Constants_valueOnWavePadding = 75;

export const Constants_borderProperties = "2px solid rgb(219,219,219)";

export const Constants_labelPadding = 3;

export const Constants_cursorColor = "Lavender";

export const topRowStyle = ["style", {
    height: Constants_rowHeight,
    borderBottom: "2px solid rgb(219,219,219)",
}];

export const topRow = singleton(react.createElement("div", keyValueList([topRowStyle], 1)));

export const errorMessageStyle = ["style", {
    width: "90%",
    marginLeft: "5%",
    marginTop: "15px",
}];

export const checkboxStyle = ["style", {
    margin: "0 5px 0 5px",
    cursor: "pointer",
    float: "left",
}];

export const checkboxInputProps = ofArray([new HTMLAttr(159, ["checkbox"]), checkboxStyle]);

export const boldFontStyle = ["style", {
    fontWeight: "bold",
    fontSize: "14px",
}];

export const normalFontStyle = ["style", {
    fontWeight: "normal",
    fontSize: "14px",
}];

export const noBorderStyle = ["style", {
    borderWidth: 0,
}];

export const selectRamButtonStyle = ["style", {
    height: Constants_rowHeight,
    fontSize: "16px",
    position: "relative",
    marginRight: 0,
}];

export const selectWavesButtonStyle = ["style", {
    height: Constants_rowHeight,
    fontSize: "16px",
    position: "relative",
    marginLeft: 0,
}];

export const topRowButtonStyle = ["style", {
    height: Constants_rowHeight,
    width: Constants_colWidth,
    fontSize: "16px",
    position: "relative",
    marginRight: 5,
    marginLeft: 5,
}];

export function infoButtonProps(color) {
    return ofArray([new Option(0, [color]), new Option(8, []), new Option(1, [new Size_ISize(0, [])]), new Option(17, [singleton(["style", {
        height: Constants_rowHeight,
        fontSize: "15px",
        width: "20px",
        position: "relative",
        marginRight: 0,
        marginLeft: 0,
    }])])]);
}

export function topHalfButtonProps(color, buttonId) {
    return ofArray([new Option(0, [color]), new Option(17, [ofArray([new HTMLAttr(99, [buttonId]), topRowButtonStyle])])]);
}

export function selectRamButtonProps(buttonId) {
    return topHalfButtonProps(new Color_IColor(5, []), buttonId);
}

/**
 * Props for selectRamButton when no RAMs are selectable
 */
export function selectRamButtonPropsLight(buttonId) {
    return append(selectRamButtonProps(buttonId), singleton(new Option(15, [])));
}

export function topHalfButtonPropsWithWidth(buttonId, color) {
    return ofArray([new Option(0, [color]), new Option(17, [ofArray([new HTMLAttr(99, [buttonId]), topRowButtonStyle])])]);
}

export const selectWavesButtonProps = (buttonId) => topHalfButtonProps(new Color_IColor(5, []), buttonId);

/**
 * Props for selectWavesButton when no waves are selectable
 */
export function selectWavesButtonPropsLight(buttonId) {
    return append(selectWavesButtonProps(buttonId), singleton(new Option(15, [])));
}

export const centerAlignStyle = ["style", {
    textAlign: "center",
    fontSize: "15px",
}];

export const ramRowStyle = ["style", {
    height: Constants_rowHeight,
    borderBottom: "1px solid rgb(219,219,219)",
}];

export class RamRowType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["RAMWritten", "RAMRead", "RAMNormal"];
    }
}

export function RamRowType_$reflection() {
    return union_type("WaveSimStyle.RamRowType", [], RamRowType, () => [[], [], []]);
}

/**
 * Style for each row of ramTable
 */
export function ramTableRowStyle(rowType) {
    switch (rowType.tag) {
        case 1:
            return ofArray([new CSSProp(21, ["hsl(206, 70%, 96%)"]), new CSSProp(103, ["hsl(204, 86%, 53%)"]), new CSSProp(165, ["bold"])]);
        case 2:
            return empty();
        default:
            return ofArray([new CSSProp(21, ["hsl(347, 90%, 96%)"]), new CSSProp(103, ["hsl(348, 100%, 61%)"]), new CSSProp(165, ["bold"])]);
    }
}

export const ramTableLevelProps = singleton(["style", {
    font: Constants_columnFontFamily,
    fontSize: Constants_columnFontSize,
    position: "relative",
    display: "inline-block",
    marginRight: 20,
    marginLeft: 20,
}]);

export const ramTablesLevelProps = singleton(["style", {
    overflowX: "auto",
    font: Constants_columnFontFamily,
    fontSize: Constants_columnFontSize,
}]);

export const zoomOutSVG = (() => {
    const children_4 = [react.createElement("path", {
        d: "M190.707,180.101l-47.079-47.077c11.702-14.072,18.752-32.142,18.752-51.831C162.381,36.423,125.959,0,81.191,0\n                C36.422,0,0,36.423,0,81.193c0,44.767,36.422,81.187,81.191,81.187c19.689,0,37.759-7.049,51.831-18.75l47.079,47.077\n                c1.464,1.465,3.384,2.197,5.303,2.197c1.919,0,3.839-0.732,5.303-2.197C193.637,187.778,193.637,183.03,190.707,180.101z\n                M15,81.193C15,44.694,44.693,15,81.191,15c36.497,0,66.189,29.694,66.189,66.193c0,36.496-29.692,66.187-66.189,66.187\n                C44.693,147.38,15,117.689,15,81.193z",
    }), react.createElement("path", {
        d: "M118.035,73.689H44.346c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h73.689c4.142,0,7.5-3.358,7.5-7.5\n                    C125.535,77.047,122.177,73.689,118.035,73.689z",
    })];
    return react.createElement("svg", {
        viewBox: "0 0 192.904 192.904",
        height: "20px",
    }, ...children_4);
})();

export const zoomInSVG = (() => {
    const children_4 = [react.createElement("path", {
        d: "M190.707,180.101l-47.079-47.077c11.702-14.072,18.752-32.142,18.752-51.831C162.381,36.423,125.959,0,81.191,0\n                C36.422,0,0,36.423,0,81.193c0,44.767,36.422,81.187,81.191,81.187c19.689,0,37.759-7.049,51.831-18.75l47.079,47.077\n                c1.464,1.465,3.384,2.197,5.303,2.197c1.919,0,3.839-0.732,5.303-2.197C193.637,187.778,193.637,183.03,190.707,180.101z\n                M15,81.193C15,44.694,44.693,15,81.191,15c36.497,0,66.189,29.694,66.189,66.193c0,36.496-29.692,66.187-66.189,66.187\n                C44.693,147.38,15,117.689,15,81.193z",
    }), react.createElement("path", {
        d: "M118.035,73.689H88.69V44.345c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v29.345H44.346c-4.143,0-7.5,3.358-7.5,7.5\n                c0,4.142,3.357,7.5,7.5,7.5H73.69v29.346c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5V88.689h29.345c4.143,0,7.5-3.358,7.5-7.5\n                C125.535,77.047,122.178,73.689,118.035,73.689z",
    })];
    return react.createElement("svg", {
        viewBox: "0 0 192.904 192.904",
        height: "20px",
    }, ...children_4);
})();

/**
 * Props for displaying values on non-binary waves
 */
export function valueOnWaveProps(m, i, start, width) {
    return ofArray([new SVGAttr(44, [((start * singleWaveWidth(m)) + Constants_nonBinaryTransLen) + (i * width)]), new SVGAttr(57, [0.6 * Constants_viewBoxHeight]), ["style", {
        fontSize: Constants_fontSizeValueOnWave,
    }]]);
}

export const clkCycleButtonStyle = ["style", {
    float: "right",
    position: "relative",
    height: Constants_rowHeight,
    textAlign: "center",
    display: "inline-block",
    fontSize: "13px",
}];

export const clkCycleInputStyle = ["style", {
    margin: "0 0 0 0",
    float: "left",
    textAlign: "center",
    width: "60px",
    height: Constants_rowHeight,
    display: "inline-block",
    fontSize: "13px",
    borderColor: "gray",
    borderWidth: "1px 0.5px 1px 0.5px",
    borderRadius: 0,
}];

export const clkCycleInputProps = ofArray([new HTMLAttr(119, [0]), new HTMLAttr(148, [false]), new HTMLAttr(154, [1]), clkCycleInputStyle]);

export const clkCycleBut = ofArray([new CSSProp(218, [0]), new CSSProp(189, [Constants_rowHeight]), new CSSProp(273, [0]), new CSSProp(395, ["30px"]), new CSSProp(291, ["relative"]), new CSSProp(144, ["left"]), new CSSProp(49, ["gray"]), new CSSProp(82, ["1px 0.5px 1px 0.5px"])]);

export const clkCycleInnerStyle = ["style", keyValueList(append(clkCycleBut, singleton(new CSSProp(69, [0]))), 1)];

export const clkCycleLeftStyle = ["style", keyValueList(append(clkCycleBut, ofArray([new CSSProp(78, ["4px"]), new CSSProp(44, ["4px"]), new CSSProp(79, [0]), new CSSProp(45, [0]), new CSSProp(73, ["0.5"])])), 1)];

export const clkCycleRightStyle = ["style", keyValueList(append(clkCycleBut, ofArray([new CSSProp(78, [0]), new CSSProp(44, [0]), new CSSProp(79, ["4px"]), new CSSProp(45, ["4px"]), new CSSProp(68, ["0.5"])])), 1)];

/**
 * Style for Bulma level element in name row
 */
export function nameRowLevelStyle(isHovered) {
    return ["style", keyValueList(toList(delay(() => append_1(singleton_1(new CSSProp(189, [Constants_rowHeight])), delay(() => append_1(singleton_1(new CSSProp(42, ["1px solid rgb(219,219,219)"])), delay(() => (isHovered ? append_1(singleton_1(new CSSProp(21, ["hsl(0, 0%, 96%)"])), delay(() => singleton_1(new CSSProp(123, ["grab"])))) : empty_1()))))))), 1)];
}

/**
 * Style for name label
 */
export function nameLabelStyle(isHovered) {
    return ["style", keyValueList(toList(delay(() => (isHovered ? singleton_1(new CSSProp(123, ["grab"])) : empty_1()))), 1)];
}

export const valueLabelStyle = ["style", {
    height: Constants_rowHeight,
    borderBottom: "1px solid rgb(219,219,219)",
    paddingLeft: Constants_labelPadding,
    fontFamily: Constants_valueColumnFontFamily,
    fontSize: Constants_valueColumnFontSize,
}];

/**
 * Prop for Level.left in name row.
 */
export function nameRowLevelLeftProps(visibility) {
    return singleton(["style", {
        position: "sticky",
        left: 0,
        visibility: visibility,
    }]);
}

export function calcNamesColWidth(ws) {
    let arg;
    let cWidth;
    canvasWidthContext.font = join(" ", ["10px", Constants_columnFontFamily]);
    const getWidth = (txt) => {
        const sizeInPx = parse(replace(Constants_columnFontSize.toLocaleLowerCase(), "px", ""));
        return (sizeInPx * canvasWidthContext.measureText(txt).width) / 10;
    };
    cWidth = ~~((arg = max(map(getWidth, cons("Dummy", listCollectSomes((wi) => map_1((wave) => wave.ViewerDisplayName, tryFind(wi, ws.AllWaves)), ws.SelectedWaves))), {
        Compare: comparePrimitives,
    }), Math.ceil(arg)));
    return (cWidth + Constants_deleteSymbolWidth) | 0;
}

export const waveSimColumn = ofArray([new CSSProp(189, ["100%"]), new CSSProp(395, ["100%"]), new CSSProp(76, [Constants_borderProperties]), new CSSProp(125, ["grid"]), new CSSProp(172, [Constants_rowHeight]), new CSSProp(153, [Constants_valueColumnFontSize]), new CSSProp(149, [Constants_valueColumnFontFamily]), new CSSProp(271, ["auto"]), new CSSProp(392, ["nowrap"]), new CSSProp(213, ["25px"])]);

/**
 * Style properties for names column
 */
export function namesColumnStyle(ws) {
    return ["style", keyValueList(append(waveSimColumn, ofArray([new CSSProp(253, [calcNamesColWidth(ws)]), new CSSProp(144, ["left"]), new CSSProp(21, [Constants_cursorColor]), new CSSProp(70, [Constants_borderProperties]), new CSSProp(176, [1]), new CSSProp(271, ["clip"]), new CSSProp(325, ["right"])])), 1)];
}

/**
 * Props for names column
 */
export function namesColumnProps(ws) {
    return ofArray([new HTMLAttr(99, ["namesColumn"]), namesColumnStyle(ws)]);
}

export function valuesColumnSize(wsModel) {
    const selWaves = selectedWaves(wsModel);
    const maxValueBusWidth = max(cons(0, map((wave) => wave.Width, selWaves)), {
        Compare: comparePrimitives,
    }) | 0;
    const sampleVals = map((num) => {
        let patternInput;
        const matchValue = wsModel.Radix;
        switch (matchValue.tag) {
            case 1: {
                patternInput = [bigIntMask(num + 1), 2];
                break;
            }
            case 3: {
                patternInput = [bigIntMask(num - 1), 10];
                break;
            }
            default:
                patternInput = [fromZero(), 2];
        }
        const worstCaseVal = patternInput[0];
        const extra = patternInput[1];
        const fd = new FastData(new FastBits(1, [worstCaseVal]), num);
        let v;
        const s = fastDataToPaddedString(10000, wsModel.Radix, fd);
        v = s.slice(0, min(s.length - 1, Constants_valueColumnMaxChars) + 1);
        return [extra + getTextWidthInPixels(Constants_valueColumnText, v), v.length + 2];
    }, ofArray([maxValueBusWidth, min(maxValueBusWidth, Constants_maxBinaryDisplayWidth)]));
    let tupledArg_1;
    const tupledArg = unzip(sampleVals);
    const ws = tupledArg[0];
    const nums = tupledArg[1];
    tupledArg_1 = [max(ws, {
        Compare: comparePrimitives,
    }), max(nums, {
        Compare: comparePrimitives,
    })];
    const w = tupledArg_1[0];
    const num_1 = tupledArg_1[1] | 0;
    return [~~w + 20, num_1];
}

/**
 * Style properties for values column
 */
export function valuesColumnStyle(colWidth) {
    return ["style", keyValueList(append(waveSimColumn, ofArray([new CSSProp(253, [colWidth]), new CSSProp(144, ["left"]), new CSSProp(65, [Constants_borderProperties]), new CSSProp(271, ["auto"]), new CSSProp(21, [Constants_cursorColor]), new CSSProp(261, [1]), new CSSProp(176, [3])])), 1)];
}

export const waveformColumnStyle = ["style", {
    gridColumnStart: 2,
    display: "grid",
}];

/**
 * Style for rows in waveforms column
 */
export function waveRowsStyle(width) {
    return ["style", {
        height: "100%",
        overflowX: "hidden",
        display: "grid",
        fontSize: "12px",
        gridAutoRows: Constants_rowHeight,
        borderTop: Constants_borderProperties,
        width: width,
        gridColumnStart: 1,
        gridRowStart: 1,
    }];
}

export const viewWaveSimStyle = ["style", {
    marginLeft: Constants_leftMargin,
    marginRight: Constants_rightMargin,
    marginTop: "15px",
    height: "calc(100% - 72px)",
}];

export const showWaveformsAndRamStyle = ["style", {
    overflowY: "auto",
    height: "calc(100% - 250px)",
}];

export const showWaveformsStyle = ["style", {
    width: "100%",
    display: "grid",
    columnCount: 3,
    gridAutoFlow: "column",
    gridAutoColumns: "min-content",
}];

/**
 * Props for text in clock cycle row
 */
export function clkCycleText(m, i) {
    return ofArray([new SVGAttr(9, ["12px"]), new SVGAttr(37, ["middle"]), new SVGAttr(44, [singleWaveWidth(m) * (i + 0.5)]), new SVGAttr(57, [0.6 * Constants_viewBoxHeight])]);
}

export const clkCycleSVGStyle = ["style", {
    display: "block",
    borderBottom: Constants_borderProperties,
}];

/**
 * Props for waveform column rows
 */
export function waveformColumnRowProps(m) {
    return ofArray([new SVGAttr(14, [Constants_rowHeight]), new SVGAttr(41, [viewBoxWidth(m)]), new SVGAttr(40, [(((viewBoxMinX(m) + " 0 ") + viewBoxWidth(m)) + " ") + Constants_viewBoxHeight.toString()]), new SVGAttr(23, ["none"])]);
}

/**
 * Props for row of clock cycle numbers
 */
export function clkCycleNumberRowProps(m) {
    return append(waveformColumnRowProps(m), singleton(clkCycleSVGStyle));
}

export const waveRowSVGStyle = ["style", {
    display: "block",
    borderBottom: "1px solid rgb(219,219,219)",
}];

/**
 * Props for each row in waveform column
 */
export function waveRowProps(m) {
    return append(waveformColumnRowProps(m), singleton(waveRowSVGStyle));
}

export const clkLineStyle = ["style", {
    stroke: "rgb(200,200,200)",
    strokeWidth: Constants_clkLineWidth,
}];

/**
 * Grid lines separating clock cycles
 */
export function backgroundSVG(wsModel, count) {
    const clkLine = (x) => {
        const props = [clkLineStyle, new SVGAttr(42, [x]), new SVGAttr(55, [0]), new SVGAttr(43, [x]), new SVGAttr(56, [Constants_viewBoxHeight * (count + 1)])];
        return react.createElement("line", keyValueList(props, 1));
    };
    return map((x_1) => clkLine(x_1 * singleWaveWidth(wsModel)), toList(rangeDouble(wsModel.StartCycle + 1, 1, endCycle(wsModel) + 1)));
}

/**
 * Controls the background highlighting of which clock cycle is selected
 */
export function clkCycleHighlightSVG(m, dispatch) {
    let props;
    const count = length(m.SelectedWaves) | 0;
    const props_2 = [["style", {
        gridColumnStart: 1,
        gridRowStart: 1,
    }], new SVGAttr(14, [int32ToString((count + 1) * Constants_rowHeight) + "px"]), new SVGAttr(41, [viewBoxWidth(m)]), new SVGAttr(6, [Constants_cursorColor]), new SVGAttr(19, [0.4]), new SVGAttr(40, [(((viewBoxMinX(m) + " 0 ") + viewBoxWidth(m)) + " ") + (Constants_viewBoxHeight * (count + 1)).toString()]), new HTMLAttr(99, ["ClkCycleHighlight"]), new DOMAttr(40, [(ev) => {
        const svgEl = document.getElementById("ClkCycleHighlight");
        const bcr = svgEl.getBoundingClientRect();
        const cycleWidth = bcr.width / m.ShownCycles;
        const cycle = (~~((ev.clientX - bcr.left) / singleWaveWidth(m)) + m.StartCycle) | 0;
        dispatch(new Msg(11, [(m_1) => (new WaveSimModel(m_1.State, m_1.TopSheet, m_1.Sheets, m_1.AllWaves, m_1.SelectedWaves, m_1.StartCycle, m_1.ShownCycles, cycle, m_1.ClkCycleBoxIsEmpty, m_1.Radix, m_1.WaveformColumnWidth, m_1.WaveModalActive, m_1.RamModalActive, m_1.RamComps, m_1.SelectedRams, m_1.FastSim, m_1.SearchString, m_1.ShowSheetDetail, m_1.ShowComponentDetail, m_1.ShowGroupDetail, m_1.HoveredLabel, m_1.DraggedIndex, m_1.PrevSelectedWaves))]));
    }])];
    const children_2 = append(singleton((props = [new SVGAttr(41, [singleWaveWidth(m)]), new SVGAttr(14, ["100%"]), new SVGAttr(44, [m.CurrClkCycle * singleWaveWidth(m)])], react.createElement("rect", keyValueList(props, 1)))), backgroundSVG(m, count));
    return react.createElement("svg", keyValueList(props_2, 1), ...children_2);
}

export const radixTabProps = singleton(["style", {
    width: "35px",
    height: Constants_rowHeight,
}]);

export const radixTabAStyle = ["style", {
    padding: "0 0 0 0",
    height: Constants_rowHeight,
}];

export const radixTabsStyle = ["style", {
    height: Constants_rowHeight,
    fontSize: "80%",
    float: "right",
}];

/**
 * Style of polyline used to draw waveforms
 */
export function wavePolylineStyle(points) {
    return ofArray([new SVGAttr(30, ["blue"]), new SVGAttr(6, ["none"]), new SVGAttr(36, [Constants_lineThickness]), new SVGAttr(22, [pointsToString(points)])]);
}

/**
 * Props for HTML Summary element
 */
export function summaryProps(isSummary, cBox, ws, dispatch) {
    return toList(delay(() => {
        const clickHandler = (e) => {
            if (isSummary) {
                let show;
                switch (cBox.tag) {
                    case 1: {
                        const fc = cBox.fields[0];
                        show = contains(fc.fId, ws.ShowComponentDetail);
                        break;
                    }
                    case 3: {
                        const subGroup = cBox.fields[0];
                        show = contains(subGroup, ws.ShowSheetDetail);
                        break;
                    }
                    case 2: {
                        const subSheet = cBox.fields[1];
                        const compGrp = cBox.fields[0];
                        show = contains([compGrp, subSheet], ws.ShowGroupDetail);
                        break;
                    }
                    default:
                        show = false;
                }
                dispatch(new Msg(11, [(ws_1) => setSelectionOpen(ws_1, cBox, !show)]));
            }
        };
        const patternInput = (cBox.tag === 1) ? ["16px", "bold"] : ((cBox.tag === 2) ? ["18px", "bold"] : ((cBox.tag === 0) ? ["12px", "normal"] : ["20px", "bold"]));
        const weight = patternInput[1];
        const size = patternInput[0];
        return append_1(singleton_1(["style", {
            fontSize: size,
            fontWeight: weight,
        }]), delay(() => singleton_1(new DOMAttr(40, [(arg) => {
            clickHandler(arg);
        }]))));
    }));
}

/**
 * Props for HTML Details element
 */
export function detailsProps(showDetails, cBox, ws, dispatch) {
    let show;
    switch (cBox.tag) {
        case 1: {
            const fc = cBox.fields[0];
            show = contains(fc.fId, ws.ShowComponentDetail);
            break;
        }
        case 3: {
            const subGroup = cBox.fields[0];
            show = contains(subGroup, ws.ShowSheetDetail);
            break;
        }
        case 2: {
            const subSheet = cBox.fields[1];
            const compGrp = cBox.fields[0];
            show = contains([compGrp, subSheet], ws.ShowGroupDetail);
            break;
        }
        default:
            show = false;
    }
    return singleton(new HTMLAttr(125, [show ? true : showDetails]));
}

export const topHalfStyle = ["style", {
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    zIndex: 10000,
}];

//# sourceMappingURL=WaveSimStyle.fs.js.map
