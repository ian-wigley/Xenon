//-------------------------------------------------------------
//
// Class:	CMainMenuState
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

#ifndef _INCLUDE_MAINMENUSTATE_H
#define _INCLUDE_MAINMENUSTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

class CMainMenuState : public CGameState
{
	private:

		static CMainMenuState *m_instance;

		enum { UNKNOWN,ON,OFF } m_attract_mode;
		gsCTimer m_attract_mode_timer;

		gsCMenu m_menu;

		typedef enum
		{
			MM_ONEPLAYER,
			MM_TWOPLAYER,
			MM_SCORES,
			MM_OPTIONS,
			MM_CREDITS,
			MM_QUIT
		} MainMenuItem;

		static gsCImage m_bblogo;
		static gsCImage m_pcflogo;
		static gsCImage m_title;
		
	public:
		CMainMenuState();
		~CMainMenuState();

		static CGameState *instance();

		bool create();
		bool destroy();
		bool update();
};

//-------------------------------------------------------------

#endif

