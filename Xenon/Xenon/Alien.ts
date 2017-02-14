import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CActor = require("Actor");

class CAlien extends CActor {

    constructor() {
        super();
    }

    public onLeavingScreen(): void
    {
        super.kill();
    }

    public activate(): boolean{
        return super.activate();
    }

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        this.gameTime = gameTime;
        return super.update(controls, gameTime);
    }
}

export = CAlien;