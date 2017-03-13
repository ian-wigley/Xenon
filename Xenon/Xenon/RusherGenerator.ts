import CActor = require("Actor");
import CRusher = require("Rusher");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import enums = require("Enums");

class CRusherGenerator extends CActor {
    
    private RUSHER_TOTAL: number = 6;	// total segments in chain
    private RUSHER_DELAY: number = 0.5;	// time delay between generation

    //-------------------------------------------------------------

    private m_rushers_created: number;
    private m_delay_timer:gsCTimer;

    constructor() {
        super();
        this.m_rushers_created = 0;
        //this.m_timer = new gsCTimer();
        this.m_delay_timer = new gsCTimer();
        this.m_name = "RusherGenerator";
    }

    public getActorInfo()
    {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_RUSHER_GENERATOR);
    }


    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
            this.m_delay_timer.start();
        }

        return super.activate();
    }

    public update(controls: gsCControls, gameTime: gsCTimer) {
        this.gameTime = gameTime;
        if (this.m_delay_timer.getTime() < this.RUSHER_DELAY)
        {
            return true;
        }
        this.m_delay_timer.start();

        var r: CRusher = new CRusher();
        this.m_scene.addActor(r);
        r.setPosition(this.getPosition());
        r.setVelocity(this.getVelocity());
        r.activate();

        this.m_rushers_created++;
        if (this.m_rushers_created >= this.RUSHER_TOTAL) {
            super.kill();
        }
        return true;
    }
}

export = CRusherGenerator;