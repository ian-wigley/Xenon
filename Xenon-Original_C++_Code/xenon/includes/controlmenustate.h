//-------------------------------------------------------------
//
// Class:	CControlMenuState
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

#ifndef _INCLUDE_CONTROLMENUSTATE_H
#define _INCLUDE_CONTROLMENUSTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

class CControlMenuState : public CGameState
{
	private:

		static CControlMenuState *m_instance;

		gsCMenu m_menu;

		typedef enum {
			CM_CONTROL1,
			CM_CONTROL2,
			CM_SEPERATOR,
			CM_APPLY,
			CM_CANCEL
		} ControlMenuItem;

		void copyOptionsToMenu();
		void copyMenuToOptions();

	public:
		CControlMenuState();
		~CControlMenuState();

		static CGameState *instance();
		
		bool create();
		bool update();
};

//-------------------------------------------------------------

#endif

