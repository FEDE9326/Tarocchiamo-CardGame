/**
 * ALL the game must have a state machine with turns (timeouts?)
 */

/**
 * Game Class. It has the list of players.
 * It assigns initially all the cards to players.
 */

// Dealer is set in or out?

const fs = require('fs');

class Game{
    constructor(player1, player2, player3, player4){
        console.log("Game class created");
        console.log(player1.username + " " + player2.username + " " +player3.username + " "
        + player4.username);
        this.players = new Map();
        this.players.set(player1.username, player1);
        this.players.set(player2.username, player2);
        this.players.set(player3.username, player3);
        this.players.set(player4.username, player4);

        this.deck = new Deck();  
    }

    setDealer(username){
        this.players.get(username).setDealer();
    }
    getSocketPlayer(username){
        return this.players.get(username).ioSocket;
    }
    assignCardsToPlayers(){
        for (var [username, player] of this.players){
            var ncards = 19;
            if (player.isDealer == true)
                ncards = 21;
            for (let i = 0; i< ncards; i++)
                player.assignCard(this.deck.extractRandomCard());
        }
    }

    getPlayers(){
        return this.players;
    }

}

/**
 * Player Class. It stores username and socket (?Possible). Contains an array of the cards and info if the player is the dealer.
 */
class Player{
    constructor(username, ioSocket){
        this.username = username;
        this.ioSocket = ioSocket;
        this.cards = [];
        this.isDealer = false;
    }
    assignCard(card){
        this.cards.push(card);
    }
    setDealer(){
        isDealer = true;
    }
    getCards(){
        return this.cards;
    }
}
/**
 * Simple class for deck management. The class import from Json file the cards. Still don't know if creating a Card Class.
 * Extraction of the cards is done randomly. The method returns every time a new card. Can be optimized to avoid hitting same array index.
 */
class Deck{
    constructor(){
        var cardsRaw = fs.readFileSync('cards.json');
        this.cards = JSON.parse(cardsRaw);
        this.extractedCards = [];
    }
    extractRandomCard(){
        do{
            var random = Math.floor(Math.random() * (77));
        }while (this.extractedCards.includes(random));
        
        this.extractedCards.push(random);
        return this.cards[random];
    }
}

/**
 * Collect the players
 */
class Lobby{
    constructor(){
        this.playerPool = [];
        this.numberOfPlayers = 0;
    }
    addPlayer(username, ioSocket){
        this.playerPool.push(new Player(username, ioSocket));
        this.numberOfPlayers++;
        console.log('Added player with username ' + username);
        console.log('Number of players ' + this.numberOfPlayers);
    }
    removePlayer(username){
        this.playerPool = this.playerPool.map(user => user!=username);
        this.numberOfPlayers--;
    }
    getNumberOfPlayers(){
        return this.numberOfPlayers;
    }
    getPlayerPool(){
        return this.playerPool;
    }
}

module.exports = {
    Lobby : Lobby,
    Game : Game,
    Player : Player
}


