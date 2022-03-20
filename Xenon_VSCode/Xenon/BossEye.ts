﻿import CBoss = require("Boss")
import CExplosion = require("Explosion")
import CBigExplosion = require("BigExplosion")
import ActorInfo = require("ActorInfo")
import enums = require("Enums");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CActor = require("Actor");
import CPlayGameState = require("PlayGameState");
import CExplode = require("Exploder");

class CBossEye extends CBoss {

    BOSSEYE_TOTAL: number = 6;
    m_eye_number: number;
    m_state: enums.BossEyeState = enums.BossEyeState.BOSSEYE_SHUT;

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_eye_number = 0;
        this.m_state = enums.BossEyeState.BOSSEYE_SHUT;
        this.m_name = "Boss Eye";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BOSSEYE);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public kill(): void {
        var x: CExplosion = new CBigExplosion(this.m_playGameState);
        this.m_scene.addActor(x);
        x.setPosition(this.getPosition());
        x.activate();

        this.m_active_eyes--;
        super.kill();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        if (this.m_state != enums.BossEyeState.BOSSEYE_OPEN) {
            this.m_is_hit = false;
        }
        if (this.m_shield == 0) {
            var explode = new CExplode(this);
            super.kill();
            return true;
        }

        this.m_sprite.setFrame(this.m_eye_number + this.m_state * this.BOSSEYE_TOTAL);
        return true;
    }

    //-------------------------------------------------------------

    public registerHit(energy: number, hitter: CActor): void {
        if (this.m_state == enums.BossEyeState.BOSSEYE_OPEN) {
            super.registerHit(energy, hitter);
        }
    }

    //-------------------------------------------------------------

    public setEyeNumber(eye_number: number): void {
        this.m_eye_number = eye_number;
    }

    //-------------------------------------------------------------

    public setState(state: enums.BossEyeState): void {
        this.m_state = state;
    }
}

export = CBossEye;