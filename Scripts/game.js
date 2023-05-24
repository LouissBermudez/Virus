import Deck from "./deck.js";
import Player from "./player.js";


export default class Game{
    constructor() {
        this.deck = new Deck()
        this.currentPlayer= new Player();
        this.turno = 0;
    }


    /**
     * @function
     * Método para iniciar el juego, creando un nuevo mazo y barajeandolo, así como añadiendo tres cartas al mazo del jugador.
     */
    startGame(){
        this.deck.createDeck();
        this.deck.shuffle();
        this.deck.addPlayerHandDeck();
    }


    /**
     * @function
     * Este método se encarga de ejecutar todo lo relacionado con el Drag and Drop, esto lo logra mediante el uso de la librería "Sortable JS".
     */
    sortable(){

        const cartasMazoJugadorUno = document.getElementById("mazoJugador");
        const cartasMazoJugadorDos = document.getElementById("mazoJugadorDos");
        const cartasMazoTableUno = document.getElementById("mazoJugadorOneTable");
        const cartasMazoTableDos = document.getElementById("mazoJugadorTwoTable");
        const cartasMazoDescarte = document.getElementById("discardPile");
        let optionsTableOne = {
            group: {
                name: 'shared',
                pull: false  ,

            },
            sort: false,
        }
        let optionsTableTwo = {
            group: {
                name: 'shared',
                pull: false  ,

            },
            sort: false,
        }

        const cartasMesa = new Sortable(cartasMazoTableUno, optionsTableOne);
        const cartasMesaJugadorDos = new Sortable(cartasMazoTableDos, optionsTableTwo)

        /**
         *
         * @type {Sortable}
         * Lista Sortable para el div del mazo del jugador.
         */

        const mazoJugadorUno = Sortable.create(cartasMazoJugadorUno ,{
            group: {
                name:  'shared',
                put: false,
            },
            animation: 350,
            sort: false,
            /**
             *
             * @function
             * Método que se triguerea al escoger una carta, el cual verifica si esta carta es de tipo organo o no. Si se trata de una carta de tipo organo, ese elemento es draggable hacia el mazo de la mesa
             */
            onChoose: (evt) => {
               const indice = evt.oldIndex + 1;
               const dragCarta = this.deck.playerOneHandDeck.filter((value) => indice);
               let carta = dragCarta[indice];
               let tipoBuscado = carta.tipo;
               const cartaRepetida = this.verificarCartasPlayerOne(tipoBuscado)
               console.log(cartaRepetida)

                if (carta.typeGeneral === 'Virus' || carta.typeGeneral === 'Medicina' || cartaRepetida){

                    cartasMesa.option('disabled', true)

                } else if (carta.typeGeneral === 'Organo' || !cartaRepetida){
                    cartasMesa.option('disabled', false)


                }


            },
            /**
             *
             * @function
             * Método que se triguerea al remover un elemento de la lista, este método se encarga de añadir una nueva carta al array del mazo de la mesa, así como de añadir una nueva carta al mazo del jugador
             *
             *
             */
            onRemove: (evt) => {
               const indice = evt.oldIndex + 1;
               const eliminarCarta = this.deck.playerOneHandDeck.splice(indice, 1);
               const eliminarCard = eliminarCarta[0];
               this.deck.addCardPlayerOneHandDeck();


               if(evt.to === cartasMazoTableUno ){
                   this.turno = 1;
                   cartasMazoJugadorUno.style.visibility = "hidden";
                   this.cambiarTurno(cartasMazoJugadorDos);
                   this.deck.playerOneTableDeck.push(eliminarCard);
                   console.log(this.deck.playerOneTableDeck)


               }else if (evt.to === cartasMazoDescarte){

                   this.deck.discardPile.push(eliminarCard)
                   console.log(this.deck.discardPile)

               }
                console.log(eliminarCard)




            },
        });

    const mazoJugadorDos = Sortable.create(cartasMazoJugadorDos, {
       group: {
           name:'shared',
           put: false
       },
        sort: false,
        onChoose: (evt) => {
            const indice = evt.oldIndex + 1;
            const dragCarta = this.deck.playerTwoHandDeck.filter((value) => indice);
            let carta = dragCarta[indice];
            let tipoBuscado = carta.tipo;
            const cartaRepetida = this.verificarCartasPlayerTwo(tipoBuscado)
            console.log(cartaRepetida)
            if (carta.typeGeneral === 'Virus' || carta.typeGeneral === 'Medicina' || cartaRepetida){
                cartasMesaJugadorDos.option('disabled', true)
            } else if (carta.typeGeneral === 'Organo' || !cartaRepetida){
                cartasMesaJugadorDos.option('disabled', false)


            }
        },
        onRemove: (evt) => {
            if(evt.to === cartasMazoTableDos ){
                this.turno = 0;
                cartasMazoJugadorDos.style.visibility = "hidden";
                this.cambiarTurno(cartasMazoJugadorDos, cartasMazoJugadorUno);
            }
        }

    });




        /**
         * @type{Sortable}
         * Lista Sortable del div para las cartas que se descartan
         */
    const discardPile = Sortable.create(cartasMazoDescarte, {
         group: {
                name: 'shared',
                pull: false,

            },
            sort: false,
             /**
              *
              * @function
              * Método el cual se trigerea al añadir un nuevo elemento a la lista. Se encarga de esconder las cartas que se añadan al mazo de descarte.
              */
            onAdd: (evt) => {
                const carta = evt.item;
                carta.style.display = "none";
            }
        });

        }


        verificarCartasPlayerOne(tipoBuscado){
            let cartaRepetida = false;
            this.deck.playerOneTableDeck.forEach(function(objeto){
               if (objeto.tipo === tipoBuscado){
                   cartaRepetida = true;
               }
            });
            return cartaRepetida;
        }
        verificarCartasPlayerTwo(tipoBuscado){
            let cartaRepetida = false;
            this.deck.playerTwoTableDeck.forEach(function(objeto){
               if (objeto.tipo === tipoBuscado){
                   cartaRepetida = true;
               }
            });
            return cartaRepetida;
        }



        cambiarTurno(cartasMazoJugadorDos, cartasMazoJugadorUno, cartasMesa){
            if (this.turno === 0){
                this.currentPlayer = new Player("JUGADOR 1");
                cartasMazoJugadorUno.style.visibility = "visible";


            }else if (this.turno === 1){
                this.currentPlayer = new Player("JUGADOR 2")
                cartasMazoJugadorDos.style.visibility = "visible";
            }
            console.log(this.currentPlayer)
        }

    }








