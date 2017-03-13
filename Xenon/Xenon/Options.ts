enum OptionType {
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
}

class COptions {


    FRAME_RATE: number = 60.0;

    private m_changed: boolean;
    private m_reload: boolean;
    private m_options: Array<number>;
    private m_defaults: Array<number>;

    //bool m_changed;
    //bool m_reload;
    //int m_options[TOTAL_OPTIONS];
    //static int m_defaults[TOTAL_OPTIONS];

    //int m_defaults[TOTAL_OPTIONS] = {
    //	0,					//OPTION_DIFFICULTY
    //	true,				//OPTION_HIRES
    //	true,				//OPTION_WINDOWED
    //	24,					//OPTION_COLOURDEPTH
    //	false,				//OPTION_JOYSTICK
    //	true,				//OPTION_MUSIC
    //	true,				//OPTION_SOUNDFX
    //	true,				//OPTION_PARTICLEFX
    //	true,				//OPTION_BACKDROP
    //	false,				//OPTION_DEBUGINFO
    //	false,				//OPTION_CHEATS
    //	KEYBOARD_LAYOUT_1,	//OPTION_CONTROL1
    //	KEYBOARD_LAYOUT_1	//OPTION_CONTROL2
    //};

    ////-------------------------------------------------------------

    //COptions Options;

    //-------------------------------------------------------------

    constructor() {
        //	restoreDefaults();
        //	changesNoted();
        this.m_defaults = [];
        this.m_defaults.push(0    	            /*OPTION_DIFFICULTY*/);
        this.m_defaults.push(1	            	/*OPTION_HIRES*/);
        this.m_defaults.push(1	            	/*OPTION_WINDOWED*/);
        this.m_defaults.push(24		            /*OPTION_COLOURDEPTH*/);
        this.m_defaults.push(0		            /*OPTION_JOYSTICK*/);
        this.m_defaults.push(1	            	/*OPTION_MUSIC*/);
        this.m_defaults.push(1	            	/*OPTION_SOUNDFX*/);
        this.m_defaults.push(1		            /*OPTION_PARTICLEFX*/);
        this.m_defaults.push(1	            	/*OPTION_BACKDROP*/);
        this.m_defaults.push(0	            	/*OPTION_DEBUGINFO*/);
        this.m_defaults.push(0	                /*OPTION_CHEATS*/);
        //this.m_defaults.push(KEYBOARD_LAYOUT_1,	/*OPTION_CONTROL1*/);
        //this.m_defaults.push(KEYBOARD_LAYOUT_1	/*OPTION_CONTROL2*/);

        this.m_options = [];
        this.m_options.push(0    	            /*OPTION_DIFFICULTY*/);
        this.m_options.push(1	            	/*OPTION_HIRES*/);
        this.m_options.push(1	            	/*OPTION_WINDOWED*/);
        this.m_options.push(24		            /*OPTION_COLOURDEPTH*/);
        this.m_options.push(0		            /*OPTION_JOYSTICK*/);
        this.m_options.push(1	            	/*OPTION_MUSIC*/);
        this.m_options.push(1	            	/*OPTION_SOUNDFX*/);
        this.m_options.push(1		            /*OPTION_PARTICLEFX*/);
        this.m_options.push(1	            	/*OPTION_BACKDROP*/);
        this.m_options.push(0	            	/*OPTION_DEBUGINFO*/);
        this.m_options.push(0	                /*OPTION_CHEATS*/);
        //this.m_options.push(KEYBOARD_LAYOUT_1,	/*OPTION_CONTROL1*/);
        //this.m_options.push(KEYBOARD_LAYOUT_1	/*OPTION_CONTROL2*/);
    }

    //-------------------------------------------------------------


    public restoreDefaults(): void {
        for (var i = 0; i < OptionType.TOTAL_OPTIONS; i++)
            this.setOption(<OptionType>i, this.m_defaults[i]);
    }

    //-------------------------------------------------------------

    //bool COptions::load(const char *filename)
    //{
    //	if (!m_file.open(filename))
    //		return false;

    //	readOption(OPTION_DIFFICULTY,	"Options","Difficulty");
    //	readOption(OPTION_HIRES,		"Options","Hires");
    //	readOption(OPTION_WINDOWED,		"Options","Windowed");
    //	readOption(OPTION_COLOURDEPTH,	"Options","ColourDepth");
    //	readOption(OPTION_JOYSTICK,		"Options","Joystick");
    //	readOption(OPTION_MUSIC,		"Options","Music");
    //	readOption(OPTION_SOUNDFX,		"Options","SoundFx");
    //	readOption(OPTION_PARTICLEFX,	"Options","ParticleFx");
    //	readOption(OPTION_BACKDROP,		"Options","Backdrop");
    //	readOption(OPTION_DEBUGINFO,	"Options","DebugInfo");
    //	readOption(OPTION_CHEATS,		"Options","Cheats");
    //	readOption(OPTION_CONTROL1,		"Options","Control1");
    //	readOption(OPTION_CONTROL2,		"Options","Control2");

    //	m_file.close();

    //	changesNoted();

    //	return true;
    //}

    ////-------------------------------------------------------------

    //bool COptions::save(const char *filename)
    //{
    //	if (!m_file.open(filename))
    //		return false;

    //	if (!m_file.writeInt("Options","Difficulty",	getOption(OPTION_DIFFICULTY)) ||
    //		!m_file.writeInt("Options","Hires",			getOption(OPTION_HIRES)) ||
    //		!m_file.writeInt("Options","Windowed",		getOption(OPTION_WINDOWED)) ||
    //		!m_file.writeInt("Options","ColourDepth",	getOption(OPTION_COLOURDEPTH)) ||
    //		!m_file.writeInt("Options","Joystick",		getOption(OPTION_JOYSTICK)) ||
    //		!m_file.writeInt("Options","Music",			getOption(OPTION_MUSIC)) ||
    //		!m_file.writeInt("Options","SoundFx",		getOption(OPTION_SOUNDFX)) ||
    //		!m_file.writeInt("Options","ParticleFx",	getOption(OPTION_PARTICLEFX)) ||
    //		!m_file.writeInt("Options","Backdrop",		getOption(OPTION_BACKDROP)) ||
    //		!m_file.writeInt("Options","DebugInfo",		getOption(OPTION_DEBUGINFO)) ||
    //		!m_file.writeInt("Options","Cheats",		getOption(OPTION_CHEATS)) ||

    //		!m_file.writeInt("Options","Control1",		getOption(OPTION_CONTROL1)) ||
    //		!m_file.writeInt("Options","Control2",		getOption(OPTION_CONTROL2))) {

    //		m_file.close();
    //		return false;
    //		}
    //	else {
    //		m_file.close();
    //		return true;
    //		}
    //}

    //-------------------------------------------------------------

    //public readOption(type /*: OptionType*/, section, key): void {
    //    this.setOption(type, m_file.readInt(section, key, this.m_defaults[type]));
    //}

    //-------------------------------------------------------------

    public setOption(type /*OptionType */, value: number): void {
        if (value != this.m_options[type]) {

            this.m_options[type] = value;
            this.m_changed = true;

            switch (type) {
                case OptionType.OPTION_HIRES:
                case OptionType.OPTION_COLOURDEPTH:
                case OptionType.OPTION_WINDOWED:
                    this.m_reload = true;
                    break;
                case OptionType.OPTION_SOUNDFX:
                    if (value == 0)
                        //CGameState::stopSamples();
                        break;
                case OptionType.OPTION_MUSIC:
                    if (value == 0)
                        //CGameState::stopMusic();
                        break;
            }
        }
    }

    //-------------------------------------------------------------

    public getOption(type/*OptionType */): number {
        return this.m_options[type];
    }

    //-------------------------------------------------------------

    public toggleOption(type/*OptionType */): void {
        this.setOption(type, 1 - this.getOption(type) & 1);
    }

    //-------------------------------------------------------------

    public areChanged(): boolean {
        return this.m_changed;
    }

    //-------------------------------------------------------------

    public requireReload(): boolean {

        return this.m_reload;
    }

    //-------------------------------------------------------------

    public changesNoted(): void {
        this.m_changed = false;
        this.m_reload = false;
    }

    //-------------------------------------------------------------
}
export = COptions; 