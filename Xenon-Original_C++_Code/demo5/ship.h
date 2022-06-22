//-------------------------------------------------------------
//
// Class:	Player's Ship
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

#ifndef _INCLUDE_SHIP_H
#define _INCLUDE_SHIP_H

#include "actor.h"
#include "weapon.h"

//-------------------------------------------------------------

const int SHIP_CENTRE_FRAME = 3;		// ship centred frame
const int SHIP_ROLL_FRAMES = 3;			// frame range for roll i.e. -3..+3 from centre

const float SHIP_ROLL_RATE = 10.f;		// frames per seconds
const int SHIP_MAP_HIT = 0;			// energy lost if ship hits map

//-------------------------------------------------------------

class CShip : public CActor
{
	private:
		CWeapon *m_weapon;

		WeaponType m_weapon_type;

		float m_max_speed;
		float m_acceleration;
		float m_damping;		

		int m_roll;

	public:
		CShip();
		~CShip();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SHIP]; };

		bool activate();
		void kill();

		void explode();

		bool update(Controls *controls);

		gsCRect getCollisionRect();

		void registerHit(int energy,CActor *hitter);

		void onCollisionWithActor(CActor *actor);
		void onCollisionWithMap(gsCMap *map,int hits);

		void setWeapon(WeaponType type,WeaponGrade grade = WEAPON_STANDARD);

		WeaponType getWeaponType();
};

//-------------------------------------------------------------

#endif

