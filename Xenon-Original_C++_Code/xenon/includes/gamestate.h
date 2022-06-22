//-------------------------------------------------------------
//
// Class:	CGameState
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	None
//
// Derived:	CMainMenuState
//			COptionsMenuState
//			CPlayGameState
//			CScoreEntryState
//			CScoreTableState
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GAMESTATE_H
#define _INCLUDE_GAMESTATE_H

//-------------------------------------------------------------

class CXenon;

//-------------------------------------------------------------
// Files

#define OPTIONS_FILENAME		"options.ini"
#define ACTORINFO_FILENAME		"actors.ini"
#define HISCORE_FILENAME		"hiscore.ini"
#define DEMO_FILENAME			"xenon2000.dem"

//-------------------------------------------------------------
// File directories

#define DIRECTORY_ROOT			"..\\..\\"
#define DIRECTORY_MUSIC			"..\\..\\music\\"
#define DIRECTORY_SOUNDS		"..\\..\\sounds\\"
#define DIRECTORY_GRAPHICS8		"..\\..\\graphics\\8bit\\"
#define DIRECTORY_GRAPHICS24	"..\\..\\graphics\\24bit\\"
#define DIRECTORY_LEVELS		"..\\..\\levels\\"

const int MAX_FILENAME_SIZE = 100;

//-------------------------------------------------------------

const int NUMBER_OF_SCORE_ENTRIES = 10;

//-------------------------------------------------------------

typedef enum
{
	MUSIC_TITLE,
	MUSIC_INTRO,
	MUSIC_GAME,
	MUSIC_HISCORE,
	MUSIC_BOSS,
	MUSIC_OUTRO,
} GameMusicType;

//-------------------------------------------------------------

typedef enum
{
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

} GameSampleType;

//-------------------------------------------------------------

typedef enum
{
	DEMO_OFF,
	DEMO_RECORD,
	DEMO_PLAYBACK
} DemoMode;

//-------------------------------------------------------------

typedef enum
{
	KEYBOARD_LAYOUT_1,
	KEYBOARD_LAYOUT_2,
	JOYSTICK_1,
	JOYSTICK_2,
} ControllerType;

//-------------------------------------------------------------

class CGameState
{
	private:

		static CXenon *m_xenon;

	protected:

		static gsCScreen m_screen;
		static gsCKeyboard m_keyboard;
		static gsCJoystick m_joystick;
		static gsCSoundSystem m_sound_system;

		static gsCFont m_small_font;
		static gsCFont m_medium_font;
		static gsCStarfield m_starfield;
		static gsCScoreTable m_score_table;
		static gsCImage m_backdrop;

		static char m_level_filename[MAX_FILENAME_SIZE];

		static CLevel m_level;
		static CScene m_scene;

		static int m_number_of_players;

		static bool loadGraphics();
		static bool loadMusic();
		static bool loadSoundEffects();
		static void loadScoreTable();
		static bool saveScoreTable();
		static bool addNewScore(int score);
		static void updateVolume();

		gsCApplication *getApplication();

		static CDemoRecorder m_demo_recorder;
		static DemoMode m_demo_mode;

	public:

		CGameState();
		virtual ~CGameState();

		static bool initialize(CXenon *xenon);
		static bool shutdown();

		bool changeState(CGameState *new_game_state);

		virtual bool create();
		virtual bool update();
		virtual bool destroy();

		gsKeyCode getKey();
		void getControl(Controls& controls,int player);

		static void playSample(GameSampleType sample);
		static void playSample(GameSampleType sample,float x);
		static void playMusic(GameMusicType music);

		static void stopSamples();
		static void stopMusic();

		static void setDemoMode(DemoMode mode);
};

//-------------------------------------------------------------

#endif

