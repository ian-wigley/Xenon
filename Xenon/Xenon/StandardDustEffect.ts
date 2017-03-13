import CDustEffect = require("DustEffect");
import enums = require("Enums");

class CStandardDustEffect extends CDustEffect {

    constructor() {
        super();
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_STANDARD_DUST_EFFECT);
    }
}
export = CStandardDustEffect;