//-------------------------------------------------------------
//
// Class:	gsCMenuItem
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCObject
//
// Derived:	gsCMenuOption
//			gsCMenuSlider
//			gsCMenuSeperator
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_MENUITEM_H
#define _INCLUDE_GS_MENUITEM_H

//-------------------------------------------------------------

typedef enum
{
	gsMENU_OPTION_LIST,
	gsMENU_SLIDER,
	gsMENU_SEPERATOR
} gsMenuItemType;

//-------------------------------------------------------------

class gsCMenuItem : public gsCObject
{
	protected:
		const char *m_name;
		int m_value;
		
	public:
		gsCMenuItem(const char *name = 0);
		virtual ~gsCMenuItem();

		virtual const gsMenuItemType getType() = 0;
		virtual bool setValue(int value);
		virtual void draw(gsCScreen *screen,gsCFont *font,int y,bool highlight);

		int getValue();
		const char *getName();
};

//-------------------------------------------------------------

class gsCMenuOptionList : public gsCMenuItem
{
	private:
		gsCList<const char *> m_options;

	public:
		gsCMenuOptionList(const char *name);
		~gsCMenuOptionList();

		const gsMenuItemType getType() { return gsMENU_OPTION_LIST; };

		bool setValue(int value);
		void draw(gsCScreen *screen,gsCFont *font,int y,bool highlight);

		void addOption(const char *option);
};

//-------------------------------------------------------------

class gsCMenuSlider : public gsCMenuItem
{
	private:
		int m_size;
		int m_min;
		int m_max;
		
	public:
		gsCMenuSlider(const char *name,int size,int min,int max);
		~gsCMenuSlider();

		const gsMenuItemType getType() { return gsMENU_SLIDER; };
		
		bool setValue(int value);
		void draw(gsCScreen *screen,gsCFont *font,int y,bool highlight);
};

//-------------------------------------------------------------

class gsCMenuSeperator : public gsCMenuItem
{
	public:
		gsCMenuSeperator(const char *name = 0);
		~gsCMenuSeperator();

		const gsMenuItemType getType() { return gsMENU_SEPERATOR; };
};

//-------------------------------------------------------------

#endif



