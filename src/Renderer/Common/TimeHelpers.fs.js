import { join, interpolate, toText, printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { fold as fold_1, copy, map as map_5 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { filter, sortBy, map as map_8, toList, toArray } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { iterate, item, map as map_6, fold } from "../fable_modules/fable-library.4.1.4/List.js";
import { getItemFromDict } from "../fable_modules/fable-library.4.1.4/MapUtil.js";
import { toArray as toArray_1, empty, toList as toList_1, tryFind, ofSeq, FSharpMap__get_Count, add, FSharpMap__get_Item, ofArray } from "../fable_modules/fable-library.4.1.4/Map.js";
import { createAtom, comparePrimitives } from "../fable_modules/fable-library.4.1.4/Util.js";
import { Union, Record } from "../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, class_type, int32_type, string_type, record_type, float64_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { max, min } from "../fable_modules/fable-library.4.1.4/Double.js";
import { map as map_7, defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";

export function checkPerformance(m, n, startTimer, stopTimer) {
    toConsole(printf("Checking performance with size = %d, iterations = %d"))(m)(n);
    const arrayBuffer = () => {
        const buff = map_5((i) => ((i + 1) % m), toArray(rangeDouble(0, 1, m - 1)), Int32Array);
        let index = 0;
        let el = 0;
        startTimer("Array");
        while (index < n) {
            index = ((index + 1) | 0);
            el = (buff[el] | 0);
        }
        stopTimer("Array");
    };
    const arrayBufferLookup = () => {
        const buff_1 = map_5((i_1) => ((i_1 + 1) % m), toArray(rangeDouble(0, 1, m - 1)), Int32Array);
        let index_1 = 0;
        let el_1 = 0;
        startTimer("ArrayBufferLookup");
        while (index_1 < ~~(n / 2)) {
            index_1 = ((index_1 + 1) | 0);
            for (let i_2 = 0; i_2 <= ~~((m - 1) / 2); i_2++) {
                el_1 = ((buff_1[el_1] + index_1) | 0);
            }
        }
        stopTimer("ArrayBufferLookup");
    };
    const mutableArrayBuffer = () => {
        const buff_2 = map_5((i_3) => ((i_3 + 1) % m), toArray(rangeDouble(0, 1, m - 1)), Int32Array);
        let index_2 = 0;
        let el_2 = 0;
        startTimer("Mutable Array");
        while (index_2 < n) {
            index_2 = ((index_2 + 1) | 0);
            el_2 = ((((el_2 + 1) < m) ? (el_2 + 1) : 0) | 0);
            buff_2[el_2] = (index_2 | 0);
        }
        stopTimer("Mutable Array");
    };
    const updateArrayBuffer = () => {
        const buff_3 = map_5((i_4) => ((i_4 + 1) % m), toArray(rangeDouble(0, 1, m - 1)), Int32Array);
        let index_3 = 0;
        let el_3 = 0;
        let arr = buff_3;
        startTimer("Copy-update Array");
        const z = fold((buff_4, i_5) => {
            const r = copy(buff_4);
            r[i_5 % m] = (i_5 | 0);
            return r;
        }, buff_3, toList(rangeDouble(0, 1, n)));
        z[0];
        stopTimer("Copy-update Array");
    };
    const listBuffer = () => {
        const buff_5 = map_6((i_6) => ((i_6 + 1) % m), toList(rangeDouble(0, 1, m - 1)));
        let index_4 = 0;
        let el_4 = 0;
        startTimer("List");
        while (index_4 < n) {
            index_4 = ((index_4 + 1) | 0);
            el_4 = (item(el_4, buff_5) | 0);
        }
        stopTimer("List");
    };
    const dictBuffer = () => {
        const dict = new Map([]);
        const array_4 = toArray(rangeDouble(0, 1, m - 1));
        array_4.forEach((i_7) => {
            dict.set(i_7, (i_7 + 1) % m);
        });
        let index_5 = 0;
        let el_5 = 0;
        startTimer("Dict");
        while (index_5 < n) {
            index_5 = ((index_5 + 1) | 0);
            el_5 = (getItemFromDict(dict, el_5) | 0);
        }
        stopTimer("Dict");
    };
    const mapBuffer = () => {
        const buff_6 = ofArray(map_5((i_8) => [i_8, (i_8 + 1) % m], toArray(rangeDouble(0, 1, m - 1))), {
            Compare: comparePrimitives,
        });
        let index_6 = 0;
        let el_6 = 0;
        startTimer("Map");
        while (index_6 < n) {
            index_6 = ((index_6 + 1) | 0);
            el_6 = (FSharpMap__get_Item(buff_6, el_6) | 0);
        }
        stopTimer("Map");
    };
    const updateMapBuffer = () => {
        const buff_7 = ofArray(map_5((i_9) => [i_9, (i_9 + 1) % m], toArray(rangeDouble(0, 1, m - 1))), {
            Compare: comparePrimitives,
        });
        startTimer("UpdateMap");
        const buf = fold_1((buff_8, i_10) => add(i_10 % m, i_10, buff_8), buff_7, toArray(rangeDouble(0, 1, n - 1)));
        stopTimer("UpdateMap");
        FSharpMap__get_Count(buf);
    };
    const updateDictBuffer = () => {
        const dict_1 = new Map([]);
        const array_8 = toArray(rangeDouble(0, 1, m - 1));
        array_8.forEach((i_11) => {
            dict_1.set(i_11, (i_11 + 1) % m);
        });
        startTimer("UpdateDict");
        const dict_3 = fold_1((dict_2, i_12) => {
            const d = new Map(dict_2);
            return d;
        }, dict_1, toArray(rangeDouble(0, 1, n - 1)));
        stopTimer("UpdateDict");
    };
    arrayBuffer();
    arrayBuffer();
    arrayBufferLookup();
    arrayBufferLookup();
    mutableArrayBuffer();
    mutableArrayBuffer();
    updateArrayBuffer();
    updateArrayBuffer();
    listBuffer();
    listBuffer();
    mapBuffer();
    mapBuffer();
    dictBuffer();
    dictBuffer();
    updateMapBuffer();
    updateMapBuffer();
    updateDictBuffer();
}

export function timeNowInMicroS() {
    return (performance.now()) * 1000;
}

export function timeNowInMS() {
    return performance.now();
}

export class Stats extends Record {
    constructor(Min, Max, Av, Num) {
        super();
        this.Min = Min;
        this.Max = Max;
        this.Av = Av;
        this.Num = Num;
    }
}

export function Stats_$reflection() {
    return record_type("TimeHelpers.Stats", [], Stats, () => [["Min", float64_type], ["Max", float64_type], ["Av", float64_type], ["Num", float64_type]]);
}

/**
 * add time t to st
 */
export function addTimeToStats(t, st) {
    return new Stats(min(st.Min, t), max(st.Max, t), ((st.Av * st.Num) + t) / (st.Num + 1), st.Num + 1);
}

export let executionStats = createAtom(ofSeq([], {
    Compare: comparePrimitives,
}));

/**
 * Run (f arg) recording its time in executionStats under name.
 * NB - this will run f multiple times if needed to estimate average speed more accurately.
 * If an execution time of 5ms for this function is too long reduce timeLimit.
 * The multiple time execution will not work, and will give lower than real results, if
 * f is memoised. In that case set timeLimit to 0. for only one execution.
 */
export function recordExecutionTimeStats(name, f, arg) {
    let value_1;
    const timeLimit = 0;
    const t1 = timeNowInMicroS();
    const execTime = () => ((timeNowInMicroS() - t1) / 1000);
    const res = f(arg);
    let iterations = 1;
    while (execTime() < timeLimit) {
        iterations = ((iterations + 1) | 0);
        f(arg);
    }
    const t = execTime() / iterations;
    executionStats(add(name, (value_1 = (new Stats(t, t, t, 1)), defaultArg(map_7((st) => addTimeToStats(t, st), tryFind(name, executionStats())), value_1)), executionStats()));
    return res;
}

/**
 * print
 */
export function printStats() {
    iterate((tupledArg) => {
        const name = tupledArg[0];
        const st = tupledArg[1];
        const arg_4 = ~~st.Num | 0;
        toConsole(printf("%s time: min=%.3fms max=%.3fms av=%.3fms samples:%d"))(name)(st.Min)(st.Max)(st.Av)(arg_4);
    }, toList_1(executionStats()));
    executionStats(ofSeq([], {
        Compare: comparePrimitives,
    }));
}

/**
 * returns absolute time in ms, works under both .Net and Fable
 */
export function getTimeMs() {
    return performance.now();
}

export function getInterval(startTime) {
    return getTimeMs() - startTime;
}

/**
 * Return time taken by thunk()
 * Run thunk() as many times as is needed
 * for total elapsed time in ms to be  > limitMs.
 * Return average time of all runs.
 * To minimise cache effects run thunk() once before
 * starting to time.
 */
export function getTimeOfInMs(limitMs, thunk) {
    thunk();
    const startT = getTimeMs();
    let i = 0;
    while (getInterval(startT) < limitMs) {
        i = ((i + 1) | 0);
        thunk();
    }
    return getInterval(startT) / i;
}

export class AggregatedData extends Record {
    constructor(PrintInterval, LastPrintTime, Counts, Times, MinVals, MaxVals) {
        super();
        this.PrintInterval = PrintInterval;
        this.LastPrintTime = LastPrintTime;
        this.Counts = Counts;
        this.Times = Times;
        this.MinVals = MinVals;
        this.MaxVals = MaxVals;
    }
}

export function AggregatedData_$reflection() {
    return record_type("TimeHelpers.AggregatedData", [], AggregatedData, () => [["PrintInterval", float64_type], ["LastPrintTime", float64_type], ["Counts", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, int32_type])], ["Times", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, float64_type])], ["MinVals", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, float64_type])], ["MaxVals", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, float64_type])]]);
}

export class InstrumentationControl extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ImmediatePrint", "Aggregate", "Off"];
    }
}

export function InstrumentationControl_$reflection() {
    return union_type("TimeHelpers.InstrumentationControl", [], InstrumentationControl, () => [[["Threshold", float64_type], ["UpdateThreshold", float64_type]], [["Item", AggregatedData_$reflection()]], []]);
}

/**
 * initialise instrumentation parameter for immediate time printing
 */
export function immediate(threshold, updateThreshold) {
    return new InstrumentationControl(0, [threshold, updateThreshold]);
}

/**
 * initialse instrumentation parameter for aggregate time printing
 */
export function aggregate(printInterval_1) {
    let LastPrintTime, Times, MinVals, MaxVals;
    return new InstrumentationControl(1, [(LastPrintTime = Date.now(), (Times = empty({
        Compare: comparePrimitives,
    }), (MinVals = empty({
        Compare: comparePrimitives,
    }), (MaxVals = empty({
        Compare: comparePrimitives,
    }), new AggregatedData(printInterval_1, LastPrintTime, empty({
        Compare: comparePrimitives,
    }), Times, MinVals, MaxVals)))))]);
}

export let instrumentation = createAtom(immediate(10, 10));

/**
 * print out the current aggregate of recorded times if this is requried.
 * Return initialised aggregate totals after print
 */
export function printAgg(agg) {
    const now = Date.now();
    const getData = (name) => {
        const num = defaultArg(tryFind(name, agg.Counts), 0) | 0;
        const numF = num;
        if (num === 0) {
            return [0, ""];
        }
        else {
            const tot = defaultArg(tryFind(name, agg.Times), 0);
            return [tot, toText(interpolate("%8.2f%P()%8.1f%P()%8.1f%P()%8.1f%P()  %s%P()", [tot / numF, defaultArg(tryFind(name, agg.MaxVals), 0), defaultArg(tryFind(name, agg.MinVals), 0), tot, name]))];
        }
    };
    const intv = now - agg.LastPrintTime;
    if (intv < agg.PrintInterval) {
        return agg;
    }
    else {
        let head;
        const arg = intv / 1000;
        head = toText(printf("Interval times in ms after %.1fs\n      Av     Max     Min  Total    Name\n"))(arg);
        const timeLines = join("\n", map_8((tuple_2) => tuple_2[1], sortBy((tuple_1) => tuple_1[0], filter((tupledArg) => {
            const tot_1 = tupledArg[0];
            return tot_1 > 10;
        }, map_8(getData, map_5((tuple) => tuple[0], toArray_1(agg.Counts)))), {
            Compare: comparePrimitives,
        })));
        const arg_1 = head + timeLines;
        toConsole(printf("%s"))(arg_1);
        const Counts = empty({
            Compare: comparePrimitives,
        });
        const MaxVals = empty({
            Compare: comparePrimitives,
        });
        const MinVals = empty({
            Compare: comparePrimitives,
        });
        return new AggregatedData(agg.PrintInterval, now, Counts, empty({
            Compare: comparePrimitives,
        }), MinVals, MaxVals);
    }
}

/**
 * process a new time interval updating the aggregated data for future printout
 */
export function updateAgg(name, time, agg) {
    let key_3, map_3, v_3;
    let Counts;
    const key = name;
    const map = agg.Counts;
    const v = defaultArg(tryFind(key, map), 0) | 0;
    Counts = add(key, 1 + v, map);
    let Times;
    const key_1 = name;
    const map_1 = agg.Times;
    const v_1 = defaultArg(tryFind(key_1, map_1), 0);
    Times = add(key_1, time + v_1, map_1);
    let MaxVals;
    const key_2 = name;
    const map_2 = agg.MaxVals;
    const v_2 = defaultArg(tryFind(key_2, map_2), 0);
    MaxVals = add(key_2, max(time, v_2), map_2);
    return new AggregatedData(agg.PrintInterval, agg.LastPrintTime, Counts, Times, (key_3 = name, (map_3 = agg.MinVals, (v_3 = defaultArg(tryFind(key_3, map_3), 10000000000), add(key_3, min(time, v_3), map_3)))), MaxVals);
}

/**
 * According to current settings, process and/or print a named time interval.
 * the interval is between intervalStartTime passed as arg 2, and the time at
 * which this function is called (all times obtained using getTimeMs).
 */
export function instrumentTime(intervalName, intervalStartTime) {
    if (instrumentation().tag === 0) {
        const updateThreshold = instrumentation().fields[1];
        const threshold = instrumentation().fields[0];
        const interval = getInterval(intervalStartTime);
        const threshold_1 = (intervalName.indexOf("update") === 0) ? updateThreshold : threshold;
        if (interval > threshold_1) {
            const arg = toText(interpolate("%P(): %.1f%P()ms", [intervalName, interval]));
            toConsole(printf("%s"))(arg);
        }
    }
    else if (instrumentation().tag === 1) {
        const agg = instrumentation().fields[0];
        const interval_1 = getTimeMs() - intervalStartTime;
        const agg_1 = updateAgg(intervalName, interval_1, agg);
        const agg_2 = printAgg(agg_1);
        instrumentation(new InstrumentationControl(1, [agg_2]));
    }
}

function printInterval(name, startTime) {
    instrumentTime(name, startTime);
}

/**
 * This function with its first two args should be put in a pipe after the code to be timed.
 * it will return its piped input, with the side effect of recording the time delay in the
 * function. Parameter start must be defined at the start of the code to be timed using getTimeMs.
 */
export function instrumentInterval(name, startTime, output) {
    printInterval(name, startTime);
    return output;
}

/**
 * Record the elapsed time taken in execution of (func arg).
 * Return the result from (func arg).
 */
export function instrumentFunctionCall(name, func, arg) {
    const startTime = getTimeMs();
    const startTime_1 = func(arg);
    return (output) => instrumentInterval(name, startTime_1, output);
}

//# sourceMappingURL=TimeHelpers.fs.js.map
