import { defaultArg } from "../fable_modules/fable-library.4.1.4/Option.js";
import * as electron from "electron";

/**
 * bool Option -> bool, with None -> false
 */
export function jsToBool(b) {
    return defaultArg(b, false);
}

export const Electron_electron = electron;

export const Electron_mainProcess = electron;

//# sourceMappingURL=ElectronAPI.fs.js.map
