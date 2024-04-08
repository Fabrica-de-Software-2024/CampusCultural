import { Link } from "expo-router";
import { useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Navbar(props: { title: string, selecionado: number, setSelecionado: React.Dispatch<React.SetStateAction<number>> }) {
  const logo = require("../../assets/logo.png");
  const lupa = require("../../assets/lupa.png");

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.imagem} source={logo} />
        <Text style={styles.titulo}>{props?.title}</Text>
        <TouchableOpacity >
          <Image style={styles.lupa} source={lupa} />
        </TouchableOpacity>
      </View>
      <View style={styles.barra}>
        <TouchableOpacity onPress={()=> props.setSelecionado(0)}>
          <Text style={props.selecionado===0? styles.selecionado: styles.link}>Próximos Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> props.setSelecionado(1)}>
          <Text style={props.selecionado===1? styles.selecionado: styles.link}>Eventos Inscritos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> props.setSelecionado(2)}>
          <Text style={props.selecionado===2? styles.selecionado: styles.link}>Eventos Finalizados</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#8A60FF",
  },
  imagem: {
    width: 54,
    height: 54,
    marginVertical: 14,
    marginLeft: 15
  },
  titulo: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: '#FFF',
    width: "65%"
  },
  lupa: {
    width: 34,
    height: 34,
    right: 0
  },
  barra: {
    backgroundColor: "#1D065D",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  link: {
    color: "#8A60FF",
    fontSize: 12
  },
  selecionado:{
    color: "#FFF",
    fontSize: 12
  }
});
