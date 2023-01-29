import {View,Image,
        StyleSheet,
        Text,
        Dimensions,
        useWindowDimensions,
        ScrollView
    } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
// revisar :)
// adding summary props info 
function GameOverScreen({myRoundsNumber,myUserNumber,onStartNewGame}){
    const {width, height} = useWindowDimensions();
    let imageSize = 300; // create a controlated image size

    if (width < 380){
        imageSize = 150;
    }
    if (height < 400){
        imageSize = 80;
    }
    //creating landscape mode image screen sizes and borders
    const imageStyle ={
        width:imageSize,
        height: imageSize,
        borderRadius:imageSize / 2 
    };
    return( 
  <ScrollView>
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
        {/* adding more styles (2)*/}
      <View style={[styles.imagecontainer,imageStyle]}>
            <Image 
                style={styles.image}
                source={require('../assets/images/success.png')}/>
      </View>
      {/* Nested text is allowed in RN and can use Styles */}
      <Text style={styles.sumaryText}>
        Your phone needed <Text style={styles.highlight}>{myRoundsNumber}</Text> rounds 
        to guess the number
      <Text style={styles.highlight}>{myUserNumber}</Text>. 
      </Text>
        <PrimaryButton myOnPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View> 
    </ScrollView>
    )
}
export default GameOverScreen;

//const deviceWidth = Dimensions.get('window').width; // portrait mode 

const styles= StyleSheet.create({
    screen:{
        flex: 1,
    },
    // It moves everyting to the center of the screen :)
    rootContainer:{
        flex: 1,
        padding: 24,
        justifyContent:'center',
        alignItems:'center'
    },
    imagecontainer:{
        // width: deviceWidth < 380 ? 150 : 300, // Dimensions Api image :)
        // height: deviceWidth < 380 ? 150 : 300, // Dimensions Api image :)
        // borderRadius: deviceWidth < 380 ? 75 :150,
        borderWidth:3,
        borderColor: Colors.primary800,
        overflow:'hidden', // a mask
        margin:36
    },
    image:{
        width:'100%', // Image properties
        height:'100%'
    },
    //Text properties
    sumaryText: {
        fontFamily: 'open-sans',
        fontSize:24,
        textAlign:'center',
        marginBottom:24 // set margin between all elements :)
        
    },
    highlight:{
        fontFamily:'open-sans-bold',
        color:Colors.primary500
    },

})