import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export type Evento = {
  "id_evento"?: number,
  "professor_evento": number,
  "nome_evento": string,
  "sub_evento": string,
  "data_evento": string,
  "imagem"?: number,
  "descricao_evento": string
}

export async function pegaBanner(id: number, setImagem: React.Dispatch<string>) {
  const respbanner = await fetch(`https://campus-cultural.vercel.app/imagem/${id}`)
  const respbanner2 = await respbanner.json();
  setImagem(respbanner2?.imagem);
}

export default function EventoCard(props: { data: Evento, previa: boolean, image?: string }) {
  const icone = require("../../assets/icone_evento.png");
  const calendario = require("../../assets/mini_calendario.png");
  const [imagem, setImagem] = useState(null);

  const [carregado, setCarregado] = useState(false)

  const data = new Date(props.data.data_evento);
  const data2 = new Date(data.getTime()).toLocaleString("pt-BR", { weekday: "short", dateStyle: "full", timeStyle: "short" });

  useEffect(() => {
    pegaBanner(props.data.imagem, setImagem).then(() => setCarregado(true));
  }, [props])

  if (carregado) {
    return (
      <TouchableOpacity onPress={props.previa ? () => { } : () => router.replace(`/evento/${props.data.id_evento}`)} style={styles.container}>
        <View style={styles.container_nome}>
          <Image source={icone} style={props.previa ? styles.icone_previa : {}} />
          <Text style={props.previa ? styles.tituloPrevia : styles.titulo}>{props.data.nome_evento}</Text>
        </View>
        <View style={styles.container_info}>
          <View style={styles.container_data}><Text style={props.previa ? styles.text_info_previa : styles.text_info}>{data2}</Text><Image source={calendario} /></View>
          <Text style={props.previa ? styles.text_info_previa : styles.text_info}>{props.data.sub_evento}</Text>
        </View>
        <Image style={props.previa ? styles.image_previa : styles.image} source={{ uri: props.image == undefined ? imagem : props.image }} />
        <Text style={props.previa ? styles.descricaoPrevia : styles.descricao}>{/*props.data.descricao_evento.length > 500 ? props.data.descricao_evento.substring(0, 300) + "..." : */props.data.descricao_evento}</Text>
      </TouchableOpacity>
    )
  } else return <></>
}

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
  icone_previa: {
    width: 30,
    height: 30
  },
  titulo: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#6B3BF4"
  },
  tituloPrevia: {
    marginLeft: 10,
    fontSize: 11,
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
    fontSize: 12,
    fontWeight: "400",
    marginRight: 5
  },
  text_info_previa: {
    fontSize: 8,
    fontWeight: "400",
    marginRight: 5
  },
  image: {
    width: "90%",
    aspectRatio: 20 / 9,
  },
  image_previa: {
    width: "100%",
    aspectRatio: 20 / 9,
  },
  descricao: {
    fontSize: 12,
    fontWeight: "400",
    width: "90%"
  },
  descricaoPrevia: {
    fontSize: 8,
    fontWeight: "400",
    width: "90%",
    marginBottom: "40%"
  }
});
