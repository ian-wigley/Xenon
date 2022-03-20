import CApplication = require("Application");
import CAlien = require("Alien");
import CDroneGenerator = require("DroneGenerator");
import enums = require("Enums");
import Pickup = require("Pickup");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CPlayGameState = require("PlayGameState");
import CExplode = require("Exploder");

class CDrone extends CAlien {

    private m_generator: CDroneGenerator;
    private m_phase: number;

    constructor(playGameState: CPlayGameState, generator?: CDroneGenerator) {
        super();
        this.m_playGameState = playGameState;
        this.m_generator = generator;
        this.m_phase = 0.0;
        this.m_name = "Drone";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
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

        if (this.m_shield == 0) {
            var score: number = this.m_generator.droneKilled(true);

            if (score == 0) {
                var s: Pickup.CScorePickup = new Pickup.CScorePickup(this.m_playGameState);
                this.m_scene.addActor(s);
                s.setPosition(this.getPosition());
                s.activate();
            }
            else {
                this.m_scene.createLabel(this.getPosition(), score.toString());
                this.m_playGameState.getPlayer().scoreBonus(score);
            }

            var explode = new CExplode(this);
            super.kill();
            return true;
        }

        this.m_position.X = this.m_generator.getPosition().X + 32.0 * Math.sin(((this.m_timer.getTime() / 60) + this.m_phase) * 180.0);
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
}

export = CDrone;