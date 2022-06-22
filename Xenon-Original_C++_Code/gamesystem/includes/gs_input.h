//-------------------------------------------------------------
//
// Class:	gsCInput
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCObject
//
// Derived:	gsCKeyboard
//			gsCMouse
//			gsCJoystick
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_INPUT_H
#define _INCLUDE_GS_INPUT_H

#include "gs_object.h"
#include "gs_application.h"

//-------------------------------------------------------------

class gsCInput : public gsCObject
{
	friend class gsCApplication;

	protected:
		static gsLPDIRECTINPUT m_direct_input;
		static gsCList<gsCInput *> m_active_inputs;

		static bool initialize();
		static bool shutdown();

		static bool acquireAll();
		static bool updateAll();
		
	public:

		gsCInput();
		virtual ~gsCInput();

		virtual bool acquire() = 0;
		virtual bool update() = 0;
		virtual bool isActive() = 0; 
};

//-------------------------------------------------------------

#endif

