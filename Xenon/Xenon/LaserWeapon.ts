import CScene = require("Scene");
import CWeapon = require("Weapon");
import enums = require("Enums");

class CLaserWeapon extends CWeapon {

    constructor(scene: CScene) {
        super(scene);
    }


    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_LASER_WEAPON);
    }
}

export = CLaserWeapon;