class Point {

    m_x: number;
    m_y: number;

    constructor(x: number, y: number) {
        this.m_x = x;
        this.m_y = y;
    }

    public get X(): number {
        return this.m_x;
    }

    public set X(value: number) {
        this.m_x = value;
    }

    public get Y(): number {
        return this.m_y;
    }

    public set Y(value: number) {
        this.m_y = value;
    }

    public add(point: Point): Point {
        this.m_x += point.X;
        this.m_y += point.Y;
        return this;
    }

    public subtract(point: Point): Point {
        this.m_x -= point.X;
        this.m_y -= point.Y;
        return this;
    }

    public multiply(point: Point): Point {
        this.m_x *= point.X;
        this.m_y *= point.Y;
        return this;
    }

    public divide(point: Point): Point {
        this.m_x /= point.X;
        this.m_y /= point.Y;
        return this;
    }
}

export = Point;