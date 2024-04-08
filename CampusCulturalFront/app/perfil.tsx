import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const Perfil = () => {
  const usuario = require('../../assets/usuario.png');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.imagem} source={usuario} />
        <Text style={styles.nome}>Lucas dos Santos</Text>
      </View>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Engenharia de Software</Text>
        <Text style={styles.descricao}>
          teste
        </Text>
      </View>
      <View style={styles.rodape}>
        <TouchableOpacity style={styles.botao} onPress={() => alert('Notificações')}>
          <Text style={styles.textoBotao}>Notificações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => alert('Configurações')}>
          <Text style={styles.textoBotao}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => alert('Meus certificados')}>
          <Text style={styles.textoBotao}>Meus certificados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => alert('Fale conosco')}>
          <Text style={styles.textoBotao}>Fale conosco</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#8A60FF',
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  nome: {
    color: '#fff',
    fontSize: 20,
    flex: 1,
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  titulo: {
    color: '#8A60FF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descricao: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  rodape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  botao: {
    width: '48%',
    backgroundColor: '#8A60FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 16,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Perfil;