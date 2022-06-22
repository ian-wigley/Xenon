//-------------------------------------------------------------
//
// Class:	CExplosion
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CAlien
//
// Derived:	CSmallExplosion
//			CMediumExplosion
//			CBigExplosion
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CExplosion::CExplosion()
{
}

//-------------------------------------------------------------

CExplosion::~CExplosion()
{
//	CActor::~CActor();
}

//-------------------------------------------------------------

bool CExplosion::activate()
{
	if (!isActive()) {
		m_timer.start();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

bool CExplosion::update(Controls *controls)
{
	m_position += m_velocity;

	if (animate(ANIMATE_ONESHOT))
		kill();
	
	return true;
}

//-------------------------------------------------------------

void CExplosion::onLeavingScreen()
{
	kill();
}

//-------------------------------------------------------------

bool CSmallExplosion::activate()
{
	CGameState::playSample(SAMPLE_SMALL_EXPLOSION,getPosition().getX());

	return CExplosion::activate();
}

//-------------------------------------------------------------

bool CMediumExplosion::activate()
{
	CGameState::playSample(SAMPLE_MEDIUM_EXPLOSION,getPosition().getX());

	return CExplosion::activate();
}

//-------------------------------------------------------------

bool CBigExplosion::activate()
{
	CGameState::playSample(SAMPLE_BIG_EXPLOSION,getPosition().getX());

	return CExplosion::activate();
}

//-------------------------------------------------------------
