//  Componente do Rodapé
//  
//  Esse componente aparece nas telas Home, Calendário, Perfil e Evento
//  Ele possui 3 botões que podem ser usados para navegar entre as telas
//  
import { router } from "expo-router";
import { Image, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

export default function Rodape(props: { selecionado: number }) {
  const home = require("../../assets/casa.png");
  const calendario = require("../../assets/calendario.png");
  const perfil = require("../../assets/pessoa.png");
  const home_branco = require("../../assets/casa_branco.png");
  const calendario_branco = require("../../assets/calendario_branco.png");
  const perfil_branco = require("../../assets/pessoa_branco.png");

  return (
    <>
      <View style={styles.container}>
        {/*Botão Home*/}
        <TouchableOpacity style={props.selecionado === 1 ? styles.touchableAtivado : styles.touchable} onPress={() => router.navigate("/home")}>
          <Image style={styles.imagem} source={props.selecionado === 1 ? home_branco : home} />
        </TouchableOpacity>
        {/*Botão Calendário*/}
        <TouchableOpacity style={props.selecionado === 2 ? styles.touchableAtivado : styles.touchable} onPress={() => router.navigate("/calendario")}>
          <Image style={styles.imagem} source={props.selecionado === 2 ? calendario_branco : calendario} />
        </TouchableOpacity>
        {/*Botão Perfil*/}
        <TouchableOpacity style={props.selecionado === 3 ? styles.touchableAtivado : styles.touchable} onPress={() => router.navigate("/perfil")}>
          <Image style={styles.imagem} source={props.selecionado === 3 ? perfil_branco : perfil} />
        </TouchableOpacity>
      </View>
    </>
  )
}

// Estilização dos Componentes
const window = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderTopColor: "#6B3BF4",
    borderTopWidth: 1,
    justifyContent: "space-between",
    zIndex: 100,
    height: window.height / 10,
  },
  touchable: {
    display: "flex",
    width: "33%",
    height: window.height / 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center"
  },
  touchableAtivado: {
    display: "flex",
    width: "33%",
    height: window.height / 10,
    backgroundColor: "#6B3BF4",
    justifyContent: "center",
    alignItems: "center"
  },
  imagem: {
    width: window.width / 10,
    height: window.width / 10,
    marginVertical: 14,
  },
});
