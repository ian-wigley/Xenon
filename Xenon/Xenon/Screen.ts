import gsCRectangle = require("Rectangle");
import gsCPoint = require("Point");

class gsCScreen {
    m_rect: gsCRectangle = new gsCRectangle(0, 0, 640, 480);

    public contains(actorRect: gsCRectangle) {

        if (actorRect.Left >= this.m_rect.Left &&
            actorRect.Right <= this.m_rect.Right &&
            actorRect.Top >= this.m_rect.Top &&
            actorRect.Bottom <= this.m_rect.Bottom) {

            return true;
        }
        else {
            return false;
        }
    }

    //-------------------------------------------------------------

    public overlaps(rect: gsCRectangle) {
        return (this.m_rect.Left < rect.Right &&
            this.m_rect.Right > rect.Left &&
            this.m_rect.Top < rect.Bottom &&
            this.m_rect.Bottom > rect.Top);
    }

    //-------------------------------------------------------------

    public getRect() {
        return this.m_rect;
    }

    //-------------------------------------------------------------

    public getSize() {
        return this.m_rect.getSize();
    }



    /*
        //    bool gsCScreen::createWindowed(HWND window) {
        //        m_isWindowed = true;
    
        //        HRESULT hr;
    
        //        hr = m_direct_draw ->SetCooperativeLevel(window, DDSCL_NORMAL);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to set cooperative level");
        //            destroy();
        //            return false;
        //        }
    
        //        updateRect(window);
    
        //        gsDDSURFACEDESC ddsd;
    
        //        ZeroMemory(&ddsd, sizeof(ddsd));
        //        ddsd.dwSize = sizeof(ddsd);
        //        ddsd.dwFlags = DDSD_CAPS;
        //        ddsd.ddsCaps.dwCaps = DDSCAPS_PRIMARYSURFACE;
    
        //        hr = m_direct_draw ->CreateSurface(&ddsd,&m_primary_surface, NULL);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to create primary surface");
        //            destroy();
        //            return false;
        //        }
    
        //        hr = m_direct_draw ->CreateClipper(0,&m_clipper, NULL);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to create clipper");
        //            destroy();
        //        }
    
        //        hr = m_clipper ->SetHWnd(0, window);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to set clipper window");
        //            destroy();
        //            return false;
        //        }
    
        //        hr = m_primary_surface ->SetClipper(m_clipper);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to set primary surface clipper");
        //            destroy();
        //            return false;
        //        }
    
        //        ddsd.dwFlags = DDSD_WIDTH | DDSD_HEIGHT | DDSD_CAPS;
        //        ddsd.dwWidth = m_screen_rect.getWidth();
        //        ddsd.dwHeight = m_screen_rect.getHeight();
        //        ddsd.ddsCaps.dwCaps = DDSCAPS_OFFSCREENPLAIN;
    
        //        hr = m_direct_draw ->CreateSurface(&ddsd,&m_back_surface, NULL);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to create back surface");
        //            destroy();
        //            return false;
        //        }
    
        //        findBPP();
    
        //        if (m_bpp == 1) {
        //            if (!createDefaultPalette()) {
        //                gsERROR("gsCScreen::createWindowed failed to create palette");
        //                destroy();
        //                return false;
        //            }
        //            hr = m_primary_surface ->SetPalette(m_palette);
        //            if (hr != DD_OK) {
        //                gsERROR("gsCScreen::createWindowed failed to set palette");
        //                destroy();
        //                return false;
        //            }
        //        }
    
        //        gsCColour::setupColourConversion(this);
    
        //        gsCApplication::m_screen = this;
    
        //        gsREPORT("gsCScreen created (windowed mode)");
    
        //        return true;
        //    }
    
        //    //-------------------------------------------------------------
    
        //    bool gsCScreen::createFullScreen(HWND window,const gsCPoint& size, gsDWORD bitdepth) {
    
    
    
        //        m_isWindowed = true;
    
        //        HRESULT hr;
    
        //        hr = m_direct_draw ->SetCooperativeLevel(window, DDSCL_NORMAL);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to set cooperative level");
        //            destroy();
        //            return false;
        //        }
    
        //        updateRect(window);
    
        //        gsDDSURFACEDESC ddsd;
    
        //        ZeroMemory(&ddsd, sizeof(ddsd));
        //        ddsd.dwSize = sizeof(ddsd);
        //        ddsd.dwFlags = DDSD_CAPS;
        //        ddsd.ddsCaps.dwCaps = DDSCAPS_PRIMARYSURFACE;
    
        //        hr = m_direct_draw ->CreateSurface(&ddsd, &m_primary_surface, NULL);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to create primary surface");
        //            destroy();
        //            return false;
        //        }
    
        //        hr = m_direct_draw ->CreateClipper(0, &m_clipper, NULL);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to create clipper");
        //            destroy();
        //        }
    
        //        hr = m_clipper ->SetHWnd(0, window);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to set clipper window");
        //            destroy();
        //            return false;
        //        }
    
        //        hr = m_primary_surface ->SetClipper(m_clipper);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to set primary surface clipper");
        //            destroy();
        //            return false;
        //        }
    
        //        ddsd.dwFlags = DDSD_WIDTH | DDSD_HEIGHT | DDSD_CAPS;
        //        ddsd.dwWidth = m_screen_rect.getWidth();
        //        ddsd.dwHeight = m_screen_rect.getHeight();
        //        ddsd.ddsCaps.dwCaps = DDSCAPS_OFFSCREENPLAIN;
    
        //        hr = m_direct_draw ->CreateSurface(&ddsd, &m_back_surface, NULL);
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::createWindowed failed to create back surface");
        //            destroy();
        //            return false;
        //        }
    
        //        findBPP();
    
        //        if (m_bpp == 1) {
        //            if (!createDefaultPalette()) {
        //                gsERROR("gsCScreen::createWindowed failed to create palette");
        //                destroy();
        //                return false;
        //            }
        //            hr = m_primary_surface ->SetPalette(m_palette);
        //            if (hr != DD_OK) {
        //                gsERROR("gsCScreen::createWindowed failed to set palette");
        //                destroy();
        //                return false;
        //            }
        //        }
    
        //        gsCColour::setupColourConversion(this);
    
        //        gsCApplication::m_screen = this;
    
        //        gsREPORT("gsCScreen created (windowed mode)");
    
        //        return true;
    
   
    
        //        //m_isWindowed = true;// false;
    
        //        //HRESULT hr;
    
        //        //hr = m_direct_draw->SetCooperativeLevel(window, DDSCL_EXCLUSIVE | DDSCL_FULLSCREEN);
        //        //
        //        //if (hr != DD_OK) {
        //        //	gsERROR("gsCScreen::createFullscreen failed to set cooperative level");
        //        //	destroy();
        //        //	return false;
        //        //	}
        //        //   
        //        //bitdepth = 24;
        //        ////hr = m_direct_draw->SetDisplayMode(size.getX(),size.getY(),bitdepth,0,0);
        //        //
        //        //if (hr != DD_OK) {
        //        //	gsERROR("gsCScreen::createFullscreen failed to set display mode");
        //        //	destroy();
        //        //	return false;
        //        //	}
    
        //        //m_display_mode_set = true;
    
        //        //m_viewport_rect.setTopLeft(gsCPoint(0,0));
        //        //m_viewport_rect.setBottomRight(gsCPoint(size));
    
        //        //m_screen_rect = m_viewport_rect;
    
        //        //   gsDDSURFACEDESC ddsd;
        //        //   
        //        //   ZeroMemory(&ddsd,sizeof(ddsd));
        //        //   ddsd.dwSize = sizeof(ddsd);
        //        //   ddsd.dwFlags = DDSD_CAPS | DDSD_BACKBUFFERCOUNT;
        //        //   ddsd.ddsCaps.dwCaps = DDSCAPS_PRIMARYSURFACE | DDSCAPS_FLIP | DDSCAPS_COMPLEX;
        //        //   ddsd.dwBackBufferCount = 1;
    
        //        //   hr = m_direct_draw->CreateSurface( &ddsd, &m_primary_surface, NULL);
        //        //
        //        //if (hr != DD_OK) {
        //        //	gsERROR("gsCScreen::createFullscreen failed to create primary surface");
        //        //	destroy();
        //        //	return false;
        //        //	}
    
        //        //   gsDDSCAPS ddscaps;
    
        //        //   ZeroMemory(&ddscaps,sizeof(ddscaps));
        //        //ddscaps.dwCaps = DDSCAPS_BACKBUFFER;
        //        //   
        //        //hr = m_primary_surface->GetAttachedSurface(&ddscaps, &m_back_surface);
        //        //
        //        //if (hr != DD_OK) {
        //        //	gsERROR("gsCScreen::createFullscreen failed to create back surface");
        //        //	destroy();
        //        //	return false;
        //        //	}
    
        //        //findBPP();
    
        //        //if (m_bpp == 1) {
        //        //	if (!createDefaultPalette()) {
        //        //		gsERROR("gsCScreen::createFullScreen failed to create palette");
        //        //		destroy();
        //        //		return false;
        //        //		}
        //        //	hr = m_primary_surface->SetPalette(m_palette);
        //        //	if (hr != DD_OK) {
        //        //		gsERROR("gsCScreen::createFullScreen failed to set palette");
        //        //		destroy();
        //        //		return false;
        //        //		}
        //        //	}
    
        //        //gsCColour::setupColourConversion(this);
    
        //        //gsCApplication::m_screen = this;
    
        //        //gsREPORT("gsCScreen created (fullscreen mode)");
    
        //        //   return true;
        //    }
    
        //    //-------------------------------------------------------------
    
        //    bool gsCScreen::createDefaultPalette() {
        //        for (int i = 0; i < 256; i++) {
        //            m_palette_colours[i].peRed = (BYTE)(((i >> 5) & 0x07) * 255 / 7);
        //            m_palette_colours[i].peGreen = (BYTE)(((i >> 2) & 0x07) * 255 / 7);
        //            m_palette_colours[i].peBlue = (BYTE)(((i >> 0) & 0x03) * 255 / 3);
        //            m_palette_colours[i].peFlags = (BYTE) 0;
        //        }
    
        //        return m_direct_draw ->CreatePalette(DDPCAPS_8BIT,
        //            m_palette_colours,
        //										&m_palette,
        //            NULL) == DD_OK;
        //    }
    
        //    //-------------------------------------------------------------
    
        //    bool gsCScreen::flip() {
        //        HRESULT hr;
    
        //        #ifndef _PROFILING
        //        if (m_isWindowed) {
        //            hr = m_direct_draw ->WaitForVerticalBlank(DDWAITVB_BLOCKBEGIN, NULL);
    
        //            if (hr != DD_OK)
        //                gsREPORT("gsCScreen::flip wait for VB failed");
        //        }
        //        #endif
    
        //        hr = DD_OK;
    
        //        do {
        //            if (m_isWindowed) {
        //                hr = m_primary_surface ->Blt(LPRECT(m_screen_rect),
        //                    m_back_surface,
        //                    LPRECT(m_viewport_rect),
        //                    DDBLT_WAIT,
        //                    NULL);
        //                if (hr != DD_OK) {
        //                    gsREPORT("gsCScreen::flip couldn't blit back surface to primary");
        //                    break;
        //                }
        //            }
        //            else {
        //                hr = m_primary_surface ->Flip(NULL, 0L);
    
        //                if (hr != DD_OK) {
        //                    gsREPORT("gsCScreen::flip couldn't flip surfaces");
        //                    break;
        //                }
        //            }
    
        //            if (hr == DDERR_SURFACELOST) {
        //                hr = m_primary_surface ->Restore();
        //                if (hr != DD_OK) {
        //                    gsREPORT("gsCScreen::flip couldn't restore primary surface");
        //                    break;
        //                }
        //            }
        //        }
        //        while (hr == DDERR_WASSTILLDRAWING);
    
        //        if (hr != DD_OK) {
        //            gsREPORT("gsCScreen::flip failed");
        //            return false;
        //        }
    
        //        return true;
        //    }
    
        ////-------------------------------------------------------------
    
        //void gsCScreen::updateRect(HWND window)
        //{
        //    GetWindowRect(window, LPRECT(m_window_rect));
        //    GetClientRect(window, LPRECT(m_viewport_rect));
        //    GetClientRect(window, LPRECT(m_screen_rect));
    
        //    gsCPoint p;
    
        //    p = m_screen_rect.getTopLeft();
        //    ClientToScreen(window, LPPOINT(p));
        //    m_screen_rect.setTopLeft(p);
    
        //    p = m_screen_rect.getBottomRight();
        //    ClientToScreen(window, LPPOINT(p));
        //    m_screen_rect.setBottomRight(p);
        //}
    
        ////-------------------------------------------------------------
    
        //void gsCScreen::clear(const gsCColour& colour)
        //    {
        //        drawSolidRect(getRect(), colour);
        //}
    
        ////-------------------------------------------------------------
    
        //bool gsCScreen::lock()
        //{
        //    if (!m_isLocked) {
    
        //        HRESULT hr;
    
        //        memset(&m_ddsd, 0, sizeof(m_ddsd));
        //        m_ddsd.dwSize = sizeof(m_ddsd);
    
        //        #ifdef gsALLOW_SYSLOCK
        //        hr = m_back_surface ->Lock(NULL,&m_ddsd, DDLOCK_WAIT | DDLOCK_NOSYSLOCK, NULL);
        //        #else
        //        hr = m_back_surface ->Lock(NULL,&m_ddsd, DDLOCK_WAIT, NULL);
        //        #endif
    
        //        while (hr == DDERR_SURFACELOST) {
        //            if (m_isWindowed)
        //                m_back_surface ->Restore();
        //            else
        //                m_primary_surface ->Restore();
    
        //            memset(&m_ddsd, 0, sizeof(m_ddsd));
        //            m_ddsd.dwSize = sizeof(m_ddsd);
    
        //            #ifdef gsALLOW_SYSLOCK
        //            hr = m_back_surface ->Lock(NULL,&m_ddsd, DDLOCK_WAIT | DDLOCK_NOSYSLOCK, NULL);
        //            #else
        //            hr = m_back_surface ->Lock(NULL,&m_ddsd, DDLOCK_WAIT, NULL);
        //            #endif
        //        }
    
        //        if (hr != DD_OK) {
        //            gsERROR("gsCScreen::lock failed");
        //            return false;
        //        }
    
        //        m_isLocked = true;
        //    }
    
        //    return true;
        //}
    
        ////-------------------------------------------------------------
    
        //void gsCScreen::unlock()
        //{
        //    if (m_isLocked) {
        //        HRESULT hr;
    
        //        hr = m_back_surface ->Unlock(NULL);
    
        //        while (hr == DDERR_SURFACELOST) {
        //            if (m_isWindowed)
        //                m_back_surface ->Restore();
        //            else
        //                m_primary_surface ->Restore();
    
        //            hr = m_back_surface ->Unlock(NULL);
        //        }
    
        //        if (hr != DD_OK)
        //            gsERROR("gsCScreen::unlock failed");
    
        //        m_isLocked = false;
        //    }
        //}
    
        ////-------------------------------------------------------------
        //// Internal function - must be inside lock/unlock
    
        //void gsCScreen::draw_pixel(const gsCPoint& position,const gsCColour& colour)
        //    {
        //        if (position.getX() < 0 ||
        //            position.getY() < 0 ||
        //            position.getX() >= m_screen_rect.getWidth() ||
        //            position.getY() >= m_screen_rect.getHeight())
        //		return;
    
        //gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + position.getY() * m_ddsd.lPitch;
    
        //gsUDWORD raw = colour.getRaw();
    
        //switch (m_bpp) {
        //    case 1:
        //        dest += position.getX();
        //			*dest = (gsUBYTE) raw;
        //        break;
        //    case 2:
        //        dest += 2 * position.getX();
        //            *((gsUWORD *) dest) = (gsUWORD) raw;
        //        break;
        //    case 3:
        //        dest += 3 * position.getX();
        //			*((gsUWORD *) dest) = (gsUWORD) raw;
        //			*(dest + 2) = (gsUBYTE)(raw >> 16);
        //        break;
        //    case 4:
        //        dest += 4 * position.getX();
        //			*((gsUWORD *) dest) = (gsUWORD) raw;
        //			*((gsUWORD *) (dest + 2)) = (gsUWORD)(raw >> 16);
        //        break;
        //}
        //}
    
        ////-------------------------------------------------------------
        //// Internal function - must be inside lock/unlock
    
        //void gsCScreen::draw_pixels(int num_points,const gsCPoint *position,const gsCColour *colour, bool clip)
        //    {
        //        if (clip) {
        //            int sw = m_screen_rect.getWidth();
        //            int sh = m_screen_rect.getHeight();
    
        //            switch (m_bpp) {
        //                case 1:
        //                    while (num_points-- > 0) {
        //                        int x = position ->getX();
        //                        int y = position ->getY();
    
        //                        if (x >= 0 && y >= 0 && x < sw && y < sh) {
        //                            gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + y * m_ddsd.lPitch + x;
        //						*dest = (gsUBYTE) colour->getRaw();
        //                        }
        //                        position++;
        //                        colour++;
        //                    }
        //                    break;
        //                case 2:
        //                    while (num_points-- > 0) {
        //                        int x = position ->getX();
        //                        int y = position ->getY();
    
        //                        if (x >= 0 && y >= 0 && x < sw && y < sh) {
        //                            gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + y * m_ddsd.lPitch + 2 * x;
        //						*((gsUWORD *) dest) = (gsUWORD) colour->getRaw();
        //                        }
        //                        position++;
        //                        colour++;
        //                    }
        //                    break;
        //                case 3:
        //                    while (num_points-- > 0) {
        //                        int x = position ->getX();
        //                        int y = position ->getY();
    
        //                        if (x >= 0 && y >= 0 && x < sw && y < sh) {
        //                            gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + y * m_ddsd.lPitch + 3 * x;
        //						*((gsUWORD *) dest) = (gsUWORD) colour->getRaw();
        //						*(dest + 2) = (gsUBYTE)(colour ->getRaw() >> 16);
        //                        }
        //                        position++;
        //                        colour++;
        //                    }
        //                    break;
        //                case 4:
        //                    while (num_points-- > 0) {
        //                        int x = position ->getX();
        //                        int y = position ->getY();
    
        //                        if (x >= 0 && y >= 0 && x < sw && y < sh) {
        //                            gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + y * m_ddsd.lPitch + 4 * x;
        //						*((gsUWORD *) dest) = (gsUWORD) colour->getRaw();
        //						*((gsUWORD *) (dest + 2)) = (gsUWORD)(colour ->getRaw() >> 16);
        //                        }
        //                        position++;
        //                        colour++;
        //                    }
        //                    break;
        //            }
        //        }
        //	else {
        //            switch (m_bpp) {
        //			case 1:
        //            while (num_points-- > 0) {
        //                gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + position ->getY() * m_ddsd.lPitch + position ->getX();
        //					*dest = (gsUBYTE) colour->getRaw();
        //                position++;
        //                colour++;
        //            }
        //				break;
        //			case 2:
        //while (num_points-- > 0) {
        //    gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + position ->getY() * m_ddsd.lPitch + 2 * position ->getX();
        //					*((gsUWORD *) dest) = (gsUWORD) colour->getRaw();
        //    position++;
        //    colour++;
        //}
        //break;
        //			case 3:
        //while (num_points-- > 0) {
        //    gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + position ->getY() * m_ddsd.lPitch + 3 * position ->getX();
        //    gsUDWORD raw = colour ->getRaw();
        //					*((gsUWORD *) dest) = (gsUWORD) raw;
        //					*(dest + 2) = (gsUBYTE)(raw >> 16);
        //    position++;
        //    colour++;
        //}
        //break;
        //			case 4:
        //while (num_points-- > 0) {
        //    gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + position ->getY() * m_ddsd.lPitch + 4 * position ->getX();
        //    gsUDWORD raw = colour ->getRaw();
        //					*((gsUWORD *) dest) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 2)) = (gsUWORD)(raw >> 16);
        //    position++;
        //    colour++;
        //}
        //break;
        //			}
        //		}
        //}
    
        ////-------------------------------------------------------------
    
        //void gsCScreen::drawPoint(const gsCPoint& position,const gsCColour& colour)
        //    {
        //        if (!m_back_surface) {
        //            gsREPORT("gsCScreen::drawPoint called with no back surface");
        //return;
        //		}
    
        //if (lock()) {
        //    draw_pixel(position, colour);
        //    unlock();
        //}
        //}
    
        ////-------------------------------------------------------------
    
        //void gsCScreen::draw_hline(int x1, int x2, int y,const gsCColour& colour)
        //    {
        //        if (x1 > x2) {
        //            int t = x1;
        //            x1 = x2;
        //            x2 = t;
        //        }
    
        //	if (x1 >= m_screen_rect.getWidth() ||
        //            x2 < 0 ||
        //            y < 0 ||
        //            y >= m_screen_rect.getHeight())
        //		return;
    
        //if (x1 < 0)
        //    x1 = 0;
        //if (x2 >= m_screen_rect.getWidth())
        //    x2 = m_screen_rect.getWidth() - 1;
    
        //gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + y * m_ddsd.lPitch
        //    + x1 * m_bpp;
    
        //gsUDWORD raw = colour.getRaw();
    
        //int count = x2 + 1 - x1;
    
        //switch (m_bpp) {
        //    case 1:
        //        {
        //            while (count >= 8) {
        //					*dest = (gsUBYTE) raw;
        //					*(dest + 1) = (gsUBYTE) raw;
        //					*(dest + 2) = (gsUBYTE) raw;
        //					*(dest + 3) = (gsUBYTE) raw;
        //					*(dest + 4) = (gsUBYTE) raw;
        //					*(dest + 5) = (gsUBYTE) raw;
        //					*(dest + 6) = (gsUBYTE) raw;
        //					*(dest + 7) = (gsUBYTE) raw;
        //                dest += 8;
        //                count -= 8;
        //            }
        //            while (count-- > 0) {
        //					*dest = (gsUBYTE) raw;
        //                dest++;
        //            }
        //            break;
        //        }
        //    case 2:
        //        {
        //            while (count >= 8) {
        //		            *((gsUWORD *) dest) = (gsUWORD) raw;
        //		            *((gsUWORD *) (dest + 2)) = (gsUWORD) raw;
        //		            *((gsUWORD *) (dest + 4)) = (gsUWORD) raw;
        //		            *((gsUWORD *) (dest + 6)) = (gsUWORD) raw;
        //		            *((gsUWORD *) (dest + 8)) = (gsUWORD) raw;
        //		            *((gsUWORD *) (dest + 10)) = (gsUWORD) raw;
        //		            *((gsUWORD *) (dest + 12)) = (gsUWORD) raw;
        //		            *((gsUWORD *) (dest + 14)) = (gsUWORD) raw;
        //                dest += 16;
        //                count -= 8;
        //            }
        //            while (count-- > 0) {
        //		            *((gsUWORD *) dest) = (gsUWORD) raw;
        //                dest += 2;
        //            }
        //            break;
        //        }
        //    case 3:
        //        {
        //            while (count >= 8) {
        //					*((gsUWORD *) dest) = (gsUWORD) raw;
        //					*(dest + 2) = (gsUBYTE)(raw >> 16);
        //					*((gsUWORD *) (dest + 3)) = (gsUWORD) raw;
        //					*(dest + 5) = (gsUBYTE)(raw >> 16);
        //					*((gsUWORD *) (dest + 6)) = (gsUWORD) raw;
        //					*(dest + 8) = (gsUBYTE)(raw >> 16);
        //					*((gsUWORD *) (dest + 9)) = (gsUWORD) raw;
        //					*(dest + 11) = (gsUBYTE)(raw >> 16);
        //					*((gsUWORD *) (dest + 12)) = (gsUWORD) raw;
        //					*(dest + 14) = (gsUBYTE)(raw >> 16);
        //					*((gsUWORD *) (dest + 15)) = (gsUWORD) raw;
        //					*(dest + 17) = (gsUBYTE)(raw >> 16);
        //					*((gsUWORD *) (dest + 18)) = (gsUWORD) raw;
        //					*(dest + 20) = (gsUBYTE)(raw >> 16);
        //					*((gsUWORD *) (dest + 21)) = (gsUWORD) raw;
        //					*(dest + 23) = (gsUBYTE)(raw >> 16);
        //                dest += 24;
        //                count -= 8;
        //            }
        //            while (count-- > 0) {
        //					*((gsUWORD *) dest) = (gsUWORD) raw;
        //					*(dest + 2) = (gsUBYTE)(raw >> 16);
        //                dest += 3;
        //            }
        //            break;
        //        }
        //    case 4:
        //        {
        //            while (count >= 8) {
        //					*((gsUWORD *) dest) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 2)) = (gsUWORD)(raw >> 16);
        //					*((gsUWORD *) (dest + 4)) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 6)) = (gsUWORD)(raw >> 16);
        //					*((gsUWORD *) (dest + 8)) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 10)) = (gsUWORD)(raw >> 16);
        //					*((gsUWORD *) (dest + 12)) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 14)) = (gsUWORD)(raw >> 16);
        //					*((gsUWORD *) (dest + 16)) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 18)) = (gsUWORD)(raw >> 16);
        //					*((gsUWORD *) (dest + 20)) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 22)) = (gsUWORD)(raw >> 16);
        //					*((gsUWORD *) (dest + 24)) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 26)) = (gsUWORD)(raw >> 16);
        //					*((gsUWORD *) (dest + 28)) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 30)) = (gsUWORD)(raw >> 16);
        //                dest += 32;
        //                count -= 8;
        //            }
        //            while (count-- > 0) {
        //					*((gsUWORD *) dest) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 2)) = (gsUWORD)(raw >> 16);
        //                dest += 4;
        //            }
        //        }
        //        break;
        //}
        //}
    
        ////-------------------------------------------------------------
    
        //void gsCScreen::draw_vline(int x, int y1, int y2,const gsCColour& colour)
        //    {
        //        if (y1 > y2) {
        //            int t = y1;
        //            y1 = y2;
        //            y2 = t;
        //        }
    
        //	if (y1 >= m_screen_rect.getHeight() ||
        //            y2 < 0 ||
        //            x < 0 ||
        //            x >= m_screen_rect.getWidth())
        //		return;
    
        //if (y1 < 0)
        //    y1 = 0;
        //if (y2 >= m_screen_rect.getHeight())
        //    y2 = m_screen_rect.getHeight() - 1;
    
        //gsUBYTE * dest = (gsUBYTE *) m_ddsd.lpSurface + y1 * m_ddsd.lPitch
        //    + x * m_bpp;
    
        //gsUDWORD raw = colour.getRaw();
    
        //int count = y2 + 1 - y1;
    
        //switch (m_bpp) {
        //    case 1:
        //        {
        //            while (count-- > 0) {
        //					*dest = (gsUBYTE) raw;
        //                dest += m_ddsd.lPitch;
        //            }
        //            break;
        //        }
        //    case 2:
        //        {
        //            while (count-- > 0) {
        //		            *((gsUWORD *) dest) = (gsUWORD) raw;
        //                dest += m_ddsd.lPitch;
        //            }
        //            break;
        //        }
        //    case 3:
        //        {
        //            while (count-- > 0) {
        //					*((gsUWORD *) dest) = (gsUWORD) raw;
        //					*(dest + 2) = (gsUBYTE)(raw >> 16);
        //                dest += m_ddsd.lPitch;
        //            }
        //            break;
        //        }
        //    case 4:
        //        {
        //            while (count-- > 0) {
        //					*((gsUWORD *) dest) = (gsUWORD) raw;
        //					*((gsUWORD *) (dest + 2)) = (gsUWORD)(raw >> 16);
        //                dest += m_ddsd.lPitch;
        //            }
        //        }
        //        break;
        //}
        //}
     */

    //-------------------------------------------------------------

    public drawLine(from: gsCPoint, to: gsCPoint, colour: string, ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = colour;
        ctx.moveTo(from.X, from.Y);
        ctx.lineTo(to.X, to.Y);
        ctx.stroke();
    }

    //-------------------------------------------------------------

    public drawRect(rect: gsCRectangle, colour: string, ctx: CanvasRenderingContext2D): void {
        if (rect != null) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colour;
            ctx.rect(rect.Left, rect.Top, rect.Right, rect.Bottom);
            ctx.stroke();
        }
    }

    //-------------------------------------------------------------

   public drawSolidRect(rect: gsCRectangle, colour: string, ctx: CanvasRenderingContext2D): boolean {
        if (rect != null) {
            ctx.beginPath();
            ctx.fillStyle = colour;
            ctx.fillRect(rect.Left, rect.Top, rect.Right - 1, rect.Bottom - 1);
            ctx.stroke();
            return true
        }
        else {
            return false;
        }
    }

    //-------------------------------------------------------------

    /*
        void gsCScreen::drawPoints(int num_points,const gsCPoint *points,const gsCColour *colours, bool clip)
            {
                if (!m_back_surface) {
                    gsREPORT("gsCScreen::drawPoint called with no back surface");
        return;
                }
    
        if (lock()) {
            draw_pixels(num_points, points, colours, clip);
            unlock();
        }
        }
    
        //-------------------------------------------------------------
    
        //void gsCScreen::drawLines(int num_points,const gsCPoint *points,const gsCColour *colours)
        //    {
        //        gsREPORT("gsCScreen::drawLines not yet implemented");
        //}
    
        ////-------------------------------------------------------------
    
        //// Blit image in solid colour
        ////
        //// Pixel which are non-MAGENTA are drawn in the fill colour
    
        //bool gsCScreen::bltSolid(const gsCRect& dest, gsDDSURFACEDESC& source_ddsd,const gsCRect& source,const gsCColour& fill_colour)
        //    {
        //        if (lock()) {
    
        //            gsUBYTE * src = (gsUBYTE *) source_ddsd.lpSurface + source.getTop() * source_ddsd.lPitch
        //                + source.getLeft() * m_bpp;
    
        //            gsUBYTE * dst = (gsUBYTE *) m_ddsd.lpSurface + dest.getTop() * m_ddsd.lPitch
        //												    + dest.getLeft() * m_bpp;
    
        //            gsUDWORD trans = gsCColour(gsMAGENTA).getRaw();
        //            gsUDWORD fill = fill_colour.getRaw();
    
        //            int h = dest.getHeight();
        //            int w = dest.getWidth();
    
        //            switch (m_bpp) {
        //                case 1:
        //                    {
        //                        while (h-- > 0) {
        //                            gsUBYTE * s = (gsUBYTE *) src;
        //                            gsUBYTE * d = (gsUBYTE *) dst;
        //                            int count = w;
        //                            while (count >= 4) {
        //                                if (*s != (gsUBYTE) trans)
        //								*d = (gsUBYTE) fill;
        //                                if (*(s + 1) != (gsUBYTE) trans)
        //								*(d + 1) = (gsUBYTE) fill;
        //                                if (*(s + 2) != (gsUBYTE) trans)
        //								*(d + 2) = (gsUBYTE) fill;
        //                                if (*(s + 3) != (gsUBYTE) trans)
        //								*(d + 3) = (gsUBYTE) fill;
        //                                s += 4;
        //                                d += 4;
        //                                count -= 4;
        //                            }
        //                            while (count-- > 0) {
        //                                if (*s != (gsUBYTE) trans)
        //								*d = (gsUBYTE) fill;
        //                                s++;
        //                                d++;
        //                            }
        //                            src += source_ddsd.lPitch;
        //                            dst += m_ddsd.lPitch;
        //                        }
        //                    }
        //                    break;
        //                case 2:
        //                    {
        //                        while (h-- > 0) {
        //                            gsUWORD * s = (gsUWORD *) src;
        //                            gsUWORD * d = (gsUWORD *) dst;
        //                            int count = w;
        //                            while (count >= 4) {
        //                                if (*s != (gsUWORD) trans)
        //								*d = (gsUWORD) fill;
        //                                if (*(s + 1) != (gsUWORD) trans)
        //								*(d + 1) = (gsUWORD) fill;
        //                                if (*(s + 2) != (gsUWORD) trans)
        //								*(d + 2) = (gsUWORD) fill;
        //                                if (*(s + 3) != (gsUWORD) trans)
        //								*(d + 3) = (gsUWORD) fill;
        //                                s += 4;
        //                                d += 4;
        //                                count -= 4;
        //                            }
        //                            while (count-- > 0) {
        //                                if (*s != (gsUWORD) trans)
        //								*d = (gsUWORD) fill;
        //                                s++;
        //                                d++;
        //                            }
        //                            src += source_ddsd.lPitch;
        //                            dst += m_ddsd.lPitch;
        //                        }
        //                    }
        //                    break;
        //                case 3:
        //                    {
        //                        while (h-- > 0) {
        //                            gsUBYTE * s = (gsUBYTE *) src;
        //                            gsUBYTE * d = (gsUBYTE *) dst;
        //                            int count = w;
        //                            gsUBYTE trans_h = (gsUBYTE)(trans >> 16);
        //                            gsUBYTE fill_h = (gsUBYTE)(fill >> 16);
        //                            while (count >= 4) {
        //                                if (*((gsUWORD *) s) != (gsUWORD) trans || *(s + 2) != trans_h) {
        //								*((gsUWORD *) d) = (gsUWORD) fill;
        //								*(d + 2) = fill_h;
        //                                }
        //                                if (*((gsUWORD *) (s + 3)) != (gsUWORD) trans || *(s + 5) != trans_h) {
        //								*((gsUWORD *) (d + 3)) = (gsUWORD) fill;
        //								*(d + 6) = fill_h;
        //                                }
        //                                if (*((gsUWORD *) (s + 6)) != (gsUWORD) trans || *(s + 8) != trans_h) {
        //								*((gsUWORD *) (d + 6)) = (gsUWORD) fill;
        //								*(d + 9) = fill_h;
        //                                }
        //                                if (*((gsUWORD *) (s + 9)) != (gsUWORD) trans || *(s + 11) != trans_h) {
        //								*((gsUWORD *) (d + 9)) = (gsUWORD) fill;
        //								*(d + 11) = fill_h;
        //                                }
        //                                s += 12;
        //                                d += 12;
        //                                count -= 3;
        //                            }
        //                            while (count-- > 0) {
        //                                if (*((gsUWORD *) s) != (gsUWORD) trans || *(s + 2) != trans_h) {
        //								*((gsUWORD *) d) = (gsUWORD) fill;
        //								*(d + 2) = fill_h;
        //                                }
        //                                s += 3;
        //                                d += 3;
        //                            }
        //                            src += source_ddsd.lPitch;
        //                            dst += m_ddsd.lPitch;
        //                        }
        //                    }
        //                    break;
        //                case 4:
        //                    {
        //                        while (h-- > 0) {
        //                            gsUBYTE * s = (gsUBYTE *) src;
        //                            gsUBYTE * d = (gsUBYTE *) dst;
        //                            int count = w;
        //                            gsUBYTE trans_h = (gsUBYTE)(trans >> 16);
        //                            gsUBYTE fill_h = (gsUBYTE)(fill >> 16);
        //                            while (count >= 4) {
        //                                if (*((gsUWORD *) s) != (gsUWORD) trans || *(s + 2) != trans_h) {
        //								*((gsUWORD *) d) = (gsUWORD) fill;
        //								*(d + 2) = fill_h;
        //                                }
        //                                if (*((gsUWORD *) (s + 4)) != (gsUWORD) trans || *(s + 6) != trans_h) {
        //								*((gsUWORD *) (d + 4)) = (gsUWORD) fill;
        //								*(d + 6) = fill_h;
        //                                }
        //                                if (*((gsUWORD *) (s + 8)) != (gsUWORD) trans || *(s + 10) != trans_h) {
        //								*((gsUWORD *) (d + 8)) = (gsUWORD) fill;
        //								*(d + 10) = fill_h;
        //                                }
        //                                if (*((gsUWORD *) (s + 12)) != (gsUWORD) trans || *(s + 14) != trans_h) {
        //								*((gsUWORD *) (d + 12)) = (gsUWORD) fill;
        //								*(d + 14) = fill_h;
        //                                }
        //                                s += 16;
        //                                d += 16;
        //                                count -= 4;
        //                            }
        //                            while (count-- > 0) {
        //                                if (*((gsUWORD *) s) != (gsUWORD) trans || *(s + 2) != trans_h) {
        //								*((gsUWORD *) d) = (gsUWORD) fill;
        //								*(d + 2) = fill_h;
        //                                }
        //                                s += 4;
        //                                d += 4;
        //                            }
        //                            src += source_ddsd.lPitch;
        //                            dst += m_ddsd.lPitch;
        //                        }
        //                    }
        //                    break;
        //            }
    
        //            unlock();
    
        //            return true;
        //        }
    
        //	return false;
        //}
    
        ////-------------------------------------------------------------
        //// Blit image with colour tint
        ////
        //// Pixels which are white are replaced by the tint colour
        //// Other pixels are drawn normally
    
        //bool gsCScreen::bltTinted(const gsCRect& dest, gsDDSURFACEDESC& source_ddsd,const gsCRect& source,const gsCColour& tint_colour)
        //    {
        //        if (lock()) {
    
        //            gsUBYTE * src = (gsUBYTE *) source_ddsd.lpSurface + source.getTop() * source_ddsd.lPitch
        //                + source.getLeft() * m_bpp;
    
        //            gsUBYTE * dst = (gsUBYTE *) m_ddsd.lpSurface + dest.getTop() * m_ddsd.lPitch
        //												    + dest.getLeft() * m_bpp;
    
        //            gsUDWORD base = gsCColour(gsWHITE).getRaw();
        //            gsUDWORD tint = tint_colour.getRaw();
    
        //            int h = dest.getHeight();
        //            int w = dest.getWidth();
    
        //            switch (m_bpp) {
        //                case 1:
        //                    {
        //                        while (h-- > 0) {
        //                            gsUBYTE * s = (gsUBYTE *) src;
        //                            gsUBYTE * d = (gsUBYTE *) dst;
        //                            int count = w;
        //                            while (count >= 4) {
        //                                if (*s == (gsUBYTE) base)
        //								*d = (gsUBYTE) tint;
        //							else
        //								*d = *s;
        //if (*(s + 1) == (gsUBYTE) base)
        //								*(d + 1) = (gsUBYTE) tint;
        //							else
        //								*(d + 1) = *(s + 1);
        //if (*(s + 2) == (gsUBYTE) base)
        //								*(d + 2) = (gsUBYTE) tint;
        //							else
        //								*(d + 2) = *(s + 2);
        //if (*(s + 3) == (gsUBYTE) base)
        //								*(d + 3) = (gsUBYTE) tint;
        //							else
        //								*(d + 3) = *(s + 3);
        //s += 4;
        //d += 4;
        //count -= 4;
        //							}
        //while (count-- > 0) {
        //    if (*s == (gsUBYTE) base)
        //								*d = (gsUBYTE) tint;
        //							else
        //								*d = *s;
        //}
        //src += source_ddsd.lPitch;
        //dst += m_ddsd.lPitch;
        //						}
        //				}
        //break;
        //			case 2:
        //{
        //    while (h-- > 0) {
        //        gsUWORD * s = (gsUWORD *) src;
        //        gsUWORD * d = (gsUWORD *) dst;
        //        int count = w;
        //        while (count >= 4) {
        //            if (*s == (gsUWORD) base)
        //								*d = (gsUWORD) tint;
        //							else
        //								*d = *s;
        //            if (*(s + 1) == (gsUWORD) base)
        //								*(d + 1) = (gsUWORD) tint;
        //							else
        //								*(d + 1) = *(s + 1);
        //            if (*(s + 2) == (gsUWORD) base)
        //								*(d + 2) = (gsUWORD) tint;
        //							else
        //								*(d + 3) = *(s + 3);
        //            if (*(s + 3) == (gsUWORD) base)
        //								*(d + 3) = (gsUWORD) tint;
        //							else
        //								*(d + 3) = *(s + 3);
        //            s += 4;
        //            d += 4;
        //            count -= 4;
        //        }
        //        while (count-- > 0) {
        //            if (*s != (gsUWORD) base)
        //								*d = (gsUWORD) tint;
        //							else
        //								*d = *s;
        //            s++;
        //            d++;
        //        }
        //        src += source_ddsd.lPitch;
        //        dst += m_ddsd.lPitch;
        //    }
        //}
        //break;
        //			case 3:
        //{
        //    while (h-- > 0) {
        //        gsUBYTE * s = (gsUBYTE *) src;
        //        gsUBYTE * d = (gsUBYTE *) dst;
        //        int count = w;
        //        gsUBYTE base_h = (gsUBYTE)(base >> 16);
        //        gsUBYTE tint_h = (gsUBYTE)(tint >> 16);
        //        while (count-- > 0) {
        //            if (*((gsUWORD *) s) == (gsUWORD) base &&
        //								*(s + 2) == base_h) {
        //								*((gsUWORD *) d) = (gsUWORD) tint;
        //								*(d + 2) = tint_h;
        //            }
        //							else {
        //								*((gsUWORD *) d) = *((gsUWORD *) s);
        //								*(d + 2) = *(s + 2);
        //            }
        //            s += 3;
        //            d += 3;
        //        }
        //        src += source_ddsd.lPitch;
        //        dst += m_ddsd.lPitch;
        //    }
        //}
        //break;
        //			case 4:
        //{
        //    while (h-- > 0) {
        //        gsUBYTE * s = (gsUBYTE *) src;
        //        gsUBYTE * d = (gsUBYTE *) dst;
        //        int count = w;
        //        gsUBYTE base_h = (gsUBYTE)(base >> 16);
        //        gsUBYTE tint_h = (gsUBYTE)(tint >> 16);
        //        while (count-- > 0) {
        //            if (*((gsUWORD *) s) == (gsUWORD) base &&
        //								*(s + 2) == base_h) {
        //								*((gsUWORD *) d) = (gsUWORD) tint;
        //								*(d + 2) = tint_h;
        //            }
        //							else {
        //								*((gsUWORD *) d) = *((gsUWORD *) s);
        //								*(d + 2) = *(s + 2);
        //            }
        //            s += 4;
        //            d += 4;
        //        }
        //        src += source_ddsd.lPitch;
        //        dst += m_ddsd.lPitch;
        //    }
        //}
        //break;
        //			}
    
        //unlock();
    
        //return true;
        //		}
    
        //return false;
        //}
    
        ////-------------------------------------------------------------
    
        //bool gsCScreen::destroy()
        //{
        //    if (m_display_mode_set) {
        //        m_direct_draw ->RestoreDisplayMode();
        //        m_display_mode_set = false;
        //    }
    
        //    //	gsCColour::setupColourConversion(0);
    
        //    gsCApplication::m_screen = 0;
    
        //    if (m_clipper) {
        //        m_clipper ->Release();
        //        m_clipper = 0;
        //    }
    
        //    if (m_back_surface) {
        //        m_back_surface ->Release();
        //        m_back_surface = 0;
        //    }
    
        //    if (m_primary_surface) {
        //        m_primary_surface ->Release();
        //        m_primary_surface = 0;
        //    }
    
        //    if (m_palette) {
        //        m_palette ->Release();
        //        m_palette = 0;
        //    }
    
        //    gsREPORT("gsCScreen destroyed");
    
        //    return true;
        //}
    
        ////-------------------------------------------------------------
    
        //void gsCScreen::findBPP()
        //{
        //    gsDDSURFACEDESC ddsd;
        //    HRESULT hr;
    
        //    ddsd.dwSize = sizeof(ddsd);
        //    while ((hr = m_primary_surface ->Lock(NULL, &ddsd, 0, NULL)) == DDERR_WASSTILLDRAWING);
    
        //    if (hr == DD_OK) {
        //        m_bpp = ddsd.ddpfPixelFormat.dwRGBBitCount / 8;
        //        m_primary_surface ->Unlock(NULL);
        //    }
        //}
    
        ////-------------------------------------------------------------
    
        //int gsCScreen::getBytesPerPixel()
        //{
        //    return m_bpp;
        //}
    
    
        ////-------------------------------------------------------------
    
        //bool gsCScreen::loadPalette(const char *filename)
        //    {
        //        if (m_bpp != 1)
        //		return false;
    
        //gsCFile file;
    
        //if (!file.open(filename))
        //    return false;
    
        //int i;
    
        //for (i = 0; i < 24; i++)
        //    file.getByte();
    
        //for (i = 0; i < 256; i++) {
        //    m_palette_colours[i].peRed = (gsBYTE) file.getByte();
        //    m_palette_colours[i].peGreen = (gsBYTE) file.getByte();
        //    m_palette_colours[i].peBlue = (gsBYTE) file.getByte();
        //    m_palette_colours[i].peFlags = 0;
        //    file.getByte();
        //}
    
        //m_palette ->SetEntries(0, 0, 256, m_palette_colours);
    
        //file.close();
    
        //return true;
        //}
    
        */

    //-------------------------------------------------------------
}

export = gsCScreen;