import { nonSeeded } from "./fable_modules/fable-library.4.1.4/Random.js";
import { initialize, copy } from "./fable_modules/fable-library.4.1.4/Array.js";
import { op_Addition, fromInt32, op_Multiply, toInt64, compare } from "./fable_modules/fable-library.4.1.4/BigInt.js";
import { Record } from "./fable_modules/fable-library.4.1.4/Types.js";
import { record_type, lambda_type, int32_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { reverse, cons, empty, initialize as initialize_1, length, item } from "./fable_modules/fable-library.4.1.4/List.js";
import { toArray as toArray_1 } from "./fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "./fable_modules/fable-library.4.1.4/Range.js";
import { toConsole } from "./fable_modules/fable-library.4.1.4/String.js";

export const Constants_maxFirstProductArgSize = 1000;

export const random = nonSeeded();

/**
 * Fischer-Yates shuffle algorithm
 * Returns a random shuffled array without changing the input array
 */
export function shuffleA(arrayToShuffle) {
    const tmpA = copy(arrayToShuffle);
    for (let i = 0; i <= (tmpA.length - 1); i++) {
        const r = random.Next2(i, tmpA.length) | 0;
        const tupledArg = [tmpA[i], tmpA[r]];
        const iv = tupledArg[0];
        const rv = tupledArg[1];
        tmpA[r] = iv;
        tmpA[i] = rv;
    }
    return tmpA;
}

export function satTimes(a, b) {
    if (compare(toInt64(op_Multiply(toInt64(fromInt32(a)), toInt64(fromInt32(b)))), toInt64(fromInt32(2147483647))) > 0) {
        return 2147483647;
    }
    else {
        return (a * b) | 0;
    }
}

export function satPlus(a, b) {
    if (compare(toInt64(op_Addition(toInt64(fromInt32(a)), toInt64(fromInt32(b)))), toInt64(fromInt32(2147483647))) > 0) {
        return 2147483647;
    }
    else {
        return (a + b) | 0;
    }
}

export class Gen$1 extends Record {
    constructor(Data, Size) {
        super();
        this.Data = Data;
        this.Size = (Size | 0);
    }
}

export function Gen$1_$reflection(gen0) {
    return record_type("GenerateData.Gen`1", [gen0], Gen$1, () => [["Data", lambda_type(int32_type, gen0)], ["Size", int32_type]]);
}

export function fromList(l) {
    return new Gen$1((i) => item(i % length(l), l), length(l));
}

export function fromArray(l) {
    return new Gen$1((i) => l[i % l.length], l.length);
}

export function toArray(g) {
    return initialize(g.Size, g.Data);
}

export function toList(g) {
    return initialize_1(g.Size, g.Data);
}

/**
 * return a shuffled range of integers
 */
export function randomInt(min, step, max) {
    return fromArray(shuffleA(toArray_1(rangeDouble(min, step, max))));
}

/**
 * Map the sequence elemntwise
 */
export function map(f, g1) {
    return new Gen$1((i) => f(g1.Data(i)), g1.Size);
}

/**
 * Map two sequences elementwise to make a third using f (e.g. this could zip two sequences together)
 */
export function map2(f, g1, g2) {
    return new Gen$1((i) => f(g1.Data(i), g2.Data(i)), g1.Size);
}

/**
 * Map three sequences elementwise to make a fourth using f to combine them.
 */
export function map3(f, g1, g2, g3) {
    return new Gen$1((i) => f(g1.Data(i), g2.Data(i), g3.Data(i)), g1.Size);
}

/**
 * Cartesian product: output sequence cycles through all combinations of the two inputs, combined by f
 * All elements in g1 are used in order combined with the first element of g2, then the 2nd, etc.
 * Therefore this will not work well if g1.Size is too large!
 */
export function product(f, g1, g2) {
    const n1 = g1.Size | 0;
    const n2 = g2.Size | 0;
    if (g1.Size > Constants_maxFirstProductArgSize) {
        toConsole(`Warning: product of sequence sizes: ${g1.Size} X ${g2.Size}. ${g1.Size} will take a like time to cycle through ${g1.Size} values of g1 before advancing g2`);
    }
    return new Gen$1((i) => f(g1.Data(i % n1), g2.Data(~~(i / n1) % n2)), satTimes(n1, n2));
}

/**
 * Output sequence cycles through the two input sequences appended together
 */
export function sum(g1, g2) {
    const n = (g1.Size + g2.Size) | 0;
    const f = (i) => {
        const i$0027 = (i % n) | 0;
        if (i$0027 < g1.Size) {
            return g1.Data(i$0027);
        }
        else {
            return g2.Data(i$0027 - g1.Size);
        }
    };
    return new Gen$1(f, satPlus(g1.Size, g2.Size));
}

/**
 * The same as List.filter but works well on infinite sequences. Note that Size must be small enough
 * for the filter function to be applied to everything: a scalable much more complex implementation
 * would evaluate the sequence on demand and allow input Size up to Int32.Max.
 */
export function filter(f, g) {
    let filteredL = empty();
    for (let n = 0; n <= (g.Size - 1); n++) {
        const v = g.Data(n);
        if (f(v)) {
            filteredL = cons(v, filteredL);
        }
    }
    return fromList(reverse(filteredL));
}

/**
 * Truncate samples down to size (repeating) samples.
 * runTests will run this number of separate tests.
 */
export function truncate(size, samples) {
    return new Gen$1(samples.Data, size);
}

//# sourceMappingURL=GenerateData.fs.js.map
