import CardTypes from "./cardTypes.js";
import Card from "./card.js";


export default class Deck {
    constructor() {
        this.generalDeck = [];
        this.discardPile = [];
        this.playerTableDeck = [];
        this.playerHandDeck = [];
    }


    /**
     * @function
     * Esta función llama a diferentes funciones la cuales se encargan de crear cada una de las cartas.
     */

    createDeck() {
        this.createOrganCards();
        this.createVirusCards();
        this.createMedicinaCards()
        this.createMulticolorCards();
        console.log(this.generalDeck)
    }

    addPlayerHandDeck(){
        for (let i = 0; i <= 2; i++){
            const card = this.generalDeck.pop();
            const contenedorImagenes = document.getElementById(`card${i + 1}`);
            const imagen = document.createElement('img');
            contenedorImagenes.className = `card${i + 1}`
            imagen.src = card.img;
            contenedorImagenes.appendChild(imagen);
            this.playerHandDeck.push(card)
        }
        console.log(this.playerHandDeck);
    }


    addplayerTableDeck(){

    }












    /**
     * @function
     * Esta función se encarga de barajear el mazo
     */

    shuffle() {
        // obtener un índice aleatorio y intercambiar la carta en esa posición
        for (let i = this.generalDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // eslint-disable-next-line max-len
            [this.generalDeck[i], this.generalDeck[j]] = [this.generalDeck[j], this.generalDeck[i]];
        }
    }

    /**
     * @function
     * Función para crear las cartas de tipo organo, esta función es llamda arriba por la función "createDeck".
     *
     */
    createOrganCards() {
        const cantidad = 5;
        for (let i = 0; i < Card.colores.length - 1; i++) {
            for (let j = 0; j < cantidad; j++) {
                const organos = CardTypes.tipusOrgano[i];
                const colores = Card.colores[i];
                const imagen = `./imatges/organo${colores}.png`
                const card = new Card(colores, organos, imagen)
                this.generalDeck.push(card);
            }

        }


    }

    /**
     * @function
     * Función para crear las cartas de tipo Virus. También es llamada por la función "createDeck".
     * .
     */
    createVirusCards() {
        for (let i = 0; i < Card.colores.length - 1; i++) {
            for (let j = 0; j < 4; j++) {
                const colores = Card.colores[i];
                const type = "Virus"
                const imagen = `./imatges/virus${colores}.png`
                const card2 = new Card(colores, type, imagen)
                this.generalDeck.push(card2);
            }
        }
    }

    /**
     * @function
     * Función para crear las cartas de tipo Medicina. Es llamada por la función "createDeck".
     *
     */
    createMedicinaCards() {
        for (let i = 0; i < Card.colores.length; i++) {
            for (let j = 0; j < 4; j++) {
                const colores = Card.colores[i];
                const type = "Medicina"
                const imagen = `./imatges/medicina${colores}.png`
                const card3 = new Card(colores, type,imagen)
                this.generalDeck.push(card3);
            }
        }
    }

    /**
     * Función para crear las cartas de tipo Multicolor.
     *
     */
    createMulticolorCards() {
        const card4 = new Card("multicolor", "Virus",`./imatges/virusMulticolor.png`);
        const card5 = new Card("multicolor", "Organo", `./imatges/organoMulticolor.png`);
        this.generalDeck.push(card4, card5);
    }
}

