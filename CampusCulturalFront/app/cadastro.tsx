import { router } from "expo-router"
import { Image, View, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Cadastro(){
    const cadastro = require("../assets/cadastro.png");
    const logocadastro = require("../assets/logocadastro.png");
    return(
        <View style={styles.container}>
            <Image style={styles.imagem}source={cadastro} resizeMode="cover"/>
            <Image style={styles.imagem2}source={logocadastro} resizeMode="cover"/>
            <View style={styles.bottomContainer}/>
                <View style={styles.textContainer}>
                    <Text style={styles.purpleText}>CADASTRO</Text>
                    <Text style={styles.grayText}>Cadastre-se e tenha acesso aos eventos da UTFPR.</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Nome completo:</Text>
                        <TextInput 
                        style={styles.input}
                        placeholderTextColor="#8A60FF"/>
                        <Text style={styles.inputLabel}>Curso:</Text>
                        <TextInput
                        style={styles.input}
                        placeholderTextColor="#8A60FF"/>
                        <Text style={styles.inputLabel}>E-mail:</Text>
                        <TextInput
                        style={styles.input}
                        placeholderTextColor="#8A60FF"/>
                        <Text style={styles.inputLabel}>Senha:</Text>
                        <TextInput
                        style={styles.input}
                        placeholderTextColor="#8A60FF"
                        secureTextEntry={true}/>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text  style={styles.buttonText}>CADASTRAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </View>
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
    imagem2:{
        width: '30%',
        top: '2%',
        position: 'absolute', // Ajuste para centralizar horizontalmente
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8A60FF',
    },
    grayText: {
        fontSize: 14,
        color: '#838181',
        marginTop: "5%",
        marginBottom: "10%",
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
        marginTop: "5%",
        borderBottomWidth: 1,
        borderBottomColor: '#8A60FF',
        fontSize: 16,
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
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
})