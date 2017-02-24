import Particle = require("Particle");
import CActor = require("Actor");
import gsCVector = require("Vector");
import gsCTimer = require("Timer");

class CParticleEffect extends CActor {

    m_offset: gsCVector;
    //gsCList<Particle *> m_particle_list;
    m_point_force: boolean;
    m_force_position: gsCVector;
    m_force_direction: gsCVector;		// ignored if point force
    m_force_strength: number;				// ignored if directional force
    m_life_timer: gsCTimer;
    m_lifetime: number;

    INFINITE_LIFETIME: number = 99999.0;

    constructor() {
        super();
        this.m_point_force = false;
        this.m_force_position = new gsCVector(0.0, 0.0);
        this.m_force_direction = new gsCVector(0.0, 0.0);
        this.m_force_strength = 1.0;
        this.m_lifetime = this.INFINITE_LIFETIME;
    }


    //-------------------------------------------------------------

    public destroy(): void {
        //for (var i = 0; i < m_particle_list.getSize(); i++)
        //delete m_particle_list[i];

        //m_particle_list.clear();
    }

    //-------------------------------------------------------------

    //bool CParticleEffect::activate()
    //{
    //    if (!isActive()) {
    //        m_timer.start();
    //        m_life_timer.start();
    //    }

    //    return CActor::activate();
    //}

    //-------------------------------------------------------------

    public kill(): void {
        this.destroy();
        super.kill();
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
        if (!this.getOwner())
            this.kill();
    }

    //-------------------------------------------------------------

    //bool CParticleEffect::update(Controls * controls)
    //{
    //    // update effect global position

    //    if (getOwner())
    //        m_position = getOwner() ->getPosition() + m_offset;
    //    else
    //        m_position += m_velocity;

    //    // create new particle

    //    if (m_lifetime == INFINITE_LIFETIME ||
    //        m_life_timer.getTime() < m_lifetime) {
    //        Particle * p = createParticle();
    //        if (p)
    //            m_particle_list.addItem(p);
    //    }
    //    else {
    //        if (m_particle_list.isEmpty()) {
    //            kill();
    //            return true;
    //        }
    //    }

    //    // update all

    //    float delta_time = gsCTimer::getDeltaTime();

    //    for (int i = m_particle_list.getSize() - 1; i >= 0 ; i--) {
    //        Particle * p = m_particle_list[i];

    //        p ->m_age += delta_time;

    //        if (p ->m_age >= p ->m_lifetime) {

    //            // kill particle

    //            delete m_particle_list[i];
    //            m_particle_list.removeIndex(i);
    //        }
    //        else {
    //            p ->m_position += p ->m_velocity;

    //            if (m_point_force) {
    //                //NYI
    //            }
    //            else {
    //                //NYI
    //            }
    //        }
    //    }

    //    return true;
    //}

    //-------------------------------------------------------------

    //bool CParticleEffect::draw()
    //{
    //    gsCRect screen_rect = gsCApplication::getScreen() ->getRect();

    //    if (!screen_rect.contains(m_position + m_scene ->getMap() ->getPosition())) {
    //        onLeavingScreen();
    //        return true;
    //    }

    //    for (int i = m_particle_list.getSize() - 1; i >= 0 ; i--) {
    //        Particle * p = m_particle_list[i];

    //        int frame = (int)(m_image ->getNumTiles() * p ->m_age / p ->m_lifetime);

    //        if (!m_image ->draw(frame, p ->m_position + m_scene ->getMap() ->getPosition())) {

    //            // kill particle

    //            delete m_particle_list[i];
    //            m_particle_list.removeIndex(i);
    //        }
    //    }

    //    return true;
    //}

    //-------------------------------------------------------------


    //-------------------------------------------------------------

    public setOffset(offset: gsCVector): void {
        this.m_offset = offset;
    }

    //-------------------------------------------------------------

    public setLifetime(time: number): void {
        this.m_lifetime = time;
    }

    //-------------------------------------------------------------



}

export = CParticleEffect;