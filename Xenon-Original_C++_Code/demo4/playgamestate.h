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

//-------------------------------------------------------------

class CPlayGameState : public CGameState
{
	private:

		static CPlayGameState *m_instance;

		void setLayerPositions(int ship_y);

		CShip *m_ship;

		enum {
			CREATEPLAYER,
			PLAYERACTIVE,
		} m_mode;

		static int m_yscroll;

	public:
		CPlayGameState();
		~CPlayGameState();

		static CGameState *instance();
		
		bool create();
		bool update();
		bool destroy();

		void createPlayer();

		static int getYScroll();
};

//-------------------------------------------------------------

#endif

