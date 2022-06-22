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

#include "demo4.h"

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
	if (!m_level.load("test4.fmp",DIRECTORY_GRAPHICS)) {
		gsREPORT("load level failed");
		return false;
		}

	m_scene.setMap(&m_level.m_front_layer);
	m_scene.setCollisionListSize(m_screen.getSize(),gsCPoint(8,6));

	m_ship = 0;

	gsCPoint map_size = m_level.m_front_layer.getSizeInPixels();
	gsCVector start_position = gsCVector((float) map_size.getX() / 2.f,
										 (float) (map_size.getY() - PLAYER_START_OFFSET));
	
	m_mode = CREATEPLAYER;

	return true;
}

//-------------------------------------------------------------

void CPlayGameState::setLayerPositions(int ship_y)
{
	int mh = m_level.m_back_layer.getSizeInPixels().getY();

	int by = -(mh - (mh - ship_y) / 2 + PLAYER_START_OFFSET / 2 - m_screen.getSize().getY());

	m_level.m_back_layer.setPosition(gsCPoint(0,by));

	int fy = -(ship_y + PLAYER_START_OFFSET - m_screen.getSize().getY());

	m_level.m_front_layer.setPosition(gsCPoint(0,fy));
}

//-------------------------------------------------------------

void CPlayGameState::createPlayer()
{
	m_scene.killAllActors();

	m_ship = new CShip;
	m_scene.addActor(m_ship);

	m_ship->activate();

	gsCVector start_position((float) m_screen.getSize().getX() / 2,
							 (float) m_level.m_front_layer.getSizeInPixels().getY() - PLAYER_START_OFFSET);

	m_ship->setPosition(start_position);

	setLayerPositions((int) start_position.getY());

	m_level.reset();

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

	if (m_mode == PLAYERACTIVE)
		m_level.scanForNewActors(&m_scene);

	static even = true;		//TEMP

	even = !even;

	if (even)
		m_level.m_back_layer.move(gsCPoint(0,1));
			
	if (m_level.m_back_layer.getPosition().getY() > 0)
		m_level.m_back_layer.setPosition(gsCPoint(0,0));

	m_level.m_front_layer.move(gsCPoint(0,m_yscroll));

	if (m_level.m_front_layer.getPosition().getY() > 0)
		return false;

	m_scene.updateAllActors(&controls);
	m_level.m_back_layer.draw();
	m_scene.drawAllActors(&m_level.m_front_layer);
	m_scene.checkActorCollisions();
	m_scene.checkMapCollisions(&m_level.m_front_layer);
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
