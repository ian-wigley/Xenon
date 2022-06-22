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

#ifndef _INCLUDE_GS_ERROR_H
#define _INCLUDE_GS_ERROR_H

#include "gs_object.h"

//-------------------------------------------------------------
// Define our own version of assert

#ifdef _DEBUG

#define gsASSERT(exp) (void)( (exp) || (gsDoAssert(#exp, __FILE__, __LINE__), 0) )

void gsDoAssert(void *exp, void *file, unsigned line);

#else

#define gsASSERT(exp) ((void) 0)

#endif

//-------------------------------------------------------------

class gsCError : public gsCObject
{
	private:


	public:
		gsCError();
		~gsCError();

		static void _cdecl log(const char *format,...);
};

//-------------------------------------------------------------

#ifdef gsENABLE_DEBUG_REPORT
#define gsREPORT(s) gsCError::log("REPORT : %s",s)
#else
#define gsREPORT(s) ((void) 0)
#endif

#ifdef gsENABLE_ERROR_LOG
#define gsERROR(s) gsCError::log("ERROR : %s",s)
#else
#define gsERROR(s) ((void) 0)
#endif

//-------------------------------------------------------------

#endif
