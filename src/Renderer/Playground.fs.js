import { StringModule_Concat } from "./Common/EEExtensions.fs.js";
import { printf, split, toConsole } from "./fable_modules/fable-library.4.1.4/String.js";
import { initialize, map, empty, length, tryFindIndex, item, ofArray } from "./fable_modules/fable-library.4.1.4/List.js";
import { defaultArg } from "./fable_modules/fable-library.4.1.4/Option.js";
import { Msg, TTMsg } from "./Model/ModelType.fs.js";
import { equalsWith } from "./fable_modules/fable-library.4.1.4/Array.js";
import { comparePrimitives, defaultOf } from "./fable_modules/fable-library.4.1.4/Util.js";
import { makeText, Text$, defaultText } from "./Common/DrawHelpers.fs.js";
import * as react from "react";
import { input } from "./fable_modules/Fulma.2.16.0/Elements/Form/./Input.fs.js";
import { Option, IInputType } from "./fable_modules/Fulma.2.16.0/Elements/Form/Input.fs.js";
import { closablePopup, dialogPopup, preventDefault } from "./DrawBlock/PopupHelpers.fs.js";
import { HTMLAttr, DOMAttr } from "./fable_modules/Fable.React.8.0.1/Fable.React.Props.fs.js";
import { getTextEventValue } from "./Interface/JSHelpers.fs.js";
import { singleton, append, delay, toList } from "./fable_modules/fable-library.4.1.4/Seq.js";
import { createPolygon } from "./DrawBlock/SymbolView.fs.js";
import { keyValueList } from "./fable_modules/fable-library.4.1.4/MapUtil.js";
import { readdir, staticDir } from "./Interface/FilesIO.fs.js";
import { FSharpMap__get_Item, ofList } from "./fable_modules/fable-library.4.1.4/Map.js";
import { rangeDouble } from "./fable_modules/fable-library.4.1.4/Range.js";
import { getInterval, checkPerformance, getTimeMs } from "./Common/TimeHelpers.fs.js";
import { allRootHierarchiesFromProjectBreadcrumbs, hierarchyBreadcrumbs, Constants_defaultConfig } from "./UI/MiscMenuView.fs.js";
import { Record } from "./fable_modules/fable-library.4.1.4/Types.js";
import { record_type, list_type, int32_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { PromiseBuilder__For_1565554B, PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "./fable_modules/Fable.Promise.3.1.3/Promise.fs.js";
import { promise } from "./fable_modules/Fable.Promise.3.1.3/PromiseImpl.fs.js";
import { debugChangedConnections } from "./Simulator/Extractor.fs.js";
import { SheetT_Msg } from "./Model/DrawModelType.fs.js";

export const TestFonts_testCanvas = document.createElement("canvas");

export const TestFonts_canvasWidthContext = TestFonts_testCanvas.getContext('2d');

export function TestFonts_fontString(font) {
    return StringModule_Concat(" ", [font.FontWeight, font.FontSize, font.FontFamily]);
}

export function TestFonts_textMeasureWidth(font, txt) {
    const fontStr = TestFonts_fontString(font);
    TestFonts_canvasWidthContext.font = fontStr;
    toConsole(`font = ${font}

 '${fontStr}' -> ${TestFonts_canvasWidthContext.font}

`);
    return TestFonts_canvasWidthContext.measureText(txt).width;
}

export const TestFonts_testedFonts = ofArray(["arial", "helvetica", "verdana", "tahoma", "600 tahoma", "trebuchet ms", "times", "georgia", "impact"]);

export function TestFonts_nextFontFamily(fontFamily) {
    return item((1 + defaultArg(tryFindIndex((y) => (fontFamily === y), TestFonts_testedFonts), -1)) % length(TestFonts_testedFonts), TestFonts_testedFonts);
}

/**
 * Create the body of a dialog Popup with both text and int.
 */
export function TestFonts_dialogPopupBody(dispatch) {
    const fontStyleDefault = "times";
    const textToTestDefault = "iiiimmmmyyyy0123456789";
    dispatch(new Msg(27, [new TTMsg(27, [fontStyleDefault])]));
    dispatch(new Msg(42, [textToTestDefault]));
    return (model) => {
        let props_14, children_2;
        const dialogData = model.PopupDialogData;
        let fontSpec;
        const matchValue = dialogData.ConstraintErrorMsg;
        if (matchValue != null) {
            const fs = matchValue;
            fontSpec = fs;
        }
        else {
            fontSpec = fontStyleDefault;
        }
        const textToTest = defaultArg(dialogData.Text, textToTestDefault);
        const fontSize = 20;
        let patternInput;
        const matchValue_1 = split(fontSpec, [" "], void 0, 1);
        if (!equalsWith((x, y) => (x === y), matchValue_1, defaultOf()) && (matchValue_1.length === 1)) {
            const family = matchValue_1[0];
            patternInput = ["", family];
        }
        else if (!equalsWith((x_1, y_1) => (x_1 === y_1), matchValue_1, defaultOf()) && (matchValue_1.length === 2)) {
            const weight = matchValue_1[0];
            const family_1 = matchValue_1[1];
            patternInput = [weight, family_1];
        }
        else {
            patternInput = ["", ""];
        }
        const fontWeight = patternInput[0];
        const fontFamily = patternInput[1];
        const font = new Text$("left", `${fontSize}px`, fontWeight, fontFamily, defaultText.Fill, defaultText.UserSelect, defaultText.DominantBaseline);
        const text = defaultArg(dialogData.Text, textToTestDefault);
        const width = TestFonts_textMeasureWidth(font, text);
        const height = fontSize;
        const textEl = makeText(50, 100, text, font);
        const children_4 = [react.createElement("br", {}), react.createElement("br", {}), "Font Family: enter here or click button for known fonts", input(ofArray([new Option(1, [new IInputType(0, [])]), new Option(15, [ofArray([new DOMAttr(2, [(e) => {
            preventDefault(e);
        }]), new HTMLAttr(55, [true]), new HTMLAttr(148, [false]), new HTMLAttr(161, [fontFamily])])]), new Option(13, [(arg_11) => {
            dispatch(new Msg(27, [new TTMsg(27, [getTextEventValue(arg_11)])]));
        }])])), react.createElement("br", {}), react.createElement("br", {}), "Text to show:", input(ofArray([new Option(1, [new IInputType(0, [])]), new Option(15, [ofArray([new DOMAttr(2, [(e_1) => {
            preventDefault(e_1);
        }]), new HTMLAttr(55, [true]), new HTMLAttr(148, [false]), new HTMLAttr(161, [textToTest])])]), new Option(13, [(arg_16) => {
            dispatch(new Msg(42, [getTextEventValue(arg_16)]));
        }])])), react.createElement("br", {}), react.createElement("br", {}), (props_14 = [["style", {
            height: 200,
            width: 800,
        }]], (children_2 = toList(delay(() => {
            const pts = `50 100 ${50 + width} 100  ${50 + width} ${100 + height} 50 ${100 + height}`;
            return append(singleton(textEl), delay(() => {
                let children;
                return singleton((children = createPolygon(pts, "red", 0.2), react.createElement("g", {}, ...children)));
            }));
        })), react.createElement("svg", keyValueList(props_14, 1), ...children_2)))];
        return react.createElement("div", {}, ...children_4);
    };
}

export function TestFonts_makeTextPopup(dispatch) {
    const body = TestFonts_dialogPopupBody(dispatch);
    dialogPopup("Font test: pink box shows measured width", body, "Change Font", (dd) => {
        dispatch(new Msg(27, [new TTMsg(27, [TestFonts_nextFontFamily(defaultArg(dd.PopupDialogData.ConstraintErrorMsg, ""))])]));
    }, (_arg) => false, empty(), dispatch);
}

/**
 * static assets should theoretically be put under ./static in Issie repo
 * but appear on file system under staticDir() when Issie is run. The exact poistion on disk
 * will vary between production and dev runs, but staticDir()
 * should always work
 */
export function MiscTests_testAssets() {
    const staticD = staticDir();
    toConsole(printf("Static Asset Directory = %s"))(staticD);
    const arg_1 = readdir(staticD);
    toConsole(printf("%A"))(arg_1);
}

export function MiscTests_testMaps() {
    const modMap = ofList(map((n) => [n, ((n * 256) + 1) % 1001], toList(rangeDouble(0, 1, 1000))), {
        Compare: comparePrimitives,
    });
    const iterMap = (count) => {
        let x_1 = 1;
        let i = 0;
        while (i < count) {
            x_1 = (FSharpMap__get_Item(modMap, x_1) | 0);
            i = ((i + 1) | 0);
        }
    };
    const count_1 = 1000000;
    const start = getTimeMs();
    const result = iterMap(count_1);
    const interval = getTimeMs() - start;
    toConsole(printf("%d iterations of iterMap took %.1fms"))(count_1)(interval);
}

export function MiscTests_displayPerformance(n, m) {
    checkPerformance(n, m, (label) => {
        console.time(label);
    }, (label_1) => {
        console.timeEnd(label_1);
    });
}

export const Breadcrumbs_config = Constants_defaultConfig;

export function Breadcrumbs_testBreadcrumbs(model, dispatch) {
    const action = (_arg, _arg_1) => {
    };
    closablePopup("Design Hierarchy of current sheet", hierarchyBreadcrumbs(Breadcrumbs_config, dispatch, model), react.createElement("div", {}), empty(), dispatch);
}

export function Breadcrumbs_testAllHierarchiesBreadcrumbs(model, dispatch) {
    const action = (_arg, _arg_1) => {
    };
    closablePopup("Design Hierarchy of all sheets", allRootHierarchiesFromProjectBreadcrumbs(Breadcrumbs_config, dispatch, model), react.createElement("div", {}), empty(), dispatch);
}

export class WebWorker_WorkerPerfTestConfig extends Record {
    constructor(OverheadRuns, OverheadWWs, ConcurrencyTestWWs, NumRuns) {
        super();
        this.OverheadRuns = (OverheadRuns | 0);
        this.OverheadWWs = (OverheadWWs | 0);
        this.ConcurrencyTestWWs = ConcurrencyTestWWs;
        this.NumRuns = (NumRuns | 0);
    }
}

export function WebWorker_WorkerPerfTestConfig_$reflection() {
    return record_type("Playground.WebWorker.WorkerPerfTestConfig", [], WebWorker_WorkerPerfTestConfig, () => [["OverheadRuns", int32_type], ["OverheadWWs", int32_type], ["ConcurrencyTestWWs", list_type(int32_type)], ["NumRuns", int32_type]]);
}

export const WebWorker_Constants_workerTestConfig = new WebWorker_WorkerPerfTestConfig(5, 100, ofArray([2, 4, 6, 8, 10]), 3);

export function WebWorker_geoMean(vals) {
    const x_1 = vals.reduce((x, y) => (x * y));
    const arg1__2 = 1 / vals.length;
    return Math.pow(x_1, arg1__2);
}

export function WebWorker_runTestNTimes(n, testPromise) {
    const pr = PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let result = 1;
        return testPromise.then((_arg) => {
            const discardPromise = _arg;
            return PromiseBuilder__For_1565554B(promise, toList(rangeDouble(1, 1, n)), (_arg_1) => (testPromise.then((_arg_2) => {
                const testVal = _arg_2;
                result = (result * testVal);
                return Promise.resolve();
            }))).then(() => PromiseBuilder__Delay_62FBFDE1(promise, () => (Promise.resolve(result))));
        });
    }));
    return pr.then((result_1) => {
        const arg1__3 = 1 / n;
        return Math.pow(result_1, arg1__3);
    });
}

export function WebWorker_workerPromise(t) {
    return new Promise((resolve, reject) => {
        const start = getTimeMs();
        const worker = new Worker(new URL("./TestWorker.fs.js", import.meta.url), {type: "module"});
        worker.onmessage = ((msg) => {
            resolve(getInterval(start) / 1000);
        });
        worker.postMessage(t);
    });
}

export function WebWorker_nWorkerPromise(t, n) {
    const pr = initialize(n, (_arg) => WebWorker_workerPromise(t));
    return Promise.all(pr);
}

export function WebWorker_testWorkerConcurrency(n) {
    return PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => (WebWorker_workerPromise("long").then((_arg) => {
        const worker1Time = _arg;
        return WebWorker_nWorkerPromise("long", n).then((_arg_1) => {
            const workers = _arg_1;
            const parallelism = n * (worker1Time / WebWorker_geoMean(workers));
            return Promise.resolve(parallelism);
        });
    }))));
}

export function WebWorker_testWorkerOverhead(runs) {
    const pr = PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        let totalOverhead = 1;
        return PromiseBuilder__For_1565554B(promise, toList(rangeDouble(1, 1, runs)), (_arg) => (WebWorker_workerPromise("short").then((_arg_1) => {
            const overhead = _arg_1;
            totalOverhead = (totalOverhead * overhead);
            return Promise.resolve();
        }))).then(() => PromiseBuilder__Delay_62FBFDE1(promise, () => (Promise.resolve(totalOverhead))));
    }));
    return pr.then((total) => {
        const arg1__3 = 1 / runs;
        return Math.pow(total, arg1__3);
    });
}

export function WebWorker_testWorkerCPUOverhead(numWorkers) {
    return PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        const start = getTimeMs();
        return WebWorker_nWorkerPromise("short", numWorkers).then((_arg) => {
            const nWorkers = _arg;
            const timeTaken = getInterval(start) / 1000;
            return Promise.resolve(numWorkers / timeTaken);
        });
    }));
}

export function WebWorker_testWorkers(conf) {
    PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => (WebWorker_runTestNTimes(conf.NumRuns, WebWorker_testWorkerOverhead(conf.OverheadRuns)).then((_arg) => {
        const overheadRes = _arg;
        toConsole(printf("Average elapsed time overhead: %.2f seconds"))(overheadRes);
        return WebWorker_runTestNTimes(conf.NumRuns, WebWorker_testWorkerCPUOverhead(conf.OverheadWWs)).then((_arg_1) => {
            const cpuOverheadRes = _arg_1;
            toConsole(printf("Can start %.1f workers/second"))(cpuOverheadRes);
            return PromiseBuilder__For_1565554B(promise, conf.ConcurrencyTestWWs, (_arg_2) => {
                const i = _arg_2 | 0;
                return WebWorker_runTestNTimes(conf.NumRuns, WebWorker_testWorkerConcurrency(i)).then((_arg_3) => {
                    const parallelism = _arg_3;
                    toConsole(printf("Parallelism with %d workers: %.2f"))(i)(parallelism);
                    return Promise.resolve();
                });
            });
        });
    }))));
}

export function Misc_highLightChangedConnections(dispatch) {
    dispatch(new Msg(1, [new SheetT_Msg(28, [debugChangedConnections()])]));
    debugChangedConnections(empty());
}

//# sourceMappingURL=Playground.fs.js.map
