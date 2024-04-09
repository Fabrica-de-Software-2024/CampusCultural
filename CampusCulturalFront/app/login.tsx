import React from 'react';
import { Image, View, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export default function Login() {
    const login = require("../assets/login.png");
    const logo = require("../assets/logo.png");
    const figura1 = require("../assets/figura1.png");
    const figura2 = require("../assets/figura2.png");
    const figura3 = require("../assets/figura3.png");
    const figura4 = require("../assets/figura4.png");

    return (
        <>
            <StatusBar
                backgroundColor="#6B3BF4"
                barStyle="light-content"
            />

            <View style={styles.container}>
                <Image style={styles.imagem} source={login} resizeMode="cover" />
                <Image style={styles.logo} source={logo} />
                <Image style={styles.figura1} source={figura1} resizeMode="cover" />
                <Image style={styles.figura2} source={figura2} resizeMode="cover" />
                <Image style={styles.figura3} source={figura3} resizeMode="cover" />
                <Image style={styles.figura4} source={figura4} resizeMode="cover" />

                <View style={styles.bottomContainer} />
                <View style={styles.textContainer}>
                    <Text style={styles.purpleText}>BEM-VINDO(A) AO NOSSO</Text>
                    <Text style={styles.purpleText2}>CAMPUS CULTURAL!</Text>
                    <Text style={styles.grayText}>
                        Quer ter acesso ao calendário de eventos em tempo real? <Text style={styles.purpleText3}>Efetue o login!</Text>
                    </Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>e-mail:</Text>
                        <TextInput style={styles.input} placeholderTextColor="#8A60FF" />
                        <Text style={styles.inputLabel}>senha:</Text>
                        <TextInput style={styles.input} placeholderTextColor="#8A60FF" secureTextEntry={true} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>ENTRAR</Text>
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
        width: '100%', // Garante que a view ocupe toda a largura
        height: '100%', // Garante que a view ocupe toda a altura
    },
    //Imagem grande do topo
    imagem: {
        width: '100%',
        height: windowHeight * 0.45,
        opacity: 0.36
    },
    // Logo acima da imagem de login
    logo: {
        position: 'absolute',
        alignSelf: 'center',
        top: windowHeight * 0.200 - 100, // Posição a partir do topo da tela
        width: 190,
        height: 190,
    },
    //Figura superior eaquerda
    figura1: {
        top: '0%',
        left: '0%',
        position: 'absolute',
        width: 100,
        height: 100,
    },
    //Figura superior direita
    figura2: {
        width: '30%',
        top: '0%',
        right: '0%',
        position: 'absolute',
    },
    //Figura lateral direita
    figura3: {
        bottom: 0,
        right: 0,
        position: 'absolute',
        width: "10%",
        height: "20%",
        zIndex: 1,
    },
    //Figura inferior esquerda
    figura4: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        width: 200,
        height: 200,
        zIndex: 1,
    },
    //Container branco da parte inferior
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    //Container envolvendo os textos
    textContainer: {
        position: 'absolute',
        top: "45%",
        alignItems: 'center',
    },
    //Definições para a frase "BEM-VINDO(A) AO NOSSO"
    purpleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8A60FF',
    },
    //Definições para a frase "CAMPUS CULTURAL!"
    purpleText2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6B3BF4',
        alignSelf: 'flex-start',
        marginLeft: 35,
    },
    //Definições para a frase "Quer ter acesso ao calendário de eventos em tempo real?"" 
    grayText: {
        fontSize: 14,
        color: '#838181',
        marginRight: "10%",
        marginLeft: "10%",
        marginTop: "2%",
        alignSelf: 'flex-start',
    },
    //Definições para a frase "Efetue o login!"
    purpleText3: {
        color: '#6B3BF4',
    },
    //Container envolvendo campos: e-mail/senha/ENTRAR
    inputContainer: {
        width: '80%',
        marginTop: 20,
    },
    //Usado nas escritas: e-mail e senha
    inputLabel: {
        color: '#838181',
        marginBottom: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#8A60FF',
        fontSize: 16,
        color: '#8A60FF',
        paddingBottom: 5,
        marginBottom: 20,
    },
    //Expecificações botão 'ENTRAR'
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
        width: '50%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});