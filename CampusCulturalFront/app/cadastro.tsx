import { router } from "expo-router"
import { useState } from "react";
import { Image, View, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { back_url } from "../api_link";

async function cadastrar(data) {
    fetch(`${back_url}/usuario/register`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export default function Cadastro() {
    const cadastro = require("../assets/cadastro.png");
    const logo = require("../assets/logo.png");
    const figura2 = require("../assets/figura2.png");
    const figura4 = require("../assets/figura4.png");
    const cadeadoIcon = require("../assets/cadeado.png");
    const olhoFechadoIcon = require("../assets/olho_fechado.png");
    const olhoAbertoIcon = require("../assets/olho_aberto.png");

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [dados, setDados] = useState({
        "nome_usuario": "João Silva",
        "login_usuario": "joaosilva@gmail.com",
        "senha_usuario": "joao123",
        "curso_usuario": "Bach Engenharia de Software",
        "is_professor": false
    })

    return (
        <>
            <StatusBar
                backgroundColor="#6B3BF4"
                barStyle="light-content"
            />
            <View style={styles.container}>
                <Image style={styles.imagem} source={cadastro} resizeMode="cover" />
                <Image style={styles.imagem2} source={logo} resizeMode="contain" />
                <Image style={styles.imagem3} source={figura2} resizeMode="cover" />
                <Image style={styles.imagem4} source={figura4} resizeMode="cover" />


                <View style={styles.bottomContainer} />
                <View style={styles.textContainer}>
                    <Text style={styles.purpleText}>CADASTRO</Text>
                    <Text style={styles.grayText}>Cadastre-se e tenha acesso aos eventos da UTFPR.</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Nome completo:</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#8A60FF" />
                        <Text style={styles.inputLabel}>Curso:</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#8A60FF" />
                        <Text style={styles.inputLabel}>E-mail:</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#8A60FF" />
                        <Text style={styles.inputLabel}>Senha:</Text>
                        <View style={styles.fieldWithLine}>
                            <View style={styles.lineUnderInput}></View>
                            <Image source={cadeadoIcon} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input2}
                                placeholderTextColor="#8A60FF"
                                secureTextEntry={!mostrarSenha}
                            />
                            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                                <Image source={mostrarSenha ? olhoAbertoIcon : olhoFechadoIcon} style={styles.eyeIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>CADASTRAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#6B3BF4",
        paddingTop: 0,
        margin: 0,
    },
    imagem: {
        width: '100%',
        height: windowHeight * 0.45,
        opacity: 0.36
    },
    imagem2: {
        width: '30%',
        top: '2%',
        position: 'absolute', // Ajuste para centralizar horizontalmente
    },
    imagem3: {
        width: '30%',
        top: '0%',
        right: '0%',
        position: 'absolute', // Ajuste para centralizar horizontalmente
    },
    imagem4: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        width: 200,
        height: 200,
        zIndex: 1,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80%',
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    textContainer: {
        position: 'absolute',
        top: windowHeight * 0.22,
        alignItems: 'center',
    },
    purpleText: {
        fontSize: 25,
        fontWeight: '700',
        color: '#8A60FF',
    },
    grayText: {
        fontSize: 12,
        color: '#838181',
        marginTop: "5%",
        marginBottom: "5%",
        alignSelf: 'flex-start',
    },
    inputContainer: {
        width: '95%',
        marginTop: 20,
    },
    inputLabel: {
        marginTop: "0%",
        color: '#838181',
        marginBottom: 5,
    },
    input: {
        marginTop: "0%",
        borderBottomWidth: 1,
        borderBottomColor: '#8A60FF',
        fontSize: 12,
        color: '#8A60FF',
        paddingBottom: 5,
        marginBottom: 30,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 35,
    },
    button: {
        backgroundColor: '#6B3BF4',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        width: '70%',
        zIndex: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    eyeIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
        marginBottom: 5,
        zIndex: 2,
    },

    fieldWithLine: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    lineUnderInput: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: '#8A60FF',
        zIndex: 1,
    },
    inputIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
        marginBottom: 5,
        zIndex: 2,
    },
    input2: {
        flex: 1,
        paddingBottom: 5,
        fontSize: 16,
        color: '#8A60FF',
        backgroundColor: 'transparent',
        zIndex: 2,
    },
})