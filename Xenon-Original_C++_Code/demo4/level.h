//-------------------------------------------------------------
//
// Class:	CLevel
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	None
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_LEVEL_H
#define _INCLUDE_LEVEL_H

#include "gamesystem.h"
#include "scene.h"

//-------------------------------------------------------------

struct MPHD
{							/* Map header structure */
	char mapverhigh;		/* map version number to left of . (ie X.0). */
	char mapverlow;			/* map version number to right of . (ie 0.X). */
	char lsb;				/* if 1, data stored LSB first, otherwise MSB first. */
	char reserved;
	short int mapwidth;		/* width in blocks. */
	short int mapheight;	/* height in blocks. */
	short int reserved1;
	short int reserved2;
	short int blockwidth;	/* width of a block (tile) in pixels. */
	short int blockheight;	/* height of a block (tile) in pixels. */
	short int blockdepth;	/* depth of a block (tile) in planes (ie. 256 colours is 8) */
	short int blockstrsize;	/* size of a block data structure */
	short int numblockstr;	/* Number of block structures in BKDT */
	short int numblockgfx;	/* Number of 'blocks' in graphics (BGFX) */
};

//-------------------------------------------------------------

struct BLKSTR
{									/* Structure for data blocks */
unsigned long bgoff, fgoff;			/* offsets from start of graphic blocks */
unsigned long fgoff2, fgoff3; 		/* more overlay blocks */
unsigned long int user1, user2;		/* user long data */
unsigned short int user3, user4;	/* user short data */
unsigned char user5, user6, user7;	/* user byte data */
unsigned char tl : 1;				/* bits for collision detection */
unsigned char tr : 1;
unsigned char bl : 1;
unsigned char br : 1;
unsigned char trigger : 1;			/* bit to trigger an event */
unsigned char unused1 : 1;
unsigned char unused2 : 1;
unsigned char unused3 : 1;
};

//-------------------------------------------------------------

typedef enum {
	WALLHUGGER,				// 0
	ASTEROID,				// 1
	RUSHER,					// 2
	POD,					// 3
	HOMER,					// 4
	DRONE_GENERATOR,		// 5
	LONER,					// 6
	REVERSE_RUSHER,			// 7
	RUSHER_GENERATOR_RIGHT,	// 8
	RUSHER_GENERATOR_LEFT,	// 9
	ORGANIC_GUN,			// 10
} AlienType;

typedef enum {
	PICKUP_SHIELD,			// 0
	PICKUP_SPEEDUP,			// 1
	PICKUP_WEAPONUP,		// 2
	PICKUP_CLOAK,			// 3
	PICKUP_DIVE,			// 4
	PICKUP_SCOREBONUS,		// 5
	PICKUP_CLONE,			// 6
	PICKUP_WINGTIP,			// 7
	PICKUP_HOMINGMISSILE,	// 8
	PICKUP_LASER,			// 9
} PickupType;

typedef enum {
	ID_NORMAL_TILE,			// 0
	ID_PICKUP,				// 1
	ID_ALIEN,				// 2
	ID_DESTROYABLE_TILE,	// 3
	ID_CHECKPOINT,			// 4
	ID_WARP_START,			// 5
	ID_WARP_END,			// 6
	ID_BOSS_MOUTH,			// 7
	ID_BOSS_EYE,			// 8
	ID_BOSS_CONTROL			// 9
} TileId;

//-------------------------------------------------------------
// collision flags

const gsUBYTE COLLIDE_WITH_SHIP = 1;
const gsUBYTE COLLIDE_WITH_BULLETS = 2;

//-------------------------------------------------------------

class CLevel
{
	private:
		MPHD m_header;

		gsCFile m_file;

		bool readUWORD(gsUWORD& w);
		bool readUDWORD(gsUDWORD& d);
		bool error();

		BLKSTR *m_blocks;

		int m_scan_y;

		void destroy();

		bool m_boss_active;

	public:
		CLevel();
		~CLevel();

		gsCMap m_back_layer;
		gsCMap m_front_layer;

		gsCTiledImage m_image;

		bool load(const char *filename,const char *graphics_directory);

		void reset();
		void scanForNewActors(CScene *scene);

		bool isBossActive() { return m_boss_active; };
};

//-------------------------------------------------------------

#endif
