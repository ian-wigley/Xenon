//-------------------------------------------------------------
//
// Class:	CLaserWeapon
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

CLaserWeapon::CLaserWeapon()
{
}

//-------------------------------------------------------------

CLaserWeapon::~CLaserWeapon()
{
//	CWeapon::~CWeapon();
}

//-------------------------------------------------------------

bool CLaserWeapon::fire()
{
	if (!isValidFiringPosition())
		return false;	
	
	CLaser *l = new CLaser;
	m_scene->addActor(l);

	l->activate();
	l->setGrade((BulletGrade) m_grade);
	l->setPosition(getPosition());
	l->setVelocity(gsCVector(0.f,-l->getActorInfo().m_speed[m_grade]));

	if (getOwner() && getOwner()->getActorInfo().m_type == ACTOR_TYPE_SHIP)
		CGameState::playSample(SAMPLE_FIRE_LASER,getPosition().getX());

	return true;
}

//-------------------------------------------------------------
