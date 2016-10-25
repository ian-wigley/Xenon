import CScene = require("Scene");
import CStarfield = require("Starfield");
import CActorInfoList = require("ActorInfoList");
import CShip = require("Ship");
import gsCTimer = require("Timer");
import gsCVector = require("Vector");
import CLevel = require("Level");
import enums = require("Enums");

class CPlayGameState// : CGameState
{
    private m_ship: CShip;
    private m_scene: CScene;
    private m_starfield: CStarfield;
    private m_level: CLevel;

    private PLAYER_START_OFFSET: number = 64;
    private m_yscroll: number;
    private m_even: number = 0;

    //public CPlayGameState(CShip ship, CScene scene, CStarfield starfield)
    constructor(ship: CShip, scene: CScene, starfield: CStarfield) {
        //this.m_ship = ship;
        this.m_scene = scene;
        this.m_level = this.m_scene.GetLevel();

        // temp!
        this.createPlayer();
    }


    createPlayer() {

        var temp = new gsCTimer();
        ////    m_scene.killAllActors();
        //// m_scene.setCollisionListSize(m_screen.getSize(), new Point(8, 6));
        //this.m_scene.setCollisionListSize(new Point(640, 480), new Point(8, 6));
        this.m_scene.setCollisionListSize(new gsCVector(640, 480), new gsCVector(8, 6));
        this.m_ship = new CShip(this.m_scene, temp);
        this.m_scene.addActor(this.m_ship);
        this.m_ship.activateShip();

        var start_position: gsCVector = new gsCVector(300, 100);// getPlayer().getCheckpoint();
        this.m_ship.setPosition(start_position);
        ////    m_scene.clearCheckpoint();
        this.setLayerPositions(32704);//start_position.getY());
        //        this.m_level.reset();
        this.m_ship.setWeapon(enums.WeaponType.MISSILE_WEAPON, enums.WeaponGrade.WEAPON_STANDARD);

        ////#ifdef _PROFILING
        ////    m_ship->attachClone();
        ////    m_ship->attachClone();
        ////    m_ship->attachWingtip();
        ////    m_ship->attachWingtip();
        ////    m_ship->setWeapon(MISSILE_WEAPON,WEAPON_BEST);
        ////    m_ship->addWeapon(HOMING_MISSILE_WEAPON);
        ////    m_ship->addWeapon(HOMING_MISSILE_WEAPON);
        ////    m_ship->addWeapon(LASER_WEAPON);
        ////    m_ship->addWeapon(LASER_WEAPON);
        ////#endif
        ////    playSample(SAMPLE_PLAYER_CREATED,m_ship->getPosition().getX());
        ////    getPlayer()->loseLife();
        ////    m_reached_boss = false;        
    }

    update() {
        //////if (!CGameState::update())
        //////    return false;

        //////gsKeyCode key = m_keyboard.getKey();

        //////if (key == gsKEY_ESCAPE)
        //////    return false;

        ////if ((int)m_mode.CREATEPLAYER == 1)
        ////{
        ////    createPlayer();
        ////    //(int)m_mode.PLAYERACTIVE = 1;
        ////}

        //////Controls controls;

        //////getControl(controls,0);

        //////m_screen.clear(gsCColour(gsBLACK));

        ////m_starfield.Update(4);
        //////	m_starfield.draw();

        ////if ((int)m_mode.CREATEPLAYER == 1)
        //{
        //    this.m_level.scanForNewActors(this.m_scene);
        //}

        //////static bool even = true;		//TEMP
        //////even = !even;

        ////if (m_even == 1)
        ////{
        ////    //		m_level.m_back_layer.move(new Point(0,1));
        ////    m_level.getMapBackLayer().move(new Point(0, 1));
        ////    m_even = -1;
        ////}
        ////m_even += 1;

        //////	if (m_level.m_back_layer.getPosition().getY() > 0)
        ////if (m_level.getMapBackLayer().getPosition().Y > 0)
        ////{
        ////    //		m_level.m_back_layer.setPosition(new Point(0,0));
        ////    m_level.getMapBackLayer().setPosition(new Point(0, 0));
        ////}

        //////	m_level.m_front_layer.move(new Point(0,m_yscroll));
        ////m_level.getMapFrontLayer().move(new Point(0, m_yscroll));

        //////	if (m_level.m_front_layer.getPosition().getY() > 0)
        ////if (m_level.getMapFrontLayer().getPosition().Y > 0)
        ////{
        ////    return false;
        ////}

        //////m_scene.updateAllActors(controls);
        //////m_level.m_back_layer.draw();
        //////m_scene.drawAllActors(m_level.m_front_layer);
        //this.m_scene.checkActorCollisions();
        //////m_scene.checkMapCollisions(m_level.m_front_layer);
        //////m_scene.removeDeadActors();

        //////m_small_font.setTextCursor(gsCPoint(2,2));
        //////m_small_font.printString("Cursor Keys  - move");
        //////m_small_font.setTextCursor(gsCPoint(2,12));
        //////m_small_font.printString("Left Control - fire");
        //////m_small_font.setTextCursor(gsCPoint(2,24));
        //////m_small_font.printString("Escape       - exit");

        //////m_screen.flip();
        //return true;
    }

    setLayerPositions(ship_y: number) {
        ////int mh = m_back_layer.getSizeInPixels().Y;//.getY();
        //var mh: number = this.m_level.getMapBackLayer().getSizeInPixels().Y;

        //var by: number = -(mh - (mh - ship_y) / 2 + this.PLAYER_START_OFFSET / 2 - 480);//m_screen.getSize().getY());

        ////m_back_layer.setPosition(new Point(0, by));
        //this.m_level.getMapBackLayer().setPosition(new Point(0, by));

        //var fy: number = -(ship_y + this.PLAYER_START_OFFSET - 480);// m_screen.getSize().getY());

        ////m_front_layer.setPosition(new Point(0, fy));
        //this.m_level.getMapFrontLayer().setPosition(new Point(0, fy));
    }
}

export = CPlayGameState;