//-------------------------------------------------------------
//
// Class:	CHomerProjectile
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

CHomerProjectile::CHomerProjectile()
{
}

//-------------------------------------------------------------

CHomerProjectile::~CHomerProjectile()
{
}

//-------------------------------------------------------------

bool CHomerProjectile::update(Controls *controls)
{
	if (m_shield == 0) {
		explode();
		kill();
		return true;
		}

	m_position += m_velocity;

	int num_frames = m_image->getNumTiles();

	m_sprite.setFrame((getDirection(num_frames) + 3) & (num_frames - 1));

	return true;
}

//-------------------------------------------------------------
