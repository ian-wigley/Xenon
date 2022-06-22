//-------------------------------------------------------------
//
// Class:	CPickup
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

bool CPickup::activate()
{
	if (!isActive())
		m_timer.start();

	return CActor::activate();
}

//-------------------------------------------------------------

bool CPickup::update(Controls *controls)
{
	animate(ANIMATE_LOOP);

	return true;
}

//-------------------------------------------------------------

void CPickup::onLeavingScreen()
{
	kill();
}

//-------------------------------------------------------------

void CClonePickup::collect()
{
	CShip *ship = m_scene->findShip();

	if (!ship)
		return;

	m_scene->createLabel(getPosition(),"CLONE");

	if (getPosition().getX() <= ship->getPosition().getX())
		ship->attachClone(-1);
	else
		ship->attachClone(1);

	CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
}

//-------------------------------------------------------------

bool CClonePickup::update(Controls *controls)
{
	animate(ANIMATE_LOOP,0,CLONE_FRAMES);

	return true;
}

//-------------------------------------------------------------

void CDivePickup::collect()
{
	CShip *ship = m_scene->findShip();

	if (!ship)
		return;

	m_scene->createLabel(getPosition(),"DIVE");

	CPlayGameState::getPlayer()->diveBonus();

	CGameState::playSample(SAMPLE_BONUS,getPosition().getX());
}

//-------------------------------------------------------------

void CHomingMissilePickup::collect()
{
	CShip *ship = m_scene->findShip();

	if (!ship)
		return;

	m_scene->createLabel(getPosition(),"HOMING MISSILE");

	ship->addWeapon(HOMING_MISSILE_WEAPON);

	CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CCloakPickup::collect()
{
	CShip *ship = m_scene->findShip();

	if (!ship)
		return;

	m_scene->createLabel(getPosition(),"CLOAK");

	ship->setCloak(CLOAK_TIME);

	CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CLaserPickup::collect()
{
	CShip *ship = m_scene->findShip();

	if (!ship)
		return;

	m_scene->createLabel(getPosition(),"LASER");

	ship->addWeapon(LASER_WEAPON);

	CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CScorePickup::collect()
{
	CShip *ship = m_scene->findShip();

	if (!ship)
		return;

	m_scene->createLabel(getPosition(),getActorInfo().m_kill_bonus);

	CPlayGameState::getPlayer()->scoreBonus(getActorInfo().m_kill_bonus);

	CGameState::playSample(SAMPLE_BONUS,getPosition().getX());
}

//-------------------------------------------------------------

void CShieldPickup::collect()
{
	CShip *ship = m_scene->findShip();

	if (!ship)
		return;

	m_scene->createLabel(getPosition(),"SHIELD UP");

	int max = ship->getActorInfo().m_initial_shield;
	
	int new_shield = ship->getShield() +  max / 2;

	if (new_shield > max)
		new_shield = max;

	ship->setShield(new_shield);

	CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CSpeedPickup::collect()
{
	CShip *ship = m_scene->findShip();

	if (!ship)
		return;

	switch (ship->getHandling()) {
		case HANDLING_BAD:
			ship->setHandling(HANDLING_NORMAL);
			m_scene->createLabel(getPosition(),"SPEED UP");
			break;
		case HANDLING_NORMAL:
			ship->setHandling(HANDLING_GOOD);
			m_scene->createLabel(getPosition(),"SPEED UP");
			break;
		}

	CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CWeaponPickup::collect()
{
	CShip *ship = m_scene->findShip();

	if (!ship)
		return;

	if (ship->upgradeWeapon())
		m_scene->createLabel(getPosition(),"WEAPON UP");
	else
		m_scene->createLabel(getPosition(),"WEAPON FULL");

	CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CWingtipPickup::collect()
{
	CShip *ship = m_scene->findShip();

	if (!ship)
		return;

	m_scene->createLabel(getPosition(),"WINGTIP");

	if (getPosition().getX() <= ship->getPosition().getX())
		ship->attachWingtip(-1);
	else
		ship->attachWingtip(1);

	CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
}

//-------------------------------------------------------------

bool CWingtipPickup::update(Controls *controls)
{
	animate(ANIMATE_LOOP,0,WINGTIP_FRAMES);

	return true;
}

//-------------------------------------------------------------

