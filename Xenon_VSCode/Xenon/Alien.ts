import CActor = require("Actor");

class CAlien extends CActor {

    constructor() {
        super();
        this.m_name = "Alien";
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
        super.kill();
    }

    //-------------------------------------------------------------
}

export = CAlien;