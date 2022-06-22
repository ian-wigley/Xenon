//-------------------------------------------------------------
//
// Class:	CUpgrade
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CUpgrade::CUpgrade()
{
	m_offset = gsCVector(0.f,0.f);
	m_weapon = 0;
	m_weapon_type = NO_WEAPON;
}

//-------------------------------------------------------------

CUpgrade::~CUpgrade()
{
//	CActor::~CActor();
}

//-------------------------------------------------------------

bool CUpgrade::activate()
{
	if (!isActive())
		setWeapon(MISSILE_WEAPON);

	return CActor::activate();
}

//-------------------------------------------------------------

void CUpgrade::kill()
{
	if (m_weapon) {
		m_weapon->kill();
		m_weapon = 0;
		}

	CActor::kill();
}

//-------------------------------------------------------------

void CUpgrade::setOffset(const gsCVector& offset)
{
	m_offset = offset;
}

//-------------------------------------------------------------

void CUpgrade::registerHit(int energy,CActor *hitter)
{
	if (getOwner() &&
		((CShip *) getOwner())->getDiveLevel() > 0)
		return;

	CActor::registerHit(energy,hitter);
}

//-------------------------------------------------------------

void CUpgrade::onCollisionWithActor(CActor *actor)
{
	if (getOwner() &&
		((CShip *) getOwner())->getDiveLevel() > 0)
		return;

	switch (actor->getActorInfo().m_type) {
		case ACTOR_TYPE_PICKUP:
			((CPickup *) actor)->collect();
			actor->kill();
			break;
		case ACTOR_TYPE_ALIEN:
			registerHit(1,this);
			actor->registerHit(1,this);
			break;
		}
}

//-------------------------------------------------------------

void CUpgrade::onCollisionWithMap(gsCMap *map,int hits)
{
	if (getOwner() &&
		((CShip *) getOwner())->getDiveLevel() > 0)
		return;

	registerHit(UPGRADE_MAP_HIT,this);
}

//-------------------------------------------------------------

void CUpgrade::setWeapon(WeaponType type,WeaponGrade grade)
{
	if (m_weapon) {
		m_weapon->kill();
		m_weapon = 0;
		}

	m_weapon_type = type;

	switch (m_weapon_type) {
		case NO_WEAPON:
			m_weapon = 0;
			break;		
		case MISSILE_WEAPON:
			m_weapon = new CMissileWeapon;
			break;
		case HOMING_MISSILE_WEAPON:
			m_weapon = new CHomingMissileWeapon;
			break;
		case LASER_WEAPON:
			m_weapon = new CLaserWeapon;
			break;
		}

	if (m_weapon) {
		m_scene->addActor(m_weapon);
		m_weapon->activate();
		m_weapon->setGrade(grade);
		m_weapon->setOwner(this);
		}
}

//-------------------------------------------------------------

bool CUpgrade::upgradeWeapon()
{
	if (m_weapon && m_weapon->upgrade())
		return true;

	return false;
}

//-------------------------------------------------------------

CWeapon *CUpgrade::getWeapon()
{
	return m_weapon;
}

//-------------------------------------------------------------

WeaponType CUpgrade::getWeaponType()
{
	return m_weapon_type;
}

//-------------------------------------------------------------
