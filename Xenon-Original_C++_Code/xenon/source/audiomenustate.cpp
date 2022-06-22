//-------------------------------------------------------------
//
// Class:	CAudioMenuState
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

CAudioMenuState *CAudioMenuState::m_instance = 0;

//-------------------------------------------------------------

CAudioMenuState::CAudioMenuState()
{
}

//-------------------------------------------------------------

CAudioMenuState::~CAudioMenuState()
{
}

//-------------------------------------------------------------

CGameState *CAudioMenuState::instance()
{
	if (!m_instance)
		m_instance = new CAudioMenuState;

	return m_instance;
}

//-------------------------------------------------------------

void CAudioMenuState::copyOptionsToMenu()
{
	m_menu.setValue(OM_MUSIC		,Options.getOption(OPTION_MUSIC));
	m_menu.setValue(OM_SOUNDFX		,Options.getOption(OPTION_SOUNDFX));
}

//-------------------------------------------------------------

void CAudioMenuState::copyMenuToOptions()
{
	Options.setOption(OPTION_MUSIC		,m_menu.getValue(OM_MUSIC));
	Options.setOption(OPTION_SOUNDFX	,m_menu.getValue(OM_SOUNDFX));
}

//-------------------------------------------------------------

bool CAudioMenuState::create()
{
	m_menu.clear();

	m_menu.addSlider("   Music",10,0,10);
	m_menu.addSlider("Sound FX",10,0,10);

	copyOptionsToMenu();

	m_menu.addSeperator();
	m_menu.addSelection("Apply");
	m_menu.addSelection("Cancel");

	m_menu.setWrap(true);
	m_menu.setPosition(gsCPoint(0,150));
	m_menu.setSpacing(gsCPoint(0,30));
	m_menu.setCurrentItem(OM_CANCEL);
	m_menu.setFont(&m_medium_font);

	return true;
}

//-------------------------------------------------------------

bool CAudioMenuState::update()
{
	if (!CGameState::update())
		return false;

	if (Options.getOption(OPTION_BACKDROP))
		m_backdrop.draw(gsCPoint(0,0));
	else
		m_screen.clear(gsCColour(gsBLACK));

	m_starfield.move(4);
	m_starfield.draw();

	m_medium_font.setTextCursor(gsCPoint(0,50));
	m_medium_font.justifyString("Audio Options");

	m_menu.draw();
	
	m_screen.flip();

	AudioMenuItem item = (AudioMenuItem) m_menu.getCurrentItem();

	switch (getKey()) {
		case gsKEY_RETURN:
		case gsKEY_ENTER:
		case gsKEY_LCONTROL:
			if (item == OM_APPLY) {
				CGameState::playSample(SAMPLE_MENU_SELECTION);
				copyMenuToOptions();
				if (Options.areChanged()) {

					gsCFile::setDirectory(DIRECTORY_ROOT);

					Options.save(OPTIONS_FILENAME);

					updateVolume();

					if (Options.requireReload()) {
						CMessageBoxState::setup("Restart to apply options ?",
												"Yes",0,
												"No",COptionsMenuState::instance(),
												true);
						return changeState(CMessageBoxState::instance());
						}
					else
						return changeState(COptionsMenuState::instance());
					}
				else
					return changeState(COptionsMenuState::instance());
				}
			else if (item == OM_CANCEL) {
				CGameState::playSample(SAMPLE_MENU_BACK);
				return changeState(COptionsMenuState::instance());
				}
			break;
		case gsKEY_UP:
			CGameState::playSample(SAMPLE_MENU_SELECTION);
			m_menu.scroll(-1);
			break;
		case gsKEY_DOWN:
			CGameState::playSample(SAMPLE_MENU_SELECTION);
			m_menu.scroll(1);
			break;
		case gsKEY_LEFT:
			if (m_menu.setValue(item,m_menu.getValue(item) - 1))
				CGameState::playSample(SAMPLE_MENU_OPTION);
			break;
		case gsKEY_RIGHT:
			if (m_menu.setValue(item,m_menu.getValue(item) + 1))
				CGameState::playSample(SAMPLE_MENU_OPTION);
			break;
		}

	return true;
}

//-------------------------------------------------------------

