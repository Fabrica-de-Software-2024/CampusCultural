import { useState } from "react";
import { TouchableOpacity, Image, Modal } from "react-native";
import AdicionarEvento from "./AdicionarEventoPopup";

export default function BotaoAddEvento() {

    const icone = require("../../assets/add_evento.png");

    const [modalCreate, setModalCreate] = useState(false)

    return (
        <>
            <Modal style={{width: "90%"}} animationType="slide" transparent={true} visible={modalCreate} onRequestClose={() => setModalCreate(false)} >
                <AdicionarEvento setModal={setModalCreate}/>
            </Modal>
            <TouchableOpacity style={{ position: "absolute", right: 2, bottom: "10%", zIndex: 50 }} onPress={()=>setModalCreate(true)}>
                <Image source={icone} />
            </TouchableOpacity>
        </>
    )
}