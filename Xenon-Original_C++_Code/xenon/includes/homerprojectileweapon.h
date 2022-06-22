//-------------------------------------------------------------
//
// Class:	CHomerProjectileWeapon
//
// Author:	John M Phillips
//
// Started:	07/05/00
//
// Base:	CWeapon
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_HOMERPROJECTILEWEAPON_H
#define _INCLUDE_HOMERPROJECTILEWEAPON_H

#include "weapon.h"
#include "homerprojectile.h"

//-------------------------------------------------------------

class CHomerProjectileWeapon : public CWeapon
{
	private:
		bool m_trigger;

	public:
		CHomerProjectileWeapon();
		virtual ~CHomerProjectileWeapon();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_HOMER_PROJECTILE_WEAPON]; };

		bool fire();

		void detonate();
};

//-------------------------------------------------------------

#endif
