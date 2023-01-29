import { StyleSheet,View, Text } from "react-native";
import Colors from "../../constants/color";
//props
function GuessLogItem({roundNummer,guess}){
    return( 
    <View style={styles.listItem}>
        <Text style={styles.itemText}  ># {roundNummer}</Text>
        <Text style={styles.itemText}>Opponent's Guess: {guess} </Text>
    </View>
    )

}
export default GuessLogItem;

const styles = StyleSheet.create({
    listItem:{
        borderColor: Colors.primary800,
        borderWidth:1,
        borderRadius: 40,
        padding: 12,
        marginVertical:8,
        backgroundColor: Colors.acent500,
        flexDirection: 'row',
        justifyContent:'space-between',
        width: '100%',
        elevation: 4, //for Android
        shadowColor:'black',
        shadowOffset: {width: 0, height:0},
        shadowOpacity:0.25,
        shadowRadius: 3,
    },
    itemText:{
        fontFamily: 'open-sans'
    }
})