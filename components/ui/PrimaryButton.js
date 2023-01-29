import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/color"; // re-use constant color :)

// children = object distructing :) props / onPress to name can change

function PrimaryButton({children, myOnPress}){
    function pressHandler(){
        console.log('Pressed!');
    }
    return(
    {/* - pressHandler function as a pointer, NOT EXECUTE  
        -reestructure - fixs ripple efect android
    */},
    <View style={styles.buttonOuterContainer} >
        {/*pressed is a property */}
      <Pressable 
        style={ ({pressed}) => pressed 
        ? [styles.buttonInnerContainer,styles.pressed]  
        : styles.buttonInnerContainer}
        onPress={myOnPress} 
        android_ripple={{color: Colors.primary600}} // using re-usable code
        > 
            <Text style={styles.buttonText} >{children}     </Text>
      </Pressable> 
    </View>
    )
}
export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden' // any effect will not show if goes outside on Android
    },
    buttonInnerContainer:{
        backgroundColor: Colors.primary500, // using re-usable code
        paddingVertical: 8,
        paddingHorizontal: 16, // left and right
        elevation: 2 // Shadows on Android
    },
    buttonText:{
        color: 'white',
        textAlign: 'center'

    },
    pressed:{
        opacity:0.75
    }

});