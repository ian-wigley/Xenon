import CScene = require("Scene");
import CEngine = require("Engine");
import CShip = require("Ship");
import enums = require("Enums");

class CShipEngine extends CEngine {

    constructor(theScene: CScene) {
        super(theScene);
    }

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SHIP_ENGINE);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.getOwner() && this.getOwner().getActorInfo().m_type == enums.ActorType.ACTOR_TYPE_SHIP &&
            (<CShip>this.getOwner()).isCloaked())
            return true;

        if (this.m_thrust > 0) {
            this.animate(enums.AnimationMode.ANIMATE_LOOP);
            this.draw(ctx);
        }
        return false;
    }
}

export = CShipEngine;