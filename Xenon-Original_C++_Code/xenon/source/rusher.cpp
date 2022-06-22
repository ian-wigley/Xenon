//-------------------------------------------------------------
//
// Class:	CRusher
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

gsCRandom CRusher::m_random;

//-------------------------------------------------------------

CRusher::CRusher()
{
	m_weapon = 0;
}

//-------------------------------------------------------------

CRusher::~CRusher()
{
}

//-------------------------------------------------------------

void CRusher::kill()
{
	if (m_weapon) {
		m_weapon->kill();
		m_weapon = 0;
		}

	CActor::kill();
}

//-------------------------------------------------------------

bool CRusher::activate()
{
	if (!isActive()) {

/*		if (m_random.getInt(100) < 25) {
			m_weapon = new CSpinnerWeapon;
			m_scene->addActor(m_weapon);
			m_weapon->activate();
			m_weapon->setOwner(this);
			m_weapon->setOffset(gsCVector(0.f,0.f));
			}
*/
		m_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

bool CRusher::update(Controls *controls)
{
	if (m_shield == 0) {
		explode();
		kill();
		return true;
		}

	if (m_weapon) {
		CShip *ship = m_scene->findShip();

		// fire weapon towards ship

		if (ship &&
			getPosition().getY() < ship->getPosition().getY()) {
			gsCVector dir = ship->getPosition() - getPosition();
			dir.normalize();
			m_weapon->setDirection(dir);
			}
		}

	m_position += m_velocity;

	animate(ANIMATE_LOOP);

	return true;
}

//-------------------------------------------------------------
