import CWeapon = require("Weapon");
import CSpinner = require("Spinner");
import enums = require("Enums");
import gsCVector = require("Vector");

class CSpinnerWeapon extends CWeapon {
    m_directionS: gsCVector;

    constructor() {
        super();
        this.m_directionS = new gsCVector(0.0, 1.0);
    }

    public getActorInfo() //:ActorInfo 
    {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SPINNER_WEAPON);
    }
    //public ActorInfo getActorInfo()
    //{
    //    return null;//ActorInfoList[INFO_SPINNER_WEAPON]; 
    //}


    public fire(): boolean {
        if (!this.isValidFiringPosition()) {
            return false;
        }

        var m: CSpinner = new CSpinner();
        this.m_scene.addActor(m);

        m.activate();
       // m.setGrade(<enums.BulletGrade>this.m_grade);//  (BulletGrade)m_grade);
        m.setPosition(this.getPosition());
        //           m.setVelocity(m.getActorInfo().m_speed[m_grade] * m_direction);

        return true;
    }

    //-------------------------------------------------------------

    public setDirectionS(direction: gsCVector): void {
        this.m_directionS = direction;
    }
}

export = CSpinnerWeapon;