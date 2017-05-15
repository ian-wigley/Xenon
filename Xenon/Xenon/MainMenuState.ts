import gsCPoint = require("Point");
import CGameState = require("GameState");
import CIntroState = require("IntroState");
import CViewScoresState = require("ViewScoresState");
import COptionsMenuState = require("OptionsMenuState");
import CCreditsState = require("CreditsState");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import gsCMenu = require("Menu");
import gsCImage = require("Image");
import COptions = require("Options");
import gsCControls = require("Controls");
import enums = require("Enums");
import CApplication = require("Application");

class CMainMenuState extends CGameState {

    //-------------------------------------------------------------
    m_introState: CIntroState;
    m_viewScoresState: CViewScoresState;
    m_optionsMenuState: COptionsMenuState;
    m_creditsState: CCreditsState;
    m_bblogo: gsCImage;//HTMLImageElement;//gsCImage	CMainMenuState::
    m_pcflogo: gsCImage;//HTMLImageElement;//gsCImage	CMainMenuState::
    m_title: gsCImage;//HTMLImageElement;//gsCImage	CMainMenuState::
    m_starfield: CStarfield;//
    m_menu: gsCMenu;
    //-------------------------------------------------------------

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D) {
        super(font8x8, font16x16, app, ctx);

        this.m_starfield = starfield
        //m_menu.clear();

        this.m_menu = new gsCMenu();
        this.m_introState = new CIntroState(scene, starfield, font8x8, font16x16, app, ctx, this);
        this.m_viewScoresState = new CViewScoresState(scene, starfield, font8x8, font16x16, app, ctx, this);
        this.m_optionsMenuState = new COptionsMenuState(scene, starfield, font8x8, font16x16, app, ctx, this, this.m_menu);
        this.m_creditsState = new CCreditsState(scene, starfield, font8x8, font16x16, app, ctx, this);
        this.m_stateName = "MainMenuState";
        this.create(); //TEMP! 
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        return this.m_app.instance = this.m_introState;
    }

    //-------------------------------------------------------------

    public create(): boolean {

        this.m_menu.clear();
        this.m_menu.addSelection("Start One Player Game");
        this.m_menu.addSelection("Start Two Player Game");
        this.m_menu.addSelection("View High Scores");
        this.m_menu.addSelection("Options");
        this.m_menu.addSelection("Credits");
        this.m_menu.addSelection("Quit");
        this.m_menu.setWrap(true);
        this.m_menu.setPosition(new gsCPoint(0, 275));
        this.m_menu.setSpacing(new gsCPoint(0, 30));
        this.m_menu.setCurrentItem(enums.MainMenuItem.MM_ONEPLAYER);
        this.m_menu.setFont(this.m_medium_font);

        this.playMusic(enums.GameMusicType.MUSIC_TITLE);

        //m_bblogo.enableColourKey(gsCColour(gsMAGENTA));
        this.bbTexture = <HTMLImageElement>document.getElementById("bblogo");

        //if (!m_pcflogo.load("pcflogo.bmp"))
        //	return false;
        //m_pcflogo.enableColourKey(gsCColour(gsMAGENTA));

        //m_title.enableColourKey(gsCColour(gsMAGENTA));
        this.introTexture = <HTMLImageElement>document.getElementById("Xlogo");

        //m_attract_mode = UNKNOWN;
        this.m_state = this;
        return true;
    }

    //-------------------------------------------------------------

    public destroy(): boolean {
        //m_bblogo.destroy();
        //m_pcflogo.destroy();
        //m_title.destroy();
        return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: gsCControls): boolean {
        //	if (!CGameState::update())
        //		return false;

        //	if (m_attract_mode == UNKNOWN) {
        //		m_attract_mode = ON;
        //		m_attract_mode_timer.start();
        //		}

        //	if (m_attract_mode == ON &&
        //		m_attract_mode_timer.getTime() > 100.f) { //10.f
        //		m_demo_recorder.load(DEMO_FILENAME);
        //		const char *level = m_demo_recorder.getLevel();
        //		if (level != 0) {
        //			strcpy(m_level_filename,level);
        //			setDemoMode(DEMO_PLAYBACK);
        //			return changeState(CPlayGameState::instance());
        //			}
        //		else
        //			m_attract_mode = OFF;
        //		}

        if (this.m_options.getOption(enums.OptionType.OPTION_BACKDROP)) {
            ctx.drawImage(this.backgroundTexture, 0, 0);
        }

        this.m_starfield.Update(4);
        this.m_starfield.Draw(ctx);

        this.m_menu.draw(ctx);//TEMP!

        ctx.drawImage(this.introTexture, 64, 10);
        ctx.drawImage(this.bbTexture, 10, 360);
        //this.m_pcflogo.drawImage(new gsCPoint(480, 400), ctx, pcflogo);

        ////	m_medium_font.setTextCursor(gsCPoint(0,50));
        ////	m_medium_font.justifyString("Xenon Demo");

        this.m_small_font.setTextCursor(new gsCPoint(0, 460));
        this.m_small_font.justifyString("Copyright 2000 The Bitmap Brothers");


        this.m_small_font.setTextCursor(new gsCPoint(0, 470));
        this.m_small_font.justifyString("Typescript conversion by Ian Wigley 2017");

        this.m_small_font.setTextCursor(new gsCPoint(2, 2));
        //this.m_small_font.printString("%s %s", __TIME__, __DATE__);

        this.m_menu.draw(ctx);

        var item: enums.MainMenuItem = <enums.MainMenuItem>this.m_menu.getCurrentItem();

        //	gsKeyCode key = getKey();
        //	if (key != gsKEY_NONE)
        //		m_attract_mode = OFF;

        if (controls.returnPressed || controls.enterPressed || controls.lcontrolPressed) {
            controls.returnPressed = false;
            controls.enterPressed = false;
            controls.lcontrolPressed = false;

            switch (item) {
                case enums.MainMenuItem.MM_ONEPLAYER:
                    this.m_number_of_players = 1;
                    this.playSample(enums.GameSampleType.SAMPLE_MENU_CLICK);
                    //this.setDemoMode(DEMO_OFF);
                    return this.changeState(this.m_introState.instance());
                case enums.MainMenuItem.MM_TWOPLAYER:
                    this.m_number_of_players = 2;
                    this.playSample(enums.GameSampleType.SAMPLE_MENU_CLICK);
                    //this.setDemoMode(DEMO_OFF);
                    return this.changeState(this.m_introState.instance());
                case enums.MainMenuItem.MM_SCORES:
                    this.playSample(enums.GameSampleType.SAMPLE_MENU_CLICK);
                    return this.changeState(this.m_viewScoresState.instance());
                case enums.MainMenuItem.MM_OPTIONS:
                    this.playSample(enums.GameSampleType.SAMPLE_MENU_CLICK);
                    this.m_optionsMenuState.create();
                    return this.changeState(this.m_optionsMenuState.instance());
                case enums.MainMenuItem.MM_CREDITS:
                    this.playSample(enums.GameSampleType.SAMPLE_MENU_CLICK);
                    this.m_creditsState.create();
                    return this.changeState(this.m_creditsState.instance());
                case enums.MainMenuItem.MM_QUIT:
                    //CMessageBoxState::setup("Sure you want to quit ?",
                    //    "Yes", 0,
                    //    "No", CMainMenuState::instance());
                    return this.changeState(this.m_introState.instance());//changeState(CMessageBoxState::instance());
            }
        }

        if (controls.up) {
            controls.up = false;
            this.m_menu.scroll(-1);
            this.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
        }

        if (controls.down) {
            controls.down = false;
            this.m_menu.scroll(1);
            this.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
        }

        //		case gsKEY_F1:
        //			ActorInfoList.save(ACTORINFO_FILENAME);
        //			break;

        //		case gsKEY_R:
        //			setDemoMode(DEMO_RECORD);
        //			return changeState(CIntroState::instance());

        //		case gsKEY_L:
        //			m_demo_recorder.load(DEMO_FILENAME);
        //		case gsKEY_P:
        //			{
        //				const char *level = m_demo_recorder.getLevel();
        //				if (level != 0) {
        //					strcpy(m_level_filename,level);
        //					setDemoMode(DEMO_PLAYBACK);
        //					return changeState(CPlayGameState::instance());
        //					}
        //			}
        //			break;

        //		case gsKEY_S:
        //			m_demo_recorder.save();
        //			break;
        //}

        if (this.m_sound_system.isMusicFinished()) {
            this.m_sound_system.playMusic(enums.GameMusicType.MUSIC_TITLE);
        }

        return true;
    }

    //-------------------------------------------------------------

}
export = CMainMenuState;

