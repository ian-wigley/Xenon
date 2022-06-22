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

#include "game.h"

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

void CBullet::onCollisionWithMap(gsCMap *map,int hits)
{
	for (int i = 0; i < hits; i++) {
		gsCPoint pos = map->getHitPosition(i);
		gsCMapTile *mt = map->getMapTile(pos);
		if (mt && mt->getUserData(0) == ID_DESTROYABLE_TILE) {

			gsUBYTE hits_required = mt->getUserData(1);
			gsUBYTE hits_taken = mt->getUserData(3);

			hits_taken++;

			mt->setUserData(3,hits_taken);

			if (hits_taken >= hits_required) {
				mt->setHidden(true);

				m_scene->createMapExplosion(map,pos);

				// NOTE: don't let alien bullets score points :)

				if (getActorInfo().m_type == ACTOR_TYPE_BULLET)
					CPlayGameState::getPlayer()->scoreBonus(5);
				}
			}
		}

	kill();
}

//-------------------------------------------------------------

void CBullet::setGrade(BulletGrade grade)
{
	m_grade = grade;
}

//-------------------------------------------------------------
