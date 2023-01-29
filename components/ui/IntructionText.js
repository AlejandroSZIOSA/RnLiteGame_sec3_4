// making reusable cod
import { StyleSheet,Text } from "react-native";
import Colors from "../../constants/color";

// children = desde donde va a ser usado el contenido
// myStyle = will overraide style.instructions)
function IntructionText({children, myStyleOverraide}){
    return <Text style={[styles.intructionText,myStyleOverraide]}> {children} </Text>;
}
export default IntructionText;
//this style will be overraide by myStyle
const styles = StyleSheet.create({
    intructionText:{
        fontFamily:'open-sans',
        color: Colors.acent500,
        fontSize: 24
    }
});