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

#ifndef _INCLUDE_WEAPON_H
#define _INCLUDE_WEAPON_H

#include "actor.h"
#include "bullet.h"

//-------------------------------------------------------------

typedef enum {
	NO_WEAPON,
	MISSILE_WEAPON,
	HOMING_MISSILE_WEAPON,
	LASER_WEAPON
} WeaponType;

//-------------------------------------------------------------

typedef enum {
	WEAPON_STANDARD,
	WEAPON_MEDIUM,
	WEAPON_BEST
} WeaponGrade;

//-------------------------------------------------------------

typedef enum {
	WEAPON_AUTOMATIC,
	WEAPON_MANUAL,
} WeaponFiringMode;

//-------------------------------------------------------------

typedef enum {
	WEAPON_FORWARD,
	WEAPON_REVERSE,
} WeaponDirection;

//-------------------------------------------------------------

const int WEAPON_ONSCREEN_RADIUS = 8;

//-------------------------------------------------------------

class CWeapon : public CActor
{
	protected:
		WeaponGrade m_grade;
		gsCVector m_offset;

		gsCTimer m_fire_timer;
		bool m_delay_fire;

		gsCTimer m_autofire_timer;
		bool m_autofire;

		WeaponFiringMode m_mode;
		WeaponDirection m_direction;

		bool isValidFiringPosition();

	public:
		CWeapon();
		virtual ~CWeapon();

		bool update(Controls *controls);

		virtual bool activate();
		virtual bool fire() = 0;

		void setGrade(WeaponGrade grade = WEAPON_STANDARD);
		void setOffset(const gsCVector& offset);
		void setFiringMode(WeaponFiringMode mode = WEAPON_AUTOMATIC);
		void setDirection(WeaponDirection direction = WEAPON_FORWARD);

		WeaponDirection getDirection();

		bool upgrade();
};

//-------------------------------------------------------------

#endif
