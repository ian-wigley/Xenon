//-------------------------------------------------------------
//
// Class:	gsCFile
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

char gsCFile::m_directory_name[_MAX_PATH] = { 0 };

//-------------------------------------------------------------

gsCFile::gsCFile()
{
	m_handle = INVALID_HANDLE_VALUE;
	m_mode = gsFILE_READ;
}

//-------------------------------------------------------------

gsCFile::~gsCFile()
{
	close();
}

//-------------------------------------------------------------

bool gsCFile::setDirectory(const char *directory_name)
{
	strcpy(m_directory_name,directory_name);

	return true;
}

//-------------------------------------------------------------

bool gsCFile::getFullName(const char *filename,char *fullname)
{
	strcpy(fullname,m_directory_name);
	strcat(fullname,filename);

	return true;
}

//-------------------------------------------------------------

bool gsCFile::open(const char *filename,gsFileMode mode)
{
	close();

	if (!filename)
		return false;

	char fullname[_MAX_PATH];

	getFullName(filename,fullname);

	switch (mode) {
		case gsFILE_READ:
			m_handle = CreateFile(fullname,GENERIC_READ,0,NULL,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL,NULL);
			break;
		case gsFILE_WRITE:
			m_handle = CreateFile(fullname,GENERIC_WRITE,0,NULL,CREATE_ALWAYS,FILE_ATTRIBUTE_NORMAL,NULL);
			break;
		default:
			return false;
		}

	if (m_handle != INVALID_HANDLE_VALUE) {
		m_mode = mode;
		return true;
		}
	else
		return false;
}

//-------------------------------------------------------------

void gsCFile::close()
{
	if (m_handle != INVALID_HANDLE_VALUE)
		CloseHandle(m_handle);

	m_handle = INVALID_HANDLE_VALUE;
}

//-------------------------------------------------------------

bool gsCFile::isOpen()
{
	return m_handle != INVALID_HANDLE_VALUE;
}

//-------------------------------------------------------------

gsFileMode gsCFile::getMode()
{
	return m_mode;
}

//-------------------------------------------------------------

bool gsCFile::isEndOfFile()
{
	if (m_handle == INVALID_HANDLE_VALUE) {
		gsREPORT("gsCFile::isEndOfFile called with invalid handle");
		return true;
		}

	return getPosition() == getLength();
}

//-------------------------------------------------------------

gsUDWORD gsCFile::getLength()
{
	if (m_handle == INVALID_HANDLE_VALUE) {
		gsREPORT("gsCFile::getLength called with invalid handle");
		return 0;
		}

	gsUDWORD old_pos = SetFilePointer(m_handle,0,NULL,FILE_CURRENT);

	if (old_pos == 0xFFFFFFFF)
		return 0;

	gsUDWORD length = SetFilePointer(m_handle,0,NULL,FILE_END);

	if (length == 0xFFFFFFFF)
		return 0;

	SetFilePointer(m_handle,old_pos,NULL,FILE_BEGIN);

	return length;
}

//-------------------------------------------------------------

gsUDWORD gsCFile::getPosition()
{
	if (m_handle == INVALID_HANDLE_VALUE) {
		gsREPORT("gsCFile::getPosition called with invalid handle");
		return 0;
		}

	return SetFilePointer(m_handle,0,NULL,FILE_CURRENT);
}

//-------------------------------------------------------------

bool gsCFile::setPosition(gsUDWORD position)
{
	if (m_handle == INVALID_HANDLE_VALUE) {
		gsREPORT("gsCFile::setPosition with invalid handle");
		return false;
		}

	return SetFilePointer(m_handle,position,NULL,FILE_BEGIN) != 0xFFFFFFFF;
}

//-------------------------------------------------------------

gsUDWORD gsCFile::getByte()
{
	if (m_handle == INVALID_HANDLE_VALUE) {
		gsREPORT("gsCFile::getByte called with invalid handle");
		return gsFILE_READ_FAILED;
		}

   	char c;

	gsUDWORD bytes_read;

	if (ReadFile(m_handle,&c,1,&bytes_read,NULL))
		if (bytes_read == 1)
			return (gsUDWORD) c;
		else
			return gsFILE_READ_FAILED;
	else
		return gsFILE_READ_FAILED;
}

//-------------------------------------------------------------

bool gsCFile::putByte(gsUBYTE byte)
{
	if (m_handle == INVALID_HANDLE_VALUE) {
		gsREPORT("gsCFile::putByte called with invalid handle");
		return false;
		}

	gsUDWORD bytes_written;

	if (WriteFile(m_handle,&byte,1,&bytes_written,NULL))
		return bytes_written == 1;
	else
		return false;
}

//-------------------------------------------------------------

gsUDWORD gsCFile::read(void *buffer,gsUDWORD byte_count)
{
	if (m_handle == INVALID_HANDLE_VALUE) {
		gsREPORT("gsCFile::read called with invalid handle");
		return gsFILE_READ_FAILED;
		}

	gsUDWORD bytes_read;
		
	if (buffer == 0 ||
		byte_count <= 0)
		return 0;

	if (ReadFile(m_handle,buffer,byte_count,&bytes_read,NULL))
		return bytes_read;
	else
		return gsFILE_READ_FAILED;
}

//-------------------------------------------------------------

gsUDWORD gsCFile::write(void *buffer,gsUDWORD byte_count)
{
	if (m_handle == INVALID_HANDLE_VALUE) {
		gsREPORT("gsCFile::write called with invalid handle");
		return gsFILE_WRITE_FAILED;
		}

	gsUDWORD bytes_written;
	
	if (buffer == 0 ||
		byte_count == 0)
		return 0 ;

	if (WriteFile(m_handle,buffer,byte_count,&bytes_written,NULL))
		return bytes_written;
	else
		return gsFILE_WRITE_FAILED;
}

//-------------------------------------------------------------

static int find_path_num = 0;
static WIN32_FIND_DATA find_data;
static char find_search_string[_MAX_PATH];
static HANDLE find_handle = INVALID_HANDLE_VALUE;

//-------------------------------------------------------------
// Find file in current directory

const char *gsCFile::findFirst(const char *search_string)
{
	findClose();

	find_path_num = 0;
	strcpy(find_search_string,search_string);
	find_handle = INVALID_HANDLE_VALUE;

	return findNext();
}

//-------------------------------------------------------------

const char *gsCFile::findNext()
{
	if (find_handle == INVALID_HANDLE_VALUE) {
		char fullname[_MAX_PATH];
		strcpy(fullname,m_directory_name);
		strcat(fullname,find_search_string);
		find_handle = FindFirstFile(fullname,&find_data);
		if (find_handle != INVALID_HANDLE_VALUE)
			return find_data.cFileName;
		}
	else {
		if (FindNextFile(find_handle,&find_data))
			return find_data.cFileName;
		}

	findClose();

	return 0;
}

//-------------------------------------------------------------

void gsCFile::findClose()
{
	if (find_handle != INVALID_HANDLE_VALUE)
		FindClose(find_handle);

	find_handle = INVALID_HANDLE_VALUE;
}

//-------------------------------------------------------------

gsUDWORD gsCFile::readString(char *buffer,int max_length)
{
	if (m_handle == INVALID_HANDLE_VALUE) {
		gsREPORT("gsCFile::readString called with invalid handle");
		return gsFILE_READ_FAILED;
		}

	int i = 0;
   	char c;

	gsUDWORD bytes_read;

	while (i < max_length) {
		if (ReadFile(m_handle,&c,1,&bytes_read,NULL)) {
			if (bytes_read == 1) {
				buffer[i] = ((c == 10) ? 0 : c);
				i++;
				if (c == 10)
					return strlen(buffer);
				if (i >= max_length)
					return gsFILE_READ_FAILED;
				}
			else
				return gsFILE_READ_FAILED;
			}
		}

	return gsFILE_READ_FAILED;
}

//-------------------------------------------------------------

gsUDWORD __cdecl gsCFile::writeString(const char *format,...)
{
	if (m_handle == INVALID_HANDLE_VALUE) {
		gsREPORT("gsCFile::writeString called with invalid handle");
		return gsFILE_WRITE_FAILED;
		}

	va_list arglist;
	static char string[1000];

	va_start(arglist,format);
	vsprintf(string,format,arglist);
	va_end(arglist);

	gsUDWORD length = strlen(string);
	gsUDWORD bytes_written;
	
	if (string == 0 ||
		length == 0)
		return 0 ;

	if (WriteFile(m_handle,string,length,&bytes_written,NULL))
		return bytes_written;
	else
		return gsFILE_WRITE_FAILED;
}

//-------------------------------------------------------------

bool gsCFile::exists(const char *filename)
{
	gsCFile temp;

	if (!temp.open(filename))
		return false;

	temp.close();

	return true;
}

//-------------------------------------------------------------
