import CBullet = require("Bullet");
import enums = require("Enums");

class CSpinner extends CBullet {
    private SPINNER_FRAMES: number = 8;

    constructor() {
        super();
    }

    public getActorInfo()  {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SPINNER);
    }
}

export = CSpinner;