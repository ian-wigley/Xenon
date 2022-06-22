//-------------------------------------------------------------
//
// Program:	Demo 2
//
// Author:	John M Phillips
//
// Started:	20/08/00
//
// Remarks:	This is a simple demo program using the GameSystem library
//			which draws a spaceship which you can move around with the
//			cursor keys, and fire missiles with the space bar.
//
//-------------------------------------------------------------

#include "demo2.h"

//-------------------------------------------------------------
// Create an instance of the application class
// GameSystem will run this automatically

CDemo2 myApp("Demo 2");

//-------------------------------------------------------------

bool CDemo2::changeState(CGameState *new_game_state)
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

bool CDemo2::initialize()
{
	if (!gsCApplication::initialize())
		return false;

	if (!CGameState::initialize(this))
		return false;

	return true;
}

//-------------------------------------------------------------

bool CDemo2::mainloop()
{
	if (m_game_state)
		return m_game_state->update();

	return false;
}

//-------------------------------------------------------------

bool CDemo2::shutdown()
{
	changeState(0);

	if (!CGameState::shutdown())
		return false;

	if (!gsCApplication::shutdown())
		return false;

	return true;
}

//-------------------------------------------------------------
