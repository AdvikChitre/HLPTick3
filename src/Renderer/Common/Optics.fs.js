import { Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { union_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { some, bind, value as value_2, map } from "../fable_modules/fable-library.4.1.4/Option.js";
import { empty, mapIndexed, item, length, cons, tail, head, isEmpty, toArray, ofArray } from "../fable_modules/fable-library.4.1.4/List.js";
import { FSharpResult$2, FSharpChoice$2 } from "../fable_modules/fable-library.4.1.4/Choice.js";
import { ofList, toList, ofArray as ofArray_1, toArray as toArray_1 } from "../fable_modules/fable-library.4.1.4/Map.js";
import { compare } from "../fable_modules/fable-library.4.1.4/Util.js";

export class Compose_Lens extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["Lens"];
    }
}

export function Compose_Lens_$reflection() {
    return union_type("Optics.Compose.Lens", [], Compose_Lens, () => [[]]);
}

export function Compose_Lens_op_GreaterMinusGreater_Z15C92E89(_arg1, _arg) {
    const s2 = _arg[1];
    const g2 = _arg[0];
    return (_arg_1) => {
        const s1 = _arg_1[1];
        const g1 = _arg_1[0];
        return [(a) => g2(g1(a)), (c) => ((a_1) => s1(s2(c)(g1(a_1)))(a_1))];
    };
}

export function Compose_Lens_op_GreaterMinusGreater_Z335E5A0C(_arg3, _arg) {
    const s2 = _arg[1];
    const g2 = _arg[0];
    return (_arg_1) => {
        const s1 = _arg_1[1];
        const g1 = _arg_1[0];
        return [(a) => g2(g1(a)), (c) => ((a_1) => s1(s2(c)(g1(a_1)))(a_1))];
    };
}

export function Compose_Lens_op_GreaterMinusGreater_Z11B815C(_arg5, _arg) {
    const t = _arg[1];
    const f = _arg[0];
    return (_arg_1) => {
        const s = _arg_1[1];
        const g = _arg_1[0];
        return [(a) => f(g(a)), (c) => ((a_1) => s(t(c))(a_1))];
    };
}

export function Compose_Lens_op_GreaterMinusGreater_Z4F046D59(_arg7, _arg) {
    const t = _arg[1];
    const f = _arg[0];
    return (_arg_1) => {
        const s = _arg_1[1];
        const g = _arg_1[0];
        return [(a) => f(g(a)), (c) => ((a_1) => s(t(c))(a_1))];
    };
}

export class Compose_Prism extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["Prism"];
    }
}

export function Compose_Prism_$reflection() {
    return union_type("Optics.Compose.Prism", [], Compose_Prism, () => [[]]);
}

export function Compose_Prism_op_GreaterQmarkGreater_507FA136(_arg1, _arg) {
    const s2 = _arg[1];
    const g2 = _arg[0];
    return (_arg_1) => {
        const s1 = _arg_1[1];
        const g1 = _arg_1[0];
        return [(a) => map(g2, g1(a)), (c) => ((a_1) => {
            const _arg_2 = map(s2(c), g1(a_1));
            if (_arg_2 != null) {
                const b = value_2(_arg_2);
                return s1(b)(a_1);
            }
            else {
                return a_1;
            }
        })];
    };
}

export function Compose_Prism_op_GreaterQmarkGreater_76E8D5B5(_arg3, _arg) {
    const s2 = _arg[1];
    const g2 = _arg[0];
    return (_arg_1) => {
        const s1 = _arg_1[1];
        const g1 = _arg_1[0];
        return [(a) => bind(g2, g1(a)), (c) => ((a_1) => {
            const _arg_2 = map(s2(c), g1(a_1));
            if (_arg_2 != null) {
                const b = value_2(_arg_2);
                return s1(b)(a_1);
            }
            else {
                return a_1;
            }
        })];
    };
}

export function Compose_Prism_op_GreaterQmarkGreater_44AD0EE5(_arg5, _arg) {
    const t = _arg[1];
    const f = _arg[0];
    return (_arg_1) => {
        const s = _arg_1[1];
        const g = _arg_1[0];
        return [(a) => map(f, g(a)), (c) => ((a_1) => s(t(c))(a_1))];
    };
}

export function Compose_Prism_op_GreaterQmarkGreater_AB2E2E6(_arg7, _arg) {
    const t = _arg[1];
    const f = _arg[0];
    return (_arg_1) => {
        const s = _arg_1[1];
        const g = _arg_1[0];
        return [(a) => bind(f, g(a)), (c) => ((a_1) => s(t(c))(a_1))];
    };
}

export class Optic_Get extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["Get"];
    }
}

export function Optic_Get_$reflection() {
    return union_type("Optics.Optic.Get", [], Optic_Get, () => [[]]);
}

export function Optic_Get_op_HatDot_Z146BA564(_arg1, _arg) {
    const g = _arg[0];
    return g;
}

export function Optic_Get_op_HatDot_Z32FCD1E1(_arg3, _arg) {
    const g = _arg[0];
    return g;
}

export class Optic_Set extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["Set"];
    }
}

export function Optic_Set_$reflection() {
    return union_type("Optics.Optic.Set", [], Optic_Set, () => [[]]);
}

export function Optic_Set_op_HatEquals_Z147477F8(_arg1, _arg) {
    const s = _arg[1];
    return s;
}

export function Optic_Set_op_HatEquals_Z32E30375(_arg3, _arg) {
    const s = _arg[1];
    return s;
}

export class Optic_Map extends Union {
    constructor() {
        super();
        this.tag = 0;
        this.fields = [];
    }
    cases() {
        return ["Map"];
    }
}

export function Optic_Map_$reflection() {
    return union_type("Optics.Optic.Map", [], Optic_Map, () => [[]]);
}

export function Optic_Map_op_HatPercent_Z1462312A(_arg1, _arg) {
    const s = _arg[1];
    const g = _arg[0];
    return (f) => ((a) => s(f(g(a)))(a));
}

export function Optic_Map_op_HatPercent_Z32F545AB(_arg3, _arg) {
    const s = _arg[1];
    const g = _arg[0];
    return (f) => ((a) => {
        const _arg_1 = map(f, g(a));
        if (_arg_1 != null) {
            const b = value_2(_arg_1);
            return s(b)(a);
        }
        else {
            return a;
        }
    });
}

/**
 * Converts an isomorphism into a lens.
 */
export function Lens_ofIsomorphism(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const t = _arg[1];
    const f = _arg[0];
    return [f, (b) => ((_arg_1) => t(b))];
}

/**
 * Converts an epimorphism into a prism.
 */
export function Prism_ofEpimorphism(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const t = _arg[1];
    const f = _arg[0];
    return [f, (b) => ((_arg_1) => t(b))];
}

export function Optics_id_() {
    return [(x) => x, (x_1) => ((_arg) => x_1)];
}

/**
 * Isomorphism between a boxed and unboxed type.
 */
export function Optics_box_() {
    return [(value) => value, (value_1) => value_1];
}

/**
 * Lens to the first item of a tuple.
 */
export function Optics_fst_() {
    return [(tuple) => tuple[0], (a) => ((t) => [a, t[1]])];
}

/**
 * Lens to the second item of a tuple.
 */
export function Optics_snd_() {
    return [(tuple) => tuple[1], (b) => ((t) => [t[0], b])];
}

/**
 * Isomorphism to an list.
 */
export function Optics_Array_list_() {
    return [ofArray, toArray];
}

/**
 * Prism to Choice1Of2.
 */
export function Optics_Choice_choice1Of2_() {
    return [(x) => {
        if (x.tag === 0) {
            const v = x.fields[0];
            return some(v);
        }
        else {
            return void 0;
        }
    }, (v_1) => ((x_1) => ((x_1.tag === 0) ? (new FSharpChoice$2(0, [v_1])) : x_1))];
}

/**
 * Prism to Choice2Of2.
 */
export function Optics_Choice_choice2Of2_() {
    return [(x) => {
        if (x.tag === 1) {
            const v = x.fields[0];
            return some(v);
        }
        else {
            return void 0;
        }
    }, (v_1) => ((x_1) => ((x_1.tag === 1) ? (new FSharpChoice$2(1, [v_1])) : x_1))];
}

/**
 * Prism to Ok.
 */
export function Optics_Result_ok_() {
    return [(x) => {
        if (x.tag === 0) {
            const v = x.fields[0];
            return some(v);
        }
        else {
            return void 0;
        }
    }, (v_1) => ((x_1) => ((x_1.tag === 0) ? (new FSharpResult$2(0, [v_1])) : x_1))];
}

/**
 * Prism to Error.
 */
export function Optics_Result_error_() {
    return [(x) => {
        if (x.tag === 1) {
            const v = x.fields[0];
            return some(v);
        }
        else {
            return void 0;
        }
    }, (v_1) => ((x_1) => ((x_1.tag === 1) ? (new FSharpResult$2(1, [v_1])) : x_1))];
}

/**
 * Prism to the head of a list.
 */
export function Optics_List_head_() {
    return [(_arg) => {
        if (!isEmpty(_arg)) {
            const h = head(_arg);
            return some(h);
        }
        else {
            return void 0;
        }
    }, (v) => ((_arg_1) => {
        if (!isEmpty(_arg_1)) {
            const t = tail(_arg_1);
            return cons(v, t);
        }
        else {
            const l = _arg_1;
            return l;
        }
    })];
}

/**
 * Prism to an indexed position in a list.
 */
export function Optics_List_pos_(i) {
    return [(_arg) => {
        let l;
        if ((l = _arg, length(l) > i)) {
            const l_1 = _arg;
            return some(item(i, l_1));
        }
        else {
            return void 0;
        }
    }, (v) => ((l_2) => mapIndexed((i$0027, x) => ((i === i$0027) ? v : x), l_2))];
}

/**
 * Prism to the tail of a list.
 */
export function Optics_List_tail_() {
    return [(_arg) => {
        if (!isEmpty(_arg)) {
            const t = tail(_arg);
            return t;
        }
        else {
            return void 0;
        }
    }, (t_1) => ((_arg_1) => {
        if (isEmpty(_arg_1)) {
            return empty();
        }
        else {
            const h = head(_arg_1);
            return cons(h, t_1);
        }
    })];
}

/**
 * Isomorphism to an array.
 */
export function Optics_List_array_() {
    return [toArray, ofArray];
}

/**
 * Weak Isomorphism to an array of key-value pairs.
 */
export function Optics_Map_array_() {
    return [toArray_1, (elements) => ofArray_1(elements, {
        Compare: compare,
    })];
}

/**
 * Weak Isomorphism to a list of key-value pairs.
 */
export function Optics_Map_list_() {
    return [toList, (elements) => ofList(elements, {
        Compare: compare,
    })];
}

/**
 * Prism to the value in an Option.
 */
export function Optics_Option_value_() {
    return [(x) => x, (v) => ((_arg) => ((_arg == null) ? void 0 : some(v)))];
}

//# sourceMappingURL=Optics.fs.js.map
