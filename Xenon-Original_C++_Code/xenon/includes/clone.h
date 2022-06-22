//-------------------------------------------------------------
//
// Class:	CClone
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CUpgrade
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_CLONE_H
#define _INCLUDE_CLONE_H

#include "upgrade.h"
#include "cloneengine.h"
#include "weapon.h"

//-------------------------------------------------------------

const int CLONE_FRAMES = 16;
const int CLONE_DIVE_OFFSET = 16;
const int CLONE_DIVE_FRAMES = 3;
const int CLONE_CLOAK_FRAME = 19;

const float CLONE_RADIUS = 80.f;
const float CLONE_ANGLE_STEP = 0.6f;		// degrees

//-------------------------------------------------------------

class CClone : public CUpgrade
{
	private:
		float m_min_angle;
		float m_max_angle;

		float m_current_angle;
		float m_required_angle;

		CCloneEngine *m_engine;

	public:
		CClone();
		virtual ~CClone();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_CLONE]; };

		bool activate();
		void kill();

		bool update(Controls *controls);

		void setAngleRange(float min,float max);
		void setAngle(float angle,bool set = false);
};

//-------------------------------------------------------------

#endif

