//-------------------------------------------------------------
//
// Class:	COptionsMenuState
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

#ifndef _INCLUDE_OPTIONSMENUSTATE_H
#define _INCLUDE_OPTIONSMENUSTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

class COptionsMenuState : public CGameState
{
	private:

		static COptionsMenuState *m_instance;

		gsCMenu m_menu;

		typedef enum {
			OM_CONTROL,
			OM_VIDEO,
			OM_AUDIO,
			OM_SEPERATOR,
			OM_BACK
		} OptionsMenuItem;

	public:
		COptionsMenuState();
		~COptionsMenuState();

		static CGameState *instance();
		
		bool create();
		bool update();
};

//-------------------------------------------------------------

#endif

