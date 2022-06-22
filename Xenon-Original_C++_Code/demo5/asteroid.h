//-------------------------------------------------------------
//
// Class:	CAsteroid
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CAlien
//
// Derived:	CSmallAsteroid
//			CMediumAsteroid
//			CBigAsteroid
//
//-------------------------------------------------------------

#ifndef _INCLUDE_ASTEROID_H
#define _INCLUDE_ASTEROID_H

#include "demo5.h"

//-------------------------------------------------------------

class CAsteroid : public CAlien
{
	private:
		int m_score_multiplier;

	public:
		CAsteroid();
		virtual ~CAsteroid();

		bool activate();

		bool update(Controls *controls);

		virtual void fragment() = 0;
};

//-------------------------------------------------------------

class CSmallStandardAsteroid : public CAsteroid
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SMALL_STANDARD_ASTEROID]; };
		void fragment();
};

//-------------------------------------------------------------

class CSmallHighDensityAsteroid : public CAsteroid
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SMALL_HIGHDENSITY_ASTEROID]; };
		void fragment();
};

//-------------------------------------------------------------

class CSmallIndestructibleAsteroid : public CAsteroid
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SMALL_INDESTRUCTIBLE_ASTEROID]; };
		void fragment();
};

//-------------------------------------------------------------

class CMediumStandardAsteroid : public CAsteroid
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_MEDIUM_STANDARD_ASTEROID]; };
		void fragment();
};

//-------------------------------------------------------------

class CMediumHighDensityAsteroid : public CAsteroid
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_MEDIUM_HIGHDENSITY_ASTEROID]; };
		void fragment();
};

//-------------------------------------------------------------

class CMediumIndestructibleAsteroid : public CAsteroid
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_MEDIUM_INDESTRUCTIBLE_ASTEROID]; };
		void fragment();
};

//-------------------------------------------------------------

class CBigStandardAsteroid : public CAsteroid
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_BIG_STANDARD_ASTEROID]; };
		void fragment();
};

//-------------------------------------------------------------

class CBigHighDensityAsteroid : public CAsteroid
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_BIG_HIGHDENSITY_ASTEROID]; };
		void fragment();
};

//-------------------------------------------------------------

class CBigIndestructibleAsteroid : public CAsteroid
{
	public:
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_BIG_INDESTRUCTIBLE_ASTEROID]; };
		void fragment();
};

//-------------------------------------------------------------

#endif
