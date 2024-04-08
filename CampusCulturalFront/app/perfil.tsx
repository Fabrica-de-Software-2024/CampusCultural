import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; // Importando ícones FontAwesome
import Navbar from "./components/Navbar";
import Rodape from "./components/Rodape";

const Perfil = ({ navigation }) => { // Recebendo a propriedade de navegação
  const userData = {
    name: "Lucas dos Santos",
    course: "Engenharia de Software",
    photo: "https://via.placeholder.com/150",
  };

  const navigateToNotifications = () => {
    navigation.navigate('NotificationsScreen'); // Navegar para a tela de notificações
  };

  const navigateToSettings = () => {
    navigation.navigate('SettingsScreen'); // Navegar para a tela de configurações
  };

  const navigateToCertificates = () => {
    navigation.navigate('CertificatesScreen'); // Navegar para a tela de certificados
  };

  const navigateToContact = () => {
    navigation.navigate('ContactScreen'); // Navegar para a tela de contato
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
          <TouchableOpacity style={styles.optionContainer} onPress={navigateToNotifications}>
            <FontAwesome name="bell" size={24} color="#8A60FF" style={styles.icon} />
            <Text style={styles.option}>Notificações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer} onPress={navigateToSettings}>
            <FontAwesome name="cog" size={24} color="#8A60FF" style={styles.icon} />
            <Text style={styles.option}>Configurações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer} onPress={navigateToCertificates}>
            <FontAwesome name="certificate" size={24} color="#8A60FF" style={styles.icon} />
            <Text style={styles.option}>Meus Certificados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer} onPress={navigateToContact}>
            <FontAwesome name="envelope" size={24} color="#8A60FF" style={styles.icon} />
            <Text style={styles.option}>Fale Conosco</Text>
          </TouchableOpacity>
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
    justifyContent: "flex-start",
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
    alignItems: "flex-start", // Ajuste para alinhar as opções à esquerda
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  option: {
    fontSize: 18,
    color: "#8A60FF",
  },
});

export default Perfil;
