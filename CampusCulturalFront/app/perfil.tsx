import { router } from "expo-router"
import { Button, StatusBar, Text } from "react-native"
import Navbar from "./components/Navbar"
import { useState } from "react";
import Rodape from "./components/Rodape";

export default function Perfil() {

    return (
        <>
            <Navbar title={"Início"} links={false}/>
            <Rodape selecionado={3}/>
        </>
    )
}