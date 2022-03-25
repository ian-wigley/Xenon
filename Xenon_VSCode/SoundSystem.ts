import gsCMusic = require("Music");
import gsCSample = require("Sample");

class gsCSoundSystem {

    m_active: boolean;
    m_current_music: gsCMusic;
    m_music_list: Array<gsCMusic>;
    m_sample_list: Array<gsCSample>;

    constructor() {
        //this.m_active = true;
        this.m_current_music = null;
        this.m_music_list = [];
        this.m_sample_list = [];
    }

    //-------------------------------------------------------------

    public create(): boolean {
        if (!this.m_active) {
            //if (BASS_GetVersion() != (MAKELONG(0,8))) {
            //    gsERROR("Wrong version of BASSMOD");
            //    return false;
            //    }

            //if (!BASS_Init(-1,44100,BASS_DEVICE_NOSYNC,gsCApplication::getWindow())) {
            //    gsERROR("gsCSound::create can't initialize digital sound system");
            //    return false;
            //    }

            //BASS_Start();

            //gsREPORT("gsCSoundSystem created");

            this.m_active = true;
        }

        return true;
    }

    //-------------------------------------------------------------

    public destroy(): boolean {
        if (this.m_active) {
            this.stopMusic();
            this.stopSamples();
            //BASS_Stop();
            this.clearMusicList();
            this.clearSampleList();
            //BASS_Free();
            //gsREPORT("gsCSoundSystem destroyed");
            this.m_active = false;
        }
        return true;
    }

    //-------------------------------------------------------------

    public clearMusicList(): void {
        this.stopMusic();

        //for (int i = 0; i < m_music_list.getSize(); i++)
        //    delete m_music_list[i];

        this.m_music_list = [];
    }

    //-------------------------------------------------------------

    public getNumberOfMusics(): number {
        return this.m_music_list.length;
    }

    //-------------------------------------------------------------

    public addMusic(filename: string): boolean {
        if (this.m_active) {
            var music: gsCMusic = new gsCMusic();
            if (!music.load(filename)) {
                //    delete music;
                return false;
            }
            this.m_music_list.push(music);
            return true;
        }
        return false;
    }

    //-------------------------------------------------------------

    public playMusic(index: number): boolean {
        if (this.m_active) {
            this.stopMusic();
            if (index >= 0 && index < this.m_music_list.length) {
                var music: gsCMusic = this.m_music_list[index];
                if (music) { // && BASS_StreamPlay(music->getHandle(),TRUE,0)) {
                    this.m_current_music = music;
                    this.m_current_music.music.play();
                    return true;
                }
            }
        }
        return false;
    }

    //-------------------------------------------------------------

    public stopMusic(): void {
        if (this.m_active && this.m_current_music) {
            //BASS_ChannelStop(m_current_music->getHandle());
            this.m_current_music.music.pause();
        }
    }

    //-------------------------------------------------------------

    // Note: if music turned off this returns false
    public isMusicFinished(): boolean {
        if (this.m_active) {
            //return m_current_music && !BASS_ChannelIsActive(m_current_music ->getHandle());
            return true;
        }
        else {
            return false;
        }
    }

    //-------------------------------------------------------------

    public clearSampleList(): void {
        this.stopSamples();

        //for (int i = 0; i < m_sample_list.getSize(); i++)
        //    delete m_sample_list[i];
        this.m_sample_list = [];
    }

    //-------------------------------------------------------------

    public getNumberOfSamples(): number {
        return this.m_sample_list.length;
    }

    //-------------------------------------------------------------

    public addSample(filename: string): boolean {
        if (this.m_active) {
            var sample: gsCSample = new gsCSample();
            if (!sample.load(filename)) {
                //delete sample;
                return false;
            }
            this.m_sample_list.push(sample);
            return true;
        }
        return false;
    }

    //-------------------------------------------------------------

    public playSample(index: number, panning: number): boolean {
        if (this.m_active) {
            if (index >= 0 && index < this.m_sample_list.length) {
                if (panning < -100)
                    panning = -100;
                if (panning > 100)
                    panning = 100;

                var sample: gsCSample = this.m_sample_list[index];
                if (sample) { // && BASS_SamplePlayEx(sample->getHandle(),0,-1,50,panning,false))
                    sample.sample.play();
                    return true;
                }
            }
        }
        return false;
    }

    //-------------------------------------------------------------

    public stopSamples(): void {
        for (var i = 0; i < this.m_sample_list.length; i++){
            //    BASS_SampleStop(m_sample_list[i] ->getHandle());
            this.m_sample_list[i].sample.pause();
        }
    }

    //-------------------------------------------------------------

    public isActive(): boolean {
        return this.m_active;
    }

    //-------------------------------------------------------------

    public setVolume(music_percent: number, sample_percent: number): void {
        if (this.m_active) {
            //BASS_SetGlobalVolumes(0,sample_percent,music_percent);
        }
    }

    //-------------------------------------------------------------

}
export = gsCSoundSystem;