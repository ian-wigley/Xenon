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

#include "gamesystem.h"

//-------------------------------------------------------------

gsLPDIRECTINPUTDEVICE gsCMouse::m_mouse_device = 0;

//-------------------------------------------------------------

gsCMouse::gsCMouse()
{
	m_position = gsCPoint(0,0);

	for (int i = 0; i < gsMOUSE_NUM_BUTTONS; i++)
		m_buttons[i] = false;
}

//-------------------------------------------------------------

gsCMouse::~gsCMouse()
{
	destroy();
}

//-------------------------------------------------------------

bool gsCMouse::create()
{
	if (!m_direct_input) {
		gsREPORT("gsCMouse::create called with no direct input device");
		return false;
		}

	if (m_mouse_device)
		return true;

	HRESULT hr;

#ifdef gsDIRECTX_NT_COMPATIBLE

    hr = m_direct_input->CreateDevice(GUID_SysMouse,
									  &m_mouse_device,
									  NULL);

#else
    
	hr = m_direct_input->CreateDeviceEx(GUID_SysMouse,
										gsID_DIRECTINPUTDEVICE,
										(void **) &m_mouse_device,
										NULL);
#endif

	if (hr != DI_OK) {
		gsREPORT("gsCMouse::create couldn't create device");
		return false;
		}

	hr = m_mouse_device->SetDataFormat(&c_dfDIMouse);

	if (hr != DI_OK) {
		gsREPORT("gsCMouse::create couldn't set data format");
		return false;
		}

    hr = m_mouse_device->SetCooperativeLevel(gsCApplication::getWindow(),
											 DISCL_NONEXCLUSIVE | DISCL_FOREGROUND);

	if (hr != DI_OK) {
		gsREPORT("gsCMouse::create couldn't set co-op level");
		return false;
		}

    DIPROPDWORD dipdw;

    dipdw.diph.dwSize = sizeof(DIPROPDWORD);
    dipdw.diph.dwHeaderSize = sizeof(DIPROPHEADER);
    dipdw.diph.dwObj = 0;
    dipdw.diph.dwHow = DIPH_DEVICE;
    dipdw.dwData = DIPROPAXISMODE_ABS;

    hr = m_mouse_device->SetProperty(DIPROP_AXISMODE,&dipdw.diph);

	if (hr != DI_OK) {
		gsREPORT("gsCMouse::create couldn't set axis mode");
        return false;
		}

	m_active_inputs.addItem(this);

	gsREPORT("gsCMouse device created");

	return true;
}

//-------------------------------------------------------------

bool gsCMouse::destroy()
{
    if (m_mouse_device) {

		m_active_inputs.removeItem(this);

        m_mouse_device->Unacquire();
        m_mouse_device->Release();
        m_mouse_device = 0;

		gsREPORT("gsCMouse device destroyed");
		}

	return true;
}

//-------------------------------------------------------------

bool gsCMouse::acquire()
{
	if (!m_mouse_device) {
		gsREPORT("gsCMouse::acquire called with no mouse device");
		return false;
		}
	
	HRESULT hr;
	
	if (gsCApplication::isActive()) {
		hr = m_mouse_device->Acquire();

		if (hr != DI_OK) {
			gsREPORT("gsCMouse::acquire failed");
			return false;
			}
		}
	else {
		hr = m_mouse_device->Unacquire();

		if (hr != DI_OK) {
			gsREPORT("gsCMouse::acquire unacquire failed");
			return false;
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCMouse::update()
{
    if (m_mouse_device) {
        HRESULT hr = DIERR_INPUTLOST;

		DIMOUSESTATE m_mouse_state = { 0 };
		        
        while (hr == DIERR_INPUTLOST) {
            hr = m_mouse_device->GetDeviceState(sizeof(DIMOUSESTATE),&m_mouse_state);
            
			if (hr == DIERR_INPUTLOST) {
                hr = m_mouse_device->Acquire();
				if (hr != DI_OK) {
					gsREPORT("gsCMouse::update couldn't acquire device");
                    return false;
					}
				}
			}

		if (hr != DI_OK) {
			gsREPORT("gsCMouse::update couldn't get device state");
            return false;
			}

		m_position = gsCPoint(m_mouse_state.lX,m_mouse_state.lY);
		m_buttons[gsMOUSE_LEFT] = ((m_mouse_state.rgbButtons[0] & 0x80) != 0);
		m_buttons[gsMOUSE_RIGHT] = ((m_mouse_state.rgbButtons[1] & 0x80) != 0);
		m_buttons[gsMOUSE_MIDDLE] = ((m_mouse_state.rgbButtons[2] & 0x80) != 0);

		return true;
		}

	gsREPORT("gsCMouse::update called with no device created");
    
	return false;
}

//-------------------------------------------------------------

bool gsCMouse::isActive()
{
	return m_mouse_device != 0;
}

//-------------------------------------------------------------

gsCPoint gsCMouse::getPosition()
{
	return m_position;
}

//-------------------------------------------------------------

bool gsCMouse::testButton(gsMouseButton button)
{
	return m_buttons[button];
}

//-------------------------------------------------------------
