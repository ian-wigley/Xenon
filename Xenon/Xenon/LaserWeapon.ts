import CLaser = require("Laser");
import CScene = require("Scene");
import CWeapon = require("Weapon");
import enums = require("Enums");
import gsCVector = require("Vector");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CPlayGameState = require("PlayGameState");

class CLaserWeapon extends CWeapon {

    constructor(scene: CScene, playGameState: CPlayGameState) {
        super(scene);
        this.m_playGameState = playGameState;
        this.m_name = "LaserWeapon";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_LASER_WEAPON);
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

    public fire(): boolean {
        if (!this.isValidFiringPosition()) {
            return false;
        }

        var l: CLaser = new CLaser(this.m_playGameState);
        this.m_scene.addActor(l);
        l.activate();
        var grade: number = this.m_grade;
        l.setGrade(grade);
        l.setPosition(this.getPosition());
        l.setVelocity(new gsCVector(0.0, -20));//l.getActorInfo().m_speed));//this.m_grade]));

        if (this.getOwner() && this.getOwner().getActorInfo().m_type == enums.ActorType.ACTOR_TYPE_SHIP) {
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_FIRE_LASER);
            //CGameState::playSample(SAMPLE_FIRE_LASER, getPosition().getX());
        }
        return true;
    }

    //-------------------------------------------------------------
}

export = CLaserWeapon;