import { useState } from 'react';
import { StyleSheet,ImageBackground, SafeAreaView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFonts} from 'expo-font'; // is an hook
import AppLoading from 'expo-app-loading'; // AppLoading
import {StatusBar}from 'expo-status-bar';

import Colors from './constants/color';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  //Some Hooks
  const [userNumber, setUserNumber]= useState(); //undefine
  const [gameIsOver, setGameIsOver]= useState(true);
  const [guessRounds,setGuessRounds]=useState(0);
  /* 
  1- Loading and pointing the fonts (a hook)
  2- splatch screen when load the fonts 
  3- fontLoaded = true or false
  */
  const [fontsLoaded] = useFonts({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
  if (!fontsLoaded){
    return <AppLoading/>;
  }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber); // start hooks values
    setGameIsOver(false); //start hooks values
  }

  //this function tryger from Usefect function
  function gameOverHandler(numberOfRounds){
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0);
  }

  //helper variable with props
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;
  // execute when state changes

  if(userNumber){
    //passing userNumber 
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>; // screen will change dinamic :)
  }
  if (gameIsOver && userNumber){
    screen = (<GameOverScreen 
              myUserNumber={userNumber} 
              myRoundsNumber={guessRounds} 
              onStartNewGame={startNewGameHandler} //passing a function as a pointer   
              />
              );
  }
  return (
  <>  
    <StatusBar style='light'/>
    {/*Gradient :) */}
    <LinearGradient colors={[Colors.primary700,Colors.acent500]} style={styles.rootScreen}>
        <ImageBackground 
            source={require('./assets/images/background.png')}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
            >
              {/*Safe area GameScreen */}
              <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
    </LinearGradient>
  </> 
  );
}
const styles = StyleSheet.create({
  rootScreen:{
      flex: 1, //take all available space to fill the content inside
      //backgroundColor: '#ddb53f'
  },
  backgroundImage:{
    opacity: 0.15
  }

});

