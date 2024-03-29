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

#include "demo2.h"

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
	if (m_thrust > 0) {
		animate(ANIMATE_LOOP);
		CActor::draw();
		}

	return false;
}

//-------------------------------------------------------------
