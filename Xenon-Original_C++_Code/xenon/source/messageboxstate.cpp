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

#include "game.h"

//-------------------------------------------------------------

CMessageBoxState *CMessageBoxState::m_instance = 0;

const char *CMessageBoxState::m_message = 0;
const char *CMessageBoxState::m_yes_option = 0;
const char *CMessageBoxState::m_no_option = 0;
CGameState *CMessageBoxState::m_yes_state = 0;
CGameState *CMessageBoxState::m_no_state = 0;
bool CMessageBoxState::m_restart = false;

//-------------------------------------------------------------

CMessageBoxState::CMessageBoxState()
{
}

//-------------------------------------------------------------

CMessageBoxState::~CMessageBoxState()
{
}

//-------------------------------------------------------------

CGameState *CMessageBoxState::instance()
{
	if (!m_instance)
		m_instance = new CMessageBoxState;

	return m_instance;
}

//-------------------------------------------------------------

void CMessageBoxState::setup(const char *message,const char *yes_option,CGameState *yes_state,
							 const char *no_option,CGameState *no_state,bool restart_on_yes)
{
	m_message = message;
	m_yes_option = yes_option;
	m_no_option = no_option;
	m_yes_state = yes_state;
	m_no_state = no_state;
	m_restart = restart_on_yes;
}

//-------------------------------------------------------------

bool CMessageBoxState::create()
{
	m_menu.clear();

	m_menu.addSelection(m_yes_option);

	if (m_no_option)
		m_menu.addSelection(m_no_option);

	m_menu.setWrap(true);
	m_menu.setPosition(gsCPoint(0,150));
	m_menu.setSpacing(gsCPoint(0,30));
	m_menu.setCurrentItem(MB_YES);
	m_menu.setFont(&m_medium_font);

	return true;
}

//-------------------------------------------------------------

bool CMessageBoxState::update()
{
	if (!CGameState::update())
		return false;

	if (Options.getOption(OPTION_BACKDROP))
		m_backdrop.draw(gsCPoint(0,0));
	else
		m_screen.clear(gsCColour(gsBLACK));

	m_starfield.move(4);
	m_starfield.draw();

	m_medium_font.setTextCursor(gsCPoint(0,50));
	m_medium_font.justifyString(m_message);

	m_menu.draw();
	
	m_screen.flip();

	MessageBoxItem item = (MessageBoxItem) m_menu.getCurrentItem();

	switch (getKey()) {
		case gsKEY_RETURN:
		case gsKEY_ENTER:
		case gsKEY_LCONTROL:
			if (item == MB_YES) {
				if (m_yes_state)
					return changeState(m_yes_state);
				else {
					if (m_restart)
						gsCApplication::requestRestart();
					return false;
					}
				}
			if (item == MB_NO) {
				if (m_no_state)
					return changeState(m_no_state);
				else
					return false;
				}
			break;
		case gsKEY_UP:
			CGameState::playSample(SAMPLE_MENU_SELECTION);
			m_menu.scroll(-1);
			break;
		case gsKEY_DOWN:
			CGameState::playSample(SAMPLE_MENU_SELECTION);
			m_menu.scroll(1);
			break;
		}

	return true;
}

//-------------------------------------------------------------
