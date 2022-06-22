//-------------------------------------------------------------
//
// Class:	CPod
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

#ifndef _INCLUDE_POD_H
#define _INCLUDE_POD_H

#include "alien.h"

//-------------------------------------------------------------

const float POD_MAX_XSPEED = 0.5f;
const float POD_XSPEED_SCALE = 0.01f;

//-------------------------------------------------------------

class CPod : public CAlien
{
	public:
		CPod();
		virtual ~CPod();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_POD]; };

		bool activate();
		bool update(Controls *controls);
};

//-------------------------------------------------------------

#endif
