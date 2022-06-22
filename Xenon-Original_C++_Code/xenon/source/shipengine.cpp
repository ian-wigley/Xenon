//-------------------------------------------------------------
//
// Class:	CShipEngine
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

CShipEngine::CShipEngine()
{
}

//-------------------------------------------------------------

CShipEngine::~CShipEngine()
{
}

//-------------------------------------------------------------

bool CShipEngine::draw()
{
	if (getOwner() &&
		getOwner()->getActorInfo().m_type == ACTOR_TYPE_SHIP &&
		((CShip *) getOwner())->isCloaked())
		return true;

	if (m_thrust > 0) {
		animate(ANIMATE_LOOP);
		CActor::draw();
		}

	return false;
}

//-------------------------------------------------------------
