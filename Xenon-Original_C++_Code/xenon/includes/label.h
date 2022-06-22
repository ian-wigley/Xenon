//-------------------------------------------------------------
//
// Class:	CLabel
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_LABEL_H
#define _INCLUDE_LABEL_H

#include "actor.h"

//-------------------------------------------------------------

const int LABEL_MAX_SIZE = 40;

//-------------------------------------------------------------

class CLabel : public CActor
{
	private:

		char m_text[LABEL_MAX_SIZE];
		float m_time;
		gsCPoint m_offset;

		static gsCFont *m_font;

	public:
		CLabel();
		virtual ~CLabel();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_LABEL]; };

		void onLeavingScreen();

		bool activate();

		bool update(Controls *controls);
		bool draw();

		void __cdecl setText(const char *format,...);
		void setTime(float seconds);

		static void setFont(gsCFont *font);
};

//-------------------------------------------------------------

#endif
