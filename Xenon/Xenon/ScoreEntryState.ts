import CGameState = require("GameState");
import gsCControls = require("Controls");
import gsCScreen = require("Screen");
import CApplication = require("Application");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import enums = require("Enums");
import Options = require("Options");
import gsCPoint = require("Point");

class CScoreEntryState extends CGameState {

    m_congratulation_messages: Array<string>;
    m_instance: CScoreEntryState = null;

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menuState?) {
        super(font8x8, font16x16, app, ctx);
        this.m_starfield = starfield;
        this.m_mainMenuState = menuState;

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
        return this.m_app.instance = this;
    }

    //-------------------------------------------------------------

    public create(): boolean {
        //stopSamples();
        //playMusic(MUSIC_HISCORE);
       return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: gsCControls): boolean {
        //if (!CGameState::update())
        //	return false;

        var screen: gsCScreen = new gsCScreen();

        if (this.m_options.getOption(enums.OptionType.OPTION_BACKDROP)) {
            ctx.drawImage(this.backgroundTexture, 0, 0);
        }

        this.m_starfield.Update(4);
        this.m_starfield.Draw(ctx);

        //char *m = m_congratulation_messages[m_score_table.getCurrentItem()];
        var m = this.m_congratulation_messages[this.m_score_table.getCurrentItem()];

        this.m_medium_font.setTextCursor(new gsCPoint(0, 50));
        this.m_medium_font.justifyString(m);

        this.m_score_table.draw(this.m_medium_font, ctx);
        //(screen: gsCScreen, font: gsCFont, ctx: CanvasRenderingContext2D)

        this.m_medium_font.setTextCursor(new gsCPoint(0, 400));
        this.m_medium_font.justifyString("Use Movement Keys To Enter Your Name");
        this.m_medium_font.setTextCursor(new gsCPoint(0, 430));
        this.m_medium_font.justifyString("Press Fire To Exit To Main Menu");


        if (controls.returnPressed || controls.enterPressed || controls.lcontrolPressed) {
            controls.returnPressed = false;
            controls.enterPressed = false;
            controls.lcontrolPressed = false;
            //playSample(SAMPLE_MENU_BACK);
            return this.changeState(this.m_app.instance = this.m_mainMenuState);
        }

        if (controls.up) {
            controls.up = false;
            //		playSample(SAMPLE_MENU_OPTION);
            this.m_score_table.cycleLetter(1);
        }

        if (controls.down) {
            controls.down = false;
            //		playSample(SAMPLE_MENU_OPTION);
            this.m_score_table.cycleLetter(-1);
        }

        if (controls.left) {
            controls.left = false;
            //		playSample(SAMPLE_MENU_SELECTION);
            this.m_score_table.scrollLetter(-1);
        }

        if (controls.right) {
            controls.right = false;
            //		playSample(SAMPLE_MENU_SELECTION);
            this.m_score_table.scrollLetter(1);
        }

        //if (m_sound_system.isMusicFinished())
        //	playMusic(MUSIC_HISCORE);

        return true;
    }

    //-------------------------------------------------------------

}

export = CScoreEntryState;