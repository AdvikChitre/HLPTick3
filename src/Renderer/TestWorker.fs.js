import { getInterval, getTimeMs } from "./Common/TimeHelpers.fs.js";
import { defaultOf, disposeSafe, getEnumerator } from "./fable_modules/fable-library.4.1.4/Util.js";
import { toList } from "./fable_modules/fable-library.4.1.4/Seq.js";
import { rangeDouble } from "./fable_modules/fable-library.4.1.4/Range.js";

export function testFn(msg) {
    const start = getTimeMs();
    if (msg.data === "long") {
        const enumerator = getEnumerator(toList(rangeDouble(1, 1, 10000000)));
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                const i = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]() | 0;
                ~~(i / 2);
            }
        }
        finally {
            disposeSafe(enumerator);
        }
    }
    else {
        defaultOf();
    }
    const a = getInterval(start) / 1000;
    self.postMessage(a);
    return close();
}

onmessage = (testFn);

//# sourceMappingURL=TestWorker.fs.js.map
