import React, {Component} from 'react';
import { SafeAreaView, View, Text, ImageBackground, StyleSheet} from 'react-native';

// Importação de imagens
import todayImage from '../../assets/imgs/today.jpg';

// Importa os estilos comuns do projeto
import commonStyles from '../commonStyles';

// Importa o modulo de data/hora no projeto
import moment from 'moment';
// Referencia como ele vai traduzir as informações
import 'moment/locale/pt-br';

export default class TaskList extends Component {
    render() {
        // Pega a data do dia atual ex.: Quarta, 4 de Agosto
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}> 
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}> 
                    <Text>Tarefa #1</Text>
                    <Text>Tarefa #2</Text>
                    <Text>Tarefa #3</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    }
});