//-------------------------------------------------------------
//
// Class:	CWallHugger
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CAlien
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

gsCRandom CWallHugger::m_random;

//-------------------------------------------------------------

CWallHugger::CWallHugger()
{
	m_grade = WALLHUGGER_STATIC;
	m_weapon = 0;
	m_fired = false;
}

//-------------------------------------------------------------

CWallHugger::~CWallHugger()
{
}

//-------------------------------------------------------------

void CWallHugger::findWall()
{
	//TEMP

	if (m_position.getX() < 320.f) {
		m_side = WALLHUGGER_LEFT;
		m_weapon->setDirection(gsCVector(1.f,0.f));
		}
	else {
		m_side = WALLHUGGER_RIGHT;
		m_weapon->setDirection(gsCVector(-1.f,0.f));
		}
}

//-------------------------------------------------------------

bool CWallHugger::activate()
{
	if (!isActive()) {
		m_weapon = new CSpinnerWeapon;
		m_scene->addActor(m_weapon);
		m_weapon->activate();
		m_weapon->setOwner(this);
		m_weapon->setOffset(gsCVector(0.f,0.f));
		m_weapon->setFiringMode(WEAPON_MANUAL);

		m_state = WALLHUGGER_STILL;
		m_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

void CWallHugger::kill()
{
	if (m_weapon) {
		m_weapon->kill();
		m_weapon = 0;
		}

	CActor::kill();
}

//-------------------------------------------------------------

bool CWallHugger::validWalkPosition()
{
	gsCMap *map = m_scene->getMap();
	
	gsCPoint top,bot;

	if (m_side == WALLHUGGER_LEFT) {
		top = gsCPoint(getPosition()) + gsCPoint(-32,-32);
		bot = gsCPoint(getPosition()) + gsCPoint(-32,32);
		}
	else {
		top = gsCPoint(getPosition()) + gsCPoint(32,-32);
		bot = gsCPoint(getPosition()) + gsCPoint(32,32);
		}

	gsCPoint tile_size = map->getImage()->getTileSize();

	gsCMapTile *top_tile = map->getMapTile(top / tile_size);
	gsCMapTile *bot_tile = map->getMapTile(bot / tile_size);

	bool top_solid = !top_tile || !top_tile->isEmpty();
	bool bot_solid = !bot_tile || !bot_tile->isEmpty();

	return top_solid && bot_solid;
}

//-------------------------------------------------------------
		
bool CWallHugger::update(Controls *controls)
{
	if (m_shield == 0) {
		explode();
		kill();
		return true;
		}

	findWall();

	switch (m_state) {
		case WALLHUGGER_STILL:
			{
			m_sprite.setFrame(m_side + WALLHUGGER_WALK_START);

			if (m_timer.getTime() >= WALLHUGGER_STILL_TIME) {

				if (m_grade == WALLHUGGER_STATIC ||
					m_random.getInt(100) < 50) {
					m_state = WALLHUGGER_SHOOTING;
					m_fired = false;
					}
				else {
					m_state = WALLHUGGER_WALKING;
					if (m_random.getInt(100) < 50)
						setVelocity(gsCVector(0.f,-WALLHUGGER_WALK_SPEED));
					else
						setVelocity(gsCVector(0.f,WALLHUGGER_WALK_SPEED));
					}

				m_timer.start();
				}
			}
			break;
		case WALLHUGGER_WALKING:
			{
				int frame = (int) (m_timer.getTime() * getActorInfo().m_anim_rate);
				m_sprite.setFrame(m_side + WALLHUGGER_WALK_START + frame % WALLHUGGER_WALK_FRAMES);

				m_position += m_velocity;

				// cancel movement if off edge of wall

				if (!validWalkPosition()) {
					m_position -= m_velocity;

					m_state = WALLHUGGER_STILL;
					m_timer.start();
					}

				if (m_timer.getTime() >= WALLHUGGER_WALK_TIME) {
					m_state = WALLHUGGER_STILL;
					m_timer.start();
					}
			}
			break;
		case WALLHUGGER_SHOOTING:
			{
				int frame = (int) (m_timer.getTime() * getActorInfo().m_anim_rate);
				if (frame >= WALLHUGGER_SHOT_FRAMES) {
					m_sprite.setFrame(m_side + WALLHUGGER_WALK_START);
					m_state = WALLHUGGER_STILL;
					m_timer.start();
					}			
				else {
					m_sprite.setFrame(m_side + WALLHUGGER_SHOT_START + frame);
					if (!m_fired && frame >= WALLHUGGER_LAUNCH_FRAME) {
						m_weapon->fire();
						m_fired = true;
						}
					}
			}
			break;
		}

	return true;
}

//-------------------------------------------------------------

void CWallHugger::setGrade(WallHuggerGrade grade)
{
	m_grade = grade;

	switch (m_grade) {
		case WALLHUGGER_STATIC:
			m_weapon->setGrade(WEAPON_STANDARD);
			break;
		case WALLHUGGER_MOVING:
			m_weapon->setGrade(WEAPON_MEDIUM);
			break;
		}
}

//-------------------------------------------------------------

