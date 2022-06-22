//-------------------------------------------------------------
//
// Class:	CBoss
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	CBossEye
//			CBossMouth
//			CBossControl
//
//-------------------------------------------------------------

#ifndef _INCLUDE_BOSS_H
#define _INCLUDE_BOSS_H

#include "actor.h"

//-------------------------------------------------------------

const int BOSS_EYES_TOTAL = 6;

//-------------------------------------------------------------

class CBossMouth;

//-------------------------------------------------------------

class CBoss : public CActor
{
	protected:
		static int m_active_eyes;

		static CBossMouth *m_mouth;
		
	public:
		CBoss();
		~CBoss();

		static int getShield();
};

//-------------------------------------------------------------

#endif

