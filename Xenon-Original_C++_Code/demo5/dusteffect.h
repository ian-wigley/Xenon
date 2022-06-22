//-------------------------------------------------------------
//
// Class:	CDustEffect
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CParticleEffect
//
// Derived:	CStandardDustEffect
//			CHighDensityDustEffect
//
//-------------------------------------------------------------

#ifndef _INCLUDE_DUSTEFFECT_H
#define _INCLUDE_DUSTEFFECT_H

#include "particleeffect.h"

//-------------------------------------------------------------

class CDustEffect : public CParticleEffect
{
	private:
		gsCRandom m_random;

		Particle *createParticle();
};

//-------------------------------------------------------------

class CStandardDustEffect : public CDustEffect
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_STANDARD_DUST_EFFECT]; };
};

//-------------------------------------------------------------

class CHighDensityDustEffect : public CDustEffect
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_HIGHDENSITY_DUST_EFFECT]; };
};

//-------------------------------------------------------------

#endif
