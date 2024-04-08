import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Navbar from "./components/Navbar";
import Rodape from "./components/Rodape";

const Perfil = () => {
  const userData = {
    name: "Lucas dos Santos",
    course: "Engenharia de Software",
    photo: "https://via.placeholder.com/150",
  };

  return (
    <>
      <Navbar title="Perfil" links={false} />
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image source={{ uri: userData.photo }} style={styles.photo} />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.course}>{userData.course}</Text>
        </View>
        <View style={styles.options}>
          <Text style={styles.option}>Notificações</Text>
          <Text style={styles.option}>Configurações</Text>
          <Text style={styles.option}>Meus Certificados</Text>
          <Text style={styles.option}>Fale Conosco</Text>
        </View>
      </View>
      <Rodape selecionado={3} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Alinhar o conteúdo no topo
    backgroundColor: "#fff",
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  course: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 10,
  },
  options: {
    alignItems: "center",
  },
  option: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
});

export default Perfil;
