class CPlayer {

    INITIAL_LIVES:number = 3;
    MAX_LIVES:number = 10;

//-------------------------------------------------------------
  
    private m_lives:number;
    private m_score: number;
    private m_has_dive_pickup:boolean;

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

    constructor(){
        this.m_lives = this.INITIAL_LIVES;
        this.m_score = 0;
        this.m_has_dive_pickup = false;
    //    m_checkpoint = gsCVector(0.f, 0.f);
    }

    //-------------------------------------------------------------

    public getScore():number
    {
        return this.m_score;
    }

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

    public getLives():number
    {
        return this.m_lives;
    }

    ////-------------------------------------------------------------

    //void extraLife()
    //{
    //    if (m_lives < MAX_LIVES)
    //        m_lives++;
    //}

    ////-------------------------------------------------------------

    //void loseLife()
    //{
    //    if (m_lives > 0)
    //        m_lives--;

    //    m_has_dive_pickup = false;
    //}

    ////-------------------------------------------------------------

    //void diveBonus()
    //{
    //    m_has_dive_pickup = true;
    //}

    ////-------------------------------------------------------------

    //bool hasDive()
    //{
    //    return m_has_dive_pickup;
    //}

    ////-------------------------------------------------------------

    //void useDive()
    //{
    //    m_has_dive_pickup = false;
    //}

    ////-------------------------------------------------------------

    //void setCheckpoint(const gsCVector& checkpoint)
    //    {
    //        m_checkpoint = checkpoint;
    //}

    ////-------------------------------------------------------------

    //gsCVector getCheckpoint()
    //{
    //    return m_checkpoint;
    //}

    ////-------------------------------------------------------------

}
export = CPlayer;