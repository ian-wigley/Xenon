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

#include "gamesystem.h"

//-------------------------------------------------------------

gsCSoundSystem::gsCSoundSystem()
{
	m_active = false;
	m_current_music = 0;
}

//-------------------------------------------------------------

gsCSoundSystem::~gsCSoundSystem()
{
}

//-------------------------------------------------------------

bool gsCSoundSystem::create()
{
	if (!m_active) {
		if (BASS_GetVersion() != (MAKELONG(0,8))) {
			gsERROR("Wrong version of BASSMOD");
			return false;
			}

		if (!BASS_Init(-1,44100,BASS_DEVICE_NOSYNC,gsCApplication::getWindow())) {
			gsERROR("gsCSound::create can't initialize digital sound system");
			return false;
			}

		BASS_Start();

		gsREPORT("gsCSoundSystem created");

		m_active = true;
		}

	return true;
}

//-------------------------------------------------------------

bool gsCSoundSystem::destroy()
{
	if (m_active) {
		stopMusic();
		stopSamples();

		BASS_Stop();

		clearMusicList();
		clearSampleList();

		BASS_Free();

		gsREPORT("gsCSoundSystem destroyed");

		m_active = false;
		}

	return true;
}

//-------------------------------------------------------------

void gsCSoundSystem::clearMusicList()
{
	stopMusic();

	for (int i = 0; i < m_music_list.getSize(); i++)
		delete m_music_list[i];
	
	m_music_list.clear();
}

//-------------------------------------------------------------

int gsCSoundSystem::getNumberOfMusics()
{
	return m_music_list.getSize();
}

//-------------------------------------------------------------

bool gsCSoundSystem::addMusic(const char *filename)
{
	if (m_active) {
		gsCMusic *music = new gsCMusic;
		if (!music->load(filename)) {
			delete music;
			return false;
			}
		m_music_list.addItem(music);
		return true;
		}

	return false;
}

//-------------------------------------------------------------

bool gsCSoundSystem::playMusic(int index)
{
	if (m_active) {
		stopMusic();
		if (index >= 0 && index < m_music_list.getSize()) {
			gsCMusic *music = m_music_list[index];
			if (music && BASS_StreamPlay(music->getHandle(),TRUE,0)) {
				m_current_music = music;
				return true;
				}
			}
		}

	return false;
}

//-------------------------------------------------------------

void gsCSoundSystem::stopMusic()
{
	if (m_active && m_current_music) {
		BASS_ChannelStop(m_current_music->getHandle());
		m_current_music = 0;
		}
}

//-------------------------------------------------------------
// Note: if music turned off this returns false

bool gsCSoundSystem::isMusicFinished()
{
	if (m_active)
		return m_current_music && !BASS_ChannelIsActive(m_current_music->getHandle());
	else
		return false;
}

//-------------------------------------------------------------

void gsCSoundSystem::clearSampleList()
{
	stopSamples();

	for (int i = 0; i < m_sample_list.getSize(); i++)
		delete m_sample_list[i];
	
	m_sample_list.clear();
}

//-------------------------------------------------------------

int gsCSoundSystem::getNumberOfSamples()
{
	return m_sample_list.getSize();
}

//-------------------------------------------------------------

bool gsCSoundSystem::addSample(const char *filename)
{
	if (m_active) {
		gsCSample *sample = new gsCSample;
		if (!sample->load(filename)) {
			delete sample;
			return false;
			}
		m_sample_list.addItem(sample);
		return true;
		}

	return false;
}

//-------------------------------------------------------------

bool gsCSoundSystem::playSample(int index,int panning)
{
	if (m_active) {
		if (index >= 0 && index < m_sample_list.getSize()) {
			if (panning < -100)
				panning = -100;
			if (panning > 100)
				panning = 100;

			gsCSample *sample = m_sample_list[index];
			if (sample && BASS_SamplePlayEx(sample->getHandle(),0,-1,50,panning,false))
				return true;
			}
		}

	return false;
}

//-------------------------------------------------------------

void gsCSoundSystem::stopSamples()
{
	for (int i = 0; i < m_sample_list.getSize(); i++)
		BASS_SampleStop(m_sample_list[i]->getHandle());
}

//-------------------------------------------------------------

bool gsCSoundSystem::isActive()
{
	return m_active;
}

//-------------------------------------------------------------

void gsCSoundSystem::setVolume(int music_percent,int sample_percent)
{
	if (m_active)
		BASS_SetGlobalVolumes(0,sample_percent,music_percent);
}

//-------------------------------------------------------------
