// an reusable component
import { Text,StyleSheet,Platform } from "react-native";

function Title({children}){
    return <Text style={styles.title}>{children} </Text>;
}
export default Title;
const styles = StyleSheet.create({
    title: {
        fontFamily:'open-sans-bold', // aplying custom fonts :)
        fontSize: 24,
        //fontWeight:'bold',
        color:'white',
        textAlign:'center',

        //borderWidth: Platform.OS ==='android' ? 2 : 0, // Diferents OS
        borderWidth: Platform.select({ios:0,android:2}),
        borderColor: 'white',
        padding: 12,
        maxWidth:'80%', // It is related to the parent width  "multiple devices" 
        width:300 //pixel
    }
})