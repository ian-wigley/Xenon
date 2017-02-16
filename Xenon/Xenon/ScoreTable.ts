import gsCPoint = require("Point");
import gsCFont = require("Font");

class gsScoreItem {
    m_score: number;
    //char m_name[gsSCORE_NAME_SIZE];
    m_name: Array<string> = new Array<string>();
}

class gsCScoreTable {

    m_position: gsCPoint;
    m_spacing: gsCPoint;
    m_font: gsCFont;
    m_current_item: number;
    m_current_letter: number;
    m_flash_timer;//.start();

    //-------------------------------------------------------------

    constructor() {
        this.m_position = new gsCPoint(0, 0);
        this.m_spacing = new gsCPoint(0, 0);
        this.m_font = null;
        this.m_current_item = 0;
        this.m_current_letter = 0;
        //m_flash_timer.start();
    }

    //-------------------------------------------------------------

    //    gsCScoreTable::~gsCScoreTable()
    //{
    //    destroy();
    //}

    ////-------------------------------------------------------------

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

    ////-------------------------------------------------------------

    public setFont(font: gsCFont): void {
        this.m_font = font;
    }

    ////-------------------------------------------------------------

    setSize(size: number): void {
        //    destroy();

        for (var i = 0; i < size; i++) {
            var si: gsScoreItem = new gsScoreItem();
            //        si ->m_score = 0;
            //        memset(si ->m_name, '.', gsSCORE_NAME_SIZE);
            //        m_score_list.addItem(si);
        }
    }

    ////-------------------------------------------------------------

    public insertScore(score: number, name: string): number {

        //        for (var i = 0; i < m_score_list.getSize(); i++) {
        //    if (score > m_score_list[i] ->m_score) {
        //        int last = m_score_list.getSize() - 1;
        //        gsScoreItem * si = m_score_list[last];
        //        m_score_list.removeIndex(last);
        //        si ->m_score = score;
        //        for (unsigned int c = 0; c < gsSCORE_NAME_SIZE; c++) {
        //            if (c < strlen(name))
        //                si ->m_name[c] = name[c];
        //				else
        //            si ->m_name[c] = '.';
        //        }
        //        m_score_list.insertItem(i, si);
        //        return i;
        //    }
        //}
        return -1;
    }

    //-------------------------------------------------------------

    public draw(): boolean {

        //    if (!m_font)
        //        return false;

        //    gsCScreen * screen = gsCApplication::getScreen();

        //    if (!screen)
        //        return false;

        //    bool flash = m_flash_timer.getTime() < 0.1f;

        //    if (m_flash_timer.getTime() > 0.15f)
        //    m_flash_timer.start();

        //    char buffer[100];

        //    for (int i = 0; i < m_score_list.getSize(); i++) {

        //        gsScoreItem * item = m_score_list[i];

        //        sprintf(buffer, "%8i  ", item ->m_score);

        //        int p = strlen(buffer);

        //        for (int c = 0; c < gsSCORE_NAME_SIZE; c++) {
        //            if (i == m_current_item &&
        //                c == m_current_letter &&
        //                !flash)
        //                buffer[p++] = ' ';
        //            else
        //                buffer[p++] = item ->m_name[c];
        //        }

        //        buffer[p++] = 0;

        //        if (i == m_current_item) {
        //            gsCPoint size = m_font ->getStringSize(buffer);
        //            int y = m_position.getY() + m_spacing.getY() * i;
        //            screen ->drawSolidRect(gsCRect((screen ->getSize().getX() - size.getX()) / 2 - 1,
        //                y - 1,
        //                (screen ->getSize().getX() + size.getX()) / 2 + 1,
        //                y + size.getY() + 1),
        //                gsCColour(128, 128, 128));
        //        }

        //        m_font ->setTextCursor(gsCPoint(0, m_position.getY() + m_spacing.getY() * i));
        //        m_font ->justifyString(buffer);
        //    }

        return true;
    }

    //-------------------------------------------------------------

    //void gsCScoreTable::setCurrentItem(int item)
    //{
    //    m_current_item = item;
    //}

    //-------------------------------------------------------------

    //int gsCScoreTable::getCurrentItem()
    //{
    //    return m_current_item;
    //}

    ////-------------------------------------------------------------

    //void gsCScoreTable::setCurrentLetter(int letter)
    //{
    //    m_current_letter = letter;
    //}

    ////-------------------------------------------------------------

    //void gsCScoreTable::cycleLetter(int dir)
    //{
    //    char & letter = m_score_list[m_current_item] ->m_name[m_current_letter];

    //    if (dir > 0) {
    //        if (letter == '.')
    //            letter = 'A';
    //        else {
    //            letter++;
    //            if (letter > 'Z')
    //                letter = '.';
    //        }
    //    }
    //    if (dir < 0) {
    //        if (letter == '.')
    //            letter = 'Z';
    //        else {
    //            letter--;
    //            if (letter < 'A')
    //                letter = '.';
    //        }
    //    }
    //}

    ////-------------------------------------------------------------

    //void gsCScoreTable::scrollLetter(int dir)
    //{
    //    m_current_letter += dir;

    //    if (m_current_letter < 0)
    //        m_current_letter = 0;
    //    if (m_current_letter >= gsSCORE_NAME_SIZE)
    //        m_current_letter = gsSCORE_NAME_SIZE - 1;
    //}

    ////-------------------------------------------------------------

    public getScore(index: number): number {
        //    gsScoreItem * item = m_score_list[index];

        //    if (item)
        //        return item ->m_score;
        //    else
        return 1000;
    }

    ////-------------------------------------------------------------

    //const char *gsCScoreTable::getName(int index)
    //{
    //    gsScoreItem * item = m_score_list[index];

    //    if (item)
    //        return item ->m_name;
    //    else
    //        return 0;
    //}

    ////-------------------------------------------------------------
}

export = gsCScoreTable;