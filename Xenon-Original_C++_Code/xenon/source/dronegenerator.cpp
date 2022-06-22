//-------------------------------------------------------------
//
// Class:	CDroneGenerator
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CDroneGenerator::CDroneGenerator()
{
	m_drones_created = 0;
	m_drones_active = 0;
	m_drones_killed = 0;
}

//-------------------------------------------------------------

CDroneGenerator::~CDroneGenerator()
{
}

//-------------------------------------------------------------

bool CDroneGenerator::activate()
{
	if (!isActive()) {
		m_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

bool CDroneGenerator::update(Controls *controls)
{
	if (m_drones_created < DRONE_TOTAL) {
		CDrone *d = new CDrone(this);
		m_scene->addActor(d);
		d->setPosition(getPosition() + gsCVector(0.f,m_drones_created * DRONE_SPACING));
		d->setVelocity(gsCVector(0.f,DRONE_SPEED));
		d->setPhase(m_drones_created * DRONE_DELAY);
		d->activate();
		m_drones_created++;
		}

	return true;
}

//-------------------------------------------------------------

int CDroneGenerator::droneKilled(bool by_player)
{
	m_drones_active--;
	
	if (by_player)
		m_drones_killed++;

	if (m_drones_killed == m_drones_created) {
		kill();
		return 0;
		}

	if (m_drones_active == 0)
		kill();

	return getActorInfo().m_kill_bonus * m_drones_killed;
}

//-------------------------------------------------------------
