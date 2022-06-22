//-------------------------------------------------------------
//
// Class:	CClone
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CActor
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CClone::CClone()
{
	m_min_angle = 0.f;
	m_max_angle = 0.f;
	m_current_angle = 0.f;
	m_required_angle = 0.f;
	m_engine = 0;
}

//-------------------------------------------------------------

CClone::~CClone()
{
//	CActor::~CActor();
}

//-------------------------------------------------------------

bool CClone::activate()
{
	if (!isActive()) {
		m_engine = new CCloneEngine;
		m_scene->addActor(m_engine);
		m_engine->activate();
		m_engine->setOffset(gsCVector(0.f,10.f));
		m_engine->setOwner(this);
		m_engine->setParams(gsCVector(0.f,-16.f),gsCVector(0.f,0.f),0.05f);

		m_timer.start();
		}

	return CUpgrade::activate();
}

//-------------------------------------------------------------

void CClone::kill()
{
	if (m_engine) {
		m_engine->kill();
		m_engine = 0;
		}

	CUpgrade::kill();
}

//-------------------------------------------------------------

bool CClone::update(Controls *controls)
{
	CShip *ship = (CShip *) getOwner();

	if (!ship) {
		explode();
		kill();
		return true;
		}

	if (getShield() == 0) {
		ship->detachClone(this);
		setOwner(0);
		explode();
		kill();
		return true;
		}

	if (controls->up)
		m_required_angle = m_max_angle;
	if (controls->down)
		m_required_angle = m_min_angle;

	int thrust = 0;

	if (m_current_angle != m_required_angle) {

		float delta = m_required_angle - m_current_angle;

		if (gsAbs(delta) < CLONE_ANGLE_STEP)
			m_current_angle = m_required_angle;
		else {
			if (delta > 0) {
				m_current_angle += CLONE_ANGLE_STEP;
				if (m_min_angle > m_max_angle)
					thrust = 1;
				}
			else {
				m_current_angle -= CLONE_ANGLE_STEP;
				if (m_min_angle < m_max_angle)
					thrust = 1;
				}
			}
		}

	if (m_engine)
		m_engine->applyThrust(thrust);

	m_offset = gsCVector::polar(CLONE_RADIUS,m_current_angle);

	int d = ship->getDiveLevel();

	if (d == 0) {
		m_position = ship->getPosition() + m_offset;
		if (ship->isCloaked()) {
			if (!ship->isCloakFlashing())
				m_sprite.setFrame(CLONE_CLOAK_FRAME);
			else
				m_sprite.setFrame(0);
			}
		else
			animate(ANIMATE_LOOP,0,CLONE_FRAMES);
		}
	else {
		m_position = ship->getPosition() + m_offset * ship->getDiveScale();
		m_sprite.setFrame(CLONE_DIVE_OFFSET + CLONE_DIVE_FRAMES * d / SHIP_DIVE_FRAMES);
		}

	return true;
}

//-------------------------------------------------------------

void CClone::setAngleRange(float min,float max)
{
	m_min_angle = min;
	m_max_angle = max;

	setAngle(m_min_angle,true);
}

//-------------------------------------------------------------

void CClone::setAngle(float angle,bool set)
{
	if (set)
		m_current_angle = angle;

	m_required_angle = angle;
}

//-------------------------------------------------------------

