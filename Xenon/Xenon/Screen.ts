import gsCRectangle = require("Rectangle");

class gsCScreen {
    m_rect: gsCRectangle = new gsCRectangle(0, 0, 640, 480);

    contains(actorRect: gsCRectangle) {

        //var test: boolean = (//rect.Left >= this.m_rect.Left &&
        //    //rect.Right <= this.m_rect.Right &&
        //    rect.Top >= this.m_rect.Top// &&
        ////rect.Bottom <= this.m_rect.Bottom);
        //    );

        //var test;
        ////if (rect.Top >= this.m_rect.Top) {
        ////    test = false;
        ////}


        ////if (rect.Left >= this.m_rect.Left &&
        ////rect.Right <= this.m_rect.Right &&
        ////rect.Top >= this.m_rect.Top &&
        ////rect.Bottom <= this.m_rect.Bottom) {
        //if (actorRect.Left >= this.m_rect.Left) {

        //    test = true;
        //    //return false;
        //}
        //else {
        //    test = false;
        //}

        //var screenRight: number = this.m_rect.Right;
        //var actorRight = actorRect.Right;

        //if (actorRect.Right < this.m_rect.Right) {
        //    test = true;
        //}
        //else {
        //    test = false;
        //}

        //if (actorRect.Top > this.m_rect.Top) {
        //    test = true;
        //}
        //else {
        //    test = false;
        //}
        //if (actorRect.Bottom <= this.m_rect.Bottom) {
        //    test = true;
        //}
        //else {
        //    test = false;
        //}
        ////else {
        ////return true;
        ////}

        //return (rect.Left >= this.m_rect.Left &&
        //    rect.Right <= this.m_rect.Right &&
        //    rect.Top >= this.m_rect.Top &&
        //    rect.Bottom <= this.m_rect.Bottom);

        if (actorRect.Left > this.m_rect.Left &&
            actorRect.Right < this.m_rect.Right &&
            actorRect.Top > this.m_rect.Top &&
            actorRect.Bottom < this.m_rect.Bottom) {

            return true;
        }
        else {
            return false;
        }
    }

    overlaps(rect: gsCRectangle) {
        return (this.m_rect.Left < rect.Right &&
            this.m_rect.Right > rect.Left &&
            this.m_rect.Top < rect.Bottom &&
            this.m_rect.Bottom > rect.Top);
    }
}

export = gsCScreen;