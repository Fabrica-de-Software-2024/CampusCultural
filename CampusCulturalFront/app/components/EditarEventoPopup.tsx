//  Componente do Popup de Edição de Eventos
//
//  O Popup aparece quando o Botão de Editar Evento é Pressionado e se parece com o Popup de Criar Eventos
//  O Popup so pode ser visto por alguem com Permissão de Editar Eventos 
//
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Touchable, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import EventoCard, { Evento, professor } from './EventoCard';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from 'react-native-ui-datepicker';
import { router } from 'expo-router';
import { back_url } from '../../api_link';
import { locale } from './AdicionarEventoPopup';

const window = Dimensions.get('window');

export default function EditarEvento(props: { setModal: React.Dispatch<React.SetStateAction<boolean>>, evento: Evento }) {

    const iconBanner = require("../../assets/escolher_imagem.png")

    const [calendario, setCalendario] = useState(0);

    const [dataEvento, setDataEvento] = useState(new Date(Math.floor(Date.now() / 1000) * 1000))

    const [nomeImagem, setNomeImagem] = useState("Selecionar...")

    const [dataImage, setDataImage] = useState("")

    const [data, setData] = useState<Evento>(props?.evento)

    console.log(props.evento)

    // Fazendo Requisição do Usuario Logado para atribui-lo como criador do Evento
    useEffect(() => {
        AsyncStorage.getItem('login').then(async (resp) => {
            let _dados = JSON.parse(resp);
            setData({ ...data, professor_evento: _dados.id_usuario })
            let _img = await fetch(`${back_url}/imagem/${props.evento.imagem}`);
            let _img2 = await _img.json();
            setDataImage(_img2.imagem)
        })
    }, [data.professor_evento])

    // Função para fechar o Popup caso haja desistencia na Edição do Evento
    function cancelar() {
        setData(props?.evento)
        props.setModal(false)
    }

    // Função para selecionar a imagem que sera usada com banner do Evento no celular do Editor
    async function pegaImagem() {
        let _imagem = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [20, 9],
            quality: 1,
            base64: true
        })

        if (!_imagem.canceled) {
            setNomeImagem(_imagem.assets[0].uri.substring(_imagem.assets[0].uri.lastIndexOf('/') + 1, _imagem.assets[0].uri.length));
            console.log('data:image/png;base64,' + _imagem.assets[0].base64);
            setDataImage('data:image/png;base64,' + _imagem.assets[0].base64);
        }
    }

    // Função que envia as Informações Editadas fornecidas pelo Editor para API para Registro
    async function editar(data: Evento, imagem: string, setModal: React.Dispatch<React.SetStateAction<boolean>>) {
        AsyncStorage.getItem('login').then(async (resp) => {
            let _dados = JSON.parse(resp);
            const body = JSON.stringify({
                "professor_evento": _dados?.id_usuario,
                "nome_evento": data.nome_evento,
                "sub_evento": data.sub_evento,
                "data_evento": data.data_evento,
                "local_evento": data.local_evento,
                "descricao_evento": data.descricao_evento,
                "imagemstr": imagem
            })
            console.log(body)
            try {
                const resp2 = await fetch(`${back_url}/evento/${data.id_evento}`, {
                    method: 'PATCH',
                    body: body,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                console.log(await resp2.json());
            } catch (e) { console.log(e) }
            setModal(false);
            router.replace("/home")
        })
    }

    return (

        <View style={styles.body}>
            {// Calendario usado para selecionar data e hora do Evento
                calendario === 1 &&
                <View style={styles.boxlight}>
                    <View style={styles.containerCalendario}>
                        <DateTimePicker
                            mode="single"
                            locale={locale}
                            timePicker={true}
                            date={dataEvento}
                            onChange={(params) => setDataEvento(new Date(params.date.toString()))}
                            selectedTextStyle={{ color: "#FFF", fontSize: window.width / 30 }}
                            calendarTextStyle={{ color: "#FFF", fontSize: window.width / 30 }}
                            todayTextStyle={{ color: "#FFF", fontSize: window.width / 30 }}
                            headerTextStyle={{ color: "#FFF", fontSize: window.width / 30 }}
                            weekDaysTextStyle={{ color: "#FFF", fontSize: window.width / 30 }}
                            timePickerTextStyle={{ color: "#FFF", fontSize: window.width / 30 }}
                            monthContainerStyle={{ backgroundColor: "#00000000", borderWidth: 0 }}
                            yearContainerStyle={{ backgroundColor: "#00000000", borderWidth: 0 }}
                            timePickerIndicatorStyle={{ backgroundColor: "#8A60FF" }}
                            headerButtonColor="#FFF"
                            selectedItemColor="#8A60FF"
                        />
                        <TouchableOpacity style={styles.buttonCalendario} onPress={() => { setCalendario(0); setData({ ...data, data_evento: dataEvento.getTime().toString() }) }}><Text style={styles.buttonTextCalendario}>OK</Text></TouchableOpacity>
                    </View>
                </View>
            }
            <View style={styles.container}>
                {/*Cabeçalho do Popup*/}
                <View style={styles.imagemContainer}>
                    <Image style={styles.imagem} source={require('../../assets/lapis.png')}></Image>
                </View>
                {/*Botao de Cancelar*/}
                <TouchableOpacity onPress={()=>cancelar()}><Image style ={styles.cancel} source= {require('../../assets/cancel.png')}></Image></TouchableOpacity>
                <Text style={styles.textoAdicionar}><Text style={{ color: '#6B3BF4' }}>Editar</Text> Evento</Text>
                <Text style={styles.textoRoxo}>
                    Aqui você pode criar e editar eventos de maneira fácil! Preencha os campos abaixo:
                </Text>
                <View style={styles.containerInterno}>
                    {/*Inputs de Informações do Evento*/}
                    <ScrollView style={styles.scroll}>
                        <Text style={styles.texto}>Insira um nome para o evento:</Text>
                        <TextInput style={styles.linhaForm} value={data.nome_evento} onChange={(e) => setData({ ...data, nome_evento: e.nativeEvent.text })}></TextInput>
                        <Text style={styles.texto}>Insira um subtítulo para o evento:</Text>
                        <TextInput style={styles.linhaForm} value={data.sub_evento} onChange={(e) => setData({ ...data, sub_evento: e.nativeEvent.text })}></TextInput>
                        <Text style={styles.texto}>Insira o local do evento:</Text>
                        <TextInput style={styles.linhaForm} value={data.local_evento} onChange={(e) => setData({ ...data, local_evento: e.nativeEvent.text })}></TextInput>
                        <Text style={styles.texto}>Insira a data do evento:</Text>
                        <TouchableOpacity style={{ paddingTop: 10 }} onPress={() => setCalendario(1)}><Text style={styles.linhaForm}>{new Date(dataEvento).toLocaleString("pt-BR", { dateStyle: 'full', timeStyle: 'short' })}</Text></TouchableOpacity>
                        <Text style={styles.texto}>Insira um banner:</Text>
                        <TouchableOpacity style={{ paddingTop: 10, flexDirection: 'row' }} onPress={() => pegaImagem()}><Image style={{ marginRight: 5 }} source={iconBanner} /><Text style={styles.linhaForm}>{nomeImagem}</Text></TouchableOpacity>
                        <Text style={styles.texto}>Insira uma descrição para o evento:</Text>
                        <TextInput style={styles.linhaForm} value={data.descricao_evento} onChange={(e) => setData({ ...data, descricao_evento: e.nativeEvent.text })}></TextInput>
                        
                        {/*Prévia do Evento*/}
                        <Text style={styles.textoRoxo}>Prévia do evento:</Text>
                        <EventoCard data={data} previa={true} image={dataImage} />
                    </ScrollView>
                    {/*Botão de Concluir*/}
                    <View style={styles.containerBotao}><TouchableOpacity style={styles.button} onPress={() => editar(data, dataImage, props.setModal)}><Text style={styles.buttonText}>Concluir</Text></TouchableOpacity></View>
                </View>
            </View>

        </View>

    );
}

// Estilização dos Componentes
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

    boxlight: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        zIndex: 40,
        backgroundColor: "#00000099"
    },

    containerCalendario: {
        position: 'absolute',
        width: "80%",
        paddingHorizontal: "5%",
        backgroundColor: "#1D065D",
        borderRadius: 10
    },

    texto: {
        color: '#838181',
        fontSize: window.height / 60
    },

    textoAdicionar: {
        fontSize: window.height / 60,
        fontWeight: 'bold',
        marginTop: '10%'
    },

    textoRoxo: {
        width: '80%',
        marginVertical: '5%',
        fontSize: window.height / 60,
        lineHeight: 16.94,
        color: '#6B3BF4',
        fontWeight: "700",
    },

    imagemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        position: 'absolute',
        top: - window.height / 15,
        backgroundColor: '#6B3BF4',
        padding: 0,
        borderRadius: 9999
    },

    imagem: {
        width: window.height / 15,
        height: window.height / 15,
        margin: 15
    },

    cancel: {
        position: "absolute",
        width: window.height / 20,
        height: window.height / 20,
        right: "-45%",
        top: window.height / 50,


    },

    linhaForm: {
        fontSize: window.height / 60,
        padding: 0,
        borderBottomColor: '#838181',
        borderBottomWidth: 1,
        marginBottom: 5,
    },

    button: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#6B3BF4',
        borderRadius: 40,
        marginTop: '10%',
        fontSize: window.height / 40,
    },

    buttonCalendario: {
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#6B3BF4',
        borderRadius: 40,
        marginBottom: '5%',
        fontSize: window.height / 40,
        width: "30%",
        marginLeft: "70%"
    },

    buttonText: {
        fontSize: window.height / 60,
        color: 'white'
    },

    buttonTextCalendario: {
        fontSize: window.height / 40,
        color: 'white'
    },

    containerInterno: {
        width: '80%',
    },
    scroll: {
        height: "60%",
    },
    containerBotao: {
        width: "60%",
        alignSelf: 'center'
    }
});


