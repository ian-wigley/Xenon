import CGameState = require("GameState");
import gsCMenu = require("Menu");
import gsCPoint = require("Point");
import Options = require("Options")
import enums = require("Enums");
import CControlMenuState = require("ControlMenuState");
import CVideoMenuState = require("VideoMenuState");
import CAudioMenuState = require("AudioMenuState");
import CMainMenuState = require("MainMenuState");

class COptionsMenuState extends CGameState {

    m_instance = null;
    m_menu: gsCMenu;
    m_options: Options;
    m_controlMenuState: CControlMenuState;
    m_videoMenuState: CVideoMenuState;
    m_audioMenuState: CAudioMenuState;
    m_mainMenuState: CMainMenuState;

    constructor() {
        super();
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        if (!this.m_instance)
            this.m_instance = new COptionsMenuState();
        return this.m_instance;
    }

    //-------------------------------------------------------------

    public create(): boolean {

        this.m_menu.clear();
        this.m_menu.addSelection("Control Options");
        this.m_menu.addSelection("Video Options");
        this.m_menu.addSelection("Audio Options");

        //this.m_menu.addSeperator();
        this.m_menu.addSelection("Back To Main Menu");
        this.m_menu.setWrap(true);
        this.m_menu.setPosition(new gsCPoint(0, 150));
        this.m_menu.setSpacing(new gsCPoint(0, 30));
        //this.m_menu.setCurrentItem(OM_BACK);
        this.m_menu.setFont(this.m_medium_font);

        return true;
    }

    //-------------------------------------------------------------

    public update(): boolean {

        //if (!CGameState::update())
        //return false;

        if (this.m_options.getOption(enums.OptionType.OPTION_BACKDROP)) {
            //m_backdrop.draw(new gsCPoint(0, 0)); 
        }
        else {
            //m_screen.clear(gsCColour(gsBLACK));
        }

        //m_starfield.move(4);
        //m_starfield.draw();

        this.m_medium_font.setTextCursor(new gsCPoint(0, 50));
        this.m_medium_font.justifyString("Options Menu");

        //this.m_menu.draw(ctx);
        //this.m_screen.flip();

        var item: enums.OptionsMenuItem = <enums.OptionsMenuItem>this.m_menu.getCurrentItem();

        //switch (getKey()) {
        //case gsKEY_RETURN:
        //case gsKEY_ENTER:
        //case gsKEY_LCONTROL:
        switch (item) {
            case enums.OptionsMenuItem.OM_CONTROL:
                //CGameState::playSample(SAMPLE_MENU_SELECTION);
                return this.changeState(this.m_controlMenuState.instance());
            case enums.OptionsMenuItem.OM_VIDEO:
                //CGameState::playSample(SAMPLE_MENU_SELECTION);
                return this.changeState(this.m_videoMenuState.instance());
            case enums.OptionsMenuItem.OM_AUDIO:
                //CGameState::playSample(SAMPLE_MENU_SELECTION);
                return this.changeState(this.m_audioMenuState.instance());
            case enums.OptionsMenuItem.OM_BACK:
                //CGameState::playSample(SAMPLE_MENU_BACK);
                return this.changeState(this.m_mainMenuState.instance());
        }
        //break;
        //case gsKEY_UP:
        //CGameState::playSample(SAMPLE_MENU_SELECTION);
        //this.m_menu.scroll(-1);
        //break;
        //        case gsKEY_DOWN:
        //CGameState::playSample(SAMPLE_MENU_SELECTION);
        //this.m_menu.scroll(1);
        //break;
        //}

        return true;
    }

    //-------------------------------------------------------------
}
export = COptionsMenuState;