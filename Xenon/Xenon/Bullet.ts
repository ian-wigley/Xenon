import CActor = require("Actor");
import enums = require("Enums");
import gsCMap = require("Map");
import gsCPoint = require("Point");
import gsCMapTile = require("MapTile");
import CPlayGameState = require("PlayGameState");

class CBullet extends CActor {

    protected m_grade: enums.BulletGrade;

    constructor() {
        super();
        this.m_grade = enums.BulletGrade.BULLET_STANDARD;
        this.m_name = "bullet";
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
        this.kill();
    }

    //-------------------------------------------------------------

    public Draw(ctx: CanvasRenderingContext2D): boolean {
        if (!super.Draw(ctx)) {
            return false;
        }

        if (!this.isOnScreen()) {
            this.onLeavingScreen();
        }
        return true;
    }

    //-------------------------------------------------------------

    public onCollisionWithActor(actor: CActor): void {
        actor.registerHit(this.getActorInfo().m_energy[this.m_grade], this);
        this.kill();
    }

    //-------------------------------------------------------------

    public onCollisionWithMap(map: gsCMap, hits: number): void {
        for (var i = 0; i < hits; i++) {
            var pos: gsCPoint = map.getHitPosition(i);
            var mt: gsCMapTile = map.getMapTile(pos);
            if (mt && mt.getUserData(0) == enums.TileId.ID_DESTROYABLE_TILE) {

                var hits_required: number = mt.getUserData(1);
                var hits_taken: number = mt.getUserData(3);

                hits_taken++;

                mt.setUserData(3, hits_taken);

                if (hits_taken >= hits_required) {
                    mt.setHidden(true);

                    this.m_scene.createMapExplosion(map, pos);

                    // NOTE: don't let alien bullets score points :)
                    if (this.getActorInfo().m_type == enums.ActorType.ACTOR_TYPE_BULLET) {
                        //this.m_playGameState.getPlayer().scoreBonus(5);
                    }
                }
            }
        }

        this.kill();
    }

    //-------------------------------------------------------------

    public setGrade(grade: enums.BulletGrade) {
        this.m_grade = grade;
    }
}

export = CBullet;