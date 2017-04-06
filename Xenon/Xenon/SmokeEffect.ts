import gsCVector = require("Vector");
import Particle = require("Particle");
import CParticleEffect = require("ParticleEffect");
import enums = require("Enums");

class CSmokeEffect extends CParticleEffect {

    m_name = "SmokeEffect";

    constructor() {
        super();
        this.Parent = this;
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SMOKE_EFFECT);
    }

    //-------------------------------------------------------------

    public createParticle() {
        if (this.m_timer.getTime() > -0.1) {
            this.m_timer.start();

            var p: Particle = new Particle;
            p.m_position = this.getPosition();
            //p ->m_velocity = gsCVector::polar(1.0f, m_random.getFloat(360.f)) + gsCVector(0.f, 1.f);
            var temp: gsCVector = new gsCVector(0, 0);
            p.m_velocity = temp.polar(1.0, (Math.random() * 360.0) + 1.0);
            p.m_age = 0.0;
            p.m_lifetime = 1.0;
            p.m_mass = 1.0;
            return p;
        }
        else
            return null;
    }

    //-------------------------------------------------------------
}

export = CParticleEffect;