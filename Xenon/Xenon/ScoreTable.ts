import gsCPoint = require("Point");
import gsCFont = require("Font");
import gsCTimer = require("Timer");
import gsCScreen = require("Screen");
import gsCRect = require("Rectangle");

class gsScoreItem {
    m_score: number;
    m_name: Array<string> = new Array<string>();
}

class gsCScoreTable {

    m_position: gsCPoint;
    m_spacing: gsCPoint;
    m_font: gsCFont;
    m_current_item: number;
    m_current_letter: number;
    m_flash_timer: gsCTimer;
    gsSCORE_NAME_SIZE: number = 3;
    m_score_list: Array<gsScoreItem>;

    //-------------------------------------------------------------

    constructor() {
        this.m_position = new gsCPoint(0, 0);
        this.m_spacing = new gsCPoint(0, 0);
        this.m_font = null;
        this.m_current_item = 0;
        this.m_current_letter = 0;
        this.m_flash_timer = new gsCTimer();
        this.m_flash_timer.start();
    }

    //-------------------------------------------------------------

    //void gsCScoreTable::destroy()
    //{
    //    for (int i = 0; i < m_score_list.getSize(); i++)
    //    delete m_score_list[i];

    //    m_score_list.clear();
    //}

    //-------------------------------------------------------------

    public setPosition(position: gsCPoint): void {
        this.m_position = position;
    }

    //-------------------------------------------------------------

    public setSpacing(spacing: gsCPoint): void {
        this.m_spacing = spacing;
    }

    //-------------------------------------------------------------

    public setFont(font: gsCFont): void {
        this.m_font = font;
    }

    //-------------------------------------------------------------

    public setSize(size: number): void {
        this.m_score_list = [];

        for (var i = 0; i < size; i++) {
            var si: gsScoreItem = new gsScoreItem();
            si.m_score = 0;
            this.m_score_list.push(si);
        }
    }

    //-------------------------------------------------------------

    public insertScore(score: number, name: string): number {
        for (var i = 0; i < this.m_score_list.length; i++) {
            if (score > this.m_score_list[i].m_score) {
                var last: number = this.m_score_list.length - 1;
                var si: gsScoreItem = this.m_score_list[last];
                this.m_score_list.pop();
                si.m_score = score;
                for (var c = 0; c < this.gsSCORE_NAME_SIZE; c++) {
                    if (c < name.length)
                        si.m_name[c] = name[c];
                    else
                        si.m_name[c] = '.';
                }
                this.m_score_list[i] = si;
                return i;
            }
        }
        return -1;
    }

    //-------------------------------------------------------------

    public draw(font: gsCFont, ctx: CanvasRenderingContext2D): boolean {

        if (!font) {
            return false;
        }

        //    gsCScreen * screen = gsCApplication::getScreen();
        var screen = new gsCScreen();

        if (!screen) {
            return false;
        }

        var flash: boolean = this.m_flash_timer.getTime() < 0.1;

        if (this.m_flash_timer.getTime() > 0.15) {
            this.m_flash_timer.start();
        }

        var buffer: string;

        for (var i = 0; i < this.m_score_list.length; i++) {

            var item: gsScoreItem = this.m_score_list[i];
            buffer = item.m_score.toString();
            var p = buffer.length;
            buffer += " ";

            for (var c = 0; c < this.gsSCORE_NAME_SIZE; c++) {
                if (i == this.m_current_item && c == this.m_current_letter && !flash) {
                    buffer += item.m_name[c];
                } else {
                    buffer += item.m_name[c];
                }
            }

            if (i == this.m_current_item) {
                var size: gsCPoint = this.m_font.getStringSize(buffer);
                var y = this.m_position.Y + this.m_spacing.Y * i;
                screen.drawSolidRect(new gsCRect((screen.m_rect.Right - size.X) / 2 - 1, y - 1, size.X + 2, size.Y + 2), "gray", ctx);
            }

            this.m_font.setTextCursor(new gsCPoint(0, this.m_position.Y + this.m_spacing.Y * i));
            this.m_font.justifyString(buffer);
        }

        return true;
    }

    //-------------------------------------------------------------

    public setCurrentItem(item: number): void {
        this.m_current_item = item;
    }

    //-------------------------------------------------------------

    public getCurrentItem(): number {
        return this.m_current_item;
    }

    //-------------------------------------------------------------

    public setCurrentLetter(letter: number) {
        this.m_current_letter = letter;
    }

    //-------------------------------------------------------------

    public cycleLetter(dir: number): void {
        var count: number = 0;
        var letter = this.m_score_list[this.m_current_item].m_name[this.m_current_letter];

        if (dir > 0) {
            if (letter == '.')
                letter = 'A';
            else {
                count++;
                if (letter > 'Z')
                    letter = '.';
            }
        }
        if (dir < 0) {
            if (letter == '.')
                letter = 'Z';
            else {
                count--;
                if (letter < 'A')
                    letter = '.';
            }
        }
    }

    //-------------------------------------------------------------

    public scrollLetter(dir: number): void {
        this.m_current_letter += dir;

        if (this.m_current_letter < 0)
            this.m_current_letter = 0;
        if (this.m_current_letter >= this.gsSCORE_NAME_SIZE)
            this.m_current_letter = this.gsSCORE_NAME_SIZE - 1;
    }

    //-------------------------------------------------------------

    public getScore(index: number): number {
        var item: gsScoreItem = this.m_score_list[index];
        if (item)
            return item.m_score;
        else
            return 1000;
    }

    //-------------------------------------------------------------

    public getName(index: number) {
        var item: gsScoreItem = this.m_score_list[index];
        if (item)
            return item.m_name;
        else
            return [];
    }

    //-------------------------------------------------------------
}

export = gsCScoreTable;