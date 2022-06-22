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

#include "game.h"

//-------------------------------------------------------------

CParticleEffect::CParticleEffect()
{
	m_point_force = false;
	m_force_position = gsCVector(0.f,0.f);
	m_force_direction = gsCVector(0.f,0.f);
	m_force_strength = 1.f;
	m_lifetime = INFINITE_LIFETIME;
}

//-------------------------------------------------------------

CParticleEffect::~CParticleEffect()
{
	destroy();

//	CActor::~CActor();
}

//-------------------------------------------------------------

void CParticleEffect::destroy()
{
	for (int i = 0; i < m_particle_list.getSize(); i++)
		delete m_particle_list[i];

	m_particle_list.clear();
}

//-------------------------------------------------------------

bool CParticleEffect::activate()
{
	if (!isActive()) {
		m_timer.start();
		m_life_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

void CParticleEffect::kill()
{
	destroy();

	CActor::kill();
}

//-------------------------------------------------------------

void CParticleEffect::onLeavingScreen()
{
	if (!getOwner())
		kill();
}

//-------------------------------------------------------------

bool CParticleEffect::update(Controls *controls)
{
	// update effect global position

	if (getOwner())
		m_position = getOwner()->getPosition() + m_offset;
	else
		m_position += m_velocity;

	// create new particle

	if (m_lifetime == INFINITE_LIFETIME ||
		m_life_timer.getTime() < m_lifetime) {
		Particle *p = createParticle();
		if (p)
			m_particle_list.addItem(p);
		}
	else {
		if (m_particle_list.isEmpty()) {
			kill();
			return true;
			}
		}

	// update all

	float delta_time = gsCTimer::getDeltaTime();

	for (int i = m_particle_list.getSize() - 1; i >= 0 ; i--) {
		Particle *p = m_particle_list[i];

		p->m_age += delta_time;

		if (p->m_age >= p->m_lifetime) {

			// kill particle

			delete m_particle_list[i];
			m_particle_list.removeIndex(i);
			}
		else {
			p->m_position += p->m_velocity;

			if (m_point_force) {
				//NYI
				}
			else {
				//NYI
				}
			}
		}

	return true;
}

//-------------------------------------------------------------

bool CParticleEffect::draw()
{
	gsCRect screen_rect = gsCApplication::getScreen()->getRect();

	if (!screen_rect.contains(m_position + m_scene->getMap()->getPosition())) {
		onLeavingScreen();
		return true;
		}

	for (int i = m_particle_list.getSize() - 1; i >= 0 ; i--) {
		Particle *p = m_particle_list[i];
		
		int frame = (int) (m_image->getNumTiles() * p->m_age / p->m_lifetime);

		if (!m_image->draw(frame,p->m_position + m_scene->getMap()->getPosition())) {

			// kill particle

			delete m_particle_list[i];
			m_particle_list.removeIndex(i);
			}
		}

	return true;
}

//-------------------------------------------------------------
