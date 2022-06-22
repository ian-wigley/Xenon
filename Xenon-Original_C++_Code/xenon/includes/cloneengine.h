//-------------------------------------------------------------
//
// Class:	CCloneEngine
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CEngine
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_CLONEENGINE_H
#define _INCLUDE_CLONEENGINE_H

#include "engine.h"

//-------------------------------------------------------------

class CCloneEngine : public CEngine
{
	public:
		CCloneEngine();
		virtual ~CCloneEngine();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_CLONE_ENGINE]; };

		bool draw();
};

//-------------------------------------------------------------

#endif
