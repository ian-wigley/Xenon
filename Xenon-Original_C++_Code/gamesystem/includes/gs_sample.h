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

#ifndef _INCLUDE_GS_SAMPLE_H
#define _INCLUDE_GS_SAMPLE_H

#include "bass.h"

//-------------------------------------------------------------

class gsCSample : gsCObject
{
	private:
		HSAMPLE m_handle;
		gsUBYTE *m_buffer;
		gsUDWORD m_size;

	public:
		gsCSample();
		~gsCSample();

		bool load(const char *filename);

		HSAMPLE getHandle();
};

//-------------------------------------------------------------

#endif
