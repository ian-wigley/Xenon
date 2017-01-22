import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import CActorInfoList = require("ActorInfoList");
import CShip = require("Ship");
import CPlayGameState = require("PlayGameState");
import CLevel = require("Level");

class Point {
    public X: number;
    public Y: number;
}

class Xenon {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    WIDTH: number = 640;
    HEIGHT: number = 480;

    shipTexture: HTMLImageElement;
    engineTexture: HTMLImageElement;
    starTexture: HTMLImageElement;
    backgroundTexture: HTMLImageElement;
    m_textures: Array<HTMLImageElement>;

    m_gameState: CPlayGameState;
    m_ship: CShip;
    m_scene: CScene;
    m_stars: CStarfield;
    m_listOfActors: CActorInfoList;
    m_level: CLevel;

    m_screenWidth: number;
    m_screenHeight: number;

    test: boolean = false;
    delta: number = 0;
    m_ctrl: gsCControls = new gsCControls();

    wtfnum: number = 0;

    m_timer: gsCTimer = new gsCTimer();

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
        this.LoadContent();
        this.AddHitListener(this.canvas);
        setInterval(() => this.Update(), 10);
    }

   private LoadContent(): void {

       //this.m_level = new CLevel();

        //this.shipTexture = <HTMLImageElement>document.getElementById("Ship1");
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
        this.m_gameState = new CPlayGameState(this.m_ship, this.m_scene, this.m_stars);
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
        }
    }

    private Update(): void {

        this.m_gameState.update(this.ctx);


        //m_gameState.update();
        this.m_timer.update();
        this.m_stars.Update(4);
        this.m_scene.updateAllActors(this.m_ctrl, this.m_timer);
        this.Draw(10);
    }

    private Draw(gameTime: number): void {
        this.ctx.fillStyle = "black";
        this.rect(0, 0, this.WIDTH, this.HEIGHT);
        this.ctx.beginPath();
        this.ctx.drawImage(this.backgroundTexture, 0, 0);
        this.m_stars.Draw(this.ctx);
        //this.m_scene.drawAllActors(this.ctx);
        //this.gsCMap mapFrontLayer = m_scene.getMapFrontLayer();
        //this.gsCMap mapBackLayer = m_scene.getMapBackLayer();
        //this.m_scene.drawAllActors(mapFrontLayer, mapBackLayer, this.ctx);
    }
}

//-------------------------------------------------------------

export = Xenon;