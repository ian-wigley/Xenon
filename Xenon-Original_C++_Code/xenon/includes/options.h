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

#ifndef _INCLUDE_OPTIONS_H
#define _INCLUDE_OPTIONS_H

//-------------------------------------------------------------

const float FRAME_RATE = 60.f;

//-------------------------------------------------------------

typedef enum {
	OPTION_DIFFICULTY,
	OPTION_HIRES,
	OPTION_WINDOWED,
	OPTION_COLOURDEPTH,
	OPTION_JOYSTICK,
	OPTION_MUSIC,
	OPTION_SOUNDFX,
	OPTION_PARTICLEFX,
	OPTION_BACKDROP,
	OPTION_DEBUGINFO,
	OPTION_CHEATS,
	OPTION_CONTROL1,
	OPTION_CONTROL2,

	TOTAL_OPTIONS
} OptionType;

//-------------------------------------------------------------

class COptions
{
	private:
		bool m_changed;
		bool m_reload;
		int m_options[TOTAL_OPTIONS];
		static int m_defaults[TOTAL_OPTIONS];

		gsCIniFile m_file;

	public:
		COptions();
		~COptions();

		void restoreDefaults();
		void restoreDefaultControls();

		void readOption(OptionType type,const char *section,const char *key);
		void setOption(OptionType type,int value);
		int getOption(OptionType type);
		void toggleOption(OptionType type);

		bool load(const char *filename);
		bool save(const char *filename);

		bool areChanged();
		bool requireReload();

		void changesNoted();
};

//-------------------------------------------------------------

extern COptions Options;

//-------------------------------------------------------------

#endif
