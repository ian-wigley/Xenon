import gsCControls = require("Controls");
import gsCTiledImage = require("TiledImage");
import gsCVector = require("Vector");
import gsCMap = require("Map");
import gsCSprite = require("Sprite");
import gsCTimer = require("Timer");
import CScene = require("Scene");
import CActorInfoList = require("ActorInfoList");
import ActorInfo = require("ActorInfo");
import CExplosion = require("Explosion");
import CSmallExplosion = require("SmallExplosion");
import CMediumExplosion = require("MediumExplosion");
import CBigExplosion = require("BigExplosion");
import enums = require("Enums");
import Point = require("Point");

class CActor {

    private ACTOR_HIT_TIME: number = 0.1;	// time in seconds for hit to register
    private INFINITE_SHIELD: number = -1;

    //-------------------------------------------------------------	

    protected m_owner: CActor;			        // owner
    protected m_is_active: boolean;
    protected m_hit_timer: gsCTimer;		    // for animation of hit
    protected m_scene: CScene;			        // scene containing this actor
    protected m_position: gsCVector;		    // relative to map
    protected m_velocity: gsCVector;
    protected m_shield: number;				    // shield strength
    protected m_sprite: gsCSprite;
    protected m_image: gsCTiledImage;
    protected m_timer: gsCTimer;			    // for animation
    protected m_is_on_screen: boolean;
    protected m_is_hit: boolean;
    protected m_score_multiplier: number;
    protected m_actorInfo: CActorInfoList;
    protected gameTime: gsCTimer;
    protected timerTest: number = 0.0;

    private frame: number = 0;

    constructor(theScene?: CScene) {
        this.m_scene = theScene;
        if (this.m_scene != null) {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
        }
        this.m_position = new gsCVector(0, 0);
        this.m_velocity = new gsCVector(0, 0);
        this.m_is_active = false;
        this.m_is_on_screen = true;
        this.m_is_hit = false;
        this.m_score_multiplier = 1.0;
    }

    //constructor(listOfActors: CActorInfoList) {
    //    if (this.m_scene != null) {
    //        this.m_actorInfo = this.m_scene.GetlistOfActors();
    //    }
    //    this.m_scene = null;// 0;
    //    this.m_owner = null;// 0;
    //    this.m_is_active = false;
    //    this.m_is_on_screen = true;
    //    this.m_is_hit = false;
    //    this.m_score_multiplier = 1.0;
    //    this.m_actorInfo = listOfActors;
    //}

    //-------------------------------------------------------------

    public isActive() {
        return this.m_is_active;
    }

    //-------------------------------------------------------------

    public getPosition(): gsCVector {
        return this.m_position;
    }

    //-------------------------------------------------------------

    public getVelocity() {
        return this.m_velocity;
    }

    //-------------------------------------------------------------

    public setPosition(position: gsCVector) {
        this.m_position = position;
    }

    //-------------------------------------------------------------

    public setVelocity(velocity: gsCVector) {
        this.m_velocity = velocity;
    }

    //-------------------------------------------------------------

    public isOnScreen() {
        return this.m_is_on_screen;
    }

    //-------------------------------------------------------------

    public isHit() {
        return this.m_is_hit;
    }

    //-------------------------------------------------------------
    // Overridable

    //		public gsCRect getCollisionRect()
    //		{
    //			return m_sprite.getRect();
    //		}

    //-------------------------------------------------------------
    // Overridable
    public onLeavingScreen() {
        this.kill();
    }

    //-------------------------------------------------------------
    // Overridable
    public onCollisionWithActor(actor: CActor) {
    }

    //-------------------------------------------------------------

    public onCollisionWithMap(map: gsCMap, hits: number) {
    }

    //-------------------------------------------------------------
    // Overridable
    public postProcessCollision() {
    }

    //-------------------------------------------------------------

    public setOwner(owner: CActor) {
        this.m_owner = owner;
    }

    //-------------------------------------------------------------

    public setScene(scene: CScene) {
        this.m_scene = scene;
    }

    //-------------------------------------------------------------

    public getOwner() {
        return this.m_owner;
    }

    //-------------------------------------------------------------

    public setShield(shield: number) {
        this.m_shield = shield;
    }

    //-------------------------------------------------------------

    public getShield() {
        return this.m_shield;
    }

    //-------------------------------------------------------------

    public increaseScoreMultiplier(amount: number) {
        this.m_score_multiplier += amount;
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.m_is_active) {
            var info: ActorInfo = this.getActorInfo();
            if (info.m_filename != "") {
                this.m_image = this.m_scene.getImage(info.m_filename);
                //m_image = m_scene.loadImages();//info.m_filename);
            }
            else {
                this.m_image = null;
            }
            this.m_sprite = new gsCSprite();
            this.m_sprite.setImage(this.m_image);
            this.m_sprite.setHotspot(new gsCVector(info.m_hotspot_x, info.m_hotspot_y));
            this.m_sprite.setActive(this.m_image != null);
            this.m_shield = info.m_initial_shield;
            this.m_is_active = true;
            this.m_is_on_screen = false;
            this.m_is_hit = false;
        }
        return true;
    }

    //-------------------------------------------------------------

    public kill() {
        this.m_is_active = false;
    }

    //-------------------------------------------------------------

    public explode() {
        var x: CExplosion = null;

        if (this.m_image != null) {
            var size: Point = this.m_image.getTileSize();
            var area = size.X * size.Y;

            if (area <= 32 * 32) {
                x = new CSmallExplosion();
            }
            else if (area <= 64 * 64) {
                x = new CMediumExplosion();
            }
            else {
                x = new CBigExplosion();
            }

            this.m_scene.addActor(x);
            x.setPosition(this.getPosition());
            x.activate();
        }
    }

    //-------------------------------------------------------------

    public registerHit(energy: number, hitter: CActor) {
        if (this.m_shield != this.INFINITE_SHIELD) {
            if (this.m_shield > 0) {
                this.m_shield -= energy;
                if (this.m_shield <= 0) {
                    this.m_shield = 0;
                    this.onKilled();
                }
            }

            this.m_is_hit = true;
            //m_hit_timer.start();
        }
    }

    //-------------------------------------------------------------

    public onKilled() {
        var bonus = 0;//getActorInfo().m_kill_bonus; 

        if (bonus > 0) {
            var score = bonus * this.m_score_multiplier;

            //CPlayGameState::getPlayer()->scoreBonus(score);
            //m_scene.createLabel(getPosition(),score);
        }
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer) {
        //this.timerTest += gameTime;//.time;//.ElapsedGameTime.Milliseconds;
        return true;
    }

    public Draw(ctx: CanvasRenderingContext2D) {

        if (this.isActive() && this.m_image != null) {
            ////m_sprite.setPosition(new Point((int)m_position.X + m_scene.getMapFrontLayer().getPosition().X,
            ////(int)m_position.Y + m_scene.getMapFrontLayer().getPosition().Y));

            this.m_sprite.setPosition(new gsCVector(0, 0).plus(this.m_position, this.m_scene.getMapFrontLayer().getPosition()));
            //this.m_sprite.setPosition(this.m_position);

            if (this.m_is_hit) {
                //if (m_hit_timer.getTime() > ACTOR_HIT_TIME)
                //{
                //    m_hit_timer.reset();
                //    m_is_hit = false;
                //}
            }

            if (this.m_is_hit) {
                //var level = 255.0 * (1.0 - m_hit_timer.getTime() / ACTOR_HIT_TIME);
                //m_sprite.enableFillColour(Color(level, level, level));
            }
            else {
                this.m_sprite.disableFillColour();
            }

            var was_on_screen: boolean = this.m_is_on_screen;

            // ---> draw the Actor in the gsCSprite class
            this.m_is_on_screen = this.m_sprite.draw(ctx);

            if (was_on_screen && !this.m_is_on_screen) {
                this.onLeavingScreen();
            }

            if (this.m_is_on_screen) {
                this.m_scene.addToCollisionList(this, this.getCollisionRect());
            }
        }

        return true;
    }

    //-------------------------------------------------------------
    // animate over range of frames
    public animations(mode: enums.AnimationMode, first_frame: number, num_frames: number) {
        var finished = false;

        if (num_frames <= 1) {
            this.frame = 0;
        }
        else {
            //frame = 0; ///*this.timerTest*/ 0.5 * this.getActorInfo().m_anim_rate;
            switch (mode) {
                case enums.AnimationMode.ANIMATE_LOOP:
                    //frame = frame % (num_frames - 1);	// cycle repeatedly
                    this.frame = (this.frame + 1) % num_frames;

                    break;
                case enums.AnimationMode.ANIMATE_ONESHOT:
                    if (this.frame >= num_frames) {
                        this.frame = num_frames - 1;	// stay on last frame
                        finished = true;				// flag that we've finished
                    }
                    break;
            }
        }

        this.m_sprite.setFrame(first_frame + this.frame);
        return finished;
    }

    //-------------------------------------------------------------
    // animate over entire range
    public animate(mode: enums.AnimationMode) {
        return this.animations(mode, 0, this.m_image.getNumTiles());
    }

    //-------------------------------------------------------------
    // Convert velocity into a direction (0..num_dir-1)
    public getDirection(num_dir: number) {
        if (this.m_velocity.length == 0) {
            return 0;
        }

        var angle = this.m_velocity.direction();
        var step = 360.0 / num_dir;
        return (((angle - step / 2.0 + 360.0) / step)) & (num_dir - 1);
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        return null;
    }

    //-------------------------------------------------------------

    public getCollisionRect() {
        return this.m_sprite.getRect();
    }

    //-------------------------------------------------------------

    public GetActorInfo() {
        return this.m_scene.GetlistOfActors();
    }
}

export = CActor;