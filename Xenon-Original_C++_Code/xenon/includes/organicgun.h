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

#ifndef _INCLUDE_ORGANICGUN_H
#define _INCLUDE_ORGANICGUN_H

#include "alien.h"
#include "gs_random.h"

//-------------------------------------------------------------

const int ORGANICGUN_SHOT_START = 0;
const int ORGANICGUN_SHOT_FRAMES = 8;
const int ORGANICGUN_LAUNCH_FRAME = 6;

const int ORGANICGUN_LEFT = 0;
const int ORGANICGUN_RIGHT = 8;

const float ORGANICGUN_STILL_TIME = 1.f;

//-------------------------------------------------------------

typedef enum {
	ORGANICGUN_STILL,
	ORGANICGUN_SHOOTING,
} OrganicGunState;

//-------------------------------------------------------------

class COrganicGun : public CAlien
{
	private:

		CSpinnerWeapon *m_weapon;

		int m_side;
		int m_direction;
		bool m_fired;

		OrganicGunState m_state;

		static gsCRandom m_random;

	public:
		COrganicGun();
		~COrganicGun();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_ORGANIC_GUN]; };

		bool activate();
		void kill();

		void setDirection(int dir);

		void onLeavingScreen();

		bool update(Controls *controls);
};

//-------------------------------------------------------------

#endif
