//-------------------------------------------------------------
//
// Class:	CRusherGenerator
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CRusherGenerator::CRusherGenerator()
{
	m_rushers_created = 0;
}

//-------------------------------------------------------------

CRusherGenerator::~CRusherGenerator()
{
}

//-------------------------------------------------------------

bool CRusherGenerator::activate()
{
	if (!isActive()) {
		m_timer.start();
		m_delay_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

bool CRusherGenerator::update(Controls *controls)
{
	if (m_delay_timer.getTime() < RUSHER_DELAY)
		return true;

	m_delay_timer.start();
	
	CRusher *r = new CRusher;
	m_scene->addActor(r);
	r->setPosition(getPosition());
	r->setVelocity(getVelocity());
	r->activate();

	m_rushers_created++;
	if (m_rushers_created >= RUSHER_TOTAL)
		kill();

	return true;
}

//-------------------------------------------------------------
