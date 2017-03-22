import gsCVector = require("Vector");

class CStarfield {
    private m_star: HTMLImageElement;
    private m_position: number;
    private m_layers: number;
    private m_point: Array<gsCVector>;
    //private Color[]m_colour;
    private m_layer: Array<number>;
    private m_offset: Array<number>;
    private m_width: number;
    private m_height: number;

    constructor(star: HTMLImageElement) {
        this.m_star = star;

        this.m_position = 0;
        this.m_layers = 5;
        this.m_width = 640;
        this.m_height = 480;
        this.m_point = [];
        //m_colour = new Color[m_width];

        this.m_layer = [];
        this.m_offset = [];

        for (var x = 0; x < this.m_width; x++) {

            this.m_point.push(new gsCVector(x, 0));
            var l = Math.floor(Math.random() * this.m_layers);
            this.m_layer[x] = l;
            this.m_offset[x] = Math.floor(Math.random() * (this.m_height) * (1 << l));

            var cupper: number = 255 - 16 * x;
            var clower: number = 128 - 16 * x;

            //    m_colour[x] = new Color(rand.Next(255),
            //        rand.Next(255),
            //        rand.Next(255));
            //http://stackoverflow.com/questions/16228048/replace-a-specific-color-by-another-in-an-image-sprite
        }
    }

    //-------------------------------------------------------------

    public Update(offset: number) {
        this.m_position += offset;
    }

    //-------------------------------------------------------------

    public Draw(ctx: CanvasRenderingContext2D) {
        var range = 1 << this.m_layers;
        for (var i = 0; i < this.m_point.length; i++) {
            this.m_point[i].y = (((this.m_offset[i] + this.m_position) >> this.m_layer[i]) % this.m_height);
            ctx.drawImage(this.m_star, this.m_point[i].x, this.m_point[i].y);
        }
    }

    //-------------------------------------------------------------

}
export = CStarfield;