import Controls = require("Controls");
import GameTime = require("Timer");
import enums = require("Enums");
import CBullet = require("Bullet");
import gsCVector = require("Vector");
import CExplosion = require("Explosion");
import CSmallExplosion = require("SmallExplosion");
import CMediumExplosion = require("MediumExplosion");
import CBigExplosion = require("BigExplosion");
import Point = require("Point");

class CHomerProjectile extends CBullet {

    m_name = "HomerProjectile";

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMER_PROJECTILE);
    }

    //-------------------------------------------------------------
    public update(controls: Controls, gametime: GameTime): boolean {
        if (this.m_shield == 0) {
            this.explode();
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

    public explode() {

        var x: CExplosion = null;

        if (this.m_image != null) {
            var size: Point = this.m_image.getTileSize();
            var area = size.X * size.Y;

            if (area <= 32 * 32) {
                x = new CSmallExplosion();
            }
            else if (area <= 64 * 64) {
                x = new CMediumExplosion();
            }
            else {
                x = new CBigExplosion();
            }

            this.m_scene.addActor(x);
            x.setPosition(this.getPosition());
            x.activate();
        }
    }

    //-------------------------------------------------------------

    public set Name(value: string) {
        this.m_name = value;
    }

}

export = CHomerProjectile;