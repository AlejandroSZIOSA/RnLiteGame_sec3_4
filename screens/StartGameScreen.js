import { useState } from "react";
import { TextInput,
    View,
    StyleSheet,
    Alert,
    Dimensions,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView
 } from "react-native";

import Colors from "../constants/color";

import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import IntructionText from "../components/ui/IntructionText";

function StartGameScreen({onPickNumber}){
    //hooks
    const [enteredNumber,setEnteredNumber] = useState('');

    /* -Creating an object 
        and using destructering for get the width and height of the device :)
        -When the app render, the custom orientation values will aply
    */    
    const {width,height} = useWindowDimensions(); // Dinamyc Dimentions Hooks
    
    //function
    //get the TextInput as parameter automatic
    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText)
    }
    function resetInputHandler(){
        setEnteredNumber('');
    }
    function confirmInputHandler(){
        //convert the entries to number
        const chosenNumber = parseInt(enteredNumber);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            //show alert!
        Alert.alert(
            'Invalid number',
            'Number has to be a number between 1 and 99.',
            [{text:'Okay',style:'destructive', onPress: resetInputHandler }] 
            )
            return; // cancell all function
        }
       onPickNumber(chosenNumber);
    }
    const marginToDistance =height < 380 ? 30 : 100; // Apply every rendering time!
    
    return(
    <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior="position">
        {/*This will be apply useWindowsDimentions */}
            <View style={[styles.rootContainer,{marginTop:marginToDistance}]}>
                <Title>Guess my number</Title>
                <Card>
                    {/* keyboardtype cross plataform work on Android and IOS */}
                    <IntructionText> Enter a number </IntructionText>
                        <TextInput 
                        style={styles.numberInput} 
                        maxLength={2} 
                        keyboardType="number-pad" 
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={numberInputHandler}
                        value={enteredNumber}
                        />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton myOnPress={resetInputHandler}>Reset</PrimaryButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton myOnPress={confirmInputHandler}>Confirme</PrimaryButton>
                        </View>
                    </View>
                </Card>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
    );
}

export default StartGameScreen;

/* Dimentions API. Adjust the heigth in Landscape mode :) 

*/
//const deviceHeight = Dimensions.get('window').height 

const styles = StyleSheet.create({
    screen:{
        flex:1,
    },

    rootContainer:{
        flex: 1,
        //marginTop: deviceHeight < 380 ? 30 : 100,
        alignItems: 'center' // strech = defaults
    },
    numberInput:{
        height: 50,
        width:50,
        fontSize:32,
        borderBottomColor:Colors.acent500, // TextInput Property
        borderBottomWidth: 3,// TextInput Property
        color:Colors.acent500,
        marginVertical: 8, 
        fontWeight: 'bold', // TextInput Property
        textAlign:'center' // TextInput Property
    },
    buttonsContainer:{
        flexDirection: 'row'
    },
    buttonContainer:{
        flex: 1
    }
})