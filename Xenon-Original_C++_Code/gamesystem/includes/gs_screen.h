//-------------------------------------------------------------
//
// Class:	gsCScreen
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCVisual
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_SCREEN_H
#define _INCLUDE_GS_SCREEN_H

#include "gs_object.h"
#include "gs_colour.h"
#include "gs_visual.h"
#include "gs_image.h"
#include "gs_tiledimage.h"
#include "gs_timer.h"

//-------------------------------------------------------------

typedef enum {
	gsBLIT_NORMAL,			// normal blit
	gsBLIT_NORMAL_MASKED,	// don't draw pixels = colour_key
	gsBLIT_SHADOW,			// don't draw pixels = colour_key, draw all other pixels in tint_colour
	gsBLIT_REPLACE,			// replace pixels = source_colour with tint_colour
	gsBLIT_REPLACE_MASKED,	// don't draw pixels = colour_key, replace pixels = source_colour with tint_colour
} gsBlitMode;

//-------------------------------------------------------------

class gsCScreen : public gsCVisual
{
	friend class gsCColour;
	friend class gsCImage;
	friend class gsCTiledImage;

	private:
		static gsLPDIRECTDRAWSURFACE m_primary_surface;
		static gsLPDIRECTDRAWSURFACE m_back_surface;
		static gsLPDIRECTDRAWCLIPPER m_clipper;
		static gsLPDIRECTDRAWPALETTE m_palette;

		static DDBLTFX m_ddbltfx;

		static bool m_isWindowed;
	   	static gsCRect m_window_rect;
		static gsCRect m_viewport_rect;
		static gsCRect m_screen_rect;

		static bool m_display_mode_set;
		static int m_bpp;

		void findBPP();

		gsDDSURFACEDESC m_ddsd;
		bool m_isLocked;

		bool createDefaultPalette();

	protected:

		gsLPDIRECTDRAWSURFACE getBackSurface() const;
		gsLPDIRECTDRAWSURFACE getPrimarySurface() const;

		PALETTEENTRY m_palette_colours[256];

		bool lock();
		void unlock();

		void draw_pixel(const gsCPoint& position,const gsCColour& colour);
		void draw_pixels(int num_points,const gsCPoint *position,const gsCColour *colour,bool clip = true);

		void draw_hline(int x1,int x2,int y,const gsCColour& colour);
		void draw_vline(int x,int y1,int y2,const gsCColour& colour);

		bool bltSolid(const gsCRect& dest,gsDDSURFACEDESC& source_ddsd,const gsCRect& source,const gsCColour& fill_colour);
		bool bltTinted(const gsCRect& dest,gsDDSURFACEDESC& source_ddsd,const gsCRect& source,const gsCColour& tint_colour);

	public:
		gsCScreen();
		virtual ~gsCScreen();

		bool createFullScreen(HWND window,const gsCPoint& size,gsDWORD bitdepth);
		bool createWindowed(HWND window);
		bool destroy();

		bool flip();

		void updateRect(HWND window);

		gsCPoint getSize() const;
		gsCRect getRect() const;

		int getBytesPerPixel();
		
		void clear(const gsCColour& colour);

		void drawPoint(const gsCPoint& position,const gsCColour& colour);
		void drawLine(const gsCPoint& from,const gsCPoint& to,const gsCColour& colour);
		void drawRect(const gsCRect& rect,const gsCColour& colour);
		bool drawSolidRect(const gsCRect& rect,const gsCColour& colour);
		void drawPoints(int count,const gsCPoint *points,const gsCColour *colours,bool clip = true);
		void drawLines(int count,const gsCPoint *points,const gsCColour *colours);

		bool loadPalette(const char *filename);
};

//-------------------------------------------------------------

inline gsLPDIRECTDRAWSURFACE gsCScreen::getBackSurface() const
{
	return m_back_surface;
}

//-------------------------------------------------------------

inline gsLPDIRECTDRAWSURFACE gsCScreen::getPrimarySurface() const
{
	return m_primary_surface;
}

//-------------------------------------------------------------

inline gsCPoint gsCScreen::getSize() const
{
	return m_screen_rect.getSize();
}

//-------------------------------------------------------------

inline gsCRect gsCScreen::getRect() const
{
	return gsCRect(gsCPoint(0,0),getSize());
}

//-------------------------------------------------------------

#endif

