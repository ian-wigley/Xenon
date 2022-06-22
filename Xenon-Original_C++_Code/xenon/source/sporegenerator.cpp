//-------------------------------------------------------------
//
// Class:	CSporeGenerator
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CWeapon
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CSporeGenerator::CSporeGenerator()
{
	m_spores_created = 0;
	m_spores_alive = 0;
	m_spores_killed = 0;
}

//-------------------------------------------------------------

CSporeGenerator::~CSporeGenerator()
{
//	CActor::~CActor();
}

//-------------------------------------------------------------

bool CSporeGenerator::activate()
{
	return CActor::activate();
}

//-------------------------------------------------------------

bool CSporeGenerator::update(Controls *controls)
{
	if (m_spores_created != 16) {

		// fire 2 rings of 8 spores

		m_spores_created = 0;

		CSpore *s;

		for (int ring = 0; ring < 2; ring++) {
			for (int i = 0; i < 8; i++) {
				s = new CSpore;
				m_scene->addActor(s);
				s->activate();

				float radius = 16.f + 16.f * ring;
				float angle = 45.f * i + 22.5f * ring;

				gsCVector offset(radius * gsSin(angle),radius * gsCos(angle));

				s->setPosition(getPosition() + offset);

				gsCVector d = offset;
				d.normalize();

				s->setVelocity(d * s->getActorInfo().m_speed[0]);

				s->setOwner(this);

				m_spores_created++;
				}
			}

		m_spores_alive = m_spores_created;
		m_spores_killed = 0;
		}

	return true;
}

//-------------------------------------------------------------

bool CSporeGenerator::sporeKilled(bool by_player)
{
	m_spores_alive--;

	if (by_player)
		m_spores_killed++;

	if (m_spores_killed == m_spores_created) {
		kill();
		return true;
		}

	if (m_spores_alive == 0)
		kill();

	return false;
}

//-------------------------------------------------------------

void CSporeGenerator::onLeavingScreen()
{
}

//-------------------------------------------------------------
