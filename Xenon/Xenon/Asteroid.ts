import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CAlien = require("Alien");
import enums = require("Enums");

export = Asteroid;
module Asteroid {

    export class CAsteroid extends CAlien {

        constructor() {
            super();
        }

        public activate(): boolean {
            //if (!isActive()) {
            //    //m_timer.start();
            //}
            return super.activate();
            //return false;
        }

        public update(controls: gsCControls, gameTime: gsCTimer): boolean {

            //this.gameTime = gametime;
            //if (m_shield == 0) {
            //    fragment();
            //    return true;
            //}

            //m_position += m_velocity;
            //animate(AnimationMode.ANIMATE_LOOP);
            return true;
        }

        //public virtual void fragment()
        //{
        //}

    }

    //-------------------------------------------------------------

    export class CSmallStandardAsteroid extends CAsteroid {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SMALL_STANDARD_ASTEROID);
        }

        public fragment(): void {
            super.explode();
            super.kill();
            //CGameState::playSample(SAMPLE_ASTEROID_BREAKUP,getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CSmallHighDensityAsteroid extends CAsteroid {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SMALL_HIGHDENSITY_ASTEROID);
        }

        public fragment(): void {
        }
    }

    //-------------------------------------------------------------

    export class CSmallIndestructibleAsteroid extends CAsteroid {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SMALL_INDESTRUCTIBLE_ASTEROID);
        }

        public fragment(): void {
        }
    }

    //-------------------------------------------------------------

    export class CMediumStandardAsteroid extends CAsteroid {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MEDIUM_STANDARD_ASTEROID);
        }



        public fragment(): void {
            //var child1: CAsteroid  = new CSmallStandardAsteroid();
            //m_scene.addActor(child1);
            //child1.activate();
            //child1.setPosition(getPosition());
            //child1.setVelocity(new gsCVector(-1.0, 1.0));
            //child1.increaseScoreMultiplier(0.5);

            //var child2: CAsteroid = new CSmallStandardAsteroid();
            //m_scene.addActor(child2);
            //child2.activate();
            //child2.setPosition(getPosition());
            //child2.setVelocity(new gsCVector(1.0, 1.0));
            //child2.increaseScoreMultiplier(0.5);

            ////if (Options.getOption(OPTION_PARTICLEFX))
            ////{
            ////    CDustEffect de = new CStandardDustEffect();
            ////    m_scene.addActor(de);
            ////    de.activate();
            ////    de.setOwner(null);
            ////    de.setPosition(getPosition());
            ////    de.setVelocity(new gsCVector(0.0f, 0.0f));
            ////    de.setLifetime(0.5f);
            ////}

            super.kill();
        }
    }

    //-------------------------------------------------------------

    export class CMediumHighDensityAsteroid extends CAsteroid {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MEDIUM_HIGHDENSITY_ASTEROID);
        }


        //void fragment()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CMediumIndestructibleAsteroid extends CAsteroid {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MEDIUM_INDESTRUCTIBLE_ASTEROID);
        }

        //void fragment()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CBigStandardAsteroid extends CAsteroid {


        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BIG_STANDARD_ASTEROID);
        }

        //void fragment()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CBigHighDensityAsteroid extends CAsteroid {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BIG_HIGHDENSITY_ASTEROID);
        }

        //void fragment()
        //{

        //}
    }

    //-------------------------------------------------------------

    export class CBigIndestructibleAsteroid extends CAsteroid {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BIG_INDESTRUCTIBLE_ASTEROID);
        }

        //void fragment()
        //{

        //}
    }

    //-------------------------------------------------------------
}