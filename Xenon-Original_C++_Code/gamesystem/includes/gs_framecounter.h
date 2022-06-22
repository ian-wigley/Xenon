//-------------------------------------------------------------
//
// Class:	gsCFrameCounter
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

#ifndef _INCLUDE_GS_FRAMECOUNTER_H
#define _INCLUDE_GS_FRAMECOUNTER_H

#include "gs_timer.h"

//-------------------------------------------------------------

const int gsFRAMECOUNTER_SAMPLES = 100;

//-------------------------------------------------------------

class gsCFrameCounter : public gsCObject
{
	private:
		gsCTimer m_timer;
		int m_sample_index;
		float m_samples[gsFRAMECOUNTER_SAMPLES];

	public:
		gsCFrameCounter();
		~gsCFrameCounter();

		void reset();
		void markFrame();

		float getFrameRate();
};

//-------------------------------------------------------------

#endif

