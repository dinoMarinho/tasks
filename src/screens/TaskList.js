import React, {Component} from 'react';
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform} from 'react-native';

// Importação de imagens
import todayImage from '../../assets/imgs/today.jpg';

// Importção de componentes
import Task from '../components/Task';

// Importa os estilos comuns do projeto
import commonStyles from '../commonStyles';

// Importa o modulo de data/hora no projeto
import moment from 'moment';
// Referencia como ele vai traduzir as informações
import 'moment/locale/pt-br';

// Importando icones
import Icon from 'react-native-vector-icons/FontAwesome';



export default class TaskList extends Component {

    state = {
        showDoneTasks: true,
        visibleTasks: [],
        tasks: [
            {
                id: Math.random(),
                desc: 'Tarefa #1',
                estimateAt: new Date(),
                doneAt: new Date()
            },
            {
                id: Math.random(),
                desc: 'Tarefa #2',
                estimateAt: new Date(),
                doneAt: null
            },
        ]
    }

    // Método de ciculo de vida de um componente (basicamente chama a função ao app ser iniciado) 
    componentDidMount = () => {
        this.filterTasks();
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

    render() {
        // Pega a data do dia atual ex.: Quarta, 4 de Agosto
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
        return (
            <SafeAreaView style={styles.container}>
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
                            renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask}/> }/>
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
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS == 'ios' ? 40 : 10
    }
});