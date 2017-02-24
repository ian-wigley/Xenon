var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Weapon"], function (require, exports, CWeapon) {
    "use strict";
    var CLaserWeapon = (function (_super) {
        __extends(CLaserWeapon, _super);
        function CLaserWeapon(scene) {
            _super.call(this, scene);
        }
        return CLaserWeapon;
    }(CWeapon));
    return CLaserWeapon;
});
//# sourceMappingURL=LaserWeapon.js.map