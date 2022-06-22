//-------------------------------------------------------------
//
// Program:	Demo 4 Header File
//
// Author:	John M Phillips
//
// Started:	20/08/00
//
//-------------------------------------------------------------

#ifndef _INCLUDE_DEMO4_H
#define _INCLUDE_DEMO4_H

//-------------------------------------------------------------
// Include header for GameSystem library

#include "gamesystem.h"

//-------------------------------------------------------------
// Include main game headers

#include "level.h"

#include "actorinfo.h"

#include "actor.h"
#include "scene.h"

#include "ship.h"

#include "bullet.h"
#include "missile.h"

#include "weapon.h"
#include "missileweapon.h"

#include "alien.h"
#include "rusher.h"

#include "explosion.h"

#include "gamestate.h"
#include "playgamestate.h"

//-------------------------------------------------------------

class CDemo4 : public gsCApplication
{
	private:
		CGameState *m_game_state;

	protected:
		friend class CGameState;

		bool changeState(CGameState *new_game_state);

	public:

		CDemo4(const char *app_name) : gsCApplication(app_name) { };
		~CDemo4() { };

		bool initialize();
		bool mainloop();
		bool shutdown();
};

//-------------------------------------------------------------

#endif

