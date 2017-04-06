import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CAlien = require("Alien");
import enums = require("Enums");
import gsCVector = require("Vector");
import CExplosion = require("Explosion");
import CSmallExplosion = require("SmallExplosion");
import CMediumExplosion = require("MediumExplosion");
import CBigExplosion = require("BigExplosion");
import gsCPoint = require("Point");
import CDustEffect = require("DustEffect");
import CStandardDustEffect = require("StandardDustEffect");
import CHighDensityDustEffect = require("HighDensityDustEffect");

export = Asteroid;
module Asteroid {

    export class CAsteroid extends CAlien {

        constructor() { /// Need the gamestate & Options ref's
            super();
            this.m_name = "Asteroid";
        }

        public activate(): boolean {
            if (!this.isActive()) {
                this.m_timer.start();
            }
            return super.activate();
        }

        public update(controls: gsCControls, gameTime: gsCTimer): boolean {

            this.gameTime = gameTime;
            if (this.m_shield == 0) {
                this.fragment();
                return true;
            }

            this.m_position.plusEquals(this.m_velocity);
            this.animate(enums.AnimationMode.ANIMATE_LOOP);
            return true;
        }

        public fragment(): void {
        }


        public explode() {

            var x: CExplosion = null;

            if (this.m_image != null) {
                var size: gsCPoint = this.m_image.getTileSize();
                var area = size.X * size.Y;

                if (area <= 32 * 32) {
                    x = new CSmallExplosion();
                }
                else if (area <= 64 * 64) {
                    x = new CMediumExplosion();
                }
                else {
                    x = new CBigExplosion();
                }

                this.m_scene.addActor(x);
                x.setPosition(this.getPosition());
                x.activate();
            }
        }
    }

    //-------------------------------------------------------------

    export class CSmallStandardAsteroid extends CAsteroid {

        m_name = "SmallStandardAsteroid";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SMALL_STANDARD_ASTEROID);
        }

        public fragment(): void {
            super.explode();
            this.kill();
            //CGameState::playSample(SAMPLE_ASTEROID_BREAKUP,getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CSmallHighDensityAsteroid extends CAsteroid {

        m_name = "SmallHighDensityAsteroid";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SMALL_HIGHDENSITY_ASTEROID);
        }

        public fragment(): void {
            super.explode();
            this.kill();
            //CGameState::playSample(SAMPLE_ASTEROID_BREAKUP,getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CSmallIndestructibleAsteroid extends CAsteroid {

        m_name = "CSmallIndestructibleAsteroid";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SMALL_INDESTRUCTIBLE_ASTEROID);
        }

        public fragment(): void {
        }
    }

    //-------------------------------------------------------------

    export class CMediumStandardAsteroid extends CAsteroid {

        m_name = "MediumStandardAsteroid";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MEDIUM_STANDARD_ASTEROID);
        }

        public fragment(): void {
            var child1: CAsteroid = new CSmallStandardAsteroid();
            this.m_scene.addActor(child1);
            child1.activate();
            child1.setPosition(this.getPosition());
            child1.setVelocity(new gsCVector(-1.0, 1.0));
            child1.increaseScoreMultiplier(0.5);

            var child2: CAsteroid = new CSmallStandardAsteroid();
            this.m_scene.addActor(child2);
            child2.activate();
            child2.setPosition(this.getPosition());
            child2.setVelocity(new gsCVector(1.0, 1.0));
            child2.increaseScoreMultiplier(0.5);

            //if (Options.getOption(OPTION_PARTICLEFX))
            //{
            var de: CDustEffect = new CStandardDustEffect();
            this.m_scene.addActor(de);
            de.activate();
            de.setOwner(null);
            de.setPosition(this.getPosition());
            de.setVelocity(new gsCVector(0.0, 0.0));
            de.setLifetime(0.5);
            //}

            this.kill();
        }
    }

    //-------------------------------------------------------------

    export class CMediumHighDensityAsteroid extends CAsteroid {

        m_name = "MediumHighDensityAsteroid";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MEDIUM_HIGHDENSITY_ASTEROID);
        }

        public fragment(): void {
            var child1: CAsteroid = new CSmallHighDensityAsteroid();
            this.m_scene.addActor(child1);
            child1.activate();
            child1.setPosition(this.getPosition());
            child1.setVelocity(new gsCVector(-1.0, 1.0));
            child1.increaseScoreMultiplier(0.5);

            var child2: CAsteroid = new CSmallHighDensityAsteroid();
            this.m_scene.addActor(child2);
            child2.activate();
            child2.setPosition(this.getPosition());
            child2.setVelocity(new gsCVector(1.0, 1.0));
            child2.increaseScoreMultiplier(0.5);

            //if (Options.getOption(OPTION_PARTICLEFX)) {
            var de: CDustEffect = new CHighDensityDustEffect();
            this.m_scene.addActor(de);
            de.activate();
            de.setOwner(null);
            de.setPosition(this.getPosition());
            de.setVelocity(new gsCVector(0.0, 0.0));
            de.setLifetime(0.5);
            //}

            this.kill();
            //CGameState::playSample(SAMPLE_ASTEROID_BREAKUP, getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CMediumIndestructibleAsteroid extends CAsteroid {

        m_name = "MediumIndestructibleAsteroid";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_MEDIUM_INDESTRUCTIBLE_ASTEROID);
        }

        public fragment(): void {
        }
    }

    //-------------------------------------------------------------

    export class CBigStandardAsteroid extends CAsteroid {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BIG_STANDARD_ASTEROID);
        }

        public fragment(): void {
            var child1: CAsteroid = new CMediumStandardAsteroid();
            this.m_scene.addActor(child1);
            child1.activate();
            child1.setPosition(this.getPosition());
            child1.setVelocity(new gsCVector(-1.0, 1.0));
            child1.increaseScoreMultiplier(0.5);

            var child2: CAsteroid = new CMediumStandardAsteroid();
            this.m_scene.addActor(child2);
            child2.activate();
            child2.setPosition(this.getPosition());
            child2.setVelocity(new gsCVector(0.0, 1.3));
            child2.increaseScoreMultiplier(0.5);

            var child3: CAsteroid = new CMediumStandardAsteroid();
            this.m_scene.addActor(child3);
            child3.activate();
            child3.setPosition(this.getPosition());
            child3.setVelocity(new gsCVector(1.0, 1.0));
            child3.increaseScoreMultiplier(0.5);

            //if (Options.getOption(OPTION_PARTICLEFX)) {
            var de: CDustEffect = new CStandardDustEffect();
            this.m_scene.addActor(de);
            de.activate();
            de.setOwner(null);
            de.setPosition(this.getPosition());
            de.setVelocity(new gsCVector(0.0, 0.0));
            de.setLifetime(0.5);
            //}

            this.kill();
            //CGameState::playSample(SAMPLE_ASTEROID_BREAKUP, getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CBigHighDensityAsteroid extends CAsteroid {

        m_name = "BigHighDensityAsteroid";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BIG_HIGHDENSITY_ASTEROID);
        }

        public fragment(): void {
            var child1: CAsteroid = new CMediumHighDensityAsteroid();
            this.m_scene.addActor(child1);
            child1.activate();
            child1.setPosition(this.getPosition());
            child1.setVelocity(new gsCVector(-1.0, 1.0));
            child1.increaseScoreMultiplier(0.50);

            var child2: CAsteroid = new CMediumHighDensityAsteroid();
            this.m_scene.addActor(child2);
            child2.activate();
            child2.setPosition(this.getPosition());
            child2.setVelocity(new gsCVector(0.0, 1.3));
            child2.increaseScoreMultiplier(0.5);

            var child3: CAsteroid = new CMediumHighDensityAsteroid();
            this.m_scene.addActor(child3);
            child3.activate();
            child3.setPosition(this.getPosition());
            child3.setVelocity(new gsCVector(1.0, 1.0));
            child3.increaseScoreMultiplier(0.5);

            //if (Options.getOption(OPTION_PARTICLEFX)) {
            var de: CDustEffect = new CHighDensityDustEffect();
            this.m_scene.addActor(de);
            de.activate();
            de.setOwner(null);
            de.setPosition(this.getPosition());
            de.setVelocity(new gsCVector(0.0, 0.0));
            de.setLifetime(0.5);
            //}

            this.kill();
            //CGameState::playSample(SAMPLE_ASTEROID_BREAKUP, getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CBigIndestructibleAsteroid extends CAsteroid {

        m_name = "BigIndestructibleAsteroid";

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_BIG_INDESTRUCTIBLE_ASTEROID);
        }

        public fragment(): void {
        }
    }

    //-------------------------------------------------------------
}