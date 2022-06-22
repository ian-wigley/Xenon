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

#include "demo4.h"

//-------------------------------------------------------------

CRusher::CRusher()
{
}

//-------------------------------------------------------------

CRusher::~CRusher()
{
}

//-------------------------------------------------------------

void CRusher::kill()
{
	CActor::kill();
}

//-------------------------------------------------------------

bool CRusher::activate()
{
	if (!isActive()) {
		m_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

bool CRusher::update(Controls *controls)
{
	if (m_shield == 0) {
		explode();
		kill();
		return true;
		}

	m_position += m_velocity;

	animate(ANIMATE_LOOP);

	return true;
}

//-------------------------------------------------------------
