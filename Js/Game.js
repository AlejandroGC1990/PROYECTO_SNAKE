// <----------------------------------------->
// DECLARAMOS LAS CONSTANTES A SER UTILIZADAS DENTRO DE LA
// CLASE GAME
// <----------------------------------------->

class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.background = new Background(ctx);
    this.player = new Player(ctx);    
    this.fps = 10000 / 60;

    this.food = [];
    this.soundFood = new Audio('../sound/food_G1U6tlb.mp3');
    this.soundFoodVol = 0.5;

    this.intervalId = undefined;

    this.foodFramesCount = 0;

    this.score = 0;
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        
        if(!this.food.length){ //Si no hay comida, que aparezca
          this.addFood();
        }
        
        this.clear()

        this.move()

        this.draw()
        
        this.checkCollisionFood();
        
        this.checkCollissionsBorder(); 

        this.foodFramesCount++;
      }, this.fps)
    }
  }

  //PINTA COMIDA EN LA PANTALLA EN COORDENADAS ALEATORIAS
  addFood() {

    //OBTENGO UNA COORDENADA RANDOM EN EL EJE Y
    const maxY = this.ctx.canvas.height;
    const y = Math.floor(Math.random() * maxY);
    
    //OBTENGO UNA COORDENADA RANDOM EN EL EJE x
    const maxX = this.ctx.canvas.width;
    const x = Math.floor(Math.random() * maxX);

    //AÑADO LAS NUEVAS COORDENADAS DE COMIDA AL ARRAY "FOOD"
    this.food.push(new Food(this.ctx, x, y));
  }

//ELIMINA LA COMIDA DE LA PANTALLA Y AUMENTA EL MARCADOR
  clear() {
    this.ctx.clearRect(
      0, 
      0, 
      this.ctx.canvas.width,
      this.ctx.canvas.height
    )

    this.food = this.food.filter(
      food => food.x + food.width > 0
    );

    //AÑADE 1 PUNTO EN EL MARCADOR
    const previousFoodLength = this.food.length;
    
    if(this.food.length < previousFoodLength) {
      this.score++;
    }
  }

  //DIBUJA LOS DISTINTOS ELEMENTOS EN EL CANVAS
  draw() {
    //PANTALLA DE JUEGO
    this.background.draw();
    //SERPIENTE
    this.player.draw();
    //COMIDA
    this.food.forEach(food => food.draw());
    //MARCADOR
    this.drawScore();
  }

  //DIBUJA EL MARCADOR
  drawScore() {

    this.ctx.save()

    this.ctx.fillStyle = 'black'
    this.ctx.font = ' bold 24px sans-serif'

    this.ctx.fillText(`Score: ${this.player.body.length} ptos`, 20, 40)

    this.ctx.restore()
  }

  //PERMITE MOVER LA CABEZA DE LA SERPIENTE 
  move() {
    this.player.move();
  }

  //ESTA FUNCIÓN HACE QUE EL PROGRAMA RECONOZCA LAS 
  //CONSTANTES DE MOVIMIENTO LAS PULSAR LAS TECLAS
  onKeyDown(keyCode) {
    this.player.onKeyDown(keyCode)
  }


  //ESTABLECE LA LLAMADA DE LAS CONSTANTES CADA VEZ QUE SE
  //PULSA UNA TECLA PREESTABLECIDA
  setupListeners(event) {
    this.player.setupListener(event);
  }

  //CHEQUEA LAS COLISIONES DEL PLAYER CON LA COMIDA
  checkCollisionFood() {
    const feed = this.food.some(food => this.player.collissionWith(food));

    if(feed) {
      this.player.addBody();
      this.food.pop();
      this.soundFood.play();
    }
    else {
      this.checkCollissionsWithHimself();
      this.player.moveBody();
    }
  }

  //CHEQUEA LAS COLISIONES DEL PLAYER CON LOS BORDES
  checkCollissionsBorder() {
    if(this.player.checkCollissionsBorder()){
      this.gameOver();    
    }
  } 

  //CHEQUEA LAS COLISIONES DEL PLAYER CONSIGO MISMO
  checkCollissionsWithHimself() { //(está tan confuso que se hiere así mísmo)
    if(this.player.checkCollissionsWithHimself()){
      this.gameOver();    
    }
  }

  //HAS MUERTO (ACÉPTALO, RECARGA LA PÁGINA Y EMPIEZA 
  //NUEVA PARTIDA)
  gameOver() {
    clearInterval(this.intervalId);

    this.ctx.save();

    this.ctx.fillStyle = 'rgba(150, 17, 17, 0.7)';
    this.ctx.fillRect(
      0,
      0, 
      this.ctx.canvas.width, 
      this.ctx.canvas.height
    );

    //ESCRIBE EN EL CANVAS "GAME OVER"
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.font = 'bold 24px sans-serif';
    this.ctx.fillText(
      `Game Over :(`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}