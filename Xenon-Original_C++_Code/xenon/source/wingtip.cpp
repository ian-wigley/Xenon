//-------------------------------------------------------------
//
// Class:	CWingtip
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CUpgrade
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CWingtip::CWingtip()
{
}

//-------------------------------------------------------------

CWingtip::~CWingtip()
{
//	CActor::~CActor();
}

//-------------------------------------------------------------

bool CWingtip::activate()
{
	if (!isActive()) {
		m_timer.start();
		}

	return CUpgrade::activate();
}

//-------------------------------------------------------------

bool CWingtip::update(Controls *controls)
{
	CShip *ship = (CShip *) getOwner();

	if (!ship) {
		kill();
		return true;
		}

	if (getShield() == 0) {
		ship->detachWingtip(this);
		setOwner(0);
		explode();
		kill();
		return true;
		}

	int d = ship->getDiveLevel();

	if (d == 0) {
		m_position = ship->getPosition() + m_offset;
		if (ship->isCloaked()) {
			if (!ship->isCloakFlashing())
				m_sprite.setFrame(WINGTIP_CLOAK_FRAME);
			else
				m_sprite.setFrame(0);
			}
		else
			animate(ANIMATE_LOOP,0,WINGTIP_FRAMES);
		}
	else {
		m_position = ship->getPosition() + m_offset * ship->getDiveScale();
		m_sprite.setFrame(WINGTIP_DIVE_OFFSET + WINGTIP_DIVE_FRAMES * d / SHIP_DIVE_FRAMES);
		}

	return true;
}

//-------------------------------------------------------------

