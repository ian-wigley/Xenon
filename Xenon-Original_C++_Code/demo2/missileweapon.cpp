//-------------------------------------------------------------
//
// Class:	CMissileWeapon
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CWeapon
//
// Derived:	None
//
//-------------------------------------------------------------

#include "demo2.h"

//-------------------------------------------------------------

CMissileWeapon::CMissileWeapon()
{
}

//-------------------------------------------------------------

CMissileWeapon::~CMissileWeapon()
{
//	CWeapon::~CWeapon();
}

//-------------------------------------------------------------

bool CMissileWeapon::fire()
{
	if (!isValidFiringPosition())
		return false;	

	CMissile *m = new CMissile;
	m_scene->addActor(m);

	m->activate();
	m->setGrade((BulletGrade) m_grade);

	switch (m_direction) {
		case WEAPON_FORWARD:
			m->setPosition(getPosition() - gsCVector(0.f,24.f));
			m->setVelocity(gsCVector(0.f,-m->getActorInfo().m_speed[m_grade]));
			break;
		case WEAPON_REVERSE:
			m->setPosition(getPosition() + gsCVector(0.f,24.f));
			m->setVelocity(gsCVector(0.f,m->getActorInfo().m_speed[m_grade]));
			break;
		}

	return true;
}

//-------------------------------------------------------------
