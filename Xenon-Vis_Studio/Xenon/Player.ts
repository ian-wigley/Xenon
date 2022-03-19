import gsCVector = require("Vector");

class CPlayer {

    INITIAL_LIVES: number = 3;
    MAX_LIVES: number = 10;

    //-------------------------------------------------------------

    private m_lives: number;
    private m_score: number;
    private m_has_dive_pickup: boolean;
    private m_checkpoint: gsCVector;
    private m_extra_life_scores: Array<number> = [5000000, 10000000, 15000000, 20000000, 0];

    //-------------------------------------------------------------

    constructor() {
        this.m_lives = this.INITIAL_LIVES;
        this.m_score = 0;
        this.m_has_dive_pickup = false;
        this.m_checkpoint = new gsCVector(0, 0);
    }

    //-------------------------------------------------------------

    public getScore(): number {
        return this.m_score;
    }

    //-------------------------------------------------------------

    public scoreBonus(bonus: number): void {
        var old_score: number = this.m_score;

        this.m_score += bonus;
        var score_level = this.m_extra_life_scores;

        var count: number = 0;
        while (score_level[count] != 0) {
            if (old_score < score_level[count] &&
                this.m_score >= score_level[count]) {
                this.extraLife();
                break;
            }
            count++;
        }
    }

    //-------------------------------------------------------------

    public setLives(): void {
        this.m_lives = this.INITIAL_LIVES;
    }

    //-------------------------------------------------------------

    public getLives(): number {
        return this.m_lives;
    }

    //-------------------------------------------------------------

    public extraLife(): void {
        if (this.m_lives < this.MAX_LIVES)
            this.m_lives++;
    }

    //-------------------------------------------------------------

    public loseLife(): void {
        if (this.m_lives > 0) {
            this.m_lives--;
        }
        this.m_has_dive_pickup = false;
    }

    //-------------------------------------------------------------

    public diveBonus(): void {
        this.m_has_dive_pickup = true;
    }

    //-------------------------------------------------------------

    public hasDive(): boolean {
        return this.m_has_dive_pickup;
    }

    //-------------------------------------------------------------

    public useDive(): void {
        this.m_has_dive_pickup = false;
    }

    //-------------------------------------------------------------

    public setCheckpoint(checkpoint: gsCVector): void {
        this.m_checkpoint = checkpoint;
    }

    //-------------------------------------------------------------

    public getCheckpoint(): gsCVector {
        return this.m_checkpoint;
    }

    //-------------------------------------------------------------

}
export = CPlayer;