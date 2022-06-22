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

#include "gamesystem.h"

//-------------------------------------------------------------

int gsCJoystick::m_num_joysticks = 0;

gsLPDIRECTINPUTDEVICE gsCJoystick::m_joystick_device[gsJOYSTICK_MAX_STICKS] = { 0 };

DIDEVICEINSTANCE gsCJoystick::m_device_desc[gsJOYSTICK_MAX_STICKS];

gsCPoint gsCJoystick::m_previous_position[gsJOYSTICK_MAX_STICKS];
gsCPoint gsCJoystick::m_position[gsJOYSTICK_MAX_STICKS];
bool gsCJoystick::m_previous_buttons[gsJOYSTICK_MAX_STICKS][gsJOYSTICK_CODES];
bool gsCJoystick::m_buttons[gsJOYSTICK_MAX_STICKS][gsJOYSTICK_CODES];

gsJoystickCode gsCJoystick::m_code = gsJOY_NONE;

const char *gsCJoystick::joystickcode_description[gsJOYSTICK_CODES] = {
	"None",
	"Joystick Left",
	"Joystick Right",
	"Joystick Up",
	"Joystick Down",
	"Button 0",
	"Button 1",
	"Button 2",
	"Button 3",
	"Button 4",
	"Button 5",
	"Button 6",
	"Button 7",
};

//-------------------------------------------------------------

gsCJoystick::gsCJoystick()
{
	for (int i = 0; i < gsJOYSTICK_MAX_STICKS; i++) {
		m_previous_position[i] = gsCPoint(0,0);
		m_position[i] = gsCPoint(0,0);
		for (int j = 0; j < gsJOYSTICK_CODES; j++) {
			m_previous_buttons[i][j] = false;
			m_buttons[i][j] = false;
			}
		}
}

//-------------------------------------------------------------

gsCJoystick::~gsCJoystick()
{
	destroy();
}

//-------------------------------------------------------------

BOOL CALLBACK gsCJoystick::enumDevicesCallback(LPDIDEVICEINSTANCE lpddi,LPVOID pvRef)
{
	if (lpddi != NULL && (lpddi->dwDevType & 0x000F) == DIDEVTYPE_JOYSTICK) {
		if (m_num_joysticks == gsJOYSTICK_MAX_STICKS)
			return DIENUM_STOP;

		memcpy(&m_device_desc[m_num_joysticks],lpddi,lpddi->dwSize);
	
		m_num_joysticks++;
		}

	return DIENUM_CONTINUE;
}

//-------------------------------------------------------------

bool gsCJoystick::create()
{
#ifdef gsDIRECTX_NT_COMPATIBLE
	return false;
#else

	if (!m_direct_input) {
		gsREPORT("gsCJoystick::create called with no direct input device");
		return false;
		}

	if (m_joystick_device)
		return true;

	m_direct_input->EnumDevices(DIDEVTYPE_JOYSTICK,
								(LPDIENUMDEVICESCALLBACK) enumDevicesCallback,
								0,
								DIEDFL_ATTACHEDONLY);

	if (m_num_joysticks == 0)
		return false;

	for (int stick = 0; stick < m_num_joysticks; stick++) {

		HRESULT hr;

		LPDIRECTINPUTDEVICE dev;

		hr = m_direct_input->CreateDevice(m_device_desc[0].guidInstance,
										  &dev,
										  NULL);

		if (hr != DI_OK) {
			gsREPORT("gsCJoystick::create couldn't create device");
			return false;
			}

		hr = dev->QueryInterface(gsID_DIRECTINPUTDEVICE,(LPVOID *) &m_joystick_device[stick]);

		if (hr != DI_OK) {
			gsREPORT("gsCJoystick::create couldn't create device");
			return false;
			}

		dev->Release();

		hr = m_joystick_device[stick]->SetDataFormat(&c_dfDIJoystick);

		if (hr != DI_OK) {
			gsREPORT("gsCJoystick::create couldn't set data format");
			return false;
			}

		hr = m_joystick_device[stick]->SetCooperativeLevel(gsCApplication::getWindow(),
													DISCL_NONEXCLUSIVE | DISCL_FOREGROUND);

		if (hr != DI_OK) {
			gsREPORT("gsCJoystick::create couldn't set co-op level");
			return false;
			}

		DIPROPRANGE diprg;

		diprg.diph.dwSize = sizeof(diprg);
		diprg.diph.dwHeaderSize = sizeof(diprg.diph);
		diprg.diph.dwObj = DIJOFS_X;
		diprg.diph.dwHow = DIPH_BYOFFSET;
		diprg.lMin = -gsJOYSTICK_RANGE;
		diprg.lMax = gsJOYSTICK_RANGE;

		hr = m_joystick_device[stick]->SetProperty(DIPROP_RANGE,&diprg.diph);

		if (hr != DI_OK) {
			gsREPORT("gsCJoystick::create couldn't set X axis property");
			return false;
			}

		diprg.diph.dwSize = sizeof(diprg);
		diprg.diph.dwHeaderSize = sizeof(diprg.diph);
		diprg.diph.dwObj = DIJOFS_Y;
		diprg.diph.dwHow = DIPH_BYOFFSET;
		diprg.lMin = -gsJOYSTICK_RANGE;
		diprg.lMax = gsJOYSTICK_RANGE;

		hr = m_joystick_device[stick]->SetProperty(DIPROP_RANGE,&diprg.diph);

		if (hr != DI_OK) {
			gsREPORT("gsCJoystick::create couldn't set Y axis property");
			return false;
			}
		}

	m_active_inputs.addItem(this);

	m_code = gsJOY_NONE;

	gsREPORT("gsCJoystick device created");

	return true;

#endif
}

//-------------------------------------------------------------

bool gsCJoystick::destroy()
{
	for (int stick = 0; stick < m_num_joysticks; stick++) {
    
		if (m_joystick_device[stick]) {

			m_active_inputs.removeItem(this);
        
			m_joystick_device[stick]->Unacquire();
			m_joystick_device[stick]->Release();
			m_joystick_device[stick] = 0;

			gsREPORT("gsCJoystick device destroyed");
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCJoystick::acquire()
{
	for (int stick = 0; stick < m_num_joysticks; stick++) {

		if (!m_joystick_device[stick]) {
			gsREPORT("gsCJoystick::acquire called with no joystick device");
			return false;
			}
	
		HRESULT hr;
	
		if (gsCApplication::isActive()) {
			hr = m_joystick_device[stick]->Acquire();

			if (hr != DI_OK) {
				gsREPORT("gsCJoystick::acquire failed");
				return false;
				}
			}
		else {
			hr = m_joystick_device[stick]->Unacquire();

			if (hr != DI_OK) {
				gsREPORT("gsCJoystick::acquire unacquire failed");
				return false;
				}
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCJoystick::update()
{
#ifdef gsDIRECTX_NT_COMPATIBLE
	return false;
#else

	DIJOYSTATE joy_state;

	for (int stick = 0; stick < m_num_joysticks; stick++) {

		// save previous state
		// clear current state in case we lose the joystick

		m_previous_position[stick] = m_position[stick];
		m_position[stick] = gsCPoint(0,0);

		int i;

		for (i = 0; i < gsJOYSTICK_CODES; i++) {
			m_previous_buttons[stick][i] = m_buttons[stick][i];
			m_buttons[stick][i] = false;
			}

		if (m_joystick_device[stick]) {
			HRESULT hr = DIERR_INPUTLOST;

			while (hr == DIERR_INPUTLOST) {
				hr = m_joystick_device[stick]->Poll();

				if (hr != DIERR_INPUTLOST)
					hr = m_joystick_device[stick]->GetDeviceState(sizeof(joy_state),&joy_state);
            
				if (hr == DIERR_INPUTLOST) {
					gsREPORT("gsCJoystick::update input lost");
					hr = m_joystick_device[stick]->Acquire();
					if (hr != DI_OK) {
						gsREPORT("gsCJoystick::update couldn't acquire device");
						return false;
						}
					}
				}

			if (hr != DI_OK) {
				gsREPORT("gsCJoystick::update couldn't get device state");
				return false;
				}
			}

		if (joy_state.lX < -gsJOYSTICK_THRESHOLD) {
			m_buttons[stick][gsJOY_LEFT] = true;
			m_position[stick].setX(-1);
			}
		else if (joy_state.lX > gsJOYSTICK_THRESHOLD) {
			m_buttons[stick][gsJOY_RIGHT] = true;
			m_position[stick].setX(1);
			}

		if (joy_state.lY < -gsJOYSTICK_THRESHOLD) {
			m_buttons[stick][gsJOY_UP] = true;
			m_position[stick].setY(1);
			}
		else if (joy_state.lY > gsJOYSTICK_THRESHOLD) {
			m_buttons[stick][gsJOY_DOWN] = true;
			m_position[stick].setY(-1);
			}

		m_buttons[stick][gsJOY_BUTTON0] = (joy_state.rgbButtons[0] & 0x80) != 0;
		m_buttons[stick][gsJOY_BUTTON1] = (joy_state.rgbButtons[1] & 0x80) != 0;
		m_buttons[stick][gsJOY_BUTTON2] = (joy_state.rgbButtons[2] & 0x80) != 0;
		m_buttons[stick][gsJOY_BUTTON3] = (joy_state.rgbButtons[3] & 0x80) != 0;
		m_buttons[stick][gsJOY_BUTTON4] = (joy_state.rgbButtons[4] & 0x80) != 0;
		m_buttons[stick][gsJOY_BUTTON5] = (joy_state.rgbButtons[5] & 0x80) != 0;
		m_buttons[stick][gsJOY_BUTTON6] = (joy_state.rgbButtons[6] & 0x80) != 0;
		m_buttons[stick][gsJOY_BUTTON7] = (joy_state.rgbButtons[7] & 0x80) != 0;

		for (i = 0; i < gsJOYSTICK_MAX_BUTTONS; i++) {
			if (!m_previous_buttons[stick][i] && m_buttons[stick][i])
				m_code = (gsJoystickCode) ((int) gsJOY_BUTTON0 + i);
			}
		}

	return true;
#endif
}

//-------------------------------------------------------------

bool gsCJoystick::isActive()
{
	return m_joystick_device[0] != 0;
}

//-------------------------------------------------------------

int gsCJoystick::getNumSticks()
{
	if (m_joystick_device[0])
		return m_num_joysticks;
	else
		return 0;
}

//-------------------------------------------------------------

gsCPoint gsCJoystick::getPosition(int stick)
{
	if (stick >= 0 && stick < m_num_joysticks)
		return m_position[stick];
	else
		return gsCPoint(0,0);
}

//-------------------------------------------------------------

bool gsCJoystick::testButton(gsJoystickCode button,int stick)
{
	if (button != gsJOY_NONE && stick >= 0 && stick < m_num_joysticks)
		return m_buttons[stick][button];
	else
		return 0;
}

//-------------------------------------------------------------

bool gsCJoystick::testButtonPressed(gsJoystickCode button,int stick)
{
	if (button != gsJOY_NONE && stick >= 0 && stick < m_num_joysticks)
		return !m_previous_buttons[stick][button] && m_buttons[stick][button];
	else
		return 0;
}

//-------------------------------------------------------------

gsJoystickCode gsCJoystick::getEmulatedKey()
{
	gsJoystickCode code = m_code;
	m_code = gsJOY_NONE;
	return code;
}

//-------------------------------------------------------------

const char * gsCJoystick::joystickCodeToDescription(gsJoystickCode code)
{
	return joystickcode_description[code - gsJOY_NONE];
}

//-------------------------------------------------------------
