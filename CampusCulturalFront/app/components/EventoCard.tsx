import { router } from "expo-router";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

type Evento = {
  "id_evento": number,
  "professor_evento": number,
  "nome_evento": string,
  "sub_evento": string,
  "data_evento": string,
  "descricao_evento": string
}

export default function EventoCard(props: { data: Evento }) {
  const icone = require("../../assets/icone_evento.png");
  const calendario = require("../../assets/mini_calendario.png");
  const image = require("../../assets/evento_card_1.png");

  const data = new Date(props.data.data_evento);
  const data2 = new Date(data.getTime() + (data.getTimezoneOffset() * 60000)).toLocaleString("pt-BR", { weekday: "short", dateStyle: "full", timeStyle: "short" });

  return (
    <TouchableOpacity onPress={()=>router.replace(`/evento/${props.data.id_evento}`)} style={styles.container}>
      <View style={styles.container_nome}>
        <Image source={icone} />
        <Text style={styles.titulo}>{props.data.nome_evento}</Text>
      </View>
      <View style={styles.container_info}>
        <View style={styles.container_data}><Text style={styles.text_info}>{data2}</Text><Image source={calendario} /></View>
        <Text style={styles.text_info}>{props.data.sub_evento}</Text>
      </View>
      <Image style={styles.image} source={image}/>
      <Text style={styles.descricao}>{props.data.descricao_evento.length > 500? props.data.descricao_evento.substring(0,300)+"..." : props.data.descricao_evento}</Text>
    </TouchableOpacity>
  )
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
  titulo: {
    marginLeft: 10,
    fontSize: 16,
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
  image: {
    width: "90%",
    resizeMode: "contain"
  },
  descricao: {
    fontSize: 12,
    fontWeight: "400",
    width: "90%"
  }
});
