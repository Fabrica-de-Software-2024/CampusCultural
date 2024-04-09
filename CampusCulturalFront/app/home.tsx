import { router } from "expo-router"
import { Button, ScrollView, StatusBar, Text, TouchableOpacity, Image } from "react-native"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react";
import Rodape from "./components/Rodape";
import EventoCard, { Evento } from "./components/EventoCard";

export async function puxaEventos(id?: number) {
    const resp = await fetch("https://campus-cultural.vercel.app/evento");
    const resp2 = await resp.json();
    return resp2;
}

export default function Home() {

    const [eventosSelecionado, setEventosSelecionado] = useState(0);
    const [eventos, setEventos] = useState([]);
    const filtro = require("../assets/filtro.png")

    useEffect(() => {
        puxaEventos().then((resp) => setEventos(resp));
    }, [])


    return (
        <>
            <Navbar title={"Início"} links={true} selecionado={eventosSelecionado} setSelecionado={setEventosSelecionado} />
            <TouchableOpacity style={{ position: "absolute", right: "3%", top: "20%" }}>
                <Image source={filtro} />
            </TouchableOpacity>
            <ScrollView style={{ marginVertical: 50 }}>
                {
                    eventosSelecionado === 0 ?
                        eventos.map((i: Evento, index: number) => {
                            if (Date.now() <= Date.parse(i.data_evento)) {
                                return (
                                    <EventoCard key={index} data={i} />
                                )
                            }
                        })
                        :
                        eventosSelecionado === 1 ?
                            eventos.map((i, index) => {
                                return (
                                    <EventoCard key={index} data={i} />
                                )
                            })
                            :
                            eventosSelecionado === 2 ?

                                eventos.map((i, index) => {
                                    if (Date.now() > Date.parse(i.data_evento)) {
                                        return (
                                            <EventoCard key={index} data={i} />
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