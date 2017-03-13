import CGameState = require("GameState");
import gsCControls = require("Controls");
import gsCScreen = require("Screen");

class CScoreEntryState extends CGameState {

    m_congratulation_messages: Array<string>;

    //m_congratulation_messages: Array<string> = new Array {
    //    "That's the best score today !",
    //    "Almost the best score today !",
    //    "You're in the top three !",
    //    "An above average performance !",
    //    "An average performance !",
    //    "A below average performance !",
    //    "A fairly good score !",
    //    "At least you're not last !",
    //    "You made the grade (just)",
    //    "You'll have to try harder !!",
    //};

    m_instance: CScoreEntryState = null;

    constructor() {
        super();

        this.m_congratulation_messages = [];
        this.m_congratulation_messages.push("That's the best score today !");
        this.m_congratulation_messages.push("Almost the best score today !");
        this.m_congratulation_messages.push("You're in the top three !");
        this.m_congratulation_messages.push("An above average performance !");
        this.m_congratulation_messages.push("An average performance !");
        this.m_congratulation_messages.push("A below average performance !");
        this.m_congratulation_messages.push("A fairly good score !");
        this.m_congratulation_messages.push("At least you're not last !");
        this.m_congratulation_messages.push("You made the grade (just)");
        this.m_congratulation_messages.push("You'll have to try harder !!");
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        if (!this.m_instance) {
            this.m_instance = new CScoreEntryState();
        }
        return this.m_instance;
    }

    //-------------------------------------------------------------

    public create(): boolean {
        //stopSamples();
        //playMusic(MUSIC_HISCORE);

        return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: gsCControls): boolean {
    //public update(): boolean {
        //if (!CGameState::update())
        //	return false;

        var screen: gsCScreen = new gsCScreen();

        //if (Options.getOption(OPTION_BACKDROP))
        //	m_backdrop.draw(gsCPoint(0,0));
        //else
        //	m_screen.clear(gsCColour(gsBLACK));

        //m_starfield.move(4);
        //m_starfield.draw();

        //char *m = m_congratulation_messages[m_score_table.getCurrentItem()];

        //m_medium_font.setTextCursor(gsCPoint(0,50));
        //m_medium_font.justifyString(m);

        this.m_score_table.draw(screen, this.m_medium_font, ctx);
        //(screen: gsCScreen, font: gsCFont, ctx: CanvasRenderingContext2D)

        //m_medium_font.setTextCursor(gsCPoint(0,400));
        //m_medium_font.justifyString("Use Movement Keys To Enter Your Name");
        //m_medium_font.setTextCursor(gsCPoint(0,430));
        //m_medium_font.justifyString("Press Fire To Exit To Main Menu");

        //m_screen.flip();

        //switch (getKey()) {
        //	case gsKEY_RETURN:
        //	case gsKEY_ENTER:
        //	case gsKEY_LCONTROL:
        //		playSample(SAMPLE_MENU_BACK);
        //		return changeState(CMainMenuState::instance());
        //	case gsKEY_UP:
        //		playSample(SAMPLE_MENU_OPTION);
        //		m_score_table.cycleLetter(1);
        //		break;
        //	case gsKEY_DOWN:
        //		playSample(SAMPLE_MENU_OPTION);
        //		m_score_table.cycleLetter(-1);
        //		break;
        //	case gsKEY_LEFT:
        //		playSample(SAMPLE_MENU_SELECTION);
        //		m_score_table.scrollLetter(-1);
        //		break;
        //	case gsKEY_RIGHT:
        //		playSample(SAMPLE_MENU_SELECTION);
        //		m_score_table.scrollLetter(1);
        //		break;
        //	}

        //if (m_sound_system.isMusicFinished())
        //	playMusic(MUSIC_HISCORE);

        return true;
    }

    //-------------------------------------------------------------

}

export = CScoreEntryState;