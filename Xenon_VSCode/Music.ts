class gsCMusic {
    music: HTMLAudioElement;

    constructor() {
    }

    //-------------------------------------------------------------

    public load(filename: string): boolean {
        this.music = <HTMLAudioElement>document.getElementById(filename);
        return !!this.music;
    }

    //-------------------------------------------------------------

}

export = gsCMusic;