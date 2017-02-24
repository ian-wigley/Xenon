import gsCRectangle = require("Rectangle");
import gsCTiledImage = require("TiledImage");
import gsCVector = require("Vector");

class gsCSprite {

    private m_image: gsCTiledImage;
    private m_position: gsCVector;
    private m_hotspot: gsCVector;
    private m_active: boolean;
    private m_frame: number;
    //private Color m_fill_colour;
    private m_use_fill_colour: boolean = false;
    private m_rect: gsCRectangle;
    private m_rect_valid: boolean;
    private m_texture: HTMLImageElement;

    constructor() {
        this.m_image = null;
        this.m_position = new gsCVector(300, 100);
        this.m_hotspot = new gsCVector(0, 0);
        this.m_frame = 0;
        this.m_active = false;
        this.m_use_fill_colour = false;
        this.m_rect_valid = false;
    }

    //-------------------------------------------------------------

    public getRect() {
        if (!this.m_rect_valid) {
            if (this.m_image == null) {
                this.m_rect = new gsCRectangle(0, 0, 0, 0);
            }
            else {
                //Point p = new Point(m_position.X - m_hotspot.X, m_position.Y - m_hotspot.Y);
                var p: gsCVector = new gsCVector(this.m_position.x - this.m_hotspot.x, this.m_position.y - this.m_hotspot.y)
                this.m_rect = new gsCRectangle(p.x, p.y, p.x + this.m_image.getTileSize().X, p.y + this.m_image.getTileSize().Y);
            }
            this.m_rect_valid = true;
        }
        return this.m_rect;
    }

    //-------------------------------------------------------------

    public setActive(state: boolean) {
        this.m_active = state;
    }

    //-------------------------------------------------------------

    public isActive() {
        return this.m_active;
    }

    //-------------------------------------------------------------

    public setPosition(position: gsCVector) {
        this.m_position = position;
        this.m_rect_valid = false;
    }

    //-------------------------------------------------------------

    public setHotspot(hotspot: gsCVector) {
        this.m_hotspot = hotspot;
        this.m_rect_valid = false;
    }

    //-------------------------------------------------------------

    public setImage(image: gsCTiledImage) {
        this.m_image = image;
        this.m_rect_valid = false;
    }

    //-------------------------------------------------------------

    public getPosition() {
        return this.m_position;
    }

    //-------------------------------------------------------------

    public getHotspot() {
        return this.m_hotspot;
    }

    //-------------------------------------------------------------

    public getImage() {
        return this.m_texture;
    }

    //public gsCTiledImage getImage()
    //{
    //    return m_image;
    //}

    //-------------------------------------------------------------

    public move(offset: gsCVector) {
        //this.m_position += offset;
        this.m_position = new gsCVector(this.m_position.x + offset.x, this.m_position.y + offset.y);
        this.m_rect_valid = false;
    }

    //-------------------------------------------------------------

    // From Actor 
    public draw(ctx: CanvasRenderingContext2D) {
        if (this.m_image == null || !this.m_active) {
            return false;
        }
        if (!this.m_use_fill_colour) {
            return this.m_image.draw(this.m_frame, new gsCVector(this.m_position.x - this.m_hotspot.x, this.m_position.y - this.m_hotspot.y), ctx);
        }
        else {
            return false;
            //return this.m_image.drawSolid(this.m_frame, this.m_position - this.m_hotspot, this.m_fill_colour);
        }
    }

    //-------------------------------------------------------------

    public setFrame(frame: number) {
        this.m_frame = frame;
    }

    //-------------------------------------------------------------

    public getFrame() {
        return this.m_frame;
    }

    //-------------------------------------------------------------

    public enableFillColour(fill_colour) /*): Color)*/ {
        //this.m_fill_colour = fill_colour;
        this.m_use_fill_colour = true;
    }

    //-------------------------------------------------------------

    public disableFillColour() {
        this.m_use_fill_colour = false;
    }

    //-------------------------------------------------------------
}

export = gsCSprite;