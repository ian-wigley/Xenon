//-------------------------------------------------------------
//
// Class:	gsCIniFile
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	CObject
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_INIFILE_H
#define _INCLUDE_GS_INIFILE_H

#include "gs_object.h"

//-------------------------------------------------------------

const int gsINIFILE_BUFFER_SIZE = 100;

//-------------------------------------------------------------

class gsCIniFile : public gsCObject
{
	private:
		char m_fullname[_MAX_PATH];
		bool m_is_open;
		char m_buffer[gsINIFILE_BUFFER_SIZE];

	public:

		gsCIniFile();
		~gsCIniFile();

		bool open(const char *filename);
		bool close();

		bool isOpen();

		int readInt(const char *section,const char *key,int default_value);
		float readFloat(const char *section,const char *key,float default_value);
		const char *readString(const char *section,const char *key,const char *default_value);

		bool writeInt(const char *section,const char *key,int value);
		bool writeFloat(const char *section,const char *key,float value);
		bool writeString(const char *section,const char *key,const char *value);
};

//-------------------------------------------------------------

#endif
