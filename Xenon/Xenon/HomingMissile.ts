import CBullet = require("Bullet");
import gsCVector = require("Vector");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import enums = require("Enums");

class CHomingMissile extends CBullet {

    //-------------------------------------------------------------

    HOMING_MISSILE_TURNRATE = 10.0;
    HOMING_MISSILE_STARTUP = 0.250;
    HOMING_MISSILE_THRESHOLD = 8.0;

    //-------------------------------------------------------------
    m_angle: number;
    m_target: gsCVector;
    m_has_target: boolean;

    constructor() {
        super();
        this.m_target = new gsCVector(0.0, 0.0);
        this.m_has_target = false;
        this.m_name = "HomingMissile";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMING_MISSILE);
    }

    //-------------------------------------------------------------

    public activate(): boolean {

        if (!this.isActive()) {
            if (this.m_velocity.Y < 0.0) {
                this.m_angle = 0.0;
            }
            else {
                this.m_angle = 180.0;
            }
            this.m_timer.start();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {

        var direction: number = 0;
        this.m_position.plusEquals(this.m_velocity);

        if (this.m_has_target && this.m_timer.getTime() >= this.HOMING_MISSILE_STARTUP) {

            var relpos: gsCVector = this.m_target.minus(this.m_position);

            if (relpos.length > this.HOMING_MISSILE_THRESHOLD) {

                var a: number = relpos.direction();
                var da: number = a - this.m_angle;

                if (this.gsAbs(da) < this.HOMING_MISSILE_TURNRATE) {
                    this.m_angle = a;
                }
                else {
                    while (da < 0.0) {
                        da += 360.0;
                    }
                    while (da >= 360.0) {
                        da -= 360.0;
                    }
                    if (da < 180.0) {
                        this.m_angle += this.HOMING_MISSILE_TURNRATE;
                    }
                    else {
                        this.m_angle -= this.HOMING_MISSILE_TURNRATE;
                    }
                }

                while (this.m_angle < 0.0) {
                    this.m_angle += 360.0;
                }
                while (this.m_angle >= 360.0) {
                    this.m_angle -= 360.0;
                }

                var temp: gsCVector = new gsCVector(0, 0);
                //var temp2: gsCVector = temp.polar(this.getActorInfo().m_speed[this.m_grade], this.m_angle);
                var temp2: gsCVector = temp.polar(5, this.m_angle);
                this.setVelocity(temp2);
            }
            else
                this.m_has_target = false;
        }

        direction = ((this.m_angle + 22.5) / 45.0) & 7;

        this.m_sprite.setFrame(/*(int) m_grade + */ direction);		//TEMP

        return true;
    }

    //-------------------------------------------------------------

    public setTarget(target: gsCVector): void {
        this.m_target = target;
        this.m_has_target = true;
    }

    //-------------------------------------------------------------

    private gsAbs(v: number): number {
        return v >= 0.0 ? v : -v;
    }

    //-------------------------------------------------------------
}

export = CHomingMissile;