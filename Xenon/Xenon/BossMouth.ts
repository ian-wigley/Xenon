import CBoss = require("Boss")
import ActorInfo = require("ActorInfo")
import gsCControls = require("Controls");
import enums = require("Enums");

class CBossMouth extends CBoss {
    public CBossMouth() {

    }

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BOSSMOUTH);
    }

    public activate(): boolean {
        return false;
    }

    public update(controls: gsCControls): boolean {
        return false;
    }

    public trigger(mode: number, shots: number, delay: number): void {
    }
}

export = CBossMouth;