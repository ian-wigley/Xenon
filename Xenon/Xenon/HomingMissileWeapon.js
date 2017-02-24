var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Weapon"], function (require, exports, CWeapon) {
    "use strict";
    var CHomingMissileWeapon = (function (_super) {
        __extends(CHomingMissileWeapon, _super);
        function CHomingMissileWeapon(scene) {
            _super.call(this, scene);
        }
        return CHomingMissileWeapon;
    }(CWeapon));
    return CHomingMissileWeapon;
});
//# sourceMappingURL=HomingMissileWeapon.js.map