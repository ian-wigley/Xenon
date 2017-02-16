class MPHD {						/* Map header structure */
    public mapverhigh;  //char 		/* map version number to left of . (ie X.0). */
    public mapverlow;   //char 		/* map version number to right of . (ie 0.X). */
    public lsb;         //char 		/* if 1, data stored LSB first, otherwise MSB first. */
    public reserved;    //char 
    public mapwidth;    //ushort 	/* width in blocks. */
    public mapheight;   //ushort 	/* height in blocks. */
    public reserved1;   //ushort 
    public reserved2;   //ushort 
    public blockwidth;  //ushort 	/* width of a block (tile) in pixels. */
    public blockheight; //ushort 	/* height of a block (tile) in pixels. */
    public blockdepth;  //ushort 	/* depth of a block (tile) in planes (ie. 256 colours is 8) */
    public blockstrsize;//ushort 	/* size of a block data structure */
    public numblockstr; //ushort 	/* Number of block structures in BKDT */
    public numblockgfx; //ushort 	/* Number of 'blocks' in graphics (BGFX) */
};

class BLKSTR {						/* Structure for data blocks */
    public bgoff;
    public fgoff;			        /* offsets from start of graphic blocks */
    public fgoff2;
    public fgoff3; 		            /* more overlay blocks */
    public user1;
    public user2;		            /* user long data */
    public user3;
    public user4;	                /* user short data */
    public user5;
    public user6;
    public user7;	                /* user byte data */
    public tl;// : 1;				/* bits for collision detection */
    public tr;// : 1;
    public bl;// : 1;
    public br;// : 1;
    public trigger;// : 1;			/* bit to trigger an event */
    public unused1;// : 1;
    public unused2;// : 1;
    public unused3;// : 1;
};

import gsCMap = require("Map");
import Point = require("Point");
import gsCMapTile = require("MapTile");
import gsCTiledImage = require("TiledImage");
import CScene = require("Scene");
import gsCRectangle = require("Rectangle");
import gsCVector = require("Vector");
import CBigExplosion = require("BigExplosion");
import Pickup = require("Pickup");
import Asteroid = require("Asteroid");
import Loner = require("Loner");
import CHomer = require("Homer");
import CPod = require("Pod");
import CRusher = require("Rusher");
import CWallHugger = require("WallHugger");
import CDroneGenerator = require("DroneGenerator");
import CRusherGenerator = require("RusherGenerator");
import COrganicGun = require("OrganicGun");
import CBossMouth = require("BossMouth");
import CBossEye = require("BossEye");
import CBossControl = require("BossControl");
import enums = require("Enums");


 enum AlienType {
    WALLHUGGER,				// 0
    ASTEROID,				// 1
    RUSHER,					// 2
    POD,					// 3
    HOMER,					// 4
    DRONE_GENERATOR,		// 5
    LONER,					// 6
    REVERSE_RUSHER,			// 7
    RUSHER_GENERATOR_RIGHT,	// 8
    RUSHER_GENERATOR_LEFT,	// 9
    ORGANIC_GUN,			// 10
};

 enum PickupType {
    PICKUP_SHIELD,			// 0
    PICKUP_SPEEDUP,			// 1
    PICKUP_WEAPONUP,		// 2
    PICKUP_CLOAK,			// 3
    PICKUP_DIVE,			// 4
    PICKUP_SCOREBONUS,		// 5
    PICKUP_CLONE,			// 6
    PICKUP_WINGTIP,			// 7
    PICKUP_HOMINGMISSILE,	// 8
    PICKUP_LASER,			// 9
}

enum TileId {
    ID_NORMAL_TILE,			// 0
    ID_PICKUP,				// 1
    ID_ALIEN,				// 2
    ID_DESTROYABLE_TILE,	// 3
    ID_CHECKPOINT,			// 4
    ID_WARP_START,			// 5
    ID_WARP_END,			// 6
    ID_BOSS_MOUTH,			// 7
    ID_BOSS_EYE,			// 8
    ID_BOSS_CONTROL = 9		// 9
}

class CLevel {

    levelData: Array<Uint8Array> = [];

    decodedData: string;
    LevelBytes: string;

    //-------------------------------------------------------------
    // collision flags
    public COLLIDE_WITH_SHIP: number = 1;
    public COLLIDE_WITH_BULLETS: number = 2;

    public m_back_layer: gsCMap;
    public m_front_layer: gsCMap;

    private m_scan_y: number;
    private m_boss_active: boolean;

    //    private LevelBytes: Array<number[]>;
    private LevelCounter: number = 0;
    private m_header: MPHD;
    private m_blocks: BLKSTR[];

    private m_imageTiles: HTMLImageElement;
    //private m_font: SpriteFont;
    private m_image: gsCTiledImage;

    loaded: boolean = false;


    CHUNK_FORM: number = ("F".charCodeAt(0) << 24) + ("O".charCodeAt(0) << 16) + ("R".charCodeAt(0) << 8) + ("M".charCodeAt(0));
    CHUNK_FMAP: number = ("F".charCodeAt(0) << 24) + ("M".charCodeAt(0) << 16) + ("A".charCodeAt(0) << 8) + ("P".charCodeAt(0));
    CHUNK_MPHD: number = ("M".charCodeAt(0) << 24) + ("P".charCodeAt(0) << 16) + ("H".charCodeAt(0) << 8) + ("D".charCodeAt(0));
    CHUNK_BKDT: number = ("B".charCodeAt(0) << 24) + ("K".charCodeAt(0) << 16) + ("D".charCodeAt(0) << 8) + ("T".charCodeAt(0));
    CHUNK_BGFX: number = ("B".charCodeAt(0) << 24) + ("G".charCodeAt(0) << 16) + ("F".charCodeAt(0) << 8) + ("X".charCodeAt(0));
    CHUNK_BODY: number = ("B".charCodeAt(0) << 24) + ("O".charCodeAt(0) << 16) + ("D".charCodeAt(0) << 8) + ("Y".charCodeAt(0));
    CHUNK_LYR1: number = ("L".charCodeAt(0) << 24) + ("Y".charCodeAt(0) << 16) + ("R".charCodeAt(0) << 8) + ("1".charCodeAt(0));

    //CHUNK_FORM: number = 1179603533;
    //CHUNK_FMAP: number = 1179468112;
    //CHUNK_MPHD: number = 1297107012;
    //CHUNK_BKDT: number = 1112228948;
    //CHUNK_BGFX: number = 1111967320;
    //CHUNK_BODY: number = 1112491097;
    //CHUNK_LYR1: number = 1280922161;

    constructor(imageTiles: HTMLImageElement) {
        this.m_imageTiles = imageTiles;
        this.m_back_layer = new gsCMap();
        this.m_front_layer = new gsCMap();

        var done = false;
        var levelBytes;
        var _this = this;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'xenon2000.png', true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function (e) {
            var uInt8Array = new Uint8Array(this.response);
            levelBytes = new Uint8Array(this.response);
            done = true;
        };
        xhr.onloadend = function () {
            _this.LevelBytes = levelBytes;
            _this.parseLevel();
            _this.loaded = true;
        };
        xhr.send();
    }

    private parseLevel(): void {

        var id = this.readUDWORD();

        //if (id != CHUNK_FORM)
        //{
        //  error();
        //}

        id = this.readUDWORD();
        id = this.readUDWORD();
        //if (id != CHUNK_FMAP)
        //{
        //  error();
        //}

        var loaded_back_layer = false;
        var loaded_front_layer = false;
        var loaded_tiles = false;

        for (; ;) {

            id = this.readUDWORD();
            var chunk_length = 0;
            chunk_length = this.readUDWORD();
            var currentFilePos = this.LevelCounter;// * 4;
            //gsUDWORD chunk_end = m_file.getPosition() + chunk_length;
            var chunk_end = currentFilePos + chunk_length;

            switch (id) {
                case this.CHUNK_MPHD:
                    this.m_header = new MPHD();
                    var size = 24;
                    this.FileRead(this.m_header, size);
                    ////if (m_file.read(&m_header,sizeof(MPHD)) != sizeof(MPHD))
                    ////return error();

                    if (this.m_header.blockdepth != 24) {
                        //this.error();
                    }

                    this.m_back_layer.setSize(new Point(this.m_header.mapwidth, this.m_header.mapheight));
                    this.m_front_layer.setSize(new Point(this.m_header.mapwidth, this.m_header.mapheight));
                    break;

                case this.CHUNK_BKDT:
                    {
                        var m_blocks = new Array<BLKSTR>(this.m_header.numblockstr);

                        for (var i = 0; i < this.m_header.numblockstr; i++) {
                            size = this.m_header.blockstrsize;
                            m_blocks[i] = this.FileRead2(m_blocks[i], size);

                            //    gsUDWORD size = (gsUDWORD) m_header.blockstrsize;
                            //    if (m_file.read(&m_blocks[i],size) != size)
                            //        return error();
                        }
                    }
                    break;

                case this.CHUNK_BGFX:
                    {
                        ////gsCFile::setDirectory(graphics_directory);
                        ////    return error();
                        this.m_image = new gsCTiledImage(this.m_imageTiles);//, this.m_font);
                        this.m_image.setTileSize(new Point(32, 32));
                        this.m_image.enableColourKey();//gsCColour(gsMAGENTA));

                        this.m_back_layer.setImage(this.m_image);
                        this.m_front_layer.setImage(this.m_image);

                        loaded_tiles = true;
                        break;
                    }
                case this.CHUNK_BODY:
                case this.CHUNK_LYR1:
                    {
                        //gsUWORD tile;
                        var tile = 0;

                        // Create a new tile
                        //var mt: gsCMapTile = new gsCMapTile();
                        //gsCMapTile[] mt = m_back_layer.getListOfMapTiles();

                        var fudge = 0;

                        for (var y = 0; y < this.m_header.mapheight; y++) {
                            for (var x = 0; x < this.m_header.mapwidth; x++) {

                                // Create a new tile
                                var mt: gsCMapTile = new gsCMapTile();
                                //        if (m_file.read(&tile,2) != 2)
                                //            return error();
                                var bytes = new Array<string>(2);

                                if (fudge == 0) {
                                    bytes[0] = this.LevelBytes[this.LevelCounter++];
                                    bytes[1] = this.LevelBytes[this.LevelCounter++];
                                    tile = this.ByteConverterToUInt16(bytes);
                                }

                                if (fudge == 1) {
                                    bytes[0] = this.LevelBytes[this.LevelCounter++];
                                    bytes[1] = this.LevelBytes[this.LevelCounter++];
                                    tile = this.ByteConverterToUInt16(bytes);
                                    fudge = -1;
                                }

                                fudge += 1;

                                //if (tile > 0) {
                                //    var ii = 0;
                                //}

                                var sizeBLKSTR = 32;
                                //sizeBLKSTR /= 2;
                                var block: BLKSTR = m_blocks[tile / sizeBLKSTR];
                                var tilesize = this.m_header.blockheight * this.m_header.blockwidth * this.m_header.blockdepth / 8;
                                ////        tile = (gsUWORD) (block->bgoff / tilesize);
                                tile = block.bgoff / tilesize;
                                //tileList.Add(tile);
                                mt.setTile(tile);

                                if (tile == 0) {
                                    mt.setEmpty(true);
                                    mt.setHidden(true);
                                }
                                else {
                                    mt.setEmpty(false);
                                    mt.setUserData(0, (block.user1 & 0xFF));
                                    mt.setUserData(1, (block.user2 & 0xFF));
                                    mt.setUserData(2, (block.user3 & 0xFF));
                                    mt.setUserData(3, (block.user4 & 0xFF));
                                    var cflags = 0;    //gsUBYTE cflags = 0;
                                    if (block.tl != 0) {
                                        cflags |= this.COLLIDE_WITH_SHIP;
                                    }
                                    if (block.tr != 0) {
                                        cflags |= this.COLLIDE_WITH_BULLETS;
                                    }

                                    mt.setCollisionFlags(cflags);
                                }
                                if (id == this.CHUNK_BODY) {
                                    this.m_back_layer.setMapTile(new Point(x, y), mt, 0);
                                }
                                else {
                                    this.m_front_layer.setMapTile(new Point(x, y), mt, 0);
                                }
                            }
                        }
                    }

                    if (id == this.CHUNK_BODY) {
                        loaded_back_layer = true;
                    }
                    else {
                        loaded_front_layer = true;
                    }
                    break;

                // ignored chunks
                default:
                    break;
            }

            if (loaded_back_layer &&
                loaded_front_layer &&
                loaded_tiles) {
                break;
            }

            // Set the file position to the end of the chunk
            this.LevelCounter = chunk_end;
            //if (!m_file.setPosition(chunk_end))
            //    return error();
        }

        //if (m_blocks) 
        //{
        //    delete [] m_blocks;
        //    m_blocks = 0;
        //    }

        //m_file.close();
        //return true;
    }


    private readUDWORD() {
        var bytes = this.GetFourBytes();
        var d = (parseInt(bytes[0]) << 24) + (parseInt(bytes[1]) << 16) + (parseInt(bytes[2]) << 8) + (parseInt(bytes[3]));
        return d;
    }

    //private readUWORD() {
    //    var bytes = this.GetTwoBytes();
    //    //w =	(((gsUWORD) b[0]) << 8) + ((gsUWORD) b[1]);
    //    var temp = 0;
    //    // temp = ((bytes[0]) << 8) + (bytes[1]);
    //    var w = temp;
    //    return w;
    //    //return true;
    //}

    private GetTwoBytes() {
        var bytes = new Array<string>(2);
        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        return bytes;
    }

    private GetFourBytes() {
        var bytes = new Array<string>(4);
        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        bytes[2] = this.LevelBytes[this.LevelCounter++];
        bytes[3] = this.LevelBytes[this.LevelCounter++];
        return bytes;
    }

    private FileRead(m_header: MPHD, size: number) {
        m_header.mapverhigh = parseInt(this.LevelBytes[this.LevelCounter++]);
        m_header.mapverlow = parseInt(this.LevelBytes[this.LevelCounter++]);
        m_header.lsb = parseInt(this.LevelBytes[this.LevelCounter++]);
        m_header.reserved = parseInt(this.LevelBytes[this.LevelCounter++]);

        var bytes = Array<string>(2);
        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.mapwidth = this.ByteConverterToUInt16(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.mapheight = this.ByteConverterToUInt16(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.reserved1 = this.ByteConverterToUInt16(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.reserved2 = this.ByteConverterToUInt16(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.blockwidth = this.ByteConverterToUInt16(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.blockheight = this.ByteConverterToUInt16(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.blockdepth = this.ByteConverterToUInt16(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.blockstrsize = this.ByteConverterToUInt16(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.numblockstr = this.ByteConverterToUInt16(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.numblockgfx = this.ByteConverterToUInt16(bytes);
    }

    private FileRead2(blocks: BLKSTR, size: number): BLKSTR {
        var m_blocks = new BLKSTR();
        var bytes = new Array<string>(4);
        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        bytes[2] = this.LevelBytes[this.LevelCounter++];
        bytes[3] = this.LevelBytes[this.LevelCounter++];
        m_blocks.bgoff = this.ByteConverterToUInt32(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        bytes[2] = this.LevelBytes[this.LevelCounter++];
        bytes[3] = this.LevelBytes[this.LevelCounter++];
        m_blocks.fgoff = this.ByteConverterToUInt32(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        bytes[2] = this.LevelBytes[this.LevelCounter++];
        bytes[3] = this.LevelBytes[this.LevelCounter++];
        m_blocks.fgoff2 = this.ByteConverterToUInt32(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        bytes[2] = this.LevelBytes[this.LevelCounter++];
        bytes[3] = this.LevelBytes[this.LevelCounter++];
        m_blocks.fgoff3 = this.ByteConverterToUInt32(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        bytes[2] = this.LevelBytes[this.LevelCounter++];
        bytes[3] = this.LevelBytes[this.LevelCounter++];
        m_blocks.user1 = this.ByteConverterToUInt32(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        bytes[2] = this.LevelBytes[this.LevelCounter++];
        bytes[3] = this.LevelBytes[this.LevelCounter++];
        m_blocks.user2 = this.ByteConverterToUInt32(bytes);

        bytes = new Array<string>(2);
        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_blocks.user3 = this.ByteConverterToUInt16(bytes);

        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_blocks.user4 = this.ByteConverterToUInt16(bytes);

        m_blocks.user5 = parseInt(this.LevelBytes[this.LevelCounter++]);
        m_blocks.user6 = parseInt(this.LevelBytes[this.LevelCounter++]);
        m_blocks.user7 = parseInt(this.LevelBytes[this.LevelCounter++]);
        m_blocks.tl = parseInt(this.LevelBytes[this.LevelCounter++]);

        //m_blocks.tr =       (char)LevelBytes[LevelCounter][0];
        //m_blocks.bl =       (char)LevelBytes[LevelCounter][1];
        //m_blocks.br =       (char)LevelBytes[LevelCounter][2];
        //m_blocks.trigger =  (char)LevelBytes[LevelCounter][3];
        //LevelCounter += 1;

        //m_blocks.unused1 = (char)LevelBytes[LevelCounter][0];
        //m_blocks.unused2 = (char)LevelBytes[LevelCounter][1];
        //m_blocks.unused3 = (char)LevelBytes[LevelCounter][2];
        //LevelCounter += 1;
        return m_blocks;
    }


    private ByteConverterToUInt16(bytes) {

        var t1 = parseInt(bytes[0]);
        var t2 = parseInt(bytes[1]);

        //http://stackoverflow.com/questions/7993840/how-does-bitconverter-toint32-work
        var va = (t1 * (1 << 0)) +    // Bottom 8 bits
            (t2 * (1 << 8));          // Add the remaining 8 bits

        return va;
    }


    private ByteConverterToUInt32(bytes) {

        var t1 = parseInt(bytes[0]);//bytes[0].charCodeAt(0);
        var t2 = parseInt(bytes[1]);//bytes[1].charCodeAt(0);
        var t3 = parseInt(bytes[2]);//bytes[2].charCodeAt(0);
        var t4 = parseInt(bytes[3]);//bytes[3].charCodeAt(0);

        //http://stackoverflow.com/questions/7993840/how-does-bitconverter-toint32-work

        var va = (t1 * (1 << 0)) +  // Bottom 8 bits
            (t2 * (1 << 8)) +       // Next 8 bits, i.e. multiply by 256
            (t3 * (1 << 16)) +      // Next 8 bits, i.e. multiply by 65,536
            (t4 * (1 << 24));       // Top 7 bits and sign bit, multiply by 16,777,216

        return va;
    }

    public getMapFrontLayer(): gsCMap {
        return this.m_front_layer;
    }

    public getMapBackLayer(): gsCMap {
        return this.m_back_layer;
    }

    public reset(): void {
        //m_boss_active = false;

        //m_scan_y = (int)(-m_front_layer.getPosition().Y - 1 + 480) / m_image.getTileSize().Y;	//TEMP

        // hide special tiles
        // unhide everything else

        //        for (int x = 0; x < m_front_layer.getSize().X; x++)
        //        {
        //            for (int y = 0; y < m_front_layer.getSize().Y; y++)
        //            {
        //                gsCMapTile mt = m_front_layer.getMapTile(new Point(x, y));
        //                switch (mt.getUserData(0))
        //                {
        //                    case (byte)TileId.ID_PICKUP:
        //                    case (byte)TileId.ID_ALIEN:
        //                    case (byte)TileId.ID_CHECKPOINT:
        //                    case (byte)TileId.ID_WARP_START:
        //                    case (byte)TileId.ID_WARP_END:
        //                    case (byte)TileId.ID_BOSS_CONTROL:
        //                        mt.setHidden(true);
        //                        break;
        //                    case (byte)TileId.ID_DESTROYABLE_TILE:
        //                        mt.setHidden(false);
        //        mt.setUserData(3, 0);	// reset hit count
        //                        break;
        //                    default:
        //        mt.setHidden(false);
        //        break;
        //    }
        //}
        //        }
    }


    public scanForNewActors(scene: CScene): void {
        //gsCScreen *screen = gsCApplication::getScreen();

        //if (!screen)
        //    return;

        //Rectangle screen_rect = screen->getRect();
        var screen_rect: gsCRectangle = new gsCRectangle(0, 0, 640, 480);
        var source_rect = new gsCRectangle(0, 0, this.m_front_layer.getSizeInPixels().X, this.m_front_layer.getSizeInPixels().Y);
        var dest_rect = source_rect;
        //dest_rect.move(m_front_layer.getPosition());


        dest_rect.Left += this.m_front_layer.getPosition().X;//.getX();
        dest_rect.Top += this.m_front_layer.getPosition().Y;// offset.getY();
        dest_rect.Right += this.m_front_layer.getPosition().X;// offset.getX();
        dest_rect.Bottom += this.m_front_layer.getPosition().Y;// offset.getY();

        //screen_rect.clip(source_rect,dest_rect);
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


        //if (dest_rect.isEmpty())
        //    return;

        // convert back to tile coords
        //int top = source_rect.Top / m_image.getTileSize().Y;
        var top = source_rect.Top / this.m_image.getTileSize().Y;

        // get row above screen
        top--;

        if (top < 0)
            return;

        while (this.m_scan_y >= top) {

            for (var x = 0; x < this.m_front_layer.getSize().X; x++)
            {

                var mt: gsCMapTile = this.m_front_layer.getMapTile(new Point(x, this.m_scan_y));

                if (!mt.isEmpty()) {
                    var id = mt.getUserData(0);
                    var type = mt.getUserData(1);
                    var grade = mt.getUserData(2);
                    var size = mt.getUserData(3);

                    var pos:gsCVector = new gsCVector(x * this.m_image.getTileSize().X, this.m_scan_y * this.m_image.getTileSize().Y);

                    //pos += new gsCVector(this.m_image.getTileSize().X / 2.0, this.m_image.getTileSize().Y / 2.0);
                    pos.add(new gsCVector(this.m_image.getTileSize().X / 2.0, this.m_image.getTileSize().Y / 2.0));

                    switch (id) {
                        case TileId.ID_PICKUP:
                            // pickups
                            {
                                var p: Pickup.CPickup = null;

                                switch (type) {
                                    case PickupType.PICKUP_SHIELD:
                                        p = new Pickup.CShieldPickup();
                                        break;
                                    case PickupType.PICKUP_SPEEDUP:
                                        p = new Pickup.CSpeedPickup();
                                        break;
                                    case PickupType.PICKUP_WEAPONUP:
                                        p = new Pickup.CWeaponPickup();
                                        break;
                                    case PickupType.PICKUP_CLOAK:
                                        p = new Pickup.CCloakPickup();
                                        break;
                                    case PickupType.PICKUP_DIVE:
                                        p = new Pickup.CDivePickup();
                                        break;
                                    case PickupType.PICKUP_SCOREBONUS:
                                        p = new Pickup.CScorePickup();
                                        break;
                                    case PickupType.PICKUP_CLONE:
                                        p = new Pickup.CClonePickup();
                                        break;
                                    case PickupType.PICKUP_WINGTIP:
                                        p = new Pickup.CWingtipPickup();
                                        break;
                                    case PickupType.PICKUP_HOMINGMISSILE:
                                        p = new Pickup.CHomingMissilePickup();
                                        break;
                                    case PickupType.PICKUP_LASER:
                                        p = new Pickup.CLaserPickup();
                                        break;
                                }

                                if (p != null) {
                                    scene.addActor(p);
                                    p.setPosition(pos);
                                    p.activate();
                                }
                            }

                            break;
                        case TileId.ID_ALIEN:
                            // aliens

                            switch (type) {
                                case AlienType.ASTEROID:
                                    {
                                        var a: Asteroid.CAsteroid = null;

                                        switch (size) {
                                            case 0:
                                                switch (grade) {
                                                    case 0:
                                                        a = new Asteroid.CSmallStandardAsteroid();
                                                        break;
                                                    case 1:
                                                        a = new Asteroid.CSmallHighDensityAsteroid();
                                                        break;
                                                    case 2:
                                                        a = new Asteroid.CSmallIndestructibleAsteroid();
                                                        break;
                                                }
                                                break;
                                            case 1:
                                                switch (grade) {
                                                    case 0:
                                                        a = new Asteroid.CMediumStandardAsteroid();
                                                        break;
                                                    case 1:
                                                        a = new Asteroid.CMediumHighDensityAsteroid();
                                                        break;
                                                    case 2:
                                                        a = new Asteroid.CMediumIndestructibleAsteroid();
                                                        break;
                                                }
                                                break;
                                            case 2:
                                                switch (grade) {
                                                    case 0:
                                                        a = new Asteroid.CBigStandardAsteroid();
                                                        break;
                                                    case 1:
                                                        a = new Asteroid.CBigHighDensityAsteroid();
                                                        break;
                                                    case 2:
                                                        a = new Asteroid.CBigIndestructibleAsteroid();
                                                        break;
                                                }
                                                break;
                                        }

                                        if (a != null) {
                                            scene.addActor(a);
                                            a.setPosition(pos);
                                            a.setVelocity(new gsCVector(0.0, 0.5));
                                            a.activate();
                                        }
                                    }
                                    break;

                                case AlienType.LONER:
                                    {
                                        var l: Loner.CLoner = null;

                                        switch (grade) {
                                            case 0:
                                                l = new Loner.CStandardLoner();
                                                break;
                                            case 1:
                                                l = new Loner.CMediumLoner();
                                                break;
                                            case 2:
                                                l = new Loner.CArmouredLoner();
                                                break;
                                        }

                                        if (l != null) {
                                            scene.addActor(l);
                                            l.setPosition(pos);
                                            l.setVelocity(new gsCVector(0.0, 0.5));
                                            l.activate();
                                        }
                                    }
                                    break;

                                case AlienType.HOMER:
                                    {
                                        var h: CHomer  = new CHomer();
                                        scene.addActor(h);
                                        h.setPosition(pos);
                                        h.setVelocity(new gsCVector(0.0, 0.5));
                                        h.activate();
                                    }
                                    break;

                                case AlienType.POD:
                                    {
                                        var pO: CPod = new CPod();
                                        scene.addActor(pO);
                                        pO.setPosition(pos);
                                        pO.setVelocity(new gsCVector(0.0, 0.0));
                                        pO.activate();
                                    }
                                    break;

                                case AlienType.RUSHER:
                                    {
                                        var r: CRusher  = new CRusher();
                                        scene.addActor(r);
                                        r.setPosition(pos);
                                        r.setVelocity(new gsCVector(0.0, 2.0));
                                        r.activate();
                                    }
                                    break;

                                case AlienType.WALLHUGGER:
                                    {
                                        var w: CWallHugger = new CWallHugger();
                                        scene.addActor(w);
                                        w.setPosition(pos);
                                        w.setVelocity(new gsCVector(0.0, 0.0));
                                        w.activate();

                                        switch (grade) {
                                            case 0:
                                                w.setGrade(enums.WallHuggerGrade.WALLHUGGER_STATIC);
                                                break;
                                            case 1:
                                                w.setGrade(enums.WallHuggerGrade.WALLHUGGER_MOVING);
                                                break;
                                        }
                                    }
                                    break;

                                case AlienType.DRONE_GENERATOR:
                                    {
                                        var d: CDroneGenerator = new CDroneGenerator();
                                        scene.addActor(d);
                                        d.setPosition(pos);
                                        d.activate();
                                    }
                                    break;

                                case AlienType.REVERSE_RUSHER:
                                    {
                                        var r: CRusher = new CRusher();
                                        scene.addActor(r);
                                        //									r.setPosition(pos + new Vector2(0.0f,(float) screen.getSize().getY() +
                                        //																	   m_image.getTileSize().Y));
                                        r.setVelocity(new gsCVector(0.0, -4.0));
                                        r.activate();
                                    }
                                    break;

                                case AlienType.RUSHER_GENERATOR_LEFT:
                                    {
                                        var rG: CRusherGenerator = new CRusherGenerator();
                                        scene.addActor(rG);
                                        rG.setPosition(pos);
                                        rG.setVelocity(new gsCVector(-2.0, 0.0));
                                        rG.activate();
                                    }
                                    break;

                                case AlienType.RUSHER_GENERATOR_RIGHT:
                                    {
                                        rG = new CRusherGenerator();
                                        scene.addActor(rG);
                                        rG.setPosition(pos);
                                        rG.setVelocity(new gsCVector(2.0, 0.0));
                                        rG.activate();
                                    }
                                    break;

                                case AlienType.ORGANIC_GUN:
                                    {
                                        var oG: COrganicGun = new COrganicGun();
                                        scene.addActor(oG);
                                        oG.setPosition(pos);
                                        oG.setVelocity(new gsCVector(0.0, 0.0));
                                        oG.activate();
                                        if (grade == 0)
                                            oG.setDirection(1);
                                        else
                                            oG.setDirection(-1);
                                    }
                                    break;

                                default:

                                    var xp: CBigExplosion = new CBigExplosion();
                                    scene.addActor(xp);
                                    xp.setPosition(pos);
                                    xp.activate();
                                    break;
                            }
                            break;

                        case TileId.ID_CHECKPOINT:
                            scene.setNextCheckpoint(pos);
                            break;

                        case TileId.ID_WARP_START:
                            scene.setWarp(true);
                            break;

                        case TileId.ID_WARP_END:
                            scene.setWarp(false);
                            break;

                        case TileId.ID_BOSS_MOUTH:
                            {
                                var m: CBossMouth = new CBossMouth();
                                scene.addActor(m);
                                m.setPosition(pos);
                                m.setVelocity(new gsCVector(0.0, 0.0));
                                m.activate();
                            }
                            break;
                        case TileId.ID_BOSS_EYE:
                            {
                                var e: CBossEye = new CBossEye();
                                e.setEyeNumber(type);
                                scene.addActor(e);
                                switch (type) {
                                    case 0:
                                    case 1:
                                    case 4:
                                    case 5:
                                        e.setPosition(pos);
                                        break;
                                    case 2:
                                        //e.setPosition(pos + new gsCVector(15.0, 20.0));
                                        e.setPosition(new gsCVector(0, 0).plus(pos,new gsCVector(15.0, 20.0)));
                                        break;
                                    case 3:
                                        //e.setPosition(pos + new gsCVector(15.0, 20.0));
                                        e.setPosition(new gsCVector(0, 0).plus(pos,new gsCVector(15.0, 20.0)));
                                        break;
                                }
                                e.setVelocity(new gsCVector(0.0, 0.0));
                                e.activate();
                            }
                            break;
                        case TileId.ID_BOSS_CONTROL:
                            {
                                var bC: CBossControl = new CBossControl();
                                scene.addActor(bC);
                                bC.setPosition(pos);
                                bC.setVelocity(new gsCVector(0.0, 0.0));
                                bC.activate();

                                this.m_boss_active = true;
                            }
                            break;
                    }
                }
            }

            this.m_scan_y--;
        }
    }

    public get LoadingComplete(): boolean {
        return this.loaded;
   }
}

export = CLevel;