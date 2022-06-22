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

#ifndef _INCLUDE_GS_APPLICATION_H
#define _INCLUDE_GS_APPLICATION_H

#include "gs_object.h"
#include "gs_rect.h"
#include "gs_screen.h"
#include "gs_image.h"
#include "gs_tiledimage.h"
#include "gs_colour.h"
#include "gs_framecounter.h"
#include "gs_timer.h"

//-------------------------------------------------------------

const float gsFRAME_RATE = 60.f;

//-------------------------------------------------------------

class gsCApplication : public gsCObject
{
	friend class gsCScreen;
	
	private:
		static const char *m_app_name;

		static HINSTANCE m_instance;
		static HWND m_window;
		static bool m_isActive;
		static bool m_isReady;
		static bool m_running;
		static bool m_isWindowed;
		static bool m_isPaused;
		static gsCPoint m_default_size;

		static LRESULT CALLBACK windowProc(HWND hWnd,UINT msg,WPARAM wParam,LPARAM lParam);

		static gsCFrameCounter m_frame_counter;
		static float m_last_time_stamp;

		static gsCApplication *m_app;

		static bool m_restarting;

	protected:
		
		static gsCScreen *m_screen;				// currently active screen object
		
	public:

		gsCApplication(const char *app_name = 0);
		virtual ~gsCApplication();

		static HINSTANCE _cdecl getInstance();
		static HWND _cdecl getWindow();

		static bool isActive();
		static bool isReady();
		static bool isWindowed();
		static bool isPaused();

		static gsCApplication *getApp();
		static gsCScreen *getScreen();
		
		int run(HINSTANCE hInstance,HINSTANCE hPrevInstance,LPSTR lpCmdLine,int nCmdShow);

		virtual bool initialize();
		virtual bool mainloop();
		virtual bool shutdown();

		float getFrameRate();

		static void requestRestart();

		static void setPaused(bool state);
};

//-------------------------------------------------------------
// Get application instance handle

inline HINSTANCE _cdecl gsCApplication::getInstance()
{
	return m_instance;
}

//-------------------------------------------------------------
// Get window handle

inline HWND _cdecl gsCApplication::getWindow()
{
	return m_window;
}

//-------------------------------------------------------------
// Get currently active application

inline gsCApplication *gsCApplication::getApp()
{
	return m_app;
}

//-------------------------------------------------------------
// Get currently active screen

inline gsCScreen *gsCApplication::getScreen()
{
	return m_screen;
}

//-------------------------------------------------------------
// Test if application is active

inline bool gsCApplication::isActive()
{
	return m_isActive;
}

//-------------------------------------------------------------
// Test if application is ready

inline bool gsCApplication::isReady()
{
	return m_isReady;
}

//-------------------------------------------------------------
// Test if application is running in a window

inline bool gsCApplication::isWindowed()
{
	return m_isWindowed;
}

//-------------------------------------------------------------
// Get current frame rate

inline float gsCApplication::getFrameRate()
{
	return m_frame_counter.getFrameRate();
}

//-------------------------------------------------------------
// Request a complete restart of the application
//
// Note: required e.g. if changing screen mode / colour depth etc

inline void gsCApplication::requestRestart()
{
	m_restarting = true;
}

//-------------------------------------------------------------

inline bool gsCApplication::isPaused()
{
	return m_isPaused;
}

//-------------------------------------------------------------

inline void gsCApplication::setPaused(bool state)
{
	m_isPaused = state;
}

//-------------------------------------------------------------

#endif

