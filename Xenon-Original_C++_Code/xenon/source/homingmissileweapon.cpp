//-------------------------------------------------------------
//
// Class:	CHomingMissileWeapon
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

CHomingMissileWeapon::CHomingMissileWeapon()
{
}

//-------------------------------------------------------------

CHomingMissileWeapon::~CHomingMissileWeapon()
{
//	CWeapon::~CWeapon();
}

//-------------------------------------------------------------

bool CHomingMissileWeapon::fire()
{
	if (!isValidFiringPosition())
		return false;	

	CHomingMissile *h = new CHomingMissile;
	m_scene->addActor(h);

	CAlien *alien;
	switch (m_direction) {
		case WEAPON_FORWARD:
			alien = (CAlien *) m_scene->findNearestActor(ACTOR_TYPE_ALIEN,getPosition(),-1);
			
			if (alien)
				h->setTarget(alien->getPosition());
			else
				h->setTarget(gsCVector(320.f,getPosition().getY() - 480.f));

			h->setPosition(getPosition() - gsCVector(0.f,24.f));
			h->setVelocity(gsCVector(0.f,-h->getActorInfo().m_speed[m_grade]));
			break;
		case WEAPON_REVERSE:
			alien = (CAlien *) m_scene->findNearestActor(ACTOR_TYPE_ALIEN,getPosition(),1);
			
			if (alien)
				h->setTarget(alien->getPosition());
			else
				h->setTarget(gsCVector(320.f,getPosition().getY() + 480.f));

			h->setPosition(getPosition() + gsCVector(0.f,24.f));
			h->setVelocity(gsCVector(0.f,h->getActorInfo().m_speed[m_grade]));
			break;
		}

	h->activate();
	h->setGrade((BulletGrade) m_grade);
	
	if (getOwner() && getOwner()->getActorInfo().m_type == ACTOR_TYPE_SHIP)
		CGameState::playSample(SAMPLE_FIRE_HOMING_MISSILE,getPosition().getX());

	return true;
}

//-------------------------------------------------------------
