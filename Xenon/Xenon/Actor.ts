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
import enums = require("Enums");

class CActor {

    //-------------------------------------------------------------
    // Actor Info for creating actors
    /*
    public struct ActorInfo
    {
        ActorType m_type;			// type of actor
        string m_filename;			// file containing sprite frames
        int m_hotspot_x;			// hotspot position (i.e. offset to centre)
        int m_hotspot_y;
        float m_anim_rate;			// animation rate (in frames per second)
        int m_initial_shield;		// initial shield value
        int m_kill_bonus;			// score bonus for killing actor
    };
    */
    //-------------------------------------------------------------

    //public enum  AnimationMode{
    //    ANIMATE_LOOP,				// cycle repeatedly through frames
    //    ANIMATE_ONESHOT,			// cycle once then flag as finished
    //};

    //-------------------------------------------------------------

    ACTOR_HIT_TIME: number = 0.1;	// time in seconds for hit to register
    INFINITE_SHIELD: number = -1;

    //-------------------------------------------------------------	

    m_owner: CActor;			        // owner
    m_is_active: boolean;
    m_hit_timer: gsCTimer;		        // for animation of hit
    m_scene: CScene;			        // scene containing this actor
    m_position: gsCVector;		        // relative to map
    m_velocity: gsCVector;
    m_shield: number;				    // shield strength
    m_sprite: gsCSprite;
    m_image: gsCTiledImage;
    m_timer: gsCTimer;			        // for animation
    m_is_on_screen: boolean;
    m_is_hit: boolean;
    m_score_multiplier: number;
    m_actorInfo: CActorInfoList;
    m_arial16Font: HTMLImageElement;    //SpriteFont;
    m_shipTexture: HTMLImageElement;    //Texture2D;
    m_engineTexture: HTMLImageElement;  //Texture2D;
    //protected int m_sprite = 0;
    gameTime: gsCTimer;
    timerTest: number = 0.0;

    constructor(theScene: CScene) {
        this.m_scene = theScene;
        if (this.m_scene != null) {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
        }
        this.m_position = new gsCVector(0, 0);
        this.m_velocity = new gsCVector(0, 0);
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

    //class CActor
    //{
    //	private:
    //
    //		CActor *m_owner;			// owner
    //		bool m_is_active;
    //		gsCTimer m_hit_timer;		// for animation of hit
    //
    //	protected:
    //
    //		CScene *m_scene;			// scene containing this actor
    //
    //		Vector2 m_position;		// relative to map
    //		Vector2 m_velocity;
    //		int m_shield;				// shield strength
    //		gsCSprite m_sprite;
    //		gsCTiledImage *m_image;
    //		gsCTimer m_timer;			// for animation
    //
    //		bool m_is_on_screen;
    //
    //		bool m_is_hit;
    //
    //		float m_score_multiplier;
    //
    //	public:
    //
    //		CActor();
    //		virtual ~CActor();
    //
    //		virtual  ActorInfo& getActorInfo() = 0;
    //
    //		virtual bool activate();
    //		virtual void kill();
    //		virtual void explode();
    //		virtual bool update(Controls *controls = 0) = 0;
    //		virtual bool draw();
    //		virtual void registerHit(int energy,CActor *hitter);
    //
    //		virtual void onKilled();
    //		virtual void onLeavingScreen();
    //		virtual void onCollisionWithActor(CActor *actor);
    //		virtual void onCollisionWithMap(gsCMap *map,int hits);
    //		virtual void postProcessCollision();
    //
    //		bool isActive();
    //		bool isOnScreen();
    //		bool isHit();
    //
    //		Vector2 getPosition();
    //		Vector2 getVelocity();
    //		CActor *getOwner();
    //		int getShield();
    //		int getDirection(int num_dir);
    //		virtual gsCRect getCollisionRect();
    //
    //		void setPosition( Vector2& position);
    //		void setVelocity( Vector2& velocity);
    //		void setOwner(CActor *owner);
    //		void setScene(CScene *scene);
    //		void setShield(int shield);
    //
    //		bool animate(AnimationMode mode);
    //		bool animate(AnimationMode mode,int first_frame,int num_frames);
    //
    //		void increaseScoreMultiplier(float amount);
    //};

    //-------------------------------------------------------------

    isActive() {
        return this.m_is_active;
    }

    //-------------------------------------------------------------

    getPosition() {
        return this.m_position;
    }

    //-------------------------------------------------------------

    getVelocity() {
        return this.m_velocity;
    }

    //-------------------------------------------------------------

    setPosition(position: gsCVector) {
        this.m_position = position;
    }

    //-------------------------------------------------------------

    setVelocity(velocity: gsCVector) {
        this.m_velocity = velocity;
    }

    //-------------------------------------------------------------

    isOnScreen() {
        return this.m_is_on_screen;
    }

    //-------------------------------------------------------------

    isHit() {
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

    onLeavingScreen() {
        this.kill();
    }

    //-------------------------------------------------------------
    // Overridable

    onCollisionWithActor(actor: CActor) {
    }

    //-------------------------------------------------------------

    onCollisionWithMap(map: gsCMap, hits: number) {
    }

    //-------------------------------------------------------------
    // Overridable

    postProcessCollision() {
    }

    //-------------------------------------------------------------

    setOwner(owner: CActor) {
        this.m_owner = owner;
    }

    //-------------------------------------------------------------

    setScene(scene: CScene) {
        this.m_scene = scene;
    }

    //-------------------------------------------------------------

    getOwner() {
        return this.m_owner;
    }

    //-------------------------------------------------------------

    setShield(shield: number) {
        this.m_shield = shield;
    }

    //-------------------------------------------------------------

    getShield() {
        return this.m_shield;
    }

    //-------------------------------------------------------------

    increaseScoreMultiplier(amount: number) {
        this.m_score_multiplier += amount;
    }

    //-------------------------------------------------------------


    Activated() {
        return this.activate();
    }

    activate() {
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

    kill() {
        this.m_is_active = false;
    }

    //-------------------------------------------------------------

    explode() {
        var x: CExplosion = null;

        //if (this.m_image != null) {
        //    var size: Point = m_image.getTileSize();

        //    var area = size.X * size.Y;

        //    //x: CExplosion;

        //    if (area <= 32 * 32) {
        //        x = new CSmallExplosion();
        //    }
        //    else if (area <= 64 * 64) {
        //        x = new CMediumExplosion();
        //    }
        //    else {
        //        x = new CBigExplosion();
        //    }

        //    this.m_scene.addActor(x);
        //    x.setPosition(getPosition());
        //    x.activate();
        //}
    }

    //-------------------------------------------------------------

    registerHit(energy: number, hitter: CActor) {
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

    onKilled() {
        var bonus = 0;//getActorInfo().m_kill_bonus; 

        if (bonus > 0) {
            var score = bonus * this.m_score_multiplier;

            //CPlayGameState::getPlayer()->scoreBonus(score);
            //m_scene.createLabel(getPosition(),score);
        }
    }

    //-------------------------------------------------------------


    //update(controls: Controls, gameTime: GameTime) {
    update(controls: gsCControls, gameTime: gsCTimer) {
        //this.timerTest += gameTime;//.time;//.ElapsedGameTime.Milliseconds;
        return true;
    }

    Draw(ctx: CanvasRenderingContext2D) {

        if (this.isActive() && this.m_image != null) {
            ////m_sprite.setPosition(new Point((int)m_position.X + m_scene.getMapFrontLayer().getPosition().X,
            ////(int)m_position.Y + m_scene.getMapFrontLayer().getPosition().Y));

            //this.m_sprite.setPosition(this.m_position + this.m_scene.getMapFrontLayer().getPosition());
            this.m_sprite.setPosition(this.m_position);

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

    animations(mode: enums.AnimationMode, first_frame: number, num_frames: number) {
        var finished = false;

        var frame = 0;

        if (num_frames <= 1) {
            frame = 0;
        }
        else {
            frame = this.timerTest * this.getActorInfo().m_anim_rate;
            switch (mode) {
                case enums.AnimationMode.ANIMATE_LOOP:
                    frame = frame % (num_frames - 1);	// cycle repeatedly
                    break;
                case enums.AnimationMode.ANIMATE_ONESHOT:
                    if (frame >= num_frames) {
                        frame = num_frames - 1;			// stay on last frame
                        finished = true;				// flag that we've finished
                    }
                    break;
            }
        }

        this.m_sprite.setFrame(first_frame + frame);
        return finished;
    }

    //-------------------------------------------------------------
    // animate over entire range

    animate(mode: enums.AnimationMode) {
        return this.animations(mode, 0, this.m_image.getNumTiles());
    }

    //-------------------------------------------------------------
    // Convert velocity into a direction (0..num_dir-1)

    getDirection(num_dir: number) {
        if (this.m_velocity.length == 0) {
            return 0;
        }

        var angle = 0;// m_velocity..direction();
        var step = 360.0 / num_dir;
        return (((angle - step / 2.0 + 360.0) / step)) & (num_dir - 1);
    }

    //-------------------------------------------------------------

    getActorInfo() {
        return null;
    }

    //-------------------------------------------------------------

    getCollisionRect() {
        return this.m_sprite.getRect();
    }

    //-------------------------------------------------------------

    GetActorInfo() {
        return this.m_scene.GetlistOfActors();
    }
}

export = CActor;