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

//class gsCMap {
//    constructor() {
//    }
//    public setMapTile(point: Point, mapTile: gsCMapTile, num: number) {
//    }
//}

//class gsCMapTile {
//    constructor() {
//    }
//}

//class Point {
//    constructor(x: number, y: number) {
//    }
//}

import gsCMap = require("Map");
import Point = require("Point");
import gsCMapTile = require("MapTile");

class CLevel {

    levelData: Array<Uint8Array> = [];

    decodedData: string;

    LevelBytes: string;

    //-------------------------------------------------------------
    // collision flags

    public COLLIDE_WITH_SHIP: number = 1;
    public COLLIDE_WITH_BULLETS: number = 2;

    m_back_layer: gsCMap;
    m_front_layer: gsCMap;

    private m_scan_y: number;
    private m_boss_active: boolean;

    //    private LevelBytes: Array<number[]>;
    private LevelCounter: number = 0;
    private m_header: MPHD;
    private m_blocks: BLKSTR[];

    loaded: boolean = false;


    CHUNK_FORM: number = ("F".charCodeAt(0) << 24) + ("O".charCodeAt(0) << 16) + ("R".charCodeAt(0) << 8) + ("M".charCodeAt(0));//(('F') << 24) + (('O') << 16) + (('R') << 8) + ('M');
    CHUNK_FMAP: number = ("F".charCodeAt(0) << 24) + ("M".charCodeAt(0) << 16) + ("A".charCodeAt(0) << 8) + ("P".charCodeAt(0));//(('F') << 24) + (('M') << 16) + (('A') << 8) + ('P');
    CHUNK_MPHD: number = ("M".charCodeAt(0) << 24) + ("P".charCodeAt(0) << 16) + ("H".charCodeAt(0) << 8) + ("D".charCodeAt(0));//(('M') << 24) + (('P') << 16) + (('H') << 8) + ('D');
    CHUNK_BKDT: number = ("B".charCodeAt(0) << 24) + ("K".charCodeAt(0) << 16) + ("D".charCodeAt(0) << 8) + ("T".charCodeAt(0));//(('B') << 24) + (('K') << 16) + (('D') << 8) + ('T');
    CHUNK_BGFX: number = ("B".charCodeAt(0) << 24) + ("G".charCodeAt(0) << 16) + ("F".charCodeAt(0) << 8) + ("X".charCodeAt(0));//(('B') << 24) + (('G') << 16) + (('F') << 8) + ('X');
    CHUNK_BODY: number = ("B".charCodeAt(0) << 24) + ("O".charCodeAt(0) << 16) + ("D".charCodeAt(0) << 8) + ("Y".charCodeAt(0));//(('B') << 24) + (('O') << 16) + (('D') << 8) + ('Y');
    CHUNK_LYR1: number = ("L".charCodeAt(0) << 24) + ("Y".charCodeAt(0) << 16) + ("R".charCodeAt(0) << 8) + ("1".charCodeAt(0));//(('L') << 24) + (('Y') << 16) + (('R') << 8) + ('1');

    //CHUNK_FORM: number = 1179603533;
    //CHUNK_FMAP: number = 1179468112;
    //CHUNK_MPHD: number = 1297107012;
    //CHUNK_BKDT: number = 1112228948;
    //CHUNK_BGFX: number = 1111967320;
    //CHUNK_BODY: number = 1112491097;
    //CHUNK_LYR1: number = 1280922161;

    constructor() {
        this.m_back_layer = new gsCMap();
        this.m_front_layer = new gsCMap();

        var done = false;
        var levelBytes;

        var xhr = new XMLHttpRequest();
        //var file = "leveldata.fmp";
        xhr.open('GET', 'xenon2000.png', true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function (e) {
            var uInt8Array = new Uint8Array(this.response);
            levelBytes = new Uint8Array(this.response);
            done = true;
        };

        xhr.send();
    }

    public loadLevel() {
    }


    parseLevel() {

        var id = 0;
        this.readUDWORD();//out id);

        //if (id != CHUNK_FORM)
        //{
        //  error();
        //}

        this.readUDWORD();//out id);
        this.readUDWORD();//out id);
        //if (id != CHUNK_FMAP)
        //{
        //  error();
        //}

        var loaded_back_layer = false;
        var loaded_front_layer = false;
        var loaded_tiles = false;

        for (; ;) {

            id = this.readUDWORD();//out id);
            var chunk_length = 0;
            chunk_length = this.readUDWORD();//out chunk_length);
            var currentFilePos = this.LevelCounter;// * 4;
            //gsUDWORD chunk_end = m_file.getPosition() + chunk_length;
            var chunk_end = currentFilePos + chunk_length;

            switch (id) {
                case this.CHUNK_MPHD:
                    this.m_header = new MPHD();
                    var size = 24;//System.Runtime.InteropServices.Marshal.SizeOf(typeof (MPHD));
                    this.FileRead(this.m_header, size);
                    ////				if (m_file.read(&m_header,sizeof(MPHD)) != sizeof(MPHD))
                    ////					return error();

                    if (this.m_header.blockdepth != 24) {
                        //this.error();
                    }

                    //this.m_back_layer.setSize(new Point(m_header.mapwidth, m_header.mapheight));
                    //this.m_front_layer.setSize(new Point(m_header.mapwidth, m_header.mapheight));

                    break;

                case this.CHUNK_BKDT:
                    {
                        var t1 = 0;

                        //// BLKSTR[] m_blocks = new BLKSTR[m_header.numblockstr];
                        //this.m_blocks = new BLKSTR[m_header.numblockstr];
                        var m_blocks = new Array<BLKSTR>(this.m_header.numblockstr);

                        for (var i = 0; i < this.m_header.numblockstr; i++) {
                            size = this.m_header.blockstrsize;
                            this.FileRead2(m_blocks[i], size);

                            //    gsUDWORD size = (gsUDWORD) m_header.blockstrsize;
                            //    if (m_file.read(&m_blocks[i],size) != size)
                            //        return error();

                        }
                    }
                    break;

                case this.CHUNK_BGFX:
                    {
                        ////gsCFile::setDirectory(graphics_directory);

                        ////if (!m_image.load("blocks.bmp"))
                        ////    return error();

                        //this.m_image = new gsCTiledImage(m_imageTiles, m_font);
                        //m_image.setTileSize(new Point(32, 32));
                        //m_image.enableColourKey();//gsCColour(gsMAGENTA));

                        //this.m_back_layer.setImage(m_image);
                        //this.m_front_layer.setImage(m_image);

                        loaded_tiles = true;
                        break;
                    }
                case this.CHUNK_BODY:
                case this.CHUNK_LYR1:
                    {
                        //gsUWORD tile;
                        var tile = 0;

                        // Create a new tile
                        var mt: gsCMapTile = new gsCMapTile();

                        //gsCMapTile[] mt = m_back_layer.getListOfMapTiles();

                        var fudge = 0;

                        for (var y = 0; y < this.m_header.mapheight; y++) {
                            for (var x = 0; x < this.m_header.mapwidth; x++) {

                                // Create a new tile
                                var mt: gsCMapTile = new gsCMapTile();
                                //        if (m_file.read(&tile,2) != 2)
                                //            return error();
                                var bytes = new Array<string>(2);//byte[2];

                                if (fudge == 0) {
                                    bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
                                    bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
                                    tile = this.ByteConverterToUInt16(bytes);
                                    ////fudge += 1;
                                }

                                if (fudge == 1) {
                                    bytes[0] = this.LevelBytes[this.LevelCounter++];//[2];
                                    bytes[1] = this.LevelBytes[this.LevelCounter++];//[3];
                                    tile = this.ByteConverterToUInt16(bytes);
                                    fudge = -1;
                                }

                                fudge += 1;

                                if (tile > 0) {
                                    var ii = 0;
                                }

                                var sizeBLKSTR = 32;//typeof(BLKSTR);
                                sizeBLKSTR /= 2;
                                var block: BLKSTR  = m_blocks[tile / sizeBLKSTR];
                                //var tilesize = m_header.blockheight * m_header.blockwidth * m_header.blockdepth / 8;
                                ////        tile = (gsUWORD) (block->bgoff / tilesize);
                                //tile = block.bgoff / tilesize;
                                //tileList.Add(tile);
                                //mt.setTile(tile);

                                if (tile == 0) {
                                    //mt.setEmpty(true);
                                    //mt.setHidden(true);
                                }
                                else {
                                    mt.setEmpty(false);
                                    mt.setUserData(0, (block.user1 & 0xFF));
                                    mt.setUserData(1, (block.user2 & 0xFF));
                                    mt.setUserData(2, (block.user3 & 0xFF));
                                    mt.setUserData(3, (block.user4 & 0xFF));
                                    var cflags = 0;    //            gsUBYTE cflags = 0;
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


                                //flake += 1;

                            }
                        }

                    }

                    if (id == this.CHUNK_BODY)
                        loaded_back_layer = true;
                    else
                        loaded_front_layer = true;
                    break;

                // ignored chunks

                default:
                    break;
            }

            if (loaded_back_layer &&
                loaded_front_layer &&
                loaded_tiles)
                break;

            // Set the file position to the end of the chunk
            this.LevelCounter = chunk_end;// / 4;
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
        //var d = ((bytes[0].charCodeAt(0)) << 24) + ((bytes[1].charCodeAt(0)) << 16) + ((bytes[2].charCodeAt(0)) << 8) + (bytes[3].charCodeAt(0));
        var d = (parseInt(bytes[0]) << 24) + (parseInt(bytes[1]) << 16) + (parseInt(bytes[2]) << 8) + (parseInt(bytes[3]));
        return d;
    }

    private readUWORD() {

        var bytes = this.GetTwoBytes();
        //w =	(((gsUWORD) b[0]) << 8) + ((gsUWORD) b[1]);
        var temp = 0;
        // temp = ((bytes[0]) << 8) + (bytes[1]);
        var w = temp;
        return w;
        //return true;
    }

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
        m_header.mapverhigh = parseInt(this.LevelBytes[this.LevelCounter++]);//.charCodeAt(0);
        m_header.mapverlow = parseInt(this.LevelBytes[this.LevelCounter++]);//.charCodeAt(0);
        m_header.lsb = parseInt(this.LevelBytes[this.LevelCounter++]);//.charCodeAt(0);
        m_header.reserved = parseInt(this.LevelBytes[this.LevelCounter++]);//.charCodeAt(0);

        var bytes = Array<string>(2);
        bytes[0] = this.LevelBytes[this.LevelCounter++];
        bytes[1] = this.LevelBytes[this.LevelCounter++];
        m_header.mapwidth = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[3];
        m_header.mapheight = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        m_header.reserved1 = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[3];
        m_header.reserved2 = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        m_header.blockwidth = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[3];
        m_header.blockheight = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        m_header.blockdepth = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[3];
        m_header.blockstrsize = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        m_header.numblockstr = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[3];
        m_header.numblockgfx = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);
    }


    private FileRead2(m_blocks: BLKSTR, size: number): void {

        m_blocks = new BLKSTR();
        var bytes = new Array<string>(4);
        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        bytes[2] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[3] = this.LevelBytes[this.LevelCounter++];//[3];
        m_blocks.bgoff = this.ByteConverterToUInt32(bytes);//.ToUInt32(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        bytes[2] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[3] = this.LevelBytes[this.LevelCounter++];//[3];
        m_blocks.fgoff = this.ByteConverterToUInt32(bytes);//BitConverter.ToUInt32(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        bytes[2] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[3] = this.LevelBytes[this.LevelCounter++];//[3];
        m_blocks.fgoff2 = this.ByteConverterToUInt32(bytes);//BitConverter.ToUInt32(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        bytes[2] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[3] = this.LevelBytes[this.LevelCounter++];//[3];
        m_blocks.fgoff3 = this.ByteConverterToUInt32(bytes);//BitConverter.ToUInt32(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        bytes[2] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[3] = this.LevelBytes[this.LevelCounter++];//[3];
        m_blocks.user1 = this.ByteConverterToUInt32(bytes);//BitConverter.ToUInt32(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        bytes[2] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[3] = this.LevelBytes[this.LevelCounter++];//[3];
        m_blocks.user2 = this.ByteConverterToUInt32(bytes);//BitConverter.ToUInt32(bytes, 0);

        bytes = new Array<string>(2);
        bytes[0] = this.LevelBytes[this.LevelCounter++];//[0];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[1];
        m_blocks.user3 = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        bytes[0] = this.LevelBytes[this.LevelCounter++];//[2];
        bytes[1] = this.LevelBytes[this.LevelCounter++];//[3];
        m_blocks.user4 = this.ByteConverterToUInt16(bytes);//BitConverter.ToUInt16(bytes, 0);

        m_blocks.user5 = parseInt(this.LevelBytes[this.LevelCounter++]);//.charCodeAt(0);//[0];
        m_blocks.user6 = parseInt(this.LevelBytes[this.LevelCounter++]);//.charCodeAt(0);//[1];
        m_blocks.user7 = parseInt(this.LevelBytes[this.LevelCounter++]);//.charCodeAt(0);//[2];
        m_blocks.tl = parseInt(this.LevelBytes[this.LevelCounter++]);//.charCodeAt(0);//[3];
        //LevelCounter += 1;

        //m_blocks.tr =       (char)LevelBytes[LevelCounter][0];
        //m_blocks.bl =       (char)LevelBytes[LevelCounter][1];
        //m_blocks.br =       (char)LevelBytes[LevelCounter][2];
        //m_blocks.trigger =  (char)LevelBytes[LevelCounter][3];
        //LevelCounter += 1;

        //            m_blocks.unused1 = (char)LevelBytes[LevelCounter][0];
        //            m_blocks.unused2 = (char)LevelBytes[LevelCounter][1];
        //            m_blocks.unused3 = (char)LevelBytes[LevelCounter][2];
        //            LevelCounter += 1;
    }


    private ByteConverterToUInt16(bytes) {

        var t1 = parseInt(bytes[0]);//bytes[0].charCodeAt(0);
        var t2 = parseInt(bytes[1]);//bytes[1].charCodeAt(0);

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
            (t2 * (1 << 8)) +      // Next 8 bits, i.e. multiply by 256
            (t3 * (1 << 16)) +      // Next 8 bits, i.e. multiply by 65,536
            (t4 * (1 << 24));        // Top 7 bits and sign bit, multiply by 16,777,216

        return va;
    }



    public getMapFrontLayer() {
    }
    public getMapBackLayer() {
    }
    public reset() {
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

}

export = CLevel;