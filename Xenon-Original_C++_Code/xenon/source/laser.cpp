//-------------------------------------------------------------
//
// Class:	CLaser
//
// Author:	John M Phillips
//
// Started:	07/05/00
//
// Base:	CBullet
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CLaser::CLaser()
{
	m_hit_map = 0;
}

//-------------------------------------------------------------

CLaser::~CLaser()
{
//	CBullet::~CBullet();
}

//-------------------------------------------------------------

bool CLaser::activate()
{
	if (!isActive()) {
		m_length = LASER_MAX_LENGTH;
		m_dying = false;
		}

	return CActor::activate();
}

//-------------------------------------------------------------

void CLaser::onCollisionWithActor(CActor *actor)
{
	if (m_dying)
		return;
	
	// save colliders for later

	m_actor_collider_list.addItem(actor);
}

//-------------------------------------------------------------

void CLaser::onCollisionWithMap(gsCMap *map,int hits)
{
	if (m_dying)
		return;

	// save colliders for later

	m_hit_map = map;

	m_map_collider_list.setSize(hits);

	for (int i = 0; i < hits; i++)
		m_map_collider_list.setItem(i,map->getHitPosition(i));
}

//-------------------------------------------------------------

void CLaser::postProcessCollision()
{
	// only hit NEAREST actor or map tile

	if (m_actor_collider_list.isEmpty() &&
		m_map_collider_list.isEmpty())
		return;

	int actor_i = -1;
	float actor_d = 99999.f;

	gsCVector pos = getPosition();

	for (int i = 0; i < m_actor_collider_list.getSize(); i++) {
		gsCVector cpos = m_actor_collider_list[i]->getPosition();
		float d = (cpos - pos).length();
		if (actor_i == -1 || d < actor_d) {
			actor_i = i;
			actor_d = d;
			}
		}

	int map_i = -1;
	float map_d = 99999.f;

	if (m_hit_map) {
		gsCPoint tile_size = m_hit_map->getImage()->getTileSize();
		gsCPoint tile_centre = tile_size / gsCPoint(2,2);

		for (int i = 0; i < m_map_collider_list.getSize(); i++) {
			// convert map tile coords to world coords

			gsCPoint p = m_map_collider_list[i] * tile_size + tile_centre;
			gsCVector mpos((float) p.getX(),(float) p.getY());

			float d = (mpos - pos).length();
			if (map_i == -1 || d < map_d) {
				map_i = i;
				map_d = d;
				}
			}
		}

	if (actor_d < map_d) {
		CActor *actor = m_actor_collider_list[actor_i];
		actor->registerHit(getActorInfo().m_energy[m_grade],this);
		m_length = (int) actor_d;
		}
	else {
		gsCPoint pos = m_map_collider_list[map_i];

		gsCMapTile *mt = m_hit_map->getMapTile(pos);
		if (mt && mt->getUserData(0) == ID_DESTROYABLE_TILE) {
			mt->setHidden(true);
			m_scene->createMapExplosion(m_hit_map,pos);

			CPlayGameState::getPlayer()->scoreBonus(5);
			}

		m_length = (int) map_d;
		}
		
	m_actor_collider_list.clear();
	m_map_collider_list.clear();
	m_hit_map = 0;

	m_dying = true;
}

//-------------------------------------------------------------

bool CLaser::update(Controls *controls)
{
	m_position += m_velocity;

	if (m_dying) {
		m_length += (int) m_velocity.getY();
		if (m_length <= 0) {
			kill();
			return true;
			}
		}
	
	m_sprite.setFrame((int) m_grade);

	return true;
}

//-------------------------------------------------------------

bool CLaser::draw()
{
	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen)
		return false;

	gsCColour colour;

	int flash = m_random.getInt(256);

	switch (m_grade) {
		case BULLET_STANDARD:
			colour = gsCColour(0,flash,255);
			break;
		case BULLET_MEDIUM:
			colour = gsCColour(flash,255,0);
			break;
		case BULLET_BEST:
			colour = gsCColour(255,0,flash);
			break;
		}

	gsCRect rect = getCollisionRect();

	bool on_screen = screen->drawSolidRect(rect,colour);

	if (m_is_on_screen && !on_screen)
		onLeavingScreen();

	m_is_on_screen = on_screen;

	if (m_is_on_screen && !m_dying)
		m_scene->addToCollisionList(this,rect);

	return true;
}

//-------------------------------------------------------------

gsCRect CLaser::getCollisionRect()
{
	gsCPoint pos(getPosition() + m_scene->getMap()->getPosition());

	return gsCRect(pos.getX(),
				   pos.getY() - m_length,
				   pos.getX() + 2,
				   pos.getY() + 1);
}

//-------------------------------------------------------------
