//-------------------------------------------------------------
//
// Class:	gsCSample
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

gsCSample::gsCSample()
{
	m_handle = 0;
	m_buffer = 0;
	m_size = 0;
}

//-------------------------------------------------------------

gsCSample::~gsCSample()
{
	if (m_handle)
		BASS_SampleFree(m_handle);

	if (m_buffer)
		delete [] m_buffer;
}

//-------------------------------------------------------------

bool gsCSample::load(const char *filename)
{
	gsCFile file;

	if (!file.open(filename))
		return false;

	m_size = file.getLength();
	m_buffer = new gsUBYTE[m_size];

	file.read(m_buffer,m_size);

	m_handle = BASS_SampleLoad(TRUE,m_buffer,0,m_size,3,BASS_SAMPLE_OVER_POS | BASS_SAMPLE_MONO);

	file.close();

	return true;
}

//-------------------------------------------------------------

HSAMPLE gsCSample::getHandle()
{
	return m_handle;
}

//-------------------------------------------------------------
