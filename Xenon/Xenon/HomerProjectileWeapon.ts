import CWeapon = require("Weapon");
import Controls = require("Controls");
import GameTime = require("Timer");
import enums = require("Enums");
import gsCVector = require("Vector");
import CHomerProjectile = require("HomerProjectile");

class CHomerProjectileWeapon extends CWeapon {

    m_trigger: boolean;

    constructor() {
        super();
        this.m_trigger = false;
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMER_PROJECTILE_WEAPON);
    }

    //-------------------------------------------------------------

    public fire(): boolean {
        if (!this.m_trigger)
            return false;

        var direction: Array<gsCVector>;
        direction.push(new gsCVector(0.0, -1.0));
        direction.push(new gsCVector(1.0, -1.0));
        direction.push(new gsCVector(1.0, 0.0));
        direction.push(new gsCVector(1.0, 1.0));
        direction.push(new gsCVector(0.0, 1.0));
        direction.push(new gsCVector(-1.0, 1.0));
        direction.push(new gsCVector(-1.0, 0.0));
        direction.push(new gsCVector(-1.0, -1.0));

        //static gsCVector direction[8] = {
        //gsCVector(0.f,-1.f),
        //gsCVector(1.f,-1.f),
        //gsCVector(1.f, 0.f),
        //gsCVector(1.f, 1.f),
        // gsCVector(0.f, 1.f),
        //   gsCVector(-1.f, 1.f),
        //   gsCVector(-1.f, 0.f),
        //   gsCVector(-1.f, -1.f)
        //};

        // fire 8 projectiles
        var hp: CHomerProjectile;

        for (var i = 0; i < 8; i++) {
            hp = new CHomerProjectile();
            this.m_scene.addActor(hp);
            hp.activate();
            //hp.setGrade(<enums.BulletGrade>this.m_grade);
            hp.setPosition(this.getPosition());

            var d: gsCVector = direction[i];
            d.normalize();

            //hp.setVelocity(d * hp.getActorInfo().m_speed[this.m_grade]);
        }

        // now kill ourself
        this.kill();

        return true;
    }

    //-------------------------------------------------------------

    public detonate(): void {
        this.m_trigger = true;
    }

    //-------------------------------------------------------------


}

export = CHomerProjectileWeapon;