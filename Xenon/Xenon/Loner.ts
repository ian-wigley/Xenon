import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CAlien = require("Alien");

export = Loner;
module Loner {

    export class CLoner extends CAlien {

        //m_weapon: CSpinnerWeapon;

        constructor() {
            super();
        }

        //-------------------------------------------------------------

        public activate(): boolean {
            //if (!isActive()) {
            //    this.m_weapon = new CSpinnerWeapon();
            //    this.m_scene.addActor(m_weapon);
            //    this.m_weapon.activate();
            //    this.m_weapon.setOwner(this);
            //    this.m_weapon.setOffset(new gsCVector(0.0, 0.0));

            //    //m_timer.start();
            //}
            return super.activate();
            ////return CActor::activate();
        }

        //-------------------------------------------------------------

        //public kill(): void {
        //    if (m_weapon != null) {
        //        m_weapon.kill();
        //        m_weapon = null;
        //    }

        //    super.kill();
        //    //CActor::kill();
        //}

        //-------------------------------------------------------------

        //public override bool update(Controls controls, GameTime gametime) {
        //    this.gameTime = gametime;
        //    if (m_shield == 0) {
        //        super.explode();
        //        super.kill();
        //        return true;
        //    }

            //CShip ship = m_scene->findShip();

            // fire weapon towards ship

            //if (ship != null)
            //{
            //    gsCVector dir = ship->getPosition() - getPosition();
            //    dir.normalize();
            //    m_weapon->setDirection(dir);
            //}

        //    m_position += m_velocity;

        //    animate(AnimationMode.ANIMATE_LOOP);

        //    return true;
        //}

    }

    //-------------------------------------------------------------

    export class CStandardLoner extends CLoner
    {
        //public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_STANDARD_LONER);
        //}
        ////public ActorInfo getActorInfo()
        ////{
        ////    return null;//ActorInfoList[INFO_STANDARD_LONER];
        ////}
    }

    //-------------------------------------------------------------

    export class CMediumLoner extends CLoner{

        //public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_MEDIUM_LONER);
        //}
        ////public ActorInfo getActorInfo()
        ////{
        ////    return null;//ActorInfoList[INFO_MEDIUM_LONER];
        ////}
    }

    //-------------------------------------------------------------

    export class CArmouredLoner extends CLoner {
        //public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_ARMOURED_LONER);
        //}
        ////public ActorInfo getActorInfo()
        ////{
        ////    return null;//ActorInfoList[INFO_ARMOURED_LONER];
        ////}
    }

    //-------------------------------------------------------------
}