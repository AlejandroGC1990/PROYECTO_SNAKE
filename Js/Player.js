// <----------------------------------------->
// DECLARAMOS LAS CONSTANTES A SER UTILIZADAS DENTRO DE LA
// CLASE PLAYER
// <----------------------------------------->

class Player {
  constructor(ctx) {
    this.ctx = ctx;

    //Coordenada que ocupa la cabeza de la serpiente.
    this.x = 10;
    this.y = 10;

    //Velocidad de movimiento.
    this.speed = 3;

    //Dirección inicial de la snake.
    this.lastKey = KEY_RIGHT;

    //Espacio que ocupa la cabeza de la serpiente.
    this.width = 10;
    this.height = 10;

    //Imagen que representa la cabeza de la serpiente.
    this.img = new Image();
    this.isReady = false;
    this.img.src = "./img/head.jpg";
    this.img.onload = () => {
      this.isReady = true;
    };
    
    //El cuerpo de la serpiente es una array en el que se 
    //almacena el número cuerpos que tiene.
    this.body = [];

    //Sonido al comer.
    this.soundNiumi = new Audio('./14.PROYECTO-MÓDULO1-SNAKE/sound/food_G1U6tlb.mp3');
  }

  //DIBUJA LA CABEZA DE LA SERPIENTE Y EL CUERPO
  draw() {
    if (this.isReady) {
      this.ctx.drawImage(
        this.img, 
        this.x, 
        this.y, 
        this.width, 
        this.height
      );
      
      //Con esta función se pintan las vértebras.
      this.body.forEach(vertebra => {
        this.ctx.fillRect(
          vertebra[0], 
          vertebra[1], 
          this.width, 
          this.height
          );
      })
    }
    
  }

  //AÑADE VÉRTEBRAS AL INICIO DEL CUERPO DE LA SERPIENTE.
  addBody(){
    this.body.unshift([this.x, this.y]);
  }

  //EXPLICA LA FUNCIÓN DE CADA TECLA AL SER PULSADA
  onKeyDown(keyCode) {
    switch (keyCode) {
      case KEY_LEFT:
      case KEY_RIGHT:
      case KEY_UP:
      case KEY_DOWN:
        //Para que la serpiente no cambie de diercción en su mismo eje.
        if(this.lastKey === KEY_DOWN && keyCode === KEY_UP ||
          this.lastKey === KEY_UP && keyCode === KEY_DOWN ||
          this.lastKey === KEY_LEFT && keyCode === KEY_RIGHT ||
          this.lastKey === KEY_RIGHT && keyCode === KEY_LEFT) {
          break
        }
        this.lastKey = keyCode;
        break;
    }
  }

  //PARA MANTENER EL MOVIMIENTO EN LA DIRECCION QUE MIRA
  //Píxeles que se mueve en cada movimiento por los ejes x e y.
  left() {
    this.x -= 10;
  }
  right() {
    this.x += 10;
  }
  down() {
    this.y += 10;
  }
  up() {
    this.y -= 10;
  }

  //Dirección de la cabeza según la tecla que se pulse.
  move() {    
    switch (this.lastKey) {
      case KEY_LEFT:
        this.left();
        break;
      case KEY_RIGHT:
        this.right();
        break;
      case KEY_UP:
        this.up();
        break;
      case KEY_DOWN:
        this.down();
        break;
    }
  }

  //Para que el cuerpo siga la cabeza.
  moveBody() {
    let prePos = [this.x, this.y];
    for(let i = 0; i < this.body.length; i++){
      let temp = [...this.body[i]];
      this.body[i] = prePos;
      prePos = temp;
    }
  }
  
  //COLISIONES
  //Establecer los paramétros para las colisiones con comida.
  collissionWith(food) {
    if (
      this.x < food.x + food.width &&
      this.x + this.width > food.x &&
      this.y < food.y + food.height &&
      this.y + this.height > food.y
    ) {
      this.soundNiumi.play(); //Sonido para cuando come.
      return true
    }

    return false
  }

  //Establecer los paramétros para las colisiones con paredes.
  checkCollissionsBorder() {
    return this.x > 500 || this.x < 0 || this.y > 300 || this.y < 0; //Delimito el área de acción
  }
  //Establecer los paramétros para las colisiones consigo.
  checkCollissionsWithHimself() {
    return this.body.some(vertebra => vertebra[0] === this.x && vertebra[1] === this.y);
  }
}