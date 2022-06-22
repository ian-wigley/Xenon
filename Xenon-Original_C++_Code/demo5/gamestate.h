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

class CDemo5;

//-------------------------------------------------------------
// File directories

#define DIRECTORY_ROOT			"..\\..\\"
#define DIRECTORY_MUSIC			"..\\..\\music\\"
#define DIRECTORY_SOUNDS		"..\\..\\sounds\\"
#define DIRECTORY_GRAPHICS		"..\\..\\graphics\\24bit\\"
#define DIRECTORY_LEVELS		"..\\..\\Demo5\\Levels\\"

const int MAX_FILENAME_SIZE = 100;

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

class CGameState
{
	private:

		static CDemo5 *m_demo5;

	protected:

		static gsCScreen m_screen;
		static gsCKeyboard m_keyboard;
		static gsCSoundSystem m_sound_system;

		static gsCFont m_small_font;
		static gsCFont m_medium_font;
		static gsCStarfield m_starfield;

		static CLevel m_level;
		static CScene m_scene;

		static bool loadGraphics();
		static bool loadMusic();
		static bool loadSoundEffects();
		static void updateVolume();

		gsCApplication *getApplication();

	public:

		CGameState();
		virtual ~CGameState();

		static bool initialize(CDemo5 *demo5);
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

};

//-------------------------------------------------------------

#endif

