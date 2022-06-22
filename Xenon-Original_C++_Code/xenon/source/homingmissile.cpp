//-------------------------------------------------------------
//
// Class:	CHomingMissile
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CBullet
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CHomingMissile::CHomingMissile()
{
	m_target = gsCVector(0.f,0.f);
	m_has_target = false;
}

//-------------------------------------------------------------

CHomingMissile::~CHomingMissile()
{
}

//-------------------------------------------------------------

bool CHomingMissile::activate()
{
	if (!isActive()) {
		if (m_velocity.getY() < 0.f)
			m_angle = 0.f;
		else
			m_angle = 180.f;
		m_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

bool CHomingMissile::update(Controls *controls)
{
	int direction = 0;

	m_position += m_velocity;

	if (m_has_target && m_timer.getTime() >= HOMING_MISSILE_STARTUP) {
	
		gsCVector relpos = m_target - m_position;

		if (relpos.length() > HOMING_MISSILE_THRESHOLD) {

			float a = relpos.direction();

			float da = a - m_angle;

			if (gsAbs(da) < HOMING_MISSILE_TURNRATE)
				m_angle = a;
			else {
				while (da < 0.f)
					da += 360.f;
				while (da >= 360.f)
					da -= 360.f;

				if (da < 180.f)
					m_angle += HOMING_MISSILE_TURNRATE;
				else
					m_angle -= HOMING_MISSILE_TURNRATE;
				}

			while (m_angle < 0.f)
				m_angle += 360.f;
			while (m_angle >= 360.f)
				m_angle -= 360.f;
			
			setVelocity(gsCVector::polar(getActorInfo().m_speed[m_grade],m_angle));
			}
		else
			m_has_target = false;
		}

	direction = ((int) ((m_angle + 22.5f) / 45.f)) & 7;

	m_sprite.setFrame(/*(int) m_grade + */ direction);		//TEMP

	return true;
}

//-------------------------------------------------------------

void CHomingMissile::setTarget(const gsCVector& target)
{
	m_target = target;

	m_has_target = true;
}

//-------------------------------------------------------------
