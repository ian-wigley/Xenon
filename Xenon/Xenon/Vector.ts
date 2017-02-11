import Point = require("Point");

class gsCVector extends Point {

    constructor(x: number, y: number) {
        super(x, y);
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

//class gsCVector {
//    m_x: number;
//    m_y: number;

//    constructor(x: number, y: number) {
//        this.m_x = x;
//        this.m_y = y;
//    }

//    public get length(): number {
//        return Math.sqrt(this.m_x * this.m_x + this.m_y * this.m_y);
//    }

//    public get x(): number {
//        return this.m_x;
//    }

//    public get y(): number {
//        return this.m_y;
//    }

//    public set x(value: number) {
//        this.m_x = value;
//    }

//    public set y(value: number) {
//        this.m_y = value;
//    }

//    public add(vector: gsCVector): gsCVector {
//        this.m_x += vector.x;
//        this.m_y += vector.y;
//        return this;
//    }

//    public subtract(vector: gsCVector): gsCVector {
//        this.m_x -= vector.x;
//        this.m_y -= vector.y;
//        return this;
//    }

//    public multiply(vector: gsCVector): gsCVector {
//        this.m_x *= vector.x;
//        this.m_y *= vector.y;
//        return this;
//    }

//    public divide(vector: gsCVector): gsCVector {
//        this.m_x /= vector.x;
//        this.m_y /= vector.y;
//        return this;
//    }
//}

//export = gsCVector;