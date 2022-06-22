//-------------------------------------------------------------
//
// Class:	COrganicGun
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

#include "game.h"

//-------------------------------------------------------------

gsCRandom COrganicGun::m_random;

//-------------------------------------------------------------

COrganicGun::COrganicGun()
{
	m_weapon = 0;
	m_fired = false;
}

//-------------------------------------------------------------

COrganicGun::~COrganicGun()
{
}

//-------------------------------------------------------------

void COrganicGun::setDirection(int dir)
{
	if (dir > 0) {
		m_side = ORGANICGUN_LEFT;
		m_weapon->setDirection(gsCVector(1.f,0.f));
		}
	else {
		m_side = ORGANICGUN_RIGHT;
		m_weapon->setDirection(gsCVector(-1.f,0.f));
		}
}

//-------------------------------------------------------------

bool COrganicGun::activate()
{
	if (!isActive()) {
		m_weapon = new CSpinnerWeapon;
		m_scene->addActor(m_weapon);
		m_weapon->activate();
		m_weapon->setOwner(this);
		m_weapon->setOffset(gsCVector(16.f,16.f));
		m_weapon->setFiringMode(WEAPON_MANUAL);
		m_weapon->setGrade(WEAPON_BEST);

		m_state = ORGANICGUN_STILL;
		m_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------
void COrganicGun::kill()
{
	if (m_weapon) {
		m_weapon->kill();
		m_weapon = 0;
		}

	CActor::kill();
}

//-------------------------------------------------------------
		
bool COrganicGun::update(Controls *controls)
{
	if (m_shield == 0) {
		explode();
		kill();
		return true;
		}

	switch (m_state) {
		case ORGANICGUN_STILL:
			{
			m_sprite.setFrame(m_side + ORGANICGUN_SHOT_START);

			if (m_timer.getTime() >= ORGANICGUN_STILL_TIME) {

				m_state = ORGANICGUN_SHOOTING;
				m_fired = false;
				m_timer.start();
				}
			}
			break;
		case ORGANICGUN_SHOOTING:
			{
				int frame = (int) (m_timer.getTime() * getActorInfo().m_anim_rate);
				if (frame >= ORGANICGUN_SHOT_FRAMES) {
					m_sprite.setFrame(m_side + ORGANICGUN_SHOT_START);
					m_state = ORGANICGUN_STILL;
					m_timer.start();
					}			
				else {
					m_sprite.setFrame(m_side + ORGANICGUN_SHOT_START + frame);
					if (!m_fired && frame >= ORGANICGUN_LAUNCH_FRAME) {
						m_weapon->fire();
						m_fired = true;
						}
					}
			}
			break;
		}

	return true;
}

//-------------------------------------------------------------

void COrganicGun::onLeavingScreen()
{
	if (!CPlayGameState::reachedBoss())
		kill();
}

//-------------------------------------------------------------

