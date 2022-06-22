//-------------------------------------------------------------
//
// Class:	CActor
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	None
//
// Derived:	CShip
//			CAlien
//			CBullet
//			CPickup
//
//-------------------------------------------------------------

#include "demo2.h"

//-------------------------------------------------------------

CActor::CActor()
{
	m_scene = 0;
	m_owner = 0;
	m_is_active = false;
	m_is_on_screen = false;
	m_is_hit = false;
	m_score_multiplier = 1.f;
}

//-------------------------------------------------------------

CActor::~CActor()
{
}

//-------------------------------------------------------------

bool CActor::activate()
{
	if (!m_is_active) {
	
		const ActorInfo& info = getActorInfo();

		if (info.m_filename)
			m_image = m_scene->getImage(info.m_filename);
		else
			m_image = 0;

		m_sprite.setImage(m_image);
		m_sprite.setHotspot(gsCPoint(info.m_hotspot_x,
									 info.m_hotspot_y));
		m_sprite.setActive(m_image != 0);

		m_shield = info.m_initial_shield;

		m_is_active = true;
		m_is_on_screen = false;
		m_is_hit = false;
		}

	return true;
}

//-------------------------------------------------------------

void CActor::kill()
{
	m_is_active = false;
}

//-------------------------------------------------------------

void CActor::explode()
{
}
		
//-------------------------------------------------------------

void CActor::registerHit(int energy,CActor *hitter)
{
	if (m_shield != INFINITE_SHIELD) {
		if (m_shield > 0) {
			m_shield -= energy;
			if (m_shield <= 0) {
				m_shield = 0;
				onKilled();
				}
			}

		m_is_hit = true;
		m_hit_timer.start();
		}
}

//-------------------------------------------------------------

void CActor::onKilled()
{
}

//-------------------------------------------------------------

bool CActor::draw()
{
	if (isActive() && m_image) {
		m_sprite.setPosition(gsCPoint(m_position));

		if (m_is_hit) {
			if (m_hit_timer.getTime() > ACTOR_HIT_TIME) {
				m_hit_timer.reset();
				m_is_hit = false;
				}
			}

		if (m_is_hit) {
			int level = (int) (255.f * (1.f - m_hit_timer.getTime() / ACTOR_HIT_TIME));
			m_sprite.enableFillColour(gsCColour(level,level,level));
			}
		else
			m_sprite.disableFillColour();

		bool was_on_screen = m_is_on_screen;

		m_is_on_screen = m_sprite.draw();

		if (was_on_screen && !m_is_on_screen)
			onLeavingScreen();

//		if (m_is_on_screen)
//			m_scene->addToCollisionList(this,getCollisionRect());
		}

	return true;
}

//-------------------------------------------------------------
// animate over range of frames

bool CActor::animate(AnimationMode mode,int first_frame,int num_frames)
{
	bool finished = false;

	int frame;

	if (num_frames <= 1)
		frame = 0;
	else {
		frame = (int) (m_timer.getTime() * getActorInfo().m_anim_rate);

		switch (mode) {
			case ANIMATE_LOOP:
				frame = frame % (num_frames - 1);	// cycle repeatedly
				break;
			case ANIMATE_ONESHOT:
				if (frame >= num_frames) {
					frame = num_frames - 1;			// stay on last frame
					finished = true;				// flag that we've finished
					}
				break;
			}
		}

	m_sprite.setFrame(first_frame + frame);

	return finished;
}

//-------------------------------------------------------------
// animate over entire range

bool CActor::animate(AnimationMode mode)
{
	return animate(mode,0,m_image->getNumTiles());
}

//-------------------------------------------------------------
// Convert velocity into a direction (0..num_dir-1)

int CActor::getDirection(int num_dir)
{
	if (m_velocity.length() == 0.f)
		return 0;

	float angle = m_velocity.direction();

	float step = 360.f / (float) num_dir;
	
	return ((int) ((angle - step / 2.f + 360.f) / step)) & (num_dir - 1);
}

//-------------------------------------------------------------
