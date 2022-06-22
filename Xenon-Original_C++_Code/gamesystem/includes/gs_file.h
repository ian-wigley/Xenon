//-------------------------------------------------------------
//
// Class:	gsCFile
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

#ifndef _INCLUDE_GS_FILE_H
#define _INCLUDE_GS_FILE_H

#include "gs_types.h"
#include "gs_object.h"

//-------------------------------------------------------------
// File Access Mode

typedef enum {
	gsFILE_READ,					// read from an existing file
	gsFILE_WRITE,					// write to a new file
} gsFileMode;

//-------------------------------------------------------------
// Error codes

const gsUDWORD gsFILE_READ_FAILED = 0xFFFFFFFF;
const gsUDWORD gsFILE_WRITE_FAILED = 0xFFFFFFFF;

//-------------------------------------------------------------

class gsCFile : public gsCObject
{
	private:
		HANDLE m_handle;
		gsFileMode m_mode;

		static char m_directory_name[_MAX_PATH];

	public:
		gsCFile();
		virtual ~gsCFile();

		static bool setDirectory(const char *directory_name);
		static bool getFullName(const char *filename,char *fullname);
		static const char *findFirst(const char *search_string);
		static const char *findNext();
		static void findClose();
		static bool exists(const char *filename);

		bool open(const char *filename,gsFileMode mode = gsFILE_READ);
		void close();

		bool isOpen();
		gsFileMode getMode();
		bool isEndOfFile();

		gsUDWORD getLength();
		gsUDWORD getPosition();
		bool setPosition(gsUDWORD position);

		gsUDWORD getByte();
		bool putByte(gsUBYTE byte);

		gsUDWORD read(void *buffer,gsUDWORD byte_count);
		gsUDWORD write(void *buffer,gsUDWORD byte_count);

		gsUDWORD readString(char *buffer,int max_length);
		gsUDWORD __cdecl writeString(const char *format,...);
};

//-------------------------------------------------------------

#endif
