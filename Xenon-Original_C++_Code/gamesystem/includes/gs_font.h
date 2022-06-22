//-------------------------------------------------------------
//
// Class:	gsCFont
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCTiledImage
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_FONT_H
#define _INCLUDE_GS_FONT_H

#include "gs_types.h"
#include "gs_tiledimage.h"

//-------------------------------------------------------------

class gsCFont : public gsCTiledImage
{
	private:
		gsCPoint m_text_cursor;
		gsCColour m_tint;
		bool m_use_tint;

	public:
		gsCFont();
		virtual ~gsCFont();

		void setTextCursor(const gsCPoint& position);
		void enableTint(const gsCColour& colour);
		void disableTint();

		gsCPoint getTextCursor();

		gsCPoint getStringSize(const char *string);

		bool _cdecl printString(const char *format,...);
		bool _cdecl justifyString(const char *format,...);
};

//-------------------------------------------------------------

#endif
