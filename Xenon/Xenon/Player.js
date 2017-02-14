define(["require", "exports"], function (require, exports) {
    "use strict";
    var CPlayer = (function () {
        //gsCVector m_checkpoint;
        //int m_extra_life_scores[];
        ////-------------------------------------------------------------
        //int m_extra_life_scores[] = {
        //    5000000,
        //    10000000,
        //    15000000,
        //    20000000,
        //    0
        //};
        //-------------------------------------------------------------
        function CPlayer() {
            this.INITIAL_LIVES = 3;
            this.MAX_LIVES = 10;
            this.m_lives = this.INITIAL_LIVES;
            this.m_score = 0;
            this.m_has_dive_pickup = false;
            //    m_checkpoint = gsCVector(0.f, 0.f);
        }
        //-------------------------------------------------------------
        CPlayer.prototype.getScore = function () {
            return this.m_score;
        };
        ////-------------------------------------------------------------
        //void scoreBonus(int bonus)
        //{
        //    int old_score = m_score;
        //    m_score += bonus;
        //    int * score_level = m_extra_life_scores;
        //    while (*score_level != 0) {
        //        if (old_score < *score_level &&
        //            m_score >= *score_level) {
        //            extraLife();
        //            break;
        //        }
        //        score_level++;
        //    }
        //}
        ////-------------------------------------------------------------
        CPlayer.prototype.getLives = function () {
            return this.m_lives;
        };
        return CPlayer;
    }());
    return CPlayer;
});
//# sourceMappingURL=Player.js.map