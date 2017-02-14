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

    public plus(a: gsCVector, b: gsCVector): gsCVector {
        return new gsCVector(a.m_x + b.m_x, a.m_y + b.m_y);
    }

    public plusEquals(a: gsCVector): gsCVector {
        this.m_x += a.m_x;
        this.m_y += a.m_y;
        return this;
    }

    public times(a: gsCVector, b: number): gsCVector {
        return new gsCVector(a.m_x * b, a.m_y * b);
    }


    public normalize(): void {
        var len = this.length;

        if (len > 0) {
            this.m_x /= len;
            this.m_y /= len;
        }
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