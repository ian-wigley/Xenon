//-------------------------------------------------------------
//
// Class:	CGameState
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	None
//
// Derived:	CMainMenuState
//			COptionsMenuState
//			CPlayGameState
//			CScoreEntryState
//			CScoreTableState
//
//-------------------------------------------------------------

#include "demo2.h"

//-------------------------------------------------------------

gsCScreen		CGameState::m_screen;
gsCKeyboard		CGameState::m_keyboard;

gsCFont			CGameState::m_small_font;
gsCFont			CGameState::m_medium_font;
gsCStarfield	CGameState::m_starfield;

CScene			CGameState::m_scene;
CDemo2 *		CGameState::m_demo2 = 0;

//-------------------------------------------------------------

CGameState::CGameState()
{
}

//-------------------------------------------------------------

CGameState::~CGameState()
{
}

//-------------------------------------------------------------

bool CGameState::initialize(CDemo2 *demo2)
{
	m_demo2 = demo2;

	gsCFile::setDirectory(DIRECTORY_ROOT);

	if (!m_keyboard.create())
		return false;

	if (!m_screen.createWindowed(m_demo2->getWindow()))
		return false;

	// pre-load graphics

	gsCFile::setDirectory(DIRECTORY_GRAPHICS);

	if (!loadGraphics())
		return false;

	m_starfield.initialize(8);

	m_demo2->changeState(CPlayGameState::instance());

	return true;
}

//-------------------------------------------------------------

bool CGameState::shutdown()
{
	m_medium_font.destroy();
	m_small_font.destroy();

	m_scene.destroyAll();

	m_screen.destroy();

	m_keyboard.destroy();

	return true;
}

//-------------------------------------------------------------

bool CGameState::changeState(CGameState *new_game_state)
{
	if (m_demo2)
		return m_demo2->changeState(new_game_state);

	return false;
}

//-------------------------------------------------------------

bool CGameState::create()
{
	return true;
}

//-------------------------------------------------------------

bool CGameState::update()
{
	return true;
}

//-------------------------------------------------------------

bool CGameState::destroy()
{
	return true;
}

//-------------------------------------------------------------

bool CGameState::loadGraphics()
{
	if (!m_scene.loadImages())
		return false;

	if (!m_small_font.load("font8x8.bmp"))
		return false;

	m_small_font.setTileSize(gsCPoint(8,8));
	m_small_font.enableColourKey(gsCColour(gsMAGENTA));

	if (!m_medium_font.load("font16x16.bmp"))
		return false;

	m_medium_font.setTileSize(gsCPoint(16,16));
	m_medium_font.enableColourKey(gsCColour(gsMAGENTA));

	return true;
}

//-------------------------------------------------------------

gsCApplication *CGameState::getApplication()
{
	return m_demo2;
}

//-------------------------------------------------------------

gsKeyCode CGameState::getKey()
{
	gsKeyCode key = m_keyboard.getKey();

	return key;
}

//-------------------------------------------------------------

void CGameState::getControl(Controls& controls,int player)
{
	controls.left = m_keyboard.testKey(gsKEY_LEFT);
	controls.right = m_keyboard.testKey(gsKEY_RIGHT);
	controls.up = m_keyboard.testKey(gsKEY_UP);
	controls.down = m_keyboard.testKey(gsKEY_DOWN);
	controls.fire = m_keyboard.testKey(gsKEY_LCONTROL,gsKEY_STATE);
	controls.firePressed = m_keyboard.testKey(gsKEY_LCONTROL,gsKEY_PRESSED);
	controls.divePressed = m_keyboard.testKey(gsKEY_LSHIFT,gsKEY_PRESSED);
	controls.reversePressed = m_keyboard.testKey(gsKEY_ALT,gsKEY_PRESSED);
}

//-------------------------------------------------------------
