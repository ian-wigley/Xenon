//-------------------------------------------------------------
//
// Class:	CPlayGameState
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CGameState
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_PLAYGAMESTATE_H
#define _INCLUDE_PLAYGAMESTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

const int PLAYER_START_OFFSET = 64;		// offset from bottom of screen

const int ENERGYBAR_WIDTH = 100;		// energy bar dimensions
const int ENERGYBAR_HEIGHT = 9;
const int ENERGYBAR_STEP = 5;			// marker spacing

//-------------------------------------------------------------

class CPlayGameState : public CGameState
{
	private:

		static CPlayGameState *m_instance;

		static gsCList<CPlayer *> m_player_list;

		void setLayerPositions(int ship_y);

		void testDebugKeys(gsKeyCode key);
		void displayScores();
		void displayLives();
		void displayEnergyBar();
		void displayBossEnergyBar();
		void printDebugInfo();

		CShip *m_ship;

		gsCTimer m_game_start_timer;
		gsCTimer m_game_end_timer;

		enum {
			CREATEPLAYER,
			PLAYERACTIVE,
			PLAYERDEAD,
			GAMEOVER,
			GAMEWON,
		} m_mode;

		static int m_active_player;
		static bool m_reached_boss;
		static bool m_fast_forward;
		static int m_yscroll;
		static bool m_paused;

	public:
		CPlayGameState();
		~CPlayGameState();

		static CGameState *instance();
		
		bool create();
		bool update();
		bool destroy();

		void createPlayer();

		static CPlayer *getPlayer();
		void swapPlayer();

		static bool reachedBoss();

		static int getYScroll();
};

//-------------------------------------------------------------

#endif

