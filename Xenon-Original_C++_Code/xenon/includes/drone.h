//-------------------------------------------------------------
//
// Class:	CDrone
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

#ifndef _INCLUDE_DRONE_H
#define _INCLUDE_DRONE_H

#include "alien.h"

class CDroneGenerator;

//-------------------------------------------------------------

class CDrone : public CAlien
{
	private:
		CDroneGenerator *m_generator;

		float m_phase;

	public:
		CDrone(CDroneGenerator *generator);
		virtual ~CDrone();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_DRONE]; };

		bool activate();
		bool update(Controls *controls);

		void onLeavingScreen();

		void setPhase(float p);
};

//-------------------------------------------------------------

#endif
