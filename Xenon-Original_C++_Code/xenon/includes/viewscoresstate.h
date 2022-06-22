//-------------------------------------------------------------
//
// Class:	CViewScoresState
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

#ifndef _INCLUDE_VIEWSCORESSTATE_H
#define _INCLUDE_VIEWSCORESSTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

class CViewScoresState : public CGameState
{
	private:
		static CViewScoresState *m_instance;

	public:
		CViewScoresState();
		~CViewScoresState();

		static CGameState *instance();
		
		bool create();
		bool update();
};

//-------------------------------------------------------------

#endif

