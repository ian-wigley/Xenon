//-------------------------------------------------------------
//
// Class:	CRetroEngine
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CEngine
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CRetroEngine::CRetroEngine()
{
	m_direction = RETRO_NW;
}

//-------------------------------------------------------------

CRetroEngine::~CRetroEngine()
{
}

//-------------------------------------------------------------

bool CRetroEngine::draw()
{
	if (getOwner() &&
		getOwner()->getActorInfo().m_type == ACTOR_TYPE_SHIP &&
		((CShip *) getOwner())->isCloaked())
		return true;

	if (m_thrust > 0) {
		switch (m_direction) {
			case RETRO_NW:	animate(ANIMATE_LOOP,0,2);	break;
			case RETRO_NE:	animate(ANIMATE_LOOP,2,2);	break;
			case RETRO_SW:	animate(ANIMATE_LOOP,4,2);	break;
			case RETRO_SE:	animate(ANIMATE_LOOP,6,2);	break;
			}
		CActor::draw();
		}

	return true;
}

//-------------------------------------------------------------

void CRetroEngine::setDirection(RetroDirection direction)
{
	m_direction = direction;
}

//-------------------------------------------------------------
