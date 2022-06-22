//-------------------------------------------------------------
//
// Class:	CSpore
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

#ifndef _INCLUDE_SPORE_H
#define _INCLUDE_SPORE_H

#include "bullet.h"

//-------------------------------------------------------------

const float SPORE_HOMING_DELAY = 0.5f;

//-------------------------------------------------------------

class CSpore : public CBullet
{
	private:
		gsCTimer m_delay_timer;

		bool m_killed_by_player;

	public:
		CSpore();
		~CSpore();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SPORE]; };

		bool activate();
		void kill();

		void onLeavingScreen();
		void onKilled();
		
		bool update(Controls *controls);
};

//-------------------------------------------------------------

#endif
