import gsCVector = require("Vector");
import gsCMap = require("Map");
import CActor = require("Actor");
import CScene = require("Scene");
import CWeapon = require("Weapon");
import CMissileWeapon = require("MissileWeapon");
import CHomingMissileWeapon = require("HomingMissileWeapon");
import CLaserWeapon = require("LaserWeapon");
import enums = require("Enums");
import CShip = require("Ship");
import Pickup = require("Pickup");
import CPlayGameState = require("PlayGameState");

class CUpgrade extends CActor {

    //-------------------------------------------------------------
    UPGRADE_MAP_HIT: number = 10;			// energy lost if upgrade hits map
    //-------------------------------------------------------------

    m_offset: gsCVector;
    m_weapon: CWeapon;
    m_weapon_type: enums.WeaponType;
    protected m_playGameState: CPlayGameState;

    constructor(scene?: CScene) {
        super(scene);
        this.m_offset = new gsCVector(0.0, 0.0);
        this.m_weapon = null;
        this.m_weapon_type = enums.WeaponType.NO_WEAPON;
        this.m_name = "Upgrade";
    }

    //-------------------------------------------------------------

    public activate() {
        if (!this.isActive()) {
            this.setWeapon(enums.WeaponType.MISSILE_WEAPON, 0);
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public kill() {
        if (this.m_weapon) {
            this.m_weapon.kill();
            this.m_weapon = null;
        }
        super.kill();
    }

    //-------------------------------------------------------------

    public setOffset(offset: gsCVector) {
        this.m_offset = offset;
    }

    //-------------------------------------------------------------

    public registerHit(energy: number, hitter: CActor) {
        if (this.getOwner() && (<CShip>this.getOwner()).getDiveLevel() > 0) {
            return;
        }
        //this.registerHit(energy, hitter);
        super.registerHit(energy, hitter);
    }

    //-------------------------------------------------------------

    public onCollisionWithActor(actor: CActor) {
        if (this.getOwner() &&
            (<CShip>this.getOwner()).getDiveLevel() > 0) {
            return;
        }

        switch (actor.getActorInfo().m_type) {
            case enums.ActorType.ACTOR_TYPE_PICKUP:
                var act = <Pickup.CPickup>actor; //(<Pickup.CPickup> actor).collect();
                act.collect();
                actor.kill();
                break;
            case enums.ActorType.ACTOR_TYPE_ALIEN:
                this.registerHit(1, this);
                actor.registerHit(1, this);
                break;
        }
    }

    //-------------------------------------------------------------

    public onCollisionWithMap(map: gsCMap, hits: number) {
        if (this.getOwner() &&
            (<CShip>this.getOwner()).getDiveLevel() > 0) {
            return;
        }
        this.registerHit(this.UPGRADE_MAP_HIT, this);
    }

    //-------------------------------------------------------------

    //public setWeapon(type: enums.WeaponType, grade: enums.WeaponGrade = enums.WeaponGrade.WEAPON_STANDARD) {
    public setWeapon(type: enums.WeaponType, grade?: enums.WeaponGrade) {
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
                this.m_weapon = new CMissileWeapon(this.m_scene, this.m_playGameState);
                break;
            case enums.WeaponType.HOMING_MISSILE_WEAPON:
                this.m_weapon = new CHomingMissileWeapon(this.m_scene, this.m_playGameState);
                break;
            case enums.WeaponType.LASER_WEAPON:
                this.m_weapon = new CLaserWeapon(this.m_scene, this.m_playGameState);
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

    public upgradeWeapon() {
        if (this.m_weapon && this.m_weapon.upgrade()) {
            return true;
        }
        return false;
    }

    //-------------------------------------------------------------

    public getWeapon() {
        return this.m_weapon;
    }

    //-------------------------------------------------------------

    public getWeaponType() {
        return this.m_weapon_type;
    }
}
export = CUpgrade;