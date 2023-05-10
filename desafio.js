class CardManager {
    #cards
    #error
    constructor(){
        this.#cards = []
        this.#error = undefined
    }

    getCards = () => this.#cards

    generateId = () => this.#cards.length===0 ? 1 : this.#cards[this.#cards.length-1].id + 1

    getCardById = (id) => {
        const card = this.#cards.find(item => item.id === id)
        if(!card) return `Id '${id}' not found`
        else return card
    }


    #validateEvent = (title, description, price, thumbnail, code, stock) => {
        if(!title || !description || !price || !thumbnail || !code || !stock) {
            this.#error = 'Campos incompletos'
        } else { 
            const found = this.#cards.find(item => item.code === code)
            if(found) this.#error = `[${title}]: el código [${code}] ya existe`
            else this.#error = undefined
        }
    }
    
    addCard = (title, description, price, thumbnail, code, stock) => {

        this.#validateEvent(title, description, price, thumbnail, code, stock)
        if(this.#error === undefined) this.#cards.push({id: this.generateId(), title, description, price, thumbnail, code, stock})
        else {
            console.log(this.#error)
        }
         
    }
}

const cardManager = new CardManager()

cardManager.addCard("Duress", "Enemy discards a card", 0.50, "imgplaceholder", "1001", 50)
cardManager.addCard("Counter non-creature spell", 0.55, "imgplaceholder", "1002", 50) // No entra. Falta título
cardManager.addCard("Abrade", "Deal 3 damage", 0.60, "imgplaceholder", "1003", 50) 
cardManager.addCard("Disdainful Stroke", "Counter 4 or bigger mana spell", 0.40, "imgplaceholder", "1003", 50) // No entra, repite código (1002)

console.log(cardManager.getCards())
console.log(cardManager.getCardById(2))