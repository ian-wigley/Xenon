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

#ifndef _INCLUDE_GS_SPRITE_H
#define _INCLUDE_GS_SPRITE_H

#include "gs_object.h"
#include "gs_point.h"
#include "gs_image.h"

//-------------------------------------------------------------

class gsCSprite : public gsCObject
{
	private:
		gsCTiledImage *m_image;
		gsCPoint m_position;
		gsCPoint m_hotspot;
		bool m_active;
		int m_frame;

		gsCColour m_fill_colour;
		bool m_use_fill_colour;

		gsCRect m_rect;
		bool m_rect_valid;

	public:
		gsCSprite();
		virtual ~gsCSprite();

		void setPosition(const gsCPoint& position);
		void setHotspot(const gsCPoint& hotspot);
		void setImage(gsCTiledImage *image);
		void setActive(bool state = true);
		void setFrame(int frame);

		gsCPoint getPosition();
		gsCPoint getHotspot();
		gsCTiledImage *getImage();
		bool isActive();
		int getFrame();

		void enableFillColour(const gsCColour& fill_colour);
		void disableFillColour();

		const gsCRect& getRect();

		void move(const gsCPoint& offset);
		bool draw();
};

//-------------------------------------------------------------

inline void gsCSprite::setActive(bool state)
{
	m_active = state;
}

//-------------------------------------------------------------

inline bool gsCSprite::isActive()
{
	return m_active;
}

//-------------------------------------------------------------

inline void gsCSprite::setPosition(const gsCPoint& position)
{
	m_position = position;
	m_rect_valid = false;
}

//-------------------------------------------------------------

inline void gsCSprite::setHotspot(const gsCPoint& hotspot)
{
	m_hotspot = hotspot;
	m_rect_valid = false;
}

//-------------------------------------------------------------

inline void gsCSprite::setImage(gsCTiledImage *image)
{
	m_image = image;
	m_rect_valid = false;
}

//-------------------------------------------------------------

inline gsCPoint gsCSprite::getPosition()
{
	return m_position;
}

//-------------------------------------------------------------

inline gsCPoint gsCSprite::getHotspot()
{
	return m_hotspot;
}

//-------------------------------------------------------------

inline gsCTiledImage *gsCSprite::getImage()
{
	return m_image;
}

//-------------------------------------------------------------

inline void gsCSprite::move(const gsCPoint& offset)
{
	m_position += offset;
	m_rect_valid = false;
}

//-------------------------------------------------------------

inline bool gsCSprite::draw()
{
	if (!m_image || !m_active)
		return false;
	if (!m_use_fill_colour)
		return m_image->draw(m_frame,m_position - m_hotspot);
	else
		return m_image->drawSolid(m_frame,m_position - m_hotspot,m_fill_colour);
}

//-------------------------------------------------------------

inline void gsCSprite::setFrame(int frame)
{
	m_frame = frame;
}

//-------------------------------------------------------------

inline int gsCSprite::getFrame()
{
	return m_frame;
}

//-------------------------------------------------------------

inline void gsCSprite::enableFillColour(const gsCColour& fill_colour)
{
	m_fill_colour = fill_colour;
	m_use_fill_colour = true;
}

//-------------------------------------------------------------

inline void gsCSprite::disableFillColour()
{
	m_use_fill_colour = false;
}

//-------------------------------------------------------------

#endif
