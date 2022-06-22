//-------------------------------------------------------------
//
// Class:	gsCImage
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

gsCImage::gsCImage()
{
	m_rect = gsCRect(gsCPoint(0,0),gsCPoint(0,0));
	m_surface = 0;
	m_colour_key = 0;
	m_isLocked = false;
}

//-------------------------------------------------------------

gsCImage::~gsCImage()
{
	destroy();
}

//-------------------------------------------------------------

bool gsCImage::load(const char *filename,bool rescale)
{
	char fullname[_MAX_PATH];

	if (!gsCFile::getFullName(filename,fullname)) {
		gsREPORT("gsCImage::load couldn't find file");
		return false;
		}
	
	HBITMAP hbm = (HBITMAP) LoadImage(NULL,
									  fullname,
									  IMAGE_BITMAP,
									  0,0,
									  LR_LOADFROMFILE | LR_CREATEDIBSECTION);

	if (hbm == NULL) {
		gsREPORT("gsCImage::load couldn't load bitmap");
		return false;
		}

	HDC hdcImage = CreateCompatibleDC(NULL);

	if (!hdcImage) {
		gsREPORT("gsCImage::load couldn't create compatible device context");
		return false;
		}
	
	SelectObject(hdcImage,hbm);
    
	BITMAP bm;
	GetObject(hbm,sizeof(bm),&bm);

	if (m_surface == NULL) {
		if (!setSize(gsCPoint(bm.bmWidth,bm.bmHeight))) {
			gsREPORT("gsCImage::load couldn't create surface of required size");
			return false;
			}
		}
	else {
	    m_surface->Restore();
		if (!rescale) {
			if (!setSize(gsCPoint(bm.bmWidth,bm.bmHeight))) {
				gsREPORT("gsCImage::load couldn't create surface of required size");
				return false;
				}
			}
		}

	gsDDSURFACEDESC ddsd;
	ddsd.dwSize = sizeof(ddsd);
	ddsd.dwFlags = DDSD_HEIGHT | DDSD_WIDTH;
    m_surface->GetSurfaceDesc(&ddsd);

	HDC hdc;

	// NOTE: don't single step through the next 3 lines
	// remote debugger doesn't like surface lock

	HRESULT hr;

	hr = m_surface->GetDC(&hdc);

	if (hr != DD_OK) {
		gsREPORT("gsCImage::load couldn't get device context");
		return false;
		}

	StretchBlt(hdc,0,0,ddsd.dwWidth,ddsd.dwHeight,hdcImage,0,0,bm.bmWidth,bm.bmHeight,SRCCOPY);
    m_surface->ReleaseDC(hdc);
	
	DeleteDC(hdcImage);

	DeleteObject(hbm);

    return true;
}

//-------------------------------------------------------------

bool gsCImage::setSize(const gsCPoint& size)
{
	destroy();
	return create(size);
}

//-------------------------------------------------------------

bool gsCImage::enableColourKey(const gsCColour& colour)
{
	if (m_surface) {
		DDCOLORKEY ddck;
		ddck.dwColorSpaceLowValue = ddck.dwColorSpaceHighValue = colour.getRaw();
		m_surface->SetColorKey(DDCKEY_SRCBLT,&ddck);
		m_colour_key = DDBLT_KEYSRC;
		}

	return true;
}

//-------------------------------------------------------------

bool gsCImage::disableColourKey()
{
	if (m_surface) {
		m_surface->SetColorKey(DDCKEY_SRCBLT,NULL);
		m_colour_key = 0;
		}

	return true;
}

//-------------------------------------------------------------

void gsCImage::fill(const gsCColour& colour)
{
	if (m_surface) {
		DDBLTFX ddbltfx;
		ddbltfx.dwSize = sizeof(DDBLTFX);
		ddbltfx.dwFillColor = colour.getRaw();

		HRESULT hr;

		hr = m_surface->Blt(NULL,
							NULL,
							NULL,
							DDBLT_COLORFILL | DDBLT_WAIT,
							&ddbltfx);

		if (hr != DD_OK)
			gsREPORT("gsCImage::fill blit failed");
		}
}

//-------------------------------------------------------------

bool gsCImage::setPoint(const gsCPoint& point,const gsCColour& colour)
{
	if (!m_surface) {
		gsREPORT("gsCImage::setPixel called with no surface");
		return false;
		}

	if (m_rect.contains(point)) {

		DDBLTFX ddbltfx;
		ddbltfx.dwSize = sizeof(DDBLTFX);
		ddbltfx.dwFillColor = colour.getRaw();

		gsCRect dest(point,point + gsCPoint(1,1));

		HRESULT hr;

		hr = m_surface->Blt(LPRECT(dest),
							NULL,
							NULL,
							DDBLT_COLORFILL | DDBLT_WAIT,
							&ddbltfx);

		if (hr != DD_OK) {
			gsREPORT("gsCImage::setPoint blit failed");
			return false;
			}

		return true;
		}

	return false;
}

//-------------------------------------------------------------

bool gsCImage::setRect(const gsCRect& rect,const gsCColour& colour)
{
	if (!m_surface) {
		gsREPORT("gsCImage::setBox called with no surface");
		return false;
		}

	for (int x = 0; x <= rect.getWidth(); x++) {
		setPoint(gsCPoint(x,rect.getTop()),colour);
		setPoint(gsCPoint(x,rect.getBottom()),colour);
		}
	for (int y = 0; y <= rect.getHeight(); y++) {
		setPoint(gsCPoint(rect.getLeft(),y),colour);
		setPoint(gsCPoint(rect.getRight(),y),colour);
		}

	return true;
}

//-------------------------------------------------------------

bool gsCImage::create(const gsCPoint& size)
{
	if (m_direct_draw) {
		m_rect = gsCRect(gsCPoint(0,0),size);
	
	    gsDDSURFACEDESC ddsd;

		ZeroMemory(&ddsd,sizeof(ddsd));
		ddsd.dwSize = sizeof(ddsd);
		ddsd.dwFlags = DDSD_WIDTH | DDSD_HEIGHT | DDSD_CAPS;
		ddsd.dwWidth = m_rect.getWidth();
		ddsd.dwHeight = m_rect.getHeight();
		ddsd.ddsCaps.dwCaps = DDSCAPS_OFFSCREENPLAIN;

		HRESULT hr;

		hr = m_direct_draw->CreateSurface(&ddsd,&m_surface,NULL);

		if (hr != DD_OK) {
			gsREPORT("gsCImage::create couldn't create surface");
			return false;
			}

//		gsREPORT("gsCImage created");

		return true;
		}
	else {
		gsREPORT("gsCImage::create called with no direct draw device");
		return false;
		}
}

//-------------------------------------------------------------

void gsCImage::destroy()
{
	if (m_surface) {
		m_surface->Release();
		m_surface = 0;

//		gsREPORT("gsCImage destroyed");
		}
}

//-------------------------------------------------------------

bool gsCImage::draw(const gsCPoint& position)
{
	if (!m_direct_draw) {
		gsREPORT("gsCImage::draw called with no direct draw device");
		return false;
		}

	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen) {
		gsREPORT("gsCImage::draw called with no active screen");
		return false;
		}

	gsCRect dest(position,position + m_rect.getSize());

	if (screen->getRect().contains(dest)) {

		HRESULT hr;

		hr = screen->getBackSurface()->Blt(LPRECT(dest),
										   m_surface,
										   NULL,
										   DDBLT_WAIT | m_colour_key,
										   NULL);

		if (hr != DD_OK) {
			gsREPORT("gsCImage::draw blit failed");
			return false;
			}

		}
	else {
		if (!screen->getRect().overlaps(dest))
			return false;

		gsCRect source = m_rect;

		screen->getRect().clip(source,dest);

		HRESULT hr;

		hr = screen->getBackSurface()->Blt(LPRECT(dest),
										   m_surface,
										   LPRECT(source),
										   DDBLT_WAIT | m_colour_key,
										   NULL);

		if (hr != DD_OK) {
			gsREPORT("gsCImage::draw blit failed");
			return false;
			}
		}

	return true;
}

//-------------------------------------------------------------
// Draw sprite in solid colour

bool gsCImage::drawSolid(const gsCPoint& position,const gsCColour& fill_colour)
{
	if (!m_direct_draw) {
		gsREPORT("gsCImage::draw called with no direct draw device");
		return false;
		}

	gsCScreen *screen = gsCApplication::getScreen();

	if (!screen) {
		gsREPORT("gsCImage::draw called with no active screen");
		return false;
		}

	gsCRect dest(position,position + m_rect.getSize());

	if (screen->getRect().contains(dest)) {

		bool ok = false;

		if (lock()) {
			ok = screen->bltSolid(dest,m_ddsd,m_rect,fill_colour);
			unlock();
			}
		
		if (!ok) {
			gsREPORT("gsCImage::drawSolid blit failed");
			return false;
			}
		}
	else {
		if (!screen->getRect().overlaps(dest))
			return false;

		gsCRect source = m_rect;

		screen->getRect().clip(source,dest);

		bool ok = false;

		if (lock()) {
			ok = screen->bltSolid(dest,m_ddsd,source,fill_colour);
			unlock();
			}
		if (!ok) {
			gsREPORT("gsCImage::drawSolid blit failed");
			return false;
			}
		}

	return true;
}

//-------------------------------------------------------------

bool gsCImage::drawFast(const gsCPoint& position)
{
	gsCScreen *screen = gsCApplication::getScreen();

	HRESULT hr;

	gsCRect dest(position,position + m_rect.getSize());

	hr = screen->getBackSurface()->Blt(LPRECT(dest),
									   m_surface,
									   NULL,
									   DDBLT_WAIT | m_colour_key,
									   NULL);

	if (hr != DD_OK) {
		gsREPORT("gsCImage::drawFast blit failed");
		return false;
		}

	return true;
}

//-------------------------------------------------------------

bool gsCImage::lock()
{
	if (!m_isLocked) {
	
		HRESULT hr;
		
		memset(&m_ddsd,0,sizeof(m_ddsd));
		m_ddsd.dwSize = sizeof(m_ddsd);

#ifdef gsALLOW_SYSLOCK
		hr = m_surface->Lock(NULL,&m_ddsd,DDLOCK_WAIT | DDLOCK_NOSYSLOCK,NULL);
#else
		hr = m_surface->Lock(NULL,&m_ddsd,DDLOCK_WAIT,NULL);
#endif
		
		while (hr == DDERR_SURFACELOST) {
			m_surface->Restore();

			memset(&m_ddsd,0,sizeof(m_ddsd));
			m_ddsd.dwSize = sizeof(m_ddsd);
		
#ifdef gsALLOW_SYSLOCK
			hr = m_surface->Lock(NULL,&m_ddsd,DDLOCK_WAIT | DDLOCK_NOSYSLOCK,NULL);
#else
			hr = m_surface->Lock(NULL,&m_ddsd,DDLOCK_WAIT,NULL);
#endif
			}
		
		if (hr != DD_OK) {
			gsERROR("gsCImage::lock failed");
			return false;
			}

		m_isLocked = true;
		}

	return true;
}

//-------------------------------------------------------------

void gsCImage::unlock()
{
	if (m_isLocked) {
		HRESULT hr;
	
		hr = m_surface->Unlock(NULL);

		while (hr == DDERR_SURFACELOST) {
			m_surface->Restore();
			hr = m_surface->Unlock(NULL);
			}

		if (hr != DD_OK)
			gsERROR("gsCImage::unlock failed");

		m_isLocked = false;
		}
}

//-------------------------------------------------------------

