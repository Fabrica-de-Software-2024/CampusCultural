import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Touchable, Image, TouchableOpacity, ScrollView } from 'react-native';
import EventoCard, { Evento } from './EventoCard';

export default function EditarEvento(props: { data: Evento, setModal: React.Dispatch<React.SetStateAction<boolean>> }) {

    const iconBanner = require("../../assets/escolher_imagem.png")

    return (

        <View style={styles.body}>
            <View style={styles.container}>
                <View style={styles.imagem}>
                    <Image source={require('../../assets/lapis.png')}></Image>
                </View>

                <Text style={{ margin: 'auto', fontWeight: 'bold', marginTop: '12%' }}><Text style={{ color: '#6B3BF4' }}>Editar</Text> Evento</Text>

                <View style={styles.containerInterno}>
                    <ScrollView style={styles.scroll}>

                        <Text style={styles.textoRoxo}>
                            Aqui você pode criar e editar eventos de maneira fácil! Preencha os campos abaixo:
                        </Text>

                        <TextInput placeholder='Insira um nome para o evento...' style={styles.linhaForm}></TextInput>
                        <TextInput placeholder='Insira um subtítulo para o evento...' style={styles.linhaForm}></TextInput>
                        <Text style={{ color: '#838181', fontSize: 10 }}>Insira a data do evento:</Text>
                        <TextInput placeholder='dd/mm' style={styles.linhaForm}></TextInput>
                        <TextInput placeholder='insira um banner' style={styles.linhaForm} /*inlineImageRight={IconBanner}*/></TextInput>
                        <TextInput placeholder='insira uma descrição' style={styles.linhaForm}></TextInput>
                        <Text style={styles.textoRoxo}>Prévia do evento:</Text>
                        <EventoCard data={props.data} previa={true} />
                    </ScrollView>
                    <View style={styles.containerBotao}><TouchableOpacity style={styles.button} onPress={() => props.setModal(false)}><Text style={{ color: 'white' }}>Concluir</Text></TouchableOpacity></View>
                </View>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        maxHeight: '70%',
        width: '85%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 100, height: 1000 },
        shadowOpacity: 100,
        shadowRadius: 100,
        elevation: 5,

    },

    textoRoxo: {
        marginTop: '8%',
        fontSize: 14,
        lineHeight: 16.94,
        color: '#6B3BF4',
        fontWeight: "700",
        textAlign: 'justify'
    },

    imagem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        position: 'absolute',
        top: -60,
        backgroundColor: '#6B3BF4',
        padding: 0,
        width: 90,
        height: 90,
        borderRadius: 90 / 2
    },

    linhaForm: {
        fontSize: 10,
        padding: 0,
        borderBottomColor: '#838181',
        borderBottomWidth: 1,
        marginTop: 10,

    },

    button: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#6B3BF4',
        borderRadius: 40,
        marginTop: '5%',
    },

    containerInterno: {
        width: '70%',
    },
    scroll: {
        height: "75%"
    },
    containerBotao: {
        width: "100%",
    }
});