//-------------------------------------------------------------
//
// Class:	CCreditsState
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

CCreditsState *CCreditsState::m_instance = 0;

//-------------------------------------------------------------

CCreditsState::CCreditsState()
{
}

//-------------------------------------------------------------

CCreditsState::~CCreditsState()
{
}

//-------------------------------------------------------------

CGameState *CCreditsState::instance()
{
	if (!m_instance)
		m_instance = new CCreditsState;

	return m_instance;
}

//-------------------------------------------------------------

bool CCreditsState::create()
{
	m_scroll_pos = 480;

	return true;
}

//-------------------------------------------------------------

bool CCreditsState::update()
{
	if (!CGameState::update())
		return false;

	if (Options.getOption(OPTION_BACKDROP))
		m_backdrop.draw(gsCPoint(0,0));
	else
		m_screen.clear(gsCColour(gsBLACK));

	m_starfield.move(4);
	m_starfield.draw();

	m_medium_font.setTextCursor(gsCPoint(0,0 + m_scroll_pos));
	m_medium_font.justifyString("Xenon 2000 : Project PCF");
	
	m_medium_font.setTextCursor(gsCPoint(0,50 + m_scroll_pos));
	m_medium_font.justifyString("A Bitmap Brothers Production");

	m_small_font.setTextCursor(gsCPoint(0,100 + m_scroll_pos));
	m_small_font.justifyString("Programming and Implementation:");

	m_medium_font.setTextCursor(gsCPoint(0,120 + m_scroll_pos));
	m_medium_font.justifyString("John M Phillips");

	m_small_font.setTextCursor(gsCPoint(0,170 + m_scroll_pos));
	m_small_font.justifyString("Concept And Level Design:");

	m_medium_font.setTextCursor(gsCPoint(0,190 + m_scroll_pos));
	m_medium_font.justifyString("Ed Bartlett");

	m_small_font.setTextCursor(gsCPoint(0,240 + m_scroll_pos));
	m_small_font.justifyString("Graphics Design:");

	m_medium_font.setTextCursor(gsCPoint(0,260 + m_scroll_pos));
	m_medium_font.justifyString("Mark Coleman");

	m_small_font.setTextCursor(gsCPoint(0,310 + m_scroll_pos));
	m_small_font.justifyString("Music And Sound Effects:");

	m_medium_font.setTextCursor(gsCPoint(0,330 + m_scroll_pos));
	m_medium_font.justifyString("Chris Maule");

	m_small_font.setTextCursor(gsCPoint(0,380 + m_scroll_pos));
	m_small_font.justifyString("A big thankyou to:");

	m_medium_font.setTextCursor(gsCPoint(0,400 + m_scroll_pos));
	m_medium_font.justifyString("Mike and all at Bitmap HQ");
	m_medium_font.setTextCursor(gsCPoint(0,420 + m_scroll_pos));
	m_medium_font.justifyString("Dan Hutchinson");
	m_medium_font.setTextCursor(gsCPoint(0,440 + m_scroll_pos));
	m_medium_font.justifyString("Alison Beasley");

	m_scroll_pos--;

	m_screen.flip();

	if (m_scroll_pos == -480 ||
		getKey() != gsKEY_NONE)
		return changeState(CMainMenuState::instance());

	return true;
}

//-------------------------------------------------------------

bool CCreditsState::destroy()
{
	return true;
}

//-------------------------------------------------------------
