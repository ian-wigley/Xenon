//-------------------------------------------------------------
//
// Class:	gsCSprite
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCObject
//
// Derived:	None
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------

gsCSprite::gsCSprite()
{
	m_image = 0;
	m_position = gsCPoint(0,0);
	m_hotspot = gsCPoint(0,0);
	m_frame = 0;
	m_active = false;
	m_use_fill_colour = false;
	m_rect_valid = false;
}

//-------------------------------------------------------------

gsCSprite::~gsCSprite()
{
}

//-------------------------------------------------------------

const gsCRect& gsCSprite::getRect()
{
	if (!m_rect_valid) {
		if (!m_image)
			m_rect = gsCRect(0,0,0,0);
		else {
			gsCPoint p = m_position - m_hotspot;
			m_rect = gsCRect(p,p + m_image->getTileSize());
			}
		m_rect_valid = true;
		}

	return m_rect;
}	

//-------------------------------------------------------------
