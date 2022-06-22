//-------------------------------------------------------------
//
// Class:	CActor
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	None
//
// Derived:	CShip
//			CAlien
//			CBullet
//			CPickup
//
//-------------------------------------------------------------

#ifndef _INCLUDE_ACTOR_H
#define _INCLUDE_ACTOR_H

#include "gamesystem.h"
#include "actorinfo.h"

class CShip;
class CScene;

//-------------------------------------------------------------

struct Controls
{
	bool left;				// true if left control held
	bool right;				// true if right control held
	bool up;				// true if up control held
	bool down;				// true if down control held
	bool fire;				// true if fire control held
	bool firePressed;		// true if fire control has just been pressed
	bool divePressed;		// true if dive control has just been pressed
	bool reversePressed;	// true if reverse control has just been pressed
	gsKeyCode key;			// latest key press
};

//-------------------------------------------------------------
// Actor Info for creating actors
/*
struct ActorInfo
{
	ActorType m_type;			// type of actor
	char *m_filename;			// file containing sprite frames
	int m_hotspot_x;			// hotspot position (i.e. offset to centre)
	int m_hotspot_y;
	float m_anim_rate;			// animation rate (in frames per second)
	int m_initial_shield;		// initial shield value
	int m_kill_bonus;			// score bonus for killing actor
};
*/
//-------------------------------------------------------------

typedef enum {
	ANIMATE_LOOP,				// cycle repeatedly through frames
	ANIMATE_ONESHOT,			// cycle once then flag as finished
} AnimationMode;

//-------------------------------------------------------------

const float ACTOR_HIT_TIME = 0.1f;	// time in seconds for hit to register

const int INFINITE_SHIELD = -1;

//-------------------------------------------------------------

class CActor
{
	private:

		CActor *m_owner;			// owner
		bool m_is_active;
		gsCTimer m_hit_timer;		// for animation of hit

	protected:

		CScene *m_scene;			// scene containing this actor

		gsCVector m_position;		// relative to map
		gsCVector m_velocity;
		int m_shield;				// shield strength
		gsCSprite m_sprite;
		gsCTiledImage *m_image;
		gsCTimer m_timer;			// for animation

		bool m_is_on_screen;

		bool m_is_hit;

		float m_score_multiplier;

	public:

		CActor();
		virtual ~CActor();

		virtual const ActorInfo& getActorInfo() = 0;

		virtual bool activate();
		virtual void kill();
		virtual void explode();
		virtual bool update(Controls *controls = 0) = 0;
		virtual bool draw();
		virtual void registerHit(int energy,CActor *hitter);

		virtual void onKilled();
		virtual void onLeavingScreen();
		virtual void onCollisionWithActor(CActor *actor);
		virtual void onCollisionWithMap(gsCMap *map,int hits);
		virtual void postProcessCollision();

		bool isActive();
		bool isOnScreen();
		bool isHit();

		gsCVector getPosition();
		gsCVector getVelocity();
		CActor *getOwner();
		int getShield();
		int getDirection(int num_dir);
		virtual gsCRect getCollisionRect();

		void setPosition(const gsCVector& position);
		void setVelocity(const gsCVector& velocity);
		void setOwner(CActor *owner);
		void setScene(CScene *scene);
		void setShield(int shield);

		bool animate(AnimationMode mode);
		bool animate(AnimationMode mode,int first_frame,int num_frames);

		void increaseScoreMultiplier(float amount);
};

//-------------------------------------------------------------

inline bool CActor::isActive()
{
	return m_is_active;
}

//-------------------------------------------------------------

inline gsCVector CActor::getPosition()
{
	return m_position;
}

//-------------------------------------------------------------

inline gsCVector CActor::getVelocity()
{
	return m_velocity;
}

//-------------------------------------------------------------

inline void CActor::setPosition(const gsCVector& position)
{
	m_position = position;
}

//-------------------------------------------------------------

inline void CActor::setVelocity(const gsCVector& velocity)
{
	m_velocity = velocity;
}

//-------------------------------------------------------------

inline bool CActor::isOnScreen()
{
	return m_is_on_screen;
}

//-------------------------------------------------------------

inline bool CActor::isHit()
{
	return m_is_hit;
}

//-------------------------------------------------------------
// Overridable

inline gsCRect CActor::getCollisionRect()
{
	return m_sprite.getRect();
}

//-------------------------------------------------------------
// Overridable

inline void CActor::onLeavingScreen()
{
}

//-------------------------------------------------------------
// Overridable

inline void CActor::onCollisionWithActor(CActor *actor)
{
}

//-------------------------------------------------------------

inline void CActor::onCollisionWithMap(gsCMap *map,int hits)
{
}

//-------------------------------------------------------------
// Overridable

inline void CActor::postProcessCollision()
{
}

//-------------------------------------------------------------

inline void CActor::setOwner(CActor *owner)
{
	m_owner = owner;
}

//-------------------------------------------------------------

inline void CActor::setScene(CScene *scene)
{
	m_scene = scene;
}

//-------------------------------------------------------------

inline CActor *CActor::getOwner()
{
	return m_owner;
}

//-------------------------------------------------------------

inline void CActor::setShield(int shield)
{
	m_shield = shield;
}

//-------------------------------------------------------------

inline int CActor::getShield()
{
	return m_shield;
}

//-------------------------------------------------------------

inline void CActor::increaseScoreMultiplier(float amount)
{
	m_score_multiplier += amount;
}

//-------------------------------------------------------------

#endif


