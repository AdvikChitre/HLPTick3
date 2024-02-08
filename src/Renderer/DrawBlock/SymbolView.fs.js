import { defaultCircle, makePath, Path, defaultPath, makeAnyPath, defaultPolygon, cornerCircle, Polygon, makePolygon, Line, makeLine, makeCircle, portCircleTarget, Circle, portCircle, makeText, Text$, defaultText } from "../Common/DrawHelpers.fs.js";
import { max, fold2, last, reverse, map as map_2, cons, exists, fold as fold_1, toArray, append, map2, collect, empty, length, item, ofArray, singleton } from "../fable_modules/fable-library.4.1.4/List.js";
import { head, fold, map as map_1, equalsWith } from "../fable_modules/fable-library.4.1.4/Array.js";
import { comparePrimitives, compare, equals, defaultOf } from "../fable_modules/fable-library.4.1.4/Util.js";
import { getComponentLegend, Constants_otherLegendFontSizeInPixels, Constants_customLegendFontSizeInPixels, Constants_legendVertOffset, Constants_testShowLabelBoundingBoxes, Constants_labelCorrection, Constants_componentLabelOffsetDistance, Constants_thinComponentLabelOffsetDistance, busTitleAndBits, Constants_busSelectTextSize, Constants_mergeSplitTextSize, getPortPos, Constants_componentPortStyle, Constants_componentLabelStyle, Constants_legendLineSpacingInPixels } from "./Symbol.fs.js";
import { join, toText, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { $007CIsBinaryGate$007CNotBinaryGate$007C, Edge, PortType, Rotation, XYPos } from "../Common/CommonTypes.fs.js";
import { empty as empty_1, filter, toList as toList_1, tryFind, FSharpMap__get_Item } from "../fable_modules/fable-library.4.1.4/Map.js";
import { toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { SymbolT_Model, SymbolT_ThemeType, SymbolT_ThemeType_$reflection, SymbolT_Msg_$reflection, SymbolT_Symbol_$reflection, SymbolT_ShowPorts } from "../Model/DrawModelType.fs.js";
import { getCustomSymCorners } from "./SymbolHelpers.fs.js";
import { map as map_3, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { hex } from "../Simulator/NumberHelpers.fs.js";
import { portNames } from "../Simulator/CanvasStateAnalyser.fs.js";
import { Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { record_type, string_type, lambda_type, unit_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { FunctionComponent_Of_60E46241 } from "../fable_modules/Fable.React.8.0.1/Fable.React.FunctionComponent.fs.js";
import * as react from "react";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { Helpers_equalsButFunctions } from "../fable_modules/Fable.React.8.0.1/Fable.React.Helpers.fs.js";
import { getTimeMs } from "../Common/TimeHelpers.fs.js";
import { empty as empty_2 } from "../fable_modules/fable-library.4.1.4/Set.js";
import { Cmd_none } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";

/**
 * Text adding function with many parameters (such as bold, position and text)
 */
export function addText(pos, name, alignment, weight, size) {
    const text = new Text$(alignment, size, weight, defaultText.FontFamily, defaultText.Fill, defaultText.UserSelect, defaultText.DominantBaseline);
    return singleton(makeText(pos.X, pos.Y, name, text));
}

/**
 * Text adding function using text record
 */
export function addStyledText(pos, text, name) {
    return makeText(pos.X, pos.Y, name, text);
}

/**
 * Add one or two lines of text, two lines are marked by a . delimiter
 */
export function addLegendText(pos, name, alignment, weight, size) {
    const textStyle = new Text$(alignment, size, weight, defaultText.FontFamily, defaultText.Fill, defaultText.UserSelect, defaultText.DominantBaseline);
    const bottomTextStyle = textStyle;
    const matchValue = name.split(".");
    if (!equalsWith((x, y) => (x === y), matchValue, defaultOf()) && (matchValue.length === 1)) {
        const oneLine = matchValue[0];
        return singleton(makeText(pos.X, pos.Y, name, textStyle));
    }
    else if (!equalsWith((x_1, y_1) => (x_1 === y_1), matchValue, defaultOf()) && (matchValue.length === 2)) {
        const topLine = matchValue[0];
        const bottomLine = matchValue[1];
        return ofArray([makeText(pos.X, pos.Y, topLine, textStyle), makeText(pos.X, pos.Y + Constants_legendLineSpacingInPixels, bottomLine, bottomTextStyle)]);
    }
    else {
        return toFail(printf("addLegendText does not work with more than two lines demarcated by ."));
    }
}

function portText(pos, name, edge) {
    let pos$0027;
    switch (edge.tag) {
        case 0: {
            const left_1 = pos;
            const right_1 = new XYPos(0, 5);
            pos$0027 = (new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y));
            break;
        }
        case 3: {
            const left_2 = pos;
            const right_2 = new XYPos(-5, -6);
            pos$0027 = (new XYPos(left_2.X + right_2.X, left_2.Y + right_2.Y));
            break;
        }
        case 1: {
            const left_3 = pos;
            const right_3 = new XYPos(0, -15);
            pos$0027 = (new XYPos(left_3.X + right_3.X, left_3.Y + right_3.Y));
            break;
        }
        default: {
            const left = pos;
            const right = new XYPos(5, -6);
            pos$0027 = (new XYPos(left.X + right.X, left.Y + right.Y));
        }
    }
    const align = (edge.tag === 3) ? "end" : ((edge.tag === 2) ? "start" : "middle");
    return addText(pos$0027, name, align, Constants_componentLabelStyle.FontWeight, Constants_componentPortStyle.FontSize);
}

/**
 * Print the name of each port
 */
export function drawPortsText(portList, listOfNames, symb) {
    const getPortName = (name, x) => {
        let sym, port, matchValue, movingPort, movingPort_1, left, right;
        return portText((sym = symb, (port = item(x, portList), (matchValue = sym.MovingPort, (matchValue != null) ? (((movingPort = matchValue, port.Id === movingPort.PortId)) ? ((movingPort_1 = matchValue, (left = movingPort_1.CurrPos, (right = sym.Pos, new XYPos(left.X - right.X, left.Y - right.Y))))) : getPortPos(sym, port)) : getPortPos(sym, port)))), name, FSharpMap__get_Item(symb.PortMaps.Orientation, item(x, portList).Id));
    };
    if (length(listOfNames) < 1) {
        return empty();
    }
    else {
        return collect((x_1) => x_1, map2(getPortName, listOfNames, toList(rangeDouble(0, 1, length(portList) - 1))));
    }
}

/**
 * Function to draw ports using getPortPos. The ports are equidistant
 */
export function drawPorts(portType, portList, showPorts, symb) {
    if (!(length(portList) < 1)) {
        let matchResult, p;
        switch (showPorts.tag) {
            case 2:
            case 3: {
                matchResult = 0;
                break;
            }
            case 0: {
                if (portType.tag === 0) {
                    matchResult = 0;
                }
                else {
                    matchResult = 2;
                }
                break;
            }
            case 1: {
                if (portType.tag === 1) {
                    matchResult = 0;
                }
                else {
                    matchResult = 2;
                }
                break;
            }
            case 5: {
                matchResult = 1;
                p = showPorts.fields[0];
                break;
            }
            case 6: {
                matchResult = 1;
                p = showPorts.fields[0];
                break;
            }
            default:
                matchResult = 2;
        }
        switch (matchResult) {
            case 0:
                return collect((x) => {
                    let movingPort;
                    let pos;
                    const sym = symb;
                    const port = item(x, portList);
                    const matchValue_1 = sym.MovingPort;
                    let matchResult_1, movingPort_1;
                    if (matchValue_1 != null) {
                        if ((movingPort = matchValue_1, port.Id === movingPort.PortId)) {
                            matchResult_1 = 0;
                            movingPort_1 = matchValue_1;
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
                            const left = movingPort_1.CurrPos;
                            const right = sym.Pos;
                            pos = (new XYPos(left.X - right.X, left.Y - right.Y));
                            break;
                        }
                        default:
                            pos = getPortPos(sym, port);
                    }
                    const show = showPorts;
                    const circle = (show.tag === 3) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "SkyBlue")) : ((show.tag === 5) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "SkyBlue")) : ((show.tag === 6) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "Red")) : ((show.tag === 7) ? portCircleTarget : portCircle)));
                    return singleton(makeCircle(pos.X, pos.Y, circle));
                }, toList(rangeDouble(0, 1, length(portList) - 1)));
            case 1:
                return collect((x_1) => {
                    let movingPort_2, movingPort_3;
                    if (equals(item(x_1, portList), p)) {
                        let pos_1;
                        const sym_1 = symb;
                        const port_1 = item(x_1, portList);
                        const matchValue_2 = sym_1.MovingPort;
                        let matchResult_2, movingPort_1_1;
                        if (matchValue_2 != null) {
                            if ((movingPort_2 = matchValue_2, port_1.Id === movingPort_2.PortId)) {
                                matchResult_2 = 0;
                                movingPort_1_1 = matchValue_2;
                            }
                            else {
                                matchResult_2 = 1;
                            }
                        }
                        else {
                            matchResult_2 = 1;
                        }
                        switch (matchResult_2) {
                            case 0: {
                                const left_1 = movingPort_1_1.CurrPos;
                                const right_1 = sym_1.Pos;
                                pos_1 = (new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y));
                                break;
                            }
                            default:
                                pos_1 = getPortPos(sym_1, port_1);
                        }
                        const show_1 = showPorts;
                        const circle_1 = (show_1.tag === 3) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "SkyBlue")) : ((show_1.tag === 5) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "SkyBlue")) : ((show_1.tag === 6) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "Red")) : ((show_1.tag === 7) ? portCircleTarget : portCircle)));
                        return singleton(makeCircle(pos_1.X, pos_1.Y, circle_1));
                    }
                    else {
                        let pos_2;
                        const sym_2 = symb;
                        const port_2 = item(x_1, portList);
                        const matchValue_3 = sym_2.MovingPort;
                        let matchResult_3, movingPort_1_2;
                        if (matchValue_3 != null) {
                            if ((movingPort_3 = matchValue_3, port_2.Id === movingPort_3.PortId)) {
                                matchResult_3 = 0;
                                movingPort_1_2 = matchValue_3;
                            }
                            else {
                                matchResult_3 = 1;
                            }
                        }
                        else {
                            matchResult_3 = 1;
                        }
                        switch (matchResult_3) {
                            case 0: {
                                const left_2 = movingPort_1_2.CurrPos;
                                const right_2 = sym_2.Pos;
                                pos_2 = (new XYPos(left_2.X - right_2.X, left_2.Y - right_2.Y));
                                break;
                            }
                            default:
                                pos_2 = getPortPos(sym_2, port_2);
                        }
                        const show_2 = new SymbolT_ShowPorts(3, []);
                        const circle_2 = (show_2.tag === 3) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "SkyBlue")) : ((show_2.tag === 5) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "SkyBlue")) : ((show_2.tag === 6) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "Red")) : ((show_2.tag === 7) ? portCircleTarget : portCircle)));
                        return singleton(makeCircle(pos_2.X, pos_2.Y, circle_2));
                    }
                }, toList(rangeDouble(0, 1, length(portList) - 1)));
            default:
                return empty();
        }
    }
    else {
        return empty();
    }
}

/**
 * Function to draw the Target of a Moving Port (if there is one)
 */
export function drawMovingPortTarget(pos, symbol, outlinePoints) {
    if (pos != null) {
        const targetPos = pos[0];
        const mousePos = pos[1];
        let list_3;
        let list_1;
        const pos_1 = targetPos;
        const show = new SymbolT_ShowPorts(7, []);
        const circle = (show.tag === 3) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "SkyBlue")) : ((show.tag === 5) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "SkyBlue")) : ((show.tag === 6) ? (new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "Red")) : ((show.tag === 7) ? portCircleTarget : portCircle)));
        list_1 = singleton(makeCircle(pos_1.X, pos_1.Y, circle));
        list_3 = append(singleton(makeLine(targetPos.X, targetPos.Y, mousePos.X - symbol.Pos.X, mousePos.Y - symbol.Pos.Y, new Line("DodgerBlue", "2.0px", "4,4"))), list_1);
        return append(singleton(makePolygon(outlinePoints, new Polygon("DodgerBlue", "2px", 0, "No"))), list_3);
    }
    else {
        return empty();
    }
}

/**
 * HLP23 AUTHOR: BRYAN TAN
 * Draw circles on the corners of custom components when manually resizing them
 */
export function drawCorners(showCorners, symb) {
    if (showCorners.tag === 0) {
        return ofArray(map_1((p) => makeCircle(p.X, p.Y, cornerCircle), getCustomSymCorners(symb)));
    }
    else {
        return empty();
    }
}

export function createPolygon(points, colour, opacity) {
    return singleton(makePolygon(points, new Polygon(defaultPolygon.Stroke, defaultPolygon.StrokeWidth, opacity, colour)));
}

export function createAnyPath(startingPoint, pathAttr, colour, strokeWidth, outlineColour) {
    return singleton(makeAnyPath(startingPoint, pathAttr, new Path(outlineColour, strokeWidth, defaultPath.StrokeDashArray, defaultPath.StrokeLinecap, colour)));
}

export function createPath(startingPoint, startingControlPoint, endingControlPoint, endingPoint) {
    return singleton(makePath(startingPoint, startingControlPoint, endingControlPoint, endingPoint, new Path("black", "5px", defaultPath.StrokeDashArray, defaultPath.StrokeLinecap, defaultPath.Fill)));
}

export function createBiColorPolygon(points, colour, strokeColor, opacity, strokeWidth, comp) {
    if (strokeColor !== "black") {
        return singleton(makePolygon(points, new Polygon(strokeColor, strokeWidth, opacity, colour)));
    }
    else {
        return singleton(makePolygon(points, new Polygon(defaultPolygon.Stroke, strokeWidth, opacity, colour)));
    }
}

export function addClock(pos, colour, opacity) {
    let left, right;
    const points = toText(`${pos.X},${pos.Y - 1},${pos.X + 8},${pos.Y - 7},${pos.X},${pos.Y - 13}`);
    const list_1 = createPolygon(points, colour, opacity);
    return append(addText((left = pos, (right = (new XYPos(10, -13)), new XYPos(left.X + right.X, left.Y + right.Y))), " clk", "start", "normal", "12px"), list_1);
}

export function addHorizontalLine(posX1, posX2, posY, opacity) {
    const points = toText(`${posX1},${posY},${posX2},${posY}`);
    return createPolygon(points, "lightgray", opacity);
}

export function outlineColor(color) {
    const matchValue = color.toLocaleLowerCase();
    switch (matchValue) {
        case "lightgray":
        case "lightblue":
        case "#E8D0A9":
        case "rgba(255,255,0,0.15)":
            return "black";
        default: {
            const c = matchValue;
            return c;
        }
    }
}

export function addHorizontalColorLine(posX1, posX2, posY, opacity, color) {
    const points = toText(`${posX1},${posY} ${posX2},${posY}`);
    const outlineColor_1 = outlineColor(color);
    return singleton(makePolygon(points, new Polygon(outlineColor_1, "2.0", opacity, "olcolor")));
}

/**
 * Takes points, height and width of original shape and returns the points for it given a rotation / flipped status.
 * Degree0 rotation has TopLeft = top left coordinate of the outline, which is a box of dimensions W X H.
 * Rotation rotates the box about its centre point, keeping TopLeft fixed.
 */
export function rotatePoints(points, centre, transform) {
    let offset;
    const matchValue = transform.Rotation;
    switch (matchValue.tag) {
        case 1:
        case 3: {
            offset = (new XYPos(centre.Y, centre.X));
            break;
        }
        default:
            offset = centre;
    }
    const relativeToCentre = (array) => map_1((x) => {
        const left = x;
        const right = centre;
        return new XYPos(left.X - right.X, left.Y - right.Y);
    }, array);
    const rotateAboutCentre = (pointsIn) => {
        const matchValue_1 = transform.Rotation;
        switch (matchValue_1.tag) {
            case 3:
                return map_1((pos) => (new XYPos(-pos.Y, pos.X)), pointsIn);
            case 2:
                return map_1((pos_1) => (new XYPos(-pos_1.X, -pos_1.Y)), pointsIn);
            case 1:
                return map_1((pos_2) => (new XYPos(pos_2.Y, -pos_2.X)), pointsIn);
            default:
                return pointsIn;
        }
    };
    const relativeToTopLeft = (array_1) => map_1((x_1) => {
        const left_1 = x_1;
        const right_1 = offset;
        return new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y);
    }, array_1);
    const flipIfNecessary = (pts) => {
        if (!transform.flipped) {
            return pts;
        }
        else {
            return map_1((point) => (new XYPos(-point.X, point.Y)), pts);
        }
    };
    return relativeToTopLeft(flipIfNecessary(rotateAboutCentre(relativeToCentre(points))));
}

/**
 * Draw symbol (and its label) using theme for colors, returning a list of React components
 * implementing all of the text and shapes needed.
 */
export function drawComponent(symbol, theme) {
    let gType, gateType, x_1, width_2, list_14, list_12, list_10, list_8, list_4, tupledArg_1;
    const appear = symbol.Appearance;
    const colour = appear.Colour;
    const showPorts = appear.ShowPorts;
    const showCorners = appear.ShowCorners;
    const opacity = appear.Opacity;
    const comp = symbol.Component;
    let patternInput_1;
    const sym = symbol;
    const comp_1 = sym.Component;
    const matchValue = defaultArg(sym.HScale, 1);
    const vS = defaultArg(sym.VScale, 1);
    const hS = matchValue;
    const matchValue_2 = sym.STransform.Rotation;
    switch (matchValue_2.tag) {
        case 1:
        case 3: {
            patternInput_1 = [comp_1.W * hS, comp_1.H * vS];
            break;
        }
        default:
            patternInput_1 = [comp_1.H * vS, comp_1.W * hS];
    }
    const w = patternInput_1[1];
    const h = patternInput_1[0];
    const H = comp.H * defaultArg(symbol.VScale, 1);
    const W = comp.W * defaultArg(symbol.HScale, 1);
    const transform_1 = symbol.STransform;
    const mergeSplitLine = (pos, msb, lsb) => {
        let text;
        const matchValue_3 = equals(msb, lsb);
        const matchValue_4 = compare(msb, lsb) >= 0;
        text = (matchValue_4 ? (matchValue_3 ? toText(`(${msb})`) : toText(`(${msb}:${lsb})`)) : "");
        return addText(pos, text, "middle", "bold", Constants_mergeSplitTextSize);
    };
    const mergeSplitNLine = (compType, portType, pos_1, msb_1, lsb_1) => {
        let text_1;
        const matchValue_6 = equals(msb_1, lsb_1);
        const matchValue_7 = compare(msb_1, lsb_1) >= 0;
        text_1 = (matchValue_7 ? (matchValue_6 ? toText(`(${msb_1})`) : toText(`(${msb_1}:${lsb_1})`)) : "");
        const testCanvas = document.createElement("canvas");
        const canvasWidthContext = testCanvas.getContext('2d');
        const fontString = (font) => join(" ", [font.FontWeight, font.FontSize, font.FontFamily]);
        const textMeasureWidth = (font_1, txt) => {
            const fontStr = fontString(font_1);
            canvasWidthContext.font = fontStr;
            return canvasWidthContext.measureText(txt).width;
        };
        const textStyle = new Text$("middle", Constants_mergeSplitTextSize, "bold", defaultText.FontFamily, defaultText.Fill, defaultText.UserSelect, defaultText.DominantBaseline);
        let posNew;
        switch (compType.tag) {
            case 29: {
                if (portType.tag === 1) {
                    const left_1 = pos_1;
                    const right_1 = new XYPos(textMeasureWidth(textStyle, text_1) / 2, 4);
                    posNew = (new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y));
                }
                else {
                    const left = pos_1;
                    const right = new XYPos(textMeasureWidth(textStyle, text_1) / 2, -4);
                    posNew = (new XYPos(left.X - right.X, left.Y - right.Y));
                }
                break;
            }
            case 30: {
                if (portType.tag === 1) {
                    const left_3 = pos_1;
                    const right_3 = new XYPos(textMeasureWidth(textStyle, text_1) / 2, 5);
                    posNew = (new XYPos(left_3.X - right_3.X, left_3.Y - right_3.Y));
                }
                else {
                    const left_2 = pos_1;
                    const right_2 = new XYPos(textMeasureWidth(textStyle, text_1) / 2, -4);
                    posNew = (new XYPos(left_2.X - right_2.X, left_2.Y - right_2.Y));
                }
                break;
            }
            default:
                posNew = pos_1;
        }
        return addText(posNew, text_1, "middle", "bold", Constants_mergeSplitTextSize);
    };
    const busSelectLine = (msb_2, lsb_2) => {
        const text_2 = equals(msb_2, lsb_2) ? toText(`(${lsb_2})`) : toText(`(${msb_2}:${lsb_2})`);
        let patternInput_2;
        let rotate$0027;
        if (!transform_1.flipped) {
            rotate$0027 = transform_1.Rotation;
        }
        else {
            const matchValue_10 = transform_1.Rotation;
            switch (matchValue_10.tag) {
                case 1: {
                    rotate$0027 = (new Rotation(3, []));
                    break;
                }
                case 3: {
                    rotate$0027 = (new Rotation(1, []));
                    break;
                }
                default: {
                    const r = matchValue_10;
                    rotate$0027 = r;
                }
            }
        }
        patternInput_2 = ((rotate$0027.tag === 2) ? [new XYPos(w / 2, -8), "middle"] : ((rotate$0027.tag === 3) ? [new XYPos(4, (h / 2) - 7), "end"] : ((rotate$0027.tag === 1) ? [new XYPos(5 + (w / 2), h / 2), "start"] : [new XYPos(w / 2, (h / 2) + 7), "middle"])));
        const pos_2 = patternInput_2[0];
        const align = patternInput_2[1];
        return addText(pos_2, text_2, align, "bold", Constants_busSelectTextSize);
    };
    let clockTxtPos;
    const matchValue_11 = transform_1.Rotation;
    const matchValue_12 = transform_1.flipped;
    clockTxtPos = ((matchValue_11.tag === 2) ? (matchValue_12 ? (new XYPos(17, 2)) : (new XYPos(W - 19, 2))) : ((matchValue_11.tag === 1) ? (matchValue_12 ? (new XYPos(8, h - 20)) : (new XYPos(w - 8, h - 20))) : ((matchValue_11.tag === 3) ? (matchValue_12 ? (new XYPos(w - 10, 11)) : (new XYPos(10, 11))) : (matchValue_12 ? (new XYPos(W - 17, H - 13)) : (new XYPos(17, H - 13))))));
    let points;
    const toString = (array) => fold((x, pos_3) => (x + toText(` ${pos_3.X},${pos_3.Y}`)), "", array);
    let originalPoints;
    const matchValue_14 = comp.Type;
    let matchResult, gType_1, x_2;
    switch (matchValue_14.tag) {
        case 48:
        case 0:
        case 1: {
            matchResult = 0;
            break;
        }
        case 7: {
            matchResult = 1;
            break;
        }
        case 3: {
            matchResult = 2;
            break;
        }
        case 2: {
            matchResult = 3;
            break;
        }
        case 4: {
            matchResult = 4;
            break;
        }
        case 27: {
            matchResult = 5;
            break;
        }
        case 28: {
            matchResult = 6;
            break;
        }
        case 14:
        case 15:
        case 16: {
            matchResult = 7;
            break;
        }
        case 11:
        case 12:
        case 13: {
            matchResult = 8;
            break;
        }
        case 6: {
            matchResult = 9;
            break;
        }
        case 47:
        case 5: {
            matchResult = 10;
            break;
        }
        case 8: {
            matchResult = 11;
            break;
        }
        case 31:
        case 32:
        case 33:
        case 34:
        case 40:
        case 41:
        case 42:
        case 35:
        case 37:
        case 36:
        case 38: {
            matchResult = 13;
            break;
        }
        case 25: {
            matchResult = 15;
            break;
        }
        case 10: {
            if ((gType = matchValue_14.fields[0], (gateType = gType, (gateType === "nor") ? true : ((gateType === "xnor") ? true : ((gateType === "and") ? false : ((gateType === "or") ? false : (!(gateType === "xor")))))))) {
                matchResult = 12;
                gType_1 = matchValue_14.fields[0];
            }
            else {
                matchResult = 16;
            }
            break;
        }
        case 26: {
            if ((x_1 = matchValue_14.fields[0], symbol.IsClocked === true)) {
                matchResult = 14;
                x_2 = matchValue_14.fields[0];
            }
            else {
                matchResult = 16;
            }
            break;
        }
        default:
            matchResult = 16;
    }
    switch (matchResult) {
        case 0: {
            originalPoints = [new XYPos(0, 0), new XYPos(0, H), new XYPos((W * 4) / 5, H), new XYPos(W, H / 2), new XYPos(W * 0.8, 0)];
            break;
        }
        case 1: {
            originalPoints = [new XYPos(W, H / 2), new XYPos(W / 2, H / 2), new XYPos(0, H), new XYPos(0, 0), new XYPos(W / 2, H / 2)];
            break;
        }
        case 2: {
            originalPoints = [new XYPos(0, H / 2), new XYPos(W, H / 2)];
            break;
        }
        case 3: {
            originalPoints = [new XYPos(W / 5, 0), new XYPos(0, H / 2), new XYPos(W / 5, H), new XYPos(W, H), new XYPos(W, 0)];
            break;
        }
        case 4: {
            originalPoints = [new XYPos(0, H / 2), new XYPos(W / 3, H / 2), new XYPos(W / 3, H - (H / 4)), new XYPos(W / 3, H / 4), new XYPos(W / 3, H / 2)];
            break;
        }
        case 5: {
            originalPoints = [new XYPos(0, H / 6), new XYPos(W / 2, H / 6), new XYPos(W / 2, H / 2), new XYPos(W, H / 2), new XYPos(W / 2, H / 2), new XYPos(W / 2, (5 * H) / 6), new XYPos(0, (5 * H) / 6), new XYPos(W / 2, (5 * H) / 6), new XYPos(W / 2, H / 6)];
            break;
        }
        case 6: {
            originalPoints = [new XYPos(W, H / 6), new XYPos(W / 2, H / 6), new XYPos(W / 2, H / 2), new XYPos(0, H / 2), new XYPos(W / 2, H / 2), new XYPos(W / 2, (5 * H) / 6), new XYPos(W, (5 * H) / 6), new XYPos(W / 2, (5 * H) / 6), new XYPos(W / 2, H / 6)];
            break;
        }
        case 7: {
            originalPoints = [new XYPos(0, 0.3 * W), new XYPos(0, H - (0.3 * W)), new XYPos(W, H), new XYPos(W, 0)];
            break;
        }
        case 8: {
            originalPoints = [new XYPos(0, 0), new XYPos(0, H), new XYPos(W, H - (0.3 * W)), new XYPos(W, 0.3 * W)];
            break;
        }
        case 9: {
            originalPoints = [new XYPos(0, H / 2), new XYPos(W, H / 2)];
            break;
        }
        case 10: {
            originalPoints = [new XYPos(0, 0), new XYPos(0, H), new XYPos(W * 0.6, H), new XYPos(W * 0.8, H * 0.7), new XYPos(W, H * 0.7), new XYPos(W, H * 0.3), new XYPos(W * 0.8, H * 0.3), new XYPos(W * 0.6, 0)];
            break;
        }
        case 11: {
            originalPoints = [new XYPos(0, 0), new XYPos(0, H), new XYPos(W, H), new XYPos(W, H / 2), new XYPos(W + 9, H / 2), new XYPos(W, (H / 2) - 8), new XYPos(W, H / 2), new XYPos(W, 0)];
            break;
        }
        case 12: {
            originalPoints = [new XYPos(0, 0), new XYPos(0, H), new XYPos(W, H), new XYPos(W, H / 2), new XYPos(W + 9, H / 2), new XYPos(W, (H / 2) - 8), new XYPos(W, H / 2), new XYPos(W, 0)];
            break;
        }
        case 13: {
            originalPoints = [new XYPos(0, H - 13), new XYPos(8, H - 7), new XYPos(0, H - 1), new XYPos(0, 0), new XYPos(W, 0), new XYPos(W, H), new XYPos(0, H)];
            break;
        }
        case 14: {
            originalPoints = [new XYPos(0, H - 13), new XYPos(8, H - 7), new XYPos(0, H - 1), new XYPos(0, 0), new XYPos(W, 0), new XYPos(W, H), new XYPos(0, H)];
            break;
        }
        case 15: {
            originalPoints = [new XYPos(0, H / 2), new XYPos(W * 0.4, H / 2), new XYPos(W * 0.4, H), new XYPos(W * 0.4, 0), new XYPos(W * 0.4, H / 2), new XYPos(W, H / 2)];
            break;
        }
        default:
            originalPoints = [new XYPos(0, 0), new XYPos(0, H), new XYPos(W, H), new XYPos(W, 0)];
    }
    points = toString(rotatePoints(originalPoints, new XYPos(W / 2, H / 2), transform_1));
    let additions;
    let mergeWiresTextPos;
    const textPoints = rotatePoints([new XYPos(W / 5, (H / 6) + 2), new XYPos(W / 5, ((H * 5) / 6) + 2), new XYPos(W * 0.75, (H / 2) + 2)], new XYPos(W / 2, H / 2), transform_1);
    const matchValue_15 = transform_1.Rotation;
    switch (matchValue_15.tag) {
        case 1:
        case 3: {
            mergeWiresTextPos = map_1((pos_4) => {
                const left_4 = pos_4;
                const right_4 = new XYPos(12, 0);
                return new XYPos(left_4.X + right_4.X, left_4.Y + right_4.Y);
            }, textPoints);
            break;
        }
        case 2: {
            mergeWiresTextPos = map_1((pos_5) => {
                const left_5 = pos_5;
                const right_5 = new XYPos(0, 5);
                return new XYPos(left_5.X + right_5.X, left_5.Y + right_5.Y);
            }, textPoints);
            break;
        }
        default:
            mergeWiresTextPos = textPoints;
    }
    let splitWiresTextPos;
    const textPoints_1 = rotatePoints([new XYPos(W * 0.75, (H / 6) + 2), new XYPos(W * 0.75, ((H * 5) / 6) + 2), new XYPos(W / 4, (H / 2) + 2)], new XYPos(W / 2, H / 2), transform_1);
    const matchValue_16 = transform_1.Rotation;
    switch (matchValue_16.tag) {
        case 1:
        case 3: {
            splitWiresTextPos = map_1((pos_6) => {
                const left_6 = pos_6;
                const right_6 = new XYPos(12, 0);
                return new XYPos(left_6.X + right_6.X, left_6.Y + right_6.Y);
            }, textPoints_1);
            break;
        }
        case 2: {
            splitWiresTextPos = map_1((pos_7) => {
                const left_7 = pos_7;
                const right_7 = new XYPos(0, 5);
                return new XYPos(left_7.X + right_7.X, left_7.Y + right_7.Y);
            }, textPoints_1);
            break;
        }
        default:
            splitWiresTextPos = textPoints_1;
    }
    let NbitSpreaderTextPos;
    const textPoints_2 = rotatePoints([new XYPos(W / 4, (H / 2) + 2), new XYPos(W * 0.7, (H / 2) + 4)], new XYPos(W / 2, H / 2), transform_1);
    const matchValue_17 = transform_1.Rotation;
    NbitSpreaderTextPos = ((matchValue_17.tag === 1) ? map_1((pos_8) => {
        const left_8 = pos_8;
        const right_8 = new XYPos(13, -5);
        return new XYPos(left_8.X + right_8.X, left_8.Y + right_8.Y);
    }, textPoints_2) : ((matchValue_17.tag === 2) ? map_1((pos_9) => {
        const left_9 = pos_9;
        const right_9 = new XYPos(0, 8);
        return new XYPos(left_9.X + right_9.X, left_9.Y + right_9.Y);
    }, textPoints_2) : ((matchValue_17.tag === 3) ? map_1((pos_10) => {
        const left_10 = pos_10;
        const right_10 = new XYPos(18, -5);
        return new XYPos(left_10.X + right_10.X, left_10.Y + right_10.Y);
    }, textPoints_2) : textPoints_2)));
    const rotate1 = (pos_11) => {
        const matchValue_18 = rotatePoints([pos_11], new XYPos(W / 2, H / 2), transform_1);
        if (!equalsWith(equals, matchValue_18, defaultOf()) && (matchValue_18.length === 1)) {
            const pos$0027 = matchValue_18[0];
            return pos$0027;
        }
        else {
            return toFail(printf("What? Can\'t happen"));
        }
    };
    const inputTextPoints = map_1((port) => getPortPos(symbol, port), toArray(comp.InputPorts));
    const outputTextPoints = map_1((port_1) => getPortPos(symbol, port_1), toArray(comp.OutputPorts));
    const matchValue_19 = comp.Type;
    let matchResult_1, x_6;
    switch (matchValue_19.tag) {
        case 27: {
            matchResult_1 = 0;
            break;
        }
        case 29: {
            matchResult_1 = 1;
            break;
        }
        case 25: {
            matchResult_1 = 2;
            break;
        }
        case 28: {
            matchResult_1 = 3;
            break;
        }
        case 30: {
            matchResult_1 = 4;
            break;
        }
        case 31:
        case 32:
        case 33:
        case 34:
        case 40:
        case 41:
        case 42:
        case 35:
        case 37:
        case 36:
        case 38: {
            matchResult_1 = 5;
            break;
        }
        case 6: {
            matchResult_1 = 6;
            break;
        }
        case 7: {
            matchResult_1 = 7;
            break;
        }
        case 47: {
            matchResult_1 = 8;
            break;
        }
        case 5: {
            matchResult_1 = 9;
            break;
        }
        case 2: {
            matchResult_1 = 11;
            break;
        }
        case 48: {
            matchResult_1 = 10;
            x_6 = matchValue_19.fields[0];
            break;
        }
        case 0: {
            matchResult_1 = 10;
            x_6 = matchValue_19.fields[0];
            break;
        }
        case 1: {
            matchResult_1 = 10;
            x_6 = matchValue_19.fields[0];
            break;
        }
        default:
            if (symbol.IsClocked) {
                matchResult_1 = 12;
            }
            else {
                matchResult_1 = 13;
            }
    }
    switch (matchResult_1) {
        case 0: {
            let patternInput_3;
            const matchValue_20 = symbol.InWidth0;
            const matchValue_21 = symbol.InWidth1;
            let matchResult_2, m, n;
            if (matchValue_20 != null) {
                if (matchValue_21 != null) {
                    matchResult_2 = 0;
                    m = matchValue_21;
                    n = matchValue_20;
                }
                else {
                    matchResult_2 = 1;
                }
            }
            else {
                matchResult_2 = 1;
            }
            switch (matchResult_2) {
                case 0: {
                    patternInput_3 = [n, m];
                    break;
                }
                default:
                    patternInput_3 = [-1, -1];
            }
            const lo = patternInput_3[0] | 0;
            const hi = patternInput_3[1] | 0;
            const msb_3 = ((hi + lo) - 1) | 0;
            const midb = lo | 0;
            const midt = (lo - 1) | 0;
            const values = ofArray([[midt, 0], [msb_3, midb], [msb_3, 0]]);
            additions = fold_1((og, i) => append(og, mergeSplitLine(mergeWiresTextPos[i], item(i, values)[0], item(i, values)[1])), empty(), toList(rangeDouble(0, 1, 2)));
            break;
        }
        case 1: {
            const n_1 = matchValue_19.fields[0] | 0;
            const matchValue_23 = symbol.InWidths;
            if (matchValue_23 == null) {
                additions = empty();
            }
            else {
                const widths = matchValue_23;
                const matchValue_24 = exists((el) => equals(el, void 0), widths);
                if (matchValue_24) {
                    additions = empty();
                }
                else {
                    let valuesInput;
                    const ranges = fold_1((tupledArg, width) => {
                        const lsb_3 = tupledArg[0] | 0;
                        const acc = tupledArg[1];
                        const msb_4 = ((lsb_3 + width) - 1) | 0;
                        return [msb_4 + 1, cons([msb_4, lsb_3], acc)];
                    }, [0, empty()], map_2((x_4) => {
                        if (x_4 == null) {
                            return -1;
                        }
                        else {
                            const m_1 = x_4 | 0;
                            return m_1 | 0;
                        }
                    }, widths))[1];
                    valuesInput = reverse(ranges);
                    const valuesOutput = singleton([last(valuesInput)[0], 0]);
                    const inputEls = fold2((og_1, pos_12, value) => append(og_1, mergeSplitNLine(comp.Type, new PortType(0, []), pos_12, value[0], value[1])), empty(), ofArray(inputTextPoints), valuesInput);
                    const outputEls = fold2((og_2, pos_13, value_1) => append(og_2, mergeSplitNLine(comp.Type, new PortType(1, []), pos_13, value_1[0], value_1[1])), empty(), ofArray(outputTextPoints), valuesOutput);
                    additions = append(inputEls, outputEls);
                }
            }
            break;
        }
        case 2: {
            const n_2 = matchValue_19.fields[0] | 0;
            const values_1 = ofArray([[-1, 0], [n_2 - 1, 0]]);
            additions = fold_1((og_3, i_1) => append(og_3, mergeSplitLine(NbitSpreaderTextPos[i_1], item(i_1, values_1)[0], item(i_1, values_1)[1])), empty(), toList(rangeDouble(0, 1, 1)));
            break;
        }
        case 3: {
            const mid = matchValue_19.fields[0] | 0;
            let patternInput_5;
            const matchValue_25 = symbol.InWidth0;
            if (matchValue_25 != null) {
                const n_3 = matchValue_25 | 0;
                patternInput_5 = [n_3 - 1, mid];
            }
            else {
                patternInput_5 = [-100, -50];
            }
            const msb_5 = patternInput_5[0] | 0;
            const mid$0027 = patternInput_5[1] | 0;
            const midb_1 = mid$0027 | 0;
            const midt_1 = (mid$0027 - 1) | 0;
            const values_2 = ofArray([[midt_1, 0], [msb_5, midb_1], [msb_5, 0]]);
            additions = fold_1((og_4, i_2) => append(og_4, mergeSplitLine(splitWiresTextPos[i_2], item(i_2, values_2)[0], item(i_2, values_2)[1])), empty(), toList(rangeDouble(0, 1, 2)));
            break;
        }
        case 4: {
            const widths_1 = matchValue_19.fields[1];
            const n_4 = matchValue_19.fields[0] | 0;
            const lsbs = matchValue_19.fields[2];
            const msbs = map2((width_1, lsb_4) => ((lsb_4 + width_1) - 1), widths_1, lsbs);
            let inputValue;
            const matchValue_26 = symbol.InWidth0;
            let matchResult_3, width_3;
            if (matchValue_26 != null) {
                if ((width_2 = (matchValue_26 | 0), width_2 > max(msbs, {
                    Compare: comparePrimitives,
                }))) {
                    matchResult_3 = 0;
                    width_3 = matchValue_26;
                }
                else {
                    matchResult_3 = 1;
                }
            }
            else {
                matchResult_3 = 1;
            }
            switch (matchResult_3) {
                case 0: {
                    inputValue = [width_3 - 1, 0];
                    break;
                }
                default:
                    inputValue = [-2, -1];
            }
            const outputValues = fold2((acc_1, lsb_5, msb_6) => append(acc_1, singleton([msb_6, lsb_5])), empty(), lsbs, msbs);
            const inputEls_1 = fold2((og_5, pos_14, value_2) => append(og_5, mergeSplitNLine(comp.Type, new PortType(0, []), pos_14, value_2[0], value_2[1])), empty(), ofArray(inputTextPoints), singleton(inputValue));
            const outputEls_1 = fold2((og_6, pos_15, value_3) => append(og_6, mergeSplitNLine(comp.Type, new PortType(1, []), pos_15, value_3[0], value_3[1])), empty(), ofArray(outputTextPoints), outputValues);
            additions = append(outputEls_1, inputEls_1);
            break;
        }
        case 5: {
            additions = addText(clockTxtPos, " clk", "middle", "normal", "12px");
            break;
        }
        case 6: {
            const nBits = matchValue_19.fields[0] | 0;
            const lsb_6 = matchValue_19.fields[1] | 0;
            additions = busSelectLine((lsb_6 + nBits) - 1, lsb_6);
            break;
        }
        case 7: {
            const dialogVal = matchValue_19.fields[2];
            let patternInput_6;
            const matchValue_28 = transform_1.Rotation;
            let matchResult_4;
            if (transform_1.flipped) {
                switch (matchValue_28.tag) {
                    case 0: {
                        matchResult_4 = 0;
                        break;
                    }
                    case 1: {
                        matchResult_4 = 1;
                        break;
                    }
                    case 3: {
                        matchResult_4 = 2;
                        break;
                    }
                    default:
                        matchResult_4 = 3;
                }
            }
            else {
                switch (matchValue_28.tag) {
                    case 2: {
                        matchResult_4 = 0;
                        break;
                    }
                    case 1: {
                        matchResult_4 = 1;
                        break;
                    }
                    case 3: {
                        matchResult_4 = 2;
                        break;
                    }
                    default:
                        matchResult_4 = 3;
                }
            }
            switch (matchResult_4) {
                case 0: {
                    patternInput_6 = ["end", 0, 5];
                    break;
                }
                case 1: {
                    patternInput_6 = ["end", -15, -5];
                    break;
                }
                case 2: {
                    patternInput_6 = ["end", 0, -5];
                    break;
                }
                default:
                    patternInput_6 = ["start", 0, -5];
            }
            const yOffset = patternInput_6[1];
            const xOffset = patternInput_6[2];
            const align_1 = patternInput_6[0];
            const fontSize = (dialogVal.length < 2) ? "14px" : "12px";
            additions = addText(new XYPos((w / 2) + xOffset, (h / 1.5) + yOffset), dialogVal, align_1, "normal", fontSize);
            break;
        }
        case 8: {
            const y_2 = matchValue_19.fields[1];
            additions = addText(new XYPos((w / 2) - 2, (h / 2.7) - 1), "=" + hex(~~y_2), "middle", "bold", "10px");
            break;
        }
        case 9: {
            const t = matchValue_19.fields[2];
            additions = addText(new XYPos((w / 2) - 2, (h / 2.7) - 1), "= " + t, "middle", "bold", "10px");
            break;
        }
        case 10: {
            additions = addText(new XYPos(w / 2, h / 2.7), busTitleAndBits("", x_6), "middle", "normal", "12px");
            break;
        }
        case 11: {
            const x_7 = matchValue_19.fields[0] | 0;
            additions = addText(new XYPos(w / 2, (h / 2.7) - 1.25), busTitleAndBits("", x_7), "middle", "normal", "9px");
            break;
        }
        case 12: {
            additions = addText(head(rotatePoints([new XYPos(15, H - 11)], new XYPos(W / 2, H / 2), transform_1)), " clk", "middle", "normal", "12px");
            break;
        }
        default:
            additions = empty();
    }
    let patternInput_7;
    const matchValue_30 = comp.Type;
    switch (matchValue_30.tag) {
        case 28:
        case 27: {
            patternInput_7 = [outlineColor(colour), "4.0"];
            break;
        }
        case 25: {
            patternInput_7 = [outlineColor(colour), "4.0"];
            break;
        }
        case 3: {
            patternInput_7 = [outlineColor(colour), "4.0"];
            break;
        }
        case 4: {
            patternInput_7 = [outlineColor(colour), "4.0"];
            break;
        }
        case 6: {
            patternInput_7 = [outlineColor(colour), "4.0"];
            break;
        }
        default:
            patternInput_7 = ["black", "1.0"];
    }
    const strokeWidth = patternInput_7[1];
    const outlineColour = patternInput_7[0];
    const addComponentLabel = (comp_2, transform_2, colour_1) => {
        let left_14, right_14, left_15, right_15, left_17, left_16, right_16, right_17;
        const style = Constants_componentLabelStyle;
        const box = symbol.LabelBoundingBox;
        let margin;
        const matchValue_31 = comp_2.Type;
        switch (matchValue_31.tag) {
            case 6:
            case 3: {
                margin = Constants_thinComponentLabelOffsetDistance;
                break;
            }
            default:
                margin = Constants_componentLabelOffsetDistance;
        }
        let pos_16;
        let left_13;
        let left_12;
        const left_11 = box.TopLeft;
        const right_11 = symbol.Pos;
        left_12 = (new XYPos(left_11.X - right_11.X, left_11.Y - right_11.Y));
        const right_12 = new XYPos(margin, margin);
        left_13 = (new XYPos(left_12.X + right_12.X, left_12.Y + right_12.Y));
        pos_16 = (new XYPos(left_13.X + Constants_labelCorrection.X, left_13.Y + Constants_labelCorrection.Y));
        const text_3 = addStyledText(pos_16, new Text$(style.TextAnchor, style.FontSize, style.FontWeight, style.FontFamily, style.Fill, style.UserSelect, "hanging"), comp_2.Label);
        let matchResult_5;
        if (Constants_testShowLabelBoundingBoxes) {
            matchResult_5 = 2;
        }
        else if (colour_1 === "lightgreen") {
            if (comp_2.Label !== "") {
                matchResult_5 = 0;
            }
            else {
                matchResult_5 = 1;
            }
        }
        else {
            matchResult_5 = 1;
        }
        switch (matchResult_5) {
            case 0: {
                const y_3 = pos_16.Y - (margin * 0.8);
                const x_8 = pos_16.X - (margin * 0.8);
                const w_1 = box.W - (margin * 0.4);
                const h_1 = box.H - (margin * 0.4);
                const polyStyle = new Polygon(defaultPolygon.Stroke, "0", defaultPolygon.FillOpacity, "lightgreen");
                const poly = makePolygon(`${x_8},${y_3} ${x_8 + w_1},${y_3} ${x_8 + w_1},${y_3 + h_1} ${x_8},${y_3 + h_1}`, polyStyle);
                return ofArray([poly, text_3]);
            }
            case 1:
                return singleton(text_3);
            default: {
                const dimW = new XYPos(box.W, 0);
                const dimH = new XYPos(0, box.H);
                const corners = map_2((c) => {
                    let c$0027;
                    const left_18 = c;
                    const right_18 = symbol.Pos;
                    c$0027 = (new XYPos(left_18.X - right_18.X, left_18.Y - right_18.Y));
                    return makeCircle(c$0027.X, c$0027.Y, new Circle(3, defaultCircle.Stroke, defaultCircle.StrokeWidth, defaultCircle.FillOpacity, defaultCircle.Fill));
                }, ofArray([box.TopLeft, (left_14 = box.TopLeft, (right_14 = dimW, new XYPos(left_14.X + right_14.X, left_14.Y + right_14.Y))), (left_15 = box.TopLeft, (right_15 = dimH, new XYPos(left_15.X + right_15.X, left_15.Y + right_15.Y))), (left_17 = ((left_16 = box.TopLeft, (right_16 = dimW, new XYPos(left_16.X + right_16.X, left_16.Y + right_16.Y)))), (right_17 = dimH, new XYPos(left_17.X + right_17.X, left_17.Y + right_17.Y)))]));
                return cons(text_3, corners);
            }
        }
    };
    const labelcolour = outlineColor(symbol.Appearance.Colour);
    const legendOffset = (compWidth, compHeight, symbol_1) => {
        const pMap = symbol_1.PortMaps.Order;
        const vertFlip = equals(symbol_1.STransform.Rotation, new Rotation(2, []));
        const getNum = (edge) => defaultArg(map_3(length, tryFind(edge, pMap)), 0);
        const lhsPortNum = getNum(new Edge(2, [])) | 0;
        const rhsPortNum = getNum(new Edge(3, [])) | 0;
        let offset;
        const matchValue_38 = (lhsPortNum % 2) | 0;
        const matchValue_39 = (rhsPortNum % 2) | 0;
        const matchValue_40 = symbol_1.Component.Type;
        let matchResult_6;
        switch (matchValue_38) {
            case 0: {
                switch (matchValue_39) {
                    case 0: {
                        switch (matchValue_40.tag) {
                            case 26: {
                                matchResult_6 = 2;
                                break;
                            }
                            case 29: {
                                matchResult_6 = 3;
                                break;
                            }
                            case 8: {
                                matchResult_6 = 4;
                                break;
                            }
                            default:
                                if ($007CIsBinaryGate$007CNotBinaryGate$007C(matchValue_40).tag === 0) {
                                    matchResult_6 = 5;
                                }
                                else {
                                    matchResult_6 = 7;
                                }
                        }
                        break;
                    }
                    case 1: {
                        switch (matchValue_40.tag) {
                            case 26: {
                                matchResult_6 = 1;
                                break;
                            }
                            case 29:
                            case 30: {
                                matchResult_6 = 3;
                                break;
                            }
                            case 8: {
                                matchResult_6 = 4;
                                break;
                            }
                            default:
                                if ($007CIsBinaryGate$007CNotBinaryGate$007C(matchValue_40).tag === 0) {
                                    matchResult_6 = 5;
                                }
                                else {
                                    matchResult_6 = 9;
                                }
                        }
                        break;
                    }
                    default:
                        switch (matchValue_40.tag) {
                            case 26: {
                                matchResult_6 = 2;
                                break;
                            }
                            case 29: {
                                matchResult_6 = 3;
                                break;
                            }
                            case 8: {
                                matchResult_6 = 4;
                                break;
                            }
                            default:
                                if ($007CIsBinaryGate$007CNotBinaryGate$007C(matchValue_40).tag === 0) {
                                    matchResult_6 = 5;
                                }
                                else {
                                    matchResult_6 = 10;
                                }
                        }
                }
                break;
            }
            case 1: {
                switch (matchValue_39) {
                    case 0: {
                        switch (matchValue_40.tag) {
                            case 26: {
                                matchResult_6 = 0;
                                break;
                            }
                            case 29: {
                                matchResult_6 = 3;
                                break;
                            }
                            case 8: {
                                matchResult_6 = 4;
                                break;
                            }
                            default:
                                if ($007CIsBinaryGate$007CNotBinaryGate$007C(matchValue_40).tag === 0) {
                                    matchResult_6 = 5;
                                }
                                else {
                                    matchResult_6 = 8;
                                }
                        }
                        break;
                    }
                    case 1: {
                        switch (matchValue_40.tag) {
                            case 26: {
                                matchResult_6 = 2;
                                break;
                            }
                            case 29:
                            case 30: {
                                matchResult_6 = 3;
                                break;
                            }
                            case 8: {
                                matchResult_6 = 4;
                                break;
                            }
                            default:
                                if ($007CIsBinaryGate$007CNotBinaryGate$007C(matchValue_40).tag === 0) {
                                    matchResult_6 = 5;
                                }
                                else {
                                    matchResult_6 = 6;
                                }
                        }
                        break;
                    }
                    default:
                        switch (matchValue_40.tag) {
                            case 26: {
                                matchResult_6 = 2;
                                break;
                            }
                            case 29: {
                                matchResult_6 = 3;
                                break;
                            }
                            case 8: {
                                matchResult_6 = 4;
                                break;
                            }
                            default:
                                if ($007CIsBinaryGate$007CNotBinaryGate$007C(matchValue_40).tag === 0) {
                                    matchResult_6 = 5;
                                }
                                else {
                                    matchResult_6 = 10;
                                }
                        }
                }
                break;
            }
            default:
                switch (matchValue_40.tag) {
                    case 26: {
                        matchResult_6 = 2;
                        break;
                    }
                    case 29: {
                        matchResult_6 = 3;
                        break;
                    }
                    case 30: {
                        if (matchValue_39 === 1) {
                            matchResult_6 = 3;
                        }
                        else if ($007CIsBinaryGate$007CNotBinaryGate$007C(matchValue_40).tag === 0) {
                            matchResult_6 = 5;
                        }
                        else {
                            matchResult_6 = 10;
                        }
                        break;
                    }
                    case 8: {
                        matchResult_6 = 4;
                        break;
                    }
                    default:
                        if ($007CIsBinaryGate$007CNotBinaryGate$007C(matchValue_40).tag === 0) {
                            matchResult_6 = 5;
                        }
                        else {
                            matchResult_6 = 10;
                        }
                }
        }
        switch (matchResult_6) {
            case 0: {
                offset = (new XYPos(10, 0));
                break;
            }
            case 1: {
                offset = (new XYPos(-10, 0));
                break;
            }
            case 2: {
                offset = (new XYPos(0, 0));
                break;
            }
            case 3: {
                offset = (new XYPos(0, (Constants_legendVertOffset * 1.1) * -3));
                break;
            }
            case 4: {
                offset = (new XYPos(0, 0));
                break;
            }
            case 5: {
                offset = (new XYPos(0, 0));
                break;
            }
            case 6: {
                offset = (new XYPos(0, Constants_legendVertOffset * (vertFlip ? 0.5 : -3)));
                break;
            }
            case 7: {
                offset = (new XYPos(0, 0));
                break;
            }
            case 8: {
                offset = (new XYPos(10, 0));
                break;
            }
            case 9: {
                offset = (new XYPos(-10, 0));
                break;
            }
            default:
                offset = toFail(printf("What? Can\'t happen"));
        }
        const left_19 = new XYPos(compWidth / 2, (compHeight / 2) - 7);
        const right_19 = offset;
        return new XYPos(left_19.X + right_19.X, left_19.Y + right_19.Y);
    };
    const legendFontSize = (ct) => {
        if (ct.tag === 26) {
            return Constants_customLegendFontSizeInPixels;
        }
        else {
            return Constants_otherLegendFontSizeInPixels;
        }
    };
    let list_19;
    const list_17 = append(additions, (list_14 = ((list_12 = ((list_10 = ((list_8 = ((list_4 = drawPorts(new PortType(1, []), comp.OutputPorts, showPorts, symbol), append(drawPorts(new PortType(0, []), comp.InputPorts, showPorts, symbol), list_4))), append(drawPortsText(append(comp.InputPorts, comp.OutputPorts), (tupledArg_1 = portNames(comp.Type), append(tupledArg_1[0], tupledArg_1[1])), symbol), list_8))), append(drawCorners(showCorners, symbol), list_10))), append(addLegendText(legendOffset(w, h, symbol), getComponentLegend(comp.Type, transform_1.Rotation), "middle", "bold", `${legendFontSize(comp.Type)}px`), list_12))), append(addComponentLabel(comp, transform_1, labelcolour), list_14)));
    list_19 = append(drawMovingPortTarget(symbol.MovingPortTarget, symbol, points), list_17);
    return append(createBiColorPolygon(points, colour, outlineColour, opacity, strokeWidth, comp), list_19);
}

class RenderSymbolProps extends Record {
    constructor(Symbol$, Dispatch, key, Theme) {
        super();
        this.Symbol = Symbol$;
        this.Dispatch = Dispatch;
        this.key = key;
        this.Theme = Theme;
    }
}

function RenderSymbolProps_$reflection() {
    return record_type("SymbolView.RenderSymbolProps", [], RenderSymbolProps, () => [["Symbol", SymbolT_Symbol_$reflection()], ["Dispatch", lambda_type(SymbolT_Msg_$reflection(), unit_type)], ["key", string_type], ["Theme", SymbolT_ThemeType_$reflection()]]);
}

const renderSymbol = FunctionComponent_Of_60E46241((props) => {
    const symbol = props.Symbol;
    const patternInput = symbol.Pos;
    const fY = patternInput.Y;
    const fX = patternInput.X;
    const appear = symbol.Appearance;
    const props_1 = [["style", {
        transform: toText(`translate(${fX}px, ${fY}px)`),
    }]];
    const children = drawComponent(props.Symbol, props.Theme);
    return react.createElement("g", keyValueList(props_1, 1), ...children);
}, "Symbol", Helpers_equalsButFunctions, void 0, "renderSymbol", "/Users/advik/Documents/imperial/HLP/issie/src/Renderer/DrawBlock/SymbolView.fs", 597);

export function view(model, dispatch) {
    const toListOfNotMovingAndMoving = (map) => {
        const listNotMoving = map_2((tuple) => tuple[1], toList_1(filter((_arg, sym) => (!sym.Moving && equals(sym.Annotation, void 0)), map)));
        const listMoving = map_2((tuple_1) => tuple_1[1], toList_1(filter((_arg_1, sym_1) => (sym_1.Moving && equals(sym_1.Annotation, void 0)), map)));
        return append(listNotMoving, listMoving);
    };
    const start = getTimeMs();
    return toArray(map_2((symbol) => {
        const symbol_1 = symbol;
        const id = symbol_1.Id;
        return renderSymbol(new RenderSymbolProps(symbol_1, dispatch, id, model.Theme));
    }, toListOfNotMovingAndMoving(model.Symbols)));
}

/**
 * init function for initial Symbol Model
 */
export function init() {
    return [new SymbolT_Model(empty_1({
        Compare: compare,
    }), empty_1({
        Compare: compare,
    }), empty_1({
        Compare: comparePrimitives,
    }), empty_2({
        Compare: compare,
    }), empty_1({
        Compare: compare,
    }), new SymbolT_ThemeType(2, []), void 0), Cmd_none()];
}

//# sourceMappingURL=SymbolView.fs.js.map
