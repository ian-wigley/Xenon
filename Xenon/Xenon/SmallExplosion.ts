import CExplosion = require("Explosion");
import enums = require("Enums");

class CSmallExplosion extends CExplosion {

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SMALL_EXPLOSION);
    }

    public activate() {
        //    //CGameState::playSample(SAMPLE_SMALL_EXPLOSION,getPosition().getX());
        return this.activate();
    }
}

export = CSmallExplosion;