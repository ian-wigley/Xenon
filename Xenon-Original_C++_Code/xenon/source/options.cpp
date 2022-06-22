//-------------------------------------------------------------
//
// Module:	COptions
//
// Author:	John M Phillips
//
// Started:	05/05/00
//
// Base:	None
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

int COptions::m_defaults[TOTAL_OPTIONS] = {
	0,					//OPTION_DIFFICULTY
	true,				//OPTION_HIRES
	true,				//OPTION_WINDOWED
	24,					//OPTION_COLOURDEPTH
	false,				//OPTION_JOYSTICK
	true,				//OPTION_MUSIC
	true,				//OPTION_SOUNDFX
	true,				//OPTION_PARTICLEFX
	true,				//OPTION_BACKDROP
	false,				//OPTION_DEBUGINFO
	false,				//OPTION_CHEATS
	KEYBOARD_LAYOUT_1,	//OPTION_CONTROL1
	KEYBOARD_LAYOUT_1	//OPTION_CONTROL2
};

//-------------------------------------------------------------

COptions Options;

//-------------------------------------------------------------

COptions::COptions()
{
	restoreDefaults();
	changesNoted();
}

//-------------------------------------------------------------

COptions::~COptions()
{
}

//-------------------------------------------------------------

void COptions::restoreDefaults()
{
	for (int i = 0; i < TOTAL_OPTIONS; i++)
		setOption((OptionType) i,m_defaults[i]);
}

//-------------------------------------------------------------

bool COptions::load(const char *filename)
{
	if (!m_file.open(filename))
		return false;

	readOption(OPTION_DIFFICULTY,	"Options","Difficulty");
	readOption(OPTION_HIRES,		"Options","Hires");
	readOption(OPTION_WINDOWED,		"Options","Windowed");
	readOption(OPTION_COLOURDEPTH,	"Options","ColourDepth");
	readOption(OPTION_JOYSTICK,		"Options","Joystick");
	readOption(OPTION_MUSIC,		"Options","Music");
	readOption(OPTION_SOUNDFX,		"Options","SoundFx");
	readOption(OPTION_PARTICLEFX,	"Options","ParticleFx");
	readOption(OPTION_BACKDROP,		"Options","Backdrop");
	readOption(OPTION_DEBUGINFO,	"Options","DebugInfo");
	readOption(OPTION_CHEATS,		"Options","Cheats");
	readOption(OPTION_CONTROL1,		"Options","Control1");
	readOption(OPTION_CONTROL2,		"Options","Control2");
	
	m_file.close();

	changesNoted();

	return true;
}

//-------------------------------------------------------------

bool COptions::save(const char *filename)
{
	if (!m_file.open(filename))
		return false;

	if (!m_file.writeInt("Options","Difficulty",	getOption(OPTION_DIFFICULTY)) ||
		!m_file.writeInt("Options","Hires",			getOption(OPTION_HIRES)) ||
		!m_file.writeInt("Options","Windowed",		getOption(OPTION_WINDOWED)) ||
		!m_file.writeInt("Options","ColourDepth",	getOption(OPTION_COLOURDEPTH)) ||
		!m_file.writeInt("Options","Joystick",		getOption(OPTION_JOYSTICK)) ||
		!m_file.writeInt("Options","Music",			getOption(OPTION_MUSIC)) ||
		!m_file.writeInt("Options","SoundFx",		getOption(OPTION_SOUNDFX)) ||
		!m_file.writeInt("Options","ParticleFx",	getOption(OPTION_PARTICLEFX)) ||
		!m_file.writeInt("Options","Backdrop",		getOption(OPTION_BACKDROP)) ||
		!m_file.writeInt("Options","DebugInfo",		getOption(OPTION_DEBUGINFO)) ||
		!m_file.writeInt("Options","Cheats",		getOption(OPTION_CHEATS)) ||

		!m_file.writeInt("Options","Control1",		getOption(OPTION_CONTROL1)) ||
		!m_file.writeInt("Options","Control2",		getOption(OPTION_CONTROL2))) {

		m_file.close();
		return false;
		}
	else {
		m_file.close();
		return true;
		}
}

//-------------------------------------------------------------

void COptions::readOption(OptionType type,const char *section,const char *key)
{
	setOption(type,m_file.readInt(section,key,m_defaults[type]));
}

//-------------------------------------------------------------

void COptions::setOption(OptionType type,int value)
{
	if (value != m_options[type]) {

		m_options[type] = value;
		m_changed = true;

		switch (type) {
			case OPTION_HIRES:
			case OPTION_COLOURDEPTH:
			case OPTION_WINDOWED:
				m_reload = true;
				break;
			case OPTION_SOUNDFX:
				if (value == 0)
					CGameState::stopSamples();
				break;
			case OPTION_MUSIC:
				if (value == 0)
					CGameState::stopMusic();
				break;
			}
		}
}

//-------------------------------------------------------------

int COptions::getOption(OptionType type)
{
	return m_options[type];
}

//-------------------------------------------------------------

void COptions::toggleOption(OptionType type)
{
	setOption(type,1 - getOption(type) & 1);
}

//-------------------------------------------------------------

bool COptions::areChanged()
{
	return m_changed;
}

//-------------------------------------------------------------

bool COptions::requireReload()
{
	return m_reload;
}

//-------------------------------------------------------------

void COptions::changesNoted()
{
	m_changed = false;
	m_reload = false;
}

//-------------------------------------------------------------
