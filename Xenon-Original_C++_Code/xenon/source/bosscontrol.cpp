//-------------------------------------------------------------
//
// Class:	CBossControl
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

bool CBossControl::m_is_started = false;
int CBossControl::m_yscroll = 0;

//-------------------------------------------------------------

BossScriptItem CBossControl::m_script[] = {
	{	BOSS_MOVE_DOWN,500	},
	{	BOSS_BEGIN_LOOP,0	},
	{	BOSS_STATIC,50		},
	{	BOSS_ROAR,0			},
	{	BOSS_OPEN_EYES,0	},
	{	BOSS_MOVE_UP,200	},
	{	BOSS_SNORT,0		},
	{	BOSS_TRIGGER,0		},
	{	BOSS_STATIC,50		},
	{	BOSS_TRIGGER,0		},
	{	BOSS_SHUT_EYES,0	},
	{	BOSS_MOVE_DOWN,200	},
	{	BOSS_STATIC,50		},
	{	BOSS_ROAR,0			},
	{	BOSS_OPEN_EYES,0	},
	{	BOSS_MOVE_UP,200	},
	{	BOSS_SNORT,0		},
	{	BOSS_TRIGGER,1		},
	{	BOSS_STATIC,50		},
	{	BOSS_TRIGGER,1		},
	{	BOSS_SHUT_EYES,0	},
	{	BOSS_MOVE_DOWN,200	},
	{	BOSS_STATIC,50		},
	{	BOSS_ROAR,0			},
	{	BOSS_OPEN_EYES,0	},
	{	BOSS_MOVE_UP,200	},
	{	BOSS_SNORT,0		},
	{	BOSS_TRIGGER,2		},
	{	BOSS_STATIC,50		},
	{	BOSS_TRIGGER,2		},
	{	BOSS_SHUT_EYES,0	},
	{	BOSS_MOVE_DOWN,200	},
	{	BOSS_STATIC,50		},
	{	BOSS_ROAR,0			},
	{	BOSS_OPEN_EYES,0	},
	{	BOSS_MOVE_UP,200	},
	{	BOSS_SNORT,0		},
	{	BOSS_TRIGGER,3		},
	{	BOSS_STATIC,50		},
	{	BOSS_TRIGGER,3		},
	{	BOSS_SHUT_EYES,0	},
	{	BOSS_MOVE_DOWN,200	},
	{	BOSS_END_LOOP,0		}
};

//-------------------------------------------------------------

CBossControl::CBossControl()
{
	m_is_started = false;
}

//-------------------------------------------------------------

CBossControl::~CBossControl()
{
}

//-------------------------------------------------------------

bool CBossControl::activate()
{
	if (!isActive()) {
		m_timer.start();
		m_is_started = true;
		m_yscroll = 0;
		m_script_pointer = m_loop_point = m_script;
		m_active_eyes = BOSS_EYES_TOTAL;
		interpretScript();
		}

	return CActor::activate();
}

//-------------------------------------------------------------

void CBossControl::kill()
{
	m_is_started = false;

	CActor::kill();
}

//-------------------------------------------------------------

bool CBossControl::update(Controls *controls)
{
	if (m_state == BOSS_DEAD)
		return true;

	if (m_active_eyes == 0 && m_state != BOSS_DESTROY)
		initiateDestructionSequence();

	if (m_state == BOSS_DESTROY)
		updateDestructionSequence();
	else {
		if (m_counter <= 0)
			interpretScript();

		switch (m_state) {
			case BOSS_MOVE_DOWN:
				m_yscroll = 1;
				break;
			case BOSS_STATIC:
				m_yscroll = 0;
				break;
			case BOSS_MOVE_UP:
				m_yscroll = -1;
				break;
			}

		m_counter--;
		}

	return true;
}

//-------------------------------------------------------------

void CBossControl::interpretScript()
{
	if (m_script_pointer->m_state == BOSS_BEGIN_LOOP)
		m_loop_point = ++m_script_pointer;

	if (m_script_pointer->m_state == BOSS_END_LOOP)
		m_script_pointer = m_loop_point;

	if (m_script_pointer->m_state == BOSS_TRIGGER) {
		switch (m_script_pointer->m_param) {
			case 0:
				m_mouth->trigger(0,16,0.05f);
				break;
			case 1:
				m_mouth->trigger(1,16,0.05f);
				break;
			case 2:
				m_mouth->trigger(2,16,0.05f);
				break;
			case 3:
				m_mouth->trigger(3,16,0.05f);
				break;
			}

		m_script_pointer++;
		}

	if (m_script_pointer->m_state == BOSS_ROAR) {
		CGameState::playSample(SAMPLE_ROAR);
		m_script_pointer++;
		}

	if (m_script_pointer->m_state == BOSS_SNORT) {
		CGameState::playSample(SAMPLE_SNORT);
		m_script_pointer++;
		}

	if (m_script_pointer->m_state == BOSS_OPEN_EYES) {
		CBossEye::setState(BOSSEYE_OPEN);
		m_script_pointer++;
		}

	if (m_script_pointer->m_state == BOSS_SHUT_EYES) {
		CBossEye::setState(BOSSEYE_SHUT);
		m_script_pointer++;
		}
	
	m_counter = m_script_pointer->m_param;
	m_state = m_script_pointer->m_state;

	m_script_pointer++;
}

//-------------------------------------------------------------

bool CBossControl::isStarted()
{
	return m_is_started;
}

//-------------------------------------------------------------

int CBossControl::getYScroll()
{
	return m_yscroll;
}

//-------------------------------------------------------------

void CBossControl::initiateDestructionSequence()
{
	m_state = BOSS_DESTROY;

	m_scene->findShip()->setCloak(1000.f);

	m_yscroll = 1;

	gsCVector epicentre = m_mouth->getPosition();

	gsCPoint tile_size = m_scene->getMap()->getImage()->getTileSize();

	m_tile_pos = gsCPoint(epicentre) / tile_size;

	m_size = 1;

	m_destruction_timer.start();
}

//-------------------------------------------------------------

void CBossControl::updateDestructionSequence()
{
	if (m_destruction_timer.getTime() > 0.1f) {
		m_destruction_timer.start();

		for (int x = 0; x < m_size; x++) {
			explodeTile(m_tile_pos + gsCPoint(x,0));
			explodeTile(m_tile_pos + gsCPoint(x,m_size - 1));
			explodeTile(m_tile_pos + gsCPoint(0,x));
			explodeTile(m_tile_pos + gsCPoint(m_size - 1,x));
			}

		m_tile_pos = m_tile_pos - gsCPoint(1,1);
		m_size += 2;

		if (m_size > 21)
			m_state = BOSS_DEAD;
		}
}

//-------------------------------------------------------------

void CBossControl::explodeTile(const gsCPoint& pos)
{
	gsCMap *map = m_scene->getMap();

	gsCMapTile *tile = map->getMapTile(pos);

	if (tile) {
		if (!tile->isEmpty() && !tile->isHidden()) {
			tile->setHidden();

				CBigExplosion *exp = new CBigExplosion();
				m_scene->addActor(exp);

				gsCPoint tile_size = map->getImage()->getTileSize();
				gsCPoint tile_centre = tile_size / gsCPoint(2,2);

				gsCPoint p = pos * tile_size + tile_centre;
				exp->setPosition(gsCVector((float) p.getX(),(float) p.getY()));
				exp->activate();
			}
		}
}

//-------------------------------------------------------------
