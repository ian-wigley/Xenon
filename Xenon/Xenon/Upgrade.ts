import gsCVector = require("Vector");
import gsCMap = require("Map");
import CActor = require("Actor");
import CScene = require("Scene");
import CWeapon = require("Weapon");
import CMissileWeapon = require("MissileWeapon");
import enums = require("Enums");

class CUpgrade extends CActor {

    //-------------------------------------------------------------
    UPGRADE_MAP_HIT: number = 10;			// energy lost if upgrade hits map
    //-------------------------------------------------------------

    m_offset: gsCVector;
    m_weapon: CWeapon;
    m_weapon_type: enums.WeaponType;

    constructor(scene: CScene) {
        super(scene);
        this.m_offset = new gsCVector(0.0, 0.0);
        this.m_weapon = null;
        this.m_weapon_type = enums.WeaponType.NO_WEAPON;
    }

    public activate() {
        if (!this.isActive()) {
            this.setWeapon(enums.WeaponType.MISSILE_WEAPON);
        }
        return super.activate();
    }

    public kill() {
        if (this.m_weapon) {
            this.m_weapon.kill();
            this.m_weapon = null;
        }
        super.kill();
    }

    public setOffset(offset: gsCVector) {
        this.m_offset = offset;
    }

    //-------------------------------------------------------------

    registerHit(energy: number, hitter: CActor) {
        //	if (getOwner() &&
        //		((CShip *) getOwner())- > getDiveLevel() > 0)
        //		return;

        //	CActor::registerHit(energy, hitter);
    }

    //-------------------------------------------------------------

    onCollisionWithActor(actor: CActor) {
        //	if (getOwner() &&
        //		((CShip *) getOwner())- > getDiveLevel() > 0)
        //		return;

        //    switch (actor- > getActorInfo().m_type) {
        //        case ACTOR_TYPE_PICKUP:
        //			((CPickup *) actor)- > collect();
        //			actor- > kill();
        //            break;
        //        case ACTOR_TYPE_ALIEN:
        //            registerHit(1, this);
        //			actor- > registerHit(1, this);
        //            break;
        //    }
    }

    //-------------------------------------------------------------

    onCollisionWithMap(map: gsCMap, hits: number) {
        //if (getOwner() &&
        //    ((CShip *) getOwner())- > getDiveLevel() > 0)
        //    return;

        //    registerHit(UPGRADE_MAP_HIT, this);
    }

    //-------------------------------------------------------------

    public setWeapon(type: enums.WeaponType, grade: enums.WeaponGrade = enums.WeaponGrade.WEAPON_STANDARD) {
        if (this.m_weapon) {
            this.m_weapon.kill();
            this.m_weapon = null;
        }

        this.m_weapon_type = type;

        switch (this.m_weapon_type) {
            case enums.WeaponType.NO_WEAPON:
                this.m_weapon = null;
                break;
            case enums.WeaponType.MISSILE_WEAPON:
                this.m_weapon = new CMissileWeapon(this.m_scene);
                break;
            case enums.WeaponType.HOMING_MISSILE_WEAPON:
                //this.m_weapon = new CHomingMissileWeapon(this.m_scene);
                break;
            case enums.WeaponType.LASER_WEAPON:
                //this.m_weapon = new CLaserWeapon(this.m_scene);
                break;
        }

        if (this.m_weapon) {
            this.m_scene.addActor(this.m_weapon);
            this.m_weapon.activate();
            this.m_weapon.setGrade(grade);
            this.m_weapon.setOwner(this);
        }
    }

    //-------------------------------------------------------------

    upgradeWeapon() {
        if (this.m_weapon && this.m_weapon.upgrade()) {
            return true;
        }
        return false;
    }

    public getWeapon() {
        return this.m_weapon;
    }

    public getWeaponType() {
        return this.m_weapon_type;
    }
}
export = CUpgrade;