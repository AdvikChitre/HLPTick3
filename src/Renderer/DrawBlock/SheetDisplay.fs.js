import { getTimeMs } from "../Common/TimeHelpers.fs.js";
import { append as append_1, fold, reverse, map as map_1, item, singleton, ofArray, cons, exists, filter } from "../fable_modules/fable-library.4.1.4/List.js";
import { toList, iterate } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { value, toArray } from "../fable_modules/fable-library.4.1.4/Option.js";
import { Constants_gridSize, scrollSequence, viewIsAfterUpdateScroll, canvasDiv } from "./Sheet.fs.js";
import { XYPos } from "../Common/CommonTypes.fs.js";
import { SheetT_CursorType__Text, SheetT_KeyboardMsg, SheetT_Msg } from "../Model/DrawModelType.fs.js";
import { toFail, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { portCircle, makeLine, Line, Circle, defaultCircle, makeCircle, makePartArcAttr, makeLineAttr, Path, defaultPath, makeAnyPath, makePolygon, Polygon, MouseOp, MouseT } from "../Common/DrawHelpers.fs.js";
import { DOMAttr, CSSProp, Prop, HTMLAttr } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import * as react from "react";
import { view as view_1 } from "./BusWire.fs.js";
import { max } from "../fable_modules/fable-library.4.1.4/Double.js";
import { snapLineVertical, snapLineHorizontal, snapIndicatorLineY as snapIndicatorLineY_1, snapIndicatorLineX as snapIndicatorLineX_1 } from "./SheetSnap.fs.js";
import { map, append } from "../fable_modules/fable-library.4.1.4/Array.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";

export const Constants_KeyPressPersistTimeMs = 1000;

/**
 * Hack to deal with possible Ctrl Key up when window is not focussed.
 * This will not register as a keyup and so will stay in CurrentKeyPresses forever.
 * Use the fact that keys auto-repeat, and time-stamp each KeyDown.
 * If the mots recent keydown is longer than some cutoff time assume key is no longer pressed.
 */
export function getActivePressedKeys(model) {
    const timeNow = getTimeMs();
    return filter((tupledArg) => {
        const time = tupledArg[1];
        return (timeNow - time) < Constants_KeyPressPersistTimeMs;
    }, model.CurrentKeyPresses);
}

/**
 * This actually writes to the DOM a new scroll position.
 * In the special case that DOM has not yet been created it does nothing.
 */
export function writeCanvasScroll(scrollPos) {
    iterate((el) => {
        el.scrollLeft = scrollPos.X;
        el.scrollTop = scrollPos.Y;
    }, toArray(canvasDiv()));
}

export function getDrawBlockPos(ev, headerHeight, sheetModel) {
    return new XYPos((ev.pageX + sheetModel.ScreenScrollPos.X) / sheetModel.Zoom, ((ev.pageY - headerHeight) + sheetModel.ScreenScrollPos.Y) / sheetModel.Zoom);
}

/**
 * This function zooms an SVG canvas by transforming its content and altering its size.
 * Currently the zoom expands based on top left corner.
 */
export function displaySvgWithZoom(model, headerHeight, style, svgReact, dispatch) {
    let props_2, children_2, props;
    const zoom = model.Zoom;
    document.onkeydown = ((key) => {
        if (key.which === 32) {
            dispatch(new SheetT_Msg(12, [key.key]));
        }
        else {
            dispatch(new SheetT_Msg(12, [key.key]));
        }
    });
    document.onkeyup = ((key_1) => {
        dispatch(new SheetT_Msg(11, [key_1.key]));
    });
    let sizeInPixels;
    const arg = model.CanvasSize * model.Zoom;
    sizeInPixels = toText(printf("%.2fpx"))(arg);
    const mDown = (ev) => (ev.buttons !== 0);
    const mouseOp = (op, ev_1) => {
        let ShiftKeyDown, ScreenMovement, ScreenPage;
        if (~~ev_1.button === 0) {
            dispatch(new SheetT_Msg(5, [(ShiftKeyDown = ev_1.shiftKey, (ScreenMovement = (new XYPos(ev_1.movementX, ev_1.movementY)), (ScreenPage = (new XYPos(ev_1.pageX, ev_1.pageY)), new MouseT(getDrawBlockPos(ev_1, headerHeight, model), ScreenMovement, ScreenPage, ShiftKeyDown, op))))]));
        }
    };
    const wheelUpdate = (ev_2) => {
        if (exists((tupledArg) => {
            const k = tupledArg[0];
            return k === "CONTROL";
        }, getActivePressedKeys(model))) {
            if (ev_2.deltaY > 0) {
                dispatch(new SheetT_Msg(2, [new SheetT_KeyboardMsg(12, [])]));
            }
            else {
                dispatch(new SheetT_Msg(2, [new SheetT_KeyboardMsg(11, [])]));
            }
        }
    };
    const cursorText = SheetT_CursorType__Text(model.CursorType);
    const firstView = viewIsAfterUpdateScroll();
    viewIsAfterUpdateScroll(false);
    const props_4 = [new HTMLAttr(99, ["Canvas"]), new Prop(0, [cursorText]), ["style", keyValueList(cons(new CSSProp(123, [cursorText]), style), 1)], new DOMAttr(51, [(ev_3) => {
        mouseOp(new MouseOp(1, []), ev_3);
    }]), new DOMAttr(57, [(ev_4) => {
        mouseOp(new MouseOp(0, []), ev_4);
    }]), new DOMAttr(54, [(ev_5) => {
        mouseOp(mDown(ev_5) ? (new MouseOp(3, [])) : (new MouseOp(2, [])), ev_5);
    }]), new DOMAttr(63, [(_arg_1) => {
        if (canvasDiv() != null) {
            const el = canvasDiv();
            if (!firstView) {
                dispatch(new SheetT_Msg(9, [scrollSequence(), new XYPos(el.scrollLeft, el.scrollTop), dispatch]));
            }
        }
    }]), new Prop(1, [(el_1) => {
        canvasDiv(el_1);
        writeCanvasScroll(model.ScreenScrollPos);
    }]), new DOMAttr(64, [wheelUpdate])];
    const children_4 = [(props_2 = [["style", {
        height: sizeInPixels,
        width: sizeInPixels,
    }], new HTMLAttr(99, ["DrawBlockSVGTop"])], (children_2 = [(props = [["style", {
        transform: toText(printf("scale(%f)"))(zoom),
    }]], react.createElement("g", keyValueList(props, 1), ...svgReact))], react.createElement("svg", keyValueList(props_2, 1), ...children_2)))];
    return react.createElement("div", keyValueList(props_4, 1), ...children_4);
}

/**
 * View function, displays symbols / wires and possibly also a grid / drag-to-select box / connecting ports line / snap-to-grid visualisation
 */
export function view(model, headerHeight, style, dispatch) {
    let children_4, children_2;
    const start = getTimeMs();
    const wDispatch = (wMsg) => {
        dispatch(new SheetT_Msg(0, [wMsg]));
    };
    const wireSvg = view_1(model.Wire, wDispatch);
    const wholeCanvas = (`${max(100, 100 / model.Zoom)}`) + "%";
    const snapIndicatorLineX = snapIndicatorLineX_1(model, wholeCanvas);
    const snapIndicatorLineY = snapIndicatorLineY_1(model, wholeCanvas);
    const snapDisplay = (model_1) => {
        const snapLineY = (ypt) => snapLineHorizontal(wholeCanvas, ypt.Snap);
        const snapLineX = (xpt) => snapLineVertical(wholeCanvas, xpt.Snap);
        return ofArray(append(map(snapLineX, model_1.SnapSymbols.SnapX.SnapData), map(snapLineY, model_1.SnapSymbols.SnapY.SnapData)));
    };
    const gridSize = Constants_gridSize;
    let grid;
    const children_8 = [(children_4 = [(children_2 = [react.createElement("path", {
        d: `M ${gridSize} 0 L 0 0 0 ${gridSize}`,
        fill: "None",
        stroke: "Gray",
        strokeWidth: "0.5",
    })], react.createElement("pattern", {
        id: "Grid",
        width: `${gridSize}`,
        height: `${gridSize}`,
        patternUnits: "userSpaceOnUse",
    }, ...children_2))], react.createElement("defs", {}, ...children_4)), react.createElement("rect", {
        width: wholeCanvas,
        height: wholeCanvas,
        fill: "url(#Grid)",
    })];
    grid = react.createElement("svg", {
        width: wholeCanvas,
        height: wholeCanvas,
        xmlSpace: "http://www.w3.org/2000/svg",
    }, ...children_8);
    let dragToSelectBox;
    const patternInput = model.DragToSelectBox;
    const fY = patternInput.TopLeft.Y;
    const fX = patternInput.TopLeft.X;
    const fW = patternInput.W;
    const fH = patternInput.H;
    const polygonPoints = `${fX},${fY} ${fX + fW},${fY} ${fX + fW},${fY + fH} ${fX},${fY + fH}`;
    const selectionBox = new Polygon("Black", "0.1px", 0.05, "Blue");
    dragToSelectBox = makePolygon(polygonPoints, selectionBox);
    const rotateScaleButtonPoint = (boxW, boxH, point) => {
        const diagonal = Math.sqrt(Math.pow(boxW, 2) + Math.pow(boxH, 2));
        const cosTheta = -(boxW / diagonal);
        const sinTheta = boxH / diagonal;
        const y = point.Y;
        const x = point.X;
        return new XYPos((x * cosTheta) - (y * sinTheta), (y * cosTheta) + (x * sinTheta));
    };
    const drawAnnotation = (symbol, boxH_1, boxW_1) => {
        let left_2, right_2, list_1, left_1, right_1;
        const transform = symbol.STransform;
        const strokeWidth = "1.0";
        const outlineColour = "black";
        const W = symbol.Component.W;
        const H = symbol.Component.H;
        const createAnyPath = (startingPoint, pathAttr, colour, strokeWidth_1, outlineColour_1) => singleton(makeAnyPath(startingPoint, pathAttr, new Path(outlineColour_1, strokeWidth_1, defaultPath.StrokeDashArray, defaultPath.StrokeLinecap, colour)));
        const matchValue_4 = symbol.Annotation;
        if (matchValue_4 != null) {
            const a = matchValue_4;
            if (a.tag === 1) {
                const adjustCurvyPoints = (points) => {
                    const matchValue_5 = transform.Rotation;
                    const matchValue_6 = transform.flipped;
                    switch (matchValue_5.tag) {
                        case 1:
                            return item(1, points);
                        case 2:
                            if (matchValue_6) {
                                return item(0, points);
                            }
                            else {
                                return item(2, points);
                            }
                        case 3:
                            return item(3, points);
                        default:
                            if (matchValue_6) {
                                return item(2, points);
                            }
                            else {
                                return item(0, points);
                            }
                    }
                };
                const curvyShape = adjustCurvyPoints(map_1((array_3) => map((tupledArg_1) => {
                    const x_3 = tupledArg_1[0];
                    const y_2 = tupledArg_1[1];
                    return new XYPos(x_3, y_2);
                }, array_3), ofArray([[[W / 3, (7 * H) / 9], [0, -H / 9], [-W / 4, H / 6], [W / 4, H / 6], [0, -H / 9], [0, -W / 2], [0, W / 2], [-W / 4, 0], [0, H / 9], [W / 4, 0], [0.001, (7 * W) / 18], [0.001, (-7 * W) / 18]], [[(2 * W) / 3, (7 * H) / 9], [0, -H / 9], [W / 4, H / 6], [-W / 4, H / 6], [0, -H / 9], [0.001, -W / 2], [0.001, W / 2], [W / 4, 0], [0, H / 9], [-W / 4, 0], [0, (7 * W) / 18], [0, (-7 * W) / 18]]])));
                const arrowHead = ((makeLineAttr(curvyShape[1].X, curvyShape[1].Y) + makeLineAttr(curvyShape[2].X, curvyShape[2].Y)) + makeLineAttr(curvyShape[3].X, curvyShape[3].Y)) + makeLineAttr(curvyShape[4].X, curvyShape[4].Y);
                const arcAttr1 = makePartArcAttr(W / 2, curvyShape[5].Y, curvyShape[5].X, curvyShape[6].Y, curvyShape[6].X);
                const touchUp = (makeLineAttr(curvyShape[7].X, curvyShape[7].Y) + makeLineAttr(curvyShape[8].X, curvyShape[8].Y)) + makeLineAttr(curvyShape[9].X, curvyShape[9].Y);
                const arcAttr2 = makePartArcAttr((7 * W) / 18, curvyShape[10].Y, curvyShape[10].X, curvyShape[11].Y, curvyShape[11].X);
                return createAnyPath((left_2 = symbol.Pos, (right_2 = curvyShape[0], new XYPos(left_2.X + right_2.X, left_2.Y + right_2.Y))), ((arrowHead + arcAttr1) + touchUp) + arcAttr2, "grey", strokeWidth, outlineColour);
            }
            else {
                const shapePointsPre = map_1((tupledArg) => {
                    const x_1 = tupledArg[0];
                    const y_1 = tupledArg[1];
                    return rotateScaleButtonPoint(boxW_1, boxH_1, new XYPos(x_1, y_1));
                }, ofArray([[4.5, -2], [4.5, -5], [10.5, 0], [4.5, 5], [4.5, 2], [-4.5, 2], [-4.5, 5], [-10.5, 0], [-4.5, -5], [-4.5, -2], [4.5, -2]]));
                const shapePoints = reverse((list_1 = toList(rangeDouble(1, 1, 10)), fold((lst, x_2) => {
                    let left, right;
                    return cons((left = item(x_2, shapePointsPre), (right = item(x_2 - 1, shapePointsPre), new XYPos(left.X - right.X, left.Y - right.Y))), lst);
                }, singleton(item(0, shapePointsPre)), list_1)));
                const arrowHeadTopRight = (((makeLineAttr(item(1, shapePoints).X, item(1, shapePoints).Y) + makeLineAttr(item(2, shapePoints).X, item(2, shapePoints).Y)) + makeLineAttr(item(3, shapePoints).X, item(3, shapePoints).Y)) + makeLineAttr(item(4, shapePoints).X, item(4, shapePoints).Y)) + makeLineAttr(item(5, shapePoints).X, item(5, shapePoints).Y);
                const arrowHeadBottomLeft = (((makeLineAttr(item(6, shapePoints).X, item(6, shapePoints).Y) + makeLineAttr(item(7, shapePoints).X, item(7, shapePoints).Y)) + makeLineAttr(item(8, shapePoints).X, item(8, shapePoints).Y)) + makeLineAttr(item(9, shapePoints).X, item(9, shapePoints).Y)) + makeLineAttr(item(10, shapePoints).X, item(10, shapePoints).Y);
                return createAnyPath((left_1 = symbol.Pos, (right_1 = item(0, shapePoints), new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y))), arrowHeadTopRight + arrowHeadBottomLeft, "grey", strokeWidth, outlineColour);
            }
        }
        else {
            return toFail(printf("Should not be getting Annotation = None for drawing scalingBox buttons "));
        }
    };
    let scalingBox;
    if (model.ScalingBox == null) {
        scalingBox = append_1(singleton(makeAnyPath(new XYPos(0, 0), makeLineAttr(0, 0), defaultPath)), singleton(makeCircle(0, 0, new Circle(0, defaultCircle.Stroke, defaultCircle.StrokeWidth, defaultCircle.FillOpacity, defaultCircle.Fill))));
    }
    else {
        const patternInput_3 = value(model.ScalingBox).ScalingBoxBound;
        const fY_1 = patternInput_3.TopLeft.Y;
        const fX_1 = patternInput_3.TopLeft.X;
        const fW_1 = patternInput_3.W;
        const fH_1 = patternInput_3.H;
        scalingBox = append_1(singleton(makeAnyPath(new XYPos((fX_1 + 50) + fW_1, fY_1 - 46.5), ((makeLineAttr(0, fH_1 + 96.5) + makeLineAttr(-(fW_1 + 100), 0)) + makeLineAttr(0, -fH_1 - 100)) + makeLineAttr(fW_1 + 96.5, 0), new Path(defaultPath.Stroke, defaultPath.StrokeWidth, "4,4", defaultPath.StrokeLinecap, defaultPath.Fill))), append_1(drawAnnotation(value(model.ScalingBox).RotateDeg270Button, fH_1 + 100, fW_1 + 100), append_1(drawAnnotation(value(model.ScalingBox).RotateDeg90Button, fH_1 + 100, fW_1 + 100), drawAnnotation(value(model.ScalingBox).ScaleButton, fH_1 + 100, fW_1 + 100))));
    }
    let connectingPortsWire;
    const connectPortsLine = new Line("Green", "2.0px", "5, 5");
    const patternInput_4 = model.ConnectPortsLine;
    const y2 = patternInput_4[1].Y;
    const y1 = patternInput_4[0].Y;
    const x2 = patternInput_4[1].X;
    const x1 = patternInput_4[0].X;
    connectingPortsWire = ofArray([makeLine(x1, y1, x2, y2, connectPortsLine), makeCircle(x2, y2, new Circle(portCircle.R, portCircle.Stroke, portCircle.StrokeWidth, portCircle.FillOpacity, "Green"))]);
    const displayElements = model.ShowGrid ? ofArray([grid, wireSvg]) : singleton(wireSvg);
    const snaps = append_1(snapIndicatorLineX, snapIndicatorLineY);
    const matchValue_9 = model.Action;
    const matchValue_10 = model.ScalingBox;
    let matchResult;
    switch (matchValue_9.tag) {
        case 0: {
            matchResult = 0;
            break;
        }
        case 8: {
            if (matchValue_10 != null) {
                matchResult = 2;
            }
            else {
                matchResult = 1;
            }
            break;
        }
        case 9: {
            if (matchValue_10 != null) {
                matchResult = 2;
            }
            else {
                matchResult = 1;
            }
            break;
        }
        case 5: {
            if (matchValue_10 != null) {
                matchResult = 4;
            }
            else {
                matchResult = 3;
            }
            break;
        }
        case 3: {
            matchResult = 5;
            break;
        }
        case 7: {
            matchResult = 6;
            break;
        }
        case 12: {
            matchResult = 7;
            break;
        }
        default:
            if (matchValue_10 != null) {
                matchResult = 8;
            }
            else {
                matchResult = 9;
            }
    }
    switch (matchResult) {
        case 0:
            return displaySvgWithZoom(model, headerHeight, style, append_1(displayElements, singleton(dragToSelectBox)), dispatch);
        case 1:
            return displaySvgWithZoom(model, headerHeight, style, append_1(displayElements, connectingPortsWire), dispatch);
        case 2:
            return displaySvgWithZoom(model, headerHeight, style, append_1(displayElements, append_1(scalingBox, connectingPortsWire)), dispatch);
        case 3:
            return displaySvgWithZoom(model, headerHeight, style, append_1(displayElements, snaps), dispatch);
        case 4:
            return displaySvgWithZoom(model, headerHeight, style, append_1(displayElements, append_1(snaps, scalingBox)), dispatch);
        case 5:
            return displaySvgWithZoom(model, headerHeight, style, append_1(displayElements, append_1(snaps, scalingBox)), dispatch);
        case 6:
            return displaySvgWithZoom(model, headerHeight, style, append_1(displayElements, snaps), dispatch);
        case 7:
            return displaySvgWithZoom(model, headerHeight, style, append_1(displayElements, scalingBox), dispatch);
        case 8:
            return displaySvgWithZoom(model, headerHeight, style, append_1(displayElements, scalingBox), dispatch);
        default:
            return displaySvgWithZoom(model, headerHeight, style, displayElements, dispatch);
    }
}

//# sourceMappingURL=SheetDisplay.fs.js.map
