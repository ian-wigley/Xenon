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
#include "clone.h"
#include "wingtip.h"
#include "shipengine.h"
#include "retroengine.h"
#include "weapon.h"

//-------------------------------------------------------------

const int SHIP_CENTRE_FRAME = 3;		// ship centred frame
const int SHIP_ROLL_FRAMES = 3;			// frame range for roll i.e. -3..+3 from centre
const int SHIP_CLOAK_OFFSET = 7;		// offset to invulnerability frames
const int SHIP_DIVE_FRAMES = 6;			// number of dive frames
const int SHIP_DIVE_OFFSET = 14;		// offset to dive frames

const float SHIP_DIVE_SCALE = (float) 52 / 64;	// scale of dived ship

const float SHIP_ROLL_RATE = 10.f;		// frames per seconds
const int SHIP_MAP_HIT = 10;			// energy lost if ship hits map

//-------------------------------------------------------------

const float CLOAK_FLASH_TIME = 1.f;		// time for flashing to signify end of cloaking
const float CLOAK_FLASH_RATE = 0.15f;	// flash rate

//-------------------------------------------------------------

typedef enum {
	HANDLING_BAD,
	HANDLING_NORMAL,
	HANDLING_GOOD,
} ShipHandling;

//-------------------------------------------------------------

class CShip : public CActor
{
	private:
		CWeapon *m_weapon;

		WeaponType m_weapon_type;

		CClone *m_left_clone;
		CClone *m_right_clone;
		
		CWingtip *m_left_wingtip;
		CWingtip *m_right_wingtip;

		CShipEngine *m_left_engine;
		CShipEngine *m_right_engine;
		CRetroEngine *m_retro_nw;
		CRetroEngine *m_retro_ne;
		CRetroEngine *m_retro_sw;
		CRetroEngine *m_retro_se;

		float m_max_speed;
		float m_acceleration;
		float m_damping;		

		ShipHandling m_handling;

		int m_roll;

		gsCTimer m_cloak_timer;
		float m_cloak_time_limit;

		enum {
			DIVE_OFF,
			DIVING_DOWN,
			DIVE_ACTIVE,
			DIVING_UP
		} m_dive_mode;

		int m_dive_level;
		gsCTimer m_dive_timer;
		float m_dive_time_limit;

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

		void addWeapon(WeaponType type,WeaponGrade grade = WEAPON_STANDARD);
		bool upgradeWeapon();

		bool attachClone(int side);
		void detachClone(CClone *clone);
		bool attachWingtip(int side);
		void detachWingtip(CWingtip *clone);
		void removeUpgrades();

		void setHandling(ShipHandling handling);
		ShipHandling getHandling();

		void setCloak(float time);
		bool isCloaked();
		bool isCloakFlashing();

		void dive(float time);
		int getDiveLevel();
		float getDiveScale();

		void reverseWeapon();

};

//-------------------------------------------------------------

#endif

