//-------------------------------------------------------------
//
// Class:	gsCMenu
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCObject
//
// Derived:	None
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------

gsCMenu::gsCMenu()
{
	m_position = gsCPoint(0,0);
	m_spacing = gsCPoint(0,0);
	m_font = 0;
	m_current_item = 0;
}

//-------------------------------------------------------------

gsCMenu::~gsCMenu()
{
	destroy();
}

//-------------------------------------------------------------

void gsCMenu::destroy()
{
	for (int i = 0; i < m_item_list.getSize(); i++)
		delete m_item_list[i];

	m_item_list.clear();
}

//-------------------------------------------------------------

void gsCMenu::clear()
{
	destroy();
}

//-------------------------------------------------------------

void gsCMenu::setFont(gsCFont *font)
{
	m_font = font;
}

//-------------------------------------------------------------

void gsCMenu::setPosition(const gsCPoint& position)
{
	m_position = position;
}

//-------------------------------------------------------------

void gsCMenu::setSpacing(const gsCPoint& spacing)
{
	m_spacing = spacing;
}

//-------------------------------------------------------------

void gsCMenu::setWrap(bool state)
{
	m_wrap = state;
}

//-------------------------------------------------------------

void gsCMenu::addSelection(const char *name)
{
	addOptionList(name,0);
}

//-------------------------------------------------------------

void __cdecl gsCMenu::addOptionList(const char *name,const char *option,...)
{
	gsCMenuOptionList *item = new gsCMenuOptionList(name);

	va_list arglist;
	const char *op = option;

	va_start(arglist,option);

	while (op) {
		item->addOption(op);
		op = va_arg(arglist,const char *);
		}

	va_end(arglist);

	m_item_list.addItem(item);
}

//-------------------------------------------------------------

void gsCMenu::addSlider(const char *name,int size,int min,int max)
{
	m_item_list.addItem(new gsCMenuSlider(name,size,min,max));
}

//-------------------------------------------------------------

void gsCMenu::addSeperator(const char *name)
{
	m_item_list.addItem(new gsCMenuSeperator(name));
}

//-------------------------------------------------------------

int gsCMenu::getNumItems()
{
	return m_item_list.getSize();
}

//-------------------------------------------------------------

void gsCMenu::setCurrentItem(int item)
{
	gsASSERT(item >= -1);
	gsASSERT(item < m_item_list.getSize());
	gsASSERT(m_item_list[item]->getType() != gsMENU_SEPERATOR);

	m_current_item = item;
}

//-------------------------------------------------------------

int gsCMenu::getCurrentItem()
{
	return m_current_item;
}

//-------------------------------------------------------------

void gsCMenu::scroll(int direction)
{
	do {
		m_current_item += direction;

		if (m_wrap) {
			if (m_current_item < 0)
				m_current_item = m_item_list.getSize() - 1;
			if (m_current_item >= m_item_list.getSize())
				m_current_item = 0;
			}
		else {
			if (m_current_item < 0)
				m_current_item = 0;
			if (m_current_item >= m_item_list.getSize())
				m_current_item = m_item_list.getSize() - 1;
			}
		}
	while (m_item_list[m_current_item]->getType() == gsMENU_SEPERATOR);
}

//-------------------------------------------------------------

bool gsCMenu::setValue(int item,int value)
{
	gsASSERT(item >= 0);
	gsASSERT(item < m_item_list.getSize());

	return m_item_list[item]->setValue(value);
}

//-------------------------------------------------------------

int gsCMenu::getValue(int item)
{
	gsASSERT(item >= 0);
	gsASSERT(item < m_item_list.getSize());

	return m_item_list[item]->getValue();
}

//-------------------------------------------------------------

const char *gsCMenu::getName(int item)
{
	gsASSERT(item >= 0);
	gsASSERT(item < m_item_list.getSize());

	return m_item_list[item]->getName();
}

//-------------------------------------------------------------

bool gsCMenu::draw()
{
	if (!m_font)
		return false;

	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen)
		return false;


	for (int i = 0; i < m_item_list.getSize(); i++) {

		int y = m_position.getY() + m_spacing.getY() * i;
		bool highlight = (i == m_current_item);

		m_item_list[i]->draw(screen,m_font,y,highlight);
		}

	return true;
}

//-------------------------------------------------------------
