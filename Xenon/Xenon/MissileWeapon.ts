import gsCVector = require("Vector");
import CScene = require("Scene");
import CWeapon = require("Weapon");
import CMissile = require("Missile");
import enums = require("Enums");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");

//import CScene = require("Scene");
//import CWeapon = require("Weapon");
//import CHomingMissile = require("HomingMissile");
//import CAlien = require("Alien");
//import gsCVector = require("Vector");
//import enums = require("Enums");

class CMissileWeapon extends CWeapon {

    constructor(scene: CScene) {
        super(scene);
        this.m_name = "MissileWeapon";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MISSILE_WEAPON);
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer) {
        super.update(controls, gameTime);

        if (this.do_fire) {
            //var obj = this.getOwner();
            //this.getOwner();
            this.fire();
            //controls.fire = false;
        }

        return true;
    }

    //-------------------------------------------------------------

    public fire() {
        if (!this.isValidFiringPosition()) {
            return false;
        }

        var m: CMissile = new CMissile(this.m_scene);
        this.m_scene.addActor(m);
        m.activate();
        var grade: number = this.m_grade;
        m.setGrade(grade);//<BulletGrade>this.m_grade);

        switch (this.m_direction) {
            case enums.WeaponDirection.WEAPON_FORWARD:
                //m.setPosition(this.getPosition() - new gsCVector(0.0, 24.0));
                //m.setPosition(new gsCVector(this.getPosition().x - new gsCVector(0.0, 24.0).x, this.getPosition().y - new gsCVector(0.0, 24.0).y));
                m.setPosition(new gsCVector(this.getPosition().x, this.getPosition().y - 24.0));

                ////var temp = m.getSpeed().m_speed[this.m_grade];
                //// m.setVelocity(new gsCVector(0.0, -m.getActorInfo().m_speed[this.m_grade]));
                //m.getSpeed();

                m.setVelocity(new gsCVector(0, -m.getSpeed()));//10));
                break;
            case enums.WeaponDirection.WEAPON_REVERSE:
                //m.setPosition(getPosition() + new gsCVector(0.0, 24.0));
                m.setPosition(new gsCVector(this.getPosition().x - new gsCVector(0.0, 24.0).x, this.getPosition().y - new gsCVector(0.0, 24.0).y));
                m.setVelocity(new gsCVector(0.0, m.getActorInfo().m_speed[this.m_grade]));
                break;
        }

        if (this.getOwner() && this.getOwner().getActorInfo().m_type == enums.ActorType.ACTOR_TYPE_SHIP) {
            //   CGameState::playSample(SAMPLE_FIRE_MISSILE,getPosition().getX());
        }
        return true;
    }

}
export = CMissileWeapon;