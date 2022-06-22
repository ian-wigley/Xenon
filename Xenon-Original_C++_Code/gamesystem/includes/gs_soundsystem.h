//-------------------------------------------------------------
//
// Class:	gsCSoundSystem
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

#ifndef _INCLUDE_GS_SOUNDSYSTEM_H
#define _INCLUDE_GS_SOUNDSYSTEM_H

#include "gs_list.h"
#include "gs_sample.h"
#include "gs_music.h"

//-------------------------------------------------------------

class gsCSoundSystem : public gsCObject
{
	private:
		bool m_active;
		gsCList<gsCSample *> m_sample_list;
		gsCList<gsCMusic *> m_music_list;

		gsCMusic *m_current_music;

	public:
		gsCSoundSystem();
		~gsCSoundSystem();

		bool create();
		bool destroy();

		bool isActive();

		void clearMusicList();
		bool addMusic(const char *filename);
		int getNumberOfMusics();
		bool playMusic(int index);
		void stopMusic();
		bool isMusicFinished();

		void clearSampleList();
		bool addSample(const char *filename);
		int getNumberOfSamples();
		bool playSample(int index,int panning = 0);
		void stopSamples();

		void setVolume(int music_percent,int sample_percent);
};

//-------------------------------------------------------------

#endif
