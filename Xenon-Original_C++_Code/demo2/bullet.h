//-------------------------------------------------------------
//
// Class:	CBullet
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	CMissile
//			CHomingMissile
//			CLaser
//			CSpore
//			CHomerProjectile
//
//-------------------------------------------------------------

#ifndef _INCLUDE_BULLET_H
#define _INCLUDE_BULLET_H

#include "actor.h"

//-------------------------------------------------------------

class CBullet : public CActor
{
	protected:

		BulletGrade m_grade;

	public:
		CBullet();
		~CBullet();

		bool draw();

		virtual void onLeavingScreen();

		virtual void onCollisionWithActor(CActor *actor);

		void setGrade(BulletGrade grade = BULLET_STANDARD);
};

//-------------------------------------------------------------

#endif
