import gsCTiledImage = require("TiledImage");
import gsCPoint = require("Point");

class gsCFont extends gsCTiledImage {

    m_text_cursor: gsCPoint;
    m_tint: string;//gsCColour
    m_use_tint: boolean;
    m_ctx: CanvasRenderingContext2D;

    //-------------------------------------------------------------

    constructor(font: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        super(font);
        this.m_ctx = ctx;
        this.m_text_cursor = new gsCPoint(0, 0);
        this.m_use_tint = false;
    }

    //-------------------------------------------------------------

    public setTextCursor(position: gsCPoint): void {
        this.m_text_cursor = position;
    }

    //-------------------------------------------------------------

    public enableTint(colour: string): void {
        this.m_tint = colour;
        this.m_use_tint = true;
    }

    //-------------------------------------------------------------

    public disableTint(): void {
        this.m_use_tint = false;
    }

    //-------------------------------------------------------------

    public getTextCursor(): gsCPoint {
        return this.m_text_cursor;
    }

    //-------------------------------------------------------------

    public getStringSize(text: string): gsCPoint {
        return new gsCPoint((text.length) * this.m_tile_size.X, this.m_tile_size.Y);
    }

    //-------------------------------------------------------------

    public printString(message: string): boolean {

        var length: number = message.length;

            if (length == 0)
                return false;
        //    gsCScreen *screen = gsCApplication::getScreen();
        //    if (!screen)
        //        return false;
        //    gsCRect extents(m_text_cursor,m_text_cursor + m_tile_size * gsCPoint(length,1));
        //    gsCRect screen_rect = screen->getRect();
        //    if (screen_rect.contains(extents)) {
        //        char *str = message;

        var count: number = 0;
        while (length-- > 0) {
            var c = message.charCodeAt(count++);
            if (c >= 0x20 && c <= 0x7F) {
                c -= 0x20;
                if (c < this.m_num_tiles) {
                    if (this.m_use_tint) {
                        this.drawTinted(c, this.m_text_cursor, this.m_tint, this.m_ctx);
                    }
                    else {
                        this.drawFast(c, this.m_text_cursor, this.m_ctx);
                        this.m_text_cursor.add(new gsCPoint(this.m_tile_size.X, 0));
                    }
                }
            }
        }
        //        }
        //    else {
        //        char *str = message;
        //        while (length-- > 0) {
        //            gsUBYTE c = *str++;
        //            if (c >= 0x20 && c <= 0x7F) {
        //                c -= 0x20;
        //                if (c < m_num_tiles) {
        //                    if (m_use_tint)
        //                        drawTinted(c,m_text_cursor,m_tint);
        //                    else
        //                        draw(c,m_text_cursor);
        //                    m_text_cursor += gsCPoint(m_tile_size.getX(),0);
        //                    }
        //                }
        //            }
        //        }

        return true;
    }

    //-------------------------------------------------------------

    public justifyString(message: string): boolean {

        //    gsCScreen *screen = gsCApplication::getScreen();

        //    if (!screen)
        //        return false;

        var size: gsCPoint = this.getStringSize(message);
        var old_x: number = this.m_text_cursor.X;

        //m_text_cursor.setX((screen->getSize().getX() - size.getX()) / 2);
        this.m_text_cursor.X = ((640 - size.X) / 2);
        this.printString(message);
        this.m_text_cursor.X = old_x;
        return true;
    }

    //-------------------------------------------------------------
}
export = gsCFont;