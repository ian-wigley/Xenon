import gsCVector = require("Vector");
import Particle = require("Particle");
import CParticleEffect = require("ParticleEffect");
import enums = require("Enums");

class CSmokeEffect extends CParticleEffect {

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
            p.m_velocity = new gsCVector(0.67, 0.8); //p.m_velocity = new gsCVector::polar(1.0f, m_random.getFloat(360)) + gsCVector(0.0, 1.0);
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