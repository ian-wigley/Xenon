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
//
//-------------------------------------------------------------

#include "demo2.h"

//-------------------------------------------------------------

CBullet::CBullet()
{
	m_grade = BULLET_STANDARD;
}

//-------------------------------------------------------------

CBullet::~CBullet()
{
//	CActor::~CActor();
}

//-------------------------------------------------------------

void CBullet::onLeavingScreen()
{
	kill();
}

//-------------------------------------------------------------

bool CBullet::draw()
{
	if (!CActor::draw())
		return false;

	if (!isOnScreen())
		onLeavingScreen();

	return true;
}

//-------------------------------------------------------------

void CBullet::onCollisionWithActor(CActor *actor)
{
	actor->registerHit(getActorInfo().m_energy[m_grade],this);
	kill();
}

//-------------------------------------------------------------

void CBullet::setGrade(BulletGrade grade)
{
	m_grade = grade;
}

//-------------------------------------------------------------
