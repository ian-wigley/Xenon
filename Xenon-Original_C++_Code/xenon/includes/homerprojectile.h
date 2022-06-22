//-------------------------------------------------------------
//
// Class:	CHomerProjectile
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CBullet
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_HOMERPROJECTILE_H
#define _INCLUDE_HOMERPROJECTILE_H

#include "bullet.h"

//-------------------------------------------------------------

class CHomerProjectile : public CBullet
{
	public:
		CHomerProjectile();
		virtual ~CHomerProjectile();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_HOMER_PROJECTILE]; };

		bool update(Controls *controls);
};

//-------------------------------------------------------------

#endif
