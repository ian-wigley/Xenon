import gsCRectangle = require("Rectangle");
import gsCVector = require("Vector");

class gsCImage {

    m_rect: gsCRectangle;

    constructor() {
    }

    public setSize(rect: gsCRectangle) {
        this.m_rect = rect;
    }

    public getSize() {
        return new gsCVector(this.m_rect.Right - this.m_rect.Left, this.m_rect.Bottom - this.m_rect.Top);
    }
}

export = gsCImage;