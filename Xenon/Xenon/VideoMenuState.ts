import CGameState = require("GameState");

class CVideoMenuState extends CGameState {

    m_instance = null;

    constructor() {
        super();
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        if (!this.m_instance)
            this.m_instance = new CVideoMenuState();
        return this.m_instance;
    }

    //-------------------------------------------------------------

    public copyOptionsToMenu(): void {

        //	m_menu.setValue(OM_HIRES		,Options.getOption(OPTION_HIRES));
        //	m_menu.setValue(OM_WINDOWED		,Options.getOption(OPTION_WINDOWED));

        //	switch (Options.getOption(OPTION_COLOURDEPTH)) {
        //		case 8:		m_menu.setValue(OM_COLOURDEPTH,0);	break;
        //		case 24:	m_menu.setValue(OM_COLOURDEPTH,2);	break;
        //		case 32:	m_menu.setValue(OM_COLOURDEPTH,3);	break;
        //		default:	m_menu.setValue(OM_COLOURDEPTH,1);	break;
        //		}

        //	m_menu.setValue(OM_PARTICLEFX	,Options.getOption(OPTION_PARTICLEFX));
        //	m_menu.setValue(OM_BACKDROP		,Options.getOption(OPTION_BACKDROP));
    }

    //-------------------------------------------------------------

    public copyMenuToOptions(): void {
        //	Options.setOption(OPTION_HIRES		,m_menu.getValue(OM_HIRES));
        //	Options.setOption(OPTION_WINDOWED	,m_menu.getValue(OM_WINDOWED));

        //	switch (m_menu.getValue(OM_COLOURDEPTH)) {
        //		case 0:	Options.setOption(OPTION_COLOURDEPTH,8);	break;
        //		case 1:	Options.setOption(OPTION_COLOURDEPTH,16);	break;
        //		case 2:	Options.setOption(OPTION_COLOURDEPTH,24);	break;
        //		case 3:	Options.setOption(OPTION_COLOURDEPTH,32);	break;
        //		}

        //	Options.setOption(OPTION_PARTICLEFX	,m_menu.getValue(OM_PARTICLEFX));
        //	Options.setOption(OPTION_BACKDROP	,m_menu.getValue(OM_BACKDROP));
    }

    //-------------------------------------------------------------

    public create(): boolean {

        //	m_menu.clear();

        ////	m_menu.addOptionList("Resolution","320x240","640x480",0);
        //	m_menu.addOptionList("Resolution","640x480","640x480",0);
        //	m_menu.addOptionList("Screen","Full","Window",0);
        //	m_menu.addOptionList("Colour Depth","8-bit","16-bit","24-bit","32-bit",0);
        //	m_menu.addOptionList("Particle FX","Off","On ",0);
        //	m_menu.addOptionList("Backdrop","Off","On ",0);

        //	copyOptionsToMenu();

        //	m_menu.addSeperator();
        //	m_menu.addSelection("Apply");
        //	m_menu.addSelection("Cancel");

        //	m_menu.setWrap(true);
        //	m_menu.setPosition(gsCPoint(0,150));
        //	m_menu.setSpacing(gsCPoint(0,30));
        //	m_menu.setCurrentItem(OM_CANCEL);
        //	m_menu.setFont(&m_medium_font);

        return true;
    }

    //-------------------------------------------------------------

    public update(): boolean {

        //	if (!CGameState::update())
        //		return false;

        //	if (Options.getOption(OPTION_BACKDROP))
        //		m_backdrop.draw(gsCPoint(0,0));
        //	else
        //		m_screen.clear(gsCColour(gsBLACK));

        //	m_starfield.move(4);
        //	m_starfield.draw();

        //	m_medium_font.setTextCursor(gsCPoint(0,50));
        //	m_medium_font.justifyString("Video Options");

        //	m_menu.draw();

        //	m_screen.flip();

        //	VideoMenuItem item = (VideoMenuItem) m_menu.getCurrentItem();

        //	switch (getKey()) {
        //		case gsKEY_RETURN:
        //		case gsKEY_ENTER:
        //		case gsKEY_LCONTROL:
        //			if (item == OM_APPLY) {
        //				CGameState::playSample(SAMPLE_MENU_SELECTION);
        //				copyMenuToOptions();
        //				if (Options.areChanged()) {

        //					gsCFile::setDirectory(DIRECTORY_ROOT);

        //					Options.save(OPTIONS_FILENAME);

        //					if (Options.requireReload()) {
        //						CMessageBoxState::setup("Restart to apply options ?",
        //												"Yes",0,
        //												"No",COptionsMenuState::instance(),
        //												true);
        //						return changeState(CMessageBoxState::instance());
        //						}
        //					else
        //						return changeState(COptionsMenuState::instance());
        //					}
        //				else
        //					return changeState(COptionsMenuState::instance());
        //				}
        //			else if (item == OM_CANCEL) {
        //				CGameState::playSample(SAMPLE_MENU_BACK);
        //				return changeState(COptionsMenuState::instance());
        //				}
        //			break;
        //		case gsKEY_UP:
        //			CGameState::playSample(SAMPLE_MENU_SELECTION);
        //			m_menu.scroll(-1);
        //			break;
        //		case gsKEY_DOWN:
        //			CGameState::playSample(SAMPLE_MENU_SELECTION);
        //			m_menu.scroll(1);
        //			break;
        //		case gsKEY_LEFT:
        //			if (m_menu.setValue(item,m_menu.getValue(item) - 1))
        //				CGameState::playSample(SAMPLE_MENU_OPTION);
        //			break;
        //		case gsKEY_RIGHT:
        //			if (m_menu.setValue(item,m_menu.getValue(item) + 1))
        //				CGameState::playSample(SAMPLE_MENU_OPTION);
        //			break;
        //		}

        return true;
    }

    //-------------------------------------------------------------

}
export = CVideoMenuState;