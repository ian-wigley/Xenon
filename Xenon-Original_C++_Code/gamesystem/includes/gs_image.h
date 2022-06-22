//-------------------------------------------------------------
//
// Class:	gsCImage
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCVisual
//
// Derived:	gsCTiledImage
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_IMAGE_H
#define _INCLUDE_GS_IMAGE_H

#include "gs_visual.h"
#include "gs_point.h"
#include "gs_rect.h"

class gsCColour;

//-------------------------------------------------------------

class gsCImage : public gsCVisual
{
	private:
		gsCRect m_rect;

		bool create(const gsCPoint& size);

		bool m_isLocked;

	protected:

		gsLPDIRECTDRAWSURFACE m_surface;
		DWORD m_colour_key;

		gsDDSURFACEDESC m_ddsd;

		bool lock();
		void unlock();

	public:

		gsCImage();
		virtual ~gsCImage();

		bool load(const char *filename,bool rescale = false);

		bool setSize(const gsCPoint& size);
		bool enableColourKey(const gsCColour& colour);
		bool disableColourKey();

		gsCPoint getSize() const;

		void destroy();
		
		void fill(const gsCColour& colour);
		bool setPoint(const gsCPoint& point,const gsCColour& colour);
		bool setRect(const gsCRect& rect,const gsCColour& colour);

		bool draw(const gsCPoint& position);
		bool drawSolid(const gsCPoint& position,const gsCColour& fill_colour);
		bool drawFast(const gsCPoint& position);
};

//-------------------------------------------------------------

inline gsCPoint gsCImage::getSize() const
{
	return m_rect.getSize();
}

//-------------------------------------------------------------

#endif

