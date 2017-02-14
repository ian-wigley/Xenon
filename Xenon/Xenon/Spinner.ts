import CBullet = require("Bullet");

class CSpinner extends CBullet {
    SPINNER_FRAMES: number = 8;

    constructor() {
        super();
    }

    public getActorInfo() {//ActorInfo  
        return null;//ActorInfoList[INFO_SPINNER]; 
    }
}

export = CSpinner;