import Particle = require("Particle");
import CActor = require("Actor");
import gsCVector = require("Vector");
import gsCTimer = require("Timer");
import gsCControls = require("Controls");
import CDustEffect = require("DustEffect");
import Point = require("Point");

class CParticleEffect extends CActor {

    m_offset: gsCVector;
    //gsCList<Particle *> m_particle_list;
    m_particle_list: Array<Particle>;
    m_point_force: boolean;
    m_force_position: gsCVector;
    m_force_direction: gsCVector;		// ignored if point force
    m_force_strength: number;				// ignored if directional force
    m_life_timer: gsCTimer;
    m_lifetime: number;
    m_parent: CDustEffect;//Object;

    INFINITE_LIFETIME: number = 99999.0;

    constructor() {
        super();
        this.m_point_force = false;
        this.m_force_position = new gsCVector(0.0, 0.0);
        this.m_force_direction = new gsCVector(0.0, 0.0);
        this.m_force_strength = 1.0;
        this.m_lifetime = this.INFINITE_LIFETIME;
        this.m_particle_list = [];
        this.m_life_timer = new gsCTimer();
    }

    //-------------------------------------------------------------

    public destroy(): void {
        //for (var i = 0; i < m_particle_list.getSize(); i++)
        //delete m_particle_list[i];
        //m_particle_list.clear();
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
            this.m_life_timer.start();
        }

        return super.activate();
    }

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

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        // update effect global position
        if (this.getOwner())
            this.m_position = this.getOwner().getPosition().plus1(this.m_offset);
        else
            this.m_position.plusEquals(this.m_velocity);

        // create new particle
        if (this.m_lifetime == this.INFINITE_LIFETIME ||
            this.m_life_timer.getTime() < this.m_lifetime) {
            var p: Particle = this.m_parent.createParticle();
            if (p)
                this.m_particle_list.push(p);
        }
        else {
            if (this.m_particle_list.length == 0) {//.isEmpty()) {
                this.kill();
                return true;
            }
        }

        // update all
        var delta_time: number = this.m_timer.getDeltaTime();

        for (var i = this.m_particle_list.length - 1; i >= 0; i--) {
            var p: Particle = this.m_particle_list[i];
            p.m_age += delta_time;
            if (p.m_age >= p.m_lifetime) {

                // kill particle
                //delete m_particle_list[i];
                this.m_particle_list[i] = null;//..removeIndex(i);
            }
            else {
                p.m_position.plusEquals(p.m_velocity);

                if (this.m_point_force) {
                    //NYI
                }
                else {
                    //NYI
                }
            }
        }

        return true;
    }

    //-------------------------------------------------------------

    //public draw(ctx: CanvasRenderingContext2D): boolean {
    public Draw(ctx: CanvasRenderingContext2D): boolean {
        //    gsCRect screen_rect = gsCApplication::getScreen() ->getRect();

        //    if (!screen_rect.contains(m_position + m_scene ->getMap() ->getPosition())) {
        //        onLeavingScreen();
        //        return true;
        //    }

        for (var i = this.m_particle_list.length - 1; i >= 0; i--) {
            var p: Particle = this.m_particle_list[i];

            var frame: number = (this.m_image.getNumTiles() * p.m_age / p.m_lifetime);

            //if (!this.m_image.draw(frame, new gsCVector(p.m_position.plus1(this.m_scene.getMap().getPosition()))),ctx) {
            // var rar = p.m_position.plus1(this.m_scene.getMap().getPosition());
            if (!this.m_image.draw(frame, p.m_position.plus1(this.m_scene.getMap().getPosition()), ctx)) {

                // kill particle

                //delete m_particle_list[i];
                this.m_particle_list[i] = null;//.removeIndex(i);
            }
        }

        return true;
    }

    //-------------------------------------------------------------

    public setOffset(offset: gsCVector): void {
        this.m_offset = offset;
    }

    //-------------------------------------------------------------

    public setLifetime(time: number): void {
        this.m_lifetime = time;
    }

    //-------------------------------------------------------------

    public set Parent(value: CDustEffect) {
        this.m_parent = value;
    }

}

export = CParticleEffect;