enum BossState {
    BOSS_MOVE_DOWN,
    BOSS_STATIC,
    BOSS_MOVE_UP,
    BOSS_BEGIN_LOOP,
    BOSS_END_LOOP,
    BOSS_TRIGGER,
    BOSS_DESTROY,
    BOSS_ROAR,
    BOSS_SNORT,
    BOSS_DEAD,
    BOSS_OPEN_EYES,
    BOSS_SHUT_EYES,
}

//-------------------------------------------------------------

class BossScriptItem {
    public m_state: BossState;
    public m_param: number;
}

import CBoss = require("Boss")
import gsCControls = require("Controls");

class CBossControl extends CBoss {
    public CBossControl() {

    }

    m_is_started: boolean;
    m_yscroll: boolean;

    m_state: BossState;
    m_counter: number;

    m_script: BossScriptItem[];
    m_script_pointer: BossScriptItem;
    m_loop_point: BossScriptItem;

    interpretScript(): void {

    }

    //	Point m_tile_pos;
    m_size: number;
    //	gsCTimer m_destruction_timer;

    //	void explodeTile(const Point pos);

    public initiateDestructionSequence(): void { }

    public updateDestructionSequence(): void { }

    public getActorInfo()//:ActorInfo 
    {
        return null;//ActorInfoList[INFO_BOSSCONTROL]; 
    }

    public activate(): boolean {
        return false;
    }

    public kill(): void { }

    public update(controls: gsCControls): boolean {
        return false;
    }

    public getYScroll(): number {
        return 0;
    }

    isStarted(): boolean {
        return false;
    }
}

export = CBossControl;