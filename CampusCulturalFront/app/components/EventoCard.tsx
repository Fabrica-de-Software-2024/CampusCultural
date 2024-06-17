//  Componente de Card de Evento
//
//  Esse Componente aparece na tela Home e no Popup de Criação de Eventos como uma Prévia
//  Na tela de Home quando é pressionado redireciona para o Evento
//
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { back_url } from "../../api_link";

// Declaração do Tipo Evento
export type Evento = {
  "id_evento"?: number,
  "professor_evento": string,
  "nome_evento": string,
  "sub_evento": string,
  "local_evento": string,
  "data_evento": string,
  "imagem"?: number,
  "descricao_evento": string
}

// Requisição do Banner do Evento
export async function pegaBanner(id: number) {
  const respbanner = await fetch(`${back_url}/imagem/${id}`);
  const respbanner2 = await respbanner.json();
  return respbanner2.imagem;
}

// Requisição do Criador do Evento
export async function professor(id: string) {
  const respprof = await fetch(`${back_url}/usuario/${id}`);
  const respprof2 = await respprof.json();
  const respimg = await fetch(`${back_url}/imagem/${respprof2.imagem}`);
  const respimg2 = await respimg.json();
  return { nome: respprof2.nome_usuario, imagem: respimg2.imagem as string, atributo: respprof2.atributo_usuario }
}

export default function EventoCard(props: { data: Evento, previa: boolean, image?: string }) {
  const icone = require("../../assets/icone_evento.png");
  const calendario = require("../../assets/mini_calendario.png");
  const banner = require(`../../assets/evento_card_1.png`);

  const [imagem, setImagem] = useState("")

  const [prof, setProf] = useState({ nome: "", imagem: "" })

  const [carregado, setCarregado] = useState(false)

  const data = new Date(Math.floor(props.data.data_evento as unknown as number / 1000) * 1000);
  const data2 = new Date(data.getTime()).toLocaleString("pt-BR", { weekday: "short", dateStyle: "full", timeStyle: "short" });

  // Chamada das Requisições
  useEffect(() => {
    setCarregado(false);
    pegaBanner(props.data.imagem)
      .then((resp) => setImagem(resp))
      .then(() => professor(props.data.professor_evento)
        .then((resp) => setProf(resp)))
      .finally(() => setCarregado(true));
  }, [props])

  if (carregado) {
    return (
      <TouchableOpacity onPress={props.previa ? () => { } : () => router.replace(`/evento/${props.data.id_evento}`)} style={styles.container}>
        {/*Foto do Criador e Nome do Evento*/}
        <View style={styles.container_nome}>
          <Image source={{ uri: prof.imagem }} style={props.previa ? styles.icone_previa : styles.icone} />
          <Text style={props.previa ? styles.tituloPrevia : styles.titulo}>{props.data.nome_evento == "" ? "Titulo do evento" : props.data.nome_evento}</Text>
        </View>
        {/*Informações Basicas do Evento*/}
        <View style={styles.container_info}>
          <View style={styles.container_data}><Text style={props.previa ? styles.text_info_previa : styles.text_info}>{data2}</Text><Image source={calendario} /></View>
          <Text style={props.previa ? styles.text_info_previa : styles.text_info}>{props.data.sub_evento == "" ? "Sub-titulo do evento" : props.data.sub_evento}</Text>
        </View>
        {/*Banner e Descrição do Evento*/}
        <Image style={props.previa ? styles.image_previa : styles.image} source={props.previa ? props.image == "" ? banner : { uri: props.image } : { uri: imagem }} />
        <Text style={props.previa ? styles.descricaoPrevia : styles.descricao}>{props.data.descricao_evento == "" ? "Descrição do evento" : props.data.descricao_evento != undefined && (props.data.descricao_evento.length > 500) ? props.data.descricao_evento.substring(0, 300) + "..." : props.data.descricao_evento}</Text>
      </TouchableOpacity>
    )
  } else return (
    <View style={styles.carregando}>{/*Carregamento*/}
      <ActivityIndicator size={"large"} color={"#8A60FF"} />
    </View>
  )
}

// Estilização dos Componentes
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    width: "96%",
    alignItems: "center",
    marginBottom: 50
  },
  container_nome: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 5
  },
  icone: {
    width: window.width / 10,
    height: window.width / 10,
    borderRadius: 9999
  },
  icone_previa: {
    width: window.width / 15,
    height: window.width / 15,
    borderRadius: 9999
  },
  titulo: {
    marginLeft: window.width / 30,
    fontSize: window.width / 30,
    fontWeight: "700",
    color: "#6B3BF4"
  },
  tituloPrevia: {
    marginLeft: 10,
    fontSize: window.width / 35,
    fontWeight: "700",
    color: "#6B3BF4"
  },
  container_info: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 2
  },
  container_data: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text_info: {
    fontSize: window.width / 40,
    color: "#838181",
    fontWeight: "400",
    marginRight: 5
  },
  text_info_previa: {
    fontSize: window.width / 45,
    fontWeight: "400",
    marginRight: 5
  },
  image: {
    width: "90%",
    aspectRatio: 20 / 9,
  },
  image_previa: {
    width: "90%",
    aspectRatio: 20 / 9,
  },
  descricao: {
    fontSize: window.width / 40,
    color: "#838181",
    fontWeight: "400",
    width: "90%"
  },
  descricaoPrevia: {
    fontSize: window.width / 45,
    fontWeight: "400",
    width: "90%",
  },
  carregando: {
    flex: 1,
    justifyContent: "center"
  }
});
