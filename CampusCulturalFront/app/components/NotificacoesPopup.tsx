import { Dispatch, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, Switch } from "react-native";

export default function NotificacoesCard(props: { setAberto: React.Dispatch<React.SetStateAction<boolean>> }) {

    const icone = require("../../assets/sino_branco.png");

    const [todos, setTodos] = useState(false);
    const [inscritos, setInscritos] = useState(false);
    const [alteracoes, setAlteracoes] = useState(false);

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
                    <View style={styles.cardzin}>
                        <View style={styles.iconebg}>
                            <Image style={styles.iconezin} source={icone} />
                        </View>
                        <Text style={styles.textozin}>Todos os eventos</Text>
                        <Switch
                            trackColor={{ false: '#DDDDDD', true: '#8A60FF' }}
                            thumbColor={todos ? '#1D065D' : '#BBBBBB'}
                            ios_backgroundColor="#DDDDDD"
                            onValueChange={() => setTodos(!todos)}
                            value={todos}
                        />
                    </View>
                    <View style={styles.cardzin}>
                        <View style={styles.iconebg}>
                            <Image style={styles.iconezin} source={icone} />
                        </View>
                        <Text style={styles.textozin}>Apenas eventos {"\n"}inscritos</Text>
                        <Switch
                            trackColor={{ false: '#DDDDDD', true: '#8A60FF' }}
                            thumbColor={inscritos ? '#1D065D' : '#BBBBBB'}
                            ios_backgroundColor="#DDDDDD"
                            onValueChange={() => setInscritos(!inscritos)}
                            value={inscritos}
                        />
                    </View>
                    <View style={styles.cardzin}>
                        <View style={styles.iconebg}>
                            <Image style={styles.iconezin} source={icone} />
                        </View>
                        <Text style={styles.textozin}>Todas as alteracões {"\n"}em eventos inscritos</Text>
                        <Switch
                            trackColor={{ false: '#DDDDDD', true: '#8A60FF' }}
                            thumbColor={alteracoes ? '#1D065D' : '#BBBBBB'}
                            ios_backgroundColor="#DDDDDD"
                            onValueChange={() => setAlteracoes(!alteracoes)}
                            value={alteracoes}
                        />
                    </View>
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
        justifyContent: "space-between",
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
        fontSize: 16,
        fontWeight: "700",
        color: "#411BAA"
    }
})