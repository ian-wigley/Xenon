//-------------------------------------------------------------
//
// Program:	Demo 5
//
// Author:	John M Phillips
//
// Started:	20/08/00
//
// Remarks:	This is the last demo program using the GameSystem library
//			which draws a scrolling backdrop and let's you shoot some
//			asteroids, complete with music and sound effects.
//
//-------------------------------------------------------------

#include "demo5.h"

//-------------------------------------------------------------
// Create an instance of the application class
// GameSystem will run this automatically

CDemo5 myApp("Demo 5");

//-------------------------------------------------------------

bool CDemo5::changeState(CGameState *new_game_state)
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
// Initialize the demo
//
// Return: true if successful

bool CDemo5::initialize()
{
	if (!gsCApplication::initialize())
		return false;

	if (!CGameState::initialize(this))
		return false;

	return true;
}

//-------------------------------------------------------------

bool CDemo5::mainloop()
{
	if (m_game_state)
		return m_game_state->update();

	return false;
}

//-------------------------------------------------------------

bool CDemo5::shutdown()
{
	changeState(0);

	if (!CGameState::shutdown())
		return false;

	if (!gsCApplication::shutdown())
		return false;

	return true;
}

//-------------------------------------------------------------
