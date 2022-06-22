//-------------------------------------------------------------
//
// Class:	gsCRandom
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

gsCRandom::gsCRandom()
{
	m_seed = gsRANDOM_DEFAULT_SEED & 0xFFFF;
}

//-------------------------------------------------------------

gsCRandom::~gsCRandom()
{
}

//-------------------------------------------------------------

void gsCRandom::next()
{
	m_seed = ((m_seed * 43) + 1509) & 0xFFFF;
}

//-------------------------------------------------------------

void gsCRandom::setSeed(int seed)
{
	m_seed = seed & 0xFFFF;
}

//-------------------------------------------------------------

float gsCRandom::getFloat(float upper_bound)
{
	next();
	return upper_bound * (float) m_seed / 65535.f;
}

//-------------------------------------------------------------

float gsCRandom::getFloat(float lower_bound,float upper_bound)
{
	return lower_bound + getFloat(upper_bound - lower_bound);
}

//-------------------------------------------------------------

int gsCRandom::getInt(int upper_bound)
{
	next();
	return upper_bound * m_seed / 65535;
}

//-------------------------------------------------------------

int gsCRandom::getInt(int lower_bound,int upper_bound)
{
	next();
	return lower_bound + getInt(upper_bound - lower_bound);
}

//-------------------------------------------------------------

bool gsCRandom::getBool()
{
	next();
	return m_seed & 1;
}

//-------------------------------------------------------------
