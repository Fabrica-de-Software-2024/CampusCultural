//  Popup de Ajuda do Perfil
//
//  Esse Popup permite tirar dúvidas e receber suporte no Perfil
//  Não foi totalmente desenvolvido no MVP
//
import { Link } from "expo-router";
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from "react-native";

export default function AjudaCard(props:{setAberto: React.Dispatch<React.SetStateAction<boolean>>}) {

    const icone = require("../../assets/chat_branco.png");
    const cancel = require("../../assets/cancel.png");
   

    return (
        <View style={styles.container}>
            <View style={styles.icone} >
                <Image source={icone} />
            </View>
            <View style={styles.card}>
                <View style={styles.containerFechar}>
                <TouchableOpacity onPress={() => props.setAberto(false)} style={styles.botaoFechar}><Image source={cancel} style = {styles.cancel} /></TouchableOpacity>
                </View>
                <View style={styles.containerCardszin}>
                    <TouchableOpacity style={styles.cardzin}>
                        <Text style={styles.textao}>ATENÇÃO!!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardzin2}>
                        <Text style={styles.textozin}>O aplicativo irá redirecioná-lo {"\n"}para o link:</Text>
                        <Link href={"https://www.utfpr.edu.br/campus/doisvizinhos/sobre"} style={styles.textozinRosa}>https://www.utfpr.edu.br/campus/doisvizinhos/sobre</Link>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

// Estilização dos Componentes
const window = Dimensions.get("screen")
const styles = StyleSheet.create({
    container: {
        width: "80%",
        height: "100%",
        marginHorizontal: "10%",
        alignItems: "center"
    },
    icone: {
        position: "absolute",
        width: 100,
        height: 100,
        backgroundColor: "#6B3BF4",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 9999,
        top: "12%",
        elevation: 2,
        zIndex: 20
    },
    card: {
        position: "absolute",
        backgroundColor: "#FFF",
        width: "100%",
        height: "65%",
        top: "20%",
        borderRadius: 15,
        elevation: 2,
        zIndex: 10
    },
    containerFechar: {
        width: "100%",
        alignItems: "flex-end"
    },
    botaoFechar: {
        width: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 25
    },
    cancel:{
        width: window.height / 20,
        height: window.height / 20,
    },
    containerCardszin: {
        height: "70%",
        justifyContent:  "space-evenly"
    },
    cardzin: {
        width: "98%",
        height: "15%",
        marginHorizontal: "1%",
        backgroundColor: "#411BAA1A",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100
    },
    cardzin2: {
        width: "92%",
        height: "40%",
        marginHorizontal: "4%",
        backgroundColor: "#411BAA1A",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    textao: {
        textAlign: "center",
        marginLeft: 15,
        fontSize: 30,
        fontWeight: "700",
        color: "#411BAA"
    },
    textozin: {
        textAlign: "left",
        marginLeft: 15,
        fontSize: 16,
        fontWeight: "700",
        color: "#411BAA"
    },
    textozinRosa: {
        marginTop: 20,
        textAlign: "left",
        marginLeft: 15,
        fontSize: 16,
        fontWeight: "700",
        color: "#6B3BF4"
    }
})