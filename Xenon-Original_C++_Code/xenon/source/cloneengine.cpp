//-------------------------------------------------------------
//
// Class:	CCloneEngine
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

CCloneEngine::CCloneEngine()
{
}

//-------------------------------------------------------------

CCloneEngine::~CCloneEngine()
{
}

//-------------------------------------------------------------

bool CCloneEngine::draw()
{
	if (getOwner() &&
		getOwner()->getOwner() &&
		getOwner()->getOwner()->getActorInfo().m_type == ACTOR_TYPE_SHIP &&
		((CShip *) getOwner()->getOwner())->isCloaked())
		return true;	

	if (m_thrust > 0) {
		animate(ANIMATE_LOOP);
		CActor::draw();
		}

	return true;
}

//-------------------------------------------------------------
