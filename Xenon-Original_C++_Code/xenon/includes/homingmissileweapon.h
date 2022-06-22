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

#ifndef _INCLUDE_HOMINGMISSILEWEAPON_H
#define _INCLUDE_HOMINGMISSILEWEAPON_H

#include "weapon.h"

//-------------------------------------------------------------

class CHomingMissileWeapon : public CWeapon
{
	public:
		CHomingMissileWeapon();
		virtual ~CHomingMissileWeapon();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_HOMING_MISSILE_WEAPON]; };

		bool fire();
};

//-------------------------------------------------------------

#endif
