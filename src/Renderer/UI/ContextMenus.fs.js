import { ofSeq, toArray, empty, singleton, ofArray } from "../fable_modules/fable-library.4.1.4/List.js";
import { keys, tryFind, ofList } from "../fable_modules/fable-library.4.1.4/Map.js";
import { comparePrimitives } from "../fable_modules/fable-library.4.1.4/Util.js";
import { some } from "../fable_modules/fable-library.4.1.4/Option.js";
import { printf, toConsole } from "../fable_modules/fable-library.4.1.4/String.js";
import { map } from "../fable_modules/fable-library.4.1.4/Array.js";
import { Electron_mainProcess } from "../Common/ElectronAPI.fs.js";

export const contextMenus = ofArray([["SheetMenuBreadcrumbDev", ofArray(["Rename", "Delete", "Lock", "Unlock", "Lock Subtree", "Unlock Subtree"])], ["SheetMenuBreadcrumb", ofArray(["Rename", "Delete"])], ["CustomComponent", ofArray(["Go to sheet", "Properties"])], ["ScalingBox", ofArray(["Rotate Clockwise (Ctrl+Right)", "Rotate AntiClockwise (Ctrl+Left)", "Flip Vertical (Ctrl+Up)", "Flip Horizontal (Ctrl+Down)", "Delete Box (DEL)", "Copy Box (Ctrl+C)", "Move Box (Drag any component)"])], ["Component", ofArray(["Rotate Clockwise (Ctrl+Right)", "Rotate AntiClockwise (Ctrl+Left)", "Flip Vertical (Ctrl+Up)", "Flip Horizontal (Ctrl+Down)", "Delete (DEL)", "Copy (Ctrl+C)", "Properties"])], ["Canvas", ofArray(["Zoom-in (Alt+Up) and centre", "Zoom-out (Alt+Down)", "Fit to window (Ctrl+W)", "Paste (Ctrl+V)", "Reroute all wires", "Properties"])], ["Wire", singleton("Unfix Wire")], ["WaveSimHelp", ofArray(["Waveform and RAM selection", "Waveform Operations", "Miscellaneous"])], ["", empty()]]);

export const menuMap = ofList(contextMenus, {
    Compare: comparePrimitives,
});

/**
 * function used to implement main process
 * context menu items. It should not be changed.
 */
export function makeClickableReturner(dispatchToRenderer, ev, _arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const s = _arg[1];
    const menuType = _arg[0];
    return {
        click: (_arg_1) => {
            ev.preventDefault();
            dispatchToRenderer([menuType, s]);
            return ev;
        },
        label: (some)(s),
    };
}

/**
 * Function implements main process context menus
 * it is called in main.fs from the renderer contextmenu event.
 * to change which menu is called where alter UpdateHelpers.chooseContextMenu
 */
export function makeMenu(window$, dispatchToRenderer, args) {
    let _arg, cases, arg;
    const menuType = args;
    const cases_1 = toArray((_arg = tryFind(menuType, menuMap), (_arg != null) ? ((cases = _arg, cases)) : (((arg = (`Error: '${menuType}' must be a valid menu name: one of ${ofSeq(keys(menuMap))}`), toConsole(printf("%s"))(arg)), singleton("unknown_menu")))));
    return (ev) => {
        if (menuType !== "") {
            const template = map((arg_1) => arg_1, map((s) => makeClickableReturner(dispatchToRenderer, ev, menuType, s), cases_1));
            const menu = Electron_mainProcess.Menu.buildFromTemplate(template);
            const popupOptions = {
                window: window$,
            };
            const value = menu.popup(popupOptions);
        }
    };
}

//# sourceMappingURL=ContextMenus.fs.js.map
