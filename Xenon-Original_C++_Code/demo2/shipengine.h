//-------------------------------------------------------------
//
// Class:	CShipEngine
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

#ifndef _INCLUDE_SHIPENGINE_H
#define _INCLUDE_SHIPENGINE_H

#include "engine.h"

//-------------------------------------------------------------

class CShipEngine : public CEngine
{
	public:
		CShipEngine();
		virtual ~CShipEngine();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SHIP_ENGINE]; };

		bool draw();
};

//-------------------------------------------------------------

#endif
