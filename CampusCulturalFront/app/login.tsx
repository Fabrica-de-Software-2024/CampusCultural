import React, { useState } from 'react';
import { Image, View, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

async function fazLogin(data) {
    const tokenresp = await fetch("https://coensapp.dv.utfpr.edu.br/siacoes/service/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    const token = await tokenresp.text();
    if(token !== ""){
        const dadosresp = await fetch("https://coensapp.dv.utfpr.edu.br/siacoes/service/user/profile", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        var dados = await dadosresp.json();
        const tiporesp = await fetch("https://coensapp.dv.utfpr.edu.br/siacoes/service/user/list/profiles", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const tipo = await tiporesp.json()
        dados.type = tipo[0];

        try {
            await AsyncStorage.setItem('login', JSON.stringify(dados));
        } catch (err) {
            console.log(err);
        }
        router.replace("/home")
        return dados;
    }
    else Alert.alert("Falha no Login", "RA ou Senha Incorreta!");
}

export default function Login() {

    const login = require("../assets/login.png");
    const logo = require("../assets/logo.png");
    const figura1 = require("../assets/figura1.png");
    const figura2 = require("../assets/figura2.png");
    const figura3 = require("../assets/figura3.png");
    const figura4 = require("../assets/figura4.png");
    const pessoaIcon = require("../assets/pessoa.png");
    const cadeadoIcon = require("../assets/cadeado.png");
    const olhoFechadoIcon = require("../assets/olho_fechado.png");
    const olhoAbertoIcon = require("../assets/olho_aberto.png");

    const [loginDados, setLoginDados] = useState({
        "login": "",
        "password": ""
    })

    

    //Estado de controle da visibilidade da senha
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <>
            <StatusBar backgroundColor="#6B3BF4" barStyle="light-content" />
            <View style={styles.container}>
                <Image style={styles.imagem} source={login} resizeMode="cover" />
                <Image style={styles.logo} source={logo} />
                <Image style={styles.figura1} source={figura1} resizeMode="cover" />
                <Image style={styles.figura2} source={figura2} resizeMode="cover" />
                <Image style={styles.figura3} source={figura3} resizeMode="cover" />
                <Image style={styles.figura4} source={figura4} resizeMode="cover" />

                <View style={styles.bottomContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.purpleText}>BEM-VINDO(A) AO NOSSO</Text>
                        <Text style={styles.purpleText2}>CAMPUS CULTURAL!</Text>
                        <Text style={styles.grayText}>
                            Quer ter acesso ao calendário de eventos em tempo real?{' '}
                            <Text style={styles.purpleText3}>Efetue o login!</Text>
                        </Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabelEmail}>e-mail:</Text>
                            <View style={styles.fieldWithLine}>
                                <View style={styles.lineUnderInput}></View>
                                <Image source={pessoaIcon} style={styles.inputIcon} />
                                <TextInput style={styles.input2} placeholderTextColor="#8A60FF" value={loginDados.login} onChange={(e) => setLoginDados({ ...loginDados, login: e.nativeEvent.text })} />
                            </View>
                            <Text style={styles.inputLabelSenha}>senha:</Text>
                            <View style={styles.fieldWithLine}>
                                <View style={styles.lineUnderInput}></View>
                                <Image source={cadeadoIcon} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input2}
                                    placeholderTextColor="#8A60FF"
                                    secureTextEntry={!mostrarSenha}
                                    value={loginDados.password}
                                    onChange={(e) => setLoginDados({ ...loginDados, password: e.nativeEvent.text })}
                                />
                                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                                    <Image source={mostrarSenha ? olhoAbertoIcon : olhoFechadoIcon} style={styles.eyeIcon} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => { fazLogin(loginDados).then((resp)=>console.log(resp)) }}>
                                    <Text style={styles.buttonText}>ENTRAR</Text>
                                </TouchableOpacity>
                            </View>
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
        width: '100%',
        height: '100%',
    },
    //Imagem grande do topo
    imagem: {
        width: '100%',
        height: windowHeight * 0.45,
        opacity: 0.36
    },
    //Logo acima da imagem de login
    logo: {
        position: 'absolute',
        alignSelf: 'center',
        top: windowHeight * 0.200 - 100,
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
        width: "15%",
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
        top: "10%",
        alignItems: 'center',
        left: "2%",
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
    //Definições para a frase "Quer ter acesso ao calendário de eventos em tempo real?"
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
    inputLabelEmail: {
        color: '#838181',
        marginBottom: 5,
    },
    inputLabelSenha: {
        color: '#838181',
        marginBottom: 5,
        marginTop: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#8A60FF',
        fontSize: 16,
        color: '#8A60FF',
        paddingBottom: 5,
        marginBottom: 20,
        zIndex: 20
    },
    //Expecificações ícone olho_aberto e olho_fechado
    eyeIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
        marginBottom: 5,
        zIndex: 2,
    },
    //Expecificações ícones PESSOA E CADEADO
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
        zIndex: 1, // Garante que a linha fique sob os outros elementos
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
        backgroundColor: 'transparent', // Importante para que o fundo do TextInput não oculte a linha
        zIndex: 2,
    },
    inputWithLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#8A60FF',
    },
    //Expecificações botão 'ENTRAR'
    buttonContainer: {
        alignItems: 'center',
        marginTop: "18%",
    },
    button: {
        backgroundColor: '#6B3BF4',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        width: '50%',
        zIndex: 100
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});