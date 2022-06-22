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

#include "gamesystem.h"

//-------------------------------------------------------------

gsCMusic::gsCMusic()
{
	m_handle = 0;
	m_buffer = 0;
	m_size = 0;
}

//-------------------------------------------------------------

gsCMusic::~gsCMusic()
{
	if (m_handle)
		BASS_StreamFree(m_handle);

	if (m_buffer)
		delete [] m_buffer;
}

//-------------------------------------------------------------

bool gsCMusic::load(const char *filename)
{
	gsCFile file;

	if (!file.open(filename))
		return false;

	m_size = file.getLength();
	m_buffer = new gsUBYTE[m_size];

	file.read(m_buffer,m_size);

	m_handle = BASS_StreamCreateFile(TRUE,m_buffer,0,m_size,0);

	file.close();

	return true;
}

//-------------------------------------------------------------

HSTREAM gsCMusic::getHandle()
{
	return m_handle;
}

//-------------------------------------------------------------
