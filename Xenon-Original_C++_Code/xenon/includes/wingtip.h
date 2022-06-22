//-------------------------------------------------------------
//
// Class:	CWingtip
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CUpgrade
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_WINGTIP_H
#define _INCLUDE_WINGTIP_H

#include "upgrade.h"

//-------------------------------------------------------------

const int WINGTIP_FRAMES = 8;
const int WINGTIP_DIVE_OFFSET = 8;
const int WINGTIP_DIVE_FRAMES = 3;
const int WINGTIP_CLOAK_FRAME = 11;

//-------------------------------------------------------------

class CWingtip : public CUpgrade
{
	public:
		CWingtip();
		virtual ~CWingtip();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_WINGTIP]; };

		bool activate();

		bool update(Controls *controls);

};

//-------------------------------------------------------------

#endif
