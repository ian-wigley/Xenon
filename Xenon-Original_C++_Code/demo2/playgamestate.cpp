//-------------------------------------------------------------
//
// Class:	CPlayGameState
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

#include "demo2.h"

//-------------------------------------------------------------

CPlayGameState *CPlayGameState::m_instance = 0;

int CPlayGameState::m_yscroll = 1;

//-------------------------------------------------------------

CPlayGameState::CPlayGameState()
{
	m_ship = 0;
}

//-------------------------------------------------------------

CPlayGameState::~CPlayGameState()
{
}

//-------------------------------------------------------------

CGameState *CPlayGameState::instance()
{
	if (!m_instance)
		m_instance = new CPlayGameState;

	return m_instance;
}

//-------------------------------------------------------------

bool CPlayGameState::create()
{
	m_ship = 0;
	m_mode = CREATEPLAYER;

	return true;
}

//-------------------------------------------------------------

void CPlayGameState::createPlayer()
{
	m_scene.killAllActors();

	m_ship = new CShip;
	m_scene.addActor(m_ship);

	m_ship->activate();

	gsCVector start_position((float) m_screen.getSize().getX() / 2,
							 (float) m_screen.getSize().getY() - PLAYER_START_OFFSET);

	m_ship->setPosition(start_position);

	m_ship->setWeapon(MISSILE_WEAPON);
}

//-------------------------------------------------------------

bool CPlayGameState::update()
{
	if (!CGameState::update())
		return false;

	gsKeyCode key = m_keyboard.getKey();

	if (key == gsKEY_ESCAPE)
		return false;

	if (m_mode == CREATEPLAYER) {
		createPlayer();
		m_mode = PLAYERACTIVE;
		}

	Controls controls;

	getControl(controls,0);

	m_screen.clear(gsCColour(gsBLACK));

	m_starfield.move(4);
	m_starfield.draw();

	m_scene.updateAllActors(&controls);
	m_scene.drawAllActors();
	m_scene.checkActorCollisions();
	m_scene.removeDeadActors();

	m_small_font.setTextCursor(gsCPoint(2,2));
	m_small_font.printString("Cursor Keys  - move");
	m_small_font.setTextCursor(gsCPoint(2,12));
	m_small_font.printString("Left Control - fire");
	m_small_font.setTextCursor(gsCPoint(2,24));
	m_small_font.printString("Escape       - exit");
	
	m_screen.flip();

	return true;
}

//-------------------------------------------------------------

bool CPlayGameState::destroy()
{
	m_scene.killAllActors();
	m_ship = 0;

	return true;
}

//-------------------------------------------------------------

int CPlayGameState::getYScroll()
{
	return m_yscroll;
}

//-------------------------------------------------------------
