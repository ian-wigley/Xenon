import gsCVector = require("Vector");
import CActor = require("Actor");
import CEngine = require("Engine");
import CActorInfoList = require("ActorInfoList");
import enums = require("Enums");

class CRetroEngine extends CEngine {
    private m_direction: enums.RetroDirection;
    //private m_actorInfo: CActorInfoList;

    act: CActor;
    m_name = "RetroEngine";

    public CRetroEngine(listOfActors: CActorInfoList) {
        this.m_direction = enums.RetroDirection.RETRO_NW;
        this.m_actorInfo = listOfActors;
    }

    //-------------------------------------------------------------

    public Draw(ctx: CanvasRenderingContext2D) {
        //if (getOwner() &&  getOwner().getActorInfo().m_type == ACTOR_TYPE_SHIP &&
        //    ((CShip *) getOwner())->isCloaked())
        //    return true;

        if (this.m_thrust > 0) {
            switch (this.m_direction) {
                case enums.RetroDirection.RETRO_NW:
                    this.animations(enums.AnimationMode.ANIMATE_LOOP, 0, 2);
                    break;
                case enums.RetroDirection.RETRO_NE:
                    this.animations(enums.AnimationMode.ANIMATE_LOOP, 2, 2);
                    break;
                case enums.RetroDirection.RETRO_SW:
                    this.animations(enums.AnimationMode.ANIMATE_LOOP, 4, 2);
                    break;
                case enums.RetroDirection.RETRO_SE:
                    this.animations(enums.AnimationMode.ANIMATE_LOOP, 6, 2);
                    break;
            }

            super.Draw(ctx);
        }

        return true;
    }

    //-------------------------------------------------------------

    public setDirection(direction: enums.RetroDirection) {
        this.m_direction = direction;
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_RETRO_ENGINE);

    }
}
export = CRetroEngine;