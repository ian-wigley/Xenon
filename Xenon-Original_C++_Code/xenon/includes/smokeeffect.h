//-------------------------------------------------------------
//
// Class:	CSmokeEffect
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CParticleEffect
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_SMOKEEFFECT_H
#define _INCLUDE_SMOKEEFFECT_H

#include "particleeffect.h"

//-------------------------------------------------------------

class CSmokeEffect : public CParticleEffect
{
	private:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SMOKE_EFFECT]; };

		gsCRandom m_random;

		Particle *createParticle();
};

//-------------------------------------------------------------

#endif
