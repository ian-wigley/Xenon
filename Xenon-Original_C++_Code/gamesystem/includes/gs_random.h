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

#ifndef _INCLUDE_GS_RANDOM_H
#define _INCLUDE_GS_RANDOM_H

#include "gs_object.h"

//-------------------------------------------------------------

const int gsRANDOM_DEFAULT_SEED = 12345;

//-------------------------------------------------------------

class gsCRandom : public gsCObject
{
	private:
		int m_seed;

		void next();

	public:
		gsCRandom();
		~gsCRandom();

		void setSeed(int seed);

		float getFloat(float upper_bound);
		float getFloat(float lower_bound,float upper_bound);

		int getInt(int upper_bound);
		int getInt(int lower_bound,int upper_bound);

		bool getBool();
};

//-------------------------------------------------------------

#endif
