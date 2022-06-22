//-------------------------------------------------------------
//
// Class:	gsCMap
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

gsCMap::gsCMap()
{
	m_image = 0;
	m_size = gsCPoint(0,0);
	m_map_tiles = 0;
	m_position = gsCPoint(0,0);
	m_tile_size = gsCPoint(0,0);
	m_total_size = gsCPoint(0,0);
}

//-------------------------------------------------------------

gsCMap::~gsCMap()
{
	destroy();
}

//-------------------------------------------------------------

void gsCMap::destroy()
{
	destroyMapTiles();
}

//-------------------------------------------------------------

void gsCMap::createMapTiles()
{
	if (m_size.getX() == 0 ||
		m_size.getY() == 0)
		return;

	m_map_tiles = new gsCMapTile[m_size.getX() * m_size.getY()];

	clear(0,true);
}

//-------------------------------------------------------------

void gsCMap::destroyMapTiles()
{
	if (m_map_tiles) {
		delete [] m_map_tiles;
		m_map_tiles = 0;
		}
}

//-------------------------------------------------------------

void gsCMap::clear(int tile,bool empty)
{
	for (int y = 0; y < m_size.getY(); y++) {
		for (int x = 0; x < m_size.getX(); x++) {
			setMapTile(gsCPoint(x,y),gsCMapTile(tile,empty));
			}
		}
}

//-------------------------------------------------------------

void gsCMap::calculateTotalSize()
{
	if (!m_image || !m_map_tiles) {
		m_tile_size = gsCPoint(0,0);
		m_total_size = gsCPoint(0,0);
		}
	else {
		m_tile_size = m_image->getTileSize();
		m_total_size = m_tile_size * m_size;
		}
}

//-------------------------------------------------------------

void gsCMap::setImage(gsCTiledImage *image)
{
	m_image = image;

	calculateTotalSize();
}

//-------------------------------------------------------------

void gsCMap::setSize(const gsCPoint& size)
{
	destroyMapTiles();

	m_size = size;

	createMapTiles();

	calculateTotalSize();
}

//-------------------------------------------------------------

bool gsCMap::setMapTile(const gsCPoint& coords,const gsCMapTile& map_tile)
{
	gsCMapTile *p = getMapTile(coords);

	if (p == 0)
		return false;

	*p = map_tile;

	return true;
}

//-------------------------------------------------------------

void gsCMap::setPosition(const gsCPoint& position)
{
	m_position = position;
}

//-------------------------------------------------------------

gsCTiledImage *gsCMap::getImage()
{
	return m_image;
}

//-------------------------------------------------------------

gsCPoint gsCMap::getSize()
{
	return m_size;
}

//-------------------------------------------------------------

gsCPoint gsCMap::getSizeInPixels()
{
	return m_total_size;
}

//-------------------------------------------------------------

gsCMapTile *gsCMap::getMapTile(const gsCPoint& coords)
{
	if (coords.getX() < 0 ||
		coords.getY() < 0 ||
		coords.getX() >= m_size.getX() ||
		coords.getY() >= m_size.getY())
		return 0;
	else
		return &m_map_tiles[m_size.getX() * coords.getY() + coords.getX()];
}

//-------------------------------------------------------------

gsCPoint gsCMap::getPosition()
{
	return m_position;
}

//-------------------------------------------------------------

void gsCMap::move(const gsCPoint& offset)
{
	m_position += offset;
}

//-------------------------------------------------------------

void gsCMap::draw()
{
	if (!m_image || !m_map_tiles)
		return;

	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen)
		return;

	// clip map against screen

	gsCRect screen_rect = screen->getRect();

	// get map source and dest rects in pixel coords

	gsCRect source_rect(gsCPoint(0,0),m_size * m_tile_size);

	gsCRect dest_rect = source_rect;
	dest_rect.move(m_position);

	screen_rect.clip(source_rect,dest_rect);

	if (!dest_rect.isEmpty()) {

		// convert back to tile coords

		int left = source_rect.getLeft() / m_tile_size.getX();
		int top = source_rect.getTop() / m_tile_size.getY();
		int right = (source_rect.getRight() - 1) / m_tile_size.getX();
		int bottom = (source_rect.getBottom() - 1) / m_tile_size.getY();

		int x,y;
		gsCMapTile *map_tile;
		gsCPoint pos;
		gsCPoint step;

		// top edge clipped

		map_tile = getMapTile(gsCPoint(left,top));
		pos = m_position + gsCPoint(left,top) * m_tile_size;
		step = gsCPoint(1,0) * m_tile_size;
		for (x = left; x <= right; x++) {
			if (map_tile->isDrawable())
				m_image->draw(map_tile->getTile(),pos);
			map_tile++;
			pos += step;
			}

		// bottom edge clipped

		map_tile = getMapTile(gsCPoint(left,bottom));
		pos = m_position + gsCPoint(left,bottom) * m_tile_size;
		step = gsCPoint(1,0) * m_tile_size;
		for (x = left; x <= right; x++) {
			if (map_tile->isDrawable())
				m_image->draw(map_tile->getTile(),pos);
			map_tile++;
			pos += step;
			}

		// left edge clipped

		map_tile = getMapTile(gsCPoint(left,top + 1));
		pos = m_position + gsCPoint(left,top + 1) * m_tile_size;
		step = gsCPoint(0,1) * m_tile_size;
		for (y = top + 1; y < bottom; y++) {
			if (map_tile->isDrawable())
				m_image->draw(map_tile->getTile(),pos);
			map_tile += m_size.getX();
			pos += step;
			}

		// right edge clipped

		map_tile = getMapTile(gsCPoint(right,top + 1));
		pos = m_position + gsCPoint(right,top + 1) * m_tile_size;
		step = gsCPoint(0,1) * m_tile_size;
		for (y = top + 1; y < bottom; y++) {
			if (map_tile->isDrawable())
				m_image->draw(map_tile->getTile(),pos);
			map_tile += m_size.getX();
			pos += step;
			}

		// middle not clipped
		
		for (y = top + 1; y < bottom; y++) {
			map_tile = getMapTile(gsCPoint(left + 1,y));
			pos = m_position + gsCPoint(left + 1,y) * m_tile_size;
			step = gsCPoint(1,0) * m_tile_size;
			for (x = left + 1; x < right; x++) {
				if (map_tile->isDrawable())		
					m_image->drawFast(map_tile->getTile(),pos);
				map_tile++;
				pos += step;
				}
			}

		}
}

//-------------------------------------------------------------

bool gsCMap::load(const char *filename,const gsCPoint& size)
{
	setSize(size);
	
	gsCFile file;

	if (!file.open(filename))
		return false;
	
	for (int y = 0; y < m_size.getY(); y++) {
		for (int x = 0; x < m_size.getX(); x++) {
			gsUWORD tile;
			if (file.read(&tile,2) != 2)
				break;
			if (tile == 0)
				setMapTile(gsCPoint(x,y),gsCMapTile(0,true));
			else
				setMapTile(gsCPoint(x,y),gsCMapTile(tile / 32)); // - 1));
			}
		}

	file.close();

	return true;
}

//-------------------------------------------------------------
// Find tiles which overlap rect

int gsCMap::hitBy(const gsCRect& rect,gsUBYTE collision_mask)
{
	gsCRect dest = rect;

	gsCRect source(gsCPoint(0,0),m_total_size);

	source.clip(dest);
	
	if (dest.isEmpty())
		return 0;

	m_hit_list.clear();

	int x1 = dest.getLeft() / m_tile_size.getX();
	int y1 = dest.getTop() / m_tile_size.getY();
	int x2 = (dest.getRight() - 1) / m_tile_size.getX();
	int y2 = (dest.getBottom() - 1) / m_tile_size.getY();

	for (int x = x1; x <= x2; x++) {
		for (int y = y1; y <= y2; y++) {
			gsCPoint pos(x,y);
			gsCMapTile *mt = getMapTile(pos);
			if (!mt->isEmpty() &&
				!mt->isHidden() &&
				(mt->getCollisionFlags() & collision_mask) != 0)
				m_hit_list.addItem(pos);
			}
		}

	return m_hit_list.getSize();
}

//-------------------------------------------------------------

gsCPoint gsCMap::getHitPosition(int n)
{
	return m_hit_list[n];
}

//-------------------------------------------------------------
