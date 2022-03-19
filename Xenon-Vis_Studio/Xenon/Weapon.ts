﻿import gsCControls = require("Controls");
import gsCVector = require("Vector");
import gsCTimer = require("Timer");
import CActor = require("Actor");
import CScene = require("Scene");
import enums = require("Enums");
import CPlayGameState = require("PlayGameState");

class CWeapon extends CActor {
    m_grade: enums.WeaponGrade;
    m_offset: gsCVector;
    m_actor: CActor;
    m_fire_timer: gsCTimer;
    m_delay_fire: boolean;
    m_autofire_timer: gsCTimer;
    m_autofire: boolean;
    m_mode: enums.WeaponFiringMode;
    m_direction: enums.WeaponDirection;
    WEAPON_ONSCREEN_RADIUS: number;

    protected m_playGameState: CPlayGameState;
    protected do_fire: boolean = false;

    constructor(scene?: CScene) {
        super(scene);
        this.m_grade = enums.WeaponGrade.WEAPON_STANDARD;
        this.m_offset = new gsCVector(0, 0);
        this.m_mode = enums.WeaponFiringMode.WEAPON_AUTOMATIC;
        this.m_direction = enums.WeaponDirection.WEAPON_FORWARD;
        this.m_position = new gsCVector(0, 0);
        this.WEAPON_ONSCREEN_RADIUS = 8;
        this.m_fire_timer = new gsCTimer();
        this.m_autofire_timer = new gsCTimer();
        this.m_name = "Weapon";
    }

    //-------------------------------------------------------------

    public activate() {
        if (!this.isActive()) {
            this.m_delay_fire = false;
            this.m_autofire = false;
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer) {
        //if (controls || !getOwner())
        //    return false;


        //if (this.m_name == "HomingMissileWeapon") {
        //    controls.fire = true;
        //}

        //this.m_position = this.getOwner().getPosition() + this.m_offset;
        this.m_position.x = this.getOwner().getPosition().x + this.m_offset.x;
        this.m_position.y = this.getOwner().getPosition().y + this.m_offset.y;

        if (this.m_mode == enums.WeaponFiringMode.WEAPON_MANUAL) {
            return true;
        }

        switch (this.getOwner().getActorInfo().m_type) {
            case enums.ActorType.ACTOR_TYPE_SHIP:
            case enums.ActorType.ACTOR_TYPE_UPGRADE:

                //var do_fire: boolean = false;
                this.do_fire = false;

                if (this.m_autofire) {
                    if (controls.fire) {
                        if (this.m_autofire_timer.getTime() >= this.getActorInfo().m_autofire_delay) {
                            this.do_fire = true;
                            this.m_autofire_timer.start();
                        }
                    }
                    else {
                        this.m_autofire = false;
                        this.m_delay_fire = false;
                    }
                }

                if (controls.firePressed || (controls.fire && !this.m_autofire)) {
                    if (this.m_delay_fire) {
                        if (this.m_fire_timer.getTime() >= this.getActorInfo().m_fire_delay) {
                            this.m_delay_fire = false;
                        }
                    }
                    if (!this.m_delay_fire) {
                        this.do_fire = true;
                        this.m_delay_fire = true;
                        this.m_fire_timer.start();
                        if (this.getActorInfo().m_autofire_delay == 0.0) {
                            this.m_autofire = false;
                        }
                        else {
                            this.m_autofire = true;
                            this.m_autofire_timer.start();
                        }
                    }
                }

                //if (do_fire) {
                //    //var obj = this.getOwner();
                //    //this.getOwner();
                //    this.fire();                      
                //    controls.fire = false;
                //}
                break;

            case enums.ActorType.ACTOR_TYPE_ALIEN:
                if (!this.m_delay_fire || this.m_fire_timer.getTime() >= this.getActorInfo().m_fire_delay) {
                    this.m_delay_fire = true;
                    this.m_fire_timer.start();
                    // This needs investigating !!! Cause of all the new objects being created !!!
                    //this.fire();
                    this.do_fire = true;
                }

                else {
                    this.do_fire = false;  /// 13/06/17
                }

                break;
        }

        return true;
    }

    //-------------------------------------------------------------

    public setGrade(grade: enums.WeaponGrade) {
        this.m_grade = grade;
    }

    //-------------------------------------------------------------

    public upgrade() {
        switch (this.m_grade) {
            case enums.WeaponGrade.WEAPON_STANDARD:
                this.setGrade(enums.WeaponGrade.WEAPON_MEDIUM);
                return true;
            case enums.WeaponGrade.WEAPON_MEDIUM:
                this.setGrade(enums.WeaponGrade.WEAPON_BEST);
                return true;
        }
        return false;
    }

    //-------------------------------------------------------------

    public setOffset(offset: gsCVector) {
        this.m_offset = offset;
    }

    //-------------------------------------------------------------

    public setFiringMode(mode: enums.WeaponFiringMode) {
        this.m_mode = mode;
    }

    //-------------------------------------------------------------

    public isValidFiringPosition() {
        //gsCScreen *screen = gsCApplication::getScreen();

        //if (!screen)
        //    return false;

        return true;

        // NYI
        /*
            gsCPoint pos = getOwner()->getPosition() + m_offset + m_map->getPosition();

            gsCRect rect(pos - gsCPoint(WEAPON_ONSCREEN_RADIUS,WEAPON_ONSCREEN_RADIUS),
                         pos + gsCPoint(WEAPON_ONSCREEN_RADIUS,WEAPON_ONSCREEN_RADIUS));

            return screen->getRect().contains(rect);
        */
    }

    //-------------------------------------------------------------

    public setDirection(direction: enums.WeaponDirection) {
        this.m_direction = direction;
    }

    //-------------------------------------------------------------

    public getDirection() {
        return this.m_direction;
    }

    //-------------------------------------------------------------

    public fire() {
        return false;
    }

    //-------------------------------------------------------------

}
export = CWeapon;