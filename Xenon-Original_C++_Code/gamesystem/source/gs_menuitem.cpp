//-------------------------------------------------------------
//
// Class:	gsCMenuItem
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCObject
//
// Derived:	gsCMenuOption
//			gsCMenuSlider
//			gsCMenuSeperator
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------

gsCMenuItem::gsCMenuItem(const char *name)
{
	m_name = name;
	m_value = 0;
}

//-------------------------------------------------------------

gsCMenuItem::~gsCMenuItem()
{
}

//-------------------------------------------------------------

bool gsCMenuItem::setValue(int value)
{
	return false;
}

//-------------------------------------------------------------

int gsCMenuItem::getValue()
{
	return m_value;
}

//-------------------------------------------------------------

const char *gsCMenuItem::getName()
{
	return m_name;
}

//-------------------------------------------------------------

void gsCMenuItem::draw(gsCScreen *screen,gsCFont *font,int y,bool highlight)
{
	if (m_name) {
		if (highlight) {
			gsCPoint size = font->getStringSize(m_name);
			screen->drawSolidRect(gsCRect((screen->getSize().getX() - size.getX()) / 2 - 1,
										  y - 1,
										  (screen->getSize().getX() + size.getX()) / 2 + 1,
										  y + size.getY() + 1),
										  gsCColour(128,128,128));
			}

		font->setTextCursor(gsCPoint(0,y));
		font->justifyString(m_name);
		}
}

//-------------------------------------------------------------

gsCMenuOptionList::gsCMenuOptionList(const char *name)
	: gsCMenuItem(name)
{
}

//-------------------------------------------------------------

gsCMenuOptionList::~gsCMenuOptionList()
{
}

//-------------------------------------------------------------

bool gsCMenuOptionList::setValue(int value)
{
	if (value < 0 ||
		value >= m_options.getSize())
		return false;

	m_value = value;
	return true;
}

//-------------------------------------------------------------

void gsCMenuOptionList::addOption(const char *option)
{
	m_options.addItem(option);
}

//-------------------------------------------------------------

void gsCMenuOptionList::draw(gsCScreen *screen,gsCFont *font,int y,bool highlight)
{
	static char buffer[100];

	strcpy(buffer,m_name);
			
	if (m_options.getSize() > 0) {
		strcat(buffer," : ");
		strcat(buffer,m_options[m_value]);
		}

	if (highlight) {
		gsCPoint size = font->getStringSize(buffer);
		screen->drawSolidRect(gsCRect((screen->getSize().getX() - size.getX()) / 2 - 1,
									   y - 1,
									   (screen->getSize().getX() + size.getX()) / 2 + 1,
									   y + size.getY() + 1),
									   gsCColour(128,128,128));
		}

	font->setTextCursor(gsCPoint(0,y));
	font->justifyString(buffer);
}

//-------------------------------------------------------------

gsCMenuSlider::gsCMenuSlider(const char *name,int size,int min,int max)
	: gsCMenuItem(name)
{
	m_size = size;
	m_min = min;
	m_max = max;
}

//-------------------------------------------------------------

gsCMenuSlider::~gsCMenuSlider()
{
}

//-------------------------------------------------------------

bool gsCMenuSlider::setValue(int value)
{
	if (value < m_min ||
		value > m_max)
		return false;

	m_value = value;
	return true;
}

//-------------------------------------------------------------

void gsCMenuSlider::draw(gsCScreen *screen,gsCFont *font,int y,bool highlight)
{
	static char buffer[100];
	static char slider[2] = { 126,0 };
	static char control[2] = { 127,0 };

	strcpy(buffer,m_name);
			
	strcat(buffer," : ");
	for (int i = m_min; i <= m_max; i++) {
		if (m_value == i)
			strcat(buffer,control);
		else
			strcat(buffer,slider);
		}
	strcat(buffer," ");
	char val[10];
	sprintf(val,"%02i",m_value);
	strcat(buffer,val);

	if (highlight) {
		gsCPoint size = font->getStringSize(buffer);
		screen->drawSolidRect(gsCRect((screen->getSize().getX() - size.getX()) / 2 - 1,
									   y - 1,
									   (screen->getSize().getX() + size.getX()) / 2 + 1,
									   y + size.getY() + 1),
									   gsCColour(128,128,128));
		}

	font->setTextCursor(gsCPoint(0,y));
	font->justifyString(buffer);
}

//-------------------------------------------------------------

gsCMenuSeperator::gsCMenuSeperator(const char *name)
	: gsCMenuItem(name)
{
}

//-------------------------------------------------------------

gsCMenuSeperator::~gsCMenuSeperator()
{
}

//-------------------------------------------------------------
