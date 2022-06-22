//-------------------------------------------------------------
//
// Class:	CHomer
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

#ifndef _INCLUDE_HOMER_H
#define _INCLUDE_HOMER_H

#include "alien.h"

//-------------------------------------------------------------

const float HOMER_MAX_XSPEED = 3.f;
const float HOMER_XSPEED_SCALE = 0.025f;

//-------------------------------------------------------------

class CHomer : public CAlien
{
	public:
		CHomer();
		virtual ~CHomer();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_HOMER]; };

		bool activate();

		bool update(Controls *controls);
};

//-------------------------------------------------------------

#endif
