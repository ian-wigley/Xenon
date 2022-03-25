import CExplosion = require("Explosion");
import enums = require("Enums");
import CApplication = require("Application");
import CPlayGameState = require("PlayGameState");

class CBigExplosion extends CExplosion {

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_name = "BigExplosion";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BIG_EXPLOSION);
    }

    //-------------------------------------------------------------

    public activate() {
        this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_BIG_EXPLOSION);//getPosition().getX());
        return super.activate();
    }
}

export = CBigExplosion;