//-------------------------------------------------------------
//
// Program:	Demo 1
//
// Author:	John M Phillips
//
// Started:	20/08/00
//
// Remarks:	This is a simple demo program using the GameSystem library
//			which opens a full-screen window and draws some moving sprites.
//
//-------------------------------------------------------------

#include "demo1.h"

//-------------------------------------------------------------
// Constants

const char *GRAPHICS_DIRECTORY = "..\\..\\Demo1\\Graphics\\";

const char *SPRITE_IMAGE = "ship.bmp";

const int NUMBER_OF_SPRITES = 10;

//-------------------------------------------------------------
// Create an instance of the application class
// GameSystem will run this automatically

CDemo1 myApp("Demo 1");

//-------------------------------------------------------------
// Initialize the demo
//
// Return: true if successful

bool CDemo1::initialize()
{
	// initialize the GameSystem framework

	if (!gsCApplication::initialize())
		return false;

	// create the keyboard handler and screen window

	if (!m_keyboard.create())
		return false;

	if (!m_screen.createWindowed(getWindow()))
		return false;

	// load images and create some sprites

	if (!createSprites())
		return false;

	// create a 16 layer starfield

	m_stars.initialize(16);

	return true;
}

//-------------------------------------------------------------
// Main loop : draws sprites to the screen and test the keyboard
//
// Return: true if successful
//		   false if error or ESCAPE pressed

bool CDemo1::mainloop()
{
	// clear the screen to black
	
	m_screen.clear(gsCColour(gsBLACK));

	// draw starfield and animate it
	
	m_stars.draw();
	m_stars.move(4);

	// draw our sprites

	drawSprites();

	// flip the screen to view

	m_screen.flip();

	// move sprites for next frame

	moveSprites();

	// test for ESCAPE pressed and exit demo if so

	gsKeyCode key = m_keyboard.getKey();

	if (key == gsKEY_ESCAPE)
		return false;

	return true;
}

//-------------------------------------------------------------
// Shutdown demo

bool CDemo1::shutdown()
{
	// destroy out sprites and images

	destroySprites();

	// destroy the screen and keyboard handler

	m_screen.destroy();
	m_keyboard.destroy();
	
	// exit

	return gsCApplication::shutdown();
}

//-------------------------------------------------------------
// Create our images and sprites
//
// Return: true if success
//		   false if error

bool CDemo1::createSprites()
{
	// set the directory path for our images
	
	gsCFile::setDirectory(GRAPHICS_DIRECTORY);

	// load image

	if (!m_image.load(SPRITE_IMAGE))
		return false;

	// treat magenta colour as being transparent

	m_image.enableColourKey(gsCColour(gsMAGENTA));

	// random number generator for sprite positions

	gsCRandom rnd;

	// now we create the sprites

	for (int i = 0; i < NUMBER_OF_SPRITES; i++) {

		// create a new sprite

		gsCSprite *spr = new gsCSprite;

		// add it to our list of sprites

		m_sprite.addItem(spr);

		// use the image we loaded earlier

		spr->setImage(&m_image);

		// set the centre of the sprite

		spr->setHotspot(m_image.getSize() / 2);

		// give it a random starting position on screen

		gsCPoint pos;

		pos.setX(rnd.getInt(0,m_screen.getSize().getX()));
		pos.setY(rnd.getInt(0,m_screen.getSize().getY()));

		spr->setPosition(pos);

		// activate it
		
		spr->setActive(true);
		}

	return true;
}

//-------------------------------------------------------------
// Destroy our images and sprites

bool CDemo1::destroySprites()
{
	// delete each sprite
	
	for (int i = 0; i < m_sprite.getSize(); i++)
		delete m_sprite[i];

	// clear the sprite list

	m_sprite.clear();

	// destroy our image

	m_image.destroy();

	return true;
}

//-------------------------------------------------------------
// Draw all the sprites on screen

void CDemo1::drawSprites()
{
	for (int i = 0; i < m_sprite.getSize(); i++)
		m_sprite[i]->draw();
}

//-------------------------------------------------------------
// Move all sprites

void CDemo1::moveSprites()
{
	gsCRect screen_rect = m_screen.getRect();

	// this basically moves each sprite up the screen

	// if the sprite goes off the screen it's wrapped
	// around to the bottom

	for (int i = 0; i < m_sprite.getSize(); i++) {

		m_sprite[i]->move(gsCPoint(0,-((i & 3) + 1)));

		gsCRect sprite_rect = m_sprite[i]->getRect();

		if (!(sprite_rect.overlaps(screen_rect)))
			m_sprite[i]->move(gsCPoint(0,m_screen.getSize().getY() + m_image.getSize().getY()));
		}
}

//-------------------------------------------------------------

