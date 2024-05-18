import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Touchable, Image, TouchableOpacity, ScrollView } from 'react-native';
import EventoCard, { Evento, professor } from './EventoCard';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdicionarEvento(props: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) {

    const iconBanner = require("../../assets/escolher_imagem.png")

    const [calendario, setCalendario] = useState(0);

    const [dataEvento, setDataEvento] = useState(new Date(Math.floor(Date.now() / 1000) * 1000))

    const [nomeImagem, setNomeImagem] = useState("Selecionar...")

    const [dataImage, setDataImage] = useState("")

    const [data, setData] = useState<Evento>(
        {
            professor_evento: "",
            nome_evento: "",
            sub_evento: "",
            local_evento: "",
            data_evento: Date.now().toString(),
            descricao_evento: "",
        }
    )

    const mudaData = (event, data) => {
        console.log(data)
        setDataEvento(data);
        setCalendario(2);
    }

    const mudaHora = (event, data) => {
        console.log(data)
        let _data = new Date(dataEvento.getFullYear(), dataEvento.getMonth(), dataEvento.getDate(), data.getHours(), data.getMinutes())
        setDataEvento(_data);
        setData({ ...data, data_evento: _data.getTime() })
        setCalendario(0);
    }

    useEffect(() => {
        AsyncStorage.getItem('login').then(async (resp) => {
            let _dados = JSON.parse(resp);
            setData({ ...data, professor_evento: _dados.id_usuario })
        })
    }, [data.professor_evento])

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

    async function adicionar(data: Evento, imagem: string, setModal: React.Dispatch<React.SetStateAction<boolean>>) {
        AsyncStorage.getItem('login').then(async (resp) => {
            let _dados = JSON.parse(resp);
            const body = JSON.stringify({
                "professor_evento": _dados?.id_usuario,
                "nome_evento": data.nome_evento,
                "sub_evento": data.sub_evento,
                "data_evento": data.data_evento,
                "descricao_evento": data.descricao_evento,
                "imagemstr": imagem
            })
            try {
                const resp2 = await fetch("https://campus-cultural.vercel.app/evento", {
                    method: 'POST',
                    body: body,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                console.log(await resp2.json());
            } catch (e) { console.log(e) }
            setModal(false);
        })
    }

    return (

        <View style={styles.body}>
            {
                calendario === 1 ?
                    <DateTimePicker mode='date' value={dataEvento} onChange={mudaData} />
                    :
                    calendario === 2 ?
                        <DateTimePicker mode='time' value={dataEvento} is24Hour={true} onChange={mudaHora} />
                        :
                        <></>
            }
            <View style={styles.container}>
                <View style={styles.imagem}>
                    <Image source={require('../../assets/mais_circulado.png')}></Image>
                </View>

                <Text style={{ margin: 'auto', fontWeight: 'bold', marginTop: '12%' }}><Text style={{ color: '#6B3BF4' }}>Adicionar</Text> Evento</Text>

                <View style={styles.containerInterno}>
                    <ScrollView style={styles.scroll}>

                        <Text style={styles.textoRoxo}>
                            Aqui você pode criar e editar eventos de maneira fácil! Preencha os campos abaixo:
                        </Text>
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
                        <Text style={styles.textoRoxo}>Prévia do evento:</Text>
                        <EventoCard data={data} previa={true} image={dataImage} />
                    </ScrollView>
                    <View style={styles.containerBotao}><TouchableOpacity style={styles.button} onPress={() => adicionar(data, dataImage, props.setModal)}><Text style={{ color: 'white' }}>Concluir</Text></TouchableOpacity></View>
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

    texto: {
        color: '#838181',
        fontSize: 10
    },

    textoRoxo: {
        marginVertical: '8%',
        fontSize: 14,
        lineHeight: 16.94,
        color: '#6B3BF4',
        fontWeight: "700",
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
        marginBottom: 5,
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
        height: "75%",
    },
    containerBotao: {
        width: "100%",
    }
});