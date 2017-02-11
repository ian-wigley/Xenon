class RECT {

    private m_left: number;
    private m_top: number;
    private m_right: number;
    private m_bottom: number;

    constructor(left: number, top: number, right: number, bottom: number) {
        this.m_left = left;
        this.m_top = top;
        this.m_right = right;
        this.m_bottom = bottom;
    }

    public get left(): number {
        return this.m_left;
    }

    public set left(value: number) {
        this.m_left = value;
    }

    public get top(): number {
        return this.m_top;
    }

    public set top(value: number) {
        this.m_top = value;
    }

    public get right(): number {
        return this.m_right;
    }

    public set right(value: number) {
        this.m_right = value;
    }

    public get bottom(): number {
        return this.m_bottom;
    }

    public set bottom(value: number) {
        this.m_bottom = value;
    }
}

import Point = require("Point");

class gsCRectangle {

    //private m_left: number;
    //private m_top: number;
    //private m_right: number;
    //private m_bottom: number;

    private m_rect: RECT;


    constructor(left: number, top: number, right: number, bottom: number) {
        this.m_rect = new RECT(left, top, right, bottom);

        //this.m_left = left;
        //this.m_top = top;
        //this.m_right = right;
        //this.m_bottom = bottom;
    }

    public get Left(): number {
        //return this.m_left;
        return this.m_rect.left;
    }

    public set Left(value: number) {
        this.m_rect.left = value;
    }

    public get Top(): number {
        return this.m_rect.top;
    }

    public set Top(value: number) {
        this.m_rect.top = value;
    }

    public get Right(): number {
        return this.m_rect.right;
    }

    public set Right(value: number) {
        this.m_rect.right = value;
    }

    public get Bottom(): number {
        return this.m_rect.bottom;
    }

    public set Bottom(value: number) {
        this.m_rect.bottom = value;
    }

    public IsEmpty(): boolean {

        return (this.m_rect.left >= this.m_rect.right) || (this.m_rect.top >= this.m_rect.bottom);
    }

    public clip(source, dest) {
        if (dest.m_rect.left < this.m_rect.left) {
            source.m_rect.left += (this.m_rect.left - dest.m_rect.left);
            dest.m_rect.left = this.m_rect.left;
        }
        if (dest.m_rect.right > this.m_rect.right) {
            source.m_rect.right -= (dest.m_rect.right - this.m_rect.right);
            dest.m_rect.right = this.m_rect.right;
        }
        if (dest.m_rect.top < this.m_rect.top) {
            source.m_rect.top += (this.m_rect.top - dest.m_rect.top);
            dest.m_rect.top = this.m_rect.top;
        }
        if (dest.m_rect.bottom > this.m_rect.bottom) {
            source.m_rect.bottom -= (dest.m_rect.bottom - this.m_rect.bottom);
            dest.m_rect.bottom = this.m_rect.bottom;
        }
    }

    public move(offset: Point) {
        this.m_rect.left += offset.X;
        this.m_rect.top += offset.Y;
        this.m_rect.right += offset.X;
        this.m_rect.bottom += offset.Y;
    }

    //public Width() {
    //    return this.m_width;
    //}

    //public Height() {
    //    return this.m_height;
    //}

    //contains(rect: gsCRectangle) {
    //    return (rect.Left >= this.m_rect.Left &&
    //        rect.Right <= this.m_rect.Right &&
    //        rect.Top >= this.m_rect.Top &&
    //        rect.Bottom <= this.m_rect.Bottom);
    //}

    //overlaps(rect: gsCRectangle) {
    //    return (this.m_rect.Left < rect.Right &&
    //        this.m_rect.Right > rect.Left &&
    //        this.m_rect.Top < rect.Bottom &&
    //        this.m_rect.Bottom > rect.Top);
    //}
}

export = gsCRectangle;