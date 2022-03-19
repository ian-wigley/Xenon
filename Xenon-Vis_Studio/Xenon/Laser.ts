import CActor = require("Actor");
import CBullet = require("Bullet");
import gsCPoint = require("Point");
import gsCMap = require("Map");
import gsCMapTile = require("Maptile");
import gsCVector = require("Vector");
import enums = require("Enums");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import gsCScreen = require("Screen");
import gsCRectangle = require("Rectangle");
import CPlayGameState = require("PlayGameState");

class CLaser extends CBullet {

    private LASER_MAX_LENGTH = 256;
    private m_hit_map: gsCMap;
    private m_length: number;
    private m_dying: boolean;
    private m_laserRect: gsCRectangle;
    private m_actor_collider_list: Array<CActor>;
    private m_map_collider_list: Array<gsCPoint>;

    constructor(playGameState: CPlayGameState) {
        super(playGameState);
        this.m_playGameState = playGameState;
        this.m_hit_map = null;
        this.m_name = "laser";
        this.m_actor_collider_list = [];
        this.m_map_collider_list = [];
        
        this.m_grade = 2; //TEMP!
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_LASER);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_length = this.LASER_MAX_LENGTH;
            this.m_dying = false;
        }

        return super.activate();
    }

    //-------------------------------------------------------------

    public onCollisionWithActor(actor: CActor): void {
        if (this.m_dying)
            return;

        // save colliders for later
        this.m_actor_collider_list.push(actor);
    }

    //-------------------------------------------------------------

    public onCollisionWithMap(map: gsCMap, hits: number): void {
        if (this.m_dying)
            return;

        // save colliders for later
        this.m_hit_map = map;

        this.m_map_collider_list = new Array<gsCPoint>(hits);

        for (var i = 0; i < hits; i++) {
            this.m_map_collider_list[i] = map.getHitPosition(i);
        }
    }

    //-------------------------------------------------------------

    public postProcessCollision(): void {
        // only hit NEAREST actor or map tile
        if (this.m_actor_collider_list.length == 0 && this.m_map_collider_list.length == 0)
            return;

        var actor_i: number = -1;
        var actor_d: number = 99999.0;

        var pos: gsCVector = this.getPosition();

        for (var i = 0; i < this.m_actor_collider_list.length; i++) {
            var cpos: gsCVector = this.m_actor_collider_list[i].getPosition();
            var d: number = cpos.minus(pos).length;
            if (actor_i == -1 || d < actor_d) {
                actor_i = i;
                actor_d = d;
            }
        }

        var map_i: number = -1;
        var map_d: number = 99999.0;

        if (this.m_hit_map) {
            var tile_size: gsCPoint = this.m_hit_map.getImage().getTileSize();
            var tile_centre: gsCPoint = new gsCPoint(tile_size.X / 2, tile_size.Y / 2);

            for (var i = 0; i < this.m_map_collider_list.length; i++) {
                // convert map tile coords to world coords

                //    var p: gsCPoint = this.m_map_collider_list[i] * tile_size + tile_centre;
                //    var mpos:gsCVector = new gsCVector(p.X, p.Y);

                //    var d: number = (mpos - pos).length();
                //    if (map_i == -1 || d < map_d) {
                //        map_i = i;
                //        map_d = d;
                //    }
            }
        }

        if (actor_d < map_d) {
            var actor: CActor = this.m_actor_collider_list[actor_i];
            actor.registerHit(this.getActorInfo().m_energy[this.m_grade], this);
            this.m_length = actor_d;
        }
        else {
            var poss: gsCPoint = this.m_map_collider_list[map_i];

            var mt: gsCMapTile = this.m_hit_map.getMapTile(poss);
            if (mt && mt.getUserData(0) == enums.TileId.ID_DESTROYABLE_TILE) {
                mt.setHidden(true);
                this.m_scene.createMapExplosion(this.m_hit_map, pos);

                this.m_playGameState.getPlayer().scoreBonus(5);
            }
            this.m_length = map_d;
        }

        this.m_actor_collider_list = [];
        this.m_map_collider_list = [];
        this.m_hit_map = null;
        this.m_dying = true;
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gametime: gsCTimer): boolean {
        this.m_position.plusEquals(this.m_velocity);
        if (!this.m_dying) { //TEMP - Ian 21/03/2017
            this.m_length += this.m_velocity.Y;
            if (this.m_length <= 0) {
                this.kill();
                return true;
            }
        }

        this.m_sprite.setFrame(this.m_grade);
        return true;
    }

    //-------------------------------------------------------------

    public Draw(ctx: CanvasRenderingContext2D): boolean {
        var screen: gsCScreen = new gsCScreen();

        if (!screen)
            return false;

        var colour: string; //gsCColour 
        var flash = Math.random() * 256;
         
        this.m_grade = 2
        switch (this.m_grade) {
            case enums.BulletGrade.BULLET_STANDARD:
                colour = "red";//gsCColour(0,flash,255);
                break;
            case enums.BulletGrade.BULLET_MEDIUM:
                colour = "green";//gsCColour(flash,255,0);
                break;
            case enums.BulletGrade.BULLET_BEST:
                colour = "blue";//gsCColour(255,0,flash);
                break;
        }

        var rect: gsCRectangle = this.getCollisionRect();
        var on_screen: boolean = screen.drawSolidRect(this.m_laserRect, colour, ctx);

        if (this.m_is_on_screen && !on_screen)
            this.onLeavingScreen();

        this.m_is_on_screen = on_screen;

        if (this.m_is_on_screen && !this.m_dying) {
            this.m_scene.addToCollisionList(this, rect);
        }
        return true;
    }

    //-------------------------------------------------------------

    public getCollisionRect(): gsCRectangle {
        var pos: gsCPoint = this.getPosition().plus1(this.m_scene.getMap().getPosition());
        this.m_laserRect = new gsCRectangle(pos.X, pos.Y - 300, 3, this.m_length);
        return new gsCRectangle(pos.X, pos.Y - 300, pos.X + 3, this.m_length);
    }

    //-------------------------------------------------------------
}

export = CLaser;