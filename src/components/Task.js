import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

// Importando o componente de deslizar
import Swipeable from 'react-native-gesture-handler/Swipeable'

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

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}
            onPress={() =>props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color='#fff' />
            </TouchableOpacity>
        );
    }

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name="trash" size={20} color='#fff' style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        );
    }

    return(
        <Swipeable 
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() =>props.onDelete && props.onDelete(props.id)}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                onPress={() => props.onToggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text> 
                    <Text style={styles.date}>{formattedDate}</Text> 
                </View>
            </View>
        </Swipeable>
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
        paddingVertical: 10,
        backgroundColor: '#fff'
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
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left:{
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeIcon: {
        marginLeft: 10
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        margin: 10
    }
});