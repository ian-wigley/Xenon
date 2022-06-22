//-------------------------------------------------------------
//
// Class:	CPlayer
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	None
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_PLAYER_H
#define _INCLUDE_PLAYER_H

#include "gamesystem.h"

//-------------------------------------------------------------

const int INITIAL_LIVES = 3;
const int MAX_LIVES = 10;

//-------------------------------------------------------------

class CPlayer
{
	private:
		int m_lives;
		int m_score;
		bool m_has_dive_pickup;

		gsCVector m_checkpoint;

		static int m_extra_life_scores[];

	public:
		CPlayer();
		~CPlayer();

		int getScore();
		void scoreBonus(int bonus);

		int getLives();
		void extraLife();
		void loseLife();

		void diveBonus();
		bool hasDive();
		void useDive();

		void setCheckpoint(const gsCVector& checkpoint);
		gsCVector getCheckpoint();
};

//-------------------------------------------------------------

#endif
