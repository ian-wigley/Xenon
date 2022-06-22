//-------------------------------------------------------------
//
// Class:	gsCCollisionList
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

#ifndef _INCLUDE_GS_COLLISIONLIST_H
#define _INCLUDE_GS_COLLISIONLIST_H

#include "gs_object.h"
#include "gs_list.h"
#include "gs_point.h"
#include "gs_rect.h"

//-------------------------------------------------------------
// A generic collider

class gsCCollider
{
	public:
		void *m_object;			// object pointer
		gsCRect m_rect;			// screen rectangle
		int m_uid;				// unique id number
		gsUDWORD m_object_mask;	// bitmask of object type
		gsUDWORD m_target_mask;	// bitmask of type of objects it can hit

		gsCCollider();
		gsCCollider(void *object,const gsCRect& rect,gsUDWORD object_mask,gsUDWORD target_mask,int uid);
		gsCCollider(const gsCCollider& collider);
};

//-------------------------------------------------------------
// A list of colliders

typedef gsCList<gsCCollider *> gsColliderList;

//-------------------------------------------------------------
// Callback function for user to do collision test

typedef void (gsCollisionCallback)(void *object1,void *object2);

//-------------------------------------------------------------
// Collision Map class

class gsCCollisionList
{
	private:
		gsCPoint m_pixel_size;
		gsCPoint m_zones;
		gsCPoint m_zone_size;

		gsCList<gsCCollider *> m_collider_list;

		gsColliderList *m_zone;

		void destroy();

	public:
		gsCCollisionList();
		~gsCCollisionList();

		void setSize(const gsCPoint& pixel_size,const gsCPoint& zones);

		void clear();
		void addObject(void *object,const gsCRect& rect,gsUDWORD object_mask = 0xFFFFFFFF,gsUDWORD target_mask = 0xFFFFFFFF);

		void scan(gsCollisionCallback *callback);
};

//-------------------------------------------------------------

#endif
