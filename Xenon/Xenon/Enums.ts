export = enu;
module enu {
    export enum gsTimerState {
        gsTIMER_RESET,
        gsTIMER_ACTIVE,
        gsTIMER_PAUSED
    };

    //-------------------------------------------------------------
    // Actor Types
    //
    // These types are also used to determine collision order
    // If two actors collide then the actor with the lowest
    // type value receives the onCollision call
    // e.g. a bullet hits an alien, not the other way round !
    //-------------------------------------------------------------

    export enum ActorType {
        ACTOR_TYPE_SHIP,		// player's ship
        ACTOR_TYPE_BULLET,		// ship and alien bullets
        ACTOR_TYPE_UPGRADE,		// ship upgrades
        ACTOR_TYPE_ENGINE,		// engine glows
        ACTOR_TYPE_WEAPON,		// ship weapons
        ACTOR_TYPE_PICKUP,		// bonus pickups
        ACTOR_TYPE_ALIEN,		// aliens
        ACTOR_TYPE_ALIENBULLET,	// alien bullet
        ACTOR_TYPE_LABEL,		// floating text labels
        ACTOR_TYPE_EFFECT,		// special effects
        ACTOR_TYPE_BOSS,		// boss

        ACTOR_TYPE_RETROENGINE,
        ACTOR_TYPE_TOTAL
    };

    export enum ActorInfoType {

        // pickups
        INFO_SHIELD_PICKUP,
        INFO_SPEED_PICKUP,
        INFO_WEAPON_PICKUP,
        INFO_CLOAK_PICKUP,
        INFO_DIVE_PICKUP,
        INFO_SCORE_PICKUP,
        INFO_CLONE_PICKUP,
        INFO_WINGTIP_PICKUP,
        INFO_HOMING_MISSILE_PICKUP,
        INFO_LASER_PICKUP,
        INFO_LIFE_PICKUP,

        // aliens
        INFO_WALL_HUGGER,
        INFO_SMALL_STANDARD_ASTEROID,
        INFO_MEDIUM_STANDARD_ASTEROID,
        INFO_BIG_STANDARD_ASTEROID,
        INFO_SMALL_HIGHDENSITY_ASTEROID,
        INFO_MEDIUM_HIGHDENSITY_ASTEROID,
        INFO_BIG_HIGHDENSITY_ASTEROID,
        INFO_SMALL_INDESTRUCTIBLE_ASTEROID,
        INFO_MEDIUM_INDESTRUCTIBLE_ASTEROID,
        INFO_BIG_INDESTRUCTIBLE_ASTEROID,
        INFO_RUSHER,
        INFO_POD,
        INFO_HOMER,
        INFO_DRONE,
        INFO_STANDARD_LONER,
        INFO_MEDIUM_LONER,
        INFO_ARMOURED_LONER,
        INFO_ORGANIC_GUN,

        // bullets
        INFO_MISSILE,
        INFO_HOMING_MISSILE,
        INFO_LASER,
        INFO_HOMER_PROJECTILE,
        INFO_SPINNER,
        INFO_SPORE,

        // weapons
        INFO_MISSILE_WEAPON,
        INFO_HOMING_MISSILE_WEAPON,
        INFO_LASER_WEAPON,
        INFO_HOMER_PROJECTILE_WEAPON,
        INFO_SPINNER_WEAPON,

        // ship
        INFO_SHIP,

        // upgrades
        INFO_CLONE,
        INFO_WINGTIP,

        // engines
        INFO_SHIP_ENGINE,
        INFO_CLONE_ENGINE,
        INFO_RETRO_ENGINE,

        // effects
        INFO_SMALL_EXPLOSION,
        INFO_MEDIUM_EXPLOSION,
        INFO_BIG_EXPLOSION,
        INFO_STANDARD_DUST_EFFECT,
        INFO_HIGHDENSITY_DUST_EFFECT,
        INFO_SMOKE_EFFECT,
        INFO_LABEL,

        // generators
        INFO_DRONE_GENERATOR,
        INFO_RUSHER_GENERATOR,
        INFO_SPORE_GENERATOR,

        // boss
        INFO_BOSSMOUTH,
        INFO_BOSSEYE,
        INFO_BOSSCONTROL,

        // Note: add new actors before this line
        INFO_TOTAL

    };

    //-------------------------------------------------------------

    export enum BossEyeState {
        BOSSEYE_OPEN,
        BOSSEYE_CLOSING,
        BOSSEYE_SHUT
    }

    //-------------------------------------------------------------

    export enum BulletGrade {
        BULLET_STANDARD,
        BULLET_MEDIUM,
        BULLET_BEST,
        BULLET_GRADES
    }

    //-------------------------------------------------------------

    export enum WeaponType {
        NO_WEAPON,
        MISSILE_WEAPON,
        HOMING_MISSILE_WEAPON,
        LASER_WEAPON
    };

    //-------------------------------------------------------------

    export enum WeaponGrade {
        WEAPON_STANDARD,
        WEAPON_MEDIUM,
        WEAPON_BEST
    };

    //-------------------------------------------------------------

    export enum WeaponFiringMode {
        WEAPON_AUTOMATIC,
        WEAPON_MANUAL,
    };

    //-------------------------------------------------------------

    export enum WeaponDirection {
        WEAPON_FORWARD,
        WEAPON_REVERSE,
    };

    //-------------------------------------------------------------

    export enum AnimationMode {
        ANIMATE_LOOP,				    // cycle repeatedly through frames
        ANIMATE_ONESHOT,			    // cycle once then flag as finished
    };



    export enum RetroDirection {
        RETRO_NW,
        RETRO_NE,
        RETRO_SW,
        RETRO_SE
    };

    export enum ShipHandling {
        HANDLING_BAD,
        HANDLING_NORMAL,
        HANDLING_GOOD,
    };

    export enum DiveMode {
        DIVE_OFF,
        DIVING_DOWN,
        DIVE_ACTIVE,
        DIVING_UP
    };

    export enum AlienType {
        WALLHUGGER,				// 0
        ASTEROID,				// 1
        RUSHER,					// 2
        POD,					// 3
        HOMER,					// 4
        DRONE_GENERATOR,		// 5
        LONER,					// 6
        REVERSE_RUSHER,			// 7
        RUSHER_GENERATOR_RIGHT,	// 8
        RUSHER_GENERATOR_LEFT,	// 9
        ORGANIC_GUN,			// 10
    };

    export enum PickupType {
        PICKUP_SHIELD,			// 0
        PICKUP_SPEEDUP,			// 1
        PICKUP_WEAPONUP,		// 2
        PICKUP_CLOAK,			// 3
        PICKUP_DIVE,			// 4
        PICKUP_SCOREBONUS,		// 5
        PICKUP_CLONE,			// 6
        PICKUP_WINGTIP,			// 7
        PICKUP_HOMINGMISSILE,	// 8
        PICKUP_LASER,			// 9
    };

    export enum TileId {
        ID_NORMAL_TILE,			// 0
        ID_PICKUP,				// 1
        ID_ALIEN,				// 2
        ID_DESTROYABLE_TILE,	// 3
        ID_CHECKPOINT,			// 4
        ID_WARP_START,			// 5
        ID_WARP_END,			// 6
        ID_BOSS_MOUTH,			// 7
        ID_BOSS_EYE,			// 8
        ID_BOSS_CONTROL = 9		// 9
    };

    export enum m_mode {
        CREATEPLAYER,
        PLAYERACTIVE,
    };


    export enum WallHuggerGrade {
        WALLHUGGER_STATIC,
        WALLHUGGER_MOVING,
    };


    export enum GameSampleType {
        SAMPLE_MENU_SELECTION,
        SAMPLE_MENU_OPTION,
        SAMPLE_MENU_CLICK,
        SAMPLE_MENU_BACK,

        SAMPLE_PLAYER_CREATED,
        SAMPLE_PLAYER_DESTROYED,

        SAMPLE_FIRE_MISSILE,
        SAMPLE_FIRE_HOMING_MISSILE,
        SAMPLE_FIRE_LASER,

        SAMPLE_SMALL_EXPLOSION,
        SAMPLE_MEDIUM_EXPLOSION,
        SAMPLE_BIG_EXPLOSION,

        SAMPLE_ASTEROID_BREAKUP,

        SAMPLE_PICKUP,
        SAMPLE_BONUS,

        SAMPLE_DIVE_DOWN,
        SAMPLE_DIVE_UP,

        SAMPLE_HIT_BACKGROUND,

        SAMPLE_ROAR,
        SAMPLE_SNORT,

        SAMPLE_CHECKPOINT,
    }


    export enum GameMusicType {
        MUSIC_TITLE,
        MUSIC_INTRO,
        MUSIC_GAME,
        MUSIC_HISCORE,
        MUSIC_BOSS,
        MUSIC_OUTRO,
    };

    //-------------------------------------------------------------

    export enum DemoMode {
        DEMO_OFF,
        DEMO_RECORD,
        DEMO_PLAYBACK
    };

    //-------------------------------------------------------------

    export enum ControllerType {
        KEYBOARD_LAYOUT_1,
        KEYBOARD_LAYOUT_2,
        JOYSTICK_1,
        JOYSTICK_2,
    };

    //-------------------------------------------------------------

    export enum OptionType {
        OPTION_DIFFICULTY,
        OPTION_HIRES,
        OPTION_WINDOWED,
        OPTION_COLOURDEPTH,
        OPTION_JOYSTICK,
        OPTION_MUSIC,
        OPTION_SOUNDFX,
        OPTION_PARTICLEFX,
        OPTION_BACKDROP,
        OPTION_DEBUGINFO,
        OPTION_CHEATS,
        OPTION_CONTROL1,
        OPTION_CONTROL2,
        TOTAL_OPTIONS
    };

    //-------------------------------------------------------------

    export enum VideoMenuItem {
        OM_HIRES,
        OM_WINDOWED,
        OM_COLOURDEPTH,
        OM_PARTICLEFX,
        OM_BACKDROP,
        //OM_SEPERATOR,
        OM_APPLY,
        OM_CANCEL
    }

    //-------------------------------------------------------------

    export enum OptionsMenuItem {
        OM_CONTROL,
        OM_VIDEO,
        OM_AUDIO,
        //OM_SEPERATOR,
        OM_BACK
    }

    //-------------------------------------------------------------

    export enum MainMenuItem {
        MM_ONEPLAYER,
        MM_TWOPLAYER,
        MM_SCORES,
        MM_OPTIONS,
        MM_CREDITS,
        MM_QUIT
    }

    export enum AudioMenuItem {
        OM_MUSIC,
        OM_SOUNDFX,
       // OM_SEPERATOR,
        OM_APPLY,
        OM_CANCEL
    }

    export enum ControlMenuItem {
        CM_CONTROL1,
        CM_CONTROL2,
        //CM_SEPERATOR,
        CM_APPLY,
        CM_CANCEL
    } 
} 