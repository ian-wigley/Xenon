//-------------------------------------------------------------
//
// Class:	CBossMouth
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CBoss
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

gsCRandom CBossMouth::m_random;

//-------------------------------------------------------------

CBossMouth::CBossMouth()
{
	m_mouth = this;
	m_mode = -1;
}

//-------------------------------------------------------------

CBossMouth::~CBossMouth()
{
	m_mouth = 0;
}

//-------------------------------------------------------------

bool CBossMouth::activate()
{
	if (!isActive()) {
		m_timer.start();
		m_firing_timer.reset();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

bool CBossMouth::update(Controls *controls)
{
	if (m_shield == 0) {
		explode();
		kill();
		return true;
		}

	if (m_mode != -1) {
		if (m_firing_timer.getTime() >= m_shot_delay) {

			m_firing_timer.start();

			CSpinner *s = 0;

			if (m_mode == 0) {
				s = new CSpinner;
				m_scene->addActor(s);
				s->activate();
				s->setPosition(getPosition());

				float x = -2.f + 4.f * (float) m_shots_fired / (m_shots_total - 1);

				s->setVelocity(gsCVector(x,1.f));
				s->setGrade(BULLET_STANDARD);
				}
			else if (m_mode == 1) {
				s = new CSpinner;
				m_scene->addActor(s);
				s->activate();
				s->setPosition(getPosition());

				float x = 2.f - 4.f * (float) m_shots_fired / (m_shots_total - 1);

				s->setVelocity(gsCVector(x,2.f));
				s->setGrade(BULLET_MEDIUM);
				}
			else if (m_mode == 2) {
				s = new CSpinner;
				m_scene->addActor(s);
				s->activate();
				s->setPosition(getPosition());

				float x = -2.f + 4.f * (float) m_shots_fired / (m_shots_total - 1);

				s->setVelocity(gsCVector(x,1.f));
				s->setGrade(BULLET_BEST);
				}
			else {
				s = new CSpinner;
				m_scene->addActor(s);
				s->activate();
				s->setPosition(getPosition());

				float x = 2.f - 4.f * (float) m_shots_fired / (m_shots_total - 1);

				s->setVelocity(gsCVector(x,2.f));
				s->setGrade(BULLET_BEST);
				}

			m_shots_fired++;

			if (m_shots_fired >= m_shots_total) {
				m_firing_timer.reset();
				m_mode = -1;
				}
			}
		}

	return true;
}

//-------------------------------------------------------------

void CBossMouth::trigger(int mode,int shots,float delay)
{
	m_mode = mode;
	m_shots_total = shots;
	m_shots_fired = 0;
	m_shot_delay = delay;

	m_firing_timer.start();
}

//-------------------------------------------------------------
