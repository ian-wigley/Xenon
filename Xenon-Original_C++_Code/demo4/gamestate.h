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

class CDemo4;

//-------------------------------------------------------------
// File directories

#define DIRECTORY_ROOT			"..\\..\\"
#define DIRECTORY_GRAPHICS		"..\\..\\graphics\\24bit\\"
#define DIRECTORY_LEVELS		"..\\..\\Demo4\\Levels\\"

const int MAX_FILENAME_SIZE = 100;

//-------------------------------------------------------------

class CGameState
{
	private:

		static CDemo4 *m_demo4;

	protected:

		static gsCScreen m_screen;
		static gsCKeyboard m_keyboard;

		static gsCFont m_small_font;
		static gsCFont m_medium_font;
		static gsCStarfield m_starfield;

		static CLevel m_level;
		static CScene m_scene;

		static bool loadGraphics();

		gsCApplication *getApplication();

	public:

		CGameState();
		virtual ~CGameState();

		static bool initialize(CDemo4 *demo4);
		static bool shutdown();

		bool changeState(CGameState *new_game_state);

		virtual bool create();
		virtual bool update();
		virtual bool destroy();

		gsKeyCode getKey();
		void getControl(Controls& controls,int player);
};

//-------------------------------------------------------------

#endif

