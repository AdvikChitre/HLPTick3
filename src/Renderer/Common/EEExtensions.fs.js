import { value as value_1, some } from "../fable_modules/fable-library.4.1.4/Option.js";
import { fold, singleton as singleton_1, sortBy, pairwise, map, reverse, head, tail, cons, empty, isEmpty } from "../fable_modules/fable-library.4.1.4/List.js";
import { trimEnd, trimStart, trim, substring, startsWith, replace, endsWith, compare, join, split, printf, toText } from "../fable_modules/fable-library.4.1.4/String.js";
import { comparePrimitives, numberHash, defaultOf } from "../fable_modules/fable-library.4.1.4/Util.js";
import { isLetter } from "../fable_modules/fable-library.4.1.4/Char.js";
import { create, match } from "../fable_modules/fable-library.4.1.4/RegExp.js";
import { toArray, ofArray, singleton, empty as empty_1, collect, append, ofList, map as map_1, delay, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { Array_groupBy, List_groupBy } from "../fable_modules/fable-library.4.1.4/Seq2.js";
import { map as map_2 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { toArray as toArray_1, FSharpMap__TryFind } from "../fable_modules/fable-library.4.1.4/Map.js";

export function FableReplacements_optionMap2(f, v1, v2) {
    let matchResult, v1_1, v2_1;
    if (v1 != null) {
        if (v2 != null) {
            matchResult = 0;
            v1_1 = value_1(v1);
            v2_1 = value_1(v2);
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
            return some(f(v1_1, v2_1));
        default:
            return void 0;
    }
}

export function FableReplacements_listChunkBySize(chunkSize, l) {
    const listChunkBySize$0027 = (state_mut, chunksLeft_mut, itemsRemaining_mut) => {
        listChunkBySize$0027:
        while (true) {
            const state = state_mut, chunksLeft = chunksLeft_mut, itemsRemaining = itemsRemaining_mut;
            if (!isEmpty(itemsRemaining)) {
                if (chunksLeft === 0) {
                    state_mut = cons(empty(), state);
                    chunksLeft_mut = chunkSize;
                    itemsRemaining_mut = itemsRemaining;
                    continue listChunkBySize$0027;
                }
                else {
                    const itemsTail = tail(itemsRemaining);
                    const nextItem = head(itemsRemaining);
                    state_mut = cons(cons(nextItem, head(state)), tail(state));
                    chunksLeft_mut = (chunksLeft - 1);
                    itemsRemaining_mut = itemsTail;
                    continue listChunkBySize$0027;
                }
            }
            else {
                return state;
            }
            break;
        }
    };
    if (isEmpty(l)) {
        return empty();
    }
    else {
        return reverse(map(reverse, listChunkBySize$0027(empty(), 0, l)));
    }
}

export function FableReplacements_hexToString(x) {
    const loop = (str_mut, _arg_mut) => {
        let arg;
        loop:
        while (true) {
            const str = str_mut, _arg = _arg_mut;
            if (_arg === 0) {
                return str;
            }
            else {
                const num = _arg;
                str_mut = (((arg = (num % 16), toText(printf("%X"))(arg))) + str);
                _arg_mut = ~~(num / 16);
                continue loop;
            }
            break;
        }
    };
    if (x === 0) {
        return "0";
    }
    else {
        return loop("", x);
    }
}

/**
 * splits text into its array of non-whitepace strings separated by whitespace
 */
export function StringModule_SplitOnWhitespace(text) {
    return split(text, [], void 0, 1);
}

/**
 * Concatenate a sequence of strings
 * Using sep as separator
 */
export function StringModule_Concat(sep, strings) {
    return join(sep, strings);
}

export function StringModule_Length(str) {
    let str_2;
    const str_1 = str;
    str_2 = ((str_1 === defaultOf()) ? "" : str_1);
    return str_2.length | 0;
}

/**
 * True if str contains value
 */
export function StringModule_Contains(value, str) {
    return str.indexOf(value) >= 0;
}

export function StringModule_Compare(strB, strA) {
    return compare(strA, strB, 4);
}

/**
 * True if str ends with value
 */
export function StringModule_EndsWith(value, str) {
    return endsWith(str, value, 4);
}

/**
 * See String.Equals
 */
export function StringModule_Equals(comparisonType, value, str) {
    return compare(str, value, comparisonType) === 0;
}

/**
 * Replace all occurences of oldChar by newchar
 */
export function StringModule_ReplaceChar(oldChar, newChar, str) {
    return replace(str, oldChar, newChar);
}

/**
 * Replace all occurences of oldValue by newValue
 */
export function StringModule_Replace(oldValue, newValue, str) {
    return replace(str, oldValue, newValue);
}

/**
 * Split str at all of separator array elements
 * Return array of strings
 * Adjacent separators generate empty strings
 */
export function StringModule_Split(separator, str) {
    return split(str, separator, void 0, 0);
}

/**
 * Split str at all of separator array elements
 * Return array of strings
 * Adjacent separators do not generate strings
 */
export function StringModule_SplitRemoveEmptyEntries(separator, str) {
    return split(str, separator, void 0, 1);
}

/**
 * Split str at all of separator string array elements
 * Return array of strings
 * Adjacent separators generate empty strings
 */
export function StringModule_SplitString(separator, str) {
    return split(str, separator, void 0, 0);
}

/**
 * Split str at all of separator string array elements
 * Return array of strings
 * Adjacent separators do not generate strings
 */
export function StringModule_SplitStringRemoveEmptyEntries(separator, str) {
    return split(str, separator, void 0, 1);
}

/**
 * Return true if str starts with value
 */
export function StringModule_StartsWith(value, str) {
    return startsWith(str, value, 4);
}

/**
 * Return true if str starts with a letter
 */
export function StringModule_StartsWithLetter(str) {
    if (str !== "") {
        return isLetter(str[0]);
    }
    else {
        return false;
    }
}

/**
 * Return substring of str at startIndex of length chars
 * Throw ArgumentOutOfRange exception if any part of
 * selected string lies outside str.
 */
export function StringModule_SubstringLength(startIndex, length, str) {
    return substring(str, startIndex, length);
}

/**
 * Return str from startIndex till end
 * Throw ArgumentOutOfRange exception if startWith
 * lies outside str
 */
export function StringModule_Substring(startIndex, str) {
    return substring(str, startIndex);
}

export function StringModule_ToLower(str) {
    return str.toLowerCase();
}

export function StringModule_ToUpper(str) {
    return str.toUpperCase();
}

/**
 * Remove all leading and training whitespace
 */
export function StringModule_Trim(str) {
    return str.trim();
}

/**
 * Remove all leading and trailing chars in trimChars
 */
export function StringModule_TrimChars(trimChars, str) {
    return trim(str, ...trimChars);
}

/**
 * Remove all leading whitespace
 */
export function StringModule_TrimStart(trimChars, str) {
    return trimStart(str, ...trimChars);
}

/**
 * Remove all trailing whitespace
 */
export function StringModule_TrimEnd(trimChars, str) {
    return trimEnd(str, ...trimChars);
}

/**
 * Match a regular expression
 * Return Some [grps] where m is the match string,
 * grps is the list of match groups (if any)
 * return None on no match
 */
export function StringModule_RegexMatchGroups(regex, str) {
    const m = match(create(regex), str);
    if (m != null) {
        return toList(delay(() => map_1((n) => (m[n] || ""), toList(rangeDouble(1, 1, m.length)))));
    }
    else {
        return void 0;
    }
}

/**
 * Match a regular expression
 * Return Some m where m is the match string,
 * return None on no match
 */
export function StringModule_RegexMatch(regex, str) {
    const m = match(create(regex), str);
    if (m != null) {
        return m[0];
    }
    else {
        return void 0;
    }
}

/**
 * convert a System.XXX numeric parse function to idiomatic F# option.
 * e.g. String.TryParsewith System.Int32 will return Some n on successful Int32 parse or None.
 */
export function StringModule_TryParseWith(tryParseFunc) {
    return (arg) => {
        const _arg = tryParseFunc(arg);
        if (_arg[0]) {
            const v = _arg[1];
            return some(v);
        }
        else {
            return void 0;
        }
    };
}

export function ListModule_pairWithPreviousOrSelf(list) {
    if (!isEmpty(list)) {
        const rest = tail(list);
        const first = head(list);
        return cons([first, first], pairwise(list));
    }
    else {
        return empty();
    }
}

export function ListModule_ToString(chars) {
    return join("", ofList(chars));
}

/**
 * Split list into list of lists each such that each element for which pred returns true starts a sublist.
 * Every sublist must contain at least one element.
 * Every sublist except possibly the first starts with an element el for which pred el is true
 */
export function ListModule_ChunkAt1(pred, lst) {
    let i = 0;
    return map((arg) => map((tuple_3) => tuple_3[1], arg[1]), sortBy((tuple_1) => tuple_1[0], List_groupBy((tuple) => tuple[0], toList(delay(() => append(collect((el) => append(pred(el) ? ((i = ((i + 1) | 0), empty_1())) : empty_1(), delay(() => singleton([i, el]))), lst), delay(() => [])))), {
        Equals: (x, y) => (x === y),
        GetHashCode: numberHash,
    }), {
        Compare: comparePrimitives,
    }));
}

/**
 * Split list into list of lists each such that each element for which pred returns true starts a sublist.
 * Every sublist must contain at least one element.
 * Every sublist except possibly the first starts with an element el for which pred el is true.
 */
export function ListModule_ChunkAt(pred, list) {
    const loop = (chunk_mut, chunks_mut, list_1_mut) => {
        let xs, x, xs_1, x_1;
        loop:
        while (true) {
            const chunk = chunk_mut, chunks = chunks_mut, list_1 = list_1_mut;
            if (!isEmpty(list_1)) {
                if ((xs = tail(list_1), (x = head(list_1), pred(x) && isEmpty(chunk)))) {
                    const x_2 = head(list_1);
                    const xs_2 = tail(list_1);
                    chunk_mut = singleton_1(x_2);
                    chunks_mut = chunks;
                    list_1_mut = xs_2;
                    continue loop;
                }
                else if ((xs_1 = tail(list_1), (x_1 = head(list_1), pred(x_1)))) {
                    const x_3 = head(list_1);
                    const xs_3 = tail(list_1);
                    chunk_mut = singleton_1(x_3);
                    chunks_mut = cons(reverse(chunk), chunks);
                    list_1_mut = xs_3;
                    continue loop;
                }
                else {
                    const x_4 = head(list_1);
                    const xs_4 = tail(list_1);
                    chunk_mut = cons(x_4, chunk);
                    chunks_mut = chunks;
                    list_1_mut = xs_4;
                    continue loop;
                }
            }
            else {
                return reverse(cons(reverse(chunk), chunks));
            }
            break;
        }
    };
    return loop(empty(), empty(), list);
}

/**
 * Extract Ok elements from result list, return list of Ok values
 */
export function ListModule_OkList(lst) {
    return toList(delay(() => collect((x) => {
        const matchValue = x;
        if (matchValue.tag === 0) {
            const y = matchValue.fields[0];
            return singleton(y);
        }
        else {
            return [];
        }
    }, lst)));
}

/**
 * Extract Error elements from result list, return list of errors
 */
export function ListModule_ErrorList(lst) {
    return toList(delay(() => collect((x) => {
        const matchValue = x;
        if (matchValue.tag === 1) {
            const y = matchValue.fields[0];
            return singleton(y);
        }
        else {
            return [];
        }
    }, lst)));
}

/**
 * split Result list into pair of Ok and Error value lists repectively
 */
export function ListModule_SplitResult(resL) {
    return fold((tupledArg, _arg) => {
        const rl = tupledArg[0];
        const el = tupledArg[1];
        if (_arg.tag === 0) {
            const r = _arg.fields[0];
            return [cons(r, rl), el];
        }
        else {
            const e = _arg.fields[0];
            return [rl, cons(e, el)];
        }
    }, [empty(), empty()], resL);
}

export function ArrayModule_ToString(chars) {
    return join("", ofArray(chars));
}

/**
 * Split array into array of arrays each such that each element for which pred returns true starts a subarray.
 * Every subarray must contain at least one element.
 * Every subarray except possibly the first starts with an element el for which pred el is true.
 */
export function ArrayModule_ChunkAt(pred, arr) {
    let i = 0;
    return map_2((arg) => map_2((tuple_2) => tuple_2[1], arg[1]), Array_groupBy((tuple) => tuple[0], toArray(delay(() => collect((x) => append(pred(x) ? ((i = ((i + 1) | 0), empty_1())) : empty_1(), delay(() => singleton([i, x]))), arr))), {
        Equals: (x_1, y) => (x_1 === y),
        GetHashCode: numberHash,
    }));
}

/**
 * Looks up key in table, returning defaultValue if
 * key is not in table
 */
export function MapModule_FindWithDefault(key, table, defaultValue) {
    const matchValue = FSharpMap__TryFind(table, key);
    if (matchValue == null) {
        return defaultValue;
    }
    else {
        const v = value_1(matchValue);
        return v;
    }
}

/**
 * Return array of all values in table
 */
export function MapModule_Values(table) {
    return map_2((tuple) => tuple[1], toArray_1(table));
}

/**
 * Return array of all keys in table
 */
export function MapModule_Keys(table) {
    return map_2((tuple) => tuple[0], toArray_1(table));
}

//# sourceMappingURL=EEExtensions.fs.js.map
