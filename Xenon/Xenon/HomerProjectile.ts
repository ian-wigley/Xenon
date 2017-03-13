import Controls = require("Controls");
import GameTime = require("Timer");
import enums = require("Enums");
import CBullet = require("Bullet");

class CHomerProjectile extends CBullet{


    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMER_PROJECTILE);
    }


    public update(controls: Controls, gametime: GameTime): boolean {
        if (this.m_shield == 0) {
            //this.explode();
            this.kill();
            return true;
        }

        this.m_position.plusEquals(this.m_velocity);

        var num_frames = this.m_image.getNumTiles();

        //this.m_sprite.setFrame((this.getDirection(num_frames) + 3) & (num_frames - 1));

        return true;
    }


}

export = CHomerProjectile;