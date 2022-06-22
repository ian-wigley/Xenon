//-------------------------------------------------------------
//
// Class:	CSpore
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CBullet
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CSpore::CSpore()
{
	m_killed_by_player = false;
}

//-------------------------------------------------------------

CSpore::~CSpore()
{
}

//-------------------------------------------------------------

bool CSpore::activate()
{
	if (!isActive()) {
		m_timer.start();
		m_delay_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

bool CSpore::update(Controls *controls)
{
	if (m_shield == 0) {
		explode();
		kill();
		return true;
		}

	if (m_delay_timer.getState() != gsTIMER_ACTIVE ||
		m_delay_timer.getTime() >= SPORE_HOMING_DELAY) {
		m_delay_timer.reset();

		CShip *ship = m_scene->findShip();

		if (ship) {
			gsCVector rel_pos = ship->getPosition() - m_position;

			rel_pos.normalize();

			m_velocity = rel_pos * getActorInfo().m_speed[m_grade];
			}
		}

	m_position += m_velocity;

	animate(ANIMATE_LOOP);

	return true;
}

//-------------------------------------------------------------

void CSpore::onKilled()
{
	m_killed_by_player = true;

	CActor::onKilled();
}

//-------------------------------------------------------------

void CSpore::kill()
{
	if (getOwner() &&
		((CSporeGenerator *) getOwner())->sporeKilled(m_killed_by_player)) {
		CScorePickup *s = new CScorePickup;
		m_scene->addActor(s);
		s->setPosition(getPosition());
		s->activate();
		}

	CActor::kill();
}

//-------------------------------------------------------------

void CSpore::onLeavingScreen()
{
}

//-------------------------------------------------------------
