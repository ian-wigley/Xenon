//-------------------------------------------------------------
//
// Class:	gsCKeyboard
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

#ifndef _INCLUDE_GS_KEYBOARD_H
#define _INCLUDE_GS_KEYBOARD_H

#include "gs_types.h"
#include "gs_input.h"
#include "gs_keycodes.h"

//-------------------------------------------------------------

const int gsKEYBOARD_KEYCODES = 256;
const int gsKEYBOARD_BUFFER_SIZE = 16;

//-------------------------------------------------------------

typedef enum {
	gsKEY_STATE = 1,
	gsKEY_PRESSED = 2,
	gsKEY_RELEASED = 4,
} gsKeyState;

//-------------------------------------------------------------

class gsCKeyboard : public gsCInput
{
	private:
		static gsLPDIRECTINPUTDEVICE m_keyboard_device;

		gsUBYTE m_previous_key_states[gsKEYBOARD_KEYCODES];
		gsUBYTE m_new_key_states[gsKEYBOARD_KEYCODES];
		gsUBYTE m_key_states[gsKEYBOARD_KEYCODES];
		gsCList<gsKeyCode> m_key_buffer;
		
		static char keycode_to_lower[gsKEYBOARD_KEYCODES];
		static char keycode_to_upper[gsKEYBOARD_KEYCODES];

		static const char *keycode_description[gsKEYBOARD_KEYCODES];

	public:
		gsCKeyboard();
		virtual ~gsCKeyboard();

		bool create();
		bool destroy();

		bool acquire();
		bool update();
		bool isActive();

		bool testKey(gsKeyCode keycode,gsKeyState state = gsKEY_STATE);
		gsKeyCode getKey();
		void flush();

		char keyCodeToAscii(gsKeyCode code);

		const char *keyCodeToDescription(gsKeyCode code);
};

//-------------------------------------------------------------

#endif
