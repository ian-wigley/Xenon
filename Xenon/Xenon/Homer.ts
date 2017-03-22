import CAlien = require("Alien");
import CHomerProjectileWeapon = require("HomerProjectileWeapon");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import enums = require("Enums");
import CShip = require("Ship");
import gsCVector = require("Vector");

import CExplosion = require("Explosion");
import CSmallExplosion = require("SmallExplosion");
import CMediumExplosion = require("MediumExplosion");
import CBigExplosion = require("BigExplosion");
import gsCPoint = require("Point");

class CHomer extends CAlien {
    HOMER_MAX_XSPEED: number = 3.0;
    HOMER_XSPEED_SCALE: number = 0.025;

    constructor() {
        super();
        this.m_name = "Homer";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMER);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        //this.gameTime = gameTime;

        if (this.m_shield == 0) {

            var weapon: CHomerProjectileWeapon = new CHomerProjectileWeapon();
            this.m_scene.addActor(weapon);
            weapon.activate();
            weapon.setOwner(this);
            weapon.setOffset(new gsCVector(0.0, 0.0));
            weapon.detonate();

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
        dx *= this.HOMER_XSPEED_SCALE;

        if (dx < -this.HOMER_MAX_XSPEED) {
            dx = -this.HOMER_MAX_XSPEED;
        }
        if (dx > this.HOMER_MAX_XSPEED) {
            dx = this.HOMER_MAX_XSPEED;
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

export = CHomer;