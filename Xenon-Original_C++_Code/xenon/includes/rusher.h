//-------------------------------------------------------------
//
// Class:	CRusher
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

#ifndef _INCLUDE_RUSHER_H
#define _INCLUDE_RUSHER_H

#include "alien.h"

//-------------------------------------------------------------

class CRusher : public CAlien
{
	private:
		CSpinnerWeapon *m_weapon;
		static gsCRandom m_random;

	public:
		CRusher();
		virtual ~CRusher();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_RUSHER]; };

		bool activate();
		void kill();
		bool update(Controls *controls);
};

//-------------------------------------------------------------

#endif
