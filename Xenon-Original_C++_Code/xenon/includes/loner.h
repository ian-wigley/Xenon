//-------------------------------------------------------------
//
// Class:	CLoner
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CAlien
//
// Derived:	CStandardLoner
//			CMediumLoner
//			CArmouredLoner
//
//-------------------------------------------------------------

#ifndef _INCLUDE_LONER_H
#define _INCLUDE_LONER_H

#include "alien.h"

//-------------------------------------------------------------

class CLoner : public CAlien
{
	private:
		CSpinnerWeapon *m_weapon;

	public:
		CLoner();
		virtual ~CLoner();

		bool activate();
		void kill();
		bool update(Controls *controls);
};

//-------------------------------------------------------------

class CStandardLoner : public CLoner
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_STANDARD_LONER]; };
};

//-------------------------------------------------------------

class CMediumLoner : public CLoner
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_MEDIUM_LONER]; };
};

//-------------------------------------------------------------

class CArmouredLoner : public CLoner
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_ARMOURED_LONER]; };
};

//-------------------------------------------------------------

#endif
