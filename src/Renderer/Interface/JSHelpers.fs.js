import { toConsole, toFail, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { ofArray, map, singleton, head, tail, isEmpty } from "../fable_modules/fable-library.4.1.4/List.js";
import { toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { tryParse } from "../fable_modules/fable-library.4.1.4/Long.js";
import { FSharpRef } from "../fable_modules/fable-library.4.1.4/Types.js";
import { comparePrimitives, createAtom } from "../fable_modules/fable-library.4.1.4/Util.js";
import { contains, ofSeq } from "../fable_modules/fable-library.4.1.4/Set.js";
import * as remote from "@electron/remote";
import { v4 } from "uuid";

export function logString(msg) {
    const msg_1 = toText(printf("%A"))(msg);
    console.log(msg_1);
}

export function logChain(msg) {
    logString(msg);
    return msg;
}

/**
 * Assert js object is not null, and return it.
 */
export function assertNotNull(obj, msg) {
    return obj;
}

/**
 * Access nested fields of a js object, failing if at any point of the chain
 * the requested field is null.
 * Should be used when the fields are guaranteed to exist.
 * For example ["a"; "b"; "c"] is equivalent to the jsCode `obj.a.b.c`, but
 * with checks against null at every layer.
 */
export function getFailIfNull(jsObj_mut, fields_mut) {
    getFailIfNull:
    while (true) {
        const jsObj = jsObj_mut, fields = fields_mut;
        assertNotNull(jsObj, "jsObj is null in getFailIfNull");
        if (isEmpty(fields)) {
            return toFail(printf("what? getFailIfNull called with no fields to get"));
        }
        else if (isEmpty(tail(fields))) {
            const lastField = head(fields);
            const msg = toText(printf("jsObj.%s is null in getFailIfNull"))(lastField);
            return assertNotNull(jsObj[lastField], msg);
        }
        else {
            const fields$0027 = tail(fields);
            const nextField = head(fields);
            let jsObj$0027;
            const msg_1 = toText(printf("jsObj.%s is null in getFailIfNull"))(nextField);
            jsObj$0027 = assertNotNull(jsObj[nextField], msg_1);
            jsObj_mut = jsObj$0027;
            fields_mut = fields$0027;
            continue getFailIfNull;
        }
        break;
    }
}

/**
 * Transforms a js list of jsType into an f# list of jsType.
 * If jsList is not a js list, fail.
 */
export function jsListToFSharpList(jsList) {
    const len = getFailIfNull(jsList, singleton("length")) | 0;
    return map((i) => jsList[i], toList(rangeDouble(0, 1, len - 1)));
}

export function fshaprListToJsList(list) {
    const jsList = [];
    map((el) => (jsList.push(el)), list);
    return jsList;
}

/**
 * Get the value for a change event in an input textbox.
 */
export function getTextEventValue(event) {
    return getFailIfNull(event.currentTarget, singleton("value"));
}

/**
 * Get the value for a change event in an input number box,
 * making sure it is an F# integer (JS integer values may not be precise)
 */
export function getIntEventValue(event) {
    return ~~getFailIfNull(event.currentTarget, singleton("value"));
}

export function getFloatEventValue(event) {
    return getFailIfNull(event.currentTarget, singleton("value"));
}

export function getInt64EventValue(event) {
    const boxText = getFailIfNull(event, ofArray(["target", "value"]));
    let patternInput;
    let outArg = 0n;
    patternInput = [tryParse(boxText, 511, false, 64, new FSharpRef(() => outArg, (v) => {
        outArg = v;
    })), outArg];
    const ok = patternInput[0];
    const n = patternInput[1];
    if (!ok) {
        return 0n;
    }
    else {
        return n;
    }
}

/**
 * Get the value for a blur event in an input textbox.
 */
export function getTextFocusEventValue(event) {
    return getFailIfNull(event, ofArray(["target", "value"]));
}

export let debugLevel = createAtom(1);

export const productionBuild = false;

export let debugTraceUI = createAtom(ofSeq([], {
    Compare: comparePrimitives,
}));

/**
 * Call debugAction() and print its result if debugTraceUI mutable contains string traceCode
 */
export function traceIf(traceCode, debugAction) {
    if (contains(traceCode, debugTraceUI())) {
        const arg = debugAction();
        toConsole(printf("%s"))(arg);
    }
}

/**
 * Hack to provide a constant global variable
 * set from command line arguments of main process.
 * 0 => production. 1 => dev. 2 => debug.
 */
export function setDebugLevel() {
    const hasSwitch = (swName) => remote.app.commandLine.hasSwitch(swName);
    if (hasSwitch("debug") ? true : hasSwitch("-d")) {
        debugLevel(2);
    }
    else if (hasSwitch("w")) {
        debugLevel(1);
    }
}

export const uuid = v4;

//# sourceMappingURL=JSHelpers.fs.js.map
