import * as verilogGrammar from "../VerilogComponent/VerilogGrammar.js";
import nearley from "nearley";
import { fix, parseFromFile } from "../VerilogComponent/parser.js";
import { FSharpRef, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { bigint_type, list_type, option_type, array_type, int32_type, record_type, bool_type, string_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { CodeEditorOpen, VerilogInput_$reflection, ParserOutput_$reflection, ReplaceType } from "./VerilogTypes.fs.js";
import { map } from "../fable_modules/fable-library.4.1.4/Array.js";
import { toText, join, toFail, printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { hasExtn, dirName, makeLoadedComponentFromCanvasData, readFilesFromDirectory, baseNameWithoutExtension, pathJoin, writeFile, tryReadFileSync } from "../Interface/FilesIO.fs.js";
import { average, head, tail, collect, mapIndexed, fold, last, sum, isEmpty, take, ofSeq, singleton, append, unzip, indexed, item, zip, filter, length, sort, map as map_1, ofArray, empty } from "../fable_modules/fable-library.4.1.4/List.js";
import { SimpleJson_tryParse } from "../fable_modules/Fable.SimpleJson.3.24.0/./SimpleJson.fs.js";
import { createTypeInfo } from "../fable_modules/Fable.SimpleJson.3.24.0/./TypeInfo.Converter.fs.js";
import { Convert_fromJson } from "../fable_modules/Fable.SimpleJson.3.24.0/./Json.Converter.fs.js";
import { some, value as value_4 } from "../fable_modules/fable-library.4.1.4/Option.js";
import { CustomComponentType, Memory1, InitMemData, ComponentType, Project } from "../Common/CommonTypes.fs.js";
import { getSemanticErrors as getSemanticErrors_1 } from "./ErrorCheck.fs.js";
import { Fable_SimpleJson_Json__Json_stringify_Static_4E60E31B } from "../fable_modules/Fable.SimpleJson.3.24.0/Json.Converter.fs.js";
import { safeHash, comparePrimitives, compare, equals } from "../fable_modules/fable-library.4.1.4/Util.js";
import { fixCanvasState, createConnection, createComponent, createSheet } from "./SheetCreator.fs.js";
import { minValue } from "../fable_modules/fable-library.4.1.4/Date.js";
import { tryFind, map as map_2, ofList } from "../fable_modules/fable-library.4.1.4/Map.js";
import { fromUInt32, compare as compare_1, fromInt32, toInt64 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { getOrderedCompLabels } from "../Simulator/Extractor.fs.js";
import { List_distinct } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { runCanvasStateChecksAndBuildGraph } from "../Simulator/Builder.fs.js";
import { mergeDependencies } from "../Simulator/DependencyMerger.fs.js";
import { runFastSimulation, buildFastSimulation } from "../Simulator/Fast/FastRun.fs.js";
import { StringModule_TrimEnd, MapModule_Values } from "../Common/EEExtensions.fs.js";
import * as child_process from "child_process";
import { sleep, startImmediate } from "../fable_modules/fable-library.4.1.4/Async.js";
import { singleton as singleton_1 } from "../fable_modules/fable-library.4.1.4/AsyncBuilder.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { getTimeMs } from "../Common/TimeHelpers.fs.js";
import { toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";




export class ExtraErrorInfoJson extends Record {
    constructor(Text$, Copy, Replace) {
        super();
        this.Text = Text$;
        this.Copy = Copy;
        this.Replace = Replace;
    }
}

export function ExtraErrorInfoJson_$reflection() {
    return record_type("TestParser.ExtraErrorInfoJson", [], ExtraErrorInfoJson, () => [["Text", string_type], ["Copy", bool_type], ["Replace", string_type]]);
}

export class ErrorInfoJson extends Record {
    constructor(Line, Col, Length, Message, ExtraErrors) {
        super();
        this.Line = (Line | 0);
        this.Col = (Col | 0);
        this.Length = (Length | 0);
        this.Message = Message;
        this.ExtraErrors = ExtraErrors;
    }
}

export function ErrorInfoJson_$reflection() {
    return record_type("TestParser.ErrorInfoJson", [], ErrorInfoJson, () => [["Line", int32_type], ["Col", int32_type], ["Length", int32_type], ["Message", string_type], ["ExtraErrors", option_type(array_type(ExtraErrorInfoJson_$reflection()))]]);
}

export function replaceTypeToString(replaceType) {
    switch (replaceType.tag) {
        case 1:
            return "Assignment";
        case 2: {
            const var$ = replaceType.fields[0];
            return var$;
        }
        case 3:
            return "NoReplace";
        default:
            return "IODeclaration";
    }
}

export function stringToReplaceType(replaceType) {
    switch (replaceType) {
        case "IODeclaration":
            return new ReplaceType(0, []);
        case "Assignment":
            return new ReplaceType(1, []);
        case "NoReplace":
            return new ReplaceType(3, []);
        default: {
            const var$ = replaceType;
            return new ReplaceType(2, [var$]);
        }
    }
}

export function errorInfoToJson(errorInfo) {
    let matchValue, extra;
    return new ErrorInfoJson(errorInfo.Line, errorInfo.Col, errorInfo.Length, errorInfo.Message, (matchValue = errorInfo.ExtraErrors, (matchValue != null) ? ((extra = matchValue, map((extraError) => {
        const json = new ExtraErrorInfoJson(extraError.Text, extraError.Copy, replaceTypeToString(extraError.Replace));
        return json;
    }, extra))) : void 0));
}

toConsole(printf("[TEST] Starting Verilog parser tests"));

export function parseFile(src, dst) {
    const input = tryReadFileSync(src);
    let patternInput;
    if (input.tag === 1) {
        const msg_1 = input.fields[0];
        patternInput = [msg_1, empty()];
    }
    else {
        const msg = input.fields[0];
        let parseRes;
        const matchValue = SimpleJson_tryParse(parseFromFile(msg));
        if (matchValue != null) {
            const inputJson = matchValue;
            const typeInfo = createTypeInfo(ParserOutput_$reflection());
            parseRes = Convert_fromJson(inputJson, typeInfo);
        }
        else {
            throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
        }
        patternInput = [value_4(parseRes.Result), ofArray(value_4(parseRes.NewLinesIndex))];
    }
    const parse = patternInput[0];
    const linesIndex = patternInput[1];
    const output = writeFile(dst, parse);
    const fixedAST = fix(parse);
    let ast;
    const matchValue_1 = SimpleJson_tryParse(fixedAST);
    if (matchValue_1 != null) {
        const inputJson_1 = matchValue_1;
        const typeInfo_1 = createTypeInfo(VerilogInput_$reflection());
        ast = Convert_fromJson(inputJson_1, typeInfo_1);
    }
    else {
        throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
    }
    return [ast, linesIndex];
}

export const project = new Project("", "", "", empty());

export function getSemanticErrors(ast, linesIndex) {
    return getSemanticErrors_1(ast, linesIndex, new CodeEditorOpen(0, []), project);
}

export function errorCheck(ast, linesIndex, src, dst) {
    const refFile = pathJoin(["./src/Renderer/VerilogComponent/test/ref/semantic", baseNameWithoutExtension(src) + ".json"]);
    const refOutput = tryReadFileSync(refFile);
    let refErrors;
    if (refOutput.tag === 1) {
        const msg_1 = refOutput.fields[0];
        toConsole(`[TEST] Failed reading in reference output file ${refFile} ${msg_1}`);
        refErrors = empty();
    }
    else {
        const msg = refOutput.fields[0];
        const matchValue = SimpleJson_tryParse(msg);
        if (matchValue != null) {
            const inputJson = matchValue;
            const typeInfo = createTypeInfo(list_type(ErrorInfoJson_$reflection()));
            refErrors = Convert_fromJson(inputJson, typeInfo);
        }
        else {
            throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
        }
    }
    const outputErrors = map_1(errorInfoToJson, getSemanticErrors(ast, linesIndex));
    const writeRes = writeFile(dst, Fable_SimpleJson_Json__Json_stringify_Static_4E60E31B(outputErrors));
    toConsole(`[TEST] ${baseNameWithoutExtension(src)}`);
    if (equals(sort(outputErrors, {
        Compare: compare,
    }), sort(refErrors, {
        Compare: compare,
    }))) {
        toConsole(printf("[TEST] PASS"));
        return 1;
    }
    else {
        toConsole(printf("[TEST] FAIL"));
        return 0;
    }
}

export function semanticErrorTests(_arg) {
    const inputPath = "./src/Renderer/VerilogComponent/test/input/semantic";
    const outputPath = "./src/Renderer/VerilogComponent/test/output/semantic";
    const inputFiles = map_1((file) => pathJoin([inputPath, file]), readFilesFromDirectory(inputPath));
    const nrOfTestCases = length(inputFiles) | 0;
    const outputFiles = map_1((file_1) => pathJoin([outputPath, baseNameWithoutExtension(file_1) + ".json"]), inputFiles);
    const res_1 = length(filter((res) => (res === 1), map_1((tupledArg) => {
        const src = tupledArg[0];
        const dst = tupledArg[1];
        const patternInput = parseFile(src, dst);
        const linesIndex = patternInput[1];
        const ast = patternInput[0];
        return errorCheck(ast, linesIndex, src, dst) | 0;
    }, zip(inputFiles, outputFiles)))) | 0;
    toConsole(`[TEST] ${res_1}/${nrOfTestCases} passed`);
    return [res_1, nrOfTestCases];
}

export class codegenInput extends Record {
    constructor(Label, Width, Values) {
        super();
        this.Label = Label;
        this.Width = (Width | 0);
        this.Values = Values;
    }
}

export function codegenInput_$reflection() {
    return record_type("TestParser.codegenInput", [], codegenInput, () => [["Label", string_type], ["Width", int32_type], ["Values", list_type(int32_type)]]);
}

export class codegenOutput extends Record {
    constructor(Label, Values) {
        super();
        this.Label = Label;
        this.Values = Values;
    }
}

export function codegenOutput_$reflection() {
    return record_type("TestParser.codegenOutput", [], codegenOutput, () => [["Label", string_type], ["Values", list_type(bigint_type)]]);
}

export class PortInfo extends Record {
    constructor(Label, Width) {
        super();
        this.Label = Label;
        this.Width = (Width | 0);
    }
}

export function PortInfo_$reflection() {
    return record_type("TestParser.PortInfo", [], PortInfo, () => [["Label", string_type], ["Width", int32_type]]);
}

export class Input extends Record {
    constructor(Inputs, Outputs, IsClocked, ModuleName) {
        super();
        this.Inputs = Inputs;
        this.Outputs = Outputs;
        this.IsClocked = IsClocked;
        this.ModuleName = ModuleName;
    }
}

export function Input_$reflection() {
    return record_type("TestParser.Input", [], Input, () => [["Inputs", list_type(codegenInput_$reflection())], ["Outputs", list_type(PortInfo_$reflection())], ["IsClocked", bool_type], ["ModuleName", string_type]]);
}

export function simulateAST(ast, src, dst, loadedComps) {
    let out_1, matchValue_5, inputJson_1, typeInfo_1;
    const cs = createSheet(ast, new Project(project.ProjectPath, project.OpenFileName, project.WorkingFileName, loadedComps));
    const loadedComp = makeLoadedComponentFromCanvasData(cs[0], cs[1], "", minValue(), void 0, void 0)[0];
    const inputValuesFile = pathJoin([dirName(src), baseNameWithoutExtension(src) + ".json"]);
    const inputValuesFile_1 = tryReadFileSync(inputValuesFile);
    let inputs;
    if (inputValuesFile_1.tag === 1) {
        const error = inputValuesFile_1.fields[0];
        inputs = toFail(`Couldn't open input data file ${error}`);
    }
    else {
        const data = inputValuesFile_1.fields[0];
        const matchValue = SimpleJson_tryParse(data);
        if (matchValue != null) {
            const inputJson = matchValue;
            const typeInfo = createTypeInfo(Input_$reflection());
            inputs = Convert_fromJson(inputJson, typeInfo);
        }
        else {
            throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
        }
    }
    const width = 8;
    const ticks = (length(item(0, inputs.Inputs).Values) + 1) | 0;
    const cnt = createComponent(new ComponentType(38, [width]), "cnt");
    const memories = map_1((inputPort) => {
        const data_1 = ofList(map_1((tupledArg) => {
            const k = tupledArg[0] | 0;
            const v = tupledArg[1] | 0;
            return [toInt64(fromInt32(k)), toInt64(fromInt32(v))];
        }, indexed(inputPort.Values)), {
            Compare: compare_1,
        });
        const mem = new Memory1(new InitMemData(0, []), width, inputPort.Width, data_1);
        const rom = createComponent(new ComponentType(39, [mem]), "rom");
        const conn = createConnection(item(0, cnt.OutputPorts), item(0, rom.InputPorts));
        return [rom, conn];
    }, inputs.Inputs);
    const patternInput_1 = unzip(memories);
    const conns = patternInput_1[1];
    const comps = patternInput_1[0];
    const verilog = new CustomComponentType(loadedComp.Name, getOrderedCompLabels(new ComponentType(0, [0, void 0]), cs[0], cs[1]), getOrderedCompLabels(new ComponentType(1, [0]), cs[0], cs[1]), loadedComp.Form, loadedComp.Description);
    const verilogComp = createComponent(new ComponentType(26, [verilog]), "verilog");
    const verilogConns = map_1((tupledArg_1) => {
        const rom_1 = tupledArg_1[0];
        const inputport = tupledArg_1[1];
        return createConnection(item(0, rom_1.OutputPorts), inputport);
    }, zip(comps, verilogComp.InputPorts));
    const patternInput_2 = unzip(map_1((tupledArg_2) => {
        const label = tupledArg_2[0];
        const port = tupledArg_2[1];
        const out = createComponent(new ComponentType(1, [label[1]]), label[0]);
        const conn_1 = createConnection(port, item(0, out.InputPorts));
        return [out, conn_1];
    }, zip(verilog.OutputLabels, verilogComp.OutputPorts)));
    const outputs = patternInput_2[0];
    const outConns = patternInput_2[1];
    const outputCompIds = ofList(map_1((output) => [output.Label, output.Id], outputs), {
        Compare: comparePrimitives,
    });
    let topCanvas;
    const tupledArg_3 = [append(singleton(cnt), append(comps, append(singleton(verilogComp), outputs))), append(conns, append(verilogConns, outConns))];
    topCanvas = fixCanvasState(tupledArg_3[0], tupledArg_3[1]);
    const topLoadedComp = makeLoadedComponentFromCanvasData(topCanvas[0], topCanvas[1], "", minValue(), void 0, void 0)[0];
    const dependencies = List_distinct(append(ofArray([loadedComp, topLoadedComp]), loadedComps), {
        Equals: equals,
        GetHashCode: safeHash,
    });
    let simulationGraph;
    const matchValue_1 = runCanvasStateChecksAndBuildGraph(topCanvas[0], topCanvas[1], dependencies);
    if (matchValue_1.tag === 0) {
        const graph = matchValue_1.fields[0];
        simulationGraph = graph;
    }
    else {
        simulationGraph = toFail(printf("Wrong canvas state"));
    }
    let res;
    const matchValue_2 = mergeDependencies("test", simulationGraph, topCanvas[0], topCanvas[1], List_distinct(append(singleton(loadedComp), loadedComps), {
        Equals: equals,
        GetHashCode: safeHash,
    }));
    if (matchValue_2.tag === 1) {
        const error_1 = matchValue_2.fields[0];
        res = toFail(`wrong simulation graph - ${error_1}`);
    }
    else {
        const graph_1 = matchValue_2.fields[0];
        const matchValue_3 = buildFastSimulation(ticks, "wires", graph_1);
        if (matchValue_3.tag === 0) {
            const fs = matchValue_3.fields[0];
            runFastSimulation(void 0, ticks - 1, fs);
            res = ofSeq(MapModule_Values(map_2((label_1, id) => {
                const matchValue_4 = tryFind([id, empty()], fs.FComps);
                if (matchValue_4 != null) {
                    const fc = matchValue_4;
                    const data_2 = take(ticks - 1, ofArray((fc.Outputs[0].UInt32Step.length > 0) ? map(fromUInt32, fc.Outputs[0].UInt32Step) : fc.Outputs[0].BigIntStep));
                    return new codegenOutput(label_1, data_2);
                }
                else {
                    return toFail(printf("What? output doesn\'t have a fastcomponent"));
                }
            }, outputCompIds)));
        }
        else {
            res = toFail(printf("couldn\'t build simulation graph"));
        }
    }
    const writeRes = writeFile(dst, Fable_SimpleJson_Json__Json_stringify_Static_4E60E31B(res));
    const refFilePath = pathJoin(["./src/Renderer/VerilogComponent/test/ref/codegen", baseNameWithoutExtension(src)]) + ".json";
    const refFile = tryReadFileSync(refFilePath);
    const refOutput = map_1((out_2) => (new codegenOutput(out_2.Label.toLocaleUpperCase(), out_2.Values)), (refFile.tag === 0) ? ((out_1 = refFile.fields[0], (matchValue_5 = SimpleJson_tryParse(out_1), (matchValue_5 != null) ? ((inputJson_1 = matchValue_5, (typeInfo_1 = createTypeInfo(list_type(codegenOutput_$reflection())), Convert_fromJson(inputJson_1, typeInfo_1)))) : (() => {
        throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
    })()))) : toFail(printf("Couldn\'t open codegen reference output!")));
    toConsole(`[TEST] ${baseNameWithoutExtension(refFilePath)}`);
    if (equals(sort(res, {
        Compare: compare,
    }), sort(refOutput, {
        Compare: compare,
    }))) {
        toConsole(printf("[TEST] PASS"));
        return 1;
    }
    else {
        toConsole(printf("[TEST] FAIL"));
        return 0;
    }
}

export function runCodeGenTests(_arg) {
    const inputPath = "./src/Renderer/VerilogComponent/test/input/codegen/single";
    const outputPath = "./src/Renderer/VerilogComponent/test/output/codegen";
    const inputFiles = map_1((file) => pathJoin([inputPath, file]), filter((path) => hasExtn(".sv", path), readFilesFromDirectory(inputPath)));
    const outputFiles = map_1((file_1) => pathJoin([outputPath, baseNameWithoutExtension(file_1) + ".json"]), inputFiles);
    const res_1 = length(filter((res) => (res === 1), map_1((tupledArg) => {
        const src = tupledArg[0];
        const dst = tupledArg[1];
        const patternInput = parseFile(src, dst);
        const linesIndex = patternInput[1];
        const ast = patternInput[0];
        if (isEmpty(getSemanticErrors(ast, linesIndex))) {
            return simulateAST(ast, src, dst, empty()) | 0;
        }
        else {
            toConsole(`[TEST] couldn't parse input ${baseNameWithoutExtension(src)}`);
            return 0;
        }
    }, zip(inputFiles, outputFiles)))) | 0;
    const inputPath_1 = "./src/Renderer/VerilogComponent/test/input/codegen/multiple";
    const srcDirs = readFilesFromDirectory(inputPath_1);
    const multRes = sum(map_1((dir) => {
        const modulePaths = filter((fName) => hasExtn(".sv", fName), map_1((file_2) => pathJoin([inputPath_1, dir, file_2]), sort(readFilesFromDirectory(pathJoin([inputPath_1, dir])), {
            Compare: comparePrimitives,
        })));
        const topModulePath = last(modulePaths);
        const dst_1 = pathJoin([outputPath, baseNameWithoutExtension(topModulePath)]) + ".json";
        const loadedComps = fold((comps, file_3) => {
            toConsole(`${comps}, ${file_3}`);
            const patternInput_1 = parseFile(file_3, dst_1);
            const linesIndex_1 = patternInput_1[1];
            const ast_1 = patternInput_1[0];
            let cs;
            if (isEmpty(getSemanticErrors(ast_1, linesIndex_1))) {
                cs = createSheet(ast_1, new Project(project.ProjectPath, project.OpenFileName, project.WorkingFileName, comps));
            }
            else {
                toConsole(`[TEST] couldn't parse input ${baseNameWithoutExtension(file_3)}`);
                cs = [empty(), empty()];
            }
            const lc = makeLoadedComponentFromCanvasData(cs[0], cs[1], ast_1.Module.ModuleName.Name, minValue(), void 0, void 0)[0];
            return append(comps, singleton(lc));
        }, empty(), modulePaths);
        const patternInput_3 = parseFile(topModulePath, dst_1);
        const toplinesIndex = patternInput_3[1];
        const topast = patternInput_3[0];
        return simulateAST(topast, topModulePath, dst_1, loadedComps) | 0;
    }, srcDirs), {
        GetZero: () => 0,
        Add: (x_1, y_1) => (x_1 + y_1),
    }) | 0;
    const nrOfTestCases = (length(inputFiles) + length(srcDirs)) | 0;
    toConsole(`[TEST] ${res_1 + multRes}/${nrOfTestCases} passed`);
    return (res_1 + multRes) | 0;
}

export function executeCommand(command1, args1, dst) {
    let options;
    const o = {
        shell: false,
    };
    options = Object.assign({}, o);
    const child = child_process.spawn(command1, Array.from(args1), some(options));
    startImmediate(singleton_1.Delay(() => {
        const exit_code = new FSharpRef(0);
        return singleton_1.TryFinally(singleton_1.Delay(() => {
            const keepGoing = new FSharpRef(true);
            child.stdout.on("data", (d) => {
                let path;
                (dst == null) ? (new FSharpResult$2(0, [void 0])) : ((path = dst, writeFile(path, d)));
            });
            child.stderr.on("data", (e) => {
                toConsole(printf("Error: %s"))(e);
            });
            child.on("exit", (code) => {
                keepGoing.contents = false;
                exit_code.contents = (code | 0);
            });
            return singleton_1.While(() => keepGoing.contents, singleton_1.Delay(() => singleton_1.Bind(sleep(1000), () => singleton_1.Return(void 0))));
        }), () => {
            const arg_2 = exit_code.contents | 0;
            toConsole(printf("Child finished with exit code: %i"))(arg_2);
            if (exit_code.contents === 0) {
                toConsole(printf("Success"));
            }
            else {
                toConsole(printf("Fail"));
            }
        });
    }));
}

export function icarusCompile(src, dst, driver) {
    const command = "iverilog";
    const args = ofArray(["-Wall", "-g", "2012", "-o", dst, "-s", "top_module", driver, src]);
    const value = executeCommand(command, args, void 0);
}

export function icarusCompileTestCases() {
    const srcDir = "./src/Renderer/VerilogComponent/test/input/codegen/single";
    const driverDir = "./src/Renderer/VerilogComponent/test/input/driver";
    const dstDir = "./src/Renderer/VerilogComponent/test/bin";
    const srcFileNames = filter((fName) => hasExtn(".sv", fName), readFilesFromDirectory(srcDir));
    map_1((filename) => {
        const srcFilePath = pathJoin([srcDir, filename]);
        const driverFilePath = pathJoin([driverDir, filename]);
        const dstFilePath = pathJoin([dstDir, baseNameWithoutExtension(filename)]);
        icarusCompile(srcFilePath, dstFilePath, driverFilePath);
    }, srcFileNames);
    const srcDir_1 = "./src/Renderer/VerilogComponent/test/input/codegen/multiple";
    const srcDirs = readFilesFromDirectory(srcDir_1);
    map_1((dir) => {
        const srcFilePath_1 = pathJoin([srcDir_1, dir]) + "/*.sv";
        const driverFilePath_1 = pathJoin([driverDir, dir]) + ".sv";
        const dstFilePath_1 = pathJoin([dstDir, dir]);
        icarusCompile(srcFilePath_1, dstFilePath_1, driverFilePath_1);
    }, srcDirs);
}

export function icarusRun(src, dst) {
    const command = "vvp";
    const args = singleton(src);
    const value = executeCommand(command, args, dst);
}

export function icarusRunTestCases() {
    const srcDir = "./src/Renderer/VerilogComponent/test/bin";
    const dstDir = "./src/Renderer/VerilogComponent/test/ref/codegen";
    const binaries = readFilesFromDirectory(srcDir);
    map_1((bin) => {
        const binaryPath = pathJoin([srcDir, bin]);
        const refFilePath = pathJoin([dstDir, bin]) + ".json";
        icarusRun(binaryPath, refFilePath);
    }, binaries);
}

export function stringAppend(str1, str2) {
    return str2 + str1;
}

/**
 * Generate a top level module for a given DUT, return the Verilog module as a string
 * inputs stores the label and width of each input and output and the width and label of the output ports
 */
export function genDriver(inputs) {
    const module_definition = "module top_module;\n";
    const inputLabels = map_1((input) => (new PortInfo(input.Label, input.Width)), inputs.Inputs);
    const cycles = length(item(0, inputs.Inputs).Values) | 0;
    const input_declarations = stringAppend("integer i_, j_;\n", stringAppend("bit clk;\n", join("", map_1((input_1) => {
        let arg_2, arg_3, arg_4;
        let str_1;
        const arg = (input_1.Width - 1) | 0;
        str_1 = toText(printf("  bit [%d:0] %s;\n"))(arg)(input_1.Label);
        return stringAppend((arg_2 = ((input_1.Width - 1) | 0), (arg_3 = (input_1.Label + "_array"), (arg_4 = ((cycles - 1) | 0), toText(printf("  bit [%d:0] %s [%d:0];\n"))(arg_2)(arg_3)(arg_4)))), str_1);
    }, append(inputLabels, inputs.Outputs)))));
    let initial;
    const clockGen = stringAppend("    $display(\"[\");\n", stringAppend("    end \n", stringAppend("      clk=!clk;\n", stringAppend("      #1;\n", stringAppend(`    repeat(${(cycles * 2) + 4}) begin
`, stringAppend("   clk=0;\n", "  initial begin\n"))))));
    const outputs = stringAppend("    $finish(0);\n", stringAppend("    $write(\"]\");\n", join("", mapIndexed((i, output) => {
        let arg_6, arg_7, arg_9, arg_10;
        const sep_1 = (i < (length(inputs.Outputs) - 1)) ? ", " : "";
        let str_21;
        const str_19 = toText(printf("    $write(\"{\\\"Label\\\": \\\"%s\\\", \\\"Values\\\": [\");\n"))(output.Label);
        str_21 = stringAppend((arg_6 = ((cycles - 1) | 0), (arg_7 = (output.Label + "_array"), toText(printf("    for(i_=0;i_<%d; i_=i_+1) begin $write(\"%%d, \", %s[i_]); end\n"))(arg_6)(arg_7))), str_19);
        return stringAppend((arg_9 = (output.Label + "_array"), (arg_10 = ((cycles - 1) | 0), toText(printf("    $display(\"%%d]}%s\", %s[%i]);\n"))(sep_1)(arg_9)(arg_10))), str_21);
    }, inputs.Outputs))));
    initial = ((clockGen + outputs) + "  end\n");
    let initial2;
    const inputArrayAssigns = join("", map_1((input_2) => join("", mapIndexed((i_1, value) => {
        const arg_11 = input_2.Label + "_array";
        return toText(printf("      %s[%d] = %d\'d%d;\n"))(arg_11)(i_1)(input_2.Width)(value);
    }, input_2.Values)), inputs.Inputs));
    const forLoop = toText(printf("    for(j_=0; j_<%d; j_=j_+1) begin\n"))(cycles);
    const inputAssigns = join("", map_1((input_3) => {
        const arg_17 = input_3.Label + "_array";
        return toText(printf("        %s=%s[j_];\n"))(input_3.Label)(arg_17);
    }, inputs.Inputs));
    const outputAssigns = join("", map_1((output_1) => {
        const arg_18 = output_1.Label + "_array";
        return toText(printf("        %s[j_]=%s;\n"))(arg_18)(output_1.Label);
    }, inputs.Outputs));
    initial2 = stringAppend("  end\n", stringAppend("end\n", stringAppend("      @(negedge clk);\n", stringAppend(outputAssigns, stringAppend("      #0.5;\n", stringAppend(inputAssigns, stringAppend(forLoop, stringAppend(inputArrayAssigns, "  initial begin\n"))))))));
    let dut_instantiation;
    const input_params = join("", map_1((input_4) => toText(printf(".%s(%s), "))(input_4.Label)(input_4.Label), append(inputLabels, inputs.Outputs)));
    const clock = inputs.IsClocked ? ".clk(clk), " : "";
    const arg_23 = StringModule_TrimEnd([",", " "], input_params + clock);
    dut_instantiation = toText(printf("  %s dut (%s);\n"))(inputs.ModuleName)(arg_23);
    return ((((module_definition + input_declarations) + initial) + initial2) + dut_instantiation) + "endmodule";
}

export const testInput = new Input(singleton(new codegenInput("in", 3, ofArray([7, 1, 3, 1, 0, 1, 2, 3, 4, 5]))), singleton(new PortInfo("out", 3)), false, "buffer");

export function genDriverFiles() {
    const srcDir = "./src/Renderer/VerilogComponent/test/input/codegen/single";
    const dstDir = "./src/Renderer/VerilogComponent/test/input/driver";
    const srcFileNames = map_1((f) => pathJoin([srcDir, f]), filter((fName) => hasExtn("json", fName), readFilesFromDirectory(srcDir)));
    const multSrcDir = "./src/Renderer/VerilogComponent/test/input/codegen/multiple";
    const multSrcFileNames = map_1((f_2) => pathJoin([multSrcDir, f_2]), filter((fName_1) => hasExtn("json", fName_1), collect((dir) => map_1((f_1) => pathJoin([dir, f_1]), readFilesFromDirectory(pathJoin([multSrcDir, dir]))), readFilesFromDirectory(multSrcDir))));
    const srcFileNames_1 = append(srcFileNames, multSrcFileNames);
    map_1((tupledArg) => {
        const inputs_1 = tupledArg[0];
        const filename_1 = tupledArg[1];
        const driverCode = genDriver(inputs_1);
        const dst = pathJoin([dstDir, baseNameWithoutExtension(filename_1)]) + ".sv";
        return writeFile(dst, driverCode);
    }, map_1((filename) => {
        const refFile = tryReadFileSync(filename);
        let inputs;
        if (refFile.tag === 0) {
            const out = refFile.fields[0];
            const matchValue = SimpleJson_tryParse(out);
            if (matchValue != null) {
                const inputJson = matchValue;
                const typeInfo = createTypeInfo(Input_$reflection());
                inputs = Convert_fromJson(inputJson, typeInfo);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
        }
        else {
            inputs = toFail(printf("Couldn\'t open port info file for driver module generation %s"))(filename);
        }
        return [inputs, filename];
    }, srcFileNames_1));
}

export function runCompilerTests(_arg) {
    const filenames = map_1((file) => pathJoin(["./src/Renderer/VerilogComponent/test/input/valid", file]), readFilesFromDirectory("./src/Renderer/VerilogComponent/test/input/valid"));
    const destinations = map_1((file_1) => pathJoin(["./src/Renderer/VerilogComponent/test/output/valid", baseNameWithoutExtension(file_1) + ".json"]), filenames);
    map_1((tupledArg) => {
        const src = tupledArg[0];
        const dst = tupledArg[1];
        return parseFile(src, dst);
    }, zip(filenames, destinations));
    semanticErrorTests(void 0);
    runCodeGenTests(void 0);
}

export function unzip5(lst) {
    if (!isEmpty(lst)) {
        const t = tail(lst);
        const e = head(lst)[4];
        const d = head(lst)[3];
        const c = head(lst)[2];
        const b = head(lst)[1];
        const a = head(lst)[0];
        const patternInput = unzip5(t);
        const e$0027 = patternInput[4];
        const d$0027 = patternInput[3];
        const c$0027 = patternInput[2];
        const b$0027 = patternInput[1];
        const a$0027 = patternInput[0];
        return [append(singleton(a), a$0027), append(singleton(b), b$0027), append(singleton(c), c$0027), append(singleton(d), d$0027), append(singleton(e), e$0027)];
    }
    else {
        return [empty(), empty(), empty(), empty(), empty()];
    }
}

export const dummyProject = new Project("", "", void 0, empty());

export function standardDev(list) {
    const count = length(list) | 0;
    const mean = sum(list, {
        GetZero: () => 0,
        Add: (x, y) => (x + y),
    }) / count;
    const squaredDifferences = map_1((x_1) => {
        const arg0__5 = x_1 - mean;
        return Math.pow(arg0__5, 2);
    }, list);
    const meanOfSquaredDifferences = sum(squaredDifferences, {
        GetZero: () => 0,
        Add: (x_2, y_1) => (x_2 + y_1),
    }) / count;
    const standardDeviation = Math.sqrt(meanOfSquaredDifferences);
    return standardDeviation;
}

export function runPerformanceTests() {
    const srcDir = "./src/Renderer/VerilogComponent/test/input/codegen/single";
    const files = filter((fName) => hasExtn(".sv", fName), readFilesFromDirectory(srcDir));
    writeFile("./verilogPerformance.txt", join("", map_1((file) => {
        const filePath = pathJoin([srcDir, file]);
        let input;
        const matchValue = tryReadFileSync(filePath);
        if (matchValue.tag === 0) {
            const msg = matchValue.fields[0];
            input = msg;
        }
        else {
            input = toFail(printf("Couldn\'t read file"));
        }
        const tupledArg = unzip5(map_1((_arg) => {
            const parseStart = getTimeMs();
            let patternInput;
            let parseRes;
            const matchValue_1 = SimpleJson_tryParse(parseFromFile(input));
            if (matchValue_1 != null) {
                const inputJson = matchValue_1;
                const typeInfo = createTypeInfo(ParserOutput_$reflection());
                parseRes = Convert_fromJson(inputJson, typeInfo);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            patternInput = [value_4(parseRes.Result), ofArray(value_4(parseRes.NewLinesIndex))];
            const parse = patternInput[0];
            const linesIndex = patternInput[1];
            const fixedAST = fix(parse);
            let ast;
            const matchValue_2 = SimpleJson_tryParse(fixedAST);
            if (matchValue_2 != null) {
                const inputJson_1 = matchValue_2;
                const typeInfo_1 = createTypeInfo(VerilogInput_$reflection());
                ast = Convert_fromJson(inputJson_1, typeInfo_1);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            const parseEnd = getTimeMs();
            getSemanticErrors_1(ast, linesIndex, new CodeEditorOpen(0, []), dummyProject);
            const errorCheckEnd = getTimeMs();
            createSheet(ast, dummyProject);
            const synthesisEnd = getTimeMs();
            return [length(linesIndex), parseEnd - parseStart, errorCheckEnd - parseEnd, synthesisEnd - errorCheckEnd, synthesisEnd - parseStart];
        }, toList(rangeDouble(1, 1, 100))));
        const lineNums = tupledArg[0];
        const parse_1 = tupledArg[1];
        const error = tupledArg[2];
        const synth = tupledArg[3];
        const total = tupledArg[4];
        const matchValue_3 = item(0, lineNums) | 0;
        const matchValue_4 = average(parse_1, {
            GetZero: () => 0,
            Add: (x_1, y) => (x_1 + y),
            DivideByInt: (x, i) => (x / i),
        });
        const matchValue_5 = average(error, {
            GetZero: () => 0,
            Add: (x_3, y_1) => (x_3 + y_1),
            DivideByInt: (x_2, i_1) => (x_2 / i_1),
        });
        const matchValue_6 = average(synth, {
            GetZero: () => 0,
            Add: (x_5, y_2) => (x_5 + y_2),
            DivideByInt: (x_4, i_2) => (x_4 / i_2),
        });
        const e = average(total, {
            GetZero: () => 0,
            Add: (x_7, y_3) => (x_7 + y_3),
            DivideByInt: (x_6, i_3) => (x_6 / i_3),
        });
        const d = matchValue_6;
        const c = matchValue_5;
        const b = matchValue_4;
        const a = matchValue_3 | 0;
        return `${a}, ${b}, ${c}, ${d}, ${e}
`;
    }, files)));
    const arg_2 = join("", map_1((file_1) => {
        const filePath_1 = pathJoin([srcDir, file_1]);
        let input_3;
        const matchValue_8 = tryReadFileSync(filePath_1);
        if (matchValue_8.tag === 0) {
            const msg_1 = matchValue_8.fields[0];
            input_3 = msg_1;
        }
        else {
            input_3 = toFail(printf("Couldn\'t read file"));
        }
        const tupledArg_1 = unzip(map_1((_arg_1) => {
            let patternInput_2;
            let parseRes_1;
            const matchValue_9 = SimpleJson_tryParse(parseFromFile(input_3));
            if (matchValue_9 != null) {
                const inputJson_2 = matchValue_9;
                const typeInfo_2 = createTypeInfo(ParserOutput_$reflection());
                parseRes_1 = Convert_fromJson(inputJson_2, typeInfo_2);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            patternInput_2 = [value_4(parseRes_1.Result), ofArray(value_4(parseRes_1.NewLinesIndex))];
            const parse_2 = patternInput_2[0];
            const linesIndex_1 = patternInput_2[1];
            const fixedAST_1 = fix(parse_2);
            let ast_1;
            const matchValue_10 = SimpleJson_tryParse(fixedAST_1);
            if (matchValue_10 != null) {
                const inputJson_3 = matchValue_10;
                const typeInfo_3 = createTypeInfo(VerilogInput_$reflection());
                ast_1 = Convert_fromJson(inputJson_3, typeInfo_3);
            }
            else {
                throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
            }
            const errorCheckEnd_1 = getTimeMs();
            const cs = createSheet(ast_1, dummyProject);
            const synthesisEnd_1 = getTimeMs();
            return [length(cs[0]), synthesisEnd_1 - errorCheckEnd_1];
        }, toList(rangeDouble(1, 1, 100))));
        const compNum = tupledArg_1[0];
        const synth_1 = tupledArg_1[1];
        const matchValue_11 = item(0, compNum) | 0;
        const b_1 = average(synth_1, {
            GetZero: () => 0,
            Add: (x_9, y_4) => (x_9 + y_4),
            DivideByInt: (x_8, i_4) => (x_8 / i_4),
        });
        const a_1 = matchValue_11 | 0;
        return `${a_1}, ${b_1}
`;
    }, files));
    toConsole(printf("%A"))(arg_2);
}

//# sourceMappingURL=TestParser.fs.js.map
