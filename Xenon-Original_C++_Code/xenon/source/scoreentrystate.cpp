//-------------------------------------------------------------
//
// Class:	CScoreEntryState
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

CScoreEntryState *CScoreEntryState::m_instance = 0;

char *CScoreEntryState::m_congratulation_messages[] = {
	"That's the best score today !",
	"Almost the best score today !",
	"You're in the top three !",
	"An above average performance !",
	"An average performance !",
	"A below average performance !",
	"A fairly good score !",
	"At least you're not last !",
	"You made the grade (just)",
	"You'll have to try harder !!",
};

//-------------------------------------------------------------

CScoreEntryState::CScoreEntryState()
{
}

//-------------------------------------------------------------

CScoreEntryState::~CScoreEntryState()
{
}

//-------------------------------------------------------------

CGameState *CScoreEntryState::instance()
{
	if (!m_instance)
		m_instance = new CScoreEntryState;

	return m_instance;
}

//-------------------------------------------------------------

bool CScoreEntryState::create()
{
	stopSamples();
	playMusic(MUSIC_HISCORE);

	return true;
}

//-------------------------------------------------------------

bool CScoreEntryState::update()
{
	if (!CGameState::update())
		return false;

	if (Options.getOption(OPTION_BACKDROP))
		m_backdrop.draw(gsCPoint(0,0));
	else
		m_screen.clear(gsCColour(gsBLACK));

	m_starfield.move(4);
	m_starfield.draw();

	char *m = m_congratulation_messages[m_score_table.getCurrentItem()];

	m_medium_font.setTextCursor(gsCPoint(0,50));
	m_medium_font.justifyString(m);

	m_score_table.draw();

	m_medium_font.setTextCursor(gsCPoint(0,400));
	m_medium_font.justifyString("Use Movement Keys To Enter Your Name");
	m_medium_font.setTextCursor(gsCPoint(0,430));
	m_medium_font.justifyString("Press Fire To Exit To Main Menu");

	m_screen.flip();
	
	switch (getKey()) {
		case gsKEY_RETURN:
		case gsKEY_ENTER:
		case gsKEY_LCONTROL:
			playSample(SAMPLE_MENU_BACK);
			return changeState(CMainMenuState::instance());
		case gsKEY_UP:
			playSample(SAMPLE_MENU_OPTION);
			m_score_table.cycleLetter(1);
			break;
		case gsKEY_DOWN:
			playSample(SAMPLE_MENU_OPTION);
			m_score_table.cycleLetter(-1);
			break;
		case gsKEY_LEFT:
			playSample(SAMPLE_MENU_SELECTION);
			m_score_table.scrollLetter(-1);
			break;
		case gsKEY_RIGHT:
			playSample(SAMPLE_MENU_SELECTION);
			m_score_table.scrollLetter(1);
			break;
		}

	if (m_sound_system.isMusicFinished())
		playMusic(MUSIC_HISCORE);

	return true;
}

//-------------------------------------------------------------
