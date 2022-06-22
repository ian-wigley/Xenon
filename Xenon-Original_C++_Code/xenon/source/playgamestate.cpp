//-------------------------------------------------------------
//
// Class:	CPlayGameState
//
// Author:	John M Phillips
//
// Started:	06/05/00
//
// Base:	CGameState
//
// Derived:	None
//
//-------------------------------------------------------------

#include "game.h"

//-------------------------------------------------------------

CPlayGameState *CPlayGameState::m_instance = 0;

gsCList<CPlayer *> CPlayGameState::m_player_list;
int CPlayGameState::m_active_player = 0;
bool CPlayGameState::m_fast_forward = false;
bool CPlayGameState::m_reached_boss = false;
int CPlayGameState::m_yscroll = 0;

bool CPlayGameState::m_paused = false;

//-------------------------------------------------------------

CPlayGameState::CPlayGameState()
{
	m_ship = 0;
}

//-------------------------------------------------------------

CPlayGameState::~CPlayGameState()
{
}

//-------------------------------------------------------------

CGameState *CPlayGameState::instance()
{
	if (!m_instance)
		m_instance = new CPlayGameState;

	return m_instance;
}

//-------------------------------------------------------------

bool CPlayGameState::create()
{
	if (m_screen.getBytesPerPixel() == 1) {
		if (!m_level.load(m_level_filename,DIRECTORY_GRAPHICS8)) {
			gsREPORT("load level failed");
			return false;
			}
		}
	else {
		if (!m_level.load(m_level_filename,DIRECTORY_GRAPHICS24)) {
			gsREPORT("load level failed");
			return false;
			}
		}

	m_scene.setMap(&m_level.m_front_layer);
	m_scene.setCollisionListSize(m_screen.getSize(),gsCPoint(8,6));

	m_ship = 0;

	m_game_end_timer.reset();

	gsCPoint map_size = m_level.m_front_layer.getSizeInPixels();
	gsCVector start_position = gsCVector((float) map_size.getX() / 2.f,
										 (float) (map_size.getY() - PLAYER_START_OFFSET));
	
	for (int i = 0; i < m_number_of_players; i++) {
		CPlayer *player = new CPlayer;
		player->setCheckpoint(start_position);
		m_player_list.addItem(player);
		}

	m_active_player = 0;

	m_mode = CREATEPLAYER;

	if (m_demo_mode == DEMO_RECORD)
		m_demo_recorder.setLevel(m_level_filename);

	m_fast_forward = false;

	return true;
}

//-------------------------------------------------------------

void CPlayGameState::setLayerPositions(int ship_y)
{
	int mh = m_level.m_back_layer.getSizeInPixels().getY();

	int by = -(mh - (mh - ship_y) / 2 + PLAYER_START_OFFSET / 2 - m_screen.getSize().getY());

	m_level.m_back_layer.setPosition(gsCPoint(0,by));

	int fy = -(ship_y + PLAYER_START_OFFSET - m_screen.getSize().getY());

	m_level.m_front_layer.setPosition(gsCPoint(0,fy));
}

//-------------------------------------------------------------

void CPlayGameState::createPlayer()
{
	m_scene.killAllActors();

	m_ship = new CShip;
	m_scene.addActor(m_ship);

	m_ship->activate();

	gsCVector start_position = getPlayer()->getCheckpoint();

	m_ship->setPosition(start_position);

	m_scene.clearCheckpoint();

	setLayerPositions((int) start_position.getY());

	m_level.reset();

	m_ship->setWeapon(MISSILE_WEAPON);

#ifdef _PROFILING
	m_ship->attachClone();
	m_ship->attachClone();
	m_ship->attachWingtip();
	m_ship->attachWingtip();
	m_ship->setWeapon(MISSILE_WEAPON,WEAPON_BEST);
	m_ship->addWeapon(HOMING_MISSILE_WEAPON);
	m_ship->addWeapon(HOMING_MISSILE_WEAPON);
	m_ship->addWeapon(LASER_WEAPON);
	m_ship->addWeapon(LASER_WEAPON);
#endif

	playSample(SAMPLE_PLAYER_CREATED,m_ship->getPosition().getX());

	getPlayer()->loseLife();

	m_reached_boss = false;
}

//-------------------------------------------------------------

bool CPlayGameState::update()
{
	if (!CGameState::update())
		return false;

	gsKeyCode key = m_keyboard.getKey();

	if (m_paused) {
		if (key == gsKEY_P) {
			m_paused = false;
			gsCApplication::setPaused(false);
			}
		else
			return true;
		}
	else {
		if (key == gsKEY_P) {
			m_paused = true;
			gsCApplication::setPaused(true);
			return true;
			}
		}

	if (m_mode == CREATEPLAYER) {
		playMusic(MUSIC_GAME);
		createPlayer();
		m_game_start_timer.start();
		m_mode = PLAYERACTIVE;
		}

	Controls controls;

	getControl(controls,m_active_player);

	if (m_ship) {
		if (controls.divePressed) {
			if (getPlayer()->hasDive()) {
				m_ship->dive(3.f);
				getPlayer()->useDive();
				}
			}

		if (controls.reversePressed)
			m_ship->reverseWeapon();

		// disable firing when diving

		if (m_ship->getDiveLevel() > 0) {
			controls.fire = false;
			controls.firePressed = false;
			}
		}

	switch (m_demo_mode) {
		case DEMO_RECORD:
			m_demo_recorder.addEvent(controls);
			break;
		case DEMO_PLAYBACK:
			if (!m_demo_recorder.getEvent(controls))
				return changeState(CMainMenuState::instance());
			break;
		}

	if (Options.getOption(OPTION_BACKDROP))
		m_backdrop.draw(gsCPoint(0,0));
	else
		m_screen.clear(gsCColour(gsBLACK));

	int loop = 1;

	if (m_fast_forward)
		loop = 16;

	while (loop-- > 0) {

		//	m_starfield.move(4);
		//	m_starfield.draw();

		if (m_mode == PLAYERACTIVE)
			m_level.scanForNewActors(&m_scene);

		static even = true;		//TEMP

		even = !even;

		if (even && !m_reached_boss)
			m_level.m_back_layer.move(gsCPoint(0,1));
			
		if (m_level.m_back_layer.getPosition().getY() > 0)
			m_level.m_back_layer.setPosition(gsCPoint(0,0));

		if (!m_reached_boss) {
			if (CBossControl::isStarted()) {
				m_reached_boss = true;
				playMusic(MUSIC_BOSS);
				}
			}

		if (CBossControl::isStarted())
			m_yscroll = CBossControl::getYScroll();
		else
			m_yscroll = 1;

		m_level.m_front_layer.move(gsCPoint(0,m_yscroll));

		if (m_level.m_front_layer.getPosition().getY() > 0)
			m_level.m_front_layer.setPosition(gsCPoint(0,0));

		int sprite_hits = 0;
		int map_hits = 0;

//#ifdef _PROFILING
//	controls.firePressed = controls.fire = true;
//#endif

		m_scene.updateAllActors(&controls);
		m_level.m_back_layer.draw();
		m_scene.drawAllActors(&m_level.m_front_layer);
		m_scene.checkActorCollisions();
		m_scene.checkMapCollisions(&m_level.m_front_layer);
		m_scene.removeDeadActors();
		}

	testDebugKeys(key);

	if (key == gsKEY_ESCAPE || (key != gsKEY_NONE && m_demo_mode == DEMO_PLAYBACK)) {
		setDemoMode(DEMO_OFF);

#ifdef _PROFILING
		return false;
#else
		return changeState(CMainMenuState::instance());
#endif
		}

	displayScores();
	displayLives();
	displayEnergyBar();

	if (m_reached_boss)
		displayBossEnergyBar();

	printDebugInfo();

	if (m_demo_mode == DEMO_PLAYBACK) {
		m_medium_font.setTextCursor(gsCPoint(0,100));
		m_medium_font.justifyString("DEMONSTRATION");
		}

	switch (m_mode) {
		case PLAYERACTIVE:
			if (m_game_start_timer.getState() == gsTIMER_ACTIVE) {
				if (m_game_start_timer.getTime() < 1.f) {
					m_medium_font.setTextCursor(gsCPoint(0,232));
					if (m_number_of_players == 1)
						m_medium_font.justifyString("Get Ready");
					else {
						if (m_active_player == 0)
							m_medium_font.justifyString("Player One");
						else
							m_medium_font.justifyString("Player Two");
						}
					}
				else
					m_game_start_timer.reset();
				}

			if (m_ship->getShield() == 0) {
				m_game_end_timer.start();
				playSample(SAMPLE_PLAYER_DESTROYED,m_ship->getPosition().getX());
				m_ship->explode();
				m_ship->kill();
				m_scene.removeDeadActors();
				m_ship = 0;
				m_mode = PLAYERDEAD;
				break;
				}
			
			if (m_reached_boss && CBoss::getShield() == 0) {
				playMusic(MUSIC_OUTRO);
				m_game_end_timer.start();
				m_mode = GAMEWON;
				break;
				}

			if (m_scene.hasCheckpoint()) {
				if (m_ship->getPosition().getY() <= m_scene.getCheckpoint().getY()) {
					if (getPlayer()->getCheckpoint() != m_scene.getCheckpoint()) {
						getPlayer()->setCheckpoint(m_scene.getCheckpoint());
						m_scene.createLabel(m_scene.getCheckpoint(),"CHECKPOINT REACHED");
						playSample(SAMPLE_CHECKPOINT);
						}
					m_scene.clearCheckpoint();
					}
				}

			break;

		case PLAYERDEAD:

			stopMusic();

			m_fast_forward = false;

			if (m_game_end_timer.getTime() >= 1.f) {
				if (m_demo_mode != DEMO_OFF) {
					setDemoMode(DEMO_OFF);
					return changeState(CMainMenuState::instance());
					}

				swapPlayer();
				if (getPlayer()->getLives() > 0)
					m_mode = CREATEPLAYER;
				else
					m_mode = GAMEOVER;
				}
			break;

		case GAMEOVER:
			m_medium_font.setTextCursor(gsCPoint(0,232));
			m_medium_font.justifyString("Game Over");
			if (m_game_end_timer.getTime() >= 3.f) {
				stopSamples();

#ifdef _PROFILING
			return false;
#endif

				if (addNewScore(getPlayer()->getScore()))
					return changeState(CScoreEntryState::instance());
				else
					return changeState(CViewScoresState::instance());
				}
			break;

		case GAMEWON:

			if (m_game_end_timer.getTime() >= 3.f) {
				m_medium_font.setTextCursor(gsCPoint(0,232));
				m_medium_font.justifyString("Congratulations");
				}

			if (m_game_end_timer.getTime() >= 6.f) {
				stopSamples();

				if (addNewScore(getPlayer()->getScore()))
					return changeState(CScoreEntryState::instance());
				else
					return changeState(CViewScoresState::instance());
				}
			break;
		}

	m_screen.flip();

	if (m_sound_system.isMusicFinished() && m_mode != GAMEWON) {
		if (m_reached_boss)
			playMusic(MUSIC_BOSS);
		else
			playMusic(MUSIC_GAME);
		}

	return true;
}

//-------------------------------------------------------------

void CPlayGameState::swapPlayer()
{
	// skip if one player game

	if (m_number_of_players == 1)
		return;

	// only swap to other player if it has lives left

	int other_player = 1 - m_active_player;

	if (m_player_list[other_player]->getLives() > 0)
		m_active_player = other_player;
}

//-------------------------------------------------------------

bool CPlayGameState::destroy()
{
	m_scene.killAllActors();
	m_ship = 0;

	for (int i = 0; i < m_player_list.getSize(); i++)
		delete m_player_list[i];

	m_player_list.clear();

	return true;
}

//-------------------------------------------------------------

void CPlayGameState::displayScores()
{
	m_small_font.setTextCursor(gsCPoint(320,10));
	m_small_font.justifyString("Hi Score");

	m_small_font.setTextCursor(gsCPoint(320,20));
	m_small_font.justifyString("%010i",m_score_table.getScore(0));

	if (m_number_of_players == 1) {
		m_small_font.setTextCursor(gsCPoint(10,10));
		m_small_font.printString("Player One");

		m_medium_font.setTextCursor(gsCPoint(10,20));
		m_medium_font.printString("%010i",m_player_list[0]->getScore());
		}
	else {
		m_small_font.setTextCursor(gsCPoint(10,10));
		m_small_font.printString("Player One");

		m_small_font.setTextCursor(gsCPoint(640 - 10 - 10 * 8,10));
		m_small_font.printString("Player Two");

		if (m_active_player == 0) {
			m_medium_font.setTextCursor(gsCPoint(10,20));
			m_medium_font.printString("%010i",m_player_list[0]->getScore());
			m_small_font.setTextCursor(gsCPoint(640 - 10 - 10 * 8,20));
			m_small_font.printString("%010i",m_player_list[1]->getScore());
			}
		else {
			m_small_font.setTextCursor(gsCPoint(10,20));
			m_small_font.printString("%010i",m_player_list[0]->getScore());
			m_medium_font.setTextCursor(gsCPoint(640 - 10 - 10 * 16,20));
			m_medium_font.printString("%010i",m_player_list[1]->getScore());
			}
		}

}

//-------------------------------------------------------------

void CPlayGameState::displayLives()
{
	gsCImage *life_symbol = m_scene.getImage("PULife.bmp");

	for (int i = 0; i < getPlayer()->getLives(); i++)
		life_symbol->draw(gsCPoint(10 + i * 32,480 - 64));

	if (getPlayer()->hasDive()) {
		gsCTiledImage *dive_symbol = m_scene.getImage("PUDive.bmp");

		dive_symbol->draw(0,gsCPoint(10,480 - 104));
		}
}

//-------------------------------------------------------------

void CPlayGameState::displayEnergyBar()
{
	const int x = 10;
	const int y = 480 - 20;

	m_screen.drawRect(gsCRect(x - 1,y - 1,x + ENERGYBAR_WIDTH,y + ENERGYBAR_HEIGHT),gsCColour(gsWHITE));

	int shield = 0;

	if (m_ship)
		shield =  ENERGYBAR_WIDTH * m_ship->getShield() / m_ship->getActorInfo().m_initial_shield;

	if (shield < 0)
		shield = 0;
	if (shield > ENERGYBAR_WIDTH)
		shield = ENERGYBAR_WIDTH;

	gsCColour shield_colour;

	if (m_ship && m_ship->isCloaked())
		shield_colour = gsCColour(gsBLUE);
	else {
		if (shield < ENERGYBAR_WIDTH / 3)
			shield_colour = gsCColour(gsRED);
		else if (shield < ENERGYBAR_WIDTH * 2 / 3)
			shield_colour = gsCColour(gsYELLOW);
		else
			shield_colour = gsCColour(gsGREEN);
		}

	m_screen.drawSolidRect(gsCRect(x,y,x + shield,y + 9),shield_colour);

	for (int i = ENERGYBAR_STEP; i < ENERGYBAR_WIDTH; i += ENERGYBAR_STEP) {
		if (i <= shield) {
			m_screen.drawLine(gsCPoint(x + i,y),
							  gsCPoint(x + i,y + ENERGYBAR_HEIGHT - 1),
							  gsCColour(gsBLACK));
			}
		}
}

//-------------------------------------------------------------

void CPlayGameState::displayBossEnergyBar()
{
	const int x = 320 - 50;
	const int y = 50;

	m_small_font.setTextCursor(gsCPoint(x + 6,y - 10));
	m_small_font.printString("BOSS SHIELD");

	m_screen.drawRect(gsCRect(x - 1,y - 1,x + 100,y + 9),gsCColour(gsWHITE));

	int shield = CBoss::getShield();

	if (shield < 0)
		shield = 0;
	if (shield > 100)
		shield = 100;

	m_screen.drawSolidRect(gsCRect(x,y,x + shield,y + 9),gsCColour(gsRED));
}

//-------------------------------------------------------------

void CPlayGameState::testDebugKeys(gsKeyCode key)
{
	if (!Options.getOption(OPTION_CHEATS) ||
		!m_ship)
		return;

	switch (key) {

		case gsKEY_1:	m_ship->upgradeWeapon();									break;
		case gsKEY_2:	m_ship->addWeapon(MISSILE_WEAPON,WEAPON_MEDIUM);			break;
		case gsKEY_3:	m_ship->addWeapon(MISSILE_WEAPON,WEAPON_BEST);				break;
		case gsKEY_4:	m_ship->addWeapon(LASER_WEAPON,WEAPON_STANDARD);			break;
		case gsKEY_5:	m_ship->addWeapon(LASER_WEAPON,WEAPON_MEDIUM);				break;
		case gsKEY_6:	m_ship->addWeapon(LASER_WEAPON,WEAPON_BEST);				break;
		case gsKEY_7:	m_ship->addWeapon(HOMING_MISSILE_WEAPON,WEAPON_STANDARD);	break;

		case gsKEY_8:	m_ship->attachClone(0);	break;
		case gsKEY_9:	m_ship->attachWingtip(0);	break;
		case gsKEY_0:	m_ship->removeUpgrades();	break;

		case gsKEY_NUMPAD1:	m_ship->setHandling(HANDLING_BAD);	break;
		case gsKEY_NUMPAD2:	m_ship->setHandling(HANDLING_NORMAL);	break;
		case gsKEY_NUMPAD3:	m_ship->setHandling(HANDLING_GOOD);	break;

		case gsKEY_ADD:			getPlayer()->scoreBonus(50);	break;
		case gsKEY_MULTIPLY:	getPlayer()->extraLife();		break;

		case gsKEY_C:	m_ship->setCloak(5.f);	break;

		case gsKEY_B:	Options.toggleOption(OPTION_BACKDROP);		break;
		case gsKEY_I:	Options.toggleOption(OPTION_DEBUGINFO);		break;

		case gsKEY_X:
			{
				m_fast_forward = !m_fast_forward;
				if (m_fast_forward)
					m_ship->setCloak(999.f);
				else
					m_ship->setCloak(1.f);
				break;
			}

		}
}

//-------------------------------------------------------------

void CPlayGameState::printDebugInfo()
{
	if (!Options.getOption(OPTION_DEBUGINFO))
		return;

	m_small_font.setTextCursor(gsCPoint(640 - 128,60));
	m_small_font.printString("actors %i",m_scene.getNumberOfActors());
	m_small_font.setTextCursor(gsCPoint(640 - 128,70));
	m_small_font.printString("images %i",m_scene.getNumberOfImages());

	int totals[ACTOR_TYPE_TOTAL] = { 0 };

	for (int i = 0; i < m_scene.getNumberOfActors(); i++) {
		ActorType t = m_scene.getActor(i)->getActorInfo().m_type;
		totals[(int) t]++;
		}

	m_small_font.setTextCursor(gsCPoint(640 - 128,90));
	m_small_font.printString("ship  %i",totals[0]);
	m_small_font.setTextCursor(gsCPoint(640 - 128,100));
	m_small_font.printString("bullet  %i",totals[1]);
	m_small_font.setTextCursor(gsCPoint(640 - 128,110));
	m_small_font.printString("upgrade %i",totals[2]);
	m_small_font.setTextCursor(gsCPoint(640 - 128,120));
	m_small_font.printString("engine  %i",totals[3]);
	m_small_font.setTextCursor(gsCPoint(640 - 128,130));
	m_small_font.printString("weapon  %i",totals[4]);
	m_small_font.setTextCursor(gsCPoint(640 - 128,140));
	m_small_font.printString("pickup  %i",totals[5]);
	m_small_font.setTextCursor(gsCPoint(640 - 128,150));
	m_small_font.printString("alien   %i",totals[6]);
	m_small_font.setTextCursor(gsCPoint(640 - 128,160));
	m_small_font.printString("abullet %i",totals[7]);
	m_small_font.setTextCursor(gsCPoint(640 - 128,170));
	m_small_font.printString("label   %i",totals[8]);
	m_small_font.setTextCursor(gsCPoint(640 - 128,180));
	m_small_font.printString("effect  %i",totals[9]);
	
	m_small_font.setTextCursor(gsCPoint(640 - 24,470));
	m_small_font.printString("%i",(int) (getApplication()->getFrameRate() + 0.5f));
}	

//-------------------------------------------------------------

CPlayer *CPlayGameState::getPlayer()
{
	return m_player_list[m_active_player];
}

//-------------------------------------------------------------

bool CPlayGameState::reachedBoss()
{
	return m_reached_boss;
}

//-------------------------------------------------------------

int CPlayGameState::getYScroll()
{
	return m_yscroll;
}

//-------------------------------------------------------------
