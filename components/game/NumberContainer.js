import { View, Text,StyleSheet,Dimensions } from "react-native";

import Colors from "../../constants/color";

function NumberContainer({children}){
    return (
    <View style={styles.container}>
        <Text style={styles.numberText} > {children}</Text>
    </View>
    )
}
export default NumberContainer;

const deviceWidth = Dimensions.get('window').width; // an object 'Dimensions API'

const styles = StyleSheet.create({
    container:{
        borderWidth: 4,
        borderColor:Colors.acent500,
        padding:deviceWidth < 380 ? 12 : 24, // a ternary operation :)
        margin: deviceWidth < 380 ? 12 : 24, // Dimension API
        borderRadius: 8,
        alignItems: 'center',
        justifyContent:'center'
    },
    numberText:{
        color: Colors.acent500,
        fontSize: deviceWidth < 380 ? 12 :36,
        //fontWeight: 'bold'
        fontFamily:'open-sans-bold'
    }
}); 