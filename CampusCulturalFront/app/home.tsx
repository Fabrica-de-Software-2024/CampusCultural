import { router } from "expo-router"
import { Button, ScrollView, StatusBar, Text, TouchableOpacity, Image, View, ActivityIndicator } from "react-native"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react";
import Rodape from "./components/Rodape";
import EventoCard, { Evento } from "./components/EventoCard";
import BotaoAddEvento from "./components/BotaoAddEvento";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "./perfil";
import { back_url } from "../api_link";

export async function puxaEventos() {
    const resp = await fetch(`${back_url}/evento`);
    const resp2 = await resp.json();
    console.log(resp2)
    return resp2;
}

export async function puxaInscricoes(id: string) {
    const resp = await fetch(`${back_url}/inscricao/usuario/${id}`);
    const resp2 = await resp.json();
    console.log(resp2)
    return resp2;
}

export default function Home() {

    const [carregado, setCarregado] = useState(false)
    const [dados, setDados] = useState<Usuario>()
    const [eventosSelecionado, setEventosSelecionado] = useState(0);
    const [eventos, setEventos] = useState([]);
    const [inscricoes, setinscricoes] = useState([])
    const filtro = require("../assets/filtro.png")
    const [pesquisa, setPesquisa] = useState("")

    useEffect(() => {
        AsyncStorage.getItem('login').then(async (resp) => {
            let _dados = JSON.parse(resp)
            setDados({
                "id_usuario": _dados?.id_usuario,
                "nome_usuario": _dados?.nome_usuario,
                "is_professor": _dados?.is_professor,
                "imagem": _dados?.imagem,
                "atributo": _dados?.atributo_usuario
            });
            puxaInscricoes(_dados?.id_usuario).then((resp) => setinscricoes(resp));
        })
        puxaEventos().then((resp) => setEventos(resp)).finally(() => setCarregado(true));

    }, [])


    return (
        <>
            <Navbar title={"Início"} links={true} pesquisa={true} setPesquisa={setPesquisa} selecionado={eventosSelecionado} setSelecionado={setEventosSelecionado} />
            {
                dados?.is_professor ?
                    <BotaoAddEvento />
                    :
                    <></>
            }
            <TouchableOpacity style={{ position: "absolute", right: "3%", top: "20%", display: "none" }}>
                <Image source={filtro} />
            </TouchableOpacity>
            {
                carregado ?
                    <ScrollView>
                        {
                            eventosSelecionado === 0 ?
                                eventos.map((i: Evento, index: number) => {
                                    if ((Date.now() <= (i.data_evento as unknown as number)) && i.nome_evento.toLowerCase().includes(pesquisa.toLowerCase())) {
                                        return (
                                            <EventoCard key={index} data={i} previa={false} />
                                        )
                                    }
                                })
                                :
                                eventosSelecionado === 1 ?
                                    eventos.map((i, index) => {
                                        if ((inscricoes.map((j) => j.id_inscricao_evento).includes(i.id_evento)) && i.nome_evento.toLowerCase().includes(pesquisa.toLowerCase())) {
                                            return (
                                                <EventoCard key={index} data={i} previa={false} />
                                            )
                                        }
                                    })
                                    :
                                    eventosSelecionado === 2 ?

                                        eventos.map((i, index) => {
                                            if ((Date.now() > (i.data_evento as unknown as number)) && i.nome_evento.toLowerCase().includes(pesquisa.toLowerCase())) {
                                                return (
                                                    <EventoCard key={index} data={i} previa={false} />
                                                )
                                            }
                                        })
                                        :
                                        <></>
                        }
                    </ScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size={"large"} color={"#8A60FF"} />
                    </View>
            }
            <Rodape selecionado={1} />
        </>
    )
}