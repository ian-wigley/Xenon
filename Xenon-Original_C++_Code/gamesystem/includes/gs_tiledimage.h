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
// Derived:	gsCFont
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_TILEDIMAGE_H
#define _INCLUDE_GS_TILEDIMAGE_H

#include "gs_types.h"
#include "gs_image.h"

//-------------------------------------------------------------

typedef enum {
	gsTILE_EMPTY,
	gsTILE_PARTIAL,
	gsTILE_SOLID,
} gsTileInfo;

//-------------------------------------------------------------

class gsCTiledImage : public gsCImage
{
	private:
		bool calculateSourceRects();
	
	protected:
		int m_num_tiles;
		gsCPoint m_tile_size;
		gsCRect *m_source_rects;

	public:
		gsCTiledImage();
		virtual ~gsCTiledImage();

		void destroy();

		bool load(const char *filename,bool rescale = false);

		bool setTileSize(const gsCPoint& tile_size);
		gsCPoint getTileSize();

		gsTileInfo getTileInfo(int tile);

		int getNumTiles();

		bool draw(int tile,const gsCPoint& position);
		bool drawSolid(int tile,const gsCPoint& position,const gsCColour& fill_colour);
		bool drawTinted(int tile,const gsCPoint& position,const gsCColour& tint_colour);
		bool drawFast(int tile,const gsCPoint& position);
};

//-------------------------------------------------------------

inline int gsCTiledImage::getNumTiles()
{
	return m_num_tiles;
}

//-------------------------------------------------------------

#endif
