import Card from "./card.js";

export default class CardTypes extends Card{
    static tipusOrgano = ['Heart',  'Stomach', 'Brain', 'Bones']



    constructor(color, type) {
        super(color, type);


    }

}
