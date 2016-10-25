import gsCControls = require("Controls");
import gsCVector = require("Vector");
import gsCTimer = require("Timer");
import CActor = require("Actor");
import CScene = require("Scene");
import enums = require("Enums");

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

    constructor(scene: CScene) {
        super(scene);
        this.m_grade = enums.WeaponGrade.WEAPON_STANDARD;
        this.m_offset = new gsCVector(0, 0);
        this.m_mode = enums.WeaponFiringMode.WEAPON_AUTOMATIC;
        this.m_direction = enums.WeaponDirection.WEAPON_FORWARD;
        this.m_position = new gsCVector(0, 0);
        this.WEAPON_ONSCREEN_RADIUS = 8;
    }

    //-------------------------------------------------------------

    activate() {
        if (!this.isActive()) {
            this.m_delay_fire = false;
            this.m_autofire = false;
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    update(controls: gsCControls, gameTime: gsCTimer) {
        //if (controls || !getOwner())
        //    return false;

        //this.m_position = this.getOwner().getPosition() + this.m_offset;
        this.m_position.x = this.getOwner().getPosition().x + this.m_offset.x;
        this.m_position.y = this.getOwner().getPosition().y + this.m_offset.y;

        if (this.m_mode == enums.WeaponFiringMode.WEAPON_MANUAL)
            return true;

        switch (this.getOwner().getActorInfo().m_type) {
            case enums.ActorType.ACTOR_TYPE_SHIP:
            case enums.ActorType.ACTOR_TYPE_UPGRADE:
                {
                    var do_fire: boolean = false;

                    if (this.m_autofire) {
                        if (controls.fire) {
                            //if (m_autofire_timer.getTime() >= getActorInfo().m_autofire_delay)
                            {
                                do_fire = true;
                                //m_autofire_timer.start();
                            }
                        }
                        else {
                            this.m_autofire = false;
                            this.m_delay_fire = false;
                        }
                    }

                    if (controls.firePressed || (controls.fire && !this.m_autofire)) {
                        if (this.m_delay_fire) {
                            //if (m_fire_timer.getTime() >= getActorInfo().m_fire_delay)
                            {
                                this.m_delay_fire = false;
                            }
                        }
                        if (!this.m_delay_fire) {
                            do_fire = true;
                            this.m_delay_fire = true;
                            //m_fire_timer.start();
                            if (this.getActorInfo().m_autofire_delay == 0.0) {
                                this.m_autofire = false;
                            }
                            else {
                                this.m_autofire = true;
                                //m_autofire_timer.start();
                            }
                        }
                    }

                    if (do_fire) {
                        this.fire();
                        controls.fire = false;
                    }
                }
                break;

            case enums.ActorType.ACTOR_TYPE_ALIEN:
                {
                    //if (!m_delay_fire || m_fire_timer.getTime() >= getActorInfo().m_fire_delay)
                    {
                        this.m_delay_fire = true;
                        //    m_fire_timer.start();
                        this.fire();
                    }
                }
                break;
        }

        return true;
    }

    //-------------------------------------------------------------

    setGrade(grade: enums.WeaponGrade) {
        this.m_grade = grade;
    }

    //-------------------------------------------------------------

    upgrade() {
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

    setOffset(offset: gsCVector) {
        this.m_offset = offset;
    }

    //-------------------------------------------------------------

    setFiringMode(mode: enums.WeaponFiringMode) {
        this.m_mode = mode;
    }

    //-------------------------------------------------------------

    isValidFiringPosition() {
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

    setDirection(direction: enums.WeaponDirection) {
        this.m_direction = direction;
    }

    //-------------------------------------------------------------

    getDirection() {
        return this.m_direction;
    }

    //-------------------------------------------------------------

    fire() {
        return false;
    }
}
export = CWeapon;