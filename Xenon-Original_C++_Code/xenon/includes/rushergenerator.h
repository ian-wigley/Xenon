//-------------------------------------------------------------
//
// Class:	CRusherGenerator
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

#ifndef _INCLUDE_RUSHERGENERATOR_H
#define _INCLUDE_RUSHERGENERATOR_H

#include "rusher.h"

//-------------------------------------------------------------

const int   RUSHER_TOTAL = 6;		// total segments in chain
const float RUSHER_DELAY = 0.5f;	// time delay between generation

//-------------------------------------------------------------

class CRusherGenerator : public CActor
{
	private:
		int m_rushers_created;

		gsCTimer m_delay_timer;

	public:
		CRusherGenerator();
		virtual ~CRusherGenerator();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_RUSHER_GENERATOR]; };

		bool activate();
		bool update(Controls *controls);
};

//-------------------------------------------------------------

#endif
