import ActorInfo = require("ActorInfo");
import gsCVector = require("Vector");
import enums = require("Enums");

class CActorInfoList {

    private INFINITE_SHIELD: number = -1;
    private m_info_list: Array<ActorInfo>;

    constructor() {
        this.m_info_list = [];
        this.m_info_list.push(new ActorInfo("ShieldPickup", enums.ActorType.ACTOR_TYPE_PICKUP, "PUShield", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SpeedPickup", enums.ActorType.ACTOR_TYPE_PICKUP, "PUSpeed", 32, 32, 16, 16, 2, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("WeaponPickup", enums.ActorType.ACTOR_TYPE_PICKUP, "PUWeapon", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("CloakPickup", enums.ActorType.ACTOR_TYPE_PICKUP, "PUInvuln", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("DivePickup", enums.ActorType.ACTOR_TYPE_PICKUP, "PUDive", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("ScorePickup", enums.ActorType.ACTOR_TYPE_PICKUP, "PUScore", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("ClonePickup", enums.ActorType.ACTOR_TYPE_PICKUP, "Clone1", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("WingtipPickup", enums.ActorType.ACTOR_TYPE_PICKUP, "Wingtip", 32, 64, 16, 32, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MissilePickup", enums.ActorType.ACTOR_TYPE_PICKUP, "PUMissil", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("LaserPickup", enums.ActorType.ACTOR_TYPE_PICKUP, "PULaser", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("LifePickup", enums.ActorType.ACTOR_TYPE_PICKUP, "PULife", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        // aliens
        this.m_info_list.push(new ActorInfo("WallHugger", enums.ActorType.ACTOR_TYPE_ALIEN, "wallhugger", 64, 64, 32, 32, 8, 5, 20, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SmallStandardAsteroid", enums.ActorType.ACTOR_TYPE_ALIEN, "SAster32", 32, 32, 16, 16, 16, 1, 10, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MediumStandardAsteroid", enums.ActorType.ACTOR_TYPE_ALIEN, "SAster64", 64, 64, 32, 32, 12, 2, 20, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BigStandardAsteroid", enums.ActorType.ACTOR_TYPE_ALIEN, "SAster96", 96, 96, 48, 48, 8, 3, 40, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SmallHighDensityAsteroid", enums.ActorType.ACTOR_TYPE_ALIEN, "GAster32", 32, 32, 16, 16, 16, 2, 20, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MediumHighDensityAsteroid", enums.ActorType.ACTOR_TYPE_ALIEN, "GAster64", 64, 64, 32, 32, 12, 4, 40, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BigHighDensityAsteroid", enums.ActorType.ACTOR_TYPE_ALIEN, "GAster96", 96, 96, 48, 48, 8, 4, 80, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SmallIndestuctibleAsteroid", enums.ActorType.ACTOR_TYPE_ALIEN, "MAster32", 32, 32, 16, 16, 16, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MediumIndestuctibleAsteroid", enums.ActorType.ACTOR_TYPE_ALIEN, "MAster64", 64, 64, 32, 32, 12, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BigIndestuctibleAsteroid", enums.ActorType.ACTOR_TYPE_ALIEN, "MAster96", 96, 96, 48, 48, 8, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Rusher", enums.ActorType.ACTOR_TYPE_ALIEN, "rusher", 64, 32, 32, 16, 16, 5, 30, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Pod", enums.ActorType.ACTOR_TYPE_ALIEN, "pod", 96, 96, 48, 48, 8, 10, 100, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Homer", enums.ActorType.ACTOR_TYPE_ALIEN, "Homing", 64, 64, 32, 32, 16, 5, 100, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Drone", enums.ActorType.ACTOR_TYPE_ALIEN, "drone", 32, 32, 16, 16, 16, 1, 30, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("StandardLoner", enums.ActorType.ACTOR_TYPE_ALIEN, "LonerA", 64, 64, 32, 32, 16, 2, 30, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MediumLoner", enums.ActorType.ACTOR_TYPE_ALIEN, "LonerB", 64, 64, 32, 32, 16, 4, 60, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("ArmouredLoner", enums.ActorType.ACTOR_TYPE_ALIEN, "LonerC", 64, 64, 32, 32, 16, 6, 90, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("OrganicGun", enums.ActorType.ACTOR_TYPE_ALIEN, "GShoot", 64, 64, 32, 32, 8, 5, 20, new gsCVector(0, 0)));
        // bullets
        this.m_info_list.push(new ActorInfo("Missile", enums.ActorType.ACTOR_TYPE_BULLET, "missile", 16, 16, 8, 8, 0, this.INFINITE_SHIELD, 0, new gsCVector(10, 10)));
        this.m_info_list.push(new ActorInfo("HomingMissile", enums.ActorType.ACTOR_TYPE_BULLET, "hmissile", 32, 32, 16, 16, 0, this.INFINITE_SHIELD, 0, new gsCVector(5, 5)));
        this.m_info_list.push(new ActorInfo("Laser", enums.ActorType.ACTOR_TYPE_BULLET, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(20, 20)));
        this.m_info_list.push(new ActorInfo("HomerProjectile", enums.ActorType.ACTOR_TYPE_ALIENBULLET, "HomProjc", 16, 16, 8, 8, 0, 1, 50, new gsCVector(3, 3)));
        this.m_info_list.push(new ActorInfo("Spinner", enums.ActorType.ACTOR_TYPE_ALIENBULLET, "EnWeap6", 16, 16, 8, 8, 16, this.INFINITE_SHIELD, 0, new gsCVector(5, 5)));
        this.m_info_list.push(new ActorInfo("Spore", enums.ActorType.ACTOR_TYPE_ALIENBULLET, "SporesA", 16, 16, 8, 8, 8, 1, 5, new gsCVector(1.5, 1.5)));
        // weapons
        this.m_info_list.push(new ActorInfo("MissileWeapon", enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("HomingMissileWeapon", enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("LaserWeapon", enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("HomerProjectileWeapon", enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SpinnerWeapon", enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        // ship
        this.m_info_list.push(new ActorInfo("Ship", enums.ActorType.ACTOR_TYPE_SHIP, "Ship2", 64, 64, 32, 32, 0, 100, 0, new gsCVector(0, 0)));
        // upgrades
        this.m_info_list.push(new ActorInfo("Clone", enums.ActorType.ACTOR_TYPE_UPGRADE, "Clone1", 32, 32, 16, 16, 8, 50, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Wingtip", enums.ActorType.ACTOR_TYPE_UPGRADE, "Wingtip", 32, 64, 16, 32, 8, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        // engines
        this.m_info_list.push(new ActorInfo("ShipEngine", enums.ActorType.ACTOR_TYPE_ENGINE, "Burner1", 16, 32, 8, 0, 10, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("CloneEngine", enums.ActorType.ACTOR_TYPE_ENGINE, "Burner2", 32, 32, 16, 0, 10, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("RetroEngine", enums.ActorType.ACTOR_TYPE_ENGINE, "Retros", 32, 32, 16, 16, 10, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        // effects
        this.m_info_list.push(new ActorInfo("SmallExplosion", enums.ActorType.ACTOR_TYPE_ALIEN, "explode16", 16, 16, 8, 8, 40, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MediumExplosion", enums.ActorType.ACTOR_TYPE_ALIEN, "explode32", 32, 32, 16, 16, 40, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BigExplosion", enums.ActorType.ACTOR_TYPE_ALIEN, "explode64", 64, 64, 32, 32, 40, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("StandardDustEffect", enums.ActorType.ACTOR_TYPE_EFFECT, "SDust", 4, 4, 2, 2, 16, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("HighDensityDustEffect", enums.ActorType.ACTOR_TYPE_EFFECT, "GDust", 4, 4, 2, 2, 16, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SmokeEffect", enums.ActorType.ACTOR_TYPE_EFFECT, "smoke", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Label", enums.ActorType.ACTOR_TYPE_LABEL, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        // generators
        this.m_info_list.push(new ActorInfo("DroneGenerator", enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 30, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("RusherGenerator", enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SporeGenerator", enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        // boss
        this.m_info_list.push(new ActorInfo("BossMouth", enums.ActorType.ACTOR_TYPE_BOSS, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BossEye", enums.ActorType.ACTOR_TYPE_BOSS, "bosseyes2", 32, 32, 16, 16, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BossControl", enums.ActorType.ACTOR_TYPE_BOSS, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
    }

    //-------------------------------------------------------------

    public GetActorInfoListItem(index: number) {
        return this.m_info_list[index];
    }

    //-------------------------------------------------------------

    public GetActorSpeed(index: number) {
        return this.m_info_list[index].m_speed;
    }

    //-------------------------------------------------------------

    public GetTileWidth(index: number) {
        return this.m_info_list[index].m_tile_width;
    }

    //-------------------------------------------------------------

    public GetTileHeight(index: number) {
        return this.m_info_list[index].m_tile_height;
    }

    //-------------------------------------------------------------

    // Method to return the Actor Image File Names
    public GetActorTextureName() {
        var names = [];

        for (var i = 0; i < this.m_info_list.length; i++) {
            var split: ActorInfo = this.m_info_list[i];
            var fname: string = split.m_filename;
            names.push(fname);
        }
        return names;
    }

    //-------------------------------------------------------------

    // Instantiate a new Actor's information and push into an array
    AddValues(name: string, actorType: enums.ActorType, info: string, one: number, two: number, three: number, four: number, five: number, shield: number, six: number, vector: gsCVector) {
        var temp = [];
        temp.push(name, actorType, info, one, two, three, four, five, shield, six, vector);
        return temp;
    }
}
export = CActorInfoList;