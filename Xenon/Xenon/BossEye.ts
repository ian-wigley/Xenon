enum BossEyeState {
    BOSSEYE_OPEN,
    BOSSEYE_CLOSING,
    BOSSEYE_SHUT
}

import CBoss = require("Boss")
import CExplosion = require("Explosion")
import CBigExplosion = require("BigExplosion")
import ActorInfo = require("ActorInfo")
import enums = require("Enums");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CActor = require("Actor");

class CBossEye extends CBoss {
    BOSSEYE_TOTAL: number = 6;
    m_eye_number: number;
    m_state: BossEyeState = BossEyeState.BOSSEYE_SHUT;

    constructor() {
        super();
        this.m_eye_number = 0;
        this.m_state = BossEyeState.BOSSEYE_SHUT;
    }

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BOSSEYE);
    }

    //public ActorInfo getActorInfo() 
    //{
    //    return null;// ActorInfoList[INFO_BOSSEYE]; 
    //}

    public activate(): boolean {
        if (!this.isActive()) {
            //    m_timer.start();
        }

        return super.activate();
        //return CActor::activate();
    }

    public kill(): void {
        var x: CExplosion = new CBigExplosion();
        this.m_scene.addActor(x);
        x.setPosition(this.getPosition());
        x.activate();

        this.m_active_eyes--;

        super.kill();
        //CActor::kill();
    }

    //public update(Controls controls, GameTime gameTime): boolean {
    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        if (this.m_state != BossEyeState.BOSSEYE_OPEN) {
            this.m_is_hit = false;
        }
        if (this.m_shield == 0) {
            super.explode();
            super.kill();
            return true;
        }

        this.m_sprite.setFrame(this.m_eye_number + this.m_state * this.BOSSEYE_TOTAL);

        return true;
    }

    public registerHit(energy: number, hitter: CActor): void {
        if (this.m_state == BossEyeState.BOSSEYE_OPEN) {
            super.registerHit(energy, hitter);
            //CActor::registerHit(energy,hitter);
        }
    }

    public setEyeNumber(eye_number: number): void {
        this.m_eye_number = eye_number;
    }

    public setState(state: BossEyeState): void {
        this.m_state = state;
    }
}

export = CBossEye;