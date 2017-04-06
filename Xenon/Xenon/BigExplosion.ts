import CExplosion = require("Explosion");
import enums = require("Enums");

class CBigExplosion extends CExplosion {

    constructor() {
        super();
		this.m_name = "BigExplosion";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BIG_EXPLOSION);
    }

    //-------------------------------------------------------------

    public activate() {
        //CGameState::playSample(SAMPLE_BIG_EXPLOSION,getPosition().getX());
        return super.activate();
    }
}

export = CBigExplosion;