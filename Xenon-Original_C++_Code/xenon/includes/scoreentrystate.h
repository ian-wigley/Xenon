//-------------------------------------------------------------
//
// Class:	CScoreEntryState
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

#ifndef _INCLUDE_SCOREENTRYSTATE_H
#define _INCLUDE_SCOREENTRYSTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

class CScoreEntryState : public CGameState
{
	private:
		static CScoreEntryState *m_instance;

		static char *m_congratulation_messages[NUMBER_OF_SCORE_ENTRIES];

	public:
		CScoreEntryState();
		~CScoreEntryState();

		static CGameState *instance();

		bool create();
		bool update();
};

//-------------------------------------------------------------

#endif

