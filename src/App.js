
import "./css/style.css";
import Card from './components/card'
import { Component,useState ,useEffect} from "react";
import Player from "./components/player";

function App() {
  

   const deck = [
    {number:'1',suit:'hearts'},
    {number:'2',suit:'hearts'},
    {number:'3',suit:'hearts'},
    {number:'4',suit:'hearts'},
    {number:'5',suit:'hearts'},
    {number:'6',suit:'hearts'},
    {number:'7',suit:'hearts'},
    {number:'8',suit:'hearts'},
    {number:'9',suit:'hearts'},
    {number:'10',suit:'hearts'},
    {number:'11',suit:'hearts'},
    {number:'12',suit:'hearts'},
    {number:'13',suit:'hearts'},
    {number:'1',suit:'clubs'},
    {number:'2',suit:'clubs'},
    {number:'3',suit:'clubs'},
    {number:'4',suit:'clubs'},
    {number:'5',suit:'clubs'},
    {number:'6',suit:'clubs'},
    {number:'7',suit:'clubs'},
    {number:'8',suit:'clubs'},
    {number:'9',suit:'clubs'},
    {number:'10',suit:'clubs'},
    {number:'11',suit:'clubs'},
    {number:'12',suit:'clubs'},
    {number:'13',suit:'clubs'},
    {number:'1',suit:'diamonds'},
    {number:'2',suit:'diamonds'},
    {number:'3',suit:'diamonds'},
    {number:'4',suit:'diamonds'},
    {number:'5',suit:'diamonds'},
    {number:'6',suit:'diamonds'},
    {number:'7',suit:'diamonds'},
    {number:'8',suit:'diamonds'},
    {number:'9',suit:'diamonds'},
    {number:'10',suit:'diamonds'},
    {number:'11',suit:'diamonds'},
    {number:'12',suit:'diamonds'},
    {number:'13',suit:'diamonds'},
    {number:'1',suit:'spades'},
    {number:'2',suit:'spades'},
    {number:'3',suit:'spades'},
    {number:'4',suit:'spades'},
    {number:'5',suit:'spades'},
    {number:'6',suit:'spades'},
    {number:'7',suit:'spades'},
    {number:'8',suit:'spades'},
    {number:'9',suit:'spades'},
    {number:'10',suit:'spades'},
    {number:'11',suit:'spades'},
    {number:'12',suit:'spades'},
    {number:'13',suit:'spades'},
    /*{number:'Joker',suit:'joker1'},
    {number:'Joker',suit:'joker2'},*/

    
  ];
   
   

  
    const[state,setState] = useState({players:[{name:"Tomer",deck : []},
                                              {name:"Mery",deck : []},
                                              {name:"Soso",deck : []},
                                              {name:"Lina",deck : []},]
                                          
                                         , centerDeck:{number:null,suit:null}});
                            
    const[playing,setPlaying] = useState(false);
    /*useEffect(() => {
      console.log(state.centerDeck);
      enemyPlay(state,1);
    }, [state])*/
    

  let cDeck = {number:null,suit:null};

  function compare (a,b) {
  return a.number - b.number;
  }

  function shuffle  (a)  {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return [...a];
}

  

function dealCards (players , deck)  {
    
    console.log("clicked");
    setPlaying(true);
    const tempPlayers=state.players;
    var player;
    let newDeck = shuffle(deck);
    while(newDeck.length > 0)
    {
      for (player of tempPlayers){
        player.deck.push(newDeck.pop());
      }
    }
    for (player of tempPlayers){
      player.deck.sort(compare);
    }
    
    
    setState({players:tempPlayers,centerDeck:{number:null,suit:null}});
  }

  
  

 
  function removeCardFromPlayerDeck  (players,i,number,suit) {
    
    const tempPlayers=state.players;
    let tempCenterDeck;
    
    let index = players[i].deck.findIndex(card => card.number === number && card.suit === suit);
    
    tempPlayers[i].deck.splice(index,1);
   
    cDeck={number:number,suit:suit};
    const newState = {players:tempPlayers , centerDeck:{number,suit}};
    setState(newState);
    
    
    
  }

   function cardClick (players,number,suit){
    
    
    removeCardFromPlayerDeck(players,0,number,suit);
    
    //enemyPlay(players,1);
    
    

  }

  function enemyPlay(currentstate,i) {
    //const tempPlayers=[...players];
    //const tempPlayers=currentstate.players;
    const enemy=currentstate.players[i];
    //const current = {...mainDeck};
    //const current = state.centerDeck;
    var card;
    for(card of enemy.deck){
      if (parseInt(card.number) >= parseInt(currentstate.centerDeck.number)){
        removeCardFromPlayerDeck(currentstate.players,i,card.number,card.suit);
        break;
        }
    }
    
  }
    
    
  


  
    return (
      <div>
        <button onClick={()=> {dealCards(state.players,deck)}}>deal cards!  </button>
        {playing === true?
          <div className="my-deck" >
            {state.players[0].deck.map((item,i)=>{
              return <Card key={i} number={item.number} suit={item.suit} onClick={()=>cardClick(state.players,item.number,item.suit)}></Card>
            })}

          </div>
        : null
        }
        <br></br>
        {state.centerDeck.number !== null?
        <div className="main-deck">
          <Card number={state.centerDeck.number} suit={state.centerDeck.suit}></Card>
        </div>
        :null
        }
        <button onClick={()=> {enemyPlay(state,1)}}>opponent play!  </button>
        <h4>opponent had {state.players[1].deck.length} cards</h4>
        
       


      </div>
    );
  }



export default App;