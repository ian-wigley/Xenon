//-------------------------------------------------------------
//
// Class:	gsCVisual
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	gsCObject
//
// Derived:	gsCScreen
//			gsCImage
//
//-------------------------------------------------------------

#include "gamesystem.h"

//-------------------------------------------------------------

gsLPDIRECTDRAW gsCVisual::m_dd = 0;
gsLPDIRECTDRAWOBJECT gsCVisual::m_direct_draw = 0;

gsCList<gsCVisual *> gsCVisual::m_active_visuals;

//-------------------------------------------------------------

bool gsCVisual::initialize()
{
	if (!m_direct_draw) {

		HRESULT hr;

		// get DirectDraw1 interface
		
		hr = DirectDrawCreate(NULL,&m_dd,NULL);
		
		if (hr != DD_OK) {
			gsREPORT("gsCVisual::initialize couldn't create direct draw 1 interface");
			return false;
			}

		// get appopriate DirectDraw(n) interface
			
		hr = m_dd->QueryInterface(gsID_DIRECTDRAW,(LPVOID *)&m_direct_draw);
		
		if (hr != DD_OK) {
			gsREPORT("gsCVisual::initialize couldn't create direct draw n interface");
			return false;
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCVisual::shutdown()
{
	if (m_direct_draw) {
		m_direct_draw->Release();
		m_direct_draw = 0;
		}

	if (m_dd) {
		m_dd->Release();
		m_dd = 0;
		}

	return true;
}

//-------------------------------------------------------------

gsCVisual::gsCVisual()
{
}

//-------------------------------------------------------------

gsCVisual::~gsCVisual()
{
}

//-------------------------------------------------------------

gsLPDIRECTDRAWSURFACE gsCVisual::createSurface(const gsCPoint& size)
{
	gsDDSURFACEDESC ddsd;

	// try to create in video memory
	// if that fails try a default create

	for (int attempt = 0; attempt < 2; attempt++) {

		ZeroMemory(&ddsd,sizeof(ddsd));
		ddsd.dwSize = sizeof(ddsd);
		ddsd.dwFlags = DDSD_WIDTH | DDSD_HEIGHT | DDSD_CAPS;
		ddsd.dwWidth = size.getX();
		ddsd.dwHeight = size.getY();
		ddsd.ddsCaps.dwCaps = DDSCAPS_OFFSCREENPLAIN;
		
		if (attempt == 0)
			ddsd.ddsCaps.dwCaps |= DDSCAPS_VIDEOMEMORY;

		gsLPDIRECTDRAWSURFACE m_surface;

		HRESULT hr;

		hr = m_direct_draw->CreateSurface(&ddsd,&m_surface,NULL);
	
		if (hr == DD_OK)
			return m_surface;
		}
	
	gsREPORT("gsCVisual::createSurface failed");
	return 0;
}

//-------------------------------------------------------------
