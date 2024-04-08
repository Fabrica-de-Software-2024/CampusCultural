import React from "react";
import { router } from "expo-router"
import { Button, StatusBar, Text, View, Image, StyleSheet } from "react-native"
import Navbar from "./components/Navbar"
import { useState } from "react";
import Rodape from "./components/Rodape";


const ProfileScreen = () => {
  const userData = {
    name: "Lucas dos Santos",
    course: "Engenharia de Software",
    photo: "https://via.placeholder.com/150",
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.photo }} style={styles.photo} />
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.course}>{userData.course}</Text>
      <Text style={styles.option}>Notificações</Text>
      <Text style={styles.option}>Configurações</Text>
      <Text style={styles.option}>Meus Certificados</Text>
      <Text style={styles.option}>Fale Conosco</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  course: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 10,
  },
  option: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
});

export default ProfileScreen;
