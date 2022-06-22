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

#ifndef _INCLUDE_GS_TIMER_H
#define _INCLUDE_GS_TIMER_H

//-------------------------------------------------------------
// Valid timer states

typedef enum {
	gsTIMER_RESET,
	gsTIMER_ACTIVE,
	gsTIMER_PAUSED
} gsTimerState;

//-------------------------------------------------------------
// Timer Class

class gsCTimer : public gsCObject
{
	private:
		float m_base_time;
		gsTimerState m_state;

		static __int64 m_freq;
		static __int64 m_time0;

		static float m_previous_time;
		static float m_system_time;

		static float m_fake_time;

	public:
		gsCTimer();
		virtual ~gsCTimer();

		static void initialize();

		static void update(bool frame_done);

		void reset();
		void start();
		void pause();
		void unpause();

		gsTimerState getState();
		float getTime();

		static float getDeltaTime();

		static float getCurrentTime();
};

//-------------------------------------------------------------

#endif
