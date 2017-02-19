import CActor = require("Actor")
import enums = require("Enums");
import CDrone = require("Drone");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import gsCVector = require("Vector");

class CDroneGenerator extends CActor {
    //-------------------------------------------------------------

    DRONE_TOTAL: number = 8;		// total segments in chain
    DRONE_DELAY: number = 0.3;		// time delay between drone generation
    DRONE_SPACING: number = -32.0;	// vertical spacing
    DRONE_SPEED: number = 0.6;

    //-------------------------------------------------------------

    m_drones_created: number;
    m_drones_active: number;
    m_drones_killed: number;

    constructor() {
        super();
        this.m_drones_created = 0;
        this.m_drones_active = 0;
        this.m_drones_killed = 0;
    }

    public getActorInfo() {

        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_DRONE_GENERATOR);
    }

    public activate(): boolean {
        return super.activate();
    }

    //public bool update(Controls controls)
    public update(controls: gsCControls, gameTime: gsCTimer) {
        if (this.m_drones_created < this.DRONE_TOTAL) {
            var d: CDrone = new CDrone(this);
            this.m_scene.addActor(d);
            ////d.setPosition(this.getPosition() + new gsCVector(0.0, this.m_drones_created * this.DRONE_SPACING));
            //            d.setPosition(this.getPosition().add(new gsCVector(0.0, this.m_drones_created * this.DRONE_SPACING)));
            d.setVelocity(new gsCVector(0.0, this.DRONE_SPEED));
            d.setPhase(this.m_drones_created * this.DRONE_DELAY);
            d.activate();
            this.m_drones_created++;
        }

        return true;
    }

    public droneKilled(by_player: boolean): number {
        //return 0;
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