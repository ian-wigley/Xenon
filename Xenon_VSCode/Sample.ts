class gsCSample {
    sample: HTMLAudioElement;

    constructor() {
    }

    //-------------------------------------------------------------

    public load(filename: string): boolean {
        this.sample = <HTMLAudioElement>document.getElementById(filename);
        return !!this.sample;
    }

    //-------------------------------------------------------------

}
export = gsCSample;