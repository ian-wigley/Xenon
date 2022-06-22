//-------------------------------------------------------------
//
// Class:	gsCApplication
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

//-------------------------------------------------------------
// Static variables

const char *gsCApplication::m_app_name = "GameSystem";

HINSTANCE	gsCApplication::m_instance = 0;
HWND		gsCApplication::m_window = 0;
bool		gsCApplication::m_isActive = false;
bool		gsCApplication::m_isReady = false;
bool		gsCApplication::m_running = false;
bool		gsCApplication::m_isWindowed = false;
bool		gsCApplication::m_isPaused = false;

gsCPoint	gsCApplication::m_default_size(640,480);

gsCScreen  *gsCApplication::m_screen = 0;
gsCApplication *gsCApplication::m_app = 0;

gsCFrameCounter gsCApplication::m_frame_counter;
float		gsCApplication::m_last_time_stamp = 0;

bool		gsCApplication::m_restarting = false;

//-------------------------------------------------------------
// Constructor

gsCApplication::gsCApplication(const char *app_name)
{
	if (app_name)
		m_app_name = app_name;

	// currently active application

	m_app = this;
}

//-------------------------------------------------------------
// Destructor

gsCApplication::~gsCApplication()
{
	// remove currently active application

	m_app = 0;
}

//-------------------------------------------------------------
// Window procedure

LRESULT CALLBACK gsCApplication::windowProc(HWND hWnd,UINT msg,WPARAM wParam,LPARAM lParam)
{
	switch (msg) {
        case WM_ACTIVATEAPP:

            // pause if minimized or not the top window
        	
			m_isActive = (wParam == WA_ACTIVE) || (wParam == WA_CLICKACTIVE);
            return 0L;
        
		case WM_DESTROY:

			// stop game running to force exit

			m_running = false;
            return 0L;

#ifdef gsESCAPE_TO_EXIT

		case WM_KEYUP:
            
			// pressing Esc closes program
			
			switch (wParam) {
				case VK_ESCAPE:
					PostMessage(hWnd,WM_CLOSE,0,0);
					return 0L;
				}
			break;

#endif
				
		case WM_MOVE:
            
			// update window rectangle if moved
            
			if (m_isActive && m_isReady && m_isWindowed) {
				if (m_screen)
					m_screen->updateRect(hWnd);
				}
            break;

        case WM_PAINT:
            
			// update the screen if we need to refresh
            
			if (m_isWindowed && m_isReady) {
				if (m_screen)
					m_screen->flip();
				}
            break;
        
		case WM_SETCURSOR:

            // display the cursor in the window if windowed

//			if (m_isActive && m_isReady && !m_isWindowed) {
                SetCursor(NULL);
                return TRUE;
//				}
//          break;
        
		case WM_SIZE:
            
			// check to see if we are losing our window
            
			switch (wParam) {
				case SIZE_MAXHIDE:
				case SIZE_MINIMIZED:
					m_isActive = false;
				default:
					m_isActive = true;
					break;
				}
			}

    // call default window procedure

	return DefWindowProc(hWnd,msg,wParam,lParam);
}

//-------------------------------------------------------------
// Run application

int gsCApplication::run(HINSTANCE hInstance,HINSTANCE hPrevInstance,LPSTR lpCmdLine,int nCmdShow)
{
    MSG msg;
	msg.wParam = 0;
	WNDCLASS wc;
	
	do {

		m_isWindowed = true;

		// save instance handle

		m_instance = hInstance;

		// create window class

		wc.lpszClassName = m_app_name;
		wc.style = CS_HREDRAW | CS_VREDRAW;
		wc.lpfnWndProc = windowProc;
		wc.cbClsExtra = 0;
		wc.cbWndExtra = 0;
		wc.hInstance = m_instance;
		wc.hIcon = 0;
		wc.hCursor = LoadCursor(0, IDC_ARROW);
		wc.hbrBackground = (HBRUSH)GetStockObject(BLACK_BRUSH);
		wc.lpszMenuName = 0;

		// register window class

		RegisterClass(&wc);

	    // create the main window

		m_window = CreateWindowEx(
			0,
			m_app_name,
			m_app_name,
			WS_VISIBLE, // | WS_SYSMENU,
			CW_USEDEFAULT,
			CW_USEDEFAULT,
			m_default_size.getX(),
			m_default_size.getY(),
			NULL,
			NULL,
			m_instance,
			NULL);

		// fail if no window created

		if(m_window == NULL)
			return 0;

	    // set the window style

	/*	DWORD dwStyle = GetWindowLong(m_window,GWL_STYLE);
		dwStyle &= ~WS_POPUP;
		dwStyle |= 0; //WS_OVERLAPPED | WS_CAPTION | WS_THICKFRAME | WS_MINIMIZEBOX;
		SetWindowLong(m_window, GWL_STYLE, dwStyle);
	*/
	    // calculate window size for required client area size

		gsCRect rc(gsCPoint(0,0),m_default_size);
		
		AdjustWindowRectEx(LPRECT(rc),
						   GetWindowLong(m_window,GWL_STYLE),
						   FALSE,
						   GetWindowLong(m_window,GWL_EXSTYLE));

	    // resize window

		SetWindowPos(m_window,
					 NULL,
					 0,0,
					 rc.getWidth(),rc.getHeight(),
					 SWP_NOMOVE | SWP_NOZORDER | SWP_NOACTIVATE);

		SetWindowPos(m_window,
					 HWND_NOTOPMOST,
					 0,0,
					 0,0,
					 SWP_NOSIZE | SWP_NOMOVE | SWP_NOACTIVATE);

		ShowWindow(m_window,nCmdShow);
	    UpdateWindow(m_window);

	//# Save the window size/pos for switching modes
	//#	GetWindowRect(m_window,&m_window_rect);
	
	// initialize game

		m_restarting = false;

		if (initialize()) {
			
			m_isReady = true;

			// acquire any required inputs

			gsCInput::acquireAll();

			// setup frame counter

			m_frame_counter.reset();

			// main message pump

			m_running = true;

			m_last_time_stamp = gsCTimer::getCurrentTime();

			while (m_running) {

				// process windows messages

				if (PeekMessage(&msg,NULL,0,0,PM_NOREMOVE)) {
					if (!GetMessage(&msg,NULL,0,0)) {
						m_running = false;
						}
					else {
						TranslateMessage(&msg);
						DispatchMessage(&msg);
						}
					}
				else {

					if (m_isActive && m_isReady) {

						// wait for at least (1/FRAME_RATE) seconds since last frame

						float end_time = m_last_time_stamp + 1.f / gsFRAME_RATE;

						float t;

						for (;;) {
							t = gsCTimer::getCurrentTime();
							if (t >= end_time)
								break;
							}

						m_last_time_stamp = t;

						// update system time (used by all timers) unless paused

						if (!m_isPaused)
							gsCTimer::update(false);

						// mark start of frame for frame counter

						m_frame_counter.markFrame();

						// update any required inputs

						gsCInput::updateAll();

						// execute main game loop - returns false when game over

						if (!mainloop())
							m_running = false;
						}
					}
				}
			}

		// shutdown game

		shutdown();

		// clear up window and window class

		DestroyWindow(m_window);

		UnregisterClass(m_app_name,m_instance);

		// if we're restarting we'll do it all again
		}
	while (m_restarting);

	return msg.wParam;
}

//-------------------------------------------------------------
// Default initialize

bool gsCApplication::initialize()
{
	// create input handler

	if (!gsCInput::initialize())
		return false;

	// create visual handler

	if (!gsCVisual::initialize())
		return false;

	gsCTimer::initialize();

	return true;
}

//-------------------------------------------------------------
// Default main loop - does nothing

bool gsCApplication::mainloop()
{
	return true;
}

//-------------------------------------------------------------
// Default shutdown

bool gsCApplication::shutdown()
{
	// destroy visual handler

	gsCVisual::shutdown();

	// destroy input handler

	gsCInput::shutdown();

	return true;
}

//-------------------------------------------------------------
