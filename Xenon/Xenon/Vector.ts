class gsCVector {
    m_x: number;
    m_y: number;

    constructor(x: number, y: number) {
        this.m_x = x;
        this.m_y = y;
    }

    public get length(): number {
        return Math.sqrt(this.m_x * this.m_x + this.m_y * this.m_y);
    }

    public get x(): number {
        return this.m_x;
    }

    public get y(): number {
        return this.m_y;
    }

    public set x(value: number) {
        this.m_x = value;
    }

    public set y(value: number) {
        this.m_y = value;
    }
}

export = gsCVector;