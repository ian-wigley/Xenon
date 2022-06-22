//-------------------------------------------------------------
//
// Class:	CPod
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

CPod::CPod()
{
}

//-------------------------------------------------------------

CPod::~CPod()
{
}

//-------------------------------------------------------------

bool CPod::activate()
{
	if (!isActive())
		m_timer.start();

	return CActor::activate();
}

//-------------------------------------------------------------

bool CPod::update(Controls *controls)
{
	if (m_shield == 0) {

		CSporeGenerator *gen = new CSporeGenerator;
		m_scene->addActor(gen);
		gen->activate();
		gen->setPosition(getPosition());

		explode();
		kill();
		return true;
		}

	CShip *ship = m_scene->findShip();

	float dx = 0.f;

	if (ship)
		dx = ship->getPosition().getX() - m_position.getX();

	dx *= POD_XSPEED_SCALE;

	if (dx < -POD_MAX_XSPEED)
		dx = -POD_MAX_XSPEED;
	if (dx > POD_MAX_XSPEED)
		dx = POD_MAX_XSPEED;

	m_position += gsCVector(dx,m_velocity.getY());;

	animate(ANIMATE_LOOP);

	return true;
}

//-------------------------------------------------------------
