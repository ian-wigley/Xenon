import CActor = require("Actor");
import enums = require("Enums");

class CBullet extends CActor {
    m_grade: enums.BulletGrade;

    public setGrade(grade: enums.BulletGrade = enums.BulletGrade.BULLET_STANDARD) {
        this.m_grade = grade;
    }
}

export = CBullet;