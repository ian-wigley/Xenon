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
    }

    public getActorInfo() //:ActorInfo
    {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_RUSHER);
    }

    public activate(): boolean {
        if (!this.isActive()) {

            //if (m_random.getInt(100) < 25) 
            //{
            //    this.m_weapon = new CSpinnerWeapon();
            //    this.m_scene.addActor(this.m_weapon);
            //    this.m_weapon.activate();
            //    this.m_weapon.setOwner(this);
            //    this.m_weapon.setOffset(new gsCVector(0.0, 0.0));
            //}

            //m_timer.start();
        }

        return super.activate();
    }

    //-------------------------------------------------------------
    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        {
            this.gameTime = gameTime;

            if (this.m_shield == 0) {
                super.explode();
                super.kill();
                return true;
            }

            //if (this.m_weapon != null) {
            //    var ship: CShip = this.m_scene.findShip();

            //    //// fire weapon towards ship

            //    if (ship != null && getPosition().Y < ship.getPosition().Y) {
            //        Vector2 dir = ship.getPosition() - getPosition();
            //        dir.Normalize();
            //        m_weapon.setDirection(dir);
            //    }
            //}

            //this.m_position += this.m_velocity;

            super.animate(enums.AnimationMode.ANIMATE_LOOP);

            return true;
        }

        //-------------------------------------------------------------

    }
}
export = CRusher;