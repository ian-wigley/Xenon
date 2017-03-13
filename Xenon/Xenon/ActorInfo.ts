import gsCVector = require("Vector");
import enums = require("Enums");

class ActorInfo {

    public m_name: string;					// name (used for load/save to config file)
    public m_type: enums.ActorType;			// type of actor
    public m_filename: string;				// file containing sprite frames
    public m_tile_width: number;			// width of 1 frame
    public m_tile_height: number;			// height of 1 frame
    public m_hotspot_x: number;				// hotspot position (i.e. offset to centre)
    public m_hotspot_y: number;
    public m_anim_rate: number;				// animation rate (in frames per second)
    public m_initial_shield: number;		// initial shield value
    public m_kill_bonus: number;			// score bonus for killing actor

    // for weapons only
    public m_fire_delay: number;			// minimum delay between shots
    public m_autofire_delay: number;		// delay between shots when using autofire

    // for bullets only
    //public int[]m_energy = new int[(int)BulletGrade.BULLET_GRADES];//[BULLET_GRADES];		// energy for each grade of bullet
    ////public float[] m_speed = new float[(int)BulletGrade.BULLET_GRADES];//[BULLET_GRADES];	// movement speed
    public m_speed: gsCVector;
    public m_energy = []; //: Array<enums.BulletGrade..BulletGrade.BULLET_GRADES>

    constructor(name: string, actorType: enums.ActorType, filename: string, tile_width: number, tile_height: number, hotspot_x: number, hotspot_y: number, anirate: number, initial_shield: number, kill_bonus: number, speed: gsCVector) {
        this.m_name = name;
        this.m_type = actorType;
        this.m_filename = filename;
        this.m_tile_width = tile_width;
        this.m_tile_height = tile_height;
        this.m_hotspot_x = hotspot_x;
        this.m_hotspot_y = hotspot_y;
        this.m_anim_rate = anirate;
        this.m_initial_shield = initial_shield;
        this.m_kill_bonus = kill_bonus;
        //m_fire_delay 	=	fire_delay;
        //m_autofire_delay 	=	autofire_delay;
        //this.m_energy =	energy;//[BULLET_GRADES];
        this.m_speed = speed;//[BULLET_GRADES];

        this.m_energy.push(enums.BulletGrade.BULLET_STANDARD);
        this.m_energy.push(enums.BulletGrade.BULLET_MEDIUM);
        this.m_energy.push(enums.BulletGrade.BULLET_BEST);
        this.m_energy.push(enums.BulletGrade.BULLET_GRADES);

    }
}
export = ActorInfo;