import CActor = require("Actor");
import CSpore = require("Spore");
import gsCVector = require("Vector");
import enums = require("Enums");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");

class CSporeGenerator extends CActor {

    private m_spores_created: number;
    private m_spores_alive: number;
    private m_spores_killed: number;

    constructor() {
        super();
        this.m_spores_created = 0;
        this.m_spores_alive = 0;
        this.m_spores_killed = 0;
        this.m_name = "SporeGenerator";
    }

    public activate(): boolean {
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer): boolean {

        if (this.m_spores_created != 16) {

            // fire 2 rings of 8 spores
            this.m_spores_created = 0;
            var s: CSpore;

            for (var ring = 0; ring < 2; ring++) {
                for (var i = 0; i < 8; i++) {
                    s = new CSpore();
                    this.m_scene.addActor(s);
                    s.activate();
                    var radius: number = 16.0 + 16.0 * ring;
                    var angle: number = 45.0 * i + 22.5 * ring;
                    var offset: gsCVector = new gsCVector(radius * Math.sin(angle), radius * Math.cos(angle));
                    //s.setPosition(this.getPosition() + offset);
                    s.setPosition(new gsCVector(0, 0).plus(this.getPosition(), offset));
                    var d: gsCVector = offset;
                    d.normalize();
                    //s.setVelocity(d * s.getActorInfo().m_speed[0]);
                    s.setVelocity(new gsCVector(0, 0).times(d, s.getActorInfo().m_speed[0]));
                    s.setOwner(this);
                    this.m_spores_created++;
                }
            }

            this.m_spores_alive = this.m_spores_created;
            this.m_spores_killed = 0;
        }

        return true;
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SPORE_GENERATOR);
    }

    //-------------------------------------------------------------

    public sporeKilled(by_player: boolean): boolean {
        this.m_spores_alive--;

        if (by_player)
            this.m_spores_killed++;

        if (this.m_spores_killed == this.m_spores_created) {
            super.kill();
            return true;
        }

        if (this.m_spores_alive == 0) {
            super.kill();
        }

        return false;
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
    }

    //-------------------------------------------------------------

}

export = CSporeGenerator;