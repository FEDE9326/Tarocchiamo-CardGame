Technologies: http://www.html5gamedevs.com/topic/15261-developing-a-4-player-card-game/
- nodejs core
- socket.io communication
- pixi.js UI

Architecture: https://medium.com/@MichalMecinski/architecture-of-a-node-js-multiplayer-game-a9365356cb9

- Server Controller: new connections, auth, create and destroy game, persistent data
- Game Controller: one for every game room. It is responsible to change the state of the Game
- Player Controller: handles incoming messages for each player and send periodically state of the Game
- Client Controller: sends action from the client to server and vice-versa
- Game View: render canvas and pass inputs from browser to Client Controller

User Requirements:
1) Player connects to Server
2) Server collects 4 players
3) A game is started
4) One random player starts the game
5) Every player receives the cards
6) The player who started has to discard 2 cards following the game rules
7) The player on the left starts the Game
8) Every player plays one card
9) Following the rules of the game, 1 player wins the hand
10) The player who has won starts the next hand
11) The game continues until all the cards have been played
12) Calculations are made and one team wins

Tasks:
1) Run web Server in local
2) Server accepts multiple tcp connection and ask user the names
3) The server print the partecipants on screen and wait until 4 players are connected


4) Creation of a simple game:
  - definition of the state machine
  - cards are assigned randomly to players
  - info are sent to the users
  - users fills array with these info

5) Creation of simple UI
A simple UI could be an array of letters which correspond to cards. The user can write in a
box the card he wants to play and then it disappears from the array

6) Creation of isMyTurn Function waiting in case for server message (internal state machine)
7) Creation of isValidCard function (both client and server side)
8) Creation of whoWinsHand function
9) Creation of whoWinsGame function

10) Creation of proper UI
