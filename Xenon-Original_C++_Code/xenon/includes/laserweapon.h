//-------------------------------------------------------------
//
// Class:	CLaserWeapon
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

#ifndef _INCLUDE_LASERWEAPON_H
#define _INCLUDE_LASERWEAPON_H

#include "weapon.h"

//-------------------------------------------------------------

class CLaserWeapon : public CWeapon
{
	public:
		CLaserWeapon();
		virtual ~CLaserWeapon();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_LASER_WEAPON]; };

		bool fire();
};

//-------------------------------------------------------------

#endif
