//-------------------------------------------------------------
//
// Class:	gsCColour
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

#ifndef _INCLUDE_GS_COLOUR_H
#define _INCLUDE_GS_COLOUR_H

#include "gs_types.h"
#include "gs_object.h"
#include "gs_screen.h"

//-------------------------------------------------------------
// Some useful colour constants

#define gsBLACK		  0,  0,  0
#define gsRED		255,  0,  0
#define gsGREEN		  0,255,  0
#define gsBLUE		  0,  0,255
#define gsMAGENTA	255,  0,255
#define gsCYAN		  0,255,255
#define gsYELLOW	255,255,  0
#define gsWHITE		255,255,255
#define gsORANGE	255,128,  0
#define gsPINK		255,255,128
#define gsBROWN		128, 64,  0
#define gsDARKGREY	 64, 64, 64
#define gsMIDGREY	128,128,128
#define gsLIGHTGREY	192,192,192

//-------------------------------------------------------------
// Colour

class gsCColour : public gsCObject
{
	friend class gsCImage;
	friend class gsCScreen;

	private:
		gsUBYTE m_r;
		gsUBYTE m_g;
		gsUBYTE m_b;
		gsUDWORD m_raw;

		static PALETTEENTRY *m_palette;
		static int m_rshift;
		static int m_gshift;
		static int m_bshift;
		static int m_rbits;
		static int m_gbits;
		static int m_bbits;
		static int m_rmask;
		static int m_bmask;
		static int m_gmask;

		void updateRawColour();

	protected:

		static void setupColourConversion(gsCScreen *screen);

	public:
		gsCColour();
		gsCColour(int r,int g,int b);
		gsCColour(const gsCColour& colour);
		virtual ~gsCColour();

		void setRed(int r);
		void setGreen(int g);
		void setBlue(int b);

		int getRed() const;
		int getGreen() const;
		int getBlue() const;

		gsUDWORD getRaw() const;
};

//-------------------------------------------------------------

inline void gsCColour::setRed(int r)
{
	m_r = (gsUBYTE) r;
	updateRawColour();
}

//-------------------------------------------------------------

inline void gsCColour::setGreen(int g)
{
	m_g = (gsUBYTE) g;
	updateRawColour();
}

//-------------------------------------------------------------

inline void gsCColour::setBlue(int b)
{
	m_b = (gsUBYTE) b;
	updateRawColour();
}

//-------------------------------------------------------------

inline int gsCColour::getRed() const
{
	return m_r;
}

//-------------------------------------------------------------

inline int gsCColour::getGreen() const
{
	return m_g;
}

//-------------------------------------------------------------

inline int gsCColour::getBlue() const
{
	return m_b;
}

//-------------------------------------------------------------

inline gsUDWORD gsCColour::getRaw() const
{
	return m_raw;
}

//-------------------------------------------------------------

#endif
