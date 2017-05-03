import CApplication = require("Application");
import CAlien = require("Alien");
import CDroneGenerator = require("DroneGenerator");
import enums = require("Enums");
import Pickup = require("Pickup");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CPlayGameState = require("PlayGameState");
import CExplosion = require("Explosion");
import CSmallExplosion = require("SmallExplosion");
import CMediumExplosion = require("MediumExplosion");
import CBigExplosion = require("BigExplosion");
import gsCPoint = require("Point");

class CDrone extends CAlien {

    private m_generator: CDroneGenerator;
    private m_phase: number;
    //private m_timer:number = 0.0;
    private m_playGameState: CPlayGameState;

    constructor(application: CApplication, generator?: CDroneGenerator) {
        super();
        this.m_playGameState = application.playStateInstance;
        this.m_generator = generator;
        this.m_phase = 0.0;
        this.m_name = "Drone";       
    }

    //-------------------------------------------------------------

    public getActorInfo()
    {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_DRONE);
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

        this.m_timer.update(false);

        //this.gameTime = this.gameTime = gameTime;;
        if (this.m_shield == 0) {
            var score: number = this.m_generator.droneKilled(true);

            if (score == 0) {
                var s: Pickup.CScorePickup = new Pickup.CScorePickup();
                this.m_scene.addActor(s);
                s.setPosition(this.getPosition());
                s.activate();
            }
            else {
                this.m_scene.createLabel(this.getPosition(), score.toString());
                this.m_playGameState.getPlayer().scoreBonus(score);
            }

            this.explode();
            super.kill();
            return true;
        }


        this.m_position.X = this.m_generator.getPosition().X + 32.0 * Math.sin((/*this.m_timer*/ 0 + this.m_phase) * 180.0);
        //this.m_position.X = this.m_generator.getPosition().X + 32.0 * Math.sin(((this.m_timer.getTime()*10) + this.m_phase) * 180.0);
        this.m_position.Y = (this.m_position.Y + this.m_velocity.Y);

        super.animate(enums.AnimationMode.ANIMATE_LOOP);

        return true;
    }

    //-------------------------------------------------------------

    public setPhase(p: number): void {
        this.m_phase = p;
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
        this.m_generator.droneKilled(false);
        super.onLeavingScreen();
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

export = CDrone;