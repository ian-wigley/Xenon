import CGameState = require("GameState");

class CControlmenustate extends CGameState {

    m_instance = null;

    constructor() {
        super();
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        if (!this.m_instance)
            this.m_instance = new CControlmenustate();
        return this.m_instance;
    }


    //-------------------------------------------------------------

    //void CControlMenuState::copyOptionsToMenu()
    //{
    //	m_menu.setValue(CM_CONTROL1	,Options.getOption(OPTION_CONTROL1));
    //	m_menu.setValue(CM_CONTROL2	,Options.getOption(OPTION_CONTROL2));
    //}

    ////-------------------------------------------------------------

    //void CControlMenuState::copyMenuToOptions()
    //{
    //	Options.setOption(OPTION_CONTROL1	,m_menu.getValue(CM_CONTROL1));
    //	Options.setOption(OPTION_CONTROL2	,m_menu.getValue(CM_CONTROL2));
    //}

    ////-------------------------------------------------------------

    public create(): boolean {
    //	m_menu.clear();

    ////	m_menu.addOptionList("Player 1","Keyboard Layout A","Keyboard Layout B","Joystick 1","Joystick 2",0);
    ////	m_menu.addOptionList("Player 2","Keyboard Layout A","Keyboard Layout B","Joystick 1","Joystick 2",0);

    //	m_menu.addOptionList("Player 1","Keyboard Layout A","Keyboard Layout B",0);
    //	m_menu.addOptionList("Player 2","Keyboard Layout A","Keyboard Layout B",0);

    //	m_menu.addSeperator();
    //	m_menu.addSelection("Apply");
    //	m_menu.addSelection("Cancel");

    //	m_menu.setWrap(true);
    //	m_menu.setPosition(gsCPoint(0,100));
    //	m_menu.setSpacing(gsCPoint(0,30));
    //	m_menu.setCurrentItem(CM_CANCEL);
    //	m_menu.setFont(&m_medium_font);

    //	copyOptionsToMenu();

    	return true;
    }

    //-------------------------------------------------------------

    public update(): boolean {
        //	const char *move_names[4] = { "Cursor Keys", "Cursor Keys","Joystick 1","Joystick 2" };
        //	const char *fire_names[4] = { "Left Control","A","Button 0","Button 0" };
        //	const char *rev_names[4]  = { "Left Alt",    "S","Button 1","Button 1" };
        //	const char *dive_names[4] = { "Left Shift",  "D","Button 2","Button 2" };

        //	if (!CGameState::update())
        //		return false;

        //	if (Options.getOption(OPTION_BACKDROP))
        //		m_backdrop.draw(gsCPoint(0,0));
        //	else
        //		m_screen.clear(gsCColour(gsBLACK));

        //	m_starfield.move(4);
        //	m_starfield.draw();

        //	m_medium_font.setTextCursor(gsCPoint(0,50));
        //	m_medium_font.justifyString("Control Options");

        //	m_menu.draw();

        //	m_small_font.setTextCursor(gsCPoint(200,300));
        //	m_small_font.printString("Player 1");
        //	m_small_font.setTextCursor(gsCPoint(400,300));
        //	m_small_font.printString("Player 2");

        //	m_small_font.setTextCursor(gsCPoint(50,330));
        //	m_small_font.printString("Movement:");
        //	m_small_font.setTextCursor(gsCPoint(50,350));
        //	m_small_font.printString("Fire:");
        //	m_small_font.setTextCursor(gsCPoint(50,370));
        //	m_small_font.printString("Reverse:");
        //	m_small_font.setTextCursor(gsCPoint(50,390));
        //	m_small_font.printString("Dive:");

        //	int control1 = m_menu.getValue(CM_CONTROL1);

        //	m_small_font.setTextCursor(gsCPoint(200,330));
        //	m_small_font.printString(move_names[control1]);
        //	m_small_font.setTextCursor(gsCPoint(200,350));
        //	m_small_font.printString(fire_names[control1]);
        //	m_small_font.setTextCursor(gsCPoint(200,370));
        //	m_small_font.printString(rev_names[control1]);
        //	m_small_font.setTextCursor(gsCPoint(200,390));
        //	m_small_font.printString(dive_names[control1]);

        //	int control2 = m_menu.getValue(CM_CONTROL2);

        //	m_small_font.setTextCursor(gsCPoint(400,330));
        //	m_small_font.printString(move_names[control2]);
        //	m_small_font.setTextCursor(gsCPoint(400,350));
        //	m_small_font.printString(fire_names[control2]);
        //	m_small_font.setTextCursor(gsCPoint(400,370));
        //	m_small_font.printString(rev_names[control2]);
        //	m_small_font.setTextCursor(gsCPoint(400,390));
        //	m_small_font.printString(dive_names[control2]);

        //	m_screen.flip();

        //	ControlMenuItem item = (ControlMenuItem) m_menu.getCurrentItem();

        //	switch (getKey()) {
        //		case gsKEY_RETURN:
        //		case gsKEY_ENTER:
        //		case gsKEY_LCONTROL:
        //			if (item == CM_APPLY) {
        //				CGameState::playSample(SAMPLE_MENU_SELECTION);
        //				copyMenuToOptions();
        //				if (Options.areChanged()) {

        //					gsCFile::setDirectory(DIRECTORY_ROOT);

        //					Options.save(OPTIONS_FILENAME);

        //					updateVolume();

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
        //			else if (item == CM_CANCEL) {
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

export = CControlmenustate;