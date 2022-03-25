import CActor = require("Actor");
import CShip = require("Ship");
import Controls = require("Controls");
import enums = require("Enums");
import gsCTimer = require("Timer");
import CPlayGameState = require("PlayGameState");

export = Pickups;
module Pickups {

    export class CPickup extends CActor {

        protected m_playGameState: CPlayGameState;
        CLOAK_TIME: number = 5.0;			// total length of cloaking

        constructor(playGameState: CPlayGameState) {
            super();
            this.m_playGameState = playGameState;
        }

        //-------------------------------------------------------------

        public activate() {
            if (!this.isActive())
                this.m_timer.start();

            return super.activate();
        }

        //-------------------------------------------------------------

        public update(controls: Controls, gametime: gsCTimer) {
            this.animate(enums.AnimationMode.ANIMATE_LOOP);
            return true;
        }

        //-------------------------------------------------------------

        public onLeavingScreen() {
            this.kill();
        }

        //-------------------------------------------------------------

        public collect() {
        }
    }

    //-------------------------------------------------------------

    export class CClonePickup extends CPickup {

        m_name = "PICKUP_CLONE";
        CLONE_FRAMES: number = 16;

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_CLONE_PICKUP);
        }

        //-------------------------------------------------------------

        public collect(): void {
            var ship: CShip = this.m_scene.findShip();

            if (!ship) {
                return;
            }

            this.m_scene.createLabel(this.getPosition(), "CLONE");

            if (this.getPosition().X <= ship.getPosition().X)
                ship.attachClone(-1);
            else
                ship.attachClone(1);

            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_FIRE_MISSILE);//getPosition().getX());
        }

        //-------------------------------------------------------------

        public update(controls: Controls, gametime: gsCTimer) {
            this.animations(enums.AnimationMode.ANIMATE_LOOP, 0, this.CLONE_FRAMES);
            return true;
        }
    }

    //-------------------------------------------------------------

    export class CDivePickup extends CPickup {

        m_name = "PICKUP_DIVE";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_DIVE_PICKUP);
        }

        //-------------------------------------------------------------

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship) {
                return;
            }

            this.m_scene.createLabel(this.getPosition(), "DIVE");
            this.m_playGameState.getPlayer().diveBonus();
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_BONUS);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CHomingMissilePickup extends CPickup {

        m_name = "PICKUP_HOMINGMISSILE";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMING_MISSILE_PICKUP);
        }

        //-------------------------------------------------------------

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship) {
                return;
            }

            this.m_scene.createLabel(this.getPosition(), "HOMING MISSILE");
            ship.addWeapon(enums.WeaponType.HOMING_MISSILE_WEAPON, enums.WeaponGrade.WEAPON_MEDIUM);
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_PICKUP);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CCloakPickup extends CPickup {

        m_name = "PICKUP_CLOAK";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_CLOAK_PICKUP);
        }

        //-------------------------------------------------------------

        public collect() {
            var ship: CShip = this.m_scene.findShip();
            if (!ship) {
                return;
            }
            this.m_scene.createLabel(this.getPosition(), "CLOAK");
            ship.setCloak(this.CLOAK_TIME);
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_PICKUP);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CLaserPickup extends CPickup {

        m_name = "PICKUP_LASER";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_LASER_PICKUP);
        }

        //-------------------------------------------------------------

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), "LASER");
            ship.addWeapon(enums.WeaponType.LASER_WEAPON, enums.WeaponGrade.WEAPON_BEST);
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_PICKUP);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CScorePickup extends CPickup {

        m_name = "PICKUP_SCOREBONUS";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SCORE_PICKUP);
        }

        //-------------------------------------------------------------

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), this.getActorInfo().m_kill_bonus.toString());
            this.m_playGameState.getPlayer().scoreBonus(this.getActorInfo().m_kill_bonus);

            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_PICKUP);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CShieldPickup extends CPickup {

        m_name = "PICKUP_SHIELD";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SHIELD_PICKUP);
        }

        //-------------------------------------------------------------

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), "SHIELD UP");
            var max: number = ship.getActorInfo().m_initial_shield;
            var new_shield: number = ship.getShield() + max / 2;

            if (new_shield > max)
                new_shield = max;

            ship.setShield(new_shield);
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_PICKUP);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CSpeedPickup extends CPickup {

        m_name = "PICKUP_SPEEDUP";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SPEED_PICKUP);
        }

        //-------------------------------------------------------------

        public collect(): void {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            switch (ship.getHandling()) {
                case enums.ShipHandling.HANDLING_BAD:
                    ship.setHandling(enums.ShipHandling.HANDLING_NORMAL);
                    this.m_scene.createLabel(this.getPosition(), "SPEED UP");
                    break;
                case enums.ShipHandling.HANDLING_NORMAL:
                    ship.setHandling(enums.ShipHandling.HANDLING_GOOD);
                    this.m_scene.createLabel(this.getPosition(), "SPEED UP");
                    break;
            }
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_PICKUP);//getPosition().getX()
        }
    }

    //-------------------------------------------------------------

    export class CWeaponPickup extends CPickup {

        m_name = "PICKUP_WEAPON";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_WEAPON_PICKUP);
        }

        //-------------------------------------------------------------

        public collect(): void {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            if (ship.upgradeWeapon()) {
                this.m_scene.createLabel(this.getPosition(), "WEAPON UP");
            } else {
                this.m_scene.createLabel(this.getPosition(), "WEAPON FULL");
            }
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_PICKUP);//getPosition().getX()
        }
    }

    //-------------------------------------------------------------

    export class CWingtipPickup extends CPickup {

        m_name = "PICKUP_WINGTIP";
        WINGTIP_FRAMES: number = 8;

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_WINGTIP_PICKUP);
        }

        //-------------------------------------------------------------

        public collect(): void {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), "WINGTIP");
            if (this.getPosition().X <= ship.getPosition().X) {
                ship.attachWingtip(-1);
            } else {
                ship.attachWingtip(1);
            }
            this.m_playGameState.playSample(enums.GameSampleType.SAMPLE_PICKUP);//getPosition().getX());
        }

        //-------------------------------------------------------------

        public update(controls: Controls, gametime: gsCTimer) {
            this.animations(enums.AnimationMode.ANIMATE_LOOP, 0, this.WINGTIP_FRAMES);
            return true;
        }
    }

    //-------------------------------------------------------------
}