import CAlien = require("Alien");
import CShip = require("Ship");
import CSpinnerWeapon = require("SpinnerWeapon");
import gsCVector = require("Vector");
import enums = require("Enums");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");

class CRusher extends CAlien {
    private m_weapon: CSpinnerWeapon;

    constructor() {
        super();
        this.m_weapon = null;
        //this.m_timer = new gsCTimer();
        this.m_name = "Rusher";
    }

    //-------------------------------------------------------------

    public getActorInfo()
    {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_RUSHER);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {

            //if (m_random.getInt(100) < 25) 
            //{
            this.m_weapon = new CSpinnerWeapon();
            this.m_scene.addActor(this.m_weapon);
            this.m_weapon.activate();
            this.m_weapon.setOwner(this);
            this.m_weapon.setOffset(new gsCVector(0.0, 0.0));
            //}

            this.m_timer.start();
        }

        return super.activate();
    }

    //-------------------------------------------------------------
    public update(controls: gsCControls, gameTime: gsCTimer): boolean {

        if (this.m_shield == 0) {
            //super.explode();
            super.kill();
            return true;
        }

        if (this.m_weapon != null) {
            var ship: CShip = this.m_scene.findShip();

            // fire weapon towards ship
            if (ship != null && this.getPosition().Y < ship.getPosition().Y) {
                var dir: gsCVector = ship.getPosition().minus(this.getPosition());
                dir.normalize();
                this.m_weapon.setDirectionS(dir);
            }
        }

        this.m_position.plusEquals(this.m_velocity);
        super.animate(enums.AnimationMode.ANIMATE_LOOP);
        return true;
    }

    //-------------------------------------------------------------

}
export = CRusher;