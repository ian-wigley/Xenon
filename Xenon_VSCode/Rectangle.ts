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

    public get width(): number {
        return this.m_right - this.m_left;
    }

    public get height(): number {
        return this.m_bottom - this.m_top;
    }
}

import gsCPoint = require("Point");

class gsCRectangle {

    private m_rect: RECT;

    constructor(left: number, top: number, right: number, bottom: number) {
        this.m_rect = new RECT(left, top, right, bottom);
    }

    //-------------------------------------------------------------

    public get Left(): number {
        return this.m_rect.left;
    }

    //-------------------------------------------------------------

    public set Left(value: number) {
        this.m_rect.left = value;
    }

    //-------------------------------------------------------------

    public get Top(): number {
        return this.m_rect.top;
    }

    //-------------------------------------------------------------

    public set Top(value: number) {
        this.m_rect.top = value;
    }

    //-------------------------------------------------------------

    public get Right(): number {
        return this.m_rect.right;
    }

    //-------------------------------------------------------------

    public set Right(value: number) {
        this.m_rect.right = value;
    }

    //-------------------------------------------------------------

    public get Bottom(): number {
        return this.m_rect.bottom;
    }

    //-------------------------------------------------------------

    public set Bottom(value: number) {
        this.m_rect.bottom = value;
    }

    //-------------------------------------------------------------

    public get Width(): number {
        return this.m_rect.width;
    }

    //-------------------------------------------------------------

    public get Height(): number {
        return this.m_rect.height;
    }

    //-------------------------------------------------------------

    public getSize() {
        return new gsCPoint(this.m_rect.right - this.m_rect.left,
            this.m_rect.bottom - this.m_rect.top);
    }


    public IsEmpty(): boolean {
        return (this.m_rect.left >= this.m_rect.right) || (this.m_rect.top >= this.m_rect.bottom);
    }

    //-------------------------------------------------------------

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

    //-------------------------------------------------------------

    public move(offset: gsCPoint): void {
        this.m_rect.left += offset.X;
        this.m_rect.top += offset.Y;
        this.m_rect.right += offset.X;
        this.m_rect.bottom += offset.Y;
    }

    //-------------------------------------------------------------

    //public contains(rect: gsCRectangle): boolean {
    //    return (rect.Left >= this.m_rect.left &&
    //        rect.Right <= this.m_rect.right &&
    //        rect.Top >= this.m_rect.top &&
    //        rect.Bottom <= this.m_rect.bottom);
    //}

    //-------------------------------------------------------------

    public overlaps(rect: gsCRectangle): boolean {
        return (this.m_rect.left < rect.Right &&
            this.m_rect.right > rect.Left &&
            this.m_rect.top < rect.Bottom &&
            this.m_rect.bottom > rect.Top);
    }

    //-------------------------------------------------------------
    // Expand/shrink
    public expand(amount: number): void {
        this.m_rect.left -= amount;
        this.m_rect.top -= amount;
        this.m_rect.right += amount;
        this.m_rect.bottom += amount;
    }

    //-------------------------------------------------------------

}

export = gsCRectangle;