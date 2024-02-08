import { Union, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { CustomComponentType, ShiftComponentType, NBitsArithmetic, ComponentType, PortType, Connection, Port, Component, Port_$reflection, Connection_$reflection, Component_$reflection } from "../Common/CommonTypes.fs.js";
import { option_type, string_type, union_type, record_type, int32_type, list_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { parse } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { uuid } from "../Common/DrawHelpers.fs.js";
import { reduce, zip, tryFindIndex, tryFind as tryFind_1, chunkBySize, last as last_1, sortBy, isEmpty, contains as contains_1, reverse, ofSeq as ofSeq_1, map as map_5, filter, splitAt, tail as tail_3, head as head_1, fold, ofArray, item as item_4, mapIndexed, append, length, singleton, collect, empty } from "../fable_modules/fable-library.4.1.4/List.js";
import { toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { defaultArg, value as value_3 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { fold as fold_3, FSharpMap__get_Keys, values, toList as toList_1, FSharpMap__get_Values, empty as empty_2, filter as filter_1, keys, ofList, add as add_1, FSharpMap__TryFind, tryFind, find } from "../fable_modules/fable-library.4.1.4/Map.js";
import { List_distinct } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { compare, stringHash, int32ToString, comparePrimitives, curry3, uncurry2, safeHash, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { ofList as ofList_1, ofArray as ofArray_1, union, remove, ofSeq, empty as empty_1, fold as fold_1, add, contains } from "../fable_modules/fable-library.4.1.4/Set.js";
import { append as append_1, sortBy as sortBy_1, fold as fold_2, map as map_6 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { NumberT, NumberT_$reflection, PrimaryT_$reflection } from "./VerilogTypes.fs.js";
import { toDecimal, strToIntCheckWidth } from "../Simulator/NumberHelpers.fs.js";
import { min, max } from "../fable_modules/fable-library.4.1.4/Double.js";
import { compare as compare_1, toUInt32, op_Subtraction, fromInt32, toInt64 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { pow2int64 } from "../Common/Helpers.fs.js";
import { getAlwaysStatement, statementToNode, getItem, getNonBlockingAssignmentsWithLocation, getBlockingAssignments, ASTNode, getContAssignments, foldAST } from "./VerilogAST.fs.js";
import { getDeclarations, getModuleInstantiationStatements, getModuleInstantiationOutputPrimaries } from "./ErrorCheckHelpers.fs.js";
import { getWireSizeMap, getPortSizeAndLocationMap } from "./ErrorCheck.fs.js";

export class Circuit extends Record {
    constructor(Comps, Conns, Out, OutWidth) {
        super();
        this.Comps = Comps;
        this.Conns = Conns;
        this.Out = Out;
        this.OutWidth = (OutWidth | 0);
    }
}

export function Circuit_$reflection() {
    return record_type("SheetCreator.Circuit", [], Circuit, () => [["Comps", list_type(Component_$reflection())], ["Conns", list_type(Connection_$reflection())], ["Out", Port_$reflection()], ["OutWidth", int32_type]]);
}

export class Slice extends Record {
    constructor(MSB, LSB) {
        super();
        this.MSB = (MSB | 0);
        this.LSB = (LSB | 0);
    }
}

export function Slice_$reflection() {
    return record_type("SheetCreator.Slice", [], Slice, () => [["MSB", int32_type], ["LSB", int32_type]]);
}

export class LHSType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["OutputPort", "Wire"];
    }
}

export function LHSType_$reflection() {
    return union_type("SheetCreator.LHSType", [], LHSType, () => [[], []]);
}

export class BitMapping extends Record {
    constructor(Slice, Circuit, LHSType) {
        super();
        this.Slice = Slice;
        this.Circuit = Circuit;
        this.LHSType = LHSType;
    }
}

export function BitMapping_$reflection() {
    return record_type("SheetCreator.BitMapping", [], BitMapping, () => [["Slice", Slice_$reflection()], ["Circuit", Circuit_$reflection()], ["LHSType", LHSType_$reflection()]]);
}

/**
 * Helper function to find a port's width from the range definition of IODecl
 */
export function getWidthFromRange(range) {
    if (range != null) {
        const r = range;
        const start = parse(r.Start, 511, false, 32) | 0;
        return (start + 1) | 0;
    }
    else {
        return 1;
    }
}

/**
 * Create a component (type: Component) based on the parameters given
 */
export function createComponent$0027(id, compType, name, inputPorts, outputPorts) {
    return new Component(id, compType, name.toLocaleUpperCase(), inputPorts, outputPorts, 0, 0, 30, 30, void 0);
}

/**
 * Create a port (type: Port) based on the parameters given
 */
export function createPort(hostId, portType, portNumber) {
    return new Port(uuid(), portNumber, portType, hostId);
}

/**
 * Connect source with target returning the connection (type: Connection)
 */
export function createConnection(source, target) {
    const source$0027 = new Port(source.Id, void 0, source.PortType, source.HostId);
    const target$0027 = new Port(target.Id, void 0, target.PortType, target.HostId);
    return new Connection(uuid(), source$0027, target$0027, empty());
}

export function createPortList(ofType, number, hostId) {
    return collect((i) => singleton(createPort(hostId, ofType, i)), toList(rangeDouble(0, 1, number - 1)));
}

/**
 * Main component creation function
 * Find all the parameters required for component creation
 * based on the component Type and the name(label) given
 * Returns the created component
 */
export function createComponent(compType, name) {
    let patternInput;
    switch (compType.tag) {
        case 6:
        case 25:
        case 47:
        case 8:
        case 23:
        case 3: {
            patternInput = [1, 1];
            break;
        }
        case 1:
        case 2: {
            patternInput = [1, 0];
            break;
        }
        case 22:
        case 24:
        case 21:
        case 46:
        case 27: {
            patternInput = [2, 1];
            break;
        }
        case 11: {
            patternInput = [3, 1];
            break;
        }
        case 17: {
            patternInput = [3, 2];
            break;
        }
        case 48:
        case 0:
        case 7: {
            patternInput = [0, 1];
            break;
        }
        case 33: {
            patternInput = [1, 1];
            break;
        }
        case 38: {
            patternInput = [0, 1];
            break;
        }
        case 39: {
            patternInput = [1, 1];
            break;
        }
        case 26: {
            const custom = compType.fields[0];
            patternInput = [length(custom.InputLabels), length(custom.OutputLabels)];
            break;
        }
        default:
            patternInput = toFail(`Undefined component properties ${compType}`);
    }
    const outputPortNo = patternInput[1] | 0;
    const inputPortNo = patternInput[0] | 0;
    const id = uuid();
    const inputPorts = createPortList(new PortType(0, []), inputPortNo, id);
    const outputPorts = createPortList(new PortType(1, []), outputPortNo, id);
    return createComponent$0027(id, compType, name, inputPorts, outputPorts);
}

export function extractCircuit(input_, input__1, input__2, input__3) {
    const input = [input_, input__1, input__2, input__3];
    const c = input[0];
    return c;
}

/**
 * Join input ports of topCircuit with inCircuits
 */
export function joinCircuits(inCircuits, inPorts, topCircuit) {
    const conns = append(topCircuit.Conns, mapIndexed((index, inputPortId) => createConnection(item_4(index, inCircuits).Out, inputPortId), inPorts));
    const allConns = append(conns, collect((c) => c.Conns, inCircuits));
    const comps = append(topCircuit.Comps, collect((circ) => circ.Comps, inCircuits));
    return new Circuit(comps, allConns, topCircuit.Out, topCircuit.OutWidth);
}

export function merge2Circuits(c1, c2) {
    const comp = createComponent(new ComponentType(27, []), "");
    const topCircuit = new Circuit(singleton(comp), empty(), item_4(0, comp.OutputPorts), c1.OutWidth + c2.OutWidth);
    return joinCircuits(ofArray([c1, c2]), ofArray([item_4(0, comp.InputPorts), item_4(1, comp.InputPorts)]), topCircuit);
}

export function joinWithMerge$0027(circuits) {
    return fold(merge2Circuits, head_1(circuits), tail_3(circuits));
}

/**
 * Join a list of circuits with MergeWires components
 */
export function joinWithMerge(lst_mut) {
    joinWithMerge:
    while (true) {
        const lst = lst_mut;
        const merge2Circuits_1 = (tupledArg, tupledArg_1) => {
            const c1 = tupledArg[0];
            const name = tupledArg[1];
            const slice = tupledArg[2];
            const lhsType = tupledArg[3];
            const c2 = tupledArg_1[0];
            const name2 = tupledArg_1[1];
            const slice2 = tupledArg_1[2];
            const lhsType2 = tupledArg_1[3];
            const comp = createComponent(new ComponentType(27, []), "");
            const topCircuit = new Circuit(singleton(comp), empty(), item_4(0, comp.OutputPorts), 0);
            return [joinCircuits(ofArray([c1, c2]), ofArray([item_4(0, comp.InputPorts), item_4(1, comp.InputPorts)]), topCircuit), name, slice, lhsType];
        };
        const matchValue = length(lst) | 0;
        switch (matchValue) {
            case 1:
                return item_4(0, lst);
            case 2:
                return merge2Circuits_1(item_4(0, lst), item_4(1, lst));
            default: {
                const back = splitAt(2, lst)[1];
                const m1 = merge2Circuits_1(item_4(0, lst), item_4(1, lst));
                lst_mut = append(singleton(m1), back);
                continue joinWithMerge;
            }
        }
        break;
    }
}

/**
 * Extract MSB,LSB from assignment and return as a Slice
 * type Slice = {MSB:int, LSB:int}
 */
export function sliceFromBits(lhs, ioAndWireToCompMap, varSizeMap) {
    if (lhs.BitsStart != null) {
        const bStart = value_3(lhs.BitsStart);
        const bEnd = value_3(lhs.BitsEnd);
        return new Slice(parse(bStart, 511, false, 32), parse(bEnd, 511, false, 32));
    }
    else {
        const width = find(lhs.Primary.Name, varSizeMap) | 0;
        return new Slice(width - 1, 0);
    }
}

export function sliceFromBitsPrimary(primary, ioAndWireToCompMap, varSizeMap) {
    if (primary.BitsStart != null) {
        const bStart = value_3(primary.BitsStart);
        const bEnd = value_3(primary.BitsEnd);
        return new Slice(parse(bStart, 511, false, 32), parse(bEnd, 511, false, 32));
    }
    else {
        const width = find(primary.Primary.Name, varSizeMap) | 0;
        return new Slice(width - 1, 0);
    }
}

/**
 * Attach the merged circuits to the correct output port
 */
export function attachToOutput$0027(ioAndWireToCompMap, ioToCompMap, circuit, portName, slice, lhsType) {
    const outputOrWire = find(portName, ioAndWireToCompMap);
    const conn = createConnection(circuit.Out, item_4(0, outputOrWire.InputPorts));
    let patternInput;
    if (lhsType.tag === 1) {
        patternInput = [circuit.Comps, append(circuit.Conns, singleton(conn))];
    }
    else {
        const outputPort = find(portName, ioToCompMap);
        const conn$0027 = createConnection(item_4(0, outputOrWire.OutputPorts), item_4(0, outputPort.InputPorts));
        patternInput = [append(circuit.Comps, singleton(outputPort)), append(circuit.Conns, ofArray([conn, conn$0027]))];
    }
    const allConns = patternInput[1];
    const allComps = patternInput[0];
    return [allComps, allConns];
}

/**
 * Attach the merged circuits to the correct output port
 */
export function attachToOutput(ioAndWireToCompMap, ioToCompMap, circuit, portName) {
    const outputOrWire = find(portName, ioAndWireToCompMap);
    const conn = createConnection(circuit.Out, item_4(0, outputOrWire.InputPorts));
    let patternInput;
    const matchValue = tryFind(portName, ioToCompMap);
    if (matchValue != null) {
        const outputPort = matchValue;
        const conn$0027 = createConnection(item_4(0, outputOrWire.OutputPorts), item_4(0, outputPort.InputPorts));
        patternInput = [append(circuit.Comps, ofArray([outputOrWire, outputPort])), append(circuit.Conns, ofArray([conn, conn$0027]))];
    }
    else {
        patternInput = [append(circuit.Comps, singleton(outputOrWire)), append(circuit.Conns, singleton(conn))];
    }
    const allConns = patternInput[1];
    const allComps = patternInput[0];
    return [allComps, allConns];
}

export function concatenateCanvasStates(mainCS_, mainCS__1, newCS_, newCS__1) {
    const mainCS = [mainCS_, mainCS__1];
    const newCS = [newCS_, newCS__1];
    return [List_distinct(append(mainCS[0], newCS[0]), {
        Equals: equals,
        GetHashCode: safeHash,
    }), List_distinct(append(mainCS[1], newCS[1]), {
        Equals: equals,
        GetHashCode: safeHash,
    })];
}

export function dfsTraversal(graph, componentMap, connections, parents) {
    const dfsHelper = (name, tupledArg, currentNode) => {
        const visited = tupledArg[0];
        const compMap = tupledArg[1];
        const conns = tupledArg[2];
        if (contains(currentNode, visited)) {
            return [visited, compMap, conns];
        }
        else {
            const newVisited = add(currentNode, visited);
            const neighbors = defaultArg(FSharpMap__TryFind(graph, currentNode), empty());
            const unvisitedNeighbors = filter((neighbor) => !contains(neighbor, visited), neighbors);
            const conns$0027 = fold((c, neighbor_1) => filter((conn) => !((conn.Source.HostId === currentNode) && (conn.Target.HostId === neighbor_1)), c), conns, neighbors);
            let currComp;
            const inputRecord = find(currentNode, compMap);
            currComp = (new Component(inputRecord.Id, inputRecord.Type, name, inputRecord.InputPorts, inputRecord.OutputPorts, inputRecord.X, inputRecord.Y, inputRecord.H, inputRecord.W, inputRecord.SymbolInfo));
            const compMap$0027 = add_1(currentNode, currComp, compMap);
            return fold(uncurry2(curry3(dfsHelper)(name)), [newVisited, compMap$0027, conns$0027], unvisitedNeighbors);
        }
    };
    const patternInput = fold_1((tupledArg_1, startNode) => {
        const v = tupledArg_1[0];
        const compmap = tupledArg_1[1];
        const conns_1 = tupledArg_1[2];
        const name_1 = find(startNode, componentMap).Label;
        return dfsHelper(name_1, [v, compmap, conns_1], startNode);
    }, [empty_1({
        Compare: comparePrimitives,
    }), componentMap, connections], parents);
    const connections$0027 = patternInput[2];
    const componentMap$0027 = patternInput[1];
    return [componentMap$0027, connections$0027];
}

export function fixConsecutiveWires(oldCanvasState_, oldCanvasState__1) {
    const oldCanvasState = [oldCanvasState_, oldCanvasState__1];
    const componentMap = ofList(map_5((comp) => [comp.Id, comp], oldCanvasState[0]), {
        Compare: comparePrimitives,
    });
    const wireConns = filter((conn) => {
        const src = find(conn.Source.HostId, componentMap);
        const dst = find(conn.Target.HostId, componentMap);
        if (equals(src.Type, new ComponentType(3, []))) {
            return equals(dst.Type, new ComponentType(3, []));
        }
        else {
            return false;
        }
    }, oldCanvasState[1]);
    const wires = ofSeq(keys(filter_1((k, v) => equals(v.Type, new ComponentType(3, [])), componentMap)), {
        Compare: comparePrimitives,
    });
    const patternInput_1 = fold((tupledArg, conn_1) => {
        const graph = tupledArg[0];
        const parents = tupledArg[1];
        const currDeps = defaultArg(tryFind(conn_1.Source.HostId, graph), empty());
        const graph$0027 = add_1(conn_1.Source.HostId, append(currDeps, singleton(conn_1.Target.HostId)), graph);
        const parents$0027 = remove(conn_1.Target.HostId, parents);
        return [graph$0027, parents$0027];
    }, [empty_2({
        Compare: comparePrimitives,
    }), wires], wireConns);
    const parents_1 = patternInput_1[1];
    const graph_1 = patternInput_1[0];
    const patternInput_2 = dfsTraversal(graph_1, componentMap, oldCanvasState[1], parents_1);
    const connections = patternInput_2[1];
    const componentMap$0027 = patternInput_2[0];
    return [ofSeq_1(FSharpMap__get_Values(componentMap$0027)), connections];
}

/**
 * Helper function to resolve conflicts in labels (must be distinct)
 * and component locations on canvas (must not overlap_)
 */
export function fixCanvasState(oldCanvasState_, oldCanvasState__1) {
    const oldCanvasState = [oldCanvasState_, oldCanvasState__1];
    const fixedComps = mapIndexed((i, comp) => {
        let newLabel;
        const matchValue = comp.Type;
        switch (matchValue.tag) {
            case 0:
            case 1: {
                newLabel = comp.Label;
                break;
            }
            default:
                newLabel = ((comp.Label === "") ? "" : (("_" + comp.Label) + int32ToString(i)));
        }
        const y = (i + 1) * 120;
        const x = (i + 1) * 120;
        return new Component(comp.Id, comp.Type, newLabel, comp.InputPorts, comp.OutputPorts, x, y, comp.H, comp.W, comp.SymbolInfo);
    }, oldCanvasState[0]);
    const tupledArg = [fixedComps, oldCanvasState[1]];
    return fixConsecutiveWires(tupledArg[0], tupledArg[1]);
}

export function createIOComponent(item, ioType, oldMap) {
    const width = getWidthFromRange(value_3(item.IODecl).Range) | 0;
    const compType = (ioType === "input_decl") ? (new ComponentType(0, [width, 0])) : (new ComponentType(1, [width]));
    const names = ofArray(map_6((identifier) => identifier.Name, value_3(item.IODecl).Variables));
    return fold((map, name) => append(map, singleton([name, createComponent(compType, name)])), oldMap, names);
}

/**
 * Return a Map<string,Component> for input and output ports
 * where string -> port name.
 * It is necessary in order to find components when building circuits for assignments
 */
export function getIOtoComponentMap(ioDecls) {
    return ofList(fold((map, item) => createIOComponent(item, item.ItemType, map), empty(), ioDecls), {
        Compare: comparePrimitives,
    });
}

/**
 * Return a Map<string,Component> for wires
 * where string -> wire name.
 * It is necessary in order to find wire components when building circuits for assignments
 */
export function getWireToCompMap(lhs, ioAndWireToCompMap) {
    const name = lhs.Primary.Name;
    const wireComp = createComponent(new ComponentType(3, []), name);
    return add_1(name, wireComp, ioAndWireToCompMap);
}

export function collectWiresLHS(assignments) {
    const wires = filter((item) => (value_3(item.Statement).StatementType === "wire"), assignments);
    return map_5((item_1) => value_3(item_1.Statement).Assignment.LHS, wires);
}

export function collectInputAndWireComps(ioAndWireToCompMap) {
    return filter((comp) => {
        const matchValue = comp.Type;
        switch (matchValue.tag) {
            case 0:
            case 3:
                return true;
            default:
                return false;
        }
    }, map_5((tuple) => tuple[1], toList_1(ioAndWireToCompMap)));
}

export class ExpressionCompilable extends Record {
    constructor(Type, Operator, Head, Tail, Unary, Width) {
        super();
        this.Type = Type;
        this.Operator = Operator;
        this.Head = Head;
        this.Tail = Tail;
        this.Unary = Unary;
        this.Width = (Width | 0);
    }
}

export function ExpressionCompilable_$reflection() {
    return record_type("SheetCreator.ExpressionCompilable", [], ExpressionCompilable, () => [["Type", string_type], ["Operator", option_type(string_type)], ["Head", option_type(ExpressionCompilable_$reflection())], ["Tail", option_type(ExpressionCompilable_$reflection())], ["Unary", option_type(UnaryCompilable_$reflection())], ["Width", int32_type]]);
}

export class UnaryCompilable extends Record {
    constructor(Type, Primary, Number$, Expression, Width) {
        super();
        this.Type = Type;
        this.Primary = Primary;
        this.Number = Number$;
        this.Expression = Expression;
        this.Width = (Width | 0);
    }
}

export function UnaryCompilable_$reflection() {
    return record_type("SheetCreator.UnaryCompilable", [], UnaryCompilable, () => [["Type", string_type], ["Primary", option_type(PrimaryT_$reflection())], ["Number", option_type(NumberT_$reflection())], ["Expression", option_type(ExpressionCompilable_$reflection())], ["Width", int32_type]]);
}

/**
 * Extract component type and name from expression (type ExpressionT)
 * Create the component using the createComponent function
 */
export function buildExpressionComponent(rhs, width) {
    let compType;
    const matchValue = rhs.Type;
    compType = ((matchValue === "negation") ? (new ComponentType(23, [width])) : ((matchValue === "bitwise_OR") ? (new ComponentType(24, [width])) : ((matchValue === "bitwise_XOR") ? (new ComponentType(21, [width, void 0])) : ((matchValue === "bitwise_AND") ? (new ComponentType(22, [width])) : ((matchValue === "additive") ? (new ComponentType(17, [width])) : ((matchValue === "conditional_cond") ? (new ComponentType(11, [])) : ((matchValue === "logical_AND") ? (new ComponentType(10, ["and", 2])) : ((matchValue === "logical_OR") ? (new ComponentType(10, ["or", 2])) : ((matchValue === "multiplicative") ? (new ComponentType(21, [width, new NBitsArithmetic()])) : toFail(printf("Missing component(?) in buildExpressionComponent")))))))))));
    let baseName;
    const matchValue_1 = rhs.Type;
    baseName = ((matchValue_1 === "bitwise_OR") ? "OR" : ((matchValue_1 === "bitwise_XOR") ? "NXOR" : ((matchValue_1 === "additive") ? "ADD" : ((matchValue_1 === "bitwise_AND") ? "AND" : ((matchValue_1 === "negation") ? "NOT" : ((matchValue_1 === "conditional_cond") ? "MUX" : ((matchValue_1 === "logical_AND") ? "G" : ((matchValue_1 === "logical_OR") ? "G" : ((matchValue_1 === "multiplicative") ? "MULT" : toFail(printf("Missing component(?) in buildExpressionComponent")))))))))));
    return createComponent(compType, baseName);
}

/**
 * Finds the correct component based on the name of input/wire
 * creates a circuit with that component (and if required a busSel component
 * connected to it to return the correct slice) and returns that circuit
 */
export function createPrimaryCircuit(primary, ioAndWireToCompMap, varSizeMap) {
    const name = primary.Primary.Name;
    const inputComp = find(name, ioAndWireToCompMap);
    if (primary.BitsStart == null) {
        const width = find(name, varSizeMap) | 0;
        return new Circuit(empty(), empty(), item_4(0, inputComp.OutputPorts), width);
    }
    else {
        const bStart = parse(value_3(primary.BitsStart), 511, false, 32) | 0;
        const bEnd = parse(value_3(primary.BitsEnd), 511, false, 32) | 0;
        const outWidth = ((bStart - bEnd) + 1) | 0;
        const lsb = bEnd | 0;
        const busSelComp = createComponent(new ComponentType(6, [outWidth, lsb]), "");
        const conn = createConnection(item_4(0, inputComp.OutputPorts), item_4(0, busSelComp.InputPorts));
        return new Circuit(singleton(busSelComp), singleton(conn), item_4(0, busSelComp.OutputPorts), outWidth);
    }
}

/**
 * Creates the correct component based on the number and returns a circuit with that component
 */
export function createNumberCircuit(number) {
    const width = parse(value_3(number.Bits), 511, false, 32) | 0;
    const _base = value_3(number.Base);
    const no = value_3(number.AllNumber);
    const text = (_base === "\'b") ? ("0b" + no) : ((_base === "\'h") ? ("0x" + no) : no);
    let constValue;
    const matchValue = strToIntCheckWidth(width, text);
    if (matchValue.tag === 1) {
        constValue = toFail(printf("Shouldn\'t happen!"));
    }
    else {
        const n = matchValue.fields[0];
        constValue = n;
    }
    const constComp = createComponent(new ComponentType(7, [width, constValue, text]), "C");
    return new Circuit(singleton(constComp), empty(), item_4(0, constComp.OutputPorts), width);
}

export function getExprWidths(varSizeMap, expr$0027) {
    const getMinWidthsExpr = (expr) => {
        const matchValue = expr.Type;
        switch (matchValue) {
            case "unary": {
                const unary = getMinWidthsUnary(value_3(expr.Unary));
                return new ExpressionCompilable(expr.Type, expr.Operator, void 0, void 0, unary, unary.Width);
            }
            case "negation": {
                const unary_1 = getMinWidthsUnary(value_3(expr.Unary));
                return new ExpressionCompilable(expr.Type, expr.Operator, void 0, void 0, unary_1, unary_1.Width);
            }
            case "conditional_cond": {
                const cond = getMinWidthsExpr(value_3(expr.Head));
                const res = getMinWidthsExpr(value_3(expr.Tail));
                return new ExpressionCompilable(expr.Type, expr.Operator, cond, res, void 0, res.Width);
            }
            case "conditional_result": {
                const lhs = getMinWidthsExpr(value_3(expr.Head));
                const rhs = getMinWidthsExpr(value_3(expr.Tail));
                return new ExpressionCompilable(expr.Type, expr.Operator, lhs, rhs, void 0, max(lhs.Width, rhs.Width));
            }
            case "SHIFT": {
                const lhs_1 = getMinWidthsExpr(value_3(expr.Head));
                const rhs_1 = getMinWidthsExpr(value_3(expr.Tail));
                return new ExpressionCompilable(expr.Type, expr.Operator, lhs_1, rhs_1, void 0, lhs_1.Width);
            }
            case "reduction": {
                const unary_2 = getMinWidthsUnary(value_3(expr.Unary));
                return new ExpressionCompilable(expr.Type, expr.Operator, void 0, void 0, unary_2, 1);
            }
            case "logical_AND":
            case "logical_OR":
            case "comparison":
            case "equality": {
                const lhs_2 = getMinWidthsExpr(value_3(expr.Head));
                const rhs_2 = getMinWidthsExpr(value_3(expr.Tail));
                return new ExpressionCompilable(expr.Type, expr.Operator, lhs_2, rhs_2, void 0, 1);
            }
            case "unary_unsigned": {
                const unary_3 = getMinWidthsUnary(value_3(expr.Unary));
                return new ExpressionCompilable(expr.Type, expr.Operator, void 0, void 0, unary_3, unary_3.Width);
            }
            default: {
                const lhs_3 = getMinWidthsExpr(value_3(expr.Head));
                const rhs_3 = getMinWidthsExpr(value_3(expr.Tail));
                return new ExpressionCompilable(expr.Type, expr.Operator, lhs_3, rhs_3, void 0, max(lhs_3.Width, rhs_3.Width));
            }
        }
    };
    const getMinWidthsUnary = (unary_4) => {
        const matchValue_1 = unary_4.Type;
        switch (matchValue_1) {
            case "primary": {
                const primary = value_3(unary_4.Primary);
                let patternInput;
                const matchValue_2 = primary.BitsStart;
                const matchValue_3 = primary.BitsEnd;
                const matchValue_4 = unary_4.Expression;
                const matchValue_5 = primary.Width;
                let matchResult, e, s, expr_1, w;
                if (matchValue_2 != null) {
                    if (matchValue_3 != null) {
                        matchResult = 1;
                        e = matchValue_3;
                        s = matchValue_2;
                    }
                    else {
                        matchResult = 3;
                    }
                }
                else if (matchValue_3 == null) {
                    if (matchValue_4 != null) {
                        if (matchValue_5 != null) {
                            matchResult = 2;
                            expr_1 = matchValue_4;
                            w = matchValue_5;
                        }
                        else {
                            matchResult = 3;
                        }
                    }
                    else {
                        matchResult = 0;
                    }
                }
                else {
                    matchResult = 3;
                }
                switch (matchResult) {
                    case 0: {
                        patternInput = [find(value_3(unary_4.Primary).Primary.Name, varSizeMap), void 0];
                        break;
                    }
                    case 1: {
                        patternInput = [(parse(s, 511, false, 32) - parse(e, 511, false, 32)) + 1, void 0];
                        break;
                    }
                    case 2: {
                        patternInput = [w, getMinWidthsExpr(expr_1)];
                        break;
                    }
                    default:
                        patternInput = toFail(printf("Not possible: primary bitsstart and bitsend are wrong!"));
                }
                const width = patternInput[0] | 0;
                const expr_2 = patternInput[1];
                return new UnaryCompilable(unary_4.Type, unary_4.Primary, void 0, expr_2, width);
            }
            case "number": {
                const number = value_3(unary_4.Number);
                const width_1 = parse(defaultArg(number.Bits, "32"), 511, false, 32) | 0;
                return new UnaryCompilable(unary_4.Type, unary_4.Primary, unary_4.Number, void 0, width_1);
            }
            case "parenthesis": {
                const expr_3 = getMinWidthsExpr(value_3(unary_4.Expression));
                return new UnaryCompilable(unary_4.Type, unary_4.Primary, unary_4.Number, expr_3, expr_3.Width);
            }
            case "concat": {
                const lst = getWidthsUnaryList(value_3(unary_4.Expression));
                return new UnaryCompilable(unary_4.Type, unary_4.Primary, unary_4.Number, lst, lst.Width);
            }
            default:
                return toFail(printf("Can\'t happen"));
        }
    };
    const getWidthsUnaryList = (lst_1) => {
        const headExpr = getMinWidthsExpr(value_3(lst_1.Head));
        const matchValue_7 = lst_1.Tail;
        if (matchValue_7 == null) {
            return new ExpressionCompilable(lst_1.Type, lst_1.Operator, headExpr, void 0, void 0, headExpr.Width);
        }
        else {
            const tail = matchValue_7;
            const tail$0027 = getWidthsUnaryList(tail);
            return new ExpressionCompilable(lst_1.Type, lst_1.Operator, headExpr, tail$0027, void 0, headExpr.Width + tail$0027.Width);
        }
    };
    return getMinWidthsExpr(expr$0027);
}

export function extendCircuit(target, circuit) {
    const widthDiff = (target - circuit.OutWidth) | 0;
    if (widthDiff < 0) {
        return toFail(printf("Target width is smaller than circuit width!"));
    }
    else if (widthDiff === 0) {
        return circuit;
    }
    else {
        const zero = createComponent(new ComponentType(7, [widthDiff, toInt64(fromInt32(0)), ""]), "const0");
        const zeroCircuit = new Circuit(singleton(zero), empty(), item_4(0, zero.OutputPorts), widthDiff);
        const c = joinWithMerge$0027(ofArray([circuit, zeroCircuit]));
        return c;
    }
}

export function sliceCircuit(circuit, width, lsb) {
    const busSelectComp = createComponent(new ComponentType(6, [width, lsb]), "busSelect");
    const topCircuit = new Circuit(singleton(busSelectComp), empty(), item_4(0, busSelectComp.OutputPorts), width);
    const newCircuit = joinCircuits(singleton(circuit), singleton(item_4(0, busSelectComp.InputPorts)), topCircuit);
    return newCircuit;
}

/**
 * The main circuit creation function called with the RHS of an assignment as a parameter
 * Contains 6 recursive functions which eventually build the whole RHS expression
 * The starting point is the buildExpressionCircuit rec function
 * target is 0 if there is no lhs
 */
export function mainExpressionCircuitBuilder(expr, ioAndWireToCompMap, varSizeMap, target) {
    const buildExpressionCircuit = (expr_1) => ((targetWidth) => {
        const matchValue = expr_1.Type;
        let matchResult;
        switch (matchValue) {
            case "unary": {
                matchResult = 0;
                break;
            }
            case "negation": {
                matchResult = 1;
                break;
            }
            case "conditional_cond": {
                matchResult = 2;
                break;
            }
            case "reduction": {
                matchResult = 5;
                break;
            }
            case "logical_AND":
            case "logical_OR": {
                matchResult = 6;
                break;
            }
            case "equality": {
                matchResult = 7;
                break;
            }
            case "comparison": {
                matchResult = 8;
                break;
            }
            case "SHIFT": {
                if (value_3(expr_1.Tail).Type === "unary_unsigned") {
                    matchResult = 3;
                }
                else {
                    matchResult = 4;
                }
                break;
            }
            default:
                matchResult = 9;
        }
        switch (matchResult) {
            case 0:
                return extendCircuit(targetWidth, buildUnaryCircuit(value_3(expr_1.Unary))(targetWidth));
            case 1: {
                const c1 = extendCircuit(targetWidth, buildUnaryCircuit(value_3(expr_1.Unary))(targetWidth));
                const topComp = buildExpressionComponent(expr_1, c1.OutWidth);
                const topCircuit = new Circuit(singleton(topComp), empty(), item_4(0, topComp.OutputPorts), c1.OutWidth);
                return joinCircuits(singleton(c1), singleton(item_4(0, topComp.InputPorts)), topCircuit);
            }
            case 2: {
                const c3 = buildExpressionCircuit(value_3(expr_1.Head))(value_3(expr_1.Head).Width);
                const patternInput = buildConditionalCircuit(value_3(expr_1.Tail))(targetWidth);
                const c2 = patternInput[1];
                const c1_1 = patternInput[0];
                const topComp_1 = buildExpressionComponent(expr_1, c1_1.OutWidth);
                const topCircuit_1 = new Circuit(singleton(topComp_1), empty(), item_4(0, topComp_1.OutputPorts), c1_1.OutWidth);
                return joinCircuits(ofArray([c2, c1_1, c3]), ofArray([item_4(0, topComp_1.InputPorts), item_4(1, topComp_1.InputPorts), item_4(2, topComp_1.InputPorts)]), topCircuit_1);
            }
            case 3:
                return buildShiftCircuit(expr_1)(targetWidth);
            case 4:
                return buildVariableShiftCircuit(expr_1)(targetWidth);
            case 5:
                return buildReductionAndLogicalCircuit(expr_1)("reduction")(targetWidth);
            case 6: {
                const c1_2 = buildReductionAndLogicalCircuit(value_3(expr_1.Head))("logical")(max(value_3(expr_1.Head).Width, value_3(expr_1.Tail).Width));
                const c2_1 = buildReductionAndLogicalCircuit(value_3(expr_1.Tail))("logical")(max(value_3(expr_1.Head).Width, value_3(expr_1.Tail).Width));
                const topComp_2 = buildExpressionComponent(expr_1, c1_2.OutWidth);
                const topCircuit_2 = new Circuit(singleton(topComp_2), empty(), item_4(0, topComp_2.OutputPorts), c1_2.OutWidth);
                return joinCircuits(ofArray([c1_2, c2_1]), ofArray([item_4(0, topComp_2.InputPorts), item_4(1, topComp_2.InputPorts)]), topCircuit_2);
            }
            case 7:
                return buildEqualityCircuit(expr_1);
            case 8:
                return buildComparisonCircuit(expr_1);
            default: {
                const c1_3 = extendCircuit(targetWidth, buildExpressionCircuit(value_3(expr_1.Head))(targetWidth));
                const c2_2 = extendCircuit(targetWidth, buildExpressionCircuit(value_3(expr_1.Tail))(targetWidth));
                const topComp_3 = buildExpressionComponent(expr_1, c1_3.OutWidth);
                if (expr_1.Type === "additive") {
                    let patternInput_1;
                    const matchValue_2 = expr_1.Operator;
                    let matchResult_1;
                    if (matchValue_2 != null) {
                        switch (matchValue_2) {
                            case "+": {
                                matchResult_1 = 0;
                                break;
                            }
                            case "-": {
                                matchResult_1 = 1;
                                break;
                            }
                            default:
                                matchResult_1 = 2;
                        }
                    }
                    else {
                        matchResult_1 = 2;
                    }
                    switch (matchResult_1) {
                        case 0: {
                            const tempNumber = new NumberT("", "", "1", "\'b", void 0, "0", 100);
                            patternInput_1 = [c2_2, createNumberCircuit(tempNumber)];
                            break;
                        }
                        case 1: {
                            const tempNumber_1 = new NumberT("", "", "1", "\'b", void 0, "1", 100);
                            const cinCircuit = createNumberCircuit(tempNumber_1);
                            const nBitsNotComp = createComponent(new ComponentType(23, [c2_2.OutWidth]), "NOT");
                            const nBitsNotCircuit = new Circuit(singleton(nBitsNotComp), empty(), item_4(0, nBitsNotComp.OutputPorts), c2_2.OutWidth);
                            const invertedCircuit = joinCircuits(singleton(c2_2), singleton(item_4(0, nBitsNotComp.InputPorts)), nBitsNotCircuit);
                            patternInput_1 = [invertedCircuit, cinCircuit];
                            break;
                        }
                        default:
                            patternInput_1 = toFail(printf("Can\'t happen"));
                    }
                    const inputB = patternInput_1[0];
                    const cin = patternInput_1[1];
                    const ioLabelComp = createComponent(new ComponentType(2, [1]), "Adder_Cout");
                    const conn = createConnection(item_4(1, topComp_3.OutputPorts), item_4(0, ioLabelComp.InputPorts));
                    const topCircuit_3 = new Circuit(ofArray([topComp_3, ioLabelComp]), singleton(conn), item_4(0, topComp_3.OutputPorts), c1_3.OutWidth);
                    return joinCircuits(ofArray([cin, c1_3, inputB]), ofArray([item_4(0, topComp_3.InputPorts), item_4(1, topComp_3.InputPorts), item_4(2, topComp_3.InputPorts)]), topCircuit_3);
                }
                else {
                    const topCircuit_4 = new Circuit(singleton(topComp_3), empty(), item_4(0, topComp_3.OutputPorts), c1_3.OutWidth);
                    return joinCircuits(ofArray([c1_3, c2_2]), ofArray([item_4(0, topComp_3.InputPorts), item_4(1, topComp_3.InputPorts)]), topCircuit_4);
                }
            }
        }
    });
    const buildUnaryCircuit = (unary) => ((targetWidth_1) => {
        const matchValue_3 = unary.Type;
        switch (matchValue_3) {
            case "primary": {
                const matchValue_4 = unary.Expression;
                const matchValue_5 = value_3(unary.Primary).Width;
                let matchResult_2, expr_2, w;
                if (matchValue_4 != null) {
                    if (matchValue_5 != null) {
                        matchResult_2 = 0;
                        expr_2 = matchValue_4;
                        w = matchValue_5;
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
                        const index = buildExpressionCircuit(expr_2)(expr_2.Width);
                        const primaryComp = find(value_3(unary.Primary).Primary.Name, ioAndWireToCompMap);
                        const primaryWidth = find(value_3(unary.Primary).Primary.Name, varSizeMap) | 0;
                        const shiftLeft = createComponent(new ComponentType(46, [primaryWidth, expr_2.Width, new ShiftComponentType(0, [])]), "sll");
                        const topCircuit_5 = new Circuit(singleton(shiftLeft), empty(), item_4(0, shiftLeft.OutputPorts), primaryWidth);
                        const const1 = createComponent(new ComponentType(7, [primaryWidth, toInt64(op_Subtraction(pow2int64(w), toInt64(fromInt32(1)))), ""]), "const1");
                        const const1Circuit = new Circuit(singleton(const1), empty(), item_4(0, const1.OutputPorts), primaryWidth);
                        const shiftLeftIthCircuit = joinCircuits(ofArray([const1Circuit, index]), ofArray([item_4(0, shiftLeft.InputPorts), item_4(1, shiftLeft.InputPorts)]), topCircuit_5);
                        const primaryCircuit = new Circuit(empty(), empty(), item_4(0, primaryComp.OutputPorts), primaryWidth);
                        const andComp = createComponent(new ComponentType(22, [primaryWidth]), "and");
                        const andCircuit = new Circuit(singleton(andComp), empty(), item_4(0, andComp.OutputPorts), primaryWidth);
                        const andCircuit_1 = joinCircuits(ofArray([primaryCircuit, shiftLeftIthCircuit]), ofArray([item_4(0, andComp.InputPorts), item_4(1, andComp.InputPorts)]), andCircuit);
                        const shiftRight = createComponent(new ComponentType(46, [primaryWidth, expr_2.Width, new ShiftComponentType(1, [])]), "srl");
                        const sllCircuit = new Circuit(singleton(shiftRight), empty(), item_4(0, shiftRight.OutputPorts), primaryWidth);
                        const sllCircuit$0027 = joinCircuits(ofArray([andCircuit_1, index]), ofArray([item_4(0, shiftRight.InputPorts), item_4(1, shiftRight.InputPorts)]), sllCircuit);
                        return sliceCircuit(sllCircuit$0027, w, 0);
                    }
                    default:
                        return createPrimaryCircuit(value_3(unary.Primary), ioAndWireToCompMap, varSizeMap);
                }
            }
            case "number":
                return createNumberCircuit(value_3(unary.Number));
            case "parenthesis":
                return extendCircuit(targetWidth_1, buildExpressionCircuit(value_3(unary.Expression))(targetWidth_1));
            case "concat":
                return buildUnaryListCircuit(value_3(unary.Expression));
            default:
                return toFail(printf("Can\'t happen"));
        }
    });
    const buildUnaryListCircuit = (unaryList) => {
        const head = buildExpressionCircuit(value_3(unaryList.Head))(value_3(unaryList.Head).Width);
        let list;
        if (unaryList.Tail != null) {
            const tail = buildUnaryListCircuit(value_3(unaryList.Tail));
            list = append(singleton(head), singleton(tail));
        }
        else {
            list = singleton(head);
        }
        return joinWithMerge$0027(reverse(list));
    };
    const buildConditionalCircuit = (tail_1) => ((targetWidth_2) => {
        const c1_4 = extendCircuit(targetWidth_2, buildExpressionCircuit(value_3(tail_1.Head))(targetWidth_2));
        const c2_3 = extendCircuit(targetWidth_2, buildExpressionCircuit(value_3(tail_1.Tail))(targetWidth_2));
        return [c1_4, c2_3];
    });
    const buildVariableShiftCircuit = (expr_3) => ((targetWidth_3) => {
        const c1_5 = extendCircuit(targetWidth_3, buildExpressionCircuit(value_3(expr_3.Head))(targetWidth_3));
        const c2_4 = buildExpressionCircuit(value_3(expr_3.Tail))(value_3(expr_3.Tail).Width);
        let shiftType;
        const matchValue_8 = value_3(expr_3.Operator);
        shiftType = ((matchValue_8 === "<<") ? (new ShiftComponentType(0, [])) : ((matchValue_8 === ">>>") ? (new ShiftComponentType(2, [])) : (new ShiftComponentType(1, []))));
        const topComp_4 = createComponent(new ComponentType(46, [c1_5.OutWidth, c2_4.OutWidth, shiftType]), "SHIFT");
        const topCircuit_6 = new Circuit(singleton(topComp_4), empty(), item_4(0, topComp_4.OutputPorts), c1_5.OutWidth);
        return joinCircuits(ofArray([c1_5, c2_4]), ofArray([item_4(0, topComp_4.InputPorts), item_4(1, topComp_4.InputPorts)]), topCircuit_6);
    });
    const buildShiftCircuit = (expr_4) => ((targetWidth_4) => {
        const operator = value_3(expr_4.Operator);
        const tail_2 = value_3(expr_4.Tail);
        const unary_1 = value_3(tail_2.Unary);
        const number = value_3(unary_1.Number);
        const shift = number.UnsignedNumber;
        const shiftNo = parse(value_3(shift), 511, false, 32) | 0;
        const c1_6 = extendCircuit(targetWidth_4, buildExpressionCircuit(value_3(expr_4.Head))(targetWidth_4));
        if (shiftNo < c1_6.OutWidth) {
            const busSelComp = (operator === "<<") ? createComponent(new ComponentType(6, [c1_6.OutWidth - shiftNo, 0]), "") : createComponent(new ComponentType(6, [c1_6.OutWidth - shiftNo, shiftNo]), "");
            const busSelCircuit = new Circuit(singleton(busSelComp), empty(), item_4(0, busSelComp.OutputPorts), c1_6.OutWidth - shiftNo);
            const selectedCircuit = joinCircuits(singleton(c1_6), singleton(item_4(0, busSelComp.InputPorts)), busSelCircuit);
            let constantCircuit;
            switch (operator) {
                case ">>":
                case "<<": {
                    const tempNumber_2 = new NumberT("", "", shift, "\'b", void 0, "0", 100);
                    constantCircuit = createNumberCircuit(tempNumber_2);
                    break;
                }
                default: {
                    const msbSelComp = createComponent(new ComponentType(6, [1, c1_6.OutWidth - 1]), "");
                    const msbSelCircuit = new Circuit(singleton(msbSelComp), empty(), item_4(0, msbSelComp.OutputPorts), 1);
                    const msbCircuit = joinCircuits(singleton(c1_6), singleton(item_4(0, msbSelComp.InputPorts)), msbSelCircuit);
                    const spreaderComp = createComponent(new ComponentType(25, [shiftNo]), "SPREAD");
                    const spreaderCircuit = new Circuit(singleton(spreaderComp), empty(), item_4(0, spreaderComp.OutputPorts), shiftNo);
                    constantCircuit = joinCircuits(singleton(msbCircuit), singleton(item_4(0, spreaderComp.InputPorts)), spreaderCircuit);
                }
            }
            const inOrder = (operator === "<<") ? ofArray([constantCircuit, selectedCircuit]) : ofArray([selectedCircuit, constantCircuit]);
            return joinWithMerge$0027(inOrder);
        }
        else {
            const tempNumber_3 = new NumberT("", "", int32ToString(c1_6.OutWidth), "\'b", void 0, "0", 100);
            return createNumberCircuit(tempNumber_3);
        }
    });
    const buildReductionAndLogicalCircuit = (expr_5) => ((circType) => ((targetWidth_5) => {
        let value_1;
        const c1_7 = (circType === "reduction") ? buildUnaryCircuit(value_3(expr_5.Unary))(value_3(expr_5.Unary).Width) : ((circType === "logical") ? extendCircuit(targetWidth_5, buildExpressionCircuit(expr_5)(targetWidth_5)) : toFail(printf("Calling buildReductionAndLogicalCircuit with undefined circType")));
        let busCompareComp;
        const matchValue_9 = expr_5.Operator;
        let matchResult_3;
        if (circType === "reduction") {
            if (matchValue_9 != null) {
                switch (matchValue_9) {
                    case "&":
                    case "~&": {
                        matchResult_3 = 0;
                        break;
                    }
                    default:
                        matchResult_3 = 1;
                }
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
                busCompareComp = createComponent(new ComponentType(47, [c1_7.OutWidth, (value_1 = (Math.pow(2, c1_7.OutWidth) - 1), value_1 >>> 0)]), "COMP");
                break;
            }
            default:
                busCompareComp = createComponent(new ComponentType(47, [c1_7.OutWidth, 0]), "COMP");
        }
        const busCompareCircuit = new Circuit(singleton(busCompareComp), empty(), item_4(0, busCompareComp.OutputPorts), 1);
        const matchValue_11 = expr_5.Operator;
        let matchResult_4;
        if (circType === "reduction") {
            if (matchValue_11 != null) {
                switch (matchValue_11) {
                    case "&":
                    case "~|":
                    case "!": {
                        matchResult_4 = 0;
                        break;
                    }
                    default:
                        matchResult_4 = 1;
                }
            }
            else {
                matchResult_4 = 1;
            }
        }
        else {
            matchResult_4 = 1;
        }
        switch (matchResult_4) {
            case 0:
                return joinCircuits(singleton(c1_7), singleton(item_4(0, busCompareComp.InputPorts)), busCompareCircuit);
            default: {
                const comparedCircuit = joinCircuits(singleton(c1_7), singleton(item_4(0, busCompareComp.InputPorts)), busCompareCircuit);
                const notGateComp = createComponent(new ComponentType(8, []), "G");
                const notGateCircuit = new Circuit(singleton(notGateComp), empty(), item_4(0, notGateComp.OutputPorts), 1);
                return joinCircuits(singleton(comparedCircuit), singleton(item_4(0, notGateComp.InputPorts)), notGateCircuit);
            }
        }
    }));
    const buildEqualityCircuit = (expr_6) => {
        const targetWidth_6 = max(value_3(expr_6.Head).Width, value_3(expr_6.Tail).Width) | 0;
        const c1_8 = extendCircuit(targetWidth_6, buildExpressionCircuit(value_3(expr_6.Head))(targetWidth_6));
        const c2_5 = extendCircuit(targetWidth_6, buildExpressionCircuit(value_3(expr_6.Tail))(targetWidth_6));
        const xorComp = createComponent(new ComponentType(21, [c1_8.OutWidth, void 0]), "xor");
        const xorCircuit = new Circuit(singleton(xorComp), empty(), item_4(0, xorComp.OutputPorts), c1_8.OutWidth);
        const xorCircuit$0027 = joinCircuits(ofArray([c1_8, c2_5]), ofArray([item_4(0, xorComp.InputPorts), item_4(1, xorComp.InputPorts)]), xorCircuit);
        const busCompare = createComponent(new ComponentType(47, [c1_8.OutWidth, 0 >>> 0]), "COMP");
        const compCircuit = new Circuit(singleton(busCompare), empty(), item_4(0, busCompare.OutputPorts), 1);
        const comparedCircuit_1 = joinCircuits(singleton(xorCircuit$0027), singleton(item_4(0, busCompare.InputPorts)), compCircuit);
        const matchValue_13 = expr_6.Operator;
        let matchResult_5;
        if (matchValue_13 != null) {
            switch (matchValue_13) {
                case "!=": {
                    matchResult_5 = 0;
                    break;
                }
                case "==": {
                    matchResult_5 = 1;
                    break;
                }
                default:
                    matchResult_5 = 2;
            }
        }
        else {
            matchResult_5 = 2;
        }
        switch (matchResult_5) {
            case 0: {
                const notGateComp_1 = createComponent(new ComponentType(8, []), "NOT");
                const notGateCircuit_1 = new Circuit(singleton(notGateComp_1), empty(), item_4(0, notGateComp_1.OutputPorts), 1);
                return joinCircuits(singleton(comparedCircuit_1), singleton(item_4(0, notGateComp_1.InputPorts)), notGateCircuit_1);
            }
            case 1:
                return comparedCircuit_1;
            default:
                return toFail(printf("Invalid operator in equality expression"));
        }
    };
    const buildComparisonCircuit = (expr_7) => {
        const targetWidth_7 = max(value_3(expr_7.Head).Width, value_3(expr_7.Tail).Width) | 0;
        const c1_9 = extendCircuit(targetWidth_7 + 1, buildExpressionCircuit(value_3(expr_7.Head))(targetWidth_7));
        const c2_6 = extendCircuit(targetWidth_7 + 1, buildExpressionCircuit(value_3(expr_7.Tail))(targetWidth_7));
        const addComp = createComponent(new ComponentType(17, [targetWidth_7 + 1]), "Add");
        let subCircuit;
        let patternInput_2;
        const tempNumber_4 = new NumberT("", "", "1", "\'b", void 0, "1", 100);
        const cinCircuit_1 = createNumberCircuit(tempNumber_4);
        const nBitsNotComp_1 = createComponent(new ComponentType(23, [c2_6.OutWidth]), "NOT");
        const nBitsNotCircuit_1 = new Circuit(singleton(nBitsNotComp_1), empty(), item_4(0, nBitsNotComp_1.OutputPorts), c2_6.OutWidth);
        const invertedCircuit_1 = joinCircuits(singleton(c2_6), singleton(item_4(0, nBitsNotComp_1.InputPorts)), nBitsNotCircuit_1);
        patternInput_2 = [invertedCircuit_1, cinCircuit_1];
        const inputB_1 = patternInput_2[0];
        const cin_1 = patternInput_2[1];
        const ioLabelComp_1 = createComponent(new ComponentType(2, [1]), "Adder_Cout");
        const conn_1 = createConnection(item_4(1, addComp.OutputPorts), item_4(0, ioLabelComp_1.InputPorts));
        const topCircuit_7 = new Circuit(ofArray([addComp, ioLabelComp_1]), singleton(conn_1), item_4(0, addComp.OutputPorts), c1_9.OutWidth);
        subCircuit = joinCircuits(ofArray([cin_1, c1_9, inputB_1]), ofArray([item_4(0, addComp.InputPorts), item_4(1, addComp.InputPorts), item_4(2, addComp.InputPorts)]), topCircuit_7);
        const MSB = sliceCircuit(subCircuit, 1, targetWidth_7);
        let busCompare_1;
        const matchValue_14 = expr_7.Operator;
        let matchResult_6;
        if (matchValue_14 != null) {
            switch (matchValue_14) {
                case "<=":
                case ">": {
                    matchResult_6 = 0;
                    break;
                }
                case ">=":
                case "<": {
                    matchResult_6 = 1;
                    break;
                }
                default:
                    matchResult_6 = 2;
            }
        }
        else {
            matchResult_6 = 2;
        }
        switch (matchResult_6) {
            case 0: {
                busCompare_1 = createComponent(new ComponentType(47, [1, 0 >>> 0]), "COMP");
                break;
            }
            case 1: {
                busCompare_1 = createComponent(new ComponentType(47, [1, 1 >>> 0]), "COMP");
                break;
            }
            default:
                busCompare_1 = toFail(printf("Invalid comparison operator!"));
        }
        const busCompareCircuit_1 = new Circuit(singleton(busCompare_1), empty(), item_4(0, busCompare_1.OutputPorts), 1);
        const compareCircuit = joinCircuits(singleton(MSB), singleton(item_4(0, busCompare_1.InputPorts)), busCompareCircuit_1);
        const matchValue_15 = expr_7.Operator;
        let matchResult_7;
        if (matchValue_15 != null) {
            switch (matchValue_15) {
                case "<=":
                case ">=": {
                    matchResult_7 = 0;
                    break;
                }
                default:
                    matchResult_7 = 1;
            }
        }
        else {
            matchResult_7 = 1;
        }
        switch (matchResult_7) {
            case 0: {
                const notGateComp_2 = createComponent(new ComponentType(8, []), "NOT");
                const notGateCircuit_2 = new Circuit(singleton(notGateComp_2), empty(), item_4(0, notGateComp_2.OutputPorts), 1);
                return joinCircuits(singleton(compareCircuit), singleton(item_4(0, notGateComp_2.InputPorts)), notGateCircuit_2);
            }
            default:
                return compareCircuit;
        }
    };
    const exprWidths = getExprWidths(varSizeMap, expr);
    return buildExpressionCircuit(exprWidths)(max(target, exprWidths.Width));
}

export function getCombinationalVars(ast, project) {
    const contAssignVars = map_5((assign) => assign.LHS.Primary.Name, foldAST(getContAssignments, empty(), new ASTNode(24, [ast])));
    const alwaysCombVars = map_5((assign_1) => assign_1.Assignment.LHS.Primary.Name, foldAST(getBlockingAssignments, empty(), new ASTNode(24, [ast])));
    const modInst_1 = map_5((primary) => primary.Primary.Name, collect((modInst) => getModuleInstantiationOutputPrimaries(modInst, project), foldAST(getModuleInstantiationStatements, empty(), new ASTNode(24, [ast]))));
    return List_distinct(append(contAssignVars, append(alwaysCombVars, modInst_1)), {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    });
}

export function getClockedVars(ast) {
    const alwaysCombVars = List_distinct(map_5((tupledArg) => {
        const assign = tupledArg[0];
        return assign.Assignment.LHS.Primary.Name;
    }, foldAST(getNonBlockingAssignmentsWithLocation, empty(), new ASTNode(24, [ast]))), {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    });
    return alwaysCombVars;
}

export function overlaps(slice1, slice2) {
    return max(slice1.LSB, slice2.LSB) <= min(slice1.MSB, slice2.MSB);
}

/**
 * debug:
 */
export function isCircuitValid(circuit, varToCompMap) {
    const inputPorts = map_5((port) => port.Id, collect((comp) => comp.InputPorts, append(circuit.Comps, toList(values(varToCompMap)))));
    const outputPorts = map_5((port_1) => port_1.Id, collect((comp_1) => comp_1.OutputPorts, append(circuit.Comps, toList(values(varToCompMap)))));
    const wrongConns = filter((conn) => !(contains_1(conn.Source.Id, outputPorts, {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    }) && contains_1(conn.Target.Id, inputPorts, {
        Equals: (x_1, y_1) => (x_1 === y_1),
        GetHashCode: stringHash,
    })), circuit.Conns);
    if (isEmpty(wrongConns)) {
        return true;
    }
    else {
        return false;
    }
}

export function mergeIfElse(lst1, lst2, varToCompMap) {
    if (!isEmpty(lst1)) {
        if (!isEmpty(lst2)) {
            const h1 = head_1(lst1);
            const h2 = head_1(lst2);
            const t1 = tail_3(lst1);
            const t2 = tail_3(lst2);
            if (equals(h1.Slice, h2.Slice)) {
                return append(singleton([h1, h2]), mergeIfElse(t1, t2, varToCompMap));
            }
            else if (overlaps(h1.Slice, h2.Slice)) {
                const start1 = h1.Slice.LSB | 0;
                const end1 = h1.Slice.MSB | 0;
                const start2 = h2.Slice.LSB | 0;
                const end2 = h2.Slice.MSB | 0;
                const minEnd = min(end1, end2) | 0;
                const maxStart = max(start1, start2) | 0;
                let first;
                if (start1 < maxStart) {
                    const width = (maxStart - start1) | 0;
                    const newCircuit = sliceCircuit(h1.Circuit, width, 0);
                    const newMapping = new BitMapping(new Slice(maxStart - 1, start1), newCircuit, h1.LHSType);
                    first = [newMapping, void 0];
                }
                else if (start2 < maxStart) {
                    const width_1 = (maxStart - start2) | 0;
                    const newCircuit_1 = sliceCircuit(h2.Circuit, width_1, 0);
                    const newMapping_1 = new BitMapping(new Slice(maxStart - 1, start2), newCircuit_1, h2.LHSType);
                    first = [void 0, newMapping_1];
                }
                else {
                    first = [void 0, void 0];
                }
                let second;
                const width_2 = ((minEnd - maxStart) + 1) | 0;
                const newCircuit1 = sliceCircuit(h1.Circuit, width_2, maxStart - start1);
                const newMapping1 = new BitMapping(new Slice(minEnd, maxStart), newCircuit1, h1.LHSType);
                const newCircuit2 = sliceCircuit(h2.Circuit, width_2, maxStart - start2);
                const newMapping2 = new BitMapping(new Slice(minEnd, maxStart), newCircuit2, h2.LHSType);
                second = [newMapping1, newMapping2];
                let third;
                if (end1 > minEnd) {
                    const width_3 = (end1 - minEnd) | 0;
                    const newCircuit_2 = sliceCircuit(h1.Circuit, width_3, (minEnd - start1) + 1);
                    const newMapping_2 = new BitMapping(new Slice(end1, minEnd + 1), newCircuit_2, h1.LHSType);
                    third = [newMapping_2, void 0];
                }
                else if (end2 > minEnd) {
                    const width_4 = (end2 - minEnd) | 0;
                    const newCircuit_3 = sliceCircuit(h2.Circuit, width_4, (minEnd - start2) + 1);
                    const newMapping_3 = new BitMapping(new Slice(end2, minEnd + 1), newCircuit_3, h2.LHSType);
                    third = [void 0, newMapping_3];
                }
                else {
                    third = [void 0, void 0];
                }
                return ofArray([first, second, third]);
            }
            else if (compare(h1.Slice, h2.Slice) < 0) {
                return append(singleton([h1, void 0]), mergeIfElse(t1, lst2, varToCompMap));
            }
            else {
                return append(singleton([void 0, h2]), mergeIfElse(lst1, t2, varToCompMap));
            }
        }
        else {
            const h1_1 = head_1(lst1);
            const t1_1 = tail_3(lst1);
            return append(singleton([h1_1, void 0]), mergeIfElse(t1_1, empty(), varToCompMap));
        }
    }
    else if (!isEmpty(lst2)) {
        const h2_1 = head_1(lst2);
        const t2_1 = tail_3(lst2);
        return append(singleton([h2_1, void 0]), mergeIfElse(t2_1, empty(), varToCompMap));
    }
    else {
        return empty();
    }
}

export function addAssignment(assignment, bits, varToCompMap) {
    const overlapping = filter((bitmapping) => overlaps(assignment.Slice, bitmapping.Slice), bits);
    if (isEmpty(overlapping)) {
        return sortBy((mapping) => mapping.Slice, append(bits, singleton(assignment)), {
            Compare: compare,
        });
    }
    else {
        const first = head_1(overlapping);
        const last = last_1(overlapping);
        const matchValue = assignment.Slice.LSB <= first.Slice.LSB;
        const matchValue_1 = assignment.Slice.MSB >= last.Slice.MSB;
        if (matchValue) {
            if (matchValue_1) {
                return sortBy((mapping_2) => mapping_2.Slice, append(singleton(assignment), filter((mapping_1) => !overlaps(assignment.Slice, mapping_1.Slice), bits)), {
                    Compare: compare,
                });
            }
            else {
                const width_1 = (last.Slice.MSB - assignment.Slice.MSB) | 0;
                const newLastLSB = ((last.Slice.MSB - width_1) + 1) | 0;
                const busSelectComp_1 = createComponent(new ComponentType(6, [width_1, (assignment.Slice.MSB - last.Slice.LSB) + 1]), "busSelect");
                const topCircuit_1 = new Circuit(singleton(busSelectComp_1), empty(), item_4(0, busSelectComp_1.OutputPorts), width_1);
                const newCircuit_1 = joinCircuits(singleton(last.Circuit), singleton(item_4(0, busSelectComp_1.InputPorts)), topCircuit_1);
                const newLast = new BitMapping(new Slice(last.Slice.MSB, newLastLSB), newCircuit_1, last.LHSType);
                return sortBy((mapping_6) => mapping_6.Slice, append(ofArray([newLast, assignment]), filter((mapping_5) => !overlaps(assignment.Slice, mapping_5.Slice), bits)), {
                    Compare: compare,
                });
            }
        }
        else if (matchValue_1) {
            const width = (assignment.Slice.LSB - first.Slice.LSB) | 0;
            const newFirstMSB = ((first.Slice.LSB + width) - 1) | 0;
            const busSelectComp = createComponent(new ComponentType(6, [width, 0]), "busSelect");
            const topCircuit = new Circuit(singleton(busSelectComp), empty(), item_4(0, busSelectComp.OutputPorts), width);
            const newCircuit = joinCircuits(singleton(first.Circuit), singleton(item_4(0, busSelectComp.InputPorts)), topCircuit);
            const newFirst = new BitMapping(new Slice(newFirstMSB, first.Slice.LSB), newCircuit, first.LHSType);
            return sortBy((mapping_4) => mapping_4.Slice, append(ofArray([newFirst, assignment]), filter((mapping_3) => !overlaps(assignment.Slice, mapping_3.Slice), bits)), {
                Compare: compare,
            });
        }
        else {
            const width_2 = (assignment.Slice.LSB - first.Slice.LSB) | 0;
            const newFirstMSB_1 = ((first.Slice.LSB + width_2) - 1) | 0;
            const busSelectComp_2 = createComponent(new ComponentType(6, [width_2, 0]), "busSelect");
            const topCircuit_2 = new Circuit(singleton(busSelectComp_2), empty(), item_4(0, busSelectComp_2.OutputPorts), width_2);
            const newCircuit_2 = joinCircuits(singleton(first.Circuit), singleton(item_4(0, busSelectComp_2.InputPorts)), topCircuit_2);
            const newFirst_1 = new BitMapping(new Slice(newFirstMSB_1, first.Slice.LSB), newCircuit_2, first.LHSType);
            const width_3 = (last.Slice.MSB - assignment.Slice.MSB) | 0;
            const newLastLSB_1 = ((last.Slice.MSB - width_3) + 1) | 0;
            const busSelectComp_3 = createComponent(new ComponentType(6, [width_3, (assignment.Slice.MSB - last.Slice.LSB) + 1]), "busSelect");
            const topCircuit_3 = new Circuit(singleton(busSelectComp_3), empty(), item_4(0, busSelectComp_3.OutputPorts), width_3);
            const newCircuit_3 = joinCircuits(singleton(last.Circuit), singleton(item_4(0, busSelectComp_3.InputPorts)), topCircuit_3);
            const newLast_1 = new BitMapping(new Slice(last.Slice.MSB, newLastLSB_1), newCircuit_3, last.LHSType);
            return sortBy((mapping_8) => mapping_8.Slice, append(ofArray([newFirst_1, assignment, newLast_1]), filter((mapping_7) => !overlaps(assignment.Slice, mapping_7.Slice), bits)), {
                Compare: compare,
            });
        }
    }
}

/**
 * returns a mapping from lhs variable name -> bits -> rhs final circuit
 * maybe store the bits in a sorted array instead of a map
 */
export function compileModule$0027(node, varToCompMap, ioToCompMap, varSizeMap) {
    const compileModule_1 = (node_1_mut, varToCompMap_1_mut, currCircuits_mut) => {
        compileModule_1:
        while (true) {
            const node_1 = node_1_mut, varToCompMap_1 = varToCompMap_1_mut, currCircuits = currCircuits_mut;
            switch (node_1.tag) {
                case 24: {
                    const input = node_1.fields[0];
                    node_1_mut = (new ASTNode(23, [input.Module]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 23: {
                    const m = node_1.fields[0];
                    node_1_mut = (new ASTNode(22, [m.ModuleItems]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 22: {
                    const items = node_1.fields[0];
                    return fold_2((circuits, item) => compileModule_1(new ASTNode(21, [item]), varToCompMap_1, circuits), currCircuits, items.ItemList);
                }
                case 21: {
                    const item_1 = node_1.fields[0];
                    node_1_mut = getItem(item_1);
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 2: {
                    const contAssign = node_1.fields[0];
                    node_1_mut = (new ASTNode(13, [contAssign.Assignment]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 13: {
                    const assign = node_1.fields[0];
                    const outPort = assign.LHS.Primary.Name;
                    const bits = sliceFromBits(assign.LHS, varToCompMap_1, varSizeMap);
                    const circuit = mainExpressionCircuitBuilder(assign.RHS, varToCompMap_1, varSizeMap, (bits.MSB - bits.LSB) + 1);
                    const lhstype = (tryFind(outPort, ioToCompMap) == null) ? (new LHSType(1, [])) : (new LHSType(0, []));
                    const newAssignment = new BitMapping(bits, circuit, lhstype);
                    let currVarAssignments;
                    const matchValue_1 = tryFind(outPort, currCircuits);
                    if (matchValue_1 != null) {
                        const bitToCircuitMap = matchValue_1;
                        currVarAssignments = bitToCircuitMap;
                    }
                    else {
                        currVarAssignments = empty();
                    }
                    const updatedAssignments = addAssignment(newAssignment, currVarAssignments, varToCompMap_1);
                    return add_1(outPort, updatedAssignments, currCircuits);
                }
                case 4: {
                    const always = node_1.fields[0];
                    node_1_mut = (new ASTNode(5, [always.Statement]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 5: {
                    const statement = node_1.fields[0];
                    node_1_mut = statementToNode(getAlwaysStatement(statement));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 6: {
                    const assign_1 = node_1.fields[0];
                    node_1_mut = (new ASTNode(13, [assign_1.Assignment]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 7: {
                    const assign_2 = node_1.fields[0];
                    node_1_mut = (new ASTNode(13, [assign_2.Assignment]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 8: {
                    const seq = node_1.fields[0];
                    return fold_2((circuits_1, stmt) => compileModule_1(new ASTNode(5, [stmt]), varToCompMap_1, circuits_1), currCircuits, seq.Statements);
                }
                case 11: {
                    const cond = node_1.fields[0];
                    const ifCircuits = compileModule_1(new ASTNode(5, [cond.IfStatement.Statement]), varToCompMap_1, empty_2({
                        Compare: comparePrimitives,
                    }));
                    let elseCircuits;
                    const matchValue_2 = cond.ElseStatement;
                    if (matchValue_2 != null) {
                        const stmt_1 = matchValue_2;
                        elseCircuits = compileModule_1(new ASTNode(5, [stmt_1]), varToCompMap_1, empty_2({
                            Compare: comparePrimitives,
                        }));
                    }
                    else {
                        elseCircuits = empty_2({
                            Compare: comparePrimitives,
                        });
                    }
                    const condCircuit = mainExpressionCircuitBuilder(cond.IfStatement.Condition, varToCompMap_1, varSizeMap, 0);
                    const res = fold_1((circuits_2, var$) => {
                        const matchValue_3 = defaultArg(tryFind(var$, ifCircuits), empty());
                        const c2 = defaultArg(tryFind(var$, elseCircuits), empty());
                        const c1 = matchValue_3;
                        const merged = mergeIfElse(c1, c2, varToCompMap_1);
                        return fold((c, intervals) => {
                            if (intervals[0] == null) {
                                if (intervals[1] != null) {
                                    const elseMapping_1 = intervals[1];
                                    const currSlices_3 = defaultArg(tryFind(var$, c), empty());
                                    const overlappingSlices_1 = filter((pair_1) => {
                                        if (pair_1[1] != null) {
                                            return pair_1[0] != null;
                                        }
                                        else {
                                            return false;
                                        }
                                    }, mergeIfElse(currSlices_3, singleton(elseMapping_1), varToCompMap_1));
                                    return fold((c$0027_1, ifElse_1) => {
                                        const ifM_1 = value_3(ifElse_1[0]);
                                        const elseM_1 = value_3(ifElse_1[1]);
                                        const mux_2 = createComponent(new ComponentType(11, []), var$);
                                        const topCircuit_2 = new Circuit(singleton(mux_2), empty(), item_4(0, mux_2.OutputPorts), ifM_1.Circuit.OutWidth);
                                        const newCircuit_2 = joinCircuits(ofArray([elseM_1.Circuit, ifM_1.Circuit, condCircuit]), ofArray([item_4(0, mux_2.InputPorts), item_4(1, mux_2.InputPorts), item_4(2, mux_2.InputPorts)]), topCircuit_2);
                                        const newMapping_2 = new BitMapping(ifM_1.Slice, newCircuit_2, ifM_1.LHSType);
                                        const currSlices_4 = defaultArg(tryFind(var$, c$0027_1), empty());
                                        return add_1(var$, addAssignment(newMapping_2, currSlices_4, varToCompMap_1), c$0027_1);
                                    }, c, overlappingSlices_1);
                                }
                                else {
                                    return c;
                                }
                            }
                            else if (intervals[1] == null) {
                                const ifMapping_1 = intervals[0];
                                const currSlices_1 = defaultArg(tryFind(var$, c), empty());
                                const overlappingSlices = filter((pair) => {
                                    if (pair[1] != null) {
                                        return pair[0] != null;
                                    }
                                    else {
                                        return false;
                                    }
                                }, mergeIfElse(singleton(ifMapping_1), currSlices_1, varToCompMap_1));
                                return fold((c$0027, ifElse) => {
                                    const ifM = value_3(ifElse[0]);
                                    const elseM = value_3(ifElse[1]);
                                    const mux_1 = createComponent(new ComponentType(11, []), var$);
                                    const topCircuit_1 = new Circuit(singleton(mux_1), empty(), item_4(0, mux_1.OutputPorts), ifM.Circuit.OutWidth);
                                    const newCircuit_1 = joinCircuits(ofArray([elseM.Circuit, ifM.Circuit, condCircuit]), ofArray([item_4(0, mux_1.InputPorts), item_4(1, mux_1.InputPorts), item_4(2, mux_1.InputPorts)]), topCircuit_1);
                                    const newMapping_1 = new BitMapping(ifM.Slice, newCircuit_1, ifM.LHSType);
                                    const currSlices_2 = defaultArg(tryFind(var$, c$0027), empty());
                                    return add_1(var$, addAssignment(newMapping_1, currSlices_2, varToCompMap_1), c$0027);
                                }, c, overlappingSlices);
                            }
                            else {
                                const elseMapping = intervals[1];
                                const ifMapping = intervals[0];
                                const mux = createComponent(new ComponentType(11, []), var$);
                                const topCircuit = new Circuit(singleton(mux), empty(), item_4(0, mux.OutputPorts), ifMapping.Circuit.OutWidth);
                                const newCircuit = joinCircuits(ofArray([elseMapping.Circuit, ifMapping.Circuit, condCircuit]), ofArray([item_4(0, mux.InputPorts), item_4(1, mux.InputPorts), item_4(2, mux.InputPorts)]), topCircuit);
                                const newMapping = new BitMapping(ifMapping.Slice, newCircuit, ifMapping.LHSType);
                                const currSlices = defaultArg(tryFind(var$, c), empty());
                                return add_1(var$, addAssignment(newMapping, currSlices, varToCompMap_1), c);
                            }
                        }, circuits_2, merged);
                    }, currCircuits, union(ofSeq(FSharpMap__get_Keys(ifCircuits), {
                        Compare: comparePrimitives,
                    }), ofSeq(FSharpMap__get_Keys(elseCircuits), {
                        Compare: comparePrimitives,
                    })));
                    return res;
                }
                default:
                    return currCircuits;
            }
            break;
        }
    };
    const res_1 = compileModule_1(node, varToCompMap, empty_2({
        Compare: comparePrimitives,
    }));
    return res_1;
}

/**
 * debug:
 */
export function isCircuitValid$0027(comps, conns) {
    const inputPorts = map_5((port) => port.Id, collect((comp) => comp.InputPorts, comps));
    const outputPorts = map_5((port_1) => port_1.Id, collect((comp_1) => comp_1.OutputPorts, comps));
    const wrongConns = filter((conn) => !(contains_1(conn.Source.Id, outputPorts, {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    }) && contains_1(conn.Target.Id, inputPorts, {
        Equals: (x_1, y_1) => (x_1 === y_1),
        GetHashCode: stringHash,
    })), conns);
    if (isEmpty(wrongConns)) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * takes in n - number of inputs, must be a power of 2
 * circuit being returned has N (bus) data inputs and 1 select
 */
export function multiplexerNto1Circuit(inputs_mut, sel_mut) {
    multiplexerNto1Circuit:
    while (true) {
        const inputs = inputs_mut, sel = sel_mut;
        const n = length(inputs) | 0;
        switch (n) {
            case 0:
            case 1:
                return toFail(printf("Reached 1 or 0np in muxN creation, should not happen!"));
            case 2: {
                const mux = createComponent(new ComponentType(11, []), "mux2");
                const topCircuit = new Circuit(singleton(mux), empty(), item_4(0, mux.OutputPorts), 1);
                const circuit = joinCircuits(ofArray([item_4(1, inputs), item_4(0, inputs), sel]), ofArray([item_4(1, mux.InputPorts), item_4(0, mux.InputPorts), item_4(2, mux.InputPorts)]), topCircuit);
                return circuit;
            }
            default: {
                const inputPairs = map_5((chunk) => {
                    let matchResult, first, second;
                    if (!isEmpty(chunk)) {
                        if (!isEmpty(tail_3(chunk))) {
                            if (isEmpty(tail_3(tail_3(chunk)))) {
                                matchResult = 0;
                                first = head_1(chunk);
                                second = head_1(tail_3(chunk));
                            }
                            else {
                                matchResult = 1;
                            }
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
                            return [first, second];
                        default:
                            return toFail(printf("Invalid number of inputs for Nx1 multiplexer"));
                    }
                }, chunkBySize(2, inputs));
                const currSel = sliceCircuit(sel, 1, 0);
                const sel$0027 = sliceCircuit(sel, sel.OutWidth - 1, 1);
                const inputs$0027 = map_5((tupledArg) => {
                    const first_1 = tupledArg[0];
                    const second_1 = tupledArg[1];
                    return multiplexerNto1Circuit(ofArray([first_1, second_1]), currSel);
                }, inputPairs);
                inputs_mut = inputs$0027;
                sel_mut = sel$0027;
                continue multiplexerNto1Circuit;
            }
        }
        break;
    }
}

export function multiplexerCircuit(inputs, condition, defaultInput) {
    return fold((prevCircuit, tupledArg) => {
        const caseItem = tupledArg[0];
        const inputCircuit = tupledArg[1];
        const busComparator = createComponent(new ComponentType(47, [condition.OutWidth, toUInt32(caseItem) >>> 0]), "CMP");
        const topCircuit = new Circuit(singleton(busComparator), empty(), item_4(0, busComparator.OutputPorts), 1);
        const condCircuit = joinCircuits(singleton(condition), singleton(item_4(0, busComparator.InputPorts)), topCircuit);
        const mux2 = createComponent(new ComponentType(11, []), "mux2");
        const muxCircuit = new Circuit(singleton(mux2), empty(), item_4(0, mux2.OutputPorts), prevCircuit.OutWidth);
        return joinCircuits(ofArray([prevCircuit, inputCircuit, condCircuit]), ofArray([item_4(0, mux2.InputPorts), item_4(1, mux2.InputPorts), item_4(2, mux2.InputPorts)]), muxCircuit);
    }, defaultInput, inputs);
}

export function compileModule(node, varToCompMap, ioToCompMap, varSizeMap, initialCircuits, project) {
    const compileModule_1 = (node_1_mut, varToCompMap_1_mut, currCircuits_mut) => {
        compileModule_1:
        while (true) {
            const node_1 = node_1_mut, varToCompMap_1 = varToCompMap_1_mut, currCircuits = currCircuits_mut;
            switch (node_1.tag) {
                case 24: {
                    const input = node_1.fields[0];
                    node_1_mut = (new ASTNode(23, [input.Module]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 23: {
                    const m = node_1.fields[0];
                    node_1_mut = (new ASTNode(22, [m.ModuleItems]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 22: {
                    const items = node_1.fields[0];
                    return fold_2((circuits, item) => compileModule_1(new ASTNode(21, [item]), varToCompMap_1, circuits), currCircuits, items.ItemList);
                }
                case 21: {
                    const item_1 = node_1.fields[0];
                    node_1_mut = getItem(item_1);
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 2: {
                    const contAssign = node_1.fields[0];
                    node_1_mut = (new ASTNode(13, [contAssign.Assignment]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 13: {
                    const assign = node_1.fields[0];
                    const matchValue = assign.LHS.VariableBitSelect;
                    const matchValue_1 = assign.LHS.Width;
                    if (matchValue != null) {
                        if (matchValue_1 != null) {
                            const expr = matchValue;
                            const w = matchValue_1 | 0;
                            const outPort_1 = assign.LHS.Primary.Name;
                            const outWidth = find(outPort_1, varSizeMap) | 0;
                            const rhsCircuit = mainExpressionCircuitBuilder(assign.RHS, varToCompMap_1, varSizeMap, outWidth);
                            let currCircuit_1;
                            const matchValue_4 = tryFind(outPort_1, currCircuits);
                            if (matchValue_4 != null) {
                                const c_1 = matchValue_4;
                                currCircuit_1 = c_1;
                            }
                            else {
                                currCircuit_1 = toFail(printf("This should not happen, variable doesn\'t have a circuit"));
                            }
                            const indexCircuit = mainExpressionCircuitBuilder(expr, varToCompMap_1, varSizeMap, 0);
                            const const1 = createComponent(new ComponentType(7, [outWidth, toInt64(op_Subtraction(pow2int64(w), toInt64(fromInt32(1)))), "0b1"]), "const");
                            const const1Circuit = new Circuit(singleton(const1), empty(), item_4(0, const1.OutputPorts), outWidth);
                            const shiftLeft = createComponent(new ComponentType(46, [outWidth, indexCircuit.OutWidth, new ShiftComponentType(0, [])]), "shift");
                            const shiftLeftCircuit = new Circuit(singleton(shiftLeft), empty(), item_4(0, shiftLeft.OutputPorts), outWidth);
                            const shiftLeftCircuit$0027 = joinCircuits(ofArray([const1Circuit, indexCircuit]), ofArray([item_4(0, shiftLeft.InputPorts), item_4(1, shiftLeft.InputPorts)]), shiftLeftCircuit);
                            const notComp = createComponent(new ComponentType(23, [outWidth]), "not");
                            const notCircuit = new Circuit(singleton(notComp), empty(), item_4(0, notComp.OutputPorts), outWidth);
                            const notCircuit$0027 = joinCircuits(singleton(shiftLeftCircuit$0027), singleton(item_4(0, notComp.InputPorts)), notCircuit);
                            const andComp = createComponent(new ComponentType(22, [outWidth]), "and");
                            const andCircuit = new Circuit(singleton(andComp), empty(), item_4(0, andComp.OutputPorts), outWidth);
                            const andCircuit$0027 = joinCircuits(ofArray([notCircuit$0027, currCircuit_1]), ofArray([item_4(0, andComp.InputPorts), item_4(1, andComp.InputPorts)]), andCircuit);
                            const shiftLeftComp = createComponent(new ComponentType(46, [outWidth, indexCircuit.OutWidth, new ShiftComponentType(0, [])]), "shift");
                            const shiftLeftCircuit2 = new Circuit(singleton(shiftLeftComp), empty(), item_4(0, shiftLeftComp.OutputPorts), outWidth);
                            const shiftLeftCircuit2$0027 = joinCircuits(ofArray([rhsCircuit, indexCircuit]), ofArray([item_4(0, shiftLeftComp.InputPorts), item_4(1, shiftLeftComp.InputPorts)]), shiftLeftCircuit2);
                            const orComp = createComponent(new ComponentType(24, [outWidth]), "or");
                            const orCircuit = new Circuit(singleton(orComp), empty(), item_4(0, orComp.OutputPorts), outWidth);
                            const orCircuit$0027 = joinCircuits(ofArray([andCircuit$0027, shiftLeftCircuit2$0027]), ofArray([item_4(0, orComp.InputPorts), item_4(1, orComp.InputPorts)]), orCircuit);
                            return add_1(outPort_1, orCircuit$0027, currCircuits);
                        }
                        else {
                            return toFail(printf("No width given in variable bit select"));
                        }
                    }
                    else {
                        const outPort = assign.LHS.Primary.Name;
                        const bits = sliceFromBits(assign.LHS, varToCompMap_1, varSizeMap);
                        const circuit = mainExpressionCircuitBuilder(assign.RHS, varToCompMap_1, varSizeMap, (bits.MSB - bits.LSB) + 1);
                        let currCircuit;
                        const matchValue_3 = tryFind(outPort, currCircuits);
                        if (matchValue_3 != null) {
                            const c = matchValue_3;
                            currCircuit = c;
                        }
                        else {
                            currCircuit = toFail(printf("This should not happen, variable doesn\'t have a circuit"));
                        }
                        const MSBs = (((currCircuit.OutWidth - bits.MSB) - 1) > 0) ? singleton(sliceCircuit(currCircuit, (currCircuit.OutWidth - bits.MSB) - 1, bits.MSB + 1)) : empty();
                        const LSBs = (bits.LSB > 0) ? singleton(sliceCircuit(currCircuit, bits.LSB, 0)) : empty();
                        const newCircuit = joinWithMerge$0027(append(LSBs, append(singleton(circuit), MSBs)));
                        return add_1(outPort, newCircuit, currCircuits);
                    }
                }
                case 4: {
                    const always = node_1.fields[0];
                    node_1_mut = (new ASTNode(5, [always.Statement]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 5: {
                    const statement = node_1.fields[0];
                    node_1_mut = statementToNode(getAlwaysStatement(statement));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 6: {
                    const assign_1 = node_1.fields[0];
                    node_1_mut = (new ASTNode(13, [assign_1.Assignment]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 7: {
                    const assign_2 = node_1.fields[0];
                    node_1_mut = (new ASTNode(13, [assign_2.Assignment]));
                    varToCompMap_1_mut = varToCompMap_1;
                    currCircuits_mut = currCircuits;
                    continue compileModule_1;
                }
                case 8: {
                    const seq = node_1.fields[0];
                    return fold_2((circuits_1, stmt) => compileModule_1(new ASTNode(5, [stmt]), varToCompMap_1, circuits_1), currCircuits, seq.Statements);
                }
                case 11: {
                    const cond = node_1.fields[0];
                    const ifCircuits = compileModule_1(new ASTNode(5, [cond.IfStatement.Statement]), varToCompMap_1, currCircuits);
                    let elseCircuits;
                    const matchValue_5 = cond.ElseStatement;
                    if (matchValue_5 != null) {
                        const stmt_1 = matchValue_5;
                        elseCircuits = compileModule_1(new ASTNode(5, [stmt_1]), varToCompMap_1, currCircuits);
                    }
                    else {
                        elseCircuits = currCircuits;
                    }
                    const condCircuit = mainExpressionCircuitBuilder(cond.IfStatement.Condition, varToCompMap_1, varSizeMap, 0);
                    const comp = createComponent(new ComponentType(47, [condCircuit.OutWidth, 0 >>> 0]), "CMP");
                    const topCircuit = new Circuit(singleton(comp), empty(), item_4(0, comp.OutputPorts), 1);
                    const condCircuitN = joinCircuits(singleton(condCircuit), singleton(item_4(0, comp.InputPorts)), topCircuit);
                    return fold_3((circuits_2, var$, ifCircuit) => {
                        let elseCircuit;
                        const matchValue_6 = tryFind(var$, elseCircuits);
                        if (matchValue_6 != null) {
                            const c_2 = matchValue_6;
                            elseCircuit = c_2;
                        }
                        else {
                            elseCircuit = toFail(printf("This should not happen variable doesn\'t have a circuit in else branch!"));
                        }
                        if (equals(ifCircuit, elseCircuit)) {
                            return circuits_2;
                        }
                        else {
                            const mux = createComponent(new ComponentType(11, []), "Mux2");
                            const topCircuit_1 = new Circuit(singleton(mux), empty(), item_4(0, mux.OutputPorts), ifCircuit.OutWidth);
                            const newCircuit_1 = joinCircuits(ofArray([ifCircuit, elseCircuit, condCircuitN]), ofArray([item_4(0, mux.InputPorts), item_4(1, mux.InputPorts), item_4(2, mux.InputPorts)]), topCircuit_1);
                            return add_1(var$, newCircuit_1, circuits_2);
                        }
                    }, currCircuits, ifCircuits);
                }
                case 9: {
                    const case$ = node_1.fields[0];
                    const caseItemMap = fold_2((map, caseItem) => fold_2((m_1, num) => {
                        const allNum = defaultArg(num.AllNumber, "0");
                        const numBase = defaultArg(num.Base, "d");
                        const width = defaultArg(num.Bits, "32");
                        const dec = toDecimal(allNum, numBase, width);
                        return add_1(dec, caseItem.Statement, m_1);
                    }, map, caseItem.Expressions), empty_2({
                        Compare: compare_1,
                    }), case$.CaseItems);
                    const muxInputs = fold_3((inputs, num_1, stmt_2) => {
                        const circuits_3 = compileModule_1(new ASTNode(5, [stmt_2]), varToCompMap_1, currCircuits);
                        const newInputs = fold_3((currMap, var$_1, circuit_1) => {
                            let newList;
                            const matchValue_7 = tryFind(var$_1, currMap);
                            if (matchValue_7 != null) {
                                const lst = matchValue_7;
                                newList = append(lst, singleton([num_1, circuit_1]));
                            }
                            else {
                                newList = singleton([num_1, circuit_1]);
                            }
                            return add_1(var$_1, newList, currMap);
                        }, inputs, circuits_3);
                        return newInputs;
                    }, empty_2({
                        Compare: comparePrimitives,
                    }), caseItemMap);
                    let defaultCircuits;
                    const matchValue_8 = case$.Default;
                    if (matchValue_8 == null) {
                        defaultCircuits = currCircuits;
                    }
                    else {
                        const stmt_3 = matchValue_8;
                        defaultCircuits = compileModule_1(new ASTNode(5, [stmt_3]), varToCompMap_1, currCircuits);
                    }
                    const sel = mainExpressionCircuitBuilder(case$.Expression, varToCompMap_1, varSizeMap, 0);
                    return fold_3((circuits_4, var$_2, inputs_1) => {
                        let defaultCircuit;
                        const matchValue_9 = tryFind(var$_2, defaultCircuits);
                        if (matchValue_9 != null) {
                            const c_3 = matchValue_9;
                            defaultCircuit = c_3;
                        }
                        else {
                            defaultCircuit = toFail(printf("What? Variable doesn\'t have a circuit in the default case"));
                        }
                        const muxN = multiplexerCircuit(inputs_1, sel, defaultCircuit);
                        return add_1(var$_2, muxN, circuits_4);
                    }, currCircuits, muxInputs);
                }
                case 25: {
                    const modInst = node_1.fields[0];
                    let loadedComp;
                    const matchValue_10 = tryFind_1((comp_1) => (comp_1.Name === modInst.Module.Name), project.LoadedComponents);
                    if (matchValue_10 != null) {
                        const comp_2 = matchValue_10;
                        loadedComp = comp_2;
                    }
                    else {
                        loadedComp = toFail(printf("No such loaded component found, this should never happen %s"))(modInst.Module.Name);
                    }
                    const customCompType = new CustomComponentType(modInst.Module.Name, loadedComp.InputLabels, loadedComp.OutputLabels, void 0, void 0);
                    const comp_3 = createComponent(new ComponentType(26, [customCompType]), modInst.Identifier.Name);
                    const portLabels = append(loadedComp.InputLabels, loadedComp.OutputLabels);
                    const connections = ofArray(map_6((conn_1) => conn_1.Primary, sortBy_1((conn) => {
                        const matchValue_11 = tryFindIndex((tupledArg) => {
                            const id = tupledArg[0];
                            const w_1 = tupledArg[1] | 0;
                            return id === conn.PortId.Name.toLocaleUpperCase();
                        }, portLabels);
                        if (matchValue_11 != null) {
                            const idx = matchValue_11 | 0;
                            return idx | 0;
                        }
                        else {
                            return toFail(printf("portId doesn\'t exist, should never happen")) | 0;
                        }
                    }, modInst.Connections, {
                        Compare: comparePrimitives,
                    })));
                    const patternInput = splitAt(length(loadedComp.InputLabels), connections);
                    const outputPrimaries = patternInput[1];
                    const inputPrimaries = patternInput[0];
                    const inputCircuits = map_5((primary) => createPrimaryCircuit(primary, varToCompMap_1, varSizeMap), inputPrimaries);
                    const topCircuit_2 = new Circuit(singleton(comp_3), empty(), item_4(0, comp_3.OutputPorts), 0);
                    const inputCircuit = joinCircuits(inputCircuits, comp_3.InputPorts, topCircuit_2);
                    return fold((circuits_5, tupledArg_1) => {
                        const primary_1 = tupledArg_1[0];
                        const port = tupledArg_1[1];
                        const outPort_2 = primary_1.Primary.Name;
                        const bits_1 = sliceFromBitsPrimary(primary_1, varToCompMap_1, varSizeMap);
                        const circuit_2 = new Circuit(inputCircuit.Comps, inputCircuit.Conns, port, (bits_1.MSB - bits_1.LSB) + 1);
                        let currCircuit_2;
                        const matchValue_12 = tryFind(outPort_2, circuits_5);
                        if (matchValue_12 != null) {
                            const c_4 = matchValue_12;
                            currCircuit_2 = c_4;
                        }
                        else {
                            currCircuit_2 = toFail(printf("This should not happen, variable doesn\'t have a circuit"));
                        }
                        const MSBs_1 = (((currCircuit_2.OutWidth - bits_1.MSB) - 1) > 0) ? singleton(sliceCircuit(currCircuit_2, (currCircuit_2.OutWidth - bits_1.MSB) - 1, bits_1.MSB + 1)) : empty();
                        const LSBs_1 = (bits_1.LSB > 0) ? singleton(sliceCircuit(currCircuit_2, bits_1.LSB, 0)) : empty();
                        const newCircuit_2 = joinWithMerge$0027(append(LSBs_1, append(singleton(circuit_2), MSBs_1)));
                        return add_1(outPort_2, newCircuit_2, circuits_5);
                    }, currCircuits, zip(outputPrimaries, comp_3.OutputPorts));
                }
                default:
                    return currCircuits;
            }
            break;
        }
    };
    const res = compileModule_1(node, varToCompMap, initialCircuits);
    return res;
}

export function createSheet(input, project) {
    const items = ofArray(input.Module.ModuleItems.ItemList);
    const ioDecls = filter((item) => (item.IODecl != null), items);
    const assignments = filter((item_1) => (item_1.Statement != null), items);
    const wiresLHS = collectWiresLHS(assignments);
    const ioToCompMap = filter_1((var$, _arg) => (var$ !== "clk"), getIOtoComponentMap(ioDecls));
    const inputs = ofArray_1(map_6((id) => id.Name, fold((lst, item_2) => append_1(lst, value_3(item_2.IODecl).Variables), [], filter((decl) => (value_3(decl.IODecl).DeclarationType === "input"), ioDecls))), {
        Compare: comparePrimitives,
    });
    const ioAndWireToCompMap = fold((map, wire) => getWireToCompMap(wire, map), ioToCompMap, wiresLHS);
    const portSizeMap = getPortSizeAndLocationMap(items)[0];
    const wireSizeMap = getWireSizeMap(items);
    const declarations_1 = foldAST(getDeclarations, empty(), new ASTNode(24, [input]));
    const wireSizeMap_1 = fold((map_1, decl_1) => fold_2((map$0027, variable) => {
        if (decl_1.Range == null) {
            return add_1(variable.Name, 1, map$0027);
        }
        else {
            return add_1(variable.Name, (parse(value_3(decl_1.Range).Start, 511, false, 32) - parse(value_3(decl_1.Range).End, 511, false, 32)) + 1, map$0027);
        }
    }, map_1, decl_1.Variables), wireSizeMap, declarations_1);
    const varSizeMap = fold_3((acc, key, value_2) => add_1(key, value_2, acc), wireSizeMap_1, portSizeMap);
    const combVars = getCombinationalVars(input, project);
    const clockedVars = getClockedVars(input);
    const varToCompMap = fold((map_2, var$_1) => {
        const wireComp = createComponent(new ComponentType(3, []), var$_1);
        return add_1(var$_1, wireComp, map_2);
    }, ioToCompMap, combVars);
    const varToCompMap_1 = fold((map_3, var$_2) => {
        let size;
        const matchValue = tryFind(var$_2, varSizeMap);
        if (matchValue != null) {
            const s = matchValue | 0;
            size = s;
        }
        else {
            throw new Error("What? variable doesn\'t have a size?");
        }
        const regComp = createComponent(new ComponentType(33, [size]), var$_2);
        return add_1(var$_2, regComp, map_3);
    }, varToCompMap, clockedVars);
    const clockedVarsSet = ofList_1(clockedVars, {
        Compare: comparePrimitives,
    });
    const initialCircuits = filter_1((var$_4, _arg_1) => (var$_4 !== "clk"), fold_3((map_4, var$_3, width) => {
        const matchValue_1 = contains(var$_3, inputs);
        const matchValue_2 = contains(var$_3, clockedVarsSet);
        if (matchValue_1) {
            return map_4;
        }
        else if (matchValue_2) {
            let reg;
            const matchValue_4 = tryFind(var$_3, varToCompMap_1);
            if (matchValue_4 != null) {
                const comp = matchValue_4;
                reg = comp;
            }
            else {
                reg = toFail(printf("Clocked variable doesn\'t have a component"));
            }
            const circuit = new Circuit(singleton(reg), empty(), item_4(0, reg.OutputPorts), width);
            return add_1(var$_3, circuit, map_4);
        }
        else {
            const zero = new NumberT("", "", int32ToString(width), "\'b", void 0, "0", 100);
            return add_1(var$_3, createNumberCircuit(zero), map_4);
        }
    }, empty_2({
        Compare: comparePrimitives,
    }), varSizeMap));
    const ioVars = map_5((id_1) => id_1.Name.toLocaleUpperCase(), collect((item_3) => ofArray(value_3(item_3.IODecl).Variables), ioDecls));
    const perItemCircuits = sortBy((tupledArg) => {
        const s_1 = tupledArg[0];
        const c = tupledArg[1];
        return defaultArg(tryFindIndex((var$_5) => (var$_5 === s_1), ioVars), -1) | 0;
    }, toList_1(compileModule(new ASTNode(24, [input]), varToCompMap_1, ioToCompMap, varSizeMap, initialCircuits, project)), {
        Compare: comparePrimitives,
    });
    const csList = map_5((tupledArg_1) => {
        const portName = tupledArg_1[0];
        const circuit_1 = tupledArg_1[1];
        return attachToOutput(varToCompMap_1, ioToCompMap, circuit_1, portName);
    }, perItemCircuits);
    const v = map_5((cs) => cs, csList);
    let finalCanvasState;
    if (isEmpty(csList)) {
        finalCanvasState = [collectInputAndWireComps(varToCompMap_1), empty()];
    }
    else {
        const tupledArg_2 = reduce((cs1, cs2) => concatenateCanvasStates(cs1[0], cs1[1], cs2[0], cs2[1]), csList);
        finalCanvasState = concatenateCanvasStates(collectInputAndWireComps(varToCompMap_1), empty(), tupledArg_2[0], tupledArg_2[1]);
    }
    const components = sortBy((c_1) => defaultArg(tryFindIndex((var$_6) => (var$_6 === c_1.Label), ioVars), -1), finalCanvasState[0], {
        Compare: comparePrimitives,
    });
    let finalCanvasState_1;
    const tupledArg_3 = [components, finalCanvasState[1]];
    finalCanvasState_1 = fixCanvasState(tupledArg_3[0], tupledArg_3[1]);
    return finalCanvasState_1;
}

//# sourceMappingURL=SheetCreator.fs.js.map
