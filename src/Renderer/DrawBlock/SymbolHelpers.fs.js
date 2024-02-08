import { defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { XYPos } from "../Common/CommonTypes.fs.js";
import { map, equalsWith } from "../fable_modules/fable-library.4.1.4/Array.js";
import { defaultOf, equals } from "../fable_modules/fable-library.4.1.4/Util.js";

/**
 * Returns the XYPos of custom component symbol corners relative to Pos (= LH corner)
 */
export function getCustomSymCorners(sym) {
    const comp = sym.Component;
    if (comp.Type.tag === 26) {
        const getScale = (option) => defaultArg(option, 1);
        const matchValue_1 = getScale(sym.HScale) * comp.W;
        const yDim = getScale(sym.VScale) * comp.H;
        const xDim = matchValue_1;
        let patternInput_1;
        const matchValue_3 = sym.STransform.Rotation;
        switch (matchValue_3.tag) {
            case 1:
            case 3: {
                patternInput_1 = [yDim, xDim];
                break;
            }
            default:
                patternInput_1 = [xDim, yDim];
        }
        const yDim$0027 = patternInput_1[1];
        const xDim$0027 = patternInput_1[0];
        return [new XYPos(0, 0), new XYPos(0, yDim$0027), new XYPos(xDim$0027, yDim$0027), new XYPos(xDim$0027, 0)];
    }
    else {
        return new Array(0);
    }
}

export function translatePoints(vector, points) {
    if (!equalsWith(equals, points, defaultOf()) && (points.length === 0)) {
        return [];
    }
    else {
        return map((y_1) => {
            const left = vector;
            const right = y_1;
            return new XYPos(left.X + right.X, left.Y + right.Y);
        }, points);
    }
}

/**
 * Scale a point as a vector
 */
export function scalePoint(scale, point) {
    return new XYPos(point.X * scale.X, point.Y * scale.Y);
}

/**
 * Apply scaling centered at fixedPos (p0) to vector movePos (p1)
 * In matrix operations: (p0-p1) * M + p1
 */
export function scaleWrtFixed(scale, fixedPos, movePos) {
    let left, right;
    const left_1 = fixedPos;
    const right_1 = scalePoint(scale, (left = fixedPos, (right = movePos, new XYPos(left.X - right.X, left.Y - right.Y))));
    return new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y);
}

export function getNewPos(fixedPos, scaleF, sym) {
    const transform = new XYPos(scaleF.X / defaultArg(sym.HScale, 1), scaleF.Y / defaultArg(sym.VScale, 1));
    return scaleWrtFixed(transform, fixedPos, sym.Pos);
}

//# sourceMappingURL=SymbolHelpers.fs.js.map
