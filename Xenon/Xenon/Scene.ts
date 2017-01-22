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
import Point = require("Point");

class CScene {

    m_textures: Array<HTMLImageElement>;
    private m_listOfActors: CActorInfoList;

    //gsCList<CActor *> m_actor_list;
    //gsCList<ImageEntry *> m_image_list;
    //gsCCollisionList m_collision_list;
    //List<gsCCollisionList> m_collision_list = new List<gsCCollisionList>();
    m_frame_count: number;
    m_map: gsCMap;
    m_screen: gsCScreen;
    COLLIDE_WITH_SHIP: number = 1;
    lev: CLevel;
    m_checkpoint_active: boolean;
    m_checkpoint: gsCVector;
    m_is_warping: boolean;
    //void updateActorsOfType(ActorType type,Controls *controls);
    //void drawActorsOfType(ActorType type,int total);
    //static void actorCollisionCallback(void *object1,void *object2);
    m_ship_is_cloaked: boolean;
    m_actor_list: CActor[];
    m_even: boolean = false;
    time: number = 0;
    //temp!
    m_font: HTMLImageElement;

    constructor(image: HTMLImageElement, textures: Array<HTMLImageElement>, listOfActors: CActorInfoList) {
        this.m_textures = textures;
        //m_font = font;
        this.m_listOfActors = listOfActors;
        this.m_frame_count = 0;
        ////m_map = 0;
        this.m_checkpoint_active = false;
        this.m_is_warping = false;
        this.m_actor_list = [];
        //m_collision_list = new gsCCollisionList();
        //m_screen = new gsCScreen();
        //lev = new CLevel(image, font);
        //lev.load("");
    }

    //-------------------------------------------------------------

    getImage(filename: string) {
        if (filename == "") {
            return null;
        }

        for (var i = 0; i < this.m_textures.length; i++) {
            if (this.m_textures[i] != null) {
                var name = this.m_textures[i].id;
                var temp = name.split(".")
                if (temp[0].toLowerCase() == filename.toLowerCase()) {
                    // gsCTiledImage tile = new gsCTiledImage(name.Value, m_font);
                    var tile: gsCTiledImage = new gsCTiledImage(this.m_textures[i]);
                    tile.setTileSize(new Point(this.m_listOfActors.GetTileWidth(i), this.m_listOfActors.GetTileHeight(i)));
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

    addToCollisionList(actor: CActor, rect: gsCRectangle) {
        //switch (actor.getActorInfo().m_type) {
        //    case ActorType.ACTOR_TYPE_SHIP:
        //        if (m_ship_is_cloaked)
        //            break;
        //        m_collision_list.addObject(actor,
        //            rect,
        //                                          (1 << (int) ActorType.ACTOR_TYPE_SHIP),
        //                                          (1 << (int)ActorType.ACTOR_TYPE_PICKUP) | (1 << (int)ActorType.ACTOR_TYPE_ALIEN));
        //        break;
        //    case ActorType.ACTOR_TYPE_UPGRADE:
        //        if (m_ship_is_cloaked)
        //            break;
        //        m_collision_list.addObject(actor,
        //            rect,
        //                                          (1 << (int) ActorType.ACTOR_TYPE_UPGRADE),
        //                                          (1 << (int)ActorType.ACTOR_TYPE_PICKUP) | (1 << (int)ActorType.ACTOR_TYPE_ALIEN));
        //        break;
        //    case ActorType.ACTOR_TYPE_BULLET:
        //        m_collision_list.addObject(actor,
        //            rect,
        //                                          (1 << (int) ActorType.ACTOR_TYPE_BULLET),
        //                                          (1 << (int)ActorType.ACTOR_TYPE_ALIEN) | (1 << (int)ActorType.ACTOR_TYPE_ALIENBULLET));
        //        break;
        //    case ActorType.ACTOR_TYPE_ALIENBULLET:
        //        m_collision_list.addObject(actor,
        //            rect,
        //                                          (1 << (int) ActorType.ACTOR_TYPE_ALIENBULLET),
        //                                          (1 << (int)ActorType.ACTOR_TYPE_SHIP));
        //        break;
        //    case ActorType.ACTOR_TYPE_ALIEN:
        //        m_collision_list.addObject(actor,
        //            rect,
        //                                          (1 << (int) ActorType.ACTOR_TYPE_ALIEN),
        //                                          0);
        //        break;
        //    case ActorType.ACTOR_TYPE_PICKUP:
        //        m_collision_list.addObject(actor,
        //            rect,
        //                                          (1 << (int) ActorType.ACTOR_TYPE_PICKUP),
        //                                          0);
        //        break;
        //    case ActorType.ACTOR_TYPE_WEAPON:
        //    case ActorType.ACTOR_TYPE_ENGINE:
        //    case ActorType.ACTOR_TYPE_LABEL:
        //    case ActorType.ACTOR_TYPE_EFFECT:
        //        // no collision detection
        //        break;
        //}
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
        this.m_frame_count++;
        //m_collision_list.clear();
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
            //        this.drawActorsOfType(ActorType.ACTOR_TYPE_EFFECT, total, ctx);
            //        this.drawActorsOfType(ActorType.ACTOR_TYPE_PICKUP, total, ctx);
            //        this.drawActorsOfType(ActorType.ACTOR_TYPE_ALIEN, total, ctx);//
            //        this.drawActorsOfType(ActorType.ACTOR_TYPE_ALIENBULLET, total, ctx);
            this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_BULLET, total, ctx);
            this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_ENGINE, total, ctx);
            this.drawActorsOfType(enums.ActorType.ACTOR_TYPE_SHIP, total, ctx);//
            //this.drawActorsOfType(ActorType.ACTOR_TYPE_UPGRADE, total, ctx);
            // this.drawActorsOfType(ActorType.ACTOR_TYPE_WEAPON, total, ctx);
            //        this.drawActorsOfType(ActorType.ACTOR_TYPE_LABEL, total, ctx);
        }
    }
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

    actorCollisionCallback(object1: Object, object2: Object) {
        //gsASSERT(object1);
        //gsASSERT(object2);

        //CActor *actor1 = (CActor *) object1;
        //CActor *actor2 = (CActor *) object2;

        //if (!actor1->isActive() ||
        //    !actor2->isActive())
        //    return;

        //actor1->onCollisionWithActor(actor2);
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

    public checkActorCollisions() {
        ////           m_collision_list.scan();//actorCollisionCallback);

        //           for (var i = 0; i < m_actor_list.Count; i++)
        //           {
        //       if (m_actor_list[i].isActive()) {
        //           m_actor_list[i].postProcessCollision();
        //       }
        //   }
    }

    //-------------------------------------------------------------

    checkMapCollisions(map: gsCMap) {
        //        // check for collisions between actors and map

        //        for (int i = 0; i < m_actor_list.Count; i++)
        //        {
        //            CActor actor = m_actor_list[i];
        //    if (actor.isActive()) {
        //        switch (actor.getActorInfo().m_type) {
        //            case ActorType.ACTOR_TYPE_SHIP:
        //            case ActorType.ACTOR_TYPE_UPGRADE:
        //                if (m_ship_is_cloaked)
        //                    break;
        //                {
        //                            Rectangle rect = actor.getCollisionRect();
        //                    //rect.move(-map.getPosition());
        //                    //int hits = map.hitBy(rect, COLLIDE_WITH_SHIP);
        //                    //if (hits > 0)
        //                    //{
        //                    //    actor.onCollisionWithMap(map, hits);
        //                    //}
        //                }
        //                break;

        //            case ActorType.ACTOR_TYPE_BULLET:
        //            case ActorType.ACTOR_TYPE_ALIENBULLET:
        //                {
        //                            Rectangle rect = actor.getCollisionRect();
        //                    //rect.move(-map.getPosition());
        //                    //int hits = map.hitBy(rect, COLLIDE_WITH_BULLETS);
        //                    //if (hits > 0)
        //                    //{
        //                    //    actor.onCollisionWithMap(map, hits);
        //                    //}
        //                }
        //                break;
        //        }
        //    }
        //}
    }

    //-------------------------------------------------------------

    //public void removeDeadActors()
    //{
    //    for (int i = m_actor_list.getSize() - 1; i >= 0; i--) {
    //        if (!m_actor_list[i]->isActive()) {
    //            delete m_actor_list[i];
    //            m_actor_list.removeIndex(i);
    //            }
    //        }
    //}

    //-------------------------------------------------------------

    public killAllActors() {
        var i;

        //for (i = 0; i < m_actor_list.getSize(); i++)
        //    m_actor_list[i]->kill();

        //for (i = 0; i < m_actor_list.getSize(); i++)
        //    delete m_actor_list[i];

        //m_actor_list.clear();
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
        //        for (var i = 0; i < m_actor_list.Count; i++)
        //        {
        //    if (m_actor_list[i].getActorInfo().m_type == ActorType.ACTOR_TYPE_SHIP) {
        //                return (CShip) m_actor_list[i];
        //    }
        //}
        return null;
    }

    //-------------------------------------------------------------

    //public void createLabel(Vector2 position, char text)
    //{
    //    //CLabel label = new CLabel;
    //    //addActor(label);

    //    //label.activate();
    //    //label.setText(text);
    //    //label.setPosition(position);
    //    //label.setVelocity(new Vector2(0.0f, -1.25f));
    //    //label.setTime(0.5);
    //}

    //-------------------------------------------------------------

    //void createLabel(const gsCVector& position,int number)
    //{
    //    CLabel *label = new CLabel;
    //    addActor(label);

    //    label->activate();
    //    label->setText("%i",number);
    //    label->setPosition(position);
    //    label->setVelocity(gsCVector(0.f,-1.25f));
    //    label->setTime(0.5);
    //}

    //-------------------------------------------------------------

    //    public createMapExplosion(gsCMap map, Point position)
    //    {
    //        CSmallExplosion exp = new CSmallExplosion();
    //addActor(exp);

    //        Point tile_size = map.getImage().getTileSize();
    //        //Point tile_centre = tile_size / new Point(2,2);
    //        Point tile_centre = new Point(tile_size.X / 2, tile_size.Y / 2);

    //        //Point pos = position * tile_size + tile_centre;
    //        Point pos = new Point(position.X * tile_size.X + tile_centre.X, position.Y * tile_size.Y + tile_centre.Y);
    //exp.setPosition(new Vector2((float) pos.X, (float) pos.Y));
    //exp.activate();
    //    }

    //-------------------------------------------------------------

    //        public CActor getActor(int index)
    //        {
    //    return m_actor_list[index];
    //}

    //-------------------------------------------------------------

    //CActor *findNearestActor(ActorType type,const gsCVector& position,int dir)
    //{
    //    CActor *nearest_actor = 0;
    //    float nearest_distance = 99999.f;

    //    for (int i = 0; i < m_actor_list.getSize(); i++) {
    //        CActor *actor = m_actor_list[i];
    //        if (actor->isActive() &&
    //            actor->getActorInfo().m_type == type) {
    //            if (dir != 0) {
    //                float sy = position.getY();
    //                float ay = actor->getPosition().getY();
    //                if (dir < 0 && sy < ay)
    //                    continue;
    //                if (dir > 0 && sy > ay)
    //                    continue;
    //                }
    //            float d = (actor->getPosition() - position).length();
    //            if (nearest_actor == 0 ||
    //                d < nearest_distance) {
    //                nearest_actor = actor;
    //                nearest_distance = d;
    //                }
    //            }
    //        }

    //    return nearest_actor;
    //}

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
    }

    //-------------------------------------------------------------

    public removeActor(actor: CActor) {
        actor.setScene(null);
        //m_actor_list.removeItem(actor);
    }

    //-------------------------------------------------------------

    getNumberOfImages() {
        return 0;//m_image_list.getSize();
    }

    //-------------------------------------------------------------

    //public setCollisionListSize(Point pixel_size, Point zones)
    public setCollisionListSize(pixel_size: gsCVector, zones: gsCVector) {
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

    public GetlistOfActors() {
        return this.m_listOfActors;
    }
}

export = CScene;