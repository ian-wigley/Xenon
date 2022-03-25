import gsCRectangle = require("Rectangle");
import gsCVector = require("Vector");
import gsCPoint = require("Point");
import gsCScreen = require("Screen");
import Point = require("Point");


class gsCImage {

    m_rect: gsCRectangle;
    private m_image: HTMLImageElement;

    m_imageTiles: HTMLImageElement;

    constructor() {
    }

    public enableColourKey(): void { //gsCColour(gsMAGENTA));
    }

    public setSize(rect: gsCRectangle): void {
        this.m_rect = rect;
    }

    public getSize(): gsCVector {
        return new gsCVector(this.m_rect.Right - this.m_rect.Left, this.m_rect.Bottom - this.m_rect.Top);
    }


    // Main tile Drawing method !! <gsCImage>
    public drawImage(position: Point, ctx: CanvasRenderingContext2D, img) {
        //var dest: gsCRectangle = new gsCRectangle(position.X, position.Y, position.X + this.m_rect.Right, position.Y + this.m_rect.Bottom);

        //ctx.drawImage(this.m_image, position.X, position.Y);
        ctx.drawImage(img, position.X, position.Y);

        //if (this.m_screen.contains(dest)) {
        //    ctx.drawImage(this.m_imageTiles, this.m_source_rects[tile].Left, this.m_source_rects[tile].Top, this.m_source_rects[tile].Right, this.m_source_rects[tile].Bottom, position.X, position.Y, this.m_source_rects[tile].Right, this.m_source_rects[tile].Bottom);
        //    return true;
        //}
        //else {
        //    var source: gsCRectangle = this.m_source_rects[tile];
        //    ctx.drawImage(this.m_imageTiles, source.Left, source.Top, source.Right, source.Bottom, position.X, position.Y, source.Right, source.Bottom);
        //    return true;
        //}
    }


    public get Image(): HTMLImageElement {
        return this.m_imageTiles;
    }

}

export = gsCImage;