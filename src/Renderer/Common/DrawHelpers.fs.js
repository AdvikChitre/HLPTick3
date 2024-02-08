import { Union, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { string_type, bool_type, union_type, record_type, float64_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { XYPos_$reflection } from "./CommonTypes.fs.js";
import { printf, interpolate, toText, join } from "../fable_modules/fable-library.4.1.4/String.js";
import { v4 } from "uuid";
import * as react from "react";
import { min, max } from "../fable_modules/fable-library.4.1.4/Double.js";
import { SVGAttr } from "../fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { keyValueList } from "../fable_modules/fable-library.4.1.4/MapUtil.js";

export class PortLocation extends Record {
    constructor(X, Y, R) {
        super();
        this.X = X;
        this.Y = Y;
        this.R = R;
    }
}

export function PortLocation_$reflection() {
    return record_type("DrawHelpers.PortLocation", [], PortLocation, () => [["X", float64_type], ["Y", float64_type], ["R", float64_type]]);
}

export class MouseOp extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Up", "Down", "Move", "Drag"];
    }
}

export function MouseOp_$reflection() {
    return union_type("DrawHelpers.MouseOp", [], MouseOp, () => [[], [], [], []]);
}

export class MouseT extends Record {
    constructor(Pos, ScreenMovement, ScreenPage, ShiftKeyDown, Op) {
        super();
        this.Pos = Pos;
        this.ScreenMovement = ScreenMovement;
        this.ScreenPage = ScreenPage;
        this.ShiftKeyDown = ShiftKeyDown;
        this.Op = Op;
    }
}

export function MouseT_$reflection() {
    return record_type("DrawHelpers.MouseT", [], MouseT, () => [["Pos", XYPos_$reflection()], ["ScreenMovement", XYPos_$reflection()], ["ScreenPage", XYPos_$reflection()], ["ShiftKeyDown", bool_type], ["Op", MouseOp_$reflection()]]);
}

export class Circle extends Record {
    constructor(R, Stroke, StrokeWidth, FillOpacity, Fill) {
        super();
        this.R = R;
        this.Stroke = Stroke;
        this.StrokeWidth = StrokeWidth;
        this.FillOpacity = FillOpacity;
        this.Fill = Fill;
    }
}

export function Circle_$reflection() {
    return record_type("DrawHelpers.Circle", [], Circle, () => [["R", float64_type], ["Stroke", string_type], ["StrokeWidth", string_type], ["FillOpacity", float64_type], ["Fill", string_type]]);
}

export class Line extends Record {
    constructor(Stroke, StrokeWidth, StrokeDashArray) {
        super();
        this.Stroke = Stroke;
        this.StrokeWidth = StrokeWidth;
        this.StrokeDashArray = StrokeDashArray;
    }
}

export function Line_$reflection() {
    return record_type("DrawHelpers.Line", [], Line, () => [["Stroke", string_type], ["StrokeWidth", string_type], ["StrokeDashArray", string_type]]);
}

export class Path extends Record {
    constructor(Stroke, StrokeWidth, StrokeDashArray, StrokeLinecap, Fill) {
        super();
        this.Stroke = Stroke;
        this.StrokeWidth = StrokeWidth;
        this.StrokeDashArray = StrokeDashArray;
        this.StrokeLinecap = StrokeLinecap;
        this.Fill = Fill;
    }
}

export function Path_$reflection() {
    return record_type("DrawHelpers.Path", [], Path, () => [["Stroke", string_type], ["StrokeWidth", string_type], ["StrokeDashArray", string_type], ["StrokeLinecap", string_type], ["Fill", string_type]]);
}

export class Polygon extends Record {
    constructor(Stroke, StrokeWidth, FillOpacity, Fill) {
        super();
        this.Stroke = Stroke;
        this.StrokeWidth = StrokeWidth;
        this.FillOpacity = FillOpacity;
        this.Fill = Fill;
    }
}

export function Polygon_$reflection() {
    return record_type("DrawHelpers.Polygon", [], Polygon, () => [["Stroke", string_type], ["StrokeWidth", string_type], ["FillOpacity", float64_type], ["Fill", string_type]]);
}

export class Text$ extends Record {
    constructor(TextAnchor, FontSize, FontWeight, FontFamily, Fill, UserSelect, DominantBaseline) {
        super();
        this.TextAnchor = TextAnchor;
        this.FontSize = FontSize;
        this.FontWeight = FontWeight;
        this.FontFamily = FontFamily;
        this.Fill = Fill;
        this.UserSelect = UserSelect;
        this.DominantBaseline = DominantBaseline;
    }
}

export function Text$_$reflection() {
    return record_type("DrawHelpers.Text", [], Text$, () => [["TextAnchor", string_type], ["FontSize", string_type], ["FontWeight", string_type], ["FontFamily", string_type], ["Fill", string_type], ["UserSelect", string_type], ["DominantBaseline", string_type]]);
}

export const testCanvas = document.createElement("canvas");

export const canvasWidthContext = testCanvas.getContext('2d');

/**
 * To get this to work, note the fonts in the playground.fs test which work well.
 * Add fonts there to test if you like.
 */
export function getTextWidthInPixels(font, txt) {
    const askedFont = join(" ", [font.FontWeight, font.FontSize, font.FontFamily]);
    canvasWidthContext.font = askedFont;
    const textMetrics = canvasWidthContext.measureText(txt);
    const ms = textMetrics.width;
    return ms;
}

export const defaultLine = new Line("Black", "1px", "None");

export const defaultPath = new Path("Black", "1px", "None", "butt", "transparent");

export const defaultPolygon = new Polygon("Black", "1px", 1, "None");

export const defaultCircle = new Circle(5, "Black", "1px", 1, "None");

export const defaultText = new Text$("middle", "10px", "normal", "verdana", "black", "none", "hanging");

export const portCircle = new Circle(5, "Black", "1.0px", defaultCircle.FillOpacity, "Grey");

export const portCircleTarget = new Circle(8, "DodgerBlue", "2.0px", defaultCircle.FillOpacity, "None");

export const cornerCircle = new Circle(5, "Black", "1.0px", defaultCircle.FillOpacity, "Red");

export const uuid = v4;

/**
 * Makes a line ReactElement, wildcard inputs as position can be a number or a string
 */
export function makeLine(x1, y1, x2, y2, lineParameters) {
    return react.createElement("line", {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        stroke: lineParameters.Stroke,
        strokeWidth: lineParameters.StrokeWidth,
        strokeDasharray: lineParameters.StrokeDashArray,
    });
}

/**
 * Makes path attributes for a horizontal upwards-pointing arc radius r
 */
export function makeArcAttr(r) {
    return toText(interpolate("a %.2f%P() %.2f%P() 0 0 0 %.3f%P() 0", [r, r, 2 * r]));
}

/**
 * Makes a partial arc radius d, heights h1,h2 at ends, distance d1,d2 to centre from ends horizontally
 */
export function makePartArcAttr(r, h1, d1, h2, d2) {
    const rot = -(180 / 3.141592653589793) * Math.asin(max(-0.99999, min(0.99999, (h1 - h2) / (d1 + d2))));
    const flag = ((d1 > 0) ? 1 : 0) | 0;
    return toText(interpolate("a %.2f%P() %.2f%P() %.2f%P() 0 %P() %.3f%P() %.3f%P()", [r, r, rot, flag, d1 + d2, h1 - h2]));
}

/**
 * makes a line segment offset dx,dy
 */
export function makeLineAttr(dx, dy) {
    return toText(interpolate("l %.3f%P() %.3f%P()", [dx, dy]));
}

export function makePathAttr(startingControlPoint, endingControlPoint, endingPoint) {
    const y2 = endingPoint.Y;
    const x2 = endingPoint.X;
    const dy2 = endingControlPoint.Y;
    const dy1 = startingControlPoint.Y;
    const dx2 = endingControlPoint.X;
    const dx1 = startingControlPoint.X;
    const dAttrribute = toText(printf("C %f %f, %f %f, %f %f"))(dx1)(dy1)(dx2)(dy2)(x2)(y2);
    return dAttrribute;
}

export function makePathFromAttr(attr, pathParameters) {
    return react.createElement("path", {
        d: attr,
        stroke: pathParameters.Stroke,
        strokeWidth: pathParameters.StrokeWidth,
        strokeDasharray: pathParameters.StrokeDashArray,
        strokeLinecap: pathParameters.StrokeLinecap,
        fill: pathParameters.Fill,
    });
}

/**
 * Makes a path ReactElement, points are to be given as an XYPos record element.
 * Please note that this function is designed to create ONLY "Move to - Bézier Curve"
 * paths (this is what the "M" and "C" attributes stand for) and NOT a generalized SVG path element.
 */
export function makeAnyPath(startingPoint, pathAttr, pathParameters) {
    const y1 = startingPoint.Y;
    const x1 = startingPoint.X;
    const dAttr = toText(printf("M %f %f %s"))(x1)(y1)(pathAttr);
    return makePathFromAttr(dAttr, pathParameters);
}

/**
 * Makes a path ReactElement, points are to be given as an XYPos record element.
 * Please note that this function is designed to create ONLY "Move to - Bézier Curve"
 * paths (this is what the "M" and "C" attributes stand for) and NOT a generalized SVG path element.
 */
export function makePath(startingPoint, startingControlPoint, endingControlPoint, endingPoint, pathParameters) {
    const y2 = endingPoint.Y;
    const y1 = startingPoint.Y;
    const x2 = endingPoint.X;
    const x1 = startingPoint.X;
    const dy2 = endingControlPoint.Y;
    const dy1 = startingControlPoint.Y;
    const dx2 = endingControlPoint.X;
    const dx1 = startingControlPoint.X;
    const dAttrribute = toText(printf("M %f %f C %f %f, %f %f, %f %f"))(x1)(y1)(dx1)(dy1)(dx2)(dy2)(x2)(y2);
    return react.createElement("path", {
        d: dAttrribute,
        stroke: pathParameters.Stroke,
        strokeWidth: pathParameters.StrokeWidth,
        strokeDasharray: pathParameters.StrokeDashArray,
        strokeLinecap: pathParameters.StrokeLinecap,
        fill: pathParameters.Fill,
    });
}

/**
 * Makes a polygon ReactElement, points are to be given as a correctly formatted SVGAttr.Points string
 */
export function makePolygon(points, polygonParameters) {
    return react.createElement("polygon", {
        points: points,
        stroke: polygonParameters.Stroke,
        strokeWidth: polygonParameters.StrokeWidth,
        fill: polygonParameters.Fill,
        fillOpacity: polygonParameters.FillOpacity,
    });
}

/**
 * Makes a circle ReactElement
 */
export function makeCircle(centreX, centreY, circleParameters) {
    return react.createElement("circle", {
        cx: centreX,
        cy: centreY,
        r: circleParameters.R,
        fill: circleParameters.Fill,
        fillOpacity: circleParameters.FillOpacity,
        stroke: circleParameters.Stroke,
        strokeWidth: circleParameters.StrokeWidth,
    });
}

/**
 * Makes a text ReactElement
 */
export function makeText(posX, posY, displayedText, textParameters) {
    const props = [new SVGAttr(44, [posX]), new SVGAttr(57, [posY]), ["style", {
        textAnchor: textParameters.TextAnchor,
        dominantBaseline: textParameters.DominantBaseline,
        fontWeight: textParameters.FontWeight,
        fontSize: textParameters.FontSize,
        fontFamily: textParameters.FontFamily,
        fill: textParameters.Fill,
        userSelect: textParameters.UserSelect,
    }]];
    const children = [toText(printf("%s"))(displayedText)];
    return react.createElement("text", keyValueList(props, 1), ...children);
}

/**
 * makes a two-line text ReactElement
 * Dy parameter determines line spacing
 */
export function makeTwoLinesOfText(posX, posY, line1, line2, textParameters) {
    const props_4 = [new SVGAttr(44, [posX]), new SVGAttr(57, [posY]), ["style", {
        textAnchor: textParameters.TextAnchor,
        dominantBaseline: textParameters.DominantBaseline,
        fontWeight: textParameters.FontWeight,
        fontSize: textParameters.FontSize,
        fill: textParameters.Fill,
        userSelect: textParameters.UserSelect,
    }]];
    const children_4 = [react.createElement("tspan", {}, line1), react.createElement("tspan", {
        dy: "1.2em",
    }, line2)];
    return react.createElement("text", keyValueList(props_4, 1), ...children_4);
}

/**
 * deliver string suitable for HTML color from a HighlightColor type value
 */
export function getColorString(col) {
    return toText(printf("%A"))(col).toLocaleLowerCase();
}

/**
 * Calculates if two bounding boxes intersect by comparing corner coordinates of each box
 */
export function boxesIntersect(box1, box2) {
    if (((min(box1.TopLeft.X, box1.TopLeft.X + box1.W) < max(box2.TopLeft.X, box2.TopLeft.X + box2.W)) && (min(box2.TopLeft.X, box2.TopLeft.X + box2.W) < max(box1.TopLeft.X, box1.TopLeft.X + box1.W))) && (min(box1.TopLeft.Y, box1.TopLeft.Y + box1.H) < max(box2.TopLeft.Y, box2.TopLeft.Y + box2.H))) {
        return min(box2.TopLeft.Y, box2.TopLeft.Y + box2.H) < max(box1.TopLeft.Y, box1.TopLeft.Y + box1.H);
    }
    else {
        return false;
    }
}

//# sourceMappingURL=DrawHelpers.fs.js.map
