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

#include "gamesystem.h"

//-------------------------------------------------------------

gsCFrameCounter::gsCFrameCounter()
{
	void reset();
}

//-------------------------------------------------------------

gsCFrameCounter::~gsCFrameCounter()
{
}

//-------------------------------------------------------------

void gsCFrameCounter::reset()
{
	for (int i = 0; i < gsFRAMECOUNTER_SAMPLES; i++)
		m_samples[i] = 0.f;
	m_sample_index = 0;

	m_timer.start();
}

//-------------------------------------------------------------

void gsCFrameCounter::markFrame()
{
	m_samples[m_sample_index] = m_timer.getTime();
	m_sample_index = (m_sample_index + 1) % gsFRAMECOUNTER_SAMPLES;

	m_timer.start();
}

//-------------------------------------------------------------

float gsCFrameCounter::getFrameRate()
{
	float total_time = 0.f;

	int i = m_sample_index;

	for (int n = 0; n < gsFRAMECOUNTER_SAMPLES; n++) {
		if (--i < 0)
			i = gsFRAMECOUNTER_SAMPLES - 1;
		total_time += m_samples[i];
		}

	return (float) gsFRAMECOUNTER_SAMPLES / total_time;
}

//-------------------------------------------------------------
