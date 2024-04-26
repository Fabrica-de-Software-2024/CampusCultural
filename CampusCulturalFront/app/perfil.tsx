import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Modal,
	Alert
} from "react-native";
import Navbar from "./components/Navbar";
import Rodape from "./components/Rodape";
import NotificacoesCard from "./components/NotificacoesPopup";
import ConfiguracoesCard from "./components/ConfiguracoesPopup";
import CertificadosCard from "./components/CertificadosPopup";
import AjudaCard from "./components/AjudaPopup";
import BotaoAddEvento from "./components/BotaoAddEvento";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import { router } from "expo-router";

export type Usuario = {
	"id_usuario": number,
	"nome_usuario": string,
	"curso_usuario": string,
	"login_usuario"?: string,
	"senha_usuario"?: string,
	"is_professor": boolean,
}

export default function Perfil() {
	const logo = require("../assets/logo.png");
	const sino = require("../assets/sino.png");
	const engrenagem = require("../assets/engrenagem.png");
	const certificado = require("../assets/certificado.png");
	const chat = require("../assets/chat.png");
	const figura1 = require("../assets/figura7.png");
	const figura2 = require("../assets/figura8.png");
	const figura3 = require("../assets/figura9.png");
	const figura4 = require("../assets/figura10.png");

	const [modalNotificacoes, setModalNotificacoes] = useState(false);
	const [modalConfig, setModalConfig] = useState(false);
	const [modalCertificados, setModalCertificados] = useState(false);
	const [modalChat, setModalChat] = useState(false);
	const [dados, setDados] = useState<Usuario>()
	const [alteraImagem, setAlteraImagem] = useState(null);

	async function pegaImagem() {
		let _imagem = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			base64: true
		})

		if (!_imagem.canceled) {
			setAlteraImagem('data:image/png;base64,' + _imagem.assets[0].base64);
			console.log('data:image/png;base64,' + _imagem.assets[0].base64);
			const resp = await fetch("https://campus-cultural.vercel.app/usuario", {
				method: 'POST',
				body: JSON.stringify({
					"id_usuario": dados.id_usuario,
					"imagem": 'data:image/png;base64,' + _imagem.assets[0].base64
				}),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			});

			if(!resp.ok){
				const resp2 = await resp.json()
				console.log(resp2)
				router.replace("/perfil")
			}
			else {Alert.alert("Erro", "Não foi possivel atualizar a imagem.")}
		}
	}

	useEffect(() => {
		AsyncStorage.getItem('login').then((resp) => {
			let _dados = JSON.parse(resp)
			setDados({
				"id_usuario": _dados?.studentCode,
				"nome_usuario": _dados?.name,
				"curso_usuario": _dados?.studentCode,
				"is_professor": false,
			});
		})
	}, [])

	return (
		<>
			<BotaoAddEvento />
			<Modal style={styles.modal} animationType="slide" transparent={true} visible={modalNotificacoes} onRequestClose={() => setModalNotificacoes(false)} >
				<NotificacoesCard setAberto={setModalNotificacoes} />
			</Modal>
			<Modal style={styles.modal} animationType="slide" transparent={true} visible={modalConfig} onRequestClose={() => setModalConfig(false)} >
				<ConfiguracoesCard setAberto={setModalConfig} />
			</Modal>
			<Modal style={styles.modal} animationType="slide" transparent={true} visible={modalCertificados} onRequestClose={() => setModalCertificados(false)} >
				<CertificadosCard setAberto={setModalCertificados} />
			</Modal>
			<Modal style={styles.modal} animationType="slide" transparent={true} visible={modalChat} onRequestClose={() => setModalChat(false)} >
				<AjudaCard setAberto={setModalChat} />
			</Modal>
			<Navbar title="Minha Conta" links={false} />
			<View style={styles.container}>
				<View style={styles.userInfo}>
					<Image source={{ uri: alteraImagem }} style={styles.imagem} resizeMode="cover" />
					<Text style={styles.nome}>{dados?.nome_usuario}</Text>
					<Text style={styles.curso}>{dados?.curso_usuario}</Text>
				</View>
				<View style={styles.textContainer}>
					<TouchableOpacity onPress={() => { setModalNotificacoes(true); pegaImagem() }} style={styles.button}>
						<Image source={sino} style={styles.icon} resizeMode="cover" />
						<Text style={styles.buttonText}>Notificações</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setModalConfig(true)} style={styles.button}>
						<Image source={engrenagem} style={styles.icon} resizeMode="cover" />
						<Text style={styles.buttonText}>Configurações</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setModalCertificados(true)} style={styles.button}>
						<Image source={certificado} style={styles.icon} resizeMode="cover" />
						<Text style={styles.buttonText}>Meus certificados</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setModalChat(true)} style={styles.button}>
						<Image source={chat} style={styles.icon} resizeMode="cover" />
						<Text style={styles.buttonText}>Fale conosco</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => { AsyncStorage.setItem('login', "\0").then(() => router.replace("/")) }} style={styles.button}>
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Image style={styles.figura1} source={figura1} />
			<Image style={styles.figura2} source={figura2} />
			<Image style={styles.figura3} source={figura3} />
			<Image style={styles.figura4} source={figura4} />
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
		marginLeft: "0%",
		alignItems: "center",
		zIndex: 20
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
	figura1: {
		position: "absolute",
		top: "25%"
	},
	figura2: {
		position: "absolute",
		right: 0,
		top: "25%"
	},
	figura3: {
		position: "absolute",
		bottom: "10%"
	},
	figura4: {
		position: "absolute",
		right: 0,
		bottom: "10%"
	},
	modal: {
		width: "90%"
	}
});