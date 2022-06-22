//-------------------------------------------------------------
//
// Class:	gsCVector
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

gsCVector gsCVector::polar(float distance,float angle)
{
	return gsCVector(distance * gsSin(angle),
					 distance * -gsCos(angle));
}

//-------------------------------------------------------------

void gsCVector::clamp(float minx,float maxx,float miny,float maxy)
{
	if (m_x < minx)
		m_x = minx;
	if (m_x > maxx)
		m_x = maxx;
	if (m_y < miny)
		m_y = miny;
	if (m_y > maxy)
		m_y = maxy;
}

//-------------------------------------------------------------

