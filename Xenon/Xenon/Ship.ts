import gsCControls = require("Controls");
import gsCRectangle = require("Rectangle");
import gsCTiledImage = require("TiledImage");
import gsCVector = require("Vector");
import gsCMap = require("Map");
import gsCScreen = require("Screen");
import gsCSprite = require("Sprite");
import gsCTimer = require("Timer");
import CActor = require("Actor");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import CWeapon = require("Weapon");
import CClone = require("Clone");
import CWingtip = require("Wingtip");
import CShipEngine = require("ShipEngine");
import CRetroEngine = require("RetroEngine");
import CMissileWeapon = require("MissileWeapon");
import enums = require("Enums");

class CShip extends CActor {

    //-------------------------------------------------------------

    SHIP_CENTRE_FRAME: number = 3;		// ship centred frame
    SHIP_ROLL_FRAMES: number = 3;		// frame range for roll i.e. -3..+3 from centre
    SHIP_CLOAK_OFFSET: number = 7;		// offset to invulnerability frames
    SHIP_DIVE_FRAMES: number = 6;		// number of dive frames
    SHIP_DIVE_OFFSET: number = 14;		// offset to dive frames
    SHIP_DIVE_SCALE: number = 52 / 64;	// scale of dived ship
    SHIP_ROLL_RATE: number = 10.0;		// frames per seconds
    SHIP_MAP_HIT: number = 10;			// energy lost if ship hits map

    //-------------------------------------------------------------

    CLOAK_FLASH_TIME: number = 1.0;	    // time for flashing to signify end of cloaking
    CLOAK_FLASH_RATE: number = 0.15;	// flash rate

    //-------------------------------------------------------------

    private m_weapon_type: enums.WeaponType;
    private m_weapon: CWeapon;

    m_left_clone: CClone;
    m_right_clone: CClone;

    m_left_wingtip: CWingtip;
    m_right_wingtip: CWingtip;

    m_left_engine: CShipEngine;
    m_right_engine: CShipEngine;
    m_retro_nw: CRetroEngine;
    m_retro_ne: CRetroEngine;
    m_retro_sw: CRetroEngine;
    m_retro_se: CRetroEngine;

    private m_max_speed: number;
    private m_acceleration: number;
    private m_damping: number;
    private m_handling: enums.ShipHandling;
    private m_roll: number = 0;
    //private m_timer: number = 0;
    private m_delta: number = 0;
    private m_timerStarted: boolean = false;
    private m_cloak_time_limit: number;
    private m_dive_mode: enums.DiveMode;
    private m_dive_level: number;
    private m_dive_time_limit: number;
    private m_screenWidth: number;
    private m_screenHeight: number;

    //public Controls m_direction;

    constructor(scene: CScene, timer: gsCTimer) {

        super(scene);
        //m_scene = scene;

        this.m_weapon = null;
        this.m_weapon_type = enums.WeaponType.NO_WEAPON;

        this.m_left_clone = null;
        this.m_right_clone = null;
        this.m_left_wingtip = null;
        this.m_right_wingtip = null;
        this.m_left_engine = null;
        this.m_right_engine = null;
        this.m_retro_nw = null;
        this.m_retro_ne = null;
        this.m_retro_sw = null;
        this.m_retro_se = null;

        this.m_cloak_time_limit = 0.0;

        this.m_dive_mode = enums.DiveMode.DIVE_OFF;
        this.m_dive_level = 0;
        //this.m_direction.left = false;
        this.m_screenWidth = 640;
        this.m_screenHeight = 480;

        this.m_timer = timer;

        //    /* Test.. */
        //    //           m_max_speed = 200.0f;
        //    //           m_acceleration = 1000.0f;
        //    //           m_damping = 1500.0f;
    }

    public activateShip() {

        if (!this.isActive()) {
            this.setHandling(enums.ShipHandling.HANDLING_NORMAL);

            this.m_roll = 0;
            this.setWeapon(enums.WeaponType.NO_WEAPON, enums.WeaponGrade.WEAPON_STANDARD);//;NO_WEAPON);
            this.setVelocity(new gsCVector(0, 0));

            this.m_left_engine = new CShipEngine(this.m_scene);
            this.m_scene.addActor(this.m_left_engine);
            this.m_left_engine.activateEngine();
            this.m_left_engine.setOwner(this);
            this.m_left_engine.setOffset(new gsCVector(-7.0, 29.0));
            this.m_left_engine.setParams(new gsCVector(0.0, -16.0), new gsCVector(0.0, 0.0), 0.05);

            this.m_right_engine = new CShipEngine(this.m_scene);
            this.m_scene.addActor(this.m_right_engine);
            this.m_right_engine.activateEngine();
            this.m_right_engine.setOwner(this);
            this.m_right_engine.setOffset(new gsCVector(7.0, 29.0));
            this.m_right_engine.setParams(new gsCVector(0.0, -16.0), new gsCVector(0.0, 0.0), 0.05);

            this.m_retro_nw = new CRetroEngine(this.m_scene);
            this.m_scene.addActor(this.m_retro_nw);
            this.m_retro_nw.activateEngine();
            this.m_retro_nw.setOwner(this);
            this.m_retro_nw.setOffset(new gsCVector(-30.0, -20.0));
            this.m_retro_nw.setDirection(enums.RetroDirection.RETRO_NW);
            this.m_retro_nw.setParams(new gsCVector(12.0, 12.0), new gsCVector(0.0, 0.0), 0.05);

            this.m_retro_ne = new CRetroEngine(this.m_scene);
            this.m_scene.addActor(this.m_retro_ne);
            this.m_retro_ne.activateEngine();
            this.m_retro_ne.setOwner(this);
            this.m_retro_ne.setOffset(new gsCVector(30.0, -20.0));
            this.m_retro_ne.setDirection(enums.RetroDirection.RETRO_NE);
            this.m_retro_ne.setParams(new gsCVector(-12.0, 12.0), new gsCVector(0.0, 0.0), 0.05);

            this.m_retro_sw = new CRetroEngine(this.m_scene);
            this.m_scene.addActor(this.m_retro_sw);
            this.m_retro_sw.activateEngine();
            this.m_retro_sw.setOwner(this);
            this.m_retro_sw.setOffset(new gsCVector(-30.0, 30.0));
            this.m_retro_sw.setDirection(enums.RetroDirection.RETRO_SW);
            this.m_retro_sw.setParams(new gsCVector(12.0, -12.0), new gsCVector(0.0, 0.0), 0.05);

            this.m_retro_se = new CRetroEngine(this.m_scene);
            this.m_scene.addActor(this.m_retro_se);
            this.m_retro_se.activateEngine();
            this.m_retro_se.setOwner(this);
            this.m_retro_se.setOffset(new gsCVector(30.0, 30.0));
            this.m_retro_se.setDirection(enums.RetroDirection.RETRO_SE);
            this.m_retro_se.setParams(new gsCVector(-12.0, -12.0), new gsCVector(0.0, 0.0), 0.05);

            this.m_timer.reset();

            this.setCloak(2.0);

            this.m_dive_mode = enums.DiveMode.DIVE_OFF;
            this.m_dive_level = 0;
        }
        return this.activate();
    }

    //-------------------------------------------------------------

    public explode() {
        if (this.m_left_clone != null) {
            this.m_left_clone.explode();
        }
        if (this.m_right_clone != null) {
            this.m_right_clone.explode();
        }
        if (this.m_left_wingtip != null) {
            this.m_left_wingtip.explode();
        }
        if (this.m_right_wingtip != null) {
            this.m_right_wingtip.explode();
        }
        super.explode();
    }

    //-------------------------------------------------------------

    public kill() {
        this.removeUpgrades();

        if (this.m_left_engine != null) {
            this.m_left_engine.kill();
        }
        if (this.m_right_engine != null) {
            this.m_right_engine = null;
        }
        if (this.m_retro_nw != null) {
            this.m_retro_nw = null;
        }
        if (this.m_retro_ne != null) {
            this.m_retro_ne = null;
        }
        if (this.m_retro_sw != null) {
            this.m_retro_sw = null;
        }
        if (this.m_retro_se != null) {
            this.m_retro_se = null;
        }
        if (this.m_weapon != null) {
            this.m_weapon = null;
        }
        super.kill();
    }

    //-------------------------------------------------------------

    update(controls: gsCControls, gameTime: gsCTimer) {

        this.m_timer = gameTime;

        if (this.m_shield == 0) {
            return true;
        }

        if (this.m_cloak_time_limit > 0.0) {
            //if (m_cloak_timer.getTime() >= m_cloak_time_limit) 
            //{
            //    m_cloak_timer.reset();
            //    m_cloak_time_limit = 0.0f;
            //}
        }

        var thrust: gsCVector = new gsCVector(0.0, 0.0);
        var required_roll: number = 0;

        var t: number = this.m_timer.getDeltaTime();//.getCurrentTime();

        if (controls) {
            if (controls.left) {
                thrust.x = -this.m_acceleration;
                required_roll = -this.SHIP_ROLL_FRAMES;
            }
            if (controls.right) {
                thrust.x = this.m_acceleration;
                required_roll = this.SHIP_ROLL_FRAMES;
            }
            if (controls.up) {
                thrust.y = -this.m_acceleration;
            }
            if (controls.down) {
                thrust.y = this.m_acceleration;
            }

            var x: number = this.m_velocity.x;//.getX();

            if (thrust.x != 0.0)//  getX() != 0.0f)
            {
                x += thrust.x * t; //getX() * t;
                if (x < -this.m_max_speed)
                    x = -this.m_max_speed;
                if (x > this.m_max_speed)
                    x = this.m_max_speed;
            }
            else {
                if (x > 0.0) {
                    x -= this.m_damping * t;
                    if (x < 0.0)
                        x = 0.0;
                }
                else {
                    x += this.m_damping * t;
                    if (x > 0.0) {
                        x = 0.0;
                    }
                }
            }

            var y: number = this.m_velocity.y;

            if (thrust.y != 0.0) {
                y += thrust.y * t;
                if (y < -this.m_max_speed) {
                    y = -this.m_max_speed;
                }
                if (y > this.m_max_speed) {
                    y = this.m_max_speed;
                }
            }
            else {
                if (y > 0.0) {
                    y -= this.m_damping * t;
                    if (y < 0.0) {
                        y = 0.0;
                    }
                }
                else {
                    y += this.m_damping * t;
                    if (y > 0.0) {
                        y = 0.0;
                    }
                }
            }

            this.m_velocity = new gsCVector(x, y);
        }

        var tempVec: gsCVector = new gsCVector(t, t);

        this.m_position.x = this.m_position.x + (this.m_velocity.x * tempVec.x);
        this.m_position.y = this.m_position.y + (this.m_velocity.y * tempVec.y);

        var map_y = this.m_scene.getMapFrontLayer().getPosition().Y;//.getY();
        //gsCScreen *screen = gsCApplication::getScreen();

        var minx: number = 64.0;
        var maxx: number = this.m_screenWidth - 64;
        var miny: number = -map_y;//64.0; //
        var maxy = miny + this.m_screenHeight - 128;

        if (this.m_position.x < minx) {
            this.m_position.x = minx;
        }
        if (this.m_position.x > maxx) {
            this.m_position.x = maxx;
        }
        if (this.m_position.y < miny) {
            this.m_position.y = miny;
        }
        if (this.m_position.y > maxy) {
            this.m_position.y = maxy;
        }

        if (this.m_roll == required_roll) {
            this.m_timer.reset();
        }
        else {
            if (this.m_timer.getState() == enums.gsTimerState.gsTIMER_RESET) {
                this.m_timer.start();
            }
            else {

                if (this.m_timer.getTime() * 1000 >= 1.0 / this.SHIP_ROLL_RATE) {
                    if (required_roll < this.m_roll) {
                        this.m_roll--;
                    }
                    else {
                        this.m_roll++;
                    }
                    if (this.m_roll != required_roll) {
                        this.m_timer.start();
                    }
                }
            }
        }

        this.m_sprite.setFrame(this.SHIP_CENTRE_FRAME + this.m_roll);


        switch (this.m_dive_mode) {
            case enums.DiveMode.DIVE_OFF:
                if (this.isCloaked()) {
                    if (!this.isCloakFlashing()) {
                        this.m_sprite.setFrame(this.SHIP_CLOAK_OFFSET + this.SHIP_CENTRE_FRAME + this.m_roll);
                    }
                    else {
                        this.m_sprite.setFrame(this.SHIP_CENTRE_FRAME + this.m_roll);
                    }
                }
                else {
                    this.m_sprite.setFrame(this.SHIP_CENTRE_FRAME + this.m_roll);
                }
                this.m_dive_level = 0;
                break;

            case enums.DiveMode.DIVING_DOWN:
                this.m_sprite.setFrame(this.SHIP_DIVE_OFFSET + this.m_dive_level);
                //if (this.m_dive_timer.getTime() >= 0.1)
                {
                    this.m_dive_level++;
                    if (this.m_dive_level < this.SHIP_DIVE_FRAMES - 1) {
                        // this.m_dive_timer.start();
                    }
                    else {
                        // this.m_dive_timer.start();
                        this.m_dive_mode = enums.DiveMode.DIVE_ACTIVE;
                    }
                }
                break;

            case enums.DiveMode.DIVE_ACTIVE:
                this.m_sprite.setFrame(this.SHIP_DIVE_OFFSET + this.m_dive_level);
                //if (this.m_dive_timer.getTime() >= this.m_dive_time_limit) 
                {
                    //this.m_dive_timer.start();
                    this.m_dive_mode = enums.DiveMode.DIVING_UP;
                    //CGameState::playSample(SAMPLE_DIVE_UP,getPosition().getX());
                }
                break;

            case enums.DiveMode.DIVING_UP:
                this.m_sprite.setFrame(this.SHIP_DIVE_OFFSET + this.m_dive_level);
                //if (this.m_dive_timer.getTime() >= 0.1) 
                {
                    this.m_dive_level--;
                    if (this.m_dive_level >= 0) {
                        //this.m_dive_timer.start();
                    }
                    else {
                        this.m_dive_mode = enums.DiveMode.DIVE_OFF;
                    }
                }
                break;
        }

        // Engine thruster animation
        ////if (CPlayGameState::getYScroll() == 1) 
        ////{
        ////    if (m_left_engine)
        ////    {
        ////        m_left_engine->applyThrust(thrust.getY() <= 0.0f);
        ////    }
        ////    if (m_right_engine)
        ////    {
        ////        m_right_engine->applyThrust(thrust.getY() <= 0.0f);
        ////    }
        ////}
        ////else 
        {
            if (this.m_left_engine != null) {
                this.m_left_engine.applyThrust(thrust.y < 0.0 ? 1 : 0);
            }
            if (this.m_right_engine != null) {
                this.m_right_engine.applyThrust(thrust.y < 0.0 ? 1 : 0);
            }
        }

        // Move the 4 Retro engines
        if (this.m_retro_nw != null) {
            this.m_retro_nw.applyThrust(thrust.y > 0.0 && thrust.x >= 0 ? 1 : 0);
        }
        if (this.m_retro_ne != null) {
            this.m_retro_ne.applyThrust(thrust.y > 0.0 && thrust.x <= 0 ? 1 : 0);
        }
        if (this.m_retro_sw != null) {
            this.m_retro_sw.applyThrust((thrust.x > 0.0 && thrust.y <= 0) || (thrust.x == 0.0 && thrust.y < 0.0) ? 1 : 0);
        }
        if (this.m_retro_se != null) {
            this.m_retro_se.applyThrust((thrust.x < 0.0 && thrust.y <= 0) || (thrust.x == 0.0 && thrust.y < 0.0) ? 1 : 0);
        }
        return true;
    }

    //-------------------------------------------------------------

    getCollisionRect(): gsCRectangle {
        var r: gsCRectangle = this.m_sprite.getRect();
        //r.expand(-8);
        return r;
    }

    //-------------------------------------------------------------

    registerHit(energy: number, hitter: CActor) {
        if (this.m_dive_mode != enums.DiveMode.DIVE_OFF) {
            return;
        }
        super.registerHit(energy, hitter);
    }

    //-------------------------------------------------------------

    onCollisionWithActor(actor: CActor): void {
        //if (this.m_dive_mode != DiveMode.DIVE_OFF) {
        //    return;
        //}

        ////switch (actor->getActorInfo().m_type) {
        ////    case ACTOR_TYPE_PICKUP:
        ////        ((CPickup *) actor)->collect();
        ////        actor->kill();
        ////        break;
        ////    case ACTOR_TYPE_ALIEN:
        ////        registerHit(1,this);
        ////        break;
        ////    }
    }

    //-------------------------------------------------------------

    onCollisionWithMap(map: gsCMap, hits: number): void {
        if (this.m_dive_mode != enums.DiveMode.DIVE_OFF) {
            return;
        }
        //this.registerHit(SHIP_MAP_HIT, this);
    }

    //-------------------------------------------------------------

    setWeapon(type: enums.WeaponType, grade: enums.WeaponGrade) {

        if (this.m_weapon) {
            this.m_weapon.kill();
            this.m_weapon = null;
        }

        this.m_weapon_type = type;

        switch (this.m_weapon_type) {
            case enums.WeaponType.NO_WEAPON:
                this.m_weapon = null;
                break;
            case enums.WeaponType.MISSILE_WEAPON:
                this.m_weapon = new CMissileWeapon(this.m_scene);
                break;
            case enums.WeaponType.HOMING_MISSILE_WEAPON:
                //this.m_weapon = new CHomingMissileWeapon(this.m_scene);
                break;
            case enums.WeaponType.LASER_WEAPON:
                //this.m_weapon = new CLaserWeapon(this.m_scene);
                break;
        }

        if (this.m_weapon != null) {
            this.m_scene.addActor(this.m_weapon);
            this.m_weapon.activate();
            this.m_weapon.setOwner(this);
            this.m_weapon.setGrade(grade);
        }
    }

    //-------------------------------------------------------------

    public getWeaponType(): enums.WeaponType {
        return this.m_weapon_type;
    }

    //-------------------------------------------------------------

    addWeapon(type: enums.WeaponType, grade: enums.WeaponGrade) {
        switch (type) {
            case enums.WeaponType.MISSILE_WEAPON:
                this.setWeapon(type, grade);
                break;
            case enums.WeaponType.LASER_WEAPON:
                if (!this.m_left_clone && !this.m_right_clone && this.getWeaponType() != type) {
                    this.setWeapon(type, grade);
                }
                else {
                    if (this.m_left_clone && this.m_left_clone.isActive() && this.m_left_clone.getWeaponType() != type) {
                        this.m_left_clone.setWeapon(type, grade);
                    }

                    else if (this.m_right_clone && this.m_right_clone.isActive() && this.m_right_clone.getWeaponType() != type) {
                        this.m_right_clone.setWeapon(type, grade);
                    }
                    else if (this.getWeaponType() != type) {
                        this.setWeapon(type, grade);
                    }
                }
                break;
            case enums.WeaponType.HOMING_MISSILE_WEAPON:
                if (!this.m_left_wingtip && !this.m_right_wingtip)
                    this.setWeapon(type, grade);
                else {
                    if (this.m_left_wingtip &&
                        this.m_left_wingtip.isActive() &&
                        this.m_left_wingtip.getWeaponType() != type)
                        this.m_left_wingtip.setWeapon(type, grade);
                    else if (this.m_right_wingtip &&
                        this.m_right_wingtip.isActive() &&
                        this.m_right_wingtip.getWeaponType() != type)
                        this.m_right_wingtip.setWeapon(type, grade);
                    else if (this.getWeaponType() != type)
                        this.setWeapon(type, grade);
                }
                break;
        }
    }

    //-------------------------------------------------------------

    public upgradeWeapon() {
        if (this.m_weapon != null) {
            if (this.m_weapon.upgrade()) {
                return true;
            }
            //    else if (m_left_wingtip || m_right_wingtip) 
            //    {
            //        bool lup = m_left_wingtip && m_left_wingtip.upgradeWeapon();
            //        bool rup = m_right_wingtip && m_right_wingtip.upgradeWeapon();
            //        if (lup || rup)
            //            return true;
            //    }
            //    else if (m_left_clone || m_right_clone) 
            //    {
            //        bool lup = m_left_clone && m_left_clone.upgradeWeapon();
            //        bool rup = m_right_clone && m_right_clone.upgradeWeapon();
            //        if (lup || rup)
            //        {
            //            return true;
            //        }
            //    }
        }
        return false;
    }

    //-------------------------------------------------------------

    attachClone(side: number): boolean {
        if (side <= 0 && this.m_left_clone != null) {
            this.m_left_clone = new CClone(this.m_scene);
            this.m_scene.addActor(this.m_left_clone);
            this.m_left_clone.activate();
            this.m_left_clone.setOwner(this);
            this.m_left_clone.setAngleRange(-45.0, -135.0);
            this.m_left_clone.setAngle(-90.0, true);
            return true;
        }
        else if (this.m_right_clone != null) {
            this.m_right_clone = new CClone(this.m_scene);
            this.m_scene.addActor(this.m_right_clone);
            this.m_right_clone.activate();
            this.m_right_clone.setOwner(this);
            this.m_right_clone.setAngleRange(45.0, 135.0);
            this.m_right_clone.setAngle(90.0, true);
            return true;
        }
        return false;
    }

    //-------------------------------------------------------------

    detachClone(clone: CClone): void {
        if (this.m_left_clone == clone) {
            this.m_left_clone = null;
        }
        if (this.m_right_clone == clone) {
            this.m_right_clone = null;
        }
    }

    //-------------------------------------------------------------

    attachWingtip(side: number): boolean {
        //if (side <= 0 && m_left_wingtip != null) {
        //    m_left_wingtip = new CWingtip();
        //    m_scene.addActor(m_left_wingtip);
        //    m_left_wingtip.activate();
        //    m_left_wingtip.setOwner(this);
        //    m_left_wingtip.setOffset(new Vector2(-34.0f, 5.0f));
        //    if (m_right_wingtip != null && m_right_wingtip.getWeapon() != null) {
        //        m_left_wingtip.getWeapon().setDirection(m_right_wingtip.getWeapon().getDirection());
        //    }
        //    else {
        //        m_left_wingtip.getWeapon().setDirection(WeaponDirection.WEAPON_FORWARD);
        //    }
        //    return true;
        //}
        //else if (m_right_wingtip != null) {
        //    m_right_wingtip = new CWingtip();
        //    m_scene.addActor(m_right_wingtip);
        //    m_right_wingtip.activate();
        //    m_right_wingtip.setOwner(this);
        //    m_right_wingtip.setOffset(new Vector2(34.0f, 5.0f));
        //    if (m_left_wingtip != null && m_left_wingtip.getWeapon() != null)
        //        m_right_wingtip.getWeapon().setDirection(m_left_wingtip.getWeapon().getDirection());
        //    else
        //        m_right_wingtip.getWeapon().setDirection(WeaponDirection.WEAPON_FORWARD);
        //    return true;
        //}

        return false;
    }

    //-------------------------------------------------------------

    detachWingtip(wingtip: CWingtip) {
        if (this.m_left_wingtip == wingtip) {
            this.m_left_wingtip = null;
        }
        if (this.m_right_wingtip == wingtip) {
            this.m_right_wingtip = null;
        }
    }

    //-------------------------------------------------------------

    removeUpgrades(): void {
        if (this.m_left_clone != null) {
            this.m_left_clone.kill();
            this.m_left_clone = null;
        }
        if (this.m_right_clone != null) {
            this.m_right_clone.kill();
            this.m_right_clone = null;
        }
        if (this.m_left_wingtip != null) {
            this.m_left_wingtip.kill();
            this.m_left_wingtip = null;
        }
        if (this.m_right_wingtip != null) {
            this.m_right_wingtip.kill();
            this.m_right_wingtip = null;
        }
    }

    //-------------------------------------------------------------

    setHandling(handling: enums.ShipHandling) {
        this.m_handling = handling;

        switch (handling) {
            case enums.ShipHandling.HANDLING_BAD:
                this.m_max_speed = 100.0;
                this.m_acceleration = 500.0;
                this.m_damping = 1000.0;
                break;
            case enums.ShipHandling.HANDLING_NORMAL:
                this.m_max_speed = 200.0;
                this.m_acceleration = 1000.0;
                this.m_damping = 1500.0;
                break;
            case enums.ShipHandling.HANDLING_GOOD:
                this.m_max_speed = 300.0;
                this.m_acceleration = 1500.0;
                this.m_damping = 2000.0;
                break;
        }
    }

    //-------------------------------------------------------------

    getHandling() {
        return this.m_handling;
    }

    //-------------------------------------------------------------

    public setCloak(time: number) {
        this.m_cloak_time_limit = time;
        //m_cloak_timer.start();
    }

    //-------------------------------------------------------------

    public isCloaked() {
        // return (m_cloak_time_limit > 0.0f && m_cloak_timer.getTime() < m_cloak_time_limit);
        return (this.m_cloak_time_limit > 0.0 && 1.0 < this.m_cloak_time_limit);
    }

    //-------------------------------------------------------------

    isCloakFlashing() {
        //        float time_to_go = m_cloak_time_limit - 1.0f;// m_cloak_timer.getTime();

        //        if (time_to_go <= 0.0f)
        //        {
        //    return true;
        //}

        //if (time_to_go >= CLOAK_FLASH_TIME) {
        //    return false;
        //}

        //return (((int)(time_to_go / CLOAK_FLASH_RATE)) & 1) == 0;
    }

    //-------------------------------------------------------------

    public dive(time: number) {
        this.m_dive_time_limit = time;
        this.m_dive_level = 0;
        this.m_dive_mode = enums.DiveMode.DIVING_DOWN;
        //m_dive_timer.start();
        //CGameState::playSample(SAMPLE_DIVE_DOWN,getPosition().getX());
    }

    //-------------------------------------------------------------

    public getDiveLevel() {
        return this.m_dive_level;
    }

    //-------------------------------------------------------------

    public getDiveScale() {
        return 1.0 - this.m_dive_level * (1.0 - this.SHIP_DIVE_SCALE) / this.SHIP_DIVE_FRAMES;
    }

    //-------------------------------------------------------------

    public reverseWeapon() {
        //WeaponDirection olddir = WEAPON_FORWARD;

        //if (m_left_wingtip &&
        //    m_left_wingtip->getWeapon())
        //    olddir = m_left_wingtip->getWeapon()->getDirection();
        //else if (m_right_wingtip &&
        //         m_right_wingtip->getWeapon())
        //    olddir = m_right_wingtip->getWeapon()->getDirection();

        //WeaponDirection newdir = olddir == WEAPON_FORWARD ? WEAPON_REVERSE : WEAPON_FORWARD;

        //if (m_left_wingtip &&
        //    m_left_wingtip->getWeapon())
        //    m_left_wingtip->getWeapon()->setDirection(newdir);
        //if (m_right_wingtip &&
        //    m_right_wingtip->getWeapon())
        //    m_right_wingtip->getWeapon()->setDirection(newdir);
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SHIP);
    }
}
export = CShip;