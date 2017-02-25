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
import gsCVector = require("Vector");
import gsCPoint = require("Point");
import gsCTimer = require("Timer");
import enums = require("Enums");

class CBossControl extends CBoss {

    m_is_started: boolean;
    m_yscroll: number = 0; boolean;
    m_state: BossState;
    m_counter: number;
    m_script: BossScriptItem[];
    m_script_pointer: BossScriptItem;
    m_loop_point: BossScriptItem;

    m_tile_pos: gsCPoint;
    m_size: number;
    m_destruction_timer: gsCTimer;

    constructor() {
        super();
        this.m_is_started = false;
        this.m_timer = new gsCTimer();
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
            this.m_is_started = true;
            this.m_yscroll = 0;
            //this.m_script_pointer = this.m_loop_point = this.m_script;
            this.m_active_eyes = this.BOSS_EYES_TOTAL;
            this.interpretScript();
        }

        return super.activate();
    }

    //-------------------------------------------------------------

    public kill(): void {
        this.m_is_started = false;

        super.kill();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls): boolean {
        if (this.m_state == BossState.BOSS_DEAD)
            return true;

        if (this.m_active_eyes == 0 && this.m_state != BossState.BOSS_DESTROY)
            this.initiateDestructionSequence();

        if (this.m_state == BossState.BOSS_DESTROY)
            this.updateDestructionSequence();
        else {
            if (this.m_counter <= 0)
                this.interpretScript();

            switch (this.m_state) {
                case BossState.BOSS_MOVE_DOWN:
                    this.m_yscroll = 1;
                    break;
                case BossState.BOSS_STATIC:
                    this.m_yscroll = 0;
                    break;
                case BossState.BOSS_MOVE_UP:
                    this.m_yscroll = -1;
                    break;
            }

            this.m_counter--;
        }

        return true;
    }

    //-------------------------------------------------------------

    public interpretScript(): void {
        //    if (this.m_script_pointer.m_state == BossState.BOSS_BEGIN_LOOP)
        //    this.m_loop_point = ++m_script_pointer;

        //    if (this.m_script_pointer.m_state == BossState.BOSS_END_LOOP)
        //    this.m_script_pointer = this.m_loop_point;

        //if (m_script_pointer ->m_state == BOSS_TRIGGER) {
        //    switch (m_script_pointer ->m_param) {
        //        case 0:
        //            m_mouth ->trigger(0, 16, 0.05f);
        //            break;
        //        case 1:
        //            m_mouth ->trigger(1, 16, 0.05f);
        //            break;
        //        case 2:
        //            m_mouth ->trigger(2, 16, 0.05f);
        //            break;
        //        case 3:
        //            m_mouth ->trigger(3, 16, 0.05f);
        //            break;
        //    }

        //    m_script_pointer++;
        //}

        //if (m_script_pointer ->m_state == BOSS_ROAR) {
        //    CGameState::playSample(SAMPLE_ROAR);
        //    m_script_pointer++;
        //}

        //if (m_script_pointer ->m_state == BOSS_SNORT) {
        //    CGameState::playSample(SAMPLE_SNORT);
        //    m_script_pointer++;
        //}

        //if (m_script_pointer ->m_state == BOSS_OPEN_EYES) {
        //    CBossEye::setState(BOSSEYE_OPEN);
        //    m_script_pointer++;
        //}

        //if (m_script_pointer ->m_state == BOSS_SHUT_EYES) {
        //    CBossEye::setState(BOSSEYE_SHUT);
        //    m_script_pointer++;
        //}

        //m_counter = m_script_pointer ->m_param;
        //m_state = m_script_pointer ->m_state;

        //m_script_pointer++;
    }

    //-------------------------------------------------------------

    public isStarted(): boolean {
        return this.m_is_started;
    }

    //-------------------------------------------------------------

    getYScroll(): number {
        return this.m_yscroll;
    }

    //-------------------------------------------------------------

    public initiateDestructionSequence(): void {
        this.m_state = BossState.BOSS_DESTROY;

        this.m_scene.findShip().setCloak(1000.0);

        this.m_yscroll = 1;

        var epicentre: gsCVector = this.m_mouth.getPosition();

        var tile_size: gsCPoint = this.m_scene.getMap().getImage().getTileSize();

        //this.m_tile_pos = <gsCPoint>(epicentre) / tile_size;

        this.m_size = 1;

        this.m_destruction_timer.start();
    }

    //-------------------------------------------------------------

    public updateDestructionSequence(): void {
        //if (this.m_destruction_timer.getTime() > 0.1) {
        //    this.m_destruction_timer.start();

        //    for (var x = 0; x < this.m_size; x++) {
        //        explodeTile(m_tile_pos + new gsCPoint(x, 0));
        //        explodeTile(m_tile_pos + new gsCPoint(x, m_size - 1));
        //        explodeTile(m_tile_pos + new gsCPoint(0, x));
        //        explodeTile(m_tile_pos + new gsCPoint(m_size - 1, x));
        //    }

        //    this.m_tile_pos = this.m_tile_pos - newgsCPoint(1, 1);
        //    this.m_size += 2;

        //    if (this.m_size > 21) {
        //        this.m_state = BossState.BOSS_DEAD;
        //    }
        //}
    }

    //-------------------------------------------------------------

    public explodeTile(pos: gsCPoint): void {
        //        gsCMap *map = m_scene->getMap();

        //gsCMapTile * tile = map ->getMapTile(pos);

        //if (tile) {
        //    if (!tile ->isEmpty() && !tile ->isHidden()) {
        //        tile ->setHidden();

        //        CBigExplosion * exp = new CBigExplosion();
        //        m_scene ->addActor(exp);

        //        gsCPoint tile_size = map ->getImage() ->getTileSize();
        //        gsCPoint tile_centre = tile_size / gsCPoint(2, 2);

        //        gsCPoint p = pos * tile_size + tile_centre;
        //        exp ->setPosition(gsCVector((float) p.getX(), (float) p.getY()));
        //        exp ->activate();
        //    }
        //}
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BOSSCONTROL);
    }

    //public activate(): boolean {
    //    return false;
    //}

    //public kill(): void { }

    //public update(controls: gsCControls): boolean {
    //    return false;
    //}

    //public getYScroll(): number {
    //    return 0;
    //}

    //isStarted(): boolean {
    //    return false;
    //}

    //interpretScript(): void {

    //}



    ////	void explodeTile(const Point pos);

    //public initiateDestructionSequence(): void { }

    //public updateDestructionSequence(): void { }


}

export = CBossControl;