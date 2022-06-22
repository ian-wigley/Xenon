//-------------------------------------------------------------
//
// Class:	CHomer
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

CHomer::CHomer()
{
}

//-------------------------------------------------------------

CHomer::~CHomer()
{
}

//-------------------------------------------------------------

bool CHomer::activate()
{
	if (!isActive())
		m_timer.start();

	return CActor::activate();
}

//-------------------------------------------------------------

bool CHomer::update(Controls *controls)
{
	if (m_shield == 0) {

		CHomerProjectileWeapon *weapon = new CHomerProjectileWeapon;
		m_scene->addActor(weapon);
		weapon->activate();
		weapon->setOwner(this);
		weapon->setOffset(gsCVector(0.f,0.f));
		weapon->detonate();

		explode();
		kill();
		return true;
		}

	CShip *ship = m_scene->findShip();

	float dx = 0.f;

	if (ship)
		dx = ship->getPosition().getX() - m_position.getX();

	dx *= HOMER_XSPEED_SCALE;

	if (dx < -HOMER_MAX_XSPEED)
		dx = -HOMER_MAX_XSPEED;
	if (dx > HOMER_MAX_XSPEED)
		dx = HOMER_MAX_XSPEED;

	m_position += gsCVector(dx,m_velocity.getY());;

	animate(ANIMATE_LOOP);
	
	return true;
}

//-------------------------------------------------------------
