//-------------------------------------------------------------
//
// Class:	CBossMouth
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CBoss
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_BOSSMOUTH_H
#define _INCLUDE_BOSSMOUTH_H

#include "boss.h"

//-------------------------------------------------------------

class CBossMouth : public CBoss
{
	private:
		int m_mode;
		int m_shots_fired;
		int m_shots_total;
		float m_shot_delay;

		gsCTimer m_firing_timer;
		static gsCRandom m_random;

	public:
		CBossMouth();
		virtual ~CBossMouth();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_BOSSMOUTH]; };

		bool activate();

		bool update(Controls *controls);

		void trigger(int mode,int shots,float delay);
};

//-------------------------------------------------------------

#endif
