import CActor = require("Actor");
import enums = require("Enums");

export = Pickups;
module Pickups {

    export class CPickup extends CActor {

        CLOAK_TIME: number = 5.0;			// total length of cloaking

        constructor() {
            super();
        }

        //public update(controls: Controls, gametime: GameTime) {
        //    this.gameTime = gametime;
        //    animate(AnimationMode.ANIMATE_LOOP);
        //    return true;
        //}

        ////activate() {
        ////    //CGameState::playSample(SAMPLE_BIG_EXPLOSION,getPosition().getX());
        ////    return super.activate();
        ////}
    }
    //export = CPickup;



    //-------------------------------------------------------------

    export class CClonePickup extends CPickup {


        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_CLONE_PICKUP);
        }

        //    public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_CLONE_PICKUP);
        //}

        //    public void collect()
        //{
        //}

        ////public override bool update(Controls controls, GameTime gameTime)
        ////{
        ////    animate(AnimationMode.ANIMATE_LOOP);
        ////    return true;
        ////}
    }
    //export = CClonePickup;

    //-------------------------------------------------------------

    export class CDivePickup extends CPickup {


        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_DIVE_PICKUP);
        }



        //    public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_DIVE_PICKUP);
        //}

        //void collect()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CHomingMissilePickup extends CPickup {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMING_MISSILE_PICKUP);
        }


        //    public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_HOMING_MISSILE_PICKUP);
        //}

        //void collect()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CCloakPickup extends CPickup {


        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_CLOAK_PICKUP);
        }

        //    public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_CLOAK_PICKUP);
        //}

        //void collect()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CLaserPickup extends CPickup {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_LASER_PICKUP);
        }



        //    public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_LASER_PICKUP);
        //}

        //void collect()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CScorePickup extends CPickup {


        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SCORE_PICKUP);
        }




        //    public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_SCORE_PICKUP);
        //}

        //void collect()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CShieldPickup extends CPickup {


        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SHIELD_PICKUP);
        }

        //    public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_SHIELD_PICKUP);
        //}

        //void collect()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CSpeedPickup extends CPickup {


        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SPEED_PICKUP);
        }


        //    public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_SPEED_PICKUP);
        //}

        //void collect()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CWeaponPickup extends CPickup {


        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_WEAPON_PICKUP);
        }


        //    public getActorInfo(): ActorInfo {
        ////    m_actorInfo = m_scene.GetlistOfActors();
        ////    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_WEAPON_PICKUP);
        ////}

        //void collect()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CWingtipPickup extends CPickup {
        WINGTIP_FRAMES: number = 8;


        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_WINGTIP_PICKUP);
        }

        //    public override ActorInfo getActorInfo()
        //{
        //    m_actorInfo = m_scene.GetlistOfActors();
        //    return m_actorInfo.GetActorInfoListItem((int)ActorInfoType.INFO_WINGTIP_PICKUP);
        //}

        //void collect()
        //{
        //    //CShip *ship = m_scene->findShip();

        //    //if (!ship)
        //    //    return;

        //    //m_scene->createLabel(getPosition(),"WINGTIP");

        //    //if (getPosition().getX() <= ship->getPosition().getX())
        //    //    ship->attachWingtip(-1);
        //    //else
        //    //    ship->attachWingtip(1);

        //    //CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
        //}

        //    public override bool update(Controls controls, GameTime gametime)
        //{
        //    this.gameTime = gametime;
        //    animate(AnimationMode.ANIMATE_LOOP, 0, WINGTIP_FRAMES);

        //    return true;
        //}
    }

    //-------------------------------------------------------------
}