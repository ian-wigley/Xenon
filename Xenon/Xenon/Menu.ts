import gsCPoint = require("Point");
import gsCFont = require("Font");
import gsCMenuItem = require("MenuItem");

enum gsMenuItemType {
    gsMENU_OPTION_LIST,
    gsMENU_SLIDER,
    gsMENU_SEPERATOR
};

class gsCMenu {

    private m_item_list: gsCMenuItem;// gsCList<gsCMenuItem *> m_item_list;
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
    }

    //-------------------------------------------------------------

    public destroy(): void {
        //    for (int i = 0; i < m_item_list.getSize(); i++)
        //    delete m_item_list[i];
        //    m_item_list.clear();
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

        //        gsCMenuOptionList *item = new gsCMenuOptionList(name);

        //va_list arglist;
        //const char *op = option;

        //va_start(arglist, option);

        //while (op) {
        //    item ->addOption(op);
        //    op = va_arg(arglist,const char *);
        //}

        //va_end(arglist);

        //m_item_list.addItem(item);
    }

    //-------------------------------------------------------------

    public addSlider(name: string, size: number, min: number, max: number): void {
        //        m_item_list.addItem(new gsCMenuSlider(name, size, min, max));
    }

    //-------------------------------------------------------------

    public addSeperator(name: string): void {
        //        m_item_list.addItem(new gsCMenuSeperator(name));
    }

    //-------------------------------------------------------------

    public getNumItems(): number {
        return this.m_item_list.getSize();
    }

    //-------------------------------------------------------------

    public setCurrentItem(item: number): void {
        //gsASSERT(item >= -1);
        //gsASSERT(item < m_item_list.getSize());
        //gsASSERT(m_item_list[item] ->getType() != gsMENU_SEPERATOR);

        //m_current_item = item;
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
                if (this.m_current_item < 0)
                    this.m_current_item = this.m_item_list.getSize() - 1;
                if (this.m_current_item >= this.m_item_list.getSize())
                    this.m_current_item = 0;
            }
            else {
                if (this.m_current_item < 0)
                    this.m_current_item = 0;
                if (this.m_current_item >= this.m_item_list.getSize())
                    this.m_current_item = this.m_item_list.getSize() - 1;
            }
        }
        while (this.m_item_list[this.m_current_item].getType() == gsMenuItemType.gsMENU_SEPERATOR);
    }

    //-------------------------------------------------------------

    public setValue(item: number, value: number): boolean {

        //    gsASSERT(item >= 0);
        //    gsASSERT(item < m_item_list.getSize());

        //    return m_item_list[item] ->setValue(value);
        return true;
    }

    //-------------------------------------------------------------

    public getValue(item: number): number {
        //    gsASSERT(item >= 0);
        //    gsASSERT(item < m_item_list.getSize());

        //    return m_item_list[item] ->getValue();
        return 0;
    }

    //-------------------------------------------------------------

    public getName(item: number): string {
        //{
        //    gsASSERT(item >= 0);
        //    gsASSERT(item < m_item_list.getSize());

        //    return m_item_list[item] ->getName();
        return "";
    }

    //-------------------------------------------------------------

    public draw(): boolean {
        if (!this.m_font) {
            return false;
        }

        //gsCScreen * screen = gsCApplication::getScreen();

        //if (!screen)
        //    return false;


        for (var i = 0; i < this.m_item_list.getSize(); i++) {

            var y: number = this.m_position.Y + this.m_spacing.Y * i;
            var highlight: Boolean = (i == this.m_current_item);

            this.m_item_list[i].draw(screen, this.m_font, y, highlight);
        }

        return true;
    }

    //-------------------------------------------------------------

}

export = gsCMenu;