import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default function ConfiguracoesCard(props: { setAberto: React.Dispatch<React.SetStateAction<boolean>> }) {

    const icone = require("../../assets/engrenagem_branco.png");

    return (
        <View style={styles.container}>
            <View style={styles.icone} >
                <Image source={icone} />
            </View>
            <View style={styles.card}>
                <View style={styles.containerFechar}>
                    <TouchableOpacity onPress={() => props.setAberto(false)} style={styles.botaoFechar}><Text style={styles.textoFechar}>X</Text></TouchableOpacity>
                </View>
                <View style={styles.containerCardszin}>
                    <TouchableOpacity style={styles.cardzin}>
                        <View style={styles.iconebg}>
                            <Image style={styles.iconezin} source={icone} />
                        </View>
                        <Text style={styles.textozin}>Todos os eventos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardzin}>
                        <View style={styles.iconebg}>
                            <Image style={styles.iconezin} source={icone} />
                        </View>
                        <Text style={styles.textozin}>Apenas eventos {"\n"}inscritos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardzin}>
                        <View style={styles.iconebg}>
                            <Image style={styles.iconezin} source={icone} />
                        </View>
                        <Text style={styles.textozin}>Todas as alteracões {"\n"}em eventos inscritos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

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
        margin: 5
    },
    textoFechar: {
        fontSize: 24
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 100
    },
    iconebg: {
        backgroundColor: "#6B3BF480",
        borderRadius: 10,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15
    },
    iconezin: {
        width: 30,
        height: 30
    },
    textozin: {
        textAlign: "left",
        marginLeft: 15,
        fontSize: 16,
        fontWeight: "700",
        color: "#411BAA"
    }
})