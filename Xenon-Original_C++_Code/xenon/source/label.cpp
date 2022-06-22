//-------------------------------------------------------------
//
// Class:	CLabel
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

gsCFont *CLabel::m_font = 0;

//-------------------------------------------------------------

CLabel::CLabel()
{
	m_text[0] = 0;
	m_time = 0.f;
}

//-------------------------------------------------------------

CLabel::~CLabel()
{
//	CActor::~CActor();
}

//-------------------------------------------------------------

bool CLabel::activate()
{
	if (!isActive())
		m_timer.start();

	return CActor::activate();
}

//-------------------------------------------------------------

void CLabel::onLeavingScreen()
{
	kill();
}

//-------------------------------------------------------------

void __cdecl CLabel::setText(const char *format,...)
{
	va_list arglist;

	va_start(arglist,format);
	vsprintf(m_text,format,arglist);
	va_end(arglist);

	if (m_font)
		m_offset = m_font->getStringSize(m_text) / gsCPoint(-2,-2);
	else
		m_offset = gsCPoint(0,0);
}

//-------------------------------------------------------------

void CLabel::setTime(float seconds)
{
	m_time = seconds;
}

//-------------------------------------------------------------

void CLabel::setFont(gsCFont *font)
{
	m_font = font;
}

//-------------------------------------------------------------

bool CLabel::update(Controls *controls)
{
	if (m_timer.getTime() >= m_time) {
		kill();
		return true;
		}

	m_position += m_velocity;

	return true;
}

//-------------------------------------------------------------

bool CLabel::draw()
{
	if (m_font) {
		m_font->setTextCursor(gsCPoint(m_position) + m_offset + m_scene->getMap()->getPosition());
		m_font->printString(m_text);
		}

	return true;
}

//-------------------------------------------------------------

