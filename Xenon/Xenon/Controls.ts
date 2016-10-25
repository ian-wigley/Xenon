class gsCControls {

    private m_left: boolean;			// true if left control held
    private m_right: boolean;			// true if right control held
    private m_up: boolean;				// true if up control held
    private m_down: boolean;			// true if down control held
    private m_fire: boolean;			// true if fire control held
    private m_firePressed: boolean;		// true if fire control has just been pressed
    private m_divePressed: boolean;		// true if dive control has just been pressed
    private m_reversePressed: boolean;	// true if reverse control has just been pressed
    //gsKeyCode key: boolean;			// latest key press

    constructor() {
        this.m_left = false;
        this.m_right = false;
        this.m_up = false;
        this.m_down = false;
        this.m_fire = false;
        this.m_firePressed = false;
        this.m_divePressed = false;
        this.m_reversePressed = false;
        //gsKeyCode key= false;			// latest key press
    }

    public get left(): boolean {
        return this.m_left;
    }

    public set left(value: boolean) {
        this.m_left = value;
    }

    public get right(): boolean {
        return this.m_right;
    }

    public set right(value: boolean) {
        this.m_right = value;
    }

    public get up(): boolean {
        return this.m_up;
    }

    public set up(value: boolean) {
        this.m_up = value;
    }

    public get down(): boolean {
        return this.m_down;
    }

    public set down(value: boolean) {
        this.m_down = value;
    }

    public get fire(): boolean {
        return this.m_fire;
    }

    public set fire(value: boolean) {
        this.m_fire = value;
    }

    public get firePressed(): boolean {
        return this.m_firePressed;
    }

    public set firePressed(value: boolean) {
        this.m_firePressed = value;
    }
}

export = gsCControls;