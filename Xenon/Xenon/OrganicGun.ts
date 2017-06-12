import CActor = require("Actor")
import gsCControls = require("Controls")
import enums = require("Enums");
import CSpinnerWeapon = require("SpinnerWeapon");
import gsCVector = require("Vector");
import CPlayGameState = require("PlayGameState");
import CExplode = require("Exploder");

//-------------------------------------------------------------

enum OrganicGunState {
    ORGANICGUN_STILL,
    ORGANICGUN_SHOOTING,
}

//-------------------------------------------------------------

class COrganicGun extends CActor {

    ORGANICGUN_SHOT_START: number = 0;
    ORGANICGUN_SHOT_FRAMES: number = 8;
    ORGANICGUN_LAUNCH_FRAME: number = 6;
    ORGANICGUN_LEFT: number = 0;
    ORGANICGUN_RIGHT: number = 8;
    ORGANICGUN_STILL_TIME: number = 1.0;

    private m_weapon: CSpinnerWeapon;
    private m_side: number;
    private m_direction: number;
    private m_fired: boolean;
    private m_state: OrganicGunState;
    private m_random;//static gsCRandom 

    //-------------------------------------------------------------

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_weapon = null;
        this.m_fired = false;
        this.m_name = "OrganicGun";
        this.m_playGameState = playGameState;
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_ORGANIC_GUN);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_weapon = new CSpinnerWeapon();
            this.m_scene.addActor(this.m_weapon);
            this.m_weapon.activate();
            this.m_weapon.setOwner(this);
            this.m_weapon.setOffset(new gsCVector(16.0, 16.0));
            this.m_weapon.setFiringMode(enums.WeaponFiringMode.WEAPON_MANUAL);
            this.m_weapon.setGrade(enums.WeaponGrade.WEAPON_BEST);

            this.m_state = OrganicGunState.ORGANICGUN_STILL;
            this.m_timer.start();
        }

        return super.activate();
    }

    //-------------------------------------------------------------

    public kill(): void {
        if (this.m_weapon) {
            this.m_weapon.kill();
            this.m_weapon = null;
        }
        super.kill();
    }

    //-------------------------------------------------------------

    public setDirection(dir: number): void {
        if (dir > 0) {
            this.m_side = this.ORGANICGUN_LEFT;
            this.m_weapon.setDirectionS(new gsCVector(1.0, 0.0));
        }
        else {
            this.m_side = this.ORGANICGUN_RIGHT;
            this.m_weapon.setDirectionS(new gsCVector(-1.0, 0.0));
        }
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls): boolean {
        if (this.m_shield == 0) {
            var explode = new CExplode(this);
            this.kill();
            return true;
        }

        switch (this.m_state) {
            case OrganicGunState.ORGANICGUN_STILL:
                this.m_sprite.setFrame(this.m_side + this.ORGANICGUN_SHOT_START);
                if (this.m_timer.getTime() >= this.ORGANICGUN_STILL_TIME) {

                    this.m_state = OrganicGunState.ORGANICGUN_SHOOTING;
                    this.m_fired = false;
                    this.m_timer.start();
                }
                break;

            case OrganicGunState.ORGANICGUN_SHOOTING:
                var frame: number = this.m_timer.getTime() * this.getActorInfo().m_anim_rate;
                if (frame >= this.ORGANICGUN_SHOT_FRAMES) {
                    this.m_sprite.setFrame(this.m_side + this.ORGANICGUN_SHOT_START);
                    this.m_state = OrganicGunState.ORGANICGUN_STILL;
                    this.m_timer.start();
                }
                else {
                    this.m_sprite.setFrame(this.m_side + this.ORGANICGUN_SHOT_START + frame);
                    if (!this.m_fired && frame >= this.ORGANICGUN_LAUNCH_FRAME) {
                        this.m_weapon.fire();
                        this.m_fired = true;
                    }
                }
                break;
        }
        return true;
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
        if (!this.m_playGameState.reachedBoss()) {
            this.kill();
        }
    }

    //-------------------------------------------------------------

}
export = COrganicGun;