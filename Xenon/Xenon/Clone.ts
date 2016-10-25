import gsCControls = require("Controls");
import CUpgrade = require("Upgrade");
import gsCVector = require("Vector");
import CCloneEngine = require("CloneEngine");
import CScene = require("Scene");
import gsCTimer = require("Timer");

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

    constructor(theScene: CScene) {
        super(theScene);
        this.scene = theScene;
        this.m_min_angle = 0.0;
        this.m_max_angle = 0.0;
        this.m_current_angle = 0.0;
        this.m_required_angle = 0.0;
        this.m_engine = null;
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
            //m_timer.start();
        }

        return super.activate();
    }

    //-------------------------------------------------------------

    kill() {
        if (this.m_engine) {
            this.m_engine.kill();
            this.m_engine = null;
        }
        super.kill();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gametime: gsCTimer) {
        //this.gameTime = gametime;
        //    CShip ship = (CShip) getOwner();

        //if (ship != null) {
        //    explode();
        //    kill();
        //    return true;
        //}

        //if (getShield() == 0) {
        //    ship.detachClone(this);
        //    setOwner(null);
        //    explode();
        //    kill();
        //    return true;
        //}

        //if (controls.up) {
        //    m_required_angle = m_max_angle;
        //}
        //if (controls.down) {
        //    m_required_angle = m_min_angle;
        //}
        //    int thrust = 0;

        //if (m_current_angle != m_required_angle) {

        //        float delta = m_required_angle - m_current_angle;

        //    if (Math.Abs(delta) < CLONE_ANGLE_STEP) {
        //        m_current_angle = m_required_angle;
        //    }
        //    else {
        //        if (delta > 0) {
        //            m_current_angle += CLONE_ANGLE_STEP;
        //            if (m_min_angle > m_max_angle)
        //                thrust = 1;
        //        }
        //        else {
        //            m_current_angle -= CLONE_ANGLE_STEP;
        //            if (m_min_angle < m_max_angle)
        //                thrust = 1;
        //        }
        //    }
        //}

        //if (m_engine != null) {
        //    m_engine.applyThrust(thrust);
        //}

        ////m_offset = new Vector2::polar(CLONE_RADIUS, m_current_angle);
        //m_offset = new Vector2(CLONE_RADIUS, m_current_angle);

        //    int d = ship.getDiveLevel();

        //if (d == 0) {
        //    m_position = ship.getPosition() + m_offset;
        //    if (ship.isCloaked()) {
        //        if (!ship.isCloakFlashing()) {
        //            m_sprite.setFrame(CLONE_CLOAK_FRAME);
        //        }
        //        else {
        //            m_sprite.setFrame(0);
        //        }
        //    }
        //    else {
        //        animate(AnimationMode.ANIMATE_LOOP, 0, CLONE_FRAMES);
        //    }
        //}
        //else {
        //    m_position = ship.getPosition() + m_offset * ship.getDiveScale();
        //    m_sprite.setFrame(CLONE_DIVE_OFFSET + CLONE_DIVE_FRAMES * d / SHIP_DIVE_FRAMES);
        //}

        return true;
    }

    //-------------------------------------------------------------

    public setAngleRange(min: number, max: number) {
        this.m_min_angle = min;
        this.m_max_angle = max;

        this.setAngle(this.m_min_angle, true);
    }

    //-------------------------------------------------------------

    public setAngle(angle: number, set: boolean) {
        if (set) {
            this.m_current_angle = angle;
        }

        this.m_required_angle = angle;
    }

    //-------------------------------------------------------------
}
export = CClone;