import enums = require("Enums");

class gsCTimer {
    //public time: number = 0;
    //private m_startTime: number = Date.now();
    private m_base_time: number = 0;
    private m_state: enums.gsTimerState;

    private m_freq: number = 3323581;
    private m_time0: number = 0;
    private m_previous_time: number = 0;
    private m_system_time: number = 0;
    private m_fake_time: number = 0;

    private m_ian_timer = 0;
    private m_ian_inc = 0.026;

    constructor() {
        // var prev = Date.now();
        // deltaTime = Date.now() - prev;
        //this.m_startTime = Date.now();
        this.m_base_time = 0;
        this.m_state = enums.gsTimerState.gsTIMER_RESET;
        this.initialize();
    }


    initialize() {
        this.m_time0 = Date.now();
        var t: number = this.getCurrentTime();
        this.m_system_time = t;// (t*100);
        this.m_previous_time = t;//(t*100);
    }

    //-------------------------------------------------------------
    // Update internal copy of system time
    //
    // Call once per game loop
    update(frame_done: boolean) {
        if (!frame_done) {
            this.m_previous_time = this.m_system_time;
        }
        this.m_system_time = this.getCurrentTime();
    }

    //-------------------------------------------------------------
    // Reset timer

    reset() {
        this.m_state = enums.gsTimerState.gsTIMER_RESET;
    }

    //-------------------------------------------------------------
    // Start timer

    start() {
        this.m_base_time = this.m_system_time;
        this.m_state = enums.gsTimerState.gsTIMER_ACTIVE;
    }

    //-------------------------------------------------------------
    // Pause timer

    pause() {
        this.m_base_time = this.m_system_time;
        this.m_state = enums.gsTimerState.gsTIMER_PAUSED;
    }

    //-------------------------------------------------------------
    // Unpause timer
    //
    // Notes:	Reported time continues from the time value when
    //			the timer was paused

    unpause() {
        this.m_base_time = this.m_system_time - this.m_base_time;
        this.m_state = enums.gsTimerState.gsTIMER_ACTIVE;
    }

    //-------------------------------------------------------------
    // Get the current state of the timer
    //
    // Returns:	One of the following states:
    //				gsTIMER_RESET
    //				gsTIMER_ACTIVE
    //				gsTIMER_PAUSED

    getState() {
        return this.m_state;
    }

    //-------------------------------------------------------------
    // Get current time 
    //
    // Returns:	Current time in seconds since timer was started

    getTime() {
        switch (this.m_state) {
            case enums.gsTimerState.gsTIMER_ACTIVE:
                //return this.m_system_time - this.m_base_time;
                //return this.m_ian_timer += this.m_ian_inc;
                var time = this.m_system_time - this.m_base_time;
                time = this.m_ian_timer += this.m_ian_inc;
                return time;

            case enums.gsTimerState.gsTIMER_PAUSED:
                return this.m_base_time;
            default:
                return 0;
        }
    }

    //-------------------------------------------------------------
    // Get delta time (between current and previous frame)

    public getDeltaTime() {
        return 5000 * (this.m_system_time - this.m_previous_time);
    }

    //-------------------------------------------------------------
    // Get current time
    getCurrentTime() {
        var t: number = Date.now();
        t -= this.m_time0;

        var test = window.performance.now();
        //var milli = Date.getMilliseconds();
        return t / this.m_freq;
    }

    //public get startTime(): number {
    //    return this.m_startTime;
    //}

    //public set startTime(value: number) {
    //    this.m_startTime = value;
    //}
}

export = gsCTimer;