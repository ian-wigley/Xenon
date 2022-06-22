//-------------------------------------------------------------
//
// Class:	gsCRectangle
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
// Clip dest against this and adjust source as well

void gsCRect::clip(gsCRect& source,gsCRect& dest)
{
	if (dest.m_rect.left < m_rect.left) {
		source.m_rect.left += (m_rect.left - dest.m_rect.left);
		dest.m_rect.left = m_rect.left;
		}
	if (dest.m_rect.right > m_rect.right) {
		source.m_rect.right -= (dest.m_rect.right - m_rect.right);
		dest.m_rect.right = m_rect.right;
		}
	if (dest.m_rect.top < m_rect.top) {
		source.m_rect.top += (m_rect.top - dest.m_rect.top);
		dest.m_rect.top = m_rect.top;
		}
	if (dest.m_rect.bottom > m_rect.bottom) {
		source.m_rect.bottom -= (dest.m_rect.bottom - m_rect.bottom);
		dest.m_rect.bottom = m_rect.bottom;
		}
}

//-------------------------------------------------------------
