import { parse } from "../fable_modules/fable-library.4.1.4/Double.js";
import { printf, toText, filter } from "../fable_modules/fable-library.4.1.4/String.js";
import { SVGAttr, CSSProp } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { ofArray } from "../fable_modules/fable-library.4.1.4/List.js";
import { int32ToString } from "../fable_modules/fable-library.4.1.4/Util.js";
import * as react from "react";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";

export const Constants_dividerBarWidth = 10;

export const headerHeight = "72px";

const headerHeightWithBorderOffset = "74px";

const rightSectionWidthS = "400px";

const rightSectionWidthL = "650px";

export const minViewerWidth = 400;

export function minEditorWidth() {
    return ~~(document.getElementById("WholeApp").offsetWidth * 0.25);
}

export const rightSectionWidthViewerDefault = 650;

export const getHeaderHeight = parse(filter((c) => {
    if (c.charCodeAt(0) <= 57) {
        return c.charCodeAt(0) >= 48;
    }
    else {
        return false;
    }
}, headerHeight));

export function rightSectionWidth(model) {
    const matchValue = model.RightPaneTabVisible;
    switch (matchValue.tag) {
        case 3:
            return rightSectionWidthL;
        case 2: {
            const matchValue_1 = model.SimSubTabVisible;
            switch (matchValue_1.tag) {
                case 2:
                case 1:
                    return toText(printf("%dpx"))(model.WaveSimViewerWidth);
                default:
                    return rightSectionWidthL;
            }
        }
        default:
            return rightSectionWidthS;
    }
}

export function leftSectionWidth(model) {
    let arg_1;
    return ["style", {
        width: (arg_1 = rightSectionWidth(model), toText(printf("calc(100%s - %s - 10px)"))("%")(arg_1)),
    }];
}

export function navbarStyle(model) {
    return ["style", {
        width: "100%",
        height: headerHeight,
    }];
}

/**
 * For making Sheet contained inside left section (don't want sheet behind right section tabs) NOT USED
 */
export function leftSectionStyle(model) {
    const leftSectionWidth_1 = leftSectionWidth(model);
    return ["style", {
        position: "fixed",
        left: "0px",
        top: "0px",
        height: "100%",
        width: leftSectionWidth_1,
        overflowX: "hidden",
        overflowY: "hidden",
        borderTop: "2px solid lightgray",
        userSelect: "none",
        zIndex: 31,
        backgroundColor: "white",
    }];
}

export function rightSectionStyle(model) {
    const widthRightSec = rightSectionWidth(model);
    return ["style", {
        position: "fixed",
        right: "0px",
        top: "0px",
        height: "100%",
        width: widthRightSec,
        overflowX: "visible",
        borderTop: "2px solid lightgray",
        userSelect: "none",
        zIndex: 31,
        backgroundColor: "white",
    }];
}

export function belowHeaderStyle(headerSize) {
    return ["style", {
        overflowY: "auto",
        height: `calc(100% - ${headerSize})`,
    }];
}

export function canvasVisibleStyle(model) {
    const widthRightSec = rightSectionWidth(model);
    return ["style", {
        display: "block",
        position: "absolute",
        overflowX: "scroll",
        overflowY: "scroll",
        top: headerHeight,
        left: "0px",
        bottom: "0px",
        right: widthRightSec,
        borderTop: "2px solid lightgray",
    }];
}

export function canvasVisibleStyleList(model) {
    let background;
    const matchValue = model.Sheet.Wire.Symbol.Theme;
    background = ((matchValue.tag === 1) ? (new CSSProp(21, ["rgba(255,255,0,0.1)"])) : ((matchValue.tag === 2) ? (new CSSProp(21, ["rgba(0,0,0,0.05)"])) : (new CSSProp(21, ["white"]))));
    const widthRightSec = rightSectionWidth(model);
    return ofArray([new CSSProp(125, ["block"]), new CSSProp(291, ["absolute"]), new CSSProp(271, ["scroll"]), new CSSProp(272, ["scroll"]), new CSSProp(365, [headerHeight]), new CSSProp(208, ["0px"]), new CSSProp(83, ["0px"]), new CSSProp(298, [widthRightSec]), new CSSProp(76, ["2px solid lightgray"]), background]);
}

export const canvasSmallMenuStyle = ["style", {
    display: "block",
    position: "absolute",
    overflowX: "hidden",
    overflowY: "hidden",
    left: "10px",
    bottom: "25px",
    right: toText(printf("calc(100%s - 300px)"))("%"),
    whiteSpace: "nowrap",
}];

export const canvasSmallButtonStyle = ["style", {
    marginRight: "5px",
    backgroundColor: "white",
    borderRadius: "4px",
    borderStyle: "solid",
    outline: "none",
    padding: "4px",
    opacity: 0.7,
}];

export const notificationStyle = ["style", {
    zIndex: 100,
    position: "absolute",
    userSelect: "none",
    right: "20px",
    bottom: "20px",
}];

export const simulationNumberStyle = ["style", {
    width: "320px",
    height: "30px",
}];

export const constraintNumberStyle = ["style", {
    width: "200px",
    height: "30px",
}];

export const simulationBitStyle = ["style", {
    width: "100px",
    height: "30px",
    paddingTop: "3px",
}];

export const menuLabelStyle = ["style", {
    outline: "none",
    marginTop: "10px",
    marginBottom: "10px",
    color: "#7a7a7a",
    fontSize: "0.80em",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
}];

export const sortArrowStyle = ["style", {
    margin: "0",
    display: "block",
    width: "100%",
    height: "50%",
    padding: "0 0 0 0",
    top: "0",
    fontSize: "50%",
    position: "relative",
    borderColor: "white",
}];

export const colMoveArrowStyle = ["style", {
    margin: "0",
    display: "block",
    width: "100%",
    height: "50%",
    padding: "0 0 0 0",
    top: "0",
    fontSize: "80%",
    position: "relative",
    borderColor: "white",
}];

export function ttGridColumnProps(index) {
    return ofArray([new CSSProp(33, ["1px solid gray"]), new CSSProp(273, ["7px"]), new CSSProp(153, ["18px"]), new CSSProp(325, ["left"]), new CSSProp(176, [int32ToString(index + 1)]), new CSSProp(174, [int32ToString(index + 2)]), new CSSProp(271, ["auto"]), new CSSProp(270, ["break-word"])]);
}

export function ttGridHiddenColumnProps(gridWidth) {
    return ofArray([new CSSProp(176, [int32ToString(gridWidth + 1)]), new CSSProp(174, [int32ToString(gridWidth + 2)]), new CSSProp(395, [0]), new CSSProp(271, ["hidden"]), new CSSProp(383, ["hidden"])]);
}

export function ttGridContainerStyle(model) {
    const widthRightSec = rightSectionWidth(model);
    return ["style", {
        display: "grid",
        gridAutoFlow: "column",
    }];
}

/**
 * display react of refresh button with color (e.g. white) at given height (e.g. 10px)
 */
export function refreshSvg(color, height) {
    let props;
    const children_2 = [(props = [new SVGAttr(3, ["M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32\n                32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69\n                159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81\n                6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5\n                479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69\n                14.31-32 32-32S496 30.31 496 48z"]), ["style", {
        fill: color,
        stroke: color,
        strokeWidth: "5px",
    }]], react.createElement("path", keyValueList(props, 1)))];
    return react.createElement("svg", {
        viewBox: "0 0 512 512",
        height: height,
    }, ...children_2);
}

export const emptyRefreshSVG = react.createElement("svg", {
    height: "20",
    width: "20",
});

//# sourceMappingURL=Style.fs.js.map
