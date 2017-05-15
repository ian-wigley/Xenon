import gsCControls = require("Controls");

class DemoRecorder {

    //gsCList<Controls *> m_event_list;
    m_event_list: Array<gsCControls>;
    m_event_index: number;
    m_has_level: boolean;
    //char m_level[_MAX_PATH];

    constructor() {
        this.m_event_list = [];
        this.m_event_index = 0;
        this.m_has_level = false;
    }

    /*

//-------------------------------------------------------------

CDemoRecorder::~CDemoRecorder()
{
	destroy();
}

//-------------------------------------------------------------

void CDemoRecorder::destroy()
{
	for (int i = 0; i < m_event_list.getSize(); i++)
		delete m_event_list[i];

	m_event_list.clear();

	m_has_level = false;
}

//-------------------------------------------------------------

bool CDemoRecorder::load(const char *filename)
{
	destroy();

	gsCFile file;

	gsCFile::setDirectory(DIRECTORY_LEVELS);

	if (!file.open(filename,gsFILE_READ))
		return false;

	if (file.readString(m_level,_MAX_PATH) == 0) {
		file.close();
		return false;
		}

	m_has_level = true;

	Controls c;

	int v;

	while ((v = file.getByte()) != gsFILE_READ_FAILED) {
		c.left = (v & 1) != 0;
		c.right = (v & 2) != 0;
		c.up = (v & 4) != 0;
		c.down = (v & 8) != 0;
		c.fire = (v & 16) != 0;
		c.firePressed = (v & 32) != 0;

		addEvent(c);
		}

	file.close();

	return true;
}

//-------------------------------------------------------------

bool CDemoRecorder::save()
{
	if (m_event_list.getSize() == 0 || !m_has_level)
		return false;

	gsCFile file;

	gsCFile::setDirectory(DIRECTORY_LEVELS);

	char demoname[MAX_PATH];

	strcpy(demoname,m_level);

	char *ext = strchr(demoname,'.');

	if (ext == 0)
		return false;

	strcpy(ext + 1,"dem");

	if (!file.open(demoname,gsFILE_WRITE))
		return false;

	file.writeString("%s\n",m_level);

	for (int i = 0; i < m_event_list.getSize(); i++) {
		Controls *c = m_event_list[i];

		gsUBYTE v = 0;

		if (c->left) v += 1;
		if (c->right) v += 2;
		if (c->up) v += 4;
		if (c->down) v += 8;
		if (c->fire) v += 16;
		if (c->firePressed) v += 32;

		if (!file.putByte(v))
			break;
		}

	file.close();

	return true;
}
*/
    //-------------------------------------------------------------

    public record(): void {
        //this.destroy();
    }

    //-------------------------------------------------------------

    public addEvent(controls: gsCControls): boolean {
        //Controls *c = new Controls;
        //memcpy(c,&controls,sizeof(Controls));
        //m_event_list.addItem(c);
        this.m_event_list.push(controls);
        return true;
    }

    //-------------------------------------------------------------

    public playback() {
        this.m_event_index = 0;
    }

    //-------------------------------------------------------------

    public getEvent(controls/*Controls& */) {
        if (this.m_event_index < this.m_event_list.length) {
        //	memcpy(&controls,m_event_list[m_event_index++],sizeof(Controls));
        //	return true;
        	}

        //else
        //	return false;
    }

    //-------------------------------------------------------------

    public setLevel(filename) {
        //if (filename) {
        //	strcpy(m_level,filename);
        //	m_has_level = true;
        //	}
        //else
        //	m_has_level = false;
    }

    //-------------------------------------------------------------

    public getLevel() {
        //if (this.m_has_level)
        //	return this.m_level;
        //else
        //	return 0;
    }

    //-------------------------------------------------------------

}
export = DemoRecorder;