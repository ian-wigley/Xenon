//-------------------------------------------------------------
//
// Class:	CMissile
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

#ifndef _INCLUDE_MISSILE_H
#define _INCLUDE_MISSILE_H

#include "bullet.h"

//-------------------------------------------------------------

const int MISSILE_FRAMES = 2;

//-------------------------------------------------------------

class CMissile : public CBullet
{
	public:
		CMissile();
		virtual ~CMissile();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_MISSILE]; };

		bool update(Controls *controls);
};

//-------------------------------------------------------------

#endif
