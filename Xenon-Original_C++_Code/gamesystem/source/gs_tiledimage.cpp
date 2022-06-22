//-------------------------------------------------------------
//
// Class:	gsCTiledImage
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCImage
//
// Derived:	None
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------

gsCTiledImage::gsCTiledImage()
{
	m_num_tiles = 0;
	m_tile_size = gsCPoint(0,0);
	m_source_rects = 0;
}

//-------------------------------------------------------------

gsCTiledImage::~gsCTiledImage()
{
	destroy();
}

//-------------------------------------------------------------

void gsCTiledImage::destroy()
{
	if (m_source_rects) {
		delete [] m_source_rects;
		m_source_rects = 0;
		}

	m_num_tiles = 0;

	gsCImage::destroy();
}

//-------------------------------------------------------------

bool gsCTiledImage::load(const char *filename,bool rescale)
{
	if (!gsCImage::load(filename,rescale))
		return false;

	return setTileSize(getSize());
}

//-------------------------------------------------------------

bool gsCTiledImage::calculateSourceRects()
{
	if (m_source_rects) {
		delete [] m_source_rects;
		m_source_rects = 0;
		}

	m_num_tiles = 0;

	if (m_tile_size.getX() == 0 ||
		m_tile_size.getY() == 0)
		return false;

	if (getSize().getX() == 0 ||
		getSize().getY() == 0)
		return false;

	int horiz = getSize().getX() / m_tile_size.getX();
	int vert = getSize().getY() / m_tile_size.getY();

	m_num_tiles = horiz * vert;

	m_source_rects = new gsCRect[m_num_tiles];

	int i = 0;

	for (int y = 0; y + m_tile_size.getY() <= getSize().getY(); y += m_tile_size.getY()) {
		for (int x = 0; x + m_tile_size.getX() <= getSize().getX(); x += m_tile_size.getX()) {
			m_source_rects[i].setTopLeft(gsCPoint(x,y));
			m_source_rects[i].setBottomRight(gsCPoint(x,y) + m_tile_size);
			i++;
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCTiledImage::setTileSize(const gsCPoint& tile_size)
{
	m_tile_size = tile_size;

	return calculateSourceRects();
}

//-------------------------------------------------------------

gsCPoint gsCTiledImage::getTileSize()
{
	return m_tile_size;
}

//-------------------------------------------------------------

bool gsCTiledImage::draw(int tile,const gsCPoint& position)
{
	if (tile >= m_num_tiles)
		return false;

	if (!m_direct_draw) {
		gsREPORT("gsCTiledImage::draw called with no direct draw device");
		return false;
		}
		
	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen) {
		gsREPORT("gsCTiledImage::draw called with no active screen");
		return false;
		}

	gsCRect dest(position,position + m_tile_size);

	if (screen->getRect().contains(dest)) {
		
		HRESULT hr;

		hr = screen->getBackSurface()->Blt(LPRECT(dest),
										   m_surface,
										   m_source_rects[tile],
										   DDBLT_WAIT | m_colour_key,
										   NULL);

		if (hr != DD_OK) {
			gsREPORT("gsCTiledImage::draw blit failed");
			return false;
			}
		}
	else {
		if (!screen->getRect().overlaps(dest))
			return false;

		gsCRect source = m_source_rects[tile];

		screen->getRect().clip(source,dest);
		
		HRESULT hr;

		hr = screen->getBackSurface()->Blt(LPRECT(dest),
										   m_surface,
										   LPRECT(source),
										   DDBLT_WAIT | m_colour_key,
										   NULL);

		if (hr != DD_OK) {
			gsREPORT("gsCTiledImage::draw blit failed");
			return false;
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCTiledImage::drawSolid(int tile,const gsCPoint& position,const gsCColour& fill_colour)
{
	if (tile >= m_num_tiles)
		return false;

	if (!m_direct_draw) {
		gsREPORT("gsCTiledImage::draw called with no direct draw device");
		return false;
		}
		
	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen) {
		gsREPORT("gsCTiledImage::draw called with no active screen");
		return false;
		}

	gsCRect dest(position,position + m_tile_size);

	if (screen->getRect().contains(dest)) {
	
		bool ok = false;

		if (lock()) {
			ok = screen->bltSolid(dest,m_ddsd,m_source_rects[tile],fill_colour);
			unlock();
			}
		if (!ok) {
			gsREPORT("gsCTiledImage::drawSolid blit failed");
			return false;
			}
		}
	else {
		if (!screen->getRect().overlaps(dest))
			return false;

		gsCRect source = m_source_rects[tile];

		screen->getRect().clip(source,dest);

		bool ok = false;

		if (lock()) {
			ok = screen->bltSolid(dest,m_ddsd,source,fill_colour);
			unlock();
			}
		if (!ok) {
			gsREPORT("gsCTiledImage::drawSolid blit failed");
			return false;
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCTiledImage::drawTinted(int tile,const gsCPoint& position,const gsCColour& tint_colour)
{
	if (tile >= m_num_tiles)
		return false;

	if (!m_direct_draw) {
		gsREPORT("gsCTiledImage::draw called with no direct draw device");
		return false;
		}
		
	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen) {
		gsREPORT("gsCTiledImage::draw called with no active screen");
		return false;
		}

	gsCRect dest(position,position + m_tile_size);

	if (screen->getRect().contains(dest)) {

		bool ok = false;

		if (lock()) {
			ok = screen->bltTinted(dest,m_ddsd,m_source_rects[tile],tint_colour);
			unlock();
			}
		if (!ok) {
			gsREPORT("gsCTiledImage::drawTinted blit failed");
			return false;
			}
		}
	else {
		if (!screen->getRect().overlaps(dest))
			return false;

		gsCRect source = m_source_rects[tile];

		screen->getRect().clip(source,dest);

		bool ok = false;

		if (lock()) {
			ok = screen->bltTinted(dest,m_ddsd,source,tint_colour);
			unlock();
			}
		if (!ok) {
			gsREPORT("gsCTiledImage::drawTinted blit failed");
			return false;
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCTiledImage::drawFast(int tile,const gsCPoint& position)
{
	gsCScreen *screen = gsCApplication::getScreen();

	HRESULT hr;

	gsCRect dest(position,position + m_tile_size);

	hr = screen->getBackSurface()->Blt(LPRECT(dest),
									   m_surface,
									   m_source_rects[tile],
									   DDBLT_WAIT | m_colour_key,
									   NULL);

	if (hr != DD_OK) {
		gsREPORT("gsCTiledImage::drawFast blit failed");
		return false;
		}

	return true;
}

//-------------------------------------------------------------

