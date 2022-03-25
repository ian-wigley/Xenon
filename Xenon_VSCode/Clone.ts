import gsCControls = require("Controls");
import CUpgrade = require("Upgrade");
import gsCVector = require("Vector");
import CCloneEngine = require("CloneEngine");
import CScene = require("Scene");
import gsCTimer = require("Timer");
import CShip = require("Ship");
import enums = require("Enums");
import CPlayGameState = require("PlayGameState");
import CExplode = require("Exploder");

class CClone extends CUpgrade {

    CLONE_FRAMES: number = 16;
    CLONE_DIVE_OFFSET: number = 16;
    CLONE_DIVE_FRAMES: number = 3;
    CLONE_CLOAK_FRAME: number = 19;
    CLONE_RADIUS: number = 80.0;
    CLONE_ANGLE_STEP: number = 0.6;		// degrees
    SHIP_DIVE_FRAMES: number = 6;
    m_min_angle: number;
    m_max_angle: number;
    m_current_angle: number;
    m_required_angle: number;
    m_engine: CCloneEngine;
    scene: CScene
    m_name = "clone";

    constructor(theScene: CScene, playGameState: CPlayGameState) {
        super(theScene);
        this.scene = theScene;
        this.m_min_angle = 0.0;
        this.m_max_angle = 0.0;
        this.m_current_angle = 0.0;
        this.m_required_angle = 0.0;
        this.m_engine = null;
        this.m_playGameState = playGameState;
        this.m_name = "clone";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_CLONE);
    }

    //-------------------------------------------------------------

    public activate() {
        if (!this.isActive()) {
            this.m_engine = new CCloneEngine(this.scene);
            this.m_scene.addActor(this.m_engine);
            this.m_engine.activate();
            this.m_engine.setOffset(new gsCVector(0.0, 10.0));
            this.m_engine.setOwner(this);
            this.m_engine.setParams(new gsCVector(0.0, -16.0), new gsCVector(0.0, 0.0), 0.05);
            this.m_timer.start();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public kill() {
        if (this.m_engine) {
            this.m_engine.kill();
            this.m_engine = null;
        }
        super.kill();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gametime: gsCTimer) {

        var ship: CShip = <CShip>this.getOwner();

        if (!ship){
            var explode = new CExplode(this);
            this.kill();
            return true;
        }

        if (this.getShield() == 0) {
            ship.detachClone(this);
            this.setOwner(null);
            var explode = new CExplode(this);
            this.kill();
            return true;
        }

        if (controls.up) {
            this.m_required_angle = this.m_max_angle;
        }
        if (controls.down) {
            this.m_required_angle = this.m_min_angle;
        }
        var thrust: number = 0;

        if (this.m_current_angle != this.m_required_angle) {

            var delta = this.m_required_angle - this.m_current_angle;

            if (this.gsAbs(delta) < this.CLONE_ANGLE_STEP) {
                this.m_current_angle = this.m_required_angle;
            }
            else {
                if(delta > 0) {
                    this.m_current_angle += this.CLONE_ANGLE_STEP;
                    if (this.m_min_angle > this.m_max_angle)
                        thrust = 1;
                }
                else {
                    this.m_current_angle -= this.CLONE_ANGLE_STEP;
                    if (this.m_min_angle < this. m_max_angle)
                        thrust = 1;
                }
            }
        }

        if (this.m_engine != null) {
            this.m_engine.applyThrust(thrust);
        }

        var temp: gsCVector = new gsCVector(0, 0);
        this.m_offset = temp.polar(this.CLONE_RADIUS, this.m_current_angle);

        var d:number = ship.getDiveLevel();

        if (d == 0) {
            this.m_position.x = ship.getPosition().x + this.m_offset.x;
            this.m_position.y = ship.getPosition().y + this.m_offset.y;

            if (ship.isCloaked()) {
                if (!ship.isCloakFlashing()) {
                    this.m_sprite.setFrame(this.CLONE_CLOAK_FRAME);
                }
                else {
                    this.m_sprite.setFrame(0);
                }
            }
            else {
                this.animations(enums.AnimationMode.ANIMATE_LOOP, 0, this.CLONE_FRAMES);
            }
        }
        else {
            this.m_position = ship.getPosition().plus1(this.m_offset).times1(ship.getDiveScale());
            this.m_sprite.setFrame(this.CLONE_DIVE_OFFSET + this.CLONE_DIVE_FRAMES * d / this.SHIP_DIVE_FRAMES);
        }

        return true;
    }

    //-------------------------------------------------------------

    public setAngleRange(min: number, max: number):void {
        this.m_min_angle = min;
        this.m_max_angle = max;
        this.setAngle(this.m_min_angle, true);
    }

    //-------------------------------------------------------------

    public setAngle(angle: number, set: boolean):void {
        if (set) {
            this.m_current_angle = angle;
        }
        this.m_required_angle = angle;
    }

    //-------------------------------------------------------------

    private gsAbs(v:number) :number{
        return v >= 0.0 ? v : -v;
    }

    //-------------------------------------------------------------

}
export = CClone;