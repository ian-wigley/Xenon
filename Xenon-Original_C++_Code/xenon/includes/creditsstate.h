//-------------------------------------------------------------
//
// Class:	CCreditsState
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

#ifndef _INCLUDE_CREDITSSTATE_H
#define _INCLUDE_CREDITSSTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

class CCreditsState : public CGameState
{
	private:

		static CCreditsState *m_instance;

		int m_scroll_pos;

	public:
		CCreditsState();
		~CCreditsState();

		static CGameState *instance();
		
		bool create();
		bool update();
		bool destroy();
};

//-------------------------------------------------------------

#endif

