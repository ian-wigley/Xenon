//-------------------------------------------------------------
//
// Class:	Ship
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

#include "demo2.h"

//-------------------------------------------------------------

CShip::CShip()
{
	m_weapon = 0;
	m_weapon_type = NO_WEAPON;

	m_left_engine = 0;
	m_right_engine = 0;
	m_retro_nw = 0;
	m_retro_ne = 0;
	m_retro_sw = 0;
	m_retro_se = 0;

	m_max_speed = 200.f;
	m_acceleration = 1000.f;
	m_damping = 1500.f;
}

//-------------------------------------------------------------

CShip::~CShip()
{
}

//-------------------------------------------------------------

bool CShip::activate()
{
	if (!isActive()) {
		m_roll = 0;
		setWeapon(NO_WEAPON);
		setVelocity(gsCVector(0.f,0.f));

		m_left_engine = new CShipEngine;
		m_scene->addActor(m_left_engine);
		m_left_engine->activate();
		m_left_engine->setOwner(this);
		m_left_engine->setOffset(gsCVector(-7.f,29.f));
		m_left_engine->setParams(gsCVector(0.f,-16.f),gsCVector(0.f,0.f),0.05f);

		m_right_engine = new CShipEngine;
		m_scene->addActor(m_right_engine);
		m_right_engine->activate();
		m_right_engine->setOwner(this);
		m_right_engine->setOffset(gsCVector(7.f,29.f));
		m_right_engine->setParams(gsCVector(0.f,-16.f),gsCVector(0.f,0.f),0.05f);

		m_retro_nw = new CRetroEngine;
		m_scene->addActor(m_retro_nw);
		m_retro_nw->activate();
		m_retro_nw->setOwner(this);
		m_retro_nw->setOffset(gsCVector(-30.f,-20.f));
		m_retro_nw->setDirection(RETRO_NW);
		m_retro_nw->setParams(gsCVector(12.f,12.f),gsCVector(0.f,0.f),0.05f);

		m_retro_ne = new CRetroEngine;
		m_scene->addActor(m_retro_ne);
		m_retro_ne->activate();
		m_retro_ne->setOwner(this);
		m_retro_ne->setOffset(gsCVector(30.f,-20.f));
		m_retro_ne->setDirection(RETRO_NE);
		m_retro_ne->setParams(gsCVector(-12.f,12.f),gsCVector(0.f,0.f),0.05f);

		m_retro_sw = new CRetroEngine;
		m_scene->addActor(m_retro_sw);
		m_retro_sw->activate();
		m_retro_sw->setOwner(this);
		m_retro_sw->setOffset(gsCVector(-30.f,30.f));
		m_retro_sw->setDirection(RETRO_SW);
		m_retro_sw->setParams(gsCVector(12.f,-12.f),gsCVector(0.f,0.f),0.05f);

		m_retro_se = new CRetroEngine;
		m_scene->addActor(m_retro_se);
		m_retro_se->activate();
		m_retro_se->setOwner(this);
		m_retro_se->setOffset(gsCVector(30.f,30.f));
		m_retro_se->setDirection(RETRO_SE);
		m_retro_se->setParams(gsCVector(-12.f,-12.f),gsCVector(0.f,0.f),0.05f);
		
		m_timer.reset();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

void CShip::explode()
{
	CActor::explode();
}

//-------------------------------------------------------------

void CShip::kill()
{
	if (m_left_engine) {
		m_left_engine->kill();
		m_left_engine = 0;
		}
	if (m_right_engine) {
		m_right_engine->kill();
		m_right_engine = 0;
		}
	if (m_retro_nw) {
		m_retro_nw->kill();
		m_retro_nw = 0;
		}
	if (m_retro_ne) {
		m_retro_ne->kill();
		m_retro_ne = 0;
		}
	if (m_retro_sw) {
		m_retro_sw->kill();
		m_retro_sw = 0;
		}
	if (m_retro_se) {
		m_retro_se->kill();
		m_retro_se = 0;
		}
if (m_weapon) {
		m_weapon->kill();
		m_weapon = 0;
		}
	
	CActor::kill();
}

//-------------------------------------------------------------

bool CShip::update(Controls *controls)
{
	if (m_shield == 0)
		return true;

	gsCVector thrust(0.f,0.f);

	int required_roll = 0;

	float t = gsCTimer::getDeltaTime();

	if (controls) {

		if (controls->left) {
			thrust.setX(-m_acceleration);
			required_roll = -SHIP_ROLL_FRAMES;
			}
		if (controls->right) {
			thrust.setX(m_acceleration);
			required_roll = SHIP_ROLL_FRAMES;
			}
		if (controls->up) {
			thrust.setY(-m_acceleration);
			}
		if (controls->down) {
			thrust.setY(m_acceleration);
			}

		float x = m_velocity.getX();
		
		if (thrust.getX() != 0.f) {
			x += thrust.getX() * t;
			if (x < -m_max_speed)
				x = -m_max_speed;
			if (x > m_max_speed)
				x = m_max_speed;
			}
		else {
			if (x > 0.f) {
				x -= m_damping * t;
				if (x < 0.f)
					x = 0.f;
				}
			else {
				x += m_damping * t;
				if (x > 0.f)
					x = 0.f;
				}
			}

		float y = m_velocity.getY();
		
		if (thrust.getY() != 0.f) {
			y += thrust.getY() * t;
			if (y < -m_max_speed)
				y = -m_max_speed;
			if (y > m_max_speed)
				y = m_max_speed;
			}
		else {
			if (y > 0.f) {
				y -= m_damping * t;
				if (y < 0.f)
					y = 0.f;
				}
			else {
				y += m_damping * t;
				if (y > 0.f)
					y = 0.f;
				}
			}

		m_velocity = gsCVector(x,y);
		}

	m_position += m_velocity * gsCVector(t,t);

	m_position += gsCVector(0.f,(float) -CPlayGameState::getYScroll());

	gsCScreen *screen = gsCApplication::getScreen();

	float minx = 0.f;
	float maxx = (float) screen->getSize().getX();
	float miny = (float) 0.f;
	float maxy = (float) screen->getSize().getY();

	m_position.clamp(minx + 32.f,maxx - 32.f,miny + 32.f,maxy - 32.f);

	if (m_roll == required_roll)
		m_timer.reset();
	else {
		if (m_timer.getState() == gsTIMER_RESET)
			m_timer.start();
		else {
			if (m_timer.getTime() >= 1.f / SHIP_ROLL_RATE) {
				if (required_roll < m_roll)
					m_roll--;
				else
					m_roll++;
				if (m_roll != required_roll)
					m_timer.start();
				}
			}
		}

	m_sprite.setFrame(SHIP_CENTRE_FRAME + m_roll);

	if (CPlayGameState::getYScroll() == 1) {
		if (m_left_engine)
			m_left_engine->applyThrust(thrust.getY() <= 0.f);
		if (m_right_engine)
			m_right_engine->applyThrust(thrust.getY() <= 0.f);
		}
	else {
		if (m_left_engine)
			m_left_engine->applyThrust(thrust.getY() < 0.f);
		if (m_right_engine)
			m_right_engine->applyThrust(thrust.getY() < 0.f);
		}

	if (m_retro_nw)
		m_retro_nw->applyThrust(thrust.getY() > 0.f && thrust.getX() >= 0);
	if (m_retro_ne)
		m_retro_ne->applyThrust(thrust.getY() > 0.f && thrust.getX() <= 0);

	if (m_retro_sw)
		m_retro_sw->applyThrust((thrust.getX() > 0.f && thrust.getY() <= 0) ||
								(thrust.getX() == 0.f && thrust.getY() < 0.f));
	if (m_retro_se)
		m_retro_se->applyThrust((thrust.getX() < 0.f && thrust.getY() <= 0) ||
								(thrust.getX() == 0.f && thrust.getY() < 0.f));

	return true;
}

//-------------------------------------------------------------

gsCRect CShip::getCollisionRect()
{
	gsCRect r = m_sprite.getRect();

	r.expand(-8);

	return r;
}

//-------------------------------------------------------------

void CShip::registerHit(int energy,CActor *hitter)
{
	CActor::registerHit(energy,hitter);
}

//-------------------------------------------------------------

void CShip::onCollisionWithActor(CActor *actor)
{
	switch (actor->getActorInfo().m_type) {
		case ACTOR_TYPE_ALIEN:
			registerHit(1,this);
			break;
		}
}

//-------------------------------------------------------------

void CShip::setWeapon(WeaponType type,WeaponGrade grade)
{
	if (m_weapon) {
		m_weapon->kill();
		m_weapon = 0;
		}

	m_weapon_type = type;

	switch (m_weapon_type) {
		case MISSILE_WEAPON:
			m_weapon = new CMissileWeapon;
			break;
		}

	if (m_weapon) {
		m_scene->addActor(m_weapon);
		m_weapon->activate();
		m_weapon->setOwner(this);
		m_weapon->setGrade(grade);
		}
}

//-------------------------------------------------------------

WeaponType CShip::getWeaponType()
{
	return m_weapon_type;
}

//-------------------------------------------------------------
