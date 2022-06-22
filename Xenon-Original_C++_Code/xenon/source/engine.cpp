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

#include "game.h"

//-------------------------------------------------------------

CEngine::CEngine()
{
	m_offset = gsCVector(0.f,0.f);
	m_thrust = 0;

	m_min_extent = gsCVector(0.f,0.f);
	m_max_extent = gsCVector(0.f,0.f);
	m_thrust_rate = 0.f;
}

//-------------------------------------------------------------

CEngine::~CEngine()
{
//	CActor::~CActor();
}

//-------------------------------------------------------------

bool CEngine::activate()
{
	if (!isActive()) {
		m_timer.start();
		m_thrust_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

void CEngine::applyThrust(int thrust)
{
	if (m_thrust_timer.getTime() > m_thrust_rate) {
		m_thrust_timer.start();

		if (thrust) {
			m_thrust++;
			if (m_thrust > ENGINE_MAX_THRUST)
				m_thrust = ENGINE_MAX_THRUST;
			}
		else {
			m_thrust--;
			if (m_thrust < 0)
				m_thrust = 0;
			}
		}
}

//-------------------------------------------------------------

void CEngine::setOffset(const gsCVector& offset)
{
	m_offset = offset;
}

//-------------------------------------------------------------

bool CEngine::update(Controls *controls)
{
	float p = (float) m_thrust / ENGINE_MAX_THRUST;

	gsCVector extent = m_min_extent + (m_max_extent - m_min_extent) * p;

	m_position = getOwner()->getPosition() + m_offset + extent;

	return true;
}

//-------------------------------------------------------------

void CEngine::setParams(const gsCVector& min_extent,const gsCVector& max_extent,float thrust_rate)
{
	m_min_extent = min_extent;
	m_max_extent = max_extent;
	m_thrust_rate = thrust_rate;
}

//-------------------------------------------------------------
