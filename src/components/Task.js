import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

// Importa os estilos comuns do projeto
import commonStyles from '../commonStyles';

// Importando icones
import Icon from 'react-native-vector-icons/FontAwesome';

// Importa o modulo de data/hora no projeto
import moment from 'moment';
// Referencia como ele vai traduzir as informações
import 'moment/locale/pt-br';

export default props => {

    // Condicional para verificar se a tarefa recebe o estilo concluído
    const doneOrNotStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} : {};

    // Escolhe a data a ser exibida na tarefa(estimada ou concluída)
    const date = props.doneAt ? props.doneAt : props.estimateAt;

    // Formata a data do dia atual ex.: Quarta, 4 de Agosto
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback
            onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text> 
                <Text style={styles.date}>{formattedDate}</Text> 
            </View>
        </View>
    );
}

function getCheckView(doneAt) {
    if(doneAt != null){
        return(
            <View style={styles.done}>
                <Icon name='check' size={15} color={commonStyles.colors.secondary}></Icon>
            </View>
        );
    }else{
        return(
            <View style={styles.pending}></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer:{
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done:{
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    }
});