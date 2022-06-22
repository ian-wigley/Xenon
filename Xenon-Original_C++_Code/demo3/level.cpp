//-------------------------------------------------------------
//
// Class:	CLevel
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Remarks:	This is a cut-down version of the level loader
//			used in Xenon2000
//
//-------------------------------------------------------------

#include "level.h"

//-------------------------------------------------------------

CLevel::CLevel()
{
	m_blocks = 0;
}

//-------------------------------------------------------------

CLevel::~CLevel()
{
	destroy();
}

//-------------------------------------------------------------

void CLevel::destroy()
{
	m_back_layer.destroy();
	m_front_layer.destroy();
	m_image.destroy();
}

//-------------------------------------------------------------

bool CLevel::readUDWORD(gsUDWORD& d)
{
	gsUBYTE b[4];

	if (m_file.read(b,4) != 4)
		return false;

	d = (((gsUDWORD) b[0]) << 24) +
		(((gsUDWORD) b[1]) << 16) + 
		(((gsUDWORD) b[2]) << 8) + 
		((gsUDWORD) b[3]);

	return true;
}

//-------------------------------------------------------------

bool CLevel::readUWORD(gsUWORD& w)
{
	gsUBYTE b[2];

	if (m_file.read(b,2) != 2)
		return false;

	w =	(((gsUWORD) b[0]) << 8) + 
		((gsUWORD) b[1]);

	return true;
}

//-------------------------------------------------------------

bool CLevel::error()
{
	m_file.close();
	return false;
}

//-------------------------------------------------------------
	
#define CHUNK4(a,b,c,d) ((gsUDWORD(a) << 24) + (gsUDWORD(b) << 16) + \
						(gsUDWORD(c) << 8) + gsUDWORD(d))

const gsUDWORD CHUNK_FORM = CHUNK4('F','O','R','M');
const gsUDWORD CHUNK_FMAP = CHUNK4('F','M','A','P');
const gsUDWORD CHUNK_MPHD = CHUNK4('M','P','H','D');
const gsUDWORD CHUNK_BKDT = CHUNK4('B','K','D','T');
const gsUDWORD CHUNK_BGFX = CHUNK4('B','G','F','X');
const gsUDWORD CHUNK_BODY = CHUNK4('B','O','D','Y');
const gsUDWORD CHUNK_LYR1 = CHUNK4('L','Y','R','1');

bool CLevel::load(const char *filename,const char *levels_directory,const char *graphics_directory)
{
	destroy();

	gsCFile::setDirectory(levels_directory);

	if (!m_file.open(filename,gsFILE_READ))
		return false;

	gsUDWORD id = 0;

	if (!readUDWORD(id) ||
		id != CHUNK_FORM)
		return error();

	if (!readUDWORD(id))
		return error();

	if (!readUDWORD(id) ||
		id != CHUNK_FMAP)
		return error();

	bool loaded_back_layer = false;
	bool loaded_front_layer = false;
	bool loaded_tiles = false;

	for (;;) {
		if (!readUDWORD(id))
			return error();

		gsUDWORD chunk_length = 0;
		
		if (!readUDWORD(chunk_length))
			return error();

		gsUDWORD chunk_end = m_file.getPosition() + chunk_length;

		switch (id) {
			case CHUNK_MPHD:
				if (m_file.read(&m_header,sizeof(MPHD)) != sizeof(MPHD))
					return error();

				if (m_header.blockdepth != 24)
					return error();

				m_back_layer.setSize(gsCPoint(m_header.mapwidth,m_header.mapheight));
				m_front_layer.setSize(gsCPoint(m_header.mapwidth,m_header.mapheight));
			
				break;

			case CHUNK_BKDT:
				{
					m_blocks = new BLKSTR[m_header.numblockstr];

					for (int i = 0; i < m_header.numblockstr; i++) {
						gsUDWORD size = (gsUDWORD) m_header.blockstrsize;
						if (m_file.read(&m_blocks[i],size) != size)
							return error();
						}
				}
				break;

			case CHUNK_BGFX:

				gsCFile::setDirectory(graphics_directory);

				if (!m_image.load("blocks.bmp"))
					return error();

				m_image.setTileSize(gsCPoint(32,32));
				m_image.enableColourKey(gsCColour(gsMAGENTA));

				m_back_layer.setImage(&m_image);
				m_front_layer.setImage(&m_image);

				loaded_tiles = true;
				break;
			
			case CHUNK_BODY:
			case CHUNK_LYR1:
				{
					gsUWORD tile;

					for (int y = 0; y < m_header.mapheight; y++) {
						for (int x = 0; x < m_header.mapwidth; x++) {
							if (m_file.read(&tile,2) != 2)
								return error();

							gsCMapTile mt;

							BLKSTR *block = &m_blocks[tile / sizeof(BLKSTR)];
							int tilesize = m_header.blockheight * m_header.blockwidth * m_header.blockdepth / 8;
							tile = (gsUWORD) (block->bgoff / tilesize);
							
							mt.setTile(tile);

							if (tile == 0) {
								mt.setEmpty(true);
								mt.setHidden(true);
								}
							else {
								mt.setEmpty(false);
								mt.setUserData(0,(gsUBYTE) (block->user1 & 0xFF));
								mt.setUserData(1,(gsUBYTE) (block->user2 & 0xFF));
								mt.setUserData(2,(gsUBYTE) (block->user3 & 0xFF));
								mt.setUserData(3,(gsUBYTE) (block->user4 & 0xFF));

								gsUBYTE cflags = 0;
								if (block->tl != 0)
									cflags |= COLLIDE_WITH_SHIP;
								if (block->tr != 0)
									cflags |= COLLIDE_WITH_BULLETS;

								mt.setCollisionFlags(cflags);
								}

							if (id == CHUNK_BODY)
								m_back_layer.setMapTile(gsCPoint(x,y),mt);
							else
								m_front_layer.setMapTile(gsCPoint(x,y),mt);
							}
						}
				}

				if (id == CHUNK_BODY)
					loaded_back_layer = true;
				else
					loaded_front_layer = true;
				break;

			// ignored chunks

			default:
				break;
			}

		if (loaded_back_layer &&
			loaded_front_layer &&
			loaded_tiles)
			break;

		if (!m_file.setPosition(chunk_end))
			return error();
		}

	if (m_blocks) {
		delete [] m_blocks;
		m_blocks = 0;
		}

	m_file.close();

	return true;
}

//-------------------------------------------------------------

void CLevel::reset()
{
	m_scan_y = (-m_front_layer.getPosition().getY() - 1 + 480) / m_image.getTileSize().getY();	//TEMP

	// hide special tiles
	// unhide everything else

	for (int x = 0; x < m_front_layer.getSize().getX(); x++) {
		for (int y = 0; y < m_front_layer.getSize().getY(); y++) {
			gsCMapTile *mt = m_front_layer.getMapTile(gsCPoint(x,y));
			switch (mt->getUserData(0)) {
				case ID_PICKUP:
				case ID_ALIEN:
				case ID_CHECKPOINT:
				case ID_WARP_START:
				case ID_WARP_END:
				case ID_BOSS_CONTROL:
					mt->setHidden(true);
					break;
				case ID_DESTROYABLE_TILE:
					mt->setHidden(false);
					mt->setUserData(3,0);	// reset hit count
					break;
				default:
					mt->setHidden(false);
					break;
				}
			}
		}
}

//-------------------------------------------------------------

