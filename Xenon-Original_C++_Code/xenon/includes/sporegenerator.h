//-------------------------------------------------------------
//
// Class:	CSporeGenerator
//
// Author:	John M Phillips
//
// Started:	07/05/00
//
// Base:	CGenerator
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_SPOREGENERATOR_H
#define _INCLUDE_SPOREGENERATOR_H

#include "Actor.h"

//-------------------------------------------------------------

class CSporeGenerator : public CActor
{
	private:
		int m_spores_created;
		int m_spores_alive;
		int m_spores_killed;

	public:
		CSporeGenerator();
		virtual ~CSporeGenerator();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SPORE_GENERATOR]; };

		bool activate();
		bool update(Controls *controls);

		void onLeavingScreen();

		bool sporeKilled(bool by_player);
};

//-------------------------------------------------------------

#endif
