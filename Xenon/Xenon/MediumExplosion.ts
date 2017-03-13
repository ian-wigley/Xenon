import CExplosion = require("Explosion");
import enums = require("Enums");

class CMediumExplosion extends CExplosion {

    constructor() {
        super();
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MEDIUM_EXPLOSION);
    }

    //-------------------------------------------------------------

    public activate() {
        //CGameState::playSample(SAMPLE_MEDIUM_EXPLOSION,getPosition().getX());
        return super.activate();
    }
}

export = CMediumExplosion;