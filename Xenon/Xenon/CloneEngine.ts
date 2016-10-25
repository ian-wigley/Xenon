import CEngine = require("Engine");
import CScene = require("Scene");
import CShip = require("Ship");
import enums = require("Enums");

class CCloneEngine extends CEngine {

    constructor(theScene: CScene) {
        super(theScene);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.getOwner() != null && this.getOwner().getOwner() != null &&
            this.getOwner().getOwner().getActorInfo().m_type == enums.ActorType.ACTOR_TYPE_SHIP &&
            (<CShip>this.getOwner().getOwner()).isCloaked())
            return true;

        if (this.m_thrust > 0) {
            this.animate(enums.AnimationMode.ANIMATE_LOOP);
            super.Draw(ctx);
        }
        return true;
    }
}
export = CCloneEngine;