import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import CActorInfoList = require("ActorInfoList");
import CGameState = require("GameState");
import CPlayGameState = require("PlayGameState");
import CMainMenuState = require("MainMenuState");
import COptions = require("Options");
import CApplication = require("Application");

class Xenon {
    private m_canvas: HTMLCanvasElement;
    private m_ctx: CanvasRenderingContext2D;
    private m_interval: number = 0;
    private m_screenWidth: number = 640
    private m_screenHeight: number = 480;
    private m_starTexture: HTMLImageElement;
    private m_textures: Array<HTMLImageElement>;
    private m_font8x8: HTMLImageElement;
    private m_font16x16: HTMLImageElement;
    private m_mainMenuState: CMainMenuState;
    private m_scene: CScene;
    private m_stars: CStarfield;
    private m_listOfActors: CActorInfoList;
    private m_state: CGameState;
    private m_app: CApplication;
    private m_options: COptions;
    private m_ctrl: gsCControls = new gsCControls();
    private m_timer: gsCTimer = new gsCTimer();

    constructor() {
        this.m_timer = new gsCTimer();
    }

    //-------------------------------------------------------------

    private rect(x, y, w, h): void {
        this.m_ctx.beginPath();
        this.m_ctx.rect(x, y, w, h);
        this.m_ctx.closePath();
        this.m_ctx.fill();
        this.m_ctx.stroke();
    }

    //-------------------------------------------------------------

    private clear(): void {
        this.m_ctx.clearRect(0, 0, this.m_screenWidth, this.m_screenHeight);
    }

    //-------------------------------------------------------------

    public Run(): void {
        this.Initialize();
    }

    //-------------------------------------------------------------

    private Initialize(): void {
        this.m_canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.m_ctx = this.m_canvas.getContext("2d");

        this.AddHitListener(this.m_canvas);
        this.LoadContent();
    }

    //-------------------------------------------------------------

    private LoadContent(): void {
        this.m_listOfActors = new CActorInfoList();
        var m_fileNames = this.m_listOfActors.GetActorTextureName();

        this.m_textures = [];
        for (var i = 0; i < m_fileNames.length; i++) {
            var t: string = m_fileNames[i];
            t.toLowerCase();
            if (t != "") {
                this.m_textures.push(<HTMLImageElement>document.getElementById(m_fileNames[i]));
            }
            else {
                this.m_textures.push(null);
            }
        }

        this.m_font8x8 = <HTMLImageElement>document.getElementById("Font8x8");
        this.m_font16x16 = <HTMLImageElement>document.getElementById("font16x16");
        this.m_starTexture = <HTMLImageElement>document.getElementById("star");

        var levelImage: HTMLImageElement = <HTMLImageElement>document.getElementById("blocks");
        this.m_app = new CApplication(this.m_font8x8, this.m_ctx);
        this.m_scene = new CScene(levelImage, this.m_textures, this.m_listOfActors, this.m_app);
        this.m_stars = new CStarfield(this.m_starTexture);
        this.m_interval = setInterval(() => this.whenLoaded(), 1);
    }

    //-------------------------------------------------------------

    private whenLoaded(): void {
        if (this.m_scene.LevelLoaded()) {
            this.m_mainMenuState = new CMainMenuState(this.m_scene, this.m_stars, this.m_font8x8, this.m_font16x16, this.m_app, this.m_ctx);
            this.m_app.instance = this.m_mainMenuState;
            clearInterval(this.m_interval);
            setInterval(() => this.Update(), 13);
        }
    }

    //-------------------------------------------------------------

    AddHitListener(element: HTMLElement) {
        window.addEventListener("keydown", (event) => {
            this.onKeyPress(event);
            return null;
        });

        window.addEventListener("keyup", (event) => {
            this.onKeyUp(event);
            return null;
        });

        //window.addEventListener("touchstart", (event) => {
        //    this.onPressDown(event <TouchEvent>);
        //    return null;
        //});
    }

    //-------------------------------------------------------------

    onKeyPress(event: KeyboardEvent) {
        event.preventDefault();
        this.onKeyboardPress(event, false);
    }

    //-------------------------------------------------------------

    onKeyUp(event: KeyboardEvent) {
        event.preventDefault();
        this.onKeyboardRelease(event, false);
    }
    
    //-------------------------------------------------------------

    //onPressDown(event: TouchEvent) {
    //    event.preventDefault();
    //    this.onKeyboardRelease(event, false);
    //}


    onKeyboardPress(event: Event, touchDevice: boolean) {
        switch (((<number>(<KeyboardEvent>event).keyCode | 0))) {
            case 17:
                this.m_ctrl.fire = true;
                break;
            case 37:
                this.m_ctrl.left = true;
                break;
            case 38:
                this.m_ctrl.up = true;
                break;
            case 39:
                this.m_ctrl.right = true;
                break;
            case 40:
                this.m_ctrl.down = true;
                break;
            case 13:
                this.m_ctrl.enterPressed = true;
                this.m_ctrl.returnPressed = true;
                break;
            case 17:
                this.m_ctrl.lcontrolPressed = true;
                break;
            case 100:
                this.m_ctrl.divePressed = true;
                break;
            case 112:
                this.m_ctrl.play = true;
                break;
            case 114:
                this.m_ctrl.record = true;
                break;
            case 115:
                this.m_ctrl.reversePressed = true;
                break;
        }
    }

    //-------------------------------------------------------------

    onKeyboardRelease(event: Event, touchDevice: boolean) {
        switch (((<number>(<KeyboardEvent>event).keyCode | 0))) {
            case 17:
                this.m_ctrl.fire = false;
                break;
            case 37:
                this.m_ctrl.left = false;
                break;
            case 38:
                this.m_ctrl.up = false;
                break;
            case 39:
                this.m_ctrl.right = false;
                break;
            case 40:
                this.m_ctrl.down = false;
                break;
            case 13:
                this.m_ctrl.enterPressed = false;
                this.m_ctrl.returnPressed = false;
                break;
            case 17:
                this.m_ctrl.lcontrolPressed = false;
                break;
            case 100:
                this.m_ctrl.divePressed = false;
                break;
            case 112:
                this.m_ctrl.play = false;
                break;
            case 114:
                this.m_ctrl.record = false;
                break;
            case 115:
                this.m_ctrl.reversePressed = false;
                break;
        }
    }

    //-------------------------------------------------------------

    private Update(): void {
        this.m_state = this.m_app.instance;
        this.Draw();
    }

    //-------------------------------------------------------------

    private Draw(): void {
        this.m_ctx.fillStyle = "black";
        this.rect(0, 0, this.m_screenWidth, this.m_screenHeight);
        this.m_ctx.beginPath();
        this.m_state.update(this.m_ctx, this.m_ctrl);
    }
}

//-------------------------------------------------------------

export = Xenon;