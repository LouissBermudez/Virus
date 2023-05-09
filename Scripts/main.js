import Deck from "./deck.js";
import Game from "./game.js"


const nuevoJuego = new Game();
const cartasMazoJugador = document.getElementById('mazoJugador');
const cartasMazoMesa = document.getElementById('mazoJugadorTable');

nuevoJuego.startGame();





const mazoJugador = Sortable.create(cartasMazoJugador,{
    group: {
      name:  'shared',
      put: false
    },
    animation: 150,
    sort: false,
    direction: 'horizontal',
    onUnchoose: () => {
        mazoMesa.option('draggable', false)
    }
});

const mazoMesa = Sortable.create(cartasMazoMesa,{
    group: {
        name:'shared',
        pull: false
    },
    sort: false,
    direction: 'horizontal',
    onAdd: () => {
        document.querySelector(".card1").style.transform = "none"
        document.querySelector(".card2").style.transform = "none"
        document.querySelector(".card3").style.transform = "none"


        //document.getElementById("card3").style.transform =  "none"
        //  document.getElementById("card2").style.transform = "none"
        // document.getElementById("card3").style.transform = "none"
    }


});






















