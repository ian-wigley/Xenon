//-------------------------------------------------------------
//
// Module:	Xenon 2K
//
// Author:	John M Phillips
//
// Started:	05/05/00
//
//-------------------------------------------------------------

#ifndef _INCLUDE_XENON_H
#define _INCLUDE_XENON_H

#include "gamesystem.h"
#include "options.h"

//-------------------------------------------------------------

class CXenon : public gsCApplication
{
	private:
		CGameState *m_game_state;

	protected:
		friend class CGameState;

		bool changeState(CGameState *new_game_state);

	public:
		CXenon(const char *app_name) : gsCApplication(app_name) { };
		~CXenon() { };

		bool initialize();
		bool mainloop();
		bool shutdown();
};

//-------------------------------------------------------------

#endif
