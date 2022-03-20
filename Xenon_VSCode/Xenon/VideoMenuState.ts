import CGameState = require("GameState");
import CApplication = require("Application");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import gsCControls = require("Controls");
import enums = require("Enums");
import Options = require("Options");
import gsCPoint = require("Point");
import gsCMenu = require("Menu");
import COptionsMenuState = require("OptionsMenuState");

class CVideoMenuState extends CGameState {

    m_optionState: COptionsMenuState;

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menuState?, menu?, optionState?: COptionsMenuState) {
        super(font8x8, font16x16, app, ctx);

        this.m_starfield = starfield;
        this.m_mainMenuState = menuState;
        this.m_menu = menu;
        this.m_optionState = optionState;

        this.m_stateName = "VideoMenuState";
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        return this.m_app.instance = this;
    }

    //-------------------------------------------------------------

    public copyOptionsToMenu(): void {

        this.m_menu.setValue(enums.VideoMenuItem.OM_HIRES, this.m_options.getOption(enums.OptionType.OPTION_HIRES));
        this.m_menu.setValue(enums.VideoMenuItem.OM_WINDOWED, this.m_options.getOption(enums.OptionType.OPTION_WINDOWED));

        switch (this.m_options.getOption(enums.OptionType.OPTION_COLOURDEPTH)) {
            case 8: this.m_menu.setValue(enums.VideoMenuItem.OM_COLOURDEPTH, 0); break;
            case 24: this.m_menu.setValue(enums.VideoMenuItem.OM_COLOURDEPTH, 2); break;
            case 32: this.m_menu.setValue(enums.VideoMenuItem.OM_COLOURDEPTH, 3); break;
            default: this.m_menu.setValue(enums.VideoMenuItem.OM_COLOURDEPTH, 1); break;
        }

        this.m_menu.setValue(enums.VideoMenuItem.OM_PARTICLEFX, this.m_options.getOption(enums.OptionType.OPTION_PARTICLEFX));
        this.m_menu.setValue(enums.VideoMenuItem.OM_BACKDROP, this.m_options.getOption(enums.OptionType.OPTION_BACKDROP));
    }

    //-------------------------------------------------------------

    public copyMenuToOptions(): void {
        this.m_options.setOption(enums.OptionType.OPTION_HIRES, this.m_menu.getValue(enums.VideoMenuItem.OM_HIRES));
        this.m_options.setOption(enums.OptionType.OPTION_WINDOWED, this.m_menu.getValue(enums.VideoMenuItem.OM_WINDOWED));

        switch (this.m_menu.getValue(enums.VideoMenuItem.OM_COLOURDEPTH)) {
            case 0: this.m_options.setOption(enums.OptionType.OPTION_COLOURDEPTH, 8); break;
            case 1: this.m_options.setOption(enums.OptionType.OPTION_COLOURDEPTH, 16); break;
            case 2: this.m_options.setOption(enums.OptionType.OPTION_COLOURDEPTH, 24); break;
            case 3: this.m_options.setOption(enums.OptionType.OPTION_COLOURDEPTH, 32); break;
        }

        this.m_options.setOption(enums.OptionType.OPTION_PARTICLEFX, this.m_menu.getValue(enums.VideoMenuItem.OM_PARTICLEFX));
        this.m_options.setOption(enums.OptionType.OPTION_BACKDROP, this.m_menu.getValue(enums.VideoMenuItem.OM_BACKDROP));
    }

    //-------------------------------------------------------------

    public create(): boolean {

        this.m_menu.clear();

        //	m_menu.addOptionList("Resolution","320x240","640x480",0);
        this.m_menu.addOptionList("Resolution " + "640x480 " + "640x480 ", 0);
        this.m_menu.addOptionList("Screen " + "Full " + "Window ", 0);
        this.m_menu.addOptionList("Colour Depth " + "8-bit " + "16-bit " + "24-bit " + "32-bit ", 0);
        this.m_menu.addOptionList("Particle FX " + "Off" + "On ", 0);
        this.m_menu.addOptionList("Backdrop " + "Off " + "On ", 0);

        this.copyOptionsToMenu();

        //this.m_menu.addSeperator();
        this.m_menu.addSelection("Apply");
        this.m_menu.addSelection("Cancel");

        this.m_menu.setWrap(true);
        this.m_menu.setPosition(new gsCPoint(0, 150));
        this.m_menu.setSpacing(new gsCPoint(0, 30));
        this.m_menu.setCurrentItem(0);//enums.VideoMenuItem.OM_CANCEL);
        this.m_menu.setFont(this.m_medium_font);

        return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: gsCControls): boolean {

        if (this.m_options.getOption(enums.OptionType.OPTION_BACKDROP)) {
            ctx.drawImage(this.backgroundTexture, 0, 0);
        }

        this.m_starfield.Update(4);
        this.m_starfield.Draw(ctx);

        this.m_medium_font.setTextCursor(new gsCPoint(0, 50));
        this.m_medium_font.justifyString("Video Options");

        this.m_menu.draw(ctx);

        var item: enums.VideoMenuItem = <enums.VideoMenuItem>this.m_menu.getCurrentItem();

        if (controls.returnPressed || controls.enterPressed || controls.lcontrolPressed) {
            controls.returnPressed = false;
            controls.enterPressed = false;
            controls.lcontrolPressed = false;
            if (item == enums.VideoMenuItem.OM_APPLY) {
                super.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
                this.copyMenuToOptions();
                if (this.m_options.areChanged()) {
                    //gsCFile::setDirectory(DIRECTORY_ROOT);
                    //Options.save(OPTIONS_FILENAME);

                    if (this.m_options.requireReload()) {
                        //CMessageBoxState::setup("Restart to apply options ?",
                        //						"Yes",0,
                        //						"No",COptionsMenuState::instance(),
                        //						true);
                        return;//this.changeState(CMessageBoxState::instance());
                    }
                    else {
                        this.m_optionState.create();
                        return this.changeState(this.m_app.instance = this.m_optionState);
                    }
                }
                else {
                    this.m_optionState.create();
                    return this.changeState(this.m_app.instance = this.m_optionState);
                }
            }
            else if (item == enums.VideoMenuItem.OM_CANCEL) {
                super.playSample(enums.GameSampleType.SAMPLE_MENU_BACK);
                this.m_optionState.create();
                return this.changeState(this.m_app.instance = this.m_optionState);
            }
        }
        if (controls.up) {
            controls.up = false;
            super.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
            this.m_menu.scroll(-1);
        }

        if (controls.down) {
            controls.down = false;
            super.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
            this.m_menu.scroll(1);
        }

        if (controls.left) {
            controls.left = false;
            if (this.m_menu.setValue(item, this.m_menu.getValue(item) - 1)) {
                super.playSample(enums.GameSampleType.SAMPLE_MENU_OPTION);
            }
        }
        if (controls.right) {
            controls.right = false;
            if (this.m_menu.setValue(item, this.m_menu.getValue(item) + 1)) {
                super.playSample(enums.GameSampleType.SAMPLE_MENU_OPTION);
            }
        }
        return true;
    }

    //-------------------------------------------------------------

}
export = CVideoMenuState;