//-------------------------------------------------------------
//
// Class:	CSpinner
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CBullet
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CSpinner::CSpinner()
{
}

//-------------------------------------------------------------

CSpinner::~CSpinner()
{
}

//-------------------------------------------------------------

bool CSpinner::activate()
{
	if (!isActive())
		m_timer.start();

	return CActor::activate();
}

//-------------------------------------------------------------

bool CSpinner::update(Controls *controls)
{
	if (m_shield == 0) {
		kill();
		return true;
		}

	m_position += m_velocity;

	animate(ANIMATE_LOOP,m_grade * SPINNER_FRAMES,SPINNER_FRAMES);

	return true;
}

//-------------------------------------------------------------
