//-------------------------------------------------------------
//
// Class:	CExplosion
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	CSmallExplosion
//			CMediumExplosion
//			CBigExplosion
//
//-------------------------------------------------------------

#ifndef _INCLUDE_EXPLOSION_H
#define _INCLUDE_EXPLOSION_H

#include "actor.h"

//-------------------------------------------------------------

class CExplosion : public CActor
{
	public:
		CExplosion();
		virtual ~CExplosion();

		virtual bool activate();

		bool update(Controls *controls);

		void onLeavingScreen();
};

//-------------------------------------------------------------

class CSmallExplosion : public CExplosion
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SMALL_EXPLOSION]; };

		bool activate();
};

//-------------------------------------------------------------

class CMediumExplosion : public CExplosion
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_MEDIUM_EXPLOSION]; };

		bool activate();
};

//-------------------------------------------------------------

class CBigExplosion : public CExplosion
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_BIG_EXPLOSION]; };

		bool activate();
};

//-------------------------------------------------------------

#endif
