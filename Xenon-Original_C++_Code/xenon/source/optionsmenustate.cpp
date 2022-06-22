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

#include "game.h"

//-------------------------------------------------------------

COptionsMenuState *COptionsMenuState::m_instance = 0;

//-------------------------------------------------------------

COptionsMenuState::COptionsMenuState()
{
}

//-------------------------------------------------------------

COptionsMenuState::~COptionsMenuState()
{
}

//-------------------------------------------------------------

CGameState *COptionsMenuState::instance()
{
	if (!m_instance)
		m_instance = new COptionsMenuState;

	return m_instance;
}

//-------------------------------------------------------------

bool COptionsMenuState::create()
{
	m_menu.clear();

	m_menu.addSelection("Control Options");
	m_menu.addSelection("Video Options");
	m_menu.addSelection("Audio Options");

	m_menu.addSeperator();
	m_menu.addSelection("Back To Main Menu");

	m_menu.setWrap(true);
	m_menu.setPosition(gsCPoint(0,150));
	m_menu.setSpacing(gsCPoint(0,30));
	m_menu.setCurrentItem(OM_BACK);
	m_menu.setFont(&m_medium_font);

	return true;
}

//-------------------------------------------------------------

bool COptionsMenuState::update()
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
	m_medium_font.justifyString("Options Menu");

	m_menu.draw();
	
	m_screen.flip();

	OptionsMenuItem item = (OptionsMenuItem) m_menu.getCurrentItem();

	switch (getKey()) {
		case gsKEY_RETURN:
		case gsKEY_ENTER:
		case gsKEY_LCONTROL:
			switch (item) {
				case OM_CONTROL:
					CGameState::playSample(SAMPLE_MENU_SELECTION);
					return changeState(CControlMenuState::instance());
				case OM_VIDEO:
					CGameState::playSample(SAMPLE_MENU_SELECTION);
					return changeState(CVideoMenuState::instance());
				case OM_AUDIO:
					CGameState::playSample(SAMPLE_MENU_SELECTION);
					return changeState(CAudioMenuState::instance());
				case OM_BACK:
					CGameState::playSample(SAMPLE_MENU_BACK);
					return changeState(CMainMenuState::instance());
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

