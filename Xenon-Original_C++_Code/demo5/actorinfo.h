//-------------------------------------------------------------
//
// Class:	CActorInfo
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	None
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_ACTORINFO_H
#define _INCLUDE_ACTORINFO_H

//-------------------------------------------------------------
// Actor Types
//
// These types are also used to determine collision order
// If two actors collide then the actor with the lowest
// type value receives the onCollision call
// e.g. a bullet hits an alien, not the other way round !

typedef enum {
	ACTOR_TYPE_SHIP,		// player's ship
	ACTOR_TYPE_BULLET,		// ship and alien bullets
	ACTOR_TYPE_UPGRADE,		// ship upgrades
	ACTOR_TYPE_ENGINE,		// engine glows
	ACTOR_TYPE_WEAPON,		// ship weapons
	ACTOR_TYPE_PICKUP,		// bonus pickups
	ACTOR_TYPE_ALIEN,		// aliens
	ACTOR_TYPE_ALIENBULLET,	// alien bullet
	ACTOR_TYPE_LABEL,		// floating text labels
	ACTOR_TYPE_EFFECT,		// special effects
	ACTOR_TYPE_BOSS,		// boss

	ACTOR_TYPE_TOTAL
} ActorType;

//-------------------------------------------------------------

typedef enum
{
	// pickups

	INFO_SHIELD_PICKUP,
	INFO_SPEED_PICKUP,
	INFO_WEAPON_PICKUP,
	INFO_CLOAK_PICKUP,
	INFO_DIVE_PICKUP,
	INFO_SCORE_PICKUP,
	INFO_CLONE_PICKUP,
	INFO_WINGTIP_PICKUP,
	INFO_HOMING_MISSILE_PICKUP,
	INFO_LASER_PICKUP,
	INFO_LIFE_PICKUP,

	// aliens

	INFO_WALL_HUGGER,
	INFO_SMALL_STANDARD_ASTEROID,
	INFO_MEDIUM_STANDARD_ASTEROID,
	INFO_BIG_STANDARD_ASTEROID,
	INFO_SMALL_HIGHDENSITY_ASTEROID,
	INFO_MEDIUM_HIGHDENSITY_ASTEROID,
	INFO_BIG_HIGHDENSITY_ASTEROID,
	INFO_SMALL_INDESTRUCTIBLE_ASTEROID,
	INFO_MEDIUM_INDESTRUCTIBLE_ASTEROID,
	INFO_BIG_INDESTRUCTIBLE_ASTEROID,
	INFO_RUSHER,
	INFO_POD,
	INFO_HOMER,
	INFO_DRONE,
	INFO_STANDARD_LONER,
	INFO_MEDIUM_LONER,
	INFO_ARMOURED_LONER,
	INFO_ORGANIC_GUN,

	// bullets

	INFO_MISSILE,
	INFO_HOMING_MISSILE,
	INFO_LASER,
	INFO_HOMER_PROJECTILE,
	INFO_SPINNER,
	INFO_SPORE,

	// weapons

	INFO_MISSILE_WEAPON,
	INFO_HOMING_MISSILE_WEAPON,
	INFO_LASER_WEAPON,
	INFO_HOMER_PROJECTILE_WEAPON,
	INFO_SPINNER_WEAPON,

	// ship

	INFO_SHIP,

	// upgrades

	INFO_CLONE,
	INFO_WINGTIP,

	// engines

	INFO_SHIP_ENGINE,
	INFO_CLONE_ENGINE,
	INFO_RETRO_ENGINE,

	// effects

	INFO_SMALL_EXPLOSION,
	INFO_MEDIUM_EXPLOSION,
	INFO_BIG_EXPLOSION,
	INFO_STANDARD_DUST_EFFECT,
	INFO_HIGHDENSITY_DUST_EFFECT,
	INFO_SMOKE_EFFECT,
	INFO_LABEL,

	// generators

	INFO_DRONE_GENERATOR,
	INFO_RUSHER_GENERATOR,
	INFO_SPORE_GENERATOR,

	// boss

	INFO_BOSSMOUTH,
	INFO_BOSSEYE,
	INFO_BOSSCONTROL,

	// Note: add new actors before this line

	INFO_TOTAL

} ActorInfoType;

//-------------------------------------------------------------

typedef enum {
	BULLET_STANDARD,
	BULLET_MEDIUM,
	BULLET_BEST,

	BULLET_GRADES
} BulletGrade;

//-------------------------------------------------------------
// Actor Info for creating actors

struct ActorInfo
{
	// for all actors

	const char *m_name;			// name (used for load/save to config file)
	ActorType m_type;			// type of actor
	char *m_filename;			// file containing sprite frames
	int m_tile_width;			// width of 1 frame
	int m_tile_height;			// height of 1 frame
	int m_hotspot_x;			// hotspot position (i.e. offset to centre)
	int m_hotspot_y;
	float m_anim_rate;			// animation rate (in frames per second)
	int m_initial_shield;		// initial shield value
	int m_kill_bonus;			// score bonus for killing actor

	// for weapons only

	float m_fire_delay;			// minimum delay between shots
	float m_autofire_delay;		// delay between shots when using autofire

	// for bullets only

	int m_energy[BULLET_GRADES];	// energy for each grade of bullet
	float m_speed[BULLET_GRADES];	// movement speed
};

//-------------------------------------------------------------

class CActorInfoList
{
	private:
		static ActorInfo m_info_list[INFO_TOTAL];

	public:
		const ActorInfo& operator[] (const int index);

		bool load(const char *filename);
		bool save(const char *filename);
};

//-------------------------------------------------------------

inline const ActorInfo& CActorInfoList::operator[] (const int index)
{
	return m_info_list[index];
};

//-------------------------------------------------------------

extern CActorInfoList ActorInfoList;

//-------------------------------------------------------------

#endif
