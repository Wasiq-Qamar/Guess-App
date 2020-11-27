import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity  } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const GamePad = (props) => {
  const GAME_START_MESSAGE = "Guess a Number";
  const [getNum, setNum] = useState(GAME_START_MESSAGE);
  const random = Math.floor(Math.random() * 10) + 1;
  const [getRandom, setRandom] = useState(random);
  const [message, setMessage] = useState("");
  const [getRounds, setRounds] = useState(0);
  const [getWins, setWins] = useState(0);
  const [getLoss, setLoss] = useState(0);
  const [hintButton, setHintButton] = useState(false);
  const [hints, setHints] = useState("");
  const [dummy, setDummy] = useState(0);
 
  const numClick = (e) => {
    setMessage("");
    if(getNum === GAME_START_MESSAGE)
      setNum(e);
    else
      setNum(e);
  }

  const check = () => {
    setHintButton(false);
    setDummy(getNum);
    if (getNum === getRandom){
      setMessage("Correct");
      setWins(getWins+5);
    }
    else
      setMessage("Wrong");
    setRounds(getRounds+1);
  }

  const handleHint = () => {
    setWins(getWins-2);
    setLoss(getLoss+1);
    setHintButton(true);
    if (dummy>0 && dummy<10){
      if (dummy < getRandom)
      setHints("Greater");
    else 
      setHints("Smaller"); 
    }
    else{
      if (getRandom <= 5)
      setHints(">0 and <6");
    else 
      setHints(">5 and <10"); 
    }
  }


  let hint;
  if(!hintButton){
    hint = <View style={{width: "50%", paddingTop:10, marginLeft:'25%'}}>
        <Button title="Get Hint"  color='#2f4f4f' onPress={() => handleHint()} />
      </View>;
  }
  else{
    hint = <Text style={{textAlign: "center", fontSize: 15, color:"#fff"}}>Hint: {hints}</Text>;
  }

   return (
     <LinearGradient colors={['#de6161', '#265']}
        style={{ height: '100%', width:"100%", justifyContent:"center"}}
      >  
      {hint}
      <Text style={{textAlign: "center", fontSize: 40, color:"#fff"}}>{getNum}</Text>
      <Text style={{textAlign: "center", fontSize: 15, color:"#fff"}}>{message}</Text>
      <View style={{flexDirection: "row", justifyContent: "space-between", paddingTop:20 }}>
        <View style={{width: "33%"}}>
          <Button title="1" color='#2f4f4f' onPress={numClick.bind(this, 1)} />
        </View>
        <View style={{width: "33%"}}>
          <Button title="2" color='#2f4f4f' onPress={numClick.bind(this, 2)} />
        </View>
        <View style={{width: "33%"}}>
          <Button title="3" color='#2f4f4f' onPress={numClick.bind(this, 3)} />
        </View>
      </View>

      <View style={{paddingTop:10, flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{width: "33%"}}>
          <Button title="4" color='#2f4f4f' onPress={numClick.bind(this, 4)} />
        </View>
        <View style={{width: "33%"}}>
          <Button title="5" color='#2f4f4f' onPress={numClick.bind(this, 5)} />
        </View>
        <View style={{width: "33%"}}>
          <Button title="6"  color='#2f4f4f' onPress={numClick.bind(this, 6)} />
        </View>
      </View>

      <View style={{paddingTop:10, flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{width: "33%"}}>
          <Button title="7" color='#2f4f4f' onPress={numClick.bind(this, 7)} />
        </View>
        <View style={{width: "33%"}}>
          <Button title="8" color='#2f4f4f' onPress={numClick.bind(this, 8)} />
        </View>
        <View style={{width: "33%"}}>
          <Button title="9" color='#2f4f4f' onPress={numClick.bind(this, 9)} />
        </View>
      </View>
      <View style={{width: "50%", paddingTop:10, marginLeft:'25%'}}>
          <Button title="Guess"  color='#2f4f4f' onPress={() => check()} />
        </View>
        <View style={{width: "50%", paddingTop:30, marginLeft:'25%'}}>
          <Button title="Done"  color='#2f4f4f' onPress={() => props.statsChange(getRounds, getWins, getLoss)} />
        </View>

      </LinearGradient>
   
  );
}

const WelcomeScreen = (props) => {

  return (
    <View>
      <LinearGradient colors={['#de6161', '#265']}
        style={{ height: '100%', width:"100%", justifyContent:"center"}}>
        <Text style={{textAlign: "center", fontSize: 30, color:"#fff"}}>Welcome to Guess  Game</Text>
        <View style={{width: "50%", paddingTop:10, marginLeft:'25%'}}>
          <Button title="Start Game"  color='#2f4f4f' onPress={props.setter} />
        </View>
    </LinearGradient>
    </View>
  );
}

const FinishScreen = (props) => {
  const lossPoints = props.loss * 2;
  const points = (props.wins>1 || props.wins<-1) ? "points" : "point";
  return (
    <View >
      <LinearGradient colors={['#de6161', '#265']}
        style={{ height: '100%', width:"100%", justifyContent:"center"}}>
        <Text style={{textAlign: "center", fontSize: 40, color:"#fff", marginBottom:30}}>User Stats</Text>
        <Text style={{textAlign: "center", fontSize: 20, color:"#fff"}}>No of Guesses: <Text style={{fontSize:15}}>{props.rounds}</Text></Text>
        <Text style={{textAlign: "center", fontSize: 20, color:"#fff"}}>Score: <Text style={{fontSize:15}}>{props.wins} {points}</Text></Text>
        <Text style={{textAlign: "center", fontSize: 20, color:"#fff"}}>Hints Taken: <Text style={{fontSize:15}}>{props.loss} (-{lossPoints} points)</Text></Text>
        <View style={{width: "50%", paddingTop:10, marginLeft:'25%'}}>
          <Button title="Play Again"  color='#2f4f4f' onPress={() => props.gameScreen(true)} />
        </View>
          <View style={{width: "50%", paddingTop:10, marginLeft:'25%'}}>
          <Button title="Finish"  color='#2f4f4f' onPress={() => props.welcomeScreen(true)} />
        </View>

    </LinearGradient>
    </View>
  );
}

export default function App() {
const [welcomeScreen, setWelcomeScreen] = useState(true);
const [gameScreen, setGameScreen] = useState(false);
const [getRounds, setRounds] = useState(0);
const [getWins, setWins] = useState(0);
const [getLoss, setLoss] = useState(0);

  const setter = () => {
    setWelcomeScreen(false);
    setGameScreen(true);
  }

  const statsChange = (rounds, wins, loss) => {
    setRounds(rounds);
    setWins(wins);
    setLoss(loss);
    setGameScreen(false);
  }

  let display;
  if(welcomeScreen) {
    display = <WelcomeScreen setter={setter} />;
  }
  else if (gameScreen) {
    display = <GamePad statsChange={statsChange} />;
  }
  else {
    display = <FinishScreen rounds={getRounds} wins={getWins} loss={getLoss} gameScreen={setGameScreen} welcomeScreen={setWelcomeScreen} />;
  }

  return (
    <View styles={styles.container}>
        {display}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

  },
});
