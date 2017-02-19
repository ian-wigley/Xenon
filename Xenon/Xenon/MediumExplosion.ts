import CExplosion = require("Explosion");
import enums = require("Enums");

class CMediumExplosion extends CExplosion {

    getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MEDIUM_EXPLOSION);
    }

    activate() {
        //CGameState::playSample(SAMPLE_MEDIUM_EXPLOSION,getPosition().getX());

        return super.activate();
    }
};
export = CMediumExplosion;