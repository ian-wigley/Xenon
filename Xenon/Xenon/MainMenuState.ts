import gsCPoint = require("Point");
import CGameState = require("GameState");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import gsCMenu = require("Menu");
import gsCImage = require("Image");
import COptions = require("Options");

enum MainMenuItem {
    MM_ONEPLAYER,
    MM_TWOPLAYER,
    MM_SCORES,
    MM_OPTIONS,
    MM_CREDITS,
    MM_QUIT
};

enum OptionType {
    OPTION_DIFFICULTY,
    OPTION_HIRES,
    OPTION_WINDOWED,
    OPTION_COLOURDEPTH,
    OPTION_JOYSTICK,
    OPTION_MUSIC,
    OPTION_SOUNDFX,
    OPTION_PARTICLEFX,
    OPTION_BACKDROP,
    OPTION_DEBUGINFO,
    OPTION_CHEATS,
    OPTION_CONTROL1,
    OPTION_CONTROL2,

    TOTAL_OPTIONS
};


class CMainMenuState extends CGameState {

    //-------------------------------------------------------------

    //CMainMenuState *CMainMenuState::m_instance = 0;

    m_bblogo: gsCImage;//HTMLImageElement;//gsCImage	CMainMenuState::
    m_pcflogo: gsCImage;//HTMLImageElement;//gsCImage	CMainMenuState::
    m_title: gsCImage;//HTMLImageElement;//gsCImage	CMainMenuState::
    m_starfield: CStarfield;//
    m_menu: gsCMenu;

    //-------------------------------------------------------------

    constructor(scene: CScene, starfield: CStarfield, m_font8x8: HTMLImageElement, m_font16x16: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        super(m_font8x8, m_font16x16, ctx);

        this.m_starfield = starfield;
        //m_menu.clear();

        this.m_menu.addSelection("Start One Player Game");
        this.m_menu.addSelection("Start Two Player Game");
        this.m_menu.addSelection("View High Scores");
        this.m_menu.addSelection("Options");
        this.m_menu.addSelection("Credits");
        this.m_menu.addSelection("Quit");
        this.m_menu.setWrap(true);
        this.m_menu.setPosition(new gsCPoint(0, 275));
        this.m_menu.setSpacing(new gsCPoint(0, 30));
        this.m_menu.setCurrentItem(MainMenuItem.MM_ONEPLAYER);
        this.m_menu.setFont(this.m_medium_font);
    }

    //-------------------------------------------------------------

    //CGameState *CMainMenuState::instance()
    //{
    //	if (!m_instance)
    //		m_instance = new CMainMenuState;

    //	return m_instance;
    //}

    //-------------------------------------------------------------

    public create(): boolean {
        //playMusic(MUSIC_TITLE);

        //if (m_screen.getBytesPerPixel() == 1)
        //	gsCFile::setDirectory(DIRECTORY_GRAPHICS8);
        //else
        //	gsCFile::setDirectory(DIRECTORY_GRAPHICS24);

        //if (!m_bblogo.load("bblogo.bmp"))
        //	return false;
        //m_bblogo.enableColourKey(gsCColour(gsMAGENTA));

        //if (!m_pcflogo.load("pcflogo.bmp"))
        //	return false;
        //m_pcflogo.enableColourKey(gsCColour(gsMAGENTA));

        //if (!m_title.load("xlogo.bmp"))
        //	return false;
        //m_title.enableColourKey(gsCColour(gsMAGENTA));

        //m_attract_mode = UNKNOWN;

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

    public update(ctx): boolean {
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

        //if (Options.getOption(OptionType.OPTION_BACKDROP)) {
        //    this.m_backdrop.draw(new gsCPoint(0, 0));
        //}
        //	else
        //		m_screen.clear(gsCColour(gsBLACK));

        ////	m_screen.clear(gsCColour(gsBLACK));

        this.m_starfield.Update(4);//.move(4);
        this.m_starfield.Draw(ctx);


        ////var life_symbol: gsCImage = this.m_scene.getImage("PULife");
        ////life_symbol.drawImage(new gsCPoint(10 + i * 32, 480 - 64), ctx, life_symbol.Image);

        //this.m_title.drawImage(new gsCPoint(64, 10), ctx, title);
        //this.m_bblogo.drawImage(new gsCPoint(10, 360),ctx, bblogo);
        //this.m_pcflogo.drawImage(new gsCPoint(480, 400),ctx, pcflogo);

        ////	m_medium_font.setTextCursor(gsCPoint(0,50));
        ////	m_medium_font.justifyString("Xenon Demo");

        this.m_small_font.setTextCursor(new gsCPoint(0, 470));
        this.m_small_font.justifyString("Copyright 2000 The Bitmap Brothers");

        this.m_small_font.setTextCursor(new gsCPoint(2, 2));
        //this.m_small_font.printString("%s %s", __TIME__, __DATE__);

        this.m_menu.draw();

        //	m_screen.flip();

        //	item: MainMenuItem = (MainMenuItem) m_menu.getCurrentItem();

        //	gsKeyCode key = getKey();

        //	if (key != gsKEY_NONE)
        //		m_attract_mode = OFF;

        //	switch (key) {
        //		case gsKEY_RETURN:
        //		case gsKEY_ENTER:
        //		case gsKEY_LCONTROL:
        //			switch (item) {
        //				case MM_ONEPLAYER:
        //					m_number_of_players = 1;
        //					playSample(SAMPLE_MENU_CLICK);
        //					setDemoMode(DEMO_OFF);
        //					return changeState(CIntroState::instance());
        //				case MM_TWOPLAYER:
        //					m_number_of_players = 2;
        //					playSample(SAMPLE_MENU_CLICK);
        //					setDemoMode(DEMO_OFF);
        //					return changeState(CIntroState::instance());
        //				case MM_SCORES:
        //					playSample(SAMPLE_MENU_CLICK);
        //					return changeState(CViewScoresState::instance());
        //				case MM_OPTIONS:
        //					playSample(SAMPLE_MENU_CLICK);
        //					return changeState(COptionsMenuState::instance());
        //				case MM_CREDITS:
        //					playSample(SAMPLE_MENU_CLICK);
        //					return changeState(CCreditsState::instance());
        //				case MM_QUIT:
        //					CMessageBoxState::setup("Sure you want to quit ?",
        //											"Yes",0,
        //											"No",CMainMenuState::instance());
        //					return changeState(CMessageBoxState::instance());
        //				}
        //			break;
        //		case gsKEY_UP:
        //			m_menu.scroll(-1);
        //			playSample(SAMPLE_MENU_SELECTION);
        //			break;
        //		case gsKEY_DOWN:
        //			m_menu.scroll(1);
        //			playSample(SAMPLE_MENU_SELECTION);
        //			break;

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
        //		}

        //	if (m_sound_system.isMusicFinished())
        //		m_sound_system.playMusic((int) MUSIC_TITLE);

        return true;
    }

    //-------------------------------------------------------------

}
export = CMainMenuState;


//class CMainMenuState {


///*
//    #include "game.h"

////-------------------------------------------------------------

//CMainMenuState *CMainMenuState::m_instance = 0;

//gsCImage	CMainMenuState::m_bblogo;
//gsCImage	CMainMenuState::m_pcflogo;
//gsCImage	CMainMenuState::m_title;

////-------------------------------------------------------------

//CMainMenuState::CMainMenuState()
//{
//	m_menu.clear();

//	m_menu.addSelection("Start One Player Game");
//	m_menu.addSelection("Start Two Player Game");
//	m_menu.addSelection("View High Scores");
//	m_menu.addSelection("Options");
//	m_menu.addSelection("Credits");
//	m_menu.addSelection("Quit");
//	m_menu.setWrap(true);
//	m_menu.setPosition(gsCPoint(0,275));
//	m_menu.setSpacing(gsCPoint(0,30));
//	m_menu.setCurrentItem(MM_ONEPLAYER);
//	m_menu.setFont(&m_medium_font);
//}

////-------------------------------------------------------------

//CMainMenuState::~CMainMenuState()
//{
//}

////-------------------------------------------------------------

//CGameState *CMainMenuState::instance()
//{
//	if (!m_instance)
//		m_instance = new CMainMenuState;

//	return m_instance;
//}

////-------------------------------------------------------------

//bool CMainMenuState::create()
//{
//	playMusic(MUSIC_TITLE);

//	if (m_screen.getBytesPerPixel() == 1)
//		gsCFile::setDirectory(DIRECTORY_GRAPHICS8);
//	else
//		gsCFile::setDirectory(DIRECTORY_GRAPHICS24);

//	if (!m_bblogo.load("bblogo.bmp"))
//		return false;
//	m_bblogo.enableColourKey(gsCColour(gsMAGENTA));

//	if (!m_pcflogo.load("pcflogo.bmp"))
//		return false;
//	m_pcflogo.enableColourKey(gsCColour(gsMAGENTA));

//	if (!m_title.load("xlogo.bmp"))
//		return false;
//	m_title.enableColourKey(gsCColour(gsMAGENTA));

//	m_attract_mode = UNKNOWN;

//	return true;
//}

////-------------------------------------------------------------

//bool CMainMenuState::destroy()
//{
//	m_bblogo.destroy();
//	m_pcflogo.destroy();
//	m_title.destroy();

//	return true;
//}

////-------------------------------------------------------------

//bool CMainMenuState::update()
//{
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

//	if (Options.getOption(OPTION_BACKDROP))
//		m_backdrop.draw(gsCPoint(0,0));
//	else
//		m_screen.clear(gsCColour(gsBLACK));

////	m_screen.clear(gsCColour(gsBLACK));

//	m_starfield.move(4);
//	m_starfield.draw();

//	m_title.draw(gsCPoint(64,10));
//	m_bblogo.draw(gsCPoint(10,360));
//	m_pcflogo.draw(gsCPoint(480,400));

////	m_medium_font.setTextCursor(gsCPoint(0,50));
////	m_medium_font.justifyString("Xenon Demo");

//	m_small_font.setTextCursor(gsCPoint(0,470));
//	m_small_font.justifyString("Copyright 2000 The Bitmap Brothers");

//	m_small_font.setTextCursor(gsCPoint(2,2));
//	m_small_font.printString("%s %s",__TIME__,__DATE__);

//	m_menu.draw();

//	m_screen.flip();

//	MainMenuItem item = (MainMenuItem) m_menu.getCurrentItem();

//	gsKeyCode key = getKey();

//	if (key != gsKEY_NONE)
//		m_attract_mode = OFF;

//	// Temp to allow game to start !! <-- Added by Ian
//	//return changeState(CIntroState::instance());


//	switch (key) {
//		case gsKEY_RETURN:
//		case gsKEY_ENTER:
//		case gsKEY_LCONTROL:
//			switch (item) {
//				case MM_ONEPLAYER:
//					m_number_of_players = 1;
//					playSample(SAMPLE_MENU_CLICK);
//					setDemoMode(DEMO_OFF);
//					return changeState(CIntroState::instance());
//				case MM_TWOPLAYER:
//					m_number_of_players = 2;
//					playSample(SAMPLE_MENU_CLICK);
//					setDemoMode(DEMO_OFF);
//					return changeState(CIntroState::instance());
//				case MM_SCORES:
//					playSample(SAMPLE_MENU_CLICK);
//					return changeState(CViewScoresState::instance());
//				case MM_OPTIONS:
//					playSample(SAMPLE_MENU_CLICK);
//					return changeState(COptionsMenuState::instance());
//				case MM_CREDITS:
//					playSample(SAMPLE_MENU_CLICK);
//					return changeState(CCreditsState::instance());
//				case MM_QUIT:
//					CMessageBoxState::setup("Sure you want to quit ?",
//											"Yes",0,
//											"No",CMainMenuState::instance());
//					return changeState(CMessageBoxState::instance());
//				}
//			break;
//		case gsKEY_UP:
//			m_menu.scroll(-1);
//			playSample(SAMPLE_MENU_SELECTION);
//			break;
//		case gsKEY_DOWN:
//			m_menu.scroll(1);
//			playSample(SAMPLE_MENU_SELECTION);
//			break;

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
//		}

//	if (m_sound_system.isMusicFinished())
//		m_sound_system.playMusic((int) MUSIC_TITLE);

//	return true;
//}

////-------------------------------------------------------------
//*/



//}
//export = CMainMenuState;