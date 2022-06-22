//-------------------------------------------------------------
//
// Class:	gsCRect
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

#ifndef _INCLUDE_GS_RECT_H
#define _INCLUDE_GS_RECT_H

#include "gs_point.h"

//-------------------------------------------------------------
// gsCRect

class gsCRect : public gsCObject
{
	private:
		RECT m_rect;

	public:
		gsCRect();
		gsCRect(int left,int top,int right,int bottom);
		gsCRect(const gsCPoint& a,const gsCPoint& b);
		gsCRect(const gsCRect& r);
		gsCRect(const RECT& r);
		~gsCRect();

		int getLeft() const;
		int getTop() const;
		int getRight() const;
		int getBottom() const;

		void setLeft(int l);
		void setTop(int t);
		void setRight(int r);
		void setBottom(int b);

		gsCPoint getTopLeft() const;
		gsCPoint getBottomRight() const;
		gsCPoint getTopRight() const;
		gsCPoint getBottomLeft() const;

		void setTopLeft(const gsCPoint& p);
		void setBottomRight(const gsCPoint& p);

		gsCPoint getSize() const;
		int getWidth() const;
		int getHeight() const;

		bool contains(const gsCPoint& point);
		bool contains(const gsCRect& rect);
		bool overlaps(const gsCRect& rect);
		void clip(gsCRect& rect);
		void clip(gsCRect& source,gsCRect& dest);
		bool isEmpty() const;

		void move(const gsCPoint& offset);

		const gsCRect& operator = (const gsCRect& a);

		operator RECT() const;
		operator LPRECT();

		void expand(int amount);
};

//-------------------------------------------------------------

inline gsCRect::gsCRect()
{
	m_rect.left = 0;
	m_rect.top = 0;
	m_rect.right = 0;
	m_rect.bottom = 0;
}

//-------------------------------------------------------------

inline gsCRect::gsCRect(int left,int top,int right,int bottom)
{
	m_rect.left = left;
	m_rect.top = top;
	m_rect.right = right;
	m_rect.bottom = bottom;
}

//-------------------------------------------------------------

inline gsCRect::gsCRect(const gsCPoint& a,const gsCPoint& b)
{
	m_rect.left = a.getX();
	m_rect.top = a.getY();
	m_rect.right = b.getX();
	m_rect.bottom = b.getY();
}

//-------------------------------------------------------------

inline gsCRect::gsCRect(const gsCRect& r)
{
	m_rect.left = r.m_rect.left;
	m_rect.top = r.m_rect.top;
	m_rect.right = r.m_rect.right;
	m_rect.bottom = r.m_rect.bottom;
}

//-------------------------------------------------------------

inline gsCRect::gsCRect(const RECT& r)
{
	m_rect = r;
}

//-------------------------------------------------------------

inline int gsCRect::getLeft() const
{
	return m_rect.left;
}

//-------------------------------------------------------------

inline int gsCRect::getTop() const
{
	return m_rect.top;
}

//-------------------------------------------------------------

inline int gsCRect::getRight() const
{
	return m_rect.right;
}

//-------------------------------------------------------------

inline int gsCRect::getBottom() const
{
	return m_rect.bottom;
}

//-------------------------------------------------------------

inline void gsCRect::setLeft(int l)
{
	m_rect.left = l;
}

//-------------------------------------------------------------

inline void gsCRect::setTop(int t)
{
	m_rect.top = t;
}

//-------------------------------------------------------------

inline void gsCRect::setRight(int r)
{
	m_rect.right = r;
}

//-------------------------------------------------------------

inline void gsCRect::setBottom(int b)
{
	m_rect.bottom = b;
}

//-------------------------------------------------------------

inline gsCPoint gsCRect::getTopLeft() const
{
	return gsCPoint(m_rect.left,m_rect.top);
}

//-------------------------------------------------------------

inline gsCPoint gsCRect::getBottomRight() const
{
	return gsCPoint(m_rect.right,m_rect.bottom);
}

//-------------------------------------------------------------

inline gsCPoint gsCRect::getTopRight() const
{
	return gsCPoint(m_rect.right,m_rect.top);
}

//-------------------------------------------------------------

inline gsCPoint gsCRect::getBottomLeft() const
{
	return gsCPoint(m_rect.left,m_rect.bottom);
}

//-------------------------------------------------------------

inline void gsCRect::setTopLeft(const gsCPoint& p)
{
	m_rect.left = p.getX();
	m_rect.top = p.getY();
}

//-------------------------------------------------------------

inline void gsCRect::setBottomRight(const gsCPoint& p)
{
	m_rect.right = p.getX();
	m_rect.bottom = p.getY();
}

//-------------------------------------------------------------

inline gsCRect::~gsCRect()
{
}

//-------------------------------------------------------------

inline gsCPoint gsCRect::getSize() const
{
	return gsCPoint(m_rect.right - m_rect.left,
					m_rect.bottom - m_rect.top);
}

//-------------------------------------------------------------

inline int gsCRect::getWidth() const
{
	return m_rect.right - m_rect.left;
}

//-------------------------------------------------------------

inline int gsCRect::getHeight() const
{
	return m_rect.bottom - m_rect.top;
}

//-------------------------------------------------------------

inline bool gsCRect::isEmpty() const
{
	return (m_rect.left >= m_rect.right) || (m_rect.top >= m_rect.bottom);
}

//-------------------------------------------------------------

inline const gsCRect& gsCRect::operator = (const gsCRect& a)
{
	memcpy(&m_rect,&a.m_rect,sizeof(m_rect));
	return *this;
}

//-------------------------------------------------------------

inline gsCRect::operator RECT() const
{
	return m_rect;
}

//-------------------------------------------------------------

inline gsCRect::operator LPRECT()
{
	return &m_rect;
}

//-------------------------------------------------------------

inline void gsCRect::move(const gsCPoint& offset)
{
	m_rect.left += offset.getX();
	m_rect.top += offset.getY();
	m_rect.right += offset.getX();
	m_rect.bottom += offset.getY();
}

//-------------------------------------------------------------

inline bool gsCRect::contains(const gsCPoint& point)
{
	return (point.getX() >= m_rect.left &&
			point.getX() < m_rect.right &&
			point.getY() >= m_rect.top &&
			point.getY() < m_rect.bottom);
}

//-------------------------------------------------------------

inline bool gsCRect::contains(const gsCRect& rect)
{
	return (rect.m_rect.left >= m_rect.left &&
			rect.m_rect.right <= m_rect.right &&
			rect.m_rect.top >= m_rect.top &&
			rect.m_rect.bottom <= m_rect.bottom);
}

//-------------------------------------------------------------

inline bool gsCRect::overlaps(const gsCRect& rect)
{
	return (m_rect.left < rect.m_rect.right &&
			m_rect.right > rect.m_rect.left &&
			m_rect.top < rect.m_rect.bottom &&
			m_rect.bottom > rect.m_rect.top);
}

//-------------------------------------------------------------
// Clip rect against this

inline void gsCRect::clip(gsCRect& rect)
{
	if (rect.m_rect.left < m_rect.left)
		rect.m_rect.left = m_rect.left;
	if (rect.m_rect.right > m_rect.right)
		rect.m_rect.right = m_rect.right;
	if (rect.m_rect.top < m_rect.top)
		rect.m_rect.top = m_rect.top;
	if (rect.m_rect.bottom > m_rect.bottom)
		rect.m_rect.bottom = m_rect.bottom;
}

//-------------------------------------------------------------
// Expand/shrink

inline void gsCRect::expand(int amount)
{
	m_rect.left -= amount;
	m_rect.top -= amount;
	m_rect.right += amount;
	m_rect.bottom += amount;
}

//-------------------------------------------------------------

#endif
