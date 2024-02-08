import { productionBuild } from "./JSHelpers.fs.js";
import * as path_1 from "path";
import * as fs from "fs";
import { interpolate, split, toFail, printf, toText, endsWith, toConsole, join } from "../fable_modules/fable-library.4.1.4/String.js";
import { exists as exists_1, toArray, toList, filter, isEmpty, tryItem, skip, reverse } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { defaultArg, bind, some, map } from "../fable_modules/fable-library.4.1.4/Option.js";
import { isLetterOrDigit, isDigit } from "../fable_modules/fable-library.4.1.4/Char.js";
import { Result_Bind, Result_Map, FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { iterate, zip, length, item, fold, head, tail, isEmpty as isEmpty_1, tryHead, map as map_1, sortDescending, filter as filter_1, empty } from "../fable_modules/fable-library.4.1.4/List.js";
import { StringModule_Contains, StringModule_EndsWith, StringModule_Concat, StringModule_Trim, StringModule_SplitRemoveEmptyEntries, StringModule_StartsWith, StringModule_TryParseWith, StringModule_SplitString, StringModule_ToLower } from "../Common/EEExtensions.fs.js";
import { sortBy, tryFind, mapIndexed, equalsWith, singleton, allPairs, map as map_2, tryItem as tryItem_1 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { tryParse } from "../fable_modules/fable-library.4.1.4/Int32.js";
import { Union, FSharpRef } from "../fable_modules/fable-library.4.1.4/Types.js";
import { equals as equals_1, equalArrays, bigintHash, defaultOf, compareArrays } from "../fable_modules/fable-library.4.1.4/Util.js";
import { tryFindError, JsonHelpers_SavedInfo__get_getSheetInfo, JsonHelpers_SavedInfo__get_getWaveInfo, JsonHelpers_SavedInfo__get_getTimeStamp, JsonHelpers_stateToJsonStringNew, JsonHelpers_stateToJsonString, JsonHelpers_SavedInfo, JsonHelpers_jsonStringToState } from "../Common/Helpers.fs.js";
import { equals, compare, fromInt32, op_Addition, fromInt64, op_LeftShift, op_Subtraction, op_BitwiseAnd, toUInt64, fromUInt64, toInt64 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { toArray as toArray_1, ofArray } from "../fable_modules/fable-library.4.1.4/Map.js";
import { SimpleJson_tryParse } from "../fable_modules/Fable.SimpleJson.3.24.0/./SimpleJson.fs.js";
import { createTypeInfo } from "../fable_modules/Fable.SimpleJson.3.24.0/./TypeInfo.Converter.fs.js";
import { union_type, class_type, int64_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { Convert_fromJson } from "../fable_modules/Fable.SimpleJson.3.24.0/./Json.Converter.fs.js";
import * as remote from "@electron/remote";
import { hex64, strToIntCheckWidth } from "../Simulator/NumberHelpers.fs.js";
import { Array_groupBy } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { LoadedComponent_$reflection, LoadedComponent, getMemType, convertFromJSONComponent, legacyTypesConvert, Component, ComponentType, InitMemData, LegacyCanvas_LegacyComponent, LegacyCanvas_LegacyConnection, SheetInfo, CCForm, Memory1 } from "../Common/CommonTypes.fs.js";
import { compare as compare_1, now } from "../fable_modules/fable-library.4.1.4/Date.js";
import { parseDiagramSignature } from "../Simulator/Extractor.fs.js";

/**
 * This uses a fixed directory for production as a hack.
 * it is dependent on the electron build which positions static assets there.
 * productionbuild is defined in JSHelpers to be true for production (binary) builds only
 */
export function staticDir() {
    const isMac = process.platform === "darwin";
    if (productionBuild && !isMac) {
        return "./resources/static";
    }
    else if (productionBuild && isMac) {
        return "./Resources/static";
    }
    else {
        return __static;
    }
}

export const staticFileDirectory = staticDir();

export function pathJoin(args) {
    return path_1.join(...args);
}

export function baseName(filePath) {
    return path_1.basename(filePath);
}

export function dirName(filePath) {
    return path_1.dirname(filePath);
}

export function readFile(filePath) {
    return fs.readFileSync(filePath, "utf8");
}

export function exists(filePath) {
    return fs.existsSync(filePath);
}

export function extName(filePath) {
    return path_1.extname(filePath);
}

export function mkdir(folderPath) {
    fs.mkdirSync(folderPath);
}

export function readdir(folderPath) {
    return fs.readdirSync(folderPath);
}

export function unlink(folderPath) {
    fs.unlink(folderPath, (value) => {
    });
}

export function rename(oldPath, newPath) {
    fs.renameSync(oldPath, newPath);
}

export function ensureDirectory(dPath) {
    if (!exists(dPath)) {
        mkdir(dPath);
    }
}

export function pathWithoutExtension(filePath) {
    let source_1;
    const ext = extName(filePath);
    return join("", reverse((source_1 = reverse(filePath.split("")), skip(ext.length, source_1))));
}

export const baseNameWithoutExtension = (arg) => baseName(pathWithoutExtension(arg));

export function fileNameIsBad(name) {
    const matchValue = map((c) => {
        if (isDigit(c)) {
            return true;
        }
        else {
            return c === "_";
        }
    }, tryItem(0, name));
    let matchResult;
    if (matchValue == null) {
        matchResult = 1;
    }
    else if (matchValue) {
        matchResult = 0;
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return true;
        default:
            return !isEmpty(filter((ch) => {
                let ch_1;
                return !((ch === " ") ? true : ((ch_1 = ch, isLetterOrDigit(ch_1) ? true : (ch_1 === "_"))));
            }, name));
    }
}

export const filePathIsBad = (arg) => fileNameIsBad(baseNameWithoutExtension(arg).split(""));

export function fileExistsWithExtn(extn, folderPath, baseName_1) {
    const path = pathJoin([folderPath, baseName_1 + extn]);
    return exists(path);
}

export function tryReadFileSync(fPath) {
    if (!exists(fPath)) {
        return new FSharpResult$2(1, [`Error: file ${fPath} does not exist`]);
    }
    else {
        return new FSharpResult$2(0, [readFile(fPath)]);
    }
}

/**
 * Write base64 encoded data to file.
 * Create file if it does not exist.
 */
export function writeFileBase64(path, data) {
    const options = some({
        encoding: "base64",
    });
    try {
        fs.writeFileSync(path, data, some(options));
        return new FSharpResult$2(0, [void 0]);
    }
    catch (e) {
        return new FSharpResult$2(1, [`Error '${e.message}' writing file '${path}'`]);
    }
}

/**
 * Write utf8 encoded data to file.
 * Create file if it does not exist.
 */
export function writeFile(path, data) {
    try {
        const options = some({
            encoding: "utf8",
        });
        fs.writeFileSync(path, data, some(options));
        return new FSharpResult$2(0, [void 0]);
    }
    catch (e) {
        return new FSharpResult$2(1, [`Error '${e.message}' writing file '${path}'`]);
    }
}

/**
 * read file names from directory: returning [] on any error.
 */
export function readFilesFromDirectory(path) {
    if (exists(path)) {
        try {
            return toList(readdir(path));
        }
        catch (e) {
            toConsole(`Warning: readFilesFromDirectory has used readdir on 'path'='${path}' with an exception ${e.message}`);
            return empty();
        }
    }
    else {
        toConsole(`Warning: readFilesFromDirectory has 'path'='${path}' and this directory does not exist.`);
        return empty();
    }
}

export function hasExtn(extn, fName) {
    return endsWith(StringModule_ToLower(fName), StringModule_ToLower(extn));
}

/**
 * copy a sheet from some source path to a destination path
 */
export function copyFile(sourcePath, newPath) {
    const matchValue = writeFile(newPath, readFile(sourcePath));
    if (matchValue.tag === 1) {
        const msg = matchValue.fields[0];
        console.log(msg);
    }
}

export function readFilesFromDirectoryWithExtn(path, extn) {
    return filter_1((name) => hasExtn(extn, name), readFilesFromDirectory(path));
}

export function removeExtn(extn, fName) {
    if (hasExtn(extn, fName)) {
        return fName.slice(0, ((fName.length - extn.length) - 1) + 1);
    }
    else {
        return void 0;
    }
}

/**
 * returns the list of backup files in descending chronological order.
 */
export function backupFileData(path, baseName_1) {
    return sortDescending(map_1((fn_1) => {
        let option;
        return [(option = tryItem_1(1, StringModule_SplitString(["-"], fn_1)), bind(StringModule_TryParseWith((arg) => {
            let outArg = 0;
            return [tryParse(arg, 511, false, 32, new FSharpRef(() => outArg, (v) => {
                outArg = (v | 0);
            })), outArg];
        }), option)), fn_1];
    }, filter_1((fn) => StringModule_StartsWith(baseName_1 + "-", fn), readFilesFromDirectory(path))), {
        Compare: compareArrays,
    });
}

/**
 * returns the sequence number and name of the most recent (highest sequence number) backup file
 */
export function latestBackupFileData(path, baseName_1) {
    return bind((_arg) => {
        if (_arg[0] != null) {
            const n = _arg[0] | 0;
            const fn = _arg[1];
            return [n, fn];
        }
        else {
            return void 0;
        }
    }, tryHead(backupFileData(path, baseName_1)));
}

function tryLoadStateFromPath(filePath) {
    if (!exists(filePath)) {
        return new FSharpResult$2(1, [toText(printf("Can\'t read file from %s because it does not seem to exist!"))(filePath)]);
    }
    else {
        const _arg = Result_Map(JsonHelpers_jsonStringToState, (() => {
            try {
                return new FSharpResult$2(0, [readFile(filePath)]);
            }
            catch (e) {
                return new FSharpResult$2(1, [`Error ${e.message} reading file '${filePath}'`]);
            }
        })());
        if (_arg.tag === 0) {
            const res = _arg.fields[0];
            return new FSharpResult$2(0, [res]);
        }
        else {
            const msg = _arg.fields[0];
            return new FSharpResult$2(1, [toText(printf("could not convert file \'%s\' to a valid issie design sheet. Details: %s"))(filePath)(msg)]);
        }
    }
}

export function makeData(aWidth, dWidth, makeFun) {
    const truncate = (n) => {
        let w;
        return toInt64(fromUInt64((dWidth === 64) ? n : ((w = (dWidth | 0), toUInt64(op_BitwiseAnd(toUInt64(op_Subtraction(toUInt64(op_LeftShift(1n, w)), 1n)), n))))));
    };
    const a = ~~(aWidth / 2) | 0;
    const inp = toArray(rangeDouble(0, 1, (1 << a) - 1));
    return ofArray(map_2((tupledArg) => {
        const x = tupledArg[0] | 0;
        const y = tupledArg[1] | 0;
        return [toInt64(fromInt64(toInt64(op_Addition(toInt64(op_LeftShift(toInt64(fromInt32(x)), a)), toInt64(fromInt32(y)))))), truncate(toUInt64(fromInt32(makeFun(x, y))))];
    }, allPairs(inp, inp)), {
        Compare: compare,
    });
}

export function makeFixedROM(addr, data, mem) {
    let d, a, d_1, a_1;
    const signExtend = (w, n) => {
        if ((n & (1 << (w - 1))) !== 0) {
            return (((-1 << w) | n) & -1) | 0;
        }
        else {
            return n | 0;
        }
    };
    const matchValue = mem.Init;
    let matchResult;
    switch (matchValue.tag) {
        case 4: {
            if ((d = (data | 0), (a = (addr | 0), ((a % 2) === 0) && (a <= 16)))) {
                matchResult = 0;
            }
            else {
                matchResult = 3;
            }
            break;
        }
        case 5: {
            if ((d_1 = (data | 0), (a_1 = (addr | 0), ((a_1 % 2) === 0) && (a_1 <= 16)))) {
                matchResult = 1;
            }
            else {
                matchResult = 3;
            }
            break;
        }
        case 0: {
            matchResult = 2;
            break;
        }
        default:
            matchResult = 3;
    }
    switch (matchResult) {
        case 0: {
            const d_2 = data | 0;
            const a_2 = addr | 0;
            return new FSharpResult$2(0, [makeData(a_2, d_2, (x, y) => ((x * y) % (1 << d_2)))]);
        }
        case 1: {
            const d_3 = data | 0;
            const a_3 = addr | 0;
            const w_1 = ~~(a_3 / 2) | 0;
            return new FSharpResult$2(0, [makeData(a_3, d_3, (x_1, y_1) => ((signExtend(w_1, x_1) * signExtend(w_1, y_1)) & ((1 << d_3) - 1)))]);
        }
        case 2:
            return new FSharpResult$2(0, [mem.Data]);
        default:
            return toFail(`addr=${addr}, data=${data}, int=${mem.Init} not allowed in makeFixedROM`);
    }
}

export function jsonStringToMem(jsonString) {
    let matchValue, inputJson, typeInfo;
    try {
        return new FSharpResult$2(0, [(matchValue = SimpleJson_tryParse(jsonString), (matchValue != null) ? ((inputJson = matchValue, (typeInfo = createTypeInfo(class_type("Microsoft.FSharp.Collections.FSharpMap`2", [int64_type, int64_type])), Convert_fromJson(inputJson, typeInfo)))) : (() => {
            throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
        })())]);
    }
    catch (ex) {
        return new FSharpResult$2(1, [ex.message]);
    }
}

export function getBaseNameNoExtension(filePath) {
    const name = baseName(filePath);
    const matchValue = toList(split(name, ["."], void 0, 0));
    if (!isEmpty_1(matchValue)) {
        if (isEmpty_1(tail(matchValue))) {
            const name_1 = head(matchValue);
            return name_1;
        }
        else {
            const firstSplit = head(matchValue);
            const splits = tail(matchValue);
            const rest = fold((baseName_1, i) => ((name + ".") + item(i, splits)), "", toList(rangeDouble(0, 1, length(splits) - 2)));
            return firstSplit + rest;
        }
    }
    else {
        return toFail(printf("what? split at . in a filename should never return empty list"));
    }
}

function makeFileFilters(name, extn) {
    return singleton({
        name: name,
        extensions: [extn],
    });
}

/**
 * Ask the user to choose a project file, with a dialog window.
 * Return the folder containing the chosen project file.
 * Return None if the user exits withouth selecting a path.
 */
export function askForExistingProjectPath(defaultPath) {
    let arg;
    const options = {};
    options.filters = ((arg = makeFileFilters("ISSIE project file", "dprj"), Array.from(arg)));
    options.defaultPath = defaultArg(defaultPath, remote.app.getPath("documents"));
    const w = remote.getCurrentWindow();
    return bind((arg_3) => {
        const _arg = toList(arg_3);
        if (!isEmpty_1(_arg)) {
            const p = head(_arg);
            return dirName(p);
        }
        else {
            return void 0;
        }
    }, remote.dialog.showOpenDialogSync(w, options));
}

/**
 * ask for existing sheet paths
 */
export function askForExistingSheetPaths(defaultPath) {
    let arg;
    const options = {};
    options.filters = ((arg = makeFileFilters("ISSIE sheet", "dgm"), Array.from(arg)));
    options.defaultPath = defaultArg(defaultPath, remote.app.getPath("documents"));
    options.properties = ["openFile", "multiSelections"];
    const w = remote.getCurrentWindow();
    return bind((arg_3) => {
        const _arg = toList(arg_3);
        if (isEmpty_1(_arg)) {
            return void 0;
        }
        else {
            const paths = _arg;
            return paths;
        }
    }, remote.dialog.showOpenDialogSync(w, options));
}

/**
 * Ask the user a new project path, with a dialog window.
 * Return None if the user exits withouth selecting a path.
 */
export function askForNewProjectPath(defaultPath) {
    let arg;
    const options = {};
    options.filters = ((arg = makeFileFilters("ISSIE project", ""), Array.from(arg)));
    options.title = "Enter new ISSIE project directory and name";
    options.nameFieldLabel = "New project name";
    options.defaultPath = defaultPath;
    options.buttonLabel = "Create Project";
    options.properties = ["createDirectory", "showOverwriteConfirmation"];
    const w = remote.getCurrentWindow();
    return bind((dPath) => {
        const dir = dirName(dPath);
        const files = readdir(dir);
        if (exists_1((fn) => endsWith(fn, ".dprj"), files)) {
            remote.dialog.showErrorBox("Invalid project directory", "You are trying to create a new Issie project inside an existing project directory. This is not allowed, please choose a different directory");
            return askForNewProjectPath(defaultPath);
        }
        else {
            return dPath;
        }
    }, remote.dialog.showSaveDialogSync(options));
}

export function tryCreateFolder(path) {
    if (exists_1((arg) => {
        let ch_1;
        return !((ch_1 = arg, isLetterOrDigit(ch_1) ? true : (ch_1 === "_")));
    }, baseName(path).split(""))) {
        return new FSharpResult$2(1, ["File or project names must contain only letters, digits, or underscores"]);
    }
    else {
        try {
            const arg_2 = mkdir(path);
            return new FSharpResult$2(0, [void 0]);
        }
        catch (ex) {
            return new FSharpResult$2(1, [`Can't create folder '${path}': ${ex.message}`]);
        }
    }
}

/**
 * Asyncronously remove file.
 * ignore if file does not exist
 */
export function removeFileWithExtn(extn, folderPath, baseName_1) {
    const path = pathJoin([folderPath, baseName_1 + extn]);
    if (exists(path)) {
        try {
            unlink(path);
        }
        catch (matchValue) {
        }
    }
}

export function renameFile(extn, folderPath, baseName_1, newBaseName) {
    const oldPath = pathJoin([folderPath, baseName_1 + extn]);
    const newPath = pathJoin([folderPath, newBaseName + extn]);
    if (exists(oldPath)) {
        try {
            const arg = rename(oldPath, newPath);
            return new FSharpResult$2(0, [void 0]);
        }
        catch (e) {
            return new FSharpResult$2(1, [`Rename of '${baseName_1}' in '${folderPath}' failed`]);
        }
    }
    else if (extn === ".dgm") {
        return new FSharpResult$2(1, [`Error: The file '${baseName_1}${extn} appears to have been removed`]);
    }
    else {
        return new FSharpResult$2(0, [void 0]);
    }
}

export function removeFile(folderPath, baseName_1) {
    removeFileWithExtn(".dgm", folderPath, baseName_1);
}

export function removeAutoFile(folderPath, baseName_1) {
    const path = pathJoin([folderPath, baseName_1 + ".dgmauto"]);
    unlink(path);
}

export function readMemDefnLine(addressWidth, wordWidth, lineNo, s) {
    const nums = StringModule_SplitRemoveEmptyEntries([" ", "\t", ",", ";", "\""], s);
    if (!equalsWith((x, y) => (x === y), nums, defaultOf()) && (nums.length === 2)) {
        const data = nums[1];
        const addr = nums[0];
        const addrNum = strToIntCheckWidth(addressWidth, addr);
        const dataNum = strToIntCheckWidth(wordWidth, data);
        const copyOfStruct = addrNum;
        if (copyOfStruct.tag === 1) {
            const aErr = copyOfStruct.fields[0];
            return new FSharpResult$2(1, [`Line ${lineNo}:'${s}' has invalid address (${addr}). ${aErr}`]);
        }
        else {
            const copyOfStruct_1 = dataNum;
            if (copyOfStruct_1.tag === 1) {
                const dErr = copyOfStruct_1.fields[0];
                return new FSharpResult$2(1, [`Line '${s}' has invalid data item (${data}). ${dErr}`]);
            }
            else {
                const a = copyOfStruct.fields[0];
                const d = copyOfStruct_1.fields[0];
                return new FSharpResult$2(0, [[a, d]]);
            }
        }
    }
    else {
        const x_1 = nums;
        return new FSharpResult$2(1, [`Line ${lineNo}:'${s}' has ${x_1.length} items: valid lines consist of two numbers`]);
    }
}

export function readMemLines(addressWidth, wordWidth, lines) {
    let array;
    const parse = mapIndexed((lineNo, s) => readMemDefnLine(addressWidth, wordWidth, lineNo, s), (array = map_2(StringModule_Trim, lines), array.filter((y) => ("" !== y))));
    const matchValue = tryFind((_arg) => (_arg.tag === 1), parse);
    if (matchValue != null) {
        const copyOfStruct = matchValue;
        if (copyOfStruct.tag === 1) {
            const firstErr = copyOfStruct.fields[0];
            return new FSharpResult$2(1, [firstErr]);
        }
        else {
            return toFail(printf("What? can\'t happen"));
        }
    }
    else {
        const defs = map_2((_arg_1) => {
            if (_arg_1.tag === 0) {
                const x_1 = _arg_1.fields[0];
                return x_1;
            }
            else {
                return toFail(printf("What?"));
            }
        }, parse);
        let repeats;
        const array_2 = Array_groupBy((tuple) => tuple[0], defs, {
            Equals: equals,
            GetHashCode: bigintHash,
        });
        repeats = array_2.filter((tupledArg) => {
            const num = tupledArg[0];
            const vals = tupledArg[1];
            return vals.length > 1;
        });
        if (!equalsWith(equalArrays, repeats, [])) {
            return new FSharpResult$2(1, [toText(interpolate("Memory addresses %A%P() are repeated", [map_2((tuple_1) => tuple_1[0], repeats, BigInt64Array)]))]);
        }
        else {
            return new FSharpResult$2(0, [defs]);
        }
    }
}

export function readMemDefns(addressWidth, wordWidth, fPath) {
    let f1_1, f1, separator;
    return Result_Bind((f1_1 = ((f1 = ((separator = ["\n", "\r"], (str) => StringModule_SplitRemoveEmptyEntries(separator, str))), (arg) => readMemLines(addressWidth, wordWidth, f1(arg)))), (arg_1) => Result_Map((elements) => ofArray(elements, {
        Compare: compare,
    }), f1_1(arg_1))), tryReadFileSync(fPath));
}

export function writeMemDefns(fPath, mem) {
    try {
        return new FSharpResult$2(0, [writeFile(fPath, StringModule_Concat("\n", map_2((tupledArg) => {
            const a = tupledArg[0];
            const b = tupledArg[1];
            return `${hex64(a)}	${hex64(b)}`;
        }, sortBy((tuple) => tuple[0], toArray_1(mem.Data), {
            Compare: compare,
        }))))]);
    }
    catch (e) {
        return new FSharpResult$2(1, [`Error writing file '${fPath}': ${e.message}`]);
    }
}

/**
 * Return data for memory if it is linked to a ram.
 * Return mem data if it is unlinked
 * Error if the read fails ot the file parse fails.
 */
export function initialiseMem(mem, projectPath) {
    let memResult;
    const matchValue = mem.Init;
    switch (matchValue.tag) {
        case 1: {
            const name = matchValue.fields[0];
            const fPath = pathJoin([projectPath, name + ".ram"]);
            memResult = readMemDefns(mem.AddressWidth, mem.WordWidth, fPath);
            break;
        }
        case 0: {
            memResult = (new FSharpResult$2(0, [mem.Data]));
            break;
        }
        default:
            memResult = (new FSharpResult$2(1, [`Unsupported legacy memory type '${mem.Init}'`]));
    }
    return Result_Map((data) => (new Memory1(mem.Init, mem.AddressWidth, mem.WordWidth, data)), memResult);
}

/**
 * Save a PNG file (encoded base64, as from draw2d)
 * Overwrite existing file if needed
 */
export function savePngFile(folderPath, baseName_1, png) {
    const path = pathJoin([folderPath, baseName_1 + ".png"]);
    return writeFileBase64(path, png);
}

export function formatSavedState(canvas, wave) {
    return new JsonHelpers_SavedInfo(1, [canvas, wave, now()]);
}

/**
 * Save state to normal file. Automatically add the .dgm suffix.
 */
export function saveStateToFile(folderPath, baseName_1, state_, state__1, state__2) {
    const state = [state_, state__1, state__2];
    const path = pathJoin([folderPath, baseName_1 + ".dgm"]);
    const data = JsonHelpers_stateToJsonString(state[0], state[1], state[2]);
    return writeFile(path, data);
}

export function saveStateToFileNew(folderPath, baseName_1, state_, state__1, state__2) {
    const state = [state_, state__1, state__2];
    const path = pathJoin([folderPath, baseName_1 + ".dgmNew"]);
    const data = JsonHelpers_stateToJsonStringNew(state[0], state[1], state[2]);
    return writeFile(path, data);
}

/**
 * Create new empty diagram file. Automatically add the .dgm suffix.
 */
export function createEmptyDgmFile(folderPath, baseName_1) {
    return saveStateToFile(folderPath, baseName_1, [empty(), empty()], void 0, new SheetInfo(new CCForm(0, []), void 0));
}

export function stripVertices(conn) {
    return new LegacyCanvas_LegacyConnection(conn.Id, conn.Source, conn.Target, empty());
}

export function magnifySheet(magnification, comp) {
    return new LegacyCanvas_LegacyComponent(comp.Id, comp.Type, comp.Label, comp.InputPorts, comp.OutputPorts, magnification * (comp.X + (comp.W / 2)), magnification * (comp.Y + (comp.H / 2)), -1, -1);
}

/**
 * Update from old component types to new
 * In addition do some sanity checks
 * The standard way to add functionality to an existing component is to create a new
 * component type, keeping the old type. Then on reading sheets from disk both new and old
 * will be correctly read. This function will be called on load and will convert from the old
 * type to the new one so that the rest of issie need only process new types, but compatibility
 * with saved old types remains.
 */
export function getLatestComp(comp) {
    const updateMem = (mem) => (new Memory1(new InitMemData(0, []), mem.AddressWidth, mem.WordWidth, mem.Data));
    const matchValue = comp.Type;
    switch (matchValue.tag) {
        case 45: {
            const mem_1 = matchValue.fields[0];
            return new Component(comp.Id, new ComponentType(41, [updateMem(mem_1)]), comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo);
        }
        case 44: {
            const mem_2 = matchValue.fields[0];
            return new Component(comp.Id, new ComponentType(40, [updateMem(mem_2)]), comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo);
        }
        case 43: {
            const mem_3 = matchValue.fields[0];
            return new Component(comp.Id, new ComponentType(39, [updateMem(mem_3)]), comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo);
        }
        case 49: {
            const width = matchValue.fields[0] | 0;
            const cVal = matchValue.fields[1];
            return new Component(comp.Id, new ComponentType(7, [width, cVal, toText(interpolate("%d%P()", [cVal]))]), comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo);
        }
        case 48: {
            const width_1 = matchValue.fields[0] | 0;
            return new Component(comp.Id, new ComponentType(0, [width_1, void 0]), comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo);
        }
        default:
            return comp;
    }
}

/**
 * Interface function that can read old-style circuits (without wire vertices)
 * as well as new circuits with vertices. Old circuits have an expansion parameter
 * since new symbols are larger (in units) than old ones.
 */
export function getLatestCanvas(state) {
    const oldCircuitMagnification = 1.25;
    const stripConns = (canvas) => {
        const conns = canvas[1];
        const comps = canvas[0];
        const noVertexConns = map_1(stripVertices, conns);
        const expandedComps = map_1((comp) => magnifySheet(oldCircuitMagnification, comp), comps);
        const tupledArg = [expandedComps, noVertexConns];
        return legacyTypesConvert(tupledArg[0], tupledArg[1]);
    };
    let patternInput;
    switch (state.tag) {
        case 1: {
            const canvas_2 = state.fields[0];
            patternInput = stripConns(canvas_2);
            break;
        }
        case 2: {
            const canvas_3 = state.fields[0];
            patternInput = legacyTypesConvert(canvas_3[0], canvas_3[1]);
            break;
        }
        case 3: {
            const canvas_4 = state.fields[0];
            patternInput = canvas_4;
            break;
        }
        case 4: {
            const canvas_5 = state.fields[0];
            patternInput = canvas_5;
            break;
        }
        default: {
            const canvas_1 = state.fields[0];
            patternInput = stripConns(canvas_1);
        }
    }
    const conns_1 = patternInput[1];
    const comps_1 = patternInput[0];
    const comps_2 = map_1(convertFromJSONComponent, comps_1);
    return [map_1(getLatestComp, comps_2), conns_1];
}

/**
 * If the component is a RAM update its contents based on its initialiser
 */
export function checkMemoryContents(projectPath, comp) {
    let mem, mem_1, mem_2, mem_3;
    const matchValue = comp.Type;
    let matchResult, mem_4;
    switch (matchValue.tag) {
        case 41: {
            if ((mem = matchValue.fields[0], !StringModule_EndsWith("backup", StringModule_ToLower(projectPath)))) {
                matchResult = 0;
                mem_4 = matchValue.fields[0];
            }
            else {
                matchResult = 1;
            }
            break;
        }
        case 40: {
            if ((mem_1 = matchValue.fields[0], !StringModule_EndsWith("backup", StringModule_ToLower(projectPath)))) {
                matchResult = 0;
                mem_4 = matchValue.fields[0];
            }
            else {
                matchResult = 1;
            }
            break;
        }
        case 39: {
            if ((mem_2 = matchValue.fields[0], !StringModule_EndsWith("backup", StringModule_ToLower(projectPath)))) {
                matchResult = 0;
                mem_4 = matchValue.fields[0];
            }
            else {
                matchResult = 1;
            }
            break;
        }
        case 42: {
            if ((mem_3 = matchValue.fields[0], !StringModule_EndsWith("backup", StringModule_ToLower(projectPath)))) {
                matchResult = 0;
                mem_4 = matchValue.fields[0];
            }
            else {
                matchResult = 1;
            }
            break;
        }
        default:
            matchResult = 1;
    }
    switch (matchResult) {
        case 0: {
            const matchValue_1 = mem_4.Init;
            if (matchValue_1.tag === 1) {
                const fName = matchValue_1.fields[0];
                const fPath = pathJoin([projectPath, fName + ".ram"]);
                const memData = readMemDefns(mem_4.AddressWidth, mem_4.WordWidth, fPath);
                if (memData.tag === 1) {
                    const msg = memData.fields[0];
                    toConsole(`Error reloading component ${comp.Label} from its file ${fPath}:
${msg}`);
                    return comp;
                }
                else {
                    const memDat = memData.fields[0];
                    if (!memDat.Equals(mem_4.Data)) {
                        toConsole(printf("%s"))(`Warning! RAM file ${fPath} has changed so component ${comp.Label} is now different`);
                    }
                    const mem_5 = new Memory1(mem_4.Init, mem_4.AddressWidth, mem_4.WordWidth, memDat);
                    return new Component(comp.Id, getMemType(comp.Type)(mem_5), comp.Label, comp.InputPorts, comp.OutputPorts, comp.X, comp.Y, comp.H, comp.W, comp.SymbolInfo);
                }
            }
            else {
                return comp;
            }
        }
        default:
            return comp;
    }
}

/**
 * load a component from its canvas and other elements
 */
export function makeLoadedComponentFromCanvasData(canvas_, canvas__1, filePath, timeStamp, waveInfo, sheetInfo) {
    const canvas = [canvas_, canvas__1];
    const projectPath = dirName(filePath);
    const patternInput = parseDiagramSignature(canvas[0], canvas[1]);
    const outputs = patternInput[1];
    const inputs = patternInput[0];
    const conns = canvas[1];
    const comps = canvas[0];
    const comps$0027 = map_1((comp) => checkMemoryContents(projectPath, comp), comps);
    const canvas_1 = [comps$0027, conns];
    const ramChanges = map_1((tuple) => tuple[0], filter_1((tupledArg) => {
        const c1 = tupledArg[0];
        const c2 = tupledArg[1];
        return !equals_1(c1.Type, c2.Type);
    }, zip(comps$0027, comps)));
    let patternInput_1;
    if (sheetInfo != null) {
        const sI = sheetInfo;
        patternInput_1 = [sI.Form, sI.Description];
    }
    else {
        patternInput_1 = [new CCForm(0, []), void 0];
    }
    const form = patternInput_1[0];
    const description = patternInput_1[1];
    const ldc = new LoadedComponent(getBaseNameNoExtension(filePath), timeStamp, filePath, waveInfo, canvas_1, inputs, outputs, form, description);
    return [ldc, ramChanges];
}

/**
 * Make a loadedComponent from the file read from filePath.
 * Return the component, or an Error string.
 */
export function tryLoadComponentFromPath(filePath) {
    let arg_1;
    const matchValue = tryLoadStateFromPath(filePath);
    let matchResult, msg, state;
    if (matchValue.tag === 0) {
        const copyOfStruct = matchValue.fields[0];
        if (copyOfStruct.tag === 0) {
            matchResult = 1;
            state = copyOfStruct.fields[0];
        }
        else {
            matchResult = 0;
            msg = copyOfStruct.fields[0];
        }
    }
    else {
        matchResult = 0;
        msg = matchValue.fields[0];
    }
    switch (matchResult) {
        case 0:
            return new FSharpResult$2(1, [(arg_1 = getBaseNameNoExtension(filePath), toText(printf("Can\'t load component %s because of Error: %s"))(arg_1)(msg))]);
        default: {
            const canvas = getLatestCanvas(state);
            return new FSharpResult$2(0, [makeLoadedComponentFromCanvasData(canvas[0], canvas[1], filePath, JsonHelpers_SavedInfo__get_getTimeStamp(state), JsonHelpers_SavedInfo__get_getWaveInfo(state), JsonHelpers_SavedInfo__get_getSheetInfo(state))[0]]);
        }
    }
}

export class LoadStatus extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Resolve", "OkComp", "OkAuto"];
    }
}

export function LoadStatus_$reflection() {
    return union_type("FilesIO.LoadStatus", [], LoadStatus, () => [[["Item1", LoadedComponent_$reflection()], ["Item2", LoadedComponent_$reflection()]], [["Item", LoadedComponent_$reflection()]], [["Item", LoadedComponent_$reflection()]]]);
}

/**
 * load all files in folderpath. Return Ok list of LoadStatus or a single Error.
 */
export function loadAllComponentFiles(folderPath) {
    let x;
    try {
        x = (new FSharpResult$2(0, [readdir(folderPath)]));
    }
    catch (e) {
        x = (new FSharpResult$2(1, [toText(printf("Error reading Issie project directory at \'%s: %A"))(folderPath)(e)]));
    }
    if (x.tag === 0) {
        const x_1 = x.fields[0];
        return tryFindError(map_1((fileName) => {
            let ldComp_1, autoComp_1;
            if (fileNameIsBad(pathWithoutExtension(fileName).split(""))) {
                return new FSharpResult$2(1, [toText(printf("Can\'t load file name \'%s\' from project \'%s\' because it contains incorrect characters.\\n \\\r\n                    File names used as sheets must contain only alphanumeric and space characters before the \'.dgm\' extension"))(fileName)(folderPath)]);
            }
            else {
                const filePath_1 = pathJoin([folderPath, fileName]);
                toConsole(`loading ${fileName}`);
                const ldComp = tryLoadComponentFromPath(filePath_1);
                const autoComp = tryLoadComponentFromPath(filePath_1 + "auto");
                toConsole(`${fileName} Loaded`);
                let matchResult, autoComp_2, ldComp_2, ldComp_3, autoComp_3, msg_1;
                const copyOfStruct = ldComp;
                if (copyOfStruct.tag === 1) {
                    const copyOfStruct_1 = autoComp;
                    if (copyOfStruct_1.tag === 0) {
                        matchResult = 2;
                        autoComp_3 = copyOfStruct_1.fields[0];
                    }
                    else {
                        matchResult = 3;
                        msg_1 = copyOfStruct.fields[0];
                    }
                }
                else {
                    const copyOfStruct_2 = autoComp;
                    if (copyOfStruct_2.tag === 0) {
                        if ((ldComp_1 = copyOfStruct.fields[0], (autoComp_1 = copyOfStruct_2.fields[0], compare_1(ldComp_1.TimeStamp, autoComp_1.TimeStamp) < 0))) {
                            matchResult = 0;
                            autoComp_2 = copyOfStruct_2.fields[0];
                            ldComp_2 = copyOfStruct.fields[0];
                        }
                        else {
                            matchResult = 1;
                            ldComp_3 = copyOfStruct.fields[0];
                        }
                    }
                    else {
                        matchResult = 1;
                        ldComp_3 = copyOfStruct.fields[0];
                    }
                }
                switch (matchResult) {
                    case 0:
                        return new FSharpResult$2(0, [new LoadStatus(0, [ldComp_2, autoComp_2])]);
                    case 1:
                        return new FSharpResult$2(0, [new LoadStatus(1, [ldComp_3])]);
                    case 2:
                        return new FSharpResult$2(0, [new LoadStatus(2, [autoComp_3])]);
                    default:
                        return new FSharpResult$2(1, [msg_1]);
                }
            }
        }, filter_1((arg_4) => (".dgm" === extName(arg_4)), toList(x_1))));
    }
    else {
        const msg = x.fields[0];
        return new FSharpResult$2(1, [msg]);
    }
}

/**
 * Ask the user a new project path, with a dialog window.
 * Return None if the user exits withouth selecting a path.
 */
export function askForNewFile(projectPath) {
    let arg;
    const options = {};
    options.filters = ((arg = makeFileFilters("Memory Contents File", "ram"), Array.from(arg)));
    options.defaultPath = projectPath;
    options.title = "Enter new file name";
    options.nameFieldLabel = "New file name";
    options.buttonLabel = "Save memory content to file";
    options.properties = ["showOverwriteConfirmation"];
    const w = remote.getCurrentWindow();
    return remote.dialog.showSaveDialogSync(options);
}

export function saveAllProjectFilesFromLoadedComponentsToDisk(proj) {
    iterate((ldc) => {
        const name = ldc.Name;
        const state = ldc.CanvasState;
        const waveInfo = ldc.WaveInfo;
        const sheetInfo = new SheetInfo(ldc.Form, ldc.Description);
        saveStateToFile(proj.ProjectPath, name, state, waveInfo, sheetInfo);
        removeFileWithExtn(".dgmauto", proj.ProjectPath, name);
    }, proj.LoadedComponents);
}

export function openWriteDialogAndWriteMemory(mem, path) {
    const matchValue = askForNewFile(path);
    if (matchValue != null) {
        const fpath = matchValue;
        const fpath$0027 = !StringModule_Contains(".", fpath) ? (fpath + ".ram") : fpath;
        writeMemDefns(fpath$0027, mem);
        return fpath$0027;
    }
    else {
        return void 0;
    }
}

//# sourceMappingURL=FilesIO.fs.js.map
