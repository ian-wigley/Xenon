//-------------------------------------------------------------
//
// Class:	CBossControl
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

#ifndef _INCLUDE_BOSSCONTROL_H
#define _INCLUDE_BOSSCONTROL_H

#include "boss.h"

//-------------------------------------------------------------

typedef enum
{
	BOSS_MOVE_DOWN,
	BOSS_STATIC,
	BOSS_MOVE_UP,
	BOSS_BEGIN_LOOP,
	BOSS_END_LOOP,
	BOSS_TRIGGER,
	BOSS_DESTROY,
	BOSS_ROAR,
	BOSS_SNORT,
	BOSS_DEAD,
	BOSS_OPEN_EYES,
	BOSS_SHUT_EYES,
} BossState;

//-------------------------------------------------------------

struct BossScriptItem
{
	BossState m_state;
	int m_param;
};

//-------------------------------------------------------------

class CBossControl : public CBoss
{
	private:
		static bool m_is_started;
		static int m_yscroll;

		BossState m_state;
		int m_counter;

		static BossScriptItem m_script[];
		BossScriptItem *m_script_pointer;
		BossScriptItem *m_loop_point;

		void interpretScript();

		gsCPoint m_tile_pos;
		int m_size;
		gsCTimer m_destruction_timer;

		void explodeTile(const gsCPoint& pos);

		void initiateDestructionSequence();
		void updateDestructionSequence();

	public:
		CBossControl();
		virtual ~CBossControl();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_BOSSCONTROL]; };

		bool activate();
		void kill();
		bool update(Controls *controls);

		static int getYScroll();

		static bool isStarted();
};

//-------------------------------------------------------------

#endif
