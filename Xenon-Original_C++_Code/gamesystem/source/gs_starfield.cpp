//-------------------------------------------------------------
//
// Class:	gsCStarfield
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCVisual
//
// Derived:	None
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------

gsCStarfield::gsCStarfield()
{
	m_position = 0;
	m_layers = 0;
	m_width = 0;
	m_height = 0;

	m_point = 0;
	m_colour = 0;
	m_layer = 0;
	m_offset = 0;
}

//-------------------------------------------------------------

gsCStarfield::~gsCStarfield()
{
	destroy();
}

//-------------------------------------------------------------

void gsCStarfield::create()
{
	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen) {
		gsREPORT("gsCStarfield::create requires active screen");
		return;
		}

	m_width = screen->getSize().getX();
	m_height = screen->getSize().getY();

	m_point = new gsCPoint[m_width];
	m_colour = new gsCColour[m_width];

	m_layer = new int[m_width];
	m_offset = new int[m_width];

	gsCRandom random;

	for (int x = 0; x < m_width; x++) {
		
		m_point[x].setX(x);

		int l = random.getInt(m_layers);

		m_layer[x] = l;
		m_offset[x] = random.getInt(m_height) * (1 << l);

		int cupper = 255 - 16 * x;
		int clower = 128 - 16 * x;

		m_colour[x] = gsCColour(random.getInt(clower,cupper),
								random.getInt(clower,cupper),
								random.getInt(clower,cupper));
		}

}

//-------------------------------------------------------------

void gsCStarfield::destroy()
{
	if (m_point) {
		delete [] m_point;
		m_point = 0;
		delete [] m_colour;
		m_colour = 0;
		delete [] m_layer;
		m_layer = 0;
		delete [] m_offset;
		m_offset = 0;
		}
	
	m_layers = 0;
}

//-------------------------------------------------------------

void gsCStarfield::initialize(int layers)
{
	destroy();

	m_layers = layers;

	if (m_layers > 0)
		create();
}

//-------------------------------------------------------------

void gsCStarfield::setPosition(int y)
{
	m_position = y;
}

//-------------------------------------------------------------

int gsCStarfield::getPosition()
{
	return m_position;
}

//-------------------------------------------------------------

void gsCStarfield::move(int offset)
{
	m_position += offset;
}

//-------------------------------------------------------------

void gsCStarfield::draw()
{
	if (m_layers == 0)
		return;

	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen)
		return;

	int range = 1 << m_layers;

	while (m_position < 0)
		m_position += range * m_height;
	while (m_position >= range * m_height)
		m_position -= range * m_height;

	for (int x = 0; x < m_width; x++)
		m_point[x].setY(((m_offset[x] + m_position) >> m_layer[x]) % m_height);

	screen->drawPoints(m_width,m_point,m_colour,false);
}

//-------------------------------------------------------------

