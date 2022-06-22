//-------------------------------------------------------------
//
// Class:	gsCMenu
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

#ifndef _INCLUDE_GS_MENU_H
#define _INCLUDE_GS_MENU_H

#include "gs_object.h"
#include "gs_list.h"
#include "gs_point.h"
#include "gs_font.h"
#include "gs_menuitem.h"

//-------------------------------------------------------------

class gsCMenu : public gsCObject
{
	private:
		gsCList<gsCMenuItem *> m_item_list;

		gsCPoint m_position;
		gsCPoint m_spacing;

		gsCFont *m_font;

		int m_current_item;		// -1 = no item selected

		bool m_wrap;

		void destroy();

	public:
		gsCMenu();
		~gsCMenu();

		void clear();

		void setFont(gsCFont *font);
		void setPosition(const gsCPoint& position);
		void setSpacing(const gsCPoint& spacing);
		void setWrap(bool state);

		void addSelection(const char *name);
		void __cdecl addOptionList(const char *name,const char *option,...);
		void addSlider(const char *name,int size,int min,int max);
		void addSeperator(const char *name = 0);
		int getNumItems();

		void setCurrentItem(int item);
		int getCurrentItem();
		void scroll(int direction);

		bool setValue(int item,int value);
		int getValue(int item);
		const char *getName(int item);

		bool draw();
};

//-------------------------------------------------------------

#endif
