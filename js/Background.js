// <----------------------------------------->
// DECLARAMOS LAS CONSTANTES A SER UTILIZADAS DENTRO DE LA
// CLASE BACKGROUND
// <----------------------------------------->

//ESTA PARTE ESTABLECE EL TAMAÑO DE LA PANTALLA DE JUEGO 
//DESDE LOS DATOS DEL CANVAS
class Background {
    constructor (ctx) {
        this.ctx = ctx;

        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.x = 0;
        this.y = 0;
        
    }

    //ESTA PARTE DIBUJA LA PANTALLA
    draw () {
       if(this.isReady){
            this.ctx.drawImage(
                this.x, 
                this.y, 
                this.width, 
                this.height,
            )
        }
    }
}