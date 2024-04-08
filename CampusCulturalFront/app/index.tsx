import { router } from "expo-router"
import { useEffect } from "react"
import { ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native"


export default function Index() {

    /*
    useEffect(()=>{
        router.replace("/home")
    })
    */
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.botao} onPress={() => router.navigate("/login")}><Text style={styles.texto}>Login</Text></TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={() => router.navigate("/cadastro")}><Text style={styles.texto}>Cadastro</Text></TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={() => router.navigate("/home")}><Text style={styles.texto}>Home</Text></TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        padding: "20%",
        height: "100%",
    },
    botao: {
        display: "flex",
        backgroundColor: "#8A60FF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        borderRadius: 9999,
        height: 50
    },
    texto: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 24,
    }
})