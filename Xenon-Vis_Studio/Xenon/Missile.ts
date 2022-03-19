﻿import gsCControls = require("Controls");
import CScene = require("Scene");
import CBullet = require("Bullet");
import CActor = require("Actor");
import enums = require("Enums");
import CPlayGameState = require("PlayGameState");

class CMissile extends CBullet {

    MISSILE_FRAMES: number = 2;

    constructor(theScene: CScene, playGameState: CPlayGameState) {
        super(playGameState);
        this.m_name = "Missile";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MISSILE);
    }

    //-------------------------------------------------------------

    // Get the Speed Vector
    public getSpeed() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MISSILE).m_speed.y;
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls)
    {
        this.m_position.x = this.m_position.x + this.m_velocity.x;
        this.m_position.y = this.m_position.y + this.m_velocity.y;
        this.m_sprite.setFrame(this.MISSILE_FRAMES * this.m_grade);
        return true;
    }
}
export = CMissile;