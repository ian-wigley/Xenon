//-------------------------------------------------------------
//
// Module:	gsCJoystick
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

#ifndef _INCLUDE_GS_JOYSTICK_H
#define _INCLUDE_GS_JOYSTICK_H

#include "gs_input.h"
#include "gs_point.h"

//-------------------------------------------------------------

const int gsJOYSTICK_MAX_STICKS = 2;
const int gsJOYSTICK_MAX_BUTTONS = 8;

const int gsJOYSTICK_RANGE = 1000;
const int gsJOYSTICK_THRESHOLD = 500;

//-------------------------------------------------------------

typedef enum {
	gsJOY_NONE = 256,
	gsJOY_LEFT,
	gsJOY_RIGHT,
	gsJOY_UP,
	gsJOY_DOWN,
	gsJOY_BUTTON0,
	gsJOY_BUTTON1,
	gsJOY_BUTTON2,
	gsJOY_BUTTON3,
	gsJOY_BUTTON4,
	gsJOY_BUTTON5,
	gsJOY_BUTTON6,
	gsJOY_BUTTON7,

	gsJOY_LAST
} gsJoystickCode;

const int gsJOYSTICK_CODES = gsJOY_LAST - gsJOY_NONE;

//-------------------------------------------------------------

class gsCJoystick : public gsCInput
{
	private:
		static int m_num_joysticks;

		static DIDEVICEINSTANCE m_device_desc[gsJOYSTICK_MAX_STICKS];

		static gsLPDIRECTINPUTDEVICE m_joystick_device[gsJOYSTICK_MAX_STICKS];
		
		static gsCPoint m_previous_position[gsJOYSTICK_MAX_STICKS];
		static gsCPoint m_position[gsJOYSTICK_MAX_STICKS];
		static bool m_previous_buttons[gsJOYSTICK_MAX_STICKS][gsJOYSTICK_CODES];
		static bool m_buttons[gsJOYSTICK_MAX_STICKS][gsJOYSTICK_CODES];

		static BOOL CALLBACK enumDevicesCallback(LPDIDEVICEINSTANCE lpddi,LPVOID pvRef);

		static gsJoystickCode m_code;

		static const char *joystickcode_description[gsJOYSTICK_CODES];

	public:
		gsCJoystick();
		virtual ~gsCJoystick();

		bool create();
		bool destroy();

		bool acquire();
		bool update();
		bool isActive();

		int getNumSticks();
		bool testButton(gsJoystickCode button,int stick = 0);
		bool testButtonPressed(gsJoystickCode button,int stick = 0);

		gsCPoint getPosition(int stick = 0);

		gsJoystickCode getEmulatedKey();

		const char * joystickCodeToDescription(gsJoystickCode code);
};

//-------------------------------------------------------------

#endif
