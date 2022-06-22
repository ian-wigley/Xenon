//-------------------------------------------------------------
//
// Class:	CDrone
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

CDrone::CDrone(CDroneGenerator *generator)
{
	m_generator = generator;
	m_phase = 0.f;
}

//-------------------------------------------------------------

CDrone::~CDrone()
{
}

//-------------------------------------------------------------

bool CDrone::activate()
{
	if (!isActive())
		m_timer.start();

	return CActor::activate();
}

//-------------------------------------------------------------

bool CDrone::update(Controls *controls)
{
	if (m_shield == 0) {
		int score = m_generator->droneKilled(true);

		if (score == 0) {
			CScorePickup *s = new CScorePickup;
			m_scene->addActor(s);
			s->setPosition(getPosition());
			s->activate();
			}
		else {
			m_scene->createLabel(getPosition(),score);
			CPlayGameState::getPlayer()->scoreBonus(score);
			}

		explode();
		kill();
		return true;
		}

	m_position.setX(m_generator->getPosition().getX() +
					32.f * gsSin((m_timer.getTime() + m_phase) * 180.f));
	m_position.setY(m_position.getY() + m_velocity.getY());

	animate(ANIMATE_LOOP);

	return true;
}

//-------------------------------------------------------------

void CDrone::setPhase(float p)
{
	m_phase = p;
}

//-------------------------------------------------------------

void CDrone::onLeavingScreen()
{
	m_generator->droneKilled(false);

	CAlien::onLeavingScreen();
}

//-------------------------------------------------------------
