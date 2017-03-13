import CGameState = require("GameState");

class CViewScoresState extends CGameState {

    m_instance: CViewScoresState = null;

    constructor() {
        super();
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        if (!this.m_instance)
            this.m_instance = new CViewScoresState();
        return this.m_instance;
    }

    //-------------------------------------------------------------

    public create(): boolean {
        //m_score_table.setCurrentItem(-1);
        return true;
    }

    //-------------------------------------------------------------

    public update(): boolean {
        //if (!CGameState::update())
        //	return false;

        //if (Options.getOption(OPTION_BACKDROP))
        //	m_backdrop.draw(gsCPoint(0,0));
        //else
        //	m_screen.clear(gsCColour(gsBLACK));

        //m_starfield.move(4);
        //m_starfield.draw();

        //m_medium_font.setTextCursor(gsCPoint(0,50));
        //m_medium_font.justifyString("Xenon 2000 High Scores");

        //m_score_table.draw();

        //m_medium_font.setTextCursor(gsCPoint(0,450));
        //m_medium_font.justifyString("Press Fire For Main Menu");

        //m_screen.flip();

        //switch (getKey()) {
        //	case gsKEY_RETURN:
        //	case gsKEY_ENTER:
        //	case gsKEY_LCONTROL:
        //		CGameState::playSample(SAMPLE_MENU_BACK);
        //		return changeState(CMainMenuState::instance());
        //	}

        return true;
    }

    //-------------------------------------------------------------

}

export = CViewScoresState;