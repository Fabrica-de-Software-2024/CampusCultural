import { router } from "expo-router"
import { useEffect } from "react"
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, ActivityIndicator } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Index() {

    useEffect(() => {
        AsyncStorage.getItem('login').then(async (resp) => {
            if (resp != null) {
                const resp2 = await JSON.parse(resp);
                const usuario = await fetch(`https://campus-cultural.vercel.app/usuario/${resp2.id_usuario}`);
                const usuario2 = await usuario.json();
                
                try {
                    await AsyncStorage.setItem('login', JSON.stringify(usuario2)).then(() => router.replace("/home"));
                } catch (err) {
                    console.log(err);
                }
            }
            else router.replace("/login")
        });
    })

    return (
        <>
            {/*
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.botao} onPress={() => router.navigate("/login")}><Text style={styles.texto}>Login</Text></TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={() => router.navigate("/cadastro")}><Text style={styles.texto}>Cadastro</Text></TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={() => router.navigate("/home")}><Text style={styles.texto}>Home</Text></TouchableOpacity>
        </ScrollView>
        */}
            < View style={styles.carregando} >
                <ActivityIndicator size={"large"} color={"#8A60FF"} />
            </View >
        </>
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
    },
    carregando: {
        flex: 1,
        justifyContent: "center"
    }
})