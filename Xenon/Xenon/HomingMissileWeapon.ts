import CScene = require("Scene");
import CWeapon = require("Weapon");
import CHomingMissile = require("HomingMissile");
import CAlien = require("Alien");
import gsCVector = require("Vector");
import enums = require("Enums");

import gsCControls = require("Controls");
import gsCTimer = require("Timer");


class CHomingMissileWeapon extends CWeapon {

    constructor(scene: CScene) {
        super(scene);
        this.m_name = "HomingMissileWeapon";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMING_MISSILE_WEAPON);
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer) {
        super.update(controls, gameTime);

        if (this.do_fire) {
            this.fire();
            //controls.fire = false;
        }
        return true;
    }

    //-------------------------------------------------------------

    public fire() {
        if (!this.isValidFiringPosition())
            return false;

        var h: CHomingMissile = new CHomingMissile();
        this.m_scene.addActor(h);

        var alien: CAlien = null;
        switch (this.m_direction) {
            case enums.WeaponDirection.WEAPON_FORWARD:
                alien = <CAlien>this.m_scene.findNearestActor(enums.ActorType.ACTOR_TYPE_ALIEN, this.getPosition(), -1);

                if (alien) {
                    h.setTarget(alien.getPosition());
                }
                else {
                    h.setTarget(new gsCVector(320.0, this.getPosition().Y - 480.0));
                }
                h.setPosition(this.getPosition().minus(new gsCVector(0.0, 24.0)));
                //h.setVelocity(new gsCVector(0.0, -h.getActorInfo().m_speed[this.m_grade]));
                h.setVelocity(new gsCVector(0.0, -5));
                break;
            case enums.WeaponDirection.WEAPON_REVERSE:
                alien = <CAlien>this.m_scene.findNearestActor(enums.ActorType.ACTOR_TYPE_ALIEN, this.getPosition(), 1);

                if (alien) {
                    h.setTarget(alien.getPosition());
                }
                else {
                    h.setTarget(new gsCVector(320.0, this.getPosition().Y + 480.0));
                }
                h.setPosition(this.getPosition().plus1(new gsCVector(0.0, 24.0)));
                //h.setVelocity(new gsCVector(0.0, h.getActorInfo().m_speed[this.m_grade]));
                h.setVelocity(new gsCVector(0.0, 5));
                break;
        }

        h.activate();
        var grade: number = this.m_grade;
        h.setGrade(grade);

        if (this.getOwner() && this.getOwner().getActorInfo().m_type == enums.ActorType.ACTOR_TYPE_SHIP) {
            //        CGameState::playSample(SAMPLE_FIRE_HOMING_MISSILE, getPosition().getX());
        }

        return true;
    }
}

export = CHomingMissileWeapon;
