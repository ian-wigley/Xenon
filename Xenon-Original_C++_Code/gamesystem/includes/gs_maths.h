//-------------------------------------------------------------
//
// File:	Maths functions
//
// Author:	John M Phillips
//
// Started:	13/05/00
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_MATHS_H
#define _INCLUDE_GS_MATHS_H

#include <math.h>

//-------------------------------------------------------------
// Maths constants

const float gsPI = 3.141592654f;

//-------------------------------------------------------------
// Radian to Degree conversion

inline float gsRad2Deg(float angle)
{
	return angle * (180.f / gsPI);
}

//-------------------------------------------------------------
// Degree to radian conversion

inline float gsDeg2Rad(float angle)
{
	return angle * (gsPI / 180.f);
}

//-------------------------------------------------------------
// Trig functions (using angles in degrees)

inline float gsSin(float angle)
{
	return (float) sin((double) gsDeg2Rad(angle));
}

//-------------------------------------------------------------

inline float gsCos(float angle)
{
	return (float) cos((double) gsDeg2Rad(angle));
}

//-------------------------------------------------------------

inline float gsArcTan(float y,float x)
{
	return gsRad2Deg((float) atan2((double) y,(double) x));
}

//-------------------------------------------------------------

inline float gsAbs(float v)
{
	return v >= 0.f ? v : -v;
}

//-------------------------------------------------------------

inline float gsSquareRoot(float a)
{
	return (float) sqrt((double) a);
}

//-------------------------------------------------------------

#endif

