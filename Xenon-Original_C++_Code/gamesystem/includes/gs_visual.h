//-------------------------------------------------------------
//
// Class:	gsCVisual
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCObject
//
// Derived:	gsCScreen
//			gsCImage
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_VISUAL_H
#define _INCLUDE_GS_VISUAL_H

#include "gs_types.h"
#include "gs_object.h"
#include "gs_point.h"
#include "gs_list.h"

//-------------------------------------------------------------

class gsCVisual : public gsCObject
{
	private:
		static gsLPDIRECTDRAW m_dd;

	protected:
		static gsLPDIRECTDRAWOBJECT m_direct_draw;
		static gsCList<gsCVisual *> m_active_visuals;

	public:

		gsCVisual();
		virtual ~gsCVisual();

		static bool initialize();
		static bool shutdown();

		gsLPDIRECTDRAWSURFACE createSurface(const gsCPoint& size);
};

//-------------------------------------------------------------

#endif

