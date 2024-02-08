import { toString, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { union_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { StringModule_SubstringLength, StringModule_Split, StringModule_Concat } from "../Common/EEExtensions.fs.js";
import { delay, toArray as toArray_1, toList, map as map_2, truncate } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { isLetterOrDigit } from "../fable_modules/fable-library.4.1.4/Char.js";
import { replicate as replicate_1, append as append_1, take, toArray as toArray_2, map3, fold, initialize, reduce, length, empty, map as map_3, head, isEmpty, ofArray } from "../fable_modules/fable-library.4.1.4/List.js";
import { compare, comparePrimitives, safeHash, stringHash, compareArrays, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { chunkBySize, unzip, sort, last, indexed, concat, append, iterateIndexed, mapIndexed, collect, sortBy, map as map_4 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { FSharpMap__get_Item, ofArray as ofArray_1, toArray } from "../fable_modules/fable-library.4.1.4/Map.js";
import { Array_distinct, Array_groupBy, Array_distinctBy } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { toConsole, format, replicate, toFail, printf, interpolate, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { isHybridComponent } from "./SynchronousUtils.fs.js";
import { fromUInt32, fromInt64, fromInt32, op_LeftShift, op_Subtraction, op_BitwiseAnd, toUInt64 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { isOutput } from "../Common/Helpers.fs.js";
import { max } from "../fable_modules/fable-library.4.1.4/Double.js";

export class VMode extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ForSynthesis", "ForSimulation"];
    }
}

export function VMode_$reflection() {
    return union_type("Verilog.VMode", [], VMode, () => [[], []]);
}

export class CompilationProfile extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Release", "Debug"];
    }
}

export function CompilationProfile_$reflection() {
    return union_type("Verilog.CompilationProfile", [], CompilationProfile, () => [[], []]);
}

/**
 * take FullName and convert it into a verilog compatible form
 * this is not 1-1, so outputs may not be unique, that is OK
 */
export function verilogNameConvert(maxChars, s) {
    let _arg, h;
    const maxIdentifierLength = 50;
    const baseName = StringModule_Concat("", truncate(maxChars, map_2((_arg_1) => {
        let ch;
        if ((ch = _arg_1, isLetterOrDigit(ch) ? true : (ch === "_"))) {
            const ch_1 = _arg_1;
            return ch_1;
        }
        else {
            return "";
        }
    }, ((_arg = ofArray(StringModule_Split(["("], s)), isEmpty(_arg) ? "x" : ((h = head(_arg), h)))).split(""))));
    const extraLength = (baseName.length - maxIdentifierLength) | 0;
    if (extraLength > 0) {
        return toString(map_2((value) => value, baseName.slice(extraLength, baseName.length).split("")));
    }
    else {
        return baseName;
    }
}

/**
 * simple way to assign to each component and component output a unique verilog compatible name.
 * outputs will become reg or wire signals in the Verilog
 */
export function writeVerilogNames(fs) {
    const getShortPath = (path) => {
        let t;
        return StringModule_Concat("", map_3((s) => verilogNameConvert(1, s), (t = map_3((_arg) => {
            const cid = _arg;
            return cid;
        }, path), t)));
    };
    const getBaseVerilogName = (fc) => {
        const sc = fc.SimComponent;
        const fakeName = (s_1) => {
            let s_2;
            return `${s_1}${StringModule_SubstringLength(0, 2, (s_2 = sc.Id, s_2))}`;
        };
        let cLabel;
        const matchValue_1 = sc.Label;
        const matchValue_2 = sc.Type;
        if (equals(matchValue_1, "")) {
            cLabel = ((matchValue_2.tag === 28) ? fakeName("Split") : ((matchValue_2.tag === 27) ? fakeName("Merge") : fakeName("Other")));
        }
        else {
            const lab = matchValue_1;
            cLabel = lab.toLocaleUpperCase();
        }
        const matchValue_4 = fc.fId;
        if (isEmpty(matchValue_4[1])) {
            return verilogNameConvert(20, cLabel);
        }
        else {
            const path_1 = matchValue_4[1];
            return (verilogNameConvert(20, cLabel) + "$") + getShortPath(path_1);
        }
    };
    const namesWithFC = map_4((tupledArg_1) => {
        const fid_1 = tupledArg_1[0];
        const fc_1 = tupledArg_1[1];
        return [getBaseVerilogName(fc_1), fc_1];
    }, sortBy((tupledArg) => {
        const fid = tupledArg[0];
        return fid;
    }, toArray(fs.FComps), {
        Compare: compareArrays,
    }));
    const disambiguate = (names_mut) => {
        disambiguate:
        while (true) {
            const names = names_mut;
            if (Array_distinctBy((tuple) => tuple[0], names, {
                Equals: (x_1, y_1) => (x_1 === y_1),
                GetHashCode: stringHash,
            }).length === names.length) {
                return names;
            }
            else {
                names_mut = collect((tupledArg_2) => {
                    const name = tupledArg_2[0];
                    const groupA = tupledArg_2[1];
                    if (groupA.length === 1) {
                        return groupA;
                    }
                    else {
                        return mapIndexed((i, tupledArg_3) => {
                            const vName = tupledArg_3[0];
                            const fc_2 = tupledArg_3[1];
                            return [`${vName}$${i}`, fc_2];
                        }, groupA);
                    }
                }, Array_groupBy((tuple_1) => tuple_1[0], names, {
                    Equals: (x_2, y_2) => (x_2 === y_2),
                    GetHashCode: stringHash,
                }));
                continue disambiguate;
            }
            break;
        }
    };
    const array_5 = disambiguate(namesWithFC);
    array_5.forEach((tupledArg_4) => {
        const name_1 = tupledArg_4[0];
        const fc_3 = tupledArg_4[1];
        fc_3.VerilogComponentName = name_1;
        iterateIndexed((portNum, _arg_3) => {
            const suffix = (fc_3.VerilogOutputName.length === 1) ? "" : (`$o${portNum}`);
            const outName = `${fc_3.VerilogComponentName}${suffix}`;
            fc_3.VerilogOutputName[portNum] = outName;
        }, fc_3.VerilogOutputName);
    });
}

export function makeAsyncRomModule(moduleName, mem) {
    const aMax = (mem.AddressWidth - 1) | 0;
    const dMax = (mem.WordWidth - 1) | 0;
    const numWords = (1 << mem.AddressWidth) | 0;
    const romInits = StringModule_Concat("\n", map_4((tupledArg) => {
        const a = tupledArg[0];
        const d = tupledArg[1];
        return toText(interpolate("rom[%d%P()] = %d%P();", [a, d]));
    }, toArray(mem.Data)));
    return toText(interpolate("\n\n    module %s%P()(q, a);\n    output[%d%P():0] q;\n    input [%d%P():0] a;\n    reg [%d%P():0] rom [%d%P():0];\n\n    assign q = rom[a];\n    integer i;\n    initial\n    begin\n        for (i=0; i < %P(); i=i+1)\n        begin\n            rom[i] = 0;\n        end\n    \n        %s%P()\n    end\n    endmodule\n     ", [moduleName, dMax, aMax, dMax, numWords - 1, numWords, romInits]));
}

export function makeRomModule(moduleName, mem) {
    const aMax = (mem.AddressWidth - 1) | 0;
    const dMax = (mem.WordWidth - 1) | 0;
    const numWords = (1 << mem.AddressWidth) | 0;
    const romInits = StringModule_Concat("\n", map_4((tupledArg) => {
        const a = tupledArg[0];
        const d = tupledArg[1];
        return toText(interpolate("rom[%d%P()] = %d%P();", [a, d]));
    }, toArray(mem.Data)));
    return toText(interpolate("\n\n    module %s%P()(q, a, clk);\n    output reg [%d%P():0] q;\n    input clk;\n    input [%d%P():0] a;\n    reg [%d%P():0] rom [%d%P():0];\n    always @(posedge clk) q <= rom[a];\n    integer i;\n    initial\n    begin\n        for (i=0; i < %P(); i=i+1)\n        begin\n            rom[i] = 0;\n        end\n    \n        %s%P()\n    end\n    endmodule\n     ", [moduleName, dMax, aMax, dMax, numWords - 1, numWords, romInits]));
}

export function makeRamModule(moduleName, mem) {
    const aMax = (mem.AddressWidth - 1) | 0;
    const dMax = (mem.WordWidth - 1) | 0;
    const numWords = (1 << mem.AddressWidth) >>> 0;
    const ramInits = StringModule_Concat("\n", map_4((tupledArg) => {
        const a = tupledArg[0];
        const d = tupledArg[1];
        return toText(interpolate("ram[%d%P()] = %d%P();", [a, d]));
    }, toArray(mem.Data)));
    return toText(interpolate("\n\n    module %s%P()(q, a, d, we, clk);\n    output reg [%d%P():0] q;\n    input [%d%P():0] d;\n    input [%d%P():0] a;\n    input we, clk;\n    reg [%d%P():0] ram [%d%P():0];\n     always @(posedge clk) begin\n         if (we)\n             ram[a] <= d;\n         q <= ram[a];\n     end\n\n    integer i;\n    initial\n    begin\n        for (i=0; i < %P(); i=i+1)\n        begin\n            ram[i] = 0;\n        end\n\n        %s%P()\n    end\n    endmodule\n\n    ", [moduleName, dMax, dMax, aMax, dMax, numWords - 1, numWords, ramInits]));
}

export function makeAsyncRamModule(moduleName, mem) {
    const aMax = (mem.AddressWidth - 1) | 0;
    const dMax = (mem.WordWidth - 1) | 0;
    const numWords = (1 << mem.AddressWidth) >>> 0;
    const ramInits = StringModule_Concat("\n", map_4((tupledArg) => {
        const a = tupledArg[0];
        const d = tupledArg[1];
        return toText(interpolate("ram[%d%P()] = %d%P();", [a, d]));
    }, toArray(mem.Data)));
    return toText(interpolate("\n\n    module %s%P()(q, a, d, we, clk);\n    output reg [%d%P():0];\n    output q [%d%P():0];\n    input [%d%P():0] d;\n    input [%d%P():0] a;\n    input we, clk;\n    reg [%d%P():0] ram [%d%P():0];\n     always @(posedge clk) begin\n         if (we)\n             ram[a] <= d;\n     end\n    q <= ram[a];\n\n\n    integer i;\n    initial\n    begin\n        for (i=0; i < %P(); i=i+1)\n        begin\n            ram[i] = 0;\n        end\n\n        %s%P()\n    end\n    endmodule\n\n    ", [moduleName, dMax, dMax, dMax, aMax, dMax, numWords - 1, numWords, ramInits]));
}

/**
 * get all the RAM and ROM modules used
 * NB at the moment each instance is made a separately named module, for simplicity
 */
export function getInstantiatedModules(fs) {
    return append(["`include \"cores/osdvu/uart.v\""], collect((tupledArg) => {
        const fid = tupledArg[0];
        const fc = tupledArg[1];
        const name = fc.VerilogComponentName;
        const matchValue = fc.FType;
        switch (matchValue.tag) {
            case 41: {
                const mem = matchValue.fields[0];
                return [makeRamModule(name, mem)];
            }
            case 42: {
                const mem_1 = matchValue.fields[0];
                return [makeAsyncRamModule(name, mem_1)];
            }
            case 40: {
                const mem_2 = matchValue.fields[0];
                return [makeRomModule(name, mem_2)];
            }
            case 39: {
                const mem_3 = matchValue.fields[0];
                return [makeAsyncRomModule(name, mem_3)];
            }
            default:
                return [];
        }
    }, toArray(fs.FComps)));
}

export function removeHybridComps(fa) {
    return fa.filter((fc) => !isHybridComponent(fc.FType));
}

export function activeComps(fs) {
    return concat([fs.FClockedComps, removeHybridComps(fs.FOrderedComps)]);
}

export function makeAccessPathIndex(fs) {
    const apArr = append([empty()], map_4((fc) => fc.AccessPath, activeComps(fs)));
    return ofArray_1(map_4((tupledArg) => {
        const index = tupledArg[0] | 0;
        const ap_1 = tupledArg[1];
        return [ap_1, index];
    }, indexed(sortBy(length, Array_distinct(apArr, {
        Equals: equals,
        GetHashCode: safeHash,
    }), {
        Compare: comparePrimitives,
    }))), {
        Compare: compare,
    });
}

/**
 * generate an instance of a module named block
 */
export function getInstanceOf(block, instanceName, ports) {
    const portNames = StringModule_Concat(",", ports);
    return toText(`${block} ${instanceName} (${portNames});
`);
}

/**
 * implement binary operator for two-input gate
 */
export function getVerilogBinaryOp(gType, op1, op2) {
    const bin = (opS) => toText(printf("%s %s %s"))(op1)(opS)(op2);
    const not = (exp) => toText(printf("!(%s)"))(exp);
    switch (gType) {
        case "or":
            return bin("||");
        case "nand":
            return not(bin("&&"));
        case "nor":
            return not(bin("||"));
        case "xor":
            return toText(printf("((%s && !%s) || (!%s) && %s)"))(op1)(op2)(op1)(op2);
        case "xnor":
            return toText(printf("!((%s && !%s) || (!%s) && %s)"))(op1)(op2)(op1)(op2);
        default:
            return bin("&&");
    }
}

/**
 * implement binary operator for multi-input gate
 */
export function getVerilogNInputBinaryOp(cType, portConversionFn) {
    if (cType.tag === 10) {
        const n = cType.fields[1] | 0;
        const gateType = cType.fields[0];
        return reduce((op, op_1) => getVerilogBinaryOp(gateType, op, op_1), initialize(n, portConversionFn));
    }
    else {
        return toFail(printf("operator %A not defined"))(cType);
    }
}

/**
 * get valid Verilog constant for bus of given width (may be 1)
 */
export function makeBits(w, c) {
    const c_1 = toUInt64(op_BitwiseAnd(c, toUInt64(op_Subtraction(toUInt64(op_LeftShift(1n, w)), 1n))));
    return toText(interpolate("%d%P()\'h%x%P()", [w, c_1]));
}

/**
 * get output port name
 */
export function getVPortOut(fc, _arg) {
    const opn = _arg;
    return fc.VerilogOutputName[opn];
}

/**
 * Get string corresponding to output port name with its width prepended as a Verilog
 * slice.
 * All output ports are internal wire or reg definitions.
 */
export function getVPortOutWithSlice(fc, opn) {
    const name = getVPortOut(fc, opn);
    const n = opn;
    const width = fc.Outputs[n].Width | 0;
    if (width === 1) {
        return `${name}`;
    }
    else {
        return toText(interpolate(" [%d%P():0] %P()", [width - 1, name]));
    }
}

/**
 * Get string corresponding to name of signal that drives component input port
 */
export function getVPortInput(fs, fc, _arg) {
    const ipn = _arg;
    const labBase = fc.FullName;
    const matchValue = fc.InputDrivers[ipn];
    if (matchValue == null) {
        return toFail(printf("Can\'t find input driver for %A port %d"))(fc.FullName)(ipn);
    }
    else {
        const opn = matchValue[1];
        const fid = matchValue[0];
        return getVPortOut(FSharpMap__get_Item(fs.FComps, fid), opn);
    }
}

/**
 * Create fixed width verilog zero.
 * NB it seems this is not strictly needed, integer 0 works!
 */
export function getZeros(width) {
    if (width === 1) {
        return "1\'b0";
    }
    else {
        return `${width}'h0`;
    }
}

/**
 * what verilog declaration should the output signal have?
 */
export function fastOutputDefinition(vType, fc, opn) {
    const n = opn;
    const name = fc.VerilogOutputName[n];
    const vDef = getVPortOutWithSlice(fc, opn);
    const matchValue = fc.FType;
    const matchValue_1 = fc.AccessPath;
    let matchResult, n_1, n_2, n_3;
    switch (matchValue.tag) {
        case 31:
        case 32: {
            matchResult = 1;
            break;
        }
        case 48: {
            matchResult = 2;
            break;
        }
        case 1: {
            if (isEmpty(matchValue_1)) {
                matchResult = 0;
                n_1 = matchValue.fields[0];
            }
            else {
                matchResult = 5;
            }
            break;
        }
        case 0: {
            if (isEmpty(matchValue_1)) {
                matchResult = 3;
                n_2 = matchValue.fields[0];
            }
            else {
                matchResult = 5;
            }
            break;
        }
        case 33: {
            matchResult = 4;
            n_3 = matchValue.fields[0];
            break;
        }
        case 34: {
            matchResult = 4;
            n_3 = matchValue.fields[0];
            break;
        }
        case 35: {
            matchResult = 4;
            n_3 = matchValue.fields[0];
            break;
        }
        case 37: {
            matchResult = 4;
            n_3 = matchValue.fields[0];
            break;
        }
        case 36: {
            matchResult = 4;
            n_3 = matchValue.fields[0];
            break;
        }
        case 38: {
            matchResult = 4;
            n_3 = matchValue.fields[0];
            break;
        }
        default:
            matchResult = 5;
    }
    switch (matchResult) {
        case 0:
            return `output ${vDef};
`;
        case 1:
            return `reg ${vDef} = 1'b0;
`;
        case 2:
            return toFail(printf("Legacy Input component types should never occur"));
        case 3:
            if (vType.tag === 1) {
                return `reg ${vDef} = ${getZeros(n_2)};
`;
            }
            else {
                return `input ${vDef};
`;
            }
        case 4:
            return `reg ${vDef} = ${getZeros(n_3)};
`;
        default:
            return `wire ${vDef};
`;
    }
}

/**
 * Translates from a component to its Verilog description
 */
export function getVerilogComponent(fs, fc) {
    const ins = (i) => getVPortInput(fs, fc, i);
    const outs = (i_1) => getVPortOut(fc, i_1);
    const name = fc.VerilogComponentName;
    const idNum = last(StringModule_Split(["_"], name));
    const outW = (i_2) => {
        let n_1;
        const matchValue = fc.Outputs[i_2].Width | 0;
        if ((n_1 = (matchValue | 0), n_1 > 64)) {
            const n_2 = matchValue | 0;
            return toFail(printf("Sorry - Verilog output does not yet work for busses > 64 bit. Output failed")) | 0;
        }
        else {
            const n_3 = matchValue | 0;
            return n_3 | 0;
        }
    };
    const inW = (i_3) => {
        let patternInput;
        const matchValue_1 = fc.InputDrivers[i_3];
        if (matchValue_1 == null) {
            patternInput = toFail(printf("Can\'t find input driver for port %d of %s"))(i_3)(fc.FullName);
        }
        else {
            const x = matchValue_1;
            patternInput = x;
        }
        const opn = patternInput[1];
        const fid = patternInput[0];
        const this$_1 = FSharpMap__get_Item(fs.FComps, fid);
        return this$_1.Outputs[opn].Width | 0;
    };
    const demuxOutput = (outputPort, selectPort, w) => {
        if (outputPort === selectPort) {
            return ins(0);
        }
        else {
            return makeBits(w, toUInt64(fromInt32(0)));
        }
    };
    const matchValue_2 = fc.FType;
    let matchResult, gateType, n_5, c, w_1, n_6, n_7, n_8, n_9, n_10, op, n_11, n_12, n_13, n_14, lsb, outW_1, c_1, w_6, c_2, w_7, n_15, lsBits, n_16, outputWidths, mem, mem_1, mem_2, m, n_17, tp;
    switch (matchValue_2.tag) {
        case 2:
        case 1:
        case 3: {
            matchResult = 1;
            break;
        }
        case 4: {
            matchResult = 2;
            break;
        }
        case 8: {
            matchResult = 3;
            break;
        }
        case 32:
        case 34: {
            matchResult = 5;
            break;
        }
        case 35: {
            matchResult = 6;
            break;
        }
        case 37: {
            matchResult = 7;
            break;
        }
        case 36: {
            matchResult = 8;
            break;
        }
        case 38: {
            matchResult = 9;
            break;
        }
        case 31:
        case 33: {
            matchResult = 10;
            break;
        }
        case 9: {
            matchResult = 12;
            break;
        }
        case 14: {
            matchResult = 13;
            break;
        }
        case 15: {
            matchResult = 14;
            break;
        }
        case 16: {
            matchResult = 15;
            break;
        }
        case 11: {
            matchResult = 25;
            break;
        }
        case 12: {
            matchResult = 26;
            break;
        }
        case 13: {
            matchResult = 27;
            break;
        }
        case 27: {
            matchResult = 31;
            break;
        }
        case 28: {
            matchResult = 33;
            break;
        }
        case 26: {
            matchResult = 38;
            break;
        }
        case 48:
        case 43:
        case 45:
        case 44: {
            matchResult = 39;
            break;
        }
        case 10: {
            matchResult = 4;
            gateType = matchValue_2.fields[0];
            n_5 = matchValue_2.fields[1];
            break;
        }
        case 7: {
            matchResult = 11;
            c = matchValue_2.fields[1];
            w_1 = matchValue_2.fields[0];
            break;
        }
        case 49: {
            matchResult = 11;
            c = matchValue_2.fields[1];
            w_1 = matchValue_2.fields[0];
            break;
        }
        case 17: {
            matchResult = 16;
            n_6 = matchValue_2.fields[0];
            break;
        }
        case 18: {
            matchResult = 17;
            n_7 = matchValue_2.fields[0];
            break;
        }
        case 19: {
            matchResult = 18;
            n_8 = matchValue_2.fields[0];
            break;
        }
        case 20: {
            matchResult = 19;
            n_9 = matchValue_2.fields[0];
            break;
        }
        case 21: {
            matchResult = 20;
            n_10 = matchValue_2.fields[0];
            op = matchValue_2.fields[1];
            break;
        }
        case 22: {
            matchResult = 21;
            n_11 = matchValue_2.fields[0];
            break;
        }
        case 24: {
            matchResult = 22;
            n_12 = matchValue_2.fields[0];
            break;
        }
        case 23: {
            matchResult = 23;
            n_13 = matchValue_2.fields[0];
            break;
        }
        case 25: {
            matchResult = 24;
            n_14 = matchValue_2.fields[0];
            break;
        }
        case 6: {
            matchResult = 28;
            lsb = matchValue_2.fields[1];
            outW_1 = matchValue_2.fields[0];
            break;
        }
        case 47: {
            matchResult = 29;
            c_1 = matchValue_2.fields[1];
            w_6 = matchValue_2.fields[0];
            break;
        }
        case 5: {
            matchResult = 30;
            c_2 = matchValue_2.fields[1];
            w_7 = matchValue_2.fields[0];
            break;
        }
        case 29: {
            matchResult = 32;
            n_15 = matchValue_2.fields[0];
            break;
        }
        case 30: {
            matchResult = 34;
            lsBits = matchValue_2.fields[2];
            n_16 = matchValue_2.fields[0];
            outputWidths = matchValue_2.fields[1];
            break;
        }
        case 39: {
            matchResult = 35;
            mem = matchValue_2.fields[0];
            break;
        }
        case 40: {
            matchResult = 36;
            mem_1 = matchValue_2.fields[0];
            break;
        }
        case 41: {
            matchResult = 37;
            mem_2 = matchValue_2.fields[0];
            break;
        }
        case 42: {
            matchResult = 37;
            mem_2 = matchValue_2.fields[0];
            break;
        }
        case 46: {
            matchResult = 40;
            m = matchValue_2.fields[1];
            n_17 = matchValue_2.fields[0];
            tp = matchValue_2.fields[2];
            break;
        }
        default:
            if (equals(fc.AccessPath, empty())) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
    }
    switch (matchResult) {
        case 0:
            return toFail(printf("What? cannot call getVerilogComponent to find code for global Input"));
        case 1:
            return toText(`assign ${outs(0)} = ${ins(0)};
`);
        case 2:
            return "";
        case 3: {
            const arg_2 = outs(0);
            const arg_3 = ins(0);
            return toText(printf("assign %s = ! %s;\n"))(arg_2)(arg_3);
        }
        case 4: {
            const arg_4 = outs(0);
            const arg_5 = getVerilogNInputBinaryOp(fc.FType, ins);
            return toText(printf("assign %s = %s"))(arg_4)(arg_5);
        }
        case 5:
            return `always @(posedge clk) ${outs(0)} <= ${ins(1)} ? ${ins(0)} : ${outs(0)};
`;
        case 6:
            return `always @(posedge clk) ${outs(0)} <= ${ins(2)} ? (${ins(1)} ? ${ins(0)} : (${outs(0)}+1'b1)) : ${outs(0)};
`;
        case 7:
            return `always @(posedge clk) ${outs(0)} <= ${ins(1)} ? ${ins(0)} : (${outs(0)}+1'b1) ;
`;
        case 8:
            return `always @(posedge clk) ${outs(0)} <= ${ins(0)} ? (${outs(0)}+1'b1) : ${outs(0)};
`;
        case 9:
            return `always @(posedge clk) ${outs(0)} <= (${outs(0)}+1'b1) ;
`;
        case 10:
            return `always @(posedge clk) ${outs(0)} <= ${ins(0)};
`;
        case 11:
            return `assign ${outs(0)} = ${makeBits(w_1, toUInt64(fromInt64(c)))};
`;
        case 12: {
            const w_2 = outW(1) | 0;
            return (((`assign ${outs(0)} = (${ins(0)} == 2'b00) ? ${ins(1)} : ${makeBits(w_2, toUInt64(fromInt32(0)))};
`) + (`assign ${outs(1)} = (${ins(0)} == 2'b01) ? ${ins(1)} : ${makeBits(w_2, toUInt64(fromInt32(0)))};
`)) + (`assign ${outs(2)} = (${ins(0)} == 2'b10) ? ${ins(1)} : ${makeBits(w_2, toUInt64(fromInt32(0)))};
`)) + (`assign ${outs(3)} = (${ins(0)} == 2'b11) ? ${ins(1)} : ${makeBits(w_2, toUInt64(fromInt32(0)))};
`);
        }
        case 13: {
            const w_3 = outW(0) | 0;
            return (`assign ${outs(0)} = ${ins(1)} ? ${makeBits(w_3, toUInt64(fromInt32(0)))} : ${ins(0)};
`) + (`assign ${outs(1)} = ${ins(1)} ? ${ins(0)} : ${makeBits(w_3, toUInt64(fromInt32(0)))};
`);
        }
        case 14: {
            const w_4 = outW(0) | 0;
            return (((`assign ${outs(0)} = (${ins(1)} == 2'b00) ? ${ins(0)} : ${makeBits(w_4, toUInt64(fromInt32(0)))};
`) + (`assign ${outs(1)} = (${ins(1)} == 2'b01) ? ${ins(0)} : ${makeBits(w_4, toUInt64(fromInt32(0)))};
`)) + (`assign ${outs(2)} = (${ins(1)} == 2'b10) ? ${ins(0)} : ${makeBits(w_4, toUInt64(fromInt32(0)))};
`)) + (`assign ${outs(3)} = (${ins(1)} == 2'b11) ? ${ins(0)} : ${makeBits(w_4, toUInt64(fromInt32(0)))};
`);
        }
        case 15: {
            const w_5 = outW(0) | 0;
            return (((((((`assign ${outs(0)} = (${ins(1)} == 3'b000) ? ${ins(0)} : ${makeBits(w_5, toUInt64(fromInt32(0)))};
`) + (`assign ${outs(1)} = (${ins(1)} == 3'b001) ? ${ins(0)} : ${makeBits(w_5, toUInt64(fromInt32(0)))};
`)) + (`assign ${outs(2)} = (${ins(1)} == 3'b010) ? ${ins(0)} : ${makeBits(w_5, toUInt64(fromInt32(0)))};
`)) + (`assign ${outs(3)} = (${ins(1)} == 3'b011) ? ${ins(0)} : ${makeBits(w_5, toUInt64(fromInt32(0)))};
`)) + (`assign ${outs(4)} = (${ins(1)} == 3'b100) ? ${ins(0)} : ${makeBits(w_5, toUInt64(fromInt32(0)))};
`)) + (`assign ${outs(5)} = (${ins(1)} == 3'b101) ? ${ins(0)} : ${makeBits(w_5, toUInt64(fromInt32(0)))};
`)) + (`assign ${outs(6)} = (${ins(1)} == 3'b110) ? ${ins(0)} : ${makeBits(w_5, toUInt64(fromInt32(0)))};
`)) + (`assign ${outs(7)} = (${ins(1)} == 3'b111) ? ${ins(0)} : ${makeBits(w_5, toUInt64(fromInt32(0)))};
`);
        }
        case 16: {
            const cin = ins(0);
            const a = ins(1);
            const b = ins(2);
            const sum = outs(0);
            const cout = outs(1);
            return `assign {${cout},${sum} } = ${a} + ${b} + ${cin};
`;
        }
        case 17: {
            const a_1 = ins(0);
            const b_1 = ins(1);
            const sum_1 = outs(0);
            const cout_1 = outs(1);
            return `assign {${cout_1},${sum_1} } = ${a_1} + ${b_1} ;
`;
        }
        case 18: {
            const cin_1 = ins(0);
            const a_2 = ins(1);
            const b_2 = ins(2);
            const sum_2 = outs(0);
            return `assign ${sum_2} = ${a_2} + ${b_2} + ${cin_1};
`;
        }
        case 19: {
            const a_3 = ins(0);
            const b_3 = ins(1);
            const sum_3 = outs(0);
            return `assign ${sum_3} = ${a_3} + ${b_3} ;
`;
        }
        case 20: {
            const a_4 = ins(0);
            const b_4 = ins(1);
            const xor = outs(0);
            if (op != null) {
                return `assign ${xor} = (${a_4} * ${b_4})[n-1:0];
`;
            }
            else {
                return `assign ${xor} = ${a_4} ^ ${b_4};
`;
            }
        }
        case 21: {
            const a_5 = ins(0);
            const b_5 = ins(1);
            const andOut = outs(0);
            return `assign ${andOut} = ${a_5} & ${b_5};
`;
        }
        case 22: {
            const a_6 = ins(0);
            const b_6 = ins(1);
            const orOut = outs(0);
            return `assign ${orOut} = ${a_6} | ${b_6};
`;
        }
        case 23: {
            const a_7 = ins(0);
            const not = outs(0);
            return `assign ${not} = ~${a_7};
`;
        }
        case 24: {
            const a_8 = ins(0);
            const out = outs(0);
            const result1 = fold((s, v) => (s + "1"), "", toList(rangeDouble(1, 1, n_14)));
            return `assign ${out} = ${a_8} ? ${n_14}'b${result1} : ${n_14}'b0;
`;
        }
        case 25:
            return `assign ${outs(0)} = ${ins(2)} ? ${ins(1)} : ${ins(0)};
`;
        case 26:
            return `assign ${outs(0)} = ${ins(4)}[1] ? (${ins(4)}[0] ? ${ins(3)} : ${ins(2)}) : (${ins(4)}[0] ? ${ins(1)} : ${ins(0)})  ;
`;
        case 27:
            return `assign ${outs(0)} = ${ins(8)}[2] ? (${ins(8)}[1] ? (${ins(8)}[0] ? ${ins(7)} : ${ins(6)}) : (${ins(8)}[0] ? ${ins(5)} : ${ins(4)})) : (${ins(8)}[1] ? (${ins(8)}[0] ? ${ins(3)} : ${ins(2)}) : (${ins(8)}[0] ? ${ins(1)} : ${ins(0)}))  ;
`;
        case 28: {
            let sel;
            const arg_6 = ((outW_1 + lsb) - 1) | 0;
            sel = toText(printf("[%d:%d]"))(arg_6)(lsb);
            return `assign ${outs(0)} = ${ins(0)}${sel};
`;
        }
        case 29:
            return `assign ${outs(0)} = ${ins(0)} == ${makeBits(w_6, toUInt64(fromUInt32(c_1)))};
`;
        case 30:
            return `assign ${outs(0)} = ${ins(0)} == ${makeBits(w_7, toUInt64(fromUInt32(c_2)))};
`;
        case 31:
            return `assign ${outs(0)} = { ${ins(1)},${ins(0)} };
`;
        case 32: {
            const mergedInputs = StringModule_Concat("", toArray_1(delay(() => map_2((i_4) => ((i_4 === 0) ? (`${ins(i_4)}`) : (`${ins(i_4)},`)), rangeDouble(n_15 - 1, -1, 0)))));
            return `assign ${outs(0)} = { ${mergedInputs} };
`;
        }
        case 33: {
            const lsbBits = outW(0) | 0;
            const msbBits = outW(1) | 0;
            return toText(interpolate("assign %s%P() = %s%P()[%d%P():0];\n", [outs(0), ins(0), lsbBits - 1])) + toText(interpolate("assign %s%P() = %s%P()[%d%P():%d%P()];\n", [outs(1), ins(0), (msbBits + lsbBits) - 1, lsbBits]));
        }
        case 34:
            return fold((accstr, outstr) => (accstr + outstr), "", map3((index, width, lsb_1) => {
                const msb = ((width + lsb_1) - 1) | 0;
                return toText(interpolate("assign %s%P() = %s%P()[%d%P():%d%P()];\n", [outs(index), ins(0), msb, lsb_1]));
            }, toList(rangeDouble(0, 1, n_16 - 1)), outputWidths, lsBits));
        case 35:
            return toText(`${name} I${idNum} (${outs(0)}, ${ins(0)});
`);
        case 36:
            return `${name} I${idNum} (${outs(0)}, ${ins(0)}, clk);
`;
        case 37:
            return `${name} I${idNum} (${outs(0)}, ${ins(0)}, ${ins(1)}, ${ins(2)}, clk);
`;
        case 38:
            return toFail(printf("What? custom components cannot exist in fast Simulation data structure"));
        case 39:
            return toFail(`Invalid legacy component type '${fc.FType}'`);
        default: {
            const input = ins(0);
            const shifter = ins(1);
            const output = outs(0);
            switch (tp.tag) {
                case 1:
                    return `assign ${output} = ${input} >> ${shifter};
`;
                case 2:
                    return `assign ${output} = ${input} >>> ${shifter};
`;
                default:
                    return `assign ${output} = ${input} << ${shifter};
`;
            }
        }
    }
}

/**
 * return the header of the main verilog module with hardware inputs and outputs in header.
 */
export function getMainHeader(vType, profile, fs) {
    let header, array_2, clock;
    return [(header = StringModule_Concat(",\n\t", (array_2 = collect((fc_1) => {
        const matchValue = fc_1.FType;
        const matchValue_1 = fc_1.AccessPath;
        let matchResult;
        switch (matchValue.tag) {
            case 1: {
                if (isEmpty(matchValue_1)) {
                    matchResult = 0;
                }
                else {
                    matchResult = 2;
                }
                break;
            }
            case 0: {
                if (isEmpty(matchValue_1)) {
                    if (equals(vType, new VMode(0, []))) {
                        matchResult = 1;
                    }
                    else {
                        matchResult = 2;
                    }
                }
                else {
                    matchResult = 2;
                }
                break;
            }
            case 48: {
                if (isEmpty(matchValue_1)) {
                    if (equals(vType, new VMode(0, []))) {
                        matchResult = 1;
                    }
                    else {
                        matchResult = 2;
                    }
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
                return [fc_1.VerilogOutputName[0]];
            case 1:
                return [fc_1.VerilogOutputName[0]];
            default:
                return [];
        }
    }, append(fs.FGlobalInputComps, fs.FOrderedComps.filter((fc) => (isOutput(fc.FType) && equals(fc.AccessPath, empty()))))), append((vType.tag === 1) ? [] : ((profile.tag === 1) ? ["debug_clk", "RS232_Rx_TTL", "RS232_Tx_TTL"] : ["clk"]), array_2))), (clock = ((vType.tag === 0) ? ((profile.tag === 1) ? "input debug_clk;\ninput RS232_Rx_TTL;\noutput RS232_Tx_TTL;" : "input clk;") : ""), `module main (
	${header});
${clock}`))];
}

/**
 * return the wire and reg definitions needed to make the verilog design work.
 */
export function getMainSignalDefinitions(vType, profile, fs) {
    let array_1;
    const array_6 = sort(collect((fc_1) => mapIndexed((i, _arg) => fastOutputDefinition(vType, fc_1, i), fc_1.Outputs), (array_1 = map_4((tuple) => tuple[1], toArray(fs.FComps)), array_1.filter((fc) => fc.Active))), {
        Compare: comparePrimitives,
    });
    return append((vType.tag === 0) ? ((profile.tag === 1) ? ["wire clk;\n"] : []) : ["reg clk;\n"], array_6);
}

/**
 * get the module definitions (one per RAM instance) that define RAMs used
 * TODO: make output more compact by using multiple instances of one module where possible.
 * NB. Initial statement is used to initialise RAM as per simulation: should work with Quartus.
 * NB - there is some inconsistency between this definition and current simulation, which will output
 * ram[0] contents in clock 0 on q. the simulation is incompatible with FPGA tools and should change so
 * that initial ram output is always 0.
 */
export function extractRamDefinitions(fs) {
    return collect((fc) => {
        const matchValue = fc.FType;
        let matchResult, mem;
        switch (matchValue.tag) {
            case 40: {
                matchResult = 0;
                mem = matchValue.fields[0];
                break;
            }
            case 41: {
                matchResult = 0;
                mem = matchValue.fields[0];
                break;
            }
            case 42: {
                matchResult = 0;
                mem = matchValue.fields[0];
                break;
            }
            case 39: {
                matchResult = 0;
                mem = matchValue.fields[0];
                break;
            }
            default:
                matchResult = 1;
        }
        switch (matchResult) {
            case 0:
                return [[fc.VerilogComponentName, fc.FType]];
            default:
                return [];
        }
    }, fs.FOrderedComps);
}

/**
 * get the verilog statements output from each component
 */
export function getMainHardware(fs) {
    const hardware = concat([fs.FClockedComps, fs.FOrderedComps]);
    return map_4((fc) => getVerilogComponent(fs, fc), hardware);
}

/**
 * make a simple testbench which displays module outputs for the first 30 clock cycles
 */
export function getInitialSimulationBlock(vType, fs) {
    let array_1;
    const inDefs = StringModule_Concat("\n", map_4((fc) => {
        const width = fc.Outputs[0].Width | 0;
        const sigName = fc.VerilogOutputName[0];
        return `assign ${sigName} = ${makeBits(width, 0n)};`;
    }, fs.FGlobalInputComps));
    let patternInput_1;
    const tupledArg_1 = unzip(map_4((tupledArg) => {
        const fc_1 = tupledArg[1];
        const sigName_1 = fc_1.VerilogOutputName[0];
        let hexWidth;
        const w = fc_1.Outputs[0].Width | 0;
        if (w <= 0) {
            toFail(`Unexpected width (${w})in verilog output for ${fc_1.FullName}`);
        }
        hexWidth = (~~((w - 1) / 4) + 1);
        const heading = fc_1.SimComponent.Label;
        const heading_1 = fc_1.VerilogComponentName;
        const padding = max(0, hexWidth - heading_1.length) | 0;
        const heading_2 = replicate(padding, " ") + heading_1;
        return [heading_2, [max(hexWidth, heading_2.length), `${sigName_1}`]];
    }, (array_1 = toArray(fs.FComps), array_1.filter((_arg) => {
        let matchResult;
        if (_arg[1].FType.tag === 1) {
            if (isEmpty(_arg[1].AccessPath)) {
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
                return true;
            default:
                return false;
        }
    }))));
    const a = tupledArg_1[0];
    const b = tupledArg_1[1];
    patternInput_1 = [a, unzip(b)];
    const outVars = patternInput_1[1][1];
    const outNames = patternInput_1[0];
    const outFormat = patternInput_1[1][0];
    const outNames_1 = StringModule_Concat(" ", outNames);
    const outFormat_1 = StringModule_Concat(" ", map_4((width_1) => ("%" + (`${width_1}h`)), outFormat));
    const outVars_1 = StringModule_Concat(",", outVars);
    if (vType.tag === 1) {
        return [`
            initial
                    begin
                    ${inDefs}
                    clk = 1'b0;
                    #10
                    $display("${outNames_1}");
                    while ($time < 300)
                    begin
                        $display("${outFormat_1}",${outVars_1});
                        #5 clk = ~clk;
                        #5 clk = ~clk;
                    end
                    end
        `];
    }
    else {
        return [];
    }
}

export function getDebugController(profile, fs) {
    const padWithZeros = (a) => toArray_2(take(8, append_1(ofArray(a), replicate_1(8, "1\'b0"))));
    const comps = collect((tupledArg) => {
        const name = tupledArg[0];
        const width = tupledArg[1] | 0;
        return map_4((i) => (`${name}[${i}]`), Int32Array.from(rangeDouble(0, 1, width - 1)));
    }, map_4((fc_1) => [getVPortOut(fc_1, 0), fc_1.Outputs[0].Width], fs.FOrderedComps.filter((fc) => {
        if (fc.FType.tag === 2) {
            return true;
        }
        else {
            return false;
        }
    })));
    const comps_1 = mapIndexed((i_1, s) => {
        const i32 = i_1 | 0;
        const hexString = format('{0:' + "x2" + '}', i32);
        return `    "${hexString}": tx_byte <= { ${s} };`;
    }, map_4(padWithZeros, chunkBySize(8, comps)));
    const comps_2 = StringModule_Concat("\n", append(comps_1, ["    default: tx_byte <= 8\'hFF;"]));
    if (profile.tag === 1) {
        return [`
wire RS232_Rx_TTL;
wire RS232_Tx_TTL;
wire reset = 0;
reg transmit = 0;
reg [7:0] tx_byte = 0;
wire received;
wire [7:0] rx_byte;
wire is_receiving;
wire is_transmitting;
wire recv_error;
reg [3:0] num_received = 0;
reg [31:0] received_bytes = 0;
uart #(.baud_rate(9600), .sys_clk_freq(12000000))
uart0(
    .clk(debug_clk),
    .rst(reset),
    .rx(RS232_Rx_TTL),
    .tx(RS232_Tx_TTL),
    .transmit(transmit),
    .tx_byte(tx_byte),
    .received(received),
    .rx_byte(rx_byte),
    .is_receiving(is_receiving),
    .is_transmitting(is_transmitting),
    .recv_error(recv_error),
);
reg single_step = 0;
reg is_running = 0;
reg clk_is_active = 0;
assign clk = debug_clk & clk_is_active;
always @ (negedge debug_clk) begin
    clk_is_active <= 0;
    if (single_step)
        clk_is_active <= 1;
    if (is_running)
        clk_is_active <= 1;
end
always @ (posedge debug_clk) begin
    transmit <= 0;
    single_step <= 0;
    if (received) begin
        num_received <= num_received + 1;
        received_bytes <= { received_bytes [23:0], rx_byte };
    end
    if (num_received == 4'd1) begin
        if (received_bytes[7:0] == 8'h53/*S*/) begin
            num_received <= 4'h0;
            single_step <= 1;
        end
    if (received_bytes[7:0] == 8'h43/*C*/) begin
            num_received <= 4'h0;
            is_running <= 1;
        end
        if (received_bytes[7:0] == 8'h50/*P*/) begin
            num_received <= 4'h0;
            is_running <= 0;
        end
    end else if (num_received == 4'd3) begin
        if (received_bytes[23:16] == 8'h52/*R*/) begin // Read value of internal registers/wires
            num_received <= 4'h0;
            transmit <= 1;
            case (received_bytes[15:0])
            ${comps_2}
            endcase
        end
    end
end
`];
    }
    else {
        return [];
    }
}

/**
 * Outputs a string which contains a single verilog file with the hardware in verilog form.
 * The top-level simulation moudle is called main - other modules may be included for RAM & ROM
 * this can be called any time after after buildFastSimulation has created the initial FastSimulation
 * data structure.
 * To simulate this you would need to set up clk as a clock input, and provide stimulus for other inputs if
 * there are any.
 */
export function getVerilog(vType, fs, profile) {
    toConsole(printf("getVerilog"));
    writeVerilogNames(fs);
    return StringModule_Concat("\n", map_4((strings) => StringModule_Concat("", strings), [getInstantiatedModules(fs), getMainHeader(vType, profile, fs), getMainSignalDefinitions(vType, profile, fs), getMainHardware(fs), getInitialSimulationBlock(vType, fs), getDebugController(profile, fs), ["endmodule\n"]]));
}

//# sourceMappingURL=Verilog.fs.js.map
