//-------------------------------------------------------------
//
// Module:	CDemoRecorder
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

#ifndef _INCLUDE_DEMORECORDER_H
#define _INCLUDE_DEMORECORDER_H

//-------------------------------------------------------------

class CDemoRecorder
{
	private:
		gsCList<Controls *> m_event_list;
		int m_event_index;

		bool m_has_level;
		char m_level[_MAX_PATH];

		void destroy();

	public:
		CDemoRecorder();
		~CDemoRecorder();

		bool load(const char *filename);
		bool save();

		void record();
		void setLevel(const char *filename);
		bool addEvent(const Controls& controls);
		
		void playback();
		const char *getLevel();
		bool getEvent(Controls& controls);
};
				
//-------------------------------------------------------------

#endif
