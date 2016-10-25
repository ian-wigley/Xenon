class gsCRectangle {

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

    public get Left(): number {
        return this.m_left;
    }

    public get Top(): number {
        return this.m_top;
    }

    public get Right(): number {
        return this.m_right;
    }

    public get Bottom(): number {
        return this.m_bottom;
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