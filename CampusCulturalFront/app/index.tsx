import { router } from "expo-router"
import { Button, Text } from "react-native"
import Navbar from "./components/Navbar"

export default function Index(){
    return(
        <>
            <Navbar />
            <Text>teste</Text>
            <Button title="login" onPress={()=>router.navigate("/login")}></Button>
        </>
    )
}