import { tryFind, allPairs, iterate, map, length, ofArray } from "../fable_modules/fable-library.4.1.4/List.js";
import { toConsole, join, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { Record, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { record_type, string_type, union_type, option_type, int32_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { toList } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.1.4/Range.js";
import { equals } from "../fable_modules/fable-library.4.1.4/Util.js";

export const VERSION = ofArray(["4", "1", "2"]);

export const VersionString = ((length(VERSION) < 3) ? toFail(printf("Badly formatted version %A (VERSION must be list of 3 or more strings)"))(VERSION) : void 0, "v" + join(".", map((i) => i, VERSION)));

export class TestDU_ComponentType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Input", "Input1", "Output", "Viewer", "IOLabel", "NotConnected"];
    }
}

export function TestDU_ComponentType_$reflection() {
    return union_type("Version.TestDU.ComponentType", [], TestDU_ComponentType, () => [[["BusWidth", int32_type], ["DefaultValue", option_type(int32_type)]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [["BusWidth", int32_type]], [], []]);
}

export class TestDU_Component extends Record {
    constructor(Id, Type) {
        super();
        this.Id = Id;
        this.Type = Type;
    }
}

export function TestDU_Component_$reflection() {
    return record_type("Version.TestDU.Component", [], TestDU_Component, () => [["Id", string_type], ["Type", TestDU_ComponentType_$reflection()]]);
}

export function TestDU_makeDummyComponents() {
    return map((n) => (new TestDU_Component(`${n}`, new TestDU_ComponentType(5, []))), toList(rangeDouble(1, 1, 2)));
}

export function TestDU_testDUEquality() {
    const testCases = ofArray([new TestDU_ComponentType(5, []), new TestDU_ComponentType(0, [1, 1]), new TestDU_ComponentType(0, [0, 0])]);
    iterate((tupledArg) => {
        const a = tupledArg[0];
        const b = tupledArg[1];
        toConsole(`a=${a}, b=${b}, a=b=${equals(a, b)}`);
    }, allPairs(testCases, testCases));
    const comps = TestDU_makeDummyComponents();
    toConsole(`
Dummy components are ${comps}
`);
    const checkCompsForId = (id) => {
        let _arg;
        toConsole(`checking: id=${id} ->  Found = ${(_arg = tryFind((comp) => {
            if (comp.Id === id) {
                return equals(comp.Type, new TestDU_ComponentType(5, []));
            }
            else {
                return false;
            }
        }, comps), !(_arg == null))}`);
    };
    checkCompsForId("1");
    checkCompsForId("2");
    checkCompsForId("3");
}

//# sourceMappingURL=Version.fs.js.map
