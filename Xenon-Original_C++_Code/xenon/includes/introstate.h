//-------------------------------------------------------------
//
// Class:	CIntroState
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

#ifndef _INCLUDE_INTROSTATE_H
#define _INCLUDE_INTROSTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

class CIntroState : public CGameState
{
	private:
		static CIntroState *m_instance;

		gsCMenu m_menu;

		typedef enum {
			IM_TITLE,
			IM_SEPERATOR,
			IM_FIRSTFILE
		} IntroMenuItem;

		gsCList<char *> m_files;

	public:
		CIntroState();
		~CIntroState();

		static CGameState *instance();
		
		bool create();
		bool update();
		bool destroy();
};

//-------------------------------------------------------------

#endif
