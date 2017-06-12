import Controls = require("Controls");
import GameTime = require("Timer");
import enums = require("Enums");
import CBullet = require("Bullet");
import gsCVector = require("Vector");
import CExplode = require("Exploder");

class CHomerProjectile extends CBullet {

    m_name = "HomerProjectile";

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMER_PROJECTILE);
    }

    //-------------------------------------------------------------
    public update(controls: Controls, gametime: GameTime): boolean {
        if (this.m_shield == 0) {
            var explode = new CExplode(this);
            this.kill();
            return true;
        }

        this.m_position.plusEquals(this.m_velocity);
        var num_frames = this.m_image.getNumTiles();
        var frame = (this.getDirection(num_frames) + 3) & (num_frames - 1);
        this.m_sprite.setFrame((this.getDirection(num_frames) + 3) & (num_frames - 1));
        return true;
    }

    //-------------------------------------------------------------

    public set Name(value: string) {
        this.m_name = value;
    }

}

export = CHomerProjectile;