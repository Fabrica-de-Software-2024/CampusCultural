//  Tela Inicial do Aplicativo
//  
//  Nessa tela o usuário pode ver os proximos eventos, eventos em que ele se inscreveu e eventos ja finalizados
//  Ele tambem pode procurar os eventos pelo nome ao clicar na Lupa
//  
import { router } from "expo-router"
import { Button, ScrollView, StatusBar, Text, TouchableOpacity, Image, View, ActivityIndicator, Dimensions } from "react-native"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react";
import Rodape from "./components/Rodape";
import EventoCard, { Evento } from "./components/EventoCard";
import BotaoAddEvento from "./components/BotaoAddEvento";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "./perfil";
import { back_url } from "../api_link";

// Requisição dos eventos
export async function puxaEventos() {
    const resp = await fetch(`${back_url}/evento`);
    const resp2 = await resp.json();
    console.log(resp2)
    return resp2;
}

// Requisição das inscrições do Usuário
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

    // Requisição dos dados do Usuário e chamada das outras requisições
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
                dados?.is_professor ? //    Botão de adicionar evento
                    <BotaoAddEvento />
                    :
                    <></>
            }
            {/* Codigo comentado: Botão de filtro de eventos (Removido do MVP)

                <TouchableOpacity style={{ position: "absolute", right: "3%", top: "20%", display: "none" }}>
                    <Image source={filtro} />
                </TouchableOpacity>
            */}
            {
                carregado ? // Area de Scroll dos eventos
                    <ScrollView style={{ marginBottom: (Dimensions.get("screen").height / 10) }}>
                        {
                            eventosSelecionado === 0 ?  // Seção de Proximos Eventos
                                eventos.map((i: Evento, index: number) => {
                                    if (((Date.now() - 7200000) <= (i.data_evento as unknown as number)) && i.nome_evento.toLowerCase().includes(pesquisa.toLowerCase())) {
                                        return (
                                            <EventoCard key={index} data={i} previa={false} />
                                        )
                                    }
                                })
                                :
                                eventosSelecionado === 1 ?  //  Seção de Eventos Inscritos
                                    eventos.map((i, index) => {
                                        if ((inscricoes.map((j) => j.id_inscricao_evento).includes(i.id_evento)) && i.nome_evento.toLowerCase().includes(pesquisa.toLowerCase())) {
                                            return (
                                                <EventoCard key={index} data={i} previa={false} />
                                            )
                                        }
                                    })
                                    :
                                    eventosSelecionado === 2 ?  //  Seção de Eventos Finalizados

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
                    <View style={{ flex: 1, justifyContent: "center" }}>{/*Carregamento*/}
                        <ActivityIndicator size={"large"} color={"#8A60FF"} />
                    </View>
            }
            <Rodape selecionado={1} />
        </>
    )
}