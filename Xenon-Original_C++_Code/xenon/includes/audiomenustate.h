//-------------------------------------------------------------
//
// Class:	CAudioMenuState
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

#ifndef _INCLUDE_AUDIOMENUSTATE_H
#define _INCLUDE_AUDIOMENUSTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

class CAudioMenuState : public CGameState
{
	private:

		static CAudioMenuState *m_instance;

		gsCMenu m_menu;

		typedef enum {
			OM_MUSIC,
			OM_SOUNDFX,
			OM_SEPERATOR,
			OM_APPLY,
			OM_CANCEL
		} AudioMenuItem;

		void copyOptionsToMenu();
		void copyMenuToOptions();

	public:
		CAudioMenuState();
		~CAudioMenuState();

		static CGameState *instance();
		
		bool create();
		bool update();
};

//-------------------------------------------------------------

#endif

