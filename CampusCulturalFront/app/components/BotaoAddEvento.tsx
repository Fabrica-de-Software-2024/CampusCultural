//  Componente do Botão de Adicionar Evento
//
//  Esse componente é aparece nas telas Home, Calendario e Perfil somente quando o usuário tem permissão para adicionar Eventos
//  Quando apertado ele chama o Modal de Criação de Eventos
//
import { useState } from "react";
import { TouchableOpacity, Image, Modal, Dimensions } from "react-native";
import AdicionarEvento from "./AdicionarEventoPopup";

export default function BotaoAddEvento() {

    const icone = require("../../assets/add_evento.png");

    const [modalCreate, setModalCreate] = useState(false)

    const window = Dimensions.get('window');

    return (
        <>  
            {/*Popup de Adicionar Evento*/}
            <Modal style={{ width: "90%" }} animationType="slide" transparent={true} visible={modalCreate} onRequestClose={() => setModalCreate(false)} >
                <AdicionarEvento setModal={setModalCreate} />
            </Modal>
            {/*Botão*/}
            <TouchableOpacity style={{ position: "absolute", right: 2, bottom: "10%", zIndex: 50 }} onPress={() => setModalCreate(true)}>
                <Image source={icone} style={{ width: window.width / 5, height: window.width / 5 }} />
            </TouchableOpacity>
        </>
    )
}