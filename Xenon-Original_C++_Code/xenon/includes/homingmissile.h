//-------------------------------------------------------------
//
// Class:	CHomingMissile
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

#ifndef _INCLUDE_HOMINGMISSILE_H
#define _INCLUDE_HOMINGMISSILE_H

#include "bullet.h"

//-------------------------------------------------------------

const float HOMING_MISSILE_TURNRATE = 10.f;
const float HOMING_MISSILE_STARTUP = 0.25f;
const float HOMING_MISSILE_THRESHOLD = 8.f;

//-------------------------------------------------------------

class CHomingMissile : public CBullet
{
	private:
		float m_angle;
		gsCVector m_target;
		bool m_has_target;

	public:
		CHomingMissile();
		virtual ~CHomingMissile();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_HOMING_MISSILE]; };

		bool activate();
		bool update(Controls *controls);

		void setTarget(const gsCVector& target);
};

//-------------------------------------------------------------

#endif
