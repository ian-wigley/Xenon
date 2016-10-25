class CLevel {






    public getMapFrontLayer() {
    }
    public getMapBackLayer() {
    }
    public reset() {
        //m_boss_active = false;

        //m_scan_y = (int)(-m_front_layer.getPosition().Y - 1 + 480) / m_image.getTileSize().Y;	//TEMP

        // hide special tiles
        // unhide everything else

        //        for (int x = 0; x < m_front_layer.getSize().X; x++)
        //        {
        //            for (int y = 0; y < m_front_layer.getSize().Y; y++)
        //            {
        //                gsCMapTile mt = m_front_layer.getMapTile(new Point(x, y));
        //                switch (mt.getUserData(0))
        //                {
        //                    case (byte)TileId.ID_PICKUP:
        //                    case (byte)TileId.ID_ALIEN:
        //                    case (byte)TileId.ID_CHECKPOINT:
        //                    case (byte)TileId.ID_WARP_START:
        //                    case (byte)TileId.ID_WARP_END:
        //                    case (byte)TileId.ID_BOSS_CONTROL:
        //                        mt.setHidden(true);
        //                        break;
        //                    case (byte)TileId.ID_DESTROYABLE_TILE:
        //                        mt.setHidden(false);
        //        mt.setUserData(3, 0);	// reset hit count
        //                        break;
        //                    default:
        //        mt.setHidden(false);
        //        break;
        //    }
        //}
        //        }
    }

}

export = CLevel;