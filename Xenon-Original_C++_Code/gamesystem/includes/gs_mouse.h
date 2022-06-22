//-------------------------------------------------------------
//
// Module:	gsCMouse
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCInput
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_MOUSE_H
#define _INCLUDE_GS_MOUSE_H

#include "gs_input.h"
#include "gs_point.h"

//-------------------------------------------------------------

typedef enum {
	gsMOUSE_LEFT = 0,
	gsMOUSE_RIGHT,
	gsMOUSE_MIDDLE,

	gsMOUSE_NUM_BUTTONS
} gsMouseButton;

//-------------------------------------------------------------

class gsCMouse : public gsCInput
{
	private:
		
		static gsLPDIRECTINPUTDEVICE m_mouse_device;
		
		gsCPoint m_position;
		bool m_buttons[gsMOUSE_NUM_BUTTONS];

	public:
		gsCMouse();
		virtual ~gsCMouse();

		bool create();
		bool destroy();

		bool acquire();
		bool update();
		bool isActive();

		gsCPoint getPosition();
		bool testButton(gsMouseButton button);
};

//-------------------------------------------------------------

#endif
