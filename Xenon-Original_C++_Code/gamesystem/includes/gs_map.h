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

#ifndef _INCLUDE_GS_MAP_H
#define _INCLUDE_GS_MAP_H

#include "gs_object.h"
#include "gs_point.h"
#include "gs_maptile.h"
#include "gs_tiledimage.h"

//-------------------------------------------------------------

class gsCMap : public gsCObject
{
	private:

		gsCTiledImage *m_image;
		gsCPoint m_size;
		gsCMapTile *m_map_tiles;
		gsCPoint m_position;

		gsCPoint m_tile_size;
		gsCPoint m_total_size;

		void createMapTiles();
		void destroyMapTiles();
		void calculateTotalSize();

		gsCList<gsCPoint> m_hit_list;

	public:

		gsCMap();
		~gsCMap();

		void destroy();

		bool load(const char *filename,const gsCPoint& size);

		void setImage(gsCTiledImage *image);
		void setSize(const gsCPoint& size);

		bool setMapTile(const gsCPoint& coords,const gsCMapTile& map_tile);
		void setPosition(const gsCPoint& position);

		gsCTiledImage *getImage();
		gsCPoint getSize();
		gsCPoint getSizeInPixels();

		gsCMapTile *getMapTile(const gsCPoint& coords);
		gsCPoint getPosition();

		void clear(int tile,bool empty);

		void move(const gsCPoint& offset);

		void draw();

		int hitBy(const gsCRect& rect,gsUBYTE collision_mask);
		gsCPoint getHitPosition(int n);
};

//-------------------------------------------------------------

#endif
