enum OrganicGunState {
    ORGANICGUN_STILL,
    ORGANICGUN_SHOOTING,
}

//-------------------------------------------------------------
import CActor = require("Actor")
import gsCControls = require("Controls")
import enums = require("Enums");

class COrganicGun extends CActor {
    //-------------------------------------------------------------

    ORGANICGUN_SHOT_START: number = 0;
    ORGANICGUN_SHOT_FRAMES: number = 8;
    ORGANICGUN_LAUNCH_FRAME: number = 6;

    ORGANICGUN_LEFT: number = 0;
    ORGANICGUN_RIGHT: number = 8;

    ORGANICGUN_STILL_TIME = 1.0;

    //-------------------------------------------------------------

    //public COrganicGun() {
    //}

    public getActorInfo() { //: ActorInfo {
        return null;// ActorInfoList[INFO_ORGANIC_GUN]; 
    }

    public activate(): boolean {
        return false;
    }

    public kill(): void { }

    public setDirection(dir: number): void { }

    public onLeavingScreen(): void { }

    //update(controls: gsCControls, gameTime: gsCTimer) {
    public update(controls: gsCControls): boolean {
        return false;
    }
}
export = COrganicGun;