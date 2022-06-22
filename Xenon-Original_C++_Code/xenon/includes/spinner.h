//-------------------------------------------------------------
//
// Class:	CSpinner
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CBullet
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_SPINNER_H
#define _INCLUDE_SPINNER_H

#include "bullet.h"

//-------------------------------------------------------------

const int SPINNER_FRAMES = 8;

//-------------------------------------------------------------

class CSpinner : public CBullet
{
	public:
		CSpinner();
		virtual ~CSpinner();
		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_SPINNER]; };

		bool activate();

		bool update(Controls *controls);
};

//-------------------------------------------------------------

#endif
