import React from 'react';
import { Image, View, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Login() {
    const login = require("../assets/login.png");
    const logo = require("../assets/logo.png");

    return (
        <View style={styles.container}>
            <Image style={styles.imagem} source={login} resizeMode="cover" />
            <Image style={styles.logo} source={logo} />
            <View style={styles.bottomContainer} />
            <View style={styles.textContainer}>
                <Text style={styles.purpleText}>BEM-VINDO(A) AO NOSSO</Text>
                <Text style={styles.purpleText2}>CAMPUS CULTURAL!</Text>
                <Text style={styles.grayText}>Quer ter acesso ao calendário de eventos em tempo real? <Text style={styles.purpleText3}>Efetue o login!</Text></Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>e-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#8A60FF"
                    />
                    <Text style={styles.inputLabel}>senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#8A60FF"
                        secureTextEntry={true}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>ENTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    //Container da imagem grande no topo
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#6B3BF4",
        paddingTop: 0,
        margin: 0,
    },
    //Imagem grande do topo
    imagem: {
        width: '100%',
        height: windowHeight * 0.45,
        opacity: 0.36
    },
    logo: {
        position: 'absolute',
        width: "50%",
        top: "5%",
        resizeMode: "contain",
        zIndex: 10
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
        top: windowHeight * 0.45 - 35,
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