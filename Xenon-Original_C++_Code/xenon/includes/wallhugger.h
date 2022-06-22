//-------------------------------------------------------------
//
// Class:	CWallHugger
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CAlien
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_WALLHUGGER_H
#define _INCLUDE_WALLHUGGER_H

#include "alien.h"
#include "gs_random.h"

//-------------------------------------------------------------

const int WALLHUGGER_WALK_START = 0;
const int WALLHUGGER_WALK_FRAMES = 6;
const int WALLHUGGER_SHOT_START = 6;
const int WALLHUGGER_SHOT_FRAMES = 8;
const int WALLHUGGER_LAUNCH_FRAME = 6;

const int WALLHUGGER_LEFT = 14;
const int WALLHUGGER_RIGHT = 0;

const float WALLHUGGER_STILL_TIME = 1.f;
const float WALLHUGGER_WALK_TIME = 1.f;

const float WALLHUGGER_WALK_SPEED = 1.f;

//-------------------------------------------------------------

typedef enum {
	WALLHUGGER_STATIC,
	WALLHUGGER_MOVING,
} WallHuggerGrade;

//-------------------------------------------------------------

typedef enum {
	WALLHUGGER_STILL,
	WALLHUGGER_WALKING,
	WALLHUGGER_SHOOTING,
} WallHuggerState;

//-------------------------------------------------------------

class CWallHugger : public CAlien
{
	private:

		CSpinnerWeapon *m_weapon;

		WallHuggerGrade m_grade;
		int m_side;
		int m_direction;
		bool m_fired;

		WallHuggerState m_state;

		static gsCRandom m_random;

		void findWall();

		bool validWalkPosition();

	public:
		CWallHugger();
		~CWallHugger();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_WALL_HUGGER]; };

		bool activate();
		void kill();

		bool update(Controls *controls);

		void setGrade(WallHuggerGrade grade);
};

//-------------------------------------------------------------

#endif
