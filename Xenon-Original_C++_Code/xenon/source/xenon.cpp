//-------------------------------------------------------------
//
// Module:	Xenon 2K
//
// Author:	John M Phillips
//
// Started:	05/05/00
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

bool CXenon::changeState(CGameState *new_game_state)
{
	if (m_game_state) {
		if (!m_game_state->destroy())
			return false;
		}

	m_game_state = new_game_state;

	if (m_game_state)
		return m_game_state->create();

	return true;
}

//-------------------------------------------------------------

bool CXenon::initialize()
{
	if (!gsCApplication::initialize())
		return false;

	if (!CGameState::initialize(this))
		return false;

	return true;
}

//-------------------------------------------------------------

bool CXenon::mainloop()
{
	if (m_game_state)
		return m_game_state->update();

	return false;
}

//-------------------------------------------------------------

bool CXenon::shutdown()
{
	changeState(0);

	if (!CGameState::shutdown())
		return false;

	if (!gsCApplication::shutdown())
		return false;

	return true;
}

//-------------------------------------------------------------
