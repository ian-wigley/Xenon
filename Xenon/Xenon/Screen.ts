import gsCPoint = require("Point");
import gsCRectangle = require("Rectangle");

class gsCScreen {

    m_screenRect: gsCRectangle = new gsCRectangle(0, 0, 640, 480);
    m_clipRect: gsCRectangle = new gsCRectangle(-64, 0, 704, 580);

    public contains(actorRect: gsCRectangle) {

        if (actorRect.Left >= this.m_clipRect.Left &&
            actorRect.Right <= this.m_clipRect.Right &&
            actorRect.Top >= this.m_clipRect.Top &&
            actorRect.Bottom <= this.m_clipRect.Bottom) {

            return true;
        }
        else {
            return false;
        }
    }

    //-------------------------------------------------------------

    public overlaps(rect: gsCRectangle) {
        return (this.m_screenRect.Left < rect.Right &&
            this.m_screenRect.Right > rect.Left &&
            this.m_screenRect.Top < rect.Bottom &&
            this.m_screenRect.Bottom > rect.Top);

    }

    //-------------------------------------------------------------

    //public getRect() {
    //    return this.m_rect;
    //}

    //-------------------------------------------------------------

    public getSize() {
        return this.m_screenRect.getSize();
    }

    //-------------------------------------------------------------

    public drawLine(from: gsCPoint, to: gsCPoint, colour: string, ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = colour;
        ctx.moveTo(from.X, from.Y);
        ctx.lineTo(to.X, to.Y);
        ctx.stroke();
    }

    //-------------------------------------------------------------

    public drawRect(rect: gsCRectangle, colour: string, ctx: CanvasRenderingContext2D): void {
        if (rect != null) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colour;
            ctx.rect(rect.Left, rect.Top, rect.Right, rect.Bottom);
            ctx.stroke();
        }
    }

    //-------------------------------------------------------------

    public drawSolidRect(rect: gsCRectangle, colour: string, ctx: CanvasRenderingContext2D): boolean {
        if (rect != null) {
            ctx.beginPath();
            ctx.fillStyle = colour;
            ctx.fillRect(rect.Left, rect.Top, rect.Right - 1, rect.Bottom - 1);
            ctx.stroke();
            return true
        }
        else {
            return false;
        }
    }

    //-------------------------------------------------------------

    public get screenRectangle(): gsCRectangle {
        return this.m_screenRect;
    }

    //-------------------------------------------------------------
}

export = gsCScreen;