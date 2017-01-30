import CScene = require("Scene");
import CStarfield = require("Starfield");
import CActorInfoList = require("ActorInfoList");
import CGameState = require("GameState");
import CShip = require("Ship");
import gsCPoint = require("Point");
import gsCTimer = require("Timer");
import gsCVector = require("Vector");
import CLevel = require("Level");
import enums = require("Enums");

class CPlayGameState extends CGameState { 
    private m_ship: CShip;
    private m_scene: CScene;
    private m_starfield: CStarfield;
    private m_level: CLevel;

    private PLAYER_START_OFFSET: number = 64;
    private m_yscroll: number = 1;
    private m_even: number = 0;

    private m_fast_forward: boolean = false;
    private m_reached_boss: boolean = false;
    private m_paused:boolean = false;

    private even: boolean = true;		//TEMP

    constructor(ship: CShip, scene: CScene, starfield: CStarfield) {
        super();

        //this.m_level = new CLevel();

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

    update(ctx: CanvasRenderingContext2D):boolean {

        /*
	if (!CGameState::update())
		return false;

	gsKeyCode key = m_keyboard.getKey();

	if (m_paused) {
		if (key == gsKEY_P) {
			m_paused = false;
			gsCApplication::setPaused(false);
			}
		else
			return true;
		}
	else {
		if (key == gsKEY_P) {
			m_paused = true;
			gsCApplication::setPaused(true);
			return true;
			}
		}

	if (m_mode == CREATEPLAYER) {
		playMusic(MUSIC_GAME);
		createPlayer();
		m_game_start_timer.start();
		m_mode = PLAYERACTIVE;
		}

	Controls controls;

	getControl(controls,m_active_player);

	if (m_ship) {
		if (controls.divePressed) {
			if (getPlayer()->hasDive()) {
				m_ship->dive(3.f);
				getPlayer()->useDive();
				}
			}

		if (controls.reversePressed)
			m_ship->reverseWeapon();

		// disable firing when diving

		if (m_ship->getDiveLevel() > 0) {
			controls.fire = false;
			controls.firePressed = false;
			}
		}

	switch (m_demo_mode) {
		case DEMO_RECORD:
			m_demo_recorder.addEvent(controls);
			break;
		case DEMO_PLAYBACK:
			if (!m_demo_recorder.getEvent(controls))
				return changeState(CMainMenuState::instance());
			break;
		}

	if (Options.getOption(OPTION_BACKDROP))
		m_backdrop.draw(gsCPoint(0,0));
	else
		m_screen.clear(gsCColour(gsBLACK));
        */




        var loop: number = 1;

        if (this.m_fast_forward) {
            loop = 16;
        }

        while (loop-- > 0) {

            //            m_starfield.move(4);
            //            m_starfield.draw();

            //            if (m_mode == PLAYERACTIVE)
            //                m_level.scanForNewActors(&m_scene);

            //		static bool even = true;		//TEMP

            this.even = !this.even;

            if (this.even && !this.m_reached_boss) {
                this.m_level.m_back_layer.move(new gsCPoint(0, 1));
            }

            if (this.m_level.m_back_layer.getPosition().Y > 0) {
                this.m_level.m_back_layer.setPosition(new gsCPoint(0, 0));
            }

            if (!this.m_reached_boss) {
                //if (CBossControl::isStarted()) {
               // this.m_reached_boss = true;
                //playMusic(MUSIC_BOSS);
                //}
            }

            //if (CBossControl::isStarted())
            //m_yscroll = CBossControl::getYScroll();
            //		else
            //m_yscroll = 1;

            //// Helps to activate sprite animation!!
            this.m_level.m_front_layer.move(new gsCPoint(0, this.m_yscroll));

            if (this.m_level.m_front_layer.getPosition().Y > 0) {
                this.m_level.m_front_layer.setPosition(new gsCPoint(0, 0));
            }

            var sprite_hits: number = 0;
            var map_hits: number = 0;

            ////#ifdef _PROFILING
            ////	controls.firePressed = controls.fire = true;
            ////#endif

            //this.m_scene.updateAllActors(controls);
            this.m_level.m_back_layer.drawMap(ctx);
            this.m_scene.drawAllActors(ctx, this.m_level.m_front_layer);
            //this.m_scene.checkActorCollisions();
            //this.m_scene.checkMapCollisions(m_level.m_front_layer);
            //this.m_scene.removeDeadActors();
          }

            //testDebugKeys(key);

            //if (key == gsKEY_ESCAPE || (key != gsKEY_NONE && m_demo_mode == DEMO_PLAYBACK)) {
            //    setDemoMode(DEMO_OFF);

            //    #ifdef _PROFILING
            //    return false;
            //    #else
            //    return changeState(CMainMenuState::instance());
            //    #endif
            //}

            //displayScores();
            //displayLives();
            //displayEnergyBar();

            //if (m_reached_boss)
            //    displayBossEnergyBar();

            //printDebugInfo();

            //if (m_demo_mode == DEMO_PLAYBACK) {
            //    m_medium_font.setTextCursor(gsCPoint(0, 100));
            //    m_medium_font.justifyString("DEMONSTRATION");
            //}

            //switch (m_mode) {
            //    case PLAYERACTIVE:
            //        if (m_game_start_timer.getState() == gsTIMER_ACTIVE) {
            //            if (m_game_start_timer.getTime() < 1.f) {
            //                m_medium_font.setTextCursor(gsCPoint(0, 232));
            //                if (m_number_of_players == 1)
            //                    m_medium_font.justifyString("Get Ready");
            //                else {
            //                    if (m_active_player == 0)
            //                        m_medium_font.justifyString("Player One");
            //                    else
            //                        m_medium_font.justifyString("Player Two");
            //                }
            //            }
            //				else
            //            m_game_start_timer.reset();
            //        }

            //        if (m_ship ->getShield() == 0) {
            //            m_game_end_timer.start();
            //            playSample(SAMPLE_PLAYER_DESTROYED, m_ship ->getPosition().getX());
            //            m_ship ->explode();
            //            m_ship ->kill();
            //            m_scene.removeDeadActors();
            //            m_ship = 0;
            //            m_mode = PLAYERDEAD;
            //            break;
            //        }

            //        if (m_reached_boss && CBoss::getShield() == 0) {
            //            playMusic(MUSIC_OUTRO);
            //            m_game_end_timer.start();
            //            m_mode = GAMEWON;
            //            break;
            //        }

            //        if (m_scene.hasCheckpoint()) {
            //            if (m_ship ->getPosition().getY() <= m_scene.getCheckpoint().getY()) {
            //                if (getPlayer() ->getCheckpoint() != m_scene.getCheckpoint()) {
            //                    getPlayer() ->setCheckpoint(m_scene.getCheckpoint());
            //                    m_scene.createLabel(m_scene.getCheckpoint(), "CHECKPOINT REACHED");
            //                    playSample(SAMPLE_CHECKPOINT);
            //                }
            //                m_scene.clearCheckpoint();
            //            }
            //        }

            //        break;

            //    case PLAYERDEAD:

            //        stopMusic();

            //        m_fast_forward = false;

            //        if (m_game_end_timer.getTime() >= 1.f) {
            //            if (m_demo_mode != DEMO_OFF) {
            //                setDemoMode(DEMO_OFF);
            //                return changeState(CMainMenuState::instance());
            //            }

            //            swapPlayer();
            //            if (getPlayer() ->getLives() > 0)
            //                m_mode = CREATEPLAYER;
            //            else
            //                m_mode = GAMEOVER;
            //        }
            //        break;

            //    case GAMEOVER:
            //        m_medium_font.setTextCursor(gsCPoint(0, 232));
            //        m_medium_font.justifyString("Game Over");
            //        if (m_game_end_timer.getTime() >= 3.f) {
            //            stopSamples();

            //            #ifdef _PROFILING
            //            return false;
            //            #endif

            //            if (addNewScore(getPlayer() ->getScore()))
            //                return changeState(CScoreEntryState::instance());
            //            else
            //                return changeState(CViewScoresState::instance());
            //        }
            //        break;

            //    case GAMEWON:

            //        if (m_game_end_timer.getTime() >= 3.f) {
            //            m_medium_font.setTextCursor(gsCPoint(0, 232));
            //            m_medium_font.justifyString("Congratulations");
            //        }

            //        if (m_game_end_timer.getTime() >= 6.f) {
            //            stopSamples();

            //            if (addNewScore(getPlayer() ->getScore()))
            //                return changeState(CScoreEntryState::instance());
            //            else
            //                return changeState(CViewScoresState::instance());
            //        }
            //        break;
            //}

            //m_screen.flip();

            //if (m_sound_system.isMusicFinished() && m_mode != GAMEWON) {
            //    if (m_reached_boss)
            //        playMusic(MUSIC_BOSS);
            //    else
            //        playMusic(MUSIC_GAME);
        //}

        return true;














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
        var mh: number = this.m_level.getMapBackLayer().getSizeInPixels().Y;

        var by: number = -(mh - (mh - ship_y) / 2 + this.PLAYER_START_OFFSET / 2 - 480);//m_screen.getSize().getY());

        ////m_back_layer.setPosition(new Point(0, by));
        this.m_level.getMapBackLayer().setPosition(new gsCPoint(0, by));

        var fy: number = -(ship_y + this.PLAYER_START_OFFSET - 480);// m_screen.getSize().getY());

        ////m_front_layer.setPosition(new Point(0, fy));
        this.m_level.getMapFrontLayer().setPosition(new gsCPoint(0, fy));
    }
}

export = CPlayGameState;