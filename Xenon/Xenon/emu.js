define(["require", "exports"], function (require, exports) {
    "use strict";
    var enu;
    (function (enu) {
        (function (gsTimerState) {
            gsTimerState[gsTimerState["gsTIMER_RESET"] = 0] = "gsTIMER_RESET";
            gsTimerState[gsTimerState["gsTIMER_ACTIVE"] = 1] = "gsTIMER_ACTIVE";
            gsTimerState[gsTimerState["gsTIMER_PAUSED"] = 2] = "gsTIMER_PAUSED";
        })(enu.gsTimerState || (enu.gsTimerState = {}));
        var gsTimerState = enu.gsTimerState;
        ;
    })(enu || (enu = {}));
    return enu;
});
//# sourceMappingURL=emu.js.map