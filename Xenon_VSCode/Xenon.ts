﻿import gsCControls = require("Controls");
import CScene = require("Scene");
import CStarfield = require("Starfield");
import CActorInfoList = require("ActorInfoList");
import CGameState = require("GameState");
import CMainMenuState = require("MainMenuState");
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
    private m_ctrl: gsCControls = new gsCControls();

    constructor() {
        this.m_ctrl = new gsCControls();
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

        m_fileNames.forEach(fileName => {
            if (fileName != "") {
                this.m_textures.push(<HTMLImageElement>document.getElementById(fileName));
            }
            else {
                this.m_textures.push(null);
            }
        });

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
            this.Update();
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

    onKeyboardPress(event: KeyboardEvent, touchDevice: boolean) {
        switch (event.key) {
            case "Control":
                this.m_ctrl.fire = true;
                break;
            case "ArrowLeft":
                this.m_ctrl.left = true;
                break;
            case "ArrowUp":
                this.m_ctrl.up = true;
                break;
            case "ArrowRight":
                this.m_ctrl.right = true;
                break;
            case "ArrowDown":
                this.m_ctrl.down = true;
                break;
            case "Enter":
                this.m_ctrl.enterPressed = true;
                this.m_ctrl.returnPressed = true;
                break;
            case "d":
                this.m_ctrl.divePressed = true;
                break;
            case "p":
                this.m_ctrl.play = true;
                break;
            case "r":
                this.m_ctrl.record = true;
                break;
            case "s":
                this.m_ctrl.reversePressed = true;
                break;
        }
    }

    //-------------------------------------------------------------

    onKeyboardRelease(event: KeyboardEvent, touchDevice: boolean) {
        switch (event.key) {
            case "Control":
                this.m_ctrl.fire = false;
                break;
            case "ArrowLeft":
                this.m_ctrl.left = false;
                break;
            case "ArrowUp":
                this.m_ctrl.up = false;
                break;
            case "ArrowRight":
                this.m_ctrl.right = false;
                break;
            case "ArrowDown":
                this.m_ctrl.down = false;
                break;
            case "Enter":
                this.m_ctrl.enterPressed = false;
                this.m_ctrl.returnPressed = false;
                break;
            case "d":
                this.m_ctrl.divePressed = false;
                break;
            case "p":
                this.m_ctrl.play = false;
                break;
            case "r":
                this.m_ctrl.record = false;
                break;
            case "s":
                this.m_ctrl.reversePressed = false;
                break;
        }
    }

    //-------------------------------------------------------------

    private Update(): void {
        this.m_state = this.m_app.instance;
        this.Draw();
        requestAnimationFrame(this.Update.bind(this));
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