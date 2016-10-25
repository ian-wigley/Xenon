import gsCImage = require("Image");
import gsCScreen = require("Screen");
import gsCRectangle = require("Rectangle");
import gsCVector = require("Vector");

class gsCTiledImage extends gsCImage {

    private m_tile_size: gsCVector;
    private m_num_tiles: number;
    private m_source_rects: Array<gsCRectangle>;
    private m_imageTiles: HTMLImageElement;

    constructor(imageTile: HTMLImageElement) {
        super();
        this.m_imageTiles = imageTile;
        var m_rect: gsCRectangle = new gsCRectangle(0, 0, imageTile.width, imageTile.height);
        this.setSize(m_rect);
    }

    public calculateSourceRects() {
        //if (m_source_rects.e)
        //{
        //    delete[] m_source_rects;
        //    m_source_rects = 0;
        //}

        this.m_num_tiles = 0;

        if (this.m_tile_size.x == 0 ||
            this.m_tile_size.y == 0) {
            return false;
        }

        if (this.getSize().x == 0 ||
            this.getSize().y == 0) {
            return false;
        }

        var horiz: number = this.getSize().x / this.m_tile_size.x;
        var vert: number = this.getSize().y / this.m_tile_size.y;
        this.m_num_tiles = horiz * vert;
        this.m_source_rects = [];
        var i: number = 0;

        for (var y = 0; y + this.m_tile_size.y <= this.getSize().y; y += this.m_tile_size.y) {
            for (var x = 0; x + this.m_tile_size.x <= this.getSize().x; x += this.m_tile_size.x) {
                this.m_source_rects.push(new gsCRectangle(x, y, this.m_tile_size.x, this.m_tile_size.y));

                i++;
            }
        }

        return true;
    }

    //-------------------------------------------------------------

    public setTileSize(tile_size: gsCVector) {
        this.m_tile_size = tile_size;
        return this.calculateSourceRects();
    }

    //-------------------------------------------------------------

    getTileSize() {
        return this.m_tile_size;
    }

    //-------------------------------------------------------------

    public getNumTiles() {
        return this.m_num_tiles;
    }

    //-------------------------------------------------------------

    // Draw the tiles !! <gsCTiledImage>
    public draw(tile: number, position: gsCVector, ctx: CanvasRenderingContext2D) {
        var dest: gsCRectangle = new gsCRectangle(position.x, position.y, position.x + this.m_tile_size.x, position.y + this.m_tile_size.y);
        var screen: gsCScreen = new gsCScreen;

        if (screen.contains(dest)) {
            var source: gsCRectangle = this.m_source_rects[tile];

            //ctx.font = "12px Arial";
            //ctx.fillStyle = "white";
            //ctx.fillText("X position :" + position.x, 0, 40);
            //ctx.fillText("Y position :" + position.y, 0, 60);

            //ctx.fillText("Dest rect height:" + dest.Top, 0, 80);
            //ctx.fillText("Dest rect width:" + dest.Right, 0, 100);

            ////ctx.fillText("Number of Actors:" + this.getNumberOfActors(), 0, 120);
            ////ctx.drawImage(this.m_imageTiles, position.x, position.y, source.Width(), source.Height(), 0, 0, this.m_tile_size.x, this.m_tile_size.y);
            ////ctx.drawImage(this.m_imageTiles, 0, 0, 64, 64, position.x, position.y, 64, 64);
            ////ctx.drawImage(this.m_imageTiles, source.Left(), source.Top(), 64, 64, position.x, position.y, 64, 64);

            ////img 	Specifies the image, canvas, or video element to use 	 	
            ////sx 	Optional. The x coordinate where to start clipping 	
            ////sy 	Optional. The y coordinate where to start clipping 	
            ////swidth 	Optional. The width of the clipped image 	
            ////sheight 	Optional. The height of the clipped image 	
            ////x 	The x coordinate where to place the image on the canvas 	
            ////y 	The y coordinate where to place the image on the canvas 	
            ////width 	Optional. The width of the image to use (stretch or reduce the image) 	
            ////height 	Optional. The height of the image to use (stretch or reduce the image)
            ////context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
            ctx.drawImage(this.m_imageTiles, source.Left, source.Top, source.Right, source.Bottom, position.x, position.y, source.Right, source.Bottom);
            return true;
        }

        return false;
    }
}

export = gsCTiledImage;