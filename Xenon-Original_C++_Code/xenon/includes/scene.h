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

#ifndef _INCLUDE_SCENE_H
#define _INCLUDE_SCENE_H

#include "gamesystem.h"
#include "actor.h"

//-------------------------------------------------------------
// Image info for loading graphics

struct ImageInfo
{
	char *m_filename;			// file name
	int m_tile_width;			// width of each tile
	int m_tile_height;			// height of each tile
	bool m_colour_key;			// if true use colour key
};

//-------------------------------------------------------------
// Entry in m_image_list

struct ImageEntry
{
	char m_filename[MAX_PATH];	// file name
	gsCTiledImage m_image;		// the image itself
};

//-------------------------------------------------------------

class CScene
{
	private:

		gsCList<CActor *> m_actor_list;
		gsCList<ImageEntry *> m_image_list;
		gsCCollisionList m_collision_list;
		int m_frame_count;
		gsCMap *m_map;

		bool m_checkpoint_active;
		gsCVector m_checkpoint;

		bool m_is_warping;

		void updateActorsOfType(ActorType type,Controls *controls);
		void drawActorsOfType(ActorType type,int total);

		static void actorCollisionCallback(void *object1,void *object2);

		bool m_ship_is_cloaked;

	public:
		CScene();
		~CScene();

		bool loadImages();
		void setCollisionListSize(const gsCPoint& pixel_size,const gsCPoint& zone_size);
		void updateAllActors(Controls *controls);
		void drawAllActors(gsCMap *map);
		void checkActorCollisions();
		void checkMapCollisions(gsCMap *map);
		void killAllActors();
		void removeDeadActors();
		void destroyAll();
		CActor *findNearestActor(ActorType type,const gsCVector& position,int dir);

		gsCTiledImage *getImage(const char *filename);
		int getNumberOfImages();

		void addActor(CActor *actor);
		void removeActor(CActor *actor);
		
		int getNumberOfActors();
		CActor *getActor(int index);

		void setMap(gsCMap *map);
		gsCMap *getMap();

		CShip *findShip();

		void addToCollisionList(CActor *actor,const gsCRect& rect);

		void createLabel(const gsCVector& position,const char *text);
		void createLabel(const gsCVector& position,int number);
		void createMapExplosion(gsCMap *map,const gsCPoint& position);

		void clearCheckpoint();
		void setNextCheckpoint(const gsCVector& position);
		bool hasCheckpoint();
		gsCVector getCheckpoint();

		void setWarp(bool state) { m_is_warping = state; };
		bool isWarping() { return m_is_warping; };
};

//-------------------------------------------------------------

inline int CScene::getNumberOfActors()
{
	return m_actor_list.getSize();
}

//-------------------------------------------------------------

inline void CScene::addActor(CActor *actor)
{
	actor->setScene(this);
	m_actor_list.addItem(actor);
}

//-------------------------------------------------------------

inline void CScene::removeActor(CActor *actor)
{
	actor->setScene(0);
	m_actor_list.removeItem(actor);
}

//-------------------------------------------------------------

inline int CScene::getNumberOfImages()
{
	return m_image_list.getSize();
}

//-------------------------------------------------------------

inline void CScene::setCollisionListSize(const gsCPoint& pixel_size,const gsCPoint& zones)
{
	m_collision_list.setSize(pixel_size,zones);
}

//-------------------------------------------------------------

inline void CScene::setMap(gsCMap *map)
{
	m_map = map;
}

//-------------------------------------------------------------

inline gsCMap *CScene::getMap()
{
	return m_map;
}

//-------------------------------------------------------------

#endif


