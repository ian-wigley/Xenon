//-------------------------------------------------------------
//
// Program:	Demo 3 Header File
//
// Author:	John M Phillips
//
// Started:	20/08/00
//
//-------------------------------------------------------------

#ifndef _INCLUDE_DEMO3_H
#define _INCLUDE_DEMO3_H

#include "gamesystem.h"
#include "level.h"

//-------------------------------------------------------------

class CDemo3 : public gsCApplication
{
	private:
		gsCKeyboard m_keyboard;
		gsCScreen m_screen;

		CLevel m_level;
		int	m_ship_y;

		gsCStarfield m_stars;

	protected:

		bool createLevel();
		void destroyLevel();

		void drawLevel();
		void moveLevel();

		void setLayerPositions(int ship_y);

	public:

		CDemo3(const char *app_name) : gsCApplication(app_name) { };
		~CDemo3() { };

		bool initialize();
		bool mainloop();
		bool shutdown();
};

//-------------------------------------------------------------

#endif

