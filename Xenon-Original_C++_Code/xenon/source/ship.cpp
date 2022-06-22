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

#include "game.h"

//-------------------------------------------------------------

CShip::CShip()
{
	m_weapon = 0;
	m_weapon_type = NO_WEAPON;

	m_left_clone = 0;
	m_right_clone = 0;
	m_left_wingtip = 0;
	m_right_wingtip = 0;
	m_left_engine = 0;
	m_right_engine = 0;
	m_retro_nw = 0;
	m_retro_ne = 0;
	m_retro_sw = 0;
	m_retro_se = 0;

	m_cloak_time_limit = 0.f;

	m_dive_mode = DIVE_OFF;
	m_dive_level = 0;
}

//-------------------------------------------------------------

CShip::~CShip()
{
//	CActor::~CActor();
}

//-------------------------------------------------------------

bool CShip::activate()
{
	if (!isActive()) {
		setHandling(HANDLING_NORMAL);

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

		setCloak(2.f);

		m_dive_mode = DIVE_OFF;
		m_dive_level = 0;
		}

	return CActor::activate();
}

//-------------------------------------------------------------

void CShip::explode()
{
	if (m_left_clone)
		m_left_clone->explode();
	if (m_right_clone)
		m_right_clone->explode();
	if (m_left_wingtip)
		m_left_wingtip->explode();
	if (m_right_wingtip)
		m_right_wingtip->explode();

	CActor::explode();
}

//-------------------------------------------------------------

void CShip::kill()
{
	removeUpgrades();

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

	if (m_cloak_time_limit > 0.f) {
		if (m_cloak_timer.getTime() >= m_cloak_time_limit) {
			m_cloak_timer.reset();
			m_cloak_time_limit = 0.f;
			}
		}

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

	int map_y = m_scene->getMap()->getPosition().getY();

	gsCScreen *screen = gsCApplication::getScreen();

	float minx = 0.f;
	float maxx = (float) screen->getSize().getX();
	float miny = (float) (-map_y);
	float maxy = miny + (float) screen->getSize().getY();

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

	switch (m_dive_mode) {
		case DIVE_OFF:
			if (isCloaked()) {
				if (!isCloakFlashing())
					m_sprite.setFrame(SHIP_CLOAK_OFFSET + SHIP_CENTRE_FRAME + m_roll);
				else
					m_sprite.setFrame(SHIP_CENTRE_FRAME + m_roll);
				}
			else
				m_sprite.setFrame(SHIP_CENTRE_FRAME + m_roll);
			m_dive_level = 0;
			break;

		case DIVING_DOWN:
			m_sprite.setFrame(SHIP_DIVE_OFFSET + m_dive_level);
			if (m_dive_timer.getTime() >= 0.1f) {
				m_dive_level++;
				if (m_dive_level < SHIP_DIVE_FRAMES - 1)
					m_dive_timer.start();
				else {
					m_dive_timer.start();
					m_dive_mode = DIVE_ACTIVE;
					}
				}
			break;

		case DIVE_ACTIVE:
			m_sprite.setFrame(SHIP_DIVE_OFFSET + m_dive_level);
			if (m_dive_timer.getTime() >= m_dive_time_limit) {
				m_dive_timer.start();
				m_dive_mode = DIVING_UP;
				
				CGameState::playSample(SAMPLE_DIVE_UP,getPosition().getX());
				}
			break;
		
		case DIVING_UP:
			m_sprite.setFrame(SHIP_DIVE_OFFSET + m_dive_level);
			if (m_dive_timer.getTime() >= 0.1f) {
				m_dive_level--;
				if (m_dive_level >= 0)
					m_dive_timer.start();
				else
					m_dive_mode = DIVE_OFF;
				}
			break;
		}

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
	if (m_dive_mode != DIVE_OFF)
		return;

	CActor::registerHit(energy,hitter);
}

//-------------------------------------------------------------

void CShip::onCollisionWithActor(CActor *actor)
{
	if (m_dive_mode != DIVE_OFF)
		return;

	switch (actor->getActorInfo().m_type) {
		case ACTOR_TYPE_PICKUP:
			((CPickup *) actor)->collect();
			actor->kill();
			break;
		case ACTOR_TYPE_ALIEN:
			registerHit(1,this);
			break;
		}
}

//-------------------------------------------------------------

void CShip::onCollisionWithMap(gsCMap *map,int hits)
{
	if (m_dive_mode != DIVE_OFF)
		return;

	registerHit(SHIP_MAP_HIT,this);
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
		case NO_WEAPON:
			m_weapon = 0;
			break;		
		case MISSILE_WEAPON:
			m_weapon = new CMissileWeapon;
			break;
		case HOMING_MISSILE_WEAPON:
			m_weapon = new CHomingMissileWeapon;
			break;
		case LASER_WEAPON:
			m_weapon = new CLaserWeapon;
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

void CShip::addWeapon(WeaponType type,WeaponGrade grade)
{
	switch (type) {
		case MISSILE_WEAPON:
			setWeapon(type,grade);
			break;
		case LASER_WEAPON:
			if (!m_left_clone && !m_right_clone &&
				getWeaponType() != type)
				setWeapon(type,grade);
			else {
				if (m_left_clone &&
					m_left_clone->isActive() &&
					m_left_clone->getWeaponType() != type)
					m_left_clone->setWeapon(type,grade);
				else if (m_right_clone &&
						 m_right_clone->isActive() &&
						 m_right_clone->getWeaponType() != type)
						 m_right_clone->setWeapon(type,grade);
				else if (getWeaponType() != type)
					setWeapon(type,grade);
				}
			break;
		case HOMING_MISSILE_WEAPON:
			if (!m_left_wingtip && !m_right_wingtip)
				setWeapon(type,grade);
			else {
				if (m_left_wingtip &&
					m_left_wingtip->isActive() &&
					m_left_wingtip->getWeaponType() != type)
					m_left_wingtip->setWeapon(type,grade);
				else if (m_right_wingtip &&
						 m_right_wingtip->isActive() &&
						 m_right_wingtip->getWeaponType() != type)
						 m_right_wingtip->setWeapon(type,grade);
				else if (getWeaponType() != type)
					setWeapon(type,grade);
				}
			break;
		}
}

//-------------------------------------------------------------

bool CShip::upgradeWeapon()
{
	if (m_weapon) {
		if (m_weapon->upgrade())
			return true;
		else if (m_left_wingtip || m_right_wingtip) {
			bool lup = m_left_wingtip && m_left_wingtip->upgradeWeapon();
			bool rup = m_right_wingtip && m_right_wingtip->upgradeWeapon();
			if (lup || rup)
				return true;
			}
		else if (m_left_clone || m_right_clone) {
			bool lup = m_left_clone && m_left_clone->upgradeWeapon();
			bool rup = m_right_clone && m_right_clone->upgradeWeapon();
			if (lup || rup)
				return true;
			}
		}

	return false;
}

//-------------------------------------------------------------

bool CShip::attachClone(int side)
{
	if (side <= 0 && !m_left_clone) {
		m_left_clone = new CClone;
		m_scene->addActor(m_left_clone);
		m_left_clone->activate();
		m_left_clone->setOwner(this);
		m_left_clone->setAngleRange(-45.f,-135.f);
		m_left_clone->setAngle(-90.f,true);
		return true;
		}
	else if (!m_right_clone) {
		m_right_clone = new CClone;
		m_scene->addActor(m_right_clone);
		m_right_clone->activate();
		m_right_clone->setOwner(this);
		m_right_clone->setAngleRange(45.f,135.f);
		m_right_clone->setAngle(90.f,true);
		return true;
		}

	return false;
}

//-------------------------------------------------------------

void CShip::detachClone(CClone *clone)
{
	if (m_left_clone == clone)
		m_left_clone = 0;
	if (m_right_clone == clone)
		m_right_clone = 0;
}

//-------------------------------------------------------------

bool CShip::attachWingtip(int side)
{
	if (side <= 0 && !m_left_wingtip) {
		m_left_wingtip = new CWingtip;
		m_scene->addActor(m_left_wingtip);
		m_left_wingtip->activate();
		m_left_wingtip->setOwner(this);
		m_left_wingtip->setOffset(gsCVector(-34.f,5.f));
		if (m_right_wingtip &&
			m_right_wingtip->getWeapon())
			m_left_wingtip->getWeapon()->setDirection(m_right_wingtip->getWeapon()->getDirection());
		else
			m_left_wingtip->getWeapon()->setDirection(WEAPON_FORWARD);
		return true;
		}
	else if (!m_right_wingtip) {
		m_right_wingtip = new CWingtip;
		m_scene->addActor(m_right_wingtip);
		m_right_wingtip->activate();
		m_right_wingtip->setOwner(this);
		m_right_wingtip->setOffset(gsCVector(34.f,5.f));
		if (m_left_wingtip &&
			m_left_wingtip->getWeapon())
			m_right_wingtip->getWeapon()->setDirection(m_left_wingtip->getWeapon()->getDirection());
		else
			m_right_wingtip->getWeapon()->setDirection(WEAPON_FORWARD);
		return true;
		}

	return false;
}

//-------------------------------------------------------------

void CShip::detachWingtip(CWingtip *wingtip)
{
	if (m_left_wingtip == wingtip)
		m_left_wingtip = 0;
	if (m_right_wingtip == wingtip)
		m_right_wingtip = 0;
}

//-------------------------------------------------------------

void CShip::removeUpgrades()
{
	if (m_left_clone) {
		m_left_clone->kill();
		m_left_clone = 0;
		}
	if (m_right_clone) {
		m_right_clone->kill();
		m_right_clone = 0;
		}
	if (m_left_wingtip) {
		m_left_wingtip->kill();
		m_left_wingtip = 0;
		}
	if (m_right_wingtip) {
		m_right_wingtip->kill();
		m_right_wingtip = 0;
		}
}

//-------------------------------------------------------------

void CShip::setHandling(ShipHandling handling)
{
	m_handling = handling;

	switch (handling) {
		case HANDLING_BAD:
			m_max_speed = 100.f;
			m_acceleration =  500.f;
			m_damping = 1000.f;
			break;
		case HANDLING_NORMAL:
			m_max_speed = 200.f;
			m_acceleration = 1000.f;
			m_damping = 1500.f;
			break;
		case HANDLING_GOOD:
			m_max_speed = 300.f;
			m_acceleration = 1500.f;
			m_damping = 2000.f;
			break;
		}
}

//-------------------------------------------------------------

ShipHandling CShip::getHandling()
{
	return m_handling;
}

//-------------------------------------------------------------

void CShip::setCloak(float time)
{
	m_cloak_time_limit = time;
	m_cloak_timer.start();
}

//-------------------------------------------------------------

bool CShip::isCloaked()
{
	return (m_cloak_time_limit > 0.f &&
			m_cloak_timer.getTime() < m_cloak_time_limit);
}

//-------------------------------------------------------------

bool CShip::isCloakFlashing()
{
	float time_to_go = m_cloak_time_limit - m_cloak_timer.getTime();

	if (time_to_go <= 0.f)
		return true;

	if (time_to_go >= CLOAK_FLASH_TIME)
		return false;

	return (((int) (time_to_go / CLOAK_FLASH_RATE)) & 1) == 0;
}

//-------------------------------------------------------------

void CShip::dive(float time)
{
	m_dive_time_limit = time;
	m_dive_level = 0;
	m_dive_mode = DIVING_DOWN;
	m_dive_timer.start();

	CGameState::playSample(SAMPLE_DIVE_DOWN,getPosition().getX());
}

//-------------------------------------------------------------

int CShip::getDiveLevel()
{
	return m_dive_level;
}

//-------------------------------------------------------------

float CShip::getDiveScale()
{
	return 1.f - m_dive_level * (1.f - SHIP_DIVE_SCALE) / SHIP_DIVE_FRAMES;
}


//-------------------------------------------------------------

void CShip::reverseWeapon()
{
	WeaponDirection olddir = WEAPON_FORWARD;

	if (m_left_wingtip &&
		m_left_wingtip->getWeapon())
		olddir = m_left_wingtip->getWeapon()->getDirection();
	else if (m_right_wingtip &&
			 m_right_wingtip->getWeapon())
		olddir = m_right_wingtip->getWeapon()->getDirection();

	WeaponDirection newdir = olddir == WEAPON_FORWARD ? WEAPON_REVERSE : WEAPON_FORWARD;

	if (m_left_wingtip &&
		m_left_wingtip->getWeapon())
		m_left_wingtip->getWeapon()->setDirection(newdir);
	if (m_right_wingtip &&
		m_right_wingtip->getWeapon())
		m_right_wingtip->getWeapon()->setDirection(newdir);
}

//-------------------------------------------------------------
