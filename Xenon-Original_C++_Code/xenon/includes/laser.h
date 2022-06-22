//-------------------------------------------------------------
//
// Class:	CLaser
//
// Author:	John M Phillips
//
// Started:	07/05/00
//
// Base:	CBullet
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_LASER_H
#define _INCLUDE_LASER_H

#include "bullet.h"

//-------------------------------------------------------------

const int LASER_MAX_LENGTH = 256;

//-------------------------------------------------------------

class CLaser : public CBullet
{
	private:
		gsCList<CActor *> m_actor_collider_list;
		gsCList<gsCPoint> m_map_collider_list;
		gsCMap *m_hit_map;

		int m_length;
		bool m_dying;

		gsCRandom m_random;

	public:
		CLaser();
		virtual ~CLaser();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_LASER]; };

		bool activate();

		gsCRect getCollisionRect();
		void onCollisionWithActor(CActor *actor);
		void onCollisionWithMap(gsCMap *map,int hits);
		void postProcessCollision();

		bool update(Controls *controls);
		bool draw();
};

//-------------------------------------------------------------

#endif
