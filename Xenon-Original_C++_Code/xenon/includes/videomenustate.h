//-------------------------------------------------------------
//
// Class:	CVideoMenuState
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

#ifndef _INCLUDE_VIDEOMENUSTATE_H
#define _INCLUDE_VIDEOMENUSTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

class CVideoMenuState : public CGameState
{
	private:

		static CVideoMenuState *m_instance;

		gsCMenu m_menu;

		typedef enum {
			OM_HIRES,
			OM_WINDOWED,
			OM_COLOURDEPTH,
			OM_PARTICLEFX,
			OM_BACKDROP,
			OM_SEPERATOR,
			OM_APPLY,
			OM_CANCEL
		} VideoMenuItem;

		void copyOptionsToMenu();
		void copyMenuToOptions();

	public:
		CVideoMenuState();
		~CVideoMenuState();

		static CGameState *instance();
		
		bool create();
		bool update();
};

//-------------------------------------------------------------

#endif
