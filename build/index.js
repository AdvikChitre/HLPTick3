/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Renderer/Common/ElectronAPI.fs.js":
/*!***********************************************!*\
  !*** ./src/Renderer/Common/ElectronAPI.fs.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Electron_electron": () => (/* binding */ Electron_electron),
/* harmony export */   "Electron_mainProcess": () => (/* binding */ Electron_mainProcess),
/* harmony export */   "jsToBool": () => (/* binding */ jsToBool)
/* harmony export */ });
/* harmony import */ var _fable_modules_fable_library_4_1_4_Option_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fable_modules/fable-library.4.1.4/Option.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Option.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);



/**
 * bool Option -> bool, with None -> false
 */
function jsToBool(b) {
  return (0,_fable_modules_fable_library_4_1_4_Option_js__WEBPACK_IMPORTED_MODULE_1__.defaultArg)(b, false);
}
const Electron_electron = electron__WEBPACK_IMPORTED_MODULE_0__;
const Electron_mainProcess = electron__WEBPACK_IMPORTED_MODULE_0__;

/***/ }),

/***/ "./src/Renderer/UI/ContextMenus.fs.js":
/*!********************************************!*\
  !*** ./src/Renderer/UI/ContextMenus.fs.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "contextMenus": () => (/* binding */ contextMenus),
/* harmony export */   "makeClickableReturner": () => (/* binding */ makeClickableReturner),
/* harmony export */   "makeMenu": () => (/* binding */ makeMenu),
/* harmony export */   "menuMap": () => (/* binding */ menuMap)
/* harmony export */ });
/* harmony import */ var _fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fable_modules/fable-library.4.1.4/List.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/List.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_Map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fable_modules/fable-library.4.1.4/Map.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Map.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_Util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fable_modules/fable-library.4.1.4/Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_Option_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fable_modules/fable-library.4.1.4/Option.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Option.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../fable_modules/fable-library.4.1.4/String.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/String.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_Array_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../fable_modules/fable-library.4.1.4/Array.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Array.js");
/* harmony import */ var _Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common/ElectronAPI.fs.js */ "./src/Renderer/Common/ElectronAPI.fs.js");







const contextMenus = (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.ofArray)([["SheetMenuBreadcrumbDev", (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.ofArray)(["Rename", "Delete", "Lock", "Unlock", "Lock Subtree", "Unlock Subtree"])], ["SheetMenuBreadcrumb", (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.ofArray)(["Rename", "Delete"])], ["CustomComponent", (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.ofArray)(["Go to sheet", "Properties"])], ["ScalingBox", (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.ofArray)(["Rotate Clockwise (Ctrl+Right)", "Rotate AntiClockwise (Ctrl+Left)", "Flip Vertical (Ctrl+Up)", "Flip Horizontal (Ctrl+Down)", "Delete Box (DEL)", "Copy Box (Ctrl+C)", "Move Box (Drag any component)"])], ["Component", (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.ofArray)(["Rotate Clockwise (Ctrl+Right)", "Rotate AntiClockwise (Ctrl+Left)", "Flip Vertical (Ctrl+Up)", "Flip Horizontal (Ctrl+Down)", "Delete (DEL)", "Copy (Ctrl+C)", "Properties"])], ["Canvas", (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.ofArray)(["Zoom-in (Alt+Up) and centre", "Zoom-out (Alt+Down)", "Fit to window (Ctrl+W)", "Paste (Ctrl+V)", "Reroute all wires", "Properties"])], ["Wire", (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.singleton)("Unfix Wire")], ["WaveSimHelp", (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.ofArray)(["Waveform and RAM selection", "Waveform Operations", "Miscellaneous"])], ["", (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.empty)()]]);
const menuMap = (0,_fable_modules_fable_library_4_1_4_Map_js__WEBPACK_IMPORTED_MODULE_2__.ofList)(contextMenus, {
  Compare: _fable_modules_fable_library_4_1_4_Util_js__WEBPACK_IMPORTED_MODULE_3__.comparePrimitives
});

/**
 * function used to implement main process
 * context menu items. It should not be changed.
 */
function makeClickableReturner(dispatchToRenderer, ev, _arg1_, _arg1__1) {
  const _arg = [_arg1_, _arg1__1];
  const s = _arg[1];
  const menuType = _arg[0];
  return {
    click: _arg_1 => {
      ev.preventDefault();
      dispatchToRenderer([menuType, s]);
      return ev;
    },
    label: (0,_fable_modules_fable_library_4_1_4_Option_js__WEBPACK_IMPORTED_MODULE_4__.some)(s)
  };
}

/**
 * Function implements main process context menus
 * it is called in main.fs from the renderer contextmenu event.
 * to change which menu is called where alter UpdateHelpers.chooseContextMenu
 */
function makeMenu(window$, dispatchToRenderer, args) {
  let _arg, cases, arg;
  const menuType = args;
  const cases_1 = (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.toArray)((_arg = (0,_fable_modules_fable_library_4_1_4_Map_js__WEBPACK_IMPORTED_MODULE_2__.tryFind)(menuType, menuMap), _arg != null ? (cases = _arg, cases) : ((arg = `Error: '${menuType}' must be a valid menu name: one of ${(0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.ofSeq)((0,_fable_modules_fable_library_4_1_4_Map_js__WEBPACK_IMPORTED_MODULE_2__.keys)(menuMap))}`, (0,_fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_5__.toConsole)((0,_fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_5__.printf)("%s"))(arg)), (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_1__.singleton)("unknown_menu"))));
  return ev => {
    if (menuType !== "") {
      const template = (0,_fable_modules_fable_library_4_1_4_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(arg_1 => arg_1, (0,_fable_modules_fable_library_4_1_4_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(s => makeClickableReturner(dispatchToRenderer, ev, menuType, s), cases_1));
      const menu = _Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.Menu.buildFromTemplate(template);
      const popupOptions = {
        window: window$
      };
      const value = menu.popup(popupOptions);
    }
  };
}

/***/ }),

/***/ "./node_modules/@electron/remote/dist/src/common/get-electron-binding.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@electron/remote/dist/src/common/get-electron-binding.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getElectronBinding = void 0;
const getElectronBinding = (name) => {
    if (process._linkedBinding) {
        return process._linkedBinding('electron_common_' + name);
    }
    else if (process.electronBinding) {
        return process.electronBinding(name);
    }
    else {
        return null;
    }
};
exports.getElectronBinding = getElectronBinding;


/***/ }),

/***/ "./node_modules/@electron/remote/dist/src/common/type-utils.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@electron/remote/dist/src/common/type-utils.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deserialize = exports.serialize = exports.isSerializableObject = exports.isPromise = void 0;
const electron_1 = __webpack_require__(/*! electron */ "electron");
function isPromise(val) {
    return (val &&
        val.then &&
        val.then instanceof Function &&
        val.constructor &&
        val.constructor.reject &&
        val.constructor.reject instanceof Function &&
        val.constructor.resolve &&
        val.constructor.resolve instanceof Function);
}
exports.isPromise = isPromise;
const serializableTypes = [
    Boolean,
    Number,
    String,
    Date,
    Error,
    RegExp,
    ArrayBuffer
];
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#Supported_types
function isSerializableObject(value) {
    return value === null || ArrayBuffer.isView(value) || serializableTypes.some(type => value instanceof type);
}
exports.isSerializableObject = isSerializableObject;
const objectMap = function (source, mapper) {
    const sourceEntries = Object.entries(source);
    const targetEntries = sourceEntries.map(([key, val]) => [key, mapper(val)]);
    return Object.fromEntries(targetEntries);
};
function serializeNativeImage(image) {
    const representations = [];
    const scaleFactors = image.getScaleFactors();
    // Use Buffer when there's only one representation for better perf.
    // This avoids compressing to/from PNG where it's not necessary to
    // ensure uniqueness of dataURLs (since there's only one).
    if (scaleFactors.length === 1) {
        const scaleFactor = scaleFactors[0];
        const size = image.getSize(scaleFactor);
        const buffer = image.toBitmap({ scaleFactor });
        representations.push({ scaleFactor, size, buffer });
    }
    else {
        // Construct from dataURLs to ensure that they are not lost in creation.
        for (const scaleFactor of scaleFactors) {
            const size = image.getSize(scaleFactor);
            const dataURL = image.toDataURL({ scaleFactor });
            representations.push({ scaleFactor, size, dataURL });
        }
    }
    return { __ELECTRON_SERIALIZED_NativeImage__: true, representations };
}
function deserializeNativeImage(value) {
    const image = electron_1.nativeImage.createEmpty();
    // Use Buffer when there's only one representation for better perf.
    // This avoids compressing to/from PNG where it's not necessary to
    // ensure uniqueness of dataURLs (since there's only one).
    if (value.representations.length === 1) {
        const { buffer, size, scaleFactor } = value.representations[0];
        const { width, height } = size;
        image.addRepresentation({ buffer, scaleFactor, width, height });
    }
    else {
        // Construct from dataURLs to ensure that they are not lost in creation.
        for (const rep of value.representations) {
            const { dataURL, size, scaleFactor } = rep;
            const { width, height } = size;
            image.addRepresentation({ dataURL, scaleFactor, width, height });
        }
    }
    return image;
}
function serialize(value) {
    if (value && value.constructor && value.constructor.name === 'NativeImage') {
        return serializeNativeImage(value);
    }
    if (Array.isArray(value)) {
        return value.map(serialize);
    }
    else if (isSerializableObject(value)) {
        return value;
    }
    else if (value instanceof Object) {
        return objectMap(value, serialize);
    }
    else {
        return value;
    }
}
exports.serialize = serialize;
function deserialize(value) {
    if (value && value.__ELECTRON_SERIALIZED_NativeImage__) {
        return deserializeNativeImage(value);
    }
    else if (Array.isArray(value)) {
        return value.map(deserialize);
    }
    else if (isSerializableObject(value)) {
        return value;
    }
    else if (value instanceof Object) {
        return objectMap(value, deserialize);
    }
    else {
        return value;
    }
}
exports.deserialize = deserialize;


/***/ }),

/***/ "./node_modules/@electron/remote/dist/src/main/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@electron/remote/dist/src/main/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enable = exports.initialize = void 0;
var server_1 = __webpack_require__(/*! ./server */ "./node_modules/@electron/remote/dist/src/main/server.js");
Object.defineProperty(exports, "initialize", ({ enumerable: true, get: function () { return server_1.initialize; } }));
Object.defineProperty(exports, "enable", ({ enumerable: true, get: function () { return server_1.enable; } }));


/***/ }),

/***/ "./node_modules/@electron/remote/dist/src/main/objects-registry.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@electron/remote/dist/src/main/objects-registry.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const getOwnerKey = (webContents, contextId) => {
    return `${webContents.id}-${contextId}`;
};
class ObjectsRegistry {
    constructor() {
        this.nextId = 0;
        // Stores all objects by ref-counting.
        // (id) => {object, count}
        this.storage = {};
        // Stores the IDs + refCounts of objects referenced by WebContents.
        // (ownerKey) => { id: refCount }
        this.owners = {};
        this.electronIds = new WeakMap();
    }
    // Register a new object and return its assigned ID. If the object is already
    // registered then the already assigned ID would be returned.
    add(webContents, contextId, obj) {
        // Get or assign an ID to the object.
        const id = this.saveToStorage(obj);
        // Add object to the set of referenced objects.
        const ownerKey = getOwnerKey(webContents, contextId);
        let owner = this.owners[ownerKey];
        if (!owner) {
            owner = this.owners[ownerKey] = new Map();
            this.registerDeleteListener(webContents, contextId);
        }
        if (!owner.has(id)) {
            owner.set(id, 0);
            // Increase reference count if not referenced before.
            this.storage[id].count++;
        }
        owner.set(id, owner.get(id) + 1);
        return id;
    }
    // Get an object according to its ID.
    get(id) {
        const pointer = this.storage[id];
        if (pointer != null)
            return pointer.object;
    }
    // Dereference an object according to its ID.
    // Note that an object may be double-freed (cleared when page is reloaded, and
    // then garbage collected in old page).
    remove(webContents, contextId, id) {
        const ownerKey = getOwnerKey(webContents, contextId);
        const owner = this.owners[ownerKey];
        if (owner && owner.has(id)) {
            const newRefCount = owner.get(id) - 1;
            // Only completely remove if the number of references GCed in the
            // renderer is the same as the number of references we sent them
            if (newRefCount <= 0) {
                // Remove the reference in owner.
                owner.delete(id);
                // Dereference from the storage.
                this.dereference(id);
            }
            else {
                owner.set(id, newRefCount);
            }
        }
    }
    // Clear all references to objects refrenced by the WebContents.
    clear(webContents, contextId) {
        const ownerKey = getOwnerKey(webContents, contextId);
        const owner = this.owners[ownerKey];
        if (!owner)
            return;
        for (const id of owner.keys())
            this.dereference(id);
        delete this.owners[ownerKey];
    }
    // Saves the object into storage and assigns an ID for it.
    saveToStorage(object) {
        let id = this.electronIds.get(object);
        if (!id) {
            id = ++this.nextId;
            this.storage[id] = {
                count: 0,
                object: object
            };
            this.electronIds.set(object, id);
        }
        return id;
    }
    // Dereference the object from store.
    dereference(id) {
        const pointer = this.storage[id];
        if (pointer == null) {
            return;
        }
        pointer.count -= 1;
        if (pointer.count === 0) {
            this.electronIds.delete(pointer.object);
            delete this.storage[id];
        }
    }
    // Clear the storage when renderer process is destroyed.
    registerDeleteListener(webContents, contextId) {
        // contextId => ${processHostId}-${contextCount}
        const processHostId = contextId.split('-')[0];
        const listener = (_, deletedProcessHostId) => {
            if (deletedProcessHostId &&
                deletedProcessHostId.toString() === processHostId) {
                webContents.removeListener('render-view-deleted', listener);
                this.clear(webContents, contextId);
            }
        };
        // Note that the "render-view-deleted" event may not be emitted on time when
        // the renderer process get destroyed because of navigation, we rely on the
        // renderer process to send "ELECTRON_BROWSER_CONTEXT_RELEASE" message to
        // guard this situation.
        webContents.on('render-view-deleted', listener);
    }
}
exports["default"] = new ObjectsRegistry();


/***/ }),

/***/ "./node_modules/@electron/remote/dist/src/main/server.js":
/*!***************************************************************!*\
  !*** ./node_modules/@electron/remote/dist/src/main/server.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initialize = exports.enable = exports.isRemoteModuleEnabled = void 0;
const events_1 = __webpack_require__(/*! events */ "events");
const objects_registry_1 = __importDefault(__webpack_require__(/*! ./objects-registry */ "./node_modules/@electron/remote/dist/src/main/objects-registry.js"));
const type_utils_1 = __webpack_require__(/*! ../common/type-utils */ "./node_modules/@electron/remote/dist/src/common/type-utils.js");
const electron_1 = __webpack_require__(/*! electron */ "electron");
const get_electron_binding_1 = __webpack_require__(/*! ../common/get-electron-binding */ "./node_modules/@electron/remote/dist/src/common/get-electron-binding.js");
const v8Util = get_electron_binding_1.getElectronBinding('v8_util');
const hasWebPrefsRemoteModuleAPI = (() => {
    var _a, _b;
    const electronVersion = Number((_b = (_a = process.versions.electron) === null || _a === void 0 ? void 0 : _a.split(".")) === null || _b === void 0 ? void 0 : _b[0]);
    return Number.isNaN(electronVersion) || electronVersion < 14;
})();
// The internal properties of Function.
const FUNCTION_PROPERTIES = [
    'length', 'name', 'arguments', 'caller', 'prototype'
];
// The remote functions in renderer processes.
const rendererFunctionCache = new Map();
// eslint-disable-next-line no-undef
const finalizationRegistry = new FinalizationRegistry((fi) => {
    const mapKey = fi.id[0] + '~' + fi.id[1];
    const ref = rendererFunctionCache.get(mapKey);
    if (ref !== undefined && ref.deref() === undefined) {
        rendererFunctionCache.delete(mapKey);
        if (!fi.webContents.isDestroyed()) {
            try {
                fi.webContents.sendToFrame(fi.frameId, "REMOTE_RENDERER_RELEASE_CALLBACK" /* RENDERER_RELEASE_CALLBACK */, fi.id[0], fi.id[1]);
            }
            catch (error) {
                console.warn(`sendToFrame() failed: ${error}`);
            }
        }
    }
});
function getCachedRendererFunction(id) {
    const mapKey = id[0] + '~' + id[1];
    const ref = rendererFunctionCache.get(mapKey);
    if (ref !== undefined) {
        const deref = ref.deref();
        if (deref !== undefined)
            return deref;
    }
}
function setCachedRendererFunction(id, wc, frameId, value) {
    // eslint-disable-next-line no-undef
    const wr = new WeakRef(value);
    const mapKey = id[0] + '~' + id[1];
    rendererFunctionCache.set(mapKey, wr);
    finalizationRegistry.register(value, {
        id,
        webContents: wc,
        frameId
    });
    return value;
}
const locationInfo = new WeakMap();
// Return the description of object's members:
const getObjectMembers = function (object) {
    let names = Object.getOwnPropertyNames(object);
    // For Function, we should not override following properties even though they
    // are "own" properties.
    if (typeof object === 'function') {
        names = names.filter((name) => {
            return !FUNCTION_PROPERTIES.includes(name);
        });
    }
    // Map properties to descriptors.
    return names.map((name) => {
        const descriptor = Object.getOwnPropertyDescriptor(object, name);
        let type;
        let writable = false;
        if (descriptor.get === undefined && typeof object[name] === 'function') {
            type = 'method';
        }
        else {
            if (descriptor.set || descriptor.writable)
                writable = true;
            type = 'get';
        }
        return { name, enumerable: descriptor.enumerable, writable, type };
    });
};
// Return the description of object's prototype.
const getObjectPrototype = function (object) {
    const proto = Object.getPrototypeOf(object);
    if (proto === null || proto === Object.prototype)
        return null;
    return {
        members: getObjectMembers(proto),
        proto: getObjectPrototype(proto)
    };
};
// Convert a real value into meta data.
const valueToMeta = function (sender, contextId, value, optimizeSimpleObject = false) {
    // Determine the type of value.
    let type;
    switch (typeof value) {
        case 'object':
            // Recognize certain types of objects.
            if (value instanceof Buffer) {
                type = 'buffer';
            }
            else if (value && value.constructor && value.constructor.name === 'NativeImage') {
                type = 'nativeimage';
            }
            else if (Array.isArray(value)) {
                type = 'array';
            }
            else if (value instanceof Error) {
                type = 'error';
            }
            else if (type_utils_1.isSerializableObject(value)) {
                type = 'value';
            }
            else if (type_utils_1.isPromise(value)) {
                type = 'promise';
            }
            else if (Object.prototype.hasOwnProperty.call(value, 'callee') && value.length != null) {
                // Treat the arguments object as array.
                type = 'array';
            }
            else if (optimizeSimpleObject && v8Util.getHiddenValue(value, 'simple')) {
                // Treat simple objects as value.
                type = 'value';
            }
            else {
                type = 'object';
            }
            break;
        case 'function':
            type = 'function';
            break;
        default:
            type = 'value';
            break;
    }
    // Fill the meta object according to value's type.
    if (type === 'array') {
        return {
            type,
            members: value.map((el) => valueToMeta(sender, contextId, el, optimizeSimpleObject))
        };
    }
    else if (type === 'nativeimage') {
        return { type, value: type_utils_1.serialize(value) };
    }
    else if (type === 'object' || type === 'function') {
        return {
            type,
            name: value.constructor ? value.constructor.name : '',
            // Reference the original value if it's an object, because when it's
            // passed to renderer we would assume the renderer keeps a reference of
            // it.
            id: objects_registry_1.default.add(sender, contextId, value),
            members: getObjectMembers(value),
            proto: getObjectPrototype(value)
        };
    }
    else if (type === 'buffer') {
        return { type, value };
    }
    else if (type === 'promise') {
        // Add default handler to prevent unhandled rejections in main process
        // Instead they should appear in the renderer process
        value.then(function () { }, function () { });
        return {
            type,
            then: valueToMeta(sender, contextId, function (onFulfilled, onRejected) {
                value.then(onFulfilled, onRejected);
            })
        };
    }
    else if (type === 'error') {
        return {
            type,
            value,
            members: Object.keys(value).map(name => ({
                name,
                value: valueToMeta(sender, contextId, value[name])
            }))
        };
    }
    else {
        return {
            type: 'value',
            value
        };
    }
};
const throwRPCError = function (message) {
    const error = new Error(message);
    error.code = 'EBADRPC';
    error.errno = -72;
    throw error;
};
const removeRemoteListenersAndLogWarning = (sender, callIntoRenderer) => {
    const location = locationInfo.get(callIntoRenderer);
    let message = 'Attempting to call a function in a renderer window that has been closed or released.' +
        `\nFunction provided here: ${location}`;
    if (sender instanceof events_1.EventEmitter) {
        const remoteEvents = sender.eventNames().filter((eventName) => {
            return sender.listeners(eventName).includes(callIntoRenderer);
        });
        if (remoteEvents.length > 0) {
            message += `\nRemote event names: ${remoteEvents.join(', ')}`;
            remoteEvents.forEach((eventName) => {
                sender.removeListener(eventName, callIntoRenderer);
            });
        }
    }
    console.warn(message);
};
const fakeConstructor = (constructor, name) => new Proxy(Object, {
    get(target, prop, receiver) {
        if (prop === 'name') {
            return name;
        }
        else {
            return Reflect.get(target, prop, receiver);
        }
    }
});
// Convert array of meta data from renderer into array of real values.
const unwrapArgs = function (sender, frameId, contextId, args) {
    const metaToValue = function (meta) {
        switch (meta.type) {
            case 'nativeimage':
                return type_utils_1.deserialize(meta.value);
            case 'value':
                return meta.value;
            case 'remote-object':
                return objects_registry_1.default.get(meta.id);
            case 'array':
                return unwrapArgs(sender, frameId, contextId, meta.value);
            case 'buffer':
                return Buffer.from(meta.value.buffer, meta.value.byteOffset, meta.value.byteLength);
            case 'promise':
                return Promise.resolve({
                    then: metaToValue(meta.then)
                });
            case 'object': {
                const ret = meta.name !== 'Object' ? Object.create({
                    constructor: fakeConstructor(Object, meta.name)
                }) : {};
                for (const { name, value } of meta.members) {
                    ret[name] = metaToValue(value);
                }
                return ret;
            }
            case 'function-with-return-value': {
                const returnValue = metaToValue(meta.value);
                return function () {
                    return returnValue;
                };
            }
            case 'function': {
                // Merge contextId and meta.id, since meta.id can be the same in
                // different webContents.
                const objectId = [contextId, meta.id];
                // Cache the callbacks in renderer.
                const cachedFunction = getCachedRendererFunction(objectId);
                if (cachedFunction !== undefined) {
                    return cachedFunction;
                }
                const callIntoRenderer = function (...args) {
                    let succeed = false;
                    if (!sender.isDestroyed()) {
                        try {
                            succeed = sender.sendToFrame(frameId, "REMOTE_RENDERER_CALLBACK" /* RENDERER_CALLBACK */, contextId, meta.id, valueToMeta(sender, contextId, args)) !== false;
                        }
                        catch (error) {
                            console.warn(`sendToFrame() failed: ${error}`);
                        }
                    }
                    if (!succeed) {
                        removeRemoteListenersAndLogWarning(this, callIntoRenderer);
                    }
                };
                locationInfo.set(callIntoRenderer, meta.location);
                Object.defineProperty(callIntoRenderer, 'length', { value: meta.length });
                setCachedRendererFunction(objectId, sender, frameId, callIntoRenderer);
                return callIntoRenderer;
            }
            default:
                throw new TypeError(`Unknown type: ${meta.type}`);
        }
    };
    return args.map(metaToValue);
};
const isRemoteModuleEnabledImpl = function (contents) {
    const webPreferences = contents.getLastWebPreferences() || {};
    return webPreferences.enableRemoteModule != null ? !!webPreferences.enableRemoteModule : false;
};
const isRemoteModuleEnabledCache = new WeakMap();
const isRemoteModuleEnabled = function (contents) {
    if (hasWebPrefsRemoteModuleAPI && !isRemoteModuleEnabledCache.has(contents)) {
        isRemoteModuleEnabledCache.set(contents, isRemoteModuleEnabledImpl(contents));
    }
    return isRemoteModuleEnabledCache.get(contents);
};
exports.isRemoteModuleEnabled = isRemoteModuleEnabled;
function enable(contents) {
    isRemoteModuleEnabledCache.set(contents, true);
}
exports.enable = enable;
const handleRemoteCommand = function (channel, handler) {
    electron_1.ipcMain.on(channel, (event, contextId, ...args) => {
        let returnValue;
        if (!exports.isRemoteModuleEnabled(event.sender)) {
            event.returnValue = {
                type: 'exception',
                value: valueToMeta(event.sender, contextId, new Error('@electron/remote is disabled for this WebContents. Call require("@electron/remote/main").enable(webContents) to enable it.'))
            };
            return;
        }
        try {
            returnValue = handler(event, contextId, ...args);
        }
        catch (error) {
            returnValue = {
                type: 'exception',
                value: valueToMeta(event.sender, contextId, error),
            };
        }
        if (returnValue !== undefined) {
            event.returnValue = returnValue;
        }
    });
};
const emitCustomEvent = function (contents, eventName, ...args) {
    const event = { sender: contents, returnValue: undefined, defaultPrevented: false };
    electron_1.app.emit(eventName, event, contents, ...args);
    contents.emit(eventName, event, ...args);
    return event;
};
const logStack = function (contents, code, stack) {
    if (stack) {
        console.warn(`WebContents (${contents.id}): ${code}`, stack);
    }
};
let initialized = false;
function initialize() {
    if (initialized)
        throw new Error('@electron/remote has already been initialized');
    initialized = true;
    handleRemoteCommand("REMOTE_BROWSER_WRONG_CONTEXT_ERROR" /* BROWSER_WRONG_CONTEXT_ERROR */, function (event, contextId, passedContextId, id) {
        const objectId = [passedContextId, id];
        const cachedFunction = getCachedRendererFunction(objectId);
        if (cachedFunction === undefined) {
            // Do nothing if the error has already been reported before.
            return;
        }
        removeRemoteListenersAndLogWarning(event.sender, cachedFunction);
    });
    handleRemoteCommand("REMOTE_BROWSER_REQUIRE" /* BROWSER_REQUIRE */, function (event, contextId, moduleName, stack) {
        logStack(event.sender, `remote.require('${moduleName}')`, stack);
        const customEvent = emitCustomEvent(event.sender, 'remote-require', moduleName);
        if (customEvent.returnValue === undefined) {
            if (customEvent.defaultPrevented) {
                throw new Error(`Blocked remote.require('${moduleName}')`);
            }
            else {
                customEvent.returnValue = process.mainModule.require(moduleName);
            }
        }
        return valueToMeta(event.sender, contextId, customEvent.returnValue);
    });
    handleRemoteCommand("REMOTE_BROWSER_GET_BUILTIN" /* BROWSER_GET_BUILTIN */, function (event, contextId, moduleName, stack) {
        logStack(event.sender, `remote.getBuiltin('${moduleName}')`, stack);
        const customEvent = emitCustomEvent(event.sender, 'remote-get-builtin', moduleName);
        if (customEvent.returnValue === undefined) {
            if (customEvent.defaultPrevented) {
                throw new Error(`Blocked remote.getBuiltin('${moduleName}')`);
            }
            else {
                customEvent.returnValue = __webpack_require__(/*! electron */ "electron")[moduleName];
            }
        }
        return valueToMeta(event.sender, contextId, customEvent.returnValue);
    });
    handleRemoteCommand("REMOTE_BROWSER_GET_GLOBAL" /* BROWSER_GET_GLOBAL */, function (event, contextId, globalName, stack) {
        logStack(event.sender, `remote.getGlobal('${globalName}')`, stack);
        const customEvent = emitCustomEvent(event.sender, 'remote-get-global', globalName);
        if (customEvent.returnValue === undefined) {
            if (customEvent.defaultPrevented) {
                throw new Error(`Blocked remote.getGlobal('${globalName}')`);
            }
            else {
                customEvent.returnValue = global[globalName];
            }
        }
        return valueToMeta(event.sender, contextId, customEvent.returnValue);
    });
    handleRemoteCommand("REMOTE_BROWSER_GET_CURRENT_WINDOW" /* BROWSER_GET_CURRENT_WINDOW */, function (event, contextId, stack) {
        logStack(event.sender, 'remote.getCurrentWindow()', stack);
        const customEvent = emitCustomEvent(event.sender, 'remote-get-current-window');
        if (customEvent.returnValue === undefined) {
            if (customEvent.defaultPrevented) {
                throw new Error('Blocked remote.getCurrentWindow()');
            }
            else {
                customEvent.returnValue = event.sender.getOwnerBrowserWindow();
            }
        }
        return valueToMeta(event.sender, contextId, customEvent.returnValue);
    });
    handleRemoteCommand("REMOTE_BROWSER_GET_CURRENT_WEB_CONTENTS" /* BROWSER_GET_CURRENT_WEB_CONTENTS */, function (event, contextId, stack) {
        logStack(event.sender, 'remote.getCurrentWebContents()', stack);
        const customEvent = emitCustomEvent(event.sender, 'remote-get-current-web-contents');
        if (customEvent.returnValue === undefined) {
            if (customEvent.defaultPrevented) {
                throw new Error('Blocked remote.getCurrentWebContents()');
            }
            else {
                customEvent.returnValue = event.sender;
            }
        }
        return valueToMeta(event.sender, contextId, customEvent.returnValue);
    });
    handleRemoteCommand("REMOTE_BROWSER_CONSTRUCTOR" /* BROWSER_CONSTRUCTOR */, function (event, contextId, id, args) {
        args = unwrapArgs(event.sender, event.frameId, contextId, args);
        const constructor = objects_registry_1.default.get(id);
        if (constructor == null) {
            throwRPCError(`Cannot call constructor on missing remote object ${id}`);
        }
        return valueToMeta(event.sender, contextId, new constructor(...args));
    });
    handleRemoteCommand("REMOTE_BROWSER_FUNCTION_CALL" /* BROWSER_FUNCTION_CALL */, function (event, contextId, id, args) {
        args = unwrapArgs(event.sender, event.frameId, contextId, args);
        const func = objects_registry_1.default.get(id);
        if (func == null) {
            throwRPCError(`Cannot call function on missing remote object ${id}`);
        }
        try {
            return valueToMeta(event.sender, contextId, func(...args), true);
        }
        catch (error) {
            const err = new Error(`Could not call remote function '${func.name || "anonymous"}'. Check that the function signature is correct. Underlying error: ${error}\n` +
                (error instanceof Error ? `Underlying stack: ${error.stack}\n` : ""));
            err.cause = error;
            throw err;
        }
    });
    handleRemoteCommand("REMOTE_BROWSER_MEMBER_CONSTRUCTOR" /* BROWSER_MEMBER_CONSTRUCTOR */, function (event, contextId, id, method, args) {
        args = unwrapArgs(event.sender, event.frameId, contextId, args);
        const object = objects_registry_1.default.get(id);
        if (object == null) {
            throwRPCError(`Cannot call constructor '${method}' on missing remote object ${id}`);
        }
        return valueToMeta(event.sender, contextId, new object[method](...args));
    });
    handleRemoteCommand("REMOTE_BROWSER_MEMBER_CALL" /* BROWSER_MEMBER_CALL */, function (event, contextId, id, method, args) {
        args = unwrapArgs(event.sender, event.frameId, contextId, args);
        const object = objects_registry_1.default.get(id);
        if (object == null) {
            throwRPCError(`Cannot call method '${method}' on missing remote object ${id}`);
        }
        try {
            return valueToMeta(event.sender, contextId, object[method](...args), true);
        }
        catch (error) {
            const err = new Error(`Could not call remote method '${method}'. Check that the method signature is correct. Underlying error: ${error}` +
                (error instanceof Error ? `Underlying stack: ${error.stack}\n` : ""));
            err.cause = error;
            throw err;
        }
    });
    handleRemoteCommand("REMOTE_BROWSER_MEMBER_SET" /* BROWSER_MEMBER_SET */, function (event, contextId, id, name, args) {
        args = unwrapArgs(event.sender, event.frameId, contextId, args);
        const obj = objects_registry_1.default.get(id);
        if (obj == null) {
            throwRPCError(`Cannot set property '${name}' on missing remote object ${id}`);
        }
        obj[name] = args[0];
        return null;
    });
    handleRemoteCommand("REMOTE_BROWSER_MEMBER_GET" /* BROWSER_MEMBER_GET */, function (event, contextId, id, name) {
        const obj = objects_registry_1.default.get(id);
        if (obj == null) {
            throwRPCError(`Cannot get property '${name}' on missing remote object ${id}`);
        }
        return valueToMeta(event.sender, contextId, obj[name]);
    });
    handleRemoteCommand("REMOTE_BROWSER_DEREFERENCE" /* BROWSER_DEREFERENCE */, function (event, contextId, id) {
        objects_registry_1.default.remove(event.sender, contextId, id);
    });
    handleRemoteCommand("REMOTE_BROWSER_CONTEXT_RELEASE" /* BROWSER_CONTEXT_RELEASE */, (event, contextId) => {
        objects_registry_1.default.clear(event.sender, contextId);
        return null;
    });
}
exports.initialize = initialize;


/***/ }),

/***/ "./node_modules/@electron/remote/main/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@electron/remote/main/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ../dist/src/main */ "./node_modules/@electron/remote/dist/src/main/index.js")


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Array.js":
/*!*************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Array.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addInPlace": () => (/* binding */ addInPlace),
/* harmony export */   "addRangeInPlace": () => (/* binding */ addRangeInPlace),
/* harmony export */   "allPairs": () => (/* binding */ allPairs),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "average": () => (/* binding */ average),
/* harmony export */   "averageBy": () => (/* binding */ averageBy),
/* harmony export */   "choose": () => (/* binding */ choose),
/* harmony export */   "chunkBySize": () => (/* binding */ chunkBySize),
/* harmony export */   "collect": () => (/* binding */ collect),
/* harmony export */   "compareTo": () => (/* binding */ compareTo),
/* harmony export */   "compareWith": () => (/* binding */ compareWith),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "contains": () => (/* binding */ contains),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "copyTo": () => (/* binding */ copyTo),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "equalsWith": () => (/* binding */ equalsWith),
/* harmony export */   "exactlyOne": () => (/* binding */ exactlyOne),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "exists2": () => (/* binding */ exists2),
/* harmony export */   "existsOffset": () => (/* binding */ existsOffset),
/* harmony export */   "existsOffset2": () => (/* binding */ existsOffset2),
/* harmony export */   "fill": () => (/* binding */ fill),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findBack": () => (/* binding */ findBack),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "findIndexBack": () => (/* binding */ findIndexBack),
/* harmony export */   "findLastIndex": () => (/* binding */ findLastIndex),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "fold2": () => (/* binding */ fold2),
/* harmony export */   "foldBack": () => (/* binding */ foldBack),
/* harmony export */   "foldBack2": () => (/* binding */ foldBack2),
/* harmony export */   "foldBackIndexed": () => (/* binding */ foldBackIndexed),
/* harmony export */   "foldBackIndexed2": () => (/* binding */ foldBackIndexed2),
/* harmony export */   "foldIndexed": () => (/* binding */ foldIndexed),
/* harmony export */   "foldIndexed2": () => (/* binding */ foldIndexed2),
/* harmony export */   "forAll": () => (/* binding */ forAll),
/* harmony export */   "forAll2": () => (/* binding */ forAll2),
/* harmony export */   "getSubArray": () => (/* binding */ getSubArray),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "indexOf": () => (/* binding */ indexOf),
/* harmony export */   "indexed": () => (/* binding */ indexed),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "insertAt": () => (/* binding */ insertAt),
/* harmony export */   "insertManyAt": () => (/* binding */ insertManyAt),
/* harmony export */   "insertRangeInPlace": () => (/* binding */ insertRangeInPlace),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "item": () => (/* binding */ item),
/* harmony export */   "iterate": () => (/* binding */ iterate),
/* harmony export */   "iterate2": () => (/* binding */ iterate2),
/* harmony export */   "iterateIndexed": () => (/* binding */ iterateIndexed),
/* harmony export */   "iterateIndexed2": () => (/* binding */ iterateIndexed2),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "map2": () => (/* binding */ map2),
/* harmony export */   "map3": () => (/* binding */ map3),
/* harmony export */   "mapFold": () => (/* binding */ mapFold),
/* harmony export */   "mapFoldBack": () => (/* binding */ mapFoldBack),
/* harmony export */   "mapIndexed": () => (/* binding */ mapIndexed),
/* harmony export */   "mapIndexed2": () => (/* binding */ mapIndexed2),
/* harmony export */   "mapIndexed3": () => (/* binding */ mapIndexed3),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxBy": () => (/* binding */ maxBy),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minBy": () => (/* binding */ minBy),
/* harmony export */   "pairwise": () => (/* binding */ pairwise),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "permute": () => (/* binding */ permute),
/* harmony export */   "pick": () => (/* binding */ pick),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceBack": () => (/* binding */ reduceBack),
/* harmony export */   "removeAllInPlace": () => (/* binding */ removeAllInPlace),
/* harmony export */   "removeAt": () => (/* binding */ removeAt),
/* harmony export */   "removeInPlace": () => (/* binding */ removeInPlace),
/* harmony export */   "removeManyAt": () => (/* binding */ removeManyAt),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "scan": () => (/* binding */ scan),
/* harmony export */   "scanBack": () => (/* binding */ scanBack),
/* harmony export */   "setSlice": () => (/* binding */ setSlice),
/* harmony export */   "singleton": () => (/* binding */ singleton),
/* harmony export */   "skip": () => (/* binding */ skip),
/* harmony export */   "skipWhile": () => (/* binding */ skipWhile),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "sortByDescending": () => (/* binding */ sortByDescending),
/* harmony export */   "sortDescending": () => (/* binding */ sortDescending),
/* harmony export */   "sortInPlace": () => (/* binding */ sortInPlace),
/* harmony export */   "sortInPlaceBy": () => (/* binding */ sortInPlaceBy),
/* harmony export */   "sortWith": () => (/* binding */ sortWith),
/* harmony export */   "splitAt": () => (/* binding */ splitAt),
/* harmony export */   "splitInto": () => (/* binding */ splitInto),
/* harmony export */   "sum": () => (/* binding */ sum),
/* harmony export */   "sumBy": () => (/* binding */ sumBy),
/* harmony export */   "tail": () => (/* binding */ tail),
/* harmony export */   "take": () => (/* binding */ take),
/* harmony export */   "takeWhile": () => (/* binding */ takeWhile),
/* harmony export */   "transpose": () => (/* binding */ transpose),
/* harmony export */   "truncate": () => (/* binding */ truncate),
/* harmony export */   "tryExactlyOne": () => (/* binding */ tryExactlyOne),
/* harmony export */   "tryFind": () => (/* binding */ tryFind),
/* harmony export */   "tryFindBack": () => (/* binding */ tryFindBack),
/* harmony export */   "tryFindIndex": () => (/* binding */ tryFindIndex),
/* harmony export */   "tryFindIndexBack": () => (/* binding */ tryFindIndexBack),
/* harmony export */   "tryHead": () => (/* binding */ tryHead),
/* harmony export */   "tryItem": () => (/* binding */ tryItem),
/* harmony export */   "tryLast": () => (/* binding */ tryLast),
/* harmony export */   "tryPick": () => (/* binding */ tryPick),
/* harmony export */   "unfold": () => (/* binding */ unfold),
/* harmony export */   "unzip": () => (/* binding */ unzip),
/* harmony export */   "unzip3": () => (/* binding */ unzip3),
/* harmony export */   "updateAt": () => (/* binding */ updateAt),
/* harmony export */   "where": () => (/* binding */ where),
/* harmony export */   "windowed": () => (/* binding */ windowed),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "zip3": () => (/* binding */ zip3)
/* harmony export */ });
/* harmony import */ var _Native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Native.js */ "./src/Main/fable_modules/fable-library.4.1.4/Native.js");
/* harmony import */ var _Option_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Option.js */ "./src/Main/fable_modules/fable-library.4.1.4/Option.js");
/* harmony import */ var _Double_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Double.js */ "./src/Main/fable_modules/fable-library.4.1.4/Double.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Global.js */ "./src/Main/fable_modules/fable-library.4.1.4/Global.js");





function indexNotFound() {
  throw new Error("An index satisfying the predicate was not found in the collection.");
}
function differentLengths() {
  throw new Error("Arrays had different lengths");
}
function append(array1, array2, cons) {
  const len1 = array1.length | 0;
  const len2 = array2.length | 0;
  const newArray = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len1 + len2);
  for (let i = 0; i <= len1 - 1; i++) {
    newArray[i] = array1[i];
  }
  for (let i_1 = 0; i_1 <= len2 - 1; i_1++) {
    newArray[i_1 + len1] = array2[i_1];
  }
  return newArray;
}
function filter(predicate, array) {
  return array.filter(predicate);
}
function fill(target, targetIndex, count, value) {
  const start = targetIndex | 0;
  return target.fill(value, start, start + count);
}
function getSubArray(array, start, count) {
  const start_1 = start | 0;
  return array.slice(start_1, start_1 + count);
}
function last(array) {
  if (array.length === 0) {
    throw new Error("The input array was empty\\nParameter name: array");
  }
  return array[array.length - 1];
}
function tryLast(array) {
  if (array.length === 0) {
    return void 0;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(array[array.length - 1]);
  }
}
function mapIndexed(f, source, cons) {
  const len = source.length | 0;
  const target = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
  for (let i = 0; i <= len - 1; i++) {
    target[i] = f(i, source[i]);
  }
  return target;
}
function map(f, source, cons) {
  const len = source.length | 0;
  const target = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
  for (let i = 0; i <= len - 1; i++) {
    target[i] = f(source[i]);
  }
  return target;
}
function mapIndexed2(f, source1, source2, cons) {
  if (source1.length !== source2.length) {
    throw new Error("Arrays had different lengths");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, source1.length);
  for (let i = 0; i <= source1.length - 1; i++) {
    result[i] = f(i, source1[i], source2[i]);
  }
  return result;
}
function map2(f, source1, source2, cons) {
  if (source1.length !== source2.length) {
    throw new Error("Arrays had different lengths");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, source1.length);
  for (let i = 0; i <= source1.length - 1; i++) {
    result[i] = f(source1[i], source2[i]);
  }
  return result;
}
function mapIndexed3(f, source1, source2, source3, cons) {
  if (source1.length !== source2.length ? true : source2.length !== source3.length) {
    throw new Error("Arrays had different lengths");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, source1.length);
  for (let i = 0; i <= source1.length - 1; i++) {
    result[i] = f(i, source1[i], source2[i], source3[i]);
  }
  return result;
}
function map3(f, source1, source2, source3, cons) {
  if (source1.length !== source2.length ? true : source2.length !== source3.length) {
    throw new Error("Arrays had different lengths");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, source1.length);
  for (let i = 0; i <= source1.length - 1; i++) {
    result[i] = f(source1[i], source2[i], source3[i]);
  }
  return result;
}
function mapFold(mapping, state, array, cons) {
  const matchValue = array.length | 0;
  if (matchValue === 0) {
    return [[], state];
  } else {
    let acc = state;
    const res = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, matchValue);
    for (let i = 0; i <= array.length - 1; i++) {
      const patternInput = mapping(acc, array[i]);
      res[i] = patternInput[0];
      acc = patternInput[1];
    }
    return [res, acc];
  }
}
function mapFoldBack(mapping, array, state, cons) {
  const matchValue = array.length | 0;
  if (matchValue === 0) {
    return [[], state];
  } else {
    let acc = state;
    const res = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, matchValue);
    for (let i = array.length - 1; i >= 0; i--) {
      const patternInput = mapping(array[i], acc);
      res[i] = patternInput[0];
      acc = patternInput[1];
    }
    return [res, acc];
  }
}
function indexed(source) {
  const len = source.length | 0;
  const target = new Array(len);
  for (let i = 0; i <= len - 1; i++) {
    target[i] = [i, source[i]];
  }
  return target;
}
function truncate(count, array) {
  const count_1 = (0,_Double_js__WEBPACK_IMPORTED_MODULE_2__.max)(0, count) | 0;
  return array.slice(0, 0 + count_1);
}
function concat(arrays, cons) {
  const arrays_1 = Array.isArray(arrays) ? arrays : Array.from(arrays);
  const matchValue = arrays_1.length | 0;
  switch (matchValue) {
    case 0:
      return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
    case 1:
      return arrays_1[0];
    default:
      {
        let totalIdx = 0;
        let totalLength = 0;
        for (let idx = 0; idx <= arrays_1.length - 1; idx++) {
          const arr_1 = arrays_1[idx];
          totalLength = totalLength + arr_1.length | 0;
        }
        const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, totalLength);
        for (let idx_1 = 0; idx_1 <= arrays_1.length - 1; idx_1++) {
          const arr_2 = arrays_1[idx_1];
          for (let j = 0; j <= arr_2.length - 1; j++) {
            result[totalIdx] = arr_2[j];
            totalIdx = totalIdx + 1 | 0;
          }
        }
        return result;
      }
  }
}
function collect(mapping, array, cons) {
  return concat(map(mapping, array, (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.defaultOf)()), cons);
}
function where(predicate, array) {
  return array.filter(predicate);
}
function indexOf(array, item_1, start, count, eq) {
  const start_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.defaultArg)(start, 0) | 0;
  const end$0027 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.defaultArg)((0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.map)(c => start_1 + c, count), array.length) | 0;
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i >= end$0027) {
        return -1;
      } else if (eq.Equals(item_1, array[i])) {
        return i | 0;
      } else {
        i_mut = i + 1;
        continue loop;
      }
      break;
    }
  };
  return loop(start_1) | 0;
}
function contains(value, array, eq) {
  return indexOf(array, value, void 0, void 0, eq) >= 0;
}
function empty(cons) {
  return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
}
function singleton(value, cons) {
  const ar = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 1);
  ar[0] = value;
  return ar;
}
function initialize(count, initializer, cons) {
  if (count < 0) {
    throw new Error("The input must be non-negative\\nParameter name: count");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, count);
  for (let i = 0; i <= count - 1; i++) {
    result[i] = initializer(i);
  }
  return result;
}
function pairwise(array) {
  if (array.length < 2) {
    return [];
  } else {
    const count = array.length - 1 | 0;
    const result = new Array(count);
    for (let i = 0; i <= count - 1; i++) {
      result[i] = [array[i], array[i + 1]];
    }
    return result;
  }
}
function replicate(count, initial, cons) {
  if (count < 0) {
    throw new Error("The input must be non-negative\\nParameter name: count");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, count);
  for (let i = 0; i <= result.length - 1; i++) {
    result[i] = initial;
  }
  return result;
}
function copy(array) {
  return array.slice();
}
function copyTo(source, sourceIndex, target, targetIndex, count) {
  (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.copyToArray)(source, sourceIndex, target, targetIndex, count);
}
function reverse(array) {
  const array_2 = array.slice();
  return array_2.reverse();
}
function scan(folder, state, array, cons) {
  const res = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, array.length + 1);
  res[0] = state;
  for (let i = 0; i <= array.length - 1; i++) {
    res[i + 1] = folder(res[i], array[i]);
  }
  return res;
}
function scanBack(folder, array, state, cons) {
  const res = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, array.length + 1);
  res[array.length] = state;
  for (let i = array.length - 1; i >= 0; i--) {
    res[i] = folder(array[i], res[i + 1]);
  }
  return res;
}
function skip(count, array, cons) {
  if (count > array.length) {
    throw new Error("count is greater than array length\\nParameter name: count");
  }
  if (count === array.length) {
    return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
  } else {
    const count_1 = (count < 0 ? 0 : count) | 0;
    return array.slice(count_1);
  }
}
function skipWhile(predicate, array, cons) {
  let count = 0;
  while (count < array.length && predicate(array[count])) {
    count = count + 1 | 0;
  }
  if (count === array.length) {
    return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
  } else {
    const count_1 = count | 0;
    return array.slice(count_1);
  }
}
function take(count, array, cons) {
  if (count < 0) {
    throw new Error("The input must be non-negative\\nParameter name: count");
  }
  if (count > array.length) {
    throw new Error("count is greater than array length\\nParameter name: count");
  }
  if (count === 0) {
    return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
  } else {
    return array.slice(0, 0 + count);
  }
}
function takeWhile(predicate, array, cons) {
  let count = 0;
  while (count < array.length && predicate(array[count])) {
    count = count + 1 | 0;
  }
  if (count === 0) {
    return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
  } else {
    const count_1 = count | 0;
    return array.slice(0, 0 + count_1);
  }
}
function addInPlace(x, array) {
  array.push(x);
}
function addRangeInPlace(range, array) {
  const enumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(range);
  try {
    while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
      addInPlace(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"](), array);
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.disposeSafe)(enumerator);
  }
}
function insertRangeInPlace(index, range, array) {
  let index_1;
  let i = index;
  const enumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(range);
  try {
    while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
      const x = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
      index_1 = i | 0, array.splice(index_1, 0, x);
      i = i + 1 | 0;
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.disposeSafe)(enumerator);
  }
}
function removeInPlace(item_1, array, eq) {
  const i = indexOf(array, item_1, void 0, void 0, eq) | 0;
  if (i > -1) {
    array.splice(i, 1);
    return true;
  } else {
    return false;
  }
}
function removeAllInPlace(predicate, array) {
  const countRemoveAll = count => {
    const i = array.findIndex(predicate) | 0;
    if (i > -1) {
      array.splice(i, 1);
      return countRemoveAll(count) + 1 | 0;
    } else {
      return count | 0;
    }
  };
  return countRemoveAll(0) | 0;
}
function partition(f, source, cons) {
  const len = source.length | 0;
  const res1 = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
  const res2 = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
  let iTrue = 0;
  let iFalse = 0;
  for (let i = 0; i <= len - 1; i++) {
    if (f(source[i])) {
      res1[iTrue] = source[i];
      iTrue = iTrue + 1 | 0;
    } else {
      res2[iFalse] = source[i];
      iFalse = iFalse + 1 | 0;
    }
  }
  return [truncate(iTrue, res1), truncate(iFalse, res2)];
}
function find(predicate, array) {
  const matchValue = array.find(predicate);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue);
  }
}
function tryFind(predicate, array) {
  return array.find(predicate);
}
function findIndex(predicate, array) {
  const matchValue = array.findIndex(predicate) | 0;
  if (matchValue > -1) {
    return matchValue | 0;
  } else {
    indexNotFound();
    return -1;
  }
}
function tryFindIndex(predicate, array) {
  const matchValue = array.findIndex(predicate) | 0;
  if (matchValue > -1) {
    return matchValue;
  } else {
    return void 0;
  }
}
function pick(chooser, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i >= array.length) {
        return indexNotFound();
      } else {
        const matchValue = chooser(array[i]);
        if (matchValue != null) {
          return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue);
        } else {
          i_mut = i + 1;
          continue loop;
        }
      }
      break;
    }
  };
  return loop(0);
}
function tryPick(chooser, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i >= array.length) {
        return void 0;
      } else {
        const matchValue = chooser(array[i]);
        if (matchValue == null) {
          i_mut = i + 1;
          continue loop;
        } else {
          return matchValue;
        }
      }
      break;
    }
  };
  return loop(0);
}
function findBack(predicate, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i < 0) {
        return indexNotFound();
      } else if (predicate(array[i])) {
        return array[i];
      } else {
        i_mut = i - 1;
        continue loop;
      }
      break;
    }
  };
  return loop(array.length - 1);
}
function tryFindBack(predicate, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i < 0) {
        return void 0;
      } else if (predicate(array[i])) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(array[i]);
      } else {
        i_mut = i - 1;
        continue loop;
      }
      break;
    }
  };
  return loop(array.length - 1);
}
function findLastIndex(predicate, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i < 0) {
        return -1;
      } else if (predicate(array[i])) {
        return i | 0;
      } else {
        i_mut = i - 1;
        continue loop;
      }
      break;
    }
  };
  return loop(array.length - 1) | 0;
}
function findIndexBack(predicate, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i < 0) {
        indexNotFound();
        return -1;
      } else if (predicate(array[i])) {
        return i | 0;
      } else {
        i_mut = i - 1;
        continue loop;
      }
      break;
    }
  };
  return loop(array.length - 1) | 0;
}
function tryFindIndexBack(predicate, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i < 0) {
        return void 0;
      } else if (predicate(array[i])) {
        return i;
      } else {
        i_mut = i - 1;
        continue loop;
      }
      break;
    }
  };
  return loop(array.length - 1);
}
function choose(chooser, array, cons) {
  const res = [];
  for (let i = 0; i <= array.length - 1; i++) {
    const matchValue = chooser(array[i]);
    if (matchValue != null) {
      const y = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue);
      res.push(y);
    }
  }
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.equals)(cons, (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.defaultOf)())) {
    return res;
  } else {
    return map(x => x, res, cons);
  }
}
function foldIndexed(folder, state, array) {
  return array.reduce((delegateArg, delegateArg_1, delegateArg_2) => folder(delegateArg_2, delegateArg, delegateArg_1), state);
}
function fold(folder, state, array) {
  return array.reduce(folder, state);
}
function iterate(action, array) {
  for (let i = 0; i <= array.length - 1; i++) {
    action(array[i]);
  }
}
function iterateIndexed(action, array) {
  for (let i = 0; i <= array.length - 1; i++) {
    action(i, array[i]);
  }
}
function iterate2(action, array1, array2) {
  if (array1.length !== array2.length) {
    differentLengths();
  }
  for (let i = 0; i <= array1.length - 1; i++) {
    action(array1[i], array2[i]);
  }
}
function iterateIndexed2(action, array1, array2) {
  if (array1.length !== array2.length) {
    differentLengths();
  }
  for (let i = 0; i <= array1.length - 1; i++) {
    action(i, array1[i], array2[i]);
  }
}
function isEmpty(array) {
  return array.length === 0;
}
function forAll(predicate, array) {
  return array.every(predicate);
}
function permute(f, array) {
  const size = array.length | 0;
  const res = array.slice();
  const checkFlags = new Array(size);
  iterateIndexed((i, x) => {
    const j = f(i) | 0;
    if (j < 0 ? true : j >= size) {
      throw new Error("Not a valid permutation");
    }
    res[j] = x;
    checkFlags[j] = 1;
  }, array);
  if (!checkFlags.every(y => 1 === y)) {
    throw new Error("Not a valid permutation");
  }
  return res;
}
function setSlice(target, lower, upper, source) {
  const lower_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.defaultArg)(lower, 0) | 0;
  const upper_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.defaultArg)(upper, -1) | 0;
  const length = (upper_1 >= 0 ? upper_1 : target.length - 1) - lower_1 | 0;
  for (let i = 0; i <= length; i++) {
    target[i + lower_1] = source[i];
  }
}
function sortInPlaceBy(projection, xs, comparer) {
  xs.sort((x, y) => comparer.Compare(projection(x), projection(y)));
}
function sortInPlace(xs, comparer) {
  xs.sort((x, y) => comparer.Compare(x, y));
}
function sort(xs, comparer) {
  const xs_1 = xs.slice();
  xs_1.sort((x, y) => comparer.Compare(x, y));
  return xs_1;
}
function sortBy(projection, xs, comparer) {
  const xs_1 = xs.slice();
  xs_1.sort((x, y) => comparer.Compare(projection(x), projection(y)));
  return xs_1;
}
function sortDescending(xs, comparer) {
  const xs_1 = xs.slice();
  xs_1.sort((x, y) => comparer.Compare(x, y) * -1);
  return xs_1;
}
function sortByDescending(projection, xs, comparer) {
  const xs_1 = xs.slice();
  xs_1.sort((x, y) => comparer.Compare(projection(x), projection(y)) * -1);
  return xs_1;
}
function sortWith(comparer, xs) {
  const comparer_1 = comparer;
  const xs_1 = xs.slice();
  xs_1.sort(comparer_1);
  return xs_1;
}
function allPairs(xs, ys) {
  const len1 = xs.length | 0;
  const len2 = ys.length | 0;
  const res = new Array(len1 * len2);
  for (let i = 0; i <= xs.length - 1; i++) {
    for (let j = 0; j <= ys.length - 1; j++) {
      res[i * len2 + j] = [xs[i], ys[j]];
    }
  }
  return res;
}
function unfold(generator, state) {
  const res = [];
  const loop = state_1_mut => {
    loop: while (true) {
      const state_1 = state_1_mut;
      const matchValue = generator(state_1);
      if (matchValue != null) {
        const x = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue)[0];
        const s = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue)[1];
        res.push(x);
        state_1_mut = s;
        continue loop;
      }
      break;
    }
  };
  loop(state);
  return res;
}
function unzip(array) {
  const len = array.length | 0;
  const res1 = new Array(len);
  const res2 = new Array(len);
  iterateIndexed((i, tupledArg) => {
    res1[i] = tupledArg[0];
    res2[i] = tupledArg[1];
  }, array);
  return [res1, res2];
}
function unzip3(array) {
  const len = array.length | 0;
  const res1 = new Array(len);
  const res2 = new Array(len);
  const res3 = new Array(len);
  iterateIndexed((i, tupledArg) => {
    res1[i] = tupledArg[0];
    res2[i] = tupledArg[1];
    res3[i] = tupledArg[2];
  }, array);
  return [res1, res2, res3];
}
function zip(array1, array2) {
  if (array1.length !== array2.length) {
    differentLengths();
  }
  const result = new Array(array1.length);
  for (let i = 0; i <= array1.length - 1; i++) {
    result[i] = [array1[i], array2[i]];
  }
  return result;
}
function zip3(array1, array2, array3) {
  if (array1.length !== array2.length ? true : array2.length !== array3.length) {
    differentLengths();
  }
  const result = new Array(array1.length);
  for (let i = 0; i <= array1.length - 1; i++) {
    result[i] = [array1[i], array2[i], array3[i]];
  }
  return result;
}
function chunkBySize(chunkSize, array) {
  if (chunkSize < 1) {
    throw new Error("The input must be positive.\\nParameter name: size");
  }
  if (array.length === 0) {
    return [[]];
  } else {
    const result = [];
    for (let x = 0; x <= ~~Math.ceil(array.length / chunkSize) - 1; x++) {
      let slice;
      const start_1 = x * chunkSize | 0;
      slice = array.slice(start_1, start_1 + chunkSize);
      result.push(slice);
    }
    return result;
  }
}
function splitAt(index, array) {
  if (index < 0 ? true : index > array.length) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return [array.slice(0, 0 + index), array.slice(index)];
}
function compareWith(comparer, source1, source2) {
  if (source1 == null) {
    if (source2 == null) {
      return 0;
    } else {
      return -1;
    }
  } else if (source2 == null) {
    return 1;
  } else {
    const len1 = source1.length | 0;
    const len2 = source2.length | 0;
    const len = (len1 < len2 ? len1 : len2) | 0;
    let i = 0;
    let res = 0;
    while (res === 0 && i < len) {
      res = comparer(source1[i], source2[i]) | 0;
      i = i + 1 | 0;
    }
    if (res !== 0) {
      return res | 0;
    } else if (len1 > len2) {
      return 1;
    } else if (len1 < len2) {
      return -1;
    } else {
      return 0;
    }
  }
}
function compareTo(comparer, source1, source2) {
  if (source1 == null) {
    if (source2 == null) {
      return 0;
    } else {
      return -1;
    }
  } else if (source2 == null) {
    return 1;
  } else {
    const len1 = source1.length | 0;
    const len2 = source2.length | 0;
    if (len1 > len2) {
      return 1;
    } else if (len1 < len2) {
      return -1;
    } else {
      let i = 0;
      let res = 0;
      while (res === 0 && i < len1) {
        res = comparer(source1[i], source2[i]) | 0;
        i = i + 1 | 0;
      }
      return res | 0;
    }
  }
}
function equalsWith(equals, array1, array2) {
  if (array1 == null) {
    if (array2 == null) {
      return true;
    } else {
      return false;
    }
  } else if (array2 == null) {
    return false;
  } else {
    let i = 0;
    let result = true;
    const length1 = array1.length | 0;
    const length2 = array2.length | 0;
    if (length1 > length2) {
      return false;
    } else if (length1 < length2) {
      return false;
    } else {
      while (i < length1 && result) {
        result = equals(array1[i], array2[i]);
        i = i + 1 | 0;
      }
      return result;
    }
  }
}
function exactlyOne(array) {
  switch (array.length) {
    case 1:
      return array[0];
    case 0:
      throw new Error("The input sequence was empty\\nParameter name: array");
    default:
      throw new Error("Input array too long\\nParameter name: array");
  }
}
function tryExactlyOne(array) {
  if (array.length === 1) {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(array[0]);
  } else {
    return void 0;
  }
}
function head(array) {
  if (array.length === 0) {
    throw new Error("The input array was empty\\nParameter name: array");
  } else {
    return array[0];
  }
}
function tryHead(array) {
  if (array.length === 0) {
    return void 0;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(array[0]);
  }
}
function tail(array) {
  if (array.length === 0) {
    throw new Error("Not enough elements\\nParameter name: array");
  }
  return array.slice(1);
}
function item(index, array) {
  return array[index];
}
function tryItem(index, array) {
  if (index < 0 ? true : index >= array.length) {
    return void 0;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(array[index]);
  }
}
function foldBackIndexed(folder, array, state) {
  return array.reduceRight((delegateArg, delegateArg_1, delegateArg_2) => folder(delegateArg_2, delegateArg_1, delegateArg), state);
}
function foldBack(folder, array, state) {
  return array.reduceRight((delegateArg, delegateArg_1) => folder(delegateArg_1, delegateArg), state);
}
function foldIndexed2(folder, state, array1, array2) {
  let acc = state;
  if (array1.length !== array2.length) {
    throw new Error("Arrays have different lengths");
  }
  for (let i = 0; i <= array1.length - 1; i++) {
    acc = folder(i, acc, array1[i], array2[i]);
  }
  return acc;
}
function fold2(folder, state, array1, array2) {
  return foldIndexed2((_arg, acc, x, y) => folder(acc, x, y), state, array1, array2);
}
function foldBackIndexed2(folder, array1, array2, state) {
  let acc = state;
  if (array1.length !== array2.length) {
    differentLengths();
  }
  const size = array1.length | 0;
  for (let i = 1; i <= size; i++) {
    acc = folder(i - 1, array1[size - i], array2[size - i], acc);
  }
  return acc;
}
function foldBack2(f, array1, array2, state) {
  return foldBackIndexed2((_arg, x, y, acc) => f(x, y, acc), array1, array2, state);
}
function reduce(reduction, array) {
  if (array.length === 0) {
    throw new Error("The input array was empty");
  }
  const reduction_1 = reduction;
  return array.reduce(reduction_1);
}
function reduceBack(reduction, array) {
  if (array.length === 0) {
    throw new Error("The input array was empty");
  }
  const reduction_1 = reduction;
  return array.reduceRight(reduction_1);
}
function forAll2(predicate, array1, array2) {
  return fold2((acc, x, y) => acc && predicate(x, y), true, array1, array2);
}
function existsOffset(predicate_mut, array_mut, index_mut) {
  existsOffset: while (true) {
    const predicate = predicate_mut,
      array = array_mut,
      index = index_mut;
    if (index === array.length) {
      return false;
    } else if (predicate(array[index])) {
      return true;
    } else {
      predicate_mut = predicate;
      array_mut = array;
      index_mut = index + 1;
      continue existsOffset;
    }
    break;
  }
}
function exists(predicate, array) {
  return existsOffset(predicate, array, 0);
}
function existsOffset2(predicate_mut, array1_mut, array2_mut, index_mut) {
  existsOffset2: while (true) {
    const predicate = predicate_mut,
      array1 = array1_mut,
      array2 = array2_mut,
      index = index_mut;
    if (index === array1.length) {
      return false;
    } else if (predicate(array1[index], array2[index])) {
      return true;
    } else {
      predicate_mut = predicate;
      array1_mut = array1;
      array2_mut = array2;
      index_mut = index + 1;
      continue existsOffset2;
    }
    break;
  }
}
function exists2(predicate, array1, array2) {
  if (array1.length !== array2.length) {
    differentLengths();
  }
  return existsOffset2(predicate, array1, array2, 0);
}
function sum(array, adder) {
  let acc = adder.GetZero();
  for (let i = 0; i <= array.length - 1; i++) {
    acc = adder.Add(acc, array[i]);
  }
  return acc;
}
function sumBy(projection, array, adder) {
  let acc = adder.GetZero();
  for (let i = 0; i <= array.length - 1; i++) {
    acc = adder.Add(acc, projection(array[i]));
  }
  return acc;
}
function maxBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? y : x, xs);
}
function max(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? y : x, xs);
}
function minBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? x : y, xs);
}
function min(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? x : y, xs);
}
function average(array, averager) {
  if (array.length === 0) {
    throw new Error("The input array was empty\\nParameter name: array");
  }
  let total = averager.GetZero();
  for (let i = 0; i <= array.length - 1; i++) {
    total = averager.Add(total, array[i]);
  }
  return averager.DivideByInt(total, array.length);
}
function averageBy(projection, array, averager) {
  if (array.length === 0) {
    throw new Error("The input array was empty\\nParameter name: array");
  }
  let total = averager.GetZero();
  for (let i = 0; i <= array.length - 1; i++) {
    total = averager.Add(total, projection(array[i]));
  }
  return averager.DivideByInt(total, array.length);
}
function windowed(windowSize, source) {
  if (windowSize <= 0) {
    throw new Error("windowSize must be positive");
  }
  let res;
  const len = (0,_Double_js__WEBPACK_IMPORTED_MODULE_2__.max)(0, source.length - windowSize + 1) | 0;
  res = new Array(len);
  for (let i = windowSize; i <= source.length; i++) {
    res[i - windowSize] = source.slice(i - windowSize, i - 1 + 1);
  }
  return res;
}
function splitInto(chunks, array) {
  if (chunks < 1) {
    throw new Error("The input must be positive.\\nParameter name: chunks");
  }
  if (array.length === 0) {
    return [[]];
  } else {
    const result = [];
    const chunks_1 = (0,_Double_js__WEBPACK_IMPORTED_MODULE_2__.min)(chunks, array.length) | 0;
    const minChunkSize = ~~(array.length / chunks_1) | 0;
    const chunksWithExtraItem = array.length % chunks_1 | 0;
    for (let i = 0; i <= chunks_1 - 1; i++) {
      const chunkSize = (i < chunksWithExtraItem ? minChunkSize + 1 : minChunkSize) | 0;
      let slice;
      const start_1 = i * minChunkSize + (0,_Double_js__WEBPACK_IMPORTED_MODULE_2__.min)(chunksWithExtraItem, i) | 0;
      slice = array.slice(start_1, start_1 + chunkSize);
      result.push(slice);
    }
    return result;
  }
}
function transpose(arrays, cons) {
  const arrays_1 = Array.isArray(arrays) ? arrays : Array.from(arrays);
  const len = arrays_1.length | 0;
  if (len === 0) {
    return new Array(0);
  } else {
    const firstArray = arrays_1[0];
    const lenInner = firstArray.length | 0;
    if (!forAll(a => a.length === lenInner, arrays_1)) {
      differentLengths();
    }
    const result = new Array(lenInner);
    for (let i = 0; i <= lenInner - 1; i++) {
      result[i] = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
      for (let j = 0; j <= len - 1; j++) {
        result[i][j] = arrays_1[j][i];
      }
    }
    return result;
  }
}
function insertAt(index, y, xs, cons) {
  const len = xs.length | 0;
  if (index < 0 ? true : index > len) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  const target = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len + 1);
  for (let i = 0; i <= index - 1; i++) {
    target[i] = xs[i];
  }
  target[index] = y;
  for (let i_1 = index; i_1 <= len - 1; i_1++) {
    target[i_1 + 1] = xs[i_1];
  }
  return target;
}
function insertManyAt(index, ys, xs, cons) {
  const len = xs.length | 0;
  if (index < 0 ? true : index > len) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  const ys_1 = Array.from(ys);
  const len2 = ys_1.length | 0;
  const target = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len + len2);
  for (let i = 0; i <= index - 1; i++) {
    target[i] = xs[i];
  }
  for (let i_1 = 0; i_1 <= len2 - 1; i_1++) {
    target[index + i_1] = ys_1[i_1];
  }
  for (let i_2 = index; i_2 <= len - 1; i_2++) {
    target[i_2 + len2] = xs[i_2];
  }
  return target;
}
function removeAt(index, xs) {
  if (index < 0 ? true : index >= xs.length) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  let i = -1;
  return filter(_arg => {
    i = i + 1 | 0;
    return i !== index;
  }, xs);
}
function removeManyAt(index, count, xs) {
  let i = -1;
  let status = -1;
  const ys = filter(_arg => {
    i = i + 1 | 0;
    if (i === index) {
      status = 0;
      return false;
    } else if (i > index) {
      if (i < index + count) {
        return false;
      } else {
        status = 1;
        return true;
      }
    } else {
      return true;
    }
  }, xs);
  const status_1 = (status === 0 && i + 1 === index + count ? 1 : status) | 0;
  if (status_1 < 1) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + (status_1 < 0 ? "index" : "count"));
  }
  return ys;
}
function updateAt(index, y, xs, cons) {
  const len = xs.length | 0;
  if (index < 0 ? true : index >= len) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  const target = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
  for (let i = 0; i <= len - 1; i++) {
    target[i] = i === index ? y : xs[i];
  }
  return target;
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Async.js":
/*!*************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Async.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Async": () => (/* binding */ Async),
/* harmony export */   "awaitPromise": () => (/* binding */ awaitPromise),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "callThenInvoke": () => (/* binding */ callThenInvoke),
/* harmony export */   "cancel": () => (/* binding */ cancel),
/* harmony export */   "cancelAfter": () => (/* binding */ cancelAfter),
/* harmony export */   "cancellationToken": () => (/* binding */ cancellationToken),
/* harmony export */   "catchAsync": () => (/* binding */ catchAsync),
/* harmony export */   "createCancellationToken": () => (/* binding */ createCancellationToken),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "defaultCancellationToken": () => (/* binding */ defaultCancellationToken),
/* harmony export */   "fromContinuations": () => (/* binding */ fromContinuations),
/* harmony export */   "ignore": () => (/* binding */ ignore),
/* harmony export */   "invoke": () => (/* binding */ invoke),
/* harmony export */   "isCancellationRequested": () => (/* binding */ isCancellationRequested),
/* harmony export */   "makeAsync": () => (/* binding */ makeAsync),
/* harmony export */   "parallel": () => (/* binding */ parallel),
/* harmony export */   "runSynchronously": () => (/* binding */ runSynchronously),
/* harmony export */   "sequential": () => (/* binding */ sequential),
/* harmony export */   "sleep": () => (/* binding */ sleep),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "startAsPromise": () => (/* binding */ startAsPromise),
/* harmony export */   "startChild": () => (/* binding */ startChild),
/* harmony export */   "startImmediate": () => (/* binding */ startImmediate),
/* harmony export */   "startWithContinuations": () => (/* binding */ startWithContinuations),
/* harmony export */   "throwIfCancellationRequested": () => (/* binding */ throwIfCancellationRequested)
/* harmony export */ });
/* harmony import */ var _AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncBuilder.js */ "./src/Main/fable_modules/fable-library.4.1.4/AsyncBuilder.js");
/* harmony import */ var _Choice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Choice.js */ "./src/Main/fable_modules/fable-library.4.1.4/Choice.js");
/* harmony import */ var _SystemException_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SystemException.js */ "./src/Main/fable_modules/fable-library.4.1.4/SystemException.js");







// Implemented just for type references
class Async {}
function emptyContinuation(_x) {
  // NOP
}
// see AsyncBuilder.Delay
function delay(generator) {
  return (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedCont)(ctx => generator()(ctx));
}
// MakeAsync: body:(AsyncActivation<'T> -> AsyncReturn) -> Async<'T>
function makeAsync(body) {
  return body;
}
// Invoke: computation: Async<'T> -> ctxt:AsyncActivation<'T> -> AsyncReturn
function invoke(computation, ctx) {
  return computation(ctx);
}
// CallThenInvoke: ctxt:AsyncActivation<'T> -> result1:'U -> part2:('U -> Async<'T>) -> AsyncReturn
function callThenInvoke(ctx, result1, part2) {
  return part2(result1)(ctx);
}
// Bind: ctxt:AsyncActivation<'T> -> part1:Async<'U> -> part2:('U -> Async<'T>) -> AsyncReturn
function bind(ctx, part1, part2) {
  return (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedBind)(part1, part2)(ctx);
}
function createCancellationToken(arg) {
  const token = new _AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken(typeof arg === "boolean" ? arg : false);
  if (typeof arg === "number") {
    setTimeout(() => {
      token.cancel();
    }, arg);
  }
  return token;
}
function cancel(token) {
  token.cancel();
}
function cancelAfter(token, ms) {
  setTimeout(() => {
    token.cancel();
  }, ms);
}
function isCancellationRequested(token) {
  return token != null && token.isCancelled;
}
function throwIfCancellationRequested(token) {
  if (token != null && token.isCancelled) {
    throw new Error("Operation is cancelled");
  }
}
function throwAfter(millisecondsDueTime) {
  return (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedCont)(ctx => {
    let tokenId;
    const timeoutId = setTimeout(() => {
      ctx.cancelToken.removeListener(tokenId);
      ctx.onError(new _SystemException_js__WEBPACK_IMPORTED_MODULE_1__.TimeoutException());
    }, millisecondsDueTime);
    tokenId = ctx.cancelToken.addListener(() => {
      clearTimeout(timeoutId);
      ctx.onCancel(new _AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.OperationCanceledError());
    });
  });
}
function startChild(computation, ms) {
  if (ms) {
    const computationWithTimeout = (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedBind)(parallel2(computation, throwAfter(ms)), xs => (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedReturn)(xs[0]));
    return startChild(computationWithTimeout);
  }
  const promise = startAsPromise(computation);
  // JS Promises are hot, computation has already started
  // but we delay returning the result
  return (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedCont)(ctx => (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedReturn)(awaitPromise(promise))(ctx));
}
function awaitPromise(p) {
  return fromContinuations(conts => p.then(conts[0]).catch(err => (err instanceof _AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.OperationCanceledError ? conts[2] : conts[1])(err)));
}
function cancellationToken() {
  return (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedCont)(ctx => ctx.onSuccess(ctx.cancelToken));
}
const defaultCancellationToken = new _AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken();
function catchAsync(work) {
  return (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedCont)(ctx => {
    work({
      onSuccess: x => ctx.onSuccess((0,_Choice_js__WEBPACK_IMPORTED_MODULE_2__.Choice_makeChoice1Of2)(x)),
      onError: ex => ctx.onSuccess((0,_Choice_js__WEBPACK_IMPORTED_MODULE_2__.Choice_makeChoice2Of2)(ex)),
      onCancel: ctx.onCancel,
      cancelToken: ctx.cancelToken,
      trampoline: ctx.trampoline
    });
  });
}
function fromContinuations(f) {
  return (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedCont)(ctx => f([ctx.onSuccess, ctx.onError, ctx.onCancel]));
}
function ignore(computation) {
  return (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedBind)(computation, _x => (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedReturn)(void 0));
}
function parallel(computations) {
  return delay(() => awaitPromise(Promise.all(Array.from(computations, w => startAsPromise(w)))));
}
function parallel2(a, b) {
  return delay(() => awaitPromise(Promise.all([startAsPromise(a), startAsPromise(b)])));
}
function sequential(computations) {
  function _sequential(computations) {
    let pr = Promise.resolve([]);
    for (const c of computations) {
      pr = pr.then(results => startAsPromise(c).then(r => results.concat([r])));
    }
    return pr;
  }
  return delay(() => awaitPromise(_sequential(computations)));
}
function sleep(millisecondsDueTime) {
  return (0,_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.protectedCont)(ctx => {
    let tokenId;
    const timeoutId = setTimeout(() => {
      ctx.cancelToken.removeListener(tokenId);
      ctx.onSuccess(void 0);
    }, millisecondsDueTime);
    tokenId = ctx.cancelToken.addListener(() => {
      clearTimeout(timeoutId);
      ctx.onCancel(new _AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.OperationCanceledError());
    });
  });
}
function runSynchronously() {
  throw new Error("Asynchronous code cannot be run synchronously in JS");
}
function start(computation, cancellationToken) {
  return startWithContinuations(computation, cancellationToken);
}
function startImmediate(computation, cancellationToken) {
  return start(computation, cancellationToken);
}
function startWithContinuations(computation, continuation, exceptionContinuation, cancellationContinuation, cancelToken) {
  if (typeof continuation !== "function") {
    cancelToken = continuation;
    continuation = undefined;
  }
  const trampoline = new _AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_0__.Trampoline();
  computation({
    onSuccess: continuation ? continuation : emptyContinuation,
    onError: exceptionContinuation ? exceptionContinuation : emptyContinuation,
    onCancel: cancellationContinuation ? cancellationContinuation : emptyContinuation,
    cancelToken: cancelToken ? cancelToken : defaultCancellationToken,
    trampoline
  });
}
function startAsPromise(computation, cancellationToken) {
  return new Promise((resolve, reject) => startWithContinuations(computation, resolve, reject, reject, cancellationToken ? cancellationToken : defaultCancellationToken));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Async);

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/AsyncBuilder.js":
/*!********************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/AsyncBuilder.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncBuilder": () => (/* binding */ AsyncBuilder),
/* harmony export */   "CancellationToken": () => (/* binding */ CancellationToken),
/* harmony export */   "OperationCanceledError": () => (/* binding */ OperationCanceledError),
/* harmony export */   "Trampoline": () => (/* binding */ Trampoline),
/* harmony export */   "protectedBind": () => (/* binding */ protectedBind),
/* harmony export */   "protectedCont": () => (/* binding */ protectedCont),
/* harmony export */   "protectedReturn": () => (/* binding */ protectedReturn),
/* harmony export */   "singleton": () => (/* binding */ singleton)
/* harmony export */ });
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types.js */ "./src/Main/fable_modules/fable-library.4.1.4/Types.js");

class CancellationToken {
  constructor(cancelled = false) {
    this._id = 0;
    this._cancelled = cancelled;
    this._listeners = new Map();
  }
  get isCancelled() {
    return this._cancelled;
  }
  cancel() {
    if (!this._cancelled) {
      this._cancelled = true;
      for (const [, listener] of this._listeners) {
        listener();
      }
    }
  }
  addListener(f) {
    const id = this._id;
    this._listeners.set(this._id++, f);
    return id;
  }
  removeListener(id) {
    return this._listeners.delete(id);
  }
  register(f, state) {
    const $ = this;
    const id = this.addListener(state == null ? f : () => f(state));
    return {
      Dispose() {
        $.removeListener(id);
      }
    };
  }
  Dispose() {
    // Implement IDisposable for compatibility but do nothing
    // According to docs, calling Dispose does not trigger cancellation
    // https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtokensource.dispose?view=net-6.0
  }
}
class OperationCanceledError extends Error {
  constructor() {
    super("The operation was canceled");
    Object.setPrototypeOf(this, OperationCanceledError.prototype);
  }
}
class Trampoline {
  static get maxTrampolineCallCount() {
    return 2000;
  }
  constructor() {
    this.callCount = 0;
  }
  incrementAndCheck() {
    return this.callCount++ > Trampoline.maxTrampolineCallCount;
  }
  hijack(f) {
    this.callCount = 0;
    setTimeout(f, 0);
  }
}
function protectedCont(f) {
  return ctx => {
    if (ctx.cancelToken.isCancelled) {
      ctx.onCancel(new OperationCanceledError());
    } else if (ctx.trampoline.incrementAndCheck()) {
      ctx.trampoline.hijack(() => {
        try {
          f(ctx);
        } catch (err) {
          ctx.onError((0,_Types_js__WEBPACK_IMPORTED_MODULE_0__.ensureErrorOrException)(err));
        }
      });
    } else {
      try {
        f(ctx);
      } catch (err) {
        ctx.onError((0,_Types_js__WEBPACK_IMPORTED_MODULE_0__.ensureErrorOrException)(err));
      }
    }
  };
}
function protectedBind(computation, binder) {
  return protectedCont(ctx => {
    computation({
      onSuccess: x => {
        try {
          binder(x)(ctx);
        } catch (err) {
          ctx.onError((0,_Types_js__WEBPACK_IMPORTED_MODULE_0__.ensureErrorOrException)(err));
        }
      },
      onError: ctx.onError,
      onCancel: ctx.onCancel,
      cancelToken: ctx.cancelToken,
      trampoline: ctx.trampoline
    });
  });
}
function protectedReturn(value) {
  return protectedCont(ctx => ctx.onSuccess(value));
}
class AsyncBuilder {
  Bind(computation, binder) {
    return protectedBind(computation, binder);
  }
  Combine(computation1, computation2) {
    return this.Bind(computation1, () => computation2);
  }
  Delay(generator) {
    return protectedCont(ctx => generator()(ctx));
  }
  For(sequence, body) {
    const iter = sequence[Symbol.iterator]();
    let cur = iter.next();
    return this.While(() => !cur.done, this.Delay(() => {
      const res = body(cur.value);
      cur = iter.next();
      return res;
    }));
  }
  Return(value) {
    return protectedReturn(value);
  }
  ReturnFrom(computation) {
    return computation;
  }
  TryFinally(computation, compensation) {
    return protectedCont(ctx => {
      computation({
        onSuccess: x => {
          compensation();
          ctx.onSuccess(x);
        },
        onError: x => {
          compensation();
          ctx.onError(x);
        },
        onCancel: x => {
          compensation();
          ctx.onCancel(x);
        },
        cancelToken: ctx.cancelToken,
        trampoline: ctx.trampoline
      });
    });
  }
  TryWith(computation, catchHandler) {
    return protectedCont(ctx => {
      computation({
        onSuccess: ctx.onSuccess,
        onCancel: ctx.onCancel,
        cancelToken: ctx.cancelToken,
        trampoline: ctx.trampoline,
        onError: ex => {
          try {
            catchHandler(ex)(ctx);
          } catch (err) {
            ctx.onError((0,_Types_js__WEBPACK_IMPORTED_MODULE_0__.ensureErrorOrException)(err));
          }
        }
      });
    });
  }
  Using(resource, binder) {
    return this.TryFinally(binder(resource), () => resource.Dispose());
  }
  While(guard, computation) {
    if (guard()) {
      return this.Bind(computation, () => this.While(guard, computation));
    } else {
      return this.Return(void 0);
    }
  }
  Zero() {
    return protectedCont(ctx => ctx.onSuccess(void 0));
  }
}
const singleton = new AsyncBuilder();

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/BigInt.js":
/*!**************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/BigInt.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "divRem": () => (/* binding */ divRem),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "fromBigInt": () => (/* binding */ fromBigInt),
/* harmony export */   "fromBoolean": () => (/* binding */ fromBoolean),
/* harmony export */   "fromByteArray": () => (/* binding */ fromByteArray),
/* harmony export */   "fromChar": () => (/* binding */ fromChar),
/* harmony export */   "fromDecimal": () => (/* binding */ fromDecimal),
/* harmony export */   "fromFloat16": () => (/* binding */ fromFloat16),
/* harmony export */   "fromFloat32": () => (/* binding */ fromFloat32),
/* harmony export */   "fromFloat64": () => (/* binding */ fromFloat64),
/* harmony export */   "fromInt128": () => (/* binding */ fromInt128),
/* harmony export */   "fromInt16": () => (/* binding */ fromInt16),
/* harmony export */   "fromInt32": () => (/* binding */ fromInt32),
/* harmony export */   "fromInt64": () => (/* binding */ fromInt64),
/* harmony export */   "fromInt8": () => (/* binding */ fromInt8),
/* harmony export */   "fromNativeInt": () => (/* binding */ fromNativeInt),
/* harmony export */   "fromOne": () => (/* binding */ fromOne),
/* harmony export */   "fromString": () => (/* binding */ fromString),
/* harmony export */   "fromUInt128": () => (/* binding */ fromUInt128),
/* harmony export */   "fromUInt16": () => (/* binding */ fromUInt16),
/* harmony export */   "fromUInt32": () => (/* binding */ fromUInt32),
/* harmony export */   "fromUInt64": () => (/* binding */ fromUInt64),
/* harmony export */   "fromUInt8": () => (/* binding */ fromUInt8),
/* harmony export */   "fromUNativeInt": () => (/* binding */ fromUNativeInt),
/* harmony export */   "fromZero": () => (/* binding */ fromZero),
/* harmony export */   "getBitLength": () => (/* binding */ getBitLength),
/* harmony export */   "get_IsEven": () => (/* binding */ get_IsEven),
/* harmony export */   "get_IsOne": () => (/* binding */ get_IsOne),
/* harmony export */   "get_IsPowerOfTwo": () => (/* binding */ get_IsPowerOfTwo),
/* harmony export */   "get_IsZero": () => (/* binding */ get_IsZero),
/* harmony export */   "get_MinusOne": () => (/* binding */ get_MinusOne),
/* harmony export */   "get_One": () => (/* binding */ get_One),
/* harmony export */   "get_Sign": () => (/* binding */ get_Sign),
/* harmony export */   "get_Zero": () => (/* binding */ get_Zero),
/* harmony export */   "greatestCommonDivisor": () => (/* binding */ greatestCommonDivisor),
/* harmony export */   "hash": () => (/* binding */ hash),
/* harmony export */   "ilog2": () => (/* binding */ ilog2),
/* harmony export */   "isBigInt": () => (/* binding */ isBigInt),
/* harmony export */   "isEvenInteger": () => (/* binding */ isEvenInteger),
/* harmony export */   "isNegative": () => (/* binding */ isNegative),
/* harmony export */   "isOddInteger": () => (/* binding */ isOddInteger),
/* harmony export */   "isPositive": () => (/* binding */ isPositive),
/* harmony export */   "isPow2": () => (/* binding */ isPow2),
/* harmony export */   "ln": () => (/* binding */ ln),
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "log10": () => (/* binding */ log10),
/* harmony export */   "log2": () => (/* binding */ log2),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxMagnitude": () => (/* binding */ maxMagnitude),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minMagnitude": () => (/* binding */ minMagnitude),
/* harmony export */   "modPow": () => (/* binding */ modPow),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "op_Addition": () => (/* binding */ op_Addition),
/* harmony export */   "op_BitwiseAnd": () => (/* binding */ op_BitwiseAnd),
/* harmony export */   "op_BitwiseOr": () => (/* binding */ op_BitwiseOr),
/* harmony export */   "op_Division": () => (/* binding */ op_Division),
/* harmony export */   "op_Equality": () => (/* binding */ op_Equality),
/* harmony export */   "op_ExclusiveOr": () => (/* binding */ op_ExclusiveOr),
/* harmony export */   "op_GreaterThan": () => (/* binding */ op_GreaterThan),
/* harmony export */   "op_GreaterThanOrEqual": () => (/* binding */ op_GreaterThanOrEqual),
/* harmony export */   "op_Inequality": () => (/* binding */ op_Inequality),
/* harmony export */   "op_LeftShift": () => (/* binding */ op_LeftShift),
/* harmony export */   "op_LessThan": () => (/* binding */ op_LessThan),
/* harmony export */   "op_LessThanOrEqual": () => (/* binding */ op_LessThanOrEqual),
/* harmony export */   "op_LogicalNot": () => (/* binding */ op_LogicalNot),
/* harmony export */   "op_Modulus": () => (/* binding */ op_Modulus),
/* harmony export */   "op_Multiply": () => (/* binding */ op_Multiply),
/* harmony export */   "op_RightShift": () => (/* binding */ op_RightShift),
/* harmony export */   "op_Subtraction": () => (/* binding */ op_Subtraction),
/* harmony export */   "op_UnaryNegation": () => (/* binding */ op_UnaryNegation),
/* harmony export */   "op_UnaryPlus": () => (/* binding */ op_UnaryPlus),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "pow": () => (/* binding */ pow),
/* harmony export */   "remainder": () => (/* binding */ remainder),
/* harmony export */   "sign": () => (/* binding */ sign),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "toBigInt": () => (/* binding */ toBigInt),
/* harmony export */   "toBoolean": () => (/* binding */ toBoolean),
/* harmony export */   "toByteArray": () => (/* binding */ toByteArray),
/* harmony export */   "toChar": () => (/* binding */ toChar),
/* harmony export */   "toDecimal": () => (/* binding */ toDecimal),
/* harmony export */   "toFloat16": () => (/* binding */ toFloat16),
/* harmony export */   "toFloat32": () => (/* binding */ toFloat32),
/* harmony export */   "toFloat64": () => (/* binding */ toFloat64),
/* harmony export */   "toInt128": () => (/* binding */ toInt128),
/* harmony export */   "toInt16": () => (/* binding */ toInt16),
/* harmony export */   "toInt32": () => (/* binding */ toInt32),
/* harmony export */   "toInt64": () => (/* binding */ toInt64),
/* harmony export */   "toInt8": () => (/* binding */ toInt8),
/* harmony export */   "toNativeInt": () => (/* binding */ toNativeInt),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "toUInt128": () => (/* binding */ toUInt128),
/* harmony export */   "toUInt16": () => (/* binding */ toUInt16),
/* harmony export */   "toUInt32": () => (/* binding */ toUInt32),
/* harmony export */   "toUInt64": () => (/* binding */ toUInt64),
/* harmony export */   "toUInt8": () => (/* binding */ toUInt8),
/* harmony export */   "toUNativeInt": () => (/* binding */ toUNativeInt),
/* harmony export */   "tryParse": () => (/* binding */ tryParse)
/* harmony export */ });
/* harmony import */ var _Decimal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Decimal.js */ "./src/Main/fable_modules/fable-library.4.1.4/Decimal.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");


const isBigEndian = false;
BigInt.prototype.toJSON = function () {
  return `${this.toString()}`;
};
const zero = 0n;
const one = 1n;
const two = 2n;
const minusOne = -1n;
function isBigInt(x) {
  return typeof x === "bigint";
}
function hash(x) {
  return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.bigintHash)(x);
}
function equals(x, y) {
  return x === y;
}
function compare(x, y) {
  return x < y ? -1 : x > y ? 1 : 0;
}
function abs(x) {
  return x < zero ? -x : x;
}
function sign(x) {
  return x < zero ? -1 : x > zero ? 1 : 0;
}
function max(x, y) {
  return x > y ? x : y;
}
function min(x, y) {
  return x < y ? x : y;
}
function maxMagnitude(x, y) {
  return abs(x) > abs(y) ? x : y;
}
function minMagnitude(x, y) {
  return abs(x) < abs(y) ? x : y;
}
function clamp(x, min, max) {
  return x < min ? min : x > max ? max : x;
}
function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  return x / y;
}
function remainder(x, y) {
  return x % y;
}
function negate(x) {
  return -x;
}
function op_UnaryNegation(x) {
  return -x;
}
function op_LogicalNot(x) {
  return ~x;
}
function op_UnaryPlus(x) {
  return x;
}
function op_Addition(x, y) {
  return x + y;
}
function op_Subtraction(x, y) {
  return x - y;
}
function op_Multiply(x, y) {
  return x * y;
}
function op_Division(x, y) {
  return x / y;
}
function op_Modulus(x, y) {
  return x % y;
}
function op_RightShift(x, n) {
  return x >> BigInt(n);
}
function op_LeftShift(x, n) {
  return x << BigInt(n);
}
function op_BitwiseAnd(x, y) {
  return x & y;
}
function op_BitwiseOr(x, y) {
  return x | y;
}
function op_ExclusiveOr(x, y) {
  return x ^ y;
}
function op_LessThan(x, y) {
  return x < y;
}
function op_LessThanOrEqual(x, y) {
  return x <= y;
}
function op_GreaterThan(x, y) {
  return x > y;
}
function op_GreaterThanOrEqual(x, y) {
  return x >= y;
}
function op_Equality(x, y) {
  return x === y;
}
function op_Inequality(x, y) {
  return x !== y;
}
function get_Zero() {
  return zero;
}
function get_One() {
  return one;
}
function get_MinusOne() {
  return minusOne;
}
function get_IsZero(x) {
  return x === zero;
}
function get_IsOne(x) {
  return x === one;
}
function get_IsEven(x) {
  return isEvenInteger(x);
}
function get_IsPowerOfTwo(x) {
  return isPow2(x);
}
function get_Sign(x) {
  return sign(x);
}
function isNegative(x) {
  return x < zero;
}
function isPositive(x) {
  return x > zero;
}
function isEvenInteger(x) {
  return x % two === zero;
}
function isOddInteger(x) {
  return x % two !== zero;
}
function isPow2(x) {
  return (x & x - one) === zero;
}
function fromZero() {
  return zero;
}
function fromOne() {
  return one;
}
function fromInt8(n) {
  return BigInt(n);
}
function fromUInt8(n) {
  return BigInt(n);
}
function fromInt16(n) {
  return BigInt(n);
}
function fromUInt16(n) {
  return BigInt(n);
}
function fromInt32(n) {
  return BigInt(n);
}
function fromUInt32(n) {
  return BigInt(n);
}
function fromInt64(n) {
  return n;
}
function fromUInt64(n) {
  return n;
}
function fromInt128(n) {
  return n;
}
function fromUInt128(n) {
  return n;
}
function fromNativeInt(n) {
  return n;
}
function fromUNativeInt(n) {
  return n;
}
function fromFloat16(n) {
  return BigInt(Math.trunc(n));
}
function fromFloat32(n) {
  return BigInt(Math.trunc(n));
}
function fromFloat64(n) {
  return BigInt(Math.trunc(n));
}
function fromDecimal(d) {
  return BigInt((0,_Decimal_js__WEBPACK_IMPORTED_MODULE_1__.truncate)(d).toString());
}
function fromBigInt(x) {
  return x;
}
function fromBoolean(b) {
  return BigInt(b);
}
function fromChar(c) {
  return BigInt(c.charCodeAt(0));
}
function fromString(s) {
  return BigInt(s);
}
function fromByteArray(bytes) {
  return fromSignedBytes(bytes, isBigEndian);
}
function toByteArray(value) {
  return toSignedBytes(value, isBigEndian);
}
function toInt8(x) {
  return Number(BigInt.asIntN(8, x));
}
function toUInt8(x) {
  return Number(BigInt.asUintN(8, x));
}
function toInt16(x) {
  return Number(BigInt.asIntN(16, x));
}
function toUInt16(x) {
  return Number(BigInt.asUintN(16, x));
}
function toInt32(x) {
  return Number(BigInt.asIntN(32, x));
}
function toUInt32(x) {
  return Number(BigInt.asUintN(32, x));
}
function toInt64(x) {
  return BigInt.asIntN(64, x);
}
function toUInt64(x) {
  return BigInt.asUintN(64, x);
}
function toInt128(x) {
  return BigInt.asIntN(128, x);
}
function toUInt128(x) {
  return BigInt.asUintN(128, x);
}
function toNativeInt(x) {
  return BigInt.asIntN(64, x);
}
function toUNativeInt(x) {
  return BigInt.asUintN(64, x);
}
function toFloat16(x) {
  return Number(x);
}
function toFloat32(x) {
  return Number(x);
}
function toFloat64(x) {
  return Number(x);
}
function toDecimal(x) {
  const low = Number(BigInt.asUintN(32, x));
  const mid = Number(BigInt.asUintN(32, x >> 32n));
  const high = Number(BigInt.asUintN(32, x >> 64n));
  const isNegative = x < zero;
  const scale = 0;
  return (0,_Decimal_js__WEBPACK_IMPORTED_MODULE_1__.fromParts)(low, mid, high, isNegative, scale);
}
function toBigInt(x) {
  return x;
}
function toBoolean(x) {
  return x !== zero;
}
function toChar(x) {
  return String.fromCharCode(toUInt16(x));
}
function toString(x) {
  return x.toString();
}
function tryParse(s, res) {
  try {
    res.contents = BigInt(s);
    return true;
  } catch (err) {
    return false;
  }
}
function parse(s) {
  return BigInt(s);
}
function pow(x, n) {
  return x ** BigInt(n);
}
function modPow(x, e, m) {
  return x ** e % m;
}
function divRem(x, y, out) {
  const div = x / y;
  const rem = x % y;
  if (out === void 0) {
    return [div, rem];
  } else {
    out.contents = rem;
    return div;
  }
}
function greatestCommonDivisor(x, y) {
  while (y > zero) {
    const q = x / y;
    const r = x - q * y;
    x = y;
    y = r;
  }
  return x;
}
function getBitLength(x) {
  return fromFloat64(x === zero ? 1 : log2(abs(x)) + 1);
}
function log2(x) {
  const n = Number(x);
  if (Number.isFinite(n)) return Math.log2(n); // fast path
  if (x < zero) return Number.NaN;
  let shift = one;
  while (x >= one << shift) {
    shift = shift << one;
  }
  let log = zero;
  while (shift > one) {
    shift = shift >> one;
    if (x >= one << shift) {
      log = log + shift;
      x = x >> shift;
    }
  }
  return Number(log);
}
function log10(x) {
  return log2(x) * Math.log10(2);
}
function ln(x) {
  return log2(x) * Math.log(2);
}
function log(x, base) {
  return log2(x) / Math.log2(base);
}
function ilog2(x) {
  return BigInt(log2(x));
}
// export function copySign
// export function createChecked
// export function createSaturating
// export function createTruncating
// export function getByteCount
// export function leadingZeroCount
// export function popCount
// export function rotateLeft
// export function rotateRight
// export function trailingZeroCount
// export function tryFormat
// export function tryWriteBytes
// -------------------------------------------------
// Binary serialization
// -------------------------------------------------
const hexCodes = new Uint8Array([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]);
function fromHexCode(code) {
  if (48 <= code && code <= 57) return code - 48;
  if (97 <= code && code <= 102) return code - 97 + 10;
  if (65 <= code && code <= 70) return code - 65 + 10;
  throw Error(`Invalid hex code: ${code}`);
}
function toSignedBytes(x, isBigEndian) {
  const isNeg = x < 0n;
  if (isNeg) {
    const len = log2(-x);
    const bits = len + (8 - len % 8);
    const pow2 = 1n << BigInt(bits);
    x = x + pow2; // two's complement
  }
  const hex = x.toString(16);
  const len = hex.length;
  const odd = len % 2;
  const first = hex.charCodeAt(0);
  const isLow = 48 <= first && first <= 55; // 0..7
  const start = isNeg && isLow || !isNeg && !isLow ? 1 : 0;
  const bytes = new Uint8Array(start + (len + odd) / 2);
  const inc = isBigEndian ? 1 : -1;
  let pos = isBigEndian ? 0 : bytes.length - 1;
  if (start > 0) {
    bytes[pos] = isNeg ? 255 : 0;
    pos += inc;
  }
  if (odd > 0) {
    bytes[pos] = fromHexCode(first);
    pos += inc;
  }
  for (let i = odd; i < len; i += 2, pos += inc) {
    const a = fromHexCode(hex.charCodeAt(i));
    const b = fromHexCode(hex.charCodeAt(i + 1));
    bytes[pos] = a << 4 | b;
  }
  return bytes;
}
function fromSignedBytes(bytes, isBigEndian) {
  if (bytes == null) {
    throw new Error("bytes is null");
  }
  const len = bytes.length;
  const first = isBigEndian ? 0 : len - 1;
  const isNeg = bytes[first] > 127;
  const codes = new Uint16Array(len * 2 + 2);
  codes[0] = 48; // 0
  codes[1] = 120; // x
  const inc = isBigEndian ? 1 : -1;
  let pos = isBigEndian ? 0 : len - 1;
  for (let i = 0; i < bytes.length; i++, pos += inc) {
    const byte = bytes[pos];
    codes[2 * i + 2] = hexCodes[byte >> 4];
    codes[2 * i + 3] = hexCodes[byte & 15];
  }
  const str = String.fromCharCode.apply(null, codes);
  let x = BigInt(str);
  if (isNeg) {
    const bits = len * 8;
    const pow2 = 1n << BigInt(bits);
    x = x - pow2; // two's complement
  }
  return x;
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Choice.js":
/*!**************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Choice.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Choice_makeChoice1Of2": () => (/* binding */ Choice_makeChoice1Of2),
/* harmony export */   "Choice_makeChoice2Of2": () => (/* binding */ Choice_makeChoice2Of2),
/* harmony export */   "Choice_tryValueIfChoice1Of2": () => (/* binding */ Choice_tryValueIfChoice1Of2),
/* harmony export */   "Choice_tryValueIfChoice2Of2": () => (/* binding */ Choice_tryValueIfChoice2Of2),
/* harmony export */   "FSharpChoice$2": () => (/* binding */ FSharpChoice$2),
/* harmony export */   "FSharpChoice$2_$reflection": () => (/* binding */ FSharpChoice$2_$reflection),
/* harmony export */   "FSharpChoice$2_Choice1Of2": () => (/* binding */ FSharpChoice$2_Choice1Of2),
/* harmony export */   "FSharpChoice$2_Choice2Of2": () => (/* binding */ FSharpChoice$2_Choice2Of2),
/* harmony export */   "FSharpChoice$3": () => (/* binding */ FSharpChoice$3),
/* harmony export */   "FSharpChoice$3_$reflection": () => (/* binding */ FSharpChoice$3_$reflection),
/* harmony export */   "FSharpChoice$3_Choice1Of3": () => (/* binding */ FSharpChoice$3_Choice1Of3),
/* harmony export */   "FSharpChoice$3_Choice2Of3": () => (/* binding */ FSharpChoice$3_Choice2Of3),
/* harmony export */   "FSharpChoice$3_Choice3Of3": () => (/* binding */ FSharpChoice$3_Choice3Of3),
/* harmony export */   "FSharpChoice$4": () => (/* binding */ FSharpChoice$4),
/* harmony export */   "FSharpChoice$4_$reflection": () => (/* binding */ FSharpChoice$4_$reflection),
/* harmony export */   "FSharpChoice$4_Choice1Of4": () => (/* binding */ FSharpChoice$4_Choice1Of4),
/* harmony export */   "FSharpChoice$4_Choice2Of4": () => (/* binding */ FSharpChoice$4_Choice2Of4),
/* harmony export */   "FSharpChoice$4_Choice3Of4": () => (/* binding */ FSharpChoice$4_Choice3Of4),
/* harmony export */   "FSharpChoice$4_Choice4Of4": () => (/* binding */ FSharpChoice$4_Choice4Of4),
/* harmony export */   "FSharpChoice$5": () => (/* binding */ FSharpChoice$5),
/* harmony export */   "FSharpChoice$5_$reflection": () => (/* binding */ FSharpChoice$5_$reflection),
/* harmony export */   "FSharpChoice$5_Choice1Of5": () => (/* binding */ FSharpChoice$5_Choice1Of5),
/* harmony export */   "FSharpChoice$5_Choice2Of5": () => (/* binding */ FSharpChoice$5_Choice2Of5),
/* harmony export */   "FSharpChoice$5_Choice3Of5": () => (/* binding */ FSharpChoice$5_Choice3Of5),
/* harmony export */   "FSharpChoice$5_Choice4Of5": () => (/* binding */ FSharpChoice$5_Choice4Of5),
/* harmony export */   "FSharpChoice$5_Choice5Of5": () => (/* binding */ FSharpChoice$5_Choice5Of5),
/* harmony export */   "FSharpChoice$6": () => (/* binding */ FSharpChoice$6),
/* harmony export */   "FSharpChoice$6_$reflection": () => (/* binding */ FSharpChoice$6_$reflection),
/* harmony export */   "FSharpChoice$6_Choice1Of6": () => (/* binding */ FSharpChoice$6_Choice1Of6),
/* harmony export */   "FSharpChoice$6_Choice2Of6": () => (/* binding */ FSharpChoice$6_Choice2Of6),
/* harmony export */   "FSharpChoice$6_Choice3Of6": () => (/* binding */ FSharpChoice$6_Choice3Of6),
/* harmony export */   "FSharpChoice$6_Choice4Of6": () => (/* binding */ FSharpChoice$6_Choice4Of6),
/* harmony export */   "FSharpChoice$6_Choice5Of6": () => (/* binding */ FSharpChoice$6_Choice5Of6),
/* harmony export */   "FSharpChoice$6_Choice6Of6": () => (/* binding */ FSharpChoice$6_Choice6Of6),
/* harmony export */   "FSharpChoice$7": () => (/* binding */ FSharpChoice$7),
/* harmony export */   "FSharpChoice$7_$reflection": () => (/* binding */ FSharpChoice$7_$reflection),
/* harmony export */   "FSharpChoice$7_Choice1Of7": () => (/* binding */ FSharpChoice$7_Choice1Of7),
/* harmony export */   "FSharpChoice$7_Choice2Of7": () => (/* binding */ FSharpChoice$7_Choice2Of7),
/* harmony export */   "FSharpChoice$7_Choice3Of7": () => (/* binding */ FSharpChoice$7_Choice3Of7),
/* harmony export */   "FSharpChoice$7_Choice4Of7": () => (/* binding */ FSharpChoice$7_Choice4Of7),
/* harmony export */   "FSharpChoice$7_Choice5Of7": () => (/* binding */ FSharpChoice$7_Choice5Of7),
/* harmony export */   "FSharpChoice$7_Choice6Of7": () => (/* binding */ FSharpChoice$7_Choice6Of7),
/* harmony export */   "FSharpChoice$7_Choice7Of7": () => (/* binding */ FSharpChoice$7_Choice7Of7),
/* harmony export */   "FSharpResult$2": () => (/* binding */ FSharpResult$2),
/* harmony export */   "FSharpResult$2_$reflection": () => (/* binding */ FSharpResult$2_$reflection),
/* harmony export */   "FSharpResult$2_Error": () => (/* binding */ FSharpResult$2_Error),
/* harmony export */   "FSharpResult$2_Ok": () => (/* binding */ FSharpResult$2_Ok),
/* harmony export */   "Result_Bind": () => (/* binding */ Result_Bind),
/* harmony export */   "Result_Map": () => (/* binding */ Result_Map),
/* harmony export */   "Result_MapError": () => (/* binding */ Result_MapError)
/* harmony export */ });
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types.js */ "./src/Main/fable_modules/fable-library.4.1.4/Types.js");
/* harmony import */ var _Reflection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reflection.js */ "./src/Main/fable_modules/fable-library.4.1.4/Reflection.js");
/* harmony import */ var _Option_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Option.js */ "./src/Main/fable_modules/fable-library.4.1.4/Option.js");



function FSharpResult$2_Ok(ResultValue) {
  return new FSharpResult$2(0, [ResultValue]);
}
function FSharpResult$2_Error(ErrorValue) {
  return new FSharpResult$2(1, [ErrorValue]);
}
class FSharpResult$2 extends _Types_js__WEBPACK_IMPORTED_MODULE_0__.Union {
  constructor(tag, fields) {
    super();
    this.tag = tag;
    this.fields = fields;
  }
  cases() {
    return ["Ok", "Error"];
  }
}
function FSharpResult$2_$reflection(gen0, gen1) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_1__.union_type)("FSharp.Core.FSharpResult`2", [gen0, gen1], FSharpResult$2, () => [[["ResultValue", gen0]], [["ErrorValue", gen1]]]);
}
function Result_Map(mapping, result) {
  if (result.tag === /* Ok */0) {
    return FSharpResult$2_Ok(mapping(result.fields[0]));
  } else {
    return FSharpResult$2_Error(result.fields[0]);
  }
}
function Result_MapError(mapping, result) {
  if (result.tag === /* Ok */0) {
    return FSharpResult$2_Ok(result.fields[0]);
  } else {
    return FSharpResult$2_Error(mapping(result.fields[0]));
  }
}
function Result_Bind(binder, result) {
  if (result.tag === /* Ok */0) {
    return binder(result.fields[0]);
  } else {
    return FSharpResult$2_Error(result.fields[0]);
  }
}
function FSharpChoice$2_Choice1Of2(Item) {
  return new FSharpChoice$2(0, [Item]);
}
function FSharpChoice$2_Choice2Of2(Item) {
  return new FSharpChoice$2(1, [Item]);
}
class FSharpChoice$2 extends _Types_js__WEBPACK_IMPORTED_MODULE_0__.Union {
  constructor(tag, fields) {
    super();
    this.tag = tag;
    this.fields = fields;
  }
  cases() {
    return ["Choice1Of2", "Choice2Of2"];
  }
}
function FSharpChoice$2_$reflection(gen0, gen1) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_1__.union_type)("FSharp.Core.FSharpChoice`2", [gen0, gen1], FSharpChoice$2, () => [[["Item", gen0]], [["Item", gen1]]]);
}
function FSharpChoice$3_Choice1Of3(Item) {
  return new FSharpChoice$3(0, [Item]);
}
function FSharpChoice$3_Choice2Of3(Item) {
  return new FSharpChoice$3(1, [Item]);
}
function FSharpChoice$3_Choice3Of3(Item) {
  return new FSharpChoice$3(2, [Item]);
}
class FSharpChoice$3 extends _Types_js__WEBPACK_IMPORTED_MODULE_0__.Union {
  constructor(tag, fields) {
    super();
    this.tag = tag;
    this.fields = fields;
  }
  cases() {
    return ["Choice1Of3", "Choice2Of3", "Choice3Of3"];
  }
}
function FSharpChoice$3_$reflection(gen0, gen1, gen2) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_1__.union_type)("FSharp.Core.FSharpChoice`3", [gen0, gen1, gen2], FSharpChoice$3, () => [[["Item", gen0]], [["Item", gen1]], [["Item", gen2]]]);
}
function FSharpChoice$4_Choice1Of4(Item) {
  return new FSharpChoice$4(0, [Item]);
}
function FSharpChoice$4_Choice2Of4(Item) {
  return new FSharpChoice$4(1, [Item]);
}
function FSharpChoice$4_Choice3Of4(Item) {
  return new FSharpChoice$4(2, [Item]);
}
function FSharpChoice$4_Choice4Of4(Item) {
  return new FSharpChoice$4(3, [Item]);
}
class FSharpChoice$4 extends _Types_js__WEBPACK_IMPORTED_MODULE_0__.Union {
  constructor(tag, fields) {
    super();
    this.tag = tag;
    this.fields = fields;
  }
  cases() {
    return ["Choice1Of4", "Choice2Of4", "Choice3Of4", "Choice4Of4"];
  }
}
function FSharpChoice$4_$reflection(gen0, gen1, gen2, gen3) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_1__.union_type)("FSharp.Core.FSharpChoice`4", [gen0, gen1, gen2, gen3], FSharpChoice$4, () => [[["Item", gen0]], [["Item", gen1]], [["Item", gen2]], [["Item", gen3]]]);
}
function FSharpChoice$5_Choice1Of5(Item) {
  return new FSharpChoice$5(0, [Item]);
}
function FSharpChoice$5_Choice2Of5(Item) {
  return new FSharpChoice$5(1, [Item]);
}
function FSharpChoice$5_Choice3Of5(Item) {
  return new FSharpChoice$5(2, [Item]);
}
function FSharpChoice$5_Choice4Of5(Item) {
  return new FSharpChoice$5(3, [Item]);
}
function FSharpChoice$5_Choice5Of5(Item) {
  return new FSharpChoice$5(4, [Item]);
}
class FSharpChoice$5 extends _Types_js__WEBPACK_IMPORTED_MODULE_0__.Union {
  constructor(tag, fields) {
    super();
    this.tag = tag;
    this.fields = fields;
  }
  cases() {
    return ["Choice1Of5", "Choice2Of5", "Choice3Of5", "Choice4Of5", "Choice5Of5"];
  }
}
function FSharpChoice$5_$reflection(gen0, gen1, gen2, gen3, gen4) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_1__.union_type)("FSharp.Core.FSharpChoice`5", [gen0, gen1, gen2, gen3, gen4], FSharpChoice$5, () => [[["Item", gen0]], [["Item", gen1]], [["Item", gen2]], [["Item", gen3]], [["Item", gen4]]]);
}
function FSharpChoice$6_Choice1Of6(Item) {
  return new FSharpChoice$6(0, [Item]);
}
function FSharpChoice$6_Choice2Of6(Item) {
  return new FSharpChoice$6(1, [Item]);
}
function FSharpChoice$6_Choice3Of6(Item) {
  return new FSharpChoice$6(2, [Item]);
}
function FSharpChoice$6_Choice4Of6(Item) {
  return new FSharpChoice$6(3, [Item]);
}
function FSharpChoice$6_Choice5Of6(Item) {
  return new FSharpChoice$6(4, [Item]);
}
function FSharpChoice$6_Choice6Of6(Item) {
  return new FSharpChoice$6(5, [Item]);
}
class FSharpChoice$6 extends _Types_js__WEBPACK_IMPORTED_MODULE_0__.Union {
  constructor(tag, fields) {
    super();
    this.tag = tag;
    this.fields = fields;
  }
  cases() {
    return ["Choice1Of6", "Choice2Of6", "Choice3Of6", "Choice4Of6", "Choice5Of6", "Choice6Of6"];
  }
}
function FSharpChoice$6_$reflection(gen0, gen1, gen2, gen3, gen4, gen5) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_1__.union_type)("FSharp.Core.FSharpChoice`6", [gen0, gen1, gen2, gen3, gen4, gen5], FSharpChoice$6, () => [[["Item", gen0]], [["Item", gen1]], [["Item", gen2]], [["Item", gen3]], [["Item", gen4]], [["Item", gen5]]]);
}
function FSharpChoice$7_Choice1Of7(Item) {
  return new FSharpChoice$7(0, [Item]);
}
function FSharpChoice$7_Choice2Of7(Item) {
  return new FSharpChoice$7(1, [Item]);
}
function FSharpChoice$7_Choice3Of7(Item) {
  return new FSharpChoice$7(2, [Item]);
}
function FSharpChoice$7_Choice4Of7(Item) {
  return new FSharpChoice$7(3, [Item]);
}
function FSharpChoice$7_Choice5Of7(Item) {
  return new FSharpChoice$7(4, [Item]);
}
function FSharpChoice$7_Choice6Of7(Item) {
  return new FSharpChoice$7(5, [Item]);
}
function FSharpChoice$7_Choice7Of7(Item) {
  return new FSharpChoice$7(6, [Item]);
}
class FSharpChoice$7 extends _Types_js__WEBPACK_IMPORTED_MODULE_0__.Union {
  constructor(tag, fields) {
    super();
    this.tag = tag;
    this.fields = fields;
  }
  cases() {
    return ["Choice1Of7", "Choice2Of7", "Choice3Of7", "Choice4Of7", "Choice5Of7", "Choice6Of7", "Choice7Of7"];
  }
}
function FSharpChoice$7_$reflection(gen0, gen1, gen2, gen3, gen4, gen5, gen6) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_1__.union_type)("FSharp.Core.FSharpChoice`7", [gen0, gen1, gen2, gen3, gen4, gen5, gen6], FSharpChoice$7, () => [[["Item", gen0]], [["Item", gen1]], [["Item", gen2]], [["Item", gen3]], [["Item", gen4]], [["Item", gen5]], [["Item", gen6]]]);
}
function Choice_makeChoice1Of2(x) {
  return FSharpChoice$2_Choice1Of2(x);
}
function Choice_makeChoice2Of2(x) {
  return FSharpChoice$2_Choice2Of2(x);
}
function Choice_tryValueIfChoice1Of2(x) {
  if (x.tag === /* Choice1Of2 */0) {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(x.fields[0]);
  } else {
    return void 0;
  }
}
function Choice_tryValueIfChoice2Of2(x) {
  if (x.tag === /* Choice2Of2 */1) {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(x.fields[0]);
  } else {
    return void 0;
  }
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Date.js":
/*!************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Date.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateTime": () => (/* binding */ DateTime),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "addDays": () => (/* binding */ addDays),
/* harmony export */   "addHours": () => (/* binding */ addHours),
/* harmony export */   "addMilliseconds": () => (/* binding */ addMilliseconds),
/* harmony export */   "addMinutes": () => (/* binding */ addMinutes),
/* harmony export */   "addMonths": () => (/* binding */ addMonths),
/* harmony export */   "addSeconds": () => (/* binding */ addSeconds),
/* harmony export */   "addTicks": () => (/* binding */ addTicks),
/* harmony export */   "addYears": () => (/* binding */ addYears),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "compareTo": () => (/* binding */ compareTo),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "date": () => (/* binding */ date),
/* harmony export */   "dateOffsetToString": () => (/* binding */ dateOffsetToString),
/* harmony export */   "dateToHalfUTCString": () => (/* binding */ dateToHalfUTCString),
/* harmony export */   "day": () => (/* binding */ day),
/* harmony export */   "dayOfWeek": () => (/* binding */ dayOfWeek),
/* harmony export */   "dayOfYear": () => (/* binding */ dayOfYear),
/* harmony export */   "daysInMonth": () => (/* binding */ daysInMonth),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "fromDateTimeOffset": () => (/* binding */ fromDateTimeOffset),
/* harmony export */   "fromTicks": () => (/* binding */ fromTicks),
/* harmony export */   "getTicks": () => (/* binding */ getTicks),
/* harmony export */   "hour": () => (/* binding */ hour),
/* harmony export */   "isDaylightSavingTime": () => (/* binding */ isDaylightSavingTime),
/* harmony export */   "isLeapYear": () => (/* binding */ isLeapYear),
/* harmony export */   "kind": () => (/* binding */ kind),
/* harmony export */   "maxValue": () => (/* binding */ maxValue),
/* harmony export */   "millisecond": () => (/* binding */ millisecond),
/* harmony export */   "minValue": () => (/* binding */ minValue),
/* harmony export */   "minute": () => (/* binding */ minute),
/* harmony export */   "month": () => (/* binding */ month),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "op_Addition": () => (/* binding */ op_Addition),
/* harmony export */   "op_Subtraction": () => (/* binding */ op_Subtraction),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "parseRaw": () => (/* binding */ parseRaw),
/* harmony export */   "second": () => (/* binding */ second),
/* harmony export */   "specifyKind": () => (/* binding */ specifyKind),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "ticksToUnixEpochMilliseconds": () => (/* binding */ ticksToUnixEpochMilliseconds),
/* harmony export */   "timeOfDay": () => (/* binding */ timeOfDay),
/* harmony export */   "toLocalTime": () => (/* binding */ toLocalTime),
/* harmony export */   "toLongDateString": () => (/* binding */ toLongDateString),
/* harmony export */   "toLongTimeString": () => (/* binding */ toLongTimeString),
/* harmony export */   "toShortDateString": () => (/* binding */ toShortDateString),
/* harmony export */   "toShortTimeString": () => (/* binding */ toShortTimeString),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "toUniversalTime": () => (/* binding */ toUniversalTime),
/* harmony export */   "today": () => (/* binding */ today),
/* harmony export */   "tryParse": () => (/* binding */ tryParse),
/* harmony export */   "unixEpochMillisecondsToTicks": () => (/* binding */ unixEpochMillisecondsToTicks),
/* harmony export */   "utcNow": () => (/* binding */ utcNow),
/* harmony export */   "year": () => (/* binding */ year)
/* harmony export */ });
/* harmony import */ var _BigInt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BigInt.js */ "./src/Main/fable_modules/fable-library.4.1.4/BigInt.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");
/**
 * DateTimeOffset functions.
 *
 * Note: Date instances are always DateObjects in local
 * timezone (because JS dates are all kinds of messed up).
 * A local date returns UTC epoch when `.getTime()` is called.
 *
 * Basically; invariant: date.getTime() always return UTC time.
 */


function kind(value) {
  return value.kind || 0;
}
function unixEpochMillisecondsToTicks(ms, offset) {
  return (0,_BigInt_js__WEBPACK_IMPORTED_MODULE_0__.toInt64)((BigInt(ms) + 62135596800000n + BigInt(offset)) * 10000n);
}
function ticksToUnixEpochMilliseconds(ticks) {
  return Number(BigInt(ticks) / 10000n - 62135596800000n);
}
function dateOffsetToString(offset) {
  const isMinus = offset < 0;
  offset = Math.abs(offset);
  const hours = ~~(offset / 3600000);
  const minutes = offset % 3600000 / 60000;
  return (isMinus ? "-" : "+") + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(hours, 2) + ":" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(minutes, 2);
}
function dateToHalfUTCString(date, half) {
  const str = date.toISOString();
  return half === "first" ? str.substring(0, str.indexOf("T")) : str.substring(str.indexOf("T") + 1, str.length - 1);
}
function dateToISOString(d, utc) {
  if (utc) {
    return d.toISOString();
  } else {
    // JS Date is always local
    const printOffset = d.kind == null ? true : d.kind === 2 /* DateKind.Local */;
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getFullYear(), 4) + "-" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getMonth() + 1, 2) + "-" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getDate(), 2) + "T" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getHours(), 2) + ":" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getMinutes(), 2) + ":" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getSeconds(), 2) + "." + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getMilliseconds(), 3) + (printOffset ? dateOffsetToString(d.getTimezoneOffset() * -60000) : "");
  }
}
function dateToISOStringWithOffset(dateWithOffset, offset) {
  const str = dateWithOffset.toISOString();
  return str.substring(0, str.length - 1) + dateOffsetToString(offset);
}
function dateToStringWithCustomFormat(date, format, utc) {
  return format.replace(/(\w)\1*/g, match => {
    let rep = Number.NaN;
    switch (match.substring(0, 1)) {
      case "y":
        const y = utc ? date.getUTCFullYear() : date.getFullYear();
        rep = match.length < 4 ? y % 100 : y;
        break;
      case "M":
        rep = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
        break;
      case "d":
        rep = utc ? date.getUTCDate() : date.getDate();
        break;
      case "H":
        rep = utc ? date.getUTCHours() : date.getHours();
        break;
      case "h":
        const h = utc ? date.getUTCHours() : date.getHours();
        rep = h > 12 ? h % 12 : h;
        break;
      case "m":
        rep = utc ? date.getUTCMinutes() : date.getMinutes();
        break;
      case "s":
        rep = utc ? date.getUTCSeconds() : date.getSeconds();
        break;
      case "f":
        rep = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
        break;
    }
    if (Number.isNaN(rep)) {
      return match;
    } else {
      return (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(rep, match.length);
    }
  });
}
function dateToStringWithOffset(date, format) {
  const d = new Date(date.getTime() + (date.offset ?? 0));
  if (typeof format !== "string") {
    return d.toISOString().replace(/\.\d+/, "").replace(/[A-Z]|\.\d+/g, " ") + dateOffsetToString(date.offset ?? 0);
  } else if (format.length === 1) {
    switch (format) {
      case "D":
      case "d":
        return dateToHalfUTCString(d, "first");
      case "T":
      case "t":
        return dateToHalfUTCString(d, "second");
      case "O":
      case "o":
        return dateToISOStringWithOffset(d, date.offset ?? 0);
      default:
        throw new Error("Unrecognized Date print format");
    }
  } else {
    return dateToStringWithCustomFormat(d, format, true);
  }
}
function dateToStringWithKind(date, format) {
  const utc = date.kind === 1 /* DateKind.UTC */;
  if (typeof format !== "string") {
    return utc ? date.toUTCString() : date.toLocaleString();
  } else if (format.length === 1) {
    switch (format) {
      case "D":
      case "d":
        return utc ? dateToHalfUTCString(date, "first") : date.toLocaleDateString();
      case "T":
      case "t":
        return utc ? dateToHalfUTCString(date, "second") : date.toLocaleTimeString();
      case "O":
      case "o":
        return dateToISOString(date, utc);
      default:
        throw new Error("Unrecognized Date print format");
    }
  } else {
    return dateToStringWithCustomFormat(date, format, utc);
  }
}
function toString(date, format, _provider) {
  return date.offset != null ? dateToStringWithOffset(date, format) : dateToStringWithKind(date, format);
}
function DateTime(value, kind) {
  const d = new Date(value);
  d.kind = (kind == null ? 0 /* DateKind.Unspecified */ : kind) | 0;
  return d;
}
function fromTicks(ticks, kind) {
  kind = kind != null ? kind : 2 /* DateKind.Local */; // better default than Unspecified
  let date = DateTime(ticksToUnixEpochMilliseconds(ticks), kind);
  // Ticks are local to offset (in this case, either UTC or Local/Unknown).
  // If kind is anything but UTC, that means that the tick number was not
  // in utc, thus getTime() cannot return UTC, and needs to be shifted.
  if (kind !== 1 /* DateKind.UTC */) {
    date = DateTime(date.getTime() - (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.dateOffset)(date), kind);
  }
  return date;
}
function fromDateTimeOffset(date, kind) {
  switch (kind) {
    case 1 /* DateKind.UTC */:
      return DateTime(date.getTime(), 1 /* DateKind.UTC */);
    case 2 /* DateKind.Local */:
      return DateTime(date.getTime(), 2 /* DateKind.Local */);
    default:
      const d = DateTime(date.getTime() + (date.offset ?? 0), kind);
      return DateTime(d.getTime() - (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.dateOffset)(d), kind);
  }
}
function getTicks(date) {
  return unixEpochMillisecondsToTicks(date.getTime(), (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.dateOffset)(date));
}
function minValue() {
  // This is "0001-01-01T00:00:00.000Z", actual JS min value is -8640000000000000
  return DateTime(-62135596800000, 0 /* DateKind.Unspecified */);
}
function maxValue() {
  // This is "9999-12-31T23:59:59.999Z", actual JS max value is 8640000000000000
  return DateTime(253402300799999, 0 /* DateKind.Unspecified */);
}
function parseRaw(input) {
  function fail() {
    throw new Error(`The string is not a valid Date: ${input}`);
  }
  if (input == null || input.trim() === "") {
    fail();
  }
  // ISO dates without TZ are parsed as UTC. Adding time without TZ keeps them local.
  if (input.length === 10 && input[4] === "-" && input[7] === "-") {
    input += "T00:00:00";
  }
  let date = new Date(input);
  let offset = null;
  if (isNaN(date.getTime())) {
    // Try to check strings JS Date cannot parse (see #1045, #1422)
    // tslint:disable-next-line:max-line-length
    const m = /^\s*(\d+[^\w\s:]\d+[^\w\s:]\d+)?\s*(\d+:\d+(?::\d+(?:\.\d+)?)?)?\s*([AaPp][Mm])?\s*(Z|[+-]([01]?\d):?([0-5]?\d)?)?\s*$/.exec(input);
    if (m != null) {
      let baseDate;
      let timeInSeconds = 0;
      if (m[2] != null) {
        const timeParts = m[2].split(":");
        timeInSeconds = parseInt(timeParts[0], 10) * 3600 + parseInt(timeParts[1] || "0", 10) * 60 + parseFloat(timeParts[2] || "0");
        if (m[3] != null && m[3].toUpperCase() === "PM") {
          timeInSeconds += 720;
        }
      }
      if (m[4] != null) {
        // There's an offset, parse as UTC
        if (m[1] != null) {
          baseDate = new Date(m[1] + " UTC");
        } else {
          const d = new Date();
          baseDate = new Date(d.getUTCFullYear() + "/" + (d.getUTCMonth() + 1) + "/" + d.getUTCDate());
        }
        if (m[4] === "Z") {
          offset = "Z";
        } else {
          let offsetInMinutes = parseInt(m[5], 10) * 60 + parseInt(m[6] || "0", 10);
          if (m[4][0] === "-") {
            offsetInMinutes *= -1;
          }
          offset = offsetInMinutes;
          timeInSeconds -= offsetInMinutes * 60;
        }
      } else {
        if (m[1] != null) {
          baseDate = new Date(m[1]);
        } else {
          const d = new Date();
          baseDate = new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate());
        }
      }
      date = new Date(baseDate.getTime() + timeInSeconds * 1000);
      // correct for daylight savings time
      date = new Date(date.getTime() + (date.getTimezoneOffset() - baseDate.getTimezoneOffset()) * 60000);
    } else {
      fail();
    }
    // Check again the date is valid after transformations, see #2229
    if (isNaN(date.getTime())) {
      fail();
    }
  }
  return [date, offset];
}
function parse(str, detectUTC = false) {
  const [date, offset] = parseRaw(str);
  // .NET always parses DateTime as Local if there's offset info (even "Z")
  // Newtonsoft.Json uses UTC if the offset is "Z"
  const kind = offset != null ? detectUTC && offset === "Z" ? 1 /* DateKind.UTC */ : 2 /* DateKind.Local */ : 0 /* DateKind.Unspecified */;
  return DateTime(date.getTime(), kind);
}
function tryParse(v, defValue) {
  try {
    defValue.contents = parse(v);
    return true;
  } catch (_err) {
    return false;
  }
}
function create(year, month, day, h = 0, m = 0, s = 0, ms = 0, kind) {
  const date = kind === 1 /* DateKind.UTC */ ? new Date(Date.UTC(year, month - 1, day, h, m, s, ms)) : new Date(year, month - 1, day, h, m, s, ms);
  if (year <= 99) {
    if (kind === 1 /* DateKind.UTC */) {
      date.setUTCFullYear(year, month - 1, day);
    } else {
      date.setFullYear(year, month - 1, day);
    }
  }
  const dateValue = date.getTime();
  if (isNaN(dateValue)) {
    throw new Error("The parameters describe an unrepresentable Date.");
  }
  return DateTime(dateValue, kind);
}
function now() {
  return DateTime(Date.now(), 2 /* DateKind.Local */);
}
function utcNow() {
  return DateTime(Date.now(), 1 /* DateKind.UTC */);
}
function today() {
  return date(now());
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function daysInMonth(year, month) {
  return month === 2 ? isLeapYear(year) ? 29 : 28 : month >= 8 ? month % 2 === 0 ? 31 : 30 : month % 2 === 0 ? 30 : 31;
}
function toUniversalTime(date) {
  return date.kind === 1 /* DateKind.UTC */ ? date : DateTime(date.getTime(), 1 /* DateKind.UTC */);
}
function toLocalTime(date) {
  return date.kind === 2 /* DateKind.Local */ ? date : DateTime(date.getTime(), 2 /* DateKind.Local */);
}
function specifyKind(d, kind) {
  return create(year(d), month(d), day(d), hour(d), minute(d), second(d), millisecond(d), kind);
}
function timeOfDay(d) {
  return hour(d) * 3600000 + minute(d) * 60000 + second(d) * 1000 + millisecond(d);
}
function date(d) {
  return create(year(d), month(d), day(d), 0, 0, 0, 0, d.kind);
}
function day(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCDate() : d.getDate();
}
function hour(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCHours() : d.getHours();
}
function millisecond(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCMilliseconds() : d.getMilliseconds();
}
function minute(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCMinutes() : d.getMinutes();
}
function month(d) {
  return (d.kind === 1 /* DateKind.UTC */ ? d.getUTCMonth() : d.getMonth()) + 1;
}
function second(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCSeconds() : d.getSeconds();
}
function year(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCFullYear() : d.getFullYear();
}
function dayOfWeek(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCDay() : d.getDay();
}
function dayOfYear(d) {
  const _year = year(d);
  const _month = month(d);
  let _day = day(d);
  for (let i = 1; i < _month; i++) {
    _day += daysInMonth(_year, i);
  }
  return _day;
}
function add(d, ts) {
  const newDate = DateTime(d.getTime() + ts, d.kind);
  if (d.kind === 2 /* DateKind.Local */) {
    const oldTzOffset = d.getTimezoneOffset();
    const newTzOffset = newDate.getTimezoneOffset();
    return oldTzOffset !== newTzOffset ? DateTime(newDate.getTime() + (newTzOffset - oldTzOffset) * 60000, d.kind) : newDate;
  } else {
    return newDate;
  }
}
function addDays(d, v) {
  return add(d, v * 86400000);
}
function addHours(d, v) {
  return add(d, v * 3600000);
}
function addMinutes(d, v) {
  return add(d, v * 60000);
}
function addSeconds(d, v) {
  return add(d, v * 1000);
}
function addMilliseconds(d, v) {
  return add(d, v);
}
function addTicks(d, v) {
  return add(d, (0,_BigInt_js__WEBPACK_IMPORTED_MODULE_0__.toFloat64)(v / 10000n));
}
function addYears(d, v) {
  const newMonth = month(d);
  const newYear = year(d) + v;
  const _daysInMonth = daysInMonth(newYear, newMonth);
  const newDay = Math.min(_daysInMonth, day(d));
  return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind);
}
function addMonths(d, v) {
  let newMonth = month(d) + v;
  let newMonth_ = 0;
  let yearOffset = 0;
  if (newMonth > 12) {
    newMonth_ = newMonth % 12;
    yearOffset = Math.floor(newMonth / 12);
    newMonth = newMonth_;
  } else if (newMonth < 1) {
    newMonth_ = 12 + newMonth % 12;
    yearOffset = Math.floor(newMonth / 12) + (newMonth_ === 12 ? -1 : 0);
    newMonth = newMonth_;
  }
  const newYear = year(d) + yearOffset;
  const _daysInMonth = daysInMonth(newYear, newMonth);
  const newDay = Math.min(_daysInMonth, day(d));
  return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind);
}
function subtract(d, that) {
  return typeof that === "number" ? add(d, -that) : d.getTime() - that.getTime();
}
function toLongDateString(d) {
  return d.toDateString();
}
function toShortDateString(d) {
  return d.toLocaleDateString();
}
function toLongTimeString(d) {
  return d.toLocaleTimeString();
}
function toShortTimeString(d) {
  return d.toLocaleTimeString().replace(/:\d\d(?!:)/, "");
}
function equals(d1, d2) {
  return d1.getTime() === d2.getTime();
}
const compare = _Util_js__WEBPACK_IMPORTED_MODULE_1__.compareDates;
const compareTo = _Util_js__WEBPACK_IMPORTED_MODULE_1__.compareDates;
function op_Addition(x, y) {
  return add(x, y);
}
function op_Subtraction(x, y) {
  return subtract(x, y);
}
function isDaylightSavingTime(x) {
  const jan = new Date(x.getFullYear(), 0, 1);
  const jul = new Date(x.getFullYear(), 6, 1);
  return isDST(jan.getTimezoneOffset(), jul.getTimezoneOffset(), x.getTimezoneOffset());
}
function isDST(janOffset, julOffset, tOffset) {
  return Math.min(janOffset, julOffset) === tOffset;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DateTime);

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Decimal.js":
/*!***************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Decimal.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "ceiling": () => (/* binding */ ceiling),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "fromIntArray": () => (/* binding */ fromIntArray),
/* harmony export */   "fromInts": () => (/* binding */ fromInts),
/* harmony export */   "fromParts": () => (/* binding */ fromParts),
/* harmony export */   "getBits": () => (/* binding */ getBits),
/* harmony export */   "get_MaxValue": () => (/* binding */ get_MaxValue),
/* harmony export */   "get_MinValue": () => (/* binding */ get_MinValue),
/* harmony export */   "get_MinusOne": () => (/* binding */ get_MinusOne),
/* harmony export */   "get_One": () => (/* binding */ get_One),
/* harmony export */   "get_Zero": () => (/* binding */ get_Zero),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxMagnitude": () => (/* binding */ maxMagnitude),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minMagnitude": () => (/* binding */ minMagnitude),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "op_Addition": () => (/* binding */ op_Addition),
/* harmony export */   "op_Division": () => (/* binding */ op_Division),
/* harmony export */   "op_Modulus": () => (/* binding */ op_Modulus),
/* harmony export */   "op_Multiply": () => (/* binding */ op_Multiply),
/* harmony export */   "op_Subtraction": () => (/* binding */ op_Subtraction),
/* harmony export */   "op_UnaryNegation": () => (/* binding */ op_UnaryNegation),
/* harmony export */   "op_UnaryPlus": () => (/* binding */ op_UnaryPlus),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "pow": () => (/* binding */ pow),
/* harmony export */   "remainder": () => (/* binding */ remainder),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "sign": () => (/* binding */ sign),
/* harmony export */   "sqrt": () => (/* binding */ sqrt),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "toNumber": () => (/* binding */ toNumber),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "truncate": () => (/* binding */ truncate),
/* harmony export */   "tryParse": () => (/* binding */ tryParse)
/* harmony export */ });
/* harmony import */ var _lib_big_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/big.js */ "./src/Main/fable_modules/fable-library.4.1.4/lib/big.js");
/* harmony import */ var _Numeric_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Numeric.js */ "./src/Main/fable_modules/fable-library.4.1.4/Numeric.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types.js */ "./src/Main/fable_modules/fable-library.4.1.4/Types.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");




_lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.GetHashCode = function () {
  return (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.combineHashCodes)([this.s, this.e].concat(this.c));
};
_lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.Equals = function (x) {
  return !this.cmp(x);
};
_lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.CompareTo = function (x) {
  return this.cmp(x);
};
_lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype[_Numeric_js__WEBPACK_IMPORTED_MODULE_2__.symbol] = function () {
  const _this = this;
  return {
    multiply: y => _this.mul(y),
    toPrecision: sd => _this.toPrecision(sd),
    toExponential: dp => _this.toExponential(dp),
    toFixed: dp => _this.toFixed(dp),
    toHex: () => (Number(_this) >>> 0).toString(16)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
const get_Zero = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](0);
const get_One = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](1);
const get_MinusOne = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](-1);
const get_MaxValue = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"]("79228162514264337593543950335");
const get_MinValue = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"]("-79228162514264337593543950335");
function compare(x, y) {
  return x.cmp(y);
}
function equals(x, y) {
  return !x.cmp(y);
}
function abs(x) {
  return x.abs();
}
function sign(x) {
  return x < get_Zero ? -1 : x > get_Zero ? 1 : 0;
}
function max(x, y) {
  return x > y ? x : y;
}
function min(x, y) {
  return x < y ? x : y;
}
function maxMagnitude(x, y) {
  return abs(x) > abs(y) ? x : y;
}
function minMagnitude(x, y) {
  return abs(x) < abs(y) ? x : y;
}
function clamp(x, min, max) {
  return x < min ? min : x > max ? max : x;
}
function round(x, digits = 0) {
  return x.round(digits, 2 /* ROUND_HALF_EVEN */);
}
function truncate(x) {
  return x.round(0, 0 /* ROUND_DOWN */);
}
function ceiling(x) {
  return x.round(0, x.cmp(0) >= 0 ? 3 /* ROUND_UP */ : 0 /* ROUND_DOWN */);
}
function floor(x) {
  return x.round(0, x.cmp(0) >= 0 ? 0 /* ROUND_DOWN */ : 3 /* ROUND_UP */);
}
function pow(x, n) {
  return x.pow(n);
}
function sqrt(x) {
  return x.sqrt();
}
function op_Addition(x, y) {
  return x.add(y);
}
function op_Subtraction(x, y) {
  return x.sub(y);
}
function op_Multiply(x, y) {
  return x.mul(y);
}
function op_Division(x, y) {
  return x.div(y);
}
function op_Modulus(x, y) {
  return x.mod(y);
}
function op_UnaryNegation(x) {
  const x2 = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](x);
  x2.s = -x2.s || 0;
  return x2;
}
function op_UnaryPlus(x) {
  return x;
}
const add = op_Addition;
const subtract = op_Subtraction;
const multiply = op_Multiply;
const divide = op_Division;
const remainder = op_Modulus;
const negate = op_UnaryNegation;
function toString(x) {
  return x.toString();
}
function tryParse(str, defValue) {
  try {
    defValue.contents = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](str.trim());
    return true;
  } catch {
    return false;
  }
}
function parse(str) {
  const defValue = new _Types_js__WEBPACK_IMPORTED_MODULE_3__.FSharpRef(get_Zero);
  if (tryParse(str, defValue)) {
    return defValue.contents;
  } else {
    throw new Error("Input string was not in a correct format.");
  }
}
function toNumber(x) {
  return +x;
}
function decimalToHex(dec, bitSize) {
  const hex = new Uint8Array(bitSize / 4 | 0);
  let hexCount = 1;
  for (let d = 0; d < dec.length; d++) {
    let value = dec[d];
    for (let i = 0; i < hexCount; i++) {
      const digit = hex[i] * 10 + value | 0;
      hex[i] = digit & 0xF;
      value = digit >> 4;
    }
    if (value !== 0) {
      hex[hexCount++] = value;
    }
  }
  return hex.slice(0, hexCount); // digits in reverse order
}
function hexToDecimal(hex, bitSize) {
  const dec = new Uint8Array(bitSize * 301 / 1000 + 1 | 0);
  let decCount = 1;
  for (let d = hex.length - 1; d >= 0; d--) {
    let carry = hex[d];
    for (let i = 0; i < decCount; i++) {
      const val = dec[i] * 16 + carry | 0;
      dec[i] = val % 10 | 0;
      carry = val / 10 | 0;
    }
    while (carry > 0) {
      dec[decCount++] = carry % 10 | 0;
      carry = carry / 10 | 0;
    }
  }
  return dec.slice(0, decCount); // digits in reverse order
}
function setInt32Bits(hexDigits, bits, offset) {
  for (let i = 0; i < 8; i++) {
    hexDigits[offset + i] = bits >> i * 4 & 0xF;
  }
}
function getInt32Bits(hexDigits, offset) {
  let bits = 0;
  for (let i = 0; i < 8; i++) {
    bits = bits | hexDigits[offset + i] << i * 4;
  }
  return bits;
}
function fromIntArray(bits) {
  return fromInts(bits[0], bits[1], bits[2], bits[3]);
}
function fromInts(low, mid, high, signExp) {
  const isNegative = signExp < 0;
  const scale = signExp >> 16 & 0x7F;
  return fromParts(low, mid, high, isNegative, scale);
}
function fromParts(low, mid, high, isNegative, scale) {
  const bitSize = 96;
  const hexDigits = new Uint8Array(bitSize / 4);
  setInt32Bits(hexDigits, low, 0);
  setInt32Bits(hexDigits, mid, 8);
  setInt32Bits(hexDigits, high, 16);
  const decDigits = hexToDecimal(hexDigits, bitSize);
  scale = scale & 0x7F;
  const big = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](0);
  big.c = Array.from(decDigits.reverse());
  big.e = decDigits.length - scale - 1;
  big.s = isNegative ? -1 : 1;
  const d = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](big);
  return d;
}
function getBits(d) {
  const bitSize = 96;
  const decDigits = Uint8Array.from(d.c);
  const hexDigits = decimalToHex(decDigits, bitSize);
  const low = getInt32Bits(hexDigits, 0);
  const mid = getInt32Bits(hexDigits, 8);
  const high = getInt32Bits(hexDigits, 16);
  const decStr = d.toString();
  const dotPos = decStr.indexOf(".");
  const scale = dotPos < 0 ? 0 : decStr.length - dotPos - 1;
  const signExp = (scale & 0x7F) << 16 | (d.s < 0 ? 0x80000000 : 0);
  return [low, mid, high, signExp];
}
// export function makeRangeStepFunction(step: Decimal, last: Decimal) {
//   const stepComparedWithZero = step.cmp(get_Zero);
//   if (stepComparedWithZero === 0) {
//     throw new Error("The step of a range cannot be zero");
//   }
//   const stepGreaterThanZero = stepComparedWithZero > 0;
//   return (x: Decimal) => {
//     const comparedWithLast = x.cmp(last);
//     if ((stepGreaterThanZero && comparedWithLast <= 0)
//       || (!stepGreaterThanZero && comparedWithLast >= 0)) {
//       return [x, op_Addition(x, step)];
//     } else {
//       return undefined;
//     }
//   };
// }

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Double.js":
/*!**************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Double.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "isInfinity": () => (/* binding */ isInfinity),
/* harmony export */   "isNegativeInfinity": () => (/* binding */ isNegativeInfinity),
/* harmony export */   "isPositiveInfinity": () => (/* binding */ isPositiveInfinity),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxMagnitude": () => (/* binding */ maxMagnitude),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minMagnitude": () => (/* binding */ minMagnitude),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "tryParse": () => (/* binding */ tryParse)
/* harmony export */ });
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types.js */ "./src/Main/fable_modules/fable-library.4.1.4/Types.js");

function tryParse(str, defValue) {
  // TODO: test if value is valid and in range
  if (str != null && /\S/.test(str)) {
    const v = +str.replace("_", "");
    if (!Number.isNaN(v)) {
      defValue.contents = v;
      return true;
    }
  }
  return false;
}
function parse(str) {
  const defValue = new _Types_js__WEBPACK_IMPORTED_MODULE_0__.FSharpRef(0);
  if (tryParse(str, defValue)) {
    return defValue.contents;
  } else {
    throw new Error("Input string was not in a correct format.");
  }
}
// JS Number.isFinite function evals false for NaN
function isPositiveInfinity(x) {
  return x === Number.POSITIVE_INFINITY;
}
function isNegativeInfinity(x) {
  return x === Number.NEGATIVE_INFINITY;
}
function isInfinity(x) {
  return x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY;
}
function max(x, y) {
  return x > y ? x : y;
}
function min(x, y) {
  return x < y ? x : y;
}
function maxMagnitude(x, y) {
  return Math.abs(x) > Math.abs(y) ? x : y;
}
function minMagnitude(x, y) {
  return Math.abs(x) < Math.abs(y) ? x : y;
}
function clamp(x, min, max) {
  return x < min ? min : x > max ? max : x;
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/FSharp.Collections.js":
/*!**************************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/FSharp.Collections.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComparisonIdentity_FromFunction": () => (/* binding */ ComparisonIdentity_FromFunction),
/* harmony export */   "ComparisonIdentity_Structural": () => (/* binding */ ComparisonIdentity_Structural),
/* harmony export */   "HashIdentity_FromFunctions": () => (/* binding */ HashIdentity_FromFunctions),
/* harmony export */   "HashIdentity_Reference": () => (/* binding */ HashIdentity_Reference),
/* harmony export */   "HashIdentity_Structural": () => (/* binding */ HashIdentity_Structural)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");

function HashIdentity_FromFunctions(hash, eq) {
  return {
    Equals(x, y) {
      return eq(x, y);
    },
    GetHashCode(x_1) {
      return hash(x_1);
    }
  };
}
function HashIdentity_Structural() {
  return HashIdentity_FromFunctions(_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash, _Util_js__WEBPACK_IMPORTED_MODULE_0__.equals);
}
function HashIdentity_Reference() {
  return HashIdentity_FromFunctions(_Util_js__WEBPACK_IMPORTED_MODULE_0__.physicalHash, (e, e_1) => e === e_1);
}
function ComparisonIdentity_FromFunction(comparer) {
  return {
    Compare(x, y) {
      return comparer(x, y);
    }
  };
}
function ComparisonIdentity_Structural() {
  return ComparisonIdentity_FromFunction(_Util_js__WEBPACK_IMPORTED_MODULE_0__.compare);
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/FSharp.Core.js":
/*!*******************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/FSharp.Core.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtraTopLevelOperators_LazyPattern": () => (/* binding */ ExtraTopLevelOperators_LazyPattern),
/* harmony export */   "LanguagePrimitives_FastGenericComparer": () => (/* binding */ LanguagePrimitives_FastGenericComparer),
/* harmony export */   "LanguagePrimitives_FastGenericComparerFromTable": () => (/* binding */ LanguagePrimitives_FastGenericComparerFromTable),
/* harmony export */   "LanguagePrimitives_FastGenericEqualityComparer": () => (/* binding */ LanguagePrimitives_FastGenericEqualityComparer),
/* harmony export */   "LanguagePrimitives_FastGenericEqualityComparerFromTable": () => (/* binding */ LanguagePrimitives_FastGenericEqualityComparerFromTable),
/* harmony export */   "LanguagePrimitives_GenericEqualityComparer": () => (/* binding */ LanguagePrimitives_GenericEqualityComparer),
/* harmony export */   "LanguagePrimitives_GenericEqualityERComparer": () => (/* binding */ LanguagePrimitives_GenericEqualityERComparer),
/* harmony export */   "Operators_Failure": () => (/* binding */ Operators_Failure),
/* harmony export */   "Operators_FailurePattern": () => (/* binding */ Operators_FailurePattern),
/* harmony export */   "Operators_Lock": () => (/* binding */ Operators_Lock),
/* harmony export */   "Operators_NullArg": () => (/* binding */ Operators_NullArg),
/* harmony export */   "Operators_Using": () => (/* binding */ Operators_Using),
/* harmony export */   "PrintfModule_PrintFormatToStringBuilder": () => (/* binding */ PrintfModule_PrintFormatToStringBuilder),
/* harmony export */   "PrintfModule_PrintFormatToStringBuilderThen": () => (/* binding */ PrintfModule_PrintFormatToStringBuilderThen)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _FSharp_Collections_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FSharp.Collections.js */ "./src/Main/fable_modules/fable-library.4.1.4/FSharp.Collections.js");
/* harmony import */ var _System_Text_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./System.Text.js */ "./src/Main/fable_modules/fable-library.4.1.4/System.Text.js");



const LanguagePrimitives_GenericEqualityComparer = {
  "System.Collections.IEqualityComparer.Equals541DA560"(x, y) {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(x, y);
  },
  "System.Collections.IEqualityComparer.GetHashCode4E60E31B"(x_1) {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash)(x_1);
  }
};
const LanguagePrimitives_GenericEqualityERComparer = {
  "System.Collections.IEqualityComparer.Equals541DA560"(x, y) {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(x, y);
  },
  "System.Collections.IEqualityComparer.GetHashCode4E60E31B"(x_1) {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash)(x_1);
  }
};
function LanguagePrimitives_FastGenericComparer() {
  return (0,_FSharp_Collections_js__WEBPACK_IMPORTED_MODULE_1__.ComparisonIdentity_Structural)();
}
function LanguagePrimitives_FastGenericComparerFromTable() {
  return (0,_FSharp_Collections_js__WEBPACK_IMPORTED_MODULE_1__.ComparisonIdentity_Structural)();
}
function LanguagePrimitives_FastGenericEqualityComparer() {
  return (0,_FSharp_Collections_js__WEBPACK_IMPORTED_MODULE_1__.HashIdentity_Structural)();
}
function LanguagePrimitives_FastGenericEqualityComparerFromTable() {
  return (0,_FSharp_Collections_js__WEBPACK_IMPORTED_MODULE_1__.HashIdentity_Structural)();
}
function Operators_Failure(message) {
  return new Error(message);
}
function Operators_FailurePattern(exn) {
  return exn.message;
}
function Operators_NullArg(x) {
  throw new Error(x);
}
function Operators_Using(resource, action) {
  try {
    return action(resource);
  } finally {
    if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(resource, (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.defaultOf)())) {} else {
      let copyOfStruct = resource;
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(copyOfStruct);
    }
  }
}
function Operators_Lock(_lockObj, action) {
  return action();
}
function ExtraTopLevelOperators_LazyPattern(input) {
  return input.Value;
}
function PrintfModule_PrintFormatToStringBuilderThen(continuation, builder, format) {
  return format.cont(s => {
    (0,_System_Text_js__WEBPACK_IMPORTED_MODULE_2__.StringBuilder__Append_Z721C83C5)(builder, s);
    return continuation();
  });
}
function PrintfModule_PrintFormatToStringBuilder(builder, format) {
  return PrintfModule_PrintFormatToStringBuilderThen(() => {}, builder, format);
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Global.js":
/*!**************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Global.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SR_differentLengths": () => (/* binding */ SR_differentLengths),
/* harmony export */   "SR_indexOutOfBounds": () => (/* binding */ SR_indexOutOfBounds),
/* harmony export */   "SR_inputMustBeNonNegative": () => (/* binding */ SR_inputMustBeNonNegative),
/* harmony export */   "SR_inputSequenceEmpty": () => (/* binding */ SR_inputSequenceEmpty),
/* harmony export */   "SR_inputSequenceTooLong": () => (/* binding */ SR_inputSequenceTooLong),
/* harmony export */   "SR_inputWasEmpty": () => (/* binding */ SR_inputWasEmpty),
/* harmony export */   "SR_keyNotFoundAlt": () => (/* binding */ SR_keyNotFoundAlt),
/* harmony export */   "SR_notEnoughElements": () => (/* binding */ SR_notEnoughElements)
/* harmony export */ });
const SR_indexOutOfBounds = "The index was outside the range of elements in the collection.";
const SR_inputWasEmpty = "Collection was empty.";
const SR_inputMustBeNonNegative = "The input must be non-negative.";
const SR_inputSequenceEmpty = "The input sequence was empty.";
const SR_inputSequenceTooLong = "The input sequence contains more than one element.";
const SR_keyNotFoundAlt = "An index satisfying the predicate was not found in the collection.";
const SR_differentLengths = "The collections had different lengths.";
const SR_notEnoughElements = "The input sequence has an insufficient number of elements.";

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/List.js":
/*!************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/List.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FSharpList": () => (/* binding */ FSharpList),
/* harmony export */   "FSharpList_$reflection": () => (/* binding */ FSharpList_$reflection),
/* harmony export */   "FSharpList_Cons_305B8EAC": () => (/* binding */ FSharpList_Cons_305B8EAC),
/* harmony export */   "FSharpList__get_Head": () => (/* binding */ FSharpList__get_Head),
/* harmony export */   "FSharpList__get_IsEmpty": () => (/* binding */ FSharpList__get_IsEmpty),
/* harmony export */   "FSharpList__get_Item_Z524259A4": () => (/* binding */ FSharpList__get_Item_Z524259A4),
/* harmony export */   "FSharpList__get_Length": () => (/* binding */ FSharpList__get_Length),
/* harmony export */   "FSharpList__get_Tail": () => (/* binding */ FSharpList__get_Tail),
/* harmony export */   "FSharpList_get_Empty": () => (/* binding */ FSharpList_get_Empty),
/* harmony export */   "ListEnumerator$1": () => (/* binding */ ListEnumerator$1),
/* harmony export */   "ListEnumerator$1_$ctor_3002E699": () => (/* binding */ ListEnumerator$1_$ctor_3002E699),
/* harmony export */   "ListEnumerator$1_$reflection": () => (/* binding */ ListEnumerator$1_$reflection),
/* harmony export */   "allPairs": () => (/* binding */ allPairs),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "average": () => (/* binding */ average),
/* harmony export */   "averageBy": () => (/* binding */ averageBy),
/* harmony export */   "choose": () => (/* binding */ choose),
/* harmony export */   "chunkBySize": () => (/* binding */ chunkBySize),
/* harmony export */   "collect": () => (/* binding */ collect),
/* harmony export */   "compareWith": () => (/* binding */ compareWith),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "cons": () => (/* binding */ cons),
/* harmony export */   "contains": () => (/* binding */ contains),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "exactlyOne": () => (/* binding */ exactlyOne),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "exists2": () => (/* binding */ exists2),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findBack": () => (/* binding */ findBack),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "findIndexBack": () => (/* binding */ findIndexBack),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "fold2": () => (/* binding */ fold2),
/* harmony export */   "foldBack": () => (/* binding */ foldBack),
/* harmony export */   "foldBack2": () => (/* binding */ foldBack2),
/* harmony export */   "foldIndexed": () => (/* binding */ foldIndexed),
/* harmony export */   "forAll": () => (/* binding */ forAll),
/* harmony export */   "forAll2": () => (/* binding */ forAll2),
/* harmony export */   "getSlice": () => (/* binding */ getSlice),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "indexNotFound": () => (/* binding */ indexNotFound),
/* harmony export */   "indexed": () => (/* binding */ indexed),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "insertAt": () => (/* binding */ insertAt),
/* harmony export */   "insertManyAt": () => (/* binding */ insertManyAt),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "item": () => (/* binding */ item),
/* harmony export */   "iterate": () => (/* binding */ iterate),
/* harmony export */   "iterate2": () => (/* binding */ iterate2),
/* harmony export */   "iterateIndexed": () => (/* binding */ iterateIndexed),
/* harmony export */   "iterateIndexed2": () => (/* binding */ iterateIndexed2),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "map2": () => (/* binding */ map2),
/* harmony export */   "map3": () => (/* binding */ map3),
/* harmony export */   "mapFold": () => (/* binding */ mapFold),
/* harmony export */   "mapFoldBack": () => (/* binding */ mapFoldBack),
/* harmony export */   "mapIndexed": () => (/* binding */ mapIndexed),
/* harmony export */   "mapIndexed2": () => (/* binding */ mapIndexed2),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxBy": () => (/* binding */ maxBy),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minBy": () => (/* binding */ minBy),
/* harmony export */   "ofArray": () => (/* binding */ ofArray),
/* harmony export */   "ofArrayWithTail": () => (/* binding */ ofArrayWithTail),
/* harmony export */   "ofSeq": () => (/* binding */ ofSeq),
/* harmony export */   "pairwise": () => (/* binding */ pairwise),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "permute": () => (/* binding */ permute),
/* harmony export */   "pick": () => (/* binding */ pick),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceBack": () => (/* binding */ reduceBack),
/* harmony export */   "removeAt": () => (/* binding */ removeAt),
/* harmony export */   "removeManyAt": () => (/* binding */ removeManyAt),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "scan": () => (/* binding */ scan),
/* harmony export */   "scanBack": () => (/* binding */ scanBack),
/* harmony export */   "singleton": () => (/* binding */ singleton),
/* harmony export */   "skip": () => (/* binding */ skip),
/* harmony export */   "skipWhile": () => (/* binding */ skipWhile),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "sortByDescending": () => (/* binding */ sortByDescending),
/* harmony export */   "sortDescending": () => (/* binding */ sortDescending),
/* harmony export */   "sortWith": () => (/* binding */ sortWith),
/* harmony export */   "splitAt": () => (/* binding */ splitAt),
/* harmony export */   "splitInto": () => (/* binding */ splitInto),
/* harmony export */   "sum": () => (/* binding */ sum),
/* harmony export */   "sumBy": () => (/* binding */ sumBy),
/* harmony export */   "tail": () => (/* binding */ tail),
/* harmony export */   "take": () => (/* binding */ take),
/* harmony export */   "takeWhile": () => (/* binding */ takeWhile),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "toSeq": () => (/* binding */ toSeq),
/* harmony export */   "transpose": () => (/* binding */ transpose),
/* harmony export */   "truncate": () => (/* binding */ truncate),
/* harmony export */   "tryExactlyOne": () => (/* binding */ tryExactlyOne),
/* harmony export */   "tryFind": () => (/* binding */ tryFind),
/* harmony export */   "tryFindBack": () => (/* binding */ tryFindBack),
/* harmony export */   "tryFindIndex": () => (/* binding */ tryFindIndex),
/* harmony export */   "tryFindIndexBack": () => (/* binding */ tryFindIndexBack),
/* harmony export */   "tryHead": () => (/* binding */ tryHead),
/* harmony export */   "tryItem": () => (/* binding */ tryItem),
/* harmony export */   "tryLast": () => (/* binding */ tryLast),
/* harmony export */   "tryPick": () => (/* binding */ tryPick),
/* harmony export */   "unfold": () => (/* binding */ unfold),
/* harmony export */   "unzip": () => (/* binding */ unzip),
/* harmony export */   "unzip3": () => (/* binding */ unzip3),
/* harmony export */   "updateAt": () => (/* binding */ updateAt),
/* harmony export */   "where": () => (/* binding */ where),
/* harmony export */   "windowed": () => (/* binding */ windowed),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "zip3": () => (/* binding */ zip3)
/* harmony export */ });
/* harmony import */ var _String_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./String.js */ "./src/Main/fable_modules/fable-library.4.1.4/String.js");
/* harmony import */ var _Option_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Option.js */ "./src/Main/fable_modules/fable-library.4.1.4/Option.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types.js */ "./src/Main/fable_modules/fable-library.4.1.4/Types.js");
/* harmony import */ var _Reflection_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Reflection.js */ "./src/Main/fable_modules/fable-library.4.1.4/Reflection.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Global.js */ "./src/Main/fable_modules/fable-library.4.1.4/Global.js");
/* harmony import */ var _Array_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Array.js */ "./src/Main/fable_modules/fable-library.4.1.4/Array.js");







class FSharpList extends _Types_js__WEBPACK_IMPORTED_MODULE_0__.Record {
  constructor(head, tail) {
    super();
    this.head = head;
    this.tail = tail;
  }
  toString() {
    const xs = this;
    return "[" + (0,_String_js__WEBPACK_IMPORTED_MODULE_1__.join)("; ", xs) + "]";
  }
  Equals(other) {
    const xs = this;
    if (xs === other) {
      return true;
    } else {
      const loop = (xs_1_mut, ys_1_mut) => {
        loop: while (true) {
          const xs_1 = xs_1_mut,
            ys_1 = ys_1_mut;
          const matchValue = xs_1.tail;
          const matchValue_1 = ys_1.tail;
          if (matchValue != null) {
            if (matchValue_1 != null) {
              const xt = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
              const yt = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue_1);
              if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.equals)(xs_1.head, ys_1.head)) {
                xs_1_mut = xt;
                ys_1_mut = yt;
                continue loop;
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else if (matchValue_1 != null) {
            return false;
          } else {
            return true;
          }
          break;
        }
      };
      return loop(xs, other);
    }
  }
  GetHashCode() {
    const xs = this;
    const loop = (i_mut, h_mut, xs_1_mut) => {
      loop: while (true) {
        const i = i_mut,
          h = h_mut,
          xs_1 = xs_1_mut;
        const matchValue = xs_1.tail;
        if (matchValue != null) {
          const t = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
          if (i > 18) {
            return h | 0;
          } else {
            i_mut = i + 1;
            h_mut = (h << 1) + (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.structuralHash)(xs_1.head) + 631 * i;
            xs_1_mut = t;
            continue loop;
          }
        } else {
          return h | 0;
        }
        break;
      }
    };
    return loop(0, 0, xs) | 0;
  }
  toJSON() {
    const this$ = this;
    return Array.from(this$);
  }
  CompareTo(other) {
    const xs = this;
    const loop = (xs_1_mut, ys_1_mut) => {
      loop: while (true) {
        const xs_1 = xs_1_mut,
          ys_1 = ys_1_mut;
        const matchValue = xs_1.tail;
        const matchValue_1 = ys_1.tail;
        if (matchValue != null) {
          if (matchValue_1 != null) {
            const xt = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
            const yt = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue_1);
            const c = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.compare)(xs_1.head, ys_1.head) | 0;
            if (c === 0) {
              xs_1_mut = xt;
              ys_1_mut = yt;
              continue loop;
            } else {
              return c | 0;
            }
          } else {
            return 1;
          }
        } else if (matchValue_1 != null) {
          return -1;
        } else {
          return 0;
        }
        break;
      }
    };
    return loop(xs, other) | 0;
  }
  GetEnumerator() {
    const xs = this;
    return ListEnumerator$1_$ctor_3002E699(xs);
  }
  [Symbol.iterator]() {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.toIterator)((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(this));
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const xs = this;
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(xs);
  }
}
function FSharpList_$reflection(gen0) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_4__.record_type)("ListModule.FSharpList", [gen0], FSharpList, () => [["head", gen0], ["tail", (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_4__.option_type)(FSharpList_$reflection(gen0))]]);
}
class ListEnumerator$1 {
  constructor(xs) {
    this.xs = xs;
    this.it = this.xs;
    this.current = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.defaultOf)();
  }
  "System.Collections.Generic.IEnumerator`1.get_Current"() {
    const _ = this;
    return _.current;
  }
  "System.Collections.IEnumerator.get_Current"() {
    const _ = this;
    return _.current;
  }
  "System.Collections.IEnumerator.MoveNext"() {
    const _ = this;
    const matchValue = _.it.tail;
    if (matchValue != null) {
      const t = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
      _.current = _.it.head;
      _.it = t;
      return true;
    } else {
      return false;
    }
  }
  "System.Collections.IEnumerator.Reset"() {
    const _ = this;
    _.it = _.xs;
    _.current = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.defaultOf)();
  }
  Dispose() {}
}
function ListEnumerator$1_$reflection(gen0) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_4__.class_type)("ListModule.ListEnumerator`1", [gen0], ListEnumerator$1);
}
function ListEnumerator$1_$ctor_3002E699(xs) {
  return new ListEnumerator$1(xs);
}
function FSharpList_get_Empty() {
  return new FSharpList((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.defaultOf)(), void 0);
}
function FSharpList_Cons_305B8EAC(x, xs) {
  return new FSharpList(x, xs);
}
function FSharpList__get_IsEmpty(xs) {
  return xs.tail == null;
}
function FSharpList__get_Length(xs) {
  const loop = (i_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        xs_1 = xs_1_mut;
      const matchValue = xs_1.tail;
      if (matchValue != null) {
        i_mut = i + 1;
        xs_1_mut = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
        continue loop;
      } else {
        return i | 0;
      }
      break;
    }
  };
  return loop(0, xs) | 0;
}
function FSharpList__get_Head(xs) {
  const matchValue = xs.tail;
  if (matchValue != null) {
    return xs.head;
  } else {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputWasEmpty + "\\nParameter name: " + "list");
  }
}
function FSharpList__get_Tail(xs) {
  const matchValue = xs.tail;
  if (matchValue != null) {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
  } else {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputWasEmpty + "\\nParameter name: " + "list");
  }
}
function FSharpList__get_Item_Z524259A4(xs, index) {
  const loop = (i_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        xs_1 = xs_1_mut;
      const matchValue = xs_1.tail;
      if (matchValue != null) {
        if (i === index) {
          return xs_1.head;
        } else {
          i_mut = i + 1;
          xs_1_mut = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
          continue loop;
        }
      } else {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
      }
      break;
    }
  };
  return loop(0, xs);
}
function indexNotFound() {
  throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_keyNotFoundAlt);
}
function empty() {
  return FSharpList_get_Empty();
}
function cons(x, xs) {
  return FSharpList_Cons_305B8EAC(x, xs);
}
function singleton(x) {
  return FSharpList_Cons_305B8EAC(x, FSharpList_get_Empty());
}
function isEmpty(xs) {
  return FSharpList__get_IsEmpty(xs);
}
function length(xs) {
  return FSharpList__get_Length(xs);
}
function head(xs) {
  return FSharpList__get_Head(xs);
}
function tryHead(xs) {
  if (FSharpList__get_IsEmpty(xs)) {
    return void 0;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(FSharpList__get_Head(xs));
  }
}
function tail(xs) {
  return FSharpList__get_Tail(xs);
}
function tryLast(xs_mut) {
  tryLast: while (true) {
    const xs = xs_mut;
    if (FSharpList__get_IsEmpty(xs)) {
      return void 0;
    } else {
      const t = FSharpList__get_Tail(xs);
      if (FSharpList__get_IsEmpty(t)) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(FSharpList__get_Head(xs));
      } else {
        xs_mut = t;
        continue tryLast;
      }
    }
    break;
  }
}
function last(xs) {
  const matchValue = tryLast(xs);
  if (matchValue == null) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputWasEmpty);
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
  }
}
function compareWith(comparer, xs, ys) {
  const loop = (xs_1_mut, ys_1_mut) => {
    loop: while (true) {
      const xs_1 = xs_1_mut,
        ys_1 = ys_1_mut;
      const matchValue = FSharpList__get_IsEmpty(xs_1);
      const matchValue_1 = FSharpList__get_IsEmpty(ys_1);
      if (matchValue) {
        if (matchValue_1) {
          return 0;
        } else {
          return -1;
        }
      } else if (matchValue_1) {
        return 1;
      } else {
        const c = comparer(FSharpList__get_Head(xs_1), FSharpList__get_Head(ys_1)) | 0;
        if (c === 0) {
          xs_1_mut = FSharpList__get_Tail(xs_1);
          ys_1_mut = FSharpList__get_Tail(ys_1);
          continue loop;
        } else {
          return c | 0;
        }
      }
      break;
    }
  };
  return loop(xs, ys) | 0;
}
function toArray(xs) {
  const len = FSharpList__get_Length(xs) | 0;
  const res = (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.fill)(new Array(len), 0, len, null);
  const loop = (i_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        xs_1 = xs_1_mut;
      if (!FSharpList__get_IsEmpty(xs_1)) {
        res[i] = FSharpList__get_Head(xs_1);
        i_mut = i + 1;
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  loop(0, xs);
  return res;
}
function fold(folder, state, xs) {
  let acc = state;
  let xs_1 = xs;
  while (!FSharpList__get_IsEmpty(xs_1)) {
    acc = folder(acc, head(xs_1));
    xs_1 = FSharpList__get_Tail(xs_1);
  }
  return acc;
}
function reverse(xs) {
  return fold((acc, x) => FSharpList_Cons_305B8EAC(x, acc), FSharpList_get_Empty(), xs);
}
function foldBack(folder, xs, state) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.foldBack)(folder, toArray(xs), state);
}
function foldIndexed(folder, state, xs) {
  const loop = (i_mut, acc_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        acc = acc_mut,
        xs_1 = xs_1_mut;
      if (FSharpList__get_IsEmpty(xs_1)) {
        return acc;
      } else {
        i_mut = i + 1;
        acc_mut = folder(i, acc, FSharpList__get_Head(xs_1));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  return loop(0, state, xs);
}
function fold2(folder, state, xs, ys) {
  let acc = state;
  let xs_1 = xs;
  let ys_1 = ys;
  while (!FSharpList__get_IsEmpty(xs_1) && !FSharpList__get_IsEmpty(ys_1)) {
    acc = folder(acc, FSharpList__get_Head(xs_1), FSharpList__get_Head(ys_1));
    xs_1 = FSharpList__get_Tail(xs_1);
    ys_1 = FSharpList__get_Tail(ys_1);
  }
  return acc;
}
function foldBack2(folder, xs, ys, state) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.foldBack2)(folder, toArray(xs), toArray(ys), state);
}
function unfold(gen, state) {
  const loop = (acc_mut, node_mut) => {
    let t;
    loop: while (true) {
      const acc = acc_mut,
        node = node_mut;
      const matchValue = gen(acc);
      if (matchValue != null) {
        acc_mut = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue)[1];
        node_mut = (t = new FSharpList((0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue)[0], void 0), (node.tail = t, t));
        continue loop;
      } else {
        return node;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node_1 = loop(state, root);
  const t_2 = FSharpList_get_Empty();
  node_1.tail = t_2;
  return FSharpList__get_Tail(root);
}
function iterate(action, xs) {
  fold((unitVar, x) => {
    action(x);
  }, void 0, xs);
}
function iterate2(action, xs, ys) {
  fold2((unitVar, x, y) => {
    action(x, y);
  }, void 0, xs, ys);
}
function iterateIndexed(action, xs) {
  fold((i, x) => {
    action(i, x);
    return i + 1 | 0;
  }, 0, xs);
}
function iterateIndexed2(action, xs, ys) {
  fold2((i, x, y) => {
    action(i, x, y);
    return i + 1 | 0;
  }, 0, xs, ys);
}
function toSeq(xs) {
  return xs;
}
function ofArrayWithTail(xs, tail_1) {
  let res = tail_1;
  for (let i = xs.length - 1; i >= 0; i--) {
    res = FSharpList_Cons_305B8EAC(xs[i], res);
  }
  return res;
}
function ofArray(xs) {
  return ofArrayWithTail(xs, FSharpList_get_Empty());
}
function ofSeq(xs) {
  let xs_3, t;
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(xs)) {
    return ofArray(xs);
  } else if (xs instanceof FSharpList) {
    return xs;
  } else {
    const root = FSharpList_get_Empty();
    let node = root;
    const enumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(xs);
    try {
      while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
        const x = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
        node = (xs_3 = node, (t = new FSharpList(x, void 0), (xs_3.tail = t, t)));
      }
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.disposeSafe)(enumerator);
    }
    const xs_5 = node;
    const t_2 = FSharpList_get_Empty();
    xs_5.tail = t_2;
    return FSharpList__get_Tail(root);
  }
}
function concat(lists) {
  const root = FSharpList_get_Empty();
  let node = root;
  const action = xs => {
    node = fold((acc, x) => {
      const t = new FSharpList(x, void 0);
      acc.tail = t;
      return t;
    }, node, xs);
  };
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(lists)) {
    const xs_3 = lists;
    xs_3.forEach(action);
  } else if (lists instanceof FSharpList) {
    iterate(action, lists);
  } else {
    const enumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(lists);
    try {
      while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
        action(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]());
      }
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.disposeSafe)(enumerator);
    }
  }
  const xs_6 = node;
  const t_2 = FSharpList_get_Empty();
  xs_6.tail = t_2;
  return FSharpList__get_Tail(root);
}
function scan(folder, state, xs) {
  let xs_4, t_2;
  const root = FSharpList_get_Empty();
  let node;
  const t = new FSharpList(state, void 0);
  root.tail = t;
  node = t;
  let acc = state;
  let xs_3 = xs;
  while (!FSharpList__get_IsEmpty(xs_3)) {
    acc = folder(acc, FSharpList__get_Head(xs_3));
    node = (xs_4 = node, (t_2 = new FSharpList(acc, void 0), (xs_4.tail = t_2, t_2)));
    xs_3 = FSharpList__get_Tail(xs_3);
  }
  const xs_6 = node;
  const t_4 = FSharpList_get_Empty();
  xs_6.tail = t_4;
  return FSharpList__get_Tail(root);
}
function scanBack(folder, xs, state) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.scanBack)(folder, toArray(xs), state));
}
function append(xs, ys) {
  return fold((acc, x) => FSharpList_Cons_305B8EAC(x, acc), ys, reverse(xs));
}
function collect(mapping, xs) {
  let xs_1, t;
  const root = FSharpList_get_Empty();
  let node = root;
  let ys = xs;
  while (!FSharpList__get_IsEmpty(ys)) {
    let zs = mapping(FSharpList__get_Head(ys));
    while (!FSharpList__get_IsEmpty(zs)) {
      node = (xs_1 = node, (t = new FSharpList(FSharpList__get_Head(zs), void 0), (xs_1.tail = t, t)));
      zs = FSharpList__get_Tail(zs);
    }
    ys = FSharpList__get_Tail(ys);
  }
  const xs_3 = node;
  const t_2 = FSharpList_get_Empty();
  xs_3.tail = t_2;
  return FSharpList__get_Tail(root);
}
function mapIndexed(mapping, xs) {
  const root = FSharpList_get_Empty();
  const node = foldIndexed((i, acc, x) => {
    const t = new FSharpList(mapping(i, x), void 0);
    acc.tail = t;
    return t;
  }, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function map(mapping, xs) {
  const root = FSharpList_get_Empty();
  const node = fold((acc, x) => {
    const t = new FSharpList(mapping(x), void 0);
    acc.tail = t;
    return t;
  }, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function indexed(xs) {
  return mapIndexed((i, x) => [i, x], xs);
}
function map2(mapping, xs, ys) {
  const root = FSharpList_get_Empty();
  const node = fold2((acc, x, y) => {
    const t = new FSharpList(mapping(x, y), void 0);
    acc.tail = t;
    return t;
  }, root, xs, ys);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function mapIndexed2(mapping, xs, ys) {
  const loop = (i_mut, acc_mut, xs_1_mut, ys_1_mut) => {
    let t;
    loop: while (true) {
      const i = i_mut,
        acc = acc_mut,
        xs_1 = xs_1_mut,
        ys_1 = ys_1_mut;
      if (FSharpList__get_IsEmpty(xs_1) ? true : FSharpList__get_IsEmpty(ys_1)) {
        return acc;
      } else {
        i_mut = i + 1;
        acc_mut = (t = new FSharpList(mapping(i, FSharpList__get_Head(xs_1), FSharpList__get_Head(ys_1)), void 0), (acc.tail = t, t));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        ys_1_mut = FSharpList__get_Tail(ys_1);
        continue loop;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node_1 = loop(0, root, xs, ys);
  const t_2 = FSharpList_get_Empty();
  node_1.tail = t_2;
  return FSharpList__get_Tail(root);
}
function map3(mapping, xs, ys, zs) {
  const loop = (acc_mut, xs_1_mut, ys_1_mut, zs_1_mut) => {
    let t;
    loop: while (true) {
      const acc = acc_mut,
        xs_1 = xs_1_mut,
        ys_1 = ys_1_mut,
        zs_1 = zs_1_mut;
      if ((FSharpList__get_IsEmpty(xs_1) ? true : FSharpList__get_IsEmpty(ys_1)) ? true : FSharpList__get_IsEmpty(zs_1)) {
        return acc;
      } else {
        acc_mut = (t = new FSharpList(mapping(FSharpList__get_Head(xs_1), FSharpList__get_Head(ys_1), FSharpList__get_Head(zs_1)), void 0), (acc.tail = t, t));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        ys_1_mut = FSharpList__get_Tail(ys_1);
        zs_1_mut = FSharpList__get_Tail(zs_1);
        continue loop;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node_1 = loop(root, xs, ys, zs);
  const t_2 = FSharpList_get_Empty();
  node_1.tail = t_2;
  return FSharpList__get_Tail(root);
}
function mapFold(mapping, state, xs) {
  const root = FSharpList_get_Empty();
  const patternInput_1 = fold((tupledArg, x) => {
    let t;
    const patternInput = mapping(tupledArg[1], x);
    return [(t = new FSharpList(patternInput[0], void 0), (tupledArg[0].tail = t, t)), patternInput[1]];
  }, [root, state], xs);
  const t_2 = FSharpList_get_Empty();
  patternInput_1[0].tail = t_2;
  return [FSharpList__get_Tail(root), patternInput_1[1]];
}
function mapFoldBack(mapping, xs, state) {
  return mapFold((acc, x) => mapping(x, acc), state, reverse(xs));
}
function tryPick(f, xs) {
  const loop = xs_1_mut => {
    loop: while (true) {
      const xs_1 = xs_1_mut;
      if (FSharpList__get_IsEmpty(xs_1)) {
        return void 0;
      } else {
        const matchValue = f(FSharpList__get_Head(xs_1));
        if (matchValue == null) {
          xs_1_mut = FSharpList__get_Tail(xs_1);
          continue loop;
        } else {
          return matchValue;
        }
      }
      break;
    }
  };
  return loop(xs);
}
function pick(f, xs) {
  const matchValue = tryPick(f, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
  }
}
function tryFind(f, xs) {
  return tryPick(x => f(x) ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(x) : void 0, xs);
}
function find(f, xs) {
  const matchValue = tryFind(f, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
  }
}
function tryFindBack(f, xs) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.tryFindBack)(f, toArray(xs));
}
function findBack(f, xs) {
  const matchValue = tryFindBack(f, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
  }
}
function tryFindIndex(f, xs) {
  const loop = (i_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        xs_1 = xs_1_mut;
      if (FSharpList__get_IsEmpty(xs_1)) {
        return void 0;
      } else if (f(FSharpList__get_Head(xs_1))) {
        return i;
      } else {
        i_mut = i + 1;
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  return loop(0, xs);
}
function findIndex(f, xs) {
  const matchValue = tryFindIndex(f, xs);
  if (matchValue == null) {
    indexNotFound();
    return -1;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue) | 0;
  }
}
function tryFindIndexBack(f, xs) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.tryFindIndexBack)(f, toArray(xs));
}
function findIndexBack(f, xs) {
  const matchValue = tryFindIndexBack(f, xs);
  if (matchValue == null) {
    indexNotFound();
    return -1;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue) | 0;
  }
}
function tryItem(n, xs) {
  const loop = (i_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        xs_1 = xs_1_mut;
      if (FSharpList__get_IsEmpty(xs_1)) {
        return void 0;
      } else if (i === n) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(FSharpList__get_Head(xs_1));
      } else {
        i_mut = i + 1;
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  return loop(0, xs);
}
function item(n, xs) {
  return FSharpList__get_Item_Z524259A4(xs, n);
}
function filter(f, xs) {
  const root = FSharpList_get_Empty();
  const node = fold((acc, x) => {
    if (f(x)) {
      const t = new FSharpList(x, void 0);
      acc.tail = t;
      return t;
    } else {
      return acc;
    }
  }, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function partition(f, xs) {
  const matchValue = FSharpList_get_Empty();
  const root2 = FSharpList_get_Empty();
  const root1 = matchValue;
  const patternInput_1 = fold((tupledArg, x) => {
    let t, t_2;
    const lacc = tupledArg[0];
    const racc = tupledArg[1];
    if (f(x)) {
      return [(t = new FSharpList(x, void 0), (lacc.tail = t, t)), racc];
    } else {
      return [lacc, (t_2 = new FSharpList(x, void 0), (racc.tail = t_2, t_2))];
    }
  }, [root1, root2], xs);
  const t_4 = FSharpList_get_Empty();
  patternInput_1[0].tail = t_4;
  const t_5 = FSharpList_get_Empty();
  patternInput_1[1].tail = t_5;
  return [FSharpList__get_Tail(root1), FSharpList__get_Tail(root2)];
}
function choose(f, xs) {
  const root = FSharpList_get_Empty();
  const node = fold((acc, x) => {
    const matchValue = f(x);
    if (matchValue == null) {
      return acc;
    } else {
      const t = new FSharpList((0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue), void 0);
      acc.tail = t;
      return t;
    }
  }, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function contains(value, xs, eq) {
  return tryFindIndex(v => eq.Equals(value, v), xs) != null;
}
function initialize(n, f) {
  let xs, t;
  const root = FSharpList_get_Empty();
  let node = root;
  for (let i = 0; i <= n - 1; i++) {
    node = (xs = node, (t = new FSharpList(f(i), void 0), (xs.tail = t, t)));
  }
  const xs_2 = node;
  const t_2 = FSharpList_get_Empty();
  xs_2.tail = t_2;
  return FSharpList__get_Tail(root);
}
function replicate(n, x) {
  return initialize(n, _arg => x);
}
function reduce(f, xs) {
  if (FSharpList__get_IsEmpty(xs)) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputWasEmpty);
  } else {
    return fold(f, head(xs), tail(xs));
  }
}
function reduceBack(f, xs) {
  if (FSharpList__get_IsEmpty(xs)) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputWasEmpty);
  } else {
    return foldBack(f, tail(xs), head(xs));
  }
}
function forAll(f, xs) {
  return fold((acc, x) => acc && f(x), true, xs);
}
function forAll2(f, xs, ys) {
  return fold2((acc, x, y) => acc && f(x, y), true, xs, ys);
}
function exists(f, xs) {
  return tryFindIndex(f, xs) != null;
}
function exists2(f_mut, xs_mut, ys_mut) {
  exists2: while (true) {
    const f = f_mut,
      xs = xs_mut,
      ys = ys_mut;
    const matchValue = FSharpList__get_IsEmpty(xs);
    const matchValue_1 = FSharpList__get_IsEmpty(ys);
    let matchResult;
    if (matchValue) {
      if (matchValue_1) {
        matchResult = 0;
      } else {
        matchResult = 2;
      }
    } else if (matchValue_1) {
      matchResult = 2;
    } else {
      matchResult = 1;
    }
    switch (matchResult) {
      case 0:
        return false;
      case 1:
        if (f(FSharpList__get_Head(xs), FSharpList__get_Head(ys))) {
          return true;
        } else {
          f_mut = f;
          xs_mut = FSharpList__get_Tail(xs);
          ys_mut = FSharpList__get_Tail(ys);
          continue exists2;
        }
      default:
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_differentLengths + "\\nParameter name: " + "list2");
    }
    break;
  }
}
function unzip(xs) {
  return foldBack((tupledArg, tupledArg_1) => [FSharpList_Cons_305B8EAC(tupledArg[0], tupledArg_1[0]), FSharpList_Cons_305B8EAC(tupledArg[1], tupledArg_1[1])], xs, [FSharpList_get_Empty(), FSharpList_get_Empty()]);
}
function unzip3(xs) {
  return foldBack((tupledArg, tupledArg_1) => [FSharpList_Cons_305B8EAC(tupledArg[0], tupledArg_1[0]), FSharpList_Cons_305B8EAC(tupledArg[1], tupledArg_1[1]), FSharpList_Cons_305B8EAC(tupledArg[2], tupledArg_1[2])], xs, [FSharpList_get_Empty(), FSharpList_get_Empty(), FSharpList_get_Empty()]);
}
function zip(xs, ys) {
  return map2((x, y) => [x, y], xs, ys);
}
function zip3(xs, ys, zs) {
  return map3((x, y, z) => [x, y, z], xs, ys, zs);
}
function sortWith(comparer, xs) {
  const arr = toArray(xs);
  arr.sort(comparer);
  return ofArray(arr);
}
function sort(xs, comparer) {
  return sortWith((x, y) => comparer.Compare(x, y), xs);
}
function sortBy(projection, xs, comparer) {
  return sortWith((x, y) => comparer.Compare(projection(x), projection(y)), xs);
}
function sortDescending(xs, comparer) {
  return sortWith((x, y) => comparer.Compare(x, y) * -1, xs);
}
function sortByDescending(projection, xs, comparer) {
  return sortWith((x, y) => comparer.Compare(projection(x), projection(y)) * -1, xs);
}
function sum(xs, adder) {
  return fold((acc, x) => adder.Add(acc, x), adder.GetZero(), xs);
}
function sumBy(f, xs, adder) {
  return fold((acc, x) => adder.Add(acc, f(x)), adder.GetZero(), xs);
}
function maxBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? y : x, xs);
}
function max(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? y : x, xs);
}
function minBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? x : y, xs);
}
function min(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? x : y, xs);
}
function average(xs, averager) {
  let count = 0;
  const total = fold((acc, x) => {
    count = count + 1 | 0;
    return averager.Add(acc, x);
  }, averager.GetZero(), xs);
  return averager.DivideByInt(total, count);
}
function averageBy(f, xs, averager) {
  let count = 0;
  const total = fold((acc, x) => {
    count = count + 1 | 0;
    return averager.Add(acc, f(x));
  }, averager.GetZero(), xs);
  return averager.DivideByInt(total, count);
}
function permute(f, xs) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.permute)(f, toArray(xs)));
}
function chunkBySize(chunkSize, xs) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(ofArray, (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.chunkBySize)(chunkSize, toArray(xs))));
}
function allPairs(xs, ys) {
  const root = FSharpList_get_Empty();
  let node = root;
  iterate(x => {
    iterate(y => {
      let xs_1, t;
      node = (xs_1 = node, (t = new FSharpList([x, y], void 0), (xs_1.tail = t, t)));
    }, ys);
  }, xs);
  const xs_3 = node;
  const t_2 = FSharpList_get_Empty();
  xs_3.tail = t_2;
  return FSharpList__get_Tail(root);
}
function skip(count_mut, xs_mut) {
  skip: while (true) {
    const count = count_mut,
      xs = xs_mut;
    if (count <= 0) {
      return xs;
    } else if (FSharpList__get_IsEmpty(xs)) {
      throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_notEnoughElements + "\\nParameter name: " + "list");
    } else {
      count_mut = count - 1;
      xs_mut = FSharpList__get_Tail(xs);
      continue skip;
    }
    break;
  }
}
function skipWhile(predicate_mut, xs_mut) {
  skipWhile: while (true) {
    const predicate = predicate_mut,
      xs = xs_mut;
    if (FSharpList__get_IsEmpty(xs)) {
      return xs;
    } else if (!predicate(FSharpList__get_Head(xs))) {
      return xs;
    } else {
      predicate_mut = predicate;
      xs_mut = FSharpList__get_Tail(xs);
      continue skipWhile;
    }
    break;
  }
}
function take(count, xs) {
  if (count < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputMustBeNonNegative + "\\nParameter name: " + "count");
  }
  const loop = (i_mut, acc_mut, xs_1_mut) => {
    let t;
    loop: while (true) {
      const i = i_mut,
        acc = acc_mut,
        xs_1 = xs_1_mut;
      if (i <= 0) {
        return acc;
      } else if (FSharpList__get_IsEmpty(xs_1)) {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_notEnoughElements + "\\nParameter name: " + "list");
      } else {
        i_mut = i - 1;
        acc_mut = (t = new FSharpList(FSharpList__get_Head(xs_1), void 0), (acc.tail = t, t));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node = loop(count, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function takeWhile(predicate, xs) {
  const loop = (acc_mut, xs_1_mut) => {
    let t;
    loop: while (true) {
      const acc = acc_mut,
        xs_1 = xs_1_mut;
      if (FSharpList__get_IsEmpty(xs_1)) {
        return acc;
      } else if (!predicate(FSharpList__get_Head(xs_1))) {
        return acc;
      } else {
        acc_mut = (t = new FSharpList(FSharpList__get_Head(xs_1), void 0), (acc.tail = t, t));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node = loop(root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function truncate(count, xs) {
  const loop = (i_mut, acc_mut, xs_1_mut) => {
    let t;
    loop: while (true) {
      const i = i_mut,
        acc = acc_mut,
        xs_1 = xs_1_mut;
      if (i <= 0) {
        return acc;
      } else if (FSharpList__get_IsEmpty(xs_1)) {
        return acc;
      } else {
        i_mut = i - 1;
        acc_mut = (t = new FSharpList(FSharpList__get_Head(xs_1), void 0), (acc.tail = t, t));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node = loop(count, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function getSlice(startIndex, endIndex, xs) {
  const len = length(xs) | 0;
  let startIndex_1;
  const index = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.defaultArg)(startIndex, 0) | 0;
  startIndex_1 = index < 0 ? 0 : index;
  let endIndex_1;
  const index_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.defaultArg)(endIndex, len - 1) | 0;
  endIndex_1 = index_1 >= len ? len - 1 : index_1;
  if (endIndex_1 < startIndex_1) {
    return FSharpList_get_Empty();
  } else {
    return take(endIndex_1 - startIndex_1 + 1, skip(startIndex_1, xs));
  }
}
function splitAt(index, xs) {
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputMustBeNonNegative + "\\nParameter name: " + "index");
  }
  if (index > FSharpList__get_Length(xs)) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_notEnoughElements + "\\nParameter name: " + "index");
  }
  return [take(index, xs), skip(index, xs)];
}
function exactlyOne(xs) {
  if (FSharpList__get_IsEmpty(xs)) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputSequenceEmpty + "\\nParameter name: " + "list");
  } else if (FSharpList__get_IsEmpty(FSharpList__get_Tail(xs))) {
    return FSharpList__get_Head(xs);
  } else {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputSequenceTooLong + "\\nParameter name: " + "list");
  }
}
function tryExactlyOne(xs) {
  if (!FSharpList__get_IsEmpty(xs) && FSharpList__get_IsEmpty(FSharpList__get_Tail(xs))) {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(FSharpList__get_Head(xs));
  } else {
    return void 0;
  }
}
function where(predicate, xs) {
  return filter(predicate, xs);
}
function pairwise(xs) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.pairwise)(toArray(xs)));
}
function windowed(windowSize, xs) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(ofArray, (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.windowed)(windowSize, toArray(xs))));
}
function splitInto(chunks, xs) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(ofArray, (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.splitInto)(chunks, toArray(xs))));
}
function transpose(lists) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(ofArray, (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.transpose)((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(toArray, Array.from(lists)))));
}
function insertAt(index, y, xs) {
  let i = -1;
  let isDone = false;
  const result = fold((acc, x) => {
    i = i + 1 | 0;
    if (i === index) {
      isDone = true;
      return FSharpList_Cons_305B8EAC(x, FSharpList_Cons_305B8EAC(y, acc));
    } else {
      return FSharpList_Cons_305B8EAC(x, acc);
    }
  }, FSharpList_get_Empty(), xs);
  return reverse(isDone ? result : i + 1 === index ? FSharpList_Cons_305B8EAC(y, result) : (() => {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  })());
}
function insertManyAt(index, ys, xs) {
  let i = -1;
  let isDone = false;
  const ys_1 = ofSeq(ys);
  const result = fold((acc, x) => {
    i = i + 1 | 0;
    if (i === index) {
      isDone = true;
      return FSharpList_Cons_305B8EAC(x, append(ys_1, acc));
    } else {
      return FSharpList_Cons_305B8EAC(x, acc);
    }
  }, FSharpList_get_Empty(), xs);
  return reverse(isDone ? result : i + 1 === index ? append(ys_1, result) : (() => {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  })());
}
function removeAt(index, xs) {
  let i = -1;
  let isDone = false;
  const ys = filter(_arg => {
    i = i + 1 | 0;
    if (i === index) {
      isDone = true;
      return false;
    } else {
      return true;
    }
  }, xs);
  if (!isDone) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return ys;
}
function removeManyAt(index, count, xs) {
  let i = -1;
  let status = -1;
  const ys = filter(_arg => {
    i = i + 1 | 0;
    if (i === index) {
      status = 0;
      return false;
    } else if (i > index) {
      if (i < index + count) {
        return false;
      } else {
        status = 1;
        return true;
      }
    } else {
      return true;
    }
  }, xs);
  const status_1 = (status === 0 && i + 1 === index + count ? 1 : status) | 0;
  if (status_1 < 1) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + (status_1 < 0 ? "index" : "count"));
  }
  return ys;
}
function updateAt(index, y, xs) {
  let isDone = false;
  const ys = mapIndexed((i, x) => {
    if (i === index) {
      isDone = true;
      return y;
    } else {
      return x;
    }
  }, xs);
  if (!isDone) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return ys;
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Native.js":
/*!**************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Native.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Helpers_allocateArrayFromCons": () => (/* binding */ Helpers_allocateArrayFromCons)
/* harmony export */ });
function Helpers_allocateArrayFromCons(cons, len) {
  if (typeof cons === "function") {
    return new cons(len);
  } else {
    return new Array(len);
  }
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Numeric.js":
/*!***************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Numeric.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "isNumeric": () => (/* binding */ isNumeric),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "symbol": () => (/* binding */ symbol),
/* harmony export */   "toExponential": () => (/* binding */ toExponential),
/* harmony export */   "toFixed": () => (/* binding */ toFixed),
/* harmony export */   "toHex": () => (/* binding */ toHex),
/* harmony export */   "toPrecision": () => (/* binding */ toPrecision)
/* harmony export */ });
const symbol = Symbol("numeric");
function isNumeric(x) {
  return typeof x === "number" || typeof x === "bigint" || x?.[symbol];
}
function compare(x, y) {
  if (typeof x === "number") {
    return x < y ? -1 : x > y ? 1 : 0;
  } else if (typeof x === "bigint") {
    return x < y ? -1 : x > y ? 1 : 0;
  } else {
    return x.CompareTo(y);
  }
}
function multiply(x, y) {
  if (typeof x === "number") {
    return x * y;
  } else if (typeof x === "bigint") {
    return x * BigInt(y);
  } else {
    return x[symbol]().multiply(y);
  }
}
function toFixed(x, dp) {
  if (typeof x === "number") {
    return x.toFixed(dp);
  } else if (typeof x === "bigint") {
    return x;
  } else {
    return x[symbol]().toFixed(dp);
  }
}
function toPrecision(x, sd) {
  if (typeof x === "number") {
    return x.toPrecision(sd);
  } else if (typeof x === "bigint") {
    return x;
  } else {
    return x[symbol]().toPrecision(sd);
  }
}
function toExponential(x, dp) {
  if (typeof x === "number") {
    return x.toExponential(dp);
  } else if (typeof x === "bigint") {
    return x;
  } else {
    return x[symbol]().toExponential(dp);
  }
}
function toHex(x) {
  if (typeof x === "number") {
    return (Number(x) >>> 0).toString(16);
  } else if (typeof x === "bigint") {
    // TODO: properly handle other bit sizes
    return BigInt.asUintN(64, x).toString(16);
  } else {
    return x[symbol]().toHex();
  }
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Option.js":
/*!**************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Option.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Some": () => (/* binding */ Some),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "defaultArg": () => (/* binding */ defaultArg),
/* harmony export */   "defaultArgWith": () => (/* binding */ defaultArgWith),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "map2": () => (/* binding */ map2),
/* harmony export */   "map3": () => (/* binding */ map3),
/* harmony export */   "ofNullable": () => (/* binding */ ofNullable),
/* harmony export */   "orElse": () => (/* binding */ orElse),
/* harmony export */   "orElseWith": () => (/* binding */ orElseWith),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "toNullable": () => (/* binding */ toNullable),
/* harmony export */   "tryOp": () => (/* binding */ tryOp),
/* harmony export */   "unwrap": () => (/* binding */ unwrap),
/* harmony export */   "value": () => (/* binding */ value)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");

// Using a class here for better compatibility with TS files importing Some
class Some {
  constructor(value) {
    this.value = value;
  }
  toJSON() {
    return this.value;
  }
  // Don't add "Some" for consistency with erased options
  toString() {
    return String(this.value);
  }
  GetHashCode() {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash)(this.value);
  }
  Equals(other) {
    if (other == null) {
      return false;
    } else {
      return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(this.value, other instanceof Some ? other.value : other);
    }
  }
  CompareTo(other) {
    if (other == null) {
      return 1;
    } else {
      return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.compare)(this.value, other instanceof Some ? other.value : other);
    }
  }
}
function value(x) {
  if (x == null) {
    throw new Error("Option has no value");
  } else {
    return x instanceof Some ? x.value : x;
  }
}
function unwrap(opt) {
  return opt instanceof Some ? opt.value : opt;
}
function some(x) {
  return x == null || x instanceof Some ? new Some(x) : x;
}
function ofNullable(x) {
  // This will fail with unit probably, an alternative would be:
  // return x === null ? undefined : (x === undefined ? new Some(x) : x);
  return x == null ? undefined : x;
}
function toNullable(x) {
  return x == null ? null : value(x);
}
function flatten(x) {
  return x == null ? undefined : value(x);
}
function toArray(opt) {
  return opt == null ? [] : [value(opt)];
}
function defaultArg(opt, defaultValue) {
  return opt != null ? value(opt) : defaultValue;
}
function defaultArgWith(opt, defThunk) {
  return opt != null ? value(opt) : defThunk();
}
function orElse(opt, ifNone) {
  return opt == null ? ifNone : opt;
}
function orElseWith(opt, ifNoneThunk) {
  return opt == null ? ifNoneThunk() : opt;
}
function filter(predicate, opt) {
  return opt != null ? predicate(value(opt)) ? opt : undefined : opt;
}
function map(mapping, opt) {
  return opt != null ? some(mapping(value(opt))) : undefined;
}
function map2(mapping, opt1, opt2) {
  return opt1 != null && opt2 != null ? mapping(value(opt1), value(opt2)) : undefined;
}
function map3(mapping, opt1, opt2, opt3) {
  return opt1 != null && opt2 != null && opt3 != null ? mapping(value(opt1), value(opt2), value(opt3)) : undefined;
}
function bind(binder, opt) {
  return opt != null ? binder(value(opt)) : undefined;
}
function tryOp(op, arg) {
  try {
    return some(op(arg));
  } catch {
    return undefined;
  }
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Range.js":
/*!*************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Range.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "integralRangeStep": () => (/* binding */ integralRangeStep),
/* harmony export */   "makeRangeStepFunction": () => (/* binding */ makeRangeStepFunction),
/* harmony export */   "rangeBigInt": () => (/* binding */ rangeBigInt),
/* harmony export */   "rangeChar": () => (/* binding */ rangeChar),
/* harmony export */   "rangeDecimal": () => (/* binding */ rangeDecimal),
/* harmony export */   "rangeDouble": () => (/* binding */ rangeDouble),
/* harmony export */   "rangeInt64": () => (/* binding */ rangeInt64),
/* harmony export */   "rangeUInt64": () => (/* binding */ rangeUInt64)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Seq_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Seq.js */ "./src/Main/fable_modules/fable-library.4.1.4/Seq.js");
/* harmony import */ var _BigInt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BigInt.js */ "./src/Main/fable_modules/fable-library.4.1.4/BigInt.js");
/* harmony import */ var _Decimal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Decimal.js */ "./src/Main/fable_modules/fable-library.4.1.4/Decimal.js");




function makeRangeStepFunction(step, stop, zero, add) {
  const stepComparedWithZero = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.compare)(step, zero) | 0;
  if (stepComparedWithZero === 0) {
    throw new Error("The step of a range cannot be zero");
  }
  const stepGreaterThanZero = stepComparedWithZero > 0;
  return x => {
    const comparedWithLast = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.compare)(x, stop) | 0;
    return (stepGreaterThanZero && comparedWithLast <= 0 ? true : !stepGreaterThanZero && comparedWithLast >= 0) ? [x, add(x, step)] : void 0;
  };
}
function integralRangeStep(start, step, stop, zero, add) {
  const stepFn = makeRangeStepFunction(step, stop, zero, add);
  return (0,_Seq_js__WEBPACK_IMPORTED_MODULE_1__.delay)(() => (0,_Seq_js__WEBPACK_IMPORTED_MODULE_1__.unfold)(stepFn, start));
}
function rangeBigInt(start, step, stop) {
  return integralRangeStep(start, step, stop, (0,_BigInt_js__WEBPACK_IMPORTED_MODULE_2__.fromZero)(), _BigInt_js__WEBPACK_IMPORTED_MODULE_2__.op_Addition);
}
function rangeDecimal(start, step, stop) {
  return integralRangeStep(start, step, stop, (0,_Decimal_js__WEBPACK_IMPORTED_MODULE_3__.fromParts)(0, 0, 0, false, 0), _Decimal_js__WEBPACK_IMPORTED_MODULE_3__.op_Addition);
}
function rangeDouble(start, step, stop) {
  return integralRangeStep(start, step, stop, 0, (x, y) => x + y);
}
function rangeInt64(start, step, stop) {
  return integralRangeStep(start, step, stop, 0n, (x, y) => (0,_BigInt_js__WEBPACK_IMPORTED_MODULE_2__.toInt64)((0,_BigInt_js__WEBPACK_IMPORTED_MODULE_2__.op_Addition)(x, y)));
}
function rangeUInt64(start, step, stop) {
  return integralRangeStep(start, step, stop, 0n, (x, y) => (0,_BigInt_js__WEBPACK_IMPORTED_MODULE_2__.toUInt64)((0,_BigInt_js__WEBPACK_IMPORTED_MODULE_2__.op_Addition)(x, y)));
}
function rangeChar(start, stop) {
  const intStop = stop.charCodeAt(0) | 0;
  return (0,_Seq_js__WEBPACK_IMPORTED_MODULE_1__.delay)(() => (0,_Seq_js__WEBPACK_IMPORTED_MODULE_1__.unfold)(c => {
    if (c <= intStop) {
      return [String.fromCharCode(c), c + 1];
    } else {
      return void 0;
    }
  }, start.charCodeAt(0)));
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Reflection.js":
/*!******************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Reflection.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseInfo": () => (/* binding */ CaseInfo),
/* harmony export */   "GenericParameter": () => (/* binding */ GenericParameter),
/* harmony export */   "MethodInfo": () => (/* binding */ MethodInfo),
/* harmony export */   "TypeInfo": () => (/* binding */ TypeInfo),
/* harmony export */   "anonRecord_type": () => (/* binding */ anonRecord_type),
/* harmony export */   "array_type": () => (/* binding */ array_type),
/* harmony export */   "bigint_type": () => (/* binding */ bigint_type),
/* harmony export */   "bool_type": () => (/* binding */ bool_type),
/* harmony export */   "char_type": () => (/* binding */ char_type),
/* harmony export */   "class_type": () => (/* binding */ class_type),
/* harmony export */   "createInstance": () => (/* binding */ createInstance),
/* harmony export */   "decimal_type": () => (/* binding */ decimal_type),
/* harmony export */   "delegate_type": () => (/* binding */ delegate_type),
/* harmony export */   "enum_type": () => (/* binding */ enum_type),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "float16_type": () => (/* binding */ float16_type),
/* harmony export */   "float32_type": () => (/* binding */ float32_type),
/* harmony export */   "float64_type": () => (/* binding */ float64_type),
/* harmony export */   "fullName": () => (/* binding */ fullName),
/* harmony export */   "generic_type": () => (/* binding */ generic_type),
/* harmony export */   "getCaseFields": () => (/* binding */ getCaseFields),
/* harmony export */   "getCaseName": () => (/* binding */ getCaseName),
/* harmony export */   "getCaseTag": () => (/* binding */ getCaseTag),
/* harmony export */   "getElementType": () => (/* binding */ getElementType),
/* harmony export */   "getEnumName": () => (/* binding */ getEnumName),
/* harmony export */   "getEnumNames": () => (/* binding */ getEnumNames),
/* harmony export */   "getEnumUnderlyingType": () => (/* binding */ getEnumUnderlyingType),
/* harmony export */   "getEnumValues": () => (/* binding */ getEnumValues),
/* harmony export */   "getFunctionElements": () => (/* binding */ getFunctionElements),
/* harmony export */   "getGenericTypeDefinition": () => (/* binding */ getGenericTypeDefinition),
/* harmony export */   "getGenerics": () => (/* binding */ getGenerics),
/* harmony export */   "getHashCode": () => (/* binding */ getHashCode),
/* harmony export */   "getRecordElements": () => (/* binding */ getRecordElements),
/* harmony export */   "getRecordField": () => (/* binding */ getRecordField),
/* harmony export */   "getRecordFields": () => (/* binding */ getRecordFields),
/* harmony export */   "getTupleElements": () => (/* binding */ getTupleElements),
/* harmony export */   "getTupleField": () => (/* binding */ getTupleField),
/* harmony export */   "getTupleFields": () => (/* binding */ getTupleFields),
/* harmony export */   "getUnionCaseFields": () => (/* binding */ getUnionCaseFields),
/* harmony export */   "getUnionCases": () => (/* binding */ getUnionCases),
/* harmony export */   "getUnionFields": () => (/* binding */ getUnionFields),
/* harmony export */   "getValue": () => (/* binding */ getValue),
/* harmony export */   "int128_type": () => (/* binding */ int128_type),
/* harmony export */   "int16_type": () => (/* binding */ int16_type),
/* harmony export */   "int32_type": () => (/* binding */ int32_type),
/* harmony export */   "int64_type": () => (/* binding */ int64_type),
/* harmony export */   "int8_type": () => (/* binding */ int8_type),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isEnum": () => (/* binding */ isEnum),
/* harmony export */   "isEnumDefined": () => (/* binding */ isEnumDefined),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isGenericParameter": () => (/* binding */ isGenericParameter),
/* harmony export */   "isGenericType": () => (/* binding */ isGenericType),
/* harmony export */   "isInstanceOfType": () => (/* binding */ isInstanceOfType),
/* harmony export */   "isRecord": () => (/* binding */ isRecord),
/* harmony export */   "isSubclassOf": () => (/* binding */ isSubclassOf),
/* harmony export */   "isTuple": () => (/* binding */ isTuple),
/* harmony export */   "isUnion": () => (/* binding */ isUnion),
/* harmony export */   "lambda_type": () => (/* binding */ lambda_type),
/* harmony export */   "list_type": () => (/* binding */ list_type),
/* harmony export */   "makeGenericType": () => (/* binding */ makeGenericType),
/* harmony export */   "makeRecord": () => (/* binding */ makeRecord),
/* harmony export */   "makeTuple": () => (/* binding */ makeTuple),
/* harmony export */   "makeUnion": () => (/* binding */ makeUnion),
/* harmony export */   "measure_type": () => (/* binding */ measure_type),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "namespace": () => (/* binding */ namespace),
/* harmony export */   "nativeint_type": () => (/* binding */ nativeint_type),
/* harmony export */   "obj_type": () => (/* binding */ obj_type),
/* harmony export */   "option_type": () => (/* binding */ option_type),
/* harmony export */   "parseEnum": () => (/* binding */ parseEnum),
/* harmony export */   "record_type": () => (/* binding */ record_type),
/* harmony export */   "string_type": () => (/* binding */ string_type),
/* harmony export */   "tryParseEnum": () => (/* binding */ tryParseEnum),
/* harmony export */   "tuple_type": () => (/* binding */ tuple_type),
/* harmony export */   "uint128_type": () => (/* binding */ uint128_type),
/* harmony export */   "uint16_type": () => (/* binding */ uint16_type),
/* harmony export */   "uint32_type": () => (/* binding */ uint32_type),
/* harmony export */   "uint64_type": () => (/* binding */ uint64_type),
/* harmony export */   "uint8_type": () => (/* binding */ uint8_type),
/* harmony export */   "unativeint_type": () => (/* binding */ unativeint_type),
/* harmony export */   "union_type": () => (/* binding */ union_type),
/* harmony export */   "unit_type": () => (/* binding */ unit_type)
/* harmony export */ });
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types.js */ "./src/Main/fable_modules/fable-library.4.1.4/Types.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Decimal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Decimal.js */ "./src/Main/fable_modules/fable-library.4.1.4/Decimal.js");



class CaseInfo {
  constructor(declaringType, tag, name, fields) {
    this.declaringType = declaringType;
    this.tag = tag;
    this.name = name;
    this.fields = fields;
  }
}
class MethodInfo {
  constructor(name, parameters, returnType) {
    this.name = name;
    this.parameters = parameters;
    this.returnType = returnType;
  }
}
class TypeInfo {
  constructor(fullname, generics, construct, parent, fields, cases, enumCases) {
    this.fullname = fullname;
    this.generics = generics;
    this.construct = construct;
    this.parent = parent;
    this.fields = fields;
    this.cases = cases;
    this.enumCases = enumCases;
  }
  toString() {
    return fullName(this);
  }
  GetHashCode() {
    return getHashCode(this);
  }
  Equals(other) {
    return equals(this, other);
  }
}
class GenericParameter extends TypeInfo {
  constructor(name) {
    super(name);
  }
}
function getGenerics(t) {
  return t.generics != null ? t.generics : [];
}
function getHashCode(t) {
  const fullnameHash = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.stringHash)(t.fullname);
  const genHashes = getGenerics(t).map(getHashCode);
  return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.combineHashCodes)([fullnameHash, ...genHashes]);
}
function equals(t1, t2) {
  if (t1.fullname === "") {
    // Anonymous records
    return t2.fullname === "" && (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equalArraysWith)(getRecordElements(t1), getRecordElements(t2), ([k1, v1], [k2, v2]) => k1 === k2 && equals(v1, v2));
  } else {
    return t1.fullname === t2.fullname && (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equalArraysWith)(getGenerics(t1), getGenerics(t2), equals);
  }
}
function class_type(fullname, generics, construct, parent) {
  return new TypeInfo(fullname, generics, construct, parent);
}
function record_type(fullname, generics, construct, fields) {
  return new TypeInfo(fullname, generics, construct, undefined, fields);
}
function anonRecord_type(...fields) {
  return new TypeInfo("", undefined, undefined, undefined, () => fields);
}
function union_type(fullname, generics, construct, cases) {
  const t = new TypeInfo(fullname, generics, construct, undefined, undefined, () => {
    const caseNames = construct.prototype.cases();
    return cases().map((fields, i) => new CaseInfo(t, i, caseNames[i], fields));
  });
  return t;
}
function tuple_type(...generics) {
  return new TypeInfo("System.Tuple`" + generics.length, generics);
}
function delegate_type(...generics) {
  return new TypeInfo("System.Func`" + generics.length, generics);
}
function lambda_type(argType, returnType) {
  return new TypeInfo("Microsoft.FSharp.Core.FSharpFunc`2", [argType, returnType]);
}
function option_type(generic) {
  return new TypeInfo("Microsoft.FSharp.Core.FSharpOption`1", [generic]);
}
function list_type(generic) {
  return new TypeInfo("Microsoft.FSharp.Collections.FSharpList`1", [generic]);
}
function array_type(generic) {
  return new TypeInfo("[]", [generic]);
}
function enum_type(fullname, underlyingType, enumCases) {
  return new TypeInfo(fullname, [underlyingType], undefined, undefined, undefined, undefined, enumCases);
}
function measure_type(fullname) {
  return new TypeInfo(fullname);
}
function generic_type(name) {
  return new GenericParameter(name);
}
const obj_type = new TypeInfo("System.Object");
const unit_type = new TypeInfo("Microsoft.FSharp.Core.Unit");
const char_type = new TypeInfo("System.Char");
const string_type = new TypeInfo("System.String");
const bool_type = new TypeInfo("System.Boolean");
const int8_type = new TypeInfo("System.SByte");
const uint8_type = new TypeInfo("System.Byte");
const int16_type = new TypeInfo("System.Int16");
const uint16_type = new TypeInfo("System.UInt16");
const int32_type = new TypeInfo("System.Int32");
const uint32_type = new TypeInfo("System.UInt32");
const int64_type = new TypeInfo("System.Int64");
const uint64_type = new TypeInfo("System.UInt64");
const int128_type = new TypeInfo("System.Int128");
const uint128_type = new TypeInfo("System.UInt128");
const nativeint_type = new TypeInfo("System.IntPtr");
const unativeint_type = new TypeInfo("System.UIntPtr");
const float16_type = new TypeInfo("System.Half");
const float32_type = new TypeInfo("System.Single");
const float64_type = new TypeInfo("System.Double");
const decimal_type = new TypeInfo("System.Decimal");
const bigint_type = new TypeInfo("System.Numerics.BigInteger");
function name(info) {
  if (Array.isArray(info)) {
    return info[0];
  } else if (info instanceof TypeInfo) {
    const elemType = getElementType(info);
    if (elemType != null) {
      return name(elemType) + "[]";
    } else {
      const i = info.fullname.lastIndexOf(".");
      return i === -1 ? info.fullname : info.fullname.substr(i + 1);
    }
  } else {
    return info.name;
  }
}
function fullName(t) {
  const elemType = getElementType(t);
  if (elemType != null) {
    return fullName(elemType) + "[]";
  } else if (t.generics == null || t.generics.length === 0) {
    return t.fullname;
  } else {
    return t.fullname + "[" + t.generics.map(x => fullName(x)).join(",") + "]";
  }
}
function namespace(t) {
  const elemType = getElementType(t);
  if (elemType != null) {
    return namespace(elemType);
  } else {
    const i = t.fullname.lastIndexOf(".");
    return i === -1 ? "" : t.fullname.substr(0, i);
  }
}
function isArray(t) {
  return getElementType(t) != null;
}
function getElementType(t) {
  return t.fullname === "[]" && t.generics?.length === 1 ? t.generics[0] : undefined;
}
function isGenericType(t) {
  return t.generics != null && t.generics.length > 0;
}
function isGenericParameter(t) {
  return t instanceof GenericParameter;
}
function isEnum(t) {
  return t.enumCases != null && t.enumCases.length > 0;
}
function isSubclassOf(t1, t2) {
  return t2.fullname === obj_type.fullname || t1.parent != null && (t1.parent.Equals(t2) || isSubclassOf(t1.parent, t2));
}
function isErasedToNumber(t) {
  return isEnum(t) || [int8_type.fullname, uint8_type.fullname, int16_type.fullname, uint16_type.fullname, int32_type.fullname, uint32_type.fullname, float16_type.fullname, float32_type.fullname, float64_type.fullname].includes(t.fullname);
}
function isErasedToBigInt(t) {
  return isEnum(t) || [int64_type.fullname, uint64_type.fullname, int128_type.fullname, uint128_type.fullname, nativeint_type.fullname, unativeint_type.fullname, bigint_type.fullname].includes(t.fullname);
}
function isInstanceOfType(t, o) {
  if (t.fullname === obj_type.fullname) return true;
  switch (typeof o) {
    case "boolean":
      return t.fullname === bool_type.fullname;
    case "string":
      return t.fullname === string_type.fullname;
    case "function":
      return isFunction(t);
    case "number":
      return isErasedToNumber(t);
    case "bigint":
      return isErasedToBigInt(t);
    default:
      return t.construct != null && o instanceof t.construct;
  }
}
/**
 * This doesn't replace types for fields (records) or cases (unions)
 * but it should be enough for type comparison purposes
 */
function getGenericTypeDefinition(t) {
  return t.generics == null ? t : new TypeInfo(t.fullname, t.generics.map(() => obj_type));
}
function getEnumUnderlyingType(t) {
  return t.generics?.[0];
}
function getEnumValues(t) {
  if (isEnum(t) && t.enumCases != null) {
    return t.enumCases.map(kv => kv[1]);
  } else {
    throw new Error(`${t.fullname} is not an enum type`);
  }
}
function getEnumNames(t) {
  if (isEnum(t) && t.enumCases != null) {
    return t.enumCases.map(kv => kv[0]);
  } else {
    throw new Error(`${t.fullname} is not an enum type`);
  }
}
function getEnumCase(t, v) {
  if (t.enumCases != null) {
    if (typeof v === "string") {
      for (const kv of t.enumCases) {
        if (kv[0] === v) {
          return kv;
        }
      }
      throw new Error(`'${v}' was not found in ${t.fullname}`);
    } else {
      for (const kv of t.enumCases) {
        if (kv[1] === v) {
          return kv;
        }
      }
      // .NET returns the number even if it doesn't match any of the cases
      return ["", v];
    }
  } else {
    throw new Error(`${t.fullname} is not an enum type`);
  }
}
function parseEnum(t, str) {
  // TODO: better int parsing here, parseInt ceils floats: "4.8" -> 4
  const value = parseInt(str, 10);
  return getEnumCase(t, isNaN(value) ? str : value)[1];
}
function tryParseEnum(t, str, defValue) {
  try {
    defValue.contents = parseEnum(t, str);
    return true;
  } catch {
    return false;
  }
}
function getEnumName(t, v) {
  return getEnumCase(t, v)[0];
}
function isEnumDefined(t, v) {
  try {
    const kv = getEnumCase(t, v);
    return kv[0] != null && kv[0] !== "";
  } catch {
    // supress error
  }
  return false;
}
// FSharpType
function getUnionCases(t) {
  if (t.cases != null) {
    return t.cases();
  } else {
    throw new Error(`${t.fullname} is not an F# union type`);
  }
}
function getRecordElements(t) {
  if (t.fields != null) {
    return t.fields();
  } else {
    throw new Error(`${t.fullname} is not an F# record type`);
  }
}
function getTupleElements(t) {
  if (isTuple(t) && t.generics != null) {
    return t.generics;
  } else {
    throw new Error(`${t.fullname} is not a tuple type`);
  }
}
function getFunctionElements(t) {
  if (isFunction(t) && t.generics != null) {
    const gen = t.generics;
    return [gen[0], gen[1]];
  } else {
    throw new Error(`${t.fullname} is not an F# function type`);
  }
}
function isUnion(t) {
  return t instanceof TypeInfo ? t.cases != null : t instanceof _Types_js__WEBPACK_IMPORTED_MODULE_1__.Union;
}
function isRecord(t) {
  return t instanceof TypeInfo ? t.fields != null : t instanceof _Types_js__WEBPACK_IMPORTED_MODULE_1__.Record;
}
function isTuple(t) {
  return t.fullname.startsWith("System.Tuple");
}
// In .NET this is false for delegates
function isFunction(t) {
  return t.fullname === "Microsoft.FSharp.Core.FSharpFunc`2";
}
// FSharpValue
function getUnionFields(v, t) {
  const cases = getUnionCases(t);
  const case_ = cases[v.tag];
  if (case_ == null) {
    throw new Error(`Cannot find case ${v.name} in union type`);
  }
  return [case_, v.fields];
}
function getUnionCaseFields(uci) {
  return uci.fields == null ? [] : uci.fields;
}
// This is used as replacement of `FSharpValue.GetRecordFields`
// For `FSharpTypes.GetRecordFields` see `getRecordElements`
// Object.keys returns keys in the order they were added to the object
function getRecordFields(v) {
  return Object.keys(v).map(k => v[k]);
}
function getRecordField(v, field) {
  return v[field[0]];
}
function getTupleFields(v) {
  return v;
}
function getTupleField(v, i) {
  return v[i];
}
function makeUnion(uci, values) {
  const expectedLength = (uci.fields || []).length;
  if (values.length !== expectedLength) {
    throw new Error(`Expected an array of length ${expectedLength} but got ${values.length}`);
  }
  const construct = uci.declaringType.construct;
  if (construct == null) {
    return {};
  }
  const isSingleCase = uci.declaringType.cases ? uci.declaringType.cases().length == 1 : false;
  if (isSingleCase) {
    return new construct(...values);
  } else {
    return new construct(uci.tag, values);
  }
}
function makeRecord(t, values) {
  const fields = getRecordElements(t);
  if (fields.length !== values.length) {
    throw new Error(`Expected an array of length ${fields.length} but got ${values.length}`);
  }
  return t.construct != null ? new t.construct(...values) : fields.reduce((obj, [key, _t], i) => {
    obj[key] = values[i];
    return obj;
  }, {});
}
function makeTuple(values, _t) {
  return values;
}
function makeGenericType(t, generics) {
  return new TypeInfo(t.fullname, generics, t.construct, t.parent, t.fields, t.cases);
}
function createInstance(t, consArgs) {
  // TODO: Check if consArgs length is same as t.construct?
  // (Arg types can still be different)
  if (typeof t.construct === "function") {
    return new t.construct(...(consArgs ?? []));
  } else if (isErasedToNumber(t)) {
    return 0;
  } else if (isErasedToBigInt(t)) {
    return 0n;
  } else {
    switch (t.fullname) {
      case obj_type.fullname:
        return {};
      case bool_type.fullname:
        return false;
      case decimal_type.fullname:
        return new _Decimal_js__WEBPACK_IMPORTED_MODULE_2__["default"](0);
      case char_type.fullname:
        // Even though char is a value type, it's erased to string, and Unchecked.defaultof<char> is null
        return null;
      default:
        throw new Error(`Cannot access constructor of ${t.fullname}`);
    }
  }
}
function getValue(propertyInfo, v) {
  return v[propertyInfo[0]];
}
// Fable.Core.Reflection
function assertUnion(x) {
  if (!(x instanceof _Types_js__WEBPACK_IMPORTED_MODULE_1__.Union)) {
    throw new Error(`Value is not an F# union type`);
  }
}
function getCaseTag(x) {
  assertUnion(x);
  return x.tag;
}
function getCaseName(x) {
  assertUnion(x);
  return x.cases()[x.tag];
}
function getCaseFields(x) {
  assertUnion(x);
  return x.fields;
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/RegExp.js":
/*!**************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/RegExp.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "escape": () => (/* binding */ escape),
/* harmony export */   "isMatch": () => (/* binding */ isMatch),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "matches": () => (/* binding */ matches),
/* harmony export */   "options": () => (/* binding */ options),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "split": () => (/* binding */ split),
/* harmony export */   "unescape": () => (/* binding */ unescape)
/* harmony export */ });
function create(pattern, options = 0) {
  // Supported RegexOptions
  // * IgnoreCase:  0x0001
  // * Multiline:   0x0002
  // * Compiled:    0x0008 (ignored)
  // * Singleline:  0x0010
  // * ECMAScript:  0x0100 (ignored)
  if ((options & ~(1 ^ 2 ^ 8 ^ 16 ^ 256)) !== 0) {
    throw new Error("RegexOptions only supports: IgnoreCase, Multiline, Compiled, Singleline and ECMAScript");
  }
  // Set always global and unicode flags for compatibility with dotnet, see #2925
  let flags = "gu";
  flags += options & 1 ? "i" : ""; // 0x0001 RegexOptions.IgnoreCase
  flags += options & 2 ? "m" : "";
  flags += options & 16 ? "s" : "";
  return new RegExp(pattern, flags);
}
// From http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function unescape(str) {
  return str.replace(/\\([\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|])/g, "$1");
}
function isMatch(reg, input, startAt = 0) {
  reg.lastIndex = startAt;
  return reg.test(input);
}
function match(reg, input, startAt = 0) {
  reg.lastIndex = startAt;
  return reg.exec(input);
}
function matches(reg, input, startAt = 0) {
  if (input == null) {
    throw new Error("Input cannot ve null");
  }
  if (!reg.global) {
    throw new Error("Non-global RegExp"); // Prevent infinite loop
  }
  reg.lastIndex = startAt;
  const matches = [];
  let m;
  let lastMatchIndex = -1;
  // tslint:disable-next-line:no-conditional-assignment
  while ((m = reg.exec(input)) != null) {
    // It can happen even global regex get stuck, see #2845
    if (m.index === lastMatchIndex) {
      reg.lastIndex++;
    } else {
      lastMatchIndex = m.index;
      matches.push(m);
    }
  }
  return matches;
}
function options(reg) {
  let options = 256; // ECMAScript
  options |= reg.ignoreCase ? 1 : 0;
  options |= reg.multiline ? 2 : 0;
  return options;
}
function replace(reg, input, replacement, limit, offset = 0) {
  function replacer() {
    let res = arguments[0];
    if (limit) {
      limit--;
      const match = [];
      const len = arguments.length;
      // arguments: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_a_parameter
      // * match: matched substring
      // * p1, p2, ...: nth capture group string
      // * offset: offset of matched substring
      // * string: whole string examined
      // * groups: named capturing groups
      //           ONLY if regex contains a named capture group AND browser supports named groups
      // -> last element can be groups OR input string
      // -> check if last element is string
      const withGroups = typeof arguments[len - 1] !== "string";
      let pLast = withGroups ? len - 3 : len - 2;
      for (let i = 0; i < pLast; i++) {
        match.push(arguments[i]);
      }
      match.index = arguments[pLast++];
      match.input = arguments[pLast++];
      if (withGroups) {
        match.groups = arguments[pLast];
      }
      res = replacement(match);
    }
    return res;
  }
  if (typeof reg === "string") {
    const tmp = reg;
    reg = create(input, limit ?? 0);
    input = tmp;
    limit = undefined;
  }
  if (typeof replacement === "function") {
    limit = limit == null ? -1 : limit;
    return input.substring(0, offset) + input.substring(offset).replace(reg, replacer);
  } else {
    replacement = replacement
    // $0 doesn't work with JS regex, see #1155
    .replace(/\$0/g, _s => "$&")
    // named groups in replacement are `${name}` in .Net, but `$<name>` in JS (in regex: groups are `(?<name>...)` in both)
    .replace(/\${([^}]+)}/g, "\$<$1>");
    if (limit != null) {
      let m;
      const sub1 = input.substring(offset);
      const _matches = matches(reg, sub1);
      const sub2 = matches.length > limit ? (m = _matches[limit - 1], sub1.substring(0, m.index + m[0].length)) : sub1;
      return input.substring(0, offset) + sub2.replace(reg, replacement) + input.substring(offset + sub2.length);
    } else {
      return input.replace(reg, replacement);
    }
  }
}
function split(reg, input, limit, offset = 0) {
  if (typeof reg === "string") {
    const tmp = reg;
    reg = create(input, limit ?? 0);
    input = tmp;
    limit = undefined;
  }
  input = input.substring(offset);
  return input.split(reg, limit);
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Seq.js":
/*!***********************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Seq.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CachedSeq$1": () => (/* binding */ CachedSeq$1),
/* harmony export */   "CachedSeq$1_$ctor_Z7A8347D4": () => (/* binding */ CachedSeq$1_$ctor_Z7A8347D4),
/* harmony export */   "CachedSeq$1_$reflection": () => (/* binding */ CachedSeq$1_$reflection),
/* harmony export */   "CachedSeq$1__Clear": () => (/* binding */ CachedSeq$1__Clear),
/* harmony export */   "Enumerator_FromFunctions$1": () => (/* binding */ Enumerator_FromFunctions$1),
/* harmony export */   "Enumerator_FromFunctions$1_$ctor_58C54629": () => (/* binding */ Enumerator_FromFunctions$1_$ctor_58C54629),
/* harmony export */   "Enumerator_FromFunctions$1_$reflection": () => (/* binding */ Enumerator_FromFunctions$1_$reflection),
/* harmony export */   "Enumerator_Seq": () => (/* binding */ Enumerator_Seq),
/* harmony export */   "Enumerator_Seq_$ctor_673A07F2": () => (/* binding */ Enumerator_Seq_$ctor_673A07F2),
/* harmony export */   "Enumerator_Seq_$reflection": () => (/* binding */ Enumerator_Seq_$reflection),
/* harmony export */   "Enumerator_alreadyFinished": () => (/* binding */ Enumerator_alreadyFinished),
/* harmony export */   "Enumerator_cast": () => (/* binding */ Enumerator_cast),
/* harmony export */   "Enumerator_concat": () => (/* binding */ Enumerator_concat),
/* harmony export */   "Enumerator_enumerateThenFinally": () => (/* binding */ Enumerator_enumerateThenFinally),
/* harmony export */   "Enumerator_generateWhileSome": () => (/* binding */ Enumerator_generateWhileSome),
/* harmony export */   "Enumerator_noReset": () => (/* binding */ Enumerator_noReset),
/* harmony export */   "Enumerator_notStarted": () => (/* binding */ Enumerator_notStarted),
/* harmony export */   "Enumerator_unfold": () => (/* binding */ Enumerator_unfold),
/* harmony export */   "SR_enumerationAlreadyFinished": () => (/* binding */ SR_enumerationAlreadyFinished),
/* harmony export */   "SR_enumerationNotStarted": () => (/* binding */ SR_enumerationNotStarted),
/* harmony export */   "SR_inputSequenceEmpty": () => (/* binding */ SR_inputSequenceEmpty),
/* harmony export */   "SR_inputSequenceTooLong": () => (/* binding */ SR_inputSequenceTooLong),
/* harmony export */   "SR_keyNotFoundAlt": () => (/* binding */ SR_keyNotFoundAlt),
/* harmony export */   "SR_notEnoughElements": () => (/* binding */ SR_notEnoughElements),
/* harmony export */   "SR_resetNotSupported": () => (/* binding */ SR_resetNotSupported),
/* harmony export */   "allPairs": () => (/* binding */ allPairs),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "average": () => (/* binding */ average),
/* harmony export */   "averageBy": () => (/* binding */ averageBy),
/* harmony export */   "cache": () => (/* binding */ cache),
/* harmony export */   "cast": () => (/* binding */ cast),
/* harmony export */   "checkNonNull": () => (/* binding */ checkNonNull),
/* harmony export */   "choose": () => (/* binding */ choose),
/* harmony export */   "chunkBySize": () => (/* binding */ chunkBySize),
/* harmony export */   "collect": () => (/* binding */ collect),
/* harmony export */   "compareWith": () => (/* binding */ compareWith),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "contains": () => (/* binding */ contains),
/* harmony export */   "delay": () => (/* binding */ delay),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "enumerateFromFunctions": () => (/* binding */ enumerateFromFunctions),
/* harmony export */   "enumerateThenFinally": () => (/* binding */ enumerateThenFinally),
/* harmony export */   "enumerateUsing": () => (/* binding */ enumerateUsing),
/* harmony export */   "enumerateWhile": () => (/* binding */ enumerateWhile),
/* harmony export */   "exactlyOne": () => (/* binding */ exactlyOne),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "exists2": () => (/* binding */ exists2),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findBack": () => (/* binding */ findBack),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "findIndexBack": () => (/* binding */ findIndexBack),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "fold2": () => (/* binding */ fold2),
/* harmony export */   "foldBack": () => (/* binding */ foldBack),
/* harmony export */   "foldBack2": () => (/* binding */ foldBack2),
/* harmony export */   "forAll": () => (/* binding */ forAll),
/* harmony export */   "forAll2": () => (/* binding */ forAll2),
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "generateIndexed": () => (/* binding */ generateIndexed),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "indexNotFound": () => (/* binding */ indexNotFound),
/* harmony export */   "indexed": () => (/* binding */ indexed),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "initializeInfinite": () => (/* binding */ initializeInfinite),
/* harmony export */   "insertAt": () => (/* binding */ insertAt),
/* harmony export */   "insertManyAt": () => (/* binding */ insertManyAt),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "item": () => (/* binding */ item),
/* harmony export */   "iterate": () => (/* binding */ iterate),
/* harmony export */   "iterate2": () => (/* binding */ iterate2),
/* harmony export */   "iterateIndexed": () => (/* binding */ iterateIndexed),
/* harmony export */   "iterateIndexed2": () => (/* binding */ iterateIndexed2),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "map2": () => (/* binding */ map2),
/* harmony export */   "map3": () => (/* binding */ map3),
/* harmony export */   "mapFold": () => (/* binding */ mapFold),
/* harmony export */   "mapFoldBack": () => (/* binding */ mapFoldBack),
/* harmony export */   "mapIndexed": () => (/* binding */ mapIndexed),
/* harmony export */   "mapIndexed2": () => (/* binding */ mapIndexed2),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxBy": () => (/* binding */ maxBy),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minBy": () => (/* binding */ minBy),
/* harmony export */   "mkSeq": () => (/* binding */ mkSeq),
/* harmony export */   "ofArray": () => (/* binding */ ofArray),
/* harmony export */   "ofList": () => (/* binding */ ofList),
/* harmony export */   "ofSeq": () => (/* binding */ ofSeq),
/* harmony export */   "pairwise": () => (/* binding */ pairwise),
/* harmony export */   "permute": () => (/* binding */ permute),
/* harmony export */   "pick": () => (/* binding */ pick),
/* harmony export */   "readOnly": () => (/* binding */ readOnly),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceBack": () => (/* binding */ reduceBack),
/* harmony export */   "removeAt": () => (/* binding */ removeAt),
/* harmony export */   "removeManyAt": () => (/* binding */ removeManyAt),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "scan": () => (/* binding */ scan),
/* harmony export */   "scanBack": () => (/* binding */ scanBack),
/* harmony export */   "singleton": () => (/* binding */ singleton),
/* harmony export */   "skip": () => (/* binding */ skip),
/* harmony export */   "skipWhile": () => (/* binding */ skipWhile),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "sortByDescending": () => (/* binding */ sortByDescending),
/* harmony export */   "sortDescending": () => (/* binding */ sortDescending),
/* harmony export */   "sortWith": () => (/* binding */ sortWith),
/* harmony export */   "splitInto": () => (/* binding */ splitInto),
/* harmony export */   "sum": () => (/* binding */ sum),
/* harmony export */   "sumBy": () => (/* binding */ sumBy),
/* harmony export */   "tail": () => (/* binding */ tail),
/* harmony export */   "take": () => (/* binding */ take),
/* harmony export */   "takeWhile": () => (/* binding */ takeWhile),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "toList": () => (/* binding */ toList),
/* harmony export */   "transpose": () => (/* binding */ transpose),
/* harmony export */   "truncate": () => (/* binding */ truncate),
/* harmony export */   "tryExactlyOne": () => (/* binding */ tryExactlyOne),
/* harmony export */   "tryFind": () => (/* binding */ tryFind),
/* harmony export */   "tryFindBack": () => (/* binding */ tryFindBack),
/* harmony export */   "tryFindIndex": () => (/* binding */ tryFindIndex),
/* harmony export */   "tryFindIndexBack": () => (/* binding */ tryFindIndexBack),
/* harmony export */   "tryHead": () => (/* binding */ tryHead),
/* harmony export */   "tryItem": () => (/* binding */ tryItem),
/* harmony export */   "tryLast": () => (/* binding */ tryLast),
/* harmony export */   "tryPick": () => (/* binding */ tryPick),
/* harmony export */   "unfold": () => (/* binding */ unfold),
/* harmony export */   "updateAt": () => (/* binding */ updateAt),
/* harmony export */   "where": () => (/* binding */ where),
/* harmony export */   "windowed": () => (/* binding */ windowed),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "zip3": () => (/* binding */ zip3)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types.js */ "./src/Main/fable_modules/fable-library.4.1.4/Types.js");
/* harmony import */ var _Reflection_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Reflection.js */ "./src/Main/fable_modules/fable-library.4.1.4/Reflection.js");
/* harmony import */ var _Option_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Option.js */ "./src/Main/fable_modules/fable-library.4.1.4/Option.js");
/* harmony import */ var _FSharp_Core_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FSharp.Core.js */ "./src/Main/fable_modules/fable-library.4.1.4/FSharp.Core.js");
/* harmony import */ var _Array_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Array.js */ "./src/Main/fable_modules/fable-library.4.1.4/Array.js");
/* harmony import */ var _List_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./List.js */ "./src/Main/fable_modules/fable-library.4.1.4/List.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Global.js */ "./src/Main/fable_modules/fable-library.4.1.4/Global.js");








const SR_enumerationAlreadyFinished = "Enumeration already finished.";
const SR_enumerationNotStarted = "Enumeration has not started. Call MoveNext.";
const SR_inputSequenceEmpty = "The input sequence was empty.";
const SR_inputSequenceTooLong = "The input sequence contains more than one element.";
const SR_keyNotFoundAlt = "An index satisfying the predicate was not found in the collection.";
const SR_notEnoughElements = "The input sequence has an insufficient number of elements.";
const SR_resetNotSupported = "Reset is not supported on this enumerator.";
function Enumerator_noReset() {
  throw new Error(SR_resetNotSupported);
}
function Enumerator_notStarted() {
  throw new Error(SR_enumerationNotStarted);
}
function Enumerator_alreadyFinished() {
  throw new Error(SR_enumerationAlreadyFinished);
}
class Enumerator_Seq {
  constructor(f) {
    this.f = f;
  }
  toString() {
    const xs = this;
    let i = 0;
    let str = "seq [";
    const e = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(xs);
    try {
      while (i < 4 && e["System.Collections.IEnumerator.MoveNext"]()) {
        if (i > 0) {
          str = str + "; ";
        }
        str = str + (0,_Types_js__WEBPACK_IMPORTED_MODULE_1__.toString)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        i = i + 1 | 0;
      }
      if (i === 4) {
        str = str + "; ...";
      }
      return str + "]";
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    }
  }
  GetEnumerator() {
    const x = this;
    return x.f();
  }
  [Symbol.iterator]() {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.toIterator)((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(this));
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const x = this;
    return x.f();
  }
}
function Enumerator_Seq_$reflection(gen0) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_2__.class_type)("SeqModule.Enumerator.Seq", [gen0], Enumerator_Seq);
}
function Enumerator_Seq_$ctor_673A07F2(f) {
  return new Enumerator_Seq(f);
}
class Enumerator_FromFunctions$1 {
  constructor(current, next, dispose) {
    this.current = current;
    this.next = next;
    this.dispose = dispose;
  }
  "System.Collections.Generic.IEnumerator`1.get_Current"() {
    const _ = this;
    return _.current();
  }
  "System.Collections.IEnumerator.get_Current"() {
    const _ = this;
    return _.current();
  }
  "System.Collections.IEnumerator.MoveNext"() {
    const _ = this;
    return _.next();
  }
  "System.Collections.IEnumerator.Reset"() {
    Enumerator_noReset();
  }
  Dispose() {
    const _ = this;
    _.dispose();
  }
}
function Enumerator_FromFunctions$1_$reflection(gen0) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_2__.class_type)("SeqModule.Enumerator.FromFunctions`1", [gen0], Enumerator_FromFunctions$1);
}
function Enumerator_FromFunctions$1_$ctor_58C54629(current, next, dispose) {
  return new Enumerator_FromFunctions$1(current, next, dispose);
}
function Enumerator_cast(e) {
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => e["System.Collections.Generic.IEnumerator`1.get_Current"](), () => e["System.Collections.IEnumerator.MoveNext"](), () => {
    const e_1 = e;
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function Enumerator_concat(sources) {
  let outerOpt = void 0;
  let innerOpt = void 0;
  let started = false;
  let finished = false;
  let curr = void 0;
  const finish = () => {
    finished = true;
    if (innerOpt != null) {
      const inner = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(innerOpt);
      try {
        (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(inner);
      } finally {
        innerOpt = void 0;
      }
    }
    if (outerOpt != null) {
      const outer = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(outerOpt);
      try {
        (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(outer);
      } finally {
        outerOpt = void 0;
      }
    }
  };
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => {
    if (!started) {
      Enumerator_notStarted();
    } else if (finished) {
      Enumerator_alreadyFinished();
    }
    if (curr != null) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr);
    } else {
      return Enumerator_alreadyFinished();
    }
  }, () => {
    let copyOfStruct;
    if (!started) {
      started = true;
    }
    if (finished) {
      return false;
    } else {
      let res = void 0;
      while (res == null) {
        const outerOpt_1 = outerOpt;
        const innerOpt_1 = innerOpt;
        if (outerOpt_1 != null) {
          if (innerOpt_1 != null) {
            const inner_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(innerOpt_1);
            if (inner_1["System.Collections.IEnumerator.MoveNext"]()) {
              curr = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(inner_1["System.Collections.Generic.IEnumerator`1.get_Current"]());
              res = true;
            } else {
              try {
                (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(inner_1);
              } finally {
                innerOpt = void 0;
              }
            }
          } else {
            const outer_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(outerOpt_1);
            if (outer_1["System.Collections.IEnumerator.MoveNext"]()) {
              const ie = outer_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
              innerOpt = (copyOfStruct = ie, (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(copyOfStruct));
            } else {
              finish();
              res = false;
            }
          }
        } else {
          outerOpt = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(sources);
        }
      }
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(res);
    }
  }, () => {
    if (!finished) {
      finish();
    }
  });
}
function Enumerator_enumerateThenFinally(f, e) {
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => e["System.Collections.Generic.IEnumerator`1.get_Current"](), () => e["System.Collections.IEnumerator.MoveNext"](), () => {
    try {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    } finally {
      f();
    }
  });
}
function Enumerator_generateWhileSome(openf, compute, closef) {
  let started = false;
  let curr = void 0;
  let state = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(openf());
  const dispose = () => {
    if (state != null) {
      const x_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(state);
      try {
        closef(x_1);
      } finally {
        state = void 0;
      }
    }
  };
  const finish = () => {
    try {
      dispose();
    } finally {
      curr = void 0;
    }
  };
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => {
    if (!started) {
      Enumerator_notStarted();
    }
    if (curr != null) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr);
    } else {
      return Enumerator_alreadyFinished();
    }
  }, () => {
    if (!started) {
      started = true;
    }
    if (state != null) {
      const s = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(state);
      let matchValue_1;
      try {
        matchValue_1 = compute(s);
      } catch (matchValue) {
        finish();
        throw matchValue;
      }
      if (matchValue_1 != null) {
        curr = matchValue_1;
        return true;
      } else {
        finish();
        return false;
      }
    } else {
      return false;
    }
  }, dispose);
}
function Enumerator_unfold(f, state) {
  let curr = void 0;
  let acc = state;
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => {
    if (curr != null) {
      const x = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr)[0];
      const st = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr)[1];
      return x;
    } else {
      return Enumerator_notStarted();
    }
  }, () => {
    curr = f(acc);
    if (curr != null) {
      const x_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr)[0];
      const st_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr)[1];
      acc = st_1;
      return true;
    } else {
      return false;
    }
  }, () => {});
}
function indexNotFound() {
  throw new Error(SR_keyNotFoundAlt);
}
function checkNonNull(argName, arg) {
  if (arg == null) {
    (0,_FSharp_Core_js__WEBPACK_IMPORTED_MODULE_4__.Operators_NullArg)(argName);
  }
}
function mkSeq(f) {
  return Enumerator_Seq_$ctor_673A07F2(f);
}
function ofSeq(xs) {
  checkNonNull("source", xs);
  return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(xs);
}
function delay(generator) {
  return mkSeq(() => (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(generator()));
}
function concat(sources) {
  return mkSeq(() => Enumerator_concat(sources));
}
function unfold(generator, state) {
  return mkSeq(() => Enumerator_unfold(generator, state));
}
function empty() {
  return delay(() => new Array(0));
}
function singleton(x) {
  return delay(() => (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.singleton)(x));
}
function ofArray(arr) {
  return arr;
}
function toArray(xs) {
  if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    const a = xs;
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.toArray)(a);
  } else {
    return Array.from(xs);
  }
}
function ofList(xs) {
  return xs;
}
function toList(xs) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(xs)) {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.ofArray)(xs);
  } else if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    return xs;
  } else {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.ofSeq)(xs);
  }
}
function generate(create, compute, dispose) {
  return mkSeq(() => Enumerator_generateWhileSome(create, compute, dispose));
}
function generateIndexed(create, compute, dispose) {
  return mkSeq(() => {
    let i = -1;
    return Enumerator_generateWhileSome(create, x => {
      i = i + 1 | 0;
      return compute(i, x);
    }, dispose);
  });
}
function append(xs, ys) {
  return concat([xs, ys]);
}
function cast(xs) {
  return mkSeq(() => {
    checkNonNull("source", xs);
    return Enumerator_cast((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(xs));
  });
}
function choose(chooser, xs) {
  return generate(() => ofSeq(xs), e => {
    let curr = void 0;
    while (curr == null && e["System.Collections.IEnumerator.MoveNext"]()) {
      curr = chooser(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return curr;
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function compareWith(comparer, xs, ys) {
  const e1 = ofSeq(xs);
  try {
    const e2 = ofSeq(ys);
    try {
      let c = 0;
      let b1 = e1["System.Collections.IEnumerator.MoveNext"]();
      let b2 = e2["System.Collections.IEnumerator.MoveNext"]();
      while (c === 0 && b1 && b2) {
        c = comparer(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]()) | 0;
        if (c === 0) {
          b1 = e1["System.Collections.IEnumerator.MoveNext"]();
          b2 = e2["System.Collections.IEnumerator.MoveNext"]();
        }
      }
      return (c !== 0 ? c : b1 ? 1 : b2 ? -1 : 0) | 0;
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e2);
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e1);
  }
}
function contains(value, xs, comparer) {
  const e = ofSeq(xs);
  try {
    let found = false;
    while (!found && e["System.Collections.IEnumerator.MoveNext"]()) {
      found = comparer.Equals(value, e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return found;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function enumerateFromFunctions(create, moveNext, current) {
  return generate(create, x => moveNext(x) ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(current(x)) : void 0, x_1 => {
    const matchValue = x_1;
    if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isDisposable)(matchValue)) {
      const id = matchValue;
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(id);
    }
  });
}
function enumerateThenFinally(source, compensation) {
  const compensation_1 = compensation;
  return mkSeq(() => {
    try {
      return Enumerator_enumerateThenFinally(compensation_1, ofSeq(source));
    } catch (matchValue) {
      compensation_1();
      throw matchValue;
    }
  });
}
function enumerateUsing(resource, source) {
  const compensation = () => {
    if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(resource, (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.defaultOf)())) {} else {
      let copyOfStruct = resource;
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(copyOfStruct);
    }
  };
  return mkSeq(() => {
    try {
      return Enumerator_enumerateThenFinally(compensation, ofSeq(source(resource)));
    } catch (matchValue_1) {
      compensation();
      throw matchValue_1;
    }
  });
}
function enumerateWhile(guard, xs) {
  return concat(unfold(i => guard() ? [xs, i + 1] : void 0, 0));
}
function filter(f, xs) {
  return choose(x => {
    if (f(x)) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(x);
    } else {
      return void 0;
    }
  }, xs);
}
function exists(predicate, xs) {
  const e = ofSeq(xs);
  try {
    let found = false;
    while (!found && e["System.Collections.IEnumerator.MoveNext"]()) {
      found = predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return found;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function exists2(predicate, xs, ys) {
  const e1 = ofSeq(xs);
  try {
    const e2 = ofSeq(ys);
    try {
      let found = false;
      while (!found && e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]()) {
        found = predicate(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]());
      }
      return found;
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e2);
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e1);
  }
}
function exactlyOne(xs) {
  const e = ofSeq(xs);
  try {
    if (e["System.Collections.IEnumerator.MoveNext"]()) {
      const v = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
      if (e["System.Collections.IEnumerator.MoveNext"]()) {
        throw new Error(SR_inputSequenceTooLong + "\\nParameter name: " + "source");
      } else {
        return v;
      }
    } else {
      throw new Error(SR_inputSequenceEmpty + "\\nParameter name: " + "source");
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function tryExactlyOne(xs) {
  const e = ofSeq(xs);
  try {
    if (e["System.Collections.IEnumerator.MoveNext"]()) {
      const v = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
      return e["System.Collections.IEnumerator.MoveNext"]() ? void 0 : (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(v);
    } else {
      return void 0;
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function tryFind(predicate, xs) {
  const e = ofSeq(xs);
  try {
    let res = void 0;
    while (res == null && e["System.Collections.IEnumerator.MoveNext"]()) {
      const c = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
      if (predicate(c)) {
        res = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(c);
      }
    }
    return res;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function find(predicate, xs) {
  const matchValue = tryFind(predicate, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function tryFindBack(predicate, xs) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.tryFindBack)(predicate, toArray(xs));
}
function findBack(predicate, xs) {
  const matchValue = tryFindBack(predicate, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function tryFindIndex(predicate, xs) {
  const e = ofSeq(xs);
  try {
    const loop = i_mut => {
      loop: while (true) {
        const i = i_mut;
        if (e["System.Collections.IEnumerator.MoveNext"]()) {
          if (predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) {
            return i;
          } else {
            i_mut = i + 1;
            continue loop;
          }
        } else {
          return void 0;
        }
        break;
      }
    };
    return loop(0);
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function findIndex(predicate, xs) {
  const matchValue = tryFindIndex(predicate, xs);
  if (matchValue == null) {
    indexNotFound();
    return -1;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue) | 0;
  }
}
function tryFindIndexBack(predicate, xs) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.tryFindIndexBack)(predicate, toArray(xs));
}
function findIndexBack(predicate, xs) {
  const matchValue = tryFindIndexBack(predicate, xs);
  if (matchValue == null) {
    indexNotFound();
    return -1;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue) | 0;
  }
}
function fold(folder, state, xs) {
  const e = ofSeq(xs);
  try {
    let acc = state;
    while (e["System.Collections.IEnumerator.MoveNext"]()) {
      acc = folder(acc, e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return acc;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function foldBack(folder, xs, state) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.foldBack)(folder, toArray(xs), state);
}
function fold2(folder, state, xs, ys) {
  const e1 = ofSeq(xs);
  try {
    const e2 = ofSeq(ys);
    try {
      let acc = state;
      while (e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]()) {
        acc = folder(acc, e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]());
      }
      return acc;
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e2);
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e1);
  }
}
function foldBack2(folder, xs, ys, state) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.foldBack2)(folder, toArray(xs), toArray(ys), state);
}
function forAll(predicate, xs) {
  return !exists(x => !predicate(x), xs);
}
function forAll2(predicate, xs, ys) {
  return !exists2((x, y) => !predicate(x, y), xs, ys);
}
function tryHead(xs) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(xs)) {
    return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.tryHead)(xs);
  } else if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.tryHead)(xs);
  } else {
    const e = ofSeq(xs);
    try {
      return e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : void 0;
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    }
  }
}
function head(xs) {
  const matchValue = tryHead(xs);
  if (matchValue == null) {
    throw new Error(SR_inputSequenceEmpty + "\\nParameter name: " + "source");
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function initialize(count, f) {
  return unfold(i => i < count ? [f(i), i + 1] : void 0, 0);
}
function initializeInfinite(f) {
  return initialize(2147483647, f);
}
function isEmpty(xs) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(xs)) {
    const a = xs;
    return a.length === 0;
  } else if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(xs);
  } else {
    const e = ofSeq(xs);
    try {
      return !e["System.Collections.IEnumerator.MoveNext"]();
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    }
  }
}
function tryItem(index, xs) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(xs)) {
    return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.tryItem)(index, xs);
  } else if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.tryItem)(index, xs);
  } else {
    const e = ofSeq(xs);
    try {
      const loop = index_1_mut => {
        loop: while (true) {
          const index_1 = index_1_mut;
          if (!e["System.Collections.IEnumerator.MoveNext"]()) {
            return void 0;
          } else if (index_1 === 0) {
            return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
          } else {
            index_1_mut = index_1 - 1;
            continue loop;
          }
          break;
        }
      };
      return loop(index);
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    }
  }
}
function item(index, xs) {
  const matchValue = tryItem(index, xs);
  if (matchValue == null) {
    throw new Error(SR_notEnoughElements + "\\nParameter name: " + "index");
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function iterate(action, xs) {
  fold((unitVar, x) => {
    action(x);
  }, void 0, xs);
}
function iterate2(action, xs, ys) {
  fold2((unitVar, x, y) => {
    action(x, y);
  }, void 0, xs, ys);
}
function iterateIndexed(action, xs) {
  fold((i, x) => {
    action(i, x);
    return i + 1 | 0;
  }, 0, xs);
}
function iterateIndexed2(action, xs, ys) {
  fold2((i, x, y) => {
    action(i, x, y);
    return i + 1 | 0;
  }, 0, xs, ys);
}
function tryLast(xs) {
  const e = ofSeq(xs);
  try {
    const loop = acc_mut => {
      loop: while (true) {
        const acc = acc_mut;
        if (!e["System.Collections.IEnumerator.MoveNext"]()) {
          return acc;
        } else {
          acc_mut = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
          continue loop;
        }
        break;
      }
    };
    return e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(loop(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function last(xs) {
  const matchValue = tryLast(xs);
  if (matchValue == null) {
    throw new Error(SR_notEnoughElements + "\\nParameter name: " + "source");
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function length(xs) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(xs)) {
    const a = xs;
    return a.length | 0;
  } else if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.length)(xs) | 0;
  } else {
    const e = ofSeq(xs);
    try {
      let count = 0;
      while (e["System.Collections.IEnumerator.MoveNext"]()) {
        count = count + 1 | 0;
      }
      return count | 0;
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    }
  }
}
function map(mapping, xs) {
  return generate(() => ofSeq(xs), e => e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(mapping(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function mapIndexed(mapping, xs) {
  return generateIndexed(() => ofSeq(xs), (i, e) => e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(mapping(i, e["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function indexed(xs) {
  return mapIndexed((i, x) => [i, x], xs);
}
function map2(mapping, xs, ys) {
  return generate(() => [ofSeq(xs), ofSeq(ys)], tupledArg => {
    const e1 = tupledArg[0];
    const e2 = tupledArg[1];
    return e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(mapping(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0;
  }, tupledArg_1 => {
    try {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[0]);
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[1]);
    }
  });
}
function mapIndexed2(mapping, xs, ys) {
  return generateIndexed(() => [ofSeq(xs), ofSeq(ys)], (i, tupledArg) => {
    const e1 = tupledArg[0];
    const e2 = tupledArg[1];
    return e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(mapping(i, e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0;
  }, tupledArg_1 => {
    try {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[0]);
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[1]);
    }
  });
}
function map3(mapping, xs, ys, zs) {
  return generate(() => [ofSeq(xs), ofSeq(ys), ofSeq(zs)], tupledArg => {
    const e1 = tupledArg[0];
    const e2 = tupledArg[1];
    const e3 = tupledArg[2];
    return e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]() && e3["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(mapping(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"](), e3["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0;
  }, tupledArg_1 => {
    try {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[0]);
    } finally {
      try {
        (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[1]);
      } finally {
        (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[2]);
      }
    }
  });
}
function readOnly(xs) {
  checkNonNull("source", xs);
  return map(x => x, xs);
}
class CachedSeq$1 {
  constructor(cleanup, res) {
    this.cleanup = cleanup;
    this.res = res;
  }
  Dispose() {
    const _ = this;
    _.cleanup();
  }
  GetEnumerator() {
    const _ = this;
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(_.res);
  }
  [Symbol.iterator]() {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.toIterator)((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(this));
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const _ = this;
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(_.res);
  }
}
function CachedSeq$1_$reflection(gen0) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_2__.class_type)("SeqModule.CachedSeq`1", [gen0], CachedSeq$1);
}
function CachedSeq$1_$ctor_Z7A8347D4(cleanup, res) {
  return new CachedSeq$1(cleanup, res);
}
function CachedSeq$1__Clear(_) {
  _.cleanup();
}
function cache(source) {
  checkNonNull("source", source);
  const prefix = [];
  let enumeratorR = void 0;
  return CachedSeq$1_$ctor_Z7A8347D4(() => {
    (0,_FSharp_Core_js__WEBPACK_IMPORTED_MODULE_4__.Operators_Lock)(prefix, () => {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.clear)(prefix);
      let matchResult, e;
      if (enumeratorR != null) {
        if ((0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(enumeratorR) != null) {
          matchResult = 0;
          e = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)((0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(enumeratorR));
        } else {
          matchResult = 1;
        }
      } else {
        matchResult = 1;
      }
      switch (matchResult) {
        case 0:
          {
            (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
            break;
          }
      }
      enumeratorR = void 0;
    });
  }, unfold(i_1 => (0,_FSharp_Core_js__WEBPACK_IMPORTED_MODULE_4__.Operators_Lock)(prefix, () => {
    if (i_1 < prefix.length) {
      return [prefix[i_1], i_1 + 1];
    } else {
      if (i_1 >= prefix.length) {
        let optEnumerator_2;
        if (enumeratorR != null) {
          optEnumerator_2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(enumeratorR);
        } else {
          const optEnumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(source);
          enumeratorR = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(optEnumerator);
          optEnumerator_2 = optEnumerator;
        }
        if (optEnumerator_2 == null) {} else {
          const enumerator = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(optEnumerator_2);
          if (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            void prefix.push(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]());
          } else {
            (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(enumerator);
            enumeratorR = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(void 0);
          }
        }
      }
      if (i_1 < prefix.length) {
        return [prefix[i_1], i_1 + 1];
      } else {
        return void 0;
      }
    }
  }), 0));
}
function allPairs(xs, ys) {
  const ysCache = cache(ys);
  return delay(() => concat(map(x => map(y => [x, y], ysCache), xs)));
}
function mapFold(mapping, state, xs) {
  const patternInput = (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.mapFold)(mapping, state, toArray(xs));
  return [readOnly(patternInput[0]), patternInput[1]];
}
function mapFoldBack(mapping, xs, state) {
  const patternInput = (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.mapFoldBack)(mapping, toArray(xs), state);
  return [readOnly(patternInput[0]), patternInput[1]];
}
function tryPick(chooser, xs) {
  const e = ofSeq(xs);
  try {
    let res = void 0;
    while (res == null && e["System.Collections.IEnumerator.MoveNext"]()) {
      res = chooser(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return res;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function pick(chooser, xs) {
  const matchValue = tryPick(chooser, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function reduce(folder, xs) {
  const e = ofSeq(xs);
  try {
    const loop = acc_mut => {
      loop: while (true) {
        const acc = acc_mut;
        if (e["System.Collections.IEnumerator.MoveNext"]()) {
          acc_mut = folder(acc, e["System.Collections.Generic.IEnumerator`1.get_Current"]());
          continue loop;
        } else {
          return acc;
        }
        break;
      }
    };
    if (e["System.Collections.IEnumerator.MoveNext"]()) {
      return loop(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    } else {
      throw new Error(SR_inputSequenceEmpty);
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function reduceBack(folder, xs) {
  const arr = toArray(xs);
  if (arr.length > 0) {
    return arr.reduceRight(folder);
  } else {
    throw new Error(SR_inputSequenceEmpty);
  }
}
function replicate(n, x) {
  return initialize(n, _arg => x);
}
function reverse(xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.reverse)(toArray(xs))));
}
function scan(folder, state, xs) {
  return delay(() => {
    let acc = state;
    return concat([singleton(state), map(x => {
      acc = folder(acc, x);
      return acc;
    }, xs)]);
  });
}
function scanBack(folder, xs, state) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.scanBack)(folder, toArray(xs), state)));
}
function skip(count, source) {
  return mkSeq(() => {
    const e = ofSeq(source);
    try {
      for (let _ = 1; _ <= count; _++) {
        if (!e["System.Collections.IEnumerator.MoveNext"]()) {
          throw new Error(SR_notEnoughElements + "\\nParameter name: " + "source");
        }
      }
      return Enumerator_enumerateThenFinally(() => {}, e);
    } catch (matchValue) {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
      throw matchValue;
    }
  });
}
function skipWhile(predicate, xs) {
  return delay(() => {
    let skipped = true;
    return filter(x => {
      if (skipped) {
        skipped = predicate(x);
      }
      return !skipped;
    }, xs);
  });
}
function tail(xs) {
  return skip(1, xs);
}
function take(count, xs) {
  return generateIndexed(() => ofSeq(xs), (i, e) => {
    if (i < count) {
      if (e["System.Collections.IEnumerator.MoveNext"]()) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
      } else {
        throw new Error(SR_notEnoughElements + "\\nParameter name: " + "source");
      }
    } else {
      return void 0;
    }
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function takeWhile(predicate, xs) {
  return generate(() => ofSeq(xs), e => e["System.Collections.IEnumerator.MoveNext"]() && predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : void 0, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function truncate(count, xs) {
  return generateIndexed(() => ofSeq(xs), (i, e) => i < count && e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : void 0, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function zip(xs, ys) {
  return map2((x, y) => [x, y], xs, ys);
}
function zip3(xs, ys, zs) {
  return map3((x, y, z) => [x, y, z], xs, ys, zs);
}
function collect(mapping, xs) {
  return delay(() => concat(map(mapping, xs)));
}
function where(predicate, xs) {
  return filter(predicate, xs);
}
function pairwise(xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.pairwise)(toArray(xs))));
}
function splitInto(chunks, xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.splitInto)(chunks, toArray(xs))));
}
function windowed(windowSize, xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.windowed)(windowSize, toArray(xs))));
}
function transpose(xss) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.map)(ofArray, (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.transpose)((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.map)(toArray, toArray(xss))))));
}
function sortWith(comparer, xs) {
  return delay(() => {
    const arr = toArray(xs);
    arr.sort(comparer);
    return ofArray(arr);
  });
}
function sort(xs, comparer) {
  return sortWith((x, y) => comparer.Compare(x, y), xs);
}
function sortBy(projection, xs, comparer) {
  return sortWith((x, y) => comparer.Compare(projection(x), projection(y)), xs);
}
function sortDescending(xs, comparer) {
  return sortWith((x, y) => comparer.Compare(x, y) * -1, xs);
}
function sortByDescending(projection, xs, comparer) {
  return sortWith((x, y) => comparer.Compare(projection(x), projection(y)) * -1, xs);
}
function sum(xs, adder) {
  return fold((acc, x) => adder.Add(acc, x), adder.GetZero(), xs);
}
function sumBy(f, xs, adder) {
  return fold((acc, x) => adder.Add(acc, f(x)), adder.GetZero(), xs);
}
function maxBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? y : x, xs);
}
function max(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? y : x, xs);
}
function minBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? x : y, xs);
}
function min(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? x : y, xs);
}
function average(xs, averager) {
  let count = 0;
  const total = fold((acc, x) => {
    count = count + 1 | 0;
    return averager.Add(acc, x);
  }, averager.GetZero(), xs);
  if (count === 0) {
    throw new Error(SR_inputSequenceEmpty + "\\nParameter name: " + "source");
  } else {
    return averager.DivideByInt(total, count);
  }
}
function averageBy(f, xs, averager) {
  let count = 0;
  const total = fold((acc, x) => {
    count = count + 1 | 0;
    return averager.Add(acc, f(x));
  }, averager.GetZero(), xs);
  if (count === 0) {
    throw new Error(SR_inputSequenceEmpty + "\\nParameter name: " + "source");
  } else {
    return averager.DivideByInt(total, count);
  }
}
function permute(f, xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.permute)(f, toArray(xs))));
}
function chunkBySize(chunkSize, xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.chunkBySize)(chunkSize, toArray(xs))));
}
function insertAt(index, y, xs) {
  let isDone = false;
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return generateIndexed(() => ofSeq(xs), (i, e) => {
    if ((isDone ? true : i < index) && e["System.Collections.IEnumerator.MoveNext"]()) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    } else if (i === index) {
      isDone = true;
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(y);
    } else {
      if (!isDone) {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
      }
      return void 0;
    }
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function insertManyAt(index, ys, xs) {
  let status = -1;
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return generateIndexed(() => [ofSeq(xs), ofSeq(ys)], (i, tupledArg) => {
    const e1 = tupledArg[0];
    const e2 = tupledArg[1];
    if (i === index) {
      status = 0;
    }
    let inserted;
    if (status === 0) {
      if (e2["System.Collections.IEnumerator.MoveNext"]()) {
        inserted = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e2["System.Collections.Generic.IEnumerator`1.get_Current"]());
      } else {
        status = 1;
        inserted = void 0;
      }
    } else {
      inserted = void 0;
    }
    if (inserted == null) {
      if (e1["System.Collections.IEnumerator.MoveNext"]()) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e1["System.Collections.Generic.IEnumerator`1.get_Current"]());
      } else {
        if (status < 1) {
          throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
        }
        return void 0;
      }
    } else {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)((0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(inserted));
    }
  }, tupledArg_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[0]);
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[1]);
  });
}
function removeAt(index, xs) {
  let isDone = false;
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return generateIndexed(() => ofSeq(xs), (i, e) => {
    if ((isDone ? true : i < index) && e["System.Collections.IEnumerator.MoveNext"]()) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    } else if (i === index && e["System.Collections.IEnumerator.MoveNext"]()) {
      isDone = true;
      return e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : void 0;
    } else {
      if (!isDone) {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
      }
      return void 0;
    }
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function removeManyAt(index, count, xs) {
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return generateIndexed(() => ofSeq(xs), (i, e) => {
    if (i < index) {
      if (e["System.Collections.IEnumerator.MoveNext"]()) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
      } else {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
      }
    } else {
      if (i === index) {
        for (let _ = 1; _ <= count; _++) {
          if (!e["System.Collections.IEnumerator.MoveNext"]()) {
            throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "count");
          }
        }
      }
      return e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : void 0;
    }
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function updateAt(index, y, xs) {
  let isDone = false;
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return generateIndexed(() => ofSeq(xs), (i, e) => {
    if ((isDone ? true : i < index) && e["System.Collections.IEnumerator.MoveNext"]()) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    } else if (i === index && e["System.Collections.IEnumerator.MoveNext"]()) {
      isDone = true;
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(y);
    } else {
      if (!isDone) {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
      }
      return void 0;
    }
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/String.js":
/*!**************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/String.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "compareOrdinal": () => (/* binding */ compareOrdinal),
/* harmony export */   "compareTo": () => (/* binding */ compareTo),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "endsWith": () => (/* binding */ endsWith),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "fmt": () => (/* binding */ fmt),
/* harmony export */   "fmtWith": () => (/* binding */ fmtWith),
/* harmony export */   "format": () => (/* binding */ format),
/* harmony export */   "fromBase64String": () => (/* binding */ fromBase64String),
/* harmony export */   "fsFormat": () => (/* binding */ fsFormat),
/* harmony export */   "getCharAtIndex": () => (/* binding */ getCharAtIndex),
/* harmony export */   "getFormat": () => (/* binding */ getFormat),
/* harmony export */   "indexOfAny": () => (/* binding */ indexOfAny),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "insert": () => (/* binding */ insert),
/* harmony export */   "interpolate": () => (/* binding */ interpolate),
/* harmony export */   "isNullOrEmpty": () => (/* binding */ isNullOrEmpty),
/* harmony export */   "isNullOrWhiteSpace": () => (/* binding */ isNullOrWhiteSpace),
/* harmony export */   "join": () => (/* binding */ join),
/* harmony export */   "joinWithIndices": () => (/* binding */ joinWithIndices),
/* harmony export */   "padLeft": () => (/* binding */ padLeft),
/* harmony export */   "padRight": () => (/* binding */ padRight),
/* harmony export */   "printf": () => (/* binding */ printf),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "split": () => (/* binding */ split),
/* harmony export */   "startsWith": () => (/* binding */ startsWith),
/* harmony export */   "substring": () => (/* binding */ substring),
/* harmony export */   "toBase64String": () => (/* binding */ toBase64String),
/* harmony export */   "toConsole": () => (/* binding */ toConsole),
/* harmony export */   "toConsoleError": () => (/* binding */ toConsoleError),
/* harmony export */   "toFail": () => (/* binding */ toFail),
/* harmony export */   "toText": () => (/* binding */ toText),
/* harmony export */   "trim": () => (/* binding */ trim),
/* harmony export */   "trimEnd": () => (/* binding */ trimEnd),
/* harmony export */   "trimStart": () => (/* binding */ trimStart)
/* harmony export */ });
/* harmony import */ var _Date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Date.js */ "./src/Main/fable_modules/fable-library.4.1.4/Date.js");
/* harmony import */ var _Numeric_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Numeric.js */ "./src/Main/fable_modules/fable-library.4.1.4/Numeric.js");
/* harmony import */ var _RegExp_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RegExp.js */ "./src/Main/fable_modules/fable-library.4.1.4/RegExp.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Types.js */ "./src/Main/fable_modules/fable-library.4.1.4/Types.js");




const fsFormatRegExp = /(^|[^%])%([0+\- ]*)(\*|\d+)?(?:\.(\d+))?(\w)/g;
const interpolateRegExp = /(?:(^|[^%])%([0+\- ]*)(\d+)?(?:\.(\d+))?(\w))?%P\(\)/g;
const formatRegExp = /\{(\d+)(,-?\d+)?(?:\:([a-zA-Z])(\d{0,2})|\:(.+?))?\}/g;
function isLessThan(x, y) {
  return (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.compare)(x, y) < 0;
}
function cmp(x, y, ic) {
  function isIgnoreCase(i) {
    return i === true || i === 1 /* StringComparison.CurrentCultureIgnoreCase */ || i === 3 /* StringComparison.InvariantCultureIgnoreCase */ || i === 5 /* StringComparison.OrdinalIgnoreCase */;
  }
  function isOrdinal(i) {
    return i === 4 /* StringComparison.Ordinal */ || i === 5 /* StringComparison.OrdinalIgnoreCase */;
  }
  if (x == null) {
    return y == null ? 0 : -1;
  }
  if (y == null) {
    return 1;
  } // everything is bigger than null
  if (isOrdinal(ic)) {
    if (isIgnoreCase(ic)) {
      x = x.toLowerCase();
      y = y.toLowerCase();
    }
    return x === y ? 0 : x < y ? -1 : 1;
  } else {
    if (isIgnoreCase(ic)) {
      x = x.toLocaleLowerCase();
      y = y.toLocaleLowerCase();
    }
    return x.localeCompare(y);
  }
}
function compare(...args) {
  switch (args.length) {
    case 2:
      return cmp(args[0], args[1], false);
    case 3:
      return cmp(args[0], args[1], args[2]);
    case 4:
      return cmp(args[0], args[1], args[2] === true);
    case 5:
      return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), false);
    case 6:
      return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5]);
    case 7:
      return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5] === true);
    default:
      throw new Error("String.compare: Unsupported number of parameters");
  }
}
function compareOrdinal(x, y) {
  return cmp(x, y, 4 /* StringComparison.Ordinal */);
}
function compareTo(x, y) {
  return cmp(x, y, 0 /* StringComparison.CurrentCulture */);
}
function startsWith(str, pattern, ic) {
  if (str.length >= pattern.length) {
    return cmp(str.substr(0, pattern.length), pattern, ic) === 0;
  }
  return false;
}
function indexOfAny(str, anyOf, ...args) {
  if (str == null || str === "") {
    return -1;
  }
  const startIndex = args.length > 0 ? args[0] : 0;
  if (startIndex < 0) {
    throw new Error("Start index cannot be negative");
  }
  const length = args.length > 1 ? args[1] : str.length - startIndex;
  if (length < 0) {
    throw new Error("Length cannot be negative");
  }
  if (startIndex + length > str.length) {
    throw new Error("Invalid startIndex and length");
  }
  str = str.substring(startIndex, startIndex + length);
  for (const c of anyOf) {
    const index = str.indexOf(c);
    if (index > -1) {
      return index + startIndex;
    }
  }
  return -1;
}
function printf(input) {
  return {
    input,
    cont: fsFormat(input)
  };
}
function interpolate(str, values) {
  let valIdx = 0;
  let strIdx = 0;
  let result = "";
  interpolateRegExp.lastIndex = 0;
  let match = interpolateRegExp.exec(str);
  while (match) {
    // The first group corresponds to the no-escape char (^|[^%]), the actual pattern starts in the next char
    // Note: we don't use negative lookbehind because some browsers don't support it yet
    const matchIndex = match.index + (match[1] || "").length;
    result += str.substring(strIdx, matchIndex).replace(/%%/g, "%");
    const [,, flags, padLength, precision, format] = match;
    // Save interpolateRegExp.lastIndex before running formatReplacement because the values
    // may also involve interpolation and make use of interpolateRegExp (see #3078)
    strIdx = interpolateRegExp.lastIndex;
    result += formatReplacement(values[valIdx++], flags, padLength, precision, format);
    // Move interpolateRegExp.lastIndex one char behind to make sure we match the no-escape char next time
    interpolateRegExp.lastIndex = strIdx - 1;
    match = interpolateRegExp.exec(str);
  }
  result += str.substring(strIdx).replace(/%%/g, "%");
  return result;
}
function continuePrint(cont, arg) {
  return typeof arg === "string" ? cont(arg) : arg.cont(cont);
}
function toConsole(arg) {
  // Don't remove the lambda here, see #1357
  return continuePrint(x => console.log(x), arg);
}
function toConsoleError(arg) {
  return continuePrint(x => console.error(x), arg);
}
function toText(arg) {
  return continuePrint(x => x, arg);
}
function toFail(arg) {
  return continuePrint(x => {
    throw new Error(x);
  }, arg);
}
function formatReplacement(rep, flags, padLength, precision, format) {
  let sign = "";
  flags = flags || "";
  format = format || "";
  if ((0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.isNumeric)(rep)) {
    if (format.toLowerCase() !== "x") {
      if (isLessThan(rep, 0)) {
        rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.multiply)(rep, -1);
        sign = "-";
      } else {
        if (flags.indexOf(" ") >= 0) {
          sign = " ";
        } else if (flags.indexOf("+") >= 0) {
          sign = "+";
        }
      }
    }
    precision = precision == null ? null : parseInt(precision, 10);
    switch (format) {
      case "f":
      case "F":
        precision = precision != null ? precision : 6;
        rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toFixed)(rep, precision);
        break;
      case "g":
      case "G":
        rep = precision != null ? (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toPrecision)(rep, precision) : (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toPrecision)(rep);
        break;
      case "e":
      case "E":
        rep = precision != null ? (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toExponential)(rep, precision) : (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toExponential)(rep);
        break;
      case "x":
        rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toHex)(rep);
        break;
      case "X":
        rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toHex)(rep).toUpperCase();
        break;
      default:
        // AOid
        rep = String(rep);
        break;
    }
  } else if (rep instanceof Date) {
    rep = (0,_Date_js__WEBPACK_IMPORTED_MODULE_1__.toString)(rep);
  } else {
    rep = (0,_Types_js__WEBPACK_IMPORTED_MODULE_2__.toString)(rep);
  }
  padLength = typeof padLength === "number" ? padLength : parseInt(padLength, 10);
  if (!isNaN(padLength)) {
    const zeroFlag = flags.indexOf("0") >= 0; // Use '0' for left padding
    const minusFlag = flags.indexOf("-") >= 0; // Right padding
    const ch = minusFlag || !zeroFlag ? " " : "0";
    if (ch === "0") {
      rep = pad(rep, padLength - sign.length, ch, minusFlag);
      rep = sign + rep;
    } else {
      rep = pad(sign + rep, padLength, ch, minusFlag);
    }
  } else {
    rep = sign + rep;
  }
  return rep;
}
function createPrinter(cont, _strParts, _matches, _result = "", padArg = -1) {
  return (...args) => {
    // Make copies of the values passed by reference because the function can be used multiple times
    let result = _result;
    const strParts = _strParts.slice();
    const matches = _matches.slice();
    for (const arg of args) {
      const [,, flags, _padLength, precision, format] = matches[0];
      let padLength = _padLength;
      if (padArg >= 0) {
        padLength = padArg;
        padArg = -1;
      } else if (padLength === "*") {
        if (arg < 0) {
          throw new Error("Non-negative number required");
        }
        padArg = arg;
        continue;
      }
      result += strParts[0];
      result += formatReplacement(arg, flags, padLength, precision, format);
      strParts.splice(0, 1);
      matches.splice(0, 1);
    }
    if (matches.length === 0) {
      result += strParts[0];
      return cont(result);
    } else {
      return createPrinter(cont, strParts, matches, result, padArg);
    }
  };
}
function fsFormat(str) {
  return cont => {
    fsFormatRegExp.lastIndex = 0;
    const strParts = [];
    const matches = [];
    let strIdx = 0;
    let match = fsFormatRegExp.exec(str);
    while (match) {
      // The first group corresponds to the no-escape char (^|[^%]), the actual pattern starts in the next char
      // Note: we don't use negative lookbehind because some browsers don't support it yet
      const matchIndex = match.index + (match[1] || "").length;
      strParts.push(str.substring(strIdx, matchIndex).replace(/%%/g, "%"));
      matches.push(match);
      strIdx = fsFormatRegExp.lastIndex;
      // Likewise we need to move fsFormatRegExp.lastIndex one char behind to make sure we match the no-escape char next time
      fsFormatRegExp.lastIndex -= 1;
      match = fsFormatRegExp.exec(str);
    }
    if (strParts.length === 0) {
      return cont(str.replace(/%%/g, "%"));
    } else {
      strParts.push(str.substring(strIdx).replace(/%%/g, "%"));
      return createPrinter(cont, strParts, matches);
    }
  };
}
function format(str, ...args) {
  let str2;
  if (typeof str === "object") {
    // Called with culture info
    str2 = String(args[0]);
    args.shift();
  } else {
    str2 = str;
  }
  return str2.replace(formatRegExp, (_, idx, padLength, format, precision, pattern) => {
    if (idx < 0 || idx >= args.length) {
      throw new Error("Index must be greater or equal to zero and less than the arguments' length.");
    }
    let rep = args[idx];
    if ((0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.isNumeric)(rep)) {
      precision = precision == null ? null : parseInt(precision, 10);
      switch (format) {
        case "f":
        case "F":
          precision = precision != null ? precision : 2;
          rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toFixed)(rep, precision);
          break;
        case "g":
        case "G":
          rep = precision != null ? (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toPrecision)(rep, precision) : (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toPrecision)(rep);
          break;
        case "e":
        case "E":
          rep = precision != null ? (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toExponential)(rep, precision) : (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toExponential)(rep);
          break;
        case "p":
        case "P":
          precision = precision != null ? precision : 2;
          rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toFixed)((0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.multiply)(rep, 100), precision) + " %";
          break;
        case "d":
        case "D":
          rep = precision != null ? padLeft(String(rep), precision, "0") : String(rep);
          break;
        case "x":
        case "X":
          rep = precision != null ? padLeft((0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toHex)(rep), precision, "0") : (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toHex)(rep);
          if (format === "X") {
            rep = rep.toUpperCase();
          }
          break;
        default:
          if (pattern) {
            let sign = "";
            rep = pattern.replace(/([0#,]+)(\.[0#]+)?/, (_, intPart, decimalPart) => {
              if (isLessThan(rep, 0)) {
                rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.multiply)(rep, -1);
                sign = "-";
              }
              decimalPart = decimalPart == null ? "" : decimalPart.substring(1);
              rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toFixed)(rep, Math.max(decimalPart.length, 0));
              let [repInt, repDecimal] = rep.split(".");
              repDecimal || (repDecimal = "");
              const leftZeroes = intPart.replace(/,/g, "").replace(/^#+/, "").length;
              repInt = padLeft(repInt, leftZeroes, "0");
              const rightZeros = decimalPart.replace(/#+$/, "").length;
              if (rightZeros > repDecimal.length) {
                repDecimal = padRight(repDecimal, rightZeros, "0");
              } else if (rightZeros < repDecimal.length) {
                repDecimal = repDecimal.substring(0, rightZeros) + repDecimal.substring(rightZeros).replace(/0+$/, "");
              }
              // Thousands separator
              if (intPart.indexOf(",") > 0) {
                const i = repInt.length % 3;
                const thousandGroups = Math.floor(repInt.length / 3);
                let thousands = i > 0 ? repInt.substr(0, i) + (thousandGroups > 0 ? "," : "") : "";
                for (let j = 0; j < thousandGroups; j++) {
                  thousands += repInt.substr(i + j * 3, 3) + (j < thousandGroups - 1 ? "," : "");
                }
                repInt = thousands;
              }
              return repDecimal.length > 0 ? repInt + "." + repDecimal : repInt;
            });
            rep = sign + rep;
          }
      }
    } else if (rep instanceof Date) {
      rep = (0,_Date_js__WEBPACK_IMPORTED_MODULE_1__.toString)(rep, pattern || format);
    } else {
      rep = (0,_Types_js__WEBPACK_IMPORTED_MODULE_2__.toString)(rep);
    }
    padLength = parseInt((padLength || " ").substring(1), 10);
    if (!isNaN(padLength)) {
      rep = pad(String(rep), Math.abs(padLength), " ", padLength < 0);
    }
    return rep;
  });
}
function endsWith(str, search) {
  const idx = str.lastIndexOf(search);
  return idx >= 0 && idx === str.length - search.length;
}
function initialize(n, f) {
  if (n < 0) {
    throw new Error("String length must be non-negative");
  }
  const xs = new Array(n);
  for (let i = 0; i < n; i++) {
    xs[i] = f(i);
  }
  return xs.join("");
}
function insert(str, startIndex, value) {
  if (startIndex < 0 || startIndex > str.length) {
    throw new Error("startIndex is negative or greater than the length of this instance.");
  }
  return str.substring(0, startIndex) + value + str.substring(startIndex);
}
function isNullOrEmpty(str) {
  return typeof str !== "string" || str.length === 0;
}
function isNullOrWhiteSpace(str) {
  return typeof str !== "string" || /^\s*$/.test(str);
}
function concat(...xs) {
  return xs.map(x => String(x)).join("");
}
function join(delimiter, xs) {
  if (Array.isArray(xs)) {
    return xs.join(delimiter);
  } else {
    return Array.from(xs).join(delimiter);
  }
}
function joinWithIndices(delimiter, xs, startIndex, count) {
  const endIndexPlusOne = startIndex + count;
  if (endIndexPlusOne > xs.length) {
    throw new Error("Index and count must refer to a location within the buffer.");
  }
  return xs.slice(startIndex, endIndexPlusOne).join(delimiter);
}
function notSupported(name) {
  throw new Error("The environment doesn't support '" + name + "', please use a polyfill.");
}
function toBase64String(inArray) {
  let str = "";
  for (let i = 0; i < inArray.length; i++) {
    str += String.fromCharCode(inArray[i]);
  }
  return typeof btoa === "function" ? btoa(str) : notSupported("btoa");
}
function fromBase64String(b64Encoded) {
  const binary = typeof atob === "function" ? atob(b64Encoded) : notSupported("atob");
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
function pad(str, len, ch, isRight) {
  ch = ch || " ";
  len = len - str.length;
  for (let i = 0; i < len; i++) {
    str = isRight ? str + ch : ch + str;
  }
  return str;
}
function padLeft(str, len, ch) {
  return pad(str, len, ch);
}
function padRight(str, len, ch) {
  return pad(str, len, ch, true);
}
function remove(str, startIndex, count) {
  if (startIndex >= str.length) {
    throw new Error("startIndex must be less than length of string");
  }
  if (typeof count === "number" && startIndex + count > str.length) {
    throw new Error("Index and count must refer to a location within the string.");
  }
  return str.slice(0, startIndex) + (typeof count === "number" ? str.substr(startIndex + count) : "");
}
function replace(str, search, replace) {
  return str.replace(new RegExp((0,_RegExp_js__WEBPACK_IMPORTED_MODULE_3__.escape)(search), "g"), replace);
}
function replicate(n, x) {
  return initialize(n, () => x);
}
function getCharAtIndex(input, index) {
  if (index < 0 || index >= input.length) {
    throw new Error("Index was outside the bounds of the array.");
  }
  return input[index];
}
function split(str, splitters, count, options) {
  count = typeof count === "number" ? count : undefined;
  options = typeof options === "number" ? options : 0;
  if (count && count < 0) {
    throw new Error("Count cannot be less than zero");
  }
  if (count === 0) {
    return [];
  }
  const removeEmpty = (options & 1) === 1;
  const trim = (options & 2) === 2;
  splitters = splitters || [];
  splitters = splitters.filter(x => x).map(_RegExp_js__WEBPACK_IMPORTED_MODULE_3__.escape);
  splitters = splitters.length > 0 ? splitters : ["\\s"];
  const splits = [];
  const reg = new RegExp(splitters.join("|"), "g");
  let findSplits = true;
  let i = 0;
  do {
    const match = reg.exec(str);
    if (match === null) {
      const candidate = trim ? str.substring(i).trim() : str.substring(i);
      if (!removeEmpty || candidate.length > 0) {
        splits.push(candidate);
      }
      findSplits = false;
    } else {
      const candidate = trim ? str.substring(i, match.index).trim() : str.substring(i, match.index);
      if (!removeEmpty || candidate.length > 0) {
        if (count != null && splits.length + 1 === count) {
          splits.push(trim ? str.substring(i).trim() : str.substring(i));
          findSplits = false;
        } else {
          splits.push(candidate);
        }
      }
      i = reg.lastIndex;
    }
  } while (findSplits);
  return splits;
}
function trim(str, ...chars) {
  if (chars.length === 0) {
    return str.trim();
  }
  const pattern = "[" + (0,_RegExp_js__WEBPACK_IMPORTED_MODULE_3__.escape)(chars.join("")) + "]+";
  return str.replace(new RegExp("^" + pattern), "").replace(new RegExp(pattern + "$"), "");
}
function trimStart(str, ...chars) {
  return chars.length === 0 ? str.trimStart() : str.replace(new RegExp("^[" + (0,_RegExp_js__WEBPACK_IMPORTED_MODULE_3__.escape)(chars.join("")) + "]+"), "");
}
function trimEnd(str, ...chars) {
  return chars.length === 0 ? str.trimEnd() : str.replace(new RegExp("[" + (0,_RegExp_js__WEBPACK_IMPORTED_MODULE_3__.escape)(chars.join("")) + "]+$"), "");
}
function filter(pred, x) {
  return x.split("").filter(c => pred(c)).join("");
}
function substring(str, startIndex, length) {
  if (startIndex + (length || 0) > str.length) {
    throw new Error("Invalid startIndex and/or length");
  }
  return length != null ? str.substr(startIndex, length) : str.substr(startIndex);
}
function fmt(strs, ...args) {
  return {
    strs,
    args
  };
}
function fmtWith(fmts) {
  return (strs, ...args) => ({
    strs,
    args,
    fmts
  });
}
function getFormat(s) {
  return s.fmts ? s.strs.reduce((acc, newPart, index) => acc + `{${String(index - 1) + s.fmts[index - 1]}}` + newPart) : s.strs.reduce((acc, newPart, index) => acc + `{${index - 1}}` + newPart);
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/System.Text.js":
/*!*******************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/System.Text.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StringBuilder": () => (/* binding */ StringBuilder),
/* harmony export */   "StringBuilder_$ctor": () => (/* binding */ StringBuilder_$ctor),
/* harmony export */   "StringBuilder_$ctor_Z18115A39": () => (/* binding */ StringBuilder_$ctor_Z18115A39),
/* harmony export */   "StringBuilder_$ctor_Z524259A4": () => (/* binding */ StringBuilder_$ctor_Z524259A4),
/* harmony export */   "StringBuilder_$ctor_Z721C83C5": () => (/* binding */ StringBuilder_$ctor_Z721C83C5),
/* harmony export */   "StringBuilder_$reflection": () => (/* binding */ StringBuilder_$reflection),
/* harmony export */   "StringBuilder__AppendFormat_433E080": () => (/* binding */ StringBuilder__AppendFormat_433E080),
/* harmony export */   "StringBuilder__AppendFormat_Z696D8D1B": () => (/* binding */ StringBuilder__AppendFormat_Z696D8D1B),
/* harmony export */   "StringBuilder__AppendLine": () => (/* binding */ StringBuilder__AppendLine),
/* harmony export */   "StringBuilder__AppendLine_Z721C83C5": () => (/* binding */ StringBuilder__AppendLine_Z721C83C5),
/* harmony export */   "StringBuilder__Append_244C7CD6": () => (/* binding */ StringBuilder__Append_244C7CD6),
/* harmony export */   "StringBuilder__Append_43A65C09": () => (/* binding */ StringBuilder__Append_43A65C09),
/* harmony export */   "StringBuilder__Append_487EF8FB": () => (/* binding */ StringBuilder__Append_487EF8FB),
/* harmony export */   "StringBuilder__Append_4E60E31B": () => (/* binding */ StringBuilder__Append_4E60E31B),
/* harmony export */   "StringBuilder__Append_5E38073B": () => (/* binding */ StringBuilder__Append_5E38073B),
/* harmony export */   "StringBuilder__Append_Z1FBCCD16": () => (/* binding */ StringBuilder__Append_Z1FBCCD16),
/* harmony export */   "StringBuilder__Append_Z372E4D23": () => (/* binding */ StringBuilder__Append_Z372E4D23),
/* harmony export */   "StringBuilder__Append_Z524259A4": () => (/* binding */ StringBuilder__Append_Z524259A4),
/* harmony export */   "StringBuilder__Append_Z721C83C5": () => (/* binding */ StringBuilder__Append_Z721C83C5),
/* harmony export */   "StringBuilder__Clear": () => (/* binding */ StringBuilder__Clear),
/* harmony export */   "StringBuilder__Replace_Z384F8060": () => (/* binding */ StringBuilder__Replace_Z384F8060),
/* harmony export */   "StringBuilder__Replace_Z766F94C0": () => (/* binding */ StringBuilder__Replace_Z766F94C0),
/* harmony export */   "StringBuilder__ToString_Z37302880": () => (/* binding */ StringBuilder__ToString_Z37302880),
/* harmony export */   "StringBuilder__get_Length": () => (/* binding */ StringBuilder__get_Length)
/* harmony export */ });
/* harmony import */ var _String_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./String.js */ "./src/Main/fable_modules/fable-library.4.1.4/String.js");
/* harmony import */ var _Reflection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reflection.js */ "./src/Main/fable_modules/fable-library.4.1.4/Reflection.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types.js */ "./src/Main/fable_modules/fable-library.4.1.4/Types.js");




class StringBuilder {
  constructor(value, capacity) {
    this.buf = [];
    if (!(0,_String_js__WEBPACK_IMPORTED_MODULE_0__.isNullOrEmpty)(value)) {
      void this.buf.push(value);
    }
  }
  toString() {
    const _ = this;
    return (0,_String_js__WEBPACK_IMPORTED_MODULE_0__.join)("", _.buf);
  }
}
function StringBuilder_$reflection() {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_1__.class_type)("System.Text.StringBuilder", void 0, StringBuilder);
}
function StringBuilder_$ctor_Z18115A39(value, capacity) {
  return new StringBuilder(value, capacity);
}
function StringBuilder_$ctor_Z524259A4(capacity) {
  return StringBuilder_$ctor_Z18115A39("", capacity);
}
function StringBuilder_$ctor_Z721C83C5(value) {
  return StringBuilder_$ctor_Z18115A39(value, 16);
}
function StringBuilder_$ctor() {
  return StringBuilder_$ctor_Z18115A39("", 16);
}
function StringBuilder__Append_Z721C83C5(x, s) {
  void x.buf.push(s);
  return x;
}
function StringBuilder__Append_487EF8FB(x, s, startIndex, count) {
  void x.buf.push((0,_String_js__WEBPACK_IMPORTED_MODULE_0__.substring)(s, startIndex, count));
  return x;
}
function StringBuilder__Append_244C7CD6(x, c) {
  void x.buf.push(c);
  return x;
}
function StringBuilder__Append_Z524259A4(x, o) {
  void x.buf.push((0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.int32ToString)(o));
  return x;
}
function StringBuilder__Append_5E38073B(x, o) {
  void x.buf.push(o.toString());
  return x;
}
function StringBuilder__Append_Z1FBCCD16(x, o) {
  void x.buf.push((0,_Types_js__WEBPACK_IMPORTED_MODULE_3__.toString)(o));
  return x;
}
function StringBuilder__Append_4E60E31B(x, o) {
  void x.buf.push((0,_Types_js__WEBPACK_IMPORTED_MODULE_3__.toString)(o));
  return x;
}
function StringBuilder__Append_Z372E4D23(x, cs) {
  void x.buf.push(cs.join(''));
  return x;
}
function StringBuilder__Append_43A65C09(x, s) {
  void x.buf.push((0,_Types_js__WEBPACK_IMPORTED_MODULE_3__.toString)(s));
  return x;
}
function StringBuilder__AppendFormat_433E080(x, fmt, o) {
  void x.buf.push((0,_String_js__WEBPACK_IMPORTED_MODULE_0__.format)(fmt, o));
  return x;
}
function StringBuilder__AppendFormat_Z696D8D1B(x, provider, fmt, o) {
  void x.buf.push((0,_String_js__WEBPACK_IMPORTED_MODULE_0__.format)(provider, fmt, o));
  return x;
}
function StringBuilder__AppendLine(x) {
  void x.buf.push("\n");
  return x;
}
function StringBuilder__AppendLine_Z721C83C5(x, s) {
  void x.buf.push(s);
  void x.buf.push("\n");
  return x;
}
function StringBuilder__Replace_Z766F94C0(x, oldValue, newValue) {
  for (let i = x.buf.length - 1; i >= 0; i--) {
    x.buf[i] = (0,_String_js__WEBPACK_IMPORTED_MODULE_0__.replace)(x.buf[i], oldValue, newValue);
  }
  return x;
}
function StringBuilder__Replace_Z384F8060(x, oldValue, newValue) {
  for (let i = x.buf.length - 1; i >= 0; i--) {
    x.buf[i] = (0,_String_js__WEBPACK_IMPORTED_MODULE_0__.replace)(x.buf[i], oldValue, newValue);
  }
  return x;
}
function StringBuilder__get_Length(x) {
  let len = 0;
  for (let i = x.buf.length - 1; i >= 0; i--) {
    len = len + x.buf[i].length | 0;
  }
  return len | 0;
}
function StringBuilder__ToString_Z37302880(x, firstIndex, length) {
  return (0,_String_js__WEBPACK_IMPORTED_MODULE_0__.substring)((0,_Types_js__WEBPACK_IMPORTED_MODULE_3__.toString)(x), firstIndex, length);
}
function StringBuilder__Clear(x) {
  (0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.clear)(x.buf);
  return x;
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/SystemException.js":
/*!***********************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/SystemException.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SystemException": () => (/* binding */ SystemException),
/* harmony export */   "TimeoutException": () => (/* binding */ TimeoutException)
/* harmony export */ });
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types.js */ "./src/Main/fable_modules/fable-library.4.1.4/Types.js");

class SystemException extends _Types_js__WEBPACK_IMPORTED_MODULE_0__.Exception {}
class TimeoutException extends SystemException {}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Types.js":
/*!*************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Types.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attribute": () => (/* binding */ Attribute),
/* harmony export */   "Exception": () => (/* binding */ Exception),
/* harmony export */   "FSharpException": () => (/* binding */ FSharpException),
/* harmony export */   "FSharpRef": () => (/* binding */ FSharpRef),
/* harmony export */   "MatchFailureException": () => (/* binding */ MatchFailureException),
/* harmony export */   "Record": () => (/* binding */ Record),
/* harmony export */   "Union": () => (/* binding */ Union),
/* harmony export */   "ensureErrorOrException": () => (/* binding */ ensureErrorOrException),
/* harmony export */   "isException": () => (/* binding */ isException),
/* harmony export */   "isPromise": () => (/* binding */ isPromise),
/* harmony export */   "seqToString": () => (/* binding */ seqToString),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "unionToString": () => (/* binding */ unionToString)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");

function seqToString(self) {
  let count = 0;
  let str = "[";
  for (const x of self) {
    if (count === 0) {
      str += toString(x);
    } else if (count === 100) {
      str += "; ...";
      break;
    } else {
      str += "; " + toString(x);
    }
    count++;
  }
  return str + "]";
}
function toString(x, callStack = 0) {
  if (x != null && typeof x === "object") {
    if (typeof x.toString === "function") {
      return x.toString();
    } else if (Symbol.iterator in x) {
      return seqToString(x);
    } else {
      // TODO: Date?
      const cons = Object.getPrototypeOf(x)?.constructor;
      return cons === Object && callStack < 10
      // Same format as recordToString
      ? "{ " + Object.entries(x).map(([k, v]) => k + " = " + toString(v, callStack + 1)).join("\n  ") + " }" : cons?.name ?? "";
    }
  }
  return String(x);
}
function unionToString(name, fields) {
  if (fields.length === 0) {
    return name;
  } else {
    let fieldStr;
    let withParens = true;
    if (fields.length === 1) {
      fieldStr = toString(fields[0]);
      withParens = fieldStr.indexOf(" ") >= 0;
    } else {
      fieldStr = fields.map(x => toString(x)).join(", ");
    }
    return name + (withParens ? " (" : " ") + fieldStr + (withParens ? ")" : "");
  }
}
class Union {
  get name() {
    return this.cases()[this.tag];
  }
  toJSON() {
    return this.fields.length === 0 ? this.name : [this.name].concat(this.fields);
  }
  toString() {
    return unionToString(this.name, this.fields);
  }
  GetHashCode() {
    const hashes = this.fields.map(x => (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash)(x));
    hashes.splice(0, 0, (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.numberHash)(this.tag));
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.combineHashCodes)(hashes);
  }
  Equals(other) {
    if (this === other) {
      return true;
    } else if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.sameConstructor)(this, other)) {
      return false;
    } else if (this.tag === other.tag) {
      return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equalArrays)(this.fields, other.fields);
    } else {
      return false;
    }
  }
  CompareTo(other) {
    if (this === other) {
      return 0;
    } else if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.sameConstructor)(this, other)) {
      return -1;
    } else if (this.tag === other.tag) {
      return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.compareArrays)(this.fields, other.fields);
    } else {
      return this.tag < other.tag ? -1 : 1;
    }
  }
}
function recordToJSON(self) {
  const o = {};
  const keys = Object.keys(self);
  for (let i = 0; i < keys.length; i++) {
    o[keys[i]] = self[keys[i]];
  }
  return o;
}
function recordToString(self) {
  return "{ " + Object.entries(self).map(([k, v]) => k + " = " + toString(v)).join("\n  ") + " }";
}
function recordGetHashCode(self) {
  const hashes = Object.values(self).map(v => (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash)(v));
  return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.combineHashCodes)(hashes);
}
function recordEquals(self, other) {
  if (self === other) {
    return true;
  } else if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.sameConstructor)(self, other)) {
    return false;
  } else {
    const thisNames = Object.keys(self);
    for (let i = 0; i < thisNames.length; i++) {
      if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(self[thisNames[i]], other[thisNames[i]])) {
        return false;
      }
    }
    return true;
  }
}
function recordCompareTo(self, other) {
  if (self === other) {
    return 0;
  } else if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.sameConstructor)(self, other)) {
    return -1;
  } else {
    const thisNames = Object.keys(self);
    for (let i = 0; i < thisNames.length; i++) {
      const result = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.compare)(self[thisNames[i]], other[thisNames[i]]);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  }
}
class Record {
  toJSON() {
    return recordToJSON(this);
  }
  toString() {
    return recordToString(this);
  }
  GetHashCode() {
    return recordGetHashCode(this);
  }
  Equals(other) {
    return recordEquals(this, other);
  }
  CompareTo(other) {
    return recordCompareTo(this, other);
  }
}
class FSharpRef {
  get contents() {
    return this.getter();
  }
  set contents(v) {
    this.setter(v);
  }
  constructor(contentsOrGetter, setter) {
    if (typeof setter === "function") {
      this.getter = contentsOrGetter;
      this.setter = setter;
    } else {
      this.getter = () => contentsOrGetter;
      this.setter = v => {
        contentsOrGetter = v;
      };
    }
  }
}
// EXCEPTIONS
// Exception is intentionally not derived from Error, for performance reasons (see #2160)
class Exception {
  constructor(message) {
    this.message = message;
  }
}
function isException(x) {
  return x instanceof Exception || x instanceof Error;
}
function isPromise(x) {
  return x instanceof Promise;
}
function ensureErrorOrException(e) {
  // Exceptionally admitting promises as errors for compatibility with React.suspense (see #3298)
  return isException(e) || isPromise(e) ? e : new Error(String(e));
}
class FSharpException extends Exception {
  toJSON() {
    return recordToJSON(this);
  }
  toString() {
    return recordToString(this);
  }
  GetHashCode() {
    return recordGetHashCode(this);
  }
  Equals(other) {
    return recordEquals(this, other);
  }
  CompareTo(other) {
    return recordCompareTo(this, other);
  }
}
class MatchFailureException extends FSharpException {
  constructor(arg1, arg2, arg3) {
    super();
    this.arg1 = arg1;
    this.arg2 = arg2 | 0;
    this.arg3 = arg3 | 0;
    this.message = "The match cases were incomplete";
  }
}
class Attribute {}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/Util.js":
/*!************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/Util.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comparer": () => (/* binding */ Comparer),
/* harmony export */   "Enumerable": () => (/* binding */ Enumerable),
/* harmony export */   "Enumerator": () => (/* binding */ Enumerator),
/* harmony export */   "Lazy": () => (/* binding */ Lazy),
/* harmony export */   "ObjectRef": () => (/* binding */ ObjectRef),
/* harmony export */   "arrayHash": () => (/* binding */ arrayHash),
/* harmony export */   "assertEqual": () => (/* binding */ assertEqual),
/* harmony export */   "assertNotEqual": () => (/* binding */ assertNotEqual),
/* harmony export */   "bigintHash": () => (/* binding */ bigintHash),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "combineHashCodes": () => (/* binding */ combineHashCodes),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "compareArrays": () => (/* binding */ compareArrays),
/* harmony export */   "compareArraysWith": () => (/* binding */ compareArraysWith),
/* harmony export */   "compareDates": () => (/* binding */ compareDates),
/* harmony export */   "comparePrimitives": () => (/* binding */ comparePrimitives),
/* harmony export */   "comparerFromEqualityComparer": () => (/* binding */ comparerFromEqualityComparer),
/* harmony export */   "copyToArray": () => (/* binding */ copyToArray),
/* harmony export */   "count": () => (/* binding */ count),
/* harmony export */   "createAtom": () => (/* binding */ createAtom),
/* harmony export */   "createObj": () => (/* binding */ createObj),
/* harmony export */   "curry10": () => (/* binding */ curry10),
/* harmony export */   "curry2": () => (/* binding */ curry2),
/* harmony export */   "curry3": () => (/* binding */ curry3),
/* harmony export */   "curry4": () => (/* binding */ curry4),
/* harmony export */   "curry5": () => (/* binding */ curry5),
/* harmony export */   "curry6": () => (/* binding */ curry6),
/* harmony export */   "curry7": () => (/* binding */ curry7),
/* harmony export */   "curry8": () => (/* binding */ curry8),
/* harmony export */   "curry9": () => (/* binding */ curry9),
/* harmony export */   "dateHash": () => (/* binding */ dateHash),
/* harmony export */   "dateOffset": () => (/* binding */ dateOffset),
/* harmony export */   "defaultOf": () => (/* binding */ defaultOf),
/* harmony export */   "disposeSafe": () => (/* binding */ disposeSafe),
/* harmony export */   "enumerableToIterator": () => (/* binding */ enumerableToIterator),
/* harmony export */   "equalArrays": () => (/* binding */ equalArrays),
/* harmony export */   "equalArraysWith": () => (/* binding */ equalArraysWith),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "escapeDataString": () => (/* binding */ escapeDataString),
/* harmony export */   "escapeUriString": () => (/* binding */ escapeUriString),
/* harmony export */   "fastStructuralHash": () => (/* binding */ fastStructuralHash),
/* harmony export */   "getEnumerator": () => (/* binding */ getEnumerator),
/* harmony export */   "identityHash": () => (/* binding */ identityHash),
/* harmony export */   "int16ToString": () => (/* binding */ int16ToString),
/* harmony export */   "int32ToString": () => (/* binding */ int32ToString),
/* harmony export */   "int64ToString": () => (/* binding */ int64ToString),
/* harmony export */   "isArrayLike": () => (/* binding */ isArrayLike),
/* harmony export */   "isComparable": () => (/* binding */ isComparable),
/* harmony export */   "isComparer": () => (/* binding */ isComparer),
/* harmony export */   "isDisposable": () => (/* binding */ isDisposable),
/* harmony export */   "isEnumerable": () => (/* binding */ isEnumerable),
/* harmony export */   "isEquatable": () => (/* binding */ isEquatable),
/* harmony export */   "isHashable": () => (/* binding */ isHashable),
/* harmony export */   "isIterable": () => (/* binding */ isIterable),
/* harmony export */   "jsOptions": () => (/* binding */ jsOptions),
/* harmony export */   "lazyFromValue": () => (/* binding */ lazyFromValue),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "numberHash": () => (/* binding */ numberHash),
/* harmony export */   "padLeftAndRightWithZeros": () => (/* binding */ padLeftAndRightWithZeros),
/* harmony export */   "padWithZeros": () => (/* binding */ padWithZeros),
/* harmony export */   "physicalEquality": () => (/* binding */ physicalEquality),
/* harmony export */   "physicalHash": () => (/* binding */ physicalHash),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "safeHash": () => (/* binding */ safeHash),
/* harmony export */   "sameConstructor": () => (/* binding */ sameConstructor),
/* harmony export */   "sign": () => (/* binding */ sign),
/* harmony export */   "stringHash": () => (/* binding */ stringHash),
/* harmony export */   "structuralHash": () => (/* binding */ structuralHash),
/* harmony export */   "toEnumerable": () => (/* binding */ toEnumerable),
/* harmony export */   "toIterator": () => (/* binding */ toIterator),
/* harmony export */   "uncurry10": () => (/* binding */ uncurry10),
/* harmony export */   "uncurry2": () => (/* binding */ uncurry2),
/* harmony export */   "uncurry3": () => (/* binding */ uncurry3),
/* harmony export */   "uncurry4": () => (/* binding */ uncurry4),
/* harmony export */   "uncurry5": () => (/* binding */ uncurry5),
/* harmony export */   "uncurry6": () => (/* binding */ uncurry6),
/* harmony export */   "uncurry7": () => (/* binding */ uncurry7),
/* harmony export */   "uncurry8": () => (/* binding */ uncurry8),
/* harmony export */   "uncurry9": () => (/* binding */ uncurry9),
/* harmony export */   "unescapeDataString": () => (/* binding */ unescapeDataString)
/* harmony export */ });
// tslint:disable:ban-types
function isArrayLike(x) {
  return Array.isArray(x) || ArrayBuffer.isView(x);
}
function isIterable(x) {
  return x != null && typeof x === "object" && Symbol.iterator in x;
}
function isEnumerable(x) {
  return x != null && typeof x.GetEnumerator === "function";
}
function isComparer(x) {
  return x != null && typeof x.Compare === "function";
}
function isComparable(x) {
  return x != null && typeof x.CompareTo === "function";
}
function isEquatable(x) {
  return x != null && typeof x.Equals === "function";
}
function isHashable(x) {
  return x != null && typeof x.GetHashCode === "function";
}
function isDisposable(x) {
  return x != null && typeof x.Dispose === "function";
}
function disposeSafe(x) {
  if (isDisposable(x)) {
    x.Dispose();
  }
}
function defaultOf() {
  return null;
}
function sameConstructor(x, y) {
  return Object.getPrototypeOf(x)?.constructor === Object.getPrototypeOf(y)?.constructor;
}
class Enumerable {
  constructor(en) {
    this.en = en;
  }
  GetEnumerator() {
    return this.en;
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    return this.en;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const hasNext = this.en["System.Collections.IEnumerator.MoveNext"]();
    const current = hasNext ? this.en["System.Collections.Generic.IEnumerator`1.get_Current"]() : undefined;
    return {
      done: !hasNext,
      value: current
    };
  }
}
class Enumerator {
  constructor(iter) {
    this.iter = iter;
    this.current = defaultOf();
  }
  ["System.Collections.Generic.IEnumerator`1.get_Current"]() {
    return this.current;
  }
  ["System.Collections.IEnumerator.get_Current"]() {
    return this.current;
  }
  ["System.Collections.IEnumerator.MoveNext"]() {
    const cur = this.iter.next();
    this.current = cur.value;
    return !cur.done;
  }
  ["System.Collections.IEnumerator.Reset"]() {
    throw new Error("JS iterators cannot be reset");
  }
  Dispose() {
    return;
  }
}
function toEnumerable(e) {
  if (isEnumerable(e)) {
    return e;
  } else {
    return new Enumerable(new Enumerator(e[Symbol.iterator]()));
  }
}
function getEnumerator(e) {
  if (isEnumerable(e)) {
    return e.GetEnumerator();
  } else {
    return new Enumerator(e[Symbol.iterator]());
  }
}
function toIterator(en) {
  return {
    next() {
      const hasNext = en["System.Collections.IEnumerator.MoveNext"]();
      const current = hasNext ? en["System.Collections.Generic.IEnumerator`1.get_Current"]() : undefined;
      return {
        done: !hasNext,
        value: current
      };
    }
  };
}
function enumerableToIterator(e) {
  return toIterator(toEnumerable(e).GetEnumerator());
}
class Comparer {
  constructor(f) {
    this.Compare = f || compare;
  }
}
function comparerFromEqualityComparer(comparer) {
  // Sometimes IEqualityComparer also implements IComparer
  if (isComparer(comparer)) {
    return new Comparer(comparer.Compare);
  } else {
    return new Comparer((x, y) => {
      const xhash = comparer.GetHashCode(x);
      const yhash = comparer.GetHashCode(y);
      if (xhash === yhash) {
        return comparer.Equals(x, y) ? 0 : -1;
      } else {
        return xhash < yhash ? -1 : 1;
      }
    });
  }
}
function assertEqual(actual, expected, msg) {
  if (!equals(actual, expected)) {
    throw Object.assign(new Error(msg || `Expected: ${expected} - Actual: ${actual}`), {
      actual,
      expected
    });
  }
}
function assertNotEqual(actual, expected, msg) {
  if (equals(actual, expected)) {
    throw Object.assign(new Error(msg || `Expected: ${expected} - Actual: ${actual}`), {
      actual,
      expected
    });
  }
}
class Lazy {
  constructor(factory) {
    this.factory = factory;
    this.isValueCreated = false;
  }
  get Value() {
    if (!this.isValueCreated) {
      this.createdValue = this.factory();
      this.isValueCreated = true;
    }
    return this.createdValue;
  }
  get IsValueCreated() {
    return this.isValueCreated;
  }
}
function lazyFromValue(v) {
  return new Lazy(() => v);
}
function padWithZeros(i, length) {
  let str = i.toString(10);
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}
function padLeftAndRightWithZeros(i, lengthLeft, lengthRight) {
  let str = i.toString(10);
  while (str.length < lengthLeft) {
    str = "0" + str;
  }
  while (str.length < lengthRight) {
    str = str + "0";
  }
  return str;
}
function dateOffset(date) {
  const date1 = date;
  return typeof date1.offset === "number" ? date1.offset : date.kind === 1 /* DateKind.UTC */ ? 0 : date.getTimezoneOffset() * -60000;
}
function int16ToString(i, radix) {
  i = i < 0 && radix != null && radix !== 10 ? 0xFFFF + i + 1 : i;
  return i.toString(radix);
}
function int32ToString(i, radix) {
  i = i < 0 && radix != null && radix !== 10 ? 0xFFFFFFFF + i + 1 : i;
  return i.toString(radix);
}
function int64ToString(i, radix) {
  i = i < 0 && radix != null && radix !== 10 ? 0xffffffffffffffffn + i + 1n : i;
  return i.toString(radix);
}
class ObjectRef {
  static id(o) {
    if (!ObjectRef.idMap.has(o)) {
      ObjectRef.idMap.set(o, ++ObjectRef.count);
    }
    return ObjectRef.idMap.get(o);
  }
}
ObjectRef.idMap = new WeakMap();
ObjectRef.count = 0;

function stringHash(s) {
  let i = 0;
  let h = 5381;
  const len = s.length;
  while (i < len) {
    h = h * 33 ^ s.charCodeAt(i++);
  }
  return h;
}
function numberHash(x) {
  return x * 2654435761 | 0;
}
function bigintHash(x) {
  return stringHash(x.toString(32));
}
// From https://stackoverflow.com/a/37449594
function combineHashCodes(hashes) {
  let h1 = 0;
  const len = hashes.length;
  for (let i = 0; i < len; i++) {
    const h2 = hashes[i];
    h1 = (h1 << 5) + h1 ^ h2;
  }
  return h1;
}
function physicalHash(x) {
  if (x == null) {
    return 0;
  }
  switch (typeof x) {
    case "boolean":
      return x ? 1 : 0;
    case "number":
      return numberHash(x);
    case "bigint":
      return bigintHash(x);
    case "string":
      return stringHash(x);
    default:
      return numberHash(ObjectRef.id(x));
  }
}
function identityHash(x) {
  if (isHashable(x)) {
    return x.GetHashCode();
  } else {
    return physicalHash(x);
  }
}
function dateHash(x) {
  return x.getTime();
}
function arrayHash(x) {
  const len = x.length;
  const hashes = new Array(len);
  for (let i = 0; i < len; i++) {
    hashes[i] = structuralHash(x[i]);
  }
  return combineHashCodes(hashes);
}
function structuralHash(x) {
  if (x == null) {
    return 0;
  }
  switch (typeof x) {
    case "boolean":
      return x ? 1 : 0;
    case "number":
      return numberHash(x);
    case "bigint":
      return bigintHash(x);
    case "string":
      return stringHash(x);
    default:
      {
        if (isHashable(x)) {
          return x.GetHashCode();
        } else if (isArrayLike(x)) {
          return arrayHash(x);
        } else if (x instanceof Date) {
          return dateHash(x);
        } else if (Object.getPrototypeOf(x)?.constructor === Object) {
          // TODO: check call-stack to prevent cyclic objects?
          const hashes = Object.values(x).map(v => structuralHash(v));
          return combineHashCodes(hashes);
        } else {
          // Classes don't implement GetHashCode by default, but must use identity hashing
          return numberHash(ObjectRef.id(x));
          // return stringHash(String(x));
        }
      }
  }
}
// Intended for custom numeric types, like long or decimal
function fastStructuralHash(x) {
  return stringHash(String(x));
}
// Intended for declared types that may or may not implement GetHashCode
function safeHash(x) {
  // return x == null ? 0 : isHashable(x) ? x.GetHashCode() : numberHash(ObjectRef.id(x));
  return identityHash(x);
}
function equalArraysWith(x, y, eq) {
  if (x == null) {
    return y == null;
  }
  if (y == null) {
    return false;
  }
  if (x.length !== y.length) {
    return false;
  }
  for (let i = 0; i < x.length; i++) {
    if (!eq(x[i], y[i])) {
      return false;
    }
  }
  return true;
}
function equalArrays(x, y) {
  return equalArraysWith(x, y, equals);
}
function equalObjects(x, y) {
  const xKeys = Object.keys(x);
  const yKeys = Object.keys(y);
  if (xKeys.length !== yKeys.length) {
    return false;
  }
  xKeys.sort();
  yKeys.sort();
  for (let i = 0; i < xKeys.length; i++) {
    if (xKeys[i] !== yKeys[i] || !equals(x[xKeys[i]], y[yKeys[i]])) {
      return false;
    }
  }
  return true;
}
function physicalEquality(x, y) {
  return x === y;
}
function equals(x, y) {
  if (x === y) {
    return true;
  } else if (x == null) {
    return y == null;
  } else if (y == null) {
    return false;
  } else if (isEquatable(x)) {
    return x.Equals(y);
  } else if (isArrayLike(x)) {
    return isArrayLike(y) && equalArrays(x, y);
  } else if (typeof x !== "object") {
    return false;
  } else if (x instanceof Date) {
    return y instanceof Date && compareDates(x, y) === 0;
  } else {
    return Object.getPrototypeOf(x)?.constructor === Object && equalObjects(x, y);
  }
}
function compareDates(x, y) {
  let xtime;
  let ytime;
  // DateTimeOffset and DateTime deals with equality differently.
  if ("offset" in x && "offset" in y) {
    xtime = x.getTime();
    ytime = y.getTime();
  } else {
    xtime = x.getTime() + dateOffset(x);
    ytime = y.getTime() + dateOffset(y);
  }
  return xtime === ytime ? 0 : xtime < ytime ? -1 : 1;
}
function comparePrimitives(x, y) {
  return x === y ? 0 : x < y ? -1 : 1;
}
function compareArraysWith(x, y, comp) {
  if (x == null) {
    return y == null ? 0 : 1;
  }
  if (y == null) {
    return -1;
  }
  if (x.length !== y.length) {
    return x.length < y.length ? -1 : 1;
  }
  for (let i = 0, j = 0; i < x.length; i++) {
    j = comp(x[i], y[i]);
    if (j !== 0) {
      return j;
    }
  }
  return 0;
}
function compareArrays(x, y) {
  return compareArraysWith(x, y, compare);
}
function compareObjects(x, y) {
  const xKeys = Object.keys(x);
  const yKeys = Object.keys(y);
  if (xKeys.length !== yKeys.length) {
    return xKeys.length < yKeys.length ? -1 : 1;
  }
  xKeys.sort();
  yKeys.sort();
  for (let i = 0, j = 0; i < xKeys.length; i++) {
    const key = xKeys[i];
    if (key !== yKeys[i]) {
      return key < yKeys[i] ? -1 : 1;
    } else {
      j = compare(x[key], y[key]);
      if (j !== 0) {
        return j;
      }
    }
  }
  return 0;
}
function compare(x, y) {
  if (x === y) {
    return 0;
  } else if (x == null) {
    return y == null ? 0 : -1;
  } else if (y == null) {
    return 1;
  } else if (isComparable(x)) {
    return x.CompareTo(y);
  } else if (isArrayLike(x)) {
    return isArrayLike(y) ? compareArrays(x, y) : -1;
  } else if (typeof x !== "object") {
    return x < y ? -1 : 1;
  } else if (x instanceof Date) {
    return y instanceof Date ? compareDates(x, y) : -1;
  } else {
    return Object.getPrototypeOf(x)?.constructor === Object ? compareObjects(x, y) : -1;
  }
}
function min(comparer, x, y) {
  return comparer(x, y) < 0 ? x : y;
}
function max(comparer, x, y) {
  return comparer(x, y) > 0 ? x : y;
}
function clamp(comparer, value, min, max) {
  return comparer(value, min) < 0 ? min : comparer(value, max) > 0 ? max : value;
}
function createAtom(value) {
  let atom = value;
  return (...args) => {
    if (args.length === 0) {
      return atom;
    } else {
      atom = args[0];
    }
  };
}
function createObj(fields) {
  const obj = {};
  for (const kv of fields) {
    obj[kv[0]] = kv[1];
  }
  return obj;
}
function jsOptions(mutator) {
  const opts = {};
  mutator(opts);
  return opts;
}
function round(value, digits = 0) {
  const m = Math.pow(10, digits);
  const n = +(digits ? value * m : value).toFixed(8);
  const i = Math.floor(n);
  const f = n - i;
  const e = 1e-8;
  const r = f > 0.5 - e && f < 0.5 + e ? i % 2 === 0 ? i : i + 1 : Math.round(n);
  return digits ? r / m : r;
}
function sign(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}
function unescapeDataString(s) {
  // https://stackoverflow.com/a/4458580/524236
  return decodeURIComponent(s.replace(/\+/g, "%20"));
}
function escapeDataString(s) {
  return encodeURIComponent(s).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
}
function escapeUriString(s) {
  return encodeURI(s);
}
// ICollection.Clear and Count members can be called on Arrays
// or Dictionaries so we need a runtime check (see #1120)
function count(col) {
  if (isArrayLike(col)) {
    return col.length;
  } else {
    let count = 0;
    for (const _ of col) {
      count++;
    }
    return count;
  }
}
function clear(col) {
  if (isArrayLike(col)) {
    col.splice(0);
  } else {
    col.clear();
  }
}
const curried = new WeakMap();
function uncurry2(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2) => f(a1)(a2);
  curried.set(f2, f);
  return f2;
}
function curry2(f) {
  return curried.get(f) ?? (a1 => a2 => f(a1, a2));
}
function uncurry3(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3) => f(a1)(a2)(a3);
  curried.set(f2, f);
  return f2;
}
function curry3(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => f(a1, a2, a3));
}
function uncurry4(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4) => f(a1)(a2)(a3)(a4);
  curried.set(f2, f);
  return f2;
}
function curry4(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => f(a1, a2, a3, a4));
}
function uncurry5(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5) => f(a1)(a2)(a3)(a4)(a5);
  curried.set(f2, f);
  return f2;
}
function curry5(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => f(a1, a2, a3, a4, a5));
}
function uncurry6(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5, a6) => f(a1)(a2)(a3)(a4)(a5)(a6);
  curried.set(f2, f);
  return f2;
}
function curry6(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => a6 => f(a1, a2, a3, a4, a5, a6));
}
function uncurry7(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5, a6, a7) => f(a1)(a2)(a3)(a4)(a5)(a6)(a7);
  curried.set(f2, f);
  return f2;
}
function curry7(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => a6 => a7 => f(a1, a2, a3, a4, a5, a6, a7));
}
function uncurry8(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5, a6, a7, a8) => f(a1)(a2)(a3)(a4)(a5)(a6)(a7)(a8);
  curried.set(f2, f);
  return f2;
}
function curry8(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => a6 => a7 => a8 => f(a1, a2, a3, a4, a5, a6, a7, a8));
}
function uncurry9(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5, a6, a7, a8, a9) => f(a1)(a2)(a3)(a4)(a5)(a6)(a7)(a8)(a9);
  curried.set(f2, f);
  return f2;
}
function curry9(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => a6 => a7 => a8 => a9 => f(a1, a2, a3, a4, a5, a6, a7, a8, a9));
}
function uncurry10(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) => f(a1)(a2)(a3)(a4)(a5)(a6)(a7)(a8)(a9)(a10);
  curried.set(f2, f);
  return f2;
}
function curry10(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => a6 => a7 => a8 => a9 => a10 => f(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10));
}
// More performant method to copy arrays, see #2352
function copyToArray(source, sourceIndex, target, targetIndex, count) {
  if (ArrayBuffer.isView(source) && ArrayBuffer.isView(target)) {
    target.set(source.subarray(sourceIndex, sourceIndex + count), targetIndex);
  } else {
    for (let i = 0; i < count; ++i) {
      target[targetIndex + i] = source[sourceIndex + i];
    }
  }
}

/***/ }),

/***/ "./src/Main/fable_modules/fable-library.4.1.4/lib/big.js":
/*!***************************************************************!*\
  !*** ./src/Main/fable_modules/fable-library.4.1.4/lib/big.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Big": () => (/* binding */ Big),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Adapted from https://github.com/MikeMcl/big.js/blob/0f94dc9110d55c4f324a47ba6a2e832ce23ac589/big.mjs
/* tslint:disable */
var P = {};
/*
 *  big.js v6.0.3
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2020 Michael Mclaughlin
 *  https://github.com/MikeMcl/big.js/LICENCE.md
 */
/************************************** EDITABLE DEFAULTS *****************************************/
// The default values below must be integers within the stated ranges.
/*
 * The maximum number of decimal places (DP) of the results of operations involving division:
 * div and sqrt, and pow with negative exponents.
 */
var DP = 28,
  // 0 to MAX_DP
  /*
   * The rounding mode (RM) used when rounding to the above decimal places.
   *
   *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
   *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
   *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
   *  3  Away from zero.                                  (ROUND_UP)
   */
  RM = 1,
  // 0, 1, 2 or 3
  // The maximum value of DP and Big.DP.
  MAX_DP = 1E6,
  // 0 to 1000000
  // The maximum magnitude of the exponent argument to the pow method.
  MAX_POWER = 1E6,
  // 1 to 1000000
  /*
   * The negative exponent (NE) at and beneath which toString returns exponential notation.
   * (JavaScript numbers: -7)
   * -1000000 is the minimum recommended exponent value of a Big.
   */
  NE = -29,
  // 0 to -1000000
  /*
   * The positive exponent (PE) at and above which toString returns exponential notation.
   * (JavaScript numbers: 21)
   * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
   */
  PE = 29,
  // 0 to 1000000
  /*
   * When true, an error will be thrown if a primitive number is passed to the Big constructor,
   * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a
   * primitive number without a loss of precision.
   */
  STRICT = false,
  // true or false
  /**************************************************************************************************/
  // Error messages.
  NAME = '[big.js] ',
  INVALID = NAME + 'Invalid ',
  INVALID_DP = INVALID + 'decimal places',
  INVALID_RM = INVALID + 'rounding mode',
  DIV_BY_ZERO = NAME + 'Division by zero',
  UNDEFINED = void 0,
  NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
/*
 * Create and return a Big constructor.
 */
function _Big_() {
  /*
   * The Big constructor and exported function.
   * Create and return a new instance of a Big number object.
   *
   * n {number|string|Big} A numeric value.
   */
  function Big(n) {
    var x = this;
    // Enable constructor usage without new.
    if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);
    // Duplicate.
    if (n instanceof Big) {
      x.s = n.s;
      x.e = n.e;
      x.c = n.c.slice();
      normalize(x);
    } else {
      if (typeof n !== 'string') {
        if (Big.strict === true) {
          throw TypeError(INVALID + 'number');
        }
        // Minus zero?
        n = n === 0 && 1 / n < 0 ? '-0' : String(n);
      }
      parse(x, n);
    }
    // Retain a reference to this Big constructor.
    // Shadow Big.prototype.constructor which points to Object.
    x.constructor = Big;
  }
  Big.prototype = P;
  Big.DP = DP;
  Big.RM = RM;
  Big.NE = NE;
  Big.PE = PE;
  Big.strict = STRICT;
  return Big;
}
function normalize(x) {
  // x = round(x, DP, 0);
  if (x.c.length > 1 && !x.c[0]) {
    let i = x.c.findIndex(x => x);
    x.c = x.c.slice(i);
    x.e = x.e - i;
  }
}
/*
 * Parse the number or string value passed to a Big constructor.
 *
 * x {Big} A Big number instance.
 * n {number|string} A numeric value.
 */
function parse(x, n) {
  var e, i, nl;
  if (!NUMERIC.test(n)) {
    throw Error(INVALID + 'number');
  }
  // Determine sign.
  x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;
  // Decimal point?
  if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');
  // Exponential form?
  if ((i = n.search(/e/i)) > 0) {
    // Determine exponent.
    if (e < 0) e = i;
    e += +n.slice(i + 1);
    n = n.substring(0, i);
  } else if (e < 0) {
    // Integer.
    e = n.length;
  }
  nl = n.length;
  // Determine leading zeros before decimal point.
  for (i = 0; i < e && i < nl && n.charAt(i) == '0';) ++i;
  // original version (ignores decimal point).
  // // Determine leading zeros.
  // for (i = 0; i < nl && n.charAt(i) == '0';) ++i;
  if (i == nl) {
    // Zero.
    x.c = [x.e = 0];
  } else {
    x.e = e - i - 1;
    x.c = [];
    // Convert string to array of digits without leading zeros
    for (e = 0; i < nl;) x.c[e++] = +n.charAt(i++);
    // older version (doesn't keep trailing zeroes).
    // // Determine trailing zeros.
    // for (; nl > 0 && n.charAt(--nl) == '0';);
    // // Convert string to array of digits without leading/trailing zeros.
    // for (e = 0; i <= nl;) x.c[e++] = +n.charAt(i++);
  }
  x = round(x, Big.DP + 1, Big.RM);
  return x;
}
/*
 * Round Big x to a maximum of sd significant digits using rounding mode rm.
 *
 * x {Big} The Big to round.
 * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
 * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 * [more] {boolean} Whether the result of division was truncated.
 */
function round(x, sd, rm, more) {
  var xc = x.c;
  if (rm === UNDEFINED) rm = Big.RM;
  if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {
    throw Error(INVALID_RM);
  }
  if (sd < 1) {
    more = rm === 3 && (more || !!xc[0]) || sd === 0 && (rm === 1 && xc[0] >= 5 || rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED)));
    xc.length = 1;
    if (more) {
      // 1, 0.1, 0.01, 0.001, 0.0001 etc.
      x.e = x.e - sd + 1;
      xc[0] = 1;
    } else {
      // Zero.
      xc[0] = x.e = 0;
    }
  } else if (sd < xc.length) {
    // xc[sd] is the digit after the digit that may be rounded up.
    const isZero = xc.findIndex((xci, idx) => idx >= sd && xci > 0) < 0;
    more = rm === 1 && xc[sd] >= 5 || rm === 2 && (xc[sd] > 5 || xc[sd] === 5 && (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) || rm === 3 && (more || !isZero);
    // Remove any digits after the required precision.
    xc.length = sd--;
    // Round up?
    if (more) {
      // Rounding up may mean the previous digit has to be rounded up.
      for (; ++xc[sd] > 9;) {
        xc[sd] = 0;
        if (!sd--) {
          ++x.e;
          xc.unshift(1);
        }
      }
    }
    // Remove trailing zeros.
    for (sd = xc.length; !xc[--sd];) xc.pop();
  }
  return x;
}
/*
 * Return a string representing the value of Big x in normal or exponential notation.
 * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
 */
function stringify(x, doExponential, isNonzero) {
  var e = x.e,
    s = x.c.join(''),
    n = s.length;
  // Exponential notation?
  if (doExponential) {
    s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;
    // Normal notation.
  } else if (e < 0) {
    for (; ++e;) s = '0' + s;
    s = '0.' + s;
  } else if (e > 0) {
    if (++e > n) {
      for (e -= n; e--;) s += '0';
    } else if (e < n) {
      s = s.slice(0, e) + '.' + s.slice(e);
    }
  } else if (n > 1) {
    s = s.charAt(0) + '.' + s.slice(1);
  }
  return x.s < 0 && isNonzero ? '-' + s : s;
}
// Prototype/instance methods
/*
 * Return a new Big whose value is the absolute value of this Big.
 */
P.abs = function () {
  var x = new this.constructor(this);
  x.s = 1;
  return x;
};
/*
 * Return 1 if the value of this Big is greater than the value of Big y,
 *       -1 if the value of this Big is less than the value of Big y, or
 *        0 if they have the same value.
 */
P.cmp = function (y) {
  var isneg,
    Big = this.constructor,
    x = new Big(this),
    y = new Big(y),
    xc = x.c,
    yc = y.c,
    i = x.s,
    j = y.s,
    k = x.e,
    l = y.e;
  // Either zero?
  if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;
  // Signs differ?
  if (i != j) return i;
  isneg = i < 0;
  // Compare exponents.
  if (k != l) return k > l ^ isneg ? 1 : -1;
  // Compare digit by digit.
  j = Math.max(xc.length, yc.length);
  for (i = 0; i < j; i++) {
    k = i < xc.length ? xc[i] : 0;
    l = i < yc.length ? yc[i] : 0;
    if (k != l) return k > l ^ isneg ? 1 : -1;
  }
  return 0;
  // original version (doesn't compare well trailing zeroes, e.g. 1.0 with 1.00)
  // j = (k = xc.length) < (l = yc.length) ? k : l;
  // // Compare digit by digit.
  // for (i = -1; ++i < j;) {
  //   if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
  // }
  // // Compare lengths.
  // return k == l ? 0 : k > l ^ isneg ? 1 : -1;
};
/*
 * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
 * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */
P.div = function (y) {
  var Big = this.constructor,
    x = new Big(this),
    y = new Big(y),
    a = x.c,
    // dividend
    b = y.c,
    // divisor
    k = x.s == y.s ? 1 : -1,
    dp = Big.DP;
  if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }
  // Divisor is zero?
  if (!b[0]) {
    throw Error(DIV_BY_ZERO);
  }
  // Dividend is 0? Return +-0.
  if (!a[0]) {
    y.s = k;
    y.c = [y.e = 0];
    return y;
  }
  var bl,
    bt,
    n,
    cmp,
    ri,
    bz = b.slice(),
    ai = bl = b.length,
    al = a.length,
    r = a.slice(0, bl),
    // remainder
    rl = r.length,
    q = y,
    // quotient
    qc = q.c = [],
    qi = 0,
    p = dp + (q.e = x.e - y.e) + 1; // precision of the result
  q.s = k;
  k = p < 0 ? 0 : p;
  // Create version of divisor with leading zero.
  bz.unshift(0);
  // Add zeros to make remainder as long as divisor.
  for (; rl++ < bl;) r.push(0);
  do {
    // n is how many times the divisor goes into current remainder.
    for (n = 0; n < 10; n++) {
      // Compare divisor and remainder.
      if (bl != (rl = r.length)) {
        cmp = bl > rl ? 1 : -1;
      } else {
        for (ri = -1, cmp = 0; ++ri < bl;) {
          if (b[ri] != r[ri]) {
            cmp = b[ri] > r[ri] ? 1 : -1;
            break;
          }
        }
      }
      // If divisor < remainder, subtract divisor from remainder.
      if (cmp < 0) {
        // Remainder can't be more than 1 digit longer than divisor.
        // Equalise lengths using divisor with extra leading zero?
        for (bt = rl == bl ? b : bz; rl;) {
          if (r[--rl] < bt[rl]) {
            ri = rl;
            for (; ri && !r[--ri];) r[ri] = 9;
            --r[ri];
            r[rl] += 10;
          }
          r[rl] -= bt[rl];
        }
        for (; !r[0];) r.shift();
      } else {
        break;
      }
    }
    // Add the digit n to the result array.
    qc[qi++] = cmp ? n : ++n;
    // Update the remainder.
    if (r[0] && cmp) r[rl] = a[ai] || 0;else r = [a[ai]];
  } while ((ai++ < al || r[0] !== UNDEFINED) && k--);
  // Leading zero? Do not remove if result is simply zero (qi == 1).
  if (!qc[0] && qi != 1) {
    // There can't be more than one zero.
    qc.shift();
    q.e--;
    p--;
  }
  // Round?
  if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);
  return q;
};
/*
 * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
 */
P.eq = function (y) {
  return this.cmp(y) === 0;
};
/*
 * Return true if the value of this Big is greater than the value of Big y, otherwise return
 * false.
 */
P.gt = function (y) {
  return this.cmp(y) > 0;
};
/*
 * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
 * return false.
 */
P.gte = function (y) {
  return this.cmp(y) > -1;
};
/*
 * Return true if the value of this Big is less than the value of Big y, otherwise return false.
 */
P.lt = function (y) {
  return this.cmp(y) < 0;
};
/*
 * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
 * return false.
 */
P.lte = function (y) {
  return this.cmp(y) < 1;
};
/*
 * Return a new Big whose value is the value of this Big minus the value of Big y.
 */
P.minus = P.sub = function (y) {
  var i,
    j,
    t,
    xlty,
    Big = this.constructor,
    x = new Big(this),
    y = new Big(y),
    a = x.s,
    b = y.s;
  // Signs differ?
  if (a != b) {
    y.s = -b;
    return x.plus(y);
  }
  var xc = x.c.slice(),
    xe = x.e,
    yc = y.c,
    ye = y.e;
  // Either zero?
  if (!xc[0] || !yc[0]) {
    if (yc[0]) {
      y.s = -b;
    } else if (xc[0]) {
      y = new Big(x);
    } else {
      y.s = 1;
    }
    return y;
  }
  // Determine which is the bigger number. Prepend zeros to equalise exponents.
  if (a = xe - ye) {
    if (xlty = a < 0) {
      a = -a;
      t = xc;
    } else {
      ye = xe;
      t = yc;
    }
    t.reverse();
    for (b = a; b--;) t.push(0);
    t.reverse();
  } else {
    // Exponents equal. Check digit by digit.
    j = ((xlty = xc.length < yc.length) ? xc : yc).length;
    for (a = b = 0; b < j; b++) {
      if (xc[b] != yc[b]) {
        xlty = xc[b] < yc[b];
        break;
      }
    }
  }
  // x < y? Point xc to the array of the bigger number.
  if (xlty) {
    t = xc;
    xc = yc;
    yc = t;
    y.s = -y.s;
  }
  /*
   * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
   * needs to start at yc.length.
   */
  if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--;) xc[i++] = 0;
  // Subtract yc from xc.
  for (b = i; j > a;) {
    if (xc[--j] < yc[j]) {
      for (i = j; i && !xc[--i];) xc[i] = 9;
      --xc[i];
      xc[j] += 10;
    }
    xc[j] -= yc[j];
  }
  // Remove trailing zeros.
  for (; xc[--b] === 0;) xc.pop();
  // Remove leading zeros and adjust exponent accordingly.
  for (; xc[0] === 0;) {
    xc.shift();
    --ye;
  }
  if (!xc[0]) {
    // n - n = +0
    y.s = 1;
    // Result must be zero.
    xc = [ye = 0];
  }
  y.c = xc;
  y.e = ye;
  return y;
};
/*
 * Return a new Big whose value is the value of this Big modulo the value of Big y.
 */
P.mod = function (y) {
  var ygtx,
    Big = this.constructor,
    x = new Big(this),
    y = new Big(y),
    a = x.s,
    b = y.s;
  if (!y.c[0]) {
    throw Error(DIV_BY_ZERO);
  }
  x.s = y.s = 1;
  ygtx = y.cmp(x) == 1;
  x.s = a;
  y.s = b;
  if (ygtx) return new Big(x);
  a = Big.DP;
  b = Big.RM;
  Big.DP = Big.RM = 0;
  x = x.div(y);
  Big.DP = a;
  Big.RM = b;
  return this.minus(x.times(y));
};
/*
 * Return a new Big whose value is the value of this Big plus the value of Big y.
 */
P.plus = P.add = function (y) {
  var e,
    k,
    t,
    Big = this.constructor,
    x = new Big(this),
    y = new Big(y);
  // Signs differ?
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  var xe = x.e,
    xc = x.c,
    ye = y.e,
    yc = y.c;
  // Either zero?
  if (!xc[0] || !yc[0]) {
    if (!yc[0]) {
      if (xc[0]) {
        y = new Big(x);
      } else {
        y.s = x.s;
      }
    }
    return y;
  }
  xc = xc.slice();
  // Prepend zeros to equalise exponents.
  // Note: reverse faster than unshifts.
  if (e = xe - ye) {
    if (e > 0) {
      ye = xe;
      t = yc;
    } else {
      e = -e;
      t = xc;
    }
    t.reverse();
    for (; e--;) t.push(0);
    t.reverse();
  }
  // Point xc to the longer array.
  if (xc.length - yc.length < 0) {
    t = yc;
    yc = xc;
    xc = t;
  }
  e = yc.length;
  // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
  for (k = 0; e; xc[e] %= 10) k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;
  // No need to check for zero, as +x + +y != 0 && -x + -y != 0
  if (k) {
    xc.unshift(k);
    ++ye;
  }
  // Remove trailing zeros.
  for (e = xc.length; xc[--e] === 0;) xc.pop();
  y.c = xc;
  y.e = ye;
  return y;
};
/*
 * Return a Big whose value is the value of this Big raised to the power n.
 * If n is negative, round to a maximum of Big.DP decimal places using rounding
 * mode Big.RM.
 *
 * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
 */
P.pow = function (n) {
  var Big = this.constructor,
    x = new Big(this),
    y = new Big('1'),
    one = new Big('1'),
    isneg = n < 0;
  if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
    throw Error(INVALID + 'exponent');
  }
  if (isneg) n = -n;
  for (;;) {
    if (n & 1) y = y.times(x);
    n >>= 1;
    if (!n) break;
    x = x.times(x);
  }
  return isneg ? one.div(y) : y;
};
/*
 * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
 * significant digits using rounding mode rm, or Big.RM if rm is not specified.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.prec = function (sd, rm) {
  if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
    throw Error(INVALID + 'precision');
  }
  return round(new this.constructor(this), sd, rm);
};
/*
 * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
 * using rounding mode rm, or Big.RM if rm is not specified.
 * If dp is negative, round to an integer which is a multiple of 10**-dp.
 * If dp is not specified, round to 0 decimal places.
 *
 * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.round = function (dp, rm) {
  if (dp === UNDEFINED) dp = 0;else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }
  return round(new this.constructor(this), dp + this.e + 1, rm);
};
/*
 * Return a new Big whose value is the square root of the value of this Big, rounded, if
 * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */
P.sqrt = function () {
  var r,
    c,
    t,
    Big = this.constructor,
    x = new Big(this),
    s = x.s,
    e = x.e,
    half = new Big('0.5');
  // Zero?
  if (!x.c[0]) return new Big(x);
  // Negative?
  if (s < 0) {
    throw Error(NAME + 'No square root');
  }
  // Estimate.
  s = Math.sqrt(x + '');
  // Math.sqrt underflow/overflow?
  // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
  if (s === 0 || s === 1 / 0) {
    c = x.c.join('');
    if (!(c.length + e & 1)) c += '0';
    s = Math.sqrt(c);
    e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
    r = new Big((s == 1 / 0 ? '5e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
  } else {
    r = new Big(s + '');
  }
  e = r.e + (Big.DP += 4);
  // Newton-Raphson iteration.
  do {
    t = r;
    r = half.times(t.plus(x.div(t)));
  } while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''));
  return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);
};
/*
 * Return a new Big whose value is the value of this Big times the value of Big y.
 */
P.times = P.mul = function (y) {
  var c,
    Big = this.constructor,
    x = new Big(this),
    y = new Big(y),
    xc = x.c,
    yc = y.c,
    a = xc.length,
    b = yc.length,
    i = x.e,
    j = y.e;
  // Determine sign of result.
  y.s = x.s == y.s ? 1 : -1;
  // Return signed 0 if either 0.
  if (!xc[0] || !yc[0]) {
    y.c = [y.e = 0];
    return y;
  }
  // Initialise exponent of result as x.e + y.e.
  y.e = i + j;
  // If array xc has fewer digits than yc, swap xc and yc, and lengths.
  if (a < b) {
    c = xc;
    xc = yc;
    yc = c;
    j = a;
    a = b;
    b = j;
  }
  // Initialise coefficient array of result with zeros.
  for (c = new Array(j = a + b); j--;) c[j] = 0;
  // Multiply.
  // i is initially xc.length.
  for (i = b; i--;) {
    b = 0;
    // a is yc.length.
    for (j = a + i; j > i;) {
      // Current sum of products at this digit position, plus carry.
      b = c[j] + yc[i] * xc[j - i - 1] + b;
      c[j--] = b % 10;
      // carry
      b = b / 10 | 0;
    }
    c[j] = b;
  }
  // Increment result exponent if there is a final carry, otherwise remove leading zero.
  if (b) ++y.e;else c.shift();
  // Remove trailing zeros.
  for (i = c.length; !c[--i];) c.pop();
  y.c = c;
  return y;
};
/*
 * Return a string representing the value of this Big in exponential notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.toExponential = function (dp, rm) {
  var x = this,
    n = x.c[0];
  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x = round(new x.constructor(x), ++dp, rm);
    for (; x.c.length < dp;) x.c.push(0);
  }
  return stringify(x, true, !!n);
};
/*
 * Return a string representing the value of this Big in normal notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 *
 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
 */
P.toFixed = function (dp, rm) {
  var x = this,
    n = x.c[0];
  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x = round(new x.constructor(x), dp + x.e + 1, rm);
    // x.e may have changed if the value is rounded up.
    for (dp = dp + x.e + 1; x.c.length < dp;) x.c.push(0);
  }
  return stringify(x, false, !!n);
};
/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Omit the sign for negative zero.
 */
P.toJSON = P.toString = function () {
  var x = this,
    Big = x.constructor;
  return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);
};
/*
 * Return the value of this Big as a primitve number.
 */
P.toNumber = function () {
  var n = Number(stringify(this, true, true));
  if (this.constructor.strict === true && !this.eq(n.toString())) {
    throw Error(NAME + 'Imprecise conversion');
  }
  return n;
};
/*
 * Return a string representing the value of this Big rounded to sd significant digits using
 * rounding mode rm, or Big.RM if rm is not specified.
 * Use exponential notation if sd is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.toPrecision = function (sd, rm) {
  var x = this,
    Big = x.constructor,
    n = x.c[0];
  if (sd !== UNDEFINED) {
    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
      throw Error(INVALID + 'precision');
    }
    x = round(new Big(x), sd, rm);
    for (; x.c.length < sd;) x.c.push(0);
  }
  return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);
};
/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Include the sign for negative zero.
 */
P.valueOf = function () {
  var x = this,
    Big = x.constructor;
  if (Big.strict === true) {
    throw Error(NAME + 'valueOf disallowed');
  }
  return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);
};
// Export
/**
 * @type object
 */
var Big = _Big_();
/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/big.js/index.d.ts" />
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Big);

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Array.js":
/*!*****************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Array.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addInPlace": () => (/* binding */ addInPlace),
/* harmony export */   "addRangeInPlace": () => (/* binding */ addRangeInPlace),
/* harmony export */   "allPairs": () => (/* binding */ allPairs),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "average": () => (/* binding */ average),
/* harmony export */   "averageBy": () => (/* binding */ averageBy),
/* harmony export */   "choose": () => (/* binding */ choose),
/* harmony export */   "chunkBySize": () => (/* binding */ chunkBySize),
/* harmony export */   "collect": () => (/* binding */ collect),
/* harmony export */   "compareTo": () => (/* binding */ compareTo),
/* harmony export */   "compareWith": () => (/* binding */ compareWith),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "contains": () => (/* binding */ contains),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "copyTo": () => (/* binding */ copyTo),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "equalsWith": () => (/* binding */ equalsWith),
/* harmony export */   "exactlyOne": () => (/* binding */ exactlyOne),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "exists2": () => (/* binding */ exists2),
/* harmony export */   "existsOffset": () => (/* binding */ existsOffset),
/* harmony export */   "existsOffset2": () => (/* binding */ existsOffset2),
/* harmony export */   "fill": () => (/* binding */ fill),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findBack": () => (/* binding */ findBack),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "findIndexBack": () => (/* binding */ findIndexBack),
/* harmony export */   "findLastIndex": () => (/* binding */ findLastIndex),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "fold2": () => (/* binding */ fold2),
/* harmony export */   "foldBack": () => (/* binding */ foldBack),
/* harmony export */   "foldBack2": () => (/* binding */ foldBack2),
/* harmony export */   "foldBackIndexed": () => (/* binding */ foldBackIndexed),
/* harmony export */   "foldBackIndexed2": () => (/* binding */ foldBackIndexed2),
/* harmony export */   "foldIndexed": () => (/* binding */ foldIndexed),
/* harmony export */   "foldIndexed2": () => (/* binding */ foldIndexed2),
/* harmony export */   "forAll": () => (/* binding */ forAll),
/* harmony export */   "forAll2": () => (/* binding */ forAll2),
/* harmony export */   "getSubArray": () => (/* binding */ getSubArray),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "indexOf": () => (/* binding */ indexOf),
/* harmony export */   "indexed": () => (/* binding */ indexed),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "insertAt": () => (/* binding */ insertAt),
/* harmony export */   "insertManyAt": () => (/* binding */ insertManyAt),
/* harmony export */   "insertRangeInPlace": () => (/* binding */ insertRangeInPlace),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "item": () => (/* binding */ item),
/* harmony export */   "iterate": () => (/* binding */ iterate),
/* harmony export */   "iterate2": () => (/* binding */ iterate2),
/* harmony export */   "iterateIndexed": () => (/* binding */ iterateIndexed),
/* harmony export */   "iterateIndexed2": () => (/* binding */ iterateIndexed2),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "map2": () => (/* binding */ map2),
/* harmony export */   "map3": () => (/* binding */ map3),
/* harmony export */   "mapFold": () => (/* binding */ mapFold),
/* harmony export */   "mapFoldBack": () => (/* binding */ mapFoldBack),
/* harmony export */   "mapIndexed": () => (/* binding */ mapIndexed),
/* harmony export */   "mapIndexed2": () => (/* binding */ mapIndexed2),
/* harmony export */   "mapIndexed3": () => (/* binding */ mapIndexed3),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxBy": () => (/* binding */ maxBy),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minBy": () => (/* binding */ minBy),
/* harmony export */   "pairwise": () => (/* binding */ pairwise),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "permute": () => (/* binding */ permute),
/* harmony export */   "pick": () => (/* binding */ pick),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceBack": () => (/* binding */ reduceBack),
/* harmony export */   "removeAllInPlace": () => (/* binding */ removeAllInPlace),
/* harmony export */   "removeAt": () => (/* binding */ removeAt),
/* harmony export */   "removeInPlace": () => (/* binding */ removeInPlace),
/* harmony export */   "removeManyAt": () => (/* binding */ removeManyAt),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "scan": () => (/* binding */ scan),
/* harmony export */   "scanBack": () => (/* binding */ scanBack),
/* harmony export */   "setSlice": () => (/* binding */ setSlice),
/* harmony export */   "singleton": () => (/* binding */ singleton),
/* harmony export */   "skip": () => (/* binding */ skip),
/* harmony export */   "skipWhile": () => (/* binding */ skipWhile),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "sortByDescending": () => (/* binding */ sortByDescending),
/* harmony export */   "sortDescending": () => (/* binding */ sortDescending),
/* harmony export */   "sortInPlace": () => (/* binding */ sortInPlace),
/* harmony export */   "sortInPlaceBy": () => (/* binding */ sortInPlaceBy),
/* harmony export */   "sortWith": () => (/* binding */ sortWith),
/* harmony export */   "splitAt": () => (/* binding */ splitAt),
/* harmony export */   "splitInto": () => (/* binding */ splitInto),
/* harmony export */   "sum": () => (/* binding */ sum),
/* harmony export */   "sumBy": () => (/* binding */ sumBy),
/* harmony export */   "tail": () => (/* binding */ tail),
/* harmony export */   "take": () => (/* binding */ take),
/* harmony export */   "takeWhile": () => (/* binding */ takeWhile),
/* harmony export */   "transpose": () => (/* binding */ transpose),
/* harmony export */   "truncate": () => (/* binding */ truncate),
/* harmony export */   "tryExactlyOne": () => (/* binding */ tryExactlyOne),
/* harmony export */   "tryFind": () => (/* binding */ tryFind),
/* harmony export */   "tryFindBack": () => (/* binding */ tryFindBack),
/* harmony export */   "tryFindIndex": () => (/* binding */ tryFindIndex),
/* harmony export */   "tryFindIndexBack": () => (/* binding */ tryFindIndexBack),
/* harmony export */   "tryHead": () => (/* binding */ tryHead),
/* harmony export */   "tryItem": () => (/* binding */ tryItem),
/* harmony export */   "tryLast": () => (/* binding */ tryLast),
/* harmony export */   "tryPick": () => (/* binding */ tryPick),
/* harmony export */   "unfold": () => (/* binding */ unfold),
/* harmony export */   "unzip": () => (/* binding */ unzip),
/* harmony export */   "unzip3": () => (/* binding */ unzip3),
/* harmony export */   "updateAt": () => (/* binding */ updateAt),
/* harmony export */   "where": () => (/* binding */ where),
/* harmony export */   "windowed": () => (/* binding */ windowed),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "zip3": () => (/* binding */ zip3)
/* harmony export */ });
/* harmony import */ var _Native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Native.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Native.js");
/* harmony import */ var _Option_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Option.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Option.js");
/* harmony import */ var _Double_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Double.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Double.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Global.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Global.js");





function indexNotFound() {
  throw new Error("An index satisfying the predicate was not found in the collection.");
}
function differentLengths() {
  throw new Error("Arrays had different lengths");
}
function append(array1, array2, cons) {
  const len1 = array1.length | 0;
  const len2 = array2.length | 0;
  const newArray = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len1 + len2);
  for (let i = 0; i <= len1 - 1; i++) {
    newArray[i] = array1[i];
  }
  for (let i_1 = 0; i_1 <= len2 - 1; i_1++) {
    newArray[i_1 + len1] = array2[i_1];
  }
  return newArray;
}
function filter(predicate, array) {
  return array.filter(predicate);
}
function fill(target, targetIndex, count, value) {
  const start = targetIndex | 0;
  return target.fill(value, start, start + count);
}
function getSubArray(array, start, count) {
  const start_1 = start | 0;
  return array.slice(start_1, start_1 + count);
}
function last(array) {
  if (array.length === 0) {
    throw new Error("The input array was empty\\nParameter name: array");
  }
  return array[array.length - 1];
}
function tryLast(array) {
  if (array.length === 0) {
    return void 0;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(array[array.length - 1]);
  }
}
function mapIndexed(f, source, cons) {
  const len = source.length | 0;
  const target = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
  for (let i = 0; i <= len - 1; i++) {
    target[i] = f(i, source[i]);
  }
  return target;
}
function map(f, source, cons) {
  const len = source.length | 0;
  const target = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
  for (let i = 0; i <= len - 1; i++) {
    target[i] = f(source[i]);
  }
  return target;
}
function mapIndexed2(f, source1, source2, cons) {
  if (source1.length !== source2.length) {
    throw new Error("Arrays had different lengths");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, source1.length);
  for (let i = 0; i <= source1.length - 1; i++) {
    result[i] = f(i, source1[i], source2[i]);
  }
  return result;
}
function map2(f, source1, source2, cons) {
  if (source1.length !== source2.length) {
    throw new Error("Arrays had different lengths");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, source1.length);
  for (let i = 0; i <= source1.length - 1; i++) {
    result[i] = f(source1[i], source2[i]);
  }
  return result;
}
function mapIndexed3(f, source1, source2, source3, cons) {
  if (source1.length !== source2.length ? true : source2.length !== source3.length) {
    throw new Error("Arrays had different lengths");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, source1.length);
  for (let i = 0; i <= source1.length - 1; i++) {
    result[i] = f(i, source1[i], source2[i], source3[i]);
  }
  return result;
}
function map3(f, source1, source2, source3, cons) {
  if (source1.length !== source2.length ? true : source2.length !== source3.length) {
    throw new Error("Arrays had different lengths");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, source1.length);
  for (let i = 0; i <= source1.length - 1; i++) {
    result[i] = f(source1[i], source2[i], source3[i]);
  }
  return result;
}
function mapFold(mapping, state, array, cons) {
  const matchValue = array.length | 0;
  if (matchValue === 0) {
    return [[], state];
  } else {
    let acc = state;
    const res = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, matchValue);
    for (let i = 0; i <= array.length - 1; i++) {
      const patternInput = mapping(acc, array[i]);
      res[i] = patternInput[0];
      acc = patternInput[1];
    }
    return [res, acc];
  }
}
function mapFoldBack(mapping, array, state, cons) {
  const matchValue = array.length | 0;
  if (matchValue === 0) {
    return [[], state];
  } else {
    let acc = state;
    const res = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, matchValue);
    for (let i = array.length - 1; i >= 0; i--) {
      const patternInput = mapping(array[i], acc);
      res[i] = patternInput[0];
      acc = patternInput[1];
    }
    return [res, acc];
  }
}
function indexed(source) {
  const len = source.length | 0;
  const target = new Array(len);
  for (let i = 0; i <= len - 1; i++) {
    target[i] = [i, source[i]];
  }
  return target;
}
function truncate(count, array) {
  const count_1 = (0,_Double_js__WEBPACK_IMPORTED_MODULE_2__.max)(0, count) | 0;
  return array.slice(0, 0 + count_1);
}
function concat(arrays, cons) {
  const arrays_1 = Array.isArray(arrays) ? arrays : Array.from(arrays);
  const matchValue = arrays_1.length | 0;
  switch (matchValue) {
    case 0:
      return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
    case 1:
      return arrays_1[0];
    default:
      {
        let totalIdx = 0;
        let totalLength = 0;
        for (let idx = 0; idx <= arrays_1.length - 1; idx++) {
          const arr_1 = arrays_1[idx];
          totalLength = totalLength + arr_1.length | 0;
        }
        const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, totalLength);
        for (let idx_1 = 0; idx_1 <= arrays_1.length - 1; idx_1++) {
          const arr_2 = arrays_1[idx_1];
          for (let j = 0; j <= arr_2.length - 1; j++) {
            result[totalIdx] = arr_2[j];
            totalIdx = totalIdx + 1 | 0;
          }
        }
        return result;
      }
  }
}
function collect(mapping, array, cons) {
  return concat(map(mapping, array, (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.defaultOf)()), cons);
}
function where(predicate, array) {
  return array.filter(predicate);
}
function indexOf(array, item_1, start, count, eq) {
  const start_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.defaultArg)(start, 0) | 0;
  const end$0027 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.defaultArg)((0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.map)(c => start_1 + c, count), array.length) | 0;
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i >= end$0027) {
        return -1;
      } else if (eq.Equals(item_1, array[i])) {
        return i | 0;
      } else {
        i_mut = i + 1;
        continue loop;
      }
      break;
    }
  };
  return loop(start_1) | 0;
}
function contains(value, array, eq) {
  return indexOf(array, value, void 0, void 0, eq) >= 0;
}
function empty(cons) {
  return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
}
function singleton(value, cons) {
  const ar = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 1);
  ar[0] = value;
  return ar;
}
function initialize(count, initializer, cons) {
  if (count < 0) {
    throw new Error("The input must be non-negative\\nParameter name: count");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, count);
  for (let i = 0; i <= count - 1; i++) {
    result[i] = initializer(i);
  }
  return result;
}
function pairwise(array) {
  if (array.length < 2) {
    return [];
  } else {
    const count = array.length - 1 | 0;
    const result = new Array(count);
    for (let i = 0; i <= count - 1; i++) {
      result[i] = [array[i], array[i + 1]];
    }
    return result;
  }
}
function replicate(count, initial, cons) {
  if (count < 0) {
    throw new Error("The input must be non-negative\\nParameter name: count");
  }
  const result = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, count);
  for (let i = 0; i <= result.length - 1; i++) {
    result[i] = initial;
  }
  return result;
}
function copy(array) {
  return array.slice();
}
function copyTo(source, sourceIndex, target, targetIndex, count) {
  (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.copyToArray)(source, sourceIndex, target, targetIndex, count);
}
function reverse(array) {
  const array_2 = array.slice();
  return array_2.reverse();
}
function scan(folder, state, array, cons) {
  const res = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, array.length + 1);
  res[0] = state;
  for (let i = 0; i <= array.length - 1; i++) {
    res[i + 1] = folder(res[i], array[i]);
  }
  return res;
}
function scanBack(folder, array, state, cons) {
  const res = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, array.length + 1);
  res[array.length] = state;
  for (let i = array.length - 1; i >= 0; i--) {
    res[i] = folder(array[i], res[i + 1]);
  }
  return res;
}
function skip(count, array, cons) {
  if (count > array.length) {
    throw new Error("count is greater than array length\\nParameter name: count");
  }
  if (count === array.length) {
    return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
  } else {
    const count_1 = (count < 0 ? 0 : count) | 0;
    return array.slice(count_1);
  }
}
function skipWhile(predicate, array, cons) {
  let count = 0;
  while (count < array.length && predicate(array[count])) {
    count = count + 1 | 0;
  }
  if (count === array.length) {
    return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
  } else {
    const count_1 = count | 0;
    return array.slice(count_1);
  }
}
function take(count, array, cons) {
  if (count < 0) {
    throw new Error("The input must be non-negative\\nParameter name: count");
  }
  if (count > array.length) {
    throw new Error("count is greater than array length\\nParameter name: count");
  }
  if (count === 0) {
    return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
  } else {
    return array.slice(0, 0 + count);
  }
}
function takeWhile(predicate, array, cons) {
  let count = 0;
  while (count < array.length && predicate(array[count])) {
    count = count + 1 | 0;
  }
  if (count === 0) {
    return (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, 0);
  } else {
    const count_1 = count | 0;
    return array.slice(0, 0 + count_1);
  }
}
function addInPlace(x, array) {
  array.push(x);
}
function addRangeInPlace(range, array) {
  const enumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(range);
  try {
    while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
      addInPlace(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"](), array);
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.disposeSafe)(enumerator);
  }
}
function insertRangeInPlace(index, range, array) {
  let index_1;
  let i = index;
  const enumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(range);
  try {
    while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
      const x = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
      index_1 = i | 0, array.splice(index_1, 0, x);
      i = i + 1 | 0;
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.disposeSafe)(enumerator);
  }
}
function removeInPlace(item_1, array, eq) {
  const i = indexOf(array, item_1, void 0, void 0, eq) | 0;
  if (i > -1) {
    array.splice(i, 1);
    return true;
  } else {
    return false;
  }
}
function removeAllInPlace(predicate, array) {
  const countRemoveAll = count => {
    const i = array.findIndex(predicate) | 0;
    if (i > -1) {
      array.splice(i, 1);
      return countRemoveAll(count) + 1 | 0;
    } else {
      return count | 0;
    }
  };
  return countRemoveAll(0) | 0;
}
function partition(f, source, cons) {
  const len = source.length | 0;
  const res1 = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
  const res2 = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
  let iTrue = 0;
  let iFalse = 0;
  for (let i = 0; i <= len - 1; i++) {
    if (f(source[i])) {
      res1[iTrue] = source[i];
      iTrue = iTrue + 1 | 0;
    } else {
      res2[iFalse] = source[i];
      iFalse = iFalse + 1 | 0;
    }
  }
  return [truncate(iTrue, res1), truncate(iFalse, res2)];
}
function find(predicate, array) {
  const matchValue = array.find(predicate);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue);
  }
}
function tryFind(predicate, array) {
  return array.find(predicate);
}
function findIndex(predicate, array) {
  const matchValue = array.findIndex(predicate) | 0;
  if (matchValue > -1) {
    return matchValue | 0;
  } else {
    indexNotFound();
    return -1;
  }
}
function tryFindIndex(predicate, array) {
  const matchValue = array.findIndex(predicate) | 0;
  if (matchValue > -1) {
    return matchValue;
  } else {
    return void 0;
  }
}
function pick(chooser, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i >= array.length) {
        return indexNotFound();
      } else {
        const matchValue = chooser(array[i]);
        if (matchValue != null) {
          return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue);
        } else {
          i_mut = i + 1;
          continue loop;
        }
      }
      break;
    }
  };
  return loop(0);
}
function tryPick(chooser, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i >= array.length) {
        return void 0;
      } else {
        const matchValue = chooser(array[i]);
        if (matchValue == null) {
          i_mut = i + 1;
          continue loop;
        } else {
          return matchValue;
        }
      }
      break;
    }
  };
  return loop(0);
}
function findBack(predicate, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i < 0) {
        return indexNotFound();
      } else if (predicate(array[i])) {
        return array[i];
      } else {
        i_mut = i - 1;
        continue loop;
      }
      break;
    }
  };
  return loop(array.length - 1);
}
function tryFindBack(predicate, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i < 0) {
        return void 0;
      } else if (predicate(array[i])) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(array[i]);
      } else {
        i_mut = i - 1;
        continue loop;
      }
      break;
    }
  };
  return loop(array.length - 1);
}
function findLastIndex(predicate, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i < 0) {
        return -1;
      } else if (predicate(array[i])) {
        return i | 0;
      } else {
        i_mut = i - 1;
        continue loop;
      }
      break;
    }
  };
  return loop(array.length - 1) | 0;
}
function findIndexBack(predicate, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i < 0) {
        indexNotFound();
        return -1;
      } else if (predicate(array[i])) {
        return i | 0;
      } else {
        i_mut = i - 1;
        continue loop;
      }
      break;
    }
  };
  return loop(array.length - 1) | 0;
}
function tryFindIndexBack(predicate, array) {
  const loop = i_mut => {
    loop: while (true) {
      const i = i_mut;
      if (i < 0) {
        return void 0;
      } else if (predicate(array[i])) {
        return i;
      } else {
        i_mut = i - 1;
        continue loop;
      }
      break;
    }
  };
  return loop(array.length - 1);
}
function choose(chooser, array, cons) {
  const res = [];
  for (let i = 0; i <= array.length - 1; i++) {
    const matchValue = chooser(array[i]);
    if (matchValue != null) {
      const y = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue);
      res.push(y);
    }
  }
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.equals)(cons, (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.defaultOf)())) {
    return res;
  } else {
    return map(x => x, res, cons);
  }
}
function foldIndexed(folder, state, array) {
  return array.reduce((delegateArg, delegateArg_1, delegateArg_2) => folder(delegateArg_2, delegateArg, delegateArg_1), state);
}
function fold(folder, state, array) {
  return array.reduce(folder, state);
}
function iterate(action, array) {
  for (let i = 0; i <= array.length - 1; i++) {
    action(array[i]);
  }
}
function iterateIndexed(action, array) {
  for (let i = 0; i <= array.length - 1; i++) {
    action(i, array[i]);
  }
}
function iterate2(action, array1, array2) {
  if (array1.length !== array2.length) {
    differentLengths();
  }
  for (let i = 0; i <= array1.length - 1; i++) {
    action(array1[i], array2[i]);
  }
}
function iterateIndexed2(action, array1, array2) {
  if (array1.length !== array2.length) {
    differentLengths();
  }
  for (let i = 0; i <= array1.length - 1; i++) {
    action(i, array1[i], array2[i]);
  }
}
function isEmpty(array) {
  return array.length === 0;
}
function forAll(predicate, array) {
  return array.every(predicate);
}
function permute(f, array) {
  const size = array.length | 0;
  const res = array.slice();
  const checkFlags = new Array(size);
  iterateIndexed((i, x) => {
    const j = f(i) | 0;
    if (j < 0 ? true : j >= size) {
      throw new Error("Not a valid permutation");
    }
    res[j] = x;
    checkFlags[j] = 1;
  }, array);
  if (!checkFlags.every(y => 1 === y)) {
    throw new Error("Not a valid permutation");
  }
  return res;
}
function setSlice(target, lower, upper, source) {
  const lower_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.defaultArg)(lower, 0) | 0;
  const upper_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.defaultArg)(upper, -1) | 0;
  const length = (upper_1 >= 0 ? upper_1 : target.length - 1) - lower_1 | 0;
  for (let i = 0; i <= length; i++) {
    target[i + lower_1] = source[i];
  }
}
function sortInPlaceBy(projection, xs, comparer) {
  xs.sort((x, y) => comparer.Compare(projection(x), projection(y)));
}
function sortInPlace(xs, comparer) {
  xs.sort((x, y) => comparer.Compare(x, y));
}
function sort(xs, comparer) {
  const xs_1 = xs.slice();
  xs_1.sort((x, y) => comparer.Compare(x, y));
  return xs_1;
}
function sortBy(projection, xs, comparer) {
  const xs_1 = xs.slice();
  xs_1.sort((x, y) => comparer.Compare(projection(x), projection(y)));
  return xs_1;
}
function sortDescending(xs, comparer) {
  const xs_1 = xs.slice();
  xs_1.sort((x, y) => comparer.Compare(x, y) * -1);
  return xs_1;
}
function sortByDescending(projection, xs, comparer) {
  const xs_1 = xs.slice();
  xs_1.sort((x, y) => comparer.Compare(projection(x), projection(y)) * -1);
  return xs_1;
}
function sortWith(comparer, xs) {
  const comparer_1 = comparer;
  const xs_1 = xs.slice();
  xs_1.sort(comparer_1);
  return xs_1;
}
function allPairs(xs, ys) {
  const len1 = xs.length | 0;
  const len2 = ys.length | 0;
  const res = new Array(len1 * len2);
  for (let i = 0; i <= xs.length - 1; i++) {
    for (let j = 0; j <= ys.length - 1; j++) {
      res[i * len2 + j] = [xs[i], ys[j]];
    }
  }
  return res;
}
function unfold(generator, state) {
  const res = [];
  const loop = state_1_mut => {
    loop: while (true) {
      const state_1 = state_1_mut;
      const matchValue = generator(state_1);
      if (matchValue != null) {
        const x = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue)[0];
        const s = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue)[1];
        res.push(x);
        state_1_mut = s;
        continue loop;
      }
      break;
    }
  };
  loop(state);
  return res;
}
function unzip(array) {
  const len = array.length | 0;
  const res1 = new Array(len);
  const res2 = new Array(len);
  iterateIndexed((i, tupledArg) => {
    res1[i] = tupledArg[0];
    res2[i] = tupledArg[1];
  }, array);
  return [res1, res2];
}
function unzip3(array) {
  const len = array.length | 0;
  const res1 = new Array(len);
  const res2 = new Array(len);
  const res3 = new Array(len);
  iterateIndexed((i, tupledArg) => {
    res1[i] = tupledArg[0];
    res2[i] = tupledArg[1];
    res3[i] = tupledArg[2];
  }, array);
  return [res1, res2, res3];
}
function zip(array1, array2) {
  if (array1.length !== array2.length) {
    differentLengths();
  }
  const result = new Array(array1.length);
  for (let i = 0; i <= array1.length - 1; i++) {
    result[i] = [array1[i], array2[i]];
  }
  return result;
}
function zip3(array1, array2, array3) {
  if (array1.length !== array2.length ? true : array2.length !== array3.length) {
    differentLengths();
  }
  const result = new Array(array1.length);
  for (let i = 0; i <= array1.length - 1; i++) {
    result[i] = [array1[i], array2[i], array3[i]];
  }
  return result;
}
function chunkBySize(chunkSize, array) {
  if (chunkSize < 1) {
    throw new Error("The input must be positive.\\nParameter name: size");
  }
  if (array.length === 0) {
    return [[]];
  } else {
    const result = [];
    for (let x = 0; x <= ~~Math.ceil(array.length / chunkSize) - 1; x++) {
      let slice;
      const start_1 = x * chunkSize | 0;
      slice = array.slice(start_1, start_1 + chunkSize);
      result.push(slice);
    }
    return result;
  }
}
function splitAt(index, array) {
  if (index < 0 ? true : index > array.length) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return [array.slice(0, 0 + index), array.slice(index)];
}
function compareWith(comparer, source1, source2) {
  if (source1 == null) {
    if (source2 == null) {
      return 0;
    } else {
      return -1;
    }
  } else if (source2 == null) {
    return 1;
  } else {
    const len1 = source1.length | 0;
    const len2 = source2.length | 0;
    const len = (len1 < len2 ? len1 : len2) | 0;
    let i = 0;
    let res = 0;
    while (res === 0 && i < len) {
      res = comparer(source1[i], source2[i]) | 0;
      i = i + 1 | 0;
    }
    if (res !== 0) {
      return res | 0;
    } else if (len1 > len2) {
      return 1;
    } else if (len1 < len2) {
      return -1;
    } else {
      return 0;
    }
  }
}
function compareTo(comparer, source1, source2) {
  if (source1 == null) {
    if (source2 == null) {
      return 0;
    } else {
      return -1;
    }
  } else if (source2 == null) {
    return 1;
  } else {
    const len1 = source1.length | 0;
    const len2 = source2.length | 0;
    if (len1 > len2) {
      return 1;
    } else if (len1 < len2) {
      return -1;
    } else {
      let i = 0;
      let res = 0;
      while (res === 0 && i < len1) {
        res = comparer(source1[i], source2[i]) | 0;
        i = i + 1 | 0;
      }
      return res | 0;
    }
  }
}
function equalsWith(equals, array1, array2) {
  if (array1 == null) {
    if (array2 == null) {
      return true;
    } else {
      return false;
    }
  } else if (array2 == null) {
    return false;
  } else {
    let i = 0;
    let result = true;
    const length1 = array1.length | 0;
    const length2 = array2.length | 0;
    if (length1 > length2) {
      return false;
    } else if (length1 < length2) {
      return false;
    } else {
      while (i < length1 && result) {
        result = equals(array1[i], array2[i]);
        i = i + 1 | 0;
      }
      return result;
    }
  }
}
function exactlyOne(array) {
  switch (array.length) {
    case 1:
      return array[0];
    case 0:
      throw new Error("The input sequence was empty\\nParameter name: array");
    default:
      throw new Error("Input array too long\\nParameter name: array");
  }
}
function tryExactlyOne(array) {
  if (array.length === 1) {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(array[0]);
  } else {
    return void 0;
  }
}
function head(array) {
  if (array.length === 0) {
    throw new Error("The input array was empty\\nParameter name: array");
  } else {
    return array[0];
  }
}
function tryHead(array) {
  if (array.length === 0) {
    return void 0;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(array[0]);
  }
}
function tail(array) {
  if (array.length === 0) {
    throw new Error("Not enough elements\\nParameter name: array");
  }
  return array.slice(1);
}
function item(index, array) {
  return array[index];
}
function tryItem(index, array) {
  if (index < 0 ? true : index >= array.length) {
    return void 0;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(array[index]);
  }
}
function foldBackIndexed(folder, array, state) {
  return array.reduceRight((delegateArg, delegateArg_1, delegateArg_2) => folder(delegateArg_2, delegateArg_1, delegateArg), state);
}
function foldBack(folder, array, state) {
  return array.reduceRight((delegateArg, delegateArg_1) => folder(delegateArg_1, delegateArg), state);
}
function foldIndexed2(folder, state, array1, array2) {
  let acc = state;
  if (array1.length !== array2.length) {
    throw new Error("Arrays have different lengths");
  }
  for (let i = 0; i <= array1.length - 1; i++) {
    acc = folder(i, acc, array1[i], array2[i]);
  }
  return acc;
}
function fold2(folder, state, array1, array2) {
  return foldIndexed2((_arg, acc, x, y) => folder(acc, x, y), state, array1, array2);
}
function foldBackIndexed2(folder, array1, array2, state) {
  let acc = state;
  if (array1.length !== array2.length) {
    differentLengths();
  }
  const size = array1.length | 0;
  for (let i = 1; i <= size; i++) {
    acc = folder(i - 1, array1[size - i], array2[size - i], acc);
  }
  return acc;
}
function foldBack2(f, array1, array2, state) {
  return foldBackIndexed2((_arg, x, y, acc) => f(x, y, acc), array1, array2, state);
}
function reduce(reduction, array) {
  if (array.length === 0) {
    throw new Error("The input array was empty");
  }
  const reduction_1 = reduction;
  return array.reduce(reduction_1);
}
function reduceBack(reduction, array) {
  if (array.length === 0) {
    throw new Error("The input array was empty");
  }
  const reduction_1 = reduction;
  return array.reduceRight(reduction_1);
}
function forAll2(predicate, array1, array2) {
  return fold2((acc, x, y) => acc && predicate(x, y), true, array1, array2);
}
function existsOffset(predicate_mut, array_mut, index_mut) {
  existsOffset: while (true) {
    const predicate = predicate_mut,
      array = array_mut,
      index = index_mut;
    if (index === array.length) {
      return false;
    } else if (predicate(array[index])) {
      return true;
    } else {
      predicate_mut = predicate;
      array_mut = array;
      index_mut = index + 1;
      continue existsOffset;
    }
    break;
  }
}
function exists(predicate, array) {
  return existsOffset(predicate, array, 0);
}
function existsOffset2(predicate_mut, array1_mut, array2_mut, index_mut) {
  existsOffset2: while (true) {
    const predicate = predicate_mut,
      array1 = array1_mut,
      array2 = array2_mut,
      index = index_mut;
    if (index === array1.length) {
      return false;
    } else if (predicate(array1[index], array2[index])) {
      return true;
    } else {
      predicate_mut = predicate;
      array1_mut = array1;
      array2_mut = array2;
      index_mut = index + 1;
      continue existsOffset2;
    }
    break;
  }
}
function exists2(predicate, array1, array2) {
  if (array1.length !== array2.length) {
    differentLengths();
  }
  return existsOffset2(predicate, array1, array2, 0);
}
function sum(array, adder) {
  let acc = adder.GetZero();
  for (let i = 0; i <= array.length - 1; i++) {
    acc = adder.Add(acc, array[i]);
  }
  return acc;
}
function sumBy(projection, array, adder) {
  let acc = adder.GetZero();
  for (let i = 0; i <= array.length - 1; i++) {
    acc = adder.Add(acc, projection(array[i]));
  }
  return acc;
}
function maxBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? y : x, xs);
}
function max(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? y : x, xs);
}
function minBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? x : y, xs);
}
function min(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? x : y, xs);
}
function average(array, averager) {
  if (array.length === 0) {
    throw new Error("The input array was empty\\nParameter name: array");
  }
  let total = averager.GetZero();
  for (let i = 0; i <= array.length - 1; i++) {
    total = averager.Add(total, array[i]);
  }
  return averager.DivideByInt(total, array.length);
}
function averageBy(projection, array, averager) {
  if (array.length === 0) {
    throw new Error("The input array was empty\\nParameter name: array");
  }
  let total = averager.GetZero();
  for (let i = 0; i <= array.length - 1; i++) {
    total = averager.Add(total, projection(array[i]));
  }
  return averager.DivideByInt(total, array.length);
}
function windowed(windowSize, source) {
  if (windowSize <= 0) {
    throw new Error("windowSize must be positive");
  }
  let res;
  const len = (0,_Double_js__WEBPACK_IMPORTED_MODULE_2__.max)(0, source.length - windowSize + 1) | 0;
  res = new Array(len);
  for (let i = windowSize; i <= source.length; i++) {
    res[i - windowSize] = source.slice(i - windowSize, i - 1 + 1);
  }
  return res;
}
function splitInto(chunks, array) {
  if (chunks < 1) {
    throw new Error("The input must be positive.\\nParameter name: chunks");
  }
  if (array.length === 0) {
    return [[]];
  } else {
    const result = [];
    const chunks_1 = (0,_Double_js__WEBPACK_IMPORTED_MODULE_2__.min)(chunks, array.length) | 0;
    const minChunkSize = ~~(array.length / chunks_1) | 0;
    const chunksWithExtraItem = array.length % chunks_1 | 0;
    for (let i = 0; i <= chunks_1 - 1; i++) {
      const chunkSize = (i < chunksWithExtraItem ? minChunkSize + 1 : minChunkSize) | 0;
      let slice;
      const start_1 = i * minChunkSize + (0,_Double_js__WEBPACK_IMPORTED_MODULE_2__.min)(chunksWithExtraItem, i) | 0;
      slice = array.slice(start_1, start_1 + chunkSize);
      result.push(slice);
    }
    return result;
  }
}
function transpose(arrays, cons) {
  const arrays_1 = Array.isArray(arrays) ? arrays : Array.from(arrays);
  const len = arrays_1.length | 0;
  if (len === 0) {
    return new Array(0);
  } else {
    const firstArray = arrays_1[0];
    const lenInner = firstArray.length | 0;
    if (!forAll(a => a.length === lenInner, arrays_1)) {
      differentLengths();
    }
    const result = new Array(lenInner);
    for (let i = 0; i <= lenInner - 1; i++) {
      result[i] = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
      for (let j = 0; j <= len - 1; j++) {
        result[i][j] = arrays_1[j][i];
      }
    }
    return result;
  }
}
function insertAt(index, y, xs, cons) {
  const len = xs.length | 0;
  if (index < 0 ? true : index > len) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  const target = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len + 1);
  for (let i = 0; i <= index - 1; i++) {
    target[i] = xs[i];
  }
  target[index] = y;
  for (let i_1 = index; i_1 <= len - 1; i_1++) {
    target[i_1 + 1] = xs[i_1];
  }
  return target;
}
function insertManyAt(index, ys, xs, cons) {
  const len = xs.length | 0;
  if (index < 0 ? true : index > len) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  const ys_1 = Array.from(ys);
  const len2 = ys_1.length | 0;
  const target = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len + len2);
  for (let i = 0; i <= index - 1; i++) {
    target[i] = xs[i];
  }
  for (let i_1 = 0; i_1 <= len2 - 1; i_1++) {
    target[index + i_1] = ys_1[i_1];
  }
  for (let i_2 = index; i_2 <= len - 1; i_2++) {
    target[i_2 + len2] = xs[i_2];
  }
  return target;
}
function removeAt(index, xs) {
  if (index < 0 ? true : index >= xs.length) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  let i = -1;
  return filter(_arg => {
    i = i + 1 | 0;
    return i !== index;
  }, xs);
}
function removeManyAt(index, count, xs) {
  let i = -1;
  let status = -1;
  const ys = filter(_arg => {
    i = i + 1 | 0;
    if (i === index) {
      status = 0;
      return false;
    } else if (i > index) {
      if (i < index + count) {
        return false;
      } else {
        status = 1;
        return true;
      }
    } else {
      return true;
    }
  }, xs);
  const status_1 = (status === 0 && i + 1 === index + count ? 1 : status) | 0;
  if (status_1 < 1) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + (status_1 < 0 ? "index" : "count"));
  }
  return ys;
}
function updateAt(index, y, xs, cons) {
  const len = xs.length | 0;
  if (index < 0 ? true : index >= len) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_4__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  const target = (0,_Native_js__WEBPACK_IMPORTED_MODULE_0__.Helpers_allocateArrayFromCons)(cons, len);
  for (let i = 0; i <= len - 1; i++) {
    target[i] = i === index ? y : xs[i];
  }
  return target;
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/BigInt.js":
/*!******************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/BigInt.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "divRem": () => (/* binding */ divRem),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "fromBigInt": () => (/* binding */ fromBigInt),
/* harmony export */   "fromBoolean": () => (/* binding */ fromBoolean),
/* harmony export */   "fromByteArray": () => (/* binding */ fromByteArray),
/* harmony export */   "fromChar": () => (/* binding */ fromChar),
/* harmony export */   "fromDecimal": () => (/* binding */ fromDecimal),
/* harmony export */   "fromFloat16": () => (/* binding */ fromFloat16),
/* harmony export */   "fromFloat32": () => (/* binding */ fromFloat32),
/* harmony export */   "fromFloat64": () => (/* binding */ fromFloat64),
/* harmony export */   "fromInt128": () => (/* binding */ fromInt128),
/* harmony export */   "fromInt16": () => (/* binding */ fromInt16),
/* harmony export */   "fromInt32": () => (/* binding */ fromInt32),
/* harmony export */   "fromInt64": () => (/* binding */ fromInt64),
/* harmony export */   "fromInt8": () => (/* binding */ fromInt8),
/* harmony export */   "fromNativeInt": () => (/* binding */ fromNativeInt),
/* harmony export */   "fromOne": () => (/* binding */ fromOne),
/* harmony export */   "fromString": () => (/* binding */ fromString),
/* harmony export */   "fromUInt128": () => (/* binding */ fromUInt128),
/* harmony export */   "fromUInt16": () => (/* binding */ fromUInt16),
/* harmony export */   "fromUInt32": () => (/* binding */ fromUInt32),
/* harmony export */   "fromUInt64": () => (/* binding */ fromUInt64),
/* harmony export */   "fromUInt8": () => (/* binding */ fromUInt8),
/* harmony export */   "fromUNativeInt": () => (/* binding */ fromUNativeInt),
/* harmony export */   "fromZero": () => (/* binding */ fromZero),
/* harmony export */   "getBitLength": () => (/* binding */ getBitLength),
/* harmony export */   "get_IsEven": () => (/* binding */ get_IsEven),
/* harmony export */   "get_IsOne": () => (/* binding */ get_IsOne),
/* harmony export */   "get_IsPowerOfTwo": () => (/* binding */ get_IsPowerOfTwo),
/* harmony export */   "get_IsZero": () => (/* binding */ get_IsZero),
/* harmony export */   "get_MinusOne": () => (/* binding */ get_MinusOne),
/* harmony export */   "get_One": () => (/* binding */ get_One),
/* harmony export */   "get_Sign": () => (/* binding */ get_Sign),
/* harmony export */   "get_Zero": () => (/* binding */ get_Zero),
/* harmony export */   "greatestCommonDivisor": () => (/* binding */ greatestCommonDivisor),
/* harmony export */   "hash": () => (/* binding */ hash),
/* harmony export */   "ilog2": () => (/* binding */ ilog2),
/* harmony export */   "isBigInt": () => (/* binding */ isBigInt),
/* harmony export */   "isEvenInteger": () => (/* binding */ isEvenInteger),
/* harmony export */   "isNegative": () => (/* binding */ isNegative),
/* harmony export */   "isOddInteger": () => (/* binding */ isOddInteger),
/* harmony export */   "isPositive": () => (/* binding */ isPositive),
/* harmony export */   "isPow2": () => (/* binding */ isPow2),
/* harmony export */   "ln": () => (/* binding */ ln),
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "log10": () => (/* binding */ log10),
/* harmony export */   "log2": () => (/* binding */ log2),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxMagnitude": () => (/* binding */ maxMagnitude),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minMagnitude": () => (/* binding */ minMagnitude),
/* harmony export */   "modPow": () => (/* binding */ modPow),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "op_Addition": () => (/* binding */ op_Addition),
/* harmony export */   "op_BitwiseAnd": () => (/* binding */ op_BitwiseAnd),
/* harmony export */   "op_BitwiseOr": () => (/* binding */ op_BitwiseOr),
/* harmony export */   "op_Division": () => (/* binding */ op_Division),
/* harmony export */   "op_Equality": () => (/* binding */ op_Equality),
/* harmony export */   "op_ExclusiveOr": () => (/* binding */ op_ExclusiveOr),
/* harmony export */   "op_GreaterThan": () => (/* binding */ op_GreaterThan),
/* harmony export */   "op_GreaterThanOrEqual": () => (/* binding */ op_GreaterThanOrEqual),
/* harmony export */   "op_Inequality": () => (/* binding */ op_Inequality),
/* harmony export */   "op_LeftShift": () => (/* binding */ op_LeftShift),
/* harmony export */   "op_LessThan": () => (/* binding */ op_LessThan),
/* harmony export */   "op_LessThanOrEqual": () => (/* binding */ op_LessThanOrEqual),
/* harmony export */   "op_LogicalNot": () => (/* binding */ op_LogicalNot),
/* harmony export */   "op_Modulus": () => (/* binding */ op_Modulus),
/* harmony export */   "op_Multiply": () => (/* binding */ op_Multiply),
/* harmony export */   "op_RightShift": () => (/* binding */ op_RightShift),
/* harmony export */   "op_Subtraction": () => (/* binding */ op_Subtraction),
/* harmony export */   "op_UnaryNegation": () => (/* binding */ op_UnaryNegation),
/* harmony export */   "op_UnaryPlus": () => (/* binding */ op_UnaryPlus),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "pow": () => (/* binding */ pow),
/* harmony export */   "remainder": () => (/* binding */ remainder),
/* harmony export */   "sign": () => (/* binding */ sign),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "toBigInt": () => (/* binding */ toBigInt),
/* harmony export */   "toBoolean": () => (/* binding */ toBoolean),
/* harmony export */   "toByteArray": () => (/* binding */ toByteArray),
/* harmony export */   "toChar": () => (/* binding */ toChar),
/* harmony export */   "toDecimal": () => (/* binding */ toDecimal),
/* harmony export */   "toFloat16": () => (/* binding */ toFloat16),
/* harmony export */   "toFloat32": () => (/* binding */ toFloat32),
/* harmony export */   "toFloat64": () => (/* binding */ toFloat64),
/* harmony export */   "toInt128": () => (/* binding */ toInt128),
/* harmony export */   "toInt16": () => (/* binding */ toInt16),
/* harmony export */   "toInt32": () => (/* binding */ toInt32),
/* harmony export */   "toInt64": () => (/* binding */ toInt64),
/* harmony export */   "toInt8": () => (/* binding */ toInt8),
/* harmony export */   "toNativeInt": () => (/* binding */ toNativeInt),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "toUInt128": () => (/* binding */ toUInt128),
/* harmony export */   "toUInt16": () => (/* binding */ toUInt16),
/* harmony export */   "toUInt32": () => (/* binding */ toUInt32),
/* harmony export */   "toUInt64": () => (/* binding */ toUInt64),
/* harmony export */   "toUInt8": () => (/* binding */ toUInt8),
/* harmony export */   "toUNativeInt": () => (/* binding */ toUNativeInt),
/* harmony export */   "tryParse": () => (/* binding */ tryParse)
/* harmony export */ });
/* harmony import */ var _Decimal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Decimal.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Decimal.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");


const isBigEndian = false;
BigInt.prototype.toJSON = function () {
  return `${this.toString()}`;
};
const zero = 0n;
const one = 1n;
const two = 2n;
const minusOne = -1n;
function isBigInt(x) {
  return typeof x === "bigint";
}
function hash(x) {
  return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.bigintHash)(x);
}
function equals(x, y) {
  return x === y;
}
function compare(x, y) {
  return x < y ? -1 : x > y ? 1 : 0;
}
function abs(x) {
  return x < zero ? -x : x;
}
function sign(x) {
  return x < zero ? -1 : x > zero ? 1 : 0;
}
function max(x, y) {
  return x > y ? x : y;
}
function min(x, y) {
  return x < y ? x : y;
}
function maxMagnitude(x, y) {
  return abs(x) > abs(y) ? x : y;
}
function minMagnitude(x, y) {
  return abs(x) < abs(y) ? x : y;
}
function clamp(x, min, max) {
  return x < min ? min : x > max ? max : x;
}
function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  return x / y;
}
function remainder(x, y) {
  return x % y;
}
function negate(x) {
  return -x;
}
function op_UnaryNegation(x) {
  return -x;
}
function op_LogicalNot(x) {
  return ~x;
}
function op_UnaryPlus(x) {
  return x;
}
function op_Addition(x, y) {
  return x + y;
}
function op_Subtraction(x, y) {
  return x - y;
}
function op_Multiply(x, y) {
  return x * y;
}
function op_Division(x, y) {
  return x / y;
}
function op_Modulus(x, y) {
  return x % y;
}
function op_RightShift(x, n) {
  return x >> BigInt(n);
}
function op_LeftShift(x, n) {
  return x << BigInt(n);
}
function op_BitwiseAnd(x, y) {
  return x & y;
}
function op_BitwiseOr(x, y) {
  return x | y;
}
function op_ExclusiveOr(x, y) {
  return x ^ y;
}
function op_LessThan(x, y) {
  return x < y;
}
function op_LessThanOrEqual(x, y) {
  return x <= y;
}
function op_GreaterThan(x, y) {
  return x > y;
}
function op_GreaterThanOrEqual(x, y) {
  return x >= y;
}
function op_Equality(x, y) {
  return x === y;
}
function op_Inequality(x, y) {
  return x !== y;
}
function get_Zero() {
  return zero;
}
function get_One() {
  return one;
}
function get_MinusOne() {
  return minusOne;
}
function get_IsZero(x) {
  return x === zero;
}
function get_IsOne(x) {
  return x === one;
}
function get_IsEven(x) {
  return isEvenInteger(x);
}
function get_IsPowerOfTwo(x) {
  return isPow2(x);
}
function get_Sign(x) {
  return sign(x);
}
function isNegative(x) {
  return x < zero;
}
function isPositive(x) {
  return x > zero;
}
function isEvenInteger(x) {
  return x % two === zero;
}
function isOddInteger(x) {
  return x % two !== zero;
}
function isPow2(x) {
  return (x & x - one) === zero;
}
function fromZero() {
  return zero;
}
function fromOne() {
  return one;
}
function fromInt8(n) {
  return BigInt(n);
}
function fromUInt8(n) {
  return BigInt(n);
}
function fromInt16(n) {
  return BigInt(n);
}
function fromUInt16(n) {
  return BigInt(n);
}
function fromInt32(n) {
  return BigInt(n);
}
function fromUInt32(n) {
  return BigInt(n);
}
function fromInt64(n) {
  return n;
}
function fromUInt64(n) {
  return n;
}
function fromInt128(n) {
  return n;
}
function fromUInt128(n) {
  return n;
}
function fromNativeInt(n) {
  return n;
}
function fromUNativeInt(n) {
  return n;
}
function fromFloat16(n) {
  return BigInt(Math.trunc(n));
}
function fromFloat32(n) {
  return BigInt(Math.trunc(n));
}
function fromFloat64(n) {
  return BigInt(Math.trunc(n));
}
function fromDecimal(d) {
  return BigInt((0,_Decimal_js__WEBPACK_IMPORTED_MODULE_1__.truncate)(d).toString());
}
function fromBigInt(x) {
  return x;
}
function fromBoolean(b) {
  return BigInt(b);
}
function fromChar(c) {
  return BigInt(c.charCodeAt(0));
}
function fromString(s) {
  return BigInt(s);
}
function fromByteArray(bytes) {
  return fromSignedBytes(bytes, isBigEndian);
}
function toByteArray(value) {
  return toSignedBytes(value, isBigEndian);
}
function toInt8(x) {
  return Number(BigInt.asIntN(8, x));
}
function toUInt8(x) {
  return Number(BigInt.asUintN(8, x));
}
function toInt16(x) {
  return Number(BigInt.asIntN(16, x));
}
function toUInt16(x) {
  return Number(BigInt.asUintN(16, x));
}
function toInt32(x) {
  return Number(BigInt.asIntN(32, x));
}
function toUInt32(x) {
  return Number(BigInt.asUintN(32, x));
}
function toInt64(x) {
  return BigInt.asIntN(64, x);
}
function toUInt64(x) {
  return BigInt.asUintN(64, x);
}
function toInt128(x) {
  return BigInt.asIntN(128, x);
}
function toUInt128(x) {
  return BigInt.asUintN(128, x);
}
function toNativeInt(x) {
  return BigInt.asIntN(64, x);
}
function toUNativeInt(x) {
  return BigInt.asUintN(64, x);
}
function toFloat16(x) {
  return Number(x);
}
function toFloat32(x) {
  return Number(x);
}
function toFloat64(x) {
  return Number(x);
}
function toDecimal(x) {
  const low = Number(BigInt.asUintN(32, x));
  const mid = Number(BigInt.asUintN(32, x >> 32n));
  const high = Number(BigInt.asUintN(32, x >> 64n));
  const isNegative = x < zero;
  const scale = 0;
  return (0,_Decimal_js__WEBPACK_IMPORTED_MODULE_1__.fromParts)(low, mid, high, isNegative, scale);
}
function toBigInt(x) {
  return x;
}
function toBoolean(x) {
  return x !== zero;
}
function toChar(x) {
  return String.fromCharCode(toUInt16(x));
}
function toString(x) {
  return x.toString();
}
function tryParse(s, res) {
  try {
    res.contents = BigInt(s);
    return true;
  } catch (err) {
    return false;
  }
}
function parse(s) {
  return BigInt(s);
}
function pow(x, n) {
  return x ** BigInt(n);
}
function modPow(x, e, m) {
  return x ** e % m;
}
function divRem(x, y, out) {
  const div = x / y;
  const rem = x % y;
  if (out === void 0) {
    return [div, rem];
  } else {
    out.contents = rem;
    return div;
  }
}
function greatestCommonDivisor(x, y) {
  while (y > zero) {
    const q = x / y;
    const r = x - q * y;
    x = y;
    y = r;
  }
  return x;
}
function getBitLength(x) {
  return fromFloat64(x === zero ? 1 : log2(abs(x)) + 1);
}
function log2(x) {
  const n = Number(x);
  if (Number.isFinite(n)) return Math.log2(n); // fast path
  if (x < zero) return Number.NaN;
  let shift = one;
  while (x >= one << shift) {
    shift = shift << one;
  }
  let log = zero;
  while (shift > one) {
    shift = shift >> one;
    if (x >= one << shift) {
      log = log + shift;
      x = x >> shift;
    }
  }
  return Number(log);
}
function log10(x) {
  return log2(x) * Math.log10(2);
}
function ln(x) {
  return log2(x) * Math.log(2);
}
function log(x, base) {
  return log2(x) / Math.log2(base);
}
function ilog2(x) {
  return BigInt(log2(x));
}
// export function copySign
// export function createChecked
// export function createSaturating
// export function createTruncating
// export function getByteCount
// export function leadingZeroCount
// export function popCount
// export function rotateLeft
// export function rotateRight
// export function trailingZeroCount
// export function tryFormat
// export function tryWriteBytes
// -------------------------------------------------
// Binary serialization
// -------------------------------------------------
const hexCodes = new Uint8Array([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]);
function fromHexCode(code) {
  if (48 <= code && code <= 57) return code - 48;
  if (97 <= code && code <= 102) return code - 97 + 10;
  if (65 <= code && code <= 70) return code - 65 + 10;
  throw Error(`Invalid hex code: ${code}`);
}
function toSignedBytes(x, isBigEndian) {
  const isNeg = x < 0n;
  if (isNeg) {
    const len = log2(-x);
    const bits = len + (8 - len % 8);
    const pow2 = 1n << BigInt(bits);
    x = x + pow2; // two's complement
  }
  const hex = x.toString(16);
  const len = hex.length;
  const odd = len % 2;
  const first = hex.charCodeAt(0);
  const isLow = 48 <= first && first <= 55; // 0..7
  const start = isNeg && isLow || !isNeg && !isLow ? 1 : 0;
  const bytes = new Uint8Array(start + (len + odd) / 2);
  const inc = isBigEndian ? 1 : -1;
  let pos = isBigEndian ? 0 : bytes.length - 1;
  if (start > 0) {
    bytes[pos] = isNeg ? 255 : 0;
    pos += inc;
  }
  if (odd > 0) {
    bytes[pos] = fromHexCode(first);
    pos += inc;
  }
  for (let i = odd; i < len; i += 2, pos += inc) {
    const a = fromHexCode(hex.charCodeAt(i));
    const b = fromHexCode(hex.charCodeAt(i + 1));
    bytes[pos] = a << 4 | b;
  }
  return bytes;
}
function fromSignedBytes(bytes, isBigEndian) {
  if (bytes == null) {
    throw new Error("bytes is null");
  }
  const len = bytes.length;
  const first = isBigEndian ? 0 : len - 1;
  const isNeg = bytes[first] > 127;
  const codes = new Uint16Array(len * 2 + 2);
  codes[0] = 48; // 0
  codes[1] = 120; // x
  const inc = isBigEndian ? 1 : -1;
  let pos = isBigEndian ? 0 : len - 1;
  for (let i = 0; i < bytes.length; i++, pos += inc) {
    const byte = bytes[pos];
    codes[2 * i + 2] = hexCodes[byte >> 4];
    codes[2 * i + 3] = hexCodes[byte & 15];
  }
  const str = String.fromCharCode.apply(null, codes);
  let x = BigInt(str);
  if (isNeg) {
    const bits = len * 8;
    const pow2 = 1n << BigInt(bits);
    x = x - pow2; // two's complement
  }
  return x;
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Date.js":
/*!****************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Date.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateTime": () => (/* binding */ DateTime),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "addDays": () => (/* binding */ addDays),
/* harmony export */   "addHours": () => (/* binding */ addHours),
/* harmony export */   "addMilliseconds": () => (/* binding */ addMilliseconds),
/* harmony export */   "addMinutes": () => (/* binding */ addMinutes),
/* harmony export */   "addMonths": () => (/* binding */ addMonths),
/* harmony export */   "addSeconds": () => (/* binding */ addSeconds),
/* harmony export */   "addTicks": () => (/* binding */ addTicks),
/* harmony export */   "addYears": () => (/* binding */ addYears),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "compareTo": () => (/* binding */ compareTo),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "date": () => (/* binding */ date),
/* harmony export */   "dateOffsetToString": () => (/* binding */ dateOffsetToString),
/* harmony export */   "dateToHalfUTCString": () => (/* binding */ dateToHalfUTCString),
/* harmony export */   "day": () => (/* binding */ day),
/* harmony export */   "dayOfWeek": () => (/* binding */ dayOfWeek),
/* harmony export */   "dayOfYear": () => (/* binding */ dayOfYear),
/* harmony export */   "daysInMonth": () => (/* binding */ daysInMonth),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "fromDateTimeOffset": () => (/* binding */ fromDateTimeOffset),
/* harmony export */   "fromTicks": () => (/* binding */ fromTicks),
/* harmony export */   "getTicks": () => (/* binding */ getTicks),
/* harmony export */   "hour": () => (/* binding */ hour),
/* harmony export */   "isDaylightSavingTime": () => (/* binding */ isDaylightSavingTime),
/* harmony export */   "isLeapYear": () => (/* binding */ isLeapYear),
/* harmony export */   "kind": () => (/* binding */ kind),
/* harmony export */   "maxValue": () => (/* binding */ maxValue),
/* harmony export */   "millisecond": () => (/* binding */ millisecond),
/* harmony export */   "minValue": () => (/* binding */ minValue),
/* harmony export */   "minute": () => (/* binding */ minute),
/* harmony export */   "month": () => (/* binding */ month),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "op_Addition": () => (/* binding */ op_Addition),
/* harmony export */   "op_Subtraction": () => (/* binding */ op_Subtraction),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "parseRaw": () => (/* binding */ parseRaw),
/* harmony export */   "second": () => (/* binding */ second),
/* harmony export */   "specifyKind": () => (/* binding */ specifyKind),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "ticksToUnixEpochMilliseconds": () => (/* binding */ ticksToUnixEpochMilliseconds),
/* harmony export */   "timeOfDay": () => (/* binding */ timeOfDay),
/* harmony export */   "toLocalTime": () => (/* binding */ toLocalTime),
/* harmony export */   "toLongDateString": () => (/* binding */ toLongDateString),
/* harmony export */   "toLongTimeString": () => (/* binding */ toLongTimeString),
/* harmony export */   "toShortDateString": () => (/* binding */ toShortDateString),
/* harmony export */   "toShortTimeString": () => (/* binding */ toShortTimeString),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "toUniversalTime": () => (/* binding */ toUniversalTime),
/* harmony export */   "today": () => (/* binding */ today),
/* harmony export */   "tryParse": () => (/* binding */ tryParse),
/* harmony export */   "unixEpochMillisecondsToTicks": () => (/* binding */ unixEpochMillisecondsToTicks),
/* harmony export */   "utcNow": () => (/* binding */ utcNow),
/* harmony export */   "year": () => (/* binding */ year)
/* harmony export */ });
/* harmony import */ var _BigInt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BigInt.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/BigInt.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");
/**
 * DateTimeOffset functions.
 *
 * Note: Date instances are always DateObjects in local
 * timezone (because JS dates are all kinds of messed up).
 * A local date returns UTC epoch when `.getTime()` is called.
 *
 * Basically; invariant: date.getTime() always return UTC time.
 */


function kind(value) {
  return value.kind || 0;
}
function unixEpochMillisecondsToTicks(ms, offset) {
  return (0,_BigInt_js__WEBPACK_IMPORTED_MODULE_0__.toInt64)((BigInt(ms) + 62135596800000n + BigInt(offset)) * 10000n);
}
function ticksToUnixEpochMilliseconds(ticks) {
  return Number(BigInt(ticks) / 10000n - 62135596800000n);
}
function dateOffsetToString(offset) {
  const isMinus = offset < 0;
  offset = Math.abs(offset);
  const hours = ~~(offset / 3600000);
  const minutes = offset % 3600000 / 60000;
  return (isMinus ? "-" : "+") + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(hours, 2) + ":" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(minutes, 2);
}
function dateToHalfUTCString(date, half) {
  const str = date.toISOString();
  return half === "first" ? str.substring(0, str.indexOf("T")) : str.substring(str.indexOf("T") + 1, str.length - 1);
}
function dateToISOString(d, utc) {
  if (utc) {
    return d.toISOString();
  } else {
    // JS Date is always local
    const printOffset = d.kind == null ? true : d.kind === 2 /* DateKind.Local */;
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getFullYear(), 4) + "-" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getMonth() + 1, 2) + "-" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getDate(), 2) + "T" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getHours(), 2) + ":" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getMinutes(), 2) + ":" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getSeconds(), 2) + "." + (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(d.getMilliseconds(), 3) + (printOffset ? dateOffsetToString(d.getTimezoneOffset() * -60000) : "");
  }
}
function dateToISOStringWithOffset(dateWithOffset, offset) {
  const str = dateWithOffset.toISOString();
  return str.substring(0, str.length - 1) + dateOffsetToString(offset);
}
function dateToStringWithCustomFormat(date, format, utc) {
  return format.replace(/(\w)\1*/g, match => {
    let rep = Number.NaN;
    switch (match.substring(0, 1)) {
      case "y":
        const y = utc ? date.getUTCFullYear() : date.getFullYear();
        rep = match.length < 4 ? y % 100 : y;
        break;
      case "M":
        rep = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
        break;
      case "d":
        rep = utc ? date.getUTCDate() : date.getDate();
        break;
      case "H":
        rep = utc ? date.getUTCHours() : date.getHours();
        break;
      case "h":
        const h = utc ? date.getUTCHours() : date.getHours();
        rep = h > 12 ? h % 12 : h;
        break;
      case "m":
        rep = utc ? date.getUTCMinutes() : date.getMinutes();
        break;
      case "s":
        rep = utc ? date.getUTCSeconds() : date.getSeconds();
        break;
      case "f":
        rep = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
        break;
    }
    if (Number.isNaN(rep)) {
      return match;
    } else {
      return (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.padWithZeros)(rep, match.length);
    }
  });
}
function dateToStringWithOffset(date, format) {
  const d = new Date(date.getTime() + (date.offset ?? 0));
  if (typeof format !== "string") {
    return d.toISOString().replace(/\.\d+/, "").replace(/[A-Z]|\.\d+/g, " ") + dateOffsetToString(date.offset ?? 0);
  } else if (format.length === 1) {
    switch (format) {
      case "D":
      case "d":
        return dateToHalfUTCString(d, "first");
      case "T":
      case "t":
        return dateToHalfUTCString(d, "second");
      case "O":
      case "o":
        return dateToISOStringWithOffset(d, date.offset ?? 0);
      default:
        throw new Error("Unrecognized Date print format");
    }
  } else {
    return dateToStringWithCustomFormat(d, format, true);
  }
}
function dateToStringWithKind(date, format) {
  const utc = date.kind === 1 /* DateKind.UTC */;
  if (typeof format !== "string") {
    return utc ? date.toUTCString() : date.toLocaleString();
  } else if (format.length === 1) {
    switch (format) {
      case "D":
      case "d":
        return utc ? dateToHalfUTCString(date, "first") : date.toLocaleDateString();
      case "T":
      case "t":
        return utc ? dateToHalfUTCString(date, "second") : date.toLocaleTimeString();
      case "O":
      case "o":
        return dateToISOString(date, utc);
      default:
        throw new Error("Unrecognized Date print format");
    }
  } else {
    return dateToStringWithCustomFormat(date, format, utc);
  }
}
function toString(date, format, _provider) {
  return date.offset != null ? dateToStringWithOffset(date, format) : dateToStringWithKind(date, format);
}
function DateTime(value, kind) {
  const d = new Date(value);
  d.kind = (kind == null ? 0 /* DateKind.Unspecified */ : kind) | 0;
  return d;
}
function fromTicks(ticks, kind) {
  kind = kind != null ? kind : 2 /* DateKind.Local */; // better default than Unspecified
  let date = DateTime(ticksToUnixEpochMilliseconds(ticks), kind);
  // Ticks are local to offset (in this case, either UTC or Local/Unknown).
  // If kind is anything but UTC, that means that the tick number was not
  // in utc, thus getTime() cannot return UTC, and needs to be shifted.
  if (kind !== 1 /* DateKind.UTC */) {
    date = DateTime(date.getTime() - (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.dateOffset)(date), kind);
  }
  return date;
}
function fromDateTimeOffset(date, kind) {
  switch (kind) {
    case 1 /* DateKind.UTC */:
      return DateTime(date.getTime(), 1 /* DateKind.UTC */);
    case 2 /* DateKind.Local */:
      return DateTime(date.getTime(), 2 /* DateKind.Local */);
    default:
      const d = DateTime(date.getTime() + (date.offset ?? 0), kind);
      return DateTime(d.getTime() - (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.dateOffset)(d), kind);
  }
}
function getTicks(date) {
  return unixEpochMillisecondsToTicks(date.getTime(), (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.dateOffset)(date));
}
function minValue() {
  // This is "0001-01-01T00:00:00.000Z", actual JS min value is -8640000000000000
  return DateTime(-62135596800000, 0 /* DateKind.Unspecified */);
}
function maxValue() {
  // This is "9999-12-31T23:59:59.999Z", actual JS max value is 8640000000000000
  return DateTime(253402300799999, 0 /* DateKind.Unspecified */);
}
function parseRaw(input) {
  function fail() {
    throw new Error(`The string is not a valid Date: ${input}`);
  }
  if (input == null || input.trim() === "") {
    fail();
  }
  // ISO dates without TZ are parsed as UTC. Adding time without TZ keeps them local.
  if (input.length === 10 && input[4] === "-" && input[7] === "-") {
    input += "T00:00:00";
  }
  let date = new Date(input);
  let offset = null;
  if (isNaN(date.getTime())) {
    // Try to check strings JS Date cannot parse (see #1045, #1422)
    // tslint:disable-next-line:max-line-length
    const m = /^\s*(\d+[^\w\s:]\d+[^\w\s:]\d+)?\s*(\d+:\d+(?::\d+(?:\.\d+)?)?)?\s*([AaPp][Mm])?\s*(Z|[+-]([01]?\d):?([0-5]?\d)?)?\s*$/.exec(input);
    if (m != null) {
      let baseDate;
      let timeInSeconds = 0;
      if (m[2] != null) {
        const timeParts = m[2].split(":");
        timeInSeconds = parseInt(timeParts[0], 10) * 3600 + parseInt(timeParts[1] || "0", 10) * 60 + parseFloat(timeParts[2] || "0");
        if (m[3] != null && m[3].toUpperCase() === "PM") {
          timeInSeconds += 720;
        }
      }
      if (m[4] != null) {
        // There's an offset, parse as UTC
        if (m[1] != null) {
          baseDate = new Date(m[1] + " UTC");
        } else {
          const d = new Date();
          baseDate = new Date(d.getUTCFullYear() + "/" + (d.getUTCMonth() + 1) + "/" + d.getUTCDate());
        }
        if (m[4] === "Z") {
          offset = "Z";
        } else {
          let offsetInMinutes = parseInt(m[5], 10) * 60 + parseInt(m[6] || "0", 10);
          if (m[4][0] === "-") {
            offsetInMinutes *= -1;
          }
          offset = offsetInMinutes;
          timeInSeconds -= offsetInMinutes * 60;
        }
      } else {
        if (m[1] != null) {
          baseDate = new Date(m[1]);
        } else {
          const d = new Date();
          baseDate = new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate());
        }
      }
      date = new Date(baseDate.getTime() + timeInSeconds * 1000);
      // correct for daylight savings time
      date = new Date(date.getTime() + (date.getTimezoneOffset() - baseDate.getTimezoneOffset()) * 60000);
    } else {
      fail();
    }
    // Check again the date is valid after transformations, see #2229
    if (isNaN(date.getTime())) {
      fail();
    }
  }
  return [date, offset];
}
function parse(str, detectUTC = false) {
  const [date, offset] = parseRaw(str);
  // .NET always parses DateTime as Local if there's offset info (even "Z")
  // Newtonsoft.Json uses UTC if the offset is "Z"
  const kind = offset != null ? detectUTC && offset === "Z" ? 1 /* DateKind.UTC */ : 2 /* DateKind.Local */ : 0 /* DateKind.Unspecified */;
  return DateTime(date.getTime(), kind);
}
function tryParse(v, defValue) {
  try {
    defValue.contents = parse(v);
    return true;
  } catch (_err) {
    return false;
  }
}
function create(year, month, day, h = 0, m = 0, s = 0, ms = 0, kind) {
  const date = kind === 1 /* DateKind.UTC */ ? new Date(Date.UTC(year, month - 1, day, h, m, s, ms)) : new Date(year, month - 1, day, h, m, s, ms);
  if (year <= 99) {
    if (kind === 1 /* DateKind.UTC */) {
      date.setUTCFullYear(year, month - 1, day);
    } else {
      date.setFullYear(year, month - 1, day);
    }
  }
  const dateValue = date.getTime();
  if (isNaN(dateValue)) {
    throw new Error("The parameters describe an unrepresentable Date.");
  }
  return DateTime(dateValue, kind);
}
function now() {
  return DateTime(Date.now(), 2 /* DateKind.Local */);
}
function utcNow() {
  return DateTime(Date.now(), 1 /* DateKind.UTC */);
}
function today() {
  return date(now());
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function daysInMonth(year, month) {
  return month === 2 ? isLeapYear(year) ? 29 : 28 : month >= 8 ? month % 2 === 0 ? 31 : 30 : month % 2 === 0 ? 30 : 31;
}
function toUniversalTime(date) {
  return date.kind === 1 /* DateKind.UTC */ ? date : DateTime(date.getTime(), 1 /* DateKind.UTC */);
}
function toLocalTime(date) {
  return date.kind === 2 /* DateKind.Local */ ? date : DateTime(date.getTime(), 2 /* DateKind.Local */);
}
function specifyKind(d, kind) {
  return create(year(d), month(d), day(d), hour(d), minute(d), second(d), millisecond(d), kind);
}
function timeOfDay(d) {
  return hour(d) * 3600000 + minute(d) * 60000 + second(d) * 1000 + millisecond(d);
}
function date(d) {
  return create(year(d), month(d), day(d), 0, 0, 0, 0, d.kind);
}
function day(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCDate() : d.getDate();
}
function hour(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCHours() : d.getHours();
}
function millisecond(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCMilliseconds() : d.getMilliseconds();
}
function minute(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCMinutes() : d.getMinutes();
}
function month(d) {
  return (d.kind === 1 /* DateKind.UTC */ ? d.getUTCMonth() : d.getMonth()) + 1;
}
function second(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCSeconds() : d.getSeconds();
}
function year(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCFullYear() : d.getFullYear();
}
function dayOfWeek(d) {
  return d.kind === 1 /* DateKind.UTC */ ? d.getUTCDay() : d.getDay();
}
function dayOfYear(d) {
  const _year = year(d);
  const _month = month(d);
  let _day = day(d);
  for (let i = 1; i < _month; i++) {
    _day += daysInMonth(_year, i);
  }
  return _day;
}
function add(d, ts) {
  const newDate = DateTime(d.getTime() + ts, d.kind);
  if (d.kind === 2 /* DateKind.Local */) {
    const oldTzOffset = d.getTimezoneOffset();
    const newTzOffset = newDate.getTimezoneOffset();
    return oldTzOffset !== newTzOffset ? DateTime(newDate.getTime() + (newTzOffset - oldTzOffset) * 60000, d.kind) : newDate;
  } else {
    return newDate;
  }
}
function addDays(d, v) {
  return add(d, v * 86400000);
}
function addHours(d, v) {
  return add(d, v * 3600000);
}
function addMinutes(d, v) {
  return add(d, v * 60000);
}
function addSeconds(d, v) {
  return add(d, v * 1000);
}
function addMilliseconds(d, v) {
  return add(d, v);
}
function addTicks(d, v) {
  return add(d, (0,_BigInt_js__WEBPACK_IMPORTED_MODULE_0__.toFloat64)(v / 10000n));
}
function addYears(d, v) {
  const newMonth = month(d);
  const newYear = year(d) + v;
  const _daysInMonth = daysInMonth(newYear, newMonth);
  const newDay = Math.min(_daysInMonth, day(d));
  return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind);
}
function addMonths(d, v) {
  let newMonth = month(d) + v;
  let newMonth_ = 0;
  let yearOffset = 0;
  if (newMonth > 12) {
    newMonth_ = newMonth % 12;
    yearOffset = Math.floor(newMonth / 12);
    newMonth = newMonth_;
  } else if (newMonth < 1) {
    newMonth_ = 12 + newMonth % 12;
    yearOffset = Math.floor(newMonth / 12) + (newMonth_ === 12 ? -1 : 0);
    newMonth = newMonth_;
  }
  const newYear = year(d) + yearOffset;
  const _daysInMonth = daysInMonth(newYear, newMonth);
  const newDay = Math.min(_daysInMonth, day(d));
  return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind);
}
function subtract(d, that) {
  return typeof that === "number" ? add(d, -that) : d.getTime() - that.getTime();
}
function toLongDateString(d) {
  return d.toDateString();
}
function toShortDateString(d) {
  return d.toLocaleDateString();
}
function toLongTimeString(d) {
  return d.toLocaleTimeString();
}
function toShortTimeString(d) {
  return d.toLocaleTimeString().replace(/:\d\d(?!:)/, "");
}
function equals(d1, d2) {
  return d1.getTime() === d2.getTime();
}
const compare = _Util_js__WEBPACK_IMPORTED_MODULE_1__.compareDates;
const compareTo = _Util_js__WEBPACK_IMPORTED_MODULE_1__.compareDates;
function op_Addition(x, y) {
  return add(x, y);
}
function op_Subtraction(x, y) {
  return subtract(x, y);
}
function isDaylightSavingTime(x) {
  const jan = new Date(x.getFullYear(), 0, 1);
  const jul = new Date(x.getFullYear(), 6, 1);
  return isDST(jan.getTimezoneOffset(), jul.getTimezoneOffset(), x.getTimezoneOffset());
}
function isDST(janOffset, julOffset, tOffset) {
  return Math.min(janOffset, julOffset) === tOffset;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DateTime);

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Decimal.js":
/*!*******************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Decimal.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "ceiling": () => (/* binding */ ceiling),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "fromIntArray": () => (/* binding */ fromIntArray),
/* harmony export */   "fromInts": () => (/* binding */ fromInts),
/* harmony export */   "fromParts": () => (/* binding */ fromParts),
/* harmony export */   "getBits": () => (/* binding */ getBits),
/* harmony export */   "get_MaxValue": () => (/* binding */ get_MaxValue),
/* harmony export */   "get_MinValue": () => (/* binding */ get_MinValue),
/* harmony export */   "get_MinusOne": () => (/* binding */ get_MinusOne),
/* harmony export */   "get_One": () => (/* binding */ get_One),
/* harmony export */   "get_Zero": () => (/* binding */ get_Zero),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxMagnitude": () => (/* binding */ maxMagnitude),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minMagnitude": () => (/* binding */ minMagnitude),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "op_Addition": () => (/* binding */ op_Addition),
/* harmony export */   "op_Division": () => (/* binding */ op_Division),
/* harmony export */   "op_Modulus": () => (/* binding */ op_Modulus),
/* harmony export */   "op_Multiply": () => (/* binding */ op_Multiply),
/* harmony export */   "op_Subtraction": () => (/* binding */ op_Subtraction),
/* harmony export */   "op_UnaryNegation": () => (/* binding */ op_UnaryNegation),
/* harmony export */   "op_UnaryPlus": () => (/* binding */ op_UnaryPlus),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "pow": () => (/* binding */ pow),
/* harmony export */   "remainder": () => (/* binding */ remainder),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "sign": () => (/* binding */ sign),
/* harmony export */   "sqrt": () => (/* binding */ sqrt),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "toNumber": () => (/* binding */ toNumber),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "truncate": () => (/* binding */ truncate),
/* harmony export */   "tryParse": () => (/* binding */ tryParse)
/* harmony export */ });
/* harmony import */ var _lib_big_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/big.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/lib/big.js");
/* harmony import */ var _Numeric_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Numeric.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Numeric.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Types.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");




_lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.GetHashCode = function () {
  return (0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.combineHashCodes)([this.s, this.e].concat(this.c));
};
_lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.Equals = function (x) {
  return !this.cmp(x);
};
_lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.CompareTo = function (x) {
  return this.cmp(x);
};
_lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype[_Numeric_js__WEBPACK_IMPORTED_MODULE_2__.symbol] = function () {
  const _this = this;
  return {
    multiply: y => _this.mul(y),
    toPrecision: sd => _this.toPrecision(sd),
    toExponential: dp => _this.toExponential(dp),
    toFixed: dp => _this.toFixed(dp),
    toHex: () => (Number(_this) >>> 0).toString(16)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
const get_Zero = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](0);
const get_One = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](1);
const get_MinusOne = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](-1);
const get_MaxValue = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"]("79228162514264337593543950335");
const get_MinValue = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"]("-79228162514264337593543950335");
function compare(x, y) {
  return x.cmp(y);
}
function equals(x, y) {
  return !x.cmp(y);
}
function abs(x) {
  return x.abs();
}
function sign(x) {
  return x < get_Zero ? -1 : x > get_Zero ? 1 : 0;
}
function max(x, y) {
  return x > y ? x : y;
}
function min(x, y) {
  return x < y ? x : y;
}
function maxMagnitude(x, y) {
  return abs(x) > abs(y) ? x : y;
}
function minMagnitude(x, y) {
  return abs(x) < abs(y) ? x : y;
}
function clamp(x, min, max) {
  return x < min ? min : x > max ? max : x;
}
function round(x, digits = 0) {
  return x.round(digits, 2 /* ROUND_HALF_EVEN */);
}
function truncate(x) {
  return x.round(0, 0 /* ROUND_DOWN */);
}
function ceiling(x) {
  return x.round(0, x.cmp(0) >= 0 ? 3 /* ROUND_UP */ : 0 /* ROUND_DOWN */);
}
function floor(x) {
  return x.round(0, x.cmp(0) >= 0 ? 0 /* ROUND_DOWN */ : 3 /* ROUND_UP */);
}
function pow(x, n) {
  return x.pow(n);
}
function sqrt(x) {
  return x.sqrt();
}
function op_Addition(x, y) {
  return x.add(y);
}
function op_Subtraction(x, y) {
  return x.sub(y);
}
function op_Multiply(x, y) {
  return x.mul(y);
}
function op_Division(x, y) {
  return x.div(y);
}
function op_Modulus(x, y) {
  return x.mod(y);
}
function op_UnaryNegation(x) {
  const x2 = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](x);
  x2.s = -x2.s || 0;
  return x2;
}
function op_UnaryPlus(x) {
  return x;
}
const add = op_Addition;
const subtract = op_Subtraction;
const multiply = op_Multiply;
const divide = op_Division;
const remainder = op_Modulus;
const negate = op_UnaryNegation;
function toString(x) {
  return x.toString();
}
function tryParse(str, defValue) {
  try {
    defValue.contents = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](str.trim());
    return true;
  } catch {
    return false;
  }
}
function parse(str) {
  const defValue = new _Types_js__WEBPACK_IMPORTED_MODULE_3__.FSharpRef(get_Zero);
  if (tryParse(str, defValue)) {
    return defValue.contents;
  } else {
    throw new Error("Input string was not in a correct format.");
  }
}
function toNumber(x) {
  return +x;
}
function decimalToHex(dec, bitSize) {
  const hex = new Uint8Array(bitSize / 4 | 0);
  let hexCount = 1;
  for (let d = 0; d < dec.length; d++) {
    let value = dec[d];
    for (let i = 0; i < hexCount; i++) {
      const digit = hex[i] * 10 + value | 0;
      hex[i] = digit & 0xF;
      value = digit >> 4;
    }
    if (value !== 0) {
      hex[hexCount++] = value;
    }
  }
  return hex.slice(0, hexCount); // digits in reverse order
}
function hexToDecimal(hex, bitSize) {
  const dec = new Uint8Array(bitSize * 301 / 1000 + 1 | 0);
  let decCount = 1;
  for (let d = hex.length - 1; d >= 0; d--) {
    let carry = hex[d];
    for (let i = 0; i < decCount; i++) {
      const val = dec[i] * 16 + carry | 0;
      dec[i] = val % 10 | 0;
      carry = val / 10 | 0;
    }
    while (carry > 0) {
      dec[decCount++] = carry % 10 | 0;
      carry = carry / 10 | 0;
    }
  }
  return dec.slice(0, decCount); // digits in reverse order
}
function setInt32Bits(hexDigits, bits, offset) {
  for (let i = 0; i < 8; i++) {
    hexDigits[offset + i] = bits >> i * 4 & 0xF;
  }
}
function getInt32Bits(hexDigits, offset) {
  let bits = 0;
  for (let i = 0; i < 8; i++) {
    bits = bits | hexDigits[offset + i] << i * 4;
  }
  return bits;
}
function fromIntArray(bits) {
  return fromInts(bits[0], bits[1], bits[2], bits[3]);
}
function fromInts(low, mid, high, signExp) {
  const isNegative = signExp < 0;
  const scale = signExp >> 16 & 0x7F;
  return fromParts(low, mid, high, isNegative, scale);
}
function fromParts(low, mid, high, isNegative, scale) {
  const bitSize = 96;
  const hexDigits = new Uint8Array(bitSize / 4);
  setInt32Bits(hexDigits, low, 0);
  setInt32Bits(hexDigits, mid, 8);
  setInt32Bits(hexDigits, high, 16);
  const decDigits = hexToDecimal(hexDigits, bitSize);
  scale = scale & 0x7F;
  const big = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](0);
  big.c = Array.from(decDigits.reverse());
  big.e = decDigits.length - scale - 1;
  big.s = isNegative ? -1 : 1;
  const d = new _lib_big_js__WEBPACK_IMPORTED_MODULE_0__["default"](big);
  return d;
}
function getBits(d) {
  const bitSize = 96;
  const decDigits = Uint8Array.from(d.c);
  const hexDigits = decimalToHex(decDigits, bitSize);
  const low = getInt32Bits(hexDigits, 0);
  const mid = getInt32Bits(hexDigits, 8);
  const high = getInt32Bits(hexDigits, 16);
  const decStr = d.toString();
  const dotPos = decStr.indexOf(".");
  const scale = dotPos < 0 ? 0 : decStr.length - dotPos - 1;
  const signExp = (scale & 0x7F) << 16 | (d.s < 0 ? 0x80000000 : 0);
  return [low, mid, high, signExp];
}
// export function makeRangeStepFunction(step: Decimal, last: Decimal) {
//   const stepComparedWithZero = step.cmp(get_Zero);
//   if (stepComparedWithZero === 0) {
//     throw new Error("The step of a range cannot be zero");
//   }
//   const stepGreaterThanZero = stepComparedWithZero > 0;
//   return (x: Decimal) => {
//     const comparedWithLast = x.cmp(last);
//     if ((stepGreaterThanZero && comparedWithLast <= 0)
//       || (!stepGreaterThanZero && comparedWithLast >= 0)) {
//       return [x, op_Addition(x, step)];
//     } else {
//       return undefined;
//     }
//   };
// }

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Double.js":
/*!******************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Double.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "isInfinity": () => (/* binding */ isInfinity),
/* harmony export */   "isNegativeInfinity": () => (/* binding */ isNegativeInfinity),
/* harmony export */   "isPositiveInfinity": () => (/* binding */ isPositiveInfinity),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxMagnitude": () => (/* binding */ maxMagnitude),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minMagnitude": () => (/* binding */ minMagnitude),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "tryParse": () => (/* binding */ tryParse)
/* harmony export */ });
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Types.js");

function tryParse(str, defValue) {
  // TODO: test if value is valid and in range
  if (str != null && /\S/.test(str)) {
    const v = +str.replace("_", "");
    if (!Number.isNaN(v)) {
      defValue.contents = v;
      return true;
    }
  }
  return false;
}
function parse(str) {
  const defValue = new _Types_js__WEBPACK_IMPORTED_MODULE_0__.FSharpRef(0);
  if (tryParse(str, defValue)) {
    return defValue.contents;
  } else {
    throw new Error("Input string was not in a correct format.");
  }
}
// JS Number.isFinite function evals false for NaN
function isPositiveInfinity(x) {
  return x === Number.POSITIVE_INFINITY;
}
function isNegativeInfinity(x) {
  return x === Number.NEGATIVE_INFINITY;
}
function isInfinity(x) {
  return x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY;
}
function max(x, y) {
  return x > y ? x : y;
}
function min(x, y) {
  return x < y ? x : y;
}
function maxMagnitude(x, y) {
  return Math.abs(x) > Math.abs(y) ? x : y;
}
function minMagnitude(x, y) {
  return Math.abs(x) < Math.abs(y) ? x : y;
}
function clamp(x, min, max) {
  return x < min ? min : x > max ? max : x;
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/FSharp.Collections.js":
/*!******************************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/FSharp.Collections.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComparisonIdentity_FromFunction": () => (/* binding */ ComparisonIdentity_FromFunction),
/* harmony export */   "ComparisonIdentity_Structural": () => (/* binding */ ComparisonIdentity_Structural),
/* harmony export */   "HashIdentity_FromFunctions": () => (/* binding */ HashIdentity_FromFunctions),
/* harmony export */   "HashIdentity_Reference": () => (/* binding */ HashIdentity_Reference),
/* harmony export */   "HashIdentity_Structural": () => (/* binding */ HashIdentity_Structural)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");

function HashIdentity_FromFunctions(hash, eq) {
  return {
    Equals(x, y) {
      return eq(x, y);
    },
    GetHashCode(x_1) {
      return hash(x_1);
    }
  };
}
function HashIdentity_Structural() {
  return HashIdentity_FromFunctions(_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash, _Util_js__WEBPACK_IMPORTED_MODULE_0__.equals);
}
function HashIdentity_Reference() {
  return HashIdentity_FromFunctions(_Util_js__WEBPACK_IMPORTED_MODULE_0__.physicalHash, (e, e_1) => e === e_1);
}
function ComparisonIdentity_FromFunction(comparer) {
  return {
    Compare(x, y) {
      return comparer(x, y);
    }
  };
}
function ComparisonIdentity_Structural() {
  return ComparisonIdentity_FromFunction(_Util_js__WEBPACK_IMPORTED_MODULE_0__.compare);
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/FSharp.Core.js":
/*!***********************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/FSharp.Core.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtraTopLevelOperators_LazyPattern": () => (/* binding */ ExtraTopLevelOperators_LazyPattern),
/* harmony export */   "LanguagePrimitives_FastGenericComparer": () => (/* binding */ LanguagePrimitives_FastGenericComparer),
/* harmony export */   "LanguagePrimitives_FastGenericComparerFromTable": () => (/* binding */ LanguagePrimitives_FastGenericComparerFromTable),
/* harmony export */   "LanguagePrimitives_FastGenericEqualityComparer": () => (/* binding */ LanguagePrimitives_FastGenericEqualityComparer),
/* harmony export */   "LanguagePrimitives_FastGenericEqualityComparerFromTable": () => (/* binding */ LanguagePrimitives_FastGenericEqualityComparerFromTable),
/* harmony export */   "LanguagePrimitives_GenericEqualityComparer": () => (/* binding */ LanguagePrimitives_GenericEqualityComparer),
/* harmony export */   "LanguagePrimitives_GenericEqualityERComparer": () => (/* binding */ LanguagePrimitives_GenericEqualityERComparer),
/* harmony export */   "Operators_Failure": () => (/* binding */ Operators_Failure),
/* harmony export */   "Operators_FailurePattern": () => (/* binding */ Operators_FailurePattern),
/* harmony export */   "Operators_Lock": () => (/* binding */ Operators_Lock),
/* harmony export */   "Operators_NullArg": () => (/* binding */ Operators_NullArg),
/* harmony export */   "Operators_Using": () => (/* binding */ Operators_Using),
/* harmony export */   "PrintfModule_PrintFormatToStringBuilder": () => (/* binding */ PrintfModule_PrintFormatToStringBuilder),
/* harmony export */   "PrintfModule_PrintFormatToStringBuilderThen": () => (/* binding */ PrintfModule_PrintFormatToStringBuilderThen)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _FSharp_Collections_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FSharp.Collections.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/FSharp.Collections.js");
/* harmony import */ var _System_Text_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./System.Text.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/System.Text.js");



const LanguagePrimitives_GenericEqualityComparer = {
  "System.Collections.IEqualityComparer.Equals541DA560"(x, y) {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(x, y);
  },
  "System.Collections.IEqualityComparer.GetHashCode4E60E31B"(x_1) {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash)(x_1);
  }
};
const LanguagePrimitives_GenericEqualityERComparer = {
  "System.Collections.IEqualityComparer.Equals541DA560"(x, y) {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(x, y);
  },
  "System.Collections.IEqualityComparer.GetHashCode4E60E31B"(x_1) {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash)(x_1);
  }
};
function LanguagePrimitives_FastGenericComparer() {
  return (0,_FSharp_Collections_js__WEBPACK_IMPORTED_MODULE_1__.ComparisonIdentity_Structural)();
}
function LanguagePrimitives_FastGenericComparerFromTable() {
  return (0,_FSharp_Collections_js__WEBPACK_IMPORTED_MODULE_1__.ComparisonIdentity_Structural)();
}
function LanguagePrimitives_FastGenericEqualityComparer() {
  return (0,_FSharp_Collections_js__WEBPACK_IMPORTED_MODULE_1__.HashIdentity_Structural)();
}
function LanguagePrimitives_FastGenericEqualityComparerFromTable() {
  return (0,_FSharp_Collections_js__WEBPACK_IMPORTED_MODULE_1__.HashIdentity_Structural)();
}
function Operators_Failure(message) {
  return new Error(message);
}
function Operators_FailurePattern(exn) {
  return exn.message;
}
function Operators_NullArg(x) {
  throw new Error(x);
}
function Operators_Using(resource, action) {
  try {
    return action(resource);
  } finally {
    if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(resource, (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.defaultOf)())) {} else {
      let copyOfStruct = resource;
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(copyOfStruct);
    }
  }
}
function Operators_Lock(_lockObj, action) {
  return action();
}
function ExtraTopLevelOperators_LazyPattern(input) {
  return input.Value;
}
function PrintfModule_PrintFormatToStringBuilderThen(continuation, builder, format) {
  return format.cont(s => {
    (0,_System_Text_js__WEBPACK_IMPORTED_MODULE_2__.StringBuilder__Append_Z721C83C5)(builder, s);
    return continuation();
  });
}
function PrintfModule_PrintFormatToStringBuilder(builder, format) {
  return PrintfModule_PrintFormatToStringBuilderThen(() => {}, builder, format);
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Global.js":
/*!******************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Global.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SR_differentLengths": () => (/* binding */ SR_differentLengths),
/* harmony export */   "SR_indexOutOfBounds": () => (/* binding */ SR_indexOutOfBounds),
/* harmony export */   "SR_inputMustBeNonNegative": () => (/* binding */ SR_inputMustBeNonNegative),
/* harmony export */   "SR_inputSequenceEmpty": () => (/* binding */ SR_inputSequenceEmpty),
/* harmony export */   "SR_inputSequenceTooLong": () => (/* binding */ SR_inputSequenceTooLong),
/* harmony export */   "SR_inputWasEmpty": () => (/* binding */ SR_inputWasEmpty),
/* harmony export */   "SR_keyNotFoundAlt": () => (/* binding */ SR_keyNotFoundAlt),
/* harmony export */   "SR_notEnoughElements": () => (/* binding */ SR_notEnoughElements)
/* harmony export */ });
const SR_indexOutOfBounds = "The index was outside the range of elements in the collection.";
const SR_inputWasEmpty = "Collection was empty.";
const SR_inputMustBeNonNegative = "The input must be non-negative.";
const SR_inputSequenceEmpty = "The input sequence was empty.";
const SR_inputSequenceTooLong = "The input sequence contains more than one element.";
const SR_keyNotFoundAlt = "An index satisfying the predicate was not found in the collection.";
const SR_differentLengths = "The collections had different lengths.";
const SR_notEnoughElements = "The input sequence has an insufficient number of elements.";

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/List.js":
/*!****************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/List.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FSharpList": () => (/* binding */ FSharpList),
/* harmony export */   "FSharpList_$reflection": () => (/* binding */ FSharpList_$reflection),
/* harmony export */   "FSharpList_Cons_305B8EAC": () => (/* binding */ FSharpList_Cons_305B8EAC),
/* harmony export */   "FSharpList__get_Head": () => (/* binding */ FSharpList__get_Head),
/* harmony export */   "FSharpList__get_IsEmpty": () => (/* binding */ FSharpList__get_IsEmpty),
/* harmony export */   "FSharpList__get_Item_Z524259A4": () => (/* binding */ FSharpList__get_Item_Z524259A4),
/* harmony export */   "FSharpList__get_Length": () => (/* binding */ FSharpList__get_Length),
/* harmony export */   "FSharpList__get_Tail": () => (/* binding */ FSharpList__get_Tail),
/* harmony export */   "FSharpList_get_Empty": () => (/* binding */ FSharpList_get_Empty),
/* harmony export */   "ListEnumerator$1": () => (/* binding */ ListEnumerator$1),
/* harmony export */   "ListEnumerator$1_$ctor_3002E699": () => (/* binding */ ListEnumerator$1_$ctor_3002E699),
/* harmony export */   "ListEnumerator$1_$reflection": () => (/* binding */ ListEnumerator$1_$reflection),
/* harmony export */   "allPairs": () => (/* binding */ allPairs),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "average": () => (/* binding */ average),
/* harmony export */   "averageBy": () => (/* binding */ averageBy),
/* harmony export */   "choose": () => (/* binding */ choose),
/* harmony export */   "chunkBySize": () => (/* binding */ chunkBySize),
/* harmony export */   "collect": () => (/* binding */ collect),
/* harmony export */   "compareWith": () => (/* binding */ compareWith),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "cons": () => (/* binding */ cons),
/* harmony export */   "contains": () => (/* binding */ contains),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "exactlyOne": () => (/* binding */ exactlyOne),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "exists2": () => (/* binding */ exists2),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findBack": () => (/* binding */ findBack),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "findIndexBack": () => (/* binding */ findIndexBack),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "fold2": () => (/* binding */ fold2),
/* harmony export */   "foldBack": () => (/* binding */ foldBack),
/* harmony export */   "foldBack2": () => (/* binding */ foldBack2),
/* harmony export */   "foldIndexed": () => (/* binding */ foldIndexed),
/* harmony export */   "forAll": () => (/* binding */ forAll),
/* harmony export */   "forAll2": () => (/* binding */ forAll2),
/* harmony export */   "getSlice": () => (/* binding */ getSlice),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "indexNotFound": () => (/* binding */ indexNotFound),
/* harmony export */   "indexed": () => (/* binding */ indexed),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "insertAt": () => (/* binding */ insertAt),
/* harmony export */   "insertManyAt": () => (/* binding */ insertManyAt),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "item": () => (/* binding */ item),
/* harmony export */   "iterate": () => (/* binding */ iterate),
/* harmony export */   "iterate2": () => (/* binding */ iterate2),
/* harmony export */   "iterateIndexed": () => (/* binding */ iterateIndexed),
/* harmony export */   "iterateIndexed2": () => (/* binding */ iterateIndexed2),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "map2": () => (/* binding */ map2),
/* harmony export */   "map3": () => (/* binding */ map3),
/* harmony export */   "mapFold": () => (/* binding */ mapFold),
/* harmony export */   "mapFoldBack": () => (/* binding */ mapFoldBack),
/* harmony export */   "mapIndexed": () => (/* binding */ mapIndexed),
/* harmony export */   "mapIndexed2": () => (/* binding */ mapIndexed2),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxBy": () => (/* binding */ maxBy),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minBy": () => (/* binding */ minBy),
/* harmony export */   "ofArray": () => (/* binding */ ofArray),
/* harmony export */   "ofArrayWithTail": () => (/* binding */ ofArrayWithTail),
/* harmony export */   "ofSeq": () => (/* binding */ ofSeq),
/* harmony export */   "pairwise": () => (/* binding */ pairwise),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "permute": () => (/* binding */ permute),
/* harmony export */   "pick": () => (/* binding */ pick),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceBack": () => (/* binding */ reduceBack),
/* harmony export */   "removeAt": () => (/* binding */ removeAt),
/* harmony export */   "removeManyAt": () => (/* binding */ removeManyAt),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "scan": () => (/* binding */ scan),
/* harmony export */   "scanBack": () => (/* binding */ scanBack),
/* harmony export */   "singleton": () => (/* binding */ singleton),
/* harmony export */   "skip": () => (/* binding */ skip),
/* harmony export */   "skipWhile": () => (/* binding */ skipWhile),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "sortByDescending": () => (/* binding */ sortByDescending),
/* harmony export */   "sortDescending": () => (/* binding */ sortDescending),
/* harmony export */   "sortWith": () => (/* binding */ sortWith),
/* harmony export */   "splitAt": () => (/* binding */ splitAt),
/* harmony export */   "splitInto": () => (/* binding */ splitInto),
/* harmony export */   "sum": () => (/* binding */ sum),
/* harmony export */   "sumBy": () => (/* binding */ sumBy),
/* harmony export */   "tail": () => (/* binding */ tail),
/* harmony export */   "take": () => (/* binding */ take),
/* harmony export */   "takeWhile": () => (/* binding */ takeWhile),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "toSeq": () => (/* binding */ toSeq),
/* harmony export */   "transpose": () => (/* binding */ transpose),
/* harmony export */   "truncate": () => (/* binding */ truncate),
/* harmony export */   "tryExactlyOne": () => (/* binding */ tryExactlyOne),
/* harmony export */   "tryFind": () => (/* binding */ tryFind),
/* harmony export */   "tryFindBack": () => (/* binding */ tryFindBack),
/* harmony export */   "tryFindIndex": () => (/* binding */ tryFindIndex),
/* harmony export */   "tryFindIndexBack": () => (/* binding */ tryFindIndexBack),
/* harmony export */   "tryHead": () => (/* binding */ tryHead),
/* harmony export */   "tryItem": () => (/* binding */ tryItem),
/* harmony export */   "tryLast": () => (/* binding */ tryLast),
/* harmony export */   "tryPick": () => (/* binding */ tryPick),
/* harmony export */   "unfold": () => (/* binding */ unfold),
/* harmony export */   "unzip": () => (/* binding */ unzip),
/* harmony export */   "unzip3": () => (/* binding */ unzip3),
/* harmony export */   "updateAt": () => (/* binding */ updateAt),
/* harmony export */   "where": () => (/* binding */ where),
/* harmony export */   "windowed": () => (/* binding */ windowed),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "zip3": () => (/* binding */ zip3)
/* harmony export */ });
/* harmony import */ var _String_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./String.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/String.js");
/* harmony import */ var _Option_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Option.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Option.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Types.js");
/* harmony import */ var _Reflection_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Reflection.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Reflection.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Global.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Global.js");
/* harmony import */ var _Array_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Array.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Array.js");







class FSharpList extends _Types_js__WEBPACK_IMPORTED_MODULE_0__.Record {
  constructor(head, tail) {
    super();
    this.head = head;
    this.tail = tail;
  }
  toString() {
    const xs = this;
    return "[" + (0,_String_js__WEBPACK_IMPORTED_MODULE_1__.join)("; ", xs) + "]";
  }
  Equals(other) {
    const xs = this;
    if (xs === other) {
      return true;
    } else {
      const loop = (xs_1_mut, ys_1_mut) => {
        loop: while (true) {
          const xs_1 = xs_1_mut,
            ys_1 = ys_1_mut;
          const matchValue = xs_1.tail;
          const matchValue_1 = ys_1.tail;
          if (matchValue != null) {
            if (matchValue_1 != null) {
              const xt = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
              const yt = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue_1);
              if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.equals)(xs_1.head, ys_1.head)) {
                xs_1_mut = xt;
                ys_1_mut = yt;
                continue loop;
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else if (matchValue_1 != null) {
            return false;
          } else {
            return true;
          }
          break;
        }
      };
      return loop(xs, other);
    }
  }
  GetHashCode() {
    const xs = this;
    const loop = (i_mut, h_mut, xs_1_mut) => {
      loop: while (true) {
        const i = i_mut,
          h = h_mut,
          xs_1 = xs_1_mut;
        const matchValue = xs_1.tail;
        if (matchValue != null) {
          const t = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
          if (i > 18) {
            return h | 0;
          } else {
            i_mut = i + 1;
            h_mut = (h << 1) + (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.structuralHash)(xs_1.head) + 631 * i;
            xs_1_mut = t;
            continue loop;
          }
        } else {
          return h | 0;
        }
        break;
      }
    };
    return loop(0, 0, xs) | 0;
  }
  toJSON() {
    const this$ = this;
    return Array.from(this$);
  }
  CompareTo(other) {
    const xs = this;
    const loop = (xs_1_mut, ys_1_mut) => {
      loop: while (true) {
        const xs_1 = xs_1_mut,
          ys_1 = ys_1_mut;
        const matchValue = xs_1.tail;
        const matchValue_1 = ys_1.tail;
        if (matchValue != null) {
          if (matchValue_1 != null) {
            const xt = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
            const yt = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue_1);
            const c = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.compare)(xs_1.head, ys_1.head) | 0;
            if (c === 0) {
              xs_1_mut = xt;
              ys_1_mut = yt;
              continue loop;
            } else {
              return c | 0;
            }
          } else {
            return 1;
          }
        } else if (matchValue_1 != null) {
          return -1;
        } else {
          return 0;
        }
        break;
      }
    };
    return loop(xs, other) | 0;
  }
  GetEnumerator() {
    const xs = this;
    return ListEnumerator$1_$ctor_3002E699(xs);
  }
  [Symbol.iterator]() {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.toIterator)((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(this));
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const xs = this;
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(xs);
  }
}
function FSharpList_$reflection(gen0) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_4__.record_type)("ListModule.FSharpList", [gen0], FSharpList, () => [["head", gen0], ["tail", (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_4__.option_type)(FSharpList_$reflection(gen0))]]);
}
class ListEnumerator$1 {
  constructor(xs) {
    this.xs = xs;
    this.it = this.xs;
    this.current = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.defaultOf)();
  }
  "System.Collections.Generic.IEnumerator`1.get_Current"() {
    const _ = this;
    return _.current;
  }
  "System.Collections.IEnumerator.get_Current"() {
    const _ = this;
    return _.current;
  }
  "System.Collections.IEnumerator.MoveNext"() {
    const _ = this;
    const matchValue = _.it.tail;
    if (matchValue != null) {
      const t = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
      _.current = _.it.head;
      _.it = t;
      return true;
    } else {
      return false;
    }
  }
  "System.Collections.IEnumerator.Reset"() {
    const _ = this;
    _.it = _.xs;
    _.current = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.defaultOf)();
  }
  Dispose() {}
}
function ListEnumerator$1_$reflection(gen0) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_4__.class_type)("ListModule.ListEnumerator`1", [gen0], ListEnumerator$1);
}
function ListEnumerator$1_$ctor_3002E699(xs) {
  return new ListEnumerator$1(xs);
}
function FSharpList_get_Empty() {
  return new FSharpList((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.defaultOf)(), void 0);
}
function FSharpList_Cons_305B8EAC(x, xs) {
  return new FSharpList(x, xs);
}
function FSharpList__get_IsEmpty(xs) {
  return xs.tail == null;
}
function FSharpList__get_Length(xs) {
  const loop = (i_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        xs_1 = xs_1_mut;
      const matchValue = xs_1.tail;
      if (matchValue != null) {
        i_mut = i + 1;
        xs_1_mut = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
        continue loop;
      } else {
        return i | 0;
      }
      break;
    }
  };
  return loop(0, xs) | 0;
}
function FSharpList__get_Head(xs) {
  const matchValue = xs.tail;
  if (matchValue != null) {
    return xs.head;
  } else {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputWasEmpty + "\\nParameter name: " + "list");
  }
}
function FSharpList__get_Tail(xs) {
  const matchValue = xs.tail;
  if (matchValue != null) {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
  } else {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputWasEmpty + "\\nParameter name: " + "list");
  }
}
function FSharpList__get_Item_Z524259A4(xs, index) {
  const loop = (i_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        xs_1 = xs_1_mut;
      const matchValue = xs_1.tail;
      if (matchValue != null) {
        if (i === index) {
          return xs_1.head;
        } else {
          i_mut = i + 1;
          xs_1_mut = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
          continue loop;
        }
      } else {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
      }
      break;
    }
  };
  return loop(0, xs);
}
function indexNotFound() {
  throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_keyNotFoundAlt);
}
function empty() {
  return FSharpList_get_Empty();
}
function cons(x, xs) {
  return FSharpList_Cons_305B8EAC(x, xs);
}
function singleton(x) {
  return FSharpList_Cons_305B8EAC(x, FSharpList_get_Empty());
}
function isEmpty(xs) {
  return FSharpList__get_IsEmpty(xs);
}
function length(xs) {
  return FSharpList__get_Length(xs);
}
function head(xs) {
  return FSharpList__get_Head(xs);
}
function tryHead(xs) {
  if (FSharpList__get_IsEmpty(xs)) {
    return void 0;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(FSharpList__get_Head(xs));
  }
}
function tail(xs) {
  return FSharpList__get_Tail(xs);
}
function tryLast(xs_mut) {
  tryLast: while (true) {
    const xs = xs_mut;
    if (FSharpList__get_IsEmpty(xs)) {
      return void 0;
    } else {
      const t = FSharpList__get_Tail(xs);
      if (FSharpList__get_IsEmpty(t)) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(FSharpList__get_Head(xs));
      } else {
        xs_mut = t;
        continue tryLast;
      }
    }
    break;
  }
}
function last(xs) {
  const matchValue = tryLast(xs);
  if (matchValue == null) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputWasEmpty);
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
  }
}
function compareWith(comparer, xs, ys) {
  const loop = (xs_1_mut, ys_1_mut) => {
    loop: while (true) {
      const xs_1 = xs_1_mut,
        ys_1 = ys_1_mut;
      const matchValue = FSharpList__get_IsEmpty(xs_1);
      const matchValue_1 = FSharpList__get_IsEmpty(ys_1);
      if (matchValue) {
        if (matchValue_1) {
          return 0;
        } else {
          return -1;
        }
      } else if (matchValue_1) {
        return 1;
      } else {
        const c = comparer(FSharpList__get_Head(xs_1), FSharpList__get_Head(ys_1)) | 0;
        if (c === 0) {
          xs_1_mut = FSharpList__get_Tail(xs_1);
          ys_1_mut = FSharpList__get_Tail(ys_1);
          continue loop;
        } else {
          return c | 0;
        }
      }
      break;
    }
  };
  return loop(xs, ys) | 0;
}
function toArray(xs) {
  const len = FSharpList__get_Length(xs) | 0;
  const res = (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.fill)(new Array(len), 0, len, null);
  const loop = (i_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        xs_1 = xs_1_mut;
      if (!FSharpList__get_IsEmpty(xs_1)) {
        res[i] = FSharpList__get_Head(xs_1);
        i_mut = i + 1;
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  loop(0, xs);
  return res;
}
function fold(folder, state, xs) {
  let acc = state;
  let xs_1 = xs;
  while (!FSharpList__get_IsEmpty(xs_1)) {
    acc = folder(acc, head(xs_1));
    xs_1 = FSharpList__get_Tail(xs_1);
  }
  return acc;
}
function reverse(xs) {
  return fold((acc, x) => FSharpList_Cons_305B8EAC(x, acc), FSharpList_get_Empty(), xs);
}
function foldBack(folder, xs, state) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.foldBack)(folder, toArray(xs), state);
}
function foldIndexed(folder, state, xs) {
  const loop = (i_mut, acc_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        acc = acc_mut,
        xs_1 = xs_1_mut;
      if (FSharpList__get_IsEmpty(xs_1)) {
        return acc;
      } else {
        i_mut = i + 1;
        acc_mut = folder(i, acc, FSharpList__get_Head(xs_1));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  return loop(0, state, xs);
}
function fold2(folder, state, xs, ys) {
  let acc = state;
  let xs_1 = xs;
  let ys_1 = ys;
  while (!FSharpList__get_IsEmpty(xs_1) && !FSharpList__get_IsEmpty(ys_1)) {
    acc = folder(acc, FSharpList__get_Head(xs_1), FSharpList__get_Head(ys_1));
    xs_1 = FSharpList__get_Tail(xs_1);
    ys_1 = FSharpList__get_Tail(ys_1);
  }
  return acc;
}
function foldBack2(folder, xs, ys, state) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.foldBack2)(folder, toArray(xs), toArray(ys), state);
}
function unfold(gen, state) {
  const loop = (acc_mut, node_mut) => {
    let t;
    loop: while (true) {
      const acc = acc_mut,
        node = node_mut;
      const matchValue = gen(acc);
      if (matchValue != null) {
        acc_mut = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue)[1];
        node_mut = (t = new FSharpList((0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue)[0], void 0), (node.tail = t, t));
        continue loop;
      } else {
        return node;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node_1 = loop(state, root);
  const t_2 = FSharpList_get_Empty();
  node_1.tail = t_2;
  return FSharpList__get_Tail(root);
}
function iterate(action, xs) {
  fold((unitVar, x) => {
    action(x);
  }, void 0, xs);
}
function iterate2(action, xs, ys) {
  fold2((unitVar, x, y) => {
    action(x, y);
  }, void 0, xs, ys);
}
function iterateIndexed(action, xs) {
  fold((i, x) => {
    action(i, x);
    return i + 1 | 0;
  }, 0, xs);
}
function iterateIndexed2(action, xs, ys) {
  fold2((i, x, y) => {
    action(i, x, y);
    return i + 1 | 0;
  }, 0, xs, ys);
}
function toSeq(xs) {
  return xs;
}
function ofArrayWithTail(xs, tail_1) {
  let res = tail_1;
  for (let i = xs.length - 1; i >= 0; i--) {
    res = FSharpList_Cons_305B8EAC(xs[i], res);
  }
  return res;
}
function ofArray(xs) {
  return ofArrayWithTail(xs, FSharpList_get_Empty());
}
function ofSeq(xs) {
  let xs_3, t;
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(xs)) {
    return ofArray(xs);
  } else if (xs instanceof FSharpList) {
    return xs;
  } else {
    const root = FSharpList_get_Empty();
    let node = root;
    const enumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(xs);
    try {
      while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
        const x = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
        node = (xs_3 = node, (t = new FSharpList(x, void 0), (xs_3.tail = t, t)));
      }
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.disposeSafe)(enumerator);
    }
    const xs_5 = node;
    const t_2 = FSharpList_get_Empty();
    xs_5.tail = t_2;
    return FSharpList__get_Tail(root);
  }
}
function concat(lists) {
  const root = FSharpList_get_Empty();
  let node = root;
  const action = xs => {
    node = fold((acc, x) => {
      const t = new FSharpList(x, void 0);
      acc.tail = t;
      return t;
    }, node, xs);
  };
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(lists)) {
    const xs_3 = lists;
    xs_3.forEach(action);
  } else if (lists instanceof FSharpList) {
    iterate(action, lists);
  } else {
    const enumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.getEnumerator)(lists);
    try {
      while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
        action(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]());
      }
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.disposeSafe)(enumerator);
    }
  }
  const xs_6 = node;
  const t_2 = FSharpList_get_Empty();
  xs_6.tail = t_2;
  return FSharpList__get_Tail(root);
}
function scan(folder, state, xs) {
  let xs_4, t_2;
  const root = FSharpList_get_Empty();
  let node;
  const t = new FSharpList(state, void 0);
  root.tail = t;
  node = t;
  let acc = state;
  let xs_3 = xs;
  while (!FSharpList__get_IsEmpty(xs_3)) {
    acc = folder(acc, FSharpList__get_Head(xs_3));
    node = (xs_4 = node, (t_2 = new FSharpList(acc, void 0), (xs_4.tail = t_2, t_2)));
    xs_3 = FSharpList__get_Tail(xs_3);
  }
  const xs_6 = node;
  const t_4 = FSharpList_get_Empty();
  xs_6.tail = t_4;
  return FSharpList__get_Tail(root);
}
function scanBack(folder, xs, state) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.scanBack)(folder, toArray(xs), state));
}
function append(xs, ys) {
  return fold((acc, x) => FSharpList_Cons_305B8EAC(x, acc), ys, reverse(xs));
}
function collect(mapping, xs) {
  let xs_1, t;
  const root = FSharpList_get_Empty();
  let node = root;
  let ys = xs;
  while (!FSharpList__get_IsEmpty(ys)) {
    let zs = mapping(FSharpList__get_Head(ys));
    while (!FSharpList__get_IsEmpty(zs)) {
      node = (xs_1 = node, (t = new FSharpList(FSharpList__get_Head(zs), void 0), (xs_1.tail = t, t)));
      zs = FSharpList__get_Tail(zs);
    }
    ys = FSharpList__get_Tail(ys);
  }
  const xs_3 = node;
  const t_2 = FSharpList_get_Empty();
  xs_3.tail = t_2;
  return FSharpList__get_Tail(root);
}
function mapIndexed(mapping, xs) {
  const root = FSharpList_get_Empty();
  const node = foldIndexed((i, acc, x) => {
    const t = new FSharpList(mapping(i, x), void 0);
    acc.tail = t;
    return t;
  }, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function map(mapping, xs) {
  const root = FSharpList_get_Empty();
  const node = fold((acc, x) => {
    const t = new FSharpList(mapping(x), void 0);
    acc.tail = t;
    return t;
  }, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function indexed(xs) {
  return mapIndexed((i, x) => [i, x], xs);
}
function map2(mapping, xs, ys) {
  const root = FSharpList_get_Empty();
  const node = fold2((acc, x, y) => {
    const t = new FSharpList(mapping(x, y), void 0);
    acc.tail = t;
    return t;
  }, root, xs, ys);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function mapIndexed2(mapping, xs, ys) {
  const loop = (i_mut, acc_mut, xs_1_mut, ys_1_mut) => {
    let t;
    loop: while (true) {
      const i = i_mut,
        acc = acc_mut,
        xs_1 = xs_1_mut,
        ys_1 = ys_1_mut;
      if (FSharpList__get_IsEmpty(xs_1) ? true : FSharpList__get_IsEmpty(ys_1)) {
        return acc;
      } else {
        i_mut = i + 1;
        acc_mut = (t = new FSharpList(mapping(i, FSharpList__get_Head(xs_1), FSharpList__get_Head(ys_1)), void 0), (acc.tail = t, t));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        ys_1_mut = FSharpList__get_Tail(ys_1);
        continue loop;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node_1 = loop(0, root, xs, ys);
  const t_2 = FSharpList_get_Empty();
  node_1.tail = t_2;
  return FSharpList__get_Tail(root);
}
function map3(mapping, xs, ys, zs) {
  const loop = (acc_mut, xs_1_mut, ys_1_mut, zs_1_mut) => {
    let t;
    loop: while (true) {
      const acc = acc_mut,
        xs_1 = xs_1_mut,
        ys_1 = ys_1_mut,
        zs_1 = zs_1_mut;
      if ((FSharpList__get_IsEmpty(xs_1) ? true : FSharpList__get_IsEmpty(ys_1)) ? true : FSharpList__get_IsEmpty(zs_1)) {
        return acc;
      } else {
        acc_mut = (t = new FSharpList(mapping(FSharpList__get_Head(xs_1), FSharpList__get_Head(ys_1), FSharpList__get_Head(zs_1)), void 0), (acc.tail = t, t));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        ys_1_mut = FSharpList__get_Tail(ys_1);
        zs_1_mut = FSharpList__get_Tail(zs_1);
        continue loop;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node_1 = loop(root, xs, ys, zs);
  const t_2 = FSharpList_get_Empty();
  node_1.tail = t_2;
  return FSharpList__get_Tail(root);
}
function mapFold(mapping, state, xs) {
  const root = FSharpList_get_Empty();
  const patternInput_1 = fold((tupledArg, x) => {
    let t;
    const patternInput = mapping(tupledArg[1], x);
    return [(t = new FSharpList(patternInput[0], void 0), (tupledArg[0].tail = t, t)), patternInput[1]];
  }, [root, state], xs);
  const t_2 = FSharpList_get_Empty();
  patternInput_1[0].tail = t_2;
  return [FSharpList__get_Tail(root), patternInput_1[1]];
}
function mapFoldBack(mapping, xs, state) {
  return mapFold((acc, x) => mapping(x, acc), state, reverse(xs));
}
function tryPick(f, xs) {
  const loop = xs_1_mut => {
    loop: while (true) {
      const xs_1 = xs_1_mut;
      if (FSharpList__get_IsEmpty(xs_1)) {
        return void 0;
      } else {
        const matchValue = f(FSharpList__get_Head(xs_1));
        if (matchValue == null) {
          xs_1_mut = FSharpList__get_Tail(xs_1);
          continue loop;
        } else {
          return matchValue;
        }
      }
      break;
    }
  };
  return loop(xs);
}
function pick(f, xs) {
  const matchValue = tryPick(f, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
  }
}
function tryFind(f, xs) {
  return tryPick(x => f(x) ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(x) : void 0, xs);
}
function find(f, xs) {
  const matchValue = tryFind(f, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
  }
}
function tryFindBack(f, xs) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.tryFindBack)(f, toArray(xs));
}
function findBack(f, xs) {
  const matchValue = tryFindBack(f, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue);
  }
}
function tryFindIndex(f, xs) {
  const loop = (i_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        xs_1 = xs_1_mut;
      if (FSharpList__get_IsEmpty(xs_1)) {
        return void 0;
      } else if (f(FSharpList__get_Head(xs_1))) {
        return i;
      } else {
        i_mut = i + 1;
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  return loop(0, xs);
}
function findIndex(f, xs) {
  const matchValue = tryFindIndex(f, xs);
  if (matchValue == null) {
    indexNotFound();
    return -1;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue) | 0;
  }
}
function tryFindIndexBack(f, xs) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.tryFindIndexBack)(f, toArray(xs));
}
function findIndexBack(f, xs) {
  const matchValue = tryFindIndexBack(f, xs);
  if (matchValue == null) {
    indexNotFound();
    return -1;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue) | 0;
  }
}
function tryItem(n, xs) {
  const loop = (i_mut, xs_1_mut) => {
    loop: while (true) {
      const i = i_mut,
        xs_1 = xs_1_mut;
      if (FSharpList__get_IsEmpty(xs_1)) {
        return void 0;
      } else if (i === n) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(FSharpList__get_Head(xs_1));
      } else {
        i_mut = i + 1;
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  return loop(0, xs);
}
function item(n, xs) {
  return FSharpList__get_Item_Z524259A4(xs, n);
}
function filter(f, xs) {
  const root = FSharpList_get_Empty();
  const node = fold((acc, x) => {
    if (f(x)) {
      const t = new FSharpList(x, void 0);
      acc.tail = t;
      return t;
    } else {
      return acc;
    }
  }, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function partition(f, xs) {
  const matchValue = FSharpList_get_Empty();
  const root2 = FSharpList_get_Empty();
  const root1 = matchValue;
  const patternInput_1 = fold((tupledArg, x) => {
    let t, t_2;
    const lacc = tupledArg[0];
    const racc = tupledArg[1];
    if (f(x)) {
      return [(t = new FSharpList(x, void 0), (lacc.tail = t, t)), racc];
    } else {
      return [lacc, (t_2 = new FSharpList(x, void 0), (racc.tail = t_2, t_2))];
    }
  }, [root1, root2], xs);
  const t_4 = FSharpList_get_Empty();
  patternInput_1[0].tail = t_4;
  const t_5 = FSharpList_get_Empty();
  patternInput_1[1].tail = t_5;
  return [FSharpList__get_Tail(root1), FSharpList__get_Tail(root2)];
}
function choose(f, xs) {
  const root = FSharpList_get_Empty();
  const node = fold((acc, x) => {
    const matchValue = f(x);
    if (matchValue == null) {
      return acc;
    } else {
      const t = new FSharpList((0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.value)(matchValue), void 0);
      acc.tail = t;
      return t;
    }
  }, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function contains(value, xs, eq) {
  return tryFindIndex(v => eq.Equals(value, v), xs) != null;
}
function initialize(n, f) {
  let xs, t;
  const root = FSharpList_get_Empty();
  let node = root;
  for (let i = 0; i <= n - 1; i++) {
    node = (xs = node, (t = new FSharpList(f(i), void 0), (xs.tail = t, t)));
  }
  const xs_2 = node;
  const t_2 = FSharpList_get_Empty();
  xs_2.tail = t_2;
  return FSharpList__get_Tail(root);
}
function replicate(n, x) {
  return initialize(n, _arg => x);
}
function reduce(f, xs) {
  if (FSharpList__get_IsEmpty(xs)) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputWasEmpty);
  } else {
    return fold(f, head(xs), tail(xs));
  }
}
function reduceBack(f, xs) {
  if (FSharpList__get_IsEmpty(xs)) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputWasEmpty);
  } else {
    return foldBack(f, tail(xs), head(xs));
  }
}
function forAll(f, xs) {
  return fold((acc, x) => acc && f(x), true, xs);
}
function forAll2(f, xs, ys) {
  return fold2((acc, x, y) => acc && f(x, y), true, xs, ys);
}
function exists(f, xs) {
  return tryFindIndex(f, xs) != null;
}
function exists2(f_mut, xs_mut, ys_mut) {
  exists2: while (true) {
    const f = f_mut,
      xs = xs_mut,
      ys = ys_mut;
    const matchValue = FSharpList__get_IsEmpty(xs);
    const matchValue_1 = FSharpList__get_IsEmpty(ys);
    let matchResult;
    if (matchValue) {
      if (matchValue_1) {
        matchResult = 0;
      } else {
        matchResult = 2;
      }
    } else if (matchValue_1) {
      matchResult = 2;
    } else {
      matchResult = 1;
    }
    switch (matchResult) {
      case 0:
        return false;
      case 1:
        if (f(FSharpList__get_Head(xs), FSharpList__get_Head(ys))) {
          return true;
        } else {
          f_mut = f;
          xs_mut = FSharpList__get_Tail(xs);
          ys_mut = FSharpList__get_Tail(ys);
          continue exists2;
        }
      default:
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_differentLengths + "\\nParameter name: " + "list2");
    }
    break;
  }
}
function unzip(xs) {
  return foldBack((tupledArg, tupledArg_1) => [FSharpList_Cons_305B8EAC(tupledArg[0], tupledArg_1[0]), FSharpList_Cons_305B8EAC(tupledArg[1], tupledArg_1[1])], xs, [FSharpList_get_Empty(), FSharpList_get_Empty()]);
}
function unzip3(xs) {
  return foldBack((tupledArg, tupledArg_1) => [FSharpList_Cons_305B8EAC(tupledArg[0], tupledArg_1[0]), FSharpList_Cons_305B8EAC(tupledArg[1], tupledArg_1[1]), FSharpList_Cons_305B8EAC(tupledArg[2], tupledArg_1[2])], xs, [FSharpList_get_Empty(), FSharpList_get_Empty(), FSharpList_get_Empty()]);
}
function zip(xs, ys) {
  return map2((x, y) => [x, y], xs, ys);
}
function zip3(xs, ys, zs) {
  return map3((x, y, z) => [x, y, z], xs, ys, zs);
}
function sortWith(comparer, xs) {
  const arr = toArray(xs);
  arr.sort(comparer);
  return ofArray(arr);
}
function sort(xs, comparer) {
  return sortWith((x, y) => comparer.Compare(x, y), xs);
}
function sortBy(projection, xs, comparer) {
  return sortWith((x, y) => comparer.Compare(projection(x), projection(y)), xs);
}
function sortDescending(xs, comparer) {
  return sortWith((x, y) => comparer.Compare(x, y) * -1, xs);
}
function sortByDescending(projection, xs, comparer) {
  return sortWith((x, y) => comparer.Compare(projection(x), projection(y)) * -1, xs);
}
function sum(xs, adder) {
  return fold((acc, x) => adder.Add(acc, x), adder.GetZero(), xs);
}
function sumBy(f, xs, adder) {
  return fold((acc, x) => adder.Add(acc, f(x)), adder.GetZero(), xs);
}
function maxBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? y : x, xs);
}
function max(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? y : x, xs);
}
function minBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? x : y, xs);
}
function min(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? x : y, xs);
}
function average(xs, averager) {
  let count = 0;
  const total = fold((acc, x) => {
    count = count + 1 | 0;
    return averager.Add(acc, x);
  }, averager.GetZero(), xs);
  return averager.DivideByInt(total, count);
}
function averageBy(f, xs, averager) {
  let count = 0;
  const total = fold((acc, x) => {
    count = count + 1 | 0;
    return averager.Add(acc, f(x));
  }, averager.GetZero(), xs);
  return averager.DivideByInt(total, count);
}
function permute(f, xs) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.permute)(f, toArray(xs)));
}
function chunkBySize(chunkSize, xs) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(ofArray, (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.chunkBySize)(chunkSize, toArray(xs))));
}
function allPairs(xs, ys) {
  const root = FSharpList_get_Empty();
  let node = root;
  iterate(x => {
    iterate(y => {
      let xs_1, t;
      node = (xs_1 = node, (t = new FSharpList([x, y], void 0), (xs_1.tail = t, t)));
    }, ys);
  }, xs);
  const xs_3 = node;
  const t_2 = FSharpList_get_Empty();
  xs_3.tail = t_2;
  return FSharpList__get_Tail(root);
}
function skip(count_mut, xs_mut) {
  skip: while (true) {
    const count = count_mut,
      xs = xs_mut;
    if (count <= 0) {
      return xs;
    } else if (FSharpList__get_IsEmpty(xs)) {
      throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_notEnoughElements + "\\nParameter name: " + "list");
    } else {
      count_mut = count - 1;
      xs_mut = FSharpList__get_Tail(xs);
      continue skip;
    }
    break;
  }
}
function skipWhile(predicate_mut, xs_mut) {
  skipWhile: while (true) {
    const predicate = predicate_mut,
      xs = xs_mut;
    if (FSharpList__get_IsEmpty(xs)) {
      return xs;
    } else if (!predicate(FSharpList__get_Head(xs))) {
      return xs;
    } else {
      predicate_mut = predicate;
      xs_mut = FSharpList__get_Tail(xs);
      continue skipWhile;
    }
    break;
  }
}
function take(count, xs) {
  if (count < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputMustBeNonNegative + "\\nParameter name: " + "count");
  }
  const loop = (i_mut, acc_mut, xs_1_mut) => {
    let t;
    loop: while (true) {
      const i = i_mut,
        acc = acc_mut,
        xs_1 = xs_1_mut;
      if (i <= 0) {
        return acc;
      } else if (FSharpList__get_IsEmpty(xs_1)) {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_notEnoughElements + "\\nParameter name: " + "list");
      } else {
        i_mut = i - 1;
        acc_mut = (t = new FSharpList(FSharpList__get_Head(xs_1), void 0), (acc.tail = t, t));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node = loop(count, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function takeWhile(predicate, xs) {
  const loop = (acc_mut, xs_1_mut) => {
    let t;
    loop: while (true) {
      const acc = acc_mut,
        xs_1 = xs_1_mut;
      if (FSharpList__get_IsEmpty(xs_1)) {
        return acc;
      } else if (!predicate(FSharpList__get_Head(xs_1))) {
        return acc;
      } else {
        acc_mut = (t = new FSharpList(FSharpList__get_Head(xs_1), void 0), (acc.tail = t, t));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node = loop(root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function truncate(count, xs) {
  const loop = (i_mut, acc_mut, xs_1_mut) => {
    let t;
    loop: while (true) {
      const i = i_mut,
        acc = acc_mut,
        xs_1 = xs_1_mut;
      if (i <= 0) {
        return acc;
      } else if (FSharpList__get_IsEmpty(xs_1)) {
        return acc;
      } else {
        i_mut = i - 1;
        acc_mut = (t = new FSharpList(FSharpList__get_Head(xs_1), void 0), (acc.tail = t, t));
        xs_1_mut = FSharpList__get_Tail(xs_1);
        continue loop;
      }
      break;
    }
  };
  const root = FSharpList_get_Empty();
  const node = loop(count, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function getSlice(startIndex, endIndex, xs) {
  const len = length(xs) | 0;
  let startIndex_1;
  const index = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.defaultArg)(startIndex, 0) | 0;
  startIndex_1 = index < 0 ? 0 : index;
  let endIndex_1;
  const index_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.defaultArg)(endIndex, len - 1) | 0;
  endIndex_1 = index_1 >= len ? len - 1 : index_1;
  if (endIndex_1 < startIndex_1) {
    return FSharpList_get_Empty();
  } else {
    return take(endIndex_1 - startIndex_1 + 1, skip(startIndex_1, xs));
  }
}
function splitAt(index, xs) {
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputMustBeNonNegative + "\\nParameter name: " + "index");
  }
  if (index > FSharpList__get_Length(xs)) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_notEnoughElements + "\\nParameter name: " + "index");
  }
  return [take(index, xs), skip(index, xs)];
}
function exactlyOne(xs) {
  if (FSharpList__get_IsEmpty(xs)) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputSequenceEmpty + "\\nParameter name: " + "list");
  } else if (FSharpList__get_IsEmpty(FSharpList__get_Tail(xs))) {
    return FSharpList__get_Head(xs);
  } else {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_inputSequenceTooLong + "\\nParameter name: " + "list");
  }
}
function tryExactlyOne(xs) {
  if (!FSharpList__get_IsEmpty(xs) && FSharpList__get_IsEmpty(FSharpList__get_Tail(xs))) {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_2__.some)(FSharpList__get_Head(xs));
  } else {
    return void 0;
  }
}
function where(predicate, xs) {
  return filter(predicate, xs);
}
function pairwise(xs) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.pairwise)(toArray(xs)));
}
function windowed(windowSize, xs) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(ofArray, (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.windowed)(windowSize, toArray(xs))));
}
function splitInto(chunks, xs) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(ofArray, (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.splitInto)(chunks, toArray(xs))));
}
function transpose(lists) {
  return ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(ofArray, (0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.transpose)((0,_Array_js__WEBPACK_IMPORTED_MODULE_6__.map)(toArray, Array.from(lists)))));
}
function insertAt(index, y, xs) {
  let i = -1;
  let isDone = false;
  const result = fold((acc, x) => {
    i = i + 1 | 0;
    if (i === index) {
      isDone = true;
      return FSharpList_Cons_305B8EAC(x, FSharpList_Cons_305B8EAC(y, acc));
    } else {
      return FSharpList_Cons_305B8EAC(x, acc);
    }
  }, FSharpList_get_Empty(), xs);
  return reverse(isDone ? result : i + 1 === index ? FSharpList_Cons_305B8EAC(y, result) : (() => {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  })());
}
function insertManyAt(index, ys, xs) {
  let i = -1;
  let isDone = false;
  const ys_1 = ofSeq(ys);
  const result = fold((acc, x) => {
    i = i + 1 | 0;
    if (i === index) {
      isDone = true;
      return FSharpList_Cons_305B8EAC(x, append(ys_1, acc));
    } else {
      return FSharpList_Cons_305B8EAC(x, acc);
    }
  }, FSharpList_get_Empty(), xs);
  return reverse(isDone ? result : i + 1 === index ? append(ys_1, result) : (() => {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  })());
}
function removeAt(index, xs) {
  let i = -1;
  let isDone = false;
  const ys = filter(_arg => {
    i = i + 1 | 0;
    if (i === index) {
      isDone = true;
      return false;
    } else {
      return true;
    }
  }, xs);
  if (!isDone) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return ys;
}
function removeManyAt(index, count, xs) {
  let i = -1;
  let status = -1;
  const ys = filter(_arg => {
    i = i + 1 | 0;
    if (i === index) {
      status = 0;
      return false;
    } else if (i > index) {
      if (i < index + count) {
        return false;
      } else {
        status = 1;
        return true;
      }
    } else {
      return true;
    }
  }, xs);
  const status_1 = (status === 0 && i + 1 === index + count ? 1 : status) | 0;
  if (status_1 < 1) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + (status_1 < 0 ? "index" : "count"));
  }
  return ys;
}
function updateAt(index, y, xs) {
  let isDone = false;
  const ys = mapIndexed((i, x) => {
    if (i === index) {
      isDone = true;
      return y;
    } else {
      return x;
    }
  }, xs);
  if (!isDone) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_5__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return ys;
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Map.js":
/*!***************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FSharpMap": () => (/* binding */ FSharpMap),
/* harmony export */   "FSharpMap_$ctor": () => (/* binding */ FSharpMap_$ctor),
/* harmony export */   "FSharpMap_$reflection": () => (/* binding */ FSharpMap_$reflection),
/* harmony export */   "FSharpMap_Empty": () => (/* binding */ FSharpMap_Empty),
/* harmony export */   "FSharpMap__Add": () => (/* binding */ FSharpMap__Add),
/* harmony export */   "FSharpMap__Change": () => (/* binding */ FSharpMap__Change),
/* harmony export */   "FSharpMap__ComputeHashCode": () => (/* binding */ FSharpMap__ComputeHashCode),
/* harmony export */   "FSharpMap__ContainsKey": () => (/* binding */ FSharpMap__ContainsKey),
/* harmony export */   "FSharpMap__Exists": () => (/* binding */ FSharpMap__Exists),
/* harmony export */   "FSharpMap__Filter": () => (/* binding */ FSharpMap__Filter),
/* harmony export */   "FSharpMap__Fold": () => (/* binding */ FSharpMap__Fold),
/* harmony export */   "FSharpMap__FoldSection": () => (/* binding */ FSharpMap__FoldSection),
/* harmony export */   "FSharpMap__ForAll": () => (/* binding */ FSharpMap__ForAll),
/* harmony export */   "FSharpMap__Iterate": () => (/* binding */ FSharpMap__Iterate),
/* harmony export */   "FSharpMap__Map": () => (/* binding */ FSharpMap__Map),
/* harmony export */   "FSharpMap__MapRange": () => (/* binding */ FSharpMap__MapRange),
/* harmony export */   "FSharpMap__Partition": () => (/* binding */ FSharpMap__Partition),
/* harmony export */   "FSharpMap__Remove": () => (/* binding */ FSharpMap__Remove),
/* harmony export */   "FSharpMap__ToArray": () => (/* binding */ FSharpMap__ToArray),
/* harmony export */   "FSharpMap__ToList": () => (/* binding */ FSharpMap__ToList),
/* harmony export */   "FSharpMap__TryFind": () => (/* binding */ FSharpMap__TryFind),
/* harmony export */   "FSharpMap__TryGetValue": () => (/* binding */ FSharpMap__TryGetValue),
/* harmony export */   "FSharpMap__TryPick": () => (/* binding */ FSharpMap__TryPick),
/* harmony export */   "FSharpMap__get_Comparer": () => (/* binding */ FSharpMap__get_Comparer),
/* harmony export */   "FSharpMap__get_Count": () => (/* binding */ FSharpMap__get_Count),
/* harmony export */   "FSharpMap__get_IsEmpty": () => (/* binding */ FSharpMap__get_IsEmpty),
/* harmony export */   "FSharpMap__get_Item": () => (/* binding */ FSharpMap__get_Item),
/* harmony export */   "FSharpMap__get_Keys": () => (/* binding */ FSharpMap__get_Keys),
/* harmony export */   "FSharpMap__get_MaxKeyValue": () => (/* binding */ FSharpMap__get_MaxKeyValue),
/* harmony export */   "FSharpMap__get_MinKeyValue": () => (/* binding */ FSharpMap__get_MinKeyValue),
/* harmony export */   "FSharpMap__get_Tree": () => (/* binding */ FSharpMap__get_Tree),
/* harmony export */   "FSharpMap__get_Values": () => (/* binding */ FSharpMap__get_Values),
/* harmony export */   "MapTreeLeaf$2": () => (/* binding */ MapTreeLeaf$2),
/* harmony export */   "MapTreeLeaf$2_$ctor_5BDDA1": () => (/* binding */ MapTreeLeaf$2_$ctor_5BDDA1),
/* harmony export */   "MapTreeLeaf$2_$reflection": () => (/* binding */ MapTreeLeaf$2_$reflection),
/* harmony export */   "MapTreeLeaf$2__get_Key": () => (/* binding */ MapTreeLeaf$2__get_Key),
/* harmony export */   "MapTreeLeaf$2__get_Value": () => (/* binding */ MapTreeLeaf$2__get_Value),
/* harmony export */   "MapTreeModule_MapIterator$2": () => (/* binding */ MapTreeModule_MapIterator$2),
/* harmony export */   "MapTreeModule_MapIterator$2_$reflection": () => (/* binding */ MapTreeModule_MapIterator$2_$reflection),
/* harmony export */   "MapTreeModule_add": () => (/* binding */ MapTreeModule_add),
/* harmony export */   "MapTreeModule_alreadyFinished": () => (/* binding */ MapTreeModule_alreadyFinished),
/* harmony export */   "MapTreeModule_change": () => (/* binding */ MapTreeModule_change),
/* harmony export */   "MapTreeModule_collapseLHS": () => (/* binding */ MapTreeModule_collapseLHS),
/* harmony export */   "MapTreeModule_copyToArray": () => (/* binding */ MapTreeModule_copyToArray),
/* harmony export */   "MapTreeModule_current": () => (/* binding */ MapTreeModule_current),
/* harmony export */   "MapTreeModule_empty": () => (/* binding */ MapTreeModule_empty),
/* harmony export */   "MapTreeModule_exists": () => (/* binding */ MapTreeModule_exists),
/* harmony export */   "MapTreeModule_existsOpt": () => (/* binding */ MapTreeModule_existsOpt),
/* harmony export */   "MapTreeModule_filter": () => (/* binding */ MapTreeModule_filter),
/* harmony export */   "MapTreeModule_filter1": () => (/* binding */ MapTreeModule_filter1),
/* harmony export */   "MapTreeModule_filterAux": () => (/* binding */ MapTreeModule_filterAux),
/* harmony export */   "MapTreeModule_find": () => (/* binding */ MapTreeModule_find),
/* harmony export */   "MapTreeModule_fold": () => (/* binding */ MapTreeModule_fold),
/* harmony export */   "MapTreeModule_foldBack": () => (/* binding */ MapTreeModule_foldBack),
/* harmony export */   "MapTreeModule_foldBackOpt": () => (/* binding */ MapTreeModule_foldBackOpt),
/* harmony export */   "MapTreeModule_foldOpt": () => (/* binding */ MapTreeModule_foldOpt),
/* harmony export */   "MapTreeModule_foldSection": () => (/* binding */ MapTreeModule_foldSection),
/* harmony export */   "MapTreeModule_foldSectionOpt": () => (/* binding */ MapTreeModule_foldSectionOpt),
/* harmony export */   "MapTreeModule_forall": () => (/* binding */ MapTreeModule_forall),
/* harmony export */   "MapTreeModule_forallOpt": () => (/* binding */ MapTreeModule_forallOpt),
/* harmony export */   "MapTreeModule_iter": () => (/* binding */ MapTreeModule_iter),
/* harmony export */   "MapTreeModule_iterOpt": () => (/* binding */ MapTreeModule_iterOpt),
/* harmony export */   "MapTreeModule_leftmost": () => (/* binding */ MapTreeModule_leftmost),
/* harmony export */   "MapTreeModule_map": () => (/* binding */ MapTreeModule_map),
/* harmony export */   "MapTreeModule_mapi": () => (/* binding */ MapTreeModule_mapi),
/* harmony export */   "MapTreeModule_mapiOpt": () => (/* binding */ MapTreeModule_mapiOpt),
/* harmony export */   "MapTreeModule_mem": () => (/* binding */ MapTreeModule_mem),
/* harmony export */   "MapTreeModule_mk": () => (/* binding */ MapTreeModule_mk),
/* harmony export */   "MapTreeModule_mkFromEnumerator": () => (/* binding */ MapTreeModule_mkFromEnumerator),
/* harmony export */   "MapTreeModule_mkIEnumerator": () => (/* binding */ MapTreeModule_mkIEnumerator),
/* harmony export */   "MapTreeModule_mkIterator": () => (/* binding */ MapTreeModule_mkIterator),
/* harmony export */   "MapTreeModule_moveNext": () => (/* binding */ MapTreeModule_moveNext),
/* harmony export */   "MapTreeModule_notStarted": () => (/* binding */ MapTreeModule_notStarted),
/* harmony export */   "MapTreeModule_ofArray": () => (/* binding */ MapTreeModule_ofArray),
/* harmony export */   "MapTreeModule_ofList": () => (/* binding */ MapTreeModule_ofList),
/* harmony export */   "MapTreeModule_ofSeq": () => (/* binding */ MapTreeModule_ofSeq),
/* harmony export */   "MapTreeModule_partition": () => (/* binding */ MapTreeModule_partition),
/* harmony export */   "MapTreeModule_partition1": () => (/* binding */ MapTreeModule_partition1),
/* harmony export */   "MapTreeModule_partitionAux": () => (/* binding */ MapTreeModule_partitionAux),
/* harmony export */   "MapTreeModule_rebalance": () => (/* binding */ MapTreeModule_rebalance),
/* harmony export */   "MapTreeModule_remove": () => (/* binding */ MapTreeModule_remove),
/* harmony export */   "MapTreeModule_rightmost": () => (/* binding */ MapTreeModule_rightmost),
/* harmony export */   "MapTreeModule_size": () => (/* binding */ MapTreeModule_size),
/* harmony export */   "MapTreeModule_sizeAux": () => (/* binding */ MapTreeModule_sizeAux),
/* harmony export */   "MapTreeModule_spliceOutSuccessor": () => (/* binding */ MapTreeModule_spliceOutSuccessor),
/* harmony export */   "MapTreeModule_toArray": () => (/* binding */ MapTreeModule_toArray),
/* harmony export */   "MapTreeModule_toList": () => (/* binding */ MapTreeModule_toList),
/* harmony export */   "MapTreeModule_toSeq": () => (/* binding */ MapTreeModule_toSeq),
/* harmony export */   "MapTreeModule_tryFind": () => (/* binding */ MapTreeModule_tryFind),
/* harmony export */   "MapTreeModule_tryPick": () => (/* binding */ MapTreeModule_tryPick),
/* harmony export */   "MapTreeModule_tryPickOpt": () => (/* binding */ MapTreeModule_tryPickOpt),
/* harmony export */   "MapTreeNode$2": () => (/* binding */ MapTreeNode$2),
/* harmony export */   "MapTreeNode$2_$ctor_Z39DE9543": () => (/* binding */ MapTreeNode$2_$ctor_Z39DE9543),
/* harmony export */   "MapTreeNode$2_$reflection": () => (/* binding */ MapTreeNode$2_$reflection),
/* harmony export */   "MapTreeNode$2__get_Height": () => (/* binding */ MapTreeNode$2__get_Height),
/* harmony export */   "MapTreeNode$2__get_Left": () => (/* binding */ MapTreeNode$2__get_Left),
/* harmony export */   "MapTreeNode$2__get_Right": () => (/* binding */ MapTreeNode$2__get_Right),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "change": () => (/* binding */ change),
/* harmony export */   "containsKey": () => (/* binding */ containsKey),
/* harmony export */   "count": () => (/* binding */ count),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findKey": () => (/* binding */ findKey),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "foldBack": () => (/* binding */ foldBack),
/* harmony export */   "forAll": () => (/* binding */ forAll),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "iterate": () => (/* binding */ iterate),
/* harmony export */   "keys": () => (/* binding */ keys),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "maxKeyValue": () => (/* binding */ maxKeyValue),
/* harmony export */   "minKeyValue": () => (/* binding */ minKeyValue),
/* harmony export */   "ofArray": () => (/* binding */ ofArray),
/* harmony export */   "ofList": () => (/* binding */ ofList),
/* harmony export */   "ofSeq": () => (/* binding */ ofSeq),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "pick": () => (/* binding */ pick),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "toList": () => (/* binding */ toList),
/* harmony export */   "toSeq": () => (/* binding */ toSeq),
/* harmony export */   "tryFind": () => (/* binding */ tryFind),
/* harmony export */   "tryFindKey": () => (/* binding */ tryFindKey),
/* harmony export */   "tryPick": () => (/* binding */ tryPick),
/* harmony export */   "values": () => (/* binding */ values)
/* harmony export */ });
/* harmony import */ var _Reflection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Reflection.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Reflection.js");
/* harmony import */ var _Option_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Option.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Option.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _List_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./List.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/List.js");
/* harmony import */ var _Array_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Array.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Array.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Types.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Types.js");
/* harmony import */ var _Seq_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Seq.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Seq.js");
/* harmony import */ var _String_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./String.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/String.js");








class MapTreeLeaf$2 {
  constructor(k, v) {
    this.k = k;
    this.v = v;
  }
}
function MapTreeLeaf$2_$reflection(gen0, gen1) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_0__.class_type)("Map.MapTreeLeaf`2", [gen0, gen1], MapTreeLeaf$2);
}
function MapTreeLeaf$2_$ctor_5BDDA1(k, v) {
  return new MapTreeLeaf$2(k, v);
}
function MapTreeLeaf$2__get_Key(_) {
  return _.k;
}
function MapTreeLeaf$2__get_Value(_) {
  return _.v;
}
class MapTreeNode$2 extends MapTreeLeaf$2 {
  constructor(k, v, left, right, h) {
    super(k, v);
    this.left = left;
    this.right = right;
    this.h = h | 0;
  }
}
function MapTreeNode$2_$reflection(gen0, gen1) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_0__.class_type)("Map.MapTreeNode`2", [gen0, gen1], MapTreeNode$2, MapTreeLeaf$2_$reflection(gen0, gen1));
}
function MapTreeNode$2_$ctor_Z39DE9543(k, v, left, right, h) {
  return new MapTreeNode$2(k, v, left, right, h);
}
function MapTreeNode$2__get_Left(_) {
  return _.left;
}
function MapTreeNode$2__get_Right(_) {
  return _.right;
}
function MapTreeNode$2__get_Height(_) {
  return _.h;
}
function MapTreeModule_empty() {
  return void 0;
}
function MapTreeModule_sizeAux(acc_mut, m_mut) {
  MapTreeModule_sizeAux: while (true) {
    const acc = acc_mut,
      m = m_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        acc_mut = MapTreeModule_sizeAux(acc + 1, MapTreeNode$2__get_Left(mn));
        m_mut = MapTreeNode$2__get_Right(mn);
        continue MapTreeModule_sizeAux;
      } else {
        return acc + 1 | 0;
      }
    } else {
      return acc | 0;
    }
    break;
  }
}
function MapTreeModule_size(x) {
  return MapTreeModule_sizeAux(0, x);
}
function MapTreeModule_mk(l, k, v, r) {
  let mn, mn_1;
  let hl;
  const m = l;
  if (m != null) {
    const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
    hl = m2 instanceof MapTreeNode$2 ? (mn = m2, MapTreeNode$2__get_Height(mn)) : 1;
  } else {
    hl = 0;
  }
  let hr;
  const m_1 = r;
  if (m_1 != null) {
    const m2_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m_1);
    hr = m2_1 instanceof MapTreeNode$2 ? (mn_1 = m2_1, MapTreeNode$2__get_Height(mn_1)) : 1;
  } else {
    hr = 0;
  }
  const m_2 = (hl < hr ? hr : hl) | 0;
  if (m_2 === 0) {
    return MapTreeLeaf$2_$ctor_5BDDA1(k, v);
  } else {
    return MapTreeNode$2_$ctor_Z39DE9543(k, v, l, r, m_2 + 1);
  }
}
function MapTreeModule_rebalance(t1, k, v, t2) {
  let mn, mn_1, m_2, m2_2, mn_2, m_3, m2_3, mn_3;
  let t1h;
  const m = t1;
  if (m != null) {
    const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
    t1h = m2 instanceof MapTreeNode$2 ? (mn = m2, MapTreeNode$2__get_Height(mn)) : 1;
  } else {
    t1h = 0;
  }
  let t2h;
  const m_1 = t2;
  if (m_1 != null) {
    const m2_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m_1);
    t2h = m2_1 instanceof MapTreeNode$2 ? (mn_1 = m2_1, MapTreeNode$2__get_Height(mn_1)) : 1;
  } else {
    t2h = 0;
  }
  if (t2h > t1h + 2) {
    const matchValue = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(t2);
    if (matchValue instanceof MapTreeNode$2) {
      const t2$0027 = matchValue;
      if ((m_2 = MapTreeNode$2__get_Left(t2$0027), m_2 != null ? (m2_2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m_2), m2_2 instanceof MapTreeNode$2 ? (mn_2 = m2_2, MapTreeNode$2__get_Height(mn_2)) : 1) : 0) > t1h + 1) {
        const matchValue_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(MapTreeNode$2__get_Left(t2$0027));
        if (matchValue_1 instanceof MapTreeNode$2) {
          const t2l = matchValue_1;
          return MapTreeModule_mk(MapTreeModule_mk(t1, k, v, MapTreeNode$2__get_Left(t2l)), MapTreeLeaf$2__get_Key(t2l), MapTreeLeaf$2__get_Value(t2l), MapTreeModule_mk(MapTreeNode$2__get_Right(t2l), MapTreeLeaf$2__get_Key(t2$0027), MapTreeLeaf$2__get_Value(t2$0027), MapTreeNode$2__get_Right(t2$0027)));
        } else {
          throw new Error("internal error: Map.rebalance");
        }
      } else {
        return MapTreeModule_mk(MapTreeModule_mk(t1, k, v, MapTreeNode$2__get_Left(t2$0027)), MapTreeLeaf$2__get_Key(t2$0027), MapTreeLeaf$2__get_Value(t2$0027), MapTreeNode$2__get_Right(t2$0027));
      }
    } else {
      throw new Error("internal error: Map.rebalance");
    }
  } else if (t1h > t2h + 2) {
    const matchValue_2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(t1);
    if (matchValue_2 instanceof MapTreeNode$2) {
      const t1$0027 = matchValue_2;
      if ((m_3 = MapTreeNode$2__get_Right(t1$0027), m_3 != null ? (m2_3 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m_3), m2_3 instanceof MapTreeNode$2 ? (mn_3 = m2_3, MapTreeNode$2__get_Height(mn_3)) : 1) : 0) > t2h + 1) {
        const matchValue_3 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(MapTreeNode$2__get_Right(t1$0027));
        if (matchValue_3 instanceof MapTreeNode$2) {
          const t1r = matchValue_3;
          return MapTreeModule_mk(MapTreeModule_mk(MapTreeNode$2__get_Left(t1$0027), MapTreeLeaf$2__get_Key(t1$0027), MapTreeLeaf$2__get_Value(t1$0027), MapTreeNode$2__get_Left(t1r)), MapTreeLeaf$2__get_Key(t1r), MapTreeLeaf$2__get_Value(t1r), MapTreeModule_mk(MapTreeNode$2__get_Right(t1r), k, v, t2));
        } else {
          throw new Error("internal error: Map.rebalance");
        }
      } else {
        return MapTreeModule_mk(MapTreeNode$2__get_Left(t1$0027), MapTreeLeaf$2__get_Key(t1$0027), MapTreeLeaf$2__get_Value(t1$0027), MapTreeModule_mk(MapTreeNode$2__get_Right(t1$0027), k, v, t2));
      }
    } else {
      throw new Error("internal error: Map.rebalance");
    }
  } else {
    return MapTreeModule_mk(t1, k, v, t2);
  }
}
function MapTreeModule_add(comparer, k, v, m) {
  if (m != null) {
    const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
    const c = comparer.Compare(k, MapTreeLeaf$2__get_Key(m2)) | 0;
    if (m2 instanceof MapTreeNode$2) {
      const mn = m2;
      if (c < 0) {
        return MapTreeModule_rebalance(MapTreeModule_add(comparer, k, v, MapTreeNode$2__get_Left(mn)), MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), MapTreeNode$2__get_Right(mn));
      } else if (c === 0) {
        return MapTreeNode$2_$ctor_Z39DE9543(k, v, MapTreeNode$2__get_Left(mn), MapTreeNode$2__get_Right(mn), MapTreeNode$2__get_Height(mn));
      } else {
        return MapTreeModule_rebalance(MapTreeNode$2__get_Left(mn), MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), MapTreeModule_add(comparer, k, v, MapTreeNode$2__get_Right(mn)));
      }
    } else if (c < 0) {
      return MapTreeNode$2_$ctor_Z39DE9543(k, v, MapTreeModule_empty(), m, 2);
    } else if (c === 0) {
      return MapTreeLeaf$2_$ctor_5BDDA1(k, v);
    } else {
      return MapTreeNode$2_$ctor_Z39DE9543(k, v, m, MapTreeModule_empty(), 2);
    }
  } else {
    return MapTreeLeaf$2_$ctor_5BDDA1(k, v);
  }
}
function MapTreeModule_tryFind(comparer_mut, k_mut, m_mut) {
  MapTreeModule_tryFind: while (true) {
    const comparer = comparer_mut,
      k = k_mut,
      m = m_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      const c = comparer.Compare(k, MapTreeLeaf$2__get_Key(m2)) | 0;
      if (c === 0) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(MapTreeLeaf$2__get_Value(m2));
      } else if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        comparer_mut = comparer;
        k_mut = k;
        m_mut = c < 0 ? MapTreeNode$2__get_Left(mn) : MapTreeNode$2__get_Right(mn);
        continue MapTreeModule_tryFind;
      } else {
        return void 0;
      }
    } else {
      return void 0;
    }
    break;
  }
}
function MapTreeModule_find(comparer, k, m) {
  const matchValue = MapTreeModule_tryFind(comparer, k, m);
  if (matchValue == null) {
    throw new Error();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue);
  }
}
function MapTreeModule_partition1(comparer, f, k, v, acc1, acc2) {
  if (f(k, v)) {
    return [MapTreeModule_add(comparer, k, v, acc1), acc2];
  } else {
    return [acc1, MapTreeModule_add(comparer, k, v, acc2)];
  }
}
function MapTreeModule_partitionAux(comparer_mut, f_mut, m_mut, acc__mut, acc__1_mut) {
  MapTreeModule_partitionAux: while (true) {
    const comparer = comparer_mut,
      f = f_mut,
      m = m_mut,
      acc_ = acc__mut,
      acc__1 = acc__1_mut;
    const acc = [acc_, acc__1];
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        const acc_1 = MapTreeModule_partitionAux(comparer, f, MapTreeNode$2__get_Right(mn), acc[0], acc[1]);
        const acc_4 = MapTreeModule_partition1(comparer, f, MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), acc_1[0], acc_1[1]);
        comparer_mut = comparer;
        f_mut = f;
        m_mut = MapTreeNode$2__get_Left(mn);
        acc__mut = acc_4[0];
        acc__1_mut = acc_4[1];
        continue MapTreeModule_partitionAux;
      } else {
        return MapTreeModule_partition1(comparer, f, MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2), acc[0], acc[1]);
      }
    } else {
      return acc;
    }
    break;
  }
}
function MapTreeModule_partition(comparer, f, m) {
  return MapTreeModule_partitionAux(comparer, f, m, MapTreeModule_empty(), MapTreeModule_empty());
}
function MapTreeModule_filter1(comparer, f, k, v, acc) {
  if (f(k, v)) {
    return MapTreeModule_add(comparer, k, v, acc);
  } else {
    return acc;
  }
}
function MapTreeModule_filterAux(comparer_mut, f_mut, m_mut, acc_mut) {
  MapTreeModule_filterAux: while (true) {
    const comparer = comparer_mut,
      f = f_mut,
      m = m_mut,
      acc = acc_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        const acc_1 = MapTreeModule_filterAux(comparer, f, MapTreeNode$2__get_Left(mn), acc);
        const acc_2 = MapTreeModule_filter1(comparer, f, MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), acc_1);
        comparer_mut = comparer;
        f_mut = f;
        m_mut = MapTreeNode$2__get_Right(mn);
        acc_mut = acc_2;
        continue MapTreeModule_filterAux;
      } else {
        return MapTreeModule_filter1(comparer, f, MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2), acc);
      }
    } else {
      return acc;
    }
    break;
  }
}
function MapTreeModule_filter(comparer, f, m) {
  return MapTreeModule_filterAux(comparer, f, m, MapTreeModule_empty());
}
function MapTreeModule_spliceOutSuccessor(m) {
  if (m != null) {
    const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
    if (m2 instanceof MapTreeNode$2) {
      const mn = m2;
      if (MapTreeNode$2__get_Left(mn) == null) {
        return [MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), MapTreeNode$2__get_Right(mn)];
      } else {
        const patternInput = MapTreeModule_spliceOutSuccessor(MapTreeNode$2__get_Left(mn));
        return [patternInput[0], patternInput[1], MapTreeModule_mk(patternInput[2], MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), MapTreeNode$2__get_Right(mn))];
      }
    } else {
      return [MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2), MapTreeModule_empty()];
    }
  } else {
    throw new Error("internal error: Map.spliceOutSuccessor");
  }
}
function MapTreeModule_remove(comparer, k, m) {
  if (m != null) {
    const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
    const c = comparer.Compare(k, MapTreeLeaf$2__get_Key(m2)) | 0;
    if (m2 instanceof MapTreeNode$2) {
      const mn = m2;
      if (c < 0) {
        return MapTreeModule_rebalance(MapTreeModule_remove(comparer, k, MapTreeNode$2__get_Left(mn)), MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), MapTreeNode$2__get_Right(mn));
      } else if (c === 0) {
        if (MapTreeNode$2__get_Left(mn) == null) {
          return MapTreeNode$2__get_Right(mn);
        } else if (MapTreeNode$2__get_Right(mn) == null) {
          return MapTreeNode$2__get_Left(mn);
        } else {
          const patternInput = MapTreeModule_spliceOutSuccessor(MapTreeNode$2__get_Right(mn));
          return MapTreeModule_mk(MapTreeNode$2__get_Left(mn), patternInput[0], patternInput[1], patternInput[2]);
        }
      } else {
        return MapTreeModule_rebalance(MapTreeNode$2__get_Left(mn), MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), MapTreeModule_remove(comparer, k, MapTreeNode$2__get_Right(mn)));
      }
    } else if (c === 0) {
      return MapTreeModule_empty();
    } else {
      return m;
    }
  } else {
    return MapTreeModule_empty();
  }
}
function MapTreeModule_change(comparer, k, u, m) {
  if (m != null) {
    const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
    if (m2 instanceof MapTreeNode$2) {
      const mn = m2;
      const c = comparer.Compare(k, MapTreeLeaf$2__get_Key(mn)) | 0;
      if (c < 0) {
        return MapTreeModule_rebalance(MapTreeModule_change(comparer, k, u, MapTreeNode$2__get_Left(mn)), MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), MapTreeNode$2__get_Right(mn));
      } else if (c === 0) {
        const matchValue_1 = u((0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(MapTreeLeaf$2__get_Value(mn)));
        if (matchValue_1 != null) {
          return MapTreeNode$2_$ctor_Z39DE9543(k, (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue_1), MapTreeNode$2__get_Left(mn), MapTreeNode$2__get_Right(mn), MapTreeNode$2__get_Height(mn));
        } else if (MapTreeNode$2__get_Left(mn) == null) {
          return MapTreeNode$2__get_Right(mn);
        } else if (MapTreeNode$2__get_Right(mn) == null) {
          return MapTreeNode$2__get_Left(mn);
        } else {
          const patternInput = MapTreeModule_spliceOutSuccessor(MapTreeNode$2__get_Right(mn));
          return MapTreeModule_mk(MapTreeNode$2__get_Left(mn), patternInput[0], patternInput[1], patternInput[2]);
        }
      } else {
        return MapTreeModule_rebalance(MapTreeNode$2__get_Left(mn), MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), MapTreeModule_change(comparer, k, u, MapTreeNode$2__get_Right(mn)));
      }
    } else {
      const c_1 = comparer.Compare(k, MapTreeLeaf$2__get_Key(m2)) | 0;
      if (c_1 < 0) {
        const matchValue_2 = u(void 0);
        if (matchValue_2 != null) {
          return MapTreeNode$2_$ctor_Z39DE9543(k, (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue_2), MapTreeModule_empty(), m, 2);
        } else {
          return m;
        }
      } else if (c_1 === 0) {
        const matchValue_3 = u((0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(MapTreeLeaf$2__get_Value(m2)));
        if (matchValue_3 != null) {
          return MapTreeLeaf$2_$ctor_5BDDA1(k, (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue_3));
        } else {
          return MapTreeModule_empty();
        }
      } else {
        const matchValue_4 = u(void 0);
        if (matchValue_4 != null) {
          return MapTreeNode$2_$ctor_Z39DE9543(k, (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue_4), m, MapTreeModule_empty(), 2);
        } else {
          return m;
        }
      }
    }
  } else {
    const matchValue = u(void 0);
    if (matchValue != null) {
      return MapTreeLeaf$2_$ctor_5BDDA1(k, (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue));
    } else {
      return m;
    }
  }
}
function MapTreeModule_mem(comparer_mut, k_mut, m_mut) {
  MapTreeModule_mem: while (true) {
    const comparer = comparer_mut,
      k = k_mut,
      m = m_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      const c = comparer.Compare(k, MapTreeLeaf$2__get_Key(m2)) | 0;
      if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        if (c < 0) {
          comparer_mut = comparer;
          k_mut = k;
          m_mut = MapTreeNode$2__get_Left(mn);
          continue MapTreeModule_mem;
        } else if (c === 0) {
          return true;
        } else {
          comparer_mut = comparer;
          k_mut = k;
          m_mut = MapTreeNode$2__get_Right(mn);
          continue MapTreeModule_mem;
        }
      } else {
        return c === 0;
      }
    } else {
      return false;
    }
    break;
  }
}
function MapTreeModule_iterOpt(f_mut, m_mut) {
  MapTreeModule_iterOpt: while (true) {
    const f = f_mut,
      m = m_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        MapTreeModule_iterOpt(f, MapTreeNode$2__get_Left(mn));
        f(MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn));
        f_mut = f;
        m_mut = MapTreeNode$2__get_Right(mn);
        continue MapTreeModule_iterOpt;
      } else {
        f(MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2));
      }
    }
    break;
  }
}
function MapTreeModule_iter(f, m) {
  MapTreeModule_iterOpt(f, m);
}
function MapTreeModule_tryPickOpt(f_mut, m_mut) {
  MapTreeModule_tryPickOpt: while (true) {
    const f = f_mut,
      m = m_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        const matchValue = MapTreeModule_tryPickOpt(f, MapTreeNode$2__get_Left(mn));
        if (matchValue == null) {
          const matchValue_1 = f(MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn));
          if (matchValue_1 == null) {
            f_mut = f;
            m_mut = MapTreeNode$2__get_Right(mn);
            continue MapTreeModule_tryPickOpt;
          } else {
            return matchValue_1;
          }
        } else {
          return matchValue;
        }
      } else {
        return f(MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2));
      }
    } else {
      return void 0;
    }
    break;
  }
}
function MapTreeModule_tryPick(f, m) {
  return MapTreeModule_tryPickOpt(f, m);
}
function MapTreeModule_existsOpt(f_mut, m_mut) {
  MapTreeModule_existsOpt: while (true) {
    const f = f_mut,
      m = m_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        if (MapTreeModule_existsOpt(f, MapTreeNode$2__get_Left(mn)) ? true : f(MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn))) {
          return true;
        } else {
          f_mut = f;
          m_mut = MapTreeNode$2__get_Right(mn);
          continue MapTreeModule_existsOpt;
        }
      } else {
        return f(MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2));
      }
    } else {
      return false;
    }
    break;
  }
}
function MapTreeModule_exists(f, m) {
  return MapTreeModule_existsOpt(f, m);
}
function MapTreeModule_forallOpt(f_mut, m_mut) {
  MapTreeModule_forallOpt: while (true) {
    const f = f_mut,
      m = m_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        if (MapTreeModule_forallOpt(f, MapTreeNode$2__get_Left(mn)) && f(MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn))) {
          f_mut = f;
          m_mut = MapTreeNode$2__get_Right(mn);
          continue MapTreeModule_forallOpt;
        } else {
          return false;
        }
      } else {
        return f(MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2));
      }
    } else {
      return true;
    }
    break;
  }
}
function MapTreeModule_forall(f, m) {
  return MapTreeModule_forallOpt(f, m);
}
function MapTreeModule_map(f, m) {
  if (m != null) {
    const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
    if (m2 instanceof MapTreeNode$2) {
      const mn = m2;
      const l2 = MapTreeModule_map(f, MapTreeNode$2__get_Left(mn));
      const v2 = f(MapTreeLeaf$2__get_Value(mn));
      const r2 = MapTreeModule_map(f, MapTreeNode$2__get_Right(mn));
      return MapTreeNode$2_$ctor_Z39DE9543(MapTreeLeaf$2__get_Key(mn), v2, l2, r2, MapTreeNode$2__get_Height(mn));
    } else {
      return MapTreeLeaf$2_$ctor_5BDDA1(MapTreeLeaf$2__get_Key(m2), f(MapTreeLeaf$2__get_Value(m2)));
    }
  } else {
    return MapTreeModule_empty();
  }
}
function MapTreeModule_mapiOpt(f, m) {
  if (m != null) {
    const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
    if (m2 instanceof MapTreeNode$2) {
      const mn = m2;
      const l2 = MapTreeModule_mapiOpt(f, MapTreeNode$2__get_Left(mn));
      const v2 = f(MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn));
      const r2 = MapTreeModule_mapiOpt(f, MapTreeNode$2__get_Right(mn));
      return MapTreeNode$2_$ctor_Z39DE9543(MapTreeLeaf$2__get_Key(mn), v2, l2, r2, MapTreeNode$2__get_Height(mn));
    } else {
      return MapTreeLeaf$2_$ctor_5BDDA1(MapTreeLeaf$2__get_Key(m2), f(MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2)));
    }
  } else {
    return MapTreeModule_empty();
  }
}
function MapTreeModule_mapi(f, m) {
  return MapTreeModule_mapiOpt(f, m);
}
function MapTreeModule_foldBackOpt(f_mut, m_mut, x_mut) {
  MapTreeModule_foldBackOpt: while (true) {
    const f = f_mut,
      m = m_mut,
      x = x_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        const x_1 = MapTreeModule_foldBackOpt(f, MapTreeNode$2__get_Right(mn), x);
        const x_2 = f(MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), x_1);
        f_mut = f;
        m_mut = MapTreeNode$2__get_Left(mn);
        x_mut = x_2;
        continue MapTreeModule_foldBackOpt;
      } else {
        return f(MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2), x);
      }
    } else {
      return x;
    }
    break;
  }
}
function MapTreeModule_foldBack(f, m, x) {
  return MapTreeModule_foldBackOpt(f, m, x);
}
function MapTreeModule_foldOpt(f_mut, x_mut, m_mut) {
  MapTreeModule_foldOpt: while (true) {
    const f = f_mut,
      x = x_mut,
      m = m_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      if (m2 instanceof MapTreeNode$2) {
        const mn = m2;
        f_mut = f;
        x_mut = f(MapTreeModule_foldOpt(f, x, MapTreeNode$2__get_Left(mn)), MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn));
        m_mut = MapTreeNode$2__get_Right(mn);
        continue MapTreeModule_foldOpt;
      } else {
        return f(x, MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2));
      }
    } else {
      return x;
    }
    break;
  }
}
function MapTreeModule_fold(f, x, m) {
  return MapTreeModule_foldOpt(f, x, m);
}
function MapTreeModule_foldSectionOpt(comparer, lo, hi, f, m, x) {
  const foldFromTo = (f_1_mut, m_1_mut, x_1_mut) => {
    foldFromTo: while (true) {
      const f_1 = f_1_mut,
        m_1 = m_1_mut,
        x_1 = x_1_mut;
      if (m_1 != null) {
        const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m_1);
        if (m2 instanceof MapTreeNode$2) {
          const mn = m2;
          const cLoKey = comparer.Compare(lo, MapTreeLeaf$2__get_Key(mn)) | 0;
          const cKeyHi = comparer.Compare(MapTreeLeaf$2__get_Key(mn), hi) | 0;
          const x_2 = cLoKey < 0 ? foldFromTo(f_1, MapTreeNode$2__get_Left(mn), x_1) : x_1;
          const x_3 = cLoKey <= 0 && cKeyHi <= 0 ? f_1(MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn), x_2) : x_2;
          if (cKeyHi < 0) {
            f_1_mut = f_1;
            m_1_mut = MapTreeNode$2__get_Right(mn);
            x_1_mut = x_3;
            continue foldFromTo;
          } else {
            return x_3;
          }
        } else if (comparer.Compare(lo, MapTreeLeaf$2__get_Key(m2)) <= 0 && comparer.Compare(MapTreeLeaf$2__get_Key(m2), hi) <= 0) {
          return f_1(MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2), x_1);
        } else {
          return x_1;
        }
      } else {
        return x_1;
      }
      break;
    }
  };
  if (comparer.Compare(lo, hi) === 1) {
    return x;
  } else {
    return foldFromTo(f, m, x);
  }
}
function MapTreeModule_foldSection(comparer, lo, hi, f, m, x) {
  return MapTreeModule_foldSectionOpt(comparer, lo, hi, f, m, x);
}
function MapTreeModule_toList(m) {
  const loop = (m_1_mut, acc_mut) => {
    loop: while (true) {
      const m_1 = m_1_mut,
        acc = acc_mut;
      if (m_1 != null) {
        const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m_1);
        if (m2 instanceof MapTreeNode$2) {
          const mn = m2;
          m_1_mut = MapTreeNode$2__get_Left(mn);
          acc_mut = (0,_List_js__WEBPACK_IMPORTED_MODULE_2__.cons)([MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn)], loop(MapTreeNode$2__get_Right(mn), acc));
          continue loop;
        } else {
          return (0,_List_js__WEBPACK_IMPORTED_MODULE_2__.cons)([MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2)], acc);
        }
      } else {
        return acc;
      }
      break;
    }
  };
  return loop(m, (0,_List_js__WEBPACK_IMPORTED_MODULE_2__.empty)());
}
function MapTreeModule_copyToArray(m, arr, i) {
  let j = i;
  MapTreeModule_iter((x, y) => {
    arr[j] = [x, y];
    j = j + 1 | 0;
  }, m);
}
function MapTreeModule_toArray(m) {
  const n = MapTreeModule_size(m) | 0;
  const res = (0,_Array_js__WEBPACK_IMPORTED_MODULE_3__.fill)(new Array(n), 0, n, [null, null]);
  MapTreeModule_copyToArray(m, res, 0);
  return res;
}
function MapTreeModule_ofList(comparer, l) {
  return (0,_List_js__WEBPACK_IMPORTED_MODULE_2__.fold)((acc, tupledArg) => MapTreeModule_add(comparer, tupledArg[0], tupledArg[1], acc), MapTreeModule_empty(), l);
}
function MapTreeModule_mkFromEnumerator(comparer_mut, acc_mut, e_mut) {
  MapTreeModule_mkFromEnumerator: while (true) {
    const comparer = comparer_mut,
      acc = acc_mut,
      e = e_mut;
    if (e["System.Collections.IEnumerator.MoveNext"]()) {
      const patternInput = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
      comparer_mut = comparer;
      acc_mut = MapTreeModule_add(comparer, patternInput[0], patternInput[1], acc);
      e_mut = e;
      continue MapTreeModule_mkFromEnumerator;
    } else {
      return acc;
    }
    break;
  }
}
function MapTreeModule_ofArray(comparer, arr) {
  let res = MapTreeModule_empty();
  for (let idx = 0; idx <= arr.length - 1; idx++) {
    const forLoopVar = arr[idx];
    res = MapTreeModule_add(comparer, forLoopVar[0], forLoopVar[1], res);
  }
  return res;
}
function MapTreeModule_ofSeq(comparer, c) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.isArrayLike)(c)) {
    return MapTreeModule_ofArray(comparer, c);
  } else if (c instanceof _List_js__WEBPACK_IMPORTED_MODULE_2__.FSharpList) {
    return MapTreeModule_ofList(comparer, c);
  } else {
    const ie = (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.getEnumerator)(c);
    try {
      return MapTreeModule_mkFromEnumerator(comparer, MapTreeModule_empty(), ie);
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.disposeSafe)(ie);
    }
  }
}
class MapTreeModule_MapIterator$2 extends _Types_js__WEBPACK_IMPORTED_MODULE_5__.Record {
  constructor(stack, started) {
    super();
    this.stack = stack;
    this.started = started;
  }
}
function MapTreeModule_MapIterator$2_$reflection(gen0, gen1) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_0__.record_type)("Map.MapTreeModule.MapIterator`2", [gen0, gen1], MapTreeModule_MapIterator$2, () => [["stack", (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_0__.list_type)((0,_Reflection_js__WEBPACK_IMPORTED_MODULE_0__.option_type)(MapTreeLeaf$2_$reflection(gen0, gen1)))], ["started", _Reflection_js__WEBPACK_IMPORTED_MODULE_0__.bool_type]]);
}
function MapTreeModule_collapseLHS(stack_mut) {
  MapTreeModule_collapseLHS: while (true) {
    const stack = stack_mut;
    if (!(0,_List_js__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(stack)) {
      const rest = (0,_List_js__WEBPACK_IMPORTED_MODULE_2__.tail)(stack);
      const m = (0,_List_js__WEBPACK_IMPORTED_MODULE_2__.head)(stack);
      if (m != null) {
        const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
        if (m2 instanceof MapTreeNode$2) {
          const mn = m2;
          stack_mut = (0,_List_js__WEBPACK_IMPORTED_MODULE_2__.ofArrayWithTail)([MapTreeNode$2__get_Left(mn), MapTreeLeaf$2_$ctor_5BDDA1(MapTreeLeaf$2__get_Key(mn), MapTreeLeaf$2__get_Value(mn)), MapTreeNode$2__get_Right(mn)], rest);
          continue MapTreeModule_collapseLHS;
        } else {
          return stack;
        }
      } else {
        stack_mut = rest;
        continue MapTreeModule_collapseLHS;
      }
    } else {
      return (0,_List_js__WEBPACK_IMPORTED_MODULE_2__.empty)();
    }
    break;
  }
}
function MapTreeModule_mkIterator(m) {
  return new MapTreeModule_MapIterator$2(MapTreeModule_collapseLHS((0,_List_js__WEBPACK_IMPORTED_MODULE_2__.singleton)(m)), false);
}
function MapTreeModule_notStarted() {
  throw new Error("enumeration not started");
}
function MapTreeModule_alreadyFinished() {
  throw new Error("enumeration already finished");
}
function MapTreeModule_current(i) {
  if (i.started) {
    const matchValue = i.stack;
    if (!(0,_List_js__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(matchValue)) {
      if ((0,_List_js__WEBPACK_IMPORTED_MODULE_2__.head)(matchValue) != null) {
        const m = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)((0,_List_js__WEBPACK_IMPORTED_MODULE_2__.head)(matchValue));
        if (m instanceof MapTreeNode$2) {
          throw new Error("Please report error: Map iterator, unexpected stack for current");
        } else {
          return [MapTreeLeaf$2__get_Key(m), MapTreeLeaf$2__get_Value(m)];
        }
      } else {
        throw new Error("Please report error: Map iterator, unexpected stack for current");
      }
    } else {
      return MapTreeModule_alreadyFinished();
    }
  } else {
    return MapTreeModule_notStarted();
  }
}
function MapTreeModule_moveNext(i) {
  if (i.started) {
    const matchValue = i.stack;
    if (!(0,_List_js__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(matchValue)) {
      if ((0,_List_js__WEBPACK_IMPORTED_MODULE_2__.head)(matchValue) != null) {
        const m = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)((0,_List_js__WEBPACK_IMPORTED_MODULE_2__.head)(matchValue));
        if (m instanceof MapTreeNode$2) {
          throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
        } else {
          i.stack = MapTreeModule_collapseLHS((0,_List_js__WEBPACK_IMPORTED_MODULE_2__.tail)(matchValue));
          return !(0,_List_js__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(i.stack);
        }
      } else {
        throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
      }
    } else {
      return false;
    }
  } else {
    i.started = true;
    return !(0,_List_js__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(i.stack);
  }
}
function MapTreeModule_mkIEnumerator(m) {
  let i = MapTreeModule_mkIterator(m);
  return {
    "System.Collections.Generic.IEnumerator`1.get_Current"() {
      return MapTreeModule_current(i);
    },
    "System.Collections.IEnumerator.get_Current"() {
      return MapTreeModule_current(i);
    },
    "System.Collections.IEnumerator.MoveNext"() {
      return MapTreeModule_moveNext(i);
    },
    "System.Collections.IEnumerator.Reset"() {
      i = MapTreeModule_mkIterator(m);
    },
    Dispose() {}
  };
}
function MapTreeModule_toSeq(s) {
  return (0,_Seq_js__WEBPACK_IMPORTED_MODULE_6__.unfold)(en_1 => {
    if (en_1["System.Collections.IEnumerator.MoveNext"]()) {
      return [en_1["System.Collections.Generic.IEnumerator`1.get_Current"](), en_1];
    } else {
      return void 0;
    }
  }, MapTreeModule_mkIEnumerator(s));
}
function MapTreeModule_leftmost(m_mut) {
  MapTreeModule_leftmost: while (true) {
    const m = m_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      let matchResult, nd_1;
      if (m2 instanceof MapTreeNode$2) {
        if (MapTreeNode$2__get_Height(m2) > 1) {
          matchResult = 0;
          nd_1 = m2;
        } else {
          matchResult = 1;
        }
      } else {
        matchResult = 1;
      }
      switch (matchResult) {
        case 0:
          if (MapTreeNode$2__get_Left(nd_1) == null) {
            return [MapTreeLeaf$2__get_Key(nd_1), MapTreeLeaf$2__get_Value(nd_1)];
          } else {
            m_mut = MapTreeNode$2__get_Left(nd_1);
            continue MapTreeModule_leftmost;
          }
        default:
          return [MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2)];
      }
    } else {
      throw new Error();
    }
    break;
  }
}
function MapTreeModule_rightmost(m_mut) {
  MapTreeModule_rightmost: while (true) {
    const m = m_mut;
    if (m != null) {
      const m2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(m);
      let matchResult, nd_1;
      if (m2 instanceof MapTreeNode$2) {
        if (MapTreeNode$2__get_Height(m2) > 1) {
          matchResult = 0;
          nd_1 = m2;
        } else {
          matchResult = 1;
        }
      } else {
        matchResult = 1;
      }
      switch (matchResult) {
        case 0:
          if (MapTreeNode$2__get_Right(nd_1) == null) {
            return [MapTreeLeaf$2__get_Key(nd_1), MapTreeLeaf$2__get_Value(nd_1)];
          } else {
            m_mut = MapTreeNode$2__get_Right(nd_1);
            continue MapTreeModule_rightmost;
          }
        default:
          return [MapTreeLeaf$2__get_Key(m2), MapTreeLeaf$2__get_Value(m2)];
      }
    } else {
      throw new Error();
    }
    break;
  }
}
class FSharpMap {
  constructor(comparer, tree) {
    this.comparer = comparer;
    this.tree = tree;
  }
  GetHashCode() {
    const this$ = this;
    return FSharpMap__ComputeHashCode(this$) | 0;
  }
  Equals(that) {
    const this$ = this;
    if (that instanceof FSharpMap) {
      const that_1 = that;
      const e1 = (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.getEnumerator)(this$);
      try {
        const e2 = (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.getEnumerator)(that_1);
        try {
          const loop = () => {
            const m1 = e1["System.Collections.IEnumerator.MoveNext"]();
            if (m1 === e2["System.Collections.IEnumerator.MoveNext"]()) {
              if (!m1) {
                return true;
              } else {
                const e1c = e1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                const e2c = e2["System.Collections.Generic.IEnumerator`1.get_Current"]();
                if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.equals)(e1c[0], e2c[0]) && (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.equals)(e1c[1], e2c[1])) {
                  return loop();
                } else {
                  return false;
                }
              }
            } else {
              return false;
            }
          };
          return loop();
        } finally {
          (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.disposeSafe)(e2);
        }
      } finally {
        (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.disposeSafe)(e1);
      }
    } else {
      return false;
    }
  }
  toString() {
    const this$ = this;
    return "map [" + (0,_String_js__WEBPACK_IMPORTED_MODULE_7__.join)("; ", (0,_Seq_js__WEBPACK_IMPORTED_MODULE_6__.map)(kv => (0,_String_js__WEBPACK_IMPORTED_MODULE_7__.format)("({0}, {1})", kv[0], kv[1]), this$)) + "]";
  }
  get [Symbol.toStringTag]() {
    return "FSharpMap";
  }
  toJSON() {
    const this$ = this;
    return Array.from(this$);
  }
  GetEnumerator() {
    const _ = this;
    return MapTreeModule_mkIEnumerator(_.tree);
  }
  [Symbol.iterator]() {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.toIterator)((0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.getEnumerator)(this));
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const _ = this;
    return MapTreeModule_mkIEnumerator(_.tree);
  }
  CompareTo(obj) {
    const m = this;
    if (obj instanceof FSharpMap) {
      const m2 = obj;
      return (0,_Seq_js__WEBPACK_IMPORTED_MODULE_6__.compareWith)((kvp1, kvp2) => {
        const c = m.comparer.Compare(kvp1[0], kvp2[0]) | 0;
        return (c !== 0 ? c : (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.compare)(kvp1[1], kvp2[1])) | 0;
      }, m, m2) | 0;
    } else {
      throw new Error("not comparable\\nParameter name: obj");
    }
  }
  "System.Collections.Generic.ICollection`1.Add2B595"(x) {
    throw new Error("Map cannot be mutated");
  }
  "System.Collections.Generic.ICollection`1.Clear"() {
    throw new Error("Map cannot be mutated");
  }
  "System.Collections.Generic.ICollection`1.Remove2B595"(x) {
    throw new Error("Map cannot be mutated");
  }
  "System.Collections.Generic.ICollection`1.Contains2B595"(x) {
    const m = this;
    return FSharpMap__ContainsKey(m, x[0]) && (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.equals)(FSharpMap__get_Item(m, x[0]), x[1]);
  }
  "System.Collections.Generic.ICollection`1.CopyToZ3B4C077E"(arr, i) {
    const m = this;
    MapTreeModule_copyToArray(m.tree, arr, i);
  }
  "System.Collections.Generic.ICollection`1.get_IsReadOnly"() {
    return true;
  }
  "System.Collections.Generic.ICollection`1.get_Count"() {
    const m = this;
    return FSharpMap__get_Count(m) | 0;
  }
  "System.Collections.Generic.IReadOnlyCollection`1.get_Count"() {
    const m = this;
    return FSharpMap__get_Count(m) | 0;
  }
  get size() {
    const m = this;
    return FSharpMap__get_Count(m) | 0;
  }
  clear() {
    throw new Error("Map cannot be mutated");
  }
  delete(_arg) {
    throw new Error("Map cannot be mutated");
    return false;
  }
  entries() {
    const m = this;
    return (0,_Seq_js__WEBPACK_IMPORTED_MODULE_6__.map)(p => [p[0], p[1]], m);
  }
  get(k) {
    const m = this;
    return FSharpMap__get_Item(m, k);
  }
  has(k) {
    const m = this;
    return FSharpMap__ContainsKey(m, k);
  }
  keys() {
    const m = this;
    return (0,_Seq_js__WEBPACK_IMPORTED_MODULE_6__.map)(p => p[0], m);
  }
  set(k, v) {
    const m = this;
    throw new Error("Map cannot be mutated");
    return m;
  }
  values() {
    const m = this;
    return (0,_Seq_js__WEBPACK_IMPORTED_MODULE_6__.map)(p => p[1], m);
  }
  forEach(f, thisArg) {
    const m = this;
    (0,_Seq_js__WEBPACK_IMPORTED_MODULE_6__.iterate)(p => {
      f(p[1], p[0], m);
    }, m);
  }
}
function FSharpMap_$reflection(gen0, gen1) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_0__.class_type)("Map.FSharpMap", [gen0, gen1], FSharpMap);
}
function FSharpMap_$ctor(comparer, tree) {
  return new FSharpMap(comparer, tree);
}
function FSharpMap_Empty(comparer) {
  return FSharpMap_$ctor(comparer, MapTreeModule_empty());
}
function FSharpMap__get_Comparer(m) {
  return m.comparer;
}
function FSharpMap__get_Tree(m) {
  return m.tree;
}
function FSharpMap__Add(m, key, value) {
  return FSharpMap_$ctor(m.comparer, MapTreeModule_add(m.comparer, key, value, m.tree));
}
function FSharpMap__Change(m, key, f) {
  return FSharpMap_$ctor(m.comparer, MapTreeModule_change(m.comparer, key, f, m.tree));
}
function FSharpMap__get_IsEmpty(m) {
  return m.tree == null;
}
function FSharpMap__get_Item(m, key) {
  return MapTreeModule_find(m.comparer, key, m.tree);
}
function FSharpMap__TryPick(m, f) {
  return MapTreeModule_tryPick(f, m.tree);
}
function FSharpMap__Exists(m, predicate) {
  return MapTreeModule_exists(predicate, m.tree);
}
function FSharpMap__Filter(m, predicate) {
  return FSharpMap_$ctor(m.comparer, MapTreeModule_filter(m.comparer, predicate, m.tree));
}
function FSharpMap__ForAll(m, predicate) {
  return MapTreeModule_forall(predicate, m.tree);
}
function FSharpMap__Fold(m, f, acc) {
  return MapTreeModule_foldBack(f, m.tree, acc);
}
function FSharpMap__FoldSection(m, lo, hi, f, acc) {
  return MapTreeModule_foldSection(m.comparer, lo, hi, f, m.tree, acc);
}
function FSharpMap__Iterate(m, f) {
  MapTreeModule_iter(f, m.tree);
}
function FSharpMap__MapRange(m, f) {
  return FSharpMap_$ctor(m.comparer, MapTreeModule_map(f, m.tree));
}
function FSharpMap__Map(m, f) {
  return FSharpMap_$ctor(m.comparer, MapTreeModule_mapi(f, m.tree));
}
function FSharpMap__Partition(m, predicate) {
  const patternInput = MapTreeModule_partition(m.comparer, predicate, m.tree);
  return [FSharpMap_$ctor(m.comparer, patternInput[0]), FSharpMap_$ctor(m.comparer, patternInput[1])];
}
function FSharpMap__get_Count(m) {
  return MapTreeModule_size(m.tree);
}
function FSharpMap__ContainsKey(m, key) {
  return MapTreeModule_mem(m.comparer, key, m.tree);
}
function FSharpMap__Remove(m, key) {
  return FSharpMap_$ctor(m.comparer, MapTreeModule_remove(m.comparer, key, m.tree));
}
function FSharpMap__TryGetValue(_, key, value) {
  const matchValue = MapTreeModule_tryFind(_.comparer, key, _.tree);
  if (matchValue == null) {
    return false;
  } else {
    const v = (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue);
    value.contents = v;
    return true;
  }
}
function FSharpMap__get_Keys(_) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_3__.map)(kvp => kvp[0], MapTreeModule_toArray(_.tree));
}
function FSharpMap__get_Values(_) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_3__.map)(kvp => kvp[1], MapTreeModule_toArray(_.tree));
}
function FSharpMap__get_MinKeyValue(m) {
  return MapTreeModule_leftmost(m.tree);
}
function FSharpMap__get_MaxKeyValue(m) {
  return MapTreeModule_rightmost(m.tree);
}
function FSharpMap__TryFind(m, key) {
  return MapTreeModule_tryFind(m.comparer, key, m.tree);
}
function FSharpMap__ToList(m) {
  return MapTreeModule_toList(m.tree);
}
function FSharpMap__ToArray(m) {
  return MapTreeModule_toArray(m.tree);
}
function FSharpMap__ComputeHashCode(this$) {
  const combineHash = (x, y) => (x << 1) + y + 631;
  let res = 0;
  const enumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.getEnumerator)(this$);
  try {
    while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
      const activePatternResult = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
      res = combineHash(res, (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.structuralHash)(activePatternResult[0])) | 0;
      res = combineHash(res, (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.structuralHash)(activePatternResult[1])) | 0;
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.disposeSafe)(enumerator);
  }
  return res | 0;
}
function isEmpty(table) {
  return FSharpMap__get_IsEmpty(table);
}
function add(key, value, table) {
  return FSharpMap__Add(table, key, value);
}
function change(key, f, table) {
  return FSharpMap__Change(table, key, f);
}
function find(key, table) {
  return FSharpMap__get_Item(table, key);
}
function tryFind(key, table) {
  return FSharpMap__TryFind(table, key);
}
function remove(key, table) {
  return FSharpMap__Remove(table, key);
}
function containsKey(key, table) {
  return FSharpMap__ContainsKey(table, key);
}
function iterate(action, table) {
  FSharpMap__Iterate(table, action);
}
function tryPick(chooser, table) {
  return FSharpMap__TryPick(table, chooser);
}
function pick(chooser, table) {
  const matchValue = tryPick(chooser, table);
  if (matchValue != null) {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.value)(matchValue);
  } else {
    throw new Error();
  }
}
function exists(predicate, table) {
  return FSharpMap__Exists(table, predicate);
}
function filter(predicate, table) {
  return FSharpMap__Filter(table, predicate);
}
function partition(predicate, table) {
  return FSharpMap__Partition(table, predicate);
}
function forAll(predicate, table) {
  return FSharpMap__ForAll(table, predicate);
}
function map(mapping, table) {
  return FSharpMap__Map(table, mapping);
}
function fold(folder, state, table) {
  return MapTreeModule_fold(folder, state, FSharpMap__get_Tree(table));
}
function foldBack(folder, table, state) {
  return MapTreeModule_foldBack(folder, FSharpMap__get_Tree(table), state);
}
function toSeq(table) {
  return (0,_Seq_js__WEBPACK_IMPORTED_MODULE_6__.map)(kvp => [kvp[0], kvp[1]], table);
}
function findKey(predicate, table) {
  return (0,_Seq_js__WEBPACK_IMPORTED_MODULE_6__.pick)(kvp => {
    const k = kvp[0];
    if (predicate(k, kvp[1])) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(k);
    } else {
      return void 0;
    }
  }, table);
}
function tryFindKey(predicate, table) {
  return (0,_Seq_js__WEBPACK_IMPORTED_MODULE_6__.tryPick)(kvp => {
    const k = kvp[0];
    if (predicate(k, kvp[1])) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_1__.some)(k);
    } else {
      return void 0;
    }
  }, table);
}
function ofList(elements, comparer) {
  return FSharpMap_$ctor(comparer, MapTreeModule_ofSeq(comparer, elements));
}
function ofSeq(elements, comparer) {
  return FSharpMap_$ctor(comparer, MapTreeModule_ofSeq(comparer, elements));
}
function ofArray(elements, comparer) {
  return FSharpMap_$ctor(comparer, MapTreeModule_ofSeq(comparer, elements));
}
function toList(table) {
  return FSharpMap__ToList(table);
}
function toArray(table) {
  return FSharpMap__ToArray(table);
}
function keys(table) {
  return FSharpMap__get_Keys(table);
}
function values(table) {
  return FSharpMap__get_Values(table);
}
function minKeyValue(table) {
  return FSharpMap__get_MinKeyValue(table);
}
function maxKeyValue(table) {
  return FSharpMap__get_MaxKeyValue(table);
}
function empty(comparer) {
  return FSharpMap_Empty(comparer);
}
function count(table) {
  return FSharpMap__get_Count(table);
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Native.js":
/*!******************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Native.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Helpers_allocateArrayFromCons": () => (/* binding */ Helpers_allocateArrayFromCons)
/* harmony export */ });
function Helpers_allocateArrayFromCons(cons, len) {
  if (typeof cons === "function") {
    return new cons(len);
  } else {
    return new Array(len);
  }
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Numeric.js":
/*!*******************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Numeric.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "isNumeric": () => (/* binding */ isNumeric),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "symbol": () => (/* binding */ symbol),
/* harmony export */   "toExponential": () => (/* binding */ toExponential),
/* harmony export */   "toFixed": () => (/* binding */ toFixed),
/* harmony export */   "toHex": () => (/* binding */ toHex),
/* harmony export */   "toPrecision": () => (/* binding */ toPrecision)
/* harmony export */ });
const symbol = Symbol("numeric");
function isNumeric(x) {
  return typeof x === "number" || typeof x === "bigint" || x?.[symbol];
}
function compare(x, y) {
  if (typeof x === "number") {
    return x < y ? -1 : x > y ? 1 : 0;
  } else if (typeof x === "bigint") {
    return x < y ? -1 : x > y ? 1 : 0;
  } else {
    return x.CompareTo(y);
  }
}
function multiply(x, y) {
  if (typeof x === "number") {
    return x * y;
  } else if (typeof x === "bigint") {
    return x * BigInt(y);
  } else {
    return x[symbol]().multiply(y);
  }
}
function toFixed(x, dp) {
  if (typeof x === "number") {
    return x.toFixed(dp);
  } else if (typeof x === "bigint") {
    return x;
  } else {
    return x[symbol]().toFixed(dp);
  }
}
function toPrecision(x, sd) {
  if (typeof x === "number") {
    return x.toPrecision(sd);
  } else if (typeof x === "bigint") {
    return x;
  } else {
    return x[symbol]().toPrecision(sd);
  }
}
function toExponential(x, dp) {
  if (typeof x === "number") {
    return x.toExponential(dp);
  } else if (typeof x === "bigint") {
    return x;
  } else {
    return x[symbol]().toExponential(dp);
  }
}
function toHex(x) {
  if (typeof x === "number") {
    return (Number(x) >>> 0).toString(16);
  } else if (typeof x === "bigint") {
    // TODO: properly handle other bit sizes
    return BigInt.asUintN(64, x).toString(16);
  } else {
    return x[symbol]().toHex();
  }
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Option.js":
/*!******************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Option.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Some": () => (/* binding */ Some),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "defaultArg": () => (/* binding */ defaultArg),
/* harmony export */   "defaultArgWith": () => (/* binding */ defaultArgWith),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "map2": () => (/* binding */ map2),
/* harmony export */   "map3": () => (/* binding */ map3),
/* harmony export */   "ofNullable": () => (/* binding */ ofNullable),
/* harmony export */   "orElse": () => (/* binding */ orElse),
/* harmony export */   "orElseWith": () => (/* binding */ orElseWith),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "toNullable": () => (/* binding */ toNullable),
/* harmony export */   "tryOp": () => (/* binding */ tryOp),
/* harmony export */   "unwrap": () => (/* binding */ unwrap),
/* harmony export */   "value": () => (/* binding */ value)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");

// Using a class here for better compatibility with TS files importing Some
class Some {
  constructor(value) {
    this.value = value;
  }
  toJSON() {
    return this.value;
  }
  // Don't add "Some" for consistency with erased options
  toString() {
    return String(this.value);
  }
  GetHashCode() {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash)(this.value);
  }
  Equals(other) {
    if (other == null) {
      return false;
    } else {
      return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(this.value, other instanceof Some ? other.value : other);
    }
  }
  CompareTo(other) {
    if (other == null) {
      return 1;
    } else {
      return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.compare)(this.value, other instanceof Some ? other.value : other);
    }
  }
}
function value(x) {
  if (x == null) {
    throw new Error("Option has no value");
  } else {
    return x instanceof Some ? x.value : x;
  }
}
function unwrap(opt) {
  return opt instanceof Some ? opt.value : opt;
}
function some(x) {
  return x == null || x instanceof Some ? new Some(x) : x;
}
function ofNullable(x) {
  // This will fail with unit probably, an alternative would be:
  // return x === null ? undefined : (x === undefined ? new Some(x) : x);
  return x == null ? undefined : x;
}
function toNullable(x) {
  return x == null ? null : value(x);
}
function flatten(x) {
  return x == null ? undefined : value(x);
}
function toArray(opt) {
  return opt == null ? [] : [value(opt)];
}
function defaultArg(opt, defaultValue) {
  return opt != null ? value(opt) : defaultValue;
}
function defaultArgWith(opt, defThunk) {
  return opt != null ? value(opt) : defThunk();
}
function orElse(opt, ifNone) {
  return opt == null ? ifNone : opt;
}
function orElseWith(opt, ifNoneThunk) {
  return opt == null ? ifNoneThunk() : opt;
}
function filter(predicate, opt) {
  return opt != null ? predicate(value(opt)) ? opt : undefined : opt;
}
function map(mapping, opt) {
  return opt != null ? some(mapping(value(opt))) : undefined;
}
function map2(mapping, opt1, opt2) {
  return opt1 != null && opt2 != null ? mapping(value(opt1), value(opt2)) : undefined;
}
function map3(mapping, opt1, opt2, opt3) {
  return opt1 != null && opt2 != null && opt3 != null ? mapping(value(opt1), value(opt2), value(opt3)) : undefined;
}
function bind(binder, opt) {
  return opt != null ? binder(value(opt)) : undefined;
}
function tryOp(op, arg) {
  try {
    return some(op(arg));
  } catch {
    return undefined;
  }
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Reflection.js":
/*!**********************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Reflection.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CaseInfo": () => (/* binding */ CaseInfo),
/* harmony export */   "GenericParameter": () => (/* binding */ GenericParameter),
/* harmony export */   "MethodInfo": () => (/* binding */ MethodInfo),
/* harmony export */   "TypeInfo": () => (/* binding */ TypeInfo),
/* harmony export */   "anonRecord_type": () => (/* binding */ anonRecord_type),
/* harmony export */   "array_type": () => (/* binding */ array_type),
/* harmony export */   "bigint_type": () => (/* binding */ bigint_type),
/* harmony export */   "bool_type": () => (/* binding */ bool_type),
/* harmony export */   "char_type": () => (/* binding */ char_type),
/* harmony export */   "class_type": () => (/* binding */ class_type),
/* harmony export */   "createInstance": () => (/* binding */ createInstance),
/* harmony export */   "decimal_type": () => (/* binding */ decimal_type),
/* harmony export */   "delegate_type": () => (/* binding */ delegate_type),
/* harmony export */   "enum_type": () => (/* binding */ enum_type),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "float16_type": () => (/* binding */ float16_type),
/* harmony export */   "float32_type": () => (/* binding */ float32_type),
/* harmony export */   "float64_type": () => (/* binding */ float64_type),
/* harmony export */   "fullName": () => (/* binding */ fullName),
/* harmony export */   "generic_type": () => (/* binding */ generic_type),
/* harmony export */   "getCaseFields": () => (/* binding */ getCaseFields),
/* harmony export */   "getCaseName": () => (/* binding */ getCaseName),
/* harmony export */   "getCaseTag": () => (/* binding */ getCaseTag),
/* harmony export */   "getElementType": () => (/* binding */ getElementType),
/* harmony export */   "getEnumName": () => (/* binding */ getEnumName),
/* harmony export */   "getEnumNames": () => (/* binding */ getEnumNames),
/* harmony export */   "getEnumUnderlyingType": () => (/* binding */ getEnumUnderlyingType),
/* harmony export */   "getEnumValues": () => (/* binding */ getEnumValues),
/* harmony export */   "getFunctionElements": () => (/* binding */ getFunctionElements),
/* harmony export */   "getGenericTypeDefinition": () => (/* binding */ getGenericTypeDefinition),
/* harmony export */   "getGenerics": () => (/* binding */ getGenerics),
/* harmony export */   "getHashCode": () => (/* binding */ getHashCode),
/* harmony export */   "getRecordElements": () => (/* binding */ getRecordElements),
/* harmony export */   "getRecordField": () => (/* binding */ getRecordField),
/* harmony export */   "getRecordFields": () => (/* binding */ getRecordFields),
/* harmony export */   "getTupleElements": () => (/* binding */ getTupleElements),
/* harmony export */   "getTupleField": () => (/* binding */ getTupleField),
/* harmony export */   "getTupleFields": () => (/* binding */ getTupleFields),
/* harmony export */   "getUnionCaseFields": () => (/* binding */ getUnionCaseFields),
/* harmony export */   "getUnionCases": () => (/* binding */ getUnionCases),
/* harmony export */   "getUnionFields": () => (/* binding */ getUnionFields),
/* harmony export */   "getValue": () => (/* binding */ getValue),
/* harmony export */   "int128_type": () => (/* binding */ int128_type),
/* harmony export */   "int16_type": () => (/* binding */ int16_type),
/* harmony export */   "int32_type": () => (/* binding */ int32_type),
/* harmony export */   "int64_type": () => (/* binding */ int64_type),
/* harmony export */   "int8_type": () => (/* binding */ int8_type),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isEnum": () => (/* binding */ isEnum),
/* harmony export */   "isEnumDefined": () => (/* binding */ isEnumDefined),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isGenericParameter": () => (/* binding */ isGenericParameter),
/* harmony export */   "isGenericType": () => (/* binding */ isGenericType),
/* harmony export */   "isInstanceOfType": () => (/* binding */ isInstanceOfType),
/* harmony export */   "isRecord": () => (/* binding */ isRecord),
/* harmony export */   "isSubclassOf": () => (/* binding */ isSubclassOf),
/* harmony export */   "isTuple": () => (/* binding */ isTuple),
/* harmony export */   "isUnion": () => (/* binding */ isUnion),
/* harmony export */   "lambda_type": () => (/* binding */ lambda_type),
/* harmony export */   "list_type": () => (/* binding */ list_type),
/* harmony export */   "makeGenericType": () => (/* binding */ makeGenericType),
/* harmony export */   "makeRecord": () => (/* binding */ makeRecord),
/* harmony export */   "makeTuple": () => (/* binding */ makeTuple),
/* harmony export */   "makeUnion": () => (/* binding */ makeUnion),
/* harmony export */   "measure_type": () => (/* binding */ measure_type),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "namespace": () => (/* binding */ namespace),
/* harmony export */   "nativeint_type": () => (/* binding */ nativeint_type),
/* harmony export */   "obj_type": () => (/* binding */ obj_type),
/* harmony export */   "option_type": () => (/* binding */ option_type),
/* harmony export */   "parseEnum": () => (/* binding */ parseEnum),
/* harmony export */   "record_type": () => (/* binding */ record_type),
/* harmony export */   "string_type": () => (/* binding */ string_type),
/* harmony export */   "tryParseEnum": () => (/* binding */ tryParseEnum),
/* harmony export */   "tuple_type": () => (/* binding */ tuple_type),
/* harmony export */   "uint128_type": () => (/* binding */ uint128_type),
/* harmony export */   "uint16_type": () => (/* binding */ uint16_type),
/* harmony export */   "uint32_type": () => (/* binding */ uint32_type),
/* harmony export */   "uint64_type": () => (/* binding */ uint64_type),
/* harmony export */   "uint8_type": () => (/* binding */ uint8_type),
/* harmony export */   "unativeint_type": () => (/* binding */ unativeint_type),
/* harmony export */   "union_type": () => (/* binding */ union_type),
/* harmony export */   "unit_type": () => (/* binding */ unit_type)
/* harmony export */ });
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Types.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Decimal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Decimal.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Decimal.js");



class CaseInfo {
  constructor(declaringType, tag, name, fields) {
    this.declaringType = declaringType;
    this.tag = tag;
    this.name = name;
    this.fields = fields;
  }
}
class MethodInfo {
  constructor(name, parameters, returnType) {
    this.name = name;
    this.parameters = parameters;
    this.returnType = returnType;
  }
}
class TypeInfo {
  constructor(fullname, generics, construct, parent, fields, cases, enumCases) {
    this.fullname = fullname;
    this.generics = generics;
    this.construct = construct;
    this.parent = parent;
    this.fields = fields;
    this.cases = cases;
    this.enumCases = enumCases;
  }
  toString() {
    return fullName(this);
  }
  GetHashCode() {
    return getHashCode(this);
  }
  Equals(other) {
    return equals(this, other);
  }
}
class GenericParameter extends TypeInfo {
  constructor(name) {
    super(name);
  }
}
function getGenerics(t) {
  return t.generics != null ? t.generics : [];
}
function getHashCode(t) {
  const fullnameHash = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.stringHash)(t.fullname);
  const genHashes = getGenerics(t).map(getHashCode);
  return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.combineHashCodes)([fullnameHash, ...genHashes]);
}
function equals(t1, t2) {
  if (t1.fullname === "") {
    // Anonymous records
    return t2.fullname === "" && (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equalArraysWith)(getRecordElements(t1), getRecordElements(t2), ([k1, v1], [k2, v2]) => k1 === k2 && equals(v1, v2));
  } else {
    return t1.fullname === t2.fullname && (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equalArraysWith)(getGenerics(t1), getGenerics(t2), equals);
  }
}
function class_type(fullname, generics, construct, parent) {
  return new TypeInfo(fullname, generics, construct, parent);
}
function record_type(fullname, generics, construct, fields) {
  return new TypeInfo(fullname, generics, construct, undefined, fields);
}
function anonRecord_type(...fields) {
  return new TypeInfo("", undefined, undefined, undefined, () => fields);
}
function union_type(fullname, generics, construct, cases) {
  const t = new TypeInfo(fullname, generics, construct, undefined, undefined, () => {
    const caseNames = construct.prototype.cases();
    return cases().map((fields, i) => new CaseInfo(t, i, caseNames[i], fields));
  });
  return t;
}
function tuple_type(...generics) {
  return new TypeInfo("System.Tuple`" + generics.length, generics);
}
function delegate_type(...generics) {
  return new TypeInfo("System.Func`" + generics.length, generics);
}
function lambda_type(argType, returnType) {
  return new TypeInfo("Microsoft.FSharp.Core.FSharpFunc`2", [argType, returnType]);
}
function option_type(generic) {
  return new TypeInfo("Microsoft.FSharp.Core.FSharpOption`1", [generic]);
}
function list_type(generic) {
  return new TypeInfo("Microsoft.FSharp.Collections.FSharpList`1", [generic]);
}
function array_type(generic) {
  return new TypeInfo("[]", [generic]);
}
function enum_type(fullname, underlyingType, enumCases) {
  return new TypeInfo(fullname, [underlyingType], undefined, undefined, undefined, undefined, enumCases);
}
function measure_type(fullname) {
  return new TypeInfo(fullname);
}
function generic_type(name) {
  return new GenericParameter(name);
}
const obj_type = new TypeInfo("System.Object");
const unit_type = new TypeInfo("Microsoft.FSharp.Core.Unit");
const char_type = new TypeInfo("System.Char");
const string_type = new TypeInfo("System.String");
const bool_type = new TypeInfo("System.Boolean");
const int8_type = new TypeInfo("System.SByte");
const uint8_type = new TypeInfo("System.Byte");
const int16_type = new TypeInfo("System.Int16");
const uint16_type = new TypeInfo("System.UInt16");
const int32_type = new TypeInfo("System.Int32");
const uint32_type = new TypeInfo("System.UInt32");
const int64_type = new TypeInfo("System.Int64");
const uint64_type = new TypeInfo("System.UInt64");
const int128_type = new TypeInfo("System.Int128");
const uint128_type = new TypeInfo("System.UInt128");
const nativeint_type = new TypeInfo("System.IntPtr");
const unativeint_type = new TypeInfo("System.UIntPtr");
const float16_type = new TypeInfo("System.Half");
const float32_type = new TypeInfo("System.Single");
const float64_type = new TypeInfo("System.Double");
const decimal_type = new TypeInfo("System.Decimal");
const bigint_type = new TypeInfo("System.Numerics.BigInteger");
function name(info) {
  if (Array.isArray(info)) {
    return info[0];
  } else if (info instanceof TypeInfo) {
    const elemType = getElementType(info);
    if (elemType != null) {
      return name(elemType) + "[]";
    } else {
      const i = info.fullname.lastIndexOf(".");
      return i === -1 ? info.fullname : info.fullname.substr(i + 1);
    }
  } else {
    return info.name;
  }
}
function fullName(t) {
  const elemType = getElementType(t);
  if (elemType != null) {
    return fullName(elemType) + "[]";
  } else if (t.generics == null || t.generics.length === 0) {
    return t.fullname;
  } else {
    return t.fullname + "[" + t.generics.map(x => fullName(x)).join(",") + "]";
  }
}
function namespace(t) {
  const elemType = getElementType(t);
  if (elemType != null) {
    return namespace(elemType);
  } else {
    const i = t.fullname.lastIndexOf(".");
    return i === -1 ? "" : t.fullname.substr(0, i);
  }
}
function isArray(t) {
  return getElementType(t) != null;
}
function getElementType(t) {
  return t.fullname === "[]" && t.generics?.length === 1 ? t.generics[0] : undefined;
}
function isGenericType(t) {
  return t.generics != null && t.generics.length > 0;
}
function isGenericParameter(t) {
  return t instanceof GenericParameter;
}
function isEnum(t) {
  return t.enumCases != null && t.enumCases.length > 0;
}
function isSubclassOf(t1, t2) {
  return t2.fullname === obj_type.fullname || t1.parent != null && (t1.parent.Equals(t2) || isSubclassOf(t1.parent, t2));
}
function isErasedToNumber(t) {
  return isEnum(t) || [int8_type.fullname, uint8_type.fullname, int16_type.fullname, uint16_type.fullname, int32_type.fullname, uint32_type.fullname, float16_type.fullname, float32_type.fullname, float64_type.fullname].includes(t.fullname);
}
function isErasedToBigInt(t) {
  return isEnum(t) || [int64_type.fullname, uint64_type.fullname, int128_type.fullname, uint128_type.fullname, nativeint_type.fullname, unativeint_type.fullname, bigint_type.fullname].includes(t.fullname);
}
function isInstanceOfType(t, o) {
  if (t.fullname === obj_type.fullname) return true;
  switch (typeof o) {
    case "boolean":
      return t.fullname === bool_type.fullname;
    case "string":
      return t.fullname === string_type.fullname;
    case "function":
      return isFunction(t);
    case "number":
      return isErasedToNumber(t);
    case "bigint":
      return isErasedToBigInt(t);
    default:
      return t.construct != null && o instanceof t.construct;
  }
}
/**
 * This doesn't replace types for fields (records) or cases (unions)
 * but it should be enough for type comparison purposes
 */
function getGenericTypeDefinition(t) {
  return t.generics == null ? t : new TypeInfo(t.fullname, t.generics.map(() => obj_type));
}
function getEnumUnderlyingType(t) {
  return t.generics?.[0];
}
function getEnumValues(t) {
  if (isEnum(t) && t.enumCases != null) {
    return t.enumCases.map(kv => kv[1]);
  } else {
    throw new Error(`${t.fullname} is not an enum type`);
  }
}
function getEnumNames(t) {
  if (isEnum(t) && t.enumCases != null) {
    return t.enumCases.map(kv => kv[0]);
  } else {
    throw new Error(`${t.fullname} is not an enum type`);
  }
}
function getEnumCase(t, v) {
  if (t.enumCases != null) {
    if (typeof v === "string") {
      for (const kv of t.enumCases) {
        if (kv[0] === v) {
          return kv;
        }
      }
      throw new Error(`'${v}' was not found in ${t.fullname}`);
    } else {
      for (const kv of t.enumCases) {
        if (kv[1] === v) {
          return kv;
        }
      }
      // .NET returns the number even if it doesn't match any of the cases
      return ["", v];
    }
  } else {
    throw new Error(`${t.fullname} is not an enum type`);
  }
}
function parseEnum(t, str) {
  // TODO: better int parsing here, parseInt ceils floats: "4.8" -> 4
  const value = parseInt(str, 10);
  return getEnumCase(t, isNaN(value) ? str : value)[1];
}
function tryParseEnum(t, str, defValue) {
  try {
    defValue.contents = parseEnum(t, str);
    return true;
  } catch {
    return false;
  }
}
function getEnumName(t, v) {
  return getEnumCase(t, v)[0];
}
function isEnumDefined(t, v) {
  try {
    const kv = getEnumCase(t, v);
    return kv[0] != null && kv[0] !== "";
  } catch {
    // supress error
  }
  return false;
}
// FSharpType
function getUnionCases(t) {
  if (t.cases != null) {
    return t.cases();
  } else {
    throw new Error(`${t.fullname} is not an F# union type`);
  }
}
function getRecordElements(t) {
  if (t.fields != null) {
    return t.fields();
  } else {
    throw new Error(`${t.fullname} is not an F# record type`);
  }
}
function getTupleElements(t) {
  if (isTuple(t) && t.generics != null) {
    return t.generics;
  } else {
    throw new Error(`${t.fullname} is not a tuple type`);
  }
}
function getFunctionElements(t) {
  if (isFunction(t) && t.generics != null) {
    const gen = t.generics;
    return [gen[0], gen[1]];
  } else {
    throw new Error(`${t.fullname} is not an F# function type`);
  }
}
function isUnion(t) {
  return t instanceof TypeInfo ? t.cases != null : t instanceof _Types_js__WEBPACK_IMPORTED_MODULE_1__.Union;
}
function isRecord(t) {
  return t instanceof TypeInfo ? t.fields != null : t instanceof _Types_js__WEBPACK_IMPORTED_MODULE_1__.Record;
}
function isTuple(t) {
  return t.fullname.startsWith("System.Tuple");
}
// In .NET this is false for delegates
function isFunction(t) {
  return t.fullname === "Microsoft.FSharp.Core.FSharpFunc`2";
}
// FSharpValue
function getUnionFields(v, t) {
  const cases = getUnionCases(t);
  const case_ = cases[v.tag];
  if (case_ == null) {
    throw new Error(`Cannot find case ${v.name} in union type`);
  }
  return [case_, v.fields];
}
function getUnionCaseFields(uci) {
  return uci.fields == null ? [] : uci.fields;
}
// This is used as replacement of `FSharpValue.GetRecordFields`
// For `FSharpTypes.GetRecordFields` see `getRecordElements`
// Object.keys returns keys in the order they were added to the object
function getRecordFields(v) {
  return Object.keys(v).map(k => v[k]);
}
function getRecordField(v, field) {
  return v[field[0]];
}
function getTupleFields(v) {
  return v;
}
function getTupleField(v, i) {
  return v[i];
}
function makeUnion(uci, values) {
  const expectedLength = (uci.fields || []).length;
  if (values.length !== expectedLength) {
    throw new Error(`Expected an array of length ${expectedLength} but got ${values.length}`);
  }
  const construct = uci.declaringType.construct;
  if (construct == null) {
    return {};
  }
  const isSingleCase = uci.declaringType.cases ? uci.declaringType.cases().length == 1 : false;
  if (isSingleCase) {
    return new construct(...values);
  } else {
    return new construct(uci.tag, values);
  }
}
function makeRecord(t, values) {
  const fields = getRecordElements(t);
  if (fields.length !== values.length) {
    throw new Error(`Expected an array of length ${fields.length} but got ${values.length}`);
  }
  return t.construct != null ? new t.construct(...values) : fields.reduce((obj, [key, _t], i) => {
    obj[key] = values[i];
    return obj;
  }, {});
}
function makeTuple(values, _t) {
  return values;
}
function makeGenericType(t, generics) {
  return new TypeInfo(t.fullname, generics, t.construct, t.parent, t.fields, t.cases);
}
function createInstance(t, consArgs) {
  // TODO: Check if consArgs length is same as t.construct?
  // (Arg types can still be different)
  if (typeof t.construct === "function") {
    return new t.construct(...(consArgs ?? []));
  } else if (isErasedToNumber(t)) {
    return 0;
  } else if (isErasedToBigInt(t)) {
    return 0n;
  } else {
    switch (t.fullname) {
      case obj_type.fullname:
        return {};
      case bool_type.fullname:
        return false;
      case decimal_type.fullname:
        return new _Decimal_js__WEBPACK_IMPORTED_MODULE_2__["default"](0);
      case char_type.fullname:
        // Even though char is a value type, it's erased to string, and Unchecked.defaultof<char> is null
        return null;
      default:
        throw new Error(`Cannot access constructor of ${t.fullname}`);
    }
  }
}
function getValue(propertyInfo, v) {
  return v[propertyInfo[0]];
}
// Fable.Core.Reflection
function assertUnion(x) {
  if (!(x instanceof _Types_js__WEBPACK_IMPORTED_MODULE_1__.Union)) {
    throw new Error(`Value is not an F# union type`);
  }
}
function getCaseTag(x) {
  assertUnion(x);
  return x.tag;
}
function getCaseName(x) {
  assertUnion(x);
  return x.cases()[x.tag];
}
function getCaseFields(x) {
  assertUnion(x);
  return x.fields;
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/RegExp.js":
/*!******************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/RegExp.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "escape": () => (/* binding */ escape),
/* harmony export */   "isMatch": () => (/* binding */ isMatch),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "matches": () => (/* binding */ matches),
/* harmony export */   "options": () => (/* binding */ options),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "split": () => (/* binding */ split),
/* harmony export */   "unescape": () => (/* binding */ unescape)
/* harmony export */ });
function create(pattern, options = 0) {
  // Supported RegexOptions
  // * IgnoreCase:  0x0001
  // * Multiline:   0x0002
  // * Compiled:    0x0008 (ignored)
  // * Singleline:  0x0010
  // * ECMAScript:  0x0100 (ignored)
  if ((options & ~(1 ^ 2 ^ 8 ^ 16 ^ 256)) !== 0) {
    throw new Error("RegexOptions only supports: IgnoreCase, Multiline, Compiled, Singleline and ECMAScript");
  }
  // Set always global and unicode flags for compatibility with dotnet, see #2925
  let flags = "gu";
  flags += options & 1 ? "i" : ""; // 0x0001 RegexOptions.IgnoreCase
  flags += options & 2 ? "m" : "";
  flags += options & 16 ? "s" : "";
  return new RegExp(pattern, flags);
}
// From http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function unescape(str) {
  return str.replace(/\\([\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|])/g, "$1");
}
function isMatch(reg, input, startAt = 0) {
  reg.lastIndex = startAt;
  return reg.test(input);
}
function match(reg, input, startAt = 0) {
  reg.lastIndex = startAt;
  return reg.exec(input);
}
function matches(reg, input, startAt = 0) {
  if (input == null) {
    throw new Error("Input cannot ve null");
  }
  if (!reg.global) {
    throw new Error("Non-global RegExp"); // Prevent infinite loop
  }
  reg.lastIndex = startAt;
  const matches = [];
  let m;
  let lastMatchIndex = -1;
  // tslint:disable-next-line:no-conditional-assignment
  while ((m = reg.exec(input)) != null) {
    // It can happen even global regex get stuck, see #2845
    if (m.index === lastMatchIndex) {
      reg.lastIndex++;
    } else {
      lastMatchIndex = m.index;
      matches.push(m);
    }
  }
  return matches;
}
function options(reg) {
  let options = 256; // ECMAScript
  options |= reg.ignoreCase ? 1 : 0;
  options |= reg.multiline ? 2 : 0;
  return options;
}
function replace(reg, input, replacement, limit, offset = 0) {
  function replacer() {
    let res = arguments[0];
    if (limit) {
      limit--;
      const match = [];
      const len = arguments.length;
      // arguments: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_a_parameter
      // * match: matched substring
      // * p1, p2, ...: nth capture group string
      // * offset: offset of matched substring
      // * string: whole string examined
      // * groups: named capturing groups
      //           ONLY if regex contains a named capture group AND browser supports named groups
      // -> last element can be groups OR input string
      // -> check if last element is string
      const withGroups = typeof arguments[len - 1] !== "string";
      let pLast = withGroups ? len - 3 : len - 2;
      for (let i = 0; i < pLast; i++) {
        match.push(arguments[i]);
      }
      match.index = arguments[pLast++];
      match.input = arguments[pLast++];
      if (withGroups) {
        match.groups = arguments[pLast];
      }
      res = replacement(match);
    }
    return res;
  }
  if (typeof reg === "string") {
    const tmp = reg;
    reg = create(input, limit ?? 0);
    input = tmp;
    limit = undefined;
  }
  if (typeof replacement === "function") {
    limit = limit == null ? -1 : limit;
    return input.substring(0, offset) + input.substring(offset).replace(reg, replacer);
  } else {
    replacement = replacement
    // $0 doesn't work with JS regex, see #1155
    .replace(/\$0/g, _s => "$&")
    // named groups in replacement are `${name}` in .Net, but `$<name>` in JS (in regex: groups are `(?<name>...)` in both)
    .replace(/\${([^}]+)}/g, "\$<$1>");
    if (limit != null) {
      let m;
      const sub1 = input.substring(offset);
      const _matches = matches(reg, sub1);
      const sub2 = matches.length > limit ? (m = _matches[limit - 1], sub1.substring(0, m.index + m[0].length)) : sub1;
      return input.substring(0, offset) + sub2.replace(reg, replacement) + input.substring(offset + sub2.length);
    } else {
      return input.replace(reg, replacement);
    }
  }
}
function split(reg, input, limit, offset = 0) {
  if (typeof reg === "string") {
    const tmp = reg;
    reg = create(input, limit ?? 0);
    input = tmp;
    limit = undefined;
  }
  input = input.substring(offset);
  return input.split(reg, limit);
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Seq.js":
/*!***************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Seq.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CachedSeq$1": () => (/* binding */ CachedSeq$1),
/* harmony export */   "CachedSeq$1_$ctor_Z7A8347D4": () => (/* binding */ CachedSeq$1_$ctor_Z7A8347D4),
/* harmony export */   "CachedSeq$1_$reflection": () => (/* binding */ CachedSeq$1_$reflection),
/* harmony export */   "CachedSeq$1__Clear": () => (/* binding */ CachedSeq$1__Clear),
/* harmony export */   "Enumerator_FromFunctions$1": () => (/* binding */ Enumerator_FromFunctions$1),
/* harmony export */   "Enumerator_FromFunctions$1_$ctor_58C54629": () => (/* binding */ Enumerator_FromFunctions$1_$ctor_58C54629),
/* harmony export */   "Enumerator_FromFunctions$1_$reflection": () => (/* binding */ Enumerator_FromFunctions$1_$reflection),
/* harmony export */   "Enumerator_Seq": () => (/* binding */ Enumerator_Seq),
/* harmony export */   "Enumerator_Seq_$ctor_673A07F2": () => (/* binding */ Enumerator_Seq_$ctor_673A07F2),
/* harmony export */   "Enumerator_Seq_$reflection": () => (/* binding */ Enumerator_Seq_$reflection),
/* harmony export */   "Enumerator_alreadyFinished": () => (/* binding */ Enumerator_alreadyFinished),
/* harmony export */   "Enumerator_cast": () => (/* binding */ Enumerator_cast),
/* harmony export */   "Enumerator_concat": () => (/* binding */ Enumerator_concat),
/* harmony export */   "Enumerator_enumerateThenFinally": () => (/* binding */ Enumerator_enumerateThenFinally),
/* harmony export */   "Enumerator_generateWhileSome": () => (/* binding */ Enumerator_generateWhileSome),
/* harmony export */   "Enumerator_noReset": () => (/* binding */ Enumerator_noReset),
/* harmony export */   "Enumerator_notStarted": () => (/* binding */ Enumerator_notStarted),
/* harmony export */   "Enumerator_unfold": () => (/* binding */ Enumerator_unfold),
/* harmony export */   "SR_enumerationAlreadyFinished": () => (/* binding */ SR_enumerationAlreadyFinished),
/* harmony export */   "SR_enumerationNotStarted": () => (/* binding */ SR_enumerationNotStarted),
/* harmony export */   "SR_inputSequenceEmpty": () => (/* binding */ SR_inputSequenceEmpty),
/* harmony export */   "SR_inputSequenceTooLong": () => (/* binding */ SR_inputSequenceTooLong),
/* harmony export */   "SR_keyNotFoundAlt": () => (/* binding */ SR_keyNotFoundAlt),
/* harmony export */   "SR_notEnoughElements": () => (/* binding */ SR_notEnoughElements),
/* harmony export */   "SR_resetNotSupported": () => (/* binding */ SR_resetNotSupported),
/* harmony export */   "allPairs": () => (/* binding */ allPairs),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "average": () => (/* binding */ average),
/* harmony export */   "averageBy": () => (/* binding */ averageBy),
/* harmony export */   "cache": () => (/* binding */ cache),
/* harmony export */   "cast": () => (/* binding */ cast),
/* harmony export */   "checkNonNull": () => (/* binding */ checkNonNull),
/* harmony export */   "choose": () => (/* binding */ choose),
/* harmony export */   "chunkBySize": () => (/* binding */ chunkBySize),
/* harmony export */   "collect": () => (/* binding */ collect),
/* harmony export */   "compareWith": () => (/* binding */ compareWith),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "contains": () => (/* binding */ contains),
/* harmony export */   "delay": () => (/* binding */ delay),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "enumerateFromFunctions": () => (/* binding */ enumerateFromFunctions),
/* harmony export */   "enumerateThenFinally": () => (/* binding */ enumerateThenFinally),
/* harmony export */   "enumerateUsing": () => (/* binding */ enumerateUsing),
/* harmony export */   "enumerateWhile": () => (/* binding */ enumerateWhile),
/* harmony export */   "exactlyOne": () => (/* binding */ exactlyOne),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "exists2": () => (/* binding */ exists2),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findBack": () => (/* binding */ findBack),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "findIndexBack": () => (/* binding */ findIndexBack),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "fold2": () => (/* binding */ fold2),
/* harmony export */   "foldBack": () => (/* binding */ foldBack),
/* harmony export */   "foldBack2": () => (/* binding */ foldBack2),
/* harmony export */   "forAll": () => (/* binding */ forAll),
/* harmony export */   "forAll2": () => (/* binding */ forAll2),
/* harmony export */   "generate": () => (/* binding */ generate),
/* harmony export */   "generateIndexed": () => (/* binding */ generateIndexed),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "indexNotFound": () => (/* binding */ indexNotFound),
/* harmony export */   "indexed": () => (/* binding */ indexed),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "initializeInfinite": () => (/* binding */ initializeInfinite),
/* harmony export */   "insertAt": () => (/* binding */ insertAt),
/* harmony export */   "insertManyAt": () => (/* binding */ insertManyAt),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "item": () => (/* binding */ item),
/* harmony export */   "iterate": () => (/* binding */ iterate),
/* harmony export */   "iterate2": () => (/* binding */ iterate2),
/* harmony export */   "iterateIndexed": () => (/* binding */ iterateIndexed),
/* harmony export */   "iterateIndexed2": () => (/* binding */ iterateIndexed2),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "map2": () => (/* binding */ map2),
/* harmony export */   "map3": () => (/* binding */ map3),
/* harmony export */   "mapFold": () => (/* binding */ mapFold),
/* harmony export */   "mapFoldBack": () => (/* binding */ mapFoldBack),
/* harmony export */   "mapIndexed": () => (/* binding */ mapIndexed),
/* harmony export */   "mapIndexed2": () => (/* binding */ mapIndexed2),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "maxBy": () => (/* binding */ maxBy),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "minBy": () => (/* binding */ minBy),
/* harmony export */   "mkSeq": () => (/* binding */ mkSeq),
/* harmony export */   "ofArray": () => (/* binding */ ofArray),
/* harmony export */   "ofList": () => (/* binding */ ofList),
/* harmony export */   "ofSeq": () => (/* binding */ ofSeq),
/* harmony export */   "pairwise": () => (/* binding */ pairwise),
/* harmony export */   "permute": () => (/* binding */ permute),
/* harmony export */   "pick": () => (/* binding */ pick),
/* harmony export */   "readOnly": () => (/* binding */ readOnly),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceBack": () => (/* binding */ reduceBack),
/* harmony export */   "removeAt": () => (/* binding */ removeAt),
/* harmony export */   "removeManyAt": () => (/* binding */ removeManyAt),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "scan": () => (/* binding */ scan),
/* harmony export */   "scanBack": () => (/* binding */ scanBack),
/* harmony export */   "singleton": () => (/* binding */ singleton),
/* harmony export */   "skip": () => (/* binding */ skip),
/* harmony export */   "skipWhile": () => (/* binding */ skipWhile),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "sortByDescending": () => (/* binding */ sortByDescending),
/* harmony export */   "sortDescending": () => (/* binding */ sortDescending),
/* harmony export */   "sortWith": () => (/* binding */ sortWith),
/* harmony export */   "splitInto": () => (/* binding */ splitInto),
/* harmony export */   "sum": () => (/* binding */ sum),
/* harmony export */   "sumBy": () => (/* binding */ sumBy),
/* harmony export */   "tail": () => (/* binding */ tail),
/* harmony export */   "take": () => (/* binding */ take),
/* harmony export */   "takeWhile": () => (/* binding */ takeWhile),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "toList": () => (/* binding */ toList),
/* harmony export */   "transpose": () => (/* binding */ transpose),
/* harmony export */   "truncate": () => (/* binding */ truncate),
/* harmony export */   "tryExactlyOne": () => (/* binding */ tryExactlyOne),
/* harmony export */   "tryFind": () => (/* binding */ tryFind),
/* harmony export */   "tryFindBack": () => (/* binding */ tryFindBack),
/* harmony export */   "tryFindIndex": () => (/* binding */ tryFindIndex),
/* harmony export */   "tryFindIndexBack": () => (/* binding */ tryFindIndexBack),
/* harmony export */   "tryHead": () => (/* binding */ tryHead),
/* harmony export */   "tryItem": () => (/* binding */ tryItem),
/* harmony export */   "tryLast": () => (/* binding */ tryLast),
/* harmony export */   "tryPick": () => (/* binding */ tryPick),
/* harmony export */   "unfold": () => (/* binding */ unfold),
/* harmony export */   "updateAt": () => (/* binding */ updateAt),
/* harmony export */   "where": () => (/* binding */ where),
/* harmony export */   "windowed": () => (/* binding */ windowed),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "zip3": () => (/* binding */ zip3)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Types.js");
/* harmony import */ var _Reflection_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Reflection.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Reflection.js");
/* harmony import */ var _Option_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Option.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Option.js");
/* harmony import */ var _FSharp_Core_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FSharp.Core.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/FSharp.Core.js");
/* harmony import */ var _Array_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Array.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Array.js");
/* harmony import */ var _List_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./List.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/List.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Global.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Global.js");








const SR_enumerationAlreadyFinished = "Enumeration already finished.";
const SR_enumerationNotStarted = "Enumeration has not started. Call MoveNext.";
const SR_inputSequenceEmpty = "The input sequence was empty.";
const SR_inputSequenceTooLong = "The input sequence contains more than one element.";
const SR_keyNotFoundAlt = "An index satisfying the predicate was not found in the collection.";
const SR_notEnoughElements = "The input sequence has an insufficient number of elements.";
const SR_resetNotSupported = "Reset is not supported on this enumerator.";
function Enumerator_noReset() {
  throw new Error(SR_resetNotSupported);
}
function Enumerator_notStarted() {
  throw new Error(SR_enumerationNotStarted);
}
function Enumerator_alreadyFinished() {
  throw new Error(SR_enumerationAlreadyFinished);
}
class Enumerator_Seq {
  constructor(f) {
    this.f = f;
  }
  toString() {
    const xs = this;
    let i = 0;
    let str = "seq [";
    const e = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(xs);
    try {
      while (i < 4 && e["System.Collections.IEnumerator.MoveNext"]()) {
        if (i > 0) {
          str = str + "; ";
        }
        str = str + (0,_Types_js__WEBPACK_IMPORTED_MODULE_1__.toString)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        i = i + 1 | 0;
      }
      if (i === 4) {
        str = str + "; ...";
      }
      return str + "]";
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    }
  }
  GetEnumerator() {
    const x = this;
    return x.f();
  }
  [Symbol.iterator]() {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.toIterator)((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(this));
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const x = this;
    return x.f();
  }
}
function Enumerator_Seq_$reflection(gen0) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_2__.class_type)("SeqModule.Enumerator.Seq", [gen0], Enumerator_Seq);
}
function Enumerator_Seq_$ctor_673A07F2(f) {
  return new Enumerator_Seq(f);
}
class Enumerator_FromFunctions$1 {
  constructor(current, next, dispose) {
    this.current = current;
    this.next = next;
    this.dispose = dispose;
  }
  "System.Collections.Generic.IEnumerator`1.get_Current"() {
    const _ = this;
    return _.current();
  }
  "System.Collections.IEnumerator.get_Current"() {
    const _ = this;
    return _.current();
  }
  "System.Collections.IEnumerator.MoveNext"() {
    const _ = this;
    return _.next();
  }
  "System.Collections.IEnumerator.Reset"() {
    Enumerator_noReset();
  }
  Dispose() {
    const _ = this;
    _.dispose();
  }
}
function Enumerator_FromFunctions$1_$reflection(gen0) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_2__.class_type)("SeqModule.Enumerator.FromFunctions`1", [gen0], Enumerator_FromFunctions$1);
}
function Enumerator_FromFunctions$1_$ctor_58C54629(current, next, dispose) {
  return new Enumerator_FromFunctions$1(current, next, dispose);
}
function Enumerator_cast(e) {
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => e["System.Collections.Generic.IEnumerator`1.get_Current"](), () => e["System.Collections.IEnumerator.MoveNext"](), () => {
    const e_1 = e;
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function Enumerator_concat(sources) {
  let outerOpt = void 0;
  let innerOpt = void 0;
  let started = false;
  let finished = false;
  let curr = void 0;
  const finish = () => {
    finished = true;
    if (innerOpt != null) {
      const inner = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(innerOpt);
      try {
        (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(inner);
      } finally {
        innerOpt = void 0;
      }
    }
    if (outerOpt != null) {
      const outer = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(outerOpt);
      try {
        (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(outer);
      } finally {
        outerOpt = void 0;
      }
    }
  };
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => {
    if (!started) {
      Enumerator_notStarted();
    } else if (finished) {
      Enumerator_alreadyFinished();
    }
    if (curr != null) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr);
    } else {
      return Enumerator_alreadyFinished();
    }
  }, () => {
    let copyOfStruct;
    if (!started) {
      started = true;
    }
    if (finished) {
      return false;
    } else {
      let res = void 0;
      while (res == null) {
        const outerOpt_1 = outerOpt;
        const innerOpt_1 = innerOpt;
        if (outerOpt_1 != null) {
          if (innerOpt_1 != null) {
            const inner_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(innerOpt_1);
            if (inner_1["System.Collections.IEnumerator.MoveNext"]()) {
              curr = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(inner_1["System.Collections.Generic.IEnumerator`1.get_Current"]());
              res = true;
            } else {
              try {
                (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(inner_1);
              } finally {
                innerOpt = void 0;
              }
            }
          } else {
            const outer_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(outerOpt_1);
            if (outer_1["System.Collections.IEnumerator.MoveNext"]()) {
              const ie = outer_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
              innerOpt = (copyOfStruct = ie, (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(copyOfStruct));
            } else {
              finish();
              res = false;
            }
          }
        } else {
          outerOpt = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(sources);
        }
      }
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(res);
    }
  }, () => {
    if (!finished) {
      finish();
    }
  });
}
function Enumerator_enumerateThenFinally(f, e) {
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => e["System.Collections.Generic.IEnumerator`1.get_Current"](), () => e["System.Collections.IEnumerator.MoveNext"](), () => {
    try {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    } finally {
      f();
    }
  });
}
function Enumerator_generateWhileSome(openf, compute, closef) {
  let started = false;
  let curr = void 0;
  let state = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(openf());
  const dispose = () => {
    if (state != null) {
      const x_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(state);
      try {
        closef(x_1);
      } finally {
        state = void 0;
      }
    }
  };
  const finish = () => {
    try {
      dispose();
    } finally {
      curr = void 0;
    }
  };
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => {
    if (!started) {
      Enumerator_notStarted();
    }
    if (curr != null) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr);
    } else {
      return Enumerator_alreadyFinished();
    }
  }, () => {
    if (!started) {
      started = true;
    }
    if (state != null) {
      const s = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(state);
      let matchValue_1;
      try {
        matchValue_1 = compute(s);
      } catch (matchValue) {
        finish();
        throw matchValue;
      }
      if (matchValue_1 != null) {
        curr = matchValue_1;
        return true;
      } else {
        finish();
        return false;
      }
    } else {
      return false;
    }
  }, dispose);
}
function Enumerator_unfold(f, state) {
  let curr = void 0;
  let acc = state;
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => {
    if (curr != null) {
      const x = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr)[0];
      const st = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr)[1];
      return x;
    } else {
      return Enumerator_notStarted();
    }
  }, () => {
    curr = f(acc);
    if (curr != null) {
      const x_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr)[0];
      const st_1 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(curr)[1];
      acc = st_1;
      return true;
    } else {
      return false;
    }
  }, () => {});
}
function indexNotFound() {
  throw new Error(SR_keyNotFoundAlt);
}
function checkNonNull(argName, arg) {
  if (arg == null) {
    (0,_FSharp_Core_js__WEBPACK_IMPORTED_MODULE_4__.Operators_NullArg)(argName);
  }
}
function mkSeq(f) {
  return Enumerator_Seq_$ctor_673A07F2(f);
}
function ofSeq(xs) {
  checkNonNull("source", xs);
  return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(xs);
}
function delay(generator) {
  return mkSeq(() => (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(generator()));
}
function concat(sources) {
  return mkSeq(() => Enumerator_concat(sources));
}
function unfold(generator, state) {
  return mkSeq(() => Enumerator_unfold(generator, state));
}
function empty() {
  return delay(() => new Array(0));
}
function singleton(x) {
  return delay(() => (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.singleton)(x));
}
function ofArray(arr) {
  return arr;
}
function toArray(xs) {
  if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    const a = xs;
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.toArray)(a);
  } else {
    return Array.from(xs);
  }
}
function ofList(xs) {
  return xs;
}
function toList(xs) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(xs)) {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.ofArray)(xs);
  } else if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    return xs;
  } else {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.ofSeq)(xs);
  }
}
function generate(create, compute, dispose) {
  return mkSeq(() => Enumerator_generateWhileSome(create, compute, dispose));
}
function generateIndexed(create, compute, dispose) {
  return mkSeq(() => {
    let i = -1;
    return Enumerator_generateWhileSome(create, x => {
      i = i + 1 | 0;
      return compute(i, x);
    }, dispose);
  });
}
function append(xs, ys) {
  return concat([xs, ys]);
}
function cast(xs) {
  return mkSeq(() => {
    checkNonNull("source", xs);
    return Enumerator_cast((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(xs));
  });
}
function choose(chooser, xs) {
  return generate(() => ofSeq(xs), e => {
    let curr = void 0;
    while (curr == null && e["System.Collections.IEnumerator.MoveNext"]()) {
      curr = chooser(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return curr;
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function compareWith(comparer, xs, ys) {
  const e1 = ofSeq(xs);
  try {
    const e2 = ofSeq(ys);
    try {
      let c = 0;
      let b1 = e1["System.Collections.IEnumerator.MoveNext"]();
      let b2 = e2["System.Collections.IEnumerator.MoveNext"]();
      while (c === 0 && b1 && b2) {
        c = comparer(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]()) | 0;
        if (c === 0) {
          b1 = e1["System.Collections.IEnumerator.MoveNext"]();
          b2 = e2["System.Collections.IEnumerator.MoveNext"]();
        }
      }
      return (c !== 0 ? c : b1 ? 1 : b2 ? -1 : 0) | 0;
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e2);
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e1);
  }
}
function contains(value, xs, comparer) {
  const e = ofSeq(xs);
  try {
    let found = false;
    while (!found && e["System.Collections.IEnumerator.MoveNext"]()) {
      found = comparer.Equals(value, e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return found;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function enumerateFromFunctions(create, moveNext, current) {
  return generate(create, x => moveNext(x) ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(current(x)) : void 0, x_1 => {
    const matchValue = x_1;
    if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isDisposable)(matchValue)) {
      const id = matchValue;
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(id);
    }
  });
}
function enumerateThenFinally(source, compensation) {
  const compensation_1 = compensation;
  return mkSeq(() => {
    try {
      return Enumerator_enumerateThenFinally(compensation_1, ofSeq(source));
    } catch (matchValue) {
      compensation_1();
      throw matchValue;
    }
  });
}
function enumerateUsing(resource, source) {
  const compensation = () => {
    if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(resource, (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.defaultOf)())) {} else {
      let copyOfStruct = resource;
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(copyOfStruct);
    }
  };
  return mkSeq(() => {
    try {
      return Enumerator_enumerateThenFinally(compensation, ofSeq(source(resource)));
    } catch (matchValue_1) {
      compensation();
      throw matchValue_1;
    }
  });
}
function enumerateWhile(guard, xs) {
  return concat(unfold(i => guard() ? [xs, i + 1] : void 0, 0));
}
function filter(f, xs) {
  return choose(x => {
    if (f(x)) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(x);
    } else {
      return void 0;
    }
  }, xs);
}
function exists(predicate, xs) {
  const e = ofSeq(xs);
  try {
    let found = false;
    while (!found && e["System.Collections.IEnumerator.MoveNext"]()) {
      found = predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return found;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function exists2(predicate, xs, ys) {
  const e1 = ofSeq(xs);
  try {
    const e2 = ofSeq(ys);
    try {
      let found = false;
      while (!found && e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]()) {
        found = predicate(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]());
      }
      return found;
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e2);
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e1);
  }
}
function exactlyOne(xs) {
  const e = ofSeq(xs);
  try {
    if (e["System.Collections.IEnumerator.MoveNext"]()) {
      const v = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
      if (e["System.Collections.IEnumerator.MoveNext"]()) {
        throw new Error(SR_inputSequenceTooLong + "\\nParameter name: " + "source");
      } else {
        return v;
      }
    } else {
      throw new Error(SR_inputSequenceEmpty + "\\nParameter name: " + "source");
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function tryExactlyOne(xs) {
  const e = ofSeq(xs);
  try {
    if (e["System.Collections.IEnumerator.MoveNext"]()) {
      const v = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
      return e["System.Collections.IEnumerator.MoveNext"]() ? void 0 : (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(v);
    } else {
      return void 0;
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function tryFind(predicate, xs) {
  const e = ofSeq(xs);
  try {
    let res = void 0;
    while (res == null && e["System.Collections.IEnumerator.MoveNext"]()) {
      const c = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
      if (predicate(c)) {
        res = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(c);
      }
    }
    return res;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function find(predicate, xs) {
  const matchValue = tryFind(predicate, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function tryFindBack(predicate, xs) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.tryFindBack)(predicate, toArray(xs));
}
function findBack(predicate, xs) {
  const matchValue = tryFindBack(predicate, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function tryFindIndex(predicate, xs) {
  const e = ofSeq(xs);
  try {
    const loop = i_mut => {
      loop: while (true) {
        const i = i_mut;
        if (e["System.Collections.IEnumerator.MoveNext"]()) {
          if (predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) {
            return i;
          } else {
            i_mut = i + 1;
            continue loop;
          }
        } else {
          return void 0;
        }
        break;
      }
    };
    return loop(0);
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function findIndex(predicate, xs) {
  const matchValue = tryFindIndex(predicate, xs);
  if (matchValue == null) {
    indexNotFound();
    return -1;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue) | 0;
  }
}
function tryFindIndexBack(predicate, xs) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.tryFindIndexBack)(predicate, toArray(xs));
}
function findIndexBack(predicate, xs) {
  const matchValue = tryFindIndexBack(predicate, xs);
  if (matchValue == null) {
    indexNotFound();
    return -1;
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue) | 0;
  }
}
function fold(folder, state, xs) {
  const e = ofSeq(xs);
  try {
    let acc = state;
    while (e["System.Collections.IEnumerator.MoveNext"]()) {
      acc = folder(acc, e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return acc;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function foldBack(folder, xs, state) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.foldBack)(folder, toArray(xs), state);
}
function fold2(folder, state, xs, ys) {
  const e1 = ofSeq(xs);
  try {
    const e2 = ofSeq(ys);
    try {
      let acc = state;
      while (e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]()) {
        acc = folder(acc, e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]());
      }
      return acc;
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e2);
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e1);
  }
}
function foldBack2(folder, xs, ys, state) {
  return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.foldBack2)(folder, toArray(xs), toArray(ys), state);
}
function forAll(predicate, xs) {
  return !exists(x => !predicate(x), xs);
}
function forAll2(predicate, xs, ys) {
  return !exists2((x, y) => !predicate(x, y), xs, ys);
}
function tryHead(xs) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(xs)) {
    return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.tryHead)(xs);
  } else if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.tryHead)(xs);
  } else {
    const e = ofSeq(xs);
    try {
      return e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : void 0;
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    }
  }
}
function head(xs) {
  const matchValue = tryHead(xs);
  if (matchValue == null) {
    throw new Error(SR_inputSequenceEmpty + "\\nParameter name: " + "source");
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function initialize(count, f) {
  return unfold(i => i < count ? [f(i), i + 1] : void 0, 0);
}
function initializeInfinite(f) {
  return initialize(2147483647, f);
}
function isEmpty(xs) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(xs)) {
    const a = xs;
    return a.length === 0;
  } else if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(xs);
  } else {
    const e = ofSeq(xs);
    try {
      return !e["System.Collections.IEnumerator.MoveNext"]();
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    }
  }
}
function tryItem(index, xs) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(xs)) {
    return (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.tryItem)(index, xs);
  } else if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.tryItem)(index, xs);
  } else {
    const e = ofSeq(xs);
    try {
      const loop = index_1_mut => {
        loop: while (true) {
          const index_1 = index_1_mut;
          if (!e["System.Collections.IEnumerator.MoveNext"]()) {
            return void 0;
          } else if (index_1 === 0) {
            return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
          } else {
            index_1_mut = index_1 - 1;
            continue loop;
          }
          break;
        }
      };
      return loop(index);
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    }
  }
}
function item(index, xs) {
  const matchValue = tryItem(index, xs);
  if (matchValue == null) {
    throw new Error(SR_notEnoughElements + "\\nParameter name: " + "index");
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function iterate(action, xs) {
  fold((unitVar, x) => {
    action(x);
  }, void 0, xs);
}
function iterate2(action, xs, ys) {
  fold2((unitVar, x, y) => {
    action(x, y);
  }, void 0, xs, ys);
}
function iterateIndexed(action, xs) {
  fold((i, x) => {
    action(i, x);
    return i + 1 | 0;
  }, 0, xs);
}
function iterateIndexed2(action, xs, ys) {
  fold2((i, x, y) => {
    action(i, x, y);
    return i + 1 | 0;
  }, 0, xs, ys);
}
function tryLast(xs) {
  const e = ofSeq(xs);
  try {
    const loop = acc_mut => {
      loop: while (true) {
        const acc = acc_mut;
        if (!e["System.Collections.IEnumerator.MoveNext"]()) {
          return acc;
        } else {
          acc_mut = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
          continue loop;
        }
        break;
      }
    };
    return e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(loop(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function last(xs) {
  const matchValue = tryLast(xs);
  if (matchValue == null) {
    throw new Error(SR_notEnoughElements + "\\nParameter name: " + "source");
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function length(xs) {
  if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(xs)) {
    const a = xs;
    return a.length | 0;
  } else if (xs instanceof _List_js__WEBPACK_IMPORTED_MODULE_6__.FSharpList) {
    return (0,_List_js__WEBPACK_IMPORTED_MODULE_6__.length)(xs) | 0;
  } else {
    const e = ofSeq(xs);
    try {
      let count = 0;
      while (e["System.Collections.IEnumerator.MoveNext"]()) {
        count = count + 1 | 0;
      }
      return count | 0;
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
    }
  }
}
function map(mapping, xs) {
  return generate(() => ofSeq(xs), e => e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(mapping(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function mapIndexed(mapping, xs) {
  return generateIndexed(() => ofSeq(xs), (i, e) => e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(mapping(i, e["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function indexed(xs) {
  return mapIndexed((i, x) => [i, x], xs);
}
function map2(mapping, xs, ys) {
  return generate(() => [ofSeq(xs), ofSeq(ys)], tupledArg => {
    const e1 = tupledArg[0];
    const e2 = tupledArg[1];
    return e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(mapping(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0;
  }, tupledArg_1 => {
    try {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[0]);
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[1]);
    }
  });
}
function mapIndexed2(mapping, xs, ys) {
  return generateIndexed(() => [ofSeq(xs), ofSeq(ys)], (i, tupledArg) => {
    const e1 = tupledArg[0];
    const e2 = tupledArg[1];
    return e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(mapping(i, e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0;
  }, tupledArg_1 => {
    try {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[0]);
    } finally {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[1]);
    }
  });
}
function map3(mapping, xs, ys, zs) {
  return generate(() => [ofSeq(xs), ofSeq(ys), ofSeq(zs)], tupledArg => {
    const e1 = tupledArg[0];
    const e2 = tupledArg[1];
    const e3 = tupledArg[2];
    return e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]() && e3["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(mapping(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"](), e3["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0;
  }, tupledArg_1 => {
    try {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[0]);
    } finally {
      try {
        (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[1]);
      } finally {
        (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[2]);
      }
    }
  });
}
function readOnly(xs) {
  checkNonNull("source", xs);
  return map(x => x, xs);
}
class CachedSeq$1 {
  constructor(cleanup, res) {
    this.cleanup = cleanup;
    this.res = res;
  }
  Dispose() {
    const _ = this;
    _.cleanup();
  }
  GetEnumerator() {
    const _ = this;
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(_.res);
  }
  [Symbol.iterator]() {
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.toIterator)((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(this));
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const _ = this;
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(_.res);
  }
}
function CachedSeq$1_$reflection(gen0) {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_2__.class_type)("SeqModule.CachedSeq`1", [gen0], CachedSeq$1);
}
function CachedSeq$1_$ctor_Z7A8347D4(cleanup, res) {
  return new CachedSeq$1(cleanup, res);
}
function CachedSeq$1__Clear(_) {
  _.cleanup();
}
function cache(source) {
  checkNonNull("source", source);
  const prefix = [];
  let enumeratorR = void 0;
  return CachedSeq$1_$ctor_Z7A8347D4(() => {
    (0,_FSharp_Core_js__WEBPACK_IMPORTED_MODULE_4__.Operators_Lock)(prefix, () => {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.clear)(prefix);
      let matchResult, e;
      if (enumeratorR != null) {
        if ((0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(enumeratorR) != null) {
          matchResult = 0;
          e = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)((0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(enumeratorR));
        } else {
          matchResult = 1;
        }
      } else {
        matchResult = 1;
      }
      switch (matchResult) {
        case 0:
          {
            (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
            break;
          }
      }
      enumeratorR = void 0;
    });
  }, unfold(i_1 => (0,_FSharp_Core_js__WEBPACK_IMPORTED_MODULE_4__.Operators_Lock)(prefix, () => {
    if (i_1 < prefix.length) {
      return [prefix[i_1], i_1 + 1];
    } else {
      if (i_1 >= prefix.length) {
        let optEnumerator_2;
        if (enumeratorR != null) {
          optEnumerator_2 = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(enumeratorR);
        } else {
          const optEnumerator = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.getEnumerator)(source);
          enumeratorR = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(optEnumerator);
          optEnumerator_2 = optEnumerator;
        }
        if (optEnumerator_2 == null) {} else {
          const enumerator = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(optEnumerator_2);
          if (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            void prefix.push(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]());
          } else {
            (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(enumerator);
            enumeratorR = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(void 0);
          }
        }
      }
      if (i_1 < prefix.length) {
        return [prefix[i_1], i_1 + 1];
      } else {
        return void 0;
      }
    }
  }), 0));
}
function allPairs(xs, ys) {
  const ysCache = cache(ys);
  return delay(() => concat(map(x => map(y => [x, y], ysCache), xs)));
}
function mapFold(mapping, state, xs) {
  const patternInput = (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.mapFold)(mapping, state, toArray(xs));
  return [readOnly(patternInput[0]), patternInput[1]];
}
function mapFoldBack(mapping, xs, state) {
  const patternInput = (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.mapFoldBack)(mapping, toArray(xs), state);
  return [readOnly(patternInput[0]), patternInput[1]];
}
function tryPick(chooser, xs) {
  const e = ofSeq(xs);
  try {
    let res = void 0;
    while (res == null && e["System.Collections.IEnumerator.MoveNext"]()) {
      res = chooser(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return res;
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function pick(chooser, xs) {
  const matchValue = tryPick(chooser, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(matchValue);
  }
}
function reduce(folder, xs) {
  const e = ofSeq(xs);
  try {
    const loop = acc_mut => {
      loop: while (true) {
        const acc = acc_mut;
        if (e["System.Collections.IEnumerator.MoveNext"]()) {
          acc_mut = folder(acc, e["System.Collections.Generic.IEnumerator`1.get_Current"]());
          continue loop;
        } else {
          return acc;
        }
        break;
      }
    };
    if (e["System.Collections.IEnumerator.MoveNext"]()) {
      return loop(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    } else {
      throw new Error(SR_inputSequenceEmpty);
    }
  } finally {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
  }
}
function reduceBack(folder, xs) {
  const arr = toArray(xs);
  if (arr.length > 0) {
    return arr.reduceRight(folder);
  } else {
    throw new Error(SR_inputSequenceEmpty);
  }
}
function replicate(n, x) {
  return initialize(n, _arg => x);
}
function reverse(xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.reverse)(toArray(xs))));
}
function scan(folder, state, xs) {
  return delay(() => {
    let acc = state;
    return concat([singleton(state), map(x => {
      acc = folder(acc, x);
      return acc;
    }, xs)]);
  });
}
function scanBack(folder, xs, state) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.scanBack)(folder, toArray(xs), state)));
}
function skip(count, source) {
  return mkSeq(() => {
    const e = ofSeq(source);
    try {
      for (let _ = 1; _ <= count; _++) {
        if (!e["System.Collections.IEnumerator.MoveNext"]()) {
          throw new Error(SR_notEnoughElements + "\\nParameter name: " + "source");
        }
      }
      return Enumerator_enumerateThenFinally(() => {}, e);
    } catch (matchValue) {
      (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e);
      throw matchValue;
    }
  });
}
function skipWhile(predicate, xs) {
  return delay(() => {
    let skipped = true;
    return filter(x => {
      if (skipped) {
        skipped = predicate(x);
      }
      return !skipped;
    }, xs);
  });
}
function tail(xs) {
  return skip(1, xs);
}
function take(count, xs) {
  return generateIndexed(() => ofSeq(xs), (i, e) => {
    if (i < count) {
      if (e["System.Collections.IEnumerator.MoveNext"]()) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
      } else {
        throw new Error(SR_notEnoughElements + "\\nParameter name: " + "source");
      }
    } else {
      return void 0;
    }
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function takeWhile(predicate, xs) {
  return generate(() => ofSeq(xs), e => e["System.Collections.IEnumerator.MoveNext"]() && predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : void 0, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function truncate(count, xs) {
  return generateIndexed(() => ofSeq(xs), (i, e) => i < count && e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : void 0, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function zip(xs, ys) {
  return map2((x, y) => [x, y], xs, ys);
}
function zip3(xs, ys, zs) {
  return map3((x, y, z) => [x, y, z], xs, ys, zs);
}
function collect(mapping, xs) {
  return delay(() => concat(map(mapping, xs)));
}
function where(predicate, xs) {
  return filter(predicate, xs);
}
function pairwise(xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.pairwise)(toArray(xs))));
}
function splitInto(chunks, xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.splitInto)(chunks, toArray(xs))));
}
function windowed(windowSize, xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.windowed)(windowSize, toArray(xs))));
}
function transpose(xss) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.map)(ofArray, (0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.transpose)((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.map)(toArray, toArray(xss))))));
}
function sortWith(comparer, xs) {
  return delay(() => {
    const arr = toArray(xs);
    arr.sort(comparer);
    return ofArray(arr);
  });
}
function sort(xs, comparer) {
  return sortWith((x, y) => comparer.Compare(x, y), xs);
}
function sortBy(projection, xs, comparer) {
  return sortWith((x, y) => comparer.Compare(projection(x), projection(y)), xs);
}
function sortDescending(xs, comparer) {
  return sortWith((x, y) => comparer.Compare(x, y) * -1, xs);
}
function sortByDescending(projection, xs, comparer) {
  return sortWith((x, y) => comparer.Compare(projection(x), projection(y)) * -1, xs);
}
function sum(xs, adder) {
  return fold((acc, x) => adder.Add(acc, x), adder.GetZero(), xs);
}
function sumBy(f, xs, adder) {
  return fold((acc, x) => adder.Add(acc, f(x)), adder.GetZero(), xs);
}
function maxBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? y : x, xs);
}
function max(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? y : x, xs);
}
function minBy(projection, xs, comparer) {
  return reduce((x, y) => comparer.Compare(projection(y), projection(x)) > 0 ? x : y, xs);
}
function min(xs, comparer) {
  return reduce((x, y) => comparer.Compare(y, x) > 0 ? x : y, xs);
}
function average(xs, averager) {
  let count = 0;
  const total = fold((acc, x) => {
    count = count + 1 | 0;
    return averager.Add(acc, x);
  }, averager.GetZero(), xs);
  if (count === 0) {
    throw new Error(SR_inputSequenceEmpty + "\\nParameter name: " + "source");
  } else {
    return averager.DivideByInt(total, count);
  }
}
function averageBy(f, xs, averager) {
  let count = 0;
  const total = fold((acc, x) => {
    count = count + 1 | 0;
    return averager.Add(acc, f(x));
  }, averager.GetZero(), xs);
  if (count === 0) {
    throw new Error(SR_inputSequenceEmpty + "\\nParameter name: " + "source");
  } else {
    return averager.DivideByInt(total, count);
  }
}
function permute(f, xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.permute)(f, toArray(xs))));
}
function chunkBySize(chunkSize, xs) {
  return delay(() => ofArray((0,_Array_js__WEBPACK_IMPORTED_MODULE_5__.chunkBySize)(chunkSize, toArray(xs))));
}
function insertAt(index, y, xs) {
  let isDone = false;
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return generateIndexed(() => ofSeq(xs), (i, e) => {
    if ((isDone ? true : i < index) && e["System.Collections.IEnumerator.MoveNext"]()) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    } else if (i === index) {
      isDone = true;
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(y);
    } else {
      if (!isDone) {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
      }
      return void 0;
    }
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function insertManyAt(index, ys, xs) {
  let status = -1;
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return generateIndexed(() => [ofSeq(xs), ofSeq(ys)], (i, tupledArg) => {
    const e1 = tupledArg[0];
    const e2 = tupledArg[1];
    if (i === index) {
      status = 0;
    }
    let inserted;
    if (status === 0) {
      if (e2["System.Collections.IEnumerator.MoveNext"]()) {
        inserted = (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e2["System.Collections.Generic.IEnumerator`1.get_Current"]());
      } else {
        status = 1;
        inserted = void 0;
      }
    } else {
      inserted = void 0;
    }
    if (inserted == null) {
      if (e1["System.Collections.IEnumerator.MoveNext"]()) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e1["System.Collections.Generic.IEnumerator`1.get_Current"]());
      } else {
        if (status < 1) {
          throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
        }
        return void 0;
      }
    } else {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)((0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.value)(inserted));
    }
  }, tupledArg_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[0]);
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(tupledArg_1[1]);
  });
}
function removeAt(index, xs) {
  let isDone = false;
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return generateIndexed(() => ofSeq(xs), (i, e) => {
    if ((isDone ? true : i < index) && e["System.Collections.IEnumerator.MoveNext"]()) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    } else if (i === index && e["System.Collections.IEnumerator.MoveNext"]()) {
      isDone = true;
      return e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : void 0;
    } else {
      if (!isDone) {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
      }
      return void 0;
    }
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function removeManyAt(index, count, xs) {
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return generateIndexed(() => ofSeq(xs), (i, e) => {
    if (i < index) {
      if (e["System.Collections.IEnumerator.MoveNext"]()) {
        return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
      } else {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
      }
    } else {
      if (i === index) {
        for (let _ = 1; _ <= count; _++) {
          if (!e["System.Collections.IEnumerator.MoveNext"]()) {
            throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "count");
          }
        }
      }
      return e["System.Collections.IEnumerator.MoveNext"]() ? (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : void 0;
    }
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}
function updateAt(index, y, xs) {
  let isDone = false;
  if (index < 0) {
    throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
  }
  return generateIndexed(() => ofSeq(xs), (i, e) => {
    if ((isDone ? true : i < index) && e["System.Collections.IEnumerator.MoveNext"]()) {
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    } else if (i === index && e["System.Collections.IEnumerator.MoveNext"]()) {
      isDone = true;
      return (0,_Option_js__WEBPACK_IMPORTED_MODULE_3__.some)(y);
    } else {
      if (!isDone) {
        throw new Error(_Global_js__WEBPACK_IMPORTED_MODULE_7__.SR_indexOutOfBounds + "\\nParameter name: " + "index");
      }
      return void 0;
    }
  }, e_1 => {
    (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.disposeSafe)(e_1);
  });
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/String.js":
/*!******************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/String.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "compareOrdinal": () => (/* binding */ compareOrdinal),
/* harmony export */   "compareTo": () => (/* binding */ compareTo),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "endsWith": () => (/* binding */ endsWith),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "fmt": () => (/* binding */ fmt),
/* harmony export */   "fmtWith": () => (/* binding */ fmtWith),
/* harmony export */   "format": () => (/* binding */ format),
/* harmony export */   "fromBase64String": () => (/* binding */ fromBase64String),
/* harmony export */   "fsFormat": () => (/* binding */ fsFormat),
/* harmony export */   "getCharAtIndex": () => (/* binding */ getCharAtIndex),
/* harmony export */   "getFormat": () => (/* binding */ getFormat),
/* harmony export */   "indexOfAny": () => (/* binding */ indexOfAny),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "insert": () => (/* binding */ insert),
/* harmony export */   "interpolate": () => (/* binding */ interpolate),
/* harmony export */   "isNullOrEmpty": () => (/* binding */ isNullOrEmpty),
/* harmony export */   "isNullOrWhiteSpace": () => (/* binding */ isNullOrWhiteSpace),
/* harmony export */   "join": () => (/* binding */ join),
/* harmony export */   "joinWithIndices": () => (/* binding */ joinWithIndices),
/* harmony export */   "padLeft": () => (/* binding */ padLeft),
/* harmony export */   "padRight": () => (/* binding */ padRight),
/* harmony export */   "printf": () => (/* binding */ printf),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "split": () => (/* binding */ split),
/* harmony export */   "startsWith": () => (/* binding */ startsWith),
/* harmony export */   "substring": () => (/* binding */ substring),
/* harmony export */   "toBase64String": () => (/* binding */ toBase64String),
/* harmony export */   "toConsole": () => (/* binding */ toConsole),
/* harmony export */   "toConsoleError": () => (/* binding */ toConsoleError),
/* harmony export */   "toFail": () => (/* binding */ toFail),
/* harmony export */   "toText": () => (/* binding */ toText),
/* harmony export */   "trim": () => (/* binding */ trim),
/* harmony export */   "trimEnd": () => (/* binding */ trimEnd),
/* harmony export */   "trimStart": () => (/* binding */ trimStart)
/* harmony export */ });
/* harmony import */ var _Date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Date.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Date.js");
/* harmony import */ var _Numeric_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Numeric.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Numeric.js");
/* harmony import */ var _RegExp_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RegExp.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/RegExp.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Types.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Types.js");




const fsFormatRegExp = /(^|[^%])%([0+\- ]*)(\*|\d+)?(?:\.(\d+))?(\w)/g;
const interpolateRegExp = /(?:(^|[^%])%([0+\- ]*)(\d+)?(?:\.(\d+))?(\w))?%P\(\)/g;
const formatRegExp = /\{(\d+)(,-?\d+)?(?:\:([a-zA-Z])(\d{0,2})|\:(.+?))?\}/g;
function isLessThan(x, y) {
  return (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.compare)(x, y) < 0;
}
function cmp(x, y, ic) {
  function isIgnoreCase(i) {
    return i === true || i === 1 /* StringComparison.CurrentCultureIgnoreCase */ || i === 3 /* StringComparison.InvariantCultureIgnoreCase */ || i === 5 /* StringComparison.OrdinalIgnoreCase */;
  }
  function isOrdinal(i) {
    return i === 4 /* StringComparison.Ordinal */ || i === 5 /* StringComparison.OrdinalIgnoreCase */;
  }
  if (x == null) {
    return y == null ? 0 : -1;
  }
  if (y == null) {
    return 1;
  } // everything is bigger than null
  if (isOrdinal(ic)) {
    if (isIgnoreCase(ic)) {
      x = x.toLowerCase();
      y = y.toLowerCase();
    }
    return x === y ? 0 : x < y ? -1 : 1;
  } else {
    if (isIgnoreCase(ic)) {
      x = x.toLocaleLowerCase();
      y = y.toLocaleLowerCase();
    }
    return x.localeCompare(y);
  }
}
function compare(...args) {
  switch (args.length) {
    case 2:
      return cmp(args[0], args[1], false);
    case 3:
      return cmp(args[0], args[1], args[2]);
    case 4:
      return cmp(args[0], args[1], args[2] === true);
    case 5:
      return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), false);
    case 6:
      return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5]);
    case 7:
      return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5] === true);
    default:
      throw new Error("String.compare: Unsupported number of parameters");
  }
}
function compareOrdinal(x, y) {
  return cmp(x, y, 4 /* StringComparison.Ordinal */);
}
function compareTo(x, y) {
  return cmp(x, y, 0 /* StringComparison.CurrentCulture */);
}
function startsWith(str, pattern, ic) {
  if (str.length >= pattern.length) {
    return cmp(str.substr(0, pattern.length), pattern, ic) === 0;
  }
  return false;
}
function indexOfAny(str, anyOf, ...args) {
  if (str == null || str === "") {
    return -1;
  }
  const startIndex = args.length > 0 ? args[0] : 0;
  if (startIndex < 0) {
    throw new Error("Start index cannot be negative");
  }
  const length = args.length > 1 ? args[1] : str.length - startIndex;
  if (length < 0) {
    throw new Error("Length cannot be negative");
  }
  if (startIndex + length > str.length) {
    throw new Error("Invalid startIndex and length");
  }
  str = str.substring(startIndex, startIndex + length);
  for (const c of anyOf) {
    const index = str.indexOf(c);
    if (index > -1) {
      return index + startIndex;
    }
  }
  return -1;
}
function printf(input) {
  return {
    input,
    cont: fsFormat(input)
  };
}
function interpolate(str, values) {
  let valIdx = 0;
  let strIdx = 0;
  let result = "";
  interpolateRegExp.lastIndex = 0;
  let match = interpolateRegExp.exec(str);
  while (match) {
    // The first group corresponds to the no-escape char (^|[^%]), the actual pattern starts in the next char
    // Note: we don't use negative lookbehind because some browsers don't support it yet
    const matchIndex = match.index + (match[1] || "").length;
    result += str.substring(strIdx, matchIndex).replace(/%%/g, "%");
    const [,, flags, padLength, precision, format] = match;
    // Save interpolateRegExp.lastIndex before running formatReplacement because the values
    // may also involve interpolation and make use of interpolateRegExp (see #3078)
    strIdx = interpolateRegExp.lastIndex;
    result += formatReplacement(values[valIdx++], flags, padLength, precision, format);
    // Move interpolateRegExp.lastIndex one char behind to make sure we match the no-escape char next time
    interpolateRegExp.lastIndex = strIdx - 1;
    match = interpolateRegExp.exec(str);
  }
  result += str.substring(strIdx).replace(/%%/g, "%");
  return result;
}
function continuePrint(cont, arg) {
  return typeof arg === "string" ? cont(arg) : arg.cont(cont);
}
function toConsole(arg) {
  // Don't remove the lambda here, see #1357
  return continuePrint(x => console.log(x), arg);
}
function toConsoleError(arg) {
  return continuePrint(x => console.error(x), arg);
}
function toText(arg) {
  return continuePrint(x => x, arg);
}
function toFail(arg) {
  return continuePrint(x => {
    throw new Error(x);
  }, arg);
}
function formatReplacement(rep, flags, padLength, precision, format) {
  let sign = "";
  flags = flags || "";
  format = format || "";
  if ((0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.isNumeric)(rep)) {
    if (format.toLowerCase() !== "x") {
      if (isLessThan(rep, 0)) {
        rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.multiply)(rep, -1);
        sign = "-";
      } else {
        if (flags.indexOf(" ") >= 0) {
          sign = " ";
        } else if (flags.indexOf("+") >= 0) {
          sign = "+";
        }
      }
    }
    precision = precision == null ? null : parseInt(precision, 10);
    switch (format) {
      case "f":
      case "F":
        precision = precision != null ? precision : 6;
        rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toFixed)(rep, precision);
        break;
      case "g":
      case "G":
        rep = precision != null ? (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toPrecision)(rep, precision) : (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toPrecision)(rep);
        break;
      case "e":
      case "E":
        rep = precision != null ? (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toExponential)(rep, precision) : (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toExponential)(rep);
        break;
      case "x":
        rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toHex)(rep);
        break;
      case "X":
        rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toHex)(rep).toUpperCase();
        break;
      default:
        // AOid
        rep = String(rep);
        break;
    }
  } else if (rep instanceof Date) {
    rep = (0,_Date_js__WEBPACK_IMPORTED_MODULE_1__.toString)(rep);
  } else {
    rep = (0,_Types_js__WEBPACK_IMPORTED_MODULE_2__.toString)(rep);
  }
  padLength = typeof padLength === "number" ? padLength : parseInt(padLength, 10);
  if (!isNaN(padLength)) {
    const zeroFlag = flags.indexOf("0") >= 0; // Use '0' for left padding
    const minusFlag = flags.indexOf("-") >= 0; // Right padding
    const ch = minusFlag || !zeroFlag ? " " : "0";
    if (ch === "0") {
      rep = pad(rep, padLength - sign.length, ch, minusFlag);
      rep = sign + rep;
    } else {
      rep = pad(sign + rep, padLength, ch, minusFlag);
    }
  } else {
    rep = sign + rep;
  }
  return rep;
}
function createPrinter(cont, _strParts, _matches, _result = "", padArg = -1) {
  return (...args) => {
    // Make copies of the values passed by reference because the function can be used multiple times
    let result = _result;
    const strParts = _strParts.slice();
    const matches = _matches.slice();
    for (const arg of args) {
      const [,, flags, _padLength, precision, format] = matches[0];
      let padLength = _padLength;
      if (padArg >= 0) {
        padLength = padArg;
        padArg = -1;
      } else if (padLength === "*") {
        if (arg < 0) {
          throw new Error("Non-negative number required");
        }
        padArg = arg;
        continue;
      }
      result += strParts[0];
      result += formatReplacement(arg, flags, padLength, precision, format);
      strParts.splice(0, 1);
      matches.splice(0, 1);
    }
    if (matches.length === 0) {
      result += strParts[0];
      return cont(result);
    } else {
      return createPrinter(cont, strParts, matches, result, padArg);
    }
  };
}
function fsFormat(str) {
  return cont => {
    fsFormatRegExp.lastIndex = 0;
    const strParts = [];
    const matches = [];
    let strIdx = 0;
    let match = fsFormatRegExp.exec(str);
    while (match) {
      // The first group corresponds to the no-escape char (^|[^%]), the actual pattern starts in the next char
      // Note: we don't use negative lookbehind because some browsers don't support it yet
      const matchIndex = match.index + (match[1] || "").length;
      strParts.push(str.substring(strIdx, matchIndex).replace(/%%/g, "%"));
      matches.push(match);
      strIdx = fsFormatRegExp.lastIndex;
      // Likewise we need to move fsFormatRegExp.lastIndex one char behind to make sure we match the no-escape char next time
      fsFormatRegExp.lastIndex -= 1;
      match = fsFormatRegExp.exec(str);
    }
    if (strParts.length === 0) {
      return cont(str.replace(/%%/g, "%"));
    } else {
      strParts.push(str.substring(strIdx).replace(/%%/g, "%"));
      return createPrinter(cont, strParts, matches);
    }
  };
}
function format(str, ...args) {
  let str2;
  if (typeof str === "object") {
    // Called with culture info
    str2 = String(args[0]);
    args.shift();
  } else {
    str2 = str;
  }
  return str2.replace(formatRegExp, (_, idx, padLength, format, precision, pattern) => {
    if (idx < 0 || idx >= args.length) {
      throw new Error("Index must be greater or equal to zero and less than the arguments' length.");
    }
    let rep = args[idx];
    if ((0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.isNumeric)(rep)) {
      precision = precision == null ? null : parseInt(precision, 10);
      switch (format) {
        case "f":
        case "F":
          precision = precision != null ? precision : 2;
          rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toFixed)(rep, precision);
          break;
        case "g":
        case "G":
          rep = precision != null ? (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toPrecision)(rep, precision) : (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toPrecision)(rep);
          break;
        case "e":
        case "E":
          rep = precision != null ? (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toExponential)(rep, precision) : (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toExponential)(rep);
          break;
        case "p":
        case "P":
          precision = precision != null ? precision : 2;
          rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toFixed)((0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.multiply)(rep, 100), precision) + " %";
          break;
        case "d":
        case "D":
          rep = precision != null ? padLeft(String(rep), precision, "0") : String(rep);
          break;
        case "x":
        case "X":
          rep = precision != null ? padLeft((0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toHex)(rep), precision, "0") : (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toHex)(rep);
          if (format === "X") {
            rep = rep.toUpperCase();
          }
          break;
        default:
          if (pattern) {
            let sign = "";
            rep = pattern.replace(/([0#,]+)(\.[0#]+)?/, (_, intPart, decimalPart) => {
              if (isLessThan(rep, 0)) {
                rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.multiply)(rep, -1);
                sign = "-";
              }
              decimalPart = decimalPart == null ? "" : decimalPart.substring(1);
              rep = (0,_Numeric_js__WEBPACK_IMPORTED_MODULE_0__.toFixed)(rep, Math.max(decimalPart.length, 0));
              let [repInt, repDecimal] = rep.split(".");
              repDecimal || (repDecimal = "");
              const leftZeroes = intPart.replace(/,/g, "").replace(/^#+/, "").length;
              repInt = padLeft(repInt, leftZeroes, "0");
              const rightZeros = decimalPart.replace(/#+$/, "").length;
              if (rightZeros > repDecimal.length) {
                repDecimal = padRight(repDecimal, rightZeros, "0");
              } else if (rightZeros < repDecimal.length) {
                repDecimal = repDecimal.substring(0, rightZeros) + repDecimal.substring(rightZeros).replace(/0+$/, "");
              }
              // Thousands separator
              if (intPart.indexOf(",") > 0) {
                const i = repInt.length % 3;
                const thousandGroups = Math.floor(repInt.length / 3);
                let thousands = i > 0 ? repInt.substr(0, i) + (thousandGroups > 0 ? "," : "") : "";
                for (let j = 0; j < thousandGroups; j++) {
                  thousands += repInt.substr(i + j * 3, 3) + (j < thousandGroups - 1 ? "," : "");
                }
                repInt = thousands;
              }
              return repDecimal.length > 0 ? repInt + "." + repDecimal : repInt;
            });
            rep = sign + rep;
          }
      }
    } else if (rep instanceof Date) {
      rep = (0,_Date_js__WEBPACK_IMPORTED_MODULE_1__.toString)(rep, pattern || format);
    } else {
      rep = (0,_Types_js__WEBPACK_IMPORTED_MODULE_2__.toString)(rep);
    }
    padLength = parseInt((padLength || " ").substring(1), 10);
    if (!isNaN(padLength)) {
      rep = pad(String(rep), Math.abs(padLength), " ", padLength < 0);
    }
    return rep;
  });
}
function endsWith(str, search) {
  const idx = str.lastIndexOf(search);
  return idx >= 0 && idx === str.length - search.length;
}
function initialize(n, f) {
  if (n < 0) {
    throw new Error("String length must be non-negative");
  }
  const xs = new Array(n);
  for (let i = 0; i < n; i++) {
    xs[i] = f(i);
  }
  return xs.join("");
}
function insert(str, startIndex, value) {
  if (startIndex < 0 || startIndex > str.length) {
    throw new Error("startIndex is negative or greater than the length of this instance.");
  }
  return str.substring(0, startIndex) + value + str.substring(startIndex);
}
function isNullOrEmpty(str) {
  return typeof str !== "string" || str.length === 0;
}
function isNullOrWhiteSpace(str) {
  return typeof str !== "string" || /^\s*$/.test(str);
}
function concat(...xs) {
  return xs.map(x => String(x)).join("");
}
function join(delimiter, xs) {
  if (Array.isArray(xs)) {
    return xs.join(delimiter);
  } else {
    return Array.from(xs).join(delimiter);
  }
}
function joinWithIndices(delimiter, xs, startIndex, count) {
  const endIndexPlusOne = startIndex + count;
  if (endIndexPlusOne > xs.length) {
    throw new Error("Index and count must refer to a location within the buffer.");
  }
  return xs.slice(startIndex, endIndexPlusOne).join(delimiter);
}
function notSupported(name) {
  throw new Error("The environment doesn't support '" + name + "', please use a polyfill.");
}
function toBase64String(inArray) {
  let str = "";
  for (let i = 0; i < inArray.length; i++) {
    str += String.fromCharCode(inArray[i]);
  }
  return typeof btoa === "function" ? btoa(str) : notSupported("btoa");
}
function fromBase64String(b64Encoded) {
  const binary = typeof atob === "function" ? atob(b64Encoded) : notSupported("atob");
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
function pad(str, len, ch, isRight) {
  ch = ch || " ";
  len = len - str.length;
  for (let i = 0; i < len; i++) {
    str = isRight ? str + ch : ch + str;
  }
  return str;
}
function padLeft(str, len, ch) {
  return pad(str, len, ch);
}
function padRight(str, len, ch) {
  return pad(str, len, ch, true);
}
function remove(str, startIndex, count) {
  if (startIndex >= str.length) {
    throw new Error("startIndex must be less than length of string");
  }
  if (typeof count === "number" && startIndex + count > str.length) {
    throw new Error("Index and count must refer to a location within the string.");
  }
  return str.slice(0, startIndex) + (typeof count === "number" ? str.substr(startIndex + count) : "");
}
function replace(str, search, replace) {
  return str.replace(new RegExp((0,_RegExp_js__WEBPACK_IMPORTED_MODULE_3__.escape)(search), "g"), replace);
}
function replicate(n, x) {
  return initialize(n, () => x);
}
function getCharAtIndex(input, index) {
  if (index < 0 || index >= input.length) {
    throw new Error("Index was outside the bounds of the array.");
  }
  return input[index];
}
function split(str, splitters, count, options) {
  count = typeof count === "number" ? count : undefined;
  options = typeof options === "number" ? options : 0;
  if (count && count < 0) {
    throw new Error("Count cannot be less than zero");
  }
  if (count === 0) {
    return [];
  }
  const removeEmpty = (options & 1) === 1;
  const trim = (options & 2) === 2;
  splitters = splitters || [];
  splitters = splitters.filter(x => x).map(_RegExp_js__WEBPACK_IMPORTED_MODULE_3__.escape);
  splitters = splitters.length > 0 ? splitters : ["\\s"];
  const splits = [];
  const reg = new RegExp(splitters.join("|"), "g");
  let findSplits = true;
  let i = 0;
  do {
    const match = reg.exec(str);
    if (match === null) {
      const candidate = trim ? str.substring(i).trim() : str.substring(i);
      if (!removeEmpty || candidate.length > 0) {
        splits.push(candidate);
      }
      findSplits = false;
    } else {
      const candidate = trim ? str.substring(i, match.index).trim() : str.substring(i, match.index);
      if (!removeEmpty || candidate.length > 0) {
        if (count != null && splits.length + 1 === count) {
          splits.push(trim ? str.substring(i).trim() : str.substring(i));
          findSplits = false;
        } else {
          splits.push(candidate);
        }
      }
      i = reg.lastIndex;
    }
  } while (findSplits);
  return splits;
}
function trim(str, ...chars) {
  if (chars.length === 0) {
    return str.trim();
  }
  const pattern = "[" + (0,_RegExp_js__WEBPACK_IMPORTED_MODULE_3__.escape)(chars.join("")) + "]+";
  return str.replace(new RegExp("^" + pattern), "").replace(new RegExp(pattern + "$"), "");
}
function trimStart(str, ...chars) {
  return chars.length === 0 ? str.trimStart() : str.replace(new RegExp("^[" + (0,_RegExp_js__WEBPACK_IMPORTED_MODULE_3__.escape)(chars.join("")) + "]+"), "");
}
function trimEnd(str, ...chars) {
  return chars.length === 0 ? str.trimEnd() : str.replace(new RegExp("[" + (0,_RegExp_js__WEBPACK_IMPORTED_MODULE_3__.escape)(chars.join("")) + "]+$"), "");
}
function filter(pred, x) {
  return x.split("").filter(c => pred(c)).join("");
}
function substring(str, startIndex, length) {
  if (startIndex + (length || 0) > str.length) {
    throw new Error("Invalid startIndex and/or length");
  }
  return length != null ? str.substr(startIndex, length) : str.substr(startIndex);
}
function fmt(strs, ...args) {
  return {
    strs,
    args
  };
}
function fmtWith(fmts) {
  return (strs, ...args) => ({
    strs,
    args,
    fmts
  });
}
function getFormat(s) {
  return s.fmts ? s.strs.reduce((acc, newPart, index) => acc + `{${String(index - 1) + s.fmts[index - 1]}}` + newPart) : s.strs.reduce((acc, newPart, index) => acc + `{${index - 1}}` + newPart);
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/System.Text.js":
/*!***********************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/System.Text.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StringBuilder": () => (/* binding */ StringBuilder),
/* harmony export */   "StringBuilder_$ctor": () => (/* binding */ StringBuilder_$ctor),
/* harmony export */   "StringBuilder_$ctor_Z18115A39": () => (/* binding */ StringBuilder_$ctor_Z18115A39),
/* harmony export */   "StringBuilder_$ctor_Z524259A4": () => (/* binding */ StringBuilder_$ctor_Z524259A4),
/* harmony export */   "StringBuilder_$ctor_Z721C83C5": () => (/* binding */ StringBuilder_$ctor_Z721C83C5),
/* harmony export */   "StringBuilder_$reflection": () => (/* binding */ StringBuilder_$reflection),
/* harmony export */   "StringBuilder__AppendFormat_433E080": () => (/* binding */ StringBuilder__AppendFormat_433E080),
/* harmony export */   "StringBuilder__AppendFormat_Z696D8D1B": () => (/* binding */ StringBuilder__AppendFormat_Z696D8D1B),
/* harmony export */   "StringBuilder__AppendLine": () => (/* binding */ StringBuilder__AppendLine),
/* harmony export */   "StringBuilder__AppendLine_Z721C83C5": () => (/* binding */ StringBuilder__AppendLine_Z721C83C5),
/* harmony export */   "StringBuilder__Append_244C7CD6": () => (/* binding */ StringBuilder__Append_244C7CD6),
/* harmony export */   "StringBuilder__Append_43A65C09": () => (/* binding */ StringBuilder__Append_43A65C09),
/* harmony export */   "StringBuilder__Append_487EF8FB": () => (/* binding */ StringBuilder__Append_487EF8FB),
/* harmony export */   "StringBuilder__Append_4E60E31B": () => (/* binding */ StringBuilder__Append_4E60E31B),
/* harmony export */   "StringBuilder__Append_5E38073B": () => (/* binding */ StringBuilder__Append_5E38073B),
/* harmony export */   "StringBuilder__Append_Z1FBCCD16": () => (/* binding */ StringBuilder__Append_Z1FBCCD16),
/* harmony export */   "StringBuilder__Append_Z372E4D23": () => (/* binding */ StringBuilder__Append_Z372E4D23),
/* harmony export */   "StringBuilder__Append_Z524259A4": () => (/* binding */ StringBuilder__Append_Z524259A4),
/* harmony export */   "StringBuilder__Append_Z721C83C5": () => (/* binding */ StringBuilder__Append_Z721C83C5),
/* harmony export */   "StringBuilder__Clear": () => (/* binding */ StringBuilder__Clear),
/* harmony export */   "StringBuilder__Replace_Z384F8060": () => (/* binding */ StringBuilder__Replace_Z384F8060),
/* harmony export */   "StringBuilder__Replace_Z766F94C0": () => (/* binding */ StringBuilder__Replace_Z766F94C0),
/* harmony export */   "StringBuilder__ToString_Z37302880": () => (/* binding */ StringBuilder__ToString_Z37302880),
/* harmony export */   "StringBuilder__get_Length": () => (/* binding */ StringBuilder__get_Length)
/* harmony export */ });
/* harmony import */ var _String_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./String.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/String.js");
/* harmony import */ var _Reflection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reflection.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Reflection.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _Types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Types.js");




class StringBuilder {
  constructor(value, capacity) {
    this.buf = [];
    if (!(0,_String_js__WEBPACK_IMPORTED_MODULE_0__.isNullOrEmpty)(value)) {
      void this.buf.push(value);
    }
  }
  toString() {
    const _ = this;
    return (0,_String_js__WEBPACK_IMPORTED_MODULE_0__.join)("", _.buf);
  }
}
function StringBuilder_$reflection() {
  return (0,_Reflection_js__WEBPACK_IMPORTED_MODULE_1__.class_type)("System.Text.StringBuilder", void 0, StringBuilder);
}
function StringBuilder_$ctor_Z18115A39(value, capacity) {
  return new StringBuilder(value, capacity);
}
function StringBuilder_$ctor_Z524259A4(capacity) {
  return StringBuilder_$ctor_Z18115A39("", capacity);
}
function StringBuilder_$ctor_Z721C83C5(value) {
  return StringBuilder_$ctor_Z18115A39(value, 16);
}
function StringBuilder_$ctor() {
  return StringBuilder_$ctor_Z18115A39("", 16);
}
function StringBuilder__Append_Z721C83C5(x, s) {
  void x.buf.push(s);
  return x;
}
function StringBuilder__Append_487EF8FB(x, s, startIndex, count) {
  void x.buf.push((0,_String_js__WEBPACK_IMPORTED_MODULE_0__.substring)(s, startIndex, count));
  return x;
}
function StringBuilder__Append_244C7CD6(x, c) {
  void x.buf.push(c);
  return x;
}
function StringBuilder__Append_Z524259A4(x, o) {
  void x.buf.push((0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.int32ToString)(o));
  return x;
}
function StringBuilder__Append_5E38073B(x, o) {
  void x.buf.push(o.toString());
  return x;
}
function StringBuilder__Append_Z1FBCCD16(x, o) {
  void x.buf.push((0,_Types_js__WEBPACK_IMPORTED_MODULE_3__.toString)(o));
  return x;
}
function StringBuilder__Append_4E60E31B(x, o) {
  void x.buf.push((0,_Types_js__WEBPACK_IMPORTED_MODULE_3__.toString)(o));
  return x;
}
function StringBuilder__Append_Z372E4D23(x, cs) {
  void x.buf.push(cs.join(''));
  return x;
}
function StringBuilder__Append_43A65C09(x, s) {
  void x.buf.push((0,_Types_js__WEBPACK_IMPORTED_MODULE_3__.toString)(s));
  return x;
}
function StringBuilder__AppendFormat_433E080(x, fmt, o) {
  void x.buf.push((0,_String_js__WEBPACK_IMPORTED_MODULE_0__.format)(fmt, o));
  return x;
}
function StringBuilder__AppendFormat_Z696D8D1B(x, provider, fmt, o) {
  void x.buf.push((0,_String_js__WEBPACK_IMPORTED_MODULE_0__.format)(provider, fmt, o));
  return x;
}
function StringBuilder__AppendLine(x) {
  void x.buf.push("\n");
  return x;
}
function StringBuilder__AppendLine_Z721C83C5(x, s) {
  void x.buf.push(s);
  void x.buf.push("\n");
  return x;
}
function StringBuilder__Replace_Z766F94C0(x, oldValue, newValue) {
  for (let i = x.buf.length - 1; i >= 0; i--) {
    x.buf[i] = (0,_String_js__WEBPACK_IMPORTED_MODULE_0__.replace)(x.buf[i], oldValue, newValue);
  }
  return x;
}
function StringBuilder__Replace_Z384F8060(x, oldValue, newValue) {
  for (let i = x.buf.length - 1; i >= 0; i--) {
    x.buf[i] = (0,_String_js__WEBPACK_IMPORTED_MODULE_0__.replace)(x.buf[i], oldValue, newValue);
  }
  return x;
}
function StringBuilder__get_Length(x) {
  let len = 0;
  for (let i = x.buf.length - 1; i >= 0; i--) {
    len = len + x.buf[i].length | 0;
  }
  return len | 0;
}
function StringBuilder__ToString_Z37302880(x, firstIndex, length) {
  return (0,_String_js__WEBPACK_IMPORTED_MODULE_0__.substring)((0,_Types_js__WEBPACK_IMPORTED_MODULE_3__.toString)(x), firstIndex, length);
}
function StringBuilder__Clear(x) {
  (0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.clear)(x.buf);
  return x;
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Types.js":
/*!*****************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Types.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attribute": () => (/* binding */ Attribute),
/* harmony export */   "Exception": () => (/* binding */ Exception),
/* harmony export */   "FSharpException": () => (/* binding */ FSharpException),
/* harmony export */   "FSharpRef": () => (/* binding */ FSharpRef),
/* harmony export */   "MatchFailureException": () => (/* binding */ MatchFailureException),
/* harmony export */   "Record": () => (/* binding */ Record),
/* harmony export */   "Union": () => (/* binding */ Union),
/* harmony export */   "ensureErrorOrException": () => (/* binding */ ensureErrorOrException),
/* harmony export */   "isException": () => (/* binding */ isException),
/* harmony export */   "isPromise": () => (/* binding */ isPromise),
/* harmony export */   "seqToString": () => (/* binding */ seqToString),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "unionToString": () => (/* binding */ unionToString)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js");

function seqToString(self) {
  let count = 0;
  let str = "[";
  for (const x of self) {
    if (count === 0) {
      str += toString(x);
    } else if (count === 100) {
      str += "; ...";
      break;
    } else {
      str += "; " + toString(x);
    }
    count++;
  }
  return str + "]";
}
function toString(x, callStack = 0) {
  if (x != null && typeof x === "object") {
    if (typeof x.toString === "function") {
      return x.toString();
    } else if (Symbol.iterator in x) {
      return seqToString(x);
    } else {
      // TODO: Date?
      const cons = Object.getPrototypeOf(x)?.constructor;
      return cons === Object && callStack < 10
      // Same format as recordToString
      ? "{ " + Object.entries(x).map(([k, v]) => k + " = " + toString(v, callStack + 1)).join("\n  ") + " }" : cons?.name ?? "";
    }
  }
  return String(x);
}
function unionToString(name, fields) {
  if (fields.length === 0) {
    return name;
  } else {
    let fieldStr;
    let withParens = true;
    if (fields.length === 1) {
      fieldStr = toString(fields[0]);
      withParens = fieldStr.indexOf(" ") >= 0;
    } else {
      fieldStr = fields.map(x => toString(x)).join(", ");
    }
    return name + (withParens ? " (" : " ") + fieldStr + (withParens ? ")" : "");
  }
}
class Union {
  get name() {
    return this.cases()[this.tag];
  }
  toJSON() {
    return this.fields.length === 0 ? this.name : [this.name].concat(this.fields);
  }
  toString() {
    return unionToString(this.name, this.fields);
  }
  GetHashCode() {
    const hashes = this.fields.map(x => (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash)(x));
    hashes.splice(0, 0, (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.numberHash)(this.tag));
    return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.combineHashCodes)(hashes);
  }
  Equals(other) {
    if (this === other) {
      return true;
    } else if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.sameConstructor)(this, other)) {
      return false;
    } else if (this.tag === other.tag) {
      return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equalArrays)(this.fields, other.fields);
    } else {
      return false;
    }
  }
  CompareTo(other) {
    if (this === other) {
      return 0;
    } else if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.sameConstructor)(this, other)) {
      return -1;
    } else if (this.tag === other.tag) {
      return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.compareArrays)(this.fields, other.fields);
    } else {
      return this.tag < other.tag ? -1 : 1;
    }
  }
}
function recordToJSON(self) {
  const o = {};
  const keys = Object.keys(self);
  for (let i = 0; i < keys.length; i++) {
    o[keys[i]] = self[keys[i]];
  }
  return o;
}
function recordToString(self) {
  return "{ " + Object.entries(self).map(([k, v]) => k + " = " + toString(v)).join("\n  ") + " }";
}
function recordGetHashCode(self) {
  const hashes = Object.values(self).map(v => (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.structuralHash)(v));
  return (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.combineHashCodes)(hashes);
}
function recordEquals(self, other) {
  if (self === other) {
    return true;
  } else if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.sameConstructor)(self, other)) {
    return false;
  } else {
    const thisNames = Object.keys(self);
    for (let i = 0; i < thisNames.length; i++) {
      if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.equals)(self[thisNames[i]], other[thisNames[i]])) {
        return false;
      }
    }
    return true;
  }
}
function recordCompareTo(self, other) {
  if (self === other) {
    return 0;
  } else if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.sameConstructor)(self, other)) {
    return -1;
  } else {
    const thisNames = Object.keys(self);
    for (let i = 0; i < thisNames.length; i++) {
      const result = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.compare)(self[thisNames[i]], other[thisNames[i]]);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  }
}
class Record {
  toJSON() {
    return recordToJSON(this);
  }
  toString() {
    return recordToString(this);
  }
  GetHashCode() {
    return recordGetHashCode(this);
  }
  Equals(other) {
    return recordEquals(this, other);
  }
  CompareTo(other) {
    return recordCompareTo(this, other);
  }
}
class FSharpRef {
  get contents() {
    return this.getter();
  }
  set contents(v) {
    this.setter(v);
  }
  constructor(contentsOrGetter, setter) {
    if (typeof setter === "function") {
      this.getter = contentsOrGetter;
      this.setter = setter;
    } else {
      this.getter = () => contentsOrGetter;
      this.setter = v => {
        contentsOrGetter = v;
      };
    }
  }
}
// EXCEPTIONS
// Exception is intentionally not derived from Error, for performance reasons (see #2160)
class Exception {
  constructor(message) {
    this.message = message;
  }
}
function isException(x) {
  return x instanceof Exception || x instanceof Error;
}
function isPromise(x) {
  return x instanceof Promise;
}
function ensureErrorOrException(e) {
  // Exceptionally admitting promises as errors for compatibility with React.suspense (see #3298)
  return isException(e) || isPromise(e) ? e : new Error(String(e));
}
class FSharpException extends Exception {
  toJSON() {
    return recordToJSON(this);
  }
  toString() {
    return recordToString(this);
  }
  GetHashCode() {
    return recordGetHashCode(this);
  }
  Equals(other) {
    return recordEquals(this, other);
  }
  CompareTo(other) {
    return recordCompareTo(this, other);
  }
}
class MatchFailureException extends FSharpException {
  constructor(arg1, arg2, arg3) {
    super();
    this.arg1 = arg1;
    this.arg2 = arg2 | 0;
    this.arg3 = arg3 | 0;
    this.message = "The match cases were incomplete";
  }
}
class Attribute {}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/Util.js":
/*!****************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/Util.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comparer": () => (/* binding */ Comparer),
/* harmony export */   "Enumerable": () => (/* binding */ Enumerable),
/* harmony export */   "Enumerator": () => (/* binding */ Enumerator),
/* harmony export */   "Lazy": () => (/* binding */ Lazy),
/* harmony export */   "ObjectRef": () => (/* binding */ ObjectRef),
/* harmony export */   "arrayHash": () => (/* binding */ arrayHash),
/* harmony export */   "assertEqual": () => (/* binding */ assertEqual),
/* harmony export */   "assertNotEqual": () => (/* binding */ assertNotEqual),
/* harmony export */   "bigintHash": () => (/* binding */ bigintHash),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "combineHashCodes": () => (/* binding */ combineHashCodes),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "compareArrays": () => (/* binding */ compareArrays),
/* harmony export */   "compareArraysWith": () => (/* binding */ compareArraysWith),
/* harmony export */   "compareDates": () => (/* binding */ compareDates),
/* harmony export */   "comparePrimitives": () => (/* binding */ comparePrimitives),
/* harmony export */   "comparerFromEqualityComparer": () => (/* binding */ comparerFromEqualityComparer),
/* harmony export */   "copyToArray": () => (/* binding */ copyToArray),
/* harmony export */   "count": () => (/* binding */ count),
/* harmony export */   "createAtom": () => (/* binding */ createAtom),
/* harmony export */   "createObj": () => (/* binding */ createObj),
/* harmony export */   "curry10": () => (/* binding */ curry10),
/* harmony export */   "curry2": () => (/* binding */ curry2),
/* harmony export */   "curry3": () => (/* binding */ curry3),
/* harmony export */   "curry4": () => (/* binding */ curry4),
/* harmony export */   "curry5": () => (/* binding */ curry5),
/* harmony export */   "curry6": () => (/* binding */ curry6),
/* harmony export */   "curry7": () => (/* binding */ curry7),
/* harmony export */   "curry8": () => (/* binding */ curry8),
/* harmony export */   "curry9": () => (/* binding */ curry9),
/* harmony export */   "dateHash": () => (/* binding */ dateHash),
/* harmony export */   "dateOffset": () => (/* binding */ dateOffset),
/* harmony export */   "defaultOf": () => (/* binding */ defaultOf),
/* harmony export */   "disposeSafe": () => (/* binding */ disposeSafe),
/* harmony export */   "enumerableToIterator": () => (/* binding */ enumerableToIterator),
/* harmony export */   "equalArrays": () => (/* binding */ equalArrays),
/* harmony export */   "equalArraysWith": () => (/* binding */ equalArraysWith),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "escapeDataString": () => (/* binding */ escapeDataString),
/* harmony export */   "escapeUriString": () => (/* binding */ escapeUriString),
/* harmony export */   "fastStructuralHash": () => (/* binding */ fastStructuralHash),
/* harmony export */   "getEnumerator": () => (/* binding */ getEnumerator),
/* harmony export */   "identityHash": () => (/* binding */ identityHash),
/* harmony export */   "int16ToString": () => (/* binding */ int16ToString),
/* harmony export */   "int32ToString": () => (/* binding */ int32ToString),
/* harmony export */   "int64ToString": () => (/* binding */ int64ToString),
/* harmony export */   "isArrayLike": () => (/* binding */ isArrayLike),
/* harmony export */   "isComparable": () => (/* binding */ isComparable),
/* harmony export */   "isComparer": () => (/* binding */ isComparer),
/* harmony export */   "isDisposable": () => (/* binding */ isDisposable),
/* harmony export */   "isEnumerable": () => (/* binding */ isEnumerable),
/* harmony export */   "isEquatable": () => (/* binding */ isEquatable),
/* harmony export */   "isHashable": () => (/* binding */ isHashable),
/* harmony export */   "isIterable": () => (/* binding */ isIterable),
/* harmony export */   "jsOptions": () => (/* binding */ jsOptions),
/* harmony export */   "lazyFromValue": () => (/* binding */ lazyFromValue),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "numberHash": () => (/* binding */ numberHash),
/* harmony export */   "padLeftAndRightWithZeros": () => (/* binding */ padLeftAndRightWithZeros),
/* harmony export */   "padWithZeros": () => (/* binding */ padWithZeros),
/* harmony export */   "physicalEquality": () => (/* binding */ physicalEquality),
/* harmony export */   "physicalHash": () => (/* binding */ physicalHash),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "safeHash": () => (/* binding */ safeHash),
/* harmony export */   "sameConstructor": () => (/* binding */ sameConstructor),
/* harmony export */   "sign": () => (/* binding */ sign),
/* harmony export */   "stringHash": () => (/* binding */ stringHash),
/* harmony export */   "structuralHash": () => (/* binding */ structuralHash),
/* harmony export */   "toEnumerable": () => (/* binding */ toEnumerable),
/* harmony export */   "toIterator": () => (/* binding */ toIterator),
/* harmony export */   "uncurry10": () => (/* binding */ uncurry10),
/* harmony export */   "uncurry2": () => (/* binding */ uncurry2),
/* harmony export */   "uncurry3": () => (/* binding */ uncurry3),
/* harmony export */   "uncurry4": () => (/* binding */ uncurry4),
/* harmony export */   "uncurry5": () => (/* binding */ uncurry5),
/* harmony export */   "uncurry6": () => (/* binding */ uncurry6),
/* harmony export */   "uncurry7": () => (/* binding */ uncurry7),
/* harmony export */   "uncurry8": () => (/* binding */ uncurry8),
/* harmony export */   "uncurry9": () => (/* binding */ uncurry9),
/* harmony export */   "unescapeDataString": () => (/* binding */ unescapeDataString)
/* harmony export */ });
// tslint:disable:ban-types
function isArrayLike(x) {
  return Array.isArray(x) || ArrayBuffer.isView(x);
}
function isIterable(x) {
  return x != null && typeof x === "object" && Symbol.iterator in x;
}
function isEnumerable(x) {
  return x != null && typeof x.GetEnumerator === "function";
}
function isComparer(x) {
  return x != null && typeof x.Compare === "function";
}
function isComparable(x) {
  return x != null && typeof x.CompareTo === "function";
}
function isEquatable(x) {
  return x != null && typeof x.Equals === "function";
}
function isHashable(x) {
  return x != null && typeof x.GetHashCode === "function";
}
function isDisposable(x) {
  return x != null && typeof x.Dispose === "function";
}
function disposeSafe(x) {
  if (isDisposable(x)) {
    x.Dispose();
  }
}
function defaultOf() {
  return null;
}
function sameConstructor(x, y) {
  return Object.getPrototypeOf(x)?.constructor === Object.getPrototypeOf(y)?.constructor;
}
class Enumerable {
  constructor(en) {
    this.en = en;
  }
  GetEnumerator() {
    return this.en;
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    return this.en;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const hasNext = this.en["System.Collections.IEnumerator.MoveNext"]();
    const current = hasNext ? this.en["System.Collections.Generic.IEnumerator`1.get_Current"]() : undefined;
    return {
      done: !hasNext,
      value: current
    };
  }
}
class Enumerator {
  constructor(iter) {
    this.iter = iter;
    this.current = defaultOf();
  }
  ["System.Collections.Generic.IEnumerator`1.get_Current"]() {
    return this.current;
  }
  ["System.Collections.IEnumerator.get_Current"]() {
    return this.current;
  }
  ["System.Collections.IEnumerator.MoveNext"]() {
    const cur = this.iter.next();
    this.current = cur.value;
    return !cur.done;
  }
  ["System.Collections.IEnumerator.Reset"]() {
    throw new Error("JS iterators cannot be reset");
  }
  Dispose() {
    return;
  }
}
function toEnumerable(e) {
  if (isEnumerable(e)) {
    return e;
  } else {
    return new Enumerable(new Enumerator(e[Symbol.iterator]()));
  }
}
function getEnumerator(e) {
  if (isEnumerable(e)) {
    return e.GetEnumerator();
  } else {
    return new Enumerator(e[Symbol.iterator]());
  }
}
function toIterator(en) {
  return {
    next() {
      const hasNext = en["System.Collections.IEnumerator.MoveNext"]();
      const current = hasNext ? en["System.Collections.Generic.IEnumerator`1.get_Current"]() : undefined;
      return {
        done: !hasNext,
        value: current
      };
    }
  };
}
function enumerableToIterator(e) {
  return toIterator(toEnumerable(e).GetEnumerator());
}
class Comparer {
  constructor(f) {
    this.Compare = f || compare;
  }
}
function comparerFromEqualityComparer(comparer) {
  // Sometimes IEqualityComparer also implements IComparer
  if (isComparer(comparer)) {
    return new Comparer(comparer.Compare);
  } else {
    return new Comparer((x, y) => {
      const xhash = comparer.GetHashCode(x);
      const yhash = comparer.GetHashCode(y);
      if (xhash === yhash) {
        return comparer.Equals(x, y) ? 0 : -1;
      } else {
        return xhash < yhash ? -1 : 1;
      }
    });
  }
}
function assertEqual(actual, expected, msg) {
  if (!equals(actual, expected)) {
    throw Object.assign(new Error(msg || `Expected: ${expected} - Actual: ${actual}`), {
      actual,
      expected
    });
  }
}
function assertNotEqual(actual, expected, msg) {
  if (equals(actual, expected)) {
    throw Object.assign(new Error(msg || `Expected: ${expected} - Actual: ${actual}`), {
      actual,
      expected
    });
  }
}
class Lazy {
  constructor(factory) {
    this.factory = factory;
    this.isValueCreated = false;
  }
  get Value() {
    if (!this.isValueCreated) {
      this.createdValue = this.factory();
      this.isValueCreated = true;
    }
    return this.createdValue;
  }
  get IsValueCreated() {
    return this.isValueCreated;
  }
}
function lazyFromValue(v) {
  return new Lazy(() => v);
}
function padWithZeros(i, length) {
  let str = i.toString(10);
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}
function padLeftAndRightWithZeros(i, lengthLeft, lengthRight) {
  let str = i.toString(10);
  while (str.length < lengthLeft) {
    str = "0" + str;
  }
  while (str.length < lengthRight) {
    str = str + "0";
  }
  return str;
}
function dateOffset(date) {
  const date1 = date;
  return typeof date1.offset === "number" ? date1.offset : date.kind === 1 /* DateKind.UTC */ ? 0 : date.getTimezoneOffset() * -60000;
}
function int16ToString(i, radix) {
  i = i < 0 && radix != null && radix !== 10 ? 0xFFFF + i + 1 : i;
  return i.toString(radix);
}
function int32ToString(i, radix) {
  i = i < 0 && radix != null && radix !== 10 ? 0xFFFFFFFF + i + 1 : i;
  return i.toString(radix);
}
function int64ToString(i, radix) {
  i = i < 0 && radix != null && radix !== 10 ? 0xffffffffffffffffn + i + 1n : i;
  return i.toString(radix);
}
class ObjectRef {
  static id(o) {
    if (!ObjectRef.idMap.has(o)) {
      ObjectRef.idMap.set(o, ++ObjectRef.count);
    }
    return ObjectRef.idMap.get(o);
  }
}
ObjectRef.idMap = new WeakMap();
ObjectRef.count = 0;

function stringHash(s) {
  let i = 0;
  let h = 5381;
  const len = s.length;
  while (i < len) {
    h = h * 33 ^ s.charCodeAt(i++);
  }
  return h;
}
function numberHash(x) {
  return x * 2654435761 | 0;
}
function bigintHash(x) {
  return stringHash(x.toString(32));
}
// From https://stackoverflow.com/a/37449594
function combineHashCodes(hashes) {
  let h1 = 0;
  const len = hashes.length;
  for (let i = 0; i < len; i++) {
    const h2 = hashes[i];
    h1 = (h1 << 5) + h1 ^ h2;
  }
  return h1;
}
function physicalHash(x) {
  if (x == null) {
    return 0;
  }
  switch (typeof x) {
    case "boolean":
      return x ? 1 : 0;
    case "number":
      return numberHash(x);
    case "bigint":
      return bigintHash(x);
    case "string":
      return stringHash(x);
    default:
      return numberHash(ObjectRef.id(x));
  }
}
function identityHash(x) {
  if (isHashable(x)) {
    return x.GetHashCode();
  } else {
    return physicalHash(x);
  }
}
function dateHash(x) {
  return x.getTime();
}
function arrayHash(x) {
  const len = x.length;
  const hashes = new Array(len);
  for (let i = 0; i < len; i++) {
    hashes[i] = structuralHash(x[i]);
  }
  return combineHashCodes(hashes);
}
function structuralHash(x) {
  if (x == null) {
    return 0;
  }
  switch (typeof x) {
    case "boolean":
      return x ? 1 : 0;
    case "number":
      return numberHash(x);
    case "bigint":
      return bigintHash(x);
    case "string":
      return stringHash(x);
    default:
      {
        if (isHashable(x)) {
          return x.GetHashCode();
        } else if (isArrayLike(x)) {
          return arrayHash(x);
        } else if (x instanceof Date) {
          return dateHash(x);
        } else if (Object.getPrototypeOf(x)?.constructor === Object) {
          // TODO: check call-stack to prevent cyclic objects?
          const hashes = Object.values(x).map(v => structuralHash(v));
          return combineHashCodes(hashes);
        } else {
          // Classes don't implement GetHashCode by default, but must use identity hashing
          return numberHash(ObjectRef.id(x));
          // return stringHash(String(x));
        }
      }
  }
}
// Intended for custom numeric types, like long or decimal
function fastStructuralHash(x) {
  return stringHash(String(x));
}
// Intended for declared types that may or may not implement GetHashCode
function safeHash(x) {
  // return x == null ? 0 : isHashable(x) ? x.GetHashCode() : numberHash(ObjectRef.id(x));
  return identityHash(x);
}
function equalArraysWith(x, y, eq) {
  if (x == null) {
    return y == null;
  }
  if (y == null) {
    return false;
  }
  if (x.length !== y.length) {
    return false;
  }
  for (let i = 0; i < x.length; i++) {
    if (!eq(x[i], y[i])) {
      return false;
    }
  }
  return true;
}
function equalArrays(x, y) {
  return equalArraysWith(x, y, equals);
}
function equalObjects(x, y) {
  const xKeys = Object.keys(x);
  const yKeys = Object.keys(y);
  if (xKeys.length !== yKeys.length) {
    return false;
  }
  xKeys.sort();
  yKeys.sort();
  for (let i = 0; i < xKeys.length; i++) {
    if (xKeys[i] !== yKeys[i] || !equals(x[xKeys[i]], y[yKeys[i]])) {
      return false;
    }
  }
  return true;
}
function physicalEquality(x, y) {
  return x === y;
}
function equals(x, y) {
  if (x === y) {
    return true;
  } else if (x == null) {
    return y == null;
  } else if (y == null) {
    return false;
  } else if (isEquatable(x)) {
    return x.Equals(y);
  } else if (isArrayLike(x)) {
    return isArrayLike(y) && equalArrays(x, y);
  } else if (typeof x !== "object") {
    return false;
  } else if (x instanceof Date) {
    return y instanceof Date && compareDates(x, y) === 0;
  } else {
    return Object.getPrototypeOf(x)?.constructor === Object && equalObjects(x, y);
  }
}
function compareDates(x, y) {
  let xtime;
  let ytime;
  // DateTimeOffset and DateTime deals with equality differently.
  if ("offset" in x && "offset" in y) {
    xtime = x.getTime();
    ytime = y.getTime();
  } else {
    xtime = x.getTime() + dateOffset(x);
    ytime = y.getTime() + dateOffset(y);
  }
  return xtime === ytime ? 0 : xtime < ytime ? -1 : 1;
}
function comparePrimitives(x, y) {
  return x === y ? 0 : x < y ? -1 : 1;
}
function compareArraysWith(x, y, comp) {
  if (x == null) {
    return y == null ? 0 : 1;
  }
  if (y == null) {
    return -1;
  }
  if (x.length !== y.length) {
    return x.length < y.length ? -1 : 1;
  }
  for (let i = 0, j = 0; i < x.length; i++) {
    j = comp(x[i], y[i]);
    if (j !== 0) {
      return j;
    }
  }
  return 0;
}
function compareArrays(x, y) {
  return compareArraysWith(x, y, compare);
}
function compareObjects(x, y) {
  const xKeys = Object.keys(x);
  const yKeys = Object.keys(y);
  if (xKeys.length !== yKeys.length) {
    return xKeys.length < yKeys.length ? -1 : 1;
  }
  xKeys.sort();
  yKeys.sort();
  for (let i = 0, j = 0; i < xKeys.length; i++) {
    const key = xKeys[i];
    if (key !== yKeys[i]) {
      return key < yKeys[i] ? -1 : 1;
    } else {
      j = compare(x[key], y[key]);
      if (j !== 0) {
        return j;
      }
    }
  }
  return 0;
}
function compare(x, y) {
  if (x === y) {
    return 0;
  } else if (x == null) {
    return y == null ? 0 : -1;
  } else if (y == null) {
    return 1;
  } else if (isComparable(x)) {
    return x.CompareTo(y);
  } else if (isArrayLike(x)) {
    return isArrayLike(y) ? compareArrays(x, y) : -1;
  } else if (typeof x !== "object") {
    return x < y ? -1 : 1;
  } else if (x instanceof Date) {
    return y instanceof Date ? compareDates(x, y) : -1;
  } else {
    return Object.getPrototypeOf(x)?.constructor === Object ? compareObjects(x, y) : -1;
  }
}
function min(comparer, x, y) {
  return comparer(x, y) < 0 ? x : y;
}
function max(comparer, x, y) {
  return comparer(x, y) > 0 ? x : y;
}
function clamp(comparer, value, min, max) {
  return comparer(value, min) < 0 ? min : comparer(value, max) > 0 ? max : value;
}
function createAtom(value) {
  let atom = value;
  return (...args) => {
    if (args.length === 0) {
      return atom;
    } else {
      atom = args[0];
    }
  };
}
function createObj(fields) {
  const obj = {};
  for (const kv of fields) {
    obj[kv[0]] = kv[1];
  }
  return obj;
}
function jsOptions(mutator) {
  const opts = {};
  mutator(opts);
  return opts;
}
function round(value, digits = 0) {
  const m = Math.pow(10, digits);
  const n = +(digits ? value * m : value).toFixed(8);
  const i = Math.floor(n);
  const f = n - i;
  const e = 1e-8;
  const r = f > 0.5 - e && f < 0.5 + e ? i % 2 === 0 ? i : i + 1 : Math.round(n);
  return digits ? r / m : r;
}
function sign(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}
function unescapeDataString(s) {
  // https://stackoverflow.com/a/4458580/524236
  return decodeURIComponent(s.replace(/\+/g, "%20"));
}
function escapeDataString(s) {
  return encodeURIComponent(s).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
}
function escapeUriString(s) {
  return encodeURI(s);
}
// ICollection.Clear and Count members can be called on Arrays
// or Dictionaries so we need a runtime check (see #1120)
function count(col) {
  if (isArrayLike(col)) {
    return col.length;
  } else {
    let count = 0;
    for (const _ of col) {
      count++;
    }
    return count;
  }
}
function clear(col) {
  if (isArrayLike(col)) {
    col.splice(0);
  } else {
    col.clear();
  }
}
const curried = new WeakMap();
function uncurry2(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2) => f(a1)(a2);
  curried.set(f2, f);
  return f2;
}
function curry2(f) {
  return curried.get(f) ?? (a1 => a2 => f(a1, a2));
}
function uncurry3(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3) => f(a1)(a2)(a3);
  curried.set(f2, f);
  return f2;
}
function curry3(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => f(a1, a2, a3));
}
function uncurry4(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4) => f(a1)(a2)(a3)(a4);
  curried.set(f2, f);
  return f2;
}
function curry4(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => f(a1, a2, a3, a4));
}
function uncurry5(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5) => f(a1)(a2)(a3)(a4)(a5);
  curried.set(f2, f);
  return f2;
}
function curry5(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => f(a1, a2, a3, a4, a5));
}
function uncurry6(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5, a6) => f(a1)(a2)(a3)(a4)(a5)(a6);
  curried.set(f2, f);
  return f2;
}
function curry6(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => a6 => f(a1, a2, a3, a4, a5, a6));
}
function uncurry7(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5, a6, a7) => f(a1)(a2)(a3)(a4)(a5)(a6)(a7);
  curried.set(f2, f);
  return f2;
}
function curry7(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => a6 => a7 => f(a1, a2, a3, a4, a5, a6, a7));
}
function uncurry8(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5, a6, a7, a8) => f(a1)(a2)(a3)(a4)(a5)(a6)(a7)(a8);
  curried.set(f2, f);
  return f2;
}
function curry8(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => a6 => a7 => a8 => f(a1, a2, a3, a4, a5, a6, a7, a8));
}
function uncurry9(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5, a6, a7, a8, a9) => f(a1)(a2)(a3)(a4)(a5)(a6)(a7)(a8)(a9);
  curried.set(f2, f);
  return f2;
}
function curry9(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => a6 => a7 => a8 => a9 => f(a1, a2, a3, a4, a5, a6, a7, a8, a9));
}
function uncurry10(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) => f(a1)(a2)(a3)(a4)(a5)(a6)(a7)(a8)(a9)(a10);
  curried.set(f2, f);
  return f2;
}
function curry10(f) {
  return curried.get(f) ?? (a1 => a2 => a3 => a4 => a5 => a6 => a7 => a8 => a9 => a10 => f(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10));
}
// More performant method to copy arrays, see #2352
function copyToArray(source, sourceIndex, target, targetIndex, count) {
  if (ArrayBuffer.isView(source) && ArrayBuffer.isView(target)) {
    target.set(source.subarray(sourceIndex, sourceIndex + count), targetIndex);
  } else {
    for (let i = 0; i < count; ++i) {
      target[targetIndex + i] = source[sourceIndex + i];
    }
  }
}

/***/ }),

/***/ "./src/Renderer/fable_modules/fable-library.4.1.4/lib/big.js":
/*!*******************************************************************!*\
  !*** ./src/Renderer/fable_modules/fable-library.4.1.4/lib/big.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Big": () => (/* binding */ Big),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Adapted from https://github.com/MikeMcl/big.js/blob/0f94dc9110d55c4f324a47ba6a2e832ce23ac589/big.mjs
/* tslint:disable */
var P = {};
/*
 *  big.js v6.0.3
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2020 Michael Mclaughlin
 *  https://github.com/MikeMcl/big.js/LICENCE.md
 */
/************************************** EDITABLE DEFAULTS *****************************************/
// The default values below must be integers within the stated ranges.
/*
 * The maximum number of decimal places (DP) of the results of operations involving division:
 * div and sqrt, and pow with negative exponents.
 */
var DP = 28,
  // 0 to MAX_DP
  /*
   * The rounding mode (RM) used when rounding to the above decimal places.
   *
   *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
   *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
   *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
   *  3  Away from zero.                                  (ROUND_UP)
   */
  RM = 1,
  // 0, 1, 2 or 3
  // The maximum value of DP and Big.DP.
  MAX_DP = 1E6,
  // 0 to 1000000
  // The maximum magnitude of the exponent argument to the pow method.
  MAX_POWER = 1E6,
  // 1 to 1000000
  /*
   * The negative exponent (NE) at and beneath which toString returns exponential notation.
   * (JavaScript numbers: -7)
   * -1000000 is the minimum recommended exponent value of a Big.
   */
  NE = -29,
  // 0 to -1000000
  /*
   * The positive exponent (PE) at and above which toString returns exponential notation.
   * (JavaScript numbers: 21)
   * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
   */
  PE = 29,
  // 0 to 1000000
  /*
   * When true, an error will be thrown if a primitive number is passed to the Big constructor,
   * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a
   * primitive number without a loss of precision.
   */
  STRICT = false,
  // true or false
  /**************************************************************************************************/
  // Error messages.
  NAME = '[big.js] ',
  INVALID = NAME + 'Invalid ',
  INVALID_DP = INVALID + 'decimal places',
  INVALID_RM = INVALID + 'rounding mode',
  DIV_BY_ZERO = NAME + 'Division by zero',
  UNDEFINED = void 0,
  NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
/*
 * Create and return a Big constructor.
 */
function _Big_() {
  /*
   * The Big constructor and exported function.
   * Create and return a new instance of a Big number object.
   *
   * n {number|string|Big} A numeric value.
   */
  function Big(n) {
    var x = this;
    // Enable constructor usage without new.
    if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);
    // Duplicate.
    if (n instanceof Big) {
      x.s = n.s;
      x.e = n.e;
      x.c = n.c.slice();
      normalize(x);
    } else {
      if (typeof n !== 'string') {
        if (Big.strict === true) {
          throw TypeError(INVALID + 'number');
        }
        // Minus zero?
        n = n === 0 && 1 / n < 0 ? '-0' : String(n);
      }
      parse(x, n);
    }
    // Retain a reference to this Big constructor.
    // Shadow Big.prototype.constructor which points to Object.
    x.constructor = Big;
  }
  Big.prototype = P;
  Big.DP = DP;
  Big.RM = RM;
  Big.NE = NE;
  Big.PE = PE;
  Big.strict = STRICT;
  return Big;
}
function normalize(x) {
  // x = round(x, DP, 0);
  if (x.c.length > 1 && !x.c[0]) {
    let i = x.c.findIndex(x => x);
    x.c = x.c.slice(i);
    x.e = x.e - i;
  }
}
/*
 * Parse the number or string value passed to a Big constructor.
 *
 * x {Big} A Big number instance.
 * n {number|string} A numeric value.
 */
function parse(x, n) {
  var e, i, nl;
  if (!NUMERIC.test(n)) {
    throw Error(INVALID + 'number');
  }
  // Determine sign.
  x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;
  // Decimal point?
  if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');
  // Exponential form?
  if ((i = n.search(/e/i)) > 0) {
    // Determine exponent.
    if (e < 0) e = i;
    e += +n.slice(i + 1);
    n = n.substring(0, i);
  } else if (e < 0) {
    // Integer.
    e = n.length;
  }
  nl = n.length;
  // Determine leading zeros before decimal point.
  for (i = 0; i < e && i < nl && n.charAt(i) == '0';) ++i;
  // original version (ignores decimal point).
  // // Determine leading zeros.
  // for (i = 0; i < nl && n.charAt(i) == '0';) ++i;
  if (i == nl) {
    // Zero.
    x.c = [x.e = 0];
  } else {
    x.e = e - i - 1;
    x.c = [];
    // Convert string to array of digits without leading zeros
    for (e = 0; i < nl;) x.c[e++] = +n.charAt(i++);
    // older version (doesn't keep trailing zeroes).
    // // Determine trailing zeros.
    // for (; nl > 0 && n.charAt(--nl) == '0';);
    // // Convert string to array of digits without leading/trailing zeros.
    // for (e = 0; i <= nl;) x.c[e++] = +n.charAt(i++);
  }
  x = round(x, Big.DP + 1, Big.RM);
  return x;
}
/*
 * Round Big x to a maximum of sd significant digits using rounding mode rm.
 *
 * x {Big} The Big to round.
 * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
 * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 * [more] {boolean} Whether the result of division was truncated.
 */
function round(x, sd, rm, more) {
  var xc = x.c;
  if (rm === UNDEFINED) rm = Big.RM;
  if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {
    throw Error(INVALID_RM);
  }
  if (sd < 1) {
    more = rm === 3 && (more || !!xc[0]) || sd === 0 && (rm === 1 && xc[0] >= 5 || rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED)));
    xc.length = 1;
    if (more) {
      // 1, 0.1, 0.01, 0.001, 0.0001 etc.
      x.e = x.e - sd + 1;
      xc[0] = 1;
    } else {
      // Zero.
      xc[0] = x.e = 0;
    }
  } else if (sd < xc.length) {
    // xc[sd] is the digit after the digit that may be rounded up.
    const isZero = xc.findIndex((xci, idx) => idx >= sd && xci > 0) < 0;
    more = rm === 1 && xc[sd] >= 5 || rm === 2 && (xc[sd] > 5 || xc[sd] === 5 && (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) || rm === 3 && (more || !isZero);
    // Remove any digits after the required precision.
    xc.length = sd--;
    // Round up?
    if (more) {
      // Rounding up may mean the previous digit has to be rounded up.
      for (; ++xc[sd] > 9;) {
        xc[sd] = 0;
        if (!sd--) {
          ++x.e;
          xc.unshift(1);
        }
      }
    }
    // Remove trailing zeros.
    for (sd = xc.length; !xc[--sd];) xc.pop();
  }
  return x;
}
/*
 * Return a string representing the value of Big x in normal or exponential notation.
 * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
 */
function stringify(x, doExponential, isNonzero) {
  var e = x.e,
    s = x.c.join(''),
    n = s.length;
  // Exponential notation?
  if (doExponential) {
    s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;
    // Normal notation.
  } else if (e < 0) {
    for (; ++e;) s = '0' + s;
    s = '0.' + s;
  } else if (e > 0) {
    if (++e > n) {
      for (e -= n; e--;) s += '0';
    } else if (e < n) {
      s = s.slice(0, e) + '.' + s.slice(e);
    }
  } else if (n > 1) {
    s = s.charAt(0) + '.' + s.slice(1);
  }
  return x.s < 0 && isNonzero ? '-' + s : s;
}
// Prototype/instance methods
/*
 * Return a new Big whose value is the absolute value of this Big.
 */
P.abs = function () {
  var x = new this.constructor(this);
  x.s = 1;
  return x;
};
/*
 * Return 1 if the value of this Big is greater than the value of Big y,
 *       -1 if the value of this Big is less than the value of Big y, or
 *        0 if they have the same value.
 */
P.cmp = function (y) {
  var isneg,
    Big = this.constructor,
    x = new Big(this),
    y = new Big(y),
    xc = x.c,
    yc = y.c,
    i = x.s,
    j = y.s,
    k = x.e,
    l = y.e;
  // Either zero?
  if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;
  // Signs differ?
  if (i != j) return i;
  isneg = i < 0;
  // Compare exponents.
  if (k != l) return k > l ^ isneg ? 1 : -1;
  // Compare digit by digit.
  j = Math.max(xc.length, yc.length);
  for (i = 0; i < j; i++) {
    k = i < xc.length ? xc[i] : 0;
    l = i < yc.length ? yc[i] : 0;
    if (k != l) return k > l ^ isneg ? 1 : -1;
  }
  return 0;
  // original version (doesn't compare well trailing zeroes, e.g. 1.0 with 1.00)
  // j = (k = xc.length) < (l = yc.length) ? k : l;
  // // Compare digit by digit.
  // for (i = -1; ++i < j;) {
  //   if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
  // }
  // // Compare lengths.
  // return k == l ? 0 : k > l ^ isneg ? 1 : -1;
};
/*
 * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
 * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */
P.div = function (y) {
  var Big = this.constructor,
    x = new Big(this),
    y = new Big(y),
    a = x.c,
    // dividend
    b = y.c,
    // divisor
    k = x.s == y.s ? 1 : -1,
    dp = Big.DP;
  if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }
  // Divisor is zero?
  if (!b[0]) {
    throw Error(DIV_BY_ZERO);
  }
  // Dividend is 0? Return +-0.
  if (!a[0]) {
    y.s = k;
    y.c = [y.e = 0];
    return y;
  }
  var bl,
    bt,
    n,
    cmp,
    ri,
    bz = b.slice(),
    ai = bl = b.length,
    al = a.length,
    r = a.slice(0, bl),
    // remainder
    rl = r.length,
    q = y,
    // quotient
    qc = q.c = [],
    qi = 0,
    p = dp + (q.e = x.e - y.e) + 1; // precision of the result
  q.s = k;
  k = p < 0 ? 0 : p;
  // Create version of divisor with leading zero.
  bz.unshift(0);
  // Add zeros to make remainder as long as divisor.
  for (; rl++ < bl;) r.push(0);
  do {
    // n is how many times the divisor goes into current remainder.
    for (n = 0; n < 10; n++) {
      // Compare divisor and remainder.
      if (bl != (rl = r.length)) {
        cmp = bl > rl ? 1 : -1;
      } else {
        for (ri = -1, cmp = 0; ++ri < bl;) {
          if (b[ri] != r[ri]) {
            cmp = b[ri] > r[ri] ? 1 : -1;
            break;
          }
        }
      }
      // If divisor < remainder, subtract divisor from remainder.
      if (cmp < 0) {
        // Remainder can't be more than 1 digit longer than divisor.
        // Equalise lengths using divisor with extra leading zero?
        for (bt = rl == bl ? b : bz; rl;) {
          if (r[--rl] < bt[rl]) {
            ri = rl;
            for (; ri && !r[--ri];) r[ri] = 9;
            --r[ri];
            r[rl] += 10;
          }
          r[rl] -= bt[rl];
        }
        for (; !r[0];) r.shift();
      } else {
        break;
      }
    }
    // Add the digit n to the result array.
    qc[qi++] = cmp ? n : ++n;
    // Update the remainder.
    if (r[0] && cmp) r[rl] = a[ai] || 0;else r = [a[ai]];
  } while ((ai++ < al || r[0] !== UNDEFINED) && k--);
  // Leading zero? Do not remove if result is simply zero (qi == 1).
  if (!qc[0] && qi != 1) {
    // There can't be more than one zero.
    qc.shift();
    q.e--;
    p--;
  }
  // Round?
  if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);
  return q;
};
/*
 * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
 */
P.eq = function (y) {
  return this.cmp(y) === 0;
};
/*
 * Return true if the value of this Big is greater than the value of Big y, otherwise return
 * false.
 */
P.gt = function (y) {
  return this.cmp(y) > 0;
};
/*
 * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
 * return false.
 */
P.gte = function (y) {
  return this.cmp(y) > -1;
};
/*
 * Return true if the value of this Big is less than the value of Big y, otherwise return false.
 */
P.lt = function (y) {
  return this.cmp(y) < 0;
};
/*
 * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
 * return false.
 */
P.lte = function (y) {
  return this.cmp(y) < 1;
};
/*
 * Return a new Big whose value is the value of this Big minus the value of Big y.
 */
P.minus = P.sub = function (y) {
  var i,
    j,
    t,
    xlty,
    Big = this.constructor,
    x = new Big(this),
    y = new Big(y),
    a = x.s,
    b = y.s;
  // Signs differ?
  if (a != b) {
    y.s = -b;
    return x.plus(y);
  }
  var xc = x.c.slice(),
    xe = x.e,
    yc = y.c,
    ye = y.e;
  // Either zero?
  if (!xc[0] || !yc[0]) {
    if (yc[0]) {
      y.s = -b;
    } else if (xc[0]) {
      y = new Big(x);
    } else {
      y.s = 1;
    }
    return y;
  }
  // Determine which is the bigger number. Prepend zeros to equalise exponents.
  if (a = xe - ye) {
    if (xlty = a < 0) {
      a = -a;
      t = xc;
    } else {
      ye = xe;
      t = yc;
    }
    t.reverse();
    for (b = a; b--;) t.push(0);
    t.reverse();
  } else {
    // Exponents equal. Check digit by digit.
    j = ((xlty = xc.length < yc.length) ? xc : yc).length;
    for (a = b = 0; b < j; b++) {
      if (xc[b] != yc[b]) {
        xlty = xc[b] < yc[b];
        break;
      }
    }
  }
  // x < y? Point xc to the array of the bigger number.
  if (xlty) {
    t = xc;
    xc = yc;
    yc = t;
    y.s = -y.s;
  }
  /*
   * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
   * needs to start at yc.length.
   */
  if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--;) xc[i++] = 0;
  // Subtract yc from xc.
  for (b = i; j > a;) {
    if (xc[--j] < yc[j]) {
      for (i = j; i && !xc[--i];) xc[i] = 9;
      --xc[i];
      xc[j] += 10;
    }
    xc[j] -= yc[j];
  }
  // Remove trailing zeros.
  for (; xc[--b] === 0;) xc.pop();
  // Remove leading zeros and adjust exponent accordingly.
  for (; xc[0] === 0;) {
    xc.shift();
    --ye;
  }
  if (!xc[0]) {
    // n - n = +0
    y.s = 1;
    // Result must be zero.
    xc = [ye = 0];
  }
  y.c = xc;
  y.e = ye;
  return y;
};
/*
 * Return a new Big whose value is the value of this Big modulo the value of Big y.
 */
P.mod = function (y) {
  var ygtx,
    Big = this.constructor,
    x = new Big(this),
    y = new Big(y),
    a = x.s,
    b = y.s;
  if (!y.c[0]) {
    throw Error(DIV_BY_ZERO);
  }
  x.s = y.s = 1;
  ygtx = y.cmp(x) == 1;
  x.s = a;
  y.s = b;
  if (ygtx) return new Big(x);
  a = Big.DP;
  b = Big.RM;
  Big.DP = Big.RM = 0;
  x = x.div(y);
  Big.DP = a;
  Big.RM = b;
  return this.minus(x.times(y));
};
/*
 * Return a new Big whose value is the value of this Big plus the value of Big y.
 */
P.plus = P.add = function (y) {
  var e,
    k,
    t,
    Big = this.constructor,
    x = new Big(this),
    y = new Big(y);
  // Signs differ?
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  var xe = x.e,
    xc = x.c,
    ye = y.e,
    yc = y.c;
  // Either zero?
  if (!xc[0] || !yc[0]) {
    if (!yc[0]) {
      if (xc[0]) {
        y = new Big(x);
      } else {
        y.s = x.s;
      }
    }
    return y;
  }
  xc = xc.slice();
  // Prepend zeros to equalise exponents.
  // Note: reverse faster than unshifts.
  if (e = xe - ye) {
    if (e > 0) {
      ye = xe;
      t = yc;
    } else {
      e = -e;
      t = xc;
    }
    t.reverse();
    for (; e--;) t.push(0);
    t.reverse();
  }
  // Point xc to the longer array.
  if (xc.length - yc.length < 0) {
    t = yc;
    yc = xc;
    xc = t;
  }
  e = yc.length;
  // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
  for (k = 0; e; xc[e] %= 10) k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;
  // No need to check for zero, as +x + +y != 0 && -x + -y != 0
  if (k) {
    xc.unshift(k);
    ++ye;
  }
  // Remove trailing zeros.
  for (e = xc.length; xc[--e] === 0;) xc.pop();
  y.c = xc;
  y.e = ye;
  return y;
};
/*
 * Return a Big whose value is the value of this Big raised to the power n.
 * If n is negative, round to a maximum of Big.DP decimal places using rounding
 * mode Big.RM.
 *
 * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
 */
P.pow = function (n) {
  var Big = this.constructor,
    x = new Big(this),
    y = new Big('1'),
    one = new Big('1'),
    isneg = n < 0;
  if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
    throw Error(INVALID + 'exponent');
  }
  if (isneg) n = -n;
  for (;;) {
    if (n & 1) y = y.times(x);
    n >>= 1;
    if (!n) break;
    x = x.times(x);
  }
  return isneg ? one.div(y) : y;
};
/*
 * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
 * significant digits using rounding mode rm, or Big.RM if rm is not specified.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.prec = function (sd, rm) {
  if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
    throw Error(INVALID + 'precision');
  }
  return round(new this.constructor(this), sd, rm);
};
/*
 * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
 * using rounding mode rm, or Big.RM if rm is not specified.
 * If dp is negative, round to an integer which is a multiple of 10**-dp.
 * If dp is not specified, round to 0 decimal places.
 *
 * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.round = function (dp, rm) {
  if (dp === UNDEFINED) dp = 0;else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }
  return round(new this.constructor(this), dp + this.e + 1, rm);
};
/*
 * Return a new Big whose value is the square root of the value of this Big, rounded, if
 * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */
P.sqrt = function () {
  var r,
    c,
    t,
    Big = this.constructor,
    x = new Big(this),
    s = x.s,
    e = x.e,
    half = new Big('0.5');
  // Zero?
  if (!x.c[0]) return new Big(x);
  // Negative?
  if (s < 0) {
    throw Error(NAME + 'No square root');
  }
  // Estimate.
  s = Math.sqrt(x + '');
  // Math.sqrt underflow/overflow?
  // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
  if (s === 0 || s === 1 / 0) {
    c = x.c.join('');
    if (!(c.length + e & 1)) c += '0';
    s = Math.sqrt(c);
    e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
    r = new Big((s == 1 / 0 ? '5e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
  } else {
    r = new Big(s + '');
  }
  e = r.e + (Big.DP += 4);
  // Newton-Raphson iteration.
  do {
    t = r;
    r = half.times(t.plus(x.div(t)));
  } while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''));
  return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);
};
/*
 * Return a new Big whose value is the value of this Big times the value of Big y.
 */
P.times = P.mul = function (y) {
  var c,
    Big = this.constructor,
    x = new Big(this),
    y = new Big(y),
    xc = x.c,
    yc = y.c,
    a = xc.length,
    b = yc.length,
    i = x.e,
    j = y.e;
  // Determine sign of result.
  y.s = x.s == y.s ? 1 : -1;
  // Return signed 0 if either 0.
  if (!xc[0] || !yc[0]) {
    y.c = [y.e = 0];
    return y;
  }
  // Initialise exponent of result as x.e + y.e.
  y.e = i + j;
  // If array xc has fewer digits than yc, swap xc and yc, and lengths.
  if (a < b) {
    c = xc;
    xc = yc;
    yc = c;
    j = a;
    a = b;
    b = j;
  }
  // Initialise coefficient array of result with zeros.
  for (c = new Array(j = a + b); j--;) c[j] = 0;
  // Multiply.
  // i is initially xc.length.
  for (i = b; i--;) {
    b = 0;
    // a is yc.length.
    for (j = a + i; j > i;) {
      // Current sum of products at this digit position, plus carry.
      b = c[j] + yc[i] * xc[j - i - 1] + b;
      c[j--] = b % 10;
      // carry
      b = b / 10 | 0;
    }
    c[j] = b;
  }
  // Increment result exponent if there is a final carry, otherwise remove leading zero.
  if (b) ++y.e;else c.shift();
  // Remove trailing zeros.
  for (i = c.length; !c[--i];) c.pop();
  y.c = c;
  return y;
};
/*
 * Return a string representing the value of this Big in exponential notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.toExponential = function (dp, rm) {
  var x = this,
    n = x.c[0];
  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x = round(new x.constructor(x), ++dp, rm);
    for (; x.c.length < dp;) x.c.push(0);
  }
  return stringify(x, true, !!n);
};
/*
 * Return a string representing the value of this Big in normal notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 *
 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
 */
P.toFixed = function (dp, rm) {
  var x = this,
    n = x.c[0];
  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x = round(new x.constructor(x), dp + x.e + 1, rm);
    // x.e may have changed if the value is rounded up.
    for (dp = dp + x.e + 1; x.c.length < dp;) x.c.push(0);
  }
  return stringify(x, false, !!n);
};
/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Omit the sign for negative zero.
 */
P.toJSON = P.toString = function () {
  var x = this,
    Big = x.constructor;
  return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);
};
/*
 * Return the value of this Big as a primitve number.
 */
P.toNumber = function () {
  var n = Number(stringify(this, true, true));
  if (this.constructor.strict === true && !this.eq(n.toString())) {
    throw Error(NAME + 'Imprecise conversion');
  }
  return n;
};
/*
 * Return a string representing the value of this Big rounded to sd significant digits using
 * rounding mode rm, or Big.RM if rm is not specified.
 * Use exponential notation if sd is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.toPrecision = function (sd, rm) {
  var x = this,
    Big = x.constructor,
    n = x.c[0];
  if (sd !== UNDEFINED) {
    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
      throw Error(INVALID + 'precision');
    }
    x = round(new Big(x), sd, rm);
    for (; x.c.length < sd;) x.c.push(0);
  }
  return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);
};
/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Include the sign for negative zero.
 */
P.valueOf = function () {
  var x = this,
    Big = x.constructor;
  if (Big.strict === true) {
    throw Error(NAME + 'valueOf disallowed');
  }
  return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);
};
// Export
/**
 * @type object
 */
var Big = _Big_();
/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/big.js/index.d.ts" />
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Big);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./src/Main/Main.fs.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addListeners": () => (/* binding */ addListeners),
/* harmony export */   "argFlagIsOn": () => (/* binding */ argFlagIsOn),
/* harmony export */   "args": () => (/* binding */ args),
/* harmony export */   "closeAfterSave": () => (/* binding */ closeAfterSave),
/* harmony export */   "createMainWindow": () => (/* binding */ createMainWindow),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "dispatchToRenderer": () => (/* binding */ dispatchToRenderer),
/* harmony export */   "hasDebugArgs": () => (/* binding */ hasDebugArgs),
/* harmony export */   "isMacos": () => (/* binding */ isMacos),
/* harmony export */   "isWin": () => (/* binding */ isWin),
/* harmony export */   "loadAppIntoWidowWhenReady": () => (/* binding */ loadAppIntoWidowWhenReady),
/* harmony export */   "mainWindow": () => (/* binding */ mainWindow),
/* harmony export */   "startRenderer": () => (/* binding */ startRenderer),
/* harmony export */   "startup": () => (/* binding */ startup),
/* harmony export */   "wait": () => (/* binding */ wait)
/* harmony export */ });
/* harmony import */ var _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Renderer/Common/ElectronAPI.fs.js */ "./src/Renderer/Common/ElectronAPI.fs.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fable_modules/fable-library.4.1.4/List.js */ "./src/Main/fable_modules/fable-library.4.1.4/List.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_Seq_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fable_modules/fable-library.4.1.4/Seq.js */ "./src/Main/fable_modules/fable-library.4.1.4/Seq.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_Util_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fable_modules/fable-library.4.1.4/Util.js */ "./src/Main/fable_modules/fable-library.4.1.4/Util.js");
/* harmony import */ var _electron_remote_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @electron/remote/main */ "./node_modules/@electron/remote/main/index.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_Async_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fable_modules/fable-library.4.1.4/Async.js */ "./src/Main/fable_modules/fable-library.4.1.4/Async.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./fable_modules/fable-library.4.1.4/AsyncBuilder.js */ "./src/Main/fable_modules/fable-library.4.1.4/AsyncBuilder.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_Range_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./fable_modules/fable-library.4.1.4/Range.js */ "./src/Main/fable_modules/fable-library.4.1.4/Range.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./fable_modules/fable-library.4.1.4/String.js */ "./src/Main/fable_modules/fable-library.4.1.4/String.js");
/* harmony import */ var _fable_modules_fable_library_4_1_4_Option_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./fable_modules/fable-library.4.1.4/Option.js */ "./src/Main/fable_modules/fable-library.4.1.4/Option.js");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Renderer_UI_ContextMenus_fs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Renderer/UI/ContextMenus.fs.js */ "./src/Renderer/UI/ContextMenus.fs.js");













(() => {
  const objectArg = _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.systemPreferences;
  return tupledArg => {
    objectArg.setUserDefault(tupledArg[0], tupledArg[1], tupledArg[2]);
  };
})()[["NSDisabledDictationMenuItem", "boolean", "true"]];
(() => {
  const objectArg = _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.systemPreferences;
  return tupledArg => {
    objectArg.setUserDefault(tupledArg[0], tupledArg[1], tupledArg[2]);
  };
})()[["NSDisabledCharacterPaletteMenu", "boolean", "true"]];
const args = (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_5__.map)(s => s.toLocaleLowerCase(), (0,_fable_modules_fable_library_4_1_4_Seq_js__WEBPACK_IMPORTED_MODULE_6__.toList)(process.argv));

/**
 * Returns true if any of flags are present as command line argument.
 */
function argFlagIsOn(flags) {
  const fl = (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_5__.map)(s => s.toLocaleLowerCase(), flags);
  return (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_5__.exists)(flag => (0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_5__.contains)(flag, args, {
    Equals: (x, y) => x === y,
    GetHashCode: _fable_modules_fable_library_4_1_4_Util_js__WEBPACK_IMPORTED_MODULE_7__.stringHash
  }), fl);
}
function hasDebugArgs() {
  return argFlagIsOn((0,_fable_modules_fable_library_4_1_4_List_js__WEBPACK_IMPORTED_MODULE_5__.ofArray)(["--debug", "-d"]));
}
_electron_remote_main__WEBPACK_IMPORTED_MODULE_1__.initialize();
const debug = false;
const isMacos = process.platform === "darwin";
const isWin = process.platform === "win32";
_Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.app.name = "Issie";
let mainWindow = (0,_fable_modules_fable_library_4_1_4_Util_js__WEBPACK_IMPORTED_MODULE_7__.createAtom)(void 0);
let closeAfterSave = (0,_fable_modules_fable_library_4_1_4_Util_js__WEBPACK_IMPORTED_MODULE_7__.createAtom)(false);
function wait(n, cont) {
  (0,_fable_modules_fable_library_4_1_4_Async_js__WEBPACK_IMPORTED_MODULE_8__.startImmediate)(_fable_modules_fable_library_4_1_4_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_9__.singleton.Delay(() => _fable_modules_fable_library_4_1_4_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_9__.singleton.TryFinally(_fable_modules_fable_library_4_1_4_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_9__.singleton.Delay(() => _fable_modules_fable_library_4_1_4_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_9__.singleton.For((0,_fable_modules_fable_library_4_1_4_Seq_js__WEBPACK_IMPORTED_MODULE_6__.toList)((0,_fable_modules_fable_library_4_1_4_Range_js__WEBPACK_IMPORTED_MODULE_10__.rangeDouble)(1, 1, n)), _arg => {
    const i = _arg | 0;
    (0,_fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_11__.toConsole)((0,_fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_11__.printf)("%i before"))(i);
    return _fable_modules_fable_library_4_1_4_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_9__.singleton.Bind((0,_fable_modules_fable_library_4_1_4_Async_js__WEBPACK_IMPORTED_MODULE_8__.sleep)(1000), () => {
      (0,_fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_11__.toConsole)((0,_fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_11__.printf)("%i after"))(i);
      return _fable_modules_fable_library_4_1_4_AsyncBuilder_js__WEBPACK_IMPORTED_MODULE_9__.singleton.Zero();
    });
  })), () => {
    cont();
  })));
}
function dispatchToRenderer(_arg1_, _arg1__1) {
  const _arg = [_arg1_, _arg1__1];
  const s = _arg[1];
  const menuType = _arg[0];
  if (mainWindow() == null) {} else {
    const win = mainWindow();
    const args_1 = [(0,_fable_modules_fable_library_4_1_4_Option_js__WEBPACK_IMPORTED_MODULE_12__.some)(`${menuType},${s}`)];
    win.webContents.send("context-menu-command", ...args_1);
  }
}
function createMainWindow() {
  const options_1 = (0,_fable_modules_fable_library_4_1_4_Util_js__WEBPACK_IMPORTED_MODULE_7__.jsOptions)(options => {
    options.show = true;
    options.autoHideMenuBar = false;
    options.backgroundColor = "#FFFFFF";
    options.opacity = 0.8;
    const isDev = process.defaultApp === true;
    if (isDev) {
      options.icon = path__WEBPACK_IMPORTED_MODULE_2__.join('static', "icon-1.png");
    } else {
      options.icon = "/static/icon-1.png";
    }
    options.title = "issie";
    options.webPreferences = (0,_fable_modules_fable_library_4_1_4_Util_js__WEBPACK_IMPORTED_MODULE_7__.jsOptions)(o => {
      o.nodeIntegration = true;
      o.contextIsolation = false;
      o.devTools = true;
    });
  });
  const window$ = new _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.BrowserWindow(options_1);
  const webContents = window$.webContents;
  _electron_remote_main__WEBPACK_IMPORTED_MODULE_1__.enable(webContents);
  mainWindow(window$);
  return window$;
}
function startRenderer(doAfterReady) {
  _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.app.on('ready', (_arg, _arg_1) => {
    const window$ = createMainWindow();
    doAfterReady(window$);
  });
}
function loadAppIntoWidowWhenReady(window$) {
  const loadWindowContent = window$_1 => {
    let arg, arg_3;
    if (window$_1.isMinimized()) {
      window$_1.show();
    }
    const isDev = process.defaultApp === true;
    if (isDev) {
      if (debug) {
        window$_1.webContents.openDevTools();
      }
      arg = (0,_fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_11__.toText)((0,_fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_11__.printf)("http://localhost:8672")), window$_1.loadURL(arg);
      process.on("uncaughtException", err => {
        console.error((0,_fable_modules_fable_library_4_1_4_Option_js__WEBPACK_IMPORTED_MODULE_12__.some)(err));
      });
    } else {
      let url;
      let arg_2;
      const arg_1 = path__WEBPACK_IMPORTED_MODULE_2__.join(__dirname, "index.html");
      arg_2 = (0,_fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_11__.toText)((0,_fable_modules_fable_library_4_1_4_String_js__WEBPACK_IMPORTED_MODULE_11__.printf)("file:///%s"))(arg_1);
      url = new URL(arg_2);
      arg_3 = url__WEBPACK_IMPORTED_MODULE_3__.format(url, {}), window$_1.loadURL(arg_3);
    }
  };
  loadWindowContent(window$);
  return window$.webContents.on("did-finish-load", () => {
    window$.setOpacity(1);
    window$.maximize();
  });
}
function addListeners(window$) {
  let tupledArg, objectArg;
  window$.on('closed', () => {
    mainWindow(void 0);
  });
  window$.on('blur', () => {
    window$.webContents.send("windowLostFocus");
  });
  tupledArg = ["close", e => {
    if (!closeAfterSave()) {
      const value_2 = e.preventDefault();
      window$.webContents.send("closingWindow");
    }
  }], window$.on(tupledArg[0], tupledArg[1]);
  _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.ipcMain.on("exit-the-app", _arg_2 => {
    closeAfterSave(true);
    (0,_fable_modules_fable_library_4_1_4_Seq_js__WEBPACK_IMPORTED_MODULE_6__.iterate)(win => {
      win.close();
    }, (0,_fable_modules_fable_library_4_1_4_Option_js__WEBPACK_IMPORTED_MODULE_12__.toArray)(mainWindow()));
  });
  _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.ipcMain.on("get-user-data", (event, args_1) => {
    let userAppDirOpt;
    try {
      userAppDirOpt = _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.app.getPath("userData");
    } catch (matchValue) {
      userAppDirOpt = void 0;
    }
    event.returnValue = (0,_fable_modules_fable_library_4_1_4_Option_js__WEBPACK_IMPORTED_MODULE_12__.defaultArg)(userAppDirOpt, "");
  });
  _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.ipcMain.on("toggle-dev-tools", (_arg_3, _arg_4) => {
    (0,_fable_modules_fable_library_4_1_4_Seq_js__WEBPACK_IMPORTED_MODULE_6__.iterate)(win_1 => {
      win_1.webContents.toggleDevTools();
    }, (0,_fable_modules_fable_library_4_1_4_Option_js__WEBPACK_IMPORTED_MODULE_12__.toArray)(mainWindow()));
  });
  _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.ipcMain.on("show-context-menu", (event_1, args_2) => {
    (0,_Renderer_UI_ContextMenus_fs_js__WEBPACK_IMPORTED_MODULE_4__.makeMenu)(window$, tupledArg_1 => {
      dispatchToRenderer(tupledArg_1[0], tupledArg_1[1]);
    }, args_2)(event_1);
  });
  objectArg = _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.app, objectArg.on('window-all-closed', () => {
    _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.app.quit();
  });
  _Renderer_Common_ElectronAPI_fs_js__WEBPACK_IMPORTED_MODULE_0__.Electron_mainProcess.app.on('activate', (_arg_6, _arg_7) => {
    if (mainWindow() == null) {
      (0,_fable_modules_fable_library_4_1_4_Util_js__WEBPACK_IMPORTED_MODULE_7__.equals)(window$, createMainWindow());
      mainWindow(window$);
      loadAppIntoWidowWhenReady(addListeners(window$));
      mainWindow(window$);
    }
  });
  return window$;
}
function startup() {
  startRenderer(win => {
    loadAppIntoWidowWhenReady(addListeners(win));
  });
}
startup();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map