import { router } from "expo-router"
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react";
import Rodape from "./components/Rodape";
import { puxaEventos } from "./home";
import { Evento } from "./components/EventoCard";
import BotaoAddEvento from "./components/BotaoAddEvento";
import { Usuario } from "./perfil";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Calendario() {

    const risco = require("../assets/risco_eventos_calendario.png");

    const figura5 = require("../assets/figura5.png");

    const figura6 = require("../assets/figura6.png");

    const [dados, setDados] = useState<Usuario>();

    const [data, setData] = useState(new Date(new Date(Date.now()).getFullYear(),new Date(Date.now()).getMonth(), new Date(Date.now()).getDate()).getTime());

    const [diasMes, setDiasMes] = useState(0);

    const [calendario, setCalendario] = useState([]);

    const [eventos, setEventos] = useState([]);

    const [carregado, setCarregado] = useState(false);

    const dias_da_semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    var index2 = 0;

    useEffect(() => {
        AsyncStorage.getItem('login').then(async (resp) => {
            let _dados = JSON.parse(resp)
            setDados({
                "id_usuario": _dados?.id_usuario,
                "nome_usuario": _dados?.nome_usuario,
                "is_professor": _dados?.is_professor,
                "imagem": _dados?.imagem
            });
        })

        puxaEventos().then((e) => setEventos(e)).finally(() => setCarregado(true))

        var _mes = new Date(data).getMonth()

        if (_mes === 1) {
            var _ano = new Date(data).getFullYear()
            if (_ano % 4 === 0) {
                setDiasMes(29);
            }
            else setDiasMes(28);
        }
        else if (_mes === 3 || _mes === 5 || _mes === 8 || _mes === 10) setDiasMes(30);
        else setDiasMes(31);
        var _semana_inicio = new Date(new Date(data).getFullYear(), new Date(data).getMonth(), 1).getDay()

        var _calendario = []

        for (let index = 0; index < _semana_inicio; index++) {
            _calendario.push(null);
        }

        for (let index = 1; index <= diasMes; index++) {
            _calendario.push(index);
        }

        for (let index = _calendario.length - 1; index <= 42; index++) {
            _calendario.push(null);
        }

        var _matrizCalendario: number[][] = [[], [], [], [], [], []]

        var _matrizCalendarioVirado: number[][] = [[], [], [], [], [], [], []]

        _calendario.map((i, index) => {
            if (index < 7) {
                _matrizCalendario[0].push(i);
            }
            else if (index < 14) {
                _matrizCalendario[1].push(i);
            }
            else if (index < 21) {
                _matrizCalendario[2].push(i);
            }
            else if (index < 28) {
                _matrizCalendario[3].push(i);
            }
            else if (index < 35) {
                _matrizCalendario[4].push(i);
            }
            else if (index < 42) {
                _matrizCalendario[5].push(i);
            }
        })

        for (let index = 0; index < 7; index++) {
            for (let index2 = 0; index2 < 6; index2++) {
                _matrizCalendarioVirado[index][index2] = _matrizCalendario[index2][index];
            }
        }

        setCalendario(_matrizCalendarioVirado);
    }, [data, diasMes])

    return (
        <>
            <Navbar title={"Calendário"} links={false} />
            {
                dados?.is_professor ?
                    <BotaoAddEvento />
                    :
                    <></>
            }
            <View style={styles.container}>
                <View style={styles.calendarioContainer}>
                    <View style={styles.calendarioContainerTitulo}>
                        <TouchableOpacity onPress={() => passaMes(-1, data, setData)}><Text style={styles.calendarioTitulo}>{"<"}</Text></TouchableOpacity>
                        <Text style={styles.calendarioTitulo}>{new Date(data).toLocaleString("pt-BR", { dateStyle: "long" })}</Text>
                        <TouchableOpacity onPress={() => passaMes(1, data, setData)}><Text style={styles.calendarioTitulo}>{">"}</Text></TouchableOpacity>
                    </View>
                    <View style={styles.diasSemana}>
                        <Text style={new Date(data).getDay() === 0 ? styles.semanaSelecionado : styles.semanaText}>Dom</Text>
                        <Text style={new Date(data).getDay() === 1 ? styles.semanaSelecionado : styles.semanaText}>Seg</Text>
                        <Text style={new Date(data).getDay() === 2 ? styles.semanaSelecionado : styles.semanaText}>Ter</Text>
                        <Text style={new Date(data).getDay() === 3 ? styles.semanaSelecionado : styles.semanaText}>Qua</Text>
                        <Text style={new Date(data).getDay() === 4 ? styles.semanaSelecionado : styles.semanaText}>Qui</Text>
                        <Text style={new Date(data).getDay() === 5 ? styles.semanaSelecionado : styles.semanaText}>Sex</Text>
                        <Text style={new Date(data).getDay() === 6 ? styles.semanaSelecionado : styles.semanaText}>Sáb</Text>
                    </View>
                    <View style={styles.diasMes}>
                        {
                            calendario.map((i, index) => {
                                return (
                                    <View style={styles.linhaDias} key={index}>
                                        {
                                            i.map((j, index2) => {
                                                return (
                                                    <TouchableOpacity onPress={() => setData(new Date(new Date(data).getFullYear(), new Date(data).getMonth(), j).getTime())} style={new Date(data).getDate() === j ? styles.diaSelecionado : styles.dia} key={index2}>
                                                        <Text style={styles.diaText}>{j}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                    </View>

                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.tituloEventos}>Próximos <Text style={{ color: "#411BAA" }}>Eventos</Text></Text>
                    {
                        carregado ?
                            <ScrollView style={styles.containerEventos}>
                                {
                                    eventos.map((i: Evento, index: number) => {
                                        if (data <= (i.data_evento as unknown as number)) {
                                            index2++;
                                            return (
                                                <View key={index}>
                                                    <TouchableOpacity onPress={() => router.replace(`/evento/${i.id_evento}`)}>
                                                        <Text style={index2 < 2 ? styles.textEventoRoxo : styles.textEvento}>{`${new Date(Math.floor(i.data_evento as unknown as number / 1000) * 1000).getDate()} - ${dias_da_semana[new Date(Math.floor(i.data_evento as unknown as number / 1000) * 1000).getDay()]} - ${i.nome_evento.length > 30 ? i.nome_evento.substring(0, 25) + "..." : i.nome_evento}`}</Text>
                                                    </TouchableOpacity>
                                                    <Image source={risco} />
                                                </View>
                                            )
                                        }
                                    })
                                }
                            </ScrollView>
                            :
                            <View style={styles.carregando}>
                                <ActivityIndicator size={"large"} color={"#8A60FF"} />
                            </View>
                    }
                </View>
            </View >
            <Rodape selecionado={2} />
            <Image style={styles.riscoEsquerda} source={figura5} />
            <Image style={styles.riscoDireita} source={figura6} />
        </>
    )
}

function passaMes(qnt: number, data: number, setData: React.Dispatch<React.SetStateAction<number>>) {
    if (new Date(data).getMonth() + qnt > 11) {
        setData(new Date(new Date(data).getFullYear() + 1, 0, 1).getTime())
    }
    else if (new Date(data).getMonth() + qnt < 0) {
        setData(new Date(new Date(data).getFullYear() - 1, 11, 1).getTime())
    }
    else setData(new Date(new Date(data).getFullYear(), new Date(data).getMonth() + qnt, 1).getTime())
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#6B3BF4",
        paddingTop: 0,
        margin: 0,
        width: '100%', // Garante que a view ocupe toda a largura
        height: '100%', // Garante que a view ocupe toda a altura
    },
    calendarioContainer: {
        width: "100%",
        alignItems: "center",
    },
    calendarioContainerTitulo: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    calendarioTitulo: {
        fontSize: 24,
        color: "#FFF",
        marginVertical: 5,
    },
    diasSemana: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    diasMes: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    semanaText: {
        color: "#FFF",
        fontWeight: "400"
    },
    semanaSelecionado: {
        color: "#FFF",
        fontWeight: "700"
    },
    linhaDias: {
        justifyContent: "space-evenly"
    },
    dia: {
        justifyContent: "center",
        alignItems: "center",
        padding: 4
    },
    diaSelecionado: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 10
    },
    diaText: {
        color: "#FFF",
        fontSize: 18
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '58%',
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    tituloEventos: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginVertical: "5%"
    },
    containerEventos: {
        width: "80%",
        marginHorizontal: "10%"
    },
    textEventoRoxo: {
        fontSize: 16,
        fontWeight: "700",
        color: "#411BAA"
    },
    textEvento: {
        fontSize: 16,
        fontWeight: "700",
    },
    riscoEsquerda: {
        position: "absolute",
        bottom: "10%"
    },
    riscoDireita: {
        position: "absolute",
        right: 0,
        bottom: "10%"
    },
    carregando: {
        flex: 1,
        justifyContent: "center"
    }
});