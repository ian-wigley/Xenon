import CGameState = require("GameState");
import gsCMenu = require("Menu");
import gsCPoint = require("Point");
import Options = require("Options");
import enums = require("Enums");
import CControlMenuState = require("ControlMenuState");
import CVideoMenuState = require("VideoMenuState");
import CAudioMenuState = require("AudioMenuState");
import CMainMenuState = require("MainMenuState");
import CApplication = require("Application");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import gsCControls = require("Controls");

class COptionsMenuState extends CGameState {

    m_options: Options;
    m_controlMenuState: CControlMenuState;
    m_videoMenuState: CVideoMenuState;
    m_audioMenuState: CAudioMenuState;

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menuState?, menu?) {
        super(font8x8, font16x16, app, ctx);

        this.m_starfield = starfield;
        this.m_mainMenuState = menuState;
        this.m_menu = menu;

        this.m_controlMenuState = new CControlMenuState(scene, starfield, font8x8, font16x16, app, ctx, menuState, menu, this);
        this.m_videoMenuState = new CVideoMenuState(scene, starfield, font8x8, font16x16, app, ctx, menuState, menu, this);
        this.m_audioMenuState = new CAudioMenuState(scene, starfield, font8x8, font16x16, app, ctx, menuState, menu, this);

        this.m_stateName = "OptionsMenuState";
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        return this.m_app.instance = this;
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
        // this.m_menu.setCurrentItem(enums.OptionsMenuItem.OM_BACK);
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
        this.m_medium_font.justifyString("Options Menu");
        this.m_menu.draw(ctx);

        var item: enums.OptionsMenuItem = <enums.OptionsMenuItem>this.m_menu.getCurrentItem();

        if (controls.returnPressed || controls.enterPressed || controls.lcontrolPressed) {
            controls.returnPressed = false;
            controls.enterPressed = false;
            controls.lcontrolPressed = false;
            switch (item) {
                case enums.OptionsMenuItem.OM_CONTROL:
                    this.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
                    this.m_controlMenuState.create();
                    return this.changeState(this.m_app.instance = this.m_controlMenuState);
                case enums.OptionsMenuItem.OM_VIDEO:
                    this.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
                    this.m_videoMenuState.create();
                    return this.changeState(this.m_app.instance = this.m_videoMenuState);
                case enums.OptionsMenuItem.OM_AUDIO:
                    this.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
                    this.m_audioMenuState.create();
                    return this.changeState(this.m_app.instance = this.m_audioMenuState);
                case enums.OptionsMenuItem.OM_BACK:
                    this.playSample(enums.GameSampleType.SAMPLE_MENU_BACK);
                    this.m_mainMenuState.create();
                    return this.changeState(this.m_app.instance = this.m_mainMenuState);
                    //return this.changeState(this.m_mainMenuState.instance());
            }
        }
        if (controls.up) {
            controls.up = false;
            this.m_menu.scroll(-1);
            this.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
        }

        if (controls.down) {
            controls.down = false;
            this.m_menu.scroll(1);
            this.playSample(enums.GameSampleType.SAMPLE_MENU_SELECTION);
        }
        return true;
    }

    //-------------------------------------------------------------
}
export = COptionsMenuState;