//-------------------------------------------------------------
//
// Class:	CIntroState
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CGameState
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CIntroState *CIntroState::m_instance = 0;

//-------------------------------------------------------------

CIntroState::CIntroState()
{
}

//-------------------------------------------------------------

CIntroState::~CIntroState()
{
}

//-------------------------------------------------------------

CGameState *CIntroState::instance()
{
	if (!m_instance)
		m_instance = new CIntroState;

	return m_instance;
}

//-------------------------------------------------------------

bool CIntroState::create()
{
	m_menu.clear();

	m_menu.addSeperator("Choose Level:");
	m_menu.addSeperator();

	gsCFile::setDirectory(DIRECTORY_LEVELS);

	const char *name = gsCFile::findFirst("*.fmp");

	while (name) {
		m_files.addItem(strdup(name));
		name = gsCFile::findNext();
		}

	gsCFile::findClose();

	for (int i = 0; i < m_files.getSize(); i++)
		m_menu.addSelection(m_files[i]);

	m_menu.setWrap(true);
	m_menu.setPosition(gsCPoint(0,100));
	m_menu.setSpacing(gsCPoint(0,30));
	m_menu.setCurrentItem(IM_FIRSTFILE);
	m_menu.setFont(&m_medium_font);

	playMusic(MUSIC_INTRO);

	return true;
}

//-------------------------------------------------------------

bool CIntroState::update()
{
	if (!CGameState::update())
		return false;

	if (Options.getOption(OPTION_BACKDROP))
		m_backdrop.draw(gsCPoint(0,0));
	else
		m_screen.clear(gsCColour(gsBLACK));

	m_starfield.move(4);
	m_starfield.draw();

	m_menu.draw();

	m_screen.flip();

	switch (getKey()) {
		case gsKEY_RETURN:
		case gsKEY_ENTER:
		case gsKEY_LCONTROL:
			{
			int item = m_menu.getCurrentItem();

			strcpy(m_level_filename,m_menu.getName(item));

			CGameState::playSample(SAMPLE_MENU_CLICK);

			return changeState(CPlayGameState::instance());
			}
			break;
		case gsKEY_UP:
			m_menu.scroll(-1);
			CGameState::playSample(SAMPLE_MENU_SELECTION);
			break;
		case gsKEY_DOWN:
			m_menu.scroll(1);
			CGameState::playSample(SAMPLE_MENU_SELECTION);
			break;
		case gsKEY_ESCAPE:
			return changeState(CMainMenuState::instance());
		}

	return true;
}

//-------------------------------------------------------------

bool CIntroState::destroy()
{
	for (int i = 0; i < m_files.getSize(); i++)
		free(m_files[i]);

	m_files.clear();

	return true;
}

//-------------------------------------------------------------
