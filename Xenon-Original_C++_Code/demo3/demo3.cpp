//-------------------------------------------------------------
//
// Program:	Demo 3
//
// Author:	John M Phillips
//
// Started:	20/08/00
//
// Remarks:	This is a simple program using the GameSystem library
//			which lets you view a 2 layer scrolling tile map.
//
//-------------------------------------------------------------

#include "demo3.h"

//-------------------------------------------------------------
// Constants

const char *GRAPHICS_DIRECTORY = "..\\..\\Demo3\\Graphics\\";
const char *LEVELS_DIRECTORY = "..\\..\\Demo3\\Levels\\";

const char *LEVEL_NAME = "test.fmp";

const int PLAYER_START_OFFSET = 64;

//-------------------------------------------------------------
// Create an instance of the application class
// GameSystem will run this automatically

CDemo3 myApp("Demo 3");

//-------------------------------------------------------------
// Initialize the demo
//
// Return: true if successful

bool CDemo3::initialize()
{
	// initialize the GameSystem framework

	if (!gsCApplication::initialize())
		return false;

	// create the keyboard handler and screen window

	if (!m_keyboard.create())
		return false;

	if (!m_screen.createWindowed(getWindow()))
		return false;

	// load level

	if (!createLevel())
		return false;

	m_stars.initialize(16);

	return true;
}

//-------------------------------------------------------------
// Main loop : draws level to the screen and test the keyboard
//
// Return: true if successful
//		   false if error or ESCAPE pressed

bool CDemo3::mainloop()
{
	// clear the screen to black
	
	m_screen.clear(gsCColour(gsBLACK));

	// draw starfield

	m_stars.draw();

	// draw our level

	drawLevel();

	// flip the screen to view

	m_screen.flip();

	// move level for next frame

	moveLevel();

	// test for ESCAPE pressed and exit demo if so

	gsKeyCode key = m_keyboard.getKey();

	if (key == gsKEY_ESCAPE)
		return false;

	return true;
}

//-------------------------------------------------------------
// Shutdown demo

bool CDemo3::shutdown()
{
	destroyLevel();

	// destroy the screen and keyboard handler

	m_screen.destroy();
	m_keyboard.destroy();
	
	// exit

	return gsCApplication::shutdown();
}

//-------------------------------------------------------------
// Load our level
//
// Return: true if success
//		   false if error

bool CDemo3::createLevel()
{
	if (!m_level.load(LEVEL_NAME,LEVELS_DIRECTORY,GRAPHICS_DIRECTORY))
		return false;

	m_level.reset();

	m_ship_y = m_level.m_back_layer.getSizeInPixels().getY() - PLAYER_START_OFFSET;
	
	return true;
}

//-------------------------------------------------------------
// Destroy our level

void CDemo3::destroyLevel()
{
	m_level.destroy();
}

//-------------------------------------------------------------
// Draw the level

void CDemo3::drawLevel()
{
	setLayerPositions(m_ship_y);

	m_level.m_back_layer.draw();
	m_level.m_front_layer.draw();
}

//-------------------------------------------------------------
// Move the level

void CDemo3::moveLevel()
{
	m_stars.move(4);

	if (m_keyboard.testKey(gsKEY_UP)) {
		m_ship_y -= 4;
		}
	if (m_keyboard.testKey(gsKEY_DOWN)) {
		m_ship_y += 4;
		}
}

//-------------------------------------------------------------

void CDemo3::setLayerPositions(int ship_y)
{
	int mh = m_level.m_back_layer.getSizeInPixels().getY();

	int by = -(mh - (mh - ship_y) / 2 + PLAYER_START_OFFSET / 2 - m_screen.getSize().getY());

	m_level.m_back_layer.setPosition(gsCPoint(0,by));

	int fy = -(ship_y + PLAYER_START_OFFSET - m_screen.getSize().getY());

	m_level.m_front_layer.setPosition(gsCPoint(0,fy));
}

//-------------------------------------------------------------
