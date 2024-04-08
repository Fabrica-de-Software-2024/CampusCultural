import { router } from "expo-router"
import { Button, ScrollView, StatusBar, Text } from "react-native"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react";
import Rodape from "./components/Rodape";
import EventoCard from "./components/EventoCard";

async function puxaEventos(id?: number) {
    const resp = await fetch("https://campus-cultural.vercel.app/evento");
    const resp2 = await resp.json();
    console.log(resp2)
    return resp2;
}

export default function Home() {

    const [eventosSelecionado, setEventosSelecionado] = useState(0);
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        puxaEventos().then((resp) => setEventos(resp));
    }, [])


    return (
        <>
            <Navbar title={"Início"} links={true} selecionado={eventosSelecionado} setSelecionado={setEventosSelecionado} />
            <ScrollView style={{marginBottom: 40}}>
                {
                    eventos.map((i, index) => {
                        return (
                            <EventoCard key={index} data={i} />
                        )
                    })
                }
            </ScrollView>
            <Rodape selecionado={1} />
        </>
    )
}