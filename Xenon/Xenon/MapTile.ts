import Point = require("Point");

class gsCMapTile {

    private gsMAPTILE_USERDATA: number = 4;

    private m_tile: number = 0;
    private m_empty: number = 0;
    private m_hidden: number = 0;
    private m_data: number[];   // user data
    private m_collision_flags: number;
    private m_size: Point;

    constructor(tile?: number, empty?: boolean, hidden?: boolean)
    {
        this.m_tile = tile;
        this.m_empty = empty ? 1 : 0;
        this.m_hidden = hidden ? 1 : 0;

        this.m_data = new Array(this.gsMAPTILE_USERDATA);

        for (var i = 0; i < this.gsMAPTILE_USERDATA; i++) {
            this.m_data[i] = 0;
        }
    }

    //-------------------------------------------------------------

    public setTile(tile: number): void {
        this.m_tile = tile;
    }

    //-------------------------------------------------------------

    public getTile(): number {
        return this.m_tile;
    }


    //-------------------------------------------------------------

    public setEmpty(state: boolean): void {
        this.m_empty = state ? 1 : 0;
    }

    //-------------------------------------------------------------

    public setHidden(state: boolean): void {
        this.m_hidden = state ? 1 : 0;
    }

    //-------------------------------------------------------------

    public setUserData(index: number, data: number): void {
        //gsASSERT(index >= 0 && index < gsMAPTILE_USERDATA);
        this.m_data[index] = data;
    }

    //-------------------------------------------------------------

    public setCollisionFlags(flags: number): void {
        this.m_collision_flags = flags;
    }

    //-------------------------------------------------------------

    public isEmpty(): boolean {
        return this.m_empty != 0;
    }

    //-------------------------------------------------------------

    public isHidden(): boolean {
        return this.m_hidden != 0;
    }

    //-------------------------------------------------------------

    public isDrawable(): boolean {
        return this.m_empty == 0 && this.m_hidden == 0;
    }

    //-------------------------------------------------------------

    public getUserData(index: number): number {
        //gsASSERT(index >= 0 && index < gsMAPTILE_USERDATA);
        return this.m_data[index];
    }

    //-------------------------------------------------------------

    public getCollisionFlags(): number {
        return this.m_collision_flags;
    }

    //-------------------------------------------------------------
}

export = gsCMapTile;