//  Tela de Visualização completa de um Evento.
//  
//  Essa tela Exibe um evento em detalhes
//  e permite que o usuário se inscreva ou se desinscreva dele
//  
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert, ActivityIndicator, Dimensions } from "react-native";
import Navbar from '../components/Navbar';
import Rodape from '../components/Rodape';
import { Evento as EventoDTO, professor } from '../components/EventoCard';
import EditarEvento from '../components/EditarEventoPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { back_url } from '../../api_link';

// Requisição dos dados do Evento e do seu Banner
export async function puxaEvento(id: number, setImagem: React.Dispatch<React.SetStateAction<string>>) {
    try {
        const resp = await fetch(`${back_url}/evento/${id}`);
        const resp2 = await resp.json();
        const resp3 = await fetch(`${back_url}/imagem/${resp2.imagem}`);
        const resp4 = await resp3.json();

        let _imagem = await resp4?.imagem;
        setImagem(_imagem);
        return resp2;
    } catch (err) { console.log(err) }
}

export default function Evento() {
    const params = useLocalSearchParams();

    const [dados, setDados] = useState<EventoDTO>()

    const [prof, setProf] = useState({ nome: "", imagem: "", atributo: "" })

    const [imagem, setImagem] = useState(null)

    const [inscrito, setInscrito] = useState(false);

    const [carregado, setCarregado] = useState(false)

    const [usuario, setUsuario] = useState({ usuario: "", inscricao: "", is_professor: false });

    const icone = require("../../assets/icone_evento.png");
    const banner = require("../../assets/evento_card_1.png");
    const editar = require("../../assets/editar.png");
    const olho = require("../../assets/olho_aberto.png");
    const compartilhar = require("../../assets/compartilhar.png");
    const calendario = require("../../assets/mini_calendario.png");
    const certificado = require("../../assets/certificado_quadrado.png")

    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [difString, setDiffString] = useState("");
    const [modalEdit, setmodalEdit] = useState(false);

    // Função que faz ou remove a inscrição
    function gereinscricao() {
        console.log(inscrito)

        console.log(usuario)
        if (inscrito) {
            try {
                fetch(`${back_url}/inscricao/${usuario.inscricao}`, { method: "DELETE" }).then(() => router.replace(`/evento/${dados.id_evento}`))
            } catch (err) { console.log(err) }
        } else {

            try {
                AsyncStorage.getItem('login').then(async (resp2) => {
                    let _dados = await JSON.parse(resp2)

                    let body = JSON.stringify({
                        "id_inscricao_usuario": _dados.id_usuario,
                        "id_inscricao_evento": dados.id_evento,
                    })

                    console.log(body)
                    fetch(`${back_url}/inscricao`, {
                        method: "POST",
                        body: body,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }

                    }).then(() => router.replace(`/evento/${dados.id_evento}`))
                })

            } catch (err) { console.log(err) }

        }
    }

    useEffect(() => {
        try {
            // Requisição do evento
            puxaEvento(params.id as unknown as number, setImagem).then(async (resp) => {
                setDados(resp);
                // Requisição do Criador do Evento
                setProf(await professor(resp.professor_evento));
                // Requisição das informações do usuário para verificar se ele esta inscrito no evento
                AsyncStorage.getItem('login').then(async (resp2) => {
                    let _dados = JSON.parse(resp2)
                    let inscrito = await fetch(`${back_url}/inscricao/usuario/${_dados?.id_usuario}/${resp.id_evento}`)

                    if (inscrito.status === 200) {
                        let inscrito2 = await inscrito.json();
                        setUsuario({ usuario: _dados.id_usuario, inscricao: inscrito2.id_evento_inscricao, is_professor: _dados.is_professor });
                        setInscrito(true)
                    }
                    else {
                        setUsuario({ usuario: _dados.id_usuario, inscricao: "", is_professor: _dados.is_professor });
                        setInscrito(false)
                    }
                })
                // Calculo de quanto tempo falta para o evento ou se ja acabou e definição das string vermelha de quanto tempo falta
                let datanum = resp.data_evento as unknown as number;
                let _data = new Date(Math.floor(datanum / 1000) * 1000);
                setData(_data.toLocaleString("pt-BR", { dateStyle: "long" }));
                setHorario(_data.toLocaleString("pt-BR", { timeStyle: 'short' }));
                var diferenca = datanum - Date.now();
                if (diferenca > (3600000 * 24)) {
                    setDiffString(`Restam ${Math.floor((diferenca / 3600000) / 24)} dias e ${Math.floor((diferenca / 3600000) - (Math.floor((diferenca / 3600000) / 24) * 24))} horas`)
                }
                else if (diferenca > 0) { setDiffString(`Restam ${Math.floor((diferenca / 3600000))} horas e ${Math.floor((diferenca / 60000) - (Math.floor((diferenca / 3600000)) * 60))} minutos`) }
                else if (Math.sqrt(diferenca * diferenca) < (2 * 60 * 60 * 1000)) { setDiffString(`Evento em Andamento!`) }
                else { setDiffString(`Esse evento ja acabou.`) }
            }).then(() => setCarregado(true));
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <>
            <Navbar title={"Evento"} links={false} />



            {/*Modal de Edição do Evento*/}
            <Modal style={styles.modal} animationType="slide" transparent={true} visible={modalEdit} onRequestClose={() => setmodalEdit(false)} >
                <EditarEvento evento={dados} setModal={setmodalEdit} />
            </Modal>
            {
                carregado ?

                    <>

                        {// Banner do Evento
                            imagem != "" &&
                            <Image source={{ uri: imagem }} style={styles.imagem} resizeMode='cover' />
                        }
                        <ScrollView style={styles.scroll}>

                            {/*Titulo, foto do criador e botões de ação do evento*/}
                            <View style={styles.containerTitulo}>
                                <Image style={styles.icone} source={{ uri: prof.imagem }} />
                                <Text style={styles.titulo}>{dados?.nome_evento}</Text>
                                <View style={styles.containerBotoes}>
                                    {
                                        usuario?.is_professor && <TouchableOpacity onPress={() => setmodalEdit(true)}>
                                            <Image style={styles.iconezin} source={editar} />
                                        </TouchableOpacity>
                                    }
                                    <TouchableOpacity>
                                        <Image style={styles.iconezin} source={olho} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={styles.iconezin} source={compartilhar} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/*Informações gerais do evento*/}
                            <View style={styles.containerInfo}>
                                <View style={styles.containerData}><Text style={styles.textInfo}>{data}</Text><Image style={styles.iconezin} source={calendario} /></View>
                                <Text style={styles.textInfo}>Local: {dados?.local_evento}</Text>
                                <Text style={styles.textInfo}>Horário: {horario}</Text>
                                <Text style={styles.textTempo}>{difString}</Text>
                                <View style={styles.containerProf}>
                                    <Image style={styles.icone} source={{ uri: prof.imagem }} />
                                    <View style={styles.containerProfDados}>
                                        <Text style={styles.profNome}>{prof.nome}</Text>
                                        <Text style={styles.profLabel}>{prof.atributo} - UTFPR</Text>
                                    </View>
                                </View>
                                <View style={styles.containerCertificado}>
                                    <Image style={{ ...styles.icone, borderRadius: 0 }} source={certificado} />
                                    <Text style={styles.certificadoText}>Emissão de certificado</Text>
                                </View>

                            </View>
                            {/*Botão de Inscrever-se ou Cancelar Inscrição do evento*/}
                            <View style={styles.containerInscricao}>
                                <TouchableOpacity style={styles.botaoInscricao} onPress={() => gereinscricao()}>
                                    <Text style={styles.textoInscricao}>{inscrito ? "Cancelar Inscrição" : "Inscreva-se"}</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </>
                    :
                    <View style={styles.carregando}>{/*Carregamento*/}
                        <ActivityIndicator size={"large"} color={"#8A60FF"} />
                    </View>
            }
            <Rodape selecionado={0} />
        </>
    )
}


// Estilização dos Componentes
const window = Dimensions.get('screen');

const styles = StyleSheet.create({
    containerTitulo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: "5%"
    },
    imagem: {
        width: "100%",
        aspectRatio: 20 / 9,
    },
    scroll: {
        marginBottom: window.height / 10
    },
    icone: {
        width: window.width / 10,
        height: window.width / 10,
        borderRadius: 9999
    },
    titulo: {
        width: "60%",
        fontSize: window.width / 30,
        fontWeight: '700',
        marginLeft: "3%",
        color: "#6B3BF4"
    },
    containerBotoes: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "22%",
        justifyContent: 'space-between'
    },
    iconezin: {
        width: window.width / 30,
        height: window.width / 30
    },
    containerInfo: {
        width: "80%",
        marginHorizontal: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginVertical: 0
    },
    containerData: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    textInfo: {
        fontSize: window.width / 35,
        fontWeight: "400",
        marginRight: 5,
        marginBottom: 5,
        color: "#838181"
    },
    textTempo: {
        fontSize: window.width / 35,
        fontWeight: "400",
        marginRight: 5,
        marginBottom: 5,
        color: "#F60505"
    },
    containerProf: {
        width: "90%",
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "#838181",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: "25%",
        marginVertical: "4%"
    },
    containerProfDados: {
        marginLeft: "3%"
    },
    profNome: {
        fontSize: window.width / 30,
        fontWeight: '600'
    },
    profLabel: {
        fontSize: window.width / 35,
        color: "#838181"
    },
    containerCertificado: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    certificadoText: {
        marginLeft: "5%",
        fontSize: window.width / 30,
        color: "#838181"
    },
    containerInscricao: {
        height: window.height / 10,
        marginBottom: window.height / 10,
        alignItems: 'flex-start',
    },
    botaoInscricao: {
        width: "50%",
        height: window.height / 10,
        borderRadius: 50,
        marginHorizontal: "25%",
        backgroundColor: "#6B3BF4",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoInscricao: {
        color: "#FFF",
        fontSize: window.width / 20,
        fontWeight: '700'
    },
    modal: {
        width: "90%"
    },
    carregando: {
        flex: 1,
        justifyContent: "center"
    }
})