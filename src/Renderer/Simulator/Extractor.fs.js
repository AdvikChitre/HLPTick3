import { cons, tryFind, sort as sort_1, singleton, collect, zip, filter, head, isEmpty, map2, mapIndexed, iterate2, forAll2, empty, map, sortBy, item, length } from "../fable_modules/fable-library.4.1.4/List.js";
import { compareArrays, createAtom, equals, compare } from "../fable_modules/fable-library.4.1.4/Util.js";
import { LoadedComponent, ComponentType, XYPos, ReducedCanvasState, Connection, Component } from "../Common/CommonTypes.fs.js";
import { toFail, interpolate, toText, printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { ofSeq } from "../fable_modules/fable-library.4.1.4/Set.js";
import { now } from "../fable_modules/fable-library.4.1.4/Date.js";
import { defaultArgWith, map as map_1, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";

export function sortQBy(byFun, ids) {
    let isSorted = true;
    for (let i = 0; i <= (length(ids) - 2); i++) {
        if (compare(byFun(item(i, ids)), byFun(item(i + 1, ids))) > 0) {
            isSorted = false;
        }
    }
    if (isSorted) {
        return ids;
    }
    else {
        return sortBy(byFun, ids, {
            Compare: compare,
        });
    }
}

/**
 * Formats a ConnectionId for logging purposes
 */
export function logConnId(id) {
    let str_1;
    const str = id;
    str_1 = str;
    return str_1.slice(0, 2 + 1);
}

/**
 * Transform the CanvasState into an f# data structure, with layout data removed (for checking electrically significant changes).
 * Components and connections are sorted to make them order-invariant - selecting components alters order.
 */
export function extractReducedState(state_, state__1) {
    const state = [state_, state__1];
    const connections = state[1];
    const components = state[0];
    const comps = sortQBy((comp_1) => comp_1.Id, map((comp) => {
        if ((((equals(comp.SymbolInfo, void 0) && (comp.H === 0)) && (comp.W === 0)) && (comp.X === 0)) && (comp.Y === 0)) {
            return comp;
        }
        else {
            return new Component(comp.Id, comp.Type, comp.Label, comp.InputPorts, comp.OutputPorts, 0, 0, 0, 0, void 0);
        }
    }, components));
    const conns = sortQBy((conn_1) => conn_1.Id, map((conn) => {
        if (equals(conn.Vertices, empty())) {
            return conn;
        }
        else {
            return new Connection(conn.Id, conn.Source, conn.Target, empty());
        }
    }, connections));
    return new ReducedCanvasState([comps, conns]);
}

/**
 * Is circuit (not geometry) the same for two CanvasStates? fast comparison
 */
export function stateIsEqual(cs1_, cs1__1, cs2_, cs2__1) {
    const cs1 = [cs1_, cs1__1];
    const cs2 = [cs2_, cs2__1];
    const conns1 = cs1[1];
    const comps1 = cs1[0];
    const conns2 = cs2[1];
    const comps2 = cs2[0];
    if (((length(comps1) === length(comps2)) && (length(conns1) === length(conns2))) && forAll2((comp, comp_1) => {
        const comp1 = comp;
        const comp2 = comp_1;
        return (((comp1.Id === comp2.Id) && equals(comp1.InputPorts, comp2.InputPorts)) && equals(comp1.OutputPorts, comp2.OutputPorts)) && equals(comp1.Type, comp2.Type);
    }, comps1, comps2)) {
        return forAll2((conn, conn_1) => {
            const conn1 = conn;
            const conn2 = conn_1;
            const portsEqual = (p1, p2) => {
                if (((p1.Id === p2.Id) && (p1.HostId === p2.HostId)) && equals(p1.PortNumber, p2.PortNumber)) {
                    return equals(p1.PortType, p2.PortType);
                }
                else {
                    return false;
                }
            };
            return portsEqual(conn1.Source, conn2.Source) && portsEqual(conn1.Target, conn2.Target);
        }, conns1, conns2);
    }
    else {
        return false;
    }
}

export function stateIsEqualExInputDefault(cs1_, cs1__1, cs2_, cs2__1) {
    const cs1 = [cs1_, cs1__1];
    const cs2 = [cs2_, cs2__1];
    const conns1 = cs1[1];
    const comps1 = cs1[0];
    const conns2 = cs2[1];
    const comps2 = cs2[0];
    if (((length(comps1) === length(comps2)) && (length(conns1) === length(conns2))) && forAll2((comp, comp_1) => {
        const comp1 = comp;
        const comp2 = comp_1;
        let matchResult;
        if (comp1.Type.tag === 0) {
            if (comp2.Type.tag === 0) {
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
            case 0:
                return ((comp1.Id === comp2.Id) && equals(comp1.InputPorts, comp2.InputPorts)) && equals(comp1.OutputPorts, comp2.OutputPorts);
            default:
                return (((comp1.Id === comp2.Id) && equals(comp1.InputPorts, comp2.InputPorts)) && equals(comp1.OutputPorts, comp2.OutputPorts)) && equals(comp1.Type, comp2.Type);
        }
    }, comps1, comps2)) {
        return forAll2((conn, conn_1) => {
            const conn1 = conn;
            const conn2 = conn_1;
            const portsEqual = (p1, p2) => {
                if (((p1.Id === p2.Id) && (p1.HostId === p2.HostId)) && equals(p1.PortNumber, p2.PortNumber)) {
                    return equals(p1.PortType, p2.PortType);
                }
                else {
                    return false;
                }
            };
            return portsEqual(conn1.Source, conn2.Source) && portsEqual(conn1.Target, conn2.Target);
        }, conns1, conns2);
    }
    else {
        return false;
    }
}

/**
 * Are two lists of vertices are very similar.
 */
export function verticesAreSame(fixedOffset, tolerance, conns1, conns2) {
    const diff = (m1, m2) => {
        if (!equals(m1, m2)) {
            return tolerance;
        }
        else {
            return 0;
        }
    };
    const sq = (x) => (x * x);
    let errSum = 0;
    iterate2((tupledArg, tupledArg_1) => {
        const x1 = tupledArg[0];
        const y1 = tupledArg[1];
        const m1_1 = tupledArg[2];
        const x2 = tupledArg_1[0];
        const y2 = tupledArg_1[1];
        const m2_1 = tupledArg_1[2];
        errSum = (((errSum + sq((x1 - x2) - fixedOffset.X)) + sq((y1 - y2) - fixedOffset.Y)) + diff(m1_1, m2_1));
    }, conns1, conns2);
    if (errSum < tolerance) {
        return length(conns1) === length(conns2);
    }
    else {
        return false;
    }
}

export let debugChangedConnections = createAtom(empty());

export function printConnErrors(connFixedOffset) {
    return (list_2) => mapIndexed((i, tupledArg) => {
        const c1 = tupledArg[0];
        const c2 = tupledArg[1];
        const lengthDiff = (length(c1.Vertices) - length(c2.Vertices)) | 0;
        if (c1.Id !== c2.Id) {
            toConsole(printf("*** Connection Ids don\'t match"));
        }
        if (lengthDiff !== 0) {
            const arg = `Conn ${i} ${logConnId(c1.Id)}: Length diff: ${lengthDiff}`;
            toConsole(printf("%s"))(arg);
        }
        else {
            const arg_1 = toText(interpolate("Conn %P() %P(): Vertices don\'t match: fixedoffset = %.1f%P(),%.1f%P()", [i, logConnId(c1.Id), connFixedOffset.X, connFixedOffset.Y]));
            toConsole(printf("%s"))(arg_1);
            const arg_2 = map2((tupledArg_1, tupledArg_2) => {
                const x1 = tupledArg_1[0];
                const y1 = tupledArg_1[1];
                const x2 = tupledArg_2[0];
                const y2 = tupledArg_2[1];
                return [x1 - x2, y1 - y2];
            }, c1.Vertices, c2.Vertices);
            toConsole(printf("Vertex deltas: %A"))(arg_2);
        }
        return [c1, c2];
    }, list_2);
}

/**
 * Are two lists of connections identical
 */
export function compareConns(tolerance, conns1, conns2) {
    let b, a, b_1, a_1;
    const connIdA = (conns) => sortQBy((conn) => conn.Id, conns);
    const connsA1 = connIdA(conns1);
    const connsA2 = connIdA(conns2);
    let connFixedOffset;
    const xy = (tupledArg) => {
        const x = tupledArg[0];
        const y = tupledArg[1];
        return new XYPos(x, y);
    };
    let matchResult, c1, c2;
    if (!isEmpty(connsA1)) {
        if (!isEmpty(connsA2)) {
            matchResult = 0;
            c1 = head(connsA1);
            c2 = head(connsA2);
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
            const left = xy(item(0, c1.Vertices));
            const right = xy(item(0, c2.Vertices));
            connFixedOffset = (new XYPos(left.X - right.X, left.Y - right.Y));
            break;
        }
        default:
            connFixedOffset = (new XYPos(0, 0));
    }
    if ((b = connsA2, (a = connsA1, length(a) !== length(b)))) {
        const b_2 = connsA2;
        const a_2 = connsA1;
        return false;
    }
    else if ((b_1 = connsA2, (a_1 = connsA1, !forAll2((c1_1, c2_1) => verticesAreSame(connFixedOffset, tolerance, c1_1.Vertices, c2_1.Vertices), a_1, b_1)))) {
        const b_3 = connsA2;
        const a_3 = connsA1;
        const lst = map((badConn) => badConn.Id, map((tuple) => tuple[0], filter((tupledArg_1) => {
            const c1_2 = tupledArg_1[0];
            const c2_2 = tupledArg_1[1];
            return !verticesAreSame(connFixedOffset, tolerance, c1_2.Vertices, c2_2.Vertices);
        }, zip(a_3, b_3))));
        debugChangedConnections(lst);
        return false;
    }
    else {
        return true;
    }
}

/**
 * Are two lists of components identical
 */
export function compareComps(tolerance, comps1, comps2) {
    const isClose = (a, b) => (((a - b) * (a - b)) < tolerance);
    const compIdA = (comps) => sortQBy((comp) => comp.Id, comps);
    const compsA1 = compIdA(comps1);
    const compsA2 = compIdA(comps2);
    if (length(compsA1) === length(compsA2)) {
        return forAll2((c1, c2) => (isClose(c1.X, c2.X) && isClose(c1.Y, c2.Y)), compsA1, compsA2);
    }
    else {
        return false;
    }
}

/**
 * Robust comparison of two schematics. Tolerance determines how similar
 * counts as equal.
 * cannot use equality because float vertices may not be identical
 * use to detemine whether schematic needs to be saved
 * NB for electrical circuit comparison use extractReducedState.
 */
export function compareCanvas(tolerance, _arg2_, _arg2__1, _arg1_, _arg1__1) {
    const _arg = [_arg2_, _arg2__1];
    const _arg_1 = [_arg1_, _arg1__1];
    const conns1 = _arg[1];
    const comps1 = _arg[0];
    const conns2 = _arg_1[1];
    const comps2 = _arg_1[0];
    const reduce = (comps) => sortQBy((comp) => comp.Id, comps);
    const compsOk = equals(reduce(comps1), reduce(comps2));
    const compsSamePos = compareComps(tolerance, comps1, comps2);
    const connsOk = compareConns(tolerance, conns1, conns2);
    const comparesEqual = (compsOk && compsSamePos) && connsOk;
    return comparesEqual;
}

/**
 * Compare the name and IOs of two sheets as loadedcomponents
 * For backups, if these chnage something major has happened
 */
export function compareIOs(ldc1, ldc2) {
    if (ofSeq(ldc1.InputLabels, {
        Compare: compareArrays,
    }).Equals(ofSeq(ldc2.InputLabels, {
        Compare: compareArrays,
    }))) {
        return ldc1.Name === ldc2.Name;
    }
    else {
        return false;
    }
}

/**
 * Is circuit (not geometry) the same for two LoadedComponents? They must also have the same name
 */
export function loadedComponentIsEqual(ldc1, ldc2) {
    let tupledArg, tupledArg_1;
    if ((equals(ldc1.InputLabels, ldc2.InputLabels) && equals(ldc1.OutputLabels, ldc2.OutputLabels)) && ((tupledArg = ldc1.CanvasState, (tupledArg_1 = ldc2.CanvasState, stateIsEqual(tupledArg[0], tupledArg[1], tupledArg_1[0], tupledArg_1[1]))))) {
        return ldc1.Name === ldc2.Name;
    }
    else {
        return false;
    }
}

/**
 * Is circuit (not geometry) the same for two LoadedComponents? They must also have the same name
 */
export function loadedComponentIsEqualExInputDefault(ldc1, ldc2) {
    let tupledArg, tupledArg_1;
    if ((equals(ldc1.InputLabels, ldc2.InputLabels) && equals(ldc1.OutputLabels, ldc2.OutputLabels)) && ((tupledArg = ldc1.CanvasState, (tupledArg_1 = ldc2.CanvasState, stateIsEqualExInputDefault(tupledArg[0], tupledArg[1], tupledArg_1[0], tupledArg_1[1]))))) {
        return ldc1.Name === ldc2.Name;
    }
    else {
        return false;
    }
}

/**
 * get sheet I/O labels in correct order based on position of components
 */
export function getOrderedCompLabels(compType, _arg1_, _arg1__1) {
    const comps = _arg1_;
    return map((tuple_1) => tuple_1[1], sortBy((tuple) => tuple[0], collect((comp) => {
        const sortKey = [comp.Y, comp.X];
        const matchValue = comp.Type;
        let matchResult, defaultVal, n, n_1;
        switch (matchValue.tag) {
            case 0: {
                if (compType.tag === 0) {
                    matchResult = 0;
                    defaultVal = matchValue.fields[1];
                    n = matchValue.fields[0];
                }
                else {
                    matchResult = 2;
                }
                break;
            }
            case 1: {
                if (compType.tag === 1) {
                    matchResult = 1;
                    n_1 = matchValue.fields[0];
                }
                else {
                    matchResult = 2;
                }
                break;
            }
            default:
                matchResult = 2;
        }
        switch (matchResult) {
            case 0:
                return singleton([sortKey, [comp.Label, n]]);
            case 1:
                return singleton([sortKey, [comp.Label, n_1]]);
            default:
                return empty();
        }
    }, comps), {
        Compare: compareArrays,
    }));
}

/**
 * Extract the labels and bus widths of the inputs and outputs nodes as a signature.
 * Form is inputs,outputs
 */
export function parseDiagramSignature(canvasState_, canvasState__1) {
    const canvasState = [canvasState_, canvasState__1];
    const inputs = getOrderedCompLabels(new ComponentType(0, [0, void 0]), canvasState[0], canvasState[1]);
    const outputs = getOrderedCompLabels(new ComponentType(1, [0]), canvasState[0], canvasState[1]);
    return [inputs, outputs];
}

/**
 * extract the fields compared to check circuit equality
 */
export function extractLoadedSimulatorComponent(canvas_, canvas__1, name) {
    const canvas = [canvas_, canvas__1];
    const patternInput = parseDiagramSignature(canvas[0], canvas[1]);
    const outputs = patternInput[1];
    const inputs = patternInput[0];
    const ldc = new LoadedComponent(name, now(), "", void 0, canvas, inputs, outputs, void 0, void 0);
    return ldc;
}

/**
 * Returns true if project exists and ldc is electrically identical to same sheet in project
 * canvasState must be the project currently open state.
 */
export function loadedComponentIsSameAsProject(canvasState_, canvasState__1, ldc, p) {
    let tupledArg_2, p_1, name;
    const canvasState = [canvasState_, canvasState__1];
    const ldcIsEq = (ldc1, ldc2) => {
        if (equals(ldc1.InputLabels, ldc2.InputLabels) && equals(ldc1.OutputLabels, ldc2.OutputLabels)) {
            const tupledArg = ldc1.CanvasState;
            const tupledArg_1 = ldc2.CanvasState;
            return stateIsEqual(tupledArg[0], tupledArg[1], tupledArg_1[0], tupledArg_1[1]);
        }
        else {
            return false;
        }
    };
    const matchValue = ldc.Name;
    let matchResult, name_1, p_2, name_2, p_3;
    if (matchValue === "") {
        matchResult = 0;
    }
    else if (p != null) {
        if ((p_1 = p, (name = matchValue, name === p_1.OpenFileName))) {
            matchResult = 1;
            name_1 = matchValue;
            p_2 = p;
        }
        else {
            matchResult = 2;
            name_2 = matchValue;
            p_3 = p;
        }
    }
    else {
        matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return false;
        case 1: {
            const patternInput = parseDiagramSignature(canvasState[0], canvasState[1]);
            const outs = patternInput[1];
            const ins = patternInput[0];
            const sort = (list) => sort_1(list, {
                Compare: compare,
            });
            if (((tupledArg_2 = ldc.CanvasState, stateIsEqual(canvasState[0], canvasState[1], tupledArg_2[0], tupledArg_2[1]))) && equals(sort(ins), sort(ldc.InputLabels))) {
                return equals(sort(outs), sort(ldc.OutputLabels));
            }
            else {
                return false;
            }
        }
        default:
            return defaultArg(map_1((ldc$0027) => ldcIsEq(ldc$0027, ldc), tryFind((ldc_1) => (ldc_1.Name === name_2), p_3.LoadedComponents)), false);
    }
}

/**
 * add given name,state to loadedcomponent lits as a loaded component (overwriting existing if needed)
 */
export function addStateToLoadedComponents(openFileName, canvasState_, canvasState__1, loadedComponents) {
    const canvasState = [canvasState_, canvasState__1];
    const patternInput = parseDiagramSignature(canvasState[0], canvasState[1]);
    const outs = patternInput[1];
    const ins = patternInput[0];
    const ldc = new LoadedComponent(openFileName, now(), "", void 0, canvasState, ins, outs, void 0, void 0);
    return cons(ldc, filter((ldc_1) => (ldc_1.Name !== openFileName), loadedComponents));
}

/**
 * the inverse of addStateToLoadedConponents
 * The loadedComponent list does NOT include diagramName
 */
export function getStateAndDependencies(diagramName, ldcs) {
    return defaultArgWith(map_1((cs) => [diagramName, cs, filter((ldc_2) => (ldc_2.Name !== diagramName), ldcs)], map_1((ldc_1) => ldc_1.CanvasState, tryFind((ldc) => (ldc.Name === diagramName), ldcs))), () => toFail(`Error - can't find ${diagramName} in dependencies`));
}

//# sourceMappingURL=Extractor.fs.js.map
