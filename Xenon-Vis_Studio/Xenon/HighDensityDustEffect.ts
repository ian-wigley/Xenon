import CDustEffect = require("DustEffect");
import enums = require("Enums");

class CHighDensityDustEffect extends CDustEffect {

    constructor() {
        super();
        this.m_name = "HighDensityDustEffect";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HIGHDENSITY_DUST_EFFECT);
    }
}
export = CHighDensityDustEffect;