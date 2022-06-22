//-------------------------------------------------------------
//
// Class:	CSpinnerWeapon
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

#include "game.h"

//-------------------------------------------------------------

CSpinnerWeapon::CSpinnerWeapon()
{
	m_direction = gsCVector(0.f,1.f);
}

//-------------------------------------------------------------

CSpinnerWeapon::~CSpinnerWeapon()
{
//	CWeapon::~CWeapon();
}

//-------------------------------------------------------------

bool CSpinnerWeapon::fire()
{
	if (!isValidFiringPosition())
		return false;	

	CSpinner *m = new CSpinner;
	m_scene->addActor(m);

	m->activate();
	m->setGrade((BulletGrade) m_grade);
	m->setPosition(getPosition());
	m->setVelocity(m->getActorInfo().m_speed[m_grade] * m_direction);
	
	return true;
}

//-------------------------------------------------------------

void CSpinnerWeapon::setDirection(const gsCVector& direction)
{
	m_direction = direction;
}

//-------------------------------------------------------------
