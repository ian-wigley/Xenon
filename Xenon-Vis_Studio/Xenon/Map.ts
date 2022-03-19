import gsCMapTile = require("MapTile");
import gsCTiledImage = require("TiledImage");
import Point = require("Point");
import gsCVector = require("Vector");
import Rectangle = require("Rectangle");

class gsCMap {

    protected m_size: Point;
    m_image: gsCTiledImage;
    m_map_tiles: Array<gsCMapTile>;
    m_hit_list: Array<Point> = new Array<Point>();

    private tileCounter: number = 0;
    private m_position: gsCVector;//Point;
    private m_tile_size: Point;
    private m_total_size: Point;
    private m_imageTiles: HTMLImageElement;
    private m_title: string = "";
    private m_screen_rect: Rectangle = new Rectangle(0, 0, 640, 480);

    constructor(image?: HTMLImageElement, title?: string) {
        this.m_imageTiles = image;
        this.m_title = title;
        //m_image = 0;
        this.m_size = new Point(0, 0);
        //m_map_tiles = 0;
        this.m_position = new gsCVector(0, 0); //Point(0, 0);
        this.m_tile_size = new Point(0, 0);
        this.m_total_size = new Point(0, 0);
    }

    destroy(): void {
        //destroyMapTiles();
    }

    //-------------------------------------------------------------

    public createMapTiles(): void {
        if (this.m_size.X == 0 || this.m_size.Y == 0) {
            //    return;
        }

        this.m_map_tiles = new Array<gsCMapTile>(this.m_size.X * this.m_size.Y);
        for (var i = 0; i < (this.m_size.X * this.m_size.Y); i++) {
            this.m_map_tiles[i] = null;
        }
        this.clear(0, true);
    }

    //-------------------------------------------------------------

    public destroyMapTiles(): void {
        if (this.m_map_tiles != null) {
            this.m_map_tiles = [];
        }
    }

    //-------------------------------------------------------------

    public clear(tile: number, empty: boolean): void {
        var counter: number = 0;
        var temp: gsCMapTile;
        for (var y = 0; y < this.m_size.Y; y++) {
            for (var x = 0; x < this.m_size.X; x++) {
                temp = new gsCMapTile(tile, empty, false);
                this.setMapTile(new Point(x, y), temp, counter);// = new gsCMapTile(tile, empty, false));
                counter++;
            }
        }
    }

    //-------------------------------------------------------------

    public calculateTotalSize(): void {
        //if (m_image != null || m_map_tiles.Length > 0)
        if (this.m_image == null) {
            this.m_tile_size = new Point(0, 0);
            this.m_total_size = new Point(0, 0);
        }
        else {
            this.m_tile_size = this.m_image.getTileSize();
            this.m_total_size = new Point(this.m_tile_size.X * this.m_size.X, this.m_tile_size.Y * this.m_size.Y);
        }
    }

    //-------------------------------------------------------------

    public setImage(image: gsCTiledImage): void {
        this.m_image = image;
        this.calculateTotalSize();
    }

    //-------------------------------------------------------------

    public setSize(size: Point): void {
        this.destroyMapTiles();
        this.m_size = size;
        this.createMapTiles();
        this.calculateTotalSize();
    }

    //-------------------------------------------------------------

    public setMapTile(coords: Point, map_tile: gsCMapTile, counter: number): boolean {

        // Get the array index
        var p: gsCMapTile = this.getMapTile(coords);

        // Store the new tile values into the array of tiles
        // counter parameter not currently used
        this.m_map_tiles[this.tileCounter] = map_tile;

        return true;
    }

    //-------------------------------------------------------------

    public setPosition(position: gsCVector): void {
        this.m_position = position;
    }

    //-------------------------------------------------------------

    public getImage(): gsCTiledImage {
        return this.m_image;
    }

    //-------------------------------------------------------------

    public getSize(): Point {
        return this.m_size;
    }

    //-------------------------------------------------------------

    public getSizeInPixels(): Point {
        return this.m_total_size;
    }

    //-------------------------------------------------------------

    public getMapTile(coords: Point): gsCMapTile {
        if (coords.X < 0 ||
            coords.Y < 0 ||
            coords.X >= this.m_size.X ||
            coords.Y >= this.m_size.Y) {
            return null;
        }
        else {
            this.tileCounter = this.m_size.X * coords.Y + coords.X;
            return this.m_map_tiles[this.m_size.X * coords.Y + coords.X];
        }
    }
    //-------------------------------------------------------------

    //public gsCMapTile getMapTilePlusPlus()
    //{
    //    //++testCounter;
    //    return m_map_tiles[testCounter++];
    //}

    //-------------------------------------------------------------

    //public gsCMapTile[] getListOfMapTiles()
    //{
    //    return m_map_tiles;
    //}

    //-------------------------------------------------------------

    public updateListOfMapTiles(mt: gsCMapTile[]): void {
        this.m_map_tiles = mt;
    }

    //-------------------------------------------------------------

    public getPosition(): gsCVector {
        return this.m_position;
    }

    //-------------------------------------------------------------

    public move(offset: Point): void {
        this.m_position.X += offset.X;
        this.m_position.Y += offset.Y;
    }

    //-------------------------------------------------------------

    public drawMap(ctx: CanvasRenderingContext2D): void {

        this.tileCounter = 0;

        //if (!m_image || !m_map_tiles)
        //    return;

        // clip map against screen
        var screen_rect: Rectangle = this.m_screen_rect;

        // get map source and dest rects in pixel coords
        var source_rect: Rectangle = new Rectangle(0, 0, (this.m_size.X * this.m_tile_size.X), (this.m_size.Y * this.m_tile_size.Y));
        var dest_rect: Rectangle = new Rectangle(0, 0, (this.m_size.X * this.m_tile_size.X), (this.m_size.Y * this.m_tile_size.Y));
        dest_rect.move(this.m_position);
        screen_rect.clip(source_rect, dest_rect);

        if (!dest_rect.IsEmpty()) {

            // convert back to tile coords
            var left = Math.floor(source_rect.Left / this.m_tile_size.X);
            var top = Math.floor(source_rect.Top / this.m_tile_size.Y);
            var right = Math.floor((source_rect.Right - 1) / this.m_tile_size.X);
            var bottom = Math.floor((source_rect.Bottom - 1) / this.m_tile_size.Y);

            var x, y;
            var map_tile: gsCMapTile;
            var pos: Point;
            var step: Point;

            // top edge clipped
            map_tile = this.getMapTile(new Point(left, top));
            pos = new gsCVector(this.m_position.X + new gsCVector(left, top).x * this.m_tile_size.X, this.m_position.Y + new gsCVector(left, top).y * this.m_tile_size.Y);
            step = new Point(1 * this.m_tile_size.X, 0);
            for (x = left; x <= right; x++) {
                if (map_tile.isDrawable()) {
                    this.m_image.draw(map_tile.getTile(), pos, ctx);
                }
                map_tile = this.m_map_tiles[++this.tileCounter];
                pos.add(step);
            }

            // bottom edge clipped
            map_tile = this.getMapTile(new Point(left, bottom));
            pos = new gsCVector(this.m_position.X + new gsCVector(left, bottom).x * this.m_tile_size.X, this.m_position.Y + new gsCVector(left, bottom).y * this.m_tile_size.Y);
            step = new Point(1 * this.m_tile_size.X, 0);
            for (x = left; x <= right; x++) {
                if (map_tile.isDrawable()) {
                    this.m_image.draw(map_tile.getTile(), pos, ctx);
                }
                map_tile = this.m_map_tiles[++this.tileCounter];
                pos.add(step);
            }

            // left edge clipped
            map_tile = this.getMapTile(new Point(left, top + 1));
            pos = new gsCVector(this.m_position.X + new gsCVector(left, top + 1).x * this.m_tile_size.X, this.m_position.Y + new gsCVector(left, top + 1).y * this.m_tile_size.Y);
            step = new Point(0, 1 * this.m_tile_size.X);
            for (y = top + 1; y < bottom; y++) {
                if (map_tile.isDrawable()) {
                    this.m_image.draw(map_tile.getTile(), pos, ctx);
                }
                map_tile = this.m_map_tiles[this.tileCounter += this.m_size.X];
                pos.add(step);
            }

            // right edge clipped
            map_tile = this.getMapTile(new Point(right, top + 1));
            pos = new gsCVector(this.m_position.X + new gsCVector(right, top + 1).x * this.m_tile_size.X, this.m_position.Y + new gsCVector(right, top + 1).y * this.m_tile_size.Y);
            step = new Point(0, 1 * this.m_tile_size.X);
            for (y = top + 1; y < bottom; y++) {
                if (map_tile.isDrawable()) {
                    this.m_image.draw(map_tile.getTile(), pos, ctx);
                }
                map_tile = this.m_map_tiles[this.tileCounter += this.m_size.X];
                pos.add(step);
            }

            // middle not clipped
            for (y = top + 1; y < bottom; y++) {
                map_tile = this.getMapTile(new Point(left + 1, y));
                pos = new Point(this.m_position.X + new gsCVector(left + 1, y).x * this.m_tile_size.X, this.m_position.Y + new gsCVector(left + 1, y).y * this.m_tile_size.Y);
                step = new Point(1 * this.m_tile_size.X, 0);
                for (x = left + 1; x < right; x++) {
                    if (map_tile.isDrawable()) {
                        this.m_image.drawFast(map_tile.getTile(), pos, ctx);
                    }
                    map_tile = this.m_map_tiles[++this.tileCounter];
                    pos.add(step);
                }
            }
        }
    }

    //-------------------------------------------------------------
    // Find tiles which overlap rect
    public hitBy(rect: Rectangle, collision_mask: number): number {
        var dest: Rectangle = rect;
        var source = new Rectangle(0, 0, this.m_total_size.X, this.m_total_size.Y);

        //    source.clip(dest);
        //    if (dest.isEmpty())
        //        return 0;

        //    m_hit_list.clear();
        this.m_hit_list = [];

        //    int x1 = dest.getLeft() / m_tile_size.getX();
        //    int y1 = dest.getTop() / m_tile_size.getY();
        //    int x2 = (dest.getRight() - 1) / m_tile_size.getX();
        //    int y2 = (dest.getBottom() - 1) / m_tile_size.getY();

        //    for (int x = x1; x <= x2; x++) {
        //        for (int y = y1; y <= y2; y++) {
        //            gsCPoint pos(x,y);
        //            gsCMapTile *mt = getMapTile(pos);
        //            if (!mt->isEmpty() &&
        //                !mt->isHidden() &&
        //                (mt->getCollisionFlags() & collision_mask) != 0)
        //                m_hit_list.addItem(pos);
        //            }
        //        }

        return this.m_hit_list.length;//.getSize();
    }

    //-------------------------------------------------------------

    public getHitPosition(n: number): Point {
        return this.m_hit_list[n];
    }

    //-------------------------------------------------------------
}

export = gsCMap;