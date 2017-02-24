import CActor = require("Actor")
import CBossMouth = require("BossMouth")

class CBoss extends CActor {

    //-------------------------------------------------------------

    BOSS_EYES_TOTAL: number = 6;

    //-------------------------------------------------------------

    protected m_active_eyes: number = 0;
    protected m_mouth: CBossMouth;

    public CBoss() {
    }

    public getShield(): number {
        return 100 * this.m_active_eyes / this.BOSS_EYES_TOTAL;
    }
}
export = CBoss;