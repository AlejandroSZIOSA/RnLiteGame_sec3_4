import { useState, useEffect } from "react";
import { View,StyleSheet,Alert,FlatList,useWindowDimensions } from "react-native";
import Title from "../components/ui/Title"; // reusable component
import { Ionicons } from '@expo/vector-icons'; // add icons :)

import PrimaryButton from "../components/ui/PrimaryButton";
import NumberContainer from "../components/game/NumberContainer";
import IntructionText from "../components/ui/IntructionText";
import Card from "../components/ui/Card";
import GuessLogItem from "../components/game/GuessLogItem";
//random nummer
function generateRandomBetween(min, max,exclude){
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min,max,exclude);
    }else {
        return rndNum;
    }
}
// Define Boundaries // executes after avery rendering
let minBoundary = 1; // boundary = limites Outside the component . reset when render
let maxBoundary = 100;
// onGameOver props as a function
function GameScreen({userNumber,onGameOver}){
    //Set initials Values :)
    const initialGuess = generateRandomBetween(1,100,userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds,setGuessRounds]= useState([initialGuess])
    const {width,height} = useWindowDimensions(); //Destructive landscape mode

    //UseEfect runs after component as been executed :)
    useEffect(()=> {
        if (currentGuess === userNumber){      
                onGameOver(guessRounds.length);
                }
    },[currentGuess,userNumber,onGameOver] )
    // execute first time the component is rendered
    useEffect(() => {
        minBoundary=1;
        maxBoundary=100;
    }, [])

    // Next gueess handler
    function nextGuessHandler(direction){
        if(
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ){
            Alert.alert("Don't lie!", 'You know that is wrong...', 
            [{text:'Sorry!', style:'cancel'}]);
            return; //exit the function :)
        }
        if (direction === 'lower'){
        maxBoundary = currentGuess;
        }else {
        minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(
            minBoundary,maxBoundary,currentGuess
        );
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => 
            [newRndNumber, ...prevGuessRounds]); // updating a array hook :)
    }

    const guessRoundsListLength = guessRounds.length; // get the length of the array

    //Creating a JSX fragment :)
    let content = (
    <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <IntructionText myStyleOverraide={styles.IntructionText}>
            Higher or lower 
            </IntructionText>
                {/* + - */}
            <View style= {styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton myOnPress={nextGuessHandler.bind(this,'lower')} >
                     <Ionicons name="remove" size={24} color="white" />
                    </PrimaryButton>    
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton myOnPress={nextGuessHandler.bind(this,'greater')}>
                     <Ionicons name="add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>
    );
    if (width > 500){
        //Another fragment JSX code
        content = (
        <>
         <IntructionText myStyleOverraide={styles.IntructionText}>
          Higher or lower 
         </IntructionText>
        <View style={styles.buttonsContainerWide}>
            <View style={styles.buttonContainer}>
              <PrimaryButton myOnPress={nextGuessHandler.bind(this,'lower')} >
                <Ionicons name="remove" size={24} color="white" />
                </PrimaryButton>    
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.buttonContainer}>
              <PrimaryButton myOnPress={nextGuessHandler.bind(this,'greater')}>
                <Ionicons name="add" size={24} color="white" />
              </PrimaryButton>
            </View>
        </View>
        </>
        );
    }
    return (
    <View style={styles.screen}>
        <Title > Opponent's Guess</Title>
        {/*GUESS*/}
        {content}
        {/* Style view - fix the out screen flatlist */}
        <View style={styles.listContainer}>
        {/*{guessRounds.map(guessRound => <Text key={guessRound}> 
        {guessRound}</Text>)}*/}
            <FlatList 
                data={guessRounds} 
                renderItem={(itemData)=> 
                    <GuessLogItem 
                        roundNummer={guessRoundsListLength - itemData.index} //item data now contains a index
                        guess={itemData.item}/> 
                }
                keyExtractor={(item) => item} // Use data itself as key :)
        />
        </View>
    </View>
    );
}
export default GameScreen;
const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:24, // distance all directions
        alignItems:'center' // Dimentions API
    },
    buttonsContainerWide:{
        flexDirection: 'row', // overraiding styles
        alignItems: 'center'
    },
    IntructionText:{
        marginBottom: 12,
    },
    buttonsContainer:{
        flexDirection: 'row'
    },
    buttonContainer:{
        flex: 1
    },
    listContainer:{
        flex:1,
        padding:16
    }
})