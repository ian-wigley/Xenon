enum WallHuggerGrade {
    WALLHUGGER_STATIC,
    WALLHUGGER_MOVING,
};

//-------------------------------------------------------------

enum WallHuggerState {
    WALLHUGGER_STILL,
    WALLHUGGER_WALKING,
    WALLHUGGER_SHOOTING,
};

import CAlien = require("Alien");
import enums = require("Enums");
import gsCVector = require("Vector");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CSpinnerWeapon = require("SpinnerWeapon");

class CWallHugger extends CAlien {

    private WALLHUGGER_WALK_START: number = 0;
    private WALLHUGGER_WALK_FRAMES: number = 6;
    private WALLHUGGER_SHOT_START: number = 6;
    private WALLHUGGER_SHOT_FRAMES: number = 8;
    private WALLHUGGER_LAUNCH_FRAME: number = 6;
    private WALLHUGGER_LEFT: number = 14;
    private WALLHUGGER_RIGHT: number = 0;
    private WALLHUGGER_STILL_TIME: number = 1.0;
    private WALLHUGGER_WALK_TIME: number = 1.0;
    private WALLHUGGER_WALK_SPEED: number = 1.0;

    //private m_weapon: CSpinnerWeapon;
    private m_grade: WallHuggerGrade;
    private m_side: number;
    private m_direction: number;
    private m_fired: boolean;
    private m_state: WallHuggerState;
    //private m_random: gsCRandom;
    private m_weapon: CSpinnerWeapon;

    //-------------------------------------------------------------

    constructor() {
        super();
        this.m_grade = WallHuggerGrade.WALLHUGGER_STATIC;
        this.m_weapon = null;
        this.m_fired = false;
    }

    //-------------------------------------------------------------

    public findWall(): void {
        //TEMP
        if (this.m_position.X < 320.0) {
            this.m_side = this.WALLHUGGER_LEFT;
            this.m_weapon.setDirectionS(new gsCVector(1.0, 0.0));
        }
        else {
            this.m_side = this.WALLHUGGER_RIGHT;
            this.m_weapon.setDirectionS(new gsCVector(-1.0, 0.0));
        }
    }

    //-------------------------------------------------------------

    public validWalkPosition(): boolean {
        return false;
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MISSILE);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_weapon = new CSpinnerWeapon();
            this.m_scene.addActor(this.m_weapon);
            this.m_weapon.activate();
            this.m_weapon.setOwner(this);
            this.m_weapon.setOffset(new gsCVector(0.0, 0.0));
            this.m_weapon.setFiringMode(enums.WeaponFiringMode.WEAPON_MANUAL);
            this.m_state = WallHuggerState.WALLHUGGER_STILL;
           // this.m_timer.start();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public kill(): void {
        if (this.m_weapon != null) {
            this.m_weapon.kill();
            this.m_weapon = null;
        }

        super.kill();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {

        this.gameTime = gameTime;
        if (this.m_shield == 0) {
            super.explode();
            super.kill();
            return true;
        }

        this.findWall();

        switch (this.m_state) {
            case WallHuggerState.WALLHUGGER_STILL:
                {
                    this.m_sprite.setFrame(this.m_side + this.WALLHUGGER_WALK_START);

                   /* if (this.m_timer.getTime() >= this.WALLHUGGER_STILL_TIME)*/ {

                        if (this.m_grade == WallHuggerGrade.WALLHUGGER_STATIC /*|| m_random.getInt(100) < 50*/) {
                            this.m_state = WallHuggerState.WALLHUGGER_SHOOTING;
                            this.m_fired = false;
                        }
                        else {
                            this.m_state = WallHuggerState.WALLHUGGER_WALKING;
                            //if (m_random.getInt(100) < 50) {
                            this.setVelocity(new gsCVector(0.0, -this.WALLHUGGER_WALK_SPEED));
                            //} else {
                            this.setVelocity(new gsCVector(0.0, this.WALLHUGGER_WALK_SPEED));
                            //}
                        }

                        //this.m_timer.start();
                    }
                }
                break;
            case WallHuggerState.WALLHUGGER_WALKING:
                {
                    var frame: number = this.m_timer.getTime() * this.getActorInfo().m_anim_rate;
                    this.m_sprite.setFrame(this.m_side + this.WALLHUGGER_WALK_START + frame % this.WALLHUGGER_WALK_FRAMES);

                    this.m_position.plusEquals(this.m_velocity);

                    // cancel movement if off edge of wall
                    if (!this.validWalkPosition()) {
                        this.m_position.minusEquals(this.m_velocity);

                        this.m_state = WallHuggerState.WALLHUGGER_STILL;
                        this.m_timer.start();
                    }

                    if (this.m_timer.getTime() >= this.WALLHUGGER_WALK_TIME)
                    {
                        this.m_state = WallHuggerState.WALLHUGGER_STILL;
                       // this.m_timer.start();
                    }
                }
                break;
            case WallHuggerState.WALLHUGGER_SHOOTING:
                {
                    var frame: number = this.m_timer.getTime() * this.getActorInfo().m_anim_rate;
                    if (frame >= this.WALLHUGGER_SHOT_FRAMES) {
                        this.m_sprite.setFrame(this.m_side + this.WALLHUGGER_WALK_START);
                        this.m_state = WallHuggerState.WALLHUGGER_STILL;
                        //this.m_timer.start();
                    }
                    else {
                        this.m_sprite.setFrame(this.m_side + this.WALLHUGGER_SHOT_START + frame);
                        if (!this.m_fired && frame >= this.WALLHUGGER_LAUNCH_FRAME) {
                            this.m_weapon.fire();
                            this.m_fired = true;
                        }
                    }
                }
                break;
        }
        return true;
    }

    //-------------------------------------------------------------

    public setGrade(grade: WallHuggerGrade): void {
        this.m_grade = grade;

        switch (this.m_grade) {
            case WallHuggerGrade.WALLHUGGER_STATIC:
                this.m_weapon.setGrade(enums.WeaponGrade.WEAPON_STANDARD);
                break;
            case WallHuggerGrade.WALLHUGGER_MOVING:
                this.m_weapon.setGrade(enums.WeaponGrade.WEAPON_MEDIUM);
                break;
        }
    }

    //-------------------------------------------------------------

}

export = CWallHugger;