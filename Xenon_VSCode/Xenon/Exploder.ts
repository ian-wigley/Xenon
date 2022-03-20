import CExplosion = require("Explosion");
import CSmallExplosion = require("SmallExplosion");
import CMediumExplosion = require("MediumExplosion");
import CBigExplosion = require("BigExplosion");
import gsCPoint = require("Point");

class CExploder {

    constructor(parent) {
        this.explode(parent);
    }

    //-------------------------------------------------------------

    private explode(parent) {

        var x: CExplosion = null;

        if (parent.m_image != null) {
            var size: gsCPoint = parent.m_image.getTileSize();
            var area = size.X * size.Y;

            if (area <= 32 * 32) {
                x = new CSmallExplosion(parent.m_playGameState);
            }
            else if (area <= 64 * 64) {
                x = new CMediumExplosion(parent.m_playGameState);
            }
            else {
                x = new CBigExplosion(parent.m_playGameState);
            }

            parent.m_scene.addActor(x);
            x.setPosition(parent.getPosition());
            x.activate();
        }
    }

    //-------------------------------------------------------------

}
export = CExploder; 