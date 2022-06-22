//-------------------------------------------------------------
//
// Class:	gsCMusic
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

#ifndef _INCLUDE_GS_MUSIC_H
#define _INCLUDE_GS_MUSIC_H

#include "bass.h"

//-------------------------------------------------------------

class gsCMusic : gsCObject
{
	private:
		HSTREAM m_handle;
		gsUBYTE *m_buffer;
		gsUDWORD m_size;

	public:
		gsCMusic();
		~gsCMusic();

		bool load(const char *filename);

		HSTREAM getHandle();
};

//-------------------------------------------------------------

#endif
