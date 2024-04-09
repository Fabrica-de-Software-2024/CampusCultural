import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Navbar from "./components/Navbar";
import Rodape from "./components/Rodape";

const Perfil = ({ navigation }) => {
  const logo = require("../assets/logo.png");
  const sino = require("../assets/sino.png");
  const engrenagem = require("../assets/engrenagem.png");
  const certificado = require("../assets/certificado.png");
  const chat = require("../assets/chat.png");


  return (
    <>
      <Navbar title="Minha Conta" links={false} />

      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image source={logo} style={styles.imagem} resizeMode="cover" />
          <Text style={styles.nome}>sla</Text>
          <Text style={styles.curso}>sla</Text>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity style={styles.button}>
            <Image source={sino} style={styles.icon} resizeMode="cover" />
            <Text style={styles.buttonText}>Notificações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image source={engrenagem} style={styles.icon} resizeMode="cover" />
            <Text style={styles.buttonText}>Configurações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image source={certificado} style={styles.icon} resizeMode="cover" />
            <Text style={styles.buttonText}>Meus certificados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image source={chat} style={styles.icon} resizeMode="cover" />
            <Text style={styles.buttonText}>Fale conosco</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Rodape selecionado={3} />
    </>
  );
};

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    top: "5%",
  },
  textContainer: {
    top: "15%",
    width: "70%",
    marginHorizontal: "15%"
  },
  userInfo: {
    alignItems: "center",
  },
  imagem: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#8A60FF",
  },
  button: {
    color: "#8A60FF",
    flexDirection: "row",
    marginTop: "5%",
    marginLeft:"0%",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    color: "#8A60FF",
    textDecorationLine: "underline",
  },
  nome: {
    fontSize: 21,
    textAlign: "center",
    fontWeight: "500",
  },
  curso: {
    fontSize: 19,
    textAlign: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default Perfil;
