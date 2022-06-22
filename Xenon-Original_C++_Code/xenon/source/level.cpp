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

#include "game.h"

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

bool CLevel::load(const char *filename,const char *graphics_directory)
{
	destroy();

	gsCFile::setDirectory(DIRECTORY_LEVELS);

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
	m_boss_active = false;

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

void CLevel::scanForNewActors(CScene *scene)
{
	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen)
		return;

	gsCRect screen_rect = screen->getRect();
	gsCRect source_rect(gsCPoint(0,0),m_front_layer.getSizeInPixels());
	gsCRect dest_rect = source_rect;
	dest_rect.move(m_front_layer.getPosition());
	screen_rect.clip(source_rect,dest_rect);

	if (dest_rect.isEmpty())
		return;
	
	// convert back to tile coords

	int top = source_rect.getTop() / m_image.getTileSize().getY();

	// get row above screen

	top--;

	if (top < 0)
		return;

	while (m_scan_y >= top) {

		for (int x = 0; x < m_front_layer.getSize().getX(); x++) {

			gsCMapTile *mt = m_front_layer.getMapTile(gsCPoint(x,m_scan_y));

			if (!mt->isEmpty()) {
				gsUBYTE id = mt->getUserData(0);
				gsUBYTE type = mt->getUserData(1);
				gsUBYTE grade = mt->getUserData(2);
				gsUBYTE size = mt->getUserData(3);

				gsCVector pos((float) x * m_image.getTileSize().getX(),
							  (float) m_scan_y * m_image.getTileSize().getY());

				pos += gsCVector((float) m_image.getTileSize().getX() / 2.f,
								 (float) m_image.getTileSize().getY() / 2.f);

				switch (id) {
					case ID_PICKUP:
						// pickups
						{
						CPickup *p = 0;
						
						switch (type) {
							case PICKUP_SHIELD:
								p = new CShieldPickup;
								break;
							case PICKUP_SPEEDUP:
								p = new CSpeedPickup;
								break;
							case PICKUP_WEAPONUP:
								p = new CWeaponPickup;
								break;		  
							case PICKUP_CLOAK:
								p = new CCloakPickup;
								break;
							case PICKUP_DIVE:
								p = new CDivePickup;
								break;
							case PICKUP_SCOREBONUS:
								p = new CScorePickup;
								break;
							case PICKUP_CLONE:
								p = new CClonePickup;
								break;
							case PICKUP_WINGTIP:
								p = new CWingtipPickup;
								break;
							case PICKUP_HOMINGMISSILE:
								p = new CHomingMissilePickup;
								break;
							case PICKUP_LASER:
								p = new CLaserPickup;
								break;
							}

						if (p) {
							scene->addActor(p);
							p->setPosition(pos);
							p->activate();
							}
						}

						break;
					case ID_ALIEN:
						// aliens
						
						switch (type) {
							case ASTEROID:
								{
									CAsteroid *a = 0;
									
									switch (size) {
										case 0:
											switch (grade) {
												case 0:
													a = new CSmallStandardAsteroid();
													break;
												case 1:
													a = new CSmallHighDensityAsteroid();
													break;
												case 2:
													a = new CSmallIndestructibleAsteroid();
													break;
												}
											break;
										case 1:
											switch (grade) {
												case 0:
													a = new CMediumStandardAsteroid();
													break;
												case 1:
													a = new CMediumHighDensityAsteroid();
													break;
												case 2:
													a = new CMediumIndestructibleAsteroid();
													break;
												}
											break;
										case 2:
											switch (grade) {
												case 0:
													a = new CBigStandardAsteroid();
													break;
												case 1:
													a = new CBigHighDensityAsteroid();
													break;
												case 2:
													a = new CBigIndestructibleAsteroid();
													break;
												}
											break;
										}

									if (a) {
										scene->addActor(a);
										a->setPosition(pos);
										a->setVelocity(gsCVector(0.f,0.5f));
										a->activate();
										}
									}
								break;

							case LONER:
								{
									CLoner *l = 0;

									switch (grade) {
										case 0:
											l = new CStandardLoner();
											break;
										case 1:
											l = new CMediumLoner();
											break;
										case 2:
											l = new CArmouredLoner();
											break;
										}

									if (l) {
										scene->addActor(l);
										l->setPosition(pos);
										l->setVelocity(gsCVector(0.f,0.5f));
										l->activate();
										}
								}
								break;

							case HOMER:
								{
									CHomer *h = new CHomer();
									scene->addActor(h);
									h->setPosition(pos);
									h->setVelocity(gsCVector(0.f,0.5f));
									h->activate();
								}
								break;

							case POD:
								{
									CPod *p = new CPod();
									scene->addActor(p);
									p->setPosition(pos);
									p->setVelocity(gsCVector(0.f,0.f));
									p->activate();
								}
								break;

							case RUSHER:
								{
									CRusher *r = new CRusher();
									scene->addActor(r);
									r->setPosition(pos);
									r->setVelocity(gsCVector(0.f,2.f));
									r->activate();
								}
								break;

							case WALLHUGGER:
								{
									CWallHugger *w = new CWallHugger();
									scene->addActor(w);
									w->setPosition(pos);
									w->setVelocity(gsCVector(0.f,0.f));
									w->activate();

									switch (grade) {
										case 0:
											w->setGrade(WALLHUGGER_STATIC);
											break;
										case 1:
											w->setGrade(WALLHUGGER_MOVING);
											break;
										}
								}
								break;

							case DRONE_GENERATOR:
								{
									CDroneGenerator *d = new CDroneGenerator();
									scene->addActor(d);
									d->setPosition(pos);
									d->activate();
								}
								break;

							case REVERSE_RUSHER:
								{
									CRusher *r = new CRusher();
									scene->addActor(r);
									r->setPosition(pos + gsCVector(0.f,(float) screen->getSize().getY() +
																	   m_image.getTileSize().getY()));
									r->setVelocity(gsCVector(0.f,-4.f));
									r->activate();
								}
								break;

							case RUSHER_GENERATOR_LEFT:
								{
									CRusherGenerator *r = new CRusherGenerator();
									scene->addActor(r);
									r->setPosition(pos);
									r->setVelocity(gsCVector(-2.f,0.f));
									r->activate();
								}
								break;

							case RUSHER_GENERATOR_RIGHT:
								{
									CRusherGenerator *r = new CRusherGenerator();
									scene->addActor(r);
									r->setPosition(pos);
									r->setVelocity(gsCVector(2.f,0.f));
									r->activate();
								}
								break;

							case ORGANIC_GUN:
								{
									COrganicGun *w = new COrganicGun();
									scene->addActor(w);
									w->setPosition(pos);
									w->setVelocity(gsCVector(0.f,0.f));
									w->activate();
									if (grade == 0)
										w->setDirection(1);
									else
										w->setDirection(-1);
								}
								break;

							default:

								CBigExplosion *x = new CBigExplosion();
								scene->addActor(x);
								x->setPosition(pos);
								x->activate();
								break;
							}
						break;

					case ID_CHECKPOINT:
						scene->setNextCheckpoint(pos);
						break;

					case ID_WARP_START:
						scene->setWarp(true);
						break;

					case ID_WARP_END:
						scene->setWarp(false);
						break;

					case ID_BOSS_MOUTH:
						{
							CBossMouth *m = new CBossMouth();
							scene->addActor(m);
							m->setPosition(pos);
							m->setVelocity(gsCVector(0.f,0.f));
							m->activate();
						}
						break;
					case ID_BOSS_EYE:
						{
							CBossEye *e = new CBossEye();
							e->setEyeNumber(type);
							scene->addActor(e);
							switch (type) {
								case 0:
								case 1:
								case 4:
								case 5:
									e->setPosition(pos);
									break;
								case 2:
									e->setPosition(pos + gsCVector(15.f,20.f));
									break;
								case 3:
									e->setPosition(pos + gsCVector(15.f,20.f));
									break;
								}
							e->setVelocity(gsCVector(0.f,0.f));
							e->activate();
						}
						break;
					case ID_BOSS_CONTROL:
						{
							CBossControl *m = new CBossControl();
							scene->addActor(m);
							m->setPosition(pos);
							m->setVelocity(gsCVector(0.f,0.f));
							m->activate();

							m_boss_active = true;
						}
						break;
					}
				}
			}

		m_scan_y--;
		}
}

//-------------------------------------------------------------
