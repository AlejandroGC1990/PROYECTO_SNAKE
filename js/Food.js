// <----------------------------------------->
// DECLARAMOS LAS CONSTANTES A SER UTILIZADAS DENTRO DE LA
// CLASE FOOD
// <----------------------------------------->

class Food {
    // NOS DICE EN QUE CORDENADA VAMOS A PONER LA COMIDA
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        //TAMAÑO DE LA COMIDA
        this.width = 10;
        this.height = 10;
    }

    // DIBUJA LA COMIDA
    draw() {
        this.ctx.save();
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.restore();
    }
}