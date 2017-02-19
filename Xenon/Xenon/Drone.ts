import CAlien = require("Alien");
import CDroneGenerator = require("DroneGenerator");
import enums = require("Enums");
import Pickup = require("Pickup");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");

class CDrone extends CAlien {

    private m_generator: CDroneGenerator;
    private m_phase: number;
    //private m_timer:number = 0.0;

    constructor(generator?: CDroneGenerator) {
        super();
        this.m_generator = generator;
        this.m_phase = 0.0;
    }

    public getActorInfo() 
    {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_DRONE);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        //if (!isActive())
        //    m_timer.start();

        return super.activate();
    }

    //-------------------------------------------------------------

    //public override bool update(Controls controls, GameTime gametime)
    public update(controls: gsCControls, gameTime: gsCTimer) {

        this.gameTime = this.gameTime = gameTime;;
        if (this.m_shield == 0) {
            var score: number = this.m_generator.droneKilled(true);

            if (score == 0) {
                var s: Pickup.CScorePickup = new Pickup.CScorePickup();
                this.m_scene.addActor(s);
                s.setPosition(this.getPosition());
                s.activate();
            }
            else {
                //m_scene.createLabel(getPosition(),score);
                //CPlayGameState::getPlayer()->scoreBonus(score);
            }

            super.explode();
            super.kill();
            return true;
        }

        //m_timer += this.gameTime.ElapsedGameTime.Milliseconds / 1000;// 0.01f;
        ////m_position.X = (m_generator.getPosition().X + 32.0f * Math.Sin((m_timer.getTime() + m_phase) * 180.0f));
        //this.m_position.X = this.m_generator.getPosition().X + 32.0 * Math.sin((this.m_timer + this.m_phase) * 180.0);
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