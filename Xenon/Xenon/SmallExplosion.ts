import CExplosion = require("Explosion");
import enums = require("Enums");
import CPlayGameState = require("PlayGameState");

class CSmallExplosion extends CExplosion {

    constructor(playGameState?: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_name = "SmallExplosion";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SMALL_EXPLOSION);
    }

    //-------------------------------------------------------------

    public activate() {
        if (this.m_playGameState) {
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_SMALL_EXPLOSION);//getPosition().getX());
        }
        return super.activate();
    }
}

export = CSmallExplosion;