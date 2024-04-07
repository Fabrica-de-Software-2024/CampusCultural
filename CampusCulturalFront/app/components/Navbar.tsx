import { Image, Text, View, StyleSheet } from "react-native";

export default function Navbar(){
    const logo = require("../../assets/logo.png");
    return(
        <View style={styles.container}>
            <Image style={styles.imagem} source={logo} />
            <Text>teste</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: "#8A60FF",
    },
    imagem: {
      width: 54,
      height: 54,
      marginVertical: 10,
    },
    caption: {
      fontSize: 16,
      color: '#333',
    },
  });
