class gsCMusic {
    music: HTMLAudioElement;

    constructor() {
    }

    //-------------------------------------------------------------

    public load(filename: string): boolean {
        this.music = <HTMLAudioElement>document.getElementById(filename);
        if (this.music) {
            return true;
        }
        else {
            return false;
        }
    }

    //-------------------------------------------------------------

}
export = gsCMusic;