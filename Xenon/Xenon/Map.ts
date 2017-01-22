import gsCMapTile = require("MapTile");
import gsCTiledImage = require("TiledImage");
import Point = require("Point");
import Vector2 = require("Vector");
import Rectangle = require("Rectangle");

class gsCMap {

    debugCounter: number = 0;

    protected m_size: Point;
    m_image: gsCTiledImage;
    m_map_tiles: Array<gsCMapTile>;
    m_hit_list: Array<Point> = new Array<Point>();

    // More fudge !
    testCounter: number = 0;
    indexes: Array<number> = new Array<number>();
    points: Array<Vector2> = new Array<Vector2>();
    srcRects: Array<Rectangle> = new Array<Rectangle>();
    destRects: Array<Rectangle> = new Array<Rectangle>();

    collectedTiles: Array<gsCMapTile> = new Array<gsCMapTile>();
    position_counter: Array<Point> = new Array<Point>();
    srcRect: Array<Rectangle> = new Array<Rectangle>();
    destRect: Array<Rectangle> = new Array<Rectangle>();

    m_position: Point;//Vector2;
    m_tile_size: Point;
    m_total_size: Point;

    //Texture2D m_imageTiles;
    m_imageTiles;

    m_title: string = "";

    //constructor(Texture2D image, string title) {
 //   constructor()
    constructor(image?, title?) {
        this.m_imageTiles = image;
        this.m_title = title;
        //m_image = 0;
        this.m_size = new Point(0, 0);
        //m_map_tiles = 0;
        this.m_position = new Point(0, 0);
        this.m_tile_size = new Point(0, 0);
        this.m_total_size = new Point(0, 0);

        this.indexes = [];
    }

    destroy(): void {
        //destroyMapTiles();
    }

    //-------------------------------------------------------------

    createMapTiles(): void {
        if (this.m_size.X == 0 || this.m_size.Y == 0) {
            //    return;
        }

        //m_map_tiles = new gsCMapTile[m_size.X * m_size.Y];
        //m_map_tiles.r.Add (new gsCMapTile[m_size.X * m_size.Y]);
        this.m_map_tiles = new Array<gsCMapTile>(this.m_size.X * this.m_size.Y);
        for (var i = 0; i < (this.m_size.X * this.m_size.Y); i++) {
            this.m_map_tiles.push(null);
        }
        this.clear(0, true);
    }

    //-------------------------------------------------------------

    destroyMapTiles(): void {
        if (this.m_map_tiles != null) {
            //delete[] m_map_tiles;
            //m_map_tiles = 0;
        }
    }

    //-------------------------------------------------------------

    clear(tile: number, empty: boolean): void {
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

    calculateTotalSize(): void {
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
        //this.m_map_tiles.RemoveAt(this.testCounter);
        //this.m_map_tiles.Insert(this.testCounter, map_tile);
        this.m_map_tiles.push(map_tile);

        return true;
    }

    //-------------------------------------------------------------

    public setPosition(position: Point): void {
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

    ////-------------------------------------------------------------

    public getMapTile(coords: Point): gsCMapTile {
        if (coords.X < 0 ||
            coords.Y < 0 ||
            coords.X >= this.m_size.X ||
            coords.Y >= this.m_size.Y) {
            return null;
        }
        else {
            this.testCounter = this.m_size.X * coords.Y + coords.X;
            this.indexes.push(this.testCounter);
            return this.m_map_tiles[this.m_size.X * coords.Y + coords.X];
        }
    }

    public ClearTestingIndex(): void {
        this.indexes = [];
    }

    //public gsCMapTile getMapTilePlusPlus()
    //{
    //    //++testCounter;
    //    return m_map_tiles[testCounter++];
    //}

    //public gsCMapTile[] getListOfMapTiles()
    //{
    //    return m_map_tiles;
    //}

    //public void updateListOfMapTiles(gsCMapTile[] mt)
    //{
    //    m_map_tiles = mt;
    //}

    ////-------------------------------------------------------------

    public getPosition(): Point { //Vector2 {
        return this.m_position;
    }

    ////-------------------------------------------------------------

    public move(offset: Point): void {
        //this.m_position += offset;
        this.m_position.X += offset.X;
        this.m_position.Y += offset.Y;
        //position_counter.Add(m_position);
        //if (m_position.Y > 0) {
        //    int jklm = 0;
        //}
    }

    //-------------------------------------------------------------

    public drawMap(ctx: CanvasRenderingContext2D): void {

        this.debugCounter++;

        this.ClearTestingIndex();
        //if (!m_image || !m_map_tiles)
        //    return;

        //gsCScreen *screen = gsCApplication::getScreen();

        //if (!screen)
        //    return;

        // clip map against screen

        var screen_rect: Rectangle  = new Rectangle(0, 0, 640, 480);// screen->getRect();

        // get map source and dest rects in pixel coords

        //Rectangle source_rect = new Rectangle(0, 32288, (m_size.X * m_tile_size.X), (m_size.Y * m_tile_size.Y));
        var source_rect: Rectangle  = new Rectangle(0, 0, (this.m_size.X * this.m_tile_size.X), (this.m_size.Y * this.m_tile_size.Y));

        //           source_rect.Bottom = 32768;

        var dest_rect: Rectangle = source_rect;
        //dest_rect..move(m_position);

        dest_rect.Left += this.m_position.X;//.getX();
        dest_rect.Top += this.m_position.Y;// offset.getY();
        dest_rect.Right += this.m_position.X;// offset.getX();
        dest_rect.Bottom += this.m_position.Y;// offset.getY();


        //screen_rect.clip(source_rect,dest_rect);
        if (dest_rect.Left < screen_rect.Left) {
            source_rect.Left += (screen_rect.Left - dest_rect.Left);
            dest_rect.Left = screen_rect.Left;
        }
        if (dest_rect.Right > screen_rect.Right) {
            source_rect.Right -= (dest_rect.Right - screen_rect.Right);
            dest_rect.Right = screen_rect.Right;
        }
        if (dest_rect.Top < screen_rect.Top) {
            source_rect.Top += (screen_rect.Top - dest_rect.Top);
            dest_rect.Top = screen_rect.Top;
        }
        if (dest_rect.Bottom > screen_rect.Bottom) {
            source_rect.Bottom -= (dest_rect.Bottom - screen_rect.Bottom);
            dest_rect.Bottom = screen_rect.Bottom;
        }


        this.srcRect.push(source_rect);
        this.destRect.push(dest_rect);

        //List < int > drawcall = new List<int>();
        var drawcall: Array <number> = new Array<number>();
        this.points = [];
        this.collectedTiles = [];
        //            testCounter++;


        if (!dest_rect.IsEmpty) {

            // convert back to tile coords

            var left = source_rect.Left / this.m_tile_size.X;
            var top = source_rect.Top / this.m_tile_size.Y;
            var right = (source_rect.Right - 1) / this.m_tile_size.X;
            var bottom = (source_rect.Bottom - 1) / this.m_tile_size.Y;

            var x, y;
            var map_tile: gsCMapTile;
            var pos: Vector2;
            var step: Vector2;

            //// top edge clipped
            //map_tile = this.getMapTile(new Point(left, top));
            //pos = m_position + new Vector2(left, top) * m_tile_size;
            //points.Add(pos);//debugging! 25/2/15
            //collectedTiles.Add(map_tile);//debugging! 25/2/15

            //step = new Vector2(1, 0) * m_tile_size;
            //for (x = left; x <= right; x++) {
            //    if (map_tile.isDrawable()) {
            //        m_image.draw(map_tile.getTile(), pos, spriteBatch, m_title);
            //        drawcall.Add(1);//debugging! 25/2/15
            //    }
            //    testCounter++;
            //    map_tile = m_map_tiles[testCounter];
            //    pos += step;

            //    this.points.push(pos);//debugging! 25/2/15
            //    this.collectedTiles.push(map_tile);//debugging! 25/2/15
            //}

            //// bottom edge clipped
            //map_tile = getMapTile(new Point(left, bottom));
            //pos = m_position + new Vector2(left, bottom) * m_tile_size;
            //step = new Vector2(1, 0) * m_tile_size;
            //points.Add(pos);//debugging! 25/2/15
            //collectedTiles.Add(map_tile);//debugging! 25/2/15

            //for (x = left; x <= right; x++) {
            //    if (map_tile.isDrawable()) {
            //        m_image.draw(map_tile.getTile(), pos, spriteBatch, m_title);
            //        drawcall.Add(2);//debugging! 25/2/15
            //    }
            //    testCounter++;
            //    map_tile = m_map_tiles[testCounter - 1];
            //    pos += step;
            //    points.Add(pos);//debugging! 25/2/15
            //    collectedTiles.Add(map_tile);//debugging! 25/2/15
            //}

            //// left edge clipped
            //map_tile = getMapTile(new Point(left, top + 1));
            //pos = m_position + new Vector2(left, top + 1) * m_tile_size;
            //step = new Vector2(0, 1) * m_tile_size;

            //points.Add(pos);//debugging! 25/2/15
            //collectedTiles.Add(map_tile);//debugging! 25/2/15

            //for (y = top + 1; y < bottom; y++) {
            //    if (map_tile.isDrawable()) {
            //        m_image.draw(map_tile.getTile(), pos, spriteBatch, m_title);
            //        drawcall.Add(3);//debugging! 25/2/15
            //    }
            //    testCounter++;
            //    map_tile = m_map_tiles[testCounter + m_size.X];//testCounter];
            //    pos += step;
            //    points.Add(pos);//debugging! 25/2/15
            //    collectedTiles.Add(map_tile);//debugging! 25/2/15
            //}

            //// right edge clipped
            //map_tile = getMapTile(new Point(right, top + 1));
            //pos = m_position + new Vector2(right, top + 1) * m_tile_size;
            //step = new Vector2(0, 1) * m_tile_size;
            //points.Add(pos);//debugging! 25/2/15
            //collectedTiles.Add(map_tile);//debugging! 25/2/15
            //for (y = top + 1; y < bottom; y++) {
            //    if (map_tile.isDrawable()) {
            //        m_image.draw(map_tile.getTile(), pos, spriteBatch, m_title);
            //        drawcall.Add(4);//debugging! 25/2/15
            //    }
            //    testCounter++;
            //    map_tile = m_map_tiles[testCounter + m_size.X];//testCounter];
            //    pos += step;
            //    points.Add(pos);//debugging! 25/2/15
            //    collectedTiles.Add(map_tile);//debugging! 25/2/15
            //}

            //// middle not clipped
            //for (y = top + 1; y < bottom; y++) {
            //    map_tile = getMapTile(new Point(left + 1, y));
            //    pos = m_position + new Vector2(left + 1, y) * m_tile_size;
            //    step = new Vector2(1, 0) * m_tile_size;
            //    points.Add(pos);//debugging! 25/2/15
            //    collectedTiles.Add(map_tile);//debugging! 25/2/15
            //    for (x = left + 1; x < right; x++) {
            //        if (map_tile.isDrawable()) {
            //            m_image.drawFast(map_tile.getTile(), pos, spriteBatch, m_title);
            //            drawcall.Add(5);//debugging! 25/2/15
            //        }
            //        testCounter++;
            //        map_tile = m_map_tiles[testCounter];
            //        pos += step;

            //        points.Add(pos);//debugging! 25/2/15
            //        collectedTiles.Add(map_tile);//debugging! 25/2/15
            //    }
            //}
        }
    }

    ////-------------------------------------------------------------

    //bool load(const char *filename,const gsCPoint& size)
    //{
    //    setSize(size);

    //    gsCFile file;

    //    if (!file.open(filename))
    //        return false;

    //    for (int y = 0; y < m_size.getY(); y++) {
    //        for (int x = 0; x < m_size.getX(); x++) {
    //            gsUWORD tile;
    //            if (file.read(&tile,2) != 2)
    //                break;
    //            if (tile == 0)
    //                setMapTile(gsCPoint(x,y),gsCMapTile(0,true));
    //            else
    //                setMapTile(gsCPoint(x,y),gsCMapTile(tile / 32)); // - 1));
    //            }
    //        }

    //    file.close();

    //    return true;
    //}

    ////-------------------------------------------------------------
    //// Find tiles which overlap rect

    //int hitBy(const gsCRect& rect,gsUBYTE collision_mask)
    //{
    //    gsCRect dest = rect;

    //    gsCRect source(gsCPoint(0,0),m_total_size);

    //    source.clip(dest);

    //    if (dest.isEmpty())
    //        return 0;

    //    m_hit_list.clear();

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

    //    return m_hit_list.getSize();
    //}

    //-------------------------------------------------------------

    public getHitPosition(n: number): Point {
        return this.m_hit_list[n];
    }

    //-------------------------------------------------------------
}

export = gsCMap;