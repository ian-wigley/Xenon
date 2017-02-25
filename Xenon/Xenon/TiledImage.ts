import gsCImage = require("Image");
import gsCPoint = require("Point");
import gsCScreen = require("Screen");
import gsCRectangle = require("Rectangle");
import gsCVector = require("Vector");
import Point = require("Point");

class gsCTiledImage extends gsCImage {

    protected m_tile_size: Point;
    protected m_num_tiles: number;
    private m_source_rects: Array<gsCRectangle>;
    private m_screen: gsCScreen;

    constructor(imageTile: HTMLImageElement) {
        super();
        this.m_imageTiles = imageTile;
        var m_rect: gsCRectangle = new gsCRectangle(0, 0, imageTile.width, imageTile.height);
        this.setSize(m_rect);
        this.m_screen = new gsCScreen;
    }

    public calculateSourceRects() {
        this.m_num_tiles = 0;

        if (this.m_tile_size.X == 0 ||
            this.m_tile_size.Y == 0) {
            return false;
        }

        if (this.getSize().x == 0 ||
            this.getSize().y == 0) {
            return false;
        }

        var horiz: number = this.getSize().x / this.m_tile_size.X;
        var vert: number = this.getSize().y / this.m_tile_size.Y;
        this.m_num_tiles = horiz * vert;
        this.m_source_rects = [];

        for (var y = 0; y + this.m_tile_size.Y <= this.getSize().y; y += this.m_tile_size.Y) {
            for (var x = 0; x + this.m_tile_size.X <= this.getSize().x; x += this.m_tile_size.X) {
                this.m_source_rects.push(new gsCRectangle(x, y, x + this.m_tile_size.X, y + this.m_tile_size.Y));
            }
        }

        return true;
    }

    //-------------------------------------------------------------

    public setTileSize(tile_size: Point) {
        this.m_tile_size = tile_size;
        return this.calculateSourceRects();
    }

    //-------------------------------------------------------------

    public getTileSize() {
        return this.m_tile_size;
    }

    //-------------------------------------------------------------

    public getNumTiles() {
        return this.m_num_tiles;
    }

    //-------------------------------------------------------------

    // Main tile Drawing method !! <gsCTiledImage>
    public draw(tile: number, position: Point, ctx: CanvasRenderingContext2D): boolean {
        if (tile >= this.m_source_rects.length) {
            return false;
        }

        var dest: gsCRectangle = new gsCRectangle(position.X, position.Y, position.X + this.m_tile_size.X, position.Y + this.m_tile_size.Y);
        if (this.m_screen.contains(dest)) {
            ctx.drawImage(this.m_imageTiles, this.m_source_rects[tile].Left, this.m_source_rects[tile].Top, this.m_source_rects[tile].Width, this.m_source_rects[tile].Height, position.X, position.Y, this.m_source_rects[tile].Width, this.m_source_rects[tile].Height);
            return true;
        }
        else {
            //var source: gsCRectangle = this.m_source_rects[tile];
            ctx.drawImage(this.m_imageTiles, this.m_source_rects[tile].Left, this.m_source_rects[tile].Top, this.m_source_rects[tile].Width, this.m_source_rects[tile].Height, position.X, position.Y, this.m_source_rects[tile].Width, this.m_source_rects[tile].Height);
            return true;
        }
    }

    //-------------------------------------------------------------

    public drawSolid(tile: number, position: Point, ctx: CanvasRenderingContext2D, tfill_colour/*gsCColour&*/): boolean {
        //    if (tile >= m_num_tiles)
        //        return false;

        //    if (!m_direct_draw) {
        //        gsREPORT("gsCTiledImage::draw called with no direct draw device");
        //        return false;
        //    }

        //    gsCScreen * screen = gsCApplication::getScreen();

        //    if (!screen) {
        //        gsREPORT("gsCTiledImage::draw called with no active screen");
        //        return false;
        //    }

        //    gsCRect dest(position, position + m_tile_size);

        //    if (screen ->getRect().contains(dest)) {

        //        bool ok = false;

        //        if (lock()) {
        //            ok = screen ->bltSolid(dest, m_ddsd, m_source_rects[tile], fill_colour);
        //            unlock();
        //        }
        //        if (!ok) {
        //            gsREPORT("gsCTiledImage::drawSolid blit failed");
        //            return false;
        //        }
        //    }
        //    else {
        //        if (!screen ->getRect().overlaps(dest))
        //            return false;

        //        gsCRect source = m_source_rects[tile];

        //        screen ->getRect().clip(source, dest);

        //        bool ok = false;

        //        if (lock()) {
        //            ok = screen ->bltSolid(dest, m_ddsd, source, fill_colour);
        //            unlock();
        //        }
        //        if (!ok) {
        //            gsREPORT("gsCTiledImage::drawSolid blit failed");
        //            return false;
        //        }
        //    }

        return true;
    }

    //-------------------------------------------------------------

    public drawTinted(tile: number, position: Point, tint_colour: string/*gsCColour&*/, ctx: CanvasRenderingContext2D): boolean {
        if (tile >= this.m_num_tiles) {
            return false;
        }

        //if (!m_direct_draw) {
        //    gsREPORT("gsCTiledImage::draw called with no direct draw device");
        //    return false;
        //}

        //gsCScreen * screen = gsCApplication::getScreen();

        //if (!screen) {
        //    gsREPORT("gsCTiledImage::draw called with no active screen");
        //    return false;
        //}

        //gsCRect dest(position, position + m_tile_size);
        var dest: gsCRectangle = new gsCRectangle(position.X, position.Y, position.X + this.m_tile_size.X, position.Y + this.m_tile_size.Y);

        if (this.m_screen.contains(dest)) {
            //if (screen ->getRect().contains(dest)) {

            var ok: boolean = false;

            ctx.drawImage(this.m_imageTiles, this.m_source_rects[tile].Left, this.m_source_rects[tile].Top, this.m_source_rects[tile].Width, this.m_source_rects[tile].Height, position.X, position.Y, this.m_source_rects[tile].Width, this.m_source_rects[tile].Height);
            //if (lock()) {
            //    ok = screen->bltTinted(dest, m_ddsd, m_source_rects[tile], tint_colour);
            //    unlock();
            //}
            //if (!ok) {
            //    gsREPORT("gsCTiledImage::drawTinted blit failed");
            //    return false;
            //}
        }
        else {
            //if (!screen ->getRect().overlaps(dest))
            //    return false;

            //gsCRect source = m_source_rects[tile];

            //screen ->getRect().clip(source, dest);

            //bool ok = false;

            //if (lock()) {
            //    ok = screen ->bltTinted(dest, m_ddsd, source, tint_colour);
            ctx.drawImage(this.m_imageTiles, this.m_source_rects[tile].Left, this.m_source_rects[tile].Top, this.m_source_rects[tile].Width, this.m_source_rects[tile].Height, position.X, position.Y, this.m_source_rects[tile].Width, this.m_source_rects[tile].Height);
            //    unlock();
            //}
            //if (!ok) {
            //    gsREPORT("gsCTiledImage::drawTinted blit failed");
            //    return false;
            //}
        }

        return true;
    }

    //-------------------------------------------------------------

    public drawFast(tile: number, position: Point, ctx: CanvasRenderingContext2D): boolean {
        var source: gsCRectangle = this.m_source_rects[tile];
        ctx.drawImage(this.m_imageTiles, this.m_source_rects[tile].Left, this.m_source_rects[tile].Top, this.m_source_rects[tile].Width, this.m_source_rects[tile].Height, position.X, position.Y, this.m_source_rects[tile].Width, this.m_source_rects[tile].Height);
        return true;
    }

    //-------------------------------------------------------------
}

export = gsCTiledImage;