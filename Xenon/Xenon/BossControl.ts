import CBoss = require("Boss")
import gsCControls = require("Controls");
import gsCVector = require("Vector");
import gsCPoint = require("Point");
import gsCTimer = require("Timer");
import enums = require("Enums");
import gsCMapTile = require("MapTile");
import CBigExplosion = require("BigExplosion");
import CBossEye = require("BossEye");
import CBossMouth = require("BossMouth");
import CApplication = require("Application");
import CPlayGameState = require("PlayGameState");

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

class CBossControl extends CBoss {

    private m_is_started: boolean;
    private m_yscroll: number = 0; boolean;
    private m_state: BossState;
    private m_counter: number;
    private m_script: Array<BossScriptItem>;
    private m_script_pointer: BossScriptItem;
    private m_loop_point: BossScriptItem;
    private m_script_pointer_count = 0;
    private m_tile_pos: gsCPoint;
    private m_size: number;
    private m_destruction_timer: gsCTimer;
    private m_eye: CBossEye;

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_is_started = false;
        this.m_timer = new gsCTimer();

        this.m_script = [];
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_DOWN, 500));
        this.m_script.push(new BossScriptItem(BossState.BOSS_BEGIN_LOOP, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_ROAR, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_OPEN_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_UP, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SNORT, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SHUT_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_DOWN, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_ROAR, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_OPEN_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_UP, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SNORT, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 1));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 1));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SHUT_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_DOWN, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_ROAR, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_OPEN_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_UP, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SNORT, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 2));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 2));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SHUT_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_DOWN, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_ROAR, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_OPEN_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_UP, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SNORT, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 3));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 3));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SHUT_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_DOWN, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_END_LOOP, 0));
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
            this.m_is_started = true;
            this.m_yscroll = 0;
            //this.m_script_pointer = this.m_loop_point = this.m_script;
            this.m_active_eyes = this.BOSS_EYES_TOTAL;

            for (var i = 0; i < this.BOSS_EYES_TOTAL; i++) {
                this.m_eye = new CBossEye(this.m_playGameState);
            }

            this.m_mouth = new CBossMouth();
            this.m_state = BossState.BOSS_MOVE_DOWN;
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

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        if (this.m_state == BossState.BOSS_DEAD) {
            return true;
        }

        if (this.m_active_eyes == 0 && this.m_state != BossState.BOSS_DESTROY) {
            this.initiateDestructionSequence();
        }
        if (this.m_state == BossState.BOSS_DESTROY) {
            this.updateDestructionSequence();
        }
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
        //if (this.m_script_pointer[0].m_state == BossState.BOSS_BEGIN_LOOP) {
        if (this.m_script_pointer.m_state == BossState.BOSS_BEGIN_LOOP) {
            //this.m_loop_point = ++m_script_pointer;
            this.m_script_pointer = this.m_script[this.m_script_pointer_count++];
        }
        if (this.m_script_pointer.m_state == BossState.BOSS_END_LOOP) {
            //    this.m_script_pointer = this.m_loop_point;
            this.m_script_pointer = this.m_script[this.m_script_pointer_count++];
        }
        if (this.m_script_pointer.m_state == BossState.BOSS_TRIGGER) {
            switch (this.m_script_pointer.m_param) {
                case 0:
                    this.m_mouth.trigger(0, 16, 0.05);
                    break;
                case 1:
                    this.m_mouth.trigger(1, 16, 0.05);
                    break;
                case 2:
                    this.m_mouth.trigger(2, 16, 0.05);
                    break;
                case 3:
                    this.m_mouth.trigger(3, 16, 0.05);
                    break;
            }
            //this.m_script_pointer++;
        }

        if (this.m_script_pointer.m_state == BossState.BOSS_ROAR) {
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_ROAR);
            //    CGameState::playSample(SAMPLE_ROAR);
            //    m_script_pointer++;
            this.m_script_pointer = this.m_script[this.m_script_pointer_count++];
        }

        if (this.m_script_pointer.m_state == BossState.BOSS_SNORT) {
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_SNORT);
            //    CGameState::playSample(SAMPLE_SNORT);
            //    m_script_pointer++;
            this.m_script_pointer = this.m_script[this.m_script_pointer_count++];
        }

        if (this.m_script_pointer.m_state == BossState.BOSS_OPEN_EYES) {
            //    CBossEye::setState(BOSSEYE_OPEN);
            this.m_eye.setState(enums.BossEyeState.BOSSEYE_OPEN);
            //    m_script_pointer++;
            this.m_script_pointer = this.m_script[this.m_script_pointer_count++];
        }

        if (this.m_script_pointer.m_state == BossState.BOSS_SHUT_EYES) {
            //    CBossEye::setState(BOSSEYE_SHUT);
            //    m_script_pointer++;
            this.m_script_pointer = this.m_script[this.m_script_pointer_count++];
        }

        this.m_counter = this.m_script_pointer.m_param;
        this.m_state = this.m_script_pointer.m_state;

        //m_script_pointer++;
        this.m_script_pointer = this.m_script[this.m_script_pointer_count];
    }

    //-------------------------------------------------------------

    public isStarted(): boolean {
        return this.m_is_started;
    }

    //-------------------------------------------------------------

    public getYScroll(): number {
        return this.m_yscroll;
    }

    //-------------------------------------------------------------

    public initiateDestructionSequence(): void {
        this.m_state = BossState.BOSS_DESTROY;
        this.m_scene.findShip().setCloak(1000.0);
        this.m_yscroll = 1;
        var epicentre: gsCVector = this.m_mouth.getPosition();
        var tile_size: gsCPoint = this.m_scene.getMap().getImage().getTileSize();
        this.m_tile_pos = <gsCPoint>(epicentre).divide(tile_size);
        this.m_size = 1;
        this.m_destruction_timer.start();
    }

    //-------------------------------------------------------------

    public updateDestructionSequence(): void {
        if (this.m_destruction_timer.getTime() > 0.1) {
            this.m_destruction_timer.start();

            for (var x = 0; x < this.m_size; x++) {
                this.explodeTile(this.m_tile_pos.add(new gsCPoint(x, 0)));
                this.explodeTile(this.m_tile_pos.add(new gsCPoint(x, this.m_size - 1)));
                this.explodeTile(this.m_tile_pos.add(new gsCPoint(0, x)));
                this.explodeTile(this.m_tile_pos.add(new gsCPoint(this.m_size - 1, x)));
            }

            this.m_tile_pos = this.m_tile_pos.subtract(new gsCPoint(1, 1));
            this.m_size += 2;

            if (this.m_size > 21) {
                this.m_state = BossState.BOSS_DEAD;
            }
        }
    }

    //-------------------------------------------------------------

    public explodeTile(pos: gsCPoint): void {
        var map = this.m_scene.getMap();

        var tile: gsCMapTile = map.getMapTile(pos);

        if (tile) {
            if (!tile.isEmpty() && !tile.isHidden()) {
                tile.setHidden(true); //?
                var exp: CBigExplosion = new CBigExplosion(this.m_playGameState);
                this.m_scene.addActor(exp);
                var tile_size: gsCPoint = map.getImage().getTileSize();
                //var tile_centre: gsCPoint = tile_size / new gsCPoint(2, 2);
                var tile_centre: gsCPoint = tile_size.divide(new gsCPoint(2, 2));
                //var p: gsCPoint = pos * tile_size + tile_centre;
                var p: gsCPoint = pos.multiply(tile_size.add(tile_centre));
                exp.setPosition(new gsCVector(p.X, p.Y));
                exp.activate();
            }
        }
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BOSSCONTROL);
    }
}

export = CBossControl;


class BossScriptItem {
    public m_state: BossState;
    public m_param: number;

    constructor(state: BossState, param: number) {
        this.m_state = state;
        this.m_param = param;
    }
}