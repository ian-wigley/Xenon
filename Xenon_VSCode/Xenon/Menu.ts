﻿import gsCPoint = require("Point");
import gsCFont = require("Font");
import gsCMenuItem = require("MenuItem");
import gsCMenuOptionList = require("MenuOptionList");
import gsCScreen = require("Screen");
import gsCRectangle = require("Rectangle");

enum gsMenuItemType {
    gsMENU_OPTION_LIST,
    gsMENU_SLIDER,
    gsMENU_SEPERATOR
};

class gsCMenuSlider extends gsCMenuItem {

    m_size: number;
    m_min: number;
    m_max: number;

    constructor(name, size, min, max) {
        super(name);
        this.m_size = size;
        this.m_min = min;
        this.m_max = max;
    }

    //-------------------------------------------------------------

    public getType(): gsMenuItemType {
        return gsMenuItemType.gsMENU_SLIDER;
    }

    //-------------------------------------------------------------

    public setValue(value: number): boolean {
        if (value < this.m_min || value > this.m_max) {
            return false;
        }
        this.m_value = value;
        return true;
    }

    //-------------------------------------------------------------

    public draw(screen: gsCScreen, font: gsCFont, y: number, highlight: boolean, ctx: CanvasRenderingContext2D): void {

        var buffer: string = "";
        //static char buffer[100];
        //static char slider[2] = { 126,0 };
        //static char control[2] = { 127,0 };

        //strcpy(buffer, m_name);

        //strcat(buffer," : ");
        for (var i = this.m_min; i <= this.m_max; i++) {
            if (this.m_value == i) {
                //            strcat(buffer, control);
            }
            else {
                //           strcat(buffer, slider);
            }
        }
        //strcat(buffer," ");
        //char val[10];
        //sprintf(val,"%02i",m_value);
        //strcat(buffer, val);

        if (highlight) {
            var size: gsCPoint = font.getStringSize(buffer);
            screen.drawSolidRect(new gsCRectangle((screen.getSize().X - size.X) / 2 - 1,
                y - 1,
                (screen.getSize().X + size.X) / 2 + 1,
                y + size.Y + 1),
									   /*gsCColour(128, 128, 128)*/"gray", ctx);
        }

        font.setTextCursor(new gsCPoint(0, y));
        font.justifyString(buffer);
    }
    //-------------------------------------------------------------
}

class gsCMenu {

    private m_item_list: Array<gsCMenuItem>;// gsCList<gsCMenuItem *> m_item_list;
    private m_position: gsCPoint;
    private m_spacing: gsCPoint;
    private m_font: gsCFont;
    private m_current_item: number;		// -1 = no item selected
    private m_wrap: boolean;

    //-------------------------------------------------------------

    constructor() {
        this.m_position = new gsCPoint(0, 0);
        this.m_spacing = new gsCPoint(0, 0);
        this.m_font = null;
        this.m_current_item = 0;
        this.m_item_list = [];
    }

    //-------------------------------------------------------------

    public destroy(): void {
        //    for (int i = 0; i < m_item_list.getSize(); i++)
        //    delete m_item_list[i];
        //    m_item_list.clear();
        this.m_item_list = [];
    }

    //-------------------------------------------------------------

    public clear(): void {
        this.destroy();
    }

    //-------------------------------------------------------------

    public setFont(font: gsCFont): void {

        this.m_font = font;
    }

    //-------------------------------------------------------------

    public setPosition(position: gsCPoint): void {
        this.m_position = position;
    }

    //-------------------------------------------------------------

    public setSpacing(spacing: gsCPoint): void {
        this.m_spacing = spacing;
    }

    //-------------------------------------------------------------

    public setWrap(state: boolean): void {
        this.m_wrap = state;
    }

    //-------------------------------------------------------------

    public addSelection(name: string): void {
        this.addOptionList(name, 0);
    }

    //-------------------------------------------------------------

    public addOptionList(name: string, option: number): void {

        var item: gsCMenuOptionList = new gsCMenuOptionList(name);

        //va_list arglist;
        //const char *op = option;

        //va_start(arglist, option);

        //while (op) {
        //    item ->addOption(op);
        //    op = va_arg(arglist,const char *);
        //}

        //va_end(arglist);

        this.m_item_list.push(item);//.addItem(item);
    }

    //-------------------------------------------------------------

    public addSlider(name: string, size: number, min: number, max: number): void {
        this.m_item_list.push(new gsCMenuSlider(name, size, min, max));
    }

    //-------------------------------------------------------------

    public addSeperator(name: string): void {
        //        this.m_item_list.push(new gsCMenuSeperator(name));
    }

    //-------------------------------------------------------------

    public getNumItems(): number {
        return this.m_item_list.length;//.getSize();
    }

    //-------------------------------------------------------------

    public setCurrentItem(item: number): void {
        //gsASSERT(item >= -1);
        //gsASSERT(item < m_item_list.getSize());
        //gsASSERT(m_item_list[item] ->getType() != gsMENU_SEPERATOR);

        this.m_current_item = item;
    }

    //-------------------------------------------------------------

    public getCurrentItem(): number {
        return this.m_current_item;
    }

    //-------------------------------------------------------------

    public scroll(direction: number): void {
        do {
            this.m_current_item += direction;

            if (this.m_wrap) {
                if (this.m_current_item < 0) {
                    this.m_current_item = this.m_item_list.length - 1;
                }
                if (this.m_current_item >= this.m_item_list.length) {
                    this.m_current_item = 0;
                }
            }
            else {
                if (this.m_current_item < 0) {
                    this.m_current_item = 0;
                }
                if (this.m_current_item >= this.m_item_list.length) {
                    this.m_current_item = this.m_item_list.length - 1;
                }
            }
        }
        while (this.m_item_list[this.m_current_item].getType() == gsMenuItemType.gsMENU_SEPERATOR);
    }

    //-------------------------------------------------------------

    public setValue(item: number, value: number): boolean {

        //    gsASSERT(item >= 0);
        //    gsASSERT(item < m_item_list.getSize());

        return this.m_item_list[item].setValue(value);
        //return true;
    }

    //-------------------------------------------------------------

    public getValue(item: number): number {
        //if (item < 0 || 
        //    gsASSERT(item >= 0);
        //    gsASSERT(item < m_item_list.getSize());

        //    return m_item_list[item] ->getValue();
        return this.m_item_list[item].getValue();
    }

    //-------------------------------------------------------------

    public getName(item: number): string {
        //{
        //    gsASSERT(item >= 0);
        //    gsASSERT(item < m_item_list.getSize());

        //    return m_item_list[item] ->getName();
        return this.m_item_list[item].getName();
    }

    //-------------------------------------------------------------

    public draw(ctx: CanvasRenderingContext2D): boolean {
        if (!this.m_font) {
            return false;
        }

        //gsCScreen * screen = gsCApplication::getScreen();
        var screen: gsCScreen = new gsCScreen();

        if (!screen)
            return false;


        for (var i = 0; i < this.m_item_list.length; i++) {

            var y: number = this.m_position.Y + this.m_spacing.Y * i;
            var highlight: boolean = (i == this.m_current_item);

            this.m_item_list[i].draw(screen, this.m_font, y, highlight, ctx);
        }

        return true;
    }

    //-------------------------------------------------------------

}

export = gsCMenu;