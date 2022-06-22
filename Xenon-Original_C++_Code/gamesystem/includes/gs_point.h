//-------------------------------------------------------------
//
// Class:	gsCPoint
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

#ifndef _INCLUDE_GS_POINT_H
#define _INCLUDE_GS_POINT_H

#include "gs_object.h"
#include "gs_vector.h"

//-------------------------------------------------------------
// Point

class gsCPoint : public gsCObject
{
	private:
		POINT m_point;

	public:
		gsCPoint();
		gsCPoint(int x,int y);
		gsCPoint(const gsCPoint& point);
		gsCPoint(const gsCVector& vector);
		~gsCPoint();

		int getX() const;
		int getY() const;

		void setX(int x);
		void setY(int y);

		gsCPoint operator - ();

		const gsCPoint& operator += (const gsCPoint& a);
		const gsCPoint& operator -= (const gsCPoint& a);

		friend gsCPoint operator + (const gsCPoint& a,const gsCPoint& b);
		friend gsCPoint operator - (const gsCPoint& a,const gsCPoint& b);
		friend gsCPoint operator * (const gsCPoint& a,const gsCPoint& b);
		friend gsCPoint operator / (const gsCPoint& a,const gsCPoint& b);

		friend gsCPoint operator * (int a,const gsCPoint& b);
		friend gsCPoint operator * (const gsCPoint& a,int b);
		friend gsCPoint operator / (const gsCPoint& a,int b);

		friend bool operator == (const gsCPoint& a,const gsCPoint& b);
		friend bool operator != (const gsCPoint& a,const gsCPoint& b);

		operator POINT() const;
		operator LPPOINT();
};

//-------------------------------------------------------------

inline gsCPoint::gsCPoint()
{
	m_point.x = m_point.y = 0;
}

//-------------------------------------------------------------

inline gsCPoint::gsCPoint(int x,int y)
{
	m_point.x = x;
	m_point.y = y;
}

//-------------------------------------------------------------

inline gsCPoint::gsCPoint(const gsCPoint& point)
{
	m_point.x = point.m_point.x;
	m_point.y = point.m_point.y;
}

//-------------------------------------------------------------

inline gsCPoint::gsCPoint(const gsCVector& vector)
{
	m_point.x = (int) vector.m_x;
	m_point.y = (int) vector.m_y;
}

//-------------------------------------------------------------

inline int gsCPoint::getX() const
{
	return m_point.x;
}

//-------------------------------------------------------------

inline int gsCPoint::getY() const
{
	return m_point.y;
}

//-------------------------------------------------------------

inline void gsCPoint::setX(int x)
{
	m_point.x = x;
}

//-------------------------------------------------------------

inline void gsCPoint::setY(int y)
{
	m_point.y = y;
}

//-------------------------------------------------------------

inline gsCPoint gsCPoint::operator - ()
{
	return gsCPoint(-m_point.x,-m_point.y);
}

//-------------------------------------------------------------

inline const gsCPoint& gsCPoint::operator += (const gsCPoint& a)
{
	m_point.x += a.m_point.x;
	m_point.y += a.m_point.y;

	return *this;
}

//-------------------------------------------------------------

inline const gsCPoint& gsCPoint::operator -= (const gsCPoint& a)
{
	m_point.x -= a.m_point.x;
	m_point.y -= a.m_point.y;

	return *this;
}

//-------------------------------------------------------------

inline gsCPoint operator + (const gsCPoint& a,const gsCPoint& b)
{
	return gsCPoint(a.m_point.x + b.m_point.x,a.m_point.y + b.m_point.y);
}

//-------------------------------------------------------------

inline gsCPoint operator - (const gsCPoint& a,const gsCPoint& b)
{
	return gsCPoint(a.m_point.x - b.m_point.x,a.m_point.y - b.m_point.y);
}

//-------------------------------------------------------------

inline gsCPoint operator * (const gsCPoint& a,const gsCPoint& b)
{
	return gsCPoint(a.m_point.x * b.m_point.x,a.m_point.y * b.m_point.y);
}

//-------------------------------------------------------------

inline gsCPoint operator / (const gsCPoint& a,const gsCPoint& b)
{
	return gsCPoint(a.m_point.x / b.m_point.x,a.m_point.y / b.m_point.y);
}

//-------------------------------------------------------------

inline gsCPoint operator * (int a,const gsCPoint& b)
{
	return gsCPoint(b.m_point.x * a,b.m_point.y * a);
}

//-------------------------------------------------------------

inline gsCPoint operator * (const gsCPoint& a,int b)
{
	return gsCPoint(a.m_point.x * b,a.m_point.y * b);
}

//-------------------------------------------------------------

inline gsCPoint operator / (const gsCPoint& a,int b)
{
	return gsCPoint(a.m_point.x / b,a.m_point.y / b);
}

//-------------------------------------------------------------

inline bool operator == (const gsCPoint& a,const gsCPoint& b)
{
	return (a.m_point.x == b.m_point.x) && (a.m_point.y == b.m_point.y);
}

//-------------------------------------------------------------

inline bool operator != (const gsCPoint& a,const gsCPoint& b)
{
	return (a.m_point.x != b.m_point.x) || (a.m_point.y == b.m_point.y);
}

//-------------------------------------------------------------

inline gsCPoint::operator POINT() const
{
	return m_point;
}

//-------------------------------------------------------------

inline gsCPoint::operator LPPOINT()
{
	return &m_point;
}

//-------------------------------------------------------------

inline gsCPoint::~gsCPoint()
{
}

//-------------------------------------------------------------

#endif
