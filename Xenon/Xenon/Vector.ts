import Point = require("Point");

class gsCVector extends Point {

    gsPI: number = 3.141592654;

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

    public plus1(a: gsCVector): gsCVector {
        this.m_x + a.m_x;
        this.m_y + a.m_y;
        return this;
    }

    public plus(a: gsCVector, b: gsCVector): gsCVector {
        return new gsCVector(a.m_x + b.m_x, a.m_y + b.m_y);
    }

    public plusEquals(a: gsCVector): gsCVector {
        this.m_x += a.m_x;
        this.m_y += a.m_y;
        return this;
    }

    public minusEquals(a: gsCVector): gsCVector {
        this.m_x -= a.m_x;
        this.m_y -= a.m_y;
        return this;
    }

    public times(a: gsCVector, b: number): gsCVector {
        return new gsCVector(a.m_x * b, a.m_y * b);
    }

    public direction() {
        return this.gsArcTan(this.m_x, -this.m_y);
    }

    private gsArcTan(y: number, x: number) {
        return this.gsRad2Deg(Math.atan2(y, x));
    }

    private gsRad2Deg(angle: number) {
        return angle * (180.0 / this.gsPI);
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