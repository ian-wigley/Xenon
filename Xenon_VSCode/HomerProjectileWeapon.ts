import CWeapon = require("Weapon");
import Controls = require("Controls");
import GameTime = require("Timer");
import enums = require("Enums");
import gsCVector = require("Vector");
import CHomerProjectile = require("HomerProjectile");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CPlayGameState = require("PlayGameState");

class CHomerProjectileWeapon extends CWeapon {

    m_trigger: boolean;

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_trigger = false;
        this.m_name = "HomerProjectileWeapon";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMER_PROJECTILE_WEAPON);
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls, gameTime: gsCTimer) {
        super.update(controls, gameTime);
        if (this.do_fire) {
            this.fire();
            //controls.fire = false;
        }
        return true;
    }

    //-------------------------------------------------------------

    public fire(): boolean {
        if (!this.m_trigger) {
            return false;
        }

        var direction = [];
        direction.push(new gsCVector(0.0, -1.0));
        direction.push(new gsCVector(1.0, -1.0));
        direction.push(new gsCVector(1.0, 0.0));
        direction.push(new gsCVector(1.0, 1.0));
        direction.push(new gsCVector(0.0, 1.0));
        direction.push(new gsCVector(-1.0, 1.0));
        direction.push(new gsCVector(-1.0, 0.0));
        direction.push(new gsCVector(-1.0, -1.0));

        // fire 8 projectiles
        var hp: CHomerProjectile;

        for (var i = 0; i < 8; i++) {
            hp = new CHomerProjectile(this.m_playGameState);
            this.m_scene.addActor(hp);
            hp.activate();
            var grade: number = this.m_grade;
            hp.setGrade(grade);
            hp.setPosition(this.getPosition());
            var d: gsCVector = direction[i];
            d.normalize();
            hp.setVelocity(d.multVec(hp.getActorInfo().m_speed));
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