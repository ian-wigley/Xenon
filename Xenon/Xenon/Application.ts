import CGameState = require("GameState");
import CPlayGameState = require("PlayGameState");
import gsCFont = require("Font");
import gsCPoint = require("Point");

class CApplication {

    private m_instance: CGameState;
    private m_small_font: gsCFont;

    constructor(font8x8: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        this.m_small_font = new gsCFont(font8x8, ctx);
        this.m_small_font.setTileSize(new gsCPoint(8, 8));
    }

    //-------------------------------------------------------------

    public set instance(value: CGameState) {
        this.m_instance = value;
    }

    //-------------------------------------------------------------

    public get instance(): CGameState {
        return this.m_instance;
    }

    //-------------------------------------------------------------

    public get playStateInstance(): CPlayGameState {
        return <CPlayGameState>this.m_instance;
    }

    //-------------------------------------------------------------

    public get smallFont(): gsCFont {
        return this.m_small_font;
    }
}
export = CApplication;