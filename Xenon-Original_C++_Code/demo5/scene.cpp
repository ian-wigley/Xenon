//-------------------------------------------------------------
//
// Class:	CScene
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

#include "demo5.h"

//-------------------------------------------------------------

CScene::CScene()
{
	m_frame_count = 0;
	m_map = 0;
	m_checkpoint_active = false;
	m_is_warping = false;
}

//-------------------------------------------------------------

CScene::~CScene()
{
}

//-------------------------------------------------------------

gsCTiledImage *CScene::getImage(const char *filename)
{
	if (filename == 0)
		return 0;

	for (int i = 0; i < m_image_list.getSize(); i++) {
		if (strcmp(m_image_list[i]->m_filename,filename) == 0)
			return &m_image_list[i]->m_image;
		}

	ImageEntry *image_entry = new ImageEntry;

	strcpy(image_entry->m_filename,filename);

	gsCFile::setDirectory(DIRECTORY_GRAPHICS);

	if (image_entry->m_image.load(filename)) {
		m_image_list.addItem(image_entry);
		return &image_entry->m_image;
		}
	else {
		delete image_entry;
		return 0;
		}
}

//-------------------------------------------------------------

bool CScene::loadImages()
{
	for (int i = 0; i < INFO_TOTAL; i++) {
		gsCTiledImage *image = getImage(ActorInfoList[i].m_filename);

		if (image) {
			image->setTileSize(gsCPoint(ActorInfoList[i].m_tile_width,
										ActorInfoList[i].m_tile_height));

			image->enableColourKey(gsCColour(gsMAGENTA));
			}
		}

	return true;
}

//-------------------------------------------------------------

void CScene::addToCollisionList(CActor *actor,const gsCRect& rect)
{
	switch (actor->getActorInfo().m_type) {
		case ACTOR_TYPE_SHIP:
			if (m_ship_is_cloaked)
				break;
			m_collision_list.addObject((void *) actor,
									  rect,
									  (1 << ACTOR_TYPE_SHIP),
									  (1 << ACTOR_TYPE_PICKUP) | (1 << ACTOR_TYPE_ALIEN));
			break;
		case ACTOR_TYPE_UPGRADE:
			if (m_ship_is_cloaked)
				break;
			m_collision_list.addObject((void *) actor,
									  rect,
									  (1 << ACTOR_TYPE_UPGRADE),
									  (1 << ACTOR_TYPE_PICKUP) | (1 << ACTOR_TYPE_ALIEN));
			break;
		case ACTOR_TYPE_BULLET:
			m_collision_list.addObject((void *) actor,
									  rect,
									  (1 << ACTOR_TYPE_BULLET),
									  (1 << ACTOR_TYPE_ALIEN) | (1 << ACTOR_TYPE_ALIENBULLET));
			break;
		case ACTOR_TYPE_ALIENBULLET:
			m_collision_list.addObject((void *) actor,
									  rect,
									  (1 << ACTOR_TYPE_ALIENBULLET),
									  (1 << ACTOR_TYPE_SHIP));
			break;
		case ACTOR_TYPE_ALIEN:
			m_collision_list.addObject((void *) actor,
									  rect,
									  (1 << ACTOR_TYPE_ALIEN),
									  0);
			break;
		case ACTOR_TYPE_PICKUP:
			m_collision_list.addObject((void *) actor,
									  rect,
									  (1 << ACTOR_TYPE_PICKUP),
									  0);
			break;
		case ACTOR_TYPE_WEAPON:
		case ACTOR_TYPE_ENGINE:
		case ACTOR_TYPE_LABEL:
		case ACTOR_TYPE_EFFECT:
			// no collision detection
			break;
		}
}

//-------------------------------------------------------------

void CScene::updateActorsOfType(ActorType type,Controls *controls)
{
	for (int j = 0; j < m_actor_list.getSize(); j++) {
		CActor *obj = m_actor_list[j];
		if (obj->isActive() &&
			obj->getActorInfo().m_type == type)
			obj->update(controls);
		}
}

//-------------------------------------------------------------

void CScene::updateAllActors(Controls *controls)
{
	updateActorsOfType(ACTOR_TYPE_SHIP,controls);
	updateActorsOfType(ACTOR_TYPE_UPGRADE,controls);
	updateActorsOfType(ACTOR_TYPE_ALIEN,controls);
	updateActorsOfType(ACTOR_TYPE_WEAPON,controls);
	updateActorsOfType(ACTOR_TYPE_ENGINE,controls);
	updateActorsOfType(ACTOR_TYPE_ALIENBULLET,controls);
	updateActorsOfType(ACTOR_TYPE_BULLET,controls);
	updateActorsOfType(ACTOR_TYPE_PICKUP,controls);
	updateActorsOfType(ACTOR_TYPE_LABEL,controls);
	updateActorsOfType(ACTOR_TYPE_EFFECT,controls);
}

//-------------------------------------------------------------

void CScene::drawActorsOfType(ActorType type,int total)
{
	for (int j = 0; j < total; j++) {
		CActor *actor = m_actor_list[j];
		if (actor->isActive() &&
			actor->getActorInfo().m_type == type)
			actor->draw();
		}
}

//-------------------------------------------------------------

void CScene::actorCollisionCallback(void *object1,void *object2)
{
	gsASSERT(object1);
	gsASSERT(object2);
	
	CActor *actor1 = (CActor *) object1;
	CActor *actor2 = (CActor *) object2;

	if (!actor1->isActive() ||
		!actor2->isActive())
		return;

	actor1->onCollisionWithActor(actor2);
}

//-------------------------------------------------------------
// Draw all active game actors - prioritized

void CScene::drawAllActors(gsCMap *map)
{
	m_frame_count++;
	
	m_collision_list.clear();

	int total = m_actor_list.getSize();

	CShip *ship = findShip();

	map->draw();

	drawActorsOfType(ACTOR_TYPE_EFFECT,total);
	drawActorsOfType(ACTOR_TYPE_PICKUP,total);
	drawActorsOfType(ACTOR_TYPE_ALIEN,total);
	drawActorsOfType(ACTOR_TYPE_ALIENBULLET,total);
	drawActorsOfType(ACTOR_TYPE_BULLET,total);
	drawActorsOfType(ACTOR_TYPE_ENGINE,total);
	drawActorsOfType(ACTOR_TYPE_SHIP,total);
	drawActorsOfType(ACTOR_TYPE_UPGRADE,total);
	drawActorsOfType(ACTOR_TYPE_WEAPON,total);
	drawActorsOfType(ACTOR_TYPE_LABEL,total);
}

//-------------------------------------------------------------

void CScene::checkActorCollisions()
{
	m_collision_list.scan(actorCollisionCallback);

	for (int i = 0; i < m_actor_list.getSize(); i++) {
		if (m_actor_list[i]->isActive())
			m_actor_list[i]->postProcessCollision();
		}
}

//-------------------------------------------------------------

void CScene::checkMapCollisions(gsCMap *map)
{
	// check for collisions between actors and map

	for (int i = 0; i < m_actor_list.getSize(); i++) {
		CActor *actor = m_actor_list[i];
		if (actor->isActive()) {
			switch (actor->getActorInfo().m_type) {
				case ACTOR_TYPE_SHIP:
				case ACTOR_TYPE_UPGRADE:
					if (m_ship_is_cloaked)
						break;
					{
						gsCRect rect = actor->getCollisionRect();
						rect.move(-map->getPosition());
						int hits = map->hitBy(rect,COLLIDE_WITH_SHIP);
						if (hits)
							actor->onCollisionWithMap(map,hits);
					}
					break;

				case ACTOR_TYPE_BULLET:
				case ACTOR_TYPE_ALIENBULLET:
					{
						gsCRect rect = actor->getCollisionRect();
						rect.move(-map->getPosition());
						int hits = map->hitBy(rect,COLLIDE_WITH_BULLETS);
						if (hits)
							actor->onCollisionWithMap(map,hits);
					}
					break;
				}
			}
		}
}

//-------------------------------------------------------------

void CScene::removeDeadActors()
{
	for (int i = m_actor_list.getSize() - 1; i >= 0; i--) {
		if (!m_actor_list[i]->isActive()) {
			delete m_actor_list[i];
			m_actor_list.removeIndex(i);
			}
		}
}

//-------------------------------------------------------------

void CScene::killAllActors()
{
	int i;
	
	for (i = 0; i < m_actor_list.getSize(); i++)
		m_actor_list[i]->kill();

	for (i = 0; i < m_actor_list.getSize(); i++)
		delete m_actor_list[i];

	m_actor_list.clear();
}

//-------------------------------------------------------------

void CScene::destroyAll()
{
	int i;

	for (i = 0; i < m_actor_list.getSize(); i++)
		delete m_actor_list[i];

	m_actor_list.clear();

	for (i = 0; i < m_image_list.getSize(); i++) {
		m_image_list[i]->m_image.destroy();
		delete m_image_list[i];
		}
	
	m_image_list.clear();
}

//-------------------------------------------------------------

CShip *CScene::findShip()
{
	for (int i = 0; i < m_actor_list.getSize(); i++) {
		if (m_actor_list[i]->getActorInfo().m_type == ACTOR_TYPE_SHIP)
			return (CShip *) m_actor_list[i];
		}

	return 0;
}

//-------------------------------------------------------------

void CScene::createMapExplosion(gsCMap *map,const gsCPoint& position)
{
	CSmallExplosion *exp = new CSmallExplosion();
	addActor(exp);

	gsCPoint tile_size = map->getImage()->getTileSize();
	gsCPoint tile_centre = tile_size / gsCPoint(2,2);

	gsCPoint pos = position * tile_size + tile_centre;
	exp->setPosition(gsCVector((float) pos.getX(),(float) pos.getY()));
	exp->activate();
}

//-------------------------------------------------------------

CActor *CScene::getActor(int index)
{
	return m_actor_list[index];
}

//-------------------------------------------------------------

CActor *CScene::findNearestActor(ActorType type,const gsCVector& position,int dir)
{
	CActor *nearest_actor = 0;
	float nearest_distance = 99999.f;

	for (int i = 0; i < m_actor_list.getSize(); i++) {
		CActor *actor = m_actor_list[i];
		if (actor->isActive() &&
			actor->getActorInfo().m_type == type) {
			if (dir != 0) {
				float sy = position.getY();
				float ay = actor->getPosition().getY();
				if (dir < 0 && sy < ay)
					continue;
				if (dir > 0 && sy > ay)
					continue;
				}
			float d = (actor->getPosition() - position).length();
			if (nearest_actor == 0 ||
				d < nearest_distance) {
				nearest_actor = actor;
				nearest_distance = d;
				}
			}
		}

	return nearest_actor;
}

//-------------------------------------------------------------

