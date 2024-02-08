import { ofArray, indexed, map as map_1, sum, empty, cons, singleton, replicate as replicate_1, append, truncate, length, head, tail, isEmpty } from "../fable_modules/fable-library.4.1.4/List.js";
import { toConsole, interpolate, toText, format, join, replicate, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { chunkBySize, reverse, map, toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { max, min } from "../fable_modules/fable-library.4.1.4/Double.js";
import { equals, int64ToString } from "../fable_modules/fable-library.4.1.4/Util.js";
import { op_UnaryNegation, toUInt32, op_Addition, op_BitwiseAnd, toInt32, fromUInt32, op_Subtraction, op_Division, fromBigInt, fromUInt64, toString, op_Modulus, fromZero, compare, fromOne, op_LeftShift, fromInt32, toInt64, fromInt64, toUInt64 } from "../fable_modules/fable-library.4.1.4/BigInt.js";
import { NumberBase } from "../Common/CommonTypes.fs.js";
import { FastData, FastBits, Bit } from "./SimulatorTypes.fs.js";
import { pow2int64 } from "../Common/Helpers.fs.js";
import { Result_Bind, FSharpResult$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { parse } from "../fable_modules/fable-library.4.1.4/Long.js";
import { parse as parse_1 } from "../fable_modules/fable-library.4.1.4/Int32.js";

export const Constants_maxBinaryDisplayWidth = 32;

function hexToBin(hStr) {
    const convert = (h) => {
        if (!isEmpty(h)) {
            const h$0027 = tail(h);
            const c = head(h);
            let digit;
            switch (c) {
                case "0": {
                    digit = "0000";
                    break;
                }
                case "1": {
                    digit = "0001";
                    break;
                }
                case "2": {
                    digit = "0010";
                    break;
                }
                case "3": {
                    digit = "0011";
                    break;
                }
                case "4": {
                    digit = "0100";
                    break;
                }
                case "5": {
                    digit = "0101";
                    break;
                }
                case "6": {
                    digit = "0110";
                    break;
                }
                case "7": {
                    digit = "0111";
                    break;
                }
                case "8": {
                    digit = "1000";
                    break;
                }
                case "9": {
                    digit = "1001";
                    break;
                }
                case "a": {
                    digit = "1010";
                    break;
                }
                case "b": {
                    digit = "1011";
                    break;
                }
                case "c": {
                    digit = "1100";
                    break;
                }
                case "d": {
                    digit = "1101";
                    break;
                }
                case "e": {
                    digit = "1110";
                    break;
                }
                case "f": {
                    digit = "1111";
                    break;
                }
                default: {
                    const c_1 = c;
                    digit = toFail(printf("Invalid char %c while converting hex %s to binary"))(c_1)(hStr);
                }
            }
            return digit + convert(h$0027);
        }
        else {
            return "";
        }
    };
    const chars = toList(hStr.toLocaleLowerCase().split(""));
    if (!isEmpty(chars)) {
        const chars$0027 = tail(chars);
        const c_2 = head(chars);
        let firstDigit;
        switch (c_2) {
            case "0": {
                firstDigit = "0";
                break;
            }
            case "1": {
                firstDigit = "1";
                break;
            }
            case "2": {
                firstDigit = "10";
                break;
            }
            case "3": {
                firstDigit = "11";
                break;
            }
            case "4": {
                firstDigit = "100";
                break;
            }
            case "5": {
                firstDigit = "101";
                break;
            }
            case "6": {
                firstDigit = "110";
                break;
            }
            case "7": {
                firstDigit = "111";
                break;
            }
            case "8": {
                firstDigit = "1000";
                break;
            }
            case "9": {
                firstDigit = "1001";
                break;
            }
            case "a": {
                firstDigit = "1010";
                break;
            }
            case "b": {
                firstDigit = "1011";
                break;
            }
            case "c": {
                firstDigit = "1100";
                break;
            }
            case "d": {
                firstDigit = "1101";
                break;
            }
            case "e": {
                firstDigit = "1110";
                break;
            }
            case "f": {
                firstDigit = "1111";
                break;
            }
            default: {
                const c_3 = c_2;
                firstDigit = toFail(printf("Invalid char %c while converting hex %s to binary"))(c_3)(hStr);
            }
        }
        return firstDigit + convert(chars$0027);
    }
    else {
        return "";
    }
}

/**
 * Format a hex or bin printed string adding commas every 4 digits.
 * If pad with 0s up to width bits.
 * if width = 0 work ok with no padding
 */
export function addCommasAndZeros(width, printedChars) {
    const divCeiling = (n, divisor) => ~~(((n - 1) + divisor) / divisor);
    const nonZeroDigits = printedChars.slice(2, (printedChars.length - 1) + 1);
    const numDigits = nonZeroDigits.length | 0;
    let bitsPerDigit;
    const matchValue = printedChars[1];
    switch (matchValue) {
        case "b": {
            bitsPerDigit = 1;
            break;
        }
        case "x": {
            bitsPerDigit = 4;
            break;
        }
        default: {
            const r = matchValue;
            bitsPerDigit = toFail(printf("Wrong use of addZeros: radix Char = %c"))(r);
        }
    }
    const extraZerosNum = min(64, divCeiling(max(0, width - (numDigits * bitsPerDigit)), bitsPerDigit)) | 0;
    const digits = replicate(extraZerosNum, "0") + nonZeroDigits;
    const num4Chunks = divCeiling(digits.length, 4) | 0;
    const commaSeparatedDigits = (num4Chunks === 1) ? digits : join(",", map((arg_2) => join("", reverse(arg_2)), reverse(chunkBySize(4, reverse(digits.split(""))))));
    return printedChars.slice(0, 1 + 1) + commaSeparatedDigits;
}

export function addZeros64(width, pFun, n) {
    return addCommasAndZeros(width, pFun(n));
}

export function addZeros(width, pFun, n) {
    return addCommasAndZeros(width, pFun(n));
}

export function hex64(num) {
    return "0x" + format('{0:' + "X" + '}', num);
}

export function fillHex64(width) {
    return (n) => addZeros64(width, hex64, n);
}

export function bin64(num) {
    return "0b" + hexToBin(format('{0:' + "X" + '}', num));
}

export function sDec64(num) {
    return int64ToString(num);
}

export function dec64(num) {
    let copyOfStruct = toUInt64(fromInt64(num));
    return copyOfStruct.toString();
}

export function hex(num) {
    return hex64(toInt64(fromInt32(num)));
}

export function fillHex(width) {
    return (n) => addZeros(width, hex, n);
}

export function bin(num) {
    return bin64(toInt64(fromInt32(num)));
}

export function dec(num) {
    return dec64(toInt64(fromInt32(num)));
}

export function fillBin64(width) {
    return (n) => addZeros64(width, bin64, n);
}

export function fillBin(width) {
    return (n) => addZeros(width, bin, n);
}

/**
 * Convert a bit to string.
 */
export function bitToString(bit) {
    if (bit.tag === 1) {
        return "1";
    }
    else {
        return "0";
    }
}

export const big8 = fromInt32(256);

export const big16 = fromInt32(65536);

export const big32 = op_LeftShift(fromOne(), 32);

export const big64 = op_LeftShift(fromOne(), 64);

/**
 * print a bignum according to a radix.
 * if
 */
export function bigValToPaddedString(width_mut, radix_mut, x_mut) {
    let clo, copyOfStruct;
    bigValToPaddedString:
    while (true) {
        const width = width_mut, radix = radix_mut, x = x_mut;
        if (width === 0) {
            return "0";
        }
        else if (compare(x, fromZero()) < 0) {
            return `Bignm ${x} is negative`;
        }
        else if (width < 1) {
            return `Error: ${width} is not a valid bignum width`;
        }
        else if (compare(x, op_LeftShift(fromOne(), width)) >= 0) {
            width_mut = width;
            radix_mut = radix;
            x_mut = op_Modulus(x, op_LeftShift(fromOne(), width));
            continue bigValToPaddedString;
        }
        else {
            switch (radix.tag) {
                case 1:
                    return toString(x);
                case 2:
                case 0:
                    if (width <= 64) {
                        return ((radix.tag === 2) ? (fillBin64) : ((radix.tag === 0) ? (fillHex64) : ((clo = toFail(printf("Can\'t happen")), (arg) => {
                            const clo_1 = clo(arg);
                            return clo_1;
                        }))))(width)(toInt64(fromUInt64(toUInt64(fromBigInt(x)))));
                    }
                    else {
                        return (bigValToPaddedString(width - 64, radix, op_Division(x, op_LeftShift(fromOne(), 64))) + ",") + ((radix.tag === 0) ? fillHex64(64)(toInt64(fromUInt64(toUInt64(fromBigInt(op_Modulus(x, op_LeftShift(fromOne(), 64))))))).slice(2, 65 + 1) : fillBin64(64)(toInt64(fromUInt64(toUInt64(fromBigInt(op_Modulus(x, op_LeftShift(fromOne(), 64))))))).slice(2, 65 + 1));
                    }
                default:
                    if (compare(x, op_LeftShift(fromOne(), width - 1)) >= 0) {
                        return "-" + ((copyOfStruct = op_Subtraction(op_LeftShift(fromOne(), width), x), toString(copyOfStruct)));
                    }
                    else {
                        return toString(x);
                    }
            }
        }
        break;
    }
}

export function bigValToString(radix, x) {
    let clo;
    if (compare(x, fromZero()) < 0) {
        return `Bignum ${x} is negative`;
    }
    else {
        switch (radix.tag) {
            case 2:
            case 0:
                if (compare(x, op_LeftShift(fromOne(), 64)) <= 0) {
                    return ((radix.tag === 2) ? ((arg) => addCommasAndZeros(0, bin64(arg))) : ((radix.tag === 0) ? ((arg_1) => addCommasAndZeros(0, hex64(arg_1))) : ((clo = toFail(printf("Can\'t happen")), clo))))(toInt64(fromUInt64(toUInt64(fromBigInt(x)))));
                }
                else if (equals(radix, new NumberBase(2, []))) {
                    return "Can\'t display binary format > 64 bits";
                }
                else {
                    return (bigValToString(radix, op_Division(x, op_LeftShift(fromOne(), 64))) + ",") + toText(interpolate("%16X%P()", [toUInt64(fromBigInt(op_LeftShift(op_Modulus(x, fromOne()), 64)))]));
                }
            default:
                return toString(x);
        }
    }
}

/**
 * Convert int64 to string according to provided radix
 */
export function valToString(radix, value) {
    switch (radix.tag) {
        case 2:
            return addCommasAndZeros(0, bin64(value));
        case 0:
            return addCommasAndZeros(0, hex64(value));
        case 3:
            return sDec64(value);
        default:
            return dec64(value);
    }
}

/**
 * Convert int64 to string according to radix.
 * binary and hex numbers are zero padded to width
 * binary is displayed as hex if width > 8
 */
export function valToPaddedString(width, radix, value) {
    switch (radix.tag) {
        case 2:
            return fillBin64(width)(value);
        case 0:
            return fillHex64(width)(value);
        case 3:
            return sDec64(value);
        default:
            return dec64(value);
    }
}

function padToWidth(width, bits) {
    if (length(bits) > width) {
        return truncate(width, bits);
    }
    else {
        return append(bits, replicate_1(width - length(bits), new Bit(0, [])));
    }
}

export function fastDataToPaddedString(maxChars, radix, fd) {
    let r;
    const getPrefixAndDigits = (s) => {
        const matchValue = s.length | 0;
        const matchValue_1 = s[0];
        const matchValue_2 = s[1];
        let matchResult, n_1;
        switch (matchValue_1) {
            case "-": {
                matchResult = 0;
                break;
            }
            case "0": {
                switch (matchValue_2) {
                    case "b": {
                        matchResult = 1;
                        n_1 = matchValue;
                        break;
                    }
                    case "x": {
                        matchResult = 1;
                        n_1 = matchValue;
                        break;
                    }
                    default:
                        matchResult = 2;
                }
                break;
            }
            default:
                matchResult = 2;
        }
        switch (matchResult) {
            case 0: {
                const n = matchValue | 0;
                return ["-", s.slice(1, (n - 1) + 1)];
            }
            case 1:
                return [s.slice(1, 1 + 1), s.slice(2, (n_1 - 1) + 1)];
            default:
                return ["", s];
        }
    };
    const stripLeadingZeros = (s_1) => {
        const strip = (index_mut, s_2_mut) => {
            strip:
            while (true) {
                const index = index_mut, s_2 = s_2_mut;
                if ((index < (s_2.length - 1)) && ((s_2[index] === "0") ? true : (s_2[index] === ","))) {
                    index_mut = (index + 1);
                    s_2_mut = s_2;
                    continue strip;
                }
                else {
                    return s_2.slice(index, (s_2.length - 1) + 1);
                }
                break;
            }
        };
        const patternInput = getPrefixAndDigits(s_1);
        const pre = patternInput[0];
        const digits = patternInput[1];
        return [pre, strip(0, digits)];
    };
    const displayRadix = (radix.tag === 2) ? ((fd.Width > Constants_maxBinaryDisplayWidth) ? (new NumberBase(0, [])) : ((r = radix, r))) : ((r = radix, r));
    let s_3;
    const matchValue_4 = fd.Dat;
    if (matchValue_4.tag === 1) {
        const big = matchValue_4.fields[0];
        s_3 = bigValToPaddedString(fd.Width, displayRadix, big);
    }
    else {
        const w = matchValue_4.fields[0];
        const signBit = (w & ((1 << (fd.Width - 1)) >>> 0)) >>> 0;
        let signExtendedW;
        const matchValue_5 = signBit !== 0;
        let matchResult_1;
        if (displayRadix.tag === 3) {
            if (matchValue_5) {
                matchResult_1 = 0;
            }
            else {
                matchResult_1 = 1;
            }
        }
        else {
            matchResult_1 = 1;
        }
        switch (matchResult_1) {
            case 0: {
                signExtendedW = toInt64(op_Subtraction(toInt64(fromInt32(~~w)), toInt64(op_LeftShift(1n, fd.Width))));
                break;
            }
            default:
                signExtendedW = toInt64(fromUInt64(toUInt64(fromUInt32(w))));
        }
        s_3 = valToPaddedString(fd.Width, displayRadix, signExtendedW);
    }
    if (s_3.length < maxChars) {
        return s_3;
    }
    else {
        const patternInput_1 = stripLeadingZeros(s_3);
        const pre_1 = patternInput_1[0];
        const digits_1 = patternInput_1[1];
        const n_2 = digits_1.length | 0;
        const pre$0027 = ((displayRadix.tag === 1) ? "" : ((displayRadix.tag === 3) ? "" : (`${fd.Width}'`))) + pre_1;
        if ((pre$0027.length + digits_1.length) <= maxChars) {
            return pre$0027 + digits_1;
        }
        else {
            return (pre$0027 + "..") + digits_1.slice(((n_2 + 2) + pre$0027.length) - maxChars, (n_2 - 1) + 1);
        }
    }
}

export function UInt32ToPaddedString(maxChars, radix, width, fd) {
    let r;
    const getPrefixAndDigits = (s) => {
        const matchValue = s.length | 0;
        const matchValue_1 = s[0];
        const matchValue_2 = s[1];
        let matchResult, n_1;
        switch (matchValue_1) {
            case "-": {
                matchResult = 0;
                break;
            }
            case "0": {
                switch (matchValue_2) {
                    case "b": {
                        matchResult = 1;
                        n_1 = matchValue;
                        break;
                    }
                    case "x": {
                        matchResult = 1;
                        n_1 = matchValue;
                        break;
                    }
                    default:
                        matchResult = 2;
                }
                break;
            }
            default:
                matchResult = 2;
        }
        switch (matchResult) {
            case 0: {
                const n = matchValue | 0;
                return ["-", s.slice(1, (n - 1) + 1)];
            }
            case 1:
                return [s.slice(1, 1 + 1), s.slice(2, (n_1 - 1) + 1)];
            default:
                return ["", s];
        }
    };
    const stripLeadingZeros = (s_1) => {
        const strip = (index_mut, s_2_mut) => {
            strip:
            while (true) {
                const index = index_mut, s_2 = s_2_mut;
                if ((index < (s_2.length - 1)) && ((s_2[index] === "0") ? true : (s_2[index] === ","))) {
                    index_mut = (index + 1);
                    s_2_mut = s_2;
                    continue strip;
                }
                else {
                    return s_2.slice(index, (s_2.length - 1) + 1);
                }
                break;
            }
        };
        const patternInput = getPrefixAndDigits(s_1);
        const pre = patternInput[0];
        const digits = patternInput[1];
        return [pre, strip(0, digits)];
    };
    const displayRadix = (radix.tag === 2) ? ((width > Constants_maxBinaryDisplayWidth) ? (new NumberBase(0, [])) : ((r = radix, r))) : ((r = radix, r));
    const signBit = (fd & ((1 << (width - 1)) >>> 0)) >>> 0;
    let signExtendedW;
    const matchValue_4 = signBit !== 0;
    let matchResult_1;
    if (displayRadix.tag === 3) {
        if (matchValue_4) {
            matchResult_1 = 0;
        }
        else {
            matchResult_1 = 1;
        }
    }
    else {
        matchResult_1 = 1;
    }
    switch (matchResult_1) {
        case 0: {
            signExtendedW = toInt64(op_Subtraction(toInt64(fromInt32(~~fd)), toInt64(op_LeftShift(1n, width))));
            break;
        }
        default:
            signExtendedW = toInt64(fromUInt64(toUInt64(fromUInt32(fd))));
    }
    const s_3 = valToPaddedString(width, displayRadix, signExtendedW);
    if (s_3.length < maxChars) {
        return s_3;
    }
    else {
        const patternInput_1 = stripLeadingZeros(s_3);
        const pre_1 = patternInput_1[0];
        const digits_1 = patternInput_1[1];
        const n_2 = digits_1.length | 0;
        const pre$0027 = ((displayRadix.tag === 1) ? "" : ((displayRadix.tag === 3) ? "" : (`${width}'`))) + pre_1;
        if ((pre$0027.length + digits_1.length) <= maxChars) {
            return pre$0027 + digits_1;
        }
        else {
            return (pre$0027 + "..") + digits_1.slice(((n_2 + 2) + pre$0027.length) - maxChars, (n_2 - 1) + 1);
        }
    }
}

export function BigIntToPaddedString(maxChars, radix, width, fd) {
    let r;
    const getPrefixAndDigits = (s) => {
        const matchValue = s.length | 0;
        const matchValue_1 = s[0];
        const matchValue_2 = s[1];
        let matchResult, n_1;
        switch (matchValue_1) {
            case "-": {
                matchResult = 0;
                break;
            }
            case "0": {
                switch (matchValue_2) {
                    case "b": {
                        matchResult = 1;
                        n_1 = matchValue;
                        break;
                    }
                    case "x": {
                        matchResult = 1;
                        n_1 = matchValue;
                        break;
                    }
                    default:
                        matchResult = 2;
                }
                break;
            }
            default:
                matchResult = 2;
        }
        switch (matchResult) {
            case 0: {
                const n = matchValue | 0;
                return ["-", s.slice(1, (n - 1) + 1)];
            }
            case 1:
                return [s.slice(1, 1 + 1), s.slice(2, (n_1 - 1) + 1)];
            default:
                return ["", s];
        }
    };
    const stripLeadingZeros = (s_1) => {
        const strip = (index_mut, s_2_mut) => {
            strip:
            while (true) {
                const index = index_mut, s_2 = s_2_mut;
                if ((index < (s_2.length - 1)) && ((s_2[index] === "0") ? true : (s_2[index] === ","))) {
                    index_mut = (index + 1);
                    s_2_mut = s_2;
                    continue strip;
                }
                else {
                    return s_2.slice(index, (s_2.length - 1) + 1);
                }
                break;
            }
        };
        const patternInput = getPrefixAndDigits(s_1);
        const pre = patternInput[0];
        const digits = patternInput[1];
        return [pre, strip(0, digits)];
    };
    const displayRadix = (radix.tag === 2) ? ((width > Constants_maxBinaryDisplayWidth) ? (new NumberBase(0, [])) : ((r = radix, r))) : ((r = radix, r));
    const s_3 = bigValToPaddedString(width, displayRadix, fd);
    if (s_3.length < maxChars) {
        return s_3;
    }
    else {
        const patternInput_1 = stripLeadingZeros(s_3);
        const pre_1 = patternInput_1[0];
        const digits_1 = patternInput_1[1];
        const n_2 = digits_1.length | 0;
        const pre$0027 = ((displayRadix.tag === 1) ? "" : ((displayRadix.tag === 3) ? "" : (`${width}'`))) + pre_1;
        if ((pre$0027.length + digits_1.length) <= maxChars) {
            return pre$0027 + digits_1;
        }
        else {
            return (pre$0027 + "..") + digits_1.slice(((n_2 + 2) + pre$0027.length) - maxChars, (n_2 - 1) + 1);
        }
    }
}

/**
 * Convert an int into a Bit list with the provided width. The Least
 * Significant Bits are the one with low index (e.g. LSB is at position 0, MSB
 * is at position N). Little Endian.
 * If the number has more bits than width, then more bits will be returned.
 */
export function convertIntToWireData(width, num) {
    const toBit = (_arg) => {
        switch (_arg) {
            case 0:
                return new Bit(0, []);
            case 1:
                return new Bit(1, []);
            default:
                throw new Error("toBit only accepts 0 or 1");
        }
    };
    const intToBinary = (i) => {
        const matchValue = ~~toInt32(i) | 0;
        switch (matchValue) {
            case 0:
            case 1:
                return singleton(toBit(~~toInt32(i)));
            default: {
                const bit = toBit(~~toInt32(toInt64(op_Modulus(i, toInt64(fromInt32(2))))));
                return cons(bit, intToBinary(toInt64(op_Division(i, toInt64(fromInt32(2))))));
            }
        }
    };
    if (compare(num, 0n) >= 0) {
        return padToWidth(width, intToBinary(num));
    }
    else {
        return padToWidth(width, intToBinary(toInt64(op_BitwiseAnd(num, toInt64(op_Subtraction(toInt64(op_LeftShift(1n, width)), 1n))))));
    }
}

/**
 * Convert a list of Bits into an int. The Least Significant Bits are the one
 * with low index (e.g. LSB is at position 0, MSB is at position N).
 * Little Endian.
 */
export function convertWireDataToInt(bits) {
    const convert = (bits_1_mut, idx_mut) => {
        convert:
        while (true) {
            const bits_1 = bits_1_mut, idx = idx_mut;
            if (!isEmpty(bits_1)) {
                if (head(bits_1).tag === 1) {
                    const bits$0027_1 = tail(bits_1);
                    return toInt64(op_Addition(pow2int64(idx), convert(bits$0027_1, idx + 1)));
                }
                else {
                    const bits$0027 = tail(bits_1);
                    bits_1_mut = bits$0027;
                    idx_mut = (idx + 1);
                    continue convert;
                }
            }
            else {
                return toInt64(fromInt32(0));
            }
            break;
        }
    };
    return convert(bits, 0);
}

export function convertInt64ToFastData(width, n) {
    const n$0027 = toUInt64(fromInt64(n));
    let dat;
    if (width > 32) {
        dat = (new FastBits(1, [op_Modulus(fromUInt64(n$0027), op_LeftShift(fromOne(), width))]));
    }
    else {
        const mask = (width === 32) ? 4294967295 : (((1 << width) >>> 0) - 1);
        dat = (new FastBits(0, [((toUInt32(n$0027) >>> 0) & mask) >>> 0]));
    }
    return new FastData(dat, width);
}

export function convertIntToFastData(width, n) {
    if (width <= 32) {
        return new FastData(new FastBits(0, [n]), width);
    }
    else {
        return new FastData(new FastBits(1, [fromUInt32(n)]), width);
    }
}

export function convertBigintToFastData(width, b) {
    return new FastData(new FastBits(1, [b]), width);
}

/**
 * convert to 64 bits - if too large take LS 64 bits
 */
export function convertFastDataToInt64(d) {
    const matchValue = d.Dat;
    if (matchValue.tag === 1) {
        const b = matchValue.fields[0];
        return toUInt64(fromBigInt((d.Width > 64) ? op_Modulus(b, op_LeftShift(fromOne(), 64)) : b));
    }
    else {
        const n = matchValue.fields[0];
        return toUInt64(fromUInt32(n));
    }
}

export function convertBigIntToUInt64(w, b) {
    return toUInt64(fromBigInt((w > 64) ? op_Modulus(b, op_LeftShift(fromOne(), 64)) : b));
}

/**
 * convert to a bigint - always works. Bits < width will be correct.
 */
export function convertFastDataToBigint(d) {
    const matchValue = d.Dat;
    if (matchValue.tag === 1) {
        const n_1 = matchValue.fields[0];
        return n_1;
    }
    else {
        const n = matchValue.fields[0];
        return fromUInt32(n);
    }
}

/**
 * convert to int with an exception if data is too large
 */
export function convertFastDataToInt(d) {
    const matchValue = d.Dat;
    if (matchValue.tag === 1) {
        return toFail(`Can't convert ${d.Dat} to integer`);
    }
    else {
        const n = matchValue.fields[0];
        return n;
    }
}

/**
 * Lossy conversion of bigint to int32 without exceptions
 * TODO: chnage this - and all dependencies with 32 bit int - to int64
 */
export function convertFastDataToInt32(d) {
    const matchValue = d.Dat;
    if (matchValue.tag === 1) {
        const n_1 = matchValue.fields[0];
        return ~~toInt32(op_BitwiseAnd(n_1, fromInt32(-1))) | 0;
    }
    else {
        const n = matchValue.fields[0];
        return ~~n | 0;
    }
}

export function convertBigIntToInt32(b) {
    return ~~toInt32(op_BitwiseAnd(b, fromInt32(-1)));
}

export function convertInt64ToUInt32(width, n) {
    const n$0027 = toUInt64(fromInt64(n));
    const mask = (width === 32) ? 4294967295 : (((1 << width) >>> 0) - 1);
    return ((toUInt32(n$0027) >>> 0) & mask) >>> 0;
}

export function convertInt64ToBigInt(width, n) {
    const n$0027 = toUInt64(fromInt64(n));
    return op_Modulus(fromUInt64(n$0027), op_LeftShift(fromOne(), width));
}

export function convertFastDataToWireData(fastDat) {
    const big64ToWire = (width, big) => convertIntToWireData(width, toInt64(fromUInt64(toUInt64(fromBigInt(big)))));
    const bigToWire = (width_1, b) => {
        if (compare(b, fromZero()) < 0) {
            toConsole(`Warning - invalid BigWord FastData case ${b} < 0`);
            return empty();
        }
        else if (width_1 <= 64) {
            return big64ToWire(width_1, b);
        }
        else {
            const lsBits = op_Modulus(b, op_LeftShift(fromOne(), 64));
            return append(big64ToWire(64, lsBits), bigToWire(width_1 - 64, op_Division(b, op_LeftShift(fromOne(), 64))));
        }
    };
    const matchValue = fastDat.Dat;
    if (matchValue.tag === 1) {
        const b_1 = matchValue.fields[0];
        return bigToWire(fastDat.Width, b_1);
    }
    else {
        const w = matchValue.fields[0];
        return convertIntToWireData(fastDat.Width, toInt64(fromUInt32(w)));
    }
}

export function convertWireDataToFastData(wd) {
    if (length(wd) <= 32) {
        return new FastData(new FastBits(0, [toUInt32(toUInt64(fromInt64(convertWireDataToInt(wd)))) >>> 0]), length(wd));
    }
    else {
        return new FastData(new FastBits(1, [sum(map_1((tupledArg) => {
            const i = tupledArg[0] | 0;
            const bit = tupledArg[1];
            if (bit.tag === 1) {
                return op_LeftShift(fromOne(), i);
            }
            else {
                return fromZero();
            }
        }, indexed(wd)), {
            GetZero: () => (0n),
            Add: op_Addition,
        })]), length(wd));
    }
}

export const emptyFastData = new FastData(new FastBits(0, [0]), 0);

/**
 * Try to convert a string to an int, or return an error message if that was
 * not possible.
 */
export function strToInt(str) {
    try {
        return new FSharpResult$2(0, [toInt64(parse(str, 511, false, 64))]);
    }
    catch (matchValue) {
        return new FSharpResult$2(1, ["Invalid number."]);
    }
}

function countBits(num) {
    let str;
    return ((str = bin64(num), str.length)) - 2;
}

/**
 * Check a number is formed by at most <width> bits.
 */
export function checkWidth(width_mut, num_mut) {
    checkWidth:
    while (true) {
        const width = width_mut, num = num_mut;
        if (compare(num, 0n) < 0) {
            width_mut = width;
            num_mut = toInt64(op_Subtraction(toInt64(op_UnaryNegation(num)), 1n));
            continue checkWidth;
        }
        else {
            const bitsCount = countBits(num) | 0;
            if (bitsCount <= width) {
                return void 0;
            }
            else {
                return toText(printf("Expected %d or less bits."))(width);
            }
        }
        break;
    }
}

/**
 * Convert a string to a number making sure that it has no more bits than
 * specified in width.
 */
export function strToIntCheckWidth(width, str) {
    const matchValue = str.trim();
    if (matchValue === "") {
        return new FSharpResult$2(0, [0n]);
    }
    else {
        const str_1 = matchValue;
        return Result_Bind((num) => {
            const matchValue_1 = checkWidth(width, num);
            if (matchValue_1 != null) {
                const err = matchValue_1;
                return new FSharpResult$2(1, [err]);
            }
            else {
                return new FSharpResult$2(0, [num]);
            }
        }, strToInt(str_1));
    }
}

export function convertBinToDec(bits) {
    const convert = (bits_1_mut, idx_mut) => {
        convert:
        while (true) {
            const bits_1 = bits_1_mut, idx = idx_mut;
            if (!isEmpty(bits_1)) {
                switch (head(bits_1)) {
                    case "0": {
                        const bits$0027 = tail(bits_1);
                        bits_1_mut = bits$0027;
                        idx_mut = (idx - 1);
                        continue convert;
                    }
                    case "1": {
                        const bits$0027_1 = tail(bits_1);
                        return toInt64(op_Addition(pow2int64(idx), convert(bits$0027_1, idx - 1)));
                    }
                    default:
                        return toFail(printf("Not binary input, should not happen!"));
                }
            }
            else {
                return toInt64(fromInt32(0));
            }
            break;
        }
    };
    return convert(ofArray(bits.split("")), bits.length - 1);
}

/**
 * Converts a binary, hex or decimal number to decimal
 */
export function toDecimal(num, numBase, width) {
    const width_1 = parse_1(width, 511, false, 32) | 0;
    switch (numBase) {
        case "\'d":
            return toInt64(parse(num, 511, false, 64));
        case "\'b":
            return convertBinToDec(num);
        case "\'h":
            return convertBinToDec(hexToBin(num.toLocaleLowerCase()));
        default:
            return toFail(printf("Wrong base, should not happen!"));
    }
}

//# sourceMappingURL=NumberHelpers.fs.js.map
