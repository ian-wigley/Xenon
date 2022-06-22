//-------------------------------------------------------------
//
// Class:	gsCMapTile
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

#ifndef _INCLUDE_GS_MAPTILE_H
#define _INCLUDE_GS_MAPTILE_H

//-------------------------------------------------------------

const int gsMAPTILE_USERDATA = 4;

//-------------------------------------------------------------

class gsCMapTile : public gsCObject
{
	private:
		int m_tile;
		gsUBYTE m_empty;						// = 1 if empty
		gsUBYTE m_hidden;						// = 1 if hidden
		gsUBYTE m_data[gsMAPTILE_USERDATA];		// user data
		gsUBYTE m_collision_flags;

	public:
		gsCMapTile();
		gsCMapTile(int tile,bool empty = false,bool hidden = false);
		~gsCMapTile();

		void setTile(int tile);
		int getTile();

		void setEmpty(bool state = true);
		void setHidden(bool state = true);
		void setUserData(int index,gsUBYTE data);
		void setCollisionFlags(gsUBYTE flags);

		bool isEmpty();
		bool isHidden();
		bool isDrawable();
		gsUBYTE getUserData(int index);
		gsUBYTE getCollisionFlags();
};

//-------------------------------------------------------------

inline gsCMapTile::gsCMapTile()
{
	m_tile = 0;
	m_empty = 1;
	m_hidden = 0;
	for (int i = 0; i < gsMAPTILE_USERDATA; i++)
		m_data[i] = 0;
}

//-------------------------------------------------------------

inline gsCMapTile::gsCMapTile(int tile,bool empty,bool hidden)
{
	m_tile = tile;
	m_empty = (gsUBYTE) (empty ? 1 : 0);
	m_hidden = (gsUBYTE) (hidden ? 1 : 0);
	for (int i = 0; i < gsMAPTILE_USERDATA; i++)
		m_data[i] = 0;
}

//-------------------------------------------------------------

inline gsCMapTile::~gsCMapTile()
{
}

//-------------------------------------------------------------

inline void gsCMapTile::setTile(int tile)
{
	m_tile = tile;
}

//-------------------------------------------------------------

inline int gsCMapTile::getTile()
{
	return m_tile;
}

//-------------------------------------------------------------

inline void gsCMapTile::setEmpty(bool state)
{
	m_empty = (gsUBYTE) (state ? 1 : 0);
}

//-------------------------------------------------------------

inline void gsCMapTile::setHidden(bool state)
{
	m_hidden = (gsUBYTE) (state ? 1 : 0);
}

//-------------------------------------------------------------

inline void gsCMapTile::setUserData(int index,gsUBYTE data)
{
	gsASSERT(index >= 0 && index < gsMAPTILE_USERDATA);
	
	m_data[index] = data;
}

//-------------------------------------------------------------

inline void gsCMapTile::setCollisionFlags(gsUBYTE flags)
{
	m_collision_flags = flags;
}

//-------------------------------------------------------------

inline bool gsCMapTile::isEmpty()
{
	return m_empty != 0;
}

//-------------------------------------------------------------

inline bool gsCMapTile::isHidden()
{
	return m_hidden != 0;
}

//-------------------------------------------------------------

inline bool gsCMapTile::isDrawable()
{
	return m_empty == 0 && m_hidden == 0;
}

//-------------------------------------------------------------

inline gsUBYTE gsCMapTile::getUserData(int index)
{
	gsASSERT(index >= 0 && index < gsMAPTILE_USERDATA);

	return m_data[index];
}

//-------------------------------------------------------------

inline gsUBYTE gsCMapTile::getCollisionFlags()
{
	return m_collision_flags;
}
//-------------------------------------------------------------

#endif
