import CAlien = require("Alien");
import CHomerProjectileWeapon = require("HomerProjectileWeapon");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import enums = require("Enums");
import CShip = require("Ship");
import gsCVector = require("Vector");

class CHomer extends CAlien {
    HOMER_MAX_XSPEED: number = 3.0;
    HOMER_XSPEED_SCALE: number = 0.025;

    constructor() {
        super();
    }

    public getActorInfo() { //: ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMER);
    }

    public activate(): boolean {
        return super.activate();
    }

    //public override bool update(Controls controls, GameTime gametime) {
    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        this.gameTime = gameTime;

        if (this.m_shield == 0) { //null) 

            var weapon: CHomerProjectileWeapon = new CHomerProjectileWeapon();
            //m_scene.addActor(weapon);
            //weapon.activate();
            //weapon.setOwner(this);
            //weapon.setOffset(new Vector2(0.0f, 0.0f));
            //weapon.detonate();

            super.explode();
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
}

export = CHomer;