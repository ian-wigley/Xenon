import gsCControls = require("Controls");
import CUpgrade = require("Upgrade");
import enums = require("Enums");

class CWingtip extends CUpgrade {

    //-------------------------------------------------------------

    WINGTIP_FRAMES: number = 8;
    WINGTIP_DIVE_OFFSET: number = 8;
    WINGTIP_DIVE_FRAMES: number = 3;
    WINGTIP_CLOAK_FRAME: number = 11;

    //-------------------------------------------------------------

    public CWingtip() {
    }


    //-------------------------------------------------------------

    public getActorInfo() {
        return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_WINGTIP);
    }

    //-------------------------------------------------------------

    activate() {
        //if (!isActive()) {
        //    m_timer.start();
        //    }

        //return CUpgrade::activate();
        return true;
    }

    //-------------------------------------------------------------

    public update(controls: gsCControls) {
        //CShip ship = (CShip) getOwner();

        //if (!ship) {
        //    kill();
        //    return true;
        //    }

        //if (getShield() == 0) {
        //    ship->detachWingtip(this);
        //    setOwner(0);
        //    explode();
        //    kill();
        //    return true;
        //    }

        //int d = ship->getDiveLevel();

        //if (d == 0) {
        //    m_position = ship->getPosition() + m_offset;
        //    if (ship->isCloaked()) {
        //        if (!ship->isCloakFlashing())
        //            m_sprite.setFrame(WINGTIP_CLOAK_FRAME);
        //        else
        //            m_sprite.setFrame(0);
        //        }
        //    else
        //        animate(ANIMATE_LOOP,0,WINGTIP_FRAMES);
        //    }
        //else {
        //    m_position = ship->getPosition() + m_offset * ship->getDiveScale();
        //    m_sprite.setFrame(WINGTIP_DIVE_OFFSET + WINGTIP_DIVE_FRAMES * d / SHIP_DIVE_FRAMES);
        //    }

        return true;
    }

    //-------------------------------------------------------------

}
export = CWingtip;