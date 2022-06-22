//-------------------------------------------------------------
//
// Library:	2d Game System
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	CObject
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GAMESYSTEM_H
#define _INCLUDE_GAMESYSTEM_H

//-------------------------------------------------------------

#define gsDIRECTX_NT_COMPATIBLE
//#define gsESCAPE_TO_EXIT
#define gsENABLE_ERROR_LOG
#define gsENABLE_DEBUG_REPORT

//#ifdef _DEBUG
#ifndef gsDIRECTX_NT_COMPATIBLE
#define gsALLOW_SYSLOCK
#endif
//#endif

//-------------------------------------------------------------
// Include Windows headers

#define WIN32_LEAN_AND_MEAN				// Exclude rarely-used stuff
#include <windows.h>

#ifdef _MSC_VER
#pragma warning(disable : 4201)
#endif

#include <mmsystem.h>

//-------------------------------------------------------------
// Include some standard C library headers

#include <stdio.h>
#include <stdarg.h>

//-------------------------------------------------------------
// Include DirectX headers

#include "gs_types.h"

#include <dinput.h>
#include <ddraw.h>

//-------------------------------------------------------------
// Include GameLib headers

#include "gs_application.h"
#include "gs_collisionlist.h"
#include "gs_colour.h"
#include "gs_error.h"
#include "gs_file.h"
#include "gs_font.h"
#include "gs_framecounter.h"
#include "gs_image.h"
#include "gs_inifile.h"
#include "gs_input.h"
#include "gs_joystick.h"
#include "gs_keyboard.h"
#include "gs_keycodes.h"
#include "gs_list.h"
#include "gs_map.h"
#include "gs_maptile.h"
#include "gs_maths.h"
#include "gs_menu.h"
#include "gs_menuitem.h"
#include "gs_mouse.h"
#include "gs_object.h"
#include "gs_point.h"
#include "gs_random.h"
#include "gs_rect.h"
#include "gs_sample.h"
#include "gs_scoretable.h"
#include "gs_screen.h"
#include "gs_soundsystem.h"
#include "gs_sprite.h"
#include "gs_starfield.h"
#include "gs_tiledimage.h"
#include "gs_timer.h"
#include "gs_vector.h"
#include "gs_visual.h"

//-------------------------------------------------------------

#endif
