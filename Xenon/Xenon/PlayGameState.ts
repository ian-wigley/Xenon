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
import CPlayer = require("Player");
import gsCImage = require("Image");
import gsCRectangle = require("Rectangle");
import gsCScreen = require("Screen");
import gsCScoreTable = require("ScoreTable");

enum m_mode {
    CREATEPLAYER,
    PLAYERACTIVE,
    PLAYERDEAD,
    GAMEOVER,
    GAMEWON,
}

class CPlayGameState extends CGameState {
    private m_ship: CShip;

    private m_starfield: CStarfield;
    private m_level: CLevel;
    private m_screen: gsCScreen;

    private PLAYER_START_OFFSET: number = 64;
    private ENERGYBAR_WIDTH: number = 100;		// energy bar dimensions
    private ENERGYBAR_HEIGHT: number = 9;
    private ENERGYBAR_STEP: number = 5;			// marker spacing

    //gsCList<CPlayer *> CPlayGameState::m_player_list;
    private m_player_list: Array<CPlayer> = new Array<CPlayer>();
    private m_active_player: number = 0;
    private m_fast_forward: boolean = false;
    private m_reached_boss: boolean = false;
    private m_paused: boolean = false;
    private m_yscroll: number = 1;


    //private m_even: number = 0;
    private even: boolean = true;		//TEMP


    constructor(ship: CShip, scene: CScene, starfield: CStarfield, m_font8x8: HTMLImageElement, m_font16x16: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        super(m_font8x8, m_font16x16, ctx);

        //this.m_level = new CLevel();

        //this.m_ship = ship;
        this.m_scene = scene;
        this.m_level = this.m_scene.GetLevel();

        // temp!
        this.m_screen = new gsCScreen();
        //this.m_score_table = new gsCScoreTable();
        this.create();
        this.createPlayer();
    }


    //-------------------------------------------------------------

    public create(): boolean {
        //if (m_screen.getBytesPerPixel() == 1) {
        //    if (!m_level.load(m_level_filename, DIRECTORY_GRAPHICS8)) {
        //        gsREPORT("load level failed");
        //        return false;
        //    }
        //}
        //else {
        //    if (!m_level.load(m_level_filename, DIRECTORY_GRAPHICS24)) {
        //        gsREPORT("load level failed");
        //        return false;
        //    }
        //}

        //this.m_scene.setMap(this.m_level.m_front_layer);
        //this.m_scene.setCollisionListSize(this.m_screen.getSize(), gsCPoint(8, 6));

        //this.m_ship = null;

        //this.m_game_end_timer.reset();

        //gsCPoint map_size = m_level.m_front_layer.getSizeInPixels();
        //gsCVector start_position = gsCVector((float) map_size.getX() / 2.f,
        //    (float)(map_size.getY() - PLAYER_START_OFFSET));

        for (var i = 0; i < this.m_number_of_players; i++) {
            var player: CPlayer = new CPlayer();
            //    player ->setCheckpoint(start_position);
            //m_player_list.addItem(player);
            this.m_player_list.push(player);
        }

        //m_active_player = null;

        //m_mode = CREATEPLAYER;

        //if (m_demo_mode == DEMO_RECORD)
        //    m_demo_recorder.setLevel(m_level_filename);

        //this.m_fast_forward = false;

        return true;
    }

    //-------------------------------------------------------------

    public setLayerPositions(ship_y: number) {
        var mh: number = this.m_level.getMapBackLayer().getSizeInPixels().Y;
        var by: number = -(mh - (mh - ship_y) / 2 + this.PLAYER_START_OFFSET / 2 - 480);//m_screen.getSize().getY());

        ////this.m_back_layer.setPosition(new Point(0, by));
        this.m_level.getMapBackLayer().setPosition(new gsCVector(0, by));
        var fy: number = -(ship_y + this.PLAYER_START_OFFSET - 480);// m_screen.getSize().getY());
        //this.m_front_layer.setPosition(new Point(0, fy));
        this.m_level.getMapFrontLayer().setPosition(new gsCVector(0, fy));
    }

    //-------------------------------------------------------------

    public createPlayer() {

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
        this.m_level.reset();
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

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D): boolean {

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

            if (m_mode.PLAYERACTIVE == 1) {
                this.m_level.scanForNewActors(this.m_scene);
            }

            //		static bool even = true;		//TEMP
            this.even = !this.even;

            if (this.even && !this.m_reached_boss) {
                this.m_level.m_back_layer.move(new gsCPoint(0, 1));
            }

            if (this.m_level.m_back_layer.getPosition().Y > 0) {
                this.m_level.m_back_layer.setPosition(new gsCVector(0, 0));
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
                this.m_level.m_front_layer.setPosition(new gsCVector(0, 0));
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

        this.displayScores(ctx);
        this.displayLives(ctx);
        this.displayEnergyBar(ctx);

        if (this.m_reached_boss) {
            this.displayBossEnergyBar(ctx);
        }

        //printDebugInfo();

        //if (m_demo_mode == DEMO_PLAYBACK) {
        //    m_medium_font.setTextCursor(gsCPoint(0, 100));
        //    m_medium_font.justifyString("DEMONSTRATION");
        //}

        //switch (m_mode) {
        if (m_mode.PLAYERACTIVE == 1) {
            //case m_mode.PLAYERACTIVE:
            //    if (m_game_start_timer.getState() == gsTIMER_ACTIVE) {
            //        if (m_game_start_timer.getTime() < 1.0) {
            //            m_medium_font.setTextCursor(gsCPoint(0, 232));
            //            if (m_number_of_players == 1)
            //                m_medium_font.justifyString("Get Ready");
            //            else {
            //                if (m_active_player == 0)
            //                    m_medium_font.justifyString("Player One");
            //                else
            //                    m_medium_font.justifyString("Player Two");
            //            }
            //        }
        				//else
            //        m_game_start_timer.reset();
            //    }

            //    if (m_ship ->getShield() == 0) {
            //        m_game_end_timer.start();
            //        playSample(SAMPLE_PLAYER_DESTROYED, m_ship ->getPosition().getX());
            //        m_ship ->explode();
            //        m_ship ->kill();
            //        m_scene.removeDeadActors();
            //        m_ship = 0;
            //        m_mode = PLAYERDEAD;
            //        break;
            //    }

            //if (m_reached_boss && CBoss::getShield() == 0) {
            //    playMusic(MUSIC_OUTRO);
            //    m_game_end_timer.start();
            //    m_mode = GAMEWON;
            //    break;
            //}

            //if (m_scene.hasCheckpoint()) {
            //    if (m_ship ->getPosition().getY() <= m_scene.getCheckpoint().getY()) {
            //        if (getPlayer() ->getCheckpoint() != m_scene.getCheckpoint()) {
            //            getPlayer() ->setCheckpoint(m_scene.getCheckpoint());
            //            m_scene.createLabel(m_scene.getCheckpoint(), "CHECKPOINT REACHED");
            //            playSample(SAMPLE_CHECKPOINT);
            //        }
            //        m_scene.clearCheckpoint();
            //    }
            //}

            //break;
        }
        if (m_mode.PLAYERDEAD == 1) {
            //case PLAYERDEAD:

            //    stopMusic();

            //    m_fast_forward = false;

            //    if (m_game_end_timer.getTime() >= 1.f) {
            //        if (m_demo_mode != DEMO_OFF) {
            //            setDemoMode(DEMO_OFF);
            //            return changeState(CMainMenuState::instance());
            //        }

            //        swapPlayer();
            //        if (getPlayer() ->getLives() > 0)
            //            m_mode = CREATEPLAYER;
            //        else
            //            m_mode = GAMEOVER;
            //      }
            //    break;
        }

        if (m_mode.GAMEOVER == 1) {
            //case GAMEOVER:
            //    m_medium_font.setTextCursor(gsCPoint(0, 232));
            //    m_medium_font.justifyString("Game Over");
            //    if (m_game_end_timer.getTime() >= 3.f) {
            //        stopSamples();

            //        #ifdef _PROFILING
            //        return false;
            //        #endif

            //        if (addNewScore(getPlayer() ->getScore()))
            //            return changeState(CScoreEntryState::instance());
            //        else
            //            return changeState(CViewScoresState::instance());
            //}
            //    break;
        }

        if (m_mode.GAMEWON == 1) {
            //case GAMEWON:

            //    if (m_game_end_timer.getTime() >= 3.f) {
            //        m_medium_font.setTextCursor(gsCPoint(0, 232));
            //        m_medium_font.justifyString("Congratulations");
            //    }

            //    if (m_game_end_timer.getTime() >= 6.f) {
            //        stopSamples();

            //        if (addNewScore(getPlayer() ->getScore()))
            //            return changeState(CScoreEntryState::instance());
            //        else
            //            return changeState(CViewScoresState::instance());
            //    }
            //    break;
        }

        //m_screen.flip();

        //if (m_sound_system.isMusicFinished() && m_mode != GAMEWON) {
        //    if (m_reached_boss)
        //        playMusic(MUSIC_BOSS);
        //    else
        //        playMusic(MUSIC_GAME);
        //}

        return true;
    }

    //-------------------------------------------------------------

    public swapPlayer(): void {
        //// skip if one player game
        //if (this.m_number_of_players == 1)
        //    return;

        //// only swap to other player if it has lives left

        //var other_player:number = 1 - this.m_active_player;

        //if (this.m_player_list[other_player].getLives() > 0) {
        //    this.m_active_player = other_player;
        //}
    }

    //-------------------------------------------------------------

    public destroy(): boolean {
        this.m_scene.killAllActors();
        this.m_ship = null;

        //for (var i = 0; i < m_player_list.getSize(); i++)
        //delete m_player_list[i];

        //m_player_list.clear();

        return true;
    }

    //-------------------------------------------------------------

    public displayScores(ctx: CanvasRenderingContext2D): void {
        this.m_small_font.setTextCursor(new gsCPoint(320, 10));
        this.m_small_font.justifyString("Hi Score");

        this.m_small_font.setTextCursor(new gsCPoint(320, 20));
        this.m_small_font.justifyString(String("00000" + this.m_score_table.getScore(0)).slice(-10));

        if (this.m_number_of_players == 1) {
            this.m_small_font.setTextCursor(new gsCPoint(10, 10));
            this.m_small_font.printString("Player One");

            this.m_medium_font.setTextCursor(new gsCPoint(10, 20));
            this.m_medium_font.printString(String("00000" + + this.m_player_list[0].getScore()).slice(-10));
        }
        else {
            this.m_small_font.setTextCursor(new gsCPoint(10, 10));
            this.m_small_font.printString("Player One");

            this.m_small_font.setTextCursor(new gsCPoint(640 - 10 - 10 * 8, 10));
            this.m_small_font.printString("Player Two");

            if (this.m_active_player == 0) {
                this.m_medium_font.setTextCursor(new gsCPoint(10, 20));
                this.m_medium_font.printString("%010i" + this.m_player_list[0].getScore());
                this.m_small_font.setTextCursor(new gsCPoint(640 - 10 - 10 * 8, 20));
                this.m_small_font.printString("%010i" + this.m_player_list[1].getScore());
            }
            else {
                this.m_small_font.setTextCursor(new gsCPoint(10, 20));
                this.m_small_font.printString("%010i" + this.m_player_list[0].getScore());
                this.m_medium_font.setTextCursor(new gsCPoint(640 - 10 - 10 * 16, 20));
                this.m_medium_font.printString("%010i" + this.m_player_list[1].getScore());
            }
        }
    }

    //-------------------------------------------------------------

    public displayLives(ctx: CanvasRenderingContext2D): void {

        var life_symbol: gsCImage = this.m_scene.getImage("PULife");
        for (var i = 0; i < this.getPlayer().getLives(); i++) {
            life_symbol.drawImage(new gsCPoint(10 + i * 32, 480 - 64), ctx, life_symbol.Image);
        }

        //if (this.getPlayer().hasDive()) {
        //    var dive_symbol: gsCImage = this.m_scene.getImage("PUDive");
        //    dive_symbol.drawImage(new gsCPoint(10, 480 - 104),ctx, dive_symbol.Image);
        //}
    }

    //-------------------------------------------------------------

    public displayEnergyBar(ctx: CanvasRenderingContext2D): void {
        var x: number = 10;
        var y: number = 480 - 20;

        this.m_screen.drawRect(new gsCRectangle(x - 1, y - 1, x + this.ENERGYBAR_WIDTH, y + this.ENERGYBAR_HEIGHT), "white", ctx);//, gsCColour(gsWHITE));

        var shield: number = 0;

        if (this.m_ship) {
            shield = this.ENERGYBAR_WIDTH * this.m_ship.getShield() / this.m_ship.getActorInfo().m_initial_shield;
        }

        if (shield < 0) {
            shield = 0;
        }
        if (shield > this.ENERGYBAR_WIDTH) {
            shield = this.ENERGYBAR_WIDTH;
        }

        var shield_colour: string = "orange"; //; gsCColour 

        if (this.m_ship && this.m_ship.isCloaked()) {
            shield_colour = "blue"; //gsCColour(gsBLUE);
        }
        else {
            if (shield < this.ENERGYBAR_WIDTH / 3) {
                shield_colour = "red";//gsCColour(gsRED);
            }
            else if (shield < this.ENERGYBAR_WIDTH * 2 / 3) {
                shield_colour = "yellow";//gsCColour(gsYELLOW);
            }
            else {
                shield_colour = "green";//gsCColour(gsGREEN);
            }
        }

        this.m_screen.drawSolidRect(new gsCRectangle(x, y, x + shield, y + 9), shield_colour, ctx);

        for (var i = this.ENERGYBAR_STEP; i < this.ENERGYBAR_WIDTH; i += this.ENERGYBAR_STEP) {
            if (i <= shield) {
                this.m_screen.drawLine(new gsCPoint(x + i, y), new gsCPoint(x + i, y + this.ENERGYBAR_HEIGHT - 1), "black", ctx);
            }
        }
    }

    //-------------------------------------------------------------

    public displayBossEnergyBar(ctx: CanvasRenderingContext2D): void {
        var x: number = 320 - 50;
        var y: number = 50;

        this.m_small_font.setTextCursor(new gsCPoint(x + 6, y - 10));
        this.m_small_font.printString("BOSS SHIELD");

        this.m_screen.drawRect(new gsCRectangle(x - 1, y - 1, x + 100, y + 9), "white", ctx);

        var shield: number = 0; //CBoss::getShield();

        if (shield < 0)
            shield = 0;
        if (shield > 100)
            shield = 100;

        this.m_screen.drawSolidRect(new gsCRectangle(x, y, x + shield, y + 9), "red", ctx);
    }

    //-------------------------------------------------------------

    public testDebugKeys(key /*:gsKeyCode*/): void {
        //if (!Options.getOption(OPTION_CHEATS) ||
        //    !m_ship)
        //    return;

        //switch (key) {

        //    case gsKEY_1: m_ship ->upgradeWeapon(); break;
        //    case gsKEY_2: m_ship ->addWeapon(MISSILE_WEAPON, WEAPON_MEDIUM); break;
        //    case gsKEY_3: m_ship ->addWeapon(MISSILE_WEAPON, WEAPON_BEST); break;
        //    case gsKEY_4: m_ship ->addWeapon(LASER_WEAPON, WEAPON_STANDARD); break;
        //    case gsKEY_5: m_ship ->addWeapon(LASER_WEAPON, WEAPON_MEDIUM); break;
        //    case gsKEY_6: m_ship ->addWeapon(LASER_WEAPON, WEAPON_BEST); break;
        //    case gsKEY_7: m_ship ->addWeapon(HOMING_MISSILE_WEAPON, WEAPON_STANDARD); break;

        //    case gsKEY_8: m_ship ->attachClone(0); break;
        //    case gsKEY_9: m_ship ->attachWingtip(0); break;
        //    case gsKEY_0: m_ship ->removeUpgrades(); break;

        //    case gsKEY_NUMPAD1: m_ship ->setHandling(HANDLING_BAD); break;
        //    case gsKEY_NUMPAD2: m_ship ->setHandling(HANDLING_NORMAL); break;
        //    case gsKEY_NUMPAD3: m_ship ->setHandling(HANDLING_GOOD); break;

        //    case gsKEY_ADD: getPlayer() ->scoreBonus(50); break;
        //    case gsKEY_MULTIPLY: getPlayer() ->extraLife(); break;

        //    case gsKEY_C: m_ship ->setCloak(5.f); break;

        //    case gsKEY_B: Options.toggleOption(OPTION_BACKDROP); break;
        //    case gsKEY_I: Options.toggleOption(OPTION_DEBUGINFO); break;

        //    case gsKEY_X:
        //        {
        //            m_fast_forward = !m_fast_forward;
        //            if (m_fast_forward)
        //                m_ship ->setCloak(999.f);
        //            else
        //                m_ship ->setCloak(1.f);
        //            break;
        //        }

        //}
    }

    //-------------------------------------------------------------

    public printDebugInfo(): void {
        //if (!Options.getOption(OPTION_DEBUGINFO))
        //    return;

        //m_small_font.setTextCursor(gsCPoint(640 - 128, 60));
        //m_small_font.printString("actors %i", m_scene.getNumberOfActors());
        //m_small_font.setTextCursor(gsCPoint(640 - 128, 70));
        //m_small_font.printString("images %i", m_scene.getNumberOfImages());

        //int totals[ACTOR_TYPE_TOTAL] = { 0 };

        //for (int i = 0; i < m_scene.getNumberOfActors(); i++) {
        //    ActorType t = m_scene.getActor(i) ->getActorInfo().m_type;
        //    totals[(int) t]++;
        //}

        //m_small_font.setTextCursor(gsCPoint(640 - 128, 90));
        //m_small_font.printString("ship  %i", totals[0]);
        //m_small_font.setTextCursor(gsCPoint(640 - 128, 100));
        //m_small_font.printString("bullet  %i", totals[1]);
        //m_small_font.setTextCursor(gsCPoint(640 - 128, 110));
        //m_small_font.printString("upgrade %i", totals[2]);
        //m_small_font.setTextCursor(gsCPoint(640 - 128, 120));
        //m_small_font.printString("engine  %i", totals[3]);
        //m_small_font.setTextCursor(gsCPoint(640 - 128, 130));
        //m_small_font.printString("weapon  %i", totals[4]);
        //m_small_font.setTextCursor(gsCPoint(640 - 128, 140));
        //m_small_font.printString("pickup  %i", totals[5]);
        //m_small_font.setTextCursor(gsCPoint(640 - 128, 150));
        //m_small_font.printString("alien   %i", totals[6]);
        //m_small_font.setTextCursor(gsCPoint(640 - 128, 160));
        //m_small_font.printString("abullet %i", totals[7]);
        //m_small_font.setTextCursor(gsCPoint(640 - 128, 170));
        //m_small_font.printString("label   %i", totals[8]);
        //m_small_font.setTextCursor(gsCPoint(640 - 128, 180));
        //m_small_font.printString("effect  %i", totals[9]);

        //m_small_font.setTextCursor(gsCPoint(640 - 24, 470));
        //m_small_font.printString("%i", (int)(getApplication() ->getFrameRate() + 0.5f));
    }

    //-------------------------------------------------------------

    public getPlayer(): CPlayer { // * CPlayGameState::*/ {
        return this.m_player_list[this.m_active_player];
    }

    //-------------------------------------------------------------

    public reachedBoss(): boolean {
        return this.m_reached_boss;
    }

    //-------------------------------------------------------------

    public getYScroll(): number {
        return this.m_yscroll;
    }

    //-------------------------------------------------------------

}

export = CPlayGameState;