import CardTypes from './cardTypes.js';
import Card from './card.js';


export default class Deck {
  constructor() {
    this.generalDeck = [];
    this.discardPile = [];
    this.playerOneTableDeck = [];
    this.playerOneHandDeck = [0];
    this.playerTwoHandDeck = [0];
    this.playerTwoTableDeck = [];
  }


  /**
     * @function
     * Esta función llama a diferentes funciones la cuales se encargan de crear cada una de las cartas.
     */

  createDeck() {
    this.createOrganCards();
    this.createVirusCards();
    this.createMedicinaCards();
    this.createMulticolorCards();
    console.log(this.generalDeck);
  }

  addPlayerHandDeck() {
    for (let i = 1; i <= 3; i++) {
      this.addCardPlayerOneHandDeck();
      this.addCardPlayerTwoHandDeck();
    }
    console.log(this.playerOneHandDeck);
    console.log(this.playerTwoHandDeck);
  }

  addCardPlayerOneHandDeck() {
    const card = this.generalDeck.pop();
    const contenedorImagenes = document.createElement('div');
    const imagen = document.createElement('img');
    const contenedor = document.getElementById('mazoJugador');
    imagen.src = card.img;
    contenedorImagenes.className = `cards carta${card.colour}`;
    contenedorImagenes.dataset.tipo = `${card.tipo}`;
    contenedorImagenes.id = `carta${card.colour}`;
    contenedor.appendChild(contenedorImagenes);
    contenedorImagenes.appendChild(imagen);
    this.playerOneHandDeck.push(card);
  }
  addCardPlayerTwoHandDeck() {
    const card = this.generalDeck.pop();
    const contenedorImagenes = document.createElement('div');
    const imagen = document.createElement('img');
    const contenedor = document.getElementById('mazoJugadorDos');
    imagen.src = card.img;
    contenedorImagenes.className = 'cards';
    contenedorImagenes.dataset.tipo = `${card.tipo}`;
    contenedorImagenes.id = `carta${card.colour}`;
    contenedor.appendChild(contenedorImagenes);
    contenedorImagenes.appendChild(imagen);
    this.playerTwoHandDeck.push(card);
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
        const imagen = `./imatges/organo${colores}.png`;
        const tipoGeneral = 'Organo';
        const card = new Card(colores, organos, imagen, tipoGeneral);
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
        const type = 'Virus';
        const imagen = `./imatges/virus${colores}.png`;
        const tipoGeneral = 'Virus';
        const card2 = new Card(colores, type, imagen, tipoGeneral);
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
        const type = 'Medicina';
        const imagen = `./imatges/medicina${colores}.png`;
        const tipoGeneral = 'Medicina';
        const card3 = new Card(colores, type, imagen, tipoGeneral);
        this.generalDeck.push(card3);
      }
    }
  }

  /**
     * @function
     * Función para crear las cartas de tipo Multicolor.
     *
     */
  createMulticolorCards() {
    const card4 = new Card('Multicolor', 'Virus', `./imatges/virusMulticolor.png`, 'Virus');
    const card5 = new Card('Multicolor', 'Organo', `./imatges/organoMulticolor.png`, 'Organo');
    this.generalDeck.push(card4, card5);
  }
}

