import { Image, Text, View, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from "react-native";

export default function Navbar(props: { title: string, links: boolean, selecionado?: number, setSelecionado?: React.Dispatch<React.SetStateAction<number>> }) {
  const logo = require("../../assets/logo.png");
  const lupa = require("../../assets/lupa.png");

  return (
    <>
      <StatusBar
        backgroundColor="#8A60FF"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Image style={styles.imagem} source={logo} />
        <Text style={styles.titulo}>{props?.title}</Text>

        <TouchableOpacity style={props.links? {}:{display: "none"}}>
          <Image style={styles.lupa} source={lupa} />
        </TouchableOpacity>

      </View>
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

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
    width: "65%"
  },
  lupa: {
    width: window.width / 10,
    height: window.width / 10,
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
