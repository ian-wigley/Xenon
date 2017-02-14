import CBoss = require("Boss")
import ActorInfo = require("ActorInfo")
import gsCControls = require("Controls");

class CBossMouth extends CBoss {
    public CBossMouth() {

    }

    public getActorInfo(): ActorInfo {
        return null;// ActorInfoList[INFO_BOSSMOUTH]; 
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