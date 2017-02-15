import CScene = require("Scene");
import gsCFont = require("Font");
import gsCPoint = require("Point");

//-------------------------------------------------------------

enum GameMusicType {
    MUSIC_TITLE,
    MUSIC_INTRO,
    MUSIC_GAME,
    MUSIC_HISCORE,
    MUSIC_BOSS,
    MUSIC_OUTRO,
}

//-------------------------------------------------------------

enum GameSampleType {
    SAMPLE_MENU_SELECTION,
    SAMPLE_MENU_OPTION,
    SAMPLE_MENU_CLICK,
    SAMPLE_MENU_BACK,

    SAMPLE_PLAYER_CREATED,
    SAMPLE_PLAYER_DESTROYED,

    SAMPLE_FIRE_MISSILE,
    SAMPLE_FIRE_HOMING_MISSILE,
    SAMPLE_FIRE_LASER,

    SAMPLE_SMALL_EXPLOSION,
    SAMPLE_MEDIUM_EXPLOSION,
    SAMPLE_BIG_EXPLOSION,

    SAMPLE_ASTEROID_BREAKUP,

    SAMPLE_PICKUP,
    SAMPLE_BONUS,

    SAMPLE_DIVE_DOWN,
    SAMPLE_DIVE_UP,

    SAMPLE_HIT_BACKGROUND,

    SAMPLE_ROAR,
    SAMPLE_SNORT,

    SAMPLE_CHECKPOINT,
}

//-------------------------------------------------------------

enum DemoMode {
    DEMO_OFF,
    DEMO_RECORD,
    DEMO_PLAYBACK
}

//-------------------------------------------------------------

enum ControllerType {
    KEYBOARD_LAYOUT_1,
    KEYBOARD_LAYOUT_2,
    JOYSTICK_1,
    JOYSTICK_2,
}

class CGameState {
    //gsCScreen		m_screen;
    //gsCKeyboard		m_keyboard;
    //gsCJoystick		m_joystick;
    //gsCSoundSystem	m_sound_system;

    m_small_font: gsCFont;
    m_medium_font: gsCFont;
    //gsCStarfield	m_starfield;
    //gsCScoreTable	m_score_table;
    //gsCImage		m_backdrop;

    //char			m_level_filename[MAX_FILENAME_SIZE];

    //CLevel			m_level;
    m_scene: CScene;
    //CXenon *		m_xenon = 0;

    m_number_of_players: number = 1;

    //CDemoRecorder	m_demo_recorder;
    //DemoMode		m_demo_mode = DEMO_OFF;

    MAX_FILENAME_SIZE: number = 100;

    //-------------------------------------------------------------

    NUMBER_OF_SCORE_ENTRIES: number = 10;

    //-------------------------------------------------------------

    constructor() {
    }

    //-------------------------------------------------------------

    public initialize(xenon /*CXenon **/): boolean {
        //    m_xenon = xenon;

        //    gsCFile::setDirectory(DIRECTORY_ROOT);

        //    Options.load(OPTIONS_FILENAME);

        //    if (!ActorInfoList.load(ACTORINFO_FILENAME))
        //        return false;

        //    if (!m_sound_system.create())
        //        return false;

        //    updateVolume();

        //    if (!m_keyboard.create())
        //        return false;

        //    // joystick is optional

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

        //    // pre-load music/soundfx

        //    gsCFile::setDirectory(DIRECTORY_MUSIC);

        //    if (!loadMusic())
        //        return false;

        //    gsCFile::setDirectory(DIRECTORY_SOUNDS);

        //    if (!loadSoundEffects())
        //        return false;

        //    // pre-load graphics

        //    if (m_screen.getBytesPerPixel() == 1)
        //        gsCFile::setDirectory(DIRECTORY_GRAPHICS8);
        //    else
        //        gsCFile::setDirectory(DIRECTORY_GRAPHICS24);

        //    if (!loadGraphics())
        //        return false;

        //    m_starfield.initialize(8);

        //    loadScoreTable();

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
        //saveScoreTable();

        //m_level.m_image.destroy();

        ////	m_backdrop_tiles.destroy();
        //m_backdrop.destroy();

        //m_medium_font.destroy();
        //m_small_font.destroy();

        //m_scene.destroyAll();

        //m_screen.destroy();

        //m_joystick.destroy();
        //m_keyboard.destroy();

        //m_sound_system.destroy();

        return true;
    }

    //-------------------------------------------------------------

    public changeState(new_game_state/*CGameState * */): boolean {
        //if (m_xenon)
        //    return m_xenon ->changeState(new_game_state);

        return false;
    }

    //-------------------------------------------------------------

    public create(): boolean {
        return true;
    }

    //-------------------------------------------------------------

    //public update(): boolean {
    //    return true;
    //}

    //-------------------------------------------------------------

    public destroy(): boolean {
        return true;
    }

    //-------------------------------------------------------------

    public loadGraphics(): boolean {
        //if (!m_scene.loadImages())
        //    return false;

        if (!this.m_small_font.load("font8x8.bmp"))
            return false;

        this.m_small_font.setTileSize(new gsCPoint(8, 8));
        //this.m_small_font.enableColourKey(gsCColour(gsMAGENTA));

        //if (!m_medium_font.load("font16x16.bmp"))
        //    return false;

        //m_medium_font.setTileSize(gsCPoint(16, 16));
        //m_medium_font.enableColourKey(gsCColour(gsMAGENTA));

        //CLabel::setFont(&m_small_font);

        //if (!m_backdrop.load("galaxy2.bmp"))
        //    return false;

        return true;
    }

    //-------------------------------------------------------------

    public loadMusic(): boolean {
        //m_sound_system.addMusic("title.mp3");
        //m_sound_system.addMusic("intro.mp3");
        //m_sound_system.addMusic("game.mp3");
        //m_sound_system.addMusic("hiscore.mp3");
        //m_sound_system.addMusic("boss.mp3");
        //m_sound_system.addMusic("outro.mp3");

        return true;
    }

    //-------------------------------------------------------------

    public loadSoundEffects(): boolean {
        //m_sound_system.addSample("menu_selection.wav");
        //m_sound_system.addSample("menu_option.wav");
        //m_sound_system.addSample("menu_click.wav");
        //m_sound_system.addSample("menu_back.wav");

        //m_sound_system.addSample("player_created.wav");
        //m_sound_system.addSample("player_destroyed.wav");
        //m_sound_system.addSample("fire_missile.wav");
        //m_sound_system.addSample("fire_homing_missile.wav");
        //m_sound_system.addSample("fire_laser.wav");
        //m_sound_system.addSample("small_explosion.wav");
        //m_sound_system.addSample("medium_explosion.wav");
        //m_sound_system.addSample("big_explosion.wav");
        //m_sound_system.addSample("asteroid_breakup.wav");
        //m_sound_system.addSample("pickup.wav");
        //m_sound_system.addSample("bonus.wav");
        //m_sound_system.addSample("dive_down.wav");
        //m_sound_system.addSample("dive_up.wav");
        //m_sound_system.addSample("hit_background.wav");

        //m_sound_system.addSample("roar.wav");
        //m_sound_system.addSample("snort.wav");

        //m_sound_system.addSample("checkpoint.wav");

        return true;
    }

    //-------------------------------------------------------------

    public updateVolume(): void {
        //m_sound_system.setVolume(Options.getOption(OPTION_MUSIC) * 10,
        //			 Options.getOption(OPTION_SOUNDFX) * 10);
    }

    //-------------------------------------------------------------

    public addNewScore(score: number): boolean {
        //int pos = m_score_table.insertScore(score, "A");

        //if (pos == -1)
        //    return false;

        //m_score_table.setCurrentItem(pos);
        //m_score_table.setCurrentLetter(0);

        return true;
    }

    //-------------------------------------------------------------

    public getApplication() /*:gsCApplication*/ {
        //return m_xenon;
    }

    //-------------------------------------------------------------

    public playSample(sample/*GameSampleType */): void {
        //if (Options.getOption(OPTION_SOUNDFX))
        //    m_sound_system.playSample((int) sample);
    }

    //-------------------------------------------------------------
    // play sample with stereo position based on screen x coordinate

    //    public playSample(sample /*GameSampleType*/, x:number): void
    //{
    //    //if (Options.getOption(OPTION_SOUNDFX)) {
    //    //    int w2 = gsCApplication::getScreen() ->getSize().getX() / 2;
    //    //    m_sound_system.playSample((int) sample, 100 * ((int) x - w2) / w2);
    //    //}
    //}

    //-------------------------------------------------------------

    public playMusic(music/*: GameMusicType*/): void {
        //if (Options.getOption(OPTION_MUSIC))
        //    m_sound_system.playMusic((int) music);
    };

    //-------------------------------------------------------------

    public stopSamples(): void {
        //m_sound_system.stopSamples();
    }

    //-------------------------------------------------------------

    public stopMusic(): void {
        //m_sound_system.stopMusic();
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
        //m_demo_mode = mode;

        //switch (mode) {
        //    case DEMO_RECORD:
        //        m_demo_recorder.record();
        //        break;
        //    case DEMO_PLAYBACK:
        //        m_demo_recorder.playback();
        //        break;
        //}
    }

    //-------------------------------------------------------------

    public loadScoreTable(): void {
        //   m_score_table.setSize(NUMBER_OF_SCORE_ENTRIES);
        //   m_score_table.setPosition(gsCPoint(0, 150));
        //   m_score_table.setSpacing(gsCPoint(0, 20));
        //   m_score_table.setFont(&m_medium_font);

        //   gsCFile::setDirectory(DIRECTORY_ROOT);

        //   if (!gsCFile::exists(HISCORE_FILENAME)) {
        //       m_score_table.insertScore(5000000, "JMP");
        //       m_score_table.insertScore(4500000, "EJB");
        //       m_score_table.insertScore(4000000, "MJM");
        //       m_score_table.insertScore(3500000, "CM");
        //       m_score_table.insertScore(3000000, "MC");
        //       m_score_table.insertScore(2500000, "AH");
        //       m_score_table.insertScore(2000000, "JB");
        //       m_score_table.insertScore(1500000, "DC");
        //       m_score_table.insertScore(1000000, "JK");
        //       m_score_table.insertScore(500000, "SW");
        //   }
        //else {
        //       gsCIniFile file;

        //       file.open(HISCORE_FILENAME);

        //       for (int i = 0; i < NUMBER_OF_SCORE_ENTRIES; i++) {
        //           char buf[10];
        //           sprintf(buf, "Entry%i", i);
        //           int score = file.readInt(buf, "Score", 0);
        //           const char *name = file.readString(buf, "Name", "JMP");
        //           m_score_table.insertScore(score, name);
        //       }

        //       file.close();
        //   }
    }

    //-------------------------------------------------------------

    public saveScoreTable(): boolean {
        //gsCFile::setDirectory(DIRECTORY_ROOT);

        //gsCIniFile file;

        //if (!file.open(HISCORE_FILENAME))
        //    return false;

        //for (int i = 0; i < NUMBER_OF_SCORE_ENTRIES; i++) {
        //    char buf[10];
        //    sprintf(buf, "Entry%i", i);
        //    file.writeInt(buf, "Score", m_score_table.getScore(i));
        //    char name[gsSCORE_NAME_SIZE + 1];
        //    memcpy(name, m_score_table.getName(i), gsSCORE_NAME_SIZE);
        //    name[gsSCORE_NAME_SIZE] = 0;
        //    file.writeString(buf, "Name", name);
        //}

        //file.close();

        return true;
    }

    //-------------------------------------------------------------

}
export = CGameState;