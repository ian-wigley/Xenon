class gsCSample {
    sample: HTMLAudioElement;

    constructor() {
    }

    //-------------------------------------------------------------

    public load(filename: string): boolean {
        this.sample = <HTMLAudioElement>document.getElementById(filename);
        if (this.sample) {
            return true;
        }
        else {
            return false;
        }
    }

    //-------------------------------------------------------------

}
export = gsCSample;