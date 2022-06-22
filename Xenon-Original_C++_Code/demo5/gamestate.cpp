//-------------------------------------------------------------
//
// Class:	CGameState
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	None
//
// Derived:	CMainMenuState
//			COptionsMenuState
//			CPlayGameState
//			CScoreEntryState
//			CScoreTableState
//
//-------------------------------------------------------------

#include "demo5.h"

//-------------------------------------------------------------

gsCScreen		CGameState::m_screen;
gsCKeyboard		CGameState::m_keyboard;
gsCSoundSystem	CGameState::m_sound_system;

gsCFont			CGameState::m_small_font;
gsCFont			CGameState::m_medium_font;
gsCStarfield	CGameState::m_starfield;

CLevel			CGameState::m_level;
CScene			CGameState::m_scene;
CDemo5 *		CGameState::m_demo5 = 0;

//-------------------------------------------------------------

CGameState::CGameState()
{
}

//-------------------------------------------------------------

CGameState::~CGameState()
{
}

//-------------------------------------------------------------

bool CGameState::initialize(CDemo5 *demo5)
{
	m_demo5 = demo5;

	gsCFile::setDirectory(DIRECTORY_ROOT);

	if (!m_keyboard.create())
		return false;

	if (!m_screen.createWindowed(m_demo5->getWindow()))
		return false;

	if (!m_sound_system.create())
		return false;

	updateVolume();
	
	// pre-load music/soundfx

	gsCFile::setDirectory(DIRECTORY_MUSIC);

	if (!loadMusic())
		return false;

	gsCFile::setDirectory(DIRECTORY_SOUNDS);

	if (!loadSoundEffects())
		return false;

	// pre-load graphics

	gsCFile::setDirectory(DIRECTORY_GRAPHICS);

	if (!loadGraphics())
		return false;

	m_starfield.initialize(8);

	m_demo5->changeState(CPlayGameState::instance());

	return true;
}

//-------------------------------------------------------------

bool CGameState::shutdown()
{
	m_level.m_image.destroy();

	m_medium_font.destroy();
	m_small_font.destroy();

	m_scene.destroyAll();

	m_screen.destroy();

	m_keyboard.destroy();

	m_sound_system.destroy();

	return true;
}

//-------------------------------------------------------------

bool CGameState::changeState(CGameState *new_game_state)
{
	if (m_demo5)
		return m_demo5->changeState(new_game_state);

	return false;
}

//-------------------------------------------------------------

bool CGameState::create()
{
	return true;
}

//-------------------------------------------------------------

bool CGameState::update()
{
	return true;
}

//-------------------------------------------------------------

bool CGameState::destroy()
{
	return true;
}

//-------------------------------------------------------------

bool CGameState::loadGraphics()
{
	if (!m_scene.loadImages())
		return false;

	if (!m_small_font.load("font8x8.bmp"))
		return false;

	m_small_font.setTileSize(gsCPoint(8,8));
	m_small_font.enableColourKey(gsCColour(gsMAGENTA));

	if (!m_medium_font.load("font16x16.bmp"))
		return false;

	m_medium_font.setTileSize(gsCPoint(16,16));
	m_medium_font.enableColourKey(gsCColour(gsMAGENTA));

	return true;
}

//-------------------------------------------------------------

bool CGameState::loadMusic()
{
	m_sound_system.addMusic("title.mp3");
	m_sound_system.addMusic("intro.mp3");
	m_sound_system.addMusic("game.mp3");
	m_sound_system.addMusic("hiscore.mp3");
	m_sound_system.addMusic("boss.mp3");
	m_sound_system.addMusic("outro.mp3");

	return true;
}

//-------------------------------------------------------------

bool CGameState::loadSoundEffects()
{
	m_sound_system.addSample("menu_selection.wav");
	m_sound_system.addSample("menu_option.wav");
	m_sound_system.addSample("menu_click.wav");
	m_sound_system.addSample("menu_back.wav");

	m_sound_system.addSample("player_created.wav");
	m_sound_system.addSample("player_destroyed.wav");
	m_sound_system.addSample("fire_missile.wav");
	m_sound_system.addSample("fire_homing_missile.wav");
	m_sound_system.addSample("fire_laser.wav");
	m_sound_system.addSample("small_explosion.wav");
	m_sound_system.addSample("medium_explosion.wav");
	m_sound_system.addSample("big_explosion.wav");
	m_sound_system.addSample("asteroid_breakup.wav");
	m_sound_system.addSample("pickup.wav");
	m_sound_system.addSample("bonus.wav");
	m_sound_system.addSample("dive_down.wav");
	m_sound_system.addSample("dive_up.wav");
	m_sound_system.addSample("hit_background.wav");

	m_sound_system.addSample("roar.wav");
	m_sound_system.addSample("snort.wav");

	m_sound_system.addSample("checkpoint.wav");

	return true;
}

//-------------------------------------------------------------

void CGameState::updateVolume()
{
	m_sound_system.setVolume(60,30);
}

//-------------------------------------------------------------

void CGameState::playSample(GameSampleType sample)
{
	m_sound_system.playSample((int) sample);
}

//-------------------------------------------------------------
// play sample with stereo position based on screen x coordinate

void CGameState::playSample(GameSampleType sample,float x)
{
	int w2 = gsCApplication::getScreen()->getSize().getX() / 2;
	m_sound_system.playSample((int) sample,100 * ((int) x - w2) / w2);
}

//-------------------------------------------------------------

void CGameState::playMusic(GameMusicType music)
{
	m_sound_system.playMusic((int) music);
};

//-------------------------------------------------------------

void CGameState::stopSamples()
{
	m_sound_system.stopSamples();
}

//-------------------------------------------------------------

void CGameState::stopMusic()
{
	m_sound_system.stopMusic();
}

//-------------------------------------------------------------

gsCApplication *CGameState::getApplication()
{
	return m_demo5;
}

//-------------------------------------------------------------

gsKeyCode CGameState::getKey()
{
	gsKeyCode key = m_keyboard.getKey();

	return key;
}

//-------------------------------------------------------------

void CGameState::getControl(Controls& controls,int player)
{
	controls.left = m_keyboard.testKey(gsKEY_LEFT);
	controls.right = m_keyboard.testKey(gsKEY_RIGHT);
	controls.up = m_keyboard.testKey(gsKEY_UP);
	controls.down = m_keyboard.testKey(gsKEY_DOWN);
	controls.fire = m_keyboard.testKey(gsKEY_LCONTROL,gsKEY_STATE);
	controls.firePressed = m_keyboard.testKey(gsKEY_LCONTROL,gsKEY_PRESSED);
	controls.divePressed = m_keyboard.testKey(gsKEY_LSHIFT,gsKEY_PRESSED);
	controls.reversePressed = m_keyboard.testKey(gsKEY_ALT,gsKEY_PRESSED);
}

//-------------------------------------------------------------
