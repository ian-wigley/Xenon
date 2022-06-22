//-------------------------------------------------------------
//
// Class:	gsCError
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	None
//
// Derived:	None
//
//-------------------------------------------------------------

#include "gamesystem.h"

#ifdef _DEBUG
#include "assert.h"
#endif

//-------------------------------------------------------------

#ifdef _DEBUG

void gsDoAssert(void *exp, void *file, unsigned line)
{
	_assert(exp,file,line);
}

#endif

//-------------------------------------------------------------

gsCError::gsCError()
{
}

//-------------------------------------------------------------

gsCError::~gsCError()
{
}

//-------------------------------------------------------------

void _cdecl gsCError::log(const char *format,...)
{
	va_list arglist;
	static char message[1000];

	va_start(arglist,format);
	vsprintf(message,format,arglist);
	va_end(arglist);

	strcat(message,"\n");

	OutputDebugString(message);
}

//-------------------------------------------------------------
