//-------------------------------------------------------------
//
// Class:	gsCFont
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCVisual
//
// Derived:	None
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------

gsCFont::gsCFont()
{
	m_text_cursor = gsCPoint(0,0);
	m_use_tint = false;
}

//-------------------------------------------------------------

gsCFont::~gsCFont()
{
}

//-------------------------------------------------------------

void gsCFont::setTextCursor(const gsCPoint& position)
{
	m_text_cursor = position;
}

//-------------------------------------------------------------

void gsCFont::enableTint(const gsCColour& colour)
{
	m_tint = colour;
	m_use_tint = true;
}

//-------------------------------------------------------------

void gsCFont::disableTint()
{
	m_use_tint = false;
}

//-------------------------------------------------------------

gsCPoint gsCFont::getTextCursor()
{
	return m_text_cursor;
}

//-------------------------------------------------------------

gsCPoint gsCFont::getStringSize(const char *string)
{
	return gsCPoint(strlen(string) * m_tile_size.getX(),m_tile_size.getY());
}

//-------------------------------------------------------------

bool _cdecl gsCFont::printString(const char *format,...)
{
	va_list arglist;
	static char message[1000];

	va_start(arglist,format);
	vsprintf(message,format,arglist);
	va_end(arglist);

	int length = strlen(message);

	if (length == 0)
		return false;

	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen)
		return false;

	gsCRect extents(m_text_cursor,m_text_cursor + m_tile_size * gsCPoint(length,1));

	gsCRect screen_rect = screen->getRect();
	
	if (screen_rect.contains(extents)) {
		char *str = message;
		while (length-- > 0) {
			gsUBYTE c = *str++;
			if (c >= 0x20 && c <= 0x7F) {
				c -= 0x20;
				if (c < m_num_tiles) {
					if (m_use_tint)
						drawTinted(c,m_text_cursor,m_tint);
					else
						drawFast(c,m_text_cursor);
					m_text_cursor += gsCPoint(m_tile_size.getX(),0);
					}
				}
			}
		}
	else {
		char *str = message;
		while (length-- > 0) {
			gsUBYTE c = *str++;
			if (c >= 0x20 && c <= 0x7F) {
				c -= 0x20;
				if (c < m_num_tiles) {
					if (m_use_tint)
						drawTinted(c,m_text_cursor,m_tint);
					else
						draw(c,m_text_cursor);
					m_text_cursor += gsCPoint(m_tile_size.getX(),0);
					}
				}
			}
		}

	return true;
}

//-------------------------------------------------------------

bool _cdecl gsCFont::justifyString(const char *format,...)
{
	va_list arglist;
	static char message[1000];

	va_start(arglist,format);
	vsprintf(message,format,arglist);
	va_end(arglist);

	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen)
		return false;

	gsCPoint size = getStringSize(message);

	int old_x = m_text_cursor.getX();

	m_text_cursor.setX((screen->getSize().getX() - size.getX()) / 2);

	printString(message);

	m_text_cursor.setX(old_x);

	return true;
}

//-------------------------------------------------------------

