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

#ifndef _INCLUDE_MISSILEWEAPON_H
#define _INCLUDE_MISSILEWEAPON_H

#include "weapon.h"

//-------------------------------------------------------------

class CMissileWeapon : public CWeapon
{
	public:
		CMissileWeapon();
		virtual ~CMissileWeapon();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_MISSILE_WEAPON]; };

		bool fire();
};

//-------------------------------------------------------------

#endif
