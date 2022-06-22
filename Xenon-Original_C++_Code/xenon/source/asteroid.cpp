//-------------------------------------------------------------
//
// Class:	CAsteroid
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CAlien
//
// Derived:	CSmallAsteroid
//			CMediumAsteroid
//			CBigAsteroid
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CAsteroid::CAsteroid()
{
}

//-------------------------------------------------------------

CAsteroid::~CAsteroid()
{
//	CActor::~CActor();
}

//-------------------------------------------------------------

bool CAsteroid::activate()
{
	if (!isActive())
		m_timer.start();

	return CActor::activate();
}

//-------------------------------------------------------------

bool CAsteroid::update(Controls *controls)
{
	if (m_shield == 0) {
		fragment();
		return true;
		}

	m_position += m_velocity;

	animate(ANIMATE_LOOP);

	return true;
}

//-------------------------------------------------------------

void CSmallStandardAsteroid::fragment()
{
	explode();
	kill();
	CGameState::playSample(SAMPLE_ASTEROID_BREAKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CSmallHighDensityAsteroid::fragment()
{
	explode();
	kill();
	CGameState::playSample(SAMPLE_ASTEROID_BREAKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CSmallIndestructibleAsteroid::fragment()
{
}

//-------------------------------------------------------------

void CMediumStandardAsteroid::fragment()
{
	CAsteroid *child1 = new CSmallStandardAsteroid();
	m_scene->addActor(child1);
	child1->activate();
	child1->setPosition(getPosition());
	child1->setVelocity(gsCVector(-1.f,1.f));
	child1->increaseScoreMultiplier(0.5f);

	CAsteroid *child2 = new CSmallStandardAsteroid();
	m_scene->addActor(child2);
	child2->activate();
	child2->setPosition(getPosition());
	child2->setVelocity(gsCVector(1.f,1.f));
	child2->increaseScoreMultiplier(0.5f);

	if (Options.getOption(OPTION_PARTICLEFX)) {
		CDustEffect *de = new CStandardDustEffect();
		m_scene->addActor(de);
		de->activate();
		de->setOwner(0);
		de->setPosition(getPosition());
		de->setVelocity(gsCVector(0.f,0.f));
		de->setLifetime(0.5f);
		}

	kill();
	CGameState::playSample(SAMPLE_ASTEROID_BREAKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CMediumHighDensityAsteroid::fragment()
{
	CAsteroid *child1 = new CSmallHighDensityAsteroid();
	m_scene->addActor(child1);
	child1->activate();
	child1->setPosition(getPosition());
	child1->setVelocity(gsCVector(-1.f,1.f));
	child1->increaseScoreMultiplier(0.5f);

	CAsteroid *child2 = new CSmallHighDensityAsteroid();
	m_scene->addActor(child2);
	child2->activate();
	child2->setPosition(getPosition());
	child2->setVelocity(gsCVector(1.f,1.f));
	child2->increaseScoreMultiplier(0.5f);

	if (Options.getOption(OPTION_PARTICLEFX)) {
		CDustEffect *de = new CHighDensityDustEffect();
		m_scene->addActor(de);
		de->activate();
		de->setOwner(0);
		de->setPosition(getPosition());
		de->setVelocity(gsCVector(0.f,0.f));
		de->setLifetime(0.5f);
		}

	kill();
	CGameState::playSample(SAMPLE_ASTEROID_BREAKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CMediumIndestructibleAsteroid::fragment()
{
}

//-------------------------------------------------------------

void CBigStandardAsteroid::fragment()
{
	CAsteroid *child1 = new CMediumStandardAsteroid();
	m_scene->addActor(child1);
	child1->activate();
	child1->setPosition(getPosition());
	child1->setVelocity(gsCVector(-1.f,1.f));
	child1->increaseScoreMultiplier(0.5f);

	CAsteroid *child2 = new CMediumStandardAsteroid();
	m_scene->addActor(child2);
	child2->activate();
	child2->setPosition(getPosition());
	child2->setVelocity(gsCVector(0.f,1.3f));
	child2->increaseScoreMultiplier(0.5f);

	CAsteroid *child3 = new CMediumStandardAsteroid();
	m_scene->addActor(child3);
	child3->activate();
	child3->setPosition(getPosition());
	child3->setVelocity(gsCVector(1.f,1.f));
	child3->increaseScoreMultiplier(0.5f);

	if (Options.getOption(OPTION_PARTICLEFX)) {
		CDustEffect *de = new CStandardDustEffect();
		m_scene->addActor(de);
		de->activate();
		de->setOwner(0);
		de->setPosition(getPosition());
		de->setVelocity(gsCVector(0.f,0.f));
		de->setLifetime(0.5f);
		}

	kill();
	CGameState::playSample(SAMPLE_ASTEROID_BREAKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CBigHighDensityAsteroid::fragment()
{
	CAsteroid *child1 = new CMediumHighDensityAsteroid();
	m_scene->addActor(child1);
	child1->activate();
	child1->setPosition(getPosition());
	child1->setVelocity(gsCVector(-1.f,1.f));
	child1->increaseScoreMultiplier(0.5f);

	CAsteroid *child2 = new CMediumHighDensityAsteroid();
	m_scene->addActor(child2);
	child2->activate();
	child2->setPosition(getPosition());
	child2->setVelocity(gsCVector(0.f,1.3f));
	child2->increaseScoreMultiplier(0.5f);

	CAsteroid *child3 = new CMediumHighDensityAsteroid();
	m_scene->addActor(child3);
	child3->activate();
	child3->setPosition(getPosition());
	child3->setVelocity(gsCVector(1.f,1.f));
	child3->increaseScoreMultiplier(0.5f);

	if (Options.getOption(OPTION_PARTICLEFX)) {
		CDustEffect *de = new CHighDensityDustEffect();
		m_scene->addActor(de);
		de->activate();
		de->setOwner(0);
		de->setPosition(getPosition());
		de->setVelocity(gsCVector(0.f,0.f));
		de->setLifetime(0.5f);
		}

	kill();
	CGameState::playSample(SAMPLE_ASTEROID_BREAKUP,getPosition().getX());
}

//-------------------------------------------------------------

void CBigIndestructibleAsteroid::fragment()
{
}

//-------------------------------------------------------------
