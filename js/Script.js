// <----------------------------------------->
// DECLARAMOS LAS CONSTANTES A SER UTILIZADAS DENTRO DE SCRIPT
// <----------------------------------------->

window.onload = () => {
    
    const canvas = document.getElementById('game');
    
    const ctx = canvas.getContext('2d');
    
    const game = new Game(ctx);
    
    //Para empezar el juego una vez se hace "click" sobre el
    //botón de la pantalla principal.
    const startButton = document.getElementById('start-button');
    startButton.onclick = () => {
        game.start();

        window.addEventListener('keydown', (event) => {
            game.onKeyDown(event.keyCode)
        })
    }
};