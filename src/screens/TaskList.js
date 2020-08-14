import React, {Component} from 'react';
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert} from 'react-native';

// Importando o async-storage
import AsyncStorage from '@react-native-community/async-storage';

// Importação de imagens
import todayImage from '../../assets/imgs/today.jpg';

// Importção de componentes
import Task from '../components/Task';
import AddTask from './AddTask';

// Importa os estilos comuns do projeto
import commonStyles from '../commonStyles';

// Importa o modulo de data/hora no projeto
import moment from 'moment';
// Referencia como ele vai traduzir as informações
import 'moment/locale/pt-br';

// Importando icones
import Icon from 'react-native-vector-icons/FontAwesome';

// Define o estado inicial da Aplicação
const initialState = {
    showDoneTasks: false,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}


export default class TaskList extends Component {

    state = {
        ...initialState
    }

    // Muda o icone de acordo com o estado do modal
    iconModal = () => {
        return !this.state.showAddTask ? "plus": "times";
    }

    // Método de ciculo de vida de um componente (basicamente chama a função ao app ser iniciado) 
    componentDidMount = async () => {
        // Pega o item do AsyncStorage e só prossegue quando terminar
        const stateString = await AsyncStorage.getItem('tasksState');
        // Converte toda a informação em Json
        const state = JSON.parse(stateString) || initialState;
        this.setState(state,this.filterTasks);
    }

    // Muda o estado do componente de acordo com o botão do filtro
    toggleFilter = () => {
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
    }

    // Função que verifica se existem tarefas conclúidas e caso seja true, pega apenas as tarefas pendentes
    filterTasks= () => {
        let visibleTasks = null;
        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks];
        } else {
            const pending = task => task.doneAt == null;
            visibleTasks = this.state.tasks.filter(pending);
        }

        this.setState({visibleTasks});
        // Cria um item no armazenamento interno do dispositivo e converte toda a informação em linhas
        AsyncStorage.setItem('tasksState',JSON.stringify(this.state));
    }

    // Função que define se a tarefa está marcada ou não
    toggleTask = taskId => {
        const tasks = [...this.state.tasks];
        tasks.forEach(task => {
            if(task.id == taskId) {
                task.doneAt = task.doneAt ? null : new Date();
            }
        });

        this.setState({ tasks }, this.filterTasks);
    }

    // Função que adiciona uma tarefa a lista a partir do componente AddTask
    addTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Invalidos','Descrição não informada');
            return;
        }

        const tasks = [...this.state.tasks];
        // Junta o array com o que foi passado pelo filho
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        });

        this.setState({tasks, showAddTask: false}, this.filterTasks);
    }

    // Função que deleta a tarefa a partir do componente filho Task
    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id != id);
        this.setState({tasks}, this.filterTasks);
    }

    render() {
        // Pega a data do dia atual ex.: Quarta, 4 de Agosto
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
        return (
            <SafeAreaView style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask}/>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        {/* Chama a função de alternancia do filtro */}
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                            size={20}
                            color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}> 
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}> 
                {/*
                    Cria um componente flatlist 
                 */}
                   <FlatList data={this.state.visibleTasks} 
                            keyExtractor={item => `${item.id}`}
                            renderItem={({item}) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask}/> }/>
                </View>
                
                <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => this.setState({ showAddTask: true} )}>
                    <Icon name={this.iconModal()} size={30} color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
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
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS == 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
});