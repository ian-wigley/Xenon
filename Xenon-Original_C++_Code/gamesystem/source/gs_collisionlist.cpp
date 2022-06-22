//-------------------------------------------------------------
//
// Class:	gsCCollisionList
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	gsCObject
//
// Derived:	None
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------

gsCCollider::gsCCollider()
{
	m_object = 0;
}

//-------------------------------------------------------------

gsCCollider::gsCCollider(void *object,const gsCRect& rect,gsUDWORD object_mask,gsUDWORD target_mask,int uid)
{
	m_object = object;
	m_rect = rect;
	m_uid = uid;
	m_object_mask = object_mask;
	m_target_mask = target_mask;
}

//-------------------------------------------------------------
		
gsCCollider::gsCCollider(const gsCCollider& collider)
{
	m_object = collider.m_object;
	m_rect = collider.m_rect;
	m_uid = collider.m_uid;
	m_object_mask = collider.m_object_mask;
	m_target_mask = collider.m_target_mask;
}

//-------------------------------------------------------------

gsCCollisionList::gsCCollisionList()
{
	m_pixel_size = gsCPoint(0,0);
	m_zone_size = gsCPoint(0,0);
	m_zones = gsCPoint(0,0);
	m_zone = 0;
}

//-------------------------------------------------------------

gsCCollisionList::~gsCCollisionList()
{
	destroy();
}

//-------------------------------------------------------------

void gsCCollisionList::destroy()
{
	clear();

	if (m_zone) {
		delete [] m_zone;
		m_zone = 0;
		}
}

//-------------------------------------------------------------

void gsCCollisionList::setSize(const gsCPoint& pixel_size,const gsCPoint& zones)
{
	destroy();

	m_pixel_size = pixel_size;
	m_zones = zones;
	m_zone_size = m_pixel_size / zones;

	// create a collider list for each zone

	m_zone = new gsColliderList[m_zones.getX() * m_zones.getY()];
}

//-------------------------------------------------------------

void gsCCollisionList::clear()
{
	// clear out the zone lists

	if (m_zone) {
		for (int i = 0; i < m_zones.getX() * m_zones.getY(); i++)
			m_zone[i].clear();
		}

	// clear out the object list

	for (int i = 0; i < m_collider_list.getSize(); i++)
		delete m_collider_list[i];

	m_collider_list.clear();
}

//-------------------------------------------------------------

void gsCCollisionList::addObject(void *object,const gsCRect& rect,gsUDWORD object_mask,gsUDWORD target_mask)
{
	// get range of zones which object overlaps

	int left_zone = rect.getLeft() / m_zone_size.getX();
	int right_zone = (rect.getRight() - 1) / m_zone_size.getX();
	int top_zone = rect.getTop() / m_zone_size.getY();
	int bottom_zone = (rect.getBottom() - 1) / m_zone_size.getY();

	// skip if outside collision map

	if (left_zone >= m_zones.getX() ||
		right_zone < 0 ||
		top_zone >= m_zones.getY() ||
		bottom_zone < 0)
		return;

	// clip against collision map

	if (left_zone < 0)
		left_zone = 0;
	if (right_zone >= m_zones.getX())
		right_zone = m_zones.getX() - 1;
	if (top_zone < 0)
		top_zone = 0;
	if (bottom_zone >= m_zones.getY())
		bottom_zone = m_zones.getY() - 1;

	// make a record of the collider

	int uid = m_collider_list.getSize();

	gsCCollider *collider = new gsCCollider(object,rect,object_mask,target_mask,uid);

	m_collider_list.addItem(collider);

	// add to EACH zone which it overlaps

	for (int y = top_zone; y <= bottom_zone; y++) {
		for (int x = left_zone; x <= right_zone; x++) {
			m_zone[y * m_zones.getX() + x].addItem(collider);
			}
		}
}

//-------------------------------------------------------------

void gsCCollisionList::scan(gsCollisionCallback *callback)
{
	if (!callback)
		return;

	int num_objects = m_collider_list.getSize();

	// create an array of flags to mark whether we've tested
	// a particular combination of objects

	gsUBYTE *tested = new gsUBYTE[num_objects * num_objects];

	memset(tested,0,num_objects * num_objects);

	// scan the zones

	for (int i = 0; i < m_zones.getX() * m_zones.getY(); i++) {

		// get list of the colliders in the zone
		
		gsColliderList& collider_list = m_zone[i];

		// skip if empty or only one collider

		if (collider_list.getSize() > 1) {

			// we've found a zone with at least 2 objects in it
			// test all combinations of pairs of objects

			for (int a = 0; a < collider_list.getSize(); a++) {

				gsCCollider *obj_a = collider_list[a];

				// get pointer to row of flags for object a
				
				gsUBYTE *tp = tested + obj_a->m_uid * num_objects;

				for (int b = a + 1; b < collider_list.getSize(); b++) {

					gsCCollider *obj_b = collider_list[b];

					// skip pairs we've already tested
					
					if (tp[obj_b->m_uid] == 0) {

						gsASSERT(obj_a->m_object);
						gsASSERT(obj_b->m_object);

						// check if rectangles overlap

						if (obj_a->m_rect.overlaps(obj_b->m_rect)) {

							// if object a can hit object b test collision

							if ((obj_a->m_target_mask & obj_b->m_object_mask) != 0)
								callback(obj_a->m_object,obj_b->m_object);

							if ((obj_b->m_target_mask & obj_a->m_object_mask) != 0)
								callback(obj_b->m_object,obj_a->m_object);
							}
						
						// mark pair as having been tested
			
						tp[obj_b->m_uid] = 1;
						}
					}
				}
			}
		}

	// delete the flags

	delete [] tested;
}

//-------------------------------------------------------------
