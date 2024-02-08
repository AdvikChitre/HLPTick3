import { topLeft_, STransform, Rotation, Component, XYPos, Edge } from "../Common/CommonTypes.fs.js";
import { toFail, printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { containsKey, empty, FSharpMap__get_Item, add, map } from "../fable_modules/fable-library.4.1.4/Map.js";
import { reverse, ofArray, fold } from "../fable_modules/fable-library.4.1.4/List.js";
import { sign, compare } from "../fable_modules/fable-library.4.1.4/Util.js";
import { SymbolT_symbolOf_, SymbolT_labelBoundingBox_, SymbolT_scaleF_, SymbolT_posOfSym_, SymbolT_Model, SymbolT_ShowCorners, SymbolT_appearance_, SymbolT_showCorners_, SymbolT_Symbol, SymbolT_PortMaps } from "../Model/DrawModelType.fs.js";
import { calcLabelBoundingBox, autoScaleHAndW } from "./Symbol.fs.js";
import { defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import { Optic_Map, Optic_Map_op_HatPercent_Z1462312A, Optic_Get, Optic_Get_op_HatDot_Z146BA564, Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { Cmd_none } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";

export function rotateSide(rotation, side) {
    switch (rotation.tag) {
        case 1:
            switch (side.tag) {
                case 2:
                    return new Edge(1, []);
                case 1:
                    return new Edge(3, []);
                case 3:
                    return new Edge(0, []);
                default:
                    return new Edge(2, []);
            }
        case 2:
            switch (side.tag) {
                case 1:
                    return new Edge(0, []);
                case 2:
                    return new Edge(3, []);
                case 3:
                    return new Edge(2, []);
                default:
                    return new Edge(1, []);
            }
        case 3:
            switch (side.tag) {
                case 2:
                    return new Edge(0, []);
                case 1:
                    return new Edge(2, []);
                case 3:
                    return new Edge(1, []);
                default:
                    return new Edge(3, []);
            }
        default:
            return side;
    }
}

/**
 * rotates the portMap information left or right as per rotation
 */
export function rotatePortInfo(rotation, portMaps) {
    toConsole(printf("running rotatePortInfo"));
    const newPortOrientation = map((id, side) => rotateSide(rotation, side), portMaps.Orientation);
    const rotatePortList = (currPortOrder, side_1) => add(rotateSide(rotation, side_1), FSharpMap__get_Item(portMaps.Order, side_1), currPortOrder);
    const newPortOrder = fold(rotatePortList, empty({
        Compare: compare,
    }), ofArray([new Edge(0, []), new Edge(2, []), new Edge(1, []), new Edge(3, [])]));
    return new SymbolT_PortMaps(newPortOrder, newPortOrientation);
}

export function adjustPosForRotation(rotation, h, w, pos) {
    const posOffset = (rotation.tag === 1) ? (new XYPos((w / 2) - (h / 2), (h / 2) - (w / 2))) : ((rotation.tag === 3) ? (new XYPos((w / 2) - (h / 2), (h / 2) - (w / 2))) : toFail(printf("Can\'t encounter Degree0 or Degree180 here in SymbolResizeHelpers/adjustPosForRotation function")));
    const left = pos;
    const right = posOffset;
    return new XYPos(left.X - right.X, left.Y - right.Y);
}

/**
 * Takes a symbol in and returns the same symbol rotated left or right
 */
export function rotateSymbol(rotation, sym) {
    let left_1, right_1, pos, left, right, r1, rot, r2, rot90, rot180, r1_1, r2_1, rot90_1, rot180_1;
    if (sym.Component.Type.tag === 26) {
        const portMaps = rotatePortInfo(rotation, sym.PortMaps);
        const getHW = (sym_1) => (new XYPos(sym_1.Component.W, sym_1.Component.H));
        const sym$0027 = autoScaleHAndW(new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, sym.LabelHasDefaultPos, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, sym.Annotation, sym.Moving, sym.IsClocked, sym.STransform, sym.ReversedInputPorts, portMaps, sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget));
        return new SymbolT_Symbol((left_1 = sym.Pos, (right_1 = ((pos = ((left = getHW(sym), (right = getHW(sym$0027), new XYPos(left.X - right.X, left.Y - right.Y)))), new XYPos(pos.X * 0.5, pos.Y * 0.5))), new XYPos(left_1.X + right_1.X, left_1.Y + right_1.Y))), sym$0027.CentrePos, sym$0027.OffsetFromBBCentre, sym$0027.InWidth0, sym$0027.InWidth1, sym$0027.InWidths, sym$0027.LabelBoundingBox, sym$0027.LabelHasDefaultPos, sym$0027.LabelRotation, sym$0027.Appearance, sym$0027.Id, sym$0027.Component, sym$0027.Annotation, sym$0027.Moving, sym$0027.IsClocked, sym$0027.STransform, sym$0027.ReversedInputPorts, sym$0027.PortMaps, sym$0027.HScale, sym$0027.VScale, sym$0027.MovingPort, sym$0027.MovingPortTarget);
    }
    else {
        let patternInput_1;
        const sym_3 = sym;
        const comp = sym_3.Component;
        const matchValue_1 = defaultArg(sym_3.HScale, 1);
        const vS = defaultArg(sym_3.VScale, 1);
        const hS = matchValue_1;
        const matchValue_2 = sym_3.STransform.Rotation;
        switch (matchValue_2.tag) {
            case 1:
            case 3: {
                patternInput_1 = [comp.W * hS, comp.H * vS];
                break;
            }
            default:
                patternInput_1 = [comp.H * vS, comp.W * hS];
        }
        const w = patternInput_1[1];
        const h = patternInput_1[0];
        const newPos = adjustPosForRotation(rotation, h, w, sym.Pos);
        let newComponent;
        const inputRecord = sym.Component;
        newComponent = (new Component(inputRecord.Id, inputRecord.Type, inputRecord.Label, inputRecord.InputPorts, inputRecord.OutputPorts, newPos.X, newPos.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo));
        const newSTransform = sym.STransform.flipped ? (new STransform((r1 = ((rot = rotation, (rot.tag === 2) ? (new Rotation(0, [])) : ((rot.tag === 1) ? (new Rotation(3, [])) : ((rot.tag === 3) ? (new Rotation(1, [])) : (new Rotation(2, [])))))), (r2 = sym.STransform.Rotation, (rot90 = ((rot_1) => {
            switch (rot_1.tag) {
                case 1:
                    return new Rotation(2, []);
                case 2:
                    return new Rotation(3, []);
                case 3:
                    return new Rotation(0, []);
                default:
                    return new Rotation(1, []);
            }
        }), (rot180 = ((rot_1_1) => {
            switch (rot_1_1.tag) {
                case 1:
                    return new Rotation(3, []);
                case 2:
                    return new Rotation(0, []);
                case 3:
                    return new Rotation(1, []);
                default:
                    return new Rotation(2, []);
            }
        }), (r1.tag === 1) ? rot90(r2) : ((r1.tag === 2) ? rot180(r2) : ((r1.tag === 3) ? rot180(rot90(r2)) : r2)))))), sym.STransform.flipped)) : (new STransform((r1_1 = rotation, (r2_1 = sym.STransform.Rotation, (rot90_1 = ((rot_2) => {
            switch (rot_2.tag) {
                case 1:
                    return new Rotation(2, []);
                case 2:
                    return new Rotation(3, []);
                case 3:
                    return new Rotation(0, []);
                default:
                    return new Rotation(1, []);
            }
        }), (rot180_1 = ((rot_1_2) => {
            switch (rot_1_2.tag) {
                case 1:
                    return new Rotation(3, []);
                case 2:
                    return new Rotation(0, []);
                case 3:
                    return new Rotation(1, []);
                default:
                    return new Rotation(2, []);
            }
        }), (r1_1.tag === 1) ? rot90_1(r2_1) : ((r1_1.tag === 2) ? rot180_1(r2_1) : ((r1_1.tag === 3) ? rot180_1(rot90_1(r2_1)) : r2_1)))))), sym.STransform.flipped));
        return calcLabelBoundingBox(new SymbolT_Symbol(newPos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, true, sym.LabelRotation, sym.Appearance, sym.Id, newComponent, sym.Annotation, sym.Moving, sym.IsClocked, newSTransform, sym.ReversedInputPorts, rotatePortInfo(rotation, sym.PortMaps), sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget));
    }
}

export function rotateAntiClockByAng(rotAngle_mut, sym_mut) {
    rotateAntiClockByAng:
    while (true) {
        const rotAngle = rotAngle_mut, sym = sym_mut;
        if (rotAngle.tag === 0) {
            return sym;
        }
        else {
            const deg = rotAngle;
            const newSym = rotateSymbol(new Rotation(3, []), sym);
            switch (deg.tag) {
                case 2: {
                    rotAngle_mut = (new Rotation(1, []));
                    sym_mut = newSym;
                    continue rotateAntiClockByAng;
                }
                case 3: {
                    rotAngle_mut = (new Rotation(2, []));
                    sym_mut = newSym;
                    continue rotateAntiClockByAng;
                }
                case 0:
                    return toFail(printf("Can\'t encounter Degree0 here"));
                default:
                    return newSym;
            }
        }
        break;
    }
}

/**
 * Flips a side horizontally
 */
export function flipSideHorizontal(edge) {
    switch (edge.tag) {
        case 2:
        case 3:
            return rotateSide(new Rotation(2, []), edge);
        default:
            return edge;
    }
}

/**
 * Takes in a symbol and returns the same symbol flipped
 */
export function flipSymbol(orientation, sym) {
    const portOrientation = map((id, side) => flipSideHorizontal(side), sym.PortMaps.Orientation);
    const flipPortList = (currPortOrder, side_1) => add(flipSideHorizontal(side_1), FSharpMap__get_Item(sym.PortMaps.Order, side_1), currPortOrder);
    const portOrder = map((edge, order) => reverse(order), fold(flipPortList, empty({
        Compare: compare,
    }), ofArray([new Edge(0, []), new Edge(2, []), new Edge(1, []), new Edge(3, [])])));
    const newSTransform = new STransform(sym.STransform.Rotation, !sym.STransform.flipped);
    const sym_2 = calcLabelBoundingBox(new SymbolT_Symbol(sym.Pos, sym.CentrePos, sym.OffsetFromBBCentre, sym.InWidth0, sym.InWidth1, sym.InWidths, sym.LabelBoundingBox, true, sym.LabelRotation, sym.Appearance, sym.Id, sym.Component, sym.Annotation, sym.Moving, sym.IsClocked, newSTransform, sym.ReversedInputPorts, new SymbolT_PortMaps(portOrder, portOrientation), sym.HScale, sym.VScale, sym.MovingPort, sym.MovingPortTarget));
    if (orientation === "flipVertical") {
        return rotateSymbol(new Rotation(2, []), sym_2);
    }
    else {
        return sym_2;
    }
}

export function changeSymbolCorners(showCorners, sym) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_showCorners_)(SymbolT_appearance_))(showCorners)(sym);
}

export function hideCompCorners(model) {
    const resetSymbols = map((_arg, sym) => changeSymbolCorners(new SymbolT_ShowCorners(1, []), sym), model.Symbols);
    return new SymbolT_Model(resetSymbols, model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
}

/**
 * Given a model it will change the appearance of all the specified components' corners
 */
export function showCompCorners(model, cornerShow, compIds) {
    let resetSymbols;
    const model$0027 = hideCompCorners(model);
    resetSymbols = model$0027.Symbols;
    const updateSymbolInMap = (prevMap, cId) => {
        let value;
        return (containsKey(cId, model.Symbols) ? ((value = changeSymbolCorners(cornerShow, FSharpMap__get_Item(model.Symbols, cId)), (table) => add(cId, value, table))) : ((x) => x))(prevMap);
    };
    const newSymbols = fold(updateSymbolInMap, resetSymbols, compIds);
    return new SymbolT_Model(newSymbols, model.CopiedSymbols, model.Ports, model.InputPortsConnected, model.OutputPortsConnected, model.Theme, model.HintPane);
}

/**
 * Resize a custom component so corner follows current mouse location.
 * Note that we expect current mouse to be close to one of the corners.
 */
export function manualSymbolResize(model, compId, fixedCornerLoc, mPos) {
    let y_3, x_3, y_4, x_4, value_3, left_2, right_2;
    toConsole(printf("running manualSymbolResize"));
    const symbol = FSharpMap__get_Item(model.Symbols, compId);
    const symPos = Optic_Get_op_HatDot_Z146BA564(new Optic_Get(), SymbolT_posOfSym_)(symbol);
    const comp = symbol.Component;
    const scale = Optic_Get_op_HatDot_Z146BA564(new Optic_Get(), SymbolT_scaleF_)(symbol);
    const outerProduct = (_arg, _arg_1) => {
        const y = _arg.Y;
        const x = _arg.X;
        const y1 = _arg_1.Y;
        const x1 = _arg_1.X;
        return new XYPos(x * x1, y * y1);
    };
    let symXyAreSwapped;
    const matchValue = symbol.STransform.Rotation;
    switch (matchValue.tag) {
        case 1:
        case 3: {
            symXyAreSwapped = true;
            break;
        }
        default:
            symXyAreSwapped = false;
    }
    const compBox = new XYPos(comp.W, comp.H);
    const swapXYByRot = (_arg_2) => {
        const y_1 = _arg_2.Y;
        const x_1 = _arg_2.X;
        if (symXyAreSwapped) {
            return new XYPos(y_1, x_1);
        }
        else {
            return new XYPos(x_1, y_1);
        }
    };
    const matchValue_1 = swapXYByRot(outerProduct(compBox, scale));
    const symBox = swapXYByRot(compBox);
    const scaledSymBox = matchValue_1;
    const outerProduct_1 = (a, b) => (new XYPos(a.X * b.X, a.Y * b.Y));
    const xyApplyF = (f, xy) => (new XYPos(f(xy.X), f(xy.Y)));
    let diag;
    const left = mPos;
    const right = fixedCornerLoc;
    diag = (new XYPos(left.X - right.X, left.Y - right.Y));
    const invert = xyApplyF(sign, diag);
    const posDiag = outerProduct_1(diag, invert);
    let deltaDiag;
    const left_1 = posDiag;
    const right_1 = scaledSymBox;
    deltaDiag = (new XYPos(left_1.X - right_1.X, left_1.Y - right_1.Y));
    const scale$0027 = new XYPos(posDiag.X / symBox.X, posDiag.Y / symBox.Y);
    let posDelta;
    let tupledArg;
    const matchValue_3 = ~~invert.X | 0;
    const matchValue_4 = ~~invert.Y | 0;
    let matchResult;
    switch (matchValue_3) {
        case -1: {
            switch (matchValue_4) {
                case -1: {
                    matchResult = 2;
                    break;
                }
                case 1: {
                    matchResult = 1;
                    break;
                }
                default:
                    matchResult = 3;
            }
            break;
        }
        case 1: {
            switch (matchValue_4) {
                case -1: {
                    matchResult = 0;
                    break;
                }
                default:
                    matchResult = 3;
            }
            break;
        }
        default:
            matchResult = 3;
    }
    switch (matchResult) {
        case 0: {
            tupledArg = [0, -deltaDiag.Y];
            break;
        }
        case 1: {
            tupledArg = [-deltaDiag.X, 0];
            break;
        }
        case 2: {
            tupledArg = [-deltaDiag.X, -deltaDiag.Y];
            break;
        }
        default:
            tupledArg = [0, 0];
    }
    const x_2 = tupledArg[0];
    const y_2 = tupledArg[1];
    posDelta = (new XYPos(x_2, y_2));
    let newSymbol;
    const scale$0027$0027 = swapXYByRot(scale$0027);
    newSymbol = Optic_Map_op_HatPercent_Z1462312A(new Optic_Map(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), topLeft_)(SymbolT_labelBoundingBox_))((lPos) => {
        const left_3 = lPos;
        const right_3 = posDelta;
        return new XYPos(left_3.X + right_3.X, left_3.Y + right_3.Y);
    })(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), SymbolT_showCorners_)(SymbolT_appearance_))(new SymbolT_ShowCorners(0, []))(((y_3 = scale$0027.Y, (x_3 = scale$0027.X, (x_3 <= 0.001) ? true : (y_3 <= 0.001)))) ? ((y_4 = scale$0027.Y, (x_4 = scale$0027.X, symbol))) : ((value_3 = ((left_2 = posDelta, (right_2 = symPos, new XYPos(left_2.X + right_2.X, left_2.Y + right_2.Y)))), Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_posOfSym_)(value_3)))(Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_scaleF_)(scale$0027$0027)(symbol))));
    return [Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), SymbolT_symbolOf_(compId))(newSymbol)(model), Cmd_none()];
}

//# sourceMappingURL=SymbolResizeHelpers.fs.js.map
