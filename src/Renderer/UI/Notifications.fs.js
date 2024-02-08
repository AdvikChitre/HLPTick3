import { Compose_Lens, Compose_Lens_op_GreaterMinusGreater_Z15C92E89, Optic_Set, Optic_Set_op_HatEquals_Z147477F8 } from "../Common/Optics.fs.js";
import { Msg, fromProperties_, fromMemoryEditor_, fromFiles_, notifications_, fromSimulation_ } from "../Model/ModelType.fs.js";
import { Option, notification as notification_1 } from "../fable_modules/Fulma.2.16.0/Elements/Notification.fs.js";
import { Color_IColor } from "../fable_modules/Fulma.2.16.0/Common.fs.js";
import { notificationStyle } from "./Style.fs.js";
import { tryPick, empty, ofArray, singleton } from "../fable_modules/fable-library.4.1.4/List.js";
import { Option as Option_1, delete$ } from "../fable_modules/Fulma.2.16.0/Elements/Delete.fs.js";
import { DrawModelType_SheetT_Model__Model_get_GetNotifications } from "../DrawBlock/Sheet.fs.js";
import * as react from "react";

export function setSimulationNotificationF(n, model) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), fromSimulation_)(notifications_))(n)(model);
}

export function closeSimulationNotificationF(n, model) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), fromSimulation_)(notifications_))(void 0)(model);
}

export function setFilesNotificationF(n, model) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), fromFiles_)(notifications_))(n)(model);
}

export function closeFilesNotificationF(n, model) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), fromFiles_)(notifications_))(void 0)(model);
}

export function setMemoryEditorNotificationF(n, model) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), fromMemoryEditor_)(notifications_))(n)(model);
}

export function closeMemoryEditorNotificationF(n, model) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), fromMemoryEditor_)(notifications_))(void 0)(model);
}

export function setPropertiesNotificationF(n, model) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), fromProperties_)(notifications_))(n)(model);
}

export function closePropertiesNotificationF(n, model) {
    return Optic_Set_op_HatEquals_Z147477F8(new Optic_Set(), Compose_Lens_op_GreaterMinusGreater_Z15C92E89(new Compose_Lens(), fromProperties_)(notifications_))(void 0)(model);
}

export function errorNotification(text, closeMsg, dispatch) {
    const close = (_arg) => {
        dispatch(closeMsg);
    };
    return notification_1(ofArray([new Option(0, [new Color_IColor(8, [])]), new Option(3, [singleton(notificationStyle)])]), ofArray([delete$(singleton(new Option_1(3, [close])), empty()), text]));
}

export function successNotification(text, closeMsg, dispatch) {
    const close = (_arg) => {
        dispatch(closeMsg);
    };
    return notification_1(ofArray([new Option(0, [new Color_IColor(6, [])]), new Option(3, [singleton(notificationStyle)])]), ofArray([delete$(singleton(new Option_1(3, [close])), empty()), text]));
}

export function errorPropsNotification(text) {
    return (dispatch) => errorNotification(text, new Msg(67, []), dispatch);
}

export function errorFilesNotification(text) {
    return (dispatch) => errorNotification(text, new Msg(63, []), dispatch);
}

export function successSimulationNotification(text) {
    return (dispatch) => successNotification(text, new Msg(60, []), dispatch);
}

export function successPropertiesNotification(text) {
    return (dispatch) => successNotification(text, new Msg(67, []), dispatch);
}

export function warningNotification(text, closeMsg, dispatch) {
    const close = (_arg) => {
        dispatch(closeMsg);
    };
    return notification_1(ofArray([new Option(0, [new Color_IColor(7, [])]), new Option(3, [singleton(notificationStyle)])]), ofArray([delete$(singleton(new Option_1(3, [close])), empty()), text]));
}

export function warningPropsNotification(text) {
    return (dispatch) => warningNotification(text, new Msg(67, []), dispatch);
}

export function warningSimNotification(text) {
    return (dispatch) => warningNotification(text, new Msg(60, []), dispatch);
}

export function displayAlertOnError(dispatch, res) {
    if (res.tag === 1) {
        const e = res.fields[0];
        dispatch(new Msg(62, [errorFilesNotification(e)]));
    }
}

export function displayAlertOnErrorF(res, model) {
    if (res.tag === 1) {
        const e = res.fields[0];
        return setFilesNotificationF(errorFilesNotification(e), model);
    }
    else {
        return model;
    }
}

export function viewNotifications(model, dispatch) {
    let sheetNotifications;
    const matchValue = DrawModelType_SheetT_Model__Model_get_GetNotifications(model.Sheet);
    if (matchValue == null) {
        sheetNotifications = void 0;
    }
    else {
        const msg = matchValue;
        sheetNotifications = ((dispatch_1) => errorNotification(msg, new Msg(58, []), dispatch_1));
    }
    const _arg = tryPick((x) => x, ofArray([sheetNotifications, model.Notifications.FromSimulation, model.Notifications.FromFiles, model.Notifications.FromMemoryEditor, model.Notifications.FromProperties]));
    if (_arg == null) {
        return react.createElement("div", {});
    }
    else {
        const notification = _arg;
        return notification(dispatch);
    }
}

//# sourceMappingURL=Notifications.fs.js.map
