import CGameState = require("GameState");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import gsCControls = require("Controls");
import enums = require("Enums");
import CPlayGameState = require("PlayGameState");
import CApplication = require("Application");

class CIntroState extends CGameState {

    m_playGameState: CPlayGameState;
    m_originalState: CIntroState;

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menu?) {
        super(font8x8, font16x16, app, ctx);

        this.m_playGameState = new CPlayGameState(scene, starfield, font8x8, font16x16, app, ctx, menu);

        this.m_stateName = "IntroState";

        this.create(); //TEMP!
    }

    public instance(): CGameState {
        this.m_app.instance = this.m_playGameState;
        return this.m_app.instance
    }

    //-------------------------------------------------------------

    public create(): boolean {
        this.playMusic(enums.GameMusicType.MUSIC_INTRO);
        this.m_state = this;
        this.m_originalState = this;
    	return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: gsCControls): boolean {
    	if (!super.update(ctx, controls)){
    		return false;
        }

        if (this.m_state != this.m_originalState) {
            this.m_state.update(ctx, controls);
        }

        return this.changeState(this.m_playGameState.instance());
    }

    //-------------------------------------------------------------

}

export = CIntroState;