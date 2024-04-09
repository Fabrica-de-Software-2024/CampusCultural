import { router } from "expo-router"
import { Button, StatusBar, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Navbar from "./components/Navbar"
import { ReactNode, useEffect, useState } from "react";
import Rodape from "./components/Rodape";
import { JsxElement } from "typescript";

export default function Calendario() {

    const [eventosSelecionado, setEventosSelecionado] = useState(0);

    const [data, setData] = useState(new Date(Date.now()).toISOString())

    const [diasMes, setDiasMes] = useState(0);

    const [calendario, setCalendario] = useState([]);

    useEffect(() => {
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

        for (let index = _calendario.length - 1; index <= 35; index++){
            _calendario.push(null);
        }

        var _matrizCalendario: number[][] = [[],[],[],[],[]]

        var _matrizCalendarioVirado: number[][] = [[],[],[],[],[],[],[]]
        
        _calendario.map((i,index)=>{
            if(index < 7){
                _matrizCalendario[0].push(i);
            }
            else if(index < 14){
                _matrizCalendario[1].push(i);
            }
            else if(index < 21){
                _matrizCalendario[2].push(i);
            }
            else if(index < 28){
                _matrizCalendario[3].push(i);
            }
            else if(index < 35){
                _matrizCalendario[4].push(i);
            }
        })

        for(let index = 0; index < 7; index++){
            for(let index2 = 0; index2 < 5; index2++){
                _matrizCalendarioVirado[index][index2] = _matrizCalendario[index2][index]
            }
        }

        setCalendario(_matrizCalendarioVirado);

        console.log(_matrizCalendarioVirado)

    }, [data, diasMes])

    return (
        <>
            <Navbar title={"Calendário"} links={true} selecionado={eventosSelecionado} setSelecionado={setEventosSelecionado} />
            <View style={styles.container}>
                <View style={styles.calendarioContainer}>
                    <Text style={styles.calendarioTitulo}>{new Date(new Date(data).getTime() + (new Date(data).getTimezoneOffset() * 60000)).toLocaleString("pt-BR", { dateStyle: "long" })}</Text>
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
                        calendario.map((i,index)=>{
                            return(
                                <View style={styles.linhaDias} key={index}>
                                    {
                                        i.map((j,index2)=>{
                                            return(
                                                <TouchableOpacity onPress={()=>setData(new Date(new Date(data).getFullYear(), new Date(data).getMonth(), j).toISOString())} style={new Date(data).getDate() === j? styles.diaSelecionado : styles.dia} key={index2}>
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

                </View>
            </View >
            <Rodape selecionado={2} />
        </>
    )
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
        padding: 6
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
        height: '60%',
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
});