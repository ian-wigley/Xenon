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

class CAudioMenuState extends CGameState {

    m_optionState: COptionsMenuState;

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menuState?, menu?, optionState?: COptionsMenuState) {
        super(font8x8, font16x16, app, ctx);

        this.m_starfield = starfield;
        this.m_mainMenuState = menuState;
        this.m_menu = menu;
        this.m_optionState = optionState;

        this.m_stateName = "AudioMenuState";
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        return this.m_app.instance = this;
    }

    //-------------------------------------------------------------

    public copyOptionsToMenu(): void {
        this.m_menu.setValue(enums.AudioMenuItem.OM_MUSIC, this.m_options.getOption(enums.OptionType.OPTION_MUSIC));
        this.m_menu.setValue(enums.AudioMenuItem.OM_SOUNDFX, this.m_options.getOption(enums.OptionType.OPTION_SOUNDFX));
    }

    //-------------------------------------------------------------

    public copyMenuToOptions(): void {
        this.m_options.setOption(enums.OptionType.OPTION_MUSIC, this.m_menu.getValue(enums.AudioMenuItem.OM_MUSIC));
        this.m_options.setOption(enums.OptionType.OPTION_SOUNDFX, this.m_menu.getValue(enums.AudioMenuItem.OM_SOUNDFX));
    }

    //-------------------------------------------------------------

    public create(): boolean {
        this.m_menu.clear();
        this.m_menu.addSlider("   Music", 10, 0, 10);
        this.m_menu.addSlider("Sound FX", 10, 0, 10);
        this.copyOptionsToMenu();
        //this.m_menu.addSeperator();
        this.m_menu.addSelection("Apply");
        this.m_menu.addSelection("Cancel");
        this.m_menu.setWrap(true);
        this.m_menu.setPosition(new gsCPoint(0, 150));
        this.m_menu.setSpacing(new gsCPoint(0, 30));
        this.m_menu.setCurrentItem(enums.AudioMenuItem.OM_CANCEL);
        this.m_menu.setFont(this.m_medium_font);

        return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: gsCControls): boolean {

        //	if (!CGameState::update())
        //		return false;

        if (this.m_options.getOption(enums.OptionType.OPTION_BACKDROP)) {
            ctx.drawImage(this.backgroundTexture, 0, 0);
        }

        this.m_starfield.Update(4);
        this.m_starfield.Draw(ctx);
        this.m_medium_font.setTextCursor(new gsCPoint(0, 50));
        this.m_medium_font.justifyString("Audio Options");
        this.m_menu.draw(ctx);

        var item: enums.AudioMenuItem = <enums.AudioMenuItem>this.m_menu.getCurrentItem();

        if (controls.returnPressed || controls.enterPressed || controls.lcontrolPressed) {
            controls.returnPressed = false;
            controls.enterPressed = false;
            controls.lcontrolPressed = false;

            if (item == enums.AudioMenuItem.OM_APPLY) {
                super.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
                this.copyMenuToOptions();
                if (this.m_options.areChanged()) {
                    //gsCFile::setDirectory(DIRECTORY_ROOT);
                    //Options.save(OPTIONS_FILENAME);
                    //updateVolume();
                    //if (Options.requireReload()) {
                    //CMessageBoxState::setup("Restart to apply options ?",
                    //							"Yes",0,
                    //							"No",COptionsMenuState::instance(),
                    //							true);
                    //return changeState(CMessageBoxState::instance());
                    return;
                }
                else {
                    return this.changeState(this.m_app.instance = this.m_optionState);
                }
                //}
                //else {
                //    return this.changeState(this.m_app.instance = this.m_optionState);
                //}
            }
            else if (item == enums.AudioMenuItem.OM_CANCEL) {
                super.playSample(enums.GameSampleType.SAMPLE_MENU_BACK);
                return this.changeState(this.m_app.instance = this.m_optionState);
            }
        }

        if (controls.up) {
            super.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
            this.m_menu.scroll(-1);
        }
        if (controls.down) {
            super.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
            this.m_menu.scroll(1);
        }
        if (controls.left) {
            if (this.m_menu.setValue(item, this.m_menu.getValue(item) - 1)) {
                super.playSample(enums.GameSampleType.SAMPLE_MENU_OPTION);
            }
        }
        if (controls.right) {
            if (this.m_menu.setValue(item, this.m_menu.getValue(item) + 1)) {
                super.playSample(enums.GameSampleType.SAMPLE_MENU_OPTION);
            }
        }
        return true;
    }

    //-------------------------------------------------------------
}

export = CAudioMenuState;