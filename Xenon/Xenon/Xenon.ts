import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import CActorInfoList = require("ActorInfoList");
//import CShip = require("Ship");


import CGameState = require("GameState");
import CPlayGameState = require("PlayGameState");
import CMainMenuState = require("MainMenuState");
import CLevel = require("Level");
import COptions = require("Options");


class Point {
    public X: number;
    public Y: number;
}

class Xenon {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private WIDTH: number = 640;
    private HEIGHT: number = 480;

    private introTexture: HTMLImageElement;
    private bbTexture: HTMLImageElement;
    private shipTexture: HTMLImageElement;
    private engineTexture: HTMLImageElement;
    private starTexture: HTMLImageElement;
    private backgroundTexture: HTMLImageElement;
    private m_textures: Array<HTMLImageElement>;
    private m_font8x8: HTMLImageElement;
    private m_font16x16: HTMLImageElement;

    private m_gameState: CPlayGameState;
    private m_mainMenuState: CMainMenuState;
    //private m_ship: CShip;
    private m_scene: CScene;
    private m_stars: CStarfield;
    private m_listOfActors: CActorInfoList;
    private m_level: CLevel;

    private m_screenWidth: number;
    private m_screenHeight: number;

    private test: boolean = false;
    private delta: number = 0;
    private m_ctrl: gsCControls = new gsCControls();

    private m_timer: gsCTimer = new gsCTimer();
    private m_gameOn: boolean = false; //TEMP!
    private testInterval;


    private m_state: CGameState;

    private m_options: COptions;

    constructor() {
        this.m_timer = new gsCTimer();
    }

    private rect(x, y, w, h): void {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    private clear(): void {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    }

    public Run(): void {
        this.Initialize();
    }

    private Initialize(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.AddHitListener(this.canvas);
        this.LoadContent();
        //setInterval(() => this.Update(), 10);
    }

    private LoadContent(): void {

        this.introTexture = <HTMLImageElement>document.getElementById("Xlogo");
        this.bbTexture = <HTMLImageElement>document.getElementById("bblogo");
        this.backgroundTexture = <HTMLImageElement>document.getElementById("galaxy2");
        this.engineTexture = <HTMLImageElement>document.getElementById("Burner1");
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

        var levelImage: HTMLImageElement = <HTMLImageElement>document.getElementById("blocks");

        this.m_scene = new CScene(levelImage, this.m_textures, this.m_listOfActors);
        this.starTexture = <HTMLImageElement>document.getElementById("star");
        this.m_stars = new CStarfield(this.starTexture);

        this.m_font8x8 = <HTMLImageElement>document.getElementById("Font8x8");
        this.m_font16x16 = <HTMLImageElement>document.getElementById("font16x16");

        this.testInterval = setInterval(() => this.testIfLoaded(), 10);
    }

    private testIfLoaded(): void {
        if (this.m_scene.LevelLoaded()) {
            this.m_mainMenuState = new CMainMenuState(this.m_scene, this.m_stars, this.m_font8x8, this.m_font16x16, this.ctx);
            //this.m_gameState = new CPlayGameState(this.m_scene, this.m_stars, this.m_font8x8, this.m_font16x16, this.ctx, this.m_mainMenuState, this.m_options);

            clearInterval(this.testInterval);
            setInterval(() => this.Update(), 10);
        }
    }

    AddHitListener(element: HTMLElement) {
        window.addEventListener("keydown", (event) => {
            this.onKeyPress(event);
            return null;
        });

        window.addEventListener("keyup", (event) => {
            this.onKeyUp(event);
            return null;
        });
    }

    onKeyPress(event: KeyboardEvent) {
        event.preventDefault();
        this.onKeyboardPress(event, false);
    }

    onKeyUp(event: KeyboardEvent) {
        event.preventDefault();
        this.onKeyboardRelease(event, false);
    }

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
            case 88:
                this.m_gameOn = true;
                break;
            case 13:
                this.m_ctrl.enterPressed = true;
                this.m_ctrl.returnPressed = true;
                break;
            case 17:
                this.m_ctrl.lcontrolPressed = true;
                break;

        }
    }

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
        }
    }

    private Update(): void {

        this.m_state = this.m_mainMenuState.instance();


        ////this.m_stars.Update(4);
        ////if (this.m_gameOn) {
        ////    this.m_timer.update(false);// Remove !
        //    this.m_scene.updateAllActors(this.m_ctrl, this.m_timer);
        ////}
        this.Draw(10);
    }

    private Draw(gameTime: number): void {
        this.ctx.fillStyle = "black";
        this.rect(0, 0, this.WIDTH, this.HEIGHT);
        this.ctx.beginPath();


        this.m_state.update(this.ctx, this.m_ctrl);


        //////this.ctx.drawImage(this.backgroundTexture, 0, 0);
        //////this.m_stars.Draw(this.ctx);

        //if (!this.m_gameOn) {
        //    this.m_gameState.update(this.ctx, this.m_ctrl);
        //}
        //else {
        //    ////this.ctx.drawImage(this.introTexture, 64, 10);
        //    ////this.ctx.drawImage(this.bbTexture, 10, 360);
        //    ////this.ctx.font = "20px Arial";
        //    ////this.ctx.fillStyle = "yellow";
        //    ////this.ctx.fillText("Press X to Start the game", 260, 300);
        //}
    }
}

//-------------------------------------------------------------

export = Xenon;