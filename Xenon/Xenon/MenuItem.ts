import gsCScreen = require("Screen");
import gsCFont = require("Font");
import gsCRect = require("Rectangle");
import gsCPoint = require("Point");

class gsCMenuItem {

    m_name: string;
    m_value: number;

    constructor(name: string) {
        this.m_name = name;
        this.m_value = 0;
    }

    //-------------------------------------------------------------

    public setValue(value: number): boolean {
        return false;
    }

    //-------------------------------------------------------------

    public getValue(): number {
        return this.m_value;
    }

    //-------------------------------------------------------------

    public getName(): string {
        return this.m_name;
    }

    //-------------------------------------------------------------

    public draw(screen: gsCScreen, font: gsCFont, y: number, highlight: boolean, ctx: CanvasRenderingContext2D): void {

        if (this.m_name) {
            if (highlight) {
                var size: gsCPoint = font.getStringSize(this.m_name);
                screen.drawSolidRect(new gsCRect(640 - size.X/*(screen. ->getSize().getX() - size.getX())*/ / 2 - 1,
                    y - 1,
                    640 + size.X/* screen.->getSize().getX() + size.getX()*/ / 2 + 1,
                    y + size.Y + 1), //.getY() + 1),
                    "red", //gsCColour(128, 128, 128),
                    ctx);
            }

            font.setTextCursor(new gsCPoint(0, y));
            font.justifyString(this.m_name);
        }
    }

    public getSize(): number {
        return 0;//m_count;
    }
}

export = gsCMenuItem;