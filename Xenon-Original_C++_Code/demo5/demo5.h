//-------------------------------------------------------------
//
// Program:	Demo 5 Header File
//
// Author:	John M Phillips
//
// Started:	20/08/00
//
//-------------------------------------------------------------

#ifndef _INCLUDE_DEMO5_H
#define _INCLUDE_DEMO5_H

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
#include "asteroid.h"

#include "explosion.h"

#include "particleeffect.h"
#include "dusteffect.h"

#include "gamestate.h"
#include "playgamestate.h"

//-------------------------------------------------------------

class CDemo5 : public gsCApplication
{
	private:
		CGameState *m_game_state;

	protected:
		friend class CGameState;

		bool changeState(CGameState *new_game_state);

	public:

		CDemo5(const char *app_name) : gsCApplication(app_name) { };
		~CDemo5() { };

		bool initialize();
		bool mainloop();
		bool shutdown();
};

//-------------------------------------------------------------

#endif

