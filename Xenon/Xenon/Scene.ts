import gsCControls = require("Controls");
import gsCRectangle = require("Rectangle");
import gsCTiledImage = require("TiledImage");
import gsCVector = require("Vector");
import gsCMap = require("Map");
import gsCScreen = require("Screen");
import gsCSprite = require("Sprite");
import gsCTimer = require("Timer");
import CActor = require("Actor");
import CStarfield = require("Starfield");
import CActorInfoList = require("ActorInfoList");
import CShip = require("Ship");
import CPlayGameState = require("PlayGameState");
import CLevel = require("Level");
import enums = require("Enums");
import gsCPoint = require("Point");
import CSmallExplosion = require("SmallExplosion");

class CScene {

    private m_textures: Array<HTMLImageElement>;
    private m_listOfActors: CActorInfoList;

    //gsCList<CActor *> m_actor_list;
    //gsCList<ImageEntry *> m_image_list;
    private m_collision_list = []; //:gsCCollisionList;
    private m_frame_count: number;
    private m_map: gsCMap;
    private m_screen: gsCScreen;
    private lev: CLevel;
    private m_checkpoint_active: boolean;
    private m_checkpoint: gsCVector;
    private m_is_warping: boolean;
    private m_ship_is_cloaked: boolean;
    private m_actor_list: CActor[];
    private m_even: boolean = false;
    private time: number = 0;

    //temp!
    private m_font: HTMLImageElement;

    private COLLIDE_WITH_SHIP: number = 1;
    private COLLIDE_WITH_BULLETS: number = 2;

    constructor(image: HTMLImageElement, textures: Array<HTMLImageElement>, listOfActors: CActorInfoList) {
        this.m_textures = textures;
        this.m_listOfActors = listOfActors;
        this.m_frame_count = 0;
        this.m_checkpoint_active = false;
        this.m_is_warping = false;
        this.m_actor_list = [];
        this.m_collision_list = [];
        //m_screen = new gsCScreen();
        this.lev = new CLevel(image);//, font);
    }

    //-------------------------------------------------------------

    public getImage(filename: string) {
        if (filename == "") {
            return null;
        }

        for (var i = 0; i < this.m_textures.length; i++) {
            if (this.m_textures[i] != null) {
                var name = this.m_textures[i].id;
                //console.log(name);
                var temp = name.split(".")
                if (temp[0].toLowerCase() == filename.toLowerCase()) {
                    // gsCTiledImage tile = new gsCTiledImage(name.Value, m_font);
                    var tile: gsCTiledImage = new gsCTiledImage(this.m_textures[i]);
                    tile.setTileSize(new gsCPoint(this.m_listOfActors.GetTileWidth(i), this.m_listOfActors.GetTileHeight(i)));
                    //this.m_image_list.Add(tile);
                    return tile;
                }
            }
        }
        return null;
    }

    //-------------------------------------------------------------

    loadImages() {
        //for (var i = 0; i < ActorInfoType.INFO_TOTAL; i++) {
        //    //gsCTiledImage image = getImage(m_listOfActors.GetFileName(i));
        //    var image = this.getImage(m_listOfActors.GetFileName(i));

        //    if (image != null) {
        //        image.setTileSize(new Point(m_listOfActors.GetTileWidth(i),
        //            this.m_listOfActors.GetTileHeight(i)));

        //        //			image->enableColourKey(gsCColour(gsMAGENTA));       Ian test !
        //    }
        //}

        return true;
    }

    //-------------------------------------------------------------

    public addToCollisionList(actor: CActor, rect: gsCRectangle): void {
        switch (actor.getActorInfo().m_type) {
            case enums.ActorType.ACTOR_TYPE_SHIP:
                if (this.m_ship_is_cloaked)
                    break;
                this.m_collision_list.push(actor,
                    rect,
                    (1 << enums.ActorType.ACTOR_TYPE_SHIP),
                    (1 << enums.ActorType.ACTOR_TYPE_PICKUP) | (1 << enums.ActorType.ACTOR_TYPE_ALIEN));
                break;
            case enums.ActorType.ACTOR_TYPE_UPGRADE:
                if (this.m_ship_is_cloaked)
                    break;
                this.m_collision_list.push(actor,
                    rect,
                    (1 << enums.ActorType.ACTOR_TYPE_UPGRADE),
                    (1 << enums.ActorType.ACTOR_TYPE_PICKUP) | (1 << enums.ActorType.ACTOR_TYPE_ALIEN));
                break;
            case enums.ActorType.ACTOR_TYPE_BULLET:
                this.m_collision_list.push(actor,
                    rect,
                    (1 << enums.ActorType.ACTOR_TYPE_BULLET),
                    (1 << enums.ActorType.ACTOR_TYPE_ALIEN) | (1 << enums.ActorType.ACTOR_TYPE_ALIENBULLET));
                break;
            case enums.ActorType.ACTOR_TYPE_ALIENBULLET:
                this.m_collision_list.push(actor,
                    rect,
                    (1 << enums.ActorType.ACTOR_TYPE_ALIENBULLET),
                    (1 << enums.ActorType.ACTOR_TYPE_SHIP));
                break;
            case enums.ActorType.ACTOR_TYPE_ALIEN:
                this.m_collision_list.push(actor,
                    rect,
                    (1 << enums.ActorType.ACTOR_TYPE_ALIEN),
                    0);
                //this.m_collision_list.addObject(actor,
                //    rect,
                //    (1 << enums.ActorType.ACTOR_TYPE_ALIEN),
                //    0);
                break;
            case enums.ActorType.ACTOR_TYPE_PICKUP:
                this.m_collision_list.push(actor,
                    rect,
                    (1 << enums.ActorType.ACTOR_TYPE_PICKUP),
                    0);
                break;
            case enums.ActorType.ACTOR_TYPE_WEAPON:
            case enums.ActorType.ACTOR_TYPE_ENGINE:
            case enums.ActorType.ACTOR_TYPE_LABEL:
            case enums.ActorType.ACTOR_TYPE_EFFECT:
                // no collision detection
                break;
        }
    }

    //-------------------------------------------------------------

    updateActorsOfType(type: enums.ActorType, controls: gsCControls, gameTime: gsCTimer) {
        for (var j = 0; j < this.m_actor_list.length; j++) {
            var obj = this.m_actor_list[j];
            if (obj.isActive() && obj.getActorInfo().m_type == type) {
                obj.update(controls, gameTime);
            }
        }
    }

    //-------------------------------------------------------------

    updateAllActors(controls: gsCControls, gameTime: gsCTimer) {
        this.updateActorsOfType(enums.ActorType.ACTOR_TYPE_SHIP, controls, gameTime);
        this.updateActorsOfType(enums.ActorType.ACTOR_TYPE_UPGRADE, controls, gameTime);
        this.updateActorsOfType(enums.ActorType.ACTOR_TYPE_ALIEN, controls, gameTime);
        this.updateActorsOfType(enums.ActorType.ACTOR_TYPE_WEAPON, controls, gameTime);
        this.updateActorsOfType(enums.ActorType.ACTOR_TYPE_ENGINE, controls, gameTime);
        this.updateActorsOfType(enums.ActorType.ACTOR_TYPE_ALIENBULLET, controls, gameTime);
        this.updateActorsOfType(enums.ActorType.ACTOR_TYPE_BULLET, controls, gameTime);
        this.updateActorsOfType(enums.ActorType.ACTOR_TYPE_PICKUP, controls, gameTime);
        this.updateActorsOfType(enums.ActorType.ACTOR_TYPE_LABEL, controls, gameTime);
        this.updateActorsOfType(enums.ActorType.ACTOR_TYPE_EFFECT, controls, gameTime);
    }

    //-------------------------------------------------------------
    // Draw all active game actors - prioritized

    public drawAllActors(ctx: CanvasRenderingContext2D, map: gsCMap) {

        this.m_map = map;
        this.m_frame_count++;
        this.m_collision_list = [];
        var total = this.m_actor_list.length;//.getSize();
        var ship = this.findShip();

        this.m_ship_is_cloaked = ship && ship.isCloaked();

        if (ship && ship.getDiveLevel() != 0) {
            //drawActorsOfType(ACTOR_TYPE_ENGINE, total);
            //drawActorsOfType(ACTOR_TYPE_SHIP, total);
            //drawActorsOfType(ACTOR_TYPE_UPGRADE, total);
            this.m_map.drawMap(ctx);
            //drawActorsOfType(ACTOR_TYPE_EFFECT, total);
            //drawActorsOfType(ACTOR_TYPE_PICKUP, total);
            //drawActorsOfType(ACTOR_TYPE_ALIEN, total);
            //drawActorsOfType(ACTOR_TYPE_ALIENBULLET, total);
            //drawActorsOfType(ACTOR_TYPE_BULLET, total);
            //drawActorsOfType(ACTOR_TYPE_WEAPON, total);
            //drawActorsOfType(ACTOR_TYPE_LABEL, total);
        }
        else {
            this.m_map.drawMap(ctx);
            //this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_EFFECT, total, ctx);
            //this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_PICKUP, total, ctx);
            this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_ALIEN, total, ctx);
            //this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_ALIENBULLET, total, ctx);
            this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_BULLET, total, ctx);
            this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_ENGINE, total, ctx);
            this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_SHIP, total, ctx);
            //this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_UPGRADE, total, ctx);
            //this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_WEAPON, total, ctx);
            //this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_LABEL, total, ctx);
        }
    }

    //-------------------------------------------------------------

    // Main draw method for all Actors
    drawActorsOfType(type: enums.ActorType, total: number, ctx: CanvasRenderingContext2D) {
        for (var j = 0; j < this.m_actor_list.length; j++) {
            var act = this.m_actor_list[j];
            if (act.isActive() && act.getActorInfo().m_type == type) {
                act.Draw(ctx);
            }
        }
    }

    //-------------------------------------------------------------

    public actorCollisionCallback(object1: Object, object2: Object) {
        //gsASSERT(object1);
        //gsASSERT(object2);

        var actor1: CActor = <CActor>object1;
        var actor2: CActor = <CActor>object2;

        if (!actor1.isActive() ||
            !actor2.isActive())
            return;

        actor1.onCollisionWithActor(actor2);
    }


    //-------------------------------------------------------------
    // Draw all active game actors - prioritized

    public drawAllActorss(mapFrontLayer: gsCMap, mapBackLayer: gsCMap) {
        //this.m_frame_count++;

        //var time = 100;// stop the nagging !!

        ////     m_collision_list.clear();

        //var total = this.m_actor_list.length;//.getSize();

        ////     CShip ship = findShip();

        ////     m_ship_is_cloaked = ship && ship->isCloaked();

        ////    if (ship && ship->getDiveLevel() != 0) {
        ////        drawActorsOfType(ACTOR_TYPE_ENGINE,total);
        ////        drawActorsOfType(ACTOR_TYPE_SHIP,total);
        ////        drawActorsOfType(ACTOR_TYPE_UPGRADE,total);

        //mapBackLayer.draw();
        ////            mapFrontLayer.draw(spritebatch);

        //// Temp testing movement
        //mapFrontLayer.move(new Point(0, 1));
        ////		bool even = true;		//TEMP

        ////		m_even = !even;

        //if (time == 1)// && !m_reached_boss)
        //{

        //    mapBackLayer.move(new Point(0, 1));
        //    time = -1;
        //}
        //time++;
        ////        drawActorsOfType(ACTOR_TYPE_EFFECT,total);
        ////        drawActorsOfType(ACTOR_TYPE_PICKUP,total);
        ////        drawActorsOfType(ACTOR_TYPE_ALIEN,total);
        ////        drawActorsOfType(ACTOR_TYPE_ALIENBULLET,total);
        ////        drawActorsOfType(ACTOR_TYPE_BULLET,total);
        ////        drawActorsOfType(ACTOR_TYPE_WEAPON,total);
        ////        drawActorsOfType(ACTOR_TYPE_LABEL,total);
        ////        }
        ////    else {

        ////        map->draw();

        ////        drawActorsOfType(ACTOR_TYPE_EFFECT,total);
        ////        drawActorsOfType(ACTOR_TYPE_PICKUP,total);
        ////        drawActorsOfType(ACTOR_TYPE_ALIEN,total);
        ////        drawActorsOfType(ACTOR_TYPE_ALIENBULLET,total);
        ////        drawActorsOfType(ACTOR_TYPE_BULLET,total);
        ////        drawActorsOfType(ACTOR_TYPE_ENGINE,total);
        ////        drawActorsOfType(ACTOR_TYPE_SHIP,total);
        ////        drawActorsOfType(ACTOR_TYPE_UPGRADE,total);
        ////        drawActorsOfType(ACTOR_TYPE_WEAPON,total);
        ////        drawActorsOfType(ACTOR_TYPE_LABEL,total);
        ////        }
    }

    //-------------------------------------------------------------

    public checkActorCollisions(): void {
        // m_collision_list.scan(actorCollisionCallback);
        for (var i = 0; i < this.m_actor_list.length; i++) {
            if (this.m_actor_list[i].isActive()) {
                this.m_actor_list[i].postProcessCollision();
            }
        }
    }

    //-------------------------------------------------------------

    public checkMapCollisions(map: gsCMap): void {
        // check for collisions between actors and map
        for (var i = 0; i < this.m_actor_list.length; i++) {
            var actor: CActor = this.m_actor_list[i];
            if (actor.isActive()) {
                switch (actor.getActorInfo().m_type) {
                    case enums.ActorType.ACTOR_TYPE_SHIP:
                    case enums.ActorType.ACTOR_TYPE_UPGRADE:
                        if (this.m_ship_is_cloaked)
                            break;
                        {
                            var rect: gsCRectangle = actor.getCollisionRect();
                            //rect.move(-map.getPosition());
                            var hits = map.hitBy(rect, this.COLLIDE_WITH_SHIP);
                            if (hits > 0) {
                                actor.onCollisionWithMap(map, hits);
                            }
                        }
                        break;

                    case enums.ActorType.ACTOR_TYPE_BULLET:
                    case enums.ActorType.ACTOR_TYPE_ALIENBULLET:
                        {
                            var rect: gsCRectangle = actor.getCollisionRect();
                            //rect.move(-map.getPosition());
                            var hits = map.hitBy(rect, this.COLLIDE_WITH_BULLETS);
                            if (hits > 0) {
                                actor.onCollisionWithMap(map, hits);
                            }
                        }
                        break;
                }
            }
        }
    }

    //-------------------------------------------------------------

    public removeDeadActors(): void {
        var temp_actor_list = [];
        for (var i = this.m_actor_list.length - 1; i >= 0; i--) {
            if (this.m_actor_list[i].isActive()) {
                temp_actor_list.push(this.m_actor_list[i]);
            }
        }
        this.m_actor_list = [];
        this.m_actor_list = temp_actor_list;
    }

    //-------------------------------------------------------------

    public killAllActors(): void {
        var i;

        for (i = 0; i < this.m_actor_list.length; i++) {
            this.m_actor_list[i].kill();
        }

        for (i = 0; i < this.m_actor_list.length; i++) {
            delete this.m_actor_list[i];
        }

        this.m_actor_list = [];
    }

    //-------------------------------------------------------------

    public destroyAll() {
        var i;

        //for (i = 0; i < m_actor_list.getSize(); i++)
        //    delete m_actor_list[i];

        //m_actor_list.clear();

        //for (i = 0; i < m_image_list.getSize(); i++) {
        //    m_image_list[i]->m_image.destroy();
        //    delete m_image_list[i];
        //    }

        //m_image_list.clear();
    }

    //-------------------------------------------------------------

    public findShip() {
        for (var i = 0; i < this.m_actor_list.length; i++) {
            if (this.m_actor_list[i].getActorInfo().m_type == enums.ActorType.ACTOR_TYPE_SHIP) {
                return <CShip>this.m_actor_list[i];
            }
        }
        return null;
    }

    //-------------------------------------------------------------

    //public createLabel(position: gsCVector, text: string): void {
    //    //CLabel label = new CLabel;
    //    //addActor(label);

    //    //label.activate();
    //    //label.setText(text);
    //    //label.setPosition(position);
    //    //label.setVelocity(new Vector2(0.0f, -1.25f));
    //    //label.setTime(0.5);
    //}

    //-------------------------------------------------------------

    public createLabel(position: gsCVector, num: number): void {
        //    var label:CLabel = new CLabel;
        //    addActor(label);
        //    label->activate();
        //    label->setText("%i",num);
        //    label->setPosition(position);
        //    label->setVelocity(gsCVector(0.f,-1.25f));
        //    label->setTime(0.5);
    }

    //-------------------------------------------------------------

    public createMapExplosion(map: gsCMap, position: gsCPoint) {
        var exp: CSmallExplosion = new CSmallExplosion();
        this.addActor(exp);

        var tile_size: gsCPoint = map.getImage().getTileSize();
        var tile_centre: gsCPoint = new gsCPoint(tile_size.X / 2, tile_size.Y / 2);

        var pos: gsCPoint = new gsCPoint(position.X * tile_size.X + tile_centre.X, position.Y * tile_size.Y + tile_centre.Y);
        exp.setPosition(new gsCVector(pos.X, pos.Y));
        exp.activate();
    }

    //-------------------------------------------------------------

    public getActor(index: number): CActor {
        return this.m_actor_list[index];
    }

    //-------------------------------------------------------------

    public findNearestActor(type: enums.ActorType, position: gsCVector, dir: number): CActor {
        var nearest_actor: CActor = null;
        var nearest_distance: number = 99999.0;

        for (var i = 0; i < this.m_actor_list.length; i++) {
            var actor: CActor = this.m_actor_list[i];
            if (actor.isActive() &&
                actor.getActorInfo().m_type == type) {
                if (dir != 0) {
                    var sy: number = position.Y;
                    var ay: number = actor.getPosition().Y;
                    if (dir < 0 && sy < ay)
                        continue;
                    if (dir > 0 && sy > ay)
                        continue;
                }
                var d: number = 0;//(actor.getPosition() - position).length();
                if (nearest_actor == null ||
                    d < nearest_distance) {
                    nearest_actor = actor;
                    nearest_distance = d;
                }
            }
        }

        return nearest_actor;
    }

    //-------------------------------------------------------------

    clearCheckpoint() {
        this.m_checkpoint_active = false;
    }

    //-------------------------------------------------------------

    setNextCheckpoint(position: gsCVector) {
        this.m_checkpoint = position;
        this.m_checkpoint_active = true;
    }

    //-------------------------------------------------------------

    hasCheckpoint() {
        return this.m_checkpoint_active;
    }

    //-------------------------------------------------------------

    getCheckpoint() {
        return this.m_checkpoint;
    }

    //-------------------------------------------------------------

    public getNumberOfActors() {
        return this.m_actor_list.length;
    }

    //-------------------------------------------------------------

    public addActor(actor: CActor) {
        actor.setScene(this);
        this.m_actor_list.push(actor);
        //console.log("Actor List Size : " + this.m_actor_list.length);
    }

    //-------------------------------------------------------------

    public removeActor(actor: CActor) {
        actor.setScene(null);
        //this.m_actor_list.removeItem(actor);
    }

    //-------------------------------------------------------------

    public getNumberOfImages() {
        return 0;//this.m_image_list.length;
    }

    //-------------------------------------------------------------

    public setCollisionListSize(pixel_size: gsCPoint, zones: gsCPoint) {
        //this.m_collision_list.setSize(pixel_size, zones);
    }

    //-------------------------------------------------------------

    public setMap(map: gsCMap) {
        this.m_map = map;
    }

    //-------------------------------------------------------------

    public getMap() {
        return this.m_map;
    }

    //-------------------------------------------------------------

    public getMapFrontLayer() {
        return this.lev.getMapFrontLayer();
    }

    //-------------------------------------------------------------

    public getMapBackLayer() {
        return this.lev.getMapBackLayer();
    }

    //-------------------------------------------------------------

    public setWarp(state: boolean) {
        this.m_is_warping = state;
    }

    //-------------------------------------------------------------

    //bool isWarping() { return m_is_warping; };

    public GetLevel() {
        return this.lev;
    }

    //-------------------------------------------------------------

    public GetlistOfActors() {
        return this.m_listOfActors;
    }

    //-------------------------------------------------------------

    public LevelLoaded() {
        return this.lev.LoadingComplete;
    }
    //-------------------------------------------------------------

}

export = CScene;