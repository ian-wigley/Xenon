import CAlien = require("Alien");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import enums = require("Enums");
import CSporeGenerator = require("SporeGenerator");
import CShip = require("Ship");
import gsCVector = require("Vector");


import CExplosion = require("Explosion");
import CSmallExplosion = require("SmallExplosion");
import CMediumExplosion = require("MediumExplosion");
import CBigExplosion = require("BigExplosion");
import gsCPoint = require("Point");

class CPod extends CAlien {

    //-------------------------------------------------------------

    POD_MAX_XSPEED: number = 0.5;
    POD_XSPEED_SCALE: number = 0.01;

    //-------------------------------------------------------------

    constructor() {
        super();
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

            var gen: CSporeGenerator = new CSporeGenerator();
            this.m_scene.addActor(gen);
            gen.activate();
            gen.setPosition(this.getPosition());

            //super.explode();
            this.explode();
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

    public explode() {
        var x: CExplosion = null;
        if (this.m_image != null) {
            var size: gsCPoint = this.m_image.getTileSize();
            var area = size.X * size.Y;
            if (area <= 32 * 32) {
                x = new CSmallExplosion();
            }
            else if (area <= 64 * 64) {
                x = new CMediumExplosion();
            }
            else {
                x = new CBigExplosion();
            }
            this.m_scene.addActor(x);
            x.setPosition(this.getPosition());
            x.activate();
        }
    }

    //-------------------------------------------------------------
}
export = CPod;
