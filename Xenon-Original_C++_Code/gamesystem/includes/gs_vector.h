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

#ifndef _INCLUDE_GS_VECTOR_H
#define _INCLUDE_GS_VECTOR_H

#include "gs_object.h"
#include "gs_maths.h"
#include "gs_error.h"

class gsCPoint;

//-------------------------------------------------------------
// 2d Vector Class

class gsCVector : public gsCObject
{
	friend class gsCPoint;
	
	private:
		float m_x;
		float m_y;

	public:
		gsCVector();
		gsCVector(float x,float y);
		gsCVector(const gsCVector& vector);
		~gsCVector();

		float getX() const;
		float getY() const;

		void setX(float x);
		void setY(float y);

		static gsCVector polar(float distance,float angle);

		gsCVector operator - ();

		const gsCVector& operator += (const gsCVector& a);
		const gsCVector& operator -= (const gsCVector& a);

		friend gsCVector operator + (const gsCVector& a,const gsCVector& b);
		friend gsCVector operator - (const gsCVector& a,const gsCVector& b);
		friend gsCVector operator * (const gsCVector& a,const gsCVector& b);
		friend gsCVector operator * (const gsCVector& a,float b);
		friend gsCVector operator * (float a,const gsCVector& b);
		friend gsCVector interpolate(const gsCVector& a,const gsCVector& b,float t);

		friend bool operator == (const gsCVector& a,const gsCVector& b);
		friend bool operator != (const gsCVector& a,const gsCVector& b);

		float length();
		float direction();
		void normalize();

		void clamp(float minx,float maxx,float miny,float maxy);
};

//-------------------------------------------------------------

inline gsCVector::gsCVector()
{
	m_x = m_y = 0.f;
}

//-------------------------------------------------------------

inline gsCVector::gsCVector(float x,float y)
{
	m_x = x;
	m_y = y;
}

//-------------------------------------------------------------

inline gsCVector::gsCVector(const gsCVector& vector)
{
	m_x = vector.m_x;
	m_y = vector.m_y;
}

//-------------------------------------------------------------

inline float gsCVector::getX() const
{
	return m_x;
}

//-------------------------------------------------------------

inline float gsCVector::getY() const
{
	return m_y;
}

//-------------------------------------------------------------

inline void gsCVector::setX(float x)
{
	m_x = x;
}

//-------------------------------------------------------------

inline void gsCVector::setY(float y)
{
	m_y = y;
}

//-------------------------------------------------------------

inline gsCVector gsCVector::operator - ()
{
	return gsCVector(-m_x,-m_y);
}

//-------------------------------------------------------------

inline const gsCVector& gsCVector::operator += (const gsCVector& a)
{
	m_x += a.m_x;
	m_y += a.m_y;

	return *this;
}

//-------------------------------------------------------------

inline const gsCVector& gsCVector::operator -= (const gsCVector& a)
{
	m_x -= a.m_x;
	m_y -= a.m_y;

	return *this;
}

//-------------------------------------------------------------

inline gsCVector operator + (const gsCVector& a,const gsCVector& b)
{
	return gsCVector(a.m_x + b.m_x,a.m_y + b.m_y);
}

//-------------------------------------------------------------

inline gsCVector operator - (const gsCVector& a,const gsCVector& b)
{
	return gsCVector(a.m_x - b.m_x,a.m_y - b.m_y);
}

//-------------------------------------------------------------

inline gsCVector operator * (const gsCVector& a,const gsCVector& b)
{
	return gsCVector(a.m_x * b.m_x,a.m_y * b.m_y);
}

//-------------------------------------------------------------

inline gsCVector operator * (const gsCVector& a,float b)
{
	return gsCVector(a.m_x * b,a.m_y * b);
}

//-------------------------------------------------------------

inline gsCVector operator * (float a,const gsCVector& b)
{
	return gsCVector(a * b.m_x,a * b.m_y);
}

//-------------------------------------------------------------

inline gsCVector interpolate(const gsCVector& a,const gsCVector& b,float t)
{
	return gsCVector(a.m_x + (b.m_x - a.m_x) * t,
					 a.m_y + (b.m_y - a.m_y) * t);
}

//-------------------------------------------------------------

inline bool operator == (const gsCVector& a,const gsCVector& b)
{
	return (a.m_x == b.m_x) && (a.m_y == b.m_y);
}

//-------------------------------------------------------------

inline bool operator != (const gsCVector& a,const gsCVector& b)
{
	return (a.m_x != b.m_x) || (a.m_y != b.m_y);
}

//-------------------------------------------------------------

inline float gsCVector::length()
{
	return gsSquareRoot(m_x * m_x + m_y * m_y);
}

//-------------------------------------------------------------

inline float gsCVector::direction()
{
	return gsArcTan(m_x,-m_y);
}

//-------------------------------------------------------------

inline void gsCVector::normalize()
{
	float len = length();

	if (len > 0.f) {
		m_x /= len;
		m_y /= len;
		}
}

//-------------------------------------------------------------

inline gsCVector::~gsCVector()
{
}

//-------------------------------------------------------------

#endif
