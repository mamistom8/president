
import "./css/style.css";
import Card from './components/card'
import { Component, useState, useEffect } from "react";
import Player from "./components/player";

function App() {


  const deck = [
    { number: '1', suit: 'hearts' },
    { number: '2', suit: 'hearts' },
    { number: '3', suit: 'hearts' },
    { number: '4', suit: 'hearts' },
    { number: '5', suit: 'hearts' },
    { number: '6', suit: 'hearts' },
    { number: '7', suit: 'hearts' },
    { number: '8', suit: 'hearts' },
    { number: '9', suit: 'hearts' },
    { number: '10', suit: 'hearts' },
    { number: '11', suit: 'hearts' },
    { number: '12', suit: 'hearts' },
    { number: '13', suit: 'hearts' },
    { number: '1', suit: 'clubs' },
    { number: '2', suit: 'clubs' },
    { number: '3', suit: 'clubs' },
    { number: '4', suit: 'clubs' },
    { number: '5', suit: 'clubs' },
    { number: '6', suit: 'clubs' },
    { number: '7', suit: 'clubs' },
    { number: '8', suit: 'clubs' },
    { number: '9', suit: 'clubs' },
    { number: '10', suit: 'clubs' },
    { number: '11', suit: 'clubs' },
    { number: '12', suit: 'clubs' },
    { number: '13', suit: 'clubs' },
    { number: '1', suit: 'diamonds' },
    { number: '2', suit: 'diamonds' },
    { number: '3', suit: 'diamonds' },
    { number: '4', suit: 'diamonds' },
    { number: '5', suit: 'diamonds' },
    { number: '6', suit: 'diamonds' },
    { number: '7', suit: 'diamonds' },
    { number: '8', suit: 'diamonds' },
    { number: '9', suit: 'diamonds' },
    { number: '10', suit: 'diamonds' },
    { number: '11', suit: 'diamonds' },
    { number: '12', suit: 'diamonds' },
    { number: '13', suit: 'diamonds' },
    { number: '1', suit: 'spades' },
    { number: '2', suit: 'spades' },
    { number: '3', suit: 'spades' },
    { number: '4', suit: 'spades' },
    { number: '5', suit: 'spades' },
    { number: '6', suit: 'spades' },
    { number: '7', suit: 'spades' },
    { number: '8', suit: 'spades' },
    { number: '9', suit: 'spades' },
    { number: '10', suit: 'spades' },
    { number: '11', suit: 'spades' },
    { number: '12', suit: 'spades' },
    { number: '13', suit: 'spades' },
    /*{number:'Joker',suit:'joker1'},
    {number:'Joker',suit:'joker2'},*/


  ];


  const [state, setState] = useState({
    players: [{ name: "Tomer", deck: [] },
    { name: "Mery", deck: [] },
    { name: "Soso", deck: [] },
    { name: "Lina", deck: [] },],
    centerDeck: []
  });

  const [playing, setPlaying] = useState(false);
  const [turn, setTurn] = useState(0);
  const [passTable, SetPassTable] = useState([false, false, false, false]);
  const [winners,SetWinners] = useState([false,false,false,false]);
  const [cardClass, setCardClass] = useState("card");

  let skip = 0;

  let tempCenterDeck = [];

  let tempTurn = 0;

  function compare(a, b) {
    return a.number - b.number;
  }

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return [...a];
  }



  function dealCards() {

    console.log("clicked");
    setPlaying(true);
    const tempPlayers = state.players;
    var player;
    let newDeck = shuffle(deck);
    while (newDeck.length > 0) {
      for (player of tempPlayers) {
        player.deck.push(newDeck.pop());
      }
    }
    for (player of tempPlayers) {
      player.deck.sort(compare);
    }


    setState({ players: tempPlayers, centerDeck: [] });
  }


  function deselectDeck() {
    var x = document.getElementsByClassName(cardClass);
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = 'burlywood';
    }
  }


  function removeCardFromPlayerDeck(players) {

    deselectDeck();

    const tempPlayers = state.players;
    var tempcard;
    for (tempcard of tempCenterDeck) {
      let index = players[turn].deck.findIndex(card => card.number === tempcard.number && card.suit === tempcard.suit);
      tempPlayers[turn].deck.splice(index, 1);
    }

    const newState = { players: tempPlayers, centerDeck: tempCenterDeck };
    setState(newState);
    tempCenterDeck = [];
  }

  function clickPlay() {
    if (turn === 0) {
      if (parseInt(tempCenterDeck[0].number) === 2) {
        removeCardFromPlayerDeck(state.players);
        SetPassTable([false, false, false, false]);
      }

      else if (state.centerDeck.length === 0) {
        removeCardFromPlayerDeck(state.players);
        handleTurn(skip, false);
      }
      else if (parseInt(tempCenterDeck[0].number) === parseInt(state.centerDeck[0].number)) {
        removeCardFromPlayerDeck(state.players);
        skip = 1
        handleTurn(skip, false);
        skip = 0;
      }
      else if ( parseInt(tempCenterDeck[0].number) > parseInt(state.centerDeck[0].number)) {
        removeCardFromPlayerDeck(state.players);
        handleTurn(skip, false);
      }
      else if( parseInt(state.centerDeck[0].number) == 2 ){
        removeCardFromPlayerDeck(state.players);
        handleTurn(skip, false);
      }
    }

    

  }

  function cardClick(i) {

    if (turn === 0) {

      var x = document.getElementsByClassName(cardClass);
      let number1 = x[i].childNodes[0].innerText;
      let suit1 = x[i].childNodes[2].innerText;
      if (x[i].style.backgroundColor !== 'orange') {

        if (tempCenterDeck.length === 0) {
          x[i].style.backgroundColor = 'orange';
          tempCenterDeck[0] = ({ number: number1, suit: suit1 });
        }
        else if (tempCenterDeck[0].number === number1) {
          x[i].style.backgroundColor = 'orange';
          tempCenterDeck.push({ number: number1, suit: suit1 });
        }
      }
      else {
        x[i].style.backgroundColor = 'burlywood';
        let index = tempCenterDeck.findIndex(card => card.number === number1 && card.suit === suit1);
        tempCenterDeck.splice(index, 1);
        if (tempCenterDeck.length == 0)
          tempCenterDeck = [];
      }
    }
  }

  function enemyPlay() {
    const enemy = state.players[turn];
    var card;
    var enemypass = true;
    var hasTwo = false;
    switch (state.centerDeck.length) {

      case 0:
        tempCenterDeck.push({ number: enemy.deck[0].number, suit: enemy.deck[0].suit });
        removeCardFromPlayerDeck(state.players);
        enemypass = false;
        break;

      case 1:
        for (card of enemy.deck) {
          if (parseInt(card.number) >= parseInt(state.centerDeck[0].number) && parseInt(card.number) != 2) {
            if (parseInt(card.number) === parseInt(state.centerDeck[0].number))
              skip = 1;
            tempCenterDeck.push({ number: card.number, suit: card.suit });
            removeCardFromPlayerDeck(state.players);
            enemypass = false; 
            break;
          }
        }
        break;

      default:
        var count = 1;
        var i = 1;
        var j;
        while (i < enemy.deck.length) {
          while (parseInt(enemy.deck[i].number) === parseInt(enemy.deck[i - 1].number) && parseInt(enemy.deck[i].number) >= parseInt(state.centerDeck[0].number)) {
            count++;
            if (count === state.centerDeck.length) {
              for (j = 0; j < count; j++)
                tempCenterDeck.push({ number: enemy.deck[i - j].number, suit: enemy.deck[i - j].suit });
              removeCardFromPlayerDeck(state.players);
              i = enemy.deck.length;
              enemypass = false;
              break;
            }
            else i++;
          }
          i++;
          count = 1;
        }
        break;
    }

    if (enemypass === true) {
      for (card of enemy.deck) {
        if (parseInt(card.number) == 2) {
          tempCenterDeck.push({ number: card.number, suit: card.suit });
          removeCardFromPlayerDeck(state.players);
          SetPassTable([false, false, false, false]);
          enemypass = false;
          hasTwo = true;
          break;
        }
      }
      if (hasTwo === false)
        handleTurn(skip, enemypass);
    }
    else
      handleTurn(skip, enemypass);

  }

  function checkWinners()
  {
    var i =0;
    var tempWinners = [];
    var player;
    for(player of state.players){
      if(player.deck.length === 0)
        tempWinners.push(true);
      else tempWinners.push(false);
      i++;
    }

    SetWinners(tempWinners);
  }


  function handleTurn(skip, pass) {

  
    checkWinners();
    var tempPassTable = passTable;
    if(pass)
    {
      tempPassTable[turn] = pass;
      SetPassTable(tempPassTable);
    }
    
    if (countpass() === 3) {
      setState({ players: state.players, centerDeck: [] });
      setTurn(passTable.findIndex(item => item === true));
      SetPassTable([false, false, false, false]);
    }

    tempTurn = (turn + 1 + skip) % 4;
    skip = 0;

    while (passTable[tempTurn] === true ||winners[tempTurn]=== true)
      tempTurn = (tempTurn + 1 + skip) % 4;
    setTurn(tempTurn);
    

  }

  function countpass() {
    var count = 0;
    var item;
    for (item of passTable) {
      if (item)
        count++;
    }
    return count;
  }



  return (
    <div>
      <h1>player {turn + 1} turn</h1>
      <button onClick={() => { handleTurn(0, true) }}>pass</button>
      <button onClick={() => { clickPlay()}}>play</button>
      {playing === false ?
        <button onClick={() => { dealCards()}}>deal cards!  </button>
        : null
      }

      {playing === true ?
        <div className="my-deck" >
          {state.players[0].deck.map((item, i) => {
            return <Card class={cardClass} key={i} id={`${i}`} number={item.number} suit={item.suit} onClick={() => cardClick(i)}></Card>
          })}

        </div>
        : null
      }
      <br></br>
      {state.centerDeck.length > 0 ?
        <div className="main-deck">
          {
            state.centerDeck.map((item, i) => {
              return <Card class={"card"} number={item.number} key={i} suit={item.suit}></Card>
            })
          }

        </div>
        : null
      }
      {
        turn > 0 ?
          <div>
            <button onClick={() => {enemyPlay()}}>player {turn + 1} play!  </button>
          </div>
          : null
      }
      

      <table >
        <thead>
          <tr>
            <th>player</th>
            <th>cards</th>
            <th>pass</th>
            <th>role</th>
          </tr>
        </thead>
      <tbody>
        <tr>
          <td>Tomer</td>
          <td>{state.players[0].deck.length}</td>
          <td>{passTable[0].toString()}</td>
          <td>{winners[0].toString()}</td>
        </tr>
        <tr>
          <td>Mery</td>
          <td>{state.players[1].deck.length}</td>
          <td>{passTable[1].toString()}</td>
          <td>{winners[1].toString()}</td>
        </tr>
        <tr>
          <td>Soso</td>
          <td>{state.players[2].deck.length}</td>
          <td>{passTable[2].toString()}</td>
          <td>{winners[2].toString()}</td>
        </tr>
        <tr>
          <td>Lina</td>
          <td>{state.players[3].deck.length}</td>
          <td>{passTable[3].toString()}</td>
          <td>{winners[3].toString()}</td>
        </tr>
      </tbody>
  
</table>



    </div>
  );
}



export default App;