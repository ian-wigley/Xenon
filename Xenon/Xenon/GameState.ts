import CScene = require("Scene");
import gsCFont = require("Font");
import gsCPoint = require("Point");
import gsCScoreTable = require("ScoreTable");
import gsCControls = require("Controls");
import enums = require("Enums");
import COptions = require("Options");
import CApplication = require("Application");
import CStarfield = require("Starfield");
import CMainMenuState = require("MainMenuState");
import gsCMenu = require("Menu");
import gsCSoundSystem = require("SoundSystem");

class CGameState {
    protected m_small_font: gsCFont;
    protected m_medium_font: gsCFont;
    protected m_font8x8: HTMLImageElement;
    protected m_font16x16: HTMLImageElement
    protected m_ctx: CanvasRenderingContext2D;
    protected m_starfield: CStarfield;
    protected m_mainMenuState: CMainMenuState;
    protected m_menu: gsCMenu;
    protected m_score_table: gsCScoreTable;
    protected m_scene: CScene;
    protected m_number_of_players: number = 1;
    protected m_state: CGameState;
    protected m_demo_mode: enums.DemoMode;
    protected m_options: COptions;
    protected introTexture: HTMLImageElement;
    protected bbTexture: HTMLImageElement;
    protected backgroundTexture: HTMLImageElement;
    protected m_stateName: string = "";
    protected m_app: CApplication;

    protected m_sound_system: gsCSoundSystem;

    //gsCScreen		m_screen;
    //gsCKeyboard		m_keyboard;
    //gsCJoystick		m_joystick;
    //gsCSoundSystem	m_sound_system;
    //gsCImage		m_backdrop;
    //char			m_level_filename[MAX_FILENAME_SIZE];
    //CLevel			m_level;
    //CXenon *		m_xenon = 0;
    //CDemoRecorder	m_demo_recorder;
    //DemoMode		m_demo_mode = DEMO_OFF;

    //-------------------------------------------------------------

    MAX_FILENAME_SIZE: number = 100;

    //-------------------------------------------------------------

    NUMBER_OF_SCORE_ENTRIES: number = 10;

    //-------------------------------------------------------------

    constructor(font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D) {
        this.m_font8x8 = font8x8;
        this.m_font16x16 = font16x16;
        this.m_app = app;
        this.m_ctx = ctx;

        this.m_sound_system = new gsCSoundSystem();
        this.m_options = new COptions();
        this.initialize(null);
    }

    //-------------------------------------------------------------

    public initialize(xenon /*CXenon **/): boolean {
        //    m_xenon = xenon;

        //    gsCFile::setDirectory(DIRECTORY_ROOT);
        //    Options.load(OPTIONS_FILENAME);

        //    if (!ActorInfoList.load(ACTORINFO_FILENAME))
        //        return false;

        if (!this.m_sound_system.create()) {
            return false;
        }

        //    updateVolume();

        //    if (!m_keyboard.create())
        //        return false;

        // joystick is optional

        //    if (Options.getOption(OPTION_JOYSTICK)) {
        //        if (!m_joystick.create())
        //            m_joystick.destroy();
        //    }

        //    if (Options.getOption(OPTION_WINDOWED)) {
        //        if (!m_screen.createWindowed(m_xenon ->getWindow()))
        //            return false;
        //    }
        //    else {
        //        int colour_depth = Options.getOption(OPTION_COLOURDEPTH);

        //        gsCPoint res;

        //        //		if (Options.getOption(OPTION_HIRES))
        //        res = gsCPoint(640, 480);
        //        //		else
        //        //			res = gsCPoint(320,240);

        //        if (!m_screen.createFullScreen(m_xenon ->getWindow(), res, colour_depth))
        //            return false;
        //    }

        //    if (m_screen.getBytesPerPixel() == 1) {
        //        gsCFile::setDirectory(DIRECTORY_GRAPHICS8);
        //        m_screen.loadPalette("xenon.pal");
        //    }

        // pre-load music/soundfx
        if (!this.loadMusic()) {
            return false;
        }

        if (!this.loadSoundEffects()) {
            return false;
        }

        // pre-load graphics
        if (!this.loadGraphics())
            return false;

        //    m_starfield.initialize(8);
        this.m_score_table = new gsCScoreTable();
        this.loadScoreTable();

        this.backgroundTexture = <HTMLImageElement>document.getElementById("galaxy2");

        //    #ifdef _PROFILING
        //    strcpy(m_level_filename, "test.fmp");
        //    m_xenon ->changeState(CPlayGameState::instance());
        //    #else
        //m_xenon->changeState(CMainMenuState::instance());
        //#endif

        return true;
    }

    //-------------------------------------------------------------

    public shutdown(): boolean {
        return true;
    }

    //-------------------------------------------------------------

    public changeState(new_game_state/*CGameState * */): boolean {
        return this.m_state = new_game_state;
    }

    //-------------------------------------------------------------

    public create(): boolean {
        return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: gsCControls): boolean {
        return true;
    }

    //-------------------------------------------------------------

    public destroy(): boolean {
        return true;
    }

    //-------------------------------------------------------------

    public loadGraphics(): boolean {

        this.m_small_font = new gsCFont(this.m_font8x8, this.m_ctx);
        this.m_small_font.setTileSize(new gsCPoint(8, 8));
        //this.m_small_font.enableColourKey(gsCColour(gsMAGENTA));

        this.m_medium_font = new gsCFont(this.m_font16x16, this.m_ctx);
        this.m_medium_font.setTileSize(new gsCPoint(16, 16));
        //this.m_medium_font.enableColourKey(gsCColour(gsMAGENTA));

        return true;
    }

    //-------------------------------------------------------------

    public loadMusic(): boolean {

        this.m_sound_system.addMusic("boss");
        this.m_sound_system.addMusic("game");
        this.m_sound_system.addMusic("hiscore");
        this.m_sound_system.addMusic("intro");
        this.m_sound_system.addMusic("outro");
        this.m_sound_system.addMusic("title");
        return true;
    }

    //-------------------------------------------------------------

    public loadSoundEffects(): boolean {

        this.m_sound_system.addSample("menu_selection");
        this.m_sound_system.addSample("menu_option");
        this.m_sound_system.addSample("menu_click");
        this.m_sound_system.addSample("menu_back");
        this.m_sound_system.addSample("player_created");
        this.m_sound_system.addSample("player_destroyed");
        this.m_sound_system.addSample("fire_missile");
        this.m_sound_system.addSample("fire_homing_missile");
        this.m_sound_system.addSample("fire_laser");
        this.m_sound_system.addSample("small_explosion");
        this.m_sound_system.addSample("medium_explosion");
        this.m_sound_system.addSample("big_explosion");
        this.m_sound_system.addSample("asteroid_breakup");
        this.m_sound_system.addSample("pickup");
        this.m_sound_system.addSample("bonus");
        this.m_sound_system.addSample("dive_down");
        this.m_sound_system.addSample("dive_up");
        this.m_sound_system.addSample("hit_background");
        this.m_sound_system.addSample("roar");
        this.m_sound_system.addSample("snort");
        this.m_sound_system.addSample("checkpoint");
        return true;
    }

    //-------------------------------------------------------------

    public updateVolume(): void {
        //m_sound_system.setVolume(Options.getOption(OPTION_MUSIC) * 10,
        //			 Options.getOption(OPTION_SOUNDFX) * 10);
    }

    //-------------------------------------------------------------

    public addNewScore(score: number): boolean {
        var pos = this.m_score_table.insertScore(score, "A");

        if (pos == -1) {
            return false;
        }
        this.m_score_table.setCurrentItem(pos);
        this.m_score_table.setCurrentLetter(0);
        return true;
    }

    //-------------------------------------------------------------

    public getApplication() /*:gsCApplication*/ {
        //return m_xenon;
    }

    //-------------------------------------------------------------

    //public playSample(sample/*GameSampleType */): void {
    //    if (Options.getOption(OPTION_SOUNDFX)) {
    //        m_sound_system.playSample((int) sample); }
    //}

    //-------------------------------------------------------------

    // play sample with stereo position based on screen x coordinate
    public playSample(sample /*GameSampleType*/, x?: number): void {
        if (this.m_options.getOption(enums.OptionType.OPTION_SOUNDFX)) {
            //        int w2 = gsCApplication::getScreen() ->getSize().getX() / 2;
            //        m_sound_system.playSample((int) sample, 100 * ((int) x - w2) / w2);
            this.m_sound_system.playSample(<number>sample, 0);
        }
    }

    //-------------------------------------------------------------

    public playMusic(music/*: GameMusicType*/): void {
        if (this.m_options.getOption(enums.OptionType.OPTION_MUSIC)) {
            this.m_sound_system.playMusic(music);
        }
    }

    //-------------------------------------------------------------

    public stopSamples(): void {
        this.m_sound_system.stopSamples();
    }

    //-------------------------------------------------------------

    public stopMusic(): void {
        this.m_sound_system.stopMusic();
    }

    //-------------------------------------------------------------

    public getKey()/*:gsKeyCode*/ {
        //gsKeyCode key = m_keyboard.getKey();

        //if (key == gsKEY_NONE && Options.getOption(OPTION_JOYSTICK) == 1) {
        //    if (m_joystick.getNumSticks() > 0) {
        //        gsJoystickCode code = m_joystick.getEmulatedKey();

        //        switch (code) {
        //            case gsJOY_LEFT: key = gsKEY_LEFT; break;
        //            case gsJOY_RIGHT: key = gsKEY_RIGHT; break;
        //            case gsJOY_UP: key = gsKEY_UP; break;
        //            case gsJOY_DOWN: key = gsKEY_DOWN; break;
        //            case gsJOY_BUTTON0: key = gsKEY_LCONTROL; break;
        //        }
        //    }
        //}

        //return key;
    }

    //-------------------------------------------------------------

    public getControl(controls /*:Controls*/, player: number): void {
        //   ControllerType type;

        //   if (player == 0)
        //       type = (ControllerType) Options.getOption(OPTION_CONTROL1);
        //else
        //   type = (ControllerType) Options.getOption(OPTION_CONTROL2);

        //   // safety

        //   switch (type) {
        //       case JOYSTICK_1:
        //           if (m_joystick.getNumSticks() < 1)
        //               type = KEYBOARD_LAYOUT_1;
        //           break;
        //       case JOYSTICK_2:
        //           if (m_joystick.getNumSticks() < 2)
        //               type = KEYBOARD_LAYOUT_1;
        //           break;
        //   }

        //   switch (type) {
        //       case KEYBOARD_LAYOUT_1:
        //           controls.left = m_keyboard.testKey(gsKEY_LEFT);
        //           controls.right = m_keyboard.testKey(gsKEY_RIGHT);
        //           controls.up = m_keyboard.testKey(gsKEY_UP);
        //           controls.down = m_keyboard.testKey(gsKEY_DOWN);
        //           controls.fire = m_keyboard.testKey(gsKEY_LCONTROL, gsKEY_STATE);
        //           controls.firePressed = m_keyboard.testKey(gsKEY_LCONTROL, gsKEY_PRESSED);
        //           controls.divePressed = m_keyboard.testKey(gsKEY_LSHIFT, gsKEY_PRESSED);
        //           controls.reversePressed = m_keyboard.testKey(gsKEY_ALT, gsKEY_PRESSED);
        //           break;

        //       case KEYBOARD_LAYOUT_2:
        //           controls.left = m_keyboard.testKey(gsKEY_LEFT);
        //           controls.right = m_keyboard.testKey(gsKEY_RIGHT);
        //           controls.up = m_keyboard.testKey(gsKEY_UP);
        //           controls.down = m_keyboard.testKey(gsKEY_DOWN);
        //           controls.fire = m_keyboard.testKey(gsKEY_A, gsKEY_STATE);
        //           controls.firePressed = m_keyboard.testKey(gsKEY_A, gsKEY_PRESSED);
        //           controls.divePressed = m_keyboard.testKey(gsKEY_D, gsKEY_PRESSED);
        //           controls.reversePressed = m_keyboard.testKey(gsKEY_S, gsKEY_PRESSED);
        //           break;

        //       case JOYSTICK_1:
        //           controls.left = m_joystick.testButton(gsJOY_LEFT);
        //           controls.right = m_joystick.testButton(gsJOY_RIGHT);
        //           controls.up = m_joystick.testButton(gsJOY_UP);
        //           controls.down = m_joystick.testButton(gsJOY_DOWN);
        //           controls.fire = m_joystick.testButton(gsJOY_BUTTON0);
        //           controls.firePressed = m_joystick.testButtonPressed(gsJOY_BUTTON0);
        //           controls.divePressed = m_joystick.testButtonPressed(gsJOY_BUTTON1);
        //           controls.reversePressed = m_joystick.testButtonPressed(gsJOY_BUTTON2);
        //           break;

        //       case JOYSTICK_2:
        //           controls.left = m_joystick.testButton(gsJOY_LEFT, 1);
        //           controls.right = m_joystick.testButton(gsJOY_RIGHT, 1);
        //           controls.up = m_joystick.testButton(gsJOY_UP, 1);
        //           controls.down = m_joystick.testButton(gsJOY_DOWN, 1);
        //           controls.fire = m_joystick.testButton(gsJOY_BUTTON0, 1);
        //           controls.firePressed = m_joystick.testButtonPressed(gsJOY_BUTTON0, 1);
        //           controls.divePressed = m_joystick.testButtonPressed(gsJOY_BUTTON1, 1);
        //           controls.reversePressed = m_joystick.testButtonPressed(gsJOY_BUTTON2, 1);
        //           break;
        //   }
    }

    //-------------------------------------------------------------

    public setDemoMode(mode /*:DemoMode */): void {
        this.m_demo_mode = mode;

        switch (mode) {
            case enums.DemoMode.DEMO_RECORD:
                //this.m_demo_recorder.record();
                break;
            case enums.DemoMode.DEMO_PLAYBACK:
                //this.m_demo_recorder.playback();
                break;
        }
    }

    //-------------------------------------------------------------

    public loadScoreTable(): void {
        this.m_score_table.setSize(this.NUMBER_OF_SCORE_ENTRIES);
        this.m_score_table.setPosition(new gsCPoint(0, 150));
        this.m_score_table.setSpacing(new gsCPoint(0, 20));
        this.m_score_table.setFont(this.m_medium_font);

        this.m_score_table.insertScore(5000000, "JMP");
        this.m_score_table.insertScore(4500000, "EJB");
        this.m_score_table.insertScore(4000000, "MJM");
        this.m_score_table.insertScore(3500000, "CM");
        this.m_score_table.insertScore(3000000, "MC");
        this.m_score_table.insertScore(2500000, "AH");
        this.m_score_table.insertScore(2000000, "JB");
        this.m_score_table.insertScore(1500000, "DC");
        this.m_score_table.insertScore(1000000, "JK");
        this.m_score_table.insertScore(500000, "SW");
    }

    //-------------------------------------------------------------

    public saveScoreTable(): boolean {
        return true;
    }

    //-------------------------------------------------------------

}
export = CGameState;