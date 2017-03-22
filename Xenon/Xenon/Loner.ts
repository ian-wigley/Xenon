import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CAlien = require("Alien");
import enums = require("Enums");
import ActorInfo = require("ActorInfo")
import CShip = require("Ship");
import gsCVector = require("Vector");
import CSpinnerWeapon = require("SpinnerWeapon");

import CExplosion = require("Explosion");
import CSmallExplosion = require("SmallExplosion");
import CMediumExplosion = require("MediumExplosion");
import CBigExplosion = require("BigExplosion");
import gsCPoint = require("Point");


export = Loner;
module Loner {

    export class CLoner extends CAlien {

        m_weapon: CSpinnerWeapon;

        constructor() {
            super();
            this.m_name = "Loner";
        }

        //-------------------------------------------------------------

        public activate(): boolean {
            if (!this.isActive()) {
                this.m_weapon = new CSpinnerWeapon();
                this.m_scene.addActor(this.m_weapon);
                this.m_weapon.activate();
                this.m_weapon.setOwner(this);
                this.m_weapon.setOffset(new gsCVector(0.0, 0.0));
                this.m_timer.start();
            }
            return super.activate();
        }

        //-------------------------------------------------------------

        public kill(): void {
            if (this.m_weapon != null) {
                this.m_weapon.kill();
                this.m_weapon = null;
            }
            super.kill();
            //CActor::kill();
        }

        //-------------------------------------------------------------

        public update(controls: gsCControls, gameTime: gsCTimer): boolean {
            //this.gameTime = gametime;
            if (this.m_shield == 0) {
                //super.explode();
                this.explode();
                super.kill();
                return true;
            }

            var ship: CShip = this.m_scene.findShip();

            //fire weapon towards ship
            if (ship != null) {
                var dir: gsCVector = ship.getPosition().minus(this.getPosition());
                dir.normalize();
                //this.m_weapon.setDirection(dir);
            }

            this.m_position.plusEquals(this.m_velocity);
            this.animate(enums.AnimationMode.ANIMATE_LOOP);

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
    }

    //-------------------------------------------------------------

    export class CStandardLoner extends CLoner {

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_STANDARD_LONER);
        }
    }

    //-------------------------------------------------------------

    export class CMediumLoner extends CLoner {

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MEDIUM_LONER);
        }
    }

    //-------------------------------------------------------------

    export class CArmouredLoner extends CLoner {

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_ARMOURED_LONER);
        }
    }

    //-------------------------------------------------------------
}