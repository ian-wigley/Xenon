//-------------------------------------------------------------
//
// Class:	gsCScoreTable
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

#ifndef _INCLUDE_GS_SCORETABLE_H
#define _INCLUDE_GS_SCORETABLE_H

#include "gs_object.h"
#include "gs_list.h"

//-------------------------------------------------------------

const int gsSCORE_NAME_SIZE = 3;

//-------------------------------------------------------------

struct gsScoreItem
{
	int m_score;
	char m_name[gsSCORE_NAME_SIZE];
};

//-------------------------------------------------------------

class gsCScoreTable : public gsCObject
{
	private:
		gsCList<gsScoreItem *> m_score_list;

		gsCPoint m_position;
		gsCPoint m_spacing;
		gsCFont *m_font;

		int m_current_item;
		int m_current_letter;

		gsCTimer m_flash_timer;

		void destroy();

	public:
		gsCScoreTable();
		~gsCScoreTable();

		void setPosition(const gsCPoint& position);
		void setSpacing(const gsCPoint& spacing);
		void setFont(gsCFont *font);

		void setSize(int size);

		int insertScore(int score,const char *name);

		void setCurrentItem(int item);
		void setCurrentLetter(int letter);
		void cycleLetter(int dir);
		void scrollLetter(int dir);

		int getCurrentItem();

		int getScore(int index);
		const char *getName(int index);

		bool draw();
};

//-------------------------------------------------------------

#endif
