//-------------------------------------------------------------
//
// Class:	gsCStarfield
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCVisual
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_STARFIELD_H
#define _INCLUDE_GS_STARFIELD_H

#include "gs_point.h"
#include "gs_colour.h"

//-------------------------------------------------------------

class gsCStarfield : public gsCObject
{
	private:
		int m_position;
		int m_layers;
		gsCPoint *m_point;
		gsCColour *m_colour;
		int *m_layer;
		int *m_offset;
		int m_width;
		int m_height;

		void create();
		void destroy();

	public:
		gsCStarfield();
		~gsCStarfield();

		void initialize(int layers);
		void setPosition(int y);
		int getPosition();

		void move(int offset);

		void draw();
};

//-------------------------------------------------------------

#endif
