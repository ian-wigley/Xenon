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

#include "game.h"

//-------------------------------------------------------------

int CPlayer::m_extra_life_scores[] = {
	 5000000,
	10000000,
	15000000,
	20000000,
	0
};

//-------------------------------------------------------------

CPlayer::CPlayer()
{
	m_lives = INITIAL_LIVES;
	m_score = 0;
	m_has_dive_pickup = false;
	m_checkpoint = gsCVector(0.f,0.f);
}

//-------------------------------------------------------------

CPlayer::~CPlayer()
{
}

//-------------------------------------------------------------

int CPlayer::getScore()
{
	return m_score;
}

//-------------------------------------------------------------

void CPlayer::scoreBonus(int bonus)
{
	int old_score = m_score;

	m_score += bonus;

	int *score_level = m_extra_life_scores;

	while (*score_level != 0) {
		if (old_score < *score_level &&
			m_score >= *score_level) {
			extraLife();
			break;
			}
		score_level++;
		}
}

//-------------------------------------------------------------

int CPlayer::getLives()
{
	return m_lives;
}

//-------------------------------------------------------------

void CPlayer::extraLife()
{
	if (m_lives < MAX_LIVES)
		m_lives++;
}

//-------------------------------------------------------------

void CPlayer::loseLife()
{
	if (m_lives > 0)
		m_lives--;

	m_has_dive_pickup = false;
}

//-------------------------------------------------------------

void CPlayer::diveBonus()
{
	m_has_dive_pickup = true;
}

//-------------------------------------------------------------

bool CPlayer::hasDive()
{
	return m_has_dive_pickup;
}

//-------------------------------------------------------------

void CPlayer::useDive()
{
	m_has_dive_pickup = false;
}

//-------------------------------------------------------------

void CPlayer::setCheckpoint(const gsCVector& checkpoint)
{
	m_checkpoint = checkpoint;
}

//-------------------------------------------------------------

gsCVector CPlayer::getCheckpoint()
{
	return m_checkpoint;
}

//-------------------------------------------------------------
