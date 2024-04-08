import { router } from "expo-router"
import { Button, StatusBar, Text } from "react-native"
import Navbar from "./components/Navbar"
import { useState } from "react";
import Rodape from "./components/Rodape";

export default function Index() {

    const [eventosSelecionado, setEventosSelecionado] = useState(0);

    return (
        <>
            <Navbar title={"Início"} links={true} selecionado={eventosSelecionado} setSelecionado={setEventosSelecionado} />
            <Text>teste</Text>
            <Button title="login" onPress={() => router.navigate("/login")}></Button>
            <Rodape selecionado={0}/>
        </>
    )
}