//-------------------------------------------------------------
//
// Module:	gsCInput
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	None
//
// Derived:	gsCKeyboard
//			gsCMouse
//			gsCJoystick
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------

gsLPDIRECTINPUT gsCInput::m_direct_input = 0;
gsCList<gsCInput *> gsCInput::m_active_inputs;

//-------------------------------------------------------------

bool gsCInput::initialize()
{
	if (m_direct_input == 0) {
		if (gsCApplication::getInstance() == 0) {
			gsREPORT("gsCInput::initialize called with no application instance");
			return false;
			}

		HRESULT hr;

#ifdef gsDIRECTX_NT_COMPATIBLE

		hr = DirectInputCreate(gsCApplication::getInstance(),
								 DIRECTINPUT_VERSION,
								 &m_direct_input,
								 NULL);

#else

		hr = DirectInputCreateEx(gsCApplication::getInstance(),
								 DIRECTINPUT_VERSION,
								 gsID_DIRECTINPUT,
								 (void **) &m_direct_input,
								 NULL);
#endif
		
		if (hr != DI_OK) {
			gsREPORT("gsCInput::initialize couldn't create direct input");
		    return false;
			}
		}
	return true;
}

//-------------------------------------------------------------

bool gsCInput::shutdown()
{
	if (m_direct_input) {
        m_direct_input->Release();
		m_direct_input = 0;
		}

	return true;
}

//-------------------------------------------------------------

bool gsCInput::acquireAll()
{
	for (int i = 0; i < m_active_inputs.getSize(); i++) {
		if (!m_active_inputs[i]->acquire())
			gsREPORT("failed to acquire input");
		}

	return true;
}

//-------------------------------------------------------------

bool gsCInput::updateAll()
{
	for (int i = 0; i < m_active_inputs.getSize(); i++) {
		if (!m_active_inputs[i]->update())
			gsREPORT("failed to update input");
		}

	return true;
}

//-------------------------------------------------------------

gsCInput::gsCInput()
{
}

//-------------------------------------------------------------

gsCInput::~gsCInput()
{
}

//-------------------------------------------------------------

