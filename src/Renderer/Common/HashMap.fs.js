import { Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { union_type, array_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { sum, fold, concat, map, initialize, fill, mapIndexed } from "../fable_modules/fable-library.4.1.4/Array.js";
import { isLetter, isDigit } from "../fable_modules/fable-library.4.1.4/Char.js";
import { printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { toArray } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { equals, curry2 } from "../fable_modules/fable-library.4.1.4/Util.js";
import { some } from "../fable_modules/fable-library.4.1.4/Option.js";

export class HMap$1 extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Tree", "Found", "Empty"];
    }
}

export function HMap$1_$reflection(gen0) {
    return union_type("HashMap.HMap`1", [gen0], HMap$1, () => [[["Item", array_type(HMap$1_$reflection(gen0))]], [["Item", gen0]], []]);
}

export const charCodeF = 97;

export const charCode0 = 48;

export function getFastHash(sha) {
    return mapIndexed((i, _arg) => {
        const ch = sha[i];
        if (isDigit(ch)) {
            return (ch.charCodeAt(0) - charCode0) | 0;
        }
        else if (isLetter(ch)) {
            return ((ch.charCodeAt(0) - charCodeF) + 10) | 0;
        }
        else if (ch === "-") {
            return 0;
        }
        else {
            return toFail(printf("Hash to digit conversion failed on n={n}, char={ch}")) | 0;
        }
    }, toArray(sha.split("")), Int32Array);
}

export function getFastHItem(x, _arg, _arg_1) {
    return x;
}

export function getFastSHA(sha, x, _arg, n) {
    return x[n];
}

export function hMapAdd(getFastEq, getSHA, item, hm) {
    const hash = curry2(getSHA)(item);
    const hAdd = (shaIndex, hm_1) => {
        switch (hm_1.tag) {
            case 1: {
                const item$0027 = hm_1.fields[0];
                const hash$0027 = curry2(getSHA)(item$0027);
                if (getFastEq(item$0027) === getFastEq(item)) {
                    return new HMap$1(1, [item]);
                }
                else {
                    const h = hash(shaIndex) | 0;
                    const h$0027 = hash$0027(shaIndex) | 0;
                    const arr = fill(new Array(16), 0, 16, new HMap$1(2, []));
                    if (h !== h$0027) {
                        arr[h] = (new HMap$1(1, [item]));
                        arr[h$0027] = (new HMap$1(1, [item$0027]));
                        return new HMap$1(0, [arr]);
                    }
                    else {
                        arr[h$0027] = hAdd(shaIndex + 1, new HMap$1(1, [item$0027]));
                        return new HMap$1(0, [arr]);
                    }
                }
            }
            case 0: {
                const arr_1 = hm_1.fields[0];
                const h_1 = hash(shaIndex) | 0;
                const hm$0027 = hAdd(shaIndex + 1, arr_1[h_1]);
                return new HMap$1(0, [initialize(arr_1.length, (i) => ((i === h_1) ? hm$0027 : (new HMap$1(2, []))))]);
            }
            default:
                return new HMap$1(1, [item]);
        }
    };
    return hAdd(0, hm);
}

export function hMapAddMutate(getFastEq, getSHA, item, hm) {
    const hash = curry2(getSHA)(item);
    const hAdd = (shaIndex, hm_1) => {
        switch (hm_1.tag) {
            case 1: {
                const item$0027 = hm_1.fields[0];
                const hash$0027 = curry2(getSHA)(item$0027);
                if (getFastEq(item) === getFastEq(item$0027)) {
                    return new HMap$1(1, [item]);
                }
                else {
                    const arr = fill(new Array(16), 0, 16, new HMap$1(2, []));
                    const h = hash(shaIndex) | 0;
                    const h$0027 = hash$0027(shaIndex) | 0;
                    if (h !== h$0027) {
                        arr[h] = (new HMap$1(1, [item]));
                        arr[h$0027] = (new HMap$1(1, [item$0027]));
                        return new HMap$1(0, [arr]);
                    }
                    else {
                        arr[h$0027] = hAdd(shaIndex + 1, new HMap$1(1, [item$0027]));
                        return new HMap$1(0, [arr]);
                    }
                }
            }
            case 0: {
                const arr_1 = hm_1.fields[0];
                const h_1 = hash(shaIndex) | 0;
                const hm$0027 = hAdd(shaIndex + 1, arr_1[h_1]);
                arr_1[h_1] = hm$0027;
                return new HMap$1(0, [arr_1]);
            }
            default:
                return new HMap$1(1, [item]);
        }
    };
    return hAdd(0, hm);
}

export function hMapTryFind(getFastEq, getSHA, item, hm) {
    const lookup = (shaIndex_mut, hm_1_mut) => {
        let item$0027;
        lookup:
        while (true) {
            const shaIndex = shaIndex_mut, hm_1 = hm_1_mut;
            let matchResult, item$0027_1, arr;
            switch (hm_1.tag) {
                case 1: {
                    if ((item$0027 = hm_1.fields[0], getFastEq(item$0027) === getFastEq(item))) {
                        matchResult = 0;
                        item$0027_1 = hm_1.fields[0];
                    }
                    else {
                        matchResult = 2;
                    }
                    break;
                }
                case 0: {
                    matchResult = 1;
                    arr = hm_1.fields[0];
                    break;
                }
                default:
                    matchResult = 2;
            }
            switch (matchResult) {
                case 0:
                    return some(item$0027_1);
                case 1: {
                    const hit = arr[getSHA(item, shaIndex)];
                    shaIndex_mut = (shaIndex + 1);
                    hm_1_mut = hit;
                    continue lookup;
                }
                default:
                    return void 0;
            }
            break;
        }
    };
    return lookup(0, hm);
}

export function hMapFilter(pred, hm) {
    let x, item$0027;
    let matchResult, item$0027_1, x_1, arr;
    switch (hm.tag) {
        case 1: {
            if ((x = hm, (item$0027 = hm.fields[0], pred(item$0027)))) {
                matchResult = 0;
                item$0027_1 = hm.fields[0];
                x_1 = hm;
            }
            else {
                matchResult = 2;
            }
            break;
        }
        case 0: {
            matchResult = 1;
            arr = hm.fields[0];
            break;
        }
        default:
            matchResult = 2;
    }
    switch (matchResult) {
        case 0:
            return x_1;
        case 1: {
            const arr$0027 = map((hm_1) => hMapFilter(pred, hm_1), arr);
            if (arr$0027.some((x_2) => !equals(x_2, new HMap$1(2, [])))) {
                return new HMap$1(0, [arr$0027]);
            }
            else {
                return new HMap$1(2, []);
            }
        }
        default:
            return new HMap$1(2, []);
    }
}

export function hMapToArray(hm) {
    switch (hm.tag) {
        case 1: {
            const x = hm.fields[0];
            return [x];
        }
        case 0: {
            const arr = hm.fields[0];
            return concat(map(hMapToArray, arr));
        }
        default:
            return [];
    }
}

export function arrayToHmap(getFastEq, getSHA, arr) {
    return fold((hm, item) => hMapAddMutate(getFastEq, getSHA, item, hm), new HMap$1(2, []), arr);
}

export function hMapCount(hm) {
    switch (hm.tag) {
        case 1:
            return 1;
        case 0: {
            const arr = hm.fields[0];
            return sum(map(hMapCount, arr, Int32Array), {
                GetZero: () => 0,
                Add: (x, y) => (x + y),
            }) | 0;
        }
        default:
            return 0;
    }
}

//# sourceMappingURL=HashMap.fs.js.map
