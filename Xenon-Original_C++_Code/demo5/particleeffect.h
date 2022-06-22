//-------------------------------------------------------------
//
// Class:	CParticleEffect
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

#ifndef _INCLUDE_PARTICLEEFFECT_H
#define _INCLUDE_PARTICLEEFFECT_H

#include "actor.h"

//-------------------------------------------------------------

const float INFINITE_LIFETIME = 99999.f;

//-------------------------------------------------------------
// Simple particle

struct Particle
{
	gsCVector m_position;
	gsCVector m_velocity;
	float m_mass;
	float m_age;
	float m_lifetime;
};

//-------------------------------------------------------------

class CParticleEffect : public CActor
{
	private:

		gsCVector m_offset;

		gsCList<Particle *> m_particle_list;

		bool m_point_force;

		gsCVector m_force_position;
		gsCVector m_force_direction;		// ignored if point force
		float m_force_strength;				// ignored if directional force

		gsCTimer m_life_timer;
		float m_lifetime;

		void destroy();

	public:
		CParticleEffect();
		virtual ~CParticleEffect();

		virtual bool activate();
		void kill();

		void onLeavingScreen();

		virtual Particle *createParticle() = 0;

		bool update(Controls *controls);
		bool draw();

		void setOffset(const gsCVector offset);
		void setLifetime(float time);
};

//-------------------------------------------------------------

inline void CParticleEffect::setOffset(const gsCVector offset)
{
	m_offset = offset;
}

//-------------------------------------------------------------

inline  void CParticleEffect::setLifetime(float time)
{
	m_lifetime = time;
}

//-------------------------------------------------------------

#endif
