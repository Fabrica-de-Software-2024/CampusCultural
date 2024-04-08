import { router } from "expo-router"
import { Button, Text } from "react-native"
import Navbar from "./components/Navbar"
import { useState } from "react";

export default function Index(){

    const [selecionado, setSelecionado] = useState(0);

    return(
        <>
            <Navbar title={"Início"} selecionado={selecionado} setSelecionado={setSelecionado} />
            <Text>teste</Text>
            <Button title="login" onPress={()=>router.navigate("/login")}></Button>
        </>
    )
}