//-------------------------------------------------------------
//
// Class:	CMissile
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

CMissile::CMissile()
{
}

//-------------------------------------------------------------

CMissile::~CMissile()
{
//	CBullet::~CBullet();
}

//-------------------------------------------------------------

bool CMissile::update(Controls *controls)
{
	m_position += m_velocity;

	m_sprite.setFrame(MISSILE_FRAMES * m_grade);

	return true;
}

//-------------------------------------------------------------
