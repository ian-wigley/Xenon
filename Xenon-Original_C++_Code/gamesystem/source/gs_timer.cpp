//-------------------------------------------------------------
//
// Class:	gsCTimer
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCObject
//
// Derived:	None
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------

__int64 gsCTimer::m_freq;
__int64 gsCTimer::m_time0;

float gsCTimer::m_previous_time = 0.f;
float gsCTimer::m_system_time = 0.f;

float gsCTimer::m_fake_time = 0.f;

//-------------------------------------------------------------
// Constructor

gsCTimer::gsCTimer()
{
	m_base_time = 0.f;
	m_state = gsTIMER_RESET;
}

//-------------------------------------------------------------
// Destructor

gsCTimer::~gsCTimer()
{
}

//-------------------------------------------------------------

void gsCTimer::initialize()
{
	QueryPerformanceFrequency((LARGE_INTEGER*) &m_freq);
	QueryPerformanceCounter((LARGE_INTEGER*) &m_time0);

	float t = getCurrentTime();

	m_system_time = t;
	m_previous_time = t;
}

//-------------------------------------------------------------
// Update internal copy of system time
//
// Call once per game loop

void gsCTimer::update(bool frame_done)
{
	if (!frame_done)
		m_previous_time = m_system_time;

	m_system_time = getCurrentTime();
}

//-------------------------------------------------------------
// Reset timer

void gsCTimer::reset()
{
	m_state = gsTIMER_RESET;
}

//-------------------------------------------------------------
// Start timer

void gsCTimer::start()
{
	m_base_time = m_system_time;
	m_state = gsTIMER_ACTIVE;
}

//-------------------------------------------------------------
// Pause timer

void gsCTimer::pause()
{
	m_base_time = m_system_time;
	m_state = gsTIMER_PAUSED;
}

//-------------------------------------------------------------
// Unpause timer
//
// Notes:	Reported time continues from the time value when
//			the timer was paused

void gsCTimer::unpause()
{
	m_base_time = m_system_time - m_base_time;
	m_state = gsTIMER_ACTIVE;
}

//-------------------------------------------------------------
// Get the current state of the timer
//
// Returns:	One of the following states:
//				gsTIMER_RESET
//				gsTIMER_ACTIVE
//				gsTIMER_PAUSED

gsTimerState gsCTimer::getState()
{
	return m_state;
}

//-------------------------------------------------------------
// Get current time 
//
// Returns:	Current time in seconds since timer was started

float gsCTimer::getTime()
{
	switch (m_state) {
		case gsTIMER_ACTIVE:
			return m_system_time - m_base_time;
		case gsTIMER_PAUSED:
			return m_base_time;
		default:
			return 0.f;
		}
}

//-------------------------------------------------------------
// Get delta time (between current and previous frame)

float gsCTimer::getDeltaTime()
{
	return m_system_time - m_previous_time;
}

//-------------------------------------------------------------
// Get current time

float gsCTimer::getCurrentTime()
{
	__int64 t;

	QueryPerformanceCounter((LARGE_INTEGER*) &t);
	t -= m_time0;

	return float(double(t) / double(m_freq));
}

//-------------------------------------------------------------
