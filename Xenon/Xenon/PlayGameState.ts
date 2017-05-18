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
import CMainMenuState = require("MainMenuState");
import CBoss = require("Boss");
import CBossControl = require("BossControl");
import Options = require("Options");
import gsCControls = require("Controls");

import CViewScoresState = require("ViewScoresState");
import CScoreEntryState = require("ScoreEntryState");
import CApplication = require("Application");

import CDemoRecorder = require("DemoRecorder");

enum m_gameMode {  //m_mode
    CREATEPLAYER,
    PLAYERACTIVE,
    PLAYERDEAD,
    GAMEOVER,
    GAMEWON,
}

class CPlayGameState extends CGameState {
    private m_ship: CShip;

    private m_game_start_timer: gsCTimer;
    private m_game_end_timer: gsCTimer;

    //private m_starfield: CStarfield;
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

    private m_boss: CBoss;
    private m_bossControl: CBossControl;
    //private m_options: Options;

    private m_mode: m_gameMode;

    m_demo_recorder: CDemoRecorder;


    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menu?) {
        super(font8x8, font16x16, app, ctx);

        this.m_scene = scene;
        this.m_starfield = starfield;
        //this.m_mainMenuState = mainMenuState;
        //this.m_options = options;

        this.m_stateName = "PlayGameState";


        this.m_mainMenuState = menu;


        this.m_level = this.m_scene.GetLevel();

        // temp!
        this.m_screen = new gsCScreen();
        //this.m_score_table = new gsCScoreTable();

        this.m_game_start_timer = new gsCTimer();
        this.m_game_end_timer = new gsCTimer();

        this.m_boss = null;
        this.m_bossControl = null;


        this.create();
        //this.createPlayer();
    }

    //-------------------------------------------------------------

    public create(): boolean {

        this.m_scene.setMap(this.m_level.m_front_layer);
        this.m_scene.setCollisionListSize(this.m_screen.getSize(), new gsCPoint(8, 6));

        this.m_ship = null;

        this.m_game_end_timer.reset();
        var map_size: gsCPoint = this.m_level.m_front_layer.getSizeInPixels();
        var start_position: gsCVector = new gsCVector(map_size.X / 2.0, (map_size.Y - this.PLAYER_START_OFFSET));

        for (var i = 0; i < this.m_number_of_players; i++) {
            var player: CPlayer = new CPlayer();
            player.setCheckpoint(start_position);
            this.m_player_list.push(player);
        }

        //m_active_player = null;

        this.m_mode = m_gameMode.CREATEPLAYER;

        //if (m_demo_mode == DEMO_RECORD)
        //    m_demo_recorder.setLevel(m_level_filename);

        this.m_fast_forward = false;

        this.m_state = this;

        // Reset the number of lives
        this.getPlayer().setLives();

        return true;
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        return this.m_app.instance = this.m_mainMenuState;
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

        this.m_scene.killAllActors();

        this.m_ship = new CShip(this.m_scene, this);//temp);
        this.m_scene.addActor(this.m_ship);
        this.m_ship.activateShip();

        var start_position: gsCVector = this.getPlayer().getCheckpoint();
        //var start_position: gsCVector = new gsCVector(300, 100);
        this.m_ship.setPosition(start_position);
        this.m_scene.clearCheckpoint();
        //this.setLayerPositions(32704);
        this.setLayerPositions(start_position.Y);
        this.m_level.reset();
        this.m_ship.setWeapon(enums.WeaponType.MISSILE_WEAPON, enums.WeaponGrade.WEAPON_STANDARD);

        //#ifdef _PROFILING
        //this.m_ship.attachClone(0);
        //this.m_ship.attachClone(1);
        //this.m_ship.attachWingtip(0);
        //this.m_ship.attachWingtip(1);
        //this.m_ship.setWeapon(enums.WeaponType.MISSILE_WEAPON, enums.WeaponGrade.WEAPON_BEST);
        //this.m_ship.addWeapon(enums.WeaponType.HOMING_MISSILE_WEAPON, enums.WeaponGrade.WEAPON_BEST);
        //this.m_ship.addWeapon(enums.WeaponType.HOMING_MISSILE_WEAPON, enums.WeaponGrade.WEAPON_BEST);
        //this.m_ship.addWeapon(enums.WeaponType.LASER_WEAPON, enums.WeaponGrade.WEAPON_BEST);
        //this.m_ship.addWeapon(enums.WeaponType.LASER_WEAPON, enums.WeaponGrade.WEAPON_BEST);
        //#endif

        ////    playSample(SAMPLE_PLAYER_CREATED,m_ship->getPosition().getX());
        this.getPlayer().loseLife();
        this.m_reached_boss = false;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: gsCControls): boolean {

        if (!super.update(ctx, controls)) {
            return false;
        }

        //gsKeyCode key = m_keyboard.getKey();

        //if (m_paused) {
        //	if (key == gsKEY_P) {
        //		m_paused = false;
        //		gsCApplication::setPaused(false);
        //		}
        //	else
        //		return true;
        //	}
        //else {
        //	if (key == gsKEY_P) {
        //		m_paused = true;
        //		gsCApplication::setPaused(true);
        //		return true;
        //		}
        //	}

        if (this.m_mode == m_gameMode.CREATEPLAYER) {
            this.playMusic(enums.GameMusicType.MUSIC_GAME);
            this.createPlayer();
            this.m_game_start_timer.start();
            this.m_mode = m_gameMode.PLAYERACTIVE;
        }

        //Controls controls;
        this.getControl(controls, this.m_active_player);

        if (this.m_ship) {
            if (controls.divePressed) {
                if (this.getPlayer().hasDive()) {
                    this.m_ship.dive(3.0);
                    this.getPlayer().useDive();
                }
            }

            if (controls.reversePressed) {
                this.m_ship.reverseWeapon();
            }

            // disable firing when diving
            if (this.m_ship.getDiveLevel() > 0) {
                controls.fire = false;
                controls.firePressed = false;
            }
        }

        switch (this.m_demo_mode) {
            case enums.DemoMode.DEMO_RECORD:
                this.m_demo_recorder.addEvent(controls);
                break;
            case enums.DemoMode.DEMO_PLAYBACK:
                if (!this.m_demo_recorder.getEvent(controls))
                    //return changeState(CMainMenuState::instance());
                    break;
        }

        if (this.m_options.getOption(enums.OptionType.OPTION_BACKDROP)) {
            ctx.drawImage(this.backgroundTexture, 0, 0);
        }

        var loop: number = 1;

        if (this.m_fast_forward) {
            loop = 16;
        }

        while (loop-- > 0) {

            this.m_starfield.Update(4);
            this.m_starfield.Draw(ctx);

            if (this.m_mode == m_gameMode.PLAYERACTIVE) {
                this.m_level.scanForNewActors(this.m_scene, this);
            }

            this.even = !this.even;

            if (this.even && !this.m_reached_boss) {
                this.m_level.m_back_layer.move(new gsCPoint(0, 1));
            }

            if (this.m_level.m_back_layer.getPosition().Y > 0) {
                this.m_level.m_back_layer.setPosition(new gsCVector(0, 0));
            }

            //------------------------------------------------------------- Added 03/03/2017 -------------------------------------------------------------
            if (!this.m_reached_boss) {
                if (this.m_bossControl != null) {
                    if (this.m_bossControl.isStarted()) {
                        this.m_reached_boss = true;
                        this.playMusic(enums.GameMusicType.MUSIC_BOSS);
                    }
                }
            }

            if (this.m_bossControl != null) {
                if (this.m_bossControl.isStarted()) {
                    this.m_yscroll = this.m_bossControl.getYScroll();
                }
                else {
                    this.m_yscroll = 1;
                }
            }

            //------------------------------------------------------------- Added 03/03/2017 -------------------------------------------------------------

            this.m_level.m_front_layer.move(new gsCPoint(0, this.m_yscroll));

            if (this.m_level.m_front_layer.getPosition().Y > 0) {
                this.m_level.m_front_layer.setPosition(new gsCVector(0, 0));
            }

            var sprite_hits: number = 0;
            var map_hits: number = 0;

            ////#ifdef _PROFILING
            ////	controls.firePressed = controls.fire = true;
            ////#endif

            this.m_scene.updateAllActors(controls, null);
            this.m_level.m_back_layer.drawMap(ctx);
            this.m_scene.drawAllActors(ctx, this.m_level.m_front_layer);
            this.m_scene.checkActorCollisions();
            //this.m_scene.checkMapCollisions(this.m_level.m_front_layer);           // Turned off for now 2/3/17 ! 
            this.m_scene.removeDeadActors();


        }

        ////testDebugKeys(key);
        ////if (key == gsKEY_ESCAPE || (key != gsKEY_NONE && m_demo_mode == DEMO_PLAYBACK)) {
        ////    setDemoMode(DEMO_OFF);
        ////    #ifdef _PROFILING
        ////    return false;
        ////    #else
        ////    return changeState(CMainMenuState::instance());
        ////    #endif
        ////}

        this.displayScores(ctx);
        this.displayLives(ctx);
        this.displayEnergyBar(ctx);

        if (this.m_reached_boss) {
            this.displayBossEnergyBar(ctx);
        }

        ////printDebugInfo();
        ////if (m_demo_mode == DEMO_PLAYBACK) {
        ////    m_medium_font.setTextCursor(gsCPoint(0, 100));
        ////    m_medium_font.justifyString("DEMONSTRATION");
        ////}



        this.m_game_start_timer.update(false);
        this.m_game_end_timer.update(false);

        switch (this.m_mode) {
            case m_gameMode.PLAYERACTIVE:
                if (this.m_game_start_timer.getState() == enums.gsTimerState.gsTIMER_ACTIVE) {
                    if (this.m_game_start_timer.getTime() < 1.0) {
                        this.m_medium_font.setTextCursor(new gsCPoint(0, 232));
                        if (this.m_number_of_players == 1)
                            this.m_medium_font.justifyString("Get Ready");
                        else {
                            if (this.m_active_player == 0)
                                this.m_medium_font.justifyString("Player One");
                            else
                                this.m_medium_font.justifyString("Player Two");
                        }
                    }
                    else
                        this.m_game_start_timer.reset();
                }

                //-------------------------------------------------------------------------- 09/03/17
                if (this.m_ship.getShield() == 0 && this.getPlayer().getLives() > 0) {
                    //this.m_game_end_timer.start();
                    this.playSample(enums.GameSampleType.SAMPLE_PLAYER_DESTROYED, this.m_ship.getPosition().X);
                    this.m_ship.explode();
                    //this.m_ship.kill();
                    this.m_scene.removeDeadActors();
                    //this.m_ship = null;
                    //this.m_mode = m_gameMode.PLAYERDEAD;
                    this.m_ship.setShield(100);
                    this.getPlayer().loseLife();
                    break;
                }


                if (this.m_ship.getShield() == 0 && this.getPlayer().getLives() == 0) {
                    this.m_game_end_timer.start();
                    this.playSample(enums.GameSampleType.SAMPLE_PLAYER_DESTROYED, this.m_ship.getPosition().X);
                    this.m_ship.explode();
                    this.m_ship.kill();
                    this.m_scene.removeDeadActors();
                    this.m_ship = null;
                    this.m_mode = m_gameMode.PLAYERDEAD;
                    break;
                }

                if (this.m_reached_boss && this.m_boss.getShield() == 0) {
                    this.playMusic(enums.GameMusicType.MUSIC_OUTRO);
                    this.m_game_end_timer.start();
                    this.m_mode = m_gameMode.GAMEWON;
                    break;
                }

                if (this.m_scene.hasCheckpoint()) {
                    if (this.m_ship.getPosition().Y <= this.m_scene.getCheckpoint().Y) {
                        if (this.getPlayer().getCheckpoint() != this.m_scene.getCheckpoint()) {
                            this.getPlayer().setCheckpoint(this.m_scene.getCheckpoint());
                            this.m_scene.createLabel(this.m_scene.getCheckpoint(), "CHECKPOINT REACHED");
                            this.playSample(enums.GameSampleType.SAMPLE_CHECKPOINT);
                        }
                        this.m_scene.clearCheckpoint();
                    }
                }
                break;

            case m_gameMode.PLAYERDEAD:
                this.stopMusic();
                this.m_fast_forward = false;
                if (this.m_game_end_timer.getTime() >= 0) { // 1.0) { TEMP !!
                    if (this.m_demo_mode != enums.DemoMode.DEMO_OFF) {
                        //this.setDemoMode(enums.DemoMode.DEMO_OFF);

                        this.resetGame();

                        //return this.changeState(this.m_mainMenuState);//.instance());// CMainMenuState::instance());this.m_mainMenuState
                        return this.changeState(this.m_app.instance = this.m_mainMenuState);
                    }
                    this.swapPlayer();
                    if (this.getPlayer().getLives() > 0)
                        this.m_mode = m_gameMode.CREATEPLAYER;
                    else
                        this.m_mode = m_gameMode.GAMEOVER;
                }
                break;

            case m_gameMode.GAMEOVER:
                this.m_medium_font.setTextCursor(new gsCPoint(0, 232));
                this.m_medium_font.justifyString("Game Over");
                if (this.m_game_end_timer.getTime() >= 3.0) {
                    this.stopSamples();

                    //        #ifdef _PROFILING
                    //        return false;
                    //        #endif

                    if (this.addNewScore(this.getPlayer().getScore())) {
                        //return this.changeState(CScoreEntryState::instance());
                    }
                    else {
                        //return changeState(CViewScoresState::instance());
                    }
                }
                break;

            case m_gameMode.GAMEWON:
                if (this.m_game_end_timer.getTime() >= 3.0) {
                    this.m_medium_font.setTextCursor(new gsCPoint(0, 232));
                    this.m_medium_font.justifyString("Congratulations");
                }

                if (this.m_game_end_timer.getTime() >= 6.0) {
                    this.stopSamples();
                    if (this.addNewScore(this.getPlayer().getScore())) {
                        // return changeState(CScoreEntryState::instance());
                    }
                    else {
                        //   return changeState(CViewScoresState::instance());
                    }
                }
                break;
        }

        if (/*this.m_sound_system.isMusicFinished() &&*/ this.m_mode != m_gameMode.GAMEWON) {
            if (this.m_reached_boss)
                this.playMusic(enums.GameMusicType.MUSIC_BOSS);
            else
                this.playMusic(enums.GameMusicType.MUSIC_GAME);
        }

        return true;
    }

    //-------------------------------------------------------------

    public swapPlayer(): void {
        // skip if one player game
        if (this.m_number_of_players == 1)
            return;

        // only swap to other player if it has lives left
        var other_player: number = 1 - this.m_active_player;

        if (this.m_player_list[other_player].getLives() > 0) {
            this.m_active_player = other_player;
        }
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
            this.m_medium_font.printString(String("00000" + this.m_player_list[0].getScore()).slice(-10));
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

        if (this.getPlayer().hasDive()) {
            var dive_symbol: gsCImage = this.m_scene.getImage("PUDive");
            dive_symbol.drawImage(new gsCPoint(10, 480 - 104), ctx, dive_symbol.Image);
        }
    }

    //-------------------------------------------------------------

    public displayEnergyBar(ctx: CanvasRenderingContext2D): void {
        var x: number = 10;
        var y: number = 480 - 20;

        this.m_screen.drawRect(new gsCRectangle(x - 1, y - 1, this.ENERGYBAR_WIDTH, this.ENERGYBAR_HEIGHT), "white", ctx);

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

        var shield_colour: string;

        if (this.m_ship && this.m_ship.isCloaked()) {
            shield_colour = "blue";
        }
        else {
            if (shield < this.ENERGYBAR_WIDTH / 3) {
                shield_colour = "red";
            }
            else if (shield < this.ENERGYBAR_WIDTH * 2 / 3) {
                shield_colour = "yellow";
            }
            else {
                shield_colour = "green";
            }
        }

        this.m_screen.drawSolidRect(new gsCRectangle(x, y, shield, 9), shield_colour, ctx);

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

        var shield: number = this.m_boss.getShield();

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

    public getPlayer() { //: CPlayer { // * CPlayGameState::*/ {
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

    public set boss(value: CBoss) {
        this.m_boss = value;
    }

    //-------------------------------------------------------------

    public set bossControl(value: CBossControl) {
        this.m_bossControl = value;
    }

    //public set mainMenuState(value: CMainMenuState) {
    //    this.m_mainMenuState = value;
    //}

    private resetGame(): void {
        this.create();
    }

}

export = CPlayGameState;