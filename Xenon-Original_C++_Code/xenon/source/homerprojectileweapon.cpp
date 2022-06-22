//-------------------------------------------------------------
//
// Class:	CHomerProjectileWeapon
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

CHomerProjectileWeapon::CHomerProjectileWeapon()
{
	m_trigger = false;
}

//-------------------------------------------------------------

CHomerProjectileWeapon::~CHomerProjectileWeapon()
{
//	CWeapon::~CWeapon();
}

//-------------------------------------------------------------

bool CHomerProjectileWeapon::fire()
{
	if (!m_trigger)
		return false;	

	static gsCVector direction[8] = {
		gsCVector( 0.f,-1.f),
		gsCVector( 1.f,-1.f),
		gsCVector( 1.f, 0.f),
		gsCVector( 1.f, 1.f),
		gsCVector( 0.f, 1.f),
		gsCVector(-1.f, 1.f),
		gsCVector(-1.f, 0.f),
		gsCVector(-1.f,-1.f)
	};

	// fire 8 projectiles

	CHomerProjectile *hp;

	for (int i = 0; i < 8; i++) {
		hp = new CHomerProjectile;
		m_scene->addActor(hp);
		hp->activate();
		hp->setGrade((BulletGrade) m_grade);
		hp->setPosition(getPosition());

		gsCVector d = direction[i];
		d.normalize();

		hp->setVelocity(d * hp->getActorInfo().m_speed[m_grade]);
		}

	// now kill ourself

	kill();

	return true;
}

//-------------------------------------------------------------

void CHomerProjectileWeapon::detonate()
{
	m_trigger = true;
}

//-------------------------------------------------------------
