//-------------------------------------------------------------
//
// Class:	CAlien
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	CAsteroid
//
//-------------------------------------------------------------

#ifndef _INCLUDE_ALIEN_H
#define _INCLUDE_ALIEN_H

#include "actor.h"
#include "weapon.h"

//-------------------------------------------------------------

class CAlien : public CActor
{
	public:
		void onLeavingScreen();
};

//-------------------------------------------------------------

#endif

