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
    //-------------------------------------------------------------

    WALLHUGGER_WALK_START: number = 0;
    WALLHUGGER_WALK_FRAMES: number = 6;
    WALLHUGGER_SHOT_START: number = 6;
    WALLHUGGER_SHOT_FRAMES: number = 8;
    WALLHUGGER_LAUNCH_FRAME: number = 6;

    WALLHUGGER_LEFT: number = 14;
    WALLHUGGER_RIGHT: number = 0;

    WALLHUGGER_STILL_TIME: number = 1.0;
    WALLHUGGER_WALK_TIME: number = 1.0;
    WALLHUGGER_WALK_SPEED: number = 1.0;


    //CSpinnerWeapon m_weapon;

    m_grade: WallHuggerGrade;
    m_side: number;
    m_direction: number;
    m_fired: boolean;

    m_state: WallHuggerState;

    //static gsCRandom m_random;
    m_weapon: CSpinnerWeapon;

    //-------------------------------------------------------------

    public CWallHugger() {
        this.m_grade = WallHuggerGrade.WALLHUGGER_STATIC;
        this.m_weapon = null;
        this.m_fired = false;
    }

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

    validWalkPosition(): boolean {
        return false;
    }

    public getActorInfo()//:override ActorInfo 
    {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MISSILE);
    }

    //public ActorInfo getActorInfo()
    //{
    //    return null;//ActorInfoList[INFO_WALL_HUGGER]; 
    //}

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_weapon = new CSpinnerWeapon();
            this.m_scene.addActor(this.m_weapon);
            this.m_weapon.activate();
            this.m_weapon.setOwner(this);
            this.m_weapon.setOffset(new gsCVector(0.0, 0.0));
            this.m_weapon.setFiringMode(enums.WeaponFiringMode.WEAPON_MANUAL);

            this.m_state = WallHuggerState.WALLHUGGER_STILL;
            //m_timer.start();
        }

        return super.activate();
    }

    public kill(): void {
        if (this.m_weapon != null) {
            this.m_weapon.kill();
            this.m_weapon = null;
        }

        super.kill();
    }

    //public override bool update(Controls controls, GameTime gametime)
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
                    //            m_sprite.setFrame(m_side + WALLHUGGER_WALK_START);

                    //            if (m_timer.getTime() >= WALLHUGGER_STILL_TIME)
                    //            {

                    //                if (m_grade == WALLHUGGER_STATIC ||
                    //                    m_random.getInt(100) < 50)
                    //                {
                    //                    m_state = WALLHUGGER_SHOOTING;
                    //                    m_fired = false;
                    //                }
                    //                else
                    //                {
                    //                    m_state = WALLHUGGER_WALKING;
                    //                    if (m_random.getInt(100) < 50)
                    //                        setVelocity(gsCVector(0.f, -WALLHUGGER_WALK_SPEED));
                    //                    else
                    //                        setVelocity(gsCVector(0.f, WALLHUGGER_WALK_SPEED));
                    //                }

                    //                //m_timer.start();
                    //            }
                }
                break;
            case WallHuggerState.WALLHUGGER_WALKING:
                {
                    //            int frame = (int)(m_timer.getTime() * getActorInfo().m_anim_rate);
                    //            m_sprite.setFrame(m_side + WALLHUGGER_WALK_START + frame % WALLHUGGER_WALK_FRAMES);

                    //            m_position += m_velocity;

                    //            // cancel movement if off edge of wall

                    //            if (!validWalkPosition())
                    //            {
                    //                m_position -= m_velocity;

                    //                m_state = WALLHUGGER_STILL;
                    //                //m_timer.start();
                    //            }

                    //            //if (m_timer.getTime() >= WALLHUGGER_WALK_TIME)
                    //            //{
                    //            //    m_state = WALLHUGGER_STILL;
                    //            //    m_timer.start();
                    //            //}
                }
                break;
            case WallHuggerState.WALLHUGGER_SHOOTING:
                {
                    //            int frame = (int)(m_timer.getTime() * getActorInfo().m_anim_rate);
                    //            if (frame >= WALLHUGGER_SHOT_FRAMES)
                    //            {
                    //                m_sprite.setFrame(m_side + WALLHUGGER_WALK_START);
                    //                m_state = WALLHUGGER_STILL;
                    //                //m_timer.start();
                    //            }
                    //            else
                    //            {
                    //                m_sprite.setFrame(m_side + WALLHUGGER_SHOT_START + frame);
                    //                if (!m_fired && frame >= WALLHUGGER_LAUNCH_FRAME)
                    //                {
                    //                    m_weapon.fire();
                    //                    m_fired = true;
                    //                }
                    //            }
                }
                break;
        }

        return true;
    }

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

}

export = CWallHugger;