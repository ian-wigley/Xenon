import CBullet = require("Bullet");
import enums = require("Enums");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CPlayGameState = require("PlayGameState");

class CSpinner extends CBullet {
    private SPINNER_FRAMES: number = 8;

    constructor(playGameState: CPlayGameState) {
        super(playGameState);
        this.m_name = "Spinner";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SPINNER);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive())
            this.m_timer.start();
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer) {
        super.update(controls, gameTime);
        if (this.m_shield == 0) {
            this.kill();
            return true;
        }
        this.m_position.plusEquals(this.m_velocity);
        this.animations(enums.AnimationMode.ANIMATE_LOOP, this.m_grade * this.SPINNER_FRAMES, this.SPINNER_FRAMES);
        return true;
    }

}

export = CSpinner;