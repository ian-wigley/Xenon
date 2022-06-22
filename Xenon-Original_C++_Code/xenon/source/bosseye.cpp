//-------------------------------------------------------------
//
// Class:	CBossEye
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CAlien
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

BossEyeState CBossEye::m_state = BOSSEYE_SHUT;

//-------------------------------------------------------------

CBossEye::CBossEye()
{
	m_eye_number = 0;
	m_state = BOSSEYE_SHUT;
}

//-------------------------------------------------------------

CBossEye::~CBossEye()
{
}

//-------------------------------------------------------------

bool CBossEye::activate()
{
	if (!isActive())
		m_timer.start();

	return CActor::activate();
}

//-------------------------------------------------------------

void CBossEye::kill()
{
	CExplosion *x = new CBigExplosion;
	m_scene->addActor(x);
	x->setPosition(getPosition());
	x->activate();

	m_active_eyes--;

	CActor::kill();
}

//-------------------------------------------------------------

void CBossEye::registerHit(int energy,CActor *hitter)
{
	if (m_state == BOSSEYE_OPEN)
		CActor::registerHit(energy,hitter);
}

//-------------------------------------------------------------

bool CBossEye::update(Controls *controls)
{
	if (m_state != BOSSEYE_OPEN)
		m_is_hit = false;

	if (m_shield == 0) {
		explode();
		kill();
		return true;
		}

	m_sprite.setFrame(m_eye_number + (int) m_state * BOSSEYE_TOTAL);

	return true;
}

//-------------------------------------------------------------

void CBossEye::setEyeNumber(int eye_number)
{
	m_eye_number = eye_number;
}

//-------------------------------------------------------------

void CBossEye::setState(BossEyeState state)
{
	m_state = state;
}

//-------------------------------------------------------------
