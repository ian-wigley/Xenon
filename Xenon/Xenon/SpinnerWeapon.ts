import CWeapon = require("Weapon");
import CSpinner = require("Spinner");
import enums = require("Enums");
import gsCVector = require("Vector");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CPlayGameState = require("PlayGameState");

class CSpinnerWeapon extends CWeapon {
    private m_directionS: gsCVector;

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_directionS = new gsCVector(0.0, 1.0);
        this.m_name = "SpinnerWeapon";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SPINNER_WEAPON);
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

        var m: CSpinner = new CSpinner(this.m_playGameState);
        this.m_scene.addActor(m);

        m.activate();
        var grade: number = this.m_grade;
        m.setGrade(grade);//m.setGrade(<enums.BulletGrade>this.m_grade);//  (BulletGrade)m_grade);
        m.setPosition(this.getPosition());
        var p: gsCVector = m.getActorInfo().m_speed;//[this.m_grade];
        var t: gsCVector = p.multVec(this.m_directionS);
        m.setVelocity(t); //m.setVelocity(m.getActorInfo().m_speed[this.m_grade]);// * this.m_direction);

        return true;
    }

    //-------------------------------------------------------------

    public setDirectionS(direction: gsCVector): void {
        this.m_directionS = direction;
    }
}

export = CSpinnerWeapon;