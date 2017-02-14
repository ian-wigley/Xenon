import CActor = require("Actor");
import CRusher = require("Rusher");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import enums = require("Enums");

class CRusherGenerator extends CActor {
    //-------------------------------------------------------------

    RUSHER_TOTAL: number = 6;		// total segments in chain
    RUSHER_DELAY: number = 0.5;	// time delay between generation

    //-------------------------------------------------------------
    m_rushers_created: number;

    //gsCTimer m_delay_timer;

    constructor() {
        super();
        this.m_rushers_created = 0;
    }

    //public CRusherGenerator() {
    //    this.m_rushers_created = 0;
    //}

    public getActorInfo() //ActorInfo 
    {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_RUSHER_GENERATOR);
    }

    //public ActorInfo getActorInfo()
    //{
    //    return null;// ActorInfoList[INFO_RUSHER_GENERATOR]; 
    //}

    public activate(): boolean {
        if (!this.isActive()) {
            //m_timer.start();
            //m_delay_timer.start();
        }

        return super.activate();
    }

    update(controls: gsCControls, gameTime: gsCTimer) {
        this.gameTime = gameTime;
        //if (m_delay_timer.getTime() < RUSHER_DELAY)
        //{
        //    return true;
        //}
        //m_delay_timer.start();

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