//-------------------------------------------------------------
//
// Class:	CMessageBoxState
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

#ifndef _INCLUDE_MESSAGEBOXSTATE_H
#define _INCLUDE_MESSAGEBOXSTATE_H

#include "gamestate.h"

//-------------------------------------------------------------

class CMessageBoxState : public CGameState
{
	private:

		static CMessageBoxState *m_instance;

		gsCMenu m_menu;

		typedef enum {
			MB_YES,
			MB_NO,
		} MessageBoxItem;

		static const char *m_message;
		static const char *m_yes_option;
		static const char *m_no_option;
		static CGameState *m_yes_state;
		static CGameState *m_no_state;
		static bool m_restart;

	public:
		CMessageBoxState();
		~CMessageBoxState();

		static CGameState *instance();

		static void setup(const char *message,const char *yes_option,CGameState *yes_state,
						  const char *no_option,CGameState *no_state,bool restart_on_yes = false);

		bool create();
		bool update();
};

//-------------------------------------------------------------

#endif

