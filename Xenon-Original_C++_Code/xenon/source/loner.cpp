//-------------------------------------------------------------
//
// Class:	CLoner
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

CLoner::CLoner()
{
}

//-------------------------------------------------------------

CLoner::~CLoner()
{
}

//-------------------------------------------------------------

bool CLoner::activate()
{
	if (!isActive()) {
		m_weapon = new CSpinnerWeapon;
		m_scene->addActor(m_weapon);
		m_weapon->activate();
		m_weapon->setOwner(this);
		m_weapon->setOffset(gsCVector(0.f,0.f));

		m_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

void CLoner::kill()
{
	if (m_weapon) {
		m_weapon->kill();
		m_weapon = 0;
		}

	CActor::kill();
}

//-------------------------------------------------------------

bool CLoner::update(Controls *controls)
{
	if (m_shield == 0) {
		explode();
		kill();
		return true;
		}

	CShip *ship = m_scene->findShip();

	// fire weapon towards ship

	if (ship) {
		gsCVector dir = ship->getPosition() - getPosition();
		dir.normalize();
		m_weapon->setDirection(dir);
		}

	m_position += m_velocity;

	animate(ANIMATE_LOOP);

	return true;
}

//-------------------------------------------------------------
