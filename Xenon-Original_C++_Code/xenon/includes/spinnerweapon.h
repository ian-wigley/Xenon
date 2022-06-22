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

#ifndef _INCLUDE_SPINNERWEAPON_H
#define _INCLUDE_SPINNERWEAPON_H

#include "weapon.h"

//-------------------------------------------------------------

class CSpinnerWeapon : public CWeapon
{
	private:
		gsCVector m_direction;

	public:
		CSpinnerWeapon();
		virtual ~CSpinnerWeapon();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SPINNER_WEAPON]; };

		bool fire();

		void setDirection(const gsCVector& direction);
};

//-------------------------------------------------------------

#endif
