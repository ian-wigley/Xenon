//-------------------------------------------------------------
//
// Class:	gsCColour
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

PALETTEENTRY *gsCColour::m_palette = 0;

int gsCColour::m_rshift = 0;
int gsCColour::m_gshift = 0;
int gsCColour::m_bshift = 0;
int gsCColour::m_rbits = 0;
int gsCColour::m_gbits = 0;
int gsCColour::m_bbits = 0;
int gsCColour::m_rmask = 0;
int gsCColour::m_bmask = 0;
int gsCColour::m_gmask = 0;

//-------------------------------------------------------------

gsCColour::gsCColour()
{
	m_r = m_g = m_b = 255;
	updateRawColour();
}

//-------------------------------------------------------------

gsCColour::gsCColour(int r,int g,int b)
{
	m_r = (gsUBYTE) r;
	m_g = (gsUBYTE) g;
	m_b = (gsUBYTE) b;
	updateRawColour();
}

//-------------------------------------------------------------

gsCColour::gsCColour(const gsCColour& colour)
{
	m_r = colour.m_r;
	m_g = colour.m_g;
	m_b = colour.m_b;
	m_raw = colour.m_raw;
}

//-------------------------------------------------------------

gsCColour::~gsCColour()
{
}

//-------------------------------------------------------------

void gsCColour::setupColourConversion(gsCScreen *screen)
{
	if (screen->m_bpp == 1)
		m_palette = screen->m_palette_colours;
	else {
		m_palette = 0;

		DDPIXELFORMAT   pf;

		memset(&pf,0,sizeof(pf));
		pf.dwSize = sizeof(pf);

		screen->getBackSurface()->GetPixelFormat(&pf);

		gsUDWORD i,j;

		j = pf.dwRBitMask;
		m_rshift = 0;
		i = 1;
		while (!(i&j)) {
			m_rshift++;
			i<<=1;
			}
		
		m_rbits = 8;
		while (i&j) {
			m_rbits--;
			i<<=1;
			}

		j = pf.dwGBitMask;
		m_gshift = 0;
		i = 1;
		while (!(i&j)) {
			m_gshift++;
			i<<=1;
			}

		m_gbits = 8;
		while (i&j) {
			m_gbits--;
			i<<=1;
			}

		j = pf.dwBBitMask;
		m_bshift = 0;
		i = 1;
		while (!(i&j)) {
			m_bshift++;
			i<<=1;
			}

		m_bbits = 8;
		while (i&j) {
			m_bbits--;
			i<<=1;
			}

		m_rmask = pf.dwRBitMask;
		m_gmask = pf.dwGBitMask;
		m_bmask = pf.dwBBitMask;
		}
}

//-------------------------------------------------------------

void gsCColour::updateRawColour()
{
	if (!m_palette) {
		m_raw = (((((gsUDWORD) m_r) >> m_rbits) << (m_rshift)) & m_rmask) |
				(((((gsUDWORD) m_g) >> m_gbits) << (m_gshift)) & m_gmask) |
				(((((gsUDWORD) m_b) >> m_bbits) << (m_bshift)) & m_bmask);
		}
	else {
		int nearest_i = 0;
		int nearest_d = 0;

		PALETTEENTRY *p = m_palette;

		for (int i = 0; i < 256; i++) {
			int dr = m_r - p->peRed;
			int dg = m_g - p->peGreen;
			int db = m_b - p->peBlue;
			int d = dr * dr + dg * dg + db * db;
			if (d == 0) {
				m_raw = i;
				return;
				}
			if (nearest_i == 0 ||
				d < nearest_d) {
				nearest_i = i;
				nearest_d = d;
				}
			p++;
			}

		m_raw = nearest_i;
		}
}

//-------------------------------------------------------------
