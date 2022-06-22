//-------------------------------------------------------------
//
// Class:	CWeapon
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

#include "demo5.h"

//-------------------------------------------------------------

CWeapon::CWeapon()
{
	m_grade = WEAPON_STANDARD;
	m_offset = gsCVector(0.f,0.f);
	m_mode = WEAPON_AUTOMATIC;
	m_direction = WEAPON_FORWARD;
}

//-------------------------------------------------------------

CWeapon::~CWeapon()
{
}

//-------------------------------------------------------------

bool CWeapon::activate()
{
	if (!isActive()) {
		m_delay_fire = false;
		m_autofire = false;
		}
		
	return CActor::activate();
}

//-------------------------------------------------------------

bool CWeapon::update(Controls *controls)
{
	if (!controls ||
		!getOwner())
		return false;

	m_position = getOwner()->getPosition() + m_offset;

	if (m_mode == WEAPON_MANUAL)
		return true;

	switch (getOwner()->getActorInfo().m_type) {
		case ACTOR_TYPE_SHIP:
		case ACTOR_TYPE_UPGRADE:
			{
				bool do_fire = false;

				if (m_autofire) {
					if (controls->fire) {
						if (m_autofire_timer.getTime() >= getActorInfo().m_autofire_delay) {
							do_fire = true;
							m_autofire_timer.start();
							}
						}
					else {
						m_autofire = false;
						m_delay_fire = false;
						}
					}

				if (controls->firePressed ||
					(controls->fire && !m_autofire)) {
					if (m_delay_fire) {
						if (m_fire_timer.getTime() >= getActorInfo().m_fire_delay)
							m_delay_fire = false;
						}
					if (!m_delay_fire) {
						do_fire = true;
						m_delay_fire = true;
						m_fire_timer.start();
						if (getActorInfo().m_autofire_delay == 0.f)
							m_autofire = false;
						else {
							m_autofire = true;
							m_autofire_timer.start();
							}
						}
					}

				if (do_fire)
					fire();
			}
			break;

		case ACTOR_TYPE_ALIEN:
			{
				if (!m_delay_fire || m_fire_timer.getTime() >= getActorInfo().m_fire_delay) {
					m_delay_fire = true;
					m_fire_timer.start();
					fire();
					}
			}
			break;
		}

	return true;
}

//-------------------------------------------------------------

void CWeapon::setGrade(WeaponGrade grade)
{
	m_grade = grade;
}

//-------------------------------------------------------------

bool CWeapon::upgrade()
{
	switch (m_grade) {
		case WEAPON_STANDARD:
			setGrade(WEAPON_MEDIUM);
			return true;
		case WEAPON_MEDIUM:
			setGrade(WEAPON_BEST);
			return true;
		}

	return false;
}

//-------------------------------------------------------------

void CWeapon::setOffset(const gsCVector& offset)
{
	m_offset = offset;
}

//-------------------------------------------------------------

void CWeapon::setFiringMode(WeaponFiringMode mode)
{
	m_mode = mode;
}

//-------------------------------------------------------------

bool CWeapon::isValidFiringPosition()
{
	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen)
		return false;

	return true;

	// NYI
/*
	gsCPoint pos = getOwner()->getPosition() + m_offset + m_map->getPosition();

	gsCRect rect(pos - gsCPoint(WEAPON_ONSCREEN_RADIUS,WEAPON_ONSCREEN_RADIUS),
				 pos + gsCPoint(WEAPON_ONSCREEN_RADIUS,WEAPON_ONSCREEN_RADIUS));

	return screen->getRect().contains(rect);
*/
}

//-------------------------------------------------------------

void CWeapon::setDirection(WeaponDirection direction)
{
	m_direction = direction;
}

//-------------------------------------------------------------

WeaponDirection CWeapon::getDirection()
{
	return m_direction;
}

//-------------------------------------------------------------
