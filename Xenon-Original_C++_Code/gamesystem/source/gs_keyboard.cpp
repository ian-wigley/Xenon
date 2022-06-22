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

#include "gamesystem.h"

//-------------------------------------------------------------

gsLPDIRECTINPUTDEVICE gsCKeyboard::m_keyboard_device = 0;

//-------------------------------------------------------------

char gsCKeyboard::keycode_to_lower[gsKEYBOARD_KEYCODES] = {
	  0, 27,'1','2','3','4','5','6','7','8','9','0','-','=',  9,  8,
	'q','w','e','r','t','y','u','i','o','p','[',']', 13,  0,'a','s',
	'd','f','g','h','j','k','l',';','\'','`',  0,'\\','z','x','c','v',
	'b','n','m',',','.','/',	0,'*',  0,' ',  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,'7','8','9','-','4','5','6','+','1',
	'2','3','0','.',  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 13,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,'/',  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0
};

char gsCKeyboard::keycode_to_upper[gsKEYBOARD_KEYCODES] = {
	  0, 27,'!','"','£','$','%','^','&','*','(',')','_','+',  9,  8,
	'Q','W','E','R','T','Y','U','I','O','P','{','}', 13,  0,'A','S',
	'D','F','G','H','J','K','L',':','@','¬',  0,'|','Z','X','C','V',
	'B','N','M','<','>','?',  0,'*',  0,' ',  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,'7','8','9','-','4','5','6','+','1',
	'2','3','0','.',  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 13,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,'/',  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0
};

//-------------------------------------------------------------

const char *gsCKeyboard::keycode_description[gsKEYBOARD_KEYCODES] = {
	0,"Escape","1","2","3","4","5","6","7","8","9","0","-","=","Backspace","Tab",
	"Q","W","E","R","T","Y","U","I","O","P","(",")","Return","Left Control","A","S",
	"D","F","G","H","J","K","L",";","'","`","Left Shift","\\","Z","X","C","V",
	"B","N","M",",",".","/","Right Shift","Num pad *","Alt","Space","Caps Lock","F1","F2","F3","F4","F5",
	"F6","F7","F8","F9","F10","Num Lock","Scroll Lock","Num pad 7",
	"Num pad 8","Num pad 9","Num pad -","Num pad 4","Num pad 5","Num pad 6","Num pad +","Num pad 1",
	"Num pad 2","Num pad 3","Num pad 0","Num pad .","???","F11","F12",0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,"Enter","Right Control",0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,"/",0,"SysRq","Right Alt",0,0,0,0,0,0,0,
	0,0,0,0,0,"Pause",0,"Home","Up","Page Up","Left","Right",0,"End",
	"Down","Page Down","Insert","Delete",0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
};

//-------------------------------------------------------------

gsCKeyboard::gsCKeyboard()
{
	for (int i = 0; i < gsKEYBOARD_KEYCODES; i++) {
		m_previous_key_states[i] = 0;
		m_new_key_states[i] = 0;
		m_key_states[i] = 0;
		}

	flush();
}

//-------------------------------------------------------------

gsCKeyboard::~gsCKeyboard()
{
	destroy();
}

//-------------------------------------------------------------

void gsCKeyboard::flush()
{
	m_key_buffer.clear();
}

//-------------------------------------------------------------

bool gsCKeyboard::create()
{
	if (!m_direct_input) {
		gsREPORT("gsCKeyboard::create called with no direct input device");
		return false;
		}

	if (m_keyboard_device)
		return true;

	HRESULT hr;

#ifdef gsDIRECTX_NT_COMPATIBLE

	hr = m_direct_input->CreateDevice(GUID_SysKeyboard,
									  &m_keyboard_device,
									  NULL);

#else

	hr = m_direct_input->CreateDeviceEx(GUID_SysKeyboard,
										gsID_DIRECTINPUTDEVICE,
										(void **) &m_keyboard_device,
										NULL);
#endif

	if (hr != DI_OK) {
		gsREPORT("gsCKeyboard::create couldn't create device");
        return false;
		}
    
	hr = m_keyboard_device->SetDataFormat(&c_dfDIKeyboard);

	if (hr != DI_OK) {
		gsREPORT("gsCKeyboard::create couldn't set data format");
        return false;
		}

    hr = m_keyboard_device->SetCooperativeLevel(gsCApplication::getWindow(),
												DISCL_NONEXCLUSIVE | DISCL_FOREGROUND);

	if (hr != DI_OK) {
		gsREPORT("gsCKeyboard::create couldn't set co-op level");
        return false;
		}

	m_active_inputs.addItem(this);

	gsREPORT("gsCKeyboard device created");

	return true;
}

//-------------------------------------------------------------

bool gsCKeyboard::destroy()
{
    if (m_keyboard_device) {

		m_active_inputs.removeItem(this);
        
		m_keyboard_device->Unacquire();
        m_keyboard_device->Release();
        m_keyboard_device = 0;

		gsREPORT("gsCKeyboard device destroyed");
		}

	return true;
}

//-------------------------------------------------------------

bool gsCKeyboard::acquire()
{
	if (!m_keyboard_device) {
		gsREPORT("gsCKeyboard::acquire called with no keyboard device");
		return false;
		}
	
	HRESULT hr;
	
	if (gsCApplication::isActive()) {
		hr = m_keyboard_device->Acquire();

		if (hr != DI_OK) {
			gsREPORT("gsCKeyboard::acquire failed");
			return false;
			}
		}
	else {
		hr = m_keyboard_device->Unacquire();

		if (hr != DI_OK) {
			gsREPORT("gsCKeyboard::acquire unacquire failed");
			return false;
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCKeyboard::update()
{
	if (m_keyboard_device) {
        HRESULT hr = DIERR_INPUTLOST;

        memcpy(m_previous_key_states,m_new_key_states,gsKEYBOARD_KEYCODES);

		while (hr == DIERR_INPUTLOST) {
            hr = m_keyboard_device->GetDeviceState(gsKEYBOARD_KEYCODES,&m_new_key_states);
            
			if (hr == DIERR_INPUTLOST) {
				gsREPORT("gsCKeyboard::update input lost");
                hr = m_keyboard_device->Acquire();
                if (hr != DI_OK) {
					gsREPORT("gsCKeyboard::update couldn't acquire device");
                    return false;
					}
				}
			}

        if (hr != DI_OK) {
			gsREPORT("gsCKeyboard::update couldn't get device state");
			return false;
			}
        }

    for (int i = 0; i < gsKEYBOARD_KEYCODES; i++) {
		bool p = (m_previous_key_states[i] & 0x80) != 0;
		bool n = (m_new_key_states[i] & 0x80) != 0;
		m_key_states[i] = (gsUBYTE) ((n ? gsKEY_STATE : 0) |
									 ((n && !p) ? gsKEY_PRESSED : 0) |
									 ((!n && p) ? gsKEY_RELEASED : 0));

		if (n && !p && m_key_buffer.getSize() < gsKEYBOARD_BUFFER_SIZE) {
			m_key_buffer.addItem((gsKeyCode) i);
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCKeyboard::isActive()
{
	return m_keyboard_device != 0;
}

//-------------------------------------------------------------

bool gsCKeyboard::testKey(gsKeyCode keycode,gsKeyState state)
{
	if (m_keyboard_device)
		return (m_key_states[keycode] & state) != 0;
	else {
		gsREPORT("gsCKeyboard::testKey called with no keyboard device");
		return false;
		}
}

//-------------------------------------------------------------

gsKeyCode gsCKeyboard::getKey()
{
	gsKeyCode k = gsKEY_NONE;

	if (!m_key_buffer.isEmpty()) {
		k = m_key_buffer[0];
		m_key_buffer.removeIndex(0);
		}

	return k;
}

//-------------------------------------------------------------

char gsCKeyboard::keyCodeToAscii(gsKeyCode keycode)
{
	return keycode_to_lower[(int) keycode];
}

//-------------------------------------------------------------

const char *gsCKeyboard::keyCodeToDescription(gsKeyCode keycode)
{
	return keycode_description[keycode];
}

//-------------------------------------------------------------
