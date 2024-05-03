import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native";
import Navbar from '../components/Navbar';
import Rodape from '../components/Rodape';
import { Evento as EventoDTO } from '../components/EventoCard';
import EditarEvento from '../components/EditarEventoPopup';

export async function puxaEvento(id: number) {
    const resp = await fetch(`https://campus-cultural.vercel.app/evento/${id}`);
    const resp2 = await resp.json();
    return resp2;
}

export default function Evento() {
    const params = useLocalSearchParams();

    const [dados, setDados] = useState<EventoDTO>()

    const [inscrito, setInscrito] = useState(false);

    const icone = require("../../assets/icone_evento.png");
    const banner = require("../../assets/evento_card_1.png");
    const editar = require("../../assets/editar.png");
    const olho = require("../../assets/olho_aberto.png");
    const compartilhar = require("../../assets/compartilhar.png");
    const calendario = require("../../assets/mini_calendario.png");
    const certificado = require("../../assets/certificado_quadrado.png")

    const data = new Date(dados?.data_evento);
    const data2 = new Date(data.getTime() + (data.getTimezoneOffset() * 60000)).toLocaleString("pt-BR", { dateStyle: "long" });
    const horario = new Date(data.getTime() + (data.getTimezoneOffset() * 60000)).toLocaleString("pt-BR", { timeStyle: 'short' });
    const diferenca = data.getTime() - Date.now();
    const [difString, setDiffString] = useState("");
    const [modalEdit, setmodalEdit] = useState(false);

    useEffect(() => {
        puxaEvento(params.id as unknown as number).then((resp) => {
            console.log(resp)
            setDados(resp);
            setDiffString(`Restam ${Math.floor((diferenca / 3600000) / 24)} dias e ${Math.floor((diferenca / 3600000) - (Math.floor((diferenca / 3600000) / 24) * 24))} horas`)
        })
        
    }, [params, diferenca])

    return (
        <>
            <Navbar title={"Evento"} links={false} />
            
            <Image source={{uri: dados.imagem}} />

           
            <Modal style={styles.modal} animationType="slide" transparent={true} visible={modalEdit} onRequestClose={() => setmodalEdit(false)} >
                <EditarEvento data={dados} setModal={setmodalEdit}/>
            </Modal>
            <ScrollView>

                <View style={styles.containerTitulo}>
                    <Image source={icone} />
                    <Text style={styles.titulo}>{dados?.nome_evento}</Text>
                    <View style={styles.containerBotoes}>
                        <TouchableOpacity onPress={()=>setmodalEdit(true)}>
                            <Image source={editar} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={olho} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={compartilhar} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerInfo}>
                    <View style={styles.containerData}><Text style={styles.textInfo}>{data2}</Text><Image source={calendario} /></View>
                    <Text style={styles.textInfo}>Local: B4-S5</Text>
                    <Text style={styles.textInfo}>Horário: {horario}</Text>
                    <Text style={styles.textTempo}>{difString}</Text>
                    <View style={styles.containerProf}>
                        <Image source={icone} />
                        <View style={styles.containerProfDados}>
                            <Text style={styles.profNome}>Teste Prof</Text>
                            <Text style={styles.profLabel}>Professor - UTFPR</Text>
                        </View>
                    </View>
                    <View style={styles.containerCertificado}>
                        <Image source={certificado} />
                        <Text style={styles.certificadoText}>Emissão de certificado</Text>
                    </View>

                </View>
                <View style={styles.containerInscricao}>
                    <TouchableOpacity style={styles.botaoInscricao} onPress={() => setInscrito(!inscrito)}>
                        <Text style={styles.textoInscricao}>{inscrito ? "Cancelar Inscrição" : "Inscreva-se"}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <Rodape selecionado={0} />
        </>
    )
}

const styles = StyleSheet.create({
    containerTitulo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: "5%"
    },
    titulo: {
        width: "60%",
        fontSize: 16,
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
    containerInfo: {
        width: "80%",
        marginHorizontal: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingVertical: 2
    },
    containerData: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    textInfo: {
        fontSize: 12,
        fontWeight: "400",
        marginRight: 5,
        marginBottom: 5,
        color: "#838181"
    },
    textTempo: {
        fontSize: 12,
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
        marginVertical: "10%"
    },
    containerProfDados: {
        marginLeft: "3%"
    },
    profNome: {
        fontSize: 16,
        fontWeight: '600'
    },
    profLabel: {
        fontSize: 14,
        color: "#838181"
    },
    containerCertificado: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    certificadoText: {
        marginLeft: "5%",
        fontSize: 16,
        color: "#838181"
    },
    containerInscricao: {
        height: 220,
    },
    botaoInscricao: {
        width: "50%",
        height: 50,
        borderRadius: 50,
        marginHorizontal: "25%",
        backgroundColor: "#6B3BF4",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoInscricao: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: '700'
    },
    modal: {
        width: "90%"
    }
})