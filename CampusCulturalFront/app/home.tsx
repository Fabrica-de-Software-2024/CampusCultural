import { router } from "expo-router"
import { Button, ScrollView, StatusBar, Text, TouchableOpacity, Image } from "react-native"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react";
import Rodape from "./components/Rodape";
import EventoCard, { Evento } from "./components/EventoCard";
import BotaoAddEvento from "./components/BotaoAddEvento";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "./perfil";

export async function puxaEventos() {
    const resp = await fetch("https://campus-cultural.vercel.app/evento");
    const resp2 = await resp.json();
    return resp2;
}

export default function Home() {

    const [dados, setDados] = useState<Usuario>()
    const [eventosSelecionado, setEventosSelecionado] = useState(0);
    const [eventos, setEventos] = useState([]);
    const filtro = require("../assets/filtro.png")

    useEffect(() => {
        AsyncStorage.getItem('login').then(async (resp) => {
            let _dados = JSON.parse(resp)
            setDados({
                "id_usuario": _dados?.studentCode,
                "nome_usuario": _dados?.name,
                "curso_usuario": _dados?.studentCode,
                "is_professor": false,
            });
        })
        puxaEventos().then((resp) => setEventos(resp));
    }, [])


    return (
        <>
            <Navbar title={"Início"} links={true} selecionado={eventosSelecionado} setSelecionado={setEventosSelecionado} />
            {
				dados?.is_professor ?
					<BotaoAddEvento />
					:
					<></>
			}
            <TouchableOpacity style={{ position: "absolute", right: "3%", top: "20%" }}>
                <Image source={filtro} />
            </TouchableOpacity>
            <ScrollView style={{ marginVertical: 50 }}>
                {
                    eventosSelecionado === 0 ?
                        eventos.map((i: Evento, index: number) => {
                            if (Date.now() <= Date.parse(i.data_evento)) {
                                return (
                                    <EventoCard key={index} data={i} previa={false} />
                                )
                            }
                        })
                        :
                        eventosSelecionado === 1 ?
                            eventos.map((i, index) => {
                                return (
                                    <EventoCard key={index} data={i} previa={false} />
                                )
                            })
                            :
                            eventosSelecionado === 2 ?

                                eventos.map((i, index) => {
                                    if (Date.now() > Date.parse(i.data_evento)) {
                                        return (
                                            <EventoCard key={index} data={i} previa={false} />
                                        )
                                    }
                                })
                                :
                                <></>
                }
            </ScrollView>
            <Rodape selecionado={1} />
        </>
    )
}