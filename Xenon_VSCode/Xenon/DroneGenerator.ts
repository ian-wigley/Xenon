import CApplication = require("Application");
import CActor = require("Actor")
import enums = require("Enums");
import CDrone = require("Drone");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import gsCVector = require("Vector");
import CPlayGameState = require("PlayGameState");

class CDroneGenerator extends CActor {
    //-------------------------------------------------------------

    private DRONE_TOTAL: number = 8;		// total segments in chain
    private DRONE_DELAY: number = 0.3;		// time delay between drone generation
    private DRONE_SPACING: number = -32.0;	// vertical spacing
    private DRONE_SPEED: number = 0.6;

    //-------------------------------------------------------------

    private m_drones_created: number;
    private m_drones_active: number;
    private m_drones_killed: number;

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_drones_created = 0;
        this.m_drones_active = 0;
        this.m_drones_killed = 0;
        this.m_name = "DroneGenerator";
        this.m_playGameState = playGameState;
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_DRONE_GENERATOR);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        if (this.m_drones_created < this.DRONE_TOTAL) {
            var d: CDrone = new CDrone(this.m_playGameState, this);
            this.m_scene.addActor(d);
            d.setPosition(this.getPosition().plus1(new gsCVector(0.0, this.m_drones_created * this.DRONE_SPACING)));
            d.setVelocity(new gsCVector(0.0, this.DRONE_SPEED));
            d.setPhase(this.m_drones_created * this.DRONE_DELAY);
            d.activate();
            this.m_drones_created++;
        }
        return true;
    }

    //-------------------------------------------------------------

    public droneKilled(by_player: boolean): number {
        this.m_drones_active--;

        if (by_player) {
            this.m_drones_killed++;
        }

        if (this.m_drones_killed == this.m_drones_created) {
            super.kill();
            return 0;
        }

        if (this.m_drones_active == 0) {
            super.kill();
        }

        return this.getActorInfo().m_kill_bonus * this.m_drones_killed;
    }
}

export = CDroneGenerator;