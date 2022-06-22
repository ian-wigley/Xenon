//-------------------------------------------------------------
//
// Class:	CPickup
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	CxxxPickup
//
//-------------------------------------------------------------

#ifndef _INCLUDE_PICKUP_H
#define _INCLUDE_PICKUP_H

#include "actor.h"

//-------------------------------------------------------------

const float CLOAK_TIME = 5.f;			// total length of cloaking

//-------------------------------------------------------------

class CPickup : public CActor
{
	public:
		bool activate();

		bool update(Controls *controls);

		void onLeavingScreen();

		virtual void collect() = 0;
};

//-------------------------------------------------------------

class CClonePickup : public CPickup
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_CLONE_PICKUP]; };
		void collect();
		bool update(Controls *controls);
};

//-------------------------------------------------------------

class CDivePickup : public CPickup
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_DIVE_PICKUP]; };
		void collect();
};

//-------------------------------------------------------------

class CHomingMissilePickup : public CPickup
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_HOMING_MISSILE_PICKUP]; };
		void collect();
};

//-------------------------------------------------------------

class CCloakPickup : public CPickup
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_CLOAK_PICKUP]; };
		void collect();
};

//-------------------------------------------------------------

class CLaserPickup : public CPickup
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_LASER_PICKUP]; };
		void collect();
};

//-------------------------------------------------------------

class CScorePickup : public CPickup
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SCORE_PICKUP]; };
		void collect();
};

//-------------------------------------------------------------

class CShieldPickup : public CPickup
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SHIELD_PICKUP]; };
		void collect();
};

//-------------------------------------------------------------

class CSpeedPickup : public CPickup
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SPEED_PICKUP]; };
		void collect();
};

//-------------------------------------------------------------

class CWeaponPickup : public CPickup
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_WEAPON_PICKUP]; };
		void collect();
};

//-------------------------------------------------------------

class CWingtipPickup : public CPickup
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_WINGTIP_PICKUP]; };
		void collect();
		bool update(Controls *controls);
};

//-------------------------------------------------------------

#endif
