//-------------------------------------------------------------
//
// File:	Simple User-defined Types
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_TYPES_H
#define _INCLUDE_GS_TYPES_H

//-------------------------------------------------------------
// Basic types

typedef unsigned char	gsUBYTE;
typedef signed char		gsBYTE;

typedef unsigned short	gsUWORD;
typedef signed short	gsWORD;

typedef unsigned long	gsUDWORD;
typedef signed long		gsDWORD;

//-------------------------------------------------------------
// Direct X interfaces

#ifdef gsDIRECTX_NT_COMPATIBLE

#define DIRECTINPUT_VERSION 0x0300

#define gsLPDIRECTINPUT			LPDIRECTINPUT
#define gsLPDIRECTINPUTDEVICE	LPDIRECTINPUTDEVICE
#define gsID_DIRECTINPUT		IID_IDirectInput
#define gsID_DIRECTINPUTDEVICE	IID_IDirectInputDevice

#define gsLPDIRECTDRAW			LPDIRECTDRAW
#define gsLPDIRECTDRAWOBJECT	LPDIRECTDRAW2
#define gsLPDIRECTDRAWSURFACE	LPDIRECTDRAWSURFACE
#define gsLPDIRECTDRAWCLIPPER	LPDIRECTDRAWCLIPPER
#define gsLPDIRECTDRAWPALETTE	LPDIRECTDRAWPALETTE
#define gsDDSURFACEDESC			DDSURFACEDESC
#define gsDDSCAPS				DDSCAPS
#define gsID_DIRECTDRAW			IID_IDirectDraw2

#else

#define DIRECTINPUT_VERSION 0x0700

#define gsLPDIRECTINPUT			LPDIRECTINPUT7
#define gsLPDIRECTINPUTDEVICE	LPDIRECTINPUTDEVICE7
#define gsID_DIRECTINPUT		IID_IDirectInput7
#define gsID_DIRECTINPUTDEVICE	IID_IDirectInputDevice7

#define gsLPDIRECTDRAW			LPDIRECTDRAW
#define gsLPDIRECTDRAWOBJECT	LPDIRECTDRAW7
#define gsLPDIRECTDRAWSURFACE	LPDIRECTDRAWSURFACE7
#define gsLPDIRECTDRAWCLIPPER	LPDIRECTDRAWCLIPPER
#define gsLPDIRECTDRAWPALETTE	LPDIRECTDRAWPALETTE
#define gsDDSURFACEDESC			DDSURFACEDESC2
#define gsDDSCAPS				DDSCAPS2
#define gsID_DIRECTDRAW			IID_IDirectDraw7

#endif


//-------------------------------------------------------------

#endif
