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
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

Particle *CDustEffect::createParticle()
{
	if (m_timer.getTime() > 0.05f) {
		m_timer.start();

		Particle *p = new Particle;

		p->m_position = getPosition();
		p->m_velocity = gsCVector::polar(1.0f,m_random.getFloat(360.f)) + gsCVector(0.f,1.f);
		p->m_age = 0.f;
		p->m_lifetime = 1.f;
		p->m_mass = 1.f;

		return p;
		}
	else
		return 0;
}

//-------------------------------------------------------------
