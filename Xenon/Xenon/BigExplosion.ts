import CExplosion = require("Explosion");
import enums = require("Enums");

class CBigExplosion extends CExplosion {

    getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BIG_EXPLOSION);
    }

    activate() {
        //CGameState::playSample(SAMPLE_BIG_EXPLOSION,getPosition().getX());
        return super.activate();
    }
}
export = CBigExplosion;