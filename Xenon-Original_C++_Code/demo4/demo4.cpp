//-------------------------------------------------------------
//
// Program:	Demo 4
//
// Author:	John M Phillips
//
// Started:	20/08/00
//
// Remarks:	This is a more complex demo program using the GameSystem library
//			which draws a scrolling backdrop and let's you shoot some aliens
//
//-------------------------------------------------------------

#include "demo4.h"

//-------------------------------------------------------------
// Create an instance of the application class
// GameSystem will run this automatically

CDemo4 myApp("Demo 4");

//-------------------------------------------------------------

bool CDemo4::changeState(CGameState *new_game_state)
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

bool CDemo4::initialize()
{
	if (!gsCApplication::initialize())
		return false;

	if (!CGameState::initialize(this))
		return false;

	return true;
}

//-------------------------------------------------------------

bool CDemo4::mainloop()
{
	if (m_game_state)
		return m_game_state->update();

	return false;
}

//-------------------------------------------------------------

bool CDemo4::shutdown()
{
	changeState(0);

	if (!CGameState::shutdown())
		return false;

	if (!gsCApplication::shutdown())
		return false;

	return true;
}

//-------------------------------------------------------------
