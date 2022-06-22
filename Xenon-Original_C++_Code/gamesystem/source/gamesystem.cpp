//-------------------------------------------------------------
//
// Library:	2d Game System
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Note:	This file contains the WinMain function which is the
//			main entry point to the program
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------
// Windows main entry point

int APIENTRY WinMain(HINSTANCE hInstance,HINSTANCE hPrevInstance,
					 LPSTR lpCmdLine,int nCmdShow)
{
	// if an instance of a class derived from gsCApplication
	// exists then run it, else exit
	
	if (gsCApplication::getApp() != 0)
		return gsCApplication::getApp()->run(hInstance,
											 hPrevInstance,
											 lpCmdLine,
											 nCmdShow);
	else
		return 0;
}

//-------------------------------------------------------------
