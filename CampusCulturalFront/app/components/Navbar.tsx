//  Componente da NavBar Superior
//  
//  Esse Componente aparece nas telas Home, Calendario e Perfil como Cabeçalho, mas a Navbar so aparece na tela de Home
//  Ele mostra o nome da tela que o usuário esta no momento e nas telas de home e calendario ela possui uma lupa para filtrar os eventos por nome
//
import { useRef, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, StatusBar, Dimensions, TextInput } from "react-native";

export default function Navbar(props: { title: string, links: boolean, pesquisa?: boolean, setPesquisa?: React.Dispatch<React.SetStateAction<string>>, selecionado?: number, setSelecionado?: React.Dispatch<React.SetStateAction<number>> }) {
  const logo = require("../../assets/logo.png");
  const lupa = require("../../assets/lupa.png");
  const inputRef = useRef(null)
  const [pesquisando, setPesquisando] = useState(false);

  return (
    <>
      {/*Barra de Notificações*/}
      <StatusBar
        backgroundColor="#8A60FF"
        barStyle="light-content"
      />
      <View style={styles.container}>
        {/*Cabeçalho*/}
        <Image style={styles.imagem} source={logo} />
        <Text style={styles.titulo}>{props?.title}</Text>
        {/*Pesquisa*/}
        <TouchableOpacity style={props.pesquisa ? pesquisando? {...styles.pesquisa, backgroundColor: "#A180FF"} : {...styles.pesquisa} : { display: "none" }} onPress={()=> {setPesquisando(true); inputRef.current.focus()}}>
          <TextInput
            style={styles.input}
            ref={inputRef}
            placeholderTextColor="#8A60FF"
            autoFocus={pesquisando}
            onChange={(e) => props.setPesquisa(e.nativeEvent.text)}
          />
          <Image style={styles.lupa} source={lupa} />
        </TouchableOpacity>

      </View>{/*NavBar*/}
      <View style={props.links === false ? styles.naobarra : styles.barra}>
        <TouchableOpacity onPress={() => props.setSelecionado(0)}>
          <Text style={props.selecionado === 0 ? styles.selecionado : styles.link}>Próximos Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.setSelecionado(1)}>
          <Text style={props.selecionado === 1 ? styles.selecionado : styles.link}>Eventos Inscritos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.setSelecionado(2)}>
          <Text style={props.selecionado === 2 ? styles.selecionado : styles.link}>Eventos Finalizados</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

// Estilização dos Componentes
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#8A60FF",
    width: window.width
  },
  imagem: {
    width: window.width / 10,
    height: window.width / 10,
    marginVertical: 14,
    marginLeft: 15
  },
  titulo: {
    marginLeft: 5,
    fontSize: window.width / 20,
    fontWeight: "bold",
    color: '#FFF',
    width: "30%"
  },
  pesquisa: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    width: window.width / 2,
    paddingVertical: 2
  },
  lupa: {
    width: window.width / 10,
    height: window.width / 10,
  },
  input: {
    marginLeft: "5%",
    width: "75%",
    color: "#FFF"
  },
  barra: {
    backgroundColor: "#1D065D",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  naobarra: {
    display: "none"
  },
  link: {
    color: "#8A60FF",
    fontSize: window.width / 30
  },
  selecionado: {
    color: "#FFF",
    fontSize: window.width / 30
  }
});
