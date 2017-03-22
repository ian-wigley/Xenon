import gsCVector = require("Vector");
import Particle = require("Particle");
import CParticleEffect = require("ParticleEffect");

class CDustEffect extends CParticleEffect {

    constructor() {
        super();
        this.Parent = this;
        this.m_name = "DustEffect";
    }

    //-------------------------------------------------------------

    public createParticle() {
        if (this.m_timer.getTime() > 0.05) {
            this.m_timer.start();

            var p: Particle = new Particle();

            p.m_position = this.getPosition();
            //this.p.m_velocity = new gsCVector::polar(1.0, m_random.getFloat(360.0)) + gsCVector(0.0, 1.0);
            p.m_velocity = new gsCVector(1.0, Math.floor(Math.random() * 360.0)).plus1(new gsCVector(0.0, 1.0));
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

export = CDustEffect;