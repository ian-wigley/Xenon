import CExplosion = require("Explosion");
import enums = require("Enums");
import CPlayGameState = require("PlayGameState");

class CMediumExplosion extends CExplosion {

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_name = "MediumExplosion";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MEDIUM_EXPLOSION);
    }

    //-------------------------------------------------------------

    public activate() {
        if (this.m_playGameState) {
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_MEDIUM_EXPLOSION);//getPosition().getX());
        }
        return super.activate();
    }
}

export = CMediumExplosion;