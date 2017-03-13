import CActor = require("Actor");
import gsCFont = require("Font");
import gsCPoint = require("Point");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import enums = require("Enums");

class CLabel extends CActor {

    //-------------------------------------------------------------

    LABEL_MAX_SIZE: number = 40;

    //-------------------------------------------------------------

    private m_text: string;//[this.LABEL_MAX_SIZE];
    private m_time: number;
    private m_offset: gsCPoint;
    private m_font: gsCFont;

    constructor() {
        super();
        this.m_text = "";
        this.m_time = 0.0;
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_LABEL);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive())
            this.m_timer.start();

        return super.activate();
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
        this.kill();
    }

    //-------------------------------------------------------------

    public setText(format: string): void {
        //va_list arglist;

        //va_start(arglist, format);
        //vsprintf(m_text, format, arglist);
        //va_end(arglist);

        if (this.m_font) {
            var stringLength = this.m_font.getStringSize(this.m_text);// / -2;
            //this.m_offset = new gsCPoint(this.m_font.getStringSize(this.m_text) / -2, -2);// new gsCPoint(-2, -2);
            this.m_offset = new gsCPoint((stringLength.X / -2), stringLength.X / -2);// new gsCPoint(-2, -2);
        } else {
            this.m_offset = new gsCPoint(0, 0);
        }
    }

    //-------------------------------------------------------------

    public setTime(seconds: number): void {
        this.m_time = seconds;
    }

    //-------------------------------------------------------------

    public setFont(font: gsCFont) {
        this.m_font = font;
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        if (this.m_timer.getTime() >= this.m_time) {
            this.kill();
            return true;
        }

        this.m_position.plusEquals(this.m_velocity);

        return true;
    }

    //-------------------------------------------------------------

    public draw(ctx: CanvasRenderingContext2D): boolean {
        if (this.m_font) {
            this.m_font.setTextCursor(new gsCPoint(this.m_position.X, this.m_position.Y).add(this.m_offset).add(this.m_scene.getMap().getPosition()));
            this.m_font.printString(this.m_text);
        }

        return true;
    }

    //-------------------------------------------------------------


}
export = CLabel;