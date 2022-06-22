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

#include "gamesystem.h"

//-------------------------------------------------------------

gsCIniFile::gsCIniFile()
{
	m_is_open = false;
}

//-------------------------------------------------------------

gsCIniFile::~gsCIniFile()
{
	if (isOpen())
		close();
}

//-------------------------------------------------------------

bool gsCIniFile::open(const char *filename)
{
	if (isOpen())
		close();

	gsCFile::getFullName(filename,m_fullname);

	m_is_open = true;

	return true;
}

//-------------------------------------------------------------

bool gsCIniFile::close()
{
	m_is_open = false;

	return true;
}

//-------------------------------------------------------------

bool gsCIniFile::isOpen()
{
	return m_is_open;
}

//-------------------------------------------------------------

int gsCIniFile::readInt(const char *section,const char *key,int default_value)
{
	if (!isOpen())
		return default_value;

	char temp[50];

	sprintf(temp,"%i",default_value);

	GetPrivateProfileString(section,key,temp,m_buffer,gsINIFILE_BUFFER_SIZE - 2,m_fullname);

	int value;

	if (sscanf(m_buffer,"%i",&value) == 1)
		return value;
	else
		return default_value;
}

//-------------------------------------------------------------

float gsCIniFile::readFloat(const char *section,const char *key,float default_value)
{
	if (!isOpen())
		return default_value;

	char temp[50];

	sprintf(temp,"%.2f",default_value);

	GetPrivateProfileString(section,key,temp,m_buffer,gsINIFILE_BUFFER_SIZE - 2,m_fullname);

	float value;

	if (sscanf(m_buffer,"%f",&value) == 1)
		return value;
	else
		return default_value;
}

//-------------------------------------------------------------

const char *gsCIniFile::readString(const char *section,const char *key,const char *default_value)
{
	if (!isOpen())
		return default_value;

//	int size =
	GetPrivateProfileString(section,key,default_value,m_buffer,gsINIFILE_BUFFER_SIZE - 2,m_fullname);

	return m_buffer;
}

//-------------------------------------------------------------

bool gsCIniFile::writeInt(const char *section,const char *key,int value)
{
	if (!isOpen())
		return false;

	char temp[50];

	sprintf(temp,"%i",value);

	return WritePrivateProfileString(section,key,temp,m_fullname) != 0;
}

//-------------------------------------------------------------

bool gsCIniFile::writeFloat(const char *section,const char *key,float value)
{
	if (!isOpen())
		return false;

	char temp[50];

	sprintf(temp,"%.2f",value);

	return WritePrivateProfileString(section,key,temp,m_fullname) != 0;
}
//-------------------------------------------------------------

bool gsCIniFile::writeString(const char *section,const char *key,const char *value)
{
	if (!isOpen())
		return false;

	return WritePrivateProfileString(section,key,value,m_fullname) != 0;
}

//-------------------------------------------------------------

