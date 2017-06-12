import CAlien = require("Alien");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import enums = require("Enums");
import CSporeGenerator = require("SporeGenerator");
import CShip = require("Ship");
import gsCVector = require("Vector");
import CPlayGameState = require("PlayGameState");
import CExplode = require("Exploder");

class CPod extends CAlien {

    //-------------------------------------------------------------

    POD_MAX_XSPEED: number = 0.5;
    POD_XSPEED_SCALE: number = 0.01;

    //-------------------------------------------------------------

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_name = "POD";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_POD);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        this.gameTime = gameTime;
        if (this.m_shield == 0) {

            var gen: CSporeGenerator = new CSporeGenerator(this.m_playGameState);
            this.m_scene.addActor(gen);
            gen.activate();
            gen.setPosition(this.getPosition());

            var explode = new CExplode(this);
            super.kill();
            return true;
        }

        var ship: CShip = this.m_scene.findShip();

        var dx: number = 0.0;

        if (ship != null) {
            dx = ship.getPosition().X - this.m_position.X;
        }

        dx *= this.POD_XSPEED_SCALE;

        if (dx < -this.POD_MAX_XSPEED) {
            dx = -this.POD_MAX_XSPEED;
        }
        if (dx > this.POD_MAX_XSPEED) {
            dx = this.POD_MAX_XSPEED;
        }

        //this.m_position += new gsCVector(dx, this.m_velocity.Y);
        this.m_position.plusEquals(new gsCVector(dx, this.m_velocity.Y));
        super.animate(enums.AnimationMode.ANIMATE_LOOP);

        return true;
    }

    //-------------------------------------------------------------
}
export = CPod;
