import gsCVector = require("Vector");
import Particle = require("Particle");
import CParticleEffect = require("ParticleEffect");

class CSmokeEffect extends CParticleEffect {

    constructor() {
        super();
        this.Parent = this;
    }

    //-------------------------------------------------------------

    public createParticle() {
        if (this.m_timer.getTime() > 0.10) {
            this.m_timer.start();

            var p: Particle = new Particle;

            p.m_position = this.getPosition();
            //p.m_velocity = new gsCVector::polar(1.0f, m_random.getFloat(360.f)) + gsCVector(0.f, 1.f);
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