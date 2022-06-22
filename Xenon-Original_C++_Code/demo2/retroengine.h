//-------------------------------------------------------------
//
// Class:	CRetroEngine
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

#ifndef _INCLUDE_RETROENGINE_H
#define _INCLUDE_RETROENGINE_H

#include "engine.h"

//-------------------------------------------------------------

typedef enum
{
	RETRO_NW,
	RETRO_NE,
	RETRO_SW,
	RETRO_SE
} RetroDirection;

//-------------------------------------------------------------

class CRetroEngine : public CEngine
{
	private:
		RetroDirection m_direction;

	public:
		CRetroEngine();
		virtual ~CRetroEngine();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_RETRO_ENGINE]; };

		bool draw();

		void setDirection(RetroDirection direction);
};

//-------------------------------------------------------------

#endif
