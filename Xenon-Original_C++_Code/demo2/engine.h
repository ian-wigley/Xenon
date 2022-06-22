//-------------------------------------------------------------
//
// Class:	CEngine
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	CShipEngine
//			CCloneEngine
//
//-------------------------------------------------------------

#ifndef _INCLUDE_ENGINE_H
#define _INCLUDE_ENGINE_H

#include "actor.h"

//-------------------------------------------------------------

const int ENGINE_MAX_THRUST = 10;

//-------------------------------------------------------------

class CEngine : public CActor
{
	private:
		gsCVector m_offset;

	protected:

		gsCVector m_min_extent;
		gsCVector m_max_extent;
		float m_thrust_rate;

		gsCTimer m_thrust_timer;

		int m_thrust;

	public:
		CEngine();
		virtual ~CEngine();

		bool activate();

		bool update(Controls *controls);

		void applyThrust(int thrust);
		void setOffset(const gsCVector& offset);

		void setParams(const gsCVector& min_extent,const gsCVector& max_extent,float thrust_rate);
};

//-------------------------------------------------------------

#endif
