import CActor = require("Actor");

class CExplosion extends CActor {
    public CExplosion() {
    }

    activate() {
        if (!this.isActive()) {
            //	m_timer.start();
        }

        return super.activate();
    }

    //update(controls: Controls, gametime: GameTime) {
    //    this.gameTime = gametime;
    //    //this.m_position += this.m_velocity;

    //    if (super.animate(AnimationMode.ANIMATE_ONESHOT)) {
    //        super.kill();
    //    }

    //    return true;
    //}

    onLeavingScreen() {
        super.kill();
    }

}
export = CExplosion;