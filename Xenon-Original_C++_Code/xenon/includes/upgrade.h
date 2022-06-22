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

#ifndef _INCLUDE_UPGRADE_H
#define _INCLUDE_UPGRADE_H

#include "actor.h"
#include "weapon.h"

//-------------------------------------------------------------

const int UPGRADE_MAP_HIT = 10;			// energy lost if upgrade hits map

//-------------------------------------------------------------

class CUpgrade : public CActor
{
	protected:
		gsCVector m_offset;

		CWeapon *m_weapon;
		WeaponType m_weapon_type;

	public:
		CUpgrade();
		virtual ~CUpgrade();

		virtual bool activate();
		virtual void kill();

		void setOffset(const gsCVector& offset);
		void setWeapon(WeaponType type,WeaponGrade grade = WEAPON_STANDARD);

		CWeapon *getWeapon();
		WeaponType getWeaponType();

		bool upgradeWeapon();

		void registerHit(int energy,CActor *hitter);
		void onCollisionWithActor(CActor *actor);
		void onCollisionWithMap(gsCMap *map,int hits);
};

//-------------------------------------------------------------

#endif
