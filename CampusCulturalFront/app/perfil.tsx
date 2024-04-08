import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const Perfil = () => {
  const usuario = require('../../assets/usuario.png');
  const editar = require('../../assets/editar.png');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.imagem} source={usuario} />
        <Text style={styles.nome}>Cláudio UTFPR</Text>
        <TouchableOpacity style={styles.botaoEditar}>
          <Image style={styles.icone} source={editar} />
        </TouchableOpacity>
      </View>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Sobre mim</Text>
        <Text style={styles.descricao}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor.
        </Text>
      </View>
      <View style={styles.rodape}>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Sair</Text>
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
  botaoEditar: {
    width: 24,
    height: 24,
  },
  icone: {
    width: 24,
    height: 24,
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  botao: {
    backgroundColor: '#8A60FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Perfil;