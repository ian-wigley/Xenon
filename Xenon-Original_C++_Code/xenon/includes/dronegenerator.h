//-------------------------------------------------------------
//
// Class:	CDroneGenerator
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_DRONEGENERATOR_H
#define _INCLUDE_DRONEGENERATOR_H

#include "drone.h"

//-------------------------------------------------------------

const int   DRONE_TOTAL = 8;		// total segments in chain
const float DRONE_DELAY = 0.3f;		// time delay between drone generation
const float DRONE_SPACING = -32.f;	// vertical spacing
const float DRONE_SPEED = 0.6f;

//-------------------------------------------------------------

class CDroneGenerator : public CActor
{
	private:
		int m_drones_created;
		int m_drones_active;
		int m_drones_killed;

	public:
		CDroneGenerator();
		virtual ~CDroneGenerator();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_DRONE_GENERATOR]; };

		bool activate();
		bool update(Controls *controls);

		int droneKilled(bool by_player);
};

//-------------------------------------------------------------

#endif
