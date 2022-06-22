//-------------------------------------------------------------
//
// Class:	CBossEye
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CBoss
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_BOSSEYE_H
#define _INCLUDE_BOSSEYE_H

#include "boss.h"

//-------------------------------------------------------------

const int BOSSEYE_TOTAL = 6;

typedef enum {
	BOSSEYE_OPEN,
	BOSSEYE_CLOSING,
	BOSSEYE_SHUT
} BossEyeState;

//-------------------------------------------------------------

class CBossEye : public CBoss
{
	private:
		int m_eye_number;
		
		static BossEyeState m_state;

	public:
		CBossEye();
		virtual ~CBossEye();

		const ActorInfo& getActorInfo() { return ActorInfoList[INFO_BOSSEYE]; };

		bool activate();
		void kill();

		bool update(Controls *controls);

		void registerHit(int energy,CActor *hitter);

		void setEyeNumber(int eye_number);

		static void setState(BossEyeState state);
};

//-------------------------------------------------------------

#endif
