//-------------------------------------------------------------
//
// Program:	Demo 1 Header File
//
// Author:	John M Phillips
//
// Started:	20/08/00
//
//-------------------------------------------------------------

#ifndef _INCLUDE_DEMO1_H
#define _INCLUDE_DEMO1_H

#include "gamesystem.h"

//-------------------------------------------------------------

class CDemo1 : public gsCApplication
{
	private:
		gsCKeyboard m_keyboard;
		gsCScreen m_screen;
		gsCTiledImage m_image;
		gsCList<gsCSprite *> m_sprite;
		gsCStarfield m_stars;

	protected:

		bool createSprites();
		bool destroySprites();

		void drawSprites();
		void moveSprites();

	public:

		CDemo1(const char *app_name) : gsCApplication(app_name) { };
		~CDemo1() { };

		bool initialize();
		bool mainloop();
		bool shutdown();
};

//-------------------------------------------------------------

#endif

